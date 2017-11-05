<template>
    <div>
        <div>
            <div class="projection">
                <Button class="public-function-btn" :disabled="Number(activeName)" @click="clickTopBtn(1)">审核通过</Button>
                <Button class="public-function-btn" :disabled="Number(activeName)" @click="clickTopBtn(0)">审核不通过</Button>
                <Button class="public-function-btn" @click="refreshCommodityList">刷新</Button>
                <Button class="public-function-btn">日志</Button>
            </div>
            <div class="content">

                <!--高级查询-->
                <div class="search">
                    <Form :inline="true" :model="{}" class="demo-form-inline">
                        <FormItem label="选择站点">
                            <Select v-model="searchObj.stationId">
                                <Option label="区域一" key="shanghai" value="shanghai"></Option>
                                <Option label="区域二" key="beijing" value="beijing"></Option>
                            </Select>
                        </FormItem>
                        <FormItem label="商品名称">
                            <Input placeholder="名称" v-model="searchObj.goodsName"></Input>
                        </FormItem>
                        <FormItem label="经销商">
                            <Input placeholder="名称/简称/标记符" v-model="searchObj.dealerName"></Input>
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
                        <FormItem>
                            <Button class="search-btn" @click="refreshCommodityList">查询</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="text" @click="resetSearch">清空</Button>
                        </FormItem>
                    </Form>
                </div>

                <!--tab列表-->
                <Tabs class="custom" v-model="activeName" type="card" @tab-click="handleClick(activeName)">
                    <TabPane label="已审核" name="1">
                        <content-temp :status="1" :searchObj = 'searchObj'></content-temp>
                    </TabPane>
                    <TabPane label="待审核" name="0">
                        <content-temp  :status="0" :searchObj = 'searchObj'></content-temp>
                    </TabPane>
                </Tabs>
            </div>

            <!--列表按钮-->
            <tooltip name="costorder">
                <Button size="mini" v-if="!Number(activeName)" @click="dialogShow(1)">审核通过</Button>
                <Button size="mini" v-if="!Number(activeName)" @click="dialogShow(0)">审核不通过</Button>
                <Button size="mini" @click="commodityDetailsBtn">查看详情</Button>
            </tooltip>
        </div>
    </div>

</template>

<style lang="scss" scoped>
</style>
<script>
    import contentTemp from '@B2B/containers/commodity/CommodityList1Container.vue'
    import commodityService from '@B2B/services/substatAdmin/commodityService.js'
    export default{
        components:{
            contentTemp
        },
        data(){
            return {
                value: '',
                loading: true,
                activeName:'1',
                searchObj:{
                    // 站点id（search选择）
                    stationId: 1,
                    goodsName:'',
                    brandName:'',
                    goodsCategoryId:'',
                    // 经销商名称/简介
                    dealerName:''
                },
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                // 当前选中的行
                selectRow:{},
                // 选中的商品id集合
                skuIds:[]

            }
        },
        methods: {
            // tab切换
            handleClick(activeName){
                this.$root.bus.$emit('getTableData',activeName)
            },

            // 清空
            resetSearch(){
                this.searchObj={}
                this.searchObj.stationId = 1
            },

            // 刷新
            refreshCommodityList(){
                this.$root.bus.$emit('getTableData')
            },

            // 商品详情
            commodityDetailsBtn(item){
                item = item.skuId?item:this.selectRow
                let addTabObj = {
                    name: `${item.goodsName}-详情`,
                    tag: `b2b_commodity_detail_${item.skuId}`,
                    parentTag: '',
                    skuId:item.skuId,
                    stationId:this.searchObj.stationId,
                    status:'examine',
                    activeName:this.activeName
                }
                this.$root.bus.$emit('commodityExamineDetailTabAdd', addTabObj)
            },

            clickTopBtn(status){
                if(Number(this.activeName))return
                if (!this.skuIds.length) {
                    this.$customMessage("请勾选至少一条记录","warning")
                    return
                }
                this.$root.bus.$emit('clickTopBtn', status,this.skuIds,this.searchObj.stationId)
            },
            dialogShow(status){
                this.$root.bus.$emit('dialogShow', status,this.selectRow.skuId,this.searchObj.stationId)
            }
        },
        mounted () {
            const _this = this

            // table 单击行
            this.$root.bus.$on('handleRowClick',(row)=>{
                _this.selectRow = row
                // table行按钮集
                _this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
            })

            this.$root.bus.$on('commodityDetailsBtn',(row)=>{
                _this.commodityDetailsBtn(row)
            })

            this.$root.bus.$on('skuIdsChange',(skuIds)=>{
                _this.skuIds = skuIds
            })

            this.$root.bus.$on('detailByExamine', (status)=>{
                _this.dialogShow(status)
            })
        }
    }
</script>
