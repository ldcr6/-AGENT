<template>
  <footer class="footer-bar">
    <div class="footer-main">
      <div class="footer-cols">
        <div class="footer-col">
          <div class="footer-title">企业服务</div>
          <a href="#"><span class="dot"></span>职位搜索</a>
          <a href="#"><span class="dot"></span>企业招聘</a>
          <a href="#"><span class="dot"></span>校园招聘</a>
          <a href="#"><span class="dot"></span>API开放平台</a>
        </div>
        <div class="footer-col">
          <div class="footer-title">帮助中心</div>
          <a href="#"><span class="dot"></span>常见问题</a>
          <a href="#"><span class="dot"></span>用户协议</a>
          <a href="#"><span class="dot"></span>隐私政策</a>
          <a href="#"><span class="dot"></span>防骗指南</a>
        </div>
        <div class="footer-col">
          <div class="footer-title">联系我们</div>
          <div class="footer-contact">
            <i class="fa fa-envelope"></i> contact@lemians.com
          </div>
          <div class="footer-contact">
            <i class="fa fa-phone"></i> 400-123-4567
          </div>
          <div class="footer-contact">
            <i class="fa fa-clock-o"></i> 工作时间：9:00-18:00
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-title">关于乐面</div>
          <a href="#"><span class="dot"></span>平台介绍</a>
          <a href="#"><span class="dot"></span>加入我们</a>
          <a href="#"><span class="dot"></span>意见反馈</a>
        </div>
      </div>
      <div class="footer-links-row">
        <div class="footer-links" :class="{collapsed: !showAllLinks}">
          <span class="footer-links-title">友情链接：</span>
          <a v-for="(link, idx) in links" :key="link" href="#" class="footer-link"
            v-show="showAllLinks || idx < maxLinks">{{ link }}</a>
        </div>
        <button v-if="links.length > maxLinks" class="expand-btn" @click="showAllLinks = !showAllLinks">
          <span v-if="showAllLinks">收起</span>
          <span v-else>展开</span>
          <i :class="showAllLinks ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
        </button>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-main">
        <span>© 2025 乐面招聘平台 All Rights Reserved.</span>
        <span class="icp">粤ICP备2025000000号</span>
        <span>人力资源服务许可证 1234567890</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
  data() {
    return {
      links: [
        '北京招聘', '上海招聘', '广州招聘', '深圳招聘', '杭州招聘', '南京招聘', '成都招聘', '武汉招聘', '西安招聘', '苏州招聘', '厦门招聘', '青岛招聘', '郑州招聘', '长沙招聘', '福州招聘', '合肥招聘', '重庆招聘', '天津招聘', '石家庄招聘', '更多...'
      ],
      showAllLinks: true,
      maxLinks: 10
    }
  }
}
</script>

<style scoped>
.footer-bar {
  width: 100vw;
  height: 100%;
  background: #f8fafc;
  border-top: 1px solid #e6e6e6;
  color: #666;
  font-size: 1rem;
  margin-top: 48px;
  
}
.footer-main {
  max-width: 1480px;
  margin: 0 auto;
  padding: 40px 24px 0 24px;
  border-radius: 18px 18px 0 0;
  background: #fff;
  /* box-shadow: 0 rgba(37,99,235,0.04); */
}
.footer-cols {
  display: flex;
  gap: 48px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.footer-col {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-title {
  font-weight: 800;
  color: #22223b;
  margin-bottom: 8px;
  font-size: 1.13rem;
  letter-spacing: 1px;
}
.footer-col a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
  border-radius: 6px;
  padding: 2px 0 2px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.footer-col a:hover {
  color: #fff;
  background: #19c2c6;
}
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #19c2c6;
  border-radius: 50%;
  margin-right: 2px;
}
.footer-col span,
.footer-contact {
  color: #888;
  font-size: 0.98rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.footer-contact i {
  color: #19c2c6;
  font-size: 1.08rem;
}
.footer-links {
  margin: 24px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  font-size: 0.98rem;
  border-top: 1px dashed #e6e6e6;
  padding-top: 16px;
  max-height: 2.6em;
  overflow: hidden;
  transition: max-height 0.3s;
  flex: 1;
}
.footer-links.collapsed {
  max-height: 2.6em;
  overflow: hidden;
}
.footer-links:not(.collapsed) {
  max-height: 100em;
  overflow: visible;
}
.footer-links-title {
  color: #888;
  font-weight: 600;
}
.footer-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
  border-radius: 6px;
  padding: 2px 8px;
}
.footer-link:hover {
  color: #fff;
  background: #19c2c6;
}
.footer-bottom {
  background: #f4f8fb;
  border-top: 1px solid #e6e6e6;
  margin-top: 0;
  padding: 18px 0 10px 0;
}
.footer-bottom-main {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.98rem;
}
.icp {
  color: #aaa;
}
.footer-links-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 0 0 0;
  position: relative;
}
.expand-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 1.08rem;
  cursor: pointer;
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
  transition: color 0.2s;
  white-space: nowrap;
  height: 100%;
  padding-top: 16px;
}
.expand-btn:hover {
  color: #2563eb;
}
@media (max-width: 900px) {
  .footer-cols {
    flex-direction: column;
    gap: 18px;
  }
  .footer-main {
    padding: 24px 8px 0 8px;
  }
}
</style> 