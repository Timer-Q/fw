<template>
    <div class="appContainer">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
    .appContainer {
        width: 100%;
        height: 100%;
    }
</style>

<script>
    export default{
        data(){
            return {}
        },
        mounted(){
            // 接下来要做的事情
            // TODO:  1、动态push路由，导致的tab切换
            // TODO： 2、浏览器的后退按钮要处理
            // TODO:  3、控制页面第二次刷新问题，还有/的问题
            // TODO:  4、文档
        }
    }
</script>
