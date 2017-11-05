<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab" @tab-click="handleTabClick">
            <TabPane label="收款单-列表" :key="tag" :name="tag">
                <receive-bill-list></receive-bill-list>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList" :key="item.tag" :label="item.name" :name="item.tag">
                <!-- tabState: 激活tab的属性；tabAttr：该tab固有属性 -->
                <component :is="item.content" :tabType="tabType" :tabState="tabState" :tabAttr="item"></component>
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
import receiveBillList from '@Billing/containers/accounting/receiveBill/receiveBillList/ReceiveBillList.vue'
import receiveBillDetail from '@Billing/containers/accounting/receiveBill/receiveBillDetail/ReceiveBillDetail.vue'
import newBillList from '@Billing/containers/accounting/receiveBill/newBillList/NewBillList.vue'
import chooseBill from '@Billing/containers/accounting/receiveBill/chooseBill/ChooseBill.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_receiveBill',
            system: '/billing',
            titleName: '收款单',
            tabType: 'new',
            tabTriggerType: 'receiveBill' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        receiveBillList,
        receiveBillDetail,
        newBillList,
        chooseBill
    }
}
</script>

