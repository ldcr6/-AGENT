<template>
	<div>
		<div class="flex items-end justify-between mt-6 mb-8 px-2">
			<div>
				<h2
					class="font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in mb-1"
				>
					公司与职位点评
				</h2>
				<p class="text-gray-500 text-base md:text-lg max-w-2xl animate-fade-in">
					了解真实的公司文化、面试难度和面试官风格，助你做出更明智的职业选择
				</p>
			</div>
			<search-bar />
		</div>
		<section id="company-reviews" class="py-8 md:py-12 bg-gray-50">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<!-- 换一换按钮 -->
				<div class="flex justify-end mb-4">
					<button
						@click="shuffleReviews"
						class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
					>
						<i class="fas fa-sync-alt mr-2"></i> 换一换
					</button>
				</div>
				<!-- 公司点评卡片 -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div
						v-for="review in displayedReviews"
						:key="review.id"
						class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl"
					>
						<div class="p-6">
							<div class="flex items-center justify-between mb-6">
								<div class="flex items-center">
									<img
										:src="review.logo"
										alt="公司logo"
										class="w-12 h-12 rounded-lg mr-4"
									/>
									<div>
										<h3 class="font-bold text-xl text-gray-900">
											{{ review.name }}
										</h3>
										<div class="flex items-center text-sm text-gray-500">
											<i class="fas fa-map-marker-alt mr-1"></i>
											<span>{{ review.location }}</span>
										</div>
									</div>
								</div>
								<div class="text-yellow-500 flex items-center">
									<span v-for="i in 5" :key="i">
										<i
											v-if="i <= Math.floor(review.rating)"
											class="fas fa-star"
										></i>
										<i
											v-else-if="
												i - review.rating < 1 && i - review.rating > 0
											"
											class="fas fa-star-half-alt"
										></i>
										<i v-else class="far fa-star"></i>
									</span>
									<span class="ml-1 text-gray-700 font-medium">{{
										review.rating
									}}</span>
								</div>
							</div>
							<!-- 评分指标 -->
							<div class="mb-6">
								<h4 class="font-medium text-gray-800 mb-4">评分指标</h4>
								<div class="space-y-3">
									<div v-for="metric in review.metrics" :key="metric.label">
										<div class="flex justify-between text-sm mb-1">
											<span>{{ metric.label }}</span>
											<span>{{ metric.value }}</span>
										</div>
										<div class="w-full bg-gray-200 rounded-full h-2">
											<div
												class="bg-blue-500 h-2 rounded-full"
												:style="{ width: metric.percent + '%' }"
											></div>
										</div>
									</div>
								</div>
							</div>
							<!-- 点评摘要 -->
							<div>
								<h4 class="font-medium text-gray-800 mb-3">点评摘要</h4>
								<p class="text-gray-600 mb-4">{{ review.summary }}</p>
								<a
									href="#"
									class="text-blue-600 font-medium hover:underline"
									@click.prevent="openModal(review)"
								>
									查看全部{{ review.total }}条点评
									<i class="fas fa-chevron-right ml-1"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- 职位点评 -->
				<div class="mt-16">
					<h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">热门职位点评</h3>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						<!-- 职位卡片1 -->
						<div
							class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
						>
							<div class="flex items-center mb-4">
								<div
									class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3"
								>
									<i class="fas fa-code"></i>
								</div>
								<h4 class="font-semibold text-lg">前端开发</h4>
							</div>
							<div class="text-yellow-500 text-sm mb-3">
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star-half-alt"></i>
								<span class="ml-1 text-gray-700">(126条点评)</span>
							</div>
							<p class="text-gray-600 text-sm mb-4 line-clamp-2">
								主流框架使用、性能优化和浏览器原理是面试重点，部分公司会考察算法基础...
							</p>
							<a href="#" class="text-blue-600 text-sm font-medium hover:underline"
								>查看点评 <i class="fas fa-chevron-right ml-1"></i
							></a>
						</div>
						<!-- 职位卡片2 -->
						<div
							class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
						>
							<div class="flex items-center mb-4">
								<div
									class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3"
								>
									<i class="fas fa-chart-line"></i>
								</div>
								<h4 class="font-semibold text-lg">数据分析师</h4>
							</div>
							<div class="text-yellow-500 text-sm mb-3">
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="far fa-star"></i>
								<span class="ml-1 text-gray-700">(98条点评)</span>
							</div>
							<p class="text-gray-600 text-sm mb-4 line-clamp-2">
								SQL、Excel和数据分析工具是基础，业务理解和数据可视化能力越来越受重视...
							</p>
							<a href="#" class="text-blue-600 text-sm font-medium hover:underline"
								>查看点评 <i class="fas fa-chevron-right ml-1"></i
							></a>
						</div>
						<!-- 职位卡片3 -->
						<div
							class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
						>
							<div class="flex items-center mb-4">
								<div
									class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3"
								>
									<i class="fas fa-cubes"></i>
								</div>
								<h4 class="font-semibold text-lg">产品经理</h4>
							</div>
							<div class="text-yellow-500 text-sm mb-3">
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star-half-alt"></i>
								<span class="ml-1 text-gray-700">(152条点评)</span>
							</div>
							<p class="text-gray-600 text-sm mb-4 line-clamp-2">
								需求分析、竞品分析和产品设计是核心，部分公司会考察实际案例解决能力...
							</p>
							<a href="#" class="text-blue-600 text-sm font-medium hover:underline"
								>查看点评 <i class="fas fa-chevron-right ml-1"></i
							></a>
						</div>
						<!-- 职位卡片4 -->
						<div
							class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
						>
							<div class="flex items-center mb-4">
								<div
									class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3"
								>
									<i class="fas fa-shield-alt"></i>
								</div>
								<h4 class="font-semibold text-lg">测试工程师</h4>
							</div>
							<div class="text-yellow-500 text-sm mb-3">
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star"></i>
								<i class="fas fa-star-half-alt"></i>
								<i class="far fa-star"></i>
								<span class="ml-1 text-gray-700">(76条点评)</span>
							</div>
							<p class="text-gray-600 text-sm mb-4 line-clamp-2">
								测试用例设计、自动化测试和性能测试是重点，部分公司要求编程能力...
							</p>
							<a href="#" class="text-blue-600 text-sm font-medium hover:underline"
								>查看点评 <i class="fas fa-chevron-right ml-1"></i
							></a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 弹窗：全部点评 -->
		<div
			v-if="showModal"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all"
		>
			<div
				class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative animate-fade-in"
			>
				<!-- 渐变头部 -->
				<div
					class="flex items-center justify-between px-8 py-5 rounded-t-2xl"
					style="background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)"
				>
					<div class="flex items-center">
						<i class="fas fa-comments text-white text-2xl mr-3"></i>
						<h3 class="text-xl font-bold text-white">
							{{ modalCompany?.name }}全部点评
						</h3>
					</div>
					<button
						@click="closeModal"
						class="absolute top-3 right-4 text-white hover:text-gray-200 text-3xl leading-none z-10"
					>
						&times;
					</button>
				</div>
				<div
					id="review-modal-scroll"
					class="overflow-y-auto px-8 py-6 flex-1 bg-gray-50"
					@scroll="onScroll"
				>
					<div v-if="modalCompany && visibleReviews.length">
						<div
							v-for="(item, idx) in visibleReviews"
							:key="idx"
							class="mb-8 pb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0 bg-white rounded-xl shadow-sm p-5"
						>
							<div class="flex items-center mb-2">
								<img
									:src="item.avatar"
									class="w-10 h-10 rounded-full mr-4 border border-blue-200"
								/>
								<div class="flex-1">
									<div class="flex items-center mb-1">
										<span class="font-semibold text-gray-800 mr-2">{{
											item.author
										}}</span>
										<span
											class="text-xs text-gray-400 bg-blue-50 px-2 py-0.5 rounded mr-2"
											>{{ item.position }}</span
										>
										<span
											class="text-xs text-gray-400 bg-indigo-50 px-2 py-0.5 rounded"
											>{{ item.round }}</span
										>
									</div>
									<div class="flex items-center text-yellow-500 text-sm mb-1">
										<i v-for="i in 5" :key="i">
											<i
												v-if="i <= Math.floor(item.rating)"
												class="fas fa-star"
											></i>
											<i
												v-else-if="
													i - item.rating < 1 && i - item.rating > 0
												"
												class="fas fa-star-half-alt"
											></i>
											<i v-else class="far fa-star"></i>
										</i>
										<span class="ml-1 text-gray-700 font-medium">{{
											item.rating
										}}</span>
									</div>
									<div class="text-xs text-gray-400">{{ item.date }}</div>
								</div>
								<!-- 点赞按钮 -->
								<button
									@click="likeReview(item)"
									:disabled="item.liked"
									class="ml-4 flex items-center text-sm px-2 py-1 rounded transition select-none"
									:class="
										item.liked
											? 'bg-blue-100 text-blue-600 cursor-not-allowed'
											: 'bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600'
									"
								>
									<i class="fas fa-thumbs-up mr-1"></i>{{ item.likes }}
								</button>
							</div>
							<div class="mb-2">
								<span class="font-medium text-green-600">优点：</span
								><span class="text-gray-700">{{ item.pros }}</span>
							</div>
							<div class="mb-2">
								<span class="font-medium text-red-500">缺点：</span
								><span class="text-gray-700">{{ item.cons }}</span>
							</div>
							<div class="mb-2">
								<span class="font-medium text-indigo-600">建议：</span
								><span class="text-gray-700">{{ item.advice }}</span>
							</div>
							<p class="text-gray-600 text-base mt-2">{{ item.content }}</p>
						</div>
					</div>
					<!-- 加载状态 -->
					<div class="flex justify-center items-center py-4 text-gray-400" v-if="loading">
						加载评论中...
					</div>
					<div
						class="flex justify-center items-center py-4 text-gray-400"
						v-else-if="
							modalCompany && visibleReviews.length === modalCompany.reviews.length
						"
					>
						已加载全部评论
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import SearchBar from '/@/components/SearchBar.vue';
import { ref, computed, nextTick } from 'vue';

// 生成丰富点评的辅助函数
function generateReviews(companyName, avatarStart = 1) {
	const positions = ['前端开发工程师', '后端开发工程师', '产品经理', '测试工程师', '算法工程师'];
	const rounds = ['一面', '二面', '三面', 'HR面'];
	const prosList = [
		'面试官很专业，问题有深度。',
		'公司氛围好，流程规范。',
		'问题贴合实际业务，体验佳。',
		'面试体验很好，注重项目经验。',
		'整体流程顺畅，面试官很有耐心。',
		'公司环境好，面试官和蔼。',
		'问题覆盖面广，氛围轻松。',
		'面试官很注重细节。',
		'公司福利好，晋升机会多。',
		'面试官很友好，问题有挑战性。'
	];
	const consList = [
		'等待时间较长。',
		'部分问题较为基础。',
		'流程稍微复杂。',
		'部分问题较难。',
		'流程较长。',
		'部分问题较为开放。',
		'流程稍长。',
		'流程稍显繁琐。',
		'等待时间略长。',
		'部分环节重复。'
	];
	const adviceList = [
		'建议提前准备项目经验。',
		'多准备案例分析。',
		'多复习基础知识。',
		'提前到场。',
		'多刷算法题。',
		'耐心等待。',
		'多准备实际项目经验。',
		'多准备项目相关内容。',
		'多准备案例。',
		'提前准备。'
	];
	const contentList = [
		'整体体验不错，流程规范，面试官会针对项目细节深挖，算法题有一定难度。',
		'面试体验很好，问题贴合实际业务。',
		'整体流程顺畅，面试官很有耐心。',
		'面试体验很棒，问题有深度。',
		'面试官很注重项目经验，问了很多细节问题。',
		'面试官很耐心，问题有深度，整体氛围轻松。',
		'面试官很专业，问题有挑战性，适合喜欢算法的同学。',
		'面试体验很好，问题覆盖面广。',
		'整体体验良好，面试官很友好，问题覆盖面广。',
		'面试体验很好，问题很有针对性。'
	];
	const names = [
		'小明',
		'小红',
		'小李',
		'王强',
		'李娜',
		'赵雷',
		'孙悦',
		'周洋',
		'钱进',
		'吴敏',
		'郑爽',
		'冯雪',
		'陈刚',
		'林静',
		'刘洋',
		'马超',
		'高飞',
		'黄蓉',
		'宋江',
		'李逵'
	];
	const reviews = [];
	for (let i = 0; i < 12; i++) {
		const name = names[i % names.length];
		// 随机选择头像源
		const avatarType = Math.floor(Math.random() * 3);
		let avatar = '';
		if (avatarType === 0) {
			// DiceBear 卡通头像
			avatar = `https://api.dicebear.com/6.x/personas/svg?seed=${encodeURIComponent(name)}`;
		} else if (avatarType === 1) {
			// UI Avatars 彩色字母头像
			avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
		} else {
			// GitHub 头像
			avatar = `https://avatars.githubusercontent.com/u/${10000 + i}?v=4`;
		}
		reviews.push({
			author: name,
			avatar,
			rating: (Math.random() * 1.5 + 3.5).toFixed(1),
			position: positions[i % positions.length],
			round: rounds[i % rounds.length],
			pros: prosList[i % prosList.length],
			cons: consList[i % consList.length],
			advice: adviceList[i % adviceList.length],
			content: contentList[i % contentList.length],
			date: `2024-03-${(28 - i).toString().padStart(2, '0')}`,
			likes: Math.floor(Math.random() * 20 + 5),
			liked: false
		});
	}
	return reviews;
}

// 20个不同的公司点评数据
const allCompanyReviews = [
	{
		id: 1,
		name: '字节跳动',
		logo: 'https://picsum.photos/id/237/60/60',
		location: '北京·互联网',
		rating: 4.5,
		metrics: [
			{ label: '面试难度', value: 4.0, percent: 80 },
			{ label: '面试官专业度', value: 4.5, percent: 90 },
			{ label: '公司文化', value: 3.8, percent: 76 },
			{ label: '职业发展', value: 4.2, percent: 84 }
		],
		summary:
			'面试流程规范，面试官专业度高，问题具有挑战性，注重算法和系统设计能力。公司文化年轻化，节奏较快，适合喜欢挑战的求职者。',
		total: 328,
		reviews: generateReviews('字节跳动', 1)
	},
	{
		id: 2,
		name: '腾讯',
		logo: 'https://picsum.photos/id/239/60/60',
		location: '深圳·互联网',
		rating: 4.7,
		metrics: [
			{ label: '面试难度', value: 4.2, percent: 84 },
			{ label: '面试官专业度', value: 4.8, percent: 96 },
			{ label: '公司文化', value: 4.3, percent: 86 },
			{ label: '职业发展', value: 4.5, percent: 90 }
		],
		summary:
			'面试流程较长但规范，面试官注重项目经验和实际问题解决能力，问题具有业务场景导向。公司文化开放，福利完善，适合长期发展。',
		total: 295,
		reviews: generateReviews('腾讯', 21)
	},
	{
		id: 3,
		name: '阿里巴巴',
		logo: 'https://picsum.photos/id/240/60/60',
		location: '杭州·互联网',
		rating: 4.3,
		metrics: [
			{ label: '面试难度', value: 4.1, percent: 82 },
			{ label: '面试官专业度', value: 4.4, percent: 88 },
			{ label: '公司文化', value: 4.0, percent: 80 },
			{ label: '职业发展', value: 4.3, percent: 86 }
		],
		summary: '面试重视技术深度和业务理解，流程高效。公司文化强调创新和协作，晋升机制完善。',
		total: 312,
		reviews: generateReviews('阿里巴巴', 41)
	},
	{
		id: 4,
		name: '美团',
		logo: 'https://picsum.photos/id/241/60/60',
		location: '北京·互联网',
		rating: 4.1,
		metrics: [
			{ label: '面试难度', value: 3.9, percent: 78 },
			{ label: '面试官专业度', value: 4.2, percent: 84 },
			{ label: '公司文化', value: 4.1, percent: 82 },
			{ label: '职业发展', value: 4.0, percent: 80 }
		],
		summary: '面试流程清晰，注重实际项目经验。公司氛围开放，团队合作良好，发展空间大。',
		total: 210,
		reviews: generateReviews('美团', 61)
	},
	{
		id: 5,
		name: '华为',
		logo: 'https://picsum.photos/id/242/60/60',
		location: '深圳·通信',
		rating: 4.0,
		metrics: [
			{ label: '面试难度', value: 4.3, percent: 86 },
			{ label: '面试官专业度', value: 4.1, percent: 82 },
			{ label: '公司文化', value: 3.7, percent: 74 },
			{ label: '职业发展', value: 4.4, percent: 88 }
		],
		summary: '面试注重技术细节和抗压能力，流程严格。公司文化拼搏，晋升机会多，适合有追求的人。',
		total: 188,
		reviews: generateReviews('华为', 81)
	},
	{
		id: 6,
		name: '百度',
		logo: 'https://picsum.photos/id/243/60/60',
		location: '北京·互联网',
		rating: 3.9,
		metrics: [
			{ label: '面试难度', value: 3.8, percent: 76 },
			{ label: '面试官专业度', value: 4.0, percent: 80 },
			{ label: '公司文化', value: 3.6, percent: 72 },
			{ label: '职业发展', value: 3.9, percent: 78 }
		],
		summary: '面试流程规范，注重算法和数据结构。公司氛围技术导向，适合喜欢钻研的同学。',
		total: 156,
		reviews: generateReviews('百度', 101)
	},
	{
		id: 7,
		name: '京东',
		logo: 'https://picsum.photos/id/244/60/60',
		location: '北京·电商',
		rating: 4.2,
		metrics: [
			{ label: '面试难度', value: 4.0, percent: 80 },
			{ label: '面试官专业度', value: 4.3, percent: 86 },
			{ label: '公司文化', value: 4.1, percent: 82 },
			{ label: '职业发展', value: 4.2, percent: 84 }
		],
		summary: '面试流程高效，注重业务能力和团队协作。公司文化务实，福利待遇好。',
		total: 178,
		reviews: generateReviews('京东', 121)
	},
	{
		id: 8,
		name: '小米',
		logo: 'https://picsum.photos/id/245/60/60',
		location: '北京·智能硬件',
		rating: 4.0,
		metrics: [
			{ label: '面试难度', value: 3.7, percent: 74 },
			{ label: '面试官专业度', value: 4.2, percent: 84 },
			{ label: '公司文化', value: 4.2, percent: 84 },
			{ label: '职业发展', value: 4.0, percent: 80 }
		],
		summary: '面试流程灵活，注重创新能力。公司氛围年轻，适合喜欢新技术的同学。',
		total: 134,
		reviews: generateReviews('小米', 141)
	},
	{
		id: 9,
		name: '网易',
		logo: 'https://picsum.photos/id/246/60/60',
		location: '杭州·互联网',
		rating: 4.1,
		metrics: [
			{ label: '面试难度', value: 3.9, percent: 78 },
			{ label: '面试官专业度', value: 4.1, percent: 82 },
			{ label: '公司文化', value: 4.0, percent: 80 },
			{ label: '职业发展', value: 4.2, percent: 84 }
		],
		summary: '面试流程规范，注重沟通能力和团队协作。公司文化包容，发展机会多。',
		total: 120,
		reviews: generateReviews('网易', 161)
	},
	{
		id: 10,
		name: '滴滴出行',
		logo: 'https://picsum.photos/id/247/60/60',
		location: '北京·出行',
		rating: 3.8,
		metrics: [
			{ label: '面试难度', value: 3.6, percent: 72 },
			{ label: '面试官专业度', value: 3.9, percent: 78 },
			{ label: '公司文化', value: 3.7, percent: 74 },
			{ label: '职业发展', value: 3.8, percent: 76 }
		],
		summary: '面试流程高效，注重实际项目经验。公司氛围活跃，适合喜欢挑战的同学。',
		total: 102,
		reviews: generateReviews('滴滴出行', 181)
	},
	{
		id: 11,
		name: '快手',
		logo: 'https://picsum.photos/id/248/60/60',
		location: '北京·短视频',
		rating: 4.0,
		metrics: [
			{ label: '面试难度', value: 3.8, percent: 76 },
			{ label: '面试官专业度', value: 4.0, percent: 80 },
			{ label: '公司文化', value: 4.1, percent: 82 },
			{ label: '职业发展', value: 4.0, percent: 80 }
		],
		summary: '面试流程规范，注重创新能力。公司氛围轻松，适合喜欢创意的同学。',
		total: 98,
		reviews: generateReviews('快手', 201)
	},
	{
		id: 12,
		name: '携程',
		logo: 'https://picsum.photos/id/249/60/60',
		location: '上海·旅游',
		rating: 3.9,
		metrics: [
			{ label: '面试难度', value: 3.7, percent: 74 },
			{ label: '面试官专业度', value: 3.9, percent: 78 },
			{ label: '公司文化', value: 3.8, percent: 76 },
			{ label: '职业发展', value: 3.9, percent: 78 }
		],
		summary: '面试流程规范，注重服务意识和沟通能力。公司文化开放，适合喜欢旅游的同学。',
		total: 87,
		reviews: generateReviews('携程', 221)
	},
	{
		id: 13,
		name: 'B站',
		logo: 'https://picsum.photos/id/250/60/60',
		location: '上海·视频',
		rating: 4.2,
		metrics: [
			{ label: '面试难度', value: 4.0, percent: 80 },
			{ label: '面试官专业度', value: 4.3, percent: 86 },
			{ label: '公司文化', value: 4.4, percent: 88 },
			{ label: '职业发展', value: 4.1, percent: 82 }
		],
		summary: '面试流程灵活，注重创新和技术能力。公司氛围年轻，适合喜欢二次元文化的同学。',
		total: 110,
		reviews: generateReviews('B站', 241)
	},
	{
		id: 14,
		name: '拼多多',
		logo: 'https://picsum.photos/id/251/60/60',
		location: '上海·电商',
		rating: 3.7,
		metrics: [
			{ label: '面试难度', value: 3.9, percent: 78 },
			{ label: '面试官专业度', value: 3.8, percent: 76 },
			{ label: '公司文化', value: 3.5, percent: 70 },
			{ label: '职业发展', value: 3.9, percent: 78 }
		],
		summary: '面试流程高效，注重业务能力。公司文化节奏快，适合喜欢挑战的同学。',
		total: 95,
		reviews: generateReviews('拼多多', 261)
	},
	{
		id: 15,
		name: 'OPPO',
		logo: 'https://picsum.photos/id/252/60/60',
		location: '深圳·智能硬件',
		rating: 3.8,
		metrics: [
			{ label: '面试难度', value: 3.6, percent: 72 },
			{ label: '面试官专业度', value: 3.9, percent: 78 },
			{ label: '公司文化', value: 3.7, percent: 74 },
			{ label: '职业发展', value: 3.8, percent: 76 }
		],
		summary: '面试流程规范，注重创新能力。公司氛围开放，适合喜欢新技术的同学。',
		total: 80,
		reviews: generateReviews('OPPO', 281)
	},
	{
		id: 16,
		name: 'vivo',
		logo: 'https://picsum.photos/id/253/60/60',
		location: '东莞·智能硬件',
		rating: 3.9,
		metrics: [
			{ label: '面试难度', value: 3.7, percent: 74 },
			{ label: '面试官专业度', value: 4.0, percent: 80 },
			{ label: '公司文化', value: 3.8, percent: 76 },
			{ label: '职业发展', value: 3.9, percent: 78 }
		],
		summary: '面试流程规范，注重创新和沟通能力。公司氛围轻松，适合喜欢团队合作的同学。',
		total: 78,
		reviews: generateReviews('vivo', 301)
	},
	{
		id: 17,
		name: '海康威视',
		logo: 'https://picsum.photos/id/254/60/60',
		location: '杭州·安防',
		rating: 3.8,
		metrics: [
			{ label: '面试难度', value: 3.6, percent: 72 },
			{ label: '面试官专业度', value: 3.8, percent: 76 },
			{ label: '公司文化', value: 3.7, percent: 74 },
			{ label: '职业发展', value: 3.8, percent: 76 }
		],
		summary: '面试流程规范，注重技术能力。公司氛围务实，适合喜欢安防行业的同学。',
		total: 70,
		reviews: generateReviews('海康威视', 321)
	},
	{
		id: 18,
		name: '中兴通讯',
		logo: 'https://picsum.photos/id/255/60/60',
		location: '深圳·通信',
		rating: 3.7,
		metrics: [
			{ label: '面试难度', value: 3.8, percent: 76 },
			{ label: '面试官专业度', value: 3.7, percent: 74 },
			{ label: '公司文化', value: 3.6, percent: 72 },
			{ label: '职业发展', value: 3.7, percent: 74 }
		],
		summary: '面试流程规范，注重技术细节。公司氛围稳定，适合喜欢通信行业的同学。',
		total: 68,
		reviews: generateReviews('中兴通讯', 341)
	},
	{
		id: 19,
		name: '顺丰',
		logo: 'https://picsum.photos/id/256/60/60',
		location: '深圳·物流',
		rating: 3.8,
		metrics: [
			{ label: '面试难度', value: 3.7, percent: 74 },
			{ label: '面试官专业度', value: 3.8, percent: 76 },
			{ label: '公司文化', value: 3.7, percent: 74 },
			{ label: '职业发展', value: 3.8, percent: 76 }
		],
		summary: '面试流程规范，注重服务意识。公司氛围务实，适合喜欢物流行业的同学。',
		total: 66,
		reviews: generateReviews('顺丰', 361)
	},
	{
		id: 20,
		name: '中国移动',
		logo: 'https://picsum.photos/id/257/60/60',
		location: '北京·通信',
		rating: 3.9,
		metrics: [
			{ label: '面试难度', value: 3.8, percent: 76 },
			{ label: '面试官专业度', value: 3.9, percent: 78 },
			{ label: '公司文化', value: 3.8, percent: 76 },
			{ label: '职业发展', value: 3.9, percent: 78 }
		],
		summary: '面试流程规范，注重沟通能力。公司氛围稳定，适合喜欢通信行业的同学。',
		total: 72,
		reviews: generateReviews('中国移动', 381)
	}
];

function getRandomReviews(all, count) {
	const arr = [...all];
	const result = [];
	while (result.length < count && arr.length) {
		const idx = Math.floor(Math.random() * arr.length);
		result.push(arr.splice(idx, 1)[0]);
	}
	return result;
}

export default {
	name: 'Review',
	components: { SearchBar },
	setup() {
		const displayedReviews = ref(getRandomReviews(allCompanyReviews, 8));
		const showModal = ref(false);
		const modalCompany = ref(null);
		const visibleCount = ref(5); // 每次显示5条
		const loading = ref(false);
		const visibleReviews = computed(() => {
			if (!modalCompany.value || !modalCompany.value.reviews) return [];
			return modalCompany.value.reviews.slice(0, visibleCount.value);
		});
		function shuffleReviews() {
			displayedReviews.value = getRandomReviews(allCompanyReviews, 8);
		}
		function openModal(company) {
			modalCompany.value = company;
			showModal.value = true;
			visibleCount.value = Math.floor(Math.random() * 3) + 3; // 3~5条
			nextTick(() => {
				const modal = document.getElementById('review-modal-scroll');
				if (modal) modal.scrollTop = 0;
			});
		}
		function closeModal() {
			showModal.value = false;
			modalCompany.value = null;
		}
		// 无限滚动加载更多
		function onScroll(e) {
			const el = e.target;
			if (loading.value) return;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
				if (modalCompany.value && visibleCount.value < modalCompany.value.reviews.length) {
					loading.value = true;
					setTimeout(() => {
						visibleCount.value = Math.min(
							visibleCount.value + (Math.floor(Math.random() * 3) + 3),
							modalCompany.value.reviews.length
						);
						loading.value = false;
					}, 600);
				}
			}
		}
		function likeReview(item) {
			if (!item.liked) {
				item.likes++;
				item.liked = true;
			}
		}
		return {
			displayedReviews,
			shuffleReviews,
			showModal,
			modalCompany,
			openModal,
			closeModal,
			visibleReviews,
			visibleCount,
			loading,
			onScroll,
			likeReview
		};
	}
};
</script>
<style scoped>
@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
.animate-fade-in {
	animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
