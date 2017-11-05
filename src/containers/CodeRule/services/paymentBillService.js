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

export default {
    /**
     * 查询付款单列表
     *
     * @param {object} reqData {rootOrgId: Number, pageNum: Number, pageSize: Number}
     * @returns {promise}
     */
    getPaymentBillList(reqData) {
        return getPromiseObject('/pay/findPayViewDTOList', reqData)
    },
    /**
     * 根据id查询表头和表体信息
     *
     * @param {array} reqData
     * @returns 查询出的表头和表体信息
     */
    getDataById(reqData) {
        return getPromiseObject('/pay/getPayInfoById', reqData)
    },
    /**
     * 根据id删除付款单数据
     *
     * @param {object} reqData
     * @returns 删除结果
     */
    deleteById(reqData) {
        return getPromiseObject('/pay/deletePayInfo', reqData)
    },
    /**
     * 根据 id 提交订单
     *
     * @param {object} reqData
     * @returns 提交结果
     */
    submitById(reqData) {
        return getPromiseObject('/pay/submit', reqData)
    },
    /**
     * 根据 id 收回订单
     *
     * @param {object} reqData
     * @returns 收回结果
     */
    takebackById(reqData) {
        return getPromiseObject('/pay/takeback', reqData)
    },
    /**
     * 根据 id 审批订单
     *
     * @param {object} reqData
     * @returns 审批结果
     */
    approveById(reqData) {
        return getPromiseObject('/pay/approve', reqData)
    },
    /**
     * 根据 id 驳回订单
     *
     * @param {object} reqData
     * @returns 驳回结果
     */
    rejectById(reqData) {
        return getPromiseObject('/pay/reject', reqData)
    },
    /**
     * 新增操作
     *
     * @param {object} formData
     * @returns 新增结果
     */
    createWithoutSource(formData) {
        return getPromiseObject('/pay/createWithoutSource', formData)
    },
    /**
     * 修改操作
     *
     * @param {object} formData
     * @returns 修改结果
     */
    createWithSource(formData) {
        return getPromiseObject('/pay/createWithSource', formData)
    },
    /**
     * 根据 id 作废订单
     *
     * @param {object} reqData {id, invalidReason}
     * @returns
     */
    invalidById(reqData) {
        return getPromiseObject('/pay/invalid', reqData)
    },
    /**
     * 根据 id 挂起订单
     *
     * @param {any} reqData
     * @returns
     */
    suspendById(reqData) {
        return getPromiseObject('/pay/suspend', reqData)
    },
    /**
     * 根据 id 取消挂起订单
     *
     * @param {any} reqData
     * @returns
     */
    cancleSuspendById(reqData) {
        return getPromiseObject('/pay/cancelSuspend', reqData)
    },
    /**
     * 根据失败 id 的 list 查询失败的信息
     * 
     * @param {any} reqData 
     * @returns 
     */
    getFailedData(reqData) {
        return getPromiseObject('/pay/getErrorIdList', reqData)
    }
}
