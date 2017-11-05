<template>
    <div class="wms-items">
        <div v-loading.body="loading">
            <!--标签功能操作栏  start-->
            <div class="wms-modal-div clearfix">
                <div>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="startPicking">开始拣选</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="endPicking">结束拣选</a>
                    </p>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="getList">刷新</a>
                    </p>
                </div>
            </div>
            <!--标签功能操作栏  end-->
            <div class="wms-main" ref="main">
                <div class="mainContainer clearfix">
                    <div class="mainContent mainContent-storeInfo">
                        <!--表单头部    start-->
                        <div class="vehicle-find">
                            <div class="vehicle-data">
                                <div class="inblock">
                                    <span class="hspace">拣选单号</span>
                                    <el-input type="text" v-model="model.pickingNo" class="license-number"
                                              placeholder="请输入/扫描" @keyup.enter.native="query"></el-input>
                                </div>
                            </div>
                        </div>
                        <!--表单头部    end-->

                        <!--表单  start-->
                        <div class="information-list">
                            <Table id="pastCodeTable" ref="pastCodeTable" :data="tableData"
                                   @selection-change="handleSelectionChange" highlight-current-row
                                   border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                                <TableColumn type="index" label="序号" width="60"></TableColumn>
                                <TableColumn type="selection" width="55"></TableColumn>
                                <TableColumn prop="warehouseName" label="仓库" width=""></TableColumn>
                                <TableColumn prop="pickingNo" label="拣选单号" width="120"></TableColumn>
                                <TableColumn prop="waveNo" label="波次号" width=""></TableColumn>
                                <TableColumn prop="printStateDesc" label="打印状态" width=""></TableColumn>
                                <TableColumn prop="sourceTypeDesc" label="来源类型" width=""></TableColumn>
                                <TableColumn prop="ownerName" label="货主" width=""></TableColumn>
                                <TableColumn prop="storeSpecDesc" label="存储规格" width=""></TableColumn>
                                <TableColumn prop="warehouseAreaUsageDesc" label="库区用途" width=""></TableColumn>
                                <TableColumn prop="pickingTypeDesc" label="拣选单类型" width=""></TableColumn>
                                <TableColumn prop="pickingSubTypeDesc" label="二级类型" width=""></TableColumn>
                                <TableColumn prop="orderCount" label="订单数" width=""></TableColumn>
                                <TableColumn prop="sowingTypeDesc" label="拣选类型" width=""></TableColumn>
                                <TableColumn prop="deliveryCompanyName" label="承运商" width=""></TableColumn>
                                <TableColumn prop="deliverModeDesc" label="配送方式" width=""></TableColumn>
                                <TableColumn prop="routeDesc" label="线路" width=""></TableColumn>
                                <TableColumn prop="createUserName" label="创建人" width=""></TableColumn>
                                <TableColumn prop="createTime" :formatter="dateFormat" label="创建时间"
                                             width=""></TableColumn>
                            </Table>
                        </div>
                        <!--表单  end-->
                        <!--分页    start-->
                        <pagination :pagination='pagination' @pagechange='getList'></pagination>
                        <!--分页    end-->

                    </div>
                </div>
            </div>

            <el-dialog :title="'补录'+operator+'时间'" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item :label="operator+'时间'" label-width="180">
                        <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="picking">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script type="es6">
    if (Date.prototype.Format === undefined) {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
                    k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            return fmt
        }
    }


    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import {Loading} from 'element-ui'
    import service from '@Wms/services/orderManagement/wave/managerService'

    let _this
    let api = {
        getlist: '/wms-outbound-server/picking/getListWithPage'
    }
    export default {
        directives: {loading: Loading.directive},
        created() {
            _this = this
            _this.api = api
        },
        components: {
            pagination
        },
        mounted() {
            _this.getList()
        },
        data() {
            return {
                loading: false,
                model: {
                    pickingNo: '',
                    pickingUser: '1'
                },
                api: {},
                dialogFormVisible: false,
                form: {
                    time: new Date()
                },
                queried: false,
                tableData: [],
                multipleSelection: [],
                pagination: {
                    total: 0
                },
                operator: '开始拣选'
            }
        },
        watch: {
            tableData() {
                _this.$nextTick(() => {
                    if (_this.model.pickingNo.length < 1) {
                        return
                    }
                    let plist = _this.tableData.filter(p => {
                        return p.pickingNo.indexOf(_this.model.pickingNo) > -1
                    })
                    if (plist.length > 0) {
                        for (var i = 0; i < plist.length; i++) {
                            _this.$refs.pastCodeTable.toggleRowSelection(plist[i], true)
                        }
                    }
                })
            }
        },
        methods: {
            ...pageOperate,
            dateFormat: function (row, column) {
                var date = row[column.property]
                if (date == undefined) {
                    return ""
                }
                return new Date(date).Format("yyyy-MM-dd hh:mm:ss")
            },
            query() {
                if (_this.queried !== true) {
                    _this.getList({
                        pickingNo: _this.model.pickingNo
                    })
                    _this.queried = true
                } else {
                    // 尝试提交
                    _this.picking()
                }
            },
            startPicking() {
                _this.operator = "开始拣选"
                _this.dialogFormVisible = true
            },
            endPicking() {
                _this.operator = "结束拣选"
                _this.dialogFormVisible = true
            },
            picking() {
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择操作拣选单！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                try {
                    _this.multipleSelection.forEach(p => {
                        let fcallback = function (_this, response) {
                            _this.$notify.error({
                                title: '错误',
                                message: response
                            })
                        }.bind(p)
                        let scallback = function (_this, response) {
                            if (response[0].retCode !== 0) {
                                fcallback(_this, response[0].retMsg)
                            }
                            else {
                                _this.$notify({
                                    title: '成功',
                                    message: '拣选单' + this.pickingNo + '拣选人分配成功！',
                                    type: 'success'
                                })
                                _this.model.pickingNo = ""
                                _this.getList()
                            }
                        }.bind(p)
                        _this.$request({
                            url: '/wms-outbound-server/picking/allocate',
                            context: _this,
                            sendData: [{
                                id: p.id,
                                warehouseId: p.warehouseId,
                                pickingUser: '123',
                                updateUser: '666',
                                updateUserName: '东'
                            }],
                            successCallback: scallback,
                            failCallback: fcallback
                        })
                    })
                }
                finally {
                    _this.queried = false
                }
            }
        }
    }

</script>
