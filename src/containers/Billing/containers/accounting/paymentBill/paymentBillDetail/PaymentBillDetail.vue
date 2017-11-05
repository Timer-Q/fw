<template>
    <section class="invoicing billing-form-inline">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" v-if="!isScan" @click="handleSave">保存</el-button>
            <el-button size="small" :plain="true" type="primary" v-if="!isScan && !isModify" @click="handleSaveAndNew">保存并新增</el-button>
            <el-button size="small" :plain="true" type="primary" v-if="!isScan" @click="dialogVisible.dialogUploadVisible = true">附件</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleModify" :disabled="billStatus !== 'SRR'" v-if="isScan">修改</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleDelete" :disabled="billStatus !== 'SRR'" v-if="isScan">删除</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleSubmit" :disabled="billStatus !== 'SRR'" v-if="isScan">提交</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleRecall" :disabled="billStatus !== 'Submit'" v-if="isScan">收回</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleApprove" :disabled="billStatus !== 'Submit'" v-if="isScan">审批</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleCancleApprove" :disabled="billStatus !== 'Approve'" v-if="isScan">弃审</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleReject" :disabled="billStatus !== 'Submit'" v-if="isScan">驳回</el-button>
            <!-- 联查 -->
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
            <el-button size="small" :plain="true" type="primary" @click="handleSuspend" :disabled="billStatus !== 'Approve' || formData.isSuspend" v-if="isScan">挂起</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleCancleSuspend" :disabled="billStatus !== 'Approve' || !formData.isSuspend" v-if="isScan">取消挂起</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleInvalid" :disabled="billStatus !== 'Approve'" v-if="isScan">作废</el-button>
            <!-- 支付 -->
            <el-dropdown @command="handleUnionSearchCommand" v-if="isScan">
                <el-button size="small" :plain="true" type="primary">
                    支付操作
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                    <el-dropdown-item disabled command="searchCustomerStatus">支付</el-dropdown-item>
                    <el-dropdown-item disabled command="searchReceipt">重新支付</el-dropdown-item>
                    <el-dropdown-item disabled command="searchUpstreamData">取消支付</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" :plain="true" type="primary" v-if="isScan" @click="dialogVisible.dialogUploadVisible = true">附件</el-button>
            <el-button size="small" :plain="true" type="primary" v-if="isScan">打印</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleCancle">取消</el-button>
        </div>
        <el-form :inline="true" :model="formData" :rules="VATComputed" ref="paymentBillDetalForm">
            <el-form-item label="付款组织" prop="payOriginazation">
                <el-select v-model="formData.payOriginazation" :disabled="isScan || isWithSource" placeholder="请选择付款组织">
                    <el-option v-for="(option, index) in payOriginazationOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款单类型" prop="payType">
                <el-select v-model="formData.payType" :disabled="isScan || isWithSource" placeholder="请选择付款单类型">
                    <el-option v-for="(option, index) in payTypeOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款单编号" prop="payCode">
                <el-input v-model="formData.payCode" disabled placeholder="请输入付款单编号"></el-input>
            </el-form-item>
            <el-form-item label="单据日期" prop="billTime">
                <el-date-picker v-model="formData.billTime" :disabled="isScan" type="date" placeholder="选择日期" :clearable="false">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="来源单据类型" prop="sourceBillType">
                <el-input v-model="formData.sourceBillType" disabled placeholder="来源单据类型"></el-input>
            </el-form-item>
            <el-form-item label="往来对象类型" prop="currentObjectType">
                <el-select v-model="formData.currentObjectType" :disabled="isScan || isWidthSource" placeholder="请选择往来对象类型">
                    <el-option v-for="(option, index) in currentObjectTypeOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收款客户" prop="receivingCustomer">
                <el-select v-model="formData.receivingCustomer" :disabled="isScan || isWidthSource" placeholder="请选择收款客户">
                    <el-option v-for="(option, index) in receivingCustomerOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款类型" prop="payType">
                <el-select v-model="formData.payType" :disabled="isScan" placeholder="请选择付款类型">
                    <el-option v-for="(option, index) in payTypeOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结算方式" prop="clearingForm">
                <el-select v-model="formData.clearingForm" :disabled="isScan" placeholder="请选择结算方式" @change="clearingFormSelectChange">
                    <el-option v-for="(option, index) in clearingFormOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="币种" prop="currency">
                <el-select v-model="formData.currency" disabled placeholder="请选择币种">
                    <el-option v-for="(option, index) in currencyOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款银行账户" prop="payBankAccount">
                <el-select v-model="formData.payBankAccount" :disabled="isScan" placeholder="请选择付款银行账户">
                    <el-option v-for="(option, index) in payBankAccountOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收款银行账户" prop="receivingBankAccount">
                <el-select v-model="formData.receivingBankAccount" :disabled="isScan" placeholder="请选择收款银行账户">
                    <el-option v-for="(option, index) in receivingBankAccountOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单据状态" prop="billStatus">
                <el-input v-model="formData.billStatus" disabled placeholder="请输入单据状态"></el-input>
            </el-form-item>
            <el-form-item label="所属业务员" prop="subordinateClert">
                <el-select v-model="formData.subordinateClert" :disabled="isScan" placeholder="请选择所属业务员">
                    <el-option v-for="(option, index) in subordinateClertOptions" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
                <el-input v-model="formData.department" disabled placeholder="请输入所属部门"></el-input>
            </el-form-item>
            <el-form-item label="手续费" prop="serviceCharge">
                <el-input v-model="formData.serviceCharge" :readonly="isScan" placeholder="请输入手续费"></el-input>
            </el-form-item>
            <el-form-item label="实付金额" prop="amountPaid">
                <el-input v-model="formData.amountPaid" disabled placeholder="请输入实付金额"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark" class="col-span-2">
                <el-input v-model="formData.remark" :readonly="isScan" placeholder="备注" :maxlength="30"></el-input>
            </el-form-item>
        </el-form>
        <transition name="detail">
            <sub-detail v-if="isShowDetail" :isHasSource="isWithSource" :detailTableData="detailTableData"></sub-detail>
        </transition>
        <upload-dialog :dialogVisible="dialogVisible"></upload-dialog>
        <slider size="small" headerName="hehe" v-if="isModify || isScan">
            <div>
                kkkkkkkkkkkkkkkkkkkkkk
            </div>
        </slider>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
// components
import slider from '@Billing/components/SelectionSlider.vue'
import subDetail from './SubDetail'
import uploadDialog from './UploadFileDialog'
// service
import paymentBillService from '@Billing/services/paymentBillService'
export default {
    props: {
        tabType: {
            type: String,
            default: 'new'
        },
        tabState: {
            type: Object,
            default: {}
        },
        tabAttr: {
            type: Object,
            default: {}
        }
    },
    data () {
        var numberValidate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手续费不能为空'))
            } else if (!/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
                return callback(new Error('手续费为非负整数或小数'))
            } else {
                callback()
            }
        }
        return {
            formData: {},
            formDataTemp: {
                createUser: 12,
                payOriginazation: 1,
                payCode: `new${new Date().getTime()}`,
                createTime: new Date().getTime(),
                payType: '1',
                serviceCharge: '1',
                invoiceInfoDetailList: [
                    {}
                ],
                isAlreadyGenerateEinvoice: false,
                isAlreadyGoldentaxRedNum: false,
                isAlreadyOpenControltax: false,
                billTime: new Date().getTime(),
                sourceBillType: '手工创建',
                receivingCustomer: '1',
                currentObjectType: 'SUPLIER',
                clearingForm: '1',
                currency: '1',
                payBankAccount: '1',
                receivingBankAccount: '1',
                subordinateClert: '1'
            },
            payOriginazationOptions: [ // 付款组织 options
                {
                    label: '付款组织1',
                    value: 1
                }, {
                    label: '付款组织2',
                    value: 2
                }, {
                    label: '付款组织3',
                    value: 3
                }
            ],
            payTypeOptions: [ // 付款单类型
                {
                    label: '销售收款单',
                    value: '1'
                }
            ],
            clearingFormOptions: [ // 结算方式 options
                {
                    label: '现金',
                    value: '1'
                },
                {
                    label: '支票',
                    value: '2'
                },
                {
                    label: '电汇',
                    value: '3'
                }
            ],
            currencyOptions: [
                {
                    label: '人民币',
                    value: '1'
                }
            ],
            currentObjectTypeOptions: [ // 往来对象类型 options
                {
                    label: '供应商',
                    value: 'SUPLIER'
                },
                {
                    label: '客户',
                    value: 'CUSTOMNER'
                },
                {
                    label: '部门',
                    value: 'DEPARTMENT'
                },
                {
                    label: '成员',
                    value: 'MEMBER'
                }
            ],
            receivingCustomerOptions: [
                {
                    label: '大爷，来玩嘛',
                    value: '1'
                }
            ],
            payBankAccountOptions: [ // 付款银行账户 options
                {
                    value: '1',
                    label: '付款银行账户'
                }
            ],
            receivingBankAccountOptions: [ // 收款银行账户 options
                {
                    value: '1',
                    label: '收款银行账户'
                }
            ],
            subordinateClertOptions: [ // 所属业务员 options
                {
                    value: '1',
                    label: '所属业务员'
                }
            ],
            rules: {
                payOriginazation: [
                    { type: 'number', required: true, message: '请选择付款组织', trigger: 'change' }
                ],
                payType: [
                    { type: 'string', required: true, message: '请选择付款单类型', trigger: 'change' }
                ],
                payCode: [
                    { required: true, trigger: 'blur' }
                ],
                billTime: [
                    { type: 'date', required: true, message: '请填写单据日期', trigger: 'change' }
                ],
                sourceBillType: [
                    { required: true, message: '请填写开票组织', trigger: 'blur' }
                ],
                currentObjectType: [
                    { type: 'string', required: true, message: '请填写往来对象类型', trigger: 'change' }
                ],
                receivingCustomer: [
                    { type: 'string', required: true, message: '请填写收款客户', trigger: 'change' }
                ],
                payTypeName: [ // isVAT
                    { required: true, message: '请填写币种', trigger: 'blur', VATFlag: true }
                ],
                clearingForm: [
                    { type: 'string', required: true, message: '请填写结算方式', trigger: 'change', VATFlag: true }
                ],
                currency: [
                    { type: 'string', required: true, message: '请填写币种', trigger: 'change', VATFlag: true }
                ],
                payBankAccount: [
                    { type: 'string', required: true, message: '请填写付款银行账户', trigger: 'change', VATFlag: true }
                ],
                receivingBankAccount: [
                    { type: 'string', required: true, message: '请填写收款银行账户', trigger: 'change', VATFlag: true }
                ],
                billStatus: [
                    { type: 'string', required: true, message: '请填写单据状态', trigger: 'blur', VATFlag: true }
                ],
                subordinateClert: [ // isVAR
                    { type: 'string', required: true, message: '请填写所属业务员', trigger: 'change', VATFlag: true }
                ],
                department: [
                    { type: 'string', required: true, message: '请填写所属部门', trigger: 'blur' }
                ],
                serviceCharge: [
                    { validator: numberValidate, required: true, trigger: 'blur' }
                ],
                remark: [
                    { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
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
            detailTableData: [],
            isScan: true, // 如果是查看，form变为只读
            multipleData: {
                data: [],
                index: 0
            }, // 多条数据
            isWithSource: false // 是否有源
        }
    },
    methods: {
        handleModify () {
            this.addTab(`${this.formData.payCode}-修改`, `${this.formData.payCode}-modify`, 'modify', 'payment-bill-detail')
        },
        initFormData () {
            this.formData = this.formDataTemp
        },
        handleSaveAndNew () {
            this.paymentBillNew(this.initFormData)
        },
        clearingFormSelectChange() {
            // FIXME:
        },
        // 新增
        async paymentBillNew (cb) {
            console.log(this.formData, 'save form data')
            this.$refs.paymentBillDetalForm.validate(async (valid) => {
                if (valid) {
                    try {
                        let response = await paymentBillService.createWithoutSource(this.formData)
                        if (response.status.statusCode === 0) {
                            this.$message('保存成功')
                        } else {
                            this.$message('保存失败')
                        }
                        cb && cb()
                    } catch (error) {
                        console.log(error, 'createWithoutSource response error')
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 修改/更新
        async paymentBillUpdate () {
            console.log(this.formData, 'update form data')
            this.$refs.paymentBillDetalForm.validate(async (valid) => {
                if (valid) {
                    try {
                        let response = await paymentBillService.createWithSource(this.formData)
                        if (response.status.statusCode === 0) {
                            this.$message('修改成功')
                        } else {
                            this.$message('修改失败')
                        }
                    } catch (error) {
                        console.error(error, 'createWithSource response error')
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 作废操作
        async handleInvalid () {
            this.$prompt('请输入作废原因', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            }).then(async ({ value }) => {
                try {
                    let response = await paymentBillService.invalidById({ id: this.formData.id, invalidReason: value })
                    this.handleResult(response, '作废')
                } catch (error) {
                    console.error(error, 'paymentBillDetail invalidById error')
                }
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
                invoiceIdList: [ this.formData.invoiceId || this.formData.id ]
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
        async handleRecall () {
            this.secodeConfirmPop('是否收回?', '收回')
                .then(async () => {
                    try {
                        let response = await paymentBillService.takebackById({ id: this.formData.id })
                        this.handleResult(response, '收回')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail takebackById error')
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 提交操作
        async handleSubmit () {
            this.secodeConfirmPop('是否提交', '提交')
                .then(async () => {
                    try {
                        let response = await paymentBillService.submitById({ id: this.formData.id })
                        this.handleResult(response, '提交')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail submitById error')
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 驳回操作
        async handleReject () {
            this.$prompt('请输入驳回原因', '驳回提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async ({ value }) => {
                try {
                    let response = await paymentBillService.rejectById({ id: this.formData.id, rejectReason: value })
                    this.handleResult(response, '审批')
                } catch (error) {
                    console.error(error, 'paymentBillDetail rejectById error')
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 审批操作
        async handleApprove () {
            this.secodeConfirmPop('是否审批?', '审批')
                .then(async () => {
                    try {
                        let response = await paymentBillService.approveById({ id: this.formData.id })
                        this.handleResult(response, '审批')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail approveById error')
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 弃审 / 取消审批
        async handleCancleApprove () {
            this.secodeConfirmPop('是否取消审批?', '取消审批')
                .then(async () => {
                    try {
                        let response = await paymentBillService.cancleApproveById({ id: this.formData.id })
                        this.handleResult(response, '取消审批')
                    } catch (error) {
                        console.error(error, 'cancle approve error')
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 删除操作
        async handleDelete () {
            this.secodeConfirmPop('此操作将永久删除数据, 是否继续?', '删除')
                .then(async () => {
                    try {
                        let response = await paymentBillService.deleteById({ id: this.formData.id })
                        this.handleResult(response, '删除')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail deleteById error')
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 挂起
        async handleSuspend () {
            this.secodeConfirmPop('是否挂起？', '挂起')
                .then(async () => {
                    try {
                        let response = await paymentBillService.suspendById({ id: this.formData.id })
                        this.handleResult(response, '挂起')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail suspendById error')
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 取消挂起
        async handleCancleSuspend () {
            this.secodeConfirmPop('是否取消挂起？', '取消挂起')
                .then(async () => {
                    try {
                        let response = await paymentBillService.cancleSuspendById({ id: this.formData.id })
                        this.handleResult(response, '取消挂起')
                    } catch (error) {
                        console.error(error, 'paymentBillDetail cancleSuspendById error')
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
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
                this.$refs.paymentBillDetalForm.resetFields()
                this.$message({
                    type: 'success',
                    message: '取消成功!'
                })
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
            // 如果不是当前界面，不执行初始化
            if (this.tabState.name !== this.tabAttr.tag) return
            // 如果是 修改 ，从store中获取data
            let modeParam = this.tabType
            if (modeParam === 'modify' || modeParam === 'scan') {
                // 浏览状态切换form是否可写
                if (modeParam === 'scan') {
                    this.isModify = false
                    this.isScan = true
                } else {
                    this.isModify = true
                    this.isScan = false
                }
                // this.Billing_G_GET_HANDLE_DATA.ids.some(item => {
                //     if (item.type === 'paymentBill') {
                //     this.formData.id = item
                //         this.multipleData.data = item.id
                //         return true
                //     }
                // })
                this.formData.piId = this.Billing_G_GET_HANDLE_DATA.paymentBillIds[ 0 ]
                this.multipleData.data = this.Billing_G_GET_HANDLE_DATA.paymentBillIds
                console.log(this.formData, this.Billing_G_GET_HANDLE_DATA, 'invoicing formData')
                this.getDataById()
                if (!this.formData.invoiceInfoDetailList) {
                    this.formData.invoiceInfoDetailList = []
                }
                // 保存按钮调用更新接口
                this.handleSave = this.paymentBillUpdate
            } else {
                // 新建
                this.isModify = false
                this.isScan = false
                this.formData = { ...this.formDataTemp }
                this.$set(this.formData, 'billTime', new Date().getTime())
                // 保存按钮调用保存（新建）接口
                this.handleSave = this.paymentBillNew
            }
        },
        // 根据 id 查询付款单信息
        async getDataById (id) {
            try {
                let response = await paymentBillService.getDataById({ id: id || this.formData.piId })
                if (response.data.status.statusCode === 0) {
                    // 表头数据
                    this.formData = response.data.result
                    // 转换日期格式
                    this.formData.billTime = parseInt(this.formData.billTime)
                    // 表体数据
                    if (response.data.result.payInfoDetailDTOList) {
                        this.detailTableData = response.data.result.payInfoDetailDTOList
                    }
                }
            } catch (error) {
                console.error(error, 'getPayInfoById response error')
            }
        },
        // 二次确认公共方法
        secodeConfirmPop (message, action) {
            return this.$confirm(message, `${action}提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        // 结果处理公共方法
        handleResult (res, action) {
            let resultMsg = []
            if (res.data.status.statusCode === 0) {
                resultMsg.message = `${action}成功`
                resultMsg.type = 'success'
            } else if (res.data.result && res.data.result.length > 0) {
                resultMsg.message = `${res.data.result[ 0 ].errorMessage}`
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
                    this.getDataById(this.multipleData.data[ this.multipleData.index ])
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
            this.getDataById(this.multipleData.data[ this.multipleData.index ])
        },
        // 添加tab标签
        addTab (name, tag, tabType, content) {
            this.$root.bus.$emit('paymentBill', name, tag, tabType, content)
        }
    },
    created () {
        this.$nextTick(() => {
            this.getIntialData()
        })
    },
    deactivated () {
        console.log(this.$refs.paymentBillDetalForm)
        // this.$refs.paymentBillDetalForm.resetFields()
    },
    computed: {
        ...mapGetters([
            'Billing_G_GET_HANDLE_DATA'
        ]),
        // 单据状态 控制按钮 disabled
        billStatus () {
            let status = this.formData.billStatus
            if (status === '已保存' || status === '已收回' || status === '已驳回') {
                return 'SRR'
            } else if (status === '已审批') {
                return 'Approve'
            } else if (status === '已提交') {
                return 'Submit'
            } else {
                return 'Other'
            }
        },
        // 判断是否有源
        isWidthSource () {
            return !(this.formData.sourceBillType === '手工创建')
        },
        // 判断所选 发票类型 是否为增值税发票
        VATComputed () {
            Object.keys(this.rules).forEach(key => {
                // 判断当前规则是否受 增值税发票 影响
                if (this.rules[ key ][ 0 ].VATFlag) {
                    // 判断发票类型 <5 为增值税发票
                    if (this.formData.payOriginazation < 5) {
                        // this.$set(this.rules[key], this.rules[key][0].required, true)
                        // 设置校验规则为 必输项
                        this.rules[ key ][ 0 ].required = true
                    } else {
                        // this.$set(this.rules[key], this.rules[key][0].required, false)
                        this.rules[ key ][ 0 ].required = false
                    }
                }
            })
            return this.rules
        }
    },
    watch: {
        // 切换tab的时候判断
        tabState () {
            debugger
            console.log(this.tabState, this.tabAttr, 'asdfghjkl')
            if (this.tabState.name === this.tabAttr.tag) {
                this.getDataById()
            }
        },
        // 日期 转换
        'formData.billTime': function (val, oldVal) {
            if (val instanceof Date) {
                return val.getTime()
            }
            if (typeof val === 'string') {
                return parseInt(val)
            }
        }
    },
    components: {
        subDetail,
        uploadDialog,
        slider
    }
}
</script>
