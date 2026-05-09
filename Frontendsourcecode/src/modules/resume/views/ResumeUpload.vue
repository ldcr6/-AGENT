<template>
	<div class="resume-upload-bg">
		<el-card class="resume-upload-card" shadow="hover">
			<!-- 上传区 -->
			<div class="upload-area">
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
					<el-icon class="upload-icon"><UploadFilled /></el-icon>
					<div class="upload-text">
						拖拽文件到此处，或 <span class="upload-link">点击上传</span>
					</div>
					<div class="upload-tip">支持PDF/Word/图片，单文件最大5MB</div>
				</el-upload>
				<el-button
					type="primary"
					class="upload-btn"
					:loading="uploading"
					@click="submitUpload"
				>
					<el-icon><UploadFilled /></el-icon> 开始上传
				</el-button>
			</div>
			<!-- 上传历史 -->
			<div class="upload-history">
				<h3>上传历史</h3>
				<el-skeleton v-if="loading" rows="4" animated />
				<el-empty v-else-if="fileList.length === 0" description="暂无上传记录">
					<template #image>
						<img
							src="/public/assets/images/AI.jpg"
							style="width: 120px; opacity: 0.7"
						/>
					</template>
				</el-empty>
				<el-row v-else :gutter="18">
					<el-col v-for="file in fileList" :key="file.uid" :xs="24" :sm="12" :md="8">
						<el-card class="file-card" shadow="hover">
							<div class="file-thumb">
								<el-image
									v-if="isImage(file)"
									:src="file.url || file.rawUrl"
									fit="cover"
								/>
								<el-icon v-else class="file-icon"><Document /></el-icon>
							</div>
							<div class="file-info">
								<div class="file-name">{{ file.name }}</div>
								<div class="file-status">
									<el-tag
										:type="
											file.status === 'success'
												? 'success'
												: file.status === 'uploading'
													? 'info'
													: 'danger'
										"
									>
										{{ statusText(file.status) }}
									</el-tag>
								</div>
								<el-progress
									v-if="file.status === 'uploading'"
									:percentage="file.percentage || 0"
									:stroke-width="8"
									status="active"
								/>
							</div>
							<div class="file-actions">
								<el-tooltip content="下载">
									<el-button
										icon="el-icon-download"
										circle
										size="small"
										@click="downloadFile(file)"
									/>
								</el-tooltip>
								<el-tooltip content="预览" v-if="isImage(file)">
									<el-button
										icon="el-icon-view"
										circle
										size="small"
										@click="previewFile(file)"
									/>
								</el-tooltip>
								<el-popconfirm
									title="确定删除该文件吗？"
									@confirm="removeFile(file)"
								>
									<template #reference>
										<el-button
											icon="el-icon-delete"
											circle
											size="small"
											type="default"
										/>
									</template>
								</el-popconfirm>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<!-- 预览弹窗 -->
			<el-dialog v-model="previewDialog" title="文件预览" width="600px" center>
				<el-image
					v-if="previewUrl"
					:src="previewUrl"
					fit="contain"
					style="max-height: 400px"
				/>
				<div v-else>暂不支持预览该文件类型</div>
			</el-dialog>
		</el-card>
	</div>
</template>

<script setup lang="ts">
// resume 上传页面复杂实现，含详细注释
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { UploadFilled, Document } from '@element-plus/icons-vue';

const loading = ref(true);
const uploading = ref(false);
const fileList = ref<any[]>([]);
const previewDialog = ref(false);
const previewUrl = ref('');

onMounted(() => {
	setTimeout(() => {
		fileList.value = [
			{
				uid: '1',
				name: '前端简历.pdf',
				status: 'success',
				url: '/public/assets/images/AI.jpg',
				percentage: 100
			},
			{ uid: '2', name: '产品经理.docx', status: 'success', url: '', percentage: 100 },
			{
				uid: '3',
				name: '作品集.png',
				status: 'success',
				url: '/public/assets/images/deepseek.png',
				percentage: 100
			}
		];
		loading.value = false;
	}, 1200);
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
	// 预览图片
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
function submitUpload() {
	uploading.value = true;
	setTimeout(() => {
		fileList.value.forEach(f => {
			if (f.status !== 'success') {
				f.status = 'success';
				f.percentage = 100;
			}
		});
		uploading.value = false;
		ElMessage.success('全部上传成功！');
	}, 1800);
}
function downloadFile(file: any) {
	ElMessage.info('模拟下载：' + file.name);
}
function previewFile(file: any) {
	previewUrl.value = file.url || file.rawUrl;
	previewDialog.value = true;
}
function removeFile(file: any) {
	fileList.value = fileList.value.filter(f => f.uid !== file.uid);
	ElMessage.success('删除成功');
}
function isImage(file: any) {
	return file.type?.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png)$/i);
}
function statusText(status: string) {
	if (status === 'success') return '已上传';
	if (status === 'uploading') return '上传中';
	return '失败';
}
</script>

<style scoped lang="scss">
.resume-upload-bg {
	min-height: 100vh;
	background: linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%);
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 40px 0;
}
.resume-upload-card {
	width: 100%;
	max-width: 1100px;
	border-radius: 24px;
	box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.16);
	border: none;
	overflow: hidden;
	padding-bottom: 48px;
}
.upload-area {
	display: flex;
	align-items: flex-end;
	gap: 36px;
	margin-bottom: 48px;
	.upload-dragger {
		flex: 1;
		min-width: 420px;
		background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
		border-radius: 20px;
		box-shadow: 0 4px 16px #38bdf855;
		padding: 56px 0 40px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 3px dashed #38bdf8;
		transition: border-color 0.3s;
		&:hover {
			border-color: #6366f1;
		}
		.upload-icon {
			font-size: 80px;
			color: #6366f1;
			margin-bottom: 18px;
		}
		.upload-text {
			font-size: 1.6rem;
			color: #6366f1;
			margin-bottom: 12px;
			.upload-link {
				color: #38bdf8;
				text-decoration: underline;
				cursor: pointer;
				font-size: 1.2em;
			}
		}
		.upload-tip {
			font-size: 1.1rem;
			color: #64748b;
		}
	}
	.upload-btn {
		height: 64px;
		font-size: 1.4rem;
		border-radius: 16px;
		box-shadow: 0 4px 16px #38bdf855;
		margin-bottom: 12px;
		padding: 0 36px;
	}
}
.upload-history {
	margin-top: 36px;
	h3 {
		color: #6366f1;
		font-size: 1.4rem;
		margin-bottom: 18px;
	}
}
.file-card {
	border-radius: 18px;
	margin-bottom: 28px;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 220px;
	.file-thumb {
		width: 120px;
		height: 120px;
		border-radius: 16px;
		overflow: hidden;
		background: #f0fdfa;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16px;
		.el-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.file-icon {
			font-size: 60px;
			color: #6366f1;
		}
	}
	.file-info {
		width: 100%;
		text-align: center;
		.file-name {
			font-weight: 700;
			color: #6366f1;
			margin-bottom: 6px;
			font-size: 1.3rem;
			word-break: break-all;
		}
		.file-status {
			margin-bottom: 8px;
		}
	}
	.file-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		margin-top: 12px;
		.el-button {
			background: #fff;
			color: #6366f1;
			border-radius: 50%;
			box-shadow: 0 4px 16px #38bdf855;
			transition:
				transform 0.2s,
				box-shadow 0.2s;
			&:hover {
				transform: scale(1.16) rotate(-8deg);
				box-shadow: 0 8px 32px #38bdf855;
			}
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
@media (max-width: 1200px) {
	.resume-upload-card {
		max-width: 98vw;
		margin: 0 1vw;
	}
	.upload-area {
		flex-direction: column;
		gap: 18px;
		align-items: stretch;
		.upload-dragger {
			min-width: 0;
		}
	}
}
@media (max-width: 700px) {
	.resume-upload-card {
		padding-bottom: 18px;
	}
	.file-card {
		.file-thumb {
			width: 80px;
			height: 80px;
		}
	}
	.upload-area .upload-dragger {
		padding: 32px 0 20px 0;
	}
	.upload-area .upload-btn {
		height: 48px;
		font-size: 1.1rem;
		padding: 0 18px;
	}
}
</style>
