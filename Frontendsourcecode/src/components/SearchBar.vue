<template>
	<div class="flex items-center">
		<input
			type="text"
			placeholder="搜索公司、职位或面经..."
			class="pl-8 pr-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-400 focus:outline-none w-56 md:w-72 transition-all text-sm shadow-sm"
		/>
		<button
			class="ml-3 px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium"
		>
			搜索面经
		</button>
	</div>
</template>
<script>
export default {
	name: 'SearchBar'
};
</script>
