<template>
    <section class="container sub-container">
        <div class="arrow-content">
            <div class="arrow-down"></div>
        </div>
        <section class="billing-wrapper">
            <h3 class="billing-header">
                明细
                <div class="tool-menu">
                    <i class="el-icon-menu"></i>
                </div>
            </h3>
            <h4 class="invoice-sub-header">单据号：88888888888888888888</h4>
            <el-table ref="multipleTable" :data="detailTableData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange">
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" @click.stop="handleShowDetail" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop] }}</a>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </section>

        <tooltip @tooltipEmit="handleTooltipEmit">
            <el-button size="mini" @click="modify">修改</el-button>
            <el-button size="mini">删除</el-button>
            <el-button size="mini">提交</el-button>
        </tooltip>
    </section>
</template>

<script>
export default {
    props: {
        detailTableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            tableData3: [
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
            cols: [{
                prop: 'invoiceType',
                label: '商品/费项编码'
            },
            {
                prop: 'invoiceNum',
                label: '商品/费项名称',
                scope: true
            },
            {
                prop: 'invoiceDate',
                label: '规格/型号',
                scope: true
            },
            {
                prop: 'billingOrganization',
                label: '计价单位'
            },
            {
                prop: 'shouldAccountingOrganization',
                label: '计价数量'
            },
            {
                prop: 'receivablesOrganization',
                label: '税率'
            },
            {
                prop: 'billingCustomer',
                label: '计价未税单价'
            },
            {
                prop: 'shouldPayOrganization',
                label: '计价含税单价'
            },
            {
                prop: 'payOrganization',
                label: '税额'
            },
            {
                prop: 'unTaxAmount',
                label: '未税金额'
            },
            {
                prop: 'taxAmount',
                label: '应付金额'
            },
            {
                prop: 'contentTaxAmount',
                label: '累计付款'
            },
            {
                prop: 'amountReceivable',
                label: '应付余额'
            },
            {
                prop: 'payProtocol',
                label: '付款协议'
            },
            {
                prop: 'invoiceStatus',
                label: '行状态'
            },
            {
                prop: 'remark',
                label: '备注'
            }
            ],
            currentPage: 1
        }
    },
    methods: {
        handleSelectionChange() {
        },
        handleSearchInvoice() {
        },
        handleRowClick(row, event, column) {
            console.log(row, event, column)
            this.$tooltip({
                top: event.clientY,
                left: event.clientX
            })
        },
        handleTooltipEmit() {
            console.log('emit test')
        },
        handleShowDetail() {
            console.log('show detail')
        },
        modify() {
            this.$message({
                type: 'info',
                message: `you just clicked the modify button hehe`
            })
        }
    },
    created() {
        console.log('detail created')
    },
    components: {
        // tooltip
    }
}
</script>
