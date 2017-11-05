<template>
    <div class="wms-items" v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="addNew">新增</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="Delete">删除</el-button>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" class="" :plain="true" @click="batchHandle('start')">启用</a>
                    <i>|</i>
                    <a href="javascript:;" class="" :plain="true" @click="batchHandle('block')">停用</a>
                </div>
                <div class="btnGroup">
                    <el-button @click="">刷新</el-button>
                </div>
                <div class="btnGroup">
                    <el-button @click="dialogTableVisible = true">查询</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <div class="mainContent">
                    <div class="mainLeft">
                        <div class="mainLeftHead">仓库列表</div>
                        <el-tree :data="menuData" :props="defaultProps" @node-click="handleNodeClick" :indent="10"></el-tree>
                    </div>
                    <div class="interval"></div>
                    <div class="mainRight">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="right" offset="1">
                                <span>修改</span>
                                <span style="margin:0 6px">|</span>
                                <span>停用</span>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag>{{ scope.row.parametricDescription }}</el-tag>
                                </div>
                            </el-popover>
                        </template>

                        <tooltip name="costorder">
                            <el-button size="mini" @click="toInvoicing">修改</el-button>
                            <el-button size="mini">删除</el-button>
                            <el-button size="mini">启用</el-button>
                        </tooltip>
                        <Table :data="tableData" @selection-change="handleSelectionChange" @row-click="handleRowClick" highlight-current-row border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
                            <TableColumn prop="id" label="序号" width="70"></TableColumn>
                            <TableColumn type="selection" prop="isChecked" width=""></TableColumn>
                            <TableColumn prop="serialNumber" label="编号" width=""></TableColumn>
                            <TableColumn prop="" label="策略类型"  width=""> </TableColumn>
                            <TableColumn prop="" label="策略描述"  width=""> </TableColumn>
                            <TableColumn prop="warehouseId" resizable label="仓库"  width=""></TableColumn>
                            <TableColumn prop="ownerId" label="货主"  width=""></TableColumn>
                            <TableColumn prop="" label="策略值"  width=""></TableColumn>
                            <TableColumn prop="" label="称重提醒浮动值"  width="105"></TableColumn>
                            <TableColumn prop="" label="称重拦截浮动值"  width="105"></TableColumn>
                            <TableColumn prop="status" label="状态"  width=""></TableColumn>
                            <TableColumn prop="createUser" label="创建人"  width=""></TableColumn>
                            <TableColumn prop="createTime" align="center" label="创建时间"    width=""> </TableColumn>
                            <TableColumn prop="updateUser" label="最后修改人"    width="90"> </TableColumn>
                            <TableColumn prop="updateTime" align="center" label="最后修改时间" width="100"> </TableColumn>
                        </Table>

                        <div class="pageination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage1"
                                :page-size="50"
                                layout="total, prev, pager, next,jumper"
                                :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <!--右侧内容 end-->
            </div>
        </div>
        <!--主体内容  end-->
        <!--新增弹出层开始-->
        <el-dialog title="参数基本信息" :visible.sync="isAdded" class="addPopupSmall">
            <!--<div class="firstLine">当前序号&nbsp;&nbsp;<span>{{addForm.strategyId}}</span></div>-->
            <div class="groupL">
                <div class="groupL-p">
                    <span class="f_l">策略描述</span>
                    <el-input name="strategyDesc" v-model="addForm.strategyType" disabled></el-input>
                </div>
                <div class="groupL-p">
                    <span class="f_l">仓库</span>
                    <el-select v-model="modifyForm.warsehouseId" placeholder="请选择">
                        <el-option
                            v-for="item in owners"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <i class="iconfont icon-xiajiantou"></i>
                </div>
                <div class="groupL-p">
                    <span class="f_l">货主</span>
                    <el-select v-model="modifyForm.ownerId" placeholder="请选择">
                        <el-option
                            v-for="item in warehouse"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <i class="iconfont icon-xiajiantou"></i>
                </div>
                <div class="groupL-p">
                    <span class="f_l">称重提醒浮动值</span>
                    <el-input name="strategyDesc" v-model="addForm.strategyType" disabled></el-input>
                    <i>kg</i>
                </div>
                <div class="groupL-p">
                    <span class="f_l">称重拦截浮动值</span>
                    <el-input name="strategyDesc" v-model="addForm.strategyType" disabled></el-input>
                    <i>kg</i>
                </div>
                <div class="groupL-p groupL-pTextarea">
                    <span class="f_l">备注</span>
                    <el-input type="textarea" v-model = "addForm.remark" :rows="2" placeholder="请输入内容"></el-input>
                    <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                  <el-button class="cancelButton" @click="isAdded = false">取消</el-button>
                  <el-button class="cancelButton" @click = "saveAndUpdate('new')">保存并新增</el-button>
                  <el-button class="confirmButton" @click = "saveAndUpdate('save')">保存</el-button>
                </span>
        </el-dialog>
        <!--新增弹出层结束-->
        <!--修改弹出层开始-->
        <el-dialog title="参数基本信息" :visible.sync="isModifyDialog" class="addPopup">
            <div class="firstLine">当前序号&nbsp;&nbsp;<span>6</span></div>
            <div class="groupL">
                <div class="groupL-p">
                    <span class="f_l">参数描述</span>
                    <el-input name="strategyDesc" v-model="modifyForm.strategyType" disabled></el-input>
                </div>
                <div class="groupL-p ml-24 f_l">
                    <span class="f_l">策略值</span>
                    <el-select v-model="modifyForm.strategyValue" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                    <i class="iconfont icon-xiajiantou"></i>
                </div>

                <div class="groupL-p groupL-pTextarea">
                    <span class="f_l">备注</span>
                    <el-input type="textarea" v-model = "modifyForm.remark" :rows="2" placeholder="请输入内容"></el-input>
                    <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
                </div>
            </div>
            <div class="groupL">
                <div class="groupL-p">
                    <span class="f_l">仓库</span>
                    <el-input name="warehoseName" v-model="modifyForm.warehoseName" disabled></el-input>
                </div>
                <div class="groupL-p ml-24 f_l">
                    <span class="f_l">货主</span>
                    <el-input name="ownerUser" v-model="modifyForm.ownerUser" disabled></el-input>
                    <i class="iconfont icon-xiajiantou"></i>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                  <el-button class="cancelButton" @click="isModifyDialog = false">取消</el-button>
                <!--el-button class="cancelButton">保存并新增</el-button-->
                  <el-button class="confirmButton" @click = "saveAndUpdate('update')">保存</el-button>
                </span>
        </el-dialog>
        <!--修改弹出层结束-->
        <!--高级查询弹出层开始-->
        <el-dialog title="高级查询" class="advancedQuery" :visible.sync="dialogTableVisible">
            <div class="advancedLeft">
                <ul>
                    <li class="queryPlan">查询方案</li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                    <li>查询方案
                        <i class="iconfont icon-guanbi"></i>
                    </li>
                </ul>
            </div>
            <div class="advancedRight">
                <div class="queryCondition">查询条件</div>
                <div class="queryOperation">
                    <el-input v-model="input" placeholder="综合方案"></el-input>
                    <el-button :disabled="true" class="cancelButton">保存查询方案</el-button>
                    <a href="javascript:;" class="modify">修改</a>
                    <a href="javascript:;" class="clear">清空</a>
                </div>
                <div>
                    <Table :data="gridData" border>
                        <TableColumn property="index" label="序号" width="60"></TableColumn>
                        <TableColumn property="conditionName" label="条件名称" width="100"></TableColumn>
                        <TableColumn property="relationCharacter" class-name="noPaddingCol" label="关系符" width="100">
                            <template slot-scope="scope">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" class="selectFontSize">
                                    </el-option>
                                </el-select>
                            </template>
                        </TableColumn>
                        <TableColumn property="conditionValue" label="条件值"></TableColumn>
                    </Table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button  class="confirmButton"  @click="dialogTableVisible = false">立即查询</el-button>
          </span>
        </el-dialog>
        <!--高级查询弹出层结束-->

    </div>
</template>
<script type="es6">
    import Vue from 'vue'
    import s from '../../../appService/appService'
    import tooltip from '../../../commonComponents/Tooltip.js'

    Vue.use(tooltip)

    let api = {
        getMenuList:'/wms-base-server/strategy/getMenuList',
        getMenu:'/wms-base-server/strategy/getMenu',
        getStrategyList:'/wms-base-server/strategy/getListWithPage',
        batchClockUp:'/wms-base-server/strategy/batchBlockUp',
        batchStartUsing:'/wms-base-server/strategy/batchStartUsing',
        add:'/wms-base-server/strategy/save',
        update:'/wms-base-server/strategy/update',
        getOwners:'/wms-base-server/strategy/getAddibleOwner',
        getWare:'/wms-base-server/storehouse/getList'
    }

    let menuDataMap = {
        '收货规则':{
            'id':1,
            'label':'收货规则'
        },
        '出库设置':{
            'id':2,
            'label':'出库设置'
        },
        '管理规则':{
            'id':3,
            'label':'管理规则'
        },
        '下架策略':{
            'id':4,
            'label':'下架策略'
        }
    }

    export default {
        data () {
            return {
                getPlatformsUrl:"  ",
                addPlatformsUrl:"  ",
                currentPage1:1,
                isAdded:false,
                isModifyDialog:false,
                value:'',
                // 左侧菜单列表
                menuData: [ ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                //右侧数据列表
                tableData: [],

                //查询
                gridData: [{
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue: 'FEDSDFHDSKJ14uo4ui'
                }],
                dialogTableVisible: false,
                input: '',
                options: [{
                    value: '选项1',
                    label: '介于'
                }, {
                    value: '选项2',
                    label: '等于'
                }],
                value: '',

                //选择 的数据。
                multipleSelection:[],
                // 当前选择的左侧菜单功能项
                curStrategy:{},
                // 当前选择的右侧的列表项
                curStrategyItem:{},
                addForm:{},
                modifyForm:{},
                // 货主列表信息，新建和修改策略时用到。
                owners:[{
                    id:1,
                    name:11111
                },
                    {
                        id:2,
                        name:222222
                    }

                ],
                // 仓库信息
                warehouse:[
                    {
                        id:1,
                        name:11111
                    },
                    {
                        id:2,
                        name:222222
                    }]

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            enableSuccess() {
                this.$message({
                    message: '启用成功！',
//                type: 'warning',
                    duration: 2000,
                    iconClass: 'iconfont icon-chenggong'
                })
            },
            stopSuccess() {
                this.$message({
                    message: '停用成功！',
//                type: 'success',
                    duration: 2000,
                    iconClass: 'iconfont icon-chenggong'
                })
            },
            //添加新的策略
            addNew(){
                let _this = this

                _this.isAdded = true

                // 获取仓库和货主信息
                getOwners()
                getWare()


            },
            //删除操作
            Delete() {
                this.$confirm('message','title',{
                    title: '操作提示',
                    message: '此操作将永久删除该文件, 是否继续?',
                    customClass: ' delete-layer',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 获取菜单列表
            getMenuList() {
                let _this = this

                s.request({
                    url:api.getMenuList,
                    context:_this,
                    sendData:{},
                    successCallback:function(_this, response){
                        console.log('response:-',response)
                        //if(response.status.statusCode == "0"){
                        let list = response
                        console.log(_this.setArrToarrTree(menuDataMap,list))
                        console.log(_this.setArrToarrTree(menuDataMap,list))
                        _this.menuData = _this.setArrToarrTree(menuDataMap,list)
                        //}
                    }
                })
            },

            // 设置菜单列表格式
            setArrToarrTree(mapObj,data){
                let arrTree = []
                let tree = Object.assign({},mapObj)
                console.log("tree:",tree)
                for(var k in tree){
                    tree[k].children = []
                    arrTree.push(tree[k])
                }
                for(var i of data){
                    for(var j in tree){
                        if(i.strategyType == tree[j].id){
                            console.log('j:',tree[j].id)
                            i["label"] = i.strategyName
                            tree[j].children.push(i)
                            break
                        }
                    }
                }
                return arrTree
            },

            //点击导航处理
            handleNodeClick(data) {
                console.log("handleNodeClick:",data)

                // 存储当前选择的功能项
                this.curStrategy = data

                this.getStrategyList(data.id)
            },

            // 获取单个配置信息。
            getStrategyList(id) {
                let _this = this

                s.request({
                    url:api.getStrategyList,
                    context:_this,
                    sendData:{id:id},
                    successCallback:function(_this, response){
                        console.log('responseMenu:-',response)
                        //if(response.status.statusCode == "0"){
                        _this.tableData = response
                        //}
                    }
                })
            },

            // 选择项处理
            handleSelectionChange(val){
                console.log("策略配置选择项长度：",this.multipleSelection.length)
                this.multipleSelection = val
            },
            // 行点击事件处理
            handleRowClick(row,event,column){
                let _this = this

                _this.curStrategyItem = row

                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder', ()=>{})
            },
            //批量处理，批量启用和停用
            batchHandle(flag){
                let _this = this
                let _api = api.batchBlockUp
                let ids = ''   // ids 多个id组成的字符串 逗号隔开
                let idsArr = []
                let cb = _this.stopSuccess

                if(flag !== 'block'){
                    _api = api.batchStartUsing
                    cb = enableSuccess
                }

                for(var i of _this.multipleSelection){
                    idsArr.push(i.id)
                }

                ids = idsArr.join(',')

                s.request({
                    url:api,
                    context:_this,
                    sendData:{ids:ids},
                    successCallback:function(_this, response){
                        console.log('responseMenu:-',response)
                        cb()
                    }
                })
            },

            // 新建和修改策略处理方法  //new 代表保存并新增，save保存，update更新。
            saveAndUpdate(operate){
                let _this = this

                let sendData = _this.addForm
                let url = api.add

                if(operate == 'update'){
                    _this.modifyForm = Object.assign(_this.curStrategyItem, _this.modifyForm)
                    sendData = _this.modifyForm
                    url = api.update
                }

                s.request({
                    url:url,
                    context:_this,
                    sendData:sendData,
                    successCallback:function(_this, response){
                        console.log('responseMenu:-',response)

                    }
                })


            },
            // 获取货主信息
            getOwners(){
                let _this = this

                s.request({
                    url:url,
                    context:api.getOwners,
                    sendData:{id:_this.curStrategyItem.id},
                    successCallback:function(_this, response){
                        console.log('responseGetOwners:-',response)
                        _this.owners = response
                    }
                })
            },

            // 获取仓库信息
            getWare(){
                let _this = this

                s.request({
                    url:api.getWare,
                    context:_this,
                    sendData:{},
                    successCallback:function(_this, response){
                        console.log('responseMenu:-',response)
                        _this.warehouse = response
                    }
                })

            }

        },
        mounted() {
            console.log("mounted !!!!!")
            this.getMenuList()

        },
    }
</script>

<style scoped lang="scss" type="text/scss">
    body{
        .addPopupSmall {

            .groupL{
                width:350px;
                margin-top:20px;
                margin-left: 10px;
                /*.newArrow-country{
                    position: absolute;
                    right: 28px;
                    top: 13px;
                    z-index: 1;
                }*/
                i {
                    position: absolute;
                    right: 28px;
                    top: 0px;
                    color: #5f5f5f;
                }
                .groupL-pTextarea {
                    width: 350px;
                    margin-bottom: 57px;
                    .el-textarea {
                        width: 230px;
                        height: 150px;
                    }
                }
                /*.groupL-pTextarea{
                    display:inline-flex;
                }*/
                .textarea-prompt{
                    position: absolute;
                    bottom: 10px;
                    right: 27px;
                }
            }
            .el-scrollbar {
                width: 230px;
            }
        }
        .mainContent{
            padding:0;
            border:0;
            .mainLeft,
            .mainRight,
            .interval{
                display:inline-block;
                float:left;
                height:100%;
                box-sizing: border-box;
            }
            .mainLeft{
                width:18.5%;
                border-top:1px solid #ddd;
                border-right:1px solid #ddd;
            }
            .mainRight{
                width:80.4%;
                border-top:1px solid #ddd;
                border-left:1px solid #ddd;
                padding:16px;

            }
            .interval{
                width:1%;
                background:#f7f9fa;
            }
            /*左侧树形导航样式start*/
            .mainLeftHead{
                height:32px;
                line-height:32px;
                border-bottom:1px solid #ddd;
                background:#eee;
                padding-left:16px;
                color:#333;
            }
            /*左侧树形导航样式end*/
        }
    }
</style>

