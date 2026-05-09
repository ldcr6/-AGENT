<template>
  <div class="hot-jobs-section">
    <div class="hot-jobs-title">热招职位</div>
    <div class="hot-jobs-tabs">
      <span v-for="(tab, idx) in tabs" :key="tab" :class="{active: activeTab === idx}" @click="activeTab = idx">{{ tab }}</span>
    </div>
    <div class="hot-jobs-grid">
      <HotJobCard v-for="job in jobs" :key="job.id" :job="job" />
    </div>
    <div class="hot-jobs-footer">
      <button class="more-btn" @click="goToDetail">查看更多</button>
    </div>
  </div>
</template>

<script>
import HotJobCard from './HotJobCard.vue';
export default {
  name: 'HotJobs',
  components: { HotJobCard },
  data() {
    return {
      activeTab: 0,
      tabs: ['技术', '销售', '直播/影视/传媒', '客服/运营', '市场/公关/广告', '供应链/物流', '人力/财务/行政', '教育培训', '医疗健康'],
      jobsList: [
        // 技术
        [
          { id: 1, title: '网络工程师6k高薪', salary: '5-8K', tags: ['郑州', '1年以内', '大专', '接受实习/在校生投递'], company: '河南酷梦商贸有限公司', logo: '', industry: '通信/网络设备', finance: '不需要融资', location: '郑州' },
          { id: 2, title: '急需游戏测试员！', salary: '5-10K', tags: ['郑州', '经验不限', '中专/中技'], company: '秋日思绪', logo: '', industry: '文化艺术/娱乐', finance: '不需要融资', location: '郑州' },
          { id: 3, title: '急需游戏测试员！', salary: '8-13K', tags: ['郑州', '经验不限', '学历不限', '丰富的游戏经验'], company: '秋日思绪', logo: '', industry: '文化艺术/娱乐', finance: '不需要融资', location: '郑州' },
          { id: 4, title: '中级游戏测试工程师', salary: '5-10K', tags: ['郑州', '经验不限', '学历不限', '计算机相关专业'], company: '郑州市开睿商贸', logo: '', industry: '文化艺术/娱乐', finance: '不需要融资', location: '郑州' },
          { id: 5, title: '可全职可兼职，带薪打游...', salary: '5-10K', tags: ['郑州', '经验不限', '学历不限', '接受无经验'], company: '郑州雨菱文化传媒', logo: '', industry: '互联网', finance: '不需要融资', location: '郑州' },
          { id: 6, title: '电商公司数据开发', salary: '10-15K', tags: ['郑州', '5-10年', '本科', '跨境电商'], company: '吉客裕客（郑州）', logo: '', industry: '电子商务', finance: '不需要融资', location: '郑州' },
          { id: 7, title: 'Java开发（MES、WMS…', salary: '10-11K', tags: ['郑州', '5-10年', '大专', 'MES开发经验', 'Java'], company: '软语科技', logo: '', industry: '互联网', finance: '不需要融资', location: '郑州' },
          { id: 8, title: '手机APP开发员', salary: '4-8K', tags: ['郑州', '1-3年', '大专', '不接受居家办公'], company: '贝财特', logo: '', industry: '农/林/牧/渔', finance: '未融资', location: '郑州' },
          { id: 9, title: '前端开发工程师', salary: '6-9K', tags: ['郑州', '3-5年', '大专', 'CSS', 'JavaScript'], company: '聚收付', logo: '', industry: '互联网金融', finance: '不需要融资', location: '郑州' }
        ],
        // 其他Tab可补充更多数据
        [], [], [], [], [], [], []
      ]
    }
  },
  computed: {
    jobs() {
      return this.jobsList[this.activeTab] || [];
    }
  },
  methods: {
    goToDetail() {
      this.$router.push('/job-detail')
    }
  }
}
</script>

<style scoped>
.hot-jobs-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(37,99,235,0.01);
  padding: 32px 24px 24px 24px;
  margin: 40px auto 0 auto;
  max-width: 1480px;
}
.hot-jobs-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
  color: #22223b;
  margin-top: 32px;
  margin-bottom: 18px;
  letter-spacing: 2px;
  line-height: 1.1;
}
.hot-jobs-tabs {
  display: flex;
  gap: 32px;
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 18px;
  justify-content: center;
  flex-wrap: wrap;
}
.hot-jobs-tabs span {
  cursor: pointer;
  color: #888;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
  transition: color 0.2s, border-color 0.2s;
}
.hot-jobs-tabs .active {
  color: #19c2c6;
  border-bottom: 2px solid #19c2c6;
}
.hot-jobs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}
.hot-jobs-footer {
  display: flex;
  justify-content: center;
}
.more-btn {
  background: #e6f8fa;
  color: #19c2c6;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  padding: 10px 48px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
}
.more-btn:hover {
  background: #19c2c6;
  color: #fff;
}
</style> 