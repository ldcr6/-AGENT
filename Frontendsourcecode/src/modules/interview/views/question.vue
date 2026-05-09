<template>
<div class="page-container">
		<ParticlesEffect />
  <div class="min-h-screen bg-gray-50 text-gray-800 font-inter">
    <!-- 导航栏 -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300" :class="scrollY > 50 ? 'shadow-md' : ''">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <i class="fas fa-book-open text-xl"></i>
            </div>
            <h1 class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">面经秘境</h1>
          </div>
          
          <!-- 主导航 - 桌面端 -->
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#sharing" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">面经分享</a>
            <a href="#company-reviews" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">公司点评</a>
            <a href="#qa" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">互助问答</a>
            <a href="#highlights" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">精华聚合</a>
          </nav>
          
          <!-- 用户操作区 -->
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <input type="text" placeholder="搜索公司、职位或面经..." class="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none w-48 md:w-64 transition-all">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <button class="hidden md:block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
              分享面经
            </button>
            <button class="md:hidden text-gray-700">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 顶部介绍区域 -->
    <section class="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24 overflow-hidden">
      <div class="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div class="w-full h-full bg-[url('https://picsum.photos/id/1060/800/1200')] bg-cover bg-center"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-900 leading-tight mb-4 animate-fade-in">
            面试经验共享社区，<br>让求职之路更清晰
          </h2>
          <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            来自真实求职者的面试经历、公司点评和问答互助，助你轻松应对职场挑战
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button class="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-xl">
              分享我的面经
            </button>
            <button class="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-full shadow-md hover:bg-blue-50 transition-all transform hover:-translate-y-1">
              浏览面经库
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 面经分享区域 -->
    <section id="sharing" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 mb-4">真实面经分享</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">来自各行各业求职者的真实面试经历，帮你提前了解面试流程和问题</p>
        </div>
        
        <!-- 筛选标签 -->
        <div class="flex flex-wrap justify-center gap-2 mb-10">
          <button class="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">全部</button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">互联网</button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">金融</button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">科技</button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">外企</button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">国企</button>
        </div>
        
        <!-- 面经卡片网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 面经卡片1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div class="p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <i class="fas fa-building"></i>
                </div>
                <h3 class="font-semibold text-lg group-hover:text-blue-600 transition-colors">字节跳动 - 后端开发</h3>
              </div>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="flex items-center mr-4"><i class="fas fa-clock mr-1"></i> 3轮技术面</span>
                <span class="flex items-center"><i class="fas fa-calendar-alt mr-1"></i> 2025-06-15</span>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-3">分享了字节跳动后端开发岗位的三面经历，包括算法题、分布式系统设计和项目经验提问，面试官很专业，问题有深度但也给了提示空间...</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <img src="https://picsum.photos/id/64/40/40" alt="用户头像" class="w-6 h-6 rounded-full mr-2">
                  <span>匿名用户</span>
                </div>
                <div class="flex items-center space-x-4 text-sm">
                  <span class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"><i class="fas fa-thumbs-up mr-1"></i> 128</span>
                  <span class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"><i class="fas fa-comment mr-1"></i> 36</span>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-6 py-3">
              <div class="flex flex-wrap gap-2">
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">互联网</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">后端开发</span>
                <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">算法题</span>
              </div>
            </div>
          </div>
          
          <!-- 面经卡片2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div class="p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <i class="fas fa-building"></i>
                </div>
                <h3 class="font-semibold text-lg group-hover:text-blue-600 transition-colors">腾讯 - 产品经理</h3>
              </div>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="flex items-center mr-4"><i class="fas fa-clock mr-1"></i> 2轮业务面+1轮HR面</span>
                <span class="flex items-center"><i class="fas fa-calendar-alt mr-1"></i> 2025-06-10</span>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-3">详细记录了腾讯产品经理岗位的面试过程，包括用户画像分析、竞品分析和实际场景问题，面试官很注重逻辑思维和产品sense...</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <img src="https://picsum.photos/id/91/40/40" alt="用户头像" class="w-6 h-6 rounded-full mr-2">
                  <span>李明</span>
                </div>
                <div class="flex items-center space-x-4 text-sm">
                  <span class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"><i class="fas fa-thumbs-up mr-1"></i> 96</span>
                  <span class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"><i class="fas fa-comment mr-1"></i> 24</span>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-6 py-3">
              <div class="flex flex-wrap gap-2">
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">互联网</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">产品经理</span>
                <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">竞品分析</span>
              </div>
            </div>
          </div>
          
          <!-- 面经卡片3 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div class="p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <i class="fas fa-building"></i>
                </div>
                <h3 class="font-semibold text-lg group-hover:text-blue-600 transition-colors">阿里巴巴 - 数据分析师</h3>
              </div>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="flex items-center mr-4"><i class="fas fa-clock mr-1"></i> 4轮面试</span>
                <span class="flex items-center"><i class="fas fa-calendar-alt mr-1"></i> 2025-06-05</span>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-3">分享了阿里巴巴数据分析师岗位的面试经历，包括SQL题、AB测试设计和业务理解问题，强调了数据驱动思维的重要性...</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <img src="https://picsum.photos/id/26/40/40" alt="用户头像" class="w-6 h-6 rounded-full mr-2">
                  <span>匿名用户</span>
                </div>
                <div class="flex items-center space-x-4 text-sm">
                  <span class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"><i class="fas fa-thumbs-up mr-1"></i> 156</span>
                  <span class="flex items-center text-gray-500 hover:text-blue-500 transition-colors"><i class="fas fa-comment mr-1"></i> 42</span>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-6 py-3">
              <div class="flex flex-wrap gap-2">
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">互联网</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">数据分析师</span>
                <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">AB测试</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <button class="px-6 py-3 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            查看更多面经 <i class="fas fa-chevron-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- 公司/职位点评区域 -->
    <section id="company-reviews" class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 mb-4">公司与职位点评</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">了解真实的公司文化、面试难度和面试官风格，助你做出更明智的职业选择</p>
        </div>
        
        <!-- 公司点评卡片 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 公司点评1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                  <img src="https://picsum.photos/id/237/60/60" alt="公司logo" class="w-12 h-12 rounded-lg mr-4">
                  <div>
                    <h3 class="font-bold text-xl text-gray-900">字节跳动</h3>
                    <div class="flex items-center text-sm text-gray-500">
                      <i class="fas fa-map-marker-alt mr-1"></i>
                      <span>北京·互联网</span>
                    </div>
                  </div>
                </div>
                <div class="text-yellow-500">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                  <span class="ml-1 text-gray-700 font-medium">4.5</span>
                </div>
              </div>
              
              <!-- 评分指标 -->
              <div class="mb-6">
                <h4 class="font-medium text-gray-800 mb-4">评分指标</h4>
                <div class="space-y-3">
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>面试难度</span>
                      <span>4.0</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>面试官专业度</span>
                      <span>4.5</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>公司文化</span>
                      <span>3.8</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 76%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>职业发展</span>
                      <span>4.2</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 84%"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 点评摘要 -->
              <div>
                <h4 class="font-medium text-gray-800 mb-3">点评摘要</h4>
                <p class="text-gray-600 mb-4">面试流程规范，面试官专业度高，问题具有挑战性，注重算法和系统设计能力。公司文化年轻化，节奏较快，适合喜欢挑战的求职者。</p>
                <a href="#" class="text-blue-600 font-medium hover:underline">查看全部328条点评 <i class="fas fa-chevron-right ml-1"></i></a>
              </div>
            </div>
          </div>
          
          <!-- 公司点评2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                  <img src="https://picsum.photos/id/239/60/60" alt="公司logo" class="w-12 h-12 rounded-lg mr-4">
                  <div>
                    <h3 class="font-bold text-xl text-gray-900">腾讯</h3>
                    <div class="flex items-center text-sm text-gray-500">
                      <i class="fas fa-map-marker-alt mr-1"></i>
                      <span>深圳·互联网</span>
                    </div>
                  </div>
                </div>
                <div class="text-yellow-500">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <span class="ml-1 text-gray-700 font-medium">4.7</span>
                </div>
              </div>
              
              <!-- 评分指标 -->
              <div class="mb-6">
                <h4 class="font-medium text-gray-800 mb-4">评分指标</h4>
                <div class="space-y-3">
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>面试难度</span>
                      <span>4.2</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 84%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>面试官专业度</span>
                      <span>4.8</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 96%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>公司文化</span>
                      <span>4.3</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 86%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>职业发展</span>
                      <span>4.5</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 点评摘要 -->
              <div>
                <h4 class="font-medium text-gray-800 mb-3">点评摘要</h4>
                <p class="text-gray-600 mb-4">面试流程较长但规范，面试官注重项目经验和实际问题解决能力，问题具有业务场景导向。公司文化开放，福利完善，适合长期发展。</p>
                <a href="#" class="text-blue-600 font-medium hover:underline">查看全部295条点评 <i class="fas fa-chevron-right ml-1"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 职位点评 -->
        <div class="mt-16">
          <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">热门职位点评</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- 职位卡片1 -->
            <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <i class="fas fa-code"></i>
                </div>
                <h4 class="font-semibold text-lg">前端开发</h4>
              </div>
              <div class="text-yellow-500 text-sm mb-3">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="ml-1 text-gray-700">(126条点评)</span>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">主流框架使用、性能优化和浏览器原理是面试重点，部分公司会考察算法基础...</p>
              <a href="#" class="text-blue-600 text-sm font-medium hover:underline">查看点评 <i class="fas fa-chevron-right ml-1"></i></a>
            </div>
            
            <!-- 职位卡片2 -->
            <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h4 class="font-semibold text-lg">数据分析师</h4>
              </div>
              <div class="text-yellow-500 text-sm mb-3">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <span class="ml-1 text-gray-700">(98条点评)</span>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">SQL、Excel和数据分析工具是基础，业务理解和数据可视化能力越来越受重视...</p>
              <a href="#" class="text-blue-600 text-sm font-medium hover:underline">查看点评 <i class="fas fa-chevron-right ml-1"></i></a>
            </div>
            
            <!-- 职位卡片3 -->
            <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <i class="fas fa-cubes"></i>
                </div>
                <h4 class="font-semibold text-lg">产品经理</h4>
              </div>
              <div class="text-yellow-500 text-sm mb-3">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="ml-1 text-gray-700">(152条点评)</span>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">需求分析、竞品分析和产品设计是核心，部分公司会考察实际案例解决能力...</p>
              <a href="#" class="text-blue-600 text-sm font-medium hover:underline">查看点评 <i class="fas fa-chevron-right ml-1"></i></a>
            </div>
            
            <!-- 职位卡片4 -->
            <div class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h4 class="font-semibold text-lg">测试工程师</h4>
              </div>
              <div class="text-yellow-500 text-sm mb-3">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <i class="far fa-star"></i>
                <span class="ml-1 text-gray-700">(76条点评)</span>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">测试用例设计、自动化测试和性能测试是重点，部分公司要求编程能力...</p>
              <a href="#" class="text-blue-600 text-sm font-medium hover:underline">查看点评 <i class="fas fa-chevron-right ml-1"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 互助问答区域 -->
    <section id="qa" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 mb-4">互助问答社区</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">有面试相关问题？在这里提问，让有经验的前辈为你解答</p>
        </div>
        
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 问答列表 -->
          <div class="w-full lg:w-2/3">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
              <div class="p-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <h3 class="font-bold text-xl text-gray-900">热门面试问题</h3>
                  <a href="#" class="text-blue-600 font-medium hover:underline">查看全部问题</a>
                </div>
              </div>
              
              <!-- 问题列表 -->
              <div class="divide-y divide-gray-100">
                <!-- 问题1 -->
                <div class="p-6 hover:bg-gray-50 transition-colors">
                  <div class="flex items-start mb-4">
                    <img src="https://picsum.photos/id/64/40/40" alt="用户头像" class="w-10 h-10 rounded-full mr-4">
                    <div class="flex-1">
                      <h4 class="font-semibold text-lg mb-2"><a href="#" class="hover:text-blue-600 transition-colors">如何应对技术面试中的算法题？有哪些高效准备方法？</a></h4>
                      <p class="text-gray-600 mb-4 line-clamp-2">最近在准备技术面试，算法题一直是我的弱项，请问大家有没有高效的准备方法？哪些算法类型是面试中最常考的？</p>
                      <div class="flex items-center text-sm text-gray-500">
                        <span class="flex items-center mr-4"><i class="fas fa-user mr-1"></i> 王同学</span>
                        <span class="flex items-center mr-4"><i class="fas fa-clock mr-1"></i> 2天前</span>
                        <span class="flex items-center"><i class="fas fa-comment mr-1"></i> 18条回复</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 最佳回答 -->
                  <div class="pl-14 mt-4 pt-4 border-l-2 border-blue-200">
                    <div class="flex items-start">
                      <img src="https://picsum.photos/id/91/40/40" alt="回答者头像" class="w-8 h-8 rounded-full mr-3 mt-1">
                      <div>
                        <p class="text-gray-600 mb-2">建议从高频题型入手，比如链表、二叉树、动态规划等，LeetCode上的热题100是很好的起点。另外，多总结解题思路，理解时间和空间复杂度...</p>
                        <div class="text-sm text-gray-500">
                          <span class="font-medium text-blue-600">李明</span> • 资深后端开发 • 3天前
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 问题2 -->
                <div class="p-6 hover:bg-gray-50 transition-colors">
                  <div class="flex items-start mb-4">
                    <img src="https://picsum.photos/id/26/40/40" alt="用户头像" class="w-10 h-10 rounded-full mr-4">
                    <div class="flex-1">
                      <h4 class="font-semibold text-lg mb-2"><a href="#" class="hover:text-blue-600 transition-colors">面试中被问到"为什么选择我们公司"，该如何回答比较得体？</a></h4>
                      <p class="text-gray-600 mb-4 line-clamp-2">每次面试到最后，面试官都会问这个问题，我每次回答都觉得很生硬，请问大家有没有什么好的回答思路？需要提前做哪些准备？</p>
                      <div class="flex items-center text-sm text-gray-500">
                        <span class="flex items-center mr-4"><i class="fas fa-user mr-1"></i> 张同学</span>
                        <span class="flex items-center mr-4"><i class="fas fa-clock mr-1"></i> 3天前</span>
                        <span class="flex items-center"><i class="fas fa-comment mr-1"></i> 24条回复</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 最佳回答 -->
                  <div class="pl-14 mt-4 pt-4 border-l-2 border-blue-200">
                    <div class="flex items-start">
                      <img src="https://picsum.photos/id/433/40/40" alt="回答者头像" class="w-8 h-8 rounded-full mr-3 mt-1">
                      <div>
                        <p class="text-gray-600 mb-2">这个问题主要考察你对公司的了解和求职动机，建议从公司业务、发展前景、文化价值观和个人职业规划的契合点来回答，避免泛泛而谈...</p>
                        <div class="text-sm text-gray-500">
                          <span class="font-medium text-blue-600">王HR</span> • 人力资源经理 • 2天前
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 问题3 -->
                <div class="p-6 hover:bg-gray-50 transition-colors">
                  <div class="flex items-start mb-4">
                    <img src="https://picsum.photos/id/177/40/40" alt="用户头像" class="w-10 h-10 rounded-full mr-4">
                    <div class="flex-1">
                      <h4 class="font-semibold text-lg mb-2"><a href="#" class="hover:text-blue-600 transition-colors">互联网公司的技术面试，项目经验和算法能力哪个更重要？</a></h4>
                      <p class="text-gray-600 mb-4 line-clamp-2">目前在准备互联网公司的技术岗位面试，我的项目经验比较丰富，但算法能力一般，请问面试官更看重哪方面？需要如何平衡准备？</p>
                      <div class="flex items-center text-sm text-gray-500">
                        <span class="flex items-center mr-4"><i class="fas fa-user mr-1"></i> 刘同学</span>
                        <span class="flex items-center mr-4"><i class="fas fa-clock mr-1"></i> 5天前</span>
                        <span class="flex items-center"><i class="fas fa-comment mr-1"></i> 15条回复</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 最佳回答 -->
                  <div class="pl-14 mt-4 pt-4 border-l-2 border-blue-200">
                    <div class="flex items-start">
                      <img src="https://picsum.photos/id/211/40/40" alt="回答者头像" class="w-8 h-8 rounded-full mr-3 mt-1">
                      <div>
                        <p class="text-gray-600 mb-2">两者都很重要，但不同公司和岗位侧重点不同。初级岗位可能更看重算法基础，中高级岗位则更看重项目经验和解决实际问题的能力...</p>
                        <div class="text-sm text-gray-500">
                          <span class="font-medium text-blue-600">陈工</span> • 技术主管 • 4天前
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 侧边栏 - 提问框和热门标签 -->
          <div class="w-full lg:w-1/3">
            <!-- 提问框 -->
            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 class="font-bold text-lg text-gray-900 mb-4">有问题要问？</h3>
              <p class="text-gray-600 mb-4">在社区提问，让有经验的前辈为你解答</p>
              <button class="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                <i class="fas fa-pencil-alt mr-2"></i> 我要提问
              </button>
            </div>
            
            <!-- 热门标签 -->
            <div class="bg-white rounded-xl shadow-md p-6">
              <h3 class="font-bold text-lg text-gray-900 mb-4">热门面试标签</h3>
              <div class="flex flex-wrap gap-2">
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#算法题</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#自我介绍</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#项目经验</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#薪资谈判</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#HR面</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#技术面</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#面试技巧</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#跳槽建议</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#简历优化</a>
                <a href="#" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">#背调</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精华聚合区域 -->
    <section id="highlights" class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 mb-4">精华内容聚合</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">精选热门面经、优质问答和高赞点评，助你快速获取关键信息</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 精华卡片1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden group">
            <div class="relative h-48">
              <img src="https://picsum.photos/id/180/600/400" alt="精华内容" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">热门面经</span>
                <h3 class="font-bold text-lg mt-2">谷歌软件工程师面试全记录：从OA到onsite</h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-4 line-clamp-3">详细记录了谷歌软件工程师岗位的面试全过程，包括在线测评、电话面试和现场面试，分享了算法题、系统设计题和行为面试问题...</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <img src="https://picsum.photos/id/433/40/40" alt="用户头像" class="w-6 h-6 rounded-full mr-2">
                  <span>匿名用户</span>
                </div>
                <div class="flex items-center space-x-3 text-sm">
                  <span class="flex items-center text-gray-500"><i class="fas fa-eye mr-1"></i> 2.4k</span>
                  <span class="flex items-center text-gray-500"><i class="fas fa-thumbs-up mr-1"></i> 328</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 精华卡片2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden group">
            <div class="relative h-48">
              <img src="https://picsum.photos/id/239/600/400" alt="精华内容" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full">优质问答</span>
                <h3 class="font-bold text-lg mt-2">应届生如何准备互联网大厂的技术面试？</h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-4 line-clamp-3">来自多位大厂面试官和资深工程师的经验分享，涵盖简历准备、技术复习、算法刷题、项目梳理和面试技巧等多个方面...</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <img src="https://picsum.photos/id/91/40/40" alt="用户头像" class="w-6 h-6 rounded-full mr-2">
                  <span>李工</span>
                </div>
                <div class="flex items-center space-x-3 text-sm">
                  <span class="flex items-center text-gray-500"><i class="fas fa-eye mr-1"></i> 3.1k</span>
                  <span class="flex items-center text-gray-500"><i class="fas fa-thumbs-up mr-1"></i> 412</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 精华卡片3 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden group">
            <div class="relative h-48">
              <img src="https://picsum.photos/id/119/600/400" alt="精华内容" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <span class="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">高赞点评</span>
                <h3 class="font-bold text-lg mt-2">字节跳动面试体验：流程、难度与面试官风格</h3>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-4 line-clamp-3">汇总了多位求职者的字节跳动面试点评，详细分析了不同部门的面试流程、题目难度和面试官风格，为准备面试的同学提供参考...</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <img src="https://picsum.photos/id/26/40/40" alt="用户头像" class="w-6 h-6 rounded-full mr-2">
                  <span>匿名用户</span>
                </div>
                <div class="flex items-center space-x-3 text-sm">
                  <span class="flex items-center text-gray-500"><i class="fas fa-eye mr-1"></i> 1.8k</span>
                  <span class="flex items-center text-gray-500"><i class="fas fa-thumbs-up mr-1"></i> 286</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 号召性行动区域 -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-6">加入面经秘境，分享你的面试故事</h2>
        <p class="text-white/80 max-w-2xl mx-auto mb-8 text-lg">你的一次分享，可能帮助无数求职者少走弯路，更快拿到理想offer</p>
        <button class="px-8 py-4 bg-white text-blue-700 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:shadow-xl font-bold text-lg">
          立即分享我的面经
        </button>
      </div>
    </section>

    <!-- 页脚 -->
   <PageFooter />
  </div>
  </div>
</template>
<script>

import { ref, onMounted, onUnmounted } from 'vue';
import PageFooter from '../../../components/PageFooter.vue';
import ParticlesEffect from '../../question/views/ParticlesEffect.vue';

export default {
	components: {
		ParticlesEffect,
		PageFooter,
	},
  setup() {
    // 处理滚动效果
    const scrollY = ref(0);
    const handleScroll = () => {
      scrollY.value = window.scrollY;
    };

    // 元素进入视口动画
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      observeElements();
      
      // 初始化时添加滚动值
      handleScroll();
    });

    // 组件卸载时移除事件监听
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // 返回所有需要在模板中使用的响应式变量
    return {
      scrollY
    };
  }
};
</script>

<style scoped>
/* 基础动画 */
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>