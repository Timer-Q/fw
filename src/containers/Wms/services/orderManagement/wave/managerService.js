import request from '@Wms/services/service'

let api = {
    getList: '/wms-outbound-server/wave/getListWithPage'
}

export default {
    getList(sendData = {}) {
        return request(api.getList, sendData)
    }
}
