import type { ExamPaper, Question } from '../types';

// mock 题库数据
export const mockQuestions = [
	{
		id: 1,
		title: '中国的首都是哪里？',
		options: ['北京', '上海', '广州', '深圳'],
		type: 'single',
		answer: '北京'
	},
	{
		id: 2,
		title: '下列哪些属于中国四大发明？',
		options: ['指南针', '火药', '印刷术', '算盘'],
		type: 'multiple',
		answer: ['指南针', '火药', '印刷术']
	},
	{
		id: 3,
		title: '请简述你对人工智能的理解。',
		type: 'text',
		answer: ''
	}
];

// 真实面试题库数据
const realPapers = [
	{
		id: 1,
		name: '前端基础测评',
		single: [
			{
				title: 'JavaScript 中，以下哪个方法不会改变原数组？',
				options: ['push', 'pop', 'map', 'splice'],
				answer: 'map'
			},
			{
				title: 'HTTP 状态码 404 表示？',
				options: ['服务器错误', '未找到资源', '请求成功', '未授权'],
				answer: '未找到资源'
			},
			{
				title: 'Vue3 中响应式核心 API 是？',
				options: ['ref', 'watch', 'computed', 'onMounted'],
				answer: 'ref'
			},
			{
				title: '下列哪个标签用于定义表单输入？',
				options: ['<input>', '<div>', '<span>', '<section>'],
				answer: '<input>'
			},
			{
				title: 'CSS3 新增的布局方式是？',
				options: ['float', 'flex', 'inline-block', 'table'],
				answer: 'flex'
			},
			{
				title: '下列哪个不是 HTTP 请求方法？',
				options: ['GET', 'POST', 'FETCH', 'PUT'],
				answer: 'FETCH'
			},
			{
				title: 'ES6 中用于声明常量的关键字是？',
				options: ['var', 'let', 'const', 'static'],
				answer: 'const'
			},
			{
				title: 'React 中用于管理组件状态的 Hook 是？',
				options: ['useState', 'useEffect', 'useRef', 'useMemo'],
				answer: 'useState'
			},
			{
				title: '下列哪个是 CSS 预处理器？',
				options: ['Sass', 'Less', 'Stylus', '以上都是'],
				answer: '以上都是'
			},
			{
				title: '浏览器本地存储容量最大的是？',
				options: ['cookie', 'localStorage', 'sessionStorage', 'IndexedDB'],
				answer: 'IndexedDB'
			},
			{
				title: '下列哪个不是 Node.js 的内置模块？',
				options: ['fs', 'http', 'express', 'path'],
				answer: 'express'
			},
			{
				title: 'TypeScript 的类型断言语法是？',
				options: ['as', 'is', 'typeof', 'instanceof'],
				answer: 'as'
			},
			{
				title: '下列哪个是 Web 安全相关的 HTTP 头？',
				options: ['Content-Security-Policy', 'Accept', 'User-Agent', 'Referer'],
				answer: 'Content-Security-Policy'
			},
			{
				title: 'Vue 生命周期钩子中，首次 DOM 渲染后触发的是？',
				options: ['mounted', 'created', 'beforeMount', 'updated'],
				answer: 'mounted'
			},
			{
				title: '下列哪个方法可用于数组去重？',
				options: ['Set', 'Map', 'WeakMap', 'Proxy'],
				answer: 'Set'
			}
		],
		judge: [
			{ title: 'CSS 的 position: fixed 元素会随页面滚动而移动。', answer: false },
			{ title: 'let 声明的变量有块级作用域。', answer: true },
			{ title: 'HTML5 支持本地存储。', answer: true },
			{ title: 'JavaScript 的 == 和 === 完全等价。', answer: false },
			{ title: 'Vue 的 v-if 和 v-show 都会销毁 DOM 元素。', answer: false },
			{ title: 'Promise 可以多次 resolve。', answer: false },
			{ title: 'React 组件必须有 render 方法。', answer: false },
			{ title: 'TypeScript 是 JavaScript 的超集。', answer: true },
			{ title: 'Node.js 可以操作文件系统。', answer: true },
			{ title: 'HTTP2 支持多路复用。', answer: true },
			{ title: 'localStorage 会随浏览器关闭而清空。', answer: false },
			{ title: 'CSS3 支持动画。', answer: true },
			{ title: '前端路由只能用 hash 实现。', answer: false },
			{ title: 'WebSocket 是单向通信协议。', answer: false },
			{ title: 'ES6 支持解构赋值。', answer: true }
		],
		text: [
			{ title: '简述前端性能优化的常见方法。' },
			{ title: '说说你对 MVVM 的理解。' },
			{ title: '简述跨域的常见解决方案。' },
			{ title: '请描述虚拟 DOM 的原理。' },
			{ title: '谈谈你对前后端分离的理解。' }
		],
		code: [
			{ title: '实现一个防抖函数 debounce。' },
			{ title: '写一个函数，判断字符串是否为回文。' },
			{ title: '实现数组扁平化 flat。' },
			{ title: '手写 Promise.all。' },
			{ title: '实现深拷贝 deepClone。' }
		]
	},
	{
		id: 2,
		name: '算法能力测评',
		single: [
			{
				title: '二分查找的时间复杂度是？',
				options: ['O(n)', 'O(logn)', 'O(n^2)', 'O(1)'],
				answer: 'O(logn)'
			},
			{
				title: '快速排序的平均时间复杂度？',
				options: ['O(n)', 'O(logn)', 'O(nlogn)', 'O(n^2)'],
				answer: 'O(nlogn)'
			},
			{
				title: '哈希表的查找平均时间复杂度？',
				options: ['O(1)', 'O(n)', 'O(logn)', 'O(n^2)'],
				answer: 'O(1)'
			},
			{
				title: 'DFS 的全称是？',
				options: [
					'Depth First Search',
					'Data Find Search',
					'Direct Fast Search',
					'Data First Search'
				],
				answer: 'Depth First Search'
			},
			{
				title: 'BFS 的典型应用是？',
				options: ['树的遍历', '排序', '查找最大值', '字符串匹配'],
				answer: '树的遍历'
			},
			{
				title: '堆排序的空间复杂度？',
				options: ['O(1)', 'O(n)', 'O(logn)', 'O(n^2)'],
				answer: 'O(1)'
			},
			{
				title: '下列哪个不是常见的排序算法？',
				options: ['冒泡排序', '选择排序', '插入排序', '哈夫曼编码'],
				answer: '哈夫曼编码'
			},
			{
				title: 'LeetCode 1 号题考察的是？',
				options: ['两数之和', '反转链表', '二叉树遍历', '字符串分割'],
				answer: '两数之和'
			},
			{
				title: '链表反转的空间复杂度？',
				options: ['O(1)', 'O(n)', 'O(logn)', 'O(n^2)'],
				answer: 'O(1)'
			},
			{
				title: '下列哪个数据结构支持先进先出？',
				options: ['栈', '队列', '树', '图'],
				answer: '队列'
			},
			{
				title: 'KMP 算法用于？',
				options: ['字符串匹配', '排序', '查找最大值', '图遍历'],
				answer: '字符串匹配'
			},
			{
				title: '下列哪个不是树的遍历方式？',
				options: ['前序', '中序', '后序', '顺序'],
				answer: '顺序'
			},
			{
				title: '图的最短路径常用算法？',
				options: ['Dijkstra', 'Kruskal', 'Prim', 'DFS'],
				answer: 'Dijkstra'
			},
			{
				title: '下列哪个算法适合查找第 k 大元素？',
				options: ['快排', '堆排序', '冒泡', '归并'],
				answer: '堆排序'
			},
			{
				title: '下列哪个不是递归的必要条件？',
				options: ['有终止条件', '有递推公式', '有初始条件', '有循环'],
				answer: '有循环'
			}
		],
		judge: [
			{ title: '二分查找只能用于有序数组。', answer: true },
			{ title: '哈希表的 key 可以是对象。', answer: false },
			{ title: 'DFS 可以用递归实现。', answer: true },
			{ title: 'BFS 适合解决最短路径问题。', answer: true },
			{ title: '归并排序是稳定排序。', answer: true },
			{ title: '冒泡排序的最好时间复杂度是 O(n)。', answer: true },
			{ title: '堆排序一定是稳定排序。', answer: false },
			{ title: 'KMP 算法的核心是前缀表。', answer: true },
			{ title: '链表的查找时间复杂度是 O(1)。', answer: false },
			{ title: '图的广度优先遍历可以用队列实现。', answer: true },
			{ title: '递归一定会导致栈溢出。', answer: false },
			{ title: 'DFS 和 BFS 都可以遍历所有节点。', answer: true },
			{ title: '哈夫曼编码是一种无损压缩算法。', answer: true },
			{ title: '树的高度等于节点数。', answer: false },
			{ title: '拓扑排序只能用于有向无环图。', answer: true }
		],
		text: [
			{ title: '简述快速排序的基本思想。' },
			{ title: '请描述二分查找的实现步骤。' },
			{ title: '说说你对递归和迭代的理解。' },
			{ title: '简述哈希表的冲突解决方法。' },
			{ title: '请描述 BFS 的应用场景。' }
		],
		code: [
			{ title: '实现二分查找算法。' },
			{ title: '写一个函数，反转单链表。' },
			{ title: '实现归并排序。' },
			{ title: '手写 LRU 缓存。' },
			{ title: '实现 KMP 字符串匹配算法。' }
		]
	},
	{
		id: 3,
		name: '数据库能力测评',
		single: [
			{
				title: 'SQL 中用于去重的关键字是？',
				options: ['DISTINCT', 'UNIQUE', 'GROUP', 'ORDER'],
				answer: 'DISTINCT'
			},
			{
				title: 'MySQL 默认的存储引擎是？',
				options: ['MyISAM', 'InnoDB', 'MEMORY', 'CSV'],
				answer: 'InnoDB'
			},
			{
				title: '下列哪个不是关系型数据库？',
				options: ['MySQL', 'MongoDB', 'PostgreSQL', 'Oracle'],
				answer: 'MongoDB'
			},
			{
				title: 'SQL 语句中用于模糊查询的关键字是？',
				options: ['LIKE', 'IN', 'BETWEEN', 'EXISTS'],
				answer: 'LIKE'
			},
			{
				title: '数据库范式用于？',
				options: ['消除冗余', '提升性能', '增加索引', '加密数据'],
				answer: '消除冗余'
			},
			{
				title: '下列哪个不是 SQL 聚合函数？',
				options: ['SUM', 'AVG', 'COUNT', 'MAXLEN'],
				answer: 'MAXLEN'
			},
			{
				title: 'MySQL 中用于自增的关键字是？',
				options: ['AUTO_INCREMENT', 'INCREMENT', 'SERIAL', 'IDENTITY'],
				answer: 'AUTO_INCREMENT'
			},
			{
				title: '下列哪个语句可创建索引？',
				options: ['CREATE INDEX', 'ALTER TABLE', 'DROP INDEX', 'INSERT INDEX'],
				answer: 'CREATE INDEX'
			},
			{
				title: 'SQL 注入攻击的本质是？',
				options: ['代码注入', '命令注入', '数据注入', '脚本注入'],
				answer: '代码注入'
			},
			{
				title: '下列哪个不是事务的特性？',
				options: ['原子性', '一致性', '隔离性', '安全性'],
				answer: '安全性'
			},
			{
				title: 'MySQL 支持的字符集是？',
				options: ['utf8', 'gbk', 'latin1', '以上都是'],
				answer: '以上都是'
			},
			{
				title: '下列哪个语句可删除表？',
				options: ['DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
				answer: 'DROP TABLE'
			},
			{
				title: 'SQL 中用于分组的关键字是？',
				options: ['GROUP BY', 'ORDER BY', 'HAVING', 'WHERE'],
				answer: 'GROUP BY'
			},
			{
				title: '下列哪个不是 NoSQL 数据库？',
				options: ['Redis', 'MongoDB', 'PostgreSQL', 'Cassandra'],
				answer: 'PostgreSQL'
			},
			{
				title: 'MySQL 中查看表结构的命令是？',
				options: ['DESC', 'SHOW TABLES', 'SHOW DATABASES', 'SELECT'],
				answer: 'DESC'
			}
		],
		judge: [
			{ title: 'SQL 支持嵌套查询。', answer: true },
			{ title: 'MySQL 的主键可以重复。', answer: false },
			{ title: 'MongoDB 是文档型数据库。', answer: true },
			{ title: '数据库索引会提升所有查询的性能。', answer: false },
			{ title: 'SQL 注入可以通过参数化查询防御。', answer: true },
			{ title: 'Redis 支持持久化。', answer: true },
			{ title: '数据库的 ACID 特性包括安全性。', answer: false },
			{ title: 'MySQL 支持外键约束。', answer: true },
			{ title: 'SQL 的 SELECT 语句必须有 WHERE 子句。', answer: false },
			{ title: '关系型数据库的数据以表格形式存储。', answer: true },
			{ title: 'NoSQL 数据库不支持事务。', answer: false },
			{ title: 'MySQL 的 InnoDB 支持事务。', answer: true },
			{ title: 'SQL 的 COUNT(*) 可统计行数。', answer: true },
			{ title: '数据库的唯一索引可以有多个。', answer: true },
			{ title: 'SQL 的 HAVING 子句用于分组后过滤。', answer: true }
		],
		text: [
			{ title: '简述数据库索引的作用及类型。' },
			{ title: '请描述 SQL 注入的原理及防御措施。' },
			{ title: '简述事务的四大特性（ACID）。' },
			{ title: '请描述范式的概念及常见类型。' },
			{ title: '谈谈你对 NoSQL 的理解。' }
		],
		code: [
			{ title: '写一条 SQL 查询语句，查询 age 大于 30 的用户。' },
			{ title: '写一条 SQL 语句，统计每个部门的员工数量。' },
			{ title: '写一条 SQL 语句，删除重复数据。' },
			{ title: '写一条 SQL 语句，查询所有订单总金额。' },
			{ title: '写一条 SQL 语句，更新用户邮箱。' }
		]
	}
];

function generateRealPaper(paper: any): ExamPaper {
	let id = paper.id;
	let qid = id * 100;
	const single: Question[] = paper.single.map((q: any, i: number) => ({
		id: qid + i + 1,
		title: q.title,
		options: q.options,
		type: 'single',
		answer: q.answer
	}));
	const judge: Question[] = paper.judge.map((q: any, i: number) => ({
		id: qid + 20 + i + 1,
		title: q.title,
		options: ['正确', '错误'],
		type: 'judge',
		answer: q.answer
	}));
	const text: Question[] = paper.text.map((q: any, i: number) => ({
		id: qid + 40 + i + 1,
		title: q.title,
		type: 'text',
		answer: ''
	}));
	const code: Question[] = paper.code.map((q: any, i: number) => ({
		id: qid + 50 + i + 1,
		title: q.title,
		type: 'code',
		answer: ''
	}));
	return {
		id,
		name: paper.name,
		questions: [...single, ...judge, ...text, ...code]
	};
}

export const mockPapers: ExamPaper[] = realPapers.map(generateRealPaper);

// 用户答题记录 mock
let userRecords: any[] = [];

export function fetchQuestions() {
	return Promise.resolve({ data: mockQuestions });
}

export function submitAnswer(data: any) {
	const now = new Date().toLocaleString();
	const record = {
		id: userRecords.length + 1,
		questionId: data.questionId,
		userId: 1,
		answer: data.answer,
		submitTime: now
	};
	// 覆盖同一题目的记录
	userRecords = userRecords.filter(r => r.questionId !== data.questionId);
	userRecords.push(record);
	return Promise.resolve({ data: record });
}

export function fetchUserAnswer(questionId: number) {
	const record = userRecords.find(r => r.questionId === questionId);
	return Promise.resolve({ data: record });
}

// 获取随机试卷
export function fetchExamPaper(id?: number) {
	// 如果传 id，返回指定测评推荐的题库，否则随机
	if (id) {
		const found = mockPapers.find(p => p.id === id);
		if (found) return Promise.resolve({ data: found });
	}
	const idx = Math.floor(Math.random() * mockPapers.length);
	return Promise.resolve({ data: mockPapers[idx] });
}

// 获取全部试卷（如需预览）
export function fetchAllPapers() {
	return Promise.resolve({ data: mockPapers });
}

export function generateCustomPaper({ subject, difficulty, count }) {
	// 1. 找到对应模块（如 subject: '算法'）
	const paper = realPapers.find(p => p.name.includes(subject));
	if (!paper) return null;
	// 2. 合并所有题型
	let allQuestions = [
		...(paper.single || []),
		...(paper.judge || []),
		...(paper.text || []),
		...(paper.code || [])
	];
	// 3. 难度筛选（如有难度字段可加，这里暂略）
	// 4. 随机抽取 count 道题
	allQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, Number(count));
	// 5. 组装成 ExamPaper，修复题型
	return {
		id: Date.now(),
		name: `${subject}个性化试卷`,
		questions: allQuestions.map((q, i) => {
			let type = q.type;
			if (!type) {
				if (
					q.options &&
					q.options.length === 2 &&
					q.options.includes('正确') &&
					q.options.includes('错误')
				) {
					type = 'judge';
				} else if (q.options) {
					type = 'single';
				} else if (q.title && q.title.includes('代码')) {
					type = 'code';
				} else {
					type = 'text';
				}
			}
			return {
				...q,
				id: 1000 + i + 1,
				type
			};
		})
	};
}
