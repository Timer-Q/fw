<template>
    <div class="channelMsg channelCum " :class="{close:!closeStyle}">
        <span @click="closeStyle=!closeStyle"><i class="el-icon-d-arrow-left"></i>渠道客户({{channelItem.channelDetail.canalName}})</span>
        <div v-show="closeStyle">
            <Button class="public-function-btn" @click="customDialog">新增</Button>
            <Button class="public-function-btn" @click="deleteCustomDig" :disabled="customTableData.length==0">删除
            </Button>
            <Button class="public-function-btn" @click="changeChannel" :disabled="customDisabeld">更改客户渠道
            </Button>
            <Form :inline="true" class="demo-form-inline">
                <FormItem label="客户类型">
                    <Select placeholder="客户类型" v-model="storetype">
                        <Option
                            v-for="item in customCategoryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="客户查询">
                    <Input placeholder="客户名称/联系人/联系人电话" v-model="keyWord"/>
                </FormItem>
                <!-- <FormItem label="联系人">
                 <Input placeholder="联系人/联系人电话"/>
                 </FormItem>-->
                <Button @click="customSearch">查询</Button>
            </Form>
            <!--增加页客户列表-->
            <Table
                :data="customTableData"
                border
                slot="empty"
                style="width: 100%"
                :highlight-current-row="true"
                tooltip-effect="dark"
                ref="multipleTable1"
                @select="customSelection"
                @select-all="customSelection"
                @selection-change="customSelectChange"
                @row-click="jumpToCostorder"
                max-height="300"
            >
                <TableColumn type="index" label="序号" width="100"></TableColumn>
                <TableColumn type="selection" align="center" width="80"></TableColumn>
                <TableColumn prop="companyName" label="客户名称" width="180"></TableColumn>
                <TableColumn prop="address" label="地址"></TableColumn>
                <TableColumn prop="contactsName" label="主联系人" width="100"></TableColumn>
                <TableColumn prop="mobilePhone" label="主联系人电话" width="120"></TableColumn>
                <TableColumn prop="storeType" label="客户类型" width="140">
                    <template slot-scope="scope">
                        <i>{{scope.row.storeType == 0 ? "个体" : "连锁"}}</i>
                    </template>
                </TableColumn>
                <TableColumn prop="enabledShopNumber" label="门店数量" width="120"></TableColumn>
            </Table>
            <tooltip name="costorder">
                <el-button size="mini" @click.prevent="deleteCustomDig">删除</el-button>
                <el-button size="mini">停用</el-button>

            </tooltip>

            <!--增加页客户列表分页-->
            <!-- <Pagination v-show="customTableData.length!=0"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage4"
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="100"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="800"
                         class="f_r"
             >
             </Pagination>-->
            <div class="f_r">共<i>{{customTableData.length}}</i>条</div>
            <!--客户增加弹出框-->
            <Dialog
                title="客户渠道新增"
                :visible.sync="customDialogVisible"
                size="small"
            >
                <Form :inline="true" class="demo-form-inline">
                    <FormItem label="客户查询">
                        <Input placeholder="客户名称/联系人/联系人电话" v-model="diaKeyWord"/>
                    </FormItem>
                    <el-button @click="addCustomSearch">查询</el-button>
                </Form>
                <div>
                    <Table
                        :data="addCustomTableData"
                        border
                        slot="empty"
                        style="width: 100%"
                        max-height="400"
                        :highlight-current-row="true"
                        tooltip-effect="dark"
                        ref="multipleTable"
                        @select="dialogSelection"
                        @select-all="dialogSelection"

                    >
                        <TableColumn type="index" label="序号" width="100"></TableColumn>
                        <TableColumn type="selection" align="center" width="100"></TableColumn>
                        <TableColumn prop="companyName" label="客户名称" width="200"></TableColumn>
                        <TableColumn prop="address" label="地址"></TableColumn>
                        <TableColumn prop="contactsName" label="主联系人" width="100"></TableColumn>
                        <TableColumn prop="mobilePhone" label="主联系人电话" width="100"></TableColumn>
                        <TableColumn prop="storeType" label="客户类型" width="100">
                            <template slot-scope="scope">
                                <i>{{scope.row.storeType == 0 ? "个体" : "连锁"}}</i>
                            </template>
                        </TableColumn>
                        <TableColumn prop="enabledShopNumber" label="门店数量" width="100"></TableColumn>

                    </Table>
                    <!-- <Pagination v-show="customTableData.length!=0"
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

                    <div class="f_r">共<i>{{listNum}}</i>条</div>
                </div>
                <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="customDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="addSuccess">确定</el-button>
  </span>
            </Dialog>
        </div>
        <!--删除确认框-->
        <Dialog
            title="删除提示"
            :visible.sync="removeCustomVisible"
            size="tiny"
        >
            <span style="position: static">您确定删除已选客户?</span>
            <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="cancelRemoveCustom()">取 消</el-button>
    <el-button type="primary" @click="sureRemoveCustom">确 定</el-button>
  </span>
        </Dialog>
<!--更改客户渠道弹出框-->
        <Dialog
            title="更改客户渠道"
            :visible.sync="changeChannelVisible"
            size="small"
        >
            <Form :inline="true" class="demo-form-inline">
            <FormItem label="将选中的客户移至到渠道">
                <Select placeholder="选择渠道" v-model="channelType ">
                    <Option
                        v-for="item in channelCategory"
                        :key="item.id"
                        :label="item.canalName"
                        :value="item.id">
                    </Option>
                </Select>
            </FormItem>
            </Form>
            <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="changeChannelVisible=false">取 消</el-button>
    <el-button type="primary" @click="sureChangeChannel">确 定</el-button>
  </span>
        </Dialog>


    </div>
</template>
<script>
    //    import {mapState,mapMutations} from "vuex"
    import channelService from "@B2B/services/channel/channelService.js"
    import customService from "@B2B/services/channel/customService.js"


    export default {
        props: ["channelItem"],
        data: function () {
            return {
                customDisabeld:true,
                supplierId:1,
                props: ["name"],
                closeStyle: true,
                customCategoryOptions: [
                    {
                        label: "个体",
                        value: "个体"
                    },
                    {
                        label: "连锁",
                        value: "连锁"
                    },
                ],
                currentPage4: 4,
                customDialogVisible: false,
                storetype: '',
                search: "",
                customTableData: [],
                addCustomTableData: [
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
                templateTableData: [],
                removeCustomVisible: false,
                changeChannelVisible:false,
                listNum: 0,
                keyWord: null,
                diaKeyWord: null,
                searchCopy: [],
                channelType:null,
                channelCategory:[
                    {
                        label:"aa",
                        value:"111",
                    },
                    {
                        label:"bbb",
                        value:"222",
                    }
                ],
                id: "",
            }
        },
        computed: {
//            ...mapState(["B2B_S_CUSTOM"])

        },
        watch: {
            keyWord(val, oldVal) {
                if (!val.replace(/ +/, "")) {
                    this.customSearch()
                }
            },
            diaKeyWord(val, oldVal) {
                if (!val.replace(/ +/, "")) {
                    this.addCustomSearch()
                }
            },


        },
        created() {

            this.id = this.channelItem.channelDetail.id
//            this.customTableData = [...this.onceCustom.customTableData]
            this.customSearch()
        },

        methods: {

            /*渠道客户本地查询*/
            async customSearch() {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/getB2bListMerchant"
                let data = {
                    canalId: this.id,
                    "keyWord": null,
                    "pageNum": 1,
                    "pageSize": 10000,
                    "supplierId": 1
                }
                data.keyWord = this.keyWord && this.keyWord.trim()
                try {
                    let res = await customService.getB2bListMerchant(data)
                    console.log(data, res)
                    if(res.data.status.statusCode==0){
                        this.customTableData = res.data.result.items
                    }else{
                        console.log(res.data.status.statusReason)
                    }

                } catch (e) {
                    console.log(e)
                }


            },
            /*渠道客户弹出框查询*/
            async addCustomSearch() {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/getB2bMerchant"
                let data = {
                    "keyWord": null,
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1
                }
                data.keyWord = this.diaKeyWord && this.diaKeyWord.trim()?this.diaKeyWord.trim:null
                try {
                    let res = await customService.getB2bMerchant( data)
                    console.log(data, res)
                    this.addCustomTableData = res.data.result.items
                } catch (e) {
                    console.log(e)
                }

            },

            customDialog() {
                this.customDialogVisible = true
//                let url = "http://10.12.31.221:8092/b2b-seller-admin/getB2bMerchant"
//                channelService.add(url, {
//                    "pageNum": 1,
//                    "pageSize": 10,
//                    "supplierId": 1
//                }).then((res) => {
//                    let data = res.data.result.items
//                    data.forEach((item, index) => {
//                        item.index = index + 1
//                        item.storetype = item.storetype == 0 ? "个体" : "连锁"
//                    })
//                    this.addCustomTableData = data
//
//                    this.listNum=data.length
//                    console.log(res)
//                }).catch((err) => {
//                    console.log(err)
//                })
                this.addCustomSearch()
            },
            /*弹出更改渠道的弹框*/
           async changeChannel(){
                this.changeChannelVisible=true
                /*需要请求到所有的渠道*/
//                let url="http://192.168.170.102:7778/b2b-seller-admin/getListB2bCanalsByPOJO"
               let data={
                    status:1,
                    supplierId:this.supplierId

               }
                try{
                    let res=await customService.getListB2bCanalsByPOJO(data)
                    console.log(this.channelCategory)
                    console.log(res)
                    if(res.data.status.statusCode==0){
                        this.channelCategory=res.data.result
                    }else{
                        console.log(res.data.status.statusReason)

                    }
                }catch(e){
                    console.log(e)
                }


            },
            async sureChangeChannel(){
                /*将更改后的渠道发送*/
                console.log(this.channelCategory,this.channelType)
                this.changeChannelVisible=false
                let newCanalId=this.channelType
                let merchantId=[]
                console.log(this.templateTableData,this.channelType)
                this.templateTableData.map((item)=>{
                    merchantId.push(item.merchantId)

                })
                let data={
                    oldCanalId:this.id,
                    newCanalId,
                    merchantId
                }
                console.log(data)
//                let url="http://192.168.170.102:7778/b2b-seller-admin/changeB2bCanalMerchant"
                try{
                    let res=await customService.changeB2bCanalMerchant(data)
                    console.log(res)
                    if(res.data.status.statusCode==0){
                        /*渠道更改成功后,重新获取数据,更改客户渠道后客户应该在这个渠道中消失吗?????*/
                        console.log("aaaaaaa")
                        this.customSearch()
                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }

            },

            /*弹出框中复选框选中的内容*/
            dialogSelection(val) {
                this.templateTableData = val
            },
            customSelectChange(val){
                if(val.length!=0){
                    this.customDisabeld=false
                }

            },
            /*点击确定按钮批量增加客户,并且获取新数据*/
            /* addSuccess() {
                 this.customDialogVisible = false
                 this.searchCopy = this.customTableData
                 /!*将获取过来的数据先进行备份*!/
                 this.customTableData = this.customTableData.filter((item) => {
                     /!*将customTableData里面已经有的在templateTableData里面过滤掉,之后再合并templateTableData*!/
                     this.templateTableData = this.templateTableData.filter((i) => (i.merchantId != item.merchantId))
                     return true
                 }).concat(this.templateTableData)
                 /!* this.customTableData = [...this.customTableData, ...this.templateTableData]*!/


                 /!*this.templateTableData是用来存储选中要添加的数据*!/
                 this.templateTableData = []
             },*/
            async addSuccess() {
                this.customDialogVisible = false
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/addB2bCanalMerchantBatch"
                let merchantId = []
                this.templateTableData.map((item) => {
                    merchantId.push(item.merchantId + "")
                })
                let data1 = {
                    canalId: this.id,
                    merchantId: merchantId,
                    status: 0,
                    supplierId: 1,
                }
                try {

                    let res1 = await customService.addB2bCanalMerchantBatch(data1)
                    if (res1.data.status.statusCode == 0) {
                        console.log("增加成功", res1)
                    } else {
                        this.$customMessage("商户已经添加过渠道,请重新选择","info")
                        console.log(res1.data.status.statusReason)
                    }
                    this.customSearch()
                } catch (e) {
                    console.log(e)
                }

            },



            customSelection(val) {
                this.templateTableData = val

            },
            /*删除按钮,弹出删除确认框*/
            deleteCustomDig() {
                this.removeCustomVisible = true
            },

            /*确定删除已选客户*/
            /* sureRemoveCustom() {

                 if (this.searchCopy.length != 0) {
                     /!*在查询结果中进行删除,则备份的searchCopy数据中也要将其删除*!/
                     this.searchCopy = this.searchCopy.filter((item) => (!this.templateTableData.find((i) => (i.merchantId == item.merchantId))))

                 }

                 this.removeCustomVisible = false
                 this.customTableData = this.customTableData.filter((item) => {
                     return !this.templateTableData.find((i) => (i.merchantId == item.merchantId))
                 })
                 /!*删除后将templateTableData清空*!/
                 this.templateTableData = []

                 /!*如果查询出的结果已经被全部删除了,就显示所有剩下的数据*!/
                 if (this.customTableData.length == 0) {
                     this.customTableData = this.searchCopy
                     this.search = ""
                 }
             },*/
            async sureRemoveCustom() {
                this.removeCustomVisible = false
                let url1 = "http://192.168.170.102:7778/b2b-seller-admin/delB2bCanalMerchantBycanal"
                let merchantId = []
                this.templateTableData.map((item) => {
                    merchantId.push(item.merchantId.toString())
                })

                let data = {
                    canalId: this.id,
                    merchantId: merchantId,
                }
                console.log(data)


                try {
                    let res1 = await customService.delB2bCanalMerchantBycanal(data)
                    if (res1.data.status.statusCode == 0) {
                        console.log("删除成功", data, res1)
                        /*重新拉取新数据*/
                        this.customSearch()

                    } else {
                        console.log(res1.data.status.statusReason)
                    }
//                                        let url2="http://192.168.170.102:7778/b2b-seller-admin/getB2bListMerchant"
//                                        let data2={
//                                            canalId:this.id,
//                                            "keyWord": null,
//                                            "pageNum": 1,
//                                            "pageSize": 10000,
//                                            "supplierId": 1
//                                        }
//
//                                        let res2=await channelService.add(url2,data2)
//                                        if(res2.status==200){
//                                            console.log("获取新数据成功",res2)
//                                            this.customTableData=res2.data.result.items
//                                            this.listNum = this.customTableData.length
//                                        }else{
//                                            console.log(res2.status.statusReason)
//                                        }

                } catch (e) {
                    console.log(e)
                }


            },
            /*取消删除后,清除所有选中样式*/
            cancelRemoveCustom() {
                this.removeCustomVisible = false
                this.$refs.multipleTable1.clearSelection()
            },
            /*点击行内删除按钮*/
            jumpToCostorder(row, event, column) {
                this.templateTableData = [row]
                if (column.type == "selection") return
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
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

        },


    }
</script>
<style scoped lang="scss">
    .channelMsg {
        span:nth-of-type(1) {
            user-select: none;
            /*margin-right: 10px;*/
            color: #40afe7;
            i:nth-of-type(1) {
                transform: rotate(90deg) scaleY(0.8);
                font-size: 10px;
                margin-right: 10px;
                transition: all 0.3s linear;

            }
            display: inline-block;
            position: absolute;
            left: 30px;
            top: -15px;
            padding: 0 10px;
            background-color: #fff;

        }

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

    .dialog-footer {
        position: static !important;
        /*margin-top:5px;*/
    }

    /*.el-input__inner {
        font-size: 12px;
    }*/
</style>
