<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="应付单类型-列表" :key="tag" :name="tag">
                <payable-bill-type-list></payable-bill-type-list>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList" :key="item.tag" :label="item.name" :name="item.tag">
                <div :is="item.content" :tabType="tabType"></div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// public mixins
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
// self mixins
import tabHandleMixin from '@Billing/mixins/tabHandleMixin.js'
// components
import payableBillTypeList from '@Billing/containers/accounting/payableBillType/payableBillTypeList/PayableBillTypeList.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_payableBillType',
            system: '/billing',
            titleName: '应付单类型',
            tabType: 'new', // 标签类型，该字段主要确定新页的加载方式
            tabTriggerType: 'payableBillType' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        payableBillTypeList
    }
}
</script>

