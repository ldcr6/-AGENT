<template>
  <header class="header">
    <div class="header-left">
      <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      <span class="username">乐面</span>
    </div>
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/jobs">职位广场</router-link>
      <!-- 页面入口：点击进入企业广场 -->
      <router-link to="/AI">AI面试</router-link>
      <router-link to="/online">在线刷题</router-link>
      <router-link to="/study">学习推荐</router-link>
      <router-link to="/personal">个人中心</router-link>
      <router-link to="/my">关于我们</router-link>
      <a href="#login" class="login-btn" id="nav-login-btn" @click.prevent="showLogin = true">
        <span class="login-btn-icon"><i class="fa fa-user-circle"></i></span>
        <span class="login-btn-text">注册/登录</span>
      </a>
    </nav>
    <button id="theme-toggle" class="theme-btn" @click="toggleTheme">
      <svg v-if="!isDark" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" fill="#222"/>
        <g stroke="#222" stroke-width="2">
          <line x1="12" y1="2" x2="12" y2="5"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="5" y2="12"/>
          <line x1="19" y1="12" x2="22" y2="12"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
        </g>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#222"/>
      </svg>
    </button>
  </header>
  <LoginModal 
    :show="showLogin" 
    @close="showLogin = false"
    @to-register="handleToRegister"
  />
  
  <RegisterModal
    :show="showRegister"
    @close="showRegister = false"
    @to-login="handleToLogin"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginModal from './modals/LoginModal.vue'
import RegisterModal from './modals/RegisterModal.vue'

const showLogin = ref(false)
const showRegister = ref(false)

const handleToRegister = () => {
  showLogin.value = false
  showRegister.value = true
}

const handleToLogin = () => {
  showRegister.value = false
  showLogin.value = true
}

// 主题切换逻辑
const isDark = ref(false)
const toggleTheme = () => {
  const html = document.documentElement
  isDark.value = !isDark.value
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}
onMounted(() => {
  // 初始化主题
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 32px 24px 16px 40px; /* 减少左右padding */
  background: rgba(255,255,255,0.75); /* 半透明白色 */
  border-bottom: 1.5px solid #e5e7eb;
  backdrop-filter: blur(12px); /* 磨砂效果 */
  -webkit-backdrop-filter: blur(12px); /* 兼容Safari */
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.logo-img {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  object-fit: contain;
}
.username {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--dark-200);
  letter-spacing: 0.5px;
}
.nav {
  display: flex;
  align-items: center;
  gap: 36px;
  font-family: 'Inter', '微软雅黑', Arial, sans-serif;
  font-size: 1.08rem;
  position: relative;
  background: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  margin-left: 192px; /* nav更靠左 */
}
.nav a, .nav .router-link-active {
  position: relative;
  color: var(--dark-200);
  text-decoration: none;
  font-weight: 500;
  padding: 6px 0;
  transition: color 0.3s;
  letter-spacing: 0.5px;
  border: none;
  background: none;
  outline: none;
}
.nav a:not(.login-btn):hover,
.nav a:not(.login-btn):focus,
.nav .router-link-active:not(.login-btn) {
  color: var(--primary);
}
.nav a:not(.login-btn)::after,
.nav .router-link-active:not(.login-btn)::after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: -4px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  opacity: 0;
  transform: scaleX(0.4);
  transition:
    opacity 0.3s,
    transform 0.3s,
    left 0.3s,
    right 0.3s;
}

.nav a:not(.login-btn):hover::after,
.nav a:not(.login-btn):focus::after,
.nav .router-link-active:not(.login-btn)::after {
  opacity: 1;
  left: 0;
  right: 0;
  transform: scaleX(1);
}
.login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 32px;
  background: linear-gradient(90deg, #4f8cff 0%, #2563eb 100%);
  color: #fff;
  border-radius: 28px;
  font-weight: 700;
  margin-left: 250px;
  box-shadow: 0 4px 16px rgba(37,99,235,0.16);
  transition: background 0.25s, transform 0.18s, box-shadow 0.18s;
  border: none;
  outline: none;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;
}
.login-btn-icon {
  font-size: 1.3em;
  display: flex;
  align-items: center;
}
.login-btn-text {
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.login-btn::after {
  content: "";
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, #2563eb 0%, #4f8cff 100%);
  opacity: 0;
  transition: opacity 0.25s;
  border-radius: 28px;
  z-index: 0;
}
.login-btn:hover,
.login-btn:focus {
  background: linear-gradient(90deg, #2563eb 0%, #4f8cff 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 28px rgba(37,99,235,0.22);
}
.login-btn:hover::after,
.login-btn:focus::after {
  opacity: 0.12;
}
.theme-btn {
  margin-left: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f7b500;
  background: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.22s, box-shadow 0.18s, transform 0.18s;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  position: relative;
  overflow: hidden;
}
.theme-btn:hover, .theme-btn:focus {
  background: #f5f6fa;
  box-shadow: 0 6px 24px rgba(0,0,0,0.13);
  transform: scale(1.08);
}
.theme-btn svg {
  width: 28px;
  height: 28px;
  display: block;
}
.theme-btn .fa-sun-o {
  color: #222;
  text-shadow: none;
}
.theme-btn .fa-moon-o {
  color: #222;
  text-shadow: none;
}
.dark-hidden {
  display: inline;
}
.dark-inline {
  display: none;
}
:root.dark .dark-hidden {
  display: none !important;
}
:root.dark .dark-inline {
  display: inline !important;
}
@media (max-width: 900px) {
  .header {
    flex-direction: column;
    gap: 16px;
    padding: 16px 8px 8px 8px;
  }
}
@media (max-width: 600px) {
  .header {
    padding: 8px 4px 4px 4px;
  }
}
</style> 