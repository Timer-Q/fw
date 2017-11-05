import * as mainConst from './mainConst.js'

export default {
    state: {
        // 一级Tab导航数据集合
        navTabData: [],
        // 控制路由同级的Iframe的显示隐藏
        showIframe: false,
        // 进入的系统给的url
        system:''
    },
    getters: {
        [mainConst.G_GET_NAVTABDATA](state, getters){
            return state.navTabData
        }
    },
    mutations: {
        // 一级tab处理
        [mainConst.M_UPDATE_NAVTABDATA](state, payload){
            const index = payload.navIndex
            state.navTabData.forEach((item)=> {
                item.active = false
            })

            // 当你利用索引直接设置一个项时是不能触发视图的从新渲染的,下面是老方法和解决办法
            // state.navTabData[index].active=true
            let newItem = Object.assign({}, state.navTabData[index], {active: true})
            // console.log(newItem, 'store newItem')
            state.navTabData.splice(index, 1, newItem)
        },
        [mainConst.M_PUSH_NAVTABDATA] (state, payload) {
            state.navTabData.push(payload)
        },
        [mainConst.M_DELETE_NAVTABDATA] (state, payload) {
            state.navTabData.splice(payload.navIndex, 1)
        },
        // Iframe切换处理
        [mainConst.M_SHOW_IFRAME] (state, payload) {
            state.showIframe = true
        },
        [mainConst.M_HIDE_IFRAME] (state, payload) {
            state.showIframe = false
        },
        // 设置全局system变量
        [mainConst.M_SET_SYSTEMURL] (state, payload) {
            state.system=payload
        }
    },
    actions: {
        // actions的最终功能是修改state，但是它不直接修改state，而是调用mutations
        // async [aboutConst.A_REQUEST_DATA]({dispatch,commit}) {
        //     commit(aboutMutations.REQUEST_LOADING)
        //     await service.getMovieListData('{"movieType":"in_theaters","pageIndex":2,"start":0,"count":10}')
        //     console.log(333333)
        //     await function(){setTimeout(function () {
        //         commit(aboutMutations.REQUEST_FAILD)
        //     },6000)}()
        //     console.log(66666)
        // }

        // actions的最终功能是修改state，但是它不直接修改state，而是调用mutations
        // async [aboutConst.A_REQUEST_DATA]({dispatch,commit}) {
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
