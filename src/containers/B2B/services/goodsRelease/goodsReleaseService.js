/**
 * 商品发布
 */
import config from '@/config'
import axios from 'axios'
export default {
    // 获取商品发布列表
    getGoodsList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/goods/list`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 获取单品详情
    getSKUDetailById(skuId){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/goods/detailS/${skuId}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 获取商品详情
    getSPUDetailById(spuId){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/goods/detailP/${spuId}`
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
