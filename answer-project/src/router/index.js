import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import HelloWorld from '@/components/HelloWorld'
import itemcontainer from '@/components/itemcontainer'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
   {
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home')), 'home')
    }, {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/item')), 'item')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score')), 'score')
    }]
   }

  ]
})
