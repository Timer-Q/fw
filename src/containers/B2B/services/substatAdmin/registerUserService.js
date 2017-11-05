/**
 * 注册用户审核
 */
import config from '@/config'
import axios from 'axios'

export default {

    // 获取注册用户审核列表
    getRegisterUserList(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/merchant/auditMerchantsList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 获取注册用户审核详情
    getMerchantAuditDetailById(id) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/merchant/merchantAuditDetail/${id}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    merchantAudit(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/merchant/merchantAudit`
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
