<template>
	<div class="ai-interview-container">
		<!-- 顶部标题 -->
	
		<!-- 新增：全双工对话控制按钮 -->
		<div style="margin: 16px 48px 0 48px">
			<button @click="startDuplex" :disabled="isRecording">开始对话</button>
			<button @click="stopDuplex" :disabled="!isRecording">停止对话</button>
			<span v-if="isRecording" style="color: #1a6cff; margin-left: 12px">对话中...</span>
		</div>

		<!-- 主体区域 -->
		<main class="ai-main">
			<!-- 左侧虚拟人展示区 -->
			<section class="ai-avatar-area">
				<div id="ifly-avatar-mount" class="wrapper"></div>
			</section>
	
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AvatarPlatform, {
	PlayerEvents,
	SDKEvents
} from '/@/api/sdk/3.1.2.1002/avatar-sdk-web_3.1.2.1002/index.js';

const currentStep = ref(1);
const logs = ref<string[]>([]);
const loading = ref(false);
const isRecording = ref(false); // 新增：录音状态
const isReady = ref(false);

let avatarPlatform: any = null;
let player: any = null;
let recorder: any = null; // 新增

// 动作ID常量，方便后续调用
const ACTIONS = {
	LH_INTRODUCED: 'A_LH_introduced_O',
	LH_PLEASE: 'A_LH_please_O',
	RH_INTRODUCED1: 'A_RH_introduced1_O',
	RH_PLEASE1: 'A_RH_please1_O',
	RH_PLEASE: 'A_RH_please_O',
	RLH_EMPHASIZE: 'A_RLH_emphasize_O',
	RLH_WELCOME: 'A_RLH_welcome_O'
};

function startDuplex() {
	if (!recorder) return;
	// 先解除静音
	if (player && typeof player.resume === 'function') {
		player.resume();
	}
	// 先播报欢迎语
	if (avatarPlatform && typeof avatarPlatform.writeCmd === 'function') {
		avatarPlatform.writeCmd('tts', '你好呀，有什么可以帮您的吗？');
	}
	recorder.startRecord(0, () => {
		logs.value.push('录音自动停止');
		isRecording.value = false;
	});
	isRecording.value = true;
	logs.value.push('已开始全双工对话');
}

function stopDuplex() {
	if (!recorder) return;
	recorder.stopRecord();
	isRecording.value = false;
	logs.value.push('已手动停止全双工对话');
}

function doAction(actionId: string) {
	if (!avatarPlatform || !isReady.value) return;
	avatarPlatform
		.writeCmd('action', actionId)
		.then(() => {
			logs.value.push(`已触发动作: ${actionId}`);
		})
		.catch((err: any) => {
			logs.value.push(`动作触发失败: ${actionId}`);
			console.error(err);
		});
}

onMounted(() => {
	// 2.2.2 初始化SDK实例
	avatarPlatform = new AvatarPlatform();

	// 2.2.3 设置事件监听
	avatarPlatform
		.on(SDKEvents.connected, (initResp: any) => {
			console.log('sdk event: connected', initResp);
		})
		.on(SDKEvents.stream_start, () => {
			console.log('sdk event: stream_start');
		})
		.on(SDKEvents.disconnected, (err: any) => {
			loading.value = false;
			console.log('sdk event: disconnected');
			if (err) {
				console.error('ws link disconnected because of Error');
				console.error(err.code, err.message, err.name, err.stack);
			}
		})
		.on(SDKEvents.asr, (asrData: any) => {
			console.log('sdk event: asr', asrData);
			// 新增：实时显示识别内容
			if (asrData && asrData.text) {
				logs.value.push('识别: ' + asrData.text);
			}
		})
		.on(SDKEvents.nlp, (nlpData: any) => {
			console.log('sdk event: nlp', nlpData);
			// 新增：显示AI理解/回复
			if (nlpData && nlpData.answer) {
				logs.value.push('AI: ' + nlpData.answer);
			}
		})
		.on(SDKEvents.frame_start, (frameData: any) => {
			console.log('sdk event: frameBegin', frameData);
		})
		.on(SDKEvents.tts_duration, (sessionData: any) => {
			console.log('sdk event: duration', sessionData);
		})
		.on(SDKEvents.frame_stop, (frameData: any) => {
			console.log('sdk event: frameEnd', frameData);
		})
		.on(SDKEvents.error, (error: any) => {
			console.log('sdk event: error', error);
		})
		.on(SDKEvents.action_start, (actionData: any) => {
			console.log('sdk event: actionBegin', actionData);
		})
		.on(SDKEvents.action_stop, (actionData: any) => {
			console.log('sdk event: actionEnd', actionData);
		});

	// 2.2.4 设置SDK配置
	avatarPlatform.setApiInfo({
		appId: '266c2748',
		apiKey: 'b35b89a0c72e05e495d7a840ee2e3a4e',
		apiSecret: 'OTMyOTc2YzRlYmZlNjc2MmI2Y2M3NDBm',
		sceneId: '199415718532485120',
		serverUrl: 'wss://avatar.cn-huadong-1.xf-yun.com/v1/interact'
	});

	// 2.2.5 设置全局变量
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
		tts: {
			vcn: 'x4_lingxiaoyue_oral'
		}
	});

	// 2.2.3.1 播放器事件监听
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
			// 可引导用户点击页面后调用resume
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

	// 2.2.6 发起连接--显示虚拟人
	avatarPlatform
		.start({
			wrapper: document.getElementById('ifly-avatar-mount') as HTMLDivElement
		})
		.then(() => {
			console.log('connected &&  stream play successfully');
			isReady.value = true;
			// 连接成功后自动挥手
			doAction(ACTIONS.RLH_WELCOME);
			// 挥手后自动播报欢迎语
			if (avatarPlatform && typeof avatarPlatform.writeCmd === 'function') {
				avatarPlatform.writeCmd('tts', '你好呀，有什么可以帮您的吗？');
			}
		})
		.catch((e: any) => {
			console.error(e.code, e.message, e.name, e.stack);
		});

	// 新增：初始化recorder
	recorder = avatarPlatform.recorder || avatarPlatform.createRecorder();
});

onUnmounted(() => {
	if (recorder && typeof recorder.stopRecord === 'function') {
		recorder.stopRecord();
	}
	if (avatarPlatform && typeof avatarPlatform.destroy === 'function') {
		avatarPlatform.destroy();
		avatarPlatform = null;
	}
});
</script>

<style scoped lang="scss">
.ai-interview-container {
	min-height: 100vh;
	background: linear-gradient(120deg, #e0e7ef 0%, #f7fbff 100%);
	color: #222;
	font-family: 'Orbitron', 'Roboto', 'Arial', sans-serif;
	display: flex;
	flex-direction: column;
}
.ai-header {
	padding: 32px 48px 16px 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-size: 2.2rem;
		letter-spacing: 2px;
		font-weight: 800;
		color: #1a6cff;
		text-shadow: 0 2px 16px #b3d1ff80;
	}
	.ai-step {
		font-size: 1.1rem;
		color: #6faaff;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 8px;
		padding: 4px 16px;
		box-shadow: 0 2px 8px #b3d1ff40;
	}
}
.ai-main {
	flex: 1;
	display: flex;
	gap: 40px;
	padding: 32px 48px;
	background: none;
}
.ai-avatar-area {
	flex: 1.2;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	min-height: 480px;
	.wrapper {
		width: 420px;
		height: 560px;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 32px;
		box-shadow:
			0 8px 32px 0 #b3d1ff80,
			0 0 0 4px #1a6cff40;
		border: 2px solid #e3f0ff;
		position: relative;
		overflow: hidden;
		transition: box-shadow 0.3s;
		&:hover {
			box-shadow:
				0 12px 48px 0 #1a6cff80,
				0 0 0 8px #6faaff40;
		}
	}
}
.ai-result-area {
	flex: 1.8;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 24px;
}
.result-card {
	width: 100%;
	background: rgba(255, 255, 255, 0.95);
	border-radius: 24px;
	box-shadow: 0 4px 24px 0 #b3d1ff40;
	padding: 32px 28px 24px 28px;
	margin-bottom: 12px;
	h3 {
		font-size: 1.4rem;
		color: #1a6cff;
		font-weight: 700;
		margin-bottom: 18px;
		letter-spacing: 1px;
		text-shadow: 0 1px 8px #b3d1ff30;
	}
	.result-content {
		font-size: 1.08rem;
		color: #222;
		min-height: 120px;
		line-height: 1.8;
		letter-spacing: 0.5px;
	}
}
.ai-log {
	width: 100%;
	font-size: 1rem;
	color: #1a6cff;
	background: rgba(230, 245, 255, 0.7);
	border-radius: 12px;
	padding: 12px 16px;
	box-shadow: 0 2px 8px #b3d1ff20;
	min-height: 60px;
}
</style>
