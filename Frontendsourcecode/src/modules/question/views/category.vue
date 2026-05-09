<template>
	<div class="page-container">
		<ParticlesEffect />
		<div class="scrollable-content">
			<div class="container mx-auto px-4 py-8 content-container">
				<header class="flex justify-between items-center mb-8">
					<h1
						class="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
					>
						📚 面试题库智能分类
					</h1>
					<button
						id="theme-toggle"
						class="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
						@click="toggleTheme"
					>
						<span id="theme-icon">{{ themeIcon }}</span>
					</button>
				</header>

				<div class="grid-container gap-6 mb-8">
					<div class="w-full md:w-1/4 mb-6 md:mb-0">
						<div class="filter-panel">
							<h3 class="font-semibold text-lg mb-3 dark:text-gray-200">
								🔍 筛选条件
							</h3>
							<div class="filter-content space-y-4">
								<div>
									<label class="block text-sm font-medium mb-1 dark:text-gray-200"
										>技术栈</label
									>
									<select
										v-model="filters.techStack"
										class="input-control w-full p-2 border rounded"
									>
										<option value="all">全部</option>
										<option value="vue">Vue</option>
										<option value="react">React</option>
										<option value="python">Python</option>
										<option value="java">Java</option>
									</select>
								</div>
								<div>
									<label class="block text-sm font-medium mb-1 dark:text-gray-200"
										>职位</label
									>
									<select
										v-model="filters.position"
										class="input-control w-full p-2 border rounded"
									>
										<option value="all">全部</option>
										<option value="frontend">前端</option>
										<option value="backend">后端</option>
										<option value="algorithm">算法</option>
										<option value="product">产品</option>
									</select>
								</div>
								<div>
									<label class="block text-sm font-medium mb-1 dark:text-gray-200"
										>难度</label
									>
									<select
										v-model="filters.difficulty"
										class="input-control w-full p-2 border rounded"
									>
										<option value="all">全部</option>
										<option value="junior">初级</option>
										<option value="mid">中级</option>
										<option value="senior">高级</option>
									</select>
								</div>
							</div>
							<button
								class="btn btn-primary mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
								@click="applyFilters"
							>
								应用筛选
							</button>
						</div>
					</div>

					<div class="w-full md:w-3/4">
						<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
							<div class="flex justify-between items-center mb-4">
								<h3 class="font-semibold text-lg dark:text-gray-200">
									🗂️ 分类结果
								</h3>
								<span class="text-sm text-gray-500 dark:text-gray-300"
									>共 {{ totalQuestions }} 道题目</span
								>
							</div>

							<div
								id="categories-container"
								class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
							>
								<div
									v-for="(category, index) in categories"
									:key="index"
									class="category-card rounded-lg p-4 shadow cursor-move"
									:class="cardColors[index % cardColors.length]"
									draggable="true"
									@dragstart="dragStart($event, index)"
									@dragover.prevent
									@dragenter.prevent
									@drop="drop($event, index)"
								>
									<h4 class="font-medium mb-2">{{ category.name }}</h4>
									<p class="text-sm text-gray-600 dark:text-gray-300">
										{{ category.count }} 道题目
									</p>
									<div class="mt-3 flex justify-between items-center">
										<span
											class="text-xs px-2 py-1 rounded bg-white dark:bg-gray-700 dark:text-gray-200 cursor-pointer"
											@click="goToDetail(category.name)"
											>查看详情</span
										>
										<span class="text-xs dark:text-gray-300">👆 拖拽排序</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
					<h3 class="text-xl font-semibold mb-4 dark:text-gray-200">📈 分类统计</h3>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div class="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4">
							<div class="text-indigo-600 dark:text-indigo-300 text-sm mb-1">
								总分类数
							</div>
							<div class="text-2xl font-bold dark:text-white">
								{{ categories.length }}
							</div>
						</div>
						<div class="bg-green-50 dark:bg-green-900 rounded-lg p-4">
							<div class="text-green-600 dark:text-green-300 text-sm mb-1">
								总题目数
							</div>
							<div class="text-2xl font-bold dark:text-white">
								{{ totalQuestions }}
							</div>
						</div>
						<div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
							<div class="text-blue-600 dark:text-blue-300 text-sm mb-1">
								平均难度
							</div>
							<div class="text-2xl font-bold dark:text-white">中级</div>
						</div>
						<div class="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
							<div class="text-purple-600 dark:text-purple-300 text-sm mb-1">
								更新日期
							</div>
							<div class="text-2xl font-bold dark:text-white">{{ updateDate }}</div>
						</div>
					</div>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
					<h3 class="text-xl font-semibold mb-4 dark:text-gray-200">📝 最新添加题目</h3>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="bg-gray-100 dark:bg-gray-700">
									<th class="py-2 px-4 text-left">ID</th>
									<th class="py-2 px-4 text-left">题目</th>
									<th class="py-2 px-4 text-left">分类</th>
									<th class="py-2 px-4 text-left">难度</th>
									<th class="py-2 px-4 text-left">添加时间</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(question, index) in recentQuestions"
									:key="index"
									class="border-b border-gray-200 dark:border-gray-700"
								>
									<td class="py-3 px-4">#{{ question.id }}</td>
									<td class="py-3 px-4">{{ question.title }}</td>
									<td class="py-3 px-4">
										<span
											class="text-xs px-2 py-1 rounded"
											:class="getCategoryClass(question.category)"
										>
											{{ question.category }}
										</span>
									</td>
									<td class="py-3 px-4">
										<span
											class="text-xs px-2 py-1 rounded"
											:class="getDifficultyClass(question.difficulty)"
										>
											{{ question.difficulty }}
										</span>
									</td>
									<td class="py-3 px-4">{{ question.addedTime }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<PageFooter />
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import ParticlesEffect from './ParticlesEffect.vue';
import PageFooter from '../../../components/PageFooter.vue';
import { useRouter } from 'vue-router';

export default {
	components: {
		ParticlesEffect,
		PageFooter
	},
	setup() {
		// 主题状态
		const isDark = ref(false);
		const themeIcon = ref('🌙');

		// 过滤条件
		const filters = ref({
			techStack: 'all',
			position: 'all',
			difficulty: 'all'
		});

		// 分类数据
		const categories = ref([
			{ id: 1, name: 'Vue相关', count: 28 },
			{ id: 2, name: 'React相关', count: 22 },
			{ id: 3, name: 'Python相关', count: 35 },
			{ id: 4, name: 'Java相关', count: 18 },
			{ id: 5, name: '前端基础', count: 42 },
			{ id: 6, name: '算法题', count: 37 }
		]);

		// 卡片颜色
		const cardColors = ref([
			'bg-green-100 dark:bg-green-900',
			'bg-blue-100 dark:bg-blue-900',
			'bg-yellow-100 dark:bg-yellow-900',
			'bg-red-100 dark:bg-red-900',
			'bg-purple-100 dark:bg-purple-900',
			'bg-pink-100 dark:bg-pink-900'
		]);

		// 最新题目
		const recentQuestions = ref([
			{
				id: 128,
				title: 'Vue3 的 Composition API 与 Options API 的主要区别是什么？',
				category: 'Vue相关',
				difficulty: '中级',
				addedTime: '2023-10-15 14:23'
			},
			{
				id: 127,
				title: 'React Hooks 的使用规则和注意事项',
				category: 'React相关',
				difficulty: '中级',
				addedTime: '2023-10-15 12:45'
			},
			{
				id: 126,
				title: 'Python 装饰器的原理与应用场景',
				category: 'Python相关',
				difficulty: '高级',
				addedTime: '2023-10-14 18:12'
			}
		]);

		// 计算属性
		const totalQuestions = computed(() => {
			return categories.value.reduce((sum, category) => sum + category.count, 0);
		});

		const updateDate = ref('2023-10-15');

		// 主题切换
		const toggleTheme = () => {
			isDark.value = !isDark.value;
			themeIcon.value = isDark.value ? '☀️' : '🌙';

			if (isDark.value) {
				document.documentElement.classList.add('dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
		};

		// 应用筛选
		const applyFilters = () => {
			console.log('应用筛选:', filters.value);
			// 这里实际应用中应该发送API请求或过滤数据
		};

		// 获取分类样式
		const getCategoryClass = category => {
			const categoryMap = {
				Vue相关: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
				React相关: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
				Python相关: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
				Java相关: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
				前端基础: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
				算法题: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200'
			};
			return (
				categoryMap[category] ||
				'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
			);
		};

		// 获取难度样式
		const getDifficultyClass = difficulty => {
			const difficultyMap = {
				初级: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
				中级: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
				高级: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
			};
			return (
				difficultyMap[difficulty] ||
				'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
			);
		};

		// 拖拽功能
		const dragStart = (event, index) => {
			event.dataTransfer.setData('text/plain', index.toString());
			event.target.classList.add('dragging');
		};

		const drop = (event, targetIndex) => {
			const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'));
			if (sourceIndex !== targetIndex) {
				const temp = categories.value[sourceIndex];
				categories.value.splice(sourceIndex, 1);
				categories.value.splice(targetIndex, 0, temp);
				saveCategoryOrder();
			}
			event.target.classList.remove('dragging');
		};

		const saveCategoryOrder = () => {
			const orderedIds = categories.value.map(category => category.id);
			localStorage.setItem('categoryOrder', JSON.stringify(orderedIds));
		};

		// 初始化粒子效果
		/* 	const initParticles = () => {
			if (window.particlesJS) {
				window.particlesJS('particles-js', {
					particles: {
						number: { value: 80, density: { enable: true, value_area: 800 } },
						color: { value: '#6366f1' },
						shape: { type: 'circle' },
						opacity: { value: 0.5, random: true },
						size: { value: 3, random: true },
						line_linked: {
							enable: true,
							distance: 150,
							color: '#8b5cf6',
							opacity: 0.4,
							width: 1
						},
						move: {
							enable: true,
							speed: 2,
							direction: 'none',
							random: true,
							straight: false,
							out_mode: 'out'
						}
					},
					interactivity: {
						detect_on: 'canvas',
						events: {
							onhover: { enable: true, mode: 'grab' },
							onclick: { enable: true, mode: 'push' }
						}
					}
				});
			}
		};
 */
		// 组件挂载时
		onMounted(() => {
			// 检查本地存储的主题设置
			if (localStorage.getItem('theme') === 'dark') {
				isDark.value = true;
				themeIcon.value = '☀️';
				document.documentElement.classList.add('dark');
			}

			/* // 动态加载 particles.js
			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
			script.onload = () => {
				// 确保 particlesJS 加载完成
				if (window.particlesJS) {
					initParticles();
				} else {
					console.error('Failed to load particlesJS');
				}
			};
			script.onerror = () => {
				console.error('Error loading particlesJS script');
			};
			document.head.appendChild(script); */
		});

		const router = useRouter();

		const goToDetail = categoryName => {
			router.push({ name: '题库分类详情', params: { categoryName } });
		};

		return {
			isDark,
			themeIcon,
			filters,
			categories,
			cardColors,
			recentQuestions,
			totalQuestions,
			updateDate,
			toggleTheme,
			applyFilters,
			getCategoryClass,
			getDifficultyClass,
			dragStart,
			drop,
			goToDetail
		};
	}
};
</script>

<style scoped>
:root {
	--primary: #6366f1;
	--primary-light: #818cf8;
	--primary-dark: #4f46e5;
	--secondary: #8b5cf6;
	--secondary-light: #a78bfa;
	--secondary-dark: #7c3aed;
	--dark: #1e293b;
	--dark-light: #334155;
	--light: #f8fafc;
	--light-dark: #e2e8f0;
	--success: #10b981;
	--warning: #f59e0b;
	--danger: #ef4444;
	--info: #3b82f6;
	--text-dark: #1e293b;
	--text-light: #f8fafc;
}

* {
	box-sizing: border-box;
}

body {
	font-family: 'Noto Sans SC', sans-serif;
	transition: all 0.3s ease;
	background-color: var(--light);
	color: var(--text-dark);
	margin: 0;
	padding: 0;
	min-height: 100vh;
	overflow-x: hidden;
}

.dark {
	background-color: var(--dark);
	color: var(--text-light);
}

.page-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.content-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}

.scrollable-content {
	flex: 1;
	overflow-y: scroll;
	padding-bottom: 2rem;
	min-height: 90vh;
}

.grid-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}

@media (min-width: 768px) {
	.grid-container {
		flex-direction: row;
	}
}

/* 分类卡片样式 */
.category-card {
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease,
		background-color 0.3s ease;
	border-radius: 0.5rem;
	padding: 1rem;
	cursor: move;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	color: var(--text-dark);
	height: 100%;
}

.dark .category-card {
	color: var(--text-light);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.category-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.dark .category-card:hover {
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

/* 拖拽状态样式 */
.dragging {
	opacity: 0.5;
	background: rgba(99, 102, 241, 0.2);
}

/* 粒子背景 */
.particles {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
	pointer-events: none; /* 允许点击穿透 */
}

/* 按钮样式 */
.btn {
	transition: all 0.2s ease;
	border-radius: 0.375rem;
	padding: 0.5rem 1rem;
	font-weight: 500;
	color: var(--text-light);
}

.btn-primary {
	background-color: var(--primary);
}

.btn-primary:hover {
	background-color: var(--primary-dark);
}

.dark .btn-primary {
	background-color: var(--primary-light);
}

.dark .btn-primary:hover {
	background-color: var(--primary);
}

/* 筛选面板样式 */
.filter-panel {
	border-radius: 0.5rem;
	padding: 1rem;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	background-color: white;
	color: var(--text-dark);
	display: flex;
	flex-direction: column;
	height: 100%;
}

.dark .filter-panel {
	background-color: var(--dark-light);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
	color: var(--text-light);
}

.filter-content {
	flex: 1;
}

/* 输入控件样式 */
.input-control {
	width: 100%;
	padding: 0.5rem;
	border-radius: 0.375rem;
	border: 1px solid #d1d5db;
	transition: border-color 0.2s ease;
	color: var(--text-dark);
}

.dark .input-control {
	background-color: var(--dark);
	border-color: var(--dark-light);
	color: var(--text-light);
}

.input-control:focus {
	outline: none;
	border-color: var(--primary);
	box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* 动画效果 */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.fade-in {
	animation: fadeIn 0.3s ease forwards;
}

/* 响应式布局 */
@media (max-width: 768px) {
	.category-card {
		margin-bottom: 1rem;
	}

	.filter-panel {
		margin-bottom: 1.5rem;
	}
}

/* 滚动条样式 */
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb {
	background: rgba(99, 102, 241, 0.5);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: var(--primary);
}

.dark ::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
	background: rgba(139, 92, 246, 0.5);
}

.dark ::-webkit-scrollbar-thumb:hover {
	background: var(--secondary);
}
</style>
