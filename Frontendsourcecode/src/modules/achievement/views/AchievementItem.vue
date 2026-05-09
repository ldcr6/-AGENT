<template>
	<div
		class="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
	>
		<div class="p-6">
			<div class="flex justify-between items-start mb-4">
				<div class="flex items-center">
					<div
						class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3"
					>
						<i :class="`fa ${achievement.icon} text-primary`"></i>
					</div>
					<div>
						<h3 class="font-semibold">{{ achievement.name }}</h3>
						<p class="text-sm text-dark-2">{{ achievement.description }}</p>
					</div>
				</div>
				<span
					class="px-3 py-1"
					:class="
						isCompleted ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
					"
					text-xs
					rounded-full
				>
					{{ isCompleted ? '已完成' : '进行中' }}
				</span>
			</div>
			<div class="mb-4">
				<div class="flex justify-between text-sm mb-1">
					<span>完成进度</span>
					<span class="font-medium">{{ achievement.progress }}%</span>
				</div>
				<div class="w-full achievement-progress">
					<div
						class="achievement-progress-bar"
						:class="isCompleted ? 'bg-success' : 'bg-warning'"
						:style="{ width: achievement.progress + '%' }"
					></div>
				</div>
			</div>
			<div class="flex justify-between text-sm text-dark-2 mb-4">
				<span v-if="isCompleted">获得时间: {{ achievement.acquiredDate }}</span>
				<span v-else>开始时间: {{ achievement.startDate }}</span>
				<span v-if="isCompleted">+{{ achievement.points }} 积分</span>
				<span v-else>预计完成: {{ achievement.expectedDate }}</span>
			</div>
			<div class="flex flex-wrap gap-2 mb-4">
				<span
					v-for="tag in achievement.tags"
					:key="tag"
					class="px-2 py-1 bg-light-1 rounded text-xs"
					>{{ tag }}</span
				>
			</div>
			<button
				class="w-full py-2"
				:class="
					isCompleted ? 'border border-primary text-primary' : 'bg-primary text-white'
				"
				rounded-lg
				hover:bg-primary
				hover:text-white
				transition-colors
			>
				{{ isCompleted ? '查看详情' : '继续学习' }}
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({ achievement: Object, isCompleted: Boolean });
</script>
