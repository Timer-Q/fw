<template>
    <div>
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
                width="50"
                label="序号">
            </TableColumn>
            <TableColumn
                prop="dealerId"
                label="经销商ID">
            </TableColumn>
            <TableColumn
                prop="dealerName"
                label="经销商名称">
            </TableColumn>
            <TableColumn
                prop="stationName"
                label="入住站点">
            </TableColumn>
            <TableColumn
                prop="account"
                label="账号">
            </TableColumn>
            <TableColumn
                prop="detailAddress"
                label="地址">
            </TableColumn>
            <TableColumn
                prop="primaryContacts"
                label="联系人">
            </TableColumn>
            <TableColumn
                prop="contactTelphone"
                label="联系人电话">
            </TableColumn>
            <TableColumn
                prop=""
                label="经营品牌">
            </TableColumn>
            <TableColumn
                prop=""
                label="所有品牌">
            </TableColumn>
            <TableColumn
                prop="status"
                label="状态">
                <template solt-scope="scope">
                    <span>{{scope.row.status==1?"启动":"停用"}}</span>
                </template>
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
    </div>
</template>
<script>
    import merchantsService from '@B2B/services/substatAdmin/merchantsService.js'
    export default{
        data(){
            return {
                loading:false,
                tableContent:[],
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                selectRow:''
            }
        },
        methods:{
            async getDealerList(){
                try {
                    const data = await merchantsService.getDealerByMerchantId(this.merchantId)
                    if (data.status == 200&&data.data.result) {
                        const result = data.data.result
                        if(!result)return
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

                this.selectRow = row
            },
            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getMerchantsList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getMerchantsList()
            }
        },
        mounted () {
            const _this = this
            this.getDealerList()
            this.$root.bus.$on('getDealerList',()=>{
                _this.getDealerList()
            })
        },
        props:{
            merchantId: Number
        }
    }
</script>
