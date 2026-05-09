<template>
	<div class="font-inter bg-gray-50 text-dark">
		<!-- 导航栏 -->
		<header class="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
			<div class="container mx-auto px-4 py-3 flex items-center justify-between">
				<!-- 顶部导航栏内容全部删除，仅保留空白结构 -->
			</div>
		</header>

		<main class="container mx-auto px-4 py-8">
			<!-- 用户信息和总览 -->
			<section class="mb-10">
				<div
					class="bg-gradient-to-r from-[#232526] to-[#414345] rounded-2xl shadow-lg p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between"
				>
					<div class="flex items-center mb-4 md:mb-0">
						<img
							:src="user.info?.headImg || '../../../assets/img/img-4.png'"
							alt="用户头像"
							class="w-20 h-20 rounded-full object-cover border-4 border-white/20"
						/>
						<div class="ml-4">
							<h2 class="text-[clamp(1.5rem,3vw,2rem)] font-bold">
								{{ user.info?.nickName || '乐小面' }}
							</h2>
							<p class="text-white/80">资深前端开发工程师</p>
							<div class="flex items-center mt-2">
								<span class="bg-white/20 px-3 py-1 rounded-full text-sm mr-2"
									>已完成 42 道题</span
								>
								<span class="bg-white/20 px-3 py-1 rounded-full text-sm"
									>获得 16 个成就</span
								>
							</div>
						</div>
					</div>
					<!-- 成就统计图表插入此处 -->
					<div class="flex flex-col items-center justify-center mx-8">
						<div class="relative w-24 h-24 flex items-center justify-center">
							<svg width="96" height="96">
								<circle
									cx="48"
									cy="48"
									r="42"
									stroke="#f3f4f6"
									stroke-width="10"
									fill="none"
								/>
								<circle
									cx="48"
									cy="48"
									r="42"
									:stroke="'#67c23a'"
									stroke-width="10"
									fill="none"
									:stroke-dasharray="2 * Math.PI * 42"
									:stroke-dashoffset="
										2 * Math.PI * 42 * (1 - completedPercent / 100)
									"
									stroke-linecap="round"
									style="transition: stroke-dashoffset 0.6s"
								/>
							</svg>
							<div class="absolute inset-0 flex flex-col items-center justify-center">
								<span class="text-2xl font-bold text-green-400"
									>{{ completedPercent }}%</span
								>
								<span class="text-xs text-gray-200 mt-1">成就完成率</span>
							</div>
						</div>
						<div class="text-sm text-gray-200 mt-2">
							已完成 {{ completedCount }} / {{ totalCount }}
						</div>
					</div>
					<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
							<p class="text-sm text-white/80 mb-1">总积分</p>
							<p class="text-2xl font-bold">2,450</p>
						</div>
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
							<p class="text-sm text-white/80 mb-1">已解锁徽章</p>
							<p class="text-2xl font-bold">8/24</p>
						</div>
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
							<p class="text-sm text-white/80 mb-1">连续学习</p>
							<p class="text-2xl font-bold">12 天</p>
						</div>
						<div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
							<p class="text-sm text-white/80 mb-1">排名</p>
							<p class="text-2xl font-bold">Top 5%</p>
						</div>
					</div>
				</div>
			</section>
			<!-- 统计图表卡片原位置删除 -->
			<!-- 筛选/搜索/Tab卡片 -->
			<div
				class="bg-white rounded-2xl shadow flex flex-wrap items-center gap-4 px-8 py-4 mb-8"
			>
				<input
					v-model="searchKeyword"
					placeholder="搜索成就/描述"
					class="border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition w-56"
				/>
				<button
					@click="onSearch"
					class="px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition"
				>
					搜索
				</button>
				<select
					v-model="tagFilter"
					class="border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none transition"
				>
					<option value="">全部标签</option>
					<option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
				</select>
				<div class="flex gap-2 ml-2">
					<button
						v-for="tab in [
							{ k: 'all', n: '全部' },
							{ k: 'completed', n: '已完成' },
							{ k: 'inProgress', n: '进行中' },
							{ k: 'notStarted', n: '未开始' }
						]"
						:key="tab.k"
						:class="
							activeTab === tab.k
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 text-gray-600'
						"
						class="px-4 py-2 rounded-full font-bold transition"
						@click="activeTab = tab.k"
					>
						{{ tab.n }}
					</button>
				</div>
				<div class="flex gap-2 ml-auto">
					<select v-model="sortKey" class="border border-gray-200 rounded px-3 py-2">
						<option value="progress">进度</option>
						<option value="points">积分</option>
						<option value="acquiredDate">获得时间</option>
					</select>
					<button
						@click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
						class="px-3 py-2 border border-gray-200 rounded bg-gray-50 hover:bg-gray-100 transition"
					>
						{{ sortOrder === 'desc' ? '↓' : '↑' }}
					</button>
				</div>
			</div>

			<!-- 成就进度 -->
			<section class="mb-10">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold">成就总览</h2>
					<div class="flex space-x-2">
						<button
							class="px-4 py-2 rounded-lg"
							:class="
								activeFilter === 'all'
									? 'bg-black text-white'
									: 'bg-white border border-light-2 hover:bg-light-1'
							"
							@click="activeFilter = 'all'"
						>
							全部
						</button>
						<button
							class="px-4 py-2 rounded-lg"
							:class="
								activeFilter === 'completed'
									? 'bg-black text-white'
									: 'bg-white border border-light-2 hover:bg-light-1'
							"
							@click="activeFilter = 'completed'"
						>
							已完成
						</button>
						<button
							class="px-4 py-2 rounded-lg"
							:class="
								activeFilter === 'inProgress'
									? 'bg-black text-white'
									: 'bg-white border border-light-2 hover:bg-light-1'
							"
							@click="activeFilter = 'inProgress'"
						>
							进行中
						</button>
					</div>
				</div>

				<div class="bg-white rounded-2xl shadow-card p-6">
					<div class="flex flex-col md:flex-row items-center justify-between mb-6">
						<div class="mb-4 md:mb-0">
							<h3 class="text-lg font-semibold mb-1">总体进度</h3>
							<p class="text-dark-2">你已完成 42% 的核心面试题成就</p>
						</div>
						<div class="w-full md:w-3/4 achievement-progress">
							<div
								class="achievement-progress-bar bg-primary"
								:style="{ width: overallProgress + '%' }"
							></div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div
							v-for="category in filteredCategories"
							:key="category.id"
							class="bg-gray-100 rounded-xl shadow-lg card-animate p-6 text-gray-800 hover:scale-105 transition"
						>
							<div class="flex items-center mb-3">
								<div
									class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3"
								>
									<font-awesome-icon
										:icon="['fas', category.icon]"
										size="lg"
										:style="{
											color: category.color,
											filter:
												'drop-shadow(0 0 6px ' +
												(category.color || '#409eff') +
												')'
										}"
									/>
								</div>
								<div>
									<h4 class="font-medium text-gray-800">{{ category.name }}</h4>
									<p class="text-sm text-gray-500">{{ category.description }}</p>
								</div>
							</div>
							<div class="w-full h-2 bg-gray-200 rounded-full mb-2">
								<div
									class="h-2 bg-green-500 rounded-full transition-all duration-700"
									:style="{ width: category.progress + '%' }"
								></div>
							</div>
							<div class="flex justify-between text-sm text-gray-800">
								<span class="font-bold">{{ category.progress }}%</span>
								<span class="font-bold"
									>{{ category.completed }}/{{ category.total }} 成就</span
								>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 荣誉徽章区块优化 -->
			<div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-800">荣誉徽章</h2>
					<div class="flex items-center space-x-2">
						<span class="text-gray-700"
							>已收集:
							<span class="font-semibold text-gray-900">{{
								collectedBadges.length
							}}</span
							>/<span class="text-gray-400">{{ totalBadges }}</span></span
						>
						<button
							class="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition"
						>
							查看全部
						</button>
					</div>
				</div>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					<!-- 已获得徽章 -->
					<div v-for="badge in collectedBadges" :key="badge.id" class="badge-flip">
						<div
							class="badge-card badge-front bg-white rounded-xl shadow flex flex-col items-center p-4 cursor-pointer"
						>
							<div class="relative w-20 h-20 flex items-center justify-center mb-2">
								<!-- 发光背景 -->
								<div
									class="absolute inset-0 rounded-full bg-blue-100"
									style="
										box-shadow:
											0 0 24px 8px #e3f6ff,
											0 0 0 2px #e3f6ff;
									"
								></div>
								<!-- 环形进度条 -->
								<svg class="absolute inset-0" width="80" height="80">
									<circle
										cx="40"
										cy="40"
										r="32"
										stroke="#e3f6ff"
										stroke-width="6"
										fill="none"
									/>
									<circle
										cx="40"
										cy="40"
										r="32"
										:stroke="badge.color || '#409eff'"
										stroke-width="6"
										fill="none"
										:stroke-dasharray="2 * Math.PI * 32"
										:stroke-dashoffset="2 * Math.PI * 32 * (1 - badge.progress)"
										stroke-linecap="round"
										style="transition: stroke-dashoffset 0.6s"
									/>
								</svg>
								<!-- 图标 -->
								<font-awesome-icon
									:icon="['fas', badge.icon]"
									size="2x"
									:style="{
										color: badge.color || '#409eff',
										zIndex: 2,
										position: 'relative',
										filter:
											'drop-shadow(0 0 8px ' +
											(badge.color || '#409eff') +
											')'
									}"
								/>
							</div>
							<span class="font-bold text-gray-800">{{ badge.name }}</span>
							<span class="text-xs text-gray-500 mt-1">{{ badge.description }}</span>
						</div>
						<div
							class="badge-card badge-back bg-blue-50 rounded-xl shadow flex flex-col items-start p-4 cursor-pointer"
						>
							<div class="text-xs text-gray-500 mb-1">
								获得时间
								<span class="float-right text-blue-600">{{
									badge.acquiredDate
								}}</span>
							</div>
							<div class="text-xs text-gray-700 mb-2">{{ badge.details }}</div>
							<div class="text-xs text-blue-600 font-bold">
								+{{ badge.points }} 积分
							</div>
						</div>
					</div>
					<!-- 即将获得徽章 -->
					<div v-for="badge in upcomingBadges" :key="badge.id" class="badge-flip">
						<div
							class="badge-card badge-front bg-gradient-to-b from-gray-100 to-gray-50 rounded-xl shadow flex flex-col items-center p-4 text-gray-700 border border-gray-200 opacity-95"
						>
							<div class="relative w-14 h-14 flex items-center justify-center mb-2">
								<svg class="absolute top-0 left-0" width="56" height="56">
									<circle
										cx="28"
										cy="28"
										r="24"
										stroke="#e5e7eb"
										stroke-width="4"
										fill="none"
									/>
									<circle
										cx="28"
										cy="28"
										r="24"
										:stroke="badge.color || '#bdbdbd'"
										stroke-width="4"
										fill="none"
										:stroke-dasharray="2 * Math.PI * 24"
										:stroke-dashoffset="2 * Math.PI * 24 * (1 - badge.progress)"
										stroke-linecap="round"
									/>
								</svg>
								<font-awesome-icon
									:icon="['fas', badge.icon]"
									size="lg"
									:style="{
										color: badge.color || '#bdbdbd',
										filter: 'drop-shadow(0 0 6px #e0e0e0)'
									}"
								/>
							</div>
							<span class="font-bold">{{ badge.name }}</span>
							<span class="text-xs text-gray-500"
								>即将获得，还差{{ Math.round((1 - badge.progress) * 100) }}%</span
							>
						</div>
						<div
							class="badge-card badge-back bg-gray-50 rounded-xl shadow flex flex-col items-start p-4 text-gray-700 border border-gray-200 opacity-95"
						>
							<div class="text-xs text-gray-500 mb-1">完成条件</div>
							<div class="text-xs text-gray-700 mb-2">{{ badge.details }}</div>
							<div class="text-xs text-gray-400">
								进度：{{ Math.round(badge.progress * 100) }}%
							</div>
						</div>
					</div>
					<!-- 未获得徽章 -->
					<div
						v-for="badge in neverBadges"
						:key="badge.id"
						class="bg-gray-100 rounded-xl shadow flex flex-col items-center p-4 text-gray-400 opacity-60"
					>
						<div class="relative w-14 h-14 flex items-center justify-center mb-2">
							<svg class="absolute top-0 left-0" width="56" height="56">
								<circle
									cx="28"
									cy="28"
									r="24"
									stroke="#e5e7eb"
									stroke-width="4"
									fill="none"
								/>
							</svg>
							<i :class="`fa ${badge.icon} text-2xl`"></i>
						</div>
						<span class="font-bold">{{ badge.name }}</span>
						<span class="text-xs">未获得</span>
					</div>
				</div>
			</div>

			<!-- 最新成就区块优化 -->
			<div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-800">最新成就</h2>
					<select
						class="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-800"
					>
						<option>最近获得</option>
						<option>按类别</option>
						<option>按难度</option>
					</select>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- 成就卡片 -->
					<div
						v-for="achievement in visibleAchievements"
						:key="achievement.id"
						class="bg-gray-100 rounded-xl shadow card-animate p-6 text-gray-800 hover:scale-105 transition relative cursor-pointer"
						@click="openDetail(achievement)"
						:style="
							achievement.progress >= 90 && achievement.progress < 100
								? 'box-shadow: 0 0 0 3px #facc15;'
								: ''
						"
					>
						<div class="flex items-center mb-2">
							<div
								class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3"
							>
								<font-awesome-icon
									:icon="['fas', achievement.icon]"
									size="lg"
									:style="{
										color: achievement.color,
										filter:
											'drop-shadow(0 0 6px ' +
											(achievement.color || '#409eff') +
											')'
									}"
								/>
							</div>
							<div>
								<h3 class="font-semibold">{{ achievement.name }}</h3>
								<p class="text-sm text-gray-500">{{ achievement.description }}</p>
							</div>
						</div>
						<div class="w-full h-2 bg-gray-200 rounded-full mb-2">
							<div
								class="h-2 bg-green-500 rounded-full transition-all duration-700"
								:style="{ width: achievement.progress + '%' }"
							></div>
						</div>
						<div class="flex justify-between text-sm mb-2">
							<span class="text-green-500 font-bold"
								>{{ achievement.progress }}%</span
							>
							<span class="text-green-500 font-bold"
								>+{{ achievement.points }} 积分</span
							>
						</div>
						<div class="flex flex-wrap gap-2 mb-2">
							<span
								v-for="tag in achievement.tags"
								:key="tag"
								class="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700"
								>{{ tag }}</span
							>
						</div>
						<!-- 一键领取奖励 -->
						<button
							v-if="achievement.progress === 100 && !rewardClaimed[achievement.id]"
							@click.stop="claimReward(achievement.id)"
							class="w-full py-2 mt-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition"
						>
							领取奖励
						</button>
						<span
							v-if="rewardClaimed[achievement.id]"
							class="w-full block text-center text-green-600 font-bold mt-2"
							>奖励已领取</span
						>
						<button
							v-else-if="achievement.progress < 100"
							class="w-full py-2 mt-2 rounded-lg bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition"
						>
							{{ achievement.progress === 0 ? '开始学习' : '继续学习' }}
						</button>
					</div>
				</div>
				<div class="mt-8 text-center">
					<button
						class="px-6 py-3 bg-white border border-light-2 rounded-lg hover:bg-light-1 transition-colors"
						@click="showAllAchievements = !showAllAchievements"
					>
						{{ showAllAchievements ? '收起' : '加载更多' }}
					</button>
				</div>
				<!-- 成就详情弹窗 -->
				<div
					v-if="showDetail && detailAchievement"
					class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
				>
					<div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
						<button
							class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
							@click="closeDetail"
						>
							×
						</button>
						<div class="flex items-center mb-4">
							<font-awesome-icon
								:icon="['fas', detailAchievement?.icon]"
								size="2x"
								:style="{ color: detailAchievement?.color }"
							/>
							<div class="ml-4">
								<h3 class="text-xl font-bold">{{ detailAchievement?.name }}</h3>
								<p class="text-gray-500">{{ detailAchievement?.description }}</p>
							</div>
						</div>
						<div class="mb-2 text-sm text-gray-600">
							达成条件：{{ detailAchievement?.tags?.join('、') }}
						</div>
						<div class="mb-2 text-sm text-gray-600">
							当前进度：{{ detailAchievement?.progress }}%
						</div>
						<div class="mb-2 text-sm text-gray-600">
							积分：+{{ detailAchievement?.points }}
						</div>
						<div class="mb-2 text-sm text-gray-600">
							开始时间：{{ detailAchievement?.startDate || '-' }}
						</div>
						<div class="mb-2 text-sm text-gray-600">
							预计完成：{{ detailAchievement?.expectedDate || '-' }}
						</div>
						<div class="mb-4 text-sm text-gray-600">
							{{
								detailAchievement?.acquiredDate
									? '获得时间：' + detailAchievement?.acquiredDate
									: ''
							}}
						</div>
						<button
							class="w-full py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition mb-2"
							@click="shareAchievement(detailAchievement)"
						>
							分享成就
						</button>
						<button
							v-if="
								detailAchievement?.progress === 100 &&
								!rewardClaimed[detailAchievement?.id]
							"
							class="w-full py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
							@click="claimReward(detailAchievement?.id)"
						>
							领取奖励
						</button>
						<span
							v-if="rewardClaimed[detailAchievement?.id]"
							class="w-full block text-center text-green-600 font-bold mt-2"
							>奖励已领取</span
						>
					</div>
				</div>
			</div>
		</main>

		<!-- 删除footer区域 -->
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
// import CategoryProgress from './CategoryProgress.vue';
// import BadgeItem from './BadgeItem.vue';
// import AchievementItem from './AchievementItem.vue';
import { useBase } from '/$/base';

const { user } = useBase();

// 数据
const overallProgress = ref(0);
const categories = ref([
	{
		id: 1,
		name: '技术基础',
		description: '掌握核心概念',
		progress: 65,
		total: 20,
		completed: 13,
		icon: 'code', // FontAwesome 5名称
		color: '#409eff'
	},
	{
		id: 2,
		name: '算法与数据结构',
		description: '解决实际问题',
		progress: 30,
		total: 20,
		completed: 6,
		icon: 'bolt',
		color: '#67c23a'
	},
	{
		id: 3,
		name: '系统设计',
		description: '架构思维',
		progress: 25,
		total: 20,
		completed: 5,
		icon: 'tasks',
		color: '#e6a23c'
	}
]);

const badges = ref([
	{
		id: 1,
		name: '基础语法大师',
		icon: 'code',
		color: '#409eff',
		acquiredDate: '2025-06-15',
		points: 200,
		details: '掌握了编程语言的核心语法和基础概念',
		progress: 1
	},
	{
		id: 2,
		name: '性能优化专家',
		icon: 'bolt',
		color: '#67c23a',
		acquiredDate: null, // 进度未满，未获得
		points: 150,
		details: '能够识别并解决应用程序中的性能瓶颈',
		progress: 0.8
	},
	{
		id: 3,
		name: '安全卫士',
		icon: 'shield-alt',
		color: '#e6a23c',
		acquiredDate: null, // 进度未满，未获得
		points: 100,
		details: '了解常见的安全漏洞和防护措施',
		progress: 0.6
	},
	{
		id: 4,
		name: '架构师之路',
		icon: 'tasks',
		color: '#f56c6c',
		acquiredDate: null, // 进度未满，未获得
		points: 250,
		details: '能够设计可扩展、高性能的系统架构',
		progress: 0.5
	},
	{
		id: 5,
		name: '调试达人',
		icon: 'bug',
		color: '#909399',
		acquiredDate: null, // 进度未满，未获得
		points: 180,
		details: '擅长快速定位并解决代码中的问题',
		progress: 0.3
	},
	{
		id: 6,
		name: '数据库大师',
		icon: 'database',
		color: '#1abc9c',
		acquiredDate: null, // 进度未满，未获得
		points: 220,
		details: '精通SQL查询优化和数据库设计',
		progress: 0.7
	},
	{
		id: 7,
		name: '多线程高手',
		icon: 'code-branch',
		color: '#b37feb',
		acquiredDate: null,
		points: 280,
		details: '掌握多线程编程和并发控制技术',
		progress: 0
	},
	{
		id: 8,
		name: '云原生先锋',
		icon: 'cloud',
		color: '#2d8cf0',
		acquiredDate: null,
		points: 300,
		details: '了解容器化、微服务和DevOps实践',
		progress: 0
	}
]);

interface Achievement {
	id: number;
	name: string;
	description: string;
	progress: number;
	acquiredDate: string | null;
	points: number;
	startDate?: string;
	expectedDate?: string;
	tags: string[];
	icon: string;
	color: string;
}

const achievements = ref<Achievement[]>([
	{
		id: 1,
		name: 'React 进阶掌握',
		description: '掌握React高阶概念和最佳实践',
		progress: 100,
		acquiredDate: '2025-07-15',
		points: 300,
		startDate: '2025-07-01',
		expectedDate: '2025-07-15',
		tags: ['React Hooks', '状态管理', '性能优化'],
		icon: 'code', // FontAwesome 5名称
		color: '#409eff'
	},
	{
		id: 2,
		name: '微服务架构设计',
		description: '理解微服务设计原则和实践',
		progress: 100,
		acquiredDate: '2025-07-10',
		points: 250,
		startDate: '2025-06-25',
		expectedDate: '2025-07-10',
		tags: ['服务拆分', 'API网关', '服务发现'],
		icon: 'tasks',
		color: '#67c23a'
	},
	{
		id: 3,
		name: '网络安全专家',
		description: '掌握常见安全漏洞和防护方法',
		progress: 60,
		acquiredDate: null,
		points: 350,
		startDate: '2025-07-05',
		expectedDate: '2025-07-20',
		tags: ['XSS', 'CSRF', 'SQL注入', 'JWT安全'],
		icon: 'shield-alt',
		color: '#a084e8'
	},
	{
		id: 4,
		name: '数据库优化大师',
		description: '精通数据库索引和查询优化',
		progress: 40,
		acquiredDate: null,
		points: 300,
		startDate: '2025-07-08',
		expectedDate: '2025-07-25',
		tags: ['索引优化', '查询性能', '事务处理'],
		icon: 'database',
		color: '#f6a23c'
	},
	// 新增模块
	{
		id: 5,
		name: '云原生实战',
		description: '掌握容器化、微服务与DevOps核心技能',
		progress: 20,
		acquiredDate: null,
		points: 400,
		startDate: '2025-07-12',
		expectedDate: '2025-08-01',
		tags: ['Kubernetes', 'Docker', 'CI/CD'],
		icon: 'cloud',
		color: '#2d8cf0'
	},
	{
		id: 6,
		name: '算法挑战达人',
		description: '精通各类算法题型与解题技巧',
		progress: 55,
		acquiredDate: null,
		points: 320,
		startDate: '2025-07-10',
		expectedDate: '2025-07-30',
		tags: ['动态规划', '贪心', '回溯', '数据结构'],
		icon: 'bolt',
		color: '#67c23a'
	},
	{
		id: 7,
		name: '前端测试专家',
		description: '掌握前端自动化测试与覆盖率提升',
		progress: 0,
		acquiredDate: null,
		points: 280,
		startDate: '2025-07-15',
		expectedDate: '2025-08-05',
		tags: ['Jest', 'Cypress', '单元测试', '集成测试'],
		icon: 'bug',
		color: '#909399'
	}
]);

// 计算属性
const computedBadges = computed(() =>
	badges.value.map(b => ({
		...(b as any),
		progress: (b as any).progress !== undefined ? (b as any).progress : 1
	}))
);
const collectedBadges = computed(() =>
	computedBadges.value.filter(badge => badge.acquiredDate && badge.progress === 1)
);
const upcomingBadges = computed(() =>
	computedBadges.value.filter(badge => !badge.acquiredDate && badge.progress > 0)
);
const neverBadges = computed(() =>
	computedBadges.value.filter(badge => !badge.acquiredDate && badge.progress === 0)
);
const totalBadges = computed(() => badges.value.length);

const completedAchievements = computed(() =>
	achievements.value.filter(achievement => achievement.progress === 100)
);
const inProgressAchievements = computed(() =>
	achievements.value.filter(achievement => achievement.progress < 100)
);
const newAchievements = computed(() =>
	achievements.value.filter(achievement => achievement.progress > 0 && achievement.progress < 100)
);

const showAllAchievements = ref(false);
const visibleAchievements = computed(() => {
	return showAllAchievements.value ? achievements.value : achievements.value.slice(0, 4);
});

const activeFilter = ref('all'); // 'all' | 'completed' | 'inProgress'

const filteredCategories = computed(() => {
	if (activeFilter.value === 'completed') {
		return categories.value.filter(c => c.progress === 100);
	} else if (activeFilter.value === 'inProgress') {
		return categories.value.filter(c => c.progress < 100);
	}
	return categories.value;
});

// 新增：成就搜索、筛选、排序、详情弹窗等功能相关数据
const searchKeyword = ref('');
const tagFilter = ref('');
const sortKey = ref('progress'); // progress | points | acquiredDate
const sortOrder = ref('desc'); // desc | asc
const activeTab = ref('all'); // all | completed | inProgress | notStarted
const showDetail = ref(false);
const detailAchievement = ref<Achievement | null>(null);
const rewardClaimed = ref({}); // 记录已领取奖励的成就id

// 统计图表数据
const totalCount = computed(() => achievements.value.length);
const completedCount = computed(() => achievements.value.filter(a => a.progress === 100).length);
const completedPercent = computed(() =>
	totalCount.value ? Math.round((completedCount.value / totalCount.value) * 100) : 0
);

// 标签集合
const allTags = computed<string[]>(() => {
	const tags = new Set<string>();
	achievements.value.forEach(a => a.tags.forEach((t: string) => tags.add(t)));
	return Array.from(tags);
});

// 搜索、筛选、排序后的成就
const filteredAchievements = computed<Achievement[]>(() => {
	let arr = achievements.value.slice();
	if (searchKeyword.value) {
		arr = arr.filter(
			a => a.name.includes(searchKeyword.value) || a.description.includes(searchKeyword.value)
		);
	}
	if (tagFilter.value) {
		arr = arr.filter(a => a.tags.includes(tagFilter.value));
	}
	if (activeTab.value === 'completed') {
		arr = arr.filter(a => a.progress === 100);
	} else if (activeTab.value === 'inProgress') {
		arr = arr.filter(a => a.progress > 0 && a.progress < 100);
	} else if (activeTab.value === 'notStarted') {
		arr = arr.filter(a => a.progress === 0);
	}
	arr = arr.sort((a, b) => {
		let v1 = a[sortKey.value as keyof Achievement];
		let v2 = b[sortKey.value as keyof Achievement];
		if (sortKey.value === 'acquiredDate') {
			v1 = v1 || '';
			v2 = v2 || '';
		}
		// 类型安全处理
		if (v1 == null) v1 = '';
		if (v2 == null) v2 = '';
		if (sortOrder.value === 'desc') {
			return v2 > v1 ? 1 : -1;
		} else {
			return v1 > v2 ? 1 : -1;
		}
	});
	return arr;
});

function openDetail(achievement) {
	showDetail.value = true;
	detailAchievement.value = achievement;
}
function closeDetail() {
	showDetail.value = false;
	detailAchievement.value = null;
}
function claimReward(id) {
	rewardClaimed.value[id] = true;
}
function shareAchievement(achievement) {
	window.navigator.clipboard.writeText(`我刚刚获得了成就「${achievement.name}」！`);
	alert('成就信息已复制，可粘贴分享！');
}

function onSearch() {
	// 这里可以做你想要的搜索逻辑，比如聚焦、过滤、埋点等
	// 目前filteredAchievements已自动响应searchKeyword/tagFilter变化
	// 你可以在这里加loading、请求等副作用
	console.log('搜索', searchKeyword.value, tagFilter.value);
}

// 组件定义部分全部移除，使用import引入
// 生命周期钩子
onMounted(() => {
	// 设置总体进度
	overallProgress.value = 42;

	// 导航栏滚动效果
	window.addEventListener('scroll', handleScroll);

	// 触发一次滚动事件以设置初始状态
	handleScroll();
});

// 方法
const handleScroll = () => {
	const header = document.querySelector('header');
	if (!header) return;
	if (window.scrollY > 50) {
		header.classList.add('py-2', 'shadow-md');
		header.classList.remove('py-3', 'shadow-sm');
	} else {
		header.classList.add('py-3', 'shadow-sm');
		header.classList.remove('py-2', 'shadow-md');
	}
};

// 清理
onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.achievement-progress {
	height: 8px;
	border-radius: 4px;
	background-color: #e5e6eb;
	overflow: hidden;
}

.achievement-progress-bar {
	height: 100%;
	transition: width 1s ease-in-out;
}

.card-flip {
	perspective: 1000px;
	transform-style: preserve-3d;
}

.card-front,
.card-back {
	backface-visibility: hidden;
	transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-back {
	transform: rotateY(180deg);
}

.card-flip:hover .card-front {
	transform: rotateY(180deg);
}

.card-flip:hover .card-back {
	transform: rotateY(0deg);
}

.badge-glow {
	box-shadow:
		0 0 16px 0 #a5d8ff,
		0 0 0 4px #e3f6ff;
}

.card-animate {
	transition:
		transform 0.2s,
		box-shadow 0.2s;
}
.card-animate:hover {
	transform: translateY(-4px) scale(1.03);
	box-shadow: 0 8px 32px 0 #232526;
}
.badge-flip {
	perspective: 1000px;
	position: relative;
	min-height: 180px;
}
.badge-card {
	width: 100%;
	height: 180px;
	position: absolute;
	top: 0;
	left: 0;
	backface-visibility: hidden;
	transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	display: flex;
}
.badge-front {
	z-index: 2;
	transform: rotateY(0deg);
}
.badge-back {
	transform: rotateY(180deg);
	z-index: 1;
}
.badge-flip:hover .badge-front {
	transform: rotateY(180deg);
}
.badge-flip:hover .badge-back {
	transform: rotateY(0deg);
	z-index: 3;
}
</style>
