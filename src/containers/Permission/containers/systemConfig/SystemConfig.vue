<template>
    <div class="systemConfig" v-if="isCache" ref="listOutBox">
        <div class="projection">
            <div v-if="showalter">
                <Button class="public-function-btn" @click="alter">修改</Button>
                <Button class="public-function-btn" @click="refresh">刷新</Button>
            </div>
            <div v-if="!showalter">
                <Button class="public-function-btn" @click="save">保存</Button>
                <Button class="public-function-btn" @click="cancel">取消</Button>
            </div>
        </div>
        <div class="form-wrapper">
            <el-form :inline="true" :model="configForm" ref="ruleForm">
                <el-form-item label="系统平台">
                    <el-select v-model="configForm.subject" placeholder="全部" size="small">
                        <el-option label="PC" value="PC"></el-option>
                        <el-option label="APP" value="APP"></el-option>
                        <el-option label="RF" value="RF"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限类型">
                    <el-select v-model="configForm.type" placeholder="全部" size="small">
                        <el-option label="菜单" value="菜单"></el-option>
                        <el-option label="页签" value="页签"></el-option>
                        <el-option label="按钮" value="按钮"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限名称">
                    <el-input v-model="configForm.resourceName" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="bee-search" @click="search">查询</span>
                </el-form-item>
                <el-form-item>
                    <span class="bee-clear" @click="resetForm('ruleForm')">清空</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-wrapper">
            <el-table
                :data="tableData"
                @expand="_expandTable"
                :default-expand-all="true"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-table :data="model" border>
                            <fw-tree-grid
                                :ref="scope.row.ref"
                                prop="resourceName"
                                label="权限名称"
                                :expand-all="false"
                                checked-key="state"
                                :autoExpandCheckedNodes="true"
                                :enable-check="treeGrid.showCheckbox"
                                child-key="childFuncs"
                                width="400">
                            </fw-tree-grid>
                            <el-table-column prop="state" label="是否有权限"   width="180">
                                <template slot-scope="scope">
                                    {{scope.row.state === true ? '√' : '×'}}
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
    </div>
</template>

<script>
const GROUPID = 1
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
import { getGroupFuncTree, updateGroupFunc } from '@Permission/services/systemService.js'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data() {
        return {
            titleName: '系统配置',
            system: '/permission',
            tag: 'permission_systemConfig',
            tabType: '',
            configForm: {
                groupId: GROUPID,
                platfrom: '',
                permissionType: '',
                resourceName: ''
            },
            model: [],
            treeGrid: {
                showCheckbox: false
            },
            showalter: true,
            tableData: [{id: 'PC',tree:[], ref: 'PCref'}, {id: 'APP', tree:[], ref: 'APPref'}]
        }
    },
    created() {
        // 是展示全部就把第二参数传为true
        this._getGroupFuncTree({groupId: GROUPID}, true)
    },
    methods: {
        alter() {
            this.treeGrid.showCheckbox = true
            this.showalter = false
        },
        save() {
            this.showalter = true
            console.log(this.$refs)
            console.log(this.$refs.PCref.getAllNodes())
            let ajaxChooseArr = []
            this.$refs.PCref.getAllNodes().forEach(value => {
                ajaxChooseArr.push({id: value.id, status: value.state === true ? 1 : 0})
            })
            console.log(ajaxChooseArr, 'ajaxChooseArr2222222222')
            this.updateGroupFunc(ajaxChooseArr)
            this.treeGrid.showCheckbox = false

        },
        cancel() {
            this.showalter = true
            this.treeGrid.showCheckbox = false
        },
        refresh() {
            this._getGroupFuncTree({groupId: GROUPID}, true)
        },
        resetForm(formName) {
            this.configForm = {
                groupId: GROUPID,
                subject: '',
                type: '',
                permissionName: ''
            }
            this._getGroupFuncTree({groupId: GROUPID}, true)
        },
        search () {
            let ajaxFormMsg = {}
            for(var key in this.configForm) {
                if (this.configForm[key] !== "") {
                    ajaxFormMsg[key] = this.configForm[key]
                }
            }
            this._getGroupFuncTree(ajaxFormMsg, false)
            console.log(ajaxFormMsg)
        },
        _expandTable(row,expanded) {
            console.log(row, expanded,1111111111112221)
            if (!expanded) return
            let ajaxFormMsg = {}
            for(var key in this.configForm) {
                if (this.configForm[key] !== "") {
                    ajaxFormMsg[key] = this.configForm[key]
                }
            }
            this._getGroupFuncTree(ajaxFormMsg, false)
        },
        async updateGroupFunc(data) {
            let res = await updateGroupFunc(data)
            console.log(res, 1111111111111)
            if (res.data.status.statusCode === 0) {
                this._getGroupFuncTree({groupId: GROUPID}, false)
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: `${res.data.status.statusReason}`
                })
            }
        },
        async _getGroupFuncTree(params, isFirstRequest) {
            let res = await getGroupFuncTree(params)
            console.log(res.data.result, 55555555555555555)
            if (isFirstRequest) {
                this.tableData.forEach((value,index) => {
                    if (value.id === 'PC' && res.data.result.PC) {
                        this.$refs.PCref.refreshTreeTable(res.data.result.PC)
                        this.$refs.PCref.expandAllNodes()
                    } else if (value.id === 'APP' && res.data.result.APP){
                        this.$refs.APPref.refreshTreeTable(res.data.result.PC)
                        this.$refs.APPref.expandAllNodes()
                    }
                })
            } else {
                if (!res.data.result.PC) {
                    this.tableData.forEach((value,index) => {
                        if (value.id === 'PC') {
                            this.$refs.PCref.refreshTreeTable([])
                        }
                    })
                }
                if (!res.data.result.APP) {
                    this.tableData.forEach((value,index) => {
                        if (value.id === 'APP') {
                            this.$refs.APPref.refreshTreeTable([])
                        }
                    })
                }
                this.tableData.forEach((value,index) => {
                    if (value.id === 'PC' && res.data.result.PC) {
                        this.$refs.PCref.refreshTreeTable(res.data.result.PC)
                        this.$refs.PCref.expandAllNodes()
                    } else if (value.id === 'APP' && res.data.result.APP){
                        this.$refs.APPref.refreshTreeTable(res.data.result.PC)
                        this.$refs.APPref.expandAllNodes()
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
.systemConfig {
    .form-wrapper {
        margin-top: 16px;
        margin-left: 16px;
    }
}
.el-message {
    z-index: 10000!important;
}
</style>


