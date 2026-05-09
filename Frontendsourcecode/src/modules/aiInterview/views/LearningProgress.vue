<template>
  <div class="learning-progress-card">
    <h3 class="progress-title">学习进度</h3>
    <div class="progress-row">
      <span>当前阶段：</span>
      <span class="progress-value">{{ currentStage }}（{{ currentStageIndex }}/{{ totalStages }}）</span>
    </div>
    <div class="progress-row">
      <span>完成度：</span>
      <span class="progress-value">{{ progress }}%</span>
      <div class="progress-bar">
        <div
          v-for="(s, idx) in totalStages"
          :key="idx"
          class="progress-bar-segment"
          :class="{ done: currentStageIndex > idx || currentStageIndex === totalStages }"
          :style="{ width: 100 / totalStages + '%' }"
        ></div>
      </div>
    </div>
    <div class="progress-row">
      <span>打卡天数：</span>
      <span class="progress-value">{{ punchDays }} 天</span>
    </div>
    <div class="progress-row" v-if="nextStage">
      <span>下一个目标：</span>
      <span class="progress-value">{{ nextStage }}</span>
    </div>
    <el-button type="primary" @click="$emit('completeStage')" :disabled="currentStageIndex >= totalStages" style="margin-top:1em;">
      完成本阶段
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  currentStage: {
    type: String,
    default: '基础表达训练'
  },
  progress: {
    type: Number,
    default: 0
  },
  punchDays: {
    type: Number,
    default: 0
  },
  totalStages: {
    type: Number,
    default: 3
  },
  currentStageIndex: {
    type: Number,
    default: 0
  },
  nextStage: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.learning-progress-card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.06);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 1.5rem;
  width: 300px;
  max-width: 400px;
  min-width: 300px;
}
.progress-title {
  font-size: 1.3rem;
  color: #6366f1;
  font-weight: bold;
  margin-bottom: 1rem;
}
.progress-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
  font-size: 1.08em;
}
.progress-value {
  color: #6366f1;
  font-weight: 600;
  margin-left: 0.5em;
}
.progress-bar {
  flex: 1;
  height: 10px;
  background: #e0e7ff;
  border-radius: 5px;
  margin-left: 1em;
  margin-right: 0.5em;
  overflow: hidden;
  min-width: 80px;
  max-width: 180px;
  display: flex;
}
.progress-bar-segment {
  height: 100%;
  background: #fff;
  border: 1.5px solid #a5b4fc;
  border-radius: 5px;
  margin-right: 2px;
  transition: background 0.3s, border 0.3s;
  opacity: 1;
}
.progress-bar-segment.done {
  background: linear-gradient(90deg, #6366f1 0%, #a7f3d0 100%);
  border: 1.5px solid #6366f1;
}
</style> 