<template>
  <div class="main-content">
    <div class="main-content-title">职位搜查</div>
    <!-- 上方：搜索栏和热门标签 -->
    <section class="top-row">
      <div class="search-bar-boss">
        <div class="search-type">
          <span>职位类型</span>
          <i class="fa fa-angle-down"></i>
        </div>
        <input class="search-input" type="text" placeholder="搜索职位、公司" />
        <div class="search-location">
          <i class="fa fa-map-marker"></i>
          <span>地图</span>
        </div>
        <button class="search-btn">搜索</button>
      </div>
      <div class="hot-tags-boss">
        <span class="hot-label">热门职位：</span>
        <span class="hot-tag">游戏场景</span>
        <span class="hot-tag">JavaScript</span>
        <span class="hot-tag">前端开发工程师</span>
        <span class="hot-tag">游戏角色</span>
        <span class="hot-tag">U3D</span>
        <span class="hot-tag">游戏动作</span>
        <span class="hot-tag">游戏特效</span>
        <span class="hot-tag">Cocos</span>
      </div>
    </section>
    <!-- 下方：左热门行业，右广告区/详细行业区 -->
    <section class="bottom-row" @mouseleave="activeCategoryIndex = null">
      <aside class="category-list">
        <ul>
          <li v-for="(cat, idx) in categories" :key="cat.name"
              @mouseenter="activeCategoryIndex = idx">
            <div class="main-cat">
              <div class="main-cat-row">
                {{ cat.name }}
                <span class="arrow">&gt;</span>
              </div>
              <div class="sub-cat-row">
                <span v-for="sub in cat.sub" :key="sub" class="sub-cat">{{ sub }}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="cat-footer">
          <span class="page-num">{{ currentPage + 1 }} / {{ totalPages }}</span>
          <button class="cat-btn" @click="prevPage" :disabled="currentPage === 0"><i class="fa fa-chevron-left"></i></button>
          <button class="cat-btn" @click="nextPage" :disabled="currentPage === totalPages - 1"><i class="fa fa-chevron-right"></i></button>
        </div>
      </aside>
      <div class="ad-box">
        <div v-if="activeCategoryIndex === null">
          <div class="ad-grid">
            <div class="ad-item ad1">
              <div class="ad-label">直聘简历</div>
              <h4>写好简历 找好工作</h4>
              <p>免费设计 海量模板 智能润色</p>
            </div>
            <div class="ad-item ad2">
              <h4>最前端 有“钱”途</h4>
              <p>Web前端工程师岗位热推</p>
              <div class="ad-label ad-label-right">广告</div>
            </div>
            <div class="ad-item ad3">
              <h4>算法解决一切</h4>
              <p>算法工程师职位精选</p>
            </div>
            <div class="ad-item ad4">
              <h4>物流招聘专区</h4>
              <p>物流·配送·供应链</p>
            </div>
          </div>
        </div>
        <div v-else class="industry-detail-box">
          <div class="industry-title">{{ categories[activeCategoryIndex].name }}</div>
          <div v-for="group in categories[activeCategoryIndex].detail" :key="group.group" class="industry-group">
            <div class="industry-group-title">{{ group.group }}</div>
            <div class="industry-jobs">
              <span v-for="job in group.jobs" :key="job" class="industry-job">{{ job }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCategoryIndex: null,
      currentPage: 0,
      categoriesPages: [
        [ // 第1页
          {
            name: '互联网/AI',
            sub: ['U3D', 'iOS', '技术美术'],
            detail: [
              { group: '后端开发', jobs: ['Java', 'C/C++', 'PHP', 'Python', 'C#', '.NET', 'Golang', 'Node.js', 'Ruby', 'Perl', 'Scala', 'Kotlin', 'Rust', 'Erlang', 'Delphi'] },
              { group: '前端/移动开发', jobs: ['前端开发工程师', 'Android', 'iOS', 'U3D', 'UE4', 'Cocos', '技术美术', 'JavaScript', 'TypeScript', '小程序开发', 'Flutter', 'React Native', '鸿蒙开发工程师'] },
              { group: '测试', jobs: ['测试工程师', '软件测试', '自动化测试', '功能测试', '测试开发', '硬件测试', '游戏测试', '性能测试', '渗透测试', '测试经理', '测试主管', '测试架构师'] },
             
              
            ]
          },
          {
            name: '电子/电气/通信',
            sub: ['电子工程师', '硬件工程师'],
            detail: [
              { group: '电子类', jobs: ['电子工程师', '嵌入式开发', '电路设计', '单片机开发', 'FPGA开发', '射频工程师', 'PCB设计', '电源工程师', '自动化工程师'] },
              { group: '通信类', jobs: ['通信工程师', '无线通信', '信号处理', '光通信', '移动通信', '网络优化', '通信测试', '通信设备研发'] },
              { group: '硬件类', jobs: ['硬件工程师', '硬件测试', '硬件维护', '硬件开发', '硬件结构工程师'] }
            ]
          },
          {
            name: '产品',
            sub: ['产品经理', '产品专员/助理'],
            detail: [
              { group: '产品管理', jobs: ['产品经理', '产品专员', '产品助理', '产品总监', '产品架构师', '产品运营', '产品策划', '产品设计'] },
              { group: '用户体验', jobs: ['用户研究', '交互设计', 'UI设计', 'UX设计', '原型设计'] }
            ]
          },
          {
            name: '客服/运营',
            sub: ['客服专员', '客服主管', '客服经理'],
            detail: [
              { group: '客服岗位', jobs: ['客服专员', '客服主管', '客服经理', '在线客服', '售后客服', '呼叫中心客服', '投诉处理'] },
              { group: '运营岗位', jobs: ['运营专员', '内容运营', '活动运营', '新媒体运营', '社区运营', '用户运营', '数据运营', '电商运营', '产品运营', '品牌运营'] }
            ]
          },
          {
            name: '销售',
            sub: ['销售专员', '电话销售', '网络销售'],
            detail: [
              { group: '销售岗位', jobs: ['销售专员', '电话销售', '网络销售', '销售经理', '大客户销售', '渠道销售', '区域销售', '销售总监', '客户代表', '客户经理', '商务拓展', '销售助理'] }
            ]
          },
          {
            name: '人力/行政/法务',
            sub: ['人力资源专员/助理'],
            detail: [
              { group: '人力资源', jobs: ['人力资源专员', '招聘专员', '培训专员', '薪酬专员', '绩效专员', '员工关系', 'HRBP', '人事助理'] },
              { group: '行政', jobs: ['行政专员', '行政助理', '行政主管', '行政经理', '前台', '文员', '档案管理'] },
              { group: '法务', jobs: ['法务专员', '法务助理', '合同管理', '知识产权专员', '律师助理'] }
            ]
          },
          {
            name: '财务/审计/税务',
            sub: ['会计', '总账会计', '成本会计'],
            detail: [
              { group: '财务岗位', jobs: ['会计', '总账会计', '成本会计', '出纳', '财务分析', '财务主管', '财务经理', '财务总监', '税务专员', '审计专员', '审计经理', '报销会计', '资产会计'] }
            ]
          }
        ],
        [ // 第2页
          {
            name: '生产制造',
            sub: ['普工/操作工', '包装工', '学徒工'],
            detail: [
              { group: '生产岗位', jobs: ['普工', '操作工', '包装工', '学徒工', '组装工', '质检员', '设备操作员', '生产主管', '生产经理', '生产计划员', '车间主任'] }
            ]
          },
          {
            name: '零售/生活服务',
            sub: ['店员/营业员', '收银', '导购'],
            detail: [
              { group: '零售岗位', jobs: ['店员', '营业员', '收银', '导购', '理货员', '促销员', '店长', '卖场经理', '理发师', '美容师', '家政服务'] }
            ]
          },
          {
            name: '餐饮',
            sub: ['服务员', '收银', '礼仪/迎宾/接待'],
            detail: [
              { group: '餐饮岗位', jobs: ['服务员', '收银', '礼仪', '迎宾', '接待', '传菜员', '厨师', '后厨', '餐厅经理', '餐饮主管', '洗碗工'] }
            ]
          },
          {
            name: '酒店/旅游',
            sub: ['酒店前台', '礼仪/迎宾/接待'],
            detail: [
              { group: '酒店岗位', jobs: ['酒店前台', '礼仪', '迎宾', '接待', '客房服务员', '行李员', '酒店经理', '酒店主管', '旅游顾问', '导游', '票务员'] }
            ]
          },
          {
            name: '教育培训',
            sub: ['教师', '英语教师', '助教'],
            detail: [
              { group: '教育岗位', jobs: ['教师', '英语教师', '助教', '班主任', '学科老师', '数学老师', '语文老师', '物理老师', '化学老师', '美术老师', '音乐老师', '体育老师', '幼教', '培训讲师'] }
            ]
          },
          {
            name: '设计',
            sub: ['平面设计', '美工', '设计师助理'],
            detail: [
              { group: '设计岗位', jobs: ['平面设计', '美工', '设计师助理', 'UI设计', 'UX设计', '工业设计', '服装设计', '室内设计', '动画设计', '插画师', '视觉设计', '包装设计'] }
            ]
          },
          {
            name: '房地产/建筑',
            sub: ['建筑施工项目经理', '工程造价'],
            detail: [
              { group: '建筑岗位', jobs: ['建筑施工项目经理', '工程造价', '土建工程师', '结构工程师', '建筑设计师', '预算员', '施工员', '安全员', '资料员', '房地产销售', '物业经理', '物业专员'] }
            ]
          }
        ],
        [ // 第3页
          {
            name: '直播/影视/传媒',
            sub: ['主播', '带货主播', '直播运营'],
            detail: [
              { group: '直播岗位', jobs: ['主播', '带货主播', '直播运营', '短视频运营', '视频剪辑', '摄像师', '编导', '后期制作', '内容策划', '新媒体编辑', '配音员', '摄影师'] }
            ]
          },
          {
            name: '市场/公关/广告',
            sub: ['市场营销策划', '海外市场'],
            detail: [
              { group: '市场岗位', jobs: ['市场营销策划', '市场专员', '海外市场', '市场经理', '市场总监', '品牌策划', '活动策划', '公关专员', '广告设计', '广告投放', '媒介专员', '媒介经理'] }
            ]
          },
          {
            name: '物流/仓储/司机',
            sub: ['物流专员', '物流经理'],
            detail: [
              { group: '物流岗位', jobs: ['物流专员', '物流经理', '仓库管理员', '司机', '快递员', '配送员', '仓储主管', '运输调度', '货运司机', '叉车工', '仓库文员'] }
            ]
          },
          {
            name: '采购/贸易',
            sub: ['采购专员/助理', '采购经理/主管'],
            detail: [
              { group: '采购岗位', jobs: ['采购专员', '采购助理', '采购经理', '采购主管', '外贸专员', '外贸经理', '进出口专员', '报关员', '贸易跟单', '供应链专员'] }
            ]
          },
          {
            name: '汽车',
            sub: ['电池工程师', '电机工程师', '车身/造型设计'],
            detail: [
              { group: '汽车岗位', jobs: ['电池工程师', '电机工程师', '车身设计', '造型设计', '汽车维修', '汽车销售', '汽车检测', '汽车工程师', '汽车电子', '汽车服务顾问'] }
            ]
          },
          {
            name: '医疗健康',
            sub: ['护士', '导医', '护士长'],
            detail: [
              { group: '医疗岗位', jobs: ['护士', '导医', '护士长', '医生助理', '医生', '药剂师', '检验师', '放射科', '康复治疗师', '理疗师', '口腔医生', '中医师'] }
            ]
          },
          {
            name: '金融',
            sub: ['柜员', '银行大堂经理', '客户经理'],
            detail: [
              { group: '金融岗位', jobs: ['柜员', '银行大堂经理', '客户经理', '理财顾问', '信贷专员', '保险顾问', '证券经纪人', '投资顾问', '风控专员', '金融分析师', '基金经理'] }
            ]
          }
        ],
        [ // 第4页
          {
            name: '项目管理',
            sub: ['项目经理/主管', '项目专员/助理'],
            detail: [
              { group: '项目管理', jobs: ['项目经理', '项目主管', '项目专员', '项目助理', '项目总监', 'PMO', '项目计划员', '项目协调员', '项目支持', '项目文员'] }
            ]
          },
          {
            name: '咨询/翻译/法律',
            sub: ['知识产权/专利/商标代理人'],
            detail: [
              { group: '法律岗位', jobs: ['知识产权代理人', '专利代理人', '商标代理人', '律师助理', '律师', '法务专员', '法务经理', '合同专员', '合规专员', '翻译', '同声传译', '法律顾问'] }
            ]
          },
          {
            name: '能源/环保/农业',
            sub: ['光伏系统工程师'],
            detail: [
              { group: '能源岗位', jobs: ['光伏系统工程师', '环保工程师', '农业技术员', '新能源工程师', '水利工程师', '环境监测', '农艺师', '林业工程师', '生态修复'] }
            ]
          },
          {
            name: '高级管理',
            sub: ['总裁/总经理/CEO'],
            detail: [
              { group: '管理岗位', jobs: ['总裁', '总经理', 'CEO', 'COO', 'CFO', 'CTO', '董事长', '副总经理', '事业部总经理', '分公司经理', '总助', '办公室主任'] }
            ]
          },
          {
            name: '其他',
            sub: ['其他职位'],
            detail: [
              { group: '其他岗位', jobs: ['其他职位', '实习生', '兼职', '志愿者', '自由职业', '临时工', '储备干部', '管培生', '退伍军人', '残疾人岗位', '退休返聘'] }
            ]
          }
        ]
      ]
    }
  },
  computed: {
    categories() {
      return this.categoriesPages[this.currentPage];
    },
    totalPages() {
      return this.categoriesPages.length;
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.activeCategoryIndex = null;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.activeCategoryIndex = null;
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 40px auto 0 auto;
  max-width: 1500px;
  min-height: 480px;
  background: #f4f8fb;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 16px 16px 24px 16px;
}
.main-content-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
  color: #22223b;
  margin-top: 60px;
  margin-bottom: 18px;
  letter-spacing: 2px;
  line-height: 1.1;
}
.top-row {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}
.bottom-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  align-items: stretch;
}
.category-list {
  width: 340px;
  min-height: 220px;
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px 16px 12px 16px;
  box-shadow: 0 2px 12px rgba(37,99,235,0.06);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.category-list h3 {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: #2563eb;
}
.category-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-list li {
  margin-bottom: 14px; /* 原来是18px，可以根据实际效果调整 */
}
.main-cat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.main-cat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.13rem;
  font-weight: 700;
  color: #22223b;
}
.arrow {
  margin-left: 16px;
  color: #2563eb;      /* 更明显的蓝色 */
  font-size: 1.5rem;   /* 更大 */
  font-weight: 900;    /* 更粗 */
  flex-shrink: 0;
  line-height: 1;
  display: flex;
  align-items: center;
}
.sub-cat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0 12px;
  margin-top: 2px;
}
.sub-cat {
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280;
}
.cat-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
  gap: 10px;
}
.page-num {
  color: #19c2c6;
  font-size: 1.1rem;
  margin-right: 8px;
}
.cat-btn {
  background: #e6f8fa;
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #19c2c6;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}
.cat-btn:hover {
  background: #19c2c6;
  color: #fff;
}
/* 新搜索栏样式 */
.search-bar-boss {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.06);
  border: 2px solid #19c2c6;
  padding: 0 24px;
  height: 64px;
  gap: 0;
  width: 95%;
  max-width: 100%;
  margin: 0 auto;
}
.search-type {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #222;
  font-weight: 500;
  padding: 0 18px 0 0;
  min-width: 110px;
  cursor: pointer;
}
.search-type i {
  margin-left: 6px;
  font-size: 1.1em;
  color: #bbb;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.08rem;
  padding: 0 18px;
  background: transparent;
  color: #444;
}
.search-location {
  display: flex;
  align-items: center;
  color: #888;
  font-size: 1.08rem;
  padding: 0 18px;
  min-width: 80px;
  cursor: pointer;
}
.search-location i {
  margin-right: 6px;
  font-size: 1.2em;
}
.search-btn {
  background: #19c2c6;
  color: #fff;
  border: none;
  border-radius: 18px;
  font-size: 1.18rem;
  font-weight: 700;
  padding: 0 38px;
  height: 44px;
  margin-left: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25,194,198,0.10);
  transition: background 0.2s, transform 0.2s;
}
.search-btn:hover {
  background: #13b0b4;
  transform: translateY(-2px) scale(1.03);
}
.hot-tags-boss {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
  margin-left: 8px;
}
.hot-label {
  color: #888;
  font-size: 1.02rem;
}
.hot-tag {
  background: #e6f8fa;
  color: #19c2c6;
  border-radius: 12px;
  padding: 6px 18px;
  font-size: 1.02rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border: none;
  display: inline-block;
}
.hot-tag:hover {
  background: #19c2c6;
  color: #fff;
}
.banner-row {
  display: none;
}
.ad-box {
  flex: 1;
  padding-left: 24px;
  min-width: 0;
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
.ad-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  width: 135%;
  height: 100%;
}
.ad-item {
  border-radius: 16px;
  padding: 32px 24px;
  min-height: 180px;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(37,99,235,0.10);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.ad1 {
  background: linear-gradient(120deg, #7f9cf5 0%, #a5b4fc 100%);
}
.ad2 {
  background: linear-gradient(120deg, #38bdf8 0%, #6366f1 100%);
}
.ad3 {
  background: linear-gradient(120deg, #a78bfa 0%, #f472b6 100%);
}
.ad4 {
  background: linear-gradient(120deg, #fbbf24 0%, #f59e42 100%);
  color: #fff7e6;
}
.ad-label {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(255,255,255,0.18);
  color: #fff;
  font-size: 0.92rem;
  padding: 2px 12px;
  border-radius: 12px;
  font-weight: 400;
}
.ad-label-right {
  left: auto;
  right: 18px;
}
.industry-detail-box {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(37,99,235,0.06);
  padding: 32px 32px 24px 32px;
  min-height: 455px;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
}
.industry-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #22223b;
  margin-bottom: 8px;
}
.industry-group {
  margin-bottom: 10px;
}
.industry-group-title {
  font-size: 1.08rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 4px;
}
.industry-jobs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
}
.industry-job {
  font-size: 1rem;
  color: #444;
  background: #f4f8fb;
  border-radius: 8px;
  padding: 4px 14px;
  margin-bottom: 2px;
}
</style> 