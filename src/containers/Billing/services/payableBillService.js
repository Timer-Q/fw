/**
 * 应付单接口
 */
import { getPromiseObject } from './createHttp.js'

export default {
    /**
     * 获取应付单列表
     * @param  {object} reqData 请求参数
     * @return {promise}        返回promise对象
     */
    getBillList (reqData) {
        return getPromiseObject('/payableInfo/find', reqData)
    },
    /**
     * 通过 id 获取单条应付单
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    getBillById (id) {
        return getPromiseObject('/payableInfo/get', id)
    },
    /**
     * 根据 id 删除应付单
     *
     * @param {any} id
     * @returns
     */
    deleteBillById (id) {
        return getPromiseObject('/payableInfo/remove', id)
    },
    /**
     * 根据 id ，将应付单状态改为【提交】状态
     *
     * @param {any} id
     * @returns
     */
    submitBillById (id) {
        return getPromiseObject('/payableInfo/submmit', id)
    },
    /**
     * 批量提交接口
     *
     * @param {any} ids
     * @returns
     */
    submitBatch (ids) {
        return getPromiseObject('/payableInfo/submitBatch', ids)
    },
    /**
     * 根据 id ，将应付单状态改为【收回】状态
     *
     * @param {any} id
     * @returns
     */
    takebackBillById (id) {
        return getPromiseObject('/payableInfo/takeback', id)
    },
    /**
     * 根据 id ，将应付单状态改为【审批】状态
     *
     * @param {any} id
     * @returns
     */
    approveBillById (id) {
        return getPromiseObject('/payableInfo/approve', id)
    },
    /**
     * 批量 审批
     *
     * @param {any} ids
     * @returns
     */
    approveBatch (ids) {
        return getPromiseObject('/payableInfo/approveBatch', ids)
    },
    /**
     * 根据 id ，将应付单状态改为【驳回】状态
     *
     * @param {any} reqData
     * @returns
     */
    rejectBillById (reqData) {
        return getPromiseObject('/payableInfo/reject', reqData)
    },
    /**
     * 根据 id ，将应付单状态改为【弃审】状态
     *
     * @param {any} id
     * @returns
     */
    cancelApproveBillById (id) {
        return getPromiseObject('/payableInfo/cancelApprove', id)
    },
    /**
     * 根据 id ，将应付单状态改为【作废】状态
     *
     * @param {any} reqData
     * @returns
     */
    invalidBillById (reqData) {
        return getPromiseObject('/payableInfo/invalid', reqData)
    },
    /**
     * 根据 id ，将应付单状态改为【取消挂起】状态
     *
     * @param {any} id
     * @returns
     */
    cancelSuspendBillById (id) {
        return getPromiseObject('/payableInfo/cancelSuspend', id)
    },
    /**
     * 根据 id ，将应付单状态改为【挂起】状态
     *
     * @param {any} id
     * @returns
     */
    suspendBillById (id) {
        return getPromiseObject('/payableInfo/suspend', id)
    },
    /**
     * 根据 id ，将应付单状态改为【挂起】状态
     *
     * @param {any} id
     * @returns
     */
    modifyData (formData) {
        return getPromiseObject('/payableInfo/modify', formData)
    },
    /**
     * 新增 无源
     *
     * @param {any} formData
     * @returns
     */
    newBill (formData) {
        return getPromiseObject('/payableInfo/createWithoutSource', formData)
    },
    /**
     * 支付
     *
     * @param {any} id
     * @returns
     */
    payBill (id) {
        return getPromiseObject('/payableInfo/pay', id)
    },
    /**
     * 获取应付单编码
     *
     * @param {any} reqData
     * @returns
     */
    getBillCode (reqData) {
        return getPromiseObject('/payableInfo/code', reqData)
    },
    /**
     * 根据 id 列表 查询应付单
     *
     * @param {any} ids
     * @returns
     */
    getBillLIstByIds (ids) {
        return getPromiseObject('/payableInfo/getErrorIdList', ids)
    },
    /**
     * 红冲应付单
     *
     * @param {any} id
     * @returns
     */
    redRush (id) {
        return getPromiseObject('/payableInfo/redrush', id)
    },
    /**
     * 获取单据状态信息
     * 
     * @param {any} id 
     * @returns 
     */
    getBillStatus (id) {
        return getPromiseObject('/payableInfo/getStatus', id)
    },
    /**
     * 获取日志 接口
     * 
     * @param {any} id 
     * @returns 
     */
    getLogs (id) {
        return getPromiseObject('/payableInfo/getLogs', id)
    }
}
