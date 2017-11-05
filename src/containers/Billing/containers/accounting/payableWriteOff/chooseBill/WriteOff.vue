<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="reSelectionBill">重新选单</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleCancle">取消核销</el-button>
        </div>
        <!-- 我方 -->
        <section class="billing-wrapper">
            <el-table ref="multipleTable" :data="tableTitleData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in tableTitleCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" @click.stop="handleShowDetail" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop] }}</a>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
                </el-pagination>
            </div>
        </section>
        <!-- 核销总汇 -->
        <section class="billing-wrapper">
            <h3 class="billing-header">
                核销总汇
                <div class="tool-menu">
                    <i class="el-icon-menu"></i>
                </div>
            </h3>
            <el-table ref="multipleTable" :data="tableBodyData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in tableBodyCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <el-table-column header-align="center" v-for="(each, index) in item.children" align="left" min-width="100" :prop="each.prop" :label="each.label" :key="index" show-overflow-tooltip>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
                </el-pagination>
            </div>
        </section>

        <tooltip name="costorder" @tooltipEmit="handleTooltipEmit">
            <el-button size="mini" @click="confirmBilling">确认开票</el-button>
            <!-- <el-button size="mini">删除</el-button>
                                                              <el-button size="mini">提交</el-button>
                                                              <el-button size="mini">审核</el-button> -->
        </tooltip>
    </section>
</template>

<script>
// components
import searchDialog from '@Billing/components/SearchDialog.vue'
// service
import paymentBillService from '@Billing/services/paymentBillService.js'

export default {
    props: {
        tabState: {
            type: Object,
            default: {}
        },
        tabAttr: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            tableTitleData: [
                {
                    invoiceType: '王小虎',
                    invoiceNum: '11223344',
                    invoiceDate: '2016-05-03',
                    billingOrganization: '开票组织',
                    shouldAccountingOrganization: '应收核算组织',
                    receivablesOrganization: '收款组织收款组织',
                    billingCustomer: '开票客户开票客户',
                    shouldPayOrganization: '应付核算组织',
                    payOrganization: '付款组织',
                    unTaxAmount: '未税金额',
                    taxAmount: '税额',
                    contentTaxAmount: '含税金额',
                    amountReceivable: '应收金额',
                    amountCollected: '收款金额',
                    invoiceStatus: '单据状态',
                    sourceDocumentType: '来源单据',
                    sourceOddNumber: '来源单号',
                    sourceDate: '来源日期',
                    sourceOrganization: '来源组织'
                }
            ],
            tableTitleCols: [
                {
                    prop: 'invoiceType',
                    label: '核销方式'
                },
                {
                    prop: 'payableBillOrder',
                    label: '核销类型',
                    scope: true
                },
                {
                    prop: 'billTime',
                    label: '核销编号',
                    scope: true
                },
                {
                    prop: 'payGroup',
                    label: '核销日期'
                },
                {
                    prop: 'shouldAccountingOrganization',
                    label: '应收组织'
                },
                {
                    prop: 'receivablesOrganization',
                    label: '应收客户'
                },
                {
                    prop: 'billingCustomer',
                    label: '核销人'
                },
                {
                    prop: 'shouldPayOrganization',
                    label: '本方单据大类'
                },
                {
                    prop: 'payOrganization',
                    label: '对方单据大类'
                },
                {
                    prop: 'unTaxAmount',
                    label: '本方核销金额'
                },
                {
                    prop: 'taxAmount',
                    label: '对方核销金额'
                },
                {
                    prop: 'remark',
                    label: '备注'
                }
            ],
            tableBodyData: [
                {
                    invoiceType: '王小虎',
                    invoiceNum: '11223344',
                    invoiceDate: '2016-05-03',
                    billingOrganization: '开票组织',
                    shouldAccountingOrganization: '应收核算组织',
                    receivablesOrganization: '收款组织收款组织',
                    billingCustomer: '开票客户开票客户',
                    shouldPayOrganization: '应付核算组织',
                    payOrganization: '付款组织',
                    unTaxAmount: '未税金额',
                    taxAmount: '税额',
                    contentTaxAmount: '含税金额',
                    amountReceivable: '应收金额',
                    amountCollected: '收款金额',
                    invoiceStatus: '单据状态',
                    sourceDocumentType: '来源单据',
                    sourceOddNumber: '来源单号',
                    sourceDate: '来源日期',
                    sourceOrganization: '来源组织'
                }
            ],
            tableBodyCols: [
                {
                    prop: 'writeOffType',
                    label: '核销类型',
                },
                {
                    prop: '',
                    label: '本方',
                    children: [
                        {
                            prop: 'invoiceType',
                            label: '本方单据大类'
                        },
                        {
                            prop: 'payableBillOrder',
                            label: '本方单据类型',
                            scope: true
                        },
                        {
                            prop: 'billTime',
                            label: '本方单据编号',
                            scope: true
                        },
                        {
                            prop: 'payGroup',
                            label: '本方可核销金额'
                        },
                        {
                            prop: 'shouldAccountingOrganization',
                            label: '本方本次核销金额'
                        }
                    ]
                },
                {
                    prop: '',
                    label: '对方',
                    children: [
                        {
                            prop: 'invoiceType',
                            label: '对方单据大类'
                        },
                        {
                            prop: 'payableBillOrder',
                            label: '对方单据类型',
                            scope: true
                        },
                        {
                            prop: 'billTime',
                            label: '对方单据编号',
                            scope: true
                        },
                        {
                            prop: 'payGroup',
                            label: '对方可核销金额'
                        },
                        {
                            prop: 'shouldAccountingOrganization',
                            label: '对方本次核销金额'
                        }
                    ]
                }
            ],
            currentPage: 1,
            pageSize: 10,
            pageCount: 10,
            isShowDetail: false,
            searchDialogData: {
                dialogTitle: '查询',
                dialogTableVisible: true,
                gridData: [
                    {
                        conditionName: '单据日期',
                        compareSymbol: '',
                        conditionValue: ''
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
                ]
            },
            currentPayableBillDetail: [],
            tableSelectionData: {
                list: [],
                ids: []
            },
            conditionFormData: {
                payableOrganization: '',
                ropOrganization: '',
                writeOffDate: new Date()
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            }
        }
    },
    methods: {
        // 重新选单 按钮 事件
        reSelectionBill() {
            console.log('重新选单 action')
            this.searchDialogData.dialogTableVisible = true
        },
        // 核销 按钮 事件
        handleWriteOff() {
            console.log('核销 action')
            // TODO:  自动校验本方和对方本次核销金额，双方不等时置灰，相等时可单击"核销"
            // TODO:  根据累计本次核销金额为基础，按照单据编号从小到大的顺序，自动以本方"应付余额"和对方单据"应收余额"为限，计算该单据本次核销金额
            // TODO:  新建"手动核销-详情"页签
            this.addTab("应收核销-核销", 'receivable-write-Off', '', 'choose-bill')
            // TODO:  关闭当前页签
        },
        // 模拟核销 按钮 事件
        handleSimulationWriteOff() {
            console.log('模拟核销 action')
        },
        // elementUI table 切换复选款事件
        handleSelectionChange(selection) {
            this.tableSelectionData.list = selection
            this.tableSelectionData.ids = this.tableSelectionData.list.map(item => item.id)
        },
        // 取消事件
        // FIXME: 该页面没有取消事件 该事件为关闭tab测试事件 后续删除
        handleCancle() {
            this.$root.bus.$emit(`removeTwoLevelTab`, this.tabState.name)
        },
        // 切换每一页显示内容条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.searchPaymentBillList()
        },
        // 页码切换事件
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
            this.searchPaymentBillList()
        },
        // 每一行点击事件
        async handleRowClick(row, event, column) {
            console.log(row, event, column)
            // FIXME:[应付单编号], 现在没有这个字段，后续更改
            if (column.property === 'payableBillOrder') {
                // 根据点击的[行]，查询对应数据
                let response = await paymentBillService.getDataById({ id: row.id })
                if (response.data.status.statusCode === 0) {
                    console.log(response.data)
                    // this.currentPayableBillDetail = response.
                    this.isShowDetail = true
                }
                return
            }
            if (column.type !== 'selection') {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
            }
        },
        handleTooltipEmit() {
            console.log('emit test')
        },
        handleShowDetail() {
            console.log('show detail')
            this.isShowDetail = !this.isShowDetail
        },
        // 确认开票
        confirmBilling() {
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { payableBillIds: this.tableSelectionData.ids })
            this.addTab('应付单-入库通知单立账', 'instock-notice-billing', 'scan', 'payable-bill-detail')
        },
        // 弹窗查询应付单
        async searchPayableBillList(searchCondition) {
            console.log('searchPayableBillList')
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
                searchData = Object.assign({}, searchData, searchCondition)
            }
            try {
                let response = await paymentBillService.getPaymentBillList(searchData)
                // 请求成功，处理数据
                if (response.data.status.statusCode === 0) {
                    this.pageCount = response.data.result.total
                    this.tableTitleData = response.data.result.list
                    // 关闭弹窗
                    this.searchDialogData.dialogTableVisible = false
                }
                // this.currentPayableBillDetail = response.data.result.list[0].
            } catch (error) {
                console.error(error, 'PORBill getPORBillList error')
            }
            console.log('search')
        },
        // 添加tab标签
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('payableWriteOff', name, tag, tabType, content)
        }
    },
    watch: {
        tabState: function() {
            if (this.tabState.name === this.tabAttr.tag) {
                this.searchPayableBillList()
                console.log(Object.assign({}, this.tabState), this.tabAttr, `llllwatch watch-${new Date().getTime()}`)
            }
        }
    },
    components: {
        searchDialog
    }
}
</script>

<style>
/*transition*/

.detail-enter,
.detail-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
}

.detail-enter-active,
.detail-leave-active {
    transition: all 0.2s;
    transform-origin: center top;
}
</style>




