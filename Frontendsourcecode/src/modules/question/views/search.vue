<template>
	<div class="app-container">
		<!-- <div id="particles-js" class="absolute inset-0 z-0"></div> -->
		<!-- 引入粒子效果组件 -->
		<ParticlesEffect />
		<header
			class="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
		>
			<div
				class="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center"
			>
				<div class="flex items-center mb-4 md:mb-0">
					<i class="fas fa-brain text-3xl mr-3 animate-pulse"></i>
					<h1 class="text-3xl font-bold tracking-wider">智题库</h1>
				</div>
				<p class="text-indigo-100">强化你的面试资料库，提升面试通过率</p>
			</div>
		</header>

		<main class="container mx-auto px-4 py-8 relative z-10">
			<!-- 搜索部分 -->
			<div
				class="search-container bg-white rounded-xl shadow-xl p-6 mb-8 transform hover:scale-101 transition-transform duration-300"
			>
				<h2 class="text-2xl font-bold mb-6 text-indigo-800 flex items-center">
					<i class="fas fa-search mr-2"></i>多维搜索
				</h2>

				<form @submit.prevent="performSearch" class="space-y-6">
					<!-- 关键词搜索 -->
					<div class="search-box-container">
						<div class="relative">
							<input
								type="text"
								v-model="searchKeyword"
								class="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none transition-colors duration-300"
								placeholder="输入关键词搜索（如：JavaScript闭包、React Hooks）"
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

					<!-- 高级搜索选项 -->
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
										{
											'fa-chevron-up': advancedSearchVisible,
											'fa-chevron-down': !advancedSearchVisible
										}
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

							<!-- 面试公司 -->
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

							<!-- 面试时间 -->
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>题目更新时间</label
								>
								<div class="flex space-x-4">
									<div class="flex-1">
										<label class="block text-xs text-gray-500 mb-1">从</label>
										<input
											type="date"
											v-model="dateFrom"
											class="w-full p-2 border border-gray-300 rounded-md"
										/>
									</div>
									<div class="flex-1">
										<label class="block text-xs text-gray-500 mb-1">至</label>
										<input
											type="date"
											v-model="dateTo"
											class="w-full p-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<!-- 搜索历史 -->
			<div class="search-history bg-white rounded-xl shadow-lg p-6 mb-8">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-bold text-indigo-800">最近搜索</h2>
					<button
						@click="clearSearchHistory"
						class="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200"
					>
						<i class="fas fa-trash-alt mr-1"></i>清空
					</button>
				</div>
				<div v-if="searchHistory.length" class="flex flex-wrap gap-2">
					<div
						v-for="(item, index) in searchHistory"
						:key="index"
						class="history-tag px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
						@click="applyHistory(item)"
					>
						{{ item.keyword }}
					</div>
				</div>
				<div v-else class="flex flex-wrap gap-2">
					<span class="text-gray-500 text-sm italic">暂无搜索历史</span>
				</div>
			</div>

			<!-- 搜索结果 -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold text-indigo-800">
						{{ searchKeyword ? '搜索结果' : '今日推荐' }}
					</h2>
					<div class="flex items-center">
						<span class="text-sm text-gray-600 mr-2">排序方式:</span>
						<select
							v-model="sortOption"
							class="text-sm border border-gray-300 rounded-md p-1"
						>
							<option value="relevance">相关度</option>
							<option value="newest">最新优先</option>
							<option value="difficulty_asc">难度从低到高</option>
							<option value="difficulty_desc">难度从高到低</option>
						</select>
					</div>
				</div>

				<!-- 无关键词时显示推荐或历史 -->

				<div v-if="!searchKeyword.trim()">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div
							v-for="(recommendation, index) in sortedRecommendedQuestions"
							:key="index"
							class="result-card bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
							@click="openModal(recommendation)"
						>
							<!-- 添加左侧装饰条 -->
							<div
								class="absolute left-0 top-0 bottom-0 w-1.5"
								:class="recommendation.difficultyClass + '-border'"
							></div>
							<div class="flex justify-between items-start mb-4">
								<h3 class="text-xl font-bold text-indigo-900">
									{{ recommendation.title }}
								</h3>
								<div :class="['difficulty-badge', recommendation.difficultyClass]">
									{{ recommendation.difficultyText.text }}
								</div>
							</div>
							<p class="text-gray-700 mb-4 line-clamp-2">
								{{ recommendation.description }}
							</p>
							<div v-if="recommendation.codeSnippet" class="mb-4">
								<div
									class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto"
								>
									<pre><code>{{ recommendation.codeSnippet }}</code></pre>
								</div>
							</div>
							<div class="tags flex flex-wrap gap-2 mb-4">
								<span
									v-for="(tag, tagIndex) in recommendation.tags"
									:key="tagIndex"
									class="tag-badge"
								>
									{{ tag }}
								</span>
							</div>
							<div class="flex justify-between items-center text-sm text-gray-500">
								<div>
									<i class="fas fa-building mr-1"></i>{{ recommendation.company }}
								</div>
								<div>
									<i class="fas fa-calendar mr-1"></i>{{ recommendation.date }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div
						v-for="n in 3"
						:key="n"
						class="animate-pulse bg-white rounded-lg shadow-md p-5"
					>
						<div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
						<div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
						<div class="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
						<div class="h-8 bg-gray-200 rounded w-1/3"></div>
					</div>
				</div>
				<!-- 搜索结果列表 -->
				<div
					v-else-if="searchResults.length"
					id="resultsContainer"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<div
						v-for="(result, index) in sortedResults"
						:key="index"
						class="result-card bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
						@click="openModal(result)"
					>
						<!-- 添加左侧装饰条 -->
						<div
							class="absolute left-0 top-0 bottom-0 w-1.5"
							:class="result.difficultyClass + '-border'"
						></div>
						<div class="flex justify-between items-start mb-4">
							<h3 class="text-xl font-bold text-indigo-900">{{ result.title }}</h3>
							<div :class="['difficulty-badge', result.difficultyClass]">
								{{ result.difficultyText.text }}
							</div>
						</div>
						<p class="text-gray-700 mb-4 line-clamp-2">{{ result.description }}</p>
						<div v-if="result.codeSnippet" class="mb-4">
							<div
								class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto"
							>
								<pre><code>{{ result.codeSnippet }}</code></pre>
							</div>
						</div>
						<div class="tags flex flex-wrap gap-2 mb-4">
							<span
								v-for="(tag, tagIndex) in result.tags"
								:key="tagIndex"
								class="tag-badge"
							>
								{{ tag }}
							</span>
						</div>

						<div class="flex justify-between items-center text-sm text-gray-500">
							<div><i class="fas fa-building mr-1"></i>{{ result.company }}</div>
							<div><i class="fas fa-calendar mr-1"></i>{{ result.date }}</div>
						</div>
					</div>
				</div>
				<div
					v-else-if="searchKeyword.trim() && !searchResults.length"
					class="text-center py-12"
				>
					<i class="fas fa-search text-4xl text-indigo-300 mb-4"></i>
					<p class="text-gray-500">未找到相关题目</p>
					<p class="text-gray-500">尝试调整搜索条件或减少筛选项</p>
				</div>

				<!--  <div v-else class="text-center py-12">
			<i class="fas fa-search text-4xl text-indigo-300 mb-4"></i>
			<p class="text-gray-500">请输入搜索关键词查找面试题目</p>
		  </div>  -->

				<!-- 分页控制 -->
				<div
					v-if="searchKeyword.trim() && searchResults.length"
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
			</div>

			<!-- 随机推荐 -->
			<div class="random-recommendation bg-white rounded-xl shadow-lg p-6 mb-8">
				<h2 class="text-2xl font-bold mb-6 text-indigo-800 flex items-center">
					<i class="fas fa-random mr-2"></i>今日精选题目
				</h2>
				<div
					class="recommendation-card bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100"
				>
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-xl font-bold text-indigo-900">
							{{ featuredQuestion.title }}
						</h3>
						<div :class="['difficulty-badge', featuredQuestion.difficultyClass]">
							{{ featuredQuestion.difficultyText }}
						</div>
					</div>
					<p class="text-gray-700 mb-4">{{ featuredQuestion.description }}</p>
					<div class="mb-4">
						<div
							class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto"
						>
							<pre
								v-if="featuredQuestion.codeSnippet"
							><code>{{ featuredQuestion.codeSnippet }}</code></pre>
						</div>
					</div>
					<div class="tags flex flex-wrap gap-2 mb-4">
						<span
							v-for="(tag, index) in featuredQuestion.tags"
							:key="index"
							class="tag-badge"
						>
							{{ tag }}
						</span>
					</div>
					<div class="flex justify-between items-center">
						<div class="text-sm text-gray-500">
							<i class="fas fa-building mr-1"></i>{{ featuredQuestion.company }}
						</div>
						<button
							@click="getRandomQuestion"
							class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
						>
							<i class="fas fa-dice mr-2"></i>
							换一题
						</button>
					</div>
				</div>
			</div>
		</main>

	
		<PageFooter/>

		<!-- 模态框 -->
		<div v-if="modalVisible" class="modal fixed inset-0 z-50 flex items-center justify-center">
			<!-- ... 模态框背景 ... -->

			<div
				class="modal-backdrop fixed inset-0 bg-black bg-opacity-50"
				@click="closeModal"
			></div>
			<div
				:class="[
					'modal-content bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 transform transition-transform duration-300',
					{ 'scale-95 opacity-0': !modalActive, 'scale-100 opacity-100': modalActive }
				]"
			>
				<div class="p-6">
					<div class="flex justify-between items-start mb-4">
						<h2 class="text-2xl font-bold text-indigo-900">详细题目信息</h2>
						<div class="flex items-center space-x-2">
							<!-- 添加收藏和分享按钮 -->
							<button
								@click="toggleFavorite"
								:class="['favorite-btn', { favorited: isFavorited }]"
							>
								<i
									:class="[
										'fas',
										isFavorited
											? 'fa-heart text-red-500'
											: 'fa-heart text-gray-400'
									]"
								></i>
								<span class="ml-1">{{ isFavorited ? '已收藏' : '收藏' }}</span>
							</button>
							<button @click="shareQuestion" class="share-btn">
								<i class="fas fa-share-alt text-blue-500"></i>
								<span class="ml-1">分享</span>
							</button>
							<button @click="closeModal" class="text-gray-500 hover:text-gray-700">
								<i class="fas fa-times text-xl"></i>
							</button>
						</div>
					</div>
					<div class="modal-body">
						<div class="flex justify-between items-start mb-6">
							<h3 class="text-2xl font-bold text-gray-800">
								{{ currentQuestion.title }}
							</h3>
							<div
								:class="[
									'difficulty-badge',
									currentQuestion.difficultyClass,
									'px-3',
									'py-1',
									'rounded-full',
									'text-white',
									'font-medium'
								]"
							>
								{{ currentQuestion.difficultyText.text }}
							</div>
						</div>

						<div class="mb-6">
							<h4 class="text-lg font-semibold text-gray-700 mb-3">问题描述</h4>
							<p class="text-gray-700 mb-4">{{ currentQuestion.description }}</p>

							<h4 class="text-lg font-semibold text-gray-700 mb-3">参考答案</h4>
							<div
								class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4"
							>
								<pre><code>{{ currentQuestion.codeExample }}</code></pre>
							</div>
							<!-- 	<div v-if="showSolution" class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
           <pre><code>{{ currentQuestion.codeExample }}</code></pre>
             </div> -->

							<div class="mb-6">
								<h4 class="text-lg font-semibold text-gray-700 mb-3">解题思路</h4>
								<p class="text-gray-700 mb-3">{{ currentQuestion.explanation }}</p>
								<ul class="list-disc pl-5 text-gray-700 space-y-2">
									<li
										v-for="(point, index) in currentQuestion.keyPoints"
										:key="index"
									>
										{{ point }}
									</li>
								</ul>
							</div>
						</div>

						<div class="flex flex-wrap gap-2 mb-6">
							<span
								v-for="(tag, index) in currentQuestion.tags"
								:key="index"
								class="tag-badge"
							>
								{{ tag }}
							</span>
						</div>

						<div
							class="flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4"
						>
							<div>
								<i class="fas fa-building mr-2"></i>公司:
								{{ currentQuestion.company }}
							</div>
							<div>
								<i class="fas fa-calendar mr-2"></i>更新日期:
								{{ currentQuestion.date }}
							</div>
							<div>
								<i class="fas fa-chart-line mr-2"></i>热度:
								{{ currentQuestion.popularity }}%
							</div>
						</div>
					</div>
				</div>
				<!-- 收藏提示 -->
				<div
					v-if="showFavoriteToast"
					class="favorite-toast fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
				>
					<i class="fas fa-check-circle mr-2"></i>
					已添加到收藏夹！
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, reactive, computed, onMounted, nextTick, watch } from 'vue';

import ParticlesEffect from './ParticlesEffect.vue';
import PageFooter from '/@/components/PageFooter.vue'
import { addPracticeRecord } from '../utils/practiceRecord';
// 模拟面试题数据库
const MOCK_QUESTIONS = [
	{
		id: 1,
		title: '实现一个防抖函数',
		content:
			'请实现一个防抖函数，该函数会在延迟一定时间后才执行回调，如果在延迟时间内再次调用，则重新计时。',
		difficulty: 3,
		tags: ['JavaScript', '函数式编程', '性能优化'],
		company: 'bytedance',
		companyName: '字节跳动',
		updateDate: '2025-04-10',
		codeExample: `function debounce(fn, delay) {
  // 请实现此函数
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}`
	},
	{
		id: 2,
		title: '手写Promise.all实现',
		content:
			'实现一个Promise.all函数，接收一个Promise数组，当所有Promise都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '异步编程'],
		company: 'alibaba',
		companyName: '阿里巴巴',
		updateDate: '2025-03-15',
		codeExample: `function promiseAll(promises) {
  // 请实现此函数
}`
	},
	{
		id: 3,
		title: '实现React useState Hook',
		content: '请实现一个简化版的React useState Hook，需要支持基本的状态更新功能。',
		difficulty: 4,
		tags: ['React', 'Hooks', '状态管理'],
		company: 'tencent',
		companyName: '腾讯',
		updateDate: '2025-04-20',
		codeExample: `function useState(initialValue) {
  // 请实现此函数
}`
	},
	{
		id: 4,
		title: '二叉树的最大深度',
		content:
			'编写一个函数来计算二叉树的最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。',
		difficulty: 2,
		tags: ['算法', '二叉树', '递归'],
		company: 'google',
		companyName: 'Google',
		updateDate: '2025-02-28',
		codeExample: `function maxDepth(root) {
  // 请实现此函数
}`
	},
	{
		id: 5,
		title: 'Vue响应式原理实现',
		content: '请简要实现Vue 2.x中的响应式系统核心原理，包括Observer、Dep和Watcher三个部分。',
		difficulty: 5,
		tags: ['Vue', '响应式编程', '设计模式'],
		company: 'meituan',
		companyName: '美团',
		updateDate: '2025-03-22',
		codeExample: `class Observer {
  // 请实现此类
}

class Dep {
  // 请实现此类
}

class Watcher {
  // 请实现此类
}`
	},
	{
		id: 6,
		title: '实现一个简易版的Redux',
		content:
			'编写一个极简版的Redux，实现createStore函数，支持getState、dispatch和subscribe方法。',
		difficulty: 4,
		tags: ['React', 'Redux', '状态管理'],
		company: 'jd',
		companyName: '京东',
		updateDate: '2025-01-15',
		codeExample: `function createStore(reducer) {
  // 请实现此函数
}`
	},
	{
		id: 7,
		title: '实现快速排序算法',
		content: '请实现快速排序算法，并分析其时间复杂度和空间复杂度。',
		difficulty: 3,
		tags: ['算法', '排序', '分治'],
		company: 'baidu',
		companyName: '百度',
		updateDate: '2025-04-05',
		codeExample: `function quickSort(arr) {
  // 请实现此函数
}`
	},
	{
		id: 8,
		title: '设计LRU缓存结构',
		content: '请设计并实现一个LRU(最近最少使用)缓存机制，要求在O(1)时间内完成get和put操作。',
		difficulty: 4,
		tags: ['算法', '数据结构', '缓存'],
		company: 'microsoft',
		companyName: '微软',
		updateDate: '2025-02-10',
		codeExample: `class LRUCache {
  // 请实现此类
}`
	},
	{
		id: 9,
		title: '深拷贝函数实现',
		content: '实现一个深拷贝函数，要求可以处理对象、数组、函数以及循环引用等场景。',
		difficulty: 3,
		tags: ['JavaScript', '对象处理', '递归'],
		company: 'bytedance',
		companyName: '字节跳动',
		updateDate: '2025-03-01',
		codeExample: `function deepClone(obj) {
  // 请实现此函数
}`
	},
	{
		id: 10,
		title: '实现简单的虚拟DOM和diff算法',
		content: '请实现一个简化版的虚拟DOM和diff算法，能够计算出两棵虚拟DOM树之间的最小变化。',
		difficulty: 5,
		tags: ['JavaScript', '虚拟DOM', '框架原理'],
		company: 'alibaba',
		companyName: '阿里巴巴',
		updateDate: '2025-04-15',
		codeExample: `function createElement(type, props, ...children) {
  // 请实现此函数
}

function diff(oldVNode, newVNode) {
  // 请实现此函数
}`
	},
	{
		id: 11,
		title: '实现事件委托机制',
		content: '请实现一个事件委托函数，可以为目标元素的所有子元素代理指定的事件。',
		difficulty: 2,
		tags: ['JavaScript', 'DOM', '事件处理'],
		company: 'tencent',
		companyName: '腾讯',
		updateDate: '2025-02-20',
		codeExample: `function delegate(parent, eventType, selector, fn) {
  // 请实现此函数
}`
	},
	{
		id: 12,
		title: '手写JSONP实现跨域请求',
		content: '请实现一个JSONP函数，用于解决跨域请求问题。',
		difficulty: 2,
		tags: ['JavaScript', '网络', '跨域'],
		company: 'jd',
		companyName: '京东',
		updateDate: '2025-01-25',
		codeExample: `function jsonp(url, callback) {
  // 请实现此函数
}`
	},
	{
		id: 13,
		title: '编写一个节流函数',
		content: '实现一个节流函数，确保函数在指定时间内最多执行一次。',
		difficulty: 3,
		tags: ['JavaScript', '性能优化', '函数式编程'],
		company: 'bytedance',
		companyName: '字节跳动',
		updateDate: '2025-02-05',
		codeExample: `function throttle(fn, interval) {
  // 请实现此函数
}`
	},
	{
		id: 14,
		title: '实现一个发布订阅模式',
		content: '请实现一个事件发布订阅系统，支持on, emit, off和once方法。',
		difficulty: 3,
		tags: ['JavaScript', '设计模式', '事件系统'],
		company: 'baidu',
		companyName: '百度',
		updateDate: '2025-03-12',
		codeExample: `class EventEmitter {
  // 请实现此类
}`
	},
	{
		id: 15,
		title: '实现一个异步任务调度器',
		content:
			'实现一个异步任务调度器，控制同时运行的任务数量，超出数量的任务需要等待之前的任务完成。',
		difficulty: 4,
		tags: ['JavaScript', '异步编程', '任务调度'],
		company: 'alibaba',
		companyName: '阿里巴巴',
		updateDate: '2025-01-10',
		codeExample: `class Scheduler {
  // 请实现此类
}`
	}
];

//等级颜色映射
const DIFFICULTY_COLOR_MAP = {
	1: 'text-green-600',
	2: 'text-green-500',
	3: 'text-yellow-500',
	4: 'text-orange-500',
	5: 'text-red-600',
	easy: 'text-green-600',
	medium: 'text-yellow-500',
	hard: 'text-red-600'
};
// 定义公司名称映射
const COMPANY_MAP = {
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

// 搜索结果每页显示数量
// 搜索结果每页显示数量
const ITEMS_PER_PAGE = 6;

// 难度等级文本映射
const DIFFICULTY_MAP = {
	1: { text: '入门级', className: 'easy' },
	2: { text: '初级', className: 'easy' },
	3: { text: '中等难度', className: 'medium' },
	4: { text: '高级', className: 'hard' },
	5: { text: '专家级', className: 'expert' }
};

// 搜索历史最大存储数量
const MAX_HISTORY_ITEMS = 10;

export default {
	components: {
		ParticlesEffect,
		PageFooter,
	},
	name: 'InterviewQuestionBank',
	setup() {
		// 使用常量初始化响应式数据
		const itemsPerPage = ref(ITEMS_PER_PAGE);
		// 添加收藏相关状态
		const isFavorited = ref(false);
		const showFavoriteToast = ref(false);

		// 新增：收藏和取消收藏操作
		function addToCollection(question) {
			let collection = JSON.parse(localStorage.getItem('questionCollection') || '[]');
			if (!collection.find(q => q.id === question.id)) {
				collection.push(question);
				localStorage.setItem('questionCollection', JSON.stringify(collection));
			}
		}
		function removeFromCollection(id) {
			let collection = JSON.parse(localStorage.getItem('questionCollection') || '[]');
			collection = collection.filter(q => q.id !== id);
			localStorage.setItem('questionCollection', JSON.stringify(collection));
		}

		// 响应式数据
		const searchKeyword = ref('');
		const difficultyLevel = ref(3);
		const selectedTags = ref([]);
		const tags = ref([
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
		const companies = ref([
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
		// 推荐题目（从模拟数据中选取，可自定义数量和排序）
		const recommendedQuestions = computed(() => {
			// 随机选取6道题目作为推荐（可调整数量）
			const allQuestions = [...questions];
			// 随机排序
			allQuestions.sort(() => Math.random() - 0.5);
			return allQuestions.slice(0, 6);
		});

		const selectedCompany = ref('');
		const dateFrom = ref('2024-10-06');
		const dateTo = ref('2025-02-06');
		const advancedSearchVisible = ref(true);
		const sortOption = ref('relevance');
		const searchHistory = ref([]);
		const loading = ref(false);
		const searchResults = ref([]);
		const currentPage = ref(1);
		//   const itemsPerPage = ref(9);
		const featuredQuestion = ref({});
		const modalVisible = ref(false);
		const modalActive = ref(false);
		const currentQuestion = ref({});
		const showSolution = ref(false);

		const questions = MOCK_QUESTIONS.map(q => ({
			...q,
			description: q.content, // 将content映射到description
			date: q.updateDate, // 将updateDate映射到date
			company: COMPANY_MAP[q.company] || q.company,
			difficultyText: DIFFICULTY_MAP[q.difficulty] || q.difficulty,
			difficultyClass: DIFFICULTY_MAP[q.difficulty]?.className || '', // 添加className
			difficultyClass: DIFFICULTY_MAP[q.difficulty]?.className || ''
		}));

		// 计算属性
		const difficultyText = computed(() => DIFFICULTY_MAP[difficultyLevel.value]);

		const difficultyClass = computed(() => DIFFICULTY_COLOR_MAP[difficultyLevel.value]);

		const totalPages = computed(() => {
			return Math.ceil(searchResults.value.length / ITEMS_PER_PAGE);
		});
		const visiblePages = computed(() => {
			const pages = [];
			const startPage = Math.max(1, currentPage.value - 2);
			const endPage = Math.min(totalPages.value, startPage + 4);

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			return pages;
		});

		//监视搜索结果
		watch(searchKeyword, newVal => {
			if (!newVal.trim()) {
				// 当搜索关键词清空时，清空搜索结果
				searchResults.value = [];
			}
		});
		//推荐内容的逻辑排序

		const sortedRecommendedQuestions = computed(() => {
			let results = [...recommendedQuestions.value];

			switch (sortOption.value) {
				case 'newest':
					return results.sort((a, b) => new Date(b.date) - new Date(a.date));
				case 'difficulty_asc':
					return results.sort((a, b) => a.difficulty - b.difficulty);
				case 'difficulty_desc':
					return results.sort((a, b) => b.difficulty - a.difficulty);
				default: // relevance
					return results;
			}
		});

		// 搜索结果的逻辑排序
		const sortedResults = computed(() => {
			// 先处理排序，再分页
			let results = [...searchResults.value];

			// 排序逻辑
			switch (sortOption.value) {
				case 'newest':
					results.sort((a, b) => new Date(b.date) - new Date(a.date));
					break;
				case 'difficulty_asc':
					// 使用数值排序而非文本
					results.sort((a, b) => a.difficulty - b.difficulty);
					break;
				case 'difficulty_desc':
					results.sort((a, b) => b.difficulty - a.difficulty);
					break;
				default: // relevance
					// 保持原顺序（搜索返回的顺序）
					break;
			}

			// 分页处理
			const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
			const end = start + ITEMS_PER_PAGE;
			return results.slice(start, end);
		});

		// 方法

		const toggleAdvancedSearch = () => {
			advancedSearchVisible.value = !advancedSearchVisible.value;
		};

		const toggleTag = tag => {
			if (selectedTags.value.includes(tag)) {
				selectedTags.value = selectedTags.value.filter(t => t !== tag);
			} else {
				selectedTags.value.push(tag);
			}
		};

		const addCustomTag = () => {
			const tag = customTagInput.value.trim();
			if (tag && !tags.value.includes(tag)) {
				tags.value.push(tag);
			}
			customTagInput.value = '';
		};

		const performSearch = () => {
			if (!searchKeyword.value.trim()) return;

			loading.value = true;
			searchResults.value = [];

			saveToHistory();

			setTimeout(() => {
				searchResults.value = filterQuestions();
				currentPage.value = 1;
				loading.value = false;
			}, 800);
		};

		const filterQuestions = () => {
			const keyword = searchKeyword.value.toLowerCase();

			return questions.filter(question => {
				const titleMatch = question.title.toLowerCase().includes(keyword);
				const descMatch = question.description.toLowerCase().includes(keyword);
				const tagsMatch = question.tags.some(tag => tag.toLowerCase().includes(keyword));

				const selectedTagsMatch =
					selectedTags.value.length === 0 ||
					selectedTags.value.every(tag => question.tags.includes(tag));

				const companyMatch =
					!selectedCompany.value ||
					question.company.toLowerCase().includes(selectedCompany.value);

				return (titleMatch || descMatch || tagsMatch) && selectedTagsMatch && companyMatch;
			});
		};

		const saveToHistory = () => {
			const historyItem = {
				keyword: searchKeyword.value,
				date: new Date().toISOString(),
				filters: {
					difficulty: difficultyLevel.value,
					tags: [...selectedTags.value],
					company: selectedCompany.value
				}
			};

			searchHistory.value = [
				historyItem,
				...searchHistory.value.slice(0, MAX_HISTORY_ITEMS - 1)
			];
			localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
		};

		const clearSearchHistory = () => {
			searchHistory.value = [];
			localStorage.removeItem('searchHistory');
		};

		const applyHistory = item => {
			searchKeyword.value = item.keyword;
			difficultyLevel.value = item.filters.difficulty;
			selectedTags.value = [...item.filters.tags];
			selectedCompany.value = item.filters.company;
			performSearch();
		};

		const changePage = page => {
			if (page < 1 || page > totalPages.value) return;
			currentPage.value = page;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};

		const getRandomQuestion = () => {
			const randomIndex = Math.floor(Math.random() * MOCK_QUESTIONS.length);
			const q = MOCK_QUESTIONS[randomIndex];

			// 获取难度映射
			const difficultyInfo = DIFFICULTY_MAP[q.difficulty] || {
				text: `难度${q.difficulty}`,
				className: 'medium'
			};
			featuredQuestion.value = {
				...q,
				description: q.content, // 将content映射到description
				date: q.updateDate, // 将updateDate映射到date
				company: COMPANY_MAP[q.company] || q.company,
				difficultyText: difficultyInfo.text, // 只使用文本部分
				difficultyClass: difficultyInfo.className, // 使用类名部分
				codeSnippet: q.codeExample
			};
		};

		const toggleFavorite = () => {
			isFavorited.value = !isFavorited.value;
			if (isFavorited.value) {
				addToCollection(currentQuestion.value); // 收藏时存入localStorage
				showFavoriteToast.value = true;
				setTimeout(() => {
					showFavoriteToast.value = false;
				}, 2000);
			} else {
				removeFromCollection(currentQuestion.value.id); // 取消收藏时移除
			}
		};

		const shareQuestion = () => {
			alert('分享功能待实现');
		};
		const openModal = question => {
			// 重置收藏状态
			isFavorited.value = false;
			// 生成随机热度值（60-99%）
			const randomPopularity = Math.floor(Math.random() * 40) + 60;
			currentQuestion.value = {
				...question,
				description: question.content, // 将content映射到description
				date: question.updateDate, // 将updateDate映射到date
				company: COMPANY_MAP[question.company] || question.company,
				difficultyText: DIFFICULTY_MAP[question.difficulty] || question.difficulty,
				// 添加随机热度值
				popularity: randomPopularity
			};
			modalVisible.value = true;
			showSolution.value = false;
			addPracticeRecord({
				id: question.id,
				title: question.title,
				source: 'search',
				status: 'viewed'
			});

			nextTick(() => {
				modalActive.value = true;
			});
		};

		const closeModal = () => {
			modalActive.value = false;
			setTimeout(() => {
				modalVisible.value = false;
			}, 300);
		};

		// 初始化
		onMounted(() => {
			getRandomQuestion();

			const savedHistory = localStorage.getItem('searchHistory');
			if (savedHistory) {
				searchHistory.value = JSON.parse(savedHistory);
			}
		});

		// 暴露给模板
		return {
			recommendedQuestions,
			searchKeyword,
			difficultyLevel,
			selectedTags,
			isFavorited,
			showFavoriteToast,
			toggleFavorite,
			shareQuestion,
			tags,
			customTagInput,
			companies,
			selectedCompany,
			dateFrom,
			dateTo,
			advancedSearchVisible,
			sortOption,
			sortedRecommendedQuestions,
			searchHistory,
			loading,
			searchResults,
			currentPage,
			featuredQuestion,
			modalVisible,
			modalActive,
			currentQuestion,
			difficultyText,
			difficultyClass,
			totalPages,
			visiblePages,
			sortedResults,
			toggleAdvancedSearch,
			toggleTag,
			addCustomTag,
			performSearch,
			showSolution,
			clearSearchHistory,
			applyHistory,
			changePage,
			getRandomQuestion,
			openModal,
			closeModal
		};
	}
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.loli.net/css2?family=ZCOOL+XiaoWei&family=ZCOOL+KuaiLe&display=swap');
@import '/@/assets/styles/search.css';

/* 左侧装饰条样式 */
.absolute {
	position: absolute;
}

.left-0 {
	left: 0;
}

.top-0 {
	top: 0;
}

.bottom-0 {
	bottom: 0;
}

.w-1\.5 {
	width: 0.375rem; /* 6px */
}

/* 难度颜色类 - 添加边框阴影效果 */
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

/* 确保卡片内容有足够左边距 */
.result-card {
	padding-left: 1.5rem; /* 24px */
}

.favorite-btn,
.share-btn {
	@apply flex items-center px-3 py-1 rounded-full text-sm transition-colors duration-200;
	border: 1px solid #e5e7eb;
	background-color: #f9fafb;
}

.favorite-btn:hover {
	@apply bg-red-50 border-red-100;
}

.favorite-btn.favorited {
	@apply border-red-200 bg-red-50;
}

.share-btn:hover {
	@apply bg-blue-50 border-blue-100;
}

.favorite-toast {
	animation:
		slideIn 0.3s,
		fadeOut 0.5s 1.5s forwards;
	z-index: 100;
}

@keyframes slideIn {
	from {
		transform: translateY(20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

@keyframes fadeOut {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
</style>
