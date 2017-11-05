<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-dropdown @command="handleCommand" trigger="click" ref="newDropDown">
                <el-button size="small" :plain="true" type="primary">
                    新增
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="billing-dropdown-menu" slot="dropdown">
                    <el-dropdown-item command='saleOrder'>销售订单</el-dropdown-item>
                    <el-dropdown-item command='saleStorageOrder'>销售出库单</el-dropdown-item>
                    <el-dropdown-item command=''>费用对账单</el-dropdown-item>
                    <el-dropdown-item command='invoicing'>直接开票</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" :plain="true" type="primary" @click="handleSearchInvoice">查询发票</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleDelete(selectionDataId)">删除</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleSubmit(selectionDataId)">提交</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleRecall(selectionDataId)">收回</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleApprove(selectionDataId)">审批</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleReject(selectionDataId)">驳回</el-button>
            <el-button size="small" :plain="true" type="primary" v-show="!isFirstRender" :disabled="noSelectedData" @click="handleScan(selectionDataId)">查看</el-button>
        </div>
        <section class="billing-wrapper">
            <h3 class="billing-header">单据</h3>
            <el-table ref="multipleTable" :data="invoiceListData" border tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange" @row-click="handleRowClick" highlight-current-row>
                <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column header-align="center" align="center" fixed type="selection" width="40"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a href="javascript:;" v-if="item.prop === 'invoiceNum'">{{ scope.row[item.prop]}}</a>
                        <span v-else-if="item.prop === 'invoiceStatus'">{{ scope.row[item.prop] | statusFormat }}</span>
                        <span v-else-if="item.prop === 'invoiceType'">{{ scope.row[item.prop] | invoiceTypeFormat }}</span>
                        <span v-else>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
                </el-pagination>
            </div>
        </section>
        <search-dialog @moreSeachDialog="dialogVisible.dialogMoreSearchVisible = true" :dialogTitle="dialogTitle" :dialogVisible="dialogVisible" :gridData="gridData" :subNavPath="subNavPath">
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="warning" @click="getInitialData">立即查询</el-button>
            </div>
        </search-dialog>
        <more-search :dialogVisible="dialogVisible" :gridData="gridData"></more-search>
        <tooltip name="invoiceListTooltip">
            <el-button :disabled="!isSaved" size="mini" @click="handleModify(invoiceOperationRowId)">修改</el-button>
            <el-button size="mini" @click="handleDelete(invoiceOperationRowId)">删除</el-button>
            <el-button size="mini" @click="handleSubmit(invoiceOperationRowId)">提交</el-button>
            <el-button size="mini" @click="handleApprove(invoiceOperationRowId)">审批</el-button>
        </tooltip>
        <el-dialog :title="resultInfo.title" :visible.sync="dialogVisible.dialogResultVisible" size="tiny" class="result-dialog">
            <p>{{resultInfo.msg}}</p>
            <a v-if="resultInfo.isShowDetail" href="javascript:;">(查看发票)</a>
            <ul v-if="resultInfo.isShowDetail">
                <li v-for="(item, index) in resultInfo.detail" :key="index">{{item}}</li>
            </ul>
            <p v-if="resultInfo.isShowDetail">其他发票{{resultInfo.type}}成功</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible.dialogResultVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible.dialogResultVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
import searchDialog from './SearchDialog'
import moreSearch from './MoreSearchDialog'
import billingInvoiceService from '@Billing/services/invoiceService'
export default {
    data() {
        return {
            isFirstRender: false,
            invoiceListData: [
                {
                    // invoiceType: '王小虎',
                    // invoiceNum: '11223344',
                    // invoiceDate: '2016-05-03',
                    // billingOrganization: '开票组织',
                    // shouldAccountingOrganization: '应收核算组织',
                    // receivablesOrganization: '收款组织收款组织',
                    // billingCustomer: '开票客户开票客户',
                    // shouldPayOrganization: '应付核算组织',
                    // payOrganization: '付款组织',
                    // unTaxAmount: '未税金额',
                    // taxAmount: '税额',
                    // contentTaxAmount: '含税金额',
                    // amountReceivable: '应收金额',
                    // amountCollected: '收款金额',
                    // invoiceStatus: '单据状态',
                    // sourceDocumentType: '来源单据',
                    // sourceOddNumber: '来源单号',
                    // sourceDate: '来源日期',
                    // sourceOrganization: '来源组织'
                    createUser: 12,
                    invoiceCategory: 1,
                    invoiceMode: 2,
                    invoiceType: 3,
                    invoiceNum: '123',
                    invoiceId: 999,
                    invoiceDate: 112233445566,
                    billingOrganization: '开票组织',
                    billingCustomer: '开票客户',
                    invoiceHeader: '发票抬头',
                    currencyCode: '币种',
                    taxNo: '税号测试更改',
                    openingBank: '盛京银行',
                    accountNumber: '112233',
                    goldentaxNum: '金税票号xxxxx',
                    customerAddress: '北京昌平区回龙观腾讯众创空间',
                    contactWay: '联系电话',
                    sourceDocumentType: '11',
                    invoiceStatus: 1,
                    remark: '备注呀，也不知道写点什么',
                    updateUser: 21,
                    invoiceInfoDetailList: [
                        {
                            valuationQuantity: 0,
                            valuationUnit: 'string'
                        },
                        {
                            valuationQuantity: 1,
                            valuationUnit: 'string2'
                        }
                    ],
                    isAlreadyGenerateEinvoice: true,
                    isAlreadyGoldentaxRedNum: true,
                    isAlreadyOpenControltax: true,
                    isGoldentaxVoid: true,
                    isInvoiceVoid: true,
                    isRedRush: false
                },
                {
                    createUser: 121,
                    invoiceCategory: 11,
                    invoiceMode: 2,
                    invoiceType: 2,
                    invoiceNum: '1123',
                    invoiceId: 777,
                    invoiceDate: 1122334455661,
                    billingOrganization: '1开票组织',
                    billingCustomer: '1开票客户',
                    invoiceHeader: '1发票抬头',
                    currencyCode: '1币种',
                    taxNo: '1税号测试更改',
                    openingBank: '1盛京银行',
                    accountNumber: '1112233',
                    goldentaxNum: '1金税票号xxxxx',
                    customerAddress: '1北京昌平区回龙观腾讯众创空间',
                    contactWay: '1联系电话',
                    sourceDocumentType: '111',
                    invoiceStatus: 7,
                    remark: '1备注呀，也不知道写点什么',
                    updateUser: 211,
                    invoiceInfoDetailList: [
                        {
                            valuationQuantity: 11,
                            valuationUnit: '1string'
                        },
                        {
                            valuationQuantity: 11,
                            valuationUnit: '1string2'
                        }
                    ],
                    isAlreadyGenerateEinvoice: true,
                    isAlreadyGoldentaxRedNum: true,
                    isAlreadyOpenControltax: true,
                    isGoldentaxVoid: true,
                    isInvoiceVoid: true,
                    isRedRush: true
                }
            ],
            cols: [
                {
                    prop: 'invoiceType',
                    label: '发票类型*'
                },
                {
                    prop: 'invoiceNum',
                    label: '发票号',
                    scope: true
                },
                {
                    prop: 'invoiceDate',
                    label: '发票日期',
                    scope: true
                },
                {
                    prop: 'billingOrganization',
                    label: '开票组织'
                },
                {
                    // prop: 'shouldAccountingOrganization',
                    prop: 'id',
                    label: '应收核算组织'
                },
                {
                    // prop: 'receivablesOrganization',
                    prop: 'invoiceId',
                    label: '收款组织'
                },
                {
                    prop: 'billingCustomer',
                    label: '开票客户'
                },
                {
                    prop: 'shouldPayOrganization',
                    label: '应付核算组织'
                },
                {
                    prop: 'payOrganization',
                    label: '付款组织'
                },
                {
                    prop: 'unTaxAmount',
                    label: '未税金额'
                },
                {
                    prop: 'taxAmount',
                    label: '税额'
                },
                {
                    prop: 'contentTaxAmount',
                    label: '含税金额'
                },
                {
                    prop: 'amountReceivable',
                    label: '应收金额'
                },
                {
                    prop: 'amountCollected',
                    label: '收款金额'
                },
                {
                    prop: 'invoiceStatus',
                    label: '单据状态'
                },
                {
                    prop: 'sourceDocumentType',
                    label: '来源单据'
                },
                {
                    prop: 'sourceOddNumber',
                    label: '来源单号'
                },
                {
                    prop: 'sourceDate',
                    label: '来源日期'
                },
                {
                    prop: 'sourceOrganization',
                    label: '来源组织'
                }
            ],
            dialogVisible: {
                dialogTableVisible: false,
                dialogMoreSearchVisible: false,
                dialogResultVisible: false
            },
            gridData: [
                {
                    conditionName: '单据日期',
                    compareSymbol: '',
                    conditionValue: ''
                },
                {
                    conditionName: '开票组织',
                    compareSymbol: '',
                    conditionValue: ''
                }
            ],
            dialogTitle: '',
            tableSelect: '',
            subNavPath: 'costOrder',
            invoiceOperationData: {}, // 每行选中的数据
            invoiceOperationRowId: {}, // 点击每行，选中的数据的id
            selectionData: [], // 点击多选框，选中的数据
            selectionDataId: {}, // 点击多选框，选中的数据的id
            pageCount: 30,
            pageSize: 10,
            currentPage: 1,
            isSaved: true, // rowclick后判断该条是否为保存状态
            noSelectedData: true,
            resultInfo: { // 失败结果信息
                type: '',
                title: '',
                msg: '',
                isShowDetail: false,
                detail: []
            }
        }
    },
    created() {
        this.$nextTick(() => {
        })
    },
    activated() {
        this.searchInvoiceList()
        this.getInvoiceListCount()
    },
    methods: {
        handleCommand(command) {
            if (command === 'saleOrder') {
                this.dialogTitle = '销售订单'
                this.subNavPath = 'costOrder'
            }
            if (command === 'saleStorageOrder') {
                this.dialogTitle = '销售出库单'
                this.subNavPath = 'costOrder2'
            }
            if (command === 'invoicing') {
                this.$router.push({
                    name: 'invoicing',
                    params: {
                        subTitle: '开票',
                        mode: 'new'
                    }
                })
                return
            }
            this.dialogVisible.dialogTableVisible = true
        },
        // 修改操作
        handleModify() {
            // 将需要修改的数据放到store中，在修改界面取
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { invoiceIds: [this.invoiceOperationData.invoiceId] })
            this.storeAddHandleData([this.invoiceOperationData.invoiceId])
            this.addTab(name, code, tabType, content)
            // 跳转到修改界面  mode判断是直接开票还是修改
            // this.$router.push({
            //     name: 'invoicing',
            //     params: {
            //         subTitle: `${this.invoiceOperationData.invoiceId}-修改`,
            //         mode: 'modify'
            //     }
            // })
        },
        // 点击table每一行
        handleRowClick(row, event, column) {
            // 获取到当前行的数据并将 invoiceId 格式化成后台需要的格式
            this.invoiceOperationRowId = { invoiceIdList: [row.invoiceId] }
            this.invoiceOperationData = row
            // 如果点击的是发票号 跳转查看界面
            if (column.property === 'invoiceNum') {
                this.$store.dispatch('addSelectedData', { type: 'invoice', id: [this.invoiceOperationData.invoiceId] })
                this.$router.push({
                    name: 'invoicing',
                    params: {
                        subTitle: `${this.invoiceOperationData.invoiceId}-销售查看`,
                        mode: 'scan'
                    }
                })
                return
            }
            // 判断当前行的数据是否为保存状态， 控制保存按钮是否可点击
            if (row.invoiceStatus !== 1) {
                this.isSaved = false
            } else {
                this.isSaved = true
            }
            console.log(row, event, column, this.isSaved)
            // 当点击目标为 checkbox 的时候 不弹出tooltip
            if (column.type !== 'selection') {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'invoiceListTooltip')
            }
        },
        // 切换 checkbox 的时候的事件， elementui 自带
        handleSelectionChange(selection) {
            this.selectionData = selection
            // 如果没有选中的数据 部分操作按钮置灰
            if (this.selectionData.length === 0) {
                this.noSelectedData = true
            } else {
                this.noSelectedData = false
            }
            // 获取到选中数据的 invoiceId，并格式化成接口所需数据格式
            this.selectionDataId.invoiceIdList = selection.map(item => {
                return item.invoiceId
            })
            console.log(selection, this.selectionDataId, 'selection')
        },
        // 查询发票按钮弹框
        handleSearchInvoice() {
            this.dialogVisible.dialogTableVisible = true
            this.dialogTitle = '查询'
            this.subNavPath = 'invoice'
        },
        // 删除按钮操作
        handleDelete(selection) {
            console.log(selection)
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(`/invoiceInfo/deleteInvoice/`, selection)
                    .then(res => {
                        // 处理返回结果
                        this.handleResult(res, '删除', '已保存 已收回 已驳回')
                        // 删除后重新拉去数据
                        this.searchInvoiceList()
                        this.getInvoiceListCount()
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 提交按钮操作
        handleSubmit(selection) {
            this.$http.post(`/invoiceInfo/invoiceCommit/`, selection)
                .then(res => {
                    console.log(res, 'status change response')
                    this.handleResult(res, '提交', '已保存')
                    this.searchInvoiceList()
                })
        },
        // 收回按钮操作
        handleRecall(selection) {
            this.$http.post(`/invoiceInfo/invoiceTakeBack/`, selection)
                .then(res => {
                    this.handleResult(res, '收回', '已提交')
                    this.searchInvoiceList()
                })
        },
        // 审批按钮操作
        handleApprove(selection) {
            this.$http.post(`/invoiceInfo/invoiceApprove/`, selection)
                .then(res => {
                    this.handleResult(res, '审批', '已提交')
                    this.searchInvoiceList()
                })
        },
        // 驳回按钮操作
        handleReject(selection) {
            console.log(selection)
            this.$prompt('请输入驳回原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                this.$http.post(`/invoiceInfo/invoiceReject`, {
                    ...selection,
                    overruleReason: value
                }).then(res => {
                    this.handleResult(res, '驳回', '已提交')
                    this.searchInvoiceList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 多条查看
        handleScan(selection) {
            console.log(selection)
            this.storeAddHandleData(selection.invoiceIdList)
            this.addTab('销售发票-查看', 'invoice-list-scan', 'scan', 'sale-invoicing')
        },
        // 每页数量改变后，触发事件， elementUI自带
        handleSizeChange(val) {
            this.pageSize = val
            this.searchInvoiceList()
        },
        // 切换页码触发事件， elementUI自带
        handleCurrentChange(val) {
            this.currentPage = val
            this.searchInvoiceList()
        },
        // 查询发票列表
        async searchInvoiceList(searchCondition) {
            console.log(this.gridData, '查询条件 现在还没用得上')
            let searchData = {
                org: '开票组织',
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
            console.log(searchData, 'searchData searchData')
            try {
                let response = await billingInvoiceService.getInvoiceList(searchData)
                console.log(response, 'lalala response')
                if (response.data.status.statusCode === 0) {
                    this.invoiceListData = res.data.result
                    // 每次操作成功 会重新拉取数据 此时将选中的数据清空
                    this.invoiceOperationData = []
                    // 拉取成功后，显示操作按钮
                    this.isFirstRender = false
                } else {
                    this.$msgbox({
                        title: '结果',
                        message: '数据获取失败',
                        type: 'error'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        // 查询发票列表总条数
        async getInvoiceListCount() {
            try {
                let res = await billingInvoiceService.getInvoiceListCount({ org: '开票组织' })
                if (res.data.status.statusCode === 0) {
                    this.pageCount = res.data.result
                } else {
                    this.$msgbox({
                        title: '结果',
                        message: '获取数据失败',
                        type: 'error'
                    })
                }
            } catch (error) {
                console.error(error, 'invoiceCount response error')
            }
        },
        // 页面初始化查询/删除操作后查询 同时获取发票列表和总条数
        getInitialData(conditions) {
            this.addTab(`新建tab name 后续会改`, `invoice-list`, 'new', 'sale-invoicing')
            this.searchInvoiceList()
            this.getInvoiceListCount()
        },
        // 结果处理
        handleResult(res, action, beforeStatus) {
            if (res.data.status.statusCode !== 0) {
                this.dialogVisible.dialogResultVisible = true
                this.resultInfo = {
                    type: action,
                    title: `${action}结果`,
                    msg: res.data.result.length > 1 ? `单据号：${res.data.result[0].invoiceId} 等不符合${action}条件` : `非 ${beforeStatus} 状态，无法提交，单据号为 ${res.data.result.map(item => item.invoiceId)}`,
                    isShowDetail: !!(res.data.result.length > 1),
                    detail: res.data.result.map(item => item.invoiceId)
                }
            } else {
                this.$alert(`${action}成功`, `${action}结果`, {
                    confirmButtonText: '确定'
                })
            }
        },
        addTab(name, code, tabType, content) {
            this.$root.bus.$emit('billingAddTab', name, code, tabType, content)
        },
        storeAddHandleData (ids) {
            this.$store.commit('Billing_M_ADD_HANDLE_DATA', { invoiceIds: ids })
        }
    },
    components: {
        searchDialog,
        moreSearch
    }
}
</script>


<style lang="less">
@tableBg: #eee;
@tableFontSize: 12px;
@blueBg: #49b1df;

.billing-btn-group {
    padding: 0 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0 5px 10px #f2f2f2;
    &>.el-dropdown,
    &>.el-button {
        margin-left: 0;
        margin-right: 10px;
    }
    .el-button--small {
        padding: 3px 7px;
    }
}

.billing-header {
    position: relative;
    margin: 0;
    color: #20a0ff;
    font-size: 16px;
    font-weight: 400;
    line-height: 35px;
}

.billing-wrapper {
    padding: 0 10px;
}

.dialog-content {
    display: flex;
    .dialog-left {
        flex: 1;
        border-right: 1px solid #ccc;
        .el-tree {
            border: none;
        }
    }
    .dialog-right {
        flex: 4;
        .dialog-right-content {
            padding: 15px;
        }
        .el-form-item__content {
            width: 100%;
        }
    }
    .dialog-sub-header {
        margin: 0;
        padding: 10px;
        background: #f8f8f8;
        font-size: 12px;
        font-weight: 400;
    }
}

.dialog-search {
    .el-form-item {
        margin-bottom: 10px;
    }
    .el-input__inner {
        border-radius: 0;
        border-color: 1px solid #cacaca;
    }
    .el-button--text {
        color: #929292;
        &:hover {
            color: #4db3ff;
        }
    }
}



/* 重写 elementUI 样式 */

.el-table th {
    height: 32px;
}

.el-table th.is-leaf {
    border-bottom: 1px solid #cbcbcb;
}

.el-table td {
    height: 28px;
    font-size: @tableFontSize;
}

.el-table,
.el-table--border td,
.el-table--border th {
    border-color: #ccc;
}

.el-table th,
.el-table__fixed-header-wrapper thead div,
.el-table__header-wrapper thead div {
    background: @tableBg;
    font-size: @tableFontSize;
    font-weight: 400;
    color: #333;
}

.el-table .cell,
.el-table th>div {
    padding-left: 10px;
    padding-right: 10px;
}

.td-center {
    text-align: center;
}

.td-right {
    text-align: right;
}

.el-dialog__header {
    padding: 10px 15px;
    background: @blueBg;
    .el-dialog__title {
        font-weight: 400;
        font-size: 14px;
        color: #fff;
    }
}

.el-dialog__body {
    padding: 0;
}

.el-dialog__headerbtn:hover .el-dialog__close {
    color: #fff;
}

.no-padding-cell {
    .cell {
        padding: 0;
        width: 100%;
        .el-select {
            width: 100%;
        }
        .el-input {
            width: 100%;
        }
        .el-input__inner {
            height: 27px;
            border-radius: 0;
            border-color: transparent;
            background-color: transparent;
            &:focus {
                border-color: @blueBg;
                box-shadow: 0 0 10px @blueBg;
            }
        }
    }
}

.el-dialog__footer {
    background: #f5f5f5;
    padding-bottom: 10px;
}

.el-pagination-content {
    padding: 10px;
    text-align: right;
}

.dialog-footer {
    background: #eee;
    text-align: right;
    padding: 5px 10px;
}

.el-dropdown-menu {
    min-width: 80px;
    .el-dropdown-menu__item {
        font-size: 12px;
        line-height: 20px;
    }
}

.result-dialog {
    .el-dialog__body {
        padding: 10px;
        ul {
            list-style: none;
            padding-left: 0;
            line-height: 20px;
        }
    }
    .el-dialog__footer {
        .dialog-footer {
            background: transparent;
        }
        .el-button {
            padding: 5px 7px;
            font-size: 12px;
        }
    }
}
</style>
