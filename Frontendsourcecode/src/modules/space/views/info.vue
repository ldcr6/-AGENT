<template>
	<div
		class="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 py-12 px-8 flex flex-col items-center"
	>
		<div class="w-full max-w-6xl flex gap-8 items-start">
			<!-- 左侧：个人信息卡片，高度与右侧对齐 -->
			<div
				class="flex-1 bg-white/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative overflow-hidden min-w-[340px] max-w-[400px]"
				:style="{ height: '460px' }"
				ref="leftBoxRef"
			>
				<!-- 炫酷渐变圆环背景 -->
				<div
					class="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-2xl z-0"
				></div>
				<div
					class="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<!-- 头像（可更换） -->
				<div class="relative group mb-2">
					<img
						class="w-28 h-28 rounded-full border-4 border-white shadow-lg z-10 object-cover cursor-pointer"
						:src="user.info?.headImg || 'https://picsum.photos/200/200?random=1'"
						alt="头像"
						@click="openEdit"
					/>
					<div
						class="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
						@click="openEdit"
					>
						<i class="fa-solid fa-camera text-white text-2xl"></i>
					</div>
				</div>
				<!-- 昵称 -->
				<h2 class="mt-2 text-2xl font-bold text-gray-800 z-10">
					{{ user.info?.nickName || '重生之我在sias做牛马' }}
				</h2>
				<!-- 求职状态 -->
				<p class="text-sm text-gray-500 mt-2 z-10">求职状态：应届生-Web前端工程师</p>
				<!-- 统计信息 -->
				<div class="flex justify-between w-full mt-8 z-10 gap-2">
					<div class="flex-1 text-center">
						<div class="text-3xl font-extrabold text-blue-500 drop-shadow">10</div>
						<div class="text-xs text-gray-500 mt-1">学习天数</div>
					</div>
					<div class="flex-1 text-center">
						<div class="text-3xl font-extrabold text-purple-500 drop-shadow">
							{{ user.info?.wrongCount ?? 23 }}
						</div>
						<div class="text-xs text-gray-500 mt-1">我的错题</div>
					</div>
					<div class="flex-1 text-center">
						<div class="text-3xl font-extrabold text-pink-500 drop-shadow">
							{{ user.info?.interviewCount ?? 5 }}
						</div>
						<div class="text-xs text-gray-500 mt-1">面试次数</div>
					</div>
				</div>
				<!-- 编辑信息按钮 -->
				<button
					class="mt-8 px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold shadow-md hover:scale-105 transition-transform"
					@click="openEdit"
				>
					编辑信息
				</button>
			</div>
			<!-- 右侧：功能入口卡片区，包含退出登录卡片 -->
			<div class="flex-[2.5] flex flex-col gap-6 min-w-[420px]" ref="rightBoxRef">
				<div class="grid grid-cols-2 gap-6 flex-1">
					<div
						class="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-md flex items-center px-8 py-6 hover:scale-105 transition-transform cursor-pointer"
					>
						<div
							class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-400/20 text-blue-500 text-2xl mr-6"
						>
							<i class="fa-solid fa-user-gear"></i>
						</div>
						<div>
							<div class="font-semibold text-gray-800 text-lg">个性化刷题</div>
							<div class="text-xs text-gray-500 mt-1">
								个性化生成题目，区别于传统刷题
							</div>
						</div>
					</div>
					<!-- 面试题库卡片 -->
					<div
						class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-md flex items-center px-8 py-6 hover:scale-105 transition-transform cursor-pointer"
						@click="goToCategory"
					>
						<div
							class="w-12 h-12 flex items-center justify-center rounded-full bg-purple-400/20 text-purple-500 text-2xl mr-6"
						>
							<i class="fa-solid fa-database"></i>
						</div>
						<div>
							<div class="font-semibold text-gray-800 text-lg">面试题库</div>
							<div class="text-xs text-gray-500 mt-1">查看各类面试题目</div>
						</div>
					</div>
					<div
						class="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl shadow-md flex items-center px-8 py-6 hover:scale-105 transition-transform cursor-pointer"
						@click="goToMyAchievement"
					>
						<div
							class="w-12 h-12 flex items-center justify-center rounded-full bg-orange-400/20 text-orange-500 text-2xl mr-6"
						>
							<i class="fa-solid fa-pen-to-square"></i>
						</div>
						<div>
							<div class="font-semibold text-gray-800 text-lg">我的学习</div>
							<div class="text-xs text-gray-500 mt-1">查看我的学习进程</div>
						</div>
					</div>
					<div
						class="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-md flex items-center px-8 py-6 hover:scale-105 transition-transform cursor-pointer"
						@click="goToUserCollect"
					>
						<div
							class="w-12 h-12 flex items-center justify-center rounded-full bg-green-400/20 text-green-500 text-2xl mr-6"
						>
							<i class="fa-solid fa-star"></i>
						</div>
						<div>
							<div class="font-semibold text-gray-800 text-lg">我的收藏</div>
							<div class="text-xs text-gray-500 mt-1">查看收藏的面试题目</div>
						</div>
					</div>
					<div
						class="bg-gradient-to-r from-gray-100 to-blue-50 rounded-xl shadow-md flex items-center px-8 py-6 hover:scale-105 transition-transform cursor-pointer col-span-2"
					>
						<div
							class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-400/20 text-gray-500 text-2xl mr-6"
						>
							<i class="fa-solid fa-gear"></i>
						</div>
						<div>
							<div class="font-semibold text-gray-800 text-lg">设置</div>
							<div class="text-xs text-gray-500 mt-1">隐私与安全</div>
						</div>
					</div>
				</div>
				<!-- 退出登录卡片 -->
				<div
					class="bg-gradient-to-r from-gray-100 to-blue-50 rounded-xl shadow-md flex items-center px-8 py-6 hover:scale-105 transition-transform cursor-pointer mt-0"
					@click="logout"
				>
					<div
						class="w-12 h-12 flex items-center justify-center rounded-full bg-red-400/20 text-red-500 text-2xl mr-6"
					>
						<i class="fa-solid fa-right-from-bracket"></i>
					</div>
					<div>
						<div class="font-semibold text-gray-800 text-lg">切换账号 / 退出登录</div>
						<div class="text-xs text-gray-500 mt-1">安全退出当前账号</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 下半部分：成长曲线和近期动态 -->
		<div class="w-full max-w-6xl flex gap-8 mt-12 items-start">
			<!-- 成长曲线 -->
			<div class="flex-[2] bg-white/80 rounded-3xl shadow-xl p-8 relative overflow-hidden">
				<div
					class="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<h3 class="text-lg font-bold text-gray-700 mb-4 z-10 relative">我的成长曲线</h3>
				<!-- 静态SVG折线图 -->
				<div class="h-48 flex items-end z-10 relative">
					<svg viewBox="0 0 400 150" class="w-full h-full">
						<defs>
							<linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="#7c3aed" />
								<stop offset="100%" stop-color="#38bdf8" />
							</linearGradient>
							<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="#a5b4fc" stop-opacity="0.5" />
								<stop offset="100%" stop-color="#f0f9ff" stop-opacity="0" />
							</linearGradient>
						</defs>
						<!-- 区域 -->
						<polygon
							points="0,120 40,100 80,80 120,90 160,60 200,70 240,40 280,60 320,30 360,50 400,20 400,150 0,150"
							fill="url(#areaGradient)"
						/>
						<!-- 折线 -->
						<polyline
							points="0,120 40,100 80,80 120,90 160,60 200,70 240,40 280,60 320,30 360,50 400,20"
							fill="none"
							stroke="url(#lineGradient)"
							stroke-width="4"
						/>
						<!-- 圆点 -->
						<circle cx="0" cy="120" r="4" fill="#7c3aed" />
						<circle cx="80" cy="80" r="4" fill="#7c3aed" />
						<circle cx="160" cy="60" r="4" fill="#7c3aed" />
						<circle cx="240" cy="40" r="4" fill="#7c3aed" />
						<circle cx="320" cy="30" r="4" fill="#7c3aed" />
						<circle cx="400" cy="20" r="4" fill="#7c3aed" />
					</svg>
				</div>
				<div class="flex justify-between text-xs text-gray-400 mt-2 z-10 relative">
					<span>4月</span><span>5月</span><span>6月</span><span>7月</span><span>8月</span
					><span>9月</span><span>10月</span>
				</div>
			</div>
			<!-- 近期动态 -->
			<div
				class="flex-1 bg-white/80 rounded-3xl shadow-xl p-8 relative overflow-hidden min-w-[320px]"
			>
				<div
					class="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-tr from-pink-300 via-blue-300 to-purple-300 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<h3 class="text-lg font-bold text-gray-700 mb-4 z-10 relative">近期动态</h3>
				<ul class="space-y-4 z-10 relative">
					<li class="flex items-center gap-3">
						<span class="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
						<span class="text-gray-700 font-medium"
							>完成了"Vue3 响应式原理"专项面试题</span
						>
						<span class="ml-auto text-xs text-gray-400">2小时前</span>
					</li>
					<li class="flex items-center gap-3">
						<span class="inline-block w-3 h-3 rounded-full bg-purple-400"></span>
						<span class="text-gray-700 font-medium">获得"前端小能手"徽章</span>
						<span class="ml-auto text-xs text-gray-400">昨天</span>
					</li>
					<li class="flex items-center gap-3">
						<span class="inline-block w-3 h-3 rounded-full bg-pink-400"></span>
						<span class="text-gray-700 font-medium">累计学习天数突破 10 天</span>
						<span class="ml-auto text-xs text-gray-400">3天前</span>
					</li>
					<li class="flex items-center gap-3">
						<span class="inline-block w-3 h-3 rounded-full bg-green-400"></span>
						<span class="text-gray-700 font-medium">收藏了"算法高频面试题"</span>
						<span class="ml-auto text-xs text-gray-400">2天前</span>
					</li>
					<li class="flex items-center gap-3">
						<span class="inline-block w-3 h-3 rounded-full bg-yellow-400">
							<i class="fa-solid fa-star"></i>
						</span>
						<span class="text-gray-700 font-medium">成功通过"前端小能手"面试</span>
						<span class="ml-auto text-xs text-gray-400">一周前</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- 编辑信息弹窗 -->
		<el-dialog
			v-model="editVisible"
			title="编辑个人信息"
			width="400px"
			:close-on-click-modal="false"
		>
			<el-form label-width="80px" :model="editForm" :rules="rules" ref="editFormRef">
				<el-form-item label="头像">
					<cl-upload v-model="editForm.headImg" :width="80" :height="80" circle />
				</el-form-item>
				<el-form-item label="昵称" prop="nickName">
					<el-input v-model="editForm.nickName" placeholder="请输入昵称" clearable />
				</el-form-item>
				<el-form-item label="原密码" prop="oldPassword">
					<el-input
						v-model="editForm.oldPassword"
						type="password"
						placeholder="请输入原密码"
						clearable
					/>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
					<el-input
						v-model="editForm.password"
						type="password"
						placeholder="请输入新密码"
						clearable
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="editVisible = false">取消</el-button>
				<el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
			</template>
		</el-dialog>
	</div>
	<PageFooter />
</template>

<script lang="ts" setup>
defineOptions({
	name: 'MyInfo'
});

import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, nextTick } from 'vue';
import { useBase } from '/$/base';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import PageFooter from '../../../components/PageFooter.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

function goToCategory() {
	router.push('/question/category');
}

function goToMyAchievement() {
	router.push('/mysapace/Achievement');
}

function goToUserCollect() {
	router.push('/question/userCollect');
}

const { t } = useI18n();
const { service } = useCool();
const { user } = useBase();

// 退出登录
function logout() {
	user.logout();
}

// 左右高度对齐
const leftBoxRef = ref();
const rightBoxRef = ref();
const rightBoxHeight = ref(0);

function updateBoxHeight() {
	if (rightBoxRef.value) {
		rightBoxHeight.value = rightBoxRef.value.offsetHeight;
	}
}

onMounted(() => {
	// 保证页面初始时头像、昵称等与全局同步
	editForm.headImg = user.info?.headImg || '';
	editForm.nickName = user.info?.nickName || '';
	updateBoxHeight();
	window.addEventListener('resize', updateBoxHeight);
});

// 编辑弹窗相关
const editVisible = ref(false);
const editFormRef = ref();
const loading = ref(false);

const editForm = reactive({
	headImg: '',
	nickName: '',
	password: '',
	oldPassword: ''
});

const rules = {
	nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
};

function openEdit() {
	editForm.headImg = user.info?.headImg || '';
	editForm.nickName = user.info?.nickName || '';
	editForm.password = '';
	editForm.oldPassword = '';
	editVisible.value = true;
	nextTick(() => {
		editFormRef.value?.clearValidate();
	});
}

async function onSave() {
	await editFormRef.value?.validate();
	loading.value = true;
	await service.base.comm
		.personUpdate(editForm)
		.then(() => {
			editForm.password = '';
			editForm.oldPassword = '';
			ElMessage.success(t('修改成功'));
			user.get(); // 刷新全局用户信息
			editVisible.value = false;
		})
		.catch(err => {
			ElMessage.error(err.message);
		});
	loading.value = false;
}
</script>

<style lang="scss">
.view-my {
	background-color: var(--el-bg-color);
	height: 100%;
	box-sizing: border-box;
	border-radius: 6px;

	.el-form {
		width: 400px;
		max-width: 100%;
	}

	.title {
		margin-bottom: 30px;
		font-size: 15px;
		font-weight: bold;
	}
}
</style>
