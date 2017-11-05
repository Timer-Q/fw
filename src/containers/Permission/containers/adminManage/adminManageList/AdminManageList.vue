<template>
    <div class="adminMangeList">
        <div class="projection">
            <Button class="public-function-btn" @click="addTab('管理员名称-新增', 'adminAdd', 'add', 'AdminTemplate')">新增</Button>
            <Button class="public-function-btn" @click="addTab(`${tableData[quickBar.currentRowIndex].userName}`, `${tableData[quickBar.currentRowIndex].id}`, 'update', 'AdminTemplate')">修改</Button>
            <Button class="public-function-btn" @click="deleteRow(tableData[quickBar.currentRowIndex].id)">删除</Button>
            <ButtonGroup>
                <Button class="public-function-btn" @click="changEnable(tableData[quickBar.currentRowIndex].id, '启用')">启用</Button>
                <Button class="public-function-btn" @click="changEnable(tableData[quickBar.currentRowIndex].id, '停用')">停用</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button class="public-function-btn" @click="changeLock(tableData[quickBar.currentRowIndex].id, '锁定')">锁定</Button>
                <Button class="public-function-btn" @click="changeLock(tableData[quickBar.currentRowIndex].id, '解锁')">解锁</Button>
            </ButtonGroup>
            <Button class="public-function-btn" @click="resetPwd(tableData[quickBar.currentRowIndex].id)">重置密码</Button>
        </div>
        <div class="form-wrapper">
            <el-form :inline="true" :model="adminMsg" class="demo-form-inline" ref="adminMsg">
                <el-form-item label="管理员类型">
                    <el-select v-model="adminMsg.managerLevel" size="small" style="width: 128px">
                        <el-option label="全部" value="0,1,2"></el-option>
                        <el-option label="全局管理员" value="1"></el-option>
                        <el-option label="集团管理员" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属组织">
                    <dropDownTree ref="dropDownTree" :showCheckbox="false" width="100%" :treeData="orgDropTreeData"></dropDownTree>
                </el-form-item>
                <el-form-item label="管理员编码">
                    <el-input placeholder="请输入" v-model="adminMsg.userNumber" size="small" style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item label="管理员名称">
                    <el-input placeholder="请输入" v-model="adminMsg.userName" size="small" style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item label="管理员手机号">
                    <el-input placeholder="请输入" v-model="adminMsg.phone" size="small" style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="bee-search" @click="searchList">查询</span>
                </el-form-item>
                <el-form-item>
                    <span class="bee-clear" @click="resetForm('adminMsg')">清空</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-wrapper">
            <el-table :data="tableData" border highlight-current-row @row-click="rowClick" @current-change="currentRowChange" ref="adminTable" style="margin: 0 16px;">
                <el-table-column prop="index" label="序号" type="index" width="100">
                </el-table-column>
                <el-table-column prop="userNumber" label="管理员编码" width="140">
                </el-table-column>
                <el-table-column prop="userName" label="管理员名称" width="140">
                    <template slot-scope="scope">
                        <a href="javascript:;">{{scope.row.userName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="identityType" label="管理员类型" width="140">
                    <template slot-scope="scope">
                        {{scope.row.managerLevel === 0 ? '超级管理员' : scope.row.managerLevel === 1 ? '全局管理员' : '集团管理员'}}
                    </template>
                </el-table-column>
                <el-table-column prop="orgName" label="所属组织" width="100">
                </el-table-column>
                <el-table-column prop="realName" label="真实姓名" width="130">
                </el-table-column>
                <el-table-column prop="email" label="邮箱地址" width="170">
                </el-table-column>
                <el-table-column prop="phone" label="电话号码" width="140">
                </el-table-column>
                <el-table-column prop="startUseStatus" label="启用状态" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.enable === 0 ? '非启用' : scope.row.enable === 1 ? '启用' : '停用'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="lock" label="锁定状态" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.lock ? '锁定' : '未锁定'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="200">
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper clearfix">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageNum" :page-sizes="[10, 20, 40, 50]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <tooltip name="costorder">
            <el-button size="mini" @click="addTab(`${tableData[quickBar.currentRowIndex].userName}`, `${tableData[quickBar.currentRowIndex].id}`, 'detail', 'AdminTemplate')">查看</el-button>
            <el-button size="mini" @click="addTab(`${tableData[quickBar.currentRowIndex].userName}`, `${tableData[quickBar.currentRowIndex].id}`, 'update', 'AdminTemplate')">修改</el-button>
            <el-button size="mini" @click="deleteRow(tableData[quickBar.currentRowIndex].id)">删除</el-button>
            <el-button size="mini" @click="changEnable(tableData[quickBar.currentRowIndex].id, quickBar.enable)">{{quickBar.enable}}</el-button>
            <el-button size="mini" @click="changeLock(tableData[quickBar.currentRowIndex].id, quickBar.lock)">{{quickBar.lock}}</el-button>
            <el-button size="mini" @click="resetPwd(tableData[quickBar.currentRowIndex].id)">重置密码</el-button>
        </tooltip>
    </div>
</template>

<script>
import { firstRowClickMixin } from '@Permission/mixin/mixin.js'
import dropDownTree from '@Permission/components/dropDownTree/DropDownTree'
import { initialAdminTableList, initialAdminOrg, userEnable, userDisable, lock, unlock, resetPassword, deleteAdmin } from '@Permission/services/adminService.js'
import { mapMutations } from 'vuex'
export default {
    mixins: [firstRowClickMixin],
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
            tableRef: 'adminTable', // 给mixin提供的tableRef区分
            adminMsg: {
                managerLevel: '',
                userNumber: '',
                userName: '',
                phone: ''
            },
            tableRef: 'adminTable',
            tableData: [],
            quickBar: {
                enable: "",
                lock: "",
                currentRowIndex: 0
            },
            pagination: {
                pageSize: 20,
                pageNum: 1,
                total: 0
            },
            searchResult: {
            },
            orgDropTreeData: [],
            searchMsg: {
                itemSearchMsg: {} // 根据此搜索信息搜索，暂存作用
            }
        }
    },
    created() {
        this._initAllData()
    },
    methods: {
        addTab(name, tag, tabType, content) {
            if (tabType === 'update') {
                this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
            } else if (tabType === 'detail') {
                this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
                // this.saveAdminMsg({ roleId: this.tableData[this.quickBar.currentRowIndex].id, name, tag, tabType, content })
            } else if (tabType === 'add'){
                this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
            }
            this.saveAdminMsg({ adminId: this.tableData[this.quickBar.currentRowIndex].id, name, tag, tabType, content })
        },
        userTabAdd(tabType) {
            this.$root.bus.$emit('userTabAdd', tabType)
        },
        rowClick(row, event, column) {
            if (column && column.property === 'userName' && event.target.nodeName === 'A') {
                this.saveAdminMsg({ adminId: this.tableData[this.quickBar.currentRowIndex].id }, this.tableData[this.quickBar.currentRowIndex].userName, this.tableData[this.quickBar.currentRowIndex].id, 'detail', 'AdminTemplate')
                this.addTab(this.tableData[this.quickBar.currentRowIndex].userName, this.tableData[this.quickBar.currentRowIndex].id, 'detail', 'AdminTemplate')
                return
            }
            switch (row.enable) {
                case 0:
                this.quickBar.enable = "启用"
                break
                case 1:
                this.quickBar.enable = "停用"
                break
                case 2:
                this.quickBar.enable = "启用"
                break
            }
            switch (row.lock) {
                case true:
                this.quickBar.lock = "解锁"
                break
                case false:
                this.quickBar.lock = "锁定"
                break
            }
            this.$tooltip({
                top: event.clientY,
                left: event.clientX
            }, 'costorder')
        },
        currentRowChange(newValue, oldValue) {
            this.tableData.forEach((item, index) => {
                if (item === newValue) {
                    this.quickBar.currentRowIndex = index
                }
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
        resetPwd(id) {
            this.$confirm(
                `您确定要重置“${this.tableData[this.quickBar.currentRowIndex].userName}”账号的密码`,
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
        deleteRow(id) { // 删除用户
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 在这里发送删除用户的ajax
                deleteAdmin({userId: id}).then(r => {
                    console.log(r, 'delete11111')
                    if (r.data.status.statusCode === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this._initAllData()
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `${r.data.status.statusReason}`
                        })
                    }
                })
            })
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this._initialAdminTableList(this.searchMsg.itemSearchMsg)
        },
        handleCurrentChange(pageNum) {
            this.pagination.pageNum = pageNum
            this._initialAdminTableList(this.searchMsg.itemSearchMsg)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields() // ??? 不管用
            this.adminMsg = {
                managerLevel: '',
                userNumber: '',
                userName: '',
                phone: ''
            }
            this.searchResult = {}
            this.$refs.dropDownTree.resetChecked()
            this._initialAdminTableList()
        },
        _initAllData() {
            this._initialAdminTableList()
            this._initialAdminOrg()
        },
        _resetStatus() { // 切换状态
            this._initialAdminTableList().then(() => {
                this.quickBar = {
                    enable: "",
                    lock: "",
                    currentRowIndex: this.quickBar.currentRowIndex
                }
                this.$refs.adminTable.setCurrentRow(this.tableData[this.quickBar.currentRowIndex])
            })
        },
        async searchList() {
            Object.keys(this.adminMsg).forEach(value => {
                this.searchMsg.itemSearchMsg[value] = this.adminMsg[value]
            })
            this.searchMsg.itemSearchMsg.orgId = this.$refs.dropDownTree.checkNode.permissionId
            console.log(this.searchMsg.itemSearchMsg, 888888888888)
            this._initialAdminTableList(this.searchMsg.itemSearchMsg)
        },
        async _initialAdminTableList(data = {managerLevel: "0,1,2"}) {
            var res = await initialAdminTableList(data, this.pagination)
            this.tableData = res.data.result.list
            this.pagination.total = res.data.result.total
        },
        async _initialAdminOrg() {
            var res = await initialAdminOrg({userId: 1, groupId: 1, permissionType: 'org'})
            this.orgDropTreeData = res.data.result.orgs
        },
        async userEnable(id) {
            var res = await userEnable({userId: id})
            console.log(res, 'userEnable')
            return res.data.result
        },
        async userDisable(id) {
            let res = await userDisable({userId: id})
            console.log(res, 'userDisable')
            return res.data.result
        },
        async userLock(id) {
            let res = await lock({userId: id})
            console.log(res, 'lock')
            return res.data.result
        },
        async userUnlock(id) {
            let res = await unlock({userId: id})
            console.log(res, 'unlock')
            return res.data.result
        },
        async resetPassword(id) {
            let res = await resetPassword({userId: id})
            console.log(res, 'resetPassword')
            return res.data.result
        },
        ...mapMutations({
            saveAdminMsg: 'PER_M_SAVE_ADMINMESSAGE'
        })
    },
    watch: {
        selectTabCode (newValue, oldValue) {
            if (newValue === 'permission_adminManage') {
                this._initAllData()
            }
        }
    },
    components: {
        dropDownTree
    }
}
</script>

<style lang="scss">
.adminMangeList {
    .form-wrapper {
        color: #333;
    }
    .table-wrapper {
        width: min-content;
        .el-table {
            width: min-content;
        }
        .block {
            float: right;
            margin-top: 16px;
        }
    }
}
.v-tooltip {
    button:hover {
        span {
            color: #28a7e1;
        }
    }
}
</style>
