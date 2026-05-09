
// 模拟面试题数据库
const QUESTION_DATABASE = [
    {
        id: 1,
        title: "实现一个防抖函数",
        content: "请实现一个防抖函数，该函数会在延迟一定时间后才执行回调，如果在延迟时间内再次调用，则重新计时。",
        difficulty: 3,
        tags: ["JavaScript", "函数式编程", "性能优化"],
        company: "bytedance",
        companyName: "字节跳动",
        updateDate: "2025-04-10",
        codeExample: `function debounce(fn, delay) {
  // 请实现此函数
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}`
    },
    {
        id: 2,
        title: "手写Promise.all实现",
        content: "实现一个Promise.all函数，接收一个Promise数组，当所有Promise都成功时返回成功结果数组，有一个失败则返回失败结果。",
        difficulty: 4,
        tags: ["JavaScript", "Promise", "异步编程"],
        company: "alibaba",
        companyName: "阿里巴巴",
        updateDate: "2025-03-15",
        codeExample: `function promiseAll(promises) {
  // 请实现此函数
}`
    },
    {
        id: 3,
        title: "实现React useState Hook",
        content: "请实现一个简化版的React useState Hook，需要支持基本的状态更新功能。",
        difficulty: 4,
        tags: ["React", "Hooks", "状态管理"],
        company: "tencent",
        companyName: "腾讯",
        updateDate: "2025-04-20",
        codeExample: `function useState(initialValue) {
  // 请实现此函数
}`
    },
    {
        id: 4,
        title: "二叉树的最大深度",
        content: "编写一个函数来计算二叉树的最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。",
        difficulty: 2,
        tags: ["算法", "二叉树", "递归"],
        company: "google",
        companyName: "Google",
        updateDate: "2025-02-28",
        codeExample: `function maxDepth(root) {
  // 请实现此函数
}`
    },
    {
        id: 5,
        title: "Vue响应式原理实现",
        content: "请简要实现Vue 2.x中的响应式系统核心原理，包括Observer、Dep和Watcher三个部分。",
        difficulty: 5,
        tags: ["Vue", "响应式编程", "设计模式"],
        company: "meituan",
        companyName: "美团",
        updateDate: "2025-03-22",
        codeExample: `class Observer {
  // 请实现此类
}

class Dep {
  // 请实现此类
}

class Watcher {
  // 请实现此类
}`
    },
    {
        id: 6,
        title: "实现一个简易版的Redux",
        content: "编写一个极简版的Redux，实现createStore函数，支持getState、dispatch和subscribe方法。",
        difficulty: 4,
        tags: ["React", "Redux", "状态管理"],
        company: "jd",
        companyName: "京东",
        updateDate: "2025-01-15",
        codeExample: `function createStore(reducer) {
  // 请实现此函数
}`
    },
    {
        id: 7,
        title: "实现快速排序算法",
        content: "请实现快速排序算法，并分析其时间复杂度和空间复杂度。",
        difficulty: 3,
        tags: ["算法", "排序", "分治"],
        company: "baidu",
        companyName: "百度",
        updateDate: "2025-04-05",
        codeExample: `function quickSort(arr) {
  // 请实现此函数
}`
    },
    {
        id: 8,
        title: "设计LRU缓存结构",
        content: "请设计并实现一个LRU(最近最少使用)缓存机制，要求在O(1)时间内完成get和put操作。",
        difficulty: 4,
        tags: ["算法", "数据结构", "缓存"],
        company: "microsoft",
        companyName: "微软",
        updateDate: "2025-02-10",
        codeExample: `class LRUCache {
  // 请实现此类
}`
    },
    {
        id: 9,
        title: "深拷贝函数实现",
        content: "实现一个深拷贝函数，要求可以处理对象、数组、函数以及循环引用等场景。",
        difficulty: 3,
        tags: ["JavaScript", "对象处理", "递归"],
        company: "bytedance",
        companyName: "字节跳动",
        updateDate: "2025-03-01",
        codeExample: `function deepClone(obj) {
  // 请实现此函数
}`
    },
    {
        id: 10,
        title: "实现简单的虚拟DOM和diff算法",
        content: "请实现一个简化版的虚拟DOM和diff算法，能够计算出两棵虚拟DOM树之间的最小变化。",
        difficulty: 5,
        tags: ["JavaScript", "虚拟DOM", "框架原理"],
        company: "alibaba",
        companyName: "阿里巴巴",
        updateDate: "2025-04-15",
        codeExample: `function createElement(type, props, ...children) {
  // 请实现此函数
}

function diff(oldVNode, newVNode) {
  // 请实现此函数
}`
    },
    {
        id: 11,
        title: "实现事件委托机制",
        content: "请实现一个事件委托函数，可以为目标元素的所有子元素代理指定的事件。",
        difficulty: 2,
        tags: ["JavaScript", "DOM", "事件处理"],
        company: "tencent",
        companyName: "腾讯",
        updateDate: "2025-02-20",
        codeExample: `function delegate(parent, eventType, selector, fn) {
  // 请实现此函数
}`
    },
    {
        id: 12,
        title: "手写JSONP实现跨域请求",
        content: "请实现一个JSONP函数，用于解决跨域请求问题。",
        difficulty: 2,
        tags: ["JavaScript", "网络", "跨域"],
        company: "jd",
        companyName: "京东",
        updateDate: "2025-01-25",
        codeExample: `function jsonp(url, callback) {
  // 请实现此函数
}`
    },
    {
        id: 13,
        title: "编写一个节流函数",
        content: "实现一个节流函数，确保函数在指定时间内最多执行一次。",
        difficulty: 3,
        tags: ["JavaScript", "性能优化", "函数式编程"],
        company: "bytedance",
        companyName: "字节跳动",
        updateDate: "2025-02-05",
        codeExample: `function throttle(fn, interval) {
  // 请实现此函数
}`
    },
    {
        id: 14,
        title: "实现一个发布订阅模式",
        content: "请实现一个事件发布订阅系统，支持on, emit, off和once方法。",
        difficulty: 3,
        tags: ["JavaScript", "设计模式", "事件系统"],
        company: "baidu",
        companyName: "百度",
        updateDate: "2025-03-12",
        codeExample: `class EventEmitter {
  // 请实现此类
}`
    },
    {
        id: 15,
        title: "实现一个异步任务调度器",
        content: "实现一个异步任务调度器，控制同时运行的任务数量，超出数量的任务需要等待之前的任务完成。",
        difficulty: 4,
        tags: ["JavaScript", "异步编程", "任务调度"],
        company: "alibaba",
        companyName: "阿里巴巴",
        updateDate: "2025-01-10",
        codeExample: `class Scheduler {
  // 请实现此类
}`
    }
];

// 定义公司名称映射
const COMPANY_MAP = {
    "alibaba": "阿里巴巴",
    "tencent": "腾讯",
    "bytedance": "字节跳动",
    "baidu": "百度",
    "meituan": "美团",
    "jd": "京东",
    "google": "Google",
    "microsoft": "微软",
    "amazon": "亚马逊"
};

// 搜索结果每页显示数量
const RESULTS_PER_PAGE = 6;

// 难度等级文本映射
const DIFFICULTY_TEXT = {
    1: { text: "入门级", className: "easy" },
    2: { text: "初级", className: "easy" },
    3: { text: "中等难度", className: "medium" },
    4: { text: "高级", className: "hard" },
    5: { text: "专家级", className: "expert" }
};

// 搜索历史最大存储数量
const MAX_HISTORY_ITEMS = 10;

// DOM元素
let elements = {};
let searchState = {
    currentPage: 1,
    totalPages: 1,
    currentResults: [],
    selectedTags: [],
    historyItems: []
};

// 初始化DOM元素引用
function initDOMElements() {
    elements = {
        searchForm: document.getElementById('searchForm'),
        keywordSearch: document.getElementById('keywordSearch'),
        difficultyRange: document.getElementById('difficultyRange'),
        difficultyValue: document.getElementById('difficultyValue'),
        tagChips: document.querySelectorAll('.tag-chip'),
        customTag: document.getElementById('customTag'),
        addCustomTag: document.getElementById('addCustomTag'),
        companySelect: document.getElementById('companySelect'),
        dateFrom: document.getElementById('dateFrom'),
        dateTo: document.getElementById('dateTo'),
        resultsContainer: document.getElementById('resultsContainer'),
        sortOrder: document.getElementById('sortOrder'),
        historyTags: document.getElementById('historyTags'),
        clearHistory: document.getElementById('clearHistory'),
        toggleAdvanced: document.getElementById('toggleAdvanced'),
        advancedOptions: document.getElementById('advancedOptions'),
        toggleIcon: document.getElementById('toggleIcon'),
        toggleText: document.getElementById('toggleText'),
        randomizeBtn: document.getElementById('randomizeBtn'),
        questionModal: document.getElementById('questionModal'),
        modalContent: document.getElementById('modalContent'),
        closeModal: document.getElementById('closeModal')
    };
}

// 初始化搜索历史
function initSearchHistory() {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
        searchState.historyItems = JSON.parse(savedHistory).slice(0, MAX_HISTORY_ITEMS);
        renderSearchHistory();
    }
}

// 保存搜索历史到localStorage
function saveSearchHistory(query) {
    if (!query || query.trim() === '') return;
    
    // 添加到历史记录前端
    searchState.historyItems = searchState.historyItems.filter(item => item !== query);
    searchState.historyItems.unshift(query);
    
    // 只保留最新的MAX_HISTORY_ITEMS条记录
    if (searchState.historyItems.length > MAX_HISTORY_ITEMS) {
        searchState.historyItems = searchState.historyItems.slice(0, MAX_HISTORY_ITEMS);
    }
    
    // 保存到localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchState.historyItems));
    
    // 更新界面
    renderSearchHistory();
}

// 渲染搜索历史
function renderSearchHistory() {
    const historyContainer = elements.historyTags;
    historyContainer.innerHTML = '';
    
    if (searchState.historyItems.length === 0) {
        historyContainer.innerHTML = '<span class="text-gray-500 text-sm italic">暂无搜索历史</span>';
        return;
    }
    
    searchState.historyItems.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span>${item}</span>
            <i class="fas fa-times remove-history"></i>
        `;
        historyItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-history')) {
                removeFromHistory(item);
            } else {
                elements.keywordSearch.value = item;
                performSearch();
            }
        });
        historyContainer.appendChild(historyItem);
    });
}

// 从历史记录中移除项目
function removeFromHistory(item) {
    searchState.historyItems = searchState.historyItems.filter(historyItem => historyItem !== item);
    localStorage.setItem('searchHistory', JSON.stringify(searchState.historyItems));
    renderSearchHistory();
}

// 清空搜索历史
function clearSearchHistory() {
    searchState.historyItems = [];
    localStorage.removeItem('searchHistory');
    renderSearchHistory();
    
    // 添加动画效果
    const container = elements.historyTags.parentElement;
    container.classList.add('animate-pulse');
    setTimeout(() => {
        container.classList.remove('animate-pulse');
    }, 500);
}

// 获取选中的标签
function getSelectedTags() {
    const activeTags = document.querySelectorAll('.tag-chip.active');
    return Array.from(activeTags).map(tag => tag.dataset.tag);
}

// 执行搜索
function performSearch() {
    const keyword = elements.keywordSearch.value.trim().toLowerCase();
    const difficulty = parseInt(elements.difficultyRange.value);
    const selectedTags = getSelectedTags();
    const company = elements.companySelect.value;
    const dateFrom = elements.dateFrom.value ? new Date(elements.dateFrom.value) : null;
    const dateTo = elements.dateTo.value ? new Date(elements.dateTo.value) : null;
    
    // 保存当前搜索关键词到历史
    if (keyword) {
        saveSearchHistory(keyword);
    }
    
    // 过滤结果
    let results = QUESTION_DATABASE.filter(question => {
        // 关键词匹配（标题、内容）
        const keywordMatch = keyword === '' || 
            question.title.toLowerCase().includes(keyword) || 
            question.content.toLowerCase().includes(keyword);
        
        // 难度匹配（小于等于所选难度）
        const difficultyMatch = question.difficulty <= difficulty;
        
        // 标签匹配（至少包含一个所选标签，如果有选择标签的话）
        const tagMatch = selectedTags.length === 0 || 
            selectedTags.some(tag => question.tags.includes(tag));
        
        // 公司匹配
        const companyMatch = company === '' || question.company === company;
        
        // 日期匹配
        let dateMatch = true;
        if (dateFrom) {
            const questionDate = new Date(question.updateDate);
            dateMatch = questionDate >= dateFrom;
        }
        if (dateTo && dateMatch) {
            const questionDate = new Date(question.updateDate);
            dateMatch = questionDate <= dateTo;
        }
        
        return keywordMatch && difficultyMatch && tagMatch && companyMatch && dateMatch;
    });
    
    // 排序结果
    const sortType = elements.sortOrder.value;
    sortResults(results, sortType);
    
    // 更新状态和显示结果
    searchState.currentResults = results;
    searchState.currentPage = 1;
    searchState.totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
    
    renderSearchResults();
    renderPagination();
    
    // 平滑滚动到结果区域
    document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // 添加结果显示动画
    const resultsHeader = document.querySelector('#searchResults h2');
    resultsHeader.classList.add('animate-pulse');
    setTimeout(() => {
        resultsHeader.classList.remove('animate-pulse');
    }, 800);
}

// 对结果进行排序
function sortResults(results, sortType) {
    switch(sortType) {
        case 'relevance':
            // 默认排序（按ID）
            results.sort((a, b) => a.id - b.id);
            break;
        case 'newest':
            // 按更新日期排序（最新的优先）
            results.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
            break;
        case 'difficulty_asc':
            // 按难度从低到高排序
            results.sort((a, b) => a.difficulty - b.difficulty);
            break;
        case 'difficulty_desc':
            // 按难度从高到低排序
            results.sort((a, b) => b.difficulty - a.difficulty);
            break;
    }
}

// 渲染搜索结果
function renderSearchResults() {
    const container = elements.resultsContainer;
    container.innerHTML = '';
    
    const startIndex = (searchState.currentPage - 1) * RESULTS_PER_PAGE;
    const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, searchState.currentResults.length);
    const currentPageResults = searchState.currentResults.slice(startIndex, endIndex);
    
    // 如果没有结果
    if (currentPageResults.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-10">
                <div class="text-5xl mb-4 opacity-50">🔍</div>
                <h3 class="text-xl font-bold text-gray-700 mb-2">未找到相关题目</h3>
                <p class="text-gray-500">尝试调整搜索条件或减少筛选项</p>
            </div>
        `;
        return;
    }
    
    // 创建结果卡片
    currentPageResults.forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.style.animationDelay = `${index * 100}ms`;
        
        // 获取难度信息
        const difficultyInfo = DIFFICULTY_TEXT[question.difficulty];
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="title">${question.title}</h3>
                <div class="difficulty-badge ${difficultyInfo.className}">${difficultyInfo.text}</div>
            </div>
            <p class="excerpt">${truncateText(question.content, 100)}</p>
            <div class="flex flex-wrap gap-1 mb-3">
                ${question.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
            </div>
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                    <i class="fas fa-building mr-1"></i>${question.companyName}
                    <span class="ml-3"><i class="far fa-calendar-alt mr-1"></i>${formatDate(question.updateDate)}</span>
                </div>
                <button class="view-details bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm transition-colors duration-200" 
                    data-id="${question.id}">
                    查看详情
                </button>
            </div>
        `;
        
        // 添加点击事件显示详情
        const viewButton = card.querySelector('.view-details');
        viewButton.addEventListener('click', () => showQuestionDetails(question));
        
        container.appendChild(card);
    });
}

// 显示问题详情模态框
function showQuestionDetails(question) {
    const modal = elements.questionModal;
    const modalContent = elements.modalContent;
    const difficultyInfo = DIFFICULTY_TEXT[question.difficulty];
    
    modalContent.innerHTML = `
        <div class="mb-6">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-2xl font-bold text-indigo-900">${question.title}</h3>
                <div class="difficulty-badge ${difficultyInfo.className}">${difficultyInfo.text}</div>
            </div>
            <p class="text-gray-700 mb-4">${question.content}</p>
            
            <h4 class="text-lg font-semibold text-gray-800 mb-2">示例代码:</h4>
            <div class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                <pre><code>${question.codeExample}</code></pre>
            </div>
            
            <div class="mb-4">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">相关标签:</h4>
                <div class="flex flex-wrap gap-2">
                    ${question.tags.map(tag => `
                        <span class="tag-badge">${tag}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="flex flex-wrap justify-between items-center pt-4 border-t border-gray-200">
                <div class="text-gray-500">
                    <p><i class="fas fa-building mr-2"></i>${question.companyName}</p>
                    <p class="mt-1"><i class="far fa-calendar-alt mr-2"></i>更新时间: ${formatDate(question.updateDate)}</p>
                </div>
                
                <div class="flex mt-4 md:mt-0">
                    <button id="saveQuestion" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 mr-2">
                        <i class="far fa-bookmark mr-2"></i>收藏
                    </button>
                    <button id="shareQuestion" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                        <i class="fas fa-share-alt mr-2"></i>分享
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // 动态添加收藏和分享功能
    const saveBtn = modalContent.querySelector('#saveQuestion');
    saveBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-check mr-2"></i>已收藏';
        this.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        this.classList.add('bg-gray-500', 'hover:bg-gray-600');
        showToast('题目已收藏！');
    });
    
    const shareBtn = modalContent.querySelector('#shareQuestion');
    shareBtn.addEventListener('click', function() {
        showToast('分享功能正在开发中...');
    });
    
    // 显示模态框
    modal.classList.remove('hidden');
    setTimeout(() => {
        const modalDialog = document.querySelector('.modal-content');
        modalDialog.classList.remove('scale-95', 'opacity-0');
    }, 10);
}

// 渲染分页控件
function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    
    // 如果没有结果或只有一页，不显示分页
    if (searchState.totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    // 上一页按钮
    const prevBtn = document.createElement('button');
    prevBtn.className = `pagination-btn ${searchState.currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.textContent = '« 上一页';
    if (searchState.currentPage > 1) {
        prevBtn.addEventListener('click', () => goToPage(searchState.currentPage - 1));
    }
    paginationContainer.appendChild(prevBtn);
    
    // 页码按钮
    const maxVisiblePages = 5;
    let startPage = Math.max(1, searchState.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(searchState.totalPages, startPage + maxVisiblePages - 1);
    
    // 调整起始页以确保显示足够的页码
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // 显示第一页
    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.className = 'pagination-btn';
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => goToPage(1));
        paginationContainer.appendChild(firstPageBtn);
        
        // 如果起始页不是2，显示省略号
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
    }
    
    // 页码
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === searchState.currentPage ? 'active' : ''}`;
        pageBtn.textContent = i.toString();
        pageBtn.addEventListener('click', () => goToPage(i));
        paginationContainer.appendChild(pageBtn);
    }
    
    // 如果结束页不是最后一页，显示省略号和最后一页
    if (endPage < searchState.totalPages) {
        if (endPage < searchState.totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
        
        const lastPageBtn = document.createElement('button');
        lastPageBtn.className = 'pagination-btn';
        lastPageBtn.textContent = searchState.totalPages.toString();
        lastPageBtn.addEventListener('click', () => goToPage(searchState.totalPages));
        paginationContainer.appendChild(lastPageBtn);
    }
    
    // 下一页按钮
    const nextBtn = document.createElement('button');
    nextBtn.className = `pagination-btn ${searchState.currentPage === searchState.totalPages ? 'disabled' : ''}`;
    nextBtn.textContent = '下一页 »';
    if (searchState.currentPage < searchState.totalPages) {
        nextBtn.addEventListener('click', () => goToPage(searchState.currentPage + 1));
    }
    paginationContainer.appendChild(nextBtn);
}

// 跳转到指定页
function goToPage(page) {
    if (page < 1 || page > searchState.totalPages || page === searchState.currentPage) {
        return;
    }
    
    searchState.currentPage = page;
    renderSearchResults();
    renderPagination();
    
    // 平滑滚动到结果区域顶部
    document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 随机推荐题目
function randomizeQuestion() {
    const randomIndex = Math.floor(Math.random() * QUESTION_DATABASE.length);
    const question = QUESTION_DATABASE[randomIndex];
    const recommendationCard = document.querySelector('.recommendation-card');
    const difficultyInfo = DIFFICULTY_TEXT[question.difficulty];
    
    // 应用淡出效果
    recommendationCard.style.opacity = '0';
    
    setTimeout(() => {
        recommendationCard.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-indigo-900">${question.title}</h3>
                <div class="difficulty-badge ${difficultyInfo.className}">${difficultyInfo.text}</div>
            </div>
            <p class="text-gray-700 mb-4">${question.content}</p>
            <div class="mb-4">
                <div class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                    <pre><code>${question.codeExample}</code></pre>
                </div>
            </div>
            <div class="tags flex flex-wrap gap-2 mb-4">
                ${question.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
            </div>
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                    <i class="fas fa-building mr-1"></i>${question.companyName}
                </div>
                <button id="randomizeBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                    <i class="fas fa-dice mr-2"></i>
                    换一题
                </button>
            </div>
        `;
        
        // 重新应用淡入效果
        recommendationCard.style.opacity = '1';
        
        // 重新绑定换一题按钮事件
        document.getElementById('randomizeBtn').addEventListener('click', randomizeQuestion);
    }, 300);
}

// 初始化标签点击事件
function initTagChips() {
    elements.tagChips.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// 初始化添加自定义标签功能
function initCustomTagFeature() {
    elements.addCustomTag.addEventListener('click', () => {
        const tagText = elements.customTag.value.trim();
        if (tagText) {
            const tagContainer = document.querySelector('.flex.flex-wrap.gap-2');
            
            // 避免重复添加相同标签
            const existingTags = Array.from(document.querySelectorAll('.tag-chip')).map(tag => 
                tag.dataset.tag.toLowerCase()
            );
            
            if (!existingTags.includes(tagText.toLowerCase())) {
                const newTag = document.createElement('div');
                newTag.className = 'tag-chip';
                newTag.dataset.tag = tagText;
                newTag.innerHTML = `<span>${tagText}</span><i class="fas fa-times ml-1"></i>`;
                
                newTag.addEventListener('click', function() {
                    this.classList.toggle('active');
                });
                
                tagContainer.appendChild(newTag);
                elements.customTag.value = '';
                
                // 添加后自动选中
                newTag.classList.add('active');
                
                // 添加动画效果
                newTag.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    newTag.style.transform = '';
                }, 300);
            } else {
                showToast('该标签已存在！');
            }
        }
    });
    
    // Enter键添加标签
    elements.customTag.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            elements.addCustomTag.click();
        }
    });
}

// 初始化高级搜索选项折叠功能
function initAdvancedToggle() {
    elements.toggleAdvanced.addEventListener('click', () => {
        elements.advancedOptions.classList.toggle('hidden');
        elements.toggleIcon.classList.toggle('rotate-180');
        
        elements.toggleText.textContent = elements.advancedOptions.classList.contains('hidden') ? '展开' : '收起';
    });
}

// 工具函数: 截断文本
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// 工具函数: 格式化日期
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
}

// 显示Toast消息
function showToast(message) {
    // 检查是否已有toast，有则移除
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast-message fixed bottom-5 right-5 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-20 opacity-0';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示toast动画
    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    }, 10);

    // 3秒后隐藏
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initDOMElements();
    initSearchHistory();
    initTagChips();
    initCustomTagFeature();
    initAdvancedToggle();
    
    // 设置默认日期值（前6个月到现在）
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    elements.dateTo.valueAsDate = today;
    elements.dateFrom.valueAsDate = sixMonthsAgo;
    
    // 绑定搜索表单提交事件
    elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
    });
    
    // 绑定排序方式变更事件
    elements.sortOrder.addEventListener('change', () => {
        if (searchState.currentResults.length > 0) {
            sortResults(searchState.currentResults, elements.sortOrder.value);
            renderSearchResults();
        }
    });
    
    // 绑定清空历史按钮事件
    elements.clearHistory.addEventListener('click', clearSearchHistory);
    
    // 绑定随机推荐按钮事件
    elements.randomizeBtn.addEventListener('click', randomizeQuestion);
    
    // 随机初始化一个推荐题目
    randomizeQuestion();
    
    // 如果URL中包含搜索参数，直接执行搜索
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        elements.keywordSearch.value = searchQuery;
        performSearch();
    }
    
    // 为了展示效果，首次加载执行一个空搜索
    setTimeout(() => {
        performSearch();
    }, 500);
});
