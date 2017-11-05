<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="reSelectionBill">重新选单</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleWriteOff">核销</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleSimulationWriteOff">模拟核销</el-button>
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
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" @click.stop="handleShowDetail" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop] }}</a>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
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
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" @click.stop="handleShowDetail" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop] }}</a>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
                </el-pagination>
            </div>
        </section>
        
        <tooltip name="costorder" @tooltipEmit="handleTooltipEmit">
            <el-button size="mini" @click="confirmBilling">确认开票</el-button>
            <!-- <el-button size="mini">删除</el-button>
                                              <el-button size="mini">提交</el-button>
                                              <el-button size="mini">审核</el-button> -->
        </tooltip>
        <search-dialog :dialogTitle="searchDialogData.dialogTitle" :dialogVisible="searchDialogData" :gridData="searchDialogData.gridData">
            <div slot="content">
                <el-form label-width="90px" class="condition-form" :inline="true" :model="conditionFormData">
                    <el-form-item label="应付组织">
                        <el-select v-model="conditionFormData.payableOrganization" placeholder="请选择应付组织">
                            <el-option label="区域一123" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收/付款组织">
                        <el-select v-model="conditionFormData.ropOrganization" placeholder="请选择收/付款组织">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="核销日期">
                        <el-date-picker v-model="conditionFormData.writeOffDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="form-slipped">
                    <div class="condition-form-side">
                        <el-form label-width="90px" class="condition-form" :model="conditionFormData">
                            <el-form-item label="核销对象">
                                <el-select v-model="conditionFormData.writeOffObject" placeholder="请选择核销对象">
                                    <el-option label="区域一123" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="对象名称">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择对象名称">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据大类">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择单据大类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据类型">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择单据类型">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker v-model="conditionFormData.writeOffDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="conditionFormData.writeOffDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="业务员">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择业务员">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属部门">
                                <el-input v-model="conditionFormData.objectName"></el-input>
                            </el-form-item>
                            <el-form-item label="单据号">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择单据号">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品/费项">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择商品/费项">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="condition-form-side">
                        <el-form label-width="90px" class="condition-form" :model="conditionFormData">
                            <el-form-item label="核销对象">
                                <el-select v-model="conditionFormData.writeOffObject" placeholder="请选择核销对象">
                                    <el-option label="区域一123" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="对象名称">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择对象名称">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据大类">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择单据大类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单据类型">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择单据类型">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-date-picker v-model="conditionFormData.writeOffDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="conditionFormData.writeOffDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="业务员">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择业务员">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属部门">
                                <el-input v-model="conditionFormData.objectName"></el-input>
                            </el-form-item>
                            <el-form-item label="单据号">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择单据号">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品/费项">
                                <el-select v-model="conditionFormData.objectName" placeholder="请选择商品/费项">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
``            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="warning" @click="searchPayableBillList">立即查询</el-button>
            </div>
        </search-dialog>
    </section>
</template>

<script>
// components
import searchDialog from '@Billing/components/SearchDialog.vue'
// service
import paymentBillService from '@Billing/services/paymentBillService.js'

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
            tableData: [
                {
                    invoiceType: '王小虎',
                    invoiceNum: '11223344',
                    invoiceDate: '2016-05-03',
                    billingOrganization: '开票组织',
                    shouldAccountingOrganization: '应收核算组织',
                    receivablesOrganization: '收款组织收款组织',
                    billingCustomer: '开票客户开票客户',
                    shouldPayOrganization: '应付核算组织',
                    payOrganization: '付款组织',
                    unTaxAmount: '未税金额',
                    taxAmount: '税额',
                    contentTaxAmount: '含税金额',
                    amountReceivable: '应收金额',
                    amountCollected: '收款金额',
                    invoiceStatus: '单据状态',
                    sourceDocumentType: '来源单据',
                    sourceOddNumber: '来源单号',
                    sourceDate: '来源日期',
                    sourceOrganization: '来源组织'
                }
            ],
            cols: [
                {
                    prop: 'invoiceType',
                    label: '入库单类型'
                },
                {
                    prop: 'payableBillOrder',
                    label: '入库单号',
                    scope: true
                },
                {
                    prop: 'billTime',
                    label: '单据日期',
                    scope: true
                },
                {
                    prop: 'payGroup',
                    label: '应付组织'
                },
                {
                    prop: 'shouldAccountingOrganization',
                    label: '应付供应商'
                },
                {
                    prop: 'receivablesOrganization',
                    label: '币种'
                },
                {
                    prop: 'billingCustomer',
                    label: '未税金额'
                },
                {
                    prop: 'shouldPayOrganization',
                    label: '税额'
                },
                {
                    prop: 'payOrganization',
                    label: '含税金额'
                },
                {
                    prop: 'unTaxAmount',
                    label: '累计应付含税金额'
                },
                {
                    prop: 'taxAmount',
                    label: '付款协议'
                },
                {
                    prop: 'orderSupplier',
                    label: '库存组织'
                },
                {
                    prop: 'billStatus',
                    label: '发货供应商'
                },
                {
                    prop: 'sourceBillType',
                    label: '业务组织'
                },
                {
                    prop: 'sourceBillNum',
                    label: '供应商'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '发票组织'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '发票供应商'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '付款组织'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '收款供应商'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '单据状态'
                }
            ],
            currentPage: 1,
            pageSize: 10,
            pageCount: 10,
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
                payableOrganization: '',
                ropOrganization: '',
                writeOffDate: new Date()
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            }
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
        handleSimulationWriteOff() {
            console.log('模拟核销 action')
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
        // 切换每一页显示内容条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.searchPaymentBillList()
        },
        // 页码切换事件
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
            this.searchPaymentBillList()
        },
        // 每一行点击事件
        async handleRowClick(row, event, column) {
            console.log(row, event, column)
            // FIXME:[应付单编号], 现在没有这个字段，后续更改
            if (column.property === 'payableBillOrder') {
                // 根据点击的[行]，查询对应数据
                let response = await paymentBillService.getDataById({ id: row.id })
                if (response.data.status.statusCode === 0) {
                    console.log(response.data)
                    // this.currentPayableBillDetail = response.
                    this.isShowDetail = true
                }
                return
            }
            if (column.type !== 'selection') {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
            }
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
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { payableBillIds: this.tableSelectionData.ids })
            this.addTab('应付单-入库通知单立账', 'instock-notice-billing', 'scan', 'payable-bill-detail')
        },
        // 弹窗查询应付单
        async searchPayableBillList(searchCondition) {
            console.log('searchPayableBillList')
            let searchData = {
                rootOrgId: 200,
                pageNum: this.pageSize * (this.currentPage - 1),
                pageSize: this.pageSize,
                invoiceCategory: 1
                // conditions: [
                //   {
                //     field: 'valuation_unit',
                //     operator: 'EQUALS',
                //     value: 'A'
                //   },
                //   {
                //     field: 'valuation_quantity',
                //     operator: 'LT',
                //     value: 778
                //   }
                // ]
            } // eslint-disable-line no-unused-vars
            if (searchCondition) {
                searchData = Object.assign({}, searchData, searchCondition)
            }
            try {
                let response = await paymentBillService.getPaymentBillList(searchData)
                // 请求成功，处理数据
                if (response.data.status.statusCode === 0) {
                    this.pageCount = response.data.result.total
                    this.tableData = response.data.result.list
                    // 关闭弹窗
                    this.searchDialogData.dialogTableVisible = false
                }
                // this.currentPayableBillDetail = response.data.result.list[0].
            } catch (error) {
                console.error(error, 'PORBill getPORBillList error')
            }
            console.log('search')
        },
        // 添加tab标签
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('PORBill', name, tag, tabType, content)
        }
    },
    watch: {
        tabState: function() {
            if (this.tabState.name === this.tabAttr.tag) {
                this.searchPayableBillList()
                console.log(Object.assign({}, this.tabState), this.tabAttr, `llllwatch watch-${new Date().getTime()}`)
            }
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
    transition: all .2s;
    transform-origin: center top;
}
</style>




