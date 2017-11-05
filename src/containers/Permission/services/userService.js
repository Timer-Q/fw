import axios from 'axios'

const baseURL_ucenter = 'http://192.168.177.151:8085/service-ucenter'
const baseURL_permission = 'http://192.168.177.111:8083/base-org-permission'
// const baseURL_permission = 'http://192.168.177.148:8083/base-org-permission' // 春福

export const initialUserTableList = function (data, params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/findUserListByPage`
        axios({
            method: 'post',
            url: url,
            data: data,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 用户启用停用
export const userEnable = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/enable`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}
export const userDisable = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/disabled`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 用户锁定解锁
export const lock = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/lock`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}
export const unlock = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/unlock`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}
// 重置密码
export const resetPassword = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/resetPassword`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 删除用户
export const deleteUser = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/delete`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// useradd 用户模板
export const getRegisterSource = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/registerSource`
        axios({
            method: 'post',
            url: url
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取所属组织列表
export const initialOrg = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getRolePermission`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取全部角色和已选角色
export const getRoleTree = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getRoleTree`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取全部注册来源
export const registerSource = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/registerSource`
        axios({
            method: 'post',
            url: url
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取角色下的权限
export const getRolePermission = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getRolePermission`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取添加功能权限弹窗
export const getUserFuncTree = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getUserFuncTree`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取添加组织权限弹窗 
export const getUserOrgTree = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getUserOrgTree`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 新增用户
export const insertUser = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/insertUser`
        axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

/********************用户详情、修改**************************/
// 获取用户信息
export const getUserInfo = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_ucenter}/user/getUserInfo`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取用户功能权限
export const getUserFuncList = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getUserFuncList`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取用户组织权限
export const getUserOrgList = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getUserOrgList`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取用户数据权限
export const getUserDataLis = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getUserDataLis`
        axios({
            method: 'post',
            url: url,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取用户数据权限
export const userRoleList = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/userRoleList`
        axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 修改用户
export const updateUser = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/updateUser`
        axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}