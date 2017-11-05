<template>
    <div class="tabs-outer">
        <div class="main-tabs f_l" ref="navTabsOuter">
            <div ref="navTabs">
                <!--循环渲染一级tab页面-->
                <router-link
                    v-for="(item, index) in navTabData"
                    :key="index"
                    :to="item.url"
                    tag="a"
                    exact
                    class="mian-nav"
                    ref="navTabItem"
                    @click.native="tabItemClick(item,index)"
                >
                    {{item.resourceName}}
                    <i class="iconfont" @click.stop.prevent="deleteNavTab(item, index)">&#xe642;</i>
                </router-link>
            </div>
        </div>
        <div class="f_r rt-tab">
            <ul class="clearfix right">
                <!--右侧一级导航左按钮-->
                <li class="f_l">
                    <a href="javascript:;">
                        <i :class="{iconfont:true,f16:true,prohibit:leftProhibit}" data-type="left" @click="sliderLeft">
                            &#xe640;</i>
                    </a>
                </li>
                <!--右侧一级导航右按钮-->
                <li class="f_l">
                    <a href="javascript:;">
                        <i :class="{iconfont:true,f16:true,prohibit:rightProhibit}" data-type="right"
                           @click="sliderRight">&#xe63e;</i>
                    </a>
                </li>
                <!--右侧一级导航更多按钮-->
                <li class="f_l">
                    <a href="javascript:;">
                        <i :class="{iconfont:true,active:isMore}" @click="isMore = !!navTabData.length">&#xe639;</i>
                    </a>
                    <div class="rMore" v-if="isMore" @mouseleave="isMore=false">
                        <span></span>
                        <ul>
                            <li :key="index" v-for="(item,index) in navTabData" :class="{active:item.active}"
                                @click="clickMoreItem(item.url,index)">
                                <a href="javascript:;">{{item.resourceName}}</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .router-link-active {
        color: #303e51 !important;
        background: #ffffff;
    }

    .tabs-outer {
        height: 42px;
        overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        * {
            font-size: 16px;
            color: rgba(48, 62, 81, .8);
        }
        .main-tabs {
            height: 42px;
            position: absolute;
            left: 212px;
            right: 112px;
            > div {
                white-space: nowrap;
                display: inline-block;
                height: 100%;
                margin-top: 9px;
                .mian-nav {
                    font-size: 14px;
                    height: 34px;
                    line-height: 34px;
                    min-width: 90px;
                    max-width: 212px;
                    padding: 0 16px;
                    display: inline-block;
                    text-align: center;
                    box-sizing: border-box;
                    border: 1px solid rgb(221, 221, 221);
                    border-bottom: none;
                    border-radius: 16px 16px 0 0;
                    cursor: pointer;
                    &:not(.router-link-active):hover {
                        background: #f5f5f5;
                        border-color: #cccccc;
                    }
                }
            }

            i {
                font-size: 8px;
                margin-left: 5px;
            }
        }
        .rt-tab {
            width: 112px;
            position: absolute;
            right: 0;
            background: #eee;
            z-index: 2;
            line-height: 42px;
            > ul {
                width: 100%;
                height: 100%;
                border-bottom: 1px solid #ddd;
                &:active, &:hover {
                    background: white;
                }
                > li {
                    /*width: 33%;*/
                    margin-right: 16px;
                    position: relative;
                    &:first-child {
                        margin-left: 16px;
                    }
                    a {
                        /*margin-left: 10px;*/
                        i {
                            &:not("active"):hover {
                                color: #333;
                            }
                            &.active {
                                color: #28a7e1;
                            }
                        }
                        .prohibit {
                            color: #d4d4d4;
                        }
                    }
                    .rMore {
                        width: 204px;
                        position: fixed;
                        margin-top: -5px;
                        right: 10px;
                        background: white;
                        z-index: 10;
                        box-shadow: 0 0 8px #ccc;
                        border: 1px solid #ddd;
                        padding: 6px 0 50px;
                        max-height: 280px;
                        overflow: auto;
                        span {
                            position: absolute;
                            border: 5px solid transparent;
                            border-bottom: 5px solid white;
                            margin-top: -15px;
                            margin-left: 181px;
                        }
                        ul {
                            li {
                                height: 38px;
                                line-height: 38px;
                                &:hover, &.active {
                                    background: rgba(46, 167, 224, 0.1);
                                }
                                a {
                                    display: block;
                                    width: 162px;
                                    height: 100%;
                                    border-bottom: 1px solid rgba(122, 136, 151, 0.1);
                                    margin: 0 20px;
                                    text-decoration: none;
                                    color: rgb(122, 136, 151);
                                    font-size: 14px;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    box-sizing: border-box;
                                }

                            }
                        }
                    }
                }
            }
            &:before {
                content: "";
                width: 8px;
                height: 40px;
                background: url(../../asserts/images/home/main/shadow-r.png);
                position: absolute;
                top: 2px;
                left: -8px;
            }
        }
    }
</style>
<script>
    import {mapGetters, mapState} from 'vuex'
    import * as mainConst from '@/store/mainConst.js'

    export default{
        data(){
            return {
                nowData: {},
                // 是否显示更多
                isMore: false,
                // 一级导航位置计算相关
                navTabsOuter: "",
                navTabsOuterWidth: 0,
                navTabsOuterLeft: 0,
                navTabsOuterRight: 0,
                navTabs: "",
                navTabsWidth: 0,
                navTabsLeft: 0,
                navTabsRight: 0,
                navTabItem: "",
                navTabItemLeft: 0,
                navTabItemRight: 0,
                // 默认移动的值
                distance: 0,
                // 一级导航左右移动按钮
                leftProhibit: true,
                rightProhibit: true,
                // 当前选中的以及导航index
                selectTabIndex: -1
            }
        },
        computed: {
            ...mapState([
                'navTabData'
            ])
        },
        methods: {
            // 点击一级tab，同时因为是router-view，所以进行了路由跳转
            tabItemClick(item, index){
                // 进行router-view和iframe的显示隐藏切换
                if (item.url.toLowerCase().indexOf("/iframe") == 0) {
                    // iframe:显示Iframe并广播哪个iframe中的tab显示
                    this.$store.commit(mainConst.M_SHOW_IFRAME)
                    this.$root.bus.$emit("changeIframeTab", item.tag)

                } else {
                    // iframe:隐藏Iframe
                    this.$store.commit(mainConst.M_HIDE_IFRAME)
                    this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: index})
                }
            },
            // 点击一级导航右侧按钮中list
            clickMoreItem(url, index){
                // this.isMore=false

                // 进行router-view和iframe的显示隐藏切换
                if (url.toLowerCase().indexOf("/iframe") == 0) {
                    // iframe:显示Iframe并广播哪个iframe中的tab显示
                    this.$store.commit(mainConst.M_SHOW_IFRAME)
                    this.$root.bus.$emit("changeIframeTab", url.slice(8))
                    this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: index})
                    this.$router.push(url)

                } else {
                    // iframe:隐藏Iframe
                    this.$store.commit(mainConst.M_HIDE_IFRAME)
                    this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: index})
                    this.$router.push(url)
                }
            },
            // 删除一级tab按钮
            deleteNavTab(obj, index){
                if (obj.url.toLowerCase().indexOf("/iframe") == 0) {
                    // 如果删除的一级标签页是iframe，那么1、vuex中要删除一级tab页面。2、广播iframe中的tab删除事件。3、注意顺序事件广播和vuex删除的顺序问题
                    this.$store.commit(mainConst.M_DELETE_NAVTABDATA, {navIndex: index})
                    this.$root.bus.$emit("deleteIframeTab", {tag: obj.url.slice(8), index: index})
                } else {
                    // 如果删除的一级标签页是spa页面
                    this.$store.commit(mainConst.M_DELETE_NAVTABDATA, {navIndex: index})
                    this.$root.bus.$emit("deleteView_" + obj.tag, index)
                }

                // 从新计算一级tab的位置变化
                this.selectTabIndex = this.$refs.navTabItem.length ? this.selectTabIndex : -1
                if (this.navTabsOuterWidth - this.navTabsWidth >= 0) {
                    this.$refs.navTabs.style.marginLeft = "0px"
                    this.rightProhibit = false
                    this.leftProhibit = false
                } else {
                    this.$refs.navTabs.style.marginLeft = `${this.getDefaultLeft() + this.navTabsWidth - this.navTabsOuterWidth}px`
                }
                this.leftAndRightBtnChange()
            },
            // 一级tab位置修改
            positionMove(index){
                this.$nextTick(() => {
                    let defaultLeft = this.getDefaultLeft()
                    // 获取当前选中tab位置
                    const positionObj = this.$refs.navTabItem[index].$el.getBoundingClientRect()
                    this.navTabItemLeft = positionObj.left
                    this.navTabItemRight = positionObj.right
                    // 左侧显示
                    if (this.navTabItemLeft < this.navTabsOuterLeft) {
                        this.$refs.navTabs.style.marginLeft = `${defaultLeft + this.navTabsOuterLeft - this.navTabItemLeft}px`
                        this.leftProhibit = true
                    }
                    // 右侧显示
                    if (this.navTabItemRight > this.navTabsOuterRight) {
                        this.$refs.navTabs.style.marginLeft = `${defaultLeft - (this.navTabItemRight - this.navTabsOuterRight)}px`
                        this.leftProhibit = true
                    }
                })
            },
            // 获取当前一级导航marginLeft
            getDefaultLeft(){
                let defaultLeft = this.$refs.navTabs.style.marginLeft
                return defaultLeft.length ? Number(defaultLeft.substring(0, defaultLeft.length - 2)) : 0
            },
            // 一级Tab左移
            sliderLeft (e) {
                this.navSlider(1)
            },
            // 一级Tab右移
            sliderRight (e) {
                this.navSlider(-1)
            },
            navSlider (direction) {
                const _this = this
                if (this.navTabsOuterWidth >= this.navTabsWidth) return
                this.distance += 100 * (direction || 1)
                const w = this.navTabsOuterWidth - this.navTabsWidth
                if (this.distance < w) {
                    this.distance = w
                }
                if (this.distance >= 0) {
                    this.distance = 0
                }
                this.$refs.navTabs.style.marginLeft = `${this.distance}px`
                this.getNavTabs()
                this.leftAndRightBtnChange()
                // this.$refs.navTabs.style.transform = `translateX(${this.distance}px)`
            },
            // 获取tabs位置信息
            getNavTabs(){
                const navTabsObj = this.$refs.navTabs.getBoundingClientRect()
                this.navTabsWidth = navTabsObj.width
                this.navTabsLeft = navTabsObj.left
                this.navTabsRight = navTabsObj.right
            },
            // 一地导航左右切换监控
            leftAndRightBtnChange(){
                this.leftProhibit = !!!(this.navTabsOuterLeft > this.navTabsLeft)
                this.rightProhibit = !!!(this.navTabsOuterRight < this.navTabsRight)
            },
            // 一级导航总体位置调整
            calculationTabPosition(){
                var _this = this
                this.$nextTick(() => {
                    this.navTabData.forEach((item, index) => {
                        if (item.active) {
                            _this.selectTabIndex = index
                        }
                    })
                    this.getNavTabs()

                    // 未超出范围不进行移动计算
                    if (this.navTabsOuterWidth > this.navTabsWidth) {
                        return
                    }

                    this.leftAndRightBtnChange()
                    this.positionMove(this.selectTabIndex > -1 ? this.selectTabIndex : this.$refs.navTabItem.length - 1)
                })
            }
        },
        mounted(){
            const _this = this

            // 计算一级tab外层位置取中间固定位置信息
            const navTabsOuterObj = this.$refs.navTabsOuter.getBoundingClientRect()
            this.navTabsOuterWidth = navTabsOuterObj.width
            this.navTabsOuterLeft = navTabsOuterObj.left
            this.navTabsOuterRight = navTabsOuterObj.right

            // 监听三级菜单的单击事件，防止一级tab没有显示在视野内
            this.$root.bus.$on('clickLastMenu', function () {
                _this.calculationTabPosition()
            })
        },
        updated(){
            this.calculationTabPosition()
        }
    }
</script>
