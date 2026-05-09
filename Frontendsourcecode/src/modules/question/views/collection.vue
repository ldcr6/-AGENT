<template>
	<div class="app-container">
		<header
			class="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
		>
			<div
				class="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center"
			>
				<div class="flex items-center mb-4 md:mb-0">
					<i class="fas fa-star text-3xl mr-3 animate-pulse"></i>
					<h1 class="text-3xl font-bold tracking-wider">我的收藏</h1>
				</div>
				<p class="text-indigo-100">你收藏的所有题目都在这里</p>
			</div>
		</header>
		<main class="container mx-auto px-4 py-8 relative z-10">
			<!-- 搜索部分 -->
			<div class="search-container bg-white rounded-xl shadow-xl p-6 mb-8">
				<h2 class="text-2xl font-bold mb-6 text-indigo-800 flex items-center">
					<i class="fas fa-search mr-2"></i>多维筛选
				</h2>
				<form @submit.prevent="performSearch" class="space-y-6">
					<div class="search-box-container">
						<div class="relative">
							<input
								type="text"
								v-model="searchKeyword"
								class="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none transition-colors duration-300"
								placeholder="输入关键词搜索收藏题目"
							/>
							<i class="fas fa-keyboard absolute left-3 top-3.5 text-indigo-400"></i>
							<button
								type="submit"
								class="absolute right-2 top-2 bg-indigo-600 text-white rounded-lg px-4 py-1.5 hover:bg-indigo-700 transition-colors duration-300"
							>
								搜索
							</button>
						</div>
					</div>
					<div class="advanced-search bg-gray-50 rounded-lg p-4">
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-lg font-semibold text-gray-700">高级筛选</h3>
							<button
								type="button"
								@click="toggleAdvancedSearch"
								class="text-indigo-600 text-sm flex items-center"
							>
								<span>{{ advancedSearchVisible ? '收起' : '展开' }}</span>
								<i
									:class="[
										'fas',
										'ml-1',
										'transition-transform duration-300',
										advancedSearchVisible ? 'fa-chevron-up' : 'fa-chevron-down'
									]"
								></i>
							</button>
						</div>
						<div v-show="advancedSearchVisible" class="space-y-4">
							<!-- 难度范围 -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1"
									>难度范围</label
								>
								<div class="flex items-center">
									<span class="text-sm text-gray-600 mr-2">初级</span>
									<input
										type="range"
										v-model="difficultyLevel"
										min="1"
										max="5"
										class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
									/>
									<span class="text-sm text-gray-600 ml-2">高级</span>
								</div>
								<div class="text-center mt-1">
									<span :class="difficultyClass" class="text-sm font-medium">
										{{ difficultyText.text }}
									</span>
								</div>
							</div>
							<!-- 标签选择 -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>技术标签筛选</label
								>
								<div class="flex flex-wrap gap-2">
									<div
										v-for="(tag, index) in tags"
										:key="index"
										:class="[
											'tag-chip',
											{ active: selectedTags.includes(tag) }
										]"
										@click="toggleTag(tag)"
									>
										<span>{{ tag }}</span>
										<i class="fas fa-times ml-1"></i>
									</div>
								</div>
								<div class="mt-2">
									<input
										type="text"
										v-model="customTagInput"
										@keyup.enter="addCustomTag"
										class="text-sm py-1 px-2 border border-gray-300 rounded"
										placeholder="添加自定义标签"
									/>
									<button
										type="button"
										@click="addCustomTag"
										class="ml-2 text-sm bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded transition-colors duration-200"
									>
										添加
									</button>
								</div>
							</div>
							<!-- 公司筛选 -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>面试公司</label
								>
								<select
									v-model="selectedCompany"
									class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
								>
									<option value="">全部公司</option>
									<option
										v-for="company in companies"
										:key="company.value"
										:value="company.value"
									>
										{{ company.label }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</form>
			</div>
			<!-- 收藏题目列表 -->
			<div
				v-if="filteredQuestions.length"
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				<div
					v-for="question in pagedQuestions"
					:key="question.id"
					class="result-card bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 relative"
				>
					<div
						class="absolute left-0 top-0 bottom-0 w-1.5"
						:class="question.difficultyClass + '-border'"
					></div>
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-xl font-bold text-indigo-900">{{ question.title }}</h3>
						<div :class="['difficulty-badge', question.difficultyClass]">
							{{
								typeof question.difficultyText === 'object' &&
								question.difficultyText
									? question.difficultyText.text
									: question.difficultyText
							}}
						</div>
					</div>
					<p class="text-gray-700 mb-4 line-clamp-2">{{ question.description }}</p>
					<div v-if="question.codeExample" class="mb-4">
						<div
							class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto"
						>
							<pre><code>{{ question.codeExample }}</code></pre>
						</div>
					</div>
					<div class="tags flex flex-wrap gap-2 mb-4">
						<span
							v-for="(tag, tagIndex) in question.tags"
							:key="tagIndex"
							class="tag-badge"
						>
							{{ tag }}
						</span>
					</div>
					<div class="flex justify-between items-center text-sm text-gray-500">
						<div><i class="fas fa-building mr-1"></i>{{ question.company }}</div>
						<div><i class="fas fa-calendar mr-1"></i>{{ question.date }}</div>
					</div>
					<button
						@click="removeFromCollection(question.id)"
						class="absolute top-4 right-4 favorite-btn favorited"
						title="取消收藏"
					>
						<i class="fas fa-heart-broken text-red-400"></i> 取消收藏
					</button>
				</div>
			</div>
			<div v-else class="text-center py-12 text-gray-500 text-lg">
				暂无收藏题目，快去题库收藏吧！
			</div>
			<!-- 分页 -->
			<div
				v-if="filteredQuestions.length > pageSize"
				class="pagination flex justify-center mt-8 space-x-2"
			>
				<button
					:class="['pagination-btn', { disabled: currentPage === 1 }]"
					@click="changePage(currentPage - 1)"
				>
					&laquo; 上一页
				</button>
				<button
					v-for="page in visiblePages"
					:key="page"
					:class="['pagination-btn', { active: page === currentPage }]"
					@click="changePage(page)"
				>
					{{ page }}
				</button>
				<span
					v-if="totalPages > 5 && currentPage < totalPages - 2"
					class="pagination-ellipsis"
					>...</span
				>
				<button
					v-if="totalPages > 5 && currentPage < totalPages - 1"
					:class="['pagination-btn', { active: currentPage === totalPages }]"
					@click="changePage(totalPages)"
				>
					{{ totalPages }}
				</button>
				<button
					:class="['pagination-btn', { disabled: currentPage === totalPages }]"
					@click="changePage(currentPage + 1)"
				>
					下一页 &raquo;
				</button>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, Ref } from 'vue';

// 题目类型声明
interface Question {
	id: number;
	title: string;
	content?: string;
	description?: string;
	codeExample?: string;
	tags: string[];
	company: string;
	updateDate?: string;
	date?: string;
	difficulty: number;
	difficultyText?: { text: string; className: string } | string;
	difficultyClass?: string;
}

interface CompanyOption {
	value: string;
	label: string;
}

const DIFFICULTY_MAP: Record<number, { text: string; className: string }> = {
	1: { text: '入门级', className: 'easy' },
	2: { text: '初级', className: 'easy' },
	3: { text: '中等难度', className: 'medium' },
	4: { text: '高级', className: 'hard' },
	5: { text: '专家级', className: 'expert' }
};
const DIFFICULTY_COLOR_MAP: Record<number | string, string> = {
	1: 'text-green-600',
	2: 'text-green-500',
	3: 'text-yellow-500',
	4: 'text-orange-500',
	5: 'text-red-600',
	easy: 'text-green-600',
	medium: 'text-yellow-500',
	hard: 'text-red-600',
	expert: 'text-red-600'
};
const COMPANY_MAP: Record<string, string> = {
	alibaba: '阿里巴巴',
	tencent: '腾讯',
	bytedance: '字节跳动',
	baidu: '百度',
	meituan: '美团',
	jd: '京东',
	google: 'Google',
	microsoft: '微软',
	amazon: '亚马逊'
};
const pageSize = 6;
const allFavorites: Ref<Question[]> = ref([]);
const searchKeyword = ref('');
const difficultyLevel = ref(3);
const selectedTags = ref<string[]>([]);
const tags = ref<string[]>([
	'JavaScript',
	'React',
	'Vue',
	'Node.js',
	'算法',
	'设计模式',
	'网络',
	'系统设计'
]);
const customTagInput = ref('');
const companies = ref<CompanyOption[]>([
	{ value: 'alibaba', label: '阿里巴巴' },
	{ value: 'tencent', label: '腾讯' },
	{ value: 'bytedance', label: '字节跳动' },
	{ value: 'baidu', label: '百度' },
	{ value: 'meituan', label: '美团' },
	{ value: 'jd', label: '京东' },
	{ value: 'google', label: 'Google' },
	{ value: 'microsoft', label: '微软' },
	{ value: 'amazon', label: '亚马逊' }
]);
const selectedCompany = ref('');
const advancedSearchVisible = ref(true);
const currentPage = ref(1);

onMounted(() => {
	loadCollection();
});

function loadCollection() {
	const arr: any[] = JSON.parse(localStorage.getItem('questionCollection') || '[]');
	allFavorites.value = arr.map((q: any) => ({
		...q,
		description: q.content || q.description,
		date: q.updateDate || q.date,
		company: COMPANY_MAP[q.company] || q.company,
		difficultyText: DIFFICULTY_MAP[q.difficulty] || q.difficulty,
		difficultyClass: DIFFICULTY_MAP[q.difficulty]?.className || ''
	}));
}

const difficultyText = computed(() => DIFFICULTY_MAP[difficultyLevel.value]);
const difficultyClass = computed(() => DIFFICULTY_COLOR_MAP[difficultyLevel.value]);

function toggleAdvancedSearch() {
	advancedSearchVisible.value = !advancedSearchVisible.value;
}
function toggleTag(tag: string) {
	if (selectedTags.value.includes(tag)) {
		selectedTags.value = selectedTags.value.filter(t => t !== tag);
	} else {
		selectedTags.value.push(tag);
	}
}
function addCustomTag() {
	const tag = customTagInput.value.trim();
	if (tag && !tags.value.includes(tag)) {
		tags.value.push(tag);
	}
	customTagInput.value = '';
}
function performSearch() {
	currentPage.value = 1;
}

const filteredQuestions = computed<Question[]>(() => {
	let result = allFavorites.value;
	// 关键词
	if (searchKeyword.value.trim()) {
		const keyword = searchKeyword.value.toLowerCase();
		result = result.filter(
			q =>
				(q.title && q.title.toLowerCase().includes(keyword)) ||
				(q.description && q.description.toLowerCase().includes(keyword)) ||
				(q.tags && q.tags.some(tag => tag.toLowerCase().includes(keyword)))
		);
	}
	// 难度
	if (difficultyLevel.value) {
		result = result.filter(q => q.difficulty >= difficultyLevel.value);
	}
	// 标签
	if (selectedTags.value.length) {
		result = result.filter(q =>
			selectedTags.value.every(tag => q.tags && q.tags.includes(tag))
		);
	}
	// 公司
	if (selectedCompany.value) {
		result = result.filter(
			q =>
				q.company &&
				(q.company === COMPANY_MAP[selectedCompany.value] ||
					q.company === selectedCompany.value)
		);
	}
	return result;
});

const totalPages = computed(() => Math.ceil(filteredQuestions.value.length / pageSize));
const pagedQuestions = computed<Question[]>(() => {
	const start = (currentPage.value - 1) * pageSize;
	return filteredQuestions.value.slice(start, start + pageSize);
});
const visiblePages = computed<number[]>(() => {
	const pages: number[] = [];
	const total = totalPages.value;
	const cur = currentPage.value;
	const startPage = Math.max(1, cur - 2);
	const endPage = Math.min(total, startPage + 4);
	for (let i = startPage; i <= endPage; i++) pages.push(i);
	return pages;
});
function changePage(page: number) {
	if (page < 1 || page > totalPages.value) return;
	currentPage.value = page;
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
function removeFromCollection(id: number) {
	let arr: any[] = JSON.parse(localStorage.getItem('questionCollection') || '[]');
	arr = arr.filter(q => q.id !== id);
	localStorage.setItem('questionCollection', JSON.stringify(arr));
	loadCollection();
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.loli.net/css2?family=ZCOOL+XiaoWei&family=ZCOOL+KuaiLe&display=swap');
@import '/@/assets/styles/search.css';
.result-card {
	padding-left: 1.5rem;
}
.favorite-btn {
	display: flex;
	align-items: center;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.875rem;
	border: 1px solid #e5e7eb;
	background-color: #f9fafb;
	transition:
		background 0.2s,
		border 0.2s;
}
.favorite-btn.favorited {
	border-color: #fecaca;
	background-color: #fef2f2;
}
.favorite-btn:hover {
	background: #fee2e2;
	border-color: #fecaca;
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
.tag-chip {
	display: inline-flex;
	align-items: center;
	background: #f3f4f6;
	border-radius: 9999px;
	padding: 0.25rem 0.75rem;
	font-size: 0.875rem;
	cursor: pointer;
	border: 1px solid #e5e7eb;
	transition:
		background 0.2s,
		border 0.2s;
}
.tag-chip.active {
	background: #e0e7ff;
	border-color: #6366f1;
}
.tag-badge {
	display: inline-block;
	background: #e0e7ff;
	color: #3730a3;
	border-radius: 9999px;
	padding: 0.25rem 0.75rem;
	font-size: 0.75rem;
}
.pagination-btn {
	padding: 0.5rem 1rem;
	border-radius: 0.375rem;
	background: #f3f4f6;
	border: 1px solid #e5e7eb;
	margin: 0 0.25rem;
	font-size: 1rem;
	cursor: pointer;
	transition:
		background 0.2s,
		border 0.2s;
}
.pagination-btn.active {
	background: #6366f1;
	color: #fff;
	border-color: #6366f1;
}
.pagination-btn.disabled {
	background: #e5e7eb;
	color: #9ca3af;
	cursor: not-allowed;
}
</style>
