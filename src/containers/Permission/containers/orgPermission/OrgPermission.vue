<template>
    <div class="orgPermission" v-if="isCache" ref="listOutBox">
        <div class="form-wrapper">
            <el-form :inline="true" :model="dataForm">
                <el-form-item label="组织名称">
                    <el-select v-model="dataForm.org" placeholder="请选择" size="small" style="width: 128px;">
                        <el-option label="组织tree一" value="组织tree一"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权人">
                    <el-input v-model="dataForm.authorizer" placeholder="审批人" size="small" style="width: 128px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="bee-search">查询</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="tabs-wrapper bee-tabs-wrapper">
            <el-tabs v-model="tabActiveName" type="card" class="bee-tabs">
                <el-tab-pane label="角色" name="role">
                    <el-table :data="roleTableDate" border style="width: min-content;">
                        <el-table-column type="index" label="序号" width="44">
                        </el-table-column>
                        <el-table-column prop="org" label="所属组织" width="110">
                        </el-table-column>
                        <el-table-column prop="roleCode" label="角色编码" width="110">
                        </el-table-column>
                        <el-table-column prop="roleName" label="角色名称" width="100">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="130">
                        </el-table-column>
                        <el-table-column prop="authorizer" label="授权人" width="70">
                        </el-table-column>
                        <el-table-column prop="time" label="授权时间" width="160">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="用户" name="user">
                    <el-table :data="userTableDate" border style="width: min-content;">
                        <el-table-column type="index" label="序号" width="44">
                        </el-table-column>
                        <el-table-column prop="userCode" label="用户编码" width="110">
                        </el-table-column>
                        <el-table-column prop="userName" label="用户名称" width="110">
                        </el-table-column>
                        <el-table-column prop="org" label="所属组织" width="120">
                        </el-table-column>
                        <el-table-column prop="authorizer" label="授权人" width="70">
                        </el-table-column>
                        <el-table-column prop="time" label="授权时间" width="160">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data() {
        return {
            titleName: '组织权限查询',
            system: '/permission',
            tag: 'permission_orgPermission',
            tabType: '',
            dataForm: {
                org: '',
                authorizer: ''
            },
            roleTableDate: [
                {
                    org: '峰网银河A组织',
                    roleCode: 'KSIFC123421',
                    roleName: '人事部经理',
                    remark: '我是备注',
                    authorizer: '张一',
                    time: '2017-01-04'
                },
                {
                    org: '峰网银河A组织',
                    roleCode: 'KSIFC123421',
                    roleName: '人事部经理',
                    remark: '我是备注',
                    authorizer: '张一',
                    time: '2017-01-04'
                },
                {
                    org: '峰网银河A组织',
                    roleCode: 'KSIFC123421',
                    roleName: '人事部经理',
                    remark: '我是备注',
                    authorizer: '张一',
                    time: '2017-01-04'
                },
                {
                    org: '峰网银河A组织',
                    roleCode: 'KSIFC123421',
                    roleName: '人事部经理',
                    remark: '我是备注',
                    authorizer: '张一',
                    time: '2017-01-04'
                },
                {
                    org: '峰网银河A组织',
                    roleCode: 'KSIFC123421',
                    roleName: '人事部经理',
                    remark: '我是备注',
                    authorizer: '张一',
                    time: '2017-01-04'
                }
            ],
            userTableDate: [
                {
                    userCode: '324325u09287',
                    userName: '峰网银河A名称',
                    authorizer: '张一',
                    org: '峰网银河A组织',
                    time: '2017-01-04 12:00:00'
                },
                {
                    userCode: '324325u09287',
                    userName: '峰网银河A名称',
                    authorizer: '张一',
                    org: '峰网银河A组织',
                    time: '2017-01-04 12:00:00'
                },
                {
                    userCode: '324325u09287',
                    userName: '峰网银河A名称',
                    authorizer: '张一',
                    org: '峰网银河A组织',
                    time: '2017-01-04 12:00:00'
                },
                {
                    userCode: '324325u09287',
                    userName: '峰网银河A名称',
                    authorizer: '张一',
                    org: '峰网银河A组织',
                    time: '2017-01-04 12:00:00'
                },
                {
                    userCode: '324325u09287',
                    userName: '峰网银河A名称',
                    authorizer: '张一',
                    org: '峰网银河A组织',
                    time: '2017-01-04 12:00:00'
                }
            ],
            tabActiveName: 'role'
        }
    }
}
</script>

<style lang="scss">
.orgPermission {
    &>div {
        margin-left: 16px;
    }
}
</style>


