import carModule from './carModule.js'

/***导出Billing的东西***/

export default {
    state: {
        Billing:{
            ...carModule.state
        }
    },
    getters: {
        ...carModule.getters
    },
    mutations: {
        ...carModule.mutations
    },
    actions: {
        ...carModule.actions
    }
}
