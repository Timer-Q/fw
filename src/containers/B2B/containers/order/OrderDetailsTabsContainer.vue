<template>
    <div>
        <Tabs class="custom" v-model="activeName" type="card" @tab-click="handleClick(activeName)">
            <TabPane label="订单状态" name="order"></TabPane>
            <TabPane label="基本信息" name="basic"></TabPane>
            <TabPane label="收发货信息" name="goods"></TabPane>
            <TabPane label="商品" name="commodity"></TabPane>
            <TabPane label="支付" name="pay"></TabPane>
            <TabPane label="备注" name="remark"></TabPane>
        </Tabs>
        <order-details-temp></order-details-temp>
    </div>
</template>
<script>
    import orderDetailsTemp from "@B2B/containers/order/OrderDetailsContainer.vue"
    export default{
        data() {
            return {
                activeName:"order"
            }
        },
        components:{
            orderDetailsTemp
        },
        methods:{
            handleClick(activeName){
                this.$root.bus.$emit("tabsChangeByactiveName",activeName)
            }
        },
        mounted(){

        }
    }
</script>
