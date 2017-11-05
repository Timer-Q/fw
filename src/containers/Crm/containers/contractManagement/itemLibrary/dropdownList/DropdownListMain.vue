<template>
    <div v-if="isCache" class="crm-wrapper" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="下拉列表值-列表" :key="tag" :name="tag">
                <dropdownListList :clickByEdit="clickByEdit"></dropdownListList>
            </TabPane>
        </Tabs>
    </div>
</template>
<style>

</style>
<script>

    import {mapState} from 'vuex'
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import dropdownListList from '@Crm/containers/contractManagement/itemLibrary/dropdownList/DropdownListList.vue'

    export default {
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {
            dropdownListList
        },
        data() {
            return {
                tag: 'crm_dropdownListMain',
                system: '/crm',
                titleName: '下拉列表值'

            }
        },
    }
</script>
