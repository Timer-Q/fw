<template>
    <div>
        <div class="projection" v-if="parentObj.status=='examine'&&parentObj.activeName=='0'">
            <Button class="public-function-btn" @click="clickTopBtn(1)">审核通过</Button>
            <Button class="public-function-btn" @click="clickTopBtn(0)">审核不通过</Button>
        </div>
        <div ref="scroll" class="test" style="overflow: auto">
            <Collapse v-model="activeNames" class="my">
                <CollapseItem title="基本信息" name="1">
                    <div class="row-div">
                        <div class="cow-div">
                            <span>经销商</span>
                            <span class="long">{{formData.dealerName}}</span>
                        </div>
                        <div class="cow-div">
                            <span>商品类目</span>
                            <span  class="long">{{formData.goodsCategoryName}}</span>
                        </div>
                    </div>
                    <div class="row-div">
                        <div class="cow-div">
                            <span>商品名称</span>
                            <span  class="long">{{formData.goodsName}}</span>
                        </div>
                        <div class="cow-div">
                            <span>商品标语</span>
                            <span  class="long">{{formData.goodsSlogan}}</span>
                        </div>
                    </div>
                    <div class="row-div">
                        <div class="cow-div" v-if="formData.goodsSpecs.length" v-for="(value,key) in goodsSpecsTranslation(formData.goodsSpecs)">
                            <span>{{key}}</span>
                            <span class="short">{{value}}</span>
                        </div>
                    </div>
                </CollapseItem>
                <CollapseItem title="商品参数" name="2">
                    <div class="row-div">
                        <div class="cow-div" v-for="item in formData.params">
                            <span>{{item.paramName}}</span>
                            <span>{{item.paramVal}}</span>
                        </div>
                    </div>
                </CollapseItem>
                <CollapseItem title="销售信息" name="3">
                    <div class="row-div long-label">
                        <div class="cow-div">
                            <span>计量单位</span>
                            <span>{{formData.measurementUnit}}</span>
                        </div>
                        <div class="cow-div">
                            <span>整零转换</span>
                            <span>{{formData.integerZeroConvert}}</span>
                        </div>
                        <div class="cow-div">
                            <span>起订量</span>
                            <span>{{formData.minimumOrderQuantity}}</span>
                        </div>
                    </div>
                    <div class="row-div long-label">
                        <div class="cow-div">
                            <span>平台订货价</span>
                            <span>{{formData.orderPrice}}</span>
                        </div>
                        <div class="cow-div">
                            <span>二级单位订货价</span>
                            <span>{{formData.secondOrderPrice}}</span>
                        </div>
                        <div class="cow-div">
                            <span>三级单位订货价</span>
                            <span>{{formData.thirdOrderPrice}}</span>
                        </div>
                    </div>
                    <div class="row-div long-label">
                        <div class="cow-div">
                            <span>不可订货单位</span>
                            <span>{{formData.nonOrderedUnit}}</span>
                        </div>
                        <div class="cow-div">
                            <span>商品标签</span>
                            <span>{{formData.tagNew}}</span>
                        </div>
                        <div class="cow-div">
                            <span>是否平台专享</span>
                            <span>{{formData.platformShow}}</span>
                        </div>
                    </div>
                </CollapseItem>
                <CollapseItem title="图片" name="4">
                    <div class="row-div">
                        <img v-if="formData.picsUrl.length" v-for="item in picsUrlTranslation(formData.picsUrl)" :src="item" alt="" @click="imageClickEnlarge(item)">
                    </div>
                </CollapseItem>
                <CollapseItem title="详细说明" name="5" style="height:500px;">
                    <div class="row-div">
                        <p>{{formData.description}}</p>
                    </div>
                </CollapseItem>
            </Collapse>
        </div>
        <div class="enlarg-layer" v-show="imageShow">
            <img :src="enlargImg" alt="">
            <i class="iconfont icon-shanchuxx" @click="closeImgClick"></i>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .enlarg-layer{
        position: absolute;
        top: 0;
        z-index: 100;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,.6);
        img{
            width: 422px;
            height: 300px;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
        }
        i{
            position: absolute;
            right: 36%;
            top: 17%;
            font-size: 20px;
        }
    }
    .img-detail{
        width: 68px;
        height: 68px;
    }
    .row-div{
        clear: both;
        overflow: hidden;
        margin-bottom: 16px;
        &.long-label{
            span:first-child{
                width: 110px;
            }
        }
        &:last-child{
            margin-bottom: 0;
        }
    }
    .cow-div{
        float: left;
    }
    div {
        span{
            display: block;
            font-size: 12px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            float: left;
            &:first-child{
                text-align: right;
                min-width: 80px;
                margin-right: 6px;
            }
            &:last-child{
                border: 1px solid #efefef;
                width: 160px;
                padding: 0 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.long{
                    width: 230px;
                }
                &.short{
                    width: 100px;
                }
            }
        }
        img{
            width: 68px;
            height: 68px;
            float: left;
            border: 1px solid #efefef;
            margin: 0 10px;
        }
    }
</style>
<script>
    import commodityService from '@B2B/services/substatAdmin/commodityService.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    export default {
        mixins: [scrollMixins],
        data() {
            return {
                parentObj:{},
                formData:{},
                activeNames:['1','2','3','4','5'],
                enlargImg:'',
                imageShow:false
            }
        },
        mounted () {
            this.parentObj = this.distributionDealerObj
            this.getCommodityDetailBySKUId(this.parentObj.skuId)
        },
        methods:{
            imageClickEnlarge(src){
                this.imageShow = true
                this.enlargImg = src
            },
            closeImgClick(){
                this.imageShow = false
            },
            clickTopBtn(status){
                this.$root.bus.$emit('detailByExamine', status)
            },
            picsUrlTranslation(picsUrl){
                return picsUrl?picsUrl.split(','):[]
            },
            goodsSpecsTranslation(goodsSpecs){
              return goodsSpecs?JSON.parse(goodsSpecs):{}
            },
            async getCommodityDetailBySKUId(skuId){
                const _this = this
                try{
                    const data = await commodityService.getCommodityDetailBySKUId(skuId)
                    if (data.status == 200&&data.data.result!=undefined) {
                        _this.formData = data.data.result
                    }else{
                        console.log(1)
                    }
                }
                catch(e){
                    console.log(e)
                }
                this.editScroll()
            },
            closeTab(){
                this.$root.bus.$emit('commodityTabClose',this.parentObj)
            }
        },
        props:{
            distributionDealerObj: Object
        }
    }
</script>
