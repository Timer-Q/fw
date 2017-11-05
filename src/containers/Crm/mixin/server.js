export default {
    data(){
        return {
            urlForward: `http://192.168.177.122:9004/crm-contract-server/`,
            userGroupOrgId: 2,
            userOverallOrgId: 1
        }
    },
    methods: {
        dataHandle(arr){//枚举值数据处理
            let dataArr = []
            if(Array.isArray(arr)){
                arr.forEach( item => {
                    let obj = {
                        value: item.id,
                        label: item.name
                    }
                    dataArr.push(obj)
                })
            }
            return dataArr
        },
        getLocalTime(da) {//时间格式转换方法
            da = new Date(da)
            let year = da.getFullYear()
            let month = da.getMonth() + 1
            let date = da.getDate()
            let hour = da.getHours()
            let minute = da.getMinutes()
            let second = da.getSeconds()
            month = (month < 10 ? ('0' + month) : month)
            date = (date < 10 ? ('0' + date) : date)
            hour = (hour < 10 ? ('0' + hour) : hour)
            minute = (minute < 10 ? ('0' + minute) : minute)
            second = (second < 10 ? ('0' + second) : second)
            return [[year, month, date].join('-'), [hour, minute, second].join(':')].join(' ')
        }
    }
}
