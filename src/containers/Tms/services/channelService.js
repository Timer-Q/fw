import axios from 'axios'
import config from '@/config/index.js'

export default{

    //派车线路表格
    showdeta(data){
        return new Promise(function (resolve, reject) {
            const url = `http://192.168.171.63:9003/route/getScheduleRouteList`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },



    //获取线路总数
    getListTotal(data){
      return new Promise(function(resolve,reject) {
            const url = `http://192.168.171.63:9003/route/getRouteCount`
            axios.post(url,data)
                .then(function(data) {
                    resolve(data)
                })
                .catch(function(error){
                    reject(error)
          })
      })
    },
    //删除线路
    delRoterList(data){
        return new Promise(function(resolve,reject) {
            const  url = `http://192.168.171.63:9003/route/delRouteList`
            axios.post(url,data)
                .then(function(data) {
                    resolve(data)
                })
                .catch(function(error){
                    reject(error)
            })
        })
    },
    //更改线路状态
    updataRouteState(data){
        return new Promise(function(resolve,reject) {
            const  url =`http://192.168.171.63:9003/route/updateRouteState`
            axios.post(url,data)
                .then(function(data) {
                    resolve(data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },

    //详情

    showdeil(row1,data){
        return new Promise(function (resolve, reject) {
            const url = `http://192.168.171.63:9003/route/getRoutedDetailById/`+row1.id+'/'+row1.route
            axios.get(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    //新增判断input
    judge(vall,data){
        return new Promise(function (resolve, reject) {
            const url = `http://192.168.171.63:9003/route/getRouteByName/`+1+'/'+encodeURIComponent(vall)
                    axios.get(url,data)
                        .then(function (data) {
                            resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },

    //删除派车单
    deldeta(vall,data){
        return new Promise(function (resolve, reject) {
            const url = `http://192.168.171.63:9003/route/getRouteByName/`+1+'/'+encodeURIComponent(vall)
                    axios.get(url,data)
                        .then(function (data) {
                            resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },

    //修改点击保存
    revise(data){
        return new Promise(function (resolve, reject) {
            const url = `http://192.168.171.63:9003/route/updateRoute`
            axios.post(url,data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })

    },
    //新增线路
    insertRoute(data) {
        return new Promise(function (resolve,reject) {
            const url = `http://192.168.171.63:9003/route/insertRoute`
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
