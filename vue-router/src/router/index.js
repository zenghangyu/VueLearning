import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HI from '@/components/HI.vue'
import h1 from '@/components/h1.vue'
import h2 from '@/components/h2.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/hi', //跳转专用
            name: 'hi',
            component: HI,
            children: [{
                    path: 'h1',
                    name: 'h1',
                    component: h1
                },
                {
                    path: 'h2',
                    name: 'h2',
                    component: h2
                }
            ]
        }
    ]
})