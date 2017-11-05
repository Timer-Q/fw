<template>
  <section class="container sub-container invoicing-detail">
    <div class="arrow-content">
      <div class="arrow-down"></div>
    </div>
    <section class="billing-wrapper">
      <h3 class="billing-header">
        发票明细
      </h3>
      <div class="billing-btn-group">
        <el-button size="small" :plain="true" @click="handleAddLine" type="primary" v-if="!isHasSource">增行</el-button>
        <el-button size="small" :plain="true" type="primary">删行</el-button>
      </div>
      <el-table ref="multipleTable" :data="detailTableData" border tooltip-effect="light" empty-text="暂无数据" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange">
        <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" @click.stop="handleShowDetail" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop] }}</a>
            <el-input v-if="item.prop === 'valuationQuantity'" v-model="scope.row[item.prop]" placeholder="请输入内容"></el-input>
            <span v-else @click="getIndex(scope.$index)">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <tooltip @tooltipEmit="handleTooltipEmit">
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
    }
  },
  data () {
    return {
      invoicingDetailtableData: [
        // {
        //   invoiceType: '--',
        //   invoiceNum: '--',
        //   invoiceDate: '--',
        //   billingOrganization: '--',
        //   shouldAccountingOrganization: '--',
        //   receivablesOrganization: '--',
        //   valuationUnit: '--',
        //   valuationQuantity: '--',
        //   payOrganization: '--',
        //   unTaxAmount: '--',
        //   taxAmount: '--',
        //   contentTaxAmount: '--',
        //   amountReceivable: '--',
        //   amountCollected: '--',
        //   invoiceStatus: '--',
        //   sourceDocumentType: '--',
        //   sourceOddNumber: '--',
        //   sourceDate: '--',
        //   sourceOrganization: '--'
        // }
      ],
      cols: [
        {
          prop: 'invoiceType',
          label: '来源单号*'
        },
        {
          prop: 'invoiceNum',
          label: '来源单行号',
          scope: true
        },
        {
          prop: 'invoiceDate',
          label: '类目或服务',
          scope: true
        },
        {
          prop: 'billingOrganization',
          label: '商品/费项编码'
        },
        {
          prop: 'shouldAccountingOrganization',
          label: '商品/费项名称'
        },
        {
          prop: 'receivablesOrganization',
          label: '规格型号'
        },
        {
          prop: 'valuationUnit',
          label: '计价单位'
        },
        {
          prop: 'valuationQuantity',
          label: '计价数量'
        },
        {
          prop: 'payOrganization',
          label: '税码'
        },
        {
          prop: 'unTaxAmount',
          label: '税率'
        },
        {
          prop: 'taxAmount',
          label: '计价未税单价'
        },
        {
          prop: 'contentTaxAmount',
          label: '计价含税单价'
        },
        {
          prop: 'amountReceivable',
          label: '税额'
        },
        {
          prop: 'amountCollected',
          label: '未税金额'
        },
        {
          prop: 'invoiceStatus',
          label: '发票折扣'
        },
        {
          prop: 'sourceDocumentType',
          label: '含税金额'
        },
        {
          prop: 'sourceOddNumber',
          label: '赠品'
        },
        {
          prop: 'sourceDate',
          label: '业务组织'
        },
        {
          prop: 'sourceOrganization',
          label: '应收核算组织'
        }
      ],
      detailDataTemp: []
    }
  },
  methods: {
    handleSelectionChange () {
    },
    handleSearchInvoice () {
    },
    handleRowClick (row, event, column) {
      console.log(row, event, column)
      this.detailDataTemp = {...row}
      console.log(this.detailDataTemp)
      this.$tooltip({
        top: event.clientY,
        left: event.clientX
      })
    },
    handleTooltipEmit () {
      console.log('emit test')
    },
    handleShowDetail () {
      console.log('show detail')
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
      this.detailTableData.splice(this.getIndex(), 1)
    },
    getIndex (index) {
      console.log(index)
      return index
    }
  },
  created () {
  }
}
</script>

<style lang="less">
.invoicing-detail {
  .el-table {
    .el-input__inner {
      width: 100%;
      border: none;
      font-size: 12px;
    }
  }
  .el-table .el-tooltip.cell span {
    display: inline-block;
    width: 100%;
    min-height: 22px;
  }
}
</style>
