<template>
    <div class="userList">
        <div class="projection">
            <Button class="public-function-btn" @click="addTab('用户管理-新增', 'userAdd', 'add', 'UserAdd')">新增</Button>
            <Button class="public-function-btn" @click="addTab(`${tableData[quickBar.currentRowIndex].userName}`, `${tableData[quickBar.currentRowIndex].id}`, 'update', 'UserAlter')">修改</Button>
            <Button class="public-function-btn" @click="deleteRow(tableData[quickBar.currentRowIndex].id)">删除</Button>
            <ButtonGroup>
                <Button class="public-function-btn" @click="changEnable(tableData[quickBar.currentRowIndex].id, '启用')">启用</Button>
                <Button class="public-function-btn" @click="changEnable(tableData[quickBar.currentRowIndex].id, '停用')">停用</Button>
            </ButtonGroup>
            <Button class="public-function-btn" @click="changeLock(tableData[quickBar.currentRowIndex].id, '锁定')">锁定</Button>
            <Button class="public-function-btn" @click="changeLock(tableData[quickBar.currentRowIndex].id, '解锁')">解锁</Button>
            <Button class="public-function-btn" @click="resetPwd(quickBar.currentRowIndex)">重置密码</Button>
        </div>
        <div class="inquire">
            <el-form ref="inquireForm" :model="inquireMsg" :rules="inquireRules" class="inquire-form" :inline="true">
                <el-form-item label="注册来源" prop="source">
                    <el-select v-model.trim="inquireMsg.source" placeholder="全部" size="small" style="width: 126px;">
                        <el-option v-for="item in sourceArr" :label="item.itemName" :value="item.itemCode" :key="item.itemCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户账号" prop="userName">
                    <el-input v-model.trim="inquireMsg.userName" placeholder="请输入" size="small" style="width: 126px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.number.trim="inquireMsg.phone" placeholder="请输入" size="small" style="width: 126px;" :maxlength="11" :minlength="11"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" prop="enable">
                    <el-select v-model.trim="inquireMsg.enable" placeholder="全部" size="small" style="width: 126px;">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="停用" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="锁定状态" prop="lock">
                    <el-select v-model.trim="inquireMsg.lock" placeholder="全部" size="small" style="width: 126px;">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="锁定" :value="1"></el-option>
                        <el-option label="未锁定" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="lastbtns">
                    <span class="bee-search" @click="submitInquireForm('inquireForm', inquireMsg)">查询</span>
                </el-form-item>
                <el-form-item class="lastbtns">
                    <span class="high-inquire">高级查询</span>
                </el-form-item>
                <el-form-item class="lastbtns">
                    <span class="bee-clear" @click="resetForm('userTable')">清空</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-wrapper">
            <el-table :data="tableData" border highlight-current-row @row-click="rowClick" @current-change="currentRowChange" ref="userTable" style="width: 100%">
                <el-table-column prop="index" label="序号" type="index" width="100">
                </el-table-column>
                <el-table-column prop="orgName" label="所属组织" width="140">
                </el-table-column>
                <el-table-column prop="userNumber" label="用户编码" width="100">
                </el-table-column>
                <el-table-column prop="userName" label="用户账号" width="140">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="userDetail(`${tableData[quickBar.currentRowIndex].userName}`, `${tableData[quickBar.currentRowIndex].id}`, 'detail', 'UserDetail')">{{scope.row.userName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="identityType" label="身份类型" width="100">
                </el-table-column>
                <el-table-column prop="realName" label="真实姓名" width="100">
                </el-table-column>
                <el-table-column prop="email" label="邮箱地址" width="200">
                </el-table-column>
                <el-table-column prop="phone" label="电话号码" width="140">
                </el-table-column>
                <el-table-column prop="source" label="注册来源" width="120">
                </el-table-column>
                <el-table-column prop="effectiveDate" label="生效日期" width="140">
                    <template slot-scope="scope">
                        {{scope.row.effectiveDate | formatDate('yyyy-MM-dd')}}
                    </template>
                </el-table-column>
                <el-table-column prop="expireTime" label="失效日期" width="140">
                    <template slot-scope="scope">
                        {{scope.row.effectiveDate | formatDate('yyyy-MM-dd')}}
                    </template>
                </el-table-column>
                <el-table-column prop="enable" label="启用状态" width="100">
                    <template slot-scope="scope">
                        {{scope.row.enable === 0 ? '未启用' : scope.row.enable === 1 ? '启用' : '停用'}}
                    </template>
                </el-table-column>
                <el-table-column prop="lock" label="锁定状态" width="100">
                    <template slot-scope="scope">
                        {{scope.row.lock ? '锁定' : '未锁定'}}
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
            <el-button size="mini" @click="addTab(`${tableData[quickBar.currentRowIndex].userName}`, `${tableData[quickBar.currentRowIndex].id}`, 'update', 'UserAlter')">修改</el-button>
            <el-button size="mini" @click="deleteRow(tableData[quickBar.currentRowIndex].id)">删除</el-button>
            <el-button size="mini" @click="changEnable(tableData[quickBar.currentRowIndex].id, quickBar.enable)">{{quickBar.enable}}</el-button>
            <el-button @click="changeLock(tableData[quickBar.currentRowIndex].id, quickBar.lock)">{{quickBar.lock}}</el-button>
            <el-button @click="resetPwd(tableData[quickBar.currentRowIndex].id)">重置密码</el-button>
        </tooltip>
    </div>
</template>

<script>
import inquirePlanLayer from "@Permission/components/inquirePlanLayer/InquirePlanLayer"
import { firstRowClickMixin } from '@Permission/mixin/mixin.js'
import { initialUserTableList, userEnable, userDisable, lock, unlock, resetPassword, deleteUser, registerSource } from "@Permission/services/userService.js"
import { mapGetters, mapMutations } from 'vuex'
export default {
    mixins: [ firstRowClickMixin ],
    props: {
        busSign: {
            type: String,
            default: ""
        },
        selectTabCode: { // 当前页的tag
            type: String,
            default: ''
        }
    },
    data () {
        var validatePhone = (rule, value, callback) => {
            var reg = /^1[345678]\d{9}$/
            if (value === "") {
                callback()
            } else if (!reg.test(value)) {
                callback(new Error("请输入正确的手机格式"))
            } else {
                callback()
            }
        }
        return {
            sourceArr: [], // 注册来源数组
            tableRef: 'userTable', // 首行点击标识
            inquireMsg: {
                source: '',
                userName: '',
                phone: '',
                enable: '',
                lock: ''
            },
            inquireRules: {
                phone: [ { validator: validatePhone, trigger: "blur" }]
            },
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
            }
        }
    },
    computed: {
        ...mapGetters({
            userMsg: 'PER_G_GET_USERMESSAGE' // 获取管理员ID
        })
    },
    created () {
        this._initialUserTableList()
        this._registerSource()
    },
    methods: {
        addTab (name, tag, tabType, content) {
            if (tabType === 'update') {
                this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
            } else if (tabType === 'detail') {
                this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
            } else if (tabType === 'add') {
                this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
            }
            this.saveUserMsg({ userId: this.tableData[ this.quickBar.currentRowIndex ].id, name, tag, tabType, content })
        },
        rowClick (row, event, column) {
            if (column && column.property === 'userName' && event.target.nodeName === 'A') return
            this.$tooltip(
                {
                    top: event.clientY,
                    left: event.clientX
                },
                "costorder"
            )
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
        },
        currentRowChange (newValue, oldValue) {
            this.tableData.forEach((item, index) => {
                if (item === newValue) {
                    this.quickBar.currentRowIndex = index
                }
            })
        },
        deleteRow (id) {
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 在这里发送删除用户的ajax
                deleteUser({ userId: id }).then(r => {
                    console.log(r, 'delete11111')
                    if (r.data.status.statusCode === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this._initialUserTableList()
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `${r.data.status.statusReason}`
                        })
                    }
                })
            })
        },
        resetPwd (id) {
            this.$confirm(
                `您确定要重置“${this.tableData[ this.quickBar.currentRowIndex ].userName}”账号的密码`,
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
        resetForm (formName) {
            // 重置表单
            this.$refs.inquireForm.resetFields()
            this._initialUserTableList()
        },
        changEnable (id, btnStatus) {
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
        changeLock (id, btnLock) {
            console.log(arguments, "切换锁定状态")
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
        submitInquireForm (formName, inquireMsg) {
            this.$refs[ formName ].validate(valid => {
                if (valid) {
                    console.log(inquireMsg)
                    this._initialUserTableList(this.inquireMsg)
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
        userDetail (name, tag, tabType, content) {
            this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
            this.saveUserMsg({ userId: this.tableData[ this.quickBar.currentRowIndex ].id, name, tag, tabType, content })
        },
        handleSizeChange (pageSize) {
            this.pagination.pageSize = pageSize
            this._initialUserTableList(this.inquireMsg)
        },
        handleCurrentChange (pageNum) {
            this.pagination.pageNum = pageNum
            this._initialUserTableList(this.inquireMsg)
        },
        _resetStatus () { // 切换状态
            this._initialUserTableList().then(() => {
                this.quickBar = {
                    enable: "",
                    lock: "",
                    currentRowIndex: this.quickBar.currentRowIndex
                }
                this.$refs.userTable.setCurrentRow(this.tableData[ this.quickBar.currentRowIndex ])
            })
        },
        async _initialUserTableList (inquireMsg) {
            var res
            if (inquireMsg) {
                res = await initialUserTableList(
                    Object.assign({ managerLevel: "3" }, inquireMsg),
                    this.pagination
                )
            } else {
                res = await initialUserTableList(
                    { managerLevel: "3" },
                    this.pagination
                )
            }
            this.tableData = res.data.result.list
            this.pagination.total = res.data.result.total
        },
        async userEnable (id) {
            var res = await userEnable({ userId: id })
            console.log(res, 'userEnable')
            return res.data.result
        },
        async userDisable (id) {
            let res = await userDisable({ userId: id })
            console.log(res, 'userDisable')
            return res.data.result
        },
        async userLock (id) {
            let res = await lock({ userId: id })
            console.log(res, 'lock')
            return res.data.result
        },
        async userUnlock (id) {
            let res = await unlock({ userId: id })
            console.log(res, 'unlock')
            return res.data.result
        },
        async resetPassword (id) {
            let res = await resetPassword({ userId: id })
            console.log(res, 'resetPassword')
            return res.data.result
        },
        async _registerSource () {
            let res = await registerSource()
            this.sourceArr = res.data.result
        },
        ...mapMutations({
            saveUserMsg: 'PER_M_SAVE_USERMESSAGE'
        })
    },
    components: {
        inquirePlanLayer
    },
    watch: {
        selectTabCode (newValue, oldValue) {
            console.log(newValue, 444444444444)
            if (newValue === 'permission_userManage') {
                this._initialUserTableList()
                this._registerSource()
            }
        }
    }
}
</script>

<style lang="scss">
.userList {
  .inquire {
    width: 98%;
    margin: 16px auto 0;
    .inline-btn {
      margin-left: 10px;
      cursor: pointer;
    }
    .inquire-project {
      padding: 4px 12px;
      border: 1px solid #90979c;
      border-radius: 4px;
      margin: 0 5px;
      color: #899aa7;
      font-size: 12px;
      cursor: pointer;
    }
    .inquire-form {
      display: inline-block;
      margin-left: 20px;
      .el-form-item {
        margin-right: 0px;
        &.lastbtns {
          margin-left: 15px;
        }
        .el-form-item__content {
        }
      }
    }
    .inquire-btn {
      padding: 6px 20px;
      border: 1px solid #28a9dd;
      border-radius: 4px;
      background-color: #f6fefe;
      font-size: 14px;
    }
    .high-inquire {
      text-decoration: underline;
      color: #28a9dd;
    }
    .inquire-clear {
      color: #6a6a6a;
    }
  }
  .table-wrapper {
    width: 98%;
    margin: 0 auto;
    .block {
      margin-top: 16px;
      float: right;
    }
  }
  .inquirePlanLayer-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
}
.permission .el-form-item .el-form-item__label {
  padding-left: 10px;
}
.el-message {
  z-index: 10000 !important;
}
</style>
