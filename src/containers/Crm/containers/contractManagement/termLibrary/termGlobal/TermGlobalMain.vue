<template>
    <div v-if="isCache" class="crm-wrapper" ref="listOutBox">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="条款-列表" :key="tag" :name="tag">
                <termGlobalList :clickByEdit="clickByEdit" @getTermData="getTermData"></termGlobalList>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <component :is="item.component" :modifyTabName="modifyTabName" :removeTab="removeTab" :termData="termData"></component>
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
    import termGlobalList from '@Crm/containers/contractManagement/termLibrary/termGlobal/TermGlobalList.vue'
    import newCommonTerm from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewCommonTerm.vue'
    import newContractPaymentTerm from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewContractPaymentTerm.vue'
    import newPaymentAgreement from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewPaymentAgreement.vue'
    import newServiceItemAndPrice from '@Crm/containers/contractManagement/termLibrary/termGlobal/NewServiceItemAndPrice.vue'
    import detailCommonTerm from '@Crm/containers/contractManagement/termLibrary/termGlobal/DetailCommonTerm.vue'
    import detailContractPaymentTerm from '@Crm/containers/contractManagement/termLibrary/termGlobal/DetailContractPaymentTerm.vue'
    import detailPaymentAgreement from '@Crm/containers/contractManagement/termLibrary/termGlobal/DetailPaymentAgreement.vue'
    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        components: {
            termGlobalList,
            newCommonTerm,
            newContractPaymentTerm,
            newPaymentAgreement,
            newServiceItemAndPrice,
            detailCommonTerm,
            detailContractPaymentTerm,
            detailPaymentAgreement,
        },
        data(){
            return {
                tag:'crm_termGlobalMain',
                system:'/crm',
                titleName:'条款库全局',
                termData: {}
            }
        },
        methods: {
            getTermData(termData){
                this.termData = termData
            },
            modifyTabName(tabName){
                this.tabsList.forEach( item => {
                    if(item.component === 'detailCommonTerm' || item.component === 'detailPaymentAgreement' || item.component === 'detailContractPaymentTerm'){
                        item.name = tabName
                    }
                })
            }
        },
        mounted(){

        }

    }
</script>
