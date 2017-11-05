import config from '@/config'
import axios from 'axios'
export default{
    getListB2bBrandSellareasByPage(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/page/getListB2bBrandSellareasByPage`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    /*首页删除品牌*/
    delB2bBrandSellareas(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/delB2bBrandSellareas`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    /*增加品牌*/
    addB2bBrandSellarea(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/addB2bBrandSellarea`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getIRegionManageBySupplierId(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/getIRegionManageBySupplierId?supplierId=${data}`
            axios.post(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getBrandNameByDealerId(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/b2b-seller-admin/page/getBrandNameByDealerId`
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
