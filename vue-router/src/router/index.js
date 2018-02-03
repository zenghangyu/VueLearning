import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HI from '@/components/HI.vue'
import h1 from '@/components/h1.vue'
import h2 from '@/components/h2.vue'
import params from '@/components/params.vue'
import alia from '@/components/alia.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            components: {
                default: HelloWorld,
                left: h1,
                right: h2
            }
        },
        {
            path: '/gohome',
            redirect: '/'
        }, {
            path: '/HI', //跳转专用
            // name: 'hi',拥有子路由的name无效果
            component: HI,
            children: [{
                    path: '/',
                    name: 'hi',
                    component: HI
                }, {
                    path: '/HI/h1',
                    name: 'h1',
                    component: h1
                },
                {
                    path: '/HI/h2',
                    name: 'h2',
                    component: h2
                }
            ]
        }, {
            path: '/params/:newsId(\\d+)/:newsTitle',
            component: params
        },
        {
            path: '/goparams/:newsId(\\d+)/:newsTitle',
            redirect: '/params/:newsId(\\d+)/:newsTitle'
        },
        {
            path: '/alias',
            component: alia,
            alias: '/zenghy'
        }
    ]
})