import Vue from 'vue'
import App from './App'
// 这里虽然 rem 是已经引入的，不能删
import rem from './common/js/rem'
import './common/iconfont/style.css'
import router from './router/router'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  render: h => h(App),
})

