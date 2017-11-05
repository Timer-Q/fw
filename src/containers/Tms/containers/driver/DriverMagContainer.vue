<template>
    <div v-if='isCache'>
        <Tabs class="temporary-tabs" type="card" v-model="selectTab.tag" @tab-click="tabClick" @tab-remove="removeTab">
            <TabPane label="司机档案-列表" :key="tag" :name="tag">
                <list-temp></list-temp>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <driver-add v-if="item.state=='add'" :tabMessage="item"></driver-add>
                <driver-update v-if="item.state=='update'" :tabMessage="item"></driver-update>
                <driver-detail v-if="item.state=='detail'" :tabMessage="item"></driver-detail>
                <!--<register-user-examine :registerUserObj="item"></register-user-examine>-->
            </TabPane>
        </Tabs>
    </div>
</template>
<script>

    //import "@/asserts/styles/B2B/index.scss"
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import DriverAdd from "@Tms/containers/driver/addDriver.vue"
    import DriverUpdate from "@Tms/containers/driver/updateDriver.vue"
    import DriverDetail from "@Tms/containers/driver/driverDatail.vue"
    import listTemp from "@Tms/containers/driver/driverList.vue"
//    import commonService from '@Tms/services/common/common.js'
//    import driverService from '@Tms/services/driver/driverService.js'

    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data(){
            return {
                tag:'tms_driverManage',
                system:'/tms',
                titleName:'司机档案',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                }
            }
        },
        components: {
            listTemp,
            DriverAdd,
            DriverUpdate,
            DriverDetail
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)

            // 添加tab
            this.$root.bus.$on('driverTabAdd', function(addTabObj) {
                if( _this.isExist(addTabObj.tag))return
                addTabObj.parentTag = _this.tag
                addTabObj.index = _this.tabsList.length
                _this.tabsList.push(addTabObj)
                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
            })

            // 关闭tab
            this.$root.bus.$on('driverTabClose', function(removeTabObj) {
                _this.$root.bus.$emit("driverListRefresh")
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
//    export default {
//        mixins: [oneLevelTabMixins, tmsLevelTabMixins],
//        data() {
//            return {
//                // 选中的二级tab
//                selectTabCode: "",
//                // 打开的二级tab集合
//                tabsList: [],
//                tag: 'tms_driverManage',
//                selectTab: {
//                    tag: '',
//                    index: 0
//                },
//                system: '/tms',
//                titleName: '司机档案管理',
//                state: true,
//                removeChannel: false,
//                ids: [],
//                driverData: '',
//                deleteFa: false,
//                vehicleData: null,
//                messages: '',
//                // 对话框参数
//                resultInfo: {
//                    type: '',
//                    title: '',
//                    msg: ''
//                },
//                // 对话框是否显示
//                dialogVisible: false,
//                dialogVisibles: false,
//                driverNo: '',
//                defaults:false,
//                radioModel:'',
//                selectRows:[],
//                contactInfo:{
//                    vehicleId:'',
//                    driverId:'',
//                    defaults:false,
//                    createUser:''
//                },
//                cx: []//车型
//
//            }
//        },
//        components: {
//            DriverList,
//            DriverAdd,
//            DriverDetail,
//            DriverUpdate,
//
//
//        },
//        created() {
//            let _this = this
//            _this.getDictoryByCode()
////            var myDate = new Date()
////            var mytime=myDate.toLocaleTimeString()     //获取当前时间
////            newDate.format('yyyy-MM-dd h:m:s')
////            console.log('当前时间---',(new Date()).getTime())
//        },
//        methods: {
//            //监听列表页传过来的ID
//            listenToIds: function (ids, driverData) {
//                let _this = this
//                _this.ids = ids
//                _this.driverData = driverData
//                console.log('坚挺数据', _this.driverData)
//            },
//            async getDictoryByCode() {
//                let _this = this
//
//                const message1 = {code: 'cx'}
//                const data1 = await commonService.fetchDictionary(message1)
//                if (data1.status == 200) {
//                    const result1 = data1.data.result
//                    _this.cx = result1
//                }
//            },
//
//            // 删除二级tab
//            /*detailTag详情页标签 detailData详情页数据*/
//            removeTab(targetName, detailTag, detailData) {
//                console.log(1111111111111)
//                console.log(targetName, detailTag, detailData)
//                let tabs = this.tabsList
//                let activeName = this.selectTabCode
//                if (activeName === targetName) {
//                    tabs.forEach((tab, index) => {
//                        if (tab.tag === targetName) {
//
//                            let nextTab = tabs[index + 1] || tabs[index - 1]
//                            /*如果detailTag存在,说明是要关掉修改页面并跳转回到之前的详情页面detailData*/
//                            activeName = detailTag ? detailTag : nextTab ? nextTab.tag : this.tag
//                            console.log('activeName', activeName)
//
//
//                        }
//                    })
//                }
//                this.selectTabCode = activeName
//                this.tabsList = tabs.filter(tab => tab.tag !== targetName)
//
//                if (detailData) {
//
//                    this.tabsList.forEach(function (item) {
//
//                        if (item.tag == detailTag) {
//                            console.log(item.tag, 555555555555)
//                            /*更新渠道信息*/
//                            item.vehicleDetail = {...item.vehicleDetail, ...detailData.vehicleDetail}
////                            console.log(item)
//
//                        }
//                    })
//
//
//                }
//
//                /*关闭标签时重新请求列表数据*/
//                if (activeName == "tms_driverManage_add") {
//                    console.log(activeName)
//                    this.$root.bus.$emit("getDriverList")
//                }
//
//            },
//            async getFocused() {
//                let _this = this
//             _this.getList()
//
//
//            },
//            async getList(type){
//                let _this = this
//
//                const message = {
//                    carrierId: _this.driverData.carrierId,
//                    vehicleNo: _this.driverNo,
//                    companyId:_this.driverData.companyId
//                }
//                const data = await driverService.getCarryListById(message)
//                if (data.status == 200) {
//
//                    const result = data.data.status.statusCode
//                    if (result == 0) {
//                        const resultList = data.data.result
//
//                        resultList.forEach((item, index) => {
//                            item.radioModel=item.id
//
//                        })
//                        // 赋值tableData
//                        this.vehicleData = resultList
//                    }
//                }
//
//            },
//            setSelectIds(selection) {
//
//                let _this = this
//                _this.selectRows = []
//                for (let i in selection) {
//                    _this.contactInfo = {}
//                    _this.contactInfo.vehicleId=selection[i].id
//                    _this.contactInfo.driverId=_this.driverData.id
//                    _this.contactInfo.createUser=2
//                    if(_this.radioModel==selection[i].id){
//                        _this.contactInfo.defaults=true
//                    }else{
//
//                        _this.contactInfo.defaults=false
//                    }
//                    _this.selectRows.push(_this.contactInfo)
//                }
//
//            },
//            async   contactVehicle(){
//                let _this = this
//
//
//                _this.selectRows.forEach((item, index) => {
//                   if(_this.radioModel==item.vehicleId){
//
//                       item.defaults=true
//                   }
//                   else{
//                       item.defaults=false
//                   }
//
//                })
//                const message =_this.selectRows
//                const data = await driverService.contactCar(message)
//                if (data.status == 200) {
//
//                    const result = data.data.status.statusCode
//                    if (result == 0) {
//                        this.$customMessage("关联成功！", "success")
//                        _this.dialogVisibles=false
//                        this.$refs.driverList.getDriverList()
//                    }else{
//                        this.$customMessage("关联失败！", "error")
//                    }
//                }
//
//            },
//            // 新增/修改/详情下的跳转
//            clickByEdit(state, row, tabDetail) {/*row是渠道列表当前行的字段信息*/
//                console.log(state, /update/.test(state))
//                let flag = false
//                let obj = {
//                    name: `${row && row.canalName || this.titleName}-` + (state == "add" ? "新增" : /update/.test(state) ? "修改" : "详情"),
//                    tag: `${this.tag}_` + state,
//                    driverDetail: row && row || "", /*渠道详情信息*/
////                    DetailTag:tabDetail&&tabDetail.tag||""
//                }
//                console.log(obj.tag, obj.name)
//
//                this.selectTabCode = obj.tag
//                for (let i = 0; i < this.tabsList.length; i++) {
//                    if (this.tabsList[i].tag == obj.tag) {
//                        flag = true
//                        return
//                    }
//                }
//                if (!flag) {
//                    this.tabsList.push(obj)
//                }
//
//            },
//            buttonState(state) {
//                this.state = state
//            },
//            /*点击删除按钮*/
//            deleteBtn() {
//                let _this = this
//                if (_this.ids.length == 0) {
//
//                    this.$customMessage("请至少选择一条记录！", "warning")
//                    return false
//                }
//                this.resultInfo.title = '删除提示'
//                this.resultInfo.msg = '确定彻底删除吗？'
//
//                this.dialogVisible = true
//
//            },
//            async deleteChannel() {
//                let _this = this
//
//                const message = {
//                    ids: _this.ids
//                }
//
//                const data = await driverService.deleteByIds(message)
//                if (data.status == 200) {
//                    const result = data.data.status.statusCode
//                    if (result == 0) {
//                        this.$customMessage("删除成功！", "success")
//                        this.dialogVisible = false
//                        this.$refs.driverList.getDriverList()
//                    } else {
//                        this.$customMessage("删除失败！", "error")
//                    }
//                }
//
//            },
//            async active() {
//                let _this = this
//                const message = {
//                    ids: _this.ids
//                }
//                if (_this.ids.length == 0) {
//                    this.$customMessage("请至少选择一条记录！", "warning")
//                    return false
//                }
//                const data = await driverService.activeByIds(message)
//                if (data.status == 200) {
//                    const result = data.data.status.statusCode
//                    if (result == 0) {
//                        this.$customMessage("启用成功！", "success")
//                        this.$refs.driverList.getDriverList()
//                    } else {
//                        this.$customMessage("启用失败！", "error")
//                        this.$refs.driverList.getDriverList()
//                    }
//                }
//            },
//            async unActive() {
//                let _this = this
//                const message = {
//                    ids: _this.ids
//                }
//                if (_this.ids.length == 0) {
//                    this.$customMessage("请至少选择一条记录！", "warning")
//                    return false
//
//                }
//                const data = await driverService.unActiveByIds(message)
//                if (data.status == 200) {
//                    const result = data.data.status.statusCode
//                    if (result == 0) {
//                        this.$customMessage("停用成功！", "success")
//                        this.$refs.driverList.getDriverList()
//                    } else {
//                        this.$customMessage("停用失败！", "error")
//                        this.$refs.driverList.getDriverList()
//                    }
//                }
//            },
//            //设置关联车辆
//            async setContactCar() {
//                let _this = this
//                //   _this.$refs.driverList.setCar()
//                if (_this.ids.length == 0) {
//                    _this.$customMessage("请至少选择一条数据", 'warning')
//                    return
//                }
//                if (_this.ids.length > 1) {
//                    _this.$customMessage("只能选择一条信息关联车辆", 'warning')
//                    return
//                }
//
//                _this.dialogVisibles = true
//                _this.getList()
////                const message = {
////                    carrierId: _this.driverData.carrierId
////                }
////                const data = await driverService.getCarryListById(message)
////                if (data.status == 200) {
////                    const result = data.data.status.statusCode
////                    if (result == 0) {
////                        const resultList = data.data.result
////                        // 赋值tableData
////                        this.vehicleData = resultList
////                    }
////                }
//
//            },
//            // 赋值tab选中
//            setSelectTab(tag, index) {
//                this.selectTab.tag = tag
//                this.selectTab.index = index
//            },
//            /*手动切换标签时触发,重新请求渠道信息*/
//            changeTab(tab) {
//                console.log(tab)
//                this.$root.bus.$emit("getVehicleList")
//
//            },
//            // tab点击
//            tabClick(selTab) {
//                this.selectTab.index = selTab.index
//            },
////            // tab关闭按钮
////            removeTab() {
////                this.tabsList.splice(this.selectTab.index - 1, 1)
////                this.setSelectTab(this.tag, 0)
////            },
//            updateTab() {
//                this.tabsList.splice(this.selectTab.index - 1, 1)
//                this.setSelectTab(this.tag, 0)
//            }
//        },
//        mounted() {
//            const _this = this
//
//
//            _this.selectTabCode = this.tag
//            _this.$root.bus.$on("clickByEdit", (state, row, tabDetail, remain) => {
//                _this.clickByEdit(state, row, tabDetail, remain)
//            })
//            _this.$root.bus.$on("removeTab", (targetName, detailTag, detailData) => {
//                console.log(targetName, detailTag, detailData)
//                _this.removeTab(targetName, detailTag, detailData)
//            })
//
//        },
//        activated: function () {
//            this.isCache = true
//            console.log('ChannelManagement的activated')
//        },
//        deactivated: function () {
//            console.log('ChannelManagement的deactivated')
//        },
//        destroyed() {
//            console.log('ChannelManagement组件销毁')
//        },
//
//    }
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
