<template>
    <div class="wms-items" v-if="isCache">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="到货登记管理-列表" :key="tag" :name="tag">

                <list-temp></list-temp>

            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">

            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import handlerMixins from '@Wms/mixins/tabHandlerMixin.js'
    import listTemp from '@Wms/containers/salesReturnManage/cargoRegister/cargoRegisterList.vue'
    import particulars from '@Wms/containers/salesReturnManage/salesRefundSheet/particulars.vue'

    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins,handlerMixins],
        data(){
            return {
                tag:'wms_cargoRegister',
                system:'/wms',
                titleName:'到货登记管理',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                },
                isCache: true
            }
        },
        components: {
            listTemp,
            particulars
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)
            // 添加tab
//            this.$root.bus.$on('particularsTab', function(addTabObj) {
//                if( _this.isExist(addTabObj.tag))return
//                addTabObj.parentTag = _this.tag
//                addTabObj.index = _this.tabsList.length
//                _this.tabsList.push(addTabObj)
//                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
//            })
            // 关闭tab
            this.$root.bus.$on('childTabClose', function(removeTabObj) {
                _this.tabsList.splice(removeTabObj.index,1)
                _this.setSelectTab(removeTabObj.parentTag,0)
            })
        },
        methods:{
            // 判断tab是否已存在
            isExist(tag){
                return this.tabsList.some((element, index, array)=>{
                    return element.tag==tag
                })
            },
            // tab点击
            tabClick(selTab){
                this.selectTab.index = selTab.index
            },
            // tab关闭按钮
            removeTab(){
                this.tabsList.splice(this.selectTab.index-1,1)
                this.setSelectTab(this.tag,0)
            },
            // 赋值tab选中
            setSelectTab(tag,index){
                this.selectTab.tag = tag
                this.selectTab.index = index
            }
        },
        props:{
            particularsObj: Object
        }
    }
</script>
<style  scoped lang="scss" type="text/scss">

</style>
