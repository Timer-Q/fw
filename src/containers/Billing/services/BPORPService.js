/**
 * 应付单红蓝对冲接口
 */

import { getPromiseObject } from "./createHttp.js"

export default {
    /**
     * 获取 核销前 蓝 应付单
     *
     * @param {any} reqData
     */
    getBluePayableBillList (reqData) {
        return getPromiseObject('/payableInfo/findForHandlerVerificationToBluePayable', reqData)
    },
    /**
     * 获取 核销前 红 应付单
     *
     * @param {any} reqData
     */
    getRedPayableBillList (reqData) {
        return getPromiseObject('/payableInfo/findForHandlerVerificationToRedPayable', reqData)
    },
    /**
     * 红蓝对冲 模拟核销 接口
     *
     * @param {any} reqData
     * @returns
     */
    BRORP (reqData) {
        return getPromiseObject('/payableInfo/simulateVerificationForBluePayableAndRedPayable', reqData)
    },
    /**
     * 红蓝对冲 核销
     * @param {*} reqData
     */
    BPORPVerification (reqData) {
        return getPromiseObject('/payableInfo/verificationForBluePayableAndRedPayable', reqData)
    },
    /**
     * 获取核销单列表
     * 
     * @param {any} reqData 
     * @returns 
     */
    getBPORPList (reqData) {
        return getPromiseObject('/verification/find', reqData)
    },
    /**
     * 获取冲销单详情
     * 
     * @param {any} id 
     * @returns 
     */
    getBPORPDetail (id) {
        return getPromiseObject('/verification/get', id)
    }
}
