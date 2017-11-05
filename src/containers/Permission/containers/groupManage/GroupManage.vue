<template>
    <div v-if="isCache" class="org" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="集团管理-列表" :name="tag">
                <Group-list :busSign="busSign"></Group-list>
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
import GroupList from '@Permission/containers/groupManage/groupList/groupList.vue'
import GroupAdd from '@Permission/containers/groupManage/groupAdd/GroupAdd.vue'
import GroupDetail from '@Permission/containers/groupManage/groupDetail/GroupDetail.vue'
import GroupUpdate from '@Permission/containers/groupManage/groupUpdate/GroupUpdate.vue'
export default{
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data () {
        return {
            titleName: '集团管理',
            tag: 'org_groupManage',
            system: '/org',
            tabType: '',
			busSign: 'groupManage',
			contentData: null
        }
    },
    components: {
        GroupList,
        GroupAdd,
        GroupDetail,
        GroupUpdate
    }
}
</script>
