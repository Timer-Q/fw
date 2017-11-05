<style lang="scss" scoped>
    .channelName {
        color: dodgerblue;
    }
</style>
<template>

    <div>
        <div class="projection">
            <ButtonGroup>
                <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
                <Button class="public-function-btn" @click="deleteBtn">删除</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button class="public-function-btn" @click="active">启用</Button>
                <Button class="public-function-btn" @click="unActive">停用</Button>
            </ButtonGroup>
            <Button class="public-function-btn" @click="setContactCar">设置关联车辆</Button>

            <Button class="public-function-btn" :disabled="state">日志</Button>
        </div>
        <Form :inline="true" class="demo-form-inline">


            <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                <!--查询方案弹出层开始-->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided>黄金糕
                        <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>狮子头
                        <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>螺蛳粉
                        <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>双皮奶
                        <span>
                                <i class="iconfont icon-xiugai"></i>
                                <i class="iconfont icon-guanbi"></i>
                                </span>
                    </el-dropdown-item>

                </el-dropdown-menu>
                <!--查询方案弹出层结束-->
            </el-dropdown>

            <span class="demonstration">创建时间</span>
            <FormItem style="margin-right:0">
                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="searchObj.startTime"
                                style="width: 100%;"></el-date-picker>
            </FormItem>
            <span>--</span>
            <FormItem>
                <el-date-picker type="date" placeholder="" @change="ch" v-model="searchObj.endTime"
                                style="width: 100%;"></el-date-picker>
            </FormItem>


            <FormItem label="状态">
                <Select placeholder="全部" v-model="searchObj.status">
                    <Option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="手机号码">
                <Input v-model="searchObj.phoneNo"></Input>
            </FormItem>
            <FormItem label="司机姓名">
                <Input v-model="searchObj.driverName"></Input>
            </FormItem>
            <FormItem label="所属承运商">
                <Input v-model="searchObj.belongCarry"></Input>
            </FormItem>

            <FormItem>
                <Button @click="getDriverList">查询</Button>
            </FormItem>
            <FormItem>
                <a href="javascript:;">高级查询</a>
            </FormItem>
        </Form>

        <Table :data="tableData" :highlight-current-row="true" border style="width: 100%"
               @selection-change="setIds" @row-click="jumpToDetail">
            <TableColumn type="index" width="80" label="序号" header-align="center"></TableColumn>
            <TableColumn type="selection" width="55" prop="id"></TableColumn>
            <TableColumn prop="driverCode" sortable width="180" label="司机编号" header-align="center"
                         class-name="channelName">
            </TableColumn>
            <TableColumn prop="driverName" label="司机姓名" width="105" header-align="center" sortable>
            </TableColumn>
            <TableColumn prop="vehicleNo" label="车牌号码" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn prop="phoneNo" label="手机号码" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn prop="telNo" label="电话号码" sortable header-align="center">
                <!--<template scope="scope">-->
                <!--<span>{{ scope.row.telNo | formatTelNo}}</span>-->
                <!--</template>-->
            </TableColumn>
            <TableColumn prop="carrierName" label="承运商名称" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn label="状态" sortable width="115" header-align="center">
                <template scoslot-scopepe="scope">
                                    <span v-if="scope.row.status==true" style="color: green">
                                        启用
                                    </span>
                    <span v-if="scope.row.status==false" style="color: red">
                                        停用
                                    </span>
                </template>
            </TableColumn>
            <TableColumn prop="identityCard" label="身份证号" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn prop="driveType" label="准驾车型" sortable width="105" header-align="center">
                <template slot-scope="scope">
                    <span v-for="item in zjcx" v-if="item.itemCode==scope.row.driveType">{{item.itemName}}</span>
                </template>
            </TableColumn>
            <TableColumn prop="driverNo" label="驾驶证号" sortable width="130" header-align="center">
            </TableColumn>
            <TableColumn prop="createUser" label="制单人" sortable width="100" header-align="center">
            </TableColumn>
            <TableColumn label="制单时间" sortable width="140" header-align="center" align="right">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime | formatDate}}</span>
                </template>
            </TableColumn>
            <TableColumn prop="updateUser" label="修改人" sortable width="100" header-align="center">
            </TableColumn>
            <TableColumn label="修改时间" sortable width="140" header-align="center" align="right">
                <template slot-scope="scope">
                    <span>{{ scope.row.updateTime | formatDate}}</span>
                </template>
            </TableColumn>
        </Table>
        <Pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            class="f_r"
        >
        </Pagination>

        <!--对话框-->
        <Dialog class="cj" :title="resultInfo.title" :visible.sync="dialogVisible">
            <div
                :class="{'dialog-content':resultInfo.msg.split('\n').length>1,'dialog-cont-one':resultInfo.msg.split('\n').length==1}">
                <p v-for="item in resultInfo.msg.split('\n')">{{item}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <Button size="small" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="primary" @click="deleteChannel">确 定</Button>
            </span>
        </Dialog>
        <Dialog title="关联车辆" :visible.sync="dialogVisibles">
            <Form :inline="true" class="demo-form-inline">
                <FormItem label="司机姓名">
                    <Input v-model="driverData.driverName" :disabled="true"></Input>
                </FormItem>
                <FormItem label="所属承运商">
                    <Input v-model="driverData.carrierName" :disabled="true"></Input>
                </FormItem>
                <FormItem label="车牌号码">
                    <Input v-model="driverNo" @focus="getFocused" @change="getFocused"></Input>
                </FormItem>

                <Table :data="vehicleData" height="350" :highlight-current-row="true" border style="width: 100%"
                       @selection-change="setSelectIds"     >
                    <TableColumn type="index" width="80" label="序号" header-align="center"></TableColumn>
                    <TableColumn type="selection" width="55" prop="id"></TableColumn>
                    <TableColumn prop="vehicleNo"  width="100" label="车牌号码" header-align="center"
                                 class-name="channelName">
                    </TableColumn>
                    <TableColumn prop="vehicleModels" label="车型"  width="105" header-align="center">
                        <template slot-scope="scope">
                            <span v-for="item in cx"
                                  v-if="item.itemCode==scope.row.vehicleModels">{{item.itemName}}</span>
                        </template>
                    </TableColumn>
                    <TableColumn prop="drivingNo" label="行驶证号"  width="115" header-align="center">
                    </TableColumn>
                    <TableColumn prop="vin" label="车架号码"  width="105" header-align="center">
                    </TableColumn>

                    <TableColumn label="审核"  width="80" header-align="center">
                        <template slot-scope="scope">
                                    <span v-if="scope.row.checkStatus===1" style="color: green">
                                        已审核
                                    </span>
                            <span v-if="scope.row.checkStatus===2" style="color: red">
                                        未审核
                                    </span>
                            <span v-if="scope.row.checkStatus===3">
                                        已取消
                                    </span>
                        </template>
                    </TableColumn>
                    <TableColumn label="状态"  header-align="center">
                        <template slot-scope="scope">
                                    <span v-if="scope.row.status===1">
                                        启用
                                    </span>
                            <span v-if="scope.row.status===2">
                                        停用
                                    </span>

                        </template>
                    </TableColumn>
                    <TableColumn label="默认"  width="80" header-align="center">
                        <template slot-scope="scope">

                            <Radio v-model="radioModel" :label="scope.row.id">&nbsp;</Radio>




                        </template>
                    </TableColumn>
                    <TableColumn prop="remark" label="备注"  width="105" header-align="center">
                    </TableColumn>
                </Table>

            </Form>
            <span slot="footer" class="dialog-footer">
                <Button size="small" @click="this.dialogVisibles=false">取 消</Button>
                <Button size="small" type="primary" @click="contactVehicle">确定</Button>
            </span>
        </Dialog>

    </div>


</template>

<script>
    import driverService from '@Tms/services/driver/driverService.js'
    import commonService from '@Tms/services/common/common.js'
    import scrollMixins from '@/mixins/scrollMixins.js'

    export default {
        mixins: [scrollMixins],
        data() {
            return {
                statusOptions: [{
                    value: 'true',
                    label: '启用'
                }, {
                    value: 'false',
                    label: '停用'
                }],
                searchObj: {
                    startTime: '',
                    endTime: '',
                    status: '',
                    belongCarry: '',
                    driverName: '',
                    phoneNo: ''
                },
                formData: {},
                tableData: null,
                isCheckBox: false,
                ids: [],
                id: null,
                dialogVisible: false,//银行账户弹框
                page: {
                    pageSizes: [10, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 0,
                    pageSize: 10,
                    pages: 0
                },
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                zjcx: [],//准驾类型
                driverData: '',
                telNos: [],
                tabsList:[],


                state: true,
                dialogVisible: false,
                dialogVisibles: false,
                driverNo: '',
                defaults:false,
                radioModel:'',
                selectRows:[],
                contactInfo:{
                    vehicleId:'',
                    driverId:'',
                    defaults:false,
                    createUser:''
                },
                cx: [],//车型
                ids: [],
                driverData: '',
                deleteFa: false,
                vehicleData: null

            }
        },

        created() {
            let _this = this
            _this.getDictoryByCode()
            _this.getDriverList()
        },
        methods: {
            async getDriverList() {
                let _this = this
                let startTime = null, endTime = null
                if (_this.searchObj.startTime !== '') {
                    startTime = _this.searchObj.startTime.getTime()
                }
                if (_this.searchObj.endTime !== '') {
                    endTime = this.searchObj.endTime.getTime()
                }
                const message = {
                    belongCarry: _this.searchObj.belongCarry,
                    pageNumber: _this.page.pageNum,
                    pageSize: _this.page.pageSize,
                    status: _this.searchObj.status,
                    driverName: _this.searchObj.driverName,
                    phoneNo: _this.searchObj.phoneNo,
                    endTime: endTime,
                    startTime: startTime
                }
                console.log('-startTime---', startTime)
                console.log('--endTime--', endTime)
                try {
                    const data = await driverService.getDriverList(message)
                    if (data.status == 200) {
                        const result = data.data.result.baseDriverDTOs
                        // 赋值tableData
                        this.tableData = result
                        console.log('---', data.data.result)
                        // 赋值总条数
                        this.page.total = data.data.result.totalNum
                        // 总页数
                        this.page.pages = data.data.result.totalPage
//                            // 赋值总条数
//                            this.page.total = result.total
//                            // 总页数
//                            this.page.pages = result.pages
                    } else {
                        console.log(data.status.statusReason)
                        //this.$myMessage("查询失败", "error")
                    }

                    this.defaultBtnState()
                }
                catch (e) {
                    //  this.$myMessage("查询失败-c", "error")
                    console.log(e)
                }
            },
            async getDictoryByCode() {
                let _this = this
                const message = {code: 'zjcx'}
                const data = await commonService.fetchDictionary(message)
                if (data.status == 200) {
                    const result = data.data.result
                    this.zjcx = result
                }

            },
            //设置关联车辆
            async setCar() {


            },
            ch() {

                console.log("startTime", this.startTime)
                console.log("endTime", this.endTime)

                this.startTime = startTime
                this.endTime = endTime

            },
            async jumpToDetail(row, event, column) {
                if (column.label == "司机编号") {
                    /*将点击的渠道信息进行传递*/
                    let _this = this

                    let id = row.id
                    console.log('---' + id)
                    const message = {
                        id: row.id
                    }

//                    const data = await driverService.detail(message)

//                    this.$emit('addChannel', "detail" + row.id, data.data.result)

                    this.tabAdd("detail",row)

                }
            },
            handleClick(tab, event) {

            },
            setIds(selection) {

                let _this = this
                _this.ids = []
                for (let i in selection) {
                    _this.ids.push(selection[i].id)
                    _this.driverData = selection[i]
                    console.log('driveeddd', _this.driverData)
                }

              //  this.$emit('childIds', _this.ids, _this.driverData)
            },
            handleSizeChange(val) {
                this.page.pageSize = val
                this.getDriverList()
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getDriverList()
                console.log(`当前页: ${val}`)

            },

            formatDate(time) {
                if (time!=null) {
                    let date = new Date(time)
                    return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes())
                }
                else {
                    return ''
                }
            },
            //点击表单行触发
            rowClick(row, event, column) {
//                this.$tooltip({
//                    top: event.clientY,
//                    left: event.clientX
//                }, 'costorder')
                let _this = this
                _this.driverData = row
                console.log("row", row)
                console.log("row.id", row.id, _this.driverData)
                return _this.driverData

            },


            //消息提示
            messages(obj) {
                let type = obj.type || 'success'
                this.$message({
                    message: obj.message || (type == 'success' ? '操作成功' : '操作失败'),
                    type: type,
                    iconClass: obj.iconClass || (type == 'success' ? 'iconfont icon-chenggong' : 'iconfont icon-shanchuxx'),
                    duration: 2000
                })
            },


            // 新增/修改/详情下的跳转
            clickByEdit(state, row, tabDetail) {/*row是渠道列表当前行的字段信息*/
                console.log(state, /update/.test(state))
                let flag = false
                this.tabAdd(state,row)
            },
            tabAdd(state,row){
                let addTabObj = {
                    name: `司机档案-` + (state == "add" ? "新增" : /update/.test(state) ? "修改" : "详情"),
                    tag: `${this.tag}_` + state,
                    driverDetail: row && row || "", /*渠道详情信息*/
//                    DetailTag:tabDetail&&tabDetail.tag||""
                    state:state,
                    parentTag: ''
                }
                if(!addTabObj.driverId&&state!="add"){
                    addTabObj.driverId = row.id
                }


                this.$root.bus.$emit('driverTabAdd', addTabObj)
            },
            //            /*点击删除按钮*/
            deleteBtn() {
                let _this = this
                if (_this.ids.length == 0) {

                    this.$customMessage("请至少选择一条记录！", "warning")
                    return false
                }
                this.resultInfo.title = '删除提示'
                this.resultInfo.msg = '确定彻底删除吗？'

                this.dialogVisible = true

            },
            async active() {
                let _this = this
                const message = {
                    ids: _this.ids
                }
                if (_this.ids.length == 0) {
                    this.$customMessage("请至少选择一条记录！", "warning")
                    return false
                }
                const data = await driverService.activeByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.getDriverList()
                        this.$customMessage("启用成功！", "success")

                    } else {
                        this.getDriverList()
                        this.$customMessage("启用失败！", "error")

                    }
                }
            },
            async unActive() {
                let _this = this
                const message = {
                    ids: _this.ids
                }
                if (_this.ids.length == 0) {
                    this.$customMessage("请至少选择一条记录！", "warning")
                    return false

                }
                const data = await driverService.unActiveByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.getDriverList()
                        this.$customMessage("停用成功！", "success")

                    } else {
                        this.getDriverList()
                        this.$customMessage("停用失败！", "error")

                    }
                }
            },
            //设置关联车辆
            async setContactCar() {
                let _this = this
                //   _this.$refs.driverList.setCar()
                if (_this.ids.length == 0) {
                    _this.$customMessage("请至少选择一条数据", 'warning')
                    return
                }
                if (_this.ids.length > 1) {
                    _this.$customMessage("只能选择一条信息关联车辆", 'warning')
                    return
                }

                _this.dialogVisibles = true
                _this.getList()


            },
            async getList(){
                let _this = this

                const message = {
                    carrierId: _this.driverData.carrierId,
                    vehicleNo: _this.driverNo,
                    companyId:_this.driverData.companyId
                }
                const data = await driverService.getCarryListById(message)
                if (data.status == 200) {

                    const result = data.data.status.statusCode
                    if (result == 0) {
                        const resultList = data.data.result

                        resultList.forEach((item, index) => {
                            item.radioModel=item.id

                        })
                        // 赋值tableData
                        this.vehicleData = resultList
                    }
                }

            },
            async deleteChannel() {
                let _this = this

                const message = {
                    ids: _this.ids
                }

                const data = await driverService.deleteByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.$customMessage("删除成功！", "success")
                        this.dialogVisible = false
                        this.getDriverList()
                    } else {
                        this.$customMessage("删除失败！", "error")
                    }
                }

            },
            async getFocused() {
                let _this = this
             _this.getList()


            },
            setSelectIds(selection) {

                let _this = this
                _this.selectRows = []
                for (let i in selection) {
                    _this.contactInfo = {}
                    _this.contactInfo.vehicleId=selection[i].id
                    _this.contactInfo.driverId=_this.driverData.id
                    _this.contactInfo.createUser=2
                    if(_this.radioModel==selection[i].id){
                        _this.contactInfo.defaults=true
                    }else{

                        _this.contactInfo.defaults=false
                    }
                    _this.selectRows.push(_this.contactInfo)
                }

            },
            async   contactVehicle(){
                let _this = this


                _this.selectRows.forEach((item, index) => {
                   if(_this.radioModel==item.vehicleId){

                       item.defaults=true
                   }
                   else{
                       item.defaults=false
                   }

                })
                const message =_this.selectRows
                const data = await driverService.contactCar(message)
                if (data.status == 200) {

                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.$customMessage("关联成功！", "success")
                        _this.dialogVisibles=false
                        this.getDriverList()
                    }else{
                        this.$customMessage("关联失败！", "error")
                    }
                }

            }
        },
        mounted() {
            const _this = this
            _this.$root.bus.$on("driverListRefresh",()=>{
                _this.getDriverList()
            })
            _this.getDriverList()

        },
        computed: {},
        watch: {},
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes())
            },
            formatTelNo(phone) {
                let _this = this
                if (phone == '--') {
                    return ''
                } else {
                    let telNos = []
                    if (phone != '') {
                        _this.telNos = phone.split('--')
                        if (_this.telNos.length == 1) {
                            return ''
                        } else {
                            _this.telNos = phone.split('-')
                            if (_this.telNos.length == 3) {
                                return phone
                            }
                        }

                    }


                }


            }
        }
    }

    function getFormat(val) {
        return val.toString().length > 1 ? val : "0" + val
    }
</script>

