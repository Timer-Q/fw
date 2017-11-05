<template>
    <div class="main-nav f14 clearfix" @mouseleave="funMenu.menuIsShow=false">
        <div class="f_l lt-tab">
            <ul class="l-nav clearfix">
                <li class="main f_l">
                    <a href="javascript:;" class="f16 fun" @click="getMainMenu">功能导航</a>
                    <div class="more-menu clearfix" v-show="funMenu.firstMenu.length&&funMenu.menuIsShow">
                        <!--一级导航-->
                        <ul class="first-menu f_l">
                            <li v-for="(item,index) in funMenu.firstMenu" @click="clickByMenu($event,item,'firstMenu')">
                                <a href="javascript:;" :class="{active:item.active}" :index="index">{{item.resourceName}}</a>
                            </li>
                        </ul>
                        <!--二级导航-->
                        <ul class="next-menu f_l" v-show="funMenu.nextMenu.length">
                            <li v-for="(item,index) in funMenu.nextMenu" @click="clickByMenu($event,item,'nextMenu')">
                                <a href="javascript:;" :class="{active:item.active}" :index="index">{{item.resourceName}}</a>
                            </li>
                        </ul>
                        <!--三级导航-->
                        <!--存在四级导航-->
                        <div class="last-menu f_l dl" v-show="funMenu.lastMenu.length">
                            <div v-for="(item,index) in funMenu.lastMenu" class="dt">
                                <div v-if="item.childFuncs.length">
                                    <span>{{item.resourceName }}</span>
                                    <ul class="dd">
                                        <li v-for="(item,index) in item.childFuncs"
                                            @click="clickByMenu($event,item,'lastMenu')">
                                            <a href="javascript:;">{{item.resourceName}}</a>
                                            <!--:class="{active:item.active}"-->
                                        </li>
                                    </ul>
                                </div>
                                <!--三级导航可点击-->
                                <div v-else>
                                    <ul class="dd">
                                        <li @click="clickByMenu($event,item,'lastMenu')">
                                            <a href="javascript:;">{{item.resourceName}}</a>
                                            <!--:class="{active:item.active}"-->
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-index f_l">
                    <a href="javascript:;">首页</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .main-nav {
        position: relative;
        height: 42px;
        line-height: 42px;
        background: #eee;
        border-bottom: 1px solid #ddd;
    }

    .main-nav a {
        color: #303e51;
        text-decoration: none;
    }

    .main-nav a:hover {
        color: #438eb9;
    }

    .main-nav .main {
        /*padding: 0 16px;*/
        text-align: center;
        border-right: 1px solid #ddd;
        position: relative;
        background: #eee;
        width: 122px;
    }

    .main-nav .main.active, .main-nav .main:hover {
        background: white;
    }

    .main-nav .more-menu {
        position: fixed;
        top: 84px;
        left: 0;
        max-height: 500px;
        bottom: 124px;
        z-index: 998;
        background: #fff;
        border: 1px solid #ddd;
        border-left: none;
        border-top: 0;
        overflow: hidden;
        box-shadow: 1px 1px 10px #ddd;
    }

    .main-nav .more-menu ul, .main-nav .more-menu .dl {
        text-align: left;
        overflow: auto;
    }

    .main-nav .more-menu a {
        font-size: 14px;
        color: #303e51;
        text-decoration: none;
    }

    .main-nav .more-menu a:hover, .main-nav .more-menu a.active {
        color: rgb(46, 167, 224);
    }

    .main-nav .more-menu .first-menu {
        height: 100%;
        border-right: 1px solid #ddd;
        box-shadow: -1px 0px 5px #ddd inset;
        /*width: 138px;*/
    }

    .main-nav .more-menu .first-menu li {
        height: 36px;
        line-height: 36px;
        margin: 0 15px 0 6px;
        min-width: 94px;
    }

    .main-nav .more-menu .first-menu a {
        display: block;
        background: url(../../asserts/images/home/main/icon_1.png) no-repeat 5px center;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #dddddd;
        padding-left: 20px;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-indent: 5px;
    }

    .main-nav .more-menu .first-menu a.active, .main-nav .more-menu .first-menu a:hover {
        background: url(../../asserts/images/home/main/icon_2.png) no-repeat 5px center rgb(46, 167, 224);
        color: white;
        border: 0;
    }

    .main-nav .more-menu .next-menu {
        height: 100%;
        border-right: 1px solid #ddd;
        box-shadow: -1px 0px 5px #ddd inset;
        /*width: 138px;*/
        line-height: 14px;
    }

    .main-nav .more-menu .next-menu li:first-child {
        margin-top: 10px;
    }

    .main-nav .more-menu .next-menu li {
        margin-bottom: 16px;
        margin-left: 16px;
    }

    .main-nav .more-menu .next-menu li a {
        border-left: 2px solid transparent;
        padding-left: 10px;
        margin-right: 24px;
    }

    .main-nav .more-menu .next-menu li a:hover, .main-nav .more-menu .next-menu li a.active {
        border-left: 2px solid rgb(46, 167, 224);
    }

    .main-nav .more-menu .last-menu {
        height: 100%;
        min-width: 288px;
        line-height: 14px;
    }

    .main-nav .more-menu .last-menu .dt {
        margin-left: 16px;
        margin-top: 10px;
        span {
            color: #566678;
        }
    }

    .main-nav .more-menu .last-menu .dd {
        color: #7a8897;
        margin-top: 16px;
        margin-left: 4px;
        > li {
            margin-bottom: 16px;
            a {
                border-left: 2px solid transparent;
                padding-left: 6px;
                margin-right: 16px;
                &:hover, &.active {
                    border-color: #2ea7e0;
                }
            }
        }
    }

    /*.main-nav .more-menu .last-menu dd a:hover,.main-nav .more-menu .last-menu dd a.active{*/
    /*border-left: 2px solid rgb(46,167,224);*/
    /*}*/
    .main-nav .main .fun {
        width: 100%;
        height: 100%;
        display: block;
    }

    .main-nav .main .fun:before {
        content: "";
        width: 18px;
        height: 18px;
        background: url("../../asserts/images/home/main/icon-all.png");
        background-position: -89px -7px;
        display: inline-block;
        margin-right: 10px;
        margin-top: 2px;
        vertical-align: text-top;
    }

    .main-nav .l-nav {
        z-index: 2;
    }

    .main-nav .nav-index {
        width: 90px;
        text-align: center;
        position: relative;
        background: #eee;
    }

    .main-nav .nav-index:after {
        content: "";
        width: 8px;
        height: 40px;
        background: url(../../asserts/images/home/main/shadow-l.png);
        position: absolute;
        top: 2px;
        left: 90px;
    }

    .main-nav .lt-tab {
        position: absolute;
        left: 0;
        z-index: 2;
        border-bottom: 1px solid #ddd;
    }

    /*����筝㊨��tab-----------------------------------------*/
    .main-nav .ct-tab {
        position: absolute;
        z-index: 1;
        left: 213px;
        width: 10000000px;
    }

    .main-nav .ct-tab .ct-ul {

    }

    .main-nav .ct-tab .ct-ul li {
        position: relative;
        float: left;
    }

    .main-nav .ct-tab .ct-ul li a {
        height: 24px;
        line-height: 24px;
        margin: 9px 0;
        min-width: 90px;
        /*max-width: 190px;*/
        border-right: 1px solid #ddd;
        display: block;
        text-align: center;
        position: relative;
    }

    .main-nav .ct-tab .ct-ul li a i {
        display: none;
    }

    .main-nav .ct-tab .ct-ul li a i {
        display: none;
    }

    .main-nav .ct-tab .ct-ul li a .content {
        display: block;
        max-width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .main-nav .ct-tab .ct-ul li a:hover {
        z-index: 1;
    }

    .main-nav .ct-tab .ct-ul li:first-child a:hover, .main-nav .ct-tab li:first-child a.active {
        margin-left: 0;
        margin-right: 0;
    }

    .main-nav .ct-tab .ct-ul li a:hover, .main-nav .ct-tab li a.active {
        max-width: 250px;
        display: block;
        text-align: center;
        position: relative;
        border: 0;
        margin: 0 -20px;
        margin-top: 4px;
        color: black;
        padding: 0;
    }

    .main-nav .ct-tab .padding {
        width: auto;
        padding: 0 16px;
    }

    .main-nav .ct-tab .ct-ul li a:hover > i, .main-nav .ct-tab .ct-ul li a.active > i {
        display: inline-block;
        width: 34px;
        height: 37px;
        float: left;
    }

    .main-nav .ct-tab .ct-ul li a:hover .line-l {
        background: url(../../asserts/images/home/main/line_left.png) no-repeat;
    }

    .main-nav .ct-tab .ct-ul li a:hover .line-r {
        background: url(../../asserts/images/home/main/line_right.png) no-repeat;
    }

    .main-nav .ct-tab .ct-ul li a.active .line-l {
        background: url(../../asserts/images/home/main/line_sel_left.png) no-repeat;
    }

    .main-nav .ct-tab .ct-ul li a.active .line-r {
        background: url(../../asserts/images/home/main/line_sel_right.png) no-repeat;
    }

    .main-nav .ct-tab .ct-ul li a:hover .content, .main-nav .ct-tab li a.active .content {
        border-top: 1px solid #ddd;
        float: left;
        line-height: 36px;
        min-width: 60px;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: rgb(245, 245, 245);
    }

    .main-nav .ct-tab .ct-ul li a:hover .cha, .main-nav .ct-tab .ct-ul li a.active .cha {
        background: rgb(245, 245, 245);
        width: 20px;
        height: 36px;
        line-height: 36px;
        border-top: 1px solid #ddd;
        padding-left: 7px;
        color: #303e51;
    }

    .main-nav .ct-tab .ct-ul li a.active .content, .main-nav .ct-tab .ct-ul li a.active .cha {
        background: white;
    }

    .main-nav .ct-tab .ct-ul li a .cha {
        color: #eee;
    }

    .main-nav .ct-tab .ct-ul li a .cha:hover {
        color: black;
    }

    .main-nav .ct-tab .ct-ul li a.active {
        z-index: 2;
    }

    /*�����劽唱-------------------------------------------------------*/

</style>
<script>
    import axios from 'axios'
    // import { mapState} from 'vuex'
    import * as mainConst from '@/store/mainConst.js'

    export default{
        data(){
            return {
                funMenu: {
                    // 一级菜单
                    firstMenu: [],
                    // 二级菜单
                    nextMenu: [],
                    // 三级菜单
                    lastMenu: [],
                    // 是否显示
                    menuIsShow: true
                }
            }
        },
        methods: {
            // 调用方法获取三级菜单列表
            getMainMenu(){
                var _this = this
                if (this.funMenu.firstMenu.length) {
                    this.funMenu.menuIsShow = true
                } else {
                    // TODO:检验权限的判断
                    // 方法一：从localstorage中获取
                    // _this.funMenu.firstMenu = JSON.parse(localStorage['funcMenuList'])

                    // 方法二、从vuex中获取
//                    _this.funMenu.firstMenu = _this.$store.state.funcMenuList

                    // 方法三、假数据
                    axios.get("data/menu_json.json")
                        .then(function (res) {
                            _this.funMenu.firstMenu = res.data.result.funcs
//                            for(let item in resObj){
//                                _this.funMenu.firstMenu= resObj[item]
//                            }
                        })
                }
            },
            // 点击菜单展开下一级别列表事件
            clickByMenu(e, menuItem, level){
                let menuList = this.funMenu[level]
                switch (level) {
                    case "firstMenu": {
                        this.funMenu.nextMenu = this.getFirstAndNextVal(menuList, menuItem)
                        this.funMenu.lastMenu = []
                    }
                        break
                    case "nextMenu": {
                        menuItem.url.length ? this.clickMenuJump(menuList, menuItem) : this.funMenu.lastMenu = this.getFirstAndNextVal(menuList, menuItem)
                    }
                        break
                    case "lastMenu": {
                        this.clickMenuJump(menuList, menuItem)
                    }
                        break
                }
            },
            // 点击有url的菜单，跳转事件
            clickMenuJump(menuList, menuItem){
                this.funMenu.menuIsShow = false
                this.lastmenuChange(menuList, menuItem)

                let iframeTabItem = {}
                // 1、路由跳转和iframe的显示隐藏
                if (menuItem.url.toLowerCase().indexOf("/") != 0 || menuItem.url.toLowerCase().indexOf("/iframe") == 0) {
                    // 判断如果是iframe的url,显示iframe
                    // 定义一个新的item对象，防止对象的引用
                    iframeTabItem = Object.assign({}, menuItem)
                    this.$store.commit(mainConst.M_SHOW_IFRAME)

                    //  待优化：应该有优化为手动赋值样式
                    // （1）、此处利用router-view的特性，让一级tab变颜色
                    // （2）、这个还是控制一级tab点击切换tab标签的重要因素
                    // 因为原始的iframe的url已经改变，所以要保存到一个新的变量里面，如果已经有了就不需要在放了
                    if (!menuItem.iframeUrl) {
                        menuItem.iframeUrl = menuItem.url
                    } else {
                        iframeTabItem.url = menuItem.iframeUrl
                    }
                    menuItem.url = `/iframe/${menuItem.tag}`
                    this.$router.push(`/iframe/${menuItem.tag}`)

                } else {
                    // 判断如果是spa的url，隐藏iframe
                    this.$store.commit(mainConst.M_HIDE_IFRAME)
                    this.$router.push(menuItem.url)
                }

                // 2、判断vuex中是否有重复的tab标签
                let navTabData = this.$store.state.navTabData
                for (let i = 0; i < navTabData.length; i++) {
                    if (navTabData[i].url == menuItem.url) {

                        // 已经有页签了，一级tab内容不重新渲染
                        // 切换一级tab页签的激活样式
                        this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: i})
                        // 从新计算一级tab位置
                        this.$root.bus.$emit("clickLastMenu", menuItem)

                        if (menuItem.url.toLowerCase().indexOf("/iframe") == 0) {
                            // 如果已经iframe中的tab已经存在，那么触发iframe中的切换事件
//                            this.$store.commit(mainConst.M_SHOW_IFRAME)
                            this.$root.bus.$emit("changeIframeTab", menuItem.url.slice(8))
                        }
                        return
                    }
                }

                // 3、向vuex中添加一级tab
                //  默认是否选中
                menuItem.active = true
                // 向一级tab中添加新的tab标签
                this.$store.commit(mainConst.M_PUSH_NAVTABDATA, menuItem)
                this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: navTabData.length - 1})
                // 向iframe中的tab添加页签
                this.$root.bus.$emit("addIframeTab", iframeTabItem)
            },
            // 清空导航属性值，确保再次点击无选中样式及不匹配数据
            lastmenuChange(menuList, menuItem){
                this.funMenu.firstMenu.forEach(function (item) {
                    item.active = false
                })
                this.funMenu.nextMenu.forEach(function (item) {
                    item.active = false
                })
                this.funMenu.lastMenu.forEach(function (item) {
                    item.active = false
                })
                this.funMenu.nextMenu = []
                this.funMenu.lastMenu = []
            },
            // 增加选中样式及赋值下级菜单
            getFirstAndNextVal(menuList, menuItem){
                var childFuncs = []
                for (let i = 0; i < menuList.length; i++) {
                    if (menuList[i].permissionId == menuItem.permissionId) {
                        menuList[i].active = true
                        childFuncs = menuList[i].childFuncs || []
                    } else {
                        menuList[i].active = false
                    }
                }
                return childFuncs
            }
        }
    }
</script>
