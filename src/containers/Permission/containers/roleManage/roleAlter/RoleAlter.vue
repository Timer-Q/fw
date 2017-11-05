<template>
    <div class="roleAdd">
        <div class="projection">
            <Button class="public-function-btn" @click="save">保存</Button>
            <Button class="public-function-btn" @click="cancelUpdate">取消</Button>
        </div>
        <div class="form-wrapper">
            <el-form :inline="true" :model="roleMsgProps" class="demo-form-inline">
                <el-form-item label="所属组织" class="precent30">
                    <dropDownTree ref="dropDownTree" :showCheckbox="roleMsgProps.orgTreeShowCheckbox" :checkStrictly="true" :checkNodeProp="roleMsgProps" :formReadOnly="formReadOnly" :treeData="treeData" :checkOrgId="roleMsgProps.orgId" width="100%"></dropDownTree>
                </el-form-item>
                <el-form-item label="角色编码" class="precent30">
                    <el-input v-model="roleMsgProps.roleCode" placeholder="JSBM" disabled size="small"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" class="precent30">
                    <el-input v-model="roleMsgProps.roleName" placeholder="请输入角色名称" size="small" :readonly="formReadOnly"></el-input>
                </el-form-item>
                <el-form-item label="备注" style="width: 100%;" class="remark" label-width="66px">
                    <el-input v-model="roleMsgProps.roleDesc" placeholder="请输入内容" size="small" v-countNum="{nowNum: 0, allNum: 50}" :maxlength="50" :readonly="formReadOnly"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="tabs-wrapper bee-tabs-wrapper">
            <el-tabs v-model="tabActiveName" type="card" class="bee-tabs">
                <el-tab-pane label="功能权限" name="effect">
                    <div class="table-wrapper">
                        <el-table
                            :data="tableDataFunc"
                            :default-expand-all="true"
                            @expand="_expandTable"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <el-table :data="model" border>
                                        <fw-tree-grid
                                            :ref="scope.row.ref"
                                            prop="resourceName"
                                            label="权限名称"
                                            :expand-all="false"
                                            checked-key="check"
                                            tree-key="permissionId"
                                            :autoExpandCheckedNodes="true"
                                            :enable-check="true"
                                            child-key="childFuncs"
                                            width="400">
                                        </fw-tree-grid>
                                        <el-table-column prop="resourceDesc" label="功能描述"   width="180"></el-table-column>
                                        <el-table-column prop="type" label="权限类型">
                                            <template slot-scope="scope">
                                                {{scope.row.type}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="系统平台"
                                prop="id">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="组织权限" name="org">
                    <el-table :data="model" border>
                        <fw-tree-grid
                            ref="Orgref"
                            prop="orgName"
                            label="组织树"
                            :expand-all="false"
                            checked-key="check"
                            tree-key="id"
                            :autoExpandCheckedNodes="true"
                            :enable-check="true"
                            child-key="childOrgs"
                            width="400">
                        </fw-tree-grid>
                        <el-table-column prop="orgType" label="组织类型">
                            <template slot-scope="scope">
                                {{scope.row.orgType}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="用户" name="user" v-if="newTabType != 'add'">
                    <div class="adjustBtn" v-if="newTabType === 'update'">
                        <Button class="public-function-btn" @click="addUser">调整用户</Button>
                        <Button class="public-function-btn" @click="adjustUserTime">调整用户时效</Button>
                    </div>
                    <div class="userTable-wrapper">
                        <el-table id="userTable" :data="roleMsgProps.userTableData" @row-click="userTableRowClick" border highlight-current-row>
                            <el-table-column type="index" label="序号"></el-table-column>
                            <el-table-column prop="userNumber" label="用户编码"></el-table-column>
                            <el-table-column prop="userName" label="用户账号"></el-table-column>
                            <el-table-column prop="orgName" label="所属组织名称"></el-table-column>
                            <el-table-column prop="effectiveTime" label="关联生效时间">
                                <template slot-scope="scope">
                                    {{scope.row.effectiveTime | formatDate('yyyy-MM-dd')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="expireTime" label="关联失效时间">
                                <template slot-scope="scope">
                                    {{scope.row.expireTime | formatDate('yyyy-MM-dd')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="authorUser" label="授权用户"></el-table-column>
                            <el-table-column prop="authorTime" label="授权时间">
                                <template slot-scope="scope">
                                    {{scope.row.authorTime | formatDate('yyyy-MM-dd hh:mm:ss')}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="提示" :visible.sync="showAdjustTime" size="tiny" style="top: 25%;" :before-close="handleClose" v-if="showAdjustTime">
            <div class="userMsg">
                <p>
                    <span>用户编码 : </span>
                    <span>{{dateTime.userTableRowMsg.userNumber}}</span>
                </p>
                <p>
                    <span>用户名称 : </span>
                    <span>{{dateTime.userTableRowMsg.userName}}</span>
                </p>
                <p>
                    <span>所属组织 : </span>
                    <span>{{dateTime.userTableRowMsg.orgName}}</span>
                </p>
            </div>
            <div class="dateTime">
                <span>关联生效时间 </span>
                <el-date-picker v-model="dateTime.value1" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="dateTime.pickerOptions1">
                </el-date-picker>
                <span>&emsp;关联失效时间 </span>
                <el-date-picker v-model="dateTime.value2" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="dateTime.pickerOptions2">
                </el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAdjustTime = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdjustUserTime">确 定</el-button>
            </span>
        </el-dialog>
        <div class="addUser-layer">
            <el-dialog title="批量分配用户" :visible.sync="userLayerMsg.addUserLayer" size="tiny" style="top: 20%;">
                <div class="tree-wrapper">
                    <fw-smarter-tree class="filter-tree" :enable-check="true" child-key="userList" checked-key="check" :expand-all="true" :data="model" tree-key="key" prop="label" ref="smartTree">
                    </fw-smarter-tree>
                </div>
                <div class="dateTime">
                    <span>关联生效时间 </span>
                    <el-date-picker v-model="userLayerMsg.effectiveTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="userLayerMsg.pickerOptions">
                    </el-date-picker>
                    <span>&emsp;关联失效时间 </span>
                    <el-date-picker v-model="userLayerMsg.expireTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="userLayerMsg.pickerOptions">
                    </el-date-picker>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="userLayerMsg.addUserLayer = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAddUser">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const GROUPID = 1
const USERID = 1
const AUTHORUSER = '王鹏'
import { mapGetters, mapMutations } from 'vuex'
import dropDownTree from '@Permission/components/dropDownTree/DropDownTree'
import { initialRoleMsg, initialRoleUsers, selectUserExpire, adjustUserExpire, getRolePermission, getRoleOrgTree, updateBasePermissionRole, getUserTree, batchUserRoleCreate } from '@Permission/services/roleService.js'
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
        return {
            tabActiveName: 'effect',
            newTabType: '',  // 用来区分是新增、修改、详情
            newRoleMsg: {}, // 用来缓存当前二级tab页的tab信息
            showAdjustTime: false, // 调整用户时间dialog
            currentUserTableRowMsg: {}, // 选中用户行的信息
            model: [], // 通用组件用法，给一个空数组
            treeData: [],
            roleMsgProps: {
                orgId: '',
                orgName: '',
                roleCode: '',
                roleName: '',
                roleDesc: '',
                funcPermissions: null,
                orgPermissions: null,
                orgTreeShowCheckbox: false,
                userTableData: []
            },
            userLayerMsg: { // 调整用户
                treeData: [],
                defaultProps: {
                    children: 'childOrgs',
                    label: 'label'
                },
                effectiveTime: '', // 添加角色弹层中的生效时间和时效时间
                expireTime: '',// 添加角色弹层中的生效时间和时效时间
                addUserLayer: false,
                pickerOptions: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                userTableData: []
            },
            tableDataFunc: [{id: 'PC',tree:[], ref: 'PCref'}, {id: 'APP', tree:[], ref: 'APPref'}],
            tableDataOrg: [{id: 'PC',tree:[], ref: 'Orgref'}],
            dateTime: {
                value1: '',
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                value2: '',
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                userTableRowMsg: {} // 当前用户信息选择行信息
            }
        }
    },
    computed: {
        formReadOnly() {
            return this.newTabType === 'detail' ? true : false
        },
        ...mapGetters({
            roleMsg: 'PER_G_GET_ROLEMESSAGE' // 获取角色ID {roleId: [num]}
        })
    },
    created() {
        // 每个tab页的信息都是独立的, 所以要把vuex(公共数据)私有化
        console.log(this.roleMsg, 555555555555555)
        this.newRoleMsg = this.roleMsg
        // 因为渲染的通一个组件，通过它使各个二级tab成为唯一的标识
        this.newTabType = this.tabType
        this._initialRoleMsg()
        this._initialRoleUsers()
        this._getRoleOrgTree()
    },
    methods: {
        addTab(name, tag, tabType, content) {
            if (tabType === 'update') {
                this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
                // vuex存储当前角色信息
                this.saveRoleMsg({ roleId: this.newRoleMsg.roleId, name, tag, tabType, content })
            } else if (tabType === 'detail') {
                this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
                this.saveRoleMsg({ roleId: this.newRoleMsg.roleId, name, tag, tabType, content })
            } else {
                this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
            }
        },
        adjustUserTime() {
            if (!this.currentUserTableRowMsg.userId) {
                this.$message({
                    message: '请选择需要调整的用户',
                    type: 'warning'
                })
                return
            }
            // 获取弹窗信息
            this._selectUserExpire().then(result => {
                console.log(result, 2222222222)
                this.dateTime.userTableRowMsg = result
                this.currentUserTableRowMsg = result
            })
            this.$nextTick(() => {
                this.showAdjustTime = true
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => { })
        },
        save() { // 新增角色
            let funcIds = []
            let orgIds = []
            let PCrefNodes = this.$refs.PCref.getCheckedNodes(true)
            let APPrefNodes = this.$refs.APPref.getCheckedNodes(true)
            let OrgrefNodes = this.$refs.Orgref.getCheckedNodes(true)
            PCrefNodes.forEach(value => {
                funcIds.push(value.permissionId)
            })
            APPrefNodes.forEach(value => {
                funcIds.push(value.permissionId)
            })
            OrgrefNodes.forEach(value => {
                orgIds.push(value.id)
            })
            console.log(funcIds, orgIds, 444)
            let ajaxData = {
                funcIds: funcIds,
                groupId: GROUPID,
                roleId: this.newRoleMsg.roleId,
                orgId: this.$refs.dropDownTree.checkNode.permissionId,
                orgIds: orgIds,
                roleDesc: this.roleMsgProps.roleDesc,
                roleName: this.roleMsgProps.roleName,
                userId: USERID
            }
            console.log(ajaxData, 333333333)
            this.updateBasePermissionRole(ajaxData)
            this.cancelUpdate()
        },
        cancelUpdate() {
            if (this.newRoleMsg.tabType === 'add') {
                this.$root.bus.$emit(`${this.busSign}close`, `${this.newRoleMsg.tag}`, null, this.newRoleMsg.tabType)
            } else {
                this.$root.bus.$emit(`${this.busSign}close`, `${this.newRoleMsg.tabType}${this.newRoleMsg.tag}`, null, this.newRoleMsg.tabType)
            }
        },
        addUser () {
            this.userLayerMsg.addUserLayer = true
            this.getUserTree({ userId: USERID, roleId: this.newRoleMsg.roleId, groupId: GROUPID }) // 获取批量操作用户弹窗
        },
        confirmAddUser () {
            let d1 = this.userLayerMsg.effectiveTime
            let effectiveTimeCopy = new Date(d1)
            let d2 = this.userLayerMsg.expireTime
            let expireTimeCopy = new Date(d2)
            let checkUserArr = []
            this.$refs.smartTree.getCheckedNodes().forEach(value => {
                // 如果id有role说明是角色
                /// 注意!roleMsgProps才是渲染在页面上的数据, userLayerMsg.userTableData是ajax数据
                if (!value.childOrgs) {
                    if (this.roleMsgProps.userTableData.length === 0) {
                        value.effectiveTime = new Date(effectiveTimeCopy).getTime()
                        value.expireTime = new Date(expireTimeCopy).getTime()
                        value.authorTime = new Date().getTime()
                        value.authorUser = AUTHORUSER
                        value.author = USERID
                    }
                    checkUserArr.push(value)
                }
            })
            if (this.userLayerMsg.userTableData.length === 0) {
                this.userLayerMsg.userTableData = checkUserArr
                console.log(this.userLayerMsg.userTableData, 2)
            } else {
                let rmArr = []
                for (var i = 0; i < checkUserArr.length; i++) {
                    var flag = false
                    for (var j = 0; j < this.userLayerMsg.userTableData.length; j++) {
                        if (checkUserArr[ i ].userId == this.userLayerMsg.userTableData[ j ].userId) {
                            flag = true
                            break
                        }
                    }
                    if (!flag) {
                        console.log(checkUserArr[ i ], 4444444444444)
                        this.userLayerMsg.userTableData.push(
                            Object.assign(checkUserArr[ i ], {
                                effectiveTime: new Date(this.userLayerMsg.effectiveTime).getTime(),
                                expireTime: new Date(this.userLayerMsg.expireTime).getTime(),
                                authorTime: new Date().getTime(),
                                author: USERID,
                                authorUser: AUTHORUSER
                            })
                        )
                    }
                }
                // 找出需要移除的的用户
                for (var k = 0; k < this.userLayerMsg.userTableData.length; k++) {
                    var flag2 = false
                    for (var l = 0; l < checkUserArr.length; l++) {
                        if (this.userLayerMsg.userTableData[ k ].userId == checkUserArr[ l ].userId) {
                            flag2 = true
                            break
                        }
                    }
                    if (!flag2) {
                        rmArr.push(this.userLayerMsg.userTableData[ k ].userId)
                    }
                }
                // 把找出的移除角色删除掉
                rmArr.forEach(value => {
                    for (var i = this.userLayerMsg.userTableData.length - 1; i >= 0; i--) {
                        if (value == this.userLayerMsg.userTableData[ i ].userId) {
                            this.userLayerMsg.userTableData.splice(i, 1)
                            break
                        }
                    }
                })
            }
            this.userLayerMsg.addUserLayer = false
            console.log(this.userLayerMsg.userTableData, 77777777777)
            let ajaxObj = {
                groupId: GROUPID,
                roleId: this.newRoleMsg.roleId,
                userId: USERID,
                userlist: this.userLayerMsg.userTableData
            }
            this.batchUserRoleCreate(ajaxObj).then(res => {
                // 成功过后重新拉取用户列表数据
                if (res.data.status.statusCode === 0) {
                    this._initialRoleUsers()
                } else {
                    this.$message({
                        type: 'warning',
                        message: `${res.status.statusReason}`
                    })
                }
            })
        },
        userTableRowClick(row, event, column) {
            if (this.newTabType === "update") {
                this.dateTime.userTableRowMsg = row
                this.currentUserTableRowMsg = row
                console.log(this.dateTime.userTableRowMsg, 22222222)
            }
        },
        confirmAdjustUserTime() {
            console.log(this.dateTime, 33333333333)
            this._adjustUserExpire(this.dateTime)
            this.showAdjustTime = false
        },
        _expandTable() {
            setTimeout(() => {
                this.$nextTick(() => {
                    this.tableDataFunc.forEach((value,index) => {
                        if (value.id === 'PC') {
                            this.$refs.PCref.refreshTreeTable(value.tree)
                        } else if (value.id === 'APP'){
                            this.$refs.APPref.refreshTreeTable(value.tree)
                        }
                    })
                })
            }, 500)
        },
        async updateBasePermissionRole(data) {
            let res = await updateBasePermissionRole(data)
            console.log(res, 'addRole111111111111111111')
            if (res.data.status.statusCode === 0) {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                this.$root.bus.$emit(`${this.busSign}close`, `${this.newRoleMsg.tag}`, `detail${this.newRoleMsg.tag}`, this.newRoleMsg.tabType)
            } else {
                this.$message({
                    type: 'warning',
                    message: `${res.data.status.statusReason}`
                })
            }
        },
        async _getRoleOrgTree() {
            let obj = { 'groupId': GROUPID, 'userId': USERID }
            let response = await getRoleOrgTree(obj)
            console.log(response, 8777777777777777777)
            this.treeData = response.data.result
        },
        async batchUserRoleCreate(data) {
            console.log(data, 33333333333333)
            let res = await batchUserRoleCreate(data)
            console.log(res)
            return res
        },
        async _adjustUserExpire(userTableMsg) {
            let data = {
                userId: userTableMsg.userTableRowMsg.userId,
                id: userTableMsg.userTableRowMsg.id,
                effectiveTime: userTableMsg.value1.getTime(),
                expireTime: userTableMsg.value2.getTime()
            }
            let res = await adjustUserExpire(data)
            if (res.data.result === 1) {
                this.$message({
                    message: '调整成功',
                    type: 'success'
                })
                this._initialRoleUsers()
            } else {
                this.$message({
                    message: '调整失败',
                    type: 'error'
                })
            }
        },
        async getUserTree (params) {
            let res = await getUserTree(params)
            this.$refs.smartTree.refreshTreeTable(res.data.result)
            // this.userLayerMsg.treeData = res.data.result.all
        },
        async _initialRoleMsg() {
            var data = Object.assign({ userId: 1, groupId: 1, permissionType: 'func' }, this.newRoleMsg)
            var data2 = Object.assign({ userId: 1, groupId: 1, permissionType: 'org' }, this.newRoleMsg)
            let response = await initialRoleMsg(data)
            let orgResponse = await initialRoleMsg(data2)
            Object.keys(this.roleMsgProps).forEach(value => {
                if (response.data.result[ value ]) {
                    this.roleMsgProps[ value ] = response.data.result[ value ]
                }
            })
            console.log(response, 22222222222)
            this.roleMsgProps.orgPermissions = orgResponse.data.result.orgPermissions
            this.tableDataFunc.forEach((value, index) => {
                if (value.id === 'PC' && response.data.result.funcPermissions.PC) {
                    value.tree = response.data.result.funcPermissions.PC
                    this.$refs.PCref.refreshTreeTable(response.data.result.funcPermissions.PC)
                    this.$refs.PCref.expandAllNodes()
                } else if (value.id === 'APP' && response.data.result.APP) {
                    value.tree = response.data.result.funcPermissions.APP
                    this.$refs.APPref.refreshTreeTable(response.data.result.funcPermissions.APP)
                    this.$refs.APPref.expandAllNodes()
                }
            })
            this.$refs.Orgref.refreshTreeTable(orgResponse.data.result.orgPermissions)
            this.$refs.Orgref.expandAllNodes()
        },
        async _initialRoleUsers() {
            var data = Object.assign({ groupId: 1 }, this.newRoleMsg)
            let response = await initialRoleUsers(data)
            this.roleMsgProps.userTableData = response.data.result
        },
        async _selectUserExpire() {
            console.log(this.currentUserTableRowMsg, 'this.currentUserTableRowMsgthis.currentUserTableRowMsg')
            let data = {
                userId: this.currentUserTableRowMsg.userId,
                roleId: this.newRoleMsg.roleId,
                groupId: 1
            }
            var res = await selectUserExpire(data)
            return res.data.result
        },
        async _getRolePermission(params) {
            if (params.permissionType === 'func') {
                let res = await getRolePermission(params)
                console.log(res, 123)
                this.tableDataFunc.forEach((value,index) => {
                    if (value.id === 'PC' && res.data.result.funcs.PC) {
                        value.tree = res.data.result.funcs.PC
                        this.$refs.PCref.refreshTreeTable(res.data.result.funcs.PC)
                        this.$refs.PCref.expandAllNodes()
                    } else if (value.id === 'APP' && res.data.result.APP){
                        value.tree = res.data.result.funcs.APP
                        this.$refs.APPref.refreshTreeTable(res.data.result.funcs.APP)
                        this.$refs.APPref.expandAllNodes()
                    }
                })
            } else if (params.permissionType === 'org') {
                let res = await getRolePermission(params)
                console.log(res, 456)
                this.$refs.Orgref.refreshTreeTable(res.data.result.orgs)
                this.$refs.Orgref.expandAllNodes()
            }
        },
        ...mapMutations({
            saveRoleMsg: 'PER_M_SAVE_ROLEMESSAGE'
        })
    },
    components: {
        dropDownTree
    },
    watch: {
        selectTabCode(newvalue, oldvalue) {
            // 判断是否是当前tab页面并且是详情页
            console.log(this.newRoleMsg, 666666666666)
            if (this.newRoleMsg.tabType === 'detail' && newvalue === `${this.newTabType}${this.newRoleMsg.roleId}`) {
                this._initialRoleUsers()
                this._initialRoleMsg()
            }
        }
    }
}
</script>

<style lang="scss">
.roleAdd {
    font-size: 12px;
    .form-wrapper {
        margin: 16px;
        border-bottom: 2px solid #eee;
        .remark {
            margin-top: 10px;
            .el-form-item__content {
                width: 80%;
            }
        }
        .precent30 {
            width: 27.9%;
            .el-form-item__content {
                width: 77%;
            }
            .el-select {
                width: 100%;
            }
        }
    }
    .tabs-wrapper {
        margin-bottom: 20px;
        .userTable-wrapper {
            width: 1180px;
        }
        .adjustBtn {
            margin-top: -10px;
        }
    }
}

.userMsg {
    padding-bottom: 16px;
    border-bottom: 1px solid #efefef;
    margin-bottom: 16px;
}

.el-dialog {
    width: 456px;
}

.el-message {
    z-index: 10000 !important;
}
</style>


