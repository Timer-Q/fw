<template>
    <div class="roleAdd">
        <div class="projection" v-if="newTabType === 'add'">
            <Button class="public-function-btn" @click="save">保存</Button>
            <Button class="public-function-btn">保存并新增</Button>
            <Button class="public-function-btn" @click="cancelUpdate">取消</Button>
        </div>
        <div class="projection" v-if="newTabType === 'update'">
            <Button class="public-function-btn" @click="toUpdate">保存</Button>
            <Button class="public-function-btn" @click="cancelUpdate">取消</Button>
        </div>
        <div class="projection" v-if="newTabType === 'detail'">
            <Button class="public-function-btn">批量分配用户</Button>
            <Button class="public-function-btn" @click="addTab(newRoleMsg.name, newRoleMsg.tag, 'update', 'roleAdd')">修改</Button>
            <Button class="public-function-btn">删除</Button>
        </div>
        <div class="form-wrapper">
            <el-form :inline="true" :model="roleMsgProps" class="demo-form-inline">
                <el-form-item label="所属组织" class="precent30">
                    <dropDownTree ref="dropDownTree" :showCheckbox="roleMsgProps.orgTreeShowCheckbox" :checkStrictly="true" :checkNodeProp="roleMsgProps" :formReadOnly="formReadOnly" :treeData="treeData" width="100%"></dropDownTree>
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
                                    <el-table border>
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
                                        <el-table-column prop="check" label="是否有权限"   width="180">
                                            <template slot-scope="scope">
                                                {{scope.row.check === true ? '√' : '×'}}
                                            </template>
                                        </el-table-column>
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
                            tree-key="permissionId"
                            :autoExpandCheckedNodes="true"
                            :enable-check="true"
                            child-key="childOrgs"
                            width="400">
                        </fw-tree-grid>
                        <el-table-column prop="check" label="是否有权限"   width="180">
                            <template slot-scope="scope">
                                {{scope.row.check === true ? '√' : '×'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="orgType" label="组织类型">
                            <template slot-scope="scope">
                                {{scope.row.orgType}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="用户" name="user" v-if="newTabType != 'add'">
                    <div class="adjustBtn" v-if="newTabType === 'update'">
                        <Button class="public-function-btn">调整用户</Button>
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
    </div>
</template>

<script>
const GROUPID = 1
const USERID = 1
import { mapGetters, mapMutations } from 'vuex'
import dropDownTree from '@Permission/components/dropDownTree/DropDownTree'
import { initialRoleMsg, initialRoleUsers, selectUserExpire, adjustUserExpire, getRolePermission, getRoleOrgTree, updateBasePermissionRole } from '@Permission/services/roleService.js'
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
                orgName: '',
                roleCode: '',
                roleName: '',
                roleDesc: '',
                funcPermissions: null,
                orgPermissions: null,
                orgTreeShowCheckbox: false,
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
        // // 如果是修改就传递数据
        if (this.newTabType === 'update' || this.newTabType === 'detail') {
            // 将prop中的数据动态添加到本组件里面的data中
            this._initialRoleMsg()
            this._initialRoleUsers()
        }
        if (this.newTabType === 'add') {
            let params1 = {
                userId: 2160092,
                roleId: 0,
                groupId: 1,
                permissionType: 'func'
            }
            let params2 = {
                userId: 2160092,
                roleId: 0,
                groupId: 1,
                permissionType: 'org'
            }
            this._getRolePermission(params1)
            this._getRolePermission(params2)
            this._getRoleOrgTree()
        }
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
            if (!this.currentUserTableRowMsg) {
                this.$message({
                    message: '请选择需要调整的用户',
                    type: 'warning'
                })
                return
            }
            this._selectUserExpire().then(result => {
                console.log(result, 'resultresultresult22232')
                this.dateTime.userTableRowMsg = result
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
                orgIds.push(value.permissionId)
            })
            console.log(OrgrefNodes, 'OrgrefNodesOrgrefNodes')
            console.log(funcIds, orgIds, 444)
            let ajaxData = {
                funcIds: funcIds,
                groupId: GROUPID,
                roleId: 0,
                orgId: this.$refs.dropDownTree.checkNode.permissionId,
                orgIds: orgIds,
                roleDesc: this.roleMsgProps.roleDesc,
                roleName: this.roleMsgProps.roleName,
                userId: USERID
            }
            console.log(ajaxData, 333333333)
            this.updateBasePermissionRole(ajaxData)
        },
        toUpdate() {
            // 在这里发送ajax
            this.$root.bus.$emit(`${this.busSign}updated`, `update${this.newRoleMsg.tag}`, `detail${this.newRoleMsg.tag}`)
        },
        cancelUpdate() {
            this.$root.bus.$emit(`${this.busSign}close`, `${this.newRoleMsg.tag}`, `detail${this.newRoleMsg.tag}`, this.newRoleMsg.tabType)
        },
        userTableRowClick(row, event, column) {
            if (this.newTabType === "update") {
                this.currentUserTableRowMsg = row
            }
        },
        addUser () {
            this.userLayerMsg.addUserLayer = true
            this.getUserTree({ userId: USERID, roleId: this.newRoleMsg.roleId, groupId: GROUPID }) // 获取批量操作用户弹窗
        },
        confirmAdjustUserTime() {
            console.log(this.dateTime.userTableRowMsg, 33333333333)
            this._adjustUserExpire(this.dateTime.userTableRowMsg)
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
                    message: '新增角色成功!'
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
        async _adjustUserExpire(userTableMsg) {
            let data = {
                userId: userTableMsg.userId,
                id: userTableMsg.id,
                effectiveTime: userTableMsg.effectiveTime,
                expireTime: userTableMsg.expireTime
            }
            let res = await adjustUserExpire(data)
            if (res.data.result === 1) {
                this.$message({
                    message: '调整成功',
                    type: 'success'
                })
            } else {
                this.$message({
                    message: '调整失败',
                    type: 'error'
                })
            }
        },
        async _initialRoleMsg() {
            var data = Object.assign({ userId: 1, groupId: 1, permissionType: 'func' }, this.newRoleMsg)
            var data2 = Object.assign({ userId: 1, groupId: 1, permissionType: 'org' }, this.newRoleMsg)
            let response = await initialRoleMsg(data)
            let orgResponse = await initialRoleMsg(data2)
            Object.keys(this.roleMsgProps).forEach(value => {
                if (response.data.result[value]) {
                    this.roleMsgProps[value] = response.data.result[value]
                }
            })
            this.roleMsgProps.orgPermissions = orgResponse.data.result.orgPermissions
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
                roleId: 14,
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


