<style lang="scss" scoped>

</style>
<template>
    <div class="pay-methods">
        <!--如果是充值，则只显示网银支付-->
        <BeePay v-if="this.orderInfo.type !== 'RECHARGE'"/>
        <OtherPay/>
    </div>
</template>
<script>
    import BeePay from './BeePay'
    import OtherPay from './OtherPay'
    import {mapState} from 'vuex'

    export default {
        name: 'PayMethods',
        components: {BeePay, OtherPay},
        computed: {
            ...mapState({
                orderInfo: state => state.Pay.companyOrderInfo
            })
        }
    }
</script>
