<template>
  <section class="container">
    <div class="billing-btn-group">
      <el-dropdown @command="handleCommand" trigger="click" ref="newDropDown">
        <el-button size="small" :plain="true" type="primary">
          新增
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
          <el-dropdown-item command='purchaseOrder'>采购订单</el-dropdown-item>
          <el-dropdown-item command='purchaseStorageOrder'>采购入库单</el-dropdown-item>
          <el-dropdown-item command=''>费用对账单</el-dropdown-item>
          <el-dropdown-item command='invoicing'>直接开票</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button size="small" :plain="true" type="primary" @click="handleSearchInvoice">查询发票</el-button>
      <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleDelete(selectionDataId)">删除</el-button>
      <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleSubmit(selectionDataId)">提交</el-button>
      <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleRecall(selectionDataId)">收回</el-button>
      <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleApprove(selectionDataId)">审批</el-button>
      <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleReject(selectionDataId)">驳回</el-button>
      <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleScan(selectionDataId)">驳回</el-button>
    </div>
    <section class="billing-wrapper">
      <h3 class="billing-header">单据</h3>
      <el-table ref="multipleTable" :data="invoiceListData" border tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange" @row-click="handleRowClick" :summary-method="getSummaries" show-summary highlight-current-row>
        <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
        <!-- <el-table-column header-align="center" align="left" min-width="100" prop="invoiceType" label="发票类型*"></el-table-column>
        <el-table-column header-align="center" align="center" min-width="100" prop="invoiceNum" label="发票号">
          <template slot-scope="scope">
            <a href="javascript:;">{{scope.row.invoiceNum}}</a>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" min-width="110" label="发票日期" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.invoiceDate }}</template>
        </el-table-column>
        <el-table-column header-align="center" min-width="100" prop="billingOrganization" label="开票组织" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="150" prop="shouldAccountingOrganization" label="*应收核算组织" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="100" prop="receivablesOrganization" label="*收款组织" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="100" prop="billingCustomer" label="开票客户" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="150" prop="shouldPayOrganization" label="*应付核算组织" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="100" prop="payOrganization" label="*付款组织" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="right" min-width="100" prop="unTaxAmount" label="*未税金额" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="right" min-width="100" prop="taxAmount" label="*税额" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="right" min-width="100" prop="contentTaxAmount" label="*含税金额" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="right" min-width="100" prop="amountReceivable" label="*应收金额" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="right" min-width="100" prop="amountCollected" label="*收款金额" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="100" prop="invoiceStatus" label="单据状态" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="center" min-width="100" prop="sourceDocumentType" label="来源单据" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="center" min-width="100" prop="sourceOddNumber" label="*来源单号" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="center" min-width="100" prop="sourceDate" label="*来源日期" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" min-width="100" prop="sourceOrganization" label="*来源组织" show-overflow-tooltip></el-table-column> -->
        <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop]}}</a>
            <span v-else-if="item.prop === 'invoiceStatus'">{{ scope.row[item.prop] | statusFormat }}</span>
            <span v-else-if="item.prop === 'invoiceType'">{{ scope.row[item.prop] | invoiceTypeFormat }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-pagination-content">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount">
        </el-pagination>
      </div>
    </section>
    <search-dialog @moreSeachDialog="dialogVisible.dialogMoreSearchVisible = true" :dialogTitle="dialogTitle" :dialogVisible="dialogVisible" :gridData="gridData" :subNavPath="subNavPath">
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="warning" @click="getInitialData">立即查询</el-button>
      </div>
    </search-dialog>
    <more-search :dialogVisible="dialogVisible" :gridData="gridData"></more-search>
    <tooltip name="purchaseInvoiceListTooltip">
      <el-button v-if="!isSubmitted && !isApproved" size="mini" @click="handleModify(invoiceOperationRowId)">修改</el-button>
      <el-button v-if="!isSubmitted && !isApproved" size="mini" @click="handleDelete(invoiceOperationRowId)">删除</el-button>
      <el-button v-if="!isSubmitted && !isApproved" size="mini" @click="handleSubmit(invoiceOperationRowId)">提交</el-button>
      <el-button v-if="isSubmitted || isApproved" size="mini" @click="handleApprove(invoiceOperationRowId)">审核</el-button>
      <el-button v-if="isSubmitted || isApproved" size="mini" @click="handleRecall(invoiceOperationRowId)">收回</el-button>
      <el-button v-if="isSubmitted || isApproved" size="mini" @click="handleReject(invoiceOperationRowId)">驳回</el-button>
      <el-button v-if="isSaved" size="mini" @click="handleScan(invoiceOperationRowId)">查看详情</el-button>
    </tooltip>
    <el-dialog
      :title="resultInfo.title"
      :visible.sync="dialogVisible.dialogResultVisible"
      size="tiny">
      <p>{{resultInfo.msg}}</p>
      <a v-if="resultInfo.isShowDetail" href="javascript:;">(查看发票)</a>
      <ul v-if="resultInfo.isShowDetail">
        <li v-for="(item, index) in resultInfo.detail" :key="index">{{item}}</li>
      </ul>
      <p v-if="resultInfo.isShowDetail">其他发票{{resultInfo.type}}成功</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible.dialogResultVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible.dialogResultVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import searchDialog from './SearchDialog'
import moreSearch from './MoreSearchDialog'
export default {
  data () {
    return {
      isFirstRender: true,
      invoiceListData: [
        {
          // invoiceType: '王小虎',
          // invoiceNum: '11223344',
          // invoiceDate: '2016-05-03',
          // billingOrganization: '开票组织',
          // shouldAccountingOrganization: '应收核算组织',
          // receivablesOrganization: '收款组织收款组织',
          // billingCustomer: '开票客户开票客户',
          // shouldPayOrganization: '应付核算组织',
          // payOrganization: '付款组织',
          // unTaxAmount: '未税金额',
          // taxAmount: '税额',
          // contentTaxAmount: '含税金额',
          // amountReceivable: '应收金额',
          // amountCollected: '收款金额',
          // invoiceStatus: '单据状态',
          // sourceDocumentType: '来源单据',
          // sourceOddNumber: '来源单号',
          // sourceDate: '来源日期',
          // sourceOrganization: '来源组织'
          createUser: 12,
          invoiceCategory: 2,
          invoiceMode: 2,
          invoiceType: 3,
          invoiceNum: '123',
          invoiceId: 999,
          invoiceDate: 112233445566,
          billingOrganization: '开票组织',
          billingCustomer: '开票客户',
          invoiceHeader: '发票抬头',
          currencyCode: '币种',
          taxNo: '税号测试更改',
          openingBank: '盛京银行',
          accountNumber: '112233',
          goldentaxNum: '金税票号xxxxx',
          customerAddress: '北京昌平区回龙观腾讯众创空间',
          contactWay: '联系电话',
          sourceDocumentType: '11',
          invoiceStatus: 1,
          remark: '备注呀，也不知道写点什么',
          updateUser: 21,
          invoiceInfoDetailList: [
            {
              valuationQuantity: 0,
              valuationUnit: 'string'
            },
            {
              valuationQuantity: 1,
              valuationUnit: 'string2'
            }
          ],
          isAlreadyGenerateEinvoice: true,
          isAlreadyGoldentaxRedNum: true,
          isAlreadyOpenControltax: true,
          isGoldentaxVoid: true,
          isInvoiceVoid: true,
          isRedRush: true
        },
        {
          createUser: 121,
          invoiceCategory: 2,
          invoiceMode: 2,
          invoiceType: 2,
          invoiceNum: '1123',
          invoiceId: 777,
          invoiceDate: 1122334455661,
          billingOrganization: '1开票组织',
          billingCustomer: '1开票客户',
          invoiceHeader: '1发票抬头',
          currencyCode: '1币种',
          taxNo: '1税号测试更改',
          openingBank: '1盛京银行',
          accountNumber: '1112233',
          goldentaxNum: '1金税票号xxxxx',
          customerAddress: '1北京昌平区回龙观腾讯众创空间',
          contactWay: '1联系电话',
          sourceDocumentType: '111',
          invoiceStatus: 7,
          remark: '1备注呀，也不知道写点什么',
          updateUser: 211,
          invoiceInfoDetailList: [
            {
              valuationQuantity: 11,
              valuationUnit: '1string'
            },
            {
              valuationQuantity: 11,
              valuationUnit: '1string2'
            }
          ],
          isAlreadyGenerateEinvoice: true,
          isAlreadyGoldentaxRedNum: true,
          isAlreadyOpenControltax: true,
          isGoldentaxVoid: true,
          isInvoiceVoid: true,
          isRedRush: true
        },
        {}
      ],
      cols: [
        {
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
          // prop: 'shouldAccountingOrganization',
          prop: 'id',
          label: '应收核算组织'
        },
        {
          // prop: 'receivablesOrganization',
          prop: 'invoiceId',
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
      dialogVisible: {
        dialogTableVisible: false,
        dialogMoreSearchVisible: false,
        dialogResultVisible: false
      },
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
      ],
      dialogTitle: '',
      tableSelect: '',
      subNavPath: 'costOrder',
      invoiceOperationRowId: {}, // 点击每行，选中的数据
      selectionData: [], // 点击多选框，选中的数据
      selectionDataId: {}, // 点击多选框，选中的数据的id
      pageCount: 30,
      pageSize: 10,
      currentPage: 1,
      isSaved: true, // rowclick后判断该条是否为保存状态
      isSubmitted: false, // rowclick后判断该条是否为提交状态
      isApproved: false, // rowclick后判断该条是否为审批状态
      noSelectedData: true,
      resultInfo: { // 失败结果信息
        type: '',
        title: '',
        msg: '',
        isShowDetail: false,
        detail: []
      }
    }
  },
  created () {
    // this.getInitialData()
    this.$nextTick(() => {
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'purchaseOrder') {
        this.dialogTitle = '采购订单'
        this.subNavPath = 'purchaseCostOrder'
      }
      if (command === 'purchaseStorageOrder') {
        this.dialogTitle = '采购入库单'
        this.subNavPath = 'purchaseCostOrder2'
      }
      if (command === 'invoicing') {
        this.$router.push({
          name: 'purchaseInvoicing',
          params: {
            subTitle: '开票',
            mode: 'new'
          }
        })
        return
      }
      this.dialogVisible.dialogTableVisible = true
    },
    // 修改操作
    handleModify () {
      // 将需要修改的数据放到store中，在修改界面取
      this.$store.dispatch('addSelectedData', {type: 'purchaseInvoice', id: [this.invoiceOperationData.invoiceId]})
      // 跳转到修改界面  mode判断是直接开票还是修改
      this.$router.push({
        name: 'purchaseInvoicing',
        params: {
          subTitle: `${this.invoiceOperationData.invoiceId}-修改`,
          mode: 'modify'
        }
      })
    },
    // 点击table每一行
    handleRowClick (row, event, column) {
      // 获取到当前行的数据并将 invoiceId 格式化成后台需要的格式
      this.invoiceOperationRowId = {invoiceIdList: [row.invoiceId]}
      this.invoiceOperationData = row
      // 如果点击的是发票号 跳转查看界面
      if (column.property === 'invoiceNum') {
        this.$store.dispatch('addSelectedData', {type: 'purchaseInvoice', id: [this.invoiceOperationData.invoiceId]})
        this.$router.push({
          name: 'purchaseInvoicing',
          params: {
            subTitle: '查看',
            mode: 'scan'
          }
        })
        return
      }
      // 判断当前行的数据是否为保存状态， 控制保存按钮是否可点击
      if (row.invoiceStatus !== 1) {
        this.isSaved = false
      } else {
        this.isSaved = true
      }
      // 判断当前发票是否为提交状态
      if (row.invoiceStatus !== 2) {
        this.isSubmitted = false
      } else {
        this.isSubmitted = true
      }
      // 判断当前发票是否为审核状态
      if (row.invoiceStatus !== 3) {
        this.isApproved = false
      } else {
        this.isApproved = true
      }
      console.log(row, event, column, this.isSaved)
      // 当点击目标为 checkbox 的时候 不弹出tooltip
      if (column.type !== 'selection') {
        this.$tooltip({
          top: event.clientY,
          left: event.clientX
        }, 'purchaseInvoiceListTooltip')
      }
    },
    // 切换 checkbox 的时候的事件， elementui 自带
    handleSelectionChange (selection) {
      this.selectionData = selection
      // 如果没有选中的数据 部分操作按钮置灰
      if (this.selectionData.length === 0) {
        this.noSelectedData = true
      } else {
        this.noSelectedData = false
      }
      // 获取到选中数据的 invoiceId，并格式化成接口所需数据格式
      this.selectionDataId.invoiceIdList = selection.map(item => {
        return item.invoiceId
      })
      console.log(selection, this.selectionDataId, 'selection')
    },
    // 查询发票按钮弹框
    handleSearchInvoice () {
      this.dialogVisible.dialogTableVisible = true
      this.dialogTitle = '查询'
      this.subNavPath = 'purchaseInvoice'
    },
    // 删除按钮操作
    handleDelete (selection) {
      console.log(selection)
      this.handleConfirmAction('删除').then(() => {
        this.$http.post(`/invoiceInfo/deleteInvoice/`, selection)
          .then(res => {
            // 处理返回结果
            this.handleResult(res, '删除', '已保存 已收回 已驳回')
            // 删除后重新拉去数据
            this.searchInvoiceList()
            this.getInvoiceListCount()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交按钮操作
    handleSubmit (selection) {
      this.handleConfirmAction('提交').then(() => {
        this.$http.post(`/invoiceInfo/invoiceCommit/`, selection)
        .then(res => {
          console.log(res, 'status change response')
          this.handleResult(res, '提交', '已保存 已收回 已驳回')
          this.searchInvoiceList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    // 收回按钮操作
    handleRecall (selection) {
      this.handleConfirmAction('收回').then(() => {
        this.$http.post(`/invoiceInfo/invoiceTakeBack/`, selection)
        .then(res => {
          this.handleResult(res, '收回', '已提交')
          this.searchInvoiceList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消收回'
        })
      })
    },
    // 审批按钮操作
    handleApprove (selection) {
      this.handleConfirmAction('审批').then(() => {
        this.$http.post(`/invoiceInfo/invoiceApprove/`, selection)
        .then(res => {
          this.handleResult(res, '审批', '已提交')
          this.searchInvoiceList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审批'
        })
      })
    },
    // 驳回按钮操作
    handleReject (selection) {
      console.log(selection)
      this.$prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$http.post(`/invoiceInfo/invoiceReject`, {
          ...selection,
          overruleReason: value
        }).then(res => {
          this.handleResult(res, '驳回', '已提交')
          this.searchInvoiceList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleScan (selection) {
      this.$store.dispatch('addSelectedData', {type: 'invoice', id: selection.invoiceIdList})
      this.$router.push({
        name: 'invoicing',
        params: {
          subTitle: `多条销售查看`,
          mode: 'scan'
        }
      })
    },
    // 每页数量改变后，触发事件， elementUI自带
    handleSizeChange (val) {
      this.pageSize = val
      this.searchInvoiceList()
    },
    // 切换页码触发事件， elementUI自带
    handleCurrentChange (val) {
      this.currentPage = val
      this.searchInvoiceList()
    },
    // 查询发票列表
    searchInvoiceList (searchCondition) {
      console.log(this.gridData, '查询条件 现在还没用得上')
      let searchData = {
        org: '开票组织',
        pageNum: this.pageSize * (this.currentPage - 1),
        pageSize: this.pageSize,
        invoiceCategory: 2
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
      console.log(searchData, 'searchData searchData')
      this.$http.post('/invoiceInfo/invoiceQuery', searchData).then(res => {
        if (res.data.status.statusCode === 0) {
          this.invoiceListData = res.data.result
          // 如果有合计行，需要增加一行空行占位，然后将合计行移到该行位置上
          this.invoiceListData.push({})
          // 每次操作成功 会重新拉取数据 此时将选中的数据清空
          this.invoiceOperationData = []
          // 拉取成功后，显示操作按钮
          if (this.isFirstRender) {
            this.isFirstRender = false
          }
        } else {
          this.$msgbox({
            title: '结果',
            message: '数据获取失败',
            type: 'error'
          })
        }
      })
    },
    // 查询发票列表总条数
    getInvoiceListCount () {
      this.$http.post(`/invoiceInfo/invoiceCount`, {
        org: '开票组织'
      }).then(res => {
        if (res.data.status.statusCode === 0) {
          this.pageCount = res.data.result
        } else {
          this.$msgbox({
            title: '结果',
            message: '获取数据失败',
            type: 'error'
          })
        }
      })
    },
    // 页面初始化查询/删除操作后查询 同时获取发票列表和总条数
    getInitialData (conditions) {
      Promise.all([this.searchInvoiceList(conditions), this.getInvoiceListCount()])
      .then(([invoiceList, pageCount]) => {
        // this.invoiceListData = invoiceList.data.result
        // this.pageCount = pageCount.data.result
        this.dialogVisible.dialogTableVisible = false
        this.$router.push({
          name: this.subNavPath
        })
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 结果处理
    handleResult (res, action, beforeStatus) {
      if (res.data.status.statusCode !== 0) {
        this.dialogVisible.dialogResultVisible = true
        this.resultInfo = {
          type: action,
          title: `${action}结果`,
          msg: res.data.result.length > 1 ? `单据号：${res.data.result[0].invoiceId} 等单据为非${beforeStatus}单据状态发票不可收回` : `非 ${beforeStatus} 状态下单据不可${action}`,
          isShowDetail: !!(res.data.result.length > 1),
          detail: res.data.result.map(item => item.invoiceId)
        }
      } else {
        this.$alert(`${action}成功`, `${action}结果`, {
          confirmButtonText: '确定'
        })
      }
    },
    // 处理结果前，确认提示
    handleConfirmAction (action) {
      return this.$confirm(`您确定要${action}当前选中发票吗？`, `${action}确认`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
    },
    // summaries
    getSummaries (param) {
      // columns: 表格的列 data: 请求到的数据
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => {
          if (typeof item[column.property] === 'number') {
            return item[column.property]
          }
        })
        if (values.length === 0) {
          sums[index] = ''
        } else {
          sums[index] = values.reduce((pre, cur) => {
            if (typeof cur === 'number') {
              return pre + cur
            } else {
              return pre
            }
          }, 0)
          if (sums[index] === 0) {
            sums[index] = ''
          }
        }
      })
      return sums
    }
  },
  components: {
    searchDialog,
    moreSearch
  }
}
</script>
