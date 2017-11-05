<style lang="scss" scoped>

</style>
<template>
    <div class="list-out-box business-platform-list">
        <Toast
            :title="toastTitle"
            :showToast="isShowToast"
        />
        <DetailsDialog
            :showDialog="isShowDetailsDialog"
            :tableData="channelConfigTableData"
            :rowInfo="currentRowInfo"
            @closeDetailsDialog="closeDialog"
        />
        <AddDialog
           :showDialog="isShowAddDialog"
           @closeAddDialog="closeDialog"
        />
        <div class="query-box">
            <div class="query-block">
                <label class="query-block-label">业务平台名称</label>
                <Input v-model="businessName"/>
            </div>
            <div class="query-block">
                <label class="query-block-label">录入时间</label>
                <DatePicker
                    type="datetimerange"
                    placeholder="选择日期范围"
                    v-model="timeRange"
                >
                </DatePicker>
            </div>
            <div class="query-block">
                <label class="query-block-label">状态</label>
                <Select v-model="channelStatus" placeholder="请选择" popper-class="pay-query-select">
                    <Option v-for="item in channelStatusList" :key="item.value" :label="item.label" :value="item.value" />
                </Select>
            </div>
            <div class="query-block">
                <Button>查询</Button>
            </div>
            <div class="query-block">
                <p @click="clearChoose" class="query-block-clear">清空</p>
            </div>
        </div>
        <div class="table-box" ref="tableBox">
            <Table
                border
                :data="tableData"
                :highlight-current-row="true"
                @row-click="clickCurrentRow"
            >
                <TableColumn :resizable="false" type="index" label="序号" />
                <TableColumn :resizable="false" prop="businessSn" label="平台编号" />
                <TableColumn :resizable="false" prop="businessName" label="业务平台名称" />
                <TableColumn :resizable="false" prop="createTime" label="录入时间" />
                <TableColumn :resizable="false" prop="remark" label="说明" />
                <TableColumn :resizable="false" prop="status" label="状态" />
            </Table>
            <Features
                @fullScreen="fullScreenTable"
                @sort="sortTable"
            />
            <tooltip>
                <Button
                    size="mini"
                    v-for="item in toolTipList"
                    :key="item.content"
                    @click="clickTooltipButton(item.content)"
                >
                    {{ item.content }}
                </Button>
            </tooltip>
            <Pagination
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :total="pageTotal"
                :current-page="currentPage"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="sizeChange"
                @current-change="currentChange"
            />
        </div>
    </div>
</template>
<script>
import DetailsDialog from './DetailsDialog'
import AddDialog from './AddDialog'
import Features from '@Pay/components/Features'
import Toast from '@Pay/components/Toast'


export default {
    name: 'BusinessPlatformList',
    components: { DetailsDialog, AddDialog, Features, Toast },
    data() {
        return {
            toastTitle: '',
            isShowToast: false,
            isShowAddDialog: false,
            isShowDetailsDialog: false,
            // 表格选中行信息
            currentRowInfo: {},
            // 渠道名称
            businessName: '',
            // 时间范围
            timeRange: '',
            // 渠道状态列表
            channelStatusList: [{
                value: 'all',
                label: '全部'
            }, {
                value: '1',
                label: '启用'
            }, {
                value: '0',
                label: '停用'
            }],
            // 渠道状态（默认选择全部）
            channelStatus: 'all',
            // 表格数据
            tableData: [],
            channelConfigTableData: [{
                // 名称
                name: '',
                // 字段
                field: '',
                // 参数
                parameter: ''
            }],
            // 表格小工具
            toolTipList: [],
            // 分页中每页有多少条
            pageSize: 10,
            // 列表共多少条
            pageTotal: 0,
            // 分页当前页
            currentPage: 1,
        }
    },
    methods: {
        closeDialog(type) {
            const dialogKey = `isShow${type}Dialog`
            this[dialogKey] = false
        },
        clearChoose() {
            this.channelStatus = 'all'
            this.businessName = ''
        },
        clickCurrentRow(row, column, cell, event) {
            this.currentRowInfo = {...row}
            const channelUseConfig = [{ content: '停用' }, { content: '详情' }]
            const channelDisConfig = [{ content: '修改' }, { content: '启用' }, { content: '详情' }]
            row.state === '启用' ? this.toolTipList = [...channelUseConfig] : this.toolTipList = [...channelDisConfig]
            this.$tooltip({
                top: event.clientY,
                left: event.clientX
            }, 'tooltip')
        },
        fullScreenTable() {
            this.$refs.tableBox.style.width='100%'
        },
        sortTable() {

        },
        clickTooltipButton(type) {
            switch (type) {
                case '详情':
                    this.isShowDetailsDialog = true
                    break
            }
        },
        sizeChange() {

        },
        currentChange() {

        }
    },
    created() {
        // 监听新增按钮的点击
        this.$root.bus.$on('businessPlatformAdd', () => {
            this.isShowAddDialog = true
        })
        // 监听修改按钮的点击
        this.$root.bus.$on('businessPlatformChange', () => {
            console.log('点击了Change按钮')
        })
        // 监听启用按钮的点击
        this.$root.bus.$on('businessPlatformStart', () => {
            console.log('点击启用按钮')
        })
        // 监听停用按钮的点击
        this.$root.bus.$on('businessPlatformStop', () => {
            console.log('点击停用按钮')
        })
    }
}

</script>
