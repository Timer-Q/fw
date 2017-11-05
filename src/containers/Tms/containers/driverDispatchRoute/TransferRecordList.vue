<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" @click="">导出</Button>
        </div>
        <div ref="OutBox">
            <Form :inline="true" class="demo-form-inline">
                <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                    <!--查询方案弹出层开始-->
                    <el-dropdown-menu slot-scope="dropdown">
                        <el-dropdown-item divided>黄金糕
                            <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided>狮子头
                            <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided>螺蛳粉
                            <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided>双皮奶
                            <span>
                                <i class="iconfont icon-xiugai"></i>
                                <i class="iconfont icon-guanbi"></i>
                                </span>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                    <!--查询方案弹出层结束-->
                </el-dropdown>
                <FormItem label="覆盖区域">
                    <Input v-model="coverAreaId" value="全境"/>
                </FormItem>
                <FormItem label="原司机姓名">
                    <Input v-model="driverName" value=""/>
                </FormItem>
                <FormItem label="目标司机">
                    <Input v-model="targetDriverName" value=""/>
                </FormItem>
                <FormItem label="操作类型">
                    <Select placeholder="全部" v-model="type">
                        <Option
                            v-for="item in zylx"
                            :key="item.itemCode"
                            :label="item.itemName"
                            :value="item.itemCode">
                        </Option>
                    </Select>
                </FormItem>
                <Button @click="onSubmit">查询</Button>
            </Form>
            <Table
                :data="resultData"
                border
                slot-scope="empty"
                style="width: 100%" :highlight-current-row="true"
                @row-click="chooseRow"
            >
                <TableColumn  align="center" type="index" width="80" label="序号"></TableColumn>
                <TableColumn type="selection" align="center" width="80"></TableColumn>
                <TableColumn  align="center" prop="recordCode" label="转移编号" width="250"  class-name="channelName"></TableColumn>
                <TableColumn label="操作类型" sortable width="105" header-align="center">
                    <template slot-scope="scope">
                                    <span v-if="scope.row.type===1" >
                                        部分转移
                                    </span>
                        <span v-if="scope.row.type===2">
                                        全部转移
                                    </span>
                        <span v-if="scope.row.type===3" >
                                        部分复制
                                    </span>
                        <span v-if="scope.row.type===4">
                                        全部复制
                                    </span>
                    </template>
                </TableColumn>
                <TableColumn  align="center" prop="driverId" label="原司机ID"></TableColumn>
                <TableColumn  align="center" prop="driverName" label="原司机姓名"></TableColumn>
                <TableColumn  align="center" prop="phoneNo" label="原司机手机号码" width="180"></TableColumn>
                <TableColumn  align="center" prop="carryName" label="原承运商名称" width="180"></TableColumn>
                <TableColumn  align="center" prop="targetDrivers" label="目标司机" width="180"></TableColumn>
                <TableColumn prop="createUser" label="制单人" sortable width="100" header-align="center">
                </TableColumn>
                <TableColumn label="制单时间" sortable width="140" header-align="center" align="right">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime | formatDate}}</span>
                    </template>
                </TableColumn>
                <TableColumn prop="updateUser" label="修改人" sortable width="100" header-align="center">
                </TableColumn>
                <TableColumn label="修改时间" sortable width="140" header-align="center" align="right">
                    <template slot-scope="scope">
                        <span>{{ scope.row.updateTime | formatDate}}</span>
                    </template>
                </TableColumn>
            </Table>
            <tooltip name="costorder">
                <el-button size="mini"  @click="Chadetail">详情</el-button>
            </tooltip>
            <Pagination v-show="resultData!=null"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-sizes="page.pageSizes"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total"
                        class="f_r"
            >
            </Pagination>
        </div>
    </div>

</template>

<script>
    import service from "@Tms/services/driverDispatchRoute/route.js"
    import commonService from '@Tms/services/common/common.js'
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    export default {
        mixins:[screenScrollMixins],
        props:["deleteVisible"],
        data: function () {
            return {
                resultData:null,
                currentPage: 4,
                removeRow:"",
                remove:false,
                coverAreaId:"",
                driverName:"",
                targetDriverName:"",
                type:"",
                page: {
                    pageSizes: [10, 20, 50, 100, 150, 200],
                    currentPage: 1,
                    total: 10,
                    pageSize: 10,
                },
                zylx: [],
                loading: true
            }
        },
        watch:{

        },
        mounted(){
            this.getRecordList()
        },
        methods:{
            //表格数据
            async getRecordList(){
                this.loading = true
                const message = {
                    companyId:1,
                    driverName: this.driverName,
                    targetDriverName: this.targetDriverName,
                    type: this.type,
                    currentPage: this.page.currentPage,
                    pageSize:this.page.pageSize
                }
                try {
                    const data = await service.getRecordList(message)
                    if (data.status == 200) {
                        if(data.data.result!=null){
                            this.resultData=data.data.result
                            // 赋值总条数
                            this.getRecordCount()
                        }else{
                            this.resultData=null
                        }
                    } else {
                        console.log(data.status.statusReason)
                        this.$customMessage("查询失败","error")
                    }
                    this.loading = false
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            async getRecordCount(){
                //暂时写死
                const message = {
                    companyId:1,
                    driverName: this.driverName,
                    targetDriverName: this.targetDriverName,
                    type: this.type
                }
                const data = await service.getRecordCount(message)
                if (data.status == 200) {
                    const result = data.data.result
                    this.page.total=result
                }
            },
            async getDictoryByCode() {
                let _this = this
                const message = {code: 'zylx'}
                const data = await commonService.fetchDictionary(message)
                if (data.status == 200) {
                    const result = data.data.result
                    this.zylx = result
                }
            },
            //按钮详情
            async  showdei(row){
                let companyId=this.resultData.companyId
                let recordCode=this.resultData.recordCode
                const message={
                    companyId: companyId,
                    recordCode:recordCode
                }
                const data = await service.getTransferKeyWordDetail(message)
            },
            // 詳情
            Chadetail(){
                this.showdei()
            },
            created() {
                this.getDictoryByCode()
            },
            /*获取列表信息*/
            onSubmit(){
                this.getRecordList()
            },
            handleSizeChange(val) {
                this.page.pageSize = val
                this.getRecordList()
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                this.page.currentPage = val
                this.getRecordList()
                console.log(`当前页: ${val}`)
            },
            // 点击table每行
            chooseRow(row,event,column){
                if (column.type == 'selection' || column.type == 'index')
                    return
                this.removeRow=row

            },
        },
        components:{

        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes())
            }
        }
    }
    function getFormat(val) {
        return val.toString().length > 1 ? val : "0" + val
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
