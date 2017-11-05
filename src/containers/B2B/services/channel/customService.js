import config from '@/config'
import axios from 'axios'
export default{
    getB2bListMerchant(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getB2bListMerchant`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getB2bMerchant(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getB2bMerchant`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getListB2bCanalsByPOJO(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getListB2bCanalsByPOJO`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    changeB2bCanalMerchant(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/changeB2bCanalMerchant`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    addB2bCanalMerchantBatch(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/addB2bCanalMerchantBatch`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    delB2bCanalMerchantBycanal(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/delB2bCanalMerchantBycanal`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },


}
