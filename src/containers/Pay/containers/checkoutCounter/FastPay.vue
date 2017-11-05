<style lang='scss'>
    @import './common.scss';

    .checkout-counter-fast-pay {
        @include outBox {
            font-size: 12px;
        }
    ;
        .title {
            @include titleBox;
        }

        .fast-pay-box {
            padding-top: 24px;
            padding-left: 24px;
        }

        .fast-pay-line {
            margin-bottom: 16px;
            &:first-child {
                height: 40px;
                line-height: 40px;
            }
            &:last-child {
                margin-bottom: 0;
            }
            .label {
                @include labelStyle;
            }
            .bank-box {
                display: inline-block;
                padding: 8px 16px;
                margin-right: 10px;
                border: 1px solid #ccc;
                border-radius: 2px;
                vertical-align: middle;
                img {
                    height: 24px;
                }
            }
            .other-bank {
                color: #28a7e1;
                cursor: pointer;
            }
            .bank-type {
                color: #666;
            }
            .tips {
                @include tipsStyle {
                    &.card-type {
                        cursor: auto;
                    }
                }
            ;
            }
            input {
                @include inputStyle {
                    &.card-num {
                        width: 250px;
                    }
                    &.paperwork-type {
                        width: 80px;
                        margin-right: 10px;
                    }
                    &.paperwork-num {
                        width: 160px;
                    }
                    &.carder-name.tel-num.safe-code.paperwork-num.msg-code.pay-password {
                        width: 160px;
                    }
                }
            ;
            }
            .el-select {
                width: 80px;
                border-radius: 2px;
                .el-input__inner {
                    @include inputStyle {
                        padding-right: 0;
                    }
                ;
                }
            }
            .time {
                color: #666;
            }
            .error {
                margin-left: 20px;
                color: #ee0000;
            }
        }
        .sure-protocol {
            @include btnBox;
            .sure-protocol-btn {
                margin-bottom: 10px;
            }
            .protool-content {
                margin-top: 10px;
                color: #999;
                cursor: pointer;
                &:hover {
                    color: #28a7e1;
                }
            }
        }
    }

    .el-select-dropdown__item {
        height: 28px;
        padding: 0 0 0 10px;
        box-sizing: border-box;
        // 重置select下拉列表被选中时样式
        &.selected {
            background-color: #28a7e1;
            > span {
                color: #fff;
            }
        }
        // 重置select下拉列表内文字样式
        > span {
            display: block;
            line-height: 28px !important;
            color: #666;
        }
    }
</style>
<template>
    <div class="checkout-counter-fast-pay">
        <div class="title">
            <span>快捷支付</span>
        </div>
        <div class="fast-pay-box">
            <div class="fast-pay-line">
                <span class="label">付款银行</span>
                <div class="bank-box">
                    <img :src="bankImgSrc" alt="银行图片">
                </div>
                <span class="other-bank" @click="getOtherBank">选择其他银行</span>
            </div>
            <div class="fast-pay-line">
                <span class="label">银行卡号</span>
                <input
                    class="card-num"
                    v-model="form.cardId"
                    placeholder="输入您的银行卡号"
                    @focus="hideError('cardId')"
                    @blur="checkLicit('cardId')"
                />
                <!--<span class="tips card-type">{{ cardTypeName }}</span>-->
                <span class="error" v-show="check.cardId.isShow">{{ check.cardId.title }}</span>
            </div>
            <div class="fast-pay-line valid-period" v-show="isCredit">
                <span class="label">有效期</span>
                <Select v-model="form.cardMonth" placeholder="请选择" @change="hideError('cardTime')">
                    <Option
                        v-for="item in monthList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </Option>
                </Select>
                <span class="time">月/</span>
                <Select v-model="form.cardYear" placeholder="请选择" @change="hideError('cardTime')">
                    <Option
                        v-for="item in yearList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </Option>
                </Select>
                <span class="time">年</span>
                <span class="error" v-show="check.cardTime.isShow">请选择有效期</span>
            </div>
            <div class="fast-pay-line">
                <span class="label">持卡人姓名</span>
                <input class="carder-name" disabled v-model="realName"/>
            </div>
            <div class="fast-pay-line">
                <span class="label">证件类型</span>
                <input class="paperwork-type" disabled value="身份证"/>
                <input class="paperwork-num" disabled v-model="idNumber"/>
            </div>
            <div class="fast-pay-line" v-show="isCredit">
                <span class="label">CVN2/CVV2</span>
                <input
                    class="safe-code"
                    placeholder="卡背面3位数字"
                    v-model="form.safeCode"
                    @focus="hideError('safeCode')"
                    @blur="checkLicit('safeCode')"
                />
                <span class="error" v-show="check.safeCode.isShow">{{ check.safeCode.title }}</span>
            </div>
            <div class="fast-pay-line">
                <span class="label">预留手机号</span>
                <input
                    class="tel-num"
                    placeholder="请输入银行卡预留手机号"
                    v-model="form.mediaId"
                    @focus="hideError('mediaId')"
                    @blur="checkLicit('mediaId')"
                />
                <span class="error" v-show="check.mediaId.isShow">{{ check.mediaId.title }}</span>
            </div>
            <div class="fast-pay-line">
                <span class="label">短信验证码</span>
                <input
                    class="msg-code"
                    placeholder="请输入验证码"
                    v-model="form.smsCode"
                    @focus="hideError('smsCode')"
                />
                <span class="tips" @click="getMsgCode">{{ msgCodeContent }}</span>
                <span class="error" v-show="check.smsCode.isShow">请输入验证码</span>
            </div>
            <div class="fast-pay-line">
                <span class="label">支付密码</span>
                <input
                    class="pay-password"
                    placeholder="请输入6位数字支付密码"
                    type="password"
                    v-model="form.password"
                    @focus="hideError('password')"
                />
                <span class="tips">忘记密码</span>
                <span class="error" v-show="check.password.isShow">请输入密码</span>
            </div>
        </div>
        <div class="sure-protocol">
            <p class="sure-protocol-btn" @click="sureToPay">同意协议并付款</p>
            <span class="protool-content">《快捷支付服务协议》</span>
        </div>
    </div>
</template>
<script>
    import bankImgList from '@Pay/utils/bankImg-manage'
    import {mapState} from 'vuex'
    import $http from '@Pay/services/checkoutCounter'

    export default {
        name: 'FastPay',
        data() {
            return {
//                银行图片
                ...bankImgList,
//                显示的银行图片
                bankImgSrc: '',
//                是否为信用卡
                isCredit: false,
//                获取验证码文字
                msgCodeContent: '获取验证码',
//                获取验证码节流阀
                isGetSmsCode: true,
//                银行卡类型名称
                cardTypeName: '储蓄卡',
                monthList: [{
                    label: '1',
                    value: '01'
                }, {
                    label: '2',
                    value: '02'
                }, {
                    label: '3',
                    value: '03'
                }, {
                    label: '4',
                    value: '04'
                }, {
                    label: '5',
                    value: '05'
                }, {
                    label: '6',
                    value: '06'
                }, {
                    label: '7',
                    value: '07'
                }, {
                    label: '8',
                    value: '08'
                }, {
                    label: '9',
                    value: '09'
                }, {
                    label: '10',
                    value: '10'
                }, {
                    label: '11',
                    value: '11'
                }, {
                    label: '12',
                    value: '12'
                }],
                yearList: [{
                    label: '2017',
                    value: '17'
                }, {
                    label: '2018',
                    value: '18'
                }, {
                    label: '2019',
                    value: '19'
                }, {
                    label: '2020',
                    value: '20'
                }, {
                    label: '2021',
                    value: '21'
                }, {
                    label: '2022',
                    value: '22'
                }, {
                    label: '2023',
                    value: '23'
                }, {
                    label: '2024',
                    value: '24'
                }, {
                    label: '2025',
                    value: '25'
                }, {
                    label: '2026',
                    value: '26'
                }],
                form: {
//                银行简码
                    bankSign: '',
//                银行卡号
                    cardId: '',
//                银行卡类型
                    cardType: '',
//                有效期-月份
                    cardMonth: '',
//                有效期-年份
                    cardYear: '',
//                CVN2CVV2码
                    safeCode: '',
//                手机号
                    mediaId: '',
//                验证码
                    smsCode: '',
//                密码
                    password: ''
                },
                check: {
//                    银行卡号
                    cardId: {
                        name: '银行卡号',
                        isShow: false,
                        title: '请输入银行卡号',
                        rule: /^(\d{16}|\d{19})$/
                    },
//                    信用卡：卡有效期
                    cardTime: {
                        isShow: false
                    },
//                    信用卡：安全码
                    safeCode: {
                        name: 'CVN2/CVV2码',
                        isShow: false,
                        title: '请输入CVN2/CVV2码',
                        rule: /^\d{3}$/
                    },
//                    手机号
                    mediaId: {
                        name: '手机号',
                        isShow: false,
                        title: '请输入手机号',
                        rule: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                    },
//                    短信验证码
                    smsCode: {
                        isShow: false
                    },
//                    支付密码
                    password: {
                        isShow: false
                    },
                },
//                持卡人姓名
                realName: '',
//                身份证号
                idNumber: ''
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.orderInfo
            })
        },
        methods: {
            initShow(bankSign, cardType) {
//            获取银行卡所属银行
                this.bankSign = bankSign ? bankSign : this.$route.params.bankSign
//            根据银行简码，设置显示的银行图片
                this.bankImgSrc = this[this.bankSign]
//            获取银行卡类型
                this.cardType = cardType ? cardType : this.$route.params.cardType
//            如果是信用卡，则显示日期选择框与CVN2/CVV2框
                this.isCredit = this.cardType === 'credit'
//            设置银行卡后面显示的卡类型名称
                this.cardTypeName = this.cardType === 'credit' ? '信用卡' : '储蓄卡'
            },
//            input获取焦点后隐藏错误提示
            hideError(name) {
                this.check[name].isShow = false
            },
//            验证输入内容是否符合规范
            checkLicit(name) {
//                如果没有输入内容，则放弃校验
                if (!this.form[name]) return
                this.check[name].title = `${this.check[name].name}错误请重新输入`
                this.check[name].isShow = !this.check[name].rule.test(this.form[name])
            },
//            提交前非空/规范性校验
            beforeCheck(type) {
                let isPass = true
                let checkList = ['cardId', 'mediaId']
//                如果是信用卡，增加安全码与有效期验证
                if (this.isCredit) checkList.concat(['safeCode', 'cardMonth', 'cardYear'])
//                如果是支付非空验证，增加短信验证码与支付密码
                if (type === 'pay') {
                    checkList.concat(['smsCode', 'password'])
                }
//            非空验证
                for (let key of checkList) {
                    if (!this.form[key]) {
                        if (key === 'cardMonth') {
                            this.check.cardTime.isShow = true
                        }
                        if (key === 'cardYear') {
                            this.check.cardTime.isShow = true
                        }
                        this.check[key].isShow = true
                        isPass = false
                    }
                }
//                规范性校验
                for (let key of checkList) {
//                    如果需要规范性校验
                    if (this.check[key].rule) {
                        this.checkLicit[key]
                        isPass = !this.check[key].isShow
                    }
                }
                return isPass
            },
            countdown() {
//                关闭节流阀
                this.isGetSmsCode = false
//                设置倒计时时间
                let second = 60
                const countdown = setInterval(() => {
//                    倒计时到0时恢复正常状态
                    if (second === 0) {
//                        开启节流阀
                        this.isGetSmsCode = true
                        clearInterval(countdown)
                        this.msgCodeContent = '获取验证码'
                    } else {
                        this.msgCodeContent = `${second >= 10 ? second : `0${second}`}秒后重试`
                        second--
                    }
                }, 1000)
            },
            getMsgCode() {
                if (!this.isGetSmsCode) return
                const isPass = this.beforeCheck()
//                通过非空/规范性校验
                if (!isPass) return
//                    开始倒计时
                this.countdown()
                const parameter = {
//                    支付账号ID
                    accountNo: this.orderInfo.accountNo,
//                    支付订单号
                    orderNo: this.orderInfo.orderNo,
//                    银行卡类型
                    paymentMode: this.cardType === 'credit' ? 'CREDITCARD' : 'DEBITCARD',
//                    订单金额
                    amountMoney: this.orderInfo.amountMoney,
//                    银行简码
                    bankBrevity: this.bankSign,
//                    手机号
                    mediaId: this.form.mediaId,
//                    银行卡号
                    cardId: this.form.cardId,
//                    证件类型
                    identityType: 'IDENTITY_CARD'
                }
                if (this.isCredit) {
                    Object.assign(parameter, {
                        validate: `${this.form.cardYear}${this.form.cardMonth}`,
                        cvv2: this.form.safeCode
                    })
                }
                this.a_sendSms(parameter, this.getSmsResult)
            },
            getOtherBank() {
                this.$root.bus.$emit('checkoutCounter_isShowDialog', ['bank'])
            },
            getSmsResult({status, result}) {
                if (status.statusCode === 0) {

                } else {
                    console.log(status.statusReason)
                }
            },
            renderUserInfo({status, result}) {
                if (status.statusCode === 0) {
                    const {realName, cardId} = result
                    this.realName = realName
                    this.idNumber = cardId
                } else {
                    console.log(status.statusReason)
                }
            },
            jumpToResult({status, result}) {
                const {statusCode, statusReason} = status
                this.$router.replace({
                    name: 'pay_checkoutCounter_payResult',
                    params: {
                        statusCode,
                        statusReason
                    }
                })
            },
            sureToPay() {
                if (!this.beforeCheck()) return
                const parameter = {
//                    支付账号ID
                    accountNo: this.orderInfo.accountNo,
//                    支付订单号
                    orderNo: this.orderInfo.orderNo,
//                    银行卡类型
                    paymentMode: this.cardType === 'credit' ? 'CREDITCARD' : 'DEBITCARD',
//                    银行简码
                    bankBrevity: this.bankSign,
//                    手机号
                    mediaId: this.form.mediaId,
//                    银行卡号
                    cardId: this.form.cardId,
//                    证件类型
                    identityType: 'IDENTITY_CARD',
//                    短信验证码
                    verifyCode: this.form.smsCode,
//                        密码
                    password: this.form.password
                }
//                如果是信用卡，多增加两个字段
                if (this.isCredit) {
                    Object.assign(parameter, {
                        validate: `${this.form.cardYear}${this.form.cardMonth}`,
                        cvv2: this.form.safeCode
                    })
                }
                this.a_confirm(parameter, this.jumpToResult)
            },
            async a_sendSms(data, cb) {
                try {
                    const result = await $http.sendSms(data)
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
            async a_confirm(data, cb) {
                try {
                    const result = await $http.confirm(data)
                    await cb(result.data)
                } catch (err) {
                    console.log(err)
                }
            }
        },
        created() {
            this.initShow()
//            监听选择银行的改变，更改银行图片与银行卡类型
            this.$root.bus.$on('addBankSign', ([bankSign, cardType]) => {
                this.initShow(bankSign, cardType)
            })
//            获取用户姓名、身份证号
            this.a_queryByAccountSn({
                accountNo: this.orderInfo.accountNo
            }, this.renderUserInfo)
        }
    }
</script>
