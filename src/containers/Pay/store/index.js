import carModule from './carModule.js'

export default {
    state: {
        Pay:{
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
