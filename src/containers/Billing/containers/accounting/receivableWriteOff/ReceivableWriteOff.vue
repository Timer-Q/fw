<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab" @tab-click="handleTabClick">
            <TabPane label="应收核销-列表" :key="tag" :name="tag">
                <receivable-write-off-list></receivable-write-off-list>
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
import receivableWriteOffList from '@Billing/containers/accounting/receivableWriteOff/receivableWriteOffList/ReceivableWriteOffList.vue'
import receivableWriteOffDetail from '@Billing/containers/accounting/receivableWriteOff/receivableWriteOffDetail/ReceivableWriteOffDetail.vue'
import newBillList from '@Billing/containers/accounting/receivableWriteOff/newBillList/NewBillList.vue'
import chooseBill from '@Billing/containers/accounting/receivableWriteOff/chooseBill/ChooseBill.vue'
import writeOff from '@Billing/containers/accounting/receivableWriteOff/chooseBill/WriteOff.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_receivableWriteOff',
            system: '/billing',
            titleName: '收款单',
            tabType: 'new',
            tabTriggerType: 'receivableWriteOff' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        receivableWriteOffList,
        receivableWriteOffDetail,
        newBillList,
        chooseBill,
        writeOff
    }
}
</script>

