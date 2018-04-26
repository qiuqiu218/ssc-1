import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index.vue'
import Shishicai from '../pages/shishicai.vue'


Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',      // 去掉 路径中的 /# 符号
  routes: [
    {
      path: '/',
      component: index
    },
    {
      name: 'ssc',
      path: '/shishicai',
      component: Shishicai
    }
  ]
})
