<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <!-- 导航栏 -->
      <HeaderBar />
  
      <!-- 英雄区 -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/5 -z-10"></div>
        <div class="container mx-auto px-4 py-20 md:py-32">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0">
              <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-800 leading-tight">
                提升你的<span class="text-blue-600">面试技巧</span>，<br>获得梦想的工作
              </h1>
              <p class="mt-6 text-lg text-gray-600 max-w-xl">
                无论是技术面试还是行为面试，我们都能帮助你做好充分准备，提供专业的题库、模拟面试和个性化学习路径。
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <button class="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  开始准备
                </button>
                <button class="px-8 py-3 rounded-lg bg-white text-blue-600 font-medium border border-blue-300 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
                  了解更多
                </button>
              </div>
              <div class="mt-10 flex items-center space-x-4">
                <div class="flex -space-x-2">
                  <img src="https://picsum.photos/id/1001/100/100" alt="用户头像" class="w-10 h-10 rounded-full border-2 border-white">
                  <img src="https://picsum.photos/id/1002/100/100" alt="用户头像" class="w-10 h-10 rounded-full border-2 border-white">
                  <img src="https://picsum.photos/id/1003/100/100" alt="用户头像" class="w-10 h-10 rounded-full border-2 border-white">
                  <img src="https://picsum.photos/id/1004/100/100" alt="用户头像" class="w-10 h-10 rounded-full border-2 border-white">
                  <div class="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 font-medium text-xs">+5k</div>
                </div>
                <div class="text-sm text-gray-600">
                  <span class="font-semibold text-gray-800">5,000+</span> 用户已成功通过面试
                </div>
              </div>
            </div>
            <div class="md:w-1/2 relative">
              <div class="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-3xl">
                <img src="https://picsum.photos/id/1/600/400" alt="面试场景" class="w-full h-auto">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div class="p-6">
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">热门</span>
                      <span class="text-white text-sm">技术面试准备</span>
                    </div>
                    <h3 class="text-white text-xl font-bold">系统设计面试指南</h3>
                    <p class="text-white/80 text-sm mt-1">掌握大型系统设计的关键概念和模式</p>
                  </div>
                </div>
              </div>
              <div class="absolute top-1/4 -right-10 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-50 -z-10"></div>
              <div class="absolute bottom-1/4 -left-10 w-40 h-40 bg-purple-200 rounded-full filter blur-3xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>
  
      <!-- 特色功能区 -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800">我们的特色</h2>
            <p class="mt-4 text-gray-600 max-w-2xl mx-auto">精心设计的功能，帮助你全方位提升面试能力</p>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- 功能卡片 1 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">专业题库</h3>
              <p class="text-gray-600">超过10,000道面试真题，覆盖各个技术领域和职位类型，帮助你系统性准备。</p>
              <a href="#" class="mt-4 inline-block text-blue-600 font-medium hover:underline flex items-center">
                浏览题库 <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
  
            <!-- 功能卡片 2 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">模拟面试</h3>
              <p class="text-gray-600">AI模拟真实面试场景，实时反馈你的表现，帮助你发现不足并针对性提升。</p>
              <a href="#" class="mt-4 inline-block text-blue-600 font-medium hover:underline flex items-center">
                开始模拟 <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
  
            <!-- 功能卡片 3 -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">个性化学习路径</h3>
              <p class="text-gray-600">基于你的目标职位和当前水平，定制专属学习计划，高效提升你的面试能力。</p>
              <a href="#" class="mt-4 inline-block text-blue-600 font-medium hover:underline flex items-center">
                创建路径 <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 题库展示区 -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800">精选题库</h2>
              <p class="mt-4 text-gray-600 max-w-2xl">由行业专家精心整理的高频面试题，助你事半功倍</p>
            </div>
            <div class="mt-6 md:mt-0 flex space-x-3">
              <button class="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">全部</button>
              <button class="px-4 py-2 rounded-lg bg-white text-gray-600 font-medium hover:bg-gray-100 transition-colors">算法</button>
              <button class="px-4 py-2 rounded-lg bg-white text-gray-600 font-medium hover:bg-gray-100 transition-colors">系统设计</button>
              <button class="px-4 py-2 rounded-lg bg-white text-gray-600 font-medium hover:bg-gray-100 transition-colors">行为面试</button>
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 题库卡片 1 -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">热门</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.106-.608.106-.93 0-2.83-2.27-5.1-5-5.1s-5 2.27-5 5.1c0 .322.036.633.106.93H5.5a4.5 4.5 0 100 1h9a4.5 4.5 0 100-1h-.085z"></path>
                    </svg>
                    <span>1,245 次练习</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">数据结构与算法</h3>
                <p class="text-gray-600 mb-4">涵盖链表、树、图、排序算法等常见面试题，助你攻克技术面试第一关。</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">链表</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">树</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">排序</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">递归</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img src="https://picsum.photos/id/1005/100/100" alt="专家头像" class="w-8 h-8 rounded-full">
                    <span class="ml-2 text-sm text-gray-600">由资深算法专家整理</span>
                  </div>
                  <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">开始练习</button>
                </div>
              </div>
            </div>
  
            <!-- 题库卡片 2 -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">推荐</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.106-.608.106-.93 0-2.83-2.27-5.1-5-5.1s-5 2.27-5 5.1c0 .322.036.633.106.93H5.5a4.5 4.5 0 100 1h9a4.5 4.5 0 100-1h-.085z"></path>
                    </svg>
                    <span>876 次练习</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">系统设计面试</h3>
                <p class="text-gray-600 mb-4">从分布式系统到微服务架构，全面覆盖系统设计面试的核心概念和常见问题。</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">分布式系统</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">缓存</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">数据库</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">微服务</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img src="https://picsum.photos/id/1006/100/100" alt="专家头像" class="w-8 h-8 rounded-full">
                    <span class="ml-2 text-sm text-gray-600">由资深架构师整理</span>
                  </div>
                  <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">开始练习</button>
                </div>
              </div>
            </div>
  
            <!-- 题库卡片 3 -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">新课</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.106-.608.106-.93 0-2.83-2.27-5.1-5-5.1s-5 2.27-5 5.1c0 .322.036.633.106.93H5.5a4.5 4.5 0 100 1h9a4.5 4.5 0 100-1h-.085z"></path>
                    </svg>
                    <span>543 次练习</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">行为面试准备</h3>
                <p class="text-gray-600 mb-4">掌握STAR法则，学会清晰、有逻辑地回答行为面试问题，展现你的软技能。</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">STAR法则</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">团队合作</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">领导力</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">问题解决</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img src="https://picsum.photos/id/1007/100/100" alt="专家头像" class="w-8 h-8 rounded-full">
                    <span class="ml-2 text-sm text-gray-600">由HR专家整理</span>
                  </div>
                  <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">开始练习</button>
                </div>
              </div>
            </div>
          </div>
  
          <div class="text-center mt-12">
            <button class="px-8 py-3 rounded-lg bg-white text-blue-600 font-medium border border-blue-300 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
              查看更多题库 <svg class="w-4 h-4 ml-1 inline-block" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
  
      <!-- 学习路径展示区 -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800">个性化学习路径</h2>
            <p class="mt-4 text-gray-600 max-w-2xl mx-auto">根据你的目标职位和经验水平，定制专属学习计划</p>
          </div>
  
          <div class="relative">
            <!-- 路径时间线 -->
            <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 rounded"></div>
  
            <!-- 步骤 1 -->
            <div class="flex flex-col md:flex-row items-center mb-16 relative">
              <div class="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                <h3 class="text-xl font-bold text-gray-800 mb-3">评估你的当前水平</h3>
                <p class="text-gray-600">完成我们的基础评估测试，了解你的优势和需要改进的领域，为你制定个性化学习计划。</p>
                <div class="mt-4 inline-block md:hidden">
                  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">1</span>
                </div>
              </div>
              <div class="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10">1</div>
              <div class="md:w-1/2 md:pl-12 order-1 md:order-2">
                <div class="bg-gray-50 rounded-xl p-6 shadow-md">
                  <img src="https://picsum.photos/id/180/600/400" alt="技能评估" class="w-full h-auto rounded-lg mb-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium text-gray-800">技术能力评估</h4>
                      <p class="text-sm text-gray-500">约30分钟，5个领域</p>
                    </div>
                    <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">开始评估</button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- 步骤 2 -->
            <div class="flex flex-col md:flex-row items-center mb-16 relative">
              <div class="md:w-1/2 md:pr-12">
                <div class="bg-gray-50 rounded-xl p-6 shadow-md">
                  <img src="https://picsum.photos/id/20/600/400" alt="学习计划" class="w-full h-auto rounded-lg mb-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium text-gray-800">个性化学习计划</h4>
                      <p class="text-sm text-gray-500">基于你的目标定制</p>
                    </div>
                    <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">查看计划</button>
                  </div>
                </div>
              </div>
              <div class="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10">2</div>
              <div class="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                <h3 class="text-xl font-bold text-gray-800 mb-3">制定学习计划</h3>
                <p class="text-gray-600">根据你的评估结果和目标职位，我们将为你制定详细的学习计划，包括推荐的学习资源和练习题目。</p>
                <div class="mt-4 inline-block md:hidden">
                  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">2</span>
                </div>
              </div>
            </div>
  
            <!-- 步骤 3 -->
            <div class="flex flex-col md:flex-row items-center relative">
              <div class="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                <h3 class="text-xl font-bold text-gray-800 mb-3">系统学习与练习</h3>
                <p class="text-gray-600">按照学习计划，系统地学习各个知识点，并通过练习巩固所学内容，逐步提升你的面试能力。</p>
                <div class="mt-4 inline-block md:hidden">
                  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">3</span>
                </div>
              </div>
              <div class="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10">3</div>
              <div class="md:w-1/2 md:pl-12 order-1 md:order-2">
                <div class="bg-gray-50 rounded-xl p-6 shadow-md">
                  <img src="https://picsum.photos/id/24/600/400" alt="学习与练习" class="w-full h-auto rounded-lg mb-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium text-gray-800">学习路径</h4>
                      <p class="text-sm text-gray-500">结构化学习内容</p>
                    </div>
                    <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">开始学习</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 用户评价区 -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800">用户的声音</h2>
            <p class="mt-4 text-gray-600 max-w-2xl mx-auto">听听他们如何通过我们的平台成功通过面试</p>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- 评价卡片 1 -->
            <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div class="flex items-center mb-4">
                <img src="https://picsum.photos/id/1027/100/100" alt="用户头像" class="w-12 h-12 rounded-full">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">张明</h4>
                  <p class="text-sm text-gray-500">软件工程师 @ 字节跳动</p>
                </div>
              </div>
              <div class="text-yellow-400 mb-4">
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p class="text-gray-600 italic">"通过这个平台的系统学习和模拟面试，我成功拿到了字节跳动的offer。题库非常全面，模拟面试的反馈也很有价值，帮我发现了很多平时忽略的问题。"</p>
            </div>
  
            <!-- 评价卡片 2 -->
            <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div class="flex items-center mb-4">
                <img src="https://picsum.photos/id/1012/100/100" alt="用户头像" class="w-12 h-12 rounded-full">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">李婷</h4>
                  <p class="text-sm text-gray-500">产品经理 @ 腾讯</p>
                </div>
              </div>
              <div class="text-yellow-400 mb-4">
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p class="text-gray-600 italic">"作为一名产品经理，我一直在寻找一个专注于面试准备的平台。这里的行为面试题库和STAR法则指导非常实用，帮助我在腾讯的面试中表现出色。"</p>
            </div>
  
            <!-- 评价卡片 3 -->
            <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div class="flex items-center mb-4">
                <img src="https://picsum.photos/id/1025/100/100" alt="用户头像" class="w-12 h-12 rounded-full">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">王浩</h4>
                  <p class="text-sm text-gray-500">前端开发 @ 阿里巴巴</p>
                </div>
              </div>
              <div class="text-yellow-400 mb-4">
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p class="text-gray-600 italic">"作为一名前端开发者，我特别喜欢这里的编码面试模拟功能。能够在真实的编码环境中练习，并获得即时反馈，这对我的面试准备帮助很大。"</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 注册区 -->
      <section class="py-20 bg-blue-600 relative overflow-hidden" v-if="false">
        <div class="absolute inset-0 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0">
            <path fill="#FFFFFF" d="M40.8,-73.2C52.4,-66.8,62.7,-55.9,70.2,-43.4C77.7,-30.9,82.4,-16.8,82.2,-1.6C82,-13.6,76.9,-27.2,68.7,-38.7C60.5,-50.2,49.3,-59.6,37.7,-66.2C26.1,-72.8,14.1,-76.6,-0.1,-78.3C-14.3,-80,-28.7,-79.6,-40.2,-72.7C-51.7,-65.8,-60.3,-52.4,-67.4,-38.1C-74.4,-23.8,-79.9,-9.6,-79.5,4.7C-79.1,19,-72.8,32.5,-64.1,42.6C-55.4,52.7,-44.3,59.3,-32.3,65.1C-20.3,70.9,-7.4,75.9,4.4,79.3C16.2,82.7,26.8,84.5,38.3,80.7C49.8,76.9,62.2,67.5,70.2,56.1C78.2,44.7,81.8,31.3,83.6,17.9C85.4,4.5,85.3,-9.9,81.5,-23.1C77.7,-36.3,69.2,-48.3,58.5,-56.9C47.8,-65.5,34.9,-70.7,21.2,-75.4C7.5,-80.1,-7.4,-84.3,-21.6,-84.1C-35.8,-83.9,-49.3,-80.2,-59.9,-72.4C-70.5,-64.6,-78.1,-52.8,-82.6,-39.8C-87.1,-26.8,-88.5,-12.6,-86.9,-0.1C-85.3,12.4,-79.8,24.8,-71.7,35.6C-63.6,46.4,-52.9,55.6,-40.8,61.9C-28.7,68.2,-14.3,71.7,-0.3,73.3C13.7,74.9,27.4,74.5,40.8,73.2Z" transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute bottom-0 right-0">
            <path fill="#FFFFFF" d="M38.9,-71.6C49.5,-66.2,59.4,-57.2,66.2,-46.4C73,-35.6,76.7,-23.1,79.5,-10.2C86.4C73,-35.6,76.7,-23.1,79.5,-10.2C82.3,2.7,84.2,15.9,80.9,27.7C77.6,39.5,69.1,49.9,58.8,57.2C48.5,64.5,36.3,68.8,24.3,72.4C12.3,76,-0.6,78.9,-13.4,78.7C-26.2,78.5,-38.9,75.2,-50.3,67.9C-61.7,60.6,-71.8,49.3,-78.7,36.9C-85.6,24.5,-89.3,11.2,-89.4,-2.8C-89.5,-16.8,-86,-31.6,-78.7,-42.9C-71.4,-54.2,-60.3,-62,-47.9,-67.2C-35.5,-72.4,-21.8,-75,-8.3,-76.2C5.2,-77.4,10.4,-77.2,24.3,-71.6C38.2,-66,59.8,-55,71.3,-41.7C82.8,-28.4,84.3,-13.8,84.1,0.9C83.9,15.6,82,30.3,76.2,41.6C70.4,52.9,60.8,60.8,49.4,66.5C38,72.2,24.8,75.7,11.3,77.2C-2.2,78.7,-15.5,78.1,-28.3,74.5C-41.1,70.9,-53.4,64.3,-63.3,54.8C-73.2,45.3,-80.7,32.9,-83.9,19.8C-87.1,6.7,-86,0.9,-82.8,-12.1C-79.6,-25.1,-74.3,-37.3,-66.3,-47.6C-58.3,-57.9,-47.6,-66.3,-35.8,-71.3C-24,-76.3,-12,-77.9,-0.2,-77.7C11.6,-77.5,23.2,-75.5,38.9,-71.6Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white mb-6">准备好开始你的面试准备之旅了吗？</h2>
            <p class="text-white/90 text-lg mb-10">加入我们，获取专业的面试准备资源，提高你的面试成功率</p>
            <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input type="email" placeholder="输入你的邮箱" class="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30">
              <button type="submit" class="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                立即注册
              </button>
            </form>
            <p class="text-white/70 text-sm mt-4">已有账号？<a href="#" class="text-white hover:underline">立即登录</a></p>
          </div>
        </div>
      </section>
  
      <!-- 页脚 -->
     
    </div>
    <FooterBar />
  </template>
  
  <script setup>
  import HeaderBar from '../components/HeaderBar.vue';
  import FooterBar from '../components/FooterBar.vue';
  // 页面逻辑可以在这里添加
  </script>
  
  <style scoped>
  /* 自定义样式可以在这里添加 */
  </style>
      