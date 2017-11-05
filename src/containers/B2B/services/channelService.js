import config from '../../../config'
import axios from 'axios'
axios.defaults.headers['Content-Type']='application/json'
export default {
    add(url,data){
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}/brand/add`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },


    /*用async和await方法改写add*/
    //  add: async function(url,data){
    //      let result=await axios.post(url, data)
    //      return result
    // },
    update(url,data){
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}/brand/update`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    detail(url,data){
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}/brand/detail/${id}`
            axios.get(url,{params:data})
                .then(function (res) {
                    resolve(res)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },

    // detail: async function(url,id){
    //     let result=await axios.get(url,id )
    //     return result
    // },
    search(url,message){
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}/brand/search?message=${message}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    delete(url,data){
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}/brand/search?message=${message}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    delete_post(url,data){
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}/brand/search?message=${message}`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    }
}
