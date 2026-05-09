<template>
  <div class="bg-gray-50 min-h-screen font-sans">
    <!-- 导航栏 -->
    <HeaderBar />

    <main class="contener">
    <!-- 英雄区 -->
    <header class="relative pt-16 pb-32 overflow-hidden bg-gradient-to-br from-indigo-700 to-blue-800">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-800 opacity-90"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-blue-800 to-indigo-700 opacity-50"></div>
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/1920/1080?random=10')] bg-cover bg-center opacity-10"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight mb-6 animate-fade-in">
            智能AI面试系统
          </h1>
          <p class="text-[clamp(1rem,2vw,1.25rem)] text-indigo-100 max-w-3xl mx-auto mb-8 animate-slide-up">
            利用先进的人工智能技术，为求职者提供专业的面试体验，为企业提供精准的人才评估
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up delay-100">
            <button class="w-full sm:w-auto bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" @click="goToMockInterview">
              立即使用
            </button>
            <button class="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
              观看演示
            </button>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </header>

    <!-- 统计数据 -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <p class="text-4xl font-bold text-indigo-600 mb-2">98%</p>
            <p class="text-gray-600">用户满意度</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-indigo-600 mb-2">5w+</p>
            <p class="text-gray-600">数据模拟</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-indigo-600 mb-2">10w+</p>
            <p class="text-gray-600">面试数据</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-indigo-600 mb-2">24/7</p>
            <p class="text-gray-600">全天候服务</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能区 -->
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900 mb-4">强大功能，助你脱颖而出</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">我们的AI面试系统提供全方位的面试准备和评估，帮助你在真实面试中表现更出色</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 功能卡片1 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="h-48 bg-gradient-to-br from-indigo-600 to-blue-700 relative">
              <img src="https://picsum.photos/600/400?random=2" alt="AI视频面试" class="absolute inset-0 w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-20 w-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">AI视频面试</h3>
              <p class="text-gray-600 mb-4">模拟真实面试场景，AI面试官根据你的回答进行追问，提供沉浸式面试体验</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center">
                了解更多
                <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- 功能卡片2 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="h-48 bg-gradient-to-br from-purple-600 to-pink-700 relative">
              <img src="https://picsum.photos/600/400?random=3" alt="AI面试助手" class="absolute inset-0 w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-20 w-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">AI面试助手</h3>
              <p class="text-gray-600 mb-4">实时分析你的回答，提供语法、词汇和表达方式的建议，帮助你提升沟通技巧</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center">
                了解更多
                <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- 功能卡片3 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="h-48 bg-gradient-to-br from-green-600 to-teal-700 relative">
              <img src="https://picsum.photos/600/400?random=4" alt="面试报告" class="absolute inset-0 w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-20 w-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">面试报告生成</h3>
              <p class="text-gray-600 mb-4">面试结束后，系统自动生成详细报告，分析你的优势和需要改进的地方</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center">
                了解更多
                <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- 功能卡片4 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="h-48 bg-gradient-to-br from-amber-600 to-orange-700 relative">
              <img src="https://picsum.photos/600/400?random=5" alt="表现分析" class="absolute inset-0 w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-20 w-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">面试表现分析</h3>
              <p class="text-gray-600 mb-4">通过语音、表情和肢体语言分析，帮助你了解自己在面试中的非语言表现</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center">
                了解更多
                <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- 功能卡片5 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="h-48 bg-gradient-to-br from-red-600 to-pink-700 relative">
              <img src="https://picsum.photos/600/400?random=6" alt="岗位模拟" class="absolute inset-0 w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-20 w-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-7 13h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">岗位专属面试模拟</h3>
              <p class="text-gray-600 mb-4">根据不同行业和职位类型，提供针对性的面试问题和评估标准</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center">
                了解更多
                <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- 功能卡片6 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img src="https://picsum.photos/600/400?random=7" alt="面试题库" class="absolute inset-0 w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-20 w-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-4v-4h4v4zm0-6h-4V8h4v4zm6 6h-4v-4h4v4zm0-6h-4V8h4v4z"></path>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">面试题库</h3>
              <p class="text-gray-600 mb-4">提供海量面试真题和标准答案，帮助你熟悉各类面试问题和应对策略</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center">
                了解更多
                <svg class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 演示区 -->
    <section id="demo" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900 mb-4">体验AI面试系统</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">通过下面的演示，了解我们的AI面试系统如何帮助你提升面试技巧</p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">智能分析，精准反馈</h3>
            <p class="text-gray-600 mb-6">我们的AI面试系统不仅能模拟真实面试场景，还能对您的回答进行多维度分析，提供专业的改进建议。</p>
            
            <div class="space-y-4 mb-8">
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-gray-900">语言表达分析</h4>
                  <p class="text-sm text-gray-600">评估你的语法、词汇使用和表达清晰度</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-gray-900">情绪识别</h4>
                  <p class="text-sm text-gray-600">分析你的语调、语速和情绪表达是否合适</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-gray-900">肢体语言评估</h4>
                  <p class="text-sm text-gray-600">通过视频分析你的姿势、手势和面部表情</p>
                </div>
              </div>
            </div>
            
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" @click="goToAIAssistant">
              立即体验
            </button>
          </div>
          
          <div class="order-1 md:order-2 relative">
            <div class="relative rounded-xl overflow-hidden shadow-2xl">
              <video
  src="/video/piantou.mp4"
  autoplay
  loop
  muted
  playsinline
  class="w-full h-auto rounded-xl"
>
  您的浏览器不支持 video 标签。
</video>
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div class="p-6">
                  <h4 class="text-white text-xl font-bold mb-2">AI面试模拟演示</h4>
                  <p class="text-gray-200 mb-4">观看我们的系统如何进行智能面试评估</p>
                  <button class="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium flex items-center">
                    <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                    </svg>
                    播放视频
                  </button>
                </div>
              </div>
            </div>
            
            <div class="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 max-w-xs animate-pulse">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100/100?random=9" alt="用户头像">
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">李小明</p>
                  <p class="text-xs text-gray-500">通过系统训练后成功入职</p>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-700">"使用这个系统训练了两周，我的面试表现有了显著提升，最终成功拿到了心仪的offer。"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 用户评价 -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900 mb-4">用户如何评价我们</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">听听使用过我们AI面试系统的求职者和企业HR的真实反馈</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- 评价卡片1 -->
          <div class="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <img class="h-12 w-12 rounded-full object-cover" src="https://picsum.photos/100/100?random=11" alt="用户头像">
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">张女士</h4>
                <p class="text-sm text-gray-500">软件工程师</p>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex text-yellow-400">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600">"这个AI面试系统真的帮了我大忙！它不仅能模拟真实面试场景，还能详细分析我的回答和表现，给了我很多实用的改进建议。最终我成功通过了几家大公司的面试。"</p>
          </div>

          <!-- 评价卡片2 -->
          <div class="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <img class="h-12 w-12 rounded-full object-cover" src="https://picsum.photos/100/100?random=12" alt="用户头像">
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">王先生</h4>
                <p class="text-sm text-gray-500">HR总监</p>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex text-yellow-400">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600">"作为HR总监，我推荐所有企业使用这个系统。它为我们节省了大量的面试时间，同时提供了客观、全面的候选人评估报告，帮助我们更准确地筛选人才。"</p>
          </div>

          <!-- 评价卡片3 -->
          <div class="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <img class="h-12 w-12 rounded-full object-cover" src="https://picsum.photos/100/100?random=13" alt="用户头像">
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">陈女士</h4>
                <p class="text-sm text-gray-500">应届毕业生</p>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex text-yellow-400">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600">"作为一名应届毕业生，我非常担心面试。这个系统给了我很多练习的机会，让我熟悉了各种面试问题，并且通过分析报告，我知道了自己的弱点在哪里。最终帮助我成功找到了第一份工作。"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 价格方案 -->
   <section id="pricing" class="py-20 bg-white" v-if="false">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900 mb-4">选择适合你的方案</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">我们提供多种灵活的订阅方案，满足不同用户的需求</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- 基础版  -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">基础版</h3>
              <p class="text-gray-500 mb-6">适合初次体验AI面试的用户</p>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-gray-900">¥99</span>
                <span class="ml-2 text-gray-500">/月</span>
              </div>
              <ul class="mt-6 space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">每月5次AI视频面试</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  
                  <div class="ml-3">
                    <p class="text-gray-600">基础面试报告</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">标准行业面试题库</p>
                  </div>
                </li>
                <li class="flex items-start text-gray-400">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p>AI面试助手</p>
                  </div>
                </li>
                <li class="flex items-start text-gray-400">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p>岗位专属面试模拟</p>
                  </div>
                </li>
              </ul>
              <button class="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                开始免费试用
              </button>
            </div>
          </div>

          <!-- 专业版 -->
          <div class="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-indigo-600 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative">
            <div class="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-xs font-semibold">
              最受欢迎
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">专业版</h3>
              <p class="text-gray-500 mb-6">适合有明确求职目标的用户</p>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-gray-900">¥199</span>
                <span class="ml-2 text-gray-500">/月</span>
              </div>
              <ul class="mt-6 space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">每月20次AI视频面试</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">详细面试报告与分析</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">全行业面试题库</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">AI面试助手</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">5个岗位专属面试模拟</p>
                  </div>
                </li>
              </ul>
              <button class="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                开始免费试用
              </button>
            </div>
          </div>

          <!-- 企业版 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">企业版</h3>
              <p class="text-gray-500 mb-6">适合企业招聘团队使用</p>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-gray-900">¥999</span>
                <span class="ml-2 text-gray-500">/月</span>
              </div>
              <ul class="mt-6 space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">无限制AI视频面试</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">高级面试报告与分析</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">自定义面试题库</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">团队管理与协作</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-600">无限制岗位专属面试</p>
                  </div>
                </li>
              </ul>
              <button class="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                联系销售
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900 mb-6">有疑问？联系我们</h2>
            <p class="text-gray-600 mb-8">我们的团队随时准备回答您的问题，帮助您了解更多关于AI面试系统的信息</p>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm13 4a1 1 0 10-2 0v3H8a1 1 0 000 2h5v3a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">在线咨询</h3>
                  <p class="text-gray-600">我们的客服团队7×24小时在线为您服务</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a1 1 0 00-.54 1.06l.74 4.435a1 1 0 01-.986.836H3a1 1 0 01-1-1V3zm10.007 10.553a1 1 0 001.062-.54l1.548-.774a1 1 0 01.54-.986l.74-4.435a1 1 0 01.986-.836H17a1 1 0 011 1v10a1 1 0 01-1 1h-2.153a1 1 0 01-.986-.836l-.74-4.435a1 1 0 00-.54-1.06l-1.548-.773z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">电话咨询</h3>
                  <p class="text-gray-600">400-123-4567</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">邮件咨询</h3>
                  <p class="text-gray-600">support@interviewai.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">发送消息</h3>
            <form>
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300" placeholder="请输入您的姓名">
              </div>
              
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300" placeholder="请输入您的邮箱">
              </div>
              
              <div class="mb-4">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">消息</label>
                <textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300" placeholder="请输入您的消息"></textarea>
              </div>
              
              <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                发送消息
              </button>
            </form>
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
  import HeaderBar from '../components/HeaderBar.vue';
  import FooterBar from '../components/FooterBar.vue';
  import { ref, onMounted, onUnmounted } from 'vue';

  // 响应式scrollY用于模板class切换
  const scrollY = ref(0);

  const handleScroll = () => {
    scrollY.value = window.scrollY;
    // 原生class操作（可选，和Vue class绑定不冲突时可保留）
    const nav = document.querySelector('nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('bg-white', 'shadow-md');
        nav.classList.remove('bg-transparent');
      } else {
        nav.classList.remove('bg-white', 'shadow-md');
        nav.classList.add('bg-transparent');
      }
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) mobileMenu.classList.toggle('hidden');
      });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          // 关闭移动菜单
          const mobileMenu = document.querySelector('.mobile-menu');
          if (mobileMenu) mobileMenu.classList.add('hidden');
        }
      });
    });
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  // 跳转函数
  function goToMockInterview() {
    window.location.href = 'http://localhost:9000/aiInterview/Mockinterviews';
  }
  function goToAIAssistant() {
    window.location.href = 'http://localhost:9000/aiInterview/AIAssistant';
  }
  </script>


<style scoped>
.contener {
  margin-top: 100px;
}
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-in-out;
}

.delay-100 {
  animation-delay: 0.1s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
  