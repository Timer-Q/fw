<template>
    <div class="homeContainer">
        <div v-once :is='headerTemp'></div>
        <div class="menu-tabs-row">
            <navigation-temp></navigation-temp>
            <tabs-temp></tabs-temp>
        </div>
        <content-temp></content-temp>
    </div>
</template>

<style scoped lang="scss">
    /*不要嵌套太深*/

    /*定义内容区域常量*/

    $contentWidth: 1200px;

    .homeContainer {
        overflow-y: visible;
        position: static;
        width: 100%;
        height: 100%;
        > div {
            width: 100%;
        }
    }

    .menu-tabs-row {
        position: relative;
        z-index: 1;
    }
</style>

<script>

    import {mapState} from 'vuex'
    import * as mainConst from '@/store/mainConst.js'

    /***引入各组件Header部分***/
    import crmHeaderTemp from '@Crm/HeaderTemplate.vue'
    import b2bHeaderTemp from '@B2B/HeaderTemplate.vue'
    import billingHeaderTemp from '@Billing/HeaderTemplate.vue'
    import permissionHeaderTemp from '@Permission/HeaderTemplate.vue'
    import payHeaderTemp from '@Pay/HeaderTemplate.vue'
    import tmsHeaderTemp from '@Tms/HeaderTemplate.vue'
    import wmsHeaderTemp from '@Wms/HeaderTemplate.vue'
    import coderuleHeaderTemp from '@CodeRule/HeaderTemplate.vue'
    import scmHeaderTemp from '@Scm/HeaderTemplate.vue'

    /***引入主体部分***/
    import navigationTemp from '@/containers/main/MainNavigation.vue'
    import tabsTemp from '@/containers/main/TabsTemplate.vue'
    import contentTemp from '@/containers/main/ContentTemplate.vue'
    export default {
        data() {
            return {
                headerTemp: ''
            }
        },
        components: {
            navigationTemp,
            tabsTemp,
            contentTemp,
            crmHeaderTemp,
            b2bHeaderTemp,
            billingHeaderTemp,
            permissionHeaderTemp,
            payHeaderTemp,
            tmsHeaderTemp,
            wmsHeaderTemp,
            coderuleHeaderTemp,
            scmHeaderTemp
        },
        created() {
            let urlArr = this.$route.path.split('/')
            switch (`/${urlArr[1]}`) {
                case '/crm':
                    this.headerTemp = 'crmHeaderTemp'
                    return
                case '/b2b':
                    this.headerTemp = 'b2bHeaderTemp'
                    return
                case '/billing':
                    this.headerTemp = 'billingHeaderTemp'
                    return
                case '/permission':
                    this.headerTemp = 'permissionHeaderTemp'
                    return
                case '/pay':
                    this.headerTemp = 'payHeaderTemp'
                    return
                case '/tms':
                    this.headerTemp = 'tmsHeaderTemp'
                    return
                case '/wms':
                	this.headerTemp = 'wmsHeaderTemp'
                    return
                case '/coderule':
                    this.headerTemp = 'coderuleHeaderTemp'
                    return
                case '/scm':
                    this.headerTemp = 'scmHeaderTemp'
                    return
            }
        },
        computed: {
            ...mapState([
                'system'
            ])
        },
        mounted(){
            // TODO：开发阶段是首页，发布的时候，还要判断鉴权，放在登录页,这点肯定要从新做处理
            // 1、如果是/访问404
            if (this.$route.path == '/') {
                this.$router.push('404')
                return
            }

            if (this.$route.path.toLowerCase().indexOf("/iframe") == 0) {
                this.$router.push('404')
                return
            }
            // 2、如果是直接跳转进来的连接，全部跳转首页或者登录页
            let urlArr = this.$route.path.split('/')
            if (urlArr.length > 2) {

                if (`/${urlArr[1]}` == '/iframe') {
                    this.$router.push('404')
                }

                // 为全局system赋值
                this.$store.commit(mainConst.M_SET_SYSTEMURL, `/${urlArr[1]}`)
                this.$router.push(`/${urlArr[1]}`)
            } else {

                if (this.$route.path == '/iframe') {
                    this.$router.push('404')
                }
                // 为全局system赋值
                this.$store.commit(mainConst.M_SET_SYSTEMURL, this.$route.path)
            }
        }

    }
</script>
