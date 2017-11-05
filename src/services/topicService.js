/*
 * 商品管理
 * */
import config from '../config'
import axios from 'axios'

export default {
    search(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/topic/search?message=${data}`
            axios.get(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    delete(id) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/topic/delete/${id}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    forbidden(user_id, number) {
        console.log(user_id)
        console.log(number)
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/topic/forbidden/${user_id}/${number}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    reply(data) {
        console.log(data)
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/topic/reply`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    detail(topic_id) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/topic/detail/${topic_id}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
    // productDetectionRelationAdd(data){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/productDetectionRelation/add`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
    // productDetectionRelationUpdate(data){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/productDetectionRelation/update`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },

    // onlineStatus(id, status){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/onlineStatus/${id}/${status}`
    //         axios.get(url)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
    // update(data){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/update`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })

    // },
    // detail(id){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/detail/${id}`
    //         axios.get(url)
    //         .then(function (data) {
    //             resolve(data)
    //         })
    //         .catch(function (error) {
    //              reject(error)
    //         })
    //     })

    //  },


    // findByName(name){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/findByName?message=${name}`
    //         axios.get(url)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
    // findByName(barcode){
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/hasBarcode?message=${barcode}`
    //         axios.get(url)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // }
}
