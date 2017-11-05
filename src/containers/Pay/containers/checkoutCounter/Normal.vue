<style lang="scss" scoped>

</style>
<template>
    <div class="normal">
        <BeePay/>
        <OtherPay/>
    </div>
</template>
<script>
    import BeePay from './BeePay'
    import OtherPay from './OtherPay'

    export default {
        name: 'Normal',
        components: {BeePay, OtherPay}
    }
</script>
