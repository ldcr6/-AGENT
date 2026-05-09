<template>
	<div class="solution-manage app-container">
		<!-- 顶部操作栏 -->
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-bold text-indigo-800 flex items-center">
				<i class="fas fa-lightbulb mr-2"></i>题解管理
			</h2>
			<div class="flex gap-2">
				<el-button type="primary" @click="openAddDialog">新增题解</el-button>
				<el-button type="danger" @click="batchDeleteMode = !batchDeleteMode">
					{{ batchDeleteMode ? '取消批量删除' : '删除题解' }}
				</el-button>
				<!-- 2. 批量删除按钮加确认弹窗 -->
				<el-popconfirm
					title="确定要删除选中的题解吗？"
					confirm-button-text="删除"
					cancel-button-text="取消"
					@confirm="confirmBatchDelete"
				>
					<template #reference>
						<el-button
							v-if="batchDeleteMode"
							type="danger"
							:disabled="selectedIds.length === 0"
						>
							确认删除
						</el-button>
					</template>
				</el-popconfirm>
			</div>
		</div>

		<!-- 题解列表 -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				v-for="solution in pagedSolutions"
				:key="solution.id"
				class="result-card bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
				@click="openDetail(solution)"
			>
				<!-- 删除X按钮（无红色背景/圆点，仅X） -->
				<el-popconfirm
					title="确定要删除该题解吗？"
					confirm-button-text="删除"
					cancel-button-text="取消"
					@confirm="deleteSolution(solution.id)"
				>
					<template #reference>
						<button
							class="absolute top-2 right-2 z-20 text-lg font-bold text-white hover:text-gray-200 flex items-center justify-center"
							title="删除"
							style="
								background: transparent !important;
								border: none !important;
								box-shadow: none !important;
								outline: none !important;
								width: 28px;
								height: 28px;
								padding: 0;
								margin: 0;
								line-height: 1;
								display: flex;
								align-items: center;
								justify-content: center;
							"
							@click.stop
						>
							×
						</button>
					</template>
				</el-popconfirm>
				<!-- 批量选择多选框（右侧中间） -->
				<el-checkbox-group
					v-if="batchDeleteMode"
					v-model="selectedIds"
					class="absolute right-2 top-1/2 -translate-y-1/2 z-10 scale-300"
				>
					<el-checkbox :label="String(solution.id)" :size="'large'" @click.stop />
				</el-checkbox-group>
				<!-- 左侧装饰条，按题目难度色 -->
				<div
					class="absolute left-0 top-0 bottom-0 w-1.5"
					:class="solution.question.difficultyClass + '-border'"
				></div>
				<div class="flex justify-between items-start mb-2">
					<h3 class="text-lg font-bold text-indigo-900 line-clamp-1">
						{{ solution.title }}
					</h3>
					<div :class="['difficulty-badge', solution.question.difficultyClass]">
						{{ solution.question.difficultyText.text }}
					</div>
				</div>
				<div class="text-sm text-gray-500 mb-2">
					<span>作者：{{ solution.author }}</span>
					<span class="ml-4"
						><i class="fas fa-calendar mr-1"></i>{{ solution.date }}</span
					>
				</div>
				<p class="text-gray-700 mb-3 line-clamp-2">{{ solution.summary }}</p>
				<div class="tags flex flex-wrap gap-2 mb-2">
					<span
						v-for="(tag, tagIndex) in solution.tags"
						:key="tagIndex"
						class="tag-badge"
						>{{ tag }}</span
					>
				</div>
				<div class="flex justify-between items-center text-xs text-gray-400">
					<span><i class="fas fa-link mr-1"></i>题目：{{ solution.question.title }}</span>
					<!-- 1. 卡片区点赞只显示静态数字 -->
					<span><i class="fas fa-thumbs-up mr-1"></i>{{ solution.likes }}</span>
				</div>
				<!-- 在卡片 <div ... class="result-card ..."> 内部添加删除按钮 -->
				<el-popconfirm
					title="确定要删除该题解吗？"
					confirm-button-text="删除"
					cancel-button-text="取消"
					@confirm="deleteSolution(solution.id)"
				>
				</el-popconfirm>
				<!-- 2. 点赞按钮和动画 -->
				<el-button
					size="small"
					type="success"
					:plain="!solution.liked"
					:class="solution.liked ? 'bg-green-500 text-white' : ''"
					@click.stop="likeSolution(solution)"
				>
					<i :class="['fas', solution.liked ? 'fa-thumbs-up' : 'fa-thumbs-up']" />
					<transition name="like-bounce">
						<span v-if="solution.liked" key="liked">已点赞({{ solution.likes }})</span>
						<span v-else key="not-liked">点赞({{ solution.likes }})</span>
					</transition>
				</el-button>
			</div>
		</div>
		<!-- 自定义分页控件 -->
		<div class="flex justify-center mt-8">
			<ul class="flex items-center space-x-2">
				<!-- 上一页 -->
				<li>
					<button
						:disabled="currentPage === 1"
						class="px-2 py-1 rounded bg-white text-gray-700 border disabled:opacity-50"
						@click="goToPage(currentPage - 1)"
					>
						&lt;
					</button>
				</li>
				<!-- 页码部分（原有 customPages） -->
				<li v-for="page in customPages" :key="page.key">
					<button
						v-if="!page.ellipsis && page.num !== undefined"
						:class="[
							'px-3 py-1 rounded',
							currentPage === page.num
								? 'bg-indigo-600 text-white'
								: 'bg-white text-gray-700 border'
						]"
						@click="goToPage(page.num)"
					>
						{{ page.num }}
					</button>
					<span v-else class="px-2 text-gray-400">...</span>
				</li>
				<!-- 下一页 -->
				<li>
					<button
						:disabled="currentPage === totalPages"
						class="px-2 py-1 rounded bg-white text-gray-700 border disabled:opacity-50"
						@click="goToPage(currentPage + 1)"
					>
						&gt;
					</button>
				</li>
			</ul>
		</div>

		<!-- 题解详情弹窗 -->
		<el-dialog
			v-model="detailVisible"
			width="700px"
			:before-close="closeDetail"
			class="rounded-xl"
		>
			<template #title>
				<div class="flex items-center">
					<i class="fas fa-book-open text-indigo-600 mr-2"></i>
					<span>题解详情</span>
				</div>
			</template>
			<div v-if="currentSolution">
				<!-- 题解标题/作者/时间 -->
				<div class="mb-2 flex justify-between items-center">
					<h3 class="text-xl font-bold text-indigo-900">{{ currentSolution.title }}</h3>
					<div class="text-sm text-gray-500">
						作者：{{ currentSolution.author }} | {{ currentSolution.date }}
					</div>
				</div>
				<!-- 题目关联信息 -->
				<div class="mb-3 p-3 bg-gray-50 rounded flex items-center">
					<span class="font-semibold text-gray-700 mr-2">题目：</span>
					<span class="mr-4">{{ currentSolution.question.title }}</span>
					<span :class="['difficulty-badge', currentSolution.question.difficultyClass]">{{
						currentSolution.question.difficultyText.text
					}}</span>
					<span class="ml-4 text-xs text-gray-400"
						><i class="fas fa-building mr-1"></i
						>{{ currentSolution.question.company }}</span
					>
				</div>
				<!-- 题解正文 -->
				<div class="mb-4">
					<h4 class="font-semibold text-gray-700 mb-2">题解内容</h4>
					<div
						class="prose prose-indigo max-w-none"
						v-html="currentSolution.content"
					></div>
				</div>
				<!-- 代码区块 -->
				<div v-if="currentSolution.code" class="mb-4">
					<h4 class="font-semibold text-gray-700 mb-2">参考代码</h4>
					<div class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
						<pre><code>{{ currentSolution.code }}</code></pre>
					</div>
				</div>
				<!-- 标签 -->
				<div class="flex flex-wrap gap-2 mb-4">
					<span
						v-for="(tag, index) in currentSolution.tags"
						:key="index"
						class="tag-badge"
						>{{ tag }}</span
					>
				</div>
				<!-- 点赞/收藏/评论区 -->
				<div class="flex items-center gap-4 border-t pt-4">
					<!-- 2. 题解详情弹窗点赞按钮加动画和已点赞状态 -->
					<el-button
						size="small"
						type="success"
						:plain="!currentSolution.liked"
						:class="currentSolution.liked ? 'bg-green-500 text-white' : ''"
						@click="likeSolution(currentSolution)"
					>
						<i
							:class="[
								'fas',
								currentSolution.liked ? 'fa-thumbs-up' : 'fa-thumbs-up'
							]"
						/>
						<transition name="like-bounce">
							<span v-if="currentSolution.liked" key="liked"
								>已点赞({{ currentSolution.likes }})</span
							>
							<span v-else key="not-liked">点赞({{ currentSolution.likes }})</span>
						</transition>
					</el-button>
					<el-button size="small" type="warning" @click="toggleFavorite"
						><i :class="['fas', isFavorited ? 'fa-star' : 'fa-star-half-alt']"></i>
						收藏</el-button
					>
					<el-button size="small" type="info"
						><i class="fas fa-comment-dots mr-1"></i>评论</el-button
					>
				</div>
				<!-- 评论区预留 -->
				<div class="mt-4 text-gray-400 text-sm italic">评论功能待实现...</div>
			</div>
		</el-dialog>

		<!-- 新增/编辑题解弹窗（预留） -->
		<el-dialog
			v-model="addDialogVisible"
			width="600px"
			:before-close="closeAddDialog"
			class="rounded-xl"
		>
			<template #title>
				<span>新增题解</span>
			</template>
			<el-form :model="newSolution" label-width="80px" class="pt-2">
				<el-form-item label="题目">
					<el-select
						v-model.number="newSolution.questionId"
						placeholder="请选择题目"
						filterable
					>
						<el-option
							v-for="q in MOCK_QUESTIONS"
							:key="q.id"
							:label="q.title"
							:value="Number(q.id)"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="标题">
					<el-input v-model="newSolution.title" type="text" placeholder="题解标题" />
				</el-form-item>
				<el-form-item label="作者">
					<el-input
						v-model="newSolution.author"
						type="text"
						placeholder="作者（可选，默认公司名）"
					/>
				</el-form-item>
				<el-form-item label="内容">
					<el-input
						v-model="newSolution.content"
						:type="'textarea'"
						:rows="4"
						placeholder="题解内容"
					/>
				</el-form-item>
				<el-form-item label="代码">
					<el-input
						v-model="newSolution.code"
						:type="'textarea'"
						:rows="3"
						placeholder="参考代码（可选）"
					/>
				</el-form-item>
				<el-form-item label="标签">
					<el-input
						v-model="newSolution.tags"
						type="text"
						placeholder="多个标签用逗号分隔"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAddSolution">提交</el-button>
					<el-button @click="closeAddDialog">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { MOCK_QUESTIONS } from '../utils/mockQuestions.js';

function getDifficultyText(difficulty: number) {
	if (difficulty === 1) return { text: '简单', className: 'easy' };
	if (difficulty === 2) return { text: '简单', className: 'easy' };
	if (difficulty === 3) return { text: '中等难度', className: 'medium' };
	if (difficulty === 4) return { text: '高级', className: 'hard' };
	return { text: '未知', className: '' };
}
function getDifficultyClass(difficulty: number) {
	if (difficulty === 1) return 'easy';
	if (difficulty === 2) return 'easy';
	if (difficulty === 3) return 'medium';
	if (difficulty === 4) return 'hard';
	return '';
}

// 1. 生成 solutions 时加 liked 字段
const solutions = ref(
	MOCK_QUESTIONS.map(q => ({
		id: q.id,
		title: q.title + '题解',
		author: q.company, // 这里直接用公司名
		date: q.updateDate || '2024-05-01',
		summary: q.content.slice(0, 20) + '...',
		content: `<p>${q.content}</p>`,
		code: q.codeExample,
		tags: q.tags,
		likes: Math.floor(Math.random() * 20) + 1,
		liked: false,
		question: {
			id: q.id,
			title: q.title,
			difficulty: q.difficulty,
			difficultyText: getDifficultyText(q.difficulty),
			difficultyClass: getDifficultyClass(q.difficulty),
			company: q.company
		}
	}))
);

const pageSize = 12;
const currentPage = ref(1);
const total = solutions.value.length;
const pagedSolutions = computed(() => {
	const start = (currentPage.value - 1) * pageSize;
	return solutions.value.slice(start, start + pageSize);
});

const detailVisible = ref(false);
const currentSolution = ref<any>(null);
const isFavorited = ref(false);

const addDialogVisible = ref(false);
const editMode = ref(false);

// 1. 新增状态变量
const batchDeleteMode = ref(false);
// 1. selectedIds 类型为 string[]
const selectedIds = ref<string[]>([]);

function confirmBatchDelete() {
	const ids = selectedIds.value.map(Number);
	solutions.value = solutions.value.filter(item => !ids.includes(item.id));
	selectedIds.value = [];
	batchDeleteMode.value = false;
}

// 用泛型为 newSolution 添加类型声明
const newSolution = reactive<{
	questionId: number;
	title: string;
	author: string;
	content: string;
	code: string;
	tags: string;
}>({
	questionId: 0,
	title: '',
	author: '',
	content: '',
	code: '',
	tags: ''
});

function resetNewSolution() {
	newSolution.questionId = 0;
	newSolution.title = '';
	newSolution.author = '';
	newSolution.content = '';
	newSolution.code = '';
	newSolution.tags = '';
}

function handleAddSolution() {
	const question = MOCK_QUESTIONS.find(q => q.id === newSolution.questionId);
	if (!question) return;
	solutions.value.unshift({
		id: Date.now(),
		title: newSolution.title,
		author: newSolution.author || question.company,
		date: new Date().toISOString().slice(0, 10),
		summary: newSolution.content.slice(0, 20) + '...',
		content: `<p>${newSolution.content}</p>`,
		code: newSolution.code,
		tags: newSolution.tags
			.split(',')
			.map(t => t.trim())
			.filter(Boolean),
		likes: 0,
		liked: false,
		question: {
			id: question.id,
			title: question.title,
			difficulty: question.difficulty,
			difficultyText: getDifficultyText(question.difficulty),
			difficultyClass: getDifficultyClass(question.difficulty),
			company: question.company
		}
	});
	addDialogVisible.value = false;
	resetNewSolution();
}

function openDetail(solution: any) {
	currentSolution.value = solution; // 直接引用，保证点赞数量同步
	detailVisible.value = true;
	isFavorited.value = false;
}
function closeDetail() {
	detailVisible.value = false;
}
// 3. likeSolution 方法
function likeSolution(solution: any) {
	if (!solution.liked) {
		solution.likes++;
		solution.liked = true;
	} else {
		if (solution.likes > 0) solution.likes--;
		solution.liked = false;
	}
}
function toggleFavorite() {
	isFavorited.value = !isFavorited.value;
}
function openAddDialog() {
	addDialogVisible.value = true;
	editMode.value = false;
}
function closeAddDialog() {
	addDialogVisible.value = false;
}

// 自定义分页逻辑

function goToPage(num: number) {
	if (num !== currentPage.value) currentPage.value = num;
}

interface CustomPage {
	num?: number;
	ellipsis?: boolean;
	key: number | string;
}

const customPages = computed((): CustomPage[] => {
	const pages: CustomPage[] = [];
	const totalPages = Math.ceil(total / pageSize);
	// 前4页
	for (let i = 1; i <= Math.min(4, totalPages); i++) {
		pages.push({ num: i, ellipsis: false, key: i });
	}
	// 省略号和尾页
	if (totalPages > 5) {
		if (currentPage.value <= 4) {
			pages.push({ ellipsis: true, key: 'ellipsis1' });
			pages.push({ num: totalPages, ellipsis: false, key: totalPages });
		} else if (currentPage.value >= totalPages - 2) {
			pages.push({ ellipsis: true, key: 'ellipsis2' });
			for (let i = totalPages - 2; i <= totalPages; i++) {
				if (i > 4) pages.push({ num: i, ellipsis: false, key: i });
			}
		} else {
			pages.push({ ellipsis: true, key: 'ellipsis3' });
			pages.push({ num: currentPage.value, ellipsis: false, key: currentPage.value });
			pages.push({ ellipsis: true, key: 'ellipsis4' });
			pages.push({ num: totalPages, ellipsis: false, key: totalPages });
		}
	}
	return pages;
});

// 在 <script setup lang="ts"> 里添加 totalPages 计算属性
const totalPages = computed(() => Math.ceil(total / pageSize));

// 在 <script setup lang="ts"> 里添加删除方法
function deleteSolution(id: number) {
	solutions.value = solutions.value.filter(item => item.id !== id);
}

defineExpose({ customPages, goToPage });
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import '/@/assets/styles/search.css';

.result-card {
	padding-left: 1.5rem;
}
.difficulty-badge {
	@apply px-2 py-0.5 rounded-full text-xs font-semibold text-white;
}
.easy-border {
	background: linear-gradient(to bottom, #10b981, #059669);
	box-shadow: 2px 0 5px rgba(5, 150, 105, 0.3);
}
.medium-border {
	background: linear-gradient(to bottom, #fbbf24, #f59e0b);
	box-shadow: 2px 0 5px rgba(245, 158, 11, 0.3);
}
.hard-border {
	background: linear-gradient(to bottom, #f97316, #ea580c);
	box-shadow: 2px 0 5px rgba(234, 88, 12, 0.3);
}
.expert-border {
	background: linear-gradient(to bottom, #ef4444, #dc2626);
	box-shadow: 2px 0 5px rgba(220, 38, 38, 0.3);
}
.tag-badge {
	@apply bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs;
}
.code-block {
	font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
	font-size: 0.95em;
}
.like-bounce-enter-active {
	animation: like-bounce 0.4s;
}
@keyframes like-bounce {
	0% {
		transform: scale(1);
	}
	30% {
		transform: scale(1.3);
	}
	60% {
		transform: scale(0.95);
	}
	100% {
		transform: scale(1);
	}
}
</style>
