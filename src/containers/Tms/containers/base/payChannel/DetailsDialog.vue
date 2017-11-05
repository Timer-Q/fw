<style lang='scss' scoped>
.dialog-body-box {
    >p {
        margin: 10px 0;
        font-size: 14px;
        color: #3199e2;
    }
}
</style>
<template>
    <div class="details-dialog">
        <DialogCover v-show="isShowDialog"/>
        <Dialog
            title="支付渠道录入"
            top="50%"
            :visible.sync="isShowDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="beforeClose"
            :modal="false"
        >
            <div class="dialog-body-box">
                <div class="dialog-line clearfix">
                    <div class="f_l">
                        <label class="dialog-line-label">渠道名称</label>
                        <Input
                            v-model="inputModel.channelName.value"
                            :readonly="inputModel.channelName.readonly"
                            :class="{'disabled-style': isDisabledStyle}"
                            v-must
                        />
                        <!-- <Sigh content="请完善信息" /> -->
                    </div>
                    <div class="f_r">
                        <label class="dialog-line-label">渠道编号</label>
                        <Input
                            v-model="inputModel.numbering.value"
                            :disabled="inputModel.numbering.disabled"
                            :readonly="inputModel.numbering.readonly"
                            :class="{'disabled-style': isDisabledStyle}"
                        />
                    </div>
                </div>
                <div class="dialog-line clearfix">
                    <div class="f_l">
                        <label class="dialog-line-label">服务商ID</label>
                        <Input
                            v-model="inputModel.serviceId.value"
                            :readonly="inputModel.serviceId.readonly"
                            :class="{'disabled-style': isDisabledStyle}"
                        />
                    </div>
                    <div class="f_r">
                        <label class="dialog-line-label">渠道级别</label>
                        <Input
                            v-model="inputModel.channelLevel.value"
                            :readonly="inputModel.channelLevel.readonly"
                            :class="{'disabled-style': isDisabledStyle}"
                        />
                    </div>
                </div>
                <div class="dialog-line clearfix">
                    <div class="f_l">
                        <label class="dialog-line-label">上级渠道</label>
                        <Input
                            v-model="inputModel.prevChannel.value"
                            :readonly="inputModel.prevChannel.readonly"
                            :class="{'disabled-style': isDisabledStyle}"
                        />
                    </div>
                </div>
                <p>渠道配置</p>
                <Table
                    style="width: 100%"
                    border
                    :data="tableData"
                >
                    <TableColumn prop="name" label="名称" />
                    <TableColumn prop="field" label="字段" />
                    <TableColumn prop="parameter" label="参数" />
                </Table>
            </div>
            <div slot="footer">
                <template v-if="!isChange">
                    <Button @click="changeInfo">修改</Button>
                    <Button @click="closeDialog">关闭</Button>
                </template>
                <template v-else>
                    <Button @click="cancelChange">取消</Button>
                    <Button
                        type="warning"
                        @click="saveChange"
                    >
                        保存
                    </Button>
                </template>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Sigh from '@Pay/components/Sigh.vue'
import DialogCover from '@/components/DialogCover'

export default {
    name: 'DetailsDialog',
    props: ['showDialog', 'tableData', 'rowInfo', 'updateInfo'],
    components: { Sigh, DialogCover },
    data() {
        return {
            isDisabledStyle: false,
            isChange: false,
            isShowDialog: false,
            inputModel: {
                channelName: {
                    value: '',
                    readonly: true
                },
                numbering: {
                    value: '',
                    disabled: false,
                    readonly: true
                },
                serviceId: {
                    value: '',
                    readonly: true
                },
                channelLevel: {
                    value: '',
                    readonly: true
                },
                prevChannel: {
                    value: '',
                    readonly: true
                }
            }
        }
    },
    watch: {
        // 监听showDialog变化，从而控制dialog的显示与隐藏
        showDialog() {
            this.isShowDialog = this.showDialog
        },
        // 监听表格当前被点击的行信息，更新input绑定的值
        rowInfo() {
            for (let key in this.inputModel) {
                this.inputModel[key].value = this.rowInfo[key]
            }
        },
        updateInfo() {
            // 当父组件点击的是修改按钮时，dialog变为修改状态
            if (this.updateInfo) {
                this.changeInfo()
            } else {
                this.cancelChange()
            }
        }
    },
    methods: {
        beforeClose(done) {
            this.$emit('closeDetailsDialog', ['Details'])
            done()
        },
        //  点击关闭按钮，触发父组件监听的“clickCloseBtn”事件，改变showDialog的值
        closeDialog() {
            this.$emit('closeDetailsDialog', ['Details'])
        },
        //  点击修改按钮，除了渠道编号外都置为可更改状态
        changeInfo() {
            this.isChange = true
            for (let key in this.inputModel) {
                // 如果是渠道编号input
                if (this.inputModel[key].hasOwnProperty('disabled')) {
                    this.inputModel[key].disabled = true
                }
                this.inputModel[key].readonly = false
            }
            // 修改边框样式
            this.isDisabledStyle = false
        },
        // 点击取消按钮，返回点击取消按钮前的正常状态
        cancelChange() {
            this.isChange = false
            for (let key in this.inputModel) {
                // 如果是渠道编号input
                if (this.inputModel[key].hasOwnProperty('disabled')) {
                    this.inputModel[key].disabled = false
                }
                this.inputModel[key].readonly = true
            }
            // 修改边框样式
            this.isDisabledStyle = true
        },
        // 点击保存按钮
        saveChange() {

        }
    }
}
</script>