<template>
    <div>
        <!--对话框-->
        <Dialog  :title="resultInfo.title" :class="resultInfo.type" :visible.sync="goodsDialog" class="dialog-blue">
            <div v-if="resultInfo.type=='slogan'">
                <div class="inner">
                    <div ref="slogan">
                        <Input type="textarea" placeholder="请填写商品标语" v-model="slogan.text" @input="textAreaAccumulation"/>
                        <p class="const"><span>{{slogan.count}}</span><span>/45</span></p>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <Button size="small" type="cancel" @click="cancelClick">取 消</Button>
                    <Button size="small" type="confirm">确 定</Button>
                </span>
            </div>
            <div class="label" v-if="resultInfo.type=='label'">
                <div class="checkbox-div">
                    <Checkbox label="新品" v-model="label.tagNew"></Checkbox>
                    <Checkbox label="推荐" v-model="label.tagRecommend"></Checkbox>
                    <Checkbox label="热销" v-model="label.tagHot"></Checkbox>
                    <Checkbox label="清仓" v-model="label.tagClear"></Checkbox>
                </div>
                <div class="radio-div">
                    <el-radio-group v-model="label.status">
                        <el-radio :label="1">覆盖</el-radio>
                        <el-radio :label="2">新增</el-radio>
                    </el-radio-group>
                    <span>会替换之前数据</span>
                    <span>添加新标签,不修改之前数据</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <Button size="small" type="cancel" @click="cancelClick">取 消</Button>
                    <Button size="small" type="confirm">确 定</Button>
                </span>
            </div>
            <div class="isVIP" v-if="resultInfo.type=='isVIP'">
                <div class="checkbox-div">
                    <Checkbox label="APP端专享" v-model="isVIP.app"></Checkbox>
                    <Checkbox label="PC端专享" v-model="isVIP.pc"></Checkbox>
                </div>
                <span slot="footer" class="dialog-footer">
                    <Button size="small" type="cancel" @click="cancelClick">取 消</Button>
                    <Button size="small" type="confirm">确 定</Button>
                </span>
            </div>
        </Dialog>
    </div>
</template>
<style lang="scss">
    .slogan,.label{
        .el-dialog{
            height: 270px!important;
            width: 430px!important;
            .el-textarea{
                padding: 16px 14px;
                box-sizing: border-box;
                position: relative;
                .el-textarea__inner{
                    border-radius: 0px;
                    width: 400px;
                    height: 154px;
                    resize: none;
                    padding: 16px;
                    font-size: 12px;
                }
            }
            .el-checkbox{
                width:24%;
                margin-left: 0;
            }
            .el-radio-group{
                width: 100%;
                margin-bottom: 3px;
                .el-radio{
                    width: 50%;
                }
            }
        }
    }
    .isVIP{
        .el-dialog{
            height: 200px!important;
            width: 430px!important;
            .el-checkbox+.el-checkbox{
                margin-left: 45px;
            }
        }
    }
</style>
<style lang="scss" scoped>
    body{
        .el-input__inner,.el-input__inner:hover,.el-input__inner:focus{
            -webkit-appearance:none!important;
        }
        .slogan{
            .inner{
                position: relative;
                .const{
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                    span{
                        &:first-child{
                            color: #29a7e1;
                        }
                        &:last-child{
                            color: #a3a3a3;
                        }
                    }
                }
            }
        }
        .label{
            .checkbox-div{
                padding: 30px;
                margin: auto 16px;
                text-align: center;
                border-bottom: 1px solid #cfcfcf;
            }
            .radio-div{
                padding: 30px 45px;
                position: relative;
                span{
                    color: #a3a3a3;
                    &:first-of-type{
                        position: absolute;
                        margin-left: 33px;
                    }
                    &:last-of-type{
                        position: absolute;
                        margin-left: 203px;
                    }
                }
            }
        }
        .isVIP{
            text-align: center;
            line-height: 120px;
        }

    }
</style>
<script>
    export default{
        data(){
            return {
                goodsDialog:false,
                slogan:{
                    text:"",
                    count:0
                },
                label:{
                    tagNew:0,
                    tagRecommend:0,
                    tagHot:0,
                    tagClear:0,
                    status:1
                },
                isVIP:{
                    app:0,
                    pc:0
                }
            }
        },
        watch:{
        },
        methods: {
            textAreaAccumulation(){
                const len = this.solganText.length
                len>45?this.solganText = this.solganText.substring(len-1,len):this.slogan.count +=1
            },


            cancelClick(){
                switch (this.resultInfo.type){
                    case "slogan":{
                        this.slogan.text = ""
                        this.slogan.count = 0
                    }break
                }
                this.goodsDialog = false
            }
        },

        mounted () {
            const _this = this
            this.$root.bus.$on("buttonClick",(type)=>{
                this.goodsDialog = true
//                switch (type){
//                    case "slogan":{
//
//                    }
//                }
            })
        },
        props:{
            skuIds:Array,
            resultInfo:Object
        }
    }
</script>
