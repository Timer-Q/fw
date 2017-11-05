import * as invoiceConst from './invoiceConst.js'

export default {
    state:{

    },
    getters: {
        [invoiceConst.Billing_G_GET_NAVTABDATA](state,getters){
            return state.navTabData
        }
    },
    mutations: {
        [invoiceConst.Billing_M_UPDATE_NAVTABDATA](state, payload){
            const index = payload.navIndex
            state.navTabData.forEach((item)=>{
                item.active = false
            })

            // 当你利用索引直接设置一个项时是不能触发视图的从新渲染的,下面是老方法和解决办法
            // state.navTabData[index].active=true
            let newItem=Object.assign({},state.navTabData[index],{active:true})
            state.navTabData.splice(index,1,newItem)
        },
        [invoiceConst.Billing_M_PUSH_NAVTABDATA] (state, payload) {
            state.navTabData.push(payload)
        },
        [invoiceConst.Billing_M_DELETE_NAVTABDATA] (state, payload) {
            state.navTabData.splice(payload.navIndex, 1)
        }
    },
    actions: {
        // actions的最终功能是修改state，但是它不直接修改state，而是调用mutations
        // async [aboutConst.Billing_A_REQUEST_DATA]({dispatch,commit}) {
        //     commit(aboutMutations.REQUEST_LOADING)
        //     await service.getMovieListData('{"movieType":"in_theaters","pageIndex":2,"start":0,"count":10}')
        //     console.log(333333)
        //     await function(){setTimeout(function () {
        //         commit(aboutMutations.REQUEST_FAILD)
        //     },6000)}()
        //     console.log(66666)
        // }

        // actions的最终功能是修改state，但是它不直接修改state，而是调用mutations
        // async [aboutConst.Billing_A_REQUEST_DATA]({dispatch,commit}) {
        //     commit(aboutMutations.REQUEST_LOADING)
        //     await service.getMovieListData('{"movieType":"in_theaters","pageIndex":2,"start":0,"count":10}')
        //     console.log(333333)
        //     await function(){setTimeout(function () {
        //         commit(aboutMutations.REQUEST_FAILD)
        //     },6000)}()
        //     console.log(66666)
        // }
    }
}
