<style lang='scss' scoped>
    @import './common.scss';

    .other {
        @include outBox;
    }

    .title {
        @include titleBox;
    }

    .other-box {
        padding: 27px 0 27px 24px;
        > div {
            float: left;
        }
        .other-logo {
            display: inline-block;
            height: 24px;
            vertical-align: middle;
            cursor: pointer;
        }
        .other-name {
            margin-left: 10px;
            margin-right: 16px;
            font-size: 16px;
            color: #333;
            cursor: pointer;
        }
        .horizontal {
            margin-right: 10px;
            color: #ccc;
        }
    }
</style>
<template>
    <div class="other">
        <div class="title">
            <span>其他支付</span>
        </div>
        <div class="other-box clearfix">
            <div class="wx" @click="wxPay">
                <img :src="wxLogo" alt="微信logo" class="other-logo">
                <span class="other-name">微信支付</span>
                <span class="horizontal">|</span>
            </div>
            <div class="online-bank" @click="onlineBankPay">
                <img :src="UnionPayLogo" alt="银联logo" class="other-logo">
                <span class="other-name">网银支付</span>
            </div>
        </div>
    </div>
</template>
<script>
    import wxLogo from '@/asserts/images/Pay/checkoutCounter/wx-logo.png'
    import UnionPayLogo from '@/asserts/images/Pay/checkoutCounter/UnionPay-logo.png'
    import {mapState} from 'vuex'

    export default {
        name: 'Other',
        data() {
            return {
                wxLogo,
                UnionPayLogo
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.orderInfo
            })
        },
        methods: {
            wxPay() {
                this.$router.replace({
                    name: 'pay_checkoutCounter_wxPay'
                })
            },
            onlineBankPay() {
                this.$root.bus.$emit('checkoutCounter_isShowDialog', ['bank', true])
            }
        }
    }
</script>
