<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="javascript:;" @click="getList">刷新</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" @click="goodsPutConfirm">收货上架确认</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">打印</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" @click="printerSetup=true">打印机设置</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">导出收货入库单</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">导出收货入库单明细</a>
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
                        <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click="rowClick" @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" width="55"></TableColumn>
                            <TableColumn prop="inboundNotifyNo" label="入库通知单号"  width="150"></TableColumn>
                            <TableColumn prop="externalNo" label="外部单号" width="150"></TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="supplierName" label="供应商"  width=""></TableColumn>
                            <TableColumn prop="notifyVariety" label="通知品种"  width=""></TableColumn>
                            <TableColumn prop="notifyQty" label="通知数量"  width=""></TableColumn>
                            <TableColumn prop="receivedVariety" label="实收品种"  width=""></TableColumn>
                            <TableColumn prop="receivedQty" label="实收数量" width=""> </TableColumn>
                            <TableColumn prop="goodGoodsQty" label="正品数量" width=""> </TableColumn>
                            <TableColumn prop="badGoodsQty" label="残品数量" width=""> </TableColumn>
                            <TableColumn prop="differenceQty" label="差异数量" width=""> </TableColumn>
                            <TableColumn prop="status" label="状态" width=""> </TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->

                    <!--分页    start-->
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handlePageCurrentChange"
                            :current-page="pagination.currentPage"
                            :page-sizes="pagination.pageSizes"
                            :page-size="listQueryParam.pageSize"
                            layout="total, sizes, prev, pager, next, jumper, slot"
                            :total="pagination.total">
                        </el-pagination>
                    </div>
                    <!--分页    end-->

                    <!--列表展开列表    start-->
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
                                    <TableColumn prop="workBatchNo" label="作业批次号"  width=""></TableColumn>
                                    <TableColumn prop="containerCode" label="容器条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsId" label="SKU编码"  width=""></TableColumn>
                                    <TableColumn prop="goodsBarCode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称" width=""></TableColumn>
                                    <TableColumn prop="unitConvertText" label="整散转换" width=""></TableColumn>
                                    <TableColumn prop="planQty" label="计划数量" width=""></TableColumn>
                                    <TableColumn prop="receivingQty" label="质检数量" width="" trigger="hover">
                                        <span class="el-dropdown-link"></span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>黄金糕</el-dropdown-item>
                                            <el-dropdown-item>狮子头</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </TableColumn>
                                    <TableColumn prop="putawayQty" label="实收数量" width=""></TableColumn>
                                    <TableColumn prop="goodGoodsQty" label="正品数量" width=""></TableColumn>
                                    <TableColumn prop="badGoodsQty" label="残品数量" width=""></TableColumn>
                                    <TableColumn prop="differenceQty" label="差异数量" width=""></TableColumn>
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

        <!--收货上架确认弹出层 start-->
        <el-dialog title="差异明细" class="difference" :visible.sync="appointment">
            <div>
                <Table :data="differenceDetails" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                    <TableColumn prop="goodsBarCode" label="商品条码"  width=""></TableColumn>
                    <TableColumn prop="notifyQty" label="通知数量" width=""></TableColumn>
                    <TableColumn prop="receivedQty" label="实收数量" width=""></TableColumn>
                    <TableColumn prop="differenceQty" label="差异数量" width=""></TableColumn>
                </Table>
            </div>
            <span slot="footer" class="dialog-footer">
             <el-button class="cancelButton" @click="cancel">取消</el-button>
             <el-button class="cancelButton" @click="barcodeRepeat=true">确认</el-button>
          </span>
        </el-dialog>
        <!--收货上架确认弹出层 end-->

        <!--高级查询弹出层   start-->
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
        <!--高级查询弹出层   end-->

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
        getlist: '/wms-inbound-server/receivinginbound/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/receivinginbound/getDetailList',//子列表
        confirm: '/wms-inbound-server/receivinginbound/confirm'//收货上架确认
    }
    export default {
        created(){
            _this = this
        },
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
                /*页签*/
                tag:'wms_arrivalWarehousing_receivingPutManage',
                system:'/wms',
                titleName:'收货入库管理',
                tableData:[], //表单数据 数组
                multipleSelection:[],// 当前选择的数据项目
                selectionDetailList:[],// 子表单明细列表
                selectionDetailLabelNo:'-',//子表单表头数据单号
                differenceDetails: [],//收货上架确认 差异明细弹窗

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
                dialogTableVisible: false,
                input: '',
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
                value: '',
                appointment:false,//差异明细
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
                // 获取列表查询条件分页部分
                listQueryParam:{
                    pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    pageSize:10,
                    pageStart:0 //起始条数（从0开始）
                },
                // 分页
                pagination:{
                    pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    total:100,
                    currentPage:1,
                },
            }
        },
        methods: {
            // 刷新
            /*refresh(){
                location.reload()
            },*/
            /*分页*/
            handleSizeChange(val) {
                console.log(`size每页 ${val} 条`)
                this.listQueryParam.pageSize = val

                // 默认调整页面size后从第一页开始显示
                this.listQueryParam.currentPage = 1
                this.listQueryParam.pageStart = 0

                this.getList()
            },
            handlePageCurrentChange(val) {
                console.log(`cur当前页: ${val}`)
                this.listQueryParam.currentPage = val
                this.pagination.currentPage = val
                this.listQueryParam.pageNumber = val
                this.listQueryParam.pageStart = (val-1) * this.listQueryParam.pageSize // 分页接口设计不合理，还得前端传送总体第几条，或者是bug，不能这么搞啊。。。。

                this.getList()
            },
            // 获取主列表
            getList(param){
                let _this = this
                let _param = param || {}
                let org = Object.assign({},_this.listQueryParam, _param)
                _this.$request({
                    url:api.getlist,  // 获取列表接口
                    sendData:org,   // 参数
                    context:_this,
                    successCallback:function(context, response){
                        context.tableData=response.dtoList   // 结果赋值给实际的明细表格绑定的数据项。
                        if(typeof response.count == 'number'){
                            _this.pagination.total = response.count
                        }
                        if(context.tableData.length == 0){return}

                        // 需 默认选中第一行，并请求相应的详情。要等到表格渲染完毕之后再执行选择和激活样式添加。
                        setTimeout(()=>{
                            //_this.$refs.pastCodeTable.toggleRowSelection(_this.tableData[0])  //默认选择第一行 带复选框选中状态
                            let $tr = document.getElementById('pastCodeTable').getElementsByTagName('tr')[1] // 第一行数据，表头也是使用的tr标签。
                            if($tr){
                                $tr.className = 'current-row '+ $tr.className
                            }
                            //默认获取第一行数据对应的子表单单号
                            _this.selectionDetailLabelNo = _this.$refs.pastCodeTable.data[0].inboundNotifyNo
                            // 默认获取第一行数据的详情列表
                            _this.getDetailList(_this.$refs.pastCodeTable.data[0].id, api.getlabelDetailList)
                        },20)
                    }
                })
            },

            // 需要在主表table上绑定 @row-click事件
            // 行点击事件 ,主要功能展示贴单详情列表
            rowClick(row, event, column){
                console.log("row %o, event %o, column %o",row, event, column)
                //获取子表单任务单号
                _this.selectionDetailLabelNo = row.inboundNotifyNo
                //获取明细列表
                _this.getDetailList(row.id, api.getlabelDetailList)
                /* _this.getConfirmList(row.id, api.confirm)*/
            },
            // 获取明细列表，id主表项数据的id，uri获取明细的接口地址
            getDetailList(id,uri){
                _this.$request({
                    url:uri,//子表单的api地址
                    context:_this,//this
                    sendData:{receivingInboundId:id},//主表单的id
                    successCallback:(_this,response)=>{
                        _this.selectionDetailList = response  // 结果赋值给实际的明细表格绑定的数据项。
                    }
                })
            },

            confirmList(id){
                _this.$request({
                    url:api.confirm,
                    context:_this,
                    sendData:{id:id},
                    successCallback:(_this,response)=>{
                        _this.differenceDetails = response
                    }
                })
            },

            // 选择数据项后的处理,批量处理操作，复选框选择后获得的数据。
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(this.multipleSelection.length)
            },

            // 收货上架确认
            goodsPutConfirm(){
                let _this = this

                // 没有选择数据的情况，没有选项可以在弹出窗中扫码得到信息。
                if(_this.multipleSelection.length == 0){
                    _this.alert('empty')
                    return
                }
                if(_this.multipleSelection.length > 1){

                    _this.alert('onlyOne')
                    return
                }
                // 判断选择的数据状态是不是符合操作状态，
                let id = _this.multipleSelection[0].id

                // 正常操作
                confirm()

                function confirm(){

                    _this.$request({
                        url:api.confirm,//子表单的api地址
                        context:_this,//this
                        sendData:{id:id,updateUser:'123'},
                        successCallback:(_this,response)=>{
                            if(response.retCode == 1){

                            }else{
                                _this.appointment=true
                            }
                        }
                    })
                }
            },



            cancel(){
                this.appointment = false
            },
            createTask(){
                this.appointment=false
            },

            // 单独纯提示弹窗,type提示框类型根据 type参数配置不同的提示
            alert(type){
                let config = {
                    empty:{
                        title:'操作提示',
                        tip:'当前没有选择数据项，请选择数据后再进行操作'
                    },
                    statusErr:{
                        title:'操作提示',
                        tip:'"到货登记"只能操作状态为“通知收货”的数据，请确认状态！'
                    },
                    statusEndErr:{
                        title:'操作提示',
                        tip:'"结束卸货时间"只能操作状态为“收货中”的数据，请确认状态！'
                    },
                    onlyOne:{
                        title:'操作提示',
                        tip:'当前操作只能选择一条数据！'
                    },
                    confirmSuc:{
                        title:'确认成功',
                        tip:'上架确认成功！'
                    }

                }


                this.$alert(config[type].tip, config[type].title, {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                })
            },
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .difference {
        div {
            margin: 16px 24px 30px 8px;
        }
    }
</style>

