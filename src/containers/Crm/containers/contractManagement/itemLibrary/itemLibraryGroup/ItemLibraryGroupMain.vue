<template>
    <div v-if="isCache" class="crm-wrapper" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="款项库集团-列表" :key="tag" :name="tag">
                <itemLibraryGroupList :clickByEdit="clickByEdit" @getTarget="getTarget"></itemLibraryGroupList>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <component :is="item.component" :currentRowP="currentRowP" :removeTab="removeTab"></component>
            </TabPane>
        </Tabs>
    </div>
</template>
<style>

</style>
<script>

    import {mapState} from 'vuex'
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@Crm/mixin/mixin.js'
    import itemLibraryGroupList from '@Crm/containers/contractManagement/itemLibrary/itemLibraryGroup/ItemLibraryGroupList.vue'
    import itemLibraryGroupAdd from '@Crm/containers/contractManagement/itemLibrary/itemLibraryGroup/ItemLibraryGroupAdd.vue'
    import itemLibraryGroupModify from '@Crm/containers/contractManagement/itemLibrary/itemLibraryGroup/ItemLibraryGroupModify.vue'

    export default {
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {
            itemLibraryGroupList,
            itemLibraryGroupAdd,
            itemLibraryGroupModify
        },
        data() {
            return {
                tag: 'crm_itemLibraryGroupMain',
                system: '/crm',
                titleName: '款项库集团',
                currentRowP: {},
            }
        },
        methods: {
            getTarget(currentRow) {
                this.currentRowP = currentRow
            }
        }

    }
</script>
