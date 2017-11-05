<style lang='scss' scoped>

</style>
<template>
    <div class="add-dialog">
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
                            v-must
                            class="must-star"
                        />
                        <!-- <Sigh content="请完善信息" /> -->
                    </div>
                    <div class="f_r">
                        <label class="dialog-line-label">渠道编号</label>
                        <Input
                            v-model="inputModel.numbering.value"
                        />
                    </div>
                </div>
                <div class="dialog-line clearfix">
                    <div class="f_l">
                        <label class="dialog-line-label">服务商ID</label>
                        <Input
                            v-model="inputModel.serviceId.value"
                        />
                    </div>
                    <div class="f_r">
                        <label class="dialog-line-label">渠道级别</label>
                        <Input
                            v-model="inputModel.channelLevel.value"
                        />
                    </div>
                </div>
                <div class="dialog-line clearfix">
                    <div class="f_l">
                        <label class="dialog-line-label">上级渠道</label>
                        <Input
                            v-model="inputModel.prevChannel.value"
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
import Sigh from '@Pay/components/Sigh.vue'
import DialogCover from '@/components/DialogCover'

export default {
    name: 'AddDialog',
    props: ['showDialog'],
    components: { Sigh, DialogCover },
    data() {
        return {
            isShowDialog: false,
            inputModel: {
                channelName: {
                    value: ''
                },
                numbering: {
                    value: ''
                },
                serviceId: {
                    value: ''
                },
                channelLevel: {
                    value: ''
                },
                prevChannel: {
                    value: ''
                }
            },
            tableData: []
        }
    },
    watch: {
        // 监听showDialog变化，从而控制dialog的显示与隐藏
        showDialog() {
            this.isShowDialog = this.showDialog
        }
    },
    methods: {
        beforeClose(done) {
            this.$emit('closeAddDialog', ['Add'])
            done()
        },
        cancelChange() {
            this.$emit('closeAddDialog', ['Add'])
            this.isShowDialog = false
        },
        saveChange() {

        }
    }
}
</script>