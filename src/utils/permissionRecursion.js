/*
* @Auth: 石国庆
* @Describetion: 为判断权限写的递归查找方法
* @Date: 2017.11.3
* */
export default {
    // 传一个tag判断是
    getRecursionBool(permission, tag){
        // 可以简化为只要相同就返回true
        // TODO:如果能解决循环递归的改变变量值的问题，就可以用很多算法优化代码了
        // TODO:还要解决初次渲染的问题，会执行好多遍，还有页面刷新，方法会被从新执行
        // 暂时用foreach实现
        const _this=this
        let flag=false
        try{

            permission.forEach(item=>{
                // console.log(111111111111)
                // console.log('匹配的' + tag)
                // console.log('选中的' + item.tag)
                if (item.tag == tag) {
                    flag=true
                    foreach.break=new Error("StopIteration")
                }
                else {
                    if (item.childFuncs.length) {
                        flag= _this.getRecursionBool(item.childFuncs, tag)
                        if(flag){
                            foreach.break=new Error("StopIteration")
                        }
                    }
                }
            })
        }catch(e){
            if(e.message==="foreach is not defined") {
                // console.log('走出来异常了')
                return flag
            }else throw e
        }
        return flag



        // 下面的注释培训用，暂时不要删除
        // 循环的变量值在循环递归的时候会被改变
        // let i
        // for (i=0; i < permission.length; i++) {
        //     console.log(111111111111)
        //     console.log('匹配的' + tag)
        //     console.log('选中的' + permission[i].tag)
        //     console.log(permission[i].tag == tag)
        //
        //     if (permission[i].tag == tag) {
        //         return true
        //     }
        //     else {
        //         console.log('lalalallalallalal')
        //         console.log(permission[i].childFuncs.length)
        //
        //         if (permission[i].childFuncs.length) {
        //             return _this.diguibool(permission[i].childFuncs, tag)
        //         } else {
        //
        //             continue
        //         }
        //     }
        // }



        // 这时候的item变量也被改变了
        // let flag=false
        // for(let item of permission){
        //     console.log(111111111111)
        //     console.log(item)
        //     console.log('匹配的' + tag)
        //     console.log('选中的' + item.tag)
        //     console.log(item.tag == tag)
        //
        //     if (item.tag == tag) {
        //         flag=true
        //         break
        //     }
        //     else {
        //         console.log('lalalallalallalal')
        //         console.log(item.childFuncs.length)
        //         if (item.childFuncs.length) {
        //             return _this.diguibool(item.childFuncs, tag)
        //         }
        //     }
        // }
        // return flag

//            let _this=this
//            let permissionObj=Object.assign({},this.permission)
//            Object.keys(permissionObj).forEach((key) => {
//                for(let i=0;i<_this.permissionList.length;i++){
//                    if(key==_this.permissionList[i].tag){
//                        permissionObj[key].show=true
//                        permissionObj[key].permissionId=_this.permissionList[i].permissionId
//                        break
//                    }
//                }
//            })
//            this.permission=permissionObj

    },
    getRecursionObj(permission, tag){
        const _this=this
        let flag=null
        try{

            permission.forEach(item=>{
                // console.log(111111111111)
                // console.log('匹配的' + tag)
                // console.log('选中的' + item.tag)
                if (item.tag == tag) {
                    flag=item
                    foreach.break=new Error("StopIteration")
                }
                else {
                    if (item.childFuncs.length) {
                        flag= _this.getRecursionObj(item.childFuncs, tag)
                        if(flag){
                            foreach.break=new Error("StopIteration")
                        }
                    }
                }
            })
        }catch(e){
            if(e.message==="foreach is not defined") {
                // console.log('走出来异常了')
                return flag
            }else throw e
        }
        return flag
    }
}
