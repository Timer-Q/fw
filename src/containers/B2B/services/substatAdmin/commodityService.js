/**
 * 商品管理
 */
import config from '@/config'
import axios from 'axios'

export default {

    // 获取商品列表
    getCommodityList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/goods/page/getListGoods`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 上下架操作
    goodsOnOffUpdate(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/goods/goodsOnOffUpdate`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 根据商品id获取商品详情
    getCommodityDetailBySKUId(skuId){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/goods/goodsDetail/${skuId}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 修改审批
    examineUpdateByStatus(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/goods/audit`
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
