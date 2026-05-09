<template>
  <div class="hot-job-card">
    <div class="hot-job-header">
      <span class="hot-job-title">{{ job.title }}</span>
      <span class="hot-job-salary">{{ job.salary }}</span>
    </div>
    <div class="hot-job-tags">
      <span v-for="tag in job.tags" :key="tag" class="hot-job-tag">{{ tag }}</span>
    </div>
    <div class="hot-job-footer">
      <div class="hot-job-company">
        <img v-if="job.logo" :src="job.logo" class="company-logo" />
        <span class="company-name">{{ job.company }}</span>
        <span class="company-industry">{{ job.industry }}</span>
        <span class="company-finance">{{ job.finance }}</span>
      </div>
      <span class="hot-job-location">{{ job.location }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotJobCard',
  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.hot-job-card {
  background: #f8fafc;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.06);
  padding: 20px 18px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 120px;
}
.hot-job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}
.hot-job-title {
  font-size: 1.13rem;
  font-weight: 700;
  color: #22223b;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hot-job-salary {
  color: #f43f5e;
  font-size: 1.1rem;
  font-weight: 700;
  margin-left: 12px;
  white-space: nowrap;
}
.hot-job-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
.hot-job-tag {
  background: #e6f8fa;
  color: #19c2c6;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.98rem;
  font-weight: 500;
}
.hot-job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.98rem;
  margin-top: 6px;
}
.hot-job-company {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.company-logo {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  object-fit: cover;
  background: #fff;
  border: 1px solid #e6e6e6;
}
.company-name {
  font-weight: 600;
  color: #444;
  margin-right: 4px;
}
.company-industry {
  color: #888;
  font-size: 0.95rem;
  margin-right: 4px;
}
.company-finance {
  color: #19c2c6;
  font-size: 0.95rem;
}
.hot-job-location {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 38%;
  text-align: right;
}
</style> 