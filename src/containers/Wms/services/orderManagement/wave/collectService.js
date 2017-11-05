import request from '@Wms/services/service'

let api = {
    getList: '/wms-outbound-server/orderwaitconvergepool/getListWithPage'
}

export default {
    getList(sendData={}) {
        sendData.warehouseId = "400000022"
        return request(api.getList, sendData)
    }
}
