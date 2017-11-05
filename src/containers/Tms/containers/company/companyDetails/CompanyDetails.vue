<style lang='scss' scoped>

</style>
<template>
    <div class="company-details">
        <div class="projection">
            <Button class="public-function-btn">修改</Button>
        </div>
        <div class="list-out-box" ref="listOutBox">
            <BaseInfo />
            <PayChannelInfo />
            <OpenAccountInfo />
        </div>
    </div>
</template>
<script>
import BaseInfo from './BaseInfo'
import OpenAccountInfo from './OpenAccountInfo'
import PayChannelInfo from './PayChannelInfo'

export default {
    name: 'CompanyDetails',
    components: {
        BaseInfo,
        OpenAccountInfo,
        PayChannelInfo
    },
    mounted() {
        const { clientHeight } = document.querySelector('body')
        this.$refs.listOutBox.style.height = `${clientHeight - 178}px`
        // 当页面尺寸发生变化的时候，再次设置高度
        window.onresize = () => {
            const { clientHeight } = document.querySelector('body')
            this.$refs.listOutBox.style.height = `${clientHeight - 178}px`
        }
    }
}
</script>