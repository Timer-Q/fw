import axios from 'axios'

const baseURL = 'http://192.168.177.111:8083/base-org-permission'

export const getBlocParamsList = function (id) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getListBasePermissionGroupParamsByGroupId?groupId=${id}`
        axios.post(url)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export const saveTable = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/updateBasePermissionGroupParam`
        axios.post(url, data)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

// 获取所有集团
export const getGroupList = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/queryGroupInfoList`
        axios.post(url, data)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

// 根据集团id调取集团权限
export const getGroupFuncTree = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getGroupFuncTree`
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

// 根据集团id更新集团权限
export const updateGroupFunc = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/updateGroupFunc`
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