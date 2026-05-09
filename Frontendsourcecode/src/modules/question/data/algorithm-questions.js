export default [
	{
		id: 1,
		title: '实现一个防抖函数',
		tags: ['JavaScript', '防抖'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: `function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`,
		explanation:
			'防抖函数的核心思想是：在事件被频繁触发时，只有最后一次触发后经过 delay 毫秒才会真正执行函数。每次触发时先清除上一次的定时器，重新计时。常用于输入框实时搜索、窗口 resize 等场景。'
	},
	{
		id: 2,
		title: '手写 Promise.all 实现',
		tags: ['JavaScript', 'Promise'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: `Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        result[i] = res;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      }, reject);
    }
    if (promises.length === 0) resolve([]);
  });
}`,
		explanation:
			'Promise.all 的实现要点：1. 返回一个新的 Promise；2. 遍历所有输入的 promise，按顺序收集结果；3. 有一个失败就立即 reject；4. 全部成功才 resolve。注意要用 Promise.resolve 包裹每一项，保证兼容非 promise 值。'
	},
	{
		id: 3,
		title: '实现二分查找算法',
		tags: ['算法', '查找'],
		difficulty: '初级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
		explanation:
			'二分查找要求数组有序。每次取中间值与目标比较，若相等返回下标；若目标大于中间值，则在右半区间查找，否则在左半区间查找。时间复杂度 O(log n)。'
	},
	{
		id: 4,
		title: '实现 LRU 缓存算法',
		tags: ['LRU', '缓存'],
		difficulty: '高级',
		author: '算法团队',
		addedTime: '2025-07-20',
		solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`,
		explanation:
			'LRU（最近最少使用）缓存用 Map 维护插入顺序。每次 get/put 都把 key 移到末尾，超出容量时删除最早插入的 key。Map 的有序性和 delete/set 操作保证了 O(1) 时间复杂度。'
	},
	{
		id: 5,
		title: '反转链表',
		tags: ['链表', '反转'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
		explanation:
			'反转链表用双指针迭代。每次保存 next 节点，反转 curr.next 指向 prev，prev 和 curr 向后移动。最终 prev 即为新头结点。'
	},
	{
		id: 6,
		title: '数组去重',
		tags: ['数组', '去重'],
		difficulty: '初级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: `function unique(arr) {
  return Array.from(new Set(arr));
}`,
		explanation:
			'利用 Set 结构的唯一性，直接去重。也可用 filter + indexOf 实现。Set 性能更优，代码更简洁。'
	},
	{
		id: 7,
		title: '斐波那契数列实现',
		tags: ['递归', '斐波那契'],
		difficulty: '初级',
		author: '算法团队',
		addedTime: '2025-07-20',
		solution: `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
		explanation: '递归写法直观但效率低，时间复杂度 O(2^n)。实际应用建议用循环或记忆化递归优化。'
	},
	{
		id: 8,
		title: '深拷贝实现',
		tags: ['JavaScript', '深拷贝'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const res = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key]);
    }
  }
  return res;
}`,
		explanation:
			'深拷贝要递归遍历对象和数组。注意要判断 null、数组、对象类型。更复杂的对象（如循环引用、函数、Date）需特殊处理。'
	},
	{
		id: 9,
		title: '数组扁平化',
		tags: ['数组', '扁平化'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: `function flatten(arr) {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
}`,
		explanation:
			'递归遍历数组，遇到数组递归扁平化，否则直接拼接。ES10 可用 arr.flat(Infinity)。'
	},
	{
		id: 10,
		title: '合并两个有序数组',
		tags: ['数组', '合并'],
		difficulty: '初级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: `function mergeSorted(arr1, arr2) {
  let i = 0, j = 0, res = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) res.push(arr1[i++]);
    else res.push(arr2[j++]);
  }
  return res.concat(arr1.slice(i)).concat(arr2.slice(j));
}`,
		explanation:
			'双指针遍历两个有序数组，依次比较取小的放入结果。剩余部分直接拼接。时间复杂度 O(m+n)。'
	},
	{
		id: 11,
		title: '链表中环的检测',
		tags: ['链表', '环'],
		difficulty: '中级',
		author: '小王',
		addedTime: '2025-07-20',
		solution: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
		explanation:
			'快慢指针法，快指针每次走两步，慢指针每次走一步。如果链表有环，快慢指针最终会相遇。否则快指针会先到达链表末尾。时间复杂度 O(n)。'
	},
	{
		id: 12,
		title: '二叉树的前序遍历',
		tags: ['二叉树', '遍历'],
		difficulty: '中级',
		author: '小张',
		addedTime: '2025-07-20',
		solution: `function preorder(root) {
  const res = [];
  function dfs(node) {
    if (!node) return;
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return res;
}`,
		explanation:
			'前序遍历顺序为“根-左-右”。递归实现时，先访问根节点，再递归遍历左子树和右子树。也可用栈实现。'
	},
	{
		id: 13,
		title: '二叉树的层序遍历',
		tags: ['二叉树', '层序遍历'],
		difficulty: '中级',
		author: '小赵',
		addedTime: '2025-07-20',
		solution: `function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const level = [];
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
		explanation: '层序遍历用队列实现，每次遍历一层，将下一层节点加入队列。常用于广度优先搜索。'
	},
	{
		id: 14,
		title: '快速排序算法实现',
		tags: ['排序', '快速排序'],
		difficulty: '中级',
		author: '小陈',
		addedTime: '2025-07-20',
		solution: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
		explanation:
			'快速排序采用分治思想，选取基准元素，将数组分为左右两部分递归排序。平均时间复杂度 O(nlogn)。'
	},
	{
		id: 15,
		title: '归并排序算法实现',
		tags: ['排序', '归并排序'],
		difficulty: '中级',
		author: '小孙',
		addedTime: '2025-07-20',
		solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const res = [];
  while (left.length && right.length) {
    res.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return res.concat(left, right);
}`,
		explanation:
			'归并排序也是分治思想，递归拆分数组，合并时用双指针合并两个有序数组。时间复杂度 O(nlogn)。'
	},
	{
		id: 16,
		title: '冒泡排序算法实现',
		tags: ['排序', '冒泡排序'],
		difficulty: '初级',
		author: '小周',
		addedTime: '2025-07-20',
		solution: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
		explanation:
			'冒泡排序每轮将最大值“冒泡”到末尾。两层循环，外层控制轮数，内层两两比较并交换。时间复杂度 O(n^2)。'
	},
	{
		id: 17,
		title: '插入排序算法实现',
		tags: ['排序', '插入排序'],
		difficulty: '初级',
		author: '小吴',
		addedTime: '2025-07-20',
		solution: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
		explanation:
			'插入排序将当前元素插入到前面已排序序列的合适位置。适合小规模数组。时间复杂度 O(n^2)。'
	},
	{
		id: 18,
		title: '选择排序算法实现',
		tags: ['排序', '选择排序'],
		difficulty: '初级',
		author: '小郑',
		addedTime: '2025-07-20',
		solution: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}`,
		explanation:
			'选择排序每轮选择最小值放到前面。两层循环，外层控制轮数，内层找最小值。时间复杂度 O(n^2)。'
	},
	{
		id: 19,
		title: '最长公共子序列',
		tags: ['动态规划', '子序列'],
		difficulty: '高级',
		author: '小冯',
		addedTime: '2025-07-20',
		solution: `function lcs(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
		explanation:
			'最长公共子序列用动态规划。dp[i][j] 表示 s1 前 i 个和 s2 前 j 个的 LCS 长度。状态转移：若当前字符相等，dp[i][j]=dp[i-1][j-1]+1，否则取上方或左方最大值。'
	},
	{
		id: 20,
		title: '最长回文子串',
		tags: ['动态规划', '回文'],
		difficulty: '高级',
		author: '小褚',
		addedTime: '2025-07-20',
		solution: `function longestPalindrome(s) {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const str = s.slice(i, j + 1);
      if (str === str.split('').reverse().join('') && str.length > res.length) {
        res = str;
      }
    }
  }
  return res;
}`,
		explanation: '暴力法枚举所有子串并判断是否回文。更优解法可用中心扩展或动态规划。'
	},
	{
		id: 21,
		title: '爬楼梯问题',
		tags: ['动态规划', '爬楼梯'],
		difficulty: '中级',
		author: '小卫',
		addedTime: '2025-07-20',
		solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
		explanation: '爬楼梯问题是斐波那契数列变种。每次可以爬1或2阶，状态转移 f(n)=f(n-1)+f(n-2)。'
	},
	{
		id: 22,
		title: '合并区间',
		tags: ['区间', '合并'],
		difficulty: '中级',
		author: '小蒋',
		addedTime: '2025-07-20',
		solution: `function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}`,
		explanation:
			'先按区间起点排序，遍历合并重叠区间。每次和结果数组最后一个区间比较，能合并则更新右端点，否则新建区间。'
	},
	{
		id: 23,
		title: '有效括号',
		tags: ['栈', '括号'],
		difficulty: '初级',
		author: '小沈',
		addedTime: '2025-07-20',
		solution: `function isValid(s) {
  const stack = [];
  const map = { '(': ')', '[': ']', '{': '}' };
  for (let c of s) {
    if (map[c]) stack.push(map[c]);
    else if (stack.pop() !== c) return false;
  }
  return stack.length === 0;
}`,
		explanation:
			'用栈存储期望遇到的右括号，遇到左括号入栈，遇到右括号出栈并比对。全部匹配则有效。'
	},
	{
		id: 24,
		title: '最小栈实现',
		tags: ['栈', '最小栈'],
		difficulty: '中级',
		author: '小韩',
		addedTime: '2025-07-20',
		solution: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(x) {
    this.stack.push(x);
    this.minStack.push(this.minStack.length ? Math.min(x, this.minStack[this.minStack.length-1]) : x);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() {
    return this.stack[this.stack.length-1];
  }
  getMin() {
    return this.minStack[this.minStack.length-1];
  }
}`,
		explanation: '用辅助栈记录每一步的最小值，实现 O(1) 取最小值。每次 push 同步更新 minStack。'
	},
	{
		id: 25,
		title: '用两个栈实现队列',
		tags: ['栈', '队列'],
		difficulty: '中级',
		author: '小杨',
		addedTime: '2025-07-20',
		solution: `class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  push(x) {
    this.inStack.push(x);
  }
  pop() {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }
  peek() {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }
  empty() {
    return !this.inStack.length && !this.outStack.length;
  }
}`,
		explanation:
			'inStack 负责入队，outStack 负责出队。出队时 outStack 为空就把 inStack 全部倒入 outStack，实现队列 FIFO。'
	},
	{
		id: 26,
		title: 'LRU 缓存机制',
		tags: ['LRU', '缓存'],
		difficulty: '高级',
		author: '小朱',
		addedTime: '2025-07-20',
		solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`,
		explanation: '与第4题类似，Map 维护插入顺序，超出容量时删除最早插入的 key。'
	},
	{
		id: 27,
		title: '合并 K 个有序链表',
		tags: ['链表', '合并'],
		difficulty: '高级',
		author: '小秦',
		addedTime: '2025-07-20',
		solution: `function mergeKLists(lists) {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const a = lists.shift();
    const b = lists.shift();
    lists.push(mergeTwo(a, b));
  }
  return lists[0];
}
function mergeTwo(l1, l2) {
  const dummy = { next: null };
  let p = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }
  p.next = l1 || l2;
  return dummy.next;
}`,
		explanation: '两两合并链表，直到只剩一个。每次合并用归并两个有序链表的方法。'
	},
	{
		id: 28,
		title: '二叉树的最大深度',
		tags: ['二叉树', '深度'],
		difficulty: '中级',
		author: '小尤',
		addedTime: '2025-07-20',
		solution: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
		explanation: '递归求左右子树最大深度，取最大值加1。'
	},
	{
		id: 29,
		title: '二叉树的最小深度',
		tags: ['二叉树', '深度'],
		difficulty: '中级',
		author: '小许',
		addedTime: '2025-07-20',
		solution: `function minDepth(root) {
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}`,
		explanation: '最小深度是到最近叶子节点的路径长度。递归时要注意只有一侧子树为空的情况。'
	},
	{
		id: 30,
		title: '二叉树的镜像',
		tags: ['二叉树', '镜像'],
		difficulty: '中级',
		author: '小何',
		addedTime: '2025-07-20',
		solution: `function mirrorTree(root) {
  if (!root) return null;
  [root.left, root.right] = [mirrorTree(root.right), mirrorTree(root.left)];
  return root;
}`,
		explanation: '递归交换左右子树即可。也可用队列层序遍历交换。'
	},
	{
		id: 31,
		title: '二叉树的最大路径和',
		tags: ['二叉树', '路径和'],
		difficulty: '高级',
		author: '小吕',
		addedTime: '2025-07-20',
		solution: `function maxPathSum(root) {
  let maxSum = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return maxSum;
}`,
		explanation: '递归计算每个节点为根的最大路径和，左右子树贡献为正才加。全局维护最大值。'
	},
	{
		id: 32,
		title: '二叉树的最近公共祖先',
		tags: ['二叉树', '祖先'],
		difficulty: '高级',
		author: '小施',
		addedTime: '2025-07-20',
		solution: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
		explanation: '递归查找 p 和 q，若分别在左右子树，则当前节点为最近公共祖先。否则在同一侧。'
	},
	{
		id: 33,
		title: '二分查找算法实现',
		tags: ['查找', '二分查找'],
		difficulty: '初级',
		author: '小张',
		addedTime: '2025-07-20',
		solution: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
		explanation: '与第3题相同，二分查找要求有序数组，时间复杂度 O(log n)。'
	},
	{
		id: 34,
		title: '字符串全排列',
		tags: ['字符串', '全排列'],
		difficulty: '中级',
		author: '小李',
		addedTime: '2025-07-20',
		solution: `function permute(str) {
  const res = [];
  function backtrack(path, used) {
    if (path.length === str.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < str.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      backtrack(path + str[i], used);
      used[i] = false;
    }
  }
  backtrack('', Array(str.length).fill(false));
  return res;
}`,
		explanation: '回溯法枚举所有可能的字符排列。用 used 数组标记已用字符。'
	},
	{
		id: 35,
		title: '字符串最长不重复子串',
		tags: ['字符串', '子串'],
		difficulty: '中级',
		author: '小王',
		addedTime: '2025-07-20',
		solution: `function lengthOfLongestSubstring(s) {
  let map = {}, left = 0, maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] !== undefined && map[s[i]] >= left) {
      left = map[s[i]] + 1;
    }
    map[s[i]] = i;
    maxLen = Math.max(maxLen, i - left + 1);
  }
  return maxLen;
}`,
		explanation: '滑动窗口+哈希表，记录每个字符上一次出现的位置，遇到重复时窗口左边界右移。'
	},
	{
		id: 36,
		title: '滑动窗口最大值',
		tags: ['滑动窗口'],
		difficulty: '中级',
		author: '小赵',
		addedTime: '2025-07-20',
		solution: `function maxSlidingWindow(nums, k) {
  const res = [], deque = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (deque[0] <= i - k) deque.shift();
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`,
		explanation: '用单调队列维护窗口内最大值的下标，保证队列递减。每次窗口滑动时弹出过期元素。'
	},
	{
		id: 37,
		title: '岛屿数量',
		tags: ['DFS', 'BFS'],
		difficulty: '高级',
		author: '小陈',
		addedTime: '2025-07-20',
		solution: `function numIslands(grid) {
  let count = 0;
  const m = grid.length, n = grid[0].length;
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
}`,
		explanation: 'DFS 遍历每个陆地格子，遇到“1”就递归淹没相连的陆地。BFS 也可实现。'
	}
];
