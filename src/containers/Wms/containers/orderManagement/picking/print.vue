<template>
    <div class="wms-items">
        <div v-loading.body="loading">
            <!--标签功能操作栏  start-->
            <div class="wms-modal-div clearfix">
                <div>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="print">打印拣选单</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;">打印机设置</a>
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
                                    <span class="hspace">拣选单号</span>
                                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">波次号</span>
                                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                                </div>
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
                                    <span class="hspace">打印状态</span>
                                    <el-select v-model="model.printStatus" placeholder="全部">
                                        <el-option key="1" label="未打印" value="1">
                                        </el-option>
                                    </el-select>
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
                                <TableColumn type="index" label="序号" width="60"></TableColumn>
                                <TableColumn type="selection" width="55"></TableColumn>
                                <TableColumn prop="warehouseName" label="仓库" width=""></TableColumn>
                                <TableColumn prop="pickingNo" label="拣选单号" width=""></TableColumn>
                                <TableColumn prop="waveNo" label="波次号" width=""></TableColumn>
                                <TableColumn prop="printStateDesc" label="打印状态" width=""></TableColumn>
                                <TableColumn prop="sourceTypeDesc" label="来源类型" width=""></TableColumn>
                                <TableColumn prop="ownerName" label="货主" width=""></TableColumn>
                                <TableColumn prop="storeSpecDesc" label="存储规格" width=""></TableColumn>
                                <TableColumn prop="warehouseAreaUsageDesc" label="库区用途" width=""></TableColumn>
                                <TableColumn prop="pickingTypeDesc" label="拣选单类型" width=""></TableColumn>
                                <TableColumn prop="pickingSubTypeDesc" label="二级类型" width=""></TableColumn>
                                <TableColumn prop="orderCount" label="订单数" width=""></TableColumn>
                                <TableColumn prop="sowingTypeDesc" label="拣选类型" width=""></TableColumn>
                                <TableColumn prop="deliveryCompanyName" label="承运商" width=""></TableColumn>
                                <TableColumn prop="deliverModeDesc" label="配送方式" width=""></TableColumn>
                                <TableColumn prop="routeDesc" label="线路" width=""></TableColumn>
                                <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                                <TableColumn prop="createTime" :formatter="dateFormat" label="创建时间"
                                                 width=""></TableColumn>
                            </Table>
                        </div>
                        <!--表单  end-->
                        <!--分页    start-->
                        <pagination :pagination='pagination' @pagechange='getList'></pagination>
                        <!--分页    end-->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import moment from 'moment'
    import service from '@Wms/services/orderManagement/wave/managerService'
    import {Loading} from 'element-ui'

    let _this
    let api = {
        getlist: '/wms-outbound-server/picking/getListWithPage'
    }
    export default {
        directives: {loading: Loading.directive},
        created() {
            _this = this
            _this.api = api
        },
        components: {
            pagination
        },
        mounted() {
            _this.getList()
        },
        data() {
            return {
                loading: false,
                model: {
                    source: '0',
                    printStatus: "1"
                },
                api: {},
                tableData: [],
                multipleSelection: [],
                pagination: {
                    total: 0
                },
                timeRange: [],
            }
        },
        methods: {
            ...pageOperate,
            dateFormat: function (row, column) {
                var date = row[column.property]
                if (date == undefined) {
                    return ""
                }
                return moment(date).format("YYY-MM-DD hh:mm:ss")
            },
            print() {

                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作订单！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                let wavePrinted = _this.multipleSelection.filter(w => {
                    return w.printState == 2
                })
                if (wavePrinted !== undefined && wavePrinted !== null && wavePrinted.length > 0) {
                    _this.$alert('拣选单' + wavePrinted[0].pickingNo + '已打印，不能再次打印！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                // 调用打印接口，更新打印信息，然后执行打印
                _this.executedCount = 0
                for (var i = 0; i < _this.multipleSelection.length; i++) {
                    let requestData = {
                        id: _this.multipleSelection[i].id,
                        warehouseId: _this.multipleSelection[i].warehouseId,
                        printUser: "666",
                        printUserName: "东"
                    }
                    let scallback = function (_this, response) {
                        _this.executedCount = _this.executedCount + 1
                        // TODO:  调用打印SDK执行打印动作
                        let printRequest = {
                            "printerName": "用户指定打印机",
                            "app": "wms",
                            "fullName": "/出库模块/销售订单/拣选单",
                            "belong1": "1",
                            "belong2": "1",
                            "belong3": "1",
                            "documents": [
                                {
                                    "documentId": this.pickingNo,
                                    "parameters": {
                                        "picking": this.id
                                    },
                                    "copies": 1
                                }
                            ]
                        }
                        _this.$notify({
                            title: '成功',
                            message: '假装拣选单' + this.pickingNo + '打印成功！',
                            type: 'success'
                        })
                        _this.getList()
                    }.bind(_this.multipleSelection[i])
                    let fcallback = function (_this, error) {
                        _this.$notify.error({
                            title: '错误',
                            message: '拣选单' + this.pickingNo + '更新打印信息失败，无法执行打印！'
                        })
                    }.bind(_this.multipleSelection[i])
                    _this.$request({
                        url: '/wms-outbound-server/picking/print',
                        context: _this,
                        sendData: requestData,
                        successCallback: scallback,
                        failCallback: fcallback
                    })
                }
            }
        }
    }

</script>
