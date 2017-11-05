import envConfig from '@/config'
import axios from 'axios'

const http = axios.create({
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

function getPromiseObject(reqUrl, reqData) {
    return new Promise((resolve, reject) => {
        // post 请求
        if(reqData) {
            http.post(reqUrl, reqData).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        }
    })
}

/**
 * 获取付款单类型列表
 * 
 * @param {any} reqData 
 * @returns 
 */
exports.getPaymentBillTypeList = (reqData) => {
    return getPromiseObject(`/payType/find`, reqData)
}

/**
 * 删除付款单类型数据
 * 
 * @param {any} reqData 
 * @returns 
 */
exports.deletePayType = (reqData) => {
    return getPromiseObject(`/payType/remove`, reqData)
}

/**
 * 新增付款单类型
 * 
 * @param {any} reqData 
 * @returns 
 */
exports.addPayType = (reqData) => {
    return getPromiseObject(`/payType/save`, reqData)
}

/**
 * 修改付款单类型
 * 
 * @param {any} exports 
 */
exports.modifyPayType = (reqData) => {
    return getPromiseObject(`/payType/modify`, reqData)
}

