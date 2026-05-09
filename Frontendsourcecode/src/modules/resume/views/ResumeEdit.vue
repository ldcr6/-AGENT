<template>
	<div class="resume-edit-bg">
		<el-card class="resume-edit-card" shadow="hover">
			<!-- 模板选择区 -->
			<div class="template-select">
				<div class="template-title">选择简历模板：</div>
				<div class="template-list">
					<div
						v-for="tpl in templates"
						:key="tpl.id"
						:class="['template-thumb', { active: tpl.id === selectedTemplate }]"
						@click="selectTemplate(tpl.id)"
					>
						<!-- <img :src="tpl.thumb" :alt="tpl.name" /> -->
						<div class="tpl-name">{{ tpl.name }}</div>
					</div>
				</div>
			</div>
			<el-row :gutter="32" class="edit-main-row">
				<!-- 左侧表单区 -->
				<el-col :xs="24" :sm="24" :md="16">
					<el-form
						:model="form"
						:rules="rules"
						ref="formRef"
						label-width="100px"
						class="edit-form"
					>
						<!-- 基础信息 -->
						<el-card class="form-section" shadow="never">
							<template #header>
								<span>基础信息</span>
							</template>
							<el-row :gutter="12">
								<el-col :span="6">
									<el-upload
										class="avatar-uploader"
										action="#"
										:show-file-list="false"
										:before-upload="beforeAvatarUpload"
										:on-change="handleAvatarChange"
									>
										<img v-if="form.avatar" :src="form.avatar" class="avatar" />
										<el-icon v-else class="avatar-uploader-icon"
											><user-filled
										/></el-icon>
									</el-upload>
								</el-col>
								<el-col :span="18">
									<el-form-item label="姓名" prop="name">
										<el-input
											v-model="form.name"
											maxlength="20"
											show-word-limit
										/>
									</el-form-item>
									<el-form-item label="性别" prop="gender">
										<el-radio-group v-model="form.gender">
											<el-radio label="男">男</el-radio>
											<el-radio label="女">女</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="出生日期" prop="birthday">
										<el-date-picker
											v-model="form.birthday"
											type="date"
											placeholder="选择日期"
										/>
									</el-form-item>
									<el-form-item label="联系方式" prop="contact">
										<el-input v-model="form.contact" maxlength="20" />
									</el-form-item>
									<el-form-item label="邮箱" prop="email">
										<el-input v-model="form.email" maxlength="40" />
									</el-form-item>
									<el-form-item label="地址" prop="address">
										<el-input v-model="form.address" maxlength="60" />
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="自我介绍" prop="intro">
								<el-input
									type="textarea"
									v-model="form.intro"
									maxlength="200"
									show-word-limit
									:rows="3"
								/>
							</el-form-item>
						</el-card>
						<!-- 教育经历 -->
						<el-card class="form-section" shadow="never">
							<template #header>
								<span>教育经历</span>
								<el-button type="primary" size="small" @click="addEdu"
									>添加</el-button
								>
							</template>
							<el-row
								v-for="(edu, idx) in form.education"
								:key="edu.school + '-' + idx"
								:gutter="12"
								class="edu-row"
							>
								<el-col :span="6">
									<el-input v-model="edu.school" placeholder="学校名称" />
								</el-col>
								<el-col :span="5">
									<el-input v-model="edu.major" placeholder="专业" />
								</el-col>
								<el-col :span="4">
									<el-select v-model="edu.degree" placeholder="学历">
										<el-option label="本科" value="本科" />
										<el-option label="硕士" value="硕士" />
										<el-option label="博士" value="博士" />
									</el-select>
								</el-col>
								<el-col :span="5">
									<el-date-picker
										v-model="edu.period"
										type="daterange"
										range-separator="至"
										start-placeholder="开始"
										end-placeholder="结束"
									/>
								</el-col>
								<el-col :span="4">
									<el-button
										type="danger"
										icon="el-icon-delete"
										@click="removeEdu(idx)"
										circle
									/>
								</el-col>
								<el-col :span="24">
									<el-input
										v-model="edu.desc"
										placeholder="描述"
										type="textarea"
										:rows="2"
										style="margin-top: 6px"
									/>
								</el-col>
							</el-row>
						</el-card>
						<!-- 工作经历 -->
						<el-card class="form-section" shadow="never">
							<template #header>
								<span>工作经历</span>
								<el-button type="primary" size="small" @click="addWork"
									>添加</el-button
								>
							</template>
							<el-row
								v-for="(work, idx) in form.work"
								:key="work.company + '-' + idx"
								:gutter="12"
								class="work-row"
							>
								<el-col :span="6">
									<el-input v-model="work.company" placeholder="公司名称" />
								</el-col>
								<el-col :span="5">
									<el-input v-model="work.position" placeholder="职位" />
								</el-col>
								<el-col :span="5">
									<el-date-picker
										v-model="work.period"
										type="daterange"
										range-separator="至"
										start-placeholder="开始"
										end-placeholder="结束"
									/>
								</el-col>
								<el-col :span="4">
									<el-button
										type="danger"
										icon="el-icon-delete"
										@click="removeWork(idx)"
										circle
									/>
								</el-col>
								<el-col :span="24">
									<el-input
										v-model="work.desc"
										placeholder="描述"
										type="textarea"
										:rows="2"
										style="margin-top: 6px"
									/>
									<el-select
										v-model="work.skills"
										multiple
										placeholder="相关技能"
										style="margin-top: 6px"
									>
										<el-option
											v-for="skill in skillOptions"
											:key="skill"
											:label="skill"
											:value="skill"
										/>
									</el-select>
								</el-col>
							</el-row>
						</el-card>
						<!-- 技能特长 -->
						<el-card class="form-section" shadow="never">
							<template #header>
								<span>技能特长</span>
								<el-button
									type="primary"
									size="small"
									@click="addSkill"
									style="margin-left: 12px"
									>添加</el-button
								>
							</template>
							<el-row
								v-for="(skill, idx) in form.skills"
								:key="skill.name + '-' + idx"
								:gutter="12"
								class="skill-row"
							>
								<el-col :span="20">
									<el-input v-model="skill.name" placeholder="技能名称" />
								</el-col>
								<el-col :span="4">
									<el-button type="danger" @click="removeSkill(idx)" circle>
										<el-icon><close /></el-icon>
									</el-button>
								</el-col>
							</el-row>
						</el-card>
						<!-- 项目/作品集 -->
						<el-card class="form-section" shadow="never">
							<template #header>
								<span>项目/作品集</span>
								<el-button
									type="primary"
									size="small"
									@click="addProject"
									style="margin-left: 12px"
									>添加</el-button
								>
							</template>
							<el-row
								v-for="(project, idx) in form.projects"
								:key="project.name + '-' + idx"
								:gutter="12"
								class="project-row"
							>
								<el-col :span="22">
									<el-input
										v-model="project.name"
										placeholder="项目名称"
										style="margin-bottom: 8px"
									/>
								</el-col>
								<el-col :span="2" style="display: flex; align-items: center">
									<el-button type="danger" @click="removeProject(idx)" circle>
										<el-icon><close /></el-icon>
									</el-button>
								</el-col>
								<el-col :span="24">
									<el-input
										v-model="project.desc"
										placeholder="描述"
										style="margin-bottom: 8px"
									/>
								</el-col>
								<el-col :span="24">
									<el-input v-model="project.link" placeholder="链接" />
								</el-col>
							</el-row>
						</el-card>
						<!-- 操作按钮 -->
						<div class="edit-actions">
							<el-button type="success" @click="saveResume" :loading="saving"
								>保存</el-button
							>
							<el-button type="warning" @click="exportResume" :loading="exporting"
								>导出PDF</el-button
							>
							<el-button type="danger" @click="resetForm">重置</el-button>
						</div>
					</el-form>
				</el-col>
			</el-row>
			<!-- 导出动画/加载 -->
			<el-dialog
				v-model="exporting"
				title="导出中..."
				width="700px"
				center
				:show-close="false"
			>
				<div class="upload-dialog-body">
					<!-- 上传区 -->
					<div class="upload-drop-area">
						<el-upload
							class="upload-dragger"
							drag
							action="#"
							:auto-upload="false"
							:file-list="fileList"
							:before-upload="beforeUpload"
							:on-change="handleChange"
							:on-remove="handleRemove"
							:on-success="handleSuccess"
							:on-progress="handleProgress"
							multiple
							accept=".pdf,.doc,.docx,.jpg,.png"
						>
							<el-icon class="upload-icon"><UserFilled /></el-icon>
							<div class="upload-text">拖拽文件到此处上传</div>
							<div class="upload-tip">支持 PDF、Word、JPG、PNG 格式，最大 5MB</div>
							<el-button type="primary" class="upload-btn">
								<el-icon><UserFilled /></el-icon> 选择文件
							</el-button>
						</el-upload>
					</div>
					<!-- 历史记录 -->
					<div class="upload-history">
						<div class="history-title">最近上传</div>
						<div v-if="fileList.length === 0" class="history-empty">暂无上传记录</div>
						<div v-else>
							<div v-for="file in fileList" :key="file.uid" class="history-item">
								<el-icon v-if="isPdf(file)" class="file-icon pdf">PDF</el-icon>
								<el-icon v-else-if="isWord(file)" class="file-icon word">W</el-icon>
								<el-image
									v-else-if="isImage(file)"
									:src="file.url || file.rawUrl"
									class="file-thumb"
								/>
								<div class="file-info">
									<div class="file-name">{{ file.name }}</div>
									<div class="file-meta">{{ file.size }} · {{ file.time }}</div>
								</div>
								<el-button
									icon="el-icon-download"
									circle
									size="small"
									@click="downloadFile(file)"
								/>
							</div>
						</div>
					</div>
				</div>
				<template #footer>
					<el-button @click="exporting = false">关闭</el-button>
				</template>
			</el-dialog>
		</el-card>
	</div>
	<!-- 在模板末尾添加导出专用组件，屏幕外隐藏 -->
	<ResumeExport v-if="showExport" :data="form" style="position: fixed; left: -9999px; top: 0" />
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { UserFilled, Close } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import { onMounted } from 'vue';
import html2pdf from 'html2pdf.js';
import ResumeExport from './ResumeExport.vue';

// 模板数据
const templates = [
	{ id: 'tpl1', name: '极简蓝', thumb: '/public/assets/images/AI.jpg' },
	{ id: 'tpl2', name: '商务灰', thumb: '/public/assets/images/deepseek.png' },
	{ id: 'tpl3', name: '彩色活力', thumb: '/public/assets/images/gpt.png' }
];
const selectedTemplate = ref('tpl1');
function selectTemplate(id: string) {
	selectedTemplate.value = id;
}

// 表单数据
const form = reactive({
	avatar: '',
	name: '',
	gender: '',
	birthday: '',
	contact: '',
	email: '',
	address: '',
	intro: '',
	education: [{ school: '', major: '', degree: '', period: '', desc: '' }],
	work: [{ company: '', position: '', period: '', desc: '', skills: [] }],
	skills: [{ name: '', level: 60, color: '#409eff' }],
	projects: [{ name: '', desc: '', link: '' }]
});

const rules = {
	name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
	gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
	birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
	contact: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
	email: [
		{ required: true, message: '请输入邮箱', trigger: 'blur' },
		{ type: 'email' as const, message: '邮箱格式不正确', trigger: ['blur', 'change'] }
	],
	address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
	intro: [{ required: true, message: '请输入自我介绍', trigger: 'blur' }],
	education: [{ required: true, message: '请填写教育经历', trigger: 'blur' }],
	work: [{ required: true, message: '请填写工作经历', trigger: 'blur' }],
	skills: [{ required: true, message: '请填写技能特长', trigger: 'blur' }],
	projects: [{ required: true, message: '请填写项目/作品集', trigger: 'blur' }]
};
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const saving = ref(false);
const exporting = ref(false);
const showExport = ref(false);
const skillOptions = [
	'Vue3',
	'TypeScript',
	'JavaScript',
	'CSS',
	'动画',
	'React',
	'Node.js',
	'Echarts',
	'Taro',
	'小程序',
	'Element Plus'
];
// 教育经历
function addEdu() {
	form.education.push({ school: '', major: '', degree: '', period: '', desc: '' });
}
function removeEdu(idx: number) {
	form.education.splice(idx, 1);
}
// 工作经历
function addWork() {
	form.work.push({ company: '', position: '', period: '', desc: '', skills: [] });
}
function removeWork(idx: number) {
	form.work.splice(idx, 1);
}
// 技能
function addSkill() {
	form.skills.push({ name: '', level: 60, color: '#409eff' });
}
function removeSkill(idx: number) {
	form.skills.splice(idx, 1);
}
// 项目
function addProject() {
	form.projects.push({ name: '', desc: '', link: '' });
}
function removeProject(idx: number) {
	form.projects.splice(idx, 1);
}
// 头像上传
function beforeAvatarUpload(file: File): boolean {
	try {
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			ElMessage.error('只能上传JPG/PNG图片');
			return false;
		}
		if (file.size / 1024 / 1024 > 2) {
			ElMessage.error('图片大小不能超过2MB!');
			return false;
		}
		return true;
	} catch (e: any) {
		ElMessage.error('上传异常: ' + (e?.message || e));
		return false;
	}
}
function handleAvatarChange(file: any) {
	const reader = new FileReader();
	reader.onload = (e: any) => {
		form.avatar = e.target.result;
	};
	reader.readAsDataURL(file.raw);
}
// 保存、导出、重置
function saveResume() {
	saving.value = true;
	setTimeout(() => {
		saving.value = false;
		ElMessage.success('保存成功！');
	}, 1200);
}
function exportResume() {
	exporting.value = true;
	showExport.value = true;
	nextTick(() => {
		setTimeout(() => {
			const element = document.getElementById('pdf-resume');
			if (element) {
				html2pdf()
					.set({
						margin: 0.5,
						filename: `${form.name || '简历'}.pdf`,
						html2canvas: { scale: 2 },
						jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
					})
					.from(element)
					.save()
					.then(() => {
						exporting.value = false;
						showExport.value = false;
						ElMessage.success('导出成功！');
					})
					.catch(() => {
						exporting.value = false;
						showExport.value = false;
						ElMessage.error('导出失败');
					});
			} else {
				exporting.value = false;
				showExport.value = false;
				ElMessage.error('未找到导出内容');
			}
		}, 100);
	});
}
function resetForm() {
	Object.assign(form, {
		avatar: '',
		name: '',
		gender: '',
		birthday: '',
		contact: '',
		email: '',
		address: '',
		intro: '',
		education: [{ school: '', major: '', degree: '', period: '', desc: '' }],
		work: [{ company: '', position: '', period: '', desc: '', skills: [] }],
		skills: [{ name: '', level: 60, color: '#409eff' }],
		projects: [{ name: '', desc: '', link: '' }]
	});
	nextTick(() => {
		formRef.value?.clearValidate();
	});
}
// ========== 上传弹窗相关逻辑 ==========
const fileList = ref<any[]>([]);
onMounted(() => {
	fileList.value = [
		{
			uid: '1',
			name: '前端简历.pdf',
			size: '2.4MB',
			time: '今天 09:30',
			type: 'application/pdf',
			status: 'success',
			url: '/public/assets/images/AI.jpg',
			percentage: 100
		},
		{
			uid: '2',
			name: '产品经理.docx',
			size: '1.8MB',
			time: '昨天 14:15',
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			status: 'success',
			url: '',
			percentage: 100
		},
		{
			uid: '3',
			name: '作品集.png',
			size: '3.2MB',
			time: '2024-05-01',
			type: 'image/png',
			status: 'success',
			url: '/public/assets/images/deepseek.png',
			percentage: 100
		}
	];
});
function beforeUpload(file: any) {
	const isAllowed = [
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'image/jpeg',
		'image/png'
	].includes(file.type);
	if (!isAllowed) {
		ElMessage.error('仅支持PDF/Word/图片文件');
		return false;
	}
	const isLt5M = file.size / 1024 / 1024 < 5;
	if (!isLt5M) {
		ElMessage.error('文件大小不能超过5MB!');
		return false;
	}
	return true;
}
function handleChange(file: any, fileList_: any) {
	if (file.raw && file.type.startsWith('image/')) {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			file.rawUrl = e.target.result;
		};
		reader.readAsDataURL(file.raw);
	}
	file.status = 'uploading';
	file.percentage = 0;
}
function handleRemove(file: any) {
	fileList.value = fileList.value.filter(f => f.uid !== file.uid);
	ElMessage.success('删除成功');
}
function handleSuccess(response: any, file: any) {
	file.status = 'success';
	file.percentage = 100;
	ElMessage.success('上传成功');
}
function handleProgress(event: any, file: any) {
	file.status = 'uploading';
	file.percentage = Math.round(event.percent);
}
function isPdf(file: any) {
	return file.type === 'application/pdf' || file.name.match(/\.pdf$/i);
}
function isWord(file: any) {
	return (
		file.type === 'application/msword' ||
		file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
		file.name.match(/\.(doc|docx)$/i)
	);
}
function isImage(file: any) {
	return file.type?.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png)$/i);
}
function downloadFile(file: any) {
	ElMessage.info('模拟下载：' + file.name);
}
</script>

<style scoped lang="scss">
.resume-edit-bg {
	min-height: 100vh;
	background: linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%);
	padding-bottom: 48px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding-top: 32px;
}
.resume-edit-card {
	width: 100%;
	max-width: 1600px;
	margin: 0 auto;
	border-radius: 12px;
	box-shadow: none;
	border: 1px solid #e0e7ef;
	padding-bottom: 32px;
	animation: none;
}
.template-select {
	display: flex;
	align-items: center;
	gap: 18px;
	margin-bottom: 18px;
	.template-title {
		font-weight: 600;
		color: #6366f1;
		font-size: 1.1rem;
	}
	.template-list {
		display: flex;
		gap: 16px;
		.template-thumb {
			border: 2px solid #e0e7ff;
			border-radius: 10px;
			width: 80px;
			height: 48px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition:
				border-color 0.3s,
				box-shadow 0.3s;
			background: #fff;
			.tpl-name {
				font-size: 15px;
				color: #6366f1;
				font-weight: 600;
			}
			&.active {
				border-color: #6366f1;
				box-shadow: 0 4px 16px #6366f1aa;
				background: #f0f4ff;
			}
		}
	}
}
.edit-main-row {
	margin-top: 0;
	display: flex;
	justify-content: center;
}
.edit-form {
	width: 100%;
	max-width: none;
	margin: 0 auto;
	.el-form-item {
		margin-bottom: 22px;
	}
}
.form-section {
	margin-bottom: 18px;
	border-radius: 8px;
	box-shadow: none;
	border: 1px solid #e0e7ef;
	width: 100%;
}
.avatar-uploader {
	.el-upload {
		border: 2px dashed #d3e0f3;
		border-radius: 50%;
		width: 96px;
		height: 96px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: border-color 0.3s;
		&:hover {
			border-color: #38bdf8;
		}
	}
	.avatar {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 2px 12px #38bdf855;
	}
	.avatar-uploader-icon {
		font-size: 48px;
		color: #b4bccc;
	}
}
.edit-actions {
	display: flex;
	justify-content: flex-end;
	gap: 18px;
	margin-top: 24px;
}
.preview-panel {
	background: #f8fafc;
	border-radius: 16px;
	box-shadow: 0 2px 12px #38bdf855;
	padding: 24px 12px;
	min-height: 600px;
	max-width: 420px;
	width: 100%;
	margin: 0 auto;
	overflow-x: auto;
	display: flex;
	align-items: flex-start;
	justify-content: center;
}
.preview-inner {
	width: 100%;
	max-width: 400px;
	min-width: 320px;
	box-sizing: border-box;
}
@media (max-width: 700px) {
	.resume-edit-card {
		max-width: 98vw;
		margin: 0 1vw;
		padding-bottom: 12px;
	}
	.edit-form {
		max-width: 98vw;
	}
	.edit-main-row {
		flex-direction: column;
	}
	.preview-panel {
		max-width: 100vw;
		min-width: 0;
		padding: 12px 2vw;
	}
	.preview-inner {
		max-width: 100vw;
		min-width: 0;
	}
}
@media (max-width: 600px) {
	.resume-edit-card {
		padding-bottom: 18px;
	}
	.edit-actions {
		flex-direction: column;
		gap: 8px;
		align-items: stretch;
	}
	.preview-panel {
		padding: 8px 2px;
		min-height: 300px;
		max-width: 100vw;
	}
	.preview-inner {
		max-width: 100vw;
		min-width: 0;
	}
}
@media (max-width: 500px) {
	.edit-actions {
		flex-direction: column;
		gap: 8px;
		align-items: stretch;
	}
}
</style>
