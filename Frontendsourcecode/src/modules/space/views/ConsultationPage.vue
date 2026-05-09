<template>
	<div id="app" class="min-h-screen bg-white">
		<!-- 头部导航 -->
		<header class="bg-blue-500 text-white p-4 shadow-md">
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
				rel="stylesheet"
			/>
			<h1 class="text-3xl font-bold text-center tracking-wider">智能问诊平台</h1>
		</header>

		<!-- 主体内容 -->
		<main class="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- 用户信息 -->
			<div class="bg-white p-4 rounded-md shadow-md">
				<h2 class="text-xl font-bold mb-2">用户信息</h2>
				<input
					v-model="userName"
					class="border border-gray-300 w-full p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
					placeholder="请输入姓名"
				/>
				<input
					v-model="userAge"
					type="number"
					class="border border-gray-300 w-full p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 mt-2"
					placeholder="请输入年龄"
				/>
				<select
					v-model="userGender"
					class="border border-gray-300 w-full p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 mt-2"
				>
					<option value="男">男</option>
					<option value="女">女</option>
				</select>
				<button
					@click="confirmUserInfo"
					class="bg-blue-500 text-white mt-2 p-2 rounded-md w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
				>
					确认信息
				</button>
			</div>

			<!-- 症状描述 -->
			<div class="bg-white p-4 rounded-md shadow-md">
				<h2 class="text-xl font-bold mb-2">症状描述</h2>
				<textarea
					v-model="symptoms"
					class="border border-gray-300 w-full p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
					rows="4"
					placeholder="请详细描述你的症状"
				></textarea>
				<button
					@click="submitConsultation"
					class="bg-blue-500 text-white mt-2 p-2 rounded-md w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
				>
					提交问诊
				</button>
			</div>

			<!-- 问诊历史 -->
			<div v-if="userInfoConfirmed" class="bg-white p-4 rounded-md shadow-md col-span-2">
				<h2 class="text-xl font-bold mb-2">问诊历史</h2>
				<ul>
					<li v-for="(history, index) in consultationHistory" :key="index">
						<p>{{ history.date }} - {{ history.status }}</p>
						<p>{{ history.symptoms }}</p>
					</li>
				</ul>
			</div>

			<!-- 医生信息 -->
			<div
				class="bg-white p-4 rounded-md shadow-md col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4"
			>
				<h2 class="text-xl font-bold mb-2 col-span-full">医生信息</h2>
				<div
					v-for="(doctor, index) in doctors"
					:key="index"
					class="bg-gray-100 p-4 rounded-md shadow-md cursor-pointer"
					@click="selectDoctor(doctor)"
				>
					<img
						:src="doctor.image"
						alt="医生图片"
						class="w-24 h-24 rounded-full mx-auto mb-2"
					/>
					<p class="text-center font-bold">{{ doctor.name }}</p>
					<p class="text-center">{{ doctor.title }}</p>
					<p class="text-center">{{ doctor.specialty }}</p>
					<p class="text-center text-green-500" v-if="doctor.online">在线</p>
					<p class="text-center text-red-500" v-else>离线</p>
				</div>
			</div>

			<!-- 实时沟通和医生详细信息，仅在选择医生后显示 -->
			<div
				v-if="selectedDoctor"
				class="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2"
				ref="chatAndDoctorInfo"
			>
				<!-- 实时沟通 -->
				<div class="bg-white p-4 rounded-md shadow-md" ref="chatWindow">
					<h2 class="text-xl font-bold mb-2">实时沟通</h2>
					<div class="chat-window h-64 overflow-y-auto border border-gray-300 p-2 mb-2">
						<p v-for="(message, index) in chatMessages" :key="index">{{ message }}</p>
						<div v-if="isDoctorTyping" class="typing-indicator">
							<span> {{ selectedDoctor.name }} 正在输入中</span>
							<div class="dots">
								<div class="dot"></div>
								<div class="dot"></div>
								<div class="dot"></div>
							</div>
						</div>
					</div>

					<input
						v-model="newMessage"
						class="border border-gray-300 w-full p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
						placeholder="输入消息..."
					/>
					<button
						@click="sendMessage"
						class="bg-blue-500 text-white mt-2 p-2 rounded-md w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
					>
						发送
					</button>
				</div>

				<!-- 医生详细信息 -->
				<div class="bg-white p-4 rounded-md shadow-md">
					<h2 class="text-xl font-bold mb-2">医生详细信息</h2>
					<div v-if="isLoadingDoctorInfo">
						<p class="text-center">正在帮您连线 {{ selectedDoctor.name }} 医生...</p>
					</div>
					<div v-else-if="connectionResult === 'success'">
						<p class="text-center text-green-500">
							连线 {{ selectedDoctor.name }} 医生成功！
						</p>
						<img
							:src="selectedDoctor.image"
							alt="医生图片"
							class="w-24 h-24 rounded-full mx-auto mb-2"
						/>
						<p class="text-center font-bold">{{ selectedDoctor.name }}</p>
						<p class="text-center">{{ selectedDoctor.title }}</p>
						<p class="text-center">{{ selectedDoctor.specialty }}</p>
						<p class="text-center text-green-500" v-if="selectedDoctor.online">在线</p>
						<p class="text-center text-red-500" v-else>离线</p>
						<p class="text-center">工作经验: {{ selectedDoctor.experience }} 年</p>
						<p class="text-center">擅长疾病: {{ selectedDoctor.famousDiseases }}</p>
						<p class="text-center">好评率: {{ selectedDoctor.goodReviewRate }}%</p>
					</div>
					<div v-else-if="connectionResult === 'fail'">
						<p class="text-center text-red-500">
							连线 {{ selectedDoctor.name }} 医生失败，医生当前离线。
						</p>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import { random } from 'lodash-es';
export default {
	data() {
		return {
			userName: '',
			userAge: '',
			userGender: '男',
			symptoms: '',

			isDoctorTyping: false,
			typingDelay: random(1000, 2000), // 输入提示持续时间
			responseDelay: 2000, // 医生回复延迟时间

			consultationHistory: [
				{ date: '2025-04-01', status: '已完成', symptoms: '眼睛干涩、视力模糊' },
				{ date: '2025-03-15', status: '已完成', symptoms: '眼红、疼痛' }
			],
			chatMessages: [],
			newMessage: '',
			userInfoConfirmed: false,
			doctors: [
				{
					name: '张医生',
					title: '主任医师',
					specialty: '眼科疾病',
					image: 'https://picsum.photos/200/200?random=1',
					online: true,
					experience: 25,
					famousDiseases: '近视、青光眼、白内障',
					goodReviewRate: 92
				},
				{
					name: '王医生',
					title: '副主任医师',
					specialty: '眼科疾病',
					image: 'https://picsum.photos/200/200?random=2',
					online: false,
					experience: 20,
					famousDiseases: '视网膜病变、黄斑病变',
					goodReviewRate: 88
				},
				{
					name: '李医生',
					title: '主治医师',
					specialty: '眼科疾病',
					image: 'https://picsum.photos/200/200?random=3',
					online: true,
					experience: 15,
					famousDiseases: '角膜炎、结膜炎',
					goodReviewRate: 90
				},
				{
					name: '赵医生',
					title: '住院医师',
					specialty: '眼科疾病',
					image: 'https://picsum.photos/200/200?random=4',
					online: false,
					experience: 8,
					famousDiseases: '斜视、弱视',
					goodReviewRate: 85
				}
			],
			selectedDoctor: null,
			isLoadingDoctorInfo: false,
			doctorResponseDelay: 2000, // 医生回复延迟时间，单位：毫秒
			doctorInfoLoadingTime: 3000, // 医生信息加载时间，单位：毫秒
			connectionResult: null,
			onlineStatusRefreshInterval: null
		};
	},
	mounted() {
		this.onlineStatusRefreshInterval = setInterval(() => {
			this.doctors.forEach(doctor => {
				doctor.online = Math.random() > 0.5;
			});
		}, 500000); // 每 5 秒随机刷新一次在线状态
	},
	beforeDestroy() {
		clearInterval(this.onlineStatusRefreshInterval);
	},
	methods: {
		confirmUserInfo() {
			if (this.userName && this.userAge) {
				this.userInfoConfirmed = true;
				alert('用户信息已确认！');
			} else {
				alert('请填写完整的用户信息！');
			}
		},
		submitConsultation() {
			if (this.symptoms) {
				alert('问诊信息已提交至门诊部，会尽快帮您转交给相应医生！');
				alert('请等待医生的回复！或者尝试进行和医生的实时沟通！');
				this.symptoms = '';
			} else {
				alert('请先描述你的症状！');
			}
		},
		sendMessage() {
			if (this.newMessage) {
				this.chatMessages.push(`你: ${this.newMessage}`);
				this.isDoctorTyping = true; // 显示输入状态
				setTimeout(() => {
					this.getDoctorResponse(this.newMessage);
					// 定时器最后执行，确保消息发送后再清空输入框
					this.isDoctorTyping = false; // 隐藏输入状态
					this.newMessage = '';
				}, this.doctorResponseDelay);
			}
		},
		selectDoctor(doctor) {
			this.selectedDoctor = doctor;
			this.chatMessages = [];
			this.isLoadingDoctorInfo = true;
			this.connectionResult = null;
			this.$nextTick(() => {
				this.$refs.chatAndDoctorInfo.scrollIntoView({ behavior: 'smooth' });
			});
			setTimeout(() => {
				this.isLoadingDoctorInfo = false;
				if (doctor.online) {
					this.connectionResult = 'success';
					setTimeout(() => {
						this.chatMessages.push(
							`${this.selectedDoctor.name}: 您好，请问有什么可以帮到您的？`
						);
					}, 1000);
				} else {
					this.connectionResult = 'fail';
				}
			}, this.doctorInfoLoadingTime);
		},
		getDoctorResponse(message) {
			console.log('用户输入的消息:', message);
			if (message.includes('眼睛干涩')) {
				console.log('匹配到关键词: 眼睛干涩');
				setTimeout(() => {
					this.chatMessages.push(
						`${this.selectedDoctor.name}: 眼睛干涩可能是用眼过度，要注意休息，也可以使用人工泪液缓解。`
					);
					this.chatMessages.push(
						`${this.selectedDoctor.name}: 平时看电子屏幕的时间长吗？`
					);
				}, this.doctorResponseDelay);
			} else if (message.includes('视力模糊')) {
				setTimeout(() => {
					this.chatMessages.push(
						`${this.selectedDoctor.name}: 视力模糊的情况持续多久了？有没有伴随其他症状，比如眼痛、眼红？`
					);
				}, this.doctorResponseDelay);
			} else if (message.includes('眼红') || message.includes('眼痛')) {
				setTimeout(() => {
					this.chatMessages.push(
						`${this.selectedDoctor.name}: 这种情况可能是炎症引起的，不要用手揉眼睛。最近有没有接触过刺激性物质？`
					);
				}, this.doctorResponseDelay);
			} else {
				setTimeout(() => {
					this.chatMessages.push(
						`${this.selectedDoctor.name}: 请详细描述一下眼睛的症状，比如有没有疼痛、瘙痒、视力变化等。`
					);
				}, this.doctorResponseDelay);
			}
		}
	}
};
</script>
<style scoped>
/* 全局科技感基调 */
#app {
	background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
	max-height: 100vh; /* 设置最大高度为视口高度 */
	overflow-y: auto; /* 添加垂直滚动条 */
}

/* 头部 - 霓虹渐变效果 */
header {
	background: linear-gradient(135deg, #f8fafc 0%, #3b82f7 50%, #f8fafc 100%);
	box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
	position: relative;
	overflow: hidden;
}

header::after {
	content: '';
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background: linear-gradient(
		45deg,
		transparent 25%,
		rgba(255, 255, 255, 0.1) 50%,
		transparent 75%
	);
	animation: shine 8s infinite;
}

@keyframes shine {
	0% {
		transform: rotate(45deg) translateX(-150%);
	}
	100% {
		transform: rotate(45deg) translateX(150%);
	}
}

/* 卡片式模块设计 */
.bg-white {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(203, 213, 225, 0.3);
	border-radius: 16px;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-white:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 32px rgba(30, 64, 175, 0.1);
}

/* 科技感输入框 */
textarea,
input,
select {
	background: rgba(241, 245, 249, 0.5);
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	transition: all 0.3s ease;
}

textarea:focus,
input:focus,
select:focus {
	border-color: #3b82f6;
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* 未来感按钮 */
button {
	background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
	border: none;
	border-radius: 8px;
	color: white;
	font-weight: 600;
	letter-spacing: 0.5px;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

button::after {
	content: '';
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background: linear-gradient(
		45deg,
		transparent 25%,
		rgba(255, 255, 255, 0.2) 50%,
		transparent 75%
	);
	animation: shine 8s infinite;
}

button:hover {
	transform: scale(1.02);
	box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 聊天窗口科技感 */
.chat-window {
	background: rgba(241, 245, 249, 0.5);
	border: 1px solid rgba(226, 232, 240, 0.5);
	border-radius: 12px;
}

.chat-window p {
	background: rgba(255, 255, 255, 0.9);
	padding: 8px 12px;
	border-radius: 8px;
	margin: 6px 0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 标题样式 */
h1,
h2 {
	font-family:
		'Inter',
		system-ui,
		-apple-system,
		sans-serif;
	color: #1e293b;
}

h1 {
	text-shadow: 0 2px 4px rgba(30, 41, 59, 0.1);
}

h2 {
	position: relative;
	padding-bottom: 8px;
	margin-bottom: 1rem;
}

h2::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 40px;
	height: 3px;
	background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
	border-radius: 2px;
}

/* 问诊历史现代风格 */
ul li {
	padding: 1rem;
	margin: 0.5rem 0;
	background: rgba(255, 255, 255, 0.9);
	border-left: 4px solid #3b82f6;
	border-radius: 8px;
	transition: transform 0.2s ease;
}

ul li:hover {
	transform: translateX(4px);
}

/* 医生信息卡片样式 */
.bg-gray-100 {
	background: rgba(243, 244, 246, 0.9);
	backdrop-filter: blur(5px);
	border: 1px solid rgba(209, 213, 219, 0.3);
	border-radius: 12px;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-gray-100:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 16px rgba(75, 85, 99, 0.1);
}
.cursor-pointer {
	cursor: pointer;
}

.typing-indicator {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #666;
	padding: 8px 12px;
}

.dots {
	display: flex;
	gap: 4px;
}

.dot {
	width: 6px;
	height: 6px;
	background: #999;
	border-radius: 50%;
	animation: bounce 1.4s infinite;
}

.dot:nth-child(2) {
	animation-delay: 0.2s;
}
.dot:nth-child(3) {
	animation-delay: 0.4s;
}

@keyframes bounce {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-3px);
	}
}
</style>
