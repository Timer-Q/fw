


let curLenClass='fw-textarea-limiter-cur-len',
    wrapperClass='fw-textarea-limiter-wrapper'

let util={
    // sheet.insertRule("header { float: left; opacity: 0.8; }", 1);
    // sheet : (function() {
    //     if(typeof(document)=='undefined'){
    //         return false
    //     }
    //     // Create the <style> tag
    //     var style = document.createElement("style")
    //
    //     // Add a media (and/or media query) here if you'd like!
    //     // style.setAttribute("media", "screen")
    //     // style.setAttribute("media", "only screen and (max-width : 1024px)")
    //
    //     // WebKit hack :(
    //     style.appendChild(document.createTextNode(""))
    //
    //     // Add the <style> element to the page
    //     document.head.appendChild(style)
    //
    //     return style.sheet
    // })(),
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
        let temp
        if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj


        if (obj instanceof Date){
            temp = new obj.constructor() //or new Date(obj)
        }

        else{
            temp = obj.constructor()
        }


        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null
                temp[key] = util.copy(obj[key])
                delete obj['isActiveClone']
            }
        }

        return temp
    }
}




export default {
    install(Vue){
        Vue.directive('expander', {


            bind: function (el, binding, vnode) {

                // util.sheet.addRule(style,1)

                var options = binding.value


                let defaultConfig={
                    direction: 'east',
                    className: (options.direction||'east')+'-expander div-expander',
                    onClose(){},
                    onOpen(){},
                    textWhenShow:'戳我合拢',
                    textWhenHide:'戳我展开',
                    defaultExpanded:false,
                    onReady:function(){

                    }
                }

                console.log('defaultConfig--,',defaultConfig)
                options = util.deepExtend(defaultConfig, options)


                if (el.style.position.trim() === '') {
                    el.style.position = 'relative'
                }


                let isExpanded=options.defaultExpanded

                var div = document.createElement('div')
                div.style.position = 'absolute'
                div.style.cursor ='pointer'
                div.style.boxSizing = 'border-box'
                div.innerText=options.defaultExpanded?options.textWhenShow:options.textWhenHide
                el.appendChild(div)
                div.className=(options.className)
                div.style.zIndex = '1000'





                div.addEventListener('click',function(){
                    if(isExpanded){

                        options.onClose.call(vnode.context,el,options)
                    }else{
                        options.onOpen.call(vnode.context,el,options)
                    }
                    isExpanded=!isExpanded
                    div.innerText=isExpanded?options.textWhenShow:options.textWhenHide

                })


                options.onReady.call(vnode.context,el,options)

            },
        })
    }
}
