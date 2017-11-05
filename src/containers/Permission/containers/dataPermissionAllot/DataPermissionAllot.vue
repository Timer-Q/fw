<template>
    <div class="dataPermissionAllot" v-if="isCache" ref="listOutBox">
        <div class="projection">
            <div v-if="!showSave">
                <Button class="public-function-btn" @click="changePermission">权限调整</Button>
                <Button class="public-function-btn" @click="alter">修改</Button>
            </div>
            <div v-if="showSave">
                <Button class="public-function-btn" @click="save">保存</Button>
                <Button class="public-function-btn" @click="cancel">取消</Button>
            </div>
        </div>
        <div class="tabs-wrapper bee-tabs-wrapper">
            <el-tabs v-model="tabActiveName" type="card" class="bee-tabs">
                <el-tab-pane label="角色" name="role">
                    <div class="form-wrapper">
                        <el-form ref="inquireForm" :model="roleFormDate" :inline="true">
                            <el-form-item label="角色名称">
                                <el-select placeholder="请输入/选择" size="small" style="width: 126px;" v-model="roleFormDate.roleName">
                                    <el-option label="org Tree" value="orgTree">orgTree</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="管理维度">
                                <el-select placeholder="全部" size="small" style="width: 126px;" v-model="roleFormDate.manageArea">
                                    <el-option label="区域" value="区域">区域</el-option>
                                    <el-option label="客户" value="客户">客户</el-option>
                                    <el-option label="供应商" value="供应商">供应商</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <span class="bee-search">查询</span>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="inqMaintainTable-wrapper">
                        <inqMaintainTable :dataPermissionTableHead="roleTable.dataPermissionTableHead" :dataPermissionTableData="roleTable.dataPermissionTableData" :lockCheckbox="roleTable.lockCheckbox">
                        </inqMaintainTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="用户" name="user">
                    <div class="form-wrapper">
                        <el-form ref="inquireForm" :model="userFormDate" :inline="true">
                            <el-form-item label="用户名称">
                                <el-select placeholder="请输入/选择" size="small" style="width: 126px;" v-model="roleFormDate.userName">
                                    <el-option label="org Tree" value="orgTree">orgTree</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="管理维度">
                                <el-select placeholder="全部" size="small" style="width: 126px;" v-model="roleFormDate.manageArea">
                                    <el-option label="区域" value="区域">区域</el-option>
                                    <el-option label="客户" value="客户">客户</el-option>
                                    <el-option label="供应商" value="供应商">供应商</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <span class="bee-search">查询</span>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="inqMaintainTable-wrapper">
                        <inqMaintainTable :dataPermissionTableHead="userTable.dataPermissionTableHead" :dataPermissionTableData="userTable.dataPermissionTableData" :lockCheckbox="roleTable.lockCheckbox">
                        </inqMaintainTable>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
import inqMaintainTable from '@Permission/components/inqMaintainTable/InqMaintainTable'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data() {
        return {
            titleName: '数据权限查询',
            system: '/permission',
            tag: 'permission_dataPermissionAllot',
            tabType: '',
            showSave: false,
            tempRoleTableData: [],
            roleTable: {
                dataPermissionTableHead: [
                    { name: '序号', width: '44px' },
                    { name: '类别/个体', width: '82px' },
                    { name: '查询', width: '68px', checkbox: true, checked: false, indeterminate: false },
                    { name: '维护', width: '69px', checkbox: true, checked: false, indeterminate: false },
                    { name: '授权人', width: '69px' },
                    { name: '授权时间', width: '157px' }
                ],
                dataPermissionTableData: [
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    }
                ]
            },
            tempUserTableData: [],
            userTable: {
                dataPermissionTableHead: [
                    { name: '序号', width: '44px' },
                    { name: '类别/个体', width: '82px' },
                    { name: '查询', width: '68px', checkbox: true, checked: false, indeterminate: false },
                    { name: '维护', width: '69px', checkbox: true, checked: false, indeterminate: false },
                    { name: '授权人', width: '69px' },
                    { name: '授权时间', width: '157px' }
                ],
                dataPermissionTableData: [
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        allotType: '按类别',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    }
                ]
            },
            roleFormDate: {
                roleName: '',
                manageArea: '客户'
            },
            userFormDate: {
                userName: '',
                manageArea: '客户'
            },
            tabActiveName: 'role'
        }
    },
    methods: {
        changePermission() {
            console.log('权限调整')
        },
        alter() {
            this.showSave = true
            this.tempRoleTableData = JSON.parse(JSON.stringify(this.roleTable.dataPermissionTableData))
            this.tempUserTableData = JSON.parse(JSON.stringify(this.userTable.dataPermissionTableData))
            this.roleTable.lockCheckbox = false
            this.userTable.lockCheckbox = false
        },
        save() {
            this.showSave = false
            this.roleTable.lockCheckbox = true
            this.userTable.lockCheckbox = true
        },
        cancel() {
            this.showSave = false
            this.roleTable.dataPermissionTableData = this.tempRoleTableData
            this.userTable.dataPermissionTableData = this.tempUserTableData
            this.roleTable.lockCheckbox = true
            this.userTable.lockCheckbox = true
        }
    },
    components: {
        inqMaintainTable
    }
}
</script>

<style lang="scss">

</style>


