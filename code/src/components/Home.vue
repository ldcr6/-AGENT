<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderBar />
  <section class="hero">
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">
          全新一代 <span class="highlight">AI面试</span> 平台<br>
          智能高效，助力招聘
        </h1>
        <p class="desc">
          基于自研AI模型，智能匹配岗位，自动化面试评估，释放HR人力，提升筛选效率，让招聘更轻松！
        </p>
        <div class="hero-btns">
          <a href="javascript:;" class="contact-btn" @click="triggerLogin">立即使用</a>
          <a href="#about" class="resume-btn">了解更多</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">10万+</span>
            <span class="stat-label">并发面试</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">140+</span>
            <span class="stat-label">岗位支持</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">30万+</span>
            <span class="stat-label">模拟真实数据训练</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">150+</span>
            <span class="stat-label">企业信赖</span>
          </div>
        </div>
      </div>
      <div class="hero-right">
        <div class="avatar-wrapper">
          <img src="@/assets/logo.png" alt="乐面Logo" class="avatar-img" />
        </div>
      </div>
    </div>
  </section>

   <!-- 核心功能模块区 -->
   <section class="features-section">
    <div class="container">
      <h2 class="section-title">核心功能模块</h2>
      <p class="section-desc">围绕招聘全流程，打造智能化解决方案</p>
      <div class="features-grid">
        <!-- 职位广场 -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fa fa-briefcase"></i>
          </div>
          <h3 class="card-title">职位广场</h3>
          <p class="card-desc">海量岗位智能匹配，多维度筛选，精准定位优质人才资源</p>
          <a href="#job-market" class="card-btn">了解详情</a>
        </div>
        <!-- AI面试 -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fa fa-microphone"></i>
          </div>
          <h3 class="card-title">AI面试</h3>
          <p class="card-desc">AI驱动自动化面试，实时评估，释放HR人力，提升筛选效率</p>
          <a href="#ai-interview" class="card-btn">立即体验</a>
        </div>
        <!-- 在线刷题 -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fa fa-book"></i>
          </div>
          <h3 class="card-title">在线刷题</h3>
          <p class="card-desc">模拟真实面试场景，海量题库，助力候选人提升应试能力</p>
          <a href="#practice" class="card-btn">开始刷题</a>
        </div>
        <!-- 学习推荐 -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fa fa-lightbulb"></i>
          </div>
          <h3 class="card-title">学习推荐</h3>
          <p class="card-desc">基于岗位需求，个性化推荐学习路径，提升职业竞争力</p>
          <a href="#learning" class="card-btn">查看推荐</a>
        </div>
        <!-- 面试秘境 -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fa fa-magic"></i>
          </div>
          <h3 class="card-title">面试秘境</h3>
          <p class="card-desc">沉浸式面试体验，挑战高难度问题，提升实战能力</p>
          <a href="#interview-secret" class="card-btn">探索秘境</a>
        </div>
        <!-- 我的简历 -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fa fa-id-card"></i>
          </div>
          <h3 class="card-title">我的简历</h3>
          <p class="card-desc">一站式简历管理，智能优化，助你脱颖而出</p>
          <a href="#my-resume" class="card-btn">管理简历</a>
        </div>
      </div>
    </div>
  </section>
 
  <FooterBar />
</template>

<script setup>
import { onMounted } from 'vue'

import FooterBar from './FooterBar.vue'
import HeaderBar from './HeaderBar.vue'

  
const triggerLogin = () => {
  const navLoginBtn = document.getElementById('nav-login-btn')
  if (navLoginBtn) navLoginBtn.click()
}

const toggleTheme = () => {
  const html = document.documentElement
  html.classList.toggle('dark')
}
onMounted(() => {
  const themeBtn = document.getElementById('theme-toggle')
  if (themeBtn) themeBtn.onclick = toggleTheme
})
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary: #2563eb;
  --primary-gradient: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  --dark-200: #22223b;
  --dark-300: #1a1a2e;
  --light-100: #f8f8ff;
  --light-200: #e6edfa;
}



.hero {
  min-height: 80vh;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 0 0;
  /* 新增渐变背景 */
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  position: relative;
  overflow: hidden;
}

/* 炫酷光斑效果 */
.hero::before,
.hero::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}
.hero::before {
  width: 400px;
  height: 400px;
  left: -120px;
  top: -80px;
  background: radial-gradient(circle, #a5b4fc 0%, #f0f5ff 80%);
}
.hero::after {
  width: 320px;
  height: 320px;
  right: -100px;
  bottom: -60px;
  background: radial-gradient(circle, #fbc2eb 0%, #f8fafc 80%);
}

.hero-content {
  position: relative;
  z-index: 1;
  /* 移除背景、圆角、阴影、玻璃拟态效果 */
  /* background: none; */
  /* border-radius: none; */
  /* box-shadow: none; */
  /* backdrop-filter: none; */
  padding: 32px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  align-items: center;
  justify-content: center;
}
.hero-left {
  flex: 1 1 480px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: flex-start;
}
.job-title {
  color: var(--primary);
  font-weight: 700;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.5px;
}
.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  line-height: 1.1;
  color: var(--dark-200);
  text-shadow: 0 6px 24px rgba(37,99,235,0.10), 0 2px 4px rgba(0,0,0,0.08);
  margin-bottom: 8px;
}
.hero-title .highlight {
  color: var(--primary);
  text-shadow: 0 2px 8px rgba(37,99,235,0.12);
}
.hero-title .block {
  display: block;
}
.desc {
  font-size: 1.18rem;
  color: #444;
  max-width: 520px;
  opacity: 0.92;
  font-weight: 400;
  line-height: 1.7;
}
.hero-btns {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}
.contact-btn {
  padding: 14px 38px;
  background: var(--primary-gradient);
  color: #000000;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(37,99,235,0.18);
  text-decoration: none;
  font-size: 1.08rem;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  border: none;
  outline: none;
  display: inline-block;
}
.contact-btn:hover {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 12px 32px rgba(37,99,235,0.22);
}
.resume-btn {
  padding: 14px 38px;
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.08rem;
  transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
}
.resume-btn:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 8px 24px rgba(37,99,235,0.18);
}
.social-row {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #555;
  opacity: 0.85;
  font-size: 1.08rem;
  margin-top: 8px;
}
.social-icons {
  display: flex;
  gap: 20px;
}
.social-icons a {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f3f6fd;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
}
.social-icons a:hover {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 8px 24px rgba(37,99,235,0.18);
}
.hero-right {
  flex: 1 1 340px;
  min-width: 280px;
  display: flex;
  justify-content: center;
}
.avatar-wrapper {
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 12px 48px 0 rgba(37,99,235,0.18), 0 2px 8px rgba(0,0,0,0.08);
  border: 4px solid #fff;
  max-width: 370px;
  background: rgba(255,255,255,0.7);
}
.avatar-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 28px;
}
.login-btn {
  padding: 8px 20px;
  background: var(--primary-gradient);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  margin-left: 16px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.10);
  transition: background 0.3s, transform 0.3s;
}
.login-btn:hover {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  transform: translateY(-2px) scale(1.03);
}

.logo-img {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  object-fit: contain;
  /* background: #fff; */
}

.hero-stats {
  display: flex;
  gap: 36px;
  margin-top: 32px;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stat-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}
.stat-label {
  font-size: 1rem;
  color: #555;
  opacity: 0.85;
  margin-top: 4px;
}

@media (max-width: 900px) {
  .hero-content {
    flex-direction: column;
    gap: 36px;
  }
  .header {
    flex-direction: column;
    gap: 16px;
    padding: 16px 8px 8px 8px;
  }
  .hero-stats {
    gap: 20px;
    margin-top: 20px;
  }
  .stat-num {
    font-size: 1.3rem;
  }
}
@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
  }
  .header {
    padding: 8px 4px 4px 4px;
  }
  .hero-content {
    padding: 0 8px;
  }
  .avatar-wrapper {
    max-width: 90vw;
  }
}


/* 核心功能模块 */
.features-section {
  padding: 60px 0;
  background: var(--light-100);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--dark-200);
  text-align: center;
  margin-bottom: 12px;
  text-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.section-desc {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px auto;
  opacity: 0.9;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 36px;
}
.feature-card {
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.1);
}
.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--light-200);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(37,99,235,0.1);
}
.card-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-200);
  margin-bottom: 12px;
}
.card-desc {
  font-size: 1rem;
  color: #555;
  margin-bottom: 24px;
  flex-grow: 1;
}
.card-btn {
  padding: 12px 28px;
  background: var(--primary-gradient);
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s, transform 0.3s;
}
.card-btn:hover {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  transform: translateY(-2px);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-desc {
    font-size: 1.1rem;
  }
  .features-grid {
    gap: 24px;
  }
  .feature-card {
    padding: 24px;
  }
}
</style>
