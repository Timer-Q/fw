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
      <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange">
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
  data () {
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
        label: '发票类型*'
      },
      {
        prop: 'invoiceNum',
        label: '发票号',
        scope: true
      },
      {
        prop: 'invoiceDate',
        label: '发票日期',
        scope: true
      },
      {
        prop: 'billingOrganization',
        label: '开票组织'
      },
      {
        prop: 'shouldAccountingOrganization',
        label: '应收核算组织'
      },
      {
        prop: 'receivablesOrganization',
        label: '收款组织'
      },
      {
        prop: 'billingCustomer',
        label: '开票客户'
      },
      {
        prop: 'shouldPayOrganization',
        label: '应付核算组织'
      },
      {
        prop: 'payOrganization',
        label: '付款组织'
      },
      {
        prop: 'unTaxAmount',
        label: '未税金额'
      },
      {
        prop: 'taxAmount',
        label: '税额'
      },
      {
        prop: 'contentTaxAmount',
        label: '含税金额'
      },
      {
        prop: 'amountReceivable',
        label: '应收金额'
      },
      {
        prop: 'amountCollected',
        label: '收款金额'
      },
      {
        prop: 'invoiceStatus',
        label: '单据状态'
      },
      {
        prop: 'sourceDocumentType',
        label: '来源单据'
      },
      {
        prop: 'sourceOddNumber',
        label: '来源单号'
      },
      {
        prop: 'sourceDate',
        label: '来源日期'
      },
      {
        prop: 'sourceOrganization',
        label: '来源组织'
      }
      ],
      currentPage1: 5
    }
  },
  methods: {
    handleSelectionChange () {
    },
    handleSearchInvoice () {
    },
    handleRowClick (row, event, column) {
      console.log(row, event, column)
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
    }
  },
  created () {
    console.log('detail created')
  },
  components: {
    // tooltip
  }
}
</script>

<style lang="less">
.el-pagination-content {
  padding: 10px;
  text-align: right;
}
.sub-container {
  border-top: 1px solid #cbcbcb;
  .invoice-sub-header {
    margin: 0;
    padding: 0 10px;
    line-height: 30px;
    font-weight: 400;
    font-size: 14px;
    border-top: 1px solid #cbcbcb;
    border-right: 1px solid #cbcbcb;
    border-left: 1px solid #cbcbcb;
    background: #f5f5f5;
    color: #20a0ff;
  }
  .tool-menu {
    border: none;
    background: transparent;
  }
  .arrow-content {
    position: relative;
  }
  .billing-wrapper {
    margin-top: 20px;
  }
}
.arrow-down {
  position: absolute;
  z-index: 2;
  left: 60px;
  width: 0;
  height: 0;
  border-top: 10px solid #cbcbcb;
  border-right: 8px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 8px solid transparent;
  &:after {
    position: absolute;
    width: 0;
    height: 0;
    top: -11px;
    left: -8px;
    content: '';
    z-index: 3;
    border-top: 10px solid #fff;
    border-right: 8px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 8px solid transparent;
  }
}
</style>
