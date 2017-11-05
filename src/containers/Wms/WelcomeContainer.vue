<template>
    <div class="welcomeContainer">
       欢迎使用WMS后台管理系统，如果有bug,请反馈到技术组。
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    /*不要嵌套太深*/
    /*定义内容区域常量*/
    $contentWidth: 1200px;

    .homeContainer {
        overflow-y: visible;
        position: static;
        > div {
            width: 100%;
        }
    }

    .header{
        background-color: limegreen;
        height:60px;
    }

    .main{

        position: absolute;
        top: 60px;
        bottom: 0;
        display: flex;
    }

    .menu{
        width: 200px;
        background-color: purple;
        float: left;
    }

    .content{
        float: left;
        flex: 1;
        background-color: yellowgreen;
    }


</style>

<script>
    export default{
        data(){
            return {

            }
        }
    }
</script>
