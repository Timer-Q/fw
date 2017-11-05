import envConfig from '@/config'
import axios from 'axios'
import Vue from 'vue'

const baseURL = 'http://dev.api.hivescm.com'
// const baseURL = 'http://192.168.171.93:9002'
const warehouseId = 2000
var headerList = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json'}
if (typeof TARGET_API_HOST === 'string') {
    headerList['Target-Api-Host'] = TARGET_API_HOST
}

var targetInclude = ''
if (typeof TARGET_INCLUDE === 'string') {
    targetInclude = TARGET_INCLUDE
}

const http = axios.create({
    baseURL: baseURL,
    // `headers` 是即将被发送的自定义请求头
    headers: headerList,
    //baseURL: `${envConfig.server.http}${envConfig.server.host}:${envConfig.server.port}/billing-server/`
})
http.interceptors.request.use(config => {
    console.log(config, 'axios interceptors request data')
    // loadingInstance = Loading.service({
    //     fullscreen: true
    // })
    return config
}, error => {
    // loadingInstance.close()

    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    console.log(response, 'axios inteceptors response data')
    // loadingInstance.close()
    // if (response.data.status.statusCode !== 0) {
    //     Message({
    //         showClose: true,
    //         message: response.data.status.statusReason,
    //         type: 'error'
    //     })
    // }
    // if (response.data.status.statusCode === 0) {
    //     Message({
    //         showClose: true,
    //         message: `${response.config.url} 请求成功`,
    //         type: 'info'
    //     })
    // }
    return response
}, error => {
    // loadingInstance.close()
    return Promise.reject(error)
})

/*
 * 封装请求
 * @param url {string} 请求地址，
 * @param sendData {object} 请求参数，
 * @param context {vue componet} 组件上下文
 * @param successCallback {function}  成功,非必填，参数中会有上下文
 * @param needWare {boolean} 是否需要默认的仓库信息，测试阶段仓库信息需要写死
 * @param headers {Object}
 */
Vue.prototype.$request = ({
                              url = '',
                              sendData = {},
                              context,
                              successCallback = () => {
                              },
                              failCallback = (context, error) => {
                                  console.error(error)
                              },
                              needWare = true,
                              headers = headerList
                          } = {
    url: "",
    sendData: {},
    successCallback: () => {
    },
    failCallback: (context, error) => {
        console.error(error)
    },
    needWare: true,

    headers: headerList
}) => {
    let _sendData = sendData
    let api = url
    let sCallback = successCallback
    let fCallback = failCallback

    if (needWare) {
        _sendData = Object.assign(_sendData, {
            "warehouseId": warehouseId
        })
    }

    // 开发环境header处理
    let factHeaders = Object.assign({}, headers)
    // 保证截取无误
    if (api.length > 5) {
        let serviceAppName = api.substr(1).substring(0, api.substr(1).indexOf('/')).toLowerCase()
        if (targetInclude.indexOf(serviceAppName) < 0) {
            delete factHeaders['Target-Api-Host']
        }
    }


    axios({
        baseURL: baseURL,
        method: 'post',
        url: api,
        data: _sendData,
        headers: factHeaders
    }).then(function (response) {
        console.log("responsehttp:", response)
        if (!response.data || !response.data.result) {
            //throw response.status.statusReason
            throw(response.data.status.statusReason)
            //Promise.reject(response.status.statusReason)
        }
        sCallback(context, response.data.result)
        //vm.subTableData=response
    }).catch(function (error) {
        fCallback(context, error)
        //s.alert(error)
        //console.error(error)
    })
}

/*
    * 封装请求,返回Promise对象
    * @param url {string} 请求地址，
    * @param sendData {object} 请求参数，
    */
Vue.prototype.$requestAsync = ({
                                   url,
                                   sendData
                               }) => {
    let _sendData = sendData ? sendData : {}
    let api = url ? url : ""

    _sendData = Object.assign(_sendData, {
        "warehouseId": warehouseId
    })

    return axios({
        baseURL: baseURL,
        method: 'post',
        url: api,
        data: _sendData,
        headers: headers
    })
}

function request(reqUrl, sendData, method = 'post') {
    return new Promise((resolve, reject) => {
        http({
            method: method,
            url: reqUrl,
            data: sendData
        }).then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        })
    })
}

export default request
