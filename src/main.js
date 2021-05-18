import Vue from 'vue'
import App from './App.vue'

import Router from "./router/index.js"// 引入router
import attachFastClick from "fastclick" //引入fastclick解决移动端300ms延迟问题
import "./common/stylus/index.styl" //引入 主stylus文件

attachFastClick.attach(document.body)//把该插件作用于整个body上

Vue.config.productionTip = false //阻止启动生产消息

new Vue({
  render: (h) => h(App),
  router:Router// 引用路由，调用router数据
}).$mount('#app')