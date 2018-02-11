/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import leftNav from '@/components/common/leftNav'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/leftNav',
      name: 'leftNav',
      component: leftNav
    }
  ]
})
