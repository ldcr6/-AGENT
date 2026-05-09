<template>
	<div class="judge-detail-bg min-h-screen py-10 px-16 flex flex-col items-center">
		<!-- 顶部导航 -->
		<div class="w-full max-w-5xl flex items-center justify-between mb-8">
			<div class="flex items-center gap-4">
				<button class="bg-white/80 rounded-full shadow p-3 hover:bg-blue-50 transition">
					<i class="fa-solid fa-arrow-left text-xl text-blue-400"></i>
				</button>
				<span class="text-2xl font-bold text-gray-800">众裁详情</span>
			</div>
			<button class="bg-white/80 rounded-full shadow p-3 hover:bg-blue-50 transition">
				<i class="fa-solid fa-share-nodes text-xl text-blue-400"></i>
			</button>
		</div>

		<!--  标题与描述-->
		<div
			class="w-full max-w-5xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 mb-8 flex flex-col gap-2"
		>
			<div class="flex items-center gap-2 mb-2">
				<span class="bg-blue-100 text-blue-500 text-xs px-3 py-1 rounded-full font-bold">
					{{ currentCase.tag }}
				</span>
				<span class="text-lg font-bold text-gray-800">
					{{ currentCase.position }}
				</span>
			</div>
			<div class="text-gray-600 text-sm leading-relaxed">
				{{ currentCase.desc }}
			</div>
		</div>

		<!-- 顶部展示被众裁人头像和姓名 -->
		<div class="w-full max-w-5xl flex items-center gap-4 mb-8">
			<img
				:src="currentCase.avatar"
				class="w-16 h-16 rounded-full border-2 border-blue-300 shadow"
			/>
			<span class="text-2xl font-bold text-gray-800">{{ currentCase.name }} 的众裁详情</span>
		</div>
		<!-- 仲裁对话区，渲染 currentDialog -->
		<div
			class="w-full max-w-5xl bg-white/90 rounded-3xl shadow-xl p-8 mb-8 flex flex-col gap-4 relative overflow-hidden"
		>
			<div
				class="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 opacity-20 rounded-full blur-2xl z-0"
			></div>
			<div class="font-bold text-gray-700 mb-2 z-10 relative">仲裁对话</div>
			<div class="flex flex-col gap-3 z-10 relative">
				<div
					v-for="(msg, idx) in displayDialog"
					:key="idx"
					class="flex items-end gap-2"
					:class="msg.from === 'candidate' ? '' : 'justify-end'"
				>
					<img
						v-if="msg.from === 'candidate'"
						:src="currentCase.avatar"
						class="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
					/>
					<div
						:class="
							msg.from === 'candidate'
								? 'bg-blue-100 text-blue-800'
								: 'bg-purple-100 text-purple-800'
						"
						class="px-5 py-3 rounded-2xl shadow max-w-[60%]"
					>
						{{ msg.text }}
					</div>
					<img
						v-if="msg.from === 'judge'"
						:src="currentCase.judgeAvatar"
						class="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
					/>
					<span class="text-xs text-gray-400 ml-2" v-if="msg.from === 'candidate'">{{
						msg.time
					}}</span>
					<span class="text-xs text-gray-400 mr-2" v-if="msg.from === 'judge'">{{
						msg.time
					}}</span>
				</div>
			</div>
			<div class="mt-4 text-center">
				<button
					class="text-blue-500 text-sm font-bold hover:underline"
					@click="showMoreDialog = true"
					v-if="!showMoreDialog && currentCase && currentCase.moreDialog"
				>
					展开更多对话 <i class="fa-solid fa-chevron-down"></i>
				</button>
			</div>
			<div class="mt-2 text-xs text-gray-400 text-center">
				仲裁说明：在本次仲裁中，所有对话均匿名展示，部分敏感信息已脱敏处理。
			</div>
		</div>

		<!-- 投票结果与来源 -->
		<div class="w-full max-w-5xl grid grid-cols-3 gap-8 mb-8">
			<!-- 投票饼图 -->
			<div
				class="col-span-1 bg-white/90 rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
			>
				<div
					class="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 opacity-20 rounded-full blur-2xl z-0"
				></div>
				<div class="font-bold text-gray-700 mb-2 z-10 relative">众裁结果</div>
				<svg viewBox="0 0 120 120" class="w-32 h-32 z-10 relative">
					<circle cx="60" cy="60" r="50" fill="#f3f4f6" />
					<path d="M60,60 L60,10 A50,50 0 0,1 110,60 Z" fill="#f87171" />
					<path d="M60,60 L110,60 A50,50 0 0,1 60,110 Z" fill="#60a5fa" />
					<path d="M60,60 L60,110 A50,50 0 0,1 10,60 Z" fill="#a78bfa" />
					<path d="M60,60 L10,60 A50,50 0 0,1 60,10 Z" fill="#fbbf24" />
				</svg>
				<div class="flex gap-3 mt-4 text-xs z-10 relative">
					<span class="flex items-center gap-1"
						><span class="w-3 h-3 rounded-full bg-red-400 inline-block"></span> 45%
						赞成</span
					>
					<span class="flex items-center gap-1"
						><span class="w-3 h-3 rounded-full bg-blue-400 inline-block"></span> 30%
						反对</span
					>
					<span class="flex items-center gap-1"
						><span class="w-3 h-3 rounded-full bg-purple-400 inline-block"></span> 15%
						争议</span
					>
					<span class="flex items-center gap-1"
						><span class="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span> 10%
						弃权</span
					>
				</div>
			</div>
			<!-- 来源进度条 -->
			<div class="col-span-2 flex flex-col gap-6">
				<div class="bg-white/90 rounded-2xl shadow p-6 flex flex-col gap-2">
					<div class="font-bold text-gray-700 mb-2 flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
						BOSS投票结果
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">支持</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-blue-400 rounded-full" style="width: 62%"></div>
						</div>
						<span class="text-xs text-blue-500 font-bold ml-2">62%</span>
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">反对</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-red-400 rounded-full" style="width: 22%"></div>
						</div>
						<span class="text-xs text-red-400 font-bold ml-2">22%</span>
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">争议</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-purple-400 rounded-full" style="width: 10%"></div>
						</div>
						<span class="text-xs text-purple-400 font-bold ml-2">10%</span>
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">弃权</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-yellow-400 rounded-full" style="width: 6%"></div>
						</div>
						<span class="text-xs text-yellow-400 font-bold ml-2">6%</span>
					</div>
				</div>
				<div class="bg-white/90 rounded-2xl shadow p-6 flex flex-col gap-2">
					<div class="font-bold text-gray-700 mb-2 flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
						个人投票结果
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">支持</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-green-400 rounded-full" style="width: 51%"></div>
						</div>
						<span class="text-xs text-green-400 font-bold ml-2">51%</span>
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">反对</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-red-400 rounded-full" style="width: 19%"></div>
						</div>
						<span class="text-xs text-red-400 font-bold ml-2">19%</span>
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">争议</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-purple-400 rounded-full" style="width: 20%"></div>
						</div>
						<span class="text-xs text-purple-400 font-bold ml-2">20%</span>
					</div>
					<div class="flex items-center gap-2 mb-1">
						<span class="text-xs text-gray-500 w-16">弃权</span>
						<div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
							<div class="h-full bg-yellow-400 rounded-full" style="width: 10%"></div>
						</div>
						<span class="text-xs text-yellow-400 font-bold ml-2">10%</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 众裁观点区 -->
		<div
			class="w-full max-w-5xl bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col gap-6 mb-8"
		>
			<div class="font-bold text-gray-700 mb-2">
				众裁观点
				<span class="text-xs text-gray-400 ml-2"
					>{{
						currentCase && currentCase.opinions ? currentCase.opinions.length : 0
					}}条</span
				>
			</div>
			<div class="flex flex-col gap-6">
				<div
					v-for="(opinion, idx) in displayOpinions"
					:key="idx"
					class="flex gap-4 items-start"
				>
					<img
						class="w-12 h-12 rounded-full object-cover border-2"
						:class="{
							'border-blue-300': opinion.role === 'BOSS',
							'border-purple-300': opinion.role === '评审官',
							'border-green-300': opinion.role === '技术大V',
							'border-gray-300': opinion.role === '普通用户',
							'border-pink-300': opinion.role === 'HR'
						}"
						:src="opinion.avatar"
					/>
					<div
						class="flex-1 rounded-2xl p-4 shadow"
						:class="{
							'bg-blue-50': opinion.role === 'BOSS',
							'bg-purple-50': opinion.role === '评审官',
							'bg-green-50': opinion.role === '技术大V',
							'bg-gray-50': opinion.role === '普通用户',
							'bg-pink-50': opinion.role === 'HR'
						}"
					>
						<div class="flex items-center gap-2 mb-1">
							<span class="font-bold text-gray-800">{{ opinion.name }}</span>
							<span
								v-if="opinion.role"
								:class="
									{
										'bg-blue-100 text-blue-500': opinion.role === 'BOSS',
										'bg-purple-100 text-purple-500': opinion.role === '评审官',
										'bg-green-100 text-green-500': opinion.role === '技术大V',
										'bg-gray-100 text-gray-500': opinion.role === '普通用户',
										'bg-pink-100 text-pink-500': opinion.role === 'HR'
									} + ' text-xs px-2 py-0.5 rounded'
								"
								>{{ opinion.role }}</span
							>
							<span
								v-for="tag in opinion.tags"
								:key="tag"
								class="bg-blue-100 text-blue-500 text-xs px-2 py-0.5 rounded"
								>{{ tag }}</span
							>
						</div>
						<div class="text-gray-700 text-sm mb-2">
							{{ opinion.content }}
						</div>
						<div class="flex items-center gap-4 text-xs text-gray-400">
							<span>{{ opinion.time }}</span>
							<span
								><i class="fa-regular fa-thumbs-up mr-1"></i
								>{{ opinion.likes }}</span
							>
							<span
								><i class="fa-regular fa-comment-dots mr-1"></i
								>{{ opinion.comments }}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-4 text-center">
				<button
					class="text-blue-500 text-sm font-bold hover:underline"
					@click="showMoreOpinions = true"
					v-if="
						!showMoreOpinions &&
						currentCase &&
						currentCase.opinions &&
						currentCase.opinions.length > 4
					"
				>
					展开更多观点 <i class="fa-solid fa-chevron-down"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { cases } from '../data/cases';
export default {
	data() {
		return {
			currentCase: null,
			showMoreDialog: false,
			showMoreOpinions: false
		};
	},
	computed: {
		displayDialog() {
			if (!this.currentCase) return [];
			if (this.showMoreDialog && this.currentCase.moreDialog) {
				return [...this.currentCase.dialog, ...this.currentCase.moreDialog];
			}
			return this.currentCase.dialog || [];
		},
		displayOpinions() {
			if (!this.currentCase || !this.currentCase.opinions) return [];
			if (this.showMoreOpinions) return this.currentCase.opinions;
			return this.currentCase.opinions.slice(0, 4);
		}
	},
	watch: {
		'$route.query.id': {
			immediate: true,
			handler(newId) {
				const id = Number(newId);
				this.currentCase = cases.find(c => c.id == id) || cases[0];
				this.showMoreDialog = false;
				this.showMoreOpinions = false;
			}
		}
	}
};
</script>

<style scoped>
.judge-detail-bg {
	background: linear-gradient(135deg, #f0f9ff 0%, #f8f5ff 100%);
}

.judge-detail-bg ::-webkit-scrollbar {
	width: 8px;
	background: #f3f4f6;
}
.judge-detail-bg ::-webkit-scrollbar-thumb {
	background: #e0e7ef;
	border-radius: 4px;
}

.judge-detail-bg .hover\:scale-105:hover {
	transform: scale(1.05);
	box-shadow: 0 8px 32px 0 rgba(80, 80, 200, 0.1);
}
</style>
