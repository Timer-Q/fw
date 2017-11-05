import billingModule from './billingModule.js'

/***导出Billing的东西***/

export default {
    state: {
        Billing:{
            ...billingModule.state
        }
    },
    getters: {
        ...billingModule.getters
    },
    mutations: {
        ...billingModule.mutations
    },
    actions: {
        ...billingModule.actions
    }
}
