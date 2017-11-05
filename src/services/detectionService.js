/*
* 检测项管理
* */
import config from '../config'
import axios from 'axios'

export default {
    add(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/detection/add`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    update(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/detection/update`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    detail(id) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/detection/detail/${id}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    search(message) {
        let encodeMessage=encodeURI(message)
        encodeMessage=encodeMessage.replace(/\+/gm, '%2B')

        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/detection/search?message=${encodeMessage}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    findByName(message) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/detection/findByName?message=${message}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    }
}
