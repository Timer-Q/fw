<template>
    <!--容器管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="add">新增</el-button>
                    <i>|</i>
                    <el-button @click="update">修改</el-button>
                    <i>|</i>
                    <el-button @click="del">删除</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="startUsing">启用</el-button>
                    <i>|</i>
                    <el-button @click="blockUp">停用</el-button>
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
                                <span class="hspace">容器类型</span>
                                <el-input type="text" class="license-number" v-model="listQueryParam.containerType"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">容器类别</span>
                                <el-input type="text" class="license-number" v-model="listQueryParam.containerCategory"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">状态</span>
                                <el-select v-model="listQueryParam.status" placeholder="全部">
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
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                            <a href="javascript:" @click="dialogTableVisible = true">清空</a>
                        </div>
                    </div>
                    <!--主表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable"
                               :data="tableData"
                               ref="pastCodeTable"
                               @selection-change="handleSelectionChange"
                               highlight-current-row border
                               style="width: 100%"
                               :default-sort = "{prop: 'date', order: 'descending'}"
                        >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                            <TableColumn prop="containerTypeName" label="容器类型"  width="150"></TableColumn>
                            <TableColumn prop="containerCategoryDesc" label="容器类别"  width="150"></TableColumn>
                            <TableColumn prop="warehouseName" label="所属仓库"  width="150"></TableColumn>
                            <TableColumn prop="containerLength" label="长度"  width="150"></TableColumn>
                            <TableColumn prop="containerWidth" label="宽度"  width="150"></TableColumn>
                            <TableColumn prop="containerHeight" label="高度"  width="150"></TableColumn>
                            <TableColumn prop="containerCubage" label="体积"  width="150"></TableColumn>
                            <TableColumn prop="maxBearing" label="最大承重"  width="150"></TableColumn>
                            <TableColumn prop="isContainerCheck" label="是否带格子"  width="150"></TableColumn>
                            <TableColumn prop="containerColumn" label="列"  width="150"></TableColumn>
                            <TableColumn prop="containerRow" label="行"  width="150"></TableColumn>
                            <TableColumn prop="checkOrderDesc" label="格号顺序"  width="150"></TableColumn>
                            <TableColumn prop="remark" label="备注"  width="150"></TableColumn>
                            <TableColumn prop="createTime" label="创建时间"  width="150"></TableColumn>
                            <TableColumn prop="createUser" label="创建人"  width="150"></TableColumn>
                            <TableColumn prop="updateTime" label="修改时间" width="150"> </TableColumn>
                            <TableColumn prop="updateUser" label="修改人" width="150"> </TableColumn>
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
        <!--修改示例 弹窗  start-->
        <el-dialog title="弹窗示例" class="advancedQuery" :visible.sync="updateVisible">
            <!--loaderTeamId，注册cancel和saved事件-->
            <update-demo v-model="containerTypeId" @cancel="updateVisible=false" @saved="updateVisible=false"></update-demo>
        </el-dialog>
        <!--新增示例 弹窗  end-->
    </div>
</template>

<script type="es6">

    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    // Vue.component(CollapseTransition.name, CollapseTransition)

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    import newDemo from '@Wms/containers/basicData/containerTypeManage/new.vue'
    import updateDemo from '@Wms/containers/basicData/containerTypeManage/update.vue'

    import service from '@Wms/services/basicData/containerManage/containerManageService'

    import utils from '@Wms/utils/utilFns.js'

    let _this
    let api = {
        getlist: '/wms-base-server/containerType/getListWithPage'
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
                userId: '',
                multipleSelection: [],
                tableData:[],
                pagination:{
                    total: 0
                },
                containerTypeId:'',
                listQueryParam:{
                    containerType:'',
                    containerCategory:'',
                    status:''
                },
                options:[{
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
                }]
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition,
            'new-demo': newDemo,
            'update-demo':updateDemo
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

