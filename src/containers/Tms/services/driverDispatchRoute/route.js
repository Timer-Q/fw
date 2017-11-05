import config from '@/config'
import axios from 'axios'

// const base={
//     http:'http://',
//     host:'192.168.177.152',
//     port:'8989'
// }

export default {
    // 新增页面
    // 根据司机姓名、手机号码、承运商名称查询司机档案列表
    getDriverInfoList(data) {
        console.log('进来了吗？')
        return new Promise(function (resolve, reject) {
            // const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/driver/queryDriver`
             const url = `${config.server.http}${config.server.host}/tms-web/driver/queryDriver`
           // const url = `http://192.168.171.63:9003/tms-web/driver/queryDriver`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //选择部分覆盖时，获取线路列表
    getRoutesList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/route/getScheduleRouteList`
           // const url = `http://192.168.171.63:9003/route/getScheduleRouteList`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //保存
    addSave(data){
        return new Promise(function (resolve, reject) {
              const url = `${config.server.http}${config.server.host}/tms-web/delivery/addDeliverys`
           // const url = `http://192.168.171.63:9003/delivery/addDeliverys/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 修改页面
    // 根据路线id查询司机派送线路信息
    selectRouteMsgById(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/delivery/getDeliveryDetail`
          //  const url = `192.168.117.63:9003/delivery/getDeliveryDetail`

            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 修改保存
    updateSave(data){
        return new Promise(function (resolve, reject) {
           // const url = `${config.server.http}${config.server.host}/tms-web/delivery/addDeliverys`
            const url = `http://192.168.171.63:9003/delivery/updateDeliverys`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    getDeliveryList(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/delivery/getDeliveryList`
          //  const url = `http://192.168.171.63:9003/delivery/getDeliveryList`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getDeliveryCount(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/delivery/getDeliveryCount`
           // const url = `http://192.168.171.63:9003/delivery/getDeliveryCount/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    updateDriverUsedStatus(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/delivery/updateDriverUsedStatus`
           // const url = `http://192.168.171.63:9003/delivery/updateDriverUsedStatus/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    deleteDeliveryList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/delivery/deleteDeliveryList`
          //  const url = `http://192.168.171.63:9003/delivery/deleteDeliveryList/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getRecordList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/record/getRecordList`
          //  const url = `http://192.168.171.63:9003/record/getRecordList/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getRecordCount(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/record/getRecordCount`
           // const url = `http://192.168.171.63:9003/record/getRecordCount/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getTransferRecordDetail(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/record/getTransferRecordDetail/`+data.companyId+'/'+data.recordCode
           // const url = `http://192.168.171.63:9003/record/getTransferRecordDetail/`+data.companyId+'/'+data.recordCode
            axios.get(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    getDeliveryDetail(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/delivery/getDeliveryDetail`
           // const url = `http://192.168.171.63:9003/delivery/getDeliveryDetail/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    transfer(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/record/transfer`
            //const url = `http://192.168.171.63:9003/record/transfer/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    copy(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/record/transfer`
            //const url = `http://192.168.171.63:9003/record/copy/`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //新增区域添加
    // addAreaData(data){
    //     return new Promise(function(resolve,reject){
    //         const url = `http://192.168.171.63:9003/delivery/addDeliverys`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
    //查询区域添加列表
    // addAreaTableData(data){
    //     return new Promise(function(resolve,reject){
    //         const url = `http://192.168.171.63:9003/delivery/getDeliveryList`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
}
