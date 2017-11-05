import axios from 'axios'
// 还没往网关接
export const baseURL = 'http://192.168.177.151:8882/service-ucenter'
export const basePermissionURL = 'http://192.168.177.111:8083/base-org-permission'

export default {
    // 登录按钮
    userLogin(data) {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/user/login`
            // const url = `http://192.168.177.151:8882/scm-login/scmLogin`
            axios({
                method: 'post',
                url: url,
                headers: {"captchaToken": data.captchaToken},
                params: data
            }).then(res => {
                resolve(res)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    // 获取验证码
    getCode() {
        return new Promise(function (resolve, reject) {
            const url = `${baseURL}/kaptcha/getKaptchaImage?t=${new Date()}`
            axios({
                method: 'get',
                url: url,
            }).then(res => {
                resolve(res)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    // 获取按钮权限列表
    getPermissonsByMenuIdAndUid(data) {
        return new Promise(function (resolve, reject) {
            const url = `${basePermissionURL}/getPermissonsByMenuIdAndUid?t=${new Date()}`
            axios({
                method: 'post',
                url: url,
                params: data
            }).then(res => {
                resolve(res)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    /*设置cookie*/
    setCookie(c_name, value, expire) {
        var date = new Date()
        date.setSeconds(date.getSeconds() + expire)
        document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
    },
    /*获取cookie*/
    getCookie(c_name){
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                let c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    /*删除cookie*/
    delCookie(c_name){
        setCookie(c_name, "", -1)
    }

}
