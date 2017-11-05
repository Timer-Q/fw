<template>
    <div v-if='isCache' class="tms-driver-route">
        <Tabs class="temporary-tabs" type="card" v-model="selectTab.tag" @tab-click="tabClick" @tab-remove="removeTab">
            <TabPane label="司机派送线路-查询" :key="tag" :name="tag">
                <driver-dispatch-route-query></driver-dispatch-route-query>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <driver-dispatch-route-add v-if="item.state=='add'" :tabMessage="item"></driver-dispatch-route-add>
                <driver-dispatch-route-update v-if="item.state=='update'" :tabMessage="item"></driver-dispatch-route-update>
                <driver-dispatch-route-detail v-if="item.state=='detail'" :tabMessage="item"></driver-dispatch-route-detail>
                <!--<driver-dispatch-route-transfer v-if="item.state=='transfer'" :tabMessage="item"></driver-dispatch-route-transfer>-->
            </TabPane>

        </Tabs>
    </div>
</template>
<script>

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import driverDispatchRouteQuery from '@Tms/containers/driverDispatchRoute/DriverDispatchRouteQuery.vue'
    import driverDispatchRouteAdd from '@Tms/containers/driverDispatchRoute/DriverDispatchRouteAdd.vue'
    import driverDispatchRouteUpdate from '@Tms/containers/driverDispatchRoute/DriverDispatchRouteUpdate.vue'
    import transferRecordList from '@Tms/containers/driverDispatchRoute/TransferRecordList.vue'
    import transferRecordDetail from '@Tms/containers/driverDispatchRoute/TransferRecordDetail.vue'
    import driverDispatchTransfer from '@Tms/containers/driverDispatchRoute/DriverDispatchTransfer.vue'
    import driverDispatchRouteDetail from '@Tms/containers/driverDispatchRoute/DriverDispatchDetail.vue'
    import '@/asserts/styles/Tms/tms_driver_route.scss'
    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data(){
            return {
                tag:'tms_driverDispatchRoute',
                system:'/tms',
                titleName:'司机派送线路',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                }
            }
        },
        components: {
            driverDispatchRouteQuery,
            driverDispatchRouteAdd,
            driverDispatchRouteUpdate,
            driverDispatchRouteDetail,
//            transferRecordList,
//            transferRecordDetail,
//            driverDispatchTransfer,
//            driverDispatchDetail
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)

            // 添加tab
            this.$root.bus.$on('routeAdd', function(addTabObj) {
                if( _this.isExist(addTabObj.tag))return
                addTabObj.parentTag = _this.tag
                addTabObj.index = _this.tabsList.length
                _this.tabsList.push(addTabObj)
                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
            })
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
        }
    }
</script>
