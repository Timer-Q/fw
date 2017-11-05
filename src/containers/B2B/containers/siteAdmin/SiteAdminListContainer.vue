<template>
    <div>
        <Form :inline="true" :model="formInline" class="demo-form-inline">
            <FormItem label="选择站点">
                <Select v-model="formInline.region" placeholder="活动区域">
                    <Option label="区域一" value="shanghai"></Option>
                    <Option label="区域二" value="beijing"></Option>
                </Select>
            </FormItem>
            <FormItem label="行政机构">
                <Select v-model="formInline.region" placeholder="活动区域">
                    <Option label="区域一" value="shanghai"></Option>
                    <Option label="区域二" value="beijing"></Option>
                </Select>
            </FormItem>
            <FormItem label="责任机构">
                <Select v-model="formInline.region" placeholder="活动区域">
                    <Option label="区域一" value="shanghai"></Option>
                    <Option label="区域二" value="beijing"></Option>
                </Select>
            </FormItem>
            <FormItem label="类型">
                <Select v-model="formInline.region" placeholder="活动区域">
                    <Option label="区域一" value="shanghai"></Option>
                    <Option label="区域二" value="beijing"></Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="onSubmit">查询</Button>
            </FormItem>
        </Form>
        <Table
            :data="tableData6"
            border
            height="200"
            :summary-method="getSummaries"
            show-summary
            style="width: 100%; margin-top: 20px">
            <TableColumn
                prop="id"
                label="ID"
                fixed
                width="180">
            </TableColumn>
            <TableColumn
                prop="name"
                label="姓名">
            </TableColumn>
            <TableColumn
                prop="amount1"
                label="数值 1（元）">
            </TableColumn>
            <TableColumn
                prop="amount2"
                label="数值 2（元）">
            </TableColumn>
            <TableColumn
                prop="amount3"
                label="数值 3（元）">
            </TableColumn>
        </Table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                tableData6: [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }, {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                }, {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!')
            },
            getSummaries(param) {
                const { columns, data } = param
                const sums = []
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价'
                        return
                    }
                    const values = data.map(item => Number(item[column.property]))
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)
                        sums[index] += ' 元'
                    } else {
                        sums[index] = 'N/A'
                    }
                })
                return sums
            }
        }
    }
</script>
