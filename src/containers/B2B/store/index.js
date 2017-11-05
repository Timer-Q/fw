import tabsConst from './tabsModule.js'

/***导出B2B的东西***/

export default {
    state: {
        B2B:{
            ...tabsConst.state
        }
    },
    getters: {
        ...tabsConst.getters
    },
    mutations: {
        ...tabsConst.mutations
    },
    actions: {
        ...tabsConst.actions
    }
}
