export default {
	name: 'resume',
	title: '简历管理',
	icon: 'el-icon-document',
	route: {
		path: '/resume',
		component: () => import('./views/ResumeList.vue'),
		children: [
			{
				path: 'edit/:id?',
				component: () => import('./views/ResumeEdit.vue'),
				meta: { title: '编辑简历' }
			},
			{
				path: 'detail/:id',
				component: () => import('./views/ResumeDetail.vue'),
				meta: { title: '简历详情' }
			},
			{
				path: 'upload',
				component: () => import('./views/ResumeUpload.vue'),
				meta: { title: '上传简历' }
			}
		]
	}
};
