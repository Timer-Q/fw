/*
 * 用户管理
 * */
import config from '../config'
import axios from 'axios'

export default {
    add(data) {
        console.log(data)
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/user/add`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    search(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/user/search?message=${data}`
            axios.get(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    specialUser() {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/user/specialUser`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    // productDetectionRelationAdd(data) {
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
    // productDetectionRelationUpdate(data) {
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
    // delete(id) {
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/delete/${id}`
    //         axios.get(url)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
    // onlineStatus(id, status) {
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
    // update(data) {
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
    // detail(id) {
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/detail/${id}`
    //         axios.get(url)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })

    // },

    // search(data) {
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/product/search?message=${data}`
    //         axios.get(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })

    // },
    // findByName(name) {
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
    // findByName(barcode) {
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
