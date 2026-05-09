<template>
  <div id="app">
    <loading-animation v-if="isLoading" @loading-finished="finishLoading" />
    <router-view v-else />
  </div>
</template>

<script>
import LoadingAnimation from './components/LoadingAnimation.vue';

export default {
  name: 'App',
  components: {
    LoadingAnimation,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    finishLoading() {
      this.isLoading = false;
    }
  }
};
</script>

<style>
/* 确保app填满整个屏幕 */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
