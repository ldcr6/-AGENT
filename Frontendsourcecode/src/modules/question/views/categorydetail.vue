<template>
	<div class="category-detail-page">
		<header class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-bold">{{ categoryName }} 面试题</h2>
			<input v-model="search" placeholder="搜索题目/关键词" class="search-input" />
		</header>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				v-for="item in filteredQuestions"
				:key="item.id"
				class="question-card"
				@click="showDetail(item)"
			>
				<div class="flex items-center mb-2">
					<span class="tag">{{ item.difficulty }}</span>
					<span class="ml-2 text-xs text-gray-500">{{ item.addedTime }}</span>
				</div>
				<h3 class="font-semibold text-base mb-1">{{ item.title }}</h3>
				<div class="flex flex-wrap gap-2 mb-2">
					<span v-for="tag in item.tags" :key="tag" class="tag tag-blue">{{ tag }}</span>
				</div>
				<div class="text-xs text-gray-500 flex items-center">
					<span>作者：{{ item.author }}</span>
				</div>
			</div>
		</div>

		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" top="10vh">
			<div v-if="currentQuestion">
				<h4>标准答案：</h4>
				<pre class="code-block">{{ currentQuestion.solution || '暂无标准答案' }}</pre>
				<h4 style="margin-top: 16px">解析：</h4>
				<div style="white-space: pre-wrap">
					{{ currentQuestion.explanation || '暂无详细解析' }}
				</div>
			</div>
			<template #footer>
				<el-button type="primary" @click="dialogVisible = false">关闭</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { allQuestions } from '../data/index.js';

export default {
	data() {
		const route = useRoute();
		const categoryName = route.params.categoryName;
		return {
			categoryName,
			search: '',
			questions: allQuestions[categoryName] || [],
			dialogVisible: false,
			currentQuestion: null
		};
	},
	computed: {
		filteredQuestions() {
			if (!this.search) return this.questions;
			return this.questions.filter(
				q =>
					q.title.includes(this.search) ||
					q.tags.some(tag => tag.includes(this.search)) ||
					q.author.includes(this.search)
			);
		},
		dialogTitle() {
			return this.currentQuestion
				? `【${this.currentQuestion.title}】标准答案与解析`
				: '题目详情';
		}
	},
	methods: {
		showDetail(item) {
			this.currentQuestion = item;
			this.dialogVisible = true;
		}
	}
};
</script>

<style scoped>
.category-detail-page {
	max-width: 1100px;
	margin: 0 auto;
	padding: 2rem 1rem;
}
.search-input {
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	padding: 0.5rem 1rem;
	min-width: 220px;
}
.question-card {
	background: #fff;
	border-radius: 0.5rem;
	box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
	padding: 1rem;
	margin-bottom: 1rem;
	transition: box-shadow 0.2s;
	cursor: pointer;
}
.question-card:hover {
	box-shadow: 0 6px 20px rgba(99, 102, 241, 0.15);
	/* 可选：可加轻微缩放或其它动效 */
	/* transform: translateY(-2px) scale(1.02); */
}
.tag {
	display: inline-block;
	background: #f3f4f6;
	color: #6366f1;
	border-radius: 0.25rem;
	padding: 0 0.5em;
	font-size: 0.75em;
}
.tag-blue {
	background: #e0e7ff;
	color: #3730a3;
}
</style>
