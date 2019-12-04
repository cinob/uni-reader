<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">登陆</button>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		getUserInfo (info) {
			let _t = this
			info = info.mp.detail
			uni.request({
				url: _t.apiServer + '&c=member&m=login',
				method: 'POST',
				header: {'content-type' : "application/x-www-form-urlencoded"},
				data: {
					openid: _t.openId,
					name: info.userInfo.nickName,
					img: info.userInfo.avatarUrl,
				},
				success: (res) => {
					console.log(res)
					if (res.data) {
						uni.showToast({
							title: '登陆成功'
						})
						uni.setStorageSync('suid', `${res.data.uid}`)
						uni.setStorageSync('token', `${res.data.token}`)
						uni.setStorageSync('simg', `${res.data.img}`)
						uni.setStorageSync('sname', `${res.data.name}`)
						// 跳转
						if (_t.options.backtype === 1) {
							uni.redirectTo({
								url: _t.options.backpage
							})
						} else {
							uni.switchTab({
								url: _t.options.backpage
							})
						}
					} else {
						uni.showToast({
							title: '登陆失败'
						})
					}
				},
				fail: () => {
					
				}
			})
		},
	},
	onLoad: function (options) {
		let _t = this
		this.options = options
		// 微信
		// #ifdef MP-WEIXIN
		uni.login({
			success: (res) => {
				console.log(res)
				uni.request({
					url: _t.apiServer,
					method: 'GET',
					data: {
						c: 'member',
						m: 'codeToOPenid',
						code: res.code
					},
					success: res => {
						console.log(res)
						if (!res.data.errcode) {
							this.sessionKey = res.data.session_key
							this.openId = res.data.openid
						}
					}
				})
			}
		})
		// #endif
		// app
		// #ifdef APP-PLUS
		uni.login({
			provider: 'weixin',
			success: (res) => {
				uni.getUserInfo({
					success: (info) => {
						// console.log(info)
						uni.request({
							url: _t.apiServer + '?c=member&m=login',
							method: 'POST',
							header: {'content-type' : "application/x-www-form-urlencoded"},
							data: {
								openid: info.userInfo.openId,
								name: info.userInfo.nickName,
								img: info.userInfo.avatarUrl,
							},
							success: (res) => {
								console.log(res)
								if (res.data) {
									uni.showToast({
										title: '登陆成功'
									})
									uni.setStorageSync('suid', `${res.data.uid}`)
									uni.setStorageSync('token', `${res.data.token}`)
									uni.setStorageSync('simg', `${res.data.img}`)
									uni.setStorageSync('sname', `${res.data.name}`)
									// 跳转
									if (options.backtype === 1) {
										uni.redirectTo({
											url: options.backpage
										})
									} else {
										uni.switchTab({
											url: options.backpage
										})
									}
								} else {
									uni.showToast({
										title: '登陆失败'
									})
								}
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: '微信登陆授权失败',
							icon: 'none'
						})
					}
				})
			},
			fail: () => {
				uni.showToast({
					title: '微信登陆授权失败',
					icon: 'none'
				})
			}
		})
		// #endif
	}
}
</script>

<style>

</style>
