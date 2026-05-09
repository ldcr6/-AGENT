<template>
  <div class="badges-card">
    <div class="badges-header">
      <span class="badges-icon">🏅</span>
      <span class="badges-title">学习徽章</span>
    </div>
    <div class="badges-list">
      <div
        v-for="badge in badges"
        :key="badge.id"
        class="badge-item"
        :class="{ unlocked: badge.unlocked }"
      >
        <div class="badge-img-wrap">
          <img :src="badge.icon" :alt="badge.name" class="badge-img" />
        </div>
        <div class="badge-info">
          <div class="badge-name">{{ badge.name }}</div>
          <div class="badge-desc">{{ badge.desc }}</div>
        </div>
        <div class="badge-status-wrap">
          <span v-if="badge.unlocked" class="badge-status">已获得</span>
          <span v-else class="badge-status locked">未获得</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  currentStageIndex: {
    type: Number,
    default: 0
  },
  totalStages: {
    type: Number,
    default: 3
  }
});
// 示例徽章数据，可后续通过props或接口传入
const badges = computed(() => [
  {
    id: 1,
    name: '打卡达人',
    desc: '连续打卡7天',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg', // 日历
    unlocked: false // 可后续联动打卡天数
  },
  {
    id: 2,
    name: '阶段完成',
    desc: '完成所有学习阶段',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2705.svg', // 绿色对勾
    unlocked: props.currentStageIndex >= props.totalStages
  },
  {
    id: 3,
    name: '自信表达',
    desc: '表达能力提升至最高阶段',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg', // 星星
    unlocked: props.currentStageIndex >= props.totalStages
  },
  {
    id: 4,
    name: '学习先锋',
    desc: '本月学习时长前10%',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c6.svg', // 奖杯
    unlocked: false
  },
  
]);
</script>

<style scoped>
.badges-card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.06);
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  min-width: 320px;
  width: 100%;
}
.badges-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
}
.badges-icon {
  font-size: 2rem;
  margin-right: 0.7rem;
  filter: drop-shadow(0 2px 8px #a5b4fc44);
}
.badges-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #6366f1;
}
.badges-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: flex-start;
}
.badge-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.08);
  padding: 1rem 1.2rem;
  width: 140px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
}
.badge-item.unlocked {
  border: 2px solid #a7f3d0;
  box-shadow: 0 4px 16px rgba(99,102,241,0.12);
}
.badge-item:not(.unlocked) {
  opacity: 0.6;
  filter: grayscale(0.7);
}
.badge-img-wrap {
  position: relative;
  margin-bottom: 0.7rem;
}
.badge-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e0e7ff;
  box-shadow: 0 2px 8px #a5b4fc33;
  object-fit: cover;
}
.badge-status {
  display: inline-block;
  margin: 0 auto;
  font-size: 0.95em;
  font-weight: 600;
  color: #10b981;
  background: #e0f2fe;
  border-radius: 8px;
  padding: 0.1em 0.7em;
  box-shadow: 0 1px 4px #bae6fd44;
}
.badge-status.locked {
  color: #a1a1aa;
  background: #f3f4f6;
}
.badge-info {
  text-align: center;
}
.badge-name {
  font-weight: 600;
  color: #6366f1;
  font-size: 1.08rem;
  margin-bottom: 0.2em;
}
.badge-desc {
  font-size: 0.98rem;
  color: #6b7280;
}
.badge-status-wrap {
  width: 100%;
  text-align: center;
  margin-top: 0.7em;
}
@media (max-width: 900px) {
  .badges-list {
    flex-direction: column;
    gap: 0.8rem;
  }
  .badge-item {
    width: 100%;
    min-width: 0;
  }
}
</style> 