/**
 * 经销商管理
 */
import config from '@/config'
import axios from 'axios'

export default {

    // 获取经销商列表
    getDealerList(stationId,dealerName,phone,pageNo,pageSize) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/dealer/dealerList/${stationId}?dealerName=${dealerName}&phone=${phone}&pageNum=${pageNo}&pageSize=${pageSize}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 修改经销商状态/删除
    updateByStationId(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/dealer/update`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 获取未分配经销商列表
    getAssignDealerList(stationId,dealerName,areaId,pageNo,pageSize){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/dealer/assignDealerList/${stationId}?dealerName=${dealerName}&areaId=${areaId}&pageNum=${pageNo}&pageSize=${pageSize}`
            axios.get(url)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 分配经销商
    updateAssignDealer(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}查询/b2b-admin/dealer/assign`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    }
}
