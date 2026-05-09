<template>
    <HeaderBar></HeaderBar>
  <div class="video-detail-container">
    <!-- 小窗播放器 -->
    <div v-if="showMiniPlayer && !miniPlayerClosed" class="mini-player">
      <img src="@/assets/demo.png" alt="视频封面" class="mini-video-cover" />
      <div class="mini-play-btn">▶</div>
      <div class="mini-close" @click="closeMiniPlayer">✕</div>
    </div>
    <!-- 左侧主内容区 -->
    <div class="main-content" ref="mainContent">
      <div class="video-info">
        <h2 class="video-title">{{ video ? video.title : '' }}</h2>
        <div class="video-meta">
          <span>👁️ {{ video ? video.views : '' }}</span>
          <span>UP主：{{ video ? video.uploader : '' }}</span>
          <span>{{ video ? video.duration : '' }}</span>
        </div>
      </div>
      <div class="video-player" ref="videoPlayer">
        <iframe
          v-if="video && video.bvid"
          :src="`https://player.bilibili.com/player.html?bvid=${video.bvid}&autoplay=1`"
          frameborder="0"
          allowfullscreen
          width="100%"
          height="100%"
          style="border-radius:8px;"
        ></iframe>
        
        <div v-if="!video || !video.bvid" class="play-btn">▶</div>
      </div>
      <div class="danmu-section">
        <input type="text" placeholder="发个友善的弹幕见证当下" class="danmu-input" />
        <button class="danmu-send">发送</button>
      </div>
      <!-- 新增：弹幕统计与操作区 -->
      <div class="video-actions">
        <div class="danmu-stats">
          <span>35 人正在看，已装填 2512 条弹幕</span>
          <i class="iconfont icon-danmu" title="弹幕"></i>
          <i class="iconfont icon-tv" title="小电视"></i>
          <i class="iconfont icon-gift" title="弹幕礼仪"></i>
        </div>
        <div class="action-buttons">
          <div class="action-btn like">
            <span class="iconfont icon-like">👍</span>
            <span>5.8万</span>
          </div>
          <div class="action-btn coin">
            <span class="iconfont icon-coin">🪙</span>
            <span>1975</span>
          </div>
          <div class="action-btn fav">
            <span class="iconfont icon-fav">★</span>
            <span>1.6万</span>
          </div>
          <div class="action-btn share">
            <span class="iconfont icon-share">↗</span>
            <span>1921</span>
          </div>
        </div>
      </div>
      <!-- 新增：标签区 -->
      <div class="video-tags">
        <span class="tag music">🎵 发现《Tango para Abel》</span>
        <span class="tag">🏛 人文历史档案馆</span>
        <span class="tag">奇闻</span>
        <span class="tag">人物</span>
        <span class="tag">印度</span>
        <span class="tag">历史</span>
        <span class="tag more">▼</span>
      </div>
      <!-- 新增：评论区 -->
      <div class="comment-section">
        <div class="comment-header">
          <span class="comment-title">评论 <span class="comment-count">1404</span></span>
          <div class="comment-sort">
            <span class="active">最热</span>
            <span>最新</span>
          </div>
        </div>
        <div class="comment-input-row">
          <img class="comment-avatar" src="@/assets/avatar.png" />
          <input class="comment-input" placeholder="下面我简单嘤两句" />
          <button class="comment-send">发送</button>
        </div>
        <div class="comment-list" ref="commentList">
          <div class="comment-item" v-for="comment in commentList" :key="comment.id">
            <img class="comment-avatar" :src="comment.avatar" />
            <div class="comment-content-box">
              <div class="comment-user-row">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-level" :style="comment.levelColor">Lv{{ comment.level }}</span>
              </div>
              <div class="comment-text">{{ comment.text }}<span v-if="comment.emoji" class="emoji">{{ comment.emoji }}</span></div>
              <div class="comment-meta">
                <span>{{ comment.time }}</span>
                <span>👍 {{ comment.likes }}</span>
                <span>💬 {{ comment.replies.length }}</span>
                <span class="reply-btn">回复</span>
              </div>
              <div v-if="comment.replies && comment.replies.length" class="sub-comment-list">
                <div class="sub-comment-item" v-for="reply in comment.replies" :key="reply.id">
                  <span class="sub-comment-user" :style="reply.color">{{ reply.user }}</span>
                  <span class="sub-comment-level">Lv{{ reply.level }}</span>
                  <span class="sub-comment-text">{{ reply.text }}<span v-if="reply.emoji" class="emoji">{{ reply.emoji }}</span></span>
                  <span class="sub-comment-meta">{{ reply.time }} 👍 {{ reply.likes }} 回复</span>
                </div>
                <div v-if="comment.replies.length > 2" class="sub-comment-more">共{{ comment.replies.length }}条回复，点击查看</div>
              </div>
            </div>
          </div>
          <div v-if="loadingMore" class="comment-loading">加载中...</div>
          <div v-else-if="!hasMore" class="comment-nomore">没有更多评论了</div>
        </div>
      </div>
    </div>
    <!-- 右侧推荐视频列表 -->
    <div class="recommend-list">
      <h3>接下来播放</h3>
      <div class="recommend-items">
        <div class="recommend-item" v-for="item in showRecommendVideos" :key="item.id">
          <img :src="item.cover" class="recommend-cover" />
          <div class="recommend-info">
            <div class="recommend-title">{{ item.title }}</div>
            <div class="recommend-meta">
              <span>👁️ {{ item.views }}</span>
              <span>💬 {{ item.comments }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="recommendVideos.length > recommendShowCount" class="expand-btn" ref="expandBtn" @click="recommendExpand = !recommendExpand">
        {{ recommendExpand ? '收起' : '展开' }}
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue';
export default {
  name: 'VideoDetail',
  components:{
    HeaderBar
  },
  data() {
    return {
      video: null,
      recommendVideos: [
        {
          id: 1,
          cover: require('@/assets/AI1.png'),
          title: 'Vue.js 快速入门教程',
          views: '175.9万',
          comments: 4969
        },
        {
          id: 2,
          cover: require('@/assets/AI2.png'),
          title: 'React 核心概念与实战',
          views: '281.9万',
          comments: 2498
        },
        {
          id: 3,
          cover: require('@/assets/AI3.png'),
          title: 'Node.js 构建高性能后端服务',
          views: '20.5万',
          comments: 689
        },
        // 其余mock推荐
        ...Array.from({length: 20}).map((_, i) => {
          const covers = [
            require('@/assets/AI1.png'),
            require('@/assets/AI2.png'),
            require('@/assets/AI3.png'),
            require('@/assets/lunbo1.png'),
            require('@/assets/lunbo2.png'),
            require('@/assets/lunbo3.png'),
            require('@/assets/demo.png'),
            require('@/assets/avatar.png')
          ];
          const titles = [
            'Java Spring Boot 企业级应用开发',
            'Python Django Web 开发实战',
            'Go语言微服务架构设计',
            'LeetCode 算法题解：从入门到精通',
            '数据结构与算法可视化学习',
            '前端面试必会：JavaScript 核心知识',
            '后端架构师的成长之路',
            '如何优化你的网站性能',
            'Webpack5 深入浅出',
            'CSS 动画的奇妙世界',
            'MySQL 数据库优化技巧',
            'Redis 缓存实战指南',
            'Docker 容器化技术入门',
            'Kubernetes 实践指南',
            '算法思想：分治、动态规划与贪心',
            '前端工程化体系建设',
            '后端高并发处理策略',
            'TypeScript 全面指南',
            'GraphQL API 开发',
            '微前端架构实战',
            'Serverless 从入门到实战',
            '深入理解 Nginx'
          ];
          // 随机播放量和评论数
          const viewNum = Math.floor(Math.random()*900+100) / 10;
          const viewStr = viewNum > 100 ? `${(viewNum/10).toFixed(1)}万` : `${viewNum.toFixed(1)}万`;
          const commentNum = Math.floor(Math.random()*5000+100);
          return {
            id: i+4,
            cover: covers[i % covers.length],
            title: titles[i % titles.length],
            views: viewStr,
            comments: commentNum
          }
        })
      ],
      mockComments: [
        // 30条 mock 评论
        {
          id: 1,
          avatar: require('@/assets/avatar.png'), // keep one default
          user: '代码小白',
          level: 3,
          levelColor: '',
          text: '这个视频讲得太好了，终于搞懂了Vue的响应式原理！',
          emoji: '👍',
          time: '2025-05-10 10:30',
          likes: 789,
          replies: [
            {
              id: 101,
              user: 'React大师',
              color: '',
              level: 6,
              text: 'Vue的响应式确实很优雅，不过我还是更喜欢React Hooks的灵活性。',
              emoji: '',
              time: '2025-05-10 11:00',
              likes: 120
            },
            {
              id: 102,
              user: '后端架构师',
              color: 'color:#ff5a5a;',
              level: 5,
              text: '前端框架都差不多，重要的是业务逻辑和数据处理。',
              emoji: '🤔',
              time: '2025-05-10 11:15',
              likes: 88
            }
          ]
        },
        // 其余 mock 评论
        ...Array.from({ length: 29 }).map((_, i) => {
          const names = ['算法爱好者', '前端萌新', 'Java老兵', 'Pythonista', 'SQL Boy', '架构师', '全栈工程师', 'UI设计师', '产品经理', '测试工程师', '运维大神', 'DevOps专家', '数据科学家', 'AI研究员', 'Go语言粉丝', 'Rustacean', 'C++大佬', 'PHP是最好的语言', 'JS黑粉', 'TS推崇者', 'Vue死忠粉', 'React布道者', 'Angular卫士', 'Svelte探索者', 'NodeJS开发者', 'Deno爱好者', 'DBA', 'SRE', '网络安全专家'];
          const texts = [
            '这道算法题的解法太巧妙了！',
            '原来CSS可以这么玩，学到了！',
            'Spring Boot yyds!',
            '人生苦短，我用Python。',
            'GROUP BY 和 HAVING 有什么区别？',
            '微服务拆分应该注意什么？',
            '前端性能优化有哪些技巧？',
            '这个UI设计也太好看了吧！',
            '需求又改了...',
            '这个bug怎么复现不了？',
            '服务器又宕机了，赶紧看看！',
            'CI/CD流水线又挂了。',
            '这个模型的准确率又提升了！',
            'Transformer架构yyds。',
            'Goroutine的并发模型太强了。',
            'Rust的所有权机制让人又爱又恨。',
            'C++的模板元编程真是魔法。',
            'PHP是世界上最好的语言！不接受反驳！',
            'JavaScript的设计缺陷太多了。',
            'TypeScript让我的代码更健壮了。',
            'Vue 3的Composition API太香了。',
            'React Server Components是未来。',
            'Angular的依赖注入是神设计。',
            'Svelte的编译时优化思路很新颖。',
            'Node.js的异步IO处理能力很强。',
            'Deno会取代Node.js吗？',
            '这个SQL查询可以再优化一下。',
            '系统的可用性要做到99.99%。',
            '最近又有什么新的漏洞？'
          ];
          const emojis = ['', '💡', '🚀', '🐍', '🤔', '🧱', '⚡️', '🎨', '🤦', '🐞', '🔥', '🚧', '📈', '🤖', '💨', '🦀', '🧙', '👑', '🤢', '💖', '💚', '💙', '❤️', '🧡', '⚙️', '🦕', '💾', '🛡️', ' CVE-2024-XXXX'];

          const avatars = [
            require('@/assets/C语言.png'),
            require('@/assets/Java.png'),
            require('@/assets/Python.png'),
            require('@/assets/Vue3.png'),
            require('@/assets/react.png'),
            require('@/assets/sql.png'),
            require('@/assets/AI1.png'),
            require('@/assets/AI2.png'),
            require('@/assets/AI3.png'),
            require('@/assets/py.png'),
            require('@/assets/java1.png'),
            require('@/assets/avatar.png')
          ];

          const levels = [1,2,3,4,5,6];
          const now = new Date(2025, 4, 10 + Math.floor(i/5), 12 + (i%10), 10 + (i%50));

          // 生成1~3条二级评论
          const replyCount = Math.floor(Math.random()*3)+1;
          const replyNames = ['键盘侠', '吃瓜群众', '大佬请喝茶', '路人甲', '沙发', '板凳', '地下室', '天花板', '围观', '技术宅'];
          const replyTexts = [
            '说得好有道理！',
            '哈哈哈，赞同！',
            '我也觉得是这样。',
            '有趣的观点。',
            '技术圈就是这样。',
            '学到了学到了。',
            '第一次看到这种说法。',
            '评论区人均大神。',
            '支持一下。',
            '笑死我了😂'
          ];
          const replyEmojis = ['', '', '😂', '', '', '', '', '', '', '😂😂'];
          const replyLevels = [3,4,5,6];
          const replyColors = ['', 'color:#ff5a5a;', 'color:#1890ff;', 'color:#ff9800;'];
          const replies = Array.from({length: replyCount}).map((_, j) => {
            const rname = replyNames[(i+j)%replyNames.length];
            return {
              id: 2000 + i*10 + j,
              user: rname,
              color: replyColors[(i+j)%replyColors.length],
              level: replyLevels[(i+j)%replyLevels.length],
              text: replyTexts[(i+j)%replyTexts.length],
              emoji: replyEmojis[(i+j)%replyEmojis.length],
              time: `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${(now.getMinutes()+j*3).toString().padStart(2,'0')}`,
              likes: Math.floor(Math.random()*200+10)
            }
          });

          return {
            id: i + 2,
            avatar: avatars[i % avatars.length],
            user: names[i % names.length],
            level: levels[i % levels.length],
            levelColor: i % 7 === 2 ? 'background:#ffeaea;color:#ff5a5a;' : '',
            text: texts[i % texts.length],
            emoji: emojis[i % emojis.length],
            time: `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`,
            likes: Math.floor(Math.random()*1000+100),
            replies
          }
        })
      ],
      allComments: [],    // 所有mock评论
      commentList: [],    // 当前已加载评论
      loadingMore: false,
      hasMore: true,
       recommendExpand: false, // 控制推荐列表是否展开
    recommendShowCount: 8,  // 初始显示的推荐视频数量
    }
  },
  computed: {
    showRecommendVideos() {
      return this.recommendExpand ? this.recommendVideos : this.recommendVideos.slice(0, this.recommendShowCount);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // 无限滚动初始化
    this.initAllComments();
    this.loadMoreComments();
    window.addEventListener('scroll', this.handleCommentScroll);
    const id = Number(this.$route.params.id);
    // 只支持BV1p84y1P7Z5
    // 视频数据列表
    const videoData = [
      {
        id: 1,
        cover: require('@/assets/demo.png'),
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
        views: '8.5万',
        duration: '01:45:30',
        category: '前端',
        bvid: 'BV1HV4y1a7n4'
      },
      {
        id: 3,
        cover: require('@/assets/AI2.png'),
        title: 'React hooks详解',
        uploader: 'React学院',
        views: '15.2万',
        duration: '01:20:15',
        category: '前端',
        bvid: 'BV1wy4y1D7JT'
      },
      {
        id: 4,
        cover: require('@/assets/Java.png'),
        title: 'JavaScript高级编程',
        uploader: 'JS编程',
        views: '23.7万',
        duration: '02:10:45',
        category: '前端',
        bvid: 'BV1PY411e7J6'
      },
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
    ];
    
    // 根据id查找对应的视频
    this.video = videoData.find(v => v.id === id) || null;
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.handleCommentScroll);
  },
  methods: {
   handleScroll() {
    if (this.miniPlayerClosed) return;
    // 检查右侧展开按钮是否可见
    const expandBtn = this.$refs.expandBtn;
    if (expandBtn) {
      const rect = expandBtn.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      this.showMiniPlayer = !inView;
    }
  },
  closeMiniPlayer() {
    this.showMiniPlayer = false;
    this.miniPlayerClosed = true;
    // 移除 window.scrollTo，不再滚动页面
  },
    // 无限滚动相关
    initAllComments() {
      // 生成50条mock评论（复用原有mock生成逻辑）
      const base = this.mockComments;
      this.allComments = [];
      for(let i=0;i<50;i++) {
        // 深拷贝，避免引用问题
        const c = JSON.parse(JSON.stringify(base[i%base.length]));
        c.id = 1000 + i;
        c.user = c.user + (i+1);
        c.likes = Math.floor(Math.random()*1000+100);
        c.time = `2025-04-${(23 + Math.floor(i/5)).toString().padStart(2,'0')} ${(12 + (i%10)).toString().padStart(2,'0')}:${(10 + (i%50)).toString().padStart(2,'0')}`;
        // 二级评论id和内容也做区分
        if(c.replies) {
          c.replies.forEach((r,idx)=>{
            r.id = 2000 + i*10 + idx;
            r.user = r.user + (i+1);
            r.likes = Math.floor(Math.random()*200+10);
            r.time = `2025-04-${(23 + Math.floor(i/5)).toString().padStart(2,'0')} ${(13 + idx).toString().padStart(2,'0')}:${(10 + (i%50)).toString().padStart(2,'0')}`;
          });
        }
        this.allComments.push(c);
      }
      this.commentList = [];
    },
    handleCommentScroll() {
      if (!this.hasMore || this.loadingMore) return;
      const commentListEl = this.$refs.commentList;
      if (!commentListEl) return;
      const rect = commentListEl.getBoundingClientRect();
      if (rect.bottom < window.innerHeight + 100) {
        this.loadMoreComments();
      }
    },
    loadMoreComments() {
      if (!this.hasMore) return;
      this.loadingMore = true;
      setTimeout(() => { // 模拟异步加载
        const next = this.allComments.splice(0, 10);
        if (next.length) {
          this.commentList = this.commentList.concat(next);
        }
        if (this.allComments.length === 0) {
          this.hasMore = false;
        }
        this.loadingMore = false;
      }, 600);
    }
  }
}
</script>

<style scoped>
.video-detail-container {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f7f8fa;
  padding: 32px 0;
  min-height: 100vh;
}
.main-content {
  width: 820px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 32px;
  margin-right: 32px;
}
.video-info {
  margin-bottom: 16px;
}
.video-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}
.video-meta span {
  margin-right: 18px;
  color: #888;
  font-size: 14px;
}
.video-player {
  position: relative;
  width: 100%;
  height: 420px;
  background: #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.play-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  color: #fff;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.play-btn:hover {
  background: rgba(0,0,0,0.5);
}
.danmu-section {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.danmu-input {
  flex: 1;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 15px;
  outline: none;
  margin-right: 12px;
}
.danmu-send {
  background: #00aeec;
  color: #fff;
  border: none;
  border-radius: 18px;
  height: 36px;
  padding: 0 24px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.danmu-send:hover {
  background: #0095c2;
}
.recommend-list {
  width: 340px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 24px 20px 0 20px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
.recommend-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.recommend-list h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
}
.recommend-item {
  display: flex;
  margin-bottom: 18px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}
.recommend-item:hover {
  background: #f0f7ff;
}
.recommend-cover {
  width: 110px;
  height: 62px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 12px;
}
.recommend-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.recommend-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #222;
}
.recommend-meta span {
  color: #888;
  font-size: 13px;
  margin-right: 10px;
}
.video-actions {
  margin-top: 18px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
}
.danmu-stats {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #666;
  margin-bottom: 10px;
}
.danmu-stats i {
  margin-left: 10px;
  font-size: 18px;
  color: #b3b3b3;
  cursor: pointer;
}
.action-buttons {
  display: flex;
  align-items: center;
  margin-top: 6px;
}
.action-btn {
  display: flex;
  align-items: center;
  margin-right: 28px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}
.action-btn span:first-child {
  font-size: 22px;
  margin-right: 6px;
}
.action-btn.like:hover {
  color: #00aeec;
}
.action-btn.coin:hover {
  color: #fbc02d;
}
.action-btn.fav:hover {
  color: #ff7c7c;
}
.action-btn.share:hover {
  color: #7c7cff;
}
.video-tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tag {
  background: #f4f6fa;
  color: #4a4a4a;
  border-radius: 16px;
  padding: 4px 14px;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.tag.music {
  background: #e6f7ff;
  color: #1890ff;
}
.tag.more {
  background: #f0f0f0;
  color: #888;
  cursor: pointer;
}
.comment-section {
  margin-top: 32px;
  background: #fafbfc;
  border-radius: 10px;
  padding: 28px 24px 18px 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.comment-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}
.comment-count {
  color: #00aeec;
  font-size: 18px;
  margin-left: 4px;
}
.comment-sort span {
  font-size: 15px;
  color: #888;
  margin-left: 18px;
  cursor: pointer;
}
.comment-sort .active {
  color: #00aeec;
  font-weight: bold;
  border-bottom: 2px solid #00aeec;
  padding-bottom: 2px;
}
.comment-input-row {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}
.comment-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}
.comment-input {
  flex: 1;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 15px;
  outline: none;
  margin-right: 12px;
  background: #fff;
}
.comment-send {
  background: #00aeec;
  color: #fff;
  border: none;
  border-radius: 18px;
  height: 36px;
  padding: 0 24px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.comment-send:hover {
  background: #0095c2;
}
.comment-list {
  margin-top: 8px;
}
.comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 28px;
}
.comment-content-box {
  flex: 1;
  margin-left: 10px;
}
.comment-user-row {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}
.comment-user {
  font-weight: 500;
  color: #222;
  margin-right: 8px;
}
.comment-level {
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 8px;
  font-size: 12px;
  padding: 1px 7px;
  margin-right: 6px;
}
.comment-text {
  font-size: 15px;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.7;
}
.emoji {
  margin-left: 2px;
}
.comment-meta {
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 6px;
}
.reply-btn {
  color: #00aeec;
  cursor: pointer;
}
.sub-comment-list {
  background: #f4f6fa;
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: 8px;
}
.sub-comment-item {
  font-size: 14px;
  color: #444;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.sub-comment-user {
  font-weight: 500;
  margin-right: 6px;
}
.sub-comment-level {
  background: #ffeaea;
  color: #ff5a5a;
  border-radius: 8px;
  font-size: 12px;
  padding: 1px 7px;
  margin-right: 6px;
}
.sub-comment-text {
  margin-right: 8px;
}
.sub-comment-meta {
  color: #888;
  font-size: 12px;
}
.sub-comment-more {
  color: #00aeec;
  font-size: 13px;
  margin-top: 4px;
  cursor: pointer;
}
.expand-btn {
  width: 100%;
  background: #e9ebed;
  color: #222;
  text-align: center;
  font-size: 20px;
  padding: 15px 0 15px 0;
  border-radius: 10px;
  margin-top: 18px;
  margin-bottom: 10px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: background 0.2s;
}
.expand-btn:hover {
  background: #e0e2e5;
}
.mini-player {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 400px;
  height: 260px;
  background: #222;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.mini-video-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mini-play-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 38px;
  color: #fff;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.mini-close {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 20px;
  color: #fff;
  background: rgba(0,0,0,0.4);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}
.comment-loading {
  text-align: center;
  color: #888;
  font-size: 15px;
  padding: 16px 0;
}
.comment-nomore {
  text-align: center;
  color: #bbb;
  font-size: 15px;
  padding: 16px 0;
}
</style>
