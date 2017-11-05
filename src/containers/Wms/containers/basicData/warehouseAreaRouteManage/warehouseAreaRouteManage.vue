<template>
    <!--容器管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="getList">刷新</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="add">新增</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="update">修改</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
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
                            <TableColumn prop="warehouseId" label="仓库名称" width="150"></TableColumn>
                            <TableColumn prop="routeCode" label="线路编码" width="150"></TableColumn>
                            <TableColumn prop="routeName" label="线路名称" width="150"></TableColumn>
                            <TableColumn prop="collectAreaName" label="发货集货暂存区" width="150"></TableColumn>
                            <TableColumn prop="sendoutAreaName" label="发货暂存区" width="150"></TableColumn>
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
        <!--新增示例 弹窗  start-->
        <el-dialog title="弹窗示例" class="advancedQuery" :visible.sync="addVisible">
            <new-demo :collectList="collectList" :sendoutList="sendoutList" @cancel="addVisible=false"
                      @saved="addVisible=false"></new-demo>
        </el-dialog>
        <!--新增示例 弹窗  end-->
        <!--修改示例 弹窗  start-->
        <el-dialog title="弹窗示例" class="advancedQuery" :visible.sync="updateVisible">
            <update-demo v-model="routeId" :collectList="collectList" :sendoutList="sendoutList"
                         @cancel="updateVisible=false" @saved="updateVisible=false"></update-demo>
        </el-dialog>
        <!--修改示例 弹窗  end-->
    </div>
</template>

<script type="es6">

    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    // Vue.component(CollapseTransition.name, CollapseTransition)
    import request from '@Wms/services/service'
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    import newDemo from '@Wms/containers/basicData/warehouseAreaRouteManage/new.vue'
    import updateDemo from '@Wms/containers/basicData/warehouseAreaRouteManage/update.vue'

    import utils from '@Wms/utils/utilFns.js'

    let _this
    let api = {
        getlist: '/wms-base-server/warehouseAreaRoute/getListWithPage'
    }

    export default {
        created() {
            _this = this
            _this.api = api
        },
        mounted() {
            _this.getList()
        },
        data() {
            return {
                routeId: '',
                addVisible: false,
                updateVisible: false,
                tableData: [],
                collectList: [],
                sendoutList: [],
                pagination: {
                    total: 0
                },
                listQueryParam: {
                    warehouseId: "2000"
                }
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition,
            'new-demo': newDemo,
            'update-demo': updateDemo
        },
        methods: {
            ...pageOperate,
            getCollectList() {
                var requestData = {
                    "warehouseId": '2000',
                    "warehouseAreaType": '2',
                    "useAttrbute": '14'
                }
                _this.$request({
                    url: '/wms-base-server/warehousearea/getList',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.collectList = response
                    }
                })
            },
            getSendoutList() {
                var requestData = {
                    "warehouseId": '2000',
                    "warehouseAreaType": '2',
                    "useAttrbute": '9'
                }
                _this.$request({
                    url: '/wms-base-server/warehousearea/getList',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.sendoutList = response
                    }
                })
            },
            add() {
                _this.getCollectList()
                _this.getSendoutList()
                _this.addVisible = true
            },
            update() {
                _this.getCollectList()
                _this.getSendoutList()
                _this.addVisible = true
            },
            del() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要删除的容器！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个容器！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                this.$confirm('删除后将不可恢复。您确定删除选中数据吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var requestData = {
                        "id": _this.multipleSelection[0].id,
                        "warehouseId": _this.multipleSelection[0].warehouseId
                    }

                    _this.$request({
                        url: '/wms-base-server/container/delete',
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            _this.$alert('删除成功', '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                            _this.success()
                        },
                        failCallback: (_this, e) => {
                            console.error('delete:', e)
                            _this.$alert(e, e, {
                                type: 'warning',
                                closeOnClickModal: true
                            })
                        }
                    })
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                })
            },
            success() {
                _this.getList()
                _this.addVisible = false
            }

        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>

