import config from '@/config'
import axios from 'axios'

export default {
    listCompanyOpenAccountInfoByPage(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/companyOpenAccountInfo/listCompanyOpenAccountInfoByPage`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}
