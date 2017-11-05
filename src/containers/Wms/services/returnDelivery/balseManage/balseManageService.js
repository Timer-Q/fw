import request from '@Wms/services/service'

let api = {
    getlist: '/wms-outbound-server/packingdocument/getListWithPage',//主列表 带分页
    getlabelDetailList: '/wms-outbound-server/packingdocument/get',//子列表
}

export default {
    getList(sendData = {}) {
        return request(api.getList, sendData)
    }
}
