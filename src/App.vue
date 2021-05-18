<template>
  <div id="app">
	  <m-header></m-header>
	  <tab></tab>
	  <router-view></router-view>
  </div>
</template>
<script>
	import MHeader from "./components/m-header/m-header.vue"
	import tab from './components/tab/tab.vue'
	export default{
		components:{
			"m-header":MHeader,
			tab
		}
	}
</script>
<style lang="stylus" scoped >

</style>


