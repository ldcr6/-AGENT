<template>
    <div id="particles-js" class="particles"></div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      // 初始化粒子效果
      const initParticles = () => {
        if (window.particlesJS) {
          window.particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: '#6366f1' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#8b5cf6',
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out'
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' }
              }
            }
          });
        }
      };
  
      // 组件挂载时
      onMounted(() => {
        // 动态加载 particles.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.onload = () => {
          // 确保 particlesJS 加载完成
          if (window.particlesJS) {
            initParticles();
          } else {
            console.error('Failed to load particlesJS');
          }
        };
        script.onerror = () => {
          console.error('Error loading particlesJS script');
        };
        document.head.appendChild(script);
      });
  
      return {};
    }
  };
  </script>
  
  <style scoped>
  .particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none; /* 允许点击穿透 */
  }
  </style>