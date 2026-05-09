<template>
  <div class="exam-question">
    <div class="q-title">
      <span class="q-index">{{ index + 1 }}.</span>
      <span>{{ question.title }}</span>
      <span class="q-type">【{{ typeLabel }}】</span>
    </div>
    <div class="q-body">
      <template v-if="question.type === 'single'">
        <el-radio-group v-model="localAnswer">
          <el-radio v-for="(opt, idx) in question.options" :key="idx" :label="opt">
            <span class="option-label">{{ String.fromCharCode(65 + idx) }}.</span>
            <span class="option-content">{{ opt }}</span>
          </el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="question.type === 'multiple'">
        <el-checkbox-group v-model="localAnswer">
          <el-checkbox v-for="(opt, idx) in question.options" :key="idx" :label="opt">{{ opt }}</el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-else-if="question.type === 'judge'">
        <el-radio-group v-model="localAnswer">
          <el-radio :label="true">正确</el-radio>
          <el-radio :label="false">错误</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="question.type === 'text'">
        <el-input v-model="localAnswer" type="textarea" :rows="3" placeholder="请输入答案" />
      </template>
      <template v-else-if="question.type === 'code'">
        <el-input v-model="localAnswer" type="textarea" :rows="6" placeholder="请粘贴或编写代码" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Question } from '../../types';

const props = defineProps<{
  question: Question;
  answer: any;
  index: number;
  total: number;
}>();
const emit = defineEmits(['update:answer']);

const localAnswer = ref(props.answer);
watch(() => props.answer, val => { localAnswer.value = val; });
watch(localAnswer, val => { emit('update:answer', val); });

const typeLabel = computed(() => {
  switch (props.question.type) {
    case 'single': return '单选';
    case 'multiple': return '多选';
    case 'judge': return '判断';
    case 'text': return '简答';
    case 'code': return '代码';
    default: return '';
  }
});
</script>

<style scoped>
.exam-question {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 #ececff;
  margin-bottom: 24px;
  padding: 18px 18px 12px 18px;
  transition: background 0.3s;
}
.q-title {
  font-size: 17px;
  font-weight: 600;
  color: #7c5cfa;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.q-type {
  font-size: 13px;
  color: #a3a8f7;
  margin-left: 8px;
}
.q-body {
  font-size: 15px;
  color: #333;
}
.dark-mode .exam-question {
  background: #2d2d4a;
  color: #fff;
}
.option-label {
  display: inline-block;
  width: 22px;
  font-weight: bold;
  color: #7c5cfa;
}
.option-content {
  margin-left: 2px;
}
</style> 