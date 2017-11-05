import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes.js'

// 创建路由对象
const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

router.beforeEach((to, from, next) => {
    // to.meta.keepAlive = true

    next()
})

router.afterEach(route => {
})

export default router
