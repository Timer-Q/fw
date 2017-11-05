import axios from 'axios'
import config from '@/config/index.js'

export default{
    //待处理
    getCommodityl(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //全部
    cpwhole(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已分配
    cpallocation(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //分配失败
    cpfailed(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已接单
    cpreceord(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已撤回
    cpdrawn(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已拒接
    cprejected(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //超时未接
    cptimeout(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已取消
    cpcanceled(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/order/getList`
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
