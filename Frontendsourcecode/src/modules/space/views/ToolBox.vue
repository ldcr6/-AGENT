<template>
	<div class="tool-box-container">
		<!-- 分类导航 -->
		<div class="category-nav">
			<div
				v-for="category in categories"
				:key="category.value"
				:class="['nav-item', { active: currentCategory === category.value }]"
				@click="currentCategory = category.value"
			>
				{{ category.label }}
			</div>
		</div>
		<hr />

		<!-- 工具列表 -->
		<!-- 修改后的工具列表 -->
		<div class="tool-list">
			<div v-for="tool in filteredTools" :key="tool.id" class="tool-card">
				<div class="card-image">
					<img :src="tool.icon" :alt="tool.name" class="tool-image" v-if="tool.icon" />
					<!-- <div v-else class="image-placeholder">🔧</div> -->
					<span v-if="tool.tag" class="tool-tag">{{ tool.tag }}</span>
				</div>

				<div class="card-header">
					<!-- 删除按钮 -->
					<button class="delete-btn" @click="deleteTool(tool.id)">×</button>
					<h3>{{ tool.name }}</h3>
					<p class="description">{{ tool.description }}</p>
				</div>
				<!-- 文字描述区域 -->
				<div class="card-description" v-if="tool.descriptions">
					<div class="title-line">{{ tool.descriptions[0] }}</div>
					<div class="subtitle-line">{{ tool.descriptions[1] }}</div>
				</div>

				<div class="card-footer">
					<div class="card-author">
						<span class="author-tag">@</span>
						{{ tool.author }}
					</div>

					<div class="card-actions">
						<button
							class="action-btn"
							@click="toggleFavorite(tool)"
							@mouseenter="hoverFavorite = tool.id"
							@mouseleave="hoverFavorite = null"
						>
							<span class="icon">
								<span v-if="tool.isFavorited" class="heart-solid">❤️</span>
								<span v-else>🤍</span>
							</span>
							<span class="text">
								{{ getFavoriteText(tool) }}
							</span>
						</button>
						

						<a :href="tool.link" target="_blank" class="experience-btn"> 体验 </a>
					</div>
				</div>
			</div>
			<div class="tool-card add-btn" @click="showDialog = true">
				<div class="add-content">
					<span class="plus-icon">+</span>
					<h3>添加新应用</h3>
				</div>
			</div>

			<!-- 添加应用弹窗 -->
			<transition name="fade">
				<div v-if="showDialog" class="dialog-mask">
					<div class="dialog-wrapper">
						<div class="dialog-content">
							<h3>添加新工具</h3>

							<div class="form-item">
								<label>工具名称</label>
								<input
									v-model="newTool.name"
									required
									placeholder="请输入工具名称（最多15字，必填）"
									maxlength="15"
								/>
							</div>
							<div class="form-item">
								<label>简要介绍</label>
								<input
									v-model="newTool.descriptions[0]"
									placeholder="请输入简要介绍（最多30字）"
									maxlength="30"
								/>
							</div>

							<div class="form-item">
								<label>体验链接</label>
								<input v-model="newTool.link" type="url" />
							</div>
							<div class="form-item">
								<label>分类</label>
								<select v-model="newTool.category" multiple>
									<option
										v-for="category in categories"
										:value="category.value"
										:key="category.value"
									>
										{{ category.label }}
									</option>
								</select>
							</div>

							<div class="form-item">
								<label>图标URL</label>
								<input v-model="newTool.icon" />
							</div>

							<div class="dialog-actions">
								<button @click="cancelAdd">取消</button>
								<button @click="confirmAdd">完成</button>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			hoverFavorite: null, // 悬浮收藏状态
			currentCategory: 'all', // 当前选中分类
			
			categories: [
				{ label: '全部', value: 'all' },
				{ label: '热门', value: 'hot' },
				{ label: '生活', value: 'life' },
				{ label: '社交', value: 'Social' },
				{ label: '科技', value: 'technology' }
			],
			tools: [
				{
					id: 1,
					name: 'DeepSeek R1',
					link: 'https://tbox.alipay.com/experience/202502AP4zEf00230963?id=20250201RA000044',
					category: ['technology', 'hot'],
					icon: '../../../../public/assets/images/deepseek.png',
					tag: 'HOT',
					descriptions: [
						'DeepSeek R1 联网搜索版',
						'DeepSeek R1 满血版 + 联网搜索，强强联合'
					],
					author: 'Sharaka',
					isFavorited: false, // 收藏状态
				
				},
				{
					id: 2,
					name: '秘塔AI',
					link: 'https://metaso.cn/',
					category: ['life', 'technology'],
					icon: '../../../../public/assets/images/mita.png',
					descriptions: [
						'不知道怎么描述...',
						'写文翻译，它超会！秘塔 AI - 论文、文案轻松拿捏，多语言互译又快又准，文字工作的神队友 😎'
					],
					author: 'xfa',
					isFavorited: false, // 收藏状态
				
				},
				{
					id: 3,
					name: 'chatGPT',
					link: 'https://openai.com/chatgpt/overview/',
					category: [ 'technology','hot'],
					icon: '../../../../public/assets/images/gpt.png',
					tag: 'HOT',
					descriptions: [
						'AI 无所不能',
						'话中有话，它肚里有货！ 解锁超强语言理解与生成能力，复杂问题深度剖析，多样文本信手拈来，智能交互新高度  🌐'
					],
					author: '小浩老师'
				},
				{
					id: 4,
					name: 'Meta AI',
					link: 'https://www.meta.ai/?utm_source=ai-bot.cn',
					category: ['life', 'Social','hot'],
					icon: '../../../../public/assets/images/meta.png',

					descriptions: [
						'会玩又会聊，创意没烦恼！',
						'Meta AI - 图像生成有一手，文本交互超丝滑，人机互动玩出新花样 🌟'
					],

					author: '布洛布洛尼？',
					isFavorited: false, // 收藏状态
					
				},
				{
					id: 5,
					name: '火山翻译',
					link: 'https://translate.volcengine.com/',
					category: ['finance', 'Social','hot'],
					icon: '../../../../public/assets/images/huoshanfanyi.png',
					descriptions: ['语言障碍？一键消！', '火山翻译 - 多语言实时翻，文档网页全覆盖，精准高效破壁垒，沟通顺畅无压力 🌋'],
					tag: 'HOT',
					author: 'nanshan',
					isFavorited: false, // 收藏状态
				
				}
			],
			// 添加应用弹窗状态
			showDialog: false,
			newTool: {
				id: null,
				name: '',
				link: '',
				category: [],
				icon: '',
				descriptions: ['', ''],
				author: '用户',
				isFavorited: false
			}
		};
	},

	methods: {
		// 增加工具方法
		generateUniqueId() {
			return Date.now() + Math.floor(Math.random() * 1000);
		},
		confirmAdd() {
			// 简单验证
			if (!this.newTool.name || this.newTool.category.length === 0) {
				alert('请填写必填项');
				return;
			}

			// 生成唯一ID
			this.newTool.id = this.generateUniqueId();

			// 添加到工具列表
			this.tools.unshift({ ...this.newTool });

			// 重置表单
			this.cancelAdd();
		},
		cancelAdd() {
			this.showDialog = false;
			this.newTool = {
				id: null,
				name: '',
				link: '',
				category: [],
				icon: '',
				descriptions: ['', ''],
				author: '用户',
				isFavorited: false
			};
		},
		// 删除方法
		deleteTool(toolId) {
			if (confirm('确定要删除这个工具吗？')) {
				this.tools = this.tools.filter(tool => tool.id !== toolId);
			}
		},

		// 收藏功能方法
		toggleFavorite(tool) {
			tool.isFavorited = !tool.isFavorited;
		},
		getFavoriteText(tool) {
			if (this.hoverFavorite === tool.id && tool.isFavorited) {
				return '取消收藏';
			}
			return tool.isFavorited ? '已收藏' : '收藏';
		},
		
		
	},
	computed: {
		filteredTools() {
			if (this.currentCategory === 'all') return this.tools;
			return this.tools.filter(tool => tool.category.includes(this.currentCategory));
		}
	}
};
</script>

<style scoped>
.tool-box-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 15px 40px;
	box-shadow: 6px solid #000;
	height: calc(100vh - 60px); /* 减去顶部导航栏高度 */
	overflow-y: auto;
}

.category-nav {
	display: flex;
	gap: 20px;
	margin-bottom: 30px;
	padding-bottom: 10px;
	border-bottom: 1px solid #eee;
	justify-content: center; /* 主轴居中属性 */
}

.nav-item {
	cursor: pointer;
	padding: 8px 16px;
	border-radius: 4px;
	transition: all 0.3s;
}

.nav-item:hover {
	background: #f5f5f5;
}

.nav-item.active {
	background: #1677ff;
	color: white;
}

.tool-list {
	display: grid;
	grid-template-columns: repeat(3, minmax(150px, 1fr)); /* 三列，宽度自适应 */
	gap: 16px;
}

.tool-item {
	text-decoration: none;
	color: #333;
	text-align: center;
	transition: transform 0.2s;
}

.tool-item:hover {
	transform: translateY(-5px);
}

.tool-icon {
	width: 80px;
	height: 80px;
	background: #fff;
	border-radius: 12px;
	margin: 0 auto 12px;
	position: relative;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
}

.tool-icon img {
	width: 70%;
	height: 70%;
	object-fit: contain;
}

.tool-tag {
	position: absolute;
	top: 0;
	right: -1px;
	background: #ff4d4f;
	color: white;
	padding: 2px 6px;
	border-radius: 10px;
	font-size: 6px;
	z-index: 1; /* 确保显示在最上层 */
}

.tool-name {
	font-size: 14px;
	line-height: 1.4;
}

/* 新增卡片样式 */
.tool-card {
	background: white;
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	display: flex;
	flex-direction: column;
	gap: 15px;
	position: relative;
}

.tool-card:hover {
	transform: translateY(-5px);
}

.card-header h3 {
	margin: 0;
	font-size: 18px;
	color: #1a1a1a;
}

.description {
	color: #666;
	font-size: 14px;
	margin: 8px 0 0;
}

.card-author {
	color: #888;
	font-size: 12px;
	display: flex;
	align-items: center;
	gap: 4px;
}

.author-tag {
	color: #1677ff;
	font-weight: bold;
}

/* 新增底部容器样式 */
.card-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;
}
.card-actions {
	margin-top: auto;
	display: flex;
	gap: 6px;
	padding-top: 0px;
	border-top: 1px solid #eee;
}
.card-image {
	position: relative;
	top: 10px;
	left: 10px;
	width: 40px;
	height: 40px;
	border-radius: 6px;
	overflow: hidden;
}

.tool-image {
	width: 100%;
	height: 100%;
	object-fit: contain; /* 保持图片完整显示 */
}

.action-btn {
	flex: 1;
	background: #f5f5f5;
	border: none;

	border-radius: 6px;
	padding: 8px;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	white-space: nowrap;
	align-items: center;
	justify-content: center;
	gap: 4px;
	transition: background 0.2s;
}

.action-btn:hover {
	background: #e0e0e0;
}

.experience-btn {
	flex: 1;
	background: #1677ff;
	color: white;
	border-radius: 6px;
	padding: 8px;
	text-align: center;
	text-decoration: none;
	transition: background 0.2s;
	white-space: nowrap;
}

.experience-btn:hover {
	background: #145ccc;
}

/*文字描述区域 */
.card-description {
	text-align: center;
	margin: 15px 0;
	padding: 0 10px;
}

.title-line {
	font-size: 16px;
	font-weight: 500;
	color: #1a1a1a;
	line-height: 1.4;
}

.subtitle-line {
	font-size: 12px;
	color: #666;
	margin-top: 4px;
	line-height: 1.5;
}

/* 新增收藏按钮样式 */
/* 心跳动画 */
.heart-solid {
	display: inline-block;
	animation: heartBeat 0.3s ease;
}

@keyframes heartBeat {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}

.action-btn .text {
	white-space: nowrap;
}

/* 添加应用按钮样式 */
.add-btn {
	cursor: pointer;
	background: #f8f9fa;
	border: 2px dashed #e9ecef;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s;
}

.add-btn:hover {
	transform: translateY(-5px);
	border-color: #1677ff;
}

.add-content {
	text-align: center;
	color: #1677ff;
}

.plus-icon {
	font-size: 32px;
	line-height: 1;
	margin-bottom: 8px;
}

/* 弹窗样式 */
.dialog-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
}

.dialog-wrapper {
	background: white;
	border-radius: 8px;
	padding: 24px;
	min-width: 400px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.form-item {
	margin: 16px 0;
}

.form-item label {
	display: block;
	margin-bottom: 8px;
	color: #666;
}

.form-item input,
.form-item select {
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.dialog-actions {
	margin-top: 24px;
	text-align: right;
}

.dialog-actions button {
	padding: 8px 16px;
	margin-left: 8px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.dialog-actions button:first-child {
	background: #f5f5f5;
}

.dialog-actions button:last-child {
	background: #1677ff;
	color: white;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

/* 点赞动画 */
.like-enter-active {
	animation: likeIn 0.3s;
}
.like-leave-active {
	animation: likeOut 0.3s;
}

@keyframes likeIn {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes likeOut {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(0);
	}
}

.like-solid {
	color: #1677ff;
	display: inline-block;
	animation: likeBeat 0.3s ease;
}
@keyframes likeBeat {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}

.like-hollow {
	color: #666;
	display: inline-block;
	animation: hollowPulse 0.5s;
}

@keyframes hollowPulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.8);
	}
	100% {
		transform: scale(1);
	}
}

.action-btn .text {
	min-width: 2em;
}
/* 空心赞样式 */
.action-btn .icon > span:not(.like-solid) {
	color: #666;
	transition: color 0.2s;
}

/* 悬停效果 */
.action-btn:hover .icon > span:not(.like-solid) {
	color: #1677ff;
}

/* 删除按钮样式 */
.delete-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 24px;
	height: 24px;
	border: none;

	color: black;
	border-radius: 50%;
	cursor: pointer;
	font-size: 18px;
	line-height: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
	opacity: 0.8;
}

.delete-btn:hover {
	transform: scale(1.1);
	opacity: 1;
	box-shadow: 0 2px 8px rgba(255, 77, 79, 0.3);
}
</style>
