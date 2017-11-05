<style lang="scss" scoped>

</style>
<template>
    <div class="list-out-box pay-channel-list">
        <Toast
            :title="toastTitle"
            :showToast="isShowToast"
        />
        <DetailsDialog
            :updateInfo="isUpdateInfo"
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
                <label class="query-block-label">渠道名称</label>
                <Input v-model="channelName"/>
            </div>
            <div class="query-block">
                <label class="query-block-label">一级渠道</label>
                <Select v-model="topLevel" placeholder="请选择" popper-class="pay-query-select">
                    <Option
                        v-for="item in topLevelList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </Select>
            </div>
            <div class="query-block">
                <label class="query-block-label">渠道状态</label>
                <Select v-model="channelStatus" placeholder="请选择" popper-class="pay-query-select">
                    <Option
                        v-for="item in channelStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </Select>
            </div>
            <div class="query-block">
                <Button @click="queryChannelInfo">查询</Button>
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
                <TableColumn label="序号" :resizable="false" type="index"/>
                <TableColumn prop="channelName" label="渠道名称" :resizable="false" />
                <TableColumn prop="channelSn" label="编号" :resizable="false" />
                <TableColumn prop="availableTime" label="开通时间" :resizable="false" />
                <TableColumn prop="channelLevel" label="渠道级别" :resizable="false" />
                <TableColumn prop="parentName" label="上级渠道" :resizable="false" />
                <TableColumn prop="status" label="状态" :resizable="false" />
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
// 获取接口文件
import $interface from '@Pay/services/base/payChannel/payChannelList'
import * as format from '@/utils/format'

export default {
    name: 'PayChannelList',
    components: { DetailsDialog, AddDialog, Features, Toast },
    data() {
        return {
            isShowToast: false,
            toastTitle: '',
            isShowAddDialog: false,
            isShowDetailsDialog: false,
            isUpdateInfo: false,
            // 表格选中行信息
            currentRowInfo: {},
            // 渠道名称
            channelName: '',
            // 一级渠道列表
            topLevelList: [],
            // 一级渠道（默认选择全部）
            topLevel: 'all',
            // 渠道状态列表
            channelStatusList: [{
                value: 'all',
                label: '全部'
            }, {
                value: '1',
                label: '启用'
            }, {
                value: '0',
                label: '未启用'
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
            sortType: 'desc'
        }
    },
    methods: {
        changeInfo() {
            this.isShowDetailsDialog = true
            this.isUpdateInfo = true
        },
        startInfo() {
            const { id } = this.currentRowInfo
            this.toastTitle = '启用成功'
            this.a_updateChannelStatus({
                channelStatus: '1',
                id
            })
        },
        stopInfo() {
            const { id } = this.currentRowInfo
            this.toastTitle = '停用成功'
            this.a_updateChannelStatus({
                channelStatus: '0',
                id
            })
        },
        closeDialog(type) {
            this.isUpdateInfo = false
            const dialogKey = `isShow${type}Dialog`
            this[dialogKey] = false
        },
        queryChannelInfo(additional) {
            // 判断如果没有内容就传空
            const channelStatus = this.channelStatus === 'all' ? '' : this.channelStatus
            const channelSn = this.topLevel === 'all' ? '' : this.topLevel
            const channelName = this.channelName === '' ? '' : `${this.channelName}%`
            const data = {
                like: {
                    channelName
                },
                equal: {
                    channelSn,
                    channelStatus
                },
                page: this.currentPage,
                rows: this.pageSize
            }
            if (additional) Object.assign(data, additional)
            this.a_listChannelInfoByPage(data)
        },
        clearChoose() {
            this.topLevel = 'all'
            this.channelStatus = 'all'
            this.channelName = ''
        },
        clickCurrentRow(row) {
            this.currentRowInfo = {...row}
            const channelUseConfig = [{ content: '停用' }, { content: '详情' }]
            const channelDisConfig = [{ content: '修改' }, { content: '启用' }, { content: '详情' }]
            row.status === '启用' ? this.toolTipList = [...channelUseConfig] : this.toolTipList = [...channelDisConfig]
            this.$tooltip({
                top: event.clientY,
                left: event.clientX
            }, 'tooltip')
        },
        fullScreenTable() {
            this.$refs.tableBox.style.width='100%'
        },
        sortTable() {
            this.sortType = this.sortType === 'desc' ? 'asc' : 'desc'
            this.queryChannelInfo({
                sort: this.sortType
            })
        },
        clickTooltipButton(type) {
            // 判断当前点击的表格小工具的哪个功能
            switch (type) {
                case '详情':
                    this.isShowDetailsDialog = true
                    break
                case '修改':
                    this.isShowDetailsDialog = true
                    break
                case '启用':
                    this.startInfo()
                    break
                case '停用':
                    this.stopInfo()
                    break
            }
        },
        sizeChange(size) {
            this.pageSize = size
            this.queryChannelInfo()
        },
        currentChange(currentPage) {
            this.currentPage = currentPage
            this.queryChannelInfo()
        },
        async a_listChannelInfoByPage(data) {
            try {
                const result = await $interface.listChannelInfoByPage(data)
                await this.renderTable(result)
            } catch(err) {
                console.log(err)
            }
        },
        renderTable({ data }) {
            const { result, attachment } = data
            // 将列表数量传给分页
            const { total } = attachment
            this.pageTotal = total
            // 对数据进行加工，返回给table
            for (let item of result) {
                // 对返回的时间进行format
                item.availableTime = format.dateFormat(item.availableTime, 'yyyy-MM-dd hh:mm:ss')
                // 将状态的数字改为文字
                switch (item.channelStatus) {
                    case '0':
                        item.status = '停用'
                        break
                    case '1':
                        item.status = '启用'
                        break
                }
                // 将渠道级别的数字改为文字
                switch (item.channelLevel) {
                    case '1':
                        item.channelLevel = '一级'
                        break
                    case '2':
                        item.channelLevel = '二级'
                        break
                }
            }
            this.tableData = result
        },
        async a_listChannelInfo(data) {
            try {
                const result = await $interface.listChannelInfo(data)
                await this.renderTopLevel(result)
            } catch(err) {
                console.log(err)
            }
        },
        renderTopLevel({ data }) {
            const { result } = data
            // 一级渠道列表先增加全选
            this.topLevelList.push({
                value: 'all',
                label: '全部'
            })
            // 循环result，选取有用信息放入topLevelList中
            for (let item of result) {
                this.topLevelList.push({
                    value: item.channelSn,
                    label: item.channelName
                })
            }
        },
        async a_updateChannelStatus(data) {
            // 将Toast的控制变量置否
            this.isShowToast = false
            try {
                const result = await $interface.updateChannelStatus(data)
                await this.updateChannelStatus(result)
            } catch(err) {
                console.log(err)
            }
        },
        updateChannelStatus({ data }) {
            const { result } = data
            if (result) this.isShowToast = true
        }
    },
    created() {
        // 监听新增按钮的点击
        this.$root.bus.$on('payChannelAdd', () => {
            this.isShowAddDialog = true
        })
        // 监听修改按钮的点击
        this.$root.bus.$on('payChannelChange', () => {
            this.changeInfo()
        })
        // 监听启用按钮的点击
        this.$root.bus.$on('payChannelStart', () => {
            this.startInfo()
        })
        // 监听停用按钮的点击
        this.$root.bus.$on('payChannelStop', () => {
            this.endInfo()
        })
    },
    mounted() {
        // 获取全部的支付渠道列表
        this.a_listChannelInfoByPage({
            page: 1,
            rows: 20
        })
        // 获取一级支付渠道列表
        this.a_listChannelInfo({
            equal: {
                // 一级渠道
                channelLevel: 1
            }
        })
    }
}

</script>
