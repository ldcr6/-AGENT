<template>
  <div class="job-card">
    <div class="job-card-header">
      <span class="job-title">{{ job.title }}</span>
      <span class="job-salary">{{ job.salary }}</span>
    </div>
    <div class="job-tags">
      <span v-for="tag in job.tags" :key="tag" class="job-tag">{{ tag }}</span>
    </div>
    <div class="job-card-footer">
      <span class="job-company">{{ job.company }}</span>
      <span class="job-location">{{ job.location }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.job-card {
  background: #f8fafc;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.06);
  padding: 20px 18px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 120px;
}
.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}
.job-title {
  font-size: 1.13rem;
  font-weight: 700;
  color: #22223b;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.job-salary {
  color: #f43f5e;
  font-size: 1.1rem;
  font-weight: 700;
  margin-left: 12px;
  white-space: nowrap;
}
.job-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
.job-tag {
  background: #e6f8fa;
  color: #19c2c6;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.98rem;
  font-weight: 500;
}
.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.98rem;
  margin-top: 6px;
}
.job-company {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}
.job-location {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 38%;
  text-align: right;
}
</style> 