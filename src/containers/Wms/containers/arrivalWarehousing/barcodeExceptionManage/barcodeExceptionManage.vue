<template>
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="javascript:" @click="process">处理</a>
                </p>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <!--表单头部    start-->
                    <div class="e-find">
                        <div class="vehicle-data">
                            <p class="inblock">
                                <span class="hspace">状态：</span>
                                <el-select v-model="listQueryParam.status" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="inblock">
                                <span class="hspace">货主：</span>
                                <el-select v-model="listQueryParam.ownerId" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in ownerOptions"
                                        :key="item.ownerId"
                                        :label="item.ownerName"
                                        :value="item.ownerId">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="inblock">
                                <span class="hspace">供应商：</span>
                                <el-select v-model="listQueryParam.supplierId" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in supplierOptions"
                                        :key="item.supplierId"
                                        :label="item.supplierName"
                                        :value="item.supplierId">
                                    </el-option>
                                </el-select>
                            </p>
                            <div class="vehicle-btn">
                                <el-button @click="queryData">查询</el-button>
                            </div>
                            <br>
                            <p class="inblock">
                                <span class="hspace">入库通知单号：</span>
                                <el-input v-model="listQueryParam.inboundNotifyNo"></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">异常类型：</span>
                                <el-select v-model="listQueryParam.exceptionType" placeholder="请选择">
                                    <el-option
                                        v-for="item in exceptionTypeOptions"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="inblock">
                                <span class="hspace">创建时间：</span>
                                <el-date-picker
                                    v-model="startTime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </p>
                            <p class="inblock">
                                <span class="hspace">至</span>
                                <el-date-picker
                                    v-model="endTime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </p>
                        </div>
                    </div>
                    <!--表单头部    end-->

                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable"
                               :data="tableData"
                               ref="pastCodeTable"
                               @selection-change="handleSelectionChange"
                               highlight-current-row border
                               style="width: 100%"
                               :default-sort="{prop: 'createTime', order: 'descending'}">
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <!--<TableColumn type="selection" width="55"></TableColumn>-->
                            <TableColumn prop="exceptionTypeDesc" label="异常类型" width="160"></TableColumn>
                            <TableColumn prop="inboundNotifyNo" label="入库通知单号" width="150"></TableColumn>
                            <TableColumn prop="containerCode" label="SKUID" width="130"></TableColumn>
                            <TableColumn prop="unitConvertText" label="整零转换" width=""></TableColumn>
                            <TableColumn prop="unit" label="单位" width=""></TableColumn>
                            <TableColumn prop="systemBarcode" label="系统条码" width=""></TableColumn>
                            <TableColumn label="实物条码" width="">
                                <template scope="scope">
                                    <el-input v-model="scope.row.realGoodsBarcode"
                                              v-bind:class="{ errorBg : scope.row.hasError}"
                                              @blur="validateRealBarcode(scope.row,$event)"
                                              @change="realBarcodeChange(scope.row)"
                                              @keyup.enter.native="realBarcodeEnter(scope.row,$event)"></el-input>
                                </template>
                            </TableColumn>
                            <TableColumn prop="goodsName" label="商品名称" width=""></TableColumn>
                            <TableColumn prop="goodsQty" label="数量" width=""></TableColumn>
                            <TableColumn prop="ownerName" label="货主" width=""></TableColumn>
                            <TableColumn prop="supplierName" label="供应商" width=""></TableColumn>
                            <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width="" :formatter="dateFormat"></TableColumn>
                            <TableColumn prop="handleUserName" label="处理人" width=""></TableColumn>
                            <TableColumn prop="handleTime" label="处理时间" width="" :formatter="dateFormat"></TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->
                    <!--分页    start-->
                    <!--<pagination :pagination='pagination' @pagechange='queryData'></pagination>-->
                    <!--分页    end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->
        <el-dialog title="提示"
                   class="advancedQuery"
                   :visible.sync="checkDialog.visible"
                   size="tiny">
            <span>{{checkDialog.message}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkDialog.visible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'

    let _this = null
    export default {
        created() {
            _this = this
        },
        data() {
            return {
                //表单数据 数组
                tableData: [],
                // 当前选择的数据项目
                multipleSelection: [],
                // 分页
                pagination: {
                    pageSizes: [10, 20, 50, 100, 150, 200], // 分页每页有多少
                    total: 100,
                    currentPage: 1,
                },
                statusOptions: [],
                ownerOptions: [],
                supplierOptions: [],
                exceptionTypeOptions: [],
                listQueryParam: {
                    startCreateTime: new Date().getTime(),
                    endCreateTime: new Date().getTime(),
                    status: 100,
                    ownerId: null,
                    supplierId: null,
                    exceptionType: null,
                    inboundNotifyNo: ""
                },
                cacheQueryParam: {},
                curRow: {},
                checkDialog: {
                    visible: false,
                    message: ""
                }
            }
        },
        methods: {
            ...pageOperate,
            validateValue(value) {
                return value !== null && value !== undefined
            },
            //获取状态
            getQueryOptions() {
                let status = []
                let types = []
                types.push({
                    "key": "barcodeExceptionEnum",
                    "value": null,
                    "name": "",
                    "text": "全部"
                })
                _this.$request({
                    url: '/wms-pub-server/public/getEnums',
                    context: _this,
                    sendData: [{
                        "key": "barcodeExceptionStatusEnum"
                    }, {
                        "key": "barcodeExceptionEnum"
                    }],
                    successCallback: (_this, response) => {
                        if (response !== null || response !== undefined) {
                            if (response.length > 0) {
                                var enumList = response[0].enumList
                                for (var item of enumList) {
                                    status.push(item)
                                }
                                enumList = response[1].enumList
                                for (var item of enumList) {
                                    types.push(item)
                                }
                            }
                        }
                        if (status.length > 0) {
                            _this.listQueryParam.status = status[0].value
                        }
                    }
                })
                _this.statusOptions = status
                _this.exceptionTypeOptions = types
            },
            //获取货主选项  未完成
            getWarehouseOwner() {
                _this.ownerOptions = [{
                    "ownerId": 1,
                    "ownerName": "货主1"
                }, {
                    "ownerId": 2,
                    "ownerName": "货主2"
                }, {
                    "ownerId": 3,
                    "ownerName": "货主3"
                }]
            },
            //获取供应商选项  未完成
            getSupplier() {
                _this.supplierOptions = [{
                    "supplierId": 1,
                    "supplierName": "供应商1"
                }, {
                    "supplierId": 2,
                    "supplierName": "供应商2"
                }]
            },
            //失去焦点验证
            validateRealBarcode(item, event) {
                if (item === null || item === undefined) {
                    return
                }
                if (!("hasChanged" in item) || !item.hasChanged) {
                    return
                }
                for (let record of _this.tableData) {
                    if (item.id !== record.id && record.realGoodsBarcode === item.realGoodsBarcode) {
                        item.realGoodsBarcode = ""
                        return "当前实物条码已经在当前输入的实物条码信息中存在！"
                    }
                }
                let param = {
                    id: item.id,
                    ownerId: item.ownerId,
                    realGoodsBarcode: item.realGoodsBarcode
                }
                _this.$request({
                    url: "/wms-inbound-server/barcodeexception/validateRealBarcode",
                    sendData: param,
                    context: _this,
                    successCallback: function (ctx, response) {
                        if (response !== null && response !== undefined) {
                            if (response.retCode !== 1) {
                                ctx.$alert(response.retMsg, "错误", {
                                    type: "error"
                                }).then(() => {
                                    item.realGoodsBarcode = ""
                                })
                                item.hasChanged = false
                            }
                        }
                    }
                })
            },
            //实物条码改变
            realBarcodeChange(item) {
                if (item === null || item === undefined) {
                    return
                }
                item.hasChanged = true
            },
            //Enter 失去焦点
            realBarcodeEnter(item, event) {
                event.currentTarget.children[0].blur()
            },
            //query data
            queryData() {
                Object.assign(_this.cacheQueryParam, _this.listQueryParam)
                _this.$request({
                    url: "/wms-inbound-server/barcodeexception/getList",
                    context: _this,
                    sendData: _this.listQueryParam,
                    successCallback: function (ctx, response) {
                        if (response === null || response === undefined) {
                            return
                        }
                        for (let item of response) {
                            item.hasError = false
                        }
                        ctx.tableData = response
                    }
                })
            },
            //处理异常
            process() {
                let data = _this.tableData
                if (!_this.validateValue(data)) {
                    return
                }
                let inboundNotifyNoArray = []
                for (let item of data) {
                    if (item.status !== 100) {
                        _this.$alert("只有创建状态的异常信息才可以处理", "提示", {
                            type: "alter"
                        })
                        return
                    }
                    if (inboundNotifyNoArray.indexOf(item.inboundNotifyNo) < 0) {
                        inboundNotifyNoArray.push(item.inboundNotifyNo)
                    }
                    if (inboundNotifyNoArray.length > 1) {
                        _this.$alert("一次只能处理一个入库通知单的异常信息！", "提示", {
                            type: "alter"
                        })
                        return
                    }
                    //TODO 临时写死 hzf
                    item.updateUser = 33
                    item.updateUserName = "武林盟主"
                }
                _this.cacheQueryParam.inboundNotifyNo = inboundNotifyNoArray[0]
                let params = {}
                params.barcodeExceptionQuery = _this.cacheQueryParam
                params.barcodeExceptionList = _this.tableData
                _this.$request({
                    url: "/wms-inbound-server/barcodeexception/process",
                    context: _this,
                    sendData: params,
                    successCallback: function (ctx, response) {
                        if (ctx.validateValue(response.hasErrorBarcodeExceptionList)) {
                            let errorRecord = response.hasErrorBarcodeExceptionList
                            for (let item of ctx.tableData) {
                                item.hasError = false
                                item.errorMsg = ""
                                for (let record of errorRecord) {
                                    if (record.id === item.id) {
                                        item.hasError = true
                                        item.errorMsg = item.errorMsg
                                        break
                                    }
                                }
                            }
                            return
                        }
                        let msg = ""
                        if (response.generateBarcode) {
                            msg = "当前入库通知单条码异常信息处理成功，有" + response.barcodeCount + "个单位商品需要贴码，请及时进入贴码管理页面进行条码打印。"
                        } else {
                            msg = "当前入库通知单条码异常信息处理成功，无需贴码！"
                        }
                        ctx.$alert(msg, "提示", {
                            type: "alert"
                        }).then(function () {
                            ctx.queryData()
                        })
                    },
                    failCallback: function (ctx, error) {
                        ctx.$alert(error, "提示", {
                            type: "error"
                        })
                    }
                })
            }
        },
        //计算字段  计算开始时间和结束时间
        computed: {
            startTime: {
                get: function () {
                    if (_this.listQueryParam.startCreateTime === null) {
                        return null
                    }
                    return new Date(_this.listQueryParam.startCreateTime)
                },
                set: function (time) {
                    if (time === null || time === undefined) {
                        _this.listQueryParam.startCreateTime = null
                        return
                    }
                    _this.listQueryParam.startCreateTime = time.getTime()
                }
            },
            endTime: {
                get: function () {
                    if (_this.listQueryParam.endCreateTime === null) {
                        return null
                    }
                    return new Date(_this.listQueryParam.endCreateTime)
                },
                set: function (time) {
                    if (time === null || time === undefined) {
                        _this.listQueryParam.endCreateTime = null
                        return
                    }
                    _this.listQueryParam.endCreateTime = time.getTime()
                }
            }
        },
        mounted() {
            this.getQueryOptions()
            this.getWarehouseOwner()
            this.getSupplier()
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .errorBg {
        background-color: red;
    }
</style>

