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
    <div v-if="isCache" class="pay checkout-counter" :style="checkoutCounterStyle">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="收银台" :key="tag" :name="tag">
                <div class="checkout-counter-box" :class="{'filter-blur': isFilterBlur}">
                    <OrderInfo></OrderInfo>
                    <router-view></router-view>
                </div>
                <BankList v-show="isShowBank" :online="isOnline"></BankList>
                <ErrMsg v-show="isShowErrMsg" :errMsg="errMsg"></ErrMsg>
                <Loading v-show="isShowLoading"></Loading>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import BankList from './BankList.vue'
    import ErrMsg from './ErrMsg.vue'
    import Loading from './Loading.vue'
    import OrderInfo from './OrderInfo.vue'
    import $http from '@Pay/services/companyCheckoutCounter.js'
    import store from '@/store/store.js'

    export default {
        name: 'CompanyCheckoutCounter',
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {BankList, ErrMsg, OrderInfo, Loading},
        data() {
            return {
                tag: 'pay_companyCheckoutCounter',
                system: '/pay',
                titleName: '企业收银台',
                isShowBank: false,
                isShowErrMsg: false,
                isShowLoading: false,
                errMsg: '',
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
//        进入页面时获取订单信息
        beforeRouteEnter(to, from, next) {
            const parameter = {
                orderNo: 'TRAN_T_01_20171101104117_ZG8K',
                businessCode: '6245',
                sign: 'IDCVdw6HJbDeFLR9xQnYzQWv2PlEyjFGJWPa72WVM1itYDQWpO8sOZjAImz7mE1P0QbflhSpZSGXGYSt9k2oXYcScBG4%2FQox3wzi8FD%2FVcpy%2BQ8iojkZ2Q6wOwKcSdiMt0VP9GBDlA00kyiLJGnZVjGfmgMGmvl9yiMukCeC6n4%3D'
            }
            store.dispatch('Pay_CHECKOUTCOUNTER_A_ORDERINFO', {
                cashier: $http.cashier,
                parameter,
                to,
                from,
                next
            })
        },
        created() {
            this.$root.bus.$on('companyCheckoutCounter_isShowDialog', ([infoObj]) => {
                const {dialogType, isOnline, errMsg} = infoObj
                switch (dialogType) {
                    case 'bank':
//                        弹出银行列表框
                        this.isShowBank = !this.isShowBank
                        this.isFilterBlur = !this.isFilterBlur
                        break
                    case 'errMsg':
//                        弹出错误信息框
                        this.isShowErrMsg = !this.isShowErrMsg
                        this.isFilterBlur = !this.isFilterBlur
                        this.errMsg = errMsg
                        break
                    case 'loading':
//                        弹出loading框
                        this.isShowLoading = !this.isShowLoading
                        this.isFilterBlur = !this.isFilterBlur
                        break
                }
//                改变网银支付标识
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
