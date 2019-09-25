// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ECharts from 'vue-echarts/components/ECharts'
Vue.prototype.$echarts = ECharts

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
Vue.prototype.HOST = '/api'
Vue.component('chart', ECharts)
// 还要特别引入china.json，这样中国地图才会出现，不然只会出现右下角的南海诸岛
// import china from 'echarts/map/json/china.json'
import hebei from './hebei.json'
ECharts.registerMap('hebei', hebei)
// import 'lib-flexible/flexible.js'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
