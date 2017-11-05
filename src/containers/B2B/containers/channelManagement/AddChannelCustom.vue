<template>
    <div class="channelMsg channelCum " :class="{close:!closeStyle}">
        <span @click="closeStyle=!closeStyle"><i class="el-icon-d-arrow-left"></i>渠道客户</span>
        <div v-show="closeStyle">
            <el-button class="public-function-btn" @click="customDialog">新增</el-button>
            <el-button class="public-function-btn" @click="deleteCustom" :disabled="customTableData.length==0">删除</el-button>
            <Form :inline="true" class="demo-form-inline">
                <FormItem label="客户类型">
                    <Select placeholder="客户类型" v-model="storetype ">
                        <Option
                            v-for="item in customCategoryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="客户查询">
                    <Input placeholder="客户名称/联系人/联系人电话" v-model="search" @input="clearInput"/>
                </FormItem>
                <el-button @click="customSearch">查询</el-button>
            </Form>
            <!--增加页客户列表-->
            <Table
                :data="customTableData"
                border
                slot="empty"
                max-height="300"
                style="width: 100%"
                :highlight-current-row="true"
                tooltip-effect="dark"
                ref="multipleTable1"
                @select="customSelection"
                @select-all="customSelection"
                @row-click="jumpToCostorder"
            >
                <TableColumn type="index" label="序号" width="100"></TableColumn>
                <TableColumn type="selection" align="center" width="80"></TableColumn>
                <TableColumn prop="companyName" label="客户名称" width="180"></TableColumn>
                <TableColumn prop="address" label="地址"></TableColumn>
                <TableColumn prop="contactsName" label="主联系人" width="100"></TableColumn>
                <TableColumn prop="mobilePhone" label="主联系人电话" width="120"></TableColumn>
                <TableColumn prop="storetype" label="客户类型" width="140">
                <template slot-scope="scope">
                    <i>{{scope.row.storetype==0?"个体":"连锁"}}</i>
                </template>
            </TableColumn>
                <TableColumn prop="enabledShopNumber" label="门店数量" width="120"></TableColumn>
            </Table>
            <tooltip name="costorder">
                <el-button size="mini" @click.prevent="deleteCustom">删除</el-button>
                <el-button size="mini">停用</el-button>

            </tooltip>

            <!--增加页客户列表分页-->
            <!--<Pagination v-show="customTableData.length!=0"
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
                        <Input placeholder="客户名称/联系人/联系人电话" v-model="DiaKeyWord"/>
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
                        <TableColumn prop="storetype" label="客户类型" width="100">
                            <template slot-scope="scope">
                                <i>{{scope.row.storetype==0?"个体":"连锁"}}</i>
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

    </div>
</template>
<script>
    import {mapState,mapMutations} from "vuex"
//    import channelService from "@B2B/services/channelService.js"
    import customService from "@B2B/services/channel/customService.js"


    export default {
        data: function () {
            return {
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
                listNum: 0,
                keyWord: '',
                searchCopy: [],
                DiaKeyWord:null,
            }
        },
        computed:{
            ...mapState(["B2B_S_CUSTOM"])

        },
        watch: {
            customTableData(val, oldVal){
                this.B2B_M_ADD_CUSTOM(val)
                console.log(this.B2B_S_CUSTOM)


            },
            DiaKeyWord(val,oldVal){
                if(!val.replace(/ +/,"")){
                    this.addCustomSearch()
                }
            },
        },

        methods: {
            ...mapMutations(["B2B_M_ADD_CUSTOM"]),

            async addCustom(data) {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/getB2bMerchant"
                try{
                    let res=await customService.getB2bMerchant(data)
                    console.log(res)
                    if(res.data.status.statusCode==0){
                        let datas = res.data.result.items
                        this.addCustomTableData = datas
                        this.listNum = datas.length

                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }

            },

            customDialog() {
                this.customDialogVisible = true
/*                let url = "http://10.12.31.221:8092/b2b-seller-admin/getB2bMerchant"
                channelService.add(url, {
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1
                }).then((res) => {
                    let data = res.data.result.items
                    data.forEach((item, index) => {
                        item.index = index + 1
                        item.storetype = item.storetype == 0 ? "个体" : "连锁"
                    })
                    this.addCustomTableData = data

                    this.listNum=data.length
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })*/
                this.addCustom({
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1
                })
            },
            addCustomSearch() {
                console.log("执行",this.DiaKeyWord)
                this.DiaKeyWord=this.DiaKeyWord.trim()
                this.addCustom({
                    "keyWord": this.DiaKeyWord||null,
                    "pageNum": 1,
                    "pageSize": 100000,
                    "supplierId": 1
                })
            },
            /*弹出框中复选框选中的内容*/
            dialogSelection(val) {
                this.templateTableData = val
            },

            /*点击确定按钮获取增加数据*/
            addSuccess() {
                this.customDialogVisible = false
                this.searchCopy = this.customTableData
                /*将获取过来的数据先进行备份*/
                this.customTableData = this.customTableData.filter((item) => {
                    /*将customTableData里面已经有的在templateTableData里面过滤掉,之后再合并templateTableData*/
                    let newAry= this.templateTableData.filter((i) => (i.merchantId != item.merchantId))
                    if(newAry.length!=this.templateTableData.length){
                        this.templateTableData=[]
                        this.$customMessage("商户已经添加过请重新选择","info")
                        return true
                    }
                    return true
                }).concat(this.templateTableData)
                /* this.customTableData = [...this.customTableData, ...this.templateTableData]*/


                /*this.templateTableData是用来存储选中要添加的数据*/
                this.templateTableData = []
            },
        /*    async addSuccess() {
                this.customDialogVisible = false
                let url="http://192.168.170.102:7778/b2b-seller-admin/addB2bCanalMerchantBatch"
//                let data=
                try{

                    let res=await channelService.update(url,)
                    if(res.status==200){
                        console.log("增加成功")
                    }else{
                        console.log(res.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }

            },
*/
            /*渠道客户查询*/
            customSearch() {
                let reg = new RegExp(`\^${this.search}\$`)
                /*备份customTableData中的数据,customTableData中始终为显示出来的数据*/
                this.searchCopy = this.customTableData
                this.customTableData = this.customTableData.filter((item, index) => (
                    /*根据storetype,companyName,identityName,identityNumber过滤数据*/
                    item.storetype == this.storetype || reg.test(item.companyName) || reg.test(item.identityName) || reg.test(item.identityNumber)
                ))
            },
            /*清除查询条件*/
            clearInput() {
                if (!this.search.replace(/ +/, "")) {
                    this.customTableData = this.searchCopy
                }
            },
            /*已选客户*/
            customSelection(val) {
                this.templateTableData = val
            },
            /*删除按钮*/
            deleteCustom() {
                this.removeCustomVisible = true
            },
            /*确定删除已选客户*/
            sureRemoveCustom() {

                if (this.searchCopy.length != 0) {
                    /*在查询结果中进行删除,则备份的searchCopy数据中也要将其删除*/
                    this.searchCopy = this.searchCopy.filter((item) => (!this.templateTableData.find((i) => (i.merchantId == item.merchantId))))

                }

                this.removeCustomVisible = false
                this.customTableData = this.customTableData.filter((item) => {
                    return !this.templateTableData.find((i) => (i.merchantId == item.merchantId))
                })
                /*删除后将templateTableData清空*/
                this.templateTableData = []

                /*如果查询出的结果已经被全部删除了,就显示所有剩下的数据*/
                if (this.customTableData.length == 0) {
                    this.customTableData = this.searchCopy
                    this.search = ""
                }
            },
            /*取消删除后,清除所有选中样式*/
            cancelRemoveCustom() {
                this.removeCustomVisible = false
                this.$refs.multipleTable1.clearSelection()
            },
            /*点击行内删除按钮*/
            jumpToCostorder(row, event, column) {
                this.templateTableData=[row]
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
        /*.el-dialog__body {

            span { !* 删除弹窗文字样式; el-dialog__body在index.scss里面设置过绝对定位*!
                !*position: absolute;*!
                top: 10px;
                bottom: 0;
                left: 0;
                right: 0;
                height:90px;
                line-height:90px;
                margin: auto;
                color: #666666;
                font-size: 16px;
                !*line-height: 60px;*!
                text-align: center;
            }
        }*/

    }

   /* .channelCum {
        padding-bottom: 60px;
        .el-form-item__content:nth-of-type(1) {
        }
        .demo-form-inline .demo-form-search {
            margin-top: 3px;
        }
        .demo-form-inline {
            margin-top: -3px;
        }
    }*/

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
