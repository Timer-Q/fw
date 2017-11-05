<style lang='scss' scoped>
    .order-info {
        position: relative;
        padding: 24px 0;
    }

    .info {
        .title {
            margin-bottom: 10px;
            span {
                font-size: 14px;
                color: #333;
            }
            .horizontal {
                margin: 0 10px;
            }
        }
        .order-number {
            font-size: 12px;
            color: #666;
        }
    }

    .total {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        font-size: 12px;
        color: #333;
        .number {
            margin-right: 4px;
            font-size: 20px;
            color: #ee3333;
        }
    }
</style>
<template>
    <div class="order-info">
        <div class="info">
            <p class="title">
                <span>消费订单</span>
                <span class="horizontal">|</span>
                <span>订单提交成功，请尽快付款！</span>
            </p>
            <p class="order-number">订单号 {{ businessOrderNo }}</p>
        </div>
        <p class="total">
            <span>应付金额</span>
            <span class="number">{{ amountMoney }}</span>
            <span>元</span>
        </p>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'OrderInfo',
        data() {
            return {
                businessOrderNo: '',
                amountMoney: ''
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.orderInfo
            })
        },
        created() {
            this.businessOrderNo = this.orderInfo.businessOrderNo
            this.amountMoney = this.orderInfo.amountMoney
        }
    }
</script>
