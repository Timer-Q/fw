<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="reSelectionBill">重新选单</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleWriteOff">核销</el-button>
            <el-button size="small" :plain="true" type="primary" :disabled="!isCanSimulationWriteOff" @click="handleSimulationWriteOff">模拟核销</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleCancle">取消</el-button>
        </div>
        <!-- 我方 -->
        <section class="billing-wrapper">
            <h3 class="billing-header">
                我方
                <div class="tool-menu">
                    <i class="el-icon-menu"></i>
                </div>
            </h3>
            <el-table ref="multipleTable" :data="selfTableData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in selfCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-if="item.prop === 'verifyAmountThisTime'" v-model="scope.row[item.prop]"></el-input>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSelfSizeChange" @current-change="handleSelfCurrentChange" :current-page="page.self.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.self.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.self.pageCount">
                </el-pagination>
            </div>
        </section>
        <!-- 对方 -->
        <section class="billing-wrapper">
            <h3 class="billing-header">
                对方
                <div class="tool-menu">
                    <i class="el-icon-menu"></i>
                </div>
            </h3>
            <el-table ref="multipleTable" :data="oppositeTableData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in oppositeCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-if="item.prop === 'verifyAmountThisTime'" v-model="scope.row[item.prop]"></el-input>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleOppositeSizeChange" @current-change="handleOppositeCurrentChange" :current-page="page.opposite.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.opposite.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.opposite.pageCount">
                </el-pagination>
            </div>
        </section>

        <search-dialog :dialogTitle="searchDialogData.dialogTitle" :dialogVisible="searchDialogData" :gridData="searchDialogData.gridData">
            <div slot="content">
                <el-form label-width="90px" class="condition-form" :inline="true" :model="conditionFormData">
                    <el-form-item label="核算组织">
                        <el-select v-model="conditionFormData.verificationOrg" placeholder="请选择核算组织">
                            <el-option v-for="(item, index) in payableOrganizationOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收/付款组织">
                        <el-select v-model="conditionFormData.payOrReceiveOrg" placeholder="请选择收/付款组织">
                            <el-option label="付款组织" value="201"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="form-slipped">
                    <div class="condition-form-side">
                        <h5>本方</h5>
                        <el-form label-width="90px" class="condition-form" :rules="selfRules" :model="selfConditionFormData" :inline="true">
                            <el-form-item label="核销对象" prop="verificationObject">
                                <el-select v-model="selfConditionFormData.verificationObject" disabled placeholder="请选择核销对象">
                                    <el-option v-for="(item, index) in verificationObjectOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="对象名称" prop="objectName">
                                <el-select v-model="selfConditionFormData.objectName" placeholder="请选择对象名称">
                                    <el-option v-for="(item, index) in objectNameOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据大类" prop="docGenType">
                                <el-select v-model="selfConditionFormData.docGenType" disabled placeholder="请选择单据大类">
                                    <el-option v-for="(item, index) in docGenTypeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据类型" prop="docType">
                                <el-select v-model="selfConditionFormData.docType" placeholder="请选择单据类型">
                                    <el-option v-for="(item, index) in docTypeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始时间" prop="selfStartTime">
                                <!-- <el-date-picker v-model="selfConditionFormData.startTime" type="date" placeholder="选择日期"> -->
                                <el-date-picker v-model="selfStartTime" type="datetime" placeholder="选择日期" :picker-options="selfStartPickerOption" :clearable="false">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间" prop="selfEndTime">
                                <!-- <el-date-picker v-model="selfConditionFormData.endTime" type="date" placeholder="选择日期"> -->
                                <el-date-picker v-model="selfEndTime" type="datetime" placeholder="选择日期" :picker-options="selfEndPickerOption" :clearable="false">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="业务员" prop="ownedSalesman">
                                <el-select v-model="selfConditionFormData.ownedSalesman" placeholder="请选择业务员">
                                    <el-option v-for="(item, index) in ownedSalesmanOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属部门" prop="ownedDepartment">
                                <el-input v-model="selfConditionFormData.ownedDepartment" placeholder="请输入所属部门"></el-input>
                            </el-form-item>
                            <el-form-item label="单据号" prop="docCode">
                                <el-select v-model="selfConditionFormData.docCode" placeholder="请选择单据号">
                                    <el-option v-for="(item, index) in docCodeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品/费项" prop="goodsOrChargeCode">
                                <el-select v-model="selfConditionFormData.goodsOrChargeCode" placeholder="请选择商品/费项">
                                    <el-option v-for="(item, index) in goodsOrChargeCodeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="condition-form-side">
                        <h5>对方</h5>
                        <el-form label-width="90px" class="condition-form" :model="oppsideConditionFormData" :inline="true">
                            <el-form-item label="核销对象" prop="verificationObject">
                                <el-select v-model="oppsideConditionFormData.verificationObject" disabled placeholder="请选择核销对象">
                                    <el-option v-for="(item, index) in verificationObjectOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="对象名称" prop="objectName">
                                <el-select v-model="oppsideConditionFormData.objectName" disabled placeholder="请选择对象名称">
                                    <el-option v-for="(item, index) in objectNameOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据大类" prop="docGenType">
                                <el-select v-model="oppsideConditionFormData.docGenType" disabled placeholder="请选择单据大类">
                                    <el-option v-for="(item, index) in docGenTypeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据类型" prop="docType">
                                <el-select v-model="oppsideConditionFormData.docType" placeholder="请选择单据类型">
                                    <el-option v-for="(item, index) in docTypeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始时间" prop="oppositeStartTime">
                                <el-date-picker v-model="oppositeStartTime" type="datetime" placeholder="选择日期" :picker-options="oppositeStartPickerOption" :clearable="false">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间" prop="oppositeEndTime">
                                <el-date-picker v-model="oppositeEndTime" type="datetime" placeholder="选择日期" :picker-options="oppositeEndPickerOption" :clearable="false">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="业务员" prop="ownedSalesman">
                                <el-select v-model="oppsideConditionFormData.ownedSalesman" placeholder="请选择业务员">
                                    <el-option v-for="(item, index) in ownedSalesmanOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属部门" prop="ownedDepartment">
                                <el-input v-model="oppsideConditionFormData.ownedDepartment" placeholder="请输入所属部门"></el-input>
                            </el-form-item>
                            <el-form-item label="单据号" prop="docCode">
                                <el-select v-model="oppsideConditionFormData.docCode" placeholder="请选择单据号">
                                    <el-option v-for="(item, index) in docCodeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品/费项" prop="goodsOrChargeCode">
                                <el-select v-model="oppsideConditionFormData.goodsOrChargeCode" placeholder="请选择商品/费项">
                                    <el-option v-for="(item, index) in goodsOrChargeCodeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="warning" @click="searchBillList">立即查询</el-button>
            </div>
        </search-dialog>
    </section>
</template>

<script>
// components
import searchDialog from '@Billing/components/SearchDialog.vue'
// service
import BPORPService from '@Billing/services/BPORPService.js'

export default {
    props: {
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
            selfTableData: [
                {
                    docGenType: '',
                    docType: '',
                    time: '',
                    payGroup: '',
                    docNum: '',
                    payableAmount: '',
                    amountCanBeVerified: '',
                    verifyAmountThisTime: '',
                    ownedDepartment: '',
                    ownedSalesman: '',
                    goodsOrChargeCode: '',
                    sourceDocType: '',
                    sourceDocNum: '',
                    originalDocType: '',
                    originalDocCode: ''
                }
            ],
            oppositeTableData: [
                {
                    docGenType: '',
                    docType: '',
                    time: '',
                    payGroup: '',
                    docNum: '',
                    payableAmount: '',
                    amountCanBeVerified: '',
                    verifyAmountThisTime: '',
                    ownedDepartment: '',
                    ownedSalesman: '',
                    goodsOrChargeCode: '',
                    sourceDocType: '',
                    sourceDocNum: '',
                    originalDocType: '',
                    originalDocCode: ''
                }
            ],
            selfCols: [
                {
                    prop: 'docGenType',
                    label: '本方单据大类'
                },
                {
                    prop: 'docType',
                    label: '本方单据类型',
                    scope: true
                },
                {
                    prop: 'time',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'docCode',
                    label: '本方单据编号'
                },
                {
                    prop: 'docNum',
                    label: '本方单据行号'
                },
                {
                    prop: 'payableAmount',
                    label: '应付金额'
                },
                {
                    prop: 'amountCanBeVerified',
                    label: '可核销金额'
                },
                {
                    prop: 'verifyAmountThisTime',
                    label: '本次核销金额'
                },
                {
                    prop: 'ownedDepartment',
                    label: '所属部门'
                },
                {
                    prop: 'ownedSalesman',
                    label: '所属业务员'
                },
                {
                    prop: 'goodsOrChargeCode',
                    label: '商品/费项'
                },
                {
                    prop: 'sourceDocType',
                    label: '来源单据类型'
                },
                {
                    prop: 'sourceDocNum',
                    label: '来源单号'
                },
                {
                    prop: 'originalDocType',
                    label: '源单类型'
                },
                {
                    prop: 'originalDocCode',
                    label: '源单编号'
                }
            ],
            oppositeCols: [
                {
                    prop: 'docGenType',
                    label: '对方单据大类'
                },
                {
                    prop: 'docType',
                    label: '对方单据类型',
                    scope: true
                },
                {
                    prop: 'time',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'docCode',
                    label: '对方单据编号'
                },
                {
                    prop: 'docNum',
                    label: '对方单据行号'
                },
                {
                    prop: 'payableAmount',
                    label: '应付金额'
                },
                {
                    prop: 'amountCanBeVerified',
                    label: '可核销金额'
                },
                {
                    prop: 'verifyAmountThisTime',
                    label: '本次核销金额'
                },
                {
                    prop: 'ownedDepartment',
                    label: '所属部门'
                },
                {
                    prop: 'ownedSalesman',
                    label: '所属业务员'
                },
                {
                    prop: 'goodsOrChargeCode',
                    label: '商品/费项'
                },
                {
                    prop: 'sourceDocType',
                    label: '来源单据类型'
                },
                {
                    prop: 'sourceDocNum',
                    label: '来源单号'
                },
                {
                    prop: 'originalDocType',
                    label: '源单类型'
                },
                {
                    prop: 'originalDocCode',
                    label: '源单编号'
                }
            ],
            selfRules: { // 校验规则， 日期 required 不可清除，所以未进行校验
                objectName: [
                    {
                        required: true,
                        message: '应付供应商不能为空',
                        trigger: 'change'
                    }
                ]
            },
            page: {
                self: {
                    currentPage: 1,
                    pageSize: 10,
                    pageCount: 10
                },
                opposite: {
                    currentPage: 1,
                    pageSize: 10,
                    pageCount: 10
                }
            },
            // currentPage: 1,
            // pageSize: 10,
            // pageCount: 10,
            isShowDetail: false,
            searchDialogData: {
                dialogTitle: '查询',
                dialogTableVisible: true,
                gridData: [
                    {
                        conditionName: '单据日期',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '应付组织',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '应付供应商',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '发票供应商',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '供应商',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '业务部门',
                        compareSymbol: '',
                        conditionValue: ''
                    },
                    {
                        conditionName: '业务员',
                        compareSymbol: '',
                        conditionValue: ''
                    }
                ]
            },
            currentPayableBillDetail: [],
            tableSelectionData: {
                list: [],
                ids: []
            },
            conditionFormData: {
                verificationOrg: 2,
                payOrReceiveOrg: 'zhifuzuzhi'
            },
            selfConditionFormData: { // 我方表单数据
                verificationObject: 'PROVIDER',
                docGenType: 'PAYABLE',
                objectName: 'yingfugongyingshang',
                writeOffDate: new Date().getTime().toString(),
                startTime: new Date().getTime().toString(),
                endTime: new Date().getTime().toString()
            },
            oppsideConditionFormData: {
                verificationObject: 'PROVIDER',
                docGenType: 'PAYABLE',
                objectName: '蓝应付冲红应付专用',
                writeOffDate: new Date().getTime().toString(),
                startTime: new Date().getTime().toString(),
                endTime: new Date().getTime().toString()
            },
            payableOrganizationOptions: [
                {
                    label: '核销组织',
                    value: 2
                }
            ],
            verificationObjectOptions: [ // 核销对象options
                {
                    label: '客户',
                    value: 'CUSTOMER'
                },
                {
                    lable: '供应商',
                    value: 'PROVIDER'
                },
                {
                    label: '',
                    value: 'DEPARTMENT'
                },
                {
                    label: '',
                    value: 'MEMBER'
                }
            ],
            objectNameOptions: [ // 对象名称 options
                {
                    label: '应付供应商',
                    value: 'yingfugongyingshang'
                },
                {
                    label: '蓝应付冲红应付专用',
                    value: '蓝应付冲红应付专用'
                }
            ],
            docGenTypeOptions: [ // 单据大类 options
                {
                    label: '应收单',
                    value: 'RECEIVABLE'
                },
                {
                    label: '应付单',
                    value: 'PAYABLE'
                },
                {
                    label: '收款单',
                    value: 'RECEIPT'
                },
                {
                    label: '付款单',
                    value: 'PAY'
                },
            ],
            docTypeOptions: [ // 单据类型 options
                {
                    label: '1',
                    value: 1
                }
            ],
            ownedSalesmanOptions: [ // 业务员 options
                {
                    label: '业务员',
                    value: 'yewuyuan'
                }
            ],
            docCodeOptions: [ // 单据号 options
                {
                    label: 'YFD60773831913897984',
                    value: 'YFD60773831913897984'
                },
                {
                    label: 'YFD60811039387586560',
                    value: 'YFD60811039387586560'
                }
            ],
            goodsOrChargeCodeOptions: [ // 商品/费项 options
                {
                    label: '1',
                    value: '1'
                }
            ],
            isCanSimulationWriteOff: false,
            selfSum: 0,
            oppositeSum: 0,
            selfStartPickerOption: { // 我方开始时间日期范围
                disabledDate: (time) => {
                    return time.getTime() > new Date(this.selfEndTime).getTime()
                }
            },
            oppositeStartPickerOption: { // 对方开始时间日期范围
                disabledDate: (time) => {
                    return time.getTime() > new Date(this.oppositeEndTime).getTime()
                }
            },
            selfEndPickerOption: { // 我方结束时间日期范围
                disabledDate: (time) => {
                    return time.getTime() < new Date(this.selfStartTime).getTime()
                }
            },
            oppositeEndPickerOption: { // 对方结束时间日期范围
                disabledDate: (time) => {
                    return time.getTime() < new Date(this.oppositeStartTime).getTime()
                }
            },
        }
    },
    methods: {
        // 重新选单 按钮 事件
        reSelectionBill() {
            console.log('重新选单 action')
            this.searchDialogData.dialogTableVisible = true
        },
        // 核销 按钮 事件
        handleWriteOff() {
            console.log('核销 action')
            // TODO:  自动校验本方和对方本次核销金额，双方不等时置灰，相等时可单击"核销"
            // TODO:  根据累计本次核销金额为基础，按照单据编号从小到大的顺序，自动以本方"应付余额"和对方单据"应收余额"为限，计算该单据本次核销金额
            // TODO:  新建"手动核销-详情"页签
            this.addTab("应付冲应收-核销", 'por-writeOff', '', 'por-detail')
            // TODO:  关闭当前页签
        },
        // 模拟核销 按钮 事件
        async handleSimulationWriteOff() {
            console.log('模拟核销 action')
            let reqData = {
                left: [
                    ...this.selfTableData
                ],
                right: [
                    ...this.oppositeTableData
                ]
            }
            let response = await BPORPService.BRORP(reqData)
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', {
                bporpSimulationData: response.data.result
            })
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', {
                bporpSimulationRequestData: reqData
            })
            // FIXME: 模拟核销前会关闭当前标签页
            this.addTab('篮字应付冲红字应付-模拟核销', 'BPOBP-simulation', '', 'bporp-detail')
            console.log(response, '模拟核销 结果 response')
        },
        // elementUI table 切换复选款事件
        handleSelectionChange(selection) {
            this.tableSelectionData.list = selection
            this.tableSelectionData.ids = this.tableSelectionData.list.map(item => item.id)
        },
        // 取消事件
        // FIXME: 该页面没有取消事件 该事件为关闭tab测试事件 后续删除
        handleCancle() {
            this.$root.bus.$emit(`removeTwoLevelTab`, this.tabState.name)
        },
        // 我方 分页 - 切换每一页显示内容条数
        handleSelfSizeChange (pageSize) {
            console.log(`每页 ${pageSize} 条`)
            this.page.self.pageSize = pageSize
            this.searchPaymentBillList()
        },
        // 我方 分页 - 切换页码事件
        handleSelfCurrentChange (currentPage) {
            console.log(`当前页: ${currentPage}`)
            this.page.self.currentPage = currentPage
            this.searchPaymentBillList()
        },
        // 对方 分页 - 切换每一页显示内容条数
        handleOppositeSizeChange (pageSize) {
            console.log(`每页 ${pageSize} 条`)
            this.page.opposite.pageSize = pageSize
            this.searchPaymentBillList()
        },
        // 对方 分页 - 切换页码事件
        handleOppositeCurrentChange (currentPage) {
            console.log(`当前页: ${currentPage}`)
            this.page.opposite.currentPage = currentPage
            this.searchPaymentBillList()
        },
        // 每一行点击事件
        async handleRowClick(row, event, column) {
            console.log(row, event, column)
        },
        handleTooltipEmit() {
            console.log('emit test')
        },
        handleShowDetail() {
            console.log('show detail')
            this.isShowDetail = !this.isShowDetail
        },
        // 确认开票
        confirmBilling() {
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', {
                payableBillIds: this.tableSelectionData.ids
            })
            this.addTab('应付单-入库通知单立账', 'instock-notice-billing', 'scan', 'payable-bill-detail')
        },
        // 弹窗查询应付单
        async searchBillList() {
            let selfResponseOut,
                oppositeResponseOut
            try {
                let response = await Promise.all([
                    BPORPService.getBluePayableBillList({ pageNum: this.page.self.pageSize * (this.page.self.currentPage - 1), pageSize: this.page.self.pageSize, ...this.conditionFormData, ...this.selfConditionFormData }),
                    BPORPService.getRedPayableBillList({ pageNum: this.page.opposite.pageSize * (this.page.opposite.currentPage - 1), pageSize: this.page.opposite.pageSize, ...this.conditionFormData, ...this.oppsideConditionFormData })
                ]).then(([selfResponse, oppositeResponse]) => {
                    selfResponseOut = selfResponse
                    oppositeResponseOut = oppositeResponse
                    // 我方返回结果处理
                    if (selfResponse.data.status.statusCode === 0) {
                        this.page.self.pageCount = selfResponse.data.result.total
                        this.selfTableData = selfResponse.data.result.list
                        // 关闭弹窗
                        this.searchDialogData.dialogTableVisible = false
                    } else {
                        console.error('我方单据请求失败')
                    }
                    // 对方返回结果处理
                    if (oppositeResponse.data.status.statusCode === 0) {
                        this.page.opposite.pageCount = oppositeResponse.data.result.total
                        this.oppositeTableData = oppositeResponse.data.result.list
                        // 关闭弹窗
                        this.searchDialogData.dialogTableVisible = false
                    } else {
                        console.error('对方单据请求失败')
                    }

                }).catch(error => Promise.reject(error))
            } catch (error) {
                console.error(error, 'PORBill getPORBillList error')
            }
            console.log('search')
        },
        // 添加tab标签
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('BPORPBill', name, tag, tabType, content)
        },
        // 我方本次核销金额
        getSelfVerifyAmountThisTime (self) {
            this.selfSum = 0
            self.forEach(item => {
                this.selfSum += parseFloat(item.verifyAmountThisTime || 0)
            })
        },
        // 对方本次核销金额
        getOppositeVerifyAmountThisTime (opposite) {
            this.oppositeSum = 0
            opposite.forEach(item => {
                this.oppositeSum += parseFloat(item.verifyAmountThisTime || 0)
            })
        },
        // 模拟核销按钮状态
        setSimulationWriteOff () {
            console.log(this.selfSum, this.oppositeSum, 'compare')
            if (this.selfSum === this.oppositeSum && this.selfSum > 0) {
                this.isCanSimulationWriteOff = true
                return true
            } else {
                this.isCanSimulationWriteOff = false
                return false
            }

        }
    },
    computed: {
        selfStartTime: {
            get() {
                if (this.selfConditionFormData.startTime) {
                    return new Date(parseInt(this.selfConditionFormData.startTime))
                } else {
                    return new Date()
                }
            },
            set(val) {
                if (val && this.selfConditionFormData) {
                    this.selfConditionFormData.startTime = val.getTime().toString()
                }
            }
        },
        selfEndTime: {
            get: function() {
                console.log(this.selfConditionFormData.endTime, 'endTime endTime endTime endTime')
                if (this.selfConditionFormData.endTime) {
                    return new Date(parseInt(this.selfConditionFormData.endTime))
                } else {
                    return new Date()
                }
            },
            set: function(val) {
                console.log(val, this.selfConditionFormData)
                if (val && this.selfConditionFormData) {
                    this.selfConditionFormData.endTime = new Date(val).getTime().toString()
                }
            }
        },
        oppositeStartTime: {
            get() {
                if (this.oppsideConditionFormData.startTime) {
                    return new Date(parseInt(this.oppsideConditionFormData.startTime))
                } else {
                    return new Date()
                }
            },
            set(val) {
                if (val && this.oppsideConditionFormData) {
                    this.oppsideConditionFormData.startTime = val.getTime().toString()
                }
            }
        },
        oppositeEndTime: {
            get() {
                if (this.oppsideConditionFormData.endTime) {
                    return new Date(parseInt(this.oppsideConditionFormData.endTime))
                } else {
                    return new Date()
                }
            },
            set(val) {
                if (val && this.oppsideConditionFormData) {
                    this.oppsideConditionFormData.endTime = val.getTime().toString()
                }
            }
        },
    },
    watch: {
        tabState: function() {
            if (this.tabState.name === this.tabAttr.tag) {
                this.searchBillList()
                console.log(Object.assign({}, this.tabState), this.tabAttr, `llllwatch watch-${new Date().getTime()}`)
            }
        },
        selfTableData: {
            handler: function (val, oldVal) {
                if (!val) return
                console.log(val, oldVal, 'selfTableData.verifyAmountThisTime')
                this.getSelfVerifyAmountThisTime(val)
                this.setSimulationWriteOff()
            },
            deep: true
        },
        oppositeTableData: {
            handler: function (val, oldVal) {
                console.log(val, oldVal, 'oppositeTableData.verifyAmountThisTime')
                this.getOppositeVerifyAmountThisTime(val)
                this.setSimulationWriteOff()
            },
            deep: true
        }
    },
    components: {
        searchDialog
    }
}
</script>

<style>
.tool-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    height: 32px;
    background: #eee;
    border-top: 1px solid #cbcbcb;
    border-left: 1px solid #cbcbcb;
    padding: 0 5px;
    box-sizing: border-box;
    color: #229fd2;
    cursor: pointer;
}


/*transition*/

.detail-enter,
.detail-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
}

.detail-enter-active,
.detail-leave-active {
    transition: all 0.2s;
    transform-origin: center top;
}
</style>
