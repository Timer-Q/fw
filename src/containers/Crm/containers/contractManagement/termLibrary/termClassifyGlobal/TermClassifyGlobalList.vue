<template>
    <div class="term_classify_wrap">
        <div class="query_condition">
            <div class="vehicle-data">
                <div class="inblock crm_org">
                    <span class="hspace">所属组织</span>
                    <el-select class="crm_org_select" v-model="org" @change="orgChange" multiple filterable placeholder="请选择">
                        <el-option
                            v-for="item in orgOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" class="selectFontSize">
                        </el-option>
                    </el-select>
                    <i class="newArrow-country"></i>
                </div>
                <div class="inblock">
                    <span class="hspace">条款分类编码</span>
                    <el-input placeholder="请输入" v-model="TermClassifyCode"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">条款分类名称</span>
                    <el-input placeholder="请输入" v-model="TermClassifyName"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">状态</span>
                    <el-select v-model="status" placeholder="请选择">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" class="selectFontSize">
                        </el-option>
                    </el-select>
                    <i class="newArrow-country"></i>
                </div>
            </div>
            <div class="vehicle-btn">
                <el-button @click="search">查询</el-button>
                <a href="javascript:;" class="l-clear" @click="clear">清空</a>
            </div>
        </div>
        <div>
            <div class="left-tree">
                <p>条款分类</p>
                <Button size="small" @click="seeSeeDialog">新增</Button>
                <Button size="small">删除</Button>
                <Tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></Tree>
            </div>
            <div class="categorydetail">
                <p class="detail">分类详情</p>
                <div class="btn-group">
                    <Button class="btn" size="small" v-if="isDetail">修改</Button>
                    <ButtonGroup v-if="isDetail">
                        <Button size="small">启用</Button>
                        <Button size="small">停用</Button>
                    </ButtonGroup>
                    <Button class="btn" size="small" v-if="!isDetail">保存</Button>
                    <Button class="btn" size="small" v-if="!isDetail">取消</Button>
                </div>
                <div>
                </div>
                <Form :inline="true" class="demo-form-inline">
                    <FormItem label="所属组织">
                        <Input placeholder="A组织"/>
                    </FormItem>
                    <FormItem label="条款分类编码">
                        <Input placeholder="请输入"/>
                    </FormItem>
                    <FormItem label="条款分类名称">
                        <Input placeholder="价钱"/>
                    </FormItem>
                </Form>
                <Form :inline="true" class="demo-form-inline">
                    <FormItem label="上级分类">
                        <Input value="费用及价格"/>
                    </FormItem>
                    <FormItem>
                        <Checkbox v-model="checked" disabled>启用</Checkbox>
                    </FormItem>

                </Form>
                <Form :inline="true" :label-position="labelPosition" class="nbsp">
                    <label class="el-form-item__label">备注</label>
                    <FormItem>
                        <Input value="费用及价格" type="textarea" :rows="3"/>
                    </FormItem>
                </Form>
                <Dialog title="新增分类" :visible.sync="dialogFormVisible" class="addDialog">
                    <Form :model="form" :inline="true" :label-width="formLabelWidth">
                        <FormItem label="上级分类" :label-width="formLabelWidth">
                            <i class="star-icon">*</i>
                            <Input v-model="form.parentData.parentName"  disabled/>
                        </FormItem>
                        <FormItem label="分类名称" :label-width="formLabelWidth">
                            <i class="star-icon">*</i>
                            <Input v-model="form.termCategoryName" />
                        </FormItem>
                    </Form>
                    <Form :model="form" :inline="true">
                        <FormItem label="分类编码" :label-width="formLabelWidth">
                            <Input v-model="form.termCategoryCode" placeholder="系统自动编码" disabled/>
                        </FormItem>
                        <FormItem label="所属组织" :label-width="formLabelWidth">
                            <i class="star-icon">*</i>
                            <Input v-model="form.orgId" disabled/>
                        </FormItem>
                    </Form>
                    <Form :model="form" :inline="true">
                        <FormItem :label-width="formLabelWidth" class="start">
                            <Checkbox v-model="form.status" disabled>启用</Checkbox>
                            <Checkbox v-model="form.globalPreset" disabled>平台预置</Checkbox>
                        </FormItem>

                    </Form>
                    <Form :model="form" :inline="true" :label-position="labelPosition" class="nbsp remark">
                        <label class="el-form-item__label">备注</label>
                        <FormItem>
                            <Input v-model="form.comment" type="textarea" :rows="3" placeholder="请输入内容"/>
                        </FormItem>
                    </Form>
                    <div slot="footer" class="dialog-footer">
                        <Button @click="dialogFormVisible = false">取 消</Button>
                        <Button @click="save(true)">保存并新增</Button>
                        <Button type="warning" @click="save(false)">保存</Button>
                    </div>
                </Dialog>

                <ul class="footer">
                    <li>创建人：<span>王宇龙</span></li>
                    <li>创建时间：<span>2017-02-09 12:00:00</span></li>
                    <li>最后修改人：<span>王宇龙</span></li>
                    <li>最后修改时间：<span>2017-02-09 12:00:00</span></li>
                </ul>
            </div>

        </div>
    </div>

</template>

<script>
    import serverMixin from '@Crm/mixin/server.js'
    import $CS from '@Crm/services/termLibrary/termClassifyGlobalService.js'
    export default {
        mixins: [serverMixin],
        data() {
            return {
                isDetail: true,//是否是详情
                status: '',//状态
                TermClassifyCode: '',//条款分类编码
                TermClassifyName: '',//条款分类名称
                org: [1],//所属组织
                orgOptions: [],//所属组织选项
                statusOptions: [{//状态选项
                    value: '',
                    label: '全部'
                }, {
                    value: 0,
                    label: '未启用'
                }, {
                    value: 1,
                    label: '启用'
                }, {
                    value: 2,
                    label: '停用'
                }],
                treeData: [],//树形控件数据
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                labelPosition: 'right',
                checked: true,
                form: {
                    comment:"",//新增条款分类备注
                    status: true,//新增条款分类状态
                    createUser: 10001,//新增条款分类创建人
                    globalPreset: false,//新增条款分类平台预置
                    orgId: '',//新增条款分类所属组织
                    parentData: {//新增条款分类上级分类数据
                        parentId: '',
                        parentName: '无上级分类',
                    },
                    termCategoryCode:"",//新增条款分类编码
                    termCategoryName:"",//新增条款分类名称

                },
                formLabelWidth: '120px',
                formInputWidth: '120px',
            }
        },
        methods: {
            orgChange(){

            },
            clear(){//清空
                this.orgId = []
                this.TermClassifyCode = ''
                this.TermClassifyName = ''
                this.status = ''
            },
            search(){
                if(this.org.length === 0){
                    this.$message('所属组织不能为空！')
                    return
                }
                if(this.TermClassifyCode === '' && this.TermClassifyName === ''){
                    this.$message('条款分类编码和条款分类名称不能同时为空！')
                    return
                }
                this.getContractTermCategoryByCondition()
            },
            seeSeeDialog(){
                this.dialogFormVisible = true
                console.log(this.dialogFormVisible)
            },
            handleNodeClick(data, event) {
                console.log(data)
                this.form.parentData.parentId = data.id
                this.form.parentData.parentName = data.label
            },
            save(andAdd){
                this.saveContractTermCategory(andAdd)
            },
            async getTermCategoryRootTree(){//获取合同条款分类列表
                var res = await $CS.getTermCategoryRootTree(this.userOverallOrgId)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    this.treeData = this.treeDataHandle(res.data.result.childNodes)
                    console.log(this.treeData)
                }

            },
            async getContractTermCategoryByCondition(){//根据条件获取合同条款分类列表
                var res = await $CS.getContractTermCategoryByCondition(`orgId=${this.userOverallOrgId}&termCategoryCode=${this.TermClassifyCode}&termCategoryName=${this.TermClassifyName}&status=${this.status}`)
                console.log(res)
            },
            async saveContractTermCategory(andAdd){//新增合同条款分类信息
                if(!this.form.termCategoryName){
                    this.$message('分类名称不能为空！')
                    return
                }
                let data = {
                    comment: this.form.comment,
                    status: this.form.status ? 1 : 0,
                    createUser: this.form.createUser,
                    globalPreset: this.form.globalPreset ? 1 : 0,
                    orgId: this.form.orgId === '全局级' ? 1 : 2,
                    termCategoryName: this.form.termCategoryName
                }
                if(this.form.parentData.parentId){
                    data.parentId = this.form.parentData.parentId
                }
                var res = await $CS.saveContractTermCategory(data)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    if(!andAdd){
                        this.dialogFormVisible = false
                    }
                    this.$message('保存成功！')
                    this.form.termCategoryName = ''
                    this.form.comment = ''
                }else {
                    this.$message('保存失败！' + res.data.status.statusReason)
                }
            },
            async delContractTermCategoryByID(){//删除合同条款分类信息
                if(!this.form.parentData.parentId){
                    this.$message('请选择要删除的节点！')

                }
                var res = await $CS.delContractTermCategoryByID(`orgId=${this.userOverallOrgId}&id=${this.form.parentData.parentId}`)
                console.log(res)
            },
            async getInitOrgId(){//初始化所属组织
                var res = await $CS.getInitEnums(`getAllOrg?orgId=${this.userOverallOrgId}`)
                console.log(res)
                this.orgOptions = this.dataHandle(res.data.result)
                this.form.orgId = res.data.result[0].orgName
            },
            dataHandle(arr){//枚举值数据处理
                let dataArr = []
                arr.forEach( item => {
                    let obj = {
                        value: item.id,
                        label: item.orgName
                    }
                    dataArr.push(obj)
                })
                return dataArr
            },
            treeDataHandle(arr){//树形数据递归处理
                if(!arr || arr.length === 0){
                    return
                }
                let dataArr = []
                arr.forEach( item => {
                    let obj = {
                        id: item.id,
                        label: item.termCategoryName,
                        children: this.treeDataHandle(item.childNodes)
                    }
                    dataArr.push(obj)
                })
                return dataArr
            }
        },
        mounted (){
            this.getTermCategoryRootTree()
            this.getInitOrgId()
        }
    }
</script>

<style lang="scss">

    .addDialog{
        .star-icon{
            z-index: 1000;
            margin-left: 4px;
        }
        .el-form-item{
            width: 45%;
            .el-form-item__content{
                width:200px;
                .el-input__inner{
                    width:200px;
                }
            }
        }
        .el-input__inner{

        }
    }
    .term_classify_wrap{
        padding: 0 20px;
        .query_condition{
            margin-bottom: 20px;
        }
    }
    .categorydetail {
        float: left;
        width: 75%;
        height: 705px;
        border:  1px solid #e6e6e6;
        padding: 0 10px;
        font-size: 12px;
        position: relative;
        p {
            border-bottom:  1px solid #e6e6e6;
            line-height: 38px;
            height: 38px;
            color: #48aeec;

        }
        .btn {
            vertical-align: middle;
        }
        .nbsp {
            .el-form-item__label {
                margin-top: 16px;
                width: 60px;
                text-align: right;
            }
            .el-textarea__inner{
                width:412%;
                margin-left: -4px;
            }

        }
        .el-form-item__content{
            /*width:216px;*/
        }
        .btn-group{
            margin: 16px 0;
        }
        .remark {
            .el-form-item__label {
                margin-left:58px;
            }
            .el-textarea__inner{
                width:410%;

            }


        }
        .element.style{
            top:37%;
        }

        .el-dialog--small{
            width: 774px;
            height:420px;
        }
        .el-dialog {
            .el-dialog__header{
                background-color: #48aeec;
                line-height: 32px;
                padding: 13px 20px;

                span{
                    color: #fff;

                }
            }
            .start .el-form-item__content{
                margin-left: 119px;
            }
            .el-textarea__inner{
                width:568px;
            }
            .el-dialog__footer{
                position: absolute;
                bottom: 0;
                right:41px;
            }
            .el-dialog__headerbtn{
                padding-top: 8px;
            }

        }

        ul.footer{
            position: absolute;
            bottom: 0;
            background-color: #f5f5f5;
            font-size: 0;
            width:100%;
            margin-left: -10px;
            li{
                display: inline-block;
                height:40px;
                height:40px;
                font-size: 14px;
                line-height:40px;
                margin:0 40px 0 10px;
            }
        }

    }
    .el-tree {
        border: none
    }

    .left-tree{
        float: left;
        width: 20%;
        height: 705px;
        border: 1px solid #e6e6e6;
        margin-right:10px;
        p{
            font-size: 12px;
            height:28px;
            line-height:28px;
            border-bottom: 1px solid #e6e6e6;
            padding-left:15px;
            background-color: #ededed;
        }
    }

    .left-tree button:nth-of-type(1) {
        margin:16px 10px 12px 15px;

    }
    .left-tree button:nth-of-type(2) {
        margin:16px 0 12px 0;

    }
</style>
