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
      <div class="el-pagination-content">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </section>
    <transition name="detail">
      <cost-order-detail v-if="isShowDetail"></cost-order-detail>
    </transition>
    <tooltip name="costorder" @tooltipEmit="handleTooltipEmit">
      <el-button size="mini" @click="toInvoicing">确认开票</el-button>
      <!-- <el-button size="mini">删除</el-button>
      <el-button size="mini">提交</el-button>
      <el-button size="mini">审核</el-button> -->
    </tooltip>
  </section>
</template>

<script>
import costOrderDetail from './CostOrderDetail'
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
      currentPage1: 5,
      isShowDetail: false
    }
  },
  methods: {
    handleSelectionChange (selection) {
      console.log(selection, 'selection change')
    },
    handleSearchInvoice () {
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleRowClick (row, event, column) {
      console.log(row, event, column)
      if (column.type !== 'selection') {
        this.$tooltip({
          top: event.clientY,
          left: event.clientX
        }, 'costorder')
      }
    },
    handleTooltipEmit () {
      console.log('emit test')
    },
    handleShowDetail () {
      console.log('show detail')
      this.isShowDetail = !this.isShowDetail
    },
    toInvoicing () {
      // this.$message({
      //   type: 'info',
      //   message: `you just clicked the modify button`
      // })
      this.$router.push({
        name: 'costOrderInvoicing'
      })
    }
  },
  components: {
    costOrderDetail
  }
}
</script>

<style>
.tool-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  height: 32px;
  background: #eee;
  border-top: 1px solid #cbcbcb;
  border-left: 1px solid #cbcbcb;
  padding: 0 5px;
  box-sizing: border-box;
  color: #229fd2;
  cursor: pointer;
}

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


