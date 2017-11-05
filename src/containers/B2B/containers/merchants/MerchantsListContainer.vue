<template>
    <div>
        <div class="projection">
            <Button class="public-function-btn" @click="addLoginPhone">添加登录手机</Button>
            <Button class="public-function-btn" @click="resetPassword">重置密码</Button>
            <ButtonGroup>
                <Button :class="['public-function-btn',isStartUp?'':'disabled']" @click="clickTopBtn(1)">启用
                </Button>
                <Button :class="['public-function-btn',isBlockUp?'':'disabled']" @click="clickTopBtn(0)">停用
                </Button>
            </ButtonGroup>
            <Button class="public-function-btn" @click="getMerchantsList">刷新</Button>
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
                    <FormItem label="商户">
                        <Input placeholder="名称" v-model="searchObj.merchantName"></Input>
                    </FormItem>
                    <<FormItem label="商户类型">
                    <Select v-model="searchObj.merchantType">
                        <Option label="区域一" key="shanghai" value="shanghai"></Option>
                        <Option label="区域二" key="beijing" value="beijing"></Option>
                    </Select>
                </FormItem>
                    <FormItem label="经营类型">
                        <Select v-model="searchObj.manageType">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button class="search-btn" @click="getMerchantsList">查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="text">高级查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="text" @click="resetSearch">清空</Button>
                    </FormItem>
                </Form>
            </div>
            <Table
                :data="tableContent"
                :loading="loading"
                border
                :highlight-current-row="true"
                @row-click="handleRowClick"
            >
                <TableColumn
                    type="index"
                    fixed
                    width="50"
                    label="序号">
                </TableColumn>
                <TableColumn
                    prop="stationName"
                    label="站点">
                </TableColumn>
                <TableColumn
                    prop="merchantId"
                    label="商户ID">
                </TableColumn>
                <TableColumn
                    prop="merchantName"
                    label="商户名称">
                </TableColumn>
                <TableColumn
                    prop="account"
                    label="账号">
                </TableColumn>
                <TableColumn
                    prop="detailAddress"
                    label="地址">
                </TableColumn>
                <TableColumn
                    prop="primaryContacts"
                    label="主要联系人">
                </TableColumn>
                <TableColumn
                    prop="contactTelphone"
                    label="联系电话">
                </TableColumn>
                <TableColumn
                    prop="merchantType"
                    label="商户类型">
                </TableColumn>
                <TableColumn
                    prop="manageType"
                    label="经营类型"
                >
                </TableColumn>
                <TableColumn
                    prop="shopNum"
                    label="门店数量"
                >
                </TableColumn>
                <TableColumn
                    prop="registerSource"
                    label="来源"
                >
                </TableColumn>
                <TableColumn
                    prop="dealerName"
                    label="经销商"
                >
                </TableColumn>
                <TableColumn
                    prop="status"
                    label="状态"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.status==1?'启用':'停用'}}</span>
                    </template>
                </TableColumn>
            </Table>
            <Pagination
                v-if="page.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNum"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </Pagination>

            <!--列表按钮-->
            <tooltip name="costorder">
                <Button size="mini" @click="lookDetails">查看详情</Button>
                <Button size="mini" @click="addLoginPhone">添加登录手机</Button>
                <Button size="mini" @click="resetPassword">重置密码</Button>
                <Button size="mini" v-if="isStartUp" @click="clickTopBtn(1)">启用</Button>
                <Button size="mini" v-if="isBlockUp" @click="clickTopBtn(0)">停用</Button>
            </tooltip>
        </div>

        <dialog-temp :merchantId="merchantId"></dialog-temp>
    </div>
</template>

<style lang="scss" scoped>
    .text_btn {
        color: #3320ee;
        cursor: pointer;
    }
</style>
<script>
    import merchantsService from '@B2B/services/substatAdmin/merchantsService.js'
    import dialogTemp from '@B2B/containers/merchants/DialogContainer.vue'
    export default{
        components:{
            dialogTemp
        },
        data(){
            return {
                loading: true,
                tableContent: [],
                searchObj:{},
                page: {
                    pageSizes: [2, 20, 50, 100, 150, 200],
                    pageNum: 1,
                    total: 2,
                    pageSize: 2,
                    pages: 3
                },
                selectRow:'',
                isStartUp:false,
                isBlockUp:false
            }
        },
        methods: {

            // 获取tableData
            async getMerchantsList(){
                this.loading = true
                const message = {
                    stationId:this.searchObj.stationId,
                    merchantName:this.searchObj.merchantName,
                    merchantType:this.searchObj.merchantType,
                    manageType:this.searchObj.manageType,
                    pageNum:this.page.pageNum,
                    pageSize:this.page.pageSize
                }

                // 请求分页数据
                try {
                    const data = await merchantsService.getListMerchantsByPage(message)
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
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },

            // 详情
            lookDetails(){
                let addTabObj = {
                    name: `${this.selectRow.merchantName}-详情`,
                    tag: `b2b_merchants_${this.selectRow.merchantName}_dealer`,
                    parentTag: '',
                    merchantId:this.selectRow.merchantId
                }
                this.$root.bus.$emit('merchantsTabAdd', addTabObj)
            },

            isSelect(){
                if(!this.selectRow.merchantId){
                    this.$customMessage("请选择一条记录","warning")
                    return false
                }
                return true
            },

            // 启用停用按钮
            clickTopBtn(status){
                if(this.isSelect()){
                    let message = {
                        merchantIds:[this.selectRow.merchantId],
                        status:status
                    }
                    this.$root.bus.$emit('EnableOrDisableByMerchants',message)
                }
            },

            // 重置密码
            resetPassword(){
                if(this.isSelect()){
                    let message = {
                        userId: this.selectRow.userId
                    }
                    this.$root.bus.$emit('resetPasswordByMerchants',message)
                }
            },

            // 增加登陆手机
            addLoginPhone(){
                if(this.isSelect()){
                    let message = {
                        userId: this.selectRow.userId,
                        merchantId:this.selectRow.merchantId,
                        merchantName:this.selectRow.merchantName,
                    }
                    this.$root.bus.$emit('addLoginPhoneByMerchants',message)
                }
            },

            // 清空
            resetSearch(){
                this.searchObj={}
//                this.searchObj.stationId = 10001
            },

            // 点击table每行
            handleRowClick(row, event, column) {
                if (column.type == 'selection' || column.type == 'index')return

                // table行按钮集
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')

                this.selectRow = row

                this.isStartUp = row.status?false:true
                this.isBlockUp = !this.isStartUp
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getMerchantsList()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getMerchantsList()
            }

        },
        mounted () {
            const _this = this
            this.getMerchantsList()

            this.$root.bus.$on('refreshMerchantsList',function () {
                _this.getMerchantsList()
            })
        },
        props:{
            merchantId:Number
        }
    }
</script>
