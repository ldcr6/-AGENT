<template>
	<!-- 顶部渐变Banner和头像 -->
	<div class="resume-detail-bg">
		
		<div class="resume-detail-banner">
			<div class="banner-gradient"></div>
			<div class="banner-content">
				<el-avatar :size="96" :src="resume.avatar" class="resume-avatar">
					<el-icon><user-filled /></el-icon>
				</el-avatar>
				<div class="banner-info">
					<h1 class="resume-title">{{ resume.name }}</h1>
					<p class="resume-position">{{ resume.position }}</p>
					<div class="resume-tags">
						<el-tag
							v-for="tag in resume.tags"
							:key="'tag-' + tag"
							effect="dark"
							class="tag-anim"
							>{{ tag }}</el-tag
						>
					</div>
				</div>
				<div class="banner-actions">
					<el-tooltip content="导出PDF" placement="top">
						<el-button circle @click="exportPDF" :loading="exporting">
							<el-icon><document /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="打印" placement="top">
						<el-button circle @click="printResume">
							<el-icon><printer /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="分享" placement="top">
						<el-button circle @click="shareResume">
							<el-icon><share /></el-icon>
						</el-button>
					</el-tooltip>
				</div>
			</div>
		</div>
		<!-- 主体内容卡片 -->
		<el-card class="resume-detail-card" shadow="hover">
			<el-tabs v-model="activeTab" class="resume-tabs">
				<el-tab-pane label="基本信息" name="base">
					<el-descriptions :title="resume.name" :column="2" border>
						<el-descriptions-item label="姓名">{{ resume.name }}</el-descriptions-item>
						<el-descriptions-item label="性别">{{
							resume.gender
						}}</el-descriptions-item>
						<el-descriptions-item label="出生日期">{{
							resume.birthday
						}}</el-descriptions-item>
						<el-descriptions-item label="联系方式">{{
							resume.contact
						}}</el-descriptions-item>
						<el-descriptions-item label="邮箱">{{ resume.email }}</el-descriptions-item>
						<el-descriptions-item label="地址">{{
							resume.address
						}}</el-descriptions-item>
						<el-descriptions-item label="上传时间">{{
							resume.createdAt
						}}</el-descriptions-item>
						<el-descriptions-item label="自我介绍" :span="2">
							<el-input
								type="textarea"
								v-model="resume.intro"
								readonly
								autosize
								:rows="3"
							/>
						</el-descriptions-item>
					</el-descriptions>
				</el-tab-pane>
				<el-tab-pane label="教育经历" name="edu">
					<el-timeline>
						<el-timeline-item
							v-for="(edu, idx) in resume.education"
							:key="edu.school + '-' + idx"
							:timestamp="edu.period"
							placement="top"
							type="primary"
						>
							<div class="edu-item">
								<div class="edu-school">{{ edu.school }}</div>
								<div class="edu-major">{{ edu.major }}（{{ edu.degree }}）</div>
								<div class="edu-desc">{{ edu.desc }}</div>
							</div>
						</el-timeline-item>
					</el-timeline>
				</el-tab-pane>
				<el-tab-pane label="工作经历" name="work">
					<el-timeline>
						<el-timeline-item
							v-for="(work, idx) in resume.work"
							:key="work.company + '-' + idx"
							:timestamp="work.period"
							placement="top"
							type="success"
						>
							<div class="work-item">
								<div class="work-company">{{ work.company }}</div>
								<div class="work-position">{{ work.position }}</div>
								<div class="work-desc">{{ work.desc }}</div>
								<div class="work-skills">
									<el-tag
										v-for="skill in work.skills"
										:key="skill"
										type="info"
										class="tag-anim"
										>{{ skill }}</el-tag
									>
								</div>
							</div>
						</el-timeline-item>
					</el-timeline>
				</el-tab-pane>
				<el-tab-pane label="技能特长" name="skills">
					<div class="skills-list">
						<div
							v-for="skill in resume.skills"
							:key="'skill-' + skill.name"
							class="skill-item"
						>
							<div class="skill-name">{{ skill.name }}</div>
							<el-progress
								:percentage="skill.level"
								:color="skill.color"
								:stroke-width="18"
								class="skill-progress"
							/>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="项目/作品集" name="projects">
					<el-row :gutter="24">
						<el-col
							v-for="project in resume.projects"
							:key="'project-' + project.name"
							:xs="24"
							:sm="12"
							:md="8"
						>
							<el-card class="project-card" shadow="hover">
								<div class="project-title">
									<el-icon><star-filled /></el-icon>
									{{ project.name }}
								</div>
								<div class="project-desc">{{ project.desc }}</div>
								<div class="project-link">
									<el-link
										:href="project.link"
										target="_blank"
										v-if="project.link"
										>访问项目</el-link
									>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			
		</el-card>
		<!-- 分享弹窗 -->
		<el-dialog v-model="shareDialog" title="分享简历" width="400px" center>
			<div class="share-content">
				<el-input v-model="shareLink" readonly />
				<el-button type="primary" @click="copyLink">复制链接</el-button>
			</div>
		</el-dialog>
		<!-- 导出动画/加载 -->
		<el-dialog v-model="exporting" title="导出中..." width="300px" center :show-close="false">
			<el-skeleton :rows="4" animated />
		</el-dialog>
		
	</div>
	<PageFooter />
</template>

<script setup lang="ts">
import PageFooter from '/@/components/PageFooter.vue';
// resume 详情页面复杂实现，含详细注释
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
	UserFilled,
	Document,
	Printer,
	Share,
	ArrowLeft,
	StarFilled
} from '@element-plus/icons-vue';

// 1. 路由与状态
const router = useRouter();
const activeTab = ref('base');
const exporting = ref(false);
const shareDialog = ref(false);
const shareLink = ref('https://resume.cool-admin.com/123456');

// 2. 简历数据（可替换为后端接口）
const resume = reactive({
	avatar: '/public/assets/images/AI.jpg',
	name: '张三-前端开发',
	position: '高级前端工程师',
	gender: '男',
	birthday: '1996-08-15',
	contact: '138****8888',
	email: 'zhangsan@example.com',
	address: '上海市浦东新区',
	createdAt: '2024-05-01',
	intro: '热爱前端，熟悉Vue、React等主流框架，追求极致用户体验。',
	tags: ['Vue3', 'TypeScript', '动画', '响应式', '极简风'],
	education: [
		{
			school: '清华大学',
			major: '计算机科学',
			degree: '本科',
			period: '2014-2018',
			desc: '主修前端与人机交互'
		},
		{
			school: '复旦大学',
			major: '软件工程',
			degree: '硕士',
			period: '2018-2021',
			desc: '研究方向为Web动画'
		}
	],
	work: [
		{
			company: '字节跳动',
			position: '前端开发',
			period: '2021-2023',
			desc: '负责ToB平台开发，主导动画组件库',
			skills: ['Vue', 'TS', 'Echarts']
		},
		{
			company: '腾讯',
			position: '前端实习',
			period: '2020-2021',
			desc: '参与小程序开发',
			skills: ['小程序', 'Taro']
		}
	],
	skills: [
		{ name: 'Vue3', level: 95, color: '#67c23a' },
		{ name: 'TypeScript', level: 90, color: '#409eff' },
		{ name: 'CSS动画', level: 85, color: '#e6a23c' },
		{ name: '响应式设计', level: 80, color: '#38bdf8' }
	],
	projects: [
		{
			name: '酷炫动画组件库',
			desc: '基于Vue3的高性能动画组件库',
			link: 'https://github.com/cool/anim'
		},
		{ name: '在线简历平台', desc: '支持多模板的在线简历生成器', link: '' }
	]
});

// 3. 导出、打印、分享等操作
function exportPDF() {
	exporting.value = true;
	setTimeout(() => {
		exporting.value = false;
		ElMessage.success('导出成功！');
	}, 1800);
}
function printResume() {
	window.print();
}
function shareResume() {
	shareDialog.value = true;
}
function copyLink() {
	navigator.clipboard.writeText(shareLink.value);
	ElMessage.success('链接已复制');
}
function goBack() {
	router.push('/resume');
}
</script>

<style scoped lang="scss">
// 顶部渐变Banner
.resume-detail-bg {
	min-height: 50vh;
	background: linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%);
	// padding-bottom: 48px;
}
.resume-detail-banner {
	position: relative;
	min-height: 30px;
	height: auto;
	overflow: visible;
	display: flex;
	align-items: flex-end;
	.banner-gradient {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: linear-gradient(90deg, #6366f1 0%, #38bdf8 100%);
		// border-radius: 0 0 48px 48px;
		z-index: 1;
		box-shadow: 0 12px 36px 0 rgba(56, 189, 248, 0.18);
		animation: bannerFadeIn 1.2s;
	}
	.banner-content {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 32px;
		padding: 48px 48px 32px 48px;
		width: 100%;
		.resume-avatar {
			box-shadow: 0 4px 24px #6366f1aa;
			border: 3px solid #fff;
			background: #fff;
			animation: avatarPop 1s;
			width: 72px !important;
			height: 72px !important;
			min-width: 72px;
			min-height: 72px;
		}
		.banner-info {
			flex: 1;
			.resume-title {
				font-size: 2.2rem;
				font-weight: 700;
				color: #fff;
				margin-bottom: 6px;
				letter-spacing: 1px;
				text-shadow: 0 2px 8px #6366f1aa;
				animation: fadeInUp 0.8s;
			}
			.resume-position {
				font-size: 1.1rem;
				color: #e0e7ff;
				margin-bottom: 8px;
				animation: fadeInUp 1.1s;
			}
			.resume-tags {
				display: flex;
				gap: 10px;
				flex-wrap: wrap;
				.el-tag {
					font-size: 13px;
					padding: 0 10px;
					border-radius: 12px;
					background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
					color: #fff;
					border: none;
					box-shadow: 0 2px 8px #38bdf855;
					animation: tagPop 0.7s;
				}
			}
		}
		.banner-actions {
			display: flex;
			gap: 12px;
			.el-button {
				background: #fff;
				color: #6366f1;
				border-radius: 50%;
				box-shadow: 0 2px 8px #6366f1aa;
				transition:
					transform 0.2s,
					box-shadow 0.2s;
				width: 40px;
				height: 40px;
				min-width: 40px;
				min-height: 40px;
				font-size: 18px;
				&:hover {
					transform: scale(1.12) rotate(-8deg);
					box-shadow: 0 6px 24px #38bdf855;
				}
			}
		}
	}
}
// 主体卡片
.resume-detail-card {
	max-width: 1600px;
	margin: -10px auto 0 auto;
	border-radius: 18px;
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
	border: none;
	overflow: hidden;
	padding-bottom: 48px;
	animation: cardPop 1.2s;
	position: relative;
	z-index: 3;
	/* 分割线/阴影 */
	&::before {
		content: '';
		display: block;
		position: absolute;
		top: -18px;
		left: 40px;
		right: 40px;
		height: 12px;
		border-radius: 8px;
		background: rgba(56, 189, 248, 0.1);
		box-shadow: 0 2px 12px #6366f1aa;
		z-index: 2;
	}
}
.resume-tabs {
	margin-top: 18px;
	.el-tabs__item {
		font-size: 1.1rem;
		font-weight: 500;
	}
}
.edu-item,
.work-item {
	padding: 8px 0 8px 8px;
	.edu-school,
	.work-company {
		font-weight: 600;
		color: #6366f1;
		font-size: 1.1rem;
	}
	.edu-major,
	.work-position {
		color: #38bdf8;
		font-size: 1rem;
		margin-bottom: 2px;
	}
	.edu-desc,
	.work-desc {
		color: #64748b;
		font-size: 0.98rem;
		margin-bottom: 2px;
	}
	.work-skills {
		margin-top: 4px;
		.el-tag {
			margin-right: 6px;
			margin-bottom: 2px;
			background: #f0fdfa;
			color: #6366f1;
			border: none;
		}
	}
}
.skills-list {
	display: flex;
	flex-wrap: wrap;
	gap: 24px;
	.skill-item {
		width: 220px;
		background: #f8fafc;
		border-radius: 12px;
		box-shadow: 0 2px 8px #38bdf855;
		padding: 18px 16px 10px 16px;
		margin-bottom: 12px;
		.skill-name {
			font-weight: 600;
			color: #6366f1;
			margin-bottom: 8px;
		}
		.skill-progress {
			margin-top: 2px;
		}
	}
}
.project-card {
	margin-bottom: 18px;
	border-radius: 14px;
	.project-title {
		font-weight: 600;
		color: #6366f1;
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 6px;
	}
	.project-desc {
		color: #64748b;
		font-size: 0.98rem;
		margin-bottom: 8px;
	}
	.project-link {
		margin-top: 4px;
	}
}
.back-btn {
	position: fixed;
	left: 32px;
	bottom: 32px;
	z-index: 99;
	font-size: 1.1rem;
	border-radius: 24px;
	box-shadow: 0 2px 12px #6366f1aa;
	animation: fadeInUp 1.2s;
}
.share-content {
	display: flex;
	gap: 12px;
	align-items: center;
	margin-top: 18px;
}
// 动画keyframes
@keyframes bannerFadeIn {
	0% {
		opacity: 0;
		transform: translateY(-40px);
	}
	100% {
		opacity: 1;
		transform: none;
	}
}
@keyframes avatarPop {
	0% {
		opacity: 0;
		transform: scale(0.7);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
@keyframes fadeInUp {
	0% {
		opacity: 0;
		transform: translateY(30px);
	}
	100% {
		opacity: 1;
		transform: none;
	}
}
@keyframes tagPop {
	0% {
		opacity: 0;
		transform: scale(0.7);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
@keyframes cardPop {
	0% {
		opacity: 0;
		transform: scale(0.95);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
// 过渡动画
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
// 响应式
@media (max-width: 900px) {
	.resume-detail-card {
		max-width: 98vw;
		margin: -60px 1vw 0 1vw;
	}
	.banner-content {
		flex-direction: column;
		gap: 12px !important;
		padding: 24px 8vw 18px 8vw !important;
		align-items: flex-start !important;
	}
	.back-btn {
		left: 12px;
		bottom: 12px;
	}
}
@media (max-width: 600px) {
	.resume-detail-banner {
		height: 160px;
		.banner-content {
			padding: 12px 2vw 8px 2vw !important;
		}
		.resume-avatar {
			width: 64px !important;
			height: 64px !important;
		}
	}
	.resume-detail-card {
		padding-bottom: 18px;
	}
	.skills-list {
		flex-direction: column;
		gap: 8px;
		.skill-item {
			width: 100%;
		}
	}
}
</style>
