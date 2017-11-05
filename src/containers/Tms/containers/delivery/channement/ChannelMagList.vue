<template>
  <div ref="OutBox">
      <Form :inline="true" :model="formInline" class="demo-form-inline">
          <FormItem label="覆盖区域">
              <Input value="全境"/>
          </FormItem>
          <FormItem label="道路名称">
              <Input v-model="queryPathName" value=""/>
          </FormItem>
          <FormItem label="线路名称">
              <Input v-model="queryRouteName" value=""/>
          </FormItem>
          <Button @click="showData">查询</Button>
      </Form>
      <Table
          :data="tableData"
          border
          slot="empty"
          ref="multipleTable"
          style="width: 100%" :highlight-current-row="true"
          @row-click="rowClick"
          @row-dblclick="Chadetail"
          @select="handleSelectionChange"
          @select-all="selectAll"
          @cell-click="showdeil"
      >
          <TableColumn  align="center" type="index" label="序号"></TableColumn>
          <TableColumn type="selection" align="center" width="80"></TableColumn>
          <TableColumn  align="center" prop="routeCode" label="线路编号" width="180"  class-name="channelName"></TableColumn>
          <TableColumn  align="center" prop="routeName" label="线路名称"></TableColumn>
          <TableColumn  align="center" prop="routeState" label="状态"></TableColumn>
          <TableColumn  align="center" prop="coverAreas" label="覆盖区域" width="180"></TableColumn>
          <TableColumn  align="center" prop="coverTypes" label="覆盖类型"></TableColumn>
          <TableColumn  align="center" prop="roadNames" label="道路名称" width="180"></TableColumn>
          <TableColumn  align="center" prop="numberTypes" label="号码类型"></TableColumn>
          <TableColumn  align="center" prop="startNums" label="起始号码"></TableColumn>
          <TableColumn  align="center" prop="endNums" label="结束号码"></TableColumn>
          <TableColumn  align="center" prop="createUser" label="制单人"></TableColumn>
          <TableColumn  align="center" prop="createTime" label="制单时间"></TableColumn>
          <TableColumn  align="center" prop="updateUser" label="修改人"></TableColumn>
          <TableColumn  align="center" prop="updateTime" label="修改时间"></TableColumn>

      </Table>

      <tooltip name="costorder">
          <el-button size="mini" @click="Charevise">修改</el-button>
          <el-button size="mini" @click="emitDelEvent">删除</el-button>
          <el-button size="mini" @click="emitUpdataEvent">{{routeState}}</el-button>
          <el-button size="mini"  @click="Chadetail">详情</el-button>
      </tooltip>

      <Pagination v-show="tableData.length!=0"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"

                  :page-size="2"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="listTotal"
                  class="f_r"
      >
      </Pagination>





  </div>
</template>
<script>
    import service from "@Tms/services/channelService.js"
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'


    export default {
        mixins:[screenScrollMixins],
		data: function () {

			return {
                formInline: {
                    user: '',
                    region: ''
                },
                value6:"",
                showDetail:[],
                tableData:[],
                currentPage: 1,

                getList:{
                    status:1,
                    createUser:0,
                    canalName:"",
                    startCreateTime:0,
                    endCreateTime:0,
                },
                removeRow:"",
                routeState:"",
                queryPathName:"",
                queryRouteName:"",
                currentPage:1,
                pageSize:10,
                listTotal:0
            }
		},
        watch:{

        },
        created(){
            this.showData({status:1})
        },
        mounted(){
            this.showData()
        },
        methods:{
            //修改
            Charevise(){
                this.showrevise()
            },

            //按钮修改
            async  showrevise(row){
                let companyId=this.dispatcherData.companyId
                let id=this.dispatcherData.id
                const message={
                    id: companyId,
                    route:id
                }
                const data = await service.showdeil(message)
                await this.$emit("addChannel","update"+this.dispatcherData.id,this.dispatcherData,data)
            },
            // 詳情
            Chadetail(){
                this.showdei()
            },
            //按钮详情
            async  showdei(row){
                let companyId=this.dispatcherData.companyId
                let id=this.dispatcherData.id
                    const message={
                        id: companyId,
                        route:id
                    }
                    const data = await service.showdeil(message)
                    await this.$emit("addChannel","detail"+this.dispatcherData.id,this.dispatcherData,data)
            },

            //线路编号详情
            async  showdeil(row,column,cell,event){
                if(column.label=="线路编号"){
                    let _this=this
                    let companyId= row.companyId
                    let id= row.id
                    const message = {
                        id: companyId,
                        route:id
                    }

                    const data = await service.showdeil(message)


                    await this.$emit('addChannel', "detail"+row.id,row,data)

                }
            },

            rowClick(row, event, column){
                if(column.label != "线路编号" && column.label) {
                    this.$tooltip({
                        top: event.clientY+5,
                        left: event.clientX+5
                    }, 'costorder')
                    this.dispatcherData=row
                    row.routeState == "启用"? this.routeState="停用" : this.routeState="启用"
                    this.$refs.multipleTable.clearSelection()
                    this.$refs.multipleTable.toggleRowSelection(row)
                    this.$emit("getVal", [row])
                    return this.dispatcherData
                }
            },

            //表格数据
            async showData(){
                this.loading = true
                try {
                    const data = await service.showdeta({
                        "companyId": 1,
                        "currentPage": this.currentPage,
                        "pageSize": this.pageSize,
                        "roadName":this.queryPathName,
                        "routeName":this.queryRouteName
                    })
                    if (data.status == 200) {
                        if(data.data.result){
                            data.data.result.forEach((item,index)=>{
                                item["createTime"]=this.getLocalTime(item["createTime"])
                                if(item["updateTime"])  item["updateTime"]=this.getLocalTime(item["updateTime"])
                                if(item["routeState"]) item["routeState"]="启用"
                                else item["routeState"]="停用"
                            })
                            this.tableData = data.data.result
                        }else{
                            this.tableData=[]
                        }
                    } else {
                        this.tableData=[]
                        console.log(1)
                }
                    const listTotal = await service.getListTotal({companyId: 1})
                    if (listTotal.status == 200) {
                        this.listTotal=listTotal.data.result
                    } else {
                        console.log(1)
                    }
                    this.loading = false
                }
                catch (e) {
                    console.log(e)
                }
            },
            emitDelEvent (){
                this.$emit("deleteChannel")
            },
            emitUpdataEvent (e){
                this.$emit("updataRouteState",e)
            },
            //每页size更改
            handleSizeChange(val) {
                this.pageSize=val
		        this.showData()
            },
            //页码更改
            handleCurrentChange(val) {
                this.currentPage=val
                this.showData()

            },
            handleSelectionChange(val){
                this.$emit("getVal", val)
            },
            selectAll(val){
                this.$emit("getVal", val)
            },
            //时间戳转为日期
            getLocalTime(nS) {
                return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)
            }
        },
        components:{

        },
	}
</script>
<style lang="scss" scoped>

    .el-form-item{
        margin-left: 5px;
    }

    .demo-form-inline{
        margin:15px 0 10px 0;
        background:#e4e4e4;
        height:50px;
        line-height:50px;
    }
    .nochannel{
        width:100%;
        padding-top: 300px;
        text-align: center;
        p{
            color: gray;
        }
    }
.channelName{
    color: dodgerblue;
}


    .el-input{
        width:160px;
        margin-top: 8px;
    }



</style>
