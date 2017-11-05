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
    <div class="add-dialog">
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
                            v-must
                        />
                    </div>
                </div>
                <div class="dialog-line">
                    <div>
                        <label class="dialog-line-label">平台编号</label>
                        <Input
                            v-model="inputModel.numbering.value"
                        />
                    </div>
                </div>
                <div class="dialog-line">
                    <div>
                        <label class="dialog-line-label">业务平台说明</label>
                        <div class="textarea-box">
                            <div class="cover-slash" style="backgroundColor: #fff">
                            </div>
                            <p class="count-box">
                                <span :style="nowNumStyle">{{ textareaValueNum }}</span>
                                <span>/100</span>
                            </p>
                            <textarea v-model="inputModel.description.value">
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="cancelChange">取消</Button>
                <Button
                    type="warning"
                    @click="saveChange"
                >
                    保存
                </Button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import DialogCover from '@/components/DialogCover'

export default {
    name: 'AddDialog',
    props: ['showDialog', 'tableData', 'rowInfo'],
    components: { DialogCover },
    data() {
        return {
            isChange: false,
            isShowDialog: false,
            inputModel: {
                channelName: {
                    value: '',
                },
                numbering: {
                    value: ''
                },
                description: {
                    value: ''
                }
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
            this.$emit('closeAddDialog', ['Add'])
            done()
        },
        // 点击取消按钮，关闭弹框
        cancelChange() {
            this.$emit('closeAddDialog', ['Add'])
            this.isShowDialog = false
        },
        // 点击保存按钮
        saveChange() {

        }
    }
}
</script>