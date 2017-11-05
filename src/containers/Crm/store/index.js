import carModule from './carModule.js'

/***导出CRM的东西***/

export default {
    state: {
        Crm:{
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
