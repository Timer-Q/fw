<template>
    <div class="wms-items">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="销退单管理-列表" :key="tag" :name="tag">
                <div class="projection">
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="destroyBtn">销毁质检</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button class="public-function-btn">日志</Button>
                    </ButtonGroup>
                </div>
                <list-temp></list-temp>

            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <particulars :particularsObj='item'></particulars>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import handlerMixins from '@Wms/mixins/tabHandlerMixin.js'

    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'

    import listTemp from '@Wms/containers/salesReturnManage/salesRefundSheet/salesRefundList.vue'
    import particulars from '@Wms/containers/salesReturnManage/salesRefundSheet/particulars.vue'
    console.log(particulars, 'particulars')
    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins,handlerMixins],
        data(){
            return {
                tag:'wms_salesRefundSheet',
                system:'/wms',
                titleName:'销退单管理',
                tabsList:[],
                multipleSelection: [],
                selectTab:{
                    tag:'',
                    index:0
                },
                tabTriggerName: 'sales_refund_sheet'
//                isCache: true
            }
        },
        components: {
            listTemp,
            particulars
        },
        mounted(){
            /*const _this = this
            this.setSelectTab(this.tag,0)*/
            // 添加tab
//            this.$root.bus.$on('particularsTab', function(addTabObj) {
//                if( _this.isExist(addTabObj.tag))return
//                addTabObj.parentTag = _this.tag
//                addTabObj.index = _this.tabsList.length
//                _this.tabsList.push(addTabObj)
//                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
//            })
            // 关闭tab
//            this.$root.bus.$on('childTabClose', function(removeTabObj) {
//                _this.tabsList.splice(removeTabObj.index,1)
//                _this.setSelectTab(removeTabObj.parentTag,0)
//            })
        },
        methods:{
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
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
//            // tab关闭按钮
//            removeTab(){
//                this.tabsList.splice(this.selectTab.index-1,1)
//                this.setSelectTab(this.tag,0)
//            },
            // 赋值tab选中
            setSelectTab(tag,index){
                this.selectTab.tag = tag
                this.selectTab.index = index
            },
            // 销毁质检
            destroyBtn() {
              let _this = this
                // 没有选择
                if (_this.multipleSelection.length == 0) {
                  _this.alert("empty")
                    return
                }
                // 判断状态。100=待收货,200=待质检,300=质检中,400=已质检
                let stArr = _this.utilFn.getFieldArrFormObjectArr(_this.multipleSelection,'status')
                let stArrErr = stArr.filter((item)=>{return item != 200 || item != 300})
                let stArrOk = stArr.filter((item)=>{return item == 200 || item == 300})

                if(stArrErr.length > 0){
                    _this.alert(alertConfig['statusErr'])
                    return
                }
                if(stArrOk.length > 1){
                    _this.alert('onlyOne')
                    return
                }
            }
        },
        props:{
            particularsObj: Object
        }
    }
</script>
<style  scoped lang="scss" type="text/scss">

</style>
