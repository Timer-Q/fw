<template>
    <div class="wms-items">
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="projection">
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="cargoRegister">到货登记</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button class="public-function-btn">日志</Button>
                    </ButtonGroup>
            </div>
            <!-- 表格 -->
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
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-select v-model="listQueryParam.ownerId" placeholder="请选择">
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="0"></el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">销退类型</span>
                                <el-select v-model="listQueryParam.orderType" placeholder="请选择">
                                    <el-option label="拒收" value="1"></el-option>
                                    <el-option label="取消订单" value="2"></el-option>
                                    <el-option label="普通销退" value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">客户名称</span>
                                <el-input v-model="listQueryParam.customerName"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">客户联系人</span>
                                <el-input v-model="listQueryParam.customerContacter"></el-input>
                            </div>
                            <div class="inblock">
                                 <span class="hspace">客户联系方式</span>
                                 <el-input v-model="listQueryParam.customerContactInfo"></el-input>
                            </div>
                        </div>
                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                            <a href="javascript:" @click="clearKeys">清空</a>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                            <el-button :icon="more?'arrow-up':'arrow-down'" @click="more=!more"></el-button>
                        </div>
                    </div>
                    <el-collapse-transition name='transition'>
                        <div v-show="more">
                            <div class="vehicle-find">
                                <div class="vehicle-data">
                                    <div class="inblock">
                                        <span class="hspace">销退单号</span>
                                        <el-input v-model="listQueryParam.saleReturnNo"></el-input>
                                    </div>
                                    <div class="inblock">
                                        <span class="hspace">原订单号</span>
                                        <el-input v-model="listQueryParam.saleOrderNo"></el-input>
                                    </div>
                                    <div class="inblock">

                                        <span class="hspace">司机</span>
                                        <el-input v-model="listQueryParam.driver"></el-input>
                                    </div>
                                    <div class="inblock">
                                        <span class="hspace">车牌号</span>
                                        <el-input v-model="listQueryParam.carNo"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                    <!--表单头部    end-->

                    <!--主表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click="rowClick" @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn type="index" label="序号"  width="70" props=''></TableColumn>
                            <TableColumn prop="status" label="状态" width=""> </TableColumn>
                            <TableColumn prop="warehouseCode" label="仓库"  width=""></TableColumn>
                            <TableColumn prop="saleReturnNo" label="销退单号" width="">
                                <template slot-scope="scope">
                                    <a href="javascript:;" @click.stop="seeDetails">{{ scope.row.saleReturnNo }}</a>
                                </template>
                            </TableColumn>
                            <TableColumn prop="ownerName " label="货主"  width=""></TableColumn>
                            <TableColumn prop="tempGoodsPositionCode" label="收货暂存位"  width="100"></TableColumn>
                            <TableColumn prop="customerName" label="客户名称"  width=""></TableColumn>
                            <TableColumn prop="customerContacter" label="客户联系人"  width="100"></TableColumn>
                            <TableColumn prop="customerContactInfo" label="客户联系方式"  width="100"></TableColumn>
                            <TableColumn prop="customerAddrId" label="客户地址" width=""> </TableColumn>
                            <TableColumn prop="driver" label="司机" width=""> </TableColumn>
                            <TableColumn prop="carNo" label="车牌号" width=""> </TableColumn>
                            <TableColumn prop="" label="原订单号" width=""> </TableColumn>
                            <TableColumn prop="outBoundOrderNo" label="出库单号" width=""> </TableColumn>
                            <TableColumn prop="deliveryCompanyName" label="承运商名称" width="100"> </TableColumn>
                            <TableColumn prop="waybillNo" label="运单号" width=""> </TableColumn>
                            <TableColumn prop="varietyQty" label="品种" width=""> </TableColumn>
                            <TableColumn prop="planQty" label="应收数量" width=""> </TableColumn>
                            <TableColumn prop="actualQty" label="实收数量" width=""> </TableColumn>
                            <TableColumn prop="qualityControlPersonName" label="质检人" width=""> </TableColumn>
                            <TableColumn prop="qualityControlStartTime" label="质检开始时间" width="100"> </TableColumn>
                            <TableColumn prop="qualityControlEndTime" label="质检结束时间" width="100"> </TableColumn>
                        </Table>
                    </div>
                    <!--主表单  end-->

                    <!--分页    start-->
                   <pagination :pagination = 'pagination' @pagechange = 'getList'></pagination>
                    <!--分页    end-->

                    <!--列表展开列表    start-->
                    <div class="mainContent-b">
                        <div class="arrow-bottom arrow-box" >
                            <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        </div>
                        <!--子表单  start-->
                        <div class="details-list">
                            <p>销退单号：{{selectionDetailLabelNo}}</p>
                            <div class="information-list">
                                <Table :data="selectionDetailList" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                    <TableColumn prop="planQty" label="应收数量"  width=""></TableColumn>
                                    <TableColumn prop="actualQty" label="实收数量" width=""></TableColumn>
                                    <TableColumn prop="unitId" label="单位" width=""></TableColumn>
                                    <TableColumn prop="reason" label="退货原因" width=""></TableColumn>
                                </Table>
                            </div>
                            <!--表单  end-->
                        </div>
                         <!--子表单  end-->
                    </div>
                    <!--列表展开列表    end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->
        <!--高级查询弹出层   end-->
              <!--到货登记弹出层开始-->
            <el-dialog title="到货登记确认" class="arrivalRegisterPopup" :visible.sync="appointment">
                <el-form :model="registerForm" :rules='rules' ref="registerForm"  label-width="100px" class="demo-ruleForm">
                    <el-form-item label="销退单号">
                        <el-col :span="10">
                                <el-input v-model="registerForm.saleReturnNo" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="货主" prop='ownerId' id='el-form-item'>
                                <el-input class="adviceNumber" v-model="registerForm.ownerId" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="取货备注" prop='pickupRemark'>
                        <el-input type='textarea' class="adviceNumber" v-model="registerForm.pickupRemark" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="10">
                            <el-form-item label="司机" prop='driver' id='el-form-item'>
                                 <el-input v-model="registerForm.driver"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="车牌号" prop='carNo' id='el-form-item'>
                                 <el-input v-model="registerForm.carNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="10">
                               <el-form-item label="运单号" prop='waybillNo' id='el-form-item'>
                                 <el-input v-model="registerForm.waybillNo"></el-input>
                               </el-form-item>
                        </el-col>
                        <el-col :span="14">
                             <el-form-item label="收货暂存位" prop='tempGoodsPositionId' id='el-form-item'>
                                 <el-input v-model="registerForm.tempGoodsPositionId"></el-input>
                             </el-form-item>
                        </el-col>

                    </el-form-item>
                    <el-form-item >
                        <el-col :span="10">
                              <el-form-item label="卸货类型" prop='unloaderType' id='el-form-item'>
                                 <el-select v-model="registerForm.unloaderType" placeholder="" @change='unloadTypeChange(registerForm.unloaderType.value)'>
                                    <el-option
                                        v-for="item in unloaderTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                             </el-form-item>
                        </el-col>
                        <el-col :span="14">
                             <el-form-item label="卸货人员" prop='unloaderMan' id='el-form-item'>
                                 <el-select v-model="registerForm.unloaderMan" placeholder="">
                                    <el-option
                                        v-for="item in unloaderMans"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                             </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="10">
                             <el-form-item label="装卸开始时间" prop='unloadStartTime' id='el-form-item'>
                                 <el-date-picker type="datetime"  v-model="registerForm.unloadStartTime" placeholder="选择日期" style="width: 50%" size='small'></el-date-picker>
                             </el-form-item>
                        </el-col>
                         <el-col :span="14">
                               <el-form-item label="装卸结束时间" prop='unloadEndTime' id='el-form-item'>
                                 <el-date-picker type="datetime"  v-model="registerForm.unloadEndTime" placeholder="选择日期" style="width: 50%" size='small'></el-date-picker>
                             </el-form-item>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="收货备注" prop='receiveRemark'>
                        <el-input type='textarea' class="adviceNumber" v-model="registerForm.receiveRemark"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="appointment=false">取消</el-button>
                    <el-button class="cancelButton" @click="cargoRegisterSave('registerForm')">登记确认</el-button>
                </span>
            </el-dialog>
            <!--到货登记弹出层结束-->
    </div>
</template>
<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/salesReturnManage/salesRefundSheet/salesRefundSheetService'
    import utilFn from '@Wms/utils/utilFns'
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/salereturnorder/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/salereturnorder/get',//子列表
        register:   '/wms-inbound-server/salereturnorder/update', // 到货登记
    }
    // alert 提示框提示信息和title配置信息，默认带 empty,onlyOne,fail,success几个选项直接传递既可以使用
    // 各种非默认需要自定义的配置信息
    let alertConfig = {
			statusErr:{
				title:'操作提示',
	        	tip:'"到货登记"只能操作状态为“通知收货”的数据，请确认状态！'
			},
			statusEndErr:{
				title:'操作提示',
	        	tip:'"结束卸货时间"只能操作状态为“收货中”的数据，请确认状态！'
			},
			regSuccess:{
				title:'操作提示',
	        	tip:' 登记成功！'
			}
		}
    export default {
        created(){
            _this = this
            _this.api =api
            _this.utilFn = utilFn
        },
        data () {
            return {
                /*页签*/
                /*tag:'wms_cargoRegister',
                system:'/wms',
                titleName:'销退单管理',*/
                /*表单数据 数组*/
                tableData:[], //表单数据 数组
                multipleSelection:[],// 当前选择的数据项目
                selectionDetailList:[],// 子表单明细列表
                selectionDetailLabelNo:'-',//子表单表头数据单号

                appointment:false,// 到货登记
                unloaderMans:[], // 装卸队
                tempGoodsPositionIds: [], // 收货暂存位
                listQueryParam: {
                    ownerId: null,
                    orderType: null,
                    customerName: null,
                    customerContacter: null,
                    customerContactInfo:null,
                    saleReturnNo:null,
                    saleOrderNo:null,
                    driver:null,
                    carNo:null
                },
                // 选择操作的当前行数据
                curentNotify:{},
                curRow:{},
                registerFormMould:{  // 到货登记页面表单字段模板。
                	saleReturnNo :'',
                	ownerId:'',
                	pickupRemark:'',
                	driver:'',
                	carNo:'',
                    waybillNo:'',
                    tempGoodsPositionId:'',
                    unloaderType:'',
                    unloaderMan:'',
                    unloadStartTime:'',
                    unloadEndTime:'',
                	receiveRemark: ''
                },
                registerForm:{
                	saleReturnNo :'',
                	ownerId:'',
                	pickupRemark:'',
                	driver:'',
                	carNo:'',
                    waybillNo:'',
                    tempGoodsPositionId:'',
                    unloaderType:'',
                    unloaderMan:'',
                    unloadStartTime:'',
                    unloadEndTime:'',
                	receiveRemark: ''
                }, // 到货登记页面表单字段保存
                rules:{
                    saleReturnNo:{},
                    ownerId:{},
                    pickupRemark:{},
                    driver:{required: true, message: '请输入司机姓名', trigger: 'blur' },
                    carNo:{},
                    waybillNo:{},
                    tempGoodsPositionId:{ required: true, message: '请选择', trigger: 'change' },
                    unloaderType:{ required: true, message: '请选择', trigger: 'change' },
                    unloaderMan: { required: true, message: '请选择', trigger: 'change' },
                    unloadStartTime:{ required: true, message: '请选择', trigger: 'change' },
                    unloadEndTime:{ required: true, message: '请选择', trigger: 'change' },
                    receiveRemark:{}
                }, // 到货登记规则
                unloaderTypes: [{
                    value:'1',
                    label:'货主自卸'
                },{
                    value:'2',
                    label:'外部装卸'
                },{
                    value:'3',
                    label:'内部装卸'
                }], // 卸货类型
                unloaderMans:[], // 卸货员工
                more: false,
                input: '',
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],

                // 分页
                pagination:{
                    total:0
                }
            }
        },
        watch:{
            curRow: function(val,oldval) {
                this.registerForm = val

            }
        },
        components:{
            pagination,
           'el-collapse-transition': CollapseTransition,
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
			rowClick(row, event, column) {
		        let _this = this
		        //获取子表单任务单号
                _this.selectionDetailLabelNo = row.notifyNo

		        //获取明细列表
		        _this.getDetailList(row.id, _this.api.getlabelDetailList)
		    },
            // 清空
            clearKeys () {
               for (var i in this.model) {
                   this.model[i] = ''
               }
            },
            // 到货登记
            cargoRegister(){
            	let _this = this

				// 没有选择数据的情况，没有选项可以在弹出窗中扫码得到信息。
				if(_this.multipleSelection.length == 0){
		        	regist('no')
		        	return
		        }

				// 判断选择的数据状态是不是符合操作状态，有不符合数据项，提示。status  100: 取消     200: 通知收货 3   00: 到货登记    400: 收货中    500: 收货完成 ,
				let stArr = _this.utilFn.getFieldArrFormObjectArr(_this.multipleSelection,'status')
		        let stArrErr = stArr.filter((item)=>{return item != 200})
		        let stArrOk = stArr.filter((item)=>{return item == 200})

		        if(stArrErr.length > 0){
		        	_this.alert(alertConfig['statusErr'])
		        	return
		        }
		        if(stArrOk.length > 1){
		        	_this.alert('onlyOne')
		        	return
		        }

				// 正常操作
				regist()

				function regist(flag){
					let originData = flag == 'no' ? Object.assign({},_this.registerFormMould) : _this.multipleSelection[0]
					_this.appointment=true // 展示

					_this.registerForm = Object.assign({},originData)
					_this.registerForm.updateUser = _this.updateUser

				}
            },
             // 到货登记保存
            cargoRegisterSave(formName){
                let _this = this
                _this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false
                    }

				let sendData = _this.utilFn.stealDataFormOrigin(_this.registerFormMould, _this.registerForm)

					sendData.arrivalTime = new Date(sendData.arrivalTime).getTime()
					sendData.unloadStarttime = new Date(sendData.unloadStarttime).getTime()
                    asyncRequest()
                    async function asyncRequest() {
                        await _this.$request({
                                url:api.register,
                                context:_this, //this
                                sendData:sendData,
                                successCallback:(_this,response)=>{
                                    if(response.retCode == 1){
                                        console.log('success')
                                        _this.alert(alertConfig['regSuccess'])
                                    }else{
                                        console.log(response.retMsg)
                                        _this.alert({
                                            title:'数据异常',
                                            tip:response.retMsg
                                        })
                                    }
                                }
                            })
                        _this.appointment = false
                    }
              })
            },
            // 根据卸货类型调整获取库工数据，如果是自主卸货则不需要选择卸货人员
            unloadTypeChange(type){
				let _this = this
				if(type == 1){
					//_this.appointment = false
					_this.unloaderMans = []
					_this.registerForm.unloaderId = ''
					return
				}
			},

           // 获取明细列表，id主表项数据的id，uri获取明细的接口地址
            getDetailList(id,uri) {
                _this.$request({
                    url:uri,//子表单的api地址
                    context:_this,//this
                    sendData:{id:id},//主表单的id
                    successCallback:(_this,response)=>{
                        // 结果赋值给实际的明细表格绑定的数据项。
                        _this.selectionDetailList = [response]
                        //获取表头编号
                        _this.selectionDetailLabelNo = _this.curRow.saleReturnNo
                    }
                })
            }
        },
        mounted() {
           _this.getList()
           _this.registerForm = _this.curRow
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .arrivalRegisterPopup{
        el-dialog--small {
            width: 580px;
            .el-dialog__body {
                padding: 0 16px;
            }
        }
    }
    #el-form-item{
        margin-left:-100px;
    }
</style>

