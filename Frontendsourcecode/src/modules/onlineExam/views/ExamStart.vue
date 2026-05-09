<template>
	<div v-if="paper" :class="['online-exam-start', isDark ? 'dark-mode' : '']">
		<el-card class="exam-main-card">
			<div class="exam-header">
				<div class="exam-title">{{ paper?.name || '考试' }}</div>
				<div class="exam-timer">
					<el-icon><component :is="isDark ? 'el-icon-moon' : 'el-icon-sunny'" /></el-icon>
					<span>{{ formatTime(timeLeft) }}</span>
					<el-button size="small" @click="toggleTheme" style="margin-left: 12px">{{
						isDark ? '日间模式' : '夜间模式'
					}}</el-button>
				</div>
			</div>
			<div class="exam-body">
				<!-- 题号导航分组悬浮，仅整页模式下显示悬浮 -->
				<div
					class="exam-nav"
					:class="[
						{ collapsed: navCollapsed },
						{ 'exam-nav-float': currentMode === 'all' }
					]"
					v-if="paper"
				>
					<div class="nav-header"></div>
					<transition name="fade">
						<div v-show="!navCollapsed" class="nav-list-grouped">
							<div
								v-for="(group, type) in groupedQuestions"
								:key="type"
								class="nav-group"
							>
								<div class="nav-type-title">{{ type }}</div>
								<div class="nav-type-list">
									<el-button
										v-for="idx in group"
										:key="idx"
										:type="currentIndex === idx ? 'primary' : ''"
										circle
										size="small"
										class="nav-btn"
										@click="jumpTo(idx)"
										:style="getNavBtnStyle(idx)"
										>{{ idx + 1 }}</el-button
									>
								</div>
							</div>
						</div>
					</transition>
					<!-- 新增动态透明小箭头 -->
					<div class="exam-nav-toggle" @click="navCollapsed = !navCollapsed">
						<svg v-if="!navCollapsed" width="18" height="18" viewBox="0 0 18 18">
							<path
								d="M6 4l6 5-6 5"
								stroke="#7c5cfa"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
							/>
						</svg>
						<svg v-else width="18" height="18" viewBox="0 0 18 18">
							<path
								d="M12 4l-6 5 6 5"
								stroke="#7c5cfa"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
							/>
						</svg>
					</div>
				</div>
				<div class="exam-content">
					<div class="mode-switch">
						<el-radio-group v-model="currentMode" size="small">
							<el-radio-button label="single">单题模式</el-radio-button>
							<el-radio-button label="all">整页模式</el-radio-button>
						</el-radio-group>
					</div>
					<div v-if="currentMode === 'single' && paper">
						<exam-question
							v-if="paper"
							:question="paper.questions[currentIndex]"
							v-model:answer="answers[paper.questions[currentIndex].id]"
							:index="currentIndex"
							:total="paper?.questions.length || 0"
						/>
						<div class="single-nav-btns">
							<el-button size="small" @click="prev" :disabled="currentIndex === 0"
								>上一题</el-button
							>
							<el-button
								size="small"
								@click="next"
								:disabled="currentIndex === (paper?.questions.length || 1) - 1"
								>下一题</el-button
							>
						</div>
					</div>
					<div v-else>
						<exam-question
							v-for="(q, idx) in paper?.questions || []"
							:key="q.id"
							:question="q"
							v-model:answer="answers[q.id]"
							:index="idx"
							:total="paper?.questions.length || 0"
						/>
					</div>
					<div class="exam-actions">
						<el-button
							type="danger"
							@click="submitExam"
							:disabled="submitted"
							style="
								font-size: 18px;
								padding: 18px 38px;
								border-radius: 32px;
								box-shadow: 0 4px 24px 0 #ececff;
							"
							>交卷</el-button
						>
						<span v-if="submitted" class="exam-finished">已交卷</span>
					</div>
					<!-- 新增快捷入口按钮组 -->
					<div class="quick-entry">
						<el-button class="quick-btn" @click="goToWrongBook">
							<el-icon><document /></el-icon>
							<span>错题本</span>
						</el-button>
						<el-button class="quick-btn" @click="goToFavorite">
							<el-icon><star /></el-icon>
							<span>收藏题</span>
						</el-button>
						<el-button class="quick-btn" @click="goToPlan">
							<el-icon><calendar /></el-icon>
							<span>学习计划</span>
						</el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
	<div v-else class="exam-loading" style="text-align: center; padding: 80px 0">
		<el-icon style="font-size: 32px; color: #b7afff"><loading /></el-icon>
		<div style="margin-top: 12px; color: #888; font-size: 16px">试卷加载中...</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { fetchExamPaper, generateCustomPaper } from '../api/question';
import type { ExamPaper, Question } from '../types';
import { ElMessage } from 'element-plus';
import ExamQuestion from './components/ExamQuestion.vue';
import ExamResult from './components/ExamResult.vue';
import { Loading, Document, Star, Calendar } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const paper = ref<ExamPaper | null>(null);
const answers = reactive<Record<number, any>>({});
const timeLeft = ref(60 * 60); // 60分钟
let timer: any = null;
const isDark = ref(false);
const navCollapsed = ref(false);
const currentMode = ref<'single' | 'all'>('single');
const currentIndex = ref(0);
const submitted = ref(false);
const showResult = ref(false);
const result = ref<any>(null);

onMounted(async () => {
	let paperData: ExamPaper | null = null;
	if (route.query.personalized === '1') {
		const subject = route.query.subject || '前端';
		const difficulty = route.query.difficulty || '中等';
		const count = 10; // 题量可自定义
		paperData = generateCustomPaper({ subject, difficulty, count });
		if (!paperData) {
			ElMessage.error('未找到相关方向的题库');
			return;
		}
	} else {
		const id = route.query.id ? Number(route.query.id) : undefined;
		const res = await fetchExamPaper(id);
		paperData = res.data;
	}
	if (paperData && paperData.questions) {
		paper.value = paperData;
		// 初始化答案
		paper.value.questions.forEach(q => {
			answers[q.id] = q.type === 'multiple' ? [] : '';
		});
		startTimer();
	}
});

function startTimer() {
	timer = setInterval(() => {
		if (timeLeft.value > 0) {
			timeLeft.value--;
		} else {
			clearInterval(timer);
			if (!submitted.value) {
				submitExam();
			}
		}
	}, 1000);
}
function formatTime(sec: number) {
	const m = Math.floor(sec / 60)
		.toString()
		.padStart(2, '0');
	const s = (sec % 60).toString().padStart(2, '0');
	return `${m}:${s}`;
}
function toggleTheme() {
	isDark.value = !isDark.value;
	document.documentElement.classList.toggle('dark', isDark.value);
}
function jumpTo(idx: number) {
	currentIndex.value = idx;
}
function prev() {
	if (currentIndex.value > 0) currentIndex.value--;
}
function next() {
	if (currentIndex.value < (paper.value?.questions.length || 0) - 1) currentIndex.value++;
}
function getNavBtnStyle(idx: number) {
	const q = paper.value?.questions[idx];
	if (!q) return {};
	if (answers[q.id] && answers[q.id].length !== 0) {
		return { background: '#b7afff', color: '#fff' };
	}
	return {};
}
function submitExam() {
	if (submitted.value) return;
	submitted.value = true;
	clearInterval(timer);
	// 自动批改
	const score = autoGrade();
	result.value = score;
	showResult.value = true;
	ElMessage.success('考试已提交！');

	// 使用 localStorage 传递数据
	localStorage.setItem(
		'examResult',
		JSON.stringify({
			result: result.value,
			paper: paper.value,
			answers: answers
		})
	);
	// 跳转到结果页
	router.push({
		path: '/online-exam/result'
	});
}
function autoGrade() {
	// 只批改选择/判断题，主观题给模拟评语
	let total = 0;
	let right = 0;
	const detail: any[] = [];
	paper.value?.questions.forEach(q => {
		let correct = false;
		if (q.type === 'single' || q.type === 'judge') {
			correct = answers[q.id] === q.answer;
		} else if (q.type === 'multiple') {
			if (Array.isArray(answers[q.id]) && Array.isArray(q.answer)) {
				correct =
					answers[q.id].length === q.answer.length &&
					answers[q.id].every((a: string) =>
						Array.isArray(q.answer) ? q.answer.includes(a) : false
					);
			} else {
				correct = false;
			}
		}
		if (q.type === 'single' || q.type === 'multiple' || q.type === 'judge') {
			total++;
			if (correct) right++;
		}
		detail.push({
			id: q.id,
			title: q.title,
			type: q.type,
			answer: answers[q.id],
			correct,
			comment:
				q.type === 'text'
					? '答案条理清晰，表达较好。'
					: q.type === 'code'
						? '代码结构合理，有一定可读性。'
						: correct
							? '正确'
							: '错误'
		});
	});
	const score = Math.round((right / total) * 100);
	return {
		score,
		detail,
		comment:
			score >= 90
				? '表现优秀，继续保持！'
				: score >= 60
					? '及格，建议加强练习。'
					: '未及格，请认真复习。'
	};
}
function exportPdf() {
	// TODO: 实现PDF导出
	ElMessage.info('PDF导出功能开发中...');
}
// 题型标签
function typeLabel(type: string) {
	switch (type) {
		case 'single':
			return '单选';
		case 'multiple':
			return '多选';
		case 'judge':
			return '判断';
		case 'text':
			return '简答';
		case 'code':
			return '代码';
		default:
			return '';
	}
}

const typeMap = {
	single: '单选',
	multiple: '多选',
	judge: '判断',
	text: '简答',
	code: '代码'
};
const groupedQuestions = computed(() => {
	const res = {};
	if (!paper.value) return res;
	paper.value.questions.forEach((q, idx) => {
		const label = typeMap[q.type] || q.type;
		if (!res[label]) res[label] = [];
		res[label].push(idx);
	});
	return res;
});

function goToWrongBook() {
	ElMessage.info('跳转到错题本（待实现）');
}
function goToFavorite() {
	ElMessage.info('跳转到收藏题（待实现）');
}
function goToPlan() {
	ElMessage.info('跳转到学习计划（待实现）');
}
</script>

<style scoped>
.online-exam-start {
	background: #fafaff;
	min-height: 100vh;
	padding: 32px 0;
	transition: background 0.3s;
}
.dark-mode {
	background: #23223a;
}
.exam-main-card {
	width: 100%;
	max-width: none;
	margin: 0;
	border-radius: 24px;
	box-shadow: 0 4px 24px 0 #ececff;
	border: none;
	background: #fff;
	transition: background 0.3s;
}
.dark-mode .exam-main-card {
	background: #2d2d4a;
	color: #fff;
}
.exam-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 18px;
}
.exam-title {
	font-size: 22px;
	font-weight: 700;
	color: #7c5cfa;
}
.exam-timer {
	display: flex;
	align-items: center;
	font-size: 16px;
	color: #7c5cfa;
}
.exam-body {
	display: flex;
	gap: 32px;
}
.exam-nav {
	width: 200px;
	min-width: 80px;
	background: #f6f7fb;
	border-radius: 50px;
	box-shadow: 0 2px 8px 0 #ececff;
	padding: 12px 8px;
	transition: width 0.2s;
	position: relative;
}
.exam-nav.collapsed {
	width: 48px;
	min-width: 48px;
	overflow: visible;
}
.nav-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	color: #7c5cfa;
	margin-bottom: 8px;
}
.nav-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.nav-btn {
	margin: 0;
}
.exam-content {
	flex: 1;
	min-width: 0;
	position: relative;
}
.mode-switch {
	margin-bottom: 12px;
	text-align: right;
}
.single-nav-btns {
	margin: 18px 0 0 0;
	display: flex;
	gap: 12px;
	justify-content: flex-end;
}
.exam-actions {
	position: fixed;
	right: 48px;
	bottom: 48px;
	z-index: 100;
	margin: 0;
	text-align: right;
	background: transparent;
	box-shadow: none;
}
.exam-finished {
	color: #7c5cfa;
	margin-left: 18px;
	font-weight: 600;
}

.exam-nav-toggle {
	position: absolute;
	top: 50%;
	right: -20px;
	transform: translateY(-50%);
	background: rgba(180, 180, 255, 0.18);
	border-radius: 50%;
	box-shadow: 0 2px 8px 0 #ececff;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition:
		background 0.2s,
		box-shadow 0.2s;
	z-index: 200;
	opacity: 0.85;
}
.exam-nav-toggle:hover {
	background: rgba(120, 120, 255, 0.25);
	opacity: 1;
}
.exam-nav.collapsed .exam-nav-toggle {
	right: -16px;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.exam-nav-float {
	position: fixed;
	top: 50%;
	right: 48px;
	transform: translateY(-50%);
	z-index: 100;
	background: #fff;
	border-radius: 32px;
	box-shadow: 0 4px 32px 0 rgba(80, 120, 200, 0.08);
	padding: 24px 18px;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 80px;
	transition:
		box-shadow 0.2s,
		background 0.2s;
}
.exam-nav-float.collapsed {
	width: 48px;
	min-width: 48px;
	padding: 8px 4px;
	overflow: visible;
}
.nav-list {
	display: flex;
	flex-wrap: wrap;
	gap: 12px 10px;
	justify-content: center;
}
.nav-btn-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
}
.nav-type {
	font-size: 12px;
	color: #b0b3c2;
	line-height: 1;
	margin-top: 2px;
	text-align: center;
	user-select: none;
}
.nav-btn-wrap.active .nav-btn {
	background: #3b82f6;
	color: #fff;
}
.nav-list-grouped {
	display: flex;
	flex-direction: column;
	gap: 18px;
	align-items: stretch;
}
.nav-group {
	margin-bottom: 0;
}
.nav-type-title {
	font-size: 15px;
	font-weight: 700;
	color: #7c5cfa;
	margin-bottom: 6px;
	text-align: left;
	letter-spacing: 1px;
}
.nav-type-list {
	display: flex;
	flex-wrap: wrap;
	gap: 10px 8px;
	margin-bottom: 2px;
}
.quick-entry {
	display: flex;
	justify-content: center;
	gap: 32px;
	margin: 48px 0 0 0;
}
.quick-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90px;
	width: 90px;
	border-radius: 50%;
	font-size: 16px;
	font-weight: 600;
	background: #fff;
	box-shadow: 0 2px 12px 0 #ececff;
	color: #7c5cfa;
	transition:
		transform 0.18s,
		box-shadow 0.18s;
	padding: 0;
	border: none;
}
.quick-btn:hover {
	transform: scale(1.08);
	box-shadow: 0 4px 24px 0 #b7afff;
	background: #f6f7fb;
}
.quick-btn .el-icon {
	font-size: 32px;
	margin-bottom: 6px;
}
.quick-btn span {
	font-size: 15px;
	color: #7c5cfa;
	margin-top: 2px;
	letter-spacing: 1px;
}
</style>
