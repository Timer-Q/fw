<template>
  <section class="invoicing billing-form-inline">
      <div class="billing-btn-group">
        <el-button size="small" :plain="true" type="primary" @click="handleGoBack">返回</el-button>
      </div>
      <el-table ref="multipleTable" :data="logData" border tooltip-effect="light" style="width: 100%" highlight-current-row>
            <el-table-column header-align="center" align="left" fixed type="index" label="序号" width="70"></el-table-column>
            <el-table-column header-align="center" v-for="(item, index) in logDataCols" align="left" min-width="100" :prop="item.prop" :label="item.label" :key="index" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="item.prop === 'date'">{{ scope.row[item.prop] | dateFormat}}</span>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
        </el-table>
  </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    import payableBillService from '@Billing/services/payableBillService.js'
    export default {
        props: {
            tabAttr: {
                type: Object
            }
        },
        data () {
            return {
                billId: '',
                logData: [],
                logDataCols: [
                    {
                        label: '操作',
                        prop: 'operation'
                    },
                    {
                        label: '操作人',
                        prop: 'user'
                    },
                    {
                        label: '时间',
                        prop: 'date'
                    },
                ]
            }
        },
        methods: {
            handleGoBack () {
                this.$root.bus.$emit('removeTwoLevelTab', this.tabAttr.tag)
            }
        },
        created () {
            this.$nextTick(async () => {
                this.billId = this.Billing_G_GET_HANDLE_DATA.payableBillIds[0]
                try {
                    let response = await payableBillService.getLogs({id: this.billId})
                    this.logData = response.data.result
                } catch (error) {
                    console.error(error, 'get log error')
                }
            })
        },
        computed: {
            ...mapGetters([
                'Billing_G_GET_HANDLE_DATA'
            ])
        }
    }
</script>
