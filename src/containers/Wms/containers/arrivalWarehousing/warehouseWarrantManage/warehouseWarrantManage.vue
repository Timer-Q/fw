<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="javascript:;">导出入库通知单</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">导出入库通知单明细</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" @click="refresh">刷新</a>
                </p>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <!--表单头部    start-->
                    <div class="vehicle-find">
                        <div class="query-btn el-dropdown-link">
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
                            <p class="inblock">
                                <span class="hspace">货主</span>
                                <el-input></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">商品条码</span>
                                <el-input></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">商品名称</span>
                                <el-input></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">货位</span>
                                <el-input></el-input>
                            </p>
                            <span class="hspace">库区</span>
                            <el-input></el-input>
                        </div>

                        <div class="vehicle-btn">
                            <el-button>查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单头部    end-->
                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click='rowClick'
                                  @selection-change="handleSelectionChange" highlight-current-row border
                                  style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态" width="80"></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库" width=""></TableColumn>
                            <TableColumn prop="notifyNo" label="入库通知单号" width="160"></TableColumn>
                            <TableColumn prop="externalNo" label="外部单号" width="160"></TableColumn>
                            <TableColumn prop="ownerName" label="货主" width=""></TableColumn>
                            <TableColumn prop="supplierName" label="供应商" width=""></TableColumn>
                            <TableColumn prop="notifyVarietyQty" label="通知品种" width=""></TableColumn>
                            <TableColumn prop="notifyQty" label="通知数量" width=""></TableColumn>
                            <TableColumn prop="receivedVarietyQty" label="实收品种" width=""></TableColumn>
                            <TableColumn prop="receivedQty" label="实收数量" width=""></TableColumn>
                            <TableColumn prop="" label="差异数量" width=""></TableColumn><!--暂无接口字段-->
                            <TableColumn prop="businessType" label="业务类型" width=""></TableColumn>
                            <TableColumn prop="planArrivalTime" label="计划到货时间" width="100"></TableColumn>
                            <TableColumn prop="deliveryCompanyName" label="承运商" width=""></TableColumn>
                            <TableColumn prop="deliveryMan" label="送货人" width=""></TableColumn>
                            <TableColumn prop="deliveryManContact" label="联系方式" width=""></TableColumn>
                            <TableColumn prop="unloadDockName" label="卸货月台" width=""></TableColumn>
                            <TableColumn prop="unloaderName" label="卸货人" width=""></TableColumn>
                            <TableColumn prop="unloadStarttime" label="卸货开始时间" width="100"></TableColumn>
                            <TableColumn prop="unloadEndtime" label="卸货结束时间" width="100"></TableColumn>
                            <TableColumn prop="registrantName" label="登记人" width=""></TableColumn>
                            <TableColumn prop="registerTime" label="登记时间" width=""></TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width=""></TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->
                    <!--分页    start-->
                    <pagination :pagination='pagination' @pagechange='getList'></pagination>
                    <!--分页    end-->

                    <!--列表展开列表    start-->
                    <div class="mainContent-b">
                        <div class="arrow-bottom arrow-box">
                            <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        </div>
                        <!--表单  start-->
                        <div class="details-list">
                            <p>入库通知单号：{{selectionDetailLabelNo}}</p>
                            <div class="information-list informationR-list">
                                <Table
                                    :data="selectionDetailList"
                                    highlight-current-row border style="width: 100%"
                                    :default-sort="{prop: 'date', order: 'descending'}"
                                    highlight-current-row>
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="goodsId" label="SKU编号" width=""></TableColumn>
                                    <TableColumn prop="goodsBarCode" label="商品条码" width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称" width=""></TableColumn>
                                    <TableColumn prop="unitConvertText" label="整零转换" width=""></TableColumn>
                                    <TableColumn prop="notifyQty" label="通知数量" width=""></TableColumn>
                                    <TableColumn prop="status" label="状态" width=""></TableColumn>
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
        <el-dialog title="高级查询" class="advancedQuery" :visible.sync="dialogTableVisible">
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
                    <el-input v-model="input" placeholder="综合方案"></el-input>
                    <el-button :disabled="true" class="cancelButton">保存查询方案</el-button>
                    <a href="javascript:;" class="modify">修改</a>
                    <a href="javascript:;" class="clear">清空</a>
                </div>
                <div>
                    <Table :data="gridData" border>
                        <TableColumn property="index" label="序号" width="60"></TableColumn>
                        <TableColumn property="conditionName" label="条件名称" width="100"></TableColumn>
                        <TableColumn property="relationCharacter" class-name="noPaddingCol" label="关系符" width="100">
                            <template slot-scope="scope">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
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
<script>
	import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/arrivalWarehousing'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/inboundnotify/getListWithPage',//主列表信息
        getlabelDetailList: '/wms-inbound-server/inboundnotify/getDetailList',  // 根据id获取明细列表
    }

    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        created() {
            _this = this
        },
        data() {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_warehouseWarrantManage',
                system:'/wms',
                titleName:'入库通知单管理',
                // 获取列表查询条件分页部分,存储各种搜索条件字段。
                listQueryParam: {
                    //pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    //pageSize:10,
                    //pageStart:0 //起始条数（从0开始）
                },
                // 分页
                pagination: {
                    total: 0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },
                tableData: [], //表单数据 数组
                multipleSelection: [],// 当前选择的数据项目
                selectionDetailList: [],// 子表单明细列表
                selectionDetailLabelNo: '-',//子表单表头数据编号
                curRow: {}, // 当前选中行数据
                /*高级查询*/
                gridData: [{
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }],
                dialogTableVisible: false,//高级查询
                input: '',
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
                value: '',
            }
        },
        components: {
            pagination
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
            getDetailList(id, uri){
                //获取表头编号
                _this.selectionDetailLabelNo = _this.curRow.notifyNo

                _this.$request({
                    url: uri,//子表单的api地址
                    context: _this,//this
                    sendData: {notifyId: id},//主表单的id
                    successCallback: (_this, response) => {
                        // 结果赋值给实际的明细表格绑定的数据项。
                        _this.selectionDetailList = response

                    }
                })
            }

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

<style scoped type="text/scss" lang="scss">


</style>
