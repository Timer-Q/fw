<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible.dialogTableVisible" size="small">
    <section class="dialog-content">
      <div class="dialog-left">
        <h3 class="dialog-sub-header">查询方案</h3>
      </div>
      <div class="dialog-right">
        <h3 class="dialog-sub-header">查询条件
          <a href="javascript:;" @click="showMoreSeachDialog">更多查询条件</a>
        </h3>
        <div class="dialog-right-content">
          <div class="dialog-search">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item style="width: 75%">
                <el-input size="small" placeholder="请输入您要保存的查询方案名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" :plain="true" type="primary" @click="">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="text">清空</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="gridData" border>
            <el-table-column header-align="center" type="index" label="序号" width="45"></el-table-column>
            <el-table-column header-align="center" prop="conditionName" label="条件名称" width="100"></el-table-column>
            <el-table-column header-align="center" prop="compareSymbol" label="关系符" class-name="no-padding-cell" width="100">
              <template slot-scope="scope">
                <el-select @change="handleSelectChange" size="mini" v-model="scope.row.compareSymbol" placeholder="请选择">
                  <el-option v-for="(item, index) in symbol" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column header-align="center" property="conditionValue" label="条件值" class-name="no-padding-cell" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.conditionValue" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
    <slot name="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogTitle: {
      type: String
    },
    dialogVisible: {
      type: Object
    },
    gridData: {
      type: Array
    },
    subNavPath: {
      type: String
    }
  },
  data () {
    return {
      symbol: [
        {
          value: 'EQUAL',
          label: '等于'
        }, {
          value: 'BETWEEN',
          label: '介于'
        }]
    }
  },
  methods: {
    handleSelectChange (val) {
      console.log(val)
    },
    showMoreSeachDialog () {
      this.$emit('moreSeachDialog')
    },
    handleSearch () {
      this.dialogVisible.dialogTableVisible = false
      this.$router.push({
        name: this.subNavPath,
        params: {
          subTitle: this.dialogTitle
        }
      })
    }
  }
}
</script>

