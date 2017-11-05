<style lang="scss" scoped></style>
<template>
    <div class="deal-with-dialog" v-show="showDealWith">
        <DialogCover/>
        <Dialog
            top="50%"
            title="差错帐处理"
            :visible="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal="false"
            :before-close="beforeClose"
        >
            <div class="dialog-body-box">
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">支付渠道</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.channelDesc"
                        />
                    </div>
                    <div class="f-r">
                        <label class="u-dialog-label">业务平台</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.systemIdDesc"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">业务订单号</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.buOrderNo"
                        />
                    </div>
                    <div class="f-r">
                        <label class="u-dialog-label">交易流水</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.serialNo"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">交易类型</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.tradeTypeDesc"
                        />
                    </div>
                    <div class="f-r">
                        <label class="u-dialog-label">交易金额</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.channelDesc"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">原交易流水</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.orginTradeNo"
                        />
                    </div>
                    <div class="f-r">
                        <label class="u-dialog-label">原交易金额</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.orginTradeMoney"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">交易日期</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.transactionDate"
                        />
                    </div>
                    <div class="f-r">
                        <label class="u-dialog-label">对账日期</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.checkDate"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">差错状态</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.dealStatusDesc"
                        />
                    </div>
                    <div class="f-r">
                        <label class="u-dialog-label">差错详细信息</label>
                        <Input
                            class="z-input-readonly u-dialog-input"
                            readonly
                            :value="rowInfo.detailReason"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">交易摘要</label>
                        <Input
                            class="z-input-readonly z-input-all-row u-dialog-input"
                            readonly
                            :value="rowInfo.tradeMd5"
                        />
                    </div>
                </div>
                <div class="m-dialog-line f-clearfix">
                    <div class="f-l">
                        <label class="u-dialog-label u-left-dialog-label">备注</label>
                        <Input
                            class="z-input-all-row u-dialog-input"
                            v-model="remark"
                        />
                    </div>
                </div>
            </div>
            <div slot="footer" class="m-dialog-footer-out-box">
                <Button
                    class="u-dialog-footer-btn"
                    v-for="item in rowInfo.buttonList"
                    :key="item.name"
                    @click="dealError(item)"
                >
                    {{ item.name }}
                </Button>
                <Button class="u-dialog-footer-btn" @click="$emit('closeDialog')">关闭</Button>
            </div>
        </Dialog>
    </div>
</template>
<script>
    import DialogCover from '@/components/DialogCover.vue'
    import $http from '@Pay/services/billProcessing'

    export default {
        name: 'DealWith',
        components: {DialogCover},
        props: ['showDealWith', 'rowInfo'],
        data() {
            return {
                remark: this.rowInfo.remark
            }
        },
        methods: {
            beforeClose() {
                this.$emit('closeDialog')
            },
            async dealError({name, type, dataType, tradeType, usable}) {
                try {
                    const {data} = await $http.deal({
                        id: this.rowInfo.id,
                        type,
                        dataType,
                        tradeType,
                        usable,
                        remark: this.remark
                    })
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: '操作成功，请点击刷新按钮更新信息',
                            type: 'success'
                        }])
//                        处理成功，关闭弹框
                        this.$emit('closeDialog')
                    } else {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: status.statusReason,
                            type: 'error'
                        }])
                    }
                } catch (err) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '数据请求失败，请重试',
                        type: 'error'
                    }])
                }
            }
        }
    }
</script>
