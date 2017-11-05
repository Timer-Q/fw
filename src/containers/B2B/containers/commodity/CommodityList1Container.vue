<template>
    <div class="inner-content">
        <Table
            max-height="680"
            :data="tableContent"
            :loading="loading"
            border
            :highlight-current-row="true"
            @row-click="handleRowClick"
            @selection-change="selectionChange"
        >
            <TableColumn
                type="index"
                fixed
                width="50"
                label="序号">
            </TableColumn>
            <TableColumn
                type="selection"
                fixed
                width="55">
            </TableColumn>
            <TableColumn
                prop="stationName"
                label="站点名称">
            </TableColumn>
            <TableColumn
                prop="dealerName"
                label="经销商">
            </TableColumn>
            <TableColumn
                prop="goodsPic"
                label="商品图片">
                <template slot-scope="scope">
                    <img class="commodity-img" :src="scope.row.goodsPic" alt="商品图片">
                </template>
            </TableColumn>
            <TableColumn
                prop="skuId"
                label="SKUID">
            </TableColumn>
            <TableColumn
                prop="goodsName"
                label="商品名称">
                <template slot-scope="scope">
                    <Button type="text" @click="commodityDetailsBtn(scope.row)">{{ scope.row.goodsName }}</Button>
                </template>
            </TableColumn>
            <TableColumn
                prop="orderPrice"
                label="订货价(元)">
            </TableColumn>
            <TableColumn
                prop="suggestPrice"
                label="建议售价(元)">
            </TableColumn>
            <TableColumn
                prop="specification"
                label="规格型号">
            </TableColumn>
            <TableColumn
                prop="brandName"
                label="品牌">
            </TableColumn>
            <TableColumn
                prop="productNumber"
                label="货号">
            </TableColumn>
            <TableColumn
                prop="goodsCategoryName"
                label="商品类目">
            </TableColumn>
            <TableColumn
                prop="inventory"
                label="可用库存">
            </TableColumn>
            <TableColumn
                prop="goodsCategoryName"
                label="商品类目">
            </TableColumn>
            <TableColumn
                prop="onOffStatus"
                label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.onOffStatus">上架</span>
                    <span v-else>下架</span>
                </template>
            </TableColumn>
            <TableColumn
                prop="offType"
                label="下架类型">
                <template slot-scope="scope">
                    <div v-if="!scope.row.onOffStatus">
                        <span v-if="scope.row.offType==0">从未上架</span>
                        <span v-else-if="scope.row.offType==1">审核下架</span>
                        <span v-else-if="scope.row.offType==2">自主下架</span>
                        <span v-else-if="scope.row.offType==3">系统下架</span>
                    </div>
                </template>
            </TableColumn>
            <TableColumn
                prop="updateTime"
                label="修改时间">
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
<style scoped>
    .commodity-img{
        max-width: 100px;
        height: 50px;
        border: 1px solid #adadad;
        margin: 10px auto;
    }
</style>
<script>
    import commodityService from '@B2B/services/substatAdmin/commodityService.js'
    export default{
        data(){
            return {
                value: '',
                loading: true,
                // 选中经销商id集合
                dealerIds: [],
                tableContent: [],
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                // 对话框是否显示
                dialogVisible: false
            }
        },
        methods: {

            // 获取tableData
            async getCommodityList(activeName){
                this.loading = true
                const message = {
                    goodsName:this.searchObj.goodsName,
                    stationId: this.searchObj.stationId,
                    brandName: this.searchObj.brandName,
                    goodsCategoryId: this.searchObj.goodsCategoryId,
                    dealerName: this.searchObj.dealerName,
                    pageNum:this.page.pageNum,
                    pageSize:this.page.pageSize
                }
                if(activeName!=undefined){
                    message.status = activeName
                }
                // 请求分页数据
                try {
                    const data = await commodityService.getCommodityList(message)
                    if(data.status==200){
                        const result = data.data.result
                        // 赋值tableData
                        this.tableContent = []
                        f
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

                this.$root.bus.$emit('handleRowClick',row)
            },

            commodityDetailsBtn(item){
                this.$root.bus.$emit('commodityDetailsBtn',item)
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getCommodityList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getCommodityList()
            },



            // 列表复选框发生改变
            selectionChange(selection){
                this.skuIds = []
                selection.forEach((item) => {
                    this.skuIds.push(item.skuId)
                })
                this.$root.bus.$emit('skuIdsChange',this.skuIds)
            },

            // 对话框确定按钮
            async confirmBtnClick(){
                const type = this.resultInfo.type
                let status = type == 'startUp' ? 1 : type == 'blockUp' ? 2 : 3
                const message = {
                    stationId: this.searchObj.stationId,
                    dealerIds: this.dealerIds,
                    status: status
                }
                try{
                    const data = await dealerService.updateByStationId(message)
                    if(data.status==200){
//                        const successCount = data.result
                        this.getCommodityList()
                        this.$customMessage("操作成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败","error")
                    }
                    this.dialogVisible = false
                }catch(e){
                    console.log(e)
                    this.$customMessage("操作失败-c","error")
                }
            }
        },
        mounted () {
            const _this = this
            this.getCommodityList(1)

            this.$root.bus.$on('getTableData',(activeName)=>{
                _this.getCommodityList(activeName)
            })
        },
        props:{
            status:Number,
            searchObj:Object
        }
    }
</script>
