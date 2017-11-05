
let util={
    closest(el, selector) {
        var matchesFn

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn
                return true
            }
            return false
        })

        var parent

        // traverse parents

        if(el[matchesFn](selector)){
            return el
        }

        while (el) {
            parent = el.parentElement
            if (parent && parent[matchesFn](selector)) {
                return parent
            }
            el = parent
        }

        return null
    }
}
const CLASS_NAME='fw-keyboard-focus-active'
var lastKeyCode

let currentIndex=0,
    groupChain=[],
    currentEl=null,
    currentGroup=null,
    registeredElList={}


function closest(el, selector) {
    var matchesFn

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn
            return true
        }
        return false
    })

    var parent

    // traverse parents

    if(el[matchesFn](selector)){
        return el
    }

    while (el) {
        parent = el.parentElement
        if (parent && parent[matchesFn](selector)) {
            return parent
        }
        el = parent
    }

    return null
}

function clearWindowSelection(){
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty()
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges()
        }
    } else if (document.selection) {  // IE?
        document.selection.empty()
    }
}

function setCaretPosition(elem, pos) {

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus()
            input.setSelectionRange(selectionStart, selectionEnd)
        }
        else if (input.createTextRange) {
            var range = input.createTextRange()
            range.collapse(true)
            range.moveEnd('character', selectionEnd)
            range.moveStart('character', selectionStart)
            range.select()
        }
    }

    setSelectionRange(elem, pos, pos)
}

function getInputSelectedText(elem) { // only allow input[type=text]/textarea
    return elem.value.substring(elem.selectionStart,
        elem.selectionEnd)
}
function getCursorPosition(input) {
    if (!input) return // No (input) element found
    if ('selectionStart' in input) {
        // Standard-compliant browsers
        return input.selectionStart
    } else if (document.selection) {
        // IE
        input.focus()
        var sel = document.selection.createRange()
        var selLen = document.selection.createRange().text.length
        sel.moveStart('character', -input.value.length)
        return sel.text.length - selLen
    }
}
function isInputAllSelected(input){
    return input.value.trim()===getInputSelectedText(input)
}


function getDOMEventEmitter(node){
    var nodeName=node.nodeName.toLowerCase()
    return node.querySelector('input:not(*[readonly])')
        ||node.querySelector('button')
        ||node.querySelector('.el-select')
        ||('input button'.split(' ').indexOf(nodeName)!==-1?node:null)

    // if(node.querySelector('input')){
    //
    // }
}
function highlightDOMEventEmitter(node){
    console.log('high light node:',node)
    var nodeName=node.nodeName.toLowerCase()
    switch(nodeName){
        case 'input':{
            node.blur()
            node.focus()
            break
        }
        case 'div':{
            if(node.classList.contains('el-select')){
                node.querySelector('.el-input__icon').click()
            }
        }

    }
}
function addEventForEl(el,seq,group){

    console.log('fucku ellll:',el)
    el.dataset.keyboardSeq=seq
    var eventEmitter=getDOMEventEmitter(el),
        nodeName=eventEmitter.nodeName.toLowerCase()
    // group=eventEmitter.dataset.keyboardGroup
    switch(nodeName){
        case 'input':{
            console.log('eventEmitter--:',eventEmitter)
            eventEmitter.addEventListener('blur',function(){
                if(currentEl){
                    currentEl.classList.remove(CLASS_NAME)
                    currentEl=null
                }
            })
            eventEmitter.addEventListener('focus',function(){
                lastKeyCode=null
                // console.log('focus this:',this)
                // console.log(seq-1+'_'+group)
                changeCurrent(el.dataset.keyboardSeq-1,group,false)
            })
            break
        }
        case 'div':{
            console.log('ellllll:',el)
            if(el.querySelector('.el-select')){
                eventEmitter.addEventListener('click',()=>{
                    lastKeyCode=null
                    changeCurrent(el.dataset.keyboardSeq-1,group,false)
                })
                console.log('aaaaaaaaaaaaaaa')
            }
            break
        }
    }
}
function changeCurrent(index,group,ifHighlightDOMEventEmitter){
    // alert('change current was invoked')
    console.log('fucku change current')
    if(typeof ifHighlightDOMEventEmitter ==='undefined'){
        ifHighlightDOMEventEmitter=true
    }
    console.log('fucku currentEl:',currentEl)
    console.log('change current was invoked')

    if(currentEl){
        var eventEmitter=getDOMEventEmitter(currentEl)
        if(eventEmitter.nodeName.toLowerCase()==='input'){
            var cursorIndex=getCursorPosition(eventEmitter),
                len=eventEmitter.value.length
            console.log('index and len:',cursorIndex,len)
            // if(isInputAllSelected(eventEmitter)){
            if(lastKeyCode===37){
                if(cursorIndex>0){
                    setCaretPosition(eventEmitter,cursorIndex-1)
                    return false
                }
            }else if(lastKeyCode===39){


                if(cursorIndex<len){
                    console.log('eventEmitter---:',eventEmitter,cursorIndex)
                    setCaretPosition(eventEmitter,cursorIndex+1)
                    return false
                }
                // console.log('index and len:',cursorIndex,len)

                // console.log(39)
                // console.log(39)
                // console.log(39)
                // console.log(39)
                // clearWindowSelection()
                // eventEmitter.blur()
                //
                // eventEmitter.focus()
                // setCaretPosition(eventEmitter,5)

            }
            // }
        }


        currentEl.classList.remove(CLASS_NAME)
    }
    // cnosole.log('registeredElList--:',registeredElList)
    currentIndex=index

    console.log('registeredElList--:',registeredElList)

    console.log('fucku group||currentGroup:',group||currentGroup)
    currentEl=registeredElList[group||currentGroup][index]
    // currentEl=registeredElList[group||groupChain[groupChain.length-1]][index]
    console.log('currentEl---:',currentEl)


//
//     if(group){
//         currentGroup=group
//     }

    registeredElList[group||currentGroup].latestIndex=index
    if(group){
        currentGroup=group
    }

    // registeredElList[group||currentGroup||currentEl.dataset.keyboardGroup].latestIndex=index
    console.log('registeredElList[currentEl.dataset.keyboardGroup]-:',registeredElList[currentEl.dataset.keyboardGroup])
    // setTimeout(function(){



    currentEl.classList.add(CLASS_NAME)




    ifHighlightDOMEventEmitter&&highlightDOMEventEmitter(getDOMEventEmitter(currentEl))


    // var input=currentEl.querySelector('input')
    // input.blur()
    // input.focus()
    // alert(el.value)
    // })
    // currentGroup
}




function move(step){
    var len=registeredElList[groupChain[groupChain.length-1]].length,
        index=currentIndex+step
    if(step===1&&index===len){
        index=0
    }
    if(step===-1&&index===-1){
        index=len-1
    }

    if(!registeredElList[groupChain[groupChain.length-1]][index]){
        currentIndex=index
        move(step)
    }else{
        changeCurrent(index)
    }
}

function next(){
    move(1)
    // var len=registeredElList[groupChain[groupChain.length-1]].length,
    //     index=currentIndex+1
    // if(index===len){
    //     index=0
    // }
    //
    // if(!registeredElList[groupChain[groupChain.length-1]][index]){
    //     currentIndex=index
    //     next()
    // }else{
    //     changeCurrent(index)
    // }


}
function previous(){
    move(-1)
    // var len=registeredElList[groupChain[groupChain.length-1]].length,
    //     index=currentIndex-1
    // if(index===-1){
    //     index=len-1
    // }
    // if(!registeredElList[groupChain[groupChain.length-1]][index]){
    //     currentIndex=index
    //     next()
    // }else{
    //     changeCurrent(index)
    // }

}

function preventDefault(e){
    e.preventDefault()
    e.cancelBubble=true
}








let obj={
    install:function(Vue){
        Vue.directive('keyboard',{
            bind:function (el, binding, vnode){
                console.log('binding is:',binding,vnode)

                var seq = binding.value-0,
                    group=vnode.data&&vnode.data.attrs?(vnode.data.attrs['data-keyboard-group']||'default'):'default'
                // group=vnode.data.attrs['data-keyboard-group']||'default'
                if(seq<1){
                    return false
                }
                console.log('group is:',group)
                if('default'===group){
                    setTimeout(function(){
                        el.dataset.keyboardGroup='default'
                    })
                    // vnode.data.attrs['data-keyboard-group']='default'
                }


                var isEmptyGroup=registeredElList[group]?false:true

                if(isEmptyGroup){
                    registeredElList[group]=[]
                }

                if(registeredElList[group][seq-1]){
                    console.error('已经存在group='+group+'&seq='+seq+'的元素')
                    return false
                }





                // (function(seq){
                setTimeout(function(){
                    registeredElList[group][seq-1]=el

                    if(isEmptyGroup&&group!==groupChain[groupChain.length-1]){

                        // alert(registeredElList.length+seq)
                        groupChain.push(group)
                        // alert(registeredElList[groupChain[groupChain.length-1]])
                        console.log('registeredElList--:',registeredElList)
                        changeCurrent(registeredElList[groupChain[groupChain.length-1]].length-1,group)
                    }
                    addEventForEl(el,seq,group)


                })


                // })(seq)

                // if(group!==currentGroup){
                //     alert(group+''+currentGroup)
                //     changeCurrent(seq)
                //     currentIndex=seq
                // }

                // currentGroup=group

                // if(seq===1){
                //     // alert(el.querySelector('input').value)
                //
                //
                //     changeCurrent(0)
                // }

                // registeredCount++
            },
            // update:function(el, binding, vnode){
            //     var seq = binding.value-0,
            //         group=el.dataset.keyboardGroup
            //     // alert('update seq begin:'+seq)
            //         // group=vnode.data.attrs['data-keyboard-group']
            //
            //     console.log('seq and group when update:',seq,group,el)
            //
            //     // registeredElList[group][seq-1]=el
            //     // el.dataset.keyboardSeq=seq
            //     console.log('registeredElList--:',registeredElList)
            //     // alert('update seq end:'+seq)
            // },
            unbind(el, binding, vnode){
                var seq = binding.value-0,
                    group=el.dataset.keyboardGroup
                console.log('seq and group when upbind:',seq,group)
                var currentList=registeredElList[group]

                if(seq>0){
                    currentList[seq-1]=null
                }

                var lastGroup=groupChain[groupChain.length-2]||null
                setTimeout(function(){
                    // alert(currentList[seq-1])
                    if(!currentList){
                        return false
                    }
                    if(currentList.every(function(element) {
                            return element===null
                        })){
                        delete registeredElList[group]
                        if(groupChain.indexOf(group)!==-1){
                            groupChain.pop()
                        }


                        // currentGroup=lastGroup

                        if(!registeredElList[lastGroup]){
                            return false
                        }

                        changeCurrent(registeredElList[lastGroup].latestIndex,lastGroup)
                        // alert(registeredElList[lastGroup].latestIndex)
                    }else{
                        currentList.splice(seq-1,1)
                    }

                    // currentList.splice(seq-1,1)
                    // if(currentList.length===0){
                    //     delete registeredElList[group]
                    //     groupChain.pop()
                    //     var lastGroup=groupChain[groupChain.length-1]||null
                    //     alert(lastGroup)
                    //     // currentGroup=lastGroup
                    //     changeCurrent(registeredElList[lastGroup].latestIndex,lastGroup)
                    //     // alert(registeredElList[lastGroup].latestIndex)
                    // }
                    console.log('currentList-:',registeredElList)

                    if(registeredElList[group]&&registeredElList[group][seq-1]){

                        for(var i=seq-1,leng=registeredElList[group].length;i<leng;i++){
                            registeredElList[group][i].dataset.keyboardSeq=i+1
                        }
                        // registeredElList[group][seq-1].dataset.keyboardSeq=seq
                    }



                    var destroiedIndex=seq-1,
                        len=registeredElList[group]?(registeredElList[group].length):null
                    if(len&&destroiedIndex===currentIndex){
                        if(registeredElList[group][destroiedIndex]){
                            changeCurrent(destroiedIndex,group)
                        }else{
                            if(destroiedIndex>0){
                                changeCurrent(destroiedIndex-1,group)
                            }
                        }
                    }

                    // alert('end seq:'+seq)

                })




            }
        })

        if(typeof(window)!=='undefined'){
            document.body.addEventListener('click',function(e){
                var tar=e.target,
                    closest=util.closest(tar,'.'+CLASS_NAME)




                if(!closest){
                    var highlightObj=document.querySelector('.'+CLASS_NAME)
                    if(highlightObj){
                        highlightObj.classList.remove(CLASS_NAME)
                    }
                    // document.querySelector('.'+CLASS_NAME).classList.remove(CLASS_NAME)
                }
            })
            window.addEventListener('keydown',function(e){
                lastKeyCode=e.keyCode-0
                if(!registeredElList[groupChain[groupChain.length-1]]){
                    return false
                }
                var len=registeredElList[groupChain[groupChain.length-1]].length
                if(!len){
                    return false
                }
                if('9 39 13'.indexOf(e.keyCode+'')!==-1){

                    if(!currentEl){
                        return false
                    }

                    preventDefault(e)
                    next()
                }else if(e.keyCode===37){
                    if(!currentEl){
                        return false
                    }
                    preventDefault(e)
                    previous()
                }

            })
        }


    }
}
export default obj
