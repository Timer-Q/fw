<template>
    <div>
        <Tabs class="custom" v-model="activeName" type="card" @tab-click="handleClick(activeName)">
            <TabPane label="商户基本信息" name="basic">
                <merchants-basic-temp :merchantId = merchantId></merchants-basic-temp>
            </TabPane>
            <TabPane label="商户资质信息" name="aptitude">
                <merchants-aptitude-temp :merchantId = merchantId></merchants-aptitude-temp>
            </TabPane>
            <TabPane label="商户门店信息" name="store">
                <merchants-store-temp :merchantId = merchantId></merchants-store-temp>
            </TabPane>
            <TabPane label="经销商信息" name="dealer">
                <merchants-dealer-temp :merchantId = merchantId></merchants-dealer-temp>
            </TabPane>
            <TabPane label="订单信息" name="order">
                <!--<merchants-order-temp></merchants-order-temp>-->
            </TabPane>
        </Tabs>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
    import merchantsBasicTemp from '@B2B/containers/merchants/BasicList.vue'
    import merchantsAptitudeTemp from '@B2B/containers/merchants/AptitudeList.vue'
    import merchantsStoreTemp from '@B2B/containers/merchants/StoreList.vue'
    import merchantsDealerTemp from '@B2B/containers/merchants/DealerList.vue'
    import merchantsOrderTemp from '@B2B/containers/merchants/OrderList.vue'
    export default{
        components: {
            merchantsBasicTemp,
            merchantsAptitudeTemp,
            merchantsStoreTemp,
            merchantsDealerTemp,
            merchantsOrderTemp
        },
        data(){
            return {
                activeName:'basic'
            }
        },
        methods:{
            // tab切换
            handleClick(activeName){
                switch (activeName){
                    case 'basic':
                        this.$root.bus.$emit('getBasicList')
                        break
                    case 'aptitude':
                        this.$root.bus.$emit('getAptitudeList')
                        break
                    case 'store':
                        this.$root.bus.$emit('getStoreList')
                        break
                    case 'dealer':
                        this.$root.bus.$emit('getDealerList')
                        break
                    case 'order':
                        this.$root.bus.$emit('getOrderList')
                        break
                }
            }
        },
        mounted(){
        }
    }
</script>
