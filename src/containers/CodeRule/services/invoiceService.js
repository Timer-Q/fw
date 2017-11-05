import envConfig from '@/config'
import axios from 'axios'

const http = axios.create({
    // baseURL: 'http://10.12.31.87:8010/billing-web' // hsh web
    // baseURL: 'http://10.12.31.87:8090/billing-server' // hsh server
    // baseURL: 'http://10.12.31.82:8010/billing-web/' // wy web
    baseURL: `${envConfig.server.http}${envConfig.server.host}:${envConfig.server.port}/billing-server/` // zn web
})
http.interceptors.request.use(config => {
    console.log(config, 'axios interceptors request data')
    // loadingInstance = Loading.service({
    //     fullscreen: true
    // })
    return config
}, error => {
    // loadingInstance.close()

    return Promise.reject(error)
})
http.interceptors.response.use(response => {
    console.log(response, 'axios inteceptors response data')
    // loadingInstance.close()
    // if (response.data.status.statusCode !== 0) {
    //     Message({
    //         showClose: true,
    //         message: response.data.status.statusReason,
    //         type: 'error'
    //     })
    // }
    // if (response.data.status.statusCode === 0) {
    //     Message({
    //         showClose: true,
    //         message: `${response.config.url} 请求成功`,
    //         type: 'info'
    //     })
    // }
    return response
}, error => {
    // loadingInstance.close()
    return Promise.reject(error)
})

export default {
    /**
     * 删除发票
     * 
     * @param {array} data 
     * @returns 
     */
    deleteInvoice(data) {
        return new Promise((resolve, reject) => {
            http.post('/invoiceInfo/deleteInvoice/', data)
                .then(res => resolve(res))
                .catch(error => reject(error))
        })
    },
    /**
     * 获取发票列表
     * 
     * @param {object} data 
     * @returns 
     */
    getInvoiceList(data) {
        return new Promise((resolve, reject) => {
            http.post('/invoiceInfo/invoiceQuery', data)
                .then(res => resolve(res))
                .catch(error => reject(error))
        })
    },
    getInvoiceListCount(data) {
        return new Promise((resolve, reject) => {
            http.post(`/invoiceInfo/invoiceCount`, { data })
                .then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}
