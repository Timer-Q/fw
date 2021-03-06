import config from '@/config'
import axios from 'axios'

export default {
    listChannelInfo(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-service/channelInfo/listChannelInfo`
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
