<template>
<section class="invoicing billing-form-inline">
    <div class="billing-btn-group">
        <!-- 从入库通知单、付款单跳转过来 -->
        <el-button size="small" :plain="true" type="primary" v-if="multipleData.data.length <= 1" @click="handleSave">保存</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="multipleData.data.length > 1" @click="handleSaveAndNext">保存并下一个</el-button>
        <!-- 从付款单点击应付单号跳转过来 -->
        <el-button size="small" :plain="true" type="primary" @click="handleModify" v-if="isFromPayableBill">修改</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleDelete" v-if="isFromPayableBill">删除</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleSubmit" v-if="isFromPayableBill">提交</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleRecall" v-if="isFromPayableBill">收回</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleApprove" v-if="isFromPayableBill">审批</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleReject" v-if="isFromPayableBill">驳回</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handlePay">付款</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleAbandon">弃审</el-button>
        <el-dropdown @command="handleCommand" v-if="isFromPayableBill">
            <el-button size="small" :plain="true" type="primary">
                操作
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                <el-dropdown-item command="invalid" :disabled="formData.isInvoiceVoid">作废</el-dropdown-item>
                <el-dropdown-item command="redRush" :disabled="formData.isRedRush">红冲</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleUnionSearchCommand" v-if="isFromPayableBill">
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
        <!-- 公共按钮 -->
        <el-button size="small" :plain="true" type="primary" v-if="isScan" @click="dialogVisible.dialogUploadVisible = true">附件</el-button>
        <el-button size="small" :plain="true" @click="handleCopyAndAddLine">参照增行(位置表头？表体？)</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="isScan">打印</el-button>
    </div>
    <p v-if="multipleData.data.length > 1">已生成{{multipleData.data.length}}个【应收单生成合同立账】，当前操作第{{multipleData.index + 1}}个，
        <a href="javascript:;">【查看所有应付单】</a>
    </p>
    <el-form :inline="true" :model="formData" :rules="VATComputed" ref="paymentBillDetalForm">
        <el-form-item label="应付单类型" prop="payOriginazation">
            <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入应付单类型"></el-input>
        </el-form-item>
        <el-form-item label="应付单号" prop="payType">
            <el-input v-model="formData.payType" :disabled="isModify" :readonly="isScan" placeholder="请输入应付单号"></el-input>
        </el-form-item>
        <el-form-item label="单据日期" prop="billTime">
            <el-date-picker v-model="formData.billTime" type="date" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="币种" prop="currency">
            <el-input v-model="formData.currency" disabled :readonly="isScan" placeholder="请输入币种"></el-input>
        </el-form-item>
        <el-form-item label="应付组织" prop="payCode">
            <el-input v-model="formData.payCode" disabled :readonly="isScan" placeholder="请输入应付组织"></el-input>
        </el-form-item>
        <el-form-item label="往来对象类型" prop="currentObjectType">
            <el-input v-model="formData.payCode" disabled :readonly="isScan" placeholder="请输入往来对象类型"></el-input>
        </el-form-item>
        <el-form-item label="应付供应商" prop="receivingCustomer">
            <el-input v-model="formData.sourceBillType" :disabled="isModify" :readonly="isScan" placeholder="请输入应付供应商"></el-input>
        </el-form-item>
        <el-form-item label="单据状态" prop="billStatus">
            <el-input v-model="formData.billStatus" :readonly="isScan" placeholder="请输入单据状态"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
            <el-input v-model="formData.department" :readonly="isScan" placeholder="请输入所属部门"></el-input>
        </el-form-item>
        <el-form-item label="所属业务员" prop="subordinateClert">
            <el-select v-model="formData.subordinateClert" :disabled="isScan" placeholder="请选择所属业务员">
                <el-option v-for="(option, index) in subordinateClertOptions" :label="option.label" :value="option.value" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="来源单据类型" prop="sourceBillType">
            <el-input v-model="formData.sourceBillType" :disabled="isModify" :readonly="isScan" placeholder="来源单据类型"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="col-span-3">
            <el-input v-model="formData.remark" :readonly="isScan" placeholder="备注"></el-input>
        </el-form-item>
    </el-form>
    <transition name="detail">
        <sub-detail v-if="isShowDetail" :isHasSource="isModify || isScan" :detailTableData="detailTableData"></sub-detail>
    </transition>
    <upload-dialog :dialogVisible="dialogVisible"></upload-dialog>
    <slider size="small" headerName="hehe">
        <div>
            kkkkkkkkkkkkkkkkkkkkkk
        </div>
    </slider>
</section>
</template>

<script>
import {
    mapGetters
} from 'vuex'
// components
import slider from '@CodeRule/components/SelectionSlider.vue'
import subDetail from './SubDetail'
import uploadDialog from './uploadFileDialog'
// service
import paymentBillService from '@CodeRule/services/paymentBillService'
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
    data() {
        return {
            formData: {},
            formDataTemp: {
                createUser: 12,
                invoiceCategory: 1,
                invoiceMode: 1,
                payOriginazation: 1,
                payCode: `new${new Date().getTime()}`,
                invoiceDate: new Date().getTime(),
                createTime: new Date().getTime(),
                payType: 1,
                serviceCharge: 1,
                invoiceInfoDetailList: [{}],
                isAlreadyGenerateEinvoice: false,
                isAlreadyGoldentaxRedNum: false,
                isAlreadyOpenControltax: false,
                billTime: new Date().getTime(),
                sourceBillType: '手工创建',
                receivingCustomer: 1,
                currentObjectType: 1,
                clearingForm: 1,
                currency: 1,
                payBankAccount: 1,
                receivingBankAccount: 1,
                subordinateClert: 1
                // currentObjectType: '开票客户',
                // receivingCustomer: '发票抬头',
                // clearingForm: '税号测试更改',
                // currency: '盛京银行',
                // payBankAccount: '112233',
                // receivingBankAccount: '金税票号xxxxx',
                // billStatus: '北京昌平区回龙观腾讯众创空间',
                // subordinateClert: '联系电话',
                // department: '11',
                // remark: '备注呀，也不知道写点什么',
                // updateUser: 21
                // isGoldentaxVoid: true,
                // isInvoiceVoid: true,
                // isRedRush: true
            },
            payOriginazationOptions: [{
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
            }],
            payTypeOptions: [{
                label: '销售收款单',
                value: 1
            }],
            clearingFormOptions: [{
                    label: '现金',
                    value: 1
                },
                {
                    label: '支票',
                    value: 2
                },
                {
                    label: '电汇',
                    value: 3
                }
            ],
            currencyOptions: [{
                label: '人民币',
                value: 1
            }],
            currentObjectTypeOptions: [{
                    label: '客户',
                    value: 1
                },
                {
                    label: '供应商',
                    value: 2
                }
            ],
            receivingCustomerOptions: [{
                label: '大爷，来玩嘛',
                value: 1
            }],
            payBankAccountOptions: [{
                value: 1,
                label: ''
            }],
            receivingBankAccountOptions: [{
                value: 1,
                label: ''
            }],
            subordinateClertOptions: [{
                value: 1,
                label: ''
            }],
            rules: {
                payOriginazation: [{
                    type: 'number',
                    required: true,
                    message: '请选择发票类型',
                    trigger: 'change'
                }],
                payType: [{
                    type: 'number',
                    required: true,
                    message: '请选择开票方式',
                    trigger: 'change'
                }],
                payCode: [{
                    required: true,
                    trigger: 'blur'
                }],
                invoiceDate: [{
                    type: 'number',
                    required: true,
                    message: '请填写发票时间',
                    trigger: 'blur'
                }],
                sourceBillType: [{
                    required: true,
                    message: '请填写开票组织',
                    trigger: 'blur'
                }],
                currentObjectType: [{
                    type: 'number',
                    required: true,
                    message: '请填写往来对象类型',
                    trigger: 'change'
                }],
                receivingCustomer: [{
                    type: 'number',
                    required: true,
                    message: '请填写收款客户',
                    trigger: 'change'
                }],
                payTypeName: [ // isVAT
                    {
                        required: true,
                        message: '请填写币种',
                        trigger: 'blur',
                        VATFlag: true
                    }
                ],
                clearingForm: [{
                    type: 'number',
                    required: true,
                    message: '请填写结算方式',
                    trigger: 'change',
                    VATFlag: true
                }],
                currency: [{
                    type: 'number',
                    required: true,
                    message: '请填写币种',
                    trigger: 'change',
                    VATFlag: true
                }],
                payBankAccount: [{
                    type: 'number',
                    required: true,
                    message: '请填写付款银行账户',
                    trigger: 'change',
                    VATFlag: true
                }],
                receivingBankAccount: [{
                    type: 'number',
                    required: true,
                    message: '请填写收款银行账户',
                    trigger: 'change',
                    VATFlag: true
                }],
                billStatus: [{
                    type: 'string',
                    required: true,
                    message: '请填写单据状态',
                    trigger: 'blur',
                    VATFlag: true
                }],
                subordinateClert: [ // isVAR
                    {
                        type: 'number',
                        required: true,
                        message: '请填写所属业务员',
                        trigger: 'change',
                        VATFlag: true
                    }
                ],
                department: [{
                    type: 'string',
                    required: true,
                    message: '请填写所属部门',
                    trigger: 'blur'
                }],
                serviceCharge: [{
                    type: 'number',
                    required: true,
                    message: '请填写单据状态',
                    trigger: 'blur'
                }],
                remark: [{
                        message: '请填写备注',
                        trigger: 'blur'
                    },
                    {
                        max: 30,
                        message: '长度不能超过30个字符',
                        trigger: 'blur'
                    }
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
            isFromPayableBill: true,
            multipleData: {
                data: [],
                index: 0
            } // 多条数据
        }
    },
    methods: {
        initFormData() {
            this.formData = this.formDataTemp
        },
        // 保存并下一个
        handleSaveAndNext() {
            // this.handleSave()
            this.switchData(1)
        },
        // TODO: payablebill-detail修改
        handleModify() {

        },
        // TODO: payablebill-detail参照增行
        handleCopyAndAddLine() {

        },
        // TODO: payablebill-detail 支付
        handlePay() {

        },
        // 新增
        async paymentBillNew(cb) {
            this.formData.invoiceDate = new Date(this.formData.billTime).getTime()
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
        async paymentBillUpdate() {
            this.formData.invoiceDate = new Date(this.formData.billTime).getTime()
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
        // 弃审操作
        handleAbandon() {
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
        async handleInvalid() {
            this.$prompt('请输入作废原因', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            }).then(async ({
                value
            }) => {
                try {
                    let response = await paymentBillService.invalidById({
                        id: this.formData.id,
                        invalidReason: value
                    })
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
        handleRedRush() {
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
        async handleRecall() {
            this.secodeConfirmPop('是否收回?', '收回')
                .then(async () => {
                    try {
                        let response = await paymentBillService.takebackById({
                            id: this.formData.id
                        })
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
        async handleSubmit() {
            this.secodeConfirmPop('是否提交', '提交')
                .then(async () => {
                    try {
                        let response = await paymentBillService.submitById({
                            id: this.formData.id
                        })
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
        async handleReject() {
            this.$prompt('请输入驳回原因', '驳回提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async ({
                value
            }) => {
                try {
                    let response = await paymentBillService.rejectById({
                        id: this.formData.id,
                        rejectReason: value
                    })
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
        async handleApprove() {
            this.secodeConfirmPop('是否审批?', '审批')
                .then(async () => {
                    try {
                        let response = await paymentBillService.approveById({
                            id: this.formData.id
                        })
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
        // 删除操作
        async handleDelete() {
            this.secodeConfirmPop('此操作将永久删除数据, 是否继续?', '删除')
                .then(async () => {
                    try {
                        let response = await paymentBillService.deleteById({
                            id: this.formData.id
                        })
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
        async handleSuspend() {
            this.secodeConfirmPop('是否挂起？', '挂起')
                .then(async () => {
                    try {
                        let response = await paymentBillService.suspendById({
                            id: this.formData.id
                        })
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
        async handleCancleSuspend() {
            this.secodeConfirmPop('是否取消挂起？', '取消挂起')
                .then(async () => {
                    try {
                        let response = await paymentBillService.cancleSuspendById({
                            id: this.formData.id
                        })
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
        handleCancle(cb) {
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
        handleCommand(command) {
            if (command === 'invalid') {
                this.handleInvalid()
            }
            if (command === 'redRush') {
                this.handleRedRush()
            }
        },
        // 提交操作
        handleSubmitCommand(command) {
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
        handleApproveCommand(command) {
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
        handleUnionSearchCommand(command) {
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
        getIntialData() {
            // 判断状态[修改、浏览、新增]
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
                /**
                 * 判断数据来源（1.付款单列表 2.入库通知单 3.付款单）
                 */
                // 来自付款单列表
                if (this.tabAttr.tag.endsWith('payableBillData')) {
                    // 控制对应操作按钮显示隐藏
                    this.isFromPayableBill = true
                    console.log('this.tabAttr.tag.endsWidth')
                } else {
                    // 来自入库通知单/付款单
                    this.isFromPayableBill = false
                }
                this.formData.id = this.Billing_G_GET_HANDLE_DATA.receivableBillIds[0]
                this.multipleData.data = this.Billing_G_GET_HANDLE_DATA.receivableBillIds
                console.log(this.formData, this.Billing_G_GET_HANDLE_DATA, 'receivableBillIds detail formData')
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
                this.formData = { ...this.formDataTemp
                }
                this.$set(this.formData, 'billTime', new Date().getTime())
                // 保存按钮调用保存（新建）接口
                this.handleSave = this.paymentBillNew
            }
        },
        // 根据 id 查询付款单信息
        async getDataById(id) {
            try {
                let response = await paymentBillService.getDataById({
                    id: id || this.formData.id
                })
                if (response.data.status.statusCode === 0) {
                    // 表头数据
                    this.formData = response.data.result
                    // 表体数据
                    if (response.data.result.payInfoDetailDTOList) {
                        this.detailTableData = payInfoDetailDTOList
                    }
                }
            } catch (error) {
                console.error(error, 'getPayInfoById response error')
            }
        },
        // 二次确认公共方法
        secodeConfirmPop(message, action) {
            return this.$confirm(message, `${action}提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        // 结果处理公共方法
        handleResult(res, action) {
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
        switchData(val) {
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
    created() {
        this.$nextTick(() => {
            this.getIntialData()
        })
    },
    activated() {
        this.getIntialData()
        console.log(this.formData)
    },
    computed: {
        ...mapGetters([
            'Billing_G_GET_HANDLE_DATA'
        ]),
        // 映射发票状态
        serviceCharge() {
            switch (this.formData.serviceCharge) {
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
        VATComputed() {
            Object.keys(this.rules).forEach(key => {
                // 判断当前规则是否受 增值税发票 影响
                if (this.rules[key][0].VATFlag) {
                    // 判断发票类型 <5 为增值税发票
                    if (this.formData.payOriginazation < 5) {
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
    watch: {
        tabState() {
            console.log(this.tabState, this.tabAttr, 'create tabState tabAttr')
        }
    },
    components: {
        subDetail,
        uploadDialog,
        slider
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
