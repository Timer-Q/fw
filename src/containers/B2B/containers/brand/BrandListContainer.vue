<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" @click="getBrandList">刷新</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <div class="content">
            <div class="search">
                <Form :inline="true" :model="{}" class="demo-form-inline">
                    <FormItem label="选择站点">
                        <Select v-model="searchObj.stationId">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="品牌">
                        <Input placeholder="名称" v-model="searchObj.name"></Input>
                    </FormItem>
                    <FormItem label="经销商">
                        <Input placeholder="名称/简称/助记符" v-model="searchObj.dealerName"></Input>
                    </FormItem>
                    <FormItem>
                        <Button class="search-btn" @click="getBrandList">查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="text" @click="resetSearch">清空</Button>
                    </FormItem>
                </Form>
            </div>
            <Table
                max-height="680"
                :data="tableContent"
                :loading="loading"
                border
                :highlight-current-row="true"
            >
                <TableColumn
                    type="index"
                    width="50"
                    label="序号">
                </TableColumn>
                <TableColumn
                    prop="brandId"
                    label="品牌ID">
                </TableColumn>
                <TableColumn
                    prop="name"
                    label="品牌名">
                </TableColumn>
                <TableColumn
                    prop="logoUrl"
                    label="品牌LOGO">
                    <template slot-scope="scope">
                        <img class="commodity-img" :src="scope.row.logoUrl" alt="品牌LOGO">
                    </template>
                </TableColumn>
                <TableColumn
                    prop="dealersNum"
                    label="经销商数量">
                </TableColumn>
                <TableColumn
                    prop="goodsNum"
                    label="商品数量">
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
<style scoped>
    .commodity-img{
        width: 100px;
        height: 50px;
        border: 1px solid #adadad;
        margin: 10px auto;
    }
</style>
<script>
    import brandService from '@B2B/services/substatAdmin/brandService.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    export default{
        mixins: [scrollMixins],
        data(){
            return {
                loading:false,
                searchObj:{
                    // 站点id（search选择）
                    stationId: '',
                    brandId:'',
                    dealerName  :''
                },
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                tableContent:[]
            }
        },
        methods: {

            // 获取tableData
            async getBrandList(){
                this.loading = true
                const message = {
                    stationId: this.searchObj.stationId,
                    name : this.searchObj.name ,
                    dealerName: this.searchObj.dealerName,
                    pageNum:this.page.pageNum,
                    pageSize:this.page.pageSize
                }
                // 请求分页数据
                try {
                    const data = await brandService.getListBrandsByPage(message)
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
                    this.$customMessage("查询失败-c","error")
                    console.log(e)
                }
            },




            // 清空
            resetSearch(){
                this.searchObj={}
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getBrandList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getBrandList()
            }
        },
        mounted () {
            this.getBrandList()
        }
    }
</script>
