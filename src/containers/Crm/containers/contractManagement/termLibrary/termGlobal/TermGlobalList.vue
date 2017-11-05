<template>
    <div class="term-global">
        <!--标签功能操作栏  start-->
        <div class="modal-div clearfix">
            <div>
                <div class="btnGroup btnGroup1">
                    <!--<router-link to="/moneyPoolOverall/newOverallFunds">新增</router-link>-->
                    <a href="javascript:;" class="add-btn dropdown-btn" @click="">
                        <el-dropdown trigger="click" @command="addTerm">
                            <span class="el-dropdown-link">
                              新增<i class="newArrow-country icon-new"></i>
                            </span>
                            <!--查询方案弹出层开始-->
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided class="dropdown-plan" command="1">普通条款</el-dropdown-item>
                                <el-dropdown-item divided class="dropdown-plan" command="2">服务项及其价格</el-dropdown-item>
                                <el-dropdown-item divided class="dropdown-plan" command="3">收付款协议</el-dropdown-item>
                                <el-dropdown-item divided class="dropdown-plan" command="4">合同收付款条款</el-dropdown-item>
                            </el-dropdown-menu>
                            <!--查询方案弹出层结束-->
                        </el-dropdown>
                    </a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="">启用</a>
                    <i>|</i>
                    <a href="javascript:;" class="add-btn" @click="">停用</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="operationTip=true">删除</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn">刷新</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn">日志</a>
                </div>
            </div>
            <!--删除确认提示开始-->
            <el-dialog title="删除" class="operationTip" :modal="false" :visible.sync="operationTip" >
                <div>
                    <div class="operationMsg">您确定要删除这些资料吗？删除后将不再恢复</div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="cancel">取消</el-button>
                    <el-button class="cancelButton" @click="">确定</el-button>
                </span>
            </el-dialog>
            <!--删除确认提示结束-->
            <!--删除失败提示开始-->
            <!--<el-dialog title="删除" class="operationTip" :modal="false" :visible.sync="deleteFalse" >-->
            <!--<div>-->
            <!--<div class="operationIcon">-->
            <!--<i class="iconfont icon-baocuo"></i>-->
            <!--</div>-->
            <!--<div class="operationMsg">-->
            <!--<div>删除失败！</div>-->
            <!--<div>1）已被引用，不允许删除。</div>-->
            <!--<a>查看被引用记录</a>-->
            <!--</div>-->
            <!--</div>-->
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button class="cancelButton" @click="cancel">确定</el-button>-->
            <!--</span>-->
            <!--</el-dialog>-->
            <!--删除失败提示结束-->
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div id="main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">
                        <div class="query-btn el-dropdown-link" >
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
                                    <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                                </el-dropdown-menu>
                                <!--查询方案弹出层结束-->
                            </el-dropdown>
                        </div>
                        <div class="vehicle-data">
                            <div class="inblock crm_org">
                                <span class="hspace">所属组织</span>
                                <el-select v-model="org" @change="orgChange" multiple filterable placeholder="请选择" class="crm_org_select"><!--multiple-->
                                    <el-option
                                        v-for="item in orgOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">条款名称/编码</span>
                                <el-input placeholder="请输入" v-model="termCodeOrName"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">条款状态</span>
                                <el-select v-model="termStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in termStatusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">审核状态</span>
                                <el-select v-model="auditStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in auditStatusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                        <div class="vehicle-btn">
                            <el-button @click="getContractTermLibrary">查询</el-button>
                            <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                            <a href="javascript:;" class="l-clear" @click="clearSearch">清空</a>

                        </div>
                    </div>
                    <!--表单  start-->
                    <div class="information-list">
                        <el-table :data="tableData" @row-click="rowClick" @current-change="currentRowChange" highlight-current-row border style="width: 100%" highlight-current-row :default-sort = "{prop: 'date', order: 'descending'}" >
                            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="termCode" label="条款编码" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <a href="javascript:;" class="table-a" @click="jumpDetail(scope.row.termCode)">{{ scope.row.termCode }}</a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="termName" label="条款名称" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="status" label="状态"  width="50" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="approvalStatus" label="审核状态"  width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="termCategory" label="条款分类"  width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="businessCategory" label="业务类型"  width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="orgId" label="所属组织"  width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="globalPreset" label="是否平台预置" width="130" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="comment" label="备注" width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="createUser" label="创建人" width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="createTime" label="创建时间" width="130" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="updateUser" label="最后修改人" width="" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="updateTime" label="最后修改时间" width="130" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <tooltip name="costorder">
                            <span @click="">启用</span>|
                            <span @click="">删除</span>
                        </tooltip>
                    </div>
                    <!--表单  end-->
                    <!--分页    start-->
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 30]"
                            :page-size="currentPageCount"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
                        </el-pagination>
                    </div>
                    <!--分页    end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->
        <!--高级查询弹出层开始-->
        <el-dialog title="高级查询" class="advancedQuery dialogPopup" :visible.sync="dialogTableVisible">
            <div class="advancedLeft">
                <ul>
                    <li class="queryPlan">查询方案</li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                </ul>
            </div>
            <div class="advancedRight">
                <div class="queryCondition">查询条件</div>
                <div class="queryOperation">
                    <el-input v-model="comprehensivePlan" placeholder="综合方案" :disabled="false"></el-input>
                    <el-button :disabled="false">保存查询方案</el-button>
                    <a href="javascript:;" class="clear">清空</a>
                </div>
                <div>
                    <el-table :data="gridData" border>
                        <el-table-column property="index" label="序号" width="60"></el-table-column>
                        <el-table-column property="conditionName" label="条件名称" width="100"></el-table-column>
                        <el-table-column property="relationCharacter" class-name="noPaddingCol"  label="关系符" width="100">
                            <template slot-scope="scope">
                                <el-select v-model="advancedQuery" placeholder="请选择">
                                    <el-option
                                        v-for="item in advancedQueryOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column property="conditionValue" label="条件值"></el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button class="confirmButton" @click="dialogTableVisible = false">立即查询</el-button>
          </span>
        </el-dialog>
        <!--高级查询弹出层结束-->

    </div>
</template>
<script type="es6">
    import serverMixin from '@Crm/mixin/server.js'
    import $CS from '@Crm/services/termLibrary/termGlobalService.js'
    export default {
        mixins: [serverMixin],
        props: {
            clickByEdit: {
                type: Function,
                require: true
            }
        },
        data () {
            return {
                currentRow: '',//当前选中条款
                tableData:[],
                gridData: [{
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue:'FEDSDFHDSKJ14uo4ui'
                }],
                comprehensivePlan: '',//综合方案
                dialogTableVisible:false,//高级查询弹出
                org: [1],//所属组织
                termCodeOrName: '',//条款编码或名称
                termStatus: '',//条款状态
                termStatusOptions: [{//条款状态选项
                    value: 'all',
                    label: '全部'
                }, {
                    value: 0,
                    label: '未启用'
                }, {
                    value: 1,
                    label: '启用'
                }, {
                    value: 2,
                    label: '停用'
                }],
                auditStatus: '',//审核状态
                auditStatusOptions: [{//审核状态选项
                    value: 'all',
                    label: '全部'
                }, {
                    value: 0,
                    label: '待提交审核'
                }, {
                    value: 1,
                    label: '待审核'
                }, {
                    value: 2,
                    label: '已审核'
                }, {
                    value: 3,
                    label: '驳回'
                }, {
                    value: 4,
                    label: '取消审核'
                }],
                operationTip: false,//删除提示
                orgOptions: [],//所属组织选项
                advancedQuery: '',
                advancedQueryOptions: [{//高级查询选项
                    value: 0,
                    label: '等于'
                }, {
                    value: 1,
                    label: '介于'
                }],
                currentPage: 1,//当前页
                currentPageCount: 5,//当前页的数量
                totalCount: 0,//总数
            }

        },
        methods: {
            async setTermLibraryStatus(){
                var res = await $CS.setTermLibraryStatus(`setTermLibraryStatus/${this.currentRow.id}?orgId=${this.currentRow.orgId === '全局'?1:2}&status=${1}&updateUser=10001`)
                console.log(res)
            },
            async getContractTermLibraryByCode(termCode){
                var res = await $CS.getContractTermLibraryByCode(`getContractTermLibraryByCode/${termCode}`)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    this.$emit('getTermData', res.data.result)
                    switch (res.data.result.specialTermCategory){
                        case '1'://普通条款详情
                            this.clickByEdit('detail', 'detailCommonTerm', termCode.toString())
                            break
                        case '2'://收付款协议详情
                            this.clickByEdit('detail', 'detailPaymentAgreement', termCode.toString())
                            break
                        case '3'://合同收付款条款详情
                            this.clickByEdit('detail', 'detailContractPaymentTerm', termCode.toString())
                            break
                        default:
                            console.log('配对失败...')
                    }
                }else {
                    this.$message('跳转详情页失败！请重试...')
                }

            },
            jumpDetail(termCode){//跳转详情页
                console.log(termCode)
                this.getContractTermLibraryByCode(termCode)
            },
            orgChange(val){
                console.log(val)
            },
            rowClick () {
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
            },
            clearSearch () {
                this.org = []
                this.termCodeOrName = ''
                this.termStatus = ''
                this.auditStatus = ''
            },
            cancel () {
                this.operationTip = false
            },
            currentRowChange(val) {
                this.currentRow = val
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
                this.currentPageCount = val
                this.getContractTermLibrary()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.currentPage = val
                this.getContractTermLibrary()
            },
            addTerm(command){
                switch (command){
                    case '1'://新增普通条款
                        this.clickByEdit('add', 'newCommonTerm', '普通条款')
                        break
                    case '2'://新增服务项及其价格
                        this.clickByEdit('add', 'newServiceItemAndPrice', '服务项及其价格')
                        break
                    case '3'://新增收付款协议
                        this.clickByEdit('add', 'newPaymentAgreement', '收付款协议')
                        break
                    case '4'://新增合同收付款条款
                        this.clickByEdit('add', 'newContractPaymentTerm', '合同收付款条款')
                }
            },
            async getContractTermLibrary(){
                if(this.org.length === 0){
                    this.$message('所属组织不能为空！')
                    return
                }
                var res = await $CS.getContractTermLibrary(`getContractTermLibraryByCondition?termCodeOrName=${this.termCodeOrName}&termStatus=${this.termStatus}&approvalStatus=${this.auditStatus}&start=${(this.currentPage-1)*this.currentPageCount}&pageSize=${this.currentPageCount}&orgId=${this.org}`)
                console.log(res)
                if(res.data.status.statusCode === 0){
                    if(res.data.result.items){
                        res.data.result.items.forEach(item => {
                            switch (item.status){//条款状态
                                case 0:
                                    item.status = '未启用'
                                    break
                                case 1:
                                    item.status = '启用'
                                    break
                                case 2:
                                    item.status = '停用'
                            }
                            switch (item.approvalStatus){//审核状态
                                case 0:
                                    item.approvalStatus = '待提交审核'
                                    break
                                case 1:
                                    item.approvalStatus = '待审核'
                                    break
                                case 2:
                                    item.approvalStatus = '已审核'
                                    break
                                case 3:
                                    item.approvalStatus = '驳回'
                                    break
                                case 4:
                                    item.approvalStatus = '取消审核'
                            }
                            switch (item.businessCategory){//业务类型
                                case 1:
                                    item.businessCategory = '采销'
                                    break
                                case 2:
                                    item.businessCategory = '仓储'
                                    break
                                case 3:
                                    item.businessCategory = '物流'
                                    break
                                case 4:
                                    item.businessCategory = '劳务'
                                    break
                                case 5:
                                    item.businessCategory = '财务'
                                    break
                                case 6:
                                    item.businessCategory = '平台'
                                    break
                                case 7:
                                    item.businessCategory = '金融'
                                    break
                                case 8:
                                    item.businessCategory = '地产'
                                    break
                                case 9:
                                    item.businessCategory = '保险'
                                    break
                                case 10:
                                    item.businessCategory = '租赁'
                                    break
                                case 11:
                                    item.businessCategory = '制造'
                            }
                            switch (item.orgId){//所属组织
                                case 1:
                                    item.orgId = '全局'
                                    break
                                case 2:
                                    item.orgId = '集团'
                            }
                            switch (item.globalPreset){//是否平台预制
                                case 0:
                                    item.globalPreset = ''
                                    break
                                case 1:
                                    item.globalPreset = '√'
                            }
                            item.createTime = this.getLocalTime(item.createTime)
                            item.updateTime = this.getLocalTime(item.updateTime)
                        })
                    }
                    this.totalCount = res.data.result.totalCount
                    this.tableData = res.data.result.items ? res.data.result.items : []
                    console.log(this.tableData)
                }
            },
//            async getInitBusinessCategory(){//初始化业务类型
//                var res = await $CS.getInitEnums(`getBusiTypeList`)
//                console.log(res)
//                if(res.data.status.statusCode === 0){
//                    return res.data.result
//                }
//            },
            async getInitOrgId(){//初始化所属组织
                var res = await $CS.getInitEnums(`getAllOrg?orgId=${this.userOverallOrgId}`)
                console.log(res)
                this.orgOptions = this.dataHandle(res.data.result)
            },
            dataHandle(arr){//枚举值数据处理
                let dataArr = []
                arr.forEach( item => {
                    let obj = {
                        value: item.id,
                        label: item.orgName
                    }
                    dataArr.push(obj)
                })
                return dataArr
            },

        },
        mounted () {
            this.getInitOrgId()
        }
    }

</script>

<style lang="scss">
    body{
        .el-dropdown-menu .el-dropdown-menu__item{
            font-size: 12px;
            line-height: 20px;
        }
        .crm_org{
            width: 220px;
            .crm_org_select{
                .el-select__tags{
                    height: 28px;
                    width: 100%;
                }
                .el-input__inner{
                    width: 153px;
                    height: 28px !important;
                }
                .el-select__tags{
                    span {
                        display: flex;
                        .el-tag{
                            border: none;
                        }
                    }
                }
            }

        }
        .term-global{
            .dropdown-btn{
                width: 40px;
                text-align: left;
                .newArrow-country{
                    right: -23px;
                    top: 9px;
                }
            }
            .newArrow-country{
                position: absolute;
                top: 12px;
            }
            .l-clear{
                color: black;
                margin-left: 10px;
            }
            /*删除提示  start*/
            .operationTip{
                .operationIcon,.operationMsg{
                    display:inline-block;
                    float:left;
                }
                .iconfont.icon-baocuo{
                    color:#ff0000;
                    font-size:30px;
                }
                .operationMsg{
                    margin-left:20px;
                    a{
                        text-decoration: underline;
                        color:#211dbe;
                    }
                }
            }
            /*删除提示  end*/
        }
    }

</style>

