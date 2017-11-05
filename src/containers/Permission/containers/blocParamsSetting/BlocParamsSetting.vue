<template>
    <div class="blocParamsSetting" v-if="isCache" ref="listOutBox">
        <div class="projection">
            <div v-if="showalter">
                <Button class="public-function-btn" @click="alter">修改</Button>
                <Button class="public-function-btn" @click="refresh">刷新</Button>
            </div>
            <div v-if="!showalter">
                <Button class="public-function-btn" @click="save">保存</Button>
                <Button class="public-function-btn" @click="cancel">取消</Button>
            </div>
        </div>
        <div class="tableDate">
            <el-table :data="table.tableDate" border style="width: 840px">
                <el-table-column label="序号" width="40" type="index">
                </el-table-column>
                <el-table-column label="参数代码" prop="paramCode" width="80">
                </el-table-column>
                <el-table-column label="参数名称" width="158" prop="paramName">
                </el-table-column>
                <el-table-column label="备注" prop="remark" width="267">
                </el-table-column>
                <el-table-column label="参数值">
                    <template slot-scope="scope">
                        <el-radio class="radio" :disabled="table.disabled" v-model="scope.row.radio" :label="JSON.parse(scope.row.paramValue)[0].name">{{JSON.parse(scope.row.paramValue)[0].name}}</el-radio>
                        <el-radio class="radio" :disabled="table.disabled" v-model="scope.row.radio" :label="JSON.parse(scope.row.paramValue)[1].name">{{JSON.parse(scope.row.paramValue)[1].name}}</el-radio>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
const GROUPID = 1
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
import { getBlocParamsList, saveTable } from '@Permission/services/blocService.js'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig],
    data() {
        return {
            titleName: '集团参数设置',
            tag: 'permission_blocParamsSetting',
            tabType: '',
            table: {
                tableDate: [],
                disabled: true
            },
            itemTableDate: [],
            showalter: true
        }
    },
    created() {
        this._getTableDate()
    },
    methods: {
        alter() {
            this.itemTableDate = [].concat(JSON.parse(JSON.stringify(this.table.tableDate)))
            this.table.disabled = false
            this.showalter = false
        },
        refresh () {
            this._getTableDate('refresh')
        },
        async save() {
            this.showalter = true
            this.table.disabled = true
            var tempTableDate = this.table.tableDate.slice(0)
            var tempArr
            var saveTableDate = []
            tempTableDate.forEach(value => {
                tempArr = JSON.parse(value.paramValue)
                tempArr.forEach(val => {
                    val.select = '0'
                    if (val.name === value.radio) {
                        val.select = '1'
                    }
                })
                value.paramValue = JSON.stringify(tempArr)
                saveTableDate.push({ id: value.id, paramValue: value.paramValue, groupId: GROUPID})
            })
            try {
                let response = await saveTable(saveTableDate)
                console.log(response, 'responseresponseresponse')
            } catch (error) {
                alert(error)
            }
        },
        cancel() {
            this.table.tableDate = this.itemTableDate
            this.table.disabled = true
            this.showalter = true
        },
        _tidyTableDate(data) { // 目的是加一个radio方便单选框选定
            data.forEach(value => {
                var index = JSON.parse(value.paramValue).findIndex(val => {
                    return val.select === '1'
                })
                this.$set(value, 'radio', JSON.parse(value.paramValue)[index].name)
            })
            this.table.tableDate = data
        },
        async _getTableDate(isrefresh) {
            let id = 1
            try {
                let response = await getBlocParamsList(id)
                console.log(response, 'getBlocParamsListgetBlocParamsList111112')
                this._tidyTableDate(response.data.result)
                if (response.data.status.statusCode === 0 && isrefresh === 'refresh') {
                    this.$message({
                        message: '刷新成功',
                        type: 'success'
                    })
                }
            } catch (error) {
                alert(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.blocParamsSetting {
    .tableDate {
        margin-left: 16px;
        margin-top: 16px;
    }
}
.el-message {
    z-index: 10000 !important;
}
</style>


