import config from '@/config'
import axios from 'axios'

// const base={
//     http:'http://',
//     host:'192.168.177.152',
//     port:'8989'
// }

export default {
    // 派车单列表查询
    dispatcherList(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/dispatcher/getList`
            // const parameter={'status':data}
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 条件查询派车单列表
    queryWaybillList(data) {
        return new Promise(function (resolve, reject) {
            const url = `http://192.168.170.226:9002/dispatcher/queryWaybill`
            // const parameter={'status':data}
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 删除派车单
    delDispatcher(data) {
        return new Promise(function(resolve,reject) {
            const url = `http://192.168.177.152:8989/tms-web/dispatcher/del?id=`+data
            axios.get(url)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
        })
    }
    // listChannelInfoByPage(data) {
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/pay-admin-service/channelInfo/listChannelInfoByPage`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // },
    // updateChannelStatus(data) {
    //     return new Promise(function (resolve, reject) {
    //         const url = `${config.server.http}${config.server.host}/pay-admin-service/channelInfo/updateChannelStatus`
    //         axios.post(url, data)
    //             .then(function (data) {
    //                 resolve(data)
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //             })
    //     })
    // }
}
