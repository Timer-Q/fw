/**
 * Created by dbx on 2017/4/13.
 */
import u from './addressSelectUtil.js'
var defaultSetting={

        timeout:15*1000,//接口默认请求超时
        // reportTimeout:true,//是否开启超时警告
        language:{
            REQUEST_TIMEOUT:'请求超时',
            UNKNOWN_ERROR:'未知错误'
        },
        isCodeSuccess(res){//resolve时code是否是success
            return true
        }
    },
    interfaceDataCache={
        get:{

        },
        post:{

        }
    }
function r(){

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    // var url,data,type,headers
    var options

    if(typeof(arguments[0])==='string'){
        options={
            url:arguments[0],
            data:arguments[1]||{},
            type:arguments[2]||'get',
            headers:arguments[3]||{}
        }
    }else{
        options=arguments[0]

    }
    options=u.deepExtend({

        settings:defaultSetting,
        cache:false,
        type:'get',
        multipart:false,
        withCredentials:false,
        url:'/promise-base-ajax-test-url',
        data:{},
        headers:{
            // 'Content-Type':'application/x-www-form-urlencodedcharset=utf-8'
            'Content-Type':'application/json;charset=utf-8'
        }
    },options)
    u.clog('r ajax options----:',options)
    let {url,data,type,headers,cache} = options


    var isMultiPart=options.multipart||headers['Content-Type'].indexOf('multipart/form-data')===0
    if(isMultiPart){
        options.headers['Content-Type']='multipart/form-data'
    }
    u.clog('promise based ajax headers:',headers)


    u.clog('fucku data--:',data)
    var args=arguments
    return new Promise(function(resolve,reject){



        if(url in interfaceDataCache[type]){
            resolve(interfaceDataCache[type][url])
            return false
        }


        u.clog('r argsssssss:',args,url)

        // var storageData,
        //     storageUrl=location.origin+(options.url.substring(0,1)==='/'?(options.url):('/'+options.url))
        // u.clog('options.url:',options.url,storageUrl)
        // if(storageData=JSON.parse(localStorage.getItem(storageUrl))){
        //     resolve({
        //         data:storageData,
        //         status:'success'
        //     })
        //     return false
        // }


        var xhr= new XMLHttpRequest()
        xhr.withCredentials = options.withCredentials

        u.clog('开始请求'+options.url,Date.now())

        xhr.open(type,url,true)
        // xhr.setRequestHeader("Content-Type", "application/json charset=utf-8")

        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=utf-8'
        // //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        // //$httpProvider.defaults.headers.post['Content-Type'] = 'application/jsoncharset=utf-8'
        // $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */* q=0.01'
        // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

        for(var i in headers){
            if(headers[i].indexOf('multipart/form-data')!==0){
                xhr.setRequestHeader(i,headers[i])
            }

        }



        u.clog('options.settings---:',options.settings)
        xhr.timeout=options.settings.timeout
        xhr.ontimeout=function(){
            u.clog('xhr timeout:'+options.url,Date.now())
            // options.onTimeout(this)
            reject(options.settings.language.REQUEST_TIMEOUT)

        }
        xhr.onerror=function(e){
            u.clog('xhr error:'+options.url,Date.now())
            u.clog('error e:',e)
            // if(hasTimeout){
            //     return false
            // }
            // clearTimeout()
            reject({
                e:e,
                type:'ERROR'
            })
        }

        xhr.onload=function(){
            u.clog('请求完毕'+options.url,Date.now())
            // if(hasTimeout){
            //     return false
            // }
            // clearTimeout()
            var resData,result

            u.clog('url,type of response text,this',url,typeof(this.responseText),this)
            try{
                resData=JSON.parse(this.responseText)
            }catch(e){
                console.warn(options.url+'res is not stanard json')
                resData=this.responseText
            }
            if(typeof(resData)==='object'){
                result={
                    status:'success',
                    data:resData
                }
            }else{
                result={
                    data:resData,
                    code:null,
                    status:'fail',
                    reason:'ERR_NOT_JSON'
                }
            }
            u.clog('result---:',result)
            if(cache&&(!(url in interfaceDataCache[type]))){
                interfaceDataCache[type][url]=result
            }
            resolve(result)
        }
        // if(type==='post'){
        // u.clog('promise ajax data---:',data)
        // var params=(function(){
        //     var result=''
        //     for(var i in data){
        //         result+=i+'='+data[i]+'&'
        //     }
        //     return result.substring(0,result.length-1)
        // })()

        var lastData
        if(isMultiPart){
            lastData=new FormData()
            for(var i in data){
                var item=data[i]
                if(isArray(item)&&item[0] instanceof Blob){
                    lastData.append(i,item[0],item[1])
                }else{
                    lastData.append(i,item)
                }

                // var arr=[i,data[i]]
                // if(data[i] instanceof Blob){
                //     arr.push('test.png')
                // }
                // lastData.append.apply(lastData,arr)


            }
        }else{
            lastData=JSON.stringify(data)
        }

        u.clog('lastData---:',lastData,isMultiPart)


        xhr.send(lastData)
    })
}
r.getCachedData=()=>interfaceDataCache
r.settings=defaultSetting

export default r
