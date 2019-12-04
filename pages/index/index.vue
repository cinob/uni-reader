<template>
	<view>
		index...
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		
	},
	onLoad () {
		uni.request({
			url: this.apiServer,
			method: 'GET',
			data: {
				c: 'index',
				m: 'index',
			},
			success: (res) => {
				console.log(res)
			}
		})
	}
}
</script>

<style>

</style>
