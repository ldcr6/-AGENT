export default {
	name: 'onlineExam',
	title: '在线考试',
	icon: 'el-icon-edit',
	route: {
		path: '/online-exam',
		component: () => import('./views/QuestionList.vue'),
		children: [
			{
				path: '',
				name: 'QuestionList',
				component: () => import('./views/QuestionList.vue'),
				meta: { title: '题库列表' }
			},
			{
				path: 'exam',
				name: 'ExamStart',
				component: () => import('./views/ExamStart.vue'),
				meta: { title: '答题' }
			},
			{
				path: 'result',
				name: 'ExamResultPage',
				component: () => import('./views/ExamResultPage.vue'),
				meta: { title: '考试结果' }
			}
		]
	}
};
