<template>
    <HeaderBar />
    <div class="bg-gray-50 min-h-screen">
      <!-- 导航栏 -->
     
  
      <!-- 主内容区 -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <!-- 英雄区域 -->
        <section class="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center">
              <div class="md:w-1/2 p-8 md:p-12 text-white">
                <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-4">
                  每日一题，<br>提升面试竞争力
                </h1>
                <p class="text-lg md:text-xl mb-8 text-white/90">
                  每天一道精选面试题，助你掌握核心概念，轻松应对技术面试
                </p>
                <div class="flex flex-wrap gap-4">
                  <a
                    href="http://localhost:9000/question/dailyQuestion"
                    class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    开始今日练习 <i class="fa fa-arrow-right ml-2"></i>
                  </a>
                  <a
                    href="http://localhost:9000/question/category"
                    class="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    查看全部题库 <i class="fa fa-th-list ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="md:w-1/2 p-8 md:p-12 relative flex flex-col items-center justify-center h-[400px]">
                <div class="relative w-full h-full flex items-center justify-center">
                  <img
                    v-for="(img, idx) in carouselImages"
                    :key="img"
                    :src="img"
                    alt="面试场景"
                    class="w-full h-full object-contain rounded-lg shadow-lg transform transition-all duration-700 hover:scale-105 bg-white"
                    v-show="currentCarouselIndex === idx"
                  />
                </div>
                <!-- 指示条 -->
                <div class="flex space-x-3 absolute bottom-6 left-1/2 -translate-x-1/2">
                  <div
                    v-for="(img, idx) in carouselImages"
                    :key="idx"
                    @click="goToCarousel(idx)"
                    class="h-2 rounded-full cursor-pointer transition-all duration-300"
                    :class="currentCarouselIndex === idx ? 'w-16 bg-gradient-to-r from-blue-500 to-blue-700' : 'w-6 bg-gray-300 opacity-60'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 数据统计卡片 -->
        <section class="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">今日完成</p>
                <h3 class="text-3xl font-bold text-gray-900 mt-1">2/5</h3>
                <p class="text-blue-600 text-sm mt-2 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i> 已完成40%
                </p>
              </div>
              <div class="bg-blue-100 p-3 rounded-lg">
                <i class="fa fa-check-circle text-blue-600 text-2xl"></i>
              </div>
            </div>
          </div>
  
          <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">连续打卡</p>
                <h3 class="text-3xl font-bold text-gray-900 mt-1">7天</h3>
                <p class="text-green-600 text-sm mt-2 flex items-center">
                  <i class="fa fa-trophy mr-1"></i> 已获得青铜勋章
                </p>
              </div>
              <div class="bg-green-100 p-3 rounded-lg">
                <i class="fa fa-calendar-check-o text-green-600 text-2xl"></i>
              </div>
            </div>
          </div>
  
          <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">正确率</p>
                <h3 class="text-3xl font-bold text-gray-900 mt-1">82%</h3>
                <p class="text-purple-600 text-sm mt-2 flex items-center">
                  <i class="fa fa-line-chart mr-1"></i> 较上周提升3%
                </p>
              </div>
              <div class="bg-purple-100 p-3 rounded-lg">
                <i class="fa fa-pie-chart text-purple-600 text-2xl"></i>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 今日题目 -->
        <section class="mb-12">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">今日一题</h2>
            <button @click="nextQuestion" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg">换一换</button>
          </div>
          <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div class="p-6">
              <div class="flex items-start mb-4">
                <div class="bg-blue-100 p-2 rounded-lg mr-3">
                  <i class="fa fa-code text-blue-600"></i>
                </div>
                <div>
                  <div class="flex items-center">
                    <span class="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mr-2">{{ currentQuestion.level }}</span>
                    <span class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{{ currentQuestion.tag }}</span>
                  </div>
                  <h3 class="text-xl font-semibold mt-2">{{ currentQuestion.title }}</h3>
                </div>
              </div>
              <p class="text-gray-600 mb-6">
                {{ currentQuestion.desc }}
              </p>
              <div class="flex justify-end">
                <button @click="openDetail" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  查看题目详情 <i class="fa fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
          <QuestionDetailModal v-if="showDetail && detailQuestion" :question="detailQuestion" @close="closeDetail" />
        </section>
  
        <!-- 热门题库分类 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">热门题库分类</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="#" class="bg-white rounded-xl shadow-md p-6 flex items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <i class="fa fa-code text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">前端开发</h3>
                <p class="text-sm text-gray-500">243 道题目</p>
              </div>
            </a>
  
            <a href="#" class="bg-white rounded-xl shadow-md p-6 flex items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="bg-green-100 p-3 rounded-lg mr-4">
                <i class="fa fa-database text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">数据库</h3>
                <p class="text-sm text-gray-500">187 道题目</p>
              </div>
            </a>
  
            <a href="#" class="bg-purple-100 rounded-xl shadow-md p-6 flex items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="bg-purple-100 p-3 rounded-lg mr-4">
                <i class="fa fa-server text-purple-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">后端开发</h3>
                <p class="text-sm text-gray-500">215 道题目</p>
              </div>
            </a>
  
            <a href="#" class="bg-red-100 rounded-xl shadow-md p-6 flex items-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="bg-red-100 p-3 rounded-lg mr-4">
                <i class="fa fa-mobile text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">移动端开发</h3>
                <p class="text-sm text-gray-500">156 道题目</p>
              </div>
            </a>
          </div>
        </section>
  
        <!-- 推荐题目 -->
        <section class="mb-12">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">为你推荐</h2>
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
              查看更多 <i class="fa fa-angle-right ml-1"></i>
            </a>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-start mb-4">
                  <div class="bg-green-100 p-2 rounded-lg mr-3">
                    <i class="fa fa-database text-green-600"></i>
                  </div>
                  <div>
                    <div class="flex items-center">
                      <span class="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full mr-2">困难</span>
                      <span class="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">MySQL</span>
                    </div>
                    <h3 class="text-lg font-semibold mt-2">如何优化MySQL中复杂查询的性能？请举例说明。</h3>
                  </div>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  当处理包含多个表连接、子查询和聚合函数的复杂查询时，MySQL的性能可能会受到影响。请分享你优化这类查询的经验和技巧。
                </p>
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-xs text-gray-500 mr-3"><i class="fa fa-eye mr-1"></i> 1,234</span>
                    <span class="text-xs text-gray-500"><i class="fa fa-comment mr-1"></i> 42</span>
                  </div>
                  <router-link to="/question/2" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    查看详情
                  </router-link>
                </div>
              </div>
            </div>
  
            <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-start mb-4">
                  <div class="bg-blue-100 p-2 rounded-lg mr-3">
                    <i class="fa fa-code text-blue-600"></i>
                  </div>
                  <div>
                    <div class="flex items-center">
                      <span class="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mr-2">简单</span>
                      <span class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Vue.js</span>
                    </div>
                    <h3 class="text-lg font-semibold mt-2">Vue.js中computed和watch的区别是什么？何时应该使用它们？</h3>
                  </div>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  computed和watch都是Vue.js中处理数据变化的方法，但它们有不同的应用场景。请解释它们的主要区别以及如何在实际项目中选择使用它们。
                </p>
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-xs text-gray-500 mr-3"><i class="fa fa-eye mr-1"></i> 876</span>
                    <span class="text-xs text-gray-500"><i class="fa fa-comment mr-1"></i> 28</span>
                  </div>
                  <router-link to="/question/3" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    查看详情
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 学习路径 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">热门学习路径</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <img src="https://picsum.photos/id/1/400/200" alt="前端开发学习路径" class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <div class="flex -space-x-2">
                    <img src="https://picsum.photos/id/237/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                    <img src="https://picsum.photos/id/238/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                    <img src="https://picsum.photos/id/239/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                  </div>
                  <span class="text-xs text-gray-500 ml-2">已有1,245人学习</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">前端开发面试通关</h3>
                <p class="text-sm text-gray-600 mb-4">掌握HTML、CSS、JavaScript核心概念，深入理解React、Vue等框架，轻松应对前端面试。</p>
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-xs text-gray-500 mr-3"><i class="fa fa-clock-o mr-1"></i> 30小时</span>
                    <span class="text-xs text-gray-500"><i class="fa fa-signal mr-1"></i> 初级到高级</span>
                  </div>
                  <router-link to="/path/1" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    开始学习
                  </router-link>
                </div>
              </div>
            </div>
  
            <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <img src="https://picsum.photos/id/2/400/200" alt="后端开发学习路径" class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <div class="flex -space-x-2">
                    <img src="https://picsum.photos/id/240/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                    <img src="https://picsum.photos/id/241/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                    <img src="https://picsum.photos/id/242/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                  </div>
                  <span class="text-xs text-gray-500 ml-2">已有987人学习</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">后端开发面试通关</h3>
                <p class="text-sm text-gray-600 mb-4">从Node.js到Spring Boot，从数据库设计到微服务架构，全面提升后端开发技能。</p>
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-xs text-gray-500 mr-3"><i class="fa fa-clock-o mr-1"></i> 45小时</span>
                    <span class="text-xs text-gray-500"><i class="fa fa-signal mr-1"></i> 初级到高级</span>
                  </div>
                  <router-link to="/path/2" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    开始学习
                  </router-link>
                </div>
              </div>
            </div>
  
            <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <img src="https://picsum.photos/id/3/400/200" alt="全栈开发学习路径" class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <div class="flex -space-x-2">
                    <img src="https://picsum.photos/id/243/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                    <img src="https://picsum.photos/id/244/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                    <img src="https://picsum.photos/id/245/100/100" alt="用户头像" class="w-8 h-8 rounded-full border-2 border-white">
                  </div>
                  <span class="text-xs text-gray-500 ml-2">已有763人学习</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">全栈开发面试通关</h3>
                <p class="text-sm text-gray-600 mb-4">掌握前后端技术栈，构建完整的Web应用，成为全能型开发人才。</p>
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-xs text-gray-500 mr-3"><i class="fa fa-clock-o mr-1"></i> 60小时</span>
                    <span class="text-xs text-gray-500"><i class="fa fa-signal mr-1"></i> 中级到高级</span>
                  </div>
                  <router-link to="/path/3" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    开始学习
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <!-- 页脚 -->
    <FooterBar />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import HeaderBar from '../components/HeaderBar.vue';
import FooterBar from '../components/FooterBar.vue';
import QuestionDetailModal from '../components/QuestionDetailModal.vue'
import img1 from '../assets/每日一题1.png'
import img2 from '../assets/每日一题2.png'
import img3 from '../assets/每日一题3.png'
const showDetail = ref(false)
const detailQuestion = ref({})
function openDetail() {
  detailQuestion.value = currentQuestion.value
  showDetail.value = true
}
function closeDetail() {
  showDetail.value = false
}
// 题目数组
const questions = [
  {
    id: 1,
    level: '中等',
    tag: 'JavaScript',
    title: '请解释JavaScript中的事件冒泡和事件捕获，并说明如何阻止它们。',
    desc: '事件冒泡和事件捕获是JavaScript中处理DOM事件传播的两种机制。理解它们对于有效地管理和控制事件处理非常重要。',
    link: '/question/1'
  },
  {
    id: 2,
    level: '困难',
    tag: 'MySQL',
    title: '如何优化MySQL中复杂查询的性能？请举例说明。',
    desc: '当处理包含多个表连接、子查询和聚合函数的复杂查询时，MySQL的性能可能会受到影响。请分享你优化这类查询的经验和技巧。',
    link: '/question/2'
  },
  {
    id: 3,
    level: '简单',
    tag: 'Vue.js',
    title: 'Vue.js中computed和watch的区别是什么？何时应该使用它们？',
    desc: 'computed和watch都是Vue.js中处理数据变化的方法，但它们有不同的应用场景。请解释它们的主要区别以及如何在实际项目中选择使用它们。',
    link: '/question/3'
  },
  {
    id: 4,
    level: '中等',
    tag: 'React',
    title: 'React中setState是同步还是异步的？请说明原因。',
    desc: 'setState在React中通常是异步的，这有助于性能优化和批量更新。请详细说明其原理。',
    link: '/question/4'
  },
  {
    id: 5,
    level: '困难',
    tag: '算法',
    title: '请实现一个LRU缓存，并说明其原理。',
    desc: 'LRU缓存是一种常见的缓存淘汰算法，请用代码实现并解释其核心思想。',
    link: '/question/5'
  }
]
const currentIndex = ref(0)
const currentQuestion = computed(() => questions[currentIndex.value])
function nextQuestion() {
  currentIndex.value = (currentIndex.value + 1) % questions.length
}
// 处理滚动事件
const scrollY = ref(0)
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  const handleScroll = () => {
    scrollY.value = window.scrollY
  }
  
  // 页面卸载时移除事件监听器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  const carouselImages = [
    img1,
    img2,
    img3
  ]
  const currentCarouselIndex = ref(0)
  let carouselTimer = null

  function nextCarousel() {
    currentCarouselIndex.value = (currentCarouselIndex.value + 1) % carouselImages.length
  }

  onMounted(() => {
    carouselTimer = setInterval(nextCarousel, 3000)
  })
  onUnmounted(() => {
    clearInterval(carouselTimer)
  })

  function goToCarousel(idx) {
    currentCarouselIndex.value = idx
  }
  </script>
  
  <style scoped>
.container {
  margin-top: 60px;
}
 
  /* 自定义动画 */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  /* 延迟动画 */
  .delay-100 {
    animation-delay: 0.1s;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  
  .delay-300 {
    animation-delay: 0.3s;
  }
  </style>    