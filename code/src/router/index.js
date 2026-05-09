import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import JobSquare from '@/views/JobSquare.vue'
import AIinterview from '../views/AIinterview.vue'
import Study from '../views/Study.vue'
// import { viewDepthKey } from 'vue-router'
import VideoDetail from '../views/VideoDetail.vue'
import LearningPath from '../views/LearningPath.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import OnlineTest from '../views/OnlineTest.vue'
import JobDetail from '../views/JobDetail.vue'
import ChatPage from '@/views/ChatPage.vue'
import MySpace from '@/views/MySpace.vue'

// 导入刷题模块组件




const routes = [
  { path: '/', component: Home },
  { path: '/jobs', component: JobSquare },
  { path: '/AI', component: AIinterview},
  { path: '/study', component: Study},
  { path: '/video/:id', name: 'VideoDetail', component: VideoDetail },
  { path: '/learningpath', name: 'LearningPath', component: LearningPath},
  { path: '/personal', component: PersonalCenter},
  { path: '/online', component: OnlineTest},
  { path: '/job-detail', name: 'JobDetail', component: JobDetail },
  { path: '/chat', name: 'ChatPage', component: ChatPage },
  { path: '/my', component: MySpace}

 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
