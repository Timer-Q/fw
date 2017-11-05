<template>
    <div class="b2b_channelAdd">
        <div class="projection">
            <Button class="public-function-btn" @click="jumpToEditChannel">修改</Button>

        </div>
        <div ref="OutBox">
            <div class="channelMsg" :class="{close:!closeStyle1}">
                <span @click="closeStyle1=!closeStyle1"><i class="el-icon-d-arrow-left"></i>渠道信息</span>
                <div v-show="closeStyle1">
                    <p>
                        <!--<i>*</i>-->
                        <label>渠道名称</label>
                        <input type="text" :value="channelItem.channelDetail.canalName" disabled>

                    </p>
                    <p>
                        <label>渠道描述</label>
                        <textarea cols="30" rows="10" disabled
                                  v-model='channelItem.channelDetail.canalDescribe'></textarea>

                    </p>
                </div>
            </div>
            <div class="channelMsg channelCum" :class="{close:!closeStyle2}">
                <span @click="closeStyle2=!closeStyle2"><i
                    class="el-icon-d-arrow-left"></i>渠道客户（{{channelItem.channelDetail.canalName}}）</span>
                <div v-show="closeStyle2">
                    <Form :inline="true"  class="demo-form-inline">
                        <FormItem label="客户类型">
                            <Select placeholder="客户类型" v-model="customType ">
                                <Option
                                    v-for="item in customCategory"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="客户查询">
                            <Input placeholder="客户名称/联系人/联系人电话" v-model="customKeyWord"/>
                        </FormItem>
                        <!--<FormItem label="联系人">-->
                        <!--<Input placeholder="联系人/联系人电话"/>-->
                        <!--</FormItem>-->
                        <Button @click="customSearch">查询</Button>
                    </Form>
                    <Table
                        :data="customData"
                        border
                        slot="empty"
                        style="width: 100%"
                        :highlight-current-row="true"
                        @selection-change="customSelectionChange"
                        ref="multipleTable"
                    >
                        <TableColumn type="index" label="序号" width="180"></TableColumn>
                        <TableColumn type="selection" align="center" width="100"></TableColumn>
                        <TableColumn prop="companyName" label="客户名称"></TableColumn>
                        <TableColumn prop="address" label="地址"></TableColumn>
                        <TableColumn prop="identityName" label="主联系人" width="180"></TableColumn>
                        <TableColumn prop="mobilePhone" label="主联系人电话"></TableColumn>
                        <TableColumn prop="storeType" label="客户类型" width="180">
                            <template slot-scope="scope">
                                <i>{{scope.row.storeType==0?"个体":"连锁"}}</i>
                            </template>
                        </TableColumn>
                        <TableColumn prop="enabledShopNumber" label="门店数量"></TableColumn>
                    </Table>
                    <Pagination v-show="true"
                                @size-change="customSizeChange"
                                @current-change="customCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="customTotal"
                                class="f_r"
                    >
                    </Pagination>
                </div>

            </div>
            <div class="channelMsg channelCum" :class="{close:!closeStyle3}">
                <span @click="closeStyle3=!closeStyle3"><i
                    class="el-icon-d-arrow-left"></i>渠道商品黑名单（{{channelItem.channelDetail.canalName}}）</span>
                <div v-show="closeStyle3">
                    <Form :inline="true" class="demo-form-inline">
                        <FormItem label="状态">
                            <Select placeholder="全部" v-model="status">
                                <Option label="启用" :value="1"></Option>
                                <Option label="停用" :value="0"></Option>
                            </Select>
                        </FormItem>
                        <FormItem label="商品查询">
                            <Input placeholder="商品名称/条码品牌" v-model="goodsKeyWord"/>
                        </FormItem>
                        <Button @click="goodsSearch">查询</Button>
                    </Form>
                    <Table
                        :data="goodsData"
                        border
                        slot="empty"
                        style="width: 100%"
                        :highlight-current-row="true"
                        @selection-change="goodsSelectionChange"
                        ref="multipleTable"
                    >
                        <TableColumn type="index" label="序号" width="180"></TableColumn>
                        <TableColumn type="selection" align="center" width="100"></TableColumn>
                        <TableColumn prop="goodName" label="商品名称"></TableColumn>
                        <TableColumn prop="goodCode" label="条码"></TableColumn>
                        <TableColumn prop="goodSpec" label="规格" width="180"></TableColumn>
                        <TableColumn prop="brandName" label="品牌"></TableColumn>
                        <TableColumn prop="status" label="状态" width="180">
                            <template slot-scope="scope">
                                <i>{{scope.row.status==0?"停用":"启用"}}</i>
                            </template>
                        </TableColumn>
                    </Table>
                    <Pagination v-show="true"
                                @size-change="goodsSizeChange"
                                @current-change="goodsCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="goodsTotal"
                                class="f_r"
                    >
                    </Pagination>
                </div>


            </div>
<!--
            <Dialog
                title="客户渠道新增"
                :visible.sync="dialogVisible"
                size="small"
                :before-close="handleClose">
                <Form :inline="true" :model="formInline" class="demo-form-inline">
                    <FormItem label="客户">
                        <Input placeholder="客户名称"/>
                    </FormItem>
                    <FormItem label="联系人">
                        <Input placeholder="联系人/联系人电话"/>
                    </FormItem>
                    <Button @click="goodsSearch">查询</Button>
                </Form>
                <div>
                    <Table
                        :data="tableData"
                        border
                        slot="empty"
                        style="width: 100%"
                        :highlight-current-row="true"
                        @selection-change="goodsSelectionChange"
                        ref="multipleTable"
                    >
                        <TableColumn prop="date" label="序号" width="180"></TableColumn>
                        <TableColumn type="selection" align="center" width="100"></TableColumn>
                        <TableColumn prop="address" label="客户名称" width="200"></TableColumn>
                        <TableColumn prop="address" label="地址"></TableColumn>
                        <TableColumn prop="address" label="主联系人" width="100"></TableColumn>
                        <TableColumn prop="address" label="主联系人电话" width="100"></TableColumn>
                        <TableColumn prop="address" label="客户类型" width="100"></TableColumn>
                        <TableColumn prop="address" label="门店数量" width="100"></TableColumn>
                        <TableColumn prop="address" label="客户经营类型" width="100"></TableColumn>
                    </Table>
                    <Pagination v-show="true"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400"
                                class="f_r"
                    >
                    </Pagination>
                </div>


                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
            </Dialog>-->

        </div>
    </div>
</template>
<script>
    import channelService from "@B2B/services/channel/channelService.js"
    import customService from "@B2B/services/channel/customService.js"
    import goodsService from "@B2B/services/channel/goodsService.js"
    import screenScrollMixins from '@B2B/mixins/screenScrollMixins.js'

    export default {
        mixins: [screenScrollMixins],
        /*channelItem*/
        props: ["channelItem"],
        data() {
            return {
                status:null,
                customCategory:[
                    {
                        label:"个体",
                        value:0
                    },
                    {
                        label:"连锁",
                        value:1
                    }
                ],
                customType:null,
                formInline: [
                    {
                        label:"启用",
                        value:1
                    },
                    {
                        label:"停用",
                        value:0
                    }
                ],
                data: [],
                trueTableData: [],
                tableData: [
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
                    }
                ],
                customData: [],
                goodsData: [],
                multipleSelection: [],
                currentPage4: 4,
                detailData: "",

                closeStyle1: true,
                closeStyle2: true,
                closeStyle3: true,

                customKeyWord:null,
                customParams:{
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1,
                    "canalId":"",
                    storetype:null,
                },
                customTotal:0,
                goodsParams:{
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1,
                    "canalId":"",
                    status:null,
                },
                goodsKeyWord:null,
                goodsTotal:0,

            }
        },
        created() {
            this.customParams.canalId=this.channelItem.channelDetail.id
            this.goodsParams.canalId=this.channelItem.channelDetail.id
        },

        mounted() {
//            this.getChannel()
            this.getCustom(this.customParams)
            this.getGoods(this.goodsParams)



        },
        watch:{
            customKeyWord(val,oldVal){

                if(!val.replace(/ +/,"")){


                    this.getCustom(this.customParams)
                }
            },
            goodsKeyWord(val,oldVal){
                console.log(222)
                if(!val.replace(/ +/,"")){
                    console.log(333)
                    this.getGoods(this.goodsParams)

                }
            },
            customType(val,oldVal){
                console.log(val)
            },
        },


        methods: {
            /*async getChannel(){
                let id = this.channelItem.channelDetail.id
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/getB2bCanalById/" + id
                try{
                    let res=await channelService.getB2bCanalById(id)
                    console.log(res)

                    if(res.data.status.statusCode==0){
                        this.detailData = res.data.result
                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }

            },*/
            /*客户相关*/
            async getCustom(data){
                console.log(data,111111111111)
//                let url="http://192.168.170.102:7778/b2b-seller-admin/getB2bListMerchant"
                data.keyWord=this.customKeyWord&&this.customKeyWord.trim()?this.customKeyWord.trim():null
                let id = this.channelItem.channelDetail.id
                data.canalId=id
                data.storetype=this.customType
                try{
                    let res=await customService.getB2bListMerchant(data)
                    console.log(data,res)
                    if(res.data.status.statusCode==0){

                        this.customData = res.data.result.items
                        this.customTotal=res.data.result.totalCount
                    }else{
                        console.log(res.data.status.statusReason)

                    }
                }catch(e){
                    console.log(e)
                }

            },
            customSearch() {
                this.getCustom(this.customParams)
            },

            customSelectionChange(val) {
                this.multipleSelection = val
            },
            /*分页*/
            customSizeChange(val) {
                this.customParams.pageSize=val
                console.log(`每页 ${val} 条`)
            },
            customCurrentChange(val) {
                this.customParams.pageNum=val
                this.getCustom(this.customParams)
                console.log(`当前页: ${val}`)
            },


            /*商品相关*/
           async getGoods(data){
               console.log(this.status)


//                let url="http://192.168.170.102:7778/b2b-seller-admin/findByIdsAndKeyword"
                data.keyWord=this.goodsKeyWord&&this.goodsKeyWord.trim()?this.goodsKeyWord.trim():null
               data.status=this.status
//
                let id = this.channelItem.channelDetail.id
                data.canalId=id
                try{
                    let res=await goodsService.findByIdsAndKeyword(data)
                    console.log(res,data)
                    if(res.data.status.statusCode==0){
                        this.goodsData = res.data.result.list
                        this.goodsTotal=res.data.result.totalCount
                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }

            },
            goodsSearch() {

                this.getGoods(this.goodsParams)
            },
            goodsSelectionChange(val) {
                this.multipleSelection = val
            },
            /*分页*/
            goodsSizeChange(val) {
                this.goodsParams.pageSize=val
                console.log(`每页 ${val} 条`)
            },
            goodsCurrentChange(val) {
                this.goodsParams.pageNum=val
                this.getGoods(this.goodsParams)
                console.log(`当前页: ${val}`)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done()
                    })
                    .catch(_ => {
                    })
            },
            jumpToEditChannel() {
                let id = this.channelItem.channelDetail.id
               /* this.channelItem.channelDetail.customTableData=this.customData
                this.channelItem.channelDetail.blackTableData=this.goodsData*/
                console.log(this.channelItem)
                this.$root.bus.$emit("clickByEdit", "update" + id, this.channelItem.channelDetail)
            },

        },
    }
</script>
<style lang="scss" scoped>
    .b2b_channelAdd {
        width: 100%;
        height: 100%;
    }

    .channelMsg {
        margin: 20px 15px;
        padding: 20px 15px 15px;
        width: calc(100% - 60px);
        border: 1px solid #cdcdcd;
        border-top: 6px solid #cdcdcd;
        font-size: 12px;
        position: relative;
        & span:nth-of-type(1) {
            margin-right: 10px;
            color: #40afe7;
            & i:nth-of-type(1) {
                transform: rotate(90deg) scaleY(0.8);
                font-size: 10px;
                margin-right: 10px;

            }
            display: inline-block;
            position: absolute;
            left: 30px;
            top: -15px;
            padding: 0 10px;
            background-color: #fff;

        }
        label {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            margin-right: 10px;
            vertical-align: middle;
        }
        input, textarea {
            display: inline-block;
            height: 38px;
            width: 400px;
            line-height: 38px;
            padding-left: 10px;
            border: 1px solid #cdcdcd;
            background-color: #fff;
            vertical-align: center;

        }
        textarea {
            vertical-align: top;
            height: 80px;
            min-width: 400px;
            max-width: 400px;
        }
        & p:nth-of-type(1) {
            position: relative;
            margin-bottom: 15px;
            i {
                position: absolute;
                top: 10px;
                left: 90px;
                color: red;
                font-size: 20px;
            }
        }
        & p:nth-of-type(2) {
            margin-bottom: 5px;
        }

    }

    .channelCum {
        padding-bottom: 60px;
    }

    .close {
        padding: 0 15px;
        height: 0;
        span:nth-of-type(1) {

            i:nth-of-type(1) {
                transform: rotate(270deg) scaleY(0.8);
                transition: all 0.3s linear;
            }

        }
        transition: all 0.3s linear;
    }

</style>

