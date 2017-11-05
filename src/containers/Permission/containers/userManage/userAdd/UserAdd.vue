<template>
    <div class="user-add">
        <div class="projection" v-if="newTabType === 'add'">
            <Button class="public-function-btn" @click="saveUser">保存</Button>
            <Button class="public-function-btn" @click="saveUser_addUser('用户管理-新增', 'userAdd', 'add', 'UserAdd')">保存并新增</Button>
            <Button class="public-function-btn" @click="cancelSaveUser">取消</Button>
        </div>
        <div class="addListForm-wrapper">
            <el-form :inline="true" :model="formData" class="demo-form-inline" label-width="100px" :rules="rules">
                <el-form-item label="所属组织" prop="org">
                    <dropDownTree ref="dropDownTree" :showCheckbox="false" :formReadOnly="formReadOnly" width="160px" :treeData="orgDropTreeData" :checkOrgId="formData.checkOrg"></dropDownTree>
                </el-form-item>
                <el-form-item label="用户编码">
                    <el-input v-model="formData.userNumber" placeholder="YHBM" disabled size="small" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label="用户账号" prop="userName">
                    <el-input v-model="formData.userName" placeholder="请输入" size="small" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入" size="small" style="width: 160px;" :maxlength="11" :minlength="11"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formData" class="demo-form-inline" label-width="100px" :rules="rules">
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" size="small" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label="身份类型">
                    <el-select v-model="formData.identityType" placeholder="SCM系统" size="small" style="width: 160px;">
                        <el-option label="员工" :value="0"></el-option>
                        <el-option label="客户" :value="1"></el-option>
                        <el-option label="供应商" :value="2 "></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="formData.realName" placeholder="请输入" size="small" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label="注册来源">
                    <el-select v-model="formData.source" placeholder="SCM系统" size="small" style="width: 160px;" :disabled="newTabType === 'add' || newTabType === 'detail'">
                        <el-option v-for="item in sourceArr" :label="item.itemName" :value="item.itemCode" :key="item.itemCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formData" class="demo-form-inline" label-width="100px">
                <el-form-item label="启用状态">
                    <el-select v-model="formData.enable" placeholder="请选择" size="small" style="width: 160px;" :disabled="newTabType === 'add' || newTabType === 'detail'">
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="停用" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" " label-width="30px">
                    <el-checkbox v-model="formData.lock" :disabled="newTabType === 'add' || newTabType === 'detail'">锁定</el-checkbox>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formData" class="demo-form-inline" label-width="100px">
                <el-form-item label="备注" class="remark">
                    <el-input v-model="formData.remark" placeholder="请输入内容" size="small" style="width: 777px" v-countNum="{nowNum: 0, allNum: 50}" :maxlength="50"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="tabs-wrapper bee-tabs-wrapper">
            <el-tabs v-model="tabActiveName" type="card" class="bee-tabs">
                <el-tab-pane label="角色" name="role">
                    <div class="projection" v-if="newTabType === 'add'" style="box-shadow: none;">
                        <Button class="public-function-btn" @click="addRole">添加角色</Button>
                        <Button class="public-function-btn" @click="isTimeAdjustShow">时效调整</Button>
                    </div>
                    <el-table
                        :highlight-current-row="true"
                        @row-click="roleListClick"
                        ref="roleListRef"
                        :data="roleTableData"
                        style="width: 100%">
                        <el-table-column
                            label="序号"
                            type="index">
                        </el-table-column>
                        <el-table-column
                            label="角色编码"
                            prop="roleCode">
                        </el-table-column>
                        <el-table-column
                            label="角色名称"
                            prop="roleName">
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="rolePermission(scope.row, $event)">{{scope.row.roleName}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="所属组织"
                            prop="orgName">
                        </el-table-column>
                        <el-table-column
                            label="关联生效日期"
                            prop="effectiveTime">
                            <template slot-scope="scope">
                                {{scope.row.effectiveTime | formatDate('yyyy-MM-dd')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="关联失效日期"
                            prop="expireTime">
                            <template slot-scope="scope">
                                {{scope.row.expireTime | formatDate('yyyy-MM-dd')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="授权人"
                            prop="authorUser">
                            <template slot-scope="scope">
                                {{USERNAME}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="授权时间"
                            prop="authorTime">
                            <template slot-scope="scope">
                                {{scope.row.authorTime | formatDate('yyyy-MM-dd')}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="特殊授权" name="special">
                    <div class="childrenTabs-wrapper">
                        <el-tabs v-model="childrenTabActiveName" @tab-click="childrenTabClick">
                            <el-tab-pane label="功能权限" name="functionPermission" class="functionPermission">
                                <div class="projection">
                                    <Button class="public-function-btn" @click="addPermission">添加权限</Button>
                                </div>
                                <div>
                                <el-table :data="model2" border>
                                    <fw-tree-grid
                                        ref="funcTreeRef"
                                        prop="resourceName"
                                        label="权限名称"
                                        :expand-all="true"
                                        tree-key="permissionId"
                                        :autoExpandCheckedNodes="true"
                                        child-key="childFuncs"
                                        width="300">
                                    </fw-tree-grid>
                                    <el-table-column prop="resourceDesc" label="功能描述"   width="180"></el-table-column>
                                    <el-table-column prop="type" label="权限类型">
                                        <template slot-scope="scope">
                                            {{scope.row.type}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                </div>  
                            </el-tab-pane>
                            <el-tab-pane label="组织权限" name="orgPermission" class="orgPermission">
                                <div class="orgPermission">
                                    <div class="btn"></div>
                                    <div class="projection">
                                        <Button class="public-function-btn" @click="addOrg">添加组织权限</Button>
                                    </div>
                                    <el-table ref="singleTable" border :data="orgTableData" highlight-current-row style="width: 100%">
                                        <el-table-column label="序号" type="index" width="60">
                                        </el-table-column>
                                        <el-table-column property="orgCode" label="组织编码" width="140">
                                        </el-table-column>
                                        <el-table-column property="orgName" label="组织名称" width="140">
                                        </el-table-column>
                                        <el-table-column property="orgType" label="组织类型" width="120">
                                        </el-table-column>
                                        <el-table-column property="authorizer" label="授权人" width="70">
                                        </el-table-column>
                                        <el-table-column property="authorizationTime" label="授权时间">
                                            <template slot-scope="scope">
                                                {{scope.row.authorizationTime | formatDate('yyyy-MM-dd hh:ss')}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="数据权限" name="dataPermission" class="dataPermission">
                                <div class="dataPermission">
                                    <el-form :inline="true" :model="dataPermission" class="demo-form-inline">
                                        <el-form-item label="管理维度">
                                            <el-select v-model="dataPermission.manageArea" placeholder="区域" size="small">
                                                <el-option label="区域" value="area"></el-option>
                                                <el-option label="客户" value="client"></el-option>
                                                <el-option label="供应商" value="provider"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="分配方式">
                                            <el-select v-model="dataPermission.allotType" placeholder="按类别" size="small">
                                                <el-option label="按类别" value="type"></el-option>
                                                <el-option label="按个体" value="unit"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="分类依据">
                                            <el-select v-model="dataPermission.typeAccording" placeholder="根据管理维度显示" size="small">
                                                <el-option label="根据管理维度显示的第一个分类依据" value="type"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" size="small">添加数据权限</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <div class="dataPermissionTable-wrapper">
                                        <inqMaintainTable :dataPermissionTableHead="dataPermissionTable.dataPermissionTableHead" :dataPermissionTableData="dataPermissionTable.dataPermissionTableData" :lockCheckbox="false">
                                        </inqMaintainTable>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="timeAdjust-wrapper">
            <transition name="el-fade-in">
                <div class="timeAdjust-layer" v-show="timeAdjustShow" @click.self="isTimeAdjustShow">
                    <div class="timeAdjust">
                        <div class="header clearfix">
                            <span class="title">调整授权时效</span>
                            <i class="iconfont icon-guanbi" @click.self="isTimeAdjustShow"></i>
                        </div>
                        <div class="body">
                            <div class="body-msg">
                                <p>
                                    <span>角色编码：</span>
                                    <span>{{roleTableCurrentMsg.roleCode}}</span>
                                </p>
                                <p>
                                    <span>角色名称：</span>
                                    <span>{{roleTableCurrentMsg.roleName}}</span>
                                </p>
                                <p>
                                    <span>所属组织：</span>
                                    <span>{{roleTableCurrentMsg.orgName}}</span>
                                </p>
                            </div>
                            <div class="dateTime">
                                <span>关联生效时间 </span>
                                <el-date-picker v-model="timeLayerMsg.effectiveTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="roleLayerMsg.pickerOptions">
                                </el-date-picker>
                                <span>&emsp;关联失效时间 </span>
                                <el-date-picker v-model="timeLayerMsg.expireTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="roleLayerMsg.pickerOptions">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="footer">
                            <span class="sure" @click="sureTimeAdjust">确定</span>
                            <span class="cancel" @click="isTransferTreeShow = false">取消</span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="addRole-layer">
            <el-dialog title="分配角色" :visible.sync="roleLayerMsg.addRoleLayer" size="tiny" style="top: 20%;">
                <div class="tree-wrapper">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" icon="search">
                    </el-input>
                    <el-tree class="filter-tree" :data="roleLayerMsg.treeData" node-key="id" :props="roleLayerMsg.defaultProps" default-expand-all :filter-node-method="filterNode" ref="roleTree" highlight-current show-checkbox>
                    </el-tree>
                </div>
                <div class="dateTime">
                    <span>关联生效时间 </span>
                    <el-date-picker v-model="roleLayerMsg.effectiveTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="roleLayerMsg.pickerOptions">
                    </el-date-picker>
                    <span>&emsp;关联失效时间 </span>
                    <el-date-picker v-model="roleLayerMsg.expireTime" type="date" placeholder="选择日期" size="small" style="width: 117px;" :picker-options="roleLayerMsg.pickerOptions">
                    </el-date-picker>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="roleLayerMsg.addRoleLayer = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAddRole">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="addPermission-layer">
            <el-dialog title="添加功能权限" :visible.sync="perLayerMsg.addPerLayer" size="tiny" style="top: 20%;">
                <div class="tree-wrapper">
                    <fw-smarter-tree class="filter-tree" :enable-check="true" child-key="childFuncs" :expand-all="true" :data="model1" tree-key="permissionId" prop="resourceName" ref="smartTree">
                    </fw-smarter-tree>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="perLayerMsg.addPerLayer = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAddPer">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="addOrg-layer">
            <el-dialog title="分配组织" :visible.sync="orgLayerMsg.orgLayer" size="tiny" style="top: 20%;">
                <div class="tree-wrapper">
                    <el-input placeholder="输入关键字进行过滤" v-model="orgFilterText" size="small" icon="search">
                    </el-input>
                    <el-tree class="filter-tree" :data="orgLayerMsg.treeData" node-key="permissionId" :props="orgLayerMsg.defaultProps" default-expand-all :filter-node-method="filterOrgNode" ref="orgTreeRef" highlight-current show-checkbox>
                    </el-tree>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="orgLayerMsg.orgLayer = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAddOrg">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="roleMsg-layer-wraper" v-show="rolePermissionLayer.roleMsgShow" name="fade-in">
            <div class="roleMsg-layer">
                <div class="header">
                    <span class="title">角色权限-{{rolePermissionLayer.roleName}}</span>
                    <span class="r-close" @click.self="rolePermissionLayer.roleMsgShow = false">×</span>
                </div>
                <div class="projection">
                    <Button class="public-function-btn" @click="upRolePermission">上一个</Button>
                    <Button class="public-function-btn" @click="downRolePermission">下一个</Button>
                </div>
                <div class="body">
                    <el-table
                        :data="tableData"
                        @expand="_expandTable"
                        ref="roleTable"
                        :default-expand-all="true"
                        style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-table :data="model" border>
                                    <fw-tree-grid
                                        :ref="scope.row.ref"
                                        prop="resourceName"
                                        label="权限名称"
                                        :expand-all="true"
                                        tree-key="permissionId"
                                        :autoExpandCheckedNodes="true"
                                        :enable-check="treeGrid.showCheckbox"
                                        child-key="childFuncs"
                                        width="300">
                                    </fw-tree-grid>
                                    <el-table-column prop="resourceDesc" label="功能描述"   width="180"></el-table-column>
                                    <el-table-column prop="type" label="权限类型">
                                        <template slot-scope="scope">
                                            {{scope.row.type}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="系统平台"
                            prop="id">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const USERNAME = '王鹏'
const USERID = 2160092
const GROUPID = 1
import inqMaintainTable from '@Permission/components/inqMaintainTable/InqMaintainTable'
import dropDownTree from '@Permission/components/dropDownTree/DropDownTree'
import { getRegisterSource, initialOrg, getRoleTree, getRolePermission, getUserFuncTree, getUserOrgTree, insertUser } from '@Permission/services/userService.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
    props: {
        tabType: {
            type: String,
            default: ''
        },
        busSign: {
            type: String,
            default: ''
        },
        selectTabCode: { // 当前页的tag
            type: String,
            default: ''
        }
    },
    data () {
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'))
            } else {
                var reg = /^1[3|4|5|7|8][0-9]{9}$/
                console.log(value, reg.test(value), 88888888888)
                if (!reg.test(value)) {
                    callback(new Error('请输入正确手机号码'))
                }
                callback()
            }
        }
        var validateEmail = (rule, value, callback) => {
            if (value !== '') {
                var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                if (!emailReg.test(value)) {
                    callback(new Error('请输入有效的邮箱地址'))
                }
                callback()
            }
            callback()
        }
        return {
            USERNAME: USERNAME,
            tabActiveName: 'role', // tab页默认选中
            formReadOnly: false,
            orgDropTreeData: [], // 下拉树的数据
            filterText: '', // 筛选下拉树形结构的数据
            perFilterText: '', // 添加功能权限下拉树筛选
            orgFilterText: '', // 组织功能权限下拉树筛选
            roleTableCurrentMsg: {}, // 当前角色行的信息
            roleTableCurrentIndex: '', // 当前角色行索引
            funcTreeShow: true, // 功能权限的树是否显示
            funcPermissionLayer: [ { resourceName: 'PC', childFuncs: [], permissionId: 0.1, ref: 'PCTreeRef' }, { resourceName: 'APP', childFuncs: [], permissionId: 0.2, ref: 'APPTreeRef' }], // 功能权限弹窗数据结构
            roleLayerMsg: { // 角色弹窗的信息
                treeData: [],
                defaultProps: {
                    children: 'roleList',
                    label: 'name'
                },
                effectiveTime: '', // 添加角色弹层中的生效时间和时效时间
                expireTime: '',// 添加角色弹层中的生效时间和时效时间
                addRoleLayer: false,
                pickerOptions: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                }
            },
            smartTreeNodes: [], // 获取功能权限列表
            orgTreeArr: [], // 获取组织权限列表
            perLayerMsg: { // 功能权限
                addPerLayer: false,
                treeData: [],
                defaultProps: {
                    children: 'childFuncs',
                    label: 'resourceName'
                }
            },
            orgLayerMsg: { // 组织权限
                orgLayer: false,
                treeData: [],
                defaultProps: {
                    children: 'childOrgs',
                    label: 'orgName'
                }
            },
            timeLayerMsg: {
                effectiveTime: '',
                expireTime: ''
            },
            rolePermissionLayer: {
                roleName: '运营',
                roleMsgShow: false
            },
            formData: {
                userNumber: '',
                userName: '',
                userAccount: '',
                phone: '',
                email: '',
                identityType: 0,
                realName: '',
                source: 122,
                enable: '未启用',
                lock: '',
                remark: '',
            },
            roleTableData: [],
            sourceArr: [],
            rules: {
                org: [
                    { required: true, message: '请选择所属组织', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                userAccount: [
                    { required: true, message: '请输入用户账号', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入用户手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
                ],
                email: [
                    { required: false, validator: validateEmail, trigger: 'blur' }
                ]
            },
            tableData: [ { id: 'PC', tree: [], ref: 'PCref' }, { id: 'APP', tree: [], ref: 'APPref' }],
            treeGrid: {
                showCheckbox: false
            },
            model: [],
            model1: [],
            model2: [],
            tab: 'role',
            childrenTabActiveName: 'functionPermission',
            orgTableData: [],
            dataPermission: {
                manageArea: '',
                allotType: '',
                typeAccording: ''
            },
            dataPermissionTable: {
                dataPermissionTableHead: [
                    { name: '序号', width: '44px' },
                    { name: '管理维度', width: '78px' },
                    { name: '分配方式', width: '77px' },
                    { name: '类别/个体', width: '82px' },
                    { name: '查询', width: '68px', checkbox: true, checked: false, indeterminate: false },
                    { name: '维护', width: '69px', checkbox: true, checked: false, indeterminate: false },
                    { name: '授权人', width: '69px' },
                    { name: '授权时间', width: '157px' }
                ],
                dataPermissionTableData: [
                    {
                        manageArea: '区域',
                        allotType: '按类别',
                        type_unit: '华北',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张一',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        manageArea: '区域',
                        allotType: '按类别',
                        type_unit: '华北',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张二',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        manageArea: '区域',
                        allotType: '按类别',
                        type_unit: '华北',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张三',
                        authorizationTime: '2017-09-05 20:50'
                    },
                    {
                        manageArea: '区域',
                        allotType: '按类别',
                        type_unit: '华北',
                        inquireCheckbox: { isCheck: false },
                        maintainCheckbox: { isCheck: false },
                        authorizationPerson: '张四',
                        authorizationTime: '2017-09-05 20:50'
                    }
                ]
            },
            timeAdjustShow: false,
            timeValue: ''
        }
    },
    computed: {
        ...mapGetters({
            userMsg: 'PER_G_GET_USERMESSAGE' // 获取管理员ID
        })
    },
    created () {
        // 每个tab页的信息都是独立的, 所以要把vuex(公共数据)私有化
        this.newUserMsg = this.userMsg
        // 因为渲染的通一个组件，通过它使各个二级tab成为唯一的标识
        this.newTabType = this.tabType
        // 获取注册来源列表
        this._getRegisterSource()
        this._initialOrg()
        this._getRoleTree()
        
    },
    methods: {
        addTab (name, tag, tabType, content) {
            if (tabType === 'update') {
                this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
            } else if (tabType === 'detail') {
                this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
            } else {
                this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
            }
            // vuex存储当前管理员信息
            this.saveUserMsg({ adminId: this.newUserMsg.adminId, name, tag, tabType, content })
        },
        saveUser () {
            let funcIds = []
            let orgIds = []
            this.smartTreeNodes.forEach(value => {
                funcIds.push(value.permissionId)
            })
            this.orgTreeArr.forEach(value => {
                orgIds.push(value.permissionId)
            })
            console.log(this.orgTreeArr, 'this.orgTreeArr--------<<<<')
            for(var i = funcIds.length - 1; i >= 0; i--) {
                console.log(funcIds[i])
                if (funcIds[i] === 0.1 || funcIds[i] === 0.2) {
                    funcIds.splice(i, 1)
                }
            }
            // console.log(OrgrefNodes, 'OrgrefNodesOrgrefNodes')
            console.log(funcIds, orgIds, 444)
            let ajaxData = {
                createUserId: USERID,
                dataList: [],
                email: this.formData.email,
                funcList: funcIds,
                groupId: GROUPID,
                identityType: this.formData.identityType,
                managerLevel: 3, // 3表示普通用户
                orgId: this.$refs.dropDownTree.checkNode.groupId,
                orgList: orgIds,
                phone: parseInt(this.formData.phone),
                realName: this.formData.realName,
                remark: this.formData.remark,
                roleList: this.roleTableData,
                source: this.formData.source,
                userName: this.formData.userName,
                userNumber: 'YHBM'
            }
            console.log(ajaxData, 333333333)
            this.insertUser(ajaxData)
        },
        saveUser_addUser (name, tag, tabType, content) {
            console.log(this.newUserMsg)
            this.saveUser()
            setTimeout(() => {
                // !!! 在这里其实应该监听保存成功后在新增管理员
                this.addTab(name, tag, tabType, content)
            }, 900)
        },
        cancelSaveUser () {
            console.log(`${this.busSign}close`, `${this.newUserMsg.tag}`, null, this.newUserMsg.tabType, 8888888888888)
            this.$root.bus.$emit(`${this.busSign}close`, `${this.newUserMsg.tag}`, null, this.newUserMsg.tabType)
        },
        roleListClick (row, event, column) {
            this.roleTableCurrentMsg = row
            this.roleTableCurrentIndex = this.roleTableData.findIndex(value => {
                return value === row
            })
        },
        addPermission () { // 添加权限
            this.getUserFuncTree({ LoginUserId: USERID, userId: 0, groupId: GROUPID, chooseResourceName: "" })
            this.perLayerMsg.addPerLayer = true
        },
        filterNode (value, data) { // 搜索角色列表
            if (!value) return true
            return data.roleName.indexOf(value) !== -1
        },
        filterOrgNode (value, data) {
            if (!value) return true
            return data.orgName.indexOf(value) !== -1
        },
        filterPerNode (value, data) { // 搜索功能权限
            if (!value) return true
            return data.resourceName.indexOf(value) !== -1
        },
        confirmAddPer () {
            // this.orgTableData.push()
            this.funcTreeShow = true
            // console.log(this.funcPermissionLayer, 4444444444)
            // this.funcPermissionLayer.forEach(value => {
            //     if (value.resourceName === 'PC') {
            //         var getPCNodes = this.$refs.smartTree.getCheckedNodes(true)
            //         console.log(getPCNodes, 33333333333333)
            //         this.$refs.PCTreeRef1.refreshTreeTable(getPCNodes)
            //     } else if (value.resourceName === 'APP') {
            //         var getAPPNodes = this.$refs.smartTree.getCheckedNodes(true)
            //         this.$refs.APPTreeRef1.refreshTreeTable(getAPPNodes)
            //     }
            // })
            this.smartTreeNodes = this.$refs.smartTree.getCheckedNodes(true)
            console.log(this.smartTreeNodes, 'getPCNodes33333')
            this.$refs.funcTreeRef.refreshTreeTable(this.smartTreeNodes,false)
            this.perLayerMsg.addPerLayer = false
        },
        confirmAddOrg () {
            this.orgTreeArr = this.$refs.orgTreeRef.getCheckedNodes(true)
            this.orgTreeArr.forEach(value => {
                value.authorizer = USERNAME
                value.authorizationTime = new Date().getTime()
            })
            this.orgTableData = this.orgTreeArr
            this.orgLayerMsg.orgLayer = false
        },
        addRole () {
            this.roleLayerMsg.addRoleLayer = true
        },
        confirmAddRole () {
            // new Date(date) 可以直接对时间对象进行深复制
            let d1 = this.roleLayerMsg.effectiveTime
            let effectiveTimeCopy = new Date(d1)
            let d2 = this.roleLayerMsg.expireTime
            let expireTimeCopy = new Date(d2)
            let checkRoleArr = [] // 选中的角色数组
            this.$refs.roleTree.getCheckedNodes().forEach(value => {
                // 如果id有role说明是角色
                if (value.id.indexOf('role') >= 0) {
                    if (this.roleTableData.length === 0) {
                        value.effectiveTime = new Date(effectiveTimeCopy).getTime()
                        value.expireTime = new Date(expireTimeCopy).getTime()
                        value.authorTime = new Date().getTime()
                    }
                    checkRoleArr.push(value)
                }
            })
            if (this.roleTableData.length === 0) {
                this.roleTableData = checkRoleArr
            } else {
                let rmArr = []
                for (var i = 0; i < checkRoleArr.length; i++) {
                    var flag = false
                    for (var j = 0; j < this.roleTableData.length; j++) {
                        if (checkRoleArr[ i ].id === this.roleTableData[ j ].id) {
                            flag = true
                            break
                        }
                    }
                    if (!flag) {
                        this.roleTableData.push(
                            Object.assign(checkRoleArr[ i ], {
                                effectiveTime: new Date(this.roleLayerMsg.effectiveTime).getTime(),
                                expireTime: new Date(this.roleLayerMsg.expireTime),
                                authorTime: new Date().getTime()
                            })
                        )
                    }
                }
                // 找出需要移除的的角色
                for (var k = 0; k < this.roleTableData.length; k++) {
                    var flag2 = false
                    for (var l = 0; l < checkRoleArr.length; l++) {
                        if (this.roleTableData[ k ].id === checkRoleArr[ l ].id) {
                            flag2 = true
                            break
                        }
                    }
                    if (!flag2) {
                        rmArr.push(this.roleTableData[ k ].id)
                    }
                }
                // 把找出的移除角色删除掉
                rmArr.forEach(value => {
                    for (var i = this.roleTableData.length - 1; i >= 0; i--) {
                        if (value === this.roleTableData[ i ].id) {
                            this.roleTableData.splice(i, 1)
                            break
                        }
                    }
                })
            }
            console.log(this.roleTableData, 77777777777)
            this.roleLayerMsg.addRoleLayer = false
        },
        rolePermission (roleMsg, e) {
            if (e.target.tagName === 'A') {
                this.getRolePermission({ userId: 0, roleId: roleMsg.roleId, groupId: 1, permissionType: 'func' })
                this.rolePermissionLayer.roleMsgShow = true
            }
        },
        _expandTable (row, expanded) {
            if (!expanded) return
            setTimeout(() => {
                this.$refs.PCref.refreshTreeTable(this.tableData[ 0 ].tree)
                this.$refs.PCref.expandAllNodes()
                this.$refs.APPref.refreshTreeTable(this.tableData[ 1 ].tree)
                this.$refs.APPref.expandAllNodes()
            }, 200)
            // this._getGroupFuncTree(ajaxFormMsg, false)
        },
        upRolePermission () {
            let index = this.roleTableCurrentIndex - 1 < 0 ? 0 : this.roleTableCurrentIndex - 1
            this.roleTableCurrentIndex = index
            this.$refs.roleListRef.setCurrentRow(this.roleTableData[ this.roleTableCurrentIndex ])
            this.getRolePermission({ userId: 0, roleId: this.roleTableData[ this.roleTableCurrentIndex ].roleId, groupId: 1, permissionType: 'func' })
        },
        downRolePermission () {
            let index = this.roleTableCurrentIndex + 1 > this.roleTableData.length - 1 ? this.roleTableData.length - 1 : this.roleTableCurrentIndex + 1
            this.roleTableCurrentIndex = index
            this.$refs.roleListRef.setCurrentRow(this.roleTableData[ this.roleTableCurrentIndex ])
            this.getRolePermission({ userId: 0, roleId: this.roleTableData[ this.roleTableCurrentIndex ].roleId, groupId: 1, permissionType: 'func' })
        },
        childrenTabClick () {
            console.log(arguments, 'arguments')
        },
        addFunctionPermission () {
            console.log('addFunctionPermission')
        },
        addOrg () {
            this.getUserOrgTree({ userId: USERID, groupId: GROUPID })
            this.orgLayerMsg.orgLayer = true
        },
        sureTimeAdjust () {
            // 只有通过这种方式才能让vue监听到数组的变化
            let tableList = []
            this.roleTableData.forEach(value => {
                tableList.push(value)
            })
            tableList[ this.roleTableCurrentIndex ].effectiveTime = this.timeLayerMsg.effectiveTime.getTime()
            tableList[ this.roleTableCurrentIndex ].expireTime = this.timeLayerMsg.expireTime.getTime()
            this.roleTableData = tableList
            this.timeAdjustShow = false
        },
        isTimeAdjustShow () {
            //            this.roleTableCurrentMsg.effectiveTime =
            this.timeAdjustShow = !this.timeAdjustShow
        },
        async insertUser(data) {
            let res = await insertUser(data)
            console.log(res, '新增用户--------<<<<<<<')
            if (res.data.status.statusCode === 0) {
                const h = this.$createElement
                this.$msgbox({
                    title: '添加成功',
                    message: h('div', null, [
                        h('p', null, `管理员账号是 ${res.data.result.userName}`),
                        h('p', null, `管理员密码是 ${res.data.result.password}`)
                    ]),
                    confirmButtonText: '确定',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            done()
                        } else {
                            done()
                        }
                    }
                }).then(action => {
                    this.$root.bus.$emit(`${this.busSign}close`, `${this.newUserMsg.tag}`, null, this.newUserMsg.tabType)
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: `${res.data.status.statusReason}`
                })
            }
        } ,
        async getUserOrgTree (params) {
            if (this.orgLayerMsg.treeData.length > 0) return
            let res = await getUserOrgTree(params)
            console.log(res)
            this.orgLayerMsg.treeData = res.data.result.all
        },
        async getUserFuncTree (params) {
            if (this.funcPermissionLayer[0].childFuncs.length || this.funcPermissionLayer[1].childFuncs.length) return
            let res = await getUserFuncTree(params)
            if (res.data.result.PC) {
                this.funcPermissionLayer.forEach(value => {
                    if (value.resourceName === 'PC') {
                        value.childFuncs = res.data.result.PC
                    }
                })
            }
            if (res.data.result.APP) {
                this.funcPermissionLayer.forEach(value => {
                    if (value.resourceName === 'APP') {
                        value.childFuncs = res.data.result.APP
                    }
                })
            }
            this.$refs.smartTree.refreshTreeTable(this.funcPermissionLayer)
        },
        async getRolePermission (params) {
            let res = await getRolePermission(params)
            if (!res.data.result.funcPermissions.PC) {
                this.tableData.forEach((value, index) => {
                    if (value.id === 'PC') {
                        this.$refs.PCref.refreshTreeTable([])
                    }
                })
            }
            if (!res.data.result.funcPermissions.APP) {
                this.tableData.forEach((value, index) => {
                    if (value.id === 'APP') {
                        this.$refs.APPref.refreshTreeTable([])
                    }
                })
            }
            this.tableData.forEach((value, index) => {
                if (value.id === 'PC' && res.data.result.funcPermissions.PC) {
                    value.tree = res.data.result.funcPermissions.PC
                    this.$refs.PCref.refreshTreeTable(res.data.result.funcPermissions.PC)
                    this.$refs.PCref.expandAllNodes()
                } else if (value.id === 'APP' && res.data.result.funcPermissions.APP) {
                    value.tree = res.data.result.funcPermissions.APP
                    this.$refs.APPref.refreshTreeTable(res.data.result.funcPermissions.APP)
                    this.$refs.APPref.expandAllNodes()
                }
            })
        },
        async _getRegisterSource () { // 获取注册来源
            let res = await getRegisterSource()
            this.sourceArr = res.data.result
        },
        async _initialOrg () {
            var res = await initialOrg({ userId: 1, groupId: 1, permissionType: 'org' })
            this.orgDropTreeData = res.data.result.orgs
        },
        async _getRoleTree () {
            var res = await getRoleTree({ userId: 1, groupId: 1 })
            this.roleLayerMsg.treeData = res.data.result.all
        },
        ...mapMutations({
            saveUserMsg: 'PER_M_SAVE_USERMESSAGE'
        })
    },
    watch: {
        filterText (val) {
            this.$refs.roleTree.filter(val)
        },
        perFilterText (val) {
            this.$refs.permissionTree.filter(val)
        },
        orgFilterText (val) {
            this.$refs.orgTreeRef.filter(val)
        }
    },
    components: {
        inqMaintainTable,
        dropDownTree
    }
}
</script>
<style lang="scss">
.addListForm-wrapper {
  margin: 16px;
  border-bottom: 1px solid #eee;
  .el-form {
    margin-left: -20px;
  }
  .remark {
    position: relative;
    .wordNum {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 6px;
      .num {
        color: #24a7e4;
        font-style: normal;
      }
    }
  }
}
.tabs-wrapper {
  width: 98%;
  margin: 0 auto 50px;
  .tabs-header {
    display: flex;
    border-bottom: 1px solid #cecece;
    font-size: 14px;
    .tab {
      width: 88px;
      height: 34px;
      border: 1px solid #cecece;
      border-bottom: 0;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #f6f6f6;
      cursor: pointer;
      line-height: 34px;
      text-align: center;
      transition: all 0.3s;
      &.isActive {
        background-color: #f6fefe;
        color: #24a7e4;
        border-top: 2px solid #24a7e4;
        margin-bottom: -1px;
      }
    }
  }
  .tabs-container {
    height: 442px;
    border: 1px solid #cbcbcb;
    border-top: 0;
    .btns {
      box-shadow: none;
      padding: 0;
    }
    .childrenTabs-wrapper {
      width: 98%;
      margin: 0 auto;
      padding-top: 16px;
      thead {
        th {
          .cell {
            padding: 0;
            text-align: center;
            font-weight: normal;
          }
        }
      }

      .dataPermission {
        .el-form-item {
          .el-form-item__content {
            button {
              background-color: #f2fffe;
              color: #333;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.timeAdjust-layer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  .timeAdjust {
    width: 457px;
    height: 246px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -123px;
    margin-left: -228px;
    color: #333;
    background-color: #fff;
    .header {
      height: 36px;
      line-height: 36px;
      background-color: #49b1df;
      color: #fff;
      .title {
        margin-left: 16px;
        font-size: 15px;
      }
      .icon-guanbi {
        float: right;
        margin-right: 16px;
        cursor: pointer;
      }
    }
    .body {
      width: 96%;
      margin: 6px auto 0;
      font-size: 14px;
      .body-msg {
        border-bottom: 1px solid #efefef;
        padding-bottom: 6px;
        p {
          margin: 0;
          height: 28px;
          line-height: 28px;
        }
      }
      .body-time {
        .title {
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .footer {
      height: 45px;
      background: #f5f5f5;
      font-size: 14px;
      & > span {
        float: right;
        cursor: pointer;
        width: 66px;
        height: 24px;
        border: 1px solid #cbcbcb;
        text-align: center;
        margin-top: 10px;
        border-radius: 4px;
        line-height: 24px;
        margin-right: 10px;
        &.sure {
          margin-right: 16px;
          border-color: #29aadc;
        }
      }
    }
  }
}
.addRole-layer {
  .tree-wrapper {
    border: 1px solid #ccc;
    padding: 16px;
    height: 300px;
    overflow-y: scroll;
  }
  .dateTime {
    margin-top: 16px;
  }
}
.el-button--primary {
  color: #333;
  &:hover {
    color: #666;
  }
}
.roleMsg-layer-wraper {
  height: 610px;
  width: 680px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10000;
  .roleMsg-layer {
    font-size: 12px;
    .projection {
      box-shadow: none;
      background-color: #fff;
    }
    .header {
      background-color: #48b0de;
      height: 36px;
      line-height: 36px;
      span {
        color: #fff;
        &.title {
          float: left;
          margin-left: 16px;
        }
        &.r-close {
          float: right;
          margin-right: 16px;
          cursor: pointer;
        }
      }
    }
    .body {
      background-color: #fff;
      height: calc(680px - 78px);
      overflow: scroll;
      z-index: 10;
      padding-bottom: 16px;
    }
  }
}
.functionPermission,
.orgPermission,
.dataPermission {
  .projection {
    box-shadow: none;
    padding: 0;
  }
}
</style>
