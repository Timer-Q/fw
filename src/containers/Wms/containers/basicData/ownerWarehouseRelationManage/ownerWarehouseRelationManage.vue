<template>
    <!--容器管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="">货主库区配置</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">供应商货位配置</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">启用</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">停用</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">删除</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">导入</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">下载模板</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">刷新</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="">日志</el-button>
                </div>
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
                                <span class="hspace">状态</span>
                                <el-select v-model="listQueryParam.status" placeholder="全部">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">是否自用</span>
                                <el-select v-model="listQueryParam.isPersonalOptions" placeholder="全部">
                                    <el-option
                                        v-for="item in isPersonalOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-select v-model="listQueryParam.status" placeholder="请输入/选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">供应商</span>
                                <el-select v-model="listQueryParam.status" placeholder="请输入/选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">清空</a>
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
                               :default-sort = "{prop: 'date', order: 'descending'}"
                        >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                            <TabAleColumn prop="warehouseId" label="仓库"  width="150"></TabAleColumn>
                            <TableColumn prop="ownerId" label="货主"  width="150"></TableColumn>
                            <TableColumn prop="warehosueCompanyName" label="供应商"  width="150"></TableColumn>
                            <TableColumn prop="warehouseAreaCode" label="库区编号"  width="150"></TableColumn>
                            <TableColumn prop="warehouseAreaName" label="库区名称"  width="150"></TableColumn>
                            <TableColumn prop="goodsAttribute" label="货物属性"  width="150"></TableColumn>
                            <TableColumn prop="warehouseAreaCirculation" label="流转属性"  width="150"></TableColumn>
                            <TableColumn prop="warehouseAreaUseAtribute" label="用途属性"  width="150"></TableColumn>
                            <TableColumn prop="localtionCode" label="货位编号"  width="150"></TableColumn>
                            <TableColumn prop="isPersonal" label="是否自用"  width="150"></TableColumn>
                            <TableColumn prop="createUser" label="创建人"  width="150"></TableColumn>
                            <TableColumn prop="createTime" label="创建时间"  width="150"></TableColumn>
                            <TableColumn prop="updateUser" label="修改人"  width="150"></TableColumn>
                            <TableColumn prop="updateTime" label="修改时间"  width="150"></TableColumn>
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
            <!--loaderTeamId，注册cancel和saved事件-->
            <new-demo @cancel="addVisible=false" @saved="addVisible=false"></new-demo>
        </el-dialog>
        <!--新增示例 弹窗  end-->
        <!--&lt;!&ndash;修改示例 弹窗  start&ndash;&gt;-->
        <!--<el-dialog title="弹窗示例" class="advancedQuery" :visible.sync="updateVisible">-->
            <!--&lt;!&ndash;loaderTeamId，注册cancel和saved事件&ndash;&gt;-->
            <!--<update-demo v-model="containerTypeId" @cancel="updateVisible=false" @saved="updateVisible=false"></update-demo>-->
        <!--</el-dialog>-->
        <!--&lt;!&ndash;新增示例 弹窗  end&ndash;&gt;-->
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

    import newDemo from '@Wms/containers/basicData/containerTypeManage/new.vue'
    //import updateDemo from '@Wms/containers/basicData/containerTypeManage/update.vue'

    import utils from '@Wms/utils/utilFns.js'

    let _this
    let api = {
        getlist: '/wms-base-server/ownerWarehousereRation/getListWithPage'
    }

    export default {
        created() {
            _this = this
            _this.api = api
        },
        mounted() {
            _this.getList()
        },
        data () {
            return {
                addVisible: false,
                updateVisible: false,
                multipleSelection: [],
                tableData:[],
                pagination:{
                    total: 0
                },
                containerTypeId:'',
                listQueryParam:{
                    status:'',
                    isPersonal:'',
                    ownerId:''
                },
                statusOptions:[{
                    value:'',
                    label:'全部'
                },{
                    value:'100',
                    label:'存盘'
                },{
                    value:'200',
                    label:'启用'
                },{
                    value:'300',
                    label:'停用'
                }],
                isPersonalOptions:[{
                    value:'',
                    label:'全部'
                },{
                    value:'1',
                    label:'否'
                },{
                    value:'2',
                    label:'是'
                }]
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition,
            'new-demo': newDemo
            //'update-demo':updateDemo
        },
        methods:{
            ...pageOperate,
            add() {
                _this.addVisible = true
            },
            update() {
                if(_this.multipleSelection.length<1){
                    _this.$alert('请选择要修改的容器类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if(_this.multipleSelection.length>1){
                    _this.$alert('只能修改一个容器类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                _this.containerTypeId = _this.multipleSelection[0].id
                _this.updateVisible = true
            },
            del(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要删除的容器类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                if (_this.multipleSelection.length>1){
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
                        url: '/wms-base-server/containerType/delete',
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
                        failCallback:(_this,e)=>{
                            console.error('删除失败:',e)
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
            startUsing(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要启用的容器！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }

                let idList=utils.getFieldArrFormObjectArr( _this.multipleSelection,'id')

                var requestData = {
                    "warehouseId": _this.multipleSelection[0].warehouseId,
                    "idList":idList
                }

                _this.$request({
                    url: '/wms-base-server/containerType/startUsing',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response,'操作情况', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        _this.success()
                    }
                })
            },
            blockUp(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要停用的容器！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                let idList=utils.getFieldArrFormObjectArr( _this.multipleSelection,'id')
                var requestData = {
                    "warehouseId": _this.multipleSelection[0].warehouseId,
                    "idList":idList
                }

                _this.$request({
                    url: '/wms-base-server/containerType/blockUp',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response, "操作情况", {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        _this.success()
                    }
                })
            },
            success(){
                _this.getList()
                _this.addVisible=false
            }

        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>

