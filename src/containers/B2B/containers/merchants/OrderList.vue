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
                prop="stationName"
                label="站点">
            </TableColumn>
            <TableColumn
                prop="orderNo"
                label="订单号">
            </TableColumn>
            <TableColumn
                prop="dealerName"
                label="经销商名称">
            </TableColumn>
            <TableColumn
                prop="shopName"
                label="进货门店名称">
            </TableColumn>
            <TableColumn
                prop="payOrNotDesc"
                label="订单状态">
            </TableColumn>
            <TableColumn
                prop="paymentTypeDesc"
                label="支付方式">
            </TableColumn>
            <TableColumn
                prop="state"
                label="支付状态">
            </TableColumn>
            <TableColumn
                prop="paymentAmount"
                label="订单金额">
            </TableColumn>
            <TableColumn
                prop="refundAmount"
                label="优惠金额">
            </TableColumn>
            <TableColumn
                prop="payableAmount"
                label="实收金额">
            </TableColumn>
            <TableColumn
                prop="orderTime"
                label="下单时间">
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
    import orderService from '@B2B/services/substatAdmin/orderService.js'
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
            async getOrderList(){
                try {
                    const data = await orderService.getOrderList({userId:this.selectRow.userId})
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
            this.getOrderList()
            this.$root.bus.$on('getOrderList',()=>{
                _this.getOrderList()
            })
        }
    }
</script>
