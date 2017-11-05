import {mapState} from 'vuex'
import * as mainConst from '@/store/mainConst.js'
export default {
    data() {
        return {
            isCache: true
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    mounted() {
        const _this = this
        this.$root.bus.$on(`deleteView_${_this.tag}`, function (index) {
            _this.isCache = false
            // 1、如果删除的一级tab不是当前激活的一级tab，TabsTemeplate中的一级tab删除事件已经在vuex中删除了，不需要做路由跳转操作了
            for (let i = 0; i < _this.navTabData.length; i++) {
                if (_this.navTabData[i].active) {
                    return
                }
            }

            // 2、如果删除的一级tab是当前激活的一级tab，
            const con = _this.navTabData[index - 1] || _this.navTabData[index]
            let url = _this.system
            if (con) {
                url = con.url
                con.active = true

                // 如果还有其他一级的tab,那么还要判断跳转的页面是不是iframe
                if (url.toLowerCase().indexOf("/iframe") == 0) {
                    // 如果是iframe页面，显示iframe,广播iframe的切换tab切换事件，路由进行跳转
                    _this.$store.commit(mainConst.M_SHOW_IFRAME)
                    _this.$root.bus.$emit("changeIframeTab", url.slice(8))
                } else {
                    // 如果不是iframe页面，隐藏iframe,路由进行跳转
                    _this.$store.commit(mainConst.M_HIDE_IFRAME)
                    // _this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: index})
                }
            }
            else {
                // 没有其他的一级tab，直接隐藏iframe，跳首页
                _this.$store.commit(mainConst.M_HIDE_IFRAME)
            }
            _this.$router.push(url)

            // 清空单个组件中的二级tab，twoLevelTabMixins.js中定义
            _this.tabsList = []
            _this.selectTabCode = _this.tag

            // 不能轻易的调用这个方法
            //  _this.$destroy()
        })
    },
    activated: function () {
        this.isCache = true
    },
    deactivated: function () {
    },
    destroyed() {
    }
}
