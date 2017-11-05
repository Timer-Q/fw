<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="handleAdd">新增</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleModify()">修改</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleDelete()">删除</el-button>
        </div>
        <section class="billing-wrapper">
            <!-- <h3 class="billing-header">单据</h3> -->
            <el-table ref="multipleTable" :data="paymentBillTypeListData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" highlight-current-row>
                <el-table-column header-align="center" align="left" type="index" label="序号" width="50"></el-table-column>
                <el-table-column header-align="center" v-for="(item, index) in cols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row[item.prop] }}
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-pagination-content">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount">
                </el-pagination>
            </div>
        </section>
        <tooltip name="paymentBillTooltip">
            <el-button size="mini" @click="handleModify()">修改</el-button>
            <el-button size="mini" @click="handleDelete()">删除</el-button>
        </tooltip>
        <el-dialog :title="paymentBillTypeDialogTitle" :visible.sync="dialogVisible.paymentBillTypeDialogVisible" size="tiny" class="payment-bill-type-dialog">
            <el-form :inline="true" :model="formData" :rules="formRules" ref="paymentBillTypeForm">
                <el-form-item label="付款单类型编码" prop="payTypeCode">
                    <el-input v-model="formData.payTypeCode" disabled placeholder="请输入付款单类型编码"></el-input>
                </el-form-item>
                <el-form-item label="付款单类型名称" prop="payTypeName">
                    <el-input v-model="formData.payTypeName" placeholder="请输入付款单类型名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" autosize v-model="formData.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible.paymentBillTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlePaymentBillTypeData">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
// service
import paymentBillTypeService from '@Billing/services/paymentBillTypeService'
export default {
    data() {
        return {
            isFirstRender: false,
            paymentBillTypeListData: [
                {
                    payTypeCode: '',
                    payTypeName: '',
                    createUser: '',
                    createTime: '',
                    updateUser: '',
                    updateTime: '',
                    remark: ''
                }
            ],
            cols: [
                {
                    prop: 'payTypeCode',
                    label: '付款单类型编码'
                },
                {
                    prop: 'payTypeName',
                    label: '付款单类型名称'
                },
                {
                    prop: 'createUser',
                    label: '创建人'
                },
                {
                    prop: 'createTime',
                    label: '创建时间'
                },
                {
                    prop: 'updateUser',
                    label: '最后修改人'
                },
                {
                    prop: 'updateTime',
                    label: '最后修改时间'
                },
                {
                    prop: 'remark',
                    label: '备注'
                }
            ],
            dialogVisible: {
                paymentBillTypeDialogVisible: false
            },
            selectedData: {}, // 每行选中的数据
            paymentBillOperationRowId: {}, // 点击每行，选中的数据的id
            pageCount: 30,
            pageSize: 10,
            currentPage: 1,
            paymentBillTypeDialogTitle: `新增付款单类型`,
            formDataTpl: {
                id: `${new Date().getTime()}`,
                orgId: 1,
                rootOrgId: 1,
                createUser: 'add-required',
                createTime: `${new Date().getTime()}`,
                updateUser: `updateUser-${new Date().getMinutes()}`,
                updateTime: `${new Date().getTime()}`,
                organization: 'modify-required',
                payTypeCode: `SKD0007`,
                payTypeName: `付款单类型名称-${new Date().getMinutes()}`,
                status: 1,
                remark: `remarkkk-${new Date().getMinutes()}`
            },
            formData: {},
            // TODO: form规则校验
            formRules: {},
            // 操作类型（新增/修改）
            actionType: '新增'
        }
    },
    activated() {
        this.searchPaymentBillTypeList()
        // this.getInvoiceListCount()
    },
    methods: {
        // 点击table每一行
        handleRowClick(row, event, column) {
            // 获取到当前行的数据并将 id 格式化成后台需要的格式
            this.paymentBillOperationRowId = { payInfoDetailIdList: [row.id] }
            this.selectedData = row
            console.log(row, event, column)
            // 当点击目标为 checkbox 的时候 不弹出tooltip
            if (column.type !== 'selection') {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'paymentBillTooltip')
            }
        },
        // 修改操作
        handleModify() {
            this.dialogVisible.paymentBillTypeDialogVisible = true
            this.formData = this.selectedData
            this.actionType = '修改'
            this.paymentBillTypeDialogTitle = '修改付款单类型'
        },
        // 新增操作
        handleAdd() {
            this.dialogVisible.paymentBillTypeDialogVisible = true
            this.formData = this.formDataTpl
            this.actionType = "新增"
            this.paymentBillTypeDialogTitle = '新增付款单类型'
        },
        async handlePaymentBillTypeData() {
            let response
            try {
                if (this.actionType === '新增') {
                    response = await paymentBillTypeService.addPayType(this.formData)
                }
                if (this.actionType === '修改') {
                    response = await paymentBillTypeService.modifyPayType(this.formData)
                }
                this.handleResult(response, this.actionType, '')
                this.dialogVisible.paymentBillTypeDialogVisible = false
            } catch (error) {
                console.error(error, `${this.actionType} paymentBillType error`)
            }
        },
        // 删除按钮操作
        async handleDelete(selection) {
            console.log(selection)
            try {
                this.secondComfirmPop('此操作将永久删除数据，是否继续？', '删除')
                    .then(async () => {
                        let response = await paymentBillTypeService.deletePayType({ id: this.selectedData.id })
                        // 处理返回结果
                        this.handleResult(response, '删除', '')
                        // 删除后重新拉去数据
                        this.searchPaymentBillTypeList()
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            } catch (error) {
                console.error(error, 'paymentBillList delete by id error')
            }
        },
        // 每页数量改变后，触发事件， elementUI自带
        handleSizeChange(val) {
            this.pageSize = val
            this.searchPaymentBillTypeList()
        },
        // 切换页码触发事件， elementUI自带
        handleCurrentChange(val) {
            this.currentPage = val
            this.searchPaymentBillTypeList()
        },
        // 查询发票列表
        async searchPaymentBillTypeList() {
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
            try {
                let res = await paymentBillTypeService.getPaymentBillTypeList(searchData)
                if (res.data.status.statusCode === 0) {
                    // 获取 收款单列表
                    this.paymentBillTypeListData = res.data.result.list
                    // 获取总条数
                    this.pageCount = res.data.result.total
                    // 每次操作成功 会重新拉取数据 此时将选中的数据清空
                    this.selectedData = []
                    // 隐藏查询框
                    if (this.dialogVisible.paymentBillTypeDialogVisible) {
                        this.dialogVisible.paymentBillTypeDialogVisible = false
                    }
                } else {
                    this.$msgbox({
                        title: '结果',
                        message: '数据获取失败',
                        type: 'error'
                    })
                }
            } catch (error) {
                console.error(error, 'getPaymentBillList error')
            }
        },
        // 结果处理
        handleResult(res, action, beforeStatus) {
            // 失败
            if (res.data.status.statusCode !== 0) {
                this.$alert(`${res.data.status.statusReason}`, `${action}结果`, {
                    confirmButtonText: '确定'
                })
                console.log(this.resultInfo, 'handleResult resultInfo')
            } else {
                this.$alert(`${action}成功`, `${action}结果`, {
                    confirmButtonText: '确定'
                })
            }
        },
        // 二次确认弹框
        secondComfirmPop(msg, action) {
            return this.$confirm(`${msg}`, `${action}提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        // 添加tab标签
        addTab(name, tag, tabType, content) {
            this.$root.bus.$emit('paymentBillType', name, tag, tabType, content)
        }
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

.payment-bill-type-dialog {
    .el-form--inline {
        padding: 10px 5px 0;
    }
    .el-form-item {
        margin-bottom: 10px;
    }
    .el-form-item__label {
        min-width: 100px;
        font-size: 12px;
    }
    .el-input__inner,
    .el-textarea__inner {
        font-size: 12px;
        border-radius: 0;
        height: 30px;
    }
    .el-textarea__inner {
        width: 450px;
        height: 70px;
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
