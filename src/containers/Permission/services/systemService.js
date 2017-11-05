import axios from 'axios'
const baseURL_permission = 'http://192.168.177.111:8083/base-org-permission'

// 获取系统配置列表
export const getGroupFuncTree = function (params) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/getGroupFuncTree`
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


// 更新系统配置列表
export const updateGroupFunc = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL_permission}/updateGroupFunc`
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