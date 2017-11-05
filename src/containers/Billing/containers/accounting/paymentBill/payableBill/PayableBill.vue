<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="toInvoicing">确认开票</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleSearchInvoice">查询订单</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleSearchInvoice">刷新</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleSearchInvoice">取消</el-button>
        </div>
        <section class="billing-wrapper">
            <h3 class="billing-header">
                单据
                <div class="tool-menu">
                    <i class="el-icon-menu"></i>
                </div>
            </h3>
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
            <payable-bill-detail v-if="isShowDetail" :detailTableData="currentPayableBillDetail"></payable-bill-detail>
        </transition>
        <tooltip name="costorder" @tooltipEmit="handleTooltipEmit">
            <el-button size="mini" @click="toInvoicing">确认开票</el-button>
            <!-- <el-button size="mini">删除</el-button>
          <el-button size="mini">提交</el-button>
          <el-button size="mini">审核</el-button> -->
        </tooltip>
        <search-dialog :dialogTitle="searchDialogData.dialogTitle" :dialogVisible="searchDialogData" :gridData="searchDialogData.gridData">
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="warning" @click="searchPayableBillList">立即查询</el-button>
            </div>
        </search-dialog>
    </section>
</template>

<script>
// components
import payableBillDetail from './PayableBillDetail'
import searchDialog from '@Billing/components/SearchDialog.vue'
// service
import paymentBillService from '@Billing/services/paymentBillService.js'
export default {
    data() {
        return {
            tableData: [
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
            cols: [
                {
                    prop: 'invoiceType',
                    label: '应付单类型'
                },
                {
                    prop: 'payableBillOrder',
                    label: '应付单编号',
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
                    label: '应付客户'
                },
                {
                    prop: 'receivablesOrganization',
                    label: '应付金额'
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
                    label: '累计付款金额'
                },
                {
                    prop: 'unTaxAmount',
                    label: '应付余额'
                },
                {
                    prop: 'taxAmount',
                    label: '发票组织'
                },
                {
                    prop: 'orderSupplier',
                    label: '订单供应商'
                },
                {
                    prop: 'billStatus',
                    label: '单据状态'
                },
                {
                    prop: 'sourceBillType',
                    label: '源单类型'
                },
                {
                    prop: 'sourceBillNum',
                    label: '源单编号'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '源单行号'
                }
            ],
            currentPage: 1,
            pageSize: 10,
            pageCount: 10,
            isShowDetail: false,
            searchDialogData: {
                dialogTitle: '应付单查询',
                dialogTableVisible: true,
                gridData: [
                    {
                        conditionName: '单据日期',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '开票组织',
                        compareSymbol: '',
                        conditionValue: ''
                    }
                ]
            },
            currentPayableBillDetail: []
        }
    },
    methods: {
        handleSelectionChange(selection) {
            console.log(selection, 'selection change')
        },
        handleSearchInvoice() {
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
        async handleRowClick(row, event, column) {
            console.log(row, event, column)
            // FIXME:[应付单编号], 现在没有这个字段，后续更改
            if(column.property === 'payableBillOrder') {
                // 根据点击的[行]，查询对应数据
                let response = await paymentBillService.getDataById({ id: row.id })
                if(response.data.status.statusCode === 0) {
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
        toInvoicing() {
            // this.$message({
            //   type: 'info',
            //   message: `you just clicked the modify button`
            // })
            this.$router.push({
                name: 'costOrderInvoicing'
            })
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
                if(response.data.status.statusCode === 0) {
                    this.pageCount = response.data.result.total
                    this.tableData = response.data.result.list
                    // 关闭弹窗
                    this.searchDialogData.dialogTableVisible = false
                }
                // this.currentPayableBillDetail = response.data.result.list[0].
            } catch (error) {
                console.error(error, 'payablebill getPaymentBillList error')
            }
            console.log('search')
        }
    },
    components: {
        payableBillDetail,
        searchDialog
    }
}
</script>
