<template>
  <section class="invoicing billing-form-inline">
    <div class="billing-btn-group">
      <el-button size="small" :plain="true" type="primary" @click="invoicingSubmit">确认开票</el-button>
      <el-button size="small" :plain="true" type="primary">查询订单</el-button>
      <el-button size="small" :plain="true" type="primary">刷新</el-button>
      <el-button size="small" :plain="true" type="primary">取消</el-button>
    </div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="发票类型">
        <el-select v-model="formInline.invoiceType" placeholder="请选择发票类型">
          <el-option v-for="(option, index) in options" :label="option.label" :value="option.value" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开票方式">
        <el-select v-model="formInline.invoiceWay" placeholder="请选择开票方式">
          <el-option v-for="(option, index) in options" :label="option.label" :value="option.value" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票号">
        <el-input v-model="formInline.invoiceNum" placeholder="发票号"></el-input>
      </el-form-item>
      <el-form-item label="发票日期">
        <el-input v-model="formInline.invoiveDate" placeholder="发票日期"></el-input>
      </el-form-item>
      <el-form-item label="开票组织">
        <el-input v-model="formInline.billingOrganization" placeholder="开票组织"></el-input>
      </el-form-item>
      <el-form-item label="开票客户">
        <el-input v-model="formInline.billingCustomer" placeholder="开票客户"></el-input>
      </el-form-item>
      <el-form-item label="发票抬头">
        <el-input v-model="formInline.invoiceHeader" placeholder="发票抬头"></el-input>
      </el-form-item>
      <el-form-item label="币种">
        <el-input v-model="formInline.currencyCode" placeholder="币种"></el-input>
      </el-form-item>
      <el-form-item label="税号">
        <el-input v-model="formInline.taxNo" placeholder="税号"></el-input>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input v-model="formInline.openingBnak" placeholder="开户行"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formInline.taxNo" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="金税票号">
        <el-input v-model="formInline.goldentaxNum" placeholder="金税票号"></el-input>
      </el-form-item>
      <el-form-item label="客户地址" class="col-span-2">
        <el-input v-model="formInline.customerAddress" placeholder="客户地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formInline.contactWay" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="来源单据类型">
        <el-input v-model="formInline.sourceDocumentType" placeholder="来源单据类型"></el-input>
      </el-form-item>
      <el-form-item label="单据状态">
        <el-input v-model="formInline.invoiceStatus" placeholder="单据状态"></el-input>

        <el-popover ref="popover5" placement="right-start" v-model="popoverVisible">
          <h4 class="popover-header">单据状态</h4>
          <div class="popover-content">
            <section class="popover-content-item">
              <h5 class="popover-content-header">基本状态</h5>
              <p class="popover-content-row">单据状态：已保存</p>
              <p class="popover-content-row">
                <span>创建人：呵呵呵</span>
                <span>创建时间：2017-8-28</span>
              </p>
              <p class="popover-content-row">
                <span>最后修改人：哈哈哈</span>
                <span>最后修改时间：2017-8-28</span>
              </p>
            </section>
            <section class="popover-content-item">
              <h5 class="popover-content-header">作废</h5>
              <p class="popover-content-row">
                <el-checkbox v-model="checked">已作废</el-checkbox>
                <el-checkbox v-model="checked">金税作废</el-checkbox>
              </p>
              <p class="popover-content-row">
                <span>作废日期：2017-8-28</span>
                <span>作废人：啦啦啦</span>
              </p>
              <p class="popover-content-row">
                <span>作废原因：你猜</span>
                <span>最后修改时间：2017-8-28</span>
              </p>
            </section>
            <section class="popover-content-item">
              <h5 class="popover-content-header">其他状态</h5>
              <p class="popover-content-row">
                <el-checkbox v-model="checked">已冲红</el-checkbox>
                <el-checkbox v-model="checked">金税已开红票</el-checkbox>
                <el-checkbox v-model="checked">已生成电子发票</el-checkbox>
                <el-checkbox v-model="checked">已税控开票</el-checkbox>
              </p>
            </section>
          </div>
        </el-popover>
        <i class="fa fa-file-text-o" aria-hidden="true" v-popover:popover5></i>
      </el-form-item>
      <el-form-item label="备注" class="col-span-3">
        <el-input v-model="formInline.remarks" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <transition name="detail">
      <cost-order-detail v-if="isShowDetail"></cost-order-detail>
    </transition>
  </section>
</template>

<script>
import costOrderDetail from './CostOrderDetail'
export default {
  data () {
    return {
      formInline: {
        createUser: 12,
        invoiceCategory: 1,
        invoiceMode: 2,
        invoiceType: 3,
        invoiceNum: '123',
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
        invoiceStatus: '1',
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
      options: [{
        label: '增值税专用发票(蓝字)',
        value: '1'
      }, {
        label: '增值税专用发票(红字)',
        value: '2'
      }, {
        label: '增值税普通发票(蓝字)',
        value: '3'
      }, {
        label: '增值税普通发票(红字)',
        value: '4'
      }, {
        label: '通用普通发票',
        value: '5'
      }, {
        label: '其他票据',
        value: '6'
      }],
      popoverVisible: false,
      checked: true,
      isShowDetail: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.invoiceDate = new Date().getTime()
    })
  },
  methods: {
    onSubmit () {
      console.log(this.formInline, 'submit!')
    },
    invoicingSubmit () {
      this.$http.post('/invoiceInfo/save', this.formInline)
        .then(res => {
          console.log(res)
          if (res.data.status.statusCode > 100) {
            this.$message(res.data.status.statusReason)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    costOrderDetail
  }
}
</script>
