<template>
	<div class="card">
		<div class="card__header">
			<span class="label">{{ $t('服务项目排行') }}</span>

			<cl-select-button v-model="type" :options="options.type" small @change="onTypeChange" />
		</div>

		<div class="card__container">
			<cl-crud ref="Crud" padding="0">
				<cl-table ref="Table" />
			</cl-crud>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useCrud, useTable } from '@cool-vue/crud';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { random } from 'lodash-es';

const { t } = useI18n();

// 类型
const type = ref('day');

// 选项
const options = reactive({
	type: [
		{
			label: t('今日'),
			value: 'day'
		},
		{
			label: t('本周'),
			value: 'week'
		},
		{
			label: t('本月'),
			value: 'month'
		},
		{
			label: t('全年'),
			value: 'year'
		}
	]
});
// 新增刷新逻辑
function onTypeChange(val: string) {
	Crud.value?.refresh({
		type: val,
		_r: random(1000) // 添加随机参数
	});
}

const Crud = useCrud(
	{
		service: {
			page(params) {
				return Promise.resolve({
					list: [
						{
							keyWord: '算法题训练',
							count: random(800, 1000),
							ud: random(-10, 10),
							launchDate: '2023-01-01',
							heat: random(50, 100)
						},
						{
							keyWord: '系统设计面试',
							count: random(600, 800),
							ud: random(-10, 10),
							launchDate: '2024-02-15',
							heat: random(50, 100)
						},
						{
							keyWord: '行为面试模拟',
							count: random(300, 700),
							ud: random(-10, 10),
							launchDate: '2025-03-10',
							heat: random(50, 100)
						},
						{
							keyWord: '英语面试模拟',
							count: random(200, 500),
							ud: random(-10, 10),
							launchDate: '2025-04-05',
							heat: random(50, 100)
						},
						{
							keyWord: '技术栈专项',
							count: random(100, 300),
							ud: random(-10, 10),
							launchDate: '2023-05-20',
							heat: random(50, 100)
						},
						{
							keyWord: '即兴问答训练',
							count: random(50, 300),
							ud: random(-10, 10),
							launchDate: '2024-06-15',
							heat: random(50, 100)
						},
						{
							keyWord: '视频面试体验',
							count: random(200, 900),
							ud: random(-10, 10),
							launchDate: '2020-07-01',
							heat: random(50, 100)
						},
						{
							keyWord: 'AI智能评分',
							count: random(100, 500),
							ud: random(-10, 10),
							launchDate: '2021-08-10',
							heat: random(50, 100)
						},
						{
							keyWord: '面试报告生成',
							count: random(150, 500),
							ud: random(-10, 10),
							launchDate: '2022-09-05',
							heat: random(50, 100)
						},
						{
							keyWord: '经典面试题库',
							count: random(100, 300),
							ud: random(-10, 10),
							launchDate: '2025-10-01',
							heat: random(50, 100)
						}
					]
				});
			}
		}
	},
	app => {
		app.refresh();
	}
);

const Table = useTable({
	autoHeight: false,
	contextMenu: ['order-asc', 'order-desc'],
	columns: [
		{
			label: t('排名'),
			type: 'index',
			width: 60
		},
		{
			label: t('服务名称'),
			prop: 'keyWord',
			minWidth: 120
		},
		{
			label: t('服务热度分'),
			prop: 'heat',
			minWidth: 100
		},
		{
			label: t('服务次数'),
			prop: 'count',
			minWidth: 100,
			sortable: true
		},
		{
			label: t('日涨幅'),
			prop: 'ud',
			sortable: true,
			minWidth: 100
		},
		{
			label: t('上架时间'),
			prop: 'launchDate',
			minWidth: 120
		}
	]
});
</script>

<style lang="scss" scoped>
.card {
	padding-bottom: 20px;
}
</style>
