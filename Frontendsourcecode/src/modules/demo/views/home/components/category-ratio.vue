<template>
	<div class="card">
		<div class="card__header">
			<span class="label">{{ $t('类别占比') }}</span>
		</div>

		<div class="card__container">
			<v-chart :option="chartOption" autoresize />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import { computed, reactive } from 'vue';
import { random } from 'lodash-es';

const isDark = useDark();

const textColor = computed(() => (isDark.value ? '#f1f1f9' : '#000'));

const getRandomData = () => {
	return [
		{ value: random(100, 500), name: '技术面试' },
		{ value: random(100, 500), name: '行为面试' },
		{ value: random(100, 500), name: 'HR面试' },
		{ value: random(100, 500), name: '英语面试' },
		{ value: random(100, 500), name: '其他' }
	];
};

const chartOption = reactive({
	legend: {
		top: 'bottom',
		textStyle: {
			color: textColor
		}
	},
	grid: {
		top: 0
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b}: {c} ({d}%)'
	},
	series: [
		{
			type: 'pie',
			radius: ['35%', '50%'],
			avoidLabelOverlap: false,
			padAngle: 5,
			itemStyle: {
				borderRadius: 6
			},
			label: {
				color: textColor
			},
			data: getRandomData()
		}
	]
});
setInterval(() => {
	chartOption.series[0].data = getRandomData();
}, 3000);
</script>

<style lang="scss" scoped>
.card {
	&__container {
		height: 456px;
	}

	.echarts {
		height: calc(100% - 50px);
	}
}
</style>
