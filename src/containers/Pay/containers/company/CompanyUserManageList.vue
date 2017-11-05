<style lang='scss' scoped></style>
<template>
    <div class="g-tab-out-box company-user-manage-list" ref="outBox">
        <div class="m-query">
            <div class="m-query-block">
                <label class="u-query-label">企业名称</label>
                <Input v-model="form.companyName"></Input>
            </div>
            <div class="m-query-block">
                <label class="u-query-label">注册时间</label>
                <DatePicker
                    type="daterange"
                    placeholder="选择日期范围"
                    range-separator="~"
                    :editable="false"
                    v-model="createTime"
                    @change="dateRangeChange"
                />
            </div>
            <div class="m-query-block">
                <label class="u-query-label">状态</label>
                <Select v-model="form.status" placeholder="请选择" popper-class="pay-query-select">
                    <Option v-for="item in statusList" :key="item.value" :label="item.label"
                            :value="item.value"></Option>
                </Select>
            </div>
            <div class="m-query-block">
                <label class="u-query-label">类型</label>
                <Select v-model="form.companyType" placeholder="请选择" popper-class="pay-query-select">
                    <Option v-for="item in companyTypeList" :key="item.value" :label="item.label"
                            :value="item.value"></Option>
                </Select>
            </div>
            <div class="m-query-block">
                <Button class="u-query-btn" @click="queryData">查询</Button>
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
                    prop="companyName"
                    label="企业名称"
                    header-align="center"
                    class-name="linkColumn"
                ></TableColumn>
                <TableColumn
                    prop="createTime"
                    label="注册时间"
                    header-align="center"
                    align="right"
                ></TableColumn>
                <TableColumn
                    prop="statusDesc"
                    label="状态"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="industry"
                    label="所属行业"
                    header-align="center"
                ></TableColumn>
                <TableColumn
                    prop="companyAddressDetail"
                    label="详细地址"
                    header-align="center"
                ></TableColumn>
            </Table>
            <tooltip name="tooltip_pay_company">
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
            ></Pagination>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/company.js'
    import config from '@/config'
    import payMixins from '@Pay/mixins'

    export default {
        name: 'CompanyUserManageList',
        mixins: [...payMixins],
        data() {
            return {
                form: {
//                    开户状态
                    status: '',
//                     企业名称
                    companyName: '',
//                    注册时间-开始
                    startDate: '',
//                    注册时间-结束
                    endDate: '',
//                    企业类型
                    companyType: ''
                },
//                查询的日期范围
                createTime: '',
//                开户状态选择下拉框数据
                statusList: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 1,
                    label: '启用'
                }, {
                    value: 0,
                    label: '停用'
                }],
//                企业类型下拉框数据
                companyTypeList: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '企业'
                    },
                    {
                        value: 2,
                        label: '个体'
                    }
                ],
                // 表格数据
                tableData: [],
//                表格小工具
                toolTipList: [
                    {
                        content: '停用'
                    },
                    {
                        content: '详情'
                    }
                ],
//                当前表格点击行信息
                currentRowInfo: '',
//                分页中每页有多少条
                pageSize: 20,
//                列表共多少条
                pageTotal: 0,
//                分页当前页
                currentPage: 1,
//                结果提示组件内容
                toastTitle: '',
//                结果提示组件显示隐藏控制
                isShowToast: false,
//                结果提示组件类型
                toastType: 'success',
//                用来存储表格勾选的数据的id值
                idStr: [],
//                表格勾选中的数据
                selectionTable: []
            }
        },
        methods: {
//            获取时间
            dateRangeChange(createTime) {
                const [startDate, endDate] = createTime.split('~')
                this.form.startDate = startDate
                this.form.endDate = endDate
            },
//            查询数据
            queryData() {
                this.renderTableList({
                    currentPage: 1,
                    pageSize: 10,
                    ...this.form
                })
            },
//            清空选择
            clearChoose() {
                for (let key in this.form) {
                    this.form[key] = ''
                }
            },
            clickTableRow(row, event, column) {
                this.currentRowInfo = {...row}
//                如果是点击了企业名称则不弹出小工具，进入详情页
                if (column.label === '企业名称') {
                    this.$emit('pay_company_trrigerEdit', ['详情', this.currentRowInfo])
                    return
                }
//                如果是点击了选择框则不弹出小工具
                if (column.type === 'selection') return
//                根据当前点击的状态判断小工具弹出的内容
                const channelUseConfig = [{content: '停用'}, {content: '详情'}]
                const channelDisConfig = [{content: '启用'}, {content: '详情'}]
                row.statusDesc === '启用' ? this.toolTipList = [...channelUseConfig] : this.toolTipList = [...channelDisConfig]
//                弹出小工具
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'tooltip_pay_company')
            },
            selectTable(selection) {
                this.selectionTable = [...selection]
            },
            clickTooltipButton(type) {
//              判断当前点击的表格小工具的哪个功能
                switch (type) {
                    case '详情':
                        this.$emit('pay_company_trrigerEdit', ['详情', this.currentRowInfo])
                        break
                    case '启用':
                        this.updateStatus(1, this.currentRowInfo)
                        break
                    case '停用':
                        this.updateStatus(0, this.currentRowInfo)
                        break
                }
            },
//            每页的条数改变时触发
            sizeChange(size) {
                this.pageSize = size
                this.renderTableList({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                })
            },
//            当前页数改变时触发
            currentChange(size) {
                this.currentPage = size
                this.renderTableList({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                })
            },
            async updateStatus(isUse, currentRowInfo) {
                try {
                    const {id} = currentRowInfo
                    const {data} = await $http.updateStatus({
                        status: isUse,
                        id
                    })
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: isUse ? '启用成功' : '停用成功',
                            type: 'error'
                        }])
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
            async renderTableList(parameter) {
                try {
                    const {data} = await $http.listCompanyOpenAccountInfoByPage(parameter)
                    const {attachment, result, status} = data
                    if (status.statusCode === 0) {
//                        复制一份数据
                        this.tableData = [...result]
//                        告诉分页一共有多少条数据
                        this.pageTotal = attachment.total
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
//            获取表格初始数据
            this.renderTableList({
                currentPage: 1,
                pageSize: 20
            })
//            监听导出按钮的点击
            this.$root.bus.$on('pay_company_exportData', () => {
                const idStr = []
                for (let item of this.selectionTable) {
                    idStr.push(item.id)
                }
//                直接修改url地址进行下载
                window.location.href = `${config.server.http}${config.server.host}:${config.server.port}/pay-admin-web/companyOpenAccountInfo/export?idStr=${idStr}`
            })
//            监听导出全部按钮的点击
            this.$root.bus.$on('pay_company_exportAllData', () => {
//                直接修改url地址进行下载
                window.location.href = `${config.server.http}${config.server.host}:${config.server.port}/pay-admin-web/companyOpenAccountInfo/export?page=1&rows=${this.pageTotal}&pageSize=${this.pageTotal}`
            })
            this.$root.bus.$on('pay_company_start', () => {
//                如果当前没有选择信息，则返回
                if (!this.selectionTable.length) return
//                循环选中的数据，发送ajax启用
                for (let item of this.selectionTable) {
                    this.updateStatus(1, item)
                }
            })
            this.$root.bus.$on('pay_company_stop', () => {
//                如果当前没有选择信息，则返回
                if (!this.selectionTable.length) return
//                循环选中的数据，发送ajax停用
                for (let item of this.selectionTable) {
                    this.updateStatus(0, item)
                }
            })
//            监听刷新按钮的点击
            this.$root.bus.$on('pay_company_refresh', () => {
                this.renderTableList({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                })
            })
        }
    }
</script>
