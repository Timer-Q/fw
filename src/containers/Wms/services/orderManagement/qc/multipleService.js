import request from '@Wms/services/service'

let api = {
    getList: ''
}

export default {
    getList(sendData = {}) {
        return request(api.getList, sendData)
    }
}
