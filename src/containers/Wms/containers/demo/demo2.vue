<template>
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="">删除</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">打印包件单</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">打印包件清单</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">完成组件包</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click=" ">打印机设置</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="refresh">刷新</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">日志</a>
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
                            <el-dropdown trigger=" ">
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
                                    v-model="value1"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                                <i class="iconfont icon-rili"></i>
                                <span>-</span>
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                                <i class="iconfont icon-rili"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">包件号</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-input></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">通知单号</span>
                                <el-input></el-input>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button>查询</el-button>
                            <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单  start-->
                    <Tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
                        <TabPane label="全部" name='all'>
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table id="mainTable"
                                       :data="tableData"
                                       ref="mainTable"
                                       @row-click="rowClick"
                                       @selection-change="handleSelectionChange"
                                       highlight-current-row border
                                       style="width: 100%"
                                       :default-sort = "{}"
                                >
                                    <TableColumn prop="id" fixed label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" fixed width="55"></TableColumn>
                                    <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="packingDocumentNumber" label="包件单号"  width=""></TableColumn>
                                    <TableColumn prop="outboundNotifyNumber" label="出库通知单号"  width="100"></TableColumn>
                                    <TableColumn prop="sourceOrderNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="ownerId" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="warehouseId" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="warehouseAreaId" label="库区"  width=""></TableColumn>
                                    <TableColumn prop="locationId" label="货位" width=""> </TableColumn>
                                    <TableColumn prop="goodBad" label="正残属性" width=""> </TableColumn>
                                    <TableColumn prop="varietyQty" label="品种数" width=""> </TableColumn>
                                    <TableColumn prop="productQty" label="商品数量" width=""> </TableColumn>
                                    <TableColumn prop="systemWeight" label="系统重量(kg)" width="95"> </TableColumn>
                                    <TableColumn prop="actualWeight" label="实际重量" width=""> </TableColumn>
                                    <TableColumn prop="systemVolume" label="系统体积" width=""> </TableColumn>
                                    <TableColumn prop="fastOutboundTab" label="快速出库标记" width="100"> </TableColumn>
                                    <TableColumn prop="distributionWay" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="supplierId" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="supplierMan" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="supplierManTel" label="联系人电话" width="100"> </TableColumn>
                                    <TableColumn prop="returnAddress" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="sendContactMan" label="发货联系人" width="100"> </TableColumn>
                                    <TableColumn prop="sendContactManTel" label="发货联系人电话" width="120"> </TableColumn>
                                    <TableColumn prop="deliveryCompanyId" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="logisticsNo" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsCarNo" label="提货车牌号" width="100"> </TableColumn>
                                    <TableColumn prop="takeGoodsMan" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="takeGoodsManTel" label="提货电话" width=""> </TableColumn>
                                    <TableColumn prop="posPlatformId" label="POS台" width=""> </TableColumn>
                                    <TableColumn prop="qualityControlMan" label="质检人" width=""> </TableColumn>
                                    <TableColumn prop="packingTime" label="组包时间" width=""> </TableColumn>
                                    <TableColumn prop="updateUser" label="操作员" width=""> </TableColumn>
                                    <TableColumn prop="updateTime" label="完成时间" width=""> </TableColumn>
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
                                    <p>任务表单：20940328403298402</p>
                                    <div class="information-list informationR-list">
                                        <Table :data="subTableData" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                            <TableColumn prop="id" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="下架单号"  width=""></TableColumn>
                                            <TableColumn prop="goodsLabel" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="throughput" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="规格" width=""></TableColumn>
                                            <TableColumn prop="status" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="status" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="status" label="数量"  width=""></TableColumn>
                                            <TableColumn prop="status" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="status" label="生产日期"  width=""></TableColumn>
                                            <TableColumn prop="status" label="失效日期"  width=""></TableColumn>
                                            <TableColumn prop="status" label="保质期天数"  width=""></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="创建" name='creat'>
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table :data="mainTableData" highlight-current-row <Table id="mainTable"
                                                                                          :data="tableData"
                                                                                          ref="mainTable"
                                                                                          @row-click="rowClick"
                                                                                          @selection-change="handleSelectionChange"
                                                                                          highlight-current-row border
                                                                                          style="width: 100%"
                                                                                          :default-sort = "{}"
                            > style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                <TableColumn prop="id" label="序号" width="70"></TableColumn>
                                <TableColumn type="selection" width="55"></TableColumn>
                                <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                <TableColumn prop="warehouseId" label="包件单号"  width=""></TableColumn>
                                <TableColumn prop="notifyNos" label="出库通知单号"  width="100"></TableColumn>
                                <TableColumn prop="externalNo" label="来源单号"  width=""></TableColumn>
                                <TableColumn prop="ownerId" label="货主"  width=""></TableColumn>
                                <TableColumn prop="supplierId" label="仓库"  width=""></TableColumn>
                                <TableColumn prop="notifyVarietyQty" label="库区"  width=""></TableColumn>
                                <TableColumn prop="notifyQty" label="货位" width=""> </TableColumn>
                                <TableColumn prop="receivedVarietyQty" label="正残属性" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="品种数" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="商品数量" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="系统重量(kg)" width="95"> </TableColumn>
                                <TableColumn prop="receivedQty" label="实际重量" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="系统体积" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="快速出库标记" width="100"> </TableColumn>
                                <TableColumn prop="receivedQty" label="配送方式" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="供应商" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="联系人" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="联系人电话" width="90"> </TableColumn>
                                <TableColumn prop="receivedQty" label="退货地址" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="发货联系人" width="90"> </TableColumn>
                                <TableColumn prop="receivedQty" label="发货联系人电话" width="105"> </TableColumn>
                                <TableColumn prop="receivedQty" label="承运公司" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="物流单号" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="提货车牌号" width="95"> </TableColumn>
                                <TableColumn prop="receivedQty" label="提货人" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="提货电话" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="POS台" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="质检人" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="组包时间" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="操作员" width=""> </TableColumn>
                                <TableColumn prop="receivedQty" label="完成时间" width=""> </TableColumn>
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
                                    <p>任务表单：20940328403298402</p>
                                    <div class="information-list informationR-list">
                                        <Table :data="subTableData" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                            <TableColumn prop="id" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="下架单号"  width=""></TableColumn>
                                            <TableColumn prop="goodsLabel" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="throughput" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="规格" width=""></TableColumn>
                                            <TableColumn prop="status" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="status" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="status" label="数量"  width=""></TableColumn>
                                            <TableColumn prop="status" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="status" label="生产日期"  width=""></TableColumn>
                                            <TableColumn prop="status" label="失效日期"  width=""></TableColumn>
                                            <TableColumn prop="status" label="保质期天数"  width=""></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="完成" name='complete'>
                            <!--主表单  start-->
                            <div class="information-list">
                                <Table id="mainTable"
                                       :data="tableData"
                                       ref="mainTable"
                                       @row-click="rowClick"
                                       @selection-change="handleSelectionChange"
                                       highlight-current-row border
                                       style="width: 100%"
                                       :default-sort = "{}"
                                >
                                    <TableColumn prop="id" label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" width="55"></TableColumn>
                                    <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="warehouseId" label="包件单号"  width=""></TableColumn>
                                    <TableColumn prop="notifyNos" label="出库通知单号"  width="100"></TableColumn>
                                    <TableColumn prop="externalNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="ownerId" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="supplierId" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="notifyVarietyQty" label="库区"  width=""></TableColumn>
                                    <TableColumn prop="notifyQty" label="货位" width=""> </TableColumn>
                                    <TableColumn prop="receivedVarietyQty" label="正残属性" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="品种数" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="商品数量" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="系统重量(kg)" width="95"> </TableColumn>
                                    <TableColumn prop="receivedQty" label="实际重量" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="系统体积" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="快速出库标记" width="100"> </TableColumn>
                                    <TableColumn prop="receivedQty" label="配送方式" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="联系人" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="联系人电话" width="90"> </TableColumn>
                                    <TableColumn prop="receivedQty" label="退货地址" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="发货联系人" width="90"> </TableColumn>
                                    <TableColumn prop="receivedQty" label="发货联系人电话" width="105"> </TableColumn>
                                    <TableColumn prop="receivedQty" label="承运公司" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="物流单号" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="提货车牌号" width="95"> </TableColumn>
                                    <TableColumn prop="receivedQty" label="提货人" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="提货电话" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="POS台" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="质检人" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="组包时间" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="操作员" width=""> </TableColumn>
                                    <TableColumn prop="receivedQty" label="完成时间" width=""> </TableColumn>
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
                                    <p>任务表单：20940328403298402</p>
                                    <div class="information-list informationR-list">
                                        <Table :data="subTableData" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                            <TableColumn prop="id" label="序号" width="70"></TableColumn>
                                            <TableColumn prop="goodsId" label="下架单号"  width=""></TableColumn>
                                            <TableColumn prop="goodsLabel" label="SKUID"  width=""></TableColumn>
                                            <TableColumn prop="goodsName" label="商品条码"  width=""></TableColumn>
                                            <TableColumn prop="throughput" label="商品名称"  width=""></TableColumn>
                                            <TableColumn prop="notifyQty" label="规格" width=""></TableColumn>
                                            <TableColumn prop="status" label="整零转换"  width=""></TableColumn>
                                            <TableColumn prop="status" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="status" label="数量"  width=""></TableColumn>
                                            <TableColumn prop="status" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="status" label="生产日期"  width=""></TableColumn>
                                            <TableColumn prop="status" label="失效日期"  width=""></TableColumn>
                                            <TableColumn prop="status" label="保质期天数"  width=""></TableColumn>
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
            <el-button class="confirmButton" @click=''>立即查询</el-button>
          </span>
        </el-dialog>
        <!--高级查询弹出层结束-->
    </div>
</template>
<script>
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'

    let _this = null
    let api = {
        getlist:'/wms-outbound-server/packingdocument/getListWithPage',
        getlabelDetailList:'/wms-outbound-server/packingdocumentdetail/getList',  // 根据id获取明细列表
        getlabelDetail:'/wms-outbound-server/packingdocument/get'
    }
    // alert提示框各种非默认需要自定义的配置信息
    let alertConfig = {
        statusErr:{
            title:'操作提示',
            tip:'"到货登记"只能操作状态为“通知收货”的数据，请确认状态！'
        }
    }
    export default {
        created() {
            _this = this
        },
        data () {
            return {
                printerSetup:false,
                dialogTableVisible:false,
                value1:'',
                // 获取列表查询条件分页部分,存储各种搜索条件字段。
                listQueryParam:{
                    //pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    //pageSize:10,
                    //pageStart:0 //起始条数（从0开始）
                    status:''
                },
                // 分页
                pagination:{
                    total:13,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },
                input:"",
                form:{},
                tableData:[], //表单数据 数组
                subTableData:[],
                multipleSelection:[],// 当前选择的数据项目
                selectionDetailList:[],// 子表单明细列表
                selectionDetailLabelNo:'-',//子表单表头数据编号
                activeTab:'all',
                listStatus:'', // 状态码
                statusCode:{ // 状态码，100，200是接口定的，憋问我为啥，我也觉得有些变态。
                    creat:100,
                    complete:200
                },
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

            }
        },
        components:{
            pagination
        },
        methods: {

            // tab标签点击事件
            tabClick(tab){
                //console.log(_this.activeTab)
            },

            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange   tttt
            ...pageOperate
        },
        created(){
            _this = this
            _this.api = api
        },
        mounted() {
            this.getList()
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
    body .Table th .cell {
        background: #eee;
    }
</style>

