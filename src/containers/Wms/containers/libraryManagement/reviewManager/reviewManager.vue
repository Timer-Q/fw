<template>
    <div class="wms-items" v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="confirm">新增</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="refresh">开始盘点</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">打印</a>
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
                                <i class="iconfont icon-rili"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">差异单号</span>
                                <el-input type="text" class="license-number" placeholder="请输入差异单号" v-model="listQueryParam.outboundDifferenceNo"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-input type="text" class="license-number" placeholder="请输入货主" v-model="listQueryParam.ownerId"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">出库通知单号</span>
                                <el-input type="text" class="license-number" placeholder="请输入出库通知单号" v-model="listQueryParam.outboundNotifyNo"></el-input>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                            <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单  start-->
                    <Tabs type="border-card" v-model="tabName" @tab-click="handleTagClick">
                        <TabPane label="全部" name="all" >
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
                                    <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundDifferenceNo" label="差异单号"  width=""></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="100"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="sendVarietyQty" label="发出品种数" width="90"> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="differenceVarietyQty" label="差异品种数" width="90"> </TableColumn>
                                    <TableColumn prop="differenceQty" label="差异数量" width="95"> </TableColumn>
                                    <TableColumn prop="returnType" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badType" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="createUserName" label="创建人" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width=""> </TableColumn>
                                    <TableColumn prop="differenceConfirmUserName" label="差异确认人" width="90"> </TableColumn>
                                    <TableColumn prop="updateTime" label="最后操作时间" width="100"> </TableColumn>
                                </Table>
                            </div>
                            <!--主表单  end-->
                           <!-- 分页    start-->
                            <pagination :pagination = 'pagination' @pagechange = 'getList'></pagination>
                            <!--分页    end-->
                            <!--子表单    start-->
                            <div class="mainContent-b">
                                <div class="arrow-bottom arrow-box" >
                                    <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                                </div>
                                <!--表单  start-->
                                <div class="details-list">
                                    <p>差异单号：{{selectionDetailLabelNo}}</p>
                                    <div class="information-list">
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
                                            <TableColumn prop="unit" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="sendQty" label="发出数量"  width=""></TableColumn>
                                            <TableColumn prop="receiveQty" label="收货数量"  width=""></TableColumn>
                                            <TableColumn prop="differenceQty" label="差异数量"  width=""></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="shelflifeDays" label="保质期天数"  width=""></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="差异待确认" name="wait_confirm" >
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
                                    <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundDifferenceNo" label="差异单号"  width=""></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="100"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="sendVarietyQty" label="发出品种数" width="90"> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="differenceVarietyQty" label="差异品种数" width="90"> </TableColumn>
                                    <TableColumn prop="differenceQty" label="差异数量" width="95"> </TableColumn>
                                    <TableColumn prop="returnType" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badType" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="createUserName" label="创建人" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width=""> </TableColumn>
                                    <TableColumn prop="differenceConfirmUserName" label="差异确认人" width="90"> </TableColumn>
                                    <TableColumn prop="updateTime" label="最后操作时间" width="100"> </TableColumn>
                                </Table>
                            </div>
                            <!--主表单  end>
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
                                            <TableColumn prop="unit" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="sendQty" label="发出数量"  width=""></TableColumn>
                                            <TableColumn prop="receiveQty" label="收货数量"  width=""></TableColumn>
                                            <TableColumn prop="differenceQty" label="差异数量"  width=""></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="shelflifeDays" label="保质期天数"  width=""></TableColumn>
                                        </Table>
                                    </div>
                                    <!--表单  end-->
                                </div>
                            </div>
                            <!--子表单    end-->
                        </TabPane>
                        <TabPane label="差异确认" name="confirm">
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
                                    <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundDifferenceNo" label="差异单号"  width=""></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="100"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="sendVarietyQty" label="发出品种数" width="90"> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="differenceVarietyQty" label="差异品种数" width="90"> </TableColumn>
                                    <TableColumn prop="differenceQty" label="差异数量" width="95"> </TableColumn>
                                    <TableColumn prop="returnType" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badType" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="createUserName" label="创建人" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width=""> </TableColumn>
                                    <TableColumn prop="differenceConfirmUserName" label="差异确认人" width="90"> </TableColumn>
                                    <TableColumn prop="updateTime" label="最后操作时间" width="100"> </TableColumn>
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
                                    <p>差异单号：{{selectionDetailLabelNo}}</p>
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
                                            <TableColumn prop="unit" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="sendQty" label="发出数量"  width=""></TableColumn>
                                            <TableColumn prop="receiveQty" label="收货数量"  width=""></TableColumn>
                                            <TableColumn prop="differenceQty" label="差异数量"  width=""></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="shelflifeDays" label="保质期天数"  width=""></TableColumn>
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
                                    <TableColumn prop="status" label="状态"  width="80"></TableColumn>
                                    <TableColumn prop="outboundDifferenceNo" label="差异单号"  width=""></TableColumn>
                                    <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="100"></TableColumn>
                                    <TableColumn prop="sourceNo" label="来源单号"  width=""></TableColumn>
                                    <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                                    <TableColumn prop="supplierName" label="供应商" width=""> </TableColumn>
                                    <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                                    <TableColumn prop="sendVarietyQty" label="发出品种数" width="90"> </TableColumn>
                                    <TableColumn prop="sendQty" label="发出数量" width=""> </TableColumn>
                                    <TableColumn prop="differenceVarietyQty" label="差异品种数" width="90"> </TableColumn>
                                    <TableColumn prop="differenceQty" label="差异数量" width="95"> </TableColumn>
                                    <TableColumn prop="returnType" label="退货类型" width=""> </TableColumn>
                                    <TableColumn prop="badType" label="残品类型" width=""> </TableColumn>
                                    <TableColumn prop="createUserName" label="创建人" width=""> </TableColumn>
                                    <TableColumn prop="createTime" label="创建时间" width=""> </TableColumn>
                                    <TableColumn prop="differenceConfirmUserName" label="差异确认人" width="90"> </TableColumn>
                                    <TableColumn prop="updateTime" label="最后操作时间" width="100"> </TableColumn>
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
                                    <p>差异单号：{{selectionDetailLabelNo}}</p>
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
                                            <TableColumn prop="unit" label="单位"  width=""></TableColumn>
                                            <TableColumn prop="sendQty" label="发出数量"  width=""></TableColumn>
                                            <TableColumn prop="receiveQty" label="收货数量"  width=""></TableColumn>
                                            <TableColumn prop="differenceQty" label="差异数量"  width=""></TableColumn>
                                            <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                            <TableColumn prop="shelflifeDays" label="保质期天数"  width=""></TableColumn>
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
    </div>
</template>
<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/returnDelivery/outstockDifferenceManage/outstockDifferenceService'

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    let _this = null
    let api = {
        getlist: '/wms-outbound-server/outbounddifference/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-outbound-server/outbounddifference/get',//子列表
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
                //页签名称
                tabName:"all",
                //表单数据 数组
                tableData: [],
                // 当前选择的数据项目
                multipleSelection:[],
                // 贴码单明细列表
                selectionDetailList:[],
                //子表单单号
                selectionDetailLabelNo:'-',

                dialogTableVisible:false,//高级查询弹出

                // 获取列表查询条件分页部分,存储各种搜索条件字段。
                listQueryParam:{
                    //pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    //pageSize:10,
                    //pageStart:0 //起始条数（从0开始）
                    outboundDifferenceNo:"",
                    outboundNotifyNo:"",
                    ownerId:"",
                    startTime:"",
                    endTime:"",
                    status:""
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

                input:'',
                value1: '',
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
                repeatData:[{
                    index:'1',
                    sku:'201708091111',
                    goodsName:'衣服',
                    integerAndZero:'内容',
                    goodsBarcode:'33445555',
                    goodsUnit:'瓶',
                    goodsOwner:'阿毛',
                    provider:'A供应商',
                },{
                    index:'1',
                    sku:'201708091111',
                    goodsName:'衣服',
                    integerAndZero:'内容',
                    goodsBarcode:'33445555',
                    goodsUnit:'瓶',
                    goodsOwner:'阿毛',
                    provider:'A供应商',
                },{
                    index:'1',
                    sku:'201708091111',
                    goodsName:'衣服',
                    integerAndZero:'内容',
                    goodsBarcode:'33445555',
                    goodsUnit:'瓶',
                    goodsOwner:'阿毛',
                    provider:'A供应商',
                }],
                value: '',
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
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
            handleTagClick:function(tab, event){
                if(_this.tabName=="all"){
                    _this.listQueryParam.status = ""
                }else if(_this.tabName=="wait_confirm"){
                    _this.listQueryParam.status = "100"
                }else if(_this.tabName=="confirm"){
                    _this.listQueryParam.status = "200"
                }else if(_this.tabName=="cancel"){
                    _this.listQueryParam.status = "300"
                }
                _this.selectionDetailList = []
                _this.selectionDetailLabelNo = '-'
                this.getList()
            },
            confirm(){
                if (_this.multipleSelection.length < 1) {
                    _this.$alert('请选择要确认的差异单', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if (_this.multipleSelection.length > 1) {
                    _this.$alert('只能选择一个出库差异单！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                if(_this.multipleSelection[0].status != 100){
                    _this.$alert('只能选择状态为【待确认】的出库差异单！', '', {
                        type: 'warning',
                        closeOnClickModal: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                    return
                }
                this.$confirm('是否确认该差异', '差异确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.doConfirm()
                }).catch(() => {
                    //取消
                })
            },
            doConfirm(){
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": _this.multipleSelection[0].warehouseId
                }
                _this.$request({
                    url: '/wms-outbound-server/outbounddifference/confirmDifference',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
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
        watch:{
            tableData(){
                _this.selectionDetailList = []
                _this.selectionDetailLabelNo = '-'
            },
            selectionDetailList(){
                if(_this.selectionDetailList.length>0){
                    _this.selectionDetailLabelNo = _this.selectionDetailList[0].outboundDifferenceNo
                }else{
                    _this.selectionDetailLabelNo = '-'
                }
            },
            // 监听value值变化，从而去加载需要编辑的数据
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
    .information-list {
        margin-top: 0;
    }
    body .Table th .cell {
        background: #eee;
    }
</style>

