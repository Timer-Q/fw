<template>
    <el-dialog :title="title" :visible.sync="dialogVisible.dialogFailedDetailVisible" size="small" class="result-dialog">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(col, index) in cols" :key="index" :prop="col.prop" :label="col.label">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
export default {
    props: {
        cols: {
            type: Array,
            default: []
        },
        tableData: {
            type: Array
        },
        title: {
            type: String,
            default: '数据详情'
        },
        dialogVisible: {
            type: Object
        }
    }
}
</script>

