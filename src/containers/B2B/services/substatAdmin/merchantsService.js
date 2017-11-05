/**
 * 商户管理
 */
import config from '@/config'
import axios from 'axios'
export default {
    // 获取商户data
    getListMerchantsByPage(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/merchant/page/getListMerchantsByPage`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 获取商户基本/资质信息
    getByMerchantId(merchantId){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/merchant/getByMerchantId/${merchantId}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 获取商户门店信息
    getStoreByMerchantId(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/listByMerchantId`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 获取商户经销商信息
    getDealerByMerchantId(merchantId){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/dealer/dealerListByMerchantId?merchantId=${merchantId}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 启动/停用
    updateEnableOrDisable(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/merchant/enableOrDisable`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 重置密码
    passReset(userId){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/passReset?useId=${userId}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 添加登录手机
    addUser(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/addUser`
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
