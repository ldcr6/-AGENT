<template>
	<div>
		<div class="flex items-end justify-between mt-6 mb-8 px-2">
			<div>
				<h2
					class="font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in mb-1"
				>
					互助问答社区
				</h2>
				<p class="text-gray-500 text-base md:text-lg max-w-2xl animate-fade-in">
					有面试相关问题？在这里提问，让有经验的前辈为你解答
				</p>
			</div>
			<search-bar />
		</div>
		<section id="qa" class="py-8 md:py-12 bg-white">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col lg:flex-row gap-8">
					<!-- 问答列表 -->
					<div class="w-full lg:w-2/3">
						<div class="bg-white rounded-xl shadow-md overflow-hidden">
							<div class="p-6 border-b border-gray-100">
								<div class="flex items-center justify-between">
									<h3 class="font-bold text-xl text-gray-900">热门面试问题</h3>
									<a href="#" class="text-blue-600 font-medium hover:underline"
										>查看全部问题</a
									>
								</div>
							</div>
							<!-- 问题列表 -->
							<div
								class="divide-y divide-gray-100"
								style="max-height: 600px; overflow-y: auto"
								@scroll="handleScroll"
							>
								<!-- 问题列表 -->
								<div
									v-for="q in questions.slice(0, visibleCount)"
									:key="q.id"
									class="p-6 hover:bg-gray-50 transition-colors"
								>
									<div class="flex items-start mb-4">
										<img
											:src="q.avatar"
											alt="用户头像"
											class="w-10 h-10 rounded-full mr-4"
										/>
										<div class="flex-1">
											<h4 class="font-semibold text-lg mb-2">
												<a
													href="#"
													class="hover:text-blue-600 transition-colors"
													>{{ q.title }}</a
												>
											</h4>
											<p class="text-gray-600 mb-4 line-clamp-2">
												{{ q.desc }}
											</p>
											<div class="flex items-center text-sm text-gray-500">
												<span class="flex items-center mr-4"
													><i class="fas fa-user mr-1"></i>
													{{ q.user }}</span
												>
												<span class="flex items-center mr-4"
													><i class="fas fa-clock mr-1"></i>
													{{ q.time }}</span
												>
												<span class="flex items-center"
													><i class="fas fa-comment mr-1"></i>
													{{ q.reply }}条回复</span
												>
											</div>
										</div>
									</div>
									<!-- 最佳回答 -->
									<div class="pl-14 mt-4 pt-4 border-l-2 border-blue-200">
										<div class="flex items-start">
											<img
												:src="q.answer.avatar"
												alt="回答者头像"
												class="w-8 h-8 rounded-full mr-3 mt-1"
											/>
											<div>
												<p class="text-gray-600 mb-2">
													{{ q.answer.content }}
												</p>
												<div class="text-sm text-gray-500">
													<span class="font-medium text-blue-600">{{
														q.answer.name
													}}</span>
													• {{ q.answer.role }} •
													{{ q.answer.answerTime }}
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 加载更多按钮已移除 -->
							</div>
						</div>
					</div>
					<!-- 侧边栏 - 提问框和热门标签 -->
					<div class="w-full lg:w-1/3">
						<!-- 提问框 -->
						<div class="bg-white rounded-xl shadow-md p-6 mb-6">
							<h3 class="font-bold text-lg text-gray-900 mb-4">有问题要问？</h3>
							<p class="text-gray-600 mb-4">在社区提问，让有经验的前辈为你解答</p>
							<button
								class="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center"
								@click="drawerVisible = true"
							>
								<i class="fas fa-pencil-alt mr-2"></i> 我要提问
							</button>
						</div>
						<!-- 热门标签 -->
						<div class="bg-white rounded-xl shadow-md p-6">
							<h3 class="font-bold text-lg text-gray-900 mb-4">热门面试标签</h3>
							<div class="flex flex-wrap gap-2">
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#算法题</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#自我介绍</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#项目经验</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#薪资谈判</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#HR面</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#技术面</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#面试技巧</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#跳槽建议</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#简历优化</a
								>
								<a
									href="#"
									class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
									>#背调</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 右侧滑出提问面板 -->
		<div v-if="drawerVisible" class="ask-drawer-mask" @click.self="closeDrawer">
			<div class="ask-drawer-panel">
				<div class="ask-drawer-header">
					<span>我要提问</span>
					<button class="ask-drawer-close" @click="closeDrawer">×</button>
				</div>
				<form class="ask-form" @submit.prevent="submitAsk">
					<div class="ask-form-item">
						<label>标题<span class="ask-required">*</span></label>
						<input
							v-model="askForm.title"
							maxlength="50"
							placeholder="请输入问题标题"
						/>
						<div v-if="askError.title" class="ask-error">{{ askError.title }}</div>
					</div>
					<div class="ask-form-item">
						<label>内容<span class="ask-required">*</span></label>
						<textarea
							v-model="askForm.content"
							maxlength="300"
							rows="5"
							placeholder="请详细描述你的问题"
						></textarea>
						<div v-if="askError.content" class="ask-error">{{ askError.content }}</div>
					</div>
					<div class="ask-form-item">
						<label>标签</label>
						<div class="ask-tags">
							<label v-for="tag in tagList" :key="tag" class="ask-tag">
								<input type="checkbox" :value="tag" v-model="askForm.tags" />
								{{ tag }}
							</label>
						</div>
					</div>
					<div class="ask-form-actions">
						<button type="button" @click="closeDrawer">取消</button>
						<button type="submit" class="ask-submit">提交</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import SearchBar from '/@/components/SearchBar.vue';
export default {
	name: 'Qacommunity',
	components: { SearchBar },
	data() {
		return {
			drawerVisible: false,
			askForm: {
				title: '',
				content: '',
				tags: []
			},
			askError: {
				title: '',
				content: ''
			},
			tagList: [
				'算法题',
				'自我介绍',
				'项目经验',
				'薪资谈判',
				'HR面',
				'技术面',
				'面试技巧',
				'跳槽建议',
				'简历优化',
				'背调'
			],
			visibleCount: 4,
			questions: [
				{
					id: 1,
					user: '王同学',
					avatar: 'https://picsum.photos/id/64/40/40',
					title: '如何应对技术面试中的算法题？有哪些高效准备方法？',
					desc: '最近在准备技术面试，算法题一直是我的弱项，请问大家有没有高效的准备方法？哪些算法类型是面试中最常考的？',
					time: '2天前',
					reply: 18,
					answer: {
						avatar: 'https://picsum.photos/id/91/40/40',
						name: '李明',
						role: '资深后端开发',
						answerTime: '3天前',
						content:
							'建议从高频题型入手，比如链表、二叉树、动态规划等，LeetCode上的热题100是很好的起点。另外，多总结解题思路，理解时间和空间复杂度...'
					}
				},
				{
					id: 2,
					user: '张同学',
					avatar: 'https://picsum.photos/id/26/40/40',
					title: '面试中被问到"为什么选择我们公司"，该如何回答比较得体？',
					desc: '每次面试到最后，面试官都会问这个问题，我每次回答都觉得很生硬，请问大家有没有什么好的回答思路？需要提前做哪些准备？',
					time: '3天前',
					reply: 24,
					answer: {
						avatar: 'https://picsum.photos/id/433/40/40',
						name: '王HR',
						role: '人力资源经理',
						answerTime: '2天前',
						content:
							'这个问题主要考察你对公司的了解和求职动机，建议从公司业务、发展前景、文化价值观和个人职业规划的契合点来回答，避免泛泛而谈...'
					}
				},
				{
					id: 3,
					user: '刘同学',
					avatar: 'https://picsum.photos/id/177/40/40',
					title: '互联网公司的技术面试，项目经验和算法能力哪个更重要？',
					desc: '目前在准备互联网公司的技术岗位面试，我的项目经验比较丰富，但算法能力一般，请问面试官更看重哪方面？需要如何平衡准备？',
					time: '5天前',
					reply: 15,
					answer: {
						avatar: 'https://picsum.photos/id/211/40/40',
						name: '陈工',
						role: '技术主管',
						answerTime: '4天前',
						content:
							'两者都很重要，但不同公司和岗位侧重点不同。初级岗位可能更看重算法基础，中高级岗位则更看重项目经验和解决实际问题的能力...'
					}
				},
				{
					id: 4,
					user: '李同学',
					avatar: 'https://picsum.photos/id/101/40/40',
					title: '如何准备自我介绍，才能让面试官印象深刻？',
					desc: '每次自我介绍都很紧张，内容也很普通，有没有什么技巧可以让自我介绍更有亮点？',
					time: '1天前',
					reply: 12,
					answer: {
						avatar: 'https://picsum.photos/id/102/40/40',
						name: '赵老师',
						role: '面试官',
						answerTime: '1天前',
						content:
							'自我介绍要突出与岗位的匹配度，结合自身经历讲故事，简明扼要，突出亮点和成果...'
					}
				},
				{
					id: 5,
					user: '孙同学',
					avatar: 'https://picsum.photos/id/103/40/40',
					title: '面试官问职业规划，怎么答才不踩雷？',
					desc: '每次被问到职业规划都很迷茫，怎么回答才不会让面试官觉得目标不清晰？',
					time: '2天前',
					reply: 10,
					answer: {
						avatar: 'https://picsum.photos/id/104/40/40',
						name: '李主管',
						role: '技术主管',
						answerTime: '1天前',
						content:
							'职业规划要结合岗位发展路径，展现你的成长意愿和学习能力，避免说“没想好”或“随遇而安”...'
					}
				},
				{
					id: 6,
					user: '周同学',
					avatar: 'https://picsum.photos/id/105/40/40',
					title: '技术面试中如何展示项目亮点？',
					desc: '项目经验写了很多，面试时怎么讲才能突出亮点？',
					time: '3天前',
					reply: 8,
					answer: {
						avatar: 'https://picsum.photos/id/106/40/40',
						name: '王工',
						role: '高级开发',
						answerTime: '2天前',
						content:
							'挑选与岗位最相关的项目，突出你的核心贡献和解决难题的能力，最好有量化成果支撑...'
					}
				},
				{
					id: 7,
					user: '钱同学',
					avatar: 'https://picsum.photos/id/107/40/40',
					title: '面试时如何应对不会的问题？',
					desc: '遇到不会的问题总是很紧张，怎么应对才不扣分？',
					time: '4天前',
					reply: 7,
					answer: {
						avatar: 'https://picsum.photos/id/108/40/40',
						name: '刘经理',
						role: '面试官',
						answerTime: '3天前',
						content:
							'坦诚表达不会，并展示你的学习思路和解决问题的态度，切忌编造或强行答题...'
					}
				},
				{
					id: 8,
					user: '吴同学',
					avatar: 'https://picsum.photos/id/109/40/40',
					title: '面试官问你最大的优点和缺点，怎么答？',
					desc: '优点和缺点怎么说才不落俗套？',
					time: '2天前',
					reply: 9,
					answer: {
						avatar: 'https://picsum.photos/id/110/40/40',
						name: '孙HR',
						role: '人力资源',
						answerTime: '1天前',
						content:
							'优点要结合岗位需求，缺点可以说成长中的问题并附带改进措施，避免说“太追求完美”这类套路...'
					}
				},
				{
					id: 9,
					user: '郑同学',
					avatar: 'https://picsum.photos/id/111/40/40',
					title: '如何准备技术面试中的自我介绍？',
					desc: '自我介绍总是很紧张，有没有模板或技巧？',
					time: '1天前',
					reply: 11,
					answer: {
						avatar: 'https://picsum.photos/id/112/40/40',
						name: '王老师',
						role: '面试官',
						answerTime: '1天前',
						content:
							'自我介绍要突出与岗位的匹配度，结合自身经历讲故事，简明扼要，突出亮点和成果...'
					}
				},
				{
					id: 10,
					user: '冯同学',
					avatar: 'https://picsum.photos/id/113/40/40',
					title: '面试官问你为什么离职，怎么答？',
					desc: '离职原因怎么说才不会被误解？',
					time: '2天前',
					reply: 8,
					answer: {
						avatar: 'https://picsum.photos/id/114/40/40',
						name: '李HR',
						role: '人力资源',
						answerTime: '1天前',
						content:
							'离职原因要真实但积极，避免抱怨前公司，强调个人成长和职业发展需求...'
					}
				},
				{
					id: 11,
					user: '褚同学',
					avatar: 'https://picsum.photos/id/115/40/40',
					title: '面试时如何展示自己的学习能力？',
					desc: '学习能力怎么体现才有说服力？',
					time: '3天前',
					reply: 7,
					answer: {
						avatar: 'https://picsum.photos/id/116/40/40',
						name: '赵主管',
						role: '技术主管',
						answerTime: '2天前',
						content:
							'结合实际案例，讲述你如何快速掌握新技术、解决新问题，最好有具体成果支撑...'
					}
				},
				{
					id: 12,
					user: '卫同学',
					avatar: 'https://picsum.photos/id/117/40/40',
					title: '面试官问你期望薪资，怎么答？',
					desc: '期望薪资怎么说才不会被压价？',
					time: '2天前',
					reply: 6,
					answer: {
						avatar: 'https://picsum.photos/id/118/40/40',
						name: '钱HR',
						role: '人力资源',
						answerTime: '1天前',
						content:
							'可以结合市场行情和自身能力给出合理区间，表达对岗位的兴趣和成长空间的重视...'
					}
				},
				{
					id: 13,
					user: '蒋同学',
					avatar: 'https://picsum.photos/id/119/40/40',
					title: '面试时如何应对多轮面试？',
					desc: '多轮面试怎么准备才能不掉链子？',
					time: '3天前',
					reply: 5,
					answer: {
						avatar: 'https://picsum.photos/id/120/40/40',
						name: '孙主管',
						role: '技术主管',
						answerTime: '2天前',
						content:
							'每轮面试前都要针对岗位和面试官做功课，准备不同侧重的内容，保持良好心态...'
					}
				},
				{
					id: 14,
					user: '沈同学',
					avatar: 'https://picsum.photos/id/121/40/40',
					title: '面试官问你对加班怎么看，怎么答？',
					desc: '加班问题怎么回答才不被扣分？',
					time: '2天前',
					reply: 6,
					answer: {
						avatar: 'https://picsum.photos/id/122/40/40',
						name: '李经理',
						role: '面试官',
						answerTime: '1天前',
						content:
							'可以表达对高效工作的追求，理解特殊时期加班，但不鼓励无效加班，注重工作与生活平衡...'
					}
				},
				{
					id: 15,
					user: '韩同学',
					avatar: 'https://picsum.photos/id/123/40/40',
					title: '面试时如何展示团队协作能力？',
					desc: '团队协作能力怎么体现？',
					time: '3天前',
					reply: 7,
					answer: {
						avatar: 'https://picsum.photos/id/124/40/40',
						name: '王主管',
						role: '技术主管',
						answerTime: '2天前',
						content:
							'结合项目经历，讲述你如何与团队成员协作、沟通、解决冲突，突出你的责任心和贡献...'
					}
				},
				{
					id: 16,
					user: '杨同学',
					avatar: 'https://picsum.photos/id/125/40/40',
					title: '面试官问你对未来三年的规划，怎么答？',
					desc: '三年规划怎么说才有说服力？',
					time: '2天前',
					reply: 6,
					answer: {
						avatar: 'https://picsum.photos/id/126/40/40',
						name: '赵经理',
						role: '面试官',
						answerTime: '1天前',
						content: '结合岗位发展路径，展现你的成长意愿和学习能力，目标要具体可落地...'
					}
				},
				{
					id: 17,
					user: '朱同学',
					avatar: 'https://picsum.photos/id/127/40/40',
					title: '面试时如何应对压力测试？',
					desc: '压力测试环节怎么准备？',
					time: '3天前',
					reply: 5,
					answer: {
						avatar: 'https://picsum.photos/id/128/40/40',
						name: '钱主管',
						role: '技术主管',
						answerTime: '2天前',
						content: '提前准备好应对压力的案例，展示你的抗压能力和积极心态...'
					}
				},
				{
					id: 18,
					user: '秦同学',
					avatar: 'https://picsum.photos/id/129/40/40',
					title: '面试官问你对公司有哪些了解，怎么答？',
					desc: '公司信息怎么准备？',
					time: '2天前',
					reply: 6,
					answer: {
						avatar: 'https://picsum.photos/id/130/40/40',
						name: '孙经理',
						role: '面试官',
						answerTime: '1天前',
						content: '提前了解公司业务、文化、发展方向，结合岗位谈你的理解和兴趣...'
					}
				},
				{
					id: 19,
					user: '尤同学',
					avatar: 'https://picsum.photos/id/131/40/40',
					title: '面试时如何展示自己的创新能力？',
					desc: '创新能力怎么体现？',
					time: '3天前',
					reply: 5,
					answer: {
						avatar: 'https://picsum.photos/id/132/40/40',
						name: '李主管',
						role: '技术主管',
						answerTime: '2天前',
						content: '结合项目或比赛经历，讲述你如何提出新思路、优化流程、解决难题...'
					}
				},
				{
					id: 20,
					user: '何同学',
					avatar: 'https://picsum.photos/id/133/40/40',
					title: '面试官问你对行业趋势怎么看，怎么答？',
					desc: '行业趋势怎么说才显得有深度？',
					time: '2天前',
					reply: 6,
					answer: {
						avatar: 'https://picsum.photos/id/134/40/40',
						name: '王经理',
						role: '面试官',
						answerTime: '1天前',
						content:
							'结合行业发展动态、技术趋势，谈谈你的观察和思考，最好能结合岗位实际...'
					}
				}
			]
		};
	},
	methods: {
		loadMore() {
			if (this.visibleCount < this.questions.length) {
				this.visibleCount = Math.min(this.visibleCount + 4, this.questions.length);
			}
		},
		handleScroll(e) {
			const el = e.target;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
				this.loadMore();
			}
		},
		closeDrawer() {
			this.drawerVisible = false;
			this.resetForm();
		},
		resetForm() {
			this.askForm = { title: '', content: '', tags: [] };
			this.askError = { title: '', content: '' };
		},
		submitAsk() {
			this.askError = { title: '', content: '' };
			let valid = true;
			if (!this.askForm.title.trim()) {
				this.askError.title = '请输入标题';
				valid = false;
			}
			if (!this.askForm.content.trim()) {
				this.askError.content = '请输入内容';
				valid = false;
			}
			if (!valid) return;
			const newQ = {
				id: Date.now(),
				user: '匿名用户',
				avatar: 'https://picsum.photos/seed/' + Math.floor(Math.random() * 1000) + '/40/40',
				title: this.askForm.title,
				desc: this.askForm.content,
				time: '刚刚',
				reply: 0,
				answer: {
					avatar:
						'https://picsum.photos/seed/' + Math.floor(Math.random() * 1000) + '/40/40',
					name: '等待解答',
					role: '',
					answerTime: '',
					content: '暂无回答，快来抢首答吧！'
				},
				tags: this.askForm.tags
			};
			this.questions.unshift(newQ);
			this.visibleCount++;
			this.drawerVisible = false;
			this.$nextTick(this.resetForm);
			// 可选：弹窗提示
			if (window && window.alert) window.alert('提问成功，等待解答！');
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
/* 右侧滑出提问面板样式 */
.ask-drawer-mask {
	position: fixed;
	z-index: 9999;
	inset: 0;
	background: rgba(0, 0, 0, 0.15);
	display: flex;
	justify-content: flex-end;
}
.ask-drawer-panel {
	background: #fff;
	width: 400px;
	max-width: 90vw;
	height: 100vh;
	box-shadow: -2px 0 16px rgba(0, 0, 0, 0.08);
	animation: ask-drawer-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	display: flex;
	flex-direction: column;
}
@keyframes ask-drawer-in {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}
.ask-drawer-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 24px 10px 24px;
	font-size: 18px;
	font-weight: bold;
	border-bottom: 1px solid #f0f0f0;
}
.ask-drawer-close {
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	color: #888;
	transition: color 0.2s;
}
.ask-drawer-close:hover {
	color: #333;
}
.ask-form {
	padding: 20px 24px;
	flex: 1;
	display: flex;
	flex-direction: column;
}
.ask-form-item {
	margin-bottom: 18px;
	display: flex;
	flex-direction: column;
}
.ask-form-item label {
	font-weight: 500;
	margin-bottom: 6px;
}
.ask-required {
	color: #e53e3e;
	margin-left: 2px;
}
.ask-form-item input,
.ask-form-item textarea {
	border: 1px solid #e5e7eb;
	border-radius: 6px;
	padding: 8px 10px;
	font-size: 15px;
	outline: none;
	transition: border 0.2s;
}
.ask-form-item input:focus,
.ask-form-item textarea:focus {
	border-color: #2563eb;
}
.ask-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.ask-tag {
	font-size: 14px;
	background: #f3f4f6;
	border-radius: 12px;
	padding: 2px 10px;
	cursor: pointer;
	user-select: none;
}
.ask-tag input[type='checkbox'] {
	margin-right: 4px;
}
.ask-form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-top: 10px;
}
.ask-form-actions button {
	padding: 7px 18px;
	border: none;
	border-radius: 6px;
	font-size: 15px;
	cursor: pointer;
	background: #e5e7eb;
	color: #333;
	transition: background 0.2s;
}
.ask-form-actions .ask-submit {
	background: #2563eb;
	color: #fff;
}
.ask-form-actions .ask-submit:hover {
	background: #1d4ed8;
}
.ask-error {
	color: #e53e3e;
	font-size: 13px;
	margin-top: 2px;
}
</style>
