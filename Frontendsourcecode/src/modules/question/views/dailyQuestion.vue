<template>
	<div class="challenge-layout">
		<!-- 左侧边栏 -->
		<aside class="sidebar">
			<div class="category-section">
				<h2 class="sidebar-title">题目分类</h2>
				<ul class="category-list">
					<li
						v-for="category in categories"
						:key="category.id"
						:class="{ active: category.id === activeCategoryId }"
						@click="selectCategory(category)"
					>
						<span class="icon">{{ category.icon }}</span> {{ category.name }}
					</li>
				</ul>
			</div>
			<div class="achievement-section">
				<h3 class="achievement-title">🏆 我的成就</h3>
				<div class="progress-bar-wrap">
					<div class="progress-label">题目已完成</div>
					<div class="progress-bar">
						<div class="progress-inner" :style="{ width: progressPercent + '%' }"></div>
					</div>
					<div class="progress-count">{{ completedQuestions }}/{{ totalQuestions }}</div>
				</div>
				<div class="streak">连续打卡 <span class="streak-days">23</span> 天</div>
			</div>
		</aside>

		<!-- 右侧主内容 -->
		<main class="main-content">
			<!-- 今日挑战卡片 -->
			<section class="today-challenge-card">
				<div class="card-header">
					<span class="tag">今日挑战</span>
					<button
						class="btn-fav"
						:class="{ active: currentChallenge.fav }"
						@click="toggleFav('current')"
					>
						<span v-if="currentChallenge.fav">❤️</span>
						<span v-else>🤍</span>
					</button>
				</div>
				<div class="card-title">{{ currentChallenge.title }}</div>
				<div class="card-meta">
					<span class="meta-item"
						>难度 <b>{{ currentChallenge.difficulty }}</b></span
					>
					<span class="meta-item"
						>通过率 <b>{{ currentChallenge.passRate }}</b></span
					>
				</div>
				<div class="card-desc">{{ currentChallenge.description }}</div>
				<div class="card-actions">
					<button class="btn-primary" @click="startChallenge()">开始答题</button>
					<button class="btn-secondary" @click="viewAnalysis()">查看解析</button>
					<button class="btn-secondary" @click="shareChallenge">分享题目</button>
				</div>
			</section>

			<!-- 推荐题目卡片 -->
			<section class="recommend-section">
				<div class="section-title">
					推荐题目
					<button
						class="btn-secondary"
						@click="shuffleRecommended"
						style="margin-left: 12px; font-size: 13px; padding: 4px 12px"
					>
						换一换
					</button>
				</div>
				<div class="recommend-list">
					<div v-for="topic in recommendedTopics" :key="topic.id" class="recommend-card">
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
							<span class="meta-item" v-if="topic.tag"
								>标签 <b>{{ topic.tag }}</b></span
							>
						</div>
						<div class="card-desc" v-if="topic.description">
							{{ topic.description }}
						</div>
						<div class="card-actions">
							<button class="btn-primary" @click="startChallenge(topic.id)">
								开始挑战
							</button>
							<button class="btn-secondary" @click="viewAnalysis(topic.id)">
								查看解析
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>

		<!-- 答题弹窗 -->
		<el-dialog
			v-if="activeChallenge"
			v-model="isChallengeDialogVisible"
			:title="`正在挑战：${activeChallenge.title}`"
			width="70%"
			top="5vh"
			class="challenge-dialog"
		>
			<div class="challenge-content">
				<div class="question-details">
					<h3>{{ activeChallenge.title }}</h3>
					<p class="description">{{ activeChallenge.description }}</p>
					<div class="meta">
						<span class="meta-item"
							>难度 <b>{{ activeChallenge.difficulty }}</b></span
						>
						<span class="meta-item"
							>通过率 <b>{{ activeChallenge.passRate }}</b></span
						>
					</div>
				</div>
				<div class="answer-area">
					<h4>你的解答：</h4>
					<textarea
						v-model="userCode"
						placeholder="在这里输入你的代码..."
						class="code-editor"
					></textarea>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<button class="btn-secondary" @click="isChallengeDialogVisible = false">
						关闭
					</button>
					<button class="btn-primary" @click="submitAnswer">提交解答</button>
				</span>
			</template>
		</el-dialog>

		<!-- 解析弹窗 -->
		<el-dialog
			v-model="isAnalysisDialogVisible"
			:title="`【${analysisContent.title || currentChallenge.title}】的标准答案与解析`"
			width="50%"
			top="10vh"
		>
			<div>
				<h4>标准答案：</h4>
				<pre class="code-editor">{{ analysisContent.answer }}</pre>
				<h4 style="margin-top: 16px">解析：</h4>
				<div style="white-space: pre-wrap">{{ analysisContent.explanation }}</div>
			</div>
			<template #footer>
				<button class="btn-primary" @click="isAnalysisDialogVisible = false">关闭</button>
			</template>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			categories: [
				{ id: 'hot', name: '热门题目', icon: '🔥', path: '/question/category/hot' },
				{
					id: 'algo',
					name: '算法',
					icon: '📐',
					path: '/question/category/algo'
				},
				{
					id: 'data-structure',
					name: '数据结构',
					icon: '🧩',
					path: '/question/category/data-structure'
				},
				{
					id: 'db',
					name: '数据库',
					icon: '🗄️',
					path: '/question/category/db'
				},
				{
					id: 'system-design',
					name: '系统设计',
					icon: '🖥️',
					path: '/question/category/system-design'
				}
			],
			activeCategoryId: 'hot', // 默认选中'热门题目'
			currentChallenge: {
				title: '两数之和',
				description:
					'给定一个整数数组 nums 和一个目标值 target, 请你在该数组中找出和为目标值的两数。你的任务是返回这两个数的下标。你可以假设每种输入只会对应一个答案。但同一个元素在数组中不能重复使用。',
				difficulty: '中等',
				passRate: '78%',
				fav: false,
				id: 10001, // 假设有id
				solution: `function solve(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`,
				explanation: `本题考查哈希表的应用。遍历数组时，用哈希表记录每个数出现的位置，每次判断 target-nums[i] 是否已在哈希表中出现，若出现则返回下标。时间复杂度 O(n)。`
			},
			recommendedTopics: [
				// 原有题目
				{
					id: 1,
					title: '反转链表',
					difficulty: '中等',
					passRate: '65%',
					fav: false,
					solution: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`,
					explanation: '本题考查链表操作，使用双指针迭代反转链表。'
				},
				{
					id: 2,
					title: '有效的括号',
					difficulty: '简单',
					passRate: '82%',
					fav: true,
					solution: `function isValid(s) {\n  const stack = [];\n  const map = {')':'(', ']':'[', '}':'{'};\n  for (let c of s) {\n    if (['(','[','{'].includes(c)) stack.push(c);\n    else if (stack.pop() !== map[c]) return false;\n  }\n  return stack.length === 0;\n}`,
					explanation: '本题考查栈的应用，遇到左括号入栈，遇到右括号判断栈顶是否匹配。'
				},
				{
					id: 3,
					title: '合并两个有序链表',
					difficulty: '中等',
					passRate: '72%',
					fav: false,
					solution: `function mergeTwoLists(l1, l2) {\n  let dummy = new ListNode(-1), curr = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n    else { curr.next = l2; l2 = l2.next; }\n    curr = curr.next;\n  }\n  curr.next = l1 || l2;\n  return dummy.next;\n}`,
					explanation: '本题考查链表归并，双指针逐步合并两个有序链表。'
				},
				{
					id: 4,
					title: '二叉树的中序遍历',
					difficulty: '简单',
					passRate: '58%',
					fav: false,
					solution: `function inorderTraversal(root) {\n  const res = [], stack = [];\n  let curr = root;\n  while (curr || stack.length) {\n    while (curr) { stack.push(curr); curr = curr.left; }\n    curr = stack.pop();\n    res.push(curr.val);\n    curr = curr.right;\n  }\n  return res;\n}`,
					explanation: '本题考查二叉树遍历，使用栈模拟递归实现中序遍历。'
				},
				{
					id: 5,
					title: '最长公共前缀',
					difficulty: '简单',
					passRate: '42%',
					fav: false,
					solution: `function longestCommonPrefix(strs) {\n  if (!strs.length) return '';\n  let prefix = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (strs[i].indexOf(prefix) !== 0) {\n      prefix = prefix.slice(0, -1);\n      if (!prefix) return '';\n    }\n  }\n  return prefix;\n}`,
					explanation: '本题考查字符串处理，逐步缩短前缀直到所有字符串都包含。'
				},
				// 新增用户题目
				{
					id: 6,
					title: '请解释JavaScript中的事件冒泡和事件捕获，并说明如何阻止它们。',
					difficulty: '中等',
					passRate: '55%',
					fav: false,
					tag: 'JavaScript',
					description:
						'事件冒泡和事件捕获是JavaScript中处理DOM事件传播的两种机制。理解它们对于有效地管理和控制事件处理非常重要。',
					link: '/question/1',
					solution: `// 阻止事件冒泡\nelement.addEventListener('click', function(e) {\n  e.stopPropagation();\n});\n// 阻止默认行为\nelement.addEventListener('click', function(e) {\n  e.preventDefault();\n});`,
					explanation:
						'事件捕获是从根节点向目标节点传播，事件冒泡是从目标节点向根节点传播。可以通过e.stopPropagation()阻止冒泡或捕获，e.preventDefault()阻止默认行为。'
				},
				{
					id: 7,
					title: '如何优化MySQL中复杂查询的性能？请举例说明。',
					difficulty: '困难',
					passRate: '30%',
					fav: false,
					tag: 'MySQL',
					description:
						'当处理包含多个表连接、子查询和聚合函数的复杂查询时，MySQL的性能可能会受到影响。请分享你优化这类查询的经验和技巧。',
					link: '/question/2',
					solution: `-- 使用索引优化查询\nCREATE INDEX idx_user_id ON orders(user_id);\n-- 避免SELECT *\nSELECT id, name FROM users WHERE status = 'active';\n-- 使用EXPLAIN分析SQL\nEXPLAIN SELECT * FROM orders WHERE user_id = 123;`,
					explanation:
						'优化复杂查询可通过合理建索引、避免SELECT *、分解大查询、使用EXPLAIN分析执行计划等方式提升性能。'
				},
				{
					id: 8,
					title: 'Vue.js中computed和watch的区别是什么？何时应该使用它们？',
					difficulty: '简单',
					passRate: '80%',
					fav: false,
					tag: 'Vue.js',
					description:
						'computed和watch都是Vue.js中处理数据变化的方法，但它们有不同的应用场景。请解释它们的主要区别以及如何在实际项目中选择使用它们。',
					link: '/question/3',
					solution: `// computed\ncomputed: {\n  fullName() {\n    return this.firstName + ' ' + this.lastName;\n  }\n}\n// watch\nwatch: {\n  someProp(newVal, oldVal) {\n    // 监听变化做异步操作\n  }\n}`,
					explanation:
						'computed适合依赖响应式数据的“派生数据”，有缓存；watch适合监听数据变化后执行异步或开销较大的操作。'
				},
				{
					id: 9,
					title: 'React中setState是同步还是异步的？请说明原因。',
					difficulty: '中等',
					passRate: '65%',
					fav: false,
					tag: 'React',
					description:
						'setState在React中通常是异步的，这有助于性能优化和批量更新。请详细说明其原理。',
					link: '/question/4',
					solution: `// setState通常是异步的\nthis.setState({ count: this.state.count + 1 });\n// 若需获取最新值可用回调\nthis.setState((prev) => ({ count: prev.count + 1 }));`,
					explanation:
						'React为性能优化会批量合并多次setState，setState通常是异步的，不能立即读取到最新state。'
				},
				{
					id: 10,
					title: '请实现一个LRU缓存，并说明其原理。',
					difficulty: '困难',
					passRate: '40%',
					fav: false,
					tag: '算法',
					description: 'LRU缓存是一种常见的缓存淘汰算法，请用代码实现并解释其核心思想。',
					link: '/question/5',
					solution: `class LRUCache {\n  constructor(capacity) {\n    this.cache = new Map();\n    this.capacity = capacity;\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}`,
					explanation:
						'LRU缓存用Map实现，get时把访问的key移到末尾，put时超出容量删除最久未用的key，保证最近访问的总在末尾。'
				}
			],
			allRecommendedTopics: [], // 新增：保存所有推荐题目
			completedQuestions: 156,
			totalQuestions: 200,
			isChallengeDialogVisible: false,
			activeChallenge: null,
			userCode: '',
			isAnalysisDialogVisible: false,
			analysisContent: { title: '', answer: '', explanation: '' }
		};
	},
	computed: {
		progressPercent() {
			return Math.round((this.completedQuestions / this.totalQuestions) * 100);
		}
	},
	watch: {
		$route() {
			this.fetchDataForCategory();
		}
	},
	created() {
		this.fetchDataForCategory();
		// 初始化所有推荐题目
		this.allRecommendedTopics = [...this.recommendedTopics];
	},
	methods: {
		fetchDataForCategory() {
			const categoryId = this.$route.path.split('/').pop();
			const category = this.categories.find(c => c.id === categoryId);

			this.activeCategoryId = categoryId;

			// 只更新推荐题目，不再动 currentChallenge
			if (category) {
				this.recommendedTopics = this.recommendedTopics.map((t, i) => ({
					...t,
					title: `${category.name}推荐 #${i + 1}`
				}));
			}
		},
		// 选择一个分类
		selectCategory(category) {
			this.activeCategoryId = category.id;
			// 跳转到对应的分类页面
			if (this.$router) {
				this.$router.push(category.path);
			} else {
				alert(`模拟跳转到: ${category.name} (${category.path})`);
			}
		},
		// 开始答题
		startChallenge(challengeId) {
			let challengeInfo;
			if (challengeId !== undefined && challengeId !== null) {
				challengeInfo = this.recommendedTopics.find(
					t => String(t.id) === String(challengeId)
				);
			} else {
				challengeInfo = this.currentChallenge;
			}

			if (challengeInfo && (challengeInfo.title || challengeInfo.id)) {
				this.activeChallenge = { ...challengeInfo };
				this.userCode = `// 在这里输入你的${challengeInfo.title || '题目'}解题代码\n`;
				this.isChallengeDialogVisible = true;
			} else {
				alert('未找到题目信息');
			}
		},
		// 提交解答
		submitAnswer() {
			console.log('Submitting answer for:', this.activeChallenge.title);
			console.log('Code:', this.userCode);
			alert('代码已提交！正在判题...');
			this.isChallengeDialogVisible = false;
		},
		// 查看解析：弹窗展示解析内容（模拟）
		viewAnalysis(challengeId) {
			let challenge;
			if (challengeId !== undefined && challengeId !== null) {
				challenge = this.recommendedTopics.find(t => String(t.id) === String(challengeId));
			} else {
				challenge = this.currentChallenge;
			}
			this.analysisContent = {
				title: challenge?.title,
				answer: challenge?.solution || '暂无标准答案',
				explanation: challenge?.explanation || '暂无详细解析'
			};
			this.isAnalysisDialogVisible = true;
		},
		// 分享题目：复制链接到剪贴板
		async shareChallenge() {
			const id = this.currentChallenge.id;
			const url = `${window.location.origin}/question/${id}`;
			try {
				await navigator.clipboard.writeText(url);
				alert('题目链接已复制，可分享给好友！');
			} catch (e) {
				alert('复制失败，请手动复制链接：' + url);
			}
		},
		toggleFav(id) {
			if (id === 'current') {
				this.currentChallenge.fav = !this.currentChallenge.fav;
			} else {
				const topic = this.recommendedTopics.find(t => t.id === id);
				if (topic) topic.fav = !topic.fav;
			}
		},
		shuffleRecommended() {
			// 随机抽取5道题
			const shuffled = this.allRecommendedTopics
				.slice()
				.sort(() => Math.random() - 0.5)
				.slice(0, 5);
			this.recommendedTopics = shuffled;
		}
	}
};
</script>

<style scoped>
.challenge-layout {
	display: flex;
	min-height: 100vh;
	background: #f6f8fa;
}
.sidebar {
	width: 260px;
	background: #fff;
	border-radius: 12px;
	margin: 24px 16px 24px 24px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
	padding: 24px 16px;
	display: flex;
	flex-direction: column;
	gap: 32px;
}
.sidebar-title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 16px;
}
.category-list {
	list-style: none;
	padding: 0;
	margin: 0;
}
.category-list li {
	padding: 8px 0 8px 8px;
	font-size: 15px;
	border-radius: 6px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	transition: background 0.2s;
}
.category-list li.active,
.category-list li:hover {
	background: #e6f0ff;
	color: #1677ff;
}
.icon-hot {
	color: #1677ff;
}
.achievement-section {
	margin-top: 24px;
}
.achievement-title {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 12px;
}
.progress-bar-wrap {
	margin-bottom: 8px;
}
.progress-label {
	font-size: 13px;
	color: #888;
	margin-bottom: 4px;
}
.progress-bar {
	width: 100%;
	height: 10px;
	background: #f0f0f0;
	border-radius: 5px;
	overflow: hidden;
	margin-bottom: 4px;
}
.progress-inner {
	height: 100%;
	background: linear-gradient(90deg, #1677ff 0%, #69b1ff 100%);
	border-radius: 5px;
	transition: width 0.3s;
}
.progress-count {
	font-size: 13px;
	color: #555;
	text-align: right;
}
.streak {
	font-size: 13px;
	color: #888;
	margin-top: 8px;
}
.streak-days {
	color: #1677ff;
	font-weight: bold;
}
.main-content {
	flex: 1;
	margin: 24px 24px 24px 0;
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.today-challenge-card {
	background: linear-gradient(90deg, #1677ff 0%, #69b1ff 100%);
	color: #fff;
	border-radius: 16px;
	box-shadow: 0 2px 12px 0 rgba(22, 119, 255, 0.08);
	padding: 32px 32px 24px 32px;
	margin-bottom: 8px;
	position: relative;
}
.today-challenge-card .card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.today-challenge-card .tag {
	background: #fff;
	color: #1677ff;
	border-radius: 12px;
	padding: 2px 12px;
	font-size: 14px;
	font-weight: 600;
	margin-right: 8px;
}
.btn-fav {
	background: none;
	border: none;
	font-size: 22px;
	cursor: pointer;
	transition: transform 0.1s;
	margin-left: 8px;
}
.btn-fav.active span {
	color: #ff4d4f;
}
.card-title {
	font-size: 24px;
	font-weight: bold;
	margin: 12px 0 8px 0;
}
.card-meta {
	display: flex;
	gap: 24px;
	font-size: 15px;
	margin-bottom: 10px;
}
.card-meta .meta-item b {
	font-weight: 600;
	margin-left: 2px;
}
.card-desc {
	font-size: 15px;
	margin-bottom: 18px;
	color: #e6f7ff;
}
.card-actions {
	display: flex;
	gap: 12px;
}
.btn-primary {
	background: #fff;
	color: #1677ff;
	border: none;
	border-radius: 8px;
	padding: 8px 20px;
	font-size: 15px;
	font-weight: 600;
	cursor: pointer;
	box-shadow: 0 2px 8px 0 rgba(22, 119, 255, 0.08);
	transition:
		background 0.2s,
		color 0.2s;
}
.btn-primary:hover {
	background: #e6f0ff;
}
.btn-secondary {
	background: rgba(255, 255, 255, 0.7);
	color: #1677ff;
	border: none;
	border-radius: 8px;
	padding: 8px 16px;
	font-size: 15px;
	cursor: pointer;
	transition:
		background 0.2s,
		color 0.2s;
}
.btn-secondary:hover {
	background: #e6f0ff;
}
.recommend-section {
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
	padding: 24px 24px 8px 24px;
}
.section-title {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
}
.recommend-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.recommend-card {
	background: #f6f8fa;
	border-radius: 12px;
	box-shadow: 0 1px 4px 0 rgba(22, 119, 255, 0.04);
	padding: 18px 20px 14px 20px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	position: relative;
}
.recommend-card .card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.recommend-card .card-title {
	font-size: 18px;
	font-weight: 600;
}
.recommend-card .btn-fav {
	font-size: 20px;
}
.recommend-card .btn-fav.active span {
	color: #ff4d4f;
}
.recommend-card .card-meta {
	font-size: 14px;
	color: #888;
	gap: 18px;
	margin-bottom: 4px;
}
.recommend-card .card-actions {
	display: flex;
	gap: 10px;
}

/* 弹窗样式 */
:deep(.challenge-dialog .el-dialog__body) {
	padding: 15px 25px;
	height: 65vh;
}

.challenge-content {
	display: flex;
	gap: 24px;
	height: 100%;
}

.question-details {
	flex: 2;
	overflow-y: auto;
	padding-right: 15px;
}

.question-details h3 {
	font-size: 20px;
	margin-bottom: 12px;
	font-weight: 600;
}

.question-details .description {
	font-size: 15px;
	color: #555;
	line-height: 1.7;
	margin-bottom: 16px;
	white-space: pre-wrap; /* Preserve formatting */
}

.question-details .meta {
	font-size: 14px;
	color: #888;
}

.answer-area {
	flex: 3;
	display: flex;
	flex-direction: column;
}

.answer-area h4 {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 10px;
}

.code-editor {
	flex-grow: 1;
	width: 100%;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 12px;
	font-family: 'Courier New', Courier, monospace;
	font-size: 14px;
	line-height: 1.5;
	resize: none;
	background: #fdfdfd;
	color: #333;
}

.code-editor:focus {
	outline: none;
	border-color: #1677ff;
	box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
}

.dialog-footer .btn-primary {
	background: #1677ff;
	color: #fff;
}

.dialog-footer .btn-secondary {
	background: #f0f2f5;
	color: #555;
	border-color: #dcdfe6;
}
</style>
