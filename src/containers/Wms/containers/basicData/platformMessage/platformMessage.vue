<template>
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="add">新增</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="update">修改</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="remove()">删除</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="batchStartUp()">启用</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="batchBlockUp()">停用</el-button>
                </div>
                <div class="btnGroup">
                    <el-button>导出</el-button>
                </div>
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
                    <!--表单头部    start-->
                    <div class="vehicle-find">
                        <div class="query-btn el-dropdown-link">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                  查询方案<i class="iconfont icon-fangan"></i>
                                </span>

                            </el-dropdown>
                        </div>
                        <div class="vehicle-data">
                            <p class="inblock">
                                <span class="hspace">月台编码</span>
                                <el-input v-model="listQueryParam.platformCode"></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">月台名称</span>
                                <el-input v-model="listQueryParam.platformName"></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">业务类型</span>
                                <el-select v-model="listQueryParam.businessType">
                                    <el-option
                                        v-for="item in bussinessTypeList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value"
                                        class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="vehicle-btn">
                            <el-button @click="query()">查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单头部    end-->
                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable"
                               :data="tableData"
                               ref="pastCodeTable"
                               @row-click='rowClick'
                               @selection-change="handleSelectionChange"
                               highlight-current-row border
                               style="width: 100%"
                               :default-sort="{prop: 'date', order: 'descending'}">
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="40"></TableColumn>
                            <TableColumn prop="platformCode" label="月台编码" width="70"></TableColumn>
                            <TableColumn prop="platformName" label="月台名称" width="160"></TableColumn>
                            <TableColumn prop="businessTypeDesc" label="业务类型" width="160"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态" width="80"></TableColumn>
                            <TableColumn prop="throughput" label="月台吞吐量" width=""></TableColumn>
                            <TableColumn prop="unit" label="吞吐单位" width="160"></TableColumn>
                            <TableColumn prop="isLiftPlatformDesc" label="是否提供升降平台" width=""></TableColumn>
                            <TableColumn prop="occuCount" label="占用数量" width=""></TableColumn>
                            <TableColumn prop="maxParkingSpace" label="停靠上线" width=""></TableColumn>
                            <TableColumn prop="usingOrder" label="使用顺序" width=""></TableColumn>
                            <TableColumn prop="remark" label="备注" width=""></TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width=""
                                         :formatter="datetimeFormat"></TableColumn>
                            <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                            <TableColumn prop="updateTime" label="修改时间" width=""
                                         :formatter="datetimeFormat"></TableColumn>
                            <TableColumn prop="updateUserName" label="修改人" width=""></TableColumn>
                            <TableColumn prop="createTime" label="启用时间" width=""
                                         :formatter="datetimeFormat"></TableColumn>
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

        <!--新增 弹窗  start-->
        <el-dialog title="新增" class="advancedQuery" :visible.sync="addVisible">
            <!--传递platformId，注册cancel和saved事件-->
            <add-platform v-model="platformId" @cancel="addVisible=false" @saved="addVisible=false"></add-platform>
        </el-dialog>
        <!--新增 弹窗  end-->
        <!--修改 弹窗  start-->
        <el-dialog title="修改" class="advancedQuery" :visible.sync="updateVisible">
            <!--传递platformId，注册cancel和saved事件-->
            <update-platform v-model="platformId" @cancel="updateVisible=false"
                             @saved="updateVisible=false"></update-platform>
        </el-dialog>
        <!--修改 弹窗  end-->

    </div>
</template>
<script>
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    import addPlatform from '@Wms/containers/basicData/platformMessage/addPlatform.vue'
    import updatePlatform from '@Wms/containers/basicData/platformMessage/updatePlatform.vue'

    import service from '@Wms/services/basicData/platformManage/platformManageService'

    let _this = null
    let api = {
        getlist: '/wms-base-server/platform/getListWithPage',//主列表信息
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
                    pageNumber: 0,
                    pageSize: 10,
                    platformCode: '',
                    platformName: '',
                    businessType: ''
                },
                addVisible: false,
                updateVisible: false,
                platformId: '',
                // 分页
                pagination: {
                    total: 0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },
                bussinessTypeList: [],//业务类型枚举
                tableData: [], //表单数据 数组
                multipleSelection: [],// 当前选择的数据项目
                selectionDetailList: [],// 子表单明细列表
                selectionDetailLabelNo: '-',//子表单表头数据编号
                curRow: {}, // 当前选中行数据
                /*高级查询*/
                gridData: [{
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }],
                dialogTableVisible: false,//高级查询
                input: '',
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
                value: '',
            }
        },
        components: {
            pagination,
            'add-platform': addPlatform,
            'update-platform': updatePlatform
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
            add() {
                _this.platformId = '213213'
                _this.addVisible = true
            },
            update() {
                if (!_this.checkOne()) {
                    return
                }
                _this.platformId = _this.multipleSelection[0].id
                _this.updateVisible = true
            },
            remove() {
                if (!_this.checkOne()) {
                    return
                }
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": 2000
                }
                _this.$request({
                    url: '/wms-base-server/platform/delete',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response)
                        _this.getList()
                    }
                })
            },
            batchStartUp() {
                if (!_this.check()) {
                    return
                }
                let idsArr = []
                for (var i of _this.multipleSelection) {
                    idsArr.push(i.id)
                }
                var requestData = {
                    "idList": idsArr,
                    "warehouseId": 2000
                }
                _this.$request({
                    url: '/wms-base-server/platform/batchStartUp',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response)
                        _this.getList()
                    }
                })
            },
            batchBlockUp() {
                if (!_this.check()) {
                    return
                }
                let idsArr = []
                for (var i of _this.multipleSelection) {
                    idsArr.push(i.id)
                }
                var requestData = {
                    "idList": idsArr
                }
                _this.$request({
                    url: '/wms-base-server/platform/batchBlockUp',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response)
                        _this.getList()
                    }
                })
            },
            query(){
                _this.getList()
            },
            getEnum() {
                var requestData = [{
                    "key": "bussinessType"
                }]
                _this.$request({
                    url: '/wms-pub-server/public/getEnums',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.bussinessTypeList = response[0].enumList
                    }
                })
            },
            checkOne() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要操作的月台！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个月台进行操作！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                return true
            },
            check() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要操作的月台！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                return true
            }
        },
        mounted() {
            this.getList()
            this.getEnum()
        }
    }
</script>
