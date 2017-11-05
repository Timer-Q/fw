<style lang='scss' scoped>

</style>
<template>
    <div class="list-out-box company-user-manage-list">
        <div class="query-box">
            <div class="query-block">
                <label class="query-block-label">企业账号</label>
                <Input/>
            </div>
            <div class="query-block">
                <label class="query-block-label">企业名称</label>
                <Input/>
            </div>
            <div class="query-block">
                <label class="query-block-label">所属机构</label>
                <Select v-model="belongMechanism" placeholder="请选择" popper-class="pay-query-select">
                    <Option v-for="item in belongMechanismList" :key="item.value" :label="item.label" :value="item.value" />
                </Select>
            </div>
            <div class="query-block">
                <label class="query-block-label">类型</label>
                <Select v-model="companyType" placeholder="请选择" popper-class="pay-query-select">
                    <Option v-for="item in companyTypeList" :key="item.value" :label="item.label" :value="item.value" />
                </Select>
            </div>
            <div class="query-block">
                <Button>查询</Button>
            </div>
            <div class="query-block">
                <p @click="clearChoose" class="query-block-clear">清空</p>
            </div>
        </div>
        <div class="table-box" :style="tableBoxStyle">
            <Table
                border
                :data="tableData"
                :highlight-current-row="isHighlightCurrentRow"
                @current-change="chooseCurrentRow"
                @cell-click="clickCurrentRow"
            >
                <TableColumn prop="serialNumber" label="序号" />
                <TableColumn prop="name" label="企业名称" />
                <TableColumn prop="numbering" label="商户编号" />
                <TableColumn prop="mechanism" label="所属机构" />
                <TableColumn prop="time" label="注册时间" />
                <TableColumn prop="state" label="状态" />
                <TableColumn prop="industry" label="所属行业" />
                <TableColumn prop="province" label="省份" />
                <TableColumn prop="city" label="地市" />
            </Table>
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
            <Pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'CompanyUserManageList',
    data() {
        return {
            tableBoxStyle: {
                width: '957px'
            },
            isHighlightCurrentRow: true,
            // 所属机构
            belongMechanismList: [
                {
                    value: '机构1',
                    lable: '机构1'
                },
                {
                    value: '机构2',
                    lable: '机构2'
                },
                {
                    value: '机构3',
                    lable: '机构3'
                }
            ],
            belongMechanism: '',
            companyTypeList: [
                {
                    value: '全部',
                    lable: '全部'
                },
                {
                    value: '企业',
                    lable: '企业'
                },
                {
                    value: '个体',
                    lable: '个体'
                }
            ],
            // 企业类型
            companyType: '',
            // 表格数据
            tableData: [
                {
                    serialNumber: '',
                    name: '',
                    numbering: '',
                    mechanism: '',
                    time: '',
                    state: '',
                    industry: '',
                    province: '',
                    city: ''
                },
                {
                    serialNumber: '',
                    name: '',
                    numbering: '',
                    mechanism: '',
                    time: '',
                    state: '',
                    industry: '',
                    province: '',
                    city: ''
                },
                {
                    serialNumber: '',
                    name: '',
                    numbering: '',
                    mechanism: '',
                    time: '',
                    state: '',
                    industry: '',
                    province: '',
                    city: ''
                },
                {
                    serialNumber: '',
                    name: '',
                    numbering: '',
                    mechanism: '',
                    time: '',
                    state: '',
                    industry: '',
                    province: '',
                    city: ''
                }
            ],
            toolTipList: [
                {
                   content: '停用'
                },
                {
                    content: '详情'
                }
            ]
        }
    },
    methods: {
        clearChoose() {

        },
        chooseCurrentRow() {

        },
        clickCurrentRow() {

        },
        clickTooltipButton() {

        }
    }
}
</script>