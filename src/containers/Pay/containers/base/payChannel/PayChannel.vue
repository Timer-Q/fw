<template>
    <div v-if="isCache" class="pay pay-channel">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="支付渠道管理-列表" :key="tag" :name="tag">
                <div class="projection">
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
                        <Button class="public-function-btn" @click="clickByEdit('update')">修改</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="clickControlBtn('start')">启用</Button>
                        <Button class="public-function-btn" @click="clickControlBtn('stop')">停用</Button>
                    </ButtonGroup>
                    <Button class="public-function-btn">刷新</Button>
                </div>
                <PayChannelList />
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { mapState } from 'vuex'
import PayChannelList from './PayChannelList'

export default {
    name: 'PayChannel',
    mixins: [oneLevelTabMixins, twoLevelTabMixins],
    components: {
        PayChannelList
    },
    data() {
        return {
            tag:'pay_payChannel',
            system:'/pay',
            titleName:'支付渠道管理'
        }
    },
    methods: {
        clickByEdit(state) {
            if (state === 'add') this.$root.bus.$emit('payChannelAdd')
            if (state === 'update') this.$root.bus.$emit('payChannelChange')
        },
        clickControlBtn(state) {
            if (state === 'start') this.$root.bus.$emit('payChannelStart')
            if (state === 'stop') this.$root.bus.$emit('payChannelStop')
        }
    }
}

</script>
