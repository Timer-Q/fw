<style lang="scss" scoped>
    @import './common.scss';

    .title {
        @include titleBox;
    }

    .wx-pay-box {
        position: relative;
        width: 100%;
        height: 564px;
        padding-top: 36px;
        padding-bottom: 24px;
        box-sizing: border-box;
        background-color: #fff;
        .QR-code-box {
            float: left;
            margin-left: 120px;
            margin-right: 50px;
        }
        .count-down {
            margin-bottom: 24px;
            font-size: 12px;
            color: #333;
            .count-down-num {
                color: #ee3333;
            }
        }
        .QR-code {
            width: 300px;
            height: 300px;
            margin-bottom: 24px;
        }
        .prompt {
            width: 300px;
            height: 48px;
            line-height: 48px;
            padding: 0 16px;
            box-sizing: border-box;
            border-radius: 2px;
            font-size: 14px;
            background-color: #ee3333;
            img {
                display: inline-block;
                width: 24px;
                height: 24px;
                vertical-align: middle;
            }
            p {
                display: inline-block;
                margin-left: 10px;
                color: #fff;
            }
        }
        .back-index {
            position: absolute;
            left: 24px;
            bottom: 24px;
            p {
                display: inline-block;
                color: #28a7e1;
            }
            .left-arrow {
                color: #28a7e1;
            }
        }
    }
</style>
<template>
    <div class="wx-pay">
        <div class="title">
            <span>微信支付</span>
        </div>
        <div class="wx-pay-box">
            <div class="QR-code-box">
                <p class="count-down">
                    距离二维码过期还有<span class="count-down-num">{{ countdownNum }}</span>秒，过期后请刷新页面重新获取二维码
                </p>
                <div></div>
                <img :src="qrCodeUrl" alt="二维码图片" class="QR-code">
                <div class="prompt">
                    <img :src="saoyisao" alt="扫一扫">
                    <p>请使用微信扫一扫 扫描二维码支付</p>
                </div>
            </div>
            <img :src="phoneBg" alt="扫一扫教程" class="tutorial">
            <router-link replace :to="{name: 'pay_checkoutCounter_normal'}" class="back-index">
                <span class="left-arrow"><</span>
                <p>选择其他支付方式</p>
            </router-link>
        </div>
    </div>
</template>
<script>
    import phoneBg from '@/asserts/images/Pay/checkoutCounter/phone-bg.png'
    import saoyisao from '@/asserts/images/Pay/checkoutCounter/saoyisao.png'
    import $http from '@Pay/services/checkoutCounter'
    import {mapState} from 'vuex'

    export default {
        name: 'WxPay',
        data() {
            return {
                phoneBg,
                saoyisao,
                countdownNum: 60,
                qrCodeUrl: ''
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.orderInfo
            })
        },
        methods: {
            countdown() {
                const countdown = setInterval(() => {
//                    倒计时到0时恢复正常状态
                    if (this.countdownNum === 0) {
                        clearInterval(countdown)
                    } else {
                        this.countdownNum--
                    }
                }, 1000)
            },
            showQRCode({status, result}) {
                if (status.statusCode === 0) {
                    this.qrCodeUrl = result.qrCodeUrl
                } else {
                    console.log(status.statusReason)
                }
            },
            async a_generateCode(data, cb) {
                try {
                    const result = await $http.generateCode(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            }
        },
        created() {
            this.a_generateCode({
                orderNo: this.orderInfo.orderNo,
//                    支付方式
                paymentMode: 'WXINITIATIVE',
//                    扫码类型
                scancodeType: 'WECHAT',
                amountMoney: this.orderInfo.amountMoney
            }, this.showQRCode)
        },
        mounted() {
            this.countdown()
        }
    }
</script>
