<template>
    <div class="floatFrame" :class="{openAnimate:state,closeAnimate:!state}">
        <div>
            <div @click=floatWithDraw>
                黑名单
            </div>

        </div>
        <div @click.once="watchTime">
            <p></p>
            <div>
                <p>{{detail.shopName}}</p>
                <RadioGroup v-model="radio">
                    <Radio class="radio" label="0">使用渠道黑名单</Radio>
                    <Radio class="radio" label="1">使用门店黑名单</Radio>
                </RadioGroup>
                <!--功能按钮-->

                <p style="margin-top: 10px" v-show="radio==1">
                    <Button size="small" @click="blackDialog">新增</Button>
                    <Button size="small" @click="deleteGoods" :disabled="tableData.length==0">删除</Button>
                    <ButtonGroup style="margin-left: 10px;">
                        <Button size="small" :disabled="startDisabled" @click="changeStatus(1)">启用</Button>
                        <Button size="small" :disabled="endDisabled" @click="changeStatus(0)">停用</Button>
                    </ButtonGroup>
                </p>
                <Form label-width="80px">
                    <FormItem label="商品搜索" style="margin-top: 10px;position: relative">
                        <Input placeholder=" 商品名称/商品条码/skuid"
                               style="width:400px"
                               v-model="goodsSearch"

                        />

                        <span class="el-icon-search goodsSearch" @click="goodsSearchHandle"></span>
                    </FormItem>
                </Form>

                <Table
                    :data="tableData"
                    border
                    slot="empty"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @selection-change="goodsSelectChange"
                    ref="multipleTable1"
                    @select="goodsSelection"
                    @select-all="goodsSelection"
                    @row-click="jumpToCostorder"

                >
                    <TableColumn type="index" label="序号" width="100"></TableColumn>
                    <TableColumn type="selection" align="center" width="100"></TableColumn>
                    <TableColumn prop="goodId" label="SKUID" width="200"></TableColumn>
                    <TableColumn prop="goodName" label="商品名称"></TableColumn>
                    <TableColumn prop="status" label="状态" width="100">
                        <template slot-scope="scope">
                            <i>{{scope.row.status==0?"停用":"启用"}}</i>
                        </template>
                    </TableColumn>
                    <TableColumn prop="goodCode" label="商品条码" width="100"></TableColumn>
                    <TableColumn prop="goodSpec" label="规格" width="100"></TableColumn>
                    <TableColumn prop="brandName" label="品牌" width="100"></TableColumn>
                </Table>
                <Pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total">
                </Pagination>
                <!--公用组件行内漂浮按钮-->
                <tooltip name="costorder3" v-show="radio==1">
                    <el-button size="mini" @click.prevent="deleteGoods">删除</el-button>
                    <el-button size="mini" @click="changeStatus(3)">{{templateTableData[0]&&templateTableData[0].status == 0 ? "启用" : "停用"}}</el-button>

                </tooltip>

                <div class="noGoods" v-show="!tableData.length">当前黑名单无商品</div>


                <!--切换黑名单确认弹出框-->
                <Dialog
                    :title="radio==0?'使用渠道黑名单':'使用门店黑名单'+'确认'"
                    :visible.sync="dialogVisible"
                    size="tiny"
                >
                    <span>确定{{radio==0?"使用渠道黑名单":"使用门店黑名单"}}吗?</span>
                    <p>{{radio==0?"使用渠道黑名单":"使用门店黑名单"}}后,对应的渠道黑名单将失效!</p>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelChange">取 消</el-button>
                        <el-button type="primary" @click="sureChange">确 定</el-button>
                    </span>
                </Dialog>

                <!--弹框start-->
                <Dialog
                    title="新增商品黑名单"
                    :visible.sync="blackDialogVisible"
                    size="small"
                >
                    <Form :inline="true" class="demo-form-inline">
                        <FormItem label="商品分类">
                            <Select v-model="value" placeholder="请选择">
                                <Option
                                    v-for="item in blackGoodsOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="商品">
                            <Input placeholder="联系人/联系人电话" v-model="diaKeyWord"/>
                        </FormItem>
                        <el-button @click="addGoodsSearch">查询</el-button>
                    </Form>
                    <div>
                        <Table
                            :data="addBlackTableData"
                            border
                            slot="empty"
                            style="width: 100%"
                            :highlight-current-row="true"
                            @selection-change="handleSelectionChange"
                            ref="multipleTable"
                            @select="dialogSelection"
                            @select-all="dialogSelection"
                        >
                            <TableColumn type="index" label="序号" width="100"></TableColumn>
                            <TableColumn type="selection" align="center" width="100"></TableColumn>
                            <TableColumn prop="goodsId" label="SKUID" width="200"></TableColumn>
                            <TableColumn prop="goodsName" label="商品名称"></TableColumn>
                            <TableColumn prop="allLevelDet" label="商品分类" width="100"></TableColumn>
                            <TableColumn prop="goodsCode" label="商品条码" width="100"></TableColumn>
                            <TableColumn prop="specification" label="规格" width="100"></TableColumn>
                            <TableColumn prop="brandName" label="品牌" width="100"></TableColumn>
                        </Table>
                        <!-- <Pagination v-show="true"
                                     @size-change="handleSizeChange"
                                     @current-change="handleCurrentChange"
                                     :current-page="currentPage4"
                                     :page-sizes="[100, 200, 300, 400]"
                                     :page-size="100"
                                     layout="total, sizes, prev, pager, next, jumper"
                                     :total="400"
                                     class="f_r"
                         >
                         </Pagination>-->
                        <div class="f_r">共<i>{{addBlackTableData.length}}</i>条</div>

                    </div>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="blackDialogVisible = false">取消</el-button>
    <el-button type="warning" @click="addSuccess">保存</el-button>
  </span>
                </Dialog>

                <!--删除确认框-->
                <Dialog
                    title="删除提示"
                    :visible.sync="removeGoodsVisible"
                    size="tiny"
                >
                    <span>确定要删除吗?删除后将不可恢复!</span>
                    <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="cancelRemoveGoods()">取 消</el-button>
    <el-button type="primary" @click="sureRemoveGoods">确 定</el-button>
  </span>
                </Dialog>

                <!--弹框end-->


            </div>
        </div>

    </div>
</template>
<script>
//    import channelService from "@B2B/services/channelService.js"
    import blackListService from "@B2B/services/blackList/blackListService.js"
    import goodsService from "@B2B/services/channel/goodsService.js"


    export default {
        props: ["isActive", "detail"],
        data: function () {
            return {
                radio: " ",
                copyRadio:2,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                goodsSearch: null,
                state: true,
                buttonShow: false,
                supplierId: 1,
                dialogVisible: false,
                currentPage4: 1,
                pageSize:10,
                pageNum:1,
                templateTableData:[],
                startDisabled:true,
                endDisabled:true,

                blackDialogVisible:false,
                value:null,
                blackGoodsOptions:[
                    {
                        label:"1",
                        value:"1",
                    },
                    {
                        label:"2",
                        value:"2",
                    }
                ],
                diaKeyWord:null,
                addBlackTableData:[],
                removeGoodsVisible:false,



            }
        },
        watch: {
            goodsSearch(val, oldVal) {
                if (!val.replace(/ +/, "")) {
                    this.goodsSearchHandle()
                }
            },
            detail:{
                handler:function (val,oldVal) {
                    console.log(val, oldVal,"aaaaaaaaaaa")
//                    this.radio=this.detail.salesman
                    this.open()
                },
                deep:true,
            },
            radio(val,oldVal){
                console.log(val, oldVal,"watch到的变化")
                if(oldVal==" "&&oldVal!=this.copyRadio){
                    this.copyRadio=val
                    return
                }
                if(this.radio==this.copyRadio){
                    this.copyRadio=1
                    return
                }
                this.dialogVisible=true

            },
            state(val){
                this.$emit("getState",val)
            },
        },

        created(){
            window.timer=setTimeout(()=>{
                console.log("定时器")
                this.state = false

            },3000)
        },
        methods: {
            watchTime(){
                clearTimeout(window.timer)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
                this.pageSize=val
                this.goodsSearchHandle()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.pageNum=val
                this.goodsSearchHandle()
            },
            handleSelectionChange() {
            },

            floatWithDraw() {
//                this.state = false
                this.state = false
                this.copyRadio=" "
                this.radio=" "
                console.log(this.radio,"关闭时重置状态")
            },

            open(flag) {
                this.state = true
                /*浮框出现就请求默认数据*/
                if(flag)return

                this.searchAll()


            },
            close() {
                this.state = false
                this.copyRadio=" "
                this.radio=" "
                console.log(this.radio,"关闭时重置状态")
//                this.$emit("getlist")
            },

            sureChange(){
                console.log("change前",this.copyRadio, this.radio)
                this.dialogVisible = false
                this.copyRadio=this.radio
                this.getBlackList()

                console.log("change后",this.copyRadio, this.radio)

            },
            cancelChange(){
               this.dialogVisible = false
                this.radio=this.copyRadio


            },
            /*点击出现行内按钮*/
            jumpToCostorder(row, event, column) {
                if(this.radio==0)return
                this.templateTableData = [row]
                console.log(row,this.templateTableData)
                if (column.type == "selection") return
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder3')

            },
            /*已选商品*/
            goodsSelection(val){
                this.templateTableData = val
            },

            goodsSelectChange(val){
                if(val.length==1){
                    console.log(val,"bbbbbbbb")
                    val[0].status==1?this.endDisabled=false:this.startDisabled=false
                }else if(val.length==0){
                    this.endDisabled=true
                    this.startDisabled=true
                }else{
                    this.endDisabled=false
                    this.startDisabled=false
                }
            },

            /*增加商品*/
            addGoodsSearch(){

            },
            dialogSelection() {
            },
            /*展示页商品切换查询*/
            async goodsSearchHandle(){

                let data={
                    "keyWord":null,
                    "pageNum":this.pageNum,
                    "pageSize": this.pageSize,
                    "storeId": this.detail.id,
                    "supplierId": this.supplierId
                }
                data.keyWord = this.goodsSearch && this.goodsSearch.trim()||null

                try{
                        let res
                    /*1为门店黑名单下的查询,否则是渠道黑名单下的查询*/
                    if(this.radio==1){
                       res=await blackListService.getListB2bStoreGoodsBlacksByPage(data)

                    }else{
                        res=await blackListService.getListB2bcanalGoodsBlacksByPage(data)

                    }
                    console.log(res,data)
                    if(res.data.status.statusCode == 0){

                        this.tableData=res.data.result.list
                        this.tableData.total=res.data.result.total
                    }else{
                        this.$customMessage(res.data.status.statusReason,"info")
                    }
                }catch(e){
                    this.$customMessage(e,"error")
                }
            },
            /*统一查询*/
            async searchAll(){
              let data={
                  "storeId": this.detail.id,
                  "supplierId": this.supplierId
              }
              try{
                let res=await blackListService.getListB2bCanaleStoreGoodsBlacks(data)
                  this.radio=res.data.attachment.type+''
                  console.log(res, data)
                  if(res.data.status.statusCode==0){

                      this.tableData=res.data.result.list

                  }else{
                      console.log(res.data.status.statusReason)
                      this.$customMessage(res.data.status.statusReason,"info")
                  }
              }catch(e){
                  console.log(e)
              }
            },


            /*更改status--启用/停用*/
            async changeStatus(status){
                if(status==3){
                    status=this.templateTableData[0].status==0?1:0
                }
                console.log(status)
                let url=""
                let goodsIds=[]
                console.log(this.templateTableData)
                this.templateTableData.map((item)=>{
                    goodsIds.push(item.goodId)
                })
                let data={
                    "goodsIds": goodsIds,
                    "status": status,
                    storeId:this.detail.id,/*门店id*/
                    suppplierId:this.supplierId,

                }
                console.log(data)
                try{
                    let res=await blackListService.setB2bStoreGoodsBlackUpOrDown(data)
                    console.log(res,this.templateTableData)
                    if(res.data.status.statusCode==0){
                        this.templateTableData.map((item)=>{
                            this.tableData.map((i)=>{
                                if(i.goodId==item.goodId){i.status=status}

                            })
                        })
                        this.$refs.multipleTable1.clearSelection()
                        this.$customMessage(status==1?"启用成功":"停用成功","success")

                    }else{
                        console.log(res.data.status.statusReason)

                    }
                    console.log(data,res)
                }catch(e){
                    console.log(e)
                }


            },

            /*首次获取商品列表*/
            async getBlackList() {
                let type=Number(this.radio)
                let storeId = this.detail.id
                let data = {
                    type,
                    supplierId: this.supplierId,
                    storeId,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum,
                }

                try {
                    let res = await blackListService.changeB2bStoreGoodsBlack(data)
                    console.log(res,data)
                    if (res.data.status.statusCode == 0) {
                        this.tableData=res.data.result.list
                    } else {
                        this.$customMessage(res.data.status.statusReason,"info")
                        console.log(res.data.status.statusReason)
                    }
                } catch (e) {
                    console.log(e)
                }

            },
            /*增加弹出框相关方法*/
            blackDialog(){
                this.blackDialogVisible=true
                this.addGoodsSearch()

            },
            async addGoodsSearch() {
                let data = {
                    "keyWord": null,
                    "pageNum": 1,
                    "pageSize": 10000,
                    "supplierId": this.supplierId
                }
                data.keyWord = this.diaKeyWord && this.diaKeyWord.trim()
                try {
                    let res = await goodsService.getBaseGoods(data)
                    console.log(data, res)
                    if (res.data.status.statusCode == 0) {
                        this.addBlackTableData = res.data.result.items
//                        this.listNum = res.data.result.items.length
                    } else {
                        console.log(res.data.status.statusReason)
                    }

                } catch (e) {
                    console.log(e)
                }


            },
            /*弹出框中复选框选中的内容*/
            dialogSelection(val) {
                this.templateTableData = val
            },
            /*增加商品*/
           async addSuccess(){
               this.blackDialogVisible = false
               let goodId = []
               this.templateTableData.map((item) => {
                   goodId.push(item.goodsId)
               })
               let data1 = {
                   "goodId": goodId,
                   "supplierId": this.supplierId,
                   storeId:this.detail.id,
               }
               try {
                   let res1 = await blackListService.addB2bStoreGoodsBlackBatch(data1)
                   console.log("增加成功", res1,data1)

                   if (res1.data.status.statusCode == 0) {
                       this.goodsSearchHandle()

                   } else {

                       this.$customMessage(res1.data.status.statusReason,"info")
                       this.$refs.multipleTable.clearSelection()

                   }
               } catch (e) {
                   console.log(e)
               }
           },
            /*删除商品*/
            deleteGoods(){
                this.removeGoodsVisible = true
            },
            /*取消删除后,清除所有选中样式*/
            cancelRemoveGoods() {
                this.removeGoodsVisible = false
                this.$refs.multipleTable1.clearSelection()
            },
            /*确定删除已选商品*/
            async sureRemoveGoods() {
                this.removeGoodsVisible = false
                let goodId=[]
                this.templateTableData.map((item) => {
                    goodId.push(item.id)
                })
                let data={
                    ids:goodId,
                    "supplierId": this.supplierId,
                    storeId:this.detail.id,
                }
                try {
                    let res1 = await blackListService.delB2bStoreGoodsBlackBatch(data)
                    console.log("删除成功", data, res1)

                    if (res1.data.status.statusCode==0) {
                        console.log("删除成功", data, res1)
                        /*重新拉取新数据*/
                        this.goodsSearchHandle()

                    } else {
                        console.log(res1.data.status.statusReason)
                    }
//

                } catch (e) {
                    console.log(e)
                }



            },





        }
    }
</script>
<style scoped lang="scss">
    .floatFrame {
        position: absolute;
        top: 42px;
        right: calc(-70% + 50px);
        width: 70%;
        height: 800px;
        /*height:100%;*/

        /*border: 1px solid #cdcdcd;*/
        font-size: 0;

        div {
            display: inline-block;
            vertical-align: top;
        }
        .noGoods {
            position: absolute;
            top: 50%;
            left: 50%;

        }

    }

    .openAnimate {
        right: 0;
        transition: right 1s linear;
    }

    .closeAnimate {
        right: calc(-70% + 50px);
        transition: right 1s linear;
    }

    .floatFrame > div:nth-of-type(1) {
        margin-top: 20px;
        font-size: 12px;

        div {
            line-height: 20px;
            width: 30px;
            vertical-align: middle;

        }

        width: 50px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border-radius-topleft: 5px;
        -webkit-border-radius-topleft: 5px;
        border-radius-bottomleft: 5px;
        --webkit-border-radius-topleft-border-radius-bottomleft: 5px;
        background-color: #17b0f4;
        opacity: 0.6;
        color: #fff;
        cursor: pointer;

    }

    .floatFrame > div:nth-of-type(2) {
        width: calc(100% - 70px);
        height: 100%;
        > p {
            height: 15px;

        }
        > div:nth-of-type(1) {
            font-size: 12px;
            width: 100%;
            padding: 10px;
            height: 100%;
            /*z-index: 10;*/
            background-color: #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            > p:nth-of-type(1) {
                color: dodgerblue;
                margin-bottom: 10px;

            }
            > p:nth-of-type(2) {
                margin-bottom: 10px;

            }
        }
        .goodsSearch{
            position: absolute;
            top:7px;
            right:-7px;
            color: lightgray;
            width:30px;
            height:30px;

            line-height:30px;
            text-align: center;
            background-color: #fff;


        }

    }


</style>
