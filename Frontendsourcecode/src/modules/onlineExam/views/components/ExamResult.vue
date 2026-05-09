<template>
  <div class="exam-result">
    <el-card class="result-card">
      <div class="result-header">
        <div class="score">分数：<span>{{ result.score }}</span></div>
        <div class="comment">评语：{{ result.comment }}</div>
        <el-button type="primary" @click="$emit('export-pdf')">导出PDF报告</el-button>
      </div>
      <el-divider>答卷详情</el-divider>
      <el-table :data="result.detail" border stripe style="width: 100%">
        <el-table-column prop="id" label="题号" width="60" />
        <el-table-column prop="title" label="题目" min-width="180" />
        <el-table-column prop="type" label="类型" width="70">
          <template #default="scope">
            <span>{{ typeLabel(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="answer" label="我的答案" min-width="120">
          <template #default="scope">
            <span v-if="Array.isArray(scope.row.answer)">{{ scope.row.answer.join(', ') }}</span>
            <span v-else>{{ scope.row.answer }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="correct" label="结果" width="70">
          <template #default="scope">
            <el-tag v-if="scope.row.type==='single'||scope.row.type==='multiple'||scope.row.type==='judge'" :type="scope.row.correct ? 'success' : 'danger'">
              {{ scope.row.correct ? '正确' : '错误' }}
            </el-tag>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="评语" min-width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ result: any; paper: any; answers: any }>();
const emit = defineEmits(['export-pdf']);
function typeLabel(type: string) {
  switch (type) {
    case 'single': return '单选';
    case 'multiple': return '多选';
    case 'judge': return '判断';
    case 'text': return '简答';
    case 'code': return '代码';
    default: return '';
  }
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
}
.result-header {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 18px;
}
.score {
  font-size: 22px;
  font-weight: 700;
  color: #7c5cfa;
}
.comment {
  font-size: 16px;
  color: #888;
}
</style> 