<template>
  <div class="hot-companies-section">
    <div class="hot-companies-title">热门企业</div>
    <div class="hot-companies-grid">
      <div v-for="company in companies" :key="company.id" class="company-card">
        <div class="company-header">
          <img v-if="company.logo" :src="company.logo" class="company-logo" />
          <div class="company-info">
            <div class="company-name">{{ company.name }}</div>
            <div class="company-meta">
              <span>{{ company.stage }}</span>
              <span>｜{{ company.size }}</span>
              <span>｜{{ company.industry }}</span>
            </div>
          </div>
        </div>
        <div class="company-jobs">
          <div v-for="job in company.jobs" :key="job.id" class="company-job-row">
            <span class="job-title">{{ job.title }}</span>
            <span class="job-salary">{{ job.salary }}</span>
          </div>
        </div>
        <button class="more-btn">查看更多职位</button>
      </div>

    </div>
    <div class="hot-jobs-footer">
      <button class="more-btn">查看更多</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotCompanies',
  data() {
    return {
      companies: [
        {
          id: 1,
          name: '作业帮',
          logo: 'https://logo.clearbit.com/zybang.com',
          stage: 'D轮及以上',
          size: '10000人以上',
          industry: '互联网',
          jobs: [
            { id: 1, title: '下午1点班！批改作业（...', salary: '8-13K' },
            { id: 2, title: '销售（直播销售）', salary: '4-5K' },
            { id: 3, title: '低年级助教（本科起）七...', salary: '8-13K' }
          ]
        },
        {
          id: 2,
          name: '猿辅导',
          logo: 'https://logo.clearbit.com/yuanfudao.com',
          stage: 'D轮及以上',
          size: '10000人以上',
          industry: '培训/辅导机构',
          jobs: [
            { id: 1, title: '线上助教老师 不要求教资', salary: '250-400元/天' },
            { id: 2, title: '大厂秋招·助教/双休猿辅...', salary: '6-11K·13薪' },
            { id: 3, title: '春招·辅导/助教/双休可接...', salary: '6-10K·13薪' }
          ]
        },
        {
          id: 3,
          name: '三全食品',
          logo: 'https://img.bosszhipin.com/beijin/mcs/banner/b524bdb9cf98b2de5144ef471d20f2b2cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_120,limit_0',
          stage: '已上市',
          size: '10000人以上',
          industry: '食品/饮料/烟酒',
          jobs: [
            { id: 1, title: '三全食品招聘搬运工/装卸工', salary: '6-8K' },
            { id: 2, title: '营销业务运维', salary: '6-8K' },
            { id: 3, title: '销售管培生（急聘）', salary: '5-10K' }
          ]
        },
        {
          id: 4,
          name: '字节跳动',
          logo: 'https://logo.clearbit.com/bytedance.com',
          stage: '已上市',
          size: '10000人以上',
          industry: '互联网',
          jobs: [
            { id: 1, title: '前端开发工程师', salary: '18-30K' },
            { id: 2, title: '算法工程师', salary: '25-40K' },
            { id: 3, title: '产品经理', salary: '20-35K' }
          ]
        },
        {
          id: 5,
          name: '腾讯科技',
          logo: 'https://logo.clearbit.com/tencent.com',
          stage: '已上市',
          size: '10000人以上',
          industry: '互联网',
          jobs: [
            { id: 1, title: 'UI设计师', salary: '15-25K' },
            { id: 2, title: '后端开发工程师', salary: '20-35K' },
            { id: 3, title: '测试开发', salary: '13-20K' }
          ]
        },
        {
          id: 6,
          name: '阿里巴巴',
          logo: 'https://logo.clearbit.com/alibaba.com',
          stage: '已上市',
          size: '10000人以上',
          industry: '电商/互联网',
          jobs: [
            { id: 1, title: 'Java开发工程师', salary: '18-28K' },
            { id: 2, title: '数据分析师', salary: '15-22K' },
            { id: 3, title: '运营专员', salary: '10-15K' }
          ]
        },
        {
          id: 7,
          name: '美团',
          logo: 'https://logo.clearbit.com/meituan.com',
          stage: '已上市',
          size: '10000人以上',
          industry: '本地生活服务',
          jobs: [
            { id: 1, title: '产品经理', salary: '18-30K' },
            { id: 2, title: '前端开发', salary: '15-25K' },
            { id: 3, title: '市场专员', salary: '10-18K' }
          ]
        },
        {
          id: 8,
          name: '京东',
          logo: 'https://logo.clearbit.com/jd.com',
          stage: '已上市',
          size: '10000人以上',
          industry: '电商/互联网',
          jobs: [
            { id: 1, title: '数据分析师', salary: '16-25K' },
            { id: 2, title: '物流专员', salary: '8-13K' },
            { id: 3, title: '仓储经理', salary: '12-20K' }
          ]
        },
        {
          id: 9,
          name: '携程',
          logo: 'https://logo.clearbit.com/ctrip.com',
          stage: '已上市',
          size: '10000人以上',
          industry: '旅游/互联网',
          jobs: [
            { id: 1, title: '测试工程师', salary: '12-18K' },
            { id: 2, title: '产品助理', salary: '10-15K' },
            { id: 3, title: '运营专员', salary: '9-14K' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.hot-companies-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(37,99,235,0.06);
  padding: 32px 24px 24px 24px;
  margin: 40px auto 0 auto;
  max-width: 1480px;
}
.hot-companies-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
  color: #22223b;
  margin-top: 32px;
  margin-bottom: 18px;
  letter-spacing: 2px;
  line-height: 1.1;
}
.hot-companies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 24px;
}
.company-card {
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.09);
  padding: 24px 20px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 220px;
}
.company-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.company-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: cover;
  background: #fff;
  border: 1px solid #e6e6e6;
}
.company-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.company-name {
  font-size: 1.13rem;
  font-weight: 700;
  color: #22223b;
}
.company-meta {
  color: #888;
  font-size: 0.98rem;
  font-weight: 400;
}
.company-jobs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}
.company-job-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.08rem;
  color: #22223b;
  background: #fff;
  border-radius: 6px;
  padding: 6px 10px;
  box-shadow: 0 1px 4px rgba(37,99,235,0.04);
}
.job-title {
  font-weight: 500;
  color: #22223b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}
.job-salary {
  color: #f43f5e;
  font-weight: 700;
  font-size: 1.08rem;
  margin-left: 8px;
  white-space: nowrap;
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
  padding: 8px 32px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
  align-self: center;
  margin-top: 8px;
}
.more-btn:hover {
  background: #19c2c6;
  color: #fff;
}
</style> 