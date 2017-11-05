import Vue from 'vue'
let util={
    clog(){
        if(typeof(Vue.prototype.BX)!='undefined'){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---')
        }
    },
    isNumber(obj) {

        return typeof obj === 'number' && !isNaN(obj)
    },
    isNull: function (str) {
        return (typeof(str) === 'string' && str.trim() === '') || (typeof(str) === 'undefined') || (str === null)
    },
    debounce: function (func, wait, immediate) {
        // console.log('')
        var timeout
        return function () {
            var context = this, args = arguments
            var later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },

    //在一个map中，通过指定的key数组遍历找到对应的value，适用于某字段可以用不同key表示但是同一时刻必定仅有一个对应的value
    getValueByMultiKeyFromMap(map,arr,notExistValue=null){
        var result=null

        if(typeof(arr)==='string'){
            arr=arr.split(" ")
        }


        for(var i=0,len=arr.length;i<len;i++){
            if(arr[i] in map){
                result=map[arr[i]]
                break
            }
        }

        if(result===null){
            return notExistValue
        }else{
            return result
        }
    },
    deepExtend:(function(){

        function extend(source,tar){
            var copiedSource=util.copy(source),
                copiedTar=util.copy(tar)
            for(var i in copiedTar){
                copiedSource[i]=copiedTar[i]
            }
            return copiedSource
        }

        extend.all=function(args){
            // console.log('arr')
            // var args=arr[0]
            console.log('all args:',args)
            if(args.length<2){
                alert('必须大于2个参数才能深度合并')
            }else{
                var result=extend(args[0],args[1])
                for(var i=2;i<args.length;i++){
                    result=extend(result,args[i])
                }
                return result
            }
        }

        return extend

    })(),
    copy(obj) {
        if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj

        if (obj instanceof Date){
            let temp = new obj.constructor() //or new Date(obj)
        }

        else{
            let temp = obj.constructor()
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null
                temp[key] = util.copy(obj[key])
                delete obj['isActiveClone']
            }
        }

        return temp
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    },
}
export default util
