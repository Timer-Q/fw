<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-dropdown @command="handleCommand" trigger="click" ref="newDropDown">
                <el-button size="small" :plain="true" type="primary">
                    新增
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command='selfMade'>自制付款单</el-dropdown-item>
                    <el-dropdown-item command='payableBill'>应付单</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" :plain="true" type="primary" @click="handleSearchInvoice">查询付款单</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleSubmitBatch(selectionDataId)">提交</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleApproveBatch(selectionDataId)">审批</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" @click="handleScan(selectionDataId)">刷新</el-button>
        </div>
        <section class="billing-wrapper">
            <!-- <h3 class="billing-header">单据</h3> -->
            <el-table ref="multipleTable" :data="listData" border tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange" @row-click="handleRowClick" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" v-if="item.prop === 'payCode'">{{ scope.row[item.prop]}}</a>
                        <span v-else-if="item.prop === 'billStatus'">{{ scope.row[item.prop] | statusFormat }}</span>
                        <span v-else-if="item.prop === 'invoiceType'">{{ scope.row[item.prop] | invoiceTypeFormat }}</span>
                        <span v-else-if="item.prop === 'billTime' || item.prop === 'createTime' || item.prop === 'payTime' || item.prop === 'updateTime' || item.prop === 'approvalTime'">{{ scope.row[item.prop] | dateFormat }}</span>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
                </el-pagination>
            </div>
        </section>
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
                <el-button size="small" type="warning" @click="searchPaymentBillList">立即查询</el-button>
            </div>
        </search-dialog>
        <tooltip name="paymentBillTooltip">
            <!-- 以保存、已收回、已驳回 -->
            <span class="tooltip-btn-group" v-if="this.billStates.billStatus === 0 || this.billStates.billStatus === 4 || this.billStates.billStatus === 5">
                <el-button size="mini" @click="handleDelete(paymentBillOperationRowId)">删除</el-button>
                <el-button size="mini" @click="handleModify(paymentBillOperationRowId)">修改</el-button>
                <el-button size="mini" @click="handleSubmit(paymentBillOperationRowId)">提交</el-button>
            </span>
            <!-- 已提交 -->
            <span class="tooltip-btn-group" v-if="this.billStates.billStatus === 1">
                <el-button size="mini" @click="handleRecall(paymentBillOperationRowId)">收回</el-button>
                <el-button size="mini" @click="handleApprove(paymentBillOperationRowId)">审核</el-button>
                <el-button size="mini" @click="handleReject(paymentBillOperationRowId)">驳回</el-button>
            </span>
            <!-- 已审核 注：缺少线上线下状态 -->
            <span class="tooltip-btn-group" v-if="this.billStates.billStatus === 2">
                <!-- 弃审 : 已审批 且 不是支付成功 且 不是挂起状态-->
                <el-button v-if="this.billStates.billStatus === 2 && this.billStates.payStatus !== 3 && !this.billStates.isSuspend" size="mini" @click="handleCancleApprove(paymentBillOperationRowId)">弃审</el-button>
                <!-- 挂起操作 -->
                <el-button v-if="this.billStates.isSuspend" size="mini" @click="handleCancleSuspend(paymentBillOperationRowId)">取消挂起</el-button>
                <el-button v-if="!this.billStates.isSuspend" size="mini" @click="handleSuspend(paymentBillOperationRowId)">挂起</el-button>
                <!-- 注：线下 已挂起 && 未支付 不显示 支付 按钮 -->
                <el-button v-if="this.billStates.payStatus === 1 && !this.billStates.isSuspend" size="mini" @click="handlePay(paymentBillOperationRowId)">支付</el-button>
                <!-- <el-button v-if="this.billStates.payStatus === 4" size="mini" @click="handleRepay(paymentBillOperationRowId)">重新支付</el-button> -->
                <!-- 注：取消支付只在线下支付成功才显示 -->
                <el-button v-if="this.billStates.payStatus === 3 && !this.billStates.isSuspend" size="mini" @click="handleCanclePay(paymentBillOperationRowId)">取消支付</el-button>
                <el-button size="mini" @click="handleSubmit(paymentBillOperationRowId)">作废</el-button>
            </span>
            <!-- 已审核 && 未挂起 && 支付失败 && 在线支付 -->
            <el-button size="mini" @click="handleShowDetails(paymentBillOperationRowId)">查看详情</el-button>
        </tooltip>
        <el-dialog :title="resultInfo.title" :visible.sync="dialogVisible.dialogResultVisible" size="tiny" class="result-dialog">
            <p>{{resultInfo.msg}}</p>
            <a v-if="resultInfo.isShowDetail" href="javascript:;" @click="showFaildResult">(查看付款单)</a>
            <!-- <ul v-if="resultInfo.isShowDetail">
                <li v-for="(item, index) in resultInfo.detail" :key="index"><a href="javascript:;">{{item.id}}: {{item.errorMessage}}</a></li>
            </ul> -->
            <p v-if="resultInfo.isShowDetail">其他发票{{resultInfo.type}}成功</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible.dialogResultVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible.dialogResultVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 批量操作失败详情 -->
        <failed-detail-dialog :tableData="failedDetailData" :cols="cols" :dialogVisible="dialogVisible"></failed-detail-dialog>
    </section>
</template>

<script>
// components
import searchDialog from '@Billing/components/SearchDialog.vue'
import failedDetailDialog from '@Billing/components/FailedDetailDialog.vue'
import moreSearch from '@Billing/components//MoreSearchDialog.vue'
// service
import paymentBillService from '@Billing/services/paymentBillService.js'
export default {
    data() {
        return {
            isFirstRender: false,
            listData: [
                {
                    // invoiceType: '王小虎',
                    // invoiceNum: '11223344',
                    // invoiceDate: '2016-05-03',
                    // billingOrganization: '开票组织',
                    // shouldAccountingOrganization: '应收核算组织',
                    // receivablesOrganization: '收款组织收款组织',
                    // billingCustomer: '开票客户开票客户',
                    // shouldPayOrganization: '应付核算组织',
                    // payOrganization: '付款组织',
                    // unTaxAmount: '未税金额',
                    // taxAmount: '税额',
                    // contentTaxAmount: '含税金额',
                    // amountReceivable: '应收金额',
                    // amountCollected: '收款金额',
                    // invoiceStatus: '单据状态',
                    // sourceDocumentType: '来源单据',
                    // sourceOddNumber: '来源单号',
                    // sourceDate: '来源日期',
                    // sourceOrganization: '来源组织'
                    payCode: '123',
                    createUser: 12,
                    invoiceCategory: 1,
                    invoiceMode: 2,
                    invoiceType: 3,
                    invoiceNum: '123',
                    id: 999,
                    invoiceDate: 112233445566,
                    billingOrganization: '开票组织',
                    billingCustomer: '开票客户',
                    invoiceHeader: '发票抬头',
                    currencyCode: '币种',
                    taxNo: '税号测试更改',
                    openingBank: '盛京银行',
                    accountNumber: '112233',
                    goldentaxNum: '金税票号xxxxx',
                    customerAddress: '北京昌平区回龙观腾讯众创空间',
                    contactWay: '联系电话',
                    sourceDocumentType: '11',
                    invoiceStatus: 1,
                    remark: '备注呀，也不知道写点什么',
                    updateUser: 21,
                    invoiceInfoDetailList: [
                        {
                            valuationQuantity: 0,
                            valuationUnit: 'string'
                        },
                        {
                            valuationQuantity: 1,
                            valuationUnit: 'string2'
                        }
                    ],
                    isAlreadyGenerateEinvoice: true,
                    isAlreadyGoldentaxRedNum: true,
                    isAlreadyOpenControltax: true,
                    isGoldentaxVoid: true,
                    isInvoiceVoid: true,
                    isRedRush: false
                },
                {
                    payCode: '123',
                    createUser: 121,
                    invoiceCategory: 11,
                    invoiceMode: 2,
                    invoiceType: 2,
                    invoiceNum: '1123',
                    id: 777,
                    invoiceDate: 1122334455661,
                    billingOrganization: '1开票组织',
                    billingCustomer: '1开票客户',
                    invoiceHeader: '1发票抬头',
                    currencyCode: '1币种',
                    taxNo: '1税号测试更改',
                    openingBank: '1盛京银行',
                    accountNumber: '1112233',
                    goldentaxNum: '1金税票号xxxxx',
                    customerAddress: '1北京昌平区回龙观腾讯众创空间',
                    contactWay: '1联系电话',
                    sourceDocumentType: '111',
                    invoiceStatus: 7,
                    remark: '1备注呀，也不知道写点什么',
                    updateUser: 211,
                    invoiceInfoDetailList: [
                        {
                            valuationQuantity: 11,
                            valuationUnit: '1string'
                        },
                        {
                            valuationQuantity: 11,
                            valuationUnit: '1string2'
                        }
                    ],
                    isAlreadyGenerateEinvoice: true,
                    isAlreadyGoldentaxRedNum: true,
                    isAlreadyOpenControltax: true,
                    isGoldentaxVoid: true,
                    isInvoiceVoid: true,
                    isRedRush: true
                }
            ],
            cols: [
                {
                    prop: 'payType',
                    label: '付款单类型'
                },
                {
                    prop: 'payCode',
                    label: '付款单编号',
                    scope: true
                },
                {
                    prop: 'billTime',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'payOriginazation',
                    label: '付款组织'
                },
                {
                    // prop: 'shouldAccountingOrganization',
                    prop: 'currentObjectType',
                    label: '往来对象类型'
                },
                {
                    // prop: 'receivablesOrganization',
                    prop: 'invoiceId',
                    label: '收款对象'
                },
                {
                    prop: 'currency',
                    label: '币种'
                },
                {
                    prop: 'payMoney',
                    label: '付款金额'
                },
                {
                    prop: 'serviceCharge',
                    label: '手续费'
                },
                {
                    prop: 'amountPaid',
                    label: '实付金额'
                },
                {
                    prop: 'taxAmount',
                    label: '累计占用金额'
                },
                {
                    prop: 'contentTaxAmount',
                    label: '累计核销金额'
                },
                {
                    prop: 'payBalance',
                    label: '付款余额'
                },
                {
                    prop: 'payBankAccount',
                    label: '付款银行账户'
                },
                {
                    prop: 'receivingBankAccount',
                    label: '收款银行账户'
                },
                {
                    prop: 'clearingForm',
                    label: '结算方式'
                },
                {
                    prop: 'payStatus',
                    label: '支付状态'
                },
                {
                    prop: 'payTime',
                    label: '支付时间'
                },
                {
                    prop: 'checkingStatus',
                    label: '对账状态'
                },
                {
                    prop: 'billStatus',
                    label: '单据状态'
                },
                {
                    prop: 'sourceBillType',
                    label: '来源单据类型'
                },
                {
                    prop: 'isSuspend',
                    label: '是否挂起'
                },
                {
                    prop: 'subordinateClert',
                    label: '所属业务员'
                },
                {
                    prop: 'department',
                    label: '所属部门'
                },
                {
                    prop: 'remark',
                    label: '备注'
                },
                {
                    prop: 'createUser',
                    label: '创建人'
                },
                {
                    prop: 'createTime',
                    label: '创建时间'
                },
                {
                    prop: 'approver',
                    label: '审批人'
                },
                {
                    prop: 'approvalTime',
                    label: '审批时间'
                },
                {
                    prop: 'updateUser',
                    label: '最后修改人'
                },
                {
                    prop: 'updateTime',
                    label: '最后修改时间'
                }
            ],
            dialogVisible: {
                dialogTableVisible: false,
                dialogMoreSearchVisible: false,
                dialogResultVisible: false,
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
            dialogTitle: '',
            tableSelect: '',
            subNavPath: 'costOrder',
            paymentBillOperationData: {}, // 每行选中的数据
            paymentBillOperationRowId: {}, // 点击每行，选中的数据的id
            selectionData: [], // 点击多选框，选中的数据
            selectionDataId: {}, // 点击多选框，选中的数据的id
            pageCount: 30,
            pageSize: 10,
            currentPage: 1,
            billStates: {
                billStatus: 0, // rowclick后判断单据状态
                payStatus: 0, // rowclick后判断支付状态 未支付1 支付中2 支付成功3 支付失败4
                isSuspend: false // rowclick后判断是否为挂起状态
            },
            noSelectedData: true,
            resultInfo: { // 失败结果信息
                type: '',
                title: '',
                msg: '',
                isShowDetail: false,
                detail: []
            },
            selectTabCode: "",
            tabsList: [],
            failedDetailData: []
        }
    },
    created() {
        // this.getInitialData()
        this.$nextTick(() => {
            console.log(this.$store, 'store from payment bill list')
        })
    },
    activated() {
        this.searchPaymentBillList()
        // this.getInvoiceListCount()
    },
    methods: {
        handleCommand(command) {
            // FIXME:此处不知道是[先查询后增加tab]还是反过来，目前先按[先增加tab，后查询]做
            if (command === 'payableBill') {
                this.addTab(`应付单`, 'payable-bill', 'init', 'payable-bill')
            }
            if (command === 'selfMade') {
                this.addTab(`自制付款单`, 'payment-bill-new', 'new', 'payment-bill-detail')
                return
            }
            // this.dialogVisible.dialogTableVisible = true
        },
        // 修改操作
        handleModify() {
            // 将需要修改的数据放到store中，在修改界面取
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { paymentBillIds: [this.paymentBillOperationData.piId] })
            this.addTab(`${this.paymentBillOperationData.payCode}-修改`, `paymentBill-${this.paymentBillOperationData.payCode}-edit`, 'modify', 'payment-bill-detail')
        },
        // 查看详情
        handleShowDetails() {
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { paymentBillIds: [this.paymentBillOperationData.piId] })
            this.addTab(`${this.paymentBillOperationData.payCode}-查看`, `paymentBill-${this.paymentBillOperationData.payCode}-scan`, 'scan', 'payment-bill-detail')
        },
        // 点击table每一行
        handleRowClick(row, event, column) {
            // 获取到当前行的数据并将 id 格式化成后台需要的格式
            this.paymentBillOperationRowId = { payInfoDetailIdList: [{ id: row.piId }] }
            this.paymentBillOperationData = row
            // 如果点击的是发票号 跳转查看界面
            if (column.property === 'payCode') {
                // this.$store.commit('Billing_M_ADD_HANDLE_DATA', { paymentBillIds: [this.paymentBillOperationData.id] })
                // this.addTab(`${this.paymentBillOperationData.id}-查看`, `paymentBill-${this.paymentBillOperationData.id}-scan`, 'scan', 'payment-bill-detail')
                this.handleShowDetails()
                return
            }
            this.billStates = {
                billStatus: row.billStatus,
                payStatus: row.payStatus,
                isSuspend: row.isSuspend
            }
            console.log(row, event, column, this.isSaved)
            // 当点击目标为 checkbox 的时候 不弹出tooltip
            if (column.type !== 'selection') {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'paymentBillTooltip')
            }
        },
        // 切换 checkbox 的时候的事件， elementui 自带
        handleSelectionChange(selection) {
            this.selectionData = selection
            // 如果没有选中的数据 部分操作按钮置灰
            if (this.selectionData.length === 0) {
                this.noSelectedData = true
            } else {
                this.noSelectedData = false
            }
            // 获取到选中数据的 id，并格式化成接口所需数据格式
            this.selectionDataId.payInfoDetailIdList = selection.map(item => {
                return { id: item.piId }
            })
            console.log(selection, this.selectionDataId, 'selection')
        },
        // 查询付款单按钮弹框
        handleSearchInvoice() {
            this.searchDialogData.dialogTableVisible = true
            this.dialogTitle = '查询'
            // this.subNavPath = 'paymentBillDetail'
        },
        // 支付操作
        handlePay () {
            try {
                this.secondComfirmPop('确定要支付吗？', '支付')
                    .then(async () => {
                        let response = await paymentBillService.pay({ payInfoDetailIdList: selection.payInfoDetailIdList })
                        // 处理返回结果
                        this.handleResult(response, '支付', '已保存 已收回 已驳回')
                        // 支付后重新拉去数据
                        this.searchPaymentBillList()
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消支付'
                        })
                    })
            } catch (error) {
                console.error(error, 'paymentBillList delete by id error')
            }
        },
        // 取消支付操作
        handleCanclePay () {

        },
        // 删除按钮操作
        async handleDelete(selection) {
            try {
                this.secondComfirmPop('此操作将永久删除数据，是否继续？', '删除')
                    .then(async () => {
                        let response = await paymentBillService.deleteById({ id: selection.payInfoDetailIdList[0] })
                        // 处理返回结果
                        this.handleResult(response, '删除', '已保存 已收回 已驳回')
                        // 删除后重新拉去数据
                        this.searchPaymentBillList()
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
        async handleSubmit(selection) {
            try {
                this.secondComfirmPop('确定要提交吗？', '提交')
                    .then(async () => {
                        let response = await paymentBillService.submitById({ id: selection.payInfoDetailIdList[0] })
                        this.handleResult(response, '提交', '已保存 已收回 已驳回')
                        this.searchPaymentBillList()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } catch (error) {
                console.error(error, 'submit error')
            }
        },
        // 批量提交
        async handleSubmitBatch () {
            this.secondComfirmPop('确定要提交吗？', '提交').then(async () => {
                try {
                    let response = await paymentBillService.submitBatch({payInfoDetailIdList: this.selectionDataId.payInfoDetailIdList})
                    this.handleResult(response, '提交', '已保存 已收回 已驳回')
                    this.searchPaymentBillList()
                } catch (error) {
                    console.error(error, 'submit batch error')
                }
            })
        },
        // 收回按钮操作
        async handleRecall(selection) {
            try {
                this.secondComfirmPop('确定要收回吗？', '收回').then(async () => {
                    let response = await paymentBillService.takebackById({ id: selection.payInfoDetailIdList[0] })
                    this.handleResult(response, '收回', '已提交')
                    this.searchPaymentBillList()
                }).catch(error => {
                    console.error(error)
                })
            } catch (error) {
                console.error(error, 'tackback error')
            }
        },
        // 审批按钮操作
        async handleApprove(selection) {
            this.secondComfirmPop('确定要审批吗？', '审批').then(async () => {
                try {
                    let response = await paymentBillService.approveById({ id: selection.payInfoDetailIdList[0] })
                    this.handleResult(response, '审批', '已提交')
                    this.searchPaymentBillList()
                } catch (error) {
                    console.error(error, 'approve error')
                }
            })
        },
        // 批量审批
        async handleApproveBatch () {
            this.secondComfirmPop('确定要审批吗？', '审批').then(async () => {
                try {
                    let response = await paymentBillService.approveBatch({payInfoDetailIdList: this.selectionDataId.payInfoDetailIdList})
                    this.handleResult(response, '审批', '已保存 已收回 已驳回')
                    this.searchPaymentBillList()
                } catch (error) {
                    console.error(error, 'approve batch error')
                }
            })
        },
        // 取消审批
        async handleCancleApprove () {
            this.secondComfirmPop('确定要取消审批吗？', '取消审批').then(async () => {
                try {
                    let response = await paymentBillService.cancleApproveById({ id: this.paymentBillOperationRowId.payInfoDetailIdList[0] })
                    this.handleResult(response, '取消审批', '审批')
                } catch (error) {
                    console.error(error, 'cancle approve error')
                }
            })
        },
        // 驳回按钮操作
        async handleReject(selection) {
            console.log(selection)
            this.$prompt('请输入驳回原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async ({ value }) => {
                let response = await paymentBillService.rejectById({ id: selection.payInfoDetailIdList[0], rejectReason: value })
                this.handleResult(response, '驳回', '已提交')
                this.searchPaymentBillList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 挂起
        async handleSuspend() {
            this.secodeConfirmPop('是否挂起？', '挂起')
                .then(async () => {
                    try {
                        let response = await paymentBillService.suspendById({ id: this.formData.id })
                        this.handleResult(response, '挂起')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail suspendById error')
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 取消挂起
        async handleCancleSuspend() {
            this.secodeConfirmPop('是否取消挂起？', '取消挂起')
                .then(async () => {
                    try {
                        let response = await paymentBillService.cancleSuspendById({ id: this.formData.id })
                        this.handleResult(response, '取消挂起')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail cancleSuspendById error')
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 多条查看
        handleScan(selection) {
            console.log(selection)
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { paymentBillIds: selection.idList })
            this.addTab(`自制付款单`, 'payment-bill-new', 'new', 'payment-bill-detail')
        },
        // 每页数量改变后，触发事件， elementUI自带
        handleSizeChange(val) {
            this.pageSize = val
            this.searchPaymentBillList()
        },
        // 切换页码触发事件， elementUI自带
        handleCurrentChange(val) {
            this.currentPage = val
            this.searchPaymentBillList()
        },
        // 查询发票列表
        async searchPaymentBillList(searchCondition) {
            console.log(this.gridData, '查询条件 现在还没用得上')
            let searchData = {
                rootOrgId: 2,
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
                let res = await paymentBillService.getPaymentBillList(searchData)
                if (res.data.status.statusCode === 0) {
                    // 获取 收款单列表
                    this.listData = res.data.result.list
                    // 获取总条数
                    this.pageCount = res.data.result.total
                    // 每次操作成功 会重新拉取数据 此时将选中的数据清空
                    this.paymentBillOperationData = []
                    // 拉取成功后，显示操作按钮
                    this.isFirstRender = false
                    // 隐藏查询框
                    if (this.searchDialogData.dialogTableVisible) {
                        this.searchDialogData.dialogTableVisible = false
                    }
                } else {
                    this.$msgbox({
                        title: '结果',
                        message: '数据获取失败',
                        type: 'error'
                    })
                }
            } catch (error) {
                console.error(error, 'getPaymentBillList error')
            }
        },
        // 结果处理
        handleResult(res, action, beforeStatus) {
            if (res.data.status.statusCode !== 0) {
                // 单条失败
                if (!res.data.result) {
                    this.$alert(`${res.data.status.statusReason}`, `${action}结果`, {
                        confirmButtonText: '确定'
                    })
                } else if (res.data.result.length <= 1) {
                    this.$alert(`${res.data.result[0].errorMessage || res.data.status.statusReason}`, `${action}结果`, {
                        confirmButtonText: '确定'
                    })
                } else {
                    // 多条失败
                    this.dialogVisible.dialogResultVisible = true
                    this.resultInfo = {
                        type: action,
                        title: `${action}结果`,
                        // FIXME:此处取id还是piId后续有待确认
                        msg: `单据号：${res.data.result[0].piId.id} 等不符合${action}条件`,
                        isShowDetail: !!res.data.status.statusReason,
                        // FIXME:此处取id还是piId后续有待确认
                        detail: res.data.result.map(item => { return { id: item.piId.id, errorMessage: item.errorMessage } })
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
        async showFaildResult() {
            try {
                let payInfoDetailIdList = this.resultInfo.detail.map(item => { return {id: item.id} })
                let response = await paymentBillService.getFailedData({ payInfoDetailIdList})
                if (response.data.status.statusCode === 0) {
                    this.failedDetailData = response.data.result
                    this.dialogVisible.dialogFailedDetailVisible = true
                }
            } catch (error) {
                console.error(error)
            }
        },
        // 二次确认弹框
        secondComfirmPop(msg, action) {
            return this.$confirm(`${msg}`, `${action}提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        // 添加tab标签
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('paymentBill', name, tag, tabType, content)
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
    .tooltip-btn-group {
        display: flex;
    }
</style>
