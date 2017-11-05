<template>
    <div v-if="isCache" class="crm-wrapper">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="条款-列表" :key="tag" :name="tag">
                <!--<termGlobalList :clickByEdit="clickByEdit"></termGlobalList>-->
                条款集团
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <component :is="item.component"></component>
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
//    import termGlobalList from '@Crm/containers/contractManagement/termLibrary/termGlobal/TermGlobalList.vue'
//    import newCommonTerm from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewCommonTerm.vue'
//    import newContractPaymentTerm from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewContractPaymentTerm.vue'
//    import newPaymentAgreement from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewPaymentAgreement.vue'
//    import newServiceItemAndPrice from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewServiceItemAndPrice.vue'
    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        components: {
//            termGlobalList,
//            newCommonTerm,
//            newContractPaymentTerm,
//            newPaymentAgreement,
//            newServiceItemAndPrice
        },
        data(){
            return {
                tag:'crm_termGroupMain',
                system:'/crm',
                titleName:'条款库集团'
            }
        },

    }
</script>
