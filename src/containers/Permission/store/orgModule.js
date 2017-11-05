import * as orgConst from './orgConst.js'

export default {
    state:{
        groupMsg: null
    },
    getters: {
        [orgConst.ORG_G_GET_GROUPMSG] (state,getters) {
            return state.org.groupMsg
        }
    },
    mutations: {
        [orgConst.ORG_M_SAVE_GROUPMSG] (state, payload) {
            state.org.groupMsg = payload
        }
    }
}
