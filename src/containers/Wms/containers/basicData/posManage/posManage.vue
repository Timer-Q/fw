<template>
    <!--容器管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="javascript:;" @click="addPos">新增</a>
                    <i>|</i>
                    <a href="javascript:;" @click="deletePos">删除</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" @click="enablePos">启用</a>
                    <i>|</i>
                    <a href="javascript:;" @click="disablePos">停用</a>
                </p>

                <!--<p class="btnGroup">
                    <a href="###">修改</a>
                    <i>|</i>
                    <a href="###">解除绑定</a>
                </p>-->

                <p class="btnGroup">
                    <a href="javascript:;">导入</a>
                    <i>|</i>
                    <a href="javascript:;">下载模板</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">日志</a>
                </p>
                <div class="btnGroup">
                    <el-button @click="refresh">刷新</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">
                        <div class="query-btn el-dropdown-link">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                  查询方案<i class="iconfont icon-fangan"></i>
                                </span>
                                <!--查询方案弹出层开始-->
                                <el-dropdown-menu class="wms-el-dropdown-menu" slot="dropdown">
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
                                    <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                                </el-dropdown-menu>
                                <!--查询方案弹出层结束-->
                            </el-dropdown>
                        </div>
                        <div class="vehicle-data">
                            <div class="inblock">
                                <span class="hspace">POS台编码</span>
                                <el-input v-model="listQueryParam.posCode"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">POS台名称</span>
                                <el-input v-model="listQueryParam.posName"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">POS台类型</span>
                                <el-select v-model="listQueryParam.posType" placeholder="POS台类型">
                                    <el-option value="null" :key="null" label="请选择" class="selectFontSize"
                                               onselect="true">
                                    </el-option>
                                    <el-option
                                        v-for="item in posTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
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
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态" width="80"></TableColumn>
                            <TableColumn prop="warehouseName" label="所属仓库" width=""></TableColumn>
                            <TableColumn prop="posCode" label="POS台编码" width="150"></TableColumn>
                            <TableColumn prop="posName" label="POS台名称" width="150"></TableColumn>
                            <TableColumn prop="posTypeDesc" label="类型" width=""></TableColumn>
                            <TableColumn prop="bindingMacDesc" label="是否绑定Mac" width=""></TableColumn>
                            <TableColumn prop="macAddress" label="Mac地址" width=""></TableColumn>
                            <TableColumn prop="remark" label="备注" width=""></TableColumn>
                            <TableColumn prop="createTime" label="创建时间" :formatter="dateFormat" width=""></TableColumn>
                            <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                            <TableColumn prop="updateTime" label="最后修改时间" :formatter="dateFormat"
                                         width=""></TableColumn>
                        </Table>
                    </div>
                    <!--主表单  end-->
                    <!--表单  end-->
                    <!--分页    start-->
                    <pagination :pagination='pagination' @pagechange='getList'></pagination>
                    <!--分页    end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->

        <!--新增示例 弹窗  start-->
        <el-dialog title="新增POS台" class="advancedQuery" :visible.sync="addVisible">
            <!--传递userId，注册cancel和saved事件-->
            <new-pos @cancel="addVisible=false" @saved="addVisible=false"></new-pos>
        </el-dialog>
        <!--新增示例 弹窗  end-->
    </div>
</template>

<script type="es6">
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/basicData/posManage/posManageService'

    import newPOS from '@Wms/containers/basicData/posManage/newPos.vue'


    let _this = null
    let api = {
        getlist: '/wms-base-server/pos/getListWithPage',//主列表信息
        delete: '/wms-base-server/pos/delete',//删除
        blockUp: '/wms-base-server/pos/blockUp',//批量停用
        startUsing: '/wms-base-server/pos/startUsing',//批量启用
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                addVisible: false,
                listQueryParam: {
                    warehouseId: "2000",
                    posCode: null,
                    posName: null,
                    posType: null
                },
                model: {
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
                curRow: {},
                dialogVisible: false,
                waveCount: 0,
                posTypes: [
                    {
                        value: 1,
                        label: "销售出库"
                    },
                    {
                        value: 2,
                        label: "收货入库"
                    },
                    {
                        value: 3,
                        label: "销退入库"
                    },
                    {
                        value: 4,
                        label: "退供出库"
                    }
                ]
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition,
            'new-pos': newPOS
        },
        methods: {
            ...pageOperate,
            collectSelection() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作POS台！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                }
            },
            addPos() {
                _this.addVisible = true
            },
            deletePos() {
                if (_this.checkmultipleSelection(1)) {
                    let requestData = {
                        "id": _this.multipleSelection[0].id,
                        "warehouseId": _this.multipleSelection[0].warehouseId,
                        "updateUser": 1212
                    }
                    _this.$request({
                        url: _this.api.delete,
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            _this.$alert('操作成功', '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: true,
                                showCancelButton: true
                            })
                            _this.success()
                        }
                    })
                }
            }, enablePos() {
                if (_this.checkmultipleSelection(0)) {
                    let requestData = {
                        "idList": [],
                        "warehouseId": _this.multipleSelection[0].warehouseId,
                        "updateUser": 1212
                    }
                    _this.multipleSelection.forEach(sel => {
                        requestData.idList.push(sel.id)
                    })

                    _this.$request({
                        url: _this.api.startUsing,
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            _this.$alert('操作成功', '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: true,
                                showCancelButton: true
                            })
                            _this.success()
                        }
                    })
                }
            },
            disablePos() {
                if (_this.checkmultipleSelection(2)) {
                    let requestData = {
                        "idList": [],
                        "warehouseId": _this.multipleSelection[0].warehouseId,
                        "updateUser": 1212
                    }
                    _this.multipleSelection.forEach(sel => {
                        requestData.idList.push(sel.id)
                    })
                    _this.$request({
                        url: _this.api.blockUp,
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            _this.$alert('操作成功', '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: true,
                                showCancelButton: true
                            })
                            _this.success()
                        }
                    })
                }
            },
            checkmultipleSelection(modifyType){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择一个POS台！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: true,
                    })
                    return false
                }

                if (modifyType === 1) { //删除
                    if (_this.multipleSelection.length > 1) {
                        _this.$alert('删除操作只能选择一个POS台！', '', {
                            type: 'warning',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                        })
                        return false
                    }

                    if (_this.multipleSelection[0].status != 100) {
                        _this.$alert('只能删除状态为存盘的POS台！', '', {
                            type: 'warning',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                        })
                        return false
                    }
                } else if (modifyType === 2) {
                    let temp = 0
                    _this.multipleSelection.forEach(sel => {
                        if (sel.status != 200) {//停用
                            _this.$alert('只能停用状态为启用的POS台！', '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: true,
                            })
                            temp = 1
                        }
                    })

                    if (temp === 1) {
                        return false
                    }
                } else if (modifyType === 0) {
                    let temp = 0
                    _this.multipleSelection.forEach(sel => {
                        if (sel.status === 200) {//启用
                            _this.$alert('以启用不需要再次启用！', '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: true,
                            })
                            temp = 1
                        }
                    })

                    if (temp === 1) {
                        return false
                    }
                }
                return true
            },
            success(){
                _this.getList()
                _this.addVisible = false
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>

