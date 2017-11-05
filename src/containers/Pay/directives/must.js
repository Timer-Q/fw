export default {
    name:'must',
    func:{
        bind: (el, binding, vnode, oldVnode) => {
            const input = el.children[0]
            // 必填的input监听focus事件，如果在focus时有必填星号的类名就去掉
            input.onfocus = e => {
                el.className = el.className.split('must-star').join(' ').trim()
            }
            // 必填的input监听blur事件，如果在blur时没有填写内容则显示星号
            input.onblur = e => {
                if (!el.className.includes('must-star') && !input.value) {
                    el.className += ` must-star`
                }
            }
        }
    }

}
