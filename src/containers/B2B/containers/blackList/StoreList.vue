<template>
    <div class="container">
        <div class="projection">
            <Button class="public-function-btn" @click="flushData">刷新11</Button>
            <Button class="public-function-btn" @click="diary">日志</Button>
        </div>
        <div ref="scroll">
            <Form label-width="80px">
                <FormItem label="门店搜索" style="margin-top: 15px ;position: relative; width:450px">
                    <Input placeholder=" 门店名称/详细地址/所属商户/联系人电话"
                           style="width:400px"
                           v-model="storeSearch"

                    />
                    <span class="el-icon-search goodsSearch" @click="getlist"></span>
                </FormItem>
            </Form>

            <Table
                :data="tableData"
                highlight-current-row
                style="width: 100%"
                border
                slot="empty"
                @row-click="chooseRow"
                ref="storeTable"

            >
                <TableColumn type="index" width="100" label="序号"></TableColumn>
                <TableColumn property="shopName" label="门店名称"></TableColumn>
                <TableColumn property="address" label="详细地址"></TableColumn>
                <TableColumn property="salesman" label="所属商户"></TableColumn>
                <TableColumn property="mainLinkmanPhone" label="联系人电话"></TableColumn>

            </Table>
            <!--分页-->
            <Pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length||0"
                class="f_r"
            >
            </Pagination>
            <!--浮框-->
            <FloatFrame
                :isActive="isActive"
                ref="floatFrame"
                :detail="detail"
                @getState="changeState"
                @getlist="getlist"
            ></FloatFrame>
            <!--<div class="floatFrame">
                <div>
                    <div>
                        黑名单
                    </div>

                </div>
                <div>
                    <p></p>
                    <div>
                        <p>醉美人便利店商品黑名单</p>
                        <Radio class="radio" v-model="radio" label="使用渠道黑名单"></Radio>
                        <Radio class="radio" v-model="radio" label="使用门店黑名单"></Radio>
                        &lt;!&ndash;功能按钮&ndash;&gt;

                        <p style="margin-top: 10px" v-show="1">
                            <Button size="small">新增</Button>
                            <Button size="small">删除</Button>
                            <ButtonGroup style="margin-left: 10px;">
                                <Button size="small">启用</Button>
                                <Button size="small">停用</Button>
                            </ButtonGroup>
                        </p>
                        <Form label-width="80px">
                            <FormItem label="商品搜索" style="margin-top: 10px">
                                <Input placeholder=" 商品名称/商品条码/skuid"
                                       style="width:400px"
                                       v-model="goodsSearch"
                                       icon="search"
                                />
                            </FormItem>
                        </Form>
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
                            <TableColumn prop="" label="商品分类" width="100"></TableColumn>
                            <TableColumn prop="goodsCode" label="商品条码" width="100"></TableColumn>
                            <TableColumn prop="specification" label="规格" width="100"></TableColumn>
                            <TableColumn prop="brandName" label="品牌" width="100"></TableColumn>
                        </Table>

                    </div>
                </div>

            </div>-->

            <!--消息提示框-->


        </div>
    </div>
</template>
<script>
    import FloatFrame from "@B2B/containers/blackList/FloatFrame.vue"
//    import channelService from "@B2B/services/channelService.js"
    import blackListService from "@B2B/services/blackList/blackListService.js"


    export default {
        data: function () {
            return {
                storeSearch: null,
                currentPage1: 1,
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
                },
                {
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
                },
                {
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
                },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },







                ],
                isActive: false,
                pageSize:10,
                pageNum:1,
                supplierId:1,
                status:1,
                detail:{},
                count:0,
                frameState:"",

            }
        },
        components: {
            FloatFrame,
        },
        created() {

        },
        mounted(){
            this.getlist()
//            this.$refs.storeTable.setCurrentRow(this.tableData[0])
        },
        watch:{
            storeSearch(val,oldVal){
                console.log("storeSearch",111111)
                if (!val.replace(/ +/, "")) {
                    this.getlist()
                }
            }
        },
        methods: {
            /*刷新*/
            flushData(){
                console.log("reflushreflushreflushreflush")
                this.getlist()
                this.storeSearch=""
            },
            /*日志*/
            diary(){
                console.log("日志")
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.getlist()
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.getlist()

                console.log(`当前页: ${val}`)
            },
           async getlist(){
               console.log("aaaaaaaaaa")
               let data={
                  "keyWord": null,
                  "pageNum": this.pageNum,
                  "pageSize": this.pageSize,
                  "status": this.status,
                  "supplierId": this.supplierId
              }
               data.keyWord = this.storeSearch && this.storeSearch.trim()||null
                try{
                  let res=await blackListService.getListOfShopByOrg(data)
                    console.log(res)
                    if(res.data.status.statusCode==0){
                        this.tableData=res.data.result.items
                        this.$refs.storeTable.setCurrentRow(this.tableData[0])

                    }else{
                        this.$customMessage(res.data.status.statusReason,"info")
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }
            },

            changeState(newState){
               this.frameState=newState
            },
            chooseRow(row,event,column){

                if(!this.frameState){
                    this.detail=row
                    console.log(this.detail)
                    this.$refs.floatFrame.open(1)
                }else{
                    this.$customMessage("请先关闭浮框","info")
                }

            },

        },
    }
</script>
<style scoped lang="scss">
    .container {
        width: 100%;
        height: 100%;
        /*.floatFrame {
            position: absolute;
            top: 42px;
            right: 0;
            width: 70%;
            height: 800px;
            !*height:100%;*!

            !*border: 1px solid #cdcdcd;*!
            font-size: 0;

            div {
                display: inline-block;
                vertical-align: top;
            }
        }
        .floatFrame > div:nth-of-type(1) {
            margin-top: 20px;
            font-size: 12px;

            div {
                line-height: 20px;
                width: 30px;
                !*height:36px;*!
                vertical-align: middle;

            }

            width: 50px;
            height: 120px;
            line-height: 120px;
            text-align: center;
            border-radius-topleft: 5px;
            -moz-border-radius-topleft: 5px;
            border-radius-bottomleft: 5px;
            -moz-border-radius-bottomleft: 5px;
            background-color: #17b0f4;
            opacity: 0.6;
            color: #fff;

        }

        .floatFrame >div:nth-of-type(2) {
            width: calc(100% - 70px);
            >p{
                height: 15px;

            }
            >div:nth-of-type(1) {
                font-size: 12px;
                width: 100%;
                padding: 10px;
                height: 90%;
                z-index: 10;
                background-color: #fff;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                >p:nth-of-type(1) {
                    color: dodgerblue;
                    margin-bottom: 10px;

                }
                >p:nth-of-type(2) {
                    margin-bottom: 10px;

                }
            }

        }
*/
        .goodsSearch{
            position: absolute;
            top:7px;
            right:-33px;
            color: lightgray;
            width:30px;
            height:30px;

            line-height:30px;
            text-align: center;
            background-color: #fff;

        }
    }


</style>
