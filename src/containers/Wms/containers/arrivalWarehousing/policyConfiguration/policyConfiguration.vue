<template>
  <div class="wms-items"  v-if="isCache">
      <!--标签功能操作栏  start-->
      <div class="wms-modal-div clearfix">
          <div>
              <div class="btnGroup">
                  <el-button @click="addNew">新增</el-button>
              </div>
              <div class="btnGroup">
                  <a href="javascript:;" class="" :plain="true" @click="batchHandle('start')">启用</a>
                  <i>|</i>
                  <a href="javascript:;" class="" :plain="true" @click="batchHandle('block')">停用</a>
              </div>
              <!--新增弹出层开始-->
              <el-dialog title="参数基本信息" :visible.sync="isAdded" class="addPopup">
                <div class="firstLine">当前序号&nbsp;&nbsp;<span>{{addForm.strategyId}}</span></div>
               <el-form ref="addForm" :model="addForm" label-width="70px">
	               <div class="groupL">
	                  <div class="groupL-p">
                          <el-form-item label="参数描述">
                              <el-input name="strategyName" v-model="addForm.strategyName" disabled></el-input>
                          </el-form-item>
	                  </div>
	                  <div class="groupL-p f_l">
                          <el-form-item label="策略值">
                              <el-select v-model="addForm.strategyValue" placeholder="请选择">
                                  <el-option label="是" value="1"></el-option>
                                  <el-option label="否" value="0"></el-option>
                              </el-select>
                          </el-form-item>
                          <i class="iconfont icon-xiajiantou"></i>
	                  </div>
	                </div>
	                <div class="groupL">
                        <el-form-item label="仓库">
                            <el-input name="warehoseName" v-model="addForm.warehouseName" disabled></el-input>
                        </el-form-item>
	                  <div class="groupL-p f_l">
                          <el-form-item label="货主">
                              <el-select v-model="addForm.ownerId" placeholder="请选择">
                                  <el-option v-for="(item,index) in owners"
                                             :key="index"
                                             :label="item.name"
                                             :value="item.id">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <i class="iconfont icon-xiajiantou"></i>

                      </div>
	                </div>
                   <div class="groupL-p groupL-pTextarea">
                       <el-form-item label="备注">
                           <el-input type="textarea" v-model="addForm.remark" :rows="2" placeholder="请输入内容"></el-input>
                           <i class="textarea-prompt"><b class="words-number">0</b>/200</i>
                       </el-form-item>
                   </div>
	              </el-form>
	                <span slot="footer" class="dialog-footer">
	                  <el-button class="cancelButton" @click="isAdded = false">取消</el-button>
	                  <el-button class="cancelButton" @click = "saveAndUpdate('new')">保存并新增</el-button>
	                  <el-button class="confirmButton" @click = "saveAndUpdate('save')">保存</el-button>
	                </span>
              </el-dialog>
              <!--新增弹出层结束-->

              <!--修改弹出层开始-->
              <el-dialog title="参数基本信息" :visible.sync="isModifyDialog" class="addPopup">
                <div class="firstLine">当前序号&nbsp;&nbsp;<span>6</span></div>
                <el-form ref="modifyForm" :model="modifyForm" >
		                <div class="groupL">
		                  <div class="groupL-p">
		                    <span class="f_l">参数描述</span>
		                    <el-input name="strategyName" v-model="modifyForm.strategyName" disabled></el-input>
		                  </div>
		                  <div class="groupL-p">
		                    <span class="f_l">策略值</span>
		                    <el-select v-model="modifyForm.strategyValue" placeholder="请选择">
		      									<el-option
	                            v-for="(item,index) in strategyOptions"
	                            :key="index"
	                            :label="item.label"
	                            :value="item.value">
	                          </el-option>
		                    </el-select>
		                    <i class="iconfont icon-xiajiantou"></i>
		                  </div>
		                  <div class="groupL-p groupL-pTextarea">
		                    <span class="f_l">备注</span>
		                    <el-input type="textarea" v-model = "modifyForm.remark" :rows="2" placeholder="请输入内容"></el-input>
		                    <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
		                  </div>
		                </div>
		                <div class="groupL">
		                  <div class="groupL-p">
		                    <span class="f_l">仓库</span>
		                    <el-input name="warehoseName" v-model="modifyForm.warehouseName" disabled></el-input>
		                  </div>
		                  <div class="groupL-p">
		                    <span class="f_l">货主</span>
		                    <el-input name="ownerUser" v-model="modifyForm.ownerName" disabled></el-input>
		                  </div>
		                </div>
		            </el-form>
		                <span slot="footer" class="dialog-footer">
		                  <el-button class="cancelButton" @click="isModifyDialog = false">取消</el-button>
		                  <!--el-button class="cancelButton">保存并新增</el-button-->
		                  <el-button class="confirmButton" @click = "saveAndUpdate('update')">保存</el-button>
		                </span>
              </el-dialog>
              <!--修改弹出层结束-->
          </div>
      </div>
      <!--标签功能操作栏  end-->
      <!--主体内容  start-->
      <div class="wms-main">
          <div class="mainContainer clearfix">
              <div class="mainContent">
                  <div class="mainLeft">
                    <div class="mainLeftHead">蜂网银河库</div>
                    <el-tree :data="menuData" height ='300' style="overflow-y: auto; max-height: 450px;" :props="defaultProps" @node-click="handleNodeClick" :indent="10"></el-tree>
                  </div>
                  <div class="interval"></div>
                  <div class="mainRight">
                    <template slot-scope="scope">
                      <el-popover trigger="click" placement="right" offset="1">
                        <span>修改</span>
                        <span style="margin:0 6px">|</span>
                        <span>停用</span>
                        <div slot="reference" class="name-wrapper">
                          <el-tag>{{ scope.row.parametricDescription }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                    <tooltip name="costorder">
                        <el-button size="mini" @click="deleteItem">删除</el-button>
                        <el-button size="mini" @click='modifyItem' >修改</el-button>
                        <el-button size="mini" @click='batchHandle("single")'>{{rowOperateBar.switchBtn}}</el-button>
                    </tooltip>

                    <el-popover ref="popover1" placement="top-start" title="标题" width="200" trigger="click">
                        <el-button size="mini"   type="text" @click="visible2 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                    </el-popover>
                      <Table :data="tableData"  @selection-change="handleSelectionChange" @row-click="handleRowClick" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                          <TableColumn type='index' label="序号" width="70"></TableColumn>
                          <TableColumn type="selection" prop="isChecked" width="55"></TableColumn>
                          <TableColumn prop="strategyNo" label="编号" width=""></TableColumn>
                          <TableColumn prop="strategyValueDesc" label="参数描述"  width=""></TableColumn>
                          <TableColumn prop="warehouseName" resizable label="仓库"  width=""></TableColumn>
                          <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                          <TableColumn prop="strategyValue" label="参数值"  width=""></TableColumn>
                          <TableColumn prop="statusDesc" label="状态"  width=""></TableColumn>
                          <TableColumn prop="createUserName" label="创建人"  width=""></TableColumn>
                          <TableColumn prop="createTime" align="center" label="创建时间"    width=""> </TableColumn>
                          <TableColumn prop="updateUserName" label="修改人"  width=""> </TableColumn>
                          <TableColumn prop="updateTime" align="center" label="修改时间" width=""> </TableColumn>
                      </Table>

                      <div class="pageination">
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
                  </div>
              </div>
              <!--右侧内容 end-->
          </div>
      </div>
      <!--主体内容  end-->

  </div>
</template>
<script type="es6">
    import Vue from 'vue'

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'

		let api = {
			getMenuList:'/wms-base-server/strategy/getMenuList',
			getMenu:'/wms-base-server/strategy/getMenu',
			getStrategyList:'/wms-base-server/strategy/getListWithPage',
			batchBlockUp:'/wms-base-server/strategy/batchBlockUp',
			batchStartUsing:'/wms-base-server/strategy/batchStartUsing',
			add:'/wms-base-server/strategy/save',
			update:'/wms-base-server/strategy/update',
			delete:'/wms-base-server/strategy/delete',
			getOwners:'/wms-base-server/strategy/getAddibleOwner',
			getWare:'/wms-base-server/storehouse/getList'
		}

		let menuDataMap = {
			'收货规则':{
				'id':1,
				'label':'收货规则'
				},
			'出库设置':{
				'id':2,
				'label':'出库设置'
			},
			'管理规则':{
				'id':3,
				'label':'管理规则'
			},
			'下架策略':{
				'id':4,
				'label':'下架策略'
			}
		}

    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
            		/*页签*/
                tag:'wms_arrivalWarehousing_policyConfiguration',
                system:'/wms',
                titleName:'策略配置',
                getPlatformsUrl:"  ",
                addPlatformsUrl:"  ",
                isAdded:false,
                isModifyDialog:false,
                deleteDialog:false,
                value:'',
                // 左侧菜单列表
                menuData: [ ],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                //右侧数据列表
                tableData: [],
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

                //选择 的数据。
                multipleSelection:[],
                // 当前选择的左侧菜单功能项
                curStrategy:{},
                // 当前选择的右侧的列表项
                curStrategyItem:{},
                addForm:{
                	warehouseName:'',
                	warehouseId:'',
                	ownerId:'',
                	strategyValue:''
                },
                modifyForm:{

                },
                strategyOptions:[
                {
                	value:1,
                	label:'是'
                },
                {
                	value:0,
                	label:'否'
                }
                ],
                // 货主列表信息，新建和修改策略时用到。
                owners:[
	                {
	                	id:1,
	                	name:'大富翁'
	                },
	                {
	                	id:2,
	                	name:'小土豪'
	                }
                ],
                // 仓库信息
                warehouse:[
                {
                	id:1,
                	name:11111
                },
                {
                	id:2,
                	name:222222
                }],
                // 存储单行点击时所作行的数据状态用于
                rowOperateBar:{
                	btnUse:'启用',
                	btnClock:'停用',
                	switchBtn:"停用",
                	status:1
                },
                // 获取列表查询条件分页部分
                listQueryParam:{
//                	pageNumber:1, // 起始页面（从1开始）一个神奇的名字
//                	pageSize:10,
//                	pageStart:0 //起始条数（从0开始）
                },
                // 分页
                pagination:{
//                	pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
//                	total:100,
//                	currentPage:1,
                },
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
										//type: 'warning',
                    duration: 2000,
                    iconClass: 'iconfont icon-chenggong'
                })
            },
            stopSuccess() {
                this.$message({
                    message: '停用成功！',
										// type: 'success',
                    duration: 2000,
                    iconClass: 'iconfont icon-chenggong'
                })
            },
            //添加新的策略
            addNew(){
            	let _this = this

							// 接口需要部分
							_this.addForm.strategyId = _this.curStrategy.id
							_this.addForm.strategyNo = _this.curStrategy.strategyNo
							_this.addForm.strategyType = _this.curStrategy.strategyType
							_this.addForm.strategyName  = _this.curStrategy.strategyName  // 策略名称，对应列表参数名称
							_this.addForm.strategyValue   = _this.curStrategy.strategyValue
							_this.addForm.ownerId = ''
							_this.addForm.warehouseCompanyId = _this.curStrategy.warehouseCompanyId
							_this.addForm.warehouseId = _this.curStrategy.warehouseId
							// 显示需要部分
							_this.addForm.warehouseName = _this.curStrategy.warehouseName
							_this.addForm.remark=''

							_this.isAdded = true
            	// 获取仓库和货主信息
            	_this.getOwners()
            	//getWare()
            },
            // 修改
            modifyItem(){
            	let _this = this

            	_this.isModifyDialog = true
            	_this.modifyForm = Object.assign({},_this.curStrategyItem)

            	console.log("modifyForm:",_this.modifyForm)

            },
            // 删除单个项
            deleteItem(){
            	let _this = this
            	_this.deleteDialog = false

            	this.$confirm('确定要删除该条信息吗？', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
								_this.$request({
	            		url:api.delete,
	            		sendData:{id:_this.curStrategyItem.id},
	            		successCallback:function(_this, response){
	            			for(var i in _this.tableData){
	            					if(_this.tableData[i].id == _this.curStrategyItem.id){
	            						_this.tableData[i].splice(i,1)
	            					}
	            			}
	            		}
	            	})


			        }).catch(() => {})

            },

            // 获取菜单列表
            getMenuList() {
                let _this = this

                _this.$request({
										url:api.getMenuList,
										context:_this,
					    			sendData:{},
					    			successCallback:function(_this, response){
					    				console.log('response:-',response)
				            			let list = response
				            			_this.menuData = _this.setArrToarrTree(menuDataMap,list)

				            			_this.curStrategy = response[0]
				            			console.log("curStrategyItem:",_this.curStrategyItem)
					            }
			        	})
            },

            // 设置菜单列表格式
            setArrToarrTree(mapObj,data){
            	let arrTree = []
            	let tree = Object.assign({},mapObj)
            	console.log("tree:",tree)
            	for(var k in tree){
            		tree[k].children = []
            		arrTree.push(tree[k])
            	}
            	for(var i of data){
            		for(var j in tree){
            			if(i.strategyType == tree[j].id){
            				console.log('j:',tree[j].id)
            				i["label"] = i.strategyName
            				tree[j].children.push(i)
            				break
            			}
            		}
            	}
            	return arrTree
            },

            //点击导航处理
            handleNodeClick(data) {
			        console.log("handleNodeClick:",data)

			        // 存储当前选择的功能项
			        this.curStrategy = data

			        this.getStrategyList(data.id)
			      },

			      // 获取单个配置信息。
            getStrategyList(id) {
                let _this = this
								let _param = {strategyId:id}
            		let org = Object.assign({},_this.listQueryParam, _param)

                _this.$request({
										url:api.getStrategyList,
										context:_this,
					    			sendData:org,
					    			successCallback:function(_this, response){
					    				console.log('responseMenu:-',response)
				            			_this.tableData = response.dtoList
				            			if(typeof response.count == 'number'){
			                    	_this.pagination.total = response.count
			                    }
					            }
			        	})
            },

            // 选择项处理
		        handleSelectionChange(val){
		        	console.log("策略配置选择项长度：",this.multipleSelection)
		        	 this.multipleSelection = val
		        },
						// 行点击事件处理
						handleRowClick(row,event,column){
							let _this = this

							_this.setCurStrategyItem(row)
							if(column.type == 'selection'){return}
							this.$tooltip({
							  top: event.clientY,
							  left: event.clientX,
							  offsetTop:10
							}, 'costorder', ()=>{})
						},

						//设置当前点击行数据，包括设置显示按钮等
						setCurStrategyItem(row){
							let _this = this

							_this.curStrategyItem = row

							_this.rowOperateBar.switchBtn = row.status == 1 ? _this.rowOperateBar.btnClock : _this.rowOperateBar.btnUse
							_this.rowOperateBar.status = row.status
						},
            //批量处理，批量启用和停用
            batchHandle(flag){
            	let _this = this
            	let _api = api.batchBlockUp
							let ids = ''   // ids 多个id组成的字符串 逗号隔开
							let idsArr = []
							let cb = _this.stopSuccess

							//当行处理,直接调用结束
							if(flag == "single"){
								ids = [_this.curStrategyItem.id]
								_api = _this.rowOperateBar.status == 0 ? api.batchStartUsing : api.batchBlockUp
								console.log("_api:",_api)
								postData(ids)
								return
							}
							//未选择提示
							if(_this.multipleSelection.length == 0){
							this.$alert('您还没有选择需要处理的数据项，请选择后再操作。', '操作提示', {
			          confirmButtonText: '确定',
			          callback: action => {

			          }
			        })

			        return
			       }
							console.log("批量处理，启用停用")
							//批量处理
            	if(flag == 'start'){
            		_api = api.batchStartUsing
            		cb = _this.enableSuccess
            	}

            	for(var i of _this.multipleSelection){
            		idsArr.push(i.id)
            	}

							postData(idsArr)

							function postData(idsArr){
								let n = idsArr.length //记录提交了几条信息，成功后提示使用
								// 刷新列表
								let refresh = ()=>{
					          console.log('刷新')
										_this.getStrategyList(_this.curStrategy.id)
								}

								_this.$request({
										url:_api,
										context:_this,
					    			sendData:{idList:idsArr},
					    			successCallback:function(_this, response){
					    				console.log('启用停用:-',response)
					           	//cb()
					           	if(!response.length){
					           			_this.$alert('数据'+_this.rowOperateBar.switchBtn+'成功'+n+'条！', _this.rowOperateBar.switchBtn+'成功', {
									          confirmButtonText: '确定',
									          callback: action => {
									            refresh()
									          }
									        })
					           	}else{
					           		let useIds = ''
					           		for(var i of response){
					           			useIds += response.ids
					           		}
					           		_this.$alert('数据'+_this.rowOperateBar.switchBtn+'失败'+n+'条！<br> 数据已经被（'+useIds+'）引用，不允许停用', _this.rowOperateBar.switchBtn+'失败', {
									          confirmButtonText: '确定',
									          callback: action => {
									            refresh()
									          }
									        })
					           	}





				            }
			        	})
							}

            },

            // 新建和修改策略处理方法  //new 代表保存并新增，save保存，update更新。
            saveAndUpdate(operate){
            	let _this = this

            	let sendData = _this.addForm
            	let url = api.add

            	if(operate == 'update'){
            		_this.modifyForm = Object.assign(_this.modifyForm, _this.curStrategyItem)
            		sendData = _this.modifyForm
            		url = api.update
            	}

            	_this.$request({
									url:url,
									context:_this,
				    			sendData:sendData,
				    			successCallback:function(_this, response){
				    				console.log('responseMenu:-',response)
										_this.isModifyDialog = false
										_this.getStrategyList(_this.curStrategy.id)
			            }
		        	})


            },
            // 获取货主信息
            getOwners(){
            	let _this = this

            	_this.$request({
									url:api.getOwners,
									context:_this,
				    			sendData:{strategyId:_this.curStrategy.id},
				    			successCallback:function(_this, response){
				    				console.log('responseGetOwners:-',response)
				           	_this.owners = response
			            }
		        	})
            },

            // 获取仓库信息
            getWare(){
            	let _this = this

            	_this.$request({
									url:api.getWare,
									context:_this,
				    			sendData:{},
				    			successCallback:function(_this, response){
				    				console.log('responseMenu:-',response)
				           	_this.warehouse = response
			            }
		        	})

            }

        },
        mounted() {
						console.log("mounted !!!!!")
            this.getMenuList()
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
body{
  .mainContent{
    padding:0;
    border:0;
    .mainLeft,
    .mainRight,
    .interval{
      display:inline-block;
      float:left;
      height:100%;
      box-sizing: border-box;
    }
    .mainLeft{
      width:18.5%;
      border-top:1px solid #ddd;
      border-right:1px solid #ddd;
    }
    .mainRight{
      width:80.4%;
      border-top:1px solid #ddd;
      border-left:1px solid #ddd;
      padding:16px;

    }
    .interval{
      width:1%;
      background:#f7f9fa;
    }
    /*左侧树形导航样式start*/
    .mainLeftHead{
      height:32px;
      line-height:32px;
      border-bottom:1px solid #ddd;
      background:#eee;
      padding-left:16px;
      color:#333;
    }
    /*左侧树形导航样式end*/
  }
}
</style>

