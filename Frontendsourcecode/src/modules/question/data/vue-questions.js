export default [
	{
		id: 1,
		title: 'Vue3 的 Composition API 与 Options API 有哪些区别？',
		tags: ['Vue3', 'API', '对比'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'Composition API 更灵活，逻辑复用性强，Options API 结构清晰，适合小型项目。',
		explanation:
			'Composition API 通过 setup 函数组织逻辑，支持 hooks 和逻辑复用。Options API 通过 data、methods、computed 等选项分离逻辑，易读性好。'
	},
	{
		id: 2,
		title: 'v-if 和 v-show 有什么区别？',
		tags: ['指令', '性能'],
		difficulty: '初级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'v-if 是条件渲染，条件不成立时不渲染 DOM；v-show 只是切换 display 样式。',
		explanation:
			'v-if 有较高的切换开销，适合条件不常变的场景。v-show 切换开销小，适合频繁切换的场景。'
	},
	{
		id: 3,
		title: 'Vue 的响应式原理是什么？',
		tags: ['响应式', '原理'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'Vue2 用 Object.defineProperty 劫持数据，Vue3 用 Proxy 实现响应式。',
		explanation:
			'响应式原理是劫持数据的 get/set，依赖收集和派发更新。Proxy 支持更多数据类型和更好的性能。'
	},
	{
		id: 4,
		title: 'Vue 生命周期的各个阶段及其作用？',
		tags: ['生命周期'],
		difficulty: '初级',
		author: 'Vue小组',
		addedTime: '2025-07-20',
		solution: 'Vue 生命周期包括创建、挂载、更新和销毁等阶段，每个阶段有对应的钩子函数。',
		explanation:
			'常见生命周期钩子有 beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted。每个钩子可用于初始化数据、操作 DOM、清理资源等。'
	},
	{
		id: 5,
		title: '父子组件通信的方式有哪些？',
		tags: ['组件通信'],
		difficulty: '初级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: '常见通信方式有 props、$emit、自定义事件、provide/inject、ref、Vuex 等。',
		explanation:
			'父传子用 props，子传父用 $emit 触发事件。跨层级可用 provide/inject，全局状态用 Vuex，复杂场景可用 event bus 或 ref。'
	},
	{
		id: 6,
		title: 'Vue 中如何实现双向绑定？',
		tags: ['双向绑定', 'v-model'],
		difficulty: '初级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: '通过 v-model 指令实现，底层原理是 :value 和 @input 事件的语法糖。',
		explanation:
			'v-model 会自动绑定组件的 value 属性和 input 事件，实现数据的双向流动。自定义组件需用 modelValue 和 update:modelValue 实现。'
	},
	{
		id: 7,
		title: 'Vue 的虚拟 DOM 是什么？',
		tags: ['虚拟DOM'],
		difficulty: '中级',
		author: 'Vue小组',
		addedTime: '2025-07-20',
		solution: '虚拟 DOM 是用 JS 对象描述真实 DOM 结构的一种技术。',
		explanation:
			'Vue 通过虚拟 DOM 进行高效的 DOM diff 和最小化更新，提升渲染性能。每次数据变更会生成新的虚拟 DOM 树，与旧树对比后只更新必要部分。'
	},
	{
		id: 8,
		title: 'Vue 的 key 有什么作用？',
		tags: ['key', 'diff算法'],
		difficulty: '初级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'key 用于唯一标识节点，帮助虚拟 DOM 更准确高效地复用和更新元素。',
		explanation:
			'没有 key 时，Vue 采用就地复用策略，可能导致状态错乱。加 key 后，diff 算法能正确识别节点的身份，提升性能和正确性。'
	},
	{
		id: 9,
		title: 'Vue 组件的 keep-alive 有什么用？',
		tags: ['keep-alive', '缓存'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'keep-alive 是 Vue 的内置组件，用于缓存动态组件，避免重复渲染和销毁。',
		explanation:
			'被 keep-alive 包裹的组件切换时不会被销毁，而是缓存到内存，下次激活时保留状态。常用于 tab 页、路由缓存等场景。'
	},
	{
		id: 10,
		title: 'Vue 的 computed 和 watch 区别是什么？',
		tags: ['computed', 'watch'],
		difficulty: '初级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'computed 用于声明式计算属性，watch 用于侦听数据变化执行副作用。',
		explanation:
			'computed 结果会缓存，只有依赖变化才重新计算。watch 适合异步或开销较大的操作，如请求、手动 DOM 操作等。'
	},
	{
		id: 11,
		title: 'Vue 如何实现异步组件？',
		tags: ['异步组件'],
		difficulty: '中级',
		author: '前端小白',
		addedTime: '2025-07-20',
		solution: '通过 defineAsyncComponent 或异步 import() 实现组件的懒加载。',
		explanation:
			'Vue3 提供 defineAsyncComponent 包裹异步工厂函数，Vue2 用异步组件工厂。常用于路由懒加载、按需加载等场景。'
	},
	{
		id: 12,
		title: 'Vue 的 slot 机制及其用法？',
		tags: ['slot', '插槽'],
		difficulty: '初级',
		author: '小孙',
		addedTime: '2025-07-20',
		solution: 'slot 是 Vue 提供的内容分发机制，支持默认插槽、具名插槽和作用域插槽。',
		explanation:
			'slot 允许父组件向子组件传递任意内容，提升组件复用性。作用域插槽可让父组件访问子组件数据。'
	},
	{
		id: 13,
		title: 'Vue 的自定义指令如何实现？',
		tags: ['自定义指令'],
		difficulty: '中级',
		author: '小周',
		addedTime: '2025-07-20',
		solution: '通过 Vue.directive 注册全局指令，或在组件 directives 选项中注册局部指令。',
		explanation:
			'自定义指令可操作 DOM，常用于聚焦、拖拽等场景。钩子函数包括 bind、inserted、update、unbind（Vue2）或 created、mounted、updated、unmounted（Vue3）。'
	},
	{
		id: 14,
		title: 'Vue 的 mixin 和 composition API 有什么区别？',
		tags: ['mixin', 'composition API'],
		difficulty: '中级',
		author: '小吴',
		addedTime: '2025-07-20',
		solution: 'mixin 通过对象混入复用逻辑，composition API 通过函数组合复用逻辑。',
		explanation:
			'mixin 可能导致命名冲突和逻辑不清晰，composition API 更灵活、可组合、类型推导友好。推荐优先使用 composition API。'
	},
	{
		id: 15,
		title: 'Vue 的 provide/inject 用法及应用场景？',
		tags: ['provide', 'inject'],
		difficulty: '中级',
		author: '小郑',
		addedTime: '2025-07-20',
		solution: 'provide 在祖先组件注入数据，inject 在后代组件获取数据，实现跨层级通信。',
		explanation:
			'适合深层嵌套组件传递全局配置、主题、依赖注入等场景。不是响应式的，需手动处理响应式。'
	},
	{
		id: 16,
		title: 'Vue 的自定义事件如何触发和监听？',
		tags: ['自定义事件'],
		difficulty: '初级',
		author: '小冯',
		addedTime: '2025-07-20',
		solution: '子组件通过 $emit 触发事件，父组件通过 @事件名 监听。',
		explanation: '自定义事件用于父子通信。Vue3 中 $emit 依然可用，需在 emits 选项声明事件。'
	},
	{
		id: 17,
		title: 'Vue 的 $nextTick 有什么作用？',
		tags: ['$nextTick'],
		difficulty: '初级',
		author: '小褚',
		addedTime: '2025-07-20',
		solution: '$nextTick 用于在 DOM 更新后执行回调，保证拿到最新的 DOM。',
		explanation: '常用于数据变更后需要操作 DOM 的场景，如获取元素高度、聚焦等。'
	},
	{
		id: 18,
		title: 'Vue 的路由懒加载如何实现？',
		tags: ['路由', '懒加载'],
		difficulty: '中级',
		author: '小卫',
		addedTime: '2025-07-20',
		solution: '通过路由配置中的 component: () => import(…) 实现按需加载。',
		explanation: 'Vue Router 支持路由级异步组件，只有访问路由时才加载对应组件，减少首屏体积。'
	},
	{
		id: 19,
		title: 'Vue 的动态组件如何实现？',
		tags: ['动态组件'],
		difficulty: '中级',
		author: '小蒋',
		addedTime: '2025-07-20',
		solution: '通过 <component :is="组件名"> 动态渲染不同组件。',
		explanation: '动态组件适合 tab 页、弹窗等场景，配合 keep-alive 可缓存切换状态。'
	},
	{
		id: 20,
		title: 'Vue 的 v-for 为什么要加 key？',
		tags: ['v-for', 'key'],
		difficulty: '初级',
		author: '小沈',
		addedTime: '2025-07-20',
		solution: 'key 唯一标识每个节点，帮助 diff 算法高效复用和定位元素。',
		explanation:
			'没有 key 时，Vue 采用就地复用，可能导致状态错乱。加 key 后能提升性能和正确性。'
	},
	{
		id: 21,
		title: 'Vue 的依赖收集原理？',
		tags: ['依赖收集', '响应式'],
		difficulty: '高级',
		author: '小韩',
		addedTime: '2025-07-20',
		solution: '依赖收集通过 getter 收集依赖，setter 触发更新。',
		explanation: '每个响应式属性都维护依赖列表，访问时收集依赖，变更时通知 watcher 更新视图。'
	},
	{
		id: 22,
		title: 'Vue 的 diff 算法原理？',
		tags: ['diff算法'],
		difficulty: '高级',
		author: '小杨',
		addedTime: '2025-07-20',
		solution: '采用双指针和同层比较，尽量复用节点，减少 DOM 操作。',
		explanation:
			'diff 算法只比较同级节点，利用 key 快速定位变化，提升性能。核心思想是最小化 DOM 更新。'
	},
	{
		id: 23,
		title: 'Vue 的自定义过滤器如何实现？',
		tags: ['过滤器'],
		difficulty: '初级',
		author: '小朱',
		addedTime: '2025-07-20',
		solution: 'Vue2 通过 filters 选项注册全局或局部过滤器，Vue3 推荐用方法或计算属性替代。',
		explanation: '过滤器常用于文本格式化。Vue3 已不推荐使用过滤器，建议用函数或 computed 实现。'
	},
	{
		id: 24,
		title: 'Vue 的 v-model 原理？',
		tags: ['v-model', '原理'],
		difficulty: '中级',
		author: '小秦',
		addedTime: '2025-07-20',
		solution: 'v-model 是 :value 和 @input 的语法糖，底层通过 props 和事件实现。',
		explanation:
			'自定义组件需用 modelValue 和 update:modelValue 实现双向绑定。v-model 让表单和数据自动同步。'
	},
	{
		id: 25,
		title: 'Vue 的 SSR（服务端渲染）原理？',
		tags: ['SSR', '服务端渲染'],
		difficulty: '高级',
		author: '小尤',
		addedTime: '2025-07-20',
		solution: 'SSR 通过在服务端生成 HTML，提升首屏速度和 SEO。',
		explanation:
			'Vue SSR 会将组件渲染为字符串返回给浏览器，客户端再激活为可交互应用。需处理数据同步、路由、缓存等问题。'
	},
	{
		id: 26,
		title: 'Vue 的响应式数据如何检测数组变化？',
		tags: ['响应式', '数组'],
		difficulty: '中级',
		author: '小许',
		addedTime: '2025-07-20',
		solution: 'Vue2 劫持数组变异方法，Vue3 直接代理数组，能检测 push、pop、splice 等操作。',
		explanation: 'Vue2 通过重写数组原型方法实现响应式，Vue3 用 Proxy 能代理所有操作。'
	},
	{
		id: 27,
		title: 'Vue 的 $refs 有哪些应用场景？',
		tags: ['$refs'],
		difficulty: '初级',
		author: '小何',
		addedTime: '2025-07-20',
		solution: '$refs 可用于获取 DOM 或子组件实例，常用于手动操作 DOM、调用子组件方法等。',
		explanation:
			'如表单重置、聚焦、滚动定位、调用子组件方法等场景。注意 $refs 只在组件渲染后可用。'
	},
	{
		id: 28,
		title: 'Vue3 的 Teleport 组件作用是什么？',
		tags: ['Teleport', 'Vue3'],
		difficulty: '中级',
		author: '小吕',
		addedTime: '2025-07-20',
		solution: 'Teleport 可将子组件渲染到 DOM 树的任意位置，常用于弹窗、全局提示等。',
		explanation: 'Teleport 解决了层级嵌套导致的样式、定位等问题，提升了组件复用性和灵活性。'
	}
];
