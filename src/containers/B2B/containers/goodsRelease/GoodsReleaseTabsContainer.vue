<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn">检测更新数据</Button>
            <Button class="public-function-btn" @click="goodsRefresh">刷新</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <Tabs class="custom" v-model="activeName" type="card" @tab-click="handleClick(activeName)">
            <TabPane label="商品列表" name="table">
                <table-temp></table-temp>
            </TabPane>
            <TabPane label="商品图片" name="picture">
                <picture-temp></picture-temp>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import tableTemp from "@B2B/containers/goodsRelease/GoodsTableContainer.vue"
    import pictureTemp from "@B2B/containers/goodsRelease/GoodsPictureContainer.vue"
    export default{
        data() {
            return {
                activeName:"table"
            }
        },
        components:{
            tableTemp,
            pictureTemp
        },
        methods:{
            goodsRefresh(){
                this.activeName=='table'?this.$root.bus.$emit("goodsTableRefresh"):this.$root.bus.$emit("goodsPictRefresh")
            },
            handleClick(activeName){
//                this.$root.bus.$emit("tabsChangeByactiveName",activeName)
            }
        },
        mounted(){
        }
    }
</script>
