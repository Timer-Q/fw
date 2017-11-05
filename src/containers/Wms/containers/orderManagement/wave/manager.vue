<template>
    <div class="wms-items" v-loading.body="isLoading">
        <div>
            <!--标签功能操作栏  start-->
            <div class="wms-modal-div clearfix">
                <div>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="confirmWave">确认波次</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="cancelConfirm">取消确认</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="cancelWave">取消波次</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="getList">刷新</a>
                    </p>
                </div>
            </div>
            <!--标签功能操作栏  end-->
            <div class="wms-main" ref="main">
                <div class="mainContainer clearfix">
                    <div class="mainContent mainContent-storeInfo">
                        <!--表单头部    start-->
                        <div class="vehicle-find">
                            <div class="vehicle-data">
                                <div class="inblock">
                                    <span class="hspace">来源类型</span>
                                    <el-select v-model="model.source" placeholder="全部">
                                        <el-option key="0" label="全部" value="0">
                                        </el-option>
                                        <el-option key="1" label="B2B" value="1">
                                        </el-option>
                                        <el-option key="2" label="B2C" value="2">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">波次号</span>
                                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">波次状态</span>
                                    <el-select v-model="model.status" placeholder="全部">
                                        <el-option key="0" label="全部" value="0">
                                        </el-option>
                                        <el-option key="100" label="创建" value="100">
                                        </el-option>
                                        <el-option key="200" label="确认" value="200">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">波次创建时间</span>
                                    <el-date-picker v-model="timeRange" type="datetimerange" placeholder="请输入   至">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="vehicle-btn">
                                <el-button type="button" class="search-btn" @click="getList">查询</el-button>
                                <a href="javascript:;">清空</a>
                            </div>
                        </div>
                        <!--表单头部    end-->

                        <!--表单  start-->
                        <div class="information-list">
                            <Table id="pastCodeTable" ref="pastCodeTable" :data="tableData"
                                   @selection-change="handleSelectionChange" highlight-current-row
                                   border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                                <TableColumn type="index" label="序号" width="60" show-overflow-tooltip></TableColumn>
                                <TableColumn type="selection" width="55" show-overflow-tooltip></TableColumn>
                                <TableColumn prop="statusDesc" label="波次状态" width="90"
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="warehouseName" label="仓库" width=""
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="waveNo" label="波次号" width="120" show-overflow-tooltip></TableColumn>
                                <TableColumn prop="sourceTypeDesc" label="来源类型" width=""
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="deliveryCompanyName" label="承运商" width=""
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="orderQty" label="订单数" width="" show-overflow-tooltip></TableColumn>
                                <TableColumn prop="pickingQty" label="拣选单数" width=""
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="distributionModeDesc" label="配送方式" width=""
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="routeDesc" label="线路" width="" show-overflow-tooltip></TableColumn>
                                <TableColumn prop="createUserName" label="创建人" width=""
                                             show-overflow-tooltip></TableColumn>
                                <TableColumn prop="createTime" :formatter="datetimeFormat" label="创建时间"
                                             width="" show-overflow-tooltip></TableColumn>
                            </Table>
                        </div>
                        <!--表单  end-->
                        <!--分页    start-->
                        <pagination :pagination='pagination' @pagechange='getList'></pagination>
                        <!--分页    end-->

                    </div>
                </div>
            </div>

            <!--弹窗 start-->
            <el-dialog title="提示" :visible.sync="dialogTableVisible" size="small">
                <span>以下{{operate}}失败！</span>
                <Table border :data="failWave">
                    <TableColumn property="waveNo" label="波次号" width="150"></TableColumn>
                    <TableColumn property="msg" label="失败原因"></TableColumn>
                </Table>
            </el-dialog>
            <!--弹窗 end-->

        </div>
    </div>
</template>
<script type="es6">


    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import moment from 'moment'
    import {Loading} from 'element-ui'

    let _this

    import service from '@Wms/services/orderManagement/wave/managerService'

    let api = {
        getlist: '/wms-outbound-server/wave/getListWithPage'
    }
    export default {
        directives: {loading: Loading.directive},
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                isLoading: false,
                loadingService: {
                    close: function () {

                    }
                },
                dialogTableVisible: false,
                model: {
                    source: '0',
                    status: "0"
                },
                api: {},
                tableData: [],
                more: false,
                orderCount: 200,
                multipleSelection: [],
                pagination: {
                    total: 0
                },
                dialogVisible: false,
                timeRange: [],
                waveCount: 0,
                operate: "波次确认",
                operate2: "确认波次",
                executedCount: 0,
                failWave: []
            }
        },
        components: {
            pagination
        },
        /*watch: {
            isLoading() {
                setTimeout(function () {
                    _this.loadingService.close()
                }, 500)
                if (_this.isLoading === true) {
                    _this.loadingService = Loading.service({target: ".wms-items"})
                }
            }
        },*/
        mounted() {
            _this.getList()
        },
        methods: {
            ...pageOperate,
            confirmWave() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作波次！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                let waveIsNotCreate = _this.multipleSelection.filter(w => {
                    return w.status != 100
                })
                if (waveIsNotCreate !== undefined && waveIsNotCreate !== null && waveIsNotCreate.length > 0) {
                    _this.$alert('只能选择状态为创建的波次，请重新选择！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                _this.operateWave("/wms-outbound-server/wave/waveConfirm", "波次确认", "确认波次", (wave) => {
                    return {
                        waveList: [{
                            id: wave.id,
                            warehouseId: wave.warehouseId
                        }]
                    }
                })
            },
            cancelConfirm() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作波次！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                let waveIsNotConfirm = _this.multipleSelection.filter(w => {
                    return w.status != 200
                })
                if (waveIsNotConfirm !== undefined && waveIsNotConfirm !== null && waveIsNotConfirm.length > 0) {
                    _this.$alert('只能选择状态为确认的波次，请重新选择！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                this.$confirm('确定要取消确认当前选择的波次吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.operateWave("/wms-outbound-server/wave/waveConfirmCancel", "波次取消确认", "取消确认", (wave) => {
                        return {
                            waveList: [{
                                id: wave.id,
                                warehouseId: wave.warehouseId
                            }]
                        }
                    })
                })
            },
            cancelWave() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作波次！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                let waveIsNotCreate = _this.multipleSelection.filter(w => {
                    return w.status != 100
                })
                if (waveIsNotCreate !== undefined && waveIsNotCreate !== null && waveIsNotCreate.length > 0) {
                    _this.$alert('只能选择状态为创建的波次，请重新选择！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                this.$confirm('确定要取消当前选择的波次吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.operateWave("/wms-outbound-server/wave/waveCancel", "波次取消", "取消波次", (wave) => {
                        return {
                            waveList: [{
                                id: wave.id,
                                warehouseId: wave.warehouseId
                            }]
                        }
                    })
                })
            },
            operateWave(url, operate, operate2, callback) {
                if (_this.failWave.length > 0) {
                    _this.failWave.splice(0, _this.failWave.length)
                }
                _this.isLoading = true
                _this.executedCount = 0
                _this.operate = operate
                _this.operate2 = operate2
                for (var i = 0; i < _this.multipleSelection.length; i++) {
                    // 逐行执行确认
                    let requestData = callback(_this.multipleSelection[i])
                    let fcallback = function (_this, response) {
                        _this.executedCount = _this.executedCount + 1
                        try {
                            _this.failWave.push({
                                waveNo: this.waveNo,
                                msg: response
                            })
                        } finally {
                            _this.checkEnd()
                        }
                    }.bind(_this.multipleSelection[i])
                    _this.$request({
                        url: url,
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            _this.executedCount = _this.executedCount + 1
                            setTimeout(function () {
                                _this.checkEnd()
                            }, 5000).bind(_this)

                        },
                        failCallback: fcallback
                    })
                }
            },
            checkEnd() {
                _this.isLoading = _this.executedCount !== _this.multipleSelection.length
                if (!_this.isLoading) {
                    /*setTimeout(function () {
                        _this.loadingService.close()
                    }, 500)*/
                    // 已执行结束
                    if (_this.failWave.length < 1) {
                        _this.$nextTick(() => {
                            _this.$alert(_this.operate2 + '成功！', '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        })
                    } else {
                        _this.dialogTableVisible = true
                    }
                    if (_this.failWave.length < _this.multipleSelection.length) {
                        _this.getlist()
                    }
                }
            }
        }
    }

</script>
