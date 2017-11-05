<template>
    <!--货位管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="javascript:;" @click="addLocation">新增</a>
                    <!--<a href="javascript:;" @click="dialogFormVisible = true">新增</a>-->
                    <i>|</i>
                    <a href="javascript:;" @click="updateLocation">修改</a>
                    <i>|</i>
                    <a href="javascript:;" @click="batchAddLocation">批量新增</a>
                    <i>|</i>
                    <a href="javascript:;" @click="deleteLocation">删除</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" @click="enableLocation">启用</a>
                    <i>|</i>
                    <a href="javascript:;" @click="disableLocation">停用</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">导入</a>
                    <i>|</i>
                    <a href="javascript:;">下载模板</a>
                    <i>|</i>
                    <a href="javascript:;">导出</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">日志</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">条码打印</a>
                    <i>|</i>
                    <a href="javascript:;">打印机设置</a>
                    <i>|</i>
                    <a href="javascript:;" @click="clear">货位站位清空</a>
                </p>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--新增页面  start-->
        <el-dialog title="货位管理-新增" class="advancedQuery" :visible.sync="addVisible" size="large">
            <!--传递userId，注册cancel和saved事件-->
            <add-or-update-location :transData="transData"  @cancel="addVisible=false" @saved="success"></add-or-update-location>
        </el-dialog>
        <el-dialog title="货位管理-批量新增" class="advancedQuery" :visible.sync="batchAddVisible" size="large">
            <!--传递userId，注册cancel和saved事件-->
            <batch-add-location :transData="transData"  @cancel="batchAddVisible=false" @saved="success"></batch-add-location>
        </el-dialog>
        <!--新增页面  end-->
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
                                <span class="hspace">货位编码</span>
                                <el-input type="text" v-model="listQueryParam.goodspositionCode" class="license-number" placeholder="货位编码"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">所属库区</span>
                                <el-input ></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货物属性</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货物状态</span>
                                <el-input></el-input>
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
                               @row-click="rowClick"
                               @selection-change="handleSelectionChange"
                               highlight-current-row border
                               style="width: 100%"
                               :default-sort="{prop: 'date', order: 'descending'}"
                        >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="40"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态" width="80"></TableColumn>
                            <TableColumn prop="goodspositionCode" label="货位编码" width="150"></TableColumn>
                            <TableColumn prop="warehouseId" label="所属仓库" width=""></TableColumn>
                            <TableColumn prop="warehouseAreaId" label="所属库区" width=""></TableColumn>
                            <TableColumn prop="goodspositionStatusDesc" label="货位状态" width=""></TableColumn>
                            <TableColumn prop="goodspositionBarCode" label="货位条码" width="150"></TableColumn>
                            <TableColumn prop="goodspositionOrder" label="货位顺序号" width="100"></TableColumn>
                            <TableColumn prop="goodsShelvesTypeDesc" label="货架类型" width=""></TableColumn>
                            <TableColumn prop="warehouseAreaTypeDesc" label="库区类型" width=""></TableColumn>
                            <TableColumn prop="useAttrbuteDesc" label="用途属性" width=""></TableColumn>
                            <TableColumn prop="goodsAttrbuteDesc" label="货物属性" width=""></TableColumn>
                            <TableColumn prop="refundDesc" label="退货属性" width=""></TableColumn>
                            <TableColumn prop="replenishmentDesc" label="补货属性" width=""></TableColumn>
                            <TableColumn prop="goodsClassDesc" label="商品品类" width=""></TableColumn>
                            <TableColumn prop="storeAttrDesc" label="存储属性" width=""></TableColumn>
                            <TableColumn prop="onepositionOneclassDesc" label="一位一品属性" width="100"></TableColumn>
                            <TableColumn prop="onepositionOneownerDesc" label="一位一货主" width="100"></TableColumn>
                            <TableColumn prop="storeSpecDesc" label="存储规格" width=""></TableColumn>
                            <TableColumn prop="goodsAbcDesc" label="商品ABC分类" width="100"></TableColumn>
                            <TableColumn prop="floor" label="隶属楼层" width=""></TableColumn>
                            <TableColumn prop="isValuableDesc" label="贵重物品" width=""></TableColumn>
                            <TableColumn prop="goodspositionLength" label="长（cm）" width="80"></TableColumn>
                            <TableColumn prop="goodspositionWidth" label="宽（cm）" width="80"></TableColumn>
                            <TableColumn prop="goodspositionHeight" label="高（cm）" width="80"></TableColumn>
                            <TableColumn prop="goodspositionCubage" label="容积（m³）" width="100"></TableColumn>
                            <TableColumn prop="usableMaxNumber" label="可用最大数量" width="100"></TableColumn>
                            <TableColumn prop="usableMaxCubage" label="可用最大体积" width="100"></TableColumn>
                            <TableColumn prop="usableMaxWeight" label="可用最大重量" width="100"></TableColumn>
                            <TableColumn prop="remainderMaxNumber" label="剩余最大数量" width="100"></TableColumn>
                            <TableColumn prop="remainderMaxCubage" label="剩余最大体积" width="100"></TableColumn>
                            <TableColumn prop="remainderMaxWeight" label="剩余最大重量" width="100"></TableColumn>
                            <TableColumn prop="usableNumberProportion" label="可用数量比例" width="100"></TableColumn>
                            <TableColumn prop="usableCubageProportion" label="可用容积比例" width="100"></TableColumn>
                            <TableColumn prop="usableWeightProportion" label="可用重量比例" width="100"></TableColumn>
                            <TableColumn prop="stopIn" label="停止移入" width=""></TableColumn>
                            <TableColumn prop="stopOut" label="停止移出" width=""></TableColumn>
                            <TableColumn prop="remark" label="备注" width="120"></TableColumn>
                            <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width="100"></TableColumn>
                            <TableColumn prop="updateUserName" label="最后修改人" width="100"></TableColumn>
                            <TableColumn prop="updateTime" label="最后修改时间" width="100"></TableColumn>
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
</template>

<script type="es6">

    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    // Vue.component(CollapseTransition.name, CollapseTransition)

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import addOrUpdateLocation from '@Wms/containers/basicData/locationManage/addOrUpdateLocation.vue'
    import batchAddLocation from '@Wms/containers/basicData/locationManage/batchAddLocation.vue'

    import service from '@Wms/services/basicData/locationManage/locationManageService'

    let _this
    let api = {
        getlist: '/wms-base-server/location/getListWithPage'
    }

    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                listQueryParam: {
                    warehouseId: "2000",
                    goodspositionCode:''
                },
                model: {
                    status: "0"
                },
                api: {},
                tableData: [],
                more: false,
                multipleSelection: [],
                warehouseId: "2000",
                pagination: {
                    total: 0
                },
                curRow:{},
                addVisible: false,
                batchAddVisible: false,
                createUser: '666',
                locationId:'',
                enableUrl:'/wms-base-server/location/startUsing',
                disableUrl:'/wms-base-server/location/blockUp',
                deleteUrl:'/wms-base-server/location/delete',
                clearUrl:'/wms-base-server/location/clear',
                transData:{
                    createUser: '666',
                    locationId:'',
                    warehouseId:'',
                    updateUser:'669'
                },
                idList:[],
                updateUser:'669'
            }
        },
        components: {
            pagination,
            'el-collapse-transition': CollapseTransition,
            'add-or-update-location': addOrUpdateLocation,
            'batch-add-location':batchAddLocation
        },
        methods:{
            ...pageOperate,
            dateFormat: function (row, column) {
                var date = row[column.property]
                if (date == undefined) {
                    return ""
                }
                //debugger
                // TODO: 试试moment
                return moment(date).format("YYYY-MM-DD")
                //return new Date(date).Format("yyyy-MM-dd")
            },
            addLocation() {
                _this.transData.locationId = ''
                _this.addVisible = true
            },
            batchAddLocation(){
                _this.batchAddVisible = true
            },
            updateLocation() {
                //alert(_this.multipleSelection[0].id)
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要修改的货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个货位进行修改！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                _this.transData.warehouseId = this.listQueryParam.warehouseId
                _this.transData.locationId = _this.multipleSelection[0].id
                _this.locationId = _this.multipleSelection[0].id
                _this.addVisible = true
            },
            deleteLocation() {
                //alert(_this.multipleSelection[0].id)
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要删除的货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var locationData = {
                    warehouseId: _this.warehouseId ,
                    id : _this.multipleSelection[0].id
                }
                /*
               * 此处写调用api，保存user对象
               * 如果保存失败，则给出相应提示
               * */
                _this.$request({
                    url: _this.deleteUrl,
                    context: _this,
                    sendData: locationData,
                    successCallback: (_this, response) => {
                        _this.success(response)
                    }
                })
            },
            clear() {
                //alert(_this.multipleSelection[0].id)
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要清空的货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var locationData = {
                    warehouseId: _this.warehouseId ,
                    id : _this.multipleSelection[0].id,
                    updateUser: _this.updateUser
                }
                /*
               * 此处写调用api，保存user对象
               * 如果保存失败，则给出相应提示
               * */
                _this.$request({
                    url: _this.clearUrl,
                    context: _this,
                    sendData: locationData,
                    successCallback: (_this, response) => {
                        _this.success(response)
                    }
                })
            },
            enableLocation() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要启用的货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                _this.idList = []
                var selectList = _this.multipleSelection
                for(var i=0;i<selectList.length;i++){
                    _this.idList.push(selectList[i].id)
                }
                var locationData = {
                    warehouseId: _this.warehouseId ,
                        idList : _this.idList
                }
                /*
               * 此处写调用api，保存user对象
               * 如果保存失败，则给出相应提示
               * */
                _this.$request({
                    url: _this.enableUrl,
                    context: _this,
                    sendData: locationData,
                    successCallback: (_this, response) => {
                        _this.success(response)
                    }
                })
            },
            disableLocation() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要停用的货位！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                _this.idList = []
                var selectList = _this.multipleSelection
                for(var i=0;i<selectList.length;i++){
                    _this.idList.push(selectList[i].id)
                }
                var locationData = {
                    warehouseId: _this.warehouseId ,
                    idList : _this.idList
                }
                /*
               * 此处写调用api，保存user对象
               * 如果保存失败，则给出相应提示
               * */
                _this.$request({
                    url: _this.disableUrl,
                    context: _this,
                    sendData: locationData,
                    successCallback: (_this, response) => {
                        _this.success(response)
                    },
                    failCallback:(_this,e)=>{
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            },
            success(response){
                _this.$alert('操作成功', '', {
                    type: 'success',
                    closeOnClickModal: true,
                    showConfirmButton: false,
                    showCancelButton: false
                })
                _this.addVisible=false
                _this.batchAddVisible = false
                _this.getList()
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>

