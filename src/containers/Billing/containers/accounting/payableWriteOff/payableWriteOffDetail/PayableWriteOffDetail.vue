<template>
    <section class="invoicing billing-form-inline">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="handleCancleWriteOff">取消核销</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleViewDetail">查看明细</el-button>
        </div>
        <p v-if="multipleData.data.length > 1">
            已生成{{multipleData.data.length}}个【应收单生成合同立账】，当前操作第{{multipleData.index + 1}}个，
            <a href="javascript:;">【查看所有应付单】</a>
        </p>
        <el-form :inline="true" :model="formData" :rules="VATComputed" ref="paymentBillDetalForm">
            <el-form-item label="核销方式" prop="subordinateClert">
                <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入核销方式"></el-input>
            </el-form-item>
            <el-form-item label="核销类型" prop="subordinateClert">
                <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入核销类型"></el-input>
            </el-form-item>
            <el-form-item label="核销编号" prop="payOriginazation">
                <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入核销编号"></el-input>
            </el-form-item>
            <el-form-item label="核销日期" prop="billTime">
                <el-date-picker v-model="formData.billTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="核算组织" prop="sourceBillType">
                <el-input v-model="formData.sourceBillType" :disabled="isModify" :readonly="isScan" placeholder="请输入核算组织"></el-input>
            </el-form-item>
            <el-form-item label="应收客户" prop="currentObjectType">
                <el-input v-model="formData.payCode" disabled :readonly="isScan" placeholder="请输入应收客户"></el-input>
            </el-form-item>
            <el-form-item label="核销人" prop="payCode">
                <el-input v-model="formData.payCode" disabled :readonly="isScan" placeholder="请输入核销人"></el-input>
            </el-form-item>
            <el-form-item label="本方单据大类" prop="payCode">
                <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入本方单据大类"></el-input>
            </el-form-item>
            <el-form-item label="对方单据大类" prop="currency">
                <el-input v-model="formData.currency" disabled :readonly="isScan" placeholder="请输入对方单据大类"></el-input>
            </el-form-item>
            <el-form-item label="本方核销金额" prop="payCode">
                <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入本方核销金额"></el-input>
            </el-form-item>
            <el-form-item label="对方核销金额" prop="billStatus">
                <el-input v-model="formData.currency" disabled :readonly="isScan" placeholder="请输入对方核销金额"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark" class="col-span-3">
                <el-input v-model="formData.remark" :readonly="isScan" placeholder="备注"></el-input>
            </el-form-item>
        </el-form>
        <transition name="detail">
            <sub-detail v-if="isShowDetail" :isHasSource="isModify || isScan" :detailTableData="detailTableData" :cols="receivableBillList"></sub-detail>
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
import { mapGetters } from 'vuex'
// components
import slider from '@Billing/components/SelectionSlider.vue'
import subDetail from './SubDetail.vue'
import uploadDialog from './UploadFileDialog.vue'
// service
import paymentBillService from '@Billing/services/paymentBillService.js'
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
                invoiceInfoDetailList: [
                    {}
                ],
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
            },
            rules: {
                payOriginazation: [
                    { type: 'number', required: true, message: '请选择发票类型', trigger: 'change' }
                ],
                payType: [
                    { type: 'number', required: true, message: '请选择开票方式', trigger: 'change' }
                ],
                payCode: [
                    { required: true, trigger: 'blur' }
                ],
                invoiceDate: [
                    { type: 'number', required: true, message: '请填写发票时间', trigger: 'blur' }
                ],
                sourceBillType: [
                    { required: true, message: '请填写开票组织', trigger: 'blur' }
                ],
                currentObjectType: [
                    { type: 'number', required: true, message: '请填写往来对象类型', trigger: 'change' }
                ],
                receivingCustomer: [
                    { type: 'number', required: true, message: '请填写收款客户', trigger: 'change' }
                ],
                payTypeName: [ // isVAT
                    { required: true, message: '请填写币种', trigger: 'blur', VATFlag: true }
                ],
                clearingForm: [
                    { type: 'number', required: true, message: '请填写结算方式', trigger: 'change', VATFlag: true }
                ],
                currency: [
                    { type: 'number', required: true, message: '请填写币种', trigger: 'change', VATFlag: true }
                ],
                payBankAccount: [
                    { type: 'number', required: true, message: '请填写付款银行账户', trigger: 'change', VATFlag: true }
                ],
                receivingBankAccount: [
                    { type: 'number', required: true, message: '请填写收款银行账户', trigger: 'change', VATFlag: true }
                ],
                billStatus: [
                    { type: 'string', required: true, message: '请填写单据状态', trigger: 'blur', VATFlag: true }
                ],
                subordinateClert: [ // isVAR
                    { type: 'number', required: true, message: '请填写所属业务员', trigger: 'change', VATFlag: true }
                ],
                department: [
                    { type: 'string', required: true, message: '请填写所属部门', trigger: 'blur' }
                ],
                serviceCharge: [
                    { type: 'number', required: true, message: '请填写单据状态', trigger: 'blur' }
                ],
                remark: [
                    { message: '请填写备注', trigger: 'blur' },
                    { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
                ]
            },
            receivableBillList: [
                {
                    prop: 'invoiceType',
                    label: '核销类型'
                },
                {
                    prop: '',
                    label: '本方',
                    children: [
                        {
                            prop: 'invoiceNum',
                            label: '本方单据大类'
                        },
                        {
                            prop: 'invoiceDate',
                            label: '本方单据类型'
                        },
                        {
                            prop: 'billingOrganization',
                            label: '本方单据编号'
                        },
                        {
                            prop: 'shouldAccountingOrganization',
                            label: '本方可核销金额(元)'
                        },
                        {
                            prop: 'receivablesOrganization',
                            label: '本方本次核销金额(元)'
                        }
                    ]
                },
                {
                    prop: '',
                    label: '对方',
                    children: [
                        {
                            prop: 'invoiceNum',
                            label: '对方单据大类'
                        },
                        {
                            prop: 'invoiceDate',
                            label: '对方单据类型'
                        },
                        {
                            prop: 'billingOrganization',
                            label: '对方单据号'
                        },
                        {
                            prop: 'shouldAccountingOrganization',
                            label: '对方可核销金额(元)'
                        }
                    ]
                }

            ],
            PORDetailTableData: [
                {
                    PORDetailColsProp: '123'
                }
            ],
            handleSave: {},
            popoverVisible: false,
            checked: true,
            isShowDetail: true,
            isModify: false, // 判断是否位直接开票，用于显示/隐藏按钮
            isVAT: true, // 是否为增值税发票，用于判断字段是否可空
            dialogVisible: {
                dialogUploadVisible: false
            },
            detailTableData: [
                {
                    invoiceNum: 'invoiceNum',
                    invoiceDate: 'invoiceDate',
                    billingOrganization: 'billingOrganization',
                    shouldAccountingOrganization: 'shouldAccountingOrganization',
                    receivablesOrganization: 'receivablesOrganization'
                },
                {
                    invoiceNum: 'invoiceNum',
                    invoiceDate: 'invoiceDate',
                    billingOrganization: 'billingOrganization',
                    shouldAccountingOrganization: 'shouldAccountingOrganization',
                    receivablesOrganization: 'receivablesOrganization'
                },
                {
                    invoiceNum: 'invoiceNum',
                    invoiceDate: 'invoiceDate',
                    billingOrganization: 'billingOrganization',
                    shouldAccountingOrganization: 'shouldAccountingOrganization',
                    receivablesOrganization: 'receivablesOrganization'
                }
            ],
            isScan: true, // 如果是查看，form变为只读
            isFromPayableBill: true,
            multipleData: {
                data: [],
                index: 0
            }, // 多条数据
            modeParam: 'scan'
        }
    },
    methods: {
        // 取消核销
        handleCancleWriteOff () {

        },
        // 查看明细
        handleViewDetail () {
            // FIXME: 删除先不做，add 后的 tab 有返回功能，如果删除了无法实现
            // this.$root.bus.$emit('removeTwoLevelTab', this.tabAttr.tag)
            this.$root.bus.$emit('receivableWriteOff', `${this.formData.id}-详情`, `${this.formData.id}-detail`, 'scan', 'new-bill-list')
        },
        initFormData () {
            // FIXME: 应付冲应收核销界面 没有form表单
            this.formData = this.formDataTemp
        },
        // 保存
        // handleSave() {
        // },
        // 保存并下一个
        handleSaveAndNext () {
        },
        // 上一个
        handlePrevious () {
        },
        // 下一个
        handleNext () {
        },
        // 附件
        handleAppendix () {
        },
        // 打印
        handlePrint () {
        },
        // 参照增行
        handleAddLine () {
        },
        // 保存并下一个
        handleSaveAndNext () {
            // this.handleSave()
            this.switchData(1)
        },
        // [修改]按钮操作
        handleModify () {
            this.addTab(`${this.multipleData.data[ this.multipleData.index ]}-修改`, 'receive-bill-detail-modify', 'modify', 'receive-bill-detail')
            console.log(this.multipleData.data[ this.multipleData.index ])
        },
        // 新增
        async paymentBillNew (cb) {
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
        async paymentBillUpdate () {
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
        handleAbandon () {
            this.$http.post(`/invoiceInfo/invoiceAbandon/`, {
                invoiceIdList: [ this.formData.invoiceId || this.formData.id ]
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
        // [日志按钮]操作
        handleLog () {
        },
        getIntialData () {
            // 判断状态[修改、浏览、新增]
            console.log(this.tabType, '--------------------------')
            if (this.modeParam === 'modify' || this.modeParam === 'scan') {
                // 浏览状态切换form是否可写
                if (this.modeParam === 'scan') {
                    this.isModify = false
                    this.isScan = true
                } else {
                    this.isModify = true
                    this.isScan = false
                }
                // 来自收款单列表
                // if (this.tabAttr.tag.endsWith('receiveBillData')) {
                //     // 控制对应操作按钮显示隐藏
                //     this.isFromPayableBill = true
                //     console.log('this.tabAttr.tag.endsWidth')
                // } else {
                //     // 来自入库通知单/付款单
                //     this.isFromPayableBill = false
                // }
                this.formData.id = this.Billing_G_GET_HANDLE_DATA.receivableWriteOffBillIds[ 0 ]
                this.multipleData.data = this.Billing_G_GET_HANDLE_DATA.receivableWriteOffBillIds
                console.log(this.formData, this.Billing_G_GET_HANDLE_DATA, this.multipleData.data, 'receivableWriteOffBillIds detail formData')
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
                let response = await paymentBillService.getDataById({ id: id || this.formData.id })
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
                this.multipleData.index = length - 1
            }
            if (this.multipleData.index > length - 1) {
                this.multipleData.index = 0
            }
            console.log(this.multipleData.data[ this.multipleData.index ])
            // this.getDataById(this.multipleData.data[this.multipleData.index])
        },
        // 添加tab标签
        addTab (name, tag, tabType, content) {
            this.$root.bus.$emit('receiveBill', name, tag, tabType, content)
        }
    },
    created () {
        this.$nextTick(() => {
            // 获取当前页类型 [modify/scan/new]
            this.modeParam = this.tabType
            // 初始化数据
            this.getIntialData()
        })
    },
    computed: {
        ...mapGetters([
            'Billing_G_GET_HANDLE_DATA'
        ]),
        // 映射发票状态
        serviceCharge () {
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
        tabState () {
            if (this.tabState.name === this.tabAttr.tag) {
                this.getIntialData()
                console.log(this.tabState, this.tabAttr, 'create tabState tabAttr')
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

