import Vue from 'vue'
import Router from '@/router/my-router.js'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/comp1',
            name: 'comp1',
            component: () =>
                import ('@/components/comp1.vue'),
            children: [
                // {
                // path: '/childOne',
                //         name: 'childOne',
                //         component: () =>
                //             import ('@/components/childOne.vue')
                //     },
                {
                    path: 'childTwo',
                    name: 'childTwo',
                    component: { render(h) { return h('div', 'info-page') } }
                }
            ]
        }
    ]
})