import u from './addressSelectUtil'
import cfg from "./xhrSetting"
import Vue from'vue'
import r from './xhr'
import MessageBox from 'element-ui/lib/message-box'


const defaultHost = "GLOBAL"

function emitMessageBox(msg,isShowCancel,type) {
    // s.$store.state.isLoading=false
    isShowCancel = isShowCancel || false
    var options = {
        title: {
            warning: '警告',
            info: '提示',
            success: '恭喜',
            error: '错误'
        }[type || 'warning'],
        message: msg || '系统繁忙请稍后再试',
        showCancelButton: isShowCancel,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnPressEscape: true,
        closeOnClickModal: false,
        type: type || 'warning'

    }
    return MessageBox(options)
        // .then(()=>{
        //     s.$store.state.isLoading=false
        // })

}

let s={
    alert(msg) {
        return s.errorMsg(msg)
    },
    getHost(host){
        return host||defaultHost
    },

    callInterfaceAndSetData(requestParam,setObj=null,modelStr,cache=false){
        return s.request(requestParam,cache)
            .then(([resData])=>{
                if(setObj){
                    Vue.set(setObj,modelStr,resData)
                }

                return resData
            }).catch((e)=>{
                u.clog('call interface e:',e)
                if(setObj){
                    Vue.set(setObj,modelStr,undefined)
                }

                throw e
            })
    },
    transformUrl(arg,host) {



        var requestSelf=arg.substring(0,1)==='/'
        if(requestSelf){
            return cfg.HOST[host] + arg
        }else{
            return '/'+arg
        }



    },
    request:(function(){
        r.settings.isCodeSuccess=function(res){
            var data=res.data
            return data.status && (data.status.statusCode === 0)
        }
        function getErrReason(data){
            return (data.err&&data.err.indexOf('ECONNREFUSED')!==-1?'无法连接目标主机':data.err)
                ||(data.status.statusReason)
                ||(r.settings.language.UNKNOWN_ERROR)
        }
        return function (arg,cache=false,alertError=true) {

            // if(typeof(cache)==='undefined'){
            //     cache=false
            // }
            // if(typeof(alertError)==='undefined'){
            //     alertError=true
            // }

            var promiseArr = [],urlArr=[]



            if (typeof(arg) === 'string') {

                // promiseArr.push(r({url:s.transformUrl(arg),cache:cache}))
                promiseArr.push(
                    r({
                        cache:cache,
                        url:s.transformUrl(arg,s.getHost())
                    })
                )
                urlArr.push(arg)

                // result=r(url)

            } else if (typeof(arg) === 'object') {
                if (!u.isArray(arg)) {
                    arg.url = s.transformUrl(arg.url,s.getHost(arg.host))
                    arg.cache=cache
                    promiseArr.push(r(arg))
                    urlArr.push(arg.url)
                    // result=r(arg)
                } else {




                    // promiseArr = promiseArr.concat(arg)
                    arg.forEach((item) => {
                        if(typeof(item)==='string'){
                            promiseArr.push(r({
                                url:s.transformUrl(item,s.getHost()),
                                cache:cache
                            }))
                            urlArr.push(item)
                        }else{
                            item.url=s.transformUrl(item.url,s.getHost(item.host))
                            item.cache=cache
                            promiseArr.push(r(item))
                            urlArr.push(item.url)
                        }

                    })
                }


            }





            // var requestTime=new Date().format(),
            //     reqResult=[]
            //
            // for(let index=0;index<urlArr.length;index++){
            //     promiseArr[index]
            //         .then((res)=>{
            //             var isSuccess=r.settings.isCodeSuccess(res)
            //             if(isSuccess){
            //                 reqResult.push({
            //                     url:urlArr[index],
            //                     requestTime:requestTime,
            //                     status:'success'
            //                 })
            //             }else{
            //                 var reason=getErrReason(res.data)
            //                 reqResult.push({
            //                     url:urlArr[index],
            //                     requestTime:requestTime,
            //                     status:'fail',
            //                     msg:reason
            //                 })
            //             }
            //
            //         }).catch((e)=>{
            //         reqResult.push({
            //             url:urlArr[index],
            //             requestTime:requestTime,
            //             status:'fail',
            //             msg:typeof(e)==='string'?e:(e.message||e.e.message)
            //         })
            //     })
            // }



            return Promise.all(promiseArr).then((res) => {
                u.clog('promise all res--:',res)
                var errReason=null,
                    results=[]
                var isAllRight=res.every(function(item){
                    u.clog('every item:',item)
                    var data=item.data
                    var isTrue=r.settings.isCodeSuccess(item)
                    if(!isTrue){
                        console.warn('catch one fail code',data)

                        errReason=getErrReason(data)
                        // errReason=


                        // errReason='status' in data?
                        //     (data.status.statusReason||r.settings.language.UNKNOWN_ERROR)
                        //     :
                        //     ((data.err&&data.err.indexOf('ECONNREFUSED')!==-1?'无法连接目标主机':data.err)||r.settings.language.UNKNOWN_ERROR)
                    }else{

                        results.push(data.result)||null
                    }
                    return isTrue
                })
                // u.clog('isAllRight--:',isAllRight)
                // u.clog('finally reqResult--- then--:',reqResult)

                if(isAllRight){
                    return Promise.resolve(results)
                }else{
                    // console.warn('error:',errReason)
                    // if(cfg.REPORT_INTERFACE_ERROR&&alertError){
                    //     s.alert(typeof(e)==='string'?e:(e.message||e.e.message))
                    // }
                    // return Promise.reject(errReason)
                    throw errReason
                }



            })
                .catch((e) => {
                    console.warn('catch a e:',e,alertError,cfg.REPORT_INTERFACE_ERROR)
                    // u.clog('catch e--:',e)
                    // alert(cfg.REPORT_INTERFACE_ERROR&&alertError)
                    if(cfg.REPORT_INTERFACE_ERROR&&alertError){
                        s.alert(typeof(e)==='string'?e:(e.message||e.e.message))
                    }

                    // return Promise.reject(e)

                    // u.clog('finally reqResult--- catch--:',reqResult)

                    throw e

                })
            // .finally(()=>{
            //     u.clog('finally reqResult--:',reqResult)
            // })
            // return result
        }
    })(),
}
'warning success info error'.split(' ').forEach(function(type){
    s[type+'Msg']=function(msg,isShowCancel){
        return emitMessageBox(msg,isShowCancel,type)
    }
})

export default s
