<template>
  <div class="wms-items" v-if="isCache">
      <!--标签功能操作栏  start-->
      <div class="wms-modal-div clearfix">
          <div>
              <p class="btnGroup">
                  <a href="javascript:;" class="">导出明细</a>
              </p>
              <p class="btnGroup">
                  <a href="javascript:;" class="use-btn">刷新</a>
              </p>
          </div>
      </div>
      <!--标签功能操作栏  end-->
      <!--主体内容  start-->
      <div class="wms-main">
          <div class="mainContainer clearfix">
              <div class="grid">
                  <div class="mainContent">
                      <!--表单头部  start-->
                      <div class="vehicle-find">
                          <div class="query-btn">
                              <div class="query-btn el-dropdown-link" >
                                  <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  查询方案<i class="iconfont icon-fangan"></i>
                </span>
                                      <!--查询方案弹出层开始-->
                                      <el-dropdown-menu class="wms-el-dropdown-menu" slot="dropdown">
                                          <el-dropdown-item divided>黄金糕
                                              <span>
                      <i class="iconfont icon-xiugai"></i>
                      <i class="iconfont icon-guanbi"></i>
                      </span>
                                          </el-dropdown-item>
                                          <el-dropdown-item divided>狮子头
                                              <span>
                      <i class="iconfont icon-xiugai"></i>
                      <i class="iconfont icon-guanbi"></i>
                      </span>
                                          </el-dropdown-item>
                                          <el-dropdown-item divided>螺蛳粉
                                              <span>
                      <i class="iconfont icon-xiugai"></i>
                      <i class="iconfont icon-guanbi"></i>
                      </span>
                                          </el-dropdown-item>
                                          <el-dropdown-item divided>双皮奶
                                              <span>
                      <i class="iconfont icon-xiugai"></i>
                      <i class="iconfont icon-guanbi"></i>
                      </span>
                                          </el-dropdown-item>
                                          <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                                      </el-dropdown-menu>
                                      <!--查询方案弹出层结束-->
                                  </el-dropdown>
                              </div>
                          </div>
                          <div class="vehicle-data">
                              <p class="inblock">
                                  <span class="hspace">货主</span>
                                  <input type="text" class="license-number" placeholder="请输入电话号码">
                              </p>
                              <p class="inblock">
                                  <span class="hspace">商品条码</span>
                                  <input type="text" class="license-number" placeholder="请输入电话号码">
                              </p>
                              <p class="inblock">
                                  <span class="hspace">商品名称</span>
                                  <input type="text" class="license-number" placeholder="请输入电话号码">
                              </p>
                              <p class="inblock">
                                  <span class="hspace">货位</span>
                                  <input type="text" class="license-number" placeholder="请输入电话号码">
                              </p>
                              <span class="hspace">库区</span>
                              <input type="text" class="license-number" placeholder="我是文本">
                          </div>
                          <div class="vehicle-btn">
                              <button type="button" class="search-btn">查询</button>
                              <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                          </div>
                      </div>
                      <!--表单头部  end-->


                      <!--表单  start-->
                      <div class="information-list">
                          <Table :data="mainFormTableData" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                              <TableColumn prop="id" label="序号" width="70"></TableColumn>
                              <TableColumn type="selection" width="55"></TableColumn>
                              <TableColumn prop="" label="仓库"  width=""></TableColumn>
                              <TableColumn prop="" label="货主"  width=""></TableColumn>
                              <TableColumn prop="" label="库区"  width=""></TableColumn>
                              <TableColumn prop="" label="货位"  width=""></TableColumn>
                              <TableColumn prop="" label="商家编码"  width=""></TableColumn>
                              <TableColumn prop="" label="商品名称"  width=""></TableColumn>
                              <TableColumn prop="" label="商品条码"  width=""></TableColumn>
                              <TableColumn prop="" label="规格型号" width=""> </TableColumn>
                              <TableColumn prop="" label="保质期天数" width="90"> </TableColumn>
                              <TableColumn prop="" label="生产日期" width=""> </TableColumn>
                              <TableColumn prop="" label="失效日期" width=""> </TableColumn>
                              <TableColumn prop="" label="生产批号" width=""> </TableColumn>
                              <TableColumn prop="" label="整零转换" width=""> </TableColumn>
                              <TableColumn prop="" label="单位" width=""> </TableColumn>
                              <TableColumn prop="" label="出入位数量" width="90"> </TableColumn>
                              <TableColumn prop="" label="出入位类型" width="90"> </TableColumn>
                              <TableColumn prop="" label="业务类型" width=""> </TableColumn>
                              <TableColumn prop="" label="业务单据" width=""> </TableColumn>
                              <TableColumn prop="" label="物流类型" width=""> </TableColumn>
                              <TableColumn prop="" label="物流单据" width=""> </TableColumn>
                              <TableColumn prop="" label="时间" width=""> </TableColumn>
                              <TableColumn prop="" label="被动拆包" width="95"> </TableColumn>
                              <TableColumn prop="" label="主动拆包" width="95"> </TableColumn>
                          </Table>
                      </div>
                      <!--表单  start-->


                      <!--分页    start-->
                      <div class="paging">
                          <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="currentPage4"
                              :page-sizes="[30, 50, 100, 150]"
                              :page-size="30"
                              layout="total, sizes, prev, pager, next, jumper, slot"
                              :total="400">
                          </el-pagination>
                      </div>
                      <!--分页    end-->

                  </div>
              </div>
          </div>
      </div>
      <!--高级查询弹出层开始-->
      <el-dialog title="高级查询" class="advancedQuery" :visible.sync="dialogTableVisible">
          <div class="advancedLeft">
              <ul>
                  <li class="queryPlan">查询方案</li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
                  <li>查询方案
                      <i class="iconfont icon-guanbi"></i>
                  </li>
              </ul>
          </div>
          <div class="advancedRight">
              <div class="queryCondition">查询条件</div>
              <div class="queryOperation">
                  <el-input v-model="input" placeholder="综合方案" :disabled="true"></el-input>
                  <el-button :disabled="true">保存查询方案</el-button>
                  <a href="javascript:;" class="modify">修改</a>
                  <a href="javascript:;" class="clear">清空</a>
              </div>
              <div>
                  <Table :data="gridData" border>
                      <TableColumn property="index" label="序号" width="60"></TableColumn>
                      <TableColumn property="conditionName" label="条件名称" width="100"></TableColumn>
                      <TableColumn property="relationCharacter"  label="关系符" width="100">
                          <template slot-scope="scope">
                              <el-select v-model="value" placeholder="请选择">
                                  <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value" class="selectFontSize">
                                  </el-option>
                              </el-select>
                          </template>
                      </TableColumn>
                      <TableColumn property="conditionValue" label="条件值"></TableColumn>
                  </Table>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">立即查询</el-button>
          </span>
      </el-dialog>
      <!--高级查询弹出层结束-->
  </div>
</template>
<script type="es6">
    import s from '../../../appService/appService'
    let _this = null

    export default {
        created(){
            _this = this
        },
    data () {
      return {

          detailsFormsUrl: '',//表单地址

          /*表单数据 数组*/
          tableData: [],

          /*高级查询*/
          gridData: [{
              index: '1',
              conditionName: '单据编码',
              relationCharacter: '等于',
              conditionValue:'FEDSDFHDSKJ14uo4ui'
          }, {
              index: '1',
              conditionName: '单据编码',
              relationCharacter: '等于',
              conditionValue:'FEDSDFHDSKJ14uo4ui'
          }, {
              index: '1',
              conditionName: '单据编码',
              relationCharacter: '等于',
              conditionValue:'FEDSDFHDSKJ14uo4ui'
          }, {
              index: '1',
              conditionName: '单据编码',
              relationCharacter: '等于',
              conditionValue:'FEDSDFHDSKJ14uo4ui'
          }],
          dialogTableVisible: false,
          input: '',
          options: [{
              value: '选项1',
              label: '介于'
          }, {
              value: '选项2',
              label: '等于'
          }],
          value: '',

          /*分页*/
          currentPage4: 4
      }

    },
    methods: {
        /*分页*/
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
    }
  }
</script>

<style scoped>

</style>

