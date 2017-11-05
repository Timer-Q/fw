<!--<template>-->
    <!--<div v-if='isCache' class="tms_vehicleManage">-->
        <!--<Tabs-->
            <!--class="temporary-tabs"-->
            <!--type="card"-->
            <!--v-model="selectTabCode"-->
            <!--@tab-remove="removeTab"-->
            <!--@tab-click="changeTab"-->

        <!--&gt;-->
            <!--<TabPane label="车辆档案管理-全部" :key="tag" :name="tag">-->
                <!--<div class="projection">-->
                    <!--<ButtonGroup>-->
                        <!--<Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>-->
                        <!--<Button class="public-function-btn" @click="deleteBtn">删除</Button>-->
                    <!--</ButtonGroup>-->
                    <!--<ButtonGroup>-->
                        <!--<Button class="public-function-btn" @click="checkRecord">审核</Button>-->
                        <!--<Button class="public-function-btn" @click="unCheckRecord">取消审核</Button>-->
                    <!--</ButtonGroup>-->
                    <!--<ButtonGroup>-->
                        <!--<Button class="public-function-btn" @click="clickByEdit('update')" :disabled="state">启用</Button>-->
                        <!--<Button class="public-function-btn" :disabled="state" @click="deleteChannel">停用</Button>-->
                    <!--</ButtonGroup>-->

                    <!--<Button class="public-function-btn" :disabled="state">日志</Button>-->
                <!--</div>-->
                <!--&lt;!&ndash;buttonState用来控制修改删除刷新和日志按钮的状态&ndash;&gt;-->
                <!--<VehicleList-->
                    <!--@childIds="listenToIds"-->
                    <!--@addChannel="clickByEdit"-->
                    <!--@buttonState="buttonState"-->

                    <!--ref="vehicleList"-->
                <!--&gt;</VehicleList>-->
            <!--</TabPane>-->
            <!--<TabPane closable v-for="(item,index) in tabsList"-->
                     <!--:key="item.tag"-->
                     <!--:label="item.name"-->
                     <!--:name="item.tag"-->

            <!--&gt;-->
                <!--<VehiclelAdd-->
                    <!--:key="item.tag"-->
                    <!--v-if="/add/.test(item.tag)"-->
                    <!--@removeChangeTab="removeTab"-->
                <!--&gt;</VehiclelAdd>-->
                <!--<VehiclelUpdate-->
                    <!--v-if="/update/.test(item.tag)"-->
                    <!--@removeChangeTab="removeTab"-->
                    <!--:vehicleItem="item"-->
                    <!--ref="listOutBox"-->
                <!--&gt;-->
                <!--</VehiclelUpdate>-->
                <!--<VehicleDetail-->
                    <!--:key="item.tag"-->
                    <!--v-if="/detail/.test(item.tag)"-->
                    <!--:vehicleItem="item"-->
                    <!--@editChannel="clickByEdit"-->

                <!--&gt;</VehicleDetail>-->

            <!--</TabPane>-->
        <!--</Tabs>-->
        <!--<div class="success" v-show="deleteFa">{{messages}}</div>-->
        <!--&lt;!&ndash;对话框&ndash;&gt;-->
        <!--<Dialog class="cj" :title="resultInfo.title" :visible.sync="dialogVisible">-->
            <!--<div :class="{'dialog-content':resultInfo.msg.split('\n').length>1,'dialog-cont-one':resultInfo.msg.split('\n').length==1}">-->
                <!--<p v-for="item in resultInfo.msg.split('\n')">{{item}}</p>-->
            <!--</div>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<Button size="small" @click="dialogVisible = false">取 消</Button>-->
                <!--<Button size="small" type="primary" @click="deleteChannel">确 定</Button>-->
            <!--</span>-->
        <!--</Dialog>-->
    <!--</div>-->
<!--</template>-->

<template>
    <div v-if='isCache'>
        <Tabs class="temporary-tabs" type="card" v-model="selectTab.tag" @tab-click="tabClick" @tab-remove="removeTab">
            <TabPane label="车辆档案-列表" :key="tag" :name="tag">
                <list-temp></list-temp>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <vehicle-add v-if="item.state=='add'" :tabMessage="item"></vehicle-add>
                <vehicle-update v-if="item.state=='update'" :tabMessage="item"></vehicle-update>
                <vehicle-detail v-if="item.state=='detail'" :tabMessage="item"></vehicle-detail>
                <!--<register-user-examine :registerUserObj="item"></register-user-examine>-->
            </TabPane>
        </Tabs>
    </div>
</template>


<script>

    //import "@/asserts/styles/B2B/index.scss"
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import vehicleService from '@Tms/services/vehicle/vehicleService.js'
    import vehicleAdd from "@Tms/containers/vehicle/addVehicle.vue"
    import vehicleUpdate from "@Tms/containers/vehicle/updateVehicle.vue"
    import vehicleDetail from "@Tms/containers/vehicle/vehicleDetail.vue"
    import listTemp from "@Tms/containers/vehicle/vehicleList.vue"

    export default {
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data() {
            return {
                tag:'tms_vehicleManage',
                system:'/tms',
                titleName:'车辆档案',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                },

            }
        },
        components: {
            listTemp,
            vehicleAdd,
            vehicleDetail,
            vehicleUpdate,


        },
        methods: {

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
        mounted() {
            const _this = this
            this.setSelectTab(this.tag,0)

            // 添加tab
            this.$root.bus.$on('vehicleTabAdd', function(addTabObj) {
                if( _this.isExist(addTabObj.tag))return
                addTabObj.parentTag = _this.tag
                addTabObj.index = _this.tabsList.length
                _this.tabsList.push(addTabObj)
                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
            })

            // 关闭tab
            this.$root.bus.$on('vehicleTabClose', function(removeTabObj) {
                _this.$root.bus.$emit("vehicleListRefresh")
                _this.tabsList.splice(removeTabObj.index,1)
                _this.setSelectTab(removeTabObj.parentTag,0)

            })

        }


    }
</script>
<style lang="scss" scoped>
    .success {
        position: absolute;
        transform: translate3d(-50%, -50%, 0);
        top: 50%;
        left: 50%;
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 6px;

    }
</style>
