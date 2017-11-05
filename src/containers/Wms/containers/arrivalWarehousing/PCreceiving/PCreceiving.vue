<template>
    <div class="wms-items"  v-if="isCache">
        <el-form :model="PCReceivForm">
            <div class="wms-modal-div">
                <div class="nav-div">
                    <span>工作台</span>
                    <el-select v-model="postCode" placeholder="请选择" class="nav-select">
                        <el-option
                            v-for="item in poslist"
                            :key="item.posCode"
                            :label="item.posName"
                            :value="item.posCode">
                        </el-option>
                    </el-select>
                    <i class="iconfont icon-xiajiantou"></i>
                    <button type="button" @click="switchNotify">换通知单(F1)</button>
                    <button type="button" @click="selectGoodsPosition">完成容器(F3)</button>
                    <button type="button" @click="changgeProBatch">换生产批次(F4)</button>
                    <button type="button" @click="saveProBatch">保存生产批次(F2)</button>
                </div>
            </div>
            <div class="wms-main">
                <div class="mainContent">
                    <div class="content">
                        <div class="contentBox">
                            <!--第一部 start-->
                            <div class="group">
                                <div class="group-p group-l">
                                    <span>入库通知单号</span>
                                    <el-input ref="InboundNotifyNoInput" v-model="InboundNotifyNo" placeholder="请输入内容"
                                              class="odd"></el-input>
                                </div>
                                <div class="group-p group-c">
                                    <span>选择正残品</span>
                                    <el-button @click='goodsProperty=1' :class="{'active':goodsProperty==1}">正品(F5)
                                    </el-button>
                                    <el-button @click='goodsProperty=2' :class="{'active':goodsProperty==2}">残品(F6)
                                    </el-button>
                                </div>
                                <div class="group-p group-r">
                                    <span>容器条码</span>
                                    <el-input ref="containerNoInput" v-model="containerNo" placeholder="请输入内容"
                                              class="odd"></el-input>
                                </div>
                            </div>
                            <!--第一部 end-->

                            <!--第二部 start-->
                            <div class="breed-box" v-show="currStatusPannel">
                                <div class="breed-number">
                                    <p>品种数</p>
                                    <div class="plan">
                                        <span>计划</span>
                                        <p>{{notifyDetail.notifyVarietyQty}}</p>
                                    </div>
                                    <!--div class="quality-testing">
                                        <span>已质检</span>
                                        <p>0</p>
                                    </div-->
                                </div>
                                <div class="total">
                                    <p>合计总数量</p>
                                    <div class="plan">
                                        <span>计划</span>
                                        <p>{{notifyDetail.notifyQty}}</p>
                                    </div>
                                    <!--div class="quality-testing">
                                        <span>已质检</span>
                                        <p>0</p>
                                    </div-->
                                </div>
                            </div>
                            <!--第二部 end-->

                            <!--第三部 start-->
                            <div class="commodity" v-show="detailInfoPannel">
                                <div>
                                    <div class="group-p">
                                        <span>商品条码</span>
                                        <el-input ref="goodBarCodeInput" v-model="goodBarCode"
                                                  placeholder="MMHZ1709130000034"></el-input>
                                    </div>
                                    <div class="group-p">
                                        <el-checkbox v-model="isSingle" :disabled='isSNedit'>逐件扫描</el-checkbox>
                                        <div class="link">
                                            <div>
                                                <span>序号：</span><!--暂时先不弄，跟交互沟通这块命名和定位不是很清晰，交互先沟通一下-->
                                                <p>{{goodsInfoDetail.seqNo}}</p>
                                            </div>
                                            <a @click="notifyDetailPannel=true;" class="modify"
                                               id='inboundNotifyDetail'>入库通知单明细</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="commodity-b">
                                    <div class="group-p">
                                        <span>商品名称</span>
                                        <el-input name="goodsName" v-model="goodsInfoDetail.goodsName"
                                                  placeholder="请输入商品名称"></el-input>
                                    </div>
                                    <div class="group-p">
                                        <div class="commodity-total">
                                            <span>数量</span>
                                            <el-input name="customQty" ref="customQty" v-model="customQty"
                                                      class="quantity" v-if="isSingle" :disabled="true"></el-input>
                                            <el-input name="customQty" ref="customQty" v-model="customQty"
                                                      class="quantity" v-if="!isSingle"></el-input>
                                            <em>{{goodsInfoDetail.unit}}</em>
                                        </div>
                                        <span>整零转换</span>
                                        <el-input v-model="goodsInfoDetail.unitConvertText" placeholder="整零转换"
                                                  class="conversion" :disabled="true"></el-input>
                                        <div class="commodity-total commodity-back">
                                            <span>合计</span>
                                            <el-input v-model="totalMainUnit" class="quantity"
                                                      :disabled="true"></el-input>
                                            <em>{{goodsInfoDetail.mianUnit}}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="product-date" v-show="detailInfoPannel">
                                <div class="group">
                                    <div class="group-p">
                                        <span>生产日期</span>
                                        <el-input ref="productDate" v-model="goodsInfoDetail.productDate"
                                                  placeholder="生产日期" :disabled="isEditProductDate"></el-input>
                                    </div>
                                    <div class="group-p">
                                        <span>失效日期</span>
                                        <el-input ref="expiryDate" v-model="goodsInfoDetail.expiryDate"
                                                  placeholder="失效日期" :disabled="isEditProductDate"></el-input>
                                    </div>
                                    <div class="group-p">
                                        <span>生产批号</span>
                                        <el-input ref="productBatchNo" v-model="goodsInfoDetail.productBatchNo"
                                                  placeholder="生产批号" :disabled="isEditProductDate"></el-input>
                                    </div>
                                </div>
                            </div>

                            <div class="header-btn" v-show="detailInfoPannel">
                                <el-button @click='goodsDeleteDialog = true'>删除(F7)</el-button>
                                <el-button @click='emptyContainer'>清空容器</el-button>
                            </div>


                            <!--<div class="mainContent-b">-->
                            <!--表单  start-->
                            <div class="details-list" v-show="detailInfoPannel">
                                <p>容器条码：{{selectionDetailLabelNo}}
                                    <span>合计sku数量：0</span>
                                    <span>合计总数量：0</span>
                                </p>
                                <div class="information-list">
                                    <el-table :data="goodsDetailList" border style="width: 100%"
                                              :default-sort="{prop: 'date', order: 'descending'}">
                                        <el-table-column prop="goodsBarCode" label="商品条码" width="160"></el-table-column>
                                        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                                        <el-table-column prop="unitConvertText" label="整零转换"></el-table-column>
                                        <el-table-column prop="seqNo" label="顺序号"></el-table-column>
                                        <el-table-column prop="notifyTotalQty" label="数量"></el-table-column>
                                        <el-table-column prop="unit" label="单位"></el-table-column>
                                        <el-table-column prop="totalQty" label="已收数量" width=""></el-table-column>
                                        <el-table-column prop="productDate" label="生产日期"></el-table-column>
                                        <el-table-column prop="expiryDate" label="失效日期"></el-table-column>
                                        <el-table-column prop="productBatchNo" label="生产批号"></el-table-column>
                                    </el-table>
                                </div>
                                <!--表单  end-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
        <!--明细列表删除弹窗-->
        <el-dialog title="商品删除" class="commodity-delete" :visible.sync="goodsDeleteDialog">
            <el-form ref="goodsDeleteForm" :model="goodsDeleteDialogInfo" label-width="98px" style='height:200px;'>
                <el-form-item label="商品条码">
                    <el-input ref='goodsBarCodeInput'
                              v-model='goodsDeleteDialogInfo.goodsBarCode'
                              class="adviceNumber">
                    </el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input class="adviceNumber"
                              v-model='goodsDeleteDialogInfo.goodsName'
                              :disabled='true'
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <label>单位</label>
                    <el-input class="unit"
                              v-model='goodsDeleteDialogInfo.unit'
                              :disabled='true'>
                    </el-input>
                    <label>生产批次</label>
                    <el-input class='production-batch'
                              v-model='goodsDeleteDialogInfo.productBatchInfo'
                              :disabled='true'>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="goodsDeleteDialog = false">取 消</el-button>
		    		<el-button type="primary" @click="deleteGoodsDetail">确 定</el-button>
	          </span>
        </el-dialog>
        <!--明细列表删除弹窗结束-->
        <!--
          作者：offline
          时间：2017-09-28
          描述：SN扫码弹窗 start
        -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="SNscanForm">
                <el-form-item label="请输入SN码">
                    <el-input ref='SNscanInput' v-model="SNscanForm.SNCode" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSNscanFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="SNscanFormSave">确 定</el-button>
            </div>
        </el-dialog>
        <!--SN扫码弹窗 end-->

        <!--
        	描述：暂存货位
        -->
        <div class="temporary-location">
            <el-dialog title="选择暂存货位" :visible.sync="dialogSetGoodsPosition">
                <el-form :model="goodspositionForm">
                    <el-form-item label="暂存货位">
                        <el-select
                            v-model="goodspositionId"
                            clearable
                            filterable
                            placeholder="请输入或者选择">
                            <el-option
                                v-for="item in goodspositions"
                                :key="item.id"
                                :label="item.goodspositionCode"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogSetGoodsPosition = false">取 消</el-button>
                    <el-button type="primary" @click="completeContainer">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!--暂存货位 end-->

        <!--右侧划出  start-->
        <div class="right-slide" v-show="notifyDetailPannel">
            <div class="content-up">
                <div class="content-title">入库通知单明细</div>
                <div class="content-detail">
                    <div>
                        <span>入库通知单号:</span>
                        <p>{{notifyDetail.notifyNo}}</p>
                    </div>
                    <div>
                        <span>仓库:</span>
                        <p>{{notifyDetail.warehouseId}}</p>
                    </div>
                    <div>
                        <span>实收数量:</span>
                        <p>{{notifyDetail.receivedQty}}</p>
                    </div>
                    <div>
                        <span>计划到货时间:</span>
                        <p>{{notifyDetail.planArrivalTime}}</p>
                    </div>
                    <div>
                        <span>卸货人:</span>
                        <p>{{notifyDetail.unloaderId}}</p>
                    </div>
                    <div>
                        <span>登记人:</span>
                        <p>{{notifyDetail.registrantId}}</p>
                    </div>
                </div>
                <div class="content-detail">
                    <div>
                        <span>外部单号:</span>
                        <p>{{notifyDetail.externalNo}}</p>
                    </div>
                    <div>
                        <span>状态:</span>
                        <p>{{notifyDetail.status}}</p>
                    </div>
                    <div>
                        <span>实收品种:</span>
                        <p>{{notifyDetail.receivedVarietyQty}}</p>
                    </div>
                    <div>
                        <span>承运商:</span>
                        <p>{{notifyDetail.deliveryCompanyId}}</p>
                    </div>
                    <div>
                        <span>卸货月台:</span>
                        <p>{{notifyDetail.unloadDock}}</p>
                    </div>
                    <div>
                        <span>登记时间:</span>
                        <p>{{notifyDetail.registerTime}}</p>
                    </div>
                </div>
                <div class="content-detail">
                    <div>
                        <span>货主:</span>
                        <p>{{notifyDetail.ownerId}}</p>
                    </div>
                    <div>
                        <span>通知数量:</span>
                        <p>{{notifyDetail.notifyQty}}</p>
                    </div>
                    <div>
                        <span>差异数量1:</span>
                        <p>{{notifyDetail.notifyNo}}</p>
                    </div>
                    <div>
                        <span>送货人:</span>
                        <p>{{notifyDetail.deliveryMan}}</p>
                    </div>
                    <div>
                        <span>卸货开始时间:</span>
                        <p>{{notifyDetail.unloadStarttime}}</p>
                    </div>
                    <div>
                        <span>创建时间:</span>
                        <p>{{notifyDetail.createTime}}</p>
                    </div>
                </div>
                <div class="content-detail">
                    <div>
                        <span>供应商:</span>
                        <p>{{notifyDetail.supplierId}}</p>
                    </div>
                    <div>
                        <span>通知品种:</span>
                        <p>{{notifyDetail.notifyVarietyQty}}</p>
                    </div>
                    <div>
                        <span>业务单据类型:</span>
                        <p>{{notifyDetail.businessType}}</p>
                    </div>
                    <div>
                        <span>联系方式:</span>
                        <p>{{notifyDetail.deliveryManContact}}</p>
                    </div>
                    <div>
                        <span>卸货结束时间:</span>
                        <p>{{notifyDetail.unloadEndtime}}</p>
                    </div>
                </div>
            </div>
            <div class="content-down">
                <div class="information-list">
                    <el-table :data="selectionDetailList" border style="width: 60%"
                              :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type='index' label="序号" width=""></el-table-column>
                        <el-table-column prop="goodsId" label="SKUID" width=""></el-table-column>
                        <el-table-column prop="goodsBarCode" label="商品条码" width=""></el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" width=""></el-table-column>
                        <el-table-column prop="unitConvertText" label="整零转换" width=""></el-table-column>
                        <el-table-column prop="notifyQty" label="通知数量" width=""></el-table-column>
                        <el-table-column prop="status" label="状态" width=""></el-table-column>
                    </el-table>
                </div>
            </div>
            <a class="close-btn" href="javascript:;">
                <i class="iconfont icon-guanbi" id="detailPanelCloseBtn" @click="notifyDetailPannel = false;"></i>
            </a>
        </div>
        <!--右侧划出  end-->

        <!--页面操作提示  -->
        <div :class="operateTip.dClass" class="promptbox-succeed" v-show='opterateStatusShow'>
            <h2>{{operateTip.title}}</h2>
            <p>{{operateTip.tip}}</p>
        </div>
        <!--页面操作提示end-->
    </div>


</template>
<script>
	import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/arrivalWarehousing'

    let api = {
        getPOSList: '/wms-base-server/pos/getList', // 获取pos台列表
        getNotifyDetail: '/wms-inbound-server/inboundnotify/getbyNotifyNo', // 根据单号查询详情
        getContainerStatus: '/wms-inbound-server/receivingwork/startReceiving', // 通过扫入的容器条码，判断容器占用状态，生成存盘状态收货作业
        getGoodsInfo: '/wms-inbound-server/receivingwork/checkGoods', // 扫码获取商品信息，包括新品验证这些
        getSNList: '/sdfasdf/adfadfa/f/as/fa/dsf/af/asf/s', // 通过箱体sn号，获取整箱的sn码。 一期没有
        completeContainer: '/wms-inbound-server/receivingwork/completeContainer', // 完成容器
        getLocationList: '/wms-base-server/location/getList', // 获取暂存位列表，暂存位就是货位
    }

    let _this = null
    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_PCreceiving',
                system:'/wms',
                titleName:'PC收货',
                form: {}, // test form.
                goodsDeleteDialog: false, // 删除商品弹窗
                dialogFormVisible: false, // sn扫码
                showDetailPannel: false, // 详情面板展示
                poslist: [{
                    posCode: '选项1',
                    posName: '黄金糕'
                }, {
                    posCode: '选项2',
                    posName: '双皮奶'
                }],
                value: '',
                checked: true,
                selectionDetailLabelNo: '-',
                selectionDetailList: [],
                postCode: '', // 当前pos台
                goodsProperty: 1, // 是否正品，1正品，2次品
                currStatusPannel: false, // 当前状态数据展示面板
                detailInfoPannel: false, // 扫码明细部分数据展示面板
                notifyDetailPannel: false, // 入库通知单详情面板，对，就是从右侧出来那个玩意
                dialogSetGoodsPosition: false, // 完成容器时弹出暂存货位选择弹窗
                containerInfo: {}, // 扫码容器信息
                PCReceivForm: {}, // 收货表单数据。
                notifyDetail: {}, // 通知单明细
                InboundNotifyNo: '', // 入库通知单号
                InboundNotifyId: '', // 入库通知单id
                receivingWorkId: '', // 扫码容器作业id
                goodsInfo: {}, // 扫码获取的商品整体信息包括是不是新品啊，是不是sn啊这些。
                goodsInfoDetail: {}, // 只有商品详细信息
                //totalMainUnit:'', // 合计数量
                isSingle: false, // 是否单件扫描
                isSNedit: false, // 逐件扫描复选框是否可编辑
                customQty: 0, // 输入的检查数量
                goodsDetailList: [], // 存储扫码商品的详细信息列表，在下边任务列表显示
                isEditProductDate: true, // 生产日期是不是主要管理的，需要则可编辑，不需要则不可编辑
                containerNo: '', // 容器编号
                goodBarCode: '', // 商品条码
                productBatchInfo: { // 商品批次信息
                    productBatchNo: '', // 批号
                    productDate: '', // 生产日期
                    expiryDate: '', // 失效日期
                },
                isBatchInfoSave: false, // 是不是要保存生产批次，默认保存

                notifyInput: '', // 通知单扫码输入框
                coNoInput: '', // 容器扫码输入框
                goodInput: '', // 商品条码输入框
                SNscanForm: {}, // SN扫码弹窗
                dialogSNscanFormVisible: false, // SN码扫码弹窗显隐标记

                // 操作弹窗数据，不需要存储
                goodsDeleteDialogInfo: {}, // 删除商品弹窗扫码获得的数据
                operateTip: {
                    title: '成功',
                    tip: '失败',
                    dClass: 'success',
                }, // 操作提示框显示数据
                opterateStatusShow: false, // 操作提示框显示隐藏
                keyBordArr: {}, // 存储设置过的快捷键
                goodspositions: [], // 暂存位数据。
                goodspositionForm: {}, // 暂存位form
                goodspositionId: '', // 暂存货位id

                completeContainerData: { // 完成容器需要的数据结构，用来过滤提交数据。
                    "goodspositionId": 31957,
                    "id": 2150029,
                    "goodsProperty": "2",
                    "detailList": [
                        {
                            "goodsId": 12345687,
                            "isSn": 0,
                            "qty": 1,
                            "seqNo": 1,
                            "shelflifeDays": 0,
                            "totalQty": 1,
                            "unitId": 170061,
                            "productDate": "20990909",
                            "expiryDate": "20990909",
                            "productBatchNo": "20990909"
                        }
                    ],
                    "warehouseId": 400000022,
                    "updateUser": 44
                }

            }
        },
        computed: {
            totalMainUnit(){
                return this.goodsInfoDetail.totalQty = this.customQty * (this.goodsInfoDetail.unitConvert || 1)
            }
        },
        watch: {},
        component: {},
        methods: {
            // 初始化操作，模拟扫码动作等
            initOperate(){
                _this.notifyInput = _this.getInput(_this.$refs.InboundNotifyNoInput)
                _this.coNoInput = _this.getInput(_this.$refs.containerNoInput)
                _this.goodInput = _this.getInput(_this.$refs.goodBarCodeInput)

                // 监听获取入库通知单数据，扫码获取单号，然后去获取入库通知单信息
                _this.notifyInput.addEventListener("keydown", (e) => {
                    // test 正常应该是扫码获取数据后请求
                    if (!_this.notifyInput.value) {
                        return
                    }

                    if (e.keyCode == '13') {
                        _this.getNotifyDetail(_this.notifyInput.value)
                    }
                })

                // 监听容器编号输入数据
                _this.coNoInput.addEventListener("keydown", (e) => {
                    // test
                    if (!_this.coNoInput.value) {
                        return
                    }
                    if (e.keyCode == '13') {

                        _this.getContainerStatus({
                            containerCode: _this.coNoInput.value,//RONGQI001
                            inboundNotifyId: _this.notifyDetail.id,
                            createUser: _this.notifyDetail.createUser,
                            goodsProperty: _this.goodsProperty
                        })
                    }
                })

                // 监听商品条码输入数据
                _this.goodInput.addEventListener("keydown", (e) => {
                    // test
                    if (!_this.goodInput.value) {
                        return
                    }
                    if (e.keyCode == '13') {
                        _this.detailInfoPannel = true

                        _this.getGoodsInfo({
                            goodsBarCode: _this.goodInput.value,
                            receivingWorkId: _this.receivingWorkId
                        })

                        _this.setProDate(e)
                        _this.setGoodsNum()
                    }
                })

                // 通知单详情面板事件绑定
                //_this.notifyDetailPannel()

                // 获取pos台列表
                _this.getPOSList()

            },

            // 获取pos台列表
            getPOSList(){
                _this.$request({
                    url:api.getPOSList,
                    context:_this, //this
                    sendData:{},
                    successCallback:(_this,response)=>{
                    	_this.poslist = response
                    }
                 })
            },

            // 根据通知单号，查询入库通知单详情。
            getNotifyDetail(notifyNo){
				_this.$request({
                    url:api.getNotifyDetail,
                    context:_this, //this
                    sendData:{
                    	"notifyNo": notifyNo // RKTZD000002222
                    },
                    successCallback:(_this,response)=>{
                    	_this.notifyDetail = response
	                    // 显示数量状态面板
	                    _this.currStatusPannel = true
	                    // 容器扫码获取焦点，方便操作
	                    _this.setFocusToEl(_this.coNoInput)
                    }
                })
            },

            // 扫容器条码获取容器状态，
            getContainerStatus(param){

                _this.$request({
                    url:api.getContainerStatus,
                    context:_this, //this
                    sendData:param,
                    successCallback:(_this,response)=>{
                    	_this.containerInfo = response
	                    _this.receivingWorkId = response.id

	                    // 商品扫码获取焦点，方便操作
	                    _this.setFocusToEl(_this.goodInput)

	                    _this.detailInfoPannel = true
                    },
                    failCallback:(_this,error)=>{
                    	console.log("err:o%",error)
                    	_this.tip({
	                        tip: error,
	                        title: '提示',
	                        callback: () => {
	                            // 容器扫码获取焦点，方便操作
	                            _this.setFocusToEl(_this.coNoInput)
	                        }
	                    })
                    }
                 })
            },

            /**
             * 根据商品条码获取商品信息 ，
             * 通过扫入的商品条码，判断超品，新品，保质期,sn,超量,
             * 如果返回isNewGoods为2（新品）则需要跳到新品维护页面根据返回的goodsId获取商品详情
             */
            getGoodsInfo(param){

            	_this.$request({
                    url:api.getGoodsInfo,
                    context:_this, //this
                    sendData:param,
                    successCallback:(_this,response)=>{
                    	if (response.isNewGoods == 2) {
	                        _this.toNewPro()
	                        return
	                    }

	                    _this.goodsInfoDetail = response.goodsDetail
	                    _this.goodsInfo = response
	                    _this.goodsDetailList.push(response.goodsDetail)

	                    _this.setManageStatus()

	                    // 判断是否保存了批次，如果保存了批次给商品信息赋值
	                    if (_this.isBatchInfoSave) {
	                        goodsInfoDetail.productBatchNo = productBatchInfo.productBatchNo
	                        goodsInfoDetail.productBatchNo = productBatchInfo.productDate
	                        goodsInfoDetail.productBatchNo = productBatchInfo.expiryDate
	                    }
                    },
                    failCallback:(_this,error)=>{
                    	_this.tip({
	                        tip: error,
	                        title: '提示',
	                        callback: () => {
	                            // 商品扫码获取焦点，方便操作
	                            _this.setFocusToEl(_this.goodInput)
	                        }
	                    })
                    }
               })

            },

            // 设置管理状态，逐件扫描，生产日期管理等
            setManageStatus(){
                // 逐件扫描
                _this.isSingle = _this.goodsInfo.isSN == 2 ? true : false // 判断是不是逐渐扫码   1否，2是 接口就是这么搞的。
                _this.isSNedit = _this.goodsInfo.isSN == 2 ? true : false // 设置是否可编辑
                _this.customQty = _this.isSingle ? 1 : 0 // 设置数量框。

                // 生产日期管理
                _this.isEditProductDate = _this.goodsInfo.isShelfLife == 2 ? true : false //是否可以管理生产日期

                //设置扫描SN码弹窗
                //_this.setSNscan()
            },

            // 设置扫描SN码弹窗  ，
            /**
             * 备注：2017/09/29，跟慧敏，郭龙珠讨论后该功能属于一期用不上的功能，只是暂时留个口。
             * 哎，时间这么紧还有空留口。
             */
            setSNscan(){
                if (_this.goodsInfo.isSN != 2) { // SN商品
                    return
                }

                let scanInput = _this.getInput(_this.$refs.SNscanInput)

                _this.dialogFormVisible = true

                setFocusToEl(scanInput)

                // sn码输入框，因为每次都要保存n个码，所以需要保存。
                scanInput.removeEventListener("keydown", (e) => {
                })
                scanInput.addEventListener("keydown", (e) => {
                    // test
                    if (e.keyCode == '13') {
                        _this.detailInfoPannel = true

                        _this.getGoodsInfo({
                            goodsBarCode: "MMHZ1709130000034",
                            receivingWorkId: _this.receivingWorkId
                        })
                    }
                })

                //getSNList
            },

            // 扫码SN码弹窗保存  把SN码放到当前商品信息中等操作
            // 没有接口先不做。
            SNscanFormSave(){

            },

            // 输入商品数量，在商品不需要编辑生产日期的情况下该处回车则保存该条商品明细
            setGoodsNum(){
                let proDate = _this.getInput(_this.$refs.productDate)
                let proBatchNo = _this.getInput(_this.$refs.productBatchNo)
                let numInput = _this.getInput(_this.$refs.customQty)
                let isSave = false // 是不是要直接保存

                //numInput.removeEventListener('keydown',numInputFn)
                numInput.addEventListener("keydown", numInputFn)
                numInput.addEventListener("blur", (e)=>{
                	_this.goodsInfoDetail.qty = _this.customQty

					console.log(_this.customQty)
                })

                function numInputFn(e){

                    // test
                    if (e.keyCode == '13') {
                        // 检查是不是要编辑生产日期，不需要编辑则直接保存， 需要则判断是不是已经有值了有值也直接保存
                        let proDateIsReady = !!_this.goodsInfoDetail.productDate && !!_this.goodsInfoDetail.productBatchNo

                        isSave = (_this.isEditProductDate && proDateIsReady) || !_this.isEditProductDate ? true : false

                        if (isSave) {
                            //_this.completeContainer()
                        } else {
                            // 如果生产日期已经有了，调到生产批次号去，否则定位到生产日期。
                            if (!!goodsInfoDetail.productDate) {
                                _this.setFocusToEl(proBatchNo)
                            } else {
                                _this.setFocusToEl(proDate)
                            }
                        }
                    }
                }
            },

            /**
             * 编辑商品生产日期,  产品输入框回车后调用
             * 在商品生产日期需要维护时，在批次回车后则保存商品信息
             * 当使用者输入产品生产日期后需要根据保质期计算出失效日期，反之亦然。
             */
            setProDate(e){
                let proDate = _this.getInput(_this.$refs.productDate)
                let proBatchNo = _this.getInput(_this.$refs.productBatchNo)
                let expiryDate = _this.getInput(_this.$refs.expiryDate)
                let numInput = _this.getInput(_this.$refs.customQty)
                let shelflifeDays = _this.goodsInfoDetail.shelflifeDays // 保质期

                // 输入产品日期或者过期日期后通过保质期计算相应的日期，格式没有定，调接口再说吧。
                if (document.hasFocus() && document.activeElement === proDate) {
                    let pd = new Date(_this.goodsInfoDetail.productDate).getTime()
                    _this.goodsInfoDetail.expiryDate = new Date(pd + shelflifeDays * 24 * 60 * 60 * 1000)
                }

                if (document.hasFocus() && document.activeElement === expiryDate) {
                    let pd = new Date(_this.goodsInfoDetail.expiryDate).getTime()
                    _this.goodsInfoDetail.proDate = new Date(pd - shelflifeDays * 24 * 60 * 60 * 1000)
                }

                // 如果不能保存则定位光标
                if (!checkSave) {
                    if (!!_this.customQty) {
                        _this.setFocusToEl(numInput)
                        return
                    }

                    if (!!_this.goodsInfoDetail.productDate) {
                        _this.setFocusToEl(proDate)
                        return
                    }

                    if (!!_this.goodsInfoDetail.productBatchNo) {
                        _this.setFocusToEl(proBatchNo)
                        return
                    }

                } else {
                    //_this.completeContainer()
                }

                // 该方法返回标记判断是否可以保存。
                function checkSave() {
                    return !!_this.goodsInfoDetail.productDate && !!_this.goodsInfoDetail.productBatchNo && !!_this.customQty
                }

            },

            // 设置正品
            setStandard(){
                _this.goodsProperty = 1
                _this.goodsInfo.goodsProperty = 1
            },
            // 设置残品
            setDefective(){
                _this.goodsProperty = 2
                _this.goodsInfo.goodsProperty = 2
            },

			// 选择暂存货位
			selectGoodsPosition(){
				_this.getLocationList()
                _this.dialogSetGoodsPosition = true
			},

            // 完成容器
            completeContainer(){
            	_this.dialogSetGoodsPosition = false
                _this.goodsInfoDetail['detailList'] = _this.goodsDetailList
                _this.goodsInfoDetail['goodspositionId'] = _this.goodspositionId
                _this.goodsInfoDetail['goodsProperty'] = _this.goodsProperty
                _this.goodsInfoDetail['id'] = _this.receivingWorkId
                _this.goodsInfoDetail['updateUser'] = '1111'

                let param = _this.utilFn.stealDataFormOrigin(_this.completeContainerData, _this.goodsInfoDetail)
                // goodspositionId
                console.log("goodsInfoDetail:",_this.goodsInfoDetail)
                console.log(_this.goodsDetailList)
				console.log("complete ..param:",param)

	             _this.$request({
                    url:api.completeContainer,
                    context:_this, //this
                    sendData:param,
                    successCallback:(_this,response)=>{
                    	console.log('completeContainer:',response)
	                	if(response.retCode == 2){
	                		_this.tip({
		                        title: '报错提示',
		                        tip: response.retMsg,
		                    })
	                		return
	                	}
	                	_this.tip({
	                        title: '操作成功提示',
	                        tip: '完成容器成功！',
	                    })

	                    _this.resetData('container', _this.coNoInput)
                    },
                    failCallback:(_this,e)=>{
                    	console.error('completeContainErr:',e)
	                	_this.tip({
	                        title: '报错提示',
	                        tip: e,
	                    })
                    }
                })
            },

            // 获取货位列表
            getLocationList(){
                let param = {
                    "useAttrbute": 10, //货位用途属性 10为收货
                    "goodsAttrbute": _this.goodsProperty // 商品正残属性
                }

                _this.$request({
                    url:api.getLocationList,
                    context:_this, //this
                    sendData:param,
                    successCallback:(_this,response)=>{
                    	_this.goodspositions = response
                    },
                    failCallback:(_this,e)=>{
                    	console.error('completeContainErr:',e)
	                	_this.tip({
	                        title: '报错提示',
	                        tip: e,
	                    })
                    }
                })
            },

            // 获取商品货位id信息
            getGoodsPositionId(){
                _this.goodsInfo.goodspositionId = _this.goodspositionId
                _this.dialogSetGoodsPosition = false
            },
            // 切换通知单     隐藏展示信息，清空数据
            switchNotify(){
                _this.resetData('notify', _this.notifyInput)
            },

            // 保存批次信息
            saveProBatch(){
                _this.productBatchInfo = { // 商品批次信息
                    productBatchNo: _this.goodsInfoDetail.productBatchNo, // 批号
                    productDate: _this.goodsInfoDetail.productDate, // 生产日期
                    expiryDate: _this.goodsInfoDetail.expiryDate, // 失效日期
                }
                _this.isBatchInfoSave = true // 是不是要保存生产批次，默认保存

                _this.operateTipPannel({
                    title: '成功',
                    tip: '保存批次成功!'
                })
            },

            // 更改批次
            changgeProBatch(){
                _this.productBatchInfo = { // 商品批次信息
                    productBatchNo: '', // 批号
                    productDate: '', // 生产日期
                    expiryDate: '', // 失效日期
                }
                _this.isBatchInfoSave = false // 是不是要保存生产批次，默认保存

                _this.operateTipPannel({
                    title: '成功',
                    tip: '更改批次成功!'
                })
            },

            // 清空当前容器
            emptyContainer(){

                _this.tip({
                    title: '清空容器',
                    tip: `
						您确定要清空   容器条码：${_this.containerNo} 所有商品吗？
						\n 清空商品后将不再恢复。
						`,
                    callback: () => {
                        _this.resetData('container', _this.coNoInput)
                    }
                })

            },

            // 删除某个商品明细信息 。明细列表操作按钮。
            deleteGoodsDetail(){
                let goodsBarCodeInput = _this.getInput(_this.$refs.goodsBarCodeInput)


                goodsBarCodeInput.addEventLister("keyDown", (e) => {

                    _this.$request({
	                    url:api.getGoodsInfo,
	                    context:_this, //this
	                    sendData:{
	                    	goodsBarCode: goodsBarCodeInput.value,// MMHZ1709130000034
                            receivingWorkId: _this.receivingWorkId
	                    },
	                    successCallback:(_this,response)=>{
	                    	// 对弹窗赋值
	                        _this.goodsDeleteDialogInfo = response.goodsDetail
	                        // 对比详情列表，删除对应数据。
	                        for (let i in _this.goodsDetailList) {
	                            if (_this.goodsDetailList[i].id == response.goodsDetail.id) {
	                                _this.goodsDetailList.splice(i, 1)
	                                break
	                            }
	                        }
	                    },
	                    failCallback:(_this,e)=>{
	                    	_this.tip({
	                            title: '报错提示',
	                            tip: e,
	                        })
	                    }
	                })
                })
            },

            // 快捷键设置
            keyboardShortcuts(){

                document.addEventListener("keydown", function (e) {
                    let k = e.key.toLowerCase()

                    if (typeof _this.keyBordArr[k] == 'function') {
                        e.preventDefault()
                        console.log(e.key)

                        _this.keyBordArr[k]()
                    }
                })

                return {
                    addShortcuts: (keyStr, fn) => {
                        _this.keyBordArr[keyStr.toLowerCase()] = fn
                    },
                    removeShortcuts: () => {
                        _this.keyBordArr = {}
                    }
                }
            },

            // 添加快捷键
            addShortcuts(){
                let kb = _this.keyboardShortcuts()

                // 切换通知单快捷键
                kb.addShortcuts("f1", _this.switchNotify)
                // 完成容器
                kb.addShortcuts("f3", _this.selectGoodsPosition)
                // 切换批次
                kb.addShortcuts("f4", _this.changgeProBatch)
                // 保存批次
                kb.addShortcuts("f2", _this.saveProBatch)
                // 删除明细
                kb.addShortcuts("f7", _this.deleteGoodsDetail)
                // 正品
                kb.addShortcuts("f5", _this.setStandard)
                // 残品
                kb.addShortcuts("f6", _this.setDefective)
            },

            // 跳转到新品维护，如果商品是需要维护的，isNewGoods为2（新品）
            toNewPro(){
                _this.tip({
                    title: '新品维护',
                    tip: `
						该商品为新品，需要做新品维护后在收货
						`,
                    callback: () => {
                        _this.$router.push('/wms/arrivalWarehousing/newProductProtection/'+ _this.goodsInfoDetail.id)
                    }
                })
            },

            // 展示入库通知单明细,暂时不做动画了，所以。。。这个方法先放着。
            notifyDetailPannelFn(){
                document.getElementById("inboundNotifyDetail").addEventListener("click", (e) => {
                    _this.showDetailPannel = true
                })

                document.getElementById("detailPanelCloseBtn").addEventListener("click", (e) => {
                    _this.showDetailPannel = false
                })

            },

            /**
             * 一个回车逐个进入输入框的设想方法，当前情况先不写，只是写下思路
             * a 初始化方法，会搜集制定form的所有可以编辑的input，或者其他可编辑的类型输入
             * b 获取后进行属性复制，tab-index也好，其他属性也可以。如果要求tab则固定，不要求随便。递增从一开始赋值
             * c 全局记录当前激活状态的输入框。 可以赋值到当前的vue实例上。手动或者是自动更新（取决于初始化方式）
             * d 添加方法，可以设置即便回车也不会转向下一个input，也可以设置继续向下移动。
             *  （该方法可以通过+1或者不加来实现，因为所有input存在于一个数组内 )
             * e 可以对单独的输入框的回车事件绑定方法。（数组对象存储数据可以实现）
             */
            autoEnter(){
                return {}
            },

            // 设置元素获得焦点
            setFocusToEl(el, callback){
                if (!!el) {
                    setTimeout(() => {
                        el.focus()
                        !!callback && callback()
                    }, 100)
                }
            },

            /**
             *统一提示
             */
            tip(param){
                _this.$alert(param.tip, param.title, {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (action == 'confirm') {
                            !!param.callback && param.callback()
                        }
                    }
                })
            },

            // 操作提示，大框醒目提示
            operateTipPannel(org){
                _this.operateTip.title = org.title || '成功'
                _this.operateTip.tip = org.tip || '失败'
                _this.operateTip.dClass = org.dClass || 'success' // 整体的颜色设置class
                _this.opterateStatusShow = true

                // 显示完，三秒后隐藏
                setTimeout(() => {
                    _this.opterateStatusShow = false
                }, 3000)
            },

            // 获取标记输入元素
            getInput(el){
                return el.$el.tagName.toLowerCase() == 'input' ? el : el.$el.querySelector('input')
            },

            // 清空数据方法，包括清空容器，清空列表啥的。
            resetData(arg, el){
                // 默认删除的是按照清空容器来算的。
                // 我也不知道为什么要写这么多属性来存这些东西。。。麻蛋。维护起来好麻烦。
                _this.detailInfoPannel = false // 扫码明细部分数据
                _this.goodsInfoDetail = {}
                _this.goodsInfo = {}
                _this.PCReceivForm = {} // 收货表单数据。
                _this.isSingle = false // 是否单件扫描
                _this.isSNedit = false // 逐件扫描复选框是否可编辑
                _this.customQty = 0 // 输入的检查数量
                _this.goodsDetailList = [] // 存储扫码商品的详细信息列表，在下边任务列表显示
                _this.isEditProductDate = true // 生产日期是不是主要管理的，需要则可编辑，不需要则不可编辑
                _this.containerNo = '' // 容器编号
                _this.goodBarCode = '' // 商品条码
                _this.productBatchInfo = { // 商品批次信息
                    productBatchNo: '', // 批号
                    productDate: '', // 生产日期
                    expiryDate: '', // 失效日期
                }
                _this.isBatchInfoSave = false // 是不是要保存生产批次，默认保存

                // 切换通知单的情况下要把这些也删除
                if (arg == "notify") {
                    _this.currStatusPannel = false // 当前状态数据展示面板
                    _this.containerInfo = {} // 扫码容器信息
                    _this.notifyDetail = {} // 通知单明细
                    _this.InboundNotifyNo = '' // 入库通知单号
                    _this.InboundNotifyId = '' // 入库通知单id
                    _this.receivingWorkId = '' // 扫码容器作业id
                }

                _this.setFocusToEl(el)

            },

        },
        created(){
            _this = this
            this.utilFn = utilFn
        },
        mounted(){
            this.initOperate()
            this.addShortcuts()
        },
        beforeDestroy(){
            _this.keyBordArr = {}
        }

    }
</script>

<style scoped lang="less" type="text/less">
    /*工作台导航 start*/
    .nav-div {
        position: relative;
        span {
            margin-right: 2px;
        }
        i {
            position: absolute;
            top: 7px;
            left: 145px;
            font-size: 12px;
            width: 0;
        }
        button {
            border: 1px solid #ccc;
            height: 23px;
            line-height: 21px;
            background: #fff;
            color: #5f5f5f;
            margin-left: 7px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .nav-select .el-input, .nav-select .el-input__inner {
            width: 120px;
            height: 22px;
            line-height: 22px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .el-select .el-input .el-input__icon {
            display: none;
        }
    }

    /*工作台导航 end*/
    .mainContent {
        overflow-x: hidden;
    }

    /*内容  start*/
    .content {
        margin-top: 10px;
        overflow-x: hidden;
        /*第一部   start*/
        .group {
            border-bottom: 1px dashed #ccc;
            padding-bottom: 16px;
        }
        .group-p {
            position: relative;
            display: inline-block;
            .odd {
                width: 200px;
            }
            .icon-xiajiantou {
                position: absolute;
                top: 10px;
                right: 90px;
                font-size: 12px;
            }
            .link {
                display: inline-block;
                margin-top: 3px;
                margin-left: 16px;
                div {
                    display: inline-block;
                    margin-right: 30px;
                    p {
                        display: inline-block;
                        font-size: 20px;
                        color: #05c728;
                    }
                }
                a {
                    color: #4ab0e0;
                    text-decoration: underline;
                    margin-right: 16px;
                }
            }
            .el-button--default {
                width: 68px;
                padding: 0;
                margin: 0 0 0 7px;
                &:hover {
                    border-color: #20a0ff;
                }
                &:focus {
                    border-color: #20a0ff;
                }
                /*&:active {
                    border-color: #20a0ff;
                }*/
            }
            .active {
                border-color: #20a0ff;
            }
        }
        .group-l {
            width: 340px;
        }
        .group-c {
            width: 260px;
        }
        .group-r {
            width: 370px;
        }
        /*第一部   end*/
        /*第二部   start*/
        .breed-box {
            margin-top: 16px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 20px;
            .breed-number, .total {
                width: 300px;
                display: inline-block;
                p {
                    font-size: 14px;
                    color: #28a7e1;
                    margin-bottom: 10px;
                }
                .plan, .quality-testing {
                    width: 120px;
                    height: 80px;
                    border: 1px solid #ccc;
                    display: inline-block;
                    margin-right: 16px;
                    float: left;
                    span {
                        width: 120px;
                        display: inline-block;
                        text-align: center;
                        margin-top: 10px;
                    }
                    p {
                        text-align: center;
                        margin-top: 6px;
                        font-size: 30px;
                    }
                }
                .plan {
                    p {
                        text-align: center;
                        margin-top: 6px;
                        font-size: 30px;
                        color: #666;
                    }
                }
            }
        }
        /*第二部   end*/
        /*第三部   start*/
        .commodity {
            margin: 16px 0;
            .commodity-b {
                margin-top: 12px;
                .group-p {
                    .quantity {
                        width: 80px;
                        margin-right: 16px;
                    }
                    .commodity-total {
                        display: inline-block;
                        position: relative;
                        em {
                            position: absolute;
                            top: 7px;
                            z-index: 1;
                            left: 85px;
                            border-left: 1px solid #ccc;
                            padding-left: 7px;
                        }
                    }
                    .commodity-back {
                        margin-left: 10px;
                    }

                    .conversion {
                        width: 130px;
                    }
                }
            }
            .group-p {
                margin-right: 16px;
                .el-input {
                    width: 200px;
                }
            }
        }
        /*第三部   end*/
        .product-date {
            /*border-top: 1px dashed #ccc;*/
            padding-top: 16px;
            .group {
                border: none;
                .group-p {
                    margin-right: 50px;
                    .el-input {
                        width: 160px;
                    }
                    .el-input__inner {
                        width: 160px;
                    }
                }
            }
        }

        .header-btn {
            .el-button {
                margin: 0;
                padding: 0;
                width: 74px;
                height: 22px;
                line-height: 22px;
                margin-right: 6px;
            }
        }

        .details-list {
            margin-top: 10px;
            p {
                span {
                    color: #000;
                }
            }
        }
    }

    /*内容  end*/
    /*右侧成功失败提示框	start*/
    .promptbox-succeed {
        width: 220px;
        height: 150px;
        border: 1px solid #ccc;
        position: absolute;
        top: 190px;
        right: -1px;
        background: #fff;
        opacity: .6;
        color: #05c728;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
        h2 {
            font-size: 40px;
            text-align: center;
            line-height: 100px;
        }
        p {
            font-size: 16px;
            text-align: center;
        }
    }

    .promptbox-fail {
        color: #f00;
    }

    /*右侧成功失败提示框	end*/
    /*右侧划出  start*/
    .right-slide {
        position: relative;
        position: absolute;
        top: 135px;
        right: 0;
        width: 85%;
        height: 85.5%;
        background: #fff;
        padding: 0 16px;
        z-index: 1000;
        .content-up {
            margin-bottom: 10px;
            .content-title {
                margin: 10px 0 16px 16px;
                color: #28a7e1;
                font-size: 14px;
                text-align: left;
            }
            .content-detail {
                width: 23%;
                display: inline-block;
                div {
                    margin-bottom: 16px;
                    span {
                        width: 90px;
                        text-align: right;
                        float: left;
                    }
                    p {
                        display: inline-block;
                        margin-left: 6px;
                    }
                }
            }
        }
        .content-down {
            border-top: 2px solid #ccc;
            .information-list {
                margin-top: 16px;
            }
        }
        .close-btn {
            i {
                position: absolute;
                top: 5px;
                right: 16px;
            }
        }
    }

    /*右侧划出  end*/

    /*暂存货位弹出层   start*/
    .temporary-location {
        .el-form-item {
            margin: 50px 0 0 16px;
        }
    }

    /*暂存货位弹出层   end*/
</style>
