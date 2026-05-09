export const cases = [
	{
		id: 1,
		name: '张三',
		avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
		position: '前端开发工程师',
		desc: '某大厂C端面试-岗位众裁热点事件。某候选人面试该岗位半年未果，众多BOSS、评审官参与讨论，分析岗位需求与候选人匹配度，探讨招聘难点与行业现状。',
		tag: '气众裁厅',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['高潜力'],
		dialog: [
			{
				from: 'candidate',
				text: '你们这岗位要求是不是太离谱了？招个人还要十八般武艺？',
				time: '09:21'
			},
			{
				from: 'judge',
				text: '你简历写得天花乱坠，实际面试一问三不知，怪谁？',
				time: '09:22'
			},
			{
				from: 'candidate',
				text: '面试官问题都不接地气，真有项目经验的都被你们刷掉了。',
				time: '09:23'
			},
			{ from: 'judge', text: '你要真有本事，怎么会半年都找不到工作？', time: '09:24' }
		],
		moreDialog: [
			{
				from: 'candidate',
				text: '我看你们就是在为难人，非得找个全能型选手才满意？',
				time: '09:25'
			},
			{
				from: 'judge',
				text: '企业要的是能解决问题的人，不是嘴上功夫厉害的。',
				time: '09:26'
			},
			{
				from: 'candidate',
				text: '你们面试流程拖拖拉拉，效率低下，怪不得招不到人。',
				time: '09:27'
			},
			{ from: 'judge', text: '你这种态度，进了公司也是定时炸弹。', time: '09:28' },
			{
				from: 'candidate',
				text: '我只是说实话，难道还不让人吐槽了？',
				time: '09:29'
			},
			{ from: 'judge', text: '你要真有实力，根本不用担心被刷。', time: '09:30' }
		],
		opinions: [
			// 示例：每个case都要有8~9条类似结构的评论
			// 下面以张三为例，其他case请仿照补充
			{
				name: '陈大牛',
				avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
				role: 'BOSS',
				tags: ['招聘量大', '专业度不差'],
				content: '人家岗位没问题，说不定你对岗位有误区。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '是调本',
				avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '叶大士',
				avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '王评审',
				avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '小李',
				avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: 'HR小王',
				avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '技术大V',
				avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '老王',
				avatar: 'https://randomuser.me/api/portraits/men/49.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '陈大牛',
				avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
				role: 'BOSS',
				content: '我觉得岗位要求确实高，但也不能全怪公司。',
				time: '09:21',
				likes: 12,
				replies: 3
			},
			{
				name: '小李',
				avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
				role: '普通用户',
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '09:22',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小王',
				avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
				role: 'HR',
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '09:23',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
				role: '普通用户',
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '09:24',
				likes: 12,
				replies: 3
			},
			{
				name: '技术大V',
				avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
				role: '技术大V',
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '09:25',
				likes: 12,
				replies: 3
			},
			{
				name: '老王',
				avatar: 'https://randomuser.me/api/portraits/men/49.jpg',
				role: 'BOSS',
				content: '说到底，还是能力和岗位不匹配。',
				time: '09:26',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 2,
		name: '李四',
		avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
		position: '产品经理',
		desc: '某互联网公司产品经理岗位众裁。候选人多次面试未通过，BOSS与评审官激烈讨论产品能力与团队协作问题。',
		tag: '产品争议',
		statusTag: { text: '争议', color: 'pink' },
		tags: ['争议'],
		dialog: [
			{
				from: 'candidate',
				text: '你们对产品经理的要求是不是太苛刻了？又要懂技术又要会运营？',
				time: '10:01'
			},
			{ from: 'judge', text: '你连基本的产品思维都没讲清楚，怎么带团队？', time: '10:02' },
			{ from: 'candidate', text: '我带过的项目都上线了，难道还不够资格？', time: '10:03' },
			{ from: 'judge', text: '上线不代表成功，数据一塌糊涂你心里没数？', time: '10:04' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们面试官一个比一个难缠，问题都不落地。', time: '10:05' },
			{ from: 'judge', text: '真正有能力的产品经理，早就被抢走了。', time: '10:06' },
			{
				from: 'candidate',
				text: '你们公司流程那么死板，怪不得产品做不起来。',
				time: '10:07'
			},
			{ from: 'judge', text: '你这种态度，来了也带不动团队。', time: '10:08' },
			{ from: 'candidate', text: '我只是实话实说，不想当老好人。', time: '10:09' },
			{ from: 'judge', text: '嘴硬没用，结果才是硬道理。', time: '10:10' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				content: '产品经理岗位确实卷，候选人压力也大。',
				time: '10:01',
				likes: 12,
				replies: 3
			},
			{
				name: '王评审',
				avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
				role: '评审官',
				content: '沟通能力和执行力都很重要，不能偏科。',
				time: '10:02',
				likes: 12,
				replies: 3
			},
			{
				name: '小张',
				avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
				role: '普通用户',
				content: '面试官问题太刁钻，换我也答不上来。',
				time: '10:03',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小李',
				avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
				role: 'HR',
				content: '岗位要求高是趋势，大家都要提升自己。',
				time: '10:04',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
				role: '普通用户',
				content: '产品经理太难做了，支持候选人。',
				time: '10:05',
				likes: 12,
				replies: 3
			},
			{
				name: '产品大V',
				avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
				role: '技术大V',
				content: '行业竞争激烈，企业和个人都不容易。',
				time: '10:06',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 3,
		name: '王五',
		avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
		position: 'Java后端工程师',
		desc: '后端岗位半年无人入职，众裁官质疑岗位要求过高，候选人也表达了自己的困惑。',
		tag: '后端专场',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['新手'],
		dialog: [
			{ from: 'candidate', text: '你们后端岗位是不是要求太变态了？', time: '11:11' },
			{ from: 'judge', text: '你连Spring底层都没搞明白，还敢说要求高？', time: '11:12' },
			{ from: 'candidate', text: '我项目经验不少，怎么就不行了？', time: '11:13' },
			{ from: 'judge', text: '经验水分太大，真遇到难题就露馅了。', time: '11:14' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们面试全是八股文，实际工作根本用不上。', time: '11:15' },
			{ from: 'judge', text: '八股文都答不上来，怎么做复杂系统？', time: '11:16' },
			{ from: 'candidate', text: '你们公司技术栈老旧，怪不得留不住人。', time: '11:17' },
			{ from: 'judge', text: '有本事你去大厂啊，别在这抱怨。', time: '11:18' },
			{ from: 'candidate', text: '我就是看不上你们的管理方式。', time: '11:19' },
			{ from: 'judge', text: '态度决定一切，难怪你总被刷。', time: '11:20' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 4,
		name: '赵六',
		avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
		position: '测试工程师',
		desc: '测试工程师岗位众裁，关于自动化测试与手工测试的争论不断，候选人与评审官观点激烈碰撞。',
		tag: '测试风暴',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['高潜力'],
		dialog: [
			{ from: 'candidate', text: '你们是不是太看不起手工测试了？', time: '12:01' },
			{ from: 'judge', text: '自动化都不会，怎么跟得上行业？', time: '12:02' },
			{ from: 'candidate', text: '自动化也不是万能的，出问题还得靠人。', time: '12:03' },
			{ from: 'judge', text: '你这思维太落后，难怪总被淘汰。', time: '12:04' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求全会，工资又不高，谁愿意来？', time: '12:05' },
			{ from: 'judge', text: '能力不够还挑三拣四，现实点吧。', time: '12:06' },
			{ from: 'candidate', text: '我就是不服，凭啥自动化就比手工高级？', time: '12:07' },
			{ from: 'judge', text: '市场说了算，不服你可以不来。', time: '12:08' },
			{ from: 'candidate', text: '你们公司迟早被淘汰。', time: '12:09' },
			{ from: 'judge', text: '你先担心自己能不能找到工作吧。', time: '12:10' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 12, // 12分钟
		assignedJudge: null,
		discussions: [
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				content: '产品经理岗位确实卷，候选人压力也大。',
				time: '10:01',
				likes: 12,
				replies: 3
			},
			{
				name: '王评审',
				avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
				role: '评审官',
				content: '沟通能力和执行力都很重要，不能偏科。',
				time: '10:02',
				likes: 12,
				replies: 3
			},
			{
				name: '小张',
				avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
				role: '普通用户',
				content: '面试官问题太刁钻，换我也答不上来。',
				time: '10:03',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小李',
				avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
				role: 'HR',
				content: '岗位要求高是趋势，大家都要提升自己。',
				time: '10:04',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
				role: '普通用户',
				content: '产品经理太难做了，支持候选人。',
				time: '10:05',
				likes: 12,
				replies: 3
			},
			{
				name: '产品大V',
				avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
				role: '技术大V',
				content: '行业竞争激烈，企业和个人都不容易。',
				time: '10:06',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 5,
		name: '钱七',
		avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
		position: 'UI设计师',
		desc: 'UI设计师岗位众裁，BOSS与设计师就"是否需要懂前端代码"展开激烈讨论。',
		tag: '设计之争',
		statusTag: { text: '争议', color: 'pink' },
		tags: ['争议'],
		dialog: [
			{ from: 'candidate', text: '设计师还要会写代码？你们是不是搞错了？', time: '13:21' },
			{ from: 'judge', text: '不会代码的设计师，怎么和开发沟通？', time: '13:22' },
			{ from: 'candidate', text: '设计是创意，不是搬砖。', time: '13:23' },
			{ from: 'judge', text: '创意没落地能力就是空谈。', time: '13:24' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求太多，工资又不涨，谁干？', time: '13:25' },
			{ from: 'judge', text: '能力配不上野心，怪谁？', time: '13:26' },
			{ from: 'candidate', text: '我就是不想被当工具人。', time: '13:27' },
			{ from: 'judge', text: '那你可以选择不来。', time: '13:28' },
			{ from: 'candidate', text: '你们公司迟早留不住人。', time: '13:29' },
			{ from: 'judge', text: '你先想想自己能不能进来再说吧。', time: '13:30' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: -35, // 已超时35分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 6,
		name: '孙八',
		avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
		position: '运维工程师',
		desc: '运维岗位众裁，候选人分享线上故障处理经验，评审官质疑运维自动化能力。',
		tag: '运维焦点',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['高潜力'],
		dialog: [
			{ from: 'candidate', text: '你们是不是太看重自动化了？', time: '14:01' },
			{ from: 'judge', text: '不会自动化，怎么提升效率？', time: '14:02' },
			{ from: 'candidate', text: '线上故障靠经验，不是靠脚本。', time: '14:03' },
			{ from: 'judge', text: '没自动化经验，迟早被淘汰。', time: '14:04' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求全能，工资却一般。', time: '14:05' },
			{ from: 'judge', text: '能力不够还挑三拣四。', time: '14:06' },
			{ from: 'candidate', text: '我就是不服，经验比你们面试官多。', time: '14:07' },
			{ from: 'judge', text: '嘴硬没用，技术才是王道。', time: '14:08' },
			{ from: 'candidate', text: '你们公司迟早被新技术淘汰。', time: '14:09' },
			{ from: 'judge', text: '你先担心自己能不能找到下家吧。', time: '14:10' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 7,
		name: '周九',
		avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
		position: '数据分析师',
		desc: '数据分析师岗位众裁，关于工具能力与编程能力的争论成为焦点。',
		tag: '数据分析',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['新手'],
		dialog: [
			{
				from: 'candidate',
				text: '你们是不是太看重编程了？分析不是只靠工具吗？',
				time: '15:11'
			},
			{ from: 'judge', text: '不会编程的数据分析师，怎么自动化处理大数据？', time: '15:12' },
			{ from: 'candidate', text: '我用Excel也能做出结果。', time: '15:13' },
			{ from: 'judge', text: '只会Excel，怎么和行业高手竞争？', time: '15:14' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求太多，薪资却一般。', time: '15:15' },
			{ from: 'judge', text: '能力不够还挑三拣四。', time: '15:16' },
			{ from: 'candidate', text: '我就是不服，数据分析不全靠代码。', time: '15:17' },
			{ from: 'judge', text: '市场说了算，不服你可以不来。', time: '15:18' },
			{ from: 'candidate', text: '你们公司迟早被淘汰。', time: '15:19' },
			{ from: 'judge', text: '你先担心自己能不能找到工作吧。', time: '15:20' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 8,
		name: '吴十',
		avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
		position: '产品助理',
		desc: '产品助理岗位众裁，BOSS与评审官讨论助理成长路径与核心能力。',
		tag: '助理成长',
		statusTag: { text: '争议', color: 'pink' },
		tags: ['争议'],
		dialog: [
			{ from: 'candidate', text: '你们是不是太看不起助理了？', time: '16:01' },
			{ from: 'judge', text: '助理没能力，怎么成长？', time: '16:02' },
			{ from: 'candidate', text: '我做的事情比产品经理还多。', time: '16:03' },
			{ from: 'judge', text: '做得多不代表做得好。', time: '16:04' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求全能，工资却一般。', time: '16:05' },
			{ from: 'judge', text: '能力不够还挑三拣四。', time: '16:06' },
			{ from: 'candidate', text: '我就是不服，助理也能独当一面。', time: '16:07' },
			{ from: 'judge', text: '嘴硬没用，结果才是硬道理。', time: '16:08' },
			{ from: 'candidate', text: '你们公司迟早留不住人。', time: '16:09' },
			{ from: 'judge', text: '你先想想自己能不能进来再说吧。', time: '16:10' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 9,
		name: '郑十一',
		avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
		position: '算法工程师',
		desc: '算法工程师岗位众裁，候选人与评审官围绕算法能力与工程实践展开讨论。',
		tag: '算法热议',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['高潜力'],
		dialog: [
			{
				from: 'candidate',
				text: '你们是不是太看重算法了？实际工作用不到那么多。',
				time: '17:21'
			},
			{ from: 'judge', text: '不会算法，怎么解决复杂问题？', time: '17:22' },
			{ from: 'candidate', text: '我项目经验丰富，算法不是唯一。', time: '17:23' },
			{ from: 'judge', text: '经验多没用，核心能力才重要。', time: '17:24' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们面试全是算法题，太脱离实际。', time: '17:25' },
			{ from: 'judge', text: '脱离算法，怎么做高性能系统？', time: '17:26' },
			{ from: 'candidate', text: '我就是不服，算法不是万能的。', time: '17:27' },
			{ from: 'judge', text: '市场说了算，不服你可以不来。', time: '17:28' },
			{ from: 'candidate', text: '你们公司迟早被淘汰。', time: '17:29' },
			{ from: 'judge', text: '你先担心自己能不能找到工作吧。', time: '17:30' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 10,
		name: '冯十二',
		avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
		position: '前端开发工程师',
		desc: '前端开发岗位众裁，关于全栈能力与专精前端的争论持续升温。',
		tag: '前端新秀',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['新手'],
		dialog: [
			{
				from: 'candidate',
				text: '你们是不是太看重全栈了？前端就不能专精吗？',
				time: '18:01'
			},
			{ from: 'judge', text: '不会后端的前端，怎么和全栈竞争？', time: '18:02' },
			{ from: 'candidate', text: '我前端技术很扎实，为什么还要会后端？', time: '18:03' },
			{ from: 'judge', text: '技术面太窄，难怪被刷。', time: '18:04' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求太多，薪资却一般。', time: '18:05' },
			{ from: 'judge', text: '能力不够还挑三拣四。', time: '18:06' },
			{ from: 'candidate', text: '我就是不服，专精也能做出好产品。', time: '18:07' },
			{ from: 'judge', text: '市场说了算，不服你可以不来。', time: '18:08' },
			{ from: 'candidate', text: '你们公司迟早被淘汰。', time: '18:09' },
			{ from: 'judge', text: '你先担心自己能不能找到工作吧。', time: '18:10' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 11,
		name: '褚十三',
		avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
		position: '后端开发工程师',
		desc: '后端开发岗位众裁，评审官与候选人就接口安全、数据加密等话题展开深入讨论。',
		tag: '后端安全',
		statusTag: { text: '争议', color: 'pink' },
		tags: ['争议'],
		dialog: [
			{
				from: 'candidate',
				text: '你们是不是太看重安全了？实际项目没那么多攻击。',
				time: '19:11'
			},
			{ from: 'judge', text: '安全意识差，迟早出大事。', time: '19:12' },
			{ from: 'candidate', text: '我项目都跑得好好的。', time: '19:13' },
			{ from: 'judge', text: '没出事是运气好，不代表没漏洞。', time: '19:14' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求太多，薪资却一般。', time: '19:15' },
			{ from: 'judge', text: '能力不够还挑三拣四。', time: '19:16' },
			{ from: 'candidate', text: '我就是不服，安全不是唯一标准。', time: '19:17' },
			{ from: 'judge', text: '市场说了算，不服你可以不来。', time: '19:18' },
			{ from: 'candidate', text: '你们公司迟早被淘汰。', time: '19:19' },
			{ from: 'judge', text: '你先担心自己能不能找到工作吧。', time: '19:20' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	},
	{
		id: 12,
		name: '卫十四',
		avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
		position: '测试工程师',
		desc: '测试工程师岗位众裁，候选人与评审官围绕测试用例设计方法、覆盖率等展开争论。',
		tag: '测试用例',
		statusTag: { text: '进行中', color: 'blue' },
		tags: ['高潜力'],
		dialog: [
			{
				from: 'candidate',
				text: '你们是不是太看重测试用例了？实际项目没那么多时间写。',
				time: '20:01'
			},
			{ from: 'judge', text: '测试用例写不好，出问题你负责？', time: '20:02' },
			{ from: 'candidate', text: '我项目都上线没出过事。', time: '20:03' },
			{ from: 'judge', text: '没出事是运气好，不代表没漏洞。', time: '20:04' }
		],
		moreDialog: [
			{ from: 'candidate', text: '你们要求太多，薪资却一般。', time: '20:05' },
			{ from: 'judge', text: '能力不够还挑三拣四。', time: '20:06' },
			{ from: 'candidate', text: '我就是不服，测试不是唯一标准。', time: '20:07' },
			{ from: 'judge', text: '市场说了算，不服你可以不来。', time: '20:08' },
			{ from: 'candidate', text: '你们公司迟早被淘汰。', time: '20:09' },
			{ from: 'judge', text: '你先担心自己能不能找到工作吧。', time: '20:10' }
		],
		opinions: [
			{
				name: '张三',
				avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度'],
				content: '岗位确实难招，市场环境影响大。',
				time: '06-18 18:22',
				likes: 249,
				comments: 178
			},
			{
				name: '李四',
				avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
				role: 'BOSS',
				tags: ['双方有问题', '岗位都不够大'],
				content: '双方都有问题，岗位确实有难度，建议不应过度指责候选人或岗位。',
				time: '06-18 18:35',
				likes: 158,
				comments: 76
			},
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				tags: ['招聘难', '岗位热度关键'],
				content:
					'确实，岗位难招，市场环境也有影响，建议岗位描述和要求更清晰，吸引更多合适人才。',
				time: '06-18 18:48',
				likes: 96,
				comments: 60
			},
			{
				name: '赵六',
				avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
				role: '评审官',
				tags: ['面试流程', '效率低'],
				content: '面试流程太繁琐，候选人等太久容易流失。',
				time: '06-18 19:02',
				likes: 77,
				comments: 41
			},
			{
				name: '钱七',
				avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
				role: '普通用户',
				tags: ['吐槽'],
				content: '半年没找到工作，可能真不是岗位的问题。',
				time: '06-18 19:15',
				likes: 52,
				comments: 23
			},
			{
				name: '孙八',
				avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
				role: 'HR',
				tags: ['招聘视角'],
				content: '岗位要求高是事实，但也要看候选人自身提升。',
				time: '06-18 19:30',
				likes: 38,
				comments: 12
			},
			{
				name: '周九',
				avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
				role: '普通用户',
				tags: ['火药味'],
				content: '面试官太苛刻，换个公司早就上岗了。',
				time: '06-18 19:45',
				likes: 27,
				comments: 8
			},
			{
				name: '吴十',
				avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
				role: '技术大V',
				tags: ['行业观察'],
				content: '现在前端岗位卷得厉害，企业和候选人都不容易。',
				time: '06-18 20:00',
				likes: 19,
				comments: 5
			},
			{
				name: '郑十一',
				avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
				role: 'BOSS',
				tags: ['直言不讳'],
				content: '说到底，还是能力和岗位不匹配。',
				time: '06-18 20:15',
				likes: 11,
				comments: 2
			}
		],
		status: 'pending',
		pendingTime: 125, // 2小时5分钟
		assignedJudge: null,
		discussions: [
			{
				name: '王五',
				avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
				role: 'BOSS',
				content: '后端岗位要求高，候选人要多加油。',
				time: '11:11',
				likes: 12,
				replies: 3
			},
			{
				name: '小赵',
				avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
				role: '普通用户',
				content: '八股文太多，实际工作根本用不上。',
				time: '11:12',
				likes: 12,
				replies: 3
			},
			{
				name: 'HR小陈',
				avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
				role: 'HR',
				content: '技术栈老旧确实影响招聘。',
				time: '11:13',
				likes: 12,
				replies: 3
			},
			{
				name: '匿名网友',
				avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
				role: '普通用户',
				content: '有本事就去大厂，别抱怨。',
				time: '11:14',
				likes: 12,
				replies: 3
			},
			{
				name: '后端大V',
				avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
				role: '技术大V',
				content: '后端岗位越来越卷，大家都不容易。',
				time: '11:15',
				likes: 12,
				replies: 3
			},
			{
				name: '老李',
				avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
				role: 'BOSS',
				content: '态度决定一切，支持企业。',
				time: '11:16',
				likes: 12,
				replies: 3
			}
		]
	}
];
