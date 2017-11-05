/**
 * 公共
 */
import config from '@/config'
import axios from 'axios'
export default {
    // 获取审核不通过原因数据字典
    getListB2bSyscodesByPOJO(type){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/getListB2bSyscodesByPOJO`
            axios.post(url,{'type':type})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}
