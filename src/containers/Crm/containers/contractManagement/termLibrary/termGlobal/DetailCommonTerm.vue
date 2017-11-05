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
                    <a href="javascript:;" class="add-btn" @click="updateContractTermLibrary">保存</a>
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
                    <div class="newContentBox ">
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">条款编码</span>
                                <el-input placeholder="系统自动编码" v-model="termCode" :disabled="true"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">条款分类</span>
                                <el-select v-model="termClassify" placeholder="请选择" :disabled="isDetail">
                                    <el-option
                                        v-for="item in termClassifyOptions"
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
                                <el-input placeholder="请输入" v-model="termName" :disabled="isDetail"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">业务类型</span>
                                <i class="star-icon">*</i>
                                <el-select v-model="businessType" placeholder="请选择" :disabled="isDetail">
                                    <el-option
                                        v-for="item in businessTypeOptions"
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
                                <i class="star-icon">*</i>
                                <el-input placeholder="" v-model="org" :disabled="true"></el-input>
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
                                v-model="comment"
                                :disabled="isDetail">
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
                                        v-model="editor"
                                        :disabled="isDetail">
                                    </el-input>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="已添加的款项" name="second">
                                <div class="table-wrap">
                                    <el-table :data="tableData" border style="width: 100%">
                                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                                        <el-table-column prop="itemName" label="款项名称" width=""></el-table-column>
                                        <el-table-column prop="isFixedValue" label="是否固定值"></el-table-column>
                                        <el-table-column prop="fixedValueName" label="固定值名称"></el-table-column>
                                        <el-table-column prop="isShowInText" label="是否显示在正文中"></el-table-column>
                                        <el-table-column prop="mustInput" label="必输性"></el-table-column>
                                        <el-table-column prop="isFixedValue" label="款项来源"></el-table-column>
                                        <el-table-column prop="isFixedValue" label="操作"></el-table-column>
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
                tableData: [],
                editor: '富文本编辑器',
                content: '',
                activeName: 'first',
                updateUser: 10001,//修改人
                comment: '',//备注
                org: '',//所属组织
                businessType: '',//业务类型
                termName: '',//条款名称
                termCode: '',//条款编码
                termClassify: '',//条款分类
                termClassifyOptions: [{//条款分类选项
                    value: 1,
                    label: '商务条款'
                },{
                    value: 2,
                    label: '不可抗力条款'
                },{
                    value: 3,
                    label: '双方权利与义务'
                },{
                    value: 4,
                    label: '关键业务指标条款'
                }],
                businessTypeOptions: [],//业务类型选项
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
                let data = {
                    termName: this.termName,
                    id: this.termData.id,
                    orgId: this.org === '全局级' ? 1 : 2,
                    termCategory: this.termClassify,
                    businessCategory: this.businessType,
                    comment: this.comment,
                    updateUser: this.updateUser,
                    termText: this.editor,
                }
                console.log(data)
                var res = await $CS.updateContractTermLibrary(data)
                console.log(res)
                if (res.data.status.statusCode === 0) {
                    this.$message('修改成功！')
                    setTimeout(() => {
                        this.removeTab('crm_termGlobalMain_detailCommonTerm')
                    }, 3000)
                }else {
                    this.$message('修改失败！' + res.data.status.statusCode)
                }
            },
            async getInitEnums(params){
                var res = await $CS.getInitEnums(params)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    switch (params){
                        case `getAllOrg?orgId=${this.userOverallOrgId}`://初始化所属组织
                            this.org = res.data.result[0].orgName
                            break
                        case 'getBusiTypeList'://初始化业务类型选项
                            this.businessTypeOptions = this.dataHandle(res.data.result)
                    }
                }
            },
            handleClick(tab, event) {
                console.log(tab, event)
            }
        },
        mounted (){
            this.getInitEnums(`getAllOrg?orgId=${this.userOverallOrgId}`)
            this.getInitEnums('getBusiTypeList')
            console.log(this.termData, '普通条款详情')
            this.termCode = this.termData.termCode
            this.termName = this.termData.termName
            this.termClassify = this.termData.termCategory
            this.businessType = this.termData.businessCategory
            this.comment = this.termData.comment
            this.editor = this.termData.termText
        }
    }
</script>

<style lang="scss">
    .newContent{
        margin:0;
        padding:0 16px;
        .newContentBox{
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
                width:306px;
                margin-right: 20px;
                input{
                    padding-left:16px;
                }
            }
            .groupL-p > span{
                width:48px;
            }
            .star-icon {
                position: absolute;
                z-index: 1;
                margin-top: 3px;
                margin-left: 5px;
            }
        }
        .l-note {
            margin: 0 0 20px 26px;
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

