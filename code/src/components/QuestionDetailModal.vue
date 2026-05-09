<template>
  <div class="main fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative animate-fadeIn">
      <button @click="$emit('close')" class="absolute right-5 top-5 text-gray-400 hover:text-gray-600 text-2xl">×</button>
      <div class="p-8 pb-4">
        <div class="flex items-center mb-2">
          <span class="text-xl font-bold text-indigo-700 mr-2">题解详情</span>
          <span class="text-xs text-gray-400">作者：{{ props.question.author || '阿里巴巴' }} | {{ props.question.date || '2025-03-15' }}</span>
        </div>
        <h2 class="text-2xl font-bold text-blue-900 mb-2">{{ props.question.title || '手写Promise.all实现题解' }}</h2>
        <div class="flex items-center mb-4">
          <span class="text-base text-gray-700 mr-2">题目：</span>
          <span class="text-base font-medium text-gray-900">{{ props.question.title || '手写Promise.all实现' }}</span>
          <span class="ml-2 px-2 py-0.5 text-xs rounded bg-red-100 text-red-600 font-semibold">{{ props.question.level || '高级' }}</span>
          <span class="ml-2 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-500">{{ props.question.author || '阿里巴巴' }}</span>
        </div>
        <div class="mb-4">
          <div class="text-gray-700 font-semibold mb-1">题目内容</div>
          <div class="text-gray-600 text-sm leading-relaxed">{{ props.question.desc || '实现一个Promise.all函数，接收一个Promise数组，当所有Promise都成功时返回成功结果数组，有一个失败则返回失败结果。' }}</div>
        </div>
        <div class="mb-4">
          <div class="text-gray-700 font-semibold mb-1">参考代码</div>
          <pre class="bg-[#23272e] text-white rounded-lg p-4 overflow-x-auto text-sm"><code>{{ props.question.code || `function promiseAll(promises) {
  const results = [];
  let fulfilledCount = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      Promise.resolve(p).then(value => {
        results[index] = value;
        fulfilledCount++;
        if (fulfilledCount === promises.length) resolve(results);
      }, reject);
    });
  });
}` }}</code></pre>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in props.question.tags || ['JavaScript','Promise','异步编程']" :key="tag" class="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">{{ tag }}</span>
        </div>
        <div class="flex items-center gap-4 mb-2">
          <button class="flex items-center px-3 py-1.5 rounded bg-green-50 hover:bg-green-100 text-green-700 text-sm"><i class="fa fa-thumbs-o-up mr-1"></i>点赞(11)</button>
          <button class="flex items-center px-3 py-1.5 rounded bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-sm"><i class="fa fa-star-o mr-1"></i>收藏</button>
          <button class="flex items-center px-3 py-1.5 rounded bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm"><i class="fa fa-comment-o mr-1"></i>评论</button>
        </div>
        <div class="text-gray-400 text-xs">评论功能待实现...</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['question'])
</script>
<style scoped>
.main {
 margin-top: 100px;
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 