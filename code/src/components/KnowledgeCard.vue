<template>
  <div
    class="knowledge-card"
    :class="[knowledge.status]"
  >
    <div class="card-header">
      <h4>{{ knowledge.title }}</h4>
      <div class="status-tag" :class="knowledge.status">
        {{ statusMap[knowledge.status] }}
      </div>
    </div>
    <div class="action-buttons">
      <button
        class="btn action-btn"
        @click="$emit('updateStatus', knowledge.id, 'learning')"
        v-if="knowledge.status !== 'done'"
      >
        {{ knowledge.status === 'pending' ? '开始学习' : '继续学习' }}
      </button>
      <button class="btn resource-btn" @click="$emit('openResource', knowledge.resources)">
        资源
      </button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps({
  knowledge: Object,
  statusMap: Object
})
defineEmits(['updateStatus', 'openResource'])
</script>

<style scoped lang="scss">
.knowledge-card {
  background: linear-gradient(135deg, #f7faff 60%, #e6f2ff 100%);
  border-radius: 18px;
  padding: 20px 18px 18px 18px;
  box-shadow: 0 2px 12px rgba(0,128,255,0.06);
  transition: transform 0.25s, box-shadow 0.25s;
  border: none !important;
  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 6px 24px rgba(0,128,255,0.10);
  }
  &.pending { border: 2px dashed #ffd400 !important; }
  &.learning { border: 2px solid #43e97b !important; }
  &.done { border: 2px solid #2563eb !important; }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .status-tag {
      font-size: 13px;
      padding: 4px 14px;
      border-radius: 16px;
      color: #fff;
      font-weight: 500;
      &.done { background: linear-gradient(90deg, #2563eb 60%, #4f7fff 100%); }
      &.learning { background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); }
      &.pending { background: linear-gradient(90deg, #ffd400 0%, #ff9800 100%); color: #fff; }
    }
  }
  .action-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    .action-btn {
      background: linear-gradient(90deg, #2563eb 60%, #4f7fff 100%);
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 6px 18px;
      font-size: 15px;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(37,99,235,0.08);
      transition: background 0.2s, transform 0.2s;
      cursor: pointer;
      &:hover {
        background: linear-gradient(90deg, #174ea6 60%, #2563eb 100%);
        transform: translateY(-2px) scale(1.05);
      }
    }
    .resource-btn {
      background: #f5f5f5;
      color: #2563eb;
      border: none;
      border-radius: 12px;
      padding: 6px 16px;
      font-size: 15px;
      font-weight: 500;
      box-shadow: none;
      transition: background 0.2s;
      cursor: pointer;
      &:hover {
        background: #e6f2ff;
      }
    }
  }
}
</style> 