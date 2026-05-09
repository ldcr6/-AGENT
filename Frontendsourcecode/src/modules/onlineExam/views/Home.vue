<template>
	<div class="exam-center">
		<!-- 统计区块 -->
		<el-row :gutter="24" class="stat-row">
			<el-col :span="6"
				><div class="stat-card">
					<div class="stat-num">8</div>
					<div>已完成测评</div>
				</div></el-col
			>
			<el-col :span="6"
				><div class="stat-card">
					<div class="stat-num">86</div>
					<div>平均分</div>
				</div></el-col
			>
			<el-col :span="6"
				><div class="stat-card">
					<div class="stat-num">5天</div>
					<div>连续答题</div>
				</div></el-col
			>
			<el-col :span="6"
				><div class="stat-card">
					<div class="stat-num">2</div>
					<div>我的证书</div>
				</div></el-col
			>
		</el-row>

		<!-- 快捷入口 -->
		<div class="quick-entry">
			<el-button icon="el-icon-document" round @click="goToWrongBook">错题本</el-button>
			<el-button icon="el-icon-star" round @click="goToUserCollect">收藏题</el-button>
			<el-button icon="el-icon-date" round>学习计划</el-button>
		</div>

		<!-- 公告/活动 -->
		<template v-if="notices.length > 1">
			<el-carousel
				height="48px"
				indicator-position="none"
				arrow="never"
				class="main-alert"
				:autoplay="true"
				:interval="4000"
			>
				<el-carousel-item v-for="notice in notices" :key="notice.id">
					<el-alert
						:title="notice.title"
						:type="notice.type"
						show-icon
						class="main-alert"
						:closable="false"
					/>
				</el-carousel-item>
			</el-carousel>
		</template>
		<template v-else-if="notices.length === 1">
			<el-alert
				:title="notices[0].title"
				:type="notices[0].type"
				show-icon
				class="main-alert"
				:closable="false"
			/>
		</template>

		<!-- 原有内容 -->
		<el-row :gutter="40" class="main-content">
			<!-- 我的测评/历史 -->
			<el-col :span="18">
				<el-card class="my-exam-card">
					<div class="card-title">我的测评</div>
					<div class="my-exam-info">
						<span>下次测评：2024-07-01</span>
						<span>剩余测评：2场</span>
					</div>
					<div style="display: flex; gap: 16px">
						<el-button type="primary" round class="main-btn" @click="startExam"
							>马上测评</el-button
						>
						<el-button
							type="success"
							round
							class="main-btn"
							@click="startPersonalizedPractice"
							>个性化刷题</el-button
						>
					</div>
				</el-card>
				<el-card class="history-card">
					<div class="card-title">测评记录</div>
					<el-timeline>
						<el-timeline-item
							v-for="item in history"
							:key="item.id"
							:timestamp="item.date"
							:color="item.color"
							class="timeline-item"
						>
							<div class="timeline-content">
								<span class="exam-name">{{ item.name }}</span>
								<span class="score"
									>得分：<b>{{ item.score }}</b></span
								>
							</div>
						</el-timeline-item>
					</el-timeline>
				</el-card>
				<!-- 学习小贴士和常见问题并排一行 -->
				<div class="tips-faq-row">
					<el-card class="recommend-card tips-card">
						<div class="card-title" style="display: flex; align-items: center">
							<el-icon :size="22" class="rec-icon" style="margin-right: 8px"
								><component :is="Document"
							/></el-icon>
							学习小贴士
						</div>
						<ul
							style="
								margin: 12px 0 0 0;
								padding: 0 0 0 8px;
								color: #888;
								font-size: 15px;
								list-style: disc;
							"
						>
							<li>每天坚持答题，积累知识。</li>
							<li>错题及时复习，查漏补缺。</li>
							<li>合理安排时间，劳逸结合。</li>
							<li>多做模拟测评，提升自信。</li>
						</ul>
					</el-card>
					<el-card class="recommend-card faq-card">
						<div class="card-title" style="display: flex; align-items: center">
							<el-icon :size="22" class="rec-icon" style="margin-right: 8px"
								><component :is="DataAnalysis"
							/></el-icon>
							常见问题
						</div>
						<ul
							style="
								margin: 12px 0 0 0;
								padding: 0 0 0 8px;
								color: #888;
								font-size: 15px;
								list-style: disc;
							"
						>
							<li>
								如何参加测评？<br /><span style="color: #b7afff"
									>在首页点击“马上测评”或推荐卡片“参与”按钮即可。</span
								>
							</li>
							<li>
								如何查看历史成绩？<br /><span style="color: #b7afff"
									>在“测评记录”区块可查看所有历史成绩。</span
								>
							</li>
							<li>
								如何获得证书？<br /><span style="color: #b7afff"
									>完成指定测评并达标后可自动获得证书。</span
								>
							</li>
						</ul>
					</el-card>
				</div>
			</el-col>
			<!-- 测评推荐 -->
			<el-col :span="6">
				<el-card class="recommend-card">
					<div class="card-title">测评推荐</div>
					<div class="recommend-list">
						<div
							v-for="rec in recommends"
							:key="rec.id"
							class="recommend-item"
							:style="{ background: rec.bg }"
						>
							<el-icon :size="40" class="rec-icon"
								><component :is="rec.icon"
							/></el-icon>
							<div class="rec-title">{{ rec.title }}</div>
							<div class="rec-desc">{{ rec.desc }}</div>
							<el-button
								size="small"
								round
								type="primary"
								class="rec-btn"
								@click="startExam"
								>参与</el-button
							>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>

	<el-dialog
		v-model="showPersonalizedDialog"
		title="个性化刷题"
		width="400px"
		:close-on-click-modal="false"
	>
		<template v-if="loadingStep === 0">
			<el-form label-width="80px">
				<el-form-item label="测评方向">
					<el-select v-model="selectedSubject" style="width: 220px">
						<el-option
							v-for="item in subjectOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="难易程度">
					<el-select v-model="selectedDifficulty" style="width: 220px">
						<el-option
							v-for="item in difficultyOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<div style="text-align: right">
				<el-button @click="showPersonalizedDialog = false">取消</el-button>
				<el-button type="primary" @click="handleStartPersonalized">开始测评</el-button>
			</div>
		</template>
		<template v-else>
			<div style="text-align: center; padding: 32px 0">
				<el-steps
					:active="loadingStep"
					finish-status="success"
					direction="vertical"
					align-center
				>
					<el-step
						title="检测过往错题记录"
						:status="loadingStep > 1 ? 'success' : 'process'"
					/>
					<el-step
						title="组织相关试题"
						:status="
							loadingStep > 2 ? 'success' : loadingStep === 2 ? 'process' : 'wait'
						"
					/>
					<el-step title="完成" :status="loadingStep === 3 ? 'success' : 'wait'" />
				</el-steps>
				<div v-if="loadingStep === 3" style="margin-top: 16px; color: #67c23a">
					即将进入测评...
				</div>
			</div>
		</template>
	</el-dialog>

	<el-dialog
		v-model="showExamDialog"
		title="选择测评方向"
		width="400px"
		:close-on-click-modal="false"
	>
		<template v-if="examLoadingStep === 0">
			<el-form label-width="80px">
				<el-form-item label="测评方向">
					<el-select v-model="selectedExamSubject" style="width: 220px">
						<el-option
							v-for="item in examSubjectOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<div style="text-align: right">
				<el-button @click="showExamDialog = false">取消</el-button>
				<el-button type="primary" @click="handleStartExam">开始测评</el-button>
			</div>
		</template>
		<template v-else>
			<div style="text-align: center; padding: 32px 0">
				<el-steps
					:active="examLoadingStep"
					finish-status="success"
					direction="vertical"
					align-center
				>
					<el-step
						title="组织相关题型"
						:status="examLoadingStep === 2 ? 'success' : 'process'"
					/>
					<el-step title="完成" :status="examLoadingStep === 2 ? 'success' : 'wait'" />
				</el-steps>
				<div v-if="examLoadingStep === 2" style="margin-top: 16px; color: #67c23a">
					即将进入测评...
				</div>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Edit, DataAnalysis, Document } from '@element-plus/icons-vue';

const router = useRouter();

// mock 推荐测评
const recommends = ref([
	{
		id: 1,
		title: '语言能力挑战',
		desc: '考查你的语言基础与表达能力。',
		icon: Edit,
		bg: 'linear-gradient(135deg, #FAFAFF 0%, #F3F0FF 100%)'
	},
	{
		id: 2,
		title: '数据库达人',
		desc: '测试你的数据库设计与优化技能。',
		icon: DataAnalysis,
		bg: 'linear-gradient(135deg, #F6F7FB 0%, #E6E6FA 100%)'
	},
	{
		id: 3,
		title: '算法闯关',
		desc: '挑战你的算法思维与解题能力。',
		icon: Document,
		bg: 'linear-gradient(135deg, #FFFFFF 0%, #D6E0FF 100%)'
	}
]);

// mock 测评历史
const history = ref([
	{
		id: 1,
		name: '算法闯关',
		date: '2023-06-20',
		score: 85,
		color: '#B7AFFF'
	},
	{
		id: 2,
		name: '数据库达人',
		date: '2023-06-15',
		score: 78,
		color: '#A3A8F7'
	},
	{
		id: 3,
		name: '语言能力挑战',
		date: '2023-06-10',
		score: 92,
		color: '#E6E6FA'
	}
]);

const notices = ref([
	{ id: 1, title: '最新题库隆重上线，快来尽情体验吧！', type: 'info' as const },
	{ id: 2, title: '暑期测评大赛火热进行中，快来参加赢取奖品！', type: 'success' as const },
	{ id: 3, title: '系统将于7月10日凌晨维护，请提前保存进度。', type: 'warning' as const }
]);

// 个性化刷题弹窗相关
const showPersonalizedDialog = ref(false);
const selectedSubject = ref('前端');
const selectedDifficulty = ref('中等');
const loadingStep = ref(0); // 0:未开始, 1:检测错题, 2:组织试题, 3:完成

const subjectOptions = [
	{ label: '前端', value: '前端' },
	{ label: '算法', value: '算法' },
	{ label: '数据库', value: '数据库' }
];
const difficultyOptions = [
	{ label: '简单', value: '简单' },
	{ label: '中等', value: '中等' },
	{ label: '困难', value: '困难' }
];

function startPersonalizedPractice() {
	showPersonalizedDialog.value = true;
	loadingStep.value = 0;
}

async function handleStartPersonalized() {
	loadingStep.value = 1;
	await new Promise(r => setTimeout(r, 1000));
	loadingStep.value = 2;
	await new Promise(r => setTimeout(r, 1200));
	loadingStep.value = 3;
	setTimeout(() => {
		showPersonalizedDialog.value = false;
		router.push({
			path: '/online-exam/exam',
			query: {
				subject: selectedSubject.value,
				difficulty: selectedDifficulty.value,
				personalized: 1
			}
		});
	}, 800);
}

const showExamDialog = ref(false);
const selectedExamSubject = ref('前端');
const examLoadingStep = ref(0);

const examSubjectOptions = [
	{ label: '前端', value: '前端' },
	{ label: '算法', value: '算法' },
	{ label: '数据库', value: '数据库' }
];

function startExam() {
	showExamDialog.value = true;
	examLoadingStep.value = 0;
}

async function handleStartExam() {
	examLoadingStep.value = 1;
	await new Promise(r => setTimeout(r, 1200));
	examLoadingStep.value = 2;
	setTimeout(() => {
		showExamDialog.value = false;
		router.push({
			path: '/online-exam/exam',
			query: {
				subject: selectedExamSubject.value,
				personalized: 0
			}
		});
	}, 800);
}

function goToWrongBook() {
	router.push({ path: '/question/Notebook' });
}

function goToUserCollect() {
	router.push({ path: '/question/userCollect' });
}
</script>

<style scoped>
.exam-center {
	padding: 0 0 48px 0;
	background: #fafaff;
	min-height: 100vh;
}
.stat-row {
	margin-bottom: 18px;
}
.stat-card {
	background: #fff;
	border-radius: 18px;
	box-shadow: 0 2px 8px 0 #ececff;
	padding: 18px 0 10px 0;
	text-align: center;
	font-size: 15px;
	color: #888;
	font-weight: 500;
}
.stat-num {
	font-size: 28px;
	color: #7c5cfa;
	font-weight: 800;
	margin-bottom: 4px;
}
.quick-entry {
	display: flex;
	gap: 18px;
	margin-bottom: 18px;
	margin-left: 4px;
}
.quick-entry .el-button {
	font-size: 15px;
	font-weight: 600;
	color: #7c5cfa;
	background: #f3f0ff;
	border: none;
	box-shadow: 0 1px 4px 0 #ececff;
	transition:
		box-shadow 0.2s,
		transform 0.2s;
}
.quick-entry .el-button:hover {
	background: #ececff;
	color: #6c63ff;
	box-shadow: 0 4px 16px 0 #b7afff;
	transform: translateY(-2px) scale(1.04);
}
.main-alert {
	margin-bottom: 24px;
	border-radius: 12px;
	font-size: 15px;
}
.main-content {
	max-width: 1200px;
	margin: 0 auto;
}
.my-exam-card,
.history-card,
.recommend-card {
	border-radius: 28px;
	box-shadow: 0 4px 24px 0 #ececff;
	margin-bottom: 32px;
	border: none;
}
.my-exam-card {
	background: #ffffff;
	padding-bottom: 18px;
}
.card-title {
	font-size: 20px;
	font-weight: 700;
	color: #7c5cfa;
	margin-bottom: 16px;
	letter-spacing: 0.5px;
}
.my-exam-info {
	color: #888;
	margin-bottom: 22px;
	display: flex;
	gap: 40px;
	font-size: 16px;
}
.main-btn {
	font-size: 16px;
	padding: 8px 32px;
	font-weight: 600;
	box-shadow: 0 2px 8px 0 #ececff;
	transition:
		box-shadow 0.2s,
		transform 0.2s;
}
.main-btn:hover {
	box-shadow: 0 6px 24px 0 #b7afff;
	transform: translateY(-2px) scale(1.04);
}
.history-card {
	background: #f6f7fb;
	padding-bottom: 10px;
}
.timeline-item {
	--el-timeline-node-size: 18px;
	--el-timeline-node-color: #b7afff;
}
.timeline-content {
	display: flex;
	align-items: center;
	gap: 18px;
	font-size: 15px;
}
.exam-name {
	color: #a3a8f7;
	font-weight: 600;
	margin-right: 12px;
}
.score {
	color: #7c5cfa;
	font-weight: 700;
	margin-left: 8px;
	font-size: 16px;
}
.recommend-card {
	background: #fafaff;
	box-shadow: 0 2px 8px 0 #ececff;
	border-radius: 24px;
	padding: 24px 12px;
	width: 160%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.recommend-list {
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin-top: 12px;
	width: 100%;
	align-items: center;
}
.recommend-item {
	width: 160%;
	border-radius: 18px;
	padding: 22px 20px;
	background: linear-gradient(135deg, #f7f8fa 0%, #f3f0ff 100%);
	box-shadow: 0 1px 4px 0 #ececff;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	transition:
		transform 0.18s,
		box-shadow 0.18s;
}
.recommend-item:hover {
	transform: translateY(-4px) scale(1.035);
	box-shadow: 0 8px 32px 0 #d6e0ff;
}
.rec-title {
	font-size: 18px;
	font-weight: 700;
	color: #7c5cfa;
	margin: 12px 0 6px 0;
}
.rec-desc {
	color: #888;
	font-size: 15px;
	margin-bottom: 14px;
}
.rec-icon {
	color: #b7afff;
	margin-bottom: 2px;
}
.rec-btn {
	font-size: 15px;
	font-weight: 600;
	box-shadow: 0 1px 6px 0 #ececff;
	transition:
		box-shadow 0.2s,
		transform 0.2s;
}
.rec-btn:hover {
	box-shadow: 0 4px 16px 0 #b7afff;
	transform: translateY(-2px) scale(1.04);
}
.el-button--primary {
	background: linear-gradient(90deg, #b7afff 0%, #a3a8f7 100%);
	border: none;
}
.el-button--primary:hover {
	background: linear-gradient(90deg, #a3a8f7 0%, #b7afff 100%);
}
/* tips-faq-row 并排样式 */
.tips-faq-row {
	display: flex;
	gap: 32px;
	margin-top: 18px;
}
.tips-faq-row .el-card {
	flex: 1 1 0;
	min-width: 0;
	border-radius: 24px;
	box-shadow: 0 2px 8px 0 #ececff;
	border: none;
	background: #fafaff;
}
.tips-faq-row .card-title {
	font-size: 20px;
	font-weight: 700;
	color: #7c5cfa;
	margin-bottom: 16px;
	letter-spacing: 0.5px;
}
</style>
