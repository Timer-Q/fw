<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" @click="getOrderList">刷新</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <div class="content">
            <div class="search">
                <Form :inline="true" :model="{}" class="demo-form-inline">
                    <FormItem>
                        <Button class="search-scheme">查询方案<i class="iconfont icon-fangan"></i></Button>
                    </FormItem>
                    <FormItem label="选择站点">
                        <Select v-model="searchObj.stationId">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="订单编码">
                        <Input v-model="searchObj.orderNo"></Input>
                    </FormItem>
                    <FormItem label="客户名称">
                        <Input v-model="searchObj.merchantName"></Input>
                    </FormItem>
                    <FormItem label="经销商名称">
                        <Input v-model="searchObj.dealerName"></Input>
                    </FormItem>
                    <FormItem label="订单状态">
                        <Select v-model="searchObj.payOrNot">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button class="search-btn" @click="getOrderList">查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="text">高级查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="text" @click="resetSearch">清空</Button>
                    </FormItem>
                </Form>
            </div>
            <Table max-height="680"
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
                    prop="stationName"
                    label="站点名称">
                </TableColumn>
                <TableColumn
                    prop="orderNo"
                    label="订单编号">
                    <template slot-scope="scope">
                        <Button type="text" @click="orderCodeClick">{{scope.row.orderNo}}</Button>
                    </template>
                </TableColumn>
                <TableColumn
                    prop="dealerName"
                    label="经销商">
                </TableColumn>
                <TableColumn
                    prop="merchantName"
                    label="客户名称">
                </TableColumn>
                <TableColumn
                    prop="shopName"
                    label="门店名称">
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
                    prop="paymentMethodDesc"
                    label="支付渠道"
                >
                </TableColumn>
                <TableColumn
                    prop="paymentAmount"
                    label="订单金额"
                >
                </TableColumn>
                <TableColumn
                    prop="refundAmount"
                    label="优惠金额"
                >
                </TableColumn>
                <TableColumn
                    prop="payableAmount"
                    label="实收金额"
                >
                </TableColumn>
                <TableColumn
                    prop="receiverName"
                    label="收货人"
                >
                </TableColumn>
                <TableColumn
                    prop="receiverPhone"
                    label="收货人联系方式"
                >
                </TableColumn>
                <TableColumn
                    prop="receiverAddress"
                    label="收货地址"
                >
                </TableColumn>
                <TableColumn
                    prop="carrier"
                    label="承运商"
                >
                </TableColumn>
                <TableColumn
                    prop="carrierNo"
                    label="运单号"
                >
                </TableColumn>
                <TableColumn
                    prop="storeHouse"
                    label="仓库"
                >
                </TableColumn>
                <TableColumn
                    prop="orderTime"
                    label="下单时间"
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
<script>
    import orderService from '@B2B/services/substatAdmin/orderService.js'
    export default{
        data(){
            return {
                loading: true,
                searchObj:{},
//                tableContent: [],

                tableContent:[{
                    "cancelTime": "2017-10-26T07:36:32.119Z",
                    "carrier": "string",
                    "carrierNo": "string",
                    "dealerId": 0,
                    "dealerIds": [
                        0
                    ],
                    "dealerName": "string",
                    "id": 0,
                    "mainOrderNo": "string",
                    "memo": "string",
                    "merchantName": "string",
                    "orderNo": "string",
                    "orderTime": "2017-10-26T07:36:32.119Z",
                    "payOrNot": 0,
                    "payOrNotDesc": "string",
                    "payableAmount": 0,
                    "paymentAmount": 0,
                    "paymentMethod": 0,
                    "paymentMethodDesc": "string",
                    "paymentNo": "string",
                    "paymentTime": "2017-10-26T07:36:32.119Z",
                    "paymentType": 0,
                    "paymentTypeDesc": "string",
                    "receiverAddress": "string",
                    "receiverName": "string",
                    "receiverPhone": "string",
                    "refundAmount": 0,
                    "refundMethod": 0,
                    "refundNo": "string",
                    "refundTime": "2017-10-26T07:36:32.119Z",
                    "savedAmount": 0,
                    "shopId": 0,
                    "shopName": "string",
                    "siteId": 0,
                    "siteName": "string",
                    "splitOrderNot": 0,
                    "splitTime": "2017-10-26T07:36:32.119Z",
                    "state": 0,
                    "stateDesc": "string",
                    "storeHouse": "string",
                    "totalAmount": 0,
                    "userId": 0
                }],
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                selectRow:{}
            }
        },
        methods: {

            // 获取tableData
            async getOrderList(){
                this.loading = true
                let message = {
                    stationId:this.searchObj.stationId,
                    orderNo:this.searchObj.orderNo,
                    dealerName:this.searchObj.dealerName,
                    payOrNot:this.searchObj.payOrNot,
                    merchantName:this.searchObj.merchantName,
                    pageSize:this.page.pageSize,
                    pageNum:this.page.pageNum
                }
                // 请求分页数据
                try {
                    const data = await orderService.getOrderList(message)
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

            // 点击订单编号
            orderCodeClick(){
                let addTabObj = {
                    name:  `${this.selectRow.orderNo}-详情`,
                    tag: `b2b_order_details_${this.selectRow.orderNo}`,
                    parentTag: ''
                }
                this.$root.bus.$emit('b2bOrderTabAdd', addTabObj)
            },

            // 清空
            resetSearch(){
                this.searchObj={}
            },

            // 点击table每行
            handleRowClick(row, event, column) {
                if (column.type == 'selection' || column.type == 'index')return
                this.selectRow = row
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getOrderList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getOrderList()
            }
        },
        mounted () {
//            this.getOrderList()
        }
    }
</script>
