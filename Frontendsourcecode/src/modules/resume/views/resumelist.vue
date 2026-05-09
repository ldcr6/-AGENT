<template>
	<div class="resume-list-bg">
		<el-card class="resume-list-card" shadow="hover">
			<div class="resume-list-header">
				<el-icon class="resume-list-icon"><user-filled /></el-icon>
				<div>
					<h2>我的简历</h2>
					<p class="resume-list-desc">
						管理和维护你的个人简历，支持上传、编辑、预览等操作
					</p>
				</div>
				<div class="resume-list-header-btns">
					<el-button type="primary" @click="showUploadDialog = true" :loading="loading">
						<el-icon><upload-filled /></el-icon> 上传简历
					</el-button>
					<el-button type="success" @click="goToEdit">
						<el-icon><edit-pen /></el-icon> 制作新简历
					</el-button>
				</div>
			</div>
			<div class="resume-stats">
				<div class="stat-item">
					<el-icon><document /></el-icon>
					<div class="stat-num">{{ resumes.length }}</div>
					<div class="stat-label">简历总数</div>
				</div>
				<div class="stat-item">
					<el-icon><clock /></el-icon>
					<div class="stat-num">{{ recentResume?.name || '-' }}</div>
					<div class="stat-label">最近编辑</div>
				</div>
				<div class="stat-item">
					<el-icon><star-filled /></el-icon>
					<div class="stat-num">{{ resumes[0]?.name || '-' }}</div>
					<div class="stat-label">置顶简历</div>
				</div>
			</div>
			<div class="resume-search-bar">
				<el-input
					v-model="search"
					placeholder="搜索简历名称..."
					clearable
					prefix-icon="el-icon-search"
					@input="onSearch"
				/>
				<el-select v-model="filter" placeholder="筛选类型" clearable style="width: 120px">
					<el-option label="全部" value="all" />
					<el-option label="前端" value="前端" />
					<el-option label="产品" value="产品" />
				</el-select>
			</div>
			<transition name="fade">
				<el-skeleton v-if="loading" :rows="5" animated style="margin-top: 30px" />
				<div v-else>
					<el-empty v-if="filteredResumes.length === 0" description="暂无简历">
						<template #image>
							<img
								src="/public/assets/images/AI.jpg"
								style="width: 120px; opacity: 0.7"
							/>
						</template>
					</el-empty>
					<el-table
						v-else
						:data="pagedResumes"
						style="width: 100%; margin-top: 20px"
						class="resume-table"
						:row-class-name="rowClassName"
						@row-click="goToDetail"
					>
						<el-table-column prop="name" label="简历名称" />
						<el-table-column prop="createdAt" label="上传时间" />
						<el-table-column label="操作" :width="160">
							<template #default="scope">
								<el-space>
									<el-button
										circle
										size="small"
										class="action-btn view"
										@click.stop="goToDetail(scope.row)"
									>
										<span
											class="svg-eye"
											style="
												display: inline-flex;
												align-items: center;
												justify-content: center;
											"
										>
											<svg
												width="22"
												height="22"
												viewBox="0 0 1024 1024"
												fill="currentColor"
											>
												<path
													d="M512 224c-198.4 0-366.4 128-448 288 81.6 160 249.6 288 448 288s366.4-128 448-288c-81.6-160-249.6-288-448-288z m0 480c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-320c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128z"
												/>
											</svg>
										</span>
									</el-button>
									<el-button
										circle
										size="small"
										class="action-btn edit"
										@click.stop="goToEdit(scope.row)"
									>
										<el-icon><edit-pen /></el-icon>
									</el-button>
									<el-popconfirm
										title="确定删除该简历吗？"
										@confirm="deleteResume(scope.row)"
									>
										<template #reference>
											<el-button
												circle
												size="small"
												class="action-btn delete"
												@click.stop
											>
												<el-icon><delete-filled /></el-icon>
											</el-button>
										</template>
									</el-popconfirm>
								</el-space>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						v-if="filteredResumes.length > pageSize"
						background
						layout="prev, pager, next, jumper"
						:total="filteredResumes.length"
						:page-size="pageSize"
						v-model:current-page="currentPage"
						class="resume-pagination"
					/>
				</div>
			</transition>
			<div class="resume-recent">
				<h4>最近操作</h4>
				<div class="history-list">
					<div
						v-for="item in recentActions"
						:key="item.time + item.name"
						class="history-item"
					>
						<div class="history-icon" :class="item.type">
							<el-icon v-if="item.type === 'add'"><circle-plus-filled /></el-icon>
							<el-icon v-else-if="item.type === 'edit'"><edit-pen /></el-icon>
							<el-icon v-else-if="item.type === 'delete'"><delete-filled /></el-icon>
							<template v-else-if="item.type === 'view'">
								<svg
									width="24"
									height="24"
									viewBox="0 0 1024 1024"
									fill="currentColor"
									style="display: block; margin: auto"
								>
									<path
										d="M512 224c-198.4 0-366.4 128-448 288 81.6 160 249.6 288 448 288s366.4-128 448-288c-81.6-160-249.6-288-448-288z m0 480c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-320c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128z"
									/>
								</svg>
							</template>
						</div>
						<div class="file-info">
							<div class="file-name">
								<span>{{ item.action }}：</span>{{ item.name }}
							</div>
							<div class="file-meta">{{ item.time }}</div>
							<div class="file-desc" v-if="item.desc">{{ item.desc }}</div>
						</div>
					</div>
				</div>
			</div>
		</el-card>
		<!-- 新增上传弹窗 -->
		<el-dialog v-model="showUploadDialog" title="上传简历" width="420px" center>
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
						<el-icon class="upload-icon"><upload-filled /></el-icon>
						<div class="upload-text">拖拽文件到此处上传</div>
						<div class="upload-tip">支持 PDF、Word、JPG、PNG 格式，最大 5MB</div>
						<el-button type="primary" class="upload-btn">
							<el-icon><upload-filled /></el-icon> 选择文件
						</el-button>
					</el-upload>
				</div>
				<!-- 历史记录 -->
				<div class="upload-history">
					<div class="history-title">最近上传</div>
					<div v-if="fileList.length === 0" class="history-empty">暂无上传记录</div>
					<div v-else>
						<div v-for="file in fileList" :key="file.uid" class="history-item">
							<template v-if="isPdf(file)"
								><el-icon class="file-icon pdf"><document /></el-icon
							></template>
							<template v-else-if="isWord(file)"
								><el-icon class="file-icon word"><document /></el-icon
							></template>
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
				<el-button @click="showUploadDialog = false">取消</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
	UserFilled,
	UploadFilled,
	EditPen,
	// ViewFilled,
	DeleteFilled,
	Document,
	Clock,
	StarFilled,
	CirclePlusFilled,
	View
} from '@element-plus/icons-vue';

const router = useRouter();
const loading = ref(true);
const resumes = ref<any[]>([]);
const search = ref('');
const filter = ref('all');
const currentPage = ref(1);
const pageSize = 5;
const showUploadDialog = ref(false); // 新增弹窗控制变量
const recentActions = ref([
	{
		action: '新建',
		name: '张三-前端开发',
		time: '2024-05-01 10:00',
		desc: 'AI分析匹配度高，简历完成度85%',
		type: 'add'
	},
	{
		action: '编辑',
		name: '李四-产品经理',
		time: '2024-05-02 09:30',
		desc: 'AI优化建议：补充项目数据',
		type: 'edit'
	},
	{
		action: '查看',
		name: '王五-测试工程师',
		time: '2024-05-02 08:50',
		desc: '浏览了简历详情',
		type: 'view'
	},
	{
		action: '删除',
		name: '王五-测试工程师',
		time: '2024-05-02 08:20',
		desc: '因岗位已关闭，暂存于回收站',
		type: 'delete'
	}
]);
// 上传弹窗相关逻辑
const fileList = ref<any[]>([
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
]);
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

onMounted(() => {
	setTimeout(() => {
		resumes.value = [
			{ id: 1, name: '张三-前端开发', createdAt: '2024-05-01', type: '前端' },
			{ id: 2, name: '李四-产品经理', createdAt: '2024-05-02', type: '产品' },
			{ id: 3, name: '王五-测试工程师', createdAt: '2024-05-03', type: '测试' },
			{ id: 4, name: '赵六-前端开发', createdAt: '2024-05-04', type: '前端' },
			{ id: 5, name: '钱七-产品经理', createdAt: '2024-05-05', type: '产品' },
			{ id: 6, name: '孙八-前端开发', createdAt: '2024-05-06', type: '前端' }
		];
		loading.value = false;
	}, 1200);
});

const filteredResumes = computed(() => {
	let list = resumes.value;
	if (search.value) {
		list = list.filter(r => r.name.includes(search.value));
	}
	if (filter.value && filter.value !== 'all') {
		list = list.filter(r => r.type === filter.value);
	}
	return list;
});
const pagedResumes = computed(() => {
	const start = (currentPage.value - 1) * pageSize;
	return filteredResumes.value.slice(start, start + pageSize);
});
const recentResume = computed(() => resumes.value[resumes.value.length - 1]);

function goToEdit(row?: any) {
	if (row?.id) {
		router.push(`/resume/edit/${row.id}`);
	} else {
		router.push('/resume/edit');
	}
}
function goToDetail(row: any) {
	router.push(`/resume/detail/${row.id}`);
}
function deleteResume(row: any) {
	resumes.value = resumes.value.filter(r => r.id !== row.id);
	ElMessage.success('删除成功');
}
function rowClassName({ rowIndex }: { rowIndex: number }) {
	return rowIndex % 2 === 0 ? 'resume-row-even' : 'resume-row-odd';
}
function onSearch() {
	currentPage.value = 1;
}
</script>

<style scoped lang="scss">
.resume-list-bg {
	min-height: 100vh;
	background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 40px 0;
}
.resume-list-card {
	width: 100%;
	max-width: 1600px;
	border-radius: 18px;
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
	border: none;
	overflow: hidden;
	padding-bottom: 32px;
}
.resume-list-header {
	display: flex;
	align-items: center;
	gap: 18px;
	margin-bottom: 18px;
	background: linear-gradient(90deg, #6366f1 0%, #38bdf8 100%);
	border-radius: 12px 12px 0 0;
	padding: 24px 32px 18px 24px;
	color: #fff;
	position: relative;
	box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.08);
}
.resume-list-icon {
	font-size: 38px;
	margin-right: 8px;
	filter: drop-shadow(0 2px 8px #6366f1aa);
}
.resume-list-desc {
	font-size: 14px;
	color: #e0e7ff;
	margin: 0;
}
.resume-list-header-btns {
	margin-left: auto;
	display: flex;
	gap: 12px;
}
.resume-stats {
	display: flex;
	gap: 32px;
	margin: 18px 0 12px 0;
	justify-content: space-between;
	.stat-item {
		background: linear-gradient(90deg, #f0fdfa 0%, #e0e7ff 100%);
		border-radius: 12px;
		box-shadow: 0 2px 8px #38bdf855;
		padding: 12px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 120px;
		.el-icon {
			font-size: 22px;
			color: #6366f1;
			margin-bottom: 4px;
		}
		.stat-num {
			font-size: 1.5rem;
			font-weight: 700;
			color: #6366f1;
		}
		.stat-label {
			font-size: 13px;
			color: #64748b;
		}
	}
}
.resume-search-bar {
	display: flex;
	gap: 18px;
	margin-bottom: 8px;
	align-items: center;
}
.resume-table {
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 2px 12px 0 rgba(56, 189, 248, 0.08);
	transition: box-shadow 0.3s;
}
.resume-table .el-table__row {
	transition: background 0.3s;
}
.resume-table .el-table__row:hover {
	background: #f0fdfa !important;
}
.resume-row-even {
	background: #f8fafc;
}
.resume-row-odd {
	background: #fff;
}
.el-button {
	transition:
		transform 0.15s,
		box-shadow 0.15s;
}
.el-button:hover {
	transform: translateY(-2px) scale(1.05);
	box-shadow: 0 4px 16px 0 #38bdf855;
}
.resume-pagination {
	margin: 18px 0 0 0;
	display: flex;
	justify-content: flex-end;
}
.resume-recent {
	margin-top: 32px;
	background: #f8fafc;
	border-radius: 12px;
	box-shadow: 0 2px 8px #38bdf855;
	padding: 18px 24px;
	h4 {
		margin-bottom: 8px;
		color: #6366f1;
		font-size: 1.1rem;
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
@media (max-width: 600px) {
	.resume-list-card {
		max-width: 100vw;
		padding: 0;
	}
	.resume-list-header {
		flex-direction: column;
		align-items: flex-start;
		padding: 18px 12px 12px 12px;
		gap: 8px;
	}
	.resume-list-header-btns {
		width: 100%;
		justify-content: flex-end;
	}
	.resume-stats {
		flex-direction: column;
		gap: 8px;
		.stat-item {
			min-width: 0;
			width: 100%;
			align-items: flex-start;
		}
	}
	.resume-search-bar {
		flex-direction: column;
		gap: 8px;
		align-items: stretch;
	}
}
/* 上传历史卡片美化 */
.upload-history {
	margin-top: 24px;
	.history-title {
		font-weight: 700;
		color: #6366f1;
		margin-bottom: 12px;
	}
	.history-item {
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 2px 8px #38bdf855;
		padding: 12px 18px;
		margin-bottom: 12px;
		.file-icon {
			font-size: 32px;
			margin-right: 12px;
			&.pdf {
				color: #e53e3e;
			}
			&.word {
				color: #3182ce;
			}
		}
		.file-info {
			flex: 1;
			.file-name {
				font-weight: 600;
			}
			.file-meta {
				color: #64748b;
				font-size: 13px;
			}
		}
		.el-button {
			background: #f1f5ff;
			color: #6366f1;
			border-radius: 50%;
			box-shadow: 0 2px 8px #38bdf855;
			margin-left: 8px;
			&:hover {
				background: #6366f1;
				color: #fff;
				box-shadow: 0 4px 16px #38bdf855;
			}
		}
	}
	.history-empty {
		color: #64748b;
		text-align: center;
		margin: 24px 0;
	}
}
.history-list {
	margin-top: 8px;
}
.history-item {
	display: flex;
	align-items: flex-start;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 8px #38bdf855;
	padding: 14px 20px;
	margin-bottom: 14px;
	.history-icon {
		margin-right: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		&.add {
			background: #e6f9f0;
			color: #22c55e;
		}
		&.edit {
			background: #e6f0fa;
			color: #2563eb;
		}
		&.delete {
			background: #fbeaea;
			color: #ef4444;
		}
		&.view {
			background: #f3f4f6;
			color: #64748b;
		}
	}
	.file-info {
		flex: 1;
		.file-name {
			font-weight: 600;
			font-size: 16px;
		}
		.file-meta {
			color: #64748b;
			font-size: 13px;
			margin-top: 2px;
		}
		.file-desc {
			color: #94a3b8;
			font-size: 13px;
			margin-top: 4px;
		}
	}
}
.action-btn {
	background: #f1f5ff;
	color: #6366f1;
	border-radius: 50%;
	box-shadow: 0 2px 8px #38bdf855;
	border: none;
	transition:
		background 0.2s,
		color 0.2s,
		box-shadow 0.2s;
	&.view {
		background: #e6f0fa;
		color: #2563eb;
		transition:
			background 0.2s,
			color 0.2s,
			box-shadow 0.2s,
			transform 0.15s;
		&:hover {
			background: #2563eb;
			color: #fff;
			box-shadow: 0 4px 16px #2563eb33;
			transform: scale(1.12);
		}
		.el-icon {
			font-size: 22px !important;
		}
	}
	&.edit {
		background: #e6f0fa;
		color: #2563eb;
		&:hover {
			background: #2563eb;
			color: #fff;
		}
	}
	&.delete {
		background: #fbeaea;
		color: #ef4444;
		&:hover {
			background: #ef4444;
			color: #fff;
		}
	}
}
</style>
