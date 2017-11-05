import request from '@Wms/services/service'
let api = {
        getlist: 	'/wms-inbound-server/inboundnotify/getListWithPage', // 主列表 带分页
        getlabelDetailList: '/wms-inbound-server/inboundnotify/get', // 子列表
        save: 		'/wms-inbound-server/inboundnotify/save', // 到货登记
        unloadEnd:  '/wms-inbound-server/inboundnotify/unLoadEnd',  // 结束卸货修改入库通知单
        register:   '/wms-inbound-server/inboundnotify/register', // 到货登记修改入库通知单

        getUnloadDock:'/wms-base-server/platform/getByWarehouseId', // 根据仓库id获取月台信息
        getUnloadMans:'/wms-base-server/warehouseman/getByWarehouseId', // 根据仓库id获取库工id

        createByBusinessId:'/wms-pub-server/barcodeorder/createByBusinessId', // 根据入库通知单生成贴码任务
    }

export default {
    /**
     * @method getList  获取列表
     * @param sendData {Object} 参数对象
     */
    getList(sendData) {
        return request(getlist, sendData)
    },

}

