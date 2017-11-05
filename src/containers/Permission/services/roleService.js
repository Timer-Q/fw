import axios from 'axios'

const baseURL = 'http://192.168.177.111:8083/base-org-permission'
// const baseURL = 'http://192.168.171.90:8083/base-org-permission'

// const baseURL = 'http://192.168.177.148:8083/base-org-permission' // 春福

// /**
//  * 拼接对象为请求字符串
//  * @param {Object} obj - 待拼接的对象
//  * @returns {string} - 拼接成的请求字符串
//  */
// export function encodeSearchParams(obj) {
//     const params = []

//     Object.keys(obj).forEach((key) => {
//       let value = obj[key]
//       // 如果值为undefined我们将其置空
//       if (typeof value === 'undefined') {
//         value = ''
//       }
//       // 对于需要编码的文本（比如说中文）我们要进行编码
//       params.push([key, encodeURIComponent(value)].join('='))
//     })

//     return params.join('&')
// }

// 获取角色列表
export const getRoleTableList = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getRoleByOrg`
        axios.post(url, data)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

// 获取角色组织
export const getRoleOrgTree = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getOrgTree`
        axios.post(url, data)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

// 获取角色信息
export const initialRoleMsg = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getRolePermission`
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

// 获取角色下的用户
export const initialRoleUsers = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getRoleUsers`
        axios({
            method: 'post',
            url: url,
            params: data
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 调整用户时效
export const selectUserExpire = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/selectUserExpire`
        axios({
            method: 'post',
            url: url,
            params: data
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}
// 调整用户时效确认
export const adjustUserExpire = function (data) {
    console.log()
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/adjustUserExpire`
        axios({
            method: 'post',
            url: url,
            params: data
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 角色的功能权限
export const getRolePermission = function (params) {
    console.log()
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getRolePermission`
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

// 新增或者更新角色
export const updateBasePermissionRole = function (data) {
    console.log()
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/updateBasePermissionRole`
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

// 调整用户时间弹窗树
export const getUserTree = function (params) {
    console.log()
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getUserTree`
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
// 批量调整用户确定
export const batchUserRoleCreate = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/batchUserRoleCreate`
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