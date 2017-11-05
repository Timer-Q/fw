<template>
    <div>
        <!--对话框-->
        <Dialog class="dialog-default"  title="商品审核 " :visible.sync="dialogVisible">
            <div class="dialog-cont-one">
                <p>确定通过审核？</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <Button size="small" type="cancel" @click="dialogVisible = false">取 消</Button>
            <Button size="small" type="confirm" @click="confirmBtnClick">确 定</Button>
            </span>
        </Dialog>
        <Dialog  class="dialog-blue"  title="商品审核不通过" :visible.sync="dialog2Visible">
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
                <Button size="small" type="cancel" @click="dialog2Visible = false">取 消</Button>
                <Button size="small" type="confirm" @click="confirmBtnClick">确 定</Button>
            </span>
        </Dialog>
    </div>
</template>
<script>
    import commodityService from '@B2B/services/substatAdmin/commodityService.js'
    import b2bPublicService from '@B2B/services/substatAdmin/b2bPublicService.js'
    export default{
        data(){
            return {
                // 对话框是否显示
                dialogVisible: false,
                dialog2Visible:false,
                form:{},
                radioList:[],
                selRadio:'',

                skuIds:'',
                stationId:'',
                status:''
            }
        },
        methods:{
            // 列表上部按钮
            clickTopBtn(){
                this.dialogShow()
            },

            // 审核确定按钮
            confirmBtnClick(){
                this.examineUpdateByStatus()
                this.dialogVisible = false
                this.dialog2Visible = false
            },

            // 修改审核
            async examineUpdateByStatus(status){
                const _this = this
                let auditStatusReason = ''
                if(!this.status){
                    auditStatusReason = this.selRadio
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
                }
                const message = {
                    skuIds: this.skuIds,
                    status:this.status,
                    stationId:this.stationId,
                    auditStatusReason:auditStatusReason
                }
                try {
                    const data = await commodityService.examineUpdateByStatus(message)
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.refreshCommodityList()
                        this.$customMessage("操作成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败","error")
                    }
                }
                catch (e) {
                    this.$customMessage("操作失败","error")
                    console.log(e)
                }
            },

            // 单行审核
            dialogShow(){
                if(this.status==1){
                    this.dialogVisible = true
                }else{
                    this.dialog2Visible = true
                    this.selRadio = ""
                    this.form = {}
                }
            },

            async getListB2bSyscodesByPOJO(){
                try {
                    const data = await b2bPublicService.getListB2bSyscodesByPOJO()
                    if (data.status == 200&&data.data.result!=undefined) {
                        this.radioList = data.data.result
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("请求失败","error")
                    }
                }
                catch (e) {
                    this.$customMessage("请求失败","error")
                    console.log(e)
                }
            },

            assignment(status,skuIds,stationId){
                this.skuIds = skuIds
                this.stationId = stationId
                this.status = status
            }

        },
        mounted () {
            const _this = this

            this.getListB2bSyscodesByPOJO()

            this.$root.bus.$on('clickTopBtn', (status,skuIds,stationId)=>{
                _this.assignment(status,skuIds,stationId)
                _this.clickTopBtn()
            })

            this.$root.bus.$on('dialogShow', (status,skuId,stationId)=>{
                _this.assignment(status,[skuId],stationId)
                _this.dialogShow()
            })
        }
    }
</script>
