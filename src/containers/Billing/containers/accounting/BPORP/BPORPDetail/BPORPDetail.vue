<template>
    <section class="invoicing billing-form-inline">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="reSelection">重新选择</el-button>
            <el-button size="small" :plain="true" type="primary" v-if="isSimulation" @click="handleWriteOff">核销</el-button>
            <el-button size="small" :plain="true" type="primary" v-if="!isSimulation" @click="handleCancleWriteOff">取消核销</el-button>
        </div>
        <!-- <p>已生成{{multipleData.data.length}}个【应收单生成合同立账】，当前操作第{{multipleData.index + 1}}个，
                    <a href="javascript:;">【查看所有应付单】</a>
                </p> -->
        <!-- <el-form :inline="true" :model="formData" :rules="VATComputed" ref="paymentBillDetalForm">
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
                </el-form> -->
        <el-table ref="multipleTable" :data="PORDetailTableData" border tooltip-effect="light" style="width: 100%" highlight-current-row>
            <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
            <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
            <el-table-column header-align="center" v-for="(item, index) in PORDetailCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row[item.prop] }}
                </template>
            </el-table-column>
        </el-table>
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
import { mapGetters } from 'vuex'
// components
import slider from '@Billing/components/SelectionSlider.vue'
import subDetail from './SubDetail'
import uploadDialog from './UploadFileDialog.vue'
// service
import BPORPService from '@Billing/services/BPORPService.js'
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
            PORDetailCols: [
                {
                    prop: 'verificationMethod',
                    label: '核销方式'
                },
                {
                    prop: 'verificationType',
                    label: '核销类型**'
                },
                {
                    prop: 'code',
                    label: '核销编号'
                },
                {
                    prop: 'verificationDate',
                    label: '核销日期'
                },
                {
                    prop: 'orgId',
                    label: '核算组织'
                },
                {
                    prop: 'provider',
                    label: '应付供应商'
                },
                {
                    prop: 'verificationUser',
                    label: '核销人'
                },
                {
                    prop: 'thisDocGenType',
                    label: '本方单据大类'
                },
                {
                    prop: 'otherDocGenType',
                    label: '对方单据大类'
                },
                {
                    prop: 'thisTotal',
                    label: '本方核销金额'
                },
                {
                    prop: 'otherTotal',
                    label: '对方核销金额'
                },
                {
                    prop: 'comments',
                    label: '备注'
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
            detailTableData: {},
            isScan: true, // 如果是查看，form变为只读
            isSimulation: true // 模拟核销
        }
    },
    methods: {
        initFormData() {
            // FIXME: 应付冲应收核销界面 没有form表单
            this.formData = this.formDataTemp
        },
        // 保存并下一个
        handleSaveAndNext() {
            // this.handleSave()
            this.switchData(1)
        },
        // TODO:  应付冲应收 核销 重新选单
        reSelection() {

        },
        // TODO:  应付冲应收 核销 取消核销
        handleCancleWriteOff() {

        },
        // 核销
        async handleWriteOff () {
            // FIXME: 关闭当前标签 页
            let reqData = this.Billing_G_GET_HANDLE_DATA.bporpSimulationRequestData
            try {
                let response = await BPORPService.BPORPVerification(reqData)
                if (response.data.status.statusCode === 0) {
                    this.handleResult(response, '核销')
                }
            } catch (error) {
                console.error(error, 'verification error')
            }
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
        getIntialData() {
            console.log(this.tabState, 'tabState tabState tabState tabState tabState')
            if (this.tabState.name === this.tabAttr.tag) {
                // 模拟核销
                if (this.tabState.name.endsWith('simulation')) {
                    this.isSimulation = true
                } else {
                    // 核销
                    this.isSimulation = false
                }
            }
            this.detailTableData = this.Billing_G_GET_HANDLE_DATA.bporpSimulationData
            this.PORDetailTableData = [this.Billing_G_GET_HANDLE_DATA.bporpSimulationData]
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
        ])
    },
    watch: {
        tabState() {

        }
    },
    components: {
        subDetail,
        uploadDialog,
        slider
    }
}
</script>
