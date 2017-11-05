// 计数器 e.g：0/50

let curLenClass='fw-textarea-limiter-cur-len',
    wrapperClass='fw-textarea-limiter-wrapper'

export default {
    install(Vue){
        Vue.directive('textarea-limiter',{
            inserted(el, binding,vnode) {
                console.log('argggggg:',arguments)
                var span = document.createElement('span')
                span.classList.add(wrapperClass)
                if (vnode.data.model.value === null) return
                binding.fwCurrentValueLen = vnode.data.model.value.length
                span.innerHTML = '<i class="'+curLenClass+'">' + binding.fwCurrentValueLen + '</i>/' + (vnode.componentInstance.maxlength||150)
                el.appendChild(span)
            },
            update(el, binding,vnode) {
                if (vnode.data.model.value === null) return
                binding.fwCurrentValueLen = vnode.data.model.value.length
                let nowNumDom = el.getElementsByClassName(curLenClass)[0]
                nowNumDom.innerText = binding.fwCurrentValueLen
            }
        })
    }
}
