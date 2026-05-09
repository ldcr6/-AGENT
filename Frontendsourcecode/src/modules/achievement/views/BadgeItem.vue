<template>
	<div
		class="relative h-40"
		:class="
			isLocked
				? 'bg-white rounded-xl shadow-card flex flex-col items-center justify-center p-3 opacity-50'
				: 'card-flip'
		"
	>
		<div
			class="absolute inset-0 bg-white rounded-xl shadow-card flex flex-col items-center justify-center p-3"
			:class="isLocked ? '' : 'card-front'"
		>
			<div
				class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2"
				:class="!isLocked ? 'badge-glow' : ''"
			>
				<i :class="`fa ${badge.icon} text-2xl text-primary`"></i>
			</div>
			<h4 class="text-center font-medium">{{ badge.name }}</h4>
			<p class="text-xs text-dark-2 text-center">{{ badge.description }}</p>
		</div>
		<div
			class="absolute inset-0 bg-primary/5 rounded-xl shadow-card p-3 flex flex-col justify-center card-back"
			v-if="!isLocked"
		>
			<div class="flex justify-between items-center mb-2">
				<span class="text-xs font-medium">获得时间</span>
				<span class="text-xs text-primary">{{ badge.acquiredDate }}</span>
			</div>
			<p class="text-xs text-dark-2 mb-2">{{ badge.details }}</p>
			<div class="text-xs text-primary font-medium">+{{ badge.points }} 积分</div>
		</div>
		<div
			class="absolute inset-0 bg-gray-50/80 rounded-xl flex items-center justify-center"
			v-if="isLocked"
		>
			<span class="text-xs text-dark-2 bg-white px-3 py-1 rounded-full">未解锁</span>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({ badge: Object, isLocked: Boolean });
</script>
