<template>
	<view>
		my...
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
	onLoad: function () {
		this.loginRes = this.checkLogin('../my/my', 2)
		if (!this.loginRes) {
			return;
		}
	}
}
</script>

<style>

</style>
