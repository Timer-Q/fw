<template>
    <div class="admin-template">
        <div class="form-wrapper">
            <el-form :inline="true" :model="formData"  class="demo-form-inline" ref="ruleForm" label-width="83px">


                <el-form-item label="编码" class="precent23" label-width="83px">
                    <el-input v-model="formData.orgCode" placeholder="请输编码" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="名称" class="precent23" label-width="83px" prop="userName">
                    <el-input v-model="formData.orgName" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="简称" class="precent23 secondFormRow" label-width="83px">
                    <el-input v-model="formData.orgShortName" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" class="precent23 secondFormRow" prop="phone" label-width="83px">
                    <el-input v-model="formData.industryType" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>

                </el-form-item>
                <el-form-item label="国家 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.regionId" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>

                <el-form-item label="行政区划 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.administrativeId" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="详细地址 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.address" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="电话 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.phone" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>

                <el-form-item label="邮箱 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.email" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="网址 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.netAddress" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.creditCode" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="成立时间 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.establishTime" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="本位币 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.currency" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="对应客户 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.custId" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>

                <el-form-item label="业务类型 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.businessType" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>

               <el-form-item label="初始化完成 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-checkbox v-model="!!formData.init"  :disabled="formReadOnly"   style="margin-left: 73px;" > </el-checkbox>
               </el-form-item>

               <el-form-item label="启用状态 " class="precent23 secondFormRow" label-width="83px">
                   <el-select v-model="formData.status" placeholder="请选择" size="small"  >
                       <el-option label="启用" :value="2"></el-option>
                       <el-option label="停用" :value="1"></el-option>
                   </el-select>
               </el-form-item>

                <el-form-item label="简介 " class="precent70 remark">
                    <el-input v-model="formData.note" placeholder="请输入内容" size="small" :readonly="formReadOnly" v-countNum="{nowNum: 0, allNum: 50}" :maxlength="50" width="100%"></el-input>
                </el-form-item>
                <el-form-item label="主营业务 " class="precent70 remark">
                    <el-input v-model="formData.mainBusiness" placeholder="请输入内容" size="small" :readonly="formReadOnly" v-countNum="{nowNum: 0, allNum: 50}" :maxlength="50" width="100%"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    const USERID = 11
    import { getIndustryType,queryGroupById } from '@Permission/services/groupService.js'
    import { mapGetters } from 'vuex'
    export default {
        props: {
            busSign: {
                type: String,
                default: ''
            },
            selectTabCode: { // 当前页的tag
                type: String,
                default: ''
            }
        },
        data() {
            return {
                industryTypes:[],
                getData: {
                    "id": 0,
                    "userId": USERID
                },
                 formReadOnly:true,
                 formData:{
                    address: "",
                    administrativeId: 0,
                    createUser: USERID,
                    creditCode: "",
                    currency: "",
                    custId: 0,
                    email: "",
                    establishTime: 0,
                    industryType: "",
                    mainBusiness: "",
                    netAddress: "",
                    note: "",
                    orgName: "",
                    orgShortName: "",
                    phone: "",
                    regionId: 0,
                     orgCode:0,
                     init:0,
                     status:1
                },

            }
        },
        created() {
            let newGroupMsg = this.groupMsg
            this.getData.id  = newGroupMsg.groupId
            console.log(newGroupMsg,31111111111111)

            this.getIndustryType1()
            this.queryGroupById1()
        },
        computed: {
            ...mapGetters({
                groupMsg: 'ORG_G_GET_GROUPMSG'
            })
        },
        methods: {
            async  getIndustryType1(){
                var res = await getIndustryType()
                console.log(res,222)
                this.industryTypes = res.data.result
            },

            async  queryGroupById1(){
                var res = await queryGroupById(this.getData)
                console.log(res,333)
                this.formData = res.data.result
            }

        },
        watch: {

        },
        components: {

        }
    }
</script>

<style lang="scss">
    .admin-template {
        .precent23 {
            width: 23%;
        }
        .precent70 {
            width: 70%;
        }
        .secondFormRow {
            margin-top: 6px;
        }
        .form-wrapper {
            .remark {
                .el-form-item__content {
                    width: calc(100% - 72px);
                }
            }
        }
        .bar {
            margin: 14px 16px 0;
            height: 2px;
            background: #ededed;
        }
        .managementBloc {
            .projection {
                box-shadow: none;
                margin-bottom: 0px;
            }
            .title {
                margin: 16px;
                color: #28a7e1;
                font-size: 14px;
            }
            .table-wrapper {
                margin-left: 16px;
                width: 60%;
            }
        }
        .managementBloc-layer {
            .dateTime {
                padding-top: 16px;
                margin-top: 16px;
                border-top: 1px solid #eee;
            }
        }
        .managementTime-layer {
            .el-dialog {
                width: 456px;
            }
        }
    }

    // 穿梭框重置el-button样式
    .el-dialog__wrapper {
        .el-dialog {
            width: 594px;
        }
        .el-transfer-panel {
            width: 228px;
        }
        .el-transfer__buttons .el-button {
            padding: 6px 14px;
            font-size: 12px;
        }
        .el-transfer__buttons .el-button:first-child {
            border-color: #cbcbcb;
            background-color: #fff;
        }
        .el-transfer__buttons .el-button:last-child {
            border-color: #47b0e0;
            background-color: #f0fbff;
        }
    }
    .el-form-item__error {
        z-index: 1;
    }
    .el-button {
        color: #333!important;
    }
    .el-message {
        z-index: 10000!important;
    }
</style>


