<style lang="scss" scoped></style>
<template>
    <div class="g-tab-out-box bill-processing-list" ref="outBox">
        <!--详情弹框-->
        <DetailsDialog
            :showDetails="isShowDetails"
            :rowInfo="currentRowInfo"
            @closeDialog="isShowDetails = false"
        />
        <!--差错处理弹框-->
        <DealWithDialog
            :showDealWith="isShowDealWith"
            :rowInfo="currentRowInfo"
            @closeDialog="isShowDealWith = false"
        />
        <div class="m-query">
            <div class="m-query-block">
                <label class="u-query-label">订单号</label>
                <Input v-model="form.buOrderNo"/>
            </div>
            <div class="m-query-block">
                <label class="u-query-label">交易流水</label>
                <Input v-model="form.serialNo"/>
            </div>
            <div class="m-query-block">
                <label class="u-query-label">业务平台</label>
                <Select
                    placeholder="请选择"
                    popper-class="pay-query-select"
                    v-model="form.systemId"
                >
                    <Option
                        v-for="item in businessPlatformList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></Option>
                </Select>
            </div>
            <div class="m-query-block">
                <label class="u-query-label">支付渠道</label>
                <Select
                    placeholder="请选择"
                    popper-class="pay-query-select"
                    v-model="form.channel"
                    @change="listTwoLevelChannelInfoByParentSn"
                >
                    <Option
                        v-for="item in oneLevelChannelList"
                        :key="item.channelSn"
                        :label="item.channelName"
                        :value="item.channelSn"
                    ></Option>
                </Select>
                <Select
                    placeholder="请选择"
                    popper-class="pay-query-select"
                    v-model="form.twoChannel"
                >
                    <Option
                        v-for="item in twoLevelChannelList"
                        :key="item.channelSn"
                        :label="item.channelName"
                        :value="item.channelSn"
                    ></Option>
                </Select>
            </div>
            <div class="m-query-block">
                <label class="u-query-label">交易日期</label>
                <DatePicker
                    type="daterange"
                    placeholder="选择日期范围"
                    range-separator="~"
                    :editable="false"
                    v-model="tradeDate"
                    @change="dateRangeChange"
                />
            </div>
            <div class="m-query-block">
                <label class="u-query-label">差错状态</label>
                <Select
                    placeholder="请选择"
                    popper-class="pay-query-select"
                    v-model="form.dealStatus"
                >
                    <Option
                        v-for="item in errorTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></Option>
                </Select>
            </div>
            <div class="m-query-block">
                <Button class="u-query-btn" @click="queryBill">查询</Button>
            </div>
            <div class="m-query-block">
                <p class="u-query-clear" @click="clearChoose">清空</p>
            </div>
        </div>
        <div class="m-table-box">
            <Table
                border
                :data="tableData"
                :highlight-current-row="true"
                @row-click="clickTableRow"
                @select="selectTable"
                @select-all="selectTable"
            >
                <TableColumn
                    type="index"
                    label="序号"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    type="selection"
                    header-align="center"
                    align="center"
                ></TableColumn>
                <TableColumn
                    prop="buOrderNo"
                    label="业务订单号"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="serialNo"
                    label="交易流水"
                    header-align="center"
                    align="right"
                ></TableColumn>
                <TableColumn
                    prop="systemIdDesc"
                    label="业务平台"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="channelDesc"
                    label="支付渠道"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="tradeTypeDesc"
                    label="交易类型"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="transactionDate"
                    label="交易日期"
                    header-align="right"
                ></TableColumn>
                <TableColumn
                    prop="checkDate"
                    label="对账日期"
                    header-align="right"
                ></TableColumn>
                <TableColumn
                    prop="detailReason"
                    label="差错帐详细信息"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="dealStatusDesc"
                    label="状态"
                    header-align="center"
                ></TableColumn>
            </Table>
            <tooltip name="tooltip_pay_billProcessing">
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
                :page-sizes="[20, 30, 40]"
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
    import $http from '@Pay/services/billProcessing'
    import DetailsDialog from './DetailsDialog'
    import DealWithDialog from './DealWithDialog'
    import config from '@/config'
    import payMixins from '@Pay/mixins'

    export default {
        name: 'BillProcessingList',
        components: {DetailsDialog, DealWithDialog},
        mixins: [...payMixins],
        data() {
            return {
//                查询的日期范围
                tradeDate: '',
                isShowDetails: false,
                isShowDealWith: false,
//                一级渠道列表
                oneLevelChannelList: [],
//                二级渠道列表
                twoLevelChannelList: [],
                businessPlatformList: [{
                    value: '1000',
                    label: 'BOSS平台'
                }, {
                    value: '2000',
                    label: 'OMS平台'
                }, {
                    value: '3000',
                    label: 'SCM平台'
                }, {
                    value: '4000',
                    label: 'TMS平台'
                }, {
                    value: '5000',
                    label: 'WMS平台'
                }, {
                    value: '6000',
                    label: 'B2B交易平台'
                }, {
                    value: '7000',
                    label: '供应链金融平台'
                }, {
                    value: '0000',
                    label: '支付清结算平台'
                }],
                errorTypeList: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '已处理'
                }, {
                    value: '0',
                    label: '未处理'
                }, {
                    value: '2',
                    label: '结果未知'
                },],
//                表单数据
                form: {
//                    交易流水
                    serialNo: '',
//                    业务平台
                    systemId: '',
//                    一级渠道
                    channel: '',
//                    二级渠道
                    twoChanne: '',
//                    订单号
                    buOrderNo: '',
//                    支付渠道
                    payMethod: '',
//                    时间范围
                    tradeDate: '',
//                    差错状态
                    dealStatus: ''
                },
//                表格数据
                tableData: [],
//                数据总量
                pageTotal: 0,
//                分页每页多少条
                pageSize: 20,
//                当前页数
                currentPage: 1,
//                表格小工具
                toolTipList: [],
//                当前被点击行的数据
                currentRowInfo: {},
//                用来存储表格勾选的数据的id值
                ids: []
            }
        },
        methods: {
//            获取时间
            dateRangeChange(createTime) {
                this.form.tradeDate = createTime
            },
//            点击查询按钮
            queryBill() {
                this.page({
                    currentPage: 1,
                    pageSize: this.pageSize,
                    ...this.form
                })
            },
//            清空输入条件
            clearChoose() {
                for (let key in this.form) {
                    this.form[key] = ''
                }
            },
//            每页的条数改变时触发
            sizeChange(size) {
                this.pageSize = size
                this.page({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                })
            },
//            当前页数改变时触发
            currentChange(size) {
                this.currentPage = size
                this.page({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                })
            },
//            点击表格小工具时触发
            clickTooltipButton(content) {
                switch (content) {
                    case '详情':
//                        显示详情dialog
                        this.isShowDetails = true
                        break
                    case '处理':
//                        显示处理dialog
                        this.detail()
                        break
                }
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'tooltip_pay_billProcessing')
            },
//            点击表格的某一行时触发
            clickTableRow(row, event, column) {
                if (column.type === 'selection') return
                this.currentRowInfo = {...row}
//                如果此条数据已处理
                if (row.dealStatus === '1') {
                    this.toolTipList = [{
                        content: '详情'
                    }]
                } else {
                    this.toolTipList = [{
                        content: '处理'
                    }]
                }
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'tooltip_pay_billProcessing')
            },
//            勾选表格时触发
            selectTable(selection) {
                for (let item of selection) {
                    this.ids.push(item.id)
                }
            },
            async detail() {
                try {
                    const {data} = await $http.detail({
                        id: this.currentRowInfo.id
                    })
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.currentRowInfo = {...result}
                        this.isShowDealWith = true
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
            },
            async page(parameter) {
                try {
                    const {data} = await $http.page(parameter)
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                        渲染表格
                        if (result.items) {
                            this.tableData = [...result.items]
                        } else {
//                            如果为空，则没有查询到数据，弹出提示
                            this.$root.bus.$emit('pay_showToast', [{
                                message: '未查询到符合条件的数据',
                                type: 'error'
                            }])
                        }
//                        告诉分页有多少条数据
                        this.pageTotal = result.totalCount
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
            },
            async listOneLevelChannelInfo() {
                try {
                    const {data} = await $http.listOneLevelChannelInfo()
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                        渲染一级渠道下拉框
                        this.oneLevelChannelList = [...result]
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
            },
            async listTwoLevelChannelInfoByParentSn(parentSn) {
                try {
                    const {data} = await $http.listTwoLevelChannelInfoByParentSn({
                        parentSn
                    })
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                        渲染二级渠道下拉框
                        this.twoLevelChannelList = [...result]
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
        },
        created() {
//            获取一级渠道列表
            this.listOneLevelChannelInfo()
//            获取表格数据
            this.page({
                currentPage: 1,
                pageSize: 20
            })
//            监听导出按钮的点击
            this.$root.bus.$on('pay_billProcessing_export', () => {
//                直接改变浏览器地址，下载文件
                window.location.href = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/export?ids=${this.ids}`
            })
//            监听导出全部按钮的点击
            this.$root.bus.$on('pay_billProcessing_exportAll', () => {
//                直接改变浏览器地址，下载文件
                window.location.href = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/export`
            })
//            监听刷新按钮的点击
            this.$root.bus.$on('pay_billProcessing_refresh', () => {
                this.page({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                })
            })
        }
    }
</script>
