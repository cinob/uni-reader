<template>
	<view>
		write...
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
		this.loginRes = this.checkLogin('../write/write', 2)
		if (!this.loginRes) {
			return;
		}
	}
}
</script>

<style>

</style>
