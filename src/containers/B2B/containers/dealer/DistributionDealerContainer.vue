<template>
    <div class="content">
        <Form :inline="true" :model="{}" class="demo-form-inline">
            <div class="search">
                <div class="select-station search-padding">
                    <Select v-model="searchObj.stationId" placeholder="请选择">
                        <Option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </Option>
                    </Select>
                </div>
                <div class="search-paddingtop">
                    <FormItem label="经销商名称">
                        <Input v-model="searchObj.dealerName"></Input>
                    </FormItem>
                    <FormItem label="地区">
                        <Select v-model="searchObj.areaId">
                            <Option label="区域一" key="shanghai" value="shanghai"></Option>
                            <Option label="区域二" key="beijing" value="beijing"></Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button class="search-btn" @click="getAssignDealerData">查询</Button>
                    </FormItem>
                </div>
            </div>
        </Form>
        <div>
            <Button class="public-function-btn" @click="distDealerAddBtn">添加</Button>
            <Button class="public-function-btn" @click="closeTab">取消</Button>
        </div>
        <Table
            max-height="680"
            :data="tableContent"
            :loading="loading"
            border
            :highlight-current-row="true"
            @selection-change="selectionChange"
        >
            <scope
                type="index"
                fixed
                width="50"
                label="序号">
            </scope>
            <scope
                type="selection"
                fixed
                width="55">
            </scope>
            <scope
                prop="id"
                label="经销商ID">
                <template slot-scope="scope">
                    <Button type="text">{{ scope.row.id }}</Button>
                </template>
            </scope>
            <scope
                prop="name"
                label="经销商名称">
            </scope>
            <scope
                prop="area"
                label="地区">
            </scope>
            <scope
                prop="address"
                label="地址">
            </scope>
            <scope
                prop="contactPeople"
                label="联系人">
            </scope>
            <scope
                prop="contactTel"
                label="联系电话">
            </scope>
            <scope
                prop="businessType"
                label="业务类型">
            </scope>
            <scope
                prop="channelType"
                label="渠道类型">
            </scope>
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
</template>
<style lang="scss" scoped>
    .select-station{
        border-bottom: 1px solid #F7F7F7;
    }
    .search-padding{
        padding:20px 0;
    }
    .search-paddingtop{
        padding-top: 20px;
    }
    .public-function-btn{
        margin-left: 0px;
        margin-right:10px;
    }
</style>
<script>
    import dealerService from '@B2B/services/substatAdmin/dealerService.js'
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                value: '',
                tableContent:[],
                loading:false,
                page:{
                    pageSizes:[2,20,50,100,150,200],
                    pageNum:1,
                    total:2,
                    pageSize:2,
                    pages:3
                },
                searchObj:{
                    // 站点id（search选择）
                    stationId: 10001,
                    // 经销商名称/简介
                    dealerName:'',
                    // 地区id
                    areaId:''
                },
                // 选中经销商id集合
                dealerIds:[],
                parentObj:{}
            }
        },
        mounted () {
            this.parentObj = this.distributionDealerObj
            this.getAssignDealerData()
        },
        methods:{

            // 获取tableData
            async getAssignDealerData(){
                this.loading = true
                // 请求分页数据
                try{
                    const data = await dealerService.getAssignDealerList(this.searchObj.stationId,this.searchObj.dealerName,this.searchObj.areaId,this.page.pageNum,this.page.pageSize)
                    if(data.status==200){
                        const result = data.data.result
                        if(!result)return
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
                        console.log(1)
                    }
                    this.loading = false
                }
                catch(e){
                    console.log(e)
                }
            },

            // 添加按钮
            async distDealerAddBtn(){

                // 判断站点是否选择
                if(!this.searchObj.stationId){
                    this.$customMessage("请选择您要分配经销商的站点","warning")
                    return
                }

                // 判断是否勾选了记录
                if(!this.dealerIds.length){
                    this.$customMessage("请勾选至少一条记录","warning")
                    return
                }

                const message = {
                    stationId: this.searchObj.stationId,
                    dealerIds: this.dealerIds
                }
                try{
                    const data = await dealerService.updateAssignDealer(message)
                    if(data.status==200){
//                        const successCount = data.result
                        this.$customMessage("添加成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("添加失败","error")
                    }
                }catch(e){
                    console.log(e)
                    this.$customMessage("添加失败-c","error")
                }
                this.closeTab()
            },

            closeTab(){
                this.$root.bus.$emit('dealerChildTabClose',this.parentObj)
            },

            // 分页每页条数改变
            handleSizeChange(val){
                this.page.pageSize = val
                this.getAssignDealerData()
            },

            // 当前页改变
            handleCurrentChange(val) {
                this.page.pageNum = val
                this.getAssignDealerData()
            },

            // 列表复选框发生改变
            selectionChange(selection){
                this.dealerIds = []
                selection.forEach((item)=>{
                    this.dealerIds.push(item.id)
                })
            }
        },
        props:{
            distributionDealerObj: Object
        }
    }
</script>
