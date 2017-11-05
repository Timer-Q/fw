<template>
    <div class="wms-items">
        <div v-loading.body="loading">
            <!--标签功能操作栏  start-->
            <div class="wms-modal-div clearfix">
                <div>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="printSelection">打印发货清单</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="printAll">全部打印</a>
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
                                    <span class="hspace">系统订单号</span>
                                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">外部订单号</span>
                                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">订单编号</span>
                                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                                </div>
                                <div class="inblock">
                                    <span class="hspace">货主</span>
                                    <el-select v-model="model.ownerId" placeholder="全部">
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
                                <TableColumn prop="statusDesc" label="订单状态" width="90"></TableColumn>
                                <TableColumn prop="warehouseName" label="仓库" width=""></TableColumn>
                                <TableColumn prop="orderNo" label="系统订单号" width=""></TableColumn>
                                <TableColumn prop="externalOrderNo" label="订单编号" width=""></TableColumn>
                                <TableColumn prop="platformOrderNo" label="外部订单编号" width=""></TableColumn>
                                <TableColumn prop="shippingOrderPrintStatusDesc" label="打印状态"
                                                 width="120"></TableColumn>
                                <TableColumn prop="ownerName" label="货主" width=""></TableColumn>
                                <TableColumn prop="waveNo" label="波次号" width="120"></TableColumn>
                                <TableColumn prop="sourceTypeDesc" label="来源类型" width=""></TableColumn>
                                <TableColumn prop="expectReceiveTime" :formatter="dateFormat" label="期望收货时间"
                                                 width=""></TableColumn>
                                <TableColumn prop="distributionModeDesc" label="配送方式" width=""></TableColumn>
                                <TableColumn prop="deliveryCompanyName" label="承运商" width=""></TableColumn>


                                <TableColumn prop="carInfo" label="车辆信息" width=""></TableColumn>
                                <TableColumn prop="driver" label="司机" width=""></TableColumn>
                                <TableColumn prop="recever" label="收货方" width=""></TableColumn>
                                <TableColumn prop="recever" label="收货区域" width=""></TableColumn>

                                <TableColumn prop="routeDesc" label="线路" width=""></TableColumn>

                                <TableColumn prop="customerLevelDesc" label="客户级别" width=""></TableColumn>

                                <TableColumn prop="recever" label="收货人" width=""></TableColumn>
                                <TableColumn prop="receverTel" label="收货人电话" width=""></TableColumn>
                                <TableColumn prop="receverTel" label="是否加急" width=""></TableColumn>
                                <TableColumn prop="receverTel" label="结算方式" width=""></TableColumn>
                                <TableColumn prop="receverTel" label="代收金额" width=""></TableColumn>
                                <TableColumn prop="receverTel" label="支付币种" width=""></TableColumn>
                                <TableColumn prop="expectReceiveTime" :formatter="dateFormat" label="接收时间"
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
    if (Date.prototype.Format === undefined) {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
                    k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            return fmt
        }
    }


    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/orderManagement/wave/collectService'

    let _this
    let api = {
        getlist: '/wms-outbound-server/orderwave/getListWithPage'
    }
    export default {
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
                    ownerId: ''
                },
                api: {},
                tableData: [],
                multipleSelection: [],
                pagination: {
                    total: 0
                },
                timeRange: [],
                executedCount: 0
            }
        },
        methods: {
            ...pageOperate,
            dateFormat: function (row, column) {
                var date = row[column.property]
                if (date == undefined) {
                    return ""
                }
                return new Date(date).Format("yyyy-MM-dd hh:mm:ss")
            },
            printSelection() {
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
                    return w.shippingOrderPrintStatus == 2
                })
                if (wavePrinted !== undefined && wavePrinted !== null && wavePrinted.length > 0) {
                    _this.$alert('系统订单号' + wavePrinted[0].orderNo + '发货清单已打印，不能再次打印！', '', {
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
                        orderWaveId: _this.multipleSelection[i].orderWaveId,
                        id: _this.multipleSelection[i].id,
                        warehouseId: _this.multipleSelection[i].warehouseId,
                        shippingOrderPrintUser: "666",
                        shippingOrderPrintUserName: "东"
                    }
                    let scallback = function (_this, response) {
                        _this.executedCount = _this.executedCount + 1
                        // TODO:  调用打印SDK执行打印动作
                        let printRequest = {
                            "printerName": "用户指定打印机",
                            "app": "wms",
                            "fullName": "/出库模块/销售订单/发货清单",
                            "belong1": "1",
                            "belong2": "1",
                            "belong3": "1",
                            "documents": [
                                {
                                    "documentId": this.orderNo,
                                    "parameters": {
                                        "sendList": this.id
                                    },
                                    "copies": 1
                                }
                            ]
                        }
                        _this.$notify({
                            title: '成功',
                            message: '假装订单' + this.orderNo + '打印成功！',
                            type: 'success'
                        })
                        _this.getList()
                    }.bind(_this.multipleSelection[i])
                    let fcallback = function (_this, error) {
                        _this.$notify.error({
                            title: '错误',
                            message: '订单' + this.orderNo + '更新打印信息失败，无法执行打印！'
                        })
                    }.bind(_this.multipleSelection[i])
                    _this.$request({
                        url: '/wms-outbound-server/orderwave/print',
                        context: _this,
                        sendData: requestData,
                        successCallback: scallback,
                        failCallback: fcallback
                    })
                }
            },
            printAll() {
                _this.$alert('别急，慢慢来！', '', {
                    type: 'warning',
                    closeOnClickModal: true,
                    showConfirmButton: false,
                    showCancelButton: false
                })
            }
        }
    }

</script>
