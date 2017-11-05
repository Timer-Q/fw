<template>
    <div ref="OutBox">
        <div class="projection">
            <ButtonGroup>
                <Button class="public-function-btn"  @click="clickByEdit('add')">新增
                </Button>
                <Button :class="{'public-function-btn':true,'disabled':isDelete}" @click="clickTopBtn('delete')">删除</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button :class="{'public-function-btn':true,'disabled':isStartUp}" @click="clickTopBtn('startUp')">启用</Button>
                <Button :class="{'public-function-btn':true,'disabled':isBlockUp}" @click="clickTopBtn('blockUp')">停用</Button>
            </ButtonGroup>
            <Button class="public-function-btn"  @click="">司机线路转移</Button>
            <Button class="public-function-btn" @click="">导出</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <div >
            <Form :inline="true" class="demo-form-inline">
                <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                    <!--查询方案弹出层开始-->
                    <el-dropdown-menu slot="dropdown">
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
                <FormItem label="关键词">
                    <Input v-model="keyWord" value=""/>
                </FormItem>
                <FormItem label="承运商名称">
                    <Input v-model="carryName" value=""/>
                </FormItem>
                <FormItem label="司机姓名">
                    <Input v-model="driverName" value=""/>
                </FormItem>
                <Button @click="onSubmit">查询</Button>
            </Form>
            <Table
                :data="resultData"
                border
                slot="empty"
                style="width: 100%" :highlight-current-row="true"
                @row-click="chooseRow"
                @selection-change="selectionChange"
            >
                <TableColumn  align="center" type="index" label="序号"></TableColumn>
                <TableColumn type="selection" align="center" width="80"></TableColumn>
                <TableColumn  align="center" prop="deliveryCode" label="派送线路编号" width="180"  class-name="channelName"></TableColumn>
                <TableColumn  align="center" width="80"  label="状态">
                    <template slot-scope="scope">
                                    <span v-if="scope.row.used===true">
                                        启用
                                    </span>
                        <span v-if="scope.row.used===false">
                                        停用
                                    </span>

                    </template>
                </TableColumn>
                <TableColumn  align="center" prop="driverId" label="司机ID"></TableColumn>
                <TableColumn  align="center" prop="driverName" label="司机姓名"></TableColumn>
                <TableColumn  align="center" prop="phoneNo" label="手机号码" width="180"></TableColumn>
                <TableColumn  align="center" prop="carryName" label="承运商名称" width="180"></TableColumn>
                <TableColumn  align="center" prop="coverAreas" label="覆盖区域" width="180"></TableColumn>
                <TableColumn  align="center" prop="coverTypes" label="覆盖类型"></TableColumn>
                <TableColumn  align="center" prop="coverRoutes" label="覆盖线路" width="180"></TableColumn>
                <TableColumn  align="center" prop="keyWords" label="关键词"></TableColumn>
                <TableColumn  align="center" prop="driverId" label="电子围栏"></TableColumn>
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

            <!--对话框-->
            <Dialog class="cj" :title="resultInfo.title" :visible.sync="dialogVisible">
                <div :class="{'dialog-content':resultInfo.msg.split('\n').length>1,'dialog-cont-one':resultInfo.msg.split('\n').length==1}">
                    <p v-for="item in resultInfo.msg.split('\n')">{{item}}</p>
                </div>
                <span slot="footer" class="dialog-footer">
                <Button size="small" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="primary" @click="confirmBtnClick">确 定</Button>
            </span>
            </Dialog>
            <tooltip name="costorder">
                <el-button size="mini" @click="clickByEdit('update')">修改</el-button>
                <el-button size="mini" @click="">删除</el-button>
                <el-button size="mini" @click="">启用</el-button>
                <el-button size="mini" @click="">详情</el-button>
                <el-button size="mini" @click="">司机线路转移</el-button>
            </tooltip>
        </div>
    </div>

</template>

<script>
    import service from "@Tms/services/driverDispatchRoute/route.js"
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    export default {
        data: function () {
            return {
                resultData:null,
                currentPage: 4,
                removeRow:"",
                remove:false,
                coverAreaId:"",
                keyWord:"",
                carryName:"",
                driverName:"",
                selectedRow:{},
                // 选中driverId集合
                driverIds: [],
                ids:[],
                // 是否可启动
                isStartUp: false,
                // 是否可停用
                isBlockUp: false,
                // 是否可删除
                isDelete: false,
                used:'',
                page: {
                    pageSizes: [10, 20, 50, 100, 150, 200],
                    currentPage: 1,
                    total: 10,
                    pageSize: 10,
                },
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                delReqArry:[],
                loading: true,
                // 对话框是否显示
                dialogVisible: false
            }
        },
        watch:{
            /*监控resultData.length,不等于零的时候就让,修改,删除,刷新,按钮变为可用*/
            resultData(){
                /* console.log("change")
                 if(this.resultData!=null){
                        this.isStartUp= true
                         // 是否可停用
                        this.isBlockUp= true
                         // 是否可删除
                        this.isDelete=true
                 }*/
            }
        },
        mounted(){
            this.getDeliveryList()
        },
        methods:{
            //表格数据
            async getDeliveryList(){
                this.loading = true
                const message = {
                    companyId:1,
                    keyWord: this.keyWord,
                    carryName: this.carryName,
                    driverName: this.driverName,
                    currentPage: this.page.currentPage,
                    pageSize:this.page.pageSize
                }
                try {
                    const data = await service.getDeliveryList(message)
                    if (data.status == 200) {
                        if(data.data.result!=null){
                            this.resultData=data.data.result
                            // 赋值总条数
                            this.getDeliveryCount()
                        }else{
                            this.resultData=null
                        }
                    } else {
                        console.log(data.status.statusReason)
                        this.$customMessage("查询失败","error")
                    }
                    this.loading = false
                    this.defaultBtnState()
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            async getDeliveryCount(){
                //暂时写死
                const message = {
                    companyId:1,
                    keyWord: this.keyWord,
                    carryName: this.carryName,
                    driverName: this.driverName,
                }
                const data = await service.getDeliveryCount(message)
                if (data.status == 200) {
                    const result = data.data.result
                    this.page.total=result
                }
            },
            // 对话框确定按钮
            async confirmBtnClick(){
                const type = this.resultInfo.type
                if(type == 'startUp'){
                    this.used=true
                }else if(type == 'blockUp'){
                    this.used=false
                }
                try{
                    if(type=='startUp'||type == 'blockUp'){
                        const message = {
                            companyId: 1,
                            driverIds: this.driverIds,
                            used: this.used
                        }
                        const data = await service.updateDriverUsedStatus(message)
                        if(data.status==200){
                            this.getDeliveryList()
                            this.$customMessage("操作成功","success")
                        }else{
                            console.log(data.status.statusReason)
                            this.$customMessage("操作失败","error")
                        }
                    }else if(type=='delete'){
                        const message = this.delReqArry
                        const data = await service.deleteDeliveryList(message)
                        if(data.status==200){
                            this.getDeliveryList()
                            this.$customMessage("操作成功","success")
                        }else{
                            console.log(data.status.statusReason)
                            this.$customMessage("操作失败","error")
                        }
                    }
                    this.dialogVisible = false
                }catch(e){
                    console.log(e)
                    this.$customMessage("操作失败-c","error")
                }
            },
            // 列表上部按钮
            clickTopBtn(state){
                if (!this.ids.length) {
                    this.$customMessage("请勾选至少一条记录","warning")
                    return
                }
                this.resultInfo.type = state
                switch (state) {
                    case "startUp": {
                        this.resultInfo.title = '启动确认'
                        this.resultInfo.msg = '确定要启用已停用的记录吗？'
                    }
                        break
                    case "blockUp": {
                        this.resultInfo.title = '停用确认'
                        this.resultInfo.msg = '确定要停用已启用的记录吗？'
                    }
                        break
                    case "delete": {
                        this.resultInfo.title = '删除提示'
                        this.resultInfo.msg = '确定要删除选中的派送线路吗？'
                    }
                        break
                }
                this.dialogVisible = true
            },
            /*获取列表信息*/
            onSubmit(){
                this.getDeliveryList()
            },
            handleSizeChange(val) {
                this.page.pageSize = val
                this.getDeliveryList()
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                this.page.currentPage = val
                this.getDeliveryList()
                console.log(`当前页: ${val}`)
            },

            // 默认启用/停用/删除按钮状态
            defaultBtnState(){
                this.isStartUp = false
                this.isBlockUp = false
                this.isDelete = false
            },
            // 点击table每行
            chooseRow(row,event,column){
                console.log(row,'选中行')
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
                this.selectedRow=row
                if (column.type == 'selection' || column.type == 'index')
                    return
                // 按钮是否可操作赋值
                this.isStartUp = row.status==1?true:false
                this.isDelete = this.isStartUp
                this.isBlockUp = !this.isStartUp
                this.removeRow=row

            },
            // 列表复选框发生改变
            selectionChange(selection){
                this.driverIds = []
                this.ids = []
                this.delReqArry=[]
                selection.forEach((item) => {
                    this.delReqArry.push(item)
                    this.driverIds.push(item.driverId)
                    this.ids.push(item.id)
                })
            },

            // 新增/修改/详情下的跳转

            clickByEdit(state, row, tabDetail) {/*row是渠道列表当前行的字段信息*/
                console.log(state, /update/.test(state))
                let flag = false
                this.tabAdd(state,row)
            },

            tabAdd(state,row){
                let addTabObj = {
                    name: `司机派送线路-` + (state == "add" ? "新增" : /update/.test(state) ? "修改" : "详情"),
                    tag: `${this.tag}_` + state,

//                    DetailTag:tabDetail&&tabDetail.tag||""
                    state:state,
                    parentTag: ''
                }
                if(!addTabObj.selectedLine&&state!="add"){
                    addTabObj.selectedLine = this.selectedRow
                }


                this.$root.bus.$emit('routeAdd', addTabObj)
            },



            // 修改
//            toUpdatePage(){
//                let addTabObj = {
//                    name: '司机派车线路-修改',
//                    tag: 'tms_driverDispatchRouteUpdate',
//                    parentTag: ''
//                }
//                this.$root.bus.$emit('routeUpdate', addTabObj)
//            }
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
