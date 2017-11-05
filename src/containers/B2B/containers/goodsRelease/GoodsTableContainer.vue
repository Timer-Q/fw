<template>
    <div class="goods-table">
        <div class="content">
            <div class="search">
                <Form :inline="true" :model="{}" class="demo-form-inline">
                    <FormItem>
                        <Input style="width: 210px;" v-model="searchObj.skuId" icon="search" placeholder="商品名称/商品条码/SKUID"></Input>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.skuId" placeholder="企业类目">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.onOffStatus" placeholder="上下架">
                            <Option label="上架" key="1" value="1"></Option>
                            <Option label="下架" key="0" value="0"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.offType" placeholder="下架类型">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.skuId" placeholder="品牌">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.skuId" placeholder="商品类目">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.skuId" placeholder="商品标签">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.skuId"  placeholder="启用停用">
                            <Option label="启用" key="1" value="1"></Option>
                            <Option label="停用" key="0" value="0"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchObj.downTime">
                            <Option label="下架时间" key="1" value="1"></Option>
                            <Option label="修改时间" key="0" value="0"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="text">高级查询</Button>
                    </FormItem>
                </Form>
            </div>
            <div>
                <span>已选择{{skuIds.length}}个</span>
                <span class="separate">|</span>
                <Button class="public-function-btn" :disabled="isAvailable" @click="shelvesClick(1)">上架</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="shelvesClick(0)">下架</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="setGoodsSloganClick">设置商品标语</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="setGoodsLabelClick">设置商品标签</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="setIsVIP">设置是否平台专享</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="setAutoDownShelvesTime">设置自动下架时间</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="goodsGroup">商品分组</Button>
                <Button class="public-function-btn" :disabled="isAvailable" @click="cancelGroup">取消分组</Button>

                <Button class="public-function-btn" :disabled="isAvailable" @click="updateById">修改</Button>
            </div>

            <Table
                :class="{'content-hide':tableContentHide}"
                max-height="680"
                style="width: 100%"
                :data="tableContent"
                :loading="loading"
                border
                :highlight-current-row="true"
                @row-click="handleRowClick"
            >
                <TableColumn
                    type="selection"
                    fixed
                    width="55">
                    <template slot-scope="scope">
                        <Checkbox v-model="scope.row.checked" @change="parentSelectChange(scope.row,false)"></Checkbox>
                    </template>
                </TableColumn>
                <TableColumn
                    prop="shopName"
                    type="expand"
                    width="55">
                    <template slot-scope="scope" v-if="scope.row.goodsSubVoList.length">
                        <Table
                            style="width: 100%"
                            :data="scope.row.goodsSubVoList"
                            @row-click="handleRowClick"
                        >
                            <TableColumn
                                width="55">
                            </TableColumn>
                            <TableColumn
                                type="selection"
                                width="55">
                                <template slot-scope="scope">
                                    <Checkbox v-model="scope.row.checked" @change="childSelectChange(scope.row,true)"></Checkbox>
                                </template>
                            </TableColumn>
                            <TableColumn
                                prop="shopName"
                                label="商品信息"
                                width="360">
                                <template slot-scope="scope">
                                    <div class="good-message">
                                        <img :src="scope.row.mainPic" alt="">
                                        <div>
                                            <p>
                                                <span>商品条码:{{scope.row.goodsBarcode}}</span>
                                                <i class="iconfont icon-xin" v-if="scope.row.tagNew"></i>
                                                <i class="iconfont icon-tui" v-if="scope.row.tagRecommend"></i>
                                                <i class="iconfont icon-hui" v-if="scope.row.tagNew"></i>
                                            </p>
                                            <p><span>{{scope.row.goodsName}}</span></p>
                                        </div>
                                    </div>
                                </template>
                            </TableColumn>
                            <TableColumn
                                prop="onOffStatusDesc"
                                label="上下架状态"
                                width="100">
                            </TableColumn>
                            <TableColumn
                                prop="offTypeDesc"
                                label="下架类型">
                            </TableColumn>
                            <TableColumn
                                prop="groupNum"
                                label="分组编号">
                            </TableColumn>
                            <TableColumn
                                prop="specification"
                                label="规格型号">
                            </TableColumn>
                            <TableColumn
                                prop="integerZeroConvert"
                                label="整零转换">
                            </TableColumn>
                            <TableColumn
                                prop="platformShow"
                                label="平台订货价(元)"
                                width="120">
                            </TableColumn>
                            <TableColumn
                                prop="minimumOrderQuantity"
                                label="起订量">
                            </TableColumn>
                            <TableColumn
                                prop="invetory"
                                label="可售库存">
                            </TableColumn>
                            <TableColumn
                                prop="brandName"
                                label="品牌">
                            </TableColumn>
                            <TableColumn
                                prop="enterpriseCategoryDesc"
                                label="企业类型">
                            </TableColumn>
                        </Table>
                    </template>
                </TableColumn>
                <TableColumn
                    prop="shopName"
                    label="商品信息"
                    width="360">
                    <template slot-scope="scope">
                        <div class="good-message">
                            <img :src="scope.row.mainPic" alt="">
                            <div>
                                <p>
                                    <span>商品条码:{{scope.row.goodsBarcode}}</span>
                                    <i class="iconfont "></i>
                                    <i class="iconfont "></i>
                                </p>
                                <p><span>打开了副驾驶的空间发射点立刻反击的老师</span></p><!--{{scope.row.goodsName}}-->
                            </div>
                        </div>
                    </template>
                </TableColumn>
                <TableColumn
                    prop="onOffStatusDesc"
                    label="上下架状态"
                    width="100">
                </TableColumn>
                <TableColumn
                    prop="offTypeDesc"
                    label="下架类型">
                </TableColumn>
                <TableColumn
                    prop="groupNum"
                    label="分组编号">
                </TableColumn>
                <TableColumn
                    prop="specification"
                    label="规格型号">
                </TableColumn>
                <TableColumn
                    prop="integerZeroConvert"
                    label="整零转换">
                </TableColumn>
                <TableColumn
                    prop="platformShow"
                    label="平台订货价(元)"
                    width="120">
                </TableColumn>
                <TableColumn
                    prop="minimumOrderQuantity"
                    label="起订量">
                </TableColumn>
                <TableColumn
                    prop="invetory"
                    label="可售库存">
                </TableColumn>
                <TableColumn
                    prop="brandName"
                    label="品牌">
                </TableColumn>
                <TableColumn
                    prop="enterpriseCategoryDesc"
                    label="企业类型">
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
            <dialog-temp :skuIds="skuIds" :resultInfo="resultInfo" :goodsDialog="goodsDialog"></dialog-temp>
            <!--列表按钮-->
            <tooltip name="costorder">
                <Button size="mini">上架</Button>
                <Button size="mini">下架</Button>
                <Button size="mini">预览</Button>
                <Button size="mini" @click="updateById">修改</Button>
            </tooltip>
            <!--待改-->
            <div class="null-div" v-if="tableContentHide">
                <p>暂无数据！</p>
                <p>首次发布商品，需从商品基础信息中获取</p>
                <Button type="primary" @click="syncClick">立即同步商品基础信息</Button>
            </div>
            <!--待改-->
            <!--<div v-if="">-->
            <!--<Progress :percentage="schedule"></Progress>-->
            <!--</div>-->
            <div class="undefined-div" v-show="availableText">
                <i class="iconfont icon-quexing"></i>
                <p>您还未入住蜂网B2B平台，请先联系蜂网运营人员完成入驻。</p>
            </div>

        </div>
    </div>
</template>
<style lang="scss">
    .goods-table{
        .content-hide {
            .el-table__body-wrapper {
                display: none;
            }
        }
        .el-table{
            .el-icon{
                font-family:"iconfont" !important;
                font-size:18px;
                color: #3fa9f5;
            }
            .el-table__expand-icon{
                .el-icon-arrow-right:before{
                    content:"\E67e";
                }
            }
            .el-table__expand-icon--expanded{
                transform: rotate(0deg);
                .el-icon-arrow-right:before{
                    content:"\e687";
                }
            }
        }
        .el-table__expanded-cell{
            padding:0;
            .el-table{
                margin-top:0;
                .el-table__header-wrapper{
                    display: none;
                }
                tr{
                    background: #f6f6f6;
                    &:hover{
                        background: #f6f6f6;
                    }
                }
            }
        }
        // 进度条
        .el-progress{
            width: 30%;
            left: 50%;
            transform: translateX(-50%);
            .el-progress-bar{
                width: 90%;
                padding: 3px;
                border-radius: 6px;
                border: 1px solid #CCCCCC;
                margin-right: 0;
            }
            .el-progress__text{
                color: #29a7e1;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .separate{
        margin:0 5px 0 16px;
    }
    .good-message{
        /*line-height: 25px;*/
        margin:10px auto;
        clear: both;
        overflow: hidden;
        img{
            width: 42px;
            height: 42px;
            margin-right: 5px;
            float: left;
        }
        div{
            float: left;
            span{
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        i{
            &.icon-xin{
                color: #3fbcaf;
            }
            &.icon-tui{
                color: #fe0001;
            }
        }
    }
    .null-div{
        text-align: center;
        /*margin-top: 10%;*/
        p{
            line-height: 25px;
            &:first-child{
                font-size: 16px;
            }
            &:nth-child(2){
                font-size: 14px;
            }
        }
        button{
            margin-top: 5px;
        }
    }
    .undefined-div{
        text-align: center;
        margin-top: 10%;
        line-height: 25px;
        i{
            font-size: 60px;
        }
        p{
            font-size: 14px;
        }
    }
</style>
<script>
    import goodsReleaseService from '@B2B/services/goodsRelease/goodsReleaseService.js'
    import dialogTemp from '@B2B/containers/goodsRelease/DialogContainer.vue'
    export default{
        data(){
            return {
                loading: true,
                searchObj:{
                    // 站点id（search选择）
                    stationId: 10001,
                    // 经销商名称/简介
                    skuId:'',
                },
                skuIds: [],
                tableContent: [],
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                resultInfo:{},
                // 同步块控制
                tableContentHide:false,
                // 进度条进度
                schedule:0,
                goodsDialog:false,
                isAvailable:true,
                availableText:""
            }
        },
        components:{
            dialogTemp
        },
        methods: {
            // 获取tableData
            async getGoodsList(){
                const _this = this
                this.loading = true
                let message={
                    dealerId:1
                }
                // 请求分页数据
                try {
                    const data = await goodsReleaseService.getGoodsList(message)
                    if (data.status == 200&&data.data.result) {
                        const result = data.data.result
                        // 赋值tableData
                        this.tableContent = []
                        if(!result.list.length){
                            this.tableContentHide = true
                            return
                        }
                        this.isAvailable = false
                        this.tableContentHide = false
                        result.list.forEach((item)=>{
                            item['checked']=false
                            item.goodsSubVoList.forEach((child)=>{
                                child['checked']=false
                            })
                            _this.tableContent.push(item)
                        })
                        // 赋值总条数
                        this.page.total = result.total
                        // 总页数
                        this.page.pages = result.pages
                    }else{
                        this.isAvailable = true
                        this.availableText = data.status.statusReason
                    }
                    this.loading = false
                }
                catch (e) {
                }
            },

            // spu复选
            parentSelectChange(row,state){
                const _this = this
                if(state)return
                if(row.goodsSubVoList.length){
                    // 子遍历
                    row.goodsSubVoList.forEach((item)=>{
                        item.checked = row.checked
                        if(row.checked){
//                            判断是否已存在id
                            let isExist = _this.skuIds.length&&_this.skuIds.every((id)=>{
                                    return id==item.skuId
                                })
                            if(!isExist){
                                _this.skuIds.push(item.skuId)
                            }
                        }else{
                            // 删除
                            _this.skuIds.forEach((id,index)=>{
                                if(id==item.skuId){
                                    _this.skuIds.splice(index,1)
                                }
                            })

                        }
                    })
                }
                else{
                    this.skuIds.push(row.skuId)
                }
                console.log(this.skuIds)
            },
            // sku复选
            childSelectChange(row){
                const _this = this
                if(row.checked){
                    this.skuIds.push(row.skuId)
                }
                this.tableContent.forEach((item)=>{
                    item.goodsSubVoList.forEach((child)=>{
                        if(row.checked){
//                            父级选中
                            if(child.skuId==row.skuId){
                                item.checked = true
                            }
                        }else{
                            let flag = 0
                            _this.skuIds.forEach((id,index)=>{
                                if(id==row.skuId){
                                    _this.skuIds.splice(index,1)
                                    item.goodsSubVoList.forEach((conChild)=>{
                                        if(conChild.checked)return
                                        else flag++
                                    })
                                    if(flag==item.goodsSubVoList.length){
                                        item.checked = false
                                    }
                                    return
                                }
                            })
                        }
                    })

                })
                console.log(this.skuIds)
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getGoodsList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getGoodsList()
            },

            // 点击table每行
            handleRowClick(row, event, column) {
                if (column.type == 'selection' || column.type == 'index')return
                this.selectRow = row
            },

            // 修改
            updateById(){
                let addTabObj={
                    name: `${this.selectRow.goodsName}-修改`,
                    tag: 'b2b_goods_update',
                    parentTag: '',
                    id:this.selectRow.skuId||this.selectRow.productId,
                    state:this.selectRow.skuId?"sku":"product"
                }
                this.$root.bus.$emit('goodsReleaseTabAdd',addTabObj)
            },

            syncClick(){
                const _this = this
                this.tableContentHide = true
                let iteration = setInterval(()=>{
                    _this.schedule+=10
                    if(_this.schedule==100){
                        clearInterval(iteration)
                    }
                },100)
            },

            // 上下架
            shelvesClick(type){

            },

            // 设置商品标语
            setGoodsSloganClick(){
                this.resultInfo.title = "设置商品标语"
                this.resultInfo.type = "slogan"
                this.$root.bus.$emit("buttonClick",this.resultInfo.type)
            },

            // 设置商品标签
            setGoodsLabelClick(){
                this.resultInfo.title = "设置商品标签"
                this.resultInfo.type = "label"
                this.$root.bus.$emit("buttonClick",this.resultInfo.type)
            },

            // 设置是否平台专享
            setIsVIP(){
                this.resultInfo.title = "设置是否平台专享"
                this.resultInfo.type = "isVIP"
                this.$root.bus.$emit("buttonClick",this.resultInfo.type)
            },

            // 设置自动下架时间
            setAutoDownShelvesTime(){

            },

            // 商品分组
            goodsGroup(){

            },

            // 取消分组
            cancelGroup(){

            }

        },
        mounted () {
            const _this = this
            this.$root.bus.$on("goodsTableRefresh",()=>{
                _this.getGoodsList()
            })
            this.getGoodsList()
        }
    }
</script>
