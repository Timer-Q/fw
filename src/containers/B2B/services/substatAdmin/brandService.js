/**
 * 品牌管理
 */
import config from '@/config'
import axios from 'axios'

export default {
    getListBrandsByPage(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/page/getListBrandsByPage`
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
