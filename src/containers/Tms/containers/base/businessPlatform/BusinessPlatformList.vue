<style lang="scss" scoped>
.dialog-body-box {
    >p {
        margin: 10px 0;
        font-size: 14px;
        color: #3199e2;
    }
}
</style>
<template>
    <div class="list-out-box business-platform-list">
        <Dialog title="支付渠道录入" :visible.sync="isShowAddDialog">
            <div class="dialog-body-box">
                <div class="dialog-line">
                    <span class="dialog-line-label">业务平台名称</span>
                    <Input value="tianjin"></Input>
                </div>
                <div class="dialog-line">
                    <span class="dialog-line-label">平台编号</span>
                    <Input value="tianjin"></Input>
                </div>
                <div class="dialog-line">
                    <span class="dialog-line-label">业务平台说明</span>
                    <Input type="textarea" value="tianjin"></Input>
                </div>
            </div>
            <div slot="footer">
                <Button>取 消</Button>
                <Button type="warning">确 定</Button>
            </div>
        </Dialog>
        <div class="query-box">
            <Form :inline="FormConfig.inline">
                <FormItem label="渠道名称">
                    <Input value="123" />
                </FormItem>
                <FormItem label="录入时间">
                    <el-date-picker type="daterange" placeholder="选择日期范围">
                    </el-date-picker>
                </FormItem>
                <FormItem label="渠道状态">
                    <Input value="789" />
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                </FormItem>
                <div class="clear-box">
                    <p>清空</p>
                </div>
            </Form>
        </div>
        <div class="table-box">
            <Table :data="tableData" style="width: 100%">
                <TableColumn prop="date" label="日期" width="180">
                </TableColumn>
                <TableColumn prop="name" label="姓名" width="180">
                </TableColumn>
                <TableColumn prop="address" label="地址">
                </TableColumn>
            </Table>
            <Pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </Pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BusinessPlatformList',
    data() {
        return {
            isShowAddDialog: false,
            isCloseOnClickModal: true,
            isCloseOnPressEscape: true,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            FormConfig: {
                inline: true
            }
        }
    },
    mounted() {
        this.$root.bus.$on('clickAddBtn', () => {
            console.log('点击了add按钮')
            this.isShowAddDialog = true
        })
        this.$root.bus.$on('clickChangeBtn', () => {
            console.log('点击了Change按钮')
        })
    }
}

</script>
