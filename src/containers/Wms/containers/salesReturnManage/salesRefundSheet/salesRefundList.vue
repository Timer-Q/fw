<template>
    <div class="wms-items">
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
                            <div class="inblock">
                                <span class="hspace">货主</span>
                                <el-select v-model="model.ownerId" placeholder="请选择">
                                    <el-option label="全部" value="0"></el-option>
                                    <el-option label="否" value="1"></el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">状态</span>
                                <el-select v-model="model.status" placeholder="请选择">
                                    <el-option label="待收货" value="100"></el-option>
                                    <el-option label="待质检" value="200"></el-option>
                                    <el-option label="质检中" value="300"></el-option>
                                    <el-option label="已质检" value="400"></el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">销退类型</span>
                                <el-select v-model="model.orderType" placeholder="请选择">
                                    <el-option label="拒收" value="1"></el-option>
                                    <el-option label="取消订单" value="2"></el-option>
                                    <el-option label="普通销退" value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">客户名称</span>
                                <el-input v-model="model.customerName"></el-input>
                            </div>
                            <span class="hspace">客户联系人</span>
                            <el-input v-model="model.customerContacter"></el-input>
                        </div>
                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                        </div>
                    </div>
                    <!--表单头部    end-->

                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click="rowClick" @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn prop="status" label="状态" width=""></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                            <TableColumn prop="saleReturnNo" label="销退单号" width="">
                                <template slot-scope="scope">
                                    <a href="javascript:;" @click.stop="seeDetails(scope.row.saleReturnNo)">{{ scope.row.saleReturnNo }}</a>
                                </template>
                            </TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="tempGoodsPositionCode" label="收货暂存位"  width="100"></TableColumn>
                            <TableColumn prop="customerName" label="客户名称"  width=""></TableColumn>
                            <TableColumn prop="customerContacter" label="客户联系人"  width="100"></TableColumn>
                            <TableColumn prop="customerContactInfo" label="客户联系方式"  width="100"></TableColumn>
                            <TableColumn prop="customerAddrId" label="客户地址" width=""> </TableColumn>
                            <TableColumn prop="driver" label="司机" width=""> </TableColumn>
                            <TableColumn prop="carNo" label="车牌号" width=""> </TableColumn>
                            <TableColumn prop="" label="原订单号" width=""> </TableColumn>
                            <TableColumn prop="outBoundOrderNo" label="出库单号" width=""> </TableColumn>
                            <TableColumn prop="deliveryCompanyName" label="承运商名称" width="100"> </TableColumn>
                            <TableColumn prop="waybillNo" label="运单号" width=""> </TableColumn>
                            <TableColumn prop="varietyQty" label="品种" width=""> </TableColumn>
                            <TableColumn prop="planQty" label="应收数量" width=""> </TableColumn>
                            <TableColumn prop="actualQty" label="实收数量" width=""> </TableColumn>
                            <TableColumn prop="qualityControlPersonName" label="质检人" width=""> </TableColumn>
                            <TableColumn prop="qualityControlStartTime" label="质检开始时间" width="100"> </TableColumn>
                            <TableColumn prop="qualityControlEndTime" label="质检结束时间" width="100"> </TableColumn>
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
                            <p>销退单号：{{selectionDetailLabelNo}}</p>
                            <div class="information-list">
                                <Table :data="selectionDetailList" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="unitConvertText" label="整零转换"  width=""></TableColumn>
                                    <TableColumn prop="planQty" label="应收数量"  width=""></TableColumn>
                                    <TableColumn prop="actualQty" label="实收数量" width=""></TableColumn>
                                    <TableColumn prop="unitId" label="单位" width=""></TableColumn>
                                    <TableColumn prop="reason" label="退货原因" width=""></TableColumn>
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
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/salesReturnManage/salesRefundSheet/salesRefundSheetService'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/salereturnorder/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/salereturnorder/get',//子列表
    }
    export default {
        created(){
            _this = this
            _this.api =api
        },
        data () {
            return {
                /*页签*/
                tag:'wms_salesReturnManage_salesRefundSheet',
                system:'/wms',
                titleName:'销退单管理',
                tableData:[], //表单数据 数组
                multipleSelection:[],// 当前选择的数据项目
                selectionDetailList:[],// 子表单明细列表
                selectionDetailLabelNo:'-',//子表单表头数据单号

                model: {
                    ownerId: '0',
                    status: '',
                    orderType: '',
                    customerName: '',
                    customerContacter: ''
                },
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
                   /* pageNumber:1, // 起始页面（从1开始）一个神奇的名字
                    pageSize:10,
                    pageStart:0 //起始条数（从0开始）*/
                },
                // 分页
                pagination:{
                    pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    total:0,
//                    currentPage:1,
                },
                tableRowData: {}
            }
        },
        components:{
            pagination
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,

            getDetailList(id,uri) {
                _this.$request({
                    url:uri,// 子表单的api地址
                    context:_this,//this
                    sendData:{id:id},//主表单的id
                    successCallback:(_this,response)=>{
                        // 结果赋值给实际的明细表格绑定的数据项。
                        _this.selectionDetailList = [response]
                        //获取表头编号
                        _this.selectionDetailLabelNo = _this.curRow.saleReturnNo
                        //获取编号
                        this.tableRowData = _this.curRow
                    }
                })
            },
            // 查看详情
            seeDetails(rowData){
                let detailsTabObj = {
                    name: `${rowData}-查看`,
                    tag: `${rowData}_wms_salesReturnManage_salesRefundSheet_particulars`,
                    parentTag: ''
                }
                window.localStorage.setItem('wms_sales_refund_list', JSON.stringify({rowData, detailList: this.selectionDetailList }))
                this.$root.bus.$emit('sales_refund_sheet', detailsTabObj.name, detailsTabObj.tag, '')
                console.log(detailsTabObj.name)
            },
           /* destroy() {
                if (_this.multipleSelection.length == 0) {
                    _this.alert("empty")
                    return
                }
            },*/
           /* /!*分页*!/
            handleSizeChange(val) {
                console.log(`size每页 ${val} 条`)
                this.listQueryParam.pageSize = val

                // 默认调整页面size后从第一页开始显示
                this.listQueryParam.currentPage = 1
                this.listQueryParam.pageStart = 0

                this.getList()
            },*/
           /* handlePageCurrentChange(val) {
                console.log(`cur当前页: ${val}`)
                this.listQueryParam.currentPage = val
                this.pagination.currentPage = val
                this.listQueryParam.pageNumber = val
                this.listQueryParam.pageStart = (val-1) * this.listQueryParam.pageSize // 分页接口设计不合理，还得前端传送总体第几条，或者是bug，不能这么搞啊。。。。

                this.getList()
            },*/
            // 获取主列表
        //    getList(param){
        //        let _this = this
        //        let _param = param || {}
        //        let org = Object.assign({},_this.listQueryParam, _param)
        //        _this.$request({
        //            url:api.getlist,  // 获取列表接口
        //            sendData:org,   // 参数
        //            context:_this,
        //            successCallback:function(context, response){
        //                context.tableData=response   // 结果赋值给实际的明细表格绑定的数据项。
        //                if(typeof response.count == 'number'){
        //                    _this.pagination.total = response.count
        //                }
        //                if(context.tableData.length == 0){return}

        //                // 需 默认选中第一行，并请求相应的详情。要等到表格渲染完毕之后再执行选择和激活样式添加。
        //                setTimeout(()=>{
        //                    //_this.$refs.pastCodeTable.toggleRowSelection(_this.tableData[0])  //默认选择第一行 带复选框选中状态
        //                    let $tr = document.getElementById('pastCodeTable').getElementsByTagName('tr')[1] // 第一行数据，表头也是使用的tr标签。
        //                    if($tr){
        //                        $tr.className = 'current-row '+ $tr.className
        //                    }
        //                    //默认获取第一行数据对应的子表单单号
        //                    _this.selectionDetailLabelNo = _this.$refs.pastCodeTable.data[0].inboundNotifyNo
        //                    // 默认获取第一行数据的详情列表
        //                    _this.getDetailList(_this.$refs.pastCodeTable.data[0].id, api.getlabelDetailList)
        //                },20)
        //            }
        //        })
        //    },

            // 需要在主表table上绑定 @row-click事件
            // 行点击事件 ,主要功能展示贴单详情列表
//            rowClick(row, event, column){
//                console.log("row %o, event %o, column %o",row, event, column)
//                //获取子表单任务单号
//                _this.selectionDetailLabelNo = row.inboundNotifyNo
//                //获取明细列表
////                _this.getDetailList(row.id, api.getlabelDetailList)
//                /* _this.getConfirmList(row.id, api.confirm)*/
//            },
            // 获取明细列表，id主表项数据的id，uri获取明细的接口地址
//            getDetailList(id,uri){
//                _this.$request({
//                    url:uri,//子表单的api地址
//                    context:_this,//this
//                    sendData:{receivingInboundId:id},//主表单的id
//                    successCallback:(_this,response)=>{
//                        _this.selectionDetailList = response  // 结果赋值给实际的明细表格绑定的数据项。
//                    }
//                })
//            },
//            confirmList(id){
//                _this.$request({
//                    url:api.confirm,
//                    context:_this,
//                    sendData:{id:id},
//                    successCallback:(_this,response)=>{
//                        _this.differenceDetails = response
//                    }
//                })
//            }
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

