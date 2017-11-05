<template>
    <div v-if="isCache" class="permission userManage" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="用户管理-列表" :name="tag">
                <user-list :busSign="busSign" :selectTabCode="selectTabCode"></user-list>
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
import UserList from '@Permission/containers/userManage/userList/UserList.vue'
import UserAdd from '@Permission/containers/userManage/userAdd/UserAdd.vue'
import UserDetail from '@Permission/containers/userManage/userDetail/UserDetail.vue'
import UserAlter from '@Permission/containers/userManage/userAlter/UserAlter.vue'

export default{
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data () {
        return {
            titleName: '用户管理',
            tag: 'permission_userManage',
            system: '/permission',
            tabType: '',
			busSign: 'userManage',
			contentData: null
        }
    },
    components: {
        UserList,
        UserAdd,
        UserDetail,
        UserAlter
    }
}
</script>
