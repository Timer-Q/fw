import * as paymentBillConst from './billingConst'

export default {
    state: {

    },
    getters: {
        // 获取需要处理的表格数据 或 id[s]
        [paymentBillConst.Billing_G_GET_HANDLE_DATA]: state => state.Billing || [],
        // 获取核销数据
        [paymentBillConst.Billing_G_GET_VERIFICATION]: (state, getters) => {
            console.log(state, 'hexiao getters state')
            return state.verification
        }
    },
    actions: {
        // [paymentBillConst.Billing_M_ADD_HANDLE_DATA]: ({ satte, commit }, payload) => {
        //     commit("paymentBillConst.Billing_M_ADD_HANDLE_DATA", payload)
        // }
    },
    mutations: {
        // 表格数据 mutations
        [paymentBillConst.Billing_M_ADD_HANDLE_DATA] (state, payload) {
            console.log(state, payload, 'payload from mutation')
            state.Billing = Object.assign(state.Billing, payload)
        },
        // 核销数据 mutations
        [paymentBillConst.Billing_M_ADD_VERIFICATION] (state, payload) {
            console.log(state, payload, 'hexiao mutation data')
            state.verification = payload
        }
    }
}
