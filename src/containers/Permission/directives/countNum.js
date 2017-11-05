// 计数器 e.g：0/50
export default {
    name:'countNum',
    func:{
        inserted (el, binding) {
            var span = document.createElement('span')
            span.classList.add('countNum')
            if (arguments[2].data.model.value === null) return
            binding.value.nowNum = arguments[2].data.model.value.length
            span.innerHTML = '<i class="nowNum">' + binding.value.nowNum + '</i>/' + binding.value.allNum
            el.appendChild(span)
        },
        update (el, binding) {
            if (arguments[2].data.model.value === null) return
            binding.value.nowNum = arguments[2].data.model.value.length
            let nowNumDom = el.getElementsByClassName('nowNum')[0]
            nowNumDom.innerText = binding.value.nowNum
        }
    }
}
