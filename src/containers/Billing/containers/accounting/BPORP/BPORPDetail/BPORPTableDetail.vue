<template>
    <section class="invoicing billing-form-inline">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="handleGoBack">返回</el-button>
        </div>
        <el-table ref="multipleTable" :data="PORDetailTableData" border tooltip-effect="light" style="width: 100%" highlight-current-row>
            <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
            <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
            <el-table-column header-align="center" v-for="(item, index) in PORDetailCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row[item.prop] }}
                </template>
            </el-table-column>
        </el-table>
        <div class="el-pagination-content">
            <el-pagination @size-change="handleSelfSizeChange" @current-change="handleSelfCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
            </el-pagination>
        </div>
        <transition name="detail">
            <sub-detail v-if="isShowDetail" :isHasSource="isModify || isScan" :detailTableData="detailTableData"></sub-detail>
        </transition>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
// components
import slider from '@Billing/components/SelectionSlider.vue'
import subDetail from './SubTableDetail'
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
            PORDetailCols: [
                {
                    prop: 'thisDocGenType',
                    label: '本方单据大类'
                },
                {
                    prop: 'verificationType',
                    label: '本方单据类型'
                },
                {
                    prop: 'code',
                    label: '本方单据编号'
                },
                {
                    prop: 'verificationDate',
                    label: '本方可核销金额'
                },
                {
                    prop: 'orgId',
                    label: '本方本次核销金额'
                },
                {
                    prop: 'objectName',
                    label: '对方单据大类'
                },
                {
                    prop: 'verificationUser',
                    label: '对方单据类型'
                },
                {
                    prop: 'thisDocGenType',
                    label: '对方单据编号'
                },
                {
                    prop: 'otherDocGenType',
                    label: '对方可核销金额'
                },
                {
                    prop: 'thisTotal',
                    label: '对方本次核销金额'
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
            isSimulation: true, // 模拟核销
            verificationRequest: {},
            currentPage: 1,
            pageSize: 1,
            pageCount: 10
        }
    },
    methods: {
        initFormData () {
            // FIXME: 应付冲应收核销界面 没有form表单
            this.formData = this.formDataTemp
        },
        handleGoBack () {
            this.$root.bus.$emit('removeTwoLevelTab', this.tabAttr.tag)
        },
        handleSelfSizeChange (val) {
            console.log(`page size ${val}`)
        },
        handleSelfCurrentChange (val) {
            console.log(`current page ${val}`)
        },
        getIntialData () {
            if (this.tabState.name === this.tabAttr.tag) {
                this.bporpBillDetailIds = this.Billing_G_GET_HANDLE_DATA.bporpBillIds
                this.getBillDetailById()
            }
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
        addTab (name, tag, tabType, content) {
            this.$root.bus.$emit('BPORPBill', name, tag, tabType, content)
        },
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
    computed: {
        ...mapGetters([
            'Billing_G_GET_HANDLE_DATA'
        ])
    },
    watch: {
        tabState () {

        }
    },
    components: {
        subDetail,
        uploadDialog,
        slider
    }
}
</script>
