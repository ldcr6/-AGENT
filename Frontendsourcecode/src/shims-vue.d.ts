declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module 'element-plus/dist/locale/zh-cn.mjs';

declare module 'particles.js' {
	const particlesJS: any;
	export default particlesJS;
}
