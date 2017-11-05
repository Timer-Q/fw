import config from '@/config'
import axios from 'axios'
export default{
    getBaseGoods(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getBaseGoods`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listGoodsCategory(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/listGoodsCategory/${data}`
            axios.get(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    findByIdsAndKeyword(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/findByIdsAndKeyword`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    addB2bCanalStoreBatch(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/addB2bCanalStoreBatch`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    setB2bCanalStoreUpOrDown(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/setB2bCanalStoreUpOrDown`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    delB2bCanalStoreBatchs(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/delB2bCanalStoreBatchs`
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
