

<template>
<section class="invoicing billing-form-inline">
    <div class="billing-btn-group">
        <!-- 操作 下拉框 -->
        <el-dropdown @command="handleCommand" v-if="isScan">
            <el-button size="small" :plain="true" type="primary">
                操作
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                <el-dropdown-item command="cancelSuspend" :disabled="billStatus !== 'Approve' || !formData.isSuspend">取消挂起</el-dropdown-item>
                <el-dropdown-item command="suspend" :disabled="billStatus !== 'Approve' || formData.isSuspend">挂起</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 公共按钮 -->
        <el-button size="small" :plain="true" type="primary" @click="dialogVisible.dialogUploadVisible = true">附件</el-button>
        <el-button size="small" :plain="true" type="primary" @click="getDataById" v-if="isScan">刷新</el-button>
        <el-button size="small" :plain="true" type="primary" v-if="isScan">打印</el-button>
        <el-button size="small" :plain="true" type="primary" @click="handleCancle">取消</el-button>
    </div>
    <p v-if="multipleData.data.length > 1">已生成{{multipleData.data.length}}个【应收单生成合同立账】，当前操作第{{multipleData.index + 1}}个，
        <a href="javascript:;">【查看所有应付单】</a>
    </p>
    <el-form :inline="true" :model="formData" :rules="rules" ref="payableBillDetalForm">
        <el-form-item label="应付单类型" prop="payableTypeId">
            <el-select v-model="formData.payableTypeId" :disabled="isHasSource" placeholder="请选择应付单类型">
                <el-option
                v-for="(item, index) in payableTypeIdOptions"
                :label="item.label"
                :value="item.value"
                :key="index">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="应付单号" prop="code">
            <el-input v-model="formData.code" disabled placeholder="请输入应付单号"></el-input>
        </el-form-item>
        <el-form-item label="单据日期" prop="billDate">
            <el-date-picker v-model="billDate" :disabled="isScan" type="date" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="币种" prop="currencyCode">
            <el-input v-model="formData.currencyCode" disabled placeholder="请输入币种"></el-input>
        </el-form-item>
        <el-form-item label="应付组织" prop="payableOrg">
            <el-input v-model="formData.payableOrg" :disabled="isHasSource || isScan" placeholder="请输入应付组织"></el-input>
        </el-form-item>
        <el-form-item label="往来对象类型" prop="objectType">
            <el-input v-model="formData.objectType" :disabled="isHasSource || isScan" placeholder="请输入往来对象类型"></el-input>
        </el-form-item>
        <el-form-item label="应付供应商" prop="payableObject">
            <el-input v-model="formData.payableObject" :title="formData.payableObject" disabled placeholder="请输入应付供应商"></el-input>
        </el-form-item>
        <el-form-item label="单据状态" prop="status">
            <el-input v-model="formData.status" disabled placeholder="请输入单据状态"></el-input>
            <el-popover popper-class="billing-popover" ref="billingpopover" placement="bottom-end" width="400" trigger="click">
                <div class="popover-content">
                    <div class="popover-content-item">
                        <div class="popover-content-header">
                            基本状态
                        </div>
                        <div class="popover-content-row">
                            <span>
                                单据状态：{{formData.status}}
                            </span>
                            <span>
                                <el-checkbox label="是否已全部暂估回冲" disabled v-model="formData.isEstimateBack" name="type"></el-checkbox>
                            </span>
                            <span>
                                <el-checkbox label="是否推式生单" disabled v-model="formData.isByPush" name="type"></el-checkbox>
                            </span>
                        </div>
                    </div>
                    <div class="popover-content-item">
                        <div class="popover-content-header">
                            审批
                        </div>
                        <div class="popover-content-row">
                            <span>
                                审批日期：{{formData.approveDate}}
                            </span>
                            <span>
                                审批人：{{formData.approveUser}}
                            </span>
                        </div>
                    </div>
                    <div class="popover-content-item">
                        <div class="popover-content-header">
                            驳回
                        </div>
                        <div class="popover-content-row">
                            <span>
                                驳回日期：{{formData.rejectDate}}
                            </span>
                            <span>
                                驳回人：{{formData.rejectUser}}
                            </span>
                            <span>
                                驳回原因：<el-input v-model="formData.rejectReason" :disabled="formData.status !== '已驳回'" placeholder="请输入驳回原因"></el-input>
                            </span>
                        </div>
                    </div>
                    <div class="popover-content-item">
                        <div class="popover-content-header">
                            作废
                        </div>
                        <div class="popover-content-row">
                            <span>
                                作废日期：{{formData.invalidDate}}
                            </span>
                            <span>
                                作废人：{{formData.invalidUser}}
                            </span>
                            <span>
                                作废原因：<el-input v-model="formData.invalidReason" :disabled="formData.status !== '已作废'" placeholder="请输入作废原因"></el-input>
                            </span>
                        </div>
                    </div>
                </div>
            </el-popover>
            <i class="el-icon-search popover-trigger-icon" v-popover:billingpopover></i>
        </el-form-item>
        <el-form-item label="所属部门" prop="ownedDepartment">
            <el-popover
                ref="ownedDepartmentPopover"
                placement="bottom"
                trigger="click"
                popper-class="department-popover"
                >
                <el-select
                    v-model="formData.ownedDepartment"
                    filterable
                    remote
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                        v-for="item in treeFilteredNode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-tree :data="departmentTreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                <el-input v-model="formData.ownedDepartment" readonly :disabled="isHasSource || isScan" placeholder="请选择所属部门" slot="reference"></el-input>
            </el-popover>
        </el-form-item>
        <el-form-item label="所属业务员" prop="ownedSalesman">
            <el-popover
                ref="ownedSalesmanPopover"
                placement="bottom"
                trigger="click"
                popper-class="department-popover"
                >
                <el-select
                    v-model="formData.ownedSalesman"
                    filterable
                    remote
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                        v-for="item in treeFilteredNode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-tree :data="departmentTreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                <el-input v-model="formData.ownedSalesman" readonly :disabled="isHasSource || isScan" placeholder="请选择所属业务员" slot="reference"></el-input>
            </el-popover>
        </el-form-item>
        <el-form-item label="来源单据类型" prop="sourceDocType">
            <el-input v-model="formData.sourceDocType" disabled placeholder="请输入来源单据类型"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comments" class="col-span-3">
            <el-input v-model="formData.comments" :readonly="isScan" placeholder="备注" :maxlength="maxLength"></el-input>
        </el-form-item>
    </el-form>
    <transition name="detail">
        <sub-detail v-if="isShowDetail" :isHasSource="isHasSource" :isScan="isScan" :detailTableData="detailTableData"></sub-detail>
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
import payableBillService from '@Billing/services/payableBillService.js'
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
                payableTypeId: '1',
                code: '',
                docDate: new Date().getTime(),
                currencyCode: '人民币',
                payableOrg: 201,
                objectType: 'SUPLIER', // 供应商
                payableObject: 'yingfugongyingshang',
                status: '已保存',
                ownedDepartment: '',
                ownedSalesman: '',
                sourceDocType: '手工创建',
                comments: '',
                isEstimateBack: false, // 暂估回冲
                isByPush: false, // 推式生单
                docStatus: 0,
                createUser: parseInt(Math.random() * 100),
                createDate: `${new Date().getTime()}`,
                updateUser: parseInt(Math.random() * 100),
                updateDate: `${new Date().getTime()}`,
                payableInfoDetailDOList: [ {
                    payableRemain: 123,
                    isEstimateBack: false,
                    isSuspend: false,
                    goodsChargeCode: ''
                }]
            },
            // 应付单类型下拉
            payableTypeIdOptions: [
                {
                    label: '应付账款',
                    value: '1'
                },
                {
                    label: '其他应付单',
                    value: '2'
                }
            ],
            ownedSalesmanOptions: [
                {}
            ],
            // 表单校验规则
            rules: {
                payableTypeId: [ {
                    type: 'string',
                    required: true,
                    message: '请选择应付单类型',
                    trigger: 'change'
                }],
                code: [ {
                    type: 'string',
                    required: true,
                    message: '请输入应付单号',
                    trigger: 'blur'
                }],
                billDate: [ {
                    // type: 'date',
                    // required: true,
                    message: '请填写时间',
                    trigger: 'blur'
                }],
                currencyCode: [ {
                    type: 'string',
                    required: true,
                    message: '请填写币种',
                    trigger: 'blur'
                }],
                payableOrg: [ {
                    type: 'number',
                    required: true,
                    message: '请填写应付组织',
                    trigger: 'blur'
                }],
                objectType: [ {
                    type: 'string',
                    required: true,
                    message: '请填写往来对象类型',
                    trigger: 'blur'
                }],
                provider: [ {
                    type: 'string',
                    // required: true,
                    message: '请填写供应商',
                    trigger: 'blur'
                }],
                status: [
                    {
                        type: 'string',
                        required: true,
                        message: '请填写单据状态',
                        trigger: 'blur'
                    }
                ],
                ownedDepartment: [ {
                    type: 'string',
                    required: true,
                    message: '请选择所属部门',
                    trigger: 'blur'
                }],
                ownedSalesman: [ {
                    type: 'string',
                    required: true,
                    message: '请选择业务员',
                    trigger: 'blur'
                }],
                sourceDocType: [ {
                    type: 'string',
                    // required: true,
                    message: '请填写来源单据类型',
                    trigger: 'blur'
                }],
                comments: [ {
                    message: '请填写备注',
                    trigger: 'blur'
                }, {
                    max: 30,
                    message: '长度不能超过30个字符',
                    trigger: 'blur'
                }]
            },
            isHasSource: false, // 是否有源
            // 所属部门 tree data
            departmentTreeData: [
                {
                    label: '一级 1',
                    children: [ {
                        label: '二级 1-1',
                        children: [ {
                            label: '三级 1-1-1'
                        },
                        {
                            label: '三级 1-1-2'
                        },
                        {
                            label: '三级 1-1-3'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [ {
                        label: '二级 2-1',
                        children: [ {
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [ {
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [ {
                        label: '二级 3-1',
                        children: [ {
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [ {
                            label: '三级 3-2-1'
                        }]
                    }]
                }
            ],
            treeFilteredNode: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            handleSave: {},
            popoverVisible: false,
            isShowDetail: true,
            isModify: false, // 判断是否位直接开票，用于显示/隐藏按钮
            isHasSource: true, // 是否有源
            dialogVisible: {
                dialogUploadVisible: false
            },
            detailTableData: [],
            isScan: true, // 如果是查看，form变为只读
            isFromPayableBill: true,
            multipleData: {
                data: [],
                index: 0
            }, // 多条数据
            loading: true, // select remote loading
            billStatus: '', // SRR: 保存、收回、驳回；Approve:审批；Submit：提交
            maxLength: 50,
            isChangedBeforeSave: false
        }
    },
    methods: {
        initFormData () {
            this.formData = this.formDataTemp
        },
        // 保存并新增
        handleSaveAndNew () {
            this.handleSave(() => {
                this.formData = this.formDataTemp
            })
        },
        // FIXME: 是否要传入 id ,待定
        handleModify () {
            if (this.billStatus !== 'SRR') {
                this.$message('当前状态无法修改')
                return
            }
            this.addTab(`${this.formData.id}-修改`, 'payable-bill-modify', 'modify', 'payable-bill-detail')
        },
        // TODO: payablebill-detail参照增行
        handleCopyAndAddLine () {

        },
        // 付款
        handlePay () {
            // FIXME: 应付余额 > 0 未进行判断
            if (this.billStatus === 'Approve' && !this.formData.isSuspend) {
                this.secodeConfirmPop('是否支付?', '支付').then(async () => {
                    try {
                        let response = await payableBillService.payBill({ id: this.formData.id })
                        console.log(response, 'payable pay response')
                        if (response.data.status.statusCode === 0) {
                            this.handleResult(response, '支付')
                        } else {
                            this.$message('支付失败')
                        }
                    } catch (error) {
                        console.error(error, 'payablebill pay error reponse')
                    }
                })
            } else {
                this.$message('')
            }
        },
        // 新增
        async billNew (cb) {
            console.log(this.formData, 'save form data')
            this.$refs[ 'payableBillDetalForm' ].validate((valid) => {
                if (valid) {
                    this.secodeConfirmPop('是否新增?', '新增').then(async () => {
                        try {
                            let response = await payableBillService.newBill(this.formData)
                            if (response.data.status.statusCode === 0) {
                                this.isChangedBeforeSave = false
                                this.$message('保存成功')
                                typeof cb === 'function' && cb()
                            } else {
                                this.$message('保存失败')
                            }
                        } catch (error) {
                            console.error(error, 'createWithoutSource response error')
                        }
                    })
                } else {
                    this.$message('参数错误')
                    return false
                }
            })
        },
        // 修改/更新
        async billUpdate () {
            console.log(this.formData, this.billDate, 'update form data')
            this.$refs.payableBillDetalForm.validate((valid) => {
                if (valid) {
                    this.secodeConfirmPop('是否修改?', '修改').then(async () => {
                        try {
                            let response = await payableBillService.modifyData(this.formData)
                            console.log(response, 'modify response')
                            if (response.data.status.statusCode === 0) {
                                this.isChangedBeforeSave = false
                                this.$message('修改成功')
                            } else {
                                this.$message.error('修改失败')
                            }
                        } catch (error) {
                            console.error(error, 'createWithSource response error')
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 弃审操作
        handleAbandon () {
            if (this.billStatus === 'Approve' && !this.formData.isByPush && !this.formData.isSuspend) {
                this.secodeConfirmPop('是否弃审?', '弃审')
                    .then(async () => {
                        try {
                            let response = await payableBillService.cancelApproveBillById({ id: this.formData.id })
                            this.handleResult(response, '弃审')
                        } catch (error) {
                            console.error(error, 'payableBillDetail takebackById error')
                        }
                    })
                    .catch(error => {
                        this.$message({
                            type: 'info',
                            message: '操作已取消'
                        })
                    })
            } else {
                this.$message({
                    type: 'warning',
                    message: '该应付单不能被弃审'
                })
            }
        },
        // 作废操作
        async handleInvalid () {
            this.$prompt('请输入作废原因', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            }).then(async ({ value }) => {
                try {
                    let response = await payableBillService.invalidBillById({
                        id: this.formData.id,
                        invalidReason: value
                    })
                    this.handleResult(response, '作废')
                } catch (error) {
                    console.error(error, 'payableBillDetail invalidById error')
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 冲销操作
        handleRush () {
            try {
                this.secodeConfirmPop('是否红冲?', '红冲').then(async () => {
                    let response = await payableBillService.redRush({ id: this.formData.id })
                    this.handleResult(response, '红冲')
                })
            } catch (error) {
                console.error(error, 'payable detail redrush error')
            }
        },
        // 收回操作
        async handleRecall () {
            this.secodeConfirmPop('是否收回?', '收回')
                .then(async () => {
                    try {
                        let response = await payableBillService.takebackBillById({ id: this.formData.id })
                        this.handleResult(response, '收回')
                    } catch (error) {
                        console.error(error, 'payableBillDetail takebackById error')
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
                        let response = await payableBillService.submitBillById({ id: this.formData.id })
                        this.handleResult(response, '提交')
                    } catch (error) {
                        console.error(error, 'payable bill submit error')
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
                    let response = await payableBillService.rejectBillById({
                        id: this.formData.id,
                        rejectReason: value
                    })
                    this.handleResult(response, '驳回')
                } catch (error) {
                    console.error(error, 'payableBillDetail rejectById error')
                }
            })
                .catch(() => {
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
                        let response = await payableBillService.approveBillById({ id: this.formData.id })
                        this.handleResult(response, '审批')
                    } catch (error) {
                        console.error(error, 'payableBillDetail approveById error')
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
            // 单据状态为
            if (this.billStatus === 'SRR' && !this.formData.isByPush && !this.formData.isSuspend) {
                this.secodeConfirmPop('此操作将永久删除数据, 是否继续?', '删除')
                    .then(async () => {
                        try {
                            let response = await payableBillService.deleteBillById({ id: this.formData.id })
                            this.handleResult(response, '删除')
                            this.initFormData()
                        } catch (error) {
                            console.error(error, 'payableBillDetail deleteById error')
                        }
                    })
                    .catch(error => {
                        this.$message({
                            type: 'info',
                            message: '操作已取消'
                        })
                    })
            } else {
                this.$message({
                    type: 'warning',
                    message: '该应付单不能被删除'
                })
            }
        },
        // 挂起
        async handleSuspend () {
            this.secodeConfirmPop('是否挂起？', '挂起')
                .then(async () => {
                    try {
                        let response = await payableBillService.suspendBillById({ id: this.formData.id })
                        this.handleResult(response, '挂起')
                    } catch (error) {
                        console.error(error, 'payableBillDetail suspendById error')
                    }
                })
                .catch(() => {
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
                        let response = await payableBillService.cancelSuspendBillById({ id: this.formData.id })
                        this.handleResult(response, '取消挂起')
                    } catch (error) {
                        console.error(error, 'payableBillDetail cancleSuspendById error')
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    })
                })
        },
        // 取消操作
        handleCancle (cb) {
            // todo 如未保存 弹窗提示
            let cancleMessage = '是否取消操作？'
            if (this.isChangedBeforeSave) {
                cancleMessage = '单据尚未保存，是否取消？'
            }
            this.$confirm(`${cancleMessage}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs.payableBillDetalForm.resetFields()
                this.$root.bus.$emit('removeTwoLevelTab', this.tabAttr.tag)
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
            // 作废
            if (command === 'invalid') {
                if (this.billStatus === 'Approve' && !this.formData.isByPush && !this.formData.isSuspend) {
                    this.handleInvalid()
                } else {
                    this.$message({
                        type: 'warning',
                        message: '该应付单不能被作废'
                    })
                }
            }
            // 冲销
            if (command === 'redRush') {
                if (this.billStatus === 'Approve' && !this.formData.isByPush && !this.formData.isSuspend) {
                    this.handleRush()
                } else {
                    this.$message({
                        type: 'warning',
                        message: '该应付单不能被冲销'
                    })
                }
            }
            // 取消挂起
            if (command === 'cancelSuspend') {
                this.handleCancleSuspend()
            }
            // 挂起
            if (command === 'suspend') {
                this.handleSuspend()
            }
        },
        // 联查
        handleUnionSearchCommand (command) {
            console.log(command, '联查 command')
        },
        // tree node click
        handleNodeClick (data, node, el, type) {
            if (data.children) return
            this.formData.ownedDepartment = data.label
            this.formData.ownedSalesman = data.label
        },
        getFilterTreeNode (treeNode, filter) {
            if (treeNode.children) {
                treeNode.children.forEach((item, index) => {
                    this.getFilterTreeNode(item, filter)
                })
            } else if (treeNode.label.indexOf(filter) >= 0) {
                this.treeFilteredNode.push({
                    label: treeNode.label,
                    value: treeNode.label
                })
            }
        },
        // select remote method
        remoteMethod (query) {
            if (query !== '') {
                this.departmentTreeData.forEach((item, index) => {
                    this.getFilterTreeNode(item, query)
                })
                this.loading = false
                console.log(this.treeFilteredNode, 'filtered filtered filtered')
            } else {
                this.treeFilteredNode = []
            }
        },
        getIntialData () {
            // 判断状态[修改、浏览、新增]
            let modeParam = this.tabType
            console.log(this.tabType, 'this.tabType this.tabType this.tabType')
            if (modeParam === 'modify' || modeParam === 'scan') {
                // 浏览状态切换form是否可写
                if (modeParam === 'scan') {
                    this.isModify = false
                    this.isScan = true
                } else {
                    this.isModify = true
                    this.isScan = false
                }
                // 来自付款单列表
                if (this.tabAttr.tag.endsWith('payableBillData')) {
                    // 控制对应操作按钮显示隐藏
                    this.isFromPayableBill = true
                    console.log('this.tabAttr.tag.endsWidth')
                } else {
                    // 来自入库通知单/付款单
                    this.isFromPayableBill = false
                }
                this.formData.id = this.Billing_G_GET_HANDLE_DATA.payableBillIds[ 0 ]
                this.multipleData.data = this.Billing_G_GET_HANDLE_DATA.payableBillIds
                console.log(this.formData, this.Billing_G_GET_HANDLE_DATA, 'payablelist detail formData')
                this.getDataById()
                // 判断是否有源
                this.isHasSource = !(this.formData.sourceDocType === '手工创建')
                console.log(this.isHasSource, 'this.isHasSourcethis.isHasSourcethis.isHasSourcethis.isHasSource')
                if (!this.formData.invoiceInfoDetailList) {
                    this.formData.invoiceInfoDetailList = []
                }
                // 保存按钮调用更新接口
                this.handleSave = this.billUpdate
            }
            // 新建
            if (modeParam === 'new') {
                this.isModify = false
                this.isScan = false
                // 获取应付单编码
                this.getBillCode()
                // 初始化表头数据
                this.formData = { ...this.formDataTemp }
                // 表体数据初始化
                this.detailTableData = this.formData.payableInfoDetailDOList
                // 判断是否有源
                this.isHasSource = !(this.formData.sourceDocType === '手工创建')
                console.log(this.isHasSource, 'this.isHasSourcethis.isHasSourcethis.isHasSourcethis.isHasSource')
                // 保存按钮调用保存（新建）接口
                this.handleSave = this.billNew
            }
        },
        // 根据 id 查询付款单信息
        async getDataById (id) {
            try {
                let response
                if (id && typeof id !== 'object') {
                    response = await payableBillService.getBillById({ id })
                } else {
                    response = await payableBillService.getBillById({ id: this.formData.id })
                }
                if (response.data.status.statusCode === 0) {
                    // 表头数据
                    this.formData = response.data.result
                    // 表体数据
                    if (response.data.result.payableInfoDetailDOList) {
                        this.detailTableData = response.data.result.payableInfoDetailDOList
                    }
                    // 设置bill状态
                    this.setBillStatus(this.formData.status)
                    // 获取单据状态
                    this.getStatus()
                }
            } catch (error) {
                console.error(error, 'getPayInfoById response error')
            }
        },
        async getStatus () {
            try {
                let response = await payableBillService.getBillStatus({ id: this.formData.id })
                if (response.data.status.statusCode === 0) {
                    this.formData = Object.assign(this.formData, response.data.result)
                } else {
                    this.$message('状态请求失败')
                }
            } catch (error) {
                console.error(error, 'getstatus error')
            }
        },
        // 自制应付单时获取应付单编码
        async getBillCode () {
            let response = await payableBillService.getBillCode('getBillCode')
            this.formData.code = this.formDataTemp.code = response.data.result
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
                type: resultMsg.type,
                beforeClose: (action, instance, done) => {
                    if (action === '删除') {
                        this.formData = {}
                        done()
                    } else {
                        this.getDataById(this.multipleData.data[ this.multipleData.index ])
                        done()
                    }
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
            this.$root.bus.$emit('payableBill', name, tag, tabType, content)
        },
        // 判断当前订单状态 操作对应按钮
        setBillStatus (status) {
            if (status === '已保存' || status === '已收回' || status === '已驳回') {
                this.billStatus = 'SRR'
            }
            if (status === '已审批') {
                this.billStatus = 'Approve'
            }
            if (status === '已提交') {
                this.billStatus = 'Submit'
            }
            console.log(this.billStatus, 'billStatus billStatus billStatus')
        }
    },
    created () {
        this.$nextTick(() => {
            this.getIntialData()
        })
    },
    computed: {
        ...mapGetters([
            'Billing_G_GET_HANDLE_DATA'
        ]),
        // 映射发票状态
        status () {
            switch (this.formData.status) {
                case -1:
                    return '已删除'
                case 0:
                    return '已保存'
                case 1:
                    return '已提交'
                case 2:
                    return '已审批'
                case 3:
                    return '已核销'
                case 4:
                    return '已收回'
                case 5:
                    return '已驳回'
                case 6:
                    return '已作废'
                case 7:
                    return '已红冲'
                case 8:
                    return '已关闭'
                default:
                    return '不知道呢'
            }
        },
        // 日期格式化
        billDate: {
            get: function () {
                if (this.formData.docDate) {
                    return new Date(parseInt(this.formData.docDate))
                } else {
                    return new Date()
                }
            },
            set: function (val) {
                if (this.formData) {
                    this.formData.docDate = val.getTime().toString()
                }
            }
        }
    },
    watch: {
        tabState () {
            if (this.tabState.name === this.tabAttr.tag) {
                this.getDataById()
            }
        },
        formData () {
            if (this.tabState.name === this.tabAttr.tag) {
                this.isChangedBeforeSave = true
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

<style lang="scss">
.department-popover {
  margin-top: 0;
  .popper__arrow {
    display: none;
  }
}
</style>
