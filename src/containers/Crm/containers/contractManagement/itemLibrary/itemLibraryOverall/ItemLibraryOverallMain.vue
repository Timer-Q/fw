<template>
    <div v-if="isCache" class="crm-wrapper" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="款项库全局-列表" :key="tag" :name="tag">
                <itemLibraryOverallList :clickByEdit="clickByEdit" @getTarget="getTarget"></itemLibraryOverallList>
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
    import itemLibraryOverallList from '@Crm/containers/contractManagement/itemLibrary/itemLibraryOverall/ItemLibraryOverallList.vue'
    import itemLibraryOverallAdd from '@Crm/containers/contractManagement/itemLibrary/itemLibraryOverall/ItemLibraryOverallAdd.vue'
    import itemLibraryOverallModify from '@Crm/containers/contractManagement/itemLibrary/itemLibraryOverall/ItemLibraryOverallModify.vue'

    export default {
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {
            itemLibraryOverallList,
            itemLibraryOverallAdd,
            itemLibraryOverallModify
        },
        data() {
            return {
                tag: 'crm_itemLibraryOverallMain',
                system: '/crm',
                titleName: '款项库全局',
                currentRowP: {}
            }
        },
        methods: {
            getTarget(currentRow) {
                this.currentRowP = currentRow
            }
        }

    }
</script>
