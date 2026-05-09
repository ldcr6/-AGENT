<template>
	<div class="ai-assistant-container">
		<audio
			ref="ringtoneAudio"
			src="/audio/xiangshei.mp3"
			loop
			preload="auto"
			style="display: none"
		/>
		<ParticlesEffect />
		<!-- 头部区域 -->
		<header class="header">
			<!-- 背景动画粒子 -->
			<div class="header-bg-animation">
				<div class="floating-particles">
					<div class="particle" v-for="i in 20" :key="i"></div>
				</div>
				<div class="gradient-overlay"></div>
			</div>

			<div class="header-content">
				<!-- 左侧Logo和标题区域 -->
				<div class="header-left">
					<div class="logo-container">
						<div class="logo-icon">
							<i class="fas fa-robot"></i>
						</div>
						<div class="logo-text">
							<h1 class="app-title">AI助手</h1>
							<p class="app-subtitle">智能对话 · 无限可能</p>
						</div>
					</div>
				</div>

				<!-- 中间AI面试官选择区块 -->
				<div class="header-center">
					<div class="interviewer-section">
						<div class="section-label">
							<i class="fas fa-users"></i>
							<span>选择面试助手</span>
						</div>
						<hr />
						<div class="interviewer-select">
							<div
								v-for="(interviewer, idx) in interviewers"
								:key="interviewer.id"
								class="interviewer-card"
								:class="{ selected: idx === selectedInterviewerIndex }"
								@click="selectInterviewer(idx)"
							>
								<div class="card-glow"></div>
								<div class="avatar-container">
									<img
										:src="interviewer.avatar"
										:alt="interviewer.name"
										class="interviewer-avatar"
									/>
									<div class="status-indicator"></div>
								</div>
								<div class="interviewer-info">
									<span class="interviewer-name">{{ interviewer.name }}</span>
									<span class="interviewer-role">{{ interviewer.role }}</span>
								</div>
								<div class="selection-indicator">
									<i class="fas fa-check"></i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 右侧控制区域 -->
				<div class="header-right">
					<div class="control-panel">
						<!-- 主题切换 -->
						<div class="theme-toggle">
							<div class="toggle-container">
								<i class="fas fa-sun light-icon"></i>
								<input
									type="checkbox"
									id="theme-switch"
									v-model="darkMode"
									@change="toggleTheme"
								/>
								<label for="theme-switch" class="switch"></label>
								<i class="fas fa-moon dark-icon"></i>
							</div>
						</div>

						<!-- 状态指示器 -->
						<div class="status-indicators">
							<div class="status-item">
								<div class="status-dot online"></div>
								<span>在线</span>
							</div>
							<div class="status-item">
								<div class="status-dot recording" v-if="isRecording"></div>
								<span v-if="isRecording">录音中</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<!-- AI助手信息区块 -->
		<div class="ai-assistant-info-bar">
			<!-- 小贴士 -->
			<div class="tips-section">
				<i class="fa fa-lightbulb"></i>
				<span>{{ randomTip }}</span>
			</div>
			<!-- 会话统计 -->
			<div class="stats-section">
				<i class="fa fa-comments"></i>
				<span>会话轮数：{{ chatHistory.length }}</span>
				<span>累计字数：{{ totalWords }}</span>
			</div>
			<!-- 能力展示 -->
			<div class="abilities-section">
				<i class="fa fa-robot"></i>
				<span>我可以帮你：</span>
				<span class="ability">技术问答</span>
				<span class="ability">面试模拟</span>
				<span class="ability">代码生成</span>
				<span class="ability">知识讲解</span>
			</div>
		</div>

		<div class="main-flex">
			<!-- 聊天区域 -->
			<main class="chat-container">
				<div class="chat-messages" ref="messagesEnd">
					<!-- 历史消息 -->
					<div
						class="message"
						:class="{
							'user-message': message.isUser,
							'ai-message': !message.isUser,
							'dark-mode': darkMode
						}"
						v-for="(message, index) in chatHistory"
						:key="index"
					>
						<div
							class="avatar"
							:class="{ 'user-avatar': message.isUser, 'ai-avatar': !message.isUser }"
						>
							<img
								:src="
									message.isUser
										? 'https://picsum.photos/id/1005/40/40'
										: currentInterviewer.avatar
								"
								alt="头像"
							/>
						</div>
						<div class="message-main">
							<div class="message-sender">
								{{ message.isUser ? '我' : currentInterviewer.name }}
							</div>
							<div class="message-content">
								<p class="message-text" v-html="message.content"></p>
								<p class="message-time">
									{{ formatTime(new Date(message.timestamp)) }}
								</p>
							</div>
						</div>
					</div>

					<!-- 正在输入指示器 -->
					<div
						v-if="isLoading"
						class="message ai-message typing-indicator"
						:class="{ 'dark-mode': darkMode }"
					>
						<div class="avatar ai-avatar">
							<img src="https://picsum.photos/id/1/40/40" alt="AI头像" />
						</div>
						<div class="message-content">
							<div class="typing-dots">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				</div>

				<!-- 输入区域 -->
				<div class="input-area" :class="{ 'dark-mode': darkMode }">
					<textarea
						v-model="userInput"
						placeholder="请输入您的问题..."
						@keydown="handleInputKeydown"
						:class="{ 'dark-mode': darkMode }"
					></textarea>
					<div class="input-actions">
						<!-- 语音输入按钮 -->
						<button @click="startVideoCall" class="video-call-btn">
							<i class="fa fa-video"></i> 视频通话
						</button>
						<button
							@click="toggleVoiceInput"
							:class="[
								'voice-button',
								{ recording: isRecording, 'dark-mode': darkMode }
							]"
							:disabled="isLoading"
							:title="isRecording ? '点击停止录音' : '点击开始语音输入'"
						>
							<i :class="isRecording ? 'fa fa-stop' : 'fa fa-microphone'"></i>
							{{ isRecording ? '录音中...' : '语音' }}
						</button>

						<button
							@click="sendMessage"
							:disabled="!userInput.trim()"
							class="send-button"
						>
							<i class="fa fa-paper-plane">发送</i>
						</button>
						<button v-if="isLoading" @click="stopAnswer" class="stop-button">
							<i class="fa fa-stop-circle"></i> 终止回答
						</button>
					</div>

					<!-- 语音识别状态显示 -->
					<div v-if="isRecording" class="voice-status">
						<div class="voice-waves">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<p class="voice-text">{{ voiceText || '正在听您说话...' }}</p>
					</div>
				</div>
			</main>

			<!-- 右侧面试题库区块 -->
			<aside class="question-bank" :class="{ collapsed: questionBankCollapsed }">
				<div class="question-bank-header" @click="toggleQuestionBank">
					<span>面试题库</span>
					<i
						:class="
							questionBankCollapsed ? 'fa fa-chevron-left' : 'fa fa-chevron-right'
						"
					></i>
				</div>
				<transition-group name="fade-slide" tag="div" class="question-list">
					<div v-for="q in questionBank" :key="q.id" class="question-card">
						<div class="question-title">{{ q.title }}</div>
						<div class="question-category">{{ q.category }}</div>
						<button class="add-to-chat" @click="addQuestionToChat(q)">一键提问</button>
					</div>
				</transition-group>
			</aside>
		</div>

		<!-- 底部区域 -->
		<!-- 页脚 -->
		<PageFooter />
	</div>
	<div v-if="showVideoCall" class="video-call-modal">
		<div class="video-call-content" :class="{ incoming: callState === 'incoming' }">
			<div v-if="callState === 'incoming'">
				<img class="avatar" :src="callAvatar" />
				<div class="nickname">{{ callNickname }}</div>
				<div class="call-tip">{{ callTip }}</div>
				<div class="call-actions">
					<button class="call-btn hangup" @click="endCall">
						<i class="fa fa-phone"></i>
					</button>
					<button class="call-btn accept" @click="acceptCall">
						<i class="fa fa-phone"></i>
					</button>
				</div>
			</div>
			<div v-else-if="callState === 'active'" class="avatar-video-area">
				<div id="ai-avatar-mount" class="avatar-video-wrapper"></div>
				<div class="call-actions">
					<button class="call-btn hangup" @click="endCall">
						<i class="fa fa-phone"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue';
import requestSpark from '../../../api/xinghuo/SparkWebSocketUtil'; // 引入星火API工具
import PageFooter from '../../../components/PageFooter.vue';
import ParticlesEffect from '../../question/views/ParticlesEffect.vue';
import AvatarPlatform, {
	PlayerEvents,
	SDKEvents
} from '/@/api/sdk/3.1.2.1002/avatar-sdk-web_3.1.2.1002/index.js';
let cozeInited = false;

pnpm devexport default {
	components: {
		PageFooter,
		ParticlesEffect
	},
	setup() {
		// 状态管理
		const darkMode = ref(false);
		const userInput = ref('');
		const chatHistory = ref([]);
		const isLoading = ref(false);
		const messagesEnd = ref(null);
		const cozeClient = ref(null);
		let stopAnswerFlag = false;
		const isRecording = ref(false);
		const voiceText = ref('');
		const showVideoCall = ref(false);
		const callState = ref('incoming'); // 'incoming' | 'active' | 'ended'
		const callAvatar = ref('https://picsum.photos/id/1011/120/120');
		const callNickname = ref('AI面试官');
		const callTip = ref('小智向您来电');
		const ringtoneAudio = ref(null);
		let avatarPlatform = null;
		let player = null;
		let recorder = null;
		const isReady = ref(false);
		const GREETING_ACTION = 'A_RH_hello_O';

		function endCall() {
			showVideoCall.value = false;
			callState.value = 'ended';
		}
		function acceptCall() {
			callState.value = 'active';
			// 后续可扩展：显示虚拟人视频区
		}

		function startVideoCall() {
			callState.value = 'ended';
			setTimeout(() => {
				callState.value = 'incoming';
				showVideoCall.value = true;
			}, 0);
		}

		// 面试官选择
		const interviewers = ref([
			{
				id: 1,
				name: '小智',
				role: '前端智能助手',
				avatar: 'https://picsum.photos/id/1011/40/40'
			},
			{
				id: 2,
				name: '小美',
				role: '后端智能助手',
				avatar: 'https://picsum.photos/id/1012/40/40'
			},
			{
				id: 3,
				name: '小李',
				role: '算法智能助手',
				avatar: 'https://picsum.photos/id/1013/40/40'
			}
		]);
		const selectedInterviewerIndex = ref(0);
		const currentInterviewer = computed(
			() => interviewers.value[selectedInterviewerIndex.value]
		);

		function getWelcomeMessage() {
			return `你好！我是${currentInterviewer.value.name}，${currentInterviewer.value.role}，有什么可以帮助你的吗？`;
		}

		const selectInterviewer = idx => {
			selectedInterviewerIndex.value = idx;
			// 清空历史
			chatHistory.value = [];
			// 插入新欢迎消息
			chatHistory.value.push({
				content: getWelcomeMessage(),
				isUser: false,
				timestamp: Date.now()
			});
			scrollToBottom();
		};

		// 面试题库
		const questionBank = ref([
			{ id: 1, title: '说说你对Vue响应式原理的理解', category: '前端' },
			{ id: 2, title: '什么是闭包？', category: 'JavaScript' },
			{ id: 3, title: 'HTTP和HTTPS的区别？', category: '网络' },
			{ id: 4, title: '数据库索引的原理？', category: '后端' },
			{ id: 5, title: '手写一个防抖函数', category: '算法' }
		]);
		const questionBankCollapsed = ref(false);
		const toggleQuestionBank = () => {
			questionBankCollapsed.value = !questionBankCollapsed.value;
		};
		const addQuestionToChat = q => {
			userInput.value = q.title;
			sendMessage();
		};

		// 面试进度条
		const progressPercent = ref(40); // 示例进度，可根据实际逻辑动态调整

		// 主题切换
		const toggleTheme = () => {
			document.documentElement.classList.toggle('dark');
		};

		// 格式化时间
		const formatTime = date => {
			return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		};

		// 添加换行
		const addNewLine = e => {
			// 阻止默认行为，允许在textarea中添加换行
			e.preventDefault();
			userInput.value += '\n';
		};

		// Markdown转纯文本
		function markdownToText(md) {
			// 1. 将"### 标题"替换为数字序号
			let headingIndex = 1;
			md = md.replace(/^###\s?(.+)$/gm, function (match, p1) {
				return headingIndex++ + '. ' + p1;
			});
			// 2. 去除其它标题
			md = md.replace(/^#+\s?/gm, '');
			// 3. 去除加粗/斜体
			md = md.replace(/\*\*([^*]+)\*\*/g, '$1');
			md = md.replace(/\*([^*]+)\*/g, '$1');
			md = md.replace(/\_([^_]+)\_/g, '$1');
			// 4. 去除无序列表符号
			md = md.replace(/^\s*[-*+]\s+/gm, '');
			// 5. 去除有序列表符号
			md = md.replace(/^\s*\d+\.\s+/gm, '');
			// 6. 去除多余空行
			md = md.replace(/\n{2,}/g, '\n');
			// 7. 去除行首空格
			md = md.replace(/^\s+/gm, '');
			return md;
		}

		// 判断用户是否在底部
		function isAtBottom() {
			const el = messagesEnd.value;
			if (!el) return true;
			const rect = el.getBoundingClientRect();
			// 距离窗口底部小于100px认为在底部
			return rect.bottom - window.innerHeight < 100;
		}

		// 滚动到底部，force为true时强制滚动
		const scrollToBottom = (force = false) => {
			if (force || isAtBottom()) {
				setTimeout(() => {
					messagesEnd.value?.scrollIntoView({ behavior: 'smooth' });
				}, 100);
			}
		};

		// 发送消息
		const sendMessage = async () => {
			if (!userInput.value.trim()) return;

			// 添加用户消息到历史记录
			const userMessage = {
				content: userInput.value.replace(/\n/g, '<br>'),
				isUser: true,
				timestamp: Date.now()
			};
			chatHistory.value.push(userMessage);
			const currentInput = userInput.value; // 记录当前输入
			userInput.value = '';
			scrollToBottom(true); // 用户主动发送时强制滚动

			// 显示加载状态
			isLoading.value = true;
			stopAnswerFlag = false;

			try {
				// 只传当前输入内容给AI
				const question = [
					{
						role: 'user',
						content: currentInput
					}
				];

				let aiResponse = '';
				let aiMessageIndex = null;
				// 使用Promise包装API调用，确保等待完整响应
				await new Promise((resolve, reject) => {
					requestSpark(question, message => {
						if (stopAnswerFlag) {
							isLoading.value = false;
							resolve();
							return;
						}
						if (message) {
							aiResponse += message;
							// 只在第一次插入AI消息
							if (aiMessageIndex === null) {
								chatHistory.value.push({
									content: markdownToText(aiResponse.replace(/\n/g, '<br>')),
									isUser: false,
									timestamp: Date.now()
								});
								aiMessageIndex = chatHistory.value.length - 1;
							} else {
								// 后续流式更新，直接更新最后一条
								chatHistory.value[aiMessageIndex].content = markdownToText(
									aiResponse.replace(/\n/g, '<br>')
								);
							}
							scrollToBottom(); // 只有在底部才自动滚动
						}
					});
					// 设置超时（15秒）
					setTimeout(() => {
						if (aiResponse) {
							resolve();
						} else {
							reject(new Error('响应超时'));
						}
					}, 15000);
				});

				// 如果AI没有返回内容，补充一条错误消息
				if (!aiResponse) {
					chatHistory.value.push({
						content: '抱歉，我遇到了一些问题，无法回答您的问题。',
						isUser: false,
						timestamp: Date.now()
					});
				}
			} catch (error) {
				console.error('API调用错误:', error);
				// 添加错误消息到历史记录
				chatHistory.value.push({
					content: '抱歉，我遇到了一些问题，无法回答您的问题。',
					isUser: false,
					timestamp: Date.now()
				});
			} finally {
				isLoading.value = false;
				scrollToBottom();
			}
		};

		// 终止AI回答
		const stopAnswer = () => {
			stopAnswerFlag = true;
			isLoading.value = false;
		};

		// 监听暗黑模式变化
		watch(darkMode, newValue => {
			if (newValue) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});

		// 初始化Coze聊天
		const initCozeChat = () => {
			if (cozeInited) return;
			cozeInited = true;

			// 确保容器存在且为空
			const container = document.getElementById('coze-chat-container');
			if (container) container.innerHTML = '';

			if (window.CozeWebSDK) {
				cozeClient.value = new window.CozeWebSDK.WebChatClient({
					config: {
						bot_id: '7525438305182793747',
						isIframe: true,
						chatBot: {
							isNeedAudio: true // 这里启用语音输入
							// 你还可以加 title、uploadable、width 等其它 chatBot 支持的参数
						},
						// 添加消息过滤器防止格式错误
						message_filter: message => {
							if (message.type !== 'text') {
								console.warn('不支持的富媒体消息类型:', message.type);
								return {
									...message,
									content: '此消息格式不支持显示，请使用纯文本交互'
								};
							}
							return message;
						}
					},
					componentProps: {
						title: 'Coze',
					},
					auth: {
						type: 'token',
						token:'pat_Y2SDFKLPqIu0bAJ8LmL57EUaQVo3TZCwHYVrnWeTsXF3u7IdfuhKjFpEKLJmM2pG',
						onRefreshToken: () =>
							'pat_Y2SDFKLPqIu0bAJ8LmL57EUaQVo3TZCwHYVrnWeTsXF3u7IdfuhKjFpEKLJmM2pG'
					},
					feedback: {
						isNeedFeedback: true,
						feedbackPanel: {
							title: '您对这个回答有什么看法？请告诉我们',
							placeholder: '请详细描述您的问题...',
							tags: [
								{
									label: '信息不正确'
								},
								{
									label: '涉及敏感信息',
									isNeedDetail: true
								}
							]
						}
					}
				});
			}
		};

		// 销毁Coze客户端
		const destroyCozeClient = () => {
			cozeInited = false;

			// 安全销毁SDK实例
			if (cozeClient.value && typeof cozeClient.value.destroy === 'function') {
				cozeClient.value.destroy();
			}
		};

		// 初始化
		onMounted(() => {
			// 检测系统主题偏好
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				darkMode.value = true;
			}
			initCozeChat();
			// 页面初始插入一条欢迎消息
			chatHistory.value = [
				{
					content: getWelcomeMessage(),
					isUser: false,
					timestamp: Date.now()
				}
			];
		});

		// 组件卸载前清理资源
		onBeforeUnmount(() => {
			destroyCozeClient();
			destroyAvatarPlatform();

			// 清理语音识别
			if (recognition) {
				recognition.stop();
				recognition = null;
			}
			if (isRecording.value) {
				isRecording.value = false;
			}
			if (ringtoneAudio.value) {
				ringtoneAudio.value.pause();
				ringtoneAudio.value.currentTime = 0;
			}
		});

		// 语音识别相关变量
		let recognition = null;
		const mediaRecorder = null;
		const audioChunks = [];

		// 初始化语音识别
		const initSpeechRecognition = () => {
			if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
				const SpeechRecognition =
					window.SpeechRecognition || window.webkitSpeechRecognition;
				recognition = new SpeechRecognition();

				recognition.continuous = true;
				recognition.interimResults = true;
				recognition.lang = 'zh-CN'; // 设置为中文

				recognition.onstart = () => {
					console.log('语音识别开始');
				};

				recognition.onresult = event => {
					let interimTranscript = '';
					let finalTranscript = '';

					for (let i = event.resultIndex; i < event.results.length; i++) {
						const transcript = event.results[i][0].transcript;
						if (event.results[i].isFinal) {
							finalTranscript += transcript;
						} else {
							interimTranscript += transcript;
						}
					}

					voiceText.value = finalTranscript || interimTranscript;
				};

				recognition.onerror = event => {
					console.error('语音识别错误:', event.error);
					isRecording.value = false;
					voiceText.value = '';
				};

				recognition.onend = () => {
					console.log('语音识别结束');
					if (isRecording.value) {
						// 如果还在录音状态，重新开始
						recognition.start();
					}
				};
			} else {
				console.warn('浏览器不支持语音识别');
				alert('您的浏览器不支持语音识别功能，请使用Chrome或Edge浏览器');
			}
		};

		// 语音输入逻辑
		const toggleVoiceInput = () => {
			if (!recognition) {
				initSpeechRecognition();
			}

			if (isRecording.value) {
				// 停止录音
				stopVoiceRecording();
			} else {
				// 开始录音
				startVoiceRecording();
			}
		};

		// 开始语音录音
		const startVoiceRecording = () => {
			if (recognition) {
				try {
					recognition.start();
					isRecording.value = true;
					voiceText.value = '';
				} catch (error) {
					console.error('启动语音识别失败:', error);
					alert('启动语音识别失败，请检查麦克风权限');
				}
			}
		};

		// 停止语音录音
		const stopVoiceRecording = () => {
			if (recognition) {
				recognition.stop();
				isRecording.value = false;

				// 如果有识别到的文本，自动填入输入框
				if (voiceText.value.trim()) {
					userInput.value = voiceText.value;
					voiceText.value = '';
				}
			}
		};

		// 小贴士内容
		const tips = [
			'你可以用语音提问，体验更高效的交流！',
			"试试问我：'Vue的响应式原理是什么？'",
			'点击右侧题库可快速提问热门问题。',
			'AI助手支持多轮对话，随时切换话题！'
		];
		const randomTip = ref(tips[Math.floor(Math.random() * tips.length)]);
		// 累计字数统计
		const totalWords = computed(() =>
			chatHistory.value.reduce((sum, msg) => sum + msg.content.replace(/<br>/g, '').length, 0)
		);

		// 输入框键盘事件：Enter发送，Shift+Enter换行
		function handleInputKeydown(e) {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				sendMessage();
			}
			// Shift+Enter 默认换行，无需处理
		}

		const INTRODUCE_ACTIONS = ['A_RH_introduced1_O', 'A_LH_introduced_O'];
		const IS_ACTIONS = ['A_RLH_emphasize_O', 'A_RH_please1_O'];
		const RANDOM_ACTIONS = [
			'A_RH_introduced1_O',
			'A_LH_introduced_O',
			'A_RLH_emphasize_O',
			'A_RH_please1_O',
			'A_RLH_welcome_O',
			'A_RH_please_O'
		];
		const actionInterval = null;

		// 说话时可用动作ID
		const SPEAK_ACTIONS = [
			'A_RLH_welcome_O',
			'A_RH_please_O',
			'A_RLH_emphasize_O',
			'A_RH_please1_O',
			'A_RH_introduced1_O',
			'A_LH_introduced_O'
		];

		function initAvatarPlatform() {
			destroyAvatarPlatform();
			avatarPlatform = new AvatarPlatform();
			avatarPlatform
				.on(SDKEvents.connected, initResp => {
					console.log('sdk event: connected', initResp);
				})
				.on(SDKEvents.stream_start, () => {
					console.log('sdk event: stream_start');
				})
				.on(SDKEvents.disconnected, err => {
					console.log('sdk event: disconnected');
					if (err) {
						console.error('ws link disconnected because of Error');
						console.error(err.code, err.message, err.name, err.stack);
					}
				})
				.on(SDKEvents.error, error => {
					console.log('sdk event: error', error);
				})
				.on(SDKEvents.tts_duration, sessionData => {
					// 虚拟人每次说话时做动作
					if (avatarPlatform && typeof avatarPlatform.writeCmd === 'function') {
						const actionId =
							SPEAK_ACTIONS[Math.floor(Math.random() * SPEAK_ACTIONS.length)];
						avatarPlatform.writeCmd('action', actionId);
					}
				})
				.on(SDKEvents.asr, asrData => {
					if (asrData && asrData.text) {
						const text = asrData.text;
						if (text.includes('介绍')) {
							const asrActionId = ['A_RH_introduced1_O', 'A_LH_introduced_O'][
								Math.floor(Math.random() * 2)
							];
							avatarPlatform.writeCmd('action', asrActionId);
						} else if (text.includes('是')) {
							const asrActionId = ['A_RLH_emphasize_O', 'A_RH_please1_O'][
								Math.floor(Math.random() * 2)
							];
							avatarPlatform.writeCmd('action', asrActionId);
						}
					}
				});
			avatarPlatform.setApiInfo({
				appId: '0254f1e2',
				apiKey: '9f9d7b6c1863aff99cee0107877d95d0',
				apiSecret: 'YmJlNmM3OTcyNTNiMTE0M2Y3YzU1YWQ2',
				sceneId: '205971865091575808',
				serverUrl: 'wss://avatar.cn-huadong-1.xf-yun.com/v1/interact'
			});
			avatarPlatform.setGlobalParams({
				stream: {
					protocol: 'xrtc',
					alpha: 1
				},
				avatar: {
					avatar_id: '110332017',
					width: 420,
					height: 560
				},
				asr: {
					model: '16k_common',
					language: 'zh_cn',
					enable: true
				},
				tts: {
					vcn: 'x4_lingxiaoyue_oral'
				}
			});
			player = avatarPlatform.player || avatarPlatform.createPlayer();
			player
				?.on(PlayerEvents.play, () => {
					console.log('sdk event: player play');
				})
				.on(PlayerEvents.waiting, () => {
					console.log('sdk event: player waiting');
				})
				.on(PlayerEvents.playing, () => {
					console.log('sdk event: player playing');
				})
				.on(PlayerEvents.playNotAllowed, () => {
					console.log('sdk event: play not allowed, muted play');
					window.addEventListener(
						'click',
						() => {
							if (player.resume) {
								player.resume();
							}
						},
						{ once: true }
					);
				});
			avatarPlatform
				.start({
					wrapper: document.getElementById('ai-avatar-mount')
				})
				.then(() => {
					console.log('connected && stream play successfully');
					isReady.value = true;
					// 自动打招呼动作
					if (avatarPlatform && typeof avatarPlatform.writeCmd === 'function') {
						avatarPlatform.writeCmd('action', GREETING_ACTION);
					}
					// 初始化recorder并自动开始全双工对话
					recorder = avatarPlatform.recorder || avatarPlatform.createRecorder();
					if (recorder && typeof recorder.startRecord === 'function') {
						recorder.startRecord(0, () => {
							// 可选：对话自动停止后的回调
							console.log('全双工对话自动停止');
						});
					}
				})
				.catch(e => {
					console.error(e.code, e.message, e.name, e.stack);
				});
		}

		function destroyAvatarPlatform() {
			if (recorder && typeof recorder.stopRecord === 'function') {
				recorder.stopRecord();
			}
			if (avatarPlatform && typeof avatarPlatform.destroy === 'function') {
				avatarPlatform.destroy();
				avatarPlatform = null;
			}
			isReady.value = false;
		}

		watch(callState, val => {
			if (val === 'active') {
				setTimeout(() => {
					initAvatarPlatform();
				}, 0);
			} else if (val === 'ended') {
				destroyAvatarPlatform();
			}
			if (val === 'incoming' && ringtoneAudio.value) {
				ringtoneAudio.value.currentTime = 0;
				ringtoneAudio.value.play();
			} else if (ringtoneAudio.value) {
				ringtoneAudio.value.pause();
				ringtoneAudio.value.currentTime = 0;
			}
		});

		return {
			darkMode,
			userInput,
			chatHistory,
			isLoading,
			messagesEnd,
			toggleTheme,
			formatTime,
			addNewLine,
			sendMessage,
			scrollToBottom,
			interviewers,
			selectedInterviewerIndex,
			selectInterviewer,
			questionBank,
			questionBankCollapsed,
			toggleQuestionBank,
			addQuestionToChat,
			progressPercent,
			stopAnswer,
			isRecording,
			voiceText,
			toggleVoiceInput,
			randomTip,
			totalWords,
			currentInterviewer,
			getWelcomeMessage,
			handleInputKeydown,
			showVideoCall,
			callState,
			callAvatar,
			callNickname,
			callTip,
			endCall,
			acceptCall,
			ringtoneAudio,
			startVideoCall
		};
	}
};
</script>

<style scoped>
@import '../../../assets/styles/aiassistant.css';
@import '../../../assets/styles/ai-assistant.css';
.video-call-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
}
.video-call-content {
	background: linear-gradient(120deg, #f7e8ff 0%, #ffe8f7 50%, #ffffff 100%);
	border-radius: 24px;
	padding: 40px 32px 32px 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 320px;
	min-height: 420px;
	box-shadow: 0 8px 32px #0008;
	text-align: center;
}
.video-call-content .avatar {
	width: 120px;
	height: 120px;
	border-radius: 24px;
	margin-bottom: 18px;
	object-fit: cover;
	box-shadow: 0 2px 16px #fff4;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
.video-call-content .nickname {
	font-size: 1.5rem;
	color: #333;
	font-weight: bold;
	margin-bottom: 8px;
	letter-spacing: 2px;
	text-align: center;
}
.video-call-content .call-tip {
	font-size: 1.1rem;
	color: #666;
	margin-bottom: 32px;
	letter-spacing: 1px;
	text-align: center;
}
.video-call-content .call-actions {
	display: flex;
	gap: 48px;
	margin-top: 32px;
}
.call-btn {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	border: none;
	font-size: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s;
}
.call-btn.hangup {
	background: #e74c3c;
	color: #fff;
}
.call-btn.accept {
	background: #27ae60;
	color: #fff;
}
.call-btn:active {
	filter: brightness(0.9);
}
.avatar-video-wrapper {
	width: 420px;
	height: 560px;
	background: linear-gradient(135deg, #e0e7ef 0%, #f7e8ff 60%, #ffffff 100%);
	border-radius: 32px;
	box-shadow:
		0 8px 32px 0 #b3d1ff80,
		0 0 0 4px #1a6cff40;
	border: 2px solid #e3f0ff;
	position: relative;
	overflow: hidden;
	margin: 0 auto;
	backdrop-filter: blur(10px) saturate(1.2);
	-webkit-backdrop-filter: blur(10px) saturate(1.2);
}
.avatar-video-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(40px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes shake {
	0%,
	100% {
		transform: translateX(0);
	}
	20%,
	60% {
		transform: translateX(-4px);
	}
	40%,
	80% {
		transform: translateX(4px);
	}
}
@keyframes ripple {
	0% {
		opacity: 0.6;
		transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(2.2);
	}
}
.video-call-content.incoming .avatar {
	animation: fadeInUp 0.5s 0.1s both;
}
.video-call-content.incoming .nickname {
	animation: fadeInUp 0.5s 0.3s both;
}
.video-call-content.incoming .call-tip {
	animation: fadeInUp 0.5s 0.5s both;
}
.video-call-content.incoming .call-actions {
	animation: fadeInUp 0.5s 0.7s both;
}
.call-btn.accept {
	position: relative;
	z-index: 1;
	animation: shake 0.7s infinite;
}
.call-btn.accept::before {
	content: '';
	position: absolute;
	inset: 0;
	margin: auto;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: rgba(39, 174, 96, 0.25);
	animation: ripple 1.2s infinite;
	z-index: -1;
	pointer-events: none;
}
</style>
