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
                fixed
                width="50"
                label="序号">
            </TableColumn>
            <TableColumn
                prop=""
                label="门店名称">
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
                prop=""
                label="门店坐标">
            </TableColumn>
            <TableColumn
                prop="primaryName"
                label="主要联系人">
            </TableColumn>
            <TableColumn
                prop="primaryTel"
                label="主要联系人电话">
            </TableColumn>
            <TableColumn
                prop=""
                label="次要联系人">
            </TableColumn>
            <TableColumn
                prop=""
                label="次要联系人电话">
            </TableColumn>
            <TableColumn
                prop=""
                label="业务员">
            </TableColumn>
            <TableColumn
                prop=""
                label="门头照">
            </TableColumn>
            <TableColumn
                prop=""
                label="店内照">
            </TableColumn>
            <TableColumn
                prop=""
                label="门店状态">
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
<style>
    img{
        max-width: 100px;
        height: 50px;
        border: 1px solid #adadad;
        margin: 10px auto;
    }
</style>
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
            async getStoreList(){
                try {
                    const data = await merchantsService.getStoreByMerchantId({merchantId:this.merchantId})
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
            this.getStoreList()
            this.$root.bus.$on('getStoreList',()=>{
                _this.getStoreList()
            })
        },
        props:{
            merchantId: Number
        }
    }
</script>
