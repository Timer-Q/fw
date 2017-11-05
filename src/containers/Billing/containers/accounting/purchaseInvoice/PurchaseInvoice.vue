<template>
    <div v-if="isCache" class="billing">
        <!-- <invoice-nav :navData="getNavData"></invoice-nav> -->
        <!-- 不用 keep-alive ，临时页签切换的时候（未关闭），依然会被还原 -->
        <!-- <keep-alive>
                <router-view></router-view>
            </keep-alive> -->
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="采购发票-列表" :key="tag" :name="tag">
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
                <purchase-invoice></purchase-invoice>
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

import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
// self mixins
import tabHandleMixin from '@Billing/mixins/tabHandleMixin.js'

import purchaseInvoice from './invoiceList/InvoiceList.vue'
import purchaseInvoicing from './invoicing/Invoicing.vue'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, tabHandleMixin],
    data() {
        return {
            tag: 'billing_purchaseInvoice',
            system: '/billing',
            titleName: '采购发票',
            tabType: 'new', // 标签类型，该字段主要确定新页的加载方式
            tabTriggerType: 'purchaseInvoice' // 增加或删除需要根据该字段增加到对应的页上
        }
    },
    computed: {
        ...mapState([
            'navTabData'
        ])
    },
    components: {
        purchaseInvoice,
        purchaseInvoicing
    }
}
</script>

