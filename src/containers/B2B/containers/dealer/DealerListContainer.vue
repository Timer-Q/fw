<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" @click="clickDistributionDealerBtn">分配经销商</Button>
            <ButtonGroup>
                <Button :class="['public-function-btn',isStartUp?'disabled':'']" @click="clickTopBtn('startUp')">启用
                </Button>
                <Button :class="['public-function-btn',isBlockUp?'disabled':'']" @click="clickTopBtn('blockUp')">停用
                </Button>
            </ButtonGroup>
            <Button :class="['public-function-btn',isDelete?'disabled':'']" @click="clickTopBtn('delete')">删除
            </Button>
            <Button class="public-function-btn" @click="getDealerList">刷新</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <div class="content">
            <div class="search">
                <Form :inline="true" :model="{}" class="demo-form-inline">
                    <FormItem>
                        <Button class="search-scheme">查询方案<i class="iconfont icon-fangan"></i></Button>
                    </FormItem>
                    <FormItem label="选择站点">
                        <Select v-model="searchObj.stationId">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="经销商">
                        <Input placeholder="经销商名称/简称" v-model="searchObj.dealerName"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <Input placeholder="请输入" v-model="searchObj.phone"></Input>
                    </FormItem>
                    <FormItem>
                        <Button class="search-btn" @click="getDealerList">查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="text">高级查询</Button>
                    </FormItem>
                    <FormItem>
                        <!--<Button type="text" disabled="disabled">清空</Button>-->
                        <Button type="text" @click="resetSearch">清空</Button>
                    </FormItem>
                </Form>
            </div>
            <!--<Table :loading="loading" border :columns="tableTitle" :data="tableContent"></Table>-->

            <Table
                max-height="680"
                style="width: 100%"
                :data="tableContent"
                :loading="loading"
                border
                :highlight-current-row="true"
                @row-click="handleRowClick"
                @selection-change="selectionChange"
            >
                <TableColumn
                    type="index"
                    fixed
                    width="50"
                    label="序号">
                </TableColumn>
                <TableColumn
                    type="selection"
                    fixed
                    width="55">
                </TableColumn>
                <TableColumn
                    prop="id"
                    label="经销商ID">
                    <template slot-scope="scope">
                        <Button type="text">{{ scope.row.id }}</Button>
                    </template>
                </TableColumn>
                <TableColumn
                    prop="name"
                    label="经销商名称">
                </TableColumn>
                <TableColumn
                    prop="stationName"
                    label="所属站点">
                </TableColumn>
                <TableColumn
                    prop="address"
                    label="地址">
                </TableColumn>
                <TableColumn
                    prop="contactPeople"
                    label="联系人">
                </TableColumn>
                <TableColumn
                    prop="contactTel"
                    label="联系电话">
                </TableColumn>
                <TableColumn
                    prop="businessType"
                    label="业务类型">
                </TableColumn>
                <TableColumn
                    prop="channelType"
                    label="渠道类型">
                </TableColumn>
                <TableColumn
                    prop="status"
                    label="状态"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.status==1 ? '启用' : '停用'}}</span>
                    </template>
                </TableColumn>

            </Table>
            <Pagination
                v-if="page.pageSizes>1"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNum"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </Pagination>
        </div>

        <!--对话框-->
        <Dialog class="dialog-default" :title="resultInfo.title" :visible.sync="dialogVisible">
            <div :class="{'dialog-content':resultInfo.msg.split('\n').length>1,'dialog-cont-one':resultInfo.msg.split('\n').length==1}">
                <p v-for="item in resultInfo.msg.split('\n')">{{item}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <Button size="small" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="primary" @click="confirmBtnClick">确 定</Button>
            </span>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped>
    .text_btn {
        color: #3320ee;
        cursor: pointer;
    }
</style>
<script>
    import dealerService from '@B2B/services/substatAdmin/dealerService.js'
    export default{
        data(){
            return {
                value: '',
                loading: true,
                searchObj:{
                    // 站点id（search选择）
                    stationId: 10001,
                    // 经销商名称/简介
                    dealerName:'',
                    // 电话
                    phone:''
                },
                // 选中经销商id集合
                dealerIds: [],
                // 是否可启动
                isStartUp: true,
                // 是否可停用
                isBlockUp: true,
                // 是否可删除
                isDelete: true,
                tableContent: [],

//                tableTitle: [
//                    {
//                        title: '序号',
//                        type:'index',
//                        width: 50,
//                        fixed: 'left'
//                    },
//                    {
//                        type:'selection',
//                        width: 55,
//                        fixed: 'left'
//                    },
//                    {
//                        title: '经销商ID',
//                        key:'id',
//                        render: (h, params) => {
//                            h('Button', {
//                                props: {
//                                    type: 'text',
//                                    size: 'small',
//                                    style: {
//                                        color: 'rgb(114,110,240)'
//                                    }
//                                },
//                                on: {
//                                    click: () => {
////                                        this.editProduct(params.row)
//                                    }
//                                }
//                            }, params.row.id)
//                        }
//                    },
//                    {
//                        title: '经销商名称',
//                        key:'name'
//                    },
//                    {
//                        title: '所属站点',
//                        key:'stationName'
//                    },
//                    {
//                        title: '账号',
//                        key:''
//                    },
//                    {
//                        title: '地址',
//                        key:'address'
//                    },
//                    {
//                        title: '联系人',
//                        key:'contactPeople'
//                    },
//                    {
//                        title: '联系电话',
//                        key:'contactTel'
//                    },
//                    {
//                        title: '业务类型',
//                        key:'businessType'
//                    },
//                    {
//                        title: '渠道类型',
//                        key:'channelType'
//                    },
//                    {
//                        title: '经营品牌',
//                        key:''
//                    },
//                    {
//                        title: '所有品牌',
//                        key:'',
//                        render: (h, params) => {
//                            return h('div', {
//                                domProps: {
//                                    innerHTML: params.row.sypp?params.row.sypp:'-'
//                                }
//                            })
//                        }
//                    },
//                    {
//                        title: '平台客户',
//                        key:''
//                    },
//                    {
//                        title: '状态',
//                        key:'status',
//                        render: (h, params) => {
//                            return h('div', {
//                                domProps: {
//                                    innerHTML: params.row.status?'启动':'禁用'
//                                }
//                            })
//                        }
//                    }
//                ],

//                tableContent: [{
//                    id: '12987122',
//                    name: '王小虎',
//                    stationName: '北京',
//                    address: '海淀',
//                    contactPeople:'gy',
//                    contactTel:'13311111111',
//                    businessType:'1',
//                    channelType:'1',
//                    status:1
//                }, {
//                    id: '1111111111',
//                    name: 'dsfdd',
//                    stationName: '北京',
//                    address: '海淀',
//                    contactPeople:'gy',
//                    contactTel:'13311111111',
//                    businessType:'1',
//                    channelType:'1',
//                    status:0
//                }],

                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                // 对话框是否显示
                dialogVisible: false
            }
        },
        methods: {

            // 获取tableData
            async getDealerList(){
                this.loading = true

                // 请求分页数据
                try {
                    const data = await dealerService.getDealerList(this.searchObj.stationId, this.searchObj.dealerName,this.searchObj.phone,this.page.pageNum, this.page.pageSize)
                    if (data.status == 200&&data.data.result) {
                        const result = data.data.result
                        // 赋值tableData
                        this.tableContent = []
                        result.list.forEach((item)=>{
                            this.tableContent.push(item)
                        })
                        // 赋值总条数
                        this.page.total = result.total
                        // 总页数
                        this.page.pages = result.pages
                    }else{
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

            // 清空
            resetSearch(){
                this.searchObj={}
                this.searchObj.stationId = 10001
            },
            // 默认启用/停用/删除按钮状态
            defaultBtnState(){
                this.isStartUp = true
                this.isBlockUp = true
                this.isDelete = true
            },

            // 点击table每行
            handleRowClick(row, event, column) {
                if (column.type == 'selection' || column.type == 'index')return

                // table行按钮集
//                this.$tooltip({
//                    top: event.clientY,
//                    left: event.clientX
//                }, 'costorder')

                // 按钮是否可操作赋值
                this.isStartUp = row.status==1?true:false
                this.isDelete = this.isStartUp
                this.isBlockUp = !this.isStartUp

            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getDealerList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getDealerList()
            },

            // 列表上部按钮
            clickTopBtn(state){
                if (!this.dealerIds.length) {
                    this.$customMessage("请勾选至少一条记录","warning")
                    return
                }
                this.resultInfo.type = state
                switch (state) {
                    case "startUp": {
                        this.resultInfo.title = '启动确认'
                        this.resultInfo.msg = '确定启动该经销商？'
                    }
                        break
                    case "blockUp": {
                        this.resultInfo.title = '停用确认'
                        this.resultInfo.msg = '确定停用该经销商？\n 停用后该经销商将不能再本站发布商品'
                    }
                        break
                    case "delete": {
                        this.resultInfo.title = '删除提示'
                        this.resultInfo.msg = '确定彻底删除与该经销商合作关系？'
                    }
                        break
                }
                this.dialogVisible = true
            },

            // 列表复选框发生改变
            selectionChange(selection){
                this.dealerIds = []
                selection.forEach((item) => {
                    this.dealerIds.push(item.id)
                })
            },

            // 对话框确定按钮
            async confirmBtnClick(){
                const type = this.resultInfo.type
                let status = type == 'startUp' ? 1 : type == 'blockUp' ? 2 : 3
                const message = {
                    stationId: this.searchObj.stationId,
                    dealerIds: this.dealerIds,
                    status: status
                }
                try{
                    const data = await dealerService.updateByStationId(message)
                    if(data.status==200){
//                        const successCount = data.result
                        this.getDealerList()
                        this.$customMessage("操作成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败","error")
                    }
                    this.dialogVisible = false
                }catch(e){
                    console.log(e)
                    this.$customMessage("操作失败-c","error")
                }
            },

            // 分配经销商按钮
            clickDistributionDealerBtn(){
                let addTabObj = {
                    name: '分配经销商',
                    tag: 'b2b_dealer_distributionDealer',
                    parentTag: ''
                }
                this.$root.bus.$emit('distributionDealerTabAdd', addTabObj)
    },

//            refreshList(){
//                this.page.pageNum = 1
//                this.getDealerList()
//            },

            getSummaries(param) {
                const {columns, data} = param
                const sums = []
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价'
                        return
                    }
                    const values = data.map(item => Number(item[column.property]))
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)
                        sums[index] += ' 元'
                    } else {
                        sums[index] = 'N/A'
                    }
                })
                return sums
            }
        },
        mounted () {
            const _this = this
            this.$root.bus.$on('dealerListRefresh',()=>{
                _this.getDealerList()
            })
            this.getDealerList()
        }
    }
</script>
