export default [
	{
		id: 1,
		title: 'Python 的 GIL（全局解释器锁）是什么？',
		tags: ['GIL', '多线程'],
		difficulty: '高级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'GIL 是 CPython 解释器中的全局锁，同一时刻只允许一个线程执行字节码。',
		explanation:
			'GIL 保证了解释器的线程安全，但导致多线程无法利用多核 CPU 并行执行。适合 I/O 密集型，多进程适合 CPU 密集型。'
	},
	{
		id: 2,
		title: 'Python 中的装饰器是什么？如何实现一个装饰器？',
		tags: ['装饰器', '函数'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: '装饰器是一个函数，用于在不修改原函数代码的情况下，动态增加功能。',
		explanation:
			'装饰器本质是一个高阶函数，接受一个函数作为参数并返回一个新函数。常用 @decorator 语法糖。示例：\ndef deco(func):\n    def wrapper(*args, **kwargs):\n        print("before")\n        res = func(*args, **kwargs)\n        print("after")\n        return res\n    return wrapper\n@deco\ndef foo():\n    pass'
	},
	{
		id: 3,
		title: 'Python 的生成器和迭代器区别？',
		tags: ['生成器', '迭代器'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: '生成器是特殊的迭代器，使用 yield 生成值，自动实现 __iter__ 和 __next__。',
		explanation:
			'迭代器实现了 __iter__ 和 __next__ 方法，生成器是用函数语法定义的迭代器，节省内存，适合处理大数据流。'
	},
	{
		id: 4,
		title: '什么是列表推导式？',
		tags: ['列表推导式'],
		difficulty: '初级',
		author: '小张',
		addedTime: '2025-07-20',
		solution: '列表推导式是一种简洁生成列表的语法。',
		explanation:
			'语法：[expr for item in iterable if condition]，可读性强，效率高。示例：[x*x for x in range(10) if x%2==0]。'
	},
	{
		id: 5,
		title: 'Python 中的深拷贝和浅拷贝区别？',
		tags: ['深拷贝', '浅拷贝'],
		difficulty: '中级',
		author: '小赵',
		addedTime: '2025-07-20',
		solution: '浅拷贝只复制对象引用，深拷贝递归复制所有内容。',
		explanation: '浅拷贝用 copy.copy，深拷贝用 copy.deepcopy。深拷贝会复制嵌套对象，互不影响。'
	},
	{
		id: 6,
		title: '如何处理 Python 中的内存泄漏？',
		tags: ['内存泄漏'],
		difficulty: '高级',
		author: '小陈',
		addedTime: '2025-07-20',
		solution: '及时释放无用对象，避免循环引用，使用 gc 模块手动回收。',
		explanation:
			'内存泄漏常因循环引用、全局变量、缓存未清理等导致。可用 gc.collect() 手动回收垃圾。'
	},
	{
		id: 7,
		title: 'Python 的多继承与 MRO（方法解析顺序）？',
		tags: ['多继承', 'MRO'],
		difficulty: '高级',
		author: '小孙',
		addedTime: '2025-07-20',
		solution: '多继承允许一个类继承多个父类，MRO 决定方法调用顺序。',
		explanation: 'MRO 使用 C3 线性化算法，优先查找子类、左侧父类。可用 Class.__mro__ 查看顺序。'
	},
	{
		id: 8,
		title: 'Python 中的 with 语句原理？',
		tags: ['with语句', '上下文管理器'],
		difficulty: '中级',
		author: '小周',
		addedTime: '2025-07-20',
		solution: 'with 语句用于简化资源管理，自动调用 __enter__ 和 __exit__ 方法。',
		explanation:
			'常用于文件、网络连接等场景，确保资源及时释放。自定义类实现 __enter__ 和 __exit__ 可支持 with 语句。'
	},
	{
		id: 9,
		title: '如何用 Python 实现单例模式？',
		tags: ['单例模式'],
		difficulty: '中级',
		author: '小吴',
		addedTime: '2025-07-20',
		solution: '可用类变量、装饰器、元类等方式实现单例。',
		explanation:
			'常见写法：\nclass Singleton:\n    _instance = None\n    def __new__(cls, *args, **kwargs):\n        if not cls._instance:\n            cls._instance = super().__new__(cls)\n        return cls._instance'
	},
	{
		id: 10,
		title: 'Python 的垃圾回收机制？',
		tags: ['垃圾回收'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'Python 使用引用计数和垃圾回收机制管理内存。',
		explanation:
			'引用计数：对象被引用时计数加1，引用失效时计数减1。当计数为0时，对象被回收。\n垃圾回收：分为标记-清除和分代回收。标记-清除：标记可达对象，清除不可达。分代回收：将对象按创建时间分代，优先回收老代。'
	},
	{
		id: 11,
		title: 'Python 中的元类（metaclass）是什么？',
		tags: ['元类'],
		difficulty: '高级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: '元类是类的类，用于控制类的创建和行为。',
		explanation:
			'元类继承自 type，可以重写 __new__ 和 __init__ 方法。示例：\ndef my_meta(name, bases, dct):\n    return type(name, bases, dct)\nclass MyClass(metaclass=my_meta):\n    pass'
	},
	{
		id: 12,
		title: '如何用 Python 进行多线程和多进程编程？',
		tags: ['多线程', '多进程'],
		difficulty: '中级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: '多线程和多进程是实现并行计算的两种方式。',
		explanation:
			'多线程：在单个进程内，多个线程共享内存，适合 I/O 密集型。\n多进程：在多个进程中，每个进程都有独立的内存，适合 CPU 密集型。\n使用 threading 和 multiprocessing 模块。'
	},
	{
		id: 13,
		title: 'Python 的闭包是什么？',
		tags: ['闭包'],
		difficulty: '初级',
		author: 'Python小组',
		addedTime: '2025-07-20',
		solution: '闭包是函数内部定义的函数，可以访问外部函数的变量。',
		explanation:
			'闭包使得函数可以记住并访问其定义时所在的作用域中的变量。示例：\ndef outer_func():\n    x = 10\n    def inner_func():\n        print(x)\n    return inner_func'
	},
	{
		id: 14,
		title: 'Python 的 lambda 表达式用法？',
		tags: ['lambda'],
		difficulty: '初级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: 'lambda 表达式用于创建匿名函数。',
		explanation: '语法：lambda 参数: 表达式。示例：\nadd = lambda x, y: x + y\nprint(add(2, 3))'
	},
	{
		id: 15,
		title: 'Python 的异常处理机制？',
		tags: ['异常处理'],
		difficulty: '初级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'Python 使用 try-except-finally 结构处理异常。',
		explanation:
			'try 块中包含可能引发异常的代码，except 块捕获特定类型的异常，finally 块无论是否发生异常都会执行。'
	},
	{
		id: 16,
		title: '如何用 Python 进行文件操作？',
		tags: ['文件操作'],
		difficulty: '初级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: '使用 open 函数打开文件，并使用 with 语句管理资源。',
		explanation:
			"open 函数：mode 参数：'r' 读，'w' 写，'a' 追加，'b' 二进制，'t' 文本，'+' 读写。\nwith 语句：自动关闭文件，确保资源及时释放。"
	},
	{
		id: 17,
		title: 'Python 的多态和封装？',
		tags: ['多态', '封装'],
		difficulty: '初级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: '多态允许不同类的对象通过相同的接口调用，封装隐藏实现细节。',
		explanation:
			'多态：鸭子类型（duck typing），不关心对象类型，只关心接口。\n封装：将数据（属性）和操作（方法）封装在类中，对外暴露接口。'
	},
	{
		id: 18,
		title: 'Python 的内置数据结构有哪些？',
		tags: ['数据结构'],
		difficulty: '初级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: 'Python 内置多种数据结构，包括列表、元组、字典、集合等。',
		explanation:
			'列表：有序可变，可存储任意类型。\n元组：有序不可变，适合存储常量。\n字典：无序可变，键值对。\n集合：无序可变，不重复元素。'
	},
	{
		id: 19,
		title: 'Python 的字典和集合区别？',
		tags: ['字典', '集合'],
		difficulty: '初级',
		author: '小秦',
		addedTime: '2025-07-20',
		solution: '字典是键值对集合，集合是唯一元素的集合。',
		explanation: '字典：键是唯一的，值可以重复。\n集合：元素是唯一的，无序。'
	},
	{
		id: 20,
		title: 'Python 的多线程为什么不能利用多核？',
		tags: ['多线程', 'GIL'],
		difficulty: '高级',
		author: '小尤',
		addedTime: '2025-07-20',
		solution: 'GIL 是 CPython 解释器中的全局锁，同一时刻只允许一个线程执行字节码。',
		explanation:
			'GIL 保证了解释器的线程安全，但导致多线程无法利用多核 CPU 并行执行。适合 I/O 密集型，多进程适合 CPU 密集型。'
	},
	{
		id: 21,
		title: 'Python 的协程（coroutine）是什么？',
		tags: ['协程'],
		difficulty: '高级',
		author: '小许',
		addedTime: '2025-07-20',
		solution: '协程是一种用户态的轻量级线程，可以在一个线程中实现并发。',
		explanation:
			'协程通过 yield 和 send 实现协作式多任务，避免了线程切换的开销。\nasync/await 语法糖使得异步编程更加直观。'
	},
	{
		id: 22,
		title: 'Python 的装饰器如何带参数？',
		tags: ['装饰器'],
		difficulty: '中级',
		author: '小何',
		addedTime: '2025-07-20',
		solution: '装饰器可以带参数，需要定义一个接受参数的装饰器函数。',
		explanation:
			'语法：@decorator(arg1, arg2)\ndef foo():\n    pass\n\n# 等价于\n\ndef decorator(arg1, arg2):\n    def wrapper(func):\n        def inner(*args, **kwargs):\n            print(f"arg1: {arg1}, arg2: {arg2}")\n            return func(*args, **kwargs)\n        return inner\n\n@decorator(1, 2)\ndef foo():\n    pass'
	},
	{
		id: 23,
		title: 'Python 的反射机制？',
		tags: ['反射'],
		difficulty: '中级',
		author: '小吕',
		addedTime: '2025-07-20',
		solution: '反射允许在运行时检查和操作对象的属性、方法和类型。',
		explanation:
			'使用 dir() 查看对象属性，getattr() 获取属性，hasattr() 检查属性，setattr() 设置属性，delattr() 删除属性。'
	},
	{
		id: 24,
		title: 'Python 的多进程通信方式有哪些？',
		tags: ['多进程', '通信'],
		difficulty: '中级',
		author: '小施',
		addedTime: '2025-07-20',
		solution: '多进程通信有多种方式，包括管道、消息队列、共享内存、套接字等。',
		explanation:
			'管道：单向通信，适合父子进程。\n消息队列：先进先出，适合多进程间通信。\n共享内存：多个进程访问同一块内存，速度快，但需要同步。\n套接字：网络通信，适合跨机器通信。'
	},
	{
		id: 25,
		title: 'Python 的内存管理机制？',
		tags: ['内存管理'],
		difficulty: '高级',
		author: '小张',
		addedTime: '2025-07-20',
		solution: 'Python 使用引用计数和垃圾回收机制管理内存。',
		explanation:
			'引用计数：对象被引用时计数加1，引用失效时计数减1。当计数为0时，对象被回收。\n垃圾回收：分为标记-清除和分代回收。标记-清除：标记可达对象，清除不可达。分代回收：将对象按创建时间分代，优先回收老代。'
	},
	{
		id: 26,
		title: 'Python 的正则表达式用法？',
		tags: ['正则表达式'],
		difficulty: '中级',
		author: '小李',
		addedTime: '2025-07-20',
		solution: '正则表达式用于匹配字符串中的模式。',
		explanation:
			're 模块：\nimport re\n\n# 编译正则表达式\npattern = re.compile(r"\\d+")\n\n# 匹配\nmatch = pattern.match("123abc")\nif match:\n    print(match.group())\n\n# 查找\nsearch = pattern.search("abc123def")\nif search:\n    print(search.group())\n\n# 替换\nresult = pattern.sub("X", "abc123def")\nprint(result)'
	},
	{
		id: 27,
		title: 'Python 的多线程和多进程的区别？',
		tags: ['多线程', '多进程'],
		difficulty: '中级',
		author: '小王',
		addedTime: '2025-07-20',
		solution: '多线程和多进程是实现并行计算的两种方式。',
		explanation:
			'多线程：在单个进程内，多个线程共享内存，适合 I/O 密集型。\n多进程：在多个进程中，每个进程都有独立的内存，适合 CPU 密集型。\n使用 threading 和 multiprocessing 模块。'
	},
	{
		id: 28,
		title: 'Python 的内置函数有哪些？',
		tags: ['内置函数'],
		difficulty: '初级',
		author: '小赵',
		addedTime: '2025-07-20',
		solution: 'Python 内置多种函数，包括数学函数、字符串函数、文件操作函数等。',
		explanation:
			'数学函数：abs(), pow(), round(), math.sqrt()\n字符串函数：len(), str(), format(), split(), join()\n文件操作函数：open(), close(), read(), write()'
	},
	{
		id: 29,
		title: 'Python 的包和模块区别？',
		tags: ['包', '模块'],
		difficulty: '初级',
		author: '小陈',
		addedTime: '2025-07-20',
		solution: '包是包含多个模块的目录，模块是包含函数、类、变量的文件。',
		explanation:
			'包：包含多个模块，通常有 __init__.py。\n模块：包含函数、类、变量，通常有 .py 扩展名。'
	},
	{
		id: 30,
		title: 'Python 的多线程同步机制？',
		tags: ['多线程', '同步'],
		difficulty: '中级',
		author: '小孙',
		addedTime: '2025-07-20',
		solution: '多线程同步机制用于协调多个线程对共享资源的访问。',
		explanation:
			'互斥锁（Lock）：确保同一时间只有一个线程访问共享资源。\n信号量（Semaphore）：控制同时访问共享资源的线程数量。\n事件（Event）：线程间通信，一个线程等待另一个线程完成某任务。'
	},
	{
		id: 31,
		title: 'Python 的内存泄漏排查方法？',
		tags: ['内存泄漏'],
		difficulty: '高级',
		author: '小周',
		addedTime: '2025-07-20',
		solution: '内存泄漏排查方法包括使用工具、分析代码、检查循环引用等。',
		explanation:
			'使用 memory_profiler 和 objgraph 工具。\n分析代码：检查对象引用，查找循环。\n检查循环引用：使用 gc.collect() 和 objgraph 查看。'
	},
	{
		id: 32,
		title: 'Python 的垃圾回收机制有哪些？',
		tags: ['垃圾回收'],
		difficulty: '中级',
		author: '小吴',
		addedTime: '2025-07-20',
		solution: 'Python 使用引用计数和垃圾回收机制管理内存。',
		explanation:
			'引用计数：对象被引用时计数加1，引用失效时计数减1。当计数为0时，对象被回收。\n垃圾回收：分为标记-清除和分代回收。标记-清除：标记可达对象，清除不可达。分代回收：将对象按创建时间分代，优先回收老代。'
	},
	{
		id: 33,
		title: 'Python 的多线程死锁如何避免？',
		tags: ['多线程', '死锁'],
		difficulty: '高级',
		author: '小郑',
		addedTime: '2025-07-20',
		solution: '避免死锁的方法包括使用互斥锁、信号量、事件，并确保正确的加锁顺序。',
		explanation:
			'确保加锁顺序一致。\n使用 try-except-finally 确保锁被释放。\n使用信号量控制并发数量。'
	},
	{
		id: 34,
		title: 'Python 的协程和线程的区别？',
		tags: ['协程', '线程'],
		difficulty: '高级',
		author: '小冯',
		addedTime: '2025-07-20',
		solution: '协程是用户态的轻量级线程，可以在一个线程中实现并发。',
		explanation:
			'协程通过 yield 和 send 实现协作式多任务，避免了线程切换的开销。\nasync/await 语法糖使得异步编程更加直观。'
	},
	{
		id: 35,
		title: 'Python 的 async/await 用法？',
		tags: ['async', 'await'],
		difficulty: '高级',
		author: '小褚',
		addedTime: '2025-07-20',
		solution: 'async/await 是异步编程的语法糖，用于简化异步函数的调用。',
		explanation:
			'async 定义异步函数，await 等待异步操作完成。\n示例：\nasync def fetch_data():\n    await asyncio.sleep(1)\n    return "Data"\n\nasync def main():\n    result = await fetch_data()\n    print(result)'
	}
];
