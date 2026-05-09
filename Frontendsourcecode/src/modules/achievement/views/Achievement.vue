<template>
	<div class="achievement-bg min-h-screen relative overflow-hidden">
		<!-- 顶部渐变背景和圆形装饰 -->
		<div
			class="absolute top-0 left-0 w-full h-72 bg-gradient-to-br from-blue-200/60 via-indigo-100/80 to-white z-0"
		></div>
		<div
			class="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-2xl z-0"
			style="transform: translate(40%, -40%)"
		></div>
		<div
			class="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100/40 rounded-full blur-2xl z-0"
			style="transform: translate(-30%, 30%)"
		></div>
		<div class="container mx-auto px-4 relative z-10">
			<!-- 日期和激励语区块 -->
			<div
				class="flex flex-col md:flex-row items-center justify-between mt-6 mb-6 animate-fade-in-down"
			>
				<div
					class="flex items-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl px-6 py-3 shadow-md mb-3 md:mb-0"
				>
					<span class="text-3xl font-extrabold text-blue-500 mr-3">{{ todayStr }}</span>
					<span class="text-lg text-gray-500">{{ weekStr }}</span>
				</div>
				<div
					class="flex items-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl px-6 py-3 shadow-md animate-fade-in-down"
				>
					<i class="fa-solid fa-bolt text-yellow-400 text-xl mr-2"></i>
					<span class="text-lg font-semibold text-gray-700 dark:text-gray-200"
						>每天进步一点点，面试更有信心！</span
					>
				</div>
			</div>
			<h1
				class="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center relative z-10"
			>
				<i class="fa-solid fa-trophy text-yellow-500 mr-3"></i>今日成就
			</h1>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<!-- 今日复习报告 -->
				<div
					class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col card-animate"
				>
					<div class="flex items-center mb-4">
						<i class="fa-solid fa-rotate-left text-yellow-500 text-xl mr-2"></i>
						<h3 class="text-lg font-bold text-gray-800 dark:text-white">
							今日复习报告
						</h3>
					</div>
					<div class="flex items-center mb-2">
						<div class="relative w-24 h-24 mr-6">
							<svg class="absolute top-0 left-0" width="96" height="96">
								<circle
									cx="48"
									cy="48"
									r="42"
									stroke="#f3f0ff"
									stroke-width="10"
									fill="none"
								/>
								<circle
									cx="48"
									cy="48"
									r="42"
									:stroke="'#fbbf24'"
									stroke-width="10"
									fill="none"
									:stroke-dasharray="264"
									:stroke-dashoffset="
										264 - Math.round(todayReview.masterRate * 2.64)
									"
									stroke-linecap="round"
								/>
							</svg>
							<div class="absolute inset-0 flex flex-col items-center justify-center">
								<span class="text-lg font-extrabold text-yellow-500"
									>{{ todayReview.masterRate }}%</span
								>
								<span class="text-[10px] text-gray-400 mt-0.5 font-normal"
									>掌握率</span
								>
								<div class="flex mt-1">
									<i
										class="fa-solid fa-star text-yellow-400 text-xs mx-0.5"
										v-for="i in 3"
										:key="i"
									></i>
								</div>
							</div>
						</div>
						<div class="flex-1">
							<div
								class="text-base text-gray-500 dark:text-gray-300 mb-2 flex items-end"
							>
								<span>复习面试题总数</span>
								<span class="text-2xl font-bold text-green-600 ml-2"
									>{{ todayReview.total }}<span class="text-base">道</span></span
								>
							</div>
							<div class="space-y-1 mt-2">
								<div class="flex items-center text-sm">
									<i class="fa-solid fa-circle text-orange-400 text-xs mr-2"></i>
									<span class="text-gray-700 dark:text-gray-200">掌握</span>
									<span class="font-bold text-gray-800 dark:text-white ml-1"
										>{{ todayReview.mastered }}道</span
									>
								</div>
								<div class="flex items-center text-sm">
									<i class="fa-solid fa-circle text-gray-300 text-xs mr-2"></i>
									<span class="text-gray-700 dark:text-gray-200">未掌握</span>
									<span class="font-bold text-gray-800 dark:text-white ml-1"
										>{{ todayReview.unmastered }}道</span
									>
									<span class="text-xs text-gray-400 ml-2">（提示≥2次）</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 今日新题报告 -->
				<div
					class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col card-animate"
				>
					<div class="flex items-center mb-4">
						<i class="fa-solid fa-star text-blue-500 text-xl mr-2"></i>
						<h3 class="text-lg font-bold text-gray-800 dark:text-white">
							今日新题报告
						</h3>
					</div>
					<div class="flex-1">
						<div class="text-base text-gray-500 dark:text-gray-300 mb-1">
							新学面试题数
							<span class="font-bold text-gray-800 dark:text-white">{{
								todayNew.total
							}}</span>
						</div>
						<div class="text-base text-gray-500 dark:text-gray-300 mb-1">
							新题掌握率
							<span class="font-bold text-blue-500">{{ todayNew.masterRate }}%</span>
						</div>
						<div class="text-xs text-gray-400 mb-1 mt-2">最不熟悉的面试题：</div>
						<div class="flex flex-col gap-2">
							<div
								v-for="q in todayNew.leastFamiliar"
								:key="q.id"
								class="bg-blue-50 dark:bg-blue-900/20 rounded p-2 text-blue-700 dark:text-blue-200 text-sm"
							>
								{{ q.title }}
							</div>
						</div>
					</div>
				</div>
				<!-- 本周学习时长 -->
				<div
					class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col col-span-1 md:col-span-2 card-animate animate-fade-in-down"
				>
					<div class="flex items-center mb-4">
						<i class="fa-solid fa-clock text-green-500 text-xl mr-2"></i>
						<h3 class="text-lg font-bold text-gray-800 dark:text-white">
							本周学习时长
						</h3>
					</div>
					<div class="flex items-center mb-4">
						<span class="text-2xl font-bold text-green-600 mr-2"
							>{{ weekStudy.total }}分钟</span
						>
						<span class="text-xs text-gray-400">(周总学习时长)</span>
					</div>
					<div class="w-full flex flex-col gap-2 mt-2">
						<div v-for="(min, i) in weekStudy.days" :key="i" class="flex items-center">
							<span class="w-8 text-xs text-gray-500">{{
								['一', '二', '三', '四', '五', '六', '日'][i]
							}}</span>
							<div
								class="flex-1 h-4 bg-green-100 dark:bg-green-900 rounded overflow-hidden mx-2 relative"
							>
								<div
									class="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded transition-all duration-700"
									:style="{
										width: (min / Math.max(...weekStudy.days, 1)) * 100 + '%'
									}"
								></div>
							</div>
							<span class="w-10 text-xs text-gray-700 dark:text-gray-200 text-right"
								>{{ min }}m</span
							>
						</div>
					</div>
				</div>
				<!-- 当前学习计划 -->
				<div
					class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col col-span-1 md:col-span-2 card-animate animate-fade-in-down"
				>
					<div class="flex items-center mb-4">
						<i class="fa-solid fa-list-check text-purple-500 text-xl mr-2"></i>
						<h3 class="text-lg font-bold text-gray-800 dark:text-white">
							当前学习计划
						</h3>
					</div>
					<div class="flex items-center mb-4">
						<div class="relative w-20 h-20 mr-6">
							<svg class="absolute top-0 left-0" width="80" height="80">
								<circle
									cx="40"
									cy="40"
									r="36"
									stroke="#f3f0ff"
									stroke-width="8"
									fill="none"
								/>
								<circle
									cx="40"
									cy="40"
									r="36"
									:stroke="'#a78bfa'"
									stroke-width="8"
									fill="none"
									:stroke-dasharray="226"
									:stroke-dashoffset="planDashOffset"
									stroke-linecap="round"
									style="
										transition: stroke-dashoffset 1s
											cubic-bezier(0.4, 2, 0.6, 1);
									"
								/>
							</svg>
							<div class="absolute inset-0 flex flex-col items-center justify-center">
								<span class="text-xl font-bold text-purple-500"
									>{{ plan.progress }}%</span
								>
								<span class="text-xs text-gray-400">进度</span>
							</div>
						</div>
						<div class="flex-1">
							<div class="text-sm text-gray-500 dark:text-gray-300 mb-1">
								预计完成还需
								<span class="font-bold text-purple-600">{{ plan.daysLeft }}</span>
								天
							</div>
							<div class="text-xs text-gray-400">
								总题数 {{ plan.total }}，已学 {{ plan.learned }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 推荐学习内容模块（移动到成就区块下方，适配整体灰白渐变色） -->
			<div
				class="bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl shadow-none p-0 mt-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8"
			>
				<div
					class="flex-1 flex flex-col items-center card-animate animate-fade-in-down bg-gradient-to-br from-gray-100 to-white rounded-2xl m-0 p-8"
				>
					<i class="fa-solid fa-book text-4xl text-gray-400 mb-2"></i>
					<div class="text-lg font-bold text-gray-800 mb-1">今日推荐</div>
					<div class="text-sm text-gray-500 mb-3">根据你的学习进度，推荐以下内容</div>
					<button
						class="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#d6d4fa] to-[#bfc6f9] text-gray-700 font-semibold shadow hover:from-[#bfc6f9] hover:to-[#a5b4fc] transition"
					>
						查看推荐
					</button>
				</div>
				<div
					class="flex-1 flex flex-col items-center card-animate animate-fade-in-down bg-gradient-to-br from-gray-100 to-white rounded-2xl m-0 p-8"
				>
					<i class="fa-solid fa-users text-4xl text-gray-400 mb-2"></i>
					<div class="text-lg font-bold text-gray-800 mb-1">热门面试题</div>
					<div class="text-sm text-gray-500 mb-3">最近大家都在练习这些题目</div>
					<button
						class="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#d6d4fa] to-[#bfc6f9] text-gray-700 font-semibold shadow hover:from-[#bfc6f9] hover:to-[#a5b4fc] transition"
					>
						查看热门
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Achievement',
	data() {
		const now = new Date();
		const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
		return {
			todayStr: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
			weekStr: `周${weekArr[now.getDay()]}`,
			todayReview: {
				masterRate: 28.6,
				total: 80,
				mastered: 32,
				unmastered: 18
			},
			todayNew: {
				total: 20,
				masterRate: 40.0,
				leastFamiliar: [
					{ id: 1, title: '请简述Vue的响应式原理。' },
					{ id: 2, title: '说说你对闭包的理解，并举一个实际应用场景。' }
				]
			},
			weekStudy: {
				total: 215,
				days: [60, 45, 40, 35, 20, 10, 5] // 周一到周日
			},
			plan: {
				progress: 60,
				daysLeft: 12,
				total: 100,
				learned: 60
			}
		};
	},
	computed: {
		planDashOffset() {
			// 226为圆环周长
			return 226 - Math.round(this.plan.progress * 2.26);
		}
	}
};
</script>

<style scoped>
.achievement-bg {
	background: linear-gradient(135deg, #f3f6fd 0%, #e9eaff 100%);
	min-height: 100vh;
	padding-bottom: 48px;
}
.card-animate {
	transition:
		transform 0.25s cubic-bezier(0.4, 2, 0.6, 1),
		box-shadow 0.25s;
	box-shadow: 0 2px 12px 0 #ececff;
	background: rgba(255, 255, 255, 0.95);
}
.card-animate:hover {
	transform: translateY(-6px) scale(1.035);
	box-shadow: 0 8px 32px 0 #b7afff;
	background: linear-gradient(135deg, #f7f8fa 0%, #f3f0ff 100%);
}
@keyframes fadeInDown {
	0% {
		opacity: 0;
		transform: translateY(-24px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
.animate-fade-in-down {
	animation: fadeInDown 0.7s cubic-bezier(0.4, 2, 0.6, 1);
}
</style>
