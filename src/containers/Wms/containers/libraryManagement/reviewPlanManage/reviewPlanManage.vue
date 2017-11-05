<template>
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="add()">新增</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="remove()">删除</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="canfirm(1)">确认</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="confirm(0)">取消确认</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="createReview()">生成盘点单</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="refresh">刷新</el-button>
                </div>
                <div class="btnGroup">
                    <el-button>日志</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <!--表单头部    start-->
                    <div class="vehicle-find">
                        <div class="vehicle-data">
                            <p class="inblock">
                                <span class="hspace">创建时间</span>
                                <el-date-picker
                                    v-model="times"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择时间范围"
                                    align="right">
                                </el-date-picker>
                            </p>
                            <p class="inblock">
                                <span class="hspace">盘点计划单号</span>
                                <el-input v-model="listQueryParam.reviewPlanNo"></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">货主</span>
                                <el-input v-model="listQueryParam.ownerName"></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">状态</span>
                                <el-select v-model="listQueryParam.status">
                                    <el-option
                                        v-for="item in reviewPlanStatusList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value"
                                        class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="vehicle-btn">
                            <el-button @click="query()">查询</el-button>
                            <el-button @click="clean()">清空</el-button>
                        </div>
                    </div>
                    <!--表单头部    end-->
                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable"
                               :data="tableData"
                               ref="pastCodeTable"
                               @row-click='rowClick'
                               @selection-change="handleSelectionChange"
                               highlight-current-row border
                               style="width: 100%"
                               :default-sort="{prop: 'date', order: 'descending'}">
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="40"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态" width="70"></TableColumn>
                            <TableColumn prop="reviewPlanNo" label="盘点计划单号" width="160"></TableColumn>
                            <TableColumn prop="ownerName" label="货主" width="160"></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库" width="80"></TableColumn>
                            <TableColumn prop="warehouseAreaUsageDesc" label="库区用途" width=""></TableColumn>
                            <TableColumn prop="warehouseAreaName" label="库区" width="160"></TableColumn>
                            <TableColumn prop="reviewTypeDesc" label="盘点类型" width=""></TableColumn>
                            <TableColumn prop=stock"     label="库存范围值" width=""></TableColumn>
                            <TableColumn prop="includeZeroDesc" label="零库存是否参与盘点" width=""></TableColumn>
                            <TableColumn prop="remark" label="备注" width=""></TableColumn>
                            <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width=""
                                         :formatter="datetimeFormat"></TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->
                    <!--分页    start-->
                    <pagination :pagination='pagination' @pagechange='getList'></pagination>
                    <!--分页    end-->
                    <!--添加盘点计划 弹窗  start-->
                    <el-dialog title="添加盘点计划" class="advancedQuery" :visible.sync="addVisible">
                        <!--传递reviewPlanId，注册cancel和saved事件-->
                        <add-loc  @cancel="addVisible=false" @saved="addVisible=false"></add-loc>
                    </el-dialog>
                    <!--添加盘点计划 弹窗  end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->
    </div>
</template>
<script>
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    import addReviewPlan from '@Wms/containers/libraryManagement/reviewPlanManage/addReviewPlan.vue'

    import service from '@Wms/services/libraryManagement/reviewPlanManage/reviewPlanManage.js'

    let _this = null
    let api = {
        getlist: '/wms-inside-server/reviewPlan/getListWithPage',//主列表信息
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                listQueryParam: {
                    pageNumber: 0,
                    pageSize: 10,
                    startTime: '',
                    endTime: '',
                    reviewPlanNo: '',
                    ownerName: '',
                    status: ''
                },
                reviewPlanId: '',
                addVisible: false,
                // 分页
                pagination: {
                    total: 0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },
                reviewPlanStatusList: [],//盘点计划状态枚举
                tableData: [], //表单数据 数组
                multipleSelection: [],// 当前选择的数据项目
                selectionDetailList: [],// 子表单明细列表
                selectionDetailLabelNo: '-',//子表单表头数据编号
                curRow: {}, // 当前选中行数据
                value: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
            }
        },
        components: {
            pagination,
            "add-reviewPlan":addReviewPlan,
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
            add() {
                _this.addVisible = true
            },
            remove() {
                if (!_this.checkOne()) {
                    return
                }
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": 2000
                }
                _this.$request({
                    url: '/wms-inside-server/reviewPlan/delete',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response)
                        _this.getList()
                    }
                })
            },
            confirm(connfirm) {
                if (!_this.check()) {
                    return
                }
                var requestUrl
                if (connfirm == 0) {
                    requestUrl = '/wms-inside-server/reviewPlan/confirm'
                }
                if (connfirm == 1) {
                    requestUrl = '/wms-inside-server/reviewPlan/cancelConfirm'
                }
                let idsArr = []
                for (var i of _this.multipleSelection) {
                    idsArr.push(i.id)
                }
                var requestData = {
                    "idList": idsArr,
                    "warehouseId": 2000
                }
                _this.$request({
                    url: requestUrl,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response)
                        _this.getList()
                    }
                })
            },
            query() {
                _this.getList()
            },
            getEnum() {
                var requestData = [{
                    "key": "reviewPlanStatus"
                }]
                _this.$request({
                    url: '/wms-pub-server/public/getEnums',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.reviewPlanStatusList = response[0].enumList
                    }
                })
            },
            checkOne() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要操作的盘点计划！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个盘点计划进行操作！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                return true
            },
            check() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要操作的盘点计划！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                return true
            }
        },
        mounted() {
            this.getList()
            this.getEnum()
        },
        watch: {
            // 监听value值变化，从而去加载需要编辑的数据
            times() {
                if (_this.times.length == 2) {
                    if (_this.times[0] != null && _this.times[1] != null) {
                        _this.listQueryParam.startTime = _this.times[0].getTime()
                        _this.listQueryParam.endTime = _this.times[1].getTime()
                    }
                }
            }
        },
    }
</script>
