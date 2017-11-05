<template>
    <div class="newCommonTerm">
        <!--标签功能操作栏  start-->
        <div class="modal-div clearfix">
            <div>
                <!-- 详情页按钮 start -->
                <div class="btnGroup btnGroup1" v-if="isDetail">
                    <a href="javascript:;" class="add-btn" @click="jumpModify">修改</a>
                </div>
                <div class="btnGroup btnGroup1" v-if="isDetail">
                    <a href="javascript:;" class="add-btn" @click="saveContractTermLibrary(0)">审核</a>
                </div>
                <div class="btnGroup btnGroup1" v-if="isDetail">
                    <a href="javascript:;" class="add-btn">驳回</a>
                </div>
                <div class="btnGroup btnGroup1" v-if="isDetail">
                    <a href="javascript:;" class="add-btn">取消审核</a>
                </div>
                <!-- 详情页按钮 end -->

                <!-- 修改页按钮 start -->
                <div class="btnGroup btnGroup1" v-if="!isDetail">
                    <a href="javascript:;" class="add-btn">保存</a>
                </div>
                <div class="btnGroup btnGroup1" v-if="!isDetail">
                    <a href="javascript:;" class="add-btn">替代条款</a>
                </div>
                <div class="btnGroup btnGroup1" v-if="!isDetail">
                    <a href="javascript:;" class="add-btn" @click="returnDetail">取消</a>
                </div>
                <!-- 修改页按钮 end -->
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div id="main">
            <div class="mainContainer clearfix">
                <!--右侧新增  start-->
                <div class="newContent">
                    <div class="newContentBoxMini">
                        <!--<ul class="input-group" v-for="option in inputData">-->
                        <!--<li class="input-single">-->
                        <!--<span class="f_l">{{option.itemName}}</span>-->
                        <!--<i class="star-icon" v-if="">*</i>-->
                        <!--<el-input  placeholder="" v-model="termCode" :disabled="true"></el-input>-->
                        <!--<el-select @change="businessTypeChange" v-model="businessType" placeholder="请选择">-->
                        <!--<el-option-->
                        <!--v-for="item in businessTypeOptions"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<i class="newArrow-country"></i>-->
                        <!--</li>-->
                        <!--</ul>-->
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">条款编码</span>
                                <i class="star-icon">*</i>
                                <el-input placeholder="系统自动编码" v-model="termCode" :disabled="true"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">业务类型</span>
                                <i class="star-icon">*</i>
                                <el-select v-model="businessType" placeholder="请选择">
                                    <el-option
                                        v-for="item in businessTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">到期日方式</span>
                                <el-select @change="dueDateModeChange" v-model="dueDateMode" placeholder="请选择">
                                    <el-option
                                        v-for="item in dueDateModeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">收付款类型</span>
                                <el-select @change="paymentTypeChange" v-model="paymentType" placeholder="请选择">
                                    <el-option
                                        v-for="item in paymentTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">条款名称</span>
                                <i class="star-icon">*</i>
                                <el-input placeholder="请输入" v-model="termName"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">服务项</span>
                                <el-select @change="costItemChange" v-model="costItem" placeholder="请选择">
                                    <el-option
                                        v-for="item in costItemOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">到期起算日</span>
                                <el-select v-model="dueDate" @change="dueDateChange" placeholder="请选择">
                                    <el-option
                                        v-for="item in dueDateOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">所属组织</span>
                                <el-input placeholder="请输入" v-model="org" :disabled="true"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">收/付</span>
                                <el-select v-model="receiveOrPay" @change="receiveOrPayChange" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in receiveOrPayOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">账期周期</span>
                                <el-select v-model="paymentCycle" @change="paymentCycleChange" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in paymentCycleOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">条款分类</span>
                                <el-select v-model="termClassify" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in termClassifyOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">分几期</span>
                                <el-input placeholder="请输入" @change="stageProceedsChange" type="number" min="1" v-model="stageProceeds"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">结算方式</span>
                                <el-select @change="settleModeChange" v-model="settleMode" placeholder="请选择">
                                    <el-option
                                        v-for="item in settleModeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                    </div>
                    <div class="l-note">
                        <span class="l-notetext">备注</span>
                        <div class="l-textarea">
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder=""
                                v-model="comment">
                            </el-input>
                        </div>
                    </div>
                    <div class="add-term">
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="条款" name="first">
                                <div class="addTermContent clearfix">
                                    <div class="btnGroup btnGroup1" v-if="!isDetail">
                                        <a href="javascript:;" class="add-btn">插入款项</a>
                                    </div>
                                </div>
                                <div class="editor">
                                    <el-input
                                        type="textarea"
                                        :rows="10"
                                        placeholder=""
                                        v-model="editor">
                                    </el-input>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="已添加的款项" name="second">
                                <div class="table-wrap">
                                    <el-table :data="tableData" border style="width: 100%">
                                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                                        <el-table-column prop="itemName" label="款项名称" width=""></el-table-column>
                                        <el-table-column prop="fixed" label="是否固定值"></el-table-column>
                                        <el-table-column prop="fixedValue" label="固定值名称" width="180"></el-table-column>
                                        <el-table-column prop="display" label="是否显示在正文中" width="180"></el-table-column>
                                        <el-table-column prop="necessaryMode" label="必输性"></el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <!--右侧新增  end-->
            </div>
        </div>
        <!--主体内容  end-->
    </div>
</template>
<script type="es6">
    import serverMixin from '@Crm/mixin/server.js'
    import $CS from '@Crm/services/termLibrary/termGlobalService.js'
    export default {
        mixins: [serverMixin],
        props: {
            removeTab: {
                type: Function,
                require: true
            },
            termData: {
                type: Object,
                require: true
            },
            modifyTabName: {
                type: Function,
                require: true
            }
        },
        data () {
            return {
                isDetail: true,//是否是详情页
                orgId: 1,
                tableData: [],
                content: '',
                editor: '富文本编辑器',
                activeName: 'first',
                specialTermCategory: 3,//特殊条款分类
                updateUser: 10001,//修改人
                paymentType: '',//收付款类型
                settleMode: '',//结算方式
                stageProceeds: '',//分几期
                paymentCycle: '',//账期周期
                receiveOrPay: '',//收/付
                comment: '',//备注
                org: '',//所属组织
                businessType: '',//业务类型
                termName: '',//条款名称
                termCode: '',//条款编码
                dueDateMode: '',//到期日方式
                termClassify: '',//条款分类
                costItem: '',//服务项
                dueDate: '',//到期起算日
                paymentCycleOptions: [],//账期周期选项
                receiveOrPayOptions: [{//收/付选项
                    value: 1,
                    label: '收'
                },{
                    value: 2,
                    label: '付'
                }],
                dueDateOptions: [],//到期起算日选项
                costItemOptions: [],//服务项选项
                dueDateModeOptions: [],//到期日方式选项
                termClassifyOptions: [],//条款分类选项
                businessTypeOptions: [],//业务类型选项
                settleModeOptions: [],//结算方式选项
                paymentTypeOptions: [],//收付款类型选项
                saveData: [],//保存的数据

            }
        },
        methods: {
            returnDetail(){//返回详情页
                this.isDetail = true
                this.modifyTabName(`${this.termCode}-详情`)
            },
            jumpModify(){//跳转修改页
                this.isDetail = false
                this.modifyTabName(`${this.termCode}-修改`)
            },
            async updateContractTermLibrary(){//修改条款
                if(this.termName === ''){
                    this.$message('条款名称不能为空！')
                    return
                }
                if(this.businessType === ''){
                    this.$message('业务类型不能为空！')
                    return
                }
                if(this.costItem === ''){
                    this.$message('服务项不能为空！')
                    return
                }
                if(this.receiveOrPay === ''){
                    this.$message('收/付不能为空！')
                    return
                }
                if(this.stageProceeds === ''){
                    this.$message('分几期不能为空！')
                    return
                }
                if(this.dueDateMode === ''){
                    this.$message('到期日方式不能为空！')
                    return
                }
                if(this.dueDate === ''){
                    this.$message('到期起算日不能为空！')
                    return
                }
                let data = {
                    termName: this.termName,
                    id: this.termData.id,
                    orgId: this.org === '全局级' ? 1 : 2,
                    termCategory: this.termClassify,
                    businessCategory: this.businessType,
                    comment: this.comment,
                    updateUser: this.updateUser,
                    termText: this.editor,
                    updateTermItemRelIdList: this.saveData
                }
                console.log(data)
                var res = await $CS.saveContractTermLibrary(data)
                console.log(res)
                if (res.data.status.statusCode === 0) {
                    this.$message('修改成功！')
                    setTimeout(() => {
                        this.removeTab('crm_termGlobalMain_detailContractPaymentTerm')
                    }, 3000)
                }else {
                    this.$message('修改失败！' + res.data.status.statusCode)
                }
            },
            async getSpecialItemPaymentTerm(){
                let data = this.createData()
                console.log(data)
                var res = await $CS.getSpecialItem(`getSpecialItemPaymentTerm`, data)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    this.saveData = JSON.parse(JSON.stringify(res.data.result))
                    this.saveData.forEach(item => {
                        item.specialTermCategory = this.specialTermCategory
                    })
                    console.log(this.saveData)
                    this.tableData = res.data.result
                }
            },
            paymentTypeChange(){//结算方式
                this.getSpecialItemPaymentTerm()
            },
            settleModeChange(){//收付款类型
                this.getSpecialItemPaymentTerm()
            },
            receiveOrPayChange(){//收/付
                this.getSpecialItemPaymentTerm()
            },
            costItemChange(){//服务项
                this.getSpecialItemPaymentTerm()
            },
            dueDateModeChange(){//到期日方式
                this.getSpecialItemPaymentTerm()
            },
            dueDateChange(){//到期起算日
                this.getSpecialItemPaymentTerm()
            },
            stageProceedsChange(){//分几期
                this.getSpecialItemPaymentTerm()
            },
            paymentCycleChange(){//账期周期
                this.getSpecialItemPaymentTerm()
            },
            handleClick(tab, event) {
                console.log(tab, event)
            },
            async getInitEnums(params) {
                var res = await $CS.getInitEnums(params)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    switch (params){
                        case `getAllOrg?orgId=${this.userOverallOrgId}`://初始化所属组织
                            this.org = res.data.result[0].orgName
                            break
                        case 'getBusiTypeList'://初始化业务类型选项
                            this.businessTypeOptions = this.dataHandle(res.data.result)
                            break
                        case `getCostItemParams/${this.orgId}`://初始化服务项选项
                            this.costItemOptions = this.dataHandle(res.data.result)
                            break
                        case 'getExpirationDateMode'://初始化到期日方式选项
                            this.dueDateModeOptions = this.dataHandle(res.data.result)
                            break
                        case 'getLiZhangCountParams'://初始化到期起算日选项
                            this.dueDateOptions = this.dataHandle(res.data.result)
                            break
                        case 'getPaymentCycleParams'://初始化账期周期选项
                            this.paymentCycleOptions = this.dataHandle(res.data.result)
                    }
                }else {
                    this.$message('初始化数据失败！')
                }
            },
            dataHandle(arr){//数据处理
                let dataArr = []
                arr.forEach( item => {
                    let obj = {
                        value: item.id,
                        label: item.name
                    }
                    dataArr.push(obj)
                })
                return dataArr
            },
            /*{
                 "SETTLE_MODE":"2",
                 "PAYMENT_CATEGORY":"1",
                 "RECEIPT_PAY":"1",
                 "SERVICE_ITEM":"1",
                 "INSTALL":"3",
                 "EXPIRE_DAY_MODE":"1",
                 "EXPIRE_START_DAY":"2",
                 "BILL_CYCLE":"3"
                }*/
            createData(){//实时创建请求数据
                let data = {}
                if(this.settleMode !== ''){//结算方式
                    data.SETTLE_MODE = this.settleMode.toString()
                }
                if(this.paymentType !== ''){//收付款类型
                    data.PAYMENT_CATEGORY = this.paymentType.toString()
                }
                if(this.receiveOrPay !== ''){//收/付
                    data.RECEIPT_PAY = this.receiveOrPay.toString()
                }
                if(this.costItem !== ''){//服务项
                    data.SERVICE_ITEM = this.costItem.toString()
                }
                if(this.stageProceeds !== ''){//分几期
                    data.INSTALL = this.stageProceeds.toString()
                }
                if(this.dueDateMode !== ''){//到期日方式
                    data.EXPIRE_DAY_MODE = this.dueDateMode.toString()
                }
                if(this.dueDate !== ''){//到期起算日
                    data.EXPIRE_START_DAY = this.dueDate.toString()
                }
                if(this.paymentCycle !== ''){//账期周期
                    data.BILL_CYCLE = this.paymentCycle.toString()
                }
                return data
            }
        },
        mounted(){
            this.getInitEnums(`getAllOrg?orgId=${this.userOverallOrgId}`)
            this.getInitEnums('getBusiTypeList')
            this.getInitEnums(`getCostItemParams/${this.orgId}`)
            this.getInitEnums('getExpirationDateMode')
            this.getInitEnums('getLiZhangCountParams')
            this.getInitEnums('getPaymentCycleParams')
            console.log(this.termData, '收付款条款详情')
            this.termCode = this.termData.termCode
            this.termName = this.termData.termName
            this.termClassify = this.termData.termCategory
            this.businessType = this.termData.businessCategory
            this.comment = this.termData.comment
            this.editor = this.termData.termText
            if(this.termData.specialItemDOMap.SETTLE_MODE){//结算方式
                this.settleMode = parseInt(this.termData.specialItemDOMap.SETTLE_MODE)
            }
            if(this.termData.specialItemDOMap.PAYMENT_CATEGORY){//收付款类型
                this.paymentType = parseInt(this.termData.specialItemDOMap.PAYMENT_CATEGORY)
            }
            if(this.termData.specialItemDOMap.RECEIPT_PAY){//收/付
                this.receiveOrPay = parseInt(this.termData.specialItemDOMap.RECEIPT_PAY)
            }
            if(this.termData.specialItemDOMap.SERVICE_ITEM){//服务项
                this.costItem = parseInt(this.termData.specialItemDOMap.SERVICE_ITEM)
            }
            if(this.termData.specialItemDOMap.INSTALL){//分几期
                this.stageProceeds = parseInt(this.termData.specialItemDOMap.INSTALL)
            }
            if(this.termData.specialItemDOMap.EXPIRE_DAY_MODE){//到期日方式
                this.dueDateMode = parseInt(this.termData.specialItemDOMap.EXPIRE_DAY_MODE)
            }
            if(this.termData.specialItemDOMap.EXPIRE_START_DAY){//到期起算日
                this.dueDate = parseInt(this.termData.specialItemDOMap.EXPIRE_START_DAY)
            }
            if(this.termData.specialItemDOMap.BILL_CYCLE){//账期周期
                this.paymentCycle = parseInt(this.termData.specialItemDOMap.BILL_CYCLE)
            }
        }
    }
</script>

<style scoped lang="scss">
    .newContent{
        margin:0;
        padding:0 16px;
        .newContentBoxMini{
            .el-select{
                left:0;
            }
            .groupL .void{
                padding-bottom:0;
                padding-top:44px;
            }
            .groupL-p{
                position: relative;
                .newArrow-country{
                    position:absolute;
                    right:20px;
                    top:12px;
                }
            }
            .groupL{
                width:310px;
                input{
                    padding-left:16px;
                }
            }
            .star-icon {
                position: absolute;
                z-index: 1;
                margin-top: 3px;
                margin-left: 5px;
            }
        }
        .l-note {
            margin: 0 0 20px 62px;
            .l-textarea{
                margin-left: 42px;
                margin-top: -16px;
                width: 89%;
            }
        }
        .add-term{
            border-top:2px solid #eee;
            margin-top:5px;
            padding-top:16px;
            .addTermContent{
                padding: 0 16px;

            }
            .editor{
                padding: 15px;
            }
            .table-wrap{
                padding: 15px;
                .el-table{
                    width: 80% !important;
                }

            }
        }
    }

</style>

