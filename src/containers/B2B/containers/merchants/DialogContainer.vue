<template>
    <div>
        <!--对话框-->
        <Dialog  :title="resultInfo.title" :visible.sync="merchantsDialog" :class="['merchants-add',selectDialogType?'dialog-blue':'dialog-default']">
            <div v-if="selectDialogType">
                <div class="outer">
                    <Form label-width="110px">
                        <FormItem label="登录手机号">
                            <Input type="number" v-model="form.phone"></Input>
                        </FormItem>
                        <FormItem  label="设置密码">
                            <Input v-model="form.password"></Input>
                        </FormItem>
                    </Form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <Button size="small" type="cancel" @click="merchantsDialog = false">取 消</Button>
                    <Button size="small" type="confirm" @click="updateConfirmBtnClick">确 定</Button>
                </span>
            </div>
            <div v-else>
                <div class="dialog-cont-one">
                    <p>{{resultInfo.msg}}</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <Button v-if="!!!resetSuccess" size="small" type="cancel" @click="merchantsDialog = false">取 消</Button>
                    <Button v-if="!!selectStatus&&!!!resetSuccess" size="small" type="confirm" @click="enableOrDisableConfirmBtnClick">确 定</Button>
                    <Button v-if="!!!resetSuccess" v-else size="small" type="confirm" @click="resetPasswordConfirmBtnClick">确 定</Button>
                    <Button v-if="!!resetSuccess" size="small" type="cancel" @click="resetSuccessBtn">取 消</Button>
                    <Button  v-if="!!resetSuccess" v-else size="small" type="confirm" @click="resetSuccessBtn">确 定</Button>
                </span>
            </div>
        </Dialog>
    </div>
</template>
<style lang="scss" scoped>
    body{
        .el-input__inner,.el-input__inner:hover,.el-input__inner:focus{
            -webkit-appearance:none!important;
        }
        .el-dialog{
            width: 455px!important;
            height: 288px!important;
        }
    }
</style>
<script>
    import merchantsService from '@B2B/services/substatAdmin/merchantsService.js'
    export default{
        data(){
            return {
                // 对话框是否显示
                merchantsDialog: false,
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                // 弹框开源 1为启动停用，0为修改密码
                selectStatus:1,
                // 控制重置密码成功后的弹出框确定按钮
                resetSuccess:false,
                selectDialogType:0,
                userId:'',
                merchantId:'',
                form:{},
                enableOrDisableParam:{}
            }
        },
        watch:{
            merchantsDialog(val){
                if(!val){
                    this.form = {}
                }
            }
        },
        methods: {

            // 重置密码成功的弹出框的按钮事件
            resetSuccessBtn(){
                this.resetSuccess = false
                this.merchantsDialog = false
            },
            // 启用停用确定
            async enableOrDisableConfirmBtnClick(){
                try {
                    const data = await merchantsService.updateEnableOrDisable(this.enableOrDisableParam)
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.$customMessage("操作成功", "success")
                        this.$root.bus.$emit('refreshMerchantsList')
                    } else {
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败", "error")
                    }
                    this.merchantsDialog = false
                }
                catch (e) {
                    this.$customMessage("操作失败", "error")
                    console.log(e)
                }
            },

            // 重置密码
            async resetPasswordConfirmBtnClick(){
                try {
                    const data = await merchantsService.passReset(this.userId)
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.resultInfo.title = "操作完成"
                        this.resultInfo.msg = `初始化密码为：${data.data.result}`
                        this.merchantsDialog = true
                        this.resetSuccess = true
                        this.$root.bus.$emit('refreshMerchantsList')
                        return
                    } else {
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败", "error")
                    }
                    this.merchantsDialog = false
                }
                catch (e) {
                    this.$customMessage("操作失败", "error")
                    console.log(e)
                }
            },

            // 添加登录手机
            async updateConfirmBtnClick(){
                if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.phone)){
                    this.$customMessage("请输入正确格式的手机号","warning")
                    return
                }
                let message = {
                    id:this.userId,
                    merchantId:this.merchantId,
                    loginTel:this.form.phone,
                    loginPass:this.form.password
                }
                try {
                    const data = await merchantsService.addUser(message)
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.$customMessage("操作成功", "success")
                        this.$root.bus.$emit('refreshMerchantsList')
                    } else {
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败", "error")
                    }
                    this.merchantsDialog = false
                }
                catch (e) {
                    this.$customMessage("操作失败", "error")
                    console.log(e)
                }
            }
        },

        mounted () {
            const _this = this

            this.$root.bus.$on('EnableOrDisableByMerchants', (data)=>{
                _this.enableOrDisableParam = data
                _this.merchantIds = data.merchantIds
                _this.status = data.status
                _this.selectStatus = 1
                _this.selectDialogType = 0
                _this.resultInfo.title = data.status?'启用确认提示':'停用确认提示'
                _this.resultInfo.msg = data.status?'确定启用该用户？':'确定停用该用户？'
                _this.merchantsDialog = true
            })

            this.$root.bus.$on('resetPasswordByMerchants', (data)=>{
                _this.userId = data.userId
                _this.selectStatus = 0
                _this.selectDialogType = 0
                _this.resultInfo.title = '重置密码'
                _this.resultInfo.msg = '确定重置所选用户的登录密码？'
                _this.merchantsDialog = true
            })

            this.$root.bus.$on('addLoginPhoneByMerchants', (data)=>{
                _this.selectDialogType =1
                _this.userId = data.userId
                _this.merchantId = data.merchantId
                _this.resultInfo.title = `${data.merchantName}-添加登录手机`
                _this.merchantsDialog = true
            })
        }
    }
</script>
