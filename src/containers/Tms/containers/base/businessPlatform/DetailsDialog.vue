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
            title="业务平台录入"
            top="50%"
            :visible.sync="isShowDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="beforeClose"
            :modal="false"
        >
            <div class="dialog-body-box">
                <div class="dialog-line">
                    <div>
                        <label class="dialog-line-label">渠道名称</label>
                        <Input
                            v-model="inputModel.channelName.value"
                            :disabled="inputModel.channelName.disabled"
                            v-must
                        />
                    </div>
                </div>
                <div class="dialog-line">
                    <div>
                        <label class="dialog-line-label">平台编号</label>
                        <Input
                            v-model="inputModel.numbering.value"
                            :disabled="true"
                        />
                    </div>
                </div>
                <div class="dialog-line">
                    <div>
                        <label class="dialog-line-label">业务平台说明</label>
                        <div class="textarea-box">
                            <div
                                class="cover-slash"
                                :style="textareaCoverStyle"
                            >
                            </div>
                            <div
                                class="count-box"
                                v-if="isChange"
                            >
                                <p>
                                    <span :style="nowNumStyle">{{ textareaValueNum }}</span>
                                    <span>/100</span>
                                </p>
                            </div>
                            <textarea
                                v-model="inputModel.description.value"
                                :readonly="inputModel.description.disabled"
                                :style="textareaCoverStyle"
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
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
import DialogCover from '@/components/DialogCover'

export default {
    name: 'DetailsDialog',
    props: ['showDialog', 'tableData', 'rowInfo'],
    components: { DialogCover },
    data() {
        return {
            isChange: false,
            isShowDialog: false,
            inputModel: {
                channelName: {
                    value: '',
                    disabled: true
                },
                numbering: {
                    value: ''
                    // 渠道编号不可更改，直接写死
                },
                description: {
                    value: '',
                    disabled: true
                }
            },
            textareaCoverStyle: {
                color: '#bbb',
                backgroundColor: '#eef1f6',
                cursor: 'not-allowed'
            },
            nowNumStyle: {
                color: '#1facc7'
            },
            textareaValueNum: 0
        }
    },
    watch: {
        ['inputModel.description.value']() {
            const length = this.inputModel.description.value.length
            // 字数显示超过100后，还显示100
            this.textareaValueNum = length >= 100 ? 100 : length
            if (length >= 100) {
                // 字数显示超过100后，颜色变成红色
                this.nowNumStyle.color = 'red'
                // 文字输入数量超过100个字符后再输入还显示100个字符
                const value = this.inputModel.description.value
                this.inputModel.description.value = value.slice(0, 100)
            } else {
                this.nowNumStyle.color = '#1facc7'
            }
        },
        // 监听showDialog变化，从而控制dialog的显示与隐藏
        showDialog() {
            this.isShowDialog = this.showDialog
        },
        // 监听表格当前被点击的行信息，更新input绑定的值
        rowInfo() {
            for (let key in this.inputModel) {
                this.inputModel[key].value = this.rowInfo[key]
            }
        }
    },
    methods: {
        beforeClose(done) {
            this.$emit('closeDetailsDialog', ['Details'])
            done()
        },
        //  点击关闭按钮，触发父组件监听的“closeDetailsDialog”事件，改变showDialog的值
        closeDialog() {
            this.$emit('closeDetailsDialog', ['Details'])
        },
        //  点击修改按钮，除了渠道编号外将input都置为可更改状态
        changeInfo() {
            this.isChange = true
            for (let key in this.inputModel) {
                this.inputModel[key].disabled = false
            }
            // 获取textarea中的字数，赋值给显示数量的span
            const length = this.inputModel.description.value.length
            this.textareaValueNum = length
            // 修改textarea与右下角斜线遮罩的样式
            this.textareaCoverStyle = {
                color: '#1f2d3d',
                backgroundColor: '#fff',
                cursor: 'auto'
            }
        },
        // 点击取消按钮，返回点击取消按钮前的正常状态
        cancelChange() {
            this.isChange = false
            for (let key in this.inputModel) {
                this.inputModel[key].disabled = true
            }
            // 点击取消按钮，修改textarea与右下角斜线遮罩的样式恢复不可修改状态
            this.textareaCoverStyle = {
                color: '#bbb',
                backgroundColor: '#eef1f6',
                cursor: 'not-allowed'
            }
        },
        // 点击保存按钮
        saveChange() {

        }
    }
}
</script>