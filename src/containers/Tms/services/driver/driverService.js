/**
 * 司机档案管理
 */
import config from '@/config'
import axios from 'axios'

export default {

    // 获取司机档案列表
    getDriverList(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/driver/queryDriver`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //新增司机
    add(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/driver/addDriver`
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
            const url = `${config.server.http}${config.server.host}/tms-web/driver/getBaseDriverById/`+data
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
            const url = `${config.server.http}${config.server.host}/tms-web/driver/update`
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
            const url = `${config.server.http}${config.server.host}/tms-web/driver/delete/`+data.ids
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    //启用
    activeByIds(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/driver/activeDriver/`+data.ids
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
    unActiveByIds(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/driver/unActiveDriver/`+data.ids
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    //根据承运商ID加载车辆
    getCarryListById(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicle/queryVehicle`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    //司机关联车辆
    contactCar(data){
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/tms-web/vehicleContactDriver/batchAdd`
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
