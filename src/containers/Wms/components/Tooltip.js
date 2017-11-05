import tooltip from './Tooltip.vue'
/**
 * position: 鼠标位置
 * name: tooltip name
 * cb: 可能需要执行的回调
 */
tooltip.install = (Vue, options) => {
  Vue.component(tooltip.name, tooltip)
  // setTimeout(function(){

	// },10000)
  Vue.prototype.$tooltip = (position, name, cb) => {
    let el = document.getElementsByName(name || 'tooltip')[0]
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0
    if (el && el.style.display !== 'flex') {
      // 如果tooltip还在，则不再执行
      el.style.display = 'flex'
    }
    let elWidth = parseInt(window.getComputedStyle(el, null).width)
    let bodyWidth = document.body.clientWidth
    el.style.top = `${position.top + scrollTop}px`
    el.style.left = bodyWidth - position.left < elWidth ? bodyWidth - elWidth + 'px' : position.left + 'px'
    cb && cb()
    // console.log(position, elWidth, window.getComputedStyle(el, null))
  }
}

export default tooltip
