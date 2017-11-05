<template>
    <!--仓库管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <el-button @click="add">新增</el-button>
                <i>|</i>
                <el-button @click="update">修改</el-button>
                <i>|</i>
                <el-button @click="del">删除</el-button>

                <el-button @click="startUsing">启用</el-button>
                <i>|</i>
                <el-button @click="blockUp">停用</el-button>

                <el-button>日志</el-button>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">
                        <div class="vehicle-data">
                            <div class="inblock">
                                <span class="hspace">仓库名称</span>
                                <el-input v-model="listQueryParam.warehouseName"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">仓库编码</span>
                                <el-input v-model="listQueryParam.warehouseCode"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">物流园区</span>
                                <el-input v-model="listQueryParam.wmsZone"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">
                                    仓库属性<i class=""></i>
                                </span>
                                <el-select v-model="listQueryParam.warehouseProperty" placeholder="全部">
                                    <el-option key="warehouseProperty_0" label="全部" value="0">
                                    </el-option>
                                    <el-option key="warehouseProperty_1" label="自有" value="1">
                                    </el-option>
                                    <el-option key="warehouseProperty_2" label="加盟" value="2">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">仓库性质</span>
                                <el-select v-model="listQueryParam.warehouseNature" placeholder="全部">
                                    <el-option key="warehouseNature_0" label="全部" value="0">
                                    </el-option>
                                    <el-option key="warehouseNature_1" label="自有" value="1">
                                    </el-option>
                                    <el-option key="warehouseNature_2" label="租赁" value="2">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="vehicle-btn">
                                <el-button type="button" @click="getList">查询</el-button>
                            </div>
                        </div>
                        <!--主表单  start-->
                        <div class="information-list">
                            <Table id="pastCodeTable"
                                   :data="tableData"
                                   ref="pastCodeTable"
                                   @row-click="rowClick"
                                   @selection-change="handleSelectionChange"
                                   highlight-current-row border
                                   style="width: 100%"
                                   :default-sort="{prop: 'date', order: 'descending'}"
                            >
                                <TableColumn type="index" label="序号" width="70"></TableColumn>
                                <TableColumn prop="statusDesc" label="状态" width="80"></TableColumn>
                                <TableColumn prop="warehouseCode" label="仓库编码" width="150"></TableColumn>
                                <TableColumn prop="warehouseName" label="仓库名称" width="150"></TableColumn>
                                <TableColumn prop="wmsZone" label="物流园区" width="150"></TableColumn>
                                <TableColumn prop="warehouseCompanyName" label="仓储服务商" width="150"></TableColumn>
                                <TableColumn prop="storehouseCount" label="库房数量" width="150"></TableColumn>
                                <TableColumn prop="warehousePropertyDesc" label="仓库属性" width="150"></TableColumn>
                                <TableColumn prop="warehouseNatureDesc" label="仓库性质" width="150"></TableColumn>
                                <TableColumn prop="warehouseCubage" label="仓库面积" width="150"></TableColumn>
                                <TableColumn prop="customerAddress.countyName" label="国家" width="150"></TableColumn>
                                <TableColumn prop="customerAddress.provinceName" label="省份" width="150"></TableColumn>
                                <TableColumn prop="customerAddress.cityName" label="城市" width="150"></TableColumn>
                                <TableColumn prop="customerAddress.countryName" label="县区" width="150"></TableColumn>
                                <TableColumn prop="customerAddress.streetName" label="街道" width="150"></TableColumn>
                                <TableColumn prop="address" label="详细地址" width="150"></TableColumn>
                                <TableColumn prop="contactName" label="仓库联系人" width="150"></TableColumn>
                                <TableColumn prop="contactPhoneNo" label="联系人电话" width="150"></TableColumn>
                                <TableColumn prop="contactEmail" label="联系人邮箱" width="150"></TableColumn>
                                <TableColumn prop="remark" label="备注" width="150"></TableColumn>
                                <TableColumn prop="createTime" label="创建时间" :formatter="datetimeFormat"
                                             width="150"></TableColumn>
                                <TableColumn prop="createUser" label="创建人" width="150"></TableColumn>
                                <TableColumn prop="updateTime" label="修改时间" :formatter="datetimeFormat"
                                             width="150"></TableColumn>
                                <TableColumn prop="updateUser" label="修改人" width="150"></TableColumn>
                            </Table>
                        </div>
                        <!--主表单  end-->
                        <!--分页    start-->
                        <pagination :pagination='pagination' @pagechange='getList'></pagination>
                        <!--分页    end-->
                    </div>
                </div>
            </div>
            <!--主体内容  end-->
        </div>
        <!--新增示例 弹窗  start-->
        <el-dialog title="新增仓库" class="advancedQuery" :visible.sync="addVisible">
            <!--传递userId，注册cancel和saved事件-->
            <add-dialog @cancel="addVisible=false" @saved="success"></add-dialog>
        </el-dialog>
        <!--新增示例 弹窗  end-->

        <el-dialog title="修改仓库" class="advancedQuery" :visible.sync="updateVisible">
            <!--传递userId，注册cancel和saved事件-->
            <update-dialog v-model="curRow.id" @cancel="updateVisible=false"
                           @saved="success"></update-dialog>
        </el-dialog>
    </div>
</template>

<script type="es6">

    import moment from 'moment'
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import addDialog from '@Wms/containers/basicData/warehouseManage/add.vue'
    import updateDialog from '@Wms/containers/basicData/warehouseManage/update.vue'

    import service from '@Wms/services/basicData/warehouseManage/warehouseManageService'

    let _this
    let api = {
        getList: '/wms-base-server/warehouse/getListWithPage',
        del: '/wms-base-server/warehouse/delete',
        startUsing: '/wms-base-server/warehouse/startUsing',
        blockUp: '/wms-base-server/warehouse/blockUp'
    }

    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                listQueryParam: {
                    warehouseName: "",
                    warehouseCode: "",
                    wmsZone: "",
                    warehouseProperty: "",
                    warehouseNature: ""
                },
                api: {},
                tableData: [],
                pagination: {
                    total: 0
                },
                curRow: {},
                addVisible: false,
                updateVisible: false,
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition,
            'add-dialog': addDialog,
            'update-dialog': updateDialog
        },
        mounted() {
            _this.getList()
        },
        methods: {
            ...pageOperate,
            add() {
                _this.addVisible = true
            },
            success() {
                _this.addVisible = false
                _this.addVisible = false
                _this.getList()
            },
            del() {
                if (_this.curRow.status !== 100) {
                    return
                }
                let requestData = {
                    "id": _this.curRow.id
                }
                _this.$request({
                    url: _this.api.del,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '操作成功！！！', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                            showCancelButton: true
                        })
                        _this.success()
                    },
                    failCallback: (_this, e) => {
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            },
            update() {
                if (_this.curRow.status === 300) {
                    return
                }
                _this.updateVisible = true
            },
            startUsing() {
                if (_this.curRow.status === 200) {
                    return
                }
                var requestData = {
                    "idList": []
                }
                requestData.idList.push(_this.curRow.id)
                _this.$request({
                    url: _this.api.startUsing,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        if (response === undefined || response === null || response.length < 1) {
                            _this.$alert('启用成功！', '', {
                                type: 'info',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                            _this.success()
                        } else {
                            var responseMsgDtoList = response
                            var responseMsgDto = ''
                            for (var i = 0; i < responseMsgDtoList.length; i++) {
                                responseMsgDto += responseMsgDtoList[i].retMsg
                            }
                            _this.$alert(responseMsgDto, '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }
                    },
                    failCallback: (_this, e) => {
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            },
            blockUp() {
                if (_this.curRow.status === 300) {
                    return
                }
                var requestData = {
                    "idList": []
                }
                requestData.idList.push(_this.curRow.id)
                _this.$request({
                    url: _this.api.blockUp,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        if (response === undefined || response === null || response.length < 1) {
                            _this.$alert('停用成功！', '', {
                                type: 'info',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                            _this.success()
                        } else {
                            var responseMsgDtoList = response
                            var responseMsgDto = ''
                            for (var i = 0; i < responseMsgDtoList.length; i++) {
                                responseMsgDto += responseMsgDtoList[i].retMsg
                            }
                            _this.$alert(responseMsgDto, '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }
                    },
                    failCallback: (_this, e) => {
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>

