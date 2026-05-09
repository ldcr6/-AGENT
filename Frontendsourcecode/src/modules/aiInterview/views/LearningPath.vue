<template>
  <div class="learning-path-card">
    <ParticlesEffect />
    <!-- 路线图模块（ECharts树图/力导向图/时间轴/思维导图） -->
    <div class="module-card module-gradient mb-8">
      <div class="module-header" style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center;">
          <span class="module-icon">🗺️</span>
          <h2 class="title">学习路线图</h2>
        </div>
        <el-dropdown @command="onChartTypeChange">
          <el-button class="neon-switch-btn">
            <img src="/assets/images/qiehuan.svg" class="neon-icon" alt="切换图标" />
            切换图表
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="tree">树状图</el-dropdown-item>
              <el-dropdown-item command="timeline">时间轴</el-dropdown-item>
              <el-dropdown-item command="mindmap">思维导图</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 图表类型提示条 -->
      <div class="chart-type-tip">当前图表：{{ chartTypeLabel }}</div>
      <p class="subtitle" v-if="weakPoints && weakPoints.length">
        针对你的 <span class="highlight">{{ weakPoints.join('、') }}</span> 薄弱项，推荐如下成长路径：
      </p>
      <div class="echarts-tree-wrap">
        <v-chart
          ref="setChartRef"
          :option="currentChartOption"
          autoresize
          style="width:100%;height:600px;"
          @click="onTreeNodeClick"
          @timelinechanged="onTimelineChanged"
        />
        <div v-if="activeChartType === 'timeline'" class="timeline-step-detail">
          <div class="timeline-step-title">{{ timelineSteps[timelineIndex].title }}</div>
          <ul>
            <li v-for="(line, idx) in timelineSteps[timelineIndex].content" :key="idx">{{ line }}</li>
          </ul>
        </div>
      </div>
      <el-dialog v-model="showNodeDialog" :title="selectedNode.name" width="400px" center>
        <div v-if="selectedNode">
          <div class="node-detail-title">{{ selectedNode.name }}</div>
          <div class="node-detail-desc">{{ selectedNode.desc }}</div>
          <div v-if="selectedNode.resources && selectedNode.resources.length" class="node-detail-res">
            <div class="font-bold mb-1">推荐资源：</div>
            <ul>
              <li v-for="(res, idx) in selectedNode.resources" :key="res.title + idx">
                <a :href="res.link" target="_blank" class="resource-link">{{ res.title }}</a>
                <span class="resource-desc">{{ res.desc }}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="divider"></div>
    <!-- 推荐视频模块 -->
    <div v-if="displayVideos.length" class="module-card mb-8">
      <div class="module-header">
        <span class="module-icon">🎬</span>
        <h3 class="section-title">推荐视频</h3>
      </div>
      <div class="video-list">
        <div v-for="(video, idx) in displayVideos" :key="video.title + idx" class="video-card">
          <video v-if="video.src" controls :src="video.src" class="video-player" />
          <iframe v-else-if="video.iframe" :src="video.iframe" frameborder="0" allowfullscreen class="video-player"></iframe>
          <div class="video-info">
            <div class="video-title">{{ video.title }}</div>
            <div class="video-desc">{{ video.desc }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 推荐资料模块 -->
    <div v-if="displayResources.length" class="module-card mb-8">
      <div class="module-header">
        <span class="module-icon">📚</span>
        <h3 class="section-title">推荐资料</h3>
      </div>
      <ul class="resource-list">
        <li v-for="(res, idx) in displayResources" :key="res.title + idx" class="resource-item">
          <a :href="res.link" target="_blank" class="resource-link">{{ res.title }}</a>
          <span class="resource-desc">{{ res.desc }}</span>
        </li>
      </ul>
    </div>
   <!--  <div class="section mt-6 text-center">
      <el-button type="primary" plain>已完成本路线</el-button>
      <el-button type="success" plain>收藏</el-button>
    </div> -->
    <!-- 学习进度、打卡日历、学习徽章三栏并排 -->
    <div class="progress-calendar-badge-row">
      <LearningProgress
        :currentStage="currentStage"
        :progress="progress"
        :punchDays="punchDays"
        :totalStages="totalStages"
        :currentStageIndex="currentStageIndex"
        :nextStage="nextStage"
        @completeStage="onCompleteStage"
      />
      <PunchCalendar 
        :punchedDays="[]" 
        
      />
      <div class="vertical-divider"></div>
      <LearningBadges :currentStageIndex="currentStageIndex" :totalStages="totalStages" />
    </div>
      <!-- 页脚 -->
      <PageFooter />
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import VChart from 'vue-echarts';
import LearningProgress from './LearningProgress.vue';
import PunchCalendar from './PunchCalendar.vue';
import LearningBadges from './LearningBadges.vue';
import 'echarts/lib/chart/tree';
import 'echarts/lib/chart/graph';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/timeline';
import PageFooter from '../../../components/PageFooter.vue';
import ParticlesEffect from '../../question/views/ParticlesEffect.vue';

export default defineComponent({
  name: 'LearningPath',
  components: { VChart, LearningProgress, PunchCalendar, LearningBadges, PageFooter, ParticlesEffect },
  props: {
    weakPoints: {
      type: Array,
      default: () => ['表达能力', '自信程度']
    },
    paths: {
      type: Array,
      default: () => [
        { title: '基础表达训练', desc: '掌握结构化表达方法，如STAR法则、金字塔原理' },
        { title: '实战演练', desc: '模拟面试答题，录音回听，找出表达问题' },
        { title: '高阶提升', desc: '参加公开演讲、辩论或Toastmasters等活动' }
      ]
    },
    videos: {
      type: Array,
      default: () => [
        { title: '结构化表达力提升', desc: '系统学习表达结构', iframe: 'https://player.bilibili.com/player.html?bvid=BV1mq4y137p6&autoplay=0' },
        { title: 'TED演讲精选', desc: '学习顶级演讲者的表达技巧', iframe: 'https://player.bilibili.com/player.html?bvid=BV1WVTkzFEkd&autoplay=0' },
        // 专业相关
        { title: 'Java基础入门', desc: 'Java核心语法与面向对象', iframe: 'https://player.bilibili.com/player.html?bvid=BV1PY411e7J6&autoplay=0' },
        { title: 'MySQL数据库实战', desc: '数据库原理与SQL优化', iframe: 'https://player.bilibili.com/player.html?bvid=BV1Kb411W75N&autoplay=0' },
        { title: '系统设计面试精讲', desc: '高并发与分布式架构', iframe: 'https://player.bilibili.com/player.html?bvid=BV1BQS2YtEZ5&autoplay=0' },
        { title: '网络安全与协议', desc: 'HTTP、TCP/IP与Web安全', iframe: 'https://player.bilibili.com/player.html?bvid=BV1Pi4y157DX&autoplay=0' }
      ]
    },
    resources: {
      type: Array,
      default: () => [
        { title: '《金字塔原理》', desc: '表达与思考的经典书籍', link: 'https://book.douban.com/subject/1084336/' },
        { title: 'TED演讲精选', desc: '学习顶级演讲者的表达技巧', link: 'https://www.ted.com/talks' },
        { title: '结构化表达力课程', desc: '网易云课堂优质课程', link: 'https://study.163.com/course/introduction/1004176043.htm' },
        // 专业相关
        { title: 'Java核心技术 卷I', desc: 'Java基础与面向对象编程权威书籍', link: 'https://book.douban.com/subject/26880667/' },
        { title: 'MySQL必知必会', desc: '数据库入门与实战经典', link: 'https://book.douban.com/subject/23008813/' },
        { title: '系统设计入门', desc: '系统设计面试高频知识与案例', link: 'https://github.com/donnemartin/system-design-primer' },
        { title: '图解HTTP', desc: '通俗易懂的HTTP协议入门书', link: 'https://book.douban.com/subject/25863515/' },
        { title: 'Redis设计与实现', desc: 'Redis原理与应用深度解析', link: 'https://book.douban.com/subject/25900156/' },
        { title: '剑指Offer', desc: '经典面试算法题集', link: 'https://book.douban.com/subject/27008702/' },
        { title: 'Web安全攻防', desc: '常见Web安全问题与防护', link: 'https://book.douban.com/subject/26827208/' }
      ]
    }
  },
  setup(props) {
    // mock 知识树数据
    const treeData = {
      name: '成长路径',
      desc: '表达能力与后端面试能力双提升',
      children: [
        {
          name: '表达能力',
          symbol: 'circle',
          itemStyle: { color: '#6366f1' },
          desc: '提升表达清晰度、逻辑性和自信心，是面试和职场沟通的基础能力。',
          children: [
            {
              name: '结构化表达',
              desc: '掌握结构化表达方法，如STAR法则、金字塔原理，提升条理性。',
              itemStyle: { color: '#a21caf' },
              resources: [
                { title: '结构化表达力课程', desc: '网易云课堂优质课程', link: 'https://study.163.com/course/introduction/1004176043.htm' }
              ],
              children: [
                { name: 'STAR法则', desc: '情境-任务-行动-结果，帮助你有逻辑地讲述经历。', itemStyle: { color: '#f59e42' } },
                { name: '金字塔原理', desc: '自上而下表达观点，先结论后分论点，逻辑清晰。', itemStyle: { color: '#f472b6' } }
              ]
            },
            {
              name: '案例讲述',
              desc: '用真实案例和数据支撑观点，增强说服力。',
              itemStyle: { color: '#10b981' },
              children: [
                { name: '数据支撑', desc: '用数据和事实增强表达的可信度。', itemStyle: { color: '#60a5fa' } },
                { name: '故事化表达', desc: '用故事吸引听众，提升表达感染力。', itemStyle: { color: '#fbbf24' } }
              ]
            },
            {
              name: '语言流畅性',
              desc: '减少口头禅，语速适中，表达自然流畅。',
              itemStyle: { color: '#f43f5e' },
              children: [
                { name: '语速训练', desc: '通过练习控制语速，让表达更清晰易懂。', itemStyle: { color: '#6366f1' } },
                { name: '口头禅减少', desc: '避免“嗯”“啊”等口头禅，提升专业感。', itemStyle: { color: '#a3e635' } }
              ]
            }
          ]
        },
        {
          name: '后端面试能力',
          desc: '系统掌握后端开发核心知识，提升面试竞争力',
          tips: '建议系统梳理知识体系，注重实战与项目经验。',
          children: [
            {
              name: '编程基础',
              desc: '掌握主流后端语言（如Java、Python、Go）及其语法、面向对象思想',
              tips: '多刷LeetCode基础题，熟悉常用API和语法细节。',
              resources: [
                { title: 'Java官方文档', desc: '权威Java语法与API参考', link: 'https://docs.oracle.com/javase/8/docs/' },
                { title: 'LeetCode算法题库', desc: '刷题提升编程能力', link: 'https://leetcode.cn/' }
              ],
              children: [
                { name: 'Java基础', desc: '掌握类、对象、继承、多态、接口等核心语法。', tips: '理解JVM内存模型和异常处理。', resources: [ { title: 'Java核心技术卷I', desc: '经典Java入门书籍', link: 'https://book.douban.com/subject/26880667/' } ] },
                { name: '数据结构', desc: '熟悉数组、链表、栈、队列、哈希表等常用数据结构。', tips: '手写常用数据结构代码。', resources: [ { title: '数据结构与算法之美', desc: '极客时间专栏', link: 'https://time.geekbang.org/column/intro/100017301' } ] },
                { name: '算法基础', desc: '掌握排序、查找、递归、动态规划等常见算法。', tips: '多做面试高频算法题。', resources: [ { title: '剑指Offer', desc: '经典面试算法题集', link: 'https://book.douban.com/subject/27008702/' } ] }
              ]
            },
            {
              name: '数据库',
              desc: '理解关系型数据库（MySQL）与非关系型数据库（Redis、MongoDB）原理与应用。',
              tips: '重点掌握SQL优化与事务机制。',
              resources: [
                { title: 'MySQL必知必会', desc: '数据库入门经典', link: 'https://book.douban.com/subject/23008813/' },
                { title: 'Redis官方文档', desc: 'NoSQL缓存数据库', link: 'https://redis.io/documentation' }
              ],
              children: [
                { name: 'SQL语句', desc: '熟练编写增删改查、联表、分组等SQL语句。', tips: '多练习复杂查询和索引优化。', resources: [ { title: 'SQL练习平台', desc: '在线SQL实战', link: 'https://www.sqlfiddle.com/' } ] },
                { name: '事务与锁', desc: '理解ACID、隔离级别、乐观锁/悲观锁等数据库事务机制。', tips: '能举例说明事务并发问题。', resources: [ { title: 'MySQL事务与锁机制', desc: '深入理解事务', link: 'https://juejin.cn/post/6844904065483898894' } ] },
                { name: 'Redis应用', desc: '掌握缓存、分布式锁、持久化等Redis常用场景。', tips: '了解缓存穿透/击穿/雪崩。', resources: [ { title: 'Redis设计与实现', desc: 'Redis原理解析', link: 'https://book.douban.com/subject/25900156/' } ] }
              ]
            },
            {
              name: '系统设计',
              desc: '掌握常见后端架构模式、分布式系统、微服务等设计思想。',
              tips: '多画系统架构图，理解高并发、高可用设计。',
              resources: [
                { title: '系统设计入门', desc: '面试常考系统设计知识', link: 'https://github.com/donnemartin/system-design-primer' },
                { title: '微服务架构设计模式', desc: '微服务实战', link: 'https://book.douban.com/subject/30329536/' }
              ],
              children: [
                { name: '高并发', desc: '掌握限流、缓存、异步解耦等高并发方案。', tips: '能举例说明高并发场景。', resources: [ { title: '高性能MySQL', desc: '数据库高并发优化', link: 'https://book.douban.com/subject/23008813/' } ] },
                { name: '分布式', desc: '理解分布式事务、CAP理论、服务注册与发现等核心概念。', tips: '了解常见分布式中间件。', resources: [ { title: '分布式系统常见面试题', desc: '面试高频分布式问题', link: 'https://juejin.cn/post/6844904065483898894' } ] },
                { name: '微服务', desc: '掌握Spring Cloud/Dubbo等微服务框架的基本原理和应用。', tips: '理解服务拆分与治理。', resources: [ { title: 'Spring Cloud微服务实战', desc: '微服务开发指南', link: 'https://book.douban.com/subject/30280098/' } ] }
              ]
            },
            {
              name: '网络与安全',
              desc: '理解HTTP、TCP/IP协议，掌握常见Web安全防护措施。',
              tips: '能分析请求过程，了解常见攻击与防护。',
              resources: [
                { title: '图解HTTP', desc: '通俗易懂的HTTP入门书', link: 'https://book.douban.com/subject/25863515/' },
                { title: 'Web安全攻防', desc: '常见Web安全问题与防护', link: 'https://book.douban.com/subject/26827208/' }
              ],
              children: [
                { name: 'HTTP协议', desc: '掌握请求方法、状态码、Cookie/Session等基础知识。', tips: '能手写HTTP报文。', resources: [ { title: 'MDN HTTP文档', desc: '权威HTTP协议说明', link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP' } ] },
                { name: '网络基础', desc: '理解TCP/IP、三次握手、四次挥手等网络通信流程。', tips: '能画出网络通信流程图。', resources: [ { title: 'TCP/IP详解', desc: '网络协议经典书籍', link: 'https://book.douban.com/subject/1088054/' } ] },
                { name: '安全防护', desc: '了解XSS、SQL注入、CSRF等攻击及防护措施。', tips: '能举例说明安全漏洞。', resources: [ { title: 'OWASP Top 10', desc: 'Web安全十大风险', link: 'https://owasp.org/www-project-top-ten/' } ] }
              ]
            }
          ]
        }
      ]
    };
    // ECharts option - 树状图
    const treeOption = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: '#fff',
        borderColor: '#b4cafe',
        borderWidth: 1,
        textStyle: { color: '#374151' },
        formatter: params => {
          return `<b>${params.data.name}</b><br/>${params.data.desc || ''}`;
        }
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          top: '5%',
          left: '10%',
          bottom: '5%',
          right: '20%',
          symbolSize: 36,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 17,
            fontWeight: 600,
            color: '#4b5563',
            backgroundColor: 'rgba(210,224,255,0.7)',
            borderRadius: 10,
            padding: [6, 14],
            shadowColor: '#c7d2fe',
            shadowBlur: 6
          },
          leaves: {
            label: {
              fontSize: 15,
              color: '#64748b',
              fontWeight: 500,
              backgroundColor: 'rgba(186,230,253,0.7)',
              borderRadius: 8,
              padding: [4, 10],
              shadowColor: '#bae6fd',
              shadowBlur: 4
            }
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 1,
              colorStops: [
                { offset: 0, color: '#b4cafe' },
                { offset: 1, color: '#a7f3d0' }
              ]
            },
            width: 3,
            curveness: 0.5,
            shadowColor: '#c7d2fe',
            shadowBlur: 6
          },
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5, y: 0.5, r: 0.8,
              colorStops: [
                { offset: 0, color: '#e0e7ff' },
                { offset: 1, color: '#bae6fd' }
              ]
            },
            shadowColor: '#c7d2fe',
            shadowBlur: 12,
            borderColor: '#fff',
            borderWidth: 3
          },
          emphasis: {
            focus: 'descendant',
            itemStyle: {
              borderColor: '#38bdf8',
              borderWidth: 5,
              shadowColor: '#a7f3d0',
              shadowBlur: 18
            },
            label: {
              color: '#2563eb',
              backgroundColor: 'rgba(186,230,253,0.9)',
              fontSize: 18
            }
          },
          expandAndCollapse: true,
          animationDuration: 1000,
          animationDurationUpdate: 600,
          initialTreeDepth: 2,
          roam: false
        }
      ]
    };
    // ECharts option - 时间轴
    const timelineOption = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 2500,
          data: ['基础表达', '实战演练', '高阶提升'],
          label: { color: '#6366f1', fontWeight: 600 },
          lineStyle: { color: '#a7f3d0' },
          controlStyle: { color: '#6366f1', borderColor: '#a7f3d0' },
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['基础表达', '实战演练', '高阶提升'],
          axisLabel: { color: '#6366f1', fontWeight: 600 }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 3,
          axisLabel: { color: '#6366f1' },
          name: '能力成长指数',
          nameTextStyle: {
            fontSize: 18,
            color: '#6366f1',
            fontWeight: 'bold',
            padding: [0, 0, 10, 0]
          }
        },
        series: [
          {
            type: 'line',
            data: [1, 2, 3],
            smooth: true,
            lineStyle: { color: '#6366f1', width: 4 },
            itemStyle: { color: '#a7f3d0', borderColor: '#6366f1', borderWidth: 2 },
            label: { show: true, color: '#6366f1', fontWeight: 600 },
            areaStyle: { color: 'rgba(99,102,241,0.08)' }
          }
        ]
      },
      options: [
        {
          series: [{ data: [1, null, null] }]
        },
        {
          series: [{ data: [1, 2, null] }]
        },
        {
          series: [{ data: [1, 2, 3] }]
        }
      ]
    };
    // ECharts option - 思维导图（更有辨识度）
    const mindmapData = {
      name: '成长知识图谱',
      desc: '表达能力+后端面试能力，助力全面成长',
      children: [
        {
          name: '表达能力',
          children: [
            { name: '结构化表达', children: [ { name: 'STAR法则' }, { name: '金字塔原理' } ] },
            { name: '案例讲述', children: [ { name: '数据支撑' }, { name: '故事化表达' } ] },
            { name: '语言流畅性', children: [ { name: '语速训练' }, { name: '口头禅减少' } ] }
          ]
        },
        {
          name: '后端面试',
          desc: '涵盖后端面试常考知识点，助力系统复习',
          children: [
            { name: '编程基础', desc: 'Java/Python/Go语法、数据结构与算法', tips: '多刷题，注重代码规范。', resources: [ { title: 'LeetCode', desc: '算法刷题平台', link: 'https://leetcode.cn/' } ],
              children: [ { name: 'Java基础', desc: '面向对象、异常、集合等', tips: '理解JVM原理。' }, { name: '算法', desc: '排序、查找、动态规划', tips: '掌握常见算法模板。' } ] },
            { name: '数据库', desc: 'MySQL/Redis等数据库原理与实战', tips: '重点掌握SQL优化。', resources: [ { title: 'MySQL必知必会', desc: '数据库入门经典', link: 'https://book.douban.com/subject/23008813/' } ],
              children: [ { name: 'SQL优化', desc: '索引、慢查询、事务', tips: '能分析执行计划。' }, { name: 'Redis', desc: '缓存、持久化、分布式锁', tips: '了解缓存穿透。' } ] },
            { name: '系统设计', desc: '高并发、分布式、微服务架构', tips: '多画架构图，理解常见模式。', resources: [ { title: '系统设计入门', desc: '面试常考系统设计知识', link: 'https://github.com/donnemartin/system-design-primer' } ],
              children: [ { name: '高并发', desc: '限流、异步、缓存', tips: '能举例高并发场景。' }, { name: '微服务', desc: '服务拆分、注册与发现', tips: '理解服务治理。' } ] },
            { name: '网络与安全', desc: 'HTTP、TCP/IP协议与Web安全', tips: '能分析请求过程，了解常见攻击。', resources: [ { title: '图解HTTP', desc: '通俗易懂的HTTP入门书', link: 'https://book.douban.com/subject/25863515/' } ],
              children: [ { name: 'HTTP协议', desc: '请求方法、状态码', tips: '能手写HTTP报文。' }, { name: '安全防护', desc: 'XSS、SQL注入、CSRF', tips: '能举例安全漏洞。' } ] }
          ]
        }
      ]
    };
    const mindmapOption = {
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'tree',
          data: [mindmapData],
          top: '5%',
          left: '5%',
          bottom: '5%',
          right: '5%',
          symbol: 'circle',
          symbolSize: 44,
          layout: 'radial', // 中心放射
          label: {
            rotate: 0,
            fontSize: 16,
            color: '#6366f1',
            fontWeight: 700
          },
          leaves: {
            label: {
              fontSize: 15,
              color: '#6366f1',
              fontWeight: 600
            }
          },
          lineStyle: {
            color: '#a7f3d0',
            width: 4,
            curveness: 0.7
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 4,
            shadowColor: '#a7f3d0',
            shadowBlur: 10
          },
          expandAndCollapse: true,
          animationDuration: 800,
          animationDurationUpdate: 400,
          initialTreeDepth: 2,
          roam: false
        }
      ]
    };
    // 图表类型切换
    const activeChartType = ref('tree');
    const currentChartOption = computed(() => {
      if (activeChartType.value === 'tree') return treeOption;
      if (activeChartType.value === 'timeline') return timelineOption;
      if (activeChartType.value === 'mindmap') return mindmapOption;
      return treeOption;
    });
    function onChartTypeChange(type) {
      activeChartType.value = type;
    }
    // 节点点击弹窗
    const showNodeDialog = ref(false);
    const selectedNode = ref({});
    function onTreeNodeClick(params) {
      if (params && params.data) {
        selectedNode.value = params.data;
        showNodeDialog.value = true;
      }
    }
    // 图表类型提示
    const chartTypeLabel = computed(() => {
      if (activeChartType.value === 'tree') return '树状图';
      if (activeChartType.value === 'timeline') return '时间轴';
      if (activeChartType.value === 'mindmap') return '思维导图';
      return '';
    });
    const timelineSteps = [
      {
        title: '基础表达训练',
        content: [
          '目标：掌握结构化表达方法',
          '内容：学习STAR法则、金字塔原理',
          '建议：每天练习表达10分钟'
        ]
      },
      {
        title: '实战演练',
        content: [
          '目标：提升实战能力',
          '内容：模拟面试答题，录音回听',
          '建议：每周至少2次模拟'
        ]
      },
      {
        title: '高阶提升',
        content: [
          '目标：突破表达瓶颈',
          '内容：参加公开演讲、辩论等',
          '建议：主动参与公开活动'
        ]
      }
    ];
    // 阶段联动核心变量
    const totalStages = timelineSteps.length;
    const currentStageIndex = ref(0);
    const progress = computed(() => Math.round((currentStageIndex.value) / totalStages * 100));
    const currentStage = computed(() =>
      currentStageIndex.value < totalStages
        ? timelineSteps[currentStageIndex.value].title
        : timelineSteps[totalStages - 1].title
    );
    const nextStage = computed(() =>
      currentStageIndex.value < totalStages - 1
        ? timelineSteps[currentStageIndex.value + 1].title
        : ''
    );
    const punchDays = ref(7);
    // timelineIndex 联动
    const timelineIndex = ref(0);
    // v-chart ref
    const chartRef = ref();
    // timeline 步进联动
    function onTimelineChanged(e) {
      timelineIndex.value = e.currentIndex;
      currentStageIndex.value = e.currentIndex;
    }
    // 完成本阶段
    function onCompleteStage() {
      if (currentStageIndex.value < totalStages) {
        currentStageIndex.value++;
        timelineIndex.value = Math.min(currentStageIndex.value, totalStages - 1);
        // 主动 setOption 步进 timeline
        if (activeChartType.value === 'timeline' && chartRef.value) {
          nextTick(() => {
            chartRef.value.dispatchAction({ type: 'timelineChange', currentIndex: timelineIndex.value });
          });
        }
      }
    }
    // v-chart 绑定
    function setChartRef(el) {
      chartRef.value = el;
    }

    // 智能推荐视频映射
    const videoMap = {
      '表达能力': [
        { title: '结构化表达力提升', desc: '系统学习表达结构', iframe: 'https://player.bilibili.com/player.html?bvid=BV1mq4y137p6&autoplay=0' },
        { title: 'TED演讲精选', desc: '学习顶级演讲者的表达技巧', iframe: 'https://player.bilibili.com/player.html?bvid=BV1WVTkzFEkd&autoplay=0' }
      ],
      '自信程度': [
        { title: '自信心训练', desc: '心理建设与自信提升', iframe: 'https://player.bilibili.com/player.html?bvid=BV13t4y1m7ro&autoplay=0' }
      ],
      // 专业相关
      '后端面试能力': [
        { title: 'Java基础入门', desc: 'Java核心语法与面向对象', iframe: 'https://player.bilibili.com/player.html?bvid=BV1PY411e7J6&autoplay=0' },
        { title: 'MySQL数据库实战', desc: '数据库原理与SQL优化', iframe: 'https://player.bilibili.com/player.html?bvid=BV1Kb411W75N&autoplay=0' },
        { title: '系统设计面试精讲', desc: '高并发与分布式架构', iframe: 'https://player.bilibili.com/player.html?bvid=BV1BQS2YtEZ5&autoplay=0' },
        { title: '网络安全与协议', desc: 'HTTP、TCP/IP与Web安全', iframe: 'https://player.bilibili.com/player.html?bvid=BV1Pi4y157DX&autoplay=0' }
      ],
      // 可继续扩展其它薄弱项
      'default': [
        { title: '高效学习方法', desc: '提升学习效率的技巧', iframe: 'https://player.bilibili.com/player.html?bvid=BV16T4y1k7dB&autoplay=0' },
        { title: 'Java基础入门', desc: 'Java核心语法与面向对象', iframe: 'https://player.bilibili.com/player.html?bvid=BV1PY411e7J6&autoplay=0' },
        { title: 'MySQL数据库实战', desc: '数据库原理与SQL优化', iframe: 'https://player.bilibili.com/player.html?bvid=BV1Kb411W75N&autoplay=0' },
        { title: '系统设计面试精讲', desc: '高并发与分布式架构', iframe: 'https://player.bilibili.com/player.html?bvid=BV1BQS2YtEZ5&autoplay=0' },
        { title: '网络安全与协议', desc: 'HTTP、TCP/IP与Web安全', iframe: 'https://player.bilibili.com/player.html?bvid=BV1Pi4y157DX&autoplay=0' }
      ]
    };

    // 根据薄弱项推荐视频
    const displayVideos = computed(() => {
      const set = new Set();
      const result = [];
      Object.values(videoMap).flat().forEach(video => {
        if (!set.has(video.title)) {
          set.add(video.title);
          result.push(video);
        }
      });
      return result;
    });

    return {
      treeOption,
      timelineOption,
      mindmapOption,
      activeChartType,
      currentChartOption,
      showNodeDialog,
      selectedNode,
      onTreeNodeClick,
      onChartTypeChange,
      chartTypeLabel,
      timelineSteps,
      timelineIndex,
      onTimelineChanged,
      currentStage,
      progress,
      punchDays,
      totalStages,
      currentStageIndex,
      nextStage,
      onCompleteStage,
      setChartRef,
      displayVideos,
    };
  },
  computed: {
    displayPath() {
      return this.paths;
    },
    displayResources() {
      return this.resources;
    }
  }
});
</script>

<style scoped>
.learning-path-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(99,102,241,0.10);
  padding: 1.5rem 0.5rem;
}
.module-card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.06);
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  margin-bottom: 0;
  position: relative;
}
.module-gradient {
  /* background: linear-gradient(120deg, #e0e7ff 0%, #ffffff 100%); */
  box-shadow: 0 4px 24px rgba(99,102,241,0.10);
}
.module-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
}
.module-icon {
  font-size: 2.1rem;
  margin-right: 0.7rem;
  filter: drop-shadow(0 2px 8px #a5b4fc44);
}
.divider {
  height: 2px;
  background: linear-gradient(90deg, #a5b4fc 0%, #f3e8ff 100%);
  border-radius: 1px;
  margin: 2.2rem 0 2.2rem 0;
  opacity: 0.7;
}
.title {
  font-size: 2.1rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 0;
}
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #6366f1;
  margin-bottom: 0;
}
.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}
.highlight {
  color: #a21caf;
  font-weight: 600;
}
.echarts-tree-wrap {
  width: 100%;
  min-height: 420px;
  background: linear-gradient(
    270deg,
    rgba(240,247,255,0.3),
    rgba(224,231,255,0.3),
    rgba(186,230,253,0.3),
    rgba(167,243,208,0.3),
    rgba(240,247,255,0.3)
  );
  background-size: 400% 400%;
  animation: flowing-gradient 12s ease-in-out infinite;
  border-radius: 14px;
  box-shadow: 0 2px 16px 2px rgba(186,230,253,0.10), 0 2px 8px rgba(99,102,241,0.06);
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  overflow: auto;
  position: relative;
  transition: box-shadow 0.3s;
}
@keyframes flowing-gradient {
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
.echarts-tree-wrap:hover {
  box-shadow: 0 8px 32px 4px rgba(186,230,253,0.18), 0 4px 16px rgba(99,102,241,0.10);
}
.node-detail-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 0.5rem;
}
.node-detail-desc {
  color: #374151;
  margin-bottom: 0.7rem;
}
.node-detail-res {
  margin-top: 0.5rem;
}
.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;
}
.video-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.08);
  padding: 1.2rem;
  width: 320px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}
.video-card:hover {
  box-shadow: 0 6px 24px rgba(99,102,241,0.16);
}
.video-player {
  width: 280px;
  height: 158px;
  border-radius: 8px;
  margin-bottom: 0.7rem;
  background: #000;
}
.video-info {
  text-align: center;
}
.video-title {
  font-weight: 600;
  color: #374151;
  font-size: 1.08rem;
}
.video-desc {
  font-size: 1rem;
  color: #6b7280;
}
.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.resource-item {
  background: #f3f4f6;
  border-radius: 8px;
  margin-bottom: 1.1rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 1px 4px rgba(99,102,241,0.04);
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex: 1 1 calc(33.333% - 2rem);
  max-width: calc(33.333% - 2rem);
  min-width: 260px;
  box-sizing: border-box;
}
@media (max-width: 1200px) {
  .resource-item {
    flex: 1 1 calc(50% - 2rem);
    max-width: calc(50% - 2rem);
  }
}
@media (max-width: 700px) {
  .resource-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
.resource-link {
  color: #6366f1;
  font-weight: 500;
  margin-right: 0.5rem;
  text-decoration: underline;
}
.resource-desc {
  color: #6b7280;
  font-size: 1rem;
}
.el-steps {
  margin-bottom: 2.5rem;
}
.el-step__title {
  font-size: 1.15rem !important;
}
.el-step__description {
  font-size: 1.05rem !important;
}
.neon-switch-btn {
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0.6rem 1.8rem;
  border: none;
  border-radius: 2rem;
  background: linear-gradient(90deg, #b4cafe 0%, #e0e7ff 100%);
  color: #3b3b4f;
  box-shadow: 0 2px 12px 0 rgba(99,102,241,0.10);
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
}
.neon-switch-btn:hover {
  box-shadow: 0 4px 24px 0 rgba(99,102,241,0.16);
  transform: scale(1.04);
}
.neon-icon {
  width: 1.4em;
  height: 1.4em;
  min-width: 1.4em;
  min-height: 1.4em;
  max-width: 1.6em;
  max-height: 1.6em;
  margin-right: 0.4em;
  vertical-align: middle;
  display: inline-block;
  object-fit: contain;
  color: #6366f1;
}
.chart-type-tip {
  font-size: 1.1rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 0.7rem;
  margin-top: 0.2rem;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  border-radius: 8px;
  padding: 0.3em 1.2em;
  display: inline-block;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.06);
}
.timeline-step-detail {
  margin-top: 1.2em;
  text-align: center;
}
.timeline-step-title {
  font-size: 1.3em;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 0.5em;
}
.timeline-step-detail ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #374151;
  font-size: 1.1em;
}
.timeline-step-detail li {
  margin-bottom: 0.3em;
}
.progress-calendar-row {
  display: flex;
  gap: 2.2rem;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}
.progress-calendar-badge-row {
  display: flex;
  gap: 2.2rem;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}
.vertical-divider {
  width: 4px;
  min-width: 4px;
  height: 335px;
  background: linear-gradient(180deg, #a7f3d0 0%, #e0e7ff 50%, #f3e8ff 100%);
  border-radius: 8px;
  margin: 0 1.2rem;
  box-shadow: 0 2px 12px 0 rgba(99,102,241,0.08);
  align-self: stretch;
  transition: background 0.3s;
}
@media (max-width: 1200px) {
  .vertical-divider {
    width: 100%;
    min-width: 0;
    height: 4px;
    margin: 1.2rem 0;
    background: linear-gradient(90deg, #a7f3d0 0%, #e0e7ff 50%, #f3e8ff 100%);
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(99,102,241,0.08);
  }
}
@media (max-width: 900px) {
  .progress-calendar-row {
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 1.2rem;
  }
}
@media (max-width: 1200px) {
  .learning-path-card {
    max-width: 98vw;
    padding: 1.5rem 0.5rem;
  }
  .video-list {
    flex-direction: column;
    gap: 1.2rem;
  }
  .video-card, .video-player {
    width: 100%;
    min-width: 0;
  }
  .video-player {
    height: 160px;
  }
  .module-card {
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }
  .progress-calendar-badge-row {
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 1.2rem;
  }
}
</style>