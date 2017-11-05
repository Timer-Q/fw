var env=process.env.NODE_ENV
if(env!='production'){
    env='dev'
}
export default {


    // 是否开启错误警告
    REPORT_INTERFACE_ERROR:true,
    HOST:{
        GLOBAL:{
            'dev':'http://192.168.177.152:8989/tms-web',
            'production':'http://192.168.177.152:8989/tms-web',
        }[env],
        SMQRTER_QUERY:{
            'dev':'http://192.168.177.151:8086/service-search',
            'production':'http://192.168.177.151:8086/service-search',
        }[env]

    }

}



// import lan from './language'

