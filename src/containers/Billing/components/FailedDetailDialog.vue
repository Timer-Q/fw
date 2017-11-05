<template>
    <el-dialog :title="title" :visible.sync="dialogVisible.dialogFailedDetailVisible" size="large" class="result-dialog">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(col, index) in cols" :key="index" :prop="col.prop" :label="col.label" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a href="javascript:;" v-if="col.prop === 'code'">{{ scope.row[col.prop]}}</a>
                    <span v-else-if="col.prop === 'billStatus'">{{ scope.row[col.prop] | statusFormat }}</span>
                    <span v-else-if="col.prop === 'invoiceType'">{{ scope.row[col.prop] | invoiceTypeFormat }}</span>
                    <span v-else-if="col.prop === 'docDate'">{{ scope.row[col.prop] | dateFormat }}</span>
                    <span v-else>{{ scope.row[col.prop] }}</span>
                </template>
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