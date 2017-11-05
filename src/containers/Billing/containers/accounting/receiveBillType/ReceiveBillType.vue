<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="收款单类型-列表" :key="tag" :name="tag">
                <receive-bill-type-list></receive-bill-type-list>
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
import receiveBillTypeList from '@Billing/containers/accounting/receiveBillType/receiveBillTypeList/ReceiveBillTypeList.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_receiveBillType',
            system: '/billing',
            titleName: '付款单',
            tabType: 'new', // 标签类型，该字段主要确定新页的加载方式
            tabTriggerType: 'receiveBillType' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        receiveBillTypeList
    }
}
</script>

