<template>
    <div v-if='isCache' class="scm">
        <Tabs
            class="temporary-tabs"
            type="card"
            v-model="selectTabCode"
            @tab-remove="removeTab"
        >
            <div class="projection">
                <Button class="public-function-btn" @click="addBrandVisible=true">新增</Button>
                <Button class="public-function-btn" @click="deleteItem">删除</Button>
                <Button class="public-function-btn" @click="flushData">刷新</Button>
                <Button class="public-function-btn">日志</Button>
            </div>
            <div ref="scroll" class="content">
                <Form label-width="80px" :inline="true" style="margin-top: 15px">
                    <FormItem label="售卖区域">
                        <Select placeholder="请选择" v-model="sellArea">
                            <el-option
                                v-for="item in areaOptions"
                                :key="item.regionId"
                                :label="item.regionName"
                                :value="item.regionId">
                            </el-option>
                        </Select>
                    </FormItem>
                    <FormItem label="品牌">
                        <Input placeholder="品牌关键字" v-model="brandkeyWord" @input="watchKeyWord"/>
                    </FormItem>
                    <Button @click="BrandListSearch">查询</Button>
                </Form>

                <Table
                    :data="brandListData"
                    border
                    slot="empty"
                    style="width: 100%"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    ref="brandList"
                    @select="brandSelection"
                    @select-all="brandSelection"
                    @row-click="jumpToCostorder"
                >
                    <TableColumn type="index" label="序号" width="100"></TableColumn>
                    <TableColumn type="selection" align="center" width="100"></TableColumn>
                    <TableColumn prop="id" label="品牌ID" width="200"></TableColumn>
                    <TableColumn prop="brandName" label="品牌名"></TableColumn>
                    <TableColumn prop="brandChar" label="品牌首字母" width="100"></TableColumn>
                    <TableColumn prop="sellArea" label="售卖区域" width="100"></TableColumn>
                    <TableColumn prop="createUser" label="创建人" width="100"></TableColumn>
                    <TableColumn prop="createTime" label="创建时间" width="100"></TableColumn>
                    <TableColumn prop="updateUser" label="最后修改人" width="100"></TableColumn>
                    <TableColumn prop="updateTime" label="最后修改时间" width="100"></TableColumn>
                </Table>
                <tooltip name="costorder3" >
                    <el-button size="mini">修改售卖区域</el-button>
                    <el-button size="mini" @click="deleteItem">删除</el-button>

                </tooltip>
                <!--删除确认框-->
                <Dialog
                    title="删除提示"
                    :visible.sync="removeBrandVisible"
                    size="tiny"
                >
                    <span>确定要删除吗?删除后将不可恢复!</span>
                    <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="cancelRemoveBrand">取 消</el-button>
    <el-button type="primary" @click="sureRemoveBrand">确 定</el-button>
  </span>
                </Dialog>

                <!--增加框-->
                <Dialog
                    title="新增"
                    :visible.sync="addBrandVisible"
                    size="tiny"
                >
                    <Form label-width="80px"  >
                        <FormItem label="品牌">
                            <Autocomplete
                                v-model="brandName"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                            ></Autocomplete>
                            <Input placeholder="品牌关键字" v-model="brandName"/>
                        </FormItem>
                        <FormItem label="售卖区域">
                            <Select  v-model="DiaSellArea">
                                <el-option
                                    v-for="item in addOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </Select>
                        </FormItem>
                    </Form>
                    <!--<span>确定要删除吗?删除后将不可恢复!</span>-->
                    <span slot="footer" class="dialog-footer" style="background-color: transparent;">
    <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="sureAdd">确 定</el-button>
  </span>
                </Dialog>

                <!--分页-->
                <Pagination
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

        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    import brandSellService from "@B2B/services/brandSell/brandSellService.js"
    import "@/asserts/styles/B2B/index.scss"
    export default {
        mixins: [oneLevelTabMixins,twoLevelTabMixins,scrollMixins],
        data: function () {
            return {
                tag:'b2b_brandSell',
                system: '/b2b',
                titleName: '品牌售卖区域管理',

                value:"",
                areaOptions: [{
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
                addOptions:[{
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
                brandkeyWord:null,
                brandListData:[{
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
                templateTableData:[],
                supplierId:1,
                currentPage4:1,
                removeBrandVisible:false,
                addBrandVisible:false,
                brandName:null,
                sellArea:null,
                pageSize:10,
                pageNum:1,
                DiaSellArea:null,
                /*远程搜索框*/
                remoteSearch:[],




            }
        },
        components:{

        },
        computed:{
            keyWordCom(){
                let keyWord=this.brandkeyWord&&this.brandkeyWord.trim()?this.brandkeyWord.trim():null
                return keyWord
            },
        },
        created(){
            this.getSellArea()
            this.getList()


        },
        mounted(){
            let firstRowRect = this.$refs.brandList.$el.getElementsByClassName('el-table__row')[0].getBoundingClientRect()
            this.jumpToCostorder(this.brandListData[0], { clientX: 630, clientY: firstRowRect.top + 20 })
            this.$refs.brandList.setCurrentRow(this.brandListData[0])
        },
        methods:{
            /*刷新数据*/
            flushData(){
                this.getList()
            },
            /*点击删除按钮弹出删除确认框*/
            deleteItem(){
                this.removeBrandVisible=true
            },
            BrandListSearch(){
                this.getList()
            },
            handleSelectionChange(val){
                console.log(val)
            },
            brandSelection(val){
                console.log(val)

            },
            jumpToCostorder(row, event, column) {
                console.log(row, event, column)
                this.templateTableData = [row]
                console.log(row,this.templateTableData)
                if (column&&column.type == "selection") return
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder3')

            },
            /*监测查询关键字*/
            watchKeyWord(){
                let keyWord=this.brandkeyWord&&this.brandkeyWord.trim()
                if(!keyWord){
                    this.getList()
                }
            },
            /*获取售卖区域*/
            async getSellArea(){
                try{
                    let res=await brandSellService.getIRegionManageBySupplierId(this.supplierId)
                    console.log(res)
                    if(res.data.status.statusCode==0){
                        this.areaOptions=res.data.result
                    }else{

                    }
                }catch(e){

                }
            },
            /*获取列表信息*/
           async getList(){
               console.log(this.sellArea)
               console.log(1111111)
               let data={
                    brandName:this.keyWordCom,
                    "supplierId": this.supplierId,
                   pageSize:this.pageSize,
                   pageNum:this.pageNum,
                   sellArea:this.sellArea,

                }
                try{
                    let res=await brandSellService.getListB2bBrandSellareasByPage(data)
                    console.log(res,data)
                    if(res.data.status.statusCode==0){
                        this.brandListData=res.data.result.list
                    }else{
                        this.$customMessage(res.data.status.statusReason,"info")
                    }
                }catch(e){
                    console.log(e)
                }


            },
            async getBrand(){
              try{

                let  res=await brandSellService.getBrandNameByDealerId({supplierId:this.supplierId})
                  console.log(res)
                  if(res.data.status.statusCode==0){
//                    this.remoteSearch=
                  }else{

                  }
              }catch(e){

              }
            },
            /*分页相关方法*/
            handleSizeChange(){},
            handleCurrentChange(){},
            /*多选*/
            brandSelection(val){
                this.templateTableData=val
            },

            /*删除品牌相关方法*/
            cancelRemoveBrand(){
                this.removeBrandVisible=false
                this.$refs.brandListData.clearSelection()

            },
            async sureRemoveBrand(){
                this.removeBrandVisible=false
                let ids=[]
                this.templateTableData.map((item)=>{
                    ids.push(item.id)
                })
                let data={
                    ids,
                }
                try{
                    let res=await brandSellService.delB2bBrandSellareas(data)
                    console.log(res,data)
                    if(res.data.status.statusCode==0){
                        this.getList()
                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }
            },
            /*增加数据*/
            addData(){
                this.addBrandVisible=false

            },
            cancelAdd(){

            },
            sureAdd(){}
,



        }
    }
</script>
<style scoped lang="scss">

</style>
