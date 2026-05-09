export const MOCK_QUESTIONS = [
	{
		id: 1,
		title: '实现一个防抖函数',
		content:
			'请实现一个防抖函数，该函数会在延迟一定时间后才执行回调，如果在延迟时间内再次调用，则重新计时。',
		difficulty: 3,
		tags: ['JavaScript', '函数式编程', '性能优化'],
		company: '字节跳动',
		updateDate: '2025-04-10',
		codeExample: `function debounce(fn, delay) {\n  let timer = null;\n  return function(...args) {\n    if(timer) clearTimeout(timer);\n    timer = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  }\n}`
	},
	{
		id: 2,
		title: '手写Promise.all实现',
		content:
			'实现一个Promise.all函数，接收一个Promise数组，当所有Promise都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '异步编程'],
		company: '阿里巴巴',
		updateDate: '2025-03-15',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 3,
		title: '实现二分查找',
		content: '请实现一个二分查找算法，要求时间复杂度为 O(log n)。',
		difficulty: 2,
		tags: ['算法', '查找'],
		company: '腾讯',
		updateDate: '2025-04-12',
		codeExample: `function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`
	},
	{
		id: 4,
		title: '实现 LRU 缓存',
		content: '请实现一个 LRU 缓存结构，支持 get 和 put 操作，要求时间复杂度为 O(1)。',
		difficulty: 4,
		tags: ['算法', '缓存', '数据结构'],
		company: '美团',
		updateDate: '2025-04-13',
		codeExample: `class LRUCache {\n  constructor(capacity) {\n    this.cache = new Map();\n    this.capacity = capacity;\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}`
	},
	{
		id: 5,
		title: '反转链表',
		content: '给定一个单链表的头节点 head，请反转链表，并返回反转后的头节点。',
		difficulty: 2,
		tags: ['链表', '算法'],
		company: '百度',
		updateDate: '2025-04-14',
		codeExample: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`
	},
	{
		id: 6,
		title: '数组去重',
		content: '实现一个函数，去除数组中的重复元素，返回新数组。',
		difficulty: 1,
		tags: ['JavaScript', '数组'],
		company: '网易',
		updateDate: '2025-04-15',
		codeExample: `function unique(arr) {\n  return [...new Set(arr)];\n}`
	},
	{
		id: 7,
		title: '斐波那契数列',
		content: '写一个函数，返回第 n 个斐波那契数。',
		difficulty: 1,
		tags: ['算法', '递归'],
		company: '华为',
		updateDate: '2025-04-16',
		codeExample: `function fib(n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}`
	},
	{
		id: 8,
		title: '深拷贝',
		content: '实现一个深拷贝函数，能正确处理对象、数组、循环引用等。',
		difficulty: 3,
		tags: ['JavaScript', '对象', '手写题'],
		company: '腾讯',
		updateDate: '2025-04-17',
		codeExample: `function deepClone(obj, map = new WeakMap()) {\n  if (typeof obj !== 'object' || obj === null) return obj;\n  if (map.has(obj)) return map.get(obj);\n  const clone = Array.isArray(obj) ? [] : {};\n  map.set(obj, clone);\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key], map);\n    }\n  }\n  return clone;\n}`
	},
	{
		id: 9,
		title: '数组扁平化',
		content: '实现一个函数，将多维数组扁平化为一维数组。',
		difficulty: 2,
		tags: ['JavaScript', '数组'],
		company: '字节跳动',
		updateDate: '2025-04-18',
		codeExample: `function flatten(arr) {\n  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);\n}`
	},
	{
		id: 10,
		title: '节流函数',
		content: '实现一个节流函数 throttle。',
		difficulty: 2,
		tags: ['JavaScript', '函数式编程'],
		company: '美团',
		updateDate: '2025-04-19',
		codeExample: `function throttle(fn, delay) {\n  let last = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - last > delay) {\n      fn.apply(this, args);\n      last = now;\n    }\n  }\n}`
	},
	{
		id: 11,
		title: '实现 Promise',
		content: '手写一个简易版 Promise，支持 then。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-04-20',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 12,
		title: '快速排序',
		content: '实现快速排序算法。',
		difficulty: 3,
		tags: ['算法', '排序'],
		company: '百度',
		updateDate: '2025-04-21',
		codeExample: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return quickSort(left).concat(pivot, quickSort(right));\n}`
	},
	{
		id: 13,
		title: '防抖与节流区别',
		content: '简述防抖和节流的区别及应用场景。',
		difficulty: 1,
		tags: ['JavaScript', '面试题'],
		company: '网易',
		updateDate: '2025-04-22',
		codeExample: ''
	},
	{
		id: 14,
		title: '实现 EventEmitter',
		content: '手写一个 EventEmitter（发布订阅）类。',
		difficulty: 3,
		tags: ['JavaScript', '手写题', '设计模式'],
		company: '腾讯',
		updateDate: '2025-04-23',
		codeExample: `class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, fn) {\n    (this.events[event] = this.events[event] || []).push(fn);\n  }\n  emit(event, ...args) {\n    (this.events[event] || []).forEach(fn => fn(...args));\n  }\n  off(event, fn) {\n    this.events[event] = (this.events[event] || []).filter(f => f !== fn);\n  }\n}`
	},
	{
		id: 15,
		title: '二叉树最大深度',
		content: '给定一棵二叉树，返回其最大深度。',
		difficulty: 2,
		tags: ['算法', '二叉树'],
		company: '字节跳动',
		updateDate: '2025-04-24',
		codeExample: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`
	},
	{
		id: 16,
		title: '数组乱序',
		content: '实现一个函数，打乱数组顺序（洗牌算法）。',
		difficulty: 2,
		tags: ['JavaScript', '算法'],
		company: '美团',
		updateDate: '2025-04-25',
		codeExample: `function shuffle(arr) {\n  for (let i = arr.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [arr[i], arr[j]] = [arr[j], arr[i]];\n  }\n  return arr;\n}`
	},
	{
		id: 17,
		title: '实现 call/apply/bind',
		content: '手写 call、apply、bind 的实现。',
		difficulty: 3,
		tags: ['JavaScript', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-04-26',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 18,
		title: '最长不重复子串',
		content: '给定一个字符串，返回最长不含重复字符的子串长度。',
		difficulty: 3,
		tags: ['算法', '字符串'],
		company: '百度',
		updateDate: '2025-04-27',
		codeExample: `function lengthOfLongestSubstring(s) {\n  let map = new Map(), max = 0, start = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (map.has(s[i])) start = Math.max(map.get(s[i]) + 1, start);\n    map.set(s[i], i);\n    max = Math.max(max, i - start + 1);\n  }\n  return max;\n}`
	},
	{
		id: 19,
		title: 'Vue 响应式原理',
		content: '简述 Vue2/Vue3 响应式原理的区别。',
		difficulty: 2,
		tags: ['Vue', '原理'],
		company: '字节跳动',
		updateDate: '2025-04-28',
		codeExample: ''
	},
	{
		id: 20,
		title: '虚拟 DOM',
		content: '什么是虚拟 DOM？它的优缺点是什么？',
		difficulty: 1,
		tags: ['Vue', 'React', '原理'],
		company: '腾讯',
		updateDate: '2025-04-29',
		codeExample: ''
	},
	{
		id: 21,
		title: '合并有序数组',
		content: '给定两个有序数组，将它们合并为一个新的有序数组。',
		difficulty: 2,
		tags: ['算法', '数组'],
		company: '百度',
		updateDate: '2025-04-30',
		codeExample: `function mergeSorted(arr1, arr2) {\n  let i = 0, j = 0, res = [];\n  while (i < arr1.length && j < arr2.length) {\n    if (arr1[i] < arr2[j]) res.push(arr1[i++]);\n    else res.push(arr2[j++]);\n  }\n  return res.concat(arr1.slice(i)).concat(arr2.slice(j));\n}`
	},
	{
		id: 22,
		title: '判断回文字符串',
		content: '实现一个函数，判断字符串是否为回文。',
		difficulty: 1,
		tags: ['算法', '字符串'],
		company: '腾讯',
		updateDate: '2025-05-01',
		codeExample: `function isPalindrome(s) {\n  return s === s.split('').reverse().join('');\n}`
	},
	{
		id: 23,
		title: '斐波那契（迭代）',
		content: '用迭代方式实现斐波那契数列。',
		difficulty: 1,
		tags: ['算法', '迭代'],
		company: '美团',
		updateDate: '2025-05-02',
		codeExample: `function fib(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return a;\n}`
	},
	{
		id: 24,
		title: '数组最大子序和',
		content: '给定一个整数数组，找出和最大的连续子数组。',
		difficulty: 3,
		tags: ['算法', '数组'],
		company: '字节跳动',
		updateDate: '2025-05-03',
		codeExample: `function maxSubArray(nums) {\n  let max = nums[0], sum = 0;\n  for (let num of nums) {\n    sum = Math.max(sum + num, num);\n    max = Math.max(max, sum);\n  }\n  return max;\n}`
	},
	{
		id: 25,
		title: '链表环检测',
		content: '判断链表中是否有环。',
		difficulty: 3,
		tags: ['链表', '算法'],
		company: '阿里巴巴',
		updateDate: '2025-05-04',
		codeExample: `function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`
	},
	{
		id: 26,
		title: 'Vue 生命周期',
		content: '简述 Vue2 和 Vue3 的生命周期钩子。',
		difficulty: 2,
		tags: ['Vue', '原理'],
		company: '腾讯',
		updateDate: '2025-05-05',
		codeExample: ''
	},
	{
		id: 27,
		title: 'React setState 原理',
		content: '简述 React setState 的原理和批量更新机制。',
		difficulty: 3,
		tags: ['React', '原理'],
		company: '字节跳动',
		updateDate: '2025-05-06',
		codeExample: ''
	},
	{
		id: 28,
		title: '手写 JSON.stringify',
		content: '实现一个简易版 JSON.stringify。',
		difficulty: 4,
		tags: ['JavaScript', '手写题'],
		company: '百度',
		updateDate: '2025-05-07',
		codeExample: `function jsonStringify(obj) {\n  if (obj === null) return 'null';\n  if (typeof obj === 'string') return '"' + obj + '"';\n  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);\n  if (Array.isArray(obj)) return '[' + obj.map(jsonStringify).join(',') + ']';\n  if (typeof obj === 'object') {\n    return '{' + Object.keys(obj).map(key => '"' + key + '":' + jsonStringify(obj[key])).join(',') + '}';\n  }\n}`
	},
	{
		id: 29,
		title: 'JS 类型判断',
		content: '实现一个函数，准确判断各种 JS 数据类型。',
		difficulty: 2,
		tags: ['JavaScript', '类型判断'],
		company: '美团',
		updateDate: '2025-05-08',
		codeExample: `function getType(val) {\n  return Object.prototype.toString.call(val).slice(8, -1);\n}`
	},
	{
		id: 30,
		title: '手写 new 操作符',
		content: '实现一个 new 操作符的简易版。',
		difficulty: 3,
		tags: ['JavaScript', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-05-09',
		codeExample: `function myNew(fn, ...args) {\n  const obj = Object.create(fn.prototype);\n  const res = fn.apply(obj, args);\n  return typeof res === 'object' && res !== null ? res : obj;\n}`
	},
	{
		id: 31,
		title: '实现 Promise.race',
		content:
			'实现一个 Promise.race 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-05-10',
		codeExample: `function promiseRace(promises) {\n  return new Promise((resolve, reject) => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reject);\n    });\n  });\n}`
	},
	{
		id: 32,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-05-11',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 33,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-05-12',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 34,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-05-13',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 35,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-05-14',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 36,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-05-15',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 37,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-05-16',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 38,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-05-17',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 39,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-05-18',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 40,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-05-19',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 41,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-05-20',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 42,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-05-21',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 43,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-05-22',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 44,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-05-23',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 45,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-05-24',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 46,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-05-25',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 47,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-05-26',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 48,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-05-27',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 49,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-05-28',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 50,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-05-29',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 51,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-05-30',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 52,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-05-31',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 53,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-06-01',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 54,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-06-02',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 55,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-06-03',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 56,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-06-04',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 57,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-06-05',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 58,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-06-06',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 59,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-06-07',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 60,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-06-08',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 61,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-06-09',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 62,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-06-10',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 63,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-06-11',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 64,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-06-12',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 65,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-06-13',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 66,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-06-14',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 67,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-06-15',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 68,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-06-16',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 69,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-06-17',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 70,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-06-18',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 71,
		title: '二分查找递归实现',
		content: '用递归方式实现二分查找。',
		difficulty: 2,
		tags: ['算法', '查找'],
		company: '腾讯',
		updateDate: '2025-06-19',
		codeExample: `function binarySearch(arr, target, left = 0, right = arr.length - 1) {\n  if (left > right) return -1;\n  const mid = Math.floor((left + right) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);\n  return binarySearch(arr, target, left, mid - 1);\n}`
	},
	{
		id: 72,
		title: '冒泡排序',
		content: '实现冒泡排序算法。',
		difficulty: 1,
		tags: ['算法', '排序'],
		company: '百度',
		updateDate: '2025-06-20',
		codeExample: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    for (let j = 0; j < arr.length - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n    }\n  }\n  return arr;\n}`
	},
	{
		id: 73,
		title: '选择排序',
		content: '实现选择排序算法。',
		difficulty: 1,
		tags: ['算法', '排序'],
		company: '美团',
		updateDate: '2025-06-21',
		codeExample: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}`
	},
	{
		id: 74,
		title: '插入排序',
		content: '实现插入排序算法。',
		difficulty: 1,
		tags: ['算法', '排序'],
		company: '阿里巴巴',
		updateDate: '2025-06-22',
		codeExample: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`
	},
	{
		id: 75,
		title: '归并排序',
		content: '实现归并排序算法。',
		difficulty: 2,
		tags: ['算法', '排序'],
		company: '字节跳动',
		updateDate: '2025-06-23',
		codeExample: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  let res = [], i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) res.push(left[i++]);\n    else res.push(right[j++]);\n  }\n  return res.concat(left.slice(i)).concat(right.slice(j));\n}`
	},
	{
		id: 76,
		title: '堆排序',
		content: '实现堆排序算法。',
		difficulty: 3,
		tags: ['算法', '排序'],
		company: '腾讯',
		updateDate: '2025-06-24',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 77,
		title: '计数排序',
		content: '实现计数排序算法。',
		difficulty: 3,
		tags: ['算法', '排序'],
		company: '百度',
		updateDate: '2025-06-25',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 78,
		title: '桶排序',
		content: '实现桶排序算法。',
		difficulty: 3,
		tags: ['算法', '排序'],
		company: '美团',
		updateDate: '2025-06-26',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 79,
		title: '基数排序',
		content: '实现基数排序算法。',
		difficulty: 3,
		tags: ['算法', '排序'],
		company: '阿里巴巴',
		updateDate: '2025-06-27',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 80,
		title: 'LRU 缓存（Map实现）',
		content: '用 Map 实现 LRU 缓存。',
		difficulty: 4,
		tags: ['算法', '缓存'],
		company: '字节跳动',
		updateDate: '2025-06-28',
		codeExample: `class LRUCache {\n  constructor(capacity) {\n    this.cache = new Map();\n    this.capacity = capacity;\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}`
	},
	{
		id: 81,
		title: '实现 EventEmitter',
		content: '手写一个 EventEmitter（发布订阅）类。',
		difficulty: 3,
		tags: ['JavaScript', '手写题', '设计模式'],
		company: '腾讯',
		updateDate: '2025-06-29',
		codeExample: `class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, fn) {\n    (this.events[event] = this.events[event] || []).push(fn);\n  }\n  emit(event, ...args) {\n    (this.events[event] || []).forEach(fn => fn(...args));\n  }\n  off(event, fn) {\n    this.events[event] = (this.events[event] || []).filter(f => f !== fn);\n  }\n}`
	},
	{
		id: 82,
		title: '二叉树最大深度',
		content: '给定一棵二叉树，返回其最大深度。',
		difficulty: 2,
		tags: ['算法', '二叉树'],
		company: '字节跳动',
		updateDate: '2025-06-30',
		codeExample: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`
	},
	{
		id: 83,
		title: '数组乱序',
		content: '实现一个函数，打乱数组顺序（洗牌算法）。',
		difficulty: 2,
		tags: ['JavaScript', '算法'],
		company: '美团',
		updateDate: '2025-07-01',
		codeExample: `function shuffle(arr) {\n  for (let i = arr.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [arr[i], arr[j]] = [arr[j], arr[i]];\n  }\n  return arr;\n}`
	},
	{
		id: 84,
		title: '实现 call/apply/bind',
		content: '手写 call、apply、bind 的实现。',
		difficulty: 3,
		tags: ['JavaScript', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-07-02',
		codeExample: `// 省略实现，面试时需详细写出核心逻辑`
	},
	{
		id: 85,
		title: '最长不重复子串',
		content: '给定一个字符串，返回最长不含重复字符的子串长度。',
		difficulty: 3,
		tags: ['算法', '字符串'],
		company: '百度',
		updateDate: '2025-07-03',
		codeExample: `function lengthOfLongestSubstring(s) {\n  let map = new Map(), max = 0, start = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (map.has(s[i])) start = Math.max(map.get(s[i]) + 1, start);\n    map.set(s[i], i);\n    max = Math.max(max, i - start + 1);\n  }\n  return max;\n}`
	},
	{
		id: 86,
		title: 'Vue 响应式原理',
		content: '简述 Vue2/Vue3 响应式原理的区别。',
		difficulty: 2,
		tags: ['Vue', '原理'],
		company: '字节跳动',
		updateDate: '2025-07-04',
		codeExample: ''
	},
	{
		id: 87,
		title: '虚拟 DOM',
		content: '什么是虚拟 DOM？它的优缺点是什么？',
		difficulty: 1,
		tags: ['Vue', 'React', '原理'],
		company: '腾讯',
		updateDate: '2025-07-05',
		codeExample: ''
	},
	{
		id: 88,
		title: '合并有序数组',
		content: '给定两个有序数组，将它们合并为一个新的有序数组。',
		difficulty: 2,
		tags: ['算法', '数组'],
		company: '百度',
		updateDate: '2025-07-06',
		codeExample: `function mergeSorted(arr1, arr2) {\n  let i = 0, j = 0, res = [];\n  while (i < arr1.length && j < arr2.length) {\n    if (arr1[i] < arr2[j]) res.push(arr1[i++]);\n    else res.push(arr2[j++]);\n  }\n  return res.concat(arr1.slice(i)).concat(arr2.slice(j));\n}`
	},
	{
		id: 89,
		title: '判断回文字符串',
		content: '实现一个函数，判断字符串是否为回文。',
		difficulty: 1,
		tags: ['算法', '字符串'],
		company: '腾讯',
		updateDate: '2025-07-07',
		codeExample: `function isPalindrome(s) {\n  return s === s.split('').reverse().join('');\n}`
	},
	{
		id: 90,
		title: '斐波那契（迭代）',
		content: '用迭代方式实现斐波那契数列。',
		difficulty: 1,
		tags: ['算法', '迭代'],
		company: '美团',
		updateDate: '2025-07-08',
		codeExample: `function fib(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return a;\n}`
	},
	{
		id: 91,
		title: '数组最大子序和',
		content: '给定一个整数数组，找出和最大的连续子数组。',
		difficulty: 3,
		tags: ['算法', '数组'],
		company: '字节跳动',
		updateDate: '2025-07-09',
		codeExample: `function maxSubArray(nums) {\n  let max = nums[0], sum = 0;\n  for (let num of nums) {\n    sum = Math.max(sum + num, num);\n    max = Math.max(max, sum);\n  }\n  return max;\n}`
	},
	{
		id: 92,
		title: '链表环检测',
		content: '判断链表中是否有环。',
		difficulty: 3,
		tags: ['链表', '算法'],
		company: '阿里巴巴',
		updateDate: '2025-07-10',
		codeExample: `function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`
	},
	{
		id: 93,
		title: 'Vue 生命周期',
		content: '简述 Vue2 和 Vue3 的生命周期钩子。',
		difficulty: 2,
		tags: ['Vue', '原理'],
		company: '腾讯',
		updateDate: '2025-07-11',
		codeExample: ''
	},
	{
		id: 94,
		title: 'React setState 原理',
		content: '简述 React setState 的原理和批量更新机制。',
		difficulty: 3,
		tags: ['React', '原理'],
		company: '字节跳动',
		updateDate: '2025-07-12',
		codeExample: ''
	},
	{
		id: 95,
		title: '手写 JSON.stringify',
		content: '实现一个简易版 JSON.stringify。',
		difficulty: 4,
		tags: ['JavaScript', '手写题'],
		company: '百度',
		updateDate: '2025-07-13',
		codeExample: `function jsonStringify(obj) {\n  if (obj === null) return 'null';\n  if (typeof obj === 'string') return '"' + obj + '"';\n  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);\n  if (Array.isArray(obj)) return '[' + obj.map(jsonStringify).join(',') + ']';\n  if (typeof obj === 'object') {\n    return '{' + Object.keys(obj).map(key => '"' + key + '":' + jsonStringify(obj[key])).join(',') + '}';\n  }\n}`
	},
	{
		id: 96,
		title: 'JS 类型判断',
		content: '实现一个函数，准确判断各种 JS 数据类型。',
		difficulty: 2,
		tags: ['JavaScript', '类型判断'],
		company: '美团',
		updateDate: '2025-07-14',
		codeExample: `function getType(val) {\n  return Object.prototype.toString.call(val).slice(8, -1);\n}`
	},
	{
		id: 97,
		title: '手写 new 操作符',
		content: '实现一个 new 操作符的简易版。',
		difficulty: 3,
		tags: ['JavaScript', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-07-15',
		codeExample: `function myNew(fn, ...args) {\n  const obj = Object.create(fn.prototype);\n  const res = fn.apply(obj, args);\n  return typeof res === 'object' && res !== null ? res : obj;\n}`
	},
	{
		id: 98,
		title: '实现 Promise.race',
		content:
			'实现一个 Promise.race 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-07-16',
		codeExample: `function promiseRace(promises) {\n  return new Promise((resolve, reject) => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reject);\n    });\n  });\n}`
	},
	{
		id: 99,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-07-17',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 100,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-07-18',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 101,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-07-19',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 102,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-07-20',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 103,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-07-21',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 104,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-07-22',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 105,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-07-23',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 106,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-07-24',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 107,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-07-25',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 108,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-07-26',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 109,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-07-27',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 110,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-07-28',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 111,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-07-29',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 112,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-07-30',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 113,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-07-31',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 114,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-01',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 115,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-02',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 116,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-03',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 117,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-04',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 118,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-08-05',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 119,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-08-06',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 120,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-07',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 121,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-08',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 122,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-09',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 123,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-10',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 124,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-11',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 125,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-12',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 126,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-08-13',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 127,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-08-14',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 128,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-15',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 129,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-16',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 130,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-17',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 131,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-18',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 132,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-19',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 133,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-20',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 134,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-08-21',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 135,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-08-22',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 136,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-23',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 137,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-24',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 138,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-25',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 139,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-26',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 140,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-08-27',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 141,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-08-28',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 142,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-08-29',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 143,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-08-30',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 144,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-08-31',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 145,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-01',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 146,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-02',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 147,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-09-03',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 148,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-04',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 149,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-05',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 150,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-09-06',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 151,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-09-07',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 152,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-09-08',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 153,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-09',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 154,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-10',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 155,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-09-11',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 156,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-12',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 157,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-13',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 158,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-09-14',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 159,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-09-15',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 160,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-09-16',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 161,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-17',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 162,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-18',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	},
	{
		id: 163,
		title: '实现 Promise.allSettled',
		content:
			'实现一个 Promise.allSettled 函数，接收一个 Promise 数组，返回一个包含所有 Promise 状态的数组。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-09-19',
		codeExample: `function promiseAllSettled(promises) {\n  const results = [];\n  let settledCount = 0;\n  return new Promise(resolve => {\n    promises.forEach(p => {\n      Promise.resolve(p).then(value => {\n        results[promises.indexOf(p)] = { status: 'fulfilled', value };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      }, reason => {\n        results[promises.indexOf(p)] = { status: 'rejected', reason };\n        settledCount++;\n        if (settledCount === promises.length) resolve(results);\n      });\n    });\n  });\n}`
	},
	{
		id: 164,
		title: '实现 Promise.any',
		content:
			'实现一个 Promise.any 函数，接收一个 Promise 数组，返回最先完成的 Promise 的结果。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-20',
		codeExample: `function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    let rejectedCount = 0;\n    promises.forEach(p => {\n      Promise.resolve(p).then(resolve, reason => {\n        rejectedCount++;\n        if (rejectedCount === promises.length) reject(new AggregateError('All promises were rejected'));\n      });\n    });\n  });\n}`
	},
	{
		id: 165,
		title: '实现 Promise.all',
		content:
			'实现一个 Promise.all 函数，接收一个 Promise 数组，当所有 Promise 都成功时返回成功结果数组，有一个失败则返回失败结果。',
		difficulty: 4,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-21',
		codeExample: `function promiseAll(promises) {\n  const results = [];\n  let fulfilledCount = 0;\n  return new Promise((resolve, reject) => {\n    promises.forEach((p, index) => {\n      Promise.resolve(p).then(value => {\n        results[index] = value;\n        fulfilledCount++;\n        if (fulfilledCount === promises.length) resolve(results);\n      }, reject);\n    });\n  });\n}`
	},
	{
		id: 166,
		title: '实现 Promise.reject',
		content: '实现一个 Promise.reject 函数，返回一个状态为 rejected 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '百度',
		updateDate: '2025-09-22',
		codeExample: `function promiseReject(reason) {\n  return new Promise((resolve, reject) => reject(reason));\n}`
	},
	{
		id: 167,
		title: '实现 Promise.resolve',
		content: '实现一个 Promise.resolve 函数，返回一个状态为 fulfilled 的 Promise。',
		difficulty: 1,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '字节跳动',
		updateDate: '2025-09-23',
		codeExample: `function promiseResolve(value) {\n  return new Promise(resolve => resolve(value));\n}`
	},
	{
		id: 168,
		title: '实现 Promise.prototype.then',
		content: '实现 Promise.prototype.then 方法。',
		difficulty: 3,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '阿里巴巴',
		updateDate: '2025-09-24',
		codeExample: `Promise.prototype.then = function(onFulfilled, onRejected) {\n  const self = this;\n  return new Promise((resolve, reject) => {\n    const handle = (callback) => {\n      try {\n        const result = callback(self.value);\n        if (self.status === 'fulfilled') {\n          resolve(result);\n        } else if (self.status === 'rejected') {\n          reject(result);\n        }\n      } catch (error) {\n        reject(error);\n      }\n    };\n    if (this.status === 'pending') {\n      this.onFulfilledCallbacks.push(handle);\n      this.onRejectedCallbacks.push(handle);\n    } else if (this.status === 'fulfilled') {\n      handle(onFulfilled);\n    } else if (this.status === 'rejected') {\n      handle(onRejected);\n    }\n  });\n};`
	},
	{
		id: 169,
		title: '实现 Promise.prototype.catch',
		content: '实现 Promise.prototype.catch 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '腾讯',
		updateDate: '2025-09-25',
		codeExample: `Promise.prototype.catch = function(onRejected) {\n  return this.then(null, onRejected);\n};`
	},
	{
		id: 170,
		title: '实现 Promise.prototype.finally',
		content: '实现 Promise.prototype.finally 方法。',
		difficulty: 2,
		tags: ['JavaScript', 'Promise', '手写题'],
		company: '美团',
		updateDate: '2025-09-26',
		codeExample: `Promise.prototype.finally = function(callback) {\n  return this.then(\n    value => Promise.resolve(callback()).then(() => value),\n    reason => Promise.resolve(callback()).then(() => { throw reason; }) // 抛出错误，以便后续 catch 捕获\n  );\n};`
	}
];
