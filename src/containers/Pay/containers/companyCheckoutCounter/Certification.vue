<style lang="scss" scoped>
    @import './common.scss';

    .verified {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }

    .verified-box {
        position: absolute;
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
    <div class="verified">
        <div class="verified-box">
            <div class="title">
                <span>实名认证</span>
                <span class="close" @click="closeDialog">x</span>
            </div>
            <div class="verified-content">
                <p class="tips">很抱歉，您还没有实名认证暂时无法添加快捷付款，快去实名认证吧！</p>
                <div class="quick-btn">
                    <span>立即实名认证</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Certification',
        methods: {
            closeDialog() {
                this.$root.bus.$emit('checkoutCounter_isShowDialog', ['certification'])
            }
        }
    }
</script>
