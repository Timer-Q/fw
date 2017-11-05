<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" @click="examineBtn">审核</Button>
            <Button class="public-function-btn" @click="getRegisterUserList">刷新</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <div class="content">
            <Table
                max-height="680"
                :data="tableContent"
                :loading="loading"
                border
                :highlight-current-row="true"
                @row-click="handleRowClick"
            >
                <TableColumn
                    type="index"
                    fixed
                    width="50"
                    label="序号">
                </TableColumn>
                <TableColumn
                    prop="stationName"
                    label="站点">
                </TableColumn>
                <TableColumn
                    prop="resgisterSource"
                    label="来源">
                </TableColumn>
                <TableColumn
                    prop="account"
                    label="账号">
                </TableColumn>
                <TableColumn
                    prop="auditType"
                    label="新老商户">
                </TableColumn>
                <TableColumn
                    prop="merchantName"
                    label="注册用户">
                </TableColumn>
                <TableColumn
                    prop="merchantType"
                    label="商户类型">
                </TableColumn>
                <TableColumn
                    prop="manageType"
                    label="经营类型">
                </TableColumn>
                <TableColumn
                    prop="detailAddress"
                    label="门店地址">
                </TableColumn>
                <TableColumn
                    prop="shopFrontPicurl"
                    label="门头照"
                >
                </TableColumn>
                <TableColumn
                    prop="primaryName"
                    label="联系人"
                >
                </TableColumn>
                <TableColumn
                    prop="primaryPhone"
                    label="联系电话"
                >
                </TableColumn>
                <TableColumn
                    prop="businessLicenseNo"
                    label="营业执照号"
                >
                </TableColumn>
                <TableColumn
                    prop="businessLicenseUrl"
                    label="营业执照照片"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.businessLicenseUrl" alt="营业执照">
                    </template>
                </TableColumn>
                <TableColumn
                    prop="idCardName"
                    label="身份证姓名"
                >
                </TableColumn>

            </Table>
            <Pagination
                v-if="page.pageSizes>1"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNum"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </Pagination>

            <!--列表按钮-->
            <tooltip name="costorder">
                <Button size="mini" @click="examineBtn">审核</Button>
            </tooltip>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .text_btn {
        color: #3320ee;
        cursor: pointer;
    }
</style>
<script>
    import registerUserService from '@B2B/services/substatAdmin/registerUserService.js'
    import b2bPublicService from '@B2B/services/substatAdmin/b2bPublicService.js'
    export default{
        data(){
            return {
                loading: true,
                tableContent: [],
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                selectRow:'',
                dict:{}
            }
        },
        methods: {
            // 审核
            examineBtn(){
                if(!this.selectRow.id){
                    this.$customMessage('请选择一条记录','warning')
                    return
                }
                const id = this.selectRow.id
                let addTabObj = {
                    name: '注册用户审核-审核',
                    tag: `b2b_registerUser_examine_${id}`,
                    parentTag: '',
                    id:id
                }
                this.$root.bus.$emit('registerUserExamineTabAdd', addTabObj)
            },

            // 获取tableData
            async getRegisterUserList(){
                this.loading = true
                const message = {
                    pageNum:this.page.pageNum,
                    pageSize:this.page.pageSize
                }

                // 请求分页数据
                try {
                    const data = await registerUserService.getRegisterUserList(message)
                    if (data.status == 200&&data.data.result) {
                        const result = data.data.result
                        // 赋值tableData
                        this.tableContent = []
                        result.list.forEach((item)=>{
                            this.tableContent.push(item)
                        })
                        // 赋值总条数
                        this.page.total = result.total
                        // 总页数
                        this.page.pages = result.pages
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("查询失败","error")
                    }
                    this.loading = false
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },

            // 点击table每行
            handleRowClick(row, event, column) {
                if (column.type == 'selection' || column.type == 'index')return

                // table行按钮集
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')

                this.selectRow = row
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getRegisterUserList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getRegisterUserList()
            }
        },
        mounted () {
            this.getRegisterUserList()
        }
    }
</script>
