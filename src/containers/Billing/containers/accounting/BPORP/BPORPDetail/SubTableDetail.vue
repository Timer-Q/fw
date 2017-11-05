<template>
  <section class="container sub-container invoicing-detail">
    <div class="arrow-content">
      <div class="arrow-down"></div>
    </div>
    <section class="billing-wrapper">
      <h3 class="billing-header">
        核销汇总
      </h3>
      <el-table ref="multipleTable" :data="concatDetailData" border tooltip-effect="light" empty-text="暂无数据" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange">
        <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
          <el-table-column header-align="center" v-for="(each, index) in item.children" align="left" min-width="100" :prop="each.prop" :label="each.label" :key="index" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row[each.prop] }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    detailTableData: {
      type: Object
    },
    isHasSource: {
      type: Boolean
    }
  },
  data() {
    return {
      cols: [
        {
          prop: '',
          label: '本方',
          children: [
            {
              prop: 'leftDetails_docGenType',
              label: '本方单据大类'
            },
            {
              prop: 'leftDetails_docType',
              label: '本方单据类型'
            },
            {
              prop: 'leftDetails_docCode',
              label: '本方单据编号'
            },
            {
              prop: 'leftDetails_docDetailId',
              label: '本方单据行号'
            },
            {
              prop: 'leftDetails_amountCanVerify',
              label: '本方可核销金额'
            },
            {
              prop: 'leftDetails_verifiedAmount',
              label: '本方本次核销金额'
            }
          ]
        },
        {
            prop: '',
            label: '对方',
            children: [
                {
                    prop: 'rightDetails_docGenType',
                    label: '对方单据大类'
                },
                {
                    prop: 'rightDetails_docType',
                    label: '对方单据类型'
                },
                {
                    prop: 'rightDetails_docCode',
                    label: '对方单据编号'
                },
                {
                    prop: 'rightDetails_docDetailId',
                    label: '对方单据行号'
                },
                {
                    prop: 'rightDetails_amountCanVerify',
                    label: '对方可核销金额'
                },
                {
                    prop: 'rightDetails_verifiedAmount',
                    label: '对方本次核销金额'
                }
            ]
        }
      ],
      detailDataTemp: [],
      concatDetailData: []
    }
  },
  methods: {
    handleSelectionChange() {
    },
    handleSearchInvoice() {
    },
    handleRowClick(row, event, column) {
      console.log(row, event, column)
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
    getIndex(index) {
      console.log(index)
      return index
    }
  },
  watch: {
      detailTableData () {
          if (this.detailTableData.leftDetails) {
            let keyName, left = [], right = []
            // FIXME: 循环只取 leftDetails ，不严谨，应结合 rightDetails
            this.detailTableData.leftDetails.forEach((item, index) => {
                this.concatDetailData[index] = {}
                Object.keys(item).forEach(key => {
                    keyName = `leftDetails_${key}`
                    this.concatDetailData[index][keyName] = item[key]
                })
                Object.keys(this.detailTableData.rightDetails[index]).forEach(key => {
                    keyName = `rightDetails_${key}`
                    this.concatDetailData[index][keyName] = item[key]
                })
                this.concatDetailData[index].verificationType = this.detailTableData.verificationType
            })
            console.log(this.concatDetailData, 'concatDetailData concatDetailData concatDetailData concatDetailData')
        }
        // prop中需要深拷贝
        this.concatDetailData = Object.assign([], this.concatDetailData)
      }
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
