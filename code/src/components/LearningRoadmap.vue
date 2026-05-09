<template>
  <div class="roadmap-header">
    <div class="main-title">{{ props.title }}</div>
    <div class="sub-title">{{ props.subtitle }}</div>
  </div>
  <div class="roadmap-wrapper">
    <div class="roadmap-stage" v-for="(stage, idx) in props.roadmapData" :key="stage.stage">
      <div class="stage-card">
        <div class="stage-title">{{ stage.stage }}</div>
        <ul class="stage-items">
          <li v-for="item in stage.items" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div v-if="idx < props.roadmapData.length - 1" class="arrow">
        <svg width="48" height="48" viewBox="0 0 48 48"><path d="M12 24h24m0 0l-8-8m8 8l-8 8" stroke="#4f7fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
// props: roadmapData (Array), title, subtitle
const props = defineProps({
  roadmapData: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: '乐面Java学习路线图（2025官方完整版）'
  },
  subtitle: {
    type: String,
    default: '0基础 → 年薪30w，自学必备干货，下方含全套视频+源码资料'
  }
})
</script>

<style scoped>
.roadmap-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 108px;
}
.main-title {
  font-size: 32px;
  font-weight: bold;
  color: #111;
  margin-bottom: 16px;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.sub-title {
  background: #1abc9c;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  border-radius: 32px;
  padding: 8px 32px;
  font-weight: 500;
  margin-bottom: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.roadmap-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* gap: 32px; */
  margin: 48px 0 32px 0;
}
.roadmap-stage {
  display: flex;
  align-items: center;
}
.stage-card {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  padding: 24px 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stage-card:hover {
  transform: scale(1.05);
}
.stage-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.stage-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.stage-items li {
  background: #fff;
  color: #6366f1;
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 10px 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
.arrow {
  margin: 0 12px;
  display: flex;
  align-items: center;
}
</style> 