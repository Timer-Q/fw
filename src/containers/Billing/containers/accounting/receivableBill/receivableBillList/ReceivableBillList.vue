<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-dropdown @command="handleCommand" trigger="click" ref="newDropDown">
                <el-button size="small" :plain="true" type="primary">
                    新增
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command='saleOrder'>销售订单</el-dropdown-item>
                    <el-dropdown-item command='receiveBill'>收款单</el-dropdown-item>
                    <el-dropdown-item command='homemadeReceivableBill'>自制应收单</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" :plain="true" type="primary" @click="handleSearchreceivableBill">查询应收单</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" 
                @click="handleDelete(selectionDataId)">删除</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" 
                @click="handleSubmit(selectionDataId)">提交</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" 
                @click="handleApprove(selectionDataId)">审批</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" 
                @click="handleScan(selectionDataId)">刷新</el-button>
        </div>
        <section class="billing-wrapper">
            <el-table ref="multipleTable" :data="invoiceListData" border tooltip-effect="light" style="width: 100%" 
                @selection-change="handleSelectionChange" @row-click="handleRowClick" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" v-if="item.prop === 'payCode'" :title="item.label">{{ scope.row[item.prop]}}</a>
                        <span v-else-if="item.prop === 'billStatus'" :title="item.label">{{ scope.row[item.prop] | statusFormat }}</span>
                        <span v-else-if="item.prop === 'invoiceType'" :title="item.label">{{ scope.row[item.prop] | invoiceTypeFormat }}</span>
                        <span v-else-if="item.prop === 'billTime' || item.prop === 'createTime' || item.prop === 'payTime' || item.prop === 'updateTime' || item.prop === 'approvalTime'" :title="item.label">{{ scope.row[item.prop] | dateFormat }}</span>
                        <span v-else :title="item.label">{{ scope.row[item.prop] }}</span>
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
                        <span v-if="col.prop === 'compareSymbol'">
                            <el-select size="mini" v-model="scope.row.compareSymbol" placeholder="请选择">
                                <el-option v-for="(item, index) in searchDialogData.symbol" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                        <span v-if="col.prop === 'conditionName'">
                            {{ scope.row[col.prop]}}
                        </span>
                        <span v-if="col.prop === 'conditionValue'">
                            <el-date-picker
                                v-model="scope.row.conditionValue"
                                type="daterange"
                                placeholder="选择日期范围"
                                v-if="scope.row.isDate">
                            </el-date-picker>
                            <span v-else>{{ scope.row[col.prop]}}</span>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="warning" @click="searchReceivableBillList">立即查询</el-button>
            </div>
        </search-dialog>
        <!-- <more-search :dialogVisible="dialogVisible" :gridData="searchDialogTableData"></more-search> -->
        <tooltip name="paymentBillTooltip">
            <!-- 以保存、已收回、已驳回 -->
            <span class="tooltip-btn-group" v-if="this.billStates.billStatus === 1">
                <el-button size="mini" @click="handleDelete(receivableBillOperationRowId)">删除</el-button>
                <el-button size="mini" @click="handleModify(receivableBillOperationRowId)">修改</el-button>
                <el-button size="mini" @click="handleSubmit(receivableBillOperationRowId)">提交</el-button>
            </span>
            <!-- 已提交 -->
            <span class="tooltip-btn-group" v-if="this.billStates.billStatus === 2">
                <el-button size="mini" @click="handleSubmit(receivableBillOperationRowId)">收回</el-button>
                <el-button size="mini" @click="handleSubmit(receivableBillOperationRowId)">审核</el-button>
                <el-button size="mini" @click="handleSubmit(receivableBillOperationRowId)">驳回</el-button>
            </span>
            <!-- 已审核 && 已作废、已红冲、已核销 -->
            <el-button size="mini" @click="handleShowDetails(receivableBillOperationRowId)">查看详情</el-button>
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
    </section>
</template>

<script>
// components
import searchDialog from '@Billing/components/SearchDialog.vue'
import moreSearch from '@Billing/components//MoreSearchDialog.vue'
// service
import paymentBillService from '@Billing/services/paymentBillService'
export default {
    data() {
        return {
            isFirstRender: false,
            invoiceListData: [
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
                    label: '应收单类型'
                },
                {
                    prop: 'payCode',
                    label: '应收单号',
                    scope: true
                },
                {
                    prop: 'billTime',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'payOriginazation',
                    label: '应收组织'
                },
                {
                    prop: 'currentObjectType',
                    label: '往来对象类型'
                },
                {
                    // prop: 'receivablesOrganization',
                    prop: 'invoiceId',
                    label: '应收客户'
                },
                {
                    prop: 'currency',
                    label: '未税金额'
                },
                {
                    prop: 'payMoney',
                    label: '税额'
                },
                {
                    prop: 'serviceCharge',
                    label: '含税金额'
                },
                {
                    prop: 'amountPaid',
                    label: '累计占用金额'
                },
                {
                    prop: 'taxAmount',
                    label: '累计收/付款金额'
                },
                {
                    prop: 'contentTaxAmount',
                    label: '累计冲销金额'
                },
                {
                    prop: 'payBalance',
                    label: '累计冲抵金额'
                },
                {
                    prop: 'payBankAccount',
                    label: '应付余额'
                },
                {
                    prop: 'receivingBankAccount',
                    label: '挂起',
                    isCheck: true
                },
                {
                    prop: 'clearingForm',
                    label: '备注'
                }
            ],
            dialogVisible: {
                dialogTableVisible: false,
                dialogMoreSearchVisible: false,
                dialogResultVisible: false,
                dialogFormVisible: false
            },
            searchDialogData: {
                dialogTableVisible: false,
                cols: [
                    {
                        prop: 'conditionName',
                        label: '条件名称',
                        width: '100'
                    },
                    {
                        prop: 'compareSymbol',
                        label: '关系符',
                        width: '150'
                    },
                    {
                        prop: 'conditionValue',
                        label: '条件值',
                        width: ''
                    }
                ],
                tableData: [
                    {
                        conditionName: '单据日期',
                        compareSymbol: '',
                        conditionValue: '',
                        isDate: true
                    },
                    {
                        conditionName: '应付组织',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '应付供应商',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '发票供应商',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '供应商',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '业务部门',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '业务员',
                        compareSymbol: '',
                        conditionValue: ''
                    }
                ],
                symbol: [
                    {
                        value: 'EQUAL',
                        label: '等于'
                    }, {
                        value: 'BETWEEN',
                        label: '介于'
                    }
                ]
            },
            dialogTitle: '', // 查询框title
            tableSelect: '',
            subNavPath: 'costOrder',
            operationData: {}, // 每行选中的数据
            receivableBillOperationRowId: {}, // 点击每行，选中的数据的id
            selectionData: [], // 点击多选框，选中的数据
            selectionDataId: {}, // 点击多选框，选中的数据的id
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
            selectTabCode: "",
            tabsList: []
        }
    },
    created() {
        // this.getInitialData()
        this.$nextTick(() => {
            console.log(this.$store, 'store from payment bill list')
        })
    },
    activated() {
        this.searchReceivableBillList()
        // this.getInvoiceListCount()
    },
    methods: {
        // 下拉菜单事件
        handleCommand(command) {
            // FIXME:此处不知道是[先查询后增加tab]还是反过来，目前先按[先增加tab，后查询]做
            if (command === 'saleOrder') {
                this.addTab(`应收单-销售订单生成应收单`, 'sale-order-to-receivable-bill', 'init', 'new-bill-list')
            }
            if (command === 'receiveBill') {
                this.addTab(`应收单-收款单立账`, 'receive-bill-accounting', 'init', 'new-bill-list')
            }
            if (command === 'homemadeReceivableBill') {
                this.addTab(`自制应付单`, 'homemade-receivable-bill', 'new', 'receivable-bill-detail')
                return
            }
            // this.dialogVisible.dialogTableVisible = true
        },
        // 修改操作
        handleModify() {
            // 将需要修改的数据放到store中，在修改界面取
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { receivableBillIds: [this.operationData.id] })
            this.addTab(`${this.operationData.id}-修改`, `receivableBill-${this.operationData.id}-edit`, 'modify', 'receivable-bill-detail')
        },
        // 显示详情
        handleShowDetails() {
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { receivableBillIds: [this.operationData.id] })
            this.addTab(`${this.operationData.id}-查看`, `receivableBill-${this.operationData.id}-scan-receivableBillData`, 'scan', 'receivable-bill-detail')
        },
        // 点击table每一行
        handleRowClick(row, event, column) {
            // 获取到当前行的数据并将 id 格式化成后台需要的格式
            this.receivableBillOperationRowId = { payInfoDetailIdList: [row.id] }
            this.operationData = row
            // 如果点击的是发票号 跳转查看界面
            if (column.property === 'payCode') {
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
                return item.id
            })
            console.log(selection, this.selectionDataId, 'selection')
        },
        // 查询付款单按钮弹框
        handleSearchreceivableBill() {
            this.searchDialogData.dialogTableVisible = true
            this.dialogTitle = '查询'
            // this.subNavPath = 'paymentBillDetail'
        },
        // 删除按钮操作
        async handleDelete(selection) {
            console.log(selection)
            if (selection.payInfoDetailIdList.length > 1) {
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
                        let response = await paymentBillService.deleteById({ id: selection.payInfoDetailIdList[0] })
                        // 处理返回结果
                        this.handleResult(response, '删除', '已保存 已收回 已驳回')
                        // 删除后重新拉去数据
                        this.searchReceivableBillList()
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
                        let response = await paymentBillService.submitById({ payInfoDetailIdList: selection.payInfoDetailIdList })
                        this.handleResult(response, '提交', '已保存 已收回 已驳回')
                        this.searchReceivableBillList()
                    })
                    .catch(error => {
                        console.error(error)
                    })
            } catch (error) {

            }
        },
        // 收回按钮操作
        async handleRecall(selection) {
            try {
                this.secondComfirmPop('确定要收回吗？', '收回').then(async () => {
                    let response = await paymentBillService.takebackById({ id: selection.payInfoDetailIdList[0] })
                    this.handleResult(response, '收回', '已提交')
                    this.searchReceivableBillList()
                }).catch(error => {
                    console.error(error)
                })
            } catch (error) {
                console.error(error)
            }
        },
        // 审批按钮操作
        handleApprove(selection) {
            this.secondComfirmPop('确定要审批吗？', '审批').then(async () => {
                let response = await paymentBillService.approveById({ payInfoDetailIdList: selection.payInfoDetailIdList })
                this.handleResult(response, '审批', '已提交')
                this.searchReceivableBillList()
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
                this.searchReceivableBillList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 多条查看
        handleScan(selection) {
            console.log(selection)
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { receivableBillIds: selection.idList })
            this.$router.push({
                name: 'invoicing',
                params: {
                    subTitle: `多条销售查看`,
                    mode: 'scan'
                }
            })
        },
        // 每页数量改变后，触发事件， elementUI自带
        handleSizeChange(val) {
            this.pageSize = val
            this.searchReceivableBillList()
        },
        // 切换页码触发事件， elementUI自带
        handleCurrentChange(val) {
            this.currentPage = val
            this.searchReceivableBillList()
        },
        // 查询发票列表
        async searchReceivableBillList(searchCondition) {
            console.log(this.searchDialogData.tableData, '查询条件 现在还没用得上')
            let searchData = {
                rootOrgId: 200,
                pageNum: this.pageSize * (this.currentPage - 1),
                pageSize: this.pageSize,
                invoiceCategory: 1
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
                searchData = Object.assign({}, searchData, {conditions: this.searchDialogData.tableData})
            }
            console.log(searchData, 'searchData searchData searchData')
            try {
                let res = await paymentBillService.getPaymentBillList(searchData)
                if (res.data.status.statusCode === 0) {
                    // 获取 收款单列表
                    this.invoiceListData = res.data.result.list
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
                if (res.data.result.length <= 1) {
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
                        msg: `单据号：${res.data.result[0].id} 等不符合${action}条件`,
                        isShowDetail: !!res.data.status.statusReason,
                        // FIXME:此处取id还是piId后续有待确认
                        detail: res.data.result.map(item => item.id)
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
        showFaildResult() {
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
            this.$root.bus.$emit('receivableBill', name, tag, tabType, content)
        }
    },
    components: {
        searchDialog,
        moreSearch
    }
}
</script>
