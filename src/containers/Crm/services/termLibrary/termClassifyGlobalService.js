// import config from '@/config'
import axios from 'axios'
axios.defaults.headers['Content-Type']='application/json;charset=utf-8'
const baseURL = `http://192.168.167.170:9015/crm-contract-server`//192.168.167.102

export default {
    getInitEnums(port) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/enum/${port}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getTermCategoryRootTree(params) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/termCategory/getTermCategoryRootTree?orgId=${params}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getContractTermCategoryByCondition(params) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/termCategory/getContractTermCategoryByCondition?${params}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    saveContractTermCategory(data) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/termCategory/saveContractTermCategory`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    delContractTermCategoryByID(params) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/termCategory/delContractTermCategoryByID?${params}`
            axios.get(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
}
