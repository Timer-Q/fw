  import axios from 'axios'
  import config from '@/config/index.js'

export default{
    /* 各个列表总数*/
    dotd(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getCount/3`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    // 待处理
    manage(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getDistributionPeandingBill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //查询
    showdetail(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getDistributionPeandingBill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    //已指派
    assign(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getAssignedWaybill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已接单
    taking(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getDistributionwaybill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已装货
    loading(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getDistributionwaybill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //已发车
    loading(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getDistributionwaybill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // 撤回单
    withdraw(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getCancelBill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //查询
    showdeta(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getCancelBill`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //点击指派司机按钮
    driver(url){
        console.log(url)
        return new Promise(function (resolve, reject) {

            axios.post(url)
                .then(function (data) {
                    resolve(data)

                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    //指派司机
    chauffeur(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionDriverVehicle/getDriverVehicleInfoList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //指派车队
    fleet(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionWaybillQuery/getFleetList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //指派地图
    map(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionDriverVehicle/getDriverVehicleInfoList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    //点击确认发布指派司机
    suerchauffeur(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionPushHistory/distributionDriver`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //点击确认发布指派车队
    suerfleet(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionPushHistory/distributionDriverGroup`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //点击确认发布指派地图
    suermap(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}:${config.server.port}/tms-web/distributionPushHistory/distributionDriver`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

}
