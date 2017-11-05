/**
 * 应付单类型接口
 * 2017年11月1日
 */
import { getPromiseObject } from './createHttp.js'

export default {
    /**
     * 查询 所有应付单类型
     * 
     * @param {any} reqData 
     * @returns 
     */
    getAllBill (reqData) {
        return getPromiseObject('/payableType/findAll', reqData)
    },

    /**
     * 获取应付单类型编码
     * 
     * @param {any} reqData 
     * @returns 
     */
    getCode (reqData) {
        return getPromiseObject('/payableType/code', reqData)
    },
    /**
     * 新建一条应付单类型
     * 
     * @param {any} reqData 
     * @returns 
     */
    createNewBillType (reqData) {
        return getPromiseObject('/payableType/create', reqData)
    },
    /**
     * 修改一条应付单类型
     * 
     * @param {any} reqData 
     * @returns 
     */
    modifyBillType (reqData) {
        return getPromiseObject('/payableType/modify', reqData)
    },
    /**
     * 删除一条应付单类型
     * 
     * @param {any} id 
     * @returns 
     */
    deleteBillType (id) {
        return getPromiseObject('/payableType/remove', id)
    }
}