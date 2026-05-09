<template>
  <teleport to="body">
    <div class="resource-modal" v-if="show">
      <div class="modal-content">
        <h5>学习资源</h5>
        <ul>
          <li v-for="(url, type) in resourceList" :key="type">
            {{ type }}：<a :href="url" target="_blank">{{ url }}</a>
          </li>
        </ul>
        <button class="btn close-btn" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps({
  show: Boolean,
  resourceList: Object
})
defineEmits(['close'])
</script>

<style scoped lang="scss">
.resource-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  .modal-content {
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    min-width: 320px;
    .close-btn {
      margin-top: 16px;
      background: #007bff;
      color: #fff;
    }
  }
}
</style> 