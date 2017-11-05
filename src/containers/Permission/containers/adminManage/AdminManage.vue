<template>
    <div v-if="isCache" class="adminManage permission" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="管理员管理-列表" :name="tag">
                <adminManageList :busSign="busSign" :selectTabCode="selectTabCode"></adminManageList>
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
import AdminTemplate from '@Permission/containers/adminManage/adminTemplate/AdminTemplate.vue'
import adminManageList from '@Permission/containers/adminManage/adminManageList/AdminManageList.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data () {
        return {
            titleName: '管理员管理',
			system: '/permission',
            tag: 'permission_adminManage',
            busSign: 'adminManage',
            contentData: null,
            tabType: ''
        }
    },
    components: {
        adminManageList,
        AdminTemplate
    }
}
</script>

<style lang="scss">

</style>


