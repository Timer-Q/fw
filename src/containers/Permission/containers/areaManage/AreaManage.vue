<template>
    <div class="areaManage" v-if="isCache" ref="listOutBox">
        <div class="projection">
            <div v-if="details">
                <Button class="public-function-btn" @click="alter">修改</Button>
                <Button class="public-function-btn" @click="refresh">刷新</Button>
            </div>
            <div v-if="!details">
                <Button class="public-function-btn" @click="save">保存</Button>
                <Button class="public-function-btn" @click="cancel">取消</Button>
            </div>
        </div>
        <div class="areaManageTable">
            <el-table :data="tableDate" border style="width: 488px">
                <el-table-column label="序号" width="40" type="index">
                </el-table-column>
                <el-table-column label="管理维度" prop="name" width="80">
                </el-table-column>
                <el-table-column label="是否启用" width="67">
                    <template slot-scope="scope">
                        <span v-if="details">{{scope.row.status ? '√' : ''}}</span>
                        <el-checkbox v-model="scope.row.status" v-if="!details"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="remark">
                </el-table-column>
            </el-table>
        </div>
    </div>
    </div>
</template>

<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
import { getListBasePermissionManagementsByPOJO, updateBasePermissionManagement } from '@Permission/services/management.js'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data() {
        return {
            titleName: '系统初始化管理',
            system: '/permission',
            tag: 'permission_areaManage',
            tabType: '',
            details: true,
            tempTable: [],
            tableDate: []
        }
    },
    created () {
        this._getListBasePermissionManagementsByPOJO()
    },
    methods: {
        alter() {
            this.tempTable = [].concat(JSON.parse(JSON.stringify(this.tableDate)))
            this.details = !this.details
        },
        save() {
            let ajaxData = []
            this.details = !this.details
            this.tableDate.forEach(value => {
                this.tempTable.forEach(val => {
                    if (value.id === val.id && value.status !== val.status) {
                        ajaxData.push({id: value.id, status: value.status})
                    }
                })
            })
            this._updateBasePermissionManagement(ajaxData)
            console.log(ajaxData)
        },
        refresh() {
            this._getListBasePermissionManagementsByPOJO()
        },
        cancel() {
            this.tableDate = this.tempTable
            this.details = !this.details
        },
        async _getListBasePermissionManagementsByPOJO() {
            let res = await getListBasePermissionManagementsByPOJO()
            this.tableDate = res.data.result
            console.log(res.data.result, 666666666666666666)
        },
        async _updateBasePermissionManagement(data) {
            let res = await updateBasePermissionManagement(data)
            console.log(res, '77777788888888888888')
        }
    }
}
</script>

<style lang="scss">
.areaManageTable {
    margin: 16px;
}

.el-table__header-wrapper {
    table {
        font-size: 14px;
        tr {
            .cell {
                font-weight: normal;
                padding: 0;
                text-align: center;
            }
            th {
                height: 30px;
                line-height: 30px;
            }
            td {
                height: 26px;
                line-height: 26px;
            }
        }
    }
}

.el-table td {
    height: 27px;
    line-height: 27px;
}

.el-table th {
    height: 30px;
    line-height: 30px;
    background-color: #eeeeee;
}
</style>


