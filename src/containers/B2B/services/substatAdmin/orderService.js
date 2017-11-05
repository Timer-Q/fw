/**
 * 订单管理
 */
import config from '@/config'
import axios from 'axios'
export default {
    // 获取订单列表
    getOrderList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/orderList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 获取详情
    getOrderDetailByOrderNo(orderNo){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-admin/order/${orderNo}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}


