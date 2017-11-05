<style lang="scss" scoped>
    .channelName{
        color: dodgerblue;
    }
</style>
<template>

    <div ref="OutBox">
        <div class="projection">
        <ButtonGroup>
        <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
        <Button class="public-function-btn" @click="deleteBtn">删除</Button>
        </ButtonGroup>
        <ButtonGroup>
        <Button class="public-function-btn" @click="checkRecord">审核</Button>
        <Button class="public-function-btn" @click="unCheckRecord">取消审核</Button>
        </ButtonGroup>
        <ButtonGroup>
        <Button class="public-function-btn" @click="clickByEdit('update')" :disabled="state">启用</Button>
        <Button class="public-function-btn" :disabled="state" @click="deleteChannel">停用</Button>
        </ButtonGroup>

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
                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="startTime"
                                style="width: 100%;"></el-date-picker>
            </FormItem>
            <span>--</span>
            <FormItem>
                <el-date-picker type="date" placeholder="" @change="ch" v-model="endTime"
                                style="width: 100%;"></el-date-picker>
            </FormItem>
            <FormItem label="审核">
                <Select placeholder="全部" v-model="checkStatus">
                    <Option
                        v-for="item in checkStatusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="状态">
                <Select placeholder="全部" v-model="status">
                    <Option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="车辆类型">
                <Select placeholder="全部" v-model="vehicleType">
                    <Option
                        v-for="item in cllx"
                        :key="item.itemCode"
                        :label="item.itemName"
                        :value="item.itemCode">
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="车牌号码">
                <Input v-model="vehicleNo"></Input>
            </FormItem>

            <FormItem>
                <Button @click="getVehicleList">查询</Button>
            </FormItem>
            <FormItem>
                <a href="javascript:;">高级查询</a>
            </FormItem>
        </Form>

        <Table :data="tableData" :highlight-current-row="true" border style="width: 100%"
               @selection-change="setIds" @row-click="jumpToDetail">
            <TableColumn type="index" width="80" label="序号" header-align="center"></TableColumn>
            <TableColumn type="selection" width="55" prop="id"></TableColumn>
            <TableColumn prop="vehicleNo" sortable width="180" label="车牌号码" header-align="center" class-name="channelName">
            </TableColumn>
            <TableColumn prop="vehicleType" label="车辆类型" width="105" header-align="center" sortable>
                <template slot-scope="scope">
                    <span v-for="item in cllx" v-if="item.itemCode==scope.row.vehicleType">{{item.itemName}}</span>
                </template>
            </TableColumn>
            <TableColumn prop="vehicleModels" label="车型" sortable width="105" header-align="center">
                <template slot-scope="scope">
                    <span v-for="item in cx" v-if="item.itemCode==scope.row.vehicleModels">{{item.itemName}}</span>
                </template>
            </TableColumn>
            <TableColumn label="审核" sortable width="105" header-align="center">
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
            <TableColumn label="状态" sortable header-align="center">
                <template slot-scope="scope">
                                    <span v-if="scope.row.status===1">
                                        启用
                                    </span>
                    <span v-if="scope.row.status===2">
                                        停用
                                    </span>

                </template>
            </TableColumn>
            <TableColumn prop="carrierName" label="承运商名称" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn prop="drivingNo" label="行驶证号" sortable width="115" header-align="center">
            </TableColumn>
            <TableColumn prop="vin" label="车架号码" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn prop="trailerNo" label="挂车号码" sortable width="105" header-align="center">
            </TableColumn>
            <TableColumn prop="engineNo" label="发动机号" sortable width="130" header-align="center">
            </TableColumn>
            <TableColumn prop="operateNo" label="运营证号" sortable width="105" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="checkQuality" label="荷载质量(KG)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="surchargeNo" label="附加费证号" sortable width="100" header-align="center" align="right">
            </TableColumn>

            <TableColumn prop="checkQuality" label="核载质量(KG)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="checkVolume" label="核载体积" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="vehicleWeight" label="车辆皮重(KG)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="oilCost" label="百公里油耗(L)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="selfCarCode" label="自车编号" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="vehicleLength" label="车辆长度(M)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="vehicleWidth" label="车辆宽度(M)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="vehicleHeight" label="车辆高度(M)" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="buyTime" label="购买时间" sortable width="140" header-align="center" align="right">
                <template slot-scope="scope">
                    <!--<span>{{ scope.row.buyTime | formatDate}}</span>-->
                </template>
            </TableColumn>
            <TableColumn prop="vehicleUse" label="车辆用途" sortable width="100" header-align="center" align="right">
                <template slot-scope="scope">
                    <span v-for="item in clyt" v-if="item.itemCode==scope.row.vehicleUse">{{item.itemName}}</span>
                </template>
            </TableColumn>
            <TableColumn prop="remarks" label="备注" sortable width="100" header-align="center" align="right">
            </TableColumn>
            <TableColumn prop="checkUser" label="审核人" sortable width="100" header-align="center">
            </TableColumn>
            <TableColumn label="审核时间" sortable width="140" header-align="center" align="right">
                <template slot-scope="scope">
                    <span>{{ scope.row.checkTime | formatDate}}</span>
                </template>
            </TableColumn>
            <TableColumn prop="cancelCheckUser" label="取消审核人" sortable width="100" header-align="center">
            </TableColumn>
            <TableColumn label="取消审核时间" sortable width="140" header-align="center" align="right">
                <template slot-scope="scope">
                    <span>{{ scope.row.cancelCheckTime | formatDate}}</span>
                </template>
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
        <div class="success" v-show="deleteFa">{{messages}}</div>
        <!--对话框-->
        <Dialog class="cj" :title="resultInfo.title" :visible.sync="dialogVisible">
            <div :class="{'dialog-content':resultInfo.msg.split('\n').length>1,'dialog-cont-one':resultInfo.msg.split('\n').length==1}">
                <p v-for="item in resultInfo.msg.split('\n')">{{item}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <Button size="small" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="primary" @click="deleteChannel">确 定</Button>
            </span>
        </Dialog>
    </div>


</template>

<script>
    import vehicleService from '@Tms/services/vehicle/vehicleService.js'
    import commonService from '@Tms/services/common/common.js'
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'

    export default {
        mixins: [screenScrollMixins],
        data() {
            return {
                checkStatusOptions: [{
                    value: '1',
                    label: '已审核'
                }, {
                    value: '2',
                    label: '未审核'
                }, {
                    value: '3',
                    label: '已取消'
                }],
                statusOptions: [{
                    value: '1',
                    label: '启用'
                }, {
                    value: '2',
                    label: '停用'
                }],
                formData: {},
                tableData: null,
                isCheckBox: false,
                ids: [],
                driverName: '',
                batchCode: '',
                startCreateTime: '',
                endCreateTime: '',
                startTime: '',
                endTime: '',
                checkStatus: '',
                status: '',
                id: null,
                vehicleType: '',
                vehicleNo: '',
                whichDate: true,
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
                cllx: [],//车辆类型
                cx: [],//车型
                carryList: [],//承运商
                custName: '',//承运商名称
                clyt: [],
                state: true,
                removeChannel: false,
                ids: [],
                deleteFa: false,
                messages: '',
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                // 对话框是否显示
                dialogVisible: false

            }
        },

        created() {
            let _this = this
            _this.getDictoryByCode()
            _this.getVehicleList()
        },
        methods: {
            async getVehicleList() {
                let _this = this
                let startTime = null, endTime = null
                if (_this.startTime !== '') {
                    startTime = _this.startTime.getTime()
                }
                if (_this.endTime !== '') {
                    endTime = _this.endTime.getTime()
                }
                const message = {
                    status: _this.status,
                    pageNumber: _this.page.pageNum,
                    pageSize: _this.page.pageSize,
                    checkStatus: _this.checkStatus,
                    vehicleType: _this.vehicleType,
                    vehicleNo: _this.vehicleNo,
                    endTime: endTime,
                    startTime: startTime
                }
                try {
                    const data = await vehicleService.getVehicleList(message)
                    if (data.status == 200) {
                        const result = data.data.result.bseVehicleList
                        // 赋值tableData
                        this.tableData = result
                        console.log('---',data.data.result)
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

                    }

                    this.defaultBtnState()
                }
                catch (e) {

                    console.log(e)
                }
            },
            /*点击删除按钮*/
            deleteBtn(){

                if (this.ids.length == 0) {

                    this.$customMessage("请至少选择一条记录！", "warning")
                    this.dialogVisible = false
                    return
                }
                this.resultInfo.title = '删除提示'
                this.resultInfo.msg = '确定彻底删除吗？'

                this.dialogVisible = true

            },
            async getDictoryByCode() {
                let _this = this
                const message = {code: 'cllx'}
                const data = await commonService.fetchDictionary(message)
                if (data.status == 200) {
                    const result = data.data.result
                    this.cllx = result
                }
                const message1 = {code: 'cx'}
                const data1 = await commonService.fetchDictionary(message1)
                if (data1.status == 200) {
                    const result1 = data1.data.result
                    this.cx = result1
                }

                const message2 = {code: 'clyt'}
                const data2 = await commonService.fetchDictionary(message2)
                if (data2.status == 200) {
                    const result2 = data2.data.result
                    this.clyt = result2
                }
            },
            // 新增/修改/详情下的跳转
            clickByEdit(state, row, tabDetail) {/*row是渠道列表当前行的字段信息*/
                console.log(state, /update/.test(state))
                let flag = false
                this.tabAdd(state,row)
            },
            async jumpToDetail(row, event, column) {
                if (column.label == "车牌号码") {
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
            tabAdd(state,row){
                let addTabObj = {
                    name: `车辆档案-` + (state == "add" ? "新增" : /update/.test(state) ? "修改" : "详情"),
                    tag: `${this.tag}_` + state,

//                    DetailTag:tabDetail&&tabDetail.tag||""
                    state:state,
                    parentTag: ''
                }
                if(!addTabObj.vehicleId&&state!="add"){
                    addTabObj.vehicleId = row.id
                }


                this.$root.bus.$emit('vehicleTabAdd', addTabObj)
            },
            ch() {

                console.log("startTime", this.startTime)
                console.log("endTime", this.endTime)

                this.startTime = startTime
                this.endTime = endTime

            },

            handleClick(tab, event) {
                let _this = this
                let startTime = null, endTime = null
                if (_this.startTime !== '') {
                    startTime = _this.startTime.getTime()
                }
                if (_this.endTime !== '') {
                    endTime = _this.endTime.getTime()
                }
                const message = {
                    status: _this.status,
                    pageNumber: _this.currentPage,
                    pageSize: _this.pageSize,
                    checkStatus: _this.checkStatus,
                    vehicleType: _this.vehicleType,
                    vehicleNo: _this.vehicleNo,
                    endTime: endTime,
                    startTime: startTime
                }
                try {
                    const data = getVehicleList(message)

                    const result = data.data.result.bseVehicleList
                    // 赋值tableData
                    this.tableData = result
                    console.log('---',data.data.result.bseVehicleList)
                    // 赋值总条数
                    this.page.total = data.data.result.totalNum
                    // 总页数
                    this.page.pages = data.data.result.totalPage

//                            // 赋值总条数
//                            this.page.total = result.total
//                            // 总页数
//                            this.page.pages = result.pages


                    //   this.defaultBtnState()
                }
                catch (e) {
                }
            },
            setIds(selection) {

                let _this = this
                _this.ids = []
                for (let i in selection) {
                    _this.ids.push(selection[i].id)

                }

                this.$emit('childIds', _this.ids)
            },
            handleSizeChange(val) {
                this.page.pageSize = val
                this.getVehicleList()
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getVehicleList()
                console.log(`当前页: ${val}`)

            },
            async deleteChannel() {
                let _this = this

                const message = {
                    ids: _this.ids
                }

                const data = await vehicleService.deleteByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {

                        this.$customMessage("删除成功！", "success")
                        _this.deleteFa = false
                        this.getVehicleList()
                    } else {
                        _this.messages = '删除失败！'
                        _this.deleteFa = true
                        this.$customMessage("删除失败！", "error")
                    }
                }
                this.dialogVisible = false
            },
            async checkRecord() {
                let _this = this
                const message = {
                    ids: _this.ids
                }
                if (_this.ids.length == 0) {
                    this.$customMessage("请至少选择一条记录！", "warning")
                    return
                }
                const data = await vehicleService.checkByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {

                        this.$customMessage("审核成功！", "success")
                        this.getVehicleList()
                    } else {

                        this.$customMessage("审核失败！", "error")
                    }
                }
            },
            async unCheckRecord() {
                let _this = this
                const message = {
                    ids: _this.ids
                }
                if (_this.ids.length == 0) {
                    this.$customMessage("请至少选择一条记录！", "warning")
                    return
                }
                const data = await vehicleService.uncheckByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.$customMessage("取消审核成功！", "success")
                        this.getVehicleList()
                    } else {
                        this.$customMessage("取消审核失败！", "error")
                    }
                }
            },

            //点击表单行触发
            rowClick(row, event, column) {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
                this.dispatcherData = row
                console.log("row.id", row.id)
                return this.dispatcherData

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
            }
        },
        mounted() {
            const _this = this
            _this.$root.bus.$on("vehicleListRefresh",()=>{
                _this.getVehicleList()
            })

            this.getVehicleList()

        },
        computed: {},
        watch: {},
        filters: {
            formatDate(time) {

                if (time !=null) {
                    let date = new Date(time)
                    return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes())
                }
                else {
                    return ''
                }
            }

        }

    }

    function getFormat(val) {
        return val.toString().length > 1 ? val : "0" + val
    }
</script>

