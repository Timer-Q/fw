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
    saveContractTermLibrary(data) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/terms/saveContractTermLibrary`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    updateContractTermLibrary(data) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/terms/updateContractTermLibrary`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getContractTermLibrary(params) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/terms/${params}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getSpecialItem(params, data) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/items/${params}`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getContractTermLibraryByCode(params) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/terms/${params}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    setTermLibraryStatus(params) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/terms/${params}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
}
