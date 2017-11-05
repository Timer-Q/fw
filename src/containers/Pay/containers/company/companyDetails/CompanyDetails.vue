<style lang='scss' scoped>

</style>
<template>
    <div class="company-details">
        <!--如果是启用状态，则不显示修改按钮-->
        <div class="projection" v-if="isCanChange">
            <Button
                v-if="!isChange"
                class="public-function-btn"
                @click="isChange=!isChange"
            >
                修改
            </Button>
            <template v-else>
                <Button
                    class="public-function-btn"
                    @click="$root.bus.$emit('pay_companyDetails_save')"
                >
                    保存
                </Button>
                <Button
                    class="public-function-btn"
                    @click="isChange=!isChange"
                >
                    取消
                </Button>
            </template>
        </div>
        <div class="g-tab-out-box" ref="outBox">
            <BaseInfo :currentRowInfo="currentRowInfo" :change="isChange"></BaseInfo>
            <PayChannelInfo :currentRowInfo="currentRowInfo" :change="isChange"></PayChannelInfo>
            <OpenAccountInfo :currentRowInfo="currentRowInfo" :change="isChange"></OpenAccountInfo>
        </div>
    </div>
</template>
<script>
    import BaseInfo from './BaseInfo'
    import OpenAccountInfo from './OpenAccountInfo'
    import PayChannelInfo from './PayChannelInfo'
    import $http from '@Pay/services/company'
    import payMixins from '@Pay/mixins'

    export default {
        name: 'CompanyDetails',
        props: ['currentRowInfo'],
        mixins: [...payMixins],
        components: {
            BaseInfo,
            OpenAccountInfo,
            PayChannelInfo
        },
        data() {
            return {
                isChange: false,
                newCurrentRowInfo: {},
                isCanChange: false
            }
        },
        created() {
//            获取点击进来的数据当前的运行状态
            this.isCanChange = !!this.currentRowInfo.status
        }
    }
</script>
