<template>
  <div class="switch-btn" @click="onSwitch">
    <span class="switch-svg">
      <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none">
        <path d="M512 128a384 384 0 1 1-271.36 112.64" stroke="#222" stroke-width="56" fill="none" stroke-linecap="round"/>
        <path d="M128 128v192h192" stroke="#222" stroke-width="56" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <div class="switch-text">
      <span>换</span>
      <span>一</span>
      <span>换</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  methods: {
    onSwitch() {
      this.$emit('switch');
    }
  }
}
</script>

<style scoped>
.switch-btn {
  position: fixed;
  top: 40%;
  right: 32px;
  width: 60px;
  height: 110px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  border: 1px solid #eee;
  transition: box-shadow 0.2s;
}
.switch-btn:hover {
  box-shadow: 0 6px 24px rgba(0,161,214,0.12);
}
.switch-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}
.switch-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: #222;
  letter-spacing: 2px;
  font-weight: 500;
}
</style>
