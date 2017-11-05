<style lang='scss' scoped>
.col-box {
    float: left;
    margin-right: 50px;
    li {
        margin-bottom: 12px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
.title {
    margin-bottom: 16px;
    text-align: center;
    font-size: 14px;
    color: #666;
}
.payment-method-li {
    height: 30px;
    line-height: 30px;
    .payment-method-name {
        font-size: 12px;
        color: #333;
    }
}
.business-number-li {
    .business-number-name {
        font-size: 12px;
        color: #333;
    }
}
.rate-li {
    .el-input:nth-child(1) {
        width: 80px;
    }
}
</style>
<template>
    <div class="pay-channel-info details-box">
        <div class="details-title">
            <p>支付渠道信息</p>
        </div>
        <div class="details-content clearfix">
            <div class="payment-method col-box">
                <p class="title">支付渠道</p>
                <ul>
                    <li class="payment-method-li">
                        <span class="payment-method-name">联动微信</span>
                    </li>
                    <li class="payment-method-li">
                        <span class="payment-method-name">联动支付宝</span>
                    </li>
                    <li class="payment-method-li">
                        <span class="payment-method-name">联动优势</span>
                    </li>
                </ul>
            </div>
            <div class="business-number col-box">
                <p class="title">渠道商户号</p>
                <ul>
                    <li class="business-number-li">
                        <Input />
                    </li>
                    <li class="business-number-li">
                        <Input />
                    </li>
                    <li class="business-number-li">
                        <Input />
                    </li>
                </ul>
            </div>
            <div class="rate col-box">
                <p class="title">渠道费率</p>
                <ul>
                    <li class="rate-li">
                        <Input />
                        <Input />
                    </li>
                    <li class="rate-li">
                        <Input />
                        <Input />
                    </li>
                    <li class="rate-li">
                        <Input />
                        <Input />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PayChannelInfo',
}
</script>