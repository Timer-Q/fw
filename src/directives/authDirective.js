/*
 * @Auth: 石国庆
 * @Describetion: 权限控制的指令，每个模块进入的时候请求模块的权限，存在localstorage中进行查找
 * @Date: 2017.11.3
 * */

import utils from '@/utils/permissionRecursion.js'
export default {
    name: 'auth',
    func: {
        bind: function (el, binding, vnode) {
            if (binding.modifiers.tab) {
                // 处理tab的组件的权限控制
                // console.log("vnode-----------------", vnode)
                // console.log("label-----------------", vnode.child.$options.propsData.label)
                // console.log("header-----------------",vnode.componentInstance.$parent.$children[0].$el.children[0].children[0])

                // 处理非tab的操作
                let localStorageName = binding.arg.split('_')[0] + 'Permission'
                let permission = JSON.parse(localStorage[localStorageName])
                let flag = utils.getRecursionBool(permission, binding.arg)
                if (!flag) {
                    // TODO:如果能直接调用tabs组件的删除方法就更好了
                    // TODO:闪一下问题,执行时间问题
                    // TODO:打断点，测试执行顺序,指令执行，页面还没有渲染
                    // TODO:列表首页的显示也是权限的执行时间问题
                    let interval = setInterval(function () {
                        if (typeof vnode.componentInstance.$parent.$children[0].$el != null) {
                            if (vnode.componentInstance.$parent.$children[0].$el.getElementsByClassName('el-tabs__item').length) {
                                let domHeaderList = vnode.componentInstance.$parent.$children[0].$el.getElementsByClassName('el-tabs__item')
                                for (let i = 0; i < domHeaderList.length; i++) {
                                    if (domHeaderList.item(i).innerText == vnode.child.$options.propsData.label) {
                                        domHeaderList.item(i).parentNode.removeChild(domHeaderList.item(i))
                                        window.clearInterval(interval)
                                    }
                                }
                            }
                        }
                    }, 10)
                }
            } else {
                // 处理非tab的控件权限控制
                let localStorageName = binding.arg.split('_')[0] + 'Permission'
                let permission = JSON.parse(localStorage[localStorageName])
                let flag = utils.getRecursionBool(permission, binding.arg)
                if (!flag) {
                    el.parentNode.removeChild(el)
                }
            }

        },
        inserted: function (el, binding, vnode) {

        }
    }
}

