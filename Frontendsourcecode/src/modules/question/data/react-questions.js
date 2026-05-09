export default [
	{
		id: 1,
		title: 'React 的虚拟 DOM 原理是什么？',
		tags: ['虚拟DOM', '原理'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution:
			'虚拟 DOM 是用 JS 对象模拟真实 DOM，diff 算法找出最小变更，最后批量更新真实 DOM。',
		explanation:
			'虚拟 DOM 提高了性能，避免了频繁操作真实 DOM。React 通过 JSX 生成虚拟 DOM，diff 算法高效对比新旧树结构。'
	},
	{
		id: 2,
		title: 'React Hooks 的使用规则和注意事项',
		tags: ['Hooks', '函数组件'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'Hooks 只能在函数组件顶层调用，不能在循环、条件、嵌套函数中调用。',
		explanation:
			'useState、useEffect 等只能在组件顶层调用，保证每次渲染顺序一致。自定义 Hook 以 use 开头。'
	},
	{
		id: 3,
		title: 'React 的 setState 是同步还是异步？',
		tags: ['setState', '异步'],
		difficulty: '初级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'setState 在合成事件和生命周期中是异步的，在 setTimeout、原生事件中是同步的。',
		explanation:
			'React 为了性能优化会批量更新 state，setState 不是立即更新，而是合并后统一渲染。'
	},
	{
		id: 4,
		title: 'React 的生命周期函数有哪些？',
		tags: ['生命周期'],
		difficulty: '初级',
		author: 'React小组',
		addedTime: '2025-07-20',
		solution:
			'常见生命周期函数有 componentDidMount、componentDidUpdate、componentWillUnmount、shouldComponentUpdate、getDerivedStateFromProps、render 等。函数组件可用 useEffect 模拟。',
		explanation:
			'React 生命周期分为挂载、更新、卸载等阶段。类组件有对应钩子，函数组件用 useEffect/useLayoutEffect 等实现副作用管理。合理利用生命周期可实现数据请求、事件绑定、资源清理等。'
	},
	{
		id: 5,
		title: 'React 的 Context 用法及应用场景？',
		tags: ['Context', '状态管理'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution:
			'Context 用于跨组件传递数据，避免多层 props 传递。通过 React.createContext 创建，Provider 提供数据，Consumer 或 useContext 获取。',
		explanation:
			'Context 适合全局主题、用户信息、语言等场景。Provider 包裹组件树，value 属性传递数据。子组件通过 useContext(Context) 或 Consumer 获取。注意：Context 变更会导致所有消费组件重新渲染，不适合频繁变化数据。'
	},
	{
		id: 6,
		title: 'React 的高阶组件（HOC）是什么？',
		tags: ['高阶组件', 'HOC'],
		difficulty: '中级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: '高阶组件是参数为组件，返回新组件的函数。常用于逻辑复用、权限控制、增强组件等。',
		explanation:
			'HOC 本质是函数，签名为 (Component) => NewComponent。常见如 withRouter、connect。HOC 不会修改原组件，只是包裹并增强其功能。使用时注意 props 透传和静态方法丢失问题。'
	},
	{
		id: 7,
		title: 'React 的受控组件和非受控组件区别？',
		tags: ['受控组件', '非受控组件'],
		difficulty: '初级',
		author: 'React小组',
		addedTime: '2025-07-20',
		solution: '受控组件的表单值由 state 控制，非受控组件通过 ref 直接操作 DOM 获取值。',
		explanation:
			'受控组件通过 value/onChange 绑定 state，数据流可控，适合复杂交互。非受控组件用 defaultValue 和 ref，适合简单场景或与第三方库集成。推荐优先使用受控组件。'
	},
	{
		id: 8,
		title: 'React 的事件机制？',
		tags: ['事件机制'],
		difficulty: '初级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'React 采用合成事件机制，统一管理事件，兼容各浏览器。',
		explanation:
			'React 事件不是原生事件，而是合成事件（SyntheticEvent），在事件池中复用，提升性能。事件委托到根节点，减少事件监听数量。支持冒泡和捕获。'
	},
	{
		id: 9,
		title: 'React 的 key 有什么作用？',
		tags: ['key', 'diff算法'],
		difficulty: '初级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'key 用于唯一标识列表项，帮助 React 高效 diff 和复用 DOM 元素。',
		explanation:
			'key 应该具有唯一性，常用 id。不要用 index 作为 key，可能导致状态错乱。key 变化会导致组件销毁重建。合理设置 key 可提升渲染性能。'
	},
	{
		id: 10,
		title: 'React 的 Fiber 架构是什么？',
		tags: ['Fiber', '架构'],
		difficulty: '高级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'Fiber 是 React 16 引入的新架构，实现可中断、分片的渲染，提升响应速度。',
		explanation:
			'Fiber 将渲染任务拆分为小单元，利用浏览器空闲时间分步执行，避免主线程阻塞。支持优先级调度、异步渲染、时间切片等。是 React 性能优化的核心。'
	},
	{
		id: 11,
		title: 'React 的 Redux 用法及原理？',
		tags: ['Redux', '状态管理'],
		difficulty: '中级',
		author: '小吴',
		addedTime: '2025-07-20'
	},
	{
		id: 12,
		title: 'React 的 useEffect 有哪些注意事项？',
		tags: ['useEffect', 'Hooks'],
		difficulty: '中级',
		author: '小郑',
		addedTime: '2025-07-20'
	},
	{
		id: 13,
		title: 'React 的 useMemo 和 useCallback 区别？',
		tags: ['useMemo', 'useCallback'],
		difficulty: '中级',
		author: '小冯',
		addedTime: '2025-07-20'
	},
	{
		id: 14,
		title: 'React 的组件通信方式有哪些？',
		tags: ['组件通信'],
		difficulty: '初级',
		author: '小褚',
		addedTime: '2025-07-20'
	},
	{
		id: 15,
		title: 'React 的懒加载和代码分割？',
		tags: ['懒加载', '代码分割'],
		difficulty: '中级',
		author: '小卫',
		addedTime: '2025-07-20'
	},
	{
		id: 16,
		title: 'React 的错误边界是什么？',
		tags: ['错误边界'],
		difficulty: '中级',
		author: '小蒋',
		addedTime: '2025-07-20'
	},
	{
		id: 17,
		title: 'React 的 Portals 用法？',
		tags: ['Portals'],
		difficulty: '中级',
		author: '小沈',
		addedTime: '2025-07-20'
	},
	{
		id: 18,
		title: 'React 的合成事件是什么？',
		tags: ['合成事件'],
		difficulty: '初级',
		author: '小韩',
		addedTime: '2025-07-20'
	},
	{
		id: 19,
		title: 'React 的 Fragment 有什么用？',
		tags: ['Fragment'],
		difficulty: '初级',
		author: '小杨',
		addedTime: '2025-07-20'
	},
	{
		id: 20,
		title: 'React 的 refs 用法？',
		tags: ['refs'],
		difficulty: '初级',
		author: '小朱',
		addedTime: '2025-07-20'
	},
	{
		id: 21,
		title: 'React 的 PureComponent 和 Component 区别？',
		tags: ['PureComponent', 'Component'],
		difficulty: '中级',
		author: '小秦',
		addedTime: '2025-07-20'
	},
	{
		id: 22,
		title: 'React 的服务端渲染（SSR）原理？',
		tags: ['SSR', '服务端渲染'],
		difficulty: '高级',
		author: '小尤',
		addedTime: '2025-07-20'
	}
];
