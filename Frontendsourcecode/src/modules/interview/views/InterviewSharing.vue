<template>
	<div>
		<div class="flex items-end justify-between mt-6 mb-8 px-2">
			<div>
				<h2
					class="font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in mb-1"
				>
					真实面经分享
				</h2>
				<p class="text-gray-500 text-base md:text-lg max-w-2xl animate-fade-in">
					来自各行各业求职者的真实面试经历，帮你提前了解面试流程和问题
				</p>
			</div>
			<search-bar />
		</div>
		<section id="sharing" class="py-8 md:py-12 bg-white">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<!-- 筛选标签 -->
				<div class="flex flex-wrap justify-center gap-2 mb-10">
					<button
						v-for="tag in allTags"
						:key="tag.value"
						:class="[
							'px-4 py-2 rounded-full text-sm font-medium',
							tag.value === selectedTag
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
						]"
						@click="selectTag(tag.value)"
					>
						{{ tag.label }}
					</button>
				</div>
				<!-- 面经卡片网格 -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div
						v-for="(card, idx) in visibleCards"
						:key="card.company + card.position + card.date + idx"
						class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
					>
						<div class="p-6">
							<div class="flex items-center mb-4">
								<div
									:class="[
										'w-10 h-10 rounded-full flex items-center justify-center mr-3',
										card.avatarBg
									]"
								>
									<i class="fas fa-building" :class="card.iconColor"></i>
								</div>
								<h3
									class="font-semibold text-lg group-hover:text-blue-600 transition-colors"
								>
									{{ card.company }} - {{ card.position }}
								</h3>
							</div>
							<div class="flex items-center text-sm text-gray-500 mb-4">
								<span class="flex items-center mr-4"
									><i class="fas fa-clock mr-1"></i> {{ card.rounds }}</span
								>
								<span class="flex items-center"
									><i class="fas fa-calendar-alt mr-1"></i> {{ card.date }}</span
								>
							</div>
							<p class="text-gray-600 mb-4 line-clamp-3">{{ card.content }}</p>
							<div class="flex items-center justify-between">
								<div class="flex items-center text-sm text-gray-500">
									<img
										:src="card.avatar"
										alt="用户头像"
										class="w-6 h-6 rounded-full mr-2"
									/>
									<span>{{ card.user }}</span>
								</div>
								<div class="flex items-center space-x-4 text-sm">
									<span
										class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
										><i class="fas fa-thumbs-up mr-1"></i>
										{{ card.likes }}</span
									>
									<span
										class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
										><i class="fas fa-comment mr-1"></i>
										{{ card.comments }}</span
									>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-6 py-3">
							<div class="flex flex-wrap gap-2">
								<span
									v-for="tag in card.tags"
									:key="tag"
									class="text-xs px-2 py-1 rounded-full"
									:class="tagColor(tag)"
									>{{ tag }}</span
								>
							</div>
						</div>
					</div>
				</div>
				<div class="text-center mt-12" v-if="canLoadMore">
					<button
						class="px-6 py-3 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
						@click="loadMore"
					>
						查看更多面经 <i class="fas fa-chevron-right ml-2"></i>
					</button>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
import SearchBar from '/@/components/SearchBar.vue';

const ALL_TAGS = [
	{ label: '全部', value: 'all' },
	{ label: '互联网', value: '互联网' },
	{ label: '金融', value: '金融' },
	{ label: '科技', value: '科技' },
	{ label: '外企', value: '外企' },
	{ label: '国企', value: '国企' }
];

const ALL_CARDS = [
	{
		company: '字节跳动',
		position: '后端开发',
		rounds: '3轮技术面',
		date: '2025-06-15',
		content:
			'分享了字节跳动后端开发岗位的三面经历，包括算法题、分布式系统设计和项目经验提问，面试官很专业，问题有深度但也给了提示空间...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/64/40/40',
		likes: 128,
		comments: 36,
		tags: ['互联网', '后端开发', '算法题'],
		avatarBg: 'bg-blue-100',
		iconColor: 'text-blue-600'
	},
	{
		company: '腾讯',
		position: '产品经理',
		rounds: '2轮业务面+1轮HR面',
		date: '2025-06-10',
		content:
			'详细记录了腾讯产品经理岗位的面试过程，包括用户画像分析、竞品分析和实际场景问题，面试官很注重逻辑思维和产品sense...',
		user: '李明',
		avatar: 'https://picsum.photos/id/91/40/40',
		likes: 96,
		comments: 24,
		tags: ['互联网', '产品经理', '竞品分析'],
		avatarBg: 'bg-green-100',
		iconColor: 'text-green-600'
	},
	{
		company: '阿里巴巴',
		position: '数据分析师',
		rounds: '4轮面试',
		date: '2025-06-05',
		content:
			'分享了阿里巴巴数据分析师岗位的面试经历，包括SQL题、AB测试设计和业务理解问题，强调了数据驱动思维的重要性...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/26/40/40',
		likes: 156,
		comments: 42,
		tags: ['互联网', '数据分析师', 'AB测试'],
		avatarBg: 'bg-purple-100',
		iconColor: 'text-purple-600'
	},
	{
		company: '华为',
		position: '前端开发',
		rounds: '2轮技术面+1轮主管面',
		date: '2025-05-28',
		content:
			'分享了华为前端开发岗位的面试流程，涉及Vue、性能优化、团队协作等内容，整体氛围友好，注重项目实战经验...',
		user: '王婷',
		avatar: 'https://picsum.photos/id/101/40/40',
		likes: 87,
		comments: 19,
		tags: ['科技', '前端开发', 'Vue'],
		avatarBg: 'bg-yellow-100',
		iconColor: 'text-yellow-600'
	},
	{
		company: '美团',
		position: '测试工程师',
		rounds: '1轮技术面+1轮HR面',
		date: '2025-05-20',
		content:
			'美团测试工程师岗位，主要考察自动化测试、接口测试和沟通能力，面试官很耐心，问题贴合实际工作场景...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/102/40/40',
		likes: 54,
		comments: 11,
		tags: ['互联网', '测试工程师', '自动化测试'],
		avatarBg: 'bg-red-100',
		iconColor: 'text-red-600'
	},
	{
		company: '百度',
		position: '算法工程师',
		rounds: '3轮技术面+1轮主管面',
		date: '2025-05-18',
		content:
			'百度算法工程师岗位，考察深度学习、模型优化、项目实战，面试官专业，注重理论与实践结合...',
		user: '张伟',
		avatar: 'https://picsum.photos/id/103/40/40',
		likes: 73,
		comments: 15,
		tags: ['科技', '算法工程师', '深度学习'],
		avatarBg: 'bg-pink-100',
		iconColor: 'text-pink-600'
	},
	{
		company: '京东',
		position: '运维工程师',
		rounds: '2轮技术面',
		date: '2025-05-15',
		content:
			'京东运维工程师岗位，面试内容涵盖自动化运维、故障排查、脚本编写，注重实操能力和应急响应...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/104/40/40',
		likes: 61,
		comments: 9,
		tags: ['互联网', '运维工程师', '自动化运维'],
		avatarBg: 'bg-indigo-100',
		iconColor: 'text-indigo-600'
	},
	{
		company: '网易',
		position: 'UI设计师',
		rounds: '2轮作品集面试',
		date: '2025-05-12',
		content:
			'网易UI设计师岗位，面试主要围绕作品集、设计思路、用户体验展开，面试官很注重细节和创新能力...',
		user: '林静',
		avatar: 'https://picsum.photos/id/105/40/40',
		likes: 48,
		comments: 7,
		tags: ['互联网', 'UI设计师', '用户体验'],
		avatarBg: 'bg-teal-100',
		iconColor: 'text-teal-600'
	},
	{
		company: '携程',
		position: '数据开发',
		rounds: '2轮技术面',
		date: '2025-05-10',
		content:
			'携程数据开发岗位，面试内容包括ETL流程、数据仓库设计、SQL优化，注重数据处理能力和业务理解...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/106/40/40',
		likes: 39,
		comments: 6,
		tags: ['互联网', '数据开发', 'SQL优化'],
		avatarBg: 'bg-orange-100',
		iconColor: 'text-orange-600'
	},
	{
		company: '中国银行',
		position: '金融分析师',
		rounds: '1轮群面+1轮主管面',
		date: '2025-05-08',
		content:
			'中国银行金融分析师岗位，面试内容涵盖金融市场分析、风险控制、案例分析，注重逻辑思维和表达能力...',
		user: '李娜',
		avatar: 'https://picsum.photos/id/107/40/40',
		likes: 45,
		comments: 8,
		tags: ['金融', '金融分析师', '风险控制'],
		avatarBg: 'bg-gray-100',
		iconColor: 'text-gray-600'
	},
	{
		company: '腾讯',
		position: '产品经理',
		rounds: '2轮业务面+1轮HR面',
		date: '2025-06-10',
		content:
			'详细记录了腾讯产品经理岗位的面试过程，包括用户画像分析、竞品分析和实际场景问题，面试官很注重逻辑思维和产品sense...',
		user: '李明',
		avatar: 'https://picsum.photos/id/91/40/40',
		likes: 96,
		comments: 24,
		tags: ['互联网', '产品经理', '竞品分析'],
		avatarBg: 'bg-green-100',
		iconColor: 'text-green-600'
	},
	{
		company: '阿里巴巴',
		position: '数据分析师',
		rounds: '4轮面试',
		date: '2025-06-05',
		content:
			'分享了阿里巴巴数据分析师岗位的面试经历，包括SQL题、AB测试设计和业务理解问题，强调了数据驱动思维的重要性...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/26/40/40',
		likes: 156,
		comments: 42,
		tags: ['互联网', '数据分析师', 'AB测试'],
		avatarBg: 'bg-purple-100',
		iconColor: 'text-purple-600'
	},
	{
		company: '华为',
		position: '前端开发',
		rounds: '2轮技术面+1轮主管面',
		date: '2025-05-28',
		content:
			'分享了华为前端开发岗位的面试流程，涉及Vue、性能优化、团队协作等内容，整体氛围友好，注重项目实战经验...',
		user: '王婷',
		avatar: 'https://picsum.photos/id/101/40/40',
		likes: 87,
		comments: 19,
		tags: ['科技', '前端开发', 'Vue'],
		avatarBg: 'bg-yellow-100',
		iconColor: 'text-yellow-600'
	},
	{
		company: '美团',
		position: '测试工程师',
		rounds: '1轮技术面+1轮HR面',
		date: '2025-05-20',
		content:
			'美团测试工程师岗位，主要考察自动化测试、接口测试和沟通能力，面试官很耐心，问题贴合实际工作场景...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/102/40/40',
		likes: 54,
		comments: 11,
		tags: ['互联网', '测试工程师', '自动化测试'],
		avatarBg: 'bg-red-100',
		iconColor: 'text-red-600'
	},
	{
		company: '百度',
		position: '算法工程师',
		rounds: '3轮技术面+1轮主管面',
		date: '2025-05-18',
		content:
			'百度算法工程师岗位，考察深度学习、模型优化、项目实战，面试官专业，注重理论与实践结合...',
		user: '张伟',
		avatar: 'https://picsum.photos/id/103/40/40',
		likes: 73,
		comments: 15,
		tags: ['科技', '算法工程师', '深度学习'],
		avatarBg: 'bg-pink-100',
		iconColor: 'text-pink-600'
	},
	{
		company: '京东',
		position: '运维工程师',
		rounds: '2轮技术面',
		date: '2025-05-15',
		content:
			'京东运维工程师岗位，面试内容涵盖自动化运维、故障排查、脚本编写，注重实操能力和应急响应...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/104/40/40',
		likes: 61,
		comments: 9,
		tags: ['互联网', '运维工程师', '自动化运维'],
		avatarBg: 'bg-indigo-100',
		iconColor: 'text-indigo-600'
	},
	{
		company: '网易',
		position: 'UI设计师',
		rounds: '2轮作品集面试',
		date: '2025-05-12',
		content:
			'网易UI设计师岗位，面试主要围绕作品集、设计思路、用户体验展开，面试官很注重细节和创新能力...',
		user: '林静',
		avatar: 'https://picsum.photos/id/105/40/40',
		likes: 48,
		comments: 7,
		tags: ['互联网', 'UI设计师', '用户体验'],
		avatarBg: 'bg-teal-100',
		iconColor: 'text-teal-600'
	},
	{
		company: '携程',
		position: '数据开发',
		rounds: '2轮技术面',
		date: '2025-05-10',
		content:
			'携程数据开发岗位，面试内容包括ETL流程、数据仓库设计、SQL优化，注重数据处理能力和业务理解...',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/106/40/40',
		likes: 39,
		comments: 6,
		tags: ['互联网', '数据开发', 'SQL优化'],
		avatarBg: 'bg-orange-100',
		iconColor: 'text-orange-600'
	},
	{
		company: '中国银行',
		position: '金融分析师',
		rounds: '1轮群面+1轮主管面',
		date: '2025-05-08',
		content:
			'中国银行金融分析师岗位，面试内容涵盖金融市场分析、风险控制、案例分析，注重逻辑思维和表达能力...',
		user: '李娜',
		avatar: 'https://picsum.photos/id/107/40/40',
		likes: 45,
		comments: 8,
		tags: ['金融', '金融分析师', '风险控制'],
		avatarBg: 'bg-gray-100',
		iconColor: 'text-gray-600'
	},
	{
		company: '微软',
		position: '软件工程师',
		rounds: '2轮技术面+1轮HR面',
		date: '2025-06-01',
		content: '微软软件工程师面试，注重算法、系统设计和英文沟通，氛围轻松，面试官很友好。',
		user: 'Lucy',
		avatar: 'https://picsum.photos/id/201/40/40',
		likes: 77,
		comments: 13,
		tags: ['外企', '软件工程师', '算法题'],
		avatarBg: 'bg-purple-100',
		iconColor: 'text-purple-600'
	},
	{
		company: '谷歌',
		position: '产品经理',
		rounds: '3轮面试',
		date: '2025-05-25',
		content: '谷歌产品经理面试，考察产品思维、创新能力和跨文化沟通，英文面试为主。',
		user: 'Tom',
		avatar: 'https://picsum.photos/id/202/40/40',
		likes: 65,
		comments: 10,
		tags: ['外企', '产品经理', '创新'],
		avatarBg: 'bg-blue-100',
		iconColor: 'text-blue-600'
	},
	{
		company: 'IBM',
		position: '数据分析师',
		rounds: '2轮技术面',
		date: '2025-05-18',
		content: 'IBM数据分析师面试，注重数据建模、统计分析和英文表达，面试官专业。',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/203/40/40',
		likes: 52,
		comments: 8,
		tags: ['外企', '数据分析师', '数据建模'],
		avatarBg: 'bg-indigo-100',
		iconColor: 'text-indigo-600'
	},
	{
		company: '埃森哲',
		position: '咨询顾问',
		rounds: '1轮群面+1轮主管面',
		date: '2025-05-10',
		content: '埃森哲咨询顾问面试，注重案例分析、团队协作和英文表达，氛围紧张但收获大。',
		user: '王磊',
		avatar: 'https://picsum.photos/id/204/40/40',
		likes: 41,
		comments: 6,
		tags: ['外企', '咨询顾问', '案例分析'],
		avatarBg: 'bg-green-100',
		iconColor: 'text-green-600'
	},
	{
		company: '宝洁',
		position: '市场专员',
		rounds: '2轮面试',
		date: '2025-05-05',
		content: '宝洁市场专员面试，考察市场分析、品牌认知和英文沟通，面试官很有亲和力。',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/205/40/40',
		likes: 38,
		comments: 5,
		tags: ['外企', '市场专员', '品牌'],
		avatarBg: 'bg-yellow-100',
		iconColor: 'text-yellow-600'
	},
	{
		company: '中国移动',
		position: '网络工程师',
		rounds: '2轮技术面',
		date: '2025-06-02',
		content: '中国移动网络工程师面试，注重网络基础、项目经验和团队协作，流程规范。',
		user: '李强',
		avatar: 'https://picsum.photos/id/206/40/40',
		likes: 59,
		comments: 9,
		tags: ['国企', '网络工程师', '项目经验'],
		avatarBg: 'bg-green-100',
		iconColor: 'text-green-600'
	},
	{
		company: '中国电信',
		position: '运维工程师',
		rounds: '1轮技术面+1轮主管面',
		date: '2025-05-27',
		content: '中国电信运维工程师面试，考察Linux运维、脚本编写和应急响应，注重实操。',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/207/40/40',
		likes: 44,
		comments: 7,
		tags: ['国企', '运维工程师', 'Linux'],
		avatarBg: 'bg-indigo-100',
		iconColor: 'text-indigo-600'
	},
	{
		company: '中国石油',
		position: '财务专员',
		rounds: '2轮面试',
		date: '2025-05-20',
		content: '中国石油财务专员面试，注重财务基础、报表分析和职业规划，流程严谨。',
		user: '王芳',
		avatar: 'https://picsum.photos/id/208/40/40',
		likes: 36,
		comments: 4,
		tags: ['国企', '财务专员', '报表分析'],
		avatarBg: 'bg-gray-100',
		iconColor: 'text-gray-600'
	},
	{
		company: '中国联通',
		position: '市场专员',
		rounds: '1轮群面+1轮主管面',
		date: '2025-05-15',
		content: '中国联通市场专员面试，考察市场策划、沟通能力和团队合作，氛围较轻松。',
		user: '匿名用户',
		avatar: 'https://picsum.photos/id/209/40/40',
		likes: 29,
		comments: 3,
		tags: ['国企', '市场专员', '市场策划'],
		avatarBg: 'bg-yellow-100',
		iconColor: 'text-yellow-600'
	},
	{
		company: '国家电网',
		position: '工程师',
		rounds: '2轮技术面',
		date: '2025-05-10',
		content: '国家电网工程师面试，注重电力基础、项目经历和安全规范，流程标准。',
		user: '赵云',
		avatar: 'https://picsum.photos/id/210/40/40',
		likes: 33,
		comments: 4,
		tags: ['国企', '工程师', '电力'],
		avatarBg: 'bg-blue-100',
		iconColor: 'text-blue-600'
	}
];

export default {
	name: 'InterviewSharing',
	components: { SearchBar },
	data() {
		return {
			allTags: ALL_TAGS,
			allCards: ALL_CARDS,
			selectedTag: 'all',
			showCount: 9
		};
	},
	computed: {
		filteredCards() {
			if (this.selectedTag === 'all') return this.allCards;
			return this.allCards.filter(card => card.tags.includes(this.selectedTag));
		},
		visibleCards() {
			return this.filteredCards.slice(0, this.showCount);
		},
		canLoadMore() {
			return this.showCount < this.filteredCards.length;
		}
	},
	methods: {
		selectTag(tag) {
			this.selectedTag = tag;
			this.showCount = 9;
		},
		loadMore() {
			this.showCount += 6;
		},
		tagColor(tag) {
			// 标签颜色映射
			const map = {
				互联网: 'bg-blue-100 text-blue-800',
				金融: 'bg-gray-100 text-gray-800',
				科技: 'bg-green-100 text-green-800',
				外企: 'bg-purple-100 text-purple-800',
				国企: 'bg-yellow-100 text-yellow-800',
				后端开发: 'bg-green-100 text-green-800',
				前端开发: 'bg-yellow-100 text-yellow-800',
				算法题: 'bg-purple-100 text-purple-800',
				产品经理: 'bg-green-100 text-green-800',
				竞品分析: 'bg-purple-100 text-purple-800',
				数据分析师: 'bg-green-100 text-green-800',
				AB测试: 'bg-purple-100 text-purple-800',
				测试工程师: 'bg-red-100 text-red-800',
				自动化测试: 'bg-green-100 text-green-800',
				运维工程师: 'bg-indigo-100 text-indigo-800',
				UI设计师: 'bg-teal-100 text-teal-800',
				用户体验: 'bg-yellow-100 text-yellow-800',
				数据开发: 'bg-orange-100 text-orange-800',
				SQL优化: 'bg-green-100 text-green-800',
				金融分析师: 'bg-gray-100 text-gray-800',
				风险控制: 'bg-green-100 text-green-800'
			};
			return map[tag] || 'bg-gray-100 text-gray-800';
		}
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
