<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="javascript:;" @click="refresh">刷新</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">导出主单</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">导出明细</a>
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
                            <p class="inblock">
                                <span class="hspace">装卸队单号</span>
                                <el-input></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">来源单据号</span>
                                <el-input></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">货主</span>
                                <el-input></el-input>
                            </p>
                            <p class="inblock">
                                <span class="hspace">卸货人</span>
                                <el-input></el-input>
                            </p>
                        </div>
                        <div class="vehicle-btn">
                            <el-button>查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单头部    end-->

                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click='rowClick' @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="status" label="状态" width=""></TableColumn>
                            <TableColumn prop="loadingOrderNo" label="装卸单号" width="150"></TableColumn>
                            <TableColumn prop="sourceOrderNo" label="来源单据号"  width="150"></TableColumn>
                            <TableColumn prop="sourceOrderType" label="来源单据类型"  width=""></TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="loadingVariety" label="卸货品种"  width=""></TableColumn>
                            <TableColumn prop="loadingQty" label="卸货数量"  width=""></TableColumn>
                            <TableColumn prop="loader" label="卸货人" width=""> </TableColumn>
                            <TableColumn prop="loadingStartTime" label="卸货开始时间" width=""> </TableColumn>
                            <TableColumn prop="loadingEndTime" label="卸货结束时间" width=""> </TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->

                    <!--分页    start-->
                    <pagination :pagination = 'pagination' @pagechange = 'getList'></pagination>
                    <!--分页    end-->

                    <!--列表展开列表    start-->
                    <div class="mainContent-b">
                        <div class="arrow-bottom arrow-box" >
                            <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        </div>
                        <!--表单  start-->
                        <div class="details-list">
                            <p>装卸单号：{{selectionDetailLabelNo}}</p>
                            <div class="information-list">
                                <Table :data="selectionDetailList" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type='index' label="序号" width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="barcode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsQty" label="商品数量" width=""></TableColumn>
                                    <TableColumn prop="unit" label="单位" width=""></TableColumn>
                                    <TableColumn prop="goodsCubage" label="体积(m³)" width=""></TableColumn>
                                    <TableColumn prop="goodsWeight" label="重量(kg)" width=""></TableColumn>
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
                    <el-input v-model="input" placeholder="综合方案" ></el-input>
                    <el-button :disabled="true" class="cancelButton">保存查询方案</el-button>
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
            <el-button  class="confirmButton"  @click="dialogTableVisible = false">立即查询</el-button>
          </span>
        </el-dialog>
        <!--高级查询弹出层结束-->
    </div>
</template>
<script type="es6">

	import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    let _this = null
    let api = {
        getlist: '/wms-pub-server/loadingOrder/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-pub-server/loadingOrderDetail/getList',//子列表
    }
    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_handlingorderManage',
                system:'/wms',
                titleName:'卸货单管理',
                //表单数据 数组
                tableData: [],
                // 当前选择的数据项目
                multipleSelection:[],
                // 贴码单明细列表
                selectionDetailList:[],
                //子表单单号
                selectionDetailLabelNo:'-',

                /*高级查询*/
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
                input: '',
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
                value: '',
                curRow:{},
                dialogTableVisible: false,//高级查询
                operationTip:false,//删除提示
                // 获取列表查询条件分页部分,存储各种搜索条件字段。
                listQueryParam:{
                    //pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    //pageSize:10,
                    //pageStart:0 //起始条数（从0开始）
                },
                // 分页
                pagination:{
                    total:0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },
            }
        },
        components:{
            pagination
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,

            getDetailList(id,uri){
                _this.$request({
                    url:uri,//子表单的api地址
                    context:_this,//this
                    sendData:{id:'1',loadingOrderId:'3000'},//主表单的id
                    successCallback:(_this,response)=>{
                        // 结果赋值给实际的明细表格绑定的数据项。
                        _this.selectionDetailList = response
                        //获取表头编号
                        _this.selectionDetailLabelNo = _this.curRow.loadingOrderNo
                    }
                })
            },
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
.details-list{
    width: 50%;
}
</style>

