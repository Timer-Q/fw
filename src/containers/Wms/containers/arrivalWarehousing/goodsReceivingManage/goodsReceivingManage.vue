<template>
  <div class="wms-items"  v-if="isCache">
      <!--标签功能操作栏  start-->
      <div class="wms-modal-div clearfix">
          <div>
              <p class="btnGroup">
                  <a href="javascript:" @click="deleteBarCodeDetail">删除</a>
              </p>
              <p class="btnGroup">
                  <a href="javascript:" @click="getList">刷新</a>
              </p>
          </div>
      </div>
      <!--标签功能操作栏  end-->
      <!--主体内容  start-->
      <div class="wms-main">
          <div class="mainContainer clearfix">
              <div class="mainContent mainContent-storeInfo">

                  <!--表单头部    start-->
                  <div class="vehicle-find">
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
                      <div class="vehicle-data">
                          <p class="inblock">
                              <span class="hspace">货主</span>
                              <el-input></el-input>
                          </p>
                          <p class="inblock">
                              <span class="hspace">商品条码</span>
                              <el-input></el-input>
                          </p>
                          <p class="inblock">
                              <span class="hspace">商品名称</span>
                              <el-input></el-input>
                          </p>
                          <p class="inblock">
                              <span class="hspace">货位</span>
                              <el-input></el-input>
                          </p>
                          <span class="hspace">库区</span>
                          <el-input></el-input>
                      </div>
                      <div class="vehicle-btn">
                          <el-button>查询</el-button>
                          <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                      </div>
                  </div>
                  <!--表单头部    end-->

                  <!--表单  start-->
                  <div class="information-list">
                      <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click='rowClick' @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                          <TableColumn type="index" label="序号" width="70"></TableColumn>
                          <TableColumn type="selection" width="55"></TableColumn>
                          <TableColumn prop="workBatchNo" label="作业批次号" width="160"></TableColumn>
                          <TableColumn prop="containerCode" label="容器条码" width="130"></TableColumn>
                          <TableColumn prop="inboundNotifyNo" label="入库通知单号"  width="150"></TableColumn>
                          <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                          <TableColumn prop="supplierName" label="供应商"  width=""></TableColumn>
                          <TableColumn prop="receivedVariety" label="实收品种"  width=""></TableColumn>
                          <TableColumn prop="receivedQty" label="实收数量"  width=""></TableColumn>
                          <TableColumn prop="goodsProperty" label="正残属性" width=""> </TableColumn>
                          <TableColumn prop="isRf" label="RF收货" width=""> </TableColumn>
                          <TableColumn prop="receiverName" label="收货人" width=""> </TableColumn>
                          <TableColumn prop="receiveTime" label="收货时间" width=""> </TableColumn>
                          <TableColumn prop="status" label="状态" width=""> </TableColumn>
                      </Table>
                  </div>
                  <!--表单  end-->

                  <!--分页    start-->
                  <div class="paging">
                      <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handlePageCurrentChange"
                            :current-page="pagination.currentPage"
                            :page-sizes="pagination.pageSizes"
                            :page-size="listQueryParam.pageSize"
                            layout="total, sizes, prev, pager, next, jumper, slot"
                            :total="pagination.total">
                        </el-pagination>
                  </div>
                  <!--分页    end-->

                  <!--列表展开列表    start-->
                  <div class="mainContent-b">
                      <div class="arrow-bottom arrow-box" >
                          <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                      </div>
                      <!--表单  start-->
                      <div class="details-list">
                          <p>作业批次号：{{selectionDetailLabelNo}}</p>
                          <div class="information-list">
                              <Table :data="selectionDetailList" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                  <TableColumn type='index' label="序号" width="70"></TableColumn>
                                  <TableColumn prop="containerCode" label="容器条码"  width=""></TableColumn>
                                  <TableColumn prop="goodsId" label="SKU编码"  width=""></TableColumn>
                                  <TableColumn prop="goodsId" label="商品条码"  width=""></TableColumn>
                                  <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                  <TableColumn prop="unitConvertText" label="整零转换" width="130"></TableColumn>
                                  <TableColumn prop="qty" label="数量" width=""></TableColumn>
                                  <TableColumn prop="unit" label="单位" width=""></TableColumn>
                                  <TableColumn prop="totalQty" label="总数量" width=""></TableColumn>
                                  <TableColumn prop="goodsProperty" label="正残属性" width=""></TableColumn>
                                  <TableColumn prop="isSn" label="SN标识" width=""></TableColumn>
                                  <TableColumn prop="productBatchNo" label="生产批号" width=""></TableColumn>
                                  <TableColumn prop="productDate" label="生产日期" width=""></TableColumn>
                                  <TableColumn prop="expiryDate" label="失效日期" width=""></TableColumn>
                                  <TableColumn prop="status" label="状态" width=""></TableColumn>
                              </Table>
                          </div>
                          <!--表单  end-->
                      </div>
                  </div>
                  <!--列表展开列表    end-->
              </div>
          </div>
      </div>
      <!--主体内容  end-->

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
                  <el-input v-model="input" placeholder="综合方案" ></el-input>
                  <el-button :disabled="true" class="cancelButton">保存查询方案</el-button>
                  <a href="javascript:" class="modify">修改</a>
                  <a href="javascript:" class="clear">清空</a>
              </div>
              <div>
                  <Table :data="gridData" border>
                      <TableColumn property="index" label="序号" width="60"></TableColumn>
                      <TableColumn property="conditionName" label="条件名称" width="100"></TableColumn>
                      <TableColumn property="relationCharacter" class-name="noPaddingCol"  label="关系符" width="100">
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
            <el-button  class="confirmButton"  @click="dialogTableVisible = false">立即查询</el-button>
          </span>
      </el-dialog>
      <!--高级查询弹出层结束-->
      <!--删除提示开始-->
      <!--<el-dialog :title="dialogInfo.title" class="operationTip" :modal="false" :visible.sync="operationTip" >
          <div>
              <div class="operationIcon">
                  <i class="iconfont icon-baocuo"></i>
              </div>
              <div class="operationMsg">
                  <div>{{ dialogInfo.tip }}</div>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button class="cancelButton" @click="operationTip = false">取 消</el-button>
                <el-button type="primary" :data-type="dialogInfo.operateType" @click="operateFun($event)">确 定</el-button>
          </span>
      </el-dialog>-->
      <!--删除提示结束-->
  </div>
</template>
<script type="es6">

		import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/receivingwork/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/receivingwork/getDetailList',//子列表
        delete: '/wms-inbound-server/receivingwork/delete'//通过id删除收货作业信息
    }
    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        created(){
            _this = this
        },
    data () {
      return {
	      	/*页签*/
            tag:'wms_arrivalWarehousing_goodsReceivingManage',
	        system:'/wms',
	        titleName:'收货作业管理',
          //表单数据 数组
          tableData: [],
          // 当前选择的数据项目
          multipleSelection:[],
          // 贴码单明细列表
          selectionDetailList:[],
          //子表单单号
          selectionDetailLabelNo:'-',

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
          input: '',
          options: [{
              value: '选项1',
              label: '介于'
          }, {
              value: '选项2',
              label: '等于'
          }],
          value: '',
          dialogTableVisible: false,//高级查询
          operationTip:false,//删除提示
          // 获取列表查询条件分页部分
	        listQueryParam:{
	        	pageNumber:1, // 起始页面（从1开始）一个神奇的名字
	        	pageSize:10,
	        	pageStart:0 //起始条数（从0开始）
	        },
	        // 分页
	        pagination:{
	        	pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
	        	total:100,
	        	currentPage:1,
	        },
      }
    },
    methods: {

        /*刷新当前页面*/
       /* refresh() {
            location.reload()
        },*/
        /*分页*/
        handleSizeChange(val) {
	        console.log(`size每页 ${val} 条`)
	        this.listQueryParam.pageSize = val

	        // 默认调整页面size后从第一页开始显示
	        this.listQueryParam.currentPage = 1
	        this.listQueryParam.pageStart = 0

	        this.getList()
        },
        handlePageCurrentChange(val) {
            console.log(`cur当前页: ${val}`)
            this.listQueryParam.currentPage = val
            this.pagination.currentPage = val
						this.listQueryParam.pageNumber = val
						this.listQueryParam.pageStart = (val-1) * this.listQueryParam.pageSize // 分页接口设计不合理，还得前端传送总体第几条，或者是bug，不能这么搞啊。。。。

            this.getList()
        },
        // 获取主列表
        getList(param){
	          let _this = this
	        	let _param = param || {}
	        	let org = Object.assign({},_this.listQueryParam, _param)

            _this.$request({
                url:api.getlist,  // 获取列表接口
                sendData:org,   // 参数
                context:_this,
                successCallback:function(context, response){
                    context.tableData=response.dtoList   // 结果赋值给实际的明细表格绑定的数据项。
                    if(typeof response.count == 'number'){
                    	_this.pagination.total = response.count
                    }
                    if(context.tableData.length == 0){return}
                    // 需 默认选中第一行，并请求相应的贴码详情。要等到表格渲染完毕之后再执行选择和激活样式添加。
                    setTimeout(()=>{
                        //_this.$refs.pastCodeTable.toggleRowSelection(_this.tableData[0])  //默认选择第一行 带复选框选中状态
                        let $tr = document.getElementById('pastCodeTable').getElementsByTagName('tr')[1] // 第一行数据，表头也是使用的tr标签。
                        if($tr){
                        	$tr.className = 'current-row '+ $tr.className
                        }
                        //默认获取第一行数据对应的子表单单号
                        _this.selectionDetailLabelNo = _this.$refs.pastCodeTable.data[0].inboundNotifyNo
                        // 默认获取第一行数据的详情列表
                        _this.getDetailList(_this.$refs.pastCodeTable.data[0].id, api.getlabelDetailList)
                    },20)
                }
            })
        },
        // 需要在主表table上绑定 @row-click事件
        // 行点击事件 ,主要功能展示贴单详情列表
        rowClick(row, event, column){
            console.log("row %o, event %o, column %o",row, event, column)
            //获取子表单任务单号
            _this.selectionDetailLabelNo = row.inboundNotifyNo
            //获取明细列表
            _this.getDetailList(row.id, api.getlabelDetailList)
        },
        // 获取明细列表，id主表项数据的id，uri获取明细的接口地址
        getDetailList(id,uri){
            _this.$request({
                url:uri,//子表单的api地址
                context:_this,//this
                sendData:{receivingWorkId:id},//主表单的id
                successCallback:(_this,response)=>{
                    _this.selectionDetailList = response  // 结果赋值给实际的明细表格绑定的数据项。
                }
            })
        },
        // 选择数据项后的处理,批量处理操作，复选框选择后获得的数据。
        handleSelectionChange(val) {
            this.multipleSelection = val
            console.log(this.multipleSelection.length)
        },
        // 删除列表操作。
        deleteBarCodeDetail(){
            // 没有选择的情况 ，弹窗处理
            if(_this.multipleSelection.length == 0){
              const h = this.$createElement
                _this.$msgbox( {
                    title: '标题',
                    message: h('p',null,'当前没有选择项，请选择后再进行操作'),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    callback: action => {
                    }
                })
                return
            }
            // 删除选择明细
            const h = this.$createElement
            this.$msgbox( {
                title: '标题',
                message: h('p',null,[
                    h('span',null,'您确定要删除这些资料吗？'),
                    h('br',null),
                    h('i',null,'删除后将不在恢复。')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action) => {
                    if (action === 'confirm') {
                        // 从数组中删除掉数据
                        _this.deleteArrayItem(_this.tableData,_this.multipleSelection)
                    }else {
                        return
                    }
                }
                /*beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        _this.deleteArrayItem(_this.tableData,_this.multipleSelection)
                        done()
                    }else {
                      done()
                    }
                }*/
            })
        },
        // 删除数组中的指定内容的元素,baseArr,原数组，filterArr，需要在baseArr中删除的数组内容
        deleteArrayItem(baseArr, filterArr){
            let len = filterArr.length-1
            console.log("len:",len)
            for(var i = len; i>=0;  i--){
                console.log("删除明细项：",i)
                let blen = baseArr.length-1
                for(var j=blen; j>=0; j--){
                    console.log("baseArr id:",baseArr[j].barCodeOrderId)
                    // 删除原本存在的数据，这部分数据有id
                    if(baseArr[j] && baseArr[j].id && baseArr[j].id == filterArr[i].id ){
                        console.log("index....:",j)
                        baseArr.splice(j,1)
                        continue
                    }else if(!baseArr[j].id && baseArr[j]._index == filterArr[i]._index){
                        // 新添加数据，需要添加标记判断区分数据。
                        console.log("删除新增项：",i)
                        baseArr.splice(j,1)
                    }else {

                    }
                }
            }

        },
        /*删除框弹出层*/
        Delete() {
            this.$confirm('message','title',{
                title: '操作提示',
                message: '此操作将永久删除该文件, 是否继续?',
                customClass: ' delete-layer',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success',
                beforeClose: (action,instance,done)
            })
               /* .then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })*/
        }
    },
        mounted() {
            this.getList()
        }
  }
</script>

<style scoped>

</style>

