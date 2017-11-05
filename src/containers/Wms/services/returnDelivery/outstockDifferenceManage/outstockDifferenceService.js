import request from '@Wms/services/service'

let api = {
    getlist: '/wms-outbound-server/outbounddifference/getListWithPage',//主列表 带分页
    getlabelDetailList: '/wms-outbound-server/outbounddifference/get',//子列表
}

export default {
    getList(sendData = {}) {
        return request(api.getList, sendData)
    }
}
