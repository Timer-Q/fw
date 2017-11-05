import axios from 'axios'
const baseURL_ucenter = 'http://192.168.177.151:8085/service-ucenter'
const baseURL_permission = 'http://192.168.177.111:8083/base-org-permission'
// const baseURL_permission = 'http://192.168.171.90:8083/base-org-permission'
export const initialAdminTableList = function (data, params) {
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

export const initialAdminOrg = function (params) {
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

export const initAdminAllGroupList = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getAdminGroupList`
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

export const addNewAdmin = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/insertAdminGroup`
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

export const updateAdmin = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/updateAdminGroup`
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

export const getAdminInfo = function (params) {
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


export const getAdminBloc = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getGroupListByAdminId`
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

// 删除管理员
export const deleteAdmin = function (params) {
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

// 调整单个集团管理时效
export const adjustAdminGroupExpire = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/adjustAdminGroupExpire`
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