<template>
	<div class="dataPermission" v-if="isCache" ref="listOutBox">
		<div class="form-wrapper">
			<el-form :inline="true" :model="dataForm">
				<el-form-item label="管理维度">
					<el-select v-model="dataForm.manageArea" placeholder="活动区域" size="small" style="width: 88px;">
						<el-option label="全部" value="all"></el-option>
						<el-option label="区域" value="区域"></el-option>
						<el-option label="类别" value="类别"></el-option>
						<el-option label="客户" value="客户"></el-option>
						<el-option label="级别" value="级别"></el-option>
						<el-option label="品牌" value="品牌"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="查询依据">
					<el-select v-model="dataForm.according" placeholder="活动区域" size="small" style="width: 88px;">
						<el-option label="按类别" value="按类别"></el-option>
						<el-option label="按个体" value="按个体"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类依据">
					<el-select v-model="dataForm.typeAccording" placeholder="活动区域" size="small" style="width: 88px;">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="dataForm.classify" placeholder="活动区域" size="small" style="width: 88px;">
						<el-option label="分类一" value="分类一"></el-option>
						<el-option label="分类二" value="分类二"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="个体">
					<el-input v-model="dataForm.individual" placeholder="审批人" size="small" style="width: 108px;"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="dataForm.type" placeholder="活动区域" size="small" style="width: 88px;">
						<el-option label="查看" value="查看"></el-option>
						<el-option label="维护" value="维护"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="授权人">
					<el-select v-model="dataForm.authorizer" placeholder="活动区域" size="small" style="width: 88px;">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span class="bee-search">查询</span>
				</el-form-item>
				<el-form-item>
					<span class="bee-clear">清空</span>
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
			titleName: '数据权限查询',
            system: '/permission',
            tag: 'permission_dataPermission',
            tabType: '',
			dataForm: {
				manageArea: '区域',
				according: '按类别',
				typeAccording: '',
				classify: '',
				individual: '',
				type: '',
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
.dataPermission {
	&>div {
		margin-left: 16px;
	}
	.form-wrapper {
		.el-form-item__label {
			padding-right: 8px;
		}
	}
}
</style>


