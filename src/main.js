import Vue from 'vue'
/***引入全局通用过滤器***/
import '@/filters/index.js'
/***引入指令文件***/
import '@/directives/index.js'
/***引入全局通用组件***/
import '@/components/UIComponents.js'
/*** 引用plugins ***/
import '@/plugins'
/***引入路由文件***/
import router from '@/router/router.js'
/***引入vuex文件***/
import store from '@/store/store.js'
/***引入入口页面***/
import AppContainer from '@/containers/AppContainer.vue'

/***引入公共样式文件***/
// 引入全局样式文件
import '@/asserts/styles/global.scss'
import '@/asserts/styles/const.scss'
// 引入全局媒体查询文件
// import '@/asserts/styles/media.scss'
// 引入Pay的公共样式文件
import '@/asserts/styles/Pay/index.scss'
// 引入Crm的公共样式文件
import '@/asserts/styles/Crm/crm.scss'
// 引入权限的公共样式文件
import '@/asserts/styles/Permission/index.scss'
// 引入Tms的公共样式文件
//import '@/asserts/styles/Tms/index.scss'
// 引入B2B的公公样式文件
import '@/asserts/styles/B2B/index.scss'


/***引入tooltip插件***/
// 引入tooltip插件
import tooltip from './plugins/tooltip'
Vue.use(tooltip)

/***创建根实例***/
const app = new Vue({
    data: {
        bus: new Vue()
    },
    store,
    router,
    render: h => h(AppContainer),
}).$mount('#app')


// new Vue({
//     el:'#app',
//     render: h => h(App)
// })
