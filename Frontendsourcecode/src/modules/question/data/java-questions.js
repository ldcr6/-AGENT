export default [
	{
		id: 1,
		title: 'Java 的面向对象特性有哪些？',
		tags: ['面向对象'],
		difficulty: '初级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: '封装、继承、多态、抽象。',
		explanation:
			'封装是将数据和操作数据的方法绑定在一起，隐藏实现细节；继承是子类继承父类的属性和方法；多态是同一接口不同实现，分为编译时多态（重载）和运行时多态（重写）；抽象是只关注对象的必要特性，忽略细节。'
	},
	{
		id: 2,
		title: 'Java 的异常体系结构？',
		tags: ['异常', '体系结构'],
		difficulty: '中级',
		author: '李华',
		addedTime: '2025-07-20',
		solution:
			'Throwable 是所有异常的父类，分为 Error 和 Exception。Exception 又分为受检异常（Checked）和非受检异常（Unchecked）。',
		explanation:
			'Error 表示严重错误（如 OutOfMemoryError），Exception 表示程序本身可以处理的异常。受检异常必须捕获或声明，非受检异常（如 RuntimeException）可以不处理。'
	},
	{
		id: 3,
		title: 'Java 的多态实现原理？',
		tags: ['多态', '原理'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution:
			'Java 多态通过方法重写（Override）和向上转型实现，运行时根据对象实际类型调用方法。',
		explanation:
			'多态的前提：有继承关系、有方法重写、父类引用指向子类对象。Java 通过虚方法表（vtable）实现运行时多态。'
	},
	{
		id: 4,
		title: 'Java 的集合框架有哪些？',
		tags: ['集合框架'],
		difficulty: '初级',
		author: 'Java小组',
		addedTime: '2025-07-20',
		solution:
			'主要包括 List、Set、Map 三大接口及其实现类，如 ArrayList、LinkedList、HashSet、TreeSet、HashMap、TreeMap 等。',
		explanation:
			'List 有序可重复，Set 无序不重复，Map 键值对存储。集合框架统一了数据结构的操作接口，便于扩展和维护。'
	},
	{
		id: 5,
		title: 'HashMap 的底层实现原理？',
		tags: ['HashMap', '原理'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: 'HashMap 底层采用数组+链表+红黑树结构，利用哈希函数定位数组下标，解决哈希冲突。',
		explanation:
			'JDK8 之前采用数组+链表，JDK8 之后链表长度超过 8 转为红黑树，提高查询效率。哈希冲突通过链表或红黑树解决。'
	},
	{
		id: 6,
		title: 'Java 的线程池原理？',
		tags: ['线程池', '原理'],
		difficulty: '高级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: '线程池通过复用线程、任务队列、线程调度等机制，提高资源利用率和响应速度。',
		explanation:
			'Java 线程池由核心线程数、最大线程数、任务队列、拒绝策略等组成。线程池通过 Executor 框架实现，常用 ThreadPoolExecutor。'
	},
	{
		id: 7,
		title: 'Java 的反射机制？',
		tags: ['反射'],
		difficulty: '中级',
		author: 'Java小组',
		addedTime: '2025-07-20',
		solution: '反射机制允许程序在运行时动态获取类的信息、调用方法、访问属性。',
		explanation:
			'通过 Class、Method、Field、Constructor 等类，可以动态创建对象、调用方法、访问属性。反射常用于框架、依赖注入、动态代理等场景。'
	},
	{
		id: 8,
		title: 'Java 的泛型是什么？',
		tags: ['泛型'],
		difficulty: '初级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: '泛型是一种参数化类型机制，可以在类、接口、方法中定义类型参数。',
		explanation:
			'泛型提高了代码的复用性和类型安全，常用于集合类。Java 泛型在编译期进行类型擦除，运行时不保留类型信息。'
	},
	{
		id: 9,
		title: 'Java 的序列化和反序列化？',
		tags: ['序列化', '反序列化'],
		difficulty: '中级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: '序列化是将对象转为字节流，反序列化是将字节流还原为对象。',
		explanation:
			'Java 通过实现 Serializable 接口实现序列化，常用于网络传输、持久化存储。反序列化时需保证类的 serialVersionUID 一致。'
	},
	{
		id: 10,
		title: 'Java 的 synchronized 关键字作用？',
		tags: ['synchronized'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'synchronized 用于实现线程同步，保证同一时刻只有一个线程访问临界区。',
		explanation:
			'synchronized 可修饰方法或代码块，底层通过对象的监视器锁（monitor）实现。可防止线程安全问题，如数据竞争。'
	},
	{
		id: 11,
		title: 'Java 的 volatile 关键字作用？',
		tags: ['volatile'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution: 'volatile 用于保证变量的可见性和禁止指令重排序。',
		explanation:
			'被 volatile 修饰的变量，线程修改后会立即刷新到主内存，其他线程能立即看到最新值。volatile 不能保证原子性。'
	},
	{
		id: 12,
		title: 'Java 的内存模型（JMM）？',
		tags: ['JMM', '内存模型'],
		difficulty: '高级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: 'JMM 规定了多线程下变量的可见性、有序性和原子性。',
		explanation:
			'JMM 把内存分为主内存和工作内存，线程间变量通过主内存共享。JMM 通过 happens-before 规则保证操作顺序。'
	},
	{
		id: 13,
		title: 'Java 的垃圾回收机制？',
		tags: ['垃圾回收'],
		difficulty: '中级',
		author: 'Java小组',
		addedTime: '2025-07-20',
		solution: 'Java 垃圾回收采用分代回收、可达性分析、标记-清除、标记-整理、复制算法等。',
		explanation:
			'新生代采用复制算法，老年代采用标记-清除和标记-整理。可达性分析判断对象是否可回收。GC 分为 Minor GC 和 Full GC。'
	},
	{
		id: 14,
		title: 'Java 的类加载机制？',
		tags: ['类加载'],
		difficulty: '高级',
		author: '李华',
		addedTime: '2025-07-20',
		solution: '类加载机制包括加载、验证、准备、解析、初始化五个阶段。',
		explanation:
			'类加载器分为启动类加载器、扩展类加载器、应用类加载器。采用双亲委派模型，保证类的唯一性和安全性。'
	},
	{
		id: 15,
		title: 'Java 的动态代理原理？',
		tags: ['动态代理'],
		difficulty: '高级',
		author: '王伟',
		addedTime: '2025-07-20',
		solution: 'Java 动态代理通过反射机制在运行时生成代理类，实现对目标对象的增强。',
		explanation:
			'JDK 动态代理基于接口，使用 Proxy 和 InvocationHandler；CGLIB 基于继承，生成子类代理。常用于 AOP、事务等场景。'
	},
	{
		id: 16,
		title: 'Java 的 IO 和 NIO 区别？',
		tags: ['IO', 'NIO'],
		difficulty: '中级',
		author: '张宇轩',
		addedTime: '2025-07-20',
		solution: 'IO 是面向流、阻塞式，NIO 是面向缓冲区、非阻塞式。',
		explanation:
			'IO 每次只能一个线程处理一个通道，NIO 支持多路复用、选择器、缓冲区，适合高并发场景。'
	},
	{
		id: 17,
		title: 'Java 的线程安全集合有哪些？',
		tags: ['线程安全', '集合'],
		difficulty: '中级',
		author: '陈思远',
		addedTime: '2025-07-20',
		solution:
			'常见线程安全集合有 Vector、Hashtable、ConcurrentHashMap、CopyOnWriteArrayList、BlockingQueue 等。',
		explanation:
			'Vector、Hashtable 通过 synchronized 保证线程安全，ConcurrentHashMap 采用分段锁，CopyOnWriteArrayList 适合读多写少场景，BlockingQueue 支持阻塞操作。'
	},
	{
		id: 18,
		title: 'Java 的单例模式实现方式？',
		tags: ['单例模式'],
		difficulty: '初级',
		author: '赵子涵',
		addedTime: '2025-07-20',
		solution: '饿汉式、懒汉式、双重检查锁、静态内部类、枚举。',
		explanation:
			'饿汉式线程安全但浪费资源，懒汉式需加锁，双重检查锁兼顾性能和安全，静态内部类推荐，枚举实现最安全。'
	}
];
