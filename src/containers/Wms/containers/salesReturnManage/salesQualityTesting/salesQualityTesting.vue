<template>
<div class="wms-items">
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
                <button type="button" @click="selectQualityTesting">完成质检(F3)</button>
                <button type="button"  @click="selectGoodsPosition">完成容器(F4)</button>
                <button type="button">刷新(F5)</button>
            </div>
        </div>
        <div class="wms-main">
            <div class="mainContent">
                <div class="content">
                    <div class="contentBox">
                        <!--第一部 start-->
                            <div class="group">
                                <div class="group-p group-l">
                                    <p>销退单号/运单号/原订单号</p>
                                    <el-input ref="InputOrderInfo" v-model="inputOrderInfo" placeholder="请输入内容"  class='odd pos'></el-input>
                                    <i class='iconfont icon-sousuo'></i>
                                </div>
                                <div class="group-p group-l">
                                    <p>客户名称/客户联系人/客户联系方式/司机</p>
                                    <el-input ref="InputUserInfo" v-model="inputUserInfo" placeholder="请输入内容"  class='odd'></el-input>
                                </div>
                                <div class="group-p group-l">
                                    <p>货主</p>
                                    <el-input  :disabled="true" style='width:70px;' v-model='inputeOwnerName'></el-input>
                                </div>
                            </div>
                            <div class="group group-border">
                                <div class="group-p group-l">
                                    <div>
                                        <p>选择正残品</p>
                                        <el-button @click='goodsProperty=0' :class="{'active':goodsProperty==0}" style="margin-left:0;">正品(F5)
                                        </el-button>
                                        <el-button @click='goodsProperty=1' :class="{'active':goodsProperty==1}">残品(F6)
                                        </el-button>
                                    </div>
                                    <div>
                                        <p>残品类型</p>
                                        <el-input  :disabled="true"></el-input>
                                    </div>
                                </div>
                                <div class="group-p group-l">
                                    <p>容器号</p>
                                    <el-input ref="containerNoInput" v-model="containerNo" placeholder="请输入内容"
                                              class="odd"></el-input>
                                </div>
                             </div>
                            <!--第一部 end-->
                             <!--第二部 start-->
                            <div class="breed-box" v-show="currStatusPannel">
                                <div class="breed-number">
                                    <p>质检品种数</p>
                                    <div class="plan">
                                        <span>计划</span>
                                        <p>{{checkorderinfoChild.varietyQty}}</p>
                                    </div>
                                    <div class="quality-testing">
                                        <span>已质检</span>
                                        <p>{{goodsDetailList.length}}</p>
                                    </div>
                                </div>
                                <div class="total">
                                    <p>质检总数量</p>
                                    <div class="plan">
                                        <span>计划</span>
                                        <p>{{checkorderinfoChild.planQty}}</p>
                                    </div>
                                    <div class="quality-testing">
                                        <span>已质检</span>
                                        <p>{{totalCount}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--第二部 end-->

                            <!--第三部 start-->
                            <div v-show="detailInfoPannel">
                                <div class="group ">
                                    <div class="group-p group-s">
                                        <p>商品条码</p>
                                        <el-input ref="goodBarCodeInput" v-model="checkorderinfoChildList.goodBarCode"
                                                  placeholder="MMHZ1709130000034" class='odd'></el-input>
                                    </div>
                                    <div class="group-p group-s">
                                        <el-checkbox  v-model='isSingle' >逐件扫描</el-checkbox>
                                    </div>
                                    <div class="group-p group-s">
                                         <a @click="notifyDetailPannel=true;" class="modify"
                                               id='inboundNotifyDetail'>销退单明细</a>
                                    </div>
                                </div>
                                <div class="group">
                                    <div class="group-p group-s">
                                        <p>商品名称</p>
                                        <el-input name="goodsName" v-model="goodsDetail.goodsName"
                                                  placeholder="请输入商品名称" class='odd'></el-input>
                                    </div>
                                    <div class="group-p group-s">
                                        <div class="commodity-total">
                                            <p>数量</p>
                                            <el-input name="customQty" ref="countInput" v-model="count"
                                                      class="quantity" ></el-input>
                                            <span>{{goodsDetail.unit}}</span>
                                        </div>
                                    </div>
                                     <div class="group-p group-s">
                                         <p>整零转换</p>
                                         <el-input v-model="goodsDetail.unitConvertText" placeholder="整零转换"
                                                  class="conversion" :disabled="isEditProductDate" ></el-input>
                                    </div>
                                </div>

                                <div class="group">
                                    <div class="group-p group-s">
                                        <p>生产日期</p>
                                        <el-input ref="productDate" v-model="goodsDetail.productDate"
                                                  placeholder="生产日期" :disabled="isEditProductDate"></el-input>
                                    </div>
                                    <div class="group-p group-s">
                                        <p>失效日期</p>
                                        <el-input ref="expiryDate" v-model="goodsDetail.expireDate"
                                                  placeholder="失效日期" :disabled="isEditProductDate"></el-input>
                                    </div>
                                    <div class="group-p group-s">
                                        <p>生产批号</p>
                                        <el-input ref="productBatchNo" v-model="goodsDetail.productBatchNo"
                                                  placeholder="生产批号" :disabled="isEditProductDate"></el-input>
                                    </div>
                               </div>
                            </div>
                            <!--表单  start-->
                            <div class="details-list" v-show='detailInfoPannel'>
                                <p>
                                    <span>容器号：{{containerNo}}</span>
                                    <span>合计sku数量：0</span>
                                    <span>合计总数量：0</span>
                                </p>
                                <div class="information-list">
                                    <el-table :data="goodsDetailList"
                                              border
                                              style="width: 100%"
                                              :default-sort="{prop: 'date', order: 'descending'}"
                                              highlight-current-row
                                              @row-click="rowClick">
                                        <el-table-column type='index' label="序号" width="70"></el-table-column>
                                        <el-table-column prop="saleReturnNo" label="销退单号" width="160"></el-table-column>
                                        <el-table-column prop="containerCode" label="容器号"></el-table-column>
                                        <el-table-column prop="goodBad" label="正残属性"></el-table-column>
                                        <el-table-column prop="goodsBarcode" label="商品条码"></el-table-column>
                                        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                                        <el-table-column prop="unitConvertText" label="整零转换"></el-table-column>
                                        <el-table-column prop="badType" label="残品类型" ></el-table-column>
                                        <el-table-column prop="receiveQty" label="数量"></el-table-column>
                                        <el-table-column prop="unit" label="单位"></el-table-column>
                                        <el-table-column prop="productDate" label="生效日期"></el-table-column>
                                        <el-table-column prop="expireDate" label="失效日期"></el-table-column>
                                        <el-table-column prop="shelflife" label="保质期"></el-table-column>
                                        <el-table-column prop="productBatchNo" label="生产批号"></el-table-column>
                                    </el-table>
                                </div>

                            </div>
                            <!--表单  end-->
                              <!--右侧划出  start-->
                                <div class="right-slide" v-show="notifyDetailPannel">
                                    <div class="content-up">
                                        <div class="content-title">销退单详情</div>
                                        <div class="content-detail">
                                            <div>
                                                <span>销退单号:</span>
                                                <p>{{checkorderinfoChild.saleReturnNo }}</p>
                                            </div>
                                            <div>
                                                <span>状态:</span>
                                                <p>{{checkorderinfoChild.status}}</p>
                                            </div>
                                            <div>
                                                <span>货主:</span>
                                                <p>{{checkorderinfoChild.ownerId}}</p>
                                            </div>
                                            <div>
                                                <span>出库单号:</span>
                                                <p>{{checkorderinfoChild.outBoundOrderNo}}</p>
                                            </div>
                                            <div>
                                                <span>应收数量:</span>
                                                <p>{{checkorderinfoChild.planQty}}</p>
                                            </div>
                                            <div>
                                                <span>质检结束时间:</span>
                                                <p>{{checkorderinfoChild.qualityControlEndTime}}</p>
                                            </div>
                                        </div>
                                        <div class="content-detail">
                                            <div>
                                                <span>仓库:</span>
                                                <p>{{checkorderinfoChild.warehouseId}}</p>
                                            </div>
                                            <div>
                                                <span>客户联系人:</span>
                                                <p>{{checkorderinfoChild.customerContacter}}</p>
                                            </div>
                                            <div>
                                                <span>司机:</span>
                                                <p>{{checkorderinfoChild.driver}}</p>
                                            </div>
                                            <div>
                                                <span>承运商名称:</span>
                                                <p>{{checkorderinfoChild.deliveryCompanyName}}</p>
                                            </div>
                                            <div>
                                                <span>实收数量:</span>
                                                <p>{{checkorderinfoChild.actualQty}}</p>
                                            </div>
                                        </div>
                                        <div class="content-detail">
                                            <div>
                                                <span>收货暂存位:</span>
                                                <p>{{checkorderinfoChild.tempGoodsPositionId}}</p>
                                            </div>
                                            <div>
                                                <span>客户联系方式:</span>
                                                <p>{{checkorderinfoChild.customerContactInfo}}</p>
                                            </div>
                                            <div>
                                                <span>车牌号:</span>
                                                <p>{{checkorderinfoChild.carNo}}</p>
                                            </div>
                                            <div>
                                                <span>运单号:</span>
                                                <p>{{checkorderinfoChild.waybillNo}}</p>
                                            </div>
                                            <div>
                                                <span>质检人:</span>
                                                <p>{{checkorderinfoChild.qcUser}}</p>
                                            </div>

                                        </div>
                                        <div class="content-detail">
                                        <div>
                                                <span>客户名称:</span>
                                                <p>{{checkorderinfoChild.customerName}}</p>
                                            </div>
                                            <div>
                                                <span>客户地址:</span>
                                                <p>{{checkorderinfoChild.customerAddrId}}</p>
                                            </div>
                                            <div>
                                                <span>原订单号:</span>
                                                <p>{{checkorderinfoChild.saleOrderNo}}</p>
                                            </div>
                                            <div>
                                                <span>品种:</span>
                                                <p>{{checkorderinfoChild.varietyQty}}</p>
                                            </div>
                                            <div>
                                                <span>质检开始时间:</span>
                                                <p>{{checkorderinfoChild.qualityControlStartTime}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-down">
                                        <div class="information-list">
                                            <el-table :data="checkorderinfoChildList" border style="width: 60%"
                                                    :default-sort="{prop: 'date', order: 'descending'}">
                                                <el-table-column type='index' label="序号" width=""></el-table-column>
                                                <el-table-column prop="goodsBarcode" label="商品条码" width=""></el-table-column>
                                                <el-table-column prop="goodsName" label="商品名称" width=""></el-table-column>
                                                <el-table-column prop="unitConvertText" label="整零转换" width=""></el-table-column>
                                                <el-table-column prop="orderQty" label="应收数量" width=""></el-table-column>
                                                <el-table-column prop="receiveQty" label="实收数量" width=""></el-table-column>
                                                <el-table-column prop="unitId" label="单位" width=""></el-table-column>
                                                <el-table-column prop="reason" label="退货原因" width=""></el-table-column>
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
                        </div>
                        <!--页面操作提示end-->
                     <!--销退单号弹出框开始-->
                        <el-dialog title="销退单选择" class="cargoRegisterPopup" :visible.sync="appointment">
                            <el-table
                                :data="checkorderinfoChild"
                                border
                                highlight-current-row
                                style='width:100%'
                                @row-click="rowClick"
                            >
                             <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-table
                                        label-position="left"
                                        class="demo-table-expand"
                                        highlight-current-row
                                        border
                                        :data='checkorderinfoChildList'
                                        >
                                            <el-table-column
                                                    type = 'index'
                                                    label="序号">
                                            </el-table-column>
                                        <el-table-column
                                                prop = 'goodsBarcode'
                                                label="商品条码">
                                        </el-table-column>
                                        <el-table-column
                                                prop = 'goodsName '
                                                label="商品名称">
                                        </el-table-column>
                                    <el-table-column
                                            prop = 'unitConvert'
                                            label="整零转换">
                                        </el-table-column>
                                    <el-table-column
                                            prop = 'planQty'
                                            label="应收数量">
                                    </el-table-column>
                                    <el-table-column
                                            prop = 'receiveQty'
                                            label="实收数量">
                                    </el-table-column>
                                    <el-table-column
                                            prop = 'unitName '
                                            label="单位">
                                    </el-table-column>
                                    <el-table-column
                                            prop = 'reason'
                                            label="退货原因">
                                    </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="seqNo"
                                    label="序号">
                                </el-table-column>
                                <el-table-column
                                    prop="saleReturnNo"
                                    label="销退单号">
                                </el-table-column>
                                <el-table-column
                                    prop="status"
                                    label="状态">
                                </el-table-column>
                                <el-table-column
                                    prop="customerName"
                                    label="客户名称">
                                </el-table-column>
                                <el-table-column
                                    prop="customerContacter"
                                    label="客户联系人"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="customerContactInfo"
                                    label="客户联系方式"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="客户地址">
                                </el-table-column>
                                <el-table-column
                                    prop="driver"
                                    label="司机">
                                </el-table-column>
                                <el-table-column
                                    prop="carNo"
                                    label="车牌号">
                                </el-table-column>
                                <el-table-column
                                    prop="saleOrderNo"
                                    label="原订单号">
                                </el-table-column>
                                <el-table-column
                                    prop="outBoundOrderNo"
                                    label="出库单号">
                                </el-table-column>
                                <el-table-column
                                    prop="deliveryCompanyName "
                                    label="承运商名称"
                                    width='100'>
                                </el-table-column>
                                <el-table-column
                                    prop="waybillNo"
                                    label="运单号">
                                </el-table-column>
                                <el-table-column
                                    prop="varietyQty"
                                    label="品种">
                                </el-table-column>
                                <el-table-column
                                    prop="planQty"
                                    label="数量">
                                </el-table-column>
                            </el-table>
                            <span slot="footer" class="dialog-footer">
                                <el-button class="cancelButton" @click="cancel">取消</el-button>
                                <el-button class="cancelButton" @click="sure">登记确认</el-button>
                            </span>
                        </el-dialog>
                  <!--销退单号弹出框 结束-->
                   <!--SN扫码弹窗 start-->
                    <el-dialog title="商品SN采集" :visible.sync="dialogSNscanFormVisible">
                        <div class='dialogFromLeft' style='width:45%;float:left'>
                              <el-form :model="SNscanForm">
                                    <el-form-item label="商品SN码">
                                        <el-input ref='SNscanInput'  v-model="SNscanForm.SNCode" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="商品SN列表">
                                        <el-input ref='SNscanInput'type='textarea'  v-model="SNscanForm.SNCode" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="主单位（台）20">
                                        <el-col :span='12'>
                                            <p>已采集</p>
                                            <p>20</p>
                                        </el-col>
                                        <el-col :span='12'>
                                            <p>未采集</p>
                                            <p>0</p>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                        </div>
                        <div class='dialogFromRight' style='width:45%;float:right'>
                              <el-form :model="SNscanForm">
                                    <el-form-item label="商品条码">
                                        <el-input ref='SNscanInput'  v-model="SNscanForm.SNCode" :disabled='true'></el-input>
                                    </el-form-item>
                                    <el-form-item label="整零转换">
                                        <el-input ref='SNscanInput'  v-model="SNscanForm.SNCode" :disabled='true'></el-input>
                                    </el-form-item>
                                    <el-form-item label="商品名称">
                                        <el-input type='textarea' ref='SNscanInput'  v-model="SNscanForm.SNCode" :disabled='true'></el-input>
                                    </el-form-item>
                                </el-form>
                        </div>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogSNscanFormVisible = false">取 消</el-button>
                            <el-button type="primary" >确 定</el-button>
                        </div>
                    </el-dialog>
                    <!--SN扫码弹窗 end-->
        <!-- 完成质检弹框 start-->
        <div class="temporary-location">
            <el-dialog title="质检完成容器" :visible.sync="dialogSetGoodsPosition">
                <el-form :model="goodspositionForm">
                    <el-form-item label='是否确认完成该容器，进行下一步操作？'></el-form-item>
                    <el-form-item label="销货上架暂存货位">
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
        <!-- 完成质检弹框 end-->
        <!-- 差异弹框 start-->
        <div class="different-location">
            <el-dialog title="质检差异提示" :visible.sync="differentDialog" class='differentBox'>
                 <p>当前退销单存在未质检完成的商品，是否继续差异完成？</p>
                 <el-table
                  :data="differentTable"
                  border
                  highlight-current-row
                 >
                    <el-table-column type='index' label="序号" width="70"></el-table-column>
                    <el-table-column prop="saleReturnNo" label="销退单号" width="150"></el-table-column>
                    <el-table-column prop="saleOrderNo" label="原订单号" width="150"></el-table-column>
                    <el-table-column prop="unit" label="出库单号" width="150"></el-table-column>
                    <el-table-column prop="goodsBarcode" label="商品条码" width="150"></el-table-column>
                    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                    <el-table-column prop="unitConvertText" label="整零转换" width="150"></el-table-column>
                    <el-table-column prop="differentQty" label="差异数量">
                        <template slot-scope="scope">
                            <b>{{scope.row.differentQty}}</b>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="differentDialog=false">取 消</el-button>
                    <el-button type="primary" @click="differentSuer">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 差异弹框 end-->
        <!--
        	描述：暂存货位
        -->
        <div>
            <el-dialog title="选择暂存货位" :visible.sync="positionIdDialog">
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
                    <el-button @click="positionIdDialog=false">取 消</el-button>
                    <el-button type="primary" @click='completeContainerEvent'>确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!--暂存货位 end-->
                  </div>
                </div>
            </div>
        </div>
   </el-form>
 </div>
</template>
<script>
// XTRYD000004 RONGQI004  goodsBarcode:437044870000102
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import handlerMixins from '@Wms/mixins/tabHandlerMixin.js'
    import utilFn from '@Wms/utils/utilFns'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'
    let _this = null
    let api = {
        getPOSList: '/wms-base-server/pos/getList', // 获取pos台列表
        getCheckorderinfo:'wms-inbound-server/salereturnquality/checkorderinfo' ,// 根据订单信息获取销退单
        getCheckuserinfo :'wms-inbound-server/salereturnquality/checkuserinfo',//根据用户信息获取销退单
        getContainerStatus: 'wms-inbound-server/salereturnquality/checkcontainercode', // 通过扫入的容器条码，判断容器占用状态，生成存盘状态收货作业
        getChecksn:'wms-inbound-server/salereturnquality/checksn',//校验sn码
        completeContainer: 'wms-inbound-server/saleReturnBatchOrder/finish', // 完成容器
        getfinishqualitycontrol:'wms-inbound-server/salereturnquality/finishqualitycontrol',//完成质检
    }
    export default {
         mixins: [oneLevelTabMixins,twoLevelTabMixins,handlerMixins],
         data(){
            return {
                tag:'wms_salesQualityTesting',
                system:'/wms',
                titleName:'销退质检',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                },
                isCache: true,
                totalCount:0,// 质检总数量
                appointment:false,// 销退单弹出框
                postCode: '', // 当前pos台
                PCReceivForm: {}, // 收货表单数据
                inputOrderInfo:'', //销退单号
                inputUserInfo:'',// 客户联系人
                inputeOwnerName:'', // 货主
                goodsProperty: 0, // 是否正品，0正品，1次品
                currStatusPannel: false, // 当前状态数据展示面板
                checkorderinfo: {}, // 销退单
                checkorderinfoChild:[],//退销单详情
                checkorderinfoChildList:[], // 退销单明细
                curRow:{}, // 当行数据
                opterateStatusShow: false, // 操作提示框显示隐藏
                goodBarCode: '', // 商品条码
                goodInput: '', // 商品条码输入框
                receivingWorkId: '', // 扫码容器作业id
                isSingle: false, // 是否单件扫描
                notifyDetailPannel:false, // 退销单详情信息
                notifyDetail: {}, // 通知单明细
                goodsInfoDetail: {}, // 只有商品详细信息
                goodsInfo: {}, // 扫码获取的商品整体信息包括是不是新品啊，是不是sn啊这些。
                goodsDetail:{},// 存储扫码商品的详细信息
                goodsDetailList: [], // 存储扫码商品的详细信息列表，在下边任务列表显示
                isEditProductDate: true, // 生产日期是不是主要管理的，需要则可编辑，不需要则不可编辑
                customQty : 0, // 输入的检查数量
                containerNo: '', // 容器编号
                containerInfo: {}, // 扫码容器信息
                goodBarCode: '', // 商品条码
                selectionDetailLabelNo: '-',
                detailInfoPannel: false, // 扫码明细部分数据展示面板
                getGoodBarCode:'',// 获取数组中每个对象的商品条码
                count:'',
                SNscanForm: {}, // SN扫码弹窗
                dialogSNscanFormVisible: false, // SN码扫码弹窗显隐标记
                deleteDetail:{},//删除信息详情
                goodsDeleteDialog:false,// 删除商品弹框
                keyBordArr: {}, // 存储设置过的快捷键
                positionIdDialog:false,// 销退上架暂存货位弹框
                goodspositions: [{
                    'goodspositionCode':'Z-007',
                    'id':0
                },
                {
                    'goodspositionCode':'Z-008',
                    'id':1
                },
                {
                    'goodspositionCode':'Z-009',
                    'id':2
                }], // 暂存位数据。
                goodspositionId:'',
                goodspositionId: '', // 暂存货位
                completeContainerDataModel: { // 完成容器需要的数据结构，用来过滤提交数据。
                    "createUser": 999,
                    "hasCommit": 0,
                    "ownerId": 0,
                    "posPlatformId": 987,
                    "saleReturnOrderDto": {
                        "id": "6",
                        "saleReturnNo": "XTRYD000002",
                        "orderType": 1,
                        "orderSource": 1,
                        "salesPlatform": 1,
                        "status": 200,
                        "createUser": 999,
                        "createUserName": "小王",
                        "createTime": 1504252040845,
                        "updateUser": 999,
                        "updateUserName": "小王",
                        "updateTime": 1504252040845,
                        "warehouseCompanyId": 89,
                        "warehouseCompanyName": "仓储供应商1",
                        "warehouseId": 400000022,
                        "warehouseName": "仓库1",
                        "warehouseCode": "2332",
                        "ownerId": 0,
                        "ownerName": "货主1",
                        "sourceOrderId": 1,
                        "sourceOrderNo": "SO0001",
                        "sourceOrderType": 1,
                        "saleOrderId": 1,
                        "saleOrderNo": "SALEORDER0002",
                        "outBoundOrderId": 1,
                        "outBoundOrderNo": "89791",
                        "customerId": 89,
                        "customerName": "客户1",
                        "customerContacter": "空间看了",
                        "customerContactInfo": "两块计量计量",
                        "customerAddrId": 89,
                        "returnPersonId": 89,
                        "returnPersonName": "小红",
                        "returnContactInfo": "看就看黑科技",
                        "pickupPersonId": 89,
                        "pickupPersonName": "小刘",
                        "pickupContactInfo": "会计考核合格",
                        "pickupFinishTime": 1504252040845,
                        "waybillNo": "YDBH12322",
                        "deliveryCompanyId": 1,
                        "deliveryCompanyName": "接口删掉返回",
                        "driver": "结核杆菌",
                        "driverContactInfo": "康骏会馆",
                        "carNo": "9892",
                        "receiverId": 98,
                        "receiverName": "小子",
                        "receiverContactInfo": "看见好看就好",
                        "unloaderType": 1,
                        "unloaderMan": "897",
                        "unloadStartTime": 1504252040845,
                        "unloadEndTime": 1504252040845,
                        "tempGoodsPositionId": 234,
                        "tempGoodsPositionCode": "LSHW1",
                        "auditor": 23,
                        "auditTime": 1504252040845,
                        "returnRemark": "快乐就好水电费返回",
                        "customRemark": "科技时代恢复良好",
                        "financialRemark": "立刻就会看见好看就好",
                        "pickupRemark": "返回给已抑郁",
                        "receiveRemark": "和下坡ICvp欧尼",
                        "varietyQty": 3,
                        "planQty": 8,
                        "actualQty": 8,
                        "posPlatformId": "987",
                        "qualityControlPerson": "98",
                        "qualityControlPersonName": "小花",
                        "qualityControlStartTime": 1504252040845,
                        "qualityControlEndTime": 1504252040845,
                        "isDelete": 0,
                        "outOfSaleAllowReceiveSale": 0,
                        "detailList": [{
                                "id": "6",
                                "saleReturnId": "6",
                                "saleReturnNo": "XTRYD000002",
                                "status": 100,
                                "createUser": "89",
                                "createUserName": "小花",
                                "createTime": 1504252040845,
                                "updateUser": "89",
                                "updateUserName": "小花",
                                "updateTime": 1504252040845,
                                "warehouseCompanyId": "89",
                                "warehouseCompanyName": "仓储服务商1",
                                "warehouseId": "400000022",
                                "warehouseName": "客家话",
                                "warehouseCode": "2332",
                                "ownerId": "0",
                                "ownerName": "偶偶",
                                "sourceOrderId": "1",
                                "sourceOrderNo": "SO0001",
                                "sourceOrderType": 1,
                                "unitId": "7",
                                "unitConvert": 1,
                                "unitConvertText": "客户",
                                "goodsId": "57",
                                "goodsName": "客家话3",
                                "goodsBarcode": "12345673",
                                "orderQty": 1,
                                "pickupQty": 1,
                                "receiveQty": 1,
                                "reason": "会根据韩国",
                                "isDelete": 0,
                                "productDate": 20170904,
                                "expireDate": 20170924,
                                "productBatchId": "788",
                                "productBatchNo": "21312"
                            },],
                            "hasCommit": null
                        },
                        "saleReturnBatchOrderBadDto": {
                            "id": 320040,
                            "batchNo": "XTPC170908000028",
                            "containerCode": "RONGQI001",
                            "containerId": 6,
                            "createTime": 0,
                            "createUser": 999,
                            "createUserName": "string",
                            "detailList": [
                                {
                                    "badType": 1,
                                    "createTime": 0,
                                    "createUser": 999,
                                    "createUserName": "string",
                                    "expireDate": "2017-09-07T01:56:54.291Z",
                                    "goodsBarcode": "12345671",
                                    "goodsId": 55,
                                    "goodsName": "客家话1",
                                    "isDelete": 0,
                                    "ownerId": 0,
                                    "ownerName": "偶偶",
                                    "packSpec": "string",
                                    "productBatchId": 788,
                                    "productBatchNo": "21312",
                                    "productDate": "2017-09-07T01:56:54.291Z",
                                    "putawayQty": 0,
                                    "qcQty": 1,
                                    "qcTime": 0,
                                    "qcUser": 666,
                                    "qcUserName": "string",
                                    "saleOrderId": 0,
                                    "saleOrderNo": "string",
                                    "saleReturnId": 6,
                                    "saleReturnNo": "XTRYD000002",
                                    "seqNo": 0,
                                    "shelflife": 0,
                                    "sourceOrderId": 6,
                                    "sourceOrderNo": "XTRYD000002",
                                    "sourceOrderType": 0,
                                    "sourceOrderTypeDesc": "string",
                                    "status": 0,
                                    "statusDesc": "string",
                                    "unitConvert": 0,
                                    "unitConvertDesc": "string",
                                    "unitId": 3,
                                    "unitName": "string",
                                    "updateTime": 0,
                                    "updateUser": 666,
                                    "updateUserName": "string",
                                    "warehouseCode": "2332",
                                    "warehouseCompanyId": 0,
                                    "warehouseCompanyName": "客家话",
                                    "warehouseId": 400000022,
                                    "warehouseName": "string"
                                }
                            ],
                            "goodBad": 1,
                            "isDelete": 0,
                            "ownerId": 0,
                            "ownerName": "string",
                            "posPlatformId": 0,
                            "putawayEndTime": 0,
                            "putawayQty": 0,
                            "putawayStartTime": 0,
                            "putawayUser": 0,
                            "putawayUserName": "string",
                            "qcEndTime": 0,
                            "qcQty": 1,
                            "qcStartTime": 0,
                            "qcUser": 666,
                            "qcUserName": "string",
                            "sourceOrderId": 6,
                            "sourceOrderNo": "XTRYD000002",
                            "sourceOrderType": 0,
                            "sourceOrderTypeDesc": "string",
                            "status": 0,
                            "statusDesc": "string",
                            "tempPositionCode": "string",
                            "tempPositionId": 0,
                            "updateTime": 0,
                            "updateUser": 0,
                            "updateUserName": "string",
                            "varietyQty": 1,
                            "warehouseCode": "2332",
                            "warehouseCompanyId": 0,
                            "warehouseCompanyName": "string",
                            "warehouseId": 400000022,
                            "warehouseName": "客家话"
                        },
                        "saleReturnBatchOrderGoodDto": {
                            "id": 320039,
                            "batchNo": "XTPC170908000028",
                            "containerCode": "RONGQI002",
                            "containerId": 7,
                            "createTime": 0,
                            "createUser": 999,
                            "createUserName": "string",
                            "detailList": [
                                {
                                    "badType": 0,
                                    "createTime": 0,
                                    "createUser": 999,
                                    "createUserName": "string",
                                    "expireDate": "2017-09-07T01:56:54.291Z",
                                    "goodsBarcode": "12345672",
                                    "goodsId": 56,
                                    "goodsName": "客家话2",
                                    "isDelete": 0,
                                    "ownerId": 0,
                                    "ownerName": "偶偶",
                                    "packSpec": "string",
                                    "productBatchId": 788,
                                    "productBatchNo": "21312",
                                    "productDate": "2017-09-07T01:56:54.291Z",
                                    "putawayQty": 0,
                                    "qcQty": 2,
                                    "qcTime": 0,
                                    "qcUser": 666,
                                    "qcUserName": "string",
                                    "saleOrderId": 0,
                                    "saleOrderNo": "string",
                                    "saleReturnId": 6,
                                    "saleReturnNo": "XTRYD000002",
                                    "seqNo": 0,
                                    "shelflife": 0,
                                    "sourceOrderId": 6,
                                    "sourceOrderNo": "XTRYD000002",
                                    "sourceOrderType": 0,
                                    "sourceOrderTypeDesc": "string",
                                    "status": 0,
                                    "statusDesc": "string",
                                    "unitConvert": 0,
                                    "unitConvertDesc": "string",
                                    "unitId": 4,
                                    "unitName": "string",
                                    "updateTime": 0,
                                    "updateUser": 666,
                                    "updateUserName": "string",
                                    "warehouseCode": "2332",
                                    "warehouseCompanyId": 0,
                                    "warehouseCompanyName": "客家话",
                                    "warehouseId": 400000022,
                                    "warehouseName": "string"
                                },
                                {
                                    "badType": 0,
                                    "createTime": 0,
                                    "createUser": 999,
                                    "createUserName": "string",
                                    "expireDate": "2017-09-07T01:56:54.291Z",
                                    "goodsBarcode": "12345673",
                                    "goodsId": 57,
                                    "goodsName": "客家话3",
                                    "isDelete": 0,
                                    "ownerId": 0,
                                    "ownerName": "偶偶",
                                    "packSpec": "string",
                                    "productBatchId": 788,
                                    "productBatchNo": "21312",
                                    "productDate": "2017-09-07T01:56:54.291Z",
                                    "putawayQty": 0,
                                    "qcQty": 1,
                                    "qcTime": 0,
                                    "qcUser": 666,
                                    "qcUserName": "string",
                                    "saleOrderId": 0,
                                    "saleOrderNo": "string",
                                    "saleReturnId": 6,
                                    "saleReturnNo": "XTRYD000002",
                                    "seqNo": 0,
                                    "shelflife": 0,
                                    "sourceOrderId": 6,
                                    "sourceOrderNo": "XTRYD000002",
                                    "sourceOrderType": 0,
                                    "sourceOrderTypeDesc": "string",
                                    "status": 0,
                                    "statusDesc": "string",
                                    "unitConvert": 0,
                                    "unitConvertDesc": "string",
                                    "unitId": 7,
                                    "unitName": "string",
                                    "updateTime": 0,
                                    "updateUser": 666,
                                    "updateUserName": "string",
                                    "warehouseCode": "2332",
                                    "warehouseCompanyId": 0,
                                    "warehouseCompanyName": "客家话",
                                    "warehouseId": 400000022,
                                    "warehouseName": "string"
                                }
                            ],
                            "goodBad": 0,
                            "isDelete": 0,
                            "ownerId": 0,
                            "ownerName": "string",
                            "posPlatformId": 0,
                            "putawayEndTime": 0,
                            "putawayQty": 0,
                            "putawayStartTime": 0,
                            "putawayUser": 0,
                            "putawayUserName": "string",
                            "qcEndTime": 0,
                            "qcQty": 2,
                            "qcStartTime": 0,
                            "qcUser": 666,
                            "qcUserName": "string",
                            "sourceOrderId": 6,
                            "sourceOrderNo": "XTRYD000002",
                            "sourceOrderType": 0,
                            "sourceOrderTypeDesc": "string",
                            "status": 0,
                            "statusDesc": "string",
                            "tempPositionCode": "string",
                            "tempPositionId": 0,
                            "updateTime": 0,
                            "updateUser": 0,
                            "updateUserName": "string",
                            "varietyQty": 1,
                            "warehouseCode": "2332",
                            "warehouseCompanyId": 0,
                            "warehouseCompanyName": "string",
                            "warehouseId": 400000022,
                            "warehouseName": "客家话"
                        }
                    },
                completeContainerData:{
                    "createUser": 999,
                    "hasCommit": 0,
                    "ownerId": 0,
                    "posPlatformId": 987,
                    "saleReturnOrderDto": {
                        "id": "6",
                        "saleReturnNo": "XTRYD000002",
                        "orderType": 1,
                        "orderSource": 1,
                        "salesPlatform": 1,
                        "status": 200,
                        "createUser": 999,
                        "createUserName": "小王",
                        "createTime": 1504252040845,
                        "updateUser": 999,
                        "updateUserName": "小王",
                        "updateTime": 1504252040845,
                        "warehouseCompanyId": 89,
                        "warehouseCompanyName": "仓储供应商1",
                        "warehouseId": 400000022,
                        "warehouseName": "仓库1",
                        "warehouseCode": "2332",
                        "ownerId": 0,
                        "ownerName": "货主1",
                        "sourceOrderId": 1,
                        "sourceOrderNo": "SO0001",
                        "sourceOrderType": 1,
                        "saleOrderId": 1,
                        "saleOrderNo": "SALEORDER0002",
                        "outBoundOrderId": 1,
                        "outBoundOrderNo": "89791",
                        "customerId": 89,
                        "customerName": "客户1",
                        "customerContacter": "空间看了",
                        "customerContactInfo": "两块计量计量",
                        "customerAddrId": 89,
                        "returnPersonId": 89,
                        "returnPersonName": "小红",
                        "returnContactInfo": "看就看黑科技",
                        "pickupPersonId": 89,
                        "pickupPersonName": "小刘",
                        "pickupContactInfo": "会计考核合格",
                        "pickupFinishTime": 1504252040845,
                        "waybillNo": "YDBH12322",
                        "deliveryCompanyId": 1,
                        "deliveryCompanyName": "接口删掉返回",
                        "driver": "结核杆菌",
                        "driverContactInfo": "康骏会馆",
                        "carNo": "9892",
                        "receiverId": 98,
                        "receiverName": "小子",
                        "receiverContactInfo": "看见好看就好",
                        "unloaderType": 1,
                        "unloaderMan": "897",
                        "unloadStartTime": 1504252040845,
                        "unloadEndTime": 1504252040845,
                        "tempGoodsPositionId": 234,
                        "tempGoodsPositionCode": "LSHW1",
                        "auditor": 23,
                        "auditTime": 1504252040845,
                        "returnRemark": "快乐就好水电费返回",
                        "customRemark": "科技时代恢复良好",
                        "financialRemark": "立刻就会看见好看就好",
                        "pickupRemark": "返回给已抑郁",
                        "receiveRemark": "和下坡ICvp欧尼",
                        "varietyQty": 3,
                        "planQty": 8,
                        "actualQty": 8,
                        "posPlatformId": "987",
                        "qualityControlPerson": "98",
                        "qualityControlPersonName": "小花",
                        "qualityControlStartTime": 1504252040845,
                        "qualityControlEndTime": 1504252040845,
                        "isDelete": 0,
                        "outOfSaleAllowReceiveSale": 0,
                        "detailList": [],
                        "hasCommit": null
                        },
                        "saleReturnBatchOrderBadDto": {
                            "id": 320040,
                            "batchNo": "XTPC170908000028",
                            "containerCode": "RONGQI001",
                            "containerId": 6,
                            "createTime": 0,
                            "createUser": 999,
                            "createUserName": "string",
                            "detailList": [],
                            "goodBad": 1,
                            "isDelete": 0,
                            "ownerId": 0,
                            "ownerName": "string",
                            "posPlatformId": 0,
                            "putawayEndTime": 0,
                            "putawayQty": 0,
                            "putawayStartTime": 0,
                            "putawayUser": 0,
                            "putawayUserName": "string",
                            "qcEndTime": 0,
                            "qcQty": 1,
                            "qcStartTime": 0,
                            "qcUser": 666,
                            "qcUserName": "string",
                            "sourceOrderId": 6,
                            "sourceOrderNo": "XTRYD000002",
                            "sourceOrderType": 0,
                            "sourceOrderTypeDesc": "string",
                            "status": 0,
                            "statusDesc": "string",
                            "tempPositionCode": "string",
                            "tempPositionId": 0,
                            "updateTime": 0,
                            "updateUser": 0,
                            "updateUserName": "string",
                            "varietyQty": 1,
                            "warehouseCode": "2332",
                            "warehouseCompanyId": 0,
                            "warehouseCompanyName": "string",
                            "warehouseId": 400000022,
                            "warehouseName": "客家话"
                        },
                        "saleReturnBatchOrderGoodDto": {
                            "id": 320039,
                            "batchNo": "XTPC170908000028",
                            "containerCode": "RONGQI002",
                            "containerId": 7,
                            "createTime": 0,
                            "createUser": 999,
                            "createUserName": "string",
                            "detailList": [],
                            "goodBad": 0,
                            "isDelete": 0,
                            "ownerId": 0,
                            "ownerName": "string",
                            "posPlatformId": 0,
                            "putawayEndTime": 0,
                            "putawayQty": 0,
                            "putawayStartTime": 0,
                            "putawayUser": 0,
                            "putawayUserName": "string",
                            "qcEndTime": 0,
                            "qcQty": 2,
                            "qcStartTime": 0,
                            "qcUser": 666,
                            "qcUserName": "string",
                            "sourceOrderId": 6,
                            "sourceOrderNo": "XTRYD000002",
                            "sourceOrderType": 0,
                            "sourceOrderTypeDesc": "string",
                            "status": 0,
                            "statusDesc": "string",
                            "tempPositionCode": "string",
                            "tempPositionId": 0,
                            "updateTime": 0,
                            "updateUser": 0,
                            "updateUserName": "string",
                            "varietyQty": 1,
                            "warehouseCode": "2332",
                            "warehouseCompanyId": 0,
                            "warehouseCompanyName": "string",
                            "warehouseId": 400000022,
                            "warehouseName": "客家话"
                        }
                },
                differentDialog:false,//质检差异弹框
                differentTable:[],//质检差异列表
                operateTip: {
                    title: '成功',
                    tip: '失败',
                    dClass: 'success',
                }, // 操作提示框显示数据
                poslist: [{
                    posCode: '选项1',
                    posName: '黄金糕'
                }, {
                    posCode: '选项2',
                    posName: '双皮奶'
                }],
            }
        },
        methods:{
            // 单击弹框行数据
            ...pageOperate,
			rowClick(row, event, column) {
		        let _this = this
                console.log("row %o, event %o, column %o", row, event, column)
                _this.curRow = row
                if (_this.appointment == true) {
                    _this.checkorderinfoChildList = [row]
                    _this.inputOrderInfo = row.saleReturnNo
                    _this.inputeOwnerName = row.ownerName
                    return
                }
                _this.deleteDetail = _this.curRow
                console.log(_this.deleteDetail)
		        // //获取明细列表
		        // _this.getDetailList(row.id)
            },
               // 快捷键设置
            keyboardShortcuts(){
                const _this = this
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
                const _this = this
                let kb = _this.keyboardShortcuts()
                // 完成质检
                kb.addShortcuts("f3", _this.selectQualityTesting)
                // 完成容器
                kb.addShortcuts("f4", _this.selectGoodsPosition)
            },
            // 选择暂存货位
			selectGoodsPosition(){
                const _this = this
                _this.positionIdDialog = true
            },
             
            // 完成容器
            completeContainerEvent(){
                const _this = this
                _this.positionIdDialog = false
                let params = {}
                if (_this.goodsProperty == '0') {//正品
                   params = _this.completeContainerData.saleReturnBatchOrderGoodDto
                } else {
                   params = _this.completeContainerData.saleReturnBatchOrderBadDto
                }
                params.tempPositionId = _this.goodspositionId
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
                        if (_this.goodsProperty == '0') {//正品
                            _this.completeContainerData.saleReturnBatchOrderGoodDto = {}
                        } else {
                            _this.completeContainerData.saleReturnBatchOrderBadDto = {}
                        }
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
            // 完成质检
            selectQualityTesting () {
                  const _this = this
                   _this.completeContainerData.saleReturnOrderDto['detailList'] = _this.goodsDetailList
                  //  判断正残品，push到正、残容器中
                  _this.isGoodsProperty()
                  _this.getQuaityTestingDate()
            },
            // 请求数据
            getQuaityTestingDate () {
                const _this = this
                let param = _this.utilFn.stealDataFormOrigin(_this.completeContainerDataModel, _this.completeContainerData)
                _this.$request({
                    url:api.getfinishqualitycontrol,
                    context:_this, //this
                    sendData:param,
                    successCallback:(_this,response)=>{
	                	if(response.retCode == 2){
	                		_this.tip({
		                        title: '报错提示',
		                        tip: response.retMsg,
		                    })
	                		return
                        }
                        if (response.saleReturnQualityControlDifferentDto.detailList.length > 0 ) {
                            _this.differentDialog = true
                            _this.differentTable = response.saleReturnQualityControlDifferentDto.detailList
                            _this.completeContainerData.hasCommit = response.hasCommit
                            return
                        }

	                	_this.tip({
	                        title: '操作成功提示',
	                        tip: '完成质检成功！',
                        })
                         _this.completeContainerData.saleReturnOrderDto = {}
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
            // 差异弹框确认
            differentSuer() {
                const _this = this
                _this.differentDialog = false
                _this.getQuaityTestingDate()
            },
            // 获取标记输入元素
            getInput(el){
                return el.$el.tagName.toLowerCase() == 'input' ? el : el.$el.querySelector('input')
            },
            // 初始化操作，模拟扫码动作等
            initOperate(){
                const _this = this
                _this.InputOrderInfo = _this.getInput(_this.$refs.InputOrderInfo) // 退销单号
                _this.InputUserInfo = _this.getInput(_this.$refs.InputUserInfo) // 用户信息
                _this.coNoInput = _this.getInput(_this.$refs.containerNoInput) // 容器号
                _this.goodInput = _this.getInput(_this.$refs.goodBarCodeInput)//商品条码
                _this.InputCount =  _this.getInput(_this.$refs.countInput)//商品扫描数量

                // 监听获取销退单号，然后去获取销退单信息
                _this.InputOrderInfo.addEventListener("keydown", (e) => {
                    if (!_this.InputOrderInfo.value) {
                        return
                    }

                    if (e.keyCode == '13'){
                        _this.getCheckorderinfo(_this.InputOrderInfo.value)
                    }
                })

                // 监听用户信息输入数据
                _this.InputUserInfo.addEventListener("keydown", (e) => {
                    // test
                    if (!_this.InputUserInfo.value) {
                        return
                    }
                    if (e.keyCode == '13') {
                        _this.getCheckuserinfo(_this.InputUserInfo.value)
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
                            "containerCode": _this.coNoInput.value,
                            "createUser": 999,
                            "hasCommit": 0,
                            "ownerId": 0,
                            "posPlatformId":987,
                            "warehouseId": 2000
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

                        // _this.setProDate(e)
                        // _this.setGoodsNum()
                    }
                })
                // 监听数量
                _this.InputCount.addEventListener("keydown", (e) => {
                    // test
                    if (!_this.InputCount.value) {
                        return
                    }
                    if (e.keyCode == '13') {

                           _this.totalCount = Number(_this.totalCount) + Number(_this.count)
                          if (_this.goodsDetailList.length == 0) {
                              _this.getList()

                          } else {
                              _this.isGoodsExits(_this.goodInput.value) // 判断此商品是否存在列表中
                          }

                       // 通过isShelflife判断商品是否有保质期 2：有保质期 1：无
                        let detail = _this.checkorderinfo.wmsGoodsDtoList[0].wmsGoodsBaseDto
                        if(detail.isShelflife == '2') {
                            _this.isEditProductDate = false
                        }
                        // 判断是否是sn商品 1：不是 2：是
                        if (detail.isSn == '1') {
                            _this.dialogSNscanFormVisible = true
                        }
                    }
                })

                // 获取pos台列表
                _this.getPOSList()
             },
            isGoodsProperty() {
               const _this = this
               _this.goodsDetailList.forEach(function(val,index){
                 if(val.goodBad == 0){//正品
                   _this.completeContainerData.saleReturnBatchOrderGoodDto['detailList'].push(val)
                 } else {
                    _this.completeContainerData.saleReturnBatchOrderBadDto['detailList'].push(val) 
                 }
               })
            },
            // 明细数量
            detailQty() {
                const _this = this
                _this.checkorderinfoChildList.forEach(function(val,index) {
                    _this.goodsDetailList.forEach(function(val2,index2){
                        if (val.goodsBarCode == val2.goodsBarCode) {
                            val.actualQty = val2.receiveQty
                        }
                    })
                })
            },
            //向列表中添加一条数据
            getList () {
                  const _this = this
                  _this.goodsDetail.receiveQty = _this.count // 数量
                  _this.goodsDetail.goodBad = _this.goodsProperty // 正残属性
                  _this.goodsDetail.containerCode = _this.coNoInput.value // 容器号
                  _this.goodsDetailList.push(_this.goodsDetail)
                  _this.detailQty()
            },
            // 判断此商品条码是否存在
            isGoodsExits (goodsBarCode) {
                const _this = this
                for(var j=0,len=_this.goodsDetailList.length;j<len;j++){
                   if (_this.goodsDetailList[j].goodsBarcode == goodsBarCode) {

                        _this.goodsDetailList[j] = Object.assign(_this.goodsDetailList[j], {receiveQty: Number(_this.goodsDetailList[j].receiveQty) + Number(_this.count)})
                        _this.goodsDetailList = _this.goodsDetailList.slice()
                        _this.detailQty()
                        // console.log(_this._this.goodsDetailList)
                        return
                   }
                   _this.getList()
                }
            },
            // 获取pos台列表
            getPOSList(){
                const _this = this
                _this.$request({
                    url:api.getPOSList,
                    context:_this, //this
                    sendData:{},
                    successCallback:(_this,response)=>{
                    	_this.poslist = response
                    }
                 })
            },
            // 根据订单信息获取销退单
            getCheckorderinfo(inputOrderInfo){
                const _this = this
                _this.$request({
                    url:api.getCheckorderinfo,
                    context:_this, //this
                    sendData:{
                        "containerCode": "RONGQI001",
                        "createUser": 999,
                        "hasCommit": 0,
                        "ownerId": 0,
                        "posPlatformId":987,
                        "warehouseId": 2000,
                        "inputOrderInfo":inputOrderInfo,
                        "inputUserInfo": "XTRYD000004"
                    },
                    successCallback:(_this,response)=>{
                        _this.inputUserInfo = response.saleReturnOrderDto.customerName
                        _this.inputeOwnerName = response.saleReturnOrderDto.ownerName
                        _this.all(response,'单号错误!')
                    }
                })
            },
            // 根据用户信息获取销退单
            getCheckuserinfo(inputUserInfo){
                const _this = this
                _this.$request({
                    url:api.getCheckuserinfo,
                    context:_this, //this
                    sendData:{
                        "containerCode": "RONGQI001",
                        "createUser": 999,
                        "hasCommit": 0,
                        "ownerId": 0,
                        "posPlatformId":987,
                        "warehouseId": 2000,
                       "inputUserInfo":inputUserInfo
                    },
                    successCallback:(_this,response)=>{

                        _this.all(response, '用户信息错误!')
                    }
                })
            },
            // 判断是否出现弹框以及设置表单值
            all(response,message) {
                const _this = this
                _this.checkorderinfo = response
                _this.completeContainerData.saleReturnOrderDto = Object.assign({}, _this.completeContainerData.saleReturnOrderDto,_this.checkorderinfo)
                _this.completeContainerData.saleReturnOrderDto.saleReturnOrderDetailDtoList = []
                if (response.saleReturnOrderDto == null && response.saleReturnOrderDtoList == null) {
                    _this.operateTipPannel({
                        title: '失败',
                        tip: message
                    })
                    return
                }
                _this.currStatusPannel = true

                if (response.saleReturnOrderDto == null) {
                    _this.checkorderinfoChild = response.saleReturnOrderDtoList
                    _this.appointment = true
                    _this.getGoodsBarcodeList()
                    return
                }
                this.setFocusToEl(_this.InputCount)
                _this.checkorderinfoChild = response.saleReturnOrderDto
                _this.checkorderinfoChildList = _this.checkorderinfoChild.detailList
                _this.appointment = false
                _this.operateTipPannel({
                    title: '成功',
                    tip: message
                })
                _this.getGoodsBarcodeList()
            },
            // 扫容器条码获取容器状态，
            getContainerStatus(param){
                const _this = this
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
           // 设置元素获得焦点
            setFocusToEl(el, callback){
                if (!!el) {
                    setTimeout(() => {
                        el.focus()
                        !!callback && callback()
                    }, 100)
                }
            },
            // 逐件扫描
            eachTest(goodsBarCode) {
                const _this = this
                 _this.totalCount = Number(_this.totalCount) + 1
                if (_this.goodsDetailList.length == 0) {
                      _this.getList()

                    return
                }
                // _this.isGoodsExits()
               for(var j=0,len=_this.goodsDetailList.length;j<len;j++){
                //   console.log(_this.goodsDetailList[j])
                   if (_this.goodsDetailList[j].goodsBarcode == goodsBarCode) {
                        _this.goodsDetailList[j] = Object.assign(_this.goodsDetailList[j], {receiveQty: Number(_this.goodsDetailList[j].receiveQty) + 1})
                        _this.goodsDetailList = _this.goodsDetailList.slice()
                        _this.detailQty()
                        return
                   }else {
                        _this.getList()
                   }
                   _this.goodsDetailList = _this.goodsDetailList.slice()
                   _this.totalCount = Number(_this.totalCount) + 1
               }
            },
           /**
             * 根据商品条码获取商品信息 
             */
            getGoodsInfo(param){
                const _this = this
                for(var i=0,len=_this.getGoodBarCode.length;i<len;i++){
                    if( _this.getGoodBarCode[i] == param.goodsBarCode ) {
                        _this.goodsDetail = _this.checkorderinfoChildList[i]
                        this.setFocusToEl(_this.InputCount)
                        if (_this.isSingle == true) {
                            _this.eachTest(param.goodsBarCode)
                        }
                        return
                    }
                    if (i == _this.getGoodBarCode.length-1) {
                        _this.tip({
	                        tip: '当前商品条码在当前销退单中不存在',
	                        title: '提示',
	                        callback: () => {
	                            // 容器扫码获取焦点，方便操作
	                            _this.setFocusToEl(_this.goodInput)
	                        }
	                    })
                    }
                }

            },
            // 校验容器号
            getCheckcontainercode(containerCode){
                const _this = this
                _this.$request({
                    url:api.getCheckcontainercode,
                    context:_this, //this
                    sendData:{},
                    successCallback:(_this,response)=>{
                        console.log(response)
                    }
                })
            },
             // 获取数据中GoodsBarcode列表
            getGoodsBarcodeList() {
                const _this = this
                _this.getGoodBarCode = _this.utilFn.getFieldArrFormObjectArr(_this.checkorderinfoChildList,'goodsBarcode')
            },
            // 操作提示，大框醒目提示
            operateTipPannel(org){
                const _this = this
                _this.operateTip.title = org.title || '成功'
                _this.operateTip.tip = org.tip || '失败'
                _this.operateTip.dClass = org.dClass || 'success' // 整体的颜色设置class
                _this.opterateStatusShow = true

                // 显示完，三秒后隐藏
                setTimeout(() => {
                    _this.opterateStatusShow = false
                }, 3000)
            },
            /**
             *统一提示
             */
            tip(param){
                const _this = this
                _this.$alert(param.tip, param.title, {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (action == 'confirm') {
                            !!param.callback && param.callback()
                        }
                    }
                })
            },
            // 弹框取消
            cancel() {
                const _this = this
                _this.appointment=false
                _this.checkorderinfo = {}
            },
            sure(){
                 const _this = this
                _this.appointment=false
                _this.operateTipPannel({
                    title: '成功',
                    tip: '查询单号成功!'
                })
            }
        },
        computed: {
            totalMainUnit(){
                return this.goodsInfoDetail.totalQty = this.customQty * (this.goodsInfoDetail.unitConvert || 1)
            }
        },
        watch:{
            isSingle(val,oldVal) {
               if(val == true) {
                   this.count = 1
                   this.InputCount.disabled = true
                   return
               }
               this.count = ''
               this.InputCount.disabled = false
            }
        },
        beforeDestroy(){
            this.keyBordArr = {}
        },
        created(){
            let _this = this
            _this.utilFn = utilFn
        },
        mounted () {
            const _this = this

            _this.initOperate()
            _this.addShortcuts()

        }

    }
</script>
<style scoped lang='scss' type="text/scss">
 /*第一部   start*/
 .group {

    padding-bottom: 16px;
    .group-p {
        position: relative;
        display:inline-block;
        div{
            display:inline-block;
        }
        p{
            margin:5px 7px;
        }
        .pos{
            position:relative;
        }
        .iconfont{
            position: absolute;
            right:140px;
            top:35px;
        }
        .odd {
             width: 340px;
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
         .group-s {
            width: 220px;
        }
}
.group-border{
    border-bottom:1px dashed #ccc;
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
            .group-p{
                display:inline-block;
            }
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
            .group {
                border: none;
                .group-p {
                    padding-bottom: 7px;
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
                border: 1px solid #ccc;
                border-bottom: none;
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
                background: #F5F5F5;
                span {
                    color: #000;
                    margin-left:30px;
                }
                span:first-child{
                    color:#28a7e1;
                    margin-left:0px;
                }
                a{
                    position: absolute;
                    right:30px;
                    color:#ccc;
                }
            }
        }

/*内容  end*/
    /*右侧成功失败提示框	start*/
    .promptbox-succeed {
        width: 220px;
        height: 140px;
        border:1px solid #ccc;
        box-shadow:0 0 10px #333;
        position: absolute;
        top: 120px;
        right:-1px;
        background: #fff;
        opacity: .6;
        color: #05c728;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
        h2 {
            font-size: 40px;
            text-align: center;
            line-height: 120px;
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
        top: 0px;
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

</style>
