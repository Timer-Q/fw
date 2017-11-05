import envConfig from '@/config'
import axios from 'axios'
import {
    Loading
} from 'element-ui'

const http = axios.create({
    baseURL: `${envConfig.server.http}${envConfig.server.host}/billing-server/` // zn web
})
let loadingInstance
http.interceptors.request.use(config => {
    console.log(config, 'axios interceptors request data')
    loadingInstance = Loading.service({
        fullscreen: true
    })
    return config
}, error => {
    setTimeout(() => {
        loadingInstance.close()
    }, 3000)
    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    console.log(response, 'axios inteceptors response data')
    loadingInstance.close()
    return response
}, error => {
    loadingInstance.close()
    return Promise.reject(error)
})

export function getPromiseObject(reqUrl, reqData) {
    return new Promise((resolve, reject) => {
        // post 请求
        if (reqData) {
            http.post(reqUrl, reqData).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        } else {
            // get 请求
            http.get(reqUrl).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        }
    })
}
