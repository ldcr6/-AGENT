<template>
	<div>
		<div class="flex items-end justify-between mt-6 mb-8 px-2">
			<div>
				<h2
					class="font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in mb-1"
				>
					精华内容聚合
				</h2>
				<p class="text-gray-500 text-base md:text-lg max-w-2xl animate-fade-in">
					精选热门面经、优质问答和高赞点评，助你快速获取关键信息
				</p>
			</div>
			<search-bar />
		</div>
		<section id="highlights" class="py-8 md:py-12 bg-gray-50">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div
						v-for="(item, idx) in highlights"
						:key="idx"
						class="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
						@click="showDetail(item)"
					>
						<div class="relative h-48">
							<img
								:src="item.img"
								alt="精华内容"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
							></div>
							<div class="absolute bottom-4 left-4 right-4 text-white">
								<span
									class="px-2 py-1 text-white text-xs rounded-full"
									:class="item.tagColor"
									>{{ item.tag }}</span
								>
								<h3 class="font-bold text-lg mt-2">{{ item.title }}</h3>
							</div>
						</div>
						<div class="p-6">
							<p class="text-gray-600 mb-4 line-clamp-3">{{ item.desc }}</p>
							<div class="flex items-center justify-between">
								<div class="flex items-center text-sm text-gray-500">
									<img
										:src="item.userAvatar"
										alt="用户头像"
										class="w-6 h-6 rounded-full mr-2"
									/>
									<span>{{ item.userName }}</span>
								</div>
								<div class="flex items-center space-x-3 text-sm">
									<span class="flex items-center text-gray-500"
										><i class="fas fa-eye mr-1"></i> {{ item.views }}</span
									>
									<span class="flex items-center text-gray-500"
										><i class="fas fa-thumbs-up mr-1"></i>
										{{ item.likes }}</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 自定义弹窗 -->
		<div v-if="dialogVisible" class="fixed inset-0 z-50 flex items-center justify-center">
			<div class="absolute inset-0 bg-black opacity-40" @click="closeDialog"></div>
			<div
				class="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fade-in max-h-[90vh] overflow-y-auto"
			>
				<button
					@click="closeDialog"
					class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
				>
					×
				</button>
				<div v-if="currentItem">
					<img :src="currentItem.img" class="w-full mb-4 rounded" />
					<h2 class="font-bold text-xl mb-2">{{ currentItem.title }}</h2>
					<p class="mb-4 text-gray-700">{{ currentItem.desc }}</p>
					<div class="text-blue-500 text-sm mb-4 cursor-pointer select-none">
						查看详情 &gt;
					</div>
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<img :src="currentItem.userAvatar" class="w-6 h-6 rounded-full mr-2" />
						<span>{{ currentItem.userName }}</span>
					</div>
					<div class="flex space-x-4 text-gray-500 text-sm mb-4 items-center">
						<span><i class="fas fa-eye mr-1"></i> {{ currentItem.views }}</span>
						<span class="flex items-center">
							<i
								class="fas fa-thumbs-up mr-1 cursor-pointer hover:text-blue-500 transition"
								@click.stop="like"
							></i>
							{{ currentItem.likes + tempLikes }}
						</span>
					</div>
					<!-- 评论区 -->
					<div class="border-t pt-4 mt-4">
						<h3 class="font-bold text-lg mb-2">评论</h3>
						<div
							v-if="currentItem.comments && currentItem.comments.length"
							class="space-y-3 max-h-40 overflow-y-auto pr-2"
						>
							<div
								v-for="(c, i) in showAllComments
									? currentItem.comments
									: currentItem.comments.slice(0, 2)"
								:key="i"
								class="flex items-start space-x-2"
							>
								<img :src="c.avatar" class="w-8 h-8 rounded-full mt-1" />
								<div class="flex-1 bg-gray-100 rounded-lg px-3 py-2">
									<div class="flex items-center justify-between">
										<span class="font-semibold text-sm">{{ c.user }}</span>
										<span class="text-xs text-gray-400">{{ c.time }}</span>
									</div>
									<p class="text-gray-700 text-sm mt-1">{{ c.content }}</p>
								</div>
							</div>
							<div
								v-if="!showAllComments && currentItem.comments.length > 2"
								class="text-center mt-2"
							>
								<button
									@click="showMoreComments"
									class="text-blue-500 hover:underline text-sm"
								>
									查看更多
								</button>
							</div>
						</div>
						<div v-else class="text-gray-400 text-sm">暂无评论</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import SearchBar from '/@/components/SearchBar.vue';
export default {
	name: 'Highlights',
	components: { SearchBar },
	data() {
		return {
			highlights: [
				{
					img: 'https://picsum.photos/id/180/600/400',
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '谷歌软件工程师面试全记录：从OA到onsite',
					desc: '详细记录了谷歌软件工程师岗位的面试全过程，包括在线测评、电话面试和现场面试，分享了算法题、系统设计题和行为面试问题...',
					userAvatar: 'https://picsum.photos/id/433/40/40',
					userName: '匿名用户',
					views: '2.4k',
					likes: 328,
					comments: [
						{
							user: '小明',
							avatar: 'https://picsum.photos/id/101/40/40',
							content: '写得很详细，受益匪浅！',
							time: '2小时前'
						},
						{
							user: '面试达人',
							avatar: 'https://picsum.photos/id/102/40/40',
							content: '感谢分享，收藏了！',
							time: '1小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/239/600/400',
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '应届生如何准备互联网大厂的技术面试？',
					desc: '来自多位大厂面试官和资深工程师的经验分享，涵盖简历准备、技术复习、算法刷题、项目梳理和面试技巧等多个方面...',
					userAvatar: 'https://picsum.photos/id/91/40/40',
					userName: '李工',
					views: '3.1k',
					likes: 412,
					comments: [
						{
							user: '面试达人',
							avatar: 'https://picsum.photos/id/102/40/40',
							content: '很实用的经验分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '谢谢李工，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/119/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: '字节跳动面试体验：流程、难度与面试官风格',
					desc: '汇总了多位求职者的字节跳动面试点评，详细分析了不同部门的面试流程、题目难度和面试官风格，为准备面试的同学提供参考...',
					userAvatar: 'https://picsum.photos/id/26/40/40',
					userName: '匿名用户',
					views: '1.8k',
					likes: 286,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '很真实的面试体验！',
							time: '3天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '感谢分享，对我帮助很大！',
							time: '2天前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/201/600/400',
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '阿里P6面试真题解析与经验总结',
					desc: '详细梳理了阿里P6岗位的面试流程，涵盖算法、系统设计、项目经验等核心问题...',
					userAvatar: 'https://picsum.photos/id/301/40/40',
					userName: '王同学',
					views: '1.2k',
					likes: 188,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/106/40/40',
							content: '很详细的解析，受益匪浅！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/107/40/40',
							content: '感谢分享，收藏了！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/202/600/400',
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '如何高效准备算法面试？',
					desc: '总结了高频算法题型、刷题方法和面试技巧，适合初学者和进阶者参考...',
					userAvatar: 'https://picsum.photos/id/302/40/40',
					userName: '算法达人',
					views: '2.0k',
					likes: 256,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/108/40/40',
							content: '很实用的技巧分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/109/40/40',
							content: '感谢分享，我会好好练习！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/203/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: '腾讯面试官谈面试常见误区',
					desc: '腾讯面试官分享面试中常见的误区和应对策略，帮助你避开雷区，提升面试表现...',
					userAvatar: 'https://picsum.photos/id/303/40/40',
					userName: '面试官A',
					views: '1.5k',
					likes: 199,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/110/40/40',
							content: '很实用的建议！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/111/40/40',
							content: '感谢分享，我会注意！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/204/600/400',
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '美团后端开发面试流程与经验',
					desc: '美团后端开发岗位面试流程详解，包含技术面、HR面及常见问题...',
					userAvatar: 'https://picsum.photos/id/304/40/40',
					userName: '小美',
					views: '1.7k',
					likes: 210,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/112/40/40',
							content: '很详细的流程分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/113/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/230/600/400', // 更换图片
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '大厂面试常见算法题有哪些？',
					desc: '盘点大厂面试高频算法题及解题思路，助你高效备战技术面...',
					userAvatar: 'https://picsum.photos/id/320/40/40',
					userName: '面霸',
					views: '2.2k',
					likes: 278,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/114/40/40',
							content: '很实用的算法题分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/115/40/40',
							content: '感谢分享，我会好好练习！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/206/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: '网易前端面试官的建议',
					desc: '网易前端面试官分享面试技巧和注意事项，帮助你提升面试通过率...',
					userAvatar: 'https://picsum.photos/id/306/40/40',
					userName: '前端面试官',
					views: '1.3k',
					likes: 167,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/116/40/40',
							content: '很实用的建议！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/117/40/40',
							content: '感谢分享，我会注意！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/231/600/400', // 更换图片
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '华为软件开发面试全流程',
					desc: '华为软件开发岗位面试流程、考察重点及经验分享...',
					userAvatar: 'https://picsum.photos/id/321/40/40',
					userName: '华为er',
					views: '1.9k',
					likes: 233,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/118/40/40',
							content: '很详细的流程分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/119/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/208/600/400',
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '面试项目经验如何讲述更有亮点？',
					desc: '总结项目经验讲述的技巧和常见误区，助你在面试中脱颖而出...',
					userAvatar: 'https://picsum.photos/id/308/40/40',
					userName: '项目达人',
					views: '1.6k',
					likes: 201,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/120/40/40',
							content: '很实用的经验分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/121/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/209/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: '小红书面试体验与总结',
					desc: '小红书面试流程、题型及面试官风格点评，适合互联网岗位求职者参考...',
					userAvatar: 'https://picsum.photos/id/309/40/40',
					userName: '匿名用户',
					views: '1.1k',
					likes: 145,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/122/40/40',
							content: '很真实的面试体验！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/123/40/40',
							content: '感谢分享，对我帮助很大！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/210/600/400',
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '京东技术岗面试全攻略',
					desc: '京东技术岗面试流程、常见问题及应对策略分享...',
					userAvatar: 'https://picsum.photos/id/310/40/40',
					userName: '京东er',
					views: '1.4k',
					likes: 176,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/124/40/40',
							content: '很详细的攻略分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/125/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/211/600/400',
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '面试自我介绍怎么说更有吸引力？',
					desc: '面试自我介绍的结构、亮点和注意事项，助你赢得面试官好感...',
					userAvatar: 'https://picsum.photos/id/311/40/40',
					userName: '面试达人',
					views: '1.8k',
					likes: 220,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/126/40/40',
							content: '很实用的经验分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/127/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/212/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: 'B站前端面试官的建议',
					desc: 'B站前端面试官分享面试技巧和常见问题，适合前端岗位求职者...',
					userAvatar: 'https://picsum.photos/id/312/40/40',
					userName: 'B站面试官',
					views: '1.2k',
					likes: 154,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/128/40/40',
							content: '很实用的建议！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/129/40/40',
							content: '感谢分享，我会注意！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/213/600/400',
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '百度算法岗面试经验分享',
					desc: '百度算法岗面试流程、题型及经验总结，适合算法方向求职者...',
					userAvatar: 'https://picsum.photos/id/313/40/40',
					userName: '算法小白',
					views: '1.6k',
					likes: 198,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/130/40/40',
							content: '很实用的经验分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/131/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/214/600/400',
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '面试中如何展示项目亮点？',
					desc: '项目亮点展示技巧和常见误区，助你在面试中脱颖而出...',
					userAvatar: 'https://picsum.photos/id/314/40/40',
					userName: '项目达人',
					views: '1.5k',
					likes: 183,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/132/40/40',
							content: '很实用的经验分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/133/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/215/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: '滴滴面试官谈面试技巧',
					desc: '滴滴面试官分享面试技巧和注意事项，适合互联网岗位求职者...',
					userAvatar: 'https://picsum.photos/id/315/40/40',
					userName: '滴滴面试官',
					views: '1.3k',
					likes: 162,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/134/40/40',
							content: '很实用的技巧分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/135/40/40',
							content: '感谢分享，我会好好练习！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/216/600/400',
					tag: '热门面经',
					tagColor: 'bg-blue-500',
					title: '快手后端开发面试经验',
					desc: '快手后端开发岗位面试流程、常见问题及经验分享...',
					userAvatar: 'https://picsum.photos/id/316/40/40',
					userName: '快手er',
					views: '1.1k',
					likes: 140,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/136/40/40',
							content: '很详细的流程分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/137/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/217/600/400',
					tag: '优质问答',
					tagColor: 'bg-green-500',
					title: '面试官最看重哪些能力？',
					desc: '总结面试官最看重的能力和表现，助你精准备战面试...',
					userAvatar: 'https://picsum.photos/id/317/40/40',
					userName: '面试达人',
					views: '1.7k',
					likes: 209,
					comments: [
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/138/40/40',
							content: '很实用的经验分享！',
							time: '1天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/139/40/40',
							content: '感谢分享，我会好好准备！',
							time: '2小时前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				},
				{
					img: 'https://picsum.photos/id/218/600/400',
					tag: '高赞点评',
					tagColor: 'bg-purple-500',
					title: '小米面试体验与总结',
					desc: '小米面试流程、题型及面试官风格点评，适合互联网岗位求职者参考...',
					userAvatar: 'https://picsum.photos/id/318/40/40',
					userName: '匿名用户',
					views: '1.0k',
					likes: 132,
					comments: [
						{
							user: '小米粉',
							avatar: 'https://picsum.photos/id/120/40/40',
							content: '很真实的面试体验！',
							time: '3天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/121/40/40',
							content: '对我帮助很大，谢谢！',
							time: '2天前'
						},
						{
							user: '小红',
							avatar: 'https://picsum.photos/id/103/40/40',
							content: '内容很有帮助！',
							time: '3天前'
						},
						{
							user: '大牛',
							avatar: 'https://picsum.photos/id/104/40/40',
							content: '太棒了，点赞！',
							time: '5天前'
						},
						{
							user: '匿名',
							avatar: 'https://picsum.photos/id/105/40/40',
							content: '希望有更多类似内容。',
							time: '1周前'
						}
					]
				}
			],
			dialogVisible: false,
			currentItem: null,
			tempLikes: 0,
			showAllComments: false
		};
	},
	methods: {
		showDetail(item) {
			this.currentItem = item;
			this.dialogVisible = true;
			this.tempLikes = 0;
			this.showAllComments = false;
		},
		closeDialog() {
			this.dialogVisible = false;
		},
		like() {
			this.tempLikes++;
		},
		showMoreComments() {
			this.showAllComments = true;
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
