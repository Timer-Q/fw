<template>
  <div class="wms-items"  v-if="isCache">
      <!--标签功能操作栏  start-->
      <div class="wms-modal-div clearfix">
          <div>
              <p class="btnGroup">
                  <a href="javascript:;" @click="differentialCallback">差异回告</a>
              </p>
              <p class="btnGroup">
                  <a href="javascript:;">日志</a>
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

                  <!--主表单  start-->
                  <div class="information-list">
                      <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click='rowClick' @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                          <TableColumn type="index" label="序号" width="70"></TableColumn>
                          <TableColumn type="selection" width="55"></TableColumn>
                          <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                          <TableColumn prop="differenceNo" label="差异单号"  width="150"></TableColumn>
                          <TableColumn prop="inboundNotifyNo" label="入库通知单号"  width="150"></TableColumn>
                          <TableColumn prop="externalNo" label="外部单号"  width="150"></TableColumn>
                          <TableColumn prop="ownerId" label="货主"  width=""></TableColumn>
                          <TableColumn prop="supplierId" label="供应商"  width=""></TableColumn>
                          <TableColumn prop="notifyVariety" label="通知品种"  width=""></TableColumn>
                          <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                          <TableColumn prop="shippedQty" label="实发数量" width=""> </TableColumn>
                          <TableColumn prop="receivedQty" label="实收数量" width=""> </TableColumn>
                          <TableColumn prop="differenceQty" label="差异数量" width=""> </TableColumn>
                      </Table>
                  </div>
                  <!--主表单  end-->
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
                      <!--子表单  start-->
                      <div class="details-list">
                          <p>任务表单：{{selectionDetailLabelNo}}</p>
                          <div class="information-list">
                              <Table :data="selectionDetailList" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                  <TableColumn type="index" prop="" label="序号" width="70"></TableColumn>
                                  <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                  <TableColumn prop="handleDifference" label="差异处理"  width="">
                                          <template slot-scope="props" >
                                                  <el-select v-model="props.row.handleDifference" placeholder="请选择">
                                                      <el-option
                                                          v-for="item in props.row.handleDifferenceChoice"
                                                          :key="item.value"
                                                          :label="item.label"
                                                          :value="item.value">
                                                      </el-option>
                                                  </el-select>
                                          </template>
                                  </TableColumn>
                                  <TableColumn prop="differenceNo" label="差异单号"  width=""></TableColumn>
                                  <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                  <TableColumn prop="shippedQty" label="实发数量"  width=""></TableColumn>
                                  <TableColumn prop="receivedQty" label="实收数量"  width=""></TableColumn>
                                  <TableColumn prop="differenceQty" label="差异数量"  width=""></TableColumn>
                                  <TableColumn prop="remark" label="备注"> </TableColumn>
                              </Table>
                          </div>
                          <!--子表单  end-->
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
                  <a href="javascript:;" class="modify">修改</a>
                  <a href="javascript:;" class="clear">清空</a>
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
  </div>
</template>
<script>

		import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/arrivalWarehousing'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/receivingDifference/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/receivingDifferenceDetail/getList',//子列表
        finishList:'/wms-inbound-server/receivingDifference/finish'
    }
    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],

    data () {
      return {
      		/*页签*/
					tag:'wms_arrivalWarehousing_receivingDifferenceManage',
	        system:'/wms',
	        titleName:'收货差异管理',
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
              label: '差异处理'
          }, {
              value: '选项2',
              label: '差异待处理'
          }],
          value: '',
          /*options1: [{
              value: '选项1',
              label: '介于'
          }, {
              value: '选项2',
              label: '等于'
          }],
          value1: '',*/
          //表单数据 数组
          tableData: [],
          // 当前选择的数据项目
          multipleSelection:[],
          // 贴码单明细列表
          selectionDetailList:[],
          selectionDetailLabelNo:'-',
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
	        //提交数据结构
	        queryBack:{
			        "detailList": [
			            {
											"handleDifference": 1,
			                "id": 1,
			                "warehouseId": 1
			            }
			        ],
							"differenceNo": "1",
			        "id": 1,
			        "warehouseId": 1
		    	}
      }
    },
    methods: {
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

        //获取主列表
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
                        let $tr = _this.$refs.pastCodeTable.$el.getElementsByTagName('tr')[1] // 第一行数据，表头也是使用的tr标签。
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
        //需在主表单table上绑定@row-click事件
        // 行点击事件 ,主要功能展示贴单详情列表
        rowClick(row, event, column){
            console.log("row %o, event %o, column %o", row, event, column)
            //获取子表单任务单号
            _this.selectionDetailLabelNo = row.inboundNotifyNo
            //获取明细列表
            _this.getDetailList(row.id,api.getlabelDetailList)
        },
        //获取明细列表，id 主表项数据的id，url 获取明细的接口地址
        getDetailList(id,uri) {
          _this.$request({
              url: uri,
              context: _this,
              sendData: {differenceId:id},
              successCallback: (_this,response)=>{
                _this.selectionDetailList = _this.formatJJJJJData(response)//结果赋给实际的明细表格绑定的数据项。
            }
          })
        },
        handleSelectionChange(val) {
          this.multipleSelection = val
          console.log(this.multipleSelection.length)
        },
        // format 叽叽叽叽数据就是奇怪的数据,搞成数据，list还是list只是把奇怪是数据搞成数组
        // 后端数据是这样 {差异确认:200,差异再确认:3000}
        // 临时方案，需要后端调整接口数据结构
        formatJJJJJData(list){
        	let temArr = []
        	for(var i in list){
        			temArr = []
        		 for(var j in list[i].handleDifferenceChoice){
        		 		temArr.push({label:j,value:list[i].handleDifferenceChoice[j]})
        		 }
        		 list[i].handleDifferenceChoice = temArr
        	}

        	return list
        }
        ,
        differentialCallback() {

        		// 没有选择数据的情况，没有选项可以在弹出窗中扫码得到信息。
						if(_this.multipleSelection.length == 0){
							_this.alert("empty")
				        	return
				        }

						let ids = _this.utilFn.getFieldArrFormObjectArr(_this.multipleSelection,'id')

        		_this.$request({
	              url:api.finishList,
	              context:_this,
	              sendData:_this.selectionDetailList,
	              successCallback:function(_this,response){

	              }
	          })

        },


        // 单独纯提示弹窗,type提示框类型根据 type参数配置不同的提示
       		alert(type){
       			let config = {
       				empty:{
       					title:'操作提示',
            			tip:'当前没有选择数据项，请选择数据后再进行操作'
       				},
       				statusErr:{
       					title:'操作提示',
	                	tip:'"到货登记"只能操作状态为“通知收货”的数据，请确认状态！'
       				},
       				statusEndErr:{
       					title:'操作提示',
	                	tip:'"结束卸货时间"只能操作状态为“收货中”的数据，请确认状态！'
       				},
       				onlyOne:{
       					title:'操作提示',
	                	tip:'当前操作只能选择一条数据！'
       				},
       				fail:{
       					title:'操作失败提示',
	                	tip:'当前操作失败，请稍后再试！'
       				}

       			}


       			this.$alert(config[type].tip, config[type].title, {
		          confirmButtonText: '确定',
		          callback: action => {
		          }
		        })
       		},
    },
       created(){
            _this = this
            this.utilFn = utilFn
        },
        mounted() {
            this.getList()
        }
  }
</script>

<style lang="scss" type="text/scss">
       .listComboBox {
           .Table td .cell {
               padding: 0;
               .el-select>.el-input {
                   width: 100%;
                   .el-input__icon + .el-input__inner {
                       padding-right: 35px;
                       border: none;
                       width: 100%;
                   }
               }
           }
       }

</style>

