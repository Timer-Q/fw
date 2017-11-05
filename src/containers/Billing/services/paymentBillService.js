import { getPromiseObject } from './createHttp'

export default {
    /**
     * 查询付款单列表
     *
     * @param {object} reqData {rootOrgId: Number, pageNum: Number, pageSize: Number}
     * @returns {promise}
     */
    getPaymentBillList (reqData) {
        return getPromiseObject('/pay/findPayViewDTOList', reqData)
    },
    /**
     * 根据id查询表头和表体信息
     *
     * @param {array} reqData
     * @returns 查询出的表头和表体信息
     */
    getDataById (reqData) {
        return getPromiseObject('/pay/getPayInfoById', reqData)
    },
    /**
     * 根据id删除付款单数据
     *
     * @param {object} reqData
     * @returns 删除结果
     */
    deleteById (reqData) {
        return getPromiseObject('/pay/deletePayInfo', reqData)
    },
    /**
     * 根据 id 提交订单
     *
     * @param {object} reqData
     * @returns 提交结果
     */
    submitById (reqData) {
        return getPromiseObject('/pay/submit', reqData)
    },
    /**
     * 批量提交
     * 
     * @param {any} ids 
     * @returns 
     */
    submitBatch (ids) {
        return getPromiseObject('/pay/submitBatch', ids)
    },
    /**
     * 根据 id 收回订单
     *
     * @param {object} reqData
     * @returns 收回结果
     */
    takebackById (reqData) {
        return getPromiseObject('/pay/takeback', reqData)
    },
    /**
     * 根据 id 审批订单
     *
     * @param {object} reqData
     * @returns 审批结果
     */
    approveById (reqData) {
        return getPromiseObject('/pay/approve', reqData)
    },
    /**
     * 批量审批
     * 
     * @param {any} ids 
     * @returns 
     */
    approveBatch (ids) {
        return getPromiseObject('/pay/approveBatch', ids)
    },
    /**
     * 根据 id 取消审批
     * 
     * @param {any} id 
     * @returns 
     */
    cancleApproveById (id) {
        return getPromiseObject('/pay/cancelApprove', id)
    },
    /**
     * 根据 id 驳回订单
     *
     * @param {object} reqData
     * @returns 驳回结果
     */
    rejectById (reqData) {
        return getPromiseObject('/pay/reject', reqData)
    },
    /**
     * 新增操作
     *
     * @param {object} formData
     * @returns 新增结果
     */
    createWithoutSource (formData) {
        return getPromiseObject('/pay/createWithoutSource', formData)
    },
    /**
     * 修改操作
     *
     * @param {object} formData
     * @returns 修改结果
     */
    createWithSource (formData) {
        return getPromiseObject('/pay/createWithSource', formData)
    },
    /**
     * 根据 id 作废订单
     *
     * @param {object} reqData {id, invalidReason}
     * @returns
     */
    invalidById (reqData) {
        return getPromiseObject('/pay/invalid', reqData)
    },
    /**
     * 根据 id 挂起订单
     *
     * @param {any} reqData
     * @returns
     */
    suspendById (reqData) {
        return getPromiseObject('/pay/suspend', reqData)
    },
    /**
     * 根据 id 取消挂起订单
     *
     * @param {any} reqData
     * @returns
     */
    cancleSuspendById (reqData) {
        return getPromiseObject('/pay/cancelSuspend', reqData)
    },
    /**
     * 根据失败 id 的 list 查询失败的信息
     * 
     * @param {any} reqData 
     * @returns 
     */
    getFailedData (reqData) {
        return getPromiseObject('/pay/getErrorIdList', reqData)
    },
    /**
     * 支付
     * 
     * @param {any} id 
     * @returns 
     */
    pay (id) {
        return getPromiseObject('/pay/pay', id)
    }
}
