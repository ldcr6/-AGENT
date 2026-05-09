<template>
    <HeaderBar />
    <div class="xuexitu">
        <LearningRoadmap
            v-if="stages.length === 1"
            :roadmapData="getCurrentRoadmap(stages[0].name)"
            :title="getCurrentTitle(stages[0].name)"
            :subtitle="getCurrentSubtitle(stages[0].name)"
        />
    </div>
   
    <div class="learning-path-container">
        <div class="main-content-row">
            <!-- 左侧学科导航 -->
            <div class="subject-sidenav">
                <div class="sidenav-title">热门学科视频教程</div>
                <div
                    v-for="stage in allStages"
                    :key="stage.id"
                    class="sidenav-item"
                    :class="{ active: stage.id === currentStageId }"
                    @click="selectSubject(stage)"
                >
                    {{ stage.name }}
                    <span v-if="stage.id === currentStageId" class="arrow">&gt;</span>
                </div>
            </div>
            
            <!-- 右侧主内容 -->
            <div class="main-content">
                <!-- 阶段导航区 -->
                <StageNav
                    :stages="stages"
                    :currentStageId="currentStageId"
                    @changeStage="changeStage"
                />

                <!-- 搜索框 -->
              <!--   <div class="search-container">
                    <input
                        type="text"
                        v-model="searchKeyword"
                        placeholder="搜索知识点"
                        @input="filterKnowledges"
                    />
                </div> -->

                <!-- 学习统计信息 -->
                <div class="learning-stats">
                    <div class="stat-item total">
                        <span class="stat-icon">📚</span>
                        <span class="stat-label">总知识点</span>
                        <span class="stat-value">{{ totalKnowledges }}</span>
                    </div>
                    <div class="stat-item mastered">
                        <span class="stat-icon">✅</span>
                        <span class="stat-label">已掌握</span>
                        <span class="stat-value">{{ masteredKnowledges }}</span>
                    </div>
                    <div class="stat-item learning">
                        <span class="stat-icon">⏳</span>
                        <span class="stat-label">学习中</span>
                        <span class="stat-value">{{ learningKnowledges }}</span>
                    </div>
                    <div class="stat-item pending">
                        <span class="stat-icon">🕒</span>
                        <span class="stat-label">未开始</span>
                        <span class="stat-value">{{ pendingKnowledges }}</span>
                    </div>
                </div>

                <!-- 知识点列表区 -->
                <section class="knowledge-grid">
                    <KnowledgeCard
                        v-for="knowledge in filteredKnowledges"
                        :key="knowledge.id"
                        :knowledge="knowledge"
                        :statusMap="statusMap"
                        @updateStatus="updateStatus"
                        @openResource="openResource"
                    />
                </section>

                <!-- 底部操作栏 -->
                <div class="bottom-bar">
                    <button class="btn bar-btn">标记今日学习</button>
                    <button class="btn bar-btn">生成学习报告</button>
                    <button class="btn bar-btn">反馈问题</button>
                </div>

              

                <!-- 资源弹窗 -->
                <ResourceModal
                    :show="showResource"
                    :resourceList="resourceList"
                    @close="showResource = false"
                />

                <!-- 提示信息 -->
                <div v-if="!filteredKnowledges.length" class="no-results">
                    未找到相关知识点，请尝试其他关键词。
                </div>
            </div>
            
        </div>
          <!-- 新增：学习工具与技术文章模块 -->
          <div class="tool-article-section">
                    <div class="tool-list">
                        <div class="section-header">
                            <span>热门学习工具</span>
                            <a href="#" class="more-link">查看更多 &gt;</a>
                        </div>
                        <div v-for="tool in hotTools" :key="tool.id" class="tool-item">
                            <img :src="tool.icon" class="tool-icon" />
                            <div class="tool-info">
                                <div class="tool-title">{{ tool.name }}</div>
                                <div class="tool-desc">{{ tool.desc }}</div>
                                <div class="tool-tags">
                                    <span class="download-btn">立即下载</span>
                                    <span class="tool-type">{{ tool.type }}</span>
                                    <span class="tool-downloads">{{ tool.downloads }}人已下载</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="article-list">
                        <div class="section-header">
                            <span>近期技术文章</span>
                            <a href="#" class="more-link">查看更多 &gt;</a>
                        </div>
                        <div v-for="article in hotArticles" :key="article.id" class="article-item">
                            <div class="article-date">
                                <div class="date-day">{{ article.day }}</div>
                                <div class="date-month">{{ article.month }}</div>
                            </div>
                            <div class="article-info">
                                <div class="article-title">{{ article.title }}</div>
                                <div class="article-meta">
                                    <span class="article-type">{{ article.type }}</span>
                                    <span class="article-views">浏览{{ article.views }}人</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
    </div>
    <FooterBar />
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBar from '../components/HeaderBar.vue'
import FooterBar from '../components/FooterBar.vue'
import StageNav from '../components/StageNav.vue'
import KnowledgeCard from '../components/KnowledgeCard.vue'
import ResourceModal from '../components/ResourceModal.vue'
import LearningRoadmap from '../components/LearningRoadmap.vue'

// 状态映射
const statusMap = {
    pending: '未开始',
    learning: '学习中',
    done: '已掌握'
}

// 模拟数据
const allStages = [
    {
        id: 1,
        name: 'JavaEE',
        desc: '企业级Java开发核心技术',
        progress: 60,
        knowledges: [
            { id: 101, title: 'Java基础', status: 'done', resources: { 视频: 'https://xxx.com/java1' } },
            { id: 102, title: 'Spring框架', status: 'learning', resources: { 视频: 'https://xxx.com/spring' } },
            { id: 103, title: 'MyBatis', status: 'pending', resources: { 视频: 'https://xxx.com/mybatis' } },
            { id: 104, title: 'Java多线程', status: 'pending', resources: { 视频: 'https://xxx.com/java-thread' } },
            { id: 105, title: 'Java网络编程', status: 'pending', resources: { 视频: 'https://xxx.com/java-network' } }
        ]
    },
    {
        id: 2,
        name: '前端',
        desc: '网页与前端框架开发基础',
        progress: 40,
        knowledges: [
            { id: 201, title: 'HTML基础', status: 'done', resources: { 视频: 'https://xxx.com/html1' } },
            { id: 202, title: 'CSS布局', status: 'learning', resources: { 视频: 'https://xxx.com/css1' } },
            { id: 203, title: 'JS语法', status: 'pending', resources: { 视频: 'https://xxx.com/js1' } },
            { id: 204, title: 'Vue.js框架', status: 'pending', resources: { 视频: 'https://xxx.com/vue' } },
            { id: 205, title: 'React.js框架', status: 'pending', resources: { 视频: 'https://xxx.com/react' } }
        ]
    },
    {
        id: 3,
        name: '数据库',
        desc: '数据存储与管理技术',
        progress: 20,
        knowledges: [
            { id: 301, title: 'MySQL基础', status: 'pending', resources: { 视频: 'https://xxx.com/mysql' } },
            { id: 302, title: 'Oracle数据库', status: 'pending', resources: { 视频: 'https://xxx.com/oracle' } },
            { id: 303, title: 'MongoDB', status: 'pending', resources: { 视频: 'https://xxx.com/mongodb' } }
        ]
    },
    // 新增学科
    {
        id: 4,
        name: '人工智能',
        desc: 'AI与机器学习核心知识',
        progress: 10,
        knowledges: [
            { id: 401, title: '机器学习基础', status: 'pending', resources: { 视频: 'https://xxx.com/ml' } },
            { id: 402, title: '深度学习', status: 'pending', resources: { 视频: 'https://xxx.com/dl' } },
            { id: 403, title: '自然语言处理', status: 'pending', resources: { 视频: 'https://xxx.com/nlp' } }
        ]
    },
    {
        id: 5,
        name: '大数据',
        desc: '大规模数据处理与分析',
        progress: 0,
        knowledges: [
            { id: 501, title: 'Hadoop入门', status: 'pending', resources: { 视频: 'https://xxx.com/hadoop' } },
            { id: 502, title: 'Spark基础', status: 'pending', resources: { 视频: 'https://xxx.com/spark' } }
        ]
    },
    {
        id: 6,
        name: '网络安全',
        desc: '信息安全与防护技术',
        progress: 0,
        knowledges: [
            { id: 601, title: '信息安全基础', status: 'pending', resources: { 视频: 'https://xxx.com/security' } },
            { id: 602, title: '加密技术', status: 'pending', resources: { 视频: 'https://xxx.com/crypto' } }
        ]
    },
    {
        id: 7,
        name: '云计算',
        desc: '云服务与分布式计算',
        progress: 0,
        knowledges: [
            { id: 701, title: '云服务基础', status: 'pending', resources: { 视频: 'https://xxx.com/cloud' } },
            { id: 702, title: '容器与Kubernetes', status: 'pending', resources: { 视频: 'https://xxx.com/k8s' } }
        ]
    },
    {
        id: 8,
        name: '数据结构与算法',
        desc: '程序设计与算法基础',
        progress: 0,
        knowledges: [
            { id: 801, title: '线性表', status: 'pending', resources: { 视频: 'https://xxx.com/list' } },
            { id: 802, title: '树与图', status: 'pending', resources: { 视频: 'https://xxx.com/tree' } },
            { id: 803, title: '排序算法', status: 'pending', resources: { 视频: 'https://xxx.com/sort' } }
        ]
    },
    {
        id: 9,
        name: '操作系统',
        desc: '计算机系统运行原理',
        progress: 0,
        knowledges: [
            { id: 901, title: '进程与线程', status: 'pending', resources: { 视频: 'https://xxx.com/process' } },
            { id: 902, title: '内存管理', status: 'pending', resources: { 视频: 'https://xxx.com/memory' } }
        ]
    }
]
const stages = ref([])

const route = useRoute()

// 响应式状态
const currentStageId = ref(null)
const showResource = ref(false)
const resourceList = ref({})
const searchKeyword = ref('')
const filteredKnowledges = ref([])

onMounted(() => {
    const subject = route.query.subject
    if (subject) {
        const targetStage = allStages.find(stage => stage.name === subject)
        if (targetStage) {
            stages.value = [targetStage] // 只显示目标学科
            currentStageId.value = targetStage.id
        }
    } else {
        stages.value = allStages // 没有参数时显示全部
        currentStageId.value = allStages[0].id
    }
    filterKnowledges()
})

// 计算属性：当前阶段的知识点
const currentKnowledges = computed(() => {
    return stages.value.find(stage => stage.id === currentStageId.value)?.knowledges || []
})

// 计算属性：总知识点数量
const totalKnowledges = computed(() => {
    return currentKnowledges.value.length
})

// 计算属性：已掌握知识点数量
const masteredKnowledges = computed(() => {
    return currentKnowledges.value.filter(item => item.status === 'done').length
})

// 计算属性：学习中知识点数量
const learningKnowledges = computed(() => {
    return currentKnowledges.value.filter(item => item.status === 'learning').length
})

// 计算属性：未开始知识点数量
const pendingKnowledges = computed(() => {
    return currentKnowledges.value.filter(item => item.status === 'pending').length
})

// 方法：切换阶段
function changeStage(stageId) {
    currentStageId.value = stageId
    filterKnowledges()
}

// 方法：切换学科
function selectSubject(stage) {
    stages.value = [stage]
    currentStageId.value = stage.id
    filterKnowledges()
}

// 方法：更新学习状态
function updateStatus(knowledgeId, status) {
    const target = currentKnowledges.value.find(item => item.id === knowledgeId)
    if (target) {
        target.status = status
        // 此处可同步更新阶段进度（示例：简单模拟）
        const stage = stages.value.find(stage => stage.id === currentStageId.value)
        if (stage) {
            stage.progress = Math.round((currentKnowledges.value.filter(item => item.status === 'done').length / currentKnowledges.value.length) * 100)
        }
    }
}

// 方法：打开资源弹窗
function openResource(resources) {
    resourceList.value = resources
    showResource.value = true
}

// 方法：过滤知识点
function filterKnowledges() {
    if (searchKeyword.value) {
        filteredKnowledges.value = currentKnowledges.value.filter(knowledge =>
            knowledge.title.includes(searchKeyword.value)
        )
    } else {
        filteredKnowledges.value = currentKnowledges.value
    }
}

// 热门学习工具模拟数据
const hotTools = [
    {
        id: 1,
        name: 'JDK',
        desc: 'JDK是 Java 语言的软件开发工具包，主要用于移动设备、嵌入式设备上的java应用程序。JDK是整...',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        type: 'JavaEE',
        downloads: 12726
    },
    {
        id: 2,
        name: 'Microsoft Visual Studio',
        desc: 'Microsoft visual studio 是目前微软开发的最优秀的软件开发平台，不但拥有整洁、快速且强大的开...',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg',
        type: 'C/C++',
        downloads: 10454
    },
    {
        id: 3,
        name: 'IntelliJ IDEA',
        desc: 'IDEA 全称 IntelliJ IDEA，是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工...',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
        type: 'JavaEE',
        downloads: 10258
    },
    {
        id: 4,
        name: 'Typora——Markdown 编辑器和阅读器',
        desc: 'Typora 是一款支持实时预览的 Markdown 文本编辑器，支持文档目录结构、图片、表格、列表等诸...',
        icon: 'https://yun.itheima.com/Upload/Images/20200813/5f34de5e0f4fc.jpg',
        type: 'HTML&JS+前端',
        downloads: 9786
    }
]
// 近期技术文章模拟数据
const hotArticles = [
    {
        id: 1,
        day: '11',
        month: '2025-05',
        title: '【产品经理】怎样才能尽快从开发岗转到产品岗？',
        type: '产品经理',
        views: 23569
    },
    {
        id: 2,
        day: '11',
        month: '2024-12',
        title: '【产品经理】怎么画好软件产品原型图？',
        type: '产品经理',
        views: 91474
    },
    {
        id: 3,
        day: '11',
        month: '2025-01',
        title: '【产品经理】如何考核产品经理的绩效？',
        type: '产品经理',
        views: 23959
    },
    {
        id: 4,
        day: '11',
        month: '2024-05',
        title: '【产品经理】产品经理怎样活着走出需求泥潭？',
        type: '产品经理',
        views: 22788
    },
    {
        id: 5,
        day: '11',
        month: '2023-05',
        title: '【产品经理】产品经理入门书籍有哪些？',
        type: '产品经理',
        views: 22877
    }
]

// JavaEE学习路线示例数据
const javaeeRoadmap = [
  {
    stage: "Java基础",
    items: [
      "Java基本语法",
      "Java的面向对象",
      "集合技术&I/O技术",
      "网络编程&多线程技术",
      "JDK的新特性&基础加强"
    ]
  },
  {
    stage: "JavaWeb",
    items: [
      "前端技术 HTML+CSS+JS",
      "异步交互技术 Ajax+Axios",
      "前端开发框架 Vue、Element",
      "前端工程化 VUE脚手架"
    ]
  },
  {
    stage: "单体项目实战",
    items: [
      "基础数据模块：项目概述、环境搭建、员工管理、分类管理、菜品管理、套餐管理实战",
      "点餐业务模块：店铺营业状态设置、微信登录、缓存商品、购物车"
    ]
  },
  {
    stage: "微服务",
    items: [
      "微服务注册中心 Spring Cloud Eureka",
      "微服务调用 Spring Cloud OpenFeign",
      "客户端负载均衡 Spring Cloud Ribbon",
      "微服务网关 Spring Cloud Gateway"
    ]
  },
  {
    stage: "项目实战",
    items: [
      "社交项目-探花交友",
      "资讯项目-黑马头条",
      "企业服务项目-iHRM",
      "生活服务项目-好客租房",
      "金融项目-万信金融"
    ]
  }
]

// 前端路线
const frontendRoadmap = [
  {
    stage: "前端基础",
    items: [
      "HTML5+CSS3基础",
      "JavaScript语法与DOM",
      "ES6+新特性",
      "前端开发环境搭建"
    ]
  },
  {
    stage: "前端进阶",
    items: [
      "响应式布局与Flex/Grid",
      "模块化开发与Webpack",
      "TypeScript基础",
      "前端工程化"
    ]
  },
  {
    stage: "主流框架",
    items: [
      "Vue3核心与实战",
      "React18核心与实战",
      "前端路由与状态管理",
      "组件化开发"
    ]
  },
  {
    stage: "全栈与项目实战",
    items: [
      "Node.js与Express",
      "前后端分离项目实战",
      "接口联调与Mock",
      "前端自动化测试"
    ]
  },
  {
    stage: "就业与面试",
    items: [
      "前端性能优化",
      "大厂面试真题",
      "项目部署与上线",
      "职业发展规划"
    ]
  }
]

// 人工智能路线
const aiRoadmap = [
  {
    stage: "AI基础",
    items: [
      "人工智能发展史",
      "Python编程基础",
      "数据结构与算法基础",
      "数学基础（线性代数/概率论）"
    ]
  },
  {
    stage: "机器学习",
    items: [
      "监督学习与无监督学习",
      "常用算法（回归/分类/聚类）",
      "sklearn实战",
      "模型评估与调优"
    ]
  },
  {
    stage: "深度学习",
    items: [
      "神经网络基础",
      "TensorFlow/PyTorch实战",
      "CNN/RNN/Transformer",
      "计算机视觉与NLP"
    ]
  },
  {
    stage: "AI项目实战",
    items: [
      "图像识别项目",
      "语音识别项目",
      "智能推荐系统",
      "AI+行业应用"
    ]
  },
  {
    stage: "前沿与就业",
    items: [
      "大模型与AIGC",
      "AI工程化与部署",
      "AI面试真题",
      "职业发展与进阶"
    ]
  }
]

// 大数据路线
const bigdataRoadmap = [
  {
    stage: "大数据基础",
    items: [
      "大数据发展与应用场景",
      "Linux基础与环境搭建",
      "Hadoop生态体系",
      "HDFS原理与实战"
    ]
  },
  {
    stage: "数据采集与存储",
    items: [
      "Flume/Kafka数据采集",
      "Hive数据仓库",
      "HBase分布式存储",
      "Sqoop数据迁移"
    ]
  },
  {
    stage: "数据处理与分析",
    items: [
      "MapReduce编程",
      "Spark核心与实战",
      "Flink实时计算",
      "数据可视化"
    ]
  },
  {
    stage: "大数据项目实战",
    items: [
      "电商数仓项目",
      "实时数仓项目",
      "日志分析系统",
      "大数据平台搭建"
    ]
  },
  {
    stage: "就业与面试",
    items: [
      "大数据性能优化",
      "大厂面试真题",
      "项目部署与运维",
      "职业发展规划"
    ]
  }
]

function getCurrentRoadmap(subjectName) {
  if (subjectName === 'JavaEE') return javaeeRoadmap;
  if (subjectName === '前端') return frontendRoadmap;
  if (subjectName === '人工智能') return aiRoadmap;
  if (subjectName === '大数据') return bigdataRoadmap;
  return [];
}

function getCurrentTitle(subjectName) {
  if (subjectName === 'JavaEE') return '乐面Java学习路线图（2025官方完整版）';
  if (subjectName === '前端') return '乐面前端学习路线图（2025官方完整版）';
  if (subjectName === '人工智能') return '乐面人工智能学习路线图（2025官方完整版）';
  if (subjectName === '大数据') return '乐面大数据学习路线图（2025官方完整版）';
  return '乐面学习路线图';
}
function getCurrentSubtitle(subjectName) {
  if (subjectName === 'JavaEE') return '0基础 → 年薪30w，自学必备干货，下方含全套视频+源码资料';
  if (subjectName === '前端') return '0基础 → 高薪前端，前端全栈成长路线，含主流框架与项目实战';
  if (subjectName === '人工智能') return 'AI时代必备，机器学习+深度学习+项目实战，助力高薪就业';
  if (subjectName === '大数据') return '大数据全链路成长，含主流技术与企业级项目，助力数据工程师';
  return '自学必备干货，含全套视频+源码资料';
}
</script>

<style scoped lang="scss">

.learning-path-container {
    max-width: 2000px;
    margin: 0 100px;
    padding: 24px;
    margin-top: 80px;
}

.main-content-row {
    display: flex;
    // width: 1200px;
    align-items: flex-start;
    min-height: 700px;
}

.subject-sidenav {
    width: 220px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 12px rgba(0,128,255,0.06);
    margin-right: 36px;
    padding: 24px 0 24px 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .sidenav-title {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        background: linear-gradient(90deg, #2563eb 60%, #4f7fff 100%);
        border-radius: 12px 12px 0 0;
        padding: 16px 0;
        text-align: center;
        margin-bottom: 8px;
        letter-spacing: 1px;
        box-shadow: 0 2px 8px rgba(37,99,235,0.08);
    }
    .sidenav-item {
        font-size: 16px;
        color: #2563eb;
        padding: 12px 24px;
        cursor: pointer;
        border-radius: 0 20px 20px 0;
        margin-bottom: 2px;
        transition: background 0.18s, color 0.18s;
        display: flex;
        align-items: center;
        position: relative;
        &:hover {
            background: #e6f2ff;
            color: #007bff;
        }
        &.active {
            background: #e6f2ff;
            color: #fff;
            font-weight: bold;
            position: relative;
            .arrow {
                color: #2563eb;
                font-size: 18px;
                margin-left: auto;
                font-weight: bold;
            }
        }
    }
}

.main-content {
    flex: 1;
    min-width: 0;
}

// 搜索框
.search-container {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    input {
        width: 100%;
        max-width: 920px;
        padding: 12px 20px;
        border: 1.5px solid #e0e7ef;
        border-radius: 24px;
        background: #f7faff;
        font-size: 16px;
        transition: box-shadow 0.2s, border-color 0.2s;
        box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        outline: none;
        color: #2563eb;
        &::placeholder {
            color: #b3c0d1;
            font-size: 15px;
        }
        &:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
            background: #fff;
        }
    }
}

// 学习统计信息
.learning-stats {
    display: flex;
    gap: 102px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0,128,255,0.08);
    padding: 24px 36px;
    margin-bottom: 24px;
    justify-content: flex-start;
    align-items: center;
    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: #333 20px;
        min-width: 180px;
        padding: 0 12px;
        .stat-icon {
            font-size: 28px;
            margin-bottom: 6px;
        }
        .stat-label {
            font-size: 15px;
            color: #888;
            margin-bottom: 2px;
        }
        .stat-value {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            letter-spacing: 1px;
        }
        &.mastered .stat-value { color: #4caf50; }
        &.learning .stat-value { color: #ff9800; }
        &.pending .stat-value { color: #bdbdbd; }
    }
}

// 阶段导航区
.stage-nav {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 12px;

    &::-webkit-scrollbar {
        display: none; // 隐藏滚动条
    }

    .stage-item {
        min-width: 420px;
        background: #f9fcff;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.3s;

        &.active {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,128,255,0.1);
        }

        .stage-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .progress-wrapper {
            width: 80%;
            height: 8px;
            background: #e6f2ff;
            border-radius: 4px;
            margin: 8px auto;

            .progress-bar {
                height: 100%;
                background: #007bff;
                border-radius: 4px;
                transition: width 0.3s;
            }
        }

        .progress-text {
            font-size: 12px;
            color: #666;
        }
    }
}

// 知识点列表区
.knowledge-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
    margin: 32px 0;

    .knowledge-card {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        transition: transform 0.3s;

        &:hover {
            transform: translateY(-4px);
        }

        &.pending { border: 2px dashed #ffd400; } // 未开始（虚线提示）
        &.learning { border: 2px solid #4caf50; } // 学习中（实线提示）
        &.done { border: 2px solid #007bff; } // 已掌握（品牌色强化）

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;

            .status-tag {
                font-size: 12px;
                padding: 4px 8px;
                border-radius: 4px;
                color: #fff;

                &.done { background: #007bff; }
                &.learning { background: #4caf50; }
                &.pending { background: #ff9800; }
            }
        }

        .action-buttons {
            display: flex;
            gap: 8px;
            justify-content: flex-end;

            .action-btn {
                background: #007bff;
                color: #fff;
            }
            .resource-btn {
                background: #f5f5f5;
                color: #333;
            }
        }
    }
}

// 底部操作栏
.bottom-bar {
    display: flex;
    gap: 12px;
    justify-content: center;

    .bar-btn {
        background: #e6f2ff;
        color: #007bff;
    }
}

// 资源弹窗（简化版）
.resource-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-content {
        background: #fff;
        padding: 24px;
        border-radius: 12px;
        min-width: 320px;

        .close-btn {
            margin-top: 16px;
            background: #007bff;
            color: #fff;
        }
    }
}

// 通用按钮样式
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        opacity: 0.9;
    }
}

// 无结果提示
.no-results {
    text-align: center;
    color: #666;
}

// 新增：学习工具与技术文章模块
.tool-article-section {
    display: flex;
    gap: 48px;
    margin: 48px 0 0 0;
    .tool-list, .article-list {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 2px 12px rgba(0,128,255,0.06);
        padding: 28px 32px 18px 32px;
        flex: 1;
        min-width: 0;
    }
    .tool-list {
        margin-right: 0;
        .tool-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 28px;
            .tool-icon {
                width: 56px;
                height: 56px;
                border-radius: 12px;
                margin-right: 18px;
                object-fit: contain;
                background: #f7faff;
            }
            .tool-info {
                flex: 1;
                .tool-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #222;
                    margin-bottom: 2px;
                }
                .tool-desc {
                    font-size: 14px;
                    color: #888;
                    margin-bottom: 8px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 420px;
                }
                .tool-tags {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    .download-btn {
                        background: #ffd400;
                        color: #222;
                        border-radius: 12px;
                        padding: 2px 14px;
                        font-size: 14px;
                        font-weight: 500;
                        cursor: pointer;
                    }
                    .tool-type {
                        background: #e6f2ff;
                        color: #2563eb;
                        border-radius: 12px;
                        padding: 2px 12px;
                        font-size: 13px;
                    }
                    .tool-downloads {
                        background: #f5f5f5;
                        color: #888;
                        border-radius: 12px;
                        padding: 2px 12px;
                        font-size: 13px;
                    }
                }
            }
        }
    }
    .article-list {
        .article-item {
            display: flex;
            align-items: center;
            margin-bottom: 28px;
            .article-date {
                width: 48px;
                height: 48px;
                background: #e6f2ff;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-right: 18px;
                .date-day {
                    font-size: 22px;
                    font-weight: bold;
                    color: #2563eb;
                    line-height: 1;
                }
                .date-month {
                    font-size: 12px;
                    color: #2563eb;
                }
            }
            .article-info {
                flex: 1;
                .article-title {
                    font-size: 16px;
                    font-weight: 500;
                    color: #222;
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 320px;
                }
                .article-meta {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    .article-type {
                        background: #e6f2ff;
                        color: #2563eb;
                        border-radius: 10px;
                        padding: 2px 10px;
                        font-size: 13px;
                    }
                    .article-views {
                        color: #888;
                        font-size: 13px;
                    }
                }
            }
        }
    }
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
        span {
            font-size: 20px;
            font-weight: bold;
            color: #222;
        }
        .more-link {
            font-size: 14px;
            color: #888;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: #2563eb;
            }
        }
    }
}

// 响应式适配
@media (max-width: 768px) {
    .main-content-row {
        flex-direction: column;
        align-items: stretch;
    }
    .subject-sidenav {
        width: 100%;
        margin-right: 0;
        margin-bottom: 24px;
        .sidenav-title {
            border-radius: 12px 12px 0 0;
        }
    }
    .knowledge-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}
</style>