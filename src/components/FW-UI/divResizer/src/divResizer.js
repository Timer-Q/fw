// 计数器 e.g：0/50
// import './divResizer.css'
//
// let styleMap={
//     'east':`
//     width: 5px;
//     height: 100%;
//     background: rgba(1,1,1,0.5);
//     border-radius: 4px;
//     right: 0;
//     `
// }

// let style=`
// body .east-resize{
//     width: 5px;
//     height: 100%;
//     background: rgba(1,1,1,0.5);
//     border-radius: 4px;
//     right: 0;
// }`


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
        Vue.directive('resize', {

            bind: function (el, binding, vnode) {

                // util.sheet.addRule(style,1)

                var options = binding.value
                /*if(typeof(options.maxHeight)==='function'){
                 options.maxHeight=options.maxHeight()
                 console.log(options.maxHeight,'maxHeight=====')
                 }
                 console.log('bind-----',options)*/

                let defaultConfig={
                    direction: 'east',
                    className: (options.direction||'east')+'-resize',
                    alwaysShow: true,
                    minWidth: 200,
                    minHeight: 200,
                    maxHeight: 10000,
                    maxWidth: 10000,
                    minTop:0,
                    onClick(){},
                    onChange: function () {


                    },
                    onReady:function(){

                    }
                }

                console.log('defaultConfig--,',defaultConfig)
                options = util.deepExtend(defaultConfig, options)
                // console.log('bind   options---------:', options,options.className,styleMap[options.direction])


                // styleMap
                // util.sheet.addRule(options.className,styleMap[options.direction],0)
                // util.sheet.addRule(options.className,styleMap[options.direction],1)

                if (el.style.position.trim() === '') {
                    el.style.position = 'relative'
                }
                // let {direction,className}
                // var rawName=binding.rawName,
                //     arr=rawName.split('.'),
                //     direction=arr[1],
                //     className=arr[2],
                //     isAlwaysShow=arr[3]=='alwaysShow'?true:false,
                //     handler=binding.value

                var div = document.createElement('div')
                div.style.position = 'absolute'
                div.style.cursor =options.direction==='east'?'col-resize':'row-resize'
                div.style.boxSizing = 'border-box'
                el.appendChild(div)
                div.classList.add(options.className)
                div.style.zIndex = '1000'
                if (!options.alwaysShow) {
                    div.style.display = 'none'
                    var clock
                    el.addEventListener('mouseenter', function () {
                        div.style.display = 'block'
                        clearTimeout(clock)
                    })
                    el.addEventListener('mouseleave', function () {
                        clock = setTimeout(function () {
                            div.style.display = 'none'
                        }, 300)

                    })
                }

                function getEventCenter(event) {
                    if (!event.center) {
                        event.center = {
                            x: typeof(event.pageX) !== 'undefined' ? (event.pageX) :
                                (event.changedTouches[0].pageX),
                            y: typeof(event.pageY) !== 'undefined' ? (event.pageY) :
                                (event.changedTouches[0].pageY)
                        }
                    }
                    return event.center
                }



                var hasDownEmitted = false, startX, startY, startW, startH,docElH
                // ,lastClientW=null


                var defaultH=null

                function handleDown(event) {
                    hasDownEmitted = true
                    var xy = getEventCenter(event)
                    startX = xy.x
                    startY = xy.y
                    startW = el.offsetWidth
                    startH = el.offsetHeight
                    docElH=document.documentElement.clientHeight
                    // event.cancelBubble = true
                    // event.preventDefault()
                    if(defaultH===null){
                        defaultH=startH
                    }
                }


                function handleMove(event) {
                    if (!hasDownEmitted) {
                        return false
                    }

                    var xy = getEventCenter(event)
                    switch (options.direction.toLowerCase()) {
                        case 'east': {
                            var targetW = Math.max(options.minWidth, startW + (xy.x - startX))
                            targetW = Math.min(options.maxWidth, targetW)
                            el.style.width = targetW + 'px'
                            console.log('targetW---:',targetW)
                            options.onChange.call(vnode.context, {
                                width: targetW,
                                $store: vnode.context.$store,
                            })
                            break
                        }
                        case 'north': {
                            var targetH = Math.max(options.minHeight, startH - (xy.y - startY))
                            targetH = Math.min(options.maxHeight, targetH,docElH-options.minTop)
                            console.log('targetH------:', targetH)
                            el.style.height = targetH + 'px'
                            options.onChange.call(vnode.context, {
                                height:targetH,
                                $store: vnode.context.$store,
                            })
                            break
                        }
                    }


                    event.cancelBubble = true
                    event.preventDefault()
                }

                function handleUp(event) {
                    hasDownEmitted = false

                }
                if(['north'].indexOf(options.direction.toLowerCase())!==-1){
                    window.addEventListener('resize',function(){
                        if(defaultH!==null){
                            var h=Math.min(defaultH,document.documentElement.clientHeight-options.minTop)

                            el.style.height = h + 'px'
                            options.onChange.call(vnode.context,{
                                height:h,
                                $store:vnode.context.$store,
                            })
                        }
                    })
                }

                div.addEventListener('mousedown',handleDown)
                document.body.addEventListener('mousemove',handleMove)
                window.addEventListener('mouseup',handleUp)

                div.addEventListener('click',function(){
                    options.onClick.call(vnode.context,el,options)
                })


                options.onReady.call(vnode.context,el,options)

            },
        })
    }
}
