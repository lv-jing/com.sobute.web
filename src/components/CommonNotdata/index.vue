<template>
	<div class="text-center flex flex-column-center">
		<img :src="empty" mode="aspectFit" style="width: 100px;" />
		<span class="text-color-999">暂无相关数据</span>
	</div>
</template>

<script>
	import empty from '@/assets/images/mescroll-empty.png'
	export default {
		data() {
			return {
				empty
			};
		},
		created(){
		}
	}
</script>

<style lang="scss">
	.flex-column-center{
		flex-direction: column;
		align-items: center;
	}
</style>
