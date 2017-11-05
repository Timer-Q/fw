/*
* 厂商管理
* */
import config from '../config'
import axios from 'axios'

export default {
    add(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/enterprise/add`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    update(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/enterprise/update`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    search(message){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/enterprise/search?message=${message}`
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
