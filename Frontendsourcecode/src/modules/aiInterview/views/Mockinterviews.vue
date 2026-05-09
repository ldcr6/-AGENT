<template>
	<div class="min-h-screen">
		<particles-effect />
		<div class="container mx-auto px-4 py-8">
			<header class="text-center mb-12">
				<h1
					class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2"
				>
					AI 面试助手
				</h1>
				<p class="text-xl text-gray-600">智能虚拟形象面试，助你提升面试表现</p>
			</header>

			<!-- 面试准备区 - 用step控制显示 -->
			<section
				v-if="step === 'prepare'"
				:id="preparationId"
				class="glass-card rounded-xl p-6 mb-8"
			>
				<h2 class="text-2xl font-semibold mb-4 flex items-center">
					<span class="mr-2">📋</span> 面试准备
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 class="text-lg font-medium mb-3">面试类型</h3>
						<div class="grid grid-cols-2 gap-3">
							<button
								v-for="(label, type) in interviewTypes"
								:key="type"
								class="btn-type"
								:class="{
									'bg-blue-500 hover:bg-blue-600 text-white':
										type === 'technical',
									'bg-purple-500 hover:bg-purple-600 text-white':
										type === 'behavioral',
									'bg-green-500 hover:bg-green-600 text-white':
										type === 'english',
									'bg-yellow-500 hover:bg-yellow-600 text-white':
										type === 'industry',
									active: selectedInterviewType === type
								}"
								:data-type="type"
								@click="selectInterviewType(type)"
							>
								{{ label }}
							</button>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-medium mb-3">参数设置</h3>
						<div class="space-y-4">
							<div>
								<label class="block mb-1 text-gray-700">面试反向</label>
								<select
									v-model="order"
									class="w-full bg-white rounded px-3 py-2 border border-gray-200"
								>
									<option v-for="level in orderLevels" :key="level">
										{{ level }}
									</option>
								</select>
							</div>
							<div>
								<label class="block mb-1 text-gray-700">难度级别</label>
								<select
									v-model="selectedDifficulty"
									class="w-full bg-white rounded px-3 py-2 border border-gray-200"
								>
									<option v-for="level in difficultyLevels" :key="level">
										{{ level }}
									</option>
								</select>
							</div>
							<div>
								<label class="block mb-1 text-gray-700">面试官风格</label>
								<select
									v-model="selectedStyle"
									class="w-full bg-white rounded px-3 py-2 border border-gray-200"
								>
									<option v-for="style in interviewerStyles" :key="style">
										{{ style }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-6 pt-6 border-t border-gray-200">
					<h3 class="text-lg font-medium mb-3">设备检测</h3>
					<div class="flex flex-wrap gap-4">
						<button
							id="btn-camera"
							class="px-4 py-2 rounded-full bg-white hover:bg-gray-100 flex items-center border border-gray-200"
							@click="checkCamera"
						>
							<span class="mr-2">📷</span> 摄像头检测
						</button>
						<button
							id="btn-mic"
							class="px-4 py-2 rounded-full bg-white hover:bg-gray-100 flex items-center border border-gray-200"
							@click="checkMicrophone"
						>
							<span class="mr-2">🎤</span> 麦克风检测
						</button>
						<button
							id="btn-light"
							class="px-4 py-2 rounded-full bg-white hover:bg-gray-100 flex items-center border border-gray-200"
							@click="checkLighting"
						>
							<span class="mr-2">💡</span> 环境光线检测
						</button>
					</div>
					<div id="device-status" class="mt-3 text-sm text-gray-500">
						{{ deviceStatusText }}
					</div>
				</div>

				<!-- 音频设置 -->
				<div class="mt-6 pt-6 border-t border-gray-200">
					<h3 class="text-lg font-medium mb-3">音频设置</h3>
					<div class="space-y-3">
						<div class="flex items-center">
							<input
								type="checkbox"
								id="echo-cancellation"
								v-model="enableEchoCancellation"
								class="mr-2"
							/>
							<label for="echo-cancellation" class="text-sm text-gray-700">
								启用回声消除 (推荐)
							</label>
						</div>
						<div class="flex items-center">
							<input
								type="checkbox"
								id="noise-suppression"
								v-model="enableNoiseSuppression"
								class="mr-2"
							/>
							<label for="noise-suppression" class="text-sm text-gray-700">
								启用噪音抑制 (推荐)
							</label>
						</div>
					</div>
					<div class="mt-2 text-xs text-gray-500">
						💡 这些设置可以帮助减少回声和背景噪音，提升面试质量
					</div>
					<div class="mt-3">
						<label class="block text-sm font-medium text-gray-700 mb-2"
							>面试官音量</label
						>
						<div class="flex items-center space-x-3">
							<input
								type="range"
								min="0"
								max="1"
								step="0.1"
								v-model="avatarVolume"
								class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
							<span class="text-sm text-gray-600 w-8"
								>{{ Math.round(avatarVolume * 100) }}%</span
							>
						</div>
					</div>
					<div class="mt-3 space-x-2">
						<button
							class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
							@click="testAudio"
						>
							<span class="mr-2">🎵</span> 测试音频效果
						</button>
						<button
							class="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm"
							@click="testAvatarAudio"
						>
							<span class="mr-2">🎤</span> 测试面试官声音
						</button>
					</div>
				</div>
				<div class="mt-6 text-center">
					<button
						id="btn-start"
						class="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-medium text-lg text-white shadow-lg transition-all transform hover:scale-105 mr-4"
						@click="prepareInterview"
					>
						准备面试
					</button>
				</div>
			</section>

			<!-- 面试准备确认区 -->
			<section
				v-if="step === 'prepare-confirm'"
				:id="prepareConfirmId"
				class="glass-card rounded-xl p-6 mb-8"
			>
				<h2 class="text-2xl font-semibold mb-4 flex items-center">
					<span class="mr-2">🎯</span> 面试准备确认
				</h2>
				<div class="bg-white rounded-lg p-6 shadow">
					<h3 class="text-xl font-medium mb-4">面试配置</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1"
								>面试类型</label
							>
							<div class="px-3 py-2 bg-gray-50 rounded border">
								{{ interviewTypes[selectedInterviewType] }}
							</div>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1"
								>难度级别</label
							>
							<div class="px-3 py-2 bg-gray-50 rounded border">
								{{ selectedDifficulty }}
							</div>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1"
								>面试官风格</label
							>
							<div class="px-3 py-2 bg-gray-50 rounded border">
								{{ selectedStyle }}
							</div>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1"
								>设备状态</label
							>
							<div class="px-3 py-2 bg-gray-50 rounded border">
								<span class="text-green-600">✓ 摄像头</span> |
								<span class="text-green-600">✓ 麦克风</span> |
								<span class="text-green-600">✓ 环境光线</span>
							</div>
						</div>
					</div>
					<div class="text-center space-x-4">
						<button
							class="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium shadow-lg transition-all transform hover:scale-105"
							@click="confirmStartInterview"
						>
							<span class="mr-2">▶️</span> 确认开始面试
						</button>
						<button
							class="px-6 py-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white font-medium shadow-lg transition-all transform hover:scale-105"
							@click="backToPrepare"
						>
							<span class="mr-2">↩️</span> 返回修改
						</button>
					</div>
				</div>
			</section>

			<!-- 视频面试区 - 用step控制显示 -->
			<section
				v-if="step === 'interview'"
				:id="interviewId"
				class="glass-card rounded-xl p-6 mb-8"
			>
				<h2 class="text-2xl font-semibold mb-4 flex items-center">
					<span class="mr-2">🎥</span> 视频面试
				</h2>
				<!-- 倒计时显示 -->
				<div
					v-if="countdownSeconds > 0"
					class="mb-4 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-center animate-pulse"
				>
					<div class="text-white">
						<h3 class="text-2xl font-bold mb-2">面试即将开始</h3>
						<div class="text-6xl font-bold mb-4 animate-bounce">
							{{ countdownSeconds }}
						</div>
						<p class="text-lg">请做好准备，调整好姿势和表情</p>
						<div class="mt-4 flex justify-center space-x-2">
							<div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
							<div
								class="w-3 h-3 bg-white rounded-full animate-pulse"
								style="animation-delay: 0.2s"
							></div>
							<div
								class="w-3 h-3 bg-white rounded-full animate-pulse"
								style="animation-delay: 0.4s"
							></div>
						</div>
					</div>
				</div>

				<!-- 视频加载状态显示 -->
				<div
					v-if="!avatarVideoLoaded && countdownSeconds === 0"
					class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
				>
					<div class="flex items-center">
						<div
							class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"
						></div>
						<span class="text-blue-700">正在启动虚拟面试官，请稍候...</span>
					</div>
				</div>
				<div class="video-container relative">
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
						<div class="lg:col-span-2 relative">
							<!-- 虚拟面试官视频容器 -->
							<div
								class="avatar-container rounded-xl bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden border border-gray-200"
							>
								<video
									ref="avatarVideo"
									v-if="avatarReadyToPlay"
									class="w-full h-full object-cover"
									:src="avatarVideoSrc"
									@ended="onAvatarVideoEnded"
									@loadeddata="onAvatarVideoLoaded"
									@error="onAvatarVideoError"
								></video>
								<!-- 视频加载状态显示 -->
								<div
									v-if="!avatarVideoLoaded"
									class="absolute inset-0 flex items-center justify-center bg-gray-100"
								>
									<div class="text-center">
										<div
											class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"
										></div>
										<p class="text-gray-600">正在加载虚拟面试官...</p>
									</div>
								</div>
							</div>
							<div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
								<div
									v-if="aiFeedback"
									class="feedback-tag px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full"
								>
									{{ aiFeedback }}
								</div>

								<!-- 音量控制 -->
								<div
									class="flex items-center bg-white rounded-full px-3 py-1 shadow"
								>
									<span class="text-sm mr-2">🔊</span>
									<input
										type="range"
										min="0"
										max="1"
										step="0.1"
										v-model="avatarVolume"
										@input="adjustAvatarVolume"
										class="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
									/>
								</div>
							</div>
						</div>
						<div class="relative">
							<!-- 用户视频容器美化 -->
							<div class="user-video-container">
								<video id="user-video" class="user-video" autoplay muted></video>
								<!-- 摄像头状态指示器 -->
								<div
									class="camera-status-indicator"
									:class="{ active: isCameraOn }"
								>
									<div class="status-dot"></div>
									<span class="status-text">{{
										isCameraOn ? '摄像头开启' : '摄像头关闭'
									}}</span>
								</div>
								<!-- 控制按钮组 -->
								<div class="video-controls">
									<button
										id="btn-toggle-camera"
										class="control-btn camera-btn"
										:class="{ active: isCameraOn }"
										@click="toggleCamera"
										:title="isCameraOn ? '关闭摄像头' : '开启摄像头'"
									>
										<span class="btn-icon">{{ isCameraOn ? '📷' : '🚫' }}</span>
									</button>
									<button
										id="btn-toggle-mic"
										class="control-btn mic-btn"
										:class="{ active: isMicOn }"
										@click="toggleMicrophone"
										:title="isMicOn ? '关闭麦克风' : '开启麦克风'"
									>
										<span class="btn-icon">{{ isMicOn ? '🎤' : '🔇' }}</span>
									</button>
									<button
										id="btn-fullscreen"
										class="control-btn fullscreen-btn"
										@click="toggleFullscreen"
										title="全屏显示"
									>
										<span class="btn-icon">⛶</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 面试控制区域 -->
				<div class="mt-6 flex justify-center">
					<button
						@click="endInterview"
						class="end-interview-btn"
						title="结束面试并查看反馈"
					>
						<span class="btn-icon">⏹️</span>
						<span class="btn-text">结束面试</span>
					</button>
				</div>

				<div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="md:col-span-2">
						<div class="mt-4 bg-white rounded-lg p-4 shadow">
							<h3 class="font-medium mb-2 flex items-center">
								<span class="mr-2">🗒️</span> 回答草稿
							</h3>
							<textarea
								class="w-full h-24 bg-gray-50 rounded p-3 border border-gray-200"
								placeholder="可以在这里记录回答要点..."
							></textarea>
						</div>
					</div>
					<div>
						<div class="bg-white rounded-lg p-4 h-full shadow">
							<h3 class="font-medium mb-2 flex items-center">
								<span class="mr-2">🔊</span> 语音转文字
							</h3>
							<div
								id="speech-text"
								class="bg-gray-50 rounded p-3 h-48 overflow-y-auto text-sm border border-gray-200"
							>
								<p v-for="(text, index) in speechTexts" :key="index">{{ text }}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 面试反馈区 - 用step控制显示 -->
			<section v-if="step === 'feedback'" :id="feedbackId" class="glass-card rounded-xl p-6">
				<!-- 详细报告弹窗 -->
				<div
					v-if="showReport"
					class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
					style="overflow: auto"
					@click.self="showReport = false"
				>
					<div
						class="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6"
						@click.stop
					>
						<InterviewReport />
					</div>
				</div>
				<h2 class="text-2xl font-semibold mb-4 flex items-center">
					<span class="mr-2">📊</span> 面试反馈
				</h2>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div class="lg:col-span-2">
						<div class="bg-white rounded-lg p-4 shadow">
							<div class="flex justify-between items-center mb-4">
								<h3 class="text-xl font-medium">能力评估</h3>
								<div class="flex items-center text-sm">
									<div class="flex items-center mr-4">
										<div class="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
										<span>当前表现</span>
									</div>
									<div class="flex items-center">
										<div class="w-3 h-3 bg-gray-200 rounded-full mr-1"></div>
										<span>平均水准</span>
									</div>
								</div>
							</div>
							<div class="chart-container w-full h-72 relative">
								<canvas ref="scoreChartCanvas" class="w-full h-full"></canvas>
								<div
									class="absolute inset-0 flex items-center justify-center pointer-events-none"
								>
									<span class="text-lg font-semibold text-gray-700"
										>能力圆环</span
									>
								</div>
							</div>
						</div>
						<div class="mt-6 bg-white rounded-lg p-6 shadow">
							<h3 class="text-xl font-medium mb-4">详细分析</h3>
							<div class="space-y-4">
								<div>
									<h4 class="font-medium mb-1">语音分析</h4>
									<div class="text-sm text-gray-600">
										平均语速: {{ analysis.speech.speed }} | 停顿次数:
										{{ analysis.speech.pauses }} | 语调变化:
										{{ analysis.speech.tone }}
									</div>
								</div>
								<div>
									<h4 class="font-medium mb-1">肢体语言评估</h4>
									<div class="text-sm text-gray-600">
										头部动作{{ analysis.body.headMovement }}，手势使用{{
											analysis.body.gestures
										}}，眼神交流{{ analysis.body.eyeContact }}
									</div>
								</div>
								<div>
									<h4 class="font-medium mb-1">回答质量</h4>
									<div class="text-sm text-gray-600">
										关键词命中率{{ analysis.content.keywordHit }}，案例{{
											analysis.content.caseQuality
										}}，逻辑结构{{ analysis.content.structure }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="bg-white rounded-lg p-6 h-full shadow">
							<h3 class="text-xl font-medium mb-4">改进建议</h3>
							<ul class="space-y-3">
								<li
									v-for="suggestion in suggestions"
									:key="suggestion"
									class="flex items-start"
								>
									<span class="mr-2">👉</span>
									<span>{{ suggestion }}</span>
								</li>
							</ul>
							<!-- 个性化提升建议 -->
							<div
								v-if="weakestAdvices.length"
								class="mt-6 bg-purple-50 rounded p-4 text-purple-800"
							>
								<h4 class="font-semibold mb-2">个性化提升建议</h4>
								<ul class="list-disc pl-5">
									<li v-for="advice in weakestAdvices" :key="advice">
										{{ advice }}
									</li>
								</ul>
							</div>
							<!-- 学习路线图推荐入口 -->
							<div class="mt-6 text-center">
								<button
									class="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow transition-all"
									@click="showLearningPath"
								>
									🎯 针对薄弱项，查看学习路线图
								</button>
							</div>
							<div class="mt-6">
								<h3 class="font-medium mb-2">视频回放</h3>
								<video class="w-full bg-gray-200 rounded" controls :src="videoUrl">
									您的浏览器不支持视频播放
								</video>
								<div class="mt-3 text-center space-x-3">
									<button
										class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
										@click="showReport = true"
									>
										查看详细报告
									</button>
									<button
										class="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
										@click="restartInterview"
									>
										🔄 重新面试
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<page-footer />
		</div>
	</div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import ParticlesEffect from '../../question/views/ParticlesEffect.vue';
import PageFooter from '../../../components/PageFooter.vue';
import html2pdf from 'html2pdf.js';
import InterviewReport from './InterviewReport.vue';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

// 移除Three.js相关导入，改为视频处理

export default {
	components: {
		ParticlesEffect,
		PageFooter,
		InterviewReport
	},
	data() {
		return {
			step: 'prepare', // 页面切换状态
			preparationId: 'preparation',
			prepareConfirmId: 'prepare-confirm',
			interviewId: 'interview',
			feedbackId: 'feedback',
			interviewTypes: {
				technical: '技术面试',
				behavioral: '行为面试',
				english: '英语面试',
				industry: '行业专项'
			},
			difficultyLevels: ['初级', '中级', '高级'],
			orderLevels: ['前端', '后端', '人工智能','大数据','物联网','智能系统'],
			interviewerStyles: ['友好型', '专业型', '严格型'],
			deviceStatus: {
				camera: false,
				microphone: false,
				lighting: false
			},
			questionBank: {
				technical: [
					'请介绍你最熟悉的编程语言',
					'解释一下 RESTful API 设计原则',
					'如何处理数据库性能优化问题',
					'描述一个你解决过的复杂技术问题'
				],
				behavioral: [
					'描述一次你克服困难的经历',
					'如何处理与同事的意见分歧',
					'举例说明你如何设定并实现目标',
					'描述一次你领导团队的经历'
				],
				english: [
					'Tell me about yourself',
					'What are your strengths and weaknesses?',
					'Describe a challenging project you worked on',
					'Why do you want to work for our company?'
				],
				industry: []
			},
			analysis: {
				speech: { speed: '', pauses: '', tone: '' },
				body: { headMovement: '', gestures: '', eyeContact: '' },
				content: { keywordHit: '', caseQuality: '', structure: '' }
			},
			selectedInterviewType: 'technical',
			selectedDifficulty: '中级',
			order:'前端',
			selectedStyle: '专业型',
			deviceStatusText: '',
			userVideoStream: null,
			currentQuestionIndex: 0,
			totalQuestions: 0,
			currentQuestion: '请先选择面试类型并开始面试',
			timeRemaining: '00:00',
			timer: null,
			aiFeedback: '',
			speechTexts: [],
			scoreChartCanvas: null,
			scoreChart: null,
			isCameraOn: false,
			isMicOn: false,
			suggestions: [],
			videoUrl: '', // 回放视频的URL
			avatarVideoSrc: '/interviewer.mp4', // 虚拟面试官视频源
			avatarVideoLoaded: false,
			avatarReadyToPlay: false,
			countdownTimer: null,
			countdownSeconds: 0,
			enableEchoCancellation: true,
			enableNoiseSuppression: true,
			avatarVolume: 0.8,
			adviceMap: {
				logic: '建议多做逻辑推理训练，例如刷LeetCode、做思维导图等。',
				clarity: '建议多练习结构化表达，比如用STAR法则组织答案。',
				professionalism: '建议多积累专业知识，关注行业动态和案例。',
				adaptability: '建议多参与情景模拟训练，提高应变能力。',
				confidence: '建议多做自我肯定练习，模拟面试时保持自信。'
			},
			showReport: false,
			mediaRecorder: null,
			recordedChunks: []
		};
	},
	computed: {
		weakestAdvices() {
			// 取最近一次评估的分数
			const scores =
				this.analysis && this.analysis.speech
					? this.$refs.scoreChartCanvas
						? this.scoreChart.data.datasets[0].data
						: null
					: null;
			// 兼容性处理，优先用 analysis 里的分数
			let scoreObj = null;
			if (this.scoreChart && this.scoreChart.data && this.scoreChart.data.labels) {
				// 取雷达图labels顺序
				const keys = ['logic', 'clarity', 'professionalism', 'adaptability', 'confidence'];
				const values = this.scoreChart.data.datasets[0].data;
				scoreObj = {};
				keys.forEach((k, i) => {
					scoreObj[k] = values[i];
				});
			} else if (this.analysis && this.analysis.scores) {
				scoreObj = this.analysis.scores;
			}
			if (!scoreObj) return [];
			const entries = Object.entries(scoreObj);
			entries.sort((a, b) => a[1] - b[1]);
			return entries.slice(0, 2).map(([key]) => this.adviceMap[key]);
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initFeedback(); // 会调用 renderScoreChart
		});
	},
	beforeUnmount() {
		this.cleanupVideo();
		// 清理倒计时定时器
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer);
			this.countdownTimer = null;
		}
	},
	methods: {
		// 视频处理方法
		initAvatarVideo() {
			if (!this.$refs.avatarVideo) return;

			const video = this.$refs.avatarVideo;

			// 设置视频样式，隐藏控制条
			video.style.pointerEvents = 'none'; // 禁用点击事件
			video.controls = false; // 隐藏控制条

			// 根据面试官风格选择不同的视频
			this.setAvatarVideoByStyle(this.selectedStyle);

			// 确保虚拟面试官视频有声音
			video.muted = false;
			video.volume = this.avatarVolume; // 使用用户设置的音量

			// 确保视频开始播放
			video.play().catch(error => {
				console.error('视频播放失败:', error);
			});
		},

		setAvatarVideoByStyle(style) {
			// 根据面试官风格设置不同的视频源
			const videoMap = {
				友好型: '/interviewer.mp4',
				专业型: '/interviewer.mp4',
				严格型: '/interviewer.mp4'
			};

			this.avatarVideoSrc = videoMap[style] || '/interviewer.mp4';
		},

		onAvatarVideoLoaded() {
			this.avatarVideoLoaded = true;
			console.log('虚拟面试官视频加载完成');

			// 检查视频音频状态
			const video = this.$refs.avatarVideo;
			if (video) {
				console.log('视频音频状态:', {
					muted: video.muted,
					volume: video.volume,
					readyState: video.readyState,
					networkState: video.networkState
				});
			}
		},

		onAvatarVideoError(event) {
			console.error('虚拟面试官视频加载失败:', event);
			// 如果视频加载失败，可以显示一个占位符或默认图片
			this.avatarVideoLoaded = false;
		},

		onAvatarVideoEnded() {
			// 视频播放结束后暂停
			const video = this.$refs.avatarVideo;
			if (video) {
				video.pause();
			}
			// 自动结束面试
			this.endInterview();
		},

		cleanupVideo() {
			const video = this.$refs.avatarVideo;
			if (video) {
				video.pause();
				video.src = '';
			}
		},
		initFeedback() {
			try {
				const records = JSON.parse(localStorage.getItem('interviewRecords') || '[]');
				const lastRecord = records.length ? records[records.length - 1] : null;

				let feedbackData;
				if (lastRecord) {
					// 确保从存储中获取的数据结构完整
					feedbackData = {
						analysis: lastRecord.analysis || this.generateMockData().analysis,
						suggestions: lastRecord.suggestions || [],
						videoUrl: lastRecord.videoUrl || '',
						scores: lastRecord.scores || this.generateMockData().scores
					};
				} else {
					// 没有记录时使用模拟数据
					feedbackData = this.generateMockData();
				}

				this.analysis = feedbackData.analysis;
				this.suggestions = feedbackData.suggestions;
				this.videoUrl = feedbackData.videoUrl;
				this.renderScoreChart(feedbackData.scores);
			} catch (e) {
				console.error('初始化反馈数据失败:', e);
				const feedbackData = this.generateMockData();
				this.analysis = feedbackData.analysis;
				this.suggestions = feedbackData.suggestions;
				this.videoUrl = feedbackData.videoUrl;
				this.renderScoreChart(feedbackData.scores);
			}
		},
		generateMockData() {
			return {
				scores: {
					logic: this.getRandomScore(7, 9), // 对应"逻辑思维"
					clarity: this.getRandomScore(6, 8), // 对应"表达能力"
					professionalism: this.getRandomScore(7, 9), // 对应"专业素养"
					adaptability: this.getRandomScore(6, 8), // 对应"应变能力"
					confidence: this.getRandomScore(6, 8) // 对应"自信程度"
				},
				analysis: {
					speech: {
						speed: Math.floor(Math.random() * 40) + 140 + '字/分钟',
						pauses: Math.floor(Math.random() * 8) + 2 + '次',
						tone: ['单调', '适中', '丰富'][Math.floor(Math.random() * 3)]
					},
					body: {
						headMovement: ['僵硬', '自然', '过度'][Math.floor(Math.random() * 3)],
						gestures: ['缺乏', '适当', '过多'][Math.floor(Math.random() * 3)],
						eyeContact: ['不足', '良好', '优秀'][Math.floor(Math.random() * 3)]
					},
					content: {
						keywordHit: Math.floor(Math.random() * 20) + 80 + '%',
						caseQuality: ['薄弱', '一般', '丰富'][Math.floor(Math.random() * 3)],
						structure: ['混乱', '一般', '清晰'][Math.floor(Math.random() * 3)]
					}
				},
				suggestions: [
					'练习结构化表达，使用 STAR 法则',
					'减少"嗯"、"啊"等口头禅',
					'增加案例的具体数据支持',
					'保持微笑，展现自信',
					'增加与面试官的眼神交流'
				],
				videoUrl: 'https://example.com/interview-recording.mp4'
			};
		},
		getRandomScore(min, max) {
			return Number((min + Math.random() * (max - min)).toFixed(1));
		},
		//创建雷达图
		renderScoreChart(scores) {
			this.$nextTick(() => {
				const canvas = this.$refs.scoreChartCanvas;
				if (!canvas) return;
				const ctx = canvas.getContext('2d');
				if (this.scoreChart) {
					this.scoreChart.destroy();
				}
				// 定义标签和数据点
				const labels = ['逻辑思维', '表达能力', '专业素养', '应变能力', '自信程度'];
				const scoreValues = [
					scores.logic,
					scores.clarity,
					scores.professionalism,
					scores.adaptability,
					scores.confidence
				];
				const avgValues = [7.5, 7.2, 7.8, 7.0, 7.3];

				// 圆环图只显示当前表现，平均水准可用辅助图例或提示
				this.scoreChart = new Chart(ctx, {
					type: 'doughnut',
					data: {
						labels: labels,
						datasets: [
							{
								label: '当前表现',
								data: scoreValues,
								backgroundColor: [
									'rgba(79, 70, 229, 0.7)', // 蓝紫
									'rgba(139, 92, 246, 0.7)', // 紫
									'rgba(16, 185, 129, 0.7)', // 绿
									'rgba(251, 191, 36, 0.7)', // 黄
									'rgba(239, 68, 68, 0.7)' // 红
								],
								borderColor: [
									'rgba(79, 70, 229, 1)',
									'rgba(139, 92, 246, 1)',
									'rgba(16, 185, 129, 1)',
									'rgba(251, 191, 36, 1)',
									'rgba(239, 68, 68, 1)'
								],
								borderWidth: 2
							}
						]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: false // 隐藏图例，因为 datalabels 会显示标签
							},
							tooltip: {
								backgroundColor: 'rgba(255, 255, 255, 0.95)',
								titleColor: '#1f2937',
								bodyColor: '#374151',
								borderColor: '#e5e7eb',
								borderWidth: 1,
								padding: 12,
								displayColors: true,
								callbacks: {
									label: function (context) {
										const total = context.dataset.data.reduce(
											(a, b) => a + b,
											0
										);
										const value = context.parsed;
										const percent = ((value / total) * 100).toFixed(1) + '%';
										return `${context.label}: ${context.formattedValue} (${percent})`;
									}
								}
							},
							datalabels: {
								color: '#fff',
								textAlign: 'center',
								font: {
									weight: 'bold',
									size: 12,
									family: "'Noto Sans SC', sans-serif"
								},
								formatter: (value, context) => {
									const total = context.chart.data.datasets[0].data.reduce(
										(a, b) => a + b,
										0
									);
									const percent = ((value / total) * 100).toFixed(1) + '%';
									// 当扇区占比太小时，不显示标签，防止重叠
									if ((value / total) * 100 < 8) {
										return '';
									}
									return `${context.chart.data.labels[context.dataIndex]}\n${percent}`;
								}
							}
						},
						animation: {
							duration: 2000,
							easing: 'easeOutQuart'
						}
					}
				});
			});
		},
		selectInterviewType(type) {
			this.selectedInterviewType = type;
		},
		async checkCamera() {
			this.deviceStatusText = '摄像头检测中...';
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				const videoTracks = stream.getVideoTracks();
				const settings = videoTracks[0].getSettings();
				this.deviceStatus.camera = true;
				this.deviceStatusText = `摄像头检测完成 (${settings.width}x${settings.height})`;
				videoTracks.forEach(track => track.stop());
			} catch (error) {
				this.deviceStatus.camera = false;
				this.deviceStatusText = '摄像头检测失败: ' + error.message;
			}
		},
		async checkMicrophone() {
			this.deviceStatusText = '麦克风检测中...';
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				const audioTracks = stream.getAudioTracks();
				this.deviceStatus.microphone = true;
				this.deviceStatusText = '麦克风检测完成 (清晰)';
				audioTracks.forEach(track => track.stop());
			} catch (error) {
				this.deviceStatus.microphone = false;
				this.deviceStatusText = '麦克风检测失败: ' + error.message;
			}
		},
		checkLighting() {
			this.deviceStatusText = '环境光线检测中...';
			setTimeout(() => {
				this.deviceStatus.lighting = true;
				this.deviceStatusText = '环境光线良好 (建议增加侧面补光)';
			}, 1500);
		},

		async testAudio() {
			try {
				this.deviceStatusText = '正在测试音频效果...';

				// 获取音频流进行测试
				const testStream = await navigator.mediaDevices.getUserMedia({
					audio: {
						echoCancellation: this.enableEchoCancellation,
						noiseSuppression: this.enableNoiseSuppression,
						autoGainControl: true
					}
				});

				// 创建音频上下文来测试音频
				const audioContext = new (window.AudioContext || window.webkitAudioContext)();
				const source = audioContext.createMediaStreamSource(testStream);
				const analyser = audioContext.createAnalyser();
				source.connect(analyser);

				// 测试5秒
				setTimeout(() => {
					testStream.getTracks().forEach(track => track.stop());
					audioContext.close();
					this.deviceStatusText = '音频测试完成！回声消除和噪音抑制已启用';
				}, 5000);
			} catch (error) {
				console.error('音频测试失败:', error);
				this.deviceStatusText = '音频测试失败: ' + error.message;
			}
		},

		async testAvatarAudio() {
			try {
				this.deviceStatusText = '正在测试面试官声音...';

				// 创建一个临时的视频元素来测试面试官声音
				const testVideo = document.createElement('video');
				testVideo.src = this.avatarVideoSrc;
				testVideo.muted = false;
				testVideo.volume = this.avatarVolume;

				// 播放3秒后停止
				testVideo
					.play()
					.then(() => {
						setTimeout(() => {
							testVideo.pause();
							testVideo.src = '';
							this.deviceStatusText = '面试官声音测试完成！';
						}, 3000);
					})
					.catch(error => {
						console.error('面试官声音测试失败:', error);
						this.deviceStatusText = '面试官声音测试失败: ' + error.message;
					});
			} catch (error) {
				console.error('面试官声音测试失败:', error);
				this.deviceStatusText = '面试官声音测试失败: ' + error.message;
			}
		},
		prepareInterview() {
			// 检查设备状态
			if (!this.deviceStatus.camera || !this.deviceStatus.microphone) {
				alert('请先完成设备检测');
				return;
			}
			this.step = 'prepare-confirm';
		},

		backToPrepare() {
			this.step = 'prepare';
		},

		confirmStartInterview() {
			this.setAvatarType(this.selectedStyle);
			// 重置视频加载状态
			this.avatarVideoLoaded = false;
			this.avatarReadyToPlay = false;
			localStorage.setItem(
				'interviewConfig',
				JSON.stringify({
					type: this.selectedInterviewType,
					difficulty: this.selectedDifficulty,
					style: this.selectedStyle,
					timestamp: new Date().toISOString()
				})
			);
			this.step = 'interview'; // 用响应式变量切换页面
			this.initVideoStream();
			this.startInterviewFlow(this.selectedInterviewType);

			// 开始倒计时
			this.startCountdown();
		},

		restartInterview() {
			// 重置所有状态
			this.step = 'prepare';
			this.currentQuestionIndex = 0;
			this.totalQuestions = 0;
			this.currentQuestion = '请先选择面试类型并开始面试';
			this.timeRemaining = '00:00';
			this.aiFeedback = '';
			this.speechTexts = [];
			this.avatarVideoLoaded = false;
			this.avatarReadyToPlay = false;
			this.countdownSeconds = 0;

			// 清理定时器
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}

			// 清理倒计时定时器
			if (this.countdownTimer) {
				clearInterval(this.countdownTimer);
				this.countdownTimer = null;
			}

			// 清理视频流
			if (this.userVideoStream) {
				this.userVideoStream.getTracks().forEach(track => track.stop());
				this.userVideoStream = null;
			}

			// 清理虚拟面试官视频
			this.cleanupVideo();
		},

		startCountdown() {
			this.countdownSeconds = 3;
			this.countdownTimer = setInterval(() => {
				this.countdownSeconds--;
				if (this.countdownSeconds <= 0) {
					clearInterval(this.countdownTimer);
					this.countdownTimer = null;
					// 倒计时结束，准备好视频但不播放
					this.avatarReadyToPlay = true;
					this.$nextTick(() => {
						const video = this.$refs.avatarVideo;
						if (video) {
							video.load(); // 重新加载视频
							// 等2秒后再播放
							setTimeout(() => {
								video.play().catch(err => {
									console.error('延迟播放失败:', err);
								});
							}, 2000);
						}
					});
				}
			}, 1000);
		},

		adjustAvatarVolume() {
			const video = this.$refs.avatarVideo;
			if (video) {
				video.volume = this.avatarVolume;
			}
		},

		startInterview() {
			this.prepareInterview();
		},
		// 设置虚拟面试官风格
		setAvatarType(style) {
			this.setAvatarVideoByStyle(style);
		},
		async initVideoStream() {
			try {
				this.userVideoStream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: {
						echoCancellation: this.enableEchoCancellation,
						noiseSuppression: this.enableNoiseSuppression,
						autoGainControl: true
					}
				});
				const userVideo = document.getElementById('user-video');
				userVideo.srcObject = this.userVideoStream;

				// 确保用户视频静音，避免回声
				userVideo.muted = true;
				userVideo.volume = 0;

				// 初始化摄像头和麦克风状态
				this.isCameraOn = true;
				this.isMicOn = true;

				// ====== 录制功能集成 ======
				if (this.userVideoStream) {
					this.recordedChunks = [];
					try {
						this.mediaRecorder = new MediaRecorder(this.userVideoStream, {
							mimeType: 'video/webm'
						});
					} catch (e) {
						this.mediaRecorder = new MediaRecorder(this.userVideoStream);
					}
					this.mediaRecorder.ondataavailable = e => {
						if (e.data.size > 0) this.recordedChunks.push(e.data);
					};
					this.mediaRecorder.onstop = this.handleRecordingStop;
					this.mediaRecorder.start();
				}
				// ====== 录制功能集成 END ======
			} catch (error) {
				console.error('无法获取媒体设备:', error);
				alert('无法访问摄像头或麦克风: ' + error.message);
			}
		},
		startInterviewFlow(type) {
			this.speechTexts = [];
			const questions = this.questionBank[type] || this.questionBank.technical;
			this.totalQuestions = questions.length;
			this.currentQuestionIndex = 0;
			this.showQuestion(questions, this.currentQuestionIndex);
			this.initSpeechRecognition();
		},
		showQuestion(questions, index) {
			if (index >= questions.length) {
				this.endInterview();
				return;
			}
			this.currentQuestion = questions[index];
			this.currentQuestionIndex = index;
			this.startTimer(120, () => {
				// 修复：使用正确的索引递增逻辑
				this.showQuestion(questions, index + 1);
			});
			this.generateRandomFeedback();
		},
		startTimer(duration, callback) {
			let timeLeft = duration;
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				timeLeft--;
				const minutes = Math.floor(timeLeft / 60);
				const seconds = timeLeft % 60;
				this.timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
				if (timeLeft <= 0) {
					clearInterval(this.timer);
					callback();
				}
			}, 1000);
		},
		generateRandomFeedback() {
			const feedbacks = [
				'语速稍快',
				'增加眼神交流',
				'使用具体案例',
				'减少口头禅',
				'表达更结构化',
				'保持微笑'
			];
			const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
			this.aiFeedback = randomFeedback;
		},
		endInterview() {
			this.$nextTick(() => {
				this.initFeedback();
			});
			if (this.userVideoStream) {
				this.userVideoStream.getTracks().forEach(track => track.stop());
			}
			// ====== 录制功能集成 ======
			if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
				this.mediaRecorder.stop();
			}
			// ====== 录制功能集成 END ======
			this.saveInterviewRecord();
			this.step = 'feedback'; // 用响应式变量切换页面
			this.cleanupVideo();
			this.avatarReadyToPlay = false;
		},
		saveInterviewRecord() {
			const config = JSON.parse(localStorage.getItem('interviewConfig') || '{}');
			const records = JSON.parse(localStorage.getItem('interviewRecords') || '[]');
			records.push({
				...config,
				completedAt: new Date().toISOString(),
				score: Math.floor(Math.random() * 3) + 7 + Math.random().toFixed(1)
			});
			localStorage.setItem('interviewRecords', JSON.stringify(records));
		},
		initSpeechRecognition() {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			if (!SpeechRecognition) {
				console.warn('浏览器不支持语音识别 API');
				return;
			}
			const recognition = new SpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'zh-CN';
			recognition.onresult = event => {
				for (let i = event.resultIndex; i < event.results.length; i++) {
					const transcript = event.results[i][0].transcript;
					if (event.results[i].isFinal) {
						this.speechTexts.push(transcript);
					} else {
						// 可选：也可以只在 isFinal 时 push，避免重复
					}
				}
				this.$nextTick(() => {
					const el = document.getElementById('speech-text');
					if (el) el.scrollTop = el.scrollHeight;
				});
			};
			recognition.onerror = event => {
				console.error('语音识别错误:', event.error);
			};
			recognition.start();
		},
		toggleCamera() {
			const userVideo = document.getElementById('user-video');
			if (userVideo.srcObject) {
				const videoTracks = userVideo.srcObject.getVideoTracks();
				videoTracks.forEach(track => {
					track.enabled = !track.enabled;
					this.isCameraOn = track.enabled;
				});
			}
		},
		toggleMicrophone() {
			const userVideo = document.getElementById('user-video');
			if (userVideo.srcObject) {
				const audioTracks = userVideo.srcObject.getAudioTracks();
				audioTracks.forEach(track => {
					track.enabled = !track.enabled;
					this.isMicOn = track.enabled;
				});
			}
		},
		toggleFullscreen() {
			const elem = document.getElementById('user-video');
			if (!document.fullscreenElement) {
				elem.requestFullscreen().catch(err => {
					console.error(`全屏错误: ${err.message}`);
				});
			} else {
				document.exitFullscreen();
			}
		},
		saveReport() {
			// 获取要导出的 DOM 元素
			const reportElement = this.$refs.interviewReport;
			if (!reportElement) {
				alert('未找到报告内容');
				return;
			}
			const opt = {
				margin: 0.5,
				filename: '面试报告.pdf',
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2, useCORS: true },
				jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
			};
			html2pdf().set(opt).from(reportElement).save();
		},
		showLearningPath() {
			this.$router.push({
				path: '/aiInterview/LearningPath'
				/* query: { weakPoints: JSON.stringify(this.weakestAdvices) } */
			});
		},
		handleRecordingStop() {
			const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
			this.videoUrl = URL.createObjectURL(blob);
		}
	}
};
</script>

<style scoped>
@import '/@/assets/styles/Mockinterview.css';
</style>
