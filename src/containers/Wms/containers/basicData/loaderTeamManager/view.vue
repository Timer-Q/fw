<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">装卸队编码</span>
                    <el-input type="text" v-model="loaderTeamCode" class="license-number" :readonly="true"
                              placeholder="请输入装卸队编码"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">装卸队名称</span>
                    <el-input type="text" v-model="loaderTeamName" class="license-number"
                              placeholder="请输入装卸队名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">装卸队类型</span>
                    <el-select v-model="loaderTeamType" placeholder="请选择装卸队类型">
                        <el-option
                            v-for="item in loaderTeamTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">所属仓库</span>
                    <el-input type="text" v-model="warehouseId" class="license-number"
                              placeholder="请输入/扫描"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">所属劳务商</span>
                    <el-input type="text" v-model="companyId" class="license-number"
                              placeholder="请输入/扫描"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">开户行名称</span>
                    <el-input type="text" v-model="bankName" class="license-number"
                              placeholder="请输入开户行名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">城市</span>
                    <el-input type="text" v-model="city" class="license-number"
                              placeholder="请输入城市"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">支行</span>
                    <el-input type="text" v-model="branchofbank" class="license-number"
                              placeholder="请输入支行"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">联行号</span>
                    <el-input type="text" v-model="cnaps" class="license-number"
                              placeholder="请输入联行号"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">账户名称</span>
                    <el-input type="text" v-model="accountName" class="license-number"
                              placeholder="请输入账户名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">银行账号</span>
                    <el-input type="text" v-model="bankNo" class="license-number"
                              placeholder="请输入银行账号"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">账期</span>
                    <el-input type="text" v-model="statementPeriod" class="license-number"
                              placeholder="请输入账期"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">手机号码</span>
                    <el-input type="text" v-model="phoneNo" class="license-number"
                              placeholder="请输入手机号码"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">负责人</span>
                    <el-input type="text" v-model="leader" class="license-number"
                              placeholder="请输入负责人"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">组员</span>
                    <el-input type="text" v-model="member" class="license-number"
                              placeholder="请输入账户名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="text" v-model="remark" class="license-number"
                              placeholder="请输入备注"></el-input>
                </div>
            </div>

            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    let _this
    let api = {
        test: ''
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                submitUrl:'/wms-base-server/loaderTeam/save',
                loaderTeamTypeOptions: [{
                    value: 1,
                    label: '临时'
                }, {
                    value: 2,
                    label: '正式'
                }],
                loaderTeamCode: '',
                loaderTeamName: '',
                loaderTeamType:'',
                warehouseId:'2000',
                companyId:'',
                bankName:'',
                city:'',
                branchofbank:'',
                cnaps:'',
                accountName:'',
                bankNo:'',
                statementPeriod:'',
                phoneNo:'',
                leader:'',
                member:'',
                remark:''
            }
        },
        mounted() {
            _this.loadUser()
        },
        watch: {
            // 监听value值变化，从而去加载需要编辑的数据
            value() {
                _this.loadUser()
            }
        },
        methods: {
            loadUser() {
                // 如果传入了用户id，则标识需要编辑指定的用户
                if (typeof _this.value === 'string' && _this.value.length > 0) {
                    // 调用接口，获取指定id的用户，假设服务返回了user对象
                    var requestData = {
                        "id": _this.value,
                        "warehouseId": this.warehouseId
                    }
                    _this.$request({
                        url: '/wms-base-server/loaderTeam/get',
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            // 绑定到界面
                            _this.loaderTeamName = response.loaderTeamName
                            _this.loaderTeamCode = response.loaderTeamCode
                            _this.loaderTeamType = response.loaderTeamType
                            _this.companyId = response.companyId
                            _this.bankName = response.bankName
                            _this.city = response.city
                            _this.branchofbank = response.branchofbank
                            _this.cnaps = response.cnaps
                            _this.accountName = response.accountName
                            _this.bankNo = response.bankNo
                            _this.statementPeriod = response.statementPeriod
                            _this.phoneNo = response.phoneNo
                            _this.leader = response.leader
                            _this.member = response.member
                            _this.remark = response.remark
                        }
                    })
                    _this.submitUrl = '/wms-base-server/loaderTeam/update'
                }else{
                    _this.loaderTeamName = ''
                    _this.loaderTeamCode = ''
                    _this.loaderTeamType = ''
                    _this.companyId = ''
                    _this.bankName = ''
                    _this.city = ''
                    _this.branchofbank = ''
                    _this.cnaps = ''
                    _this.accountName = ''
                    _this.bankNo = ''
                    _this.statementPeriod = ''
                    _this.phoneNo = ''
                    _this.leader = ''
                    _this.member = ''
                    _this.remark = ''
                    _this.submitUrl = '/wms-base-server/loaderTeam/save'
                }
            },
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            save() {
                // 先校验数据是否有效
                if (_this.loaderTeamName.length < 1) {
                    _this.$alert('请录入装卸队名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.loaderTeamType.length < 1) {
                    _this.$alert('请选择装卸队类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                /*
                * 此处写调用api，保存user对象
                * 如果保存失败，则给出相应提示
                */
                var requestData = {
                    "id": this.value,
                    "loaderTeamCode": this.loaderTeamCode,
                    "loaderTeamName": this.loaderTeamName,
                    "loaderTeamType": this.loaderTeamType,
                    "warehouseId": this.warehouseId,
                    "companyId": this.companyId,
                    "bankName": this.bankName,
                    "city": this.city,
                    "branchofbank": this.branchofbank,
                    "cnaps": this.cnaps,
                    "accountName": this.accountName,
                    "bankNo": this.bankNo,
                    "statementPeriod": this.statementPeriod,
                    "phoneNo": this.phoneNo,
                    "leader": this.leader,
                    "member": this.member,
                    "remark": this.loaderTeamCode
                }
                _this.$request({
                    url: _this.submitUrl,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        // 保存成功，触发事件saved
                        _this.$emit('saved')
                    }
                })
                // 也可以触发事件时返回一些参数
                // _this.$emit('saved', user)
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .wms-popup {
        padding: 16px;
        .vehicle-find {
            margin-bottom: 10px;
            .inblock {
                margin-right: 10px;
            }
        }
        .vehicle-foot {
            position: absolute;
            bottom: 10px;
            right: 20px;
        }
    }
</style>
