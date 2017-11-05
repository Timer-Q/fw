<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab" @tab-click="handleTabClick">
            <TabPane label="应付单-列表" :key="tag" :name="tag" :tabState="tabState" :tabAttr="{tag}">
                <payable-bill-list></payable-bill-list>
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
import payableBillList from '@Billing/containers/accounting/payableBill/payableBillList/PayableBillList.vue'
import payableBillDetail from '@Billing/containers/accounting/payableBill/payableBillDetail/PayableBillDetail.vue'
import newBillList from '@Billing/containers/accounting/payableBill/newBillList/NewBillList.vue'
import getLog from '@Billing/containers/accounting/payableBill/log/GetLog.vue'
export default {
    mixins: [ oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin ],
    data () {
        return {
            tag: 'billing_payableBill',
            system: '/billing',
            titleName: '应付单',
            tabType: 'new',
            tabTriggerType: 'payableBill' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        payableBillList,
        payableBillDetail,
        newBillList,
        getLog
    }
}
</script>

