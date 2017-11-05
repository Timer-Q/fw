<template>
    <div v-if="isCache" class="pay bill-processing">
        <Toast/>
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="差错帐处理-列表" :key="tag" :name="tag">
                <div class="projection">
                    <Button class="public-function-btn" @click="$root.bus.$emit('pay_billProcessing_export')">导出
                    </Button>
                    <Button class="public-function-btn" @click="$root.bus.$emit('pay_billProcessing_exportAll')">全部导出
                    </Button>
                    <Button class="public-function-btn" @click="$root.bus.$emit('pay_billProcessing_refresh')">刷新
                    </Button>
                </div>
            </TabPane>
            <BillProcessingList/>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import {mapState} from 'vuex'
    import BillProcessingList from './BillProcessingList.vue'
    import Toast from '@Pay/components/Toast'

    export default {
        name: 'BillProcessing',
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {Toast, BillProcessingList},
        data() {
            return {
                tag: 'pay_billProcessing',
                system: '/pay',
                titleName: '差错帐处理'
            }
        }
    }

</script>

