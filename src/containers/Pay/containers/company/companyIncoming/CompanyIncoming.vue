<style lang='scss' scoped></style>
<template>
    <div class="company-incoming g-tab-out-box" ref="outBox">
        <Step :stepList="stepList" :active="currentActive"></Step>
        <BaseInfo
            @clickStep="showHideBox"
            v-show="showHideList.baseInfo"
        ></BaseInfo>
        <PayChannelInfo
            @clickStep="showHideBox"
            v-show="showHideList.payChannelInfo"
        ></PayChannelInfo>
        <OpenAccountInfo
            @clickStep="showHideBox"
            v-show="showHideList.openAccountInfo"
        ></OpenAccountInfo>
    </div>
</template>
<script>
    import Step from '@Pay/components/Step'
    import BaseInfo from './BaseInfo'
    import OpenAccountInfo from './OpenAccountInfo'
    import PayChannelInfo from './PayChannelInfo'
    import payMixins from '@Pay/mixins'

    export default {
        name: 'CompanyIncoming',
        mixins: [...payMixins],
        components: {
            Step,
            BaseInfo,
            OpenAccountInfo,
            PayChannelInfo
        },
        data() {
            return {
//                滚动需要减去的高度
                lessNum: 120,
                stepList: [{
                    name: '基本信息',
                }, {
                    name: '支付渠道信息',
                }, {
                    name: '开户信息',
                }],
                showHideList: {
//                    基础信息
                    baseInfo: true,
//                    开户信息
                    openAccountInfo: false,
//                    支付渠道信息
                    payChannelInfo: false
                },
                currentActive: 1
            }
        },
        methods: {
            showHideBox([name, stepNum]) {
                this.currentActive = stepNum
                if (name === 'done') return
                for (let key in this.showHideList) {
                    this.showHideList[key] = false
                }
                this.showHideList[name] = true
            }
        }
    }
</script>
