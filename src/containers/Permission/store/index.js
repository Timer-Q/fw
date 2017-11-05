import permissionModule from './permissionModule.js'
import org from './orgModule.js'
/***导出B2B的东西***/

export default {
    state: {
        Permission:{
            ...permissionModule.state
        },
        org: {
            ...org.state
        }
    },
    getters: {
        ...permissionModule.getters,
        ...org.getters
    },
    mutations: {
        ...permissionModule.mutations,
        ...org.mutations
    },
    actions: {
        ...permissionModule.actions,
        ...org.actions
    }
}
