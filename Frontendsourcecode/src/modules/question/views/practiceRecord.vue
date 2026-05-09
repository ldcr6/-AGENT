<template>
  <div class="practice-record-bg">
    <div class="practice-record-container">
      <h1 class="title">刷题记录</h1>
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-value">{{ total }}</div>
          <div class="stat-label">总刷题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ answered }}</div>
          <div class="stat-label">已答题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ viewed }}</div>
          <div class="stat-label">已看题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ streak }}</div>
          <div class="stat-label">连续打卡天数</div>
        </div>
      </div>
      <div class="achievements-bar">
        <div v-for="badge in badges" :key="badge.key" class="badge-item" :class="{ active: badge.active }">
          <span class="badge-icon">{{ badge.icon }}</span>
          <span class="badge-label">{{ badge.label }}</span>
        </div>
      </div>
      <div class="trend-bar">
        <div class="trend-bar-header">
          <div class="trend-title">刷题趋势
            <span class="trend-range-btns">
              <button :class="{active: trendRange === 7}" @click="trendRange = 7">7天</button>
              <button :class="{active: trendRange === 30}" @click="trendRange = 30">30天</button>
            </span>
            <span class="trend-type-btns">
              <button :class="{active: trendType === 'line'}" @click="trendType = 'line'">折线图</button>
              <button :class="{active: trendType === 'bar'}" @click="trendType = 'bar'">柱状图</button>
            </span>
          </div>
        </div>
        <svg :width="svgWidth" :height="svgHeight" class="trend-svg">
          <!-- 坐标轴 -->
          <line :x1="margin" :y1="svgHeight - margin" :x2="svgWidth - margin" :y2="svgHeight - margin" stroke="#cbd5e1" stroke-width="2" />
          <line :x1="margin" :y1="margin" :x2="margin" :y2="svgHeight - margin" stroke="#cbd5e1" stroke-width="2" />
          <!-- 折线图 -->
          <polyline v-if="trendType === 'line'"
            :points="trendPoints"
            fill="none"
            stroke="#6366f1"
            stroke-width="3"
            :style="'filter: drop-shadow(0 2px 6px #6366f133);'"
          />
          <!-- 柱状图 -->
          <g v-if="trendType === 'bar'">
            <rect v-for="(d, i) in trendData" :key="i"
              :x="getX(i) - barWidth/2"
              :y="getY(d.count)"
              :width="barWidth"
              :height="svgHeight - margin - getY(d.count)"
              fill="#6366f1" opacity="0.18"
            />
          </g>
          <!-- 圆点和数值 -->
          <g v-for="(d, i) in trendData" :key="i">
            <circle v-if="trendType === 'line'" :cx="getX(i)" :cy="getY(d.count)" r="5" fill="#6366f1" />
            <text :x="getX(i)" :y="getY(d.count) - 12" text-anchor="middle" font-size="13" fill="#6366f1" v-if="d.count > 0">{{ d.count }}</text>
            <text :x="getX(i)" :y="svgHeight - margin + 18" text-anchor="middle" font-size="13" fill="#64748b">{{ d.label }}</text>
          </g>
        </svg>
      </div>
      <div class="filter-bar">
        <div class="motto-area" @mouseenter="pauseMotto" @mouseleave="resumeMotto">
          <transition name="motto-fade" mode="out-in">
            <span class="motto" :key="motto">{{ motto }}</span>
          </transition>
          <button class="motto-btn" @click="refreshMotto" title="换一句">
            <svg class="refresh-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.93 4.93A7 7 0 1 1 3 10" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="3 4 3 10 9 10" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <select v-model="filterSource" class="filter-select">
          <option value="">全部来源</option>
          <option value="search">多维搜索</option>
          <option value="daily">每日一题</option>
        </select>
        <select v-model="filterStatus" class="filter-select">
          <option value="">全部状态</option>
          <option value="answered">已答</option>
          <option value="viewed">已看</option>
        </select>
        <input v-model="filterKeyword" class="filter-input" placeholder="输入题目关键词" />
        <button class="filter-btn" @click="resetFilter">重置</button>
        <div class="export-dropdown">
          <button class="filter-btn" @click="toggleExportDropdown">
            导出 <span style="font-size:12px;">▼</span>
          </button>
          <div v-if="exportDropdownVisible" class="dropdown-menu">
            <div class="dropdown-item" @click="exportCSV">导出 CSV</div>
            <div class="dropdown-item" @click="exportExcel">导出 Excel</div>
            <div class="dropdown-item" @click="exportPDF">导出 PDF</div>
          </div>
        </div>
        <button class="filter-btn danger" @click="clearAllRecords">清空全部</button>
      </div>
      <div v-if="filteredRecords.length" class="record-grid">
        <div v-for="(item, idx) in filteredRecords" :key="item.id + '-' + item.time" class="record-card"
          @click="goToDetail(item)"
          @mouseenter="showTooltip(idx, item)" @mouseleave="hideTooltip">
          <button class="delete-btn" @click.stop="deleteRecord(item)">✖</button>
          <div class="record-header">
            <span class="record-title">{{ item.title }}</span>
            <span class="record-status" :class="item.status">{{ statusText(item.status) }}</span>
          </div>
          <div class="record-meta">
            <span class="record-source">
              <span v-if="item.source === 'search'" class="source-icon">🔍</span>
              <span v-else-if="item.source === 'daily'" class="source-icon">📅</span>
              来源：{{ sourceText(item.source) }}
            </span>
            <span class="record-time">{{ formatTime(item.time) }}</span>
            <span v-if="item.company" class="record-company">
              <span class="company-logo">{{ companyLogo(item.company) }}</span>
              {{ item.company }}
            </span>
            <span v-if="item.difficulty" class="record-difficulty" :class="'diff-' + item.difficulty">
              {{ difficultyText(item.difficulty) }}
            </span>
          </div>
          <div v-if="item.tags && item.tags.length" class="record-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag-badge">{{ tag }}</span>
          </div>
          <div v-if="tooltipIdx === idx" class="card-tooltip">
            <div v-if="item.explanation" class="tip-title">解题思路：</div>
            <div v-if="item.explanation" class="tip-content">{{ item.explanation }}</div>
            <div v-if="item.favorite" class="tip-fav">已收藏</div>
          </div>
        </div>
      </div>
      <div v-else class="empty-tip">
        <div class="empty-illustration">
          <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#e0e7ff"/><ellipse cx="60" cy="90" rx="32" ry="10" fill="#c7d2fe"/><rect x="40" y="40" width="40" height="30" rx="8" fill="#fff" stroke="#6366f1" stroke-width="2"/><rect x="50" y="50" width="20" height="10" rx="3" fill="#e0e7ff"/><circle cx="60" cy="60" r="3" fill="#6366f1"/></svg>
        </div>
        <div class="empty-motto">{{ motto }}</div>
        <div class="empty-action">快去刷题，点亮你的成就吧！</div>
      </div>
      <div class="recommend-bar" v-if="recommendList.length">
        <div class="recommend-title">你还未刷的高频题</div>
        <div class="recommend-list">
          <div v-for="q in recommendList" :key="q.id" class="recommend-card" @click="goToDetail(q)">
            <div class="recommend-header">
              <span class="recommend-title-main">{{ q.title }}</span>
              <span v-if="q.difficulty" class="recommend-diff" :class="'diff-' + q.difficulty">{{ difficultyText(q.difficulty) }}</span>
            </div>
            <div class="recommend-tags">
              <span v-for="tag in q.tags" :key="tag" class="tag-badge">{{ tag }}</span>
            </div>
            <div class="recommend-meta">
              <span v-if="q.company" class="recommend-company"><span class="company-logo">{{ companyLogo(q.company) }}</span>{{ q.company }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="toastMsg" class="toast-tip">{{ toastMsg }}</div>
      <!-- 详情弹窗迁移自search.vue，字段、样式、收藏等功能完全一致 -->
      <template v-if="showDetail">
        <div class="modal fixed inset-0 z-50 flex items-center justify-center">
          <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50" @click="closeDetail"></div>
          <div :class="['modal-content bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 transform transition-transform duration-300', { 'scale-95 opacity-0': !modalActive, 'scale-100 opacity-100': modalActive }]">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-2xl font-bold text-indigo-900">详细题目信息</h2>
                <div class="flex items-center space-x-2">
                  <button @click="toggleFavorite" :class="['favorite-btn', { favorited: isFavorited }]">
                    <i :class="['fas', isFavorited ? 'fa-heart text-red-500' : 'fa-heart text-gray-400']"></i>
                    <span class="ml-1">{{ isFavorited ? '已收藏' : '收藏' }}</span>
                  </button>
                  <button @click="shareQuestion" class="share-btn">
                    <i class="fas fa-share-alt text-blue-500"></i>
                    <span class="ml-1">分享</span>
                  </button>
                  <button @click="closeDetail" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>
              <div class="modal-body">
                <div class="flex justify-between items-start mb-6">
                  <h3 class="text-2xl font-bold text-gray-800">{{ detailItem?.title }}</h3>
                  <div :class="['difficulty-badge', 'px-3', 'py-1', 'rounded-full', 'text-white', 'font-medium']">
                    {{ difficultyText(detailItem?.difficulty) }}
                  </div>
                </div>
                <div class="mb-6">
                  <h4 class="text-lg font-semibold text-gray-700 mb-3">问题描述</h4>
                  <p class="text-gray-700 mb-4">{{ detailItem?.description }}</p>
                  <h4 class="text-lg font-semibold text-gray-700 mb-3">参考答案</h4>
                  <div class="code-block bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
                    <pre><code>{{ detailItem?.codeExample }}</code></pre>
                  </div>
                  <div class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-700 mb-3">解题思路</h4>
                    <p class="text-gray-700 mb-3">{{ detailItem?.explanation }}</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span v-for="(tag, index) in detailItem?.tags" :key="index" class="tag-badge">{{ tag }}</span>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <div>
                    <i class="fas fa-building mr-2"></i>公司: {{ detailItem?.company }}
                  </div>
                  <div>
                    <i class="fas fa-calendar mr-2"></i>更新日期: {{ detailItem?.date || formatTime(detailItem?.time) }}
                  </div>
                  <div>
                    <i class="fas fa-chart-line mr-2"></i>热度: {{ detailItem?.popularity }}%
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showFavoriteToast" class="favorite-toast fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
              <i class="fas fa-check-circle mr-2"></i>
              已添加到收藏夹！
            </div>
          </div>
        </div>
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from 'vue';
import { getPracticeRecords } from '../utils/practiceRecord';

// 1. 引入依赖
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// MOCK_QUESTIONS（可替换为后端接口）
const MOCK_QUESTIONS = [
  { 
    id: 1, 
    title: '实现一个防抖函数', 
    tags: ['JavaScript', '函数式编程'], 
    difficulty: 3, 
    company: '字节跳动', 
    explanation: '防抖用于减少高频操作的触发次数。', 
    description: '请实现一个防抖函数，该函数会在延迟一定时间后才执行回调，如果在延迟时间内再次调用，则重新计时。', 
    codeExample: `function debounce(fn, delay) {\n  // 请实现此函数\n  let timer = null;\n  return function(...args) {\n    if(timer) clearTimeout(timer);\n    timer = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  }\n}` 
  },
  { id: 2, title: '手写Promise.all实现', tags: ['JavaScript', 'Promise'], difficulty: 4, company: '阿里巴巴', description: '实现一个Promise.all函数，接收一个Promise数组，当所有Promise都成功时返回成功结果数组，有一个失败则返回失败结果。', codeExample: `function promiseAll(promises) {\n  // 请实现此函数\n}` },
  { id: 3, title: '实现React useState Hook', tags: ['React', 'Hooks'], difficulty: 4, company: '腾讯', description: '请实现一个简化版的React useState Hook，需要支持基本的状态更新功能。', codeExample: `function useState(initialValue) {\n  // 请实现此函数\n}` },
  { id: 4, title: '二叉树的最大深度', tags: ['算法', '二叉树'], difficulty: 2, company: 'Google', description: '编写一个函数来计算二叉树的最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。', codeExample: `function maxDepth(root) {\n  // 请实现此函数\n}` },
  { id: 5, title: 'Vue响应式原理实现', tags: ['Vue', '响应式编程'], difficulty: 5, company: '美团', description: '请简要实现Vue 2.x中的响应式系统核心原理，包括Observer、Dep和Watcher三个部分。', codeExample: `class Observer {\n  // 请实现此类\n}\n\nclass Dep {\n  // 请实现此类\n}\n\nclass Watcher {\n  // 请实现此类\n}` },
  { id: 6, title: '实现一个简易版的Redux', tags: ['React', 'Redux'], difficulty: 4, company: '京东', description: '编写一个极简版的Redux，实现createStore函数，支持getState、dispatch和subscribe方法。', codeExample: `function createStore(reducer) {\n  // 请实现此函数\n}` },
  { id: 7, title: '实现快速排序算法', tags: ['算法', '排序'], difficulty: 3, company: '百度', description: '请实现快速排序算法，并分析其时间复杂度和空间复杂度。', codeExample: `function quickSort(arr) {\n  // 请实现此函数\n}` },
  { id: 8, title: '设计LRU缓存结构', tags: ['算法', '数据结构'], difficulty: 4, company: '微软', description: '请设计并实现一个LRU(最近最少使用)缓存机制，要求在O(1)时间内完成get和put操作。', codeExample: `class LRUCache {\n  // 请实现此类\n}` },
  { id: 9, title: '深拷贝函数实现', tags: ['JavaScript', '对象处理'], difficulty: 3, company: '字节跳动', description: '实现一个深拷贝函数，要求可以处理对象、数组、函数以及循环引用等场景。', codeExample: `function deepClone(obj) {\n  // 请实现此函数\n}` },
  { id: 10, title: '实现简单的虚拟DOM和diff算法', tags: ['JavaScript', '虚拟DOM'], difficulty: 5, company: '阿里巴巴', description: '请实现一个简化版的虚拟DOM和diff算法，能够计算出两棵虚拟DOM树之间的最小变化。', codeExample: `function createElement(type, props, ...children) {\n  // 请实现此函数\n}\n\nfunction diff(oldVNode, newVNode) {\n  // 请实现此函数\n}` },
  // 以下为批量补全
  { id: 11, title: '实现事件委托机制', tags: ['JavaScript', 'DOM', '事件处理'], difficulty: 2, company: '腾讯', description: '请实现一个事件委托函数，可以为目标元素的所有子元素代理指定的事件。', explanation: '', codeExample: '暂无参考答案' },
  { id: 12, title: '手写JSONP实现跨域请求', tags: ['JavaScript', '网络', '跨域'], difficulty: 2, company: '京东', description: '请实现一个JSONP函数，用于解决跨域请求问题。', explanation: '', codeExample: '暂无参考答案' },
  { id: 13, title: '编写一个节流函数', tags: ['JavaScript', '性能优化', '函数式编程'], difficulty: 3, company: '字节跳动', description: '实现一个节流函数，确保函数在指定时间内最多执行一次。', explanation: '', codeExample: '暂无参考答案' },
  { id: 14, title: '实现一个发布订阅模式', tags: ['JavaScript', '设计模式', '事件系统'], difficulty: 3, company: '百度', description: '请实现一个事件发布订阅系统，支持on, emit, off和once方法。', explanation: '', codeExample: '暂无参考答案' },
  { id: 15, title: '实现一个异步任务调度器', tags: ['JavaScript', '异步编程', '任务调度'], difficulty: 4, company: '阿里巴巴', description: '实现一个异步任务调度器，控制同时运行的任务数量，超出数量的任务需要等待之前的任务完成。', explanation: '', codeExample: '暂无参考答案' }
];

interface PracticeRecord {
  id: number | string;
  title: string;
  source: string;
  status: string;
  time: string;
  tags?: string[];
  difficulty?: string | number;
  company?: string;
  explanation?: string;
  favorite?: boolean;
}

interface TrendDay {
  label: string;
  key: string;
  count: number;
}

const records = ref<PracticeRecord[]>([]);

const filterSource = ref('');
const filterStatus = ref('');
const filterKeyword = ref('');

const total = computed(() => records.value.length);
const answered = computed(() => records.value.filter(r => r.status === 'answered').length);
const viewed = computed(() => records.value.filter(r => r.status === 'viewed').length);

// 个性化推荐：未刷的高频题
const recommendList = computed(() => {
  const doneIds = new Set(records.value.map(r => Number(r.id)));
  return MOCK_QUESTIONS.filter(q => !doneIds.has(Number(q.id))).slice(0, 5);
});

// 成就徽章
const badges = computed(() => [
  {
    key: 'rookie',
    icon: '🌱',
    label: '刷题新手',
    active: total.value >= 1
  },
  {
    key: 'daren',
    icon: '💪',
    label: '刷题达人',
    active: total.value >= 20
  },
  {
    key: 'week',
    icon: '📅',
    label: '坚持一周',
    active: streak.value >= 7
  },
  {
    key: 'month',
    icon: '🏆',
    label: '坚持一月',
    active: streak.value >= 30
  },
  {
    key: 'king',
    icon: '👑',
    label: '百题王者',
    active: total.value >= 100
  }
]);

// 刷题趋势图切换
const trendRange = ref(7); // 7 or 30
const trendType = ref<'line' | 'bar'>('line');
const svgWidth = 600;
const svgHeight = 180;
const margin = 38;
const barWidth = computed(() => (svgWidth - 2 * margin) / (trendRange.value - 1) * 0.5);
const trendData = computed<TrendDay[]>(() => {
  const arr: TrendDay[] = [];
  const now = new Date();
  for (let i = trendRange.value - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    const key = d.toISOString().slice(0, 10);
    arr.push({ label, key, count: 0 });
  }
  for (const r of records.value) {
    const day = r.time.slice(0, 10);
    const found = arr.find(a => a.key === day);
    if (found) found.count++;
  }
  return arr;
});
const maxCount = computed(() => Math.max(2, ...trendData.value.map((d: TrendDay) => d.count)));
const getX = (i: number) => margin + i * ((svgWidth - 2 * margin) / (trendRange.value - 1));
const getY = (count: number) => svgHeight - margin - (count / maxCount.value) * (svgHeight - 2 * margin);
const trendPoints = computed(() => trendData.value.map((d, i) => `${getX(i)},${getY(d.count)}`).join(' '));

// 公司Logo（首字母或emoji）
function companyLogo(name?: string) {
  if (!name) return '';
  const map: Record<string, string> = {
    '字节跳动': '🦄', '阿里巴巴': '🐘', '腾讯': '🐧', '百度': '🔍', '美团': '🍔', '京东': '🐶', 'Google': '🌎', '微软': '🪟', '亚马逊': '🛒'
  };
  return map[name] || name[0];
}
// 难度文本
function difficultyText(diff: string | number | undefined) {
  if (diff === '1' || diff === 1) return '简单';
  if (diff === '2' || diff === 2) return '初级';
  if (diff === '3' || diff === 3) return '中等';
  if (diff === '4' || diff === 4) return '困难';
  if (diff === '5' || diff === 5) return '专家';
  return diff || '';
}

// 励志话语
const mottos = [
  '每一次努力，都是幸运的伏笔。',
  '坚持刷题，未来可期！',
  '你刷的每一道题，都会在未来闪光。',
  '别放弃，成功就在下一个题目！',
  '刷题路上，你不是一个人在战斗。',
  '积跬步以至千里，积小流以成江海。',
  '相信自己，你比想象中更强大！',
  '今日不刷题，明日徒伤悲。',
  '刷题如登山，顶峰就在前方。',
  '优秀是一种习惯，刷题也是。',
  '加油，你是最棒的！',
  '再难的题，也挡不住你前进的脚步。',
  '每一次坚持，都是在为梦想铺路。',
  '刷题的路上，风雨兼程，终会见彩虹。',
  '相信过程，结果自会到来。',
  '你不是一个人在战斗！',
  '每一次思考，都是成长的阶梯。',
  '别怕慢，最重要的是不停下脚步。',
  '刷题如逆水行舟，不进则退。',
  '你能坚持到现在，已经很棒了！',
  '再多刷一道题，离梦想更近一步。',
  '每一次突破，都是对自己的超越。',
  '相信努力的力量，未来属于你！',
  '刷题的你，最有魅力！',
  '别急，慢慢来，稳扎稳打最重要。',
  '每一次失败，都是成功的垫脚石。',
  '你已经很棒了，继续加油！',
  '刷题不止，成长不息。',
  '未来的你，一定会感谢现在的自己。',
  '每一道题，都是一次新的挑战。',
  '相信自己，终会破茧成蝶！'
];
const motto = ref('');
const mottoTimer = ref<any>(null);
let isPaused = false; // 新增标志位

function refreshMotto() {
  const idx = Math.floor(Math.random() * mottos.length);
  motto.value = mottos[idx];
}
function startMottoInterval() {
  clearInterval(mottoTimer.value);
  mottoTimer.value = setInterval(() => {
    refreshMotto();
  }, 3500);
}
function pauseMotto() {
  if (!isPaused) {
    clearInterval(mottoTimer.value);
    isPaused = true;
  }
}
function resumeMotto() {
  if (isPaused) {
    startMottoInterval();
    isPaused = false;
  }
}
onMounted(() => {
  records.value = getPracticeRecords().sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  refreshMotto();
  startMottoInterval();
  isPaused = false; // 保证初始状态
  document.addEventListener('click', closeExportDropdown);
});
onBeforeUnmount(() => {
  clearInterval(mottoTimer.value);
  isPaused = false;
});

// 连续打卡天数统计
function calcStreak(records: PracticeRecord[]): number {
  if (!records.length) return 0;
  const days = Array.from(new Set(records.map(r => r.time.slice(0, 10)))).sort().reverse();
  let streak = 1;
  let prev = new Date(days[0]);
  for (let i = 1; i < days.length; i++) {
    const cur = new Date(days[i]);
    const diff = (prev.getTime() - cur.getTime()) / (1000 * 3600 * 24);
    if (diff === 1) {
      streak++;
      prev = cur;
    } else if (diff > 1) {
      break;
    }
  }
  return streak;
}
const streak = computed(() => calcStreak(records.value));

const filteredRecords = computed(() => {
  return records.value.filter(r => {
    const matchSource = !filterSource.value || r.source === filterSource.value;
    const matchStatus = !filterStatus.value || r.status === filterStatus.value;
    const matchKeyword = !filterKeyword.value || r.title.toLowerCase().includes(filterKeyword.value.toLowerCase());
    return matchSource && matchStatus && matchKeyword;
  });
});

function resetFilter() {
  filterSource.value = '';
  filterStatus.value = '';
  filterKeyword.value = '';
}

// 导出CSV
function exportCSV() {
  const rows = [
    ['题目', '标签', '难度', '公司', '来源', '状态', '时间'],
    ...filteredRecords.value.map(r => [
      r.title,
      (r.tags || []).join(','),
      difficultyText(r.difficulty),
      r.company || '',
      sourceText(r.source),
      statusText(r.status),
      formatTime(r.time)
    ])
  ];
  const csv = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `practice-record-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('导出成功！');
}

// 3. 导出Excel
function exportExcel() {
  const rows = [
    ['题目', '标签', '难度', '公司', '来源', '状态', '时间'],
    ...filteredRecords.value.map(r => [
      r.title,
      (r.tags || []).join(','),
      difficultyText(r.difficulty),
      r.company || '',
      sourceText(r.source),
      statusText(r.status),
      formatTime(r.time)
    ])
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '刷题记录');
  XLSX.writeFile(workbook, `practice-record-${new Date().toISOString().slice(0,10)}.xlsx`);
  showToast('Excel 导出成功！');
}
// 4. 导出PDF
function exportPDF() {
  const doc = new jsPDF();
  const rows = filteredRecords.value.map(r => [
    r.title,
    (r.tags || []).join(','),
    difficultyText(r.difficulty),
    r.company || '',
    sourceText(r.source),
    statusText(r.status),
    formatTime(r.time)
  ]);
  (doc as any).autoTable({
    head: [['题目', '标签', '难度', '公司', '来源', '状态', '时间']],
    body: rows,
    styles: { font: 'helvetica', fontSize: 10 }
  });
  doc.save(`practice-record-${new Date().toISOString().slice(0,10)}.pdf`);
  showToast('PDF 导出成功！');
}

// 悬浮提示
const tooltipIdx = ref<number | null>(null);
function showTooltip(idx: number, item: PracticeRecord) { tooltipIdx.value = idx; }
function hideTooltip() { tooltipIdx.value = null; }

// 操作反馈toast
const toastMsg = ref('');
function showToast(msg: string) {
  toastMsg.value = msg;
  setTimeout(() => { toastMsg.value = ''; }, 1800);
}

// 单条删除
function deleteRecord(item: PracticeRecord) {
  if (!confirm('确定要删除这条刷题记录吗？')) return;
  const idx = records.value.findIndex(r => r.id === item.id && r.time === item.time);
  if (idx !== -1) {
    records.value.splice(idx, 1);
    localStorage.setItem('practiceRecord', JSON.stringify(records.value));
    showToast('删除成功！');
  }
}
// 清空全部
function clearAllRecords() {
  if (!records.value.length) return;
  if (!confirm('确定要清空所有刷题记录吗？此操作不可恢复！')) return;
  records.value = [];
  localStorage.removeItem('practiceRecord');
  showToast('已清空全部记录！');
}
// 收藏相关
const isFavorited = ref(false);
const showFavoriteToast = ref(false);
function addToCollection(question: any) {
  let collection = JSON.parse(localStorage.getItem('questionCollection') || '[]');
  if (!collection.find((q: any) => q.id === question.id)) {
    collection.push(question);
    localStorage.setItem('questionCollection', JSON.stringify(collection));
  }
}
function removeFromCollection(id: any) {
  let collection = JSON.parse(localStorage.getItem('questionCollection') || '[]');
  collection = collection.filter((q: any) => q.id !== id);
  localStorage.setItem('questionCollection', JSON.stringify(collection));
}
function checkIsFavorited(id: any) {
  const collection = JSON.parse(localStorage.getItem('questionCollection') || '[]');
  return collection.some((q: any) => q.id === id);
}
function toggleFavorite() {
  if (!detailItem.value) return;
  isFavorited.value = !isFavorited.value;
  if (isFavorited.value) {
    addToCollection(detailItem.value);
    showFavoriteToast.value = true;
    setTimeout(() => {
      showFavoriteToast.value = false;
    }, 2000);
  } else {
    removeFromCollection(detailItem.value.id);
  }
}
function shareQuestion() {
  alert('分享功能待实现');
}

function statusText(status: string) {
  if (status === 'answered') return '已答';
  if (status === 'viewed') return '已看';
  return status;
}
function sourceText(source: string) {
  if (source === 'search') return '多维搜索';
  if (source === 'daily') return '每日一题';
  return source;
}
function formatTime(time: string) {
  if (!time) return '';
  const d = new Date(time);
  return d.toLocaleString();
}

declare global {
  interface Window {
    showQuestionDetail?: (item: any) => void;
  }
}

const showDetail = ref(false);
const detailItem = ref<any>(null);
const modalActive = ref(false);
function goToDetail(item: any) {
  // 查找完整题目信息
  const full = MOCK_QUESTIONS.find(q => Number(q.id) === Number(item.id));
  const randomPopularity = Math.floor(Math.random() * 40) + 60;
  if (full) {
    detailItem.value = { ...full, ...item, popularity: randomPopularity };
  } else {
    detailItem.value = { ...item, popularity: randomPopularity };
  }
  isFavorited.value = checkIsFavorited(detailItem.value.id);
  showDetail.value = true;
  nextTick(() => {
    modalActive.value = true;
  });
}
function closeDetail() {
  modalActive.value = false;
  setTimeout(() => {
    showDetail.value = false;
    detailItem.value = null;
  }, 300);
}

// 2. 下拉菜单显示逻辑
const exportDropdownVisible = ref(false);
function toggleExportDropdown() {
  exportDropdownVisible.value = !exportDropdownVisible.value;
}
function closeExportDropdown(e: MouseEvent) {
  // 只要不是点击在下拉菜单内就关闭
  if (!(e.target as HTMLElement).closest('.export-dropdown')) {
    exportDropdownVisible.value = false;
  }
}
</script>

<style scoped>
.practice-record-bg {
  min-height: 100vh;
  background: #f7f8fa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0;
}
.practice-record-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(80, 112, 255, 0.10);
  padding: 48px 40px 36px 40px;
  min-height: 400px;
}
.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 36px;
  text-align: center;
  letter-spacing: 2px;
}
.stats-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  gap: 18px;
}
.stat-item {
  flex: 1;
  background: #f5f7ff;
  border-radius: 14px;
  box-shadow: 0 2px 8px 0 rgba(80, 112, 255, 0.06);
  padding: 18px 0 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-value {
  font-size: 2.1rem;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 1.05rem;
  color: #64748b;
  letter-spacing: 1px;
}
.achievements-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 28px;
  justify-content: center;
}
.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f7ff;
  border-radius: 12px;
  padding: 10px 18px 8px 18px;
  box-shadow: 0 1px 4px 0 rgba(80, 112, 255, 0.04);
  opacity: 0.5;
  transition: opacity 0.2s, box-shadow 0.2s;
  min-width: 70px;
}
.badge-item.active {
  opacity: 1;
  box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.10);
  background: #e0e7ff;
}
.badge-icon {
  font-size: 1.7rem;
  margin-bottom: 4px;
}
.badge-label {
  font-size: 0.98rem;
  color: #6366f1;
  font-weight: 600;
}
.trend-bar {
  margin-bottom: 32px;
  background: #f5f7ff;
  border-radius: 14px;
  box-shadow: 0 1px 4px 0 rgba(80, 112, 255, 0.04);
  padding: 18px 18px 8px 18px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.trend-bar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}
.trend-title {
  font-size: 1.1rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 16px;
}
.trend-range-btns, .trend-type-btns {
  margin-left: 16px;
  display: inline-flex;
  gap: 4px;
}
.trend-range-btns button, .trend-type-btns button {
  background: #f5f7ff;
  border: none;
  border-radius: 6px;
  color: #6366f1;
  font-size: 0.98rem;
  padding: 2px 12px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.trend-range-btns button.active, .trend-type-btns button.active {
  background: #6366f1;
  color: #fff;
}
.trend-range-btns button:hover, .trend-type-btns button:hover {
  background: #e0e7ff;
}
.trend-svg {
  width: 100%;
  max-width: 640px;
  display: block;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 32px;
  justify-content: flex-end;
}
.motto-area {
  display: flex;
  align-items: center;
  margin-right: 18px;
  min-width: 280px;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6366f1;
  font-weight: 500;
  font-size: 1.05rem;
  background: #f5f7ff;
  border-radius: 8px;
  padding: 6px 12px 6px 14px;
  box-shadow: 0 1px 4px 0 rgba(80, 112, 255, 0.04);
}
.motto-btn {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 1.1rem;
  margin-left: 6px;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0 2px;
  display: flex;
  align-items: center;
}
.motto-btn:hover {
  color: #4f46e5;
}
.refresh-icon {
  transition: transform 0.4s;
}
.motto-btn:hover .refresh-icon {
  transform: rotate(360deg);
}
.filter-select {
  padding: 7px 18px 7px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f5f7ff;
  color: #374151;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.filter-select:focus {
  border-color: #6366f1;
}
.filter-input {
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f5f7ff;
  color: #374151;
  font-size: 1rem;
  outline: none;
  width: 180px;
  transition: border 0.2s;
}
.filter-input:focus {
  border-color: #6366f1;
}
.filter-btn {
  padding: 7px 18px;
  border-radius: 8px;
  border: none;
  background: #6366f1;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.filter-btn:hover {
  background: #4f46e5;
}
.filter-btn.danger {
  background: #f87171;
  color: #fff;
}
.filter-btn.danger:hover {
  background: #dc2626;
}
.record-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 28px;
}
.record-card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(80, 112, 255, 0.08);
  padding: 28px 22px 18px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
  cursor: pointer;
}
.record-card:hover {
  box-shadow: 0 6px 24px 0 rgba(80, 112, 255, 0.16);
  transform: translateY(-2px) scale(1.03);
}
.delete-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
}
.delete-btn:hover {
  color: #f87171;
}
.record-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.13rem;
  margin-bottom: 10px;
}
.record-title {
  font-weight: 700;
  color: #1e293b;
  font-size: 1.13rem;
  flex: 1;
  word-break: break-all;
}
.record-status {
  font-size: 1rem;
  padding: 2px 16px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 500;
  margin-left: 8px;
  border: 1px solid #e0e7ef;
  letter-spacing: 1px;
  transition: background 0.2s, color 0.2s;
}
.record-status.answered {
  background: #e0e7ff;
  color: #3b82f6;
  border-color: #c7d2fe;
}
.record-status.viewed {
  background: #fef9c3;
  color: #b45309;
  border-color: #fde68a;
}
.record-meta {
  font-size: 0.98rem;
  color: #64748b;
  margin-top: 8px;
  display: flex;
  gap: 18px;
  padding-left: 2px;
  flex-wrap: wrap;
}
.source-icon {
  font-size: 1.1em;
  margin-right: 2px;
}
.record-company {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 8px;
  color: #6366f1;
  font-weight: 500;
  font-size: 0.98em;
}
.company-logo {
  background: #e0e7ff;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin-right: 2px;
}
.record-difficulty {
  margin-left: 8px;
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: 500;
  background: #f1f5f9;
  color: #64748b;
}
.record-difficulty.diff-1, .record-difficulty.diff-2 { background: #d1fae5; color: #059669; }
.record-difficulty.diff-3 { background: #fef9c3; color: #b45309; }
.record-difficulty.diff-4 { background: #fee2e2; color: #dc2626; }
.record-difficulty.diff-5 { background: #fca5a5; color: #b91c1c; }
.record-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-badge {
  background: #e0e7ff;
  color: #6366f1;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.92em;
  font-weight: 500;
}
.empty-tip {
  text-align: center;
  color: #b0b6c6;
  font-size: 1.18rem;
  margin-top: 60px;
}
.empty-illustration {
  margin-bottom: 18px;
}
.empty-motto {
  color: #6366f1;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
.empty-action {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 4px;
}
.recommend-bar {
  margin-top: 36px;
  background: #f5f7ff;
  border-radius: 14px;
  box-shadow: 0 1px 4px 0 rgba(80, 112, 255, 0.04);
  padding: 18px 18px 8px 18px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.recommend-title {
  font-size: 1.1rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 10px;
}
.recommend-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 28px;
}
.recommend-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px 0 rgba(80, 112, 255, 0.04);
  padding: 16px 18px 10px 18px;
 /*  min-width: 180px;
  max-width: 220px;
  flex: 1 1 180px; */
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.recommend-card:hover {
  box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.10);
  transform: translateY(-2px) scale(1.03);
}
.recommend-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 600;
}
.recommend-title-main {
  flex: 1;
  color: #1e293b;
  font-weight: 700;
}
.recommend-diff {
  margin-left: 4px;
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: 500;
  background: #f1f5f9;
  color: #64748b;
}
.recommend-diff.diff-1, .recommend-diff.diff-2 { background: #d1fae5; color: #059669; }
.recommend-diff.diff-3 { background: #fef9c3; color: #b45309; }
.recommend-diff.diff-4 { background: #fee2e2; color: #dc2626; }
.recommend-diff.diff-5 { background: #fca5a5; color: #b91c1c; }
.recommend-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.recommend-meta {
  font-size: 0.95em;
  color: #64748b;
  margin-top: 2px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.recommend-company {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #6366f1;
  font-weight: 500;
}
.toast-tip {
  position: fixed;
  right: 32px;
  bottom: 32px;
  background: #6366f1;
  color: #fff;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 1.08rem;
  box-shadow: 0 2px 12px 0 rgba(80, 112, 255, 0.10);
  z-index: 9999;
  animation: fadeInOut 2s;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(20px); }
}
.card-tooltip {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  background: #fff;
  color: #6366f1;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(80, 112, 255, 0.10);
  padding: 12px 18px;
  min-width: 180px;
  font-size: 0.98em;
  z-index: 10;
  margin-top: 8px;
  pointer-events: none;
}
.tip-title {
  font-weight: 700;
  margin-bottom: 4px;
}
.tip-content {
  color: #64748b;
  margin-bottom: 4px;
}
.tip-fav {
  color: #f87171;
  font-size: 0.98em;
}
.export-dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(80, 112, 255, 0.08);
  min-width: 120px;
  z-index: 100;
}
.dropdown-item {
  padding: 10px 18px;
  cursor: pointer;
  color: #374151;
  font-size: 1rem;
  transition: background 0.2s;
}
.dropdown-item:hover {
  background: #f5f7ff;
  color: #6366f1;
}
@media (max-width: 1000px) {
  .practice-record-container {
    padding: 24px 2vw 24px 2vw;
  }
  .record-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
  }
  .recommend-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
  }
  .stats-bar {
    flex-direction: column;
    gap: 12px;
  }
  .stat-item {
    width: 100%;
    margin-bottom: 0;
  }
  .achievements-bar {
    gap: 14px;
    margin-bottom: 18px;
  }
  .trend-bar {
    max-width: 100%;
    padding: 12px 4px 4px 4px;
  }
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .motto-area {
    margin-bottom: 6px;
    margin-right: 0;
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .practice-record-container {
    padding: 12px 2vw 12px 2vw;
    min-width: 0;
  }
  .title {
    font-size: 1.5rem;
    margin-bottom: 18px;
  }
  .record-grid {
    grid-template-columns: 1fr;
    gap: 14px 0;
  }
  .recommend-list {
    grid-template-columns: 1fr;
    gap: 14px 0;
  }
  .record-header, .record-title {
    font-size: 1rem;
  }
  .record-status {
    font-size: 0.92rem;
    padding: 2px 10px;
  }
  .stats-bar {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
  }
  .stat-item {
    padding: 10px 0 8px 0;
  }
  .achievements-bar {
    gap: 8px;
    margin-bottom: 10px;
  }
  .trend-bar {
    max-width: 100%;
    padding: 8px 0 2px 0;
  }
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 18px;
  }
  .filter-input {
    width: 100%;
  }
  .motto-area {
    margin-bottom: 6px;
    margin-right: 0;
    max-width: 100%;
    font-size: 0.98rem;
    padding: 5px 8px 5px 10px;
  }
}
.modal-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-detail {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px 0 rgba(80, 112, 255, 0.18);
  padding: 32px 36px 24px 36px;
  min-width: 340px;
  max-width: 520px;
  width: 96vw;
  position: relative;
  animation: modalIn 0.2s;
}
@keyframes modalIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.modal-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #6366f1;
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #f87171;
}
.modal-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}
.modal-company {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #6366f1;
  font-weight: 500;
}
.modal-diff {
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: 500;
  background: #f1f5f9;
  color: #64748b;
}
.modal-diff.diff-1, .modal-diff.diff-2 { background: #d1fae5; color: #059669; }
.modal-diff.diff-3 { background: #fef9c3; color: #b45309; }
.modal-diff.diff-4 { background: #fee2e2; color: #dc2626; }
.modal-diff.diff-5 { background: #fca5a5; color: #b91c1c; }
.modal-tags {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.modal-explanation {
  margin-bottom: 12px;
}
.modal-ex-title {
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 4px;
}
.modal-ex-content {
  color: #64748b;
  font-size: 1.02em;
  line-height: 1.7;
}
.modal-code {
  margin-top: 10px;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.98em;
  color: #334155;
  overflow-x: auto;
}
.modal-date {
  color: #64748b;
  font-size: 0.98em;
  margin-left: 8px;
}
.modal-desc {
  margin-bottom: 12px;
}
.motto-fade-enter-active, .motto-fade-leave-active {
  transition: opacity 0.6s, transform 0.6s;
}
.motto-fade-enter-from, .motto-fade-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
.motto-fade-enter-to, .motto-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
