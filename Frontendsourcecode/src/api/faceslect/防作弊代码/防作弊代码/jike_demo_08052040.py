
# -*- coding: utf-8 -*-
# @File    : jike_demo_08041530.py
# @Project : Eyeball_Tracking-main
# @Author  : jike
# @Email   : jike@miao.cn
# @Create  : 2025-08-04 15:26:03
# @Modify  : 2025-08-05  更新：添加作弊频次统计
# @Software: PyCharm
# @Description:
"""
改进版：增加了作弊行为频次统计功能。
当头部姿态从正常状态进入异常状态（超过阈值）时，计为一次作弊行为。
避免在持续异常期间重复计数。
"""

import math
import cv2
import mediapipe as mp
import numpy as np
from datetime import datetime

# 初始化MediaPipe的人脸网格模型
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5,
                                  min_tracking_confidence=0.5)

# 使用摄像头
cap = cv2.VideoCapture(0)

# 角度阈值
YAW_THRESHOLD = 45
PITCH_THRESHOLD = 45

# ===== 新增变量：用于统计作弊次数 =====
cheating_count = 0                    # 作弊总次数
was_cheating = False                  # 上一帧是否处于作弊状态（防抖动重复计数）
cheating_log = []                     # 记录每次作弊发生的时间戳

def rotation_matrix_to_angles(rotation_matrix):
    x = math.atan2(rotation_matrix[2, 1], rotation_matrix[2, 2])
    y = math.atan2(-rotation_matrix[2, 0], math.sqrt(rotation_matrix[0, 0] ** 2 +
                                                     rotation_matrix[1, 0] ** 2))
    z = math.atan2(rotation_matrix[1, 0], rotation_matrix[0, 0])
    return np.array([x, y, z]) * 180. / math.pi

while cap.isOpened():
    success, image = cap.read()
    if not success:
        print("无法读取视频帧")
        break

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    face_coordination_in_real_world = np.array([
        [285, 528, 200],
        [285, 371, 152],
        [197, 574, 128],
        [173, 425, 108],
        [360, 574, 128],
        [391, 425, 108]
    ], dtype=np.float64)

    h, w, _ = image.shape
    face_coordination_in_image = []

    current_cheating = False  # 当前帧是否作弊

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for idx, lm in enumerate(face_landmarks.landmark):
                if idx in [1, 9, 57, 130, 287, 359]:
                    x, y = int(lm.x * w), int(lm.y * h)
                    face_coordination_in_image.append([x, y])
                    cv2.circle(image, (x, y), 3, (0, 255, 0), -1)

            face_coordination_in_image = np.array(face_coordination_in_image, dtype=np.float64)

            focal_length = 1 * w
            cam_matrix = np.array([[focal_length, 0, w / 2],
                                   [0, focal_length, h / 2],
                                   [0, 0, 1]])
            dist_matrix = np.zeros((4, 1), dtype=np.float64)

            success, rotation_vec, transition_vec = cv2.solvePnP(
                face_coordination_in_real_world, face_coordination_in_image,
                cam_matrix, dist_matrix)

            if success:
                rotation_matrix, jacobian = cv2.Rodrigues(rotation_vec)
                result = rotation_matrix_to_angles(rotation_matrix)
                yaw, pitch, roll = result

                # 判断当前是否为作弊状态
                if abs(yaw) > YAW_THRESHOLD or abs(pitch) > PITCH_THRESHOLD:
                    current_cheating = True

                # 显示角度
                for i, (name, value) in enumerate(zip(('pitch', 'yaw', 'roll'), result)):
                    text = f'{name}: {int(value)}'
                    cv2.putText(image, text, (20, i * 30 + 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 0, 200), 2)

                # 绘制边界框和CHEATING标签
                if current_cheating:
                    coords = face_coordination_in_image
                    x_min, y_min = int(coords[:, 0].min()), int(coords[:, 1].min())
                    x_max, y_max = int(coords[:, 0].max()), int(coords[:, 1].max())
                    cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 0, 255), 2)
                    cv2.putText(image, 'CHEATING', (x_min, y_min - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    # ===== 作弊行为统计逻辑 =====
    if current_cheating and not was_cheating:
        cheating_count += 1
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cheating_log.append(timestamp)
        print(f"[{timestamp}] 检测到作弊行为，累计次数：{cheating_count}")

    # 更新状态
    was_cheating = current_cheating

    # ===== 在图像上显示统计信息 =====
    cv2.putText(image, f'Cheating Count: {cheating_count}', (20, h - 50),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
    cv2.putText(image, 'Press ESC to exit', (20, h - 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (150, 150, 150), 1)

    cv2.imshow('Head Pose Angles - CHEATING DETECTION', image)

    if cv2.waitKey(5) & 0xFF == 27:  # ESC退出
        break

# ===== 程序结束，输出统计结果 =====
cap.release()
cv2.destroyAllWindows()

print("\n" + "="*50)
print("           考试行为监测统计报告")
print("="*50)
print(f"总时长: 未知（实时运行）")
print(f"检测到作弊行为总次数: {cheating_count}")
if cheating_log:
    print("作弊发生时间戳:")
    for i, ts in enumerate(cheating_log, 1):
        print(f"  {i}. {ts}")
else:
    print("未检测到任何作弊行为。")
print("="*50)

# （可选）将日志写入文件
if cheating_log:
    with open("cheating_detection_log.txt", "w", encoding="utf-8") as f:
        f.write("作弊行为检测日志\n")
        f.write("="*30 + "\n")
        for ts in cheating_log:
            f.write(ts + "\n")
    print("日志已保存至：cheating_detection_log.txt")
