<template>
  <HeaderBar />
  <div class="personal-center-bg">
    <div class="personal-center-card">
      <!-- 头像区 -->
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <img class="avatar-img" src="@/assets/img-4.png" alt="头像" />
          <span class="avatar-check">
            <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#22C55E"/><path d="M8 15l4 4 8-8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <button class="avatar-btn">
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 17h12M10 13a4 4 0 100-8 4 4 0 000 8z" stroke="#7B7B7B" stroke-width="2" fill="none"/><circle cx="10" cy="9" r="4" fill="none"/></svg>
          更换头像
        </button>
      </div>
      <!-- 信息区 -->
      <div class="info-section">
        <div class="user-row">
          <span class="user-name">{{ userName }}</span>
          <span class="user-tag">初级学者</span>
        </div>
        <div class="user-signature">{{ userSignature }}</div>
        <div class="stats-row">
          <div class="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="6" fill="none" stroke="#fff" stroke-width="2"/><path d="M8 2v4M16 2v4" stroke="#fff" stroke-width="2"/></svg>
            <span>学习天数: <b>32天</b></span>
          </div>
          <div class="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="#fff" stroke-width="2"/><path d="M8 8h8v8H8z" fill="none" stroke="#fff" stroke-width="2"/></svg>
            <span>已完成课程: <b>5门</b></span>
          </div>
          <div class="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" fill="none" stroke="#fff" stroke-width="2"/></svg>
            <span>获得成就: <b>12个</b></span>
          </div>
        </div>
        <div class="action-row">
          <button class="action-btn" @click="showEditModal">
            <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="none" stroke="#7B7B7B" stroke-width="2"/><path d="M7 11h8M11 7v8" stroke="#7B7B7B" stroke-width="2"/></svg>
            编辑资料
          </button>
          <button class="action-btn">
            <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="none" stroke="#7B7B7B" stroke-width="2"/><path d="M11 7v4l2 2" stroke="#7B7B7B" stroke-width="2"/></svg>
            账号设置
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="main-content">
    <!-- 左侧：学习进度 -->
    <div class="progress-section">
      <div class="section-header">
        <span class="section-title">学习进度</span>
        <a class="section-link" href="#">查看全部</a>
      </div>
      <div class="progress-list">
        <div class="progress-card">
          <div class="progress-circle blue">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" stroke="#e5e7eb" stroke-width="8" fill="none"/>
              <circle
                cx="40" cy="40" r="36"
                stroke="#6366f1"
                stroke-width="8"
                fill="none"
                stroke-dasharray="226.19"
                stroke-dashoffset="56.55"
                stroke-linecap="round"
                style="transform: rotate(-90deg); transform-origin: 50% 50%;"
              />
            </svg>
            <span class="circle-text">75%</span>
          </div>
          <div class="progress-info">
            <div class="progress-title">数据结构与算法</div>
            <div class="progress-desc">掌握常用数据结构和算法，提升编程思维</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-bg">
                <div class="progress-bar blue" style="width:75%"></div>
              </div>
              <span class="progress-status">进行中</span>
              <span class="progress-percent">75%</span>
            </div>
          </div>
        </div>
        <div class="progress-card">
          <div class="progress-circle purple">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" stroke="#e5e7eb" stroke-width="8" fill="none"/>
              <circle
                cx="40" cy="40" r="36"
                stroke="#a78bfa"
                stroke-width="8"
                fill="none"
                stroke-dasharray="226.19"
                stroke-dashoffset="113.1"
                stroke-linecap="round"
                style="transform: rotate(-90deg); transform-origin: 50% 50%;"
              />
            </svg>
            <span class="circle-text">50%</span>
          </div>
          <div class="progress-info">
            <div class="progress-title">Spring框架入门</div>
            <div class="progress-desc">学习Spring核心概念和IoC、AOP原理</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-bg">
                <div class="progress-bar purple" style="width:50%"></div>
              </div>
              <span class="progress-status">进行中</span>
              <span class="progress-percent">50%</span>
            </div>
          </div>
        </div>
        <div class="progress-card">
          <div class="progress-circle pink">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" stroke="#e5e7eb" stroke-width="8" fill="none"/>
              <circle
                cx="40" cy="40" r="36"
                stroke="#f472b6"
                stroke-width="8"
                fill="none"
                stroke-dasharray="226.19"
                stroke-dashoffset="203.57"
                stroke-linecap="round"
                style="transform: rotate(-90deg); transform-origin: 50% 50%;"
              />
            </svg>
            <span class="circle-text">10%</span>
          </div>
          <div class="progress-info">
            <div class="progress-title">数据库设计与开发</div>
            <div class="progress-desc">学习SQL语句和数据库设计原则</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-bg">
                <div class="progress-bar pink" style="width:10%"></div>
              </div>
              <span class="progress-status">进行中</span>
              <span class="progress-percent">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧：快捷操作 -->
    <div class="quick-section">
      <div class="section-title">快捷操作</div>
      <div class="quick-grid">
        <div class="quick-card blue">
          <div class="quick-icon">
            <!-- 书本图标 -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="7" width="20" height="18" rx="3" stroke="#f67312" stroke-width="2"/><path d="M8 11h12M8 15h12M8 19h8" stroke="#f67312" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <div class="quick-text">我的课程</div>
        </div>
        <div class="quick-card purple">
          <div class="quick-icon">
            <!-- 日历图标 -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="#38abad"><rect x="5" y="8" width="22" height="18" rx="3" stroke="#3a8bfa" stroke-width="2"/><rect x="5" y="12" width="22" height="2" fill="#f78bfa"/><circle cx="11" cy="17" r="1.5" fill="#e78bfa"/><circle cx="16" cy="17" r="1.5" fill="#a96bfa"/><circle cx="21" cy="17" r="1.5" fill="#b98bfa"/><rect x="10" y="4" width="2" height="6" rx="1" fill="#b98bfa"/><rect x="20" y="4" width="2" height="6" rx="1" fill="#b98bfa"/></svg>
          </div>
          <div class="quick-text">学习计划</div>
        </div>
        <div class="quick-card pink">
          <div class="quick-icon">
            <!-- 更明显的奖杯图标 -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g>
                <ellipse cx="16" cy="28" rx="8" ry="2" fill="#fde68a"/>
                <rect x="12" y="22" width="8" height="4" rx="2" fill="#fde68a" stroke="#fbbf24" stroke-width="2"/>
                <rect x="10" y="6" width="12" height="12" rx="6" fill="#fde68a" stroke="#fbbf24" stroke-width="2"/>
                <path d="M10 10c-3 0-3 8 2 8" stroke="#fbbf24" stroke-width="2" fill="none"/>
                <path d="M22 10c3 0 3 8-2 8" stroke="#fbbf24" stroke-width="2" fill="none"/>
                <path d="M16 18v4" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
              </g>
            </svg>
          </div>
          <div class="quick-text">我的成就</div>
        </div>
        <div class="quick-card green">
          <div class="quick-icon">
            <!-- 对话气泡图标 -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="12" ry="9" stroke="#34d399" stroke-width="2"/><ellipse cx="16" cy="16" rx="12" ry="9" fill="#6ee7b7" opacity="0.15"/><path d="M10 18c1.5 1 4.5 1 6 0" stroke="#34d399" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="14" r="1" fill="#34d399"/><circle cx="16" cy="14" r="1" fill="#34d399"/><circle cx="20" cy="14" r="1" fill="#34d399"/></svg>
          </div>
          <div class="quick-text">社区讨论</div>
        </div>
        <div class="quick-card yellow">
          <div class="quick-icon">
            <!-- 奖章图标 -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="14" r="8" fill="#fde68a" stroke="#fbbf24" stroke-width="2"/>
              <polygon points="16,10 17.76,13.64 21.8,14.18 18.9,16.82 19.52,20.82 16,18.9 12.48,20.82 13.1,16.82 10.2,14.18 14.24,13.64" fill="#fbbf24"/>
              <path d="M16 22v6M12 28l4-6 4 6" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="quick-text">我的证书</div>
        </div>
        <div class="quick-card red">
          <div class="quick-icon">
            <!-- 五角星图标 -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><polygon points="16,6 19,14 28,14 21,19 23,27 16,22 9,27 11,19 4,14 13,14" stroke="#f87171" stroke-width="2" fill="#fca5a5" opacity="0.15"/><polygon points="16,6 19,14 28,14 21,19 23,27 16,22 9,27 11,19 4,14 13,14" stroke="#f87171" stroke-width="2" fill="none"/></svg>
          </div>
          <div class="quick-text">收藏内容</div>
        </div>
      </div>
    </div>
  </div>


  <div class="record-achievement-content">
    <!-- 左侧：最近学习记录 -->
    <div class="record-section">
      <div class="section-header">
        <span class="section-title">最近学习记录</span>
        <a class="section-link" href="#">查看历史</a>
      </div>
      <div class="record-list">
        <div class="record-item">
          <img class="record-thumb" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80" alt="缩略图" />
          <div class="record-info">
            <div class="record-title">栈和队列的应用</div>
            <div class="record-desc">数据结构与算法 · 今天 19:30</div>
          </div>
          <span class="record-status studying">学习中</span>
        </div>
        <div class="record-item">
          <img class="record-thumb" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80" alt="缩略图" />
          <div class="record-info">
            <div class="record-title">IoC容器原理</div>
            <div class="record-desc">Spring框架入门 · 昨天 21:15</div>
          </div>
          <span class="record-status finished">已完成</span>
        </div>
        <div class="record-item">
          <img class="record-thumb" src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=80&h=80" alt="缩略图" />
          <div class="record-info">
            <div class="record-title">多线程编程</div>
            <div class="record-desc">Java高级特性 · 3天前</div>
          </div>
          <span class="record-status finished">已完成</span>
        </div>
        <div class="record-item">
          <img class="record-thumb" src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=facearea&w=80&h=80" alt="缩略图" />
          <div class="record-info">
            <div class="record-title">SQL查询优化</div>
            <div class="record-desc">数据库设计与开发 · 5天前</div>
          </div>
          <span class="record-status paused">已暂停</span>
        </div>
        <div class="record-item">
          <img class="record-thumb" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80" alt="缩略图" />
          <div class="record-info">
            <div class="record-title">面向对象设计原则</div>
            <div class="record-desc">Java高级特性 · 1周前</div>
          </div>
          <span class="record-status finished">已完成</span>
        </div>
      </div>
    </div>
    <!-- 右侧：我的成就 -->
    <div class="achievement-section">
      <div class="achievement-header">
        <span class="section-title">我的成就</span>
        <div class="achievement-progress">
          <span class="progress-text">12/24</span>
          <div class="progress-bar-bg">
            <div class="progress-bar-main" style="width:50%"></div>
          </div>
        </div>
      </div>
      <div class="achievement-list">
        <div class="achievement-item yellow">
          <div class="achievement-icon"><svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fde68a"/><path d="M16 8v8l6 4" stroke="#fbbf24" stroke-width="2"/></svg></div>
          <div class="achievement-info">
            <div class="achievement-title">学习新星</div>
            <div class="achievement-desc">连续学习7天</div>
          </div>
          <span class="achievement-mark star">★</span>
        </div>
        <div class="achievement-item green">
          <div class="achievement-icon"><svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#bbf7d0"/><path d="M10 16l4 4 8-8" stroke="#22c55e" stroke-width="2"/></svg></div>
          <div class="achievement-info">
            <div class="achievement-title">初级程序员</div>
            <div class="achievement-desc">完成5门课程</div>
          </div>
          <span class="achievement-mark check">✔</span>
        </div>
        <div class="achievement-item blue">
          <div class="achievement-icon"><svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#dbeafe"/><path d="M10 22l6-12 6 12" stroke="#3b82f6" stroke-width="2"/></svg></div>
          <div class="achievement-info">
            <div class="achievement-title">代码大师</div>
            <div class="achievement-desc">累计编写10000行代码</div>
          </div>
          <span class="achievement-mark star">★</span>
        </div>
        <div class="achievement-item purple">
          <div class="achievement-icon"><svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ede9fe"/><path d="M16 10v12M10 16h12" stroke="#a78bfa" stroke-width="2"/></svg></div>
          <div class="achievement-info">
            <div class="achievement-title">社区活跃者</div>
            <div class="achievement-desc">发表10篇帖子</div>
          </div>
          <span class="achievement-mark">☆</span>
        </div>
        <div class="achievement-item red">
          <div class="achievement-icon"><svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fee2e2"/><path d="M16 10l6 10H10l6-10z" fill="#f87171"/></svg></div>
          <div class="achievement-info">
            <div class="achievement-title">算法天才</div>
            <div class="achievement-desc">解决50道算法题</div>
          </div>
          <span class="achievement-mark">☆</span>
        </div>
      </div>
      <button class="achievement-btn">查看全部成就</button>
    </div>
  </div>

  <EditProfileModal
    v-if="isEditModalVisible"
    :name="userName"
    :signature="userSignature"
    @close="isEditModalVisible = false"
    @save="handleSaveProfile"
  />

  <FooterBar />
</template>

<script setup>
import { ref } from 'vue';
import HeaderBar from '../components/HeaderBar.vue';
import FooterBar from '../components/FooterBar.vue';
import EditProfileModal from '../components/modals/EditProfileModal.vue';

const userName = ref('乐小面');
const userSignature = ref('Java学习爱好者 · 正在学习数据结构与算法');
const isEditModalVisible = ref(false);

const showEditModal = () => {
  isEditModalVisible.value = true;
};

const handleSaveProfile = (newProfile) => {
  userName.value = newProfile.name;
  userSignature.value = newProfile.signature;
  isEditModalVisible.value = false;
};
</script>

<style scoped>
.personal-center-bg {
  min-height: 360px;
  background: linear-gradient(90deg, #a78bfa 0%, #c084fc 100%);
  border-radius: 32px;
  padding: 32px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1350px;
  margin: 0 auto 0 auto;
  margin-top: 120px;
}
.personal-center-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: transparent;
  width: 90%;
  min-height: 260px;
}
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 48px;
  margin-top: 8px;
}
.avatar-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 6px solid #fff;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: #fff;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.avatar-check {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-btn {
  margin-top: 18px;
  background: #f3f4f6;
  color: #333;
  border: none;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background 0.2s;
}
.avatar-btn:hover {
  background: #e0e7ff;
}
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 12px;
}
.user-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-name {
  font-size: 44px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
}
.user-tag {
  background: #ede9fe;
  color: #7c3aed;
  font-size: 18px;
  border-radius: 16px;
  padding: 4px 16px;
  font-weight: 600;
  margin-left: 4px;
}
.user-signature {
  margin-top: 12px;
  font-size: 22px;
  color: #ede9fe;
  font-weight: 400;
}
.stats-row {
  display: flex;
  gap: 24px;
  margin-top: 32px;
}
.stat-card {
  background: rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.stat-card svg {
  flex-shrink: 0;
  fill: none;
  stroke: #fff;
}
.stat-card b {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}
.action-row {
  display: flex;
  gap: 24px;
  margin-top: 36px;
}
.action-btn {
  background: #fff;
  color: #7b7b7b;
  border: none;
  border-radius: 16px;
  padding: 14px 38px;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: background 0.2s;
}
.action-btn:hover {
  background: #ede9fe;
}
.action-btn svg {
  flex-shrink: 0;
}
.main-content {
  display: flex;
  flex-direction: row;
  gap: 32px;
  max-width: 1350px;
  margin: 0 auto;
  margin-top: 32px;
  align-items: stretch; /* 保证子项等高 */
}
.progress-section {
  flex: 1.7;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 32px 32px 24px 32px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.section-title {
  font-size: 26px;
  font-weight: 700;
  color: #222;
}
.section-link {
  color: #7c3aed;
  font-size: 16px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.section-link:hover {
  color: #5b21b6;
}
.progress-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.progress-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  padding: 22px 28px;
  gap: 24px;
}
.progress-circle {
  width: 80px;
  height: 80px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-circle .circle-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #222;
}
.progress-circle.blue svg circle[stroke="#6366f1"] {
  stroke: #6366f1;
}
.progress-circle.purple svg circle[stroke="#a78bfa"] {
  stroke: #a78bfa;
}
.progress-circle.pink svg circle[stroke="#f472b6"] {
  stroke: #f472b6;
}
.progress-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.progress-title {
  font-size: 20px;
  font-weight: 700;
  color: #222;
}
.progress-desc {
  font-size: 15px;
  color: #666;
  margin-bottom: 6px;
}
.progress-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-bar-bg {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 8px;
}
.progress-bar {
  height: 100%;
  border-radius: 8px;
}
.progress-bar.blue {
  background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
}
.progress-bar.purple {
  background: linear-gradient(90deg, #a78bfa 0%, #c4b5fd 100%);
}
.progress-bar.pink {
  background: linear-gradient(90deg, #f472b6 0%, #f9a8d4 100%);
}
.progress-status {
  font-size: 14px;
  color: #7c3aed;
  font-weight: 600;
  background: #ede9fe;
  border-radius: 8px;
  padding: 2px 10px;
}
.progress-percent {
  font-size: 15px;
  color: #888;
  font-weight: 600;
}
.quick-section {
  flex: 1;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 32px 24px 24px 24px;
  min-width: 320px;
  max-width: 370px;
  /* height: 100%;  // 这一行去掉 */
  display: flex;
  flex-direction: column;
}
.quick-section .section-title {
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin-bottom: 18px;
}
.quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  flex: 1;
  align-items: stretch;
}
.quick-card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 0 12px 0;
  gap: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
}
.quick-card:hover {
  background: #f3f4f6;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}
.quick-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
.quick-card.blue .quick-icon {
  background: #6366f1;
}
.quick-card.purple .quick-icon {
  background: #a78bfa;
}
.quick-card.pink .quick-icon {
  background: #f472b6;
}
.quick-card.green .quick-icon {
  background: #6ee7b7;
}
.quick-card.yellow .quick-icon {
  background: #fde68a;
}
.quick-card.red .quick-icon {
  background: #fca5a5;
}
.quick-text {
  font-size: 16px;
  color: #222;
  font-weight: 600;
}
.record-achievement-content {
  display: flex;
  flex-direction: row;
  gap: 32px;
  max-width: 1350px;
  margin: 0 auto;
  margin-top: 32px;
  align-items: stretch;
}
.record-section {
  flex: 2;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 36px 32px 28px 32px;
}
.record-list {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.record-item {
  display: flex;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
}
.record-item:last-child {
  border-bottom: none;
}
.record-thumb {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 20px;
}
.record-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.record-title {
  font-size: 18px;
  font-weight: 700;
  color: #222;
}
.record-desc {
  font-size: 15px;
  color: #888;
}
.record-status {
  font-size: 15px;
  font-weight: 600;
  border-radius: 12px;
  padding: 4px 16px;
  margin-left: 18px;
  min-width: 60px;
  text-align: center;
}
.record-status.studying {
  background: #e0e7ff;
  color: #6366f1;
}
.record-status.finished {
  background: #d1fae5;
  color: #22c55e;
}
.record-status.paused {
  background: #fef3c7;
  color: #f59e42;
}
.achievement-section {
  flex: 1.1;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 36px 28px 28px 28px;
  /* min-width: 32px; */
  max-width: 362px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.achievement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.achievement-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}
.progress-text {
  font-size: 15px;
  color: #888;
  font-weight: 600;
}
.progress-bar-bg {
  width: 60px;
  height: 7px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.progress-bar-main {
  height: 100%;
  background: linear-gradient(90deg, #a78bfa 0%, #6366f1 100%);
  border-radius: 8px;
}
.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}
.achievement-item {
  display: flex;
  align-items: center;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  padding: 16px 18px;
  gap: 16px;
}
.achievement-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.achievement-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.achievement-title {
  font-size: 17px;
  font-weight: 700;
  color: #222;
}
.achievement-desc {
  font-size: 14px;
  color: #888;
}
.achievement-mark {
  font-size: 22px;
  font-weight: 700;
  color: #fbbf24;
  margin-left: 10px;
}
.achievement-item.green .achievement-mark {
  color: #22c55e;
}
.achievement-item.blue .achievement-mark {
  color: #3b82f6;
}
.achievement-item.purple .achievement-mark {
  color: #a78bfa;
}
.achievement-item.red .achievement-mark {
  color: #f87171;
}
.achievement-btn {
  width: 100%;
  background: linear-gradient(90deg, #a78bfa 0%, #6366f1 100%);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 14px 0;
  margin-top: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: background 0.2s;
}
.achievement-btn:hover {
  background: linear-gradient(90deg, #6366f1 0%, #a78bfa 100%);
}
</style>
