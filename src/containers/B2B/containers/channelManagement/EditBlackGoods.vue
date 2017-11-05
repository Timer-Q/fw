<template>
    <div class="channelMsg channelCum " :class="{close:!closeStyle}">
        <span @click="closeStyle=!closeStyle"><i
            class="el-icon-d-arrow-left"></i>渠道商品黑名单({{channelItem.channelDetail.canalName}})</span>
        <div v-show="closeStyle">
            <el-button class="public-function-btn" @click="blackDialog">新增</el-button>
            <el-button class="public-function-btn" @click="deleteGoods" :disabled="blackTableData.length==0">删除
            </el-button>
            <ButtonGroup>
                <Button class="public-function-btn" @click="changeStatus(1)" :disabled="startDisabled">启用</Button>
                <Button class="public-function-btn" @click="changeStatus(0)"  :disabled="endDisabled">停用</Button>
            </ButtonGroup>
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
                :highlight-current-row="true"
                ref="multipleTable1"
                @select="goodsSelection"
                @select-all="goodsSelection"
                @selection-change="goodsSelectChange"
                @row-click="jumpToCostorder"
                max-height="300"
            >
                <TableColumn type="index" label="序号" width="100"></TableColumn>
                <TableColumn type="selection" align="center" width="100"></TableColumn>
                <TableColumn prop="goodName" label="商品名称"></TableColumn>
                <TableColumn prop="goodCode" label="条码" width="100"></TableColumn>
                <TableColumn prop="specification" label="规格" width="100"></TableColumn>
                <TableColumn prop="brandName" label="品牌" width="100"></TableColumn>
                <TableColumn prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <i>{{scope.row.status == 0 ? "停用" : "启用"}}</i>
                    </template>
                </TableColumn>

            </Table>
            <tooltip name="costorder2">
                <el-button size="mini" @click.prevent="deleteGoods" :disabled="blackTableData.length==0">删除</el-button>
                <el-button size="mini" @click="changeStatus(3)">{{templateTableData[0]&&templateTableData[0].status == 0 ? "启用" : "停用"}}</el-button>

            </tooltip>
            <div class="f_r">共<i>{{blackTableData.length}}</i>条</div>
            <!--<Pagination v-show="true"
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
            <Dialog
                title="新增商品黑名单"
                :visible.sync="blackDialogVisible"
                size="small"
                :before-close="handleClose"
            >
                <Form :inline="true" class="demo-form-inline">
                    <FormItem label="客户">
                        <Select v-model="value" placeholder="全部">
                            <Option
                                v-for="item in blackGoodsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="联系人">
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
                    <div class="f_r">共<i>{{listNum}}</i>条</div>

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
    //    import {mapState,mapMutations} from "vuex"
    import channelService from "@B2B/services/channel/channelService.js"
    import goodsService from "@B2B/services/channel/goodsService.js"

    export default {
        props: ["channelItem"],
        data: function () {
            return {
                supplierId:1,
                startDisabled:true,
                endDisabled:true,
                closeStyle: true,
                blackGoodsOptions: [{
                    value: 0,
                    label: '停用'
                }, {
                    value: 1,
                    label: '启用'
                }],
                blackTableData: [],
                currentPage4: 4,
                blackDialogVisible: false,
                value: '',
                addBlackTableData: [
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
                listNum: 0,
                templateTableData: [],
                removeGoodsVisible: false,
                keyWord: null,
                diaKeyWord: null,
                searchCopy: [],
            }
        },
        watch: {
            keyWord(val, oldVal) {
                if (!val.replace(/ +/, "")) {
                    this.goodsSearch()
                }
            },
            diaKeyWord(val, oldVal) {
                if (!val.replace(/ +/, "")) {
                    this.addGoodsSearch()
                }
            },


        },

        computed: {},
        created() {
            this.id =this.channelItem.channelDetail.id
//            this.blackTableData = [...this.onceGoods.blackTableData]
//            console.log(this.blackTableData)
            this.goodsSearch()
        },

        methods: {
            async addGoodsSearch() {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/getBaseGoods"
                let data = {
                    canalId: this.id,
                    "keyWord": null,
                    "pageNum": 1,
                    "pageSize": 10000,
                    "supplierId": 1
                }
                data.keyWord = this.diaKeyWord && this.diaKeyWord.trim()
                try {
                    let res = await goodsService.getBaseGoods(data)
                    console.log(data, res)
                    if (res.data.status.statusCode == 0) {
                        this.addBlackTableData = res.data.result.items
                        this.listNum = res.data.result.items.length
                    } else {
                        console.log(res.data.status.statusReason)
                    }

                } catch (e) {
                    console.log(e)
                }


            },
            async goodsSearch() {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/findByIdsAndKeyword"
                let data = {
                    "canalId": this.id,
                    "keyWord": null,
                    "pageNum": 1,
                    "pageSize": 10000,
                    "supplierId": 1,
                    status:this.value

                }
                data.keyWord = this.keyWord && this.keyWord.trim()?this.keyWord.trim():null
                try {
                    let res = await goodsService.findByIdsAndKeyword(data)
                    if (res.data.status.statusCode == 0) {
                        this.blackTableData = res.data.result.list
                        console.log(data, res)

                    } else {
                        console.log(res.data.status.statusReason)
                    }

                } catch (e) {
                    console.log(e)
                }

            },


            blackDialog() {
                this.blackDialogVisible = true
                this.addGoodsSearch()


            },

            /*弹出框中复选框选中的内容*/
            dialogSelection(val) {
                this.templateTableData = val
            },
            goodsSelectChange(val){
                if(val.length==1){
                    console.log(val,"aaaaaaaaaaa")
                    val[0].status==1?this.endDisabled=false:this.startDisabled=false
                }else if(val.length==0){
                    this.endDisabled=true
                    this.startDisabled=true
                }else{
                    this.endDisabled=false
                    this.startDisabled=false
                }
            },
            /*点击确定按钮批量增加数据,并且获取新数据*/
            async addSuccess() {

                this.blackDialogVisible = false
                let goodId = []
                this.templateTableData.map((item) => {
                    goodId.push(item.goodsId)
                })
                let data1 = {
                    canalId:this.id,
                    "goodId": goodId,
                    "supplierId": 1
                }
                try {
                    let res1 = await goodsService.addB2bCanalStoreBatch(data1)
                    if (res1.data.status.statusCode == 0) {
                        console.log("增加成功", res1,data1)
                        this.goodsSearch()

                    } else {
                        console.log(res1.status.statusReason)

                    }
                } catch (e) {
                    console.log(e)
                }

            },


            /*已选商品*/
            goodsSelection(val) {
                this.templateTableData = val

            },
            /*更改状态status*/
            async changeStatus(status){
                if(status==3){
                    status=this.templateTableData[0].status==0?1:0
                }
                console.log(status)
//                let url="http://192.168.170.102:7778/b2b-seller-admin/setB2bCanalStoreUpOrDown"
                let goodsIds=[]
                console.log(this.templateTableData)
                this.templateTableData.map((item)=>{
                    goodsIds.push(item.goodId)
                })
                let data={
                    "canalId": this.id,
                    "goodsIds": goodsIds,
                    "status": status,
                    "supplierId": 1,
                }
                try{
                    let res=await goodsService.setB2bCanalStoreUpOrDown(data)
                    if(res.data.status.statusCode==0){
                        this.templateTableData.map((item)=>{
                            this.blackTableData.map((i)=>{
                                if(i.goodId==item.goodId){i.status=status}
                            })
                        })
                        this.$refs.multipleTable1.clearSelection()

                    }else{}
                    console.log(data,res)
                }catch(e){
                    console.log(e)
                }


            },
            /*删除按钮*/
            deleteGoods() {
                this.removeGoodsVisible = true
            },

            /*确定删除已选商品*/
            async sureRemoveGoods() {
                this.removeGoodsVisible = false
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/delB2bCanalStoreBatchs"
                let goodId=[]
                this.templateTableData.map((item) => {
                    goodId.push(item.id)
                })
                let data={
                    goodId:goodId,
                }
                try {
                    let res1 = await goodsService.delB2bCanalStoreBatchs(data)
                    if (res1.data.status.statusCode==0) {
                        console.log("删除成功", data, res1)
                        /*重新拉取新数据*/
                        this.goodsSearch()

                    } else {
                        console.log(res1.data.status.statusReason)
                    }
//

                } catch (e) {
                    console.log(e)
                }



            },
            /*取消删除后,清除所有选中样式*/
            cancelRemoveGoods() {
                this.removeGoodsVisible = false
                this.$refs.multipleTable1.clearSelection()
            },
            /*点击出现行内按钮*/
            jumpToCostorder(row, event, column) {
                this.templateTableData = [row]
                console.log(row,this.templateTableData)
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
        /*.el-dialog__body {*/
        /*span { !* 删除弹窗文字样式; el-dialog__body在index.scss里面设置过绝对定位*!*/
        /*!*position: absolute;*!*/
        /*top: 10px;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*margin: auto;*/
        /*color: #666666;*/
        /*font-size: 16px;*/
        /*!*line-height: 60px;*!*/
        /*text-align: center;*/
        /*}*/
        /*}*/

    }

    /*.channelCum {
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
    }

    /*.el-input__inner {*/
    /*font-size: 12px;*/
    /*}*/


</style>
