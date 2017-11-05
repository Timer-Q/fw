<template>
  <div v-if="isCache">
    <section class="invoicing billing-form-inline">
        <div class="billing-btn-group">
        <el-button size="small" :plain="true" type="primary" v-if="!isScan" @click="handleSave">保存</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="!isScan && !isModify" @click="handleSaveAndNew">保存并新增</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="!isScan" @click="dialogVisible.dialogUploadVisible = true">附件</el-button>
        <!-- <el-button size="small" :plain="true" type="primary" v-if="isModify" @click="handleAbandon">弃审</el-button> -->
        <el-button size="small" :plain="true" type="primary" v-if="isScan">新增</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleModify" v-if="isScan">修改</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleDelete" v-if="isScan">删除</el-button>
        <el-button size="small" :plain="true" type="primary" :disabled="multipleData.data.length <= 1" v-if="isScan" @click="switchData(-1)">上一个</el-button>
        <el-button size="small" :plain="true" type="primary" :disabled="multipleData.data.length <= 1" v-if="isScan" @click="switchData(1)">下一个</el-button>
        <el-dropdown @command="handleSubmitCommand" v-if="isScan" trigger="click" ref="submitDropdown">
            <el-button size="small" :plain="true" type="primary">
            提交操作
            <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
            <el-dropdown-item command='recallAndNext' :disabled="multipleData.data.length <= 1">收回并下一个</el-dropdown-item>
            <el-dropdown-item command='recall'>收回</el-dropdown-item>
            <el-dropdown-item command='submitAndNext' :disabled="multipleData.data.length <= 1">提交并下一个</el-dropdown-item>
            <el-dropdown-item command='submit'>提交</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleApproveCommand" v-if="isScan" trigger="click" ref="approveDropdown">
            <el-button size="small" :plain="true" type="primary">
            审批操作
            <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
            <el-dropdown-item command='abandon' >弃审</el-dropdown-item>
            <el-dropdown-item command='rejectAndNext' :disabled="multipleData.data.length <= 1">驳回并下一个</el-dropdown-item>
            <el-dropdown-item command='reject'>驳回</el-dropdown-item>
            <el-dropdown-item command='approveAndNext' :disabled="multipleData.data.length <= 1">审批并下一个</el-dropdown-item>
            <el-dropdown-item command='approve'>审批</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand" v-if="isScan">
            <el-button size="small" :plain="true" type="primary">
            操作
            <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
            <el-dropdown-item command="invalid" :disabled="formData.isInvoiceVoid">作废</el-dropdown-item>
            <el-dropdown-item command="redRush" :disabled="formData.isRedRush">红冲</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleUnionSearchCommand" v-if="isScan">
            <el-button size="small" :plain="true" type="primary">
            联查
            <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
            <el-dropdown-item command="searchCustomerStatus">查询客户状态</el-dropdown-item>
            <el-dropdown-item command="searchReceipt">查询收款单</el-dropdown-item>
            <el-dropdown-item command="searchUpstreamData">查询上游数据</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" :plain="true" type="primary" v-if="isScan" @click="dialogVisible.dialogUploadVisible = true">附件</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="isModify">参照增行</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="isScan">打印</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleCancle">取消</el-button>
        </div>
        <el-form :inline="true" :model="formData" :rules="VATComputed" ref="invoiceForm">
        <el-form-item label="发票类型" prop="invoiceType">
            <el-select v-model="formData.invoiceType" :disabled="isScan" placeholder="请选择发票类型">
            <el-option v-for="(option, index) in invoiceTypeOptions" :label="option.label" :value="option.value" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开票方式" prop="invoiceMode">
            <el-select v-model="formData.invoiceMode" :disabled="isScan" placeholder="请选择开票方式">
            <el-option v-for="(option, index) in invoiceModeOptions" :label="option.label" :value="option.value" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发票号" prop="invoiceNum">
            <el-input v-model="formData.invoiceNum" disabled :readonly="isScan" placeholder="发票号"></el-input>
        </el-form-item>
        <el-form-item label="发票日期" prop="standardDate">
            <el-date-picker
            v-model="formData.standardDate"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="开票组织" prop="billingOrganization">
            <el-input v-model="formData.billingOrganization" :disabled="isModify" :readonly="isScan" placeholder="开票组织"></el-input>
        </el-form-item>
        <el-form-item label="开票客户" prop="billingCustomer">
            <el-input v-model="formData.billingCustomer" :disabled="isModify" :readonly="isScan" placeholder="开票客户"></el-input>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceHeader">
            <el-input v-model="formData.invoiceHeader" :readonly="isScan" placeholder="发票抬头"></el-input>
        </el-form-item>
        <el-form-item label="币种" prop="currencyCode">
            <el-input v-model="formData.currencyCode" disabled :readonly="isScan" placeholder="币种"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxNo">
            <el-input v-model="formData.taxNo" :readonly="isScan" placeholder="税号"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="openingBank">
            <el-input v-model="formData.openingBank" :readonly="isScan" placeholder="开户行"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="accountNumber">
            <el-input v-model="formData.accountNumber" :readonly="isScan" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="金税票号" prop="goldentaxNum">
            <el-input v-model="formData.goldentaxNum" :readonly="isScan" placeholder="金税票号"></el-input>
        </el-form-item>
        <el-form-item label="客户地址" prop="customerAddress" class="col-span-2">
            <el-input v-model="formData.customerAddress" :readonly="isScan" placeholder="客户地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactWay">
            <el-input v-model="formData.contactWay" :readonly="isScan" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="来源单据类型" prop="sourceDocumentType">
            <el-input v-model="formData.sourceDocumentType" :readonly="isScan" placeholder="来源单据类型"></el-input>
        </el-form-item>
        <el-form-item label="单据状态" prop="invoiceStatus">
            <el-input v-model="invoiceStatus" disabled :readonly="isScan" placeholder="单据状态"></el-input>

            <el-popover ref="popover5" placement="right-start" v-model="popoverVisible">
            <h4 class="popover-header">单据状态</h4>
            <div class="popover-content">
                <section class="popover-content-item">
                <h5 class="popover-content-header">基本状态</h5>
                <p class="popover-content-row">单据状态：{{invoiceStatus}}</p>
                <p class="popover-content-row">
                    <span>创建人：{{formData.createUser}}</span>
                    <span>创建时间：{{formData.createTime}}</span>
                </p>
                <p class="popover-content-row">
                    <span>最后修改人：{{formData.updateUser}}</span>
                    <span>最后修改时间：{{formData.updateTime}}</span>
                </p>
                </section>
                <section class="popover-content-item">
                <h5 class="popover-content-header">作废</h5>
                <p class="popover-content-row">
                    <el-checkbox v-model="formData.isInvoiceVoid">已作废</el-checkbox>
                    <el-checkbox v-model="formData.isGoldentaxVoid">金税作废</el-checkbox>
                </p>
                <p class="popover-content-row">
                    <span>作废日期：{{formData.invalidDate}}</span>
                    <span>作废人：{{formData.invalidPerson}}</span>
                </p>
                <p class="popover-content-row">
                    <span>作废原因：{{formData.invalidReason}}</span>
                </p>
                </section>
                <section class="popover-content-item">
                <h5 class="popover-content-header">其他状态</h5>
                <p class="popover-content-row">
                    <el-checkbox v-model="formData.isRedRush">已红冲</el-checkbox>
                    <el-checkbox v-model="formData.isAlreadyGoldentaxRedNum">金税已开红票</el-checkbox>
                    <el-checkbox v-model="formData.isAlreadyGenerateEinvoice">已生成电子发票</el-checkbox>
                    <el-checkbox v-model="formData.isAlreadyOpenControltax">已税控开票</el-checkbox>
                </p>
                </section>
            </div>
            </el-popover>
            <i class="fa fa-file-text-o" aria-hidden="true" v-popover:popover5></i>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="col-span-3">
            <el-input v-model="formData.remark" :readonly="isScan" placeholder="备注"></el-input>
        </el-form-item>
        </el-form>
        <transition name="detail">
        <invoicing-detail v-if="isShowDetail" :isHasSource="isModify || isScan" :detailTableData="formData.invoiceInfoDetailList"></invoicing-detail>
        </transition>
        <upload-dialog :dialogVisible="dialogVisible"></upload-dialog>
    </section>
  </div>
</template>

<script>
import invoicingDetail from './InvoicingDetail'
import uploadDialog from './uploadFileDialog'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCache: true,
      formData: {},
      formDataTemp: {
        createUser: 12,
        invoiceCategory: 1,
        invoiceMode: 1,
        invoiceType: 1,
        invoiceNum: `new${new Date().getTime()}`,
        invoiceDate: new Date().getTime(),
        createTime: new Date().getTime(),
        currencyCode: 'bizzhong',
        invoiceStatus: 1,
        invoiceInfoDetailList: [
          {}
        ],
        isAlreadyGenerateEinvoice: false,
        isAlreadyGoldentaxRedNum: false,
        isAlreadyOpenControltax: false,
        standardDate: ''
        // billingOrganization: '开票组织',
        // billingCustomer: '开票客户',
        // invoiceHeader: '发票抬头',
        // taxNo: '税号测试更改',
        // openingBank: '盛京银行',
        // accountNumber: '112233',
        // goldentaxNum: '金税票号xxxxx',
        // customerAddress: '北京昌平区回龙观腾讯众创空间',
        // contactWay: '联系电话',
        // sourceDocumentType: '11',
        // remark: '备注呀，也不知道写点什么',
        // updateUser: 21
        // isGoldentaxVoid: true,
        // isInvoiceVoid: true,
        // isRedRush: true
      },
      invoiceTypeOptions: [
        {
          label: '增值税专用发票(蓝字)',
          value: 1
        }, {
          label: '增值税专用发票(红字)',
          value: 2
        }, {
          label: '增值税普通发票(蓝字)',
          value: 3
        }, {
          label: '增值税普通发票(红字)',
          value: 4
        }, {
          label: '通用普通发票',
          value: 5
        }, {
          label: '其他票据',
          value: '6'
        }
      ],
      invoiceModeOptions: [
        {
          label: '税控开票',
          value: 1
        }, {
          label: '机打开票',
          value: 2
        }, {
          label: '电子发票',
          value: 3
        }, {
          label: '手工开票',
          value: 4
        }
      ],
      rules: {
        invoiceType: [
          { type: 'number', required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        invoiceMode: [
          { type: 'number', required: true, message: '请选择开票方式', trigger: 'change' }
        ],
        invoiceNum: [
          { required: true, trigger: 'blur' }
        ],
        invoiceDate: [
          { type: 'number', required: true, message: '请填写发票时间', trigger: 'blur' }
        ],
        billingOrganization: [
          { required: true, message: '请填写开票组织', trigger: 'blur' }
        ],
        billingCustomer: [
          { required: true, message: '请填写开票客户', trigger: 'blur' }
        ],
        invoiceHeader: [
          { required: true, message: '请填写发票抬头', trigger: 'blur' }
        ],
        currencyCode: [ // isVAT
          { required: true, message: '请填写币种', trigger: 'blur', VATFlag: true }
        ],
        taxNo: [
          { required: true, message: '请填写税号', trigger: 'blur', VATFlag: true }
        ],
        openingBank: [
          { required: true, message: '请填写开户行', trigger: 'blur', VATFlag: true }
        ],
        accountNumber: [
          { required: true, message: '请填写账号', trigger: 'blur', VATFlag: true }
        ],
        goldentaxNum: [
          { trigger: 'blur' }
        ],
        customerAddress: [
          { required: true, message: '请填写客户地址', trigger: 'blur', VATFlag: true }
        ],
        contactWay: [ // isVAR
          { required: true, message: '请填写联系方式', trigger: 'blur', VATFlag: true }
        ],
        sourceDocumentType: [
          { required: true, message: '请填写来源单据类型', trigger: 'blur' }
        ],
        invoiceStatus: [
          { type: 'number', required: true, message: '请填写单据状态', trigger: 'blur' }
        ],
        remark: [
          { message: '请填写备注', trigger: 'blur' },
          {max: 30, message: '长度不能超过30个字符', trigger: 'blur'}
        ]
      },
      handleSave: {},
      popoverVisible: false,
      checked: true,
      isShowDetail: true,
      isModify: false, // 判断是否位直接开票，用于显示/隐藏按钮
      isVAT: true, // 是否为增值税发票，用于判断字段是否可空
      dialogVisible: {
        dialogUploadVisible: false
      },
      isScan: true, // 如果是查看，form变为只读
      multipleData: {
        data: [],
        index: 0
      } // 多条数据
    }
  },
  created () {
    this.$nextTick(() => {
      this.getIntialData()
    })
  },
  activated () {
    this.getIntialData()
    console.log(this.formData)
  },
  deactivated () {
    console.log(this.$refs.invoiceForm)
    // this.$refs.invoiceForm.resetFields()
  },
  methods: {
    onSubmit () {
    },
    handleModify () {
      this.isScan = false
    },
    invoicingSubmit (cb) {
      this.formData.invoiceDate = new Date(this.formData.standardDate).getTime()
      console.log(this.formData, 'save form data')
      this.$refs.invoiceForm.validate((valid) => {
        if (valid) {
          this.$http.post('/invoiceInfo/save', this.formData)
            .then(res => {
              console.log(res)
              cb && cb()
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    initFormData () {
      this.formData = this.formDataTemp
    },
    handleSaveAndNew () {
      this.invoicingSubmit(this.initFormData)
    },
    invoicingUpdate () {
      this.formData.invoiceDate = new Date(this.formData.standardDate).getTime()
      console.log(this.formData, 'update form data')
      this.$refs.invoiceForm.validate((valid) => {
        if (valid) {
          this.$http.post('/invoiceInfo/invoiceUpdate', this.formData)
            .then(res => {
              if (res.data.status.statusCode !== 0) {
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 弃审操作
    handleAbandon () {
      this.$http.post(`/invoiceInfo/invoiceAbandon/`, {
        invoiceIdList: [this.formData.invoiceId || this.formData.id]
      }).then(res => {
        this.handleResult(res)
      })
      .catch(error => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    // 作废操作
    handleInvalid () {
      this.$prompt('请输入作废原因', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(({ value }) => {
        this.$http.post(`/invoiceInfo/invoiceInvalid/`, {
          invoiceIdList: [this.formData.invoiceId || this.formData.id],
          invalidReason: value
        }).then(res => {
          this.handleResult(res, '作废')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 红冲操作
    handleRedRush () {
      this.$http.post(`/invoiceInfo/invoiceRedRush`, {
        invoiceIdList: [this.formData.invoiceId || this.formData.id]
      }).then(res => {
        this.handleResult(res, '红冲')
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    // 收回操作
    handleRecall () {
      this.$http.post('/invoiceInfo/invoiceTakeBack/', {
        invoiceIdList: [this.formData.invoiceId || this.formData.id]
      }).then(res => {
        this.handleResult(res, '收回')
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    // 提交操作
    handleSubmit () {
      this.$http.post('/invoiceInfo/invoiceCommit/', {
        invoiceIdList: [this.formData.invoiceId || this.formData.id]
      }).then(res => {
        this.handleResult(res, '提交')
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    // 驳回操作
    handleReject () {
      this.$prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$http.post(`/invoiceInfo/invoiceReject`, {
          invoiceIdList: [this.formData.invoiceId || this.formData.id],
          overruleReason: value
        }).then(res => {
          this.handleResult(res, '驳回')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 审批操作
    handleApprove () {
      this.$http.post('/invoiceInfo/invoiceApprove', {
        invoiceIdList: [this.formData.invoiceId || this.formData.id]
      }).then(res => {
        this.handleResult(res)
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    // 删除操作
    handleDelete () {
      this.$msgbox({
        title: '删除确认',
        message: '此操作将永久删除数据, 是否继续?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/invoiceInfo/deleteInvoice', {
          invoiceIdList: [this.formData.invoiceId || this.formData.id]
        }).then(res => {
          this.handleResult(res, '删除')
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '取消删除'
        })
      })
    },
    // 取消操作
    handleCancle (cb) {
      // todo 如未保存 弹窗提示
      this.$confirm('是否取消操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData = {}
        this.$message({
          type: 'success',
          message: '取消成功!'
        })
        cb && cb()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '未取消'
        })
      })
    },
    // '操作'下拉框
    handleCommand (command) {
      if (command === 'invalid') {
        this.handleInvalid()
      }
      if (command === 'redRush') {
        this.handleRedRush()
      }
    },
    // 提交操作
    handleSubmitCommand (command) {
      if (command === 'recall') {
        this.handleRecall()
      }
      if (command === 'recallAndNext') {
        this.handleRecall(this.switchData(1))
      }
      if (command === 'submit') {
        this.handleSubmit()
      }
      if (command === 'submitAndNext') {
        this.handleSubmit(this.switchData(1))
      }
    },
    // 审批操作
    handleApproveCommand (command) {
      if (command === 'abandon') {
        this.handleAbandon()
      }
      if (command === 'rejectAndNext') {
        this.handleReject()
      }
      if (command === 'reject') {
        this.handleReject()
      }
      if (command === 'approveAndNext') {
        this.handleApprove()
      }
      if (command === 'approve') {
        this.handleApprove()
      }
    },
    // 联查
    handleUnionSearchCommand (command) {
      if (command === 'searchCustomerStatus') {
        console.log('查询客户状态')
      }
      if (command === 'searchReceipt') {
        console.log('查询收款单')
      }
      if (command === 'searchUpstreamData') {
        console.log('查询上游数据')
      }
    },
    getIntialData () {
      // 如果是 修改 ，从store中获取data
      let modeParam = this.$route.params.mode
      if (modeParam === 'modify' || modeParam === 'scan') {
        // 浏览状态切换form是否可写
        if (modeParam === 'scan') {
          this.isModify = false
          this.isScan = true
        } else {
          this.isModify = true
          this.isScan = false
        }
        this.getSelectedData.some(item => {
          if (item.type === 'invoice') {
            this.formData.id = item.id[0]
            this.multipleData.data = item.id
            return true
          }
        })
        console.log(this.formData, this.getSelectedData, 'invoicing formData')
        this.getDataById()
        if (!this.formData.invoiceInfoDetailList) {
          this.formData.invoiceInfoDetailList = []
        }
        // 保存按钮调用更新接口
        this.handleSave = this.invoicingUpdate
      } else {
        this.isModify = false
        this.isScan = false
        this.formData = { ...this.formDataTemp }
        this.$set(this.formData, 'standardDate', new Date())
        // 保存按钮调用保存（新建）接口
        this.handleSave = this.invoicingSubmit
      }
    },
    // 根据 invoiceId 查询发票信息
    getDataById (id) {
      this.$http.post('/invoiceInfo/invoiceSelectOne', {
        id: id || this.formData.invoiceId || this.formData.id
      }).then(res => {
        this.formData = res.data.result
        this.$set(this.formData, 'standardDate', new Date(this.formData.invoiceDate))
      })
    },
    handleResult (res, action) {
      let resultMsg = []
      if (res.data.status.statusCode === 0) {
        resultMsg.message = `${action}成功`
        resultMsg.type = 'success'
      } else if (res.data.result && res.data.result.length > 0) {
        resultMsg.message = `${res.data.result[0].errorMessage}`
        resultMsg.type = 'error'
      } else {
        resultMsg.message = `${res.data.status.statusReason}`
        resultMsg.type = 'error'
      }
      this.$msgbox({
        title: `${action}结果`,
        message: resultMsg.message,
        type: resultMsg.type
      }).then(() => {
        if (action === '删除') {
          this.formData = {}
        } else {
          this.getDataById(this.multipleData.data[this.multipleData.index])
        }
      })
    },
    switchData (val) {
      this.multipleData.index += val
      let length = this.multipleData.data.length
      if (this.multipleData.index < 0) {
        this.multipleData.index = length + this.multipleData.index
      }
      if (this.multipleData.index > length - 1) {
        this.multipleData.index = this.multipleData.index % (length - 1) - 1
      }
      this.getDataById(this.multipleData.data[this.multipleData.index])
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedData',
      'getNavData'
    ]),
    // 映射发票状态
    invoiceStatus () {
      switch (this.formData.invoiceStatus) {
        case 1:
          return '已保存'
        case 2:
          return '已提交'
        case 3:
          return '已审核'
        case 4:
          return '已驳回'
        case 5:
          return '已回收'
        case 6:
          return '已作废'
        case 7:
          return '已红冲'
        default:
          return '不知道呢'
      }
    },
    // 判断所选 发票类型 是否为增值税发票
    VATComputed () {
      Object.keys(this.rules).forEach(key => {
        // 判断当前规则是否受 增值税发票 影响
        if (this.rules[key][0].VATFlag) {
          // 判断发票类型 <5 为增值税发票
          if (this.formData.invoiceType < 5) {
            // this.$set(this.rules[key], this.rules[key][0].required, true)
            // 设置校验规则为 必输项
            this.rules[key][0].required = true
          } else {
            // this.$set(this.rules[key], this.rules[key][0].required, false)
            this.rules[key][0].required = false
          }
        }
      })
      return this.rules
    }
  },
  components: {
    invoicingDetail,
    uploadDialog
  }
}
</script>

<style lang="less">
  .billing-form-inline {
    .el-form {
      padding: 15px;
    }
    .el-form-item {
      margin-right: 40px;
      margin-bottom: 10px;
    }
    .el-form-item__label {
      font-size: 12px;
      padding-right: 10px;
      width: 90px;
      color: #333;
    }
    .el-input__inner {
      display: inline-block;
      box-sizing: border-box;
      width: 160px;
      height: 30px;
      font-size: 12px;
      border-radius: 0;
    }
    .el-form-item__content {
      position: relative;
      .fa {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    .col-span-2 {
      .el-input__inner {
        width: 455px;
      }
    }
    .col-span-3 {
      .el-input__inner {
        width: 750px;
      }
    }
    .el-form-item.is-required .el-form-item__label:before {
      display: none;
    }
    .el-form-item__error {
      padding-top: 0;
    }
  }
  .el-popover {
    padding: 0;
    width: 37.5%;
    .popover-header {
      margin: 0;
      padding: 10px;
      background: #49b1df;
      font-size: 12px;
      font-weight: 400;
      color: #fff;
    }
    .popover-content {
      padding: 0 10px;
    }
    .popover-content-item {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .popover-content-item:last-child {
      border-bottom: none;
    }
    .popover-content-row {
      .el-checkbox__label {
        font-size: 12px;
      }
      & > span {
        display: inline-block;
        min-width: 45%;
      }
    }
    .popover-content-header {
      margin: 0;
      color: #3bb6ec;
      font-size: 12px;
      font-weight: 400;
    }
    .popper__arrow::after {
      border-right-color: #49b1df !important;
    }
  }
</style>

