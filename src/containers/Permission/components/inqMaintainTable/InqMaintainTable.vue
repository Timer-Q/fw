<template>
    <div class="inqMaintainTable">
        <table border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th v-for="(itemH, index) in dataPermissionTableHead" :key="index" :style="{width: itemH.width}">
                        <el-checkbox v-model="itemH.checked" v-if="itemH.checkbox" @change="_computedCheckbox(itemH.name)" :indeterminate="itemH.indeterminate" :disabled="lockCheckbox"></el-checkbox>
                        <span>{{itemH.name}}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(itemB, idx) in dataPermissionTableData" :key="idx">
                    <td>{{idx + 1}}</td>
                    <td v-for="(value, key) in itemB" :key="key">
                        <span v-if="key.indexOf('Checkbox') < 0">{{value}}</span>
                        <el-checkbox v-show="key.indexOf('Checkbox') >= 0" v-model="value.isCheck" :disabled="lockCheckbox"></el-checkbox>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        dataPermissionTableHead: {
            type: Array,
            default: []
        },
        dataPermissionTableData: {
            type: Array,
            default: []
        },
        dataPermissionTableHeadCheck: {
            type: Object,
            default: function() {
                return { // 通过这种方式缓存查询头的checked
                    inquireChecked: false
                }
            }
        },
        lockCheckbox: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        _inquireCheckboxChange(inquireChecked) {
            this.dataPermissionTableData.forEach(function(value, index) {
                if (value.inquireCheckbox && inquireChecked) {
                    value.inquireCheckbox.isCheck = true
                } else {
                    value.inquireCheckbox.isCheck = false
                }
            })
        },
        _maintainCheckboxChange(maintainChecked) {
            this.dataPermissionTableData.forEach(function(value, index) {
                if (value.maintainCheckbox && maintainChecked) {
                    value.maintainCheckbox.isCheck = true
                } else {
                    value.maintainCheckbox.isCheck = false
                }
            })
            if (maintainChecked) {
                this.dataPermissionTableHead.forEach((value, index) => {
                    if (value.name === '查询') {
                        value.checked = true
                        this.dataPermissionTableHeadCheck.inquireChecked = value.checked
                    }
                })
            }
            this._inquireCheckboxChange(this.dataPermissionTableHeadCheck.inquireChecked)
        },
        _computedCheckbox: function(name) {
            let maintainChecked, inquireChecked
            this.dataPermissionTableHead.forEach((value, index) => {
                if (value.name === '维护') {
                    maintainChecked = value.checked
                } else if (value.name === '查询') {
                    inquireChecked = value.checked
                }
            })
            if (name === '查询') {
                this._inquireCheckboxChange(inquireChecked)
            } else if (name === '维护') {
                this._maintainCheckboxChange(maintainChecked)
            }
        }
    },
    watch: {
        // 功能是给查询和维护的顶部状态做监听
        dataPermissionTableData: {
            handler: function(newValue, oldValue) {
                console.log(newValue)
                let maintainCheckNum = 0
                let inquireCheckNum = 0
                newValue.forEach((value, index) => {
                    if (value.maintainCheckbox.isCheck === true) {
                        value.inquireCheckbox.isCheck = true
                        maintainCheckNum++
                    }
                    if (value.inquireCheckbox.isCheck === true) {
                        inquireCheckNum++
                    }
                })
                if (maintainCheckNum > 0 && maintainCheckNum < newValue.length) {
                    this.dataPermissionTableHead.forEach((value, index) => {
                        if (value.name === '维护') {
                            value.indeterminate = true
                        }
                    })
                } else if (maintainCheckNum === newValue.length) {
                    this.dataPermissionTableHead.forEach((value, index) => {
                        if (value.name === '维护') {
                            value.indeterminate = false
                            value.checked = true
                        }
                    })
                } else if (maintainCheckNum === 0) {
                    this.dataPermissionTableHead.forEach((value, index) => {
                        if (value.name === '维护') {
                            value.indeterminate = false
                            value.checked = false
                        }
                    })
                }
                // 查询
                console.log(inquireCheckNum)
                if (inquireCheckNum > 0 && inquireCheckNum < newValue.length) {
                    this.dataPermissionTableHead.forEach((value, index) => {
                        if (value.name === '查询') {
                            value.indeterminate = true
                        }
                    })
                } else if (inquireCheckNum === newValue.length) {
                    this.dataPermissionTableHead.forEach((value, index) => {
                        if (value.name === '查询') {
                            value.indeterminate = false
                            value.checked = true
                        }
                    })
                } else if (inquireCheckNum === 0) {
                    this.dataPermissionTableHead.forEach((value, index) => {
                        if (value.name === '查询') {
                            value.indeterminate = false
                            value.checked = false
                        }
                    })
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
.inqMaintainTable {
    table {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        width: 651px;
        text-align: center;
        tr {
            font-size: 14px;
            color: #333;
            td,
            th {
                border-left: 1px solid #ccc;
                border-top: 1px solid #ccc;
                height: 28px;
                line-height: 28px;
            }
            th {
                font-weight: normal;
                height: 30px;
                line-height: 30px;
                background-color: #eee;
            }
        }
    }
}
</style>

