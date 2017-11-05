<template>
    <div v-if="isCache" class="pay business-platform">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="业务平台管理-列表" :key="tag" :name="tag">
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
                <BusinessPlatformList />
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { mapState } from 'vuex'
import BusinessPlatformList from './BusinessPlatformList'

export default {
    name: 'BusinessPlatform',
    mixins: [oneLevelTabMixins, twoLevelTabMixins],
    components: {
        BusinessPlatformList
    },
    data() {
        return {
            tag: 'pay_businessPlatform',
            system: '/pay',
            titleName: '业务平台管理'
        }
    },
    methods: {
        clickByEdit(state) {
            if (state === 'add') this.$root.bus.$emit('businessPlatformAdd')
            if (state === 'update') this.$root.bus.$emit('businessPlatformChange')
        },
        clickControlBtn(state) {
            if (state === 'start') this.$root.bus.$emit('businessPlatformStart')
            if (state === 'stop') this.$root.bus.$emit('businessPlatformStop')
        }
    }
}

</script>
