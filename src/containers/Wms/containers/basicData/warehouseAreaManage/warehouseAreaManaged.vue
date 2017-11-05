<template>
    <!--库区管理-->
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

                <el-button>导入</el-button>
                <i>|</i>
                <el-button>下载模板</el-button>
                <i>|</i>
                <el-button>导出</el-button>

                <el-button>日志</el-button>

                <el-button type="button" @click="getList">查询</el-button>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">

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
                                <TableColumn type="selection" width="55"></TableColumn>
                                <TableColumn prop="statusDesc" label="状态" width="80"></TableColumn>
                                <TableColumn prop="warehouseName" label="所属仓库" width="150"></TableColumn>
                                <TableColumn prop="warehouseAreaCode" label="库区编码" width="150"></TableColumn>
                                <TableColumn prop="warehouseAreaName" label="库区名称" width="150"></TableColumn>
                                <TableColumn prop="warehouseAreaTypeDesc" label="库区类型" width="150"></TableColumn>
                                <TableColumn prop="useAttrbuteDesc" label="用途属性" width="150"></TableColumn>
                                <TableColumn prop="goodsAttrbuteDesc" label="货物属性" width="150"></TableColumn>
                                <TableColumn prop="refundDesc" label="退货属性" width="150"></TableColumn>
                                <TableColumn prop="replenishmentDesc" label="补货属性" width="150"></TableColumn>
                                <TableColumn prop="goodsClassDesc" label="商品品类" width="150"></TableColumn>
                                <TableColumn prop="circulationDesc" label="存储属性" width="150"></TableColumn>
                                <TableColumn prop="onepositionOneclassDesc" label="一位一品属性" width="150"></TableColumn>
                                <TableColumn prop="onepositionOneownerDesc" label="一位一货主" width="150"></TableColumn>
                                <TableColumn prop="temperatureControlDesc" label="温控属性" width="150"></TableColumn>
                                <TableColumn prop="storeSpecDesc" label="存储规格" width="150"></TableColumn>
                                <TableColumn prop="goodsAbcDesc" label="商品ABC分类" width="150"></TableColumn>
                                <TableColumn prop="floor" label="隶属楼层" width="150"></TableColumn>
                                <TableColumn prop="warehouseAreaNo" label="库区序号" width="150"></TableColumn>
                                <TableColumn prop="stopIn" label="停止移入" width="150"></TableColumn>
                                <TableColumn prop="stopOut" label="停止移出" width="150"></TableColumn>
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
        <el-dialog title="新增库区" class="advancedQuery" :visible.sync="addVisible">
            <!--传递userId，注册cancel和saved事件-->
            <add-dialog @cancel="addVisible=false" @saved="success"></add-dialog>
        </el-dialog>
        <!--新增示例 弹窗  end-->

        <el-dialog title="修改库区" class="advancedQuery" :visible.sync="updateVisible">
            <!--传递userId，注册cancel和saved事件-->
            <update-dialog v-model="warehouseAreaId" @cancel="updateVisible=false"
                           @saved="success"></update-dialog>
        </el-dialog>
    </div>
</template>

<script type="es6">

    import moment from 'moment'
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import addDialog from '@Wms/containers/basicData/warehouseAreaManage/add.vue'
    import updateDialog from '@Wms/containers/basicData/warehouseAreaManage/update.vue'

    import service from '@Wms/services/basicData/warehouseAreaManage/warehouseAreaManageService'

    let _this
    let api = {
        getList: '/wms-base-server/warehousearea/getListWithPage',
        del: '/wms-base-server/warehousearea/delete',
        startUsing: '/wms-base-server/warehousearea/startUsing',
        blockUp: '/wms-base-server/warehousearea/blockUp'
    }

    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                listQueryParam: {
                    warehouseId: "2000"
                },
                api: {},
                tableData: [],
                pagination: {
                    total: 0
                },
                curRow: {},
                multipleSelection: [],// 当前选择的数据项目
                addVisible: false,
                updateVisible: false,
                warehouseAreaId: ''
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
                if (_this.multipleSelection.length < 1) {
                    return
                }
                if (_this.multipleSelection[0].status !== 100) {
                    return
                }
                var requestData = {
                    "warehouseId": "2000",
                    "id": []
                }
                requestData.id = _this.multipleSelection[0].id

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
                if (_this.multipleSelection.length < 1) {
                    return
                }
                if (_this.multipleSelection[0].status !== 100) {
                    return
                }
                _this.warehouseAreaId = _this.multipleSelection[0].id
                _this.updateVisible = true
            },
            startUsing() {
                var requestData = {
                    "warehouseId": "2000",
                    "idList": []
                }
                for (var i = 0; i < _this.multipleSelection.length; i++) {
                    if (_this.multipleSelection[i].status !== 200) {
                        requestData.idList.push(_this.multipleSelection[i].id)
                    }
                }

                if (requestData.idList.length === 0) {
                    return
                }
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
                var requestData = {
                    "warehouseId": "2000",
                    "idList": []
                }
                for (var i = 0; i < _this.multipleSelection.length; i++) {
                    if (_this.multipleSelection[i].status !== 300) {
                        requestData.idList.push(_this.multipleSelection[i].id)
                    }
                }

                if (requestData.idList.length === 0) {
                    return
                }
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

