<style lang="scss" scoped>
    @import './common.scss';

    .bank {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }

    .bank-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 8px solid #ccc;
    }

    .switch-bank {
        position: relative;
        height: 44px;
        padding-left: 24px;
        padding-top: 8px;
        box-sizing: border-box;
        background-color: #e8e8e8;
        > div {
            float: left;
            width: 150px;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
        .close {
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translate(0, -50%);
            cursor: pointer;
        }
    }

    .bank-choose-content {
        overflow: auto;
        width: 838px;
        max-height: 284px;
        padding: 20px 12px 14px 24px;
        box-sizing: border-box;
        background-color: #fff;
        .one-bank {
            float: left;
            width: 190px;
            height: 40px;
            padding: 8px 0 8px 16px;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 2px;
            box-sizing: border-box;
            cursor: pointer;
            &:hover {
                border-color: #28a7e1;
                background-color: #f8f8f8;
            }
            img {
                height: 100%;
            }
        }
    }
</style>
<template>
    <div class="bank-box">
        <div class="switch-bank">
            <div @click="switchBank('debit')" :style="debitCardStyle">
                <p>储蓄卡</p>
            </div>
            <div @click="switchBank('credit')" :style="creditCardStyle">
                <p>信用卡</p>
            </div>
            <span class="close" @click="$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'bank'}])">x</span>
        </div>
        <!--默认显示储蓄卡列表-->
        <div class="bank-choose-content" v-if="isShowDebit">
            <div class="clearfix">
                    <span class="one-bank" @click="toPay(item.bankCode)" v-for="(item, index) in debitList"
                          :key="index">
                        <img :src="item.imgSrc" :alt="item.bankName">
                    </span>
            </div>
        </div>
        <div class="bank-choose-content" v-else>
            <div class="clearfix">
                    <span class="one-bank" @click="toPay(item.bankCode)" v-for="(item, index) in creditList"
                          :key="index">
                        <img :src="item.imgSrc" :alt="item.bankName">
                    </span>
            </div>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/companyCheckoutCounter'
    import bankImgList from '@Pay/utils/bankImg-manage'
    import {mapState} from 'vuex'

    export default {
        name: 'BankList',
        props: ['online'],
        data() {
            return {
                isShowDebit: true,
//                tab点击之前样式
                tabClickBefore: {
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    border: '0 none',
                    color: '#666',
                    backgroundColor: '#e8e8e8'
                },
//                tab点击之后样式
                tabClickAfter: {
                    border: '1px solid #ccc',
                    borderBottom: '0 none',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    color: '#333',
                    backgroundColor: '#fff'
                },
//                储蓄卡tab样式
                debitCardStyle: {
                    border: '1px solid #ccc',
                    borderBottom: '0 none',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    color: '#333',
                    backgroundColor: '#fff'
                },
//                信用卡tab样式
                creditCardStyle: {
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    border: '0 none',
                    color: '#666',
                    backgroundColor: '#e8e8e8'
                },
//                银行图片
                ...bankImgList,
//                储蓄卡列表
                creditList: [],
//                信用卡列表
                debitList: []
            }
        },
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.companyOrderInfo
            })
        },
        methods: {
//            切换银行显示
            switchBank(type) {
//                点击的是储蓄卡，修改样式
                if (type === 'debit') {
                    this.debitCardStyle = {...this.tabClickAfter}
                    this.creditCardStyle = {...this.tabClickBefore}
                }
//                点击的是信用卡，修改样式
                if (type === 'credit') {
                    this.debitCardStyle = {...this.tabClickBefore}
                    this.creditCardStyle = {...this.tabClickAfter}
                }
//                切换银行列表的盒子显示
                this.isShowDebit = !this.isShowDebit
            },
            toPay(bankSign) {
                if (this.online) {
//                    点击跳转到第三方网银支付
                    this.jumpOnlineBankWeb()
                } else {
//                获取点击的银行卡的类型
                    const cardType = this.isShowDebit ? 'Debit' : 'credit'
//                如果不需要跳转路由，那么通过触发事件的方法把银行卡信息带过去
                    this.$root.bus.$emit('addBankSign', [bankSign, cardType])
//                如果需要跳转路由，那么把点击的银行卡信息通过params带过去
                    this.$router.push({
                        name: 'pay_checkoutCounter_fastPay',
                        params: {
//                        银行简码
                            bankSign,
//                        卡类型
                            cardType
                        }
                    })
                }
//                关闭弹框
                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'bank'}])
            },
            async jumpOnlineBankWeb({status, result}) {
//                显示loading
                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                try {
                    const {data} = await $http.cyberBank({
                        orderNo: this.orderInfo.orderNo,
//                        网银对公
                        paymentMode: 'B2BBANK',
                        bankBrevity: bankSign,
                        amountMoney: this.orderInfo.amountMoney
                    })
//                        关闭loading
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                        打开新窗口，跳转到第三方网银页面
                        window.open(result.cyberBankUrl)
//                        轮询获取第三方支付结果
                        this.queryStatus()
                    } else {
//                        显示错误信息
                        this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                            dialogType: 'errMsg',
                            errMsg: status.statusReason
                        }])
                    }
                } catch (err) {
//                    关闭loading
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
//                    显示错误信息
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                        dialogType: 'errMsg',
                        errMsg: '数据请求失败，请重试'
                    }])
                }
            },
            async queryStatus() {
//                显示loading
                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                const polling = setInterval(async() => {
                    try {
                        const {data} = await $http.queryStatus({
//                            订单号
                            queryOrderNo: this.orderInfo.orderNo,
//                            业务平台编号
                            businessCode: 6245,
//                            业务平台订单号
                            queryBusinessOrderNo: this.orderInfo.businessOrderNo,
//                            签名
                            sign: 'IDCVdw6HJbDeFLR9xQnYzQWv2PlEyjFGJWPa72WVM1itYDQWpO8sOZjAImz7mE1P0QbflhSpZSGXGYSt9k2oXYcScBG4%2FQox3wzi8FD%2FVcpy%2BQ8iojkZ2Q6wOwKcSdiMt0VP9GBDlA00kyiLJGnZVjGfmgMGmvl9yiMukCeC6n4%3D'
                        })
                        const {result, status} = data
                        if (status.statusCode === 0) {
//                            检测到订单支付成功
                            if (result.status === '03') {
//                                关闭定时器
                                clearInterval(polling)
//                                关闭loading
                                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
//                                跳转到结果页
                                console.log('支付成功')
                            }
                        } else {
//                            关闭定时器
                            clearInterval(polling)
//                            关闭loading
                            this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
//                            显示错误信息
                            this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                                dialogType: 'errMsg',
                                errMsg: '数据请求失败，请重试'
                            }])
                        }
                    } catch (err) {
//                        关闭定时器
                        clearInterval(polling)
//                        关闭loading
                        this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
//                        显示错误信息
                        this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                            dialogType: 'errMsg',
                            errMsg: '数据请求失败，请重试'
                        }])
                    }
                }, 3000)
            },
            async renderCreditList() {
//                显示loading
                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                try {
                    const {data} = await $http.listBankCard({
                        accountNo: this.orderInfo.accountNo,
                        cardType: '03'
                    })
//                    关闭loading
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.creditList = [...result]
                        for (let item of this.creditList) {
                            if (this[item.bankCode]) item.imgSrc = this[item.bankCode]
                        }
                    } else {
//                        显示错误信息
                        this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                            dialogType: 'errMsg',
                            errMsg: status.statusReason
                        }])
                    }
                } catch (err) {
//                    关闭loading
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
//                    显示错误信息
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                        dialogType: 'errMsg',
                        errMsg: '数据请求失败，请重试'
                    }])
                }
            },
            async renderDebitList() {
//                显示loading
                this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                try {
                    const {data} = await $http.listBankCard({
                        accountNo: this.orderInfo.accountNo,
                        cardType: '04'
                    })
//                    关闭loading
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.debitList = [...result]
                        for (let item of this.debitList) {
                            if (this[item.bankCode]) item.imgSrc = this[item.bankCode]
                        }
                    } else {
//                        显示错误信息
                        this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                            dialogType: 'errMsg',
                            errMsg: status.statusReason
                        }])
                    }
                } catch (err) {
//                    关闭loading
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{dialogType: 'loading'}])
//                    显示错误信息
                    this.$root.bus.$emit('companyCheckoutCounter_isShowDialog', [{
                        dialogType: 'errMsg',
                        errMsg: '数据请求失败，请重试'
                    }])
                }
            }
        },
        created() {
//            获取信用卡信息
            this.renderCreditList()
//            获取储蓄卡信息
            this.renderDebitList()
        }
    }
</script>
