import axios from 'axios'

const baseURL = 'http://192.168.177.111:8083/base-org-permission'

export const getListBasePermissionManagementsByPOJO = function () {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/getListBasePermissionManagementsByPOJO`
        axios.post(url, {})
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export const updateBasePermissionManagement = function (data) {
    return new Promise(function (resolve, reject) {
        const url = `${baseURL}/updateBasePermissionManagement`
        axios.post(url, data)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}