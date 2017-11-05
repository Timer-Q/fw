<template>
    <div class="wms-items">
        <div class="projection">
            <ButtonGroup>
                <Button class="public-function-btn" @click="finish">完成容器F4</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button class="public-function-btn" @click="resume">继续质检F5</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button class="public-function-btn">日志</Button>
            </ButtonGroup>
        </div>
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
                                <span class="hspace">销退批次号</span>
                                <el-input v-model="listQueryParam.batchNo"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">容器号</span>
                                <el-input v-model="listQueryParam.containerCode"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">状态</span>
                                <el-select v-model="listQueryParam.status" placeholder="请选择">
                                    <el-option label="质检中" value="100"></el-option>
                                    <el-option label="已质检" value="200"></el-option>
                                    <el-option label="上架中" value="300"></el-option>
                                    <el-option label="已上架" value="400"></el-option>
                                </el-select>
                            </div>
                            <div class="inblock">
                                <span class="hspace">销退单号</span>
                                <el-input v-model="listQueryParam.saleReturnNo"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">质检人</span>
                                <el-input v-model="listQueryParam.qcUserName"></el-input>
                            </div>
                            <el-collapse-transition>
                                <div v-show="more">
                                    <div class="vehicle-find">
                                        <div class="vehicle-data">
                                            <div class="inblock">
                                                <span class="hspace">质检开始时间</span>
                                                <el-date-picker
                                                    v-model="listQueryParam.qcStartTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间">
                                                </el-date-picker>
                                                <i class="iconfont icon-rili"></i>
                                                <span>至</span>
                                                <el-date-picker
                                                    v-model="listQueryParam.qcEndTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间">
                                                </el-date-picker>
                                                <i class="iconfont icon-rili"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-transition>

                        </div>
                        <div class="vehicle-btn">
                            <el-button @click="getList">查询</el-button>
                            <a href="javascript:" @click="dialogTableVisible = true">高级查询</a>
                            <el-button :icon="more?'arrow-up':'arrow-down'" @click="more=!more"></el-button>
                        </div>
                    </div>
                    <!--表单头部    end-->

                    <!--表单  start-->
                    <div class="information-list">
                        <Table id="pastCodeTable" :data="tableData" ref="pastCodeTable" @row-click="rowClick" @selection-change="handleSelectionChange" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn type="index" label="序号" width="70"></TableColumn>
                            <TableColumn prop="status" label="状态" width=""></TableColumn>
                            <TableColumn prop="warehouseName" label="仓库"  width=""></TableColumn>
                            <TableColumn prop="batchNo" label="销退批次单号" width="100"></TableColumn>
                            <TableColumn prop="ownerName" label="货主"  width=""></TableColumn>
                            <TableColumn prop="containerCode" label="容器号"  width=""></TableColumn>
                            <TableColumn prop="tempPositionCode" label="质检暂存位"  width="100"></TableColumn>
                            <TableColumn prop="goodBad" label="正残属性"  width=""></TableColumn>
                            <TableColumn prop="varietyQty" label="品种数"  width=""></TableColumn>
                            <TableColumn prop="qcQty" label="质检数量" width=""> </TableColumn>
                            <TableColumn prop="putawayQty" label="上架数量" width=""> </TableColumn>
                            <TableColumn prop="qcUserName" label="质检人" width=""> </TableColumn>
                            <TableColumn prop="qcStartTime" label="质检开始时间" :formatter="dateFormat" width="100"> </TableColumn>
                            <TableColumn prop="qcEndTime" label="质检结束时间" width="100"> </TableColumn>
                            <TableColumn prop="putawayUserName" label="上架人" width=""> </TableColumn>
                            <TableColumn prop="putawayStartTime" label="上架开始时间" width="100"> </TableColumn>
                            <TableColumn prop="putawayEndTime" label="上架结束时间" width="100"> </TableColumn>
                        </Table>
                    </div>
                    <!--表单  end-->

                    <!--分页    start-->
                    <pagination :pagination='pagination' @pagechange = 'getList'></pagination>
                    <!--分页    end-->

                    <!--列表展开列表    start-->
                    <div class="mainContent-b">
                        <div class="arrow-bottom arrow-box" >
                            <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        </div>
                        <!--表单  start-->
                        <div class="details-list">
                            <p>销退批次单号：{{selectionDetailLabelNo}}</p>
                            <div class="information-list">
                                <Table :data="selectionDetailList" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="saleReturnNo" label="销退单号"  width="">
                                        <template slot-scope="scope">
                                            <a href="javascript:;" @click.stop="seeDetails(scope.row)">{{ scope.row.saleReturnNo }}</a>
                                        </template>
                                    </TableColumn>
                                    <TableColumn prop="saleOrderNo" label="原订单号"  width=""></TableColumn>
                                    <TableColumn prop="goodsBarcode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="unitConvertDesc" label="整零转换"  width=""></TableColumn>
                                    <TableColumn prop="qcQty" label="质检数量"  width=""></TableColumn>
                                    <TableColumn prop="putawayQty" label="上架数量"  width=""></TableColumn>
                                    <TableColumn prop="unitName" label="单位" width=""></TableColumn>
                                    <TableColumn prop="productDate" label="生产日期" width=""></TableColumn>
                                    <TableColumn prop="expireDate" label="失效日期" width=""></TableColumn>
                                    <TableColumn prop="shelflife" label="保质期" width=""></TableColumn>
                                    <TableColumn prop="productBatchNo" label="生产批号" width=""></TableColumn>
                                    <TableColumn prop="badType" label="残品类别" width=""></TableColumn>
                                    <TableColumn prop="qcUserName" label="质检人" width=""></TableColumn>
                                    <TableColumn prop="qcTime" label="质检时间" width=""></TableColumn>
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

    import * as mainConst from '@/store/mainConst.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/salesReturnManage/salesRefundBatch/salesRefundBatchService'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/saleReturnBatchOrder/getListWithPage',//主列表 带分页
        getlabelDetailList: '/wms-inbound-server/saleReturnBatchOrder/get',//子列表
    }
    export default {
        created(){
            _this = this
            _this.api =api
        },
        data () {
            return {
                /*页签*/
                tag:'wms_salesReturnManage_salesRefundBatch',
                system:'/wms',
                titleName:'销退批次管理',
                tableData:[], //表单数据 数组
                multipleSelection:[],// 当前选择的数据项目
                selectionDetailList:[],// 子表单明细列表
                selectionDetailLabelNo:'-',//子表单表头数据单号
                curRow: {}, // 当前选中行数据
                tableRowData: {}, // 详情编 号存放
                more: false,// 查询下拉临时效果
                timeRange: [],// 时间暂时存放
                keyBordArr: {}, // 存储设置过的快捷键
                listQueryParam: { //查询
                    batchNo: '',
                    containerCode: '',
                    status: '',
                    saleReturnNo: '',
                    qcUserName: '',
                    qcStartTime: '',
                    qcEndTime: ''
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
//                value: '',
                // 获取列表查询条件分页部分
                listQueryParam:{
//                    pageNumber:1, // 起始页面（从1开始）一个神奇的名字
//                    pageSize:10,
//                    pageStart:0 //起始条数（从0开始）
                },
                // 分页
                pagination:{
//                    pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    total:10,
//                    currentPage:1,
                }
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
                    url:uri,//子表单的api地址
                    context:_this,//this
                    sendData:{id:id},//主表单的id
                    successCallback:(_this,response)=>{
                        // 结果赋值给实际的明细表格绑定的数据项。
                        _this.selectionDetailList = response.detailList // 返回对象转换数组
                        //获取表头编号
                        _this.selectionDetailLabelNo = _this.curRow.saleReturnBatchNo
                        //详情获取编号
                        this.tableRowData = _this.curRow
                    }
                })
            },
            // 查看详情
            seeDetails(rowData){
                let detailsTabObj = {
                    name: `${rowData.saleReturnNo}-查看`,
                    tag: `${rowData.saleReturnNo}_wms_salesReturnManage_salesRefundBatch_particulars`,
                    parentTag: ''
                }
                window.localStorage.setItem('wms_sales_refund_list', JSON.stringify({rowData, detailList: this.selectionDetailList }))
                this.$root.bus.$emit('sales_refund_batch', detailsTabObj.name, detailsTabObj.tag, '')
                console.log(detailsTabObj.name)
            },
            // 完成容器
            finish () {
                // 没有选择
                if (_this.multipleSelection.length == 0) {
                    _this.alert("empty")
                    return
                }
                // 状态:100=质检中,200=已质检,300=上架中,400=已上架
                // 完成容器前必需完成质检，只有完成质检状态的销退单才可以完成容器
                let stArr = _this.utilFn.getFieldArrFormObjectArr(_this.multipleSelection,'status')
                let stArrErr = stArr.filter((item)=>{return item != 200})
                let stArrOk = stArr.filter((item)=>{return item == 200})

                if(stArrErr.length > 0){
                    _this.alert(alertConfig['statusErr'])
                    return
                }
                if(stArrOk.length > 1){
                    _this.alert('onlyOne')
                    return
                }
            },
            // 继续质检
            resume () {
                let menuItem = {
                    "userId": null,
                    "authorUser": null,
                    "authorTime": null,
                    "groupId": null,
                    "permissionType": null,
                    "permissionId": 25,
                    "orgCode": null,
                    "orgName": null,
                    "resourceName": "销退质检",
                    "resourceDesc": null,
                    "belong": 104,
                    "parentId": 1,
                    "permissionShow": null,
                    "permissionGroup": null,
                    "url": "/wms/salesReturnManage/salesQualityTesting",
                    "tag": "wms_salesQualityTesting",
                    "subject": "PC",
                    "type": "菜单",
                    "status": null,
                    "childFuncs": []
                }
                let navTabData = this.$store.state.navTabData
                for (let i = 0; i < navTabData.length; i++) {
                    if (navTabData[i].url == menuItem.url) {

                        // 已经有页签了，一级tab内容不重新渲染
                        // 切换一级tab页签的激活样式
                        this.$router.push({path: '/wms/salesReturnManage/salesQualityTesting'})
                        this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: i})
                        // 从新计算一级tab位置
                        this.$root.bus.$emit("clickLastMenu", menuItem)

                        if (menuItem.url.toLowerCase().indexOf("/iframe") == 0) {
                            // 如果已经iframe中的tab已经存在，那么触发iframe中的切换事件
//                            this.$store.commit(mainConst.M_SHOW_IFRAME)
                            this.$root.bus.$emit("changeIframeTab", menuItem.url.slice(8))
                        }
                        return
                    }
                }
                menuItem.active = true
                this.$store.commit(mainConst.M_PUSH_NAVTABDATA, menuItem)
                this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: navTabData.length - 1})
                this.$router.push({path: '/wms/salesReturnManage/salesQualityTesting'})
            },
            // 快捷键设置
            keyboardShortcuts(){

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
                let kb = _this.keyboardShortcuts()

                // 完成容器 捷键
                kb.addShortcuts("f4", _this.finish)
                // 继续质检
                kb.addShortcuts("f5", _this.resume)
            },
            /* destroy() {
             if (_this.multipleSelection.length == 0) {
             _this.alert("empty")
             return
             }
             },*/
            /*分页*/
            /*  handleSizeChange(val) {
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
//            getList(param){
//                let _this = this
//                let _param = param || {}
//                let org = Object.assign({},_this.listQueryParam, _param)
//                _this.$request({
//                    url:api.getlist,  // 获取列表接口
//                    sendData:org,   // 参数
//                    context:_this,
//                    successCallback:function(context, response){
//                        context.tableData=response.dtoList   // 结果赋值给实际的明细表格绑定的数据项。
//                        if(typeof response.count == 'number'){
//                            _this.pagination.total = response.count
//                        }
//                        if(context.tableData.length == 0){return}
//
//                        // 需 默认选中第一行，并请求相应的详情。要等到表格渲染完毕之后再执行选择和激活样式添加。
//                        setTimeout(()=>{
//                            //_this.$refs.pastCodeTable.toggleRowSelection(_this.tableData[0])  //默认选择第一行 带复选框选中状态
//                            let $tr = document.getElementById('pastCodeTable').getElementsByTagName('tr')[1] // 第一行数据，表头也是使用的tr标签。
//                            if($tr){
//                                $tr.className = 'current-row '+ $tr.className
//                            }
//                            //默认获取第一行数据对应的子表单单号
//                            _this.selectionDetailLabelNo = _this.$refs.pastCodeTable.data[0].inboundNotifyNo
//                            // 默认获取第一行数据的详情列表
//                            _this.getDetailList(_this.$refs.pastCodeTable.data[0].id, api.getlabelDetailList)
//                        },20)
//                    }
//                })
//            },
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
            this.addShortcuts()
        },
        beforeDestroy(){
            _this.keyBordArr = {}
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>

