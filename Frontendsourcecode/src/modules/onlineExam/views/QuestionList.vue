<template>
	<div class="online-exam-question-list">
		<el-card>
			<h2>题库列表</h2>
			<el-table :data="questions" style="width: 100%">
				<el-table-column prop="id" label="ID" width="80" />
				<el-table-column prop="title" label="题目" />
				<el-table-column label="操作" width="120">
					<template #default="{ row }">
						<el-button type="primary" size="small" @click="toExam(row)">答题</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchQuestions } from '../api/question';
import type { Question } from '../types';
import { useRouter } from 'vue-router';

const questions = ref<Question[]>([]);
const router = useRouter();

onMounted(async () => {
	const res = await fetchQuestions();
	// 假设后端返回的数据结构为 { data: Question[] }
	questions.value = res.data as Question[];
});

function toExam(row: Question) {
	router.push({ name: 'ExamStart', query: { id: row.id } });
}
</script>
