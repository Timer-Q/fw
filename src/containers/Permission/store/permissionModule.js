import * as permissionConst from './permissionConst.js'

export default {
    state: {
        roleIdArr: null, // !!! 命名错误，应该是对象而不是数组，后期改
        adminMsgArr: null, // !!! 命名错误，应该是对象而不是数组，后期改
        userMsg: null
    },
    getters: {
        [ permissionConst.PER_G_GET_ROLEMESSAGE ] (state, getters) {
            return state.Permission.roleIdArr
        },
        [ permissionConst.PER_G_GET_ADMINMESSAGE ] (state, getters) {
            return state.Permission.adminMsgArr
        },
        [ permissionConst.PER_G_GET_USERMESSAGE ] (state, getters) {
            return state.Permission.userMsg
        }
    },
    mutations: {
        [ permissionConst.PER_M_SAVE_ROLEMESSAGE ] (state, payload) {
            state.Permission.roleIdArr = payload
            console.log(state.Permission, 11111111111111111)
        },
        [ permissionConst.PER_M_SAVE_ADMINMESSAGE ] (state, payload) {
            state.Permission.adminMsgArr = payload
        },
        [ permissionConst.PER_M_SAVE_USERMESSAGE ] (state, payload) {
            state.Permission.userMsg = payload
        }
    },
    actions: {
        // actions的最终功能是修改state，但是它不直接修改state，而是调用mutations
        // async [aboutConst.B2B_A_REQUEST_DATA]({dispatch,commit}) {
        //     commit(aboutMutations.REQUEST_LOADING)
        //     await service.getMovieListData('{"movieType":"in_theaters","pageIndex":2,"start":0,"count":10}')
        //     console.log(333333)
        //     await function(){setTimeout(function () {
        //         commit(aboutMutations.REQUEST_FAILD)
        //     },6000)}()
        //     console.log(66666)
        // }

        // actions的最终功能是修改state，但是它不直接修改state，而是调用mutations
        // async [aboutConst.B2B_A_REQUEST_DATA]({dispatch,commit}) {
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
