export default [
	{
		id: 1,
		title: '什么是闭包？',
		tags: ['JavaScript', '闭包'],
		difficulty: '初级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: '闭包是指有权访问另一个函数作用域中变量的函数。',
		explanation:
			'闭包的本质是函数和其词法作用域的组合。常见于函数嵌套、返回函数、回调等场景。闭包可以保持对外部变量的引用，常用于数据私有化、工厂函数等。'
	},
	{
		id: 2,
		title: '原型和原型链的区别？',
		tags: ['JavaScript', '原型链'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution:
			'原型是对象的一个属性（__proto__），指向其构造函数的 prototype；原型链是对象通过原型逐级向上查找属性的链式结构。',
		explanation:
			'每个对象都有原型，原型也是对象。对象查找属性时会沿原型链查找，直到 Object.prototype 或 null。原型链实现了 JS 的继承机制。'
	},
	{
		id: 3,
		title: '事件委托是什么？',
		tags: ['事件委托', 'DOM'],
		difficulty: '初级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: '事件委托是利用事件冒泡，将子元素的事件处理委托给父元素。',
		explanation:
			'通过在父元素上绑定事件监听器，利用事件冒泡机制，统一处理多个子元素的事件。优点：减少事件绑定数量，适用于动态生成的元素。'
	},
	{
		id: 4,
		title: '什么是防抖和节流？',
		tags: ['防抖', '节流'],
		difficulty: '中级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution: '防抖：事件触发后 n 秒内只执行最后一次。节流：规定时间内只执行一次。',
		explanation:
			'防抖适合输入框实时搜索等场景，节流适合滚动、resize 等高频事件。实现方式通常用 setTimeout（防抖）和时间戳/定时器（节流）。'
	},
	{
		id: 5,
		title: 'HTTP 和 HTTPS 的区别？',
		tags: ['HTTP', 'HTTPS'],
		difficulty: '初级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: 'HTTP 明文传输，端口 80；HTTPS 加密传输，端口 443，基于 SSL/TLS。',
		explanation:
			'HTTPS 能防止中间人攻击和数据窃取，保障数据安全。HTTPS 需证书，性能略低于 HTTP。'
	},
	{
		id: 6,
		title: '什么是同源策略？',
		tags: ['同源策略', '安全'],
		difficulty: '中级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'同源策略（Same-Origin Policy）是一种安全机制，用于限制一个源（Origin）的文档或脚本如何与另一个源的资源进行交互。',
		explanation:
			'同源策略要求发送请求的源（协议、域名、端口）必须与接收请求的源完全相同。不同源之间的交互（如 DOM 操作、AJAX 请求）受到限制，以防止跨站脚本攻击（XSS）和跨站请求伪造（CSRF）。'
	},
	{
		id: 7,
		title: '跨域的解决方案有哪些？',
		tags: ['跨域', 'CORS'],
		difficulty: '中级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution: '跨域解决方案包括 JSONP、CORS、代理服务器、postMessage 等。',
		explanation:
			'JSONP 通过动态创建 script 标签实现跨域，CORS 通过服务器设置 Access-Control-Allow-Origin 实现，代理服务器转发请求，postMessage 用于不同窗口间的通信。'
	},
	{
		id: 8,
		title: 'Promise 的基本用法？',
		tags: ['Promise', '异步'],
		difficulty: '初级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'Promise 是一个对象，表示异步操作的最终完成（或失败）及其结果值。',
		explanation:
			'Promise 有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）。通过 .then() 处理成功，.catch() 处理失败。'
	},
	{
		id: 9,
		title: 'async/await 的原理？',
		tags: ['async', 'await'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'async/await 是基于 Promise 的语法糖，用于更优雅地处理异步操作。',
		explanation:
			'async 函数返回一个 Promise，await 可以暂停 async 函数的执行，等待 Promise 解决或拒绝。它使得异步代码看起来像同步，提高了代码的可读性和可维护性。'
	},
	{
		id: 10,
		title: '什么是事件循环？',
		tags: ['事件循环', 'JavaScript'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution:
			'事件循环（Event Loop）是 JavaScript 的执行模型，用于管理异步操作和回调函数的执行顺序。',
		explanation:
			'它包括宏任务（Macrotasks）和微任务（Microtasks）。宏任务通常来自 I/O 操作、定时器、事件监听器等，微任务通常来自 Promise 回调、MutationObserver 等。'
	},
	{
		id: 11,
		title: '浏览器渲染流程？',
		tags: ['浏览器', '渲染'],
		difficulty: '中级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution: '浏览器渲染流程包括解析 HTML、构建 DOM 树、样式计算、布局、绘制、合成等步骤。',
		explanation:
			'解析 HTML 生成 DOM 树，CSS 解析生成 CSSOM 树，两者结合生成 Render Tree，进行布局计算，绘制到屏幕上。'
	},
	{
		id: 12,
		title: 'CSS 选择器优先级？',
		tags: ['CSS', '选择器'],
		difficulty: '初级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution:
			'CSS 选择器优先级从高到低：!important > 行内样式 > ID 选择器 > 类选择器 > 标签选择器 > 通配符选择器。',
		explanation:
			'优先级高的选择器会覆盖优先级低的选择器。!important 具有最高优先级，行内样式优先级高于 ID 选择器，ID 选择器优先级高于类选择器，类选择器优先级高于标签选择器，标签选择器优先级高于通配符选择器。'
	},
	{
		id: 13,
		title: 'flex 布局的常用属性？',
		tags: ['CSS', 'flex'],
		difficulty: '初级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'flex 布局的常用属性包括：display: flex;、flex-direction: row/column;、justify-content: flex-start/center/end;、align-items: flex-start/center/end;、flex-wrap: wrap/nowrap;、align-content: flex-start/center/end/stretch/space-around/space-between。',
		explanation: 'flex 布局可以实现灵活的布局，通过主轴和交叉轴的排列方式控制元素的位置和大小。'
	},
	{
		id: 14,
		title: '盒模型有哪些？',
		tags: ['CSS', '盒模型'],
		difficulty: '初级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution:
			'盒模型包括：content（内容）、padding（内边距）、border（边框）、margin（外边距）。',
		explanation:
			'盒模型是 CSS 布局的基础，每个元素都被视为一个矩形盒子，包含内容、内边距、边框和外边距。'
	},
	{
		id: 15,
		title: 'BFC（块级格式化上下文）是什么？',
		tags: ['CSS', 'BFC'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'BFC（Block Formatting Context）是一个独立的渲染区域，具有一定的布局规则。',
		explanation:
			'BFC 是一个独立的渲染区域，它决定了块级元素如何布局，以及与浮动元素的关系。创建 BFC 的方法包括：float 不为 none、position 不为 static 或 relative、overflow 不为 visible、display 为 table-cell、table-caption、inline-block、flex、grid 或 inline-flex。'
	},
	{
		id: 16,
		title: '如何实现垂直居中？',
		tags: ['CSS', '居中'],
		difficulty: '初级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution:
			'实现垂直居中的方法包括：使用 flexbox、使用 grid、使用绝对定位 + transform、使用绝对定位 + margin-top 等。',
		explanation:
			'flexbox 和 grid 布局提供了更简单和更可靠的垂直居中方法。绝对定位 + transform 和绝对定位 + margin-top 是传统方法，但需要精确计算。'
	},
	{
		id: 17,
		title: 'localStorage 和 sessionStorage 区别？',
		tags: ['存储', 'Web'],
		difficulty: '初级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution:
			'localStorage 和 sessionStorage 都是 Web Storage API 的一部分，用于在浏览器中存储数据。',
		explanation:
			'localStorage 数据存储在浏览器中，除非用户手动清除，否则会一直存在。sessionStorage 数据仅在当前会话（浏览器窗口）中有效，关闭窗口后自动清除。localStorage 容量通常更大，sessionStorage 更适合临时数据。'
	},
	{
		id: 18,
		title: '什么是虚拟 DOM？',
		tags: ['虚拟DOM'],
		difficulty: '中级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution: '虚拟 DOM（Virtual DOM）是真实 DOM 的轻量级副本，用于优化 DOM 操作。',
		explanation:
			'虚拟 DOM 通过 JS 对象模拟 DOM 结构，在内存中进行操作，最后批量更新真实 DOM。它减少了直接操作 DOM 的频率，提高了性能。'
	},
	{
		id: 19,
		title: '前端性能优化有哪些？',
		tags: ['性能优化'],
		difficulty: '中级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'前端性能优化包括：减少 HTTP 请求、压缩资源、使用缓存、优化 CSS 选择器、避免布局抖动、优化图片、使用 Web Workers 等。',
		explanation:
			'减少 HTTP 请求和压缩资源可以减少加载时间。使用缓存可以避免重复下载。优化 CSS 选择器减少重排重绘。避免布局抖动，优化图片，使用 Web Workers 可以进行后台计算。'
	},
	{
		id: 20,
		title: '什么是懒加载和预加载？',
		tags: ['懒加载', '预加载'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution:
			'懒加载（Lazy Loading）：在需要时加载资源，如图片、视频等。预加载（Preloading）：提前加载资源，如提前加载图片、视频等。',
		explanation: '懒加载可以减少初始加载时间，预加载可以提高用户体验，但会增加初始加载时间。'
	},
	{
		id: 21,
		title: '前端路由的实现原理？',
		tags: ['路由', 'SPA'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: '前端路由的实现原理是基于 URL 的变化，通过监听 URL 的变化来控制组件的渲染。',
		explanation:
			'通常使用 HashRouter 或 BrowserRouter，通过监听 hashchange 或 popstate 事件来触发路由变化，从而加载对应的组件。'
	},
	{
		id: 22,
		title: '什么是 Service Worker？',
		tags: ['Service Worker', 'PWA'],
		difficulty: '高级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution:
			'Service Worker 是一个独立的线程，用于在后台执行任务，如缓存资源、拦截网络请求等。',
		explanation:
			'Service Worker 可以拦截网络请求，缓存资源，提供离线支持，并可以控制推送通知。它运行在浏览器后台，不受页面刷新影响，可以处理复杂的异步操作。'
	},
	{
		id: 23,
		title: 'WebSocket 的应用场景？',
		tags: ['WebSocket'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: 'WebSocket 用于在客户端和服务器之间建立持久连接，实现实时通信。',
		explanation:
			'WebSocket 可以用于实时聊天、在线游戏、股票行情、即时通讯等场景。它比 HTTP 更高效，支持双向通信，适合需要实时交互的场景。'
	},
	{
		id: 24,
		title: '前端安全常见问题有哪些？',
		tags: ['安全', 'XSS', 'CSRF'],
		difficulty: '高级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'前端安全常见问题包括 XSS（跨站脚本攻击）、CSRF（跨站请求伪造）、SQL 注入、点击劫持等。',
		explanation:
			'XSS 攻击通过注入恶意脚本窃取用户信息，CSRF 攻击通过伪造用户请求进行攻击，SQL 注入通过在数据库查询中注入恶意代码，点击劫持通过诱导用户点击隐藏元素。'
	},
	{
		id: 25,
		title: '如何防止 XSS 攻击？',
		tags: ['XSS', '安全'],
		difficulty: '高级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution:
			'防止 XSS 攻击的方法包括：对用户输入进行编码、使用 Content-Security-Policy（CSP）、使用 HttpOnly 和 Secure Cookie、避免使用 eval() 和 new Function()。',
		explanation:
			'对用户输入进行编码可以防止直接执行恶意脚本。CSP 可以限制资源加载，避免执行内联脚本。HttpOnly 和 Secure Cookie 可以防止 XSS 攻击。避免使用 eval() 和 new Function() 可以防止代码注入。'
	},
	{
		id: 26,
		title: '如何防止 CSRF 攻击？',
		tags: ['CSRF', '安全'],
		difficulty: '高级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution:
			'防止 CSRF 攻击的方法包括：使用 Anti-CSRF Token、验证来源（Referer）、使用 SameSite Cookie、限制请求方法等。',
		explanation:
			'Anti-CSRF Token 是一种随机生成的令牌，用于验证请求的来源。验证来源（Referer）可以检查请求是否来自可信来源。SameSite Cookie 可以限制 Cookie 的跨站访问。限制请求方法可以防止 CSRF 攻击。'
	},
	{
		id: 27,
		title: '前端模块化方案有哪些？',
		tags: ['模块化', 'ES6'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: '前端模块化方案包括：CommonJS、AMD、UMD、ES Modules、System.js 等。',
		explanation:
			'CommonJS 是 Node.js 的模块化方案，AMD 和 UMD 是浏览器端的模块化方案，ES Modules 是原生支持的模块化方案，System.js 是一个兼容性更好的模块化方案。'
	},
	{
		id: 28,
		title: '什么是 Tree Shaking？',
		tags: ['Tree Shaking', '打包'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'Tree Shaking 是一种优化技术，用于移除未使用的代码。',
		explanation:
			'Tree Shaking 通过静态分析代码，找出未被引用的导出（export），并将其从最终打包的文件中移除。它可以帮助减少打包文件的大小，提高应用性能。'
	},
	{
		id: 29,
		title: '前端常见的打包工具有哪些？',
		tags: ['打包工具', 'Webpack'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: '前端常见的打包工具有：Webpack、Rollup、Parcel、Vite 等。',
		explanation:
			'Webpack 是最流行的打包工具，支持模块化、代码分割、热更新等。Rollup 专注于库的打包，Parcel 快速打包，Vite 提供更快的开发体验。'
	},
	{
		id: 30,
		title: 'Webpack 的核心原理？',
		tags: ['Webpack'],
		difficulty: '高级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'Webpack 的核心原理是基于入口文件，通过 Loader 和 Plugin 处理资源，最终生成一个或多个打包文件。',
		explanation:
			'Webpack 通过 Entry 指定入口文件，通过 Loader 处理各种类型的资源（如 JS、CSS、图片），通过 Plugin 扩展功能（如压缩、优化、代码分割），最后通过 Chunk 和 Bundle 生成打包文件。'
	},
	{
		id: 31,
		title: '如何实现图片懒加载？',
		tags: ['图片懒加载'],
		difficulty: '中级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution:
			'实现图片懒加载的方法包括：IntersectionObserver API、监听 scroll 事件、使用预加载等。',
		explanation:
			'IntersectionObserver API 可以更精确地控制图片加载时机，监听 scroll 事件可以实现简单的懒加载，预加载可以提前加载图片，提高用户体验。'
	},
	{
		id: 32,
		title: '前端如何实现权限控制？',
		tags: ['权限控制'],
		difficulty: '高级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: '前端权限控制通常通过 Token 认证、角色权限、按钮权限等方式实现。',
		explanation:
			'Token 认证通过在请求头中携带 Token 验证用户身份，角色权限根据用户角色控制页面或功能的访问，按钮权限根据用户权限控制按钮的显示或点击。'
	},
	{
		id: 33,
		title: '什么是 SSR？',
		tags: ['SSR', '服务端渲染'],
		difficulty: '高级',
		author: '李华',
		addedTime: '2025-07-20',
		solution:
			'SSR（Server-Side Rendering）是指在服务器端渲染完整的 HTML 页面，然后发送到客户端。',
		explanation:
			'SSR 可以提高首屏加载速度，有利于 SEO，但会增加服务器负载。它需要服务器端有完整的渲染逻辑，并生成完整的 HTML 字符串。'
	},
	{
		id: 34,
		title: 'SEO 优化的常见方法？',
		tags: ['SEO'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution:
			'SEO 优化的常见方法包括：关键词优化、标题优化、描述优化、内部链接优化、外部链接优化、图片优化、移动端适配等。',
		explanation:
			'关键词优化通过在内容中合理使用目标关键词，提高页面在搜索引擎中的排名。标题和描述优化可以提高点击率。内部链接优化可以提高页面权重，外部链接优化可以提高网站权威性。图片优化可以提高加载速度，移动端适配可以提高移动端用户体验。'
	},
	{
		id: 35,
		title: '如何实现前端国际化？',
		tags: ['国际化', 'i18n'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: '实现前端国际化通常包括：定义语言包、使用 i18n 库、动态切换语言等。',
		explanation:
			'定义语言包，将所有需要翻译的文本放在语言包中。使用 i18n 库，如 i18next、react-i18next 等，加载语言包并进行文本替换。动态切换语言，根据用户选择或请求切换语言包。'
	},
	{
		id: 36,
		title: '前端如何处理大文件上传？',
		tags: ['大文件上传'],
		difficulty: '高级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'前端处理大文件上传的方法包括：分片上传、断点续传、使用 Web Workers 进行文件处理等。',
		explanation:
			'分片上传将大文件分割成小片，逐个上传，提高上传速度。断点续传可以避免重复上传，提高用户体验。使用 Web Workers 可以进行文件处理，提高性能。'
	},
	{
		id: 37,
		title: '如何实现前端断点续传？',
		tags: ['断点续传'],
		difficulty: '高级',
		author: '前端团队',
		addedTime: '2025-07-20',
		solution: '实现前端断点续传的方法包括：使用 File API、使用分片上传、使用断点续传库等。',
		explanation:
			'使用 File API 可以获取文件信息，如文件大小、最后修改时间等。使用分片上传可以实现断点续传，断点续传库如 resumer.js、UpChunk 等提供了完整的解决方案。'
	},
	{
		id: 38,
		title: '前端如何实现长列表优化？',
		tags: ['长列表', '虚拟滚动'],
		difficulty: '高级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: '实现长列表优化的方法包括：虚拟滚动、分页加载、懒加载等。',
		explanation:
			'虚拟滚动只渲染屏幕上可见的列表项，减少 DOM 节点数量，提高性能。分页加载可以减少一次性加载的数据量，提高首屏加载速度。懒加载可以实现图片、视频等资源的延迟加载。'
	},
	{
		id: 39,
		title: '什么是 PWA？',
		tags: ['PWA'],
		difficulty: '高级',
		author: '李华',
		addedTime: '2025-07-20',
		solution:
			'PWA（Progressive Web App）是一种渐进式增强的 Web 应用，结合了 Web 和 Native App 的优势。',
		explanation:
			'PWA 可以提供离线访问、推送通知、快速加载等特性。它通过 Service Worker 缓存资源，通过 HTTPS 加密通信，通过 Manifest 定义应用图标和启动行为。'
	},
	{
		id: 40,
		title: '前端如何实现数据可视化？',
		tags: ['数据可视化', 'Echarts'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution:
			'前端实现数据可视化的方法包括：使用 Echarts、D3.js、Chart.js 等图表库，结合 CSS 进行样式定制。',
		explanation:
			'Echarts 是一个功能强大的图表库，支持多种图表类型，如折线图、柱状图、饼图等。D3.js 是一个灵活的图表库，可以实现复杂的可视化效果。Chart.js 是一个轻量级的图表库，适合快速开发。'
	},
	{
		id: 41,
		title: '前端如何实现拖拽功能？',
		tags: ['拖拽'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution:
			'实现拖拽功能的方法包括：使用原生拖拽事件（drag and drop）、使用第三方库（如 interact.js）、使用 CSS transform 和 transition。',
		explanation:
			'原生拖拽事件（drag and drop）提供了最基本的拖拽功能，第三方库（如 interact.js）提供了更丰富的功能和更好的兼容性。CSS transform 和 transition 可以实现平滑的拖拽效果。'
	},
	{
		id: 42,
		title: '前端如何实现富文本编辑器？',
		tags: ['富文本编辑器'],
		difficulty: '高级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution:
			'实现富文本编辑器的方法包括：使用 Quill、TinyMCE、CKEditor 等富文本编辑器库，结合 CSS 进行样式定制。',
		explanation:
			'Quill 是一个轻量级的富文本编辑器，TinyMCE 和 CKEditor 是功能更强大的富文本编辑器，提供了丰富的功能和插件。'
	}
];
