import { type ModuleConfig } from '/@/cool';

export default (): ModuleConfig => {
	return {
		views: [
			{
				path: '/achievement',
				meta: { label: '我的成就' },
				component: () => import('./views/a.vue')
			}
		]
	};
};