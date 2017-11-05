import request from '@Wms/services/service'

let api = {
    getlist: '/wms-outbound-server/outboundnotify/getListWithPage',//主表单
    getlabelDetailList: '/wms-outbound-server/outboundnotify/get'//子表单
}

export default {
    getList(sendData = {}) {
        return request(api.getList, sendData)
    }
}
