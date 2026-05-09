<template>
	<div
		class="interview-notebook-container min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
	>
		<!-- 顶部导航栏 -->
		<header
			class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-all duration-300"
		>
			<div class="container mx-auto px-4 py-3 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<div
						class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md"
					>
						<i class="fa-solid fa-user-tie text-white"></i>
					</div>
					<h1 class="text-xl font-bold text-gray-800 dark:text-white">
						InterviewNotebook
					</h1>
				</div>
				<div class="flex items-center space-x-4">
					<div class="relative">
						<input
							type="text"
							placeholder="搜索面试题..."
							class="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
						/>
						<i
							class="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						></i>
					</div>
					<div class="flex items-center space-x-3">
						<button
							class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
						>
							<i class="fa-solid fa-bell"></i>
						</button>
						<div
							class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium"
						>
							JD
						</div>
					</div>
				</div>
			</div>
		</header>
		<!-- 主内容区 -->
		<main class="container mx-auto px-4 py-8">
			<!-- 欢迎横幅 -->
			<section class="mb-10">
				<div
					class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 shadow-xl"
				>
					<div
						class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"
					></div>
					<div
						class="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full transform -translate-x-1/4 translate-y-1/4"
					></div>
					<div class="relative z-10">
						<h2 class="text-3xl font-bold mb-2">欢迎回来，面试达人</h2>
						<p class="text-blue-100 mb-6">
							今天是刷面试题的好日子，让我们一起攻克高频面试题吧！
						</p>
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div
								class="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
							>
								<div class="flex items-center space-x-3">
									<div
										class="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center"
									>
										<i class="fa-solid fa-file-code text-white"></i>
									</div>
									<div>
										<p class="text-sm text-blue-100">今日新增面试题</p>
										<p class="text-xl font-bold">3</p>
									</div>
								</div>
							</div>
							<div
								class="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
							>
								<div class="flex items-center space-x-3">
									<div
										class="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center"
									>
										<i class="fa-solid fa-check-circle text-white"></i>
									</div>
									<div>
										<p class="text-sm text-blue-100">已掌握面试题</p>
										<p class="text-xl font-bold">12</p>
									</div>
								</div>
							</div>
							<div
								class="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
							>
								<div class="flex items-center space-x-3">
									<div
										class="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center"
									>
										<i class="fa-solid fa-lightbulb text-white"></i>
									</div>
									<div>
										<p class="text-sm text-blue-100">面试题掌握度</p>
										<p class="text-xl font-bold">80%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- 主要功能区 -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- 左侧：面试题分析 -->
				<div class="lg:col-span-2 space-y-8">
					<!-- 面试题检测 -->
					<section
						class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
					>
						<div class="p-6 border-b border-gray-100 dark:border-gray-700">
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
							>
								<i class="fa-solid fa-check-circle text-blue-500 mr-2"></i>
								答案自评
							</h3>
						</div>
						<div class="p-6">
							<div class="mb-6">
								<label
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>面试题内容</label
								>
								<div
									class="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
								>
									<p class="text-gray-700 dark:text-gray-300">
										{{ interviewQuestions[currentQuestionIndex].question }}
									</p>
								</div>
							</div>
							<div class="mb-6">
								<label
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>你的答案</label
								>
								<textarea
									class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
									rows="3"
									v-model="userAnswer"
								></textarea>
							</div>
							<div class="flex justify-end space-x-3">
								<button
									class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center"
									@click="prevQuestion"
								>
									上一题
								</button>
								<button
									class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
									@click="clearAnswer"
								>
									清空
								</button>
								<button
									class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center"
									@click="aiReview"
								>
									<i class="fa-solid fa-magic mr-2"></i>
									AI点评
								</button>
								<button
									class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center"
									@click="nextQuestion"
								>
									下一题
								</button>
							</div>
						</div>
					</section>
					<!-- 答案点评结果 -->
					<section
						class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
					>
						<div class="p-6 border-b border-gray-100 dark:border-gray-700">
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
							>
								<i class="fa-solid fa-search text-red-500 mr-2"></i>
								答案点评
							</h3>
						</div>
						<div class="p-6">
							<div
								class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 animate-fadeIn"
							>
								<div class="flex items-start">
									<div
										class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5"
									>
										<i class="fa-solid fa-exclamation text-white text-sm"></i>
									</div>
									<div class="ml-4">
										<h4
											class="font-semibold text-red-800 dark:text-red-300 mb-1"
										>
											表达不够完整
										</h4>
										<p class="text-red-700 dark:text-red-400">
											可以补充Proxy的实现方式，以及依赖收集的具体流程。
										</p>
									</div>
								</div>
							</div>
							<div
								class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 animate-fadeIn animation-delay-200"
							>
								<div class="flex items-start">
									<div
										class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5"
									>
										<i class="fa-solid fa-lightbulb text-white text-sm"></i>
									</div>
									<div class="ml-4">
										<h4
											class="font-semibold text-blue-800 dark:text-blue-300 mb-1"
										>
											优化建议
										</h4>
										<p class="text-blue-700 dark:text-blue-400">
											建议补充Vue3中使用Proxy实现响应式的原理，以及依赖追踪和派发更新的机制。
										</p>
									</div>
								</div>
							</div>
							<div
								class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-fadeIn animation-delay-400"
							>
								<div class="flex items-start">
									<div
										class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5"
									>
										<i class="fa-solid fa-check text-white text-sm"></i>
									</div>
									<div class="ml-4">
										<h4
											class="font-semibold text-green-800 dark:text-green-300 mb-1"
										>
											参考答案
										</h4>
										<p class="text-green-700 dark:text-green-400">
											Vue2通过Object.defineProperty实现响应式，Vue3通过Proxy实现响应式。依赖收集通过Dep和Watcher（或effect）实现，数据变化时自动通知视图更新。
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<!-- 面试题集 -->
					<section
						class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
					>
						<div
							class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center"
						>
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
							>
								<i class="fa-solid fa-book-open text-indigo-500 mr-2"></i>
								我的面试题集
							</h3>
							<button
								class="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300 text-sm flex items-center"
							>
								<i class="fa-solid fa-plus mr-1"></i>
								添加面试题
							</button>
						</div>
						<div class="p-6">
							<div class="space-y-4">
								<!-- 面试题项 1 -->
								<div
									class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
								>
									<div class="flex justify-between items-start mb-3">
										<div class="flex items-center">
											<div
												class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center"
											>
												<i
													class="fa-solid fa-times text-red-500 dark:text-red-400 text-sm"
												></i>
											</div>
											<span
												class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
												>算法</span
											>
										</div>
										<span class="text-xs text-gray-400 dark:text-gray-500"
											>2024-05-01</span
										>
									</div>
									<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
										数组去重
									</h4>
									<p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
										请实现一个函数，去除数组中的重复元素。
									</p>
									<div class="flex justify-between items-center">
										<div class="flex space-x-2">
											<button
												class="text-xs text-blue-500 hover:text-blue-700 transition-colors duration-300"
											>
												<i class="fa-solid fa-eye mr-1"></i>查看详情
											</button>
											<button
												class="text-xs text-green-500 hover:text-green-700 transition-colors duration-300"
											>
												<i class="fa-solid fa-check-circle mr-1"></i>已掌握
											</button>
										</div>
										<span
											class="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
										>
											答题不全
										</span>
									</div>
								</div>
								<!-- 面试题项 2 -->
								<div
									class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
								>
									<div class="flex justify-between items-start mb-3">
										<div class="flex items-center">
											<div
												class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center"
											>
												<i
													class="fa-solid fa-times text-red-500 dark:text-red-400 text-sm"
												></i>
											</div>
											<span
												class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
												>网络</span
											>
										</div>
										<span class="text-xs text-gray-400 dark:text-gray-500"
											>2024-04-28</span
										>
									</div>
									<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
										HTTP和HTTPS的区别
									</h4>
									<p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
										请简述HTTP和HTTPS的主要区别。
									</p>
									<div class="flex justify-between items-center">
										<div class="flex space-x-2">
											<button
												class="text-xs text-blue-500 hover:text-blue-700 transition-colors duration-300"
											>
												<i class="fa-solid fa-eye mr-1"></i>查看详情
											</button>
											<button
												class="text-xs text-green-500 hover:text-green-700 transition-colors duration-300"
											>
												<i class="fa-solid fa-check-circle mr-1"></i>已掌握
											</button>
										</div>
										<span
											class="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
										>
											理解偏差
										</span>
									</div>
								</div>
								<!-- 面试题项 3 -->
								<div
									class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
								>
									<div class="flex justify-between items-start mb-3">
										<div class="flex items-center">
											<div
												class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center"
											>
												<i
													class="fa-solid fa-times text-red-500 dark:text-red-400 text-sm"
												></i>
											</div>
											<span
												class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
												>项目</span
											>
										</div>
										<span class="text-xs text-gray-400 dark:text-gray-500"
											>2024-04-20</span
										>
									</div>
									<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
										项目难点
									</h4>
									<p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
										请介绍一个你在项目中遇到的技术难点，并说明你的解决思路。
									</p>
									<div class="flex justify-between items-center">
										<div class="flex space-x-2">
											<button
												class="text-xs text-blue-500 hover:text-blue-700 transition-colors duration-300"
											>
												<i class="fa-solid fa-eye mr-1"></i>查看详情
											</button>
											<button
												class="text-xs text-green-500 hover:text-green-700 transition-colors duration-300"
											>
												<i class="fa-solid fa-check-circle mr-1"></i>已掌握
											</button>
										</div>
										<span
											class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
										>
											表达不清
										</span>
									</div>
								</div>
							</div>
							<div class="mt-6 text-center">
								<button
									class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
								>
									查看更多
								</button>
							</div>
						</div>
					</section>
				</div>
				<!-- 右侧：数据分析与个性化组卷 -->
				<div class="space-y-8">
					<!-- 面试题掌握情况 -->
					<section
						class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
					>
						<div class="p-6 border-b border-gray-100 dark:border-gray-700">
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
							>
								<i class="fa-solid fa-chart-pie text-green-500 mr-2"></i>
								面试题掌握情况
							</h3>
						</div>
						<div class="p-6">
							<div class="mb-6">
								<div class="flex justify-between items-center mb-2">
									<span
										class="text-sm font-medium text-gray-700 dark:text-gray-300"
										>总体掌握度</span
									>
									<span class="text-sm font-bold text-green-500">80%</span>
								</div>
								<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
									<div
										class="bg-green-500 h-2.5 rounded-full"
										style="width: 80%"
									></div>
								</div>
							</div>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
										<span class="text-sm text-gray-700 dark:text-gray-300"
											>算法</span
										>
									</div>
									<div class="flex items-center">
										<span
											class="text-sm font-medium text-gray-900 dark:text-gray-100 mr-2"
											>75%</span
										>
										<div
											class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
										>
											<div
												class="bg-blue-500 h-1.5 rounded-full"
												style="width: 75%"
											></div>
										</div>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<div class="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
										<span class="text-sm text-gray-700 dark:text-gray-300"
											>项目</span
										>
									</div>
									<div class="flex items-center">
										<span
											class="text-sm font-medium text-gray-900 dark:text-gray-100 mr-2"
											>85%</span
										>
										<div
											class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
										>
											<div
												class="bg-purple-500 h-1.5 rounded-full"
												style="width: 85%"
											></div>
										</div>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
										<span class="text-sm text-gray-700 dark:text-gray-300"
											>网络</span
										>
									</div>
									<div class="flex items-center">
										<span
											class="text-sm font-medium text-gray-900 dark:text-gray-100 mr-2"
											>90%</span
										>
										<div
											class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
										>
											<div
												class="bg-green-500 h-1.5 rounded-full"
												style="width: 90%"
											></div>
										</div>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
										<span class="text-sm text-gray-700 dark:text-gray-300"
											>操作系统</span
										>
									</div>
									<div class="flex items-center">
										<span
											class="text-sm font-medium text-gray-900 dark:text-gray-100 mr-2"
											>60%</span
										>
										<div
											class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
										>
											<div
												class="bg-red-500 h-1.5 rounded-full"
												style="width: 60%"
											></div>
										</div>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
										<span class="text-sm text-gray-700 dark:text-gray-300"
											>数据库</span
										>
									</div>
									<div class="flex items-center">
										<span
											class="text-sm font-medium text-gray-900 dark:text-gray-100 mr-2"
											>70%</span
										>
										<div
											class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
										>
											<div
												class="bg-yellow-500 h-1.5 rounded-full"
												style="width: 70%"
											></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<!-- 面试建议 -->
					<section
						class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
					>
						<div class="p-6 border-b border-gray-100 dark:border-gray-700">
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
							>
								<i class="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
								面试建议
							</h3>
						</div>
						<div class="p-6">
							<div class="space-y-4">
								<div
									class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3"
								>
									<h4
										class="font-medium text-yellow-800 dark:text-yellow-300 text-sm mb-1"
									>
										算法：多练习高频题
									</h4>
									<p class="text-yellow-700 dark:text-yellow-400 text-xs">
										建议多刷LeetCode高频算法题，掌握常见解题思路。
									</p>
								</div>
								<div
									class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
								>
									<h4
										class="font-medium text-red-800 dark:text-red-300 text-sm mb-1"
									>
										项目：准备项目细节
									</h4>
									<p class="text-red-700 dark:text-red-400 text-xs">
										熟悉自己项目的技术难点和解决方案，能清晰表达。
									</p>
								</div>
								<div
									class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
								>
									<h4
										class="font-medium text-blue-800 dark:text-blue-300 text-sm mb-1"
									>
										网络：理解协议原理
									</h4>
									<p class="text-blue-700 dark:text-blue-400 text-xs">
										掌握HTTP、HTTPS、TCP/IP等网络协议的原理和区别。
									</p>
								</div>
							</div>
						</div>
					</section>
					<!-- 个性组卷 -->
					<section
						class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
					>
						<div class="p-6 border-b border-gray-100 dark:border-gray-700">
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
							>
								<i class="fa-solid fa-pencil-ruler text-purple-500 mr-2"></i>
								个性化面试题集
							</h3>
						</div>
						<div class="p-6">
							<div class="mb-6">
								<label
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>选择面试模块</label
								>
								<select
									class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
									v-model="currentSubject"
								>
									<option>前端基础测评</option>
									<option>算法能力测评</option>
									<option>数据库能力测评</option>
								</select>
							</div>
							<div class="mb-6">
								<label
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>选择难度</label
								>
								<div class="flex space-x-2">
									<button
										class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
									>
										简单
									</button>
									<button
										class="flex-1 px-3 py-2 rounded-lg border border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-300"
									>
										中等
									</button>
									<button
										class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
									>
										困难
									</button>
								</div>
							</div>
							<div class="mb-6">
								<label
									class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>面试题数量</label
								>
								<input
									type="range"
									min="5"
									max="30"
									v-model="questionCount"
									class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
								/>
								<div class="flex justify-between mt-1 items-center">
									<span class="text-xs text-gray-400">5题</span>
									<span
										class="text-lg font-bold text-purple-600 dark:text-purple-400"
										>{{ questionCount }}题</span
									>
									<span class="text-xs text-gray-400">30题</span>
								</div>
							</div>
							<button
								class="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
								@click="goToOnlineExam"
							>
								生成个性化面试题集
							</button>
						</div>
					</section>
				</div>
			</div>
		</main>
		<!-- 页脚 -->
		<footer
			class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-10"
		>
			<div class="container mx-auto px-4">
				<div class="flex flex-col md:flex-row justify-between items-center">
					<div class="flex items-center space-x-2 mb-4 md:mb-0">
						<div
							class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md"
						>
							<i class="fa-solid fa-user-tie text-white text-sm"></i>
						</div>
						<h2 class="text-lg font-bold text-gray-800 dark:text-white">
							InterviewNotebook
						</h2>
					</div>
					<div class="flex space-x-6">
						<a
							href="#"
							class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
						>
							<i class="fa-solid fa-question-circle"></i>
							<span class="ml-1">帮助</span>
						</a>
						<a
							href="#"
							class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
						>
							<i class="fa-solid fa-cog"></i>
							<span class="ml-1">设置</span>
						</a>
						<a
							href="#"
							class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
						>
							<i class="fa-solid fa-user-circle"></i>
							<span class="ml-1">账户</span>
						</a>
					</div>
				</div>
				<div
					class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400"
				>
					<p>© 2024 InterviewNotebook. 保留所有权利。</p>
				</div>
			</div>
		</footer>
		<div
			v-if="showReviewModal"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
		>
			<div
				class="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-lg relative animate-fadeIn"
			>
				<button
					class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
					@click="showReviewModal = false"
				>
					<i class="fa-solid fa-times"></i>
				</button>
				<h2
					class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center"
				>
					<i class="fa-solid fa-magic mr-2 text-blue-500"></i>AI点评
				</h2>
				<div class="mb-4">
					<h3 class="font-semibold text-gray-700 dark:text-gray-200 mb-1">你的答案</h3>
					<div
						class="bg-gray-50 dark:bg-gray-800 rounded p-3 text-gray-700 dark:text-gray-200 whitespace-pre-line"
					>
						{{ userAnswer || '（未作答）' }}
					</div>
				</div>
				<div class="mb-4">
					<h3 class="font-semibold text-blue-700 dark:text-blue-300 mb-1">点评</h3>
					<div class="text-blue-700 dark:text-blue-300">{{ reviewComment }}</div>
				</div>
				<div>
					<h3 class="font-semibold text-green-700 dark:text-green-300 mb-1">参考答案</h3>
					<div class="text-green-700 dark:text-green-300 whitespace-pre-line">
						{{ interviewQuestions[currentQuestionIndex].reference }}
					</div>
				</div>
				<div class="mt-6 text-center">
					<button
						class="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
						@click="showReviewModal = false"
					>
						关闭
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'error-notebook',
	data() {
		return {
			// 状态数据
			isDarkMode: false,
			currentSubject: '前端基础测评',
			selectedDifficulty: '中等',
			questionCount: 15,
			// 示例错题数据
			errorQuestions: [
				{
					id: 1,
					subject: '数学',
					date: '2023-05-15',
					title: '函数求值问题',
					content: '已知函数 f(x) = x² + 2x + 1，求 f(3) 的值。',
					errorType: '计算错误',
					isMastered: false
				},
				{
					id: 2,
					subject: '物理',
					date: '2023-05-12',
					title: '牛顿第二定律应用',
					content: '一个质量为2kg的物体，受到一个5N的力作用，求物体的加速度。',
					errorType: '概念错误',
					isMastered: false
				},
				{
					id: 3,
					subject: '英语',
					date: '2023-05-10',
					title: '定语从句',
					content: 'The book _____ I bought yesterday is very interesting.',
					errorType: '语法错误',
					isMastered: false
				}
			],
			// 学科掌握情况
			subjectMastery: {
				数学: 65,
				语文: 82,
				英语: 90,
				物理: 55,
				化学: 70
			},
			interviewQuestions: [
				{
					question: '请简述Vue的响应式原理。',
					reference:
						'Vue2通过Object.defineProperty实现响应式，Vue3通过Proxy实现响应式。依赖收集通过Dep和Watcher（或effect）实现，数据变化时自动通知视图更新。',
					comment:
						'答案需包含Vue2和Vue3的实现方式、依赖收集和视图更新机制。建议补充Proxy的实现和依赖追踪细节。'
				},
				{
					question: '说说你对闭包的理解，并举一个实际应用场景。',
					reference:
						'闭包是指有权访问另一个函数作用域中变量的函数。常见应用场景有：封装私有变量、实现防抖/节流、工厂函数等。',
					comment: '建议说明闭包的定义、作用及实际应用场景，举例更佳。'
				},
				{
					question: '请实现一个深拷贝函数。',
					reference:
						'function deepClone(obj) {\n  if (obj === null || typeof obj !== "object") return obj;\n  if (Array.isArray(obj)) return obj.map(deepClone);\n  const result = {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      result[key] = deepClone(obj[key]);\n    }\n  }\n  return result;\n}',
					comment: '建议写出递归处理对象和数组的代码，并考虑循环引用、函数等特殊类型。'
				},
				{
					question: '简述HTTP和HTTPS的区别。',
					reference:
						'HTTP是明文传输，安全性低；HTTPS在HTTP基础上加入SSL/TLS加密，数据传输更安全，能防止中间人攻击和数据篡改。',
					comment: '建议从传输安全性、加密方式、端口、证书等方面进行对比。'
				},
				{
					question: '说说前端性能优化的常见手段。',
					reference:
						'常见优化手段有：资源压缩与合并、懒加载、使用CDN、减少重排重绘、虚拟列表、服务端渲染、图片优化等。',
					comment: '答案需涵盖原理、实现方式和应用场景，建议分类说明并举例。'
				}
			],
			currentQuestionIndex: 0,
			userAnswer: '',
			showReviewModal: false,
			reviewComment: '',
			reviewReference: ''
		};
	},
	computed: {
		// 计算总体掌握度
		overallMastery() {
			const values = Object.values(this.subjectMastery);
			return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
		}
	},
	mounted() {
		// 初始化深色模式
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.isDarkMode = true;
			document.documentElement.classList.add('dark');
		}
	},
	methods: {
		// 切换深色/浅色模式
		toggleDarkMode() {
			this.isDarkMode = !this.isDarkMode;
			document.documentElement.classList.toggle('dark');
		},
		// 设置难度
		setDifficulty(difficulty) {
			this.selectedDifficulty = difficulty;
		},
		// 设置题目数量
		setQuestionCount(value) {
			this.questionCount = value;
		},
		// 标记为已掌握
		markAsMastered(questionId) {
			const question = this.errorQuestions.find(q => q.id === questionId);
			if (question) {
				question.isMastered = true;
			}
		},
		// 生成试卷
		generatePaper() {
			// 这里会有生成试卷的逻辑
			alert(
				`已生成${this.currentSubject}学科的${this.selectedDifficulty}难度试卷，共${this.questionCount}题`
			);
		},
		clearAnswer() {
			this.userAnswer = '';
		},
		aiReview() {
			const current = this.interviewQuestions[this.currentQuestionIndex];
			const user = this.userAnswer.replace(/\s/g, '');
			const ref = current.reference.replace(/\s/g, '');
			if (!this.userAnswer.trim()) {
				this.reviewComment = '请先填写你的答案，再进行AI点评。';
			} else if (user === ref) {
				this.reviewComment = '答案很完整，表达清晰，继续保持！';
			} else {
				this.reviewComment = current.comment;
			}
			this.reviewReference = current.reference;
			this.showReviewModal = true;
		},
		prevQuestion() {
			if (this.currentQuestionIndex > 0) {
				this.currentQuestionIndex--;
			} else {
				this.currentQuestionIndex = this.interviewQuestions.length - 1;
			}
			this.userAnswer = '';
			this.reviewComment = '';
			this.reviewReference = '';
			this.showReviewModal = false;
		},
		nextQuestion() {
			if (this.currentQuestionIndex < this.interviewQuestions.length - 1) {
				this.currentQuestionIndex++;
			} else {
				this.currentQuestionIndex = 0;
			}
			this.userAnswer = '';
			this.reviewComment = '';
			this.reviewReference = '';
			this.showReviewModal = false;
		},
		goToOnlineExam() {
			this.$router.push({
				path: '/online-exam/exam',
				query: {
					subject: this.currentSubject,
					difficulty: this.selectedDifficulty,
					count: this.questionCount
				}
			});
		}
	}
};
</script>

<style scoped>
/* 自定义动画 */
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

.animate-fadeIn {
	animation: fadeIn 0.5s ease-out forwards;
}

.animation-delay-200 {
	animation-delay: 0.2s;
}

.animation-delay-400 {
	animation-delay: 0.4s;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb {
	background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
	background: #64748b;
}
</style>
