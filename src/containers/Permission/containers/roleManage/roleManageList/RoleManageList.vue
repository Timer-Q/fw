<template>
    <div class="roleManageList">
        <div class="projection">
            <Button class="public-function-btn" @click="addTab('角色管理-新增', 'roleAdd', 'add', 'RoleAdd')">新增</Button>
            <Button class="public-function-btn" @click="addTab(`${tableData[quickBar.currentRowIndex].roleName}`, `${tableData[quickBar.currentRowIndex].id}`, 'update', 'RoleAlter')">修改</Button>
            <Button class="public-function-btn" @click="deleteRow(quickBar.currentRowIndex)">删除</Button>
            <Button class="public-function-btn" @click="refresh">刷新</Button>
        </div>
        <div class="permission-main">
            <div class="form-wrapper">
                <el-form ref="inquireForm" :model="formDate" :inline="true">
                    <el-form-item label="所属组织">
                        <dropDownTree ref="dropDownTree" :treeData="treeData"></dropDownTree>
                    </el-form-item>
                    <el-form-item label="角色编码">
                        <el-input v-model="formDate.roleCode" size="small" placeholder="请输入" style="width: 130px;"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称">
                        <el-input v-model="formDate.roleName" size="small" placeholder="请输入" style="width: 130px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class="bee-search" @click="searchList">查询</span>
                    </el-form-item>
                    <el-form-item class="lastbtns">
                        <span class="bee-clear" @click="clear">清空</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table-wrapper" style="width: 80%;">
                <el-table :data="tableData" border highlight-current-row @row-click="rowClick" @current-change="currentRowChange" ref="roleTable">
                    <el-table-column prop="index" label="序号" type="index" width="45">
                    </el-table-column>
                    <el-table-column prop="orgName" label="所属组织">
                    </el-table-column>
                    <el-table-column prop="roleCode" label="角色编码">
                        <template slot-scope="scope">
                            {{'JSBM' + scope.row.id}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleName" label="角色名称">
                        <template slot-scope="scope">
                            <a href="javascript:;">{{scope.row.roleName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleDesc" label="备注">
                    </el-table-column>
                </el-table>
                <div class="pagination-wrapper clearfix">
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 40, 50]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="roleListMsg.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <tooltip name="costorder">
                <el-button size="mini" @click="addTab(tableData[quickBar.currentRowIndex].roleName, tableData[quickBar.currentRowIndex].id, 'detail', 'RoleDetail')">查看</el-button>
                <el-button size="mini" @click="addTab(tableData[quickBar.currentRowIndex].roleName, tableData[quickBar.currentRowIndex].id, 'update', 'RoleAlter')">修改</el-button>
                <el-button size="mini" @click="deleteRow(tableData[quickBar.currentRowIndex])">删除</el-button>
            </tooltip>
        </div>
    </div>
</template>

<script>
const USERID = 1
const GROUPID = 1
import { mapMutations } from 'vuex'
import { firstRowClickMixin } from '@Permission/mixin/mixin.js'
import dropDownTree from '@Permission/components/dropDownTree/DropDownTree'
import { getRoleTableList, getRoleOrgTree } from '@Permission/services/roleService.js'
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
            tableRef: 'roleTable',
            roleListMsg: {
                total: 0
            },
            tableData: [], // 列表数据
            treeData: [], // 传给下拉组织树的数据
            quickBar: {
                currentRowIndex: ''
            },
            formDate: {
                roleCode: '',
                roleName: ''
            },
            searchData: {}, // 搜索条件
            pagination: {
                pageSize: 20,
                currentPage: 1
            }
        }
    },
    created() {
        this._loadAllTableList()
        this._getRoleOrgTree()
    },
    methods: {
        addTab(name, tag, tabType, content) {
            if (tabType === 'update') {
                this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
            } else if (tabType === 'detail') {
                this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
            } else if (tabType === 'add'){
                this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
            }
            if (tabType === 'add') {
                this.saveRoleMsg({ roleId: null, name, tag, tabType, content })
            } else {
                this.saveRoleMsg({ roleId: this.tableData[this.quickBar.currentRowIndex].id, name, tag, tabType, content })
            }
        },
        rowClick(row, event, column) {
            if (column && column.property === 'roleName'  && event.target.nodeName === 'A') {
                this.saveRoleMsg({ roleId: this.tableData[this.quickBar.currentRowIndex].id })
                this.addTab(this.tableData[this.quickBar.currentRowIndex].roleName, this.tableData[this.quickBar.currentRowIndex].id, 'detail', 'RoleDetail')
                return
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
        async searchList() {
            let orgList = []
            this.$refs.dropDownTree.checkNodeList.forEach(value => {
                orgList.push(value.permissionId)
            })
            this.searchData = {
                'groupId': GROUPID,
                'userId': USERID,
                'pageNum': this.pagination.currentPage,
                'pageSize': this.pagination.pageSize,
                'roleCode': this.formDate.roleCode,
                'roleName': this.formDate.roleName,
                'list': orgList
            }
            try {
                let response = await getRoleTableList(this.searchData)
                this.tableData = response.data.result.list
            } catch (error) {
                console.log(error)
            }
        },
        clear() {
            this.formDate.roleCode = ''
            this.formDate.roleName = ''
            this.$refs.dropDownTree.resetChecked()
            this._loadAllTableList()
        },
        deleteRow(index) { // 删除用户
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index, 1)
                // 在这里发送删除用户的ajax
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
        },
        resetPwd(index) {
            this.$confirm(`您确定要重置“${this.tableData[index].userAccount}”账号的密码`, '密码重置', {
                confirmButtonText: '确定',
                cancelButtonText: '暂不重置',
                type: 'warning'
            }).then(() => {
                // 在这里发送重置密码的ajax
                this.$confirm(`重置后的密码为“${12345678}”`, '密码重置', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            })
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val
        },
        async handleCurrentChange(val) {
            this.pagination.currentPage = val
            let orgList = []
            this.$refs.dropDownTree.checkNodeList.forEach(value => {
                orgList.push(value.permissionId)
            })
            let data = {
                'groupId': GROUPID,
                'userId': USERID,
                'pageNo': this.pagination.currentPage,
                'pageSize': this.pagination.pageSize,
                'roleCode': this.formDate.roleCode,
                'roleName': this.formDate.roleName,
                'list': orgList
            }
            try {
                let response = await getRoleTableList(data)
                this.tableData = response.data.result.list
            } catch (error) {
                console.log(error)
            }
        },
        refresh() {
            this._loadAllTableList()
            this._getRoleOrgTree()
        },
        async _loadAllTableList() {
            let data = {
                "groupId": GROUPID,
                "list": [],
                "pageNo": 1,
                "pageSize": this.pagination.pageSize,
                "roleCode": "",
                "roleName": "",
                "userId": 1
            }
            try {
                let response = await getRoleTableList(data)
                this.tableData = response.data.result.list
                this.roleListMsg.total = response.data.result.total
            } catch (error) {
                console.log(error)
            }
        },
        async _getRoleOrgTree() {
            let obj = { 'groupId': 1, 'userId': 1 }
            let response = await getRoleOrgTree(obj)
            console.log(response, 8777777777777777777)
            this.treeData = response.data.result
        },
        ...mapMutations({
            saveRoleMsg: 'PER_M_SAVE_ROLEMESSAGE'
        })
    },
    watch: {
        selectTabCode (newValue, oldValue) {
            if (newValue === 'permission_roleManage') {
                this._loadAllTableList()
                this._getRoleOrgTree()
            }
        }
    },
    components: {
        dropDownTree
    }
}
</script>

<style lang="scss">
.form-wrapper {
    margin-top: 16px;
}
.block {
    float: right;
    margin-top: 16px;
}
</style>