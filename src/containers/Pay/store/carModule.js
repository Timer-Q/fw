import * as carConst from './carConst.js'

export default {
    state: {
        //个人收银台-订单信息
        orderInfo: {},
        //企业收银台-订单信息
        companyOrderInfo: {},
        //企业用户管理-企业进件-支付渠道信息
        payChannelInfo: [],
        //企业用户管理-企业进件-组织机构信息
        organizationInfo: {}
    },
    mutations: {
        [carConst.Pay_CHECKOUTCOUNTER_M_ORDERINFO](state, payload) {
            state.Pay.orderInfo = {...payload}
        },
        [carConst.Pay_COMPANYCHECKOUTCOUNTER_M_ORDERINFO](state, payload) {
            state.Pay.companyOrderInfo = {...payload}
        },
        [carConst.Pay_COMPANY_M_PAYCHANNELINFO](state, payload) {
            state.Pay.payChannelInfo = [...payload]
        },
        [carConst.Pay_COMPANY_M_ORGANIZATIONINFO](state, payload) {
            state.Pay.organizationInfo = {...payload}
        }
    },
    actions: {
        async [carConst.Pay_CHECKOUTCOUNTER_A_ORDERINFO]({dispatch, commit}, {cashier, parameter, next}) {
            try {
                const {data} = await cashier(parameter)
                if (data.status.statusCode === 0) {
                    await commit(carConst.Pay_CHECKOUTCOUNTER_M_ORDERINFO, data.result)
                } else {
                    console.log(data.status.statusReason)
                }
                await next()
            } catch (err) {
                console.log(err)
            }
        },
        async [carConst.Pay_COMPANYCHECKOUTCOUNTER_A_ORDERINFO]({dispatch, commit}, {cashier, parameter, next}) {
            try {
                const {data} = await cashier(parameter)
                if (data.status.statusCode === 0) {
                    await commit(carConst.Pay_COMPANYCHECKOUTCOUNTER_M_ORDERINFO, data.result)
                } else {
                    console.log(data.status.statusReason)
                }
                await next()
            } catch (err) {
                console.log(err)
            }
        }
    }
}
