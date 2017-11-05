import axios from 'axios'
const baseURL_ucenter = 'http://192.168.177.151:8085/service-ucenter'
// const baseURL_permission = 'http://192.168.170.69:8083/base-org-permission'
const baseURL_permission = 'http://192.168.177.111:8083/base-org-permission'

export const queryGroupInfoList = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/queryGroupInfoList`
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
export const addGroup = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/addGroup`
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
export const updateGroup = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/updateGroup`
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


export const groupDel = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/deleteGroup`
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
export const queryGroupById = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/queryGroupById`
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



export const groupUporDown = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/enableGroup`
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
export const getIndustryType = function ( ) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/industryType`
        axios({
            method: 'get',
            url: url
        }).then(res => {
            resolve(res)
        }).catch(function (error) {
            reject(error)
        })
    })
}
