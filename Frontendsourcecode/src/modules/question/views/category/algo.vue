<template>
	<div class="category-page-container">
		<h1 class="page-title">📐 算法</h1>
		<p class="page-description">
			深入探索不同类型的算法，从排序、搜索到动态规划，提升你的问题解决能力。
		</p>

		<div class="question-list">
			<div v-for="topic in topics" :key="topic.id" class="question-card">
				<div class="card-header">
					<div class="card-title">{{ topic.title }}</div>
					<button
						class="btn-fav"
						:class="{ active: topic.fav }"
						@click="toggleFav(topic.id)"
					>
						<span v-if="topic.fav">❤️</span>
						<span v-else>🤍</span>
					</button>
				</div>
				<div class="card-meta">
					<span class="meta-item"
						>难度 <b>{{ topic.difficulty }}</b></span
					>
					<span class="meta-item"
						>通过率 <b>{{ topic.passRate }}</b></span
					>
				</div>
				<div class="card-actions">
					<button class="btn-primary" @click="startChallenge(topic.id)">开始挑战</button>
					<button class="btn-secondary" @click="viewAnalysis(topic.id)">查看解析</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topics: [
				{ id: 1, title: '快速排序', difficulty: '中等', passRate: '68%', fav: false },
				{ id: 2, title: '归并排序', difficulty: '中等', passRate: '72%', fav: true },
				{
					id: 3,
					title: '二分查找',
					difficulty: '简单',
					passRate: '85%',
					fav: false
				},
				{
					id: 4,
					title: '动态规划：背包问题',
					difficulty: '困难',
					passRate: '40%',
					fav: false
				},
				{
					id: 5,
					title: '深度优先搜索（DFS）',
					difficulty: '中等',
					passRate: '65%',
					fav: false
				}
			]
		};
	},
	methods: {
		toggleFav(id) {
			const topic = this.topics.find(t => t.id === id);
			if (topic) topic.fav = !topic.fav;
		},
		startChallenge(id) {
			alert(`开始挑战题目ID: ${id}`);
		},
		viewAnalysis(id) {
			alert(`查看题目ID: ${id} 的解析`);
		}
	}
};
</script>

<style scoped>
.category-page-container {
	padding: 24px;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
}
.page-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 8px;
}
.page-description {
	font-size: 15px;
	color: #888;
	margin-bottom: 24px;
}
.question-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.question-card {
	background: #f6f8fa;
	border-radius: 12px;
	padding: 18px 20px 14px 20px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	position: relative;
	transition: box-shadow 0.2s;
}
.question-card:hover {
	box-shadow: 0 4px 12px 0 rgba(22, 119, 255, 0.08);
}
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.card-title {
	font-size: 18px;
	font-weight: 600;
}
.btn-fav {
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
}
.btn-fav.active span {
	color: #ff4d4f;
}
.card-meta {
	font-size: 14px;
	color: #888;
	display: flex;
	gap: 18px;
	margin-bottom: 4px;
}
.meta-item b {
	font-weight: 600;
	margin-left: 2px;
}
.card-actions {
	display: flex;
	gap: 10px;
}
.btn-primary {
	background: #1677ff;
	color: #fff;
	border: none;
	border-radius: 8px;
	padding: 8px 20px;
	font-size: 15px;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
}
.btn-primary:hover {
	background: #4096ff;
}
.btn-secondary {
	background: #e9eef3;
	color: #333;
	border: none;
	border-radius: 8px;
	padding: 8px 16px;
	font-size: 15px;
	cursor: pointer;
	transition: background 0.2s;
}
.btn-secondary:hover {
	background: #dde2e7;
}
</style>
