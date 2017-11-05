<style lang="scss" scoped>
    .checkout-counter-header {
        width: 100%;
        height: 76px;
        line-height: 76px;
        box-shadow: 0 4px 6px rgba(88, 103, 120, 0.2);
        background-color: #fff;
        .checkout-counter-header-box {
            width: 990px;
            min-width: 990px;
            margin: 0 auto;
            height: 76px;
        }
    }

    .logo {
        float: left;
        height: 76px;
        box-sizing: border-box;
        .logo-img {
            display: inline-block;
            height: 40px;
            margin-top: 18px;
            vertical-align: top;
        }
        span {
            margin-left: 10px;
            font-size: 18px;
            color: #666;
        }
    }

    .contorl {
        float: right;
        span {
            margin-right: 10px;
            font-size: 12px;
            color: #333;
            cursor: pointer;
            &:nth-child(1) {
                cursor: auto;
            }
        }
        .horizontal {
            color: #ccc;
            cursor: auto;
        }
    }
</style>
<template>
    <div class="checkout-counter-header">
        <div class="checkout-counter-header-box">
            <div class="logo">
                <img :src="logo" alt="logo" class="logo-img">
                <span>收银台</span>
            </div>
            <div class="contorl">
                <span>你好，青牛</span>
                <span class="horizontal">|</span>
                <span>退出</span>
            </div>
        </div>
    </div>
</template>
<script>
    import logo from '@/asserts/images/Pay/checkoutCounter/logo.png'

    export default {
        name: 'Header',
        data() {
            return {
                logo
            }
        }
    }
</script>
