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
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <tooltip name="paymentDetail">
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
      cols: [
        {
          prop: 'sourceCode',
          label: '来源单号'
        },
        {
          prop: 'sourceRawCode',
          label: '来源单行号'
        },
        {
          prop: 'payType',
          label: '付款类型'
        },
        {
          prop: 'payCharacter',
          label: '付款性质'
        },
        {
          prop: 'clearingForm',
          label: '结算方式'
        },
        {
          prop: 'payMoney',
          label: '付款金额'
        },
        {
          prop: 'totalOccupiedAmount',
          label: '累计占用金额'
        },
        {
          prop: 'cumulativeWriteOffAmount',
          label: '累计核销金额'
        },
        {
          prop: 'payBalance',
          label: '付款余额'
        },
        {
          prop: 'payProtocol',
          label: '付款协议'
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
          prop: 'payStatus',
          label: '支付状态'
        },
        {
          prop: 'payTime',
          label: '支付时间'
        },
        {
          prop: 'isSuspend',
          label: '是否挂起',
          isCheckbox: true
        },
        {
          prop: 'orderSupplier',
          label: '订单供应商'
        },
        {
          prop: 'paySupplier',
          label: '应付供应商'
        },
        {
          prop: 'billingSupplier',
          label: '开票供应商'
        },
        {
          prop: 'businessGroup',
          label: '业务组织'
        },
        {
          prop: 'payGroup',
          label: '应付组织'
        },
        // 一期不展示？
        // {
        //   prop: 'billType',
        //   label: '票据类型'
        // },
        // {
        //   prop: 'billNum',
        //   label: '票据号'
        // },
        {
          prop: 'sourceBillType',
          label: '源单类型'
        },
        {
          prop: 'sourceBillNum',
          label: '源单编号'
        },
        {
          prop: 'originalBillRowNum',
          label: '源单行号'
        },
        {
          prop: 'remark',
          label: '备注'
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
      this.detailDataTemp = { ...row }
      console.log(this.detailDataTemp)
      this.$tooltip({
        top: event.clientY,
        left: event.clientX
      }, 'paymentDetail')
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
    }
  },
  created () {
  }
}
</script>

