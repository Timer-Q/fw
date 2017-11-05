<style lang="scss" scoped>
    .checkout-counter {
        position: relative;
        background-color: #f8f8f8;
    }

    .checkout-counter-box {
        width: 990px;
        min-width: 990px;
        margin: 0 auto;
    }

    .filter-blur {
        filter: blur(2px);
    }
</style>
<template>
    <div v-if="isCache" class="checkout-counter" :style="checkoutCounterStyle">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="收银台" :key="tag" :name="tag">
                <CheckoutCounterHeader></CheckoutCounterHeader>
                <div class="checkout-counter-box" :class="{'filter-blur': isFilterBlur}">
                    <OrderInfo></OrderInfo>
                    <router-view></router-view>
                </div>
                <BankList v-show="isShowBank" :online="isOnline"></BankList>
                <Certification v-show="isShowCertification"></Certification>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    //    各种组件
    import CheckoutCounterHeader from './CheckoutCounterHeader'
    import OrderInfo from './OrderInfo'
    import BeePay from './BeePay'
    import OtherPay from './OtherPay'
    import FastPay from './FastPay'
    import PayResult from './PayResult'
    import BankList from './BankList'
    import Certification from './Certification'

    //    引入axios
    import $http from '@Pay/services/checkoutCounter'
    //    获取全局store
    import store from '@/store/store'

    export default {
        name: 'CheckoutCounter',
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {CheckoutCounterHeader, OrderInfo, BeePay, OtherPay, FastPay, PayResult, BankList, Certification},
        data() {
            return {
                tag: 'pay_checkoutCounter',
                system: '/pay',
                titleName: '收银台',
                isShowBank: false,
                isShowCertification: false,
                isOnline: false,
                isFilterBlur: false,
                checkoutCounterStyle: {
                    overflow: 'auto',
                    height: ''
                }
            }
        },
        watch: {
            isShowBomb() {
                if (this.isShowBomb) {
                    this.checkoutCounterStyle.overflow = 'hidden'
                } else {
                    this.checkoutCounterStyle.overflow = 'auto'
                }
            }
        },
        methods: {
            setOutBoxStyle() {
                const {clientHeight} = document.querySelector('body')
                this.checkoutCounterStyle.height = `${clientHeight - 84}px`
            }
        },
        beforeRouteEnter(to, from, next) {
            const parameter = {
                orderNo: 'TRAN_T_01_20171021150459_HDEI',
                businessCode: '6245',
                sign: 'IDCVdw6HJbDeFLR9xQnYzQWv2PlEyjFGJWPa72WVM1itYDQWpO8sOZjAImz7mE1P0QbflhSpZSGXGYSt9k2oXYcScBG4%2FQox3wzi8FD%2FVcpy%2BQ8iojkZ2Q6wOwKcSdiMt0VP9GBDlA00kyiLJGnZVjGfmgMGmvl9yiMukCeC6n4%3D'
            }
            store.dispatch('Pay_COMPANYCHECKOUTCOUNTER_A_ORDERINFO', {
                cashier: $http.cashier,
                parameter,
                to,
                from,
                next
            })
        },
        created() {
            this.$root.bus.$on('checkoutCounter_isShowDialog', ([dialogType, isOnline]) => {
                switch (dialogType) {
//                    点击弹出银行列表框
                    case 'bank':
                        this.isShowBank = !this.isShowBank
                        this.isFilterBlur = !this.isFilterBlur
                        break
                    case 'certification':
//                    点击弹出实名认证框
                        this.isShowCertification = !this.isShowCertification
                        this.isFilterBlur = !this.isFilterBlur
                        break
                }
//                如果是网银支付
                this.isOnline = !!isOnline
            })
        },
        mounted() {
            this.setOutBoxStyle()
//            当页面尺寸发生变化的时候，再次设置高度
            window.addEventListener('resize', this.setOutBoxStyle)
        },
        beforeDestroy() {
//            组件销毁前移除监听
            window.removeEventListener('resize', this.setOutBoxStyle)
        }
    }

</script>
