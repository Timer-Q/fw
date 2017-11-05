<style lang='scss' scoped>
    @import './common.scss';

    .checkout-counter-bee-pay {
        @include outBox;
    }

    .title {
        @include titleBox;
        .telescopic {
            float: right;
            margin-right: 10px;
            cursor: pointer;
            user-select: none;
            p {
                display: inline-block;
            }
            .telescopic-name {
                font-size: 12px;
                color: #666;
            }
            i {
                font-size: 8px;
                transform: scale(.8);
                transition: all .2s;
            }
        }
    }

    .bank-box {
        overflow: hidden;
        width: 100%;
        height: 121px;
        .one-bank {
            height: 60px;
            line-height: 60px;
            padding: 0 24px;
            .el-radio__label {
                display: none;
            }
        }
        .bank-content {
            height: 100%;
            padding-left: 16px;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            cursor: pointer;
            .bank-logo {
                display: inline-block;
                width: 24px;
                height: 24px;
                margin-left: 24px;
                margin-right: 36px;
                vertical-align: text-top;
            }
            .bank-name {
                margin-right: 36px;
                font-size: 16px;
                color: #333;
            }
            .bank-info, .bank-type {
                font-size: 12px;
                color: #666;
            }
        }
    }

    .quick-pay {
        height: 60px;
        line-height: 60px;
        padding-left: 64px;
        span {
            display: inline-block;
            height: 34px;
            padding: 0 24px;
            margin-top: 12px;
            border: 1px solid #ccc;
            border-radius: 2px;
            line-height: 36px;
            font-size: 12px;
            color: #666;
            cursor: pointer;
        }
    }

    .now-pay {
        padding: 0 24px;
        .now-pay-content {
            padding-top: 24px;
            border-top: 4px solid #ccc;
        }
        .now-pay-content-line {
            height: 30px;
            line-height: 30px;
            margin-bottom: 16px;
            &:last-child {
                margin-bottom: 0;
            }
            .label {
                @include labelStyle;
            }
            input {
                @include inputStyle;
            }
            .tips {
                @include tipsStyle;
            }
            .error {
                margin-left: 20px;
                font-size: 12px;
                color: #ee0000;
            }
        }
    }

    .now-pay-btn {
        @include btnBox;
    }
</style>
<style lang="scss">
    .checkout-counter-bee-pay {
        .el-radio__label {
            display: none;
        }
    }
</style>
<template>
    <div class="checkout-counter-bee-pay">
        <div class="title">
            <span>蜂网支付</span>
            <div class="telescopic" @click="slideList" v-show="isShowMore">
                <p class="telescopic-name">{{ telescopicName }}</p>
                <i class="el-icon-arrow-down" :style="arrowDownStyle"></i>
            </div>
        </div>
        <div class="bank-box" :style="bankBoxStyle">
            <div class="one-bank">
                <div class="bank-content" @click="switchPayMethod('balance')">
                    <Radio v-model="payMethod" label="balance"></Radio>
                    <img :src="balance" alt="余额logo" class="bank-logo">
                    <span class="bank-name">余额支付</span>
                    <span class="bank-info">可用余额  {{ cashAmount }}  元</span>
                </div>
            </div>
            <div class="one-bank" v-for="(item, index) in fastBankList" :key="item.id">
                <div class="bank-content" @click="switchPayMethod(item)">
                    <Radio v-model="payMethod" :label="item.id"></Radio>
                    <img :src="item.bank_sign" :alt="item.bank_sign" class="bank-logo">
                    <span class="bank-name">{{ item._bankName}}</span>
                    <span class="bank-type">{{ item.cardType}}</span>
                    <span class="bank-info">{{ `（尾号  ${item.cardNo}）` }}</span>
                </div>
            </div>
        </div>
        <div class="quick-pay">
            <span @click="addFastPay">添加快捷付款</span>
        </div>
        <div class="now-pay">
            <div class="now-pay-content">
                <div class="now-pay-content-line" v-show="isBank">
                    <span class="label">短信验证码</span>
                    <input
                        placeholder="请输入验证码"
                        v-model="form.smsCode"
                        @focus="hideError('smsCode')"
                    />
                    <span class="tips" @click="getSmsCode">{{ msgCodeContent }}</span>
                    <span class="error" v-show="check.smsCode">请输入验证码</span>
                </div>
                <div class="now-pay-content-line">
                    <span class="label">支付密码</span>
                    <input
                        placeholder="请输入密码"
                        type="password"
                        v-model="form.password"
                        @focus="hideError('password')"
                    />
                    <span class="tips">忘记密码</span>
                    <span class="error" v-show="check.password">请输入密码</span>
                </div>
            </div>
        </div>
        <div class="now-pay-btn">
            <p @click="immediatelyPay">立即支付</p>
        </div>
    </div>
</template>
<script>
    import balance from '@/asserts/images/Pay/checkoutCounter/balance.png'
    import bankImg from '@Pay/utils/bankImg-manage'
    import bankName from '@Pay/utils/bank-map'
    import $http from '@Pay/services/checkoutCounter'
    import {mapState} from 'vuex'

    export default {
        name: 'BeePay',
        data() {
            return {
//                银行图片
                ...bankImg,
//                余额图片
                balance,
//                余额数值
                cashAmount: 0,
//                展开收起下拉操作显示控制
                isShowMore: false,
//                展开收起下拉操作显示文字
                telescopicName: '更多',
                arrowDownStyle: {
                    transform: 'scale(.8) rotate(0)',
                },
                bankBoxStyle: {
                    height: 'hidden'
                },
//                支付方式
                payMethod: 'balance',
                isBank: false,
//                获取验证码节流阀
                isGetSmsCode: true,
                msgCodeContent: '获取验证码',
//                快捷支付银行列表
                fastBankList: [],
//                当前选中支付方式信息
                currentPayInfo: {},
                form: {
                    smsCode: '',
                    password: '',
                },
                check: {
                    smsCode: false,
                    password: false
                }
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.orderInfo
            })
        },
        watch: {
//            监听支付方式的变化，如果是余额支付，只显示支付密码的框
            payMethod(val, oldVal) {
                if (val === 'balance') {
                    this.isBank = false
                } else {
                    this.isBank = true
                }
            }
        },
        methods: {
            hideError(key) {
                this.check[key] = false
            },
            renderUserInfo({status, result}) {
                if (status.statusCode === 0) {
                    const {cashAmount} = result
                    this.cashAmount = cashAmount
                } else {
                    console.log(status.statusReason)
                }
            },
            renderBankList({status, result}) {
                if (status.statusCode === 0) {
                    if (result.length) {
                        this.fastBankList = result
//                    循环银行列表，根据银行简码得到银行汉字
                        for (let item of this.fastBankList) {
                            item._bankName = bankName[item.bankSign]
                        }
//                    如果长度银行列表的长度大于2，那么显示更多/收起下拉操作
                        if (this.fastBankList.length >= 2) {
                            this.isShowMore = true
                        }
                    } else {
                        this.bankBoxStyle.height = '60px'
                    }
                } else {
                    console.log(status.statusReason)
                }
            },
            slideList() {
                if (this.telescopicName === '更多') {
                    this.telescopicName = '收起'
                    this.arrowDownStyle.transform = 'scale(.8) rotate(180deg)'
                    this.bankBoxStyle.height = 'auto'
                } else {
                    this.telescopicName = '更多'
                    this.arrowDownStyle.transform = 'scale(.8) rotate(0)'
                    this.bankBoxStyle.height = '120px'
                }
            },
            switchPayMethod(item) {
//                清空所有的错误提示
                for (let key in this.check) {
                    this.check[key] = false
                }
//                如果是余额支付
                if (item === 'balance') {
                    this.payMethod = item
                    return
                }
//                点击一行切换选中
                this.payMethod = item.id
                this.currentPayInfo = item
            },
            addFastPay() {
                this.$root.bus.$emit('checkoutCounter_isShowDialog', ['bank'])
            },
            checkBlank() {
                let isPass = true
                if (!this.form.password) {
                    isPass = false
                    this.check.password = true
                }
                if (this.isBank) {
                    if (!this.form.smsCode) {
                        isPass = false
                        this.check.smsCode = true
                    }
                }
                return isPass
            },
            getSmsCode() {
                this.countdown()
                this.a_sendSmsByRecord({
//                    支付订单号
                    orderNo: this.orderInfo.orderNo,
//                    订单金额
                    amountMoney: this.orderInfo.amountMoney,
//                    银行卡id
                    bankId: this.currentPayInfo.bankId,
//                    银行卡类型
                    paymentMode: this.currentPayInfo.cardType === '储蓄卡' ? 'DEBITCARD' : 'CREDITCARD'
                }, this.getSmsResult)
            },
            countdown() {
                if (!this.isGetSmsCode) return
                let second = 60
                const countdown = setInterval(() => {
//                    倒计时到0时恢复正常状态
                    if (second === 0) {
                        this.isGetSmsCode = true
                        clearInterval(countdown)
                        this.msgCodeContent = '获取验证码'
                    } else {
                        this.msgCodeContent = `${second >= 10 ? second : `0${second}`}秒后重试`
                        second--
                    }
                }, 1000)
            },
            getSmsResult({status, result}) {
                if (status.statusCode === 0) {

                } else {
                    console.log(status.statusReason)
                }
            },
            immediatelyPay() {
                if (!this.checkBlank()) return
//                未实名认证
                if (!this.orderInfo.isTrustName) {
                    this.$root.bus.$emit('checkoutCounter_isShowDialog', ['certification'])
                    return
                }
//                用银行卡支付
                if (this.isBank) {
                    this.a_confirmByRecord({
                        orderNo: this.orderInfo.orderNo,
                        password: this.form.password,
                        verifyCode: this.form.smsCode,
                        bankId: this.currentPayInfo.id
                    }, this.jumpPayResult)
                } else {
//                    用余额支付
                    this.a_accountPay({
                        orderNo: this.orderInfo.orderNo,
//                        余额支付
                        paymentMode: 'SOOPAY',
                        password: this.form.password,
                        amountMoney: this.orderInfo.amountMoney
                    }, this.jumpPayResult)
                }
            },
            jumpPayResult({status, result}) {
                const {statusCode, statusReason} = status
                this.$router.replace({
                    name: 'pay_checkoutCounter_payResult',
                    params: {
                        statusCode,
                        statusReason
                    }
                })
            },
            async a_listUserBank(data, cb) {
                try {
                    const result = await $http.listUserBank(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            },
            async a_sendSmsByRecord(data, cb) {
                try {
                    const result = await $http.sendSmsByRecord(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            },
            async a_confirmByRecord(data, cb) {
                try {
                    const result = await $http.confirmByRecord(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            },
            async a_queryByAccountSn(data, cb) {
                try {
                    const result = await $http.queryByAccountSn(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            },
            async a_accountPay(data) {
                try {
                    const result = await $http.accountPay(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            }
        },
        created() {
            this.a_listUserBank({
                accountNo: this.orderInfo.accountNo
            }, this.renderBankList)
            this.a_queryByAccountSn({
                accountNo: this.orderInfo.accountNo
            }, this.renderUserInfo)
        }
    }
</script>
