<template>
   <HeaderBar />
  <div class="study-page">
    <!-- B站风格标签栏 -->
    <div class="bili-tabbar">
      <div class="tabbar-row">
        <div class="tabbar-left">
          <div class="tabbar-left-top">
            <img class="avatar" src="@/assets/avatar.png" alt="avatar" />
            <div class="tab tab-dongtai">
              <svg class="tab-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e6e6e6"/></svg>
              动态
            </div>
            <div class="tab tab-hot active">
              <svg class="tab-icon" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 12a5 5 0 0 0 10 0c0-4-5-10-5-10z" fill="#ff6d6d"/></svg>
              热门
            </div>
            <div class="tab" v-for="cat in mainTabs" :key="cat.name">{{ cat.name }}</div>
          </div>
          <div class="tabbar-right">
            <div class="tab more-tab"
                 @mouseenter="showMore = true"
                 @mouseleave="showMore = false">
              更多
              <svg class="tab-icon" style="margin-left:2px;" viewBox="0 0 24 24" width="16" height="16"><path d="M7 10l5 5 5-5z" fill="#888"/></svg>
              <div class="dropdown grid-dropdown"
                   v-if="showMore"
                   @mouseenter="showMore = true"
                   @mouseleave="showMore = false">
                <div class="dropdown-item" v-for="cat in moreAllTabs" :key="cat.name">{{ cat.name }}</div>
              </div>
            </div>
            <div class="tab" v-for="func in funcTabs" :key="func.name">{{ func.name }}</div>
          </div>
        </div>
        <div class="tabbar-divider"></div>
        <div class="tabbar-other">
          <div class="other-item" v-for="item in otherTabs" :key="item.name">
            <span class="other-icon" v-html="item.icon"></span>
            <span class="other-text">{{ item.name }}</span>
          </div>
        </div>
      </div>
     
    </div>
      <!-- 主内容区：左轮播+右视频卡片 -->
      <div class="content-row">
        <!-- 左侧轮播图 -->
        <div class="left-carousel">
          <div
            class="carousel-img"
            :style="{ backgroundImage: `url(${carouselImgs[carouselIndex]})` }"
            @mouseenter="stopCarousel"
            @mouseleave="startCarousel"
          >
            <div class="carousel-desc">{{ carouselDescs[carouselIndex] }}</div>
            <div class="carousel-controls">
              <button @click="prevCarousel">&lt;</button>
              <button @click="nextCarousel">&gt;</button>
            </div>
            <div class="carousel-dots">
              <span v-for="(img, idx) in carouselImgs" :key="idx" :class="{ active: idx === carouselIndex }" @click="goToCarousel(idx)"></span>
            </div>
          </div>
        </div>
        <!-- 右侧视频推荐卡片 -->
        <div class="right-videos">
          <div v-for="video in rightVideos" :key="video.id" class="video-card"
               @mouseenter="activeVideoId = video.id"
               @click="goToVideo(video.id)"
               style="position:relative;">
            <div class="cover" :style="{ backgroundImage: `url(${video.cover})` }">
              <span class="duration">{{ video.duration }}</span>
              <iframe
                v-if="activeVideoId === video.id"
                :src="`https://player.bilibili.com/player.html?bvid=${video.bvid}&autoplay=0`"
                frameborder="0"
                allowfullscreen
                width="100%"
                height="130"
                style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;border-radius:16px;pointer-events:none;"
              ></iframe>
              <button
                v-if="activeVideoId === video.id"
                @click.stop="activeVideoId = null"
                style="position:absolute;top:6px;right:6px;z-index:3;background:rgba(0,0,0,0.4);color:#fff;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;"
              >×</button>
            </div>
            <div class="info">
              <div class="title">{{ video.title }}</div>
              <div class="meta">
                <span class="views">{{ video.views }}播放</span>
                <span class="uploader">UP主：{{ video.uploader }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SwitchButton @switch="handleSwitch" />

      <!-- 推荐课程区 -->
      <div class="course-section">
        <div class="course-header">
          <span class="course-title">推荐课程</span>
          <button class="course-more">查看全部 &gt;</button>
        </div>
        <div class="course-list">
          <div class="course-card" v-for="course in courses" :key="course.id">
            <div class="course-cover" :style="{ backgroundImage: `url(${course.cover})` }"></div>
            <div class="course-info">
              <div class="course-name">{{ course.name }}</div>
              <div class="course-meta">
                <span class="course-teacher">👤{{ course.teacher }}</span>
                <span class="course-free">免费</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 开发者Talk区 -->
      <div class="talk-section">
        <div class="talk-header">
          <span class="talk-title">AI学习Talk</span>
          <div class="talk-tabs">
            <span
              v-for="city in talkTabs"
              :key="city"
              :class="{ active: city === selectedTalkTab }"
              @click="selectedTalkTab = city"
            >{{ city }}</span>
          </div>
          <button class="talk-more">查看全部 &gt;</button>
        </div>
        <div class="talk-content-row">
          <div class="talk-left-img" :style="{ backgroundImage: `url(${talkLeftImg})` }"></div>
          <div class="talk-card-list">
            <div class="talk-card" v-for="talk in filteredTalks" :key="talk.id">
              <div class="talk-card-cover" :style="{ backgroundImage: `url(${talk.cover})` }"></div>
              <div class="talk-card-info">
                <div class="talk-card-title">{{ talk.title }}</div>
                <div class="talk-card-meta">
                  <span class="talk-card-teacher">👤{{ talk.teacher }}</span>
                  <span class="talk-card-free">免费</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 学科学习路线图模块 -->
      <div class="roadmap-section">
        <div class="roadmap-title">
          <span class="roadmap-title-line"></span>
          <span class="roadmap-title-text">各学科学习路线图</span>
          <span class="roadmap-title-line"></span>
          
        </div>
        <div class="roadmap-list">
          <div
            class="roadmap-card"
            v-for="item in roadmapList"
            :key="item.title"
            @mouseenter="item.hover = true"
            @mouseleave="item.hover = false"
          >
            <div class="roadmap-icon" v-html="item.icon"></div>
            <div class="roadmap-card-title">{{ item.title }}</div>
            <div class="roadmap-card-desc">{{ item.desc }}</div>
            <button
              class="roadmap-btn"
              v-show="item.hover"
              @click="viewRoadmap(item)"
            >查看学习路线</button>
          </div>
        </div>
      </div>
    
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue';
import FooterBar from '../components/FooterBar.vue';
import SwitchButton from '../components/SwitchButton.vue';
export default {
  name: "StudyRecommendPage",
  components: {
    HeaderBar,
    FooterBar,
    SwitchButton
  },
  data() {
    return {
      showMore: false,
      mainTabs: [
        { name: '前端', icon: '' },
        { name: '后端', icon: '' },
        { name: '算法', icon: '' },
        { name: 'AI', icon: '' },
        { name: '考研', icon: '' },
       
       
      ],
      subTabs: [
        { name: '数据库', icon: '' },
        { name: '网络', icon: '' },
        { name: '操作系统', icon: '' },
        { name: '数据结构', icon: '' },
        { name: '编译原理', icon: '' },
        { name: '软件工程', icon: '' },
        { name: '信息安全', icon: '' },
        { name: '产品', icon: '' },
        { name: '测试', icon: '' },
        { name: '运维', icon: '' },
        { name: 'UI设计', icon: '' },
        { name: '产品经理', icon: '' },
      ],
      moreAllTabs: [
        { name: '小剧场' }, { name: '动物' }, { name: '家装房产' }, { name: '旅游出行' }, { name: '情感' }, { name: '超高清' },
        { name: '汽车' }, { name: 'vlog' }, { name: '户外潮流' }, { name: '三农' }, { name: '生活兴趣' },
        { name: '时尚美妆' }, { name: '绘画' }, { name: '健身' }, { name: '亲子' }, { name: '生活经验' },
        { name: '体育运动' }, { name: '人工智能' }, { name: '手工' }, { name: '健康' }, { name: '公益' }
      ],
      funcTabs: [
        { name: '专栏', icon: '' },
        { name: '活动', icon: '' },
        { name: '社区中心', icon: '' },
        { name: '直播', icon: '' },
        { name: '课堂', icon: '' },
        { name: '视频热榜', icon: '' },
        { name: '考证', icon: '' },
      ],
      otherTabs: [
        { name: '专栏', icon: '<svg width="22" height="22" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" fill="#888"/></svg>' },
        { name: '活动', icon: '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 18l8-12 8 12z" fill="#888"/></svg>' },
        { name: '社区中心', icon: '<svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" fill="#888"/></svg>' },
        { name: '直播', icon: '<svg width="22" height="22" viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="8" rx="2" fill="#888"/></svg>' },
        { name: '课堂', icon: '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#888"/></svg>' },
        { name: '新歌热榜', icon: '<svg width="22" height="22" viewBox="0 0 24 24"><rect x="6" y="8" width="12" height="8" rx="2" fill="#888"/></svg>' },
      ],
      carouselImgs: [
        require("@/assets/深度学习.png"),
        require("@/assets/AI项目实战.png"),
        require("@/assets/算法题.png"),
        require("@/assets/机器学习.png"),
        require("@/assets/数据结构与算法.png"),
        require("@/assets/大数据.png"),
      ],
      carouselDescs: [
        "深度学习府惊蛰，今后将继续叱咤。",
        "AI助力学习，前路无限可能。",
        "算法刷题宝典，助力高效进步。",
        "机器学习经典案例，掌握核心算法。",
        "数据结构与算法精讲，夯实编程基础。",
        "大数据分析与应用，洞察数据价值。"
      ],
      carouselIndex: 0,
      categories: ["全部", "前端", "后端", "AI", "考研", "算法", "考证", "纪录片", "游戏", "音乐", "美食", "更多"],
      selectedCategory: "全部",
      videos: [
        {
          id: 1,
          cover: require('@/assets/前端.png'),
          title: '前端入门+进阶',
          uploader: 'B站UP主',
          views: '12.3万',
          duration: '02:34:21',
          category: '前端',
          bvid: 'BV1p84y1P7Z5'
        },
        {
          id: 2,
          cover: require('@/assets/Vue3.png'),
          title: 'Vue3实战教程',
          uploader: '前端开发',
          views: '8.7万',
          duration: '01:45:30',
          category: '前端',
          bvid: 'BV1HV4y1a7n4'
        },
        {
          id: 3,
          cover: require('@/assets/react.png'),
          title: 'React hooks详解',
          uploader: '前端技术',
          views: '5.2万',
          duration: '01:20:15',
          category: '前端',
          bvid: 'BV1wy4y1D7JT'
        },
        {
          id: 4,
          cover: require('@/assets/Java.png'),
          title: 'Java高级编程',
          uploader: 'JS学院',
          views: '10.5万',
          duration: '02:10:45',
          category: '前端',
          bvid: 'BV1PY411e7J6'
        },
        // 新增8个与算法、人工智能、大数据相关的视频
        {
          id: 5,
          cover: require('@/assets/人工智能.png'),
          title: '人工智能基础入门',
          uploader: 'AI实验室',
          views: '6.8万',
          duration: '01:30:00',
          category: 'AI',
          bvid: 'BV1ou411U7J4'
        },
        {
          id: 6,
          cover: require('@/assets/深度学习.png'),
          title: '深度学习实战',
          uploader: 'AI极客',
          views: '7.2万',
          duration: '02:10:00',
          category: 'AI',
          bvid: 'BV1Y7411d7Ys'
        },
        {
          id: 7,
          cover: require('@/assets/大数据.png'),
          title: '大数据分析与应用',
          uploader: '数据派',
          views: '4.9万',
          duration: '01:55:00',
          category: '大数据',
          bvid: 'BV1Qp4y1n7EN'
        },
        {
          id: 8,
          cover: require('@/assets/算法.png'),
          title: '算法基础与LeetCode刷题',
          uploader: '算法小白',
          views: '9.1万',
          duration: '02:20:00',
          category: '算法',
          bvid: 'BV1DW4y1f7p8'
        },
        {
          id: 9,
          cover: require('@/assets/机器学习.png'),
          title: '机器学习经典案例',
          uploader: 'ML达人',
          views: '3.7万',
          duration: '01:40:00',
          category: 'AI',
          bvid: 'BV1wBuyzBEjx'
        },
        {
          id: 10,
          cover: require('@/assets/数据结构与算法.png'),
          title: '数据结构与算法精讲',
          uploader: '算法工程师',
          views: '8.3万',
          duration: '02:00:00',
          category: '算法',
          bvid: 'BV1DW4y1f7p8'
        },
        {
          id: 11,
          cover: require('@/assets/Python.png'),
          title: 'Python大数据开发',
          uploader: '大数据学院',
          views: '5.6万',
          duration: '01:50:00',
          category: '大数据',
          bvid: 'BV1eZ421b7ag'
        },
        {
          id: 12,
          cover: require('@/assets/AI项目实战.png'),
          title: 'AI项目实战：图像识别',
          uploader: 'AI极客',
          views: '6.2万',
          duration: '01:35:00',
          category: 'AI',
          bvid: 'BV1puVazCEmS'
        }
      ],
      activeVideoId: null,
      courses: [
        {
          id: 1,
          cover: require('@/assets/AI项目实战.png'),
          name: 'AIGC前沿应用与项目实战（职场篇）',
          teacher: 'AI大学堂'
        },
        {
          id: 2,
          cover: require('@/assets/py.png'),
          name: 'Python基础入门',
          teacher: '赵权'
        },
        {
          id: 3,
          cover: require('@/assets/java1.png'),
          name: 'Java基础入门（上）',
          teacher: '王耀东'
        },
        {
          id: 4,
          cover: require('@/assets/C语言.png'),
          name: 'C语言基础与实战',
          teacher: '尚硅谷'
        },
        {
          id: 5,
          cover: require('@/assets/sql.png'),
          name: 'SQL入门',
          teacher: '宋伟'
        },
        {
          id: 6,
          cover: require('@/assets/深度学习.png'),
          name: '深度学习精品课程',
          teacher: '浙大人工智能协会'
        }
      ],
      talkTabs: ['北京', '重庆', '杭州', '南京'],
      selectedTalkTab: '北京',
      talkLeftImg: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      talks: [
        // 北京
        {
          id: 1,
          city: '北京',
          cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】北京站：多模态大模型前沿',
          teacher: 'AI大学堂'
        },
        {
          id: 2,
          city: '北京',
          cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】北京站：作为开发者的成长之路',
          teacher: 'AI大学堂'
        },
        {
          id: 3,
          city: '北京',
          cover: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】北京站：北京邮电大学专场',
          teacher: 'AI大学堂'
        },
        {
          id: 4,
          city: '北京',
          cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】北京站：深度解析AI应用',
          teacher: 'AI大学堂'
        },
        {
          id: 5,
          city: '北京',
          cover: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】北京站：多模态大模型前沿2',
          teacher: 'AI大学堂'
        },
        {
          id: 6,
          city: '北京',
          cover: require('@/assets/算法.png'),
          title: '【开发者Talk】北京站：多模态大模型前沿3',
          teacher: 'AI大学堂'
        },
        // 重庆
        {
          id: 7,
          city: '重庆',
          cover: "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】重庆站：前端框架新趋势',
          teacher: '前端联盟'
        },
        {
          id: 8,
          city: '重庆',
          cover: "https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】重庆站：AI与大数据融合',
          teacher: 'AI极客'
        },
        {
          id: 9,
          city: '重庆',
          cover: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】重庆站：后端微服务架构',
          teacher: '后端技术栈'
        },
        {
          id: 10,
          city: '重庆',
          cover: "https://images.unsplash.com/photo-1462206092226-f46025ffe607?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】重庆站：算法工程师成长之路',
          teacher: '算法工程师'
        },
        {
          id: 11,
          city: '重庆',
          cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】重庆站：云计算与安全',
          teacher: '云安全专家'
        },
        {
          id: 12,
          city: '重庆',
          cover: require('@/assets/数据结构与算法.png'),
          title: '【开发者Talk】重庆站：数据结构实战',
          teacher: '数据结构讲师'
        },
        // 杭州
        {
          id: 13,
          city: '杭州',
          cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】杭州站：AI产品经理的进阶',
          teacher: '产品经理'
        },
        {
          id: 14,
          city: '杭州',
          cover: "https://images.unsplash.com/photo-1469122312224-c5846569feb1?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】杭州站：前端性能优化',
          teacher: '前端联盟'
        },
        {
          id: 15,
          city: '杭州',
          cover: "https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】杭州站：深度学习实战',
          teacher: 'AI极客'
        },
        {
          id: 16,
          city: '杭州',
          cover: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】杭州站：后端高并发架构',
          teacher: '后端技术栈'
        },
        {
          id: 17,
          city: '杭州',
          cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】杭州站：算法竞赛经验分享',
          teacher: '算法工程师'
        },
        {
          id: 18,
          city: '杭州',
          cover: "https://images.unsplash.com/photo-1462206092226-f46025ffe607?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】杭州站：大数据平台搭建',
          teacher: '大数据讲师'
        },
        // 南京
        {
          id: 19,
          city: '南京',
          cover: "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】南京站：AI创新应用',
          teacher: 'AI大学堂'
        },
        {
          id: 20,
          city: '南京',
          cover: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】南京站：前端工程化实践',
          teacher: '前端联盟'
        },
        {
          id: 21,
          city: '南京',
          cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】南京站：AI算法落地',
          teacher: 'AI极客'
        },
        {
          id: 22,
          city: '南京',
          cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】南京站：后端分布式系统',
          teacher: '后端技术栈'
        },
        {
          id: 23,
          city: '南京',
          cover: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
          title: '【开发者Talk】南京站：算法与数据结构',
          teacher: '算法工程师'
        },
        {
          id: 24,
          city: '南京',
          cover:require('@/assets/云原生.png'),
          title: '【开发者Talk】南京站：云原生技术',
          teacher: '云计算讲师'
        }
      ],
      roadmapList: [
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><path d="M36 18c-2.5 0-4.5 1.2-4.5 2.7 0 1.2 1.5 2.2 3.7 2.6 2.2 0.4 4.8 0.2 6.2-0.5 1.4-0.7 1.1-2.1-0.7-3.1C39.7 18.6 37.7 18 36 18z" fill="#8ecafe"/><path d="M36 24c-4.4 0-8 2.2-8 5 0 2.2 2.7 4.1 6.5 4.8 3.8 0.7 8.2 0.3 10.5-1.1 2.3-1.4 1.8-4.2-1.2-6.2C41.7 24.6 38.7 24 36 24z" fill="#8ecafe"/><ellipse cx="36" cy="44" rx="10" ry="6" fill="#e6f2fb"/></g></svg>`,
          title: 'JavaEE',
          desc: '世界第一编程语言',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><circle cx="36" cy="36" r="14" fill="#3fa9f5"/><circle cx="36" cy="36" r="7" fill="#fff"/></svg>`,
          title: '鸿蒙应用开发',
          desc: '鸿蒙生态千帆起，IT编程新风口',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><rect x="20" y="20" width="32" height="32" rx="8" fill="#5ec6fa"/><text x="36" y="44" text-anchor="middle" font-size="18" fill="#fff">JS</text></g></svg>`,
          title: 'HTML&JS+前端',
          desc: 'IT互联网的半壁江山',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><rect x="20" y="20" width="32" height="32" rx="8" fill="#b7aaff"/><text x="36" y="44" text-anchor="middle" font-size="18" fill="#fff">Py</text></g></svg>`,
          title: 'Python+大数据开发',
          desc: '万能编程语言，贯穿数据始终',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><rect x="20" y="20" width="32" height="32" rx="8" fill="#4f7fff"/><text x="36" y="44" text-anchor="middle" font-size="18" fill="#fff">AI</text></g></svg>`,
          title: '人工智能开发',
          desc: 'AI创新未来',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><circle cx="36" cy="36" r="14" fill="#ff7c96"/><path d="M28 36c0-4 8-4 8 0s-8 4-8 0z" fill="#fff"/><path d="M44 36c0-4-8-4-8 0s8 4 8 0z" fill="#fff"/></g></svg>`,
          title: 'AI+设计',
          desc: '打造全链路设计师',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><circle cx="36" cy="36" r="14" fill="#3fe0c5"/><path d="M36 28v8l6 6" stroke="#fff" stroke-width="3" fill="none"/></g></svg>`,
          title: '软件测试',
          desc: '软件质量的护卫者',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><circle cx="36" cy="36" r="14" fill="#b97fff"/><rect x="28" y="44" width="16" height="4" rx="2" fill="#fff"/><rect x="28" y="36" width="16" height="4" rx="2" fill="#fff"/></g></svg>`,
          title: '新媒体+短视频直播运营',
          desc: '撬动短视频市场千亿红利',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><circle cx="36" cy="32" r="8" fill="#ffb84f"/><rect x="28" y="44" width="16" height="4" rx="2" fill="#fff"/></g></svg>`,
          title: '产品经理',
          desc: '产品之父，互联网产品规划师',
          hover: false
        },
        {
          icon: `<svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="32" fill="#fff" stroke="#eaeaea" stroke-width="4"/><g><rect x="20" y="20" width="32" height="32" rx="8" fill="#4fc3ff"/><rect x="28" y="44" width="16" height="4" rx="2" fill="#fff"/><rect x="28" y="36" width="16" height="4" rx="2" fill="#fff"/></g></svg>`,
          title: '集成电路应用开发(含嵌入式)',
          desc: '机器人芯片时代，软硬件工程师大有可为',
          hover: false
        }
      ],
      videoShuffleIndex: 0
    };
  },
  mounted() {
    // 保证每个 roadmapList 项有 hover 字段
    this.roadmapList.forEach(item => {
      if (typeof item.hover === 'undefined') this.$set(item, 'hover', false);
    });
    // 自动轮播
    this.startCarousel();
  },
  beforeUnmount() {
    this.stopCarousel();
  },
  computed: {
    rightVideos() {
      let list = this.selectedCategory === "全部" ? this.videos : this.videos.filter(v => v.category === this.selectedCategory);
      // 按 videoShuffleIndex 分组，每组4个
      const groupSize = 4;
      const totalGroups = Math.ceil(list.length / groupSize);
      const groupIndex = this.videoShuffleIndex % totalGroups;
      const start = groupIndex * groupSize;
      return list.slice(start, start + groupSize);
    },
    filteredTalks() {
      // 只显示当前tab下的前6个讲座
      return this.talks.filter(t => t.city === this.selectedTalkTab).slice(0, 6);
    },
  },
  methods: {
    selectCategory(cat) {
      this.selectedCategory = cat;
      this.videoShuffleIndex = 0; // 切换分类时重置
    },
    prevCarousel() {
      this.carouselIndex = (this.carouselIndex - 1 + this.carouselImgs.length) % this.carouselImgs.length;
    },
    nextCarousel() {
      this.carouselIndex = (this.carouselIndex + 1) % this.carouselImgs.length;
    },
    goToCarousel(idx) {
      this.carouselIndex = idx;
    },
    handleSwitch() {
      // 换一换逻辑：切换视频分组
      let list = this.selectedCategory === "全部" ? this.videos : this.videos.filter(v => v.category === this.selectedCategory);
      const totalGroups = Math.ceil(list.length / 4);
      // 随机切换到一个不同的分组
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * totalGroups);
      } while (nextIndex === this.videoShuffleIndex && totalGroups > 1);
      this.videoShuffleIndex = nextIndex;
    },
    goToVideo(id) {
      this.$router.push({ name: 'VideoDetail', params: { id } });
    },
    viewRoadmap(item) {
      this.$router.push({
        name: 'LearningPath',
        query: { subject: item.title } // 传递学科名
      });
    },
    startCarousel() {
      this.carouselTimer = setInterval(() => {
        this.nextCarousel();
      }, 3000); // 每4秒切换一次
    },
    stopCarousel() {
      if (this.carouselTimer) {
        clearInterval(this.carouselTimer);
        this.carouselTimer = null;
      }
    }
  },
};
</script>

<style scoped>
.study-page {
  margin-top: 100px;
  background: #f6f8fa;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  padding-top: 60px;
}
.bili-tabbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* background: #fff; */
  padding: 18px 32px 18px 32px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.01);
  margin: 26px auto;
  max-width: 1400px;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  
}
.tabbar-row {
  display: flex;
  width: 100%;
  align-items: flex-start;
}
.tabbar-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
/* 重点美化：顶部标签栏横向排列，宽高统一，间距一致 */
.tabbar-left-top {
  display: grid;
  grid-template-columns: repeat(8, 90px); /* 每行8个标签 */
  gap: 16px 18px; /* 行间距16px，列间距18px */
  align-items: center;
  justify-content: start;
  width: auto;
}
.tabbar-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-left: 60px;
  flex-wrap: wrap;
}
.tabbar-divider {
  width: 2px;
  height: 90px;
  background: #aaaaaa;
  margin: 0 60px 0 0px;
  align-self: center;
}
.tabbar-other {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 18px;
  /* margin-top: 2px; */
  max-width: 270px; 
}
.other-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;
  font-size: 10px;
  cursor: pointer;
  transition: color 0.18s;
  border-radius: 10px;
  padding: 0;
  width: 60px;
}
.other-item:hover {
  color: #2563eb;
  background: #f5f6fa;
}
.other-icon {
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 12px;
}
.other-text {
  font-size: 14px;
  margin-top: 2px;
}
.tab {
  width: 90px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #444;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.18s;
  font-weight: 500;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  letter-spacing: 1px;
}
.tab .tab-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
  vertical-align: middle;
}
.tab.active, .tab:hover {
  background: #ffeded;
  color: #ff5c5c;
  box-shadow: 0 2px 8px rgba(255,92,92,0.08);
}
.tab-dongtai {
  color: #fff;
  background: #ffa726;
  font-weight: bold;
  position: relative;
}
.tab-dongtai .tab-icon {
  margin-right: 4px;
}
.tab-hot {
  color: #fff;
  background: #ff6d6d;
  font-weight: bold;
  position: relative;
}
.tab-hot .tab-icon {
  margin-right: 4px;
}
.more-tab {
  position: relative;
}

.grid-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 24px;
  min-width: 340px;
  padding: 18px 18px;
  margin-top: 8px;
  animation: fadeIn 0.18s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px);}
  to { opacity: 1; transform: translateY(0);}
}

.dropdown-item {
  padding: 10px 0;
  color: #444;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  background: #f5f5f5;
  text-align: center;
  transition: background 0.18s, color 0.18s;
}
.dropdown-item:hover {
  background: #e6f0ff;
  color: #00a1d6;
}
.func-tab {
  background: none;
  color: #888;
  font-size: 15px;
  padding: 0 12px;
  border-radius: 8px;
  transition: color 0.18s;
}
.func-tab:hover {
  color: #00a1d6;
  background: #f5f5f5;
}
.content-row {
  display: flex;
  align-items: flex-start;
  width: 1500px;
  margin-left: 60px; /* 靠左对齐 */
  margin-right: 60px;
  gap: 48px;
}
.left-carousel {
  width: 640px;
  min-width: 640px;
  max-width: 640px;
}
.carousel-img {
  width: 110%;
  height: 450px;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  background-size: contain;         /* 改为 contain */
  background-repeat: no-repeat;     /* 防止平铺 */
  background-position: center;      /* 居中显示 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}
.carousel-desc {
  background: rgba(0,0,0,0.32);
  color: #fff;
  font-size: 18px;
  padding: 18px 32px 12px 32px;
  border-radius: 0 0 18px 18px;
  min-height: 48px;
}
.carousel-controls {
  position: absolute;
  right: 18px;
  bottom: 18px;
  display: flex;
  gap: 8px;
}
.carousel-controls button {
  background: rgba(0,0,0,0.32);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 4px;
  transition: background 0.2s;
}
.carousel-controls button:hover {
  background: #00a1d6;
}
.carousel-dots {
  position: absolute;
  left: 32px;
  bottom: 18px;
  display: flex;
  gap: 8px;
}
.carousel-dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
}
.carousel-dots .active {
  opacity: 1;
  background: #00a1d6;
}
.right-videos {
  width: 800px;
  margin-left: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
.video-card {
  min-width: 0;
  height: 210px;
  background: #fff;

  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.video-card:hover {
  box-shadow: 0 6px 24px rgba(0,161,214,0.12);
  transform: translateY(-4px) scale(1.03);
}
.cover {
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}
.duration {
  position: absolute;
  right: 8px;
  bottom: 6px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 6px;
}
.info {
  padding: 10px 12px 8px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #999;
  gap: 2px;
}
.views {
  color: #ff9900;
}
.uploader {
  color: #888;
}
.course-section {
  width: 1400px;
  margin: 56px auto 0 auto;
  background: none;
}
.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.course-title {
  font-size: 28px;
  font-weight: bold;
  color: #222;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  letter-spacing: 1px;
}
.course-more {
  background: #f5f6fa;
  border: none;
  border-radius: 18px;
  padding: 8px 22px;
  color: #222;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;
}
.course-more:hover {
  background: #00a1d6;
  color: #fff;
}
.course-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.course-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.course-card:hover {
  box-shadow: 0 8px 32px rgba(0,161,214,0.13);
  transform: translateY(-4px) scale(1.03);
}
.course-cover {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
}
.course-info {
  padding: 18px 18px 12px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.course-name {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #888;
}
.course-teacher {
  display: flex;
  align-items: center;
  gap: 4px;
}
.course-free {
  background: #4f7fff;
  color: #fff;
  border-radius: 8px;
  padding: 2px 12px;
  font-size: 15px;
  font-weight: 500;
}
.talk-section {
  width: 1400px;
  margin: 56px auto 0 auto;
}
.talk-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  position: relative;
}
.talk-title {
  font-size: 28px;
  font-weight: bold;
  color: #2563eb;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  margin-right: 32px;
}
.talk-tabs {
  display: flex;
  gap: 32px;
  font-size: 20px;
  font-weight: 500;
}
.talk-tabs span {
  color: #888;
  cursor: pointer;
  padding: 0 8px 8px 8px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.talk-tabs .active {
  color: #2563eb;
  border-bottom: 3px solid #2563eb;
  font-weight: bold;
}
.talk-more {
  position: absolute;
  right: 0;
  background: #f5f6fa;
  border: none;
  border-radius: 18px;
  padding: 8px 22px;
  color: #222;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;
}
.talk-more:hover {
  background: #2563eb;
  color: #fff;
}
.talk-content-row {
  display: flex;
  gap: 32px;
}
.talk-left-img {
  width: 220px;
  height: 420px;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  flex-shrink: 0;
}
.talk-card-list {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 32px;
}
.talk-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  height: 120px;
}
.talk-card:hover {
  box-shadow: 0 8px 32px rgba(37,99,235,0.13);
  transform: translateY(-4px) scale(1.03);
}
.talk-card-cover {
  width: 160px;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 16px 0 0 16px;
  flex-shrink: 0;
}
.talk-card-info {
  flex: 1;
  padding: 18px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}
.talk-card-title {
  font-size: 17px;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.talk-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #888;
}
.talk-card-teacher {
  display: flex;
  align-items: center;
  gap: 4px;
}
.talk-card-free {
  background: #2563eb;
  color: #fff;
  border-radius: 8px;
  padding: 2px 12px;
  font-size: 15px;
  font-weight: 500;
}
.roadmap-section {
  width: 1400px;
  margin: 56px auto 0 auto;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.roadmap-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 82px;
  position: relative;
  gap: 18px;
}
.roadmap-title-line {
  display: inline-block;
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, #e6eaf0 0%, #bfc8d8 100%);
  border-radius: 2px;
}
.roadmap-title-text {
  padding: 0 32px;
  font-size: 32px;
  font-weight: bold;
  color: #222;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  letter-spacing: 1px;
}

.roadmap-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px 32px;
  width: 100%;
}
.roadmap-card {
  background: #f8fafc;
  border-radius: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  padding: 32px 24px 24px 24px;
  min-width: 0;
  min-height: 220px;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.roadmap-card:hover {
  box-shadow: 0 8px 32px rgba(37,99,235,0.13);
  transform: translateY(-4px) scale(1.03);
}
.roadmap-icon {
  width: 88px;
  height: 88px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  position: absolute;
  top: -44px;
  left: 50%;
  transform: translateX(-50%);
}
.roadmap-card-title {
  font-size: 24px;
  font-weight: 500;
  color: #444;
  margin-top: 56px;
  margin-bottom: 8px;
  text-align: center;
}
.roadmap-card-desc {
  font-size: 18px;
  color: #888;
  text-align: center;
  margin-bottom: 24px;
}
.roadmap-btn {
  width: 90%;
  background: #d0021b;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 14px 0;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
  box-shadow: 0 2px 8px rgba(208,2,27,0.08);
  display: block;
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  z-index: 2;
}
.roadmap-card:hover .roadmap-btn {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.18s;
}
</style>
