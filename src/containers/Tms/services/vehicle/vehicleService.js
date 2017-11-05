/**
 * 车辆档案管理
 */
import config from '@/config'
import axios from 'axios'

export default {

    // 获取车辆档案列表
    getVehicleList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/getBaseVehicleList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //新增车辆
    add(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/add`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //查看车辆详情
    detail(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/getBaseVehicleById/`+data
            axios.get(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })


    },
//更新车辆
    update(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/update`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //上传图片
    uploadPic(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/uploadPic?file=`+data.file
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //删除
    deleteByIds(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/delete/`+data.ids
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //审核
    checkByIds(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/checkVehicle/`+data.ids
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //取消审核
    uncheckByIds(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/cancelCheckVehicle/`+data.ids
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
