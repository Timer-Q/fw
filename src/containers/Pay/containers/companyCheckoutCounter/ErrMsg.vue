<style lang="scss" scoped>
    @import './common.scss';

    .verified-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 200px;
        border: 8px solid #ccc;
    }

    .title {
        position: relative;
        @include titleBox;
        .close {
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translate(0, -50%);
            cursor: pointer;
        }
    }

    .verified-content {
        position: relative;
        height: 164px;
        padding: 46px 68px 0 68px;
        box-sizing: border-box;
        background-color: #fff;
        .tips {
            font-size: 12px;
            color: #333;
        }
        .quick-btn {
            position: absolute;
            bottom: 10px;
            right: 16px;
            padding: 6px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f5f5f5;
            cursor: pointer;
            span {
                font-size: 12px;
                color: #666;
            }
        }
    }
</style>
<template>
    <div class="verified-box">
        <div class="title">
            <span>错误提示</span>
        </div>
        <div class="verified-content">
            <p class="tips">{{ errMsg }}</p>
            <div class="quick-btn">
                <span @click="$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'errMsg'}])">确定</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ErrMsg',
        props: ['errMsg']
    }
</script>
