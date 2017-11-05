<template>
    <!--容器管理-->
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="add">新增</el-button>
                    <i>|</i>
                    <el-button @click="edit">修改</el-button>
                    <i>|</i>
                    <el-button @click="remove">删除</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="enable">启用</el-button>
                    <i>|</i>
                    <el-button @click="disable">停用</el-button>
                </div>
                <div class="btnGroup">
                    <el-button>导出</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">
                        <div class="query-btn el-dropdown-link" >
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
                                <span class="hspace">装卸队编码</span>
                                <el-input type="text" class="license-number" placeholder="请输入装卸队编码" v-model="listQueryParam.loaderTeamCode"></el-input>
                        </div>
                            <div class="inblock">
                                <span class="hspace">装卸队名称</span>
                                <el-input type="text" class="license-number" placeholder="装卸队名称" v-model="listQueryParam.loaderTeamName"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">负责人</span>
                                <el-input type="text" class="license-number" placeholder="请输入负责人" v-model="listQueryParam.leader"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">手机号码</span>
                                <el-input type="text" class="license-number" placeholder="请输入手机号码" v-model="listQueryParam.phoneNo"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">创建时间</span>
                                <el-date-picker
                                    v-model="times"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择时间范围"
                                    align="right">
                                </el-date-picker>
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
                               @selection-change="handleSelectionChange"
                               highlight-current-row border
                               style="width: 100%"
                        >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="companyName" label="所属单位"  width=""></TableColumn>
                            <TableColumn prop="loaderTeamCode" label="编码"  width="150"></TableColumn>
                            <TableColumn prop="loaderTeamName" label="名称"  width="150"></TableColumn>
                            <TableColumn prop="wmsZoneName" label="园区"  width=""></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                            <TableColumn prop="phoneNo" label="电话"  width=""></TableColumn>
                            <TableColumn prop="leader" label="负责人" width=""> </TableColumn>
                            <TableColumn prop="member" label="成员描述" width=""> </TableColumn>
                            <TableColumn prop="loaderTeamTypeDesc" label="类型" width="100"> </TableColumn>
                            <TableColumn prop="loaderTeamStatusDesc" label="状态" width=""> </TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width="" :formatter="dateFormat"> </TableColumn>
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
            <new-view v-model="loaderTeamId" @cancel="addVisible=false" @saved="success"></new-view>
        </el-dialog>
        <!--新增示例 弹窗  end-->
    </div>
</template>

<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import moment from 'moment'
    import newView from '@Wms/containers/basicData/loaderTeamManager/view.vue'

    import service from '@Wms/services/basicData/loaderTeamManager/loaderTeamService'

    let _this
    let api = {
        getlist: '/wms-base-server/loaderTeam/getListWithPage'
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
                times:[],
                listQueryParam: {
                    loaderTeamCode:"",
                    loaderTeamName:"",
                    leader:"",
                    phoneNo:"",
                    startTime:"",
                    endTime:""
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
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
                curRow:{},
                dialogVisible: false,
                waveCount: 0,
                addVisible: false,
                loaderTeamId:''
            }
        },
        watch: {
            // 监听value值变化，从而去加载需要编辑的数据
            times(){
                if(_this.times.length==2){
                    if(_this.times[0]!=null&&_this.times[1]!=null){
                        _this.listQueryParam.startTime = _this.times[0].getTime()
                        _this.listQueryParam.endTime = _this.times[1].getTime()
                    }
                }
            }
        },
        components: {
            'new-view': newView
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
            add() {
                _this.loaderTeamId = ''
                _this.addVisible = true
            },
            edit(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要修改的裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个装卸队进行修改！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                _this.loaderTeamId = _this.multipleSelection[0].id
                _this.addVisible = true
            },
            remove(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要删除的裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": _this.multipleSelection[0].warehouseId
                }
                _this.$request({
                    url: '/wms-base-server/loaderTeam/delete',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        _this.success()
                    }
                })
            },
            enable(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要启用的裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if(_this.multipleSelection[0].loaderTeamStatus == 2){
                    _this.$alert('只能选择状态为存盘或停用的裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": _this.multipleSelection[0].warehouseId
                }
                _this.$request({
                    url: '/wms-base-server/loaderTeam/enable',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        _this.success()
                    }
                })
            },
            disable(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要停用的裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if(_this.multipleSelection[0].loaderTeamStatus != 2){
                    _this.$alert('只能选择状态为启用的裝卸队！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": _this.multipleSelection[0].warehouseId
                }
                _this.$request({
                    url: '/wms-base-server/loaderTeam/disable',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
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

