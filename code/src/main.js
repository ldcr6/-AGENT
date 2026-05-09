import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Particles from "particles.vue3"
// import './index.css'
// import './styles/global.css'
// import './styles/tailwind.css' // 引入全局样式
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(router)
app.use(Particles) // 注册插件
app.mount('#app')
