<template>
    <section class="container">
        <div class="billing-btn-group">
            <el-button size="small" :plain="true" type="primary" @click="handleAdd">新增</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleModify()">修改</el-button>
            <el-button size="small" :plain="true" type="primary" @click="handleDelete()">删除</el-button>
        </div>
        <section class="billing-wrapper">
            <el-table ref="multipleTable" :data="listData" border tooltip-effect="light" style="width: 100%" @row-click="handleRowClick" highlight-current-row>
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
        <el-dialog :title="billTypeDialogTitle" :visible.sync="dialogVisible.billTypeDialogVisible" size="tiny" class="billing-bill-type-dialog">
            <el-form :inline="true" :model="formData" :rules="formRules" ref="payableBillTypeForm">
                <el-form-item label="应付单类型编码" prop="code">
                    <el-input v-model="formData.code" disabled placeholder="请输入应付单类型编码"></el-input>
                </el-form-item>
                <el-form-item label="应付单类型名称" prop="payableName">
                    <el-input v-model="formData.payableName" placeholder="请输入应付单类型名称" :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="应付性质" prop="payableType">
                    <el-select v-model="formData.payableType" placeholder="请选择">
                        <el-option
                            v-for="item in payableTypeOoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" autosize v-model="formData.comments" placeholder="请输入备注" :maxlength="20"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible.billTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddBillTypeDataAndNew" v-if="this.actionType === '新增'">保存并新增</el-button>
                <el-button type="primary" @click="handleAddBillTypeData">保存</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
// service
import payableBillTypeService from '@Billing/services/payableBillTypeService'
export default {
    data () {
        return {
            formData: {},
            formTpl: {
                payableName: '',
                payableType: 'PAYABLEBILLING',
                comments: '',
                createUser: '',
                createDate: '',
                updateUser: '',
                updateDate: ''
            },
            // TODO: form规则校验
            formRules: {
                payableName: [{
                    required: true, message: '请输入应付单类型名称', trigger: 'blur'
                }]
            },
            isFirstRender: false,
            listData: [
                {
                    code: '',
                    payableName: '',
                    payableType: '',
                    comments: '',
                    createUser: '',
                    createDate: '',
                    updateUser: '',
                    updateDate: ''
                }
            ],
            cols: [
                {
                    prop: 'code',
                    label: '应付单类型编码'
                },
                {
                    prop: 'payableName',
                    label: '应付单类型名称'
                },
                {
                    prop: 'payableType', // ['PAYABLEBILLING', 'PAYABLEESTIMATE', 'OTHERSPAYABLE']
                    label: '应付性质'
                },
                {
                    prop: 'comments',
                    label: '备注'
                },
                {
                    prop: 'createUser',
                    label: '创建人'
                },
                {
                    prop: 'createDate',
                    label: '创建时间'
                },
                {
                    prop: 'updateUser',
                    label: '最后修改人'
                },
                {
                    prop: 'updateDate',
                    label: '最后修时间'
                }
            ],
            dialogVisible: {
                billTypeDialogVisible: false
            },
            billTypeDialogTitle: '新增应付单类型',
            selectedData: {}, // 每行选中的数据
            payableTypeOoptions: [ // 应付性质 options
                {
                    label: '应付账款',
                    value: 'PAYABLEBILLING'
                },
                {
                    label: '应付账款-暂估',
                    value: 'PAYABLEESTIMATE'
                },
                {
                    label: '其他应付款',
                    value: 'OTHERSPAYABLE'
                }
            ],
            paymentBillOperationRowId: {}, // 点击每行，选中的数据的id
            pageCount: 30,
            pageSize: 10,
            currentPage: 1,
            // 操作类型（新增/修改）
            actionType: '新增'
        }
    },
    created () {
        this.searchList()
        // this.getInvoiceListCount()
    },
    methods: {
        // 点击table每一行
        handleRowClick (row, event, column) {
            // 获取到当前行的数据并将 id 格式化成后台需要的格式
            this.paymentBillOperationRowId = { payInfoDetailIdList: [ row.id ] }
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
        handleModify () {
            console.log(this.selectedData)
            if (!this.selectedData.id) {
                this.$message('请选择一条数据')
                return
            }
            this.dialogVisible.billTypeDialogVisible = true
            this.formData = Object.assign({}, this.selectedData)
            this.actionType = '修改'
            this.billTypeDialogTitle = '修改应付单类型'
        },
        // 新增操作
        handleAdd () {
            this.formData = Object.assign({}, this.formTpl)
            this.getBillCode()
            this.dialogVisible.billTypeDialogVisible = true
            // 重置表单数据
            this.actionType = "新增"
            this.billTypeDialogTitle = '新增应付单类型'
        },
        async handleAddBillTypeData (cb) {
            let response
            try {
                this.$refs['payableBillTypeForm'].validate(async (valid) => {
                    if(valid) {
                        if (this.actionType === '新增') {
                            response = await payableBillTypeService.createNewBillType(this.formData)
                        }
                        if (this.actionType === '修改') {
                            response = await payableBillTypeService.modifyBillType(this.formData)
                        }
                        if (typeof cb === 'function') {
                            cb()
                        } else {
                            this.dialogVisible.billTypeDialogVisible = false
                        }
                        this.handleResult(response, this.actionType, '')
                    } else {
                        console.log('error submit')
                        return
                    }
                })
            } catch (error) {
                console.error(error, `${this.actionType} paymentBillType error`)
            }
        },
        handleAddBillTypeDataAndNew () {
            this.handleAddBillTypeData(this.handleAdd)
        },
        // 删除按钮操作
        async handleDelete (selection) {
            this.secondComfirmPop('此操作将永久删除数据，是否继续？', '删除')
                .then(async () => {
                    try {
                        let response = await payableBillTypeService.deleteBillType({ id: this.selectedData.id })
                        // 处理返回结果
                        this.handleResult(response, '删除', '')
                        // 删除后重新拉去数据
                        this.searchList()
                    } catch (error) {
                        console.error(error, 'delete error')
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        // 每页数量改变后，触发事件， elementUI自带
        handleSizeChange (val) {
            this.pageSize = val
            this.searchList()
        },
        // 切换页码触发事件， elementUI自带
        handleCurrentChange (val) {
            this.currentPage = val
            this.searchList()
        },
        // 查询列表
        async searchList () {
           let searchData = {
                rootOrgId: 200,
                orgId: 2,
                pageNum: this.pageSize * (this.currentPage - 1),
                pageSize: this.pageSize
            } // eslint-disable-line no-unused-vars
            try {
                let res = await payableBillTypeService.getAllBill(searchData)
                if (res.data.status.statusCode === 0) {
                    // 获取 收款单列表
                    this.listData = res.data.result.list
                    // 获取总条数
                    this.pageCount = res.data.result.total
                    // 每次操作成功 会重新拉取数据 此时将选中的数据清空
                    this.selectedData = []
                } else {
                    this.$msgbox({
                        title: '结果',
                        message: '数据获取失败',
                        type: 'error'
                    })
                }
            } catch (error) {
                console.error(error, 'getTypeList error')
            }
        },
        async getBillCode () {
            try {
                let response = await payableBillTypeService.getCode('code')
                this.$set(this.formData, 'code', response.data.result)
            } catch (error) {
                console.error(error, 'get code error')
            }
        },
        // 结果处理
        handleResult (res, action, beforeStatus, cb) {
            // 失败
            if (res.data.status.statusCode !== 0) {
                this.$message(`${res.data.status.statusReason}`, `${action}结果`, {
                    confirmButtonText: '确定'
                })
                console.log(this.resultInfo, 'handleResult resultInfo')
            } else {
                this.$message(`${action}成功`, `${action}结果`, {
                    confirmButtonText: '确定'
                })
                this.searchList()
            }
        },
        // 二次确认弹框
        secondComfirmPop (msg, action) {
            return this.$confirm(`${msg}`, `${action}提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        // 添加tab标签
        addTab (name, tag, tabType, content) {
            this.$root.bus.$emit('paymentBillType', name, tag, tabType, content)
        }
    }
}
</script>
