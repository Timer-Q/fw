<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" :disabled="this.tableSelectionData.list < 1" type="primary" @click="handleConfirm">确认</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleSearch">查询</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleRefresh">刷新</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleCancle">取消</el-button>
        </div>
        <section class="billing-wrapper">
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
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
        <transition name="detail">
            <new-bill-list-detail v-if="isShowDetail" :detailTableData="currentPayableBillDetail"></new-bill-list-detail>
        </transition>
        <tooltip name="costorder" @tooltipEmit="handleTooltipEmit">
            <el-button size="mini" @click="confirmBilling">确认开票</el-button>
            <!-- <el-button size="mini">删除</el-button>
                                                                      <el-button size="mini">提交</el-button>
                                                                      <el-button size="mini">审核</el-button> -->
        </tooltip>
        <search-dialog :dialogTitle="searchDialogData.dialogTitle" :dialogVisible="searchDialogData" :gridData="searchDialogData.gridData">
            <div slot="content">
                <el-table ref="multipleTable" :data="searchDialogData.gridData" border tooltip-effect="light" style="width: 100%">
                    <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                    <el-table-column header-align="center" v-for="(col, index) in searchDialogData.cols" align="left" :width="col.width" :prop="col.prop" :label="col.label" :key="index" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="col.prop === 'conditionName'">
                                {{ scope.row[col.prop]}}
                            </span>
                            <el-select v-if="col.prop === 'compareSymbol'" size="mini" v-model="scope.row.compareSymbol" placeholder="请选择">
                                <el-option v-for="(item, index) in searchDialogData.symbolOptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <span v-if="col.prop === 'conditionValue'">
                                <el-date-picker
                                    v-model="scope.row.conditionValue"
                                    type="daterange"
                                    placeholder="选择日期范围"
                                    v-if="scope.row.daterange"
                                >
                                </el-date-picker>
                                <el-input v-else v-model="scope.row.conditionValue" placeholder="请输入条件值"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="warning" @click="searchPayableBillList">立即查询</el-button>
            </div>
        </search-dialog>
    </section>
</template>

<script>
// components
import newBillListDetail from './NewBillListDetail.vue'
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
            tableData: [
                {
                    id: '1234567890',
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
                },
                {
                    id: '987654321',
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
            cols: [
                {
                    prop: 'invoiceType',
                    label: '入库单类型'
                },
                {
                    prop: 'payableBillOrder',
                    label: '入库单号',
                    scope: true
                },
                {
                    prop: 'billTime',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'payGroup',
                    label: '应付组织'
                },
                {
                    prop: 'shouldAccountingOrganization',
                    label: '应付供应商'
                },
                {
                    prop: 'receivablesOrganization',
                    label: '币种'
                },
                {
                    prop: 'billingCustomer',
                    label: '未税金额'
                },
                {
                    prop: 'shouldPayOrganization',
                    label: '税额'
                },
                {
                    prop: 'payOrganization',
                    label: '含税金额'
                },
                {
                    prop: 'unTaxAmount',
                    label: '累计应付含税金额'
                },
                {
                    prop: 'taxAmount',
                    label: '付款协议'
                },
                {
                    prop: 'orderSupplier',
                    label: '库存组织'
                },
                {
                    prop: 'billStatus',
                    label: '发货供应商'
                },
                {
                    prop: 'sourceBillType',
                    label: '业务组织'
                },
                {
                    prop: 'sourceBillNum',
                    label: '供应商'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '发票组织'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '发票供应商'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '付款组织'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '收款供应商'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '单据状态'
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
                        conditionValue: '',
                        daterange: true
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
                cols: [
                    {
                        prop: 'conditionName',
                        label: '条件名称',
                        width: 100
                    },
                    {
                        prop: 'compareSymbol',
                        label: '关系符',
                        width: 200
                    },
                    {
                        prop: 'conditionValue',
                        label: '条件值',
                        width: 300
                    }
                ],
                symbolOptions: [
                    {
                        value: 'EQUAL',
                        label: '等于'
                    },
                    {
                        value: 'BETWEEN',
                        label: '介于'
                    },
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
        // 确认
        handleConfirm() {
            // 点击确认 跳转到[应收单-修改](receiveBillDetail) 可以多条操作
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { receiveBillIds: [...this.tableSelectionData.ids] })
            this.addTab('应收单-修改', 'receivable-to-receive', 'modify', 'receive-bill-detail')
        },
        // 查询
        handleSearch() {
            this.searchDialogData.dialogTableVisible = true
        },
        // 刷新
        handleRefresh() {
        },
        // 取消
        handleCancle() {
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.searchPaymentBillList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
            this.searchPaymentBillList()
        },
        // table 多选框切换事件
        handleSelectionChange(selection) {
            this.tableSelectionData.list = selection
            this.tableSelectionData.ids = this.tableSelectionData.list.map(item => item.id)
            console.log(this.tableSelectionData)
        },
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
                    this.tableData = response.data.result.list
                    // 关闭弹窗
                    this.searchDialogData.dialogTableVisible = false
                }
                // this.currentPayableBillDetail = response.data.result.list[0].
            } catch (error) {
                console.error(error, 'reveiveBill getPaymentBillList error')
            }
            console.log('search')
        },
        // 添加tab标签
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('receiveBill', name, tag, tabType, content)
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
        newBillListDetail,
        searchDialog
    }
}
</script>

<style lang="scss" scoped>
/*transition*/

.detail-enter,
.detail-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
}

.detail-enter-active,
.detail-leave-active {
    transition: all .2s;
    transform-origin: center top;
}
</style>




