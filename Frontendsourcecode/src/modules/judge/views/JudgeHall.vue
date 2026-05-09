<template>
	<div class="judge-hall-bg min-h-screen py-8 px-10 flex flex-col items-center">
		<!-- 顶部导航与数据概览 -->
		<div class="w-full max-w-7xl flex items-center justify-between mb-8">
			<!-- 左：发起新众裁按钮 -->
			<button
				class="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform flex items-center gap-2"
				@click="showCreateDialog = true"
			>
				<i class="fa-solid fa-plus"></i> 发起新众裁
			</button>
			<!-- 中：筛选器 -->
			<div class="flex items-center gap-4 bg-white/80 rounded-xl px-6 py-2 shadow-md">
				<select class="rounded-lg px-3 py-1 bg-gray-100 text-gray-700 focus:outline-none">
					<option>全部状态</option>
					<option>待处理</option>
					<option>进行中</option>
					<option>已完成</option>
				</select>
				<input
					class="rounded-lg px-3 py-1 bg-gray-100 text-gray-700 focus:outline-none"
					placeholder="职位类型/候选人姓名"
				/>
				<button
					class="text-blue-500 font-bold px-3 py-1 rounded-lg hover:bg-blue-50 transition"
				>
					筛选
				</button>
			</div>
			<!-- 右：数据概览 -->
			<div class="flex items-center gap-8">
				<div class="flex flex-col items-center">
					<span class="text-2xl font-bold text-blue-500">12</span>
					<span class="text-xs text-gray-500 mt-1">今日众裁</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="text-2xl font-bold text-orange-500">4</span>
					<span class="text-xs text-gray-500 mt-1">待处理</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="text-2xl font-bold text-green-500">18min</span>
					<span class="text-xs text-gray-500 mt-1">平均时长</span>
				</div>
			</div>
		</div>

		<!-- 内容区 -->
		<div class="w-full max-w-7xl grid grid-cols-3 gap-8">
			<!-- 进行中众裁 -->
			<div class="col-span-2 bg-white/90 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
				<div
					class="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 opacity-30 rounded-full blur-2xl z-0"
				></div>
				<div class="flex items-center justify-between mb-6 z-10 relative">
					<h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
						<i class="fa-solid fa-bolt text-yellow-400"></i> 进行中的众裁
					</h2>
					<button
						class="px-4 py-1 rounded-lg bg-gray-100 text-blue-500 text-xs font-bold shadow hover:bg-blue-100 transition"
						@click="changeCases"
					>
						<i class="fa-solid fa-arrows-rotate mr-1"></i> 换一换
					</button>
				</div>
				<div class="grid grid-cols-2 gap-6 z-10 relative">
					<!-- 动态渲染众裁任务卡片 -->
					<div
						v-for="item in currentCases"
						:key="item.id"
						class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:scale-105 transition-transform cursor-pointer border border-blue-100"
					>
						<div class="flex items-center gap-4">
							<img
								class="w-14 h-14 rounded-full object-cover border-2"
								:class="
									item.statusTag.color === 'blue'
										? 'border-blue-200'
										: 'border-pink-200'
								"
								:src="item.avatar"
								alt="候选人"
							/>
							<div>
								<div
									class="font-bold text-lg text-gray-800 flex items-center gap-2"
								>
									{{ item.name }}
									<span
										v-for="tag in item.tags"
										:key="tag"
										:class="`bg-${item.statusTag.color}-100 text-${item.statusTag.color}-600 text-xs px-2 py-0.5 rounded ml-2`"
										>{{ tag }}</span
									>
								</div>
								<div class="text-sm text-gray-500 mt-1">
									{{ item.position }}
								</div>
							</div>
							<span
								class="ml-auto"
								:class="`bg-${item.statusTag.color}-100 text-${item.statusTag.color}-500 text-xs px-2 py-0.5 rounded`"
								>{{ item.statusTag.text }}</span
							>
						</div>
						<div class="flex items-center gap-2 mt-2">
							<div
								class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative"
							>
								<div
									class="h-full"
									:class="`bg-gradient-to-r from-${item.statusTag.color}-400 to-purple-400 rounded-full`"
									:style="{ width: item.progress * 100 + '%' }"
								></div>
							</div>
							<span class="text-xs text-gray-500 ml-2"
								>{{ item.finished }}/{{ item.total }} 评审已完成</span
							>
						</div>
						<div class="flex gap-2 mt-2">
							<button
								class="px-4 py-1 rounded-lg bg-blue-500 text-white text-xs font-bold shadow hover:bg-blue-600 transition"
								@click="goDetail(item.id)"
							>
								进入评审
							</button>
							<button
								class="px-3 py-1 rounded-lg bg-orange-100 text-orange-500 text-xs font-bold shadow hover:bg-orange-200 transition"
								:disabled="item.urged"
								@click="urge(item.id)"
							>
								{{ item.urged ? '已催促' : '催促' }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- 右侧：待处理+历史众裁 -->
			<div class="flex flex-col gap-8">
				<!-- 待处理众裁 -->
				<div
					class="bg-white/90 rounded-3xl shadow-xl p-6 relative overflow-hidden min-w-[320px]"
				>
					<div
						class="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-tr from-orange-200 via-pink-200 to-purple-200 opacity-20 rounded-full blur-2xl z-0"
					></div>
					<h2
						class="text-lg font-bold text-gray-800 mb-4 z-10 relative flex items-center gap-2"
					>
						<i class="fa-solid fa-clock text-orange-400"></i> 待处理众裁
					</h2>
					<div class="flex flex-col gap-4 z-10 relative">
						<div
							v-for="item in pendingCases.slice(0, 2)"
							:key="item.id"
							class="flex items-center justify-between rounded-xl px-6 py-4 shadow border transition-all duration-200"
							:class="{
								'bg-orange-50 border-orange-100': item.pendingTime > 10,
								'bg-red-50 border-red-200':
									item.pendingTime <= 10 && item.pendingTime >= 0,
								'bg-red-100 border-red-300': item.pendingTime < 0
							}"
						>
							<!-- 左侧：头像+姓名+岗位 -->
							<div class="flex items-center gap-4 min-w-[120px]">
								<img
									class="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
									:src="item.avatar"
								/>
								<div>
									<div class="font-bold text-lg text-gray-800">
										{{ item.name }}
									</div>
									<div class="text-xs text-gray-500 mt-0.5">
										{{ item.position }}
									</div>
								</div>
							</div>
							<!-- 中间：状态+倒计时 -->
							<div class="flex flex-col items-center min-w-[90px]">
								<span
									:class="
										{
											'bg-red-100 text-red-500': item.pendingTime < 0,
											'bg-orange-100 text-orange-500':
												item.pendingTime >= 0 && item.pendingTime <= 10,
											'bg-blue-100 text-blue-500': item.pendingTime > 10
										} + ' text-xs px-2 py-0.5 rounded mb-1'
									"
								>
									{{
										item.pendingTime < 0
											? '已超时'
											: item.pendingTime <= 10
												? '即将超时'
												: '新任务'
									}}
								</span>
								<span
									class="text-xs font-bold"
									:class="item.pendingTime < 0 ? 'text-red-500' : 'text-gray-500'"
								>
									{{ formatPendingTime(item.pendingTime) }}
								</span>
							</div>
							<!-- 右侧：按钮/分配信息 -->
							<div class="flex flex-col items-end min-w-[110px]">
								<template v-if="item.status === 'pending'">
									<button
										class="px-4 py-2 rounded-lg bg-orange-500 text-white text-xs font-bold shadow hover:bg-orange-600 transition"
										@click="openJudgeDialog(item)"
									>
										分配评审官
									</button>
								</template>
								<template v-else>
									<span class="text-green-500 text-xs font-bold mb-1"
										>已分配：{{ item.assignedJudge }}</span
									>
									<button
										class="px-4 py-2 rounded-lg bg-gray-300 text-white text-xs font-bold shadow"
										disabled
									>
										已分配
									</button>
								</template>
							</div>
						</div>
						<el-dialog
							v-model="showJudgeDialog"
							title="分配评审官"
							width="320px"
							:close-on-click-modal="false"
						>
							<div class="flex flex-col gap-3">
								<button
									v-for="judge in judgeList"
									:key="judge.name"
									class="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition border border-gray-100"
									@click="assignJudge(judge)"
								>
									<img
										:src="judge.avatar"
										class="w-8 h-8 rounded-full border-2 border-blue-200"
									/>
									<span class="font-bold text-gray-700">{{ judge.name }}</span>
								</button>
							</div>
						</el-dialog>
					</div>
					<el-dialog
						v-model="showJudgeDialog"
						title="分配评审官"
						width="320px"
						:close-on-click-modal="false"
					>
						<div class="flex flex-col gap-3">
							<button
								v-for="judge in judgeList"
								:key="judge.name"
								class="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition border border-gray-100"
								@click="assignJudge(judge)"
							>
								<img
									:src="judge.avatar"
									class="w-8 h-8 rounded-full border-2 border-blue-200"
								/>
								<span class="font-bold text-gray-700">{{ judge.name }}</span>
							</button>
						</div>
					</el-dialog>
				</div>
				<!-- 历史众裁记录 -->
				<div
					class="bg-white/90 rounded-3xl shadow-xl p-6 relative overflow-hidden min-w-[320px]"
				>
					<div
						class="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-green-200 via-blue-200 to-purple-200 opacity-20 rounded-full blur-2xl z-0"
					></div>
					<h2
						class="text-lg font-bold text-gray-800 mb-4 z-10 relative flex items-center gap-2"
					>
						<i class="fa-solid fa-history text-gray-400"></i> 历史众裁记录
					</h2>
					<div class="flex flex-col gap-4 z-10 relative">
						<div
							class="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3 shadow border border-green-100"
						>
							<img
								class="w-10 h-10 rounded-full object-cover border-2 border-green-200"
								src="https://randomuser.me/api/portraits/men/7.jpg"
							/>
							<div class="flex-1">
								<div class="font-bold text-gray-700">钱七</div>
								<div class="text-xs text-gray-500 mt-0.5">UI设计师</div>
							</div>
							<span class="bg-green-100 text-green-500 text-xs px-2 py-0.5 rounded"
								>通过</span
							>
							<button
								class="ml-2 px-3 py-1 rounded-lg bg-green-500 text-white text-xs font-bold shadow hover:bg-green-600 transition"
								@click="goDetail(7)"
							>
								查看详情
							</button>
						</div>
						<div
							class="flex items-center gap-3 bg-red-50 rounded-xl px-4 py-3 shadow border border-red-100"
						>
							<img
								class="w-10 h-10 rounded-full object-cover border-2 border-red-200"
								src="https://randomuser.me/api/portraits/women/8.jpg"
							/>
							<div class="flex-1">
								<div class="font-bold text-gray-700">孙八</div>
								<div class="text-xs text-gray-500 mt-0.5">运维工程师</div>
							</div>
							<span class="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded"
								>拒绝</span
							>
							<button
								class="ml-2 px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-bold shadow hover:bg-red-600 transition"
								@click="goDetail(8)"
							>
								查看详情
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 新增：下方更多模块 -->
		<div class="w-full max-w-7xl grid grid-cols-3 gap-8 mt-12">
			<!-- 聊天/评论区 -->
			<div
				class="col-span-2 bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col relative overflow-hidden min-h-[340px]"
			>
				<div
					class="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<h2
					class="text-lg font-bold text-gray-800 mb-4 z-10 relative flex items-center gap-2"
				>
					<i class="fa-solid fa-comments text-blue-400"></i> 众裁讨论区
				</h2>
				<div
					class="flex-1 flex flex-col gap-3 overflow-y-auto z-10 relative pr-2"
					style="max-height: 220px"
				>
					<div
						v-for="(msg, idx) in displayDiscussions"
						:key="idx"
						class="flex items-end gap-2"
						:class="msg.name === '你' ? 'justify-end' : ''"
					>
						<!-- 左侧头像（他人） -->
						<img
							v-if="msg.name !== '你'"
							:src="msg.avatar"
							class="w-8 h-8 rounded-full object-cover border-2 border-blue-300"
						/>
						<div
							:class="
								msg.name === '你'
									? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
									: 'bg-white text-gray-800'
							"
							class="px-4 py-2 rounded-2xl shadow max-w-[60%]"
						>
							<div class="flex items-center gap-2 mb-1">
								<span class="font-bold text-xs">{{ msg.name }}</span>
								<span v-if="msg.role" class="text-xs font-bold text-blue-500">{{
									msg.role
								}}</span>
							</div>
							<div>{{ msg.content }}</div>
							<div class="text-xs text-gray-400 mt-1 flex items-center gap-4">
								<span>{{ msg.time }}</span>
								<button
									class="flex items-center gap-1 text-gray-500 hover:text-blue-500 text-xs"
									@click="likeDiscussion(idx)"
								>
									<i class="fa-regular fa-thumbs-up"></i>{{ msg.likes }}
								</button>
								<button
									class="flex items-center gap-1 text-gray-500 hover:text-blue-500 text-xs"
									@click="replyDiscussion(msg)"
								>
									<i class="fa-regular fa-comment-dots"></i>{{ msg.replies }}
								</button>
							</div>
						</div>
						<!-- 右侧头像（你） -->
						<img
							v-if="msg.name === '你'"
							:src="msg.avatar"
							class="w-8 h-8 rounded-full object-cover border-2 border-purple-300"
						/>
					</div>
				</div>
				<div class="mt-4 text-center">
					<button
						class="text-blue-500 text-sm font-bold hover:underline"
						@click="showDiscussionMore = true"
						v-if="
							!showDiscussionMore &&
							discussionCases &&
							discussionCases.discussions &&
							discussionCases.discussions.length > 4
						"
					>
						展开更多讨论 <i class="fa-solid fa-chevron-down"></i>
					</button>
				</div>
				<div class="mt-4 flex items-center gap-2 z-10 relative">
					<input
						v-model="discussionInput"
						ref="discussionInputRef"
						class="flex-1 rounded-2xl px-4 py-2 bg-gray-100 focus:outline-none shadow text-gray-700"
						placeholder="输入评论，@可@某人..."
					/>
					<button
						class="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 rounded-2xl font-bold shadow hover:scale-105 transition-transform flex items-center gap-1"
						@click="sendDiscussion"
					>
						<i class="fa-solid fa-paper-plane"></i> 发送
					</button>
				</div>
			</div>
			<!-- 评审官在线状态区 -->
			<div
				class="bg-white/90 rounded-3xl shadow-xl p-6 flex flex-col items-center relative overflow-hidden min-h-[340px]"
			>
				<div
					class="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-tr from-green-200 via-blue-200 to-purple-200 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<h2
					class="text-lg font-bold text-gray-800 mb-4 z-10 relative flex items-center gap-2"
				>
					<i class="fa-solid fa-user-group text-green-400"></i> 评审官在线状态
				</h2>
				<div class="flex flex-wrap gap-4 z-10 relative mt-2 justify-center">
					<div
						class="flex flex-col items-center"
						v-for="judge in judgeList"
						:key="judge.name"
					>
						<img
							:src="judge.avatar"
							class="w-12 h-12 rounded-full border-2 shadow"
							:class="
								judge.online
									? judge.called
										? 'border-blue-500 animate-pulse'
										: 'border-green-400'
									: 'border-gray-300'
							"
						/>
						<span
							class="mt-1 text-xs font-bold flex items-center gap-1"
							:class="judge.online ? 'text-green-500' : 'text-gray-400'"
						>
							{{ judge.online ? '在线' : '离线' }}
							<span
								v-if="judge.called"
								class="ml-1 bg-blue-100 text-blue-500 px-1.5 py-0.5 rounded text-xxs animate-pulse"
								>已呼叫</span
							>
						</span>
						<span class="text-xs text-gray-500">{{ judge.name }}</span>
						<span
							class="text-xs px-2 py-0.5 rounded mt-1"
							:class="{
								'bg-green-100 text-green-500': judge.role === '高级评审官',
								'bg-blue-100 text-blue-500': judge.role === '普通评审官',
								'bg-orange-100 text-orange-500': judge.role === '新手评审官'
							}"
							>{{ judge.role }}</span
						>
					</div>
				</div>
				<div class="mt-6 flex gap-2 z-10 relative">
					<button
						class="px-4 py-1 rounded-lg bg-blue-100 text-blue-500 text-xs font-bold shadow hover:bg-blue-200 transition"
						@click="callAllJudges"
					>
						一键呼叫
					</button>
					<button
						class="px-4 py-1 rounded-lg bg-green-100 text-green-500 text-xs font-bold shadow hover:bg-green-200 transition"
						@click="batchAssignJudges"
					>
						批量分配
					</button>
				</div>
				<!-- 呼叫弹窗 -->
				<el-dialog
					v-model="showCallDialog"
					title="在线评审官"
					width="400px"
					:close-on-click-modal="false"
				>
					<div class="flex flex-col gap-4">
						<div
							v-for="judge in judgeList.filter(j => j.online)"
							:key="judge.name"
							class="flex items-center gap-3 p-3 rounded border border-blue-100 bg-blue-50/60"
						>
							<img
								:src="judge.avatar"
								class="w-10 h-10 rounded-full border-2 border-blue-400"
							/>
							<div class="flex-1">
								<div class="font-bold text-gray-700">{{ judge.name }}</div>
								<div class="text-xs text-gray-500">{{ judge.role }}</div>
							</div>
							<button
								class="px-3 py-1 rounded bg-blue-500 text-white text-xs font-bold shadow hover:bg-blue-600 transition"
								@click="assignTaskToJudge(judge)"
							>
								<i class="fa-solid fa-user-check mr-1"></i>分配任务
							</button>
							<button
								class="px-3 py-1 rounded bg-purple-100 text-purple-500 text-xs font-bold shadow hover:bg-purple-200 transition ml-2"
								@click="sendMsgToJudge(judge)"
							>
								<i class="fa-regular fa-comment-dots mr-1"></i>发私信
							</button>
						</div>
					</div>
				</el-dialog>
			</div>
		</div>
		<!-- AI辅助建议卡片 -->
		<div class="w-full max-w-7xl mt-8">
			<div
				class="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 flex items-center gap-6 relative overflow-hidden"
			>
				<div
					class="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<i class="fa-solid fa-robot text-3xl text-purple-400 z-10"></i>
				<div class="flex-1 z-10">
					<div class="font-bold text-lg text-gray-800 mb-1">AI辅助建议</div>
					<div class="text-gray-600 text-sm">
						AI分析：候选人技术能力评分高于平均，沟通能力略低于同岗位平均，建议重点关注岗位匹配度维度的评审意见。如需快速评审，可参考历史优秀候选人模板。
					</div>
				</div>
				<button
					class="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 rounded-2xl font-bold shadow hover:scale-105 transition-transform flex items-center gap-1 z-10"
					:disabled="aiCommentLoading"
					@click="generateAIComment"
				>
					<i v-if="!aiCommentLoading" class="fa-solid fa-magic"></i>
					<i v-else class="fa-solid fa-spinner fa-spin"></i>
					{{ aiCommentLoading ? '生成中...' : '一键生成评语' }}
				</button>
			</div>
			<!-- AI评语结果区 -->
			<div
				v-if="aiCommentResult"
				class="mt-4 bg-white/80 rounded-xl p-4 text-gray-700 flex items-center gap-2"
			>
				<span>{{ aiCommentResult }}</span>
				<button
					@click="copyAIComment"
					class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
				>
					复制
				</button>
			</div>
		</div>

		<!-- 发起新众裁弹窗 -->
		<el-dialog
			v-model="showCreateDialog"
			title="发起新众裁"
			width="420px"
			:close-on-click-modal="false"
		>
			<el-form :model="createForm" ref="createFormRef" label-width="80px">
				<el-form-item
					label="候选人"
					prop="name"
					:rules="[{ required: true, message: '请输入候选人姓名', trigger: 'blur' }]"
				>
					<el-input v-model="createForm.name" placeholder="请输入候选人姓名" />
				</el-form-item>
				<el-form-item
					label="职位"
					prop="position"
					:rules="[{ required: true, message: '请输入职位', trigger: 'blur' }]"
				>
					<el-input v-model="createForm.position" placeholder="请输入职位" />
				</el-form-item>
				<el-form-item
					label="描述"
					prop="desc"
					:rules="[{ required: true, message: '请填写众裁描述', trigger: 'blur' }]"
				>
					<el-input
						type="textarea"
						v-model="createForm.desc"
						placeholder="请填写众裁描述"
						:rows="3"
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="showCreateDialog = false">取消</el-button>
					<el-button type="primary" @click="submitCreate">发起</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<PageFooter />
</template>

<script>
import PageFooter from '../../../components/PageFooter.vue';
import { cases } from '../data/cases';
function getRandomCases(pool, n) {
	const arr = [...pool];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.slice(0, n);
}
const JUDGE_LIST = [
	{ name: '张评审', avatar: 'https://randomuser.me/api/portraits/men/21.jpg' },
	{ name: '李评审', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
	{ name: '王评审', avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
	{ name: '赵评审', avatar: 'https://randomuser.me/api/portraits/women/24.jpg' }
];
export default {
	components: { PageFooter },
	data() {
		return {
			showCreateDialog: false,
			createForm: {
				name: '',
				position: '',
				desc: ''
			},
			ongoingCases: cases,
			currentCases: [],
			judgeList: [
				{
					name: '张评审',
					avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
					online: true,
					role: '高级评审官',
					called: false
				},
				{
					name: '李评审',
					avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
					online: false,
					role: '新手评审官',
					called: false
				},
				{
					name: '王评审',
					avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
					online: true,
					role: '高级评审官',
					called: false
				},
				{
					name: '赵评审',
					avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
					online: false,
					role: '普通评审官',
					called: false
				},
				{
					name: '钱评审',
					avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
					online: true,
					role: '新手评审官',
					called: false
				},
				{
					name: '孙评审',
					avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
					online: false,
					role: '高级评审官',
					called: false
				}
			],
			showJudgeDialog: false,
			judgeAssignTarget: null,
			pendingTimer: null,
			showDiscussionMore: false,
			discussionInput: '',
			showCallDialog: false,
			aiCommentLoading: false,
			aiCommentResult: ''
		};
	},
	computed: {
		pendingCases() {
			return this.ongoingCases.filter(c => c.status === 'pending');
		},
		discussionCases() {
			// 取当前进行中的第一个case为讨论区主角
			return this.currentCases.length ? this.currentCases[0] : this.ongoingCases[0];
		},
		displayDiscussions() {
			if (!this.discussionCases || !this.discussionCases.discussions) return [];
			if (this.showDiscussionMore) return this.discussionCases.discussions;
			return this.discussionCases.discussions.slice(0, 4);
		}
	},
	created() {
		this.currentCases = getRandomCases(this.ongoingCases, 4);
		this.startPendingTimer();
	},
	beforeUnmount() {
		if (this.pendingTimer) clearInterval(this.pendingTimer);
	},
	methods: {
		goDetail(id) {
			this.$router.push(`/judge/judgedetail?id=${id}`);
		},
		urge(id) {
			const caseItem = this.ongoingCases.find(c => c.id === id);
			if (caseItem && !caseItem.urged) {
				caseItem.urged = true;
				this.$message.success('已催促评审官！');
			}
		},
		changeCases() {
			this.currentCases = getRandomCases(this.ongoingCases, 4);
		},
		submitCreate() {
			this.$refs.createFormRef.validate(valid => {
				if (valid) {
					this.showCreateDialog = false;
					this.$message.success('众裁发起成功！');
					this.createForm = { name: '', position: '', desc: '' };
				}
			});
		},
		formatPendingTime(mins) {
			const abs = Math.abs(mins);
			const h = Math.floor(abs / 60);
			const m = abs % 60;
			if (mins >= 0) {
				return (h ? h + '小时' : '') + (m ? m + '分钟' : !h ? '0分钟' : '');
			} else {
				return '已超时' + (h ? h + '小时' : '') + (m ? m + '分钟' : !h ? '0分钟' : '');
			}
		},
		startPendingTimer() {
			this.pendingTimer = setInterval(() => {
				this.pendingCases.forEach(c => {
					c.pendingTime--;
				});
			}, 60000);
		},
		openJudgeDialog(item) {
			this.judgeAssignTarget = item;
			this.showJudgeDialog = true;
		},
		assignJudge(judge) {
			if (this.judgeAssignTarget) {
				this.judgeAssignTarget.assignedJudge = judge.name;
				this.judgeAssignTarget.status = 'assigned';
				this.showJudgeDialog = false;
				this.judgeAssignTarget = null;
				this.$message.success('分配成功！');
			}
		},
		likeDiscussion(idx) {
			const msg = this.displayDiscussions[idx];
			msg.likes++;
		},
		replyDiscussion(msg) {
			this.discussionInput = `@${msg.name} `;
			this.$nextTick(() => {
				if (this.$refs.discussionInputRef) this.$refs.discussionInputRef.focus();
			});
		},
		sendDiscussion() {
			const val = this.discussionInput && this.discussionInput.trim();
			if (!val) return;
			const caseObj = this.discussionCases;
			caseObj.discussions.push({
				name: '你',
				avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
				role: '普通用户',
				content: val,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				likes: 0,
				replies: 0
			});
			this.discussionInput = '';
		},
		callAllJudges() {
			this.judgeList.forEach(j => {
				if (j.online) j.called = true;
			});
			this.showCallDialog = true;
			this.$message.success('已呼叫所有在线评审官！');
			setTimeout(() => {
				this.judgeList.forEach(j => (j.called = false));
			}, 3000);
		},
		assignTaskToJudge(judge) {
			this.$message.success(`已为${judge.name}分配任务！`);
		},
		sendMsgToJudge(judge) {
			this.$message.success(`已向${judge.name}发送私信！`);
		},
		batchAssignJudges() {
			this.$message.success('已批量分配评审官！');
		},
		generateAIComment() {
			this.aiCommentLoading = true;
			this.aiCommentResult = '';
			setTimeout(() => {
				const caseObj = this.currentCases.length
					? this.currentCases[0]
					: this.ongoingCases[0];
				this.aiCommentResult = `【AI评语】${caseObj.name}在${caseObj.position}岗位的技术能力表现突出，建议关注沟通与团队协作能力。`;
				this.aiCommentLoading = false;
			}, 1500);
		},
		copyAIComment() {
			navigator.clipboard.writeText(this.aiCommentResult);
			this.$message.success('已复制评语！');
		}
	}
};
</script>

<style scoped>
.judge-hall-bg {
	background: linear-gradient(135deg, #f0f9ff 0%, #f8f5ff 100%);
}

/* 滚动条美化 */
.judge-hall-bg ::-webkit-scrollbar {
	width: 8px;
	background: #f3f4f6;
}
.judge-hall-bg ::-webkit-scrollbar-thumb {
	background: #e0e7ef;
	border-radius: 4px;
}

/* 卡片hover动画 */
.judge-hall-bg .hover\:scale-105:hover {
	transform: scale(1.05);
	box-shadow: 0 8px 32px 0 rgba(80, 80, 200, 0.1);
}
</style>
