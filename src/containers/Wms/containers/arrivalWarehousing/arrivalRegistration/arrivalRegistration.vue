<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <a href="javascript:" @click="arrivalRegistration">到货登记</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:" @click="unloadEndFormHandle">结束卸货时间</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:">打印入库通知单</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:" @click="printerSetup=true">打印机设置</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:" @click="refresh">刷新</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:">日志</a>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">
                        <div class="query-btn el-dropdown-link" >
                            <el-dropdown class='wms-dropdown' trigger="click">
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
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">商品条码</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">商品名称</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货位</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">库区</span>
                                <el-input></el-input>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button>查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--主表单  start-->
                    <div class="information-list">

                    	     	<!--@selection-change="handleSelectionChange"-->
                        <Table id="pastCodeTable"
                        	:data="tableData"
                        	ref="pastCodeTable"
                            @row-click="rowClick"
                            @selection-change="handleSelectionChange"
                        	highlight-current-row border
                        	style="width: 100%"
                        	:default-sort = "{prop: 'date', order: 'descending'}"
                        >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                            <TableColumn prop="notifyNo" label="入库通知单号"  width="150"></TableColumn>
                            <TableColumn prop="externalNo" label="外部单号"  width="150"></TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="supplierName" label="供应商"  width=""></TableColumn>
                            <TableColumn prop="notifyVarietyQty" label="通知品种"  width=""></TableColumn>
                            <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                            <TableColumn prop="businessType" label="业务类型" width=""> </TableColumn>
                            <TableColumn prop="planArrivalTime" label="计划到货时间" width="100"> </TableColumn>
                            <TableColumn prop="deliveryCompanyName " label="承运商" width=""> </TableColumn>
                            <TableColumn prop="deliveryMan" label="送货人" width=""> </TableColumn>
                            <TableColumn prop="deliveryManContact" label="联系方式" width=""> </TableColumn>
                            <TableColumn prop="unloadDockName" label="卸货月台" width=""> </TableColumn>
                            <TableColumn prop="unloaderType" label="卸货类型" width=""> </TableColumn>
                            <TableColumn prop="unloaderName" label="卸货人" width=""> </TableColumn>
                            <TableColumn prop="registrantName" label="登记人" width=""> </TableColumn>
                            <TableColumn prop="registerTime" label="登记时间" width=""> </TableColumn>
                            <TableColumn prop="remark" label="登记备注" width=""> </TableColumn>
                        </Table>
                    </div>
                    <!--主表单  end-->
                    <!--分页    start-->
                    <pagination :pagination = 'pagination' @pagechange = 'getList'></pagination>
                    <!--分页    end-->

                    <!--子表单    start-->
                    <div class="mainContent-b">
                        <div class="arrow-bottom arrow-box" >
                            <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        </div>
                        <!--表单  start-->
                        <div class="details-list">
                            <p>任务表单：{{selectionDetailLabelNo}}</p>
                            <div class="information-list">
                                <Table :data="selectionDetailList" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="goodsId" label="SKU编号"  width=""></TableColumn>
                                    <TableColumn prop="goodsBarCode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="warehouseCode" label="商家编码"  width=""></TableColumn>
                                    <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""></TableColumn>
                                    <TableColumn prop="notifyTotalQty" label="通知总数量" width=""></TableColumn>
                                    <TableColumn prop="isNewDesc" label="是否新品" width=""></TableColumn>
                                    <TableColumn prop="isShelflifeDesc" label="保质期商品" width=""></TableColumn>
                                    <TableColumn prop="isSnDesc" label="是否SN商品" width=""></TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width=""></TableColumn>
                                </Table>
                            </div>
                            <!--表单  end-->
                        </div>
                    </div>
                    <!--子表单    end-->
                </div>
            </div>
            <!--到货登记弹出层开始-->
            <el-dialog title="到货登记-现场预约" class="arrivalAppointment" :visible.sync="appointment">
                <el-form ref="form" :model="registerForm" label-width="74px">
                    <el-form-item label="通知单号">
                        <el-input class="adviceNumber" v-model="registerForm.notifyNo"></el-input>
                    </el-form-item>
                    <el-form-item label="到货时间">
                        <el-col :span="10">
                            <el-date-picker type="datetime"  v-model="registerForm.arrivalTime" placeholder="选择日期" style="width: 100%"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="送货人">
                        <el-col :span="10">
                            <el-input v-model="registerForm.deliveryMan"></el-input>
                        </el-col>
                        <el-col :span="14">
                            <span style="float:left" class="label">联系方式</span>
                            <el-input v-model="registerForm.deliveryManContact"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="承运商">
                        <el-col :span="10">
                            <el-input v-model="registerForm.deliveryCompanyName"></el-input>
                        </el-col>
                        <el-col :span="14">
                            <span style="float:left" class="label">车牌号</span>
                            <el-input v-model="registerForm.plateNumber"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="送货单号">
                        <el-col :span="10">
                            <el-input v-model="registerForm.deliveryNo"></el-input>
                        </el-col>
                        <el-col :span="14">
                            <span style="float:left" class="label">卸货月台</span>
                            <el-select v-model="registerForm.unloadDock" placeholder="">
                                <el-option
                                    v-for="item in unloadDock"
                                    :key="item.platformCode"
                                    :label="item.platformName"
                                    :value="item.platformCode" class="selectFontSize">
                                </el-option>
                            </el-select>
                            <i class="iconfont icon-xiajiantou arrow_right"></i>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="卸货类型">
                        <el-col :span="10">
                            <el-select v-model="registerForm.unloaderType" @change='unloadTypeChange' placeholder="卸货类型">
                                <el-option
                                    v-for="item in unloaderTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value" class="selectFontSize">
                                </el-option>
                            </el-select>
                            <i class="iconfont icon-xiajiantou"></i>
                        </el-col>
                        <el-col :span="14">
                            <span style="float:left" class="label">登记备注</span>
                            <el-input v-model="registerForm.remark"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="卸货人员">
                        <el-col :span="10">
                            <el-select v-model="registerForm.unloaderId" placeholder="">
                                <el-option
                                    v-for="item in unloaderMans"
                                    :key="item.id"
                                    :label="item.warehousemanName"
                                    :value="item.id" class="selectFontSize">
                                </el-option>
                            </el-select>
                            <i class="iconfont icon-xiajiantou"></i>
                        </el-col>
                        <el-col :span="14">
                            <span style="float:left" class="label" @click="endCargoTime=true">卸货开始时间</span>
                            <el-date-picker type="datetime" v-model='registerForm.unloadStarttime' placeholder="选择日期" style="width:72%"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="cancel">取消</el-button>
                    <el-button class="cancelButton" @click="arrivalRegisterSave">登记确认</el-button>
                </span>
            </el-dialog>
            <!--到货登记弹出层结束-->
            <!--不符合贴码规则：弹出系统贴码任务窗开始-->
            <el-dialog title="条码重复提示" class="barcodeRepeatHint" :visible.sync="barcodeRepeat">
                <div class="warmPrompt">温馨提示:当前商品生成过贴码任务，是否继续贴码？</div>
                <Table :data="goodsBarCodeList" border :row-class-name="tableRowClassName">
                    <TableColumn type="index" label="序号"></TableColumn>
                    <TableColumn prop="sku" label="SKU编码"></TableColumn>
                    <TableColumn prop="goodsName" label="商品名称"></TableColumn>
                    <TableColumn prop="" label="整零转换"></TableColumn>
                    <TableColumn prop="" label="商品条码"></TableColumn>
                    <TableColumn prop="goodsUnit" label="单位"></TableColumn>
                    <TableColumn prop="goodsOwner" label="货主"></TableColumn>
                    <TableColumn prop="provider" label="供应商"></TableColumn>
                </Table>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="cancel">取消</el-button>
                    <el-button class="cancelButton">不贴码</el-button>
                    <el-button class="cancelButton" @click="createTask">生成贴码任务</el-button>
                </span>
            </el-dialog>
            <!--不符合贴码规则：弹出系统贴码任务窗结束-->
            <!--操作提示弹出开始-->
            <el-dialog title="操作提示" class="operationTip" :modal="false" :visible.sync="pushRftask" >
                <div>收货作业完成是否立即推送RF上架任务？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="cancel">取消</el-button>
                    <el-button class="cancelButton">确定</el-button>
                </span>
            </el-dialog>
            <!--操作提示弹出结束-->
            <!--结束卸货时间开始-->
            <el-dialog title="填写卸货结束时间" class="endCargoTime" :visible.sync="endCargoTime" >
                <el-form ref="form" :model="unloadEndForm" label-width="98px">
                    <el-form-item label="通知单号">
                        <el-input class="adviceNumber" v-model="unloadEndForm.notifyNo"></el-input>
                    </el-form-item>
                    <el-form-item label="结束卸货时间">
                        <el-col :span="10">
                            <el-date-picker type="datetime" v-model='unloadEndForm.unloadEndtime' placeholder="选择日期" style="width: 100%"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="cancel">取消</el-button>
                    <el-button class="cancelButton" @click='unLoadEndSave'>确认</el-button>
                </span>
            </el-dialog>
            <!--结束卸货时间结束-->
            <!--打印机设置开始-->
            <el-dialog title="打印机设置" class="printerSetup" :visible.sync="printerSetup" >
                <el-form ref="form" :model="form" label-width="98px">
                    <el-form-item label="收货单打印机">
                        <el-input class="adviceNumber"></el-input>
                        <a href="javascript:">设置</a>
                    </el-form-item>
                    <el-form-item label="当前打印机">
                        <el-input class="adviceNumber"></el-input>
                        <a href="javascript:">设置</a>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton">确认</el-button>
                </span>
            </el-dialog>
            <!--打印机设置结束-->
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
                        <a href="javascript:" class="modify">修改</a>
                        <a href="javascript:" class="clear">清空</a>
                    </div>
                    <div>
                        <Table :data="gridData" border>
                            <TableColumn property="index" label="序号" width="60"></TableColumn>
                            <TableColumn property="conditionName" label="条件名称" width="100"></TableColumn>
                            <TableColumn property="relationCharacter" class-name="noPaddingCol"  label="关系符" width="100">
                                <template slot-scope="scope">
                                    <el-select v-model="options" placeholder="请选择">
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
        </div>
        <!--主体内容  end-->
    </div>
</template>
<script type="es6">

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/arrivalWarehousing'

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    let _this = null
    let api = {
        getlist: 	'/wms-inbound-server/inboundnotify/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/inboundnotify/get',//子列表
        save: 		'/wms-inbound-server/inboundnotify/save', //到货登记
        unloadEnd:  '/wms-inbound-server/inboundnotify/unLoadEnd',  // 结束卸货修改入库通知单
        register:   '/wms-inbound-server/inboundnotify/register', // 到货登记修改入库通知单

        getUnloadDock:'/wms-base-server/platform/getByWarehouseId', // 根据仓库id获取月台信息
        getUnloadMans:'/wms-base-server/warehouseman/getByWarehouseId', // 根据仓库id获取库工id

        createByBusinessId:'/wms-pub-server/barcodeorder/createByBusinessId' // 根据入库通知单生成贴码任务
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

    /*
     *状态码，目前按照
     * status  100: 取消 200: 通知收货 300: 到货登记 400: 收货中 500: 收货完成 ,
     *
     */
    export default {
	    mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_arrivalRegistration',
                system:'/wms',
                titleName:'到货登记',

                /*表单数据 数组*/
                tableData:[], //表单数据 数组

                multipleSelection:[],// 当前选择的数据项目
                selectionDetailList:[],// 子表单明细列表
                selectionDetailLabelNo:'-',//子表单表头数据单号

                input:'',
                dialogTableVisible:false,//高级查询弹出
                appointment:false,//到货登记
                barcodeRepeat:false,//条码重复
                operationTip:false,//操作提示
                pushRftask:false,// 推送RF任务提示
                endCargoTime:false,//结束卸货时间
                printerSetup:false,//打印机设置
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
                goodsBarCodeList:[{
                    index:'1',
                    sku:'201708091111',
                    goodsName:'衣服',
                    integerAndZero:'内容',
                    goodsUnit:'瓶',
                    goodsOwner:'阿毛',
                    provider:'A供应商'
                },{
                    index:'1',
                    sku:'201708091111',
                    goodsName:'衣服',
                    integerAndZero:'内容',
                    goodsUnit:'瓶',
                    goodsOwner:'阿毛',
                    provider:'A供应商'
                },{
                    index:'1',
                    sku:'201708091111',
                    goodsName:'衣服',
                    integerAndZero:'内容',
                    goodsUnit:'瓶',
                    goodsOwner:'阿毛',
                    provider:'A供应商'
                }],
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
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

                // 选择操作的当前行数据
                curentNotify:{},
                curRow:{},
                registerFormMould:{  // 到货登记页面表单字段模板。
                	notifyNo:'',
                	arrivalTime:'',
                	deliveryMan:'',
                	deliveryManContact:'',
                	deliveryCompanyName:'',
                	plateNumber:'',
                	deliveryNo:'',
                	unloadDockName:'',
                	unloadDockNo:'',
                	unloadDock:'',
                	unloadDockNo:'',
                	unloaderType:0,
                	unloaderName:'',
                	remark:'',
                	unloaderId:'',
                	unloadStarttime:'',
                	id:'',
                	updateUser:'' // 修改人
                },
                registerForm:{
                	notifyNo:'',
                	arrivalTime:'',
                	deliveryMan:'',
                	deliveryManContact:'',
                	deliveryCompanyName:'',
                	plateNumber:'',
                	deliveryNo:'',
                	unloadDockName:'',
                	unloadDockCode:'',
                	unloaderType:1,
                	remark:'',
                	unloaderName:'',
                	unloaderId:'',
                	unloadStarttime:'',
                	id:''
                }, // 到货登记页面表单字段保存
                unloaderTypes:[
                	{
                		value:0,
                		label:"货主自卸"
                	},
                	{
                		value:1,
                		label:"外部装卸队"
                	},
                	{
                		value:2,
                		label:"内部装卸队"
                	}
                ],
                unloaderMans:[
                ],
                unloadDock:{},
                // 卸载结束保存弹窗
                unloadEndForm:{
                	unloadEndtime:''
                },
                // 获取列表查询条件分页部分
                listQueryParam:{
                	//pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                	//pageSize:10,
                	//pageStart:0 //起始条数（从0开始）
                },
                // 分页
                pagination:{
                	//pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                	total:100
                	//currentPage:1,
                	//currentPage4: 4,//分页
                },
                updateUser:'23212312'  // 当前用户，假的数据，现在只能添加。
            }
        },
        components:{
        	pagination
        },
        methods: {
        	// 获取主列表，点击主列表获取明细,获取选择的主列表的数据项，alert提示。
        	...pageOperate,
			rowClick(row, event, column) {
		        let _this = this
		        console.log(111111111)
		        console.log(column.type)
		        console.log("row %o, event %o, column %o", row, event, column)
		        _this.curRow = row
		        //获取子表单任务单号
		        _this.selectionDetailLabelNo = row.notifyNo
		        //获取明细列表
		        _this.getDetailList(row.id, _this.api.getlabelDetailList)
		    },
            cancel(){
                this.appointment=false
                this.barcodeRepeat=false
                this.operationTip=false
                this.endCargoTime=false
            },
			// 生成贴码任务
            createTask(){
               this.operationTip=true
               this.barcodeRepeat=false
               this.appointment=false
            },
            // 到货登记操作
            arrivalRegistration(){
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

					// 获取月台
					_this.getUnloadDockList()

				}
            },

            // 到货登记保存
            arrivalRegisterSave(){
				let _this = this
				let sendData = _this.utilFn.stealDataFormOrigin(_this.registerFormMould, _this.registerForm)

					sendData.arrivalTime = new Date(sendData.arrivalTime).getTime()
					sendData.unloadStarttime = new Date(sendData.unloadStarttime).getTime()

				_this.$request({
                    url:api.register,
                    context:_this, //this
                    sendData:sendData,
                    successCallback:(_this,response)=>{
                      	// 成功后不知道干啥了。后续问一下。
                      	// _this.barcodeRepeat=true
                      	/*if(!response.retCode){
                      		_this.pushRFtask = true
                      	}else{
                      		_this.barcodeRepeat=true
                      	}*/

                      	if(response.retCode == 1){
                      		_this.appointment = false
                      		_this.alert(alertConfig['regSuccess'])
                      	}else{
                      		_this.appointment = false
                      		_this.alert({
                      			title:'数据异常',
                      			tip:response.retMsg,
                      			callback:()=>{
                      				_this.createByBusinessId()
                      			}
                      		})
                      	}
                    }
                })
			},

			// 根据入库通知单生成贴码任务
			createByBusinessId(){
				let _this = this

				_this.$request({
                    url:api.createByBusinessId,
                    context:_this, //this
                    sendData:{
						"createUser": 333222233,
						"businessNo": _this.curRow.notifyNo,
						"notifyId": _this.curRow.id,
					},
                    successCallback:(_this,response)=>{

                    }
                })
			},
            // 卸货结束
            unloadEndFormHandle(){
            	let _this = this

            	// 没有选择数据的情况，没有选项可以在弹出窗中扫码得到信息。
				if(_this.multipleSelection.length == 0){
					_this.alert("empty")
		        	return
		        }

				// 判断选择的数据状态是不是符合操作状态，有不符合数据项，提示。status  0：取消     1：通知收货        3：收货中
				// 100: 取消     200: 通知收货 3   00: 到货登记    400: 收货中
				let stArr = _this.utilFn.getFieldArrFormObjectArr(_this.multipleSelection,'status')
		        let stArrErr = stArr.filter((item)=>{return item != 400})
		        let stArrOk = stArr.filter((item)=>{return item == 400})

		        if(stArrErr.length > 0){
		        	_this.alert(alertConfig['statusEndErr'])
		        	return
		        }
		        if(stArrOk.length > 1){
		        	_this.alert('onlyOne')
		        	return
		        }

				// 正常操作
				end()

				function end(){
					_this.endCargoTime=true
					_this.unloadEndForm.notifyNo = _this.multipleSelection[0].notifyNo
					_this.unloadEndForm.id = _this.multipleSelection[0].id
					_this.unloadEndForm.updateUser = '23424'
				}
            },

			// 卸货结束保存更新
			unLoadEndSave(){
				let _this = this
				_this.unloadEndForm.unloadEndtime = new Date(_this.unloadEndForm.unloadEndtime).getTime()

				_this.$request({
                    url:api.unloadEnd,
                    context:_this, //this
                    sendData:_this.unloadEndForm,
                    successCallback:(_this,response)=>{
                      	if(response.retCode == 1){  // 1代表操作成功 ,2代表操作失败 这个跟其他的不一样，嗯，不一样的烟火。
							_this.endCargoTime=false
							_this.alert("success")
                      	}else{
                      		_this.alert(retMsg)
                      	}
                    }
                })
			},

			// 根据卸货类型调整获取库工数据，如果是自主卸货则不需要选择卸货人员
			unloadTypeChange(type){
				let _this = this
				if(type == 0){
					//_this.appointment = false
					_this.unloaderMans = []
					_this.registerForm.unloaderId = ''
					return
				}

				_this.getUnloaderList()
			},

            // 获取库工数据,根据仓库id获取库工
            getUnloaderList(){
            	let _this = this

            	_this.$request({
                    url:api.getUnloadMans,
                    context:_this,//this
                    sendData:{}, //需要仓库id
                    successCallback:(_this,response)=>{
                        _this.unloaderMans = response  // 结果赋值给实际的明细表格绑定的数据项。
                    }
                })
            },

          	// 获取月台数据
            getUnloadDockList(){
            	let _this = this

            	_this.$request({
                    url:api.getUnloadDock,//
                    context:_this,//this
                    sendData:{},//
                    successCallback:(_this,response)=>{
                        _this.unloadDock = response  // 结果赋值给实际的明细表格绑定的数据项。
                    }
                })
            },

            // RF推送上架任务
            pushRFshelfTask(){
            	let _this = this

            	_this.$request({
                    url:api.getUnloadDock,//
                    context:_this,//this
                    sendData:{},//
                    successCallback:(_this,response)=>{
                        _this.unloadDock = response  // 结果赋值给实际的明细表格绑定的数据项。
                    }
                })
            },

            // 贴码提示列表行样式
            tableRowClassName(row, index) {
		        if (index === 1) {
		          return 'redErrorTip'
		        }
		        return ''
		    },


            // 通过扫码二维码获取数据
            getDataByScanBarCode(id,rui){
            	let _this = this

            	_this.$request({
                    url:uri,//子表单的api地址
                    context:_this,//this
                    sendData:{id:id,ownerId:111111111},//主表单的id
                    successCallback:(_this,response)=>{
                        _this.selectionDetailList = response.inboundNotifyDtoDetails  // 结果赋值给实际的明细表格绑定的数据项。
                    }
                })
            }
       },
       beforeCreate(){
       },
	    created(){
	    	let _this = this
	    	_this.api = api
	    	_this.utilFn = utilFn
	    },
	    beforeMount(){

	    },
	    mounted() {
	        this.getList()
	    },
    }
</script>

<style scoped lang="scss" type="text/scss">

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
    .Table tr.rowErrorTip{
    	background-color:red;
    }
    .Table .el-col{
    	position: relative;
    }

</style>

