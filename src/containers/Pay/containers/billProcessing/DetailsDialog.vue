<style lang="scss" scoped></style>
<template>
    <div class="details-dialog" v-show="showDetails">
        <DialogCover/>
        <Dialog
            top="50%"
            title="差错帐详情"
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
                            class="z-input-readonly z-input-all-row u-dialog-input"
                            readonly
                            :value="rowInfo.remark"
                        />
                    </div>
                </div>
            </div>
            <div slot="footer" class="m-dialog-footer-out-box">
                <Button class="u-dialog-footer-btn" @click="$emit('closeDialog')">关闭</Button>
            </div>
        </Dialog>
    </div>
</template>
<script>
    import DialogCover from '@/components/DialogCover.vue'

    export default {
        name: 'Details',
        components: {DialogCover},
        props: ['showDetails', 'rowInfo'],
        methods: {
            beforeClose() {
                this.$emit('closeDialog')
            }
        }
    }
</script>
