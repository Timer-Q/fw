<template>
<section class="container sub-container">
    <div class="arrow-content">
        <div class="arrow-down"></div>
    </div>
    <section class="billing-wrapper">
        <h3 class="billing-header">
        应付明细
      </h3>
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" @click="handleAddLine" type="primary" v-if="!isHasSource">增行</el-button>
            <el-button size="small" :plain="true" type="primary">删行</el-button>
        </div>
        <el-table ref="multipleTable" :data="detailTableData" border tooltip-effect="light" empty-text="暂无数据" style="width: 100%"
            @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
            <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                <!-- <el-table-column header-align="center" v-for="(each, index) in item.children" align="left" min-width="100" :prop="each.prop" :label="each.label" :key="index" show-overflow-tooltip> -->
                    <template slot-scope="scope">
                        <!-- normal -->
                        <span>{{ scope.row[item.prop] }}</span>
                    </template>
                <!-- </el-table-column> -->
            </el-table-column>
        </el-table>
    </section>

    <tooltip :name="payableDetailTooltip">
        <!-- <el-button size="mini" @click="modify">修改</el-button> -->
        <el-button size="mini" @click="handleDeleteLine">删除</el-button>
    </tooltip>
</section>
</template>

<script>
export default {
    props: {
        detailTableData: {
            type: Array
        },
        isHasSource: {
            type: Boolean
        },
        isScan: {
            type: Boolean
        }
    },
    data () {
        return {
            cols: [
                {
                    prop: 'sourceOrg',
                    label: '来源组织'
                },
                {
                    prop: 'sourceDocNum',
                    label: '来源单号'
                },
                {
                    prop: 'sourceRowNum',
                    label: '来源单行号'
                },
                {
                    prop: 'typeOrService',
                    label: '类目或服务'
                },
                {
                    prop: 'goodsChargeCode',
                    label: '商品/费项编码',
                    isWithSource: true, // 有这个字段代表该项受有源/无源影响
                    isModified: false // 有这个字段代表该项可能会被编辑
                },
                {
                    prop: 'goodsChargeName',
                    label: '商品/费项名称'
                },
                {
                    prop: 'modelNum',
                    label: '规格型号'
                },
                {
                    prop: 'unit',
                    label: '计价单位',
                    isWithSource: true,
                    isModified: true
                },
                {
                    prop: 'quantity',
                    label: '计价数量',
                    isWithSource: true,
                    isModified: true
                },
                {
                    prop: 'taxCode',
                    label: '税码',
                    isWithSource: true,
                    isModified: true
                },
                {
                    prop: 'taxRate',
                    label: '税率'
                },
                {
                    prop: 'unitPriceWithoutTax',
                    label: '计价未税单价',
                    isModified: true,
                    isPositiveNumber: true // 该字段判断是否时正数
                },
                {
                    prop: 'unitPriceWithTax',
                    label: '计价含税单价',
                    isModified: true,
                    isPositiveNumber: true
                },
                {
                    prop: 'tax',
                    label: '税额'
                },
                {
                    prop: 'amountWihoutTax',
                    label: '未税金额',
                    isModified: true
                },
                {
                    prop: 'amountWithTax',
                    label: '含税金额',
                    isModified: true,
                    isRequired: true
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
                    prop: 'invoiceType',
                    label: '累计红冲金额**'
                },
                {
                    prop: 'totalConteractAmount',
                    label: '累计冲抵金额'
                },
                {
                    prop: 'payableRemain',
                    label: '应付余额'
                },
                {
                    prop: 'isEstimateBack',
                    label: '暂估回冲',
                    isCheckbox: true
                },
                {
                    prop: 'isGift',
                    label: '赠品',
                    isWithSource: true,
                    isModified: true,
                    isCheckbox: true
                },
                {
                    prop: 'businessOrg',
                    label: '业务组织',
                    isWithSource: true,
                    isModified: false,
                    isRequired: true
                },
                {
                    prop: 'invoiceOrg',
                    label: '发票组织',
                    isWithSource: true,
                    isModified: false
                },
                {
                    prop: 'payOrg',
                    label: '付款组织',
                    isWithSource: true,
                    isModified: false,
                    isModified: false
                },
                {
                    prop: 'provider',
                    label: '供应商',
                    isWithSource: true,
                    isModified: false
                },
                {
                    prop: 'invoiceProvider',
                    label: '发票供应商',
                    isWithSource: true,
                    isModified: false
                },
                {
                    prop: 'receiveProvider',
                    label: '收款供应商',
                    isWithSource: true,
                    isModified: false
                },
                {
                    prop: 'isSuspend',
                    label: '挂起'
                },
                {
                    prop: 'comments',
                    label: '备注',
                    isModified: true
                },
                {
                    prop: 'sourceDocQuantity',
                    label: '来源单数量',
                    isWithSource: true,
                    isModified: false
                },
                {
                    prop: 'sourceDocAmountWithTax',
                    label: '来源单含税金额',
                    isWithSource: true,
                    isModified: false
                },
                {
                    prop: 'originalDocType',
                    label: '源单类型'
                },
                {
                    prop: 'originalDocNum',
                    label: '源单编号'
                },
                {
                    prop: 'originalDocRowNum',
                    label: '源单行号'
                },
                {
                    prop: 'payContract',
                    label: '付款协议',
                    isWithSource: true,
                    isModified: false
                }
            ],
            detailDataTemp: [],
            payableDetailTooltip: 'payableDetailTooltip',
            departmentTreeData: [
                {
                    label: '一级 1',
                    children: [ {
                        label: '二级 1-1',
                        children: [ {
                            label: '三级 1-1-1'
                        },
                        {
                            label: '三级 1-1-2'
                        },
                        {
                            label: '三级 1-1-3'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [ {
                        label: '二级 2-1',
                        children: [ {
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [ {
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [ {
                        label: '二级 3-1',
                        children: [ {
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [ {
                            label: '三级 3-2-1'
                        }]
                    }]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            currentRow: 0
        }
    },
    methods: {
        handleSelectionChange () { },
        // table 点击每一行事件
        handleRowClick (row, event, column, index) {
            console.log(row, event, column, index)
            this.currentRow = this.detailTableData.indexOf(row)
            this.detailDataTemp = { ...row }
            this.cols.some((item, index) => {
                if (item.prop === column.property && !item.isModified) {
                    this.$tooltip({
                        top: event.clientY,
                        left: event.clientX
                    }, this.payableDetailTooltip)
                    return true
                }
            })
        },
        modify () {
            this.$message({
                type: 'info',
                message: `you just clicked the modify button hehe`
            })
        },
        handleAddLine () {
            this.detailTableData.push({})
        },
        handleDeleteLine () {
            this.detailTableData.splice(this.currentRow, 1)
        },
        // 更改表格 cols 属性
        initCols () {
            this.cols.forEach((item, index) => {
                // 如果该项数据受有源/无源影响
                if (item.isWithSource) {
                    // 有源的不可编辑；无源可编辑
                    item.isModified = !this.isHasSource
                }
            })
        },
        // 树 点击事件
        handleNodeClick (obj, node, tree) {
            if (!obj.children) {
                this.$set(this.detailTableData[this.currentRow], 'goodsChargeCode', obj.label)
            }
        }
    },
    created () {
        this.initCols()
    },
    watch: {
        isHasSource () {
            this.payableDetailTooltip = this.isHasSource ? 'hasSourcePayableDetailTooltip' : 'noSourcePayableDetailTooltip'
            this.initCols()
        }
    }
}
</script>
