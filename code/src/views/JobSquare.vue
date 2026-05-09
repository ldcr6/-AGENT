<template>
  <HeaderBar />
  <div class="job-square-bg">
    <div class="job-feature-title-wrap">
      <div class="feature-label-text">职位广场为你推荐优质职位</div>
      <svg class="feature-label-underline" width="260" height="28" viewBox="0 0 260 28">
        <defs>
          <linearGradient id="label-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a259ec"/>
            <stop offset="50%" stop-color="#f472b6"/>
            <stop offset="100%" stop-color="#4f8cff"/>
          </linearGradient>
        </defs>
        <path d="M20 22 Q100 2 200 18 Q230 26 250 10" stroke="url(#label-gradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="job-feature-card">
      <div class="feature-left">
        <div class="img-box" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
          <transition name="fade-carousel" mode="out-in">
            <img
              :src="imgs[currentIndex]"
              :alt="'轮播图' + (currentIndex + 1)"
              class="feature-img"
              :key="currentIndex"
            />
          </transition>
          <button class="carousel-btn left" @click="prevImg">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="carousel-btn right" @click="nextImg">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="carousel-dots">
            <span
              v-for="(img, idx) in imgs"
              :key="idx"
              :class="['dot', { active: idx === currentIndex }]"
              @click="goToImg(idx)"
            ></span>
          </div>
          <!-- 装饰SVG线条 -->
          <svg class="curve-svg" width="120" height="80">
            <path d="M10,70 Q60,10 110,70" stroke="#4ade80" stroke-width="4" fill="none" />
            <polygon points="110,70 105,65 115,65" fill="#4ade80"/>
          </svg>
          <svg class="corner-svg" width="40" height="40">
            <path d="M0,40 Q0,0 40,0" stroke="#22223b" stroke-width="4" fill="none"/>
          </svg>
        </div>
      </div>
      <div class="feature-right">
        <div class="feature-label-wrap">
          
          
        </div>
        <h1 class="feature-title">
          <span class="main-title">智能搜查，</span><span class="highlight">高效推荐</span>
        </h1>
        <ul class="feature-list">
          <li><span class="check-icon">✔</span> 支持多条件职位搜索，快速定位心仪岗位。</li>
          <li><span class="icon">🤖</span> AI智能推荐，个性化推送最适合你的职位。</li>
          <li><span class="icon">🔥</span> 热招职位实时更新，紧跟行业趋势。</li>
          <li><span class="icon">🏢</span> 热门企业一览，优质公司任你挑选。</li>
          <li><span class="icon">📊</span> 岗位数据分析，助力职业决策。</li>
          <li><span class="check-icon">✔</span> 一键投递，在线沟通更便捷。</li>
        </ul>
        <button class="feature-btn neon-btn">立即体验职位广场</button>
      </div>
    </div>
    <MainContent />
    <JobList />
    <HotJobs />
    <HotCompanies />
   
  </div>
  <FooterBar />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import MainContent from '@/components/MainContent.vue'
import JobList from '@/components/JobList.vue'
import HotJobs from '@/components/HotJobs.vue'
import HotCompanies from '@/components/HotCompanies.vue'
import FooterBar from '@/components/FooterBar.vue'
const imgs = [
  require('@/assets/lunbo1.png'),
  require('@/assets/lunbo2.png'),
  require('@/assets/lunbo3.png')
]
const currentIndex = ref(0)
const transitioning = ref(false)
let timer = null

function prevImg() {
  goToImg((currentIndex.value + imgs.length - 1) % imgs.length)
}
function nextImg() {
  goToImg((currentIndex.value + 1) % imgs.length)
}
function goToImg(idx) {
  if (currentIndex.value === idx) return
  transitioning.value = true
  setTimeout(() => {
    currentIndex.value = idx
    transitioning.value = false
  }, 350)
}
function startAutoPlay() {
  timer = setInterval(() => {
    nextImg()
  }, 3000)
}
function stopAutoPlay() {
  if (timer) clearInterval(timer)
}
onMounted(() => {
  startAutoPlay()
})
onUnmounted(() => {
  stopAutoPlay()
})
// 鼠标悬停暂停，移开继续
watch(currentIndex, () => {
  stopAutoPlay()
  startAutoPlay()
})
</script>

<style scoped>
.job-square-bg {
  margin-top: 120px;
  min-height: 100vh;
  width: 100%;
  background: #fff;
  /* background: linear-gradient(120deg, #f3e8ff 0%, #e0e7ff 60%, #dbeafe 100%); */
  /* 紫蓝渐变 */
  /* padding-bottom: 0px; */
}
.job-feature-card {
  max-width: 1200px;
  margin: 0px auto 0 auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 32px rgba(37,99,235,0.01);
  display: flex;
  align-items: center;
  padding: 56px 40px;
  gap: 56px;
  position: relative;
}
.feature-left {
  flex: 1 1 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.img-box {
  position: relative;
  margin-right: 60px;
  width: 560px;
  height: 400px;
  background: #f8f8ff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(37,99,235,0.10);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.feature-img {
  width: 105%;
  height: 105%;
  object-fit: contain;
  border-radius: 16px;
  z-index: 1;
}
.curve-svg {
  position: absolute;
  right: -40px;
  bottom: -10px;
  z-index: 2;
}
.corner-svg {
  position: absolute;
  left: -20px;
  top: -20px;
  z-index: 2;
}
.feature-right {
  flex: 1 1 520px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.feature-label {
  color: #ff7a00;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2px;
}
.feature-label-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2px;
  position: relative;
}
.feature-label-text {
  color: #22223b;
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #2563eb 30%, #4ade80 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.feature-label-underline {
  margin-top: -6px;
  margin-left: 2px;
}
.feature-title {
  font-size: 3rem;
  font-weight: 900;
  color: #22223b;
  margin-bottom: 8px;
  line-height: 1.2;
}
.feature-title .main-title {
  color: #2563eb;
  font-weight: 900;
}
.feature-title .highlight {
  color: #2563eb;
  font-weight: 900;
  border-bottom: 5px solid #dd44dd;
  padding-bottom: 2px;
}
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}
.feature-list li {
  font-size: 1.13rem;
  color: #22223b;
  margin-bottom: 12px;
  position: relative;
  padding-left: 32px;
  display: flex;
  align-items: center;
  font-weight: 500;
}
.check-icon {
  color: #2563eb;
  font-size: 1.25rem;
  margin-right: 8px;
  font-weight: bold;
  filter: drop-shadow(0 0 4px #60a5fa);
}
.icon {
  font-size: 1.25rem;
  margin-right: 8px;
  filter: drop-shadow(0 0 4px #60a5fa);
}
.feature-btn {
  padding: 14px 38px;
  background: var(--primary-gradient, linear-gradient(90deg, #2563eb 0%, #3b82f6 100%));
  color: #fff;
  font-weight: 700;
  border-radius: 12px;
  font-size: 1.08rem;
  border: 2px solid #2563eb;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(37,99,235,0.12);
  transition: background 0.3s, transform 0.3s;
}
.feature-btn:hover {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  transform: translateY(-2px) scale(1.04);
}
.neon-btn {
  padding: 16px 48px;
  font-size: 1.18rem;
  font-weight: 800;
  border: none;
  border-radius: 14px;
  color: #fff;
  background: linear-gradient(90deg, #4f8cff, #4ade80, #f472b6, #4f8cff);
  background-size: 300% 300%;
  /* box-shadow: 0 0 16px 2px #4ade80, 0 4px 32px rgba(37,99,235,0.18); */
  animation: neon-gradient 3s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  outline: none;
  margin-top: 12px;
}
.neon-btn:hover {
  transform: scale(1.04) translateY(-2px);
  box-shadow: 0 0 32px 6px #4ade80, 0 8px 32px rgba(37,99,235,0.22);
}
@keyframes neon-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.job-feature-title-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 35px 0 0 0;
  
}
.feature-label-text {
  font-size: 2.6rem;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #a259ec 10%, #f472b6 60%, #4f8cff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 0;
  text-shadow: 0 2px 16px rgba(162,89,236,0.08);
}
.feature-label-underline {
  margin-top: -10px;
  display: block;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #dde2eb 0%, #a259ec 100%);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0 4px 16px rgba(79,140,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  transition: background 0.2s, box-shadow 0.2s, opacity 0.2s, transform 0.2s;
}
.carousel-btn.left { left: 5px; }
.carousel-btn.right { right: 5px; }
.carousel-btn:hover {
  background: linear-gradient(135deg, #a259ec 0%, #4f8cff 100%);
  box-shadow: 0 8px 32px #a259ec44;
  opacity: 1;
  transform: translateY(-50%) scale(1.08);
}

.carousel-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c7d2fe;
  cursor: pointer;
  transition: background 0.2s;
}
.dot.active {
  background: #4f8cff;
  box-shadow: 0 0 8px #4f8cff;
}
.view-more-btn {
  margin-top: 12px;
  width: 100%;
  padding: 8px 0;
  background: linear-gradient(90deg, #4f8cff 0%, #a259ec 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 8px;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.view-more-btn:hover {
  background: linear-gradient(90deg, #a259ec 0%, #4f8cff 100%);
}
@media (max-width: 900px) {
  .job-feature-card {
    flex-direction: column;
    gap: 24px;
    padding: 24px 8px;
  }
  .img-box {
    width: 90vw;
    height: 180px;
  }
  .feature-label-text {
    font-size: 2rem;
    
  }
  .feature-label-underline {
    width: 140px !important;
    height: 16px !important;
  }
}
.fade-carousel-enter-active, .fade-carousel-leave-active {
  transition: opacity 0.35s cubic-bezier(.4,0,.2,1);
}
.fade-carousel-enter-from, .fade-carousel-leave-to {
  opacity: 0;
}
.fade-carousel-enter-to, .fade-carousel-leave-from {
  opacity: 1;
}
</style>