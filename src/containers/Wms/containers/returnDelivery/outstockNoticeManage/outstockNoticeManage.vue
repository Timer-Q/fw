<template>
    <div class="wms-items" v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="planTakeaway" :disabled="buttonDisable.planTakeaway">计划下架</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="fastOutbound" :disabled="buttonDisable.fastOutbound">快速出库</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="sendConfirm" :disabled="buttonDisable.sendCOnfirm">发出确认</el-button>
                </div>
                <div class="btnGroup">
                    <el-button :disabled="buttonDisable.print">打印（交接清单）</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="printerSetup=true" :disabled="buttonDisable.printSet">打印机设置</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="refresh" :disabled="buttonDisable.refurbish">刷新</el-button>
                </div>
                <div class="btnGroup">
                    <el-button :disabled="buttonDisable.log">日志</el-button>
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
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                  查询方案<i class="iconfont icon-fangan"></i>
                                </span>
                                <!--查询方案下拉开始-->
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
                                <!--查询方案下拉结束-->
                            </el-dropdown>
                        </div>
                        <div class="vehicle-data">
                            <div class="inblock">
                                <span class="hspace">创建时间</span>
                                <el-date-picker
                                    v-model="times"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择时间范围"
                                    align="right">
                                </el-date-picker>
                                <i class="iconfont icon-riqi"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-input class="license-number" placeholder="请输入货主" v-model="listQueryParam.ownerId"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">供应商</span>
                                <el-input class="license-number" placeholder="请输入供应商" v-model="listQueryParam.supplierId"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">通知单号</span>
                                <el-input class="license-number" placeholder="请输入通知单号" v-model="listQueryParam.outboundNotifyNo"></el-input>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                        </div>
                    </div>
                    <!--表单  start-->
                    <Tabs type="border-card" v-model="tabName" @tab-click="handleTagClick">
                        <TabPane label="全部" name="all">
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table
                                    id="pastCodeTable"
                                    :data="tableData"
                                    ref="pastCodeTable"
                                    @row-click='rowClick'
                                    @selection-change="handleSelectionChange"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="95"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="planOutboundTime" label="计划出库日期"  width="95" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVariety" label="通知品种数"  width="90"></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                                    <TableColumn prop="takeawayQty" label="下架数量" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量" width=""> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="returnTypeDesc" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badTypeDesc" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="distributionWayDesc" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTabDesc" label="快速出库标记" width="95"> </TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="deliveryCompanyName" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="logisticsNumber" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货人电话" width="90"> </TableColumn>
                                    <TableColumn prop="unloaderTypeDesc" label="装卸类型" width=""> </TableColumn>
                                    <TableColumn prop="unloaderManName" label="装卸人员" width=""> </TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="faseOutboundUserName" label="快速出库操作员" width="105"> </TableColumn>
                                    <TableColumn prop="sendConfirmTime" label="发出确认时间" width="95" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="cancelTime" label="取消时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                                    <p>出库通知单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list informationR-list">
                                        <Table
                                            :data="selectionDetailList"
                                            border style="width: 100%"
                                            :default-sort = "{prop: 'date', order: 'descending'}">
                                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="spec" label="规格" width=""></TableColumn>
                                            <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                            <TableColumn prop="notifyMainQty" label="通知主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="takeawayMainQty" label="下架主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="qualityControlMainQty" label="质检主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="sendMainQty" label="发出主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="shelflife" label="保质期天数"  width="90"></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="通知" name="notify">
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table
                                    id="pastCodeTable"
                                    :data="tableData"
                                    ref="pastCodeTable"
                                    @row-click='rowClick'
                                    @selection-change="handleSelectionChange"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="95"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="planOutboundTime" label="计划出库日期"  width="95" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVariety" label="通知品种数"  width="90"></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                                    <TableColumn prop="takeawayQty" label="下架数量" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量" width=""> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="returnTypeDesc" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badTypeDesc" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="distributionWayDesc" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTabDesc" label="快速出库标记" width="95"> </TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="deliveryCompanyName" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="logisticsNumber" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货人电话" width="90"> </TableColumn>
                                    <TableColumn prop="unloaderTypeDesc" label="装卸类型" width=""> </TableColumn>
                                    <TableColumn prop="unloaderManName" label="装卸人员" width=""> </TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="faseOutboundUserName" label="快速出库操作员" width="105"> </TableColumn>
                                    <TableColumn prop="sendConfirmTime" label="发出确认时间" width="95" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="cancelTime" label="取消时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                                    <p>出库通知单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list informationR-list">
                                        <Table
                                            :data="selectionDetailList"
                                            border style="width: 100%"
                                            :default-sort = "{prop: 'date', order: 'descending'}">
                                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="spec" label="规格" width=""></TableColumn>
                                            <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                            <TableColumn prop="notifyMainQty" label="通知主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="takeawayMainQty" label="下架主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="qualityControlMainQty" label="质检主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="sendMainQty" label="发出主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="shelflife" label="保质期天数"  width="90"></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="计划下架" name="planTakeaway">
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table
                                    id="pastCodeTable"
                                    :data="tableData"
                                    ref="pastCodeTable"
                                    @row-click='rowClick'
                                    @selection-change="handleSelectionChange"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="95"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="planOutboundTime" label="计划出库日期"  width="95" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVariety" label="通知品种数"  width="90"></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                                    <TableColumn prop="takeawayQty" label="下架数量" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量" width=""> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="returnTypeDesc" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badTypeDesc" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="distributionWayDesc" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTabDesc" label="快速出库标记" width="95"> </TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="deliveryCompanyName" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="logisticsNumber" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货人电话" width="90"> </TableColumn>
                                    <TableColumn prop="unloaderTypeDesc" label="装卸类型" width=""> </TableColumn>
                                    <TableColumn prop="unloaderManName" label="装卸人员" width=""> </TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="faseOutboundUserName" label="快速出库操作员" width="105"> </TableColumn>
                                    <TableColumn prop="sendConfirmTime" label="发出确认时间" width="95" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="cancelTime" label="取消时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                                    <p>出库通知单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list informationR-list">
                                        <Table
                                            :data="selectionDetailList"
                                            border style="width: 100%"
                                            :default-sort = "{prop: 'date', order: 'descending'}">
                                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="spec" label="规格" width=""></TableColumn>
                                            <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                            <TableColumn prop="notifyMainQty" label="通知主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="takeawayMainQty" label="下架主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="qualityControlMainQty" label="质检主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="sendMainQty" label="发出主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="shelflife" label="保质期天数"  width="90"></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="质检确认" name="qcConfirm">
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table
                                    id="pastCodeTable"
                                    :data="tableData"
                                    ref="pastCodeTable"
                                    @row-click='rowClick'
                                    @selection-change="handleSelectionChange"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="95"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="planOutboundTime" label="计划出库日期"  width="95" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVariety" label="通知品种数"  width="90"></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                                    <TableColumn prop="takeawayQty" label="下架数量" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量" width=""> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="returnTypeDesc" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badTypeDesc" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="distributionWayDesc" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTabDesc" label="快速出库标记" width="95"> </TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="deliveryCompanyName" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="logisticsNumber" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货人电话" width="90"> </TableColumn>
                                    <TableColumn prop="unloaderTypeDesc" label="装卸类型" width=""> </TableColumn>
                                    <TableColumn prop="unloaderManName" label="装卸人员" width=""> </TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="faseOutboundUserName" label="快速出库操作员" width="105"> </TableColumn>
                                    <TableColumn prop="sendConfirmTime" label="发出确认时间" width="95" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="cancelTime" label="取消时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                                    <p>出库通知单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list informationR-list">
                                        <Table
                                            :data="selectionDetailList"
                                            border style="width: 100%"
                                            :default-sort = "{prop: 'date', order: 'descending'}">
                                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="spec" label="规格" width=""></TableColumn>
                                            <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                            <TableColumn prop="notifyMainQty" label="通知主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="takeawayMainQty" label="下架主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="qualityControlMainQty" label="质检主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="sendMainQty" label="发出主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="shelflife" label="保质期天数"  width="90"></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="发出确认" name="sendConfirm">
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table
                                    id="pastCodeTable"
                                    :data="tableData"
                                    ref="pastCodeTable"
                                    @row-click='rowClick'
                                    @selection-change="handleSelectionChange"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="95"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="planOutboundTime" label="计划出库日期"  width="95" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVariety" label="通知品种数"  width="90"></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                                    <TableColumn prop="takeawayQty" label="下架数量" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量" width=""> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="returnTypeDesc" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badTypeDesc" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="distributionWayDesc" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTabDesc" label="快速出库标记" width="95"> </TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="deliveryCompanyName" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="logisticsNumber" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货人电话" width="90"> </TableColumn>
                                    <TableColumn prop="unloaderTypeDesc" label="装卸类型" width=""> </TableColumn>
                                    <TableColumn prop="unloaderManName" label="装卸人员" width=""> </TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="faseOutboundUserName" label="快速出库操作员" width="105"> </TableColumn>
                                    <TableColumn prop="sendConfirmTime" label="发出确认时间" width="95" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="cancelTime" label="取消时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                                    <p>出库通知单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list informationR-list">
                                        <Table
                                            :data="selectionDetailList"
                                            border style="width: 100%"
                                            :default-sort = "{prop: 'date', order: 'descending'}">
                                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="spec" label="规格" width=""></TableColumn>
                                            <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                            <TableColumn prop="notifyMainQty" label="通知主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="takeawayMainQty" label="下架主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="qualityControlMainQty" label="质检主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="sendMainQty" label="发出主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="shelflife" label="保质期天数"  width="90"></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="取消" name="cancel">
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table
                                    id="pastCodeTable"
                                    :data="tableData"
                                    ref="pastCodeTable"
                                    @row-click='rowClick'
                                    @selection-change="handleSelectionChange"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="95"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="planOutboundTime" label="计划出库日期"  width="95" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVariety" label="通知品种数"  width="90"></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""> </TableColumn>
                                    <TableColumn prop="takeawayQty" label="下架数量" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量" width=""> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="returnTypeDesc" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badTypeDesc" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="distributionWayDesc" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTabDesc" label="快速出库标记" width="95"> </TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="deliveryCompanyName" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="logisticsNumber" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNumber" label="提货车牌号" width="90"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货人电话" width="90"> </TableColumn>
                                    <TableColumn prop="unloaderTypeDesc" label="装卸类型" width=""> </TableColumn>
                                    <TableColumn prop="unloaderManName" label="装卸人员" width=""> </TableColumn>
                                    <TableColumn prop="remark" label="备注" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="faseOutboundUserName" label="快速出库操作员" width="105"> </TableColumn>
                                    <TableColumn prop="sendConfirmTime" label="发出确认时间" width="95" :formatter="datetimeFormat"> </TableColumn>
                                    <TableColumn prop="cancelTime" label="取消时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                                    <p>出库通知单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list informationR-list">
                                        <Table
                                            :data="selectionDetailList"
                                            border style="width: 100%"
                                            :default-sort = "{prop: 'date', order: 'descending'}">
                                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="spec" label="规格" width=""></TableColumn>
                                            <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                                            <TableColumn prop="notifyMainQty" label="通知主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="takeawayMainQty" label="下架主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="qualityControlMainQty" label="质检主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="sendMainQty" label="发出主单位数量"  width="105"></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                            <TableColumn prop="shelflife" label="保质期天数"  width="90"></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                    </Tabs>
                    <!--表单  end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->

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

        <!--发出确认弹出层开始-->
        <el-dialog title="发出确认" :visible.sync="isAdded" class="issueConfirmPopup">
            <div class="wms-popup">
                <!--主体内容  start-->
                <div ref="main">
                    <div class="groupL">
                        <div class="inblock">
                            <span class="hspace">物流公司</span>
                            <el-input type="text" v-model="form.deliveryCompanyId" class="license-number"
                                      placeholder="请输入物流公司"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">提货车牌号</span>
                            <el-input type="text" v-model="form.takeGoodsCarNumber" class="license-number"
                                      placeholder="请输入提货车牌号"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">提货人</span>
                            <el-input type="text" v-model="form.takeGoodsMan" class="license-number"
                                      placeholder="请输入提货人"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">提货人电话</span>
                            <el-input type="text" v-model="form.takeGoodsManTel" class="license-number"
                                      placeholder="请输入提货人电话"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">物流运单号</span>
                            <el-input type="text" v-model="form.logisticsNumber" class="license-number"
                                      placeholder="请输入提货人电话"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">配送方式</span>
                            <el-input type="text" v-model="form.distributionWay" class="license-number"
                                      placeholder="请输入配送方式"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">包件总数</span>
                            <el-input type="text" v-model="form.packageQty" class="license-number" readonly="true"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">总质量</span>
                            <el-input type="text" v-model="form.weight" class="license-number" readonly="true"></el-input>kg
                        </div>
                        <div class="inblock">
                            <span class="hspace">装卸类型</span>
                            <el-input type="text" v-model="form.unloaderType" class="license-number"
                                      placeholder="请输入装卸类型"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">装卸人员</span>
                            <el-input type="text" v-model="form.unloaderMan" class="license-number"
                                      placeholder="请输入装卸人员"></el-input>
                        </div>
                        <div class="inblock">
                            <span class="hspace">备注</span>
                            <el-input type="text" v-model="form.remark" class="license-number"
                                      placeholder="请输入备注"></el-input>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button class="cancelButton" @click="isAdded = false">取消</el-button>
                  <el-button class="cancelButton">确认并打印</el-button>
                  <el-button class="confirmButton" @click="doSendConfirm">确认</el-button>
                </span>
            </div>
        </el-dialog>
        <!--发出确认弹出层结束-->
    </div>
</template>
<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/returnDelivery/outstockNoticeManage/outstockNoticeService'

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    let _this = null
    let api = {
        getlist: '/wms-outbound-server/outboundnotify/getListWithPage',//主表单
        getlabelDetailList: '/wms-outbound-server/outboundnotify/get'//子表单
    }
    export default {
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        created(){
            _this = this
            _this.api = api
        },
        data () {
            return {
                //日期查询值
                times:[],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },

                tabName:"all",//页签名称
                tableData: [],//表单数据
                selectionDetailList: [],//子表单
                selectionDetailLabelNo:'-',//子表单单号
                isAdded:false,//发出确认
                printerSetup:false,//打印机设置
                //按钮是否可用
                buttonDisable:{
                    planTakeaway:false,
                    fastOutbound:false,
                    sendCOnfirm:false,
                    print:false,
                    printSet:false,
                    refurbish:false,
                    log:false
                },
                // 获取列表查询条件分页部分,存储各种搜索条件字段。
                listQueryParam:{
                    //pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    //pageSize:10,
                    //pageStart:0 //起始条数（从0开始）
                    startTime:"",
                    endTime:"",
                    ownerId:"",
                    outboundNotifyNo:"",
                    supplierId:""
                },
                // 分页
                pagination:{
                    total:0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },
                components:{
                    pagination
                },
                form: {
                    deliveryCompanyId: '',
                    takeGoodsCarNumber: '',
                    takeGoodsMan: '',
                    takeGoodsManTel: '',
                    logisticsNumber: '',
                    distributionWay: '',
                    unloaderType: '',
                    unloaderMan: '',
                    remark:'',
                    packageQty:0,
                    weight:0
                }
            }
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
            handleTagClick:function(tab, event){
                //all,notify,planTakeaway,qcConfirm,sendConfirm,cancel
                if(_this.tabName=="all"){
                    _this.listQueryParam.status = ""
                    _this.buttonDisable.planTakeaway=false
                    _this.buttonDisable.fastOutbound=false
                    _this.buttonDisable.sendCOnfirm=false
                    _this.buttonDisable.print=false
                    _this.buttonDisable.printSet=false
                    _this.buttonDisable.refurbish=false
                    _this.buttonDisable.log=false
                }else if(_this.tabName=="notify"){
                    _this.listQueryParam.status = "100"
                    _this.buttonDisable.planTakeaway=false
                    _this.buttonDisable.fastOutbound=false
                    _this.buttonDisable.sendCOnfirm=true
                    _this.buttonDisable.print=true
                    _this.buttonDisable.printSet=false
                    _this.buttonDisable.refurbish=false
                    _this.buttonDisable.log=false
                }else if(_this.tabName=="planTakeaway"){
                    _this.listQueryParam.status = "200"
                    _this.buttonDisable.planTakeaway=true
                    _this.buttonDisable.fastOutbound=true
                    _this.buttonDisable.sendCOnfirm=true
                    _this.buttonDisable.print=true
                    _this.buttonDisable.printSet=false
                    _this.buttonDisable.refurbish=false
                    _this.buttonDisable.log=false
                }else if(_this.tabName=="qcConfirm"){
                    _this.listQueryParam.status = "300"
                    _this.buttonDisable.planTakeaway=true
                    _this.buttonDisable.fastOutbound=true
                    _this.buttonDisable.sendCOnfirm=false
                    _this.buttonDisable.print=false
                    _this.buttonDisable.printSet=false
                    _this.buttonDisable.refurbish=false
                    _this.buttonDisable.log=false
                }else if(_this.tabName=="sendConfirm"){
                    _this.listQueryParam.status = "400"
                    _this.buttonDisable.planTakeaway=true
                    _this.buttonDisable.fastOutbound=true
                    _this.buttonDisable.sendCOnfirm=true
                    _this.buttonDisable.print=false
                    _this.buttonDisable.printSet=false
                    _this.buttonDisable.refurbish=false
                    _this.buttonDisable.log=false
                }else if(_this.tabName=="cancel"){
                    _this.listQueryParam.status = "500"
                    _this.buttonDisable.planTakeaway=true
                    _this.buttonDisable.fastOutbound=true
                    _this.buttonDisable.sendCOnfirm=true
                    _this.buttonDisable.print=true
                    _this.buttonDisable.printSet=false
                    _this.buttonDisable.refurbish=false
                    _this.buttonDisable.log=false
                }
                _this.selectionDetailList = []
                _this.selectionDetailLabelNo = '-'
                this.getList()
            },
            planTakeaway:function(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择计划下架的出库通知单', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var idList=[]
                for(var i=0;i<_this.multipleSelection.length;i++){
                    if(_this.multipleSelection[i].status!=100){
                        _this.$alert("出库通知单【"+_this.multipleSelection[i].outboundNotifyNo+"】的状态不是【通知】，不能计划下架", '', {
                            type: 'warning',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        return
                    }
                    idList[i]=_this.multipleSelection[i].id
                }
                var requestData = {
                    "idList": idList,
                    "warehouseId": _this.multipleSelection[0].warehouseId
                }
                _this.$request({
                    url: '/wms-outbound-server/outboundnotify/planTakeaway',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        if(response.retCode!=-1){
                            _this.$alert(response.retMsg, '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }else{
                            _this.$alert(response.retMsg, '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }
                        _this.success()
                    }
                })
            },
            fastOutbound:function(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择计划下架的出库通知单', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var idList=[]
                for(var i=0;i<_this.multipleSelection.length;i++){
                    if(_this.multipleSelection[i].status!=100){
                        _this.$alert("出库通知单【"+_this.multipleSelection[i].outboundNotifyNo+"】的状态不是【通知】，不能快速出库", '', {
                            type: 'warning',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        return
                    }
                    idList[i]=_this.multipleSelection[i].id
                }
                var requestData = {
                    "idList": idList,
                    "warehouseId": _this.multipleSelection[0].warehouseId
                }
                _this.$request({
                    url: '/wms-outbound-server/outboundnotify/fastOutbound',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        if(response.retCode!=-1){
                            _this.$alert(response.retMsg, '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }else{
                            _this.$alert(response.retMsg, '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }
                        _this.success()
                    }
                })
            },
            sendConfirm:function(){
                _this.form.deliveryCompanyId=""
                _this.form.takeGoodsCarNumber=""
                _this.form.takeGoodsMan=""
                _this.form.takeGoodsManTel=""
                _this.form.logisticsNumber=""
                _this.form.distributionWay=""
                _this.form.unloaderType=""
                _this.form.unloaderMan=""
                _this.form.remark=""
                _this.form.packageQty = 0
                _this.form.weight = 0
                if (_this.multipleSelection==[]||_this.multipleSelection==null||_this.multipleSelection.length < 1) {
                    _this.$alert('请选择计划下架的出库通知单', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                for(var i=0;i<_this.multipleSelection.length;i++){
                    if(_this.multipleSelection[i].status!=300){
                        _this.$alert("出库通知单【"+_this.multipleSelection[i].outboundNotifyNo+"】的状态不是【质检确认】，不能发出确认", '', {
                            type: 'warning',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        return
                    }
                    _this.form.packageQty = _this.form.packageQty + _this.multipleSelection[i].packageQty
                    _this.form.weight = _this.form.weight + _this.multipleSelection[i].weight
                }
                _this.isAdded = true
            },
            doSendConfirm:function() {
                if (_this.multipleSelection==null||_this.multipleSelection==[]||_this.multipleSelection.length < 1) {
                    _this.$alert('请选择计划下架的出库通知单', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                var idList=[]
                for(var i=0;i<_this.multipleSelection.length;i++){
                    if(_this.multipleSelection[i].status!=300){
                        _this.$alert("出库通知单【"+_this.multipleSelection[i].outboundNotifyNo+"】的状态不是【质检确认】，不能发出确认", '', {
                            type: 'warning',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        return
                    }
                    idList[i]=_this.multipleSelection[i].id
                }
                var requestData = {
                    "idList": idList,
                    "warehouseId": _this.multipleSelection[0].warehouseId,
                    "deliveryCompanyId":this.form.deliveryCompanyId,
                    "takeGoodsCarNumber":this.form.takeGoodsCarNumber,
                    "takeGoodsMan":this.form.takeGoodsMan,
                    "takeGoodsManTel":this.form.takeGoodsManTel,
                    "logisticsNumber":this.form.logisticsNumber,
                    "distributionWay":this.form.distributionWay,
                    "unloaderType":this.form.unloaderType,
                    "unloaderMan":this.form.unloaderMan,
                    "remark":this.form.remark,
                    "weight":this.form.weight,
                    "packageQty":this.form.packageQty
                }
                _this.$request({
                    url: '/wms-outbound-server/outboundnotify/sendOutConfrim',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        if(response.retCode!=-1){
                            _this.$alert(response.retMsg, '', {
                                type: 'success',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }else{
                            _this.$alert(response.retMsg, '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                        }
                        _this.isAdded = false
                        _this.success()
                    }
                })
            },
            success() {
                _this.getList()
            }
        },
        mounted() {
            this.getList()
        },
        watch: {
            tableData() {
                _this.selectionDetailList = []
                _this.selectionDetailLabelNo = '-'
            },
            selectionDetailList() {
                if (_this.selectionDetailList!=null&&_this.selectionDetailList.length > 0) {
                    _this.selectionDetailLabelNo = _this.selectionDetailList[0].outboundNotifyNo
                } else {
                    _this.selectionDetailLabelNo = '-'
                }
            },
            // 监听times值变化，从而去加载需要编辑的数据
            times(){
                if(_this.times.length==2){
                    if(_this.times[0]!=null&&_this.times[1]!=null){
                        _this.listQueryParam.startTime = _this.times[0].getTime()
                        _this.listQueryParam.endTime = _this.times[1].getTime()
                        return
                    }
                }
                _this.listQueryParam.startTime = ""
                _this.listQueryParam.endTime = ""
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
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
    .information-list {
        margin-top: 0;
    }
    .issueConfirmPopup{
        .groupL{
            width: 300px;
            margin-top:6px;
            .newArrow-country{
                position:absolute;
                right:30px;
                top:14px;
            }
            .groupL-pTextarea{
                display:inline-flex;
                margin-left: 7px;
            }
            .textarea-prompt{
                margin-left:-45px;
                margin-top:53px;
            }
            .kilogram {
                position: absolute;
                top: 0px;
                right: 30px;
                color: #5f5f5f;
            }
        }
    }
</style>

