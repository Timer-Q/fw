<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <router-link to="/wms/arrivalWarehousing/pasteCodeNew">新增</router-link>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="confirm">确认</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="deleteLabel">删除</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">打印贴码</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="printerSetup=true">打印机设置</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="getList">刷新</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">日志</a>
                </div>
            </div>
            <!--删除提示开始-->
            <el-dialog :title="dialogInfo.title" class="operationTip" :modal="false" :visible.sync="operationTip" >
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
            </el-dialog>
            <!--删除提示结束-->
            <!--打印机设置开始-->
            <el-dialog title="打印机设置" class="printerSetup" :visible.sync="printerSetup" >
                <el-form ref="form" :model="form" label-width="98px">
                    <el-form-item label="收货单打印机">
                        <el-input class="adviceNumber"></el-input>
                        <a href="javascript:;">设置</a>
                    </el-form-item>
                    <el-form-item label="当前打印机">
                        <el-input class="adviceNumber"></el-input>
                        <a href="javascript:;">设置</a>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton">确认</el-button>
                </span>
            </el-dialog>
            <!--打印机设置结束-->
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
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
                            <div class="inblock">
                                <span class="hspace">任务单号</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">业务单据号</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">业务单据类型</span>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">供应商</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">状态</span>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">单据来源</span>
                                <el-input></el-input>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button>查询</el-button>
                            <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单  start-->
                    <div class="information-list">
                        <Table id='pastCodeTable' @selection-change="handleSelectionChange" @row-click='rowClick' ref='pastCodeTable' @current-change="handleCurrentChange" :data="tableData" highlight-current-row border tooltip-effect="dark" style="width: 100%"  :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn type = 'index' label="序号"></TableColumn>
                            <TableColumn type="selection" width=""></TableColumn>
                            <TableColumn prop="statusDesc" type="status" label="状态"></TableColumn>
                            <TableColumn prop="barCodeOrderNo" label="任务单号"></TableColumn>
                            <TableColumn prop="businessNo" label="业务单据号"  width=""></TableColumn>
                            <TableColumn prop="businessTypeDesc" label="业务单据类型"  width=""></TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="supplierName" label="供应商"  width=""></TableColumn>
                            <TableColumn prop="varietyQty" label="品种"  width=""></TableColumn>
                            <TableColumn prop="goodsQty" label="数量"  width=""></TableColumn>
                            <TableColumn   prop="printStatusDesc" label="打印标识" width=""></TableColumn>
                            <TableColumn   prop="sourceTypeDesc" label="单据来源" width=""></TableColumn>
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
                        <div class="modifyButton">
                            <!--a :href= '/pasteCodeManage/modifyReceipts/{{selectionid}}'>修改{{selectionid}}</a-->
                            <router-link :to="modifyReceiptsUrl">修改</router-link>
                        </div>
                        <!--表单  start-->
                        <div class="details-list">
                            <p>任务表单：{{selectionDetailLabelNo}}</p>
                            <div class="informationDetail-list">
                                <Table :data="selectionDetailList" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" highlight-current-row>
                                    <TableColumn type='index' label="序号" width="70"></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="goodsId" label="SKU编码"  width=""></TableColumn>
                                    <TableColumn prop="goodsBarCode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="unitConvert" label="整零转换"  width=""></TableColumn>
                                    <TableColumn prop="unit" label="单位" width=""></TableColumn>
                                    <TableColumn prop="qty" label="打印数量"  width=""></TableColumn>
                                    <TableColumn prop="printStatusDesc" label="打印标识"  width=""></TableColumn>
                                    <TableColumn prop="printNum" label="打印次数"  width=""></TableColumn>
                                    <TableColumn prop="printTime" label="打印时间"  width=""></TableColumn>
                                    <TableColumn prop="printUser" label="打印人"  width=""></TableColumn>
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
        <el-dialog title="高级查询" class="advancedQuery dialogPopup" :visible.sync="dialogTableVisible">
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
            <el-button class="confirmButton" @click="dialogTableVisible = false">立即查询</el-button>
          </span>
        </el-dialog>
        <!--高级查询弹出层结束-->

        <!--
        	作者：offline
        	时间：2017-09-11
        	描述：确认，删除失败提示列表
        -->
        <el-dialog title="操作列表" class="advancedQuery dialogPopup" :visible.sync="dialogFailTable">
            <Table :data="failTable" border>
                <TableColumn property="index" label="序号" width="60"></TableColumn>
                <TableColumn property="id" label="ID" width="100"></TableColumn>
                <TableColumn property="orderType"  label="类型" width="100"></TableColumn>
                <TableColumn property="retMsg" label="信息"></TableColumn>
            </Table>

        </el-dialog>

        <!--
        	作者：offline
        	时间：2017-09-11
        	描述：批量操作失败，或者部分失败提示框
        -->
        <el-dialog title="操作提示" size='tiny' class="" :visible.sync="dialogFailPart">
            <template>
            	 <p style='padding:20px;'>
	            	操作数据失败{{failTable.length}}条。<br><br>
	            	<a @click='dialogFailPart=false; dialogFailTable = true;'>查看详情</a>
	            </p>
            </template>

        </el-dialog>
    </div>
</template>
<script>
	import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

	import '@asserts/fonts/iconfont.css'
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/arrivalWarehousing'


	let api = {
		getlist:'/wms-pub-server/barcodeorder/getList', // 不分页
		getlistwithpage:'/wms-pub-server/barcodeorder/getList', // 分页
		getlabelDetailList:'/wms-pub-server/barcodeorder/getDetailList',  // 根据id获取明细列表
		getlabelDetail:'/wms-pub-server/barcodeorder/get',
		getLabelNumber:'/wms-pub-server/barcodeorder/count',
		delete:'/wms-pub-server/barcodeorder/batchDelete',
		add:'/wms-pub-server/barcodeorder/save',		// 添加贴码单信息
		confirm:'/wms-pub-server/barcodeorder/batchConfirm',  // 确认贴码单信息
		print:'/wms-pub-server/barcodeorder/print' // 打印贴码单信息

	}

    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_pasteCodeManage',
				system:'/wms',
				titleName:'贴码管理',
                input1:'',
                input:'',
                tableData:[],

                dialogTableVisible:false,// 高级查询弹出
                printerSetup:false,// 打印机设置
                operationTip:false,// 删除提示
                dialogFailTable:false, // 操作失败列表
                dialogFailPart:false, // 失败，部分失败弹窗提示
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
                value:'',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                // 弹窗信息配置
                dialogInfo:{
                	title:'操作提示',
                	operateType:'deleteLabel',
                	tip:'确定要删除吗'
                },
                // 当前选择的数据项目
                multipleSelection:[],
                // 贴码单明细列表
                selectionDetailList:[],
                selectionDetailLabelNo:'-',
                // 保存当前选择的项id，给修改组件使用
                selectionid:0,
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
                // 批量操作失败列表展示
                failTable:[],
                // 修改地址
                modifyReceiptsUrl:'/arrivalWarehousing/pasteCodeManage/modifyReceipts/'+this.selectionid
            }
        },
        methods: {
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
            enableSuccess() {
                this.$message({
                    message: '启用成功！',
//                  type: 'warning',
                    duration: 2000,
                    iconClass: 'iconfont icon-chenggong'
                })
            },
            stopSuccess() {
                this.$message({
                    message: '停用成功！',
//                type: 'success',
                    duration: 2000,
                    iconClass: 'iconfont icon-chenggong'
                })
            },
            // 刷新
			/*refresh(){
            	location.reload()
			},*/
            // 获取主列表
            getList(param){
            	let _this = this
            	let _param = param || {}
            	let org = Object.assign({},_this.listQueryParam, _param)

            	_this.$request({
            		url:api.getlistwithpage,
            		sendData:org,
            		context:_this,
            		successCallback:function(context, response){

            			context.tableData=response
						if(typeof response.count == 'number'){
	                    	_this.pagination.total = response.count
	                    }
						if(response.length == 0){return}

            			// 需要等到表格渲染完毕之后再执行选择和激活样式添加。 默认选中第一行，并请求相应的贴码详情
            			setTimeout(()=>{
            				//_this.$refs.pastCodeTable.toggleRowSelection(_this.tableData[0])
            				let $tr = document.getElementById('pastCodeTable').getElementsByTagName('tr')[1] // 第一行数据，表头也是使用的tr标签。
            				if($tr){
	                        	$tr.className = 'current-row '+ $tr.className
	                        }
            				console.log(_this.$refs.pastCodeTable.data[0].id)
            				_this.selectionid = _this.$refs.pastCodeTable.data[0].id
            				_this.selectionDetailLabelNo = _this.$refs.pastCodeTable.data[0].barCodeOrderNo
            				_this.modifyToUrl(_this.selectionid)
            				// 默认获取第一行数据的详情列表
            				_this.getDetailList(_this.$refs.pastCodeTable.data[0].id, api.getlabelDetailList)
            			},20)
            		}
            	})
            },


            // 删除主列表项
            deleteLabel(){
            	console.log('del: ',this.multipleSelection.length)
            	if(this.multipleSelection.length == 0){
		        	this.alert('empty')
		        	return
		        }

		        // 判断选择的数据状态是不是都是创建状态，0，创建，1确认，2已打印 ，如果是false则不能继续。
		        let status = true
		        for(let i of this.multipleSelection){
		        	if(i.status != 0){
		        		status = false
		        		break
		        	}
		        }

		        if(!status){
		        	this.alert('statusErr')
		        	return
		        }
		       	this.showDialog('del')

            },

            // 实际 的删除操作   暂时没有批量删除接口，只有单个删除接口，所以暂时只链接测试单个删除接口
            delete(org){
            	let _this = this
            	let param = org ? org : {}
            	let ids = _this.utilFn.getFieldArrFormObjectArr(_this.multipleSelection,'id')

            	_this.$request({
            			url:api.delete,
            			sendData:{ids: ids, updateUser:'updateUser11'},
            			context:_this,
            			successCallback:function(_this, response){
		            		_this.operationTip = false
		            		//if(response.status.statusCode == "0"){
		            			// 删除成功后刷新列表
		            			_this.getList()
		            		//}
			            }
	            })
            },

            // 确认操作
           	confirm(){
           		let _this = this


           		// 没有选择项时。
           		if(this.multipleSelection.length == 0){
		        	_this.alert('empty')
		        	return
		        }

		        // 判断选择的数据状态是不是都是创建状态，0，创建，1确认，2已打印 ，如果是false则不能继续。
		        let status = true
		        for(let i of this.multipleSelection){
		        	if(i.status != 0){
		        		status = false
		        		break
		        	}
		        }

		        if(!status){
		        	this.alert('statusErr')
		        	return
		        }

           		let ids = _this.utilFn.getFieldArrFormObjectArr(this.multipleSelection,'id')

           		_this.$request({
           			url:api.confirm,
           			context:_this,
           			sendData:{ids:ids,updateUser:'11111'},
           			successCallback:(_this, response)=>{
           				console.log("确认返回结果：",response)
           				let len =response.length
           				if(len > 0){
           					_this.dialogFailTable = response
           					this.dialogFailPart = true
           				}else{
           					this.$alert("数据确认成功"+ids.length+"条！", "操作成功", {
					          confirmButtonText: '确定',
					          callback: action => {
					          }
					        })
           				}
           			}
           		})
           	},

            // 选择数据项后的处理
	        handleSelectionChange(val) {
				this.multipleSelection = val
				console.log(this.multipleSelection.length)
		    },
		    // 行点击事件 ,主要功能展示贴单详情列表
		    rowClick(row, event, column){
		    	let _this = this
		     	console.log("row %o, event %o, column %o",row, event, column)
		     	_this.selectionDetailList = row.labelOrderDetailDtos
            	_this.selectionDetailLabelNo = row.barCodeOrderNo
            	_this.selectionid = row.id

            	_this.modifyToUrl(_this.selectionid)
            	//获取列表
            	_this.getDetailList(_this.selectionid, api.getlabelDetailList)

		    },
		    //处理当前列表项的选择和取消
		    handleCurrentChange(currentRow,oldCurrentRow){
		    	console.log('currentRow:',currentRow)
		    },

		    // 获取贴码明细列表
		    getDetailList(id,uri){
				let _this = this

				_this.$request({
					url:uri,
					context:_this,
					sendData:{barCodeOrderId:id},
					successCallback:(_this,response)=>{
						_this.selectionDetailList = response
					}
				})
		    },

		    // 修改按钮链接地址.
		    modifyToUrl(selectionid){
		    	console.log("selectionid:",selectionid)
        		let modiArr = this.modifyReceiptsUrl.split('/')
        			modiArr.pop()
        			modiArr.push(selectionid)
        		this.modifyReceiptsUrl = modiArr.join('/')
       		},
       		// 单独纯提示弹窗,type提示框类型根据 type参数配置不同的提示
       		alert(type){
       			let config = {
       				statusErr:{
       					title:'操作提示',
	                	tip:'该操作只能操作状态为“创建”的单据，请确认状态！'
       				},
       				empty:{
       					title:'操作提示',
            			operateType:'empty',
            			tip:'当前没有选择数据项，请选择数据后再进行操作'
       				},

       			}


       			this.$alert(config[type].tip, config[type].title, {
		          confirmButtonText: '确定',
		          callback: action => {
		          }
		        })
       		},
       		// 弹窗组件调用
            dialog(param){
            	let _this = this
            	//let dialogInfo = param.dialogInfo ? param.dialogInfo : {}
            	let dialogInfo = param ? param : {}
            	// 合并对象参数
            	_this.dialogInfo = {..._this.dialogInfo, ...dialogInfo}

            	// 展示弹窗
            	_this.operationTip = true
            },

            // 需要展示弹窗的交互部分调用改成方法，传递参数该方法进行展示及调用操作
            showDialog(operateType){
            	let oType = operateType ? operateType : ''
            	let dialogInfo = { // 弹窗配置资源
            		del:{ // 删除提示框
            			title:'操作提示',
	                	operateType:'delete',
	                	tip:'确定要删除吗'
            		}
            	}
				console.log(operateType)
            	// 调用弹窗
            	this.dialog(dialogInfo[operateType])
            },
            // 操作方法，分发调用操作事件
            operateFun($event){
            	let _this = this
            	let target = $event.target
            		target = target.tagName.toLowerCase() == 'span' ? target.parentNode : target
            	let typett = target.getAttribute('data-type')
            	// 处理方法对象，利用对象属性名来存储方法,有对应的项应该添加对应的方法
            	let funs = {
            		delete:_this.delete
            		}
            	let org = {} // 各个处理方法需要根据需求设置参数

            	funs[typett](org)
            },
        },
        created(){
        	this.utilFn = utilFn
        },
        mounted() {
        	console.log("api:",api)
					this.getList()

        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    body{
        .newArrow-country{
            position: absolute;
            top: 12px;
        }
        .modifyButton{
            height: 22px;
            line-height: 21px;
            margin: 23px 0 10px;
            border:1px solid #8998a9;
            border-radius: 4px;
            width:46px;
            text-align: center;
            box-sizing: border-box;
        }
        .details-list{
            margin-top: 0;
        }
    }
    .arrivalAppointment{
        .label{
            width:72px;
            text-align:right;
            float:left;
            font-size:12px;
            margin-right:10px;
        }
    }
    .warmPrompt{
        width:650px;
        height:28px;
        line-height:28px;
        margin-bottom:10px;
        padding-left:10px;
        background:#fff8c7;
        color:#e29e3c;
        box-sizing: border-box;
    }
    .printerSetup{
        a{
            font-size:12px;
            text-decoration: underline;
            color:#4ab0e0;
            margin-left:10px;
        }
    }
    /*删除提示  start*/
    .operationTip{
        .operationIcon,.operationMsg{
            display:inline-block;
            float:left;
        }
        .iconfont.icon-baocuo{
            color:#ff0000;
            font-size:30px;
        }
        .operationMsg{
            margin-left:20px;
            a{
                text-decoration: underline;
                color:#211dbe;
            }
        }
    }
    /*删除提示  end*/
</style>

