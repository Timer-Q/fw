<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="付款单-列表" :key="tag" :name="tag">
                <payment-bill-list></payment-bill-list>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList" :key="item.tag" :label="item.name" :name="item.tag">
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
import paymentBillList from '@Billing/containers/accounting/paymentBill/paymentBillList/PaymentBillList.vue'
import paymentBillDetail from '@Billing/containers/accounting/paymentBill/paymentBillDetail/PaymentBillDetail.vue'
import payableBill from '@Billing/containers/accounting/paymentBill/payableBill/PayableBill.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_paymentBill',
            system: '/billing',
            titleName: '付款单',
            tabType: 'new',
            tabTriggerType: 'paymentBill' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        paymentBillList,
        paymentBillDetail,
        payableBill
    }
}
</script>

