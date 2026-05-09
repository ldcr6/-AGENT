<template>
    <HeaderBar />
    
  <div class="job-detail-bg">
      <!-- 新增顶部搜索栏 -->
      <div class="top-search-bar">
        <select class="search-type">
          <option>职位类型</option>
        </select>
        <input class="search-input" type="text" placeholder="搜索职位、公司" />
        <span class="search-map">
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20" style="vertical-align:middle;"><path d="M12 2C7 2 3 6 3 11c0 5.25 7.5 11 8.25 11.62a1 1 0 0 0 1.5 0C13.5 22 21 16.25 21 11c0-5-4-9-9-9z" fill="#b0b8c9"/><circle cx="12" cy="10" r="3" fill="#b0b8c9"/></svg>
          <span class="map-text">地图</span>
        </span>
        <button class="search-btn">搜索</button>
      </div>
    <!-- 顶部筛选栏 -->
    <div class="filter-bar">
      <div class="location">
        <svg class="icon" viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="10" r="6" fill="#4f8cff"/><path d="M12 2C7 2 3 6 3 11c0 5.25 7.5 11 8.25 11.62a1 1 0 0 0 1.5 0C13.5 22 21 16.25 21 11c0-5-4-9-9-9z" fill="none" stroke="#4f8cff" stroke-width="2"/></svg>
        郑州
      </div>
      <div class="filters">
        <select><option>职位类型</option></select>
        <select><option>薪资待遇</option></select>
        <select><option>工作经验</option></select>
        <select><option>学历要求</option></select>
        <select><option>公司行业</option></select>
        <select><option>公司规模</option></select>
      </div>
      <div class="user-action">清空</div>
    </div>
    <div class="main-content">
      <!-- 左侧职位列表 -->
      <div class="job-list">
          <div 
            v-for="(job, idx) in jobs" 
            :key="job.id" 
            :class="['job-card', idx === selectedIndex ? 'selected' : '']"
            @click="selectedIndex = idx"
          >
          <div class="job-title-row">
              <span class="job-title">{{ job.title }}</span>
              <span class="job-salary">{{ job.salary }}</span>
          </div>
          <div class="job-tags">
              <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="company-row">
              <span class="company-name">{{ job.company }}</span>
              <span class="company-location">{{ job.location }}</span>
          </div>
        </div>
      </div>
      <!-- 右侧职位详情 -->
      <div class="job-detail-card">
        <div class="job-detail-header">
          <div>
              <span class="job-title">{{ jobs[selectedIndex].title }}</span>
              <span class="job-salary">{{ jobs[selectedIndex].salary }}</span>
          </div>
          <div class="job-detail-tags">
              <span class="tag" v-for="tag in jobs[selectedIndex].detailTags" :key="tag">{{ tag }}</span>
          </div>
          <div class="job-detail-btns">
            <button class="btn collect">收藏</button>
              <button class="btn apply" @click="goChat">立即沟通</button>
            </div>
        </div>
        <div class="job-detail-section">
          <div class="job-detail-labels">
              <span class="tag" v-for="label in jobs[selectedIndex].labels" :key="label">{{ label }}</span>
          </div>
          <div class="job-desc-block">
            <div class="section-title">职位描述</div>
            <div class="job-desc-list">
              <div class="desc-title">【岗位要求】</div>
              <ol>
                  <li v-for="item in jobs[selectedIndex].desc.requirement" :key="item">{{ item }}</li>
              </ol>
              <div class="desc-title">【薪资待遇】</div>
              <ol>
                  <li v-for="item in jobs[selectedIndex].desc.salary" :key="item">{{ item }}</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="job-detail-footer">
          <div class="user-info">
              <img class="avatar" :src="jobs[selectedIndex].user.avatar" alt="avatar" @error="e => e.target.src = defaultAvatar" />
            <div>
                <div class="user-name">{{ jobs[selectedIndex].user.name }} <span class="user-status">{{ jobs[selectedIndex].user.status }}</span></div>
                <div class="user-company">{{ jobs[selectedIndex].user.company }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <ChatDialog v-if="showChat" :user="jobs[selectedIndex].user" @close="showChat = false" /> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderBar from '../components/HeaderBar.vue';
// import ChatDialog from '../components/ChatDialog.vue'; // 不再需要弹窗

// 通用可用头像
const defaultAvatar = 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/user.svg';

const router = useRouter();

const jobs = [
  {
    id: 1,
    title: 'UE视频设计师',
    salary: '10-15K',
    tags: ['经验不限', '本科', 'UE4', '3ds Max', 'Maya'],
    company: '郑州降临云鲸影视...',
    location: '郑州·二七区·京广路',
    detailTags: ['郑州', '经验不限', '本科'],
    labels: ['3ds Max', 'C4D', 'UE4', '美术动画基础', '影视经验', 'Maya'],
    desc: {
      requirement: [
        '根据导演要求，制作与写实三维场景，设计镜头运动，完成材质与打光，服务于TVC广告及虚拟制片拍摄',
        '工作态度认真负责',
        '无工作经验者勿扰，新手勿扰',
        '周末休息、节假日放假',
        '有一定的项目抗压能力，行业特点、会有加班，合理加班可调休，并提升收入'
      ],
      salary: [
        '底薪+岗位项目提成，综合收入8000-15000；',
        '定期聚餐、节假日福利、年度旅游；',
        '周末休息、法定节假日休息，工期时间10:00-16:30，',
        '为愿意学习的人提供更多的行业培训机会'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: '中先生',
      status: '刚刚活跃',
      company: '郑州降临云鲸影视视... · 制片人'
    }
  },
  {
    id: 2,
    title: 'Unity开发工程师',
    salary: '6-10K',
    tags: ['3-5年', '大专', 'U3D开发', 'UE4开发', '游戏引擎'],
    company: '海誉通科技',
    location: '郑州',
    detailTags: ['郑州', '3-5年', '大专'],
    labels: ['U3D', 'Unity', 'C#', '游戏开发', '团队协作'],
    desc: {
      requirement: [
        '负责Unity3D项目开发与维护',
        '参与项目需求分析与设计',
        '与美术、策划等团队成员协作',
        '有良好的代码习惯和文档编写能力',
        '有游戏上线经验者优先'
      ],
      salary: [
        '底薪+项目奖金，综合收入6000-10000；',
        '五险一金，带薪年假',
        '节日福利，年度体检',
        '弹性工作时间'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: '王女士',
      status: '今日活跃',
      company: '海誉通科技 · HR'
    }
  },
  {
    id: 3,
    title: 'UE4',
    salary: '15-25K',
    tags: ['5-10年', '本科', 'C/C++', 'Unity3D'],
    company: '渡梦信息科技',
    location: '郑州·中原区·高新...',
    detailTags: ['郑州', '5-10年', '本科'],
    labels: ['C/C++', 'UE4', 'Unity3D', '项目管理'],
    desc: {
      requirement: [
        '负责UE4引擎相关开发',
        '带领团队完成项目目标',
        '优化项目性能',
        '有大型项目经验优先',
        '具备良好的沟通能力'
      ],
      salary: [
        '底薪+绩效奖金，综合收入15000-25000；',
        '团队建设，年度旅游',
        '节日福利，带薪年假',
        '晋升空间大'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      name: '李先生',
      status: '本周活跃',
      company: '渡梦信息科技 · 技术总监'
    }
  },
  {
    id: 4,
    title: 'UE开发',
    salary: '5-8K',
    tags: ['经验不限', '大专', 'UE4开发经验', 'UE4'],
    company: '南京猫捕影视动漫',
    location: '郑州·管城区·南三环...',
    detailTags: ['郑州', '经验不限', '大专'],
    labels: ['UE4', '影视动画', '团队合作'],
    desc: {
      requirement: [
        '参与UE4影视动画项目开发',
        '配合团队完成动画制作',
        '有相关实习经验优先',
        '热爱影视动漫行业',
        '学习能力强'
      ],
      salary: [
        '底薪+项目提成，综合收入5000-8000；',
        '节日福利，团队聚餐',
        '弹性工作',
        '行业培训机会多'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: '赵老师',
      status: '刚刚活跃',
      company: '南京猫捕影视动漫 · 项目经理'
    }
  },
  // 新增十几个职位
  {
    id: 5,
    title: '3D建模师',
    salary: '8-12K',
    tags: ['1-3年', '本科', 'Blender', '3ds Max'],
    company: '星辰互动',
    location: '郑州·金水区',
    detailTags: ['郑州', '1-3年', '本科'],
    labels: ['Blender', '3ds Max', '建模', '渲染'],
    desc: {
      requirement: [
        '负责3D模型的制作与优化',
        '熟练使用Blender、3ds Max等建模软件',
        '有良好的美术基础',
        '具备团队协作能力'
      ],
      salary: [
        '底薪+项目提成，综合收入8000-12000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      name: '孙工',
      status: '今日活跃',
      company: '星辰互动 · 主管'
    }
  },
  {
    id: 6,
    title: '动画设计师',
    salary: '7-11K',
    tags: ['2-5年', '大专', '动画', 'Maya'],
    company: '光影未来',
    location: '郑州·高新区',
    detailTags: ['郑州', '2-5年', '大专'],
    labels: ['动画', 'Maya', '角色设计'],
    desc: {
      requirement: [
        '负责角色动画设计与制作',
        '熟练掌握Maya等动画软件',
        '有动画项目经验优先',
        '具备创新能力'
      ],
      salary: [
        '底薪+绩效，综合收入7000-11000；',
        '节日福利',
        '团队聚餐',
        '年度旅游'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
      name: '刘老师',
      status: '本周活跃',
      company: '光影未来 · 动画总监'
    }
  },
  {
    id: 7,
    title: '特效师',
    salary: '9-14K',
    tags: ['3-5年', '本科', '特效', 'AE'],
    company: '幻影科技',
    location: '郑州·经开区',
    detailTags: ['郑州', '3-5年', '本科'],
    labels: ['特效', 'AE', '影视后期'],
    desc: {
      requirement: [
        '负责影视特效制作',
        '熟练使用AE等后期软件',
        '有相关项目经验',
        '具备良好的沟通能力'
      ],
      salary: [
        '底薪+项目奖金，综合收入9000-14000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      name: '周先生',
      status: '刚刚活跃',
      company: '幻影科技 · 特效主管'
    }
  },
  {
    id: 8,
    title: '游戏策划',
    salary: '6-9K',
    tags: ['经验不限', '本科', '策划', 'Unity3D'],
    company: '乐游网络',
    location: '郑州·二七区',
    detailTags: ['郑州', '经验不限', '本科'],
    labels: ['策划', 'Unity3D', '文案'],
    desc: {
      requirement: [
        '负责游戏玩法策划与文档撰写',
        '参与产品创意讨论',
        '有良好的逻辑思维',
        '热爱游戏行业'
      ],
      salary: [
        '底薪+绩效，综合收入6000-9000；',
        '节日福利',
        '弹性工作',
        '年度旅游'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      name: '陈策',
      status: '今日活跃',
      company: '乐游网络 · 策划经理'
    }
  },
  {
    id: 9,
    title: '原画师',
    salary: '10-16K',
    tags: ['2-4年', '本科', '原画', '美术'],
    company: '画境文化',
    location: '郑州·金水区',
    detailTags: ['郑州', '2-4年', '本科'],
    labels: ['原画', '美术', '角色设计'],
    desc: {
      requirement: [
        '负责游戏原画设计',
        '有扎实的美术功底',
        '熟练掌握Photoshop等绘画软件',
        '有相关作品集优先'
      ],
      salary: [
        '底薪+项目提成，综合收入10000-16000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
      name: '林画',
      status: '本周活跃',
      company: '画境文化 · 原画师'
    }
  },
  {
    id: 10,
    title: 'C++开发',
    salary: '12-18K',
    tags: ['3-5年', '本科', 'C++', '游戏开发'],
    company: '极客动力',
    location: '郑州·高新区',
    detailTags: ['郑州', '3-5年', '本科'],
    labels: ['C++', '游戏开发', '算法'],
    desc: {
      requirement: [
        '负责游戏后端开发',
        '熟练掌握C++',
        '有大型项目经验优先',
        '具备良好的团队协作能力'
      ],
      salary: [
        '底薪+绩效，综合收入12000-18000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: '高工',
      status: '今日活跃',
      company: '极客动力 · 技术负责人'
    }
  },
  {
    id: 11,
    title: 'UI设计师',
    salary: '7-13K',
    tags: ['1-3年', '本科', 'UI', '设计'],
    company: '美创科技',
    location: '郑州·金水区',
    detailTags: ['郑州', '1-3年', '本科'],
    labels: ['UI', '设计', 'Photoshop'],
    desc: {
      requirement: [
        '负责产品界面设计',
        '有良好的审美能力',
        '熟练使用Photoshop、Sketch等设计工具',
        '有相关作品集优先'
      ],
      salary: [
        '底薪+绩效，综合收入7000-13000；',
        '节日福利',
        '带薪年假',
        '年度旅游'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
      name: '宋美',
      status: '刚刚活跃',
      company: '美创科技 · UI设计师'
    }
  },
  {
    id: 12,
    title: '产品经理',
    salary: '13-20K',
    tags: ['5-8年', '本科', '产品', '管理'],
    company: '云启科技',
    location: '郑州·高新区',
    detailTags: ['郑州', '5-8年', '本科'],
    labels: ['产品', '管理', '需求分析'],
    desc: {
      requirement: [
        '负责产品全生命周期管理',
        '需求分析与产品规划',
        '跨部门沟通协调',
        '有大型项目经验优先'
      ],
      salary: [
        '底薪+绩效，综合收入13000-20000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      name: '王经理',
      status: '本周活跃',
      company: '云启科技 · 产品经理'
    }
  },
  {
    id: 13,
    title: '前端开发',
    salary: '10-16K',
    tags: ['2-4年', '本科', '前端', 'Vue'],
    company: '前沿网络',
    location: '郑州·高新区',
    detailTags: ['郑州', '2-4年', '本科'],
    labels: ['前端', 'Vue', 'JavaScript'],
    desc: {
      requirement: [
        '负责Web前端开发',
        '熟练掌握Vue、JavaScript',
        '有良好的代码习惯',
        '具备团队协作能力'
      ],
      salary: [
        '底薪+绩效，综合收入10000-16000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      name: '李前',
      status: '今日活跃',
      company: '前沿网络 · 前端开发'
    }
  },
  {
    id: 14,
    title: '后端开发',
    salary: '11-17K',
    tags: ['3-5年', '本科', '后端', 'Java'],
    company: '数云科技',
    location: '郑州·金水区',
    detailTags: ['郑州', '3-5年', '本科'],
    labels: ['后端', 'Java', 'Spring'],
    desc: {
      requirement: [
        '负责后端服务开发',
        '熟练掌握Java、Spring等技术',
        '有大型系统开发经验优先',
        '具备良好的沟通能力'
      ],
      salary: [
        '底薪+绩效，综合收入11000-17000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
      name: '赵后',
      status: '本周活跃',
      company: '数云科技 · 后端开发'
    }
  },
  {
    id: 15,
    title: '测试工程师',
    salary: '8-13K',
    tags: ['1-3年', '本科', '测试', '自动化'],
    company: '优测科技',
    location: '郑州·高新区',
    detailTags: ['郑州', '1-3年', '本科'],
    labels: ['测试', '自动化', '脚本'],
    desc: {
      requirement: [
        '负责产品测试与自动化脚本编写',
        '有相关测试经验',
        '熟悉自动化测试工具',
        '具备团队协作能力'
      ],
      salary: [
        '底薪+绩效，综合收入8000-13000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
      name: '钱测',
      status: '今日活跃',
      company: '优测科技 · 测试工程师'
    }
  },
  {
    id: 16,
    title: '运维工程师',
    salary: '9-14K',
    tags: ['2-4年', '本科', '运维', 'Linux'],
    company: '云维科技',
    location: '郑州·高新区',
    detailTags: ['郑州', '2-4年', '本科'],
    labels: ['运维', 'Linux', '自动化'],
    desc: {
      requirement: [
        '负责公司服务器运维管理',
        '熟悉Linux系统',
        '有自动化运维经验优先',
        '具备团队协作能力'
      ],
      salary: [
        '底薪+绩效，综合收入9000-14000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
      name: '孙维',
      status: '本周活跃',
      company: '云维科技 · 运维工程师'
    }
  },
  {
    id: 17,
    title: '数据分析师',
    salary: '10-15K',
    tags: ['2-4年', '硕士', '数据分析', 'Python'],
    company: '数析科技',
    location: '郑州·金水区',
    detailTags: ['郑州', '2-4年', '硕士'],
    labels: ['数据分析', 'Python', '统计'],
    desc: {
      requirement: [
        '负责数据分析与建模',
        '熟练掌握Python、SQL',
        '有数据分析项目经验',
        '具备良好的沟通能力'
      ],
      salary: [
        '底薪+绩效，综合收入10000-15000；',
        '五险一金',
        '节日福利',
        '带薪年假'
      ]
    },
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/88.jpg',
      name: '周析',
      status: '今日活跃',
      company: '数析科技 · 数据分析师'
    }
  }
];

const selectedIndex = ref(0);
// const showChat = ref(false); // 不再需要弹窗

function goChat() {
  router.push('/chat');
}
</script>

<style scoped>
.job-detail-bg {
    margin-top: 120px;
  min-height: 100vh;
  background: #f7fbff;
  padding-bottom: 40px;
}
.filter-bar {
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px #e0e7ef44;
  border-radius: 12px;
  padding: 18px 32px;
  margin: 32px auto 0 auto;
  max-width: 1200px;
  gap: 24px;
}
.location {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #4f8cff;
  font-weight: 700;
  gap: 4px;
}
.filters select {
  margin-right: 12px;
  padding: 6px 18px;
  border-radius: 8px;
  border: 1px solid #e0e7ef;
  background: #f7fbff;
  color: #22223b;
  font-size: 1rem;
}
.user-action {
  margin-left: auto;
  color: #b0b8c9;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}
.main-content {
  display: flex;
  max-width: 1200px;
  margin: 32px auto 0 auto;
  gap: 32px;
}
.job-list {
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 720px;
  overflow-y: auto;
}
.job-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #e0e7ef33;
  padding: 22px 24px 16px 24px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
}
.job-card.selected {
  border: 2px solid #4f8cff;
  box-shadow: 0 4px 16px #4f8cff22;
}
.job-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.job-title {
  font-size: 1.18rem;
  font-weight: 800;
  color: #22223b;
}
.job-salary {
  font-size: 1.18rem;
  font-weight: 700;
  color: #ff5a5f;
}
.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.tag {
  background: #f3f6fa;
  color: #4f8cff;
  border-radius: 8px;
  padding: 2px 12px;
  font-size: 0.98rem;
  font-weight: 500;
}
.company-row {
  display: flex;
  justify-content: space-between;
  color: #b0b8c9;
  font-size: 0.98rem;
  margin-top: 2px;
}
.job-detail-card {
  flex: 1 1 0;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #e0e7ef33;
  padding: 32px 38px 18px 38px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.job-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-bottom: 1px solid #f0f2f7;
  padding-bottom: 12px;
}
.job-detail-header > div:first-child {
  display: flex;
  align-items: center;
  gap: 16px;
}
.job-detail-header .job-title {
  font-size: 1.45rem;
  color: #22223b;
  font-weight: 900;
}
.job-detail-header .job-salary {
  font-size: 1.25rem;
  color: #ff5a5f;
  font-weight: 800;
}
.job-detail-tags {
  display: flex;
  gap: 8px;
}
.job-detail-btns {
  display: flex;
  gap: 12px;
}
.btn {
  padding: 8px 22px;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn.collect {
  background: #fff;
  color: #4f8cff;
  border: 1.5px solid #4f8cff;
}
.btn.collect:hover {
  background: #e0e7ff;
}
.btn.apply {
  background: linear-gradient(90deg, #4f8cff 0%, #a259ec 100%);
  color: #fff;
  border: none;
}
.btn.apply:hover {
  background: linear-gradient(90deg, #a259ec 0%, #4f8cff 100%);
}
.job-detail-section {
  margin-top: 18px;
}
.job-detail-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}
.job-desc-block {
  background: #f7fbff;
  border-radius: 12px;
  padding: 18px 22px;
  box-shadow: 0 2px 8px #e0e7ef22;
}
.section-title {
  font-size: 1.13rem;
  font-weight: 800;
  color: #4f8cff;
  margin-bottom: 8px;
}
.job-desc-list {
  color: #22223b;
  font-size: 1.05rem;
}
.desc-title {
  font-weight: 700;
  color: #a259ec;
  margin-top: 10px;
  margin-bottom: 2px;
}
.job-desc-list ol {
  margin: 0 0 0 18px;
  padding: 0;
}
.job-desc-list li {
  margin-bottom: 2px;
  line-height: 1.7;
}
.job-detail-footer {
  margin-top: 28px;
  border-top: 1px solid #f0f2f7;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e7ef;
}
.user-name {
  font-weight: 800;
  color: #22223b;
  font-size: 1.08rem;
}
.user-status {
  color: #4f8cff;
  font-size: 0.98rem;
  font-weight: 500;
  margin-left: 6px;
}
.user-company {
  color: #b0b8c9;
  font-size: 0.98rem;
}
.top-search-bar {
  display: flex;
  align-items: center;
  border: 2px solid #19c2e6;
  border-radius: 32px;
  background: #fff;
  padding: 10px 18px 10px 18px;
  max-width: 98vw;
  width: 72%;
  margin: 18px auto 0 auto;
  box-sizing: border-box;
  box-shadow: 0 2px 8px #e0e7ef33;
  gap: 12px;
}
.search-type {
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #22223b;
  font-weight: 600;
  outline: none;
  margin-right: 8px;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.05rem;
  color: #22223b;
  background: transparent;
  margin-right: 8px;
}
.search-map {
  display: flex;
  align-items: center;
  color: #b0b8c9;
  font-size: 1.05rem;
  margin-right: 12px;
  gap: 2px;
}
.map-text {
  margin-left: 2px;
}
.search-btn {
  background: #19c2e6;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 22px;
  padding: 6px 28px;
  cursor: pointer;
  transition: background 0.2s;
}
.search-btn:hover {
  background: #13b0d1;
}
@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
    gap: 18px;
  }
  .job-list {
    flex: 1 1 100%;
    max-width: 100vw;
  }
  .job-detail-card {
    padding: 18px 6vw 12px 6vw;
  }
  .filter-bar {
    flex-direction: column;
    gap: 12px;
    padding: 12px 4vw;
  }
  .top-search-bar {
    flex-direction: column;
    gap: 8px;
    padding: 8px 2vw;
  }
  .search-btn {
    width: 100%;
  }
}
</style> 