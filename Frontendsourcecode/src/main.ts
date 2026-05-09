import { createApp } from 'vue';
import App from './App.vue';
import { bootstrap } from './cool';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faCode,
	faBolt,
	faShieldAlt,
	faTasks,
	faBug,
	faDatabase,
	faCodeBranch,
	faCloud
} from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);

// 启动
bootstrap(app)
	.then(() => {
		app.mount('#app');
	})
	.catch(err => {
		console.error('COOL-ADMIN 启动失败', err);
	});
// 在main.ts或单独的文件中
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

// 添加你用到的图标
library.add(faCode, faBolt, faShieldAlt, faTasks, faBug, faDatabase, faCodeBranch, faCloud);

// 注册全局组件
app.component('FontAwesomeIcon', FontAwesomeIcon);
