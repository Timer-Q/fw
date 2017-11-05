import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/***引入主系统操作***/
import mainModule from './mainModule.js'
import loginAndPermissionModule from './loginAndPermissionModule.js'

/***引入各业务系统操作***/
import Billing from '@Billing/store/index.js'
import B2B from '@B2B/store/index.js'
import Permission from '@Permission/store/index.js'
import Pay from '@Pay/store/index.js'

/***创建Vuex实例***/
const store = new Vuex.Store({
    state: {
        ...mainModule.state,
        ...loginAndPermissionModule.state,
        ...B2B.state,
        ...Billing.state,
        ...Permission.state,
        ...Pay.state,
    },
    getters: {
        ...mainModule.getters,
        ...loginAndPermissionModule.getters,
        ...B2B.getters,
        ...Billing.getters,
        ...Permission.getters,
        ...Pay.getters,
    },
    mutations: {
        ...mainModule.mutations,
        ...loginAndPermissionModule.mutations,
        ...B2B.mutations,
        ...Billing.mutations,
        ...Permission.mutations,
        ...Pay.mutations,
    },
    actions: {
        ...mainModule.actions,
        ...loginAndPermissionModule.actions,
        ...B2B.actions,
        ...Billing.actions,
        ...Permission.actions,
        ...Pay.actions,
    }
})

export default store
