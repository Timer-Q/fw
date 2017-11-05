<template>
    <div>
        <div ref="scroll" class="goods-basic">
            <Form ref="form" :model="formData" label-width="120px">
                <Collapse v-model="activeNames" class="my">
                    <CollapseItem title="基本信息" ref="basicInfor" name="1">
                        <FormItem label="商品类目">
                            <Input style="width: 548px;" :disabled="true" v-model="formData.goodsCategoryName"></Input>
                        </FormItem>
                        <FormItem label="商品名称">
                            <Input style="width: 548px;" v-model="formData.goodsName"></Input>
                        </FormItem>
                        <FormItem label="商品标语">
                            <Input style="width: 548px;" v-model="formData.goodsSlogan"></Input>
                        </FormItem>
                        <span class="hr"></span>
                        <el-row>
                            <el-col :span="7">
                                <FormItem label="品牌">
                                    <Input :disabled="true"v-model="formData.brandName"></Input>
                                </FormItem>
                                <FormItem label="商品条码">
                                    <Input :disabled="true"v-model="formData.goodsBarcode"></Input>
                                </FormItem>
                            </el-col>
                            <el-col :span="7">
                                <FormItem label="货号">
                                    <Input :disabled="true"v-model="formData.productNumber"></Input>
                                </FormItem>
                                <FormItem label="企业类目">
                                    <Input :disabled="true"v-model="formData.enterpriseCategoryName"></Input>
                                </FormItem>
                            </el-col>
                            <el-col :span="7">
                                <FormItem label="规格">
                                    <Input :disabled="true"v-model="formData.specification"></Input>
                                </FormItem>
                            </el-col>
                        </el-row>
                    </CollapseItem>
                    <CollapseItem title="商品参数" ref="goodsParams" name="2">
                        <!--<el-row>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="产地">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="售卖方式">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="净含量">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="储藏方法">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="上产许可证编号">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="自定义参数1">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="自定义参数2">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                        <!--<FormItem label="自定义参数3">-->
                        <!--<Input :disabled="true"v-model=""></Input>-->
                        <!--</FormItem>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                    </CollapseItem>
                    <CollapseItem title="销售信息" ref="saleInfor" name="3">
                        <el-row>
                            <el-col :span="6">
                                <FormItem label="计价单位">
                                    <Input :disabled="true"v-model="formData.quantityUnit"></Input>
                                </FormItem>
                                <FormItem label="平台订货价">
                                    <Input v-model="formData.orderPrice"></Input>
                                    <span class="yuan">元</span>
                                </FormItem>
                            </el-col>
                            <el-col :span="6">
                                <FormItem label="整零转换">
                                    <Input :disabled="true"v-model="formData.integerZeroConvert"></Input>
                                </FormItem>
                                <FormItem label="二级单位订货价">
                                    <Input v-model="formData.secondOrderPrice"></Input>
                                    <span class="yuan">元</span>
                                </FormItem>
                            </el-col>
                            <el-col :span="6">
                                <FormItem label="起订量">
                                    <Input :disabled="true"v-model="formData.minimumOrderQuantity"></Input>
                                </FormItem>
                                <FormItem label="三级单位订货价">
                                    <Input v-model="formData.thirdOrderPrice"></Input>
                                    <span class="yuan">元</span>
                                </FormItem>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <FormItem label="不可订货单位">
                                    <Checkbox v-model="formData.measurementUnit">最小单位</Checkbox>
                                    <Checkbox v-model="formData.secondMeasurementUnit">二级单位</Checkbox>
                                    <Checkbox v-model="formData.thirdMeasurementUnit">三级单位</Checkbox>
                                </FormItem>
                            </el-col>
                            <el-col :span="8">
                                <FormItem label="商品标签">
                                    <Checkbox  :label="formData.tagNew">新品</Checkbox>
                                    <Checkbox  :label="formData.tagRecommend">推荐</Checkbox>
                                    <Checkbox  :label="formData.tagHot">热销</Checkbox>
                                    <Checkbox  :label="formData.tagClear">清仓</Checkbox>
                                </FormItem>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <FormItem label="是否平台专享">
                                    <Checkbox  v-model="formData.platformAPP">App端专享</Checkbox>
                                    <Checkbox  v-model="formData.platformPC">PC端专享</Checkbox>
                                </FormItem>
                            </el-col>
                            <el-col :span="8">
                                <FormItem label="上架下架" v-model="formData.onOffStatus">
                                    <Radio  label="1">上架</Radio>
                                    <Radio  label="0">下架</Radio>
                                </FormItem>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <FormItem label="自动下架日期">
                                    <DatePicker
                                        type="date"
                                        v-model="formData.autoOffTime"
                                    >
                                    </DatePicker>
                                </FormItem>
                            </el-col>
                        </el-row>
                    </CollapseItem>
                    <CollapseItem title="图片和详细说明" ref="detailInfor" name="4">
                        <div>
                            <!--<p>可通过拖拽调整图片顺序</p>-->
                            <div>
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :limit="11"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <!--<el-dialog v-model="dialogVisible" size="tiny">-->
                                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                                <!--</el-dialog>-->
                                <!--<img v-if="strTransformation" v-for="item in strTransformation" v-if="!!item" :src="item" alt="">-->
                                <!--<img :src="dialogImageUrl" alt="">-->
                            </div>

                            <p>最多可添加11张图片,建议图片尺寸800*800,大小<=2MB,支持JPGPNGJPEG</p>
                        </div>
                        <div>
                            <p>详细说明</p>
                            <!--description-->

                        </div>

                    </CollapseItem>
                </Collapse>
            </Form>
        </div>
        <div>
            <ul @click="shortcutMenuClick">
                <li>
                    <span class="arrow"></span>
                    <a href="javascript:;"  name="basicInfor">基本信息</a>
                </li>
                <li>
                    <span class="arrow"></span>
                    <a href="javascript:;"  name="goodsParams">商品参数</a>
                </li>
                <li>
                    <span class="arrow"></span>
                    <a href="javascript:;"  name="saleInfor">销售信息</a>
                </li>
                <li>
                    <span class="arrow"></span>
                    <a href="javascript:;"  name="detailInfor">图片和详细说明</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
    .goods-basic{
        .el-input__inner{
            height: 28px;
            border-radius: 0;
        }
        .el-upload{
            width: 68px;
            height: 68px;
            line-height: 68px;
            border:none;
            .el-icon-plus{
                font-family:"iconfont" !important;
                font-size: 82px;
                margin-top: -6px;
                color: #ccc;
                &:before{
                    content: '\e64f';
                }
            }
        }
        .el-upload-list{
            border-radius: 0;
            li{
                width: 68px;
                height: 68px;
                border:1px solid #CCCCCC;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .goods-basic{
        .yuan{
            position: absolute;
            right: 16px;
            top: 0;
        }
        .hr{
            display: block;
            height: 1px;
            border-top: 1px dashed #ccc;
            margin: 10px 0;
        }
        img{
            width: 68px;
            height: 68px;
            border:1px solid #CCCCCC;
            background: #ffffff;
        }
    }
    ul{
        position: absolute;
        top: 64px;
        right: -16px;
        width: 130px;
        background: rgba(0,0,0,.8);
        li{
            width: 100%;
            height: 36px;
            line-height: 36px;
            a{
                display: block;
                width: 100%;
                height:100%;
                text-align: center;
                color: #e3e3e3;
                font-size: 14px;
            }
            .arrow{
                display: none;
                position: absolute;
                margin-left: -16px;
                border: 8px solid transparent;
                border-right: 8px solid #3b9fd0;
                line-height: 35px;
                margin-top: 10px;
            }
            &:hover,&.active{
                background: #3b9fd0;
                .arrow{
                    display: block;
                }
            }
        }
    }
</style>
<script>
    import goodsReleaseService from '@B2B/services/goodsRelease/goodsReleaseService.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    export default{
        mixins: [scrollMixins],
        data(){
            return{
                formData:{},
                activeNames:['1','2','3','4'],
                dialogImageUrl:'',
                dialogVisible:false
            }
        },
        filters:{
//            strTransformation:function (val) {
//                return val.split(',')
//            }
        },
        methods:{

            async getBasicDetail(){
                const _this = this
                let data = ""

                try{
                    if(_this.state=="sku"){
                        data = await goodsReleaseService.getSKUDetailById(_this.id)
                    }else{
                        data = await goodsReleaseService.getSPUDetailById(_this.id)
                    }
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

            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },

            // 图片地址转换
            strTransformation(){
                return formData.picsUrl.split(',')
            },

            shortcutMenuClick(e){
                const target = e.target
                const liList = e.currentTarget.getElementsByTagName("li")
                for(let i=0;i<liList.length;i++){
                    liList[i].className = ''
                }
                target.parentElement.className = 'active'
                const selTop = this.$refs[target.name].$el.offsetTop
                this.$el.scrollTop = selTop-70
            }
        },
        mounted(){
            this.getBasicDetail()
        },
        props:{
            id:Number,
            state:String
        }
    }
</script>
