<template>
    <div class="wms-items" v-if="isCache">
        <el-form :model="QCPackageForm">
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
                    <button type="button">完成组包（F4）</button>
                    <button type="button">完成质检（F5）</button>
                </div>
            </div>
            <div class="wms-main">
                <div class="mainContent">
                    <div class="content">
                        <div class="contentBox">
                            <!--第一部 start-->
                            <div class="group">
                                <div class="group-p group-l">
                                    <span>下架单号/容器号/质检差异单号</span>
                                    <el-input v-model="inputOrderNo" ref="inputOrderNoInput" placeholder="请输入内容" class="odd"></el-input>
                                    TGXJ171021000007
                                </div>
                                <div class="group-p group-c">
                                    <span>下架人员</span>
                                    <el-select v-model="soleInput" placeholder="请选择">
                                        <el-option
                                            v-for="item in soldPeople"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <i class="iconfont icon-xiajiantou"></i>
                                </div>
                                <div class="group-p group-r">
                                    <span>出库通知单号</span>
                                    <el-input v-model="outboundNotifyNo" placeholder="请输入内容" class="odd" :disabled="true"></el-input>
                                </div>
                            </div>
                            <!--第一部 end-->

                            <!--第二部 start-->
                            <div class="commodity" v-show="currStatusPannel">
                                <div>
                                    <div class="group-p">
                                        <span>商品条码</span>
                                        <el-input v-model="barcode" ref="barcodeInput" placeholder="请输入内容"></el-input>
                                        12345748
                                    </div>
                                    <div class="group-p">
                                        <el-checkbox v-model="input">逐件扫描</el-checkbox>
                                        <div class="link">
                                            <a href="javascript:;" @click="groupPackageDetailPannel=true" id="groupPackageDetail" class="modify">已组包详情</a>
                                            <a href="javascript:;" @click="shelfDetailPannel=true" id="groupPackageDetail" class="modify">下架单详情</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="commodity-b">
                                    <div class="group-p">
                                        <span>商品名称</span>
                                        <el-input v-model="goodsInfoDetail.goodsName" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="group-p">
                                        <span>数量</span>
                                        <el-input v-model="input" v-if="isSingle" class="quantity"></el-input>
                                        <el-input v-model="input" v-if="!isSingle" class="quantity"></el-input>
                                        <em>{{goodsInfoDetail.unit}}</em>
                                        <span>整零转换</span>
                                        <el-input v-model="input" placeholder="请输入内容" class="conversion" :disabled="true"></el-input>
                                    </div>
                                </div>
                            </div>
                            <!--第二部 end-->

                            <!--第三部 start-->
                            <div class="breed-box" v-show="detailInfoPannel">
                                <div class="breed-number">
                                    <p>品种数</p>
                                    <div class="plan">
                                        <span>计划</span>
                                        <p>{{notifyDetail.planVarietyQty}}</p>
                                    </div>
                                    <div class="quality-testing">
                                        <span>已质检</span>
                                        <p>{{notifyDetail.qualityControlQty}}</p>
                                    </div>
                                </div>
                                <div class="total">
                                    <p>合计总数量</p>
                                    <div class="plan">
                                        <span>计划</span>
                                        <p>{{notifyDetail.planQty}}</p>
                                    </div>
                                    <div class="quality-testing">
                                        <span>已质检</span>
                                        <p>{{notifyDetail.qualityControlQty}}</p>
                                    </div>
                                    <div class="quality-testing">
                                        <span>包件数量</span>
                                        <p>0</p>
                                    </div>
                                </div>
                            </div>
                            <!--第三部 end-->
                            <div class="header-btn" v-show="detailInfoPannel">
                                <el-button @click='goodsDeleteDialog = true'>删除(F6)</el-button>
                                <el-button @click='emptyContainer'>清空包件</el-button>
                            </div>
                            <!--表单  start-->
                            <div class="details-list" v-show="detailInfoPannel">
                                <div class="barcode">容器条码：{{selectionDetailLabelNo}}
                                    <span>合计sku数量：0</span>
                                    <span>合计总数量：0</span>
                                    <div class="balse-number">
                                        <span>包件实数</span>
                                        <input type="text">
                                        <em>kg</em>
                                    </div>
                                </div>
                                <div class="information-list">
                                    <el-table :data="goodsDetailList" border style="width: 100%"
                                              :default-sort="{prop: 'date', order: 'descending'}">
                                        <el-table-column prop="" label="SKUID" width="160"></el-table-column>
                                        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                                        <el-table-column prop="goodsNo" label="商品条码"></el-table-column>
                                        <el-table-column prop="unitConvertText" label="整零转换"></el-table-column>
                                        <el-table-column prop="unit" label="单位"></el-table-column>
                                        <el-table-column prop="planQty" label="计划数量" width=""></el-table-column>
                                        <el-table-column prop="qualityControlQty" label="已质检数量" width=""></el-table-column>
                                        <el-table-column prop="productBatchNo" label="生产批号"></el-table-column>
                                        <el-table-column prop="productDate" label="生产日期"></el-table-column>
                                        <el-table-column prop="expiryDate" label="失效日期"></el-table-column>
                                        <el-table-column prop="shelflifeDays" label="保质期天数"></el-table-column>
                                    </el-table>
                                </div>
                                <!--表单  end-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
        <!--右侧划出 已组包详情  start-->
        <div class="right-groupPackage" v-show="groupPackageDetailPannel">
            <div class="content-up">
                <div class="content-title">已组包明细</div>
                <div class="information-list">
                    <div class="barcode">包件数量：{{selectionDetailLabelNo}}</div>
                    <el-table :data="selectionDetailList" border style="width: 100%"
                              :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type='index' label="序号" width="70"></el-table-column>
                        <el-table-column prop="status" label="状态" width=""></el-table-column>
                        <el-table-column prop="packingDocumentNo" label="包件单号" width=""></el-table-column>
                        <el-table-column prop="outboundNotifyNo" label="出库通知单单号" width="105"></el-table-column>
                        <el-table-column prop="posPlatformName" label="POS台" width=""></el-table-column>
                        <el-table-column prop="qualityControlMan" label="质检人" width=""></el-table-column>
                        <el-table-column prop="ownerName" label="货主" width=""></el-table-column>
                        <el-table-column prop="warehouseName" label="仓库" width=""></el-table-column>
                        <el-table-column prop="goodBad" label="正残属性" width=""></el-table-column>
                        <el-table-column prop="" label="包件品种数" width="100"></el-table-column><!--没有字段-->
                        <el-table-column prop="qty" label="数量" width=""></el-table-column>
                        <el-table-column prop="systemWeight" label="包件系统重量" width="100"></el-table-column>
                        <el-table-column prop="actualWeight" label="包件实际重量" width="100"></el-table-column>
                        <el-table-column prop="systemVolume" label="包件系统体积" width="100"></el-table-column>
                        <el-table-column prop="distributionWay" label="配送方式" width=""></el-table-column>
                        <el-table-column prop="supplierName" label="供应商" width=""></el-table-column>
                        <el-table-column prop="supplierMan" label="联系人" width=""></el-table-column>
                        <el-table-column prop="supplierManTel" label="联系人电话" width="100"></el-table-column>
                        <el-table-column prop="returnAddress" label="退货地址" width=""></el-table-column>
                        <el-table-column prop="deliveryCompanyName" label="承运公司" width=""></el-table-column>
                        <el-table-column prop="logisticsNo" label="物流单号" width=""></el-table-column>
                        <el-table-column prop="takeGoodsCarNo" label="提货车牌号" width="100"></el-table-column>
                        <el-table-column prop="takeGoodsMan" label="提货人" width=""></el-table-column>
                        <el-table-column prop="takeGoodsManTel" label="提货电话" width=""></el-table-column>
                        <el-table-column prop="packingTime" label="组包时间" width=""></el-table-column>
                        <el-table-column prop="" label="完成组包人" width="100"></el-table-column><!--没有字段-->
                        <el-table-column prop="" label="完成时间" width=""></el-table-column><!--没有字段-->
                    </el-table>
                </div>
            </div>
            <div class="content-down">
                <div class="arrow-bottom arrow-box" >
                    <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                </div>
                <!--表单  start-->
                <div class="details-list">
                    <div class="barcode">包件单号：{{selectionDetailLabelNo}}</div>
                    <div class="information-list">
                        <el-table :data="selectionDetailList" border style="width: 100%"
                                  :default-sort="{prop: 'date', order: 'descending'}">
                            <el-table-column type="index" label="序号" width="70"></el-table-column>
                            <el-table-column prop="takeawayNo" label="下架单号"></el-table-column>
                            <el-table-column prop="" label="SKUID"></el-table-column>
                            <el-table-column prop="barcode" label="商品条码"></el-table-column>
                            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                            <el-table-column prop="spec" label="规格" width=""></el-table-column>
                            <el-table-column prop="unitConvert" label="整零转换" width=""></el-table-column>
                            <el-table-column prop="unitName" label="单位"></el-table-column>
                            <el-table-column prop="qty" label="数量"></el-table-column>
                            <el-table-column prop="productBatchNo" label="生产批号"></el-table-column>
                            <el-table-column prop="productDate" label="生产日期"></el-table-column>
                            <el-table-column prop="expireDate" label="失效日期"></el-table-column>
                            <el-table-column prop="shelflife" label="保质期天数" width="100"></el-table-column>
                        </el-table>
                    </div>
                    <!--表单  end-->
                </div>
            </div>
            <a class="close-btn" href="javascript:;">
                <i class="iconfont icon-guanbi" id="detailPanelCloseBtn" @click="groupPackageDetailPannel=false;"></i>
            </a>
        </div>
        <!--右侧划出 已组包详情  end-->

        <!--右侧划出 下架单明细  start-->
        <div class="right-shelfdetails" v-show="shelfDetailPannel">
            <div class="content-up">
                <div class="content-title">下架单明细</div>
                <div class="content-detail">
                    <div>
                        <span>下架单号:</span>
                        <p>{{notifyDetail.takeawayNo}}</p>
                    </div>
                    <div>
                        <span>状态:</span>
                        <p>{{notifyDetail.status}}</p>
                    </div>
                    <div>
                        <span>货主:</span>
                        <p>{{notifyDetail.ownerName}}</p>
                    </div>
                    <div>
                        <span>RF标记:</span>
                        <p>{{notifyDetail.isRf}}</p>
                    </div>
                </div>
                <div class="content-detail">
                    <div>
                        <span>来源单据类型:</span>
                        <p>{{notifyDetail.sourceOrderType}}</p>
                    </div>
                    <div>
                        <span>来源单据号:</span>
                        <p>{{notifyDetail.sourceOrderNo}}</p>
                    </div>
                    <div>
                        <span>业务单据类型:</span>
                        <p>{{notifyDetail.receivedVarietyQty}}</p> <!--没有字段-->
                    </div>
                    <div>
                        <span>业务单据号:</span>
                        <p>{{notifyDetail.businessNo}}</p>
                    </div>
                </div>
                <div class="content-detail">
                    <div>
                        <span>计划品种数:</span>
                        <p>{{notifyDetail.planVarietyQty}}</p>
                    </div>
                    <div>
                        <span>计划数量:</span>
                        <p>{{notifyDetail.planQty}}</p>
                    </div>
                    <div>
                        <span>质检品种数:</span>
                        <p>{{notifyDetail.notifyNo}}</p> <!--没有字段-->
                    </div>
                    <div>
                        <span>质检数量:</span>
                        <p>{{notifyDetail.qualityControlQty}}</p>
                    </div>
                </div>
                <div class="content-detail">
                    <div>
                        <span>下架人员:</span>
                        <p>{{notifyDetail.operatorName}}</p>
                    </div>
                    <div>
                        <span>备注:</span>
                        <p>{{notifyDetail.remark}}</p>
                    </div>
                </div>
            </div>
            <div class="content-down">
                <div class="information-list">
                    <el-table :data="selectionDetailList" border style="width: 100%"
                              :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type='index' label="序号" width=""></el-table-column>
                        <el-table-column prop="goodsId" label="SKUID" width=""></el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" width=""></el-table-column>
                        <el-table-column prop="spec" label="规格" width=""></el-table-column>
                        <el-table-column prop="unitConvertText" label="整零转换" width=""></el-table-column>
                        <el-table-column prop="planQty" label="计划数量" width=""></el-table-column>
                        <el-table-column prop="qualityControlQty" label="质检数量" width=""></el-table-column>
                        <el-table-column prop="differenceQty" label="差异数量" width=""></el-table-column>
                        <el-table-column prop="unit" label="单位" width=""></el-table-column>
                        <el-table-column prop="barcode" label="商品条码" width=""></el-table-column>
                        <el-table-column prop="" label="商品二级条码" width="100"></el-table-column><!--没有字段-->
                        <el-table-column prop="" label="商品三级条码" width="100"></el-table-column><!--没有字段-->
                        <el-table-column prop="goodBad" label="正残品属性" width="100"></el-table-column>
                        <el-table-column prop="productBatchNo" label="生产批号" width=""></el-table-column>
                        <el-table-column prop="productDate" label="生产日期" width=""></el-table-column>
                        <el-table-column prop="expireDate" label="失效日期" width=""></el-table-column>
                        <el-table-column prop="shelflifeDays" label="保质期天数" width="100"></el-table-column>
                    </el-table>
                </div>
            </div>
            <a class="close-btn" href="javascript:;">
                <i class="iconfont icon-guanbi" id="detailPanelCloseBtn" @click="shelfDetailPannel = false;"></i>
            </a>
        </div>
        <!--右侧划出 下架单明细  end-->

    </div>
</template>
<script type="es6">
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'

    let api = {
        getPOSList: '/wms-base-server/pos/getList', // 获取pos台列表
        getOrderNo: '/wms-outbound-server/packingdocument/checkInputOrderNo',//根据单号获取信息
//        getPackingdocument: '/wms-outbound-server/packingdocument/get' // 已组包详情

    }
    let _this = null
    export default {
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        created(){
            _this = this
            _this.api = api
        },
        mounted(){
            this.initOperate()
        },
        data () {
            return {
                tag:'wms_qualityInspectionBurstification',
                system:'/wms',
                titleName:'质检组包',
                form: {}, // test form.
                input: '',
                poslist: [{
                    posCode: '选项1',
                    posName: '黄金糕'
                }, {
                    posCode: '选项2',
                    posName: '双皮奶'
                }],
//                outboundModel: {},
                outboundNotifyNo:'', // 出库通知单号
                checked: true,
                selectionDetailLabelNo: '-',
                selectionDetailList: [], // 已组包详情
                postCode: '', // 当前pos台
                currStatusPannel: false, // 当前状态数据展示面板
                detailInfoPannel: false, // 扫码明细部分数据展示面板
                isSingle: false, // 是否单件扫描
                groupPackageDetailPannel: false, // 已组包明细，对，就是从右侧出来的另外一个
                shelfDetailPannel: false, // 下架单明细，对，就是从右侧出来的其中一个
                inputOrderNo: '', // 下架单号/容器号/质检差异单号
                soldOutInput: '', // 下架单容器号 质检差异单号 输入框
                barcode: '', // 商品条码
                goodInput: '', // 商品条码输入框
                getGoodBarCode:'',// 获取数组中每个对象的商品条码
                goodsInfoDetail: {}, // 商品名称信息
                QCPackageForm: {}, // 质检组包数据
                notifyDetail: {}, // 下架单明细
                detailList:[],// 单号明细列表
                soldPeople:[{
                    value:'1',
                    label:'水电费'
                },{
                    value:'2',
                    label:'是的否'

                }],//下架人员列表
                soleInput: '', // 下架人员
                goodsDetail:{},// 存储扫码商品的详细信息
                goodsDetailList: [], // 存储扫码商品的详细信息列表，在下边任务列表显示
            }
        },
        methods: {
            // 初始化操作，模拟扫描枪动作
            initOperate () {
                _this.soldOutInput = _this.getInput(_this.$refs.inputOrderNoInput) // 下架单号  容器号等

                _this.goodInput = _this.getInput(_this.$refs.barcodeInput) // 商品条码
                // 监听获取下架单号 容器号 质检差异单号数据，扫码获取单号后获取单号信息
                _this.soldOutInput.addEventListener('keydown', (e) => {
                    // 正常对应扫码获取数据后请求
                    if (!_this.soldOutInput.value) {
                        return
                    }
                    if (e.keyCode == '13') {
                        _this.getOrderNo(_this.soldOutInput.value)
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
                            barcode: _this.goodInput.value,
//                            receivingWorkId: _this.receivingWorkId
                        })
//                        _this.setProDate(e)
//                        _this.setGoodsNum()
                    }
                })
                _this.getPOSList()

            },
            // 获取标记输入元素
            getInput(el){
                return el.$el.tagName.toLowerCase() == 'input' ? el : el.$el.querySelector('input')
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

            // 根据下架单号/容器号/质检差异单号获取信息
            getOrderNo(inputOrderNo){
                _this.$request({
                    url:api.getOrderNo,
                    context:_this, //this
                    sendData:{
                        "warehouseId": 2000,
                        "inputOrderNo":inputOrderNo // TGXJ171021000007
//                        "inputOrderNo": "TGXJ171021000007"
                    },
                    successCallback:(_this,response)=>{
                        console.log("::",response)
                        _this.notifyDetail = response.takeawayOrderDto  //  下架单明细详情
                        _this.selectionDetailList = [response]  // 已组包明细详情
                        _this.detailList = _this.notifyDetail.detailList  // 单号明细，商品条码后获取
                        console.log(':::',_this.selectionDetailList)
                        // 显示当前面板
                        _this.currStatusPannel = true
                        _this.detailInfoPannel = true
                        // 容器扫码获取焦点，方便操作
                        _this.setFocusToEl(_this.goodInput)
                    },
                    failCallback:(_this,e) => {
                        _this.tip({
                            title: '报错提示',
                            tip: e,
                        })
//                        _this.setFocusToEl(_this.soldOutInput)
                    }
                })
            },
            /**
             * 根据商品条码获取商品信息 ，
             * 通过扫入的商品条码，判断超品，新品，保质期,sn,超量,
             * 如果返回isNewGoods为2（新品）则需要跳到新品维护页面根据返回的goodsId获取商品详情
             */
            getGoodsInfo(param){
                for (var i = 0, len = _this.detailList.length; i < len; i++) {
                    if (_this.getGoodBarCode[i] == param.barcode) {
//                         console.log(_this.goodsDetail )
                        _this.goodsDetail = _this.goodsDetailList[i]
                        _this.operateTipPannel({
                            title: '成功',
                            tip: '商品条码扫描成功'
                        })

                        // 通过isShelflife判断商品是否有保质期 2：有保质期 1：无
                        let detail = _this.checkorderinfo.wmsGoodsDtoList[0].wmsGoodsBaseDto
                        if (detail.isShelflife == '2') {
                            _this.isEditProductDate = false
                        }
                        // 判断是否是sn商品 1：不是 2：是
                        if (detail.isSn == '1') {
                            _this.dialogSNscanFormVisible = true
                        }
                        return
                    }
                    if (i == _this.getGoodBarCode.length - 1) {
                        _this.operateTipPannel({
                            title: '失败',
                            tip: '查询不到该商品'
                        })
                        _this.setFocusToEl(_this.goodInput)
                    }
                }
            },

            // 设置管理状态，逐件扫描，生产日期管理等
           /* setManageStatus(){
                // 逐件扫描
                _this.isSingle = _this.goodsInfo.isSN == 2 ? true : false // 判断是不是逐渐扫码   1否，2是 接口就是这么搞的。
                _this.isSNedit = _this.goodsInfo.isSN == 2 ? true : false // 设置是否可编辑
                _this.customQty = _this.isSingle ? 1 : 0 // 设置数量框。

                // 生产日期管理
                _this.isEditProductDate = _this.goodsInfo.isShelfLife == 2 ? true : false //是否可以管理生产日期

                //设置扫描SN码弹窗
                //_this.setSNscan()
            },*/

            // 清空包件容器
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
            // 展示入库通知单明细,暂时不做动画了，所以。。。这个方法先放着。
            notifyDetailPannelFn(){
                document.getElementById("groupPackageDetail").addEventListener("click", (e) => {
                    _this.showDetailPannel = true
                })

                document.getElementById("detailPanelCloseBtn").addEventListener("click", (e) => {
                    _this.showDetailPannel = false
                })

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
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
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
            width: 102px;
            height: 23px;
            line-height: 21px;
            background: #fff;
            color: #5f5f5f;
            margin-left: 7px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .nav-select .el-input,.nav-select .el-input__inner {
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
    /*内容区域  start*/
    .content {
        margin-top: 10px;
        /*第一部  start*/
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
                a {
                    color: #4ab0e0;
                    text-decoration: underline;
                    margin-right: 16px;
                }
            }
        }
        .group-l {
            width: 420px;
        }
        .group-c {
            width: 240px;
        }
        .group-r {
            width: 370px;
        }
        /*第一部  end*/
        /*第二部  start*/
        .commodity {
            margin-top: 16px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 20px;
            .commodity-b {
                margin-top: 12px;
                .group-p {
                    .quantity {
                        width: 80px;
                        margin-right: 16px;
                    }
                    em {
                        position: absolute;
                        top: 7px;
                        z-index: 1;
                        left: 85px;
                        border-left: 1px solid #ccc;
                        padding-left: 7px;
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
        /*第二部  end*/
        /*第三部   start*/
        .breed-box {
            margin-top: 16px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 20px;
            .breed-number, .total {
                /*width: 300px;*/
                display: inline-block;
                margin-left: 20px;
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
        /*第三部   end*/
        /*表单上面按钮    start*/
        .header-btn {
            margin-top: 10px;
            .el-button {
                margin: 0;
                padding: 0;
                width: 74px;
                height: 22px;
                line-height: 22px;
                margin-right: 6px;
            }
        }
        /*表单上面按钮    end*/
        /*表单    start*/
        .details-list {
            margin-top: 10px;
            .barcode {
                border: 1px solid #ccc;
                border-bottom: none;
                height: 30px;
                line-height: 30px;
                color: #28a7e1;
                padding-left: 10px;
                background: #F5F5F5;
                .balse-number {
                    display: inline-block;
                    position: relative;
                    input {
                        width: 78px;
                        height: 20px;
                        border: 1px solid #ccc;
                        background: #fff;
                    }
                    em {
                        position: absolute;
                        top: 0px;
                        right: 10px;
                        color: #000;
                        font-size: 12px;
                    }
                }
                span {
                    color: #000;
                }
            }
        }
        /*表单    end*/
    }
    /*内容区域  end*/
    /*右侧划出  下架单明细  start*/
    .right-shelfdetails {
        position: relative;
        position: absolute;
        top: 50px;
        right: 0;
        width: 85%;
        height: 85.5%;
        background: #fff;
        padding: 0 16px;
        z-index: 1000;
        box-shadow: 0px 1px 10px -3px #ccc;
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
    /*右侧划出  下架单明细  end*/
    /*右侧划出  已组包明细  start*/
    .right-groupPackage {
        position: relative;
        position: absolute;
        top: 50px;
        right: 0;
        width: 85%;
        height: 85.5%;
        background: #fff;
        padding: 0 16px;
        z-index: 1000;
        box-shadow: 0px 1px 10px -3px #ccc;
        .content-up {
            margin-bottom: 10px;
            .content-title {
                margin: 10px 0 16px 16px;
                color: #28a7e1;
                font-size: 14px;
                text-align: left;
            }
            .barcode {
                margin-top: 20px;
                border: 1px solid #ccc;
                border-bottom: none;
                height: 30px;
                line-height: 30px;
                color: #28a7e1;
                padding-left: 10px;
                background: #F5F5F5;
            }
        }
        .content-down {
            border-top: 1px solid #ccc;
            margin-top: 40px;
            position: relative;
            /*中间分隔线 start*/
            .arrow-bottom {
                .bottom {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    left: 100px;
                    top: -2px;
                    z-index: 2;
                    .bottom-arrow1, .bottom-arrow2 {
                        width: 0;
                        height: 0;
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 5;
                        border-bottom: 16px transparent dashed;
                        border-left: 10px transparent dashed;
                        border-right: 10px transparent dashed;
                        border-top: 10px white solid;
                        overflow: hidden;
                    }
                    .bottom-arrow1 {
                        top: 1px;
                        border-top: 10px #ccc solid;
                    }
                    .bottom-arrow2 {
                        border-top: 10px #fff solid;
                    }
                }
            }
            /*中间分隔线 end*/
            .barcode {
                margin-top: 20px;
                border: 1px solid #ccc;
                border-bottom: none;
                height: 30px;
                line-height: 30px;
                color: #28a7e1;
                padding-left: 10px;
                background: #F5F5F5;
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
    /*右侧划出  已组包明细  end*/

</style>

