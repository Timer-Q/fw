<template>
    <div v-if="isCache" class="billing">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab" @tab-click="handleTabClick">
            <TabPane label="篮字应付冲红字应付-列表" :key="tag" :name="tag">
                <bporp-list></bporp-list>
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
import bporpList from '@Billing/containers/accounting/BPORP/BPORPList/BPORPList.vue'
import bporpDetail from '@Billing/containers/accounting/BPORP/BPORPDetail/BPORPDetail.vue'
import bporpFormDetail from '@Billing/containers/accounting/BPORP/BPORPDetail/BPORPFormDetail.vue'
import bporpTableDetail from '@Billing/containers/accounting/BPORP/BPORPDetail/BPORPTableDetail.vue'
import newBillList from '@Billing/containers/accounting/BPORP/newBillList/NewBillList.vue'
import chooseBill from '@Billing/containers/accounting/BPORP/chooseBill/ChooseBill.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_bporp',
            system: '/billing',
            titleName: '应付冲应收',
            tabType: 'new',
            tabTriggerType: 'BPORPBill' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        bporpList,
        bporpDetail,
        newBillList,
        chooseBill,
        bporpFormDetail,
        bporpTableDetail
    }
}
</script>

