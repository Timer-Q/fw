<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn">保存</Button>
            <Button class="public-function-btn">取消</Button>
        </div>
        <Tabs class="custom" v-model="activeName" type="card" @tab-click="handleClick(activeName)">
            <TabPane label="基本信息" name="basic">
                <basic-temp :id="id" :state="state"></basic-temp>
            </TabPane>
            <TabPane label="相关信息" name="relevant">
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import basicTemp from '@B2B/containers/goodsRelease/basicContainer.vue'
    export default{
        data(){
            return{
                activeName:"basic"
            }
        },
        components:{
            basicTemp
        },
        methods:{
            handleClick(activeName){

            }
        },
        props:{
            id:Number,
            state:String
        }
    }
</script>
