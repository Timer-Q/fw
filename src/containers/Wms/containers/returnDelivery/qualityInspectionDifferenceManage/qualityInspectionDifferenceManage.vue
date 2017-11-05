<template>
    <div class="wms-items" v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <a href="javascript:;">打印差异单</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="printerSetup=true">打印机设置</a>
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
                                <el-input type="text" class="license-number" placeholder="请输入差异单号" v-model="listQueryParam.qualityControlDifferenceNo"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-input type="text" class="license-number" placeholder="请输入货主" v-model="listQueryParam.ownerId"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">下架单号</span>
                                <el-input type="text" class="license-number" placeholder="请输入下架单号" v-model="listQueryParam.takeawayNo"></el-input>
                            </div>
                        </div>

                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                            <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
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
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="statusDesc" label="状态"  width="80"></TableColumn>
                            <TableColumn prop="qualityControlDifferenceNo" label="差异单号"  width=""></TableColumn>
                            <TableColumn prop="takeawayNo" label="下架单号"  width=""></TableColumn>
                            <TableColumn prop="outboundNotifyNo" label="出库通知单号"  width="100"></TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                            <TableColumn prop="warehouseAreaName" label="库区"  width=""></TableColumn>
                            <TableColumn prop="goodBadDesc" label="正残属性" width=""> </TableColumn>
                            <TableColumn prop="varietyQty" label="差异品种数" width="90"> </TableColumn>
                            <TableColumn prop="differenceQty" label="差异数量" width=""> </TableColumn>
                            <TableColumn prop="posPlatformName" label="POS台" width=""> </TableColumn>
                            <TableColumn prop="printStatusDesc" label="打印状态" width=""> </TableColumn>
                            <TableColumn prop="printQty" label="打印次数" width=""> </TableColumn>
                            <TableColumn prop="createUser" label="创建人" width=""> </TableColumn>
                            <TableColumn prop="createTime" label="创建时间" width="" :formatter="datetimeFormat"> </TableColumn>
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
                            <div class="information-list">
                                <Table :data="selectionDetailList" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                    <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="spec" label="规格"  width=""></TableColumn>
                                    <TableColumn prop="takeawayLocationCode" label="货位" width=""></TableColumn>
                                    <TableColumn prop="unit" label="单位"  width=""></TableColumn>
                                    <TableColumn prop="planQty" label="计划数量"  width=""></TableColumn>
                                    <TableColumn prop="qualityControlQty" label="质检数量"  width=""></TableColumn>
                                    <TableColumn prop="differenceQty" label="差异数量"  width=""></TableColumn>
                                    <TableColumn prop="productBatchNo" label="生产批号"  width=""></TableColumn>
                                    <TableColumn prop="productDate" label="生产日期"  width="" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="expireDate" label="失效日期"  width="" :formatter="dateFormat"></TableColumn>
                                    <TableColumn prop="shelflifeDays" label="保质期天数"  width="90"></TableColumn>
                                </Table>
                            </div>
                            <!--表单  end-->
                        </div>
                    </div>
                    <!--子表单    end-->
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
            <el-button class="confirmButton" @click="dialogTableVisible = false">立即查询</el-button>
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
    import service from '@Wms/services/arrivalWarehousing'

    let _this = null
    let api = {
        getlist: '/wms-outbound-server/qualitycontroldifference/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-outbound-server/qualitycontroldifference/get',//子列表
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
                //表单数据 数组
                tableData: [],
                // 当前选择的数据项目
                multipleSelection:[],
                // 贴码单明细列表
                selectionDetailList:[],
                //子表单单号
                selectionDetailLabelNo:'-',

                input:'',
                value1: '',
                dialogTableVisible:false,//高级查询弹出
                printerSetup:false,//打印机设置

                // 获取列表查询条件分页部分,存储各种搜索条件字段。
                listQueryParam:{
                    //pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    //pageSize:10,
                    //pageStart:0 //起始条数（从0开始）
                    startTime:"",
                    endTime:"",
                    ownerId:"",
                    takeawayNo:"",
                    qualityControlDifferenceNo:""
                },
                // 分页
                pagination:{
                    total:0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },


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
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
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
            }
        },
        components:{
            pagination
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
        },
        mounted() {
            _this.getList()
        },
        watch: {
            tableData() {
                _this.selectionDetailList = []
                _this.selectionDetailLabelNo = '-'
            },
            selectionDetailList() {
                if (_this.selectionDetailList.length > 0) {
                    _this.selectionDetailLabelNo = _this.selectionDetailList[0].qualityControlDifferenceNo
                } else {
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
    .printerSetup{
        a{
            font-size:12px;
            text-decoration: underline;
            color:#4ab0e0;
            margin-left:10px;
        }
    }
</style>

