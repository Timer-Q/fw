/*
* 标签管理
* */
import config from '../config'
import axios from 'axios'

export default {
    add(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tag/add`
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
            const url = `${config.server.http}${config.server.host}/tag/update`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    detail(id){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tag/detail/${id}`
            axios.get(url)
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
            const url = `${config.server.http}${config.server.host}/tag/search?message=${message}`
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
