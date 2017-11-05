import request from '@Wms/services/service'

let api = {
    getlist: '/wms-inbound-server/salereturnorder/getListWithPage',//主列表 带分页
    getlabelDetailList: '/wms-inbound-server/salereturnorder/get',//子列表
}

export default {
    /**
     * @method getList  获取列表
     * @param sendData {Object} 参数对象
     */
    getList(sendData = {}) {
        return request(api.getList, sendData)
    }
}
