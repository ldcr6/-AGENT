<template>
  <div class="stage-nav" @wheel.prevent="handleNavScroll">
    <template v-for="stage in stages" :key="stage.id">
      <div
        class="stage-item"
        :class="{ active: stage.id === currentStageId }"
        @click="$emit('changeStage', stage.id)"
      >
        <h3 class="stage-title">{{ stage.name }}</h3>
        <div class="progress-wrapper">
          <div class="progress-bar" :style="{ width: `${stage.progress}%` }"></div>
        </div>
        <p class="progress-text">{{ stage.progress }}% 完成</p>
        <div v-if="stage.id === currentStageId" class="stage-extra">
          <div class="stage-desc">简介：{{ stage.desc || '暂无简介' }}</div>
          <div class="stage-count">知识点：{{ stage.knowledges?.length || 0 }} 个
            <button class="stage-detail-btn">查看详情</button>

          </div>
          
        </div>
      </div>
      <template v-if="stage.id === currentStageId">
        <div class="course-card primary" :key="stage.id + '-primary'">
          <div class="icon"><span>💻</span></div>
          <div class="info">
            <div class="title">初级教程</div>
            <div class="desc">零基础小白入门必看</div>
          </div>
        </div>
        <div class="course-card advanced" :key="stage.id + '-advanced'">
          <div class="icon"><span>📈</span></div>
          <div class="info">
            <div class="title">中级教程</div>
            <div class="desc">满足就业工作需求</div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps({
  stages: Array,
  currentStageId: Number
})
// const emit = defineEmits(['changeStage'])
function handleNavScroll(e) {
  const nav = e.currentTarget
  nav.scrollLeft += e.deltaY * 2
}
</script>

<style scoped lang="scss">
.stage-nav {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 12px;
  &::-webkit-scrollbar {
    display: none;
  }
  .stage-item {
    min-width: 460px;
    background: #f9fcff;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;
    &.active {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,128,255,0.1);
      .stage-extra {
        margin-top: 10px;
        text-align: left;
        .stage-desc {
          font-size: 13px;
          color: #888;
          margin-bottom: 4px;
          white-space: nowrap;
          // overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
        .stage-count {
          font-size: 13px;
          color: #2563eb;
          margin-bottom: 6px;
        }
        .stage-detail-btn {
          background: #2563eb;
          float: right;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 4px 12px;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
          &:hover {
            background: #174ea6;
          }
        }
      }
    }
    .stage-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .progress-wrapper {
      width: 80%;
      height: 8px;
      background: #e6f2ff;
      border-radius: 4px;
      margin: 8px auto;
      .progress-bar {
        height: 100%;
        background: #007bff;
        border-radius: 4px;
        transition: width 0.3s;
      }
    }
    .progress-text {
      font-size: 12px;
      color: #666;
    }
  }
  .course-card {
    display: flex;
    align-items: center;
    min-width: 260px;
    background: #f7faff;
    border-radius: 18px;
    box-shadow: 0 2px 12px rgba(0,128,255,0.06);
    padding: 18px 28px 18px 18px;
    margin-left: 0;
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-right: 16px;
      background: linear-gradient(135deg, #4f7fff 60%, #2563eb 100%);
      color: #fff;
    }
    .info {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 20px;
        font-weight: bold;
        color: #222;
        margin-bottom: 2px;
      }
      .desc {
        font-size: 15px;
        color: #888;
      }
    }
    &.primary {
      background: #f7faff;
      .icon {
        background: linear-gradient(135deg, #4f7fff 60%, #2563eb 100%);
      }
    }
    &.advanced {
      background: #f9fcff;
      .icon {
        background: linear-gradient(135deg, #ff5f6d 60%, #ffc371 100%);
      }
      .title {
        color: #d7263d;
      }
    }
  }
}
</style> 