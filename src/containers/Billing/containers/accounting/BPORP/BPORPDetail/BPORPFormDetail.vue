<template>
    <section class="invoicing billing-form-inline">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="handleCancleWriteOff">取消核销</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleShowDetail">查看明细</el-button>
        </div>
        <el-form :inline="true" :model="formData" ref="bporp-detail-form">
            <!-- <el-form-item label="核销标志" prop="payOriginazation">
                <el-input v-model="formData.payOriginazation" :disabled="isModify" :readonly="isScan" placeholder="请输入应付单类型"></el-input>
            </el-form-item> -->
            <el-form-item label="核销方式" prop="verificationMethod">
                <el-input v-model="formData.verificationMethod" :disabled="isModify" :readonly="isScan" placeholder="请输入核销方式"></el-input>
            </el-form-item>
            <el-form-item label="核销类型" prop="verificationType">
                <el-input v-model="formData.verificationType" :disabled="isModify" :readonly="isScan" placeholder="请输入核销类型"></el-input>
            </el-form-item>
            <el-form-item label="核销编号" prop="code">
                <el-input v-model="formData.code" :disabled="isModify" :readonly="isScan" placeholder="请输入核销编号"></el-input>
            </el-form-item>
            <el-form-item label="核销日期" prop="verificationDate">
                <el-input v-model="formData.verificationDate" :disabled="isModify" :readonly="isScan" placeholder="请输入核销日期"></el-input>
            </el-form-item>
            <el-form-item label="核算组织" prop="orgId">
                <el-input v-model="formData.orgId" :disabled="isModify" :readonly="isScan" placeholder="请输入核算组织"></el-input>
            </el-form-item>
            <el-form-item label="应付供应商" prop="objectName">
                <el-input v-model="formData.objectName" :disabled="isModify" :readonly="isScan" placeholder="请输入应付供应商"></el-input>
            </el-form-item>
            <el-form-item label="核销人" prop="verificationUser">
                <el-input v-model="formData.verificationUser" :disabled="isModify" :readonly="isScan" placeholder="请输入核销人"></el-input>
            </el-form-item>
            <el-form-item label="本方单据大类" prop="thisDocGenType">
                <el-input v-model="formData.thisDocGenType" :disabled="isModify" :readonly="isScan" placeholder="请输入本方单据大类"></el-input>
            </el-form-item>
            <el-form-item label="对方单据大类" prop="otherDocGenType">
                <el-input v-model="formData.otherDocGenType" :disabled="isModify" :readonly="isScan" placeholder="请输入对方单据大类"></el-input>
            </el-form-item>
            <el-form-item label="本方核销金额" prop="thisTotal">
                <el-input v-model="formData.thisTotal" :disabled="isModify" :readonly="isScan" placeholder="请输入本方核销金额"></el-input>
            </el-form-item>
            <el-form-item label="对方核销金额" prop="otherTotal">
                <el-input v-model="formData.otherTotal" :disabled="isModify" :readonly="isScan" placeholder="请输入对方核销金额"></el-input>
            </el-form-item>
        </el-form>
        <transition name="detail">
            <sub-detail :isHasSource="isModify || isScan" :detailTableData="detailTableData"></sub-detail>
        </transition>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
// components
import slider from '@Billing/components/SelectionSlider.vue'
import subDetail from './SubDetail.vue'
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
                    prop: 'objectName',
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
            dialogVisible: {
                dialogUploadVisible: false
            },
            detailTableData: {},
            bporpBillDetailIds: [],
            isScan: true, // 如果是查看，form变为只读
            isSimulation: true, // 模拟核销
            verificationRequest: {},
            currentPage: 1,
            pageSize: 1,
            pageCount: 10
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
        async handleCancleWriteOff() {
            try {
                let response = await BPORPService.BPORPCancleVerification({id: this.detailTableData.id})
                if (response.data.status.statusCode === 0) {
                    this.$message('取消成功')
                } else {
                    this.$message('取消失败')
                }
            } catch (error) {
                console.error(error, 'cancle verification error')
            }
        },
        // 查看明细
        handleShowDetail () {
            this.addTab(`${this.bporpBillDetailIds[0]}-详情`, `bporpBill-${this.bporpBillDetailIds[0]}-detail`, 'scan', 'bporp-table-detail')
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
        handleSelfSizeChange (val) {
            console.log(`page size ${val}`)
        },
        handleSelfCurrentChange (val) {
            console.log(`current page ${val}`)
        },
        getIntialData() {
            if (this.tabState.name === this.tabAttr.tag) {
                this.bporpBillDetailIds = this.Billing_G_GET_HANDLE_DATA.bporpBillIds
                this.getBillDetailById()
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
        async getBillDetailById () {
            try {
                let response = await BPORPService.getBPORPDetail({id: this.bporpBillDetailIds[0]})
                if (response.data.status.statusCode === 0) {
                    this.formData = response.data.result
                    this.detailTableData = response.data.result
                } else {
                    this.handleResult(response, '查询')
                }
            } catch (error) {
                console.error(error)
            }
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
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('BPORPBill', name, tag, tabType, content)
        },
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
