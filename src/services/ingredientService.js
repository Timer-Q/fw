/*
* 成分管理
* */
import config from '../config'
import axios from 'axios'

export default {
    add(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/ingredient/add`
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
            const url = `${config.server.http}${config.server.host}/ingredient/update`
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
            const url = `${config.server.http}${config.server.host}/ingredient/detail/${id}`
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
            const url = `${config.server.http}${config.server.host}/ingredient/search?message=${message}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    findByName(name){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/ingredient/findByName?message=${name}`
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
