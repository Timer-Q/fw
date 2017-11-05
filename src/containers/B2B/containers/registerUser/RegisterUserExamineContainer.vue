<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" :disabled="isUse" @click="examinePassByUse">关联并审核通过</Button>
            <Button class="public-function-btn"  @click="examinePass('newUser')">新用户并审核通过</Button>
            <Button class="public-function-btn" @click="dialogVisible=true">审核不通过</Button>
        </div>
        <div class="content" ref="scroll">
            <div class="box-card user-message">
                <div class="header">
                    <span>用户注册信息</span>
                </div>
                <div >
                    <div class="font-message">
                        <p class="no-mate">
                            <span>用户名称 ：</span>
                            <span>{{newMerchantData.merchantName}}</span>
                        </p>
                        <p>
                            <span>地址 ：</span>
                            <span>{{newMerchantData.detailAddress}}</span>
                        </p>
                        <p>
                            <span>联系人 ：</span>
                            <span>{{newMerchantData.primaryName}}</span>
                        </p>
                        <p>
                            <span>手机号 ：</span>
                            <span>{{newMerchantData.primaryPhone}}</span>
                        </p>
                        <p>
                            <span>商户类型 ：</span>
                            <span>{{newMerchantData.merchantType}}</span>
                        </p>
                        <p>
                            <span>经营类型 ：</span>
                            <span>{{newMerchantData.manageType}}</span>
                        </p>
                        <p>
                            <span>营业执照号码 ：</span>
                            <span>{{newMerchantData.businessLicenseNo}}</span>
                        </p>
                        <p>
                            <span>姓名 ：</span>
                            <span>{{newMerchantData.idCardName}}</span>
                        </p>
                        <p>
                            <span>身份证号码 ：</span>
                            <span>{{newMerchantData.idCardNo}}</span>
                        </p>
                    </div>
                    <div class="image-message">
                        <div>
                            <p>证件照片</p>
                            <img :src="newMerchantData.businessLicenseUrl"></img>
                        </div>
                        <div>
                            <p>门头照片</p>
                            <img :src="newMerchantData.shopFrontPicurl"></img>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div class="box-card merchant-message">
                <div class="header">
                    <span>系统匹配商户信息</span>
                </div>
                <div v-if="matchMerchants&&matchMerchants.length">
                    <div class="cont f_l" v-if="matchMerchants&&matchMerchants.length>1">
                        <ul>
                            <li v-for="item in matchMerchants" @click="selectMate(item)" :class="{select:item.id==selectSystemMate.id}"><p><span>{{item.merchantName}}</span><i v-show="item.id==selectSystemMate.id" class="iconfont icon-gouxuan"></i></p></li>
                        </ul>
                    </div>
                    <div class="old-message f_l font-message">
                        <p class="select-name">{{selectSystemMate.merchantName}}</p>
                        <p>
                            <span>用户名称 ：</span>
                            <span>{{selectSystemMate.merchantName}}</span>
                        </p>
                        <p>
                            <span>地址 ：</span>
                            <span>{{selectSystemMate.detailAddress}}</span>
                        </p>
                        <p>
                            <span>联系人 ：</span>
                            <span>{{selectSystemMate.primaryName}}</span>
                        </p>
                        <p>
                            <span>手机号 ：</span>
                            <span>{{selectSystemMate.primaryPhone}}</span>
                        </p>
                        <p>
                            <span>商户类型 ：</span>
                            <span>{{selectSystemMate.merchantType}}</span>
                        </p>
                        <p>
                            <span>经营类型 ：</span>
                            <span>{{selectSystemMate.manageType}}</span>
                        </p>
                        <p>
                            <span>营业执照号码 ：</span>
                            <span>{{selectSystemMate.businessLicenseNo}}</span>
                        </p>
                        <p>
                            <span>姓名 ：</span>
                            <span>{{selectSystemMate.idCardName}}</span>
                        </p>
                        <p>
                            <span>身份证号码 ：</span>
                            <span>{{selectSystemMate.idCardNo}}</span>
                        </p>
                    </div>
                </div>
                <div v-else class="null">
                    <div>
                        <i class="iconfont icon-quexing"></i>
                        <p>无匹配信息</p>
                    </div>
                </div>
            </div>
        </div>

        <!--对话框-->
        <Dialog  class="dialog-blue"  title="审核不通过" :visible.sync="dialogVisible">
            <div class="outer">
                <Form label-width="110px">
                    <FormItem label="理由">
                        <RadioGroup v-model="selRadio">
                            <Radio v-for="item in radioList" :label="item.code" :key="item.code">{{item.value}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem style="margin-left: 20px;" v-show="selRadio==6">
                        <Input type="textarea" v-model="form.desc"></Input>
                    </FormItem>
                </Form>
            </div>
            <span slot="footer" class="dialog-footer">
                <Button size="small" type="cancel" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="confirm" @click="confirmBtnClick">确 定</Button>
            </span>
        </Dialog>
    </div>
</template>
<style lang="scss" scoped>
    .select-name{
        color: #78c4e3!important;
    }
    .no-mate span{
        color: #acacac;
    }
    .box-card{
        border:1px solid #f5f5f5;
        margin-right: 16px;
        *{
            font-size: 12px;
            color: #868686;
        }
        .font-message{
            line-height: 25px;
            margin: 10px 0;
            span:first-child{
                width: 100px;
                display: inline-block;
                text-align: right;
                margin-right: 3px;
            }
        }
        .header{
            height: 32px;
            line-height: 32px;
            background: #f5f5f5;
            span{
                color: #78c4e3;
                padding-left: 16px;
                font-size: 14px;
            }
        }
        &.user-message{
            width: 390px;
            float: left;
            .image-message{
                margin: 10px 16px;
                border-top: 1px solid #F5F5F5;
                padding-top: 10px;
                img{
                    width: 200px;
                    height: 154px;
                    margin: 10px 0 16px 16px;
                }
            }

        }
        &.merchant-message{
            float: left;
            .cont{
                width: 304px;
                height: 100%;
                border-right:1px solid #F5F5F5;
                li{
                    line-height: 40px;
                    height: 40px;
                    margin: 0 20px 0 10px;
                    p{
                        border-top: 1px solid #f5f5f5;
                        position: relative;
                        i{
                            position: absolute;
                            right: 0;
                        }
                    }

                    &.select{
                        span,i{
                            color: #78c4e3;
                        }
                    }
                }
            }
            .old-message{
                width: 387px;
                margin: 16px;
            }
            .null{
                width: 387px;
                height: 500px;
                position: relative;
                div{
                    text-align: center;
                    margin-top: 60px;
                    i{
                        font-size: 50px;
                    }
                }
            }
        }
    }

</style>
<script>
    import registerUserService from '@B2B/services/substatAdmin/registerUserService.js'
    import b2bPublicService from '@B2B/services/substatAdmin/b2bPublicService.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    export default{
        mixins: [scrollMixins],
        data(){
            return {
                parentObj: {},
                // 用户注册信息
                newMerchantData: {},
                // 系统匹配信息
                matchMerchants:[],
                // 系统匹配信息选中id
                selectSystemMate: {},
                isUse:false,
                //-----------弹出框需要的变量------------------------
                // 弹出框状态
                dialogVisible: false,
                // 选中的单选值
                selRadio: '',
                // 数据字典返回的审核不通过集合
                radioList: [],
                form: {},
                //-------------------------------------
            }
        },
        watch:{
            // 弹出框关闭初始化相关变量
            dialogVisible(val){
                if(!val){
                    this.selRadio = ''
                    this.form = {}
                }
            }
        },
        methods: {
            // 点击系统匹配的一条记录
            selectMate(item){
                this.selectSystemMate = item
            },
            // 获取详情
            async getMerchantAuditDetailById(id){
                const _this = this
                try {
                    const data = await registerUserService.getMerchantAuditDetailById(id)
                    if (data.status == 200) {
                        const result = data.data.result
                        if (result) {
                            _this.newMerchantData = result.newlyMerchant
                            _this.matchMerchants = result.matchMerchants
                            if(_this.matchMerchants&&_this.matchMerchants.length){
                                _this.isUse = false
                                _this.selectMate(_this.matchMerchants[0])
                            }else{
                                _this.isUse = true
                            }
                        }
                    } else {
                        console.log(1)
                    }
                }
                catch (e) {
                    console.log(e)
                }
                this.editScroll()
            },

            examinePassByUse(){
                if(!this.isUse){
                    this.examinePass()
                }
            },

            // 获取审核不通过的数据字典
            async getPOJOByExamine(){
                const _this = this
                try {
                    const data = await b2bPublicService.getListB2bSyscodesByPOJO(this.$store.getters.examineType)
                    if (data.status == 200) {
                        _this.radioList = data.data.result
                        console.log(_this.newMerchantData)
                    } else {
                        console.log(1)
                    }
                }
                catch (e) {
                    console.log(e)
                }
            },

            // 审核通过
            examinePass(status){
                let message = {}
                message = this.newMerchantData
                if(status!='newUser'){
                    message.mercantId = this.selectSystemMate.mercantId
                }
                this.updataMerchantAudit(message)
            },

            // 审核不通过
            confirmBtnClick(){
                const _this = this
                let auditStatusReason = this.selRadio
                if(!auditStatusReason){
                    this.$customMessage('请选择一条理由','warning')
                    return
                }
                if(auditStatusReason=='6'){
                    auditStatusReason = this.form.desc
                }else{
                    let vlaList = this.radioList.filter((item)=>{
                        return item.code==_this.selRadio
                    })
                    auditStatusReason = vlaList[0].value
                }
                const message = {
                    id:this.newMerchantData.id,
                    auditStatus:2,
                    auditStatusReason:auditStatusReason
                }
                this.updataMerchantAudit(message)
            },

            async updataMerchantAudit(message){
                try{
                    const data = await registerUserService.merchantAudit(message)
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.$customMessage("操作成功","success")
                    }else{
                        console.log(data.data.status.statusReason)
                        this.$customMessage("操作失败","error")
                    }
                    this.dialogVisible = false
                }catch(e){
                    console.log(e)
                    this.$customMessage("操作失败-c","error")
                }
            },

        },
        mounted () {
            this.parentObj = this.$attrs.registerUserObj
            this.getMerchantAuditDetailById(this.parentObj.id)
            this.getPOJOByExamine()
        }
    }
</script>
