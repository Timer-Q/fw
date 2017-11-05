import * as loginAndPermissionConst from './loginAndPermissionConst.js'
export default {
    state: {
        // 登录之后的三级菜单权限和用户信息
        userAuthor:{},
        // 三级菜单列表
        funcMenuList:[]
    },
    getters: {

    },
    mutations: {
        // 设置登录之后的三级菜单权限和用户信息
        [loginAndPermissionConst.M_SET_USERAUTHOR] (state, payload) {
            state.userAuthor=payload
            state.funcMenuList=payload.menus.funcs
        },
    },
    actions: {
    }
}
