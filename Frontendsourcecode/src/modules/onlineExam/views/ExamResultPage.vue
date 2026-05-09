<template>
	<div v-if="result && paper && answers" class="exam-result">
		<el-card class="result-card">
			<div class="result-header">
				<div class="score">
					分数：<span>{{ result.score }}</span>
				</div>
				<div class="comment">评语：{{ result.comment }}</div>
				<el-button class="pdf-hide" type="primary" @click="exportPdf"
					>导出PDF报告</el-button
				>
			</div>
			<el-divider>答卷详情</el-divider>
			<el-table :data="result.detail" border stripe style="width: 100%">
				<el-table-column label="题号" width="60">
					<template #default="scope">
						{{ scope.$index + 1 }}
					</template>
				</el-table-column>
				<el-table-column prop="title" label="题目" min-width="180" />
				<el-table-column prop="type" label="类型" width="70">
					<template #default="scope">
						<span>{{ typeLabel(scope.row.type) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="answer" label="我的答案" min-width="120">
					<template #default="scope">
						<span v-if="Array.isArray(scope.row.answer)">{{
							scope.row.answer.join(', ')
						}}</span>
						<span v-else>{{ scope.row.answer }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="correct" label="结果" width="70">
					<template #default="scope">
						<span
							v-if="
								scope.row.type === 'single' ||
								scope.row.type === 'multiple' ||
								scope.row.type === 'judge'
							"
							:style="{
								color: scope.row.correct ? '#67c23a' : '#f56c6c',
								fontWeight: 'bold',
								padding: '2px 8px',
								borderRadius: '4px',
								background: scope.row.correct ? '#f0f9eb' : '#fef0f0',
								display: 'inline-block'
							}"
						>
							{{ scope.row.correct ? '正确' : '错误' }}
						</span>
						<span v-else>--</span>
					</template>
				</el-table-column>
				<el-table-column prop="comment" label="评语" min-width="120" />
			</el-table>
		</el-card>
	</div>
	<div v-else style="text-align: center; padding: 80px 0">
		<el-icon style="font-size: 32px; color: #b7afff"><loading /></el-icon>
		<div style="margin-top: 12px; color: #888; font-size: 16px">结果加载中...</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Loading } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const result = ref<any>(null);
const paper = ref<any>(null);
const answers = ref<any>(null);

onMounted(() => {
	// 用 localStorage 获取数据
	const data = JSON.parse(localStorage.getItem('examResult') || '{}');
	result.value = data.result;
	paper.value = data.paper;
	answers.value = data.answers;
	// 不要在这里清理 localStorage，保证刷新后还能看到结果

	// 日志输出
	console.log('结果页数据', { result: result.value, paper: paper.value, answers: answers.value });

	if (!result.value || !paper.value || !answers.value) {
		ElMessage.error('无效访问，已返回题库页');
		router.replace({ name: 'QuestionList' });
	}
});

function typeLabel(type: string) {
	switch (type) {
		case 'single':
			return '单选';
		case 'multiple':
			return '多选';
		case 'judge':
			return '判断';
		case 'text':
			return '简答';
		case 'code':
			return '代码';
		default:
			return '';
	}
}

function formatQuestionId(id: number | string) {
	// 如果 id 是三位数，只显示最后一位
	const str = String(id);
	return str.length === 3 ? str.slice(-1) : str;
}

// PDF导出功能
async function exportPdf() {
	// 隐藏 PDF 不需要的元素
	const pdfHides = document.querySelectorAll('.pdf-hide');
	pdfHides.forEach(el => ((el as HTMLElement).style.display = 'none'));

	const card = document.querySelector('.result-card');
	if (!card) {
		ElMessage.error('未找到导出内容');
		pdfHides.forEach(el => ((el as HTMLElement).style.display = ''));
		return;
	}
	ElMessage.info('正在生成PDF...');
	// scale 2，保证内容清晰
	const canvas = await html2canvas(card as HTMLElement, {
		scale: 2,
		backgroundColor: '#fff',
		useCORS: true
	});
	const pdf = new jsPDF('p', 'mm', 'a4');
	const pageWidth = pdf.internal.pageSize.getWidth();
	const pageHeight = pdf.internal.pageSize.getHeight();
	const imgWidth = pageWidth - 24; // 增加左右padding
	const pxPerMm = canvas.width / imgWidth;
	const pageHeightPx = (pageHeight - 8) * pxPerMm; // 8mm margin
	const position = 2; // 内容整体稍微往下移

	let leftHeight = canvas.height;
	let pageNum = 0;
	while (leftHeight > 0) {
		const sY = pageNum * pageHeightPx;
		const sHeight = Math.min(pageHeightPx, leftHeight);
		// 裁剪当前页图片
		const pageCanvas = document.createElement('canvas');
		pageCanvas.width = canvas.width;
		pageCanvas.height = sHeight;
		const ctx = pageCanvas.getContext('2d');
		if (ctx) {
			ctx.drawImage(canvas, 0, sY, canvas.width, sHeight, 0, 0, canvas.width, sHeight);
			const pageImgData = pageCanvas.toDataURL('image/png');
			pdf.addImage(pageImgData, 'PNG', 12, position, imgWidth, sHeight / pxPerMm);
		}
		leftHeight -= sHeight;
		if (leftHeight > 0) {
			pdf.addPage();
			pageNum++;
		}
	}
	pdf.save('考试结果.pdf');
	// 恢复显示
	pdfHides.forEach(el => ((el as HTMLElement).style.display = ''));
}
</script>

<style scoped>
.exam-result {
	margin-top: 32px;
	display: flex;
	justify-content: center;
}
.result-card {
	max-width: 900px;
	width: 100%;
	border-radius: 24px;
	box-shadow: 0 4px 24px 0 #ececff;
	border: none;
	background: #fff;
	padding-left: 24px;
	padding-right: 24px;
}
.result-header {
	display: flex;
	align-items: center;
	gap: 32px;
	margin-bottom: 18px;
	justify-content: center;
	text-align: center;
	flex-direction: column;
}
.score {
	font-size: 22px;
	font-weight: 700;
	color: #7c5cfa;
	text-align: center;
}
.comment {
	font-size: 16px;
	color: #888;
	text-align: center;
}
.el-table {
	font-size: 14px;
}
.el-table th,
.el-table td {
	padding: 4px 8px !important;
}
</style>
