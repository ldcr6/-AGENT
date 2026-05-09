# -*- coding: utf-8 -*-
# @File    : jike_demo_08041530.py
# @Project : Eyeball_Tracking-main
# @Author  : jike
# @Email   : jike@miao.cn
# @Create  : 2025-08-04 15:26:03
# @Modify  : 2025-08-04 15:26:03
# @Software: PyCharm
# @Description:
"""
这段代码是一个基于 Python + OpenCV + MediaPipe 实现的头部姿态估计（Head Pose Estimation） 程序，
主要用于实时检测摄像头中的人脸关键点，
并计算头部的旋转角度（俯仰角 pitch、偏航角 yaw、滚转角 roll），
进而判断是否出现“作弊行为”——例如考试时左右转头或上下低头抬头。
"""
import math
import cv2
import mediapipe as mp
import numpy as np

# 初始化MediaPipe的人脸网格模型，用于检测和跟踪人脸的关键点
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5,  # 设置最小检测置信度
                                  min_tracking_confidence=0.5)  # 设置最小跟踪置信度

# 使用本地视频文件进行处理
# video_path = r'E:\Project\head_pose\test.mp4'
# cap = cv2.VideoCapture(video_path)

# 使用摄像头进行读取
cap = cv2.VideoCapture(0)

# 设定检测“作弊”行为的角度阈值（单位：度）
YAW_THRESHOLD = 45  # 左右转头角度阈值
PITCH_THRESHOLD = 45  # 上下点头角度阈值


def rotation_matrix_to_angles(rotation_matrix):
    """
    从旋转矩阵计算欧拉角。
    :param rotation_matrix: 一个3x3的旋转矩阵，它表示了坐标系之间的旋转关系。
    :return: 返回的是绕X轴、Y轴、Z轴旋转的角度（单位：度）。
    """
    x = math.atan2(rotation_matrix[2, 1], rotation_matrix[2, 2])
    y = math.atan2(-rotation_matrix[2, 0], math.sqrt(rotation_matrix[0, 0] ** 2 +
                                                     rotation_matrix[1, 0] ** 2))
    z = math.atan2(rotation_matrix[1, 0], rotation_matrix[0, 0])
    # 将弧度转换为角度
    return np.array([x, y, z]) * 180. / math.pi


while cap.isOpened():
    success, image = cap.read()
    if not success:
        print("无法读取视频帧")
        break

    # 将图像的颜色空间从BGR转换到RGB，因为Mediapipe使用的是RGB颜色空间
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # 使用MediaPipe的人脸网格模型处理当前帧，得到人脸关键点信息
    results = face_mesh.process(image)

    # 将图像的颜色空间再转换回BGR，以便在OpenCV中正确显示
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # 定义人脸在现实世界中的三维坐标，这些坐标是基于特定的面部特征点来设定的
    face_coordination_in_real_world = np.array([
        [285, 528, 200],
        [285, 371, 152],
        [197, 574, 128],
        [173, 425, 108],
        [360, 574, 128],
        [391, 425, 108]
    ], dtype=np.float64)

    h, w, _ = image.shape  # 获取图像的高度、宽度
    face_coordination_in_image = []  # 用于存储选定的人脸关键点在图像中的二维坐标

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for idx, lm in enumerate(face_landmarks.landmark):
                # 选择特定的面部关键点（例如：鼻子、眼睛等），并将它们的坐标转换为图像坐标
                if idx in [1, 9, 57, 130, 287, 359]:  # 选择要使用的特定关键点索引
                    x, y = int(lm.x * w), int(lm.y * h)
                    face_coordination_in_image.append([x, y])

                    # 在图像上标记出这些关键点
                    cv2.circle(image, (x, y), 3, (0, 255, 0), -1)

            # 将所有选中的关键点坐标转换为NumPy数组
            face_coordination_in_image = np.array(face_coordination_in_image, dtype=np.float64)

            # 相机矩阵，用于描述相机内部参数，如焦距和主点
            focal_length = 1 * w  # 简单估算焦距，这里假设焦距等于图像宽度
            cam_matrix = np.array([[focal_length, 0, w / 2],
                                   [0, focal_length, h / 2],
                                   [0, 0, 1]])

            # 畸变系数矩阵，假设没有畸变
            dist_matrix = np.zeros((4, 1), dtype=np.float64)

            # 使用solvePnP函数根据已知的三维坐标和对应的二维坐标来求解物体的姿态（旋转和平移向量）
            success, rotation_vec, transition_vec = cv2.solvePnP(
                face_coordination_in_real_world, face_coordination_in_image,
                cam_matrix, dist_matrix)

            # 使用Rodrigues函数将旋转向量转换为旋转矩阵
            rotation_matrix, jacobian = cv2.Rodrigues(rotation_vec)

            # 将旋转矩阵转换为欧拉角，以获得俯仰角（pitch）、偏航角（yaw）和滚转角（roll）
            # 这些角表示了绕x y z三个轴旋转的程度
            result = rotation_matrix_to_angles(rotation_matrix)

            # 检查是否有人转动头部超过了设定的阈值（可能表示作弊）
            yaw, pitch, roll = result
            is_cheating = False
            if abs(yaw) > YAW_THRESHOLD or abs(pitch) > PITCH_THRESHOLD:
                is_cheating = True

            # 在图像上显示每个欧拉角的数值
            for i, info in enumerate(zip(('pitch', 'yaw', 'roll'), result)):
                k, v = info  # k是欧拉角的名称（pitch、yaw、roll），v是对应的欧拉角值
                text = f'{k}: {int(v)}'  # 格式化文本
                cv2.putText(image, text, (20, i * 30 + 20),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 0, 200), 2)

            # 如果检测到作弊行为，则在人脸周围绘制矩形框，并标注“CHEATING”
            if is_cheating:
                # 计算人脸的边界框
                x_min = int(min(face_coordination_in_image[:, 0]))
                x_max = int(max(face_coordination_in_image[:, 0]))
                y_min = int(min(face_coordination_in_image[:, 1]))
                y_max = int(max(face_coordination_in_image[:, 1]))

                # 绘制红色矩形框
                cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 0, 255), 2)

                # 在矩形框上方显示“CHEATING”文本
                cv2.putText(image, 'CHEATING', (x_min, y_min - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    # 显示处理后的图像
    cv2.imshow('Head Pose Angles', image)

    # 如果按下ESC键，则退出循环
    if cv2.waitKey(5) & 0xFF == 27:
        break

# 释放视频捕获对象并关闭所有OpenCV窗口
cap.release()
cv2.destroyAllWindows()
