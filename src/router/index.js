//引入基本子组件
import Vue from "vue"
import VueRouter from "vue-router"
import Rank from '../components/rank/rank.vue'
import Search from '../components/search/search.vue'
import Singer from '../components/singer/singer.vue'
import Recommend from '../components/recommend/recommend.vue'


Vue.use(VueRouter)//引用Router中间件

export default new VueRouter({
    routes: [{
		path: '/',
		redirect: '/recommend' // 重定向：默认跳转到推荐页面
	}, {
		path: "/rank",
		component: Rank,	//排行组件
	}, {
		path: "/search",
		component: Search	//搜索组件
	}, {
		path: "/singer",
		component: Singer	//歌手组件
	}, {
		path: "/recommend",
		component: Recommend	//推荐组件
	}]
})

