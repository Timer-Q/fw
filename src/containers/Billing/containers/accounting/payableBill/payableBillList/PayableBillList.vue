<template>
<section class="container">
    <div class="billing-btn-group">
        <el-dropdown @command="handleCommand" trigger="click" ref="newDropDown">
            <el-button size="small" :plain="true" type="primary">
                新增
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                <el-dropdown-item command='paymentBill'>付款单</el-dropdown-item>
                <el-dropdown-item command='homemadePayableBill'>自制应付单</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" :plain="true" type="primary" @click="handleSearchPayableBill">应付单查询</el-button>
        <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleSubmit('batch')">提交</el-button>
        <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleApprove('batch')">审批</el-button>
        <!-- <el-button size="small" :plain="true" type="primary" @click="handleScan(selectionDataId)">刷新</el-button> -->
        <el-button size="small" :plain="true" type="primary" @click="handleRefresh()">刷新</el-button>
    </div>
    <section class="billing-wrapper">
        <el-table ref="multipleTable" :data="payableListData" border tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange" @row-click="handleRowClick" highlight-current-row>
            <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
            <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a href="javascript:;" v-if="item.prop === 'code'">{{ scope.row[item.prop]}}</a>
                    <span v-else-if="item.prop === 'billStatus'">{{ scope.row[item.prop] | statusFormat }}</span>
                    <span v-else-if="item.prop === 'invoiceType'">{{ scope.row[item.prop] | invoiceTypeFormat }}</span>
                    <span v-else-if="item.prop === 'docDate'">{{ scope.row[item.prop] | dateFormat }}</span>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="el-pagination-content">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
            </el-pagination>
        </div>
    </section>
    <!-- 查询弹框 -->
    <search-dialog :dialogTitle="dialogTitle" :dialogVisible="searchDialogData">
        <el-table slot="content" :data="searchDialogData.tableData" border tooltip-effect="light" style="width: 100%">
            <el-table-column header-align="center" align="left" type="index" label="序号" width="50"></el-table-column>
            <el-table-column header-align="center" align="left" v-for="(col, index) in searchDialogData.cols" :label="col.label" :prop="col.prop" :width="col.width" :key="index">
                <template slot-scope="scope">
                        <span v-if="col.prop === 'operator'">
                            <el-select size="mini" v-model="scope.row.operator" placeholder="请选择">
                                <el-option v-for="(item, index) in searchDialogData.symbol" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                        <span v-if="col.prop === 'conditionName'">
                            {{ scope.row[col.prop]}}
                        </span>
                        <span v-if="col.prop === 'value'">
                            <el-date-picker v-model="scope.row.value" type="daterange" placeholder="选择日期范围" v-if="scope.row.isDate">
                            </el-date-picker>
                            <span v-else>{{ scope.row[col.prop]}}</span>
                        </span>
                    </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" type="warning" @click="searchBillList">立即查询</el-button>
        </div>
    </search-dialog>
    <!-- <more-search :dialogVisible="dialogVisible" :gridData="searchDialogTableData"></more-search> -->
    <tooltip name="payableBillTooltip">
        <!-- 以保存、已收回、已驳回 -->
        <!-- <span class="tooltip-btn-group" v-if="this.billStates.billStatus === '已保存' || this.billStates.billStatus === '已收回' || this.billStates.billStatus === '已驳回'"> -->
        <span class="tooltip-btn-group" v-if="this.billStates.billStatus === 0 || this.billStates.billStatus === 4 || this.billStates.billStatus === 5">
            <el-button size="mini" @click="handleDelete">删除</el-button>
            <el-button size="mini" @click="handleModify">修改</el-button>
            <el-button size="mini" @click="handleSubmit">提交</el-button>
        </span>
        <!-- 已提交 -->
        <span class="tooltip-btn-group" v-if="this.billStates.billStatus === '已提交' || this.billStates.billStatus === 1">
            <el-button size="mini" @click="handleRecall">收回</el-button>
            <el-button size="mini" @click="handleApprove">审核</el-button>
            <el-button size="mini" @click="handleReject">驳回</el-button>
        </span>
        <!-- 已审核 && 已作废、已红冲、已核销 -->
        <el-button size="mini" @click="handleShowDetails">查看详情</el-button>
    </tooltip>
    <el-dialog :title="resultInfo.title" :visible.sync="dialogVisible.dialogResultVisible" size="tiny" class="result-dialog">
        <p>{{resultInfo.msg}}</p>
        <a v-if="resultInfo.isShowDetail" href="javascript:;" @click="showFaildResult">(查看付款单)</a>
        <!-- <ul v-if="resultInfo.isShowDetail">
                        <li v-for="(item, index) in resultInfo.detail" :key="index">{{item}}</li>
                    </ul> -->
        <p v-if="resultInfo.isShowDetail">其他发票{{resultInfo.type}}成功</p>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible.dialogResultVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible.dialogResultVisible = false">确 定</el-button>
            </span>
    </el-dialog>
    <failed-detail-dialog :cols="cols" :tableData="faildTableData" :dialogVisible="dialogVisible"></failed-detail-dialog>
</section>
</template>

<script>
// components
import searchDialog from '@Billing/components/SearchDialog.vue'
import moreSearch from '@Billing/components//MoreSearchDialog.vue'
import failedDetailDialog from '@Billing/components/FailedDetailDialog.vue'
// service
import payableBillService from '@Billing/services/payableBillService.js'
export default {
    props: {
        tabState: {
            type: Object
        },
        tabAttr: {
            type: Object
        }
    },
    data () {
        return {
            isFirstRender: true,
            payableListData: [
                {
                    amountWithTax: "4567.0001000000",
                    amountWithoutTax: "23.4500000000",
                    businessOrg: "业务组织",
                    childComments: "我是一个备注",
                    childCreateDate: "1508837735483",
                    childCreateUser: "202",
                    childIsEstimateBack: false,
                    childIsSuspend: false,
                    childStatus: 0,
                    childUpdateDate: "1508837735483",
                    childUpdateUser: "222",
                    code: "YFD58671701694488576",
                    currencyCode: "人民币",
                    docDate: "1508837735452",
                    docStatus: 1,
                    goodsChargeCode: "货品价码",
                    goodsChargeName: "货品名称",
                    id: "58671701912588288",
                    invalidReason: "dsdfsfffsfd",
                    invoiceOrg: "fapiaozuzhi",
                    invoiceProvider: "fapiaogongying",
                    isByPush: false,
                    isGift: false,
                    modelNum: "规格型号",
                    objectType: 1,
                    originalDocNum: "abc111",
                    originalDocType: "shoukuandan",
                    ownedDepartment: "dafd",
                    ownedSalesman: "dafd",
                    parentComments: "我是一个被更新了的备注",
                    parentCreateDate: "1508837735483",
                    parentCreateUser: "202",
                    parentId: "58671701824524288",
                    parentIsEstimateBack: false,
                    parentIsSuspend: false,
                    parentStatus: 0,
                    parentUpdateDate: "1508837735483",
                    parentUpdateUser: "202",
                    payContract: "fukuanxieyi",
                    payOrg: "zhifuzuzhi",
                    payableId: "58671701824524288",
                    payableObject: "dsaf",
                    payableOrg: 201,
                    payableRemain: "4567.0006000000",
                    payableTypeId: "111",
                    provider: "gongyingshang",
                    quantity: "4567.0008000000",
                    rejectReason: "rejjjj",
                    rootOrgId: 200,
                    rushAmount: "4567.0007000000",
                    sourceDocNum: "ABC001",
                    sourceDocType: "yuan",
                    sourceRowNum: 333,
                    tax: "12.3400000000",
                    taxCode: "税码",
                    taxRate: "税率",
                    totalConteractAmount: "4567.0005000000",
                    totalOccupiedAmount: "4567.0002000000",
                    totalPayAmount: "4567.0003000000",
                    totalRushAmount: "4567.0004000000",
                    typeOrService: "类目服务",
                    unit: "公斤",
                    unitPriceWithTax: "4567",
                    unitPriceWithoutTax: "4567.0009000000"
                },
                {
                    amountWithTax: "4567.0001000000",
                    amountWithoutTax: "23.4500000000",
                    businessOrg: "业务组织",
                    childComments: "我是一个备注",
                    childCreateDate: "1508837735483",
                    childCreateUser: "202",
                    childIsEstimateBack: false,
                    childIsSuspend: false,
                    childStatus: 0,
                    childUpdateDate: "1508837735483",
                    childUpdateUser: "222",
                    code: "YFD58671701694488576",
                    currencyCode: "人民币",
                    docDate: "1508837735452",
                    docStatus: 1,
                    goodsChargeCode: "货品价码",
                    goodsChargeName: "货品名称",
                    id: "58671701912588288",
                    invalidReason: "dsdfsfffsfd",
                    invoiceOrg: "fapiaozuzhi",
                    invoiceProvider: "fapiaogongying",
                    isByPush: false,
                    isGift: false,
                    modelNum: "规格型号",
                    objectType: 1,
                    originalDocNum: "abc111",
                    originalDocType: "shoukuandan",
                    ownedDepartment: "dafd",
                    ownedSalesman: "dafd",
                    parentComments: "我是一个被更新了的备注",
                    parentCreateDate: "1508837735483",
                    parentCreateUser: "202",
                    parentId: "58671701824524288",
                    parentIsEstimateBack: false,
                    parentIsSuspend: false,
                    parentStatus: 0,
                    parentUpdateDate: "1508837735483",
                    parentUpdateUser: "202",
                    payContract: "fukuanxieyi",
                    payOrg: "zhifuzuzhi",
                    payableId: "58671701824524288",
                    payableObject: "dsaf",
                    payableOrg: 201,
                    payableRemain: "4567.0006000000",
                    payableTypeId: "111",
                    provider: "gongyingshang",
                    quantity: "4567.0008000000",
                    rejectReason: "rejjjj",
                    rootOrgId: 200,
                    rushAmount: "4567.0007000000",
                    sourceDocNum: "ABC001",
                    sourceDocType: "yuan",
                    sourceRowNum: 333,
                    tax: "12.3400000000",
                    taxCode: "税码",
                    taxRate: "税率",
                    totalConteractAmount: "4567.0005000000",
                    totalOccupiedAmount: "4567.0002000000",
                    totalPayAmount: "4567.0003000000",
                    totalRushAmount: "4567.0004000000",
                    typeOrService: "类目服务",
                    unit: "公斤",
                    unitPriceWithTax: "4567",
                    unitPriceWithoutTax: "4567.0009000000"
                }
            ],
            cols: [
                {
                    prop: 'payableTypeId',
                    label: '应付单类型'
                },
                {
                    prop: 'code',
                    label: '应付单号',
                    scope: true
                },
                {
                    prop: 'docDate',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'payableOrg',
                    label: '应付组织'
                },
                {
                    prop: 'objectType',
                    label: '往来对象类型'
                },
                {
                    // prop: 'receivablesOrganization',
                    prop: 'provider',
                    label: '应付供应商*'
                },
                {
                    prop: 'amountWihoutTax',
                    label: '未税金额'
                },
                {
                    prop: 'tax',
                    label: '税额'
                },
                {
                    prop: 'amountWithTax',
                    label: '含税金额'
                },
                {
                    prop: 'totalOccpupiedAmount',
                    label: '累计占用金额'
                },
                {
                    prop: 'totalPayAmount',
                    label: '累计收/付款金额'
                },
                {
                    prop: 'contentTaxAmount',
                    label: '累计红冲金额*'
                },
                {
                    prop: 'totalConteractAmount',
                    label: '累计冲抵金额'
                },
                {
                    prop: 'payBankAccount',
                    label: '应付余额*'
                },
                {
                    prop: 'isSuspend',
                    label: '挂起',
                    isCheck: true
                },
                {
                    prop: 'comments',
                    label: '备注'
                }
            ],
            dialogVisible: {
                dialogTableVisible: false,
                dialogMoreSearchVisible: false,
                dialogResultVisible: false,
                dialogFormVisible: false,
                dialogFailedDetailVisible: false
            },
            searchDialogData: {
                dialogTableVisible: false,
                cols: [ {
                    prop: 'conditionName',
                    label: '条件名称',
                    width: '100'
                },
                {
                    prop: 'operator',
                    label: '关系符',
                    width: '150'
                },
                {
                    prop: 'value',
                    label: '条件值',
                    width: ''
                }
                ],
                tableData: [ {
                    conditionName: '单据日期',
                    operator: 'EQUAL',
                    value: '',
                    field: '',
                    isDate: true
                },
                {
                    conditionName: '应付组织',
                    operator: 'EQUAL',
                    value: '',
                    field: ''
                },
                {
                    conditionName: '应付供应商',
                    operator: 'EQUAL',
                    value: '',
                    field: ''
                },
                {
                    conditionName: '库存组织',
                    operator: 'EQUAL',
                    value: '',
                    field: ''
                },
                {
                    conditionName: '发货供应商',
                    operator: 'EQUAL',
                    value: '',
                    field: ''
                },
                {
                    conditionName: '业务部门',
                    operator: 'EQUAL',
                    value: '',
                    field: ''
                },
                {
                    conditionName: '业务员',
                    operator: 'EQUAL',
                    value: '',
                    field: ''
                }
                ],
                symbol: [ {
                    value: 'EQUAL',
                    label: '等于'
                }, {
                    value: 'BETWEEN',
                    label: '介于'
                }]
            },
            dialogTitle: '', // 查询框title
            tableSelect: '',
            subNavPath: 'costOrder',
            operationData: {}, // 每行选中的数据
            operationRowId: {}, // 点击每行，选中的数据的id
            selectionData: [], // 点击多选框，选中的数据
            selectionIdList: {}, // 点击多选框，选中的数据的id
            pageCount: 30,
            pageSize: 10,
            currentPage: 1,
            billStates: { // 付款单单据状态
                billStatus: 0, // rowclick后判断单据状态
                payStatus: 0, // rowclick后判断支付状态 未支付1 支付中2 支付成功3 支付失败4
                isSuspend: false // rowclick后判断是否为挂起状态
            },
            noSelectedData: true, // 是否有数据选中
            resultInfo: { // 失败结果信息
                type: '',
                title: '',
                msg: '',
                isShowDetail: false,
                detail: []
            },
            faildTableData: []
        }
    },
    created () {
        // this.getInitialData()
        this.$nextTick(() => {
            console.log(this.$store, this.tabState, this.tabAttr, 'store from payment bill list')
            this.searchBillList()
        })
    },
    methods: {
        handleCommand (command) {
            // FIXME:此处不知道是[先查询后增加tab]还是反过来，目前先按[先增加tab，后查询]做
            if (command === 'paymentBill') {
                this.addTab(`付款单-选择`, 'payment-bill', 'init', 'new-bill-list')
            }
            if (command === 'homemadePayableBill') {
                this.addTab(`自制应付单`, 'homemade-payable-bill', 'new', 'payable-bill-detail')
                return
            }
            // this.dialogVisible.dialogTableVisible = true
        },
        // 修改操作
        handleModify () {
            // 将需要修改的数据放到store中，在修改界面取
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', {
                payableBillIds: [ this.operationData.id ]
            })
            this.addTab(`${this.operationData.code}-修改`, `payableBill-${this.operationData.code}-edit`, 'modify', 'payable-bill-detail')
        },
        // 显示详情
        handleShowDetails () {
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { payableBillIds: [ this.operationData.payableId ] })
            this.addTab(`${this.operationData.code}-查看`, `payableBill-${this.operationData.payableId}-scan-payableBillData`, 'scan', 'payable-bill-detail')
        },
        // 点击table每一行
        handleRowClick (row, event, column) {
            // 获取到当前行的数据并将 id 格式化成后台需要的格式
            this.operationRowId = { idList: [ row.payableId ] }
            this.operationData = row
            // 如果点击的是发票号 跳转查看界面
            if (column.property === 'code') {
                // 跳转详情界面
                this.handleShowDetails()
                return
            }
            this.billStates = {
                billStatus: row.status || row.parentStatus,
                payStatus: row.payStatus,
                isSuspend: row.isSuspend
            }
            console.log(row, event, column, this.billStates)
            // 当点击目标为 checkbox 的时候 不弹出tooltip
            if (column.type !== 'selection') {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'payableBillTooltip')
            }
        },
        // 切换 checkbox 的时候的事件， elementui 自带
        handleSelectionChange (selection) {
            this.selectionData = selection
            // 如果没有选中的数据 部分操作按钮置灰
            if (this.selectionData.length === 0) {
                this.noSelectedData = true
            } else {
                this.noSelectedData = false
            }
            // 获取到选中数据的 id，并格式化成接口所需数据格式
            this.selectionIdList = selection.map(item => { return { id: item.payableId } })
            console.log(selection, this.selectionIdList, 'selection')
        },
        // 查询付款单按钮弹框
        handleSearchPayableBill () {
            this.searchDialogData.dialogTableVisible = true
            this.dialogTitle = '查询'
            // this.subNavPath = 'paymentBillDetail'
        },
        // 删除按钮操作
        async handleDelete (selection) {
            console.log(selection)
            if (selection.idList.length > 1) {
                this.$message({
                    showClose: true,
                    message: '目前只能删除单条~',
                    type: 'info'
                })
                return
            }
            try {
                this.secondComfirmPop('此操作将永久删除数据，是否继续？', '删除')
                    .then(async () => {
                        let response = await payableBillService.deleteById({ id: selection.idList[ 0 ] })
                        // 处理返回结果
                        this.handleResult(response, '删除', '已保存 已收回 已驳回')
                        // 删除后重新拉去数据
                        this.searchBillList()
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            } catch (error) {
                console.error(error, 'paymentBillList delete by id error')
            }
        },
        // 提交按钮操作
        async handleSubmit (batchFlag) {
            try {
                this.secondComfirmPop('确定要提交吗？', '提交')
                    .then(async () => {
                        let response
                        if (batchFlag === 'batch') {
                            response = await payableBillService.submitBatch({
                                batchIdList: this.selectionIdList
                            })
                        } else {
                            response = await payableBillService.submitBillById({
                                id: this.operationRowId.idList[ 0 ]
                            })
                        }
                        response.batch = !!batchFlag
                        console.log(response, 'submit response')
                        this.handleResult(response, '提交', '已保存 已收回 已驳回')
                        this.searchBillList()
                    })
                    .catch(error => {
                        console.error(error)
                    })
            } catch (error) {
                console.error(error, 'payable bill list submit error')
            }
        },
        // 收回按钮操作
        async handleRecall () {
            try {
                this.secondComfirmPop('确定要收回吗？', '收回').then(async () => {
                    let response = await payableBillService.takebackBillById({
                        id: this.operationRowId.idList[ 0 ]
                    })
                    this.handleResult(response, '收回', '已提交')
                    this.searchBillList()
                }).catch(error => {
                    console.error(error)
                })
            } catch (error) {
                console.error(error, 'payable list recall error')
            }
        },
        // 审批按钮操作
        handleApprove (batchFlag) {
            this.secondComfirmPop('确定要审批吗？', '审批').then(async () => {
                let response
                if (batchFlag === 'batch') {
                    response = await payableBillService.approveBatch({
                        batchIdList: this.selectionIdList
                    })
                } else {
                    response = await payableBillService.approveBillById({
                        id: this.operationRowId.idList[ 0 ]
                    })
                }
                response.batch = !!batchFlag
                this.handleResult(response, '审批', '已提交')
                this.searchBillList()
            })
        },
        // 驳回按钮操作
        async handleReject () {
            this.$prompt('请输入驳回原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async ({ value }) => {
                let response = await payableBillService.rejectById({
                    id: this.operationRowId.idList[ 0 ],
                    rejectReason: value
                })
                this.handleResult(response, '驳回', '已提交')
                this.searchBillList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 多条查看
        handleScan (selection) {
            console.log(selection)
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', {
                paymentBillIds: selection.idList
            })
            this.$router.push({
                name: 'invoicing',
                params: {
                    subTitle: `多条销售查看`,
                    mode: 'scan'
                }
            })
        },
        // 刷新 按钮操作
        handleRefresh () {
            this.searchBillList()
        },
        // 每页数量改变后，触发事件， elementUI自带
        handleSizeChange (val) {
            this.pageSize = val
            this.searchBillList()
        },
        // 切换页码触发事件， elementUI自带
        handleCurrentChange (val) {
            this.currentPage = val
            this.searchBillList()
        },
        // 查询发票列表
        async searchBillList (searchCondition) {
            console.log(this.searchDialogData, '查询条件 现在还没用得上')
            let searchData = {
                rootOrgId: 2,
                // orgId: 201,
                orgId: 2,
                pageNum: this.pageSize * (this.currentPage - 1),
                pageSize: this.pageSize
                // conditions: [
                //   {
                //     field: 'valuation_unit',
                //     operator: 'EQUALS',
                //     value: 'A'
                //   },
                //   {
                //     field: 'valuation_quantity',
                //     operator: 'LT',
                //     value: 778
                //   }
                // ]
            } // eslint-disable-line no-unused-vars
            if (searchCondition) {
                searchData = Object.assign({}, searchData, searchCondition)
            }
            try {
                let res = await payableBillService.getBillList(searchData)
                if (res.data.status.statusCode === 0) {
                    // 获取 收款单列表
                    this.payableListData = res.data.result.list
                    // 获取总条数
                    this.pageCount = res.data.result.total
                    // 每次操作成功 会重新拉取数据 此时将选中的数据清空
                    this.operationData = []
                    // 拉取成功后，显示操作按钮
                    this.isFirstRender = false
                    // 隐藏查询框
                    if (this.dialogVisible.dialogTableVisible) {
                        this.dialogVisible.dialogTableVisible = false
                    }
                } else {
                    this.$msgbox({
                        title: '结果',
                        message: res.data.status.statusReason,
                        type: 'error'
                    })
                }
            } catch (error) {
                console.error(error, 'getPaymentBillList error')
            }
        },
        // 结果处理
        handleResult (res, action, beforeStatus) {
            if (res.data.status.statusCode !== 0) {
                // 单条失败
                if (!res.batch) {
                    this.$alert(`${res.data.status.statusReason}`, `${action}结果`, {
                        confirmButtonText: '确定'
                    })
                } else {
                    // 多条失败
                    this.dialogVisible.dialogResultVisible = true
                    this.resultInfo = {
                        type: action,
                        title: `${action}结果`,
                        // FIXME:此处取id还是piId后续有待确认
                        msg: `单据号：${res.data.result[ 0 ].id.id} 等不符合${action}条件`,
                        isShowDetail: !!res.data.status.statusReason,
                        // FIXME:此处取id还是piId后续有待确认
                        detail: res.data.result.map(item => { return { id: item.id.id || item.id } })
                    }
                }
                console.log(this.resultInfo, 'handleResult resultInfo')
            } else {
                this.$alert(`${action}成功`, `${action}结果`, {
                    confirmButtonText: '确定'
                })
            }
        },
        // 多条失败后 点击[查看付款单]触发的方法
        // TODO: 根据错误id查询多条付款单并弹窗显示
        async showFaildResult () {
            try {
                let response = await payableBillService.getBillLIstByIds({
                    batchIdList: this.resultInfo.detail
                })
                if (response.data.status.statusCode === 0) {
                    this.faildTableData = response.data.result
                    this.dialogVisible.dialogFailedDetailVisible = true
                } else {
                    this.handleResult(response, '查询', '查询')
                }
            } catch (error) {
                console.log(error, 'payableBillList getBillLIstByIds error')
            }
        },
        // 二次确认弹框
        secondComfirmPop (msg, action) {
            return this.$confirm(`${msg}`, `${action}提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        // 添加tab标签
        addTab (name, tag, tabType, content) {
            this.$root.bus.$emit('payableBill', name, tag, tabType, content)
        }
    },
    watch: {
        tabState () {
            console.log(this.tabState, this.tabAttr, 'hehehehheheheheheeheh')
            if (this.tabState.name === this.tabAttr.tag) {
                console.log(`切换到了 ${this.tabState.name} 页`, this.tabState)
                this.searchBillList()
            }
        }
    },
    components: {
        searchDialog,
        moreSearch,
        failedDetailDialog
    }
}
</script>


<style lang="scss">
.v-tooltip {
  .tooltip-btn-group {
    display: flex;
  }
}
</style>
