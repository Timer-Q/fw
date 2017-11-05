<template>
  <div ref="OutBox">
      <Form :inline="true" :model="formInline" class="demo-form-inline">
          <FormItem label="创建人">
              <Input placeholder="创建人名称" v-model="formInline.createUser"/>
          </FormItem>
          <FormItem label="渠道名称">
              <Input placeholder="渠道名称" v-model="formInline.canalName"/>
          </FormItem>
          <div class="block">
              <span class="demonstration">创建时间</span>
              <el-date-picker
                  format="yyyy/MM/dd"
                  v-model="formInline.date"
                  type="daterange"
                  placeholder="选择日期范围"
                  ref="pickDate"
              >
              </el-date-picker>
          </div>
          <Button @click="onSubmit">查询</Button>
      </Form>
      <Table
          :data="tableData"
          border
          slot="empty"
          style="width: 100%" :highlight-current-row="true"
          @cell-click="jumpToDetail"
          @row-click="chooseRow">
          <TableColumn  align="center" type="index" label="序号" width="100"></TableColumn>
          <TableColumn  align="center" prop="id" label="渠道ID" width="180"></TableColumn>
          <TableColumn  align="center" prop="canalName" label="渠道名称" class-name="channelName"></TableColumn>
          <TableColumn  align="center" prop="canalDescribe" label="渠道描述"></TableColumn>
          <TableColumn  align="center" prop="merchantCount" label="客户数量" width="180"></TableColumn>
          <TableColumn  align="center" prop="storeCount" label="商品黑明单数量"></TableColumn>
          <TableColumn  align="center" prop="createUser" label="创建人" width="180"></TableColumn>
          <TableColumn  align="center" prop="createTime" label="创建时间"></TableColumn>
      </Table>
      <Pagination v-show="tableData.length!=0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
          class="f_r"
      >
      </Pagination>
      <div class="nochannel" v-if="tableData.length==0">
          <p>您未创建任何渠道类型，点击左上角&nbsp;<Button type="text" @click="clickByEditAdd">新增渠道</Button>&nbsp;按钮，创建渠道类型</p>
      </div>
      <!--删除确认框-->
      <Dialog
          title="删除提示"
          :visible.sync="removeChannelVisible"
          size="tiny"
      >
          <span>您确定删除该渠道类型?</span>
          <span slot="footer" class="dialog-footer">
    <Button @click="removeChannelVisible=false">取 消</Button>
    <Button type="primary" @click="sureRemoveChannel">确 定</Button>
  </span>
      </Dialog>

  </div>
</template>
<script>
    import channelService from "@B2B/services/channel/channelService.js"
    import screenScrollMixins from '@B2B/mixins/screenScrollMixins.js'

    export default {
        mixins:[screenScrollMixins],
        props:["deleteVisible"],
		data: function () {

			return {
                formInline: {
                    canalName: '',
                    createUser: '',
                    status:1,
                    date:"",
                    pageNum:1,
                    pageSize:10,

                },
                value6:"",
                tableData:[
                    {
                        index: 1,
                        id: '111',
                        canalDescribe: '上海市普陀区金沙江路 1518 弄',
                        canalName:"a",
                    }, {
                        index: 2,
                        id: '222',
                        canalDescribe: '上海市普陀区金沙江路 1517 弄',
                        canalName:"b",
                    }, {
                        index: 3,
                        id: '333',
                        canalDescribe: '上海市普陀区金沙江路 1519 弄',
                        canalName:"c",
                    }, {
                        index:4 ,
                        id: '444',
                        canalDescribe: '上海市普陀区金沙江路 1516 弄',
                        canalName:"d",
                    }
                ],
                totalNum:0,
                currentPage4: 1,

                getList:{
                    status:1,
                    createUser:0,
                    canalName:"",
                    startCreateTime:0,
                    endCreateTime:0,
                },
                removeRow:"",
                removeChannelVisible:false,





            }
		},
        watch:{
            /*监控tableData.length,不等于零的时候就让,修改,删除,刷新,按钮变为可用*/
            tableData(){
                console.log("change")
                if(this.tableData.length!=0)this.$emit("buttonState",false)
            },
            /*监控查询条件,如果查询条件全为空则重新请求第一页数据渲染*/
/*            formInline:{
              handler:function (val,oldVal) {
                  let req=val.canalName.replace(/ +/,"")==false&&val.createUser.replace(/ +/,"")==false&&val.date.replace(/ +/,"")==false
                  if(req){
                      this.getDetail({status:1})
                  }
              },
              deep:true,
            },*/
        },
        created(){

            this.getDetail()
            this.$root.bus.$on("getDetail",()=>{
                console.log("触发成功")
                this.getDetail()
            })

            this.$root.bus.$on("jumpToEditChannel",()=>{
                let id=this.removeRow.id
                this.$root.bus.$emit("clickByEdit", "update" + id, this.removeRow)

                console.log('点击修改按钮')
            })

        },
        mounted(){

        },
        methods:{

           async getDetail(){
               console.log("getDetail执行成功")
               let data={
                    status:1,
                    pageNum:1,
                    pageSize:10,
                }

//                let url="http://192.168.170.102:7778/b2b-seller-admin/page/getListB2bCanalsByPage"
               try{
                    let res=await channelService.getListB2bCanalsByPage(data)
                   if(res.data.status.statusCode==0){
                        this.tableData=res.data.result.list
                        this.totalNum=Number(res.data.result.total)
                   }else{
                       console.log(res.data.status.statusReason)
                   }
               }catch(e){
                   console.log(e)
               }

            },


            /*获取列表信息*/
		    onSubmit(){
                let data=this.formInline
                data.startCreateTime=data.date[0]&&data.date[0].getTime()
                data.endCreateTime=data.date[1]&&timeFormat(data.date[1])
                console.log(data)
                this.getDetail(data)
            },
            handleSizeChange(val) {
		        this.formInline.pageSize=val

                console.log(val,`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
		        this.formInline.pageNum=val
                this.onSubmit()
                console.log(val,`当前页: ${val}`)

            },
            /*增加二级页签*/
            clickByEditAdd(){
                this.$emit('addChannel', 'add')
            },
            /*跳转到详情页*/
            async jumpToDetail(row,column,cell,event){
              if(column.label=="渠道名称"){
                  /*将点击的渠道信息进行传递*/
                  let _this=this
                  let id=row.id

//                  let url="http://192.168.170.102:7778/b2b-seller-admin/getB2bCanalById"+"/"+id
                  try{
                    let res=await channelService.getB2bCanalById(row)
                      if(res.data.status.statusCode==0){
                          row={...row,...res.data.result}
                          this.$root.bus.$emit('clickByEdit', "detail"+row.id,row)
                      }else{
                          console.log(res.data.status.statusReason)
                      }
                  }catch(e){
                      console.log(e)
                  }




              }
            },
            /*选中渠道*/
            chooseRow(row,event,column){
                console.log(row)
                this.removeRow=row
                console.log(this.removeRow)

            },
            async sureRemoveChannel(){
                this.removeChannelVisible=false
                this.tableData=this.tableData.filter((item)=>(item.id!=this.removeRow.id))
//                let url="http://192.168.170.102:7778/b2b-seller-admin/delB2bCanal/"+this.removeRow.id
//                console.log(url)
                try{

                   let res=await channelService.delB2bCanal(this.removeRow.id)
                   if(res.status==200){
                       console.log("删除成功")
                       this.onSubmit()
                   }else{
                       console.log(res.status.statusReason)
                   }
               }catch (e){
                   console.log(e)
               }


            },


        },
        components:{

        },
	}

	/*查询时间格式转化*/
function timeFormat(str) {
    let newMonth=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]
    let reg=/(\w+) (\w+) (\d+) (\d+) (.+)/g
    str=str.toString().replace(reg,function () {
        let newTime=[...arguments].slice(1)
        console.log(newTime)
        newTime[0]=""
        newMonth.find((item,index)=>{
            if(item==newTime[1]){
                newTime[1]=index+1
                return true
            }
            return false
        })
        return newTime[3]+" "+newTime[1]+" "+newTime[2]

    }).replace(/ /g,"/")
    str=(new Date(str+" 23:59:59")).getTime()
    return str
    console.log(str)
}





</script>
<style lang="scss" scoped>
    .block{
        display: inline-block;
        margin-right:10px;
        .el-date-editor.el-input.el-date-editor--daterange{
            width:230px;
        }
    }
    .demo-form-inline{
        margin:15px 0 10px 0;
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
</style>
