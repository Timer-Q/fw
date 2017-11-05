<template>
    <div class="channelMsg channelCum " :class="{close:!closeStyle}">
        <span @click="closeStyle=!closeStyle"><i class="el-icon-d-arrow-left"></i>渠道商品黑名单</span>
        <div v-show="closeStyle">
            <el-button class="public-function-btn" @click="blackDialog">新增</el-button>
            <el-button class="public-function-btn" @click="deleteGoods" :disabled="blackTableData.length==0">删除</el-button>
            <Form :inline="true" class="demo-form-inline">
                <FormItem label="状态">
                    <Select placeholder="全部" v-model="value">
                        <Option
                            v-for="item in blackGoodsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="商品查询">
                    <Input placeholder="商品名称/条码/品牌" v-model="keyWord"/>
                </FormItem>
                <!--<FormItem label="品牌">
                    <Input placeholder="品牌"/>
                </FormItem>-->
                <el-button @click="goodsSearch">查询</el-button>
            </Form>
            <Table
                :data="blackTableData"
                border
                slot="empty"
                style="width: 100%"
                max-height="300"
                :highlight-current-row="true"
                ref="multipleTable1"
                @select="goodsSelection"
                @select-all="goodsSelection"
                @row-click="jumpToCostorder"
            >
                <TableColumn type="index" label="序号" width="100"></TableColumn>
                <TableColumn type="selection" align="center" width="100"></TableColumn>
                <!--<TableColumn prop="goodsId" label="SKUID" width="200"></TableColumn>-->
                <TableColumn prop="goodsName" label="商品名称"></TableColumn>
                <!--<TableColumn prop="" label="商品分类" width="100"></TableColumn>-->
                <TableColumn prop="goodsCode" label="条码" width="100"></TableColumn>
                <TableColumn prop="specification" label="规格" width="100"></TableColumn>
                <TableColumn prop="brandName" label="品牌" width="100"></TableColumn>
                <TableColumn prop="status" label="状态" width="100"></TableColumn>

            </Table>
            <tooltip name="costorder2">
                <el-button size="mini" @click.prevent="deleteGoods" :disabled="blackTableData.length==0">删除</el-button>
                <el-button size="mini">停用</el-button>

            </tooltip>
          <!--  <Pagination v-show="true"
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
            <div class="f_r">共<i>{{blackTableData.length}}</i>条</div>


            <Dialog
                title="新增商品黑名单"
                :visible.sync="blackDialogVisible"
                size="small"
            >
                <Form :inline="true" class="demo-form-inline">
                    <FormItem label="商品分类">
                        <Select v-model="value" placeholder="全部" style="width:200px">
                            <Option
                                v-for="item in blackGoodsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"

                            >
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="联系人" style="margin-left:10px;">
                        <Input placeholder="商品名称/商品条码/skuid" v-model="digKeyWord"/>
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
                    <div class="f_r">共<i>{{listNum}}</i>条</div>

                </div>
                <span slot="footer" class="dialog-footer" >
    <el-button @click="blackDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="addSuccess">保存</el-button>
  </span>
            </Dialog>
            <!--删除确认框-->
            <Dialog
                title="删除提示"
                :visible.sync="removeGoodsVisible"
                size="tiny"
            >
                <span>您确定删除已选商品?</span>
                <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="cancelRemoveGoods()">取 消</el-button>
    <el-button type="primary" @click="sureRemoveGoods">确 定</el-button>
  </span>
            </Dialog>
        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from "vuex"
//    import channelService from "@B2B/services/channelService.js"
    import goodsService from "@B2B/services/channel/goodsService.js"

    export default {
        data: function () {

            return {
                closeStyle: true,
                blackGoodsOptions:[{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                blackTableData: [],
                currentPage4:4,
                blackDialogVisible: false,
                value:'',
                addBlackTableData:[
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
                listNum:0,
                templateTableData: [],
                removeGoodsVisible: false,
                keyWord: '',
                digKeyWord:"",
                searchCopy: [],
                supplierId:1,
            }
        },
        watch:{
            removeGoodsVisible(val, oldVal){
                console.log(val, oldVal,888888)
            },
            blackTableData(val, oldVal){
                this.B2B_M_ADD_BLACKGOODS(val)
                console.log(this.B2B_S_BLACKGOODS)
            },

        },

        computed:{
            ...mapState(["B2B_S_BLACKGOODS"])

        },
        methods:{
            ...mapMutations(["B2B_M_ADD_BLACKGOODS"]),
            async addGoods(data) {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/getBaseGoods"

                try{
                    let res=await goodsService.getBaseGoods(data)
                    if(res.data.status.statusCode==0){
                        let datas = res.data.result.items
                        this.addBlackTableData = datas
                        this.listNum = datas.length
                        console.log(res)
                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }

            },
            async getCustomCategory(){
//                let url="http://192.168.170.102:7778/b2b-seller-admin/listGoodsCategory/"+this.supplierId
                let res=await goodsService.listGoodsCategory(this.supplierId)
                try{
                    if(res.data.status.statusCode==0){
                        console.log(res)
                        let data=res.data.result
                        let ary1=[]
//                        data.map((item)=>{
//                            ary1.push(item.categoryName)
//                        })





                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }


            },

            blackDialog(){
                this.blackDialogVisible=true
                this.addGoods({
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1,
                    "keyuWord": this.keyWord,
                })
                this.getCustomCategory()


            },
            addGoodsSearch(){
                this.addGoods({
                    "keyuWord": this.digKeyWord,
                    "pageNum": 1,
                    "pageSize": 10,
                    "supplierId": 1
                })
            },
            /*弹出框中复选框选中的内容*/
            dialogSelection(val) {
                this.templateTableData = val
            },
            /*点击确定按钮获取增加数据*/
            addSuccess() {
                this.blackDialogVisible = false
                this.searchCopy = this.blackTableData
                /*将获取过来的数据先进行备份*/
                console.log(this.$data)
                this.blackTableData = this.blackTableData.filter((item) => {
                    /*将blackTableData里面已经有的在templateTableData里面过滤掉,之后再合并templateTableData*/
                    let newAry=  this.templateTableData.filter((i) => (i.goodsId != item.goodsId))
                    if(newAry.length!=this.templateTableData.length){
                        this.templateTableData=[]
                        this.$customMessage("商品已经添加过请重新选择","info")
                        return true
                    }
                    return true
                }).concat(this.templateTableData)
                /* this.blackTableData = [...this.blackTableData, ...this.templateTableData]*/


                /*this.templateTableData是用来存储选中要添加的数据*/
                this.templateTableData = []
            },

            /*渠道客户查询*/
            goodsSearch() {
                let reg = new RegExp(`\^${this.search}\$`)
                /*备份blackTableData中的数据,blackTableData中始终为显示出来的数据*/
                this.searchCopy = this.blackTableData
                this.blackTableData = this.blackTableData.filter((item, index) => (
                    /*根据storetype,companyName,identityName,identityNumber过滤数据*/
                    item.storetype == this.storetype || reg.test(item.companyName) || reg.test(item.identityName) || reg.test(item.identityNumber)
                ))
            },

            /*已选客户*/
            goodsSelection(val) {
                this.templateTableData = val
            },
            /*删除按钮*/
            deleteGoods() {
                this.removeGoodsVisible = true
            },

            /*确定删除已选客户*/
            sureRemoveGoods() {
                console.log("方法被调用")
                if (this.searchCopy.length != 0) {
                    /*在查询结果中进行删除,则备份的searchCopy数据中也要将其删除*/
                    this.searchCopy = this.searchCopy.filter((item) => (!this.templateTableData.find((i) => (i.goodsId == item.goodsId))))

                }

                this.removeGoodsVisible = false
                this.blackTableData = this.blackTableData.filter((item) => {
                    return !this.templateTableData.find((i) => (i.goodsId == item.goodsId))
                })
                /*删除后将templateTableData清空*/
                this.templateTableData = []
                /*如果查询出的结果已经被全部删除了,就显示所有剩下的数据*/
                if (this.blackTableData.length == 0) {
                    this.blackTableData = this.searchCopy
                    this.search = ""
                }
            },
            /*取消删除后,清除所有选中样式*/
            cancelRemoveGoods() {
                this.removeGoodsVisible = false
                this.$refs.multipleTable1.clearSelection()
            },
            /*点击行内删除按钮*/
            jumpToCostorder(row, event, column) {
                console.log(row)
                this.templateTableData=[row]
                if (column.type == "selection") return
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder2')

            },



            /*分页事件*/
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },

        },
    }
</script>
<style scoped lang="scss">
    .channelMsg {
        span:nth-of-type(1) {
            user-select: none;
            margin-right: 10px;
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
    .dialog-footer{
        position: static !important;
    }
    /*.el-input__inner {*/
        /*font-size: 12px;*/
    /*}*/



</style>
