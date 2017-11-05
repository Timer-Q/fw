import config from '@/config'
import axios from 'axios'
export default{
    addB2bCanalAll(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/addB2bCanalAll`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getB2bCanalById(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getB2bCanalById/${data}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getListB2bCanalsByPage(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/page/getListB2bCanalsByPage`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getB2bCanalById(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getB2bCanalById/${data.id}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    delB2bCanal(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/delB2bCanal`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    updateB2bCanal(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/updateB2bCanal`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },


}
