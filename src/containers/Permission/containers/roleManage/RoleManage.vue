<template>
	<div v-if="isCache" class="permission roleManage areaScroll" ref="listOutBox">
		<Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
			<TabPane label="角色管理-列表" :name="tag">
				<roleManageList :busSign="busSign" :selectTabCode="selectTabCode"></roleManageList>
			</TabPane>
			<TabPane closable v-for="(item,index) in tabsList" :key="item.tag" :label="item.name" :name="item.tag">
				<div :is="item.content" :tabType="tabType" :busSign="busSign" :selectTabCode="selectTabCode" class="scrollAree"></div>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
import RoleAdd from './roleAdd/RoleAdd.vue'
import roleManageList from '@Permission/containers/roleManage/roleManageList/RoleManageList.vue'
import RoleDetail from '@Permission/containers/roleManage/roleDetail/RoleDetail.vue'
import RoleAlter from '@Permission/containers/roleManage/roleAlter/RoleAlter.vue'

export default {
	mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
	data() {
		return {
			titleName: '角色管理',
			system: '/permission',
			busSign: 'roleManage',
			tag: 'permission_roleManage',
			tabType: '',
			contentData: null
		}
	},
	components: {
		RoleAdd,
		roleManageList,
		RoleDetail,
		RoleAlter
	}
}
</script>

<style lang="scss">
</style>

