<template>
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <!--<a href="javascript:;" @click="collectSelection">选择汇总</a>-->
                    <el-button @click="collectSelection">选择汇总</el-button>
                </div>
                <p class="btnGroup">
                    <a href="javascript:;" @click="collectAll">全部汇总</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" @click="getList">刷新</a>
                </p>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main" ref="main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <!--表单头部    start-->
                    <div class="vehicle-find">
                        <div class="vehicle-data">
                            <div class="inblock">
                                <span class="hspace">系统订单号</span>
                                <el-input type="text" v-model="listQueryParam.orderNo" class="license-number"
                                          placeholder="请输入/扫描"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">外部订单编号</span>
                                <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">订单编号</span>
                                <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-input type="text" class="license-number" placeholder="请选择"></el-input>
                            </div>
                        </div>
                        <div class="vehicle-btn">
                            <el-button type="button" class="search-btn">查询</el-button>
                            <a href="javascript:;">清空</a>
                            <el-button :icon="more?'arrow-up':'arrow-down'" @click="more=!more"></el-button>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div v-show="more">
                            <div class="vehicle-find">
                                <div class="vehicle-data">
                                    <div class="inblock">
                                        <span class="hspace">订单状态</span>
                                        <el-select v-model="model.status" placeholder="全部">
                                            <el-option v-for="item in model.statusList" :key="item.value"
                                                       :label="item.text" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <p class="inblock">
                                        <span class="hspace">外部订单编号</span>
                                        <input type="text" class="license-number" placeholder="请输入/扫描">
                                    </p>
                                    <p class="inblock">
                                        <span class="hspace">订单编号</span>
                                        <input type="text" class="license-number" placeholder="请输入/扫描">
                                    </p>
                                    <p class="inblock">
                                        <span class="hspace">最大订单数</span>
                                        <input type="text" class="license-number" v-model="orderCount"
                                               placeholder="请输入">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                    <!--表单头部    end-->

                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable" ref="pastCodeTable" :data="tableData"
                               @selection-change="handleSelectionChange" highlight-current-row
                               border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                            <TableColumn type="index" label="序号" width="60" show-overflow-tooltip></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="订单状态" width="90" show-overflow-tooltip></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库" width="" show-overflow-tooltip></TableColumn>
                            <TableColumn prop="orderNo" label="系统订单号" width="" show-overflow-tooltip></TableColumn>
                            <TableColumn prop="externalOrderNo" label="订单编号" width=""
                                         show-overflow-tooltip></TableColumn>
                            <TableColumn prop="platformOrderNo" label="外部订单编号" width=""
                                         show-overflow-tooltip></TableColumn>
                            <TableColumn prop="ownerName" label="货主" width="" show-overflow-tooltip></TableColumn>
                            <TableColumn prop="sourceTypeDesc" label="来源类型" width=""
                                         show-overflow-tooltip></TableColumn>
                            <TableColumn prop="expectReceiveTime" :formatter="dateFormat" label="期望收货时间"
                                         width="" show-overflow-tooltip></TableColumn>
                            <TableColumn prop="estimatedDeliveryTime" :formatter="dateFormat" label="预计发货时间"
                                         width="" show-overflow-tooltip></TableColumn>
                            <TableColumn prop="distributionModeDesc" label="配送方式" width=""
                                         show-overflow-tooltip></TableColumn>
                            <TableColumn prop="deliveryCompanyName" label="承运商" width=""
                                         show-overflow-tooltip></TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->
                    <!--分页    start-->
                    <pagination :pagination='pagination' @pagechange='getList'></pagination>
                    <!--分页    end-->

                </div>
            </div>
        </div>
        <!--主体内容  end-->


        <!--弹窗 start-->

        <el-dialog title="创建波次提醒" :visible.sync="dialogVisible" size="tiny">
            <span>汇总成功！</span>
            <br/>
            <span>本次共创建{{waveCount}}个订单波次！</span>
            <br/>
            <span>快速查看波次管理，请点击</span>
            <a style="color:blue;" @click="goManager">波次管理</a>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>

        <!--弹窗 end-->

    </div>
</template>
<script type="es6">


    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    // Vue.component(CollapseTransition.name, CollapseTransition)

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    import service from '@Wms/services/orderManagement/wave/collectService'

    let _this
    let api = {
        getList: '/wms-outbound-server/orderwaitconvergepool/getListWithPage'
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                listQueryParam: {
                    warehouseId: "400000022",
                    orderNo: ''
                },
                model: {
                    statusList: [],
                    status: 0
                },
                api: {},
                tableData: [],
                more: false,
                orderCount: 200,
                multipleSelection: [],
                pagination: {
                    total: 0
                },
                curRow: {},
                dialogVisible: false,
                waveCount: 0
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition
        },
        methods: {
            ...pageOperate,
            collectSelection() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作订单！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                } else {
                    var requestData = {
                        "currentUser": "666",
                        "currentUserName": "我",
                        "orderIdList": []
                    }
                    for (var i = 0; i < _this.multipleSelection.length; i++) {
                        requestData.orderIdList.push(_this.multipleSelection[i].id)
                    }
                    _this.$request({
                        url: '/wms-outbound-server/wave/waveConverge',
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            if (response == undefined || response == null || response.length < 1) {
                                _this.$alert('没有可汇总订单！', '', {
                                    type: 'warning',
                                    closeOnClickModal: true,
                                    showConfirmButton: false,
                                    showCancelButton: false
                                })
                            } else {
                                _this.waveCount = response.length
                                // TODO:  dialog-footer样式导致内容不显示的问题
                                _this.dialogVisible = true
                                _this.getList()
                            }
                        }
                    })
                }
            },
            collectAll() {
                var requestData = {
                    "currentUser": "666",
                    "currentUserName": "我",
                    "maxOrderCount": _this.orderCount
                }
                _this.$request({
                    url: '/wms-outbound-server/wave/waveConvergeForAll',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        if (response == undefined || response == null || response.length < 1) {
                            _this.$alert('没有可汇总订单！', '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        } else {
                            _this.waveCount = response.length
                            // TODO:  dialog-footer样式导致内容不显示的问题
                            _this.dialogVisible = true
                            _this.getList()
                        }
                    },
                    failCallback: (_this, error) => {
                        _this.$alert(error, '', {
                            type: 'error',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                    }
                })
            },
            goManager() {
                _this.dialogVisible = false
                console.log("go不go都一样")
            }
        },
        mounted() {
            _this.$request({
                url: '/wms-pub-server/public/getEnums',
                context: _this,
                sendData: [{
                    key: 'orderStatus',
                    nameList: ['STATUS_CREATE', 'STATUS_ALLOTTED']
                }],
                successCallback: (_this, response) => {
                    _this.model.statusList = response[0].enumList
                    _this.model.statusList.reverse()
                    _this.model.statusList.push({
                        value: 0,
                        text: '全部'
                    })
                    _this.model.statusList.reverse()
                }
            })
            _this.getList()
        }
    }

</script>
