<template>
  <div class="job-list-title">职位推荐</div>
  <div class="job-list-container">
   
    <div class="job-list-header">
      <div class="tabs">
        <span :class="{active: activeTab === 0}" @click="activeTab = 0">精选职位</span>
        <span :class="{active: activeTab === 1}" @click="activeTab = 1">最新职位</span>
      </div>
      <div class="user-match" v-if="userMatch">
        <img :src="userMatch.avatar" class="avatar" v-if="userMatch.avatar" />
        <span>{{ userMatch.text }}</span>
      </div>
    </div>
    <div class="job-card-grid">
      <JobCard v-for="job in jobs" :key="job.id" :job="job" />
    </div>
    <div class="job-list-footer">
      <button class="more-btn" @click="goToDetail">查看更多</button>
    </div>
  </div>
</template>

<script>
import JobCard from './JobCard.vue';
export default {
  name: 'JobList',
  components: { JobCard },
  data() {
    return {
      activeTab: 0,
      userMatch: {
        avatar: '',
        text: '根据求职期望匹配：深圳｜前端移动开发'
      },
      jobsJingxuan: [
        { id: 1, title: '前端实习生', salary: '200-250元/天', tags: ['3个月', '本科'], company: '河北省律运动体...', location: '石家庄·裕华区' },
        { id: 2, title: '硬件测试 实习生 应届生', salary: '6-7K', tags: ['本科'], company: '富智康工业互联网', location: '深圳·龙华区·清湖' },
        { id: 3, title: '售后服务部门(双休)', salary: '6-11K', tags: ['大专'], company: '平安资本', location: '武汉·江汉区·武汉商务区' },
        { id: 4, title: '算法工程师', salary: '15-30K', tags: ['硕士', '全职'], company: '字节跳动', location: '北京·海淀区' },
        { id: 5, title: 'UI设计师', salary: '8-12K', tags: ['本科', '2年以上'], company: '腾讯科技', location: '深圳·南山区' },
        { id: 6, title: 'Java开发工程师', salary: '10-18K', tags: ['本科', '3年以上'], company: '阿里巴巴', location: '杭州·西湖区' },
        { id: 7, title: '产品经理', salary: '12-20K', tags: ['本科', '互联网'], company: '美团', location: '上海·浦东新区' },
        { id: 8, title: '数据分析师', salary: '9-15K', tags: ['硕士', '数据分析'], company: '京东', location: '北京·朝阳区' },
        { id: 9, title: '测试开发工程师', salary: '8-16K', tags: ['本科', '自动化测试'], company: '百度', location: '北京·海淀区' }
      ],
      jobsZuixin: [
        { id: 101, title: '后端开发实习生', salary: '5-8K', tags: ['本科', '实习'], company: '网易', location: '广州·天河区' },
        { id: 102, title: '运维工程师', salary: '7-12K', tags: ['本科', '全职'], company: '小米', location: '北京·海淀区' },
        { id: 103, title: '前端开发工程师', salary: '10-15K', tags: ['本科', 'Vue'], company: '拼多多', location: '上海·长宁区' },
        { id: 104, title: '数据产品经理', salary: '13-22K', tags: ['硕士', '数据产品'], company: '滴滴出行', location: '北京·朝阳区' },
        { id: 105, title: '算法实习生', salary: '200-300元/天', tags: ['实习', 'AI'], company: '商汤科技', location: '上海·浦东新区' },
        { id: 106, title: 'UI设计实习生', salary: '4-6K', tags: ['本科', '实习'], company: 'B站', location: '上海·徐汇区' },
        { id: 107, title: '测试工程师', salary: '7-13K', tags: ['本科', '测试'], company: '携程', location: '上海·普陀区' },
        { id: 108, title: '产品助理', salary: '6-10K', tags: ['本科', '助理'], company: '知乎', location: '北京·海淀区' },
        { id: 109, title: '大数据开发', salary: '15-25K', tags: ['硕士', '大数据'], company: '快手', location: '北京·朝阳区' }
      ]
    }
  },
  computed: {
    jobs() {
      return this.activeTab === 0 ? this.jobsJingxuan : this.jobsZuixin;
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
.job-list-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
  color: #22223b;
  margin-top: 60px;
  margin-bottom: 18px;
  letter-spacing: 2px;
  line-height: 1.1;
}
.job-list-container {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(37,99,235,0.01);
  padding: 32px 24px 24px 24px;
  margin: 40px auto 0 auto;   /* 和 main-content 一致 */
  max-width: 1480px;          /* 和 main-content 一致 */
}
.job-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.tabs {
  display: flex;
  gap: 32px;
  font-size: 1.18rem;
  font-weight: 700;
}
.tabs span {
  cursor: pointer;
  color: #888;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
  transition: color 0.2s, border-color 0.2s;
}
.tabs .active {
  color: #19c2c6;
  border-bottom: 2px solid #19c2c6;
}
.user-match {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #888;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.job-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}
.job-list-footer {
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