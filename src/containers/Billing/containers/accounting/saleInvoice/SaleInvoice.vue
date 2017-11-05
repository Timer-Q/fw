<template>
    <div v-if="isCache" class="billing">
        <!-- <invoice-nav :navData="getNavData"></invoice-nav> -->
        <!-- 不用 keep-alive ，临时页签切换的时候（未关闭），依然会被还原 -->
        <!-- <keep-alive>
                <router-view></router-view>
            </keep-alive> -->
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="销售发票-列表" :key="tag" :name="tag">
                <div class="projection">
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
                        <Button class="public-function-btn" @click="clickByEdit('update')">修改</Button>
                        <Button class="public-function-btn">删除</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button class="public-function-btn">启用</Button>
                        <Button class="public-function-btn">停用</Button>
                    </ButtonGroup>
                    <Button class="public-function-btn">刷新</Button>
                    <Button class="public-function-btn">日志</Button>
                </div>
                <!-- <list-temp></list-temp> -->
                <!-- <router-view></router-view> -->
                <sale-invoice></sale-invoice>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList" :key="item.code" :label="item.name" :name="item.code">
                <div :is="item.content"></div>
                <!-- <router-view></router-view> -->
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// mixins
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
// self mixins
import tabHandleMixin from '@Billing/mixins/tabHandleMixin.js'

// components
import saleInvoice from './invoiceList/InvoiceList.vue'
import saleInvoicing from './invoicing/Invoicing.vue'
import costOrder from './costOrder/CostOrder'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_saleInvoice',
            system: '/billing',
            titleName: '销售发票',
            tabType: 'new', // 标签类型，该字段主要确定新页的加载方式
            tabTriggerType: 'saleInvoice' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        saleInvoice,
        saleInvoicing,
        costOrder
    }
}
</script>

