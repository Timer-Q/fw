<template>
  <el-dialog title="更多查询条件" :visible.sync="dialogVisible.dialogMoreSearchVisible" size="small">
    <section class="dialog-content">
      <div class="dialog-left">
        <h3 class="dialog-sub-header">查询方案</h3>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="dialog-right">
        <div class="dialog-right-content">
          <el-table border>
            <el-table-column header-align="center" type="index" label="序号" width="45"></el-table-column>
            <el-table-column header-align="center" property="conditionName" label="条件名称" width="100"></el-table-column>
            <el-table-column header-align="center" property="compareSymbol" label="关系符" class-name="no-padding-cell" width="100">
              <template slot-scope="props">
                <el-select @change="handleSelectChange(props.row.compareSymbol.id)" size="mini" v-model="props.row.compareSymbol.id" placeholder="请选择">
                  <el-option v-for="(item, index) in props.row.compareSymbol.symbol" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column class-name="no-padding-cell" header-align="center" property="conditionValue" label="条件值" show-overflow-tooltip>
              <template slot-scope="props">
                <el-date-picker
                  v-model="value7"
                  type="daterange"
                  align="right"
                  placeholder="选择日期范围"
                  :picker-options="pickerOptions2"
                  @change="handleDateChange"
                  size="mini">
                </el-date-picker>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="warning" @click="dialogVisible.dialogMoreSearchVisible = false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value6: '',
      value7: ''
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    handleDateChange () {
      console.log(this.value7)
    }
  },
  props: {
    dialogVisible: {
      type: Object
    }
    // gridData: {
    //   type: Array
    // }
  },
  updated () {
    console.log('更多查询条件dialog updated')
  }
}
</script>

