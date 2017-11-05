import * as paymentBillConst from './billingConst'

export default {
    state: {
        
    },
    getters: {
        [paymentBillConst.Billing_G_GET_HANDLE_DATA]: state => state.Billing || []
    },
    actions: {
        // [paymentBillConst.Billing_M_ADD_HANDLE_DATA]: ({ satte, commit }, payload) => {
        //     commit("paymentBillConst.Billing_M_ADD_HANDLE_DATA", payload)
        // }
    },
    mutations: {
        [paymentBillConst.Billing_M_ADD_HANDLE_DATA] (state, payload) {
            console.log(state, payload, 'payload from mutation')
            state.Billing = Object.assign(state.Billing, payload)
        }
    }
}
