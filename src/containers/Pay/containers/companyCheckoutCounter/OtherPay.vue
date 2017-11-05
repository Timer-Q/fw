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
            <div class="online-bank" @click="onlineBankPay">
                <img :src="UnionPayLogo" alt="银联logo" class="other-logo">
                <span class="other-name">网银支付</span>
            </div>
        </div>
    </div>
</template>
<script>
    import UnionPayLogo from '@/asserts/images/Pay/checkoutCounter/UnionPay-logo.png'
    import {mapState} from 'vuex'

    export default {
        name: 'Other',
        data() {
            return {
                UnionPayLogo
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.companyOrderInfo
            })
        },
        methods: {
            onlineBankPay() {
                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'bank', isOnline: true}])
            }
        }
    }
</script>
