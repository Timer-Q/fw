<template>
  <div class="admin-template">
      <div class="projection" v-if="newTabType === 'add'">
            <Button class="public-function-btn" @click="saveAdmin">保存</Button>
            <Button class="public-function-btn" @click="saveAdmin_addAdmin('管理员名称-新增', 'adminAdd', 'add', 'AdminTemplate')">保存并新增</Button>
            <Button class="public-function-btn" @click="cancelSaveAdmin">取消</Button>
        </div>
        <div class="projection" v-if="newTabType === 'update'">
            <Button class="public-function-btn" @click="saveAdmin">保存</Button>
            <Button class="public-function-btn" @click="cancelSaveAdmin">取消</Button>
        </div>
        <div class="projection" v-if="newTabType === 'detail'">
            <Button class="public-function-btn" @click="addTab(newAdminMsg.name, newAdminMsg.tag, 'update', 'AdminTemplate')">修改</Button>
            <Button class="public-function-btn" @click="deleteAdmin">删除</Button>
            <Button class="public-function-btn" @click="changEnable(adminMsg.adminId, '启用')">启用</Button>
            <Button class="public-function-btn" @click="changEnable(adminMsg.adminId, '停用')">停用</Button>
            <Button class="public-function-btn" @click="changeLock(adminMsg.adminId, '锁定')">锁定</Button>
            <Button class="public-function-btn" @click="changeLock(adminMsg.adminId, '解锁')">解锁</Button>
            <Button class="public-function-btn" @click="resetPwd(adminMsg.adminId)">重置密码</Button>

        </div>
        <div class="form-wrapper">
            <el-form :inline="true" :model="formData" :rules="formData.rules" class="demo-form-inline" ref="ruleForm" label-width="83px">
                <el-form-item label="管理员类型" class="precent23">
                    <el-select v-model="formData.managerLevel" placeholder="请选择" size="small" :disabled="formReadOnly">
                        <el-option label="全局管理员" :value="1"></el-option>
                        <el-option label="集团管理员" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属组织 " class="precent23" label-width="83px">
                    <dropDownTree ref="dropDownTree" :showCheckbox="false" :checkNodeProp="adminMsgProps" :formReadOnly="formReadOnly" width="100%" :treeData="orgDropTreeData" :checkOrgId="formData.checkOrg"></dropDownTree>
                </el-form-item>
                <el-form-item label="管理员编码 " class="precent23" label-width="83px">
                    <el-input v-model="formData.userNumber" placeholder="请输入角色名称" size="small" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="管理员名称 " class="precent23" label-width="83px" prop="userName">
                    <el-input v-model="formData.userName" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名 " class="precent23 secondFormRow" label-width="83px">
                    <el-input v-model="formData.realName" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="手机号码 " class="precent23 secondFormRow" prop="phone" label-width="83px">
                    <el-input v-model="formData.phone" placeholder="请输入内容" size="small" :readonly="formReadOnly" :maxlength="11" :minlength="11"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址 " class="precent23 secondFormRow" prop="email" label-width="83px">
                    <el-input v-model="formData.email" placeholder="请输入内容" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="启用状态 " class="precent23 secondFormRow" label-width="83px">
                    <el-select v-model="formData.enable" placeholder="请选择" size="small" :disabled="true">
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="停用" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" class="precent70">
                    <el-checkbox v-model="formData.lock" style="margin-left: 73px;" :disabled="true">锁定</el-checkbox>
                </el-form-item>
                <el-form-item label="备注 " class="precent70 remark">
                    <el-input v-model="formData.remark" placeholder="请输入内容" size="small" :readonly="formReadOnly" v-countNum="{nowNum: 0, allNum: 50}" :maxlength="50" width="100%"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="bar"></div>
        <div class="managementBloc">
            <div class="title">可管理集团</div>
            <div class="projection">
                <Button class="public-function-btn" @click="managementBloc" v-if="newTabType === 'add' || newTabType === 'update'" style="margin-top: 0px;">调整管理集团</Button>
                <Button class="public-function-btn" @click="managementTimeFunc" v-if="newTabType === 'update'" style="margin-top: 0px;">调整管理时效</Button>
            </div>
            <div class="table-wrapper">
                <el-table id="userTable" :data="tableData" border highlight-current-row @row-click="adminTableClick" @current-change="currentRowChange">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="groupCode" label="集团编码"></el-table-column>
                    <el-table-column prop="groupName" label="集团名称"></el-table-column>
                    <el-table-column prop="effectiveTime" label="关联生效日期">
                        <template slot-scope="scope">
                            {{scope.row.effectiveTime | formatDate('yyyy-MM-dd')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="expireTime" label="关联失效日期">
                        <template slot-scope="scope">
                            {{scope.row.expireTime | formatDate('yyyy-MM-dd')}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="managementBloc-layer">
            <el-dialog title="调整集团管理" :visible.sync="managementBlocLayer">
                <el-transfer
                    v-model="transfer.targetData"
                    filterable
                    :titles="['未选集团', '所选集团']"
                    :button-texts="['移除', '添加']"
                    :props="{
                        key: 'groupId',
                        label: 'groupName'
                    }"
                    @change="transferChange"
                    :data="transfer.sourceData">
                </el-transfer>
                <div class="dateTime">
                    <span>生效日期</span>
                    <el-date-picker
                        v-model="transfer.effectiveTime"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    <span>&emsp;失效日期</span>
                    <el-date-picker
                        v-model="transfer.expireTime"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="managementBlocLayer = false">取 消</el-button>
                    <el-button type="primary" @click="confirmManagementBloc">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="managementTime-layer">
            <el-dialog title="调整用户时间" :visible.sync="managementTimeLayer" size="tiny" style="top: 25%;" v-if="managementTimeLayer">
                <div class="groupMsg">
                    <p>
                        <span>集团编码 : </span>
                        <span>{{groupMsg.groupCode}}</span>
                    </p>
                    <p>
                        <span>集团名称 : </span>
                        <span>{{groupMsg.groupName}}</span>
                    </p>
                </div>
                <div class="dateTime">
                    <span>关联生效时间 </span>
                    <el-date-picker v-model="groupMsg.effectiveTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="pickerOptions">
                    </el-date-picker>
                    <span>&emsp;关联失效时间 </span>
                    <el-date-picker v-model="groupMsg.expireTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="managementTimeLayer = false">取 消</el-button>
                    <el-button type="primary" @click="confirmmanagementTime">确 定</el-button>
                </span>
            </el-dialog>
        </div>
  </div>
</template>

<script>
const USERID = 1
import { mapGetters, mapMutations } from 'vuex'
import { initialAdminOrg, initAdminAllGroupList, addNewAdmin, getAdminInfo, getAdminBloc, updateAdmin, adjustAdminGroupExpire, deleteAdmin, resetPassword, userDisable, userEnable, lock, unlock } from '@Permission/services/adminService.js'
import dropDownTree from '@Permission/components/dropDownTree/DropDownTree'
export default {
    props: {
        tabType: {
            type: String,
            default: ''
        },
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
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'))
            } else {
                var reg = /^1[3|4|5|7|8][0-9]{9}$/
                console.log(value, reg.test(value), 88888888888)
                if (!reg.test(value)) {
                    callback(new Error('请输入正确手机号码'))
                }
                callback()
            }
        }
        var validateEmail = (rule, value, callback) => {
            if (value !== '') {
                var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                if (!emailReg.test(value)) {
                    callback(new Error('请输入有效的邮箱地址'))
                }
                callback()
            }
            callback()
        }
        return {
            newTabType: '',  // 用来区分是新增、修改、详情
            newAdminMsg: null, // 用来缓存当前二级tab页的tab信息
            orgDropTreeData: [], // 给下拉树的数据
            adminMsgProps: {}, // 给下拉树默认选中的数据
            tableRowMsg: {}, // 可管理集团table列表当前行数据
            currentRowIndex: '', // 可管理集团table列表当前行下标
            formData: {
                managerLevel: '', // 管理员类型 ??? 加规则验证不对
                checkOrg: '',
                userNumber: 'GLYBM',
                userName: '',
                realName: '',
                phone: '',
                email: '',
                enable: '未启用', // 启用停用
                lock: false,
                remark: '',
                rules: {
                    userName: [
                        { required: true, message: '请输入管理员账号', trigger: 'blur' }
                    ],
                    managerLevel: [
                        { required: true, message: '请选择管理员的类型', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    email: [
                        { required: false, validator: validateEmail, trigger: 'blur' }
                    ]

                }
            },
            tableData: [], // 可管理集团列表
            tableDataCopy: [], // 可管理集团列表, 用于给后台发送符合后台规定的数据格式的数组
            pickerOptions: { // 当前时间日期选择器特有的选项参考文档，这里指不可点击日期
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            transfer: {
                sourceData: [],
                targetData: [],
                effectiveTime: '',
                expireTime: '',
                ajaxChooseData: [] // 发送给后台的选中的管理员
            },
            managementTime: {
                startTime: '',
                endTime: ''
            },
            groupMsg: {
                groupCode: '',
                groupName: '',
                effectiveTime: 0,
                expireTime: 0
            },
            adminMsgProps: {
                identityType: '',
                orgId: '',
                // 管理编码
                userName: '',
                realName: '',
                phone: '',
                email: '',
                remark: ''
            },
            managementBlocLayer: false, // 调整管理集团弹层
            managementTimeLayer: false // 调整管理时效弹层

        }
    },
    computed: {
        formReadOnly() {
            console.log(this.newTabType)
            return this.newTabType === 'detail' ? true : false
        },
        ...mapGetters({
            adminMsg: 'PER_G_GET_ADMINMESSAGE' // 获取管理员ID
        })
    },
    created() {
        console.log(this.selectTabCode, 88879766666)
        // 每个tab页的信息都是独立的, 所以要把vuex(公共数据)私有化
        this.newAdminMsg = this.adminMsg
        // 因为渲染的通一个组件，通过它使各个二级tab成为唯一的标识
        this.newTabType = this.tabType
        this._initialAdminOrg()
        if (this.newTabType !== 'add') {
            this._getAdminInfo().then(res => {
                console.log(res, 'userInfo111111111111')
                this.formData.managerLevel = res.managerLevel
                this.formData.userNumber = res.userNumber
                this.formData.userName = res.userName
                this.formData.realName = res.realName
                this.formData.phone = res.phone
                this.formData.email = res.email
                this.formData.enable = res.enable === 0 ? '未启用' : res.enable
                this.formData.lock = res.lock
                this.formData.remark = res.remark
                this.formData.checkOrg = res.orgId
                this._getAdminBloc(res.id) // 获取可管理集团列表
                // !!! 这里其实应该监听_getAdminBloc的回调函数
                setTimeout(() => {
                    this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
                }, 300)
            })
        }
        this._initAdminAllGroupList()
    },
    methods: {
        addTab(name, tag, tabType, content) {
            if (tabType === 'update') {
                this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
            } else if (tabType === 'detail') {
                this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
            } else {
                this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
            }
            // vuex存储当前管理员信息
            this.saveAdminMsg({ adminId: this.newAdminMsg.adminId, name, tag, tabType, content })
        },
        adminTableClick (row, event, column) {
            this.tableRowMsg = row
        },
        currentRowChange(newValue, oldValue) {
            this.tableData.forEach((item, index) => {
                if (item === newValue) {
                this.currentRowIndex = index
                }
            })
        },
        managementBloc () {
            this.managementBlocLayer = true
        },
        managementTimeFunc() {
            console.log(this.tableRowMsg, 77777)
            if (this.tableRowMsg.groupId) {
                Object.keys(this.groupMsg).forEach(value => {
                    this.groupMsg[value] = this.tableRowMsg[value]
                })
                this.managementTimeLayer = true
            } else {
                this.$message({
                    message: '请选择需要调整时效的集团',
                    type: 'warning'
                })
            }
        },
        transferChange(rightArr, direction, movedKeys) {
            this.transfer.ajaxChooseData = []
            this.transfer.sourceData.forEach(value => {
                rightArr.forEach(val => {
                    if (val === value.groupId) {
                        this.transfer.ajaxChooseData.push(value)
                    }
                })
            })
        },
        confirmmanagementTime () {
            this.tableData[this.currentRowIndex].effectiveTime = this.groupMsg.effectiveTime.getTime ? this.groupMsg.effectiveTime.getTime() :this.groupMsg.effectiveTime
            this.tableData[this.currentRowIndex].expireTime = this.groupMsg.expireTime.getTime ? this.groupMsg.expireTime.getTime() : this.groupMsg.expireTime
            let data = {
                userId: 1,
                id: this.tableRowMsg.id,
                effectiveTime: this.tableRowMsg.effectiveTime === 'null' ? 0 : this.tableRowMsg.effectiveTime,
                expireTime: this.tableRowMsg.expireTime === 'null' ? 0 : this.tableRowMsg.expireTime
            }
            this.adjustAdminGroupExpire(data)
            this.managementTimeLayer = false
        },
        // 调整管理集团弹窗
        confirmManagementBloc() {
            // this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData)) 放在created里面试试
            let rmArr = []
            for(var i = 0; i < this.transfer.ajaxChooseData.length; i++){
                var flag = false
                for(var j = 0; j < this.tableDataCopy.length; j++){
                    if(this.tableDataCopy[j].groupId === this.transfer.ajaxChooseData[i].groupId){
                        this.tableDataCopy[j].effectiveTime = 0
                        this.tableDataCopy[j].expireTime = 0
                        flag = true
                        break
                    }
                }
                if(!flag){
                    this.tableData.push(
                        Object.assign(this.transfer.ajaxChooseData[i], {effectiveTime: this.transfer.effectiveTime.getTime(), expireTime: this.transfer.expireTime ? this.transfer.expireTime.getTime() : 0})
                    )
                    this.tableDataCopy.push(
                        Object.assign(this.transfer.ajaxChooseData[i], {effectiveTime: this.transfer.effectiveTime.getTime(), expireTime: this.transfer.expireTime ? this.transfer.expireTime.getTime() : 0})
                    )
                }
            }
            // 找出需要移除的的集团
            for(var k = 0; k < this.tableDataCopy.length; k++){
                var flag2 = false
                for(var l = 0; l < this.transfer.ajaxChooseData.length; l++){
                    if(this.tableDataCopy[k].groupId === this.transfer.ajaxChooseData[l].groupId){
                        flag2 = true
                        break
                    }
                }
                if(!flag2){
                    rmArr.push(this.tableDataCopy[k].groupId)
                }
            }
            console.log(rmArr, 'rmArrrmArr11111')
            // 把找出的移除集团删除掉
            rmArr.forEach(value => {
                for(var i = this.tableDataCopy.length - 1; i >= 0; i--){
                    if(value === this.tableDataCopy[i].groupId){
                        this.tableData.splice(i, 1)
                        this.tableDataCopy.splice(i, 1)
                        break
                    }
                }
            })
            console.log(this.tableDataCopy, 222222222)
            this.managementBlocLayer = false
        },
        saveAdmin() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.newTabType === 'add') {
                        // 表单验证正确
                        let ajaxData = {
                            createUserId: 1, // 暂时写死登录人id
                            orgId: 1, // 暂时写死登录人orgid
                            groupId: 1, // 暂时写死登录人groupId
                            source: 122, // 暂时写死系统平台
                            identityType: '',
                            managerLevel: this.formData.managerLevel,
                            groupId: this.$refs.dropDownTree.checkNode.groupId,
                            userNumber: this.formData.userNumber,
                            userName: this.formData.userName,
                            realName: this.formData.realName,
                            phone: this.formData.phone,
                            email: this.formData.email,
                            remark: this.formData.remark,
                            groupList: this.tableData
                        }
                        console.log(ajaxData, 'add', 88888888888866666666)
                        this.addNewAdmin(ajaxData)
                    } else if (this.newTabType === 'update') {
                        let ajaxData = {
                            email: this.formData.email,
                            groupList: this.tableDataCopy,
                            identityType: null,
                            loginUserId: USERID,
                            phone: this.formData.phone,
                            profile: "",
                            realName: this.formData.realName,
                            remark: this.formData.remark,
                            updateUser: USERID,
                            userId: this.newAdminMsg.adminId,
                            userName: this.formData.userName
                        }
                        console.log(ajaxData, 'updata', 8888888888886666666666)
                        this.updateAdmin(ajaxData).then(res => {
                            if (res) {
                                if (res.statusCode === 0) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                    this.$root.bus.$emit(`${this.busSign}close`, `${this.newAdminMsg.tabType}${this.newAdminMsg.tag}`, null, this.newAdminMsg.tabType)
                                } else {
                                    this.$message({
                                        message: `${res.statusReason}`,
                                        type: 'warning'
                                    })
                                }
                            } else {
                                this.$message({
                                    message: '更新失败！',
                                    type: 'error'
                                })
                            }
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        cancelSaveAdmin () {
            console.log(`${this.busSign}close`, `${this.newAdminMsg.tabType}${this.newAdminMsg.tag}`, null, this.newAdminMsg.tabType, '------>cancel')
            if (this.newAdminMsg.tabType === 'add') {
                this.$root.bus.$emit(`${this.busSign}close`, `${this.newAdminMsg.tag}`, null, this.newAdminMsg.tabType)
            } else {
                this.$root.bus.$emit(`${this.busSign}close`, `${this.newAdminMsg.tabType}${this.newAdminMsg.tag}`, null, this.newAdminMsg.tabType)
            }
        },
        saveAdmin_addAdmin (name, tag, tabType, content) {
            this.saveAdmin()
            setTimeout(() => {
                // !!! 在这里其实应该监听保存成功后在新增管理员
                this.addTab(name, tag, tabType, content)
            }, 400)
        },
        deleteAdmin() {
            console.log(this.adminMsg)
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 在这里发送删除用户的ajax
                this.confirmDeleteAdmin({userId: this.adminMsg.adminId}).then(r => {
                    console.log(r, 'delete11111')
                    if (r.data.status.statusCode === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.$root.bus.$emit(`${this.busSign}close`, `${this.newAdminMsg.tabType}${this.newAdminMsg.tag}`, null, this.newAdminMsg.tabType)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `${r.data.status.statusReason}`
                        })
                    }
                })
            })
        },
        changEnable(id, btnStatus) {
            if (btnStatus === '启用') {
                this.userEnable(id).then(res => {
                    this.$message(res)
                    this._resetStatus()

                })
            } else if (btnStatus === '停用') {
                this.userDisable(id).then(res => {
                    this.$message(res)
                    this._resetStatus()
                })
            }
        },
        changeLock(id, btnLock) {
            if (btnLock === '锁定') {
                this.userLock(id).then(res => {
                    this.$message(res)
                    this._resetStatus()
                })
            } else if (btnLock === '解锁') {
                this.userUnlock(id).then(res => {
                    this.$message(res)
                    this._resetStatus()
                })
            }
        },
        resetPwd(id) { // 重置密码
            this.$confirm(
                `您确定要重置“${this.adminMsg.name}”账号的密码`,
                "密码重置",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "暂不重置",
                    type: "warning"
                }
            ).then(() => {
                // 在这里发送重置密码的ajax
                this.resetPassword(id).then(res => {
                    this.$confirm(`重置后的密码为“${res}”`, "密码重置", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "success"
                    })
                })

            })
        },
        async addNewAdmin (data) {
            var res = await addNewAdmin(data)
            if (res.status === 200) {
                if (res.data.status.statusCode === 0) {
                    const h = this.$createElement
                    this.$msgbox({
                        title: '添加成功',
                        message: h('div', null, [
                            h('p', null, `管理员账号是 ${res.data.result.userName}`),
                            h('p', null, `管理员密码是 ${res.data.result.password}`)
                        ]),
                        confirmButtonText: '确定',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                done()
                            } else {
                                done()
                            }
                        }
                    }).then(action => {
                        this.$root.bus.$emit(`${this.busSign}close`, `${this.newAdminMsg.tabType}${this.newAdminMsg.tag}`, null, this.newAdminMsg.tabType)
                        this.$message({
                            message: '添加管理员成功',
                            type: 'success'
                        })
                    })
                } else {
                    this.$message({
                        message: res.data.status.statusReason,
                        type: 'warning'
                    })
                }
            } else {
                this.$message({
                    message: '添加失败',
                    type: 'error'
                })
            }
        },
        async _initialAdminOrg() {
            var res = await initialAdminOrg({userId: 1, groupId: 1, permissionType: 'org'})
            this.orgDropTreeData = res.data.result.orgs
        },
        async _initAdminAllGroupList() {
            var res = await initAdminAllGroupList({userId: 1, adminId: this.newAdminMsg.adminId})
            this.transfer.sourceData = res.data.result.all
            console.log(this.transfer.sourceData, 77777777777777)
        },
        async _getAdminInfo() {
            var res = await getAdminInfo({userId: this.adminMsg.adminId})
            return res.data.result
        },
        async _getAdminBloc(adminId) {
            var res = await getAdminBloc({adminId: adminId})
            console.log(res, '_getAdminBloc_getAdminBloc1111')
            this.tableData = res.data.result
            if (this.newTabType === 'update') {
                this._initAdminAllGroupList().then(() => {
                    // 将弹出穿梭框的右边渲染对应数据
                    this.transfer.targetData = []
                    this.transfer.sourceData.forEach(value => {
                        res.data.result.forEach(val => {
                            if (value.groupId === val.groupId) {
                                this.transfer.targetData.push(val.groupId)
                            }
                        })
                    })
                })
            }
        },
        async updateAdmin(data) {
            let res = await updateAdmin(data)
            if (res.status === 200) {
                return res.data.status
            } else {
                return false
            }
        },
        async userEnable(id) { // 启用
            var res = await userEnable({userId: id})
            console.log(res, 'userEnable')
            return res.data.result
        },
        async userDisable(id) { // 停用
            let res = await userDisable({userId: id})
            console.log(res, 'userDisable')
            return res.data.result
        },
        async userLock(id) { // 锁定
            let res = await lock({userId: id})
            console.log(res, 'lock')
            return res.data.result
        },
        async userUnlock(id) { // 解锁
            let res = await unlock({userId: id})
            console.log(res, 'unlock')
            return res.data.result
        },
        async confirmDeleteAdmin(data) { // 删除管理员
            let res = await deleteAdmin(data)
            return res
        },
        async resetPassword(id) { // 重置密码
            let res = await resetPassword({userId: id})
            console.log(res, 'resetPassword')
            return res.data.result
        },
        async adjustAdminGroupExpire(data) {
            let res = await adjustAdminGroupExpire(data)
            console.log(res, 788888888888888888)
        },
        async _resetStatus() {
            this._getAdminInfo().then(res => {
                console.log(res, 7888888889999999999)
                this.formData.managerLevel = res.managerLevel
                this.formData.userNumber = res.userNumber
                this.formData.userName = res.userName
                this.formData.realName = res.realName
                this.formData.phone = res.phone
                this.formData.email = res.email
                this.formData.enable = res.enable === 0 ? '未启用' : res.enable
                this.formData.lock = res.lock
                this.formData.remark = res.remark
                this.formData.checkOrg = res.orgId
                this._getAdminBloc(res.id) // 获取可管理集团列表
                // this._initAdminAllGroupList()
            })
        },
        ...mapMutations({
            saveAdminMsg: 'PER_M_SAVE_ADMINMESSAGE'
        })
    },
    watch: {
        selectTabCode (newValue, oldValue) {
            if ( this.newTabType === 'detail' && newValue === `${this.newTabType}${this.adminMsg.adminId}`) {
                this._resetStatus()
            }
        }
    },
    components: {
        dropDownTree
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


