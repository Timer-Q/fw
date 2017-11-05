<template>
    <div ref="scroll">
        <div class="projection">
            <Button class="public-function-btn" :disabled="!isUpStatus" @click="clickTopBtn(1,'checkBox')">上架</Button>
            <Button class="public-function-btn" :disabled="!isOffStatus" @click="clickTopBtn(0,'checkBox')">下架</Button>
            <Button class="public-function-btn" @click="getCommodityList">刷新</Button>
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
                    <FormItem label="商品名称">
                        <Input placeholder="名称/简称/助记符" v-model="searchObj.goodsName"></Input>
                    </FormItem>
                    <FormItem label="经销商">
                        <Input placeholder="经销商名称/简称" v-model="searchObj.dealerName"></Input>
                    </FormItem>
                    <FormItem label="品牌">
                        <Input placeholder="品牌名称" v-model="searchObj.brandName"></Input>
                    </FormItem>
                    <FormItem label="系统类目">
                        <Select v-model="searchObj.goodsCategoryId">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="状态">
                        <Select v-model="searchObj.onOffStatus">
                            <Option label="全部" key="" value=""></Option>
                            <Option label="上架" key="1" value="1"></Option>
                            <Option label="下架" key="0" value="0"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button class="search-btn" @click="getCommodityList">查询</Button>
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

        <!--列表按钮-->
        <tooltip name="costorder">
            <Button size="mini" @click="commodityDetailsBtn()">查看详细</Button>
            <Button size="mini" v-if="isUpStatus" @click="clickTopBtn(1,'row')">上架</Button>
            <Button size="mini" v-if="isOffStatus" @click="clickTopBtn(0,'row')">下架</Button>
        </tooltip>

        <!--对话框-->
        <Dialog class="dialog-default" :title="resultInfo.title" :visible.sync="dialogVisible">
            <div class="dialog-cont-one">
                <p>{{resultInfo.msg}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <Button size="small" type="cancel" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="confirm" @click="confirmBtnClick">确 定</Button>
            </span>
        </Dialog>
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
                loading:false,
                searchObj:{
                    // 站点id（search选择）
                    stationId: 1,
                    // 商品名称
                    goodsName:'',
                    // 经销商名称/简介
                    dealerName:'',
                    // 品牌
                    brandName:'',
                    // 系统类目
                    goodsCategoryId:'',
                    // 上下架状态
                    onOffStatus:''
                },
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
                dialogVisible: false,
                // 选中商品id集合
                skuIds: [],
                // 是否可上架
                isUpStatus: false,
                isOffStatus: false,
                tableContent: [],
                selectRow:{}
            }
        },
        methods: {

            // 获取tableData
            async getCommodityList(){
                this.loading = true

                const message = {
                    stationId: this.searchObj.stationId,
                    goodsName: this.searchObj.goodsName,
                    dealerName: this.searchObj.dealerName,
                    goodsCategoryId:this.searchObj.goodsCategoryId,
                    pageNum:this.page.pageNum,
                    pageSize:this.page.pageSize,
                    auditStatus:1
                }
                this.searchObj.onOffStatus.length?message.onOffStatus = this.searchObj.onOffStatus:""
                // 请求分页数据
                try {
                    const data = await commodityService.getCommodityList(message)
                    if (data.status == 200&&data.data.result) {
                        const result = data.data.result
                        // 赋值tableData
                        this.tableContent = []
                        if(!result)return
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
                    this.defaultBtnState()
                }
                catch (e) {
                    this.$customMessage("查询失败-c","error")
                    console.log(e)
                }
            },

            defaultBtnState(){
                this.isUpStatus = false
                this.isOffStatus = false
            },

            // 列表上部按钮
            clickTopBtn(state,source){
                this.source = source
                if (source=='checkBox' && !this.skuIds.length) {
                    this.$customMessage("请勾选至少一条记录","warning")
                    return
                }
                this.resultInfo.type = state
                switch (state) {
                    case 1: {
                        this.resultInfo.title = '商品上架提示'
                        this.resultInfo.msg = '确定将选中的商品上架？'
                        this.resultInfo.status = 1
                    }
                        break
                    case 0: {
                        this.resultInfo.title = '商品下架提示'
                        this.resultInfo.msg = '确定将选中的商品下架？下架后将删除商品的推荐信息。'
                        this.resultInfo.status = 0
                    }
                        break
                }
                this.dialogVisible = true
            },

            // 上下架确定按钮
            confirmBtnClick(){
                this.goodsOnOffUpdate(this.resultInfo.status)
                this.dialogVisible = false
            },

            // 修改上下架
            async goodsOnOffUpdate(onOffStatus){
                const message = {
                    skuIds: this.source=='checkBox'?this.skuIds:[this.selectRow.skuId],
                    onOffStatus:onOffStatus
                }
                try {
                    const data = await commodityService.goodsOnOffUpdate(message)
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.getCommodityList()
                        this.$customMessage("操作成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败","error")
                    }
                    this.loading = false
                }
                catch (e) {
                    this.$customMessage("操作失败","error")
                    console.log(e)
                }
            },

            // 商品详情
            commodityDetailsBtn(item){
                item = item?item:this.selectRow
                let addTabObj = {
                    name: `${item.goodsName}-详情`,
                    tag: 'b2b_commodity_detail',
                    parentTag: '',
                    skuId:item.skuId
                }
                this.$root.bus.$emit('commodityDetailTabAdd', addTabObj)
            },

            // 清空
            resetSearch(){
                this.searchObj={}
                this.searchObj.stationId = 1
            },

            // 点击table每行
            handleRowClick(row, event, column) {
                if (column.type == 'selection' || column.type == 'index')return
                this.selectRow = row
                // table行按钮集
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')

                this.isUpStatus = row.onOffStatus?false:true
                this.isOffStatus = !this.isUpStatus
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getCommodityList()
            },

            // 列表复选框发生改变
            selectionChange(selection){
                this.skuIds = []
                selection.forEach((item) => {
                    this.skuIds.push(item.skuId)
                })
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getCommodityList()
            }
        },
        mounted () {
            this.getCommodityList()
        }
    }
</script>
