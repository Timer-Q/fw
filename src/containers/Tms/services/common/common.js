/**
 * 公用服务管理
 */
import config from '@/config'
import axios from 'axios'

export default {


//根据code获取数据字典
    fetchDictionary(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/dictionary/search?dicCode=tms-`+data.code
            axios.get(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

//承运商
getCarryList(data){

    return new Promise(function (resolve, reject) {
        const url = `${config.server.http}${config.server.host}/tms-web/dependency/customer/getListOfCarrierByName?custName=`+data.custName
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
