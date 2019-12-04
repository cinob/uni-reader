import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.checkLogin = function (backpage, backtype) {
	const suid = uni.getStorageSync('suid')
	const token = uni.getStorageSync('token')
	const sname = uni.getStorageSync('sname')
	const simg = uni.getStorageSync('simg')
	if (suid === '' || token === '' || simg === '') {
		uni.redirectTo({
			url: '../login/login?backpage='+backpage+'&backtype='+backtype
		})
		return false
	}
	return [suid, token, sname, simg]
}
let apitoken = 'cinob'
Vue.prototype.apiServer = `http://192.168.1.113//reader/index.php?token=${apitoken}`

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
