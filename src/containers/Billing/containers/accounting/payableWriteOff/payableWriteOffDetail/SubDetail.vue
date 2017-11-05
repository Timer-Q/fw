<template>
  <section class="container sub-container invoicing-detail">
    <div class="arrow-content">
      <div class="arrow-down"></div>
    </div>
    <section class="billing-wrapper">
      <h3 class="billing-header">
        核销汇总
      </h3>
      <!-- <div class="billing-btn-group">
        <el-button size="small" :plain="true" @click="handleAddLine" type="primary" v-if="!isHasSource">增行</el-button>
        <el-button size="small" :plain="true" type="primary">删行</el-button>
      </div> -->
      <el-table ref="multipleTable" :data="detailTableData" border tooltip-effect="light" empty-text="暂无数据" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange">
        <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
          <el-table-column header-align="center" v-for="(each, index) in item.children" align="left" min-width="100" :prop="each.prop" :label="each.label" :key="index" show-overflow-tooltip>
            <template slot-scope="scope">
              <a href="javascript:;" @click.stop="handleShowDetail" v-if="each.prop === 'invoiceNum'">{{ scope.row[each.prop] }}</a>
              <el-input v-if="each.prop === 'valuationQuantity'" v-model="scope.row[each.prop]" placeholder="请输入内容"></el-input>
              <span v-else @click="getIndex(scope.$index)">{{ scope.row[each.prop] }}</span>
            </template>
          </el-table-column>
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
    },
    cols: {
      type: Array,
      default: []
    }
  },
  data() {
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
      detailDataTemp: []
    }
  },
  methods: {
    handleSelectionChange() {
    },
    handleSearchInvoice() {
    },
    handleRowClick(row, event, column) {
      console.log(row, event, column)
      this.detailDataTemp = { ...row }
      console.log(this.detailDataTemp)
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
    },
    handleAddLine() {
      this.detailTableData.push({})
    },
    handleDeleteLine() {
      this.detailTableData.splice(this.getIndex(), 1)
    },
    getIndex(index) {
      console.log(index)
      return index
    }
  },
  created() {
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
