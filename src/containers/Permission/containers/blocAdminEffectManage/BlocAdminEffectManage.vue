<template>
    <div class="BlocAdminEffectManage" v-if="isCache" ref="listOutBox">
        <div class="projection" v-if="!showCheck">
            <Button class="public-function-btn" @click="alter">修改</Button>
            <Button class="public-function-btn">刷新</Button>
        </div>
        <div class="projection" v-if="showCheck">
            <Button class="public-function-btn" @click="save">保存</Button>
            <Button class="public-function-btn">取消</Button>
        </div>
        <div class="BlocAdminEffectManage-content">
            <div class="slideTree-wrapper">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" icon="search">
                </el-input>
                <el-tree
                    class="filter-tree"
                    :default-checked-keys="[1.1]"
                    :data="treeDate"
                    :props="defaultProps"
                    default-expand-all
                    @current-change="blocChange"
                    :filter-node-method="filterNode"
                    ref="slideTree"
                    highlight-current>
                </el-tree>
            </div>
            <div class="main-table-tree">
                <el-table
                    :data="blocPermission"
                    ref="funcTreeShow"
                    @expand="_expandTable"
                    :default-expand-all="true">
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
                                    :enable-check="showCheck"
                                    checked-key="state"
                                    child-key="childFuncs"
                                    width="300">
                                </fw-tree-grid>
                                <el-table-column prop="state" label="是否有权限"   width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.state === true ? '√' : '×'}}
                                    </template>
                                </el-table-column>
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
                        prop="resourceName">
                    </el-table-column>
                </el-table>
            </div> 
        </div>
    </div>
</template>

<script>
const GROUPID = 1
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { commonTabConfig, scrollMixin } from '@Permission/mixin/mixin.js'
import { getGroupList, getGroupFuncTree, updateGroupFunc } from '@Permission/services/blocService.js'
export default {
    mixins: [oneLevelTabMixins, twoLevelTabMixins, commonTabConfig, scrollMixin],
    data() {
        return {
            titleName: '集团管理员功能管理',
            system: '/permission',
            tag: 'permission_blocAdminEffectManage',
            tabType: '',
            filterText: '',
            model: [],
            showCheck: false, // 是否显示勾选框
            treeDate: [
                {
                    id: 1.1,
                    orgName: '集团',
                    children: []
                }
            ],
            initAjaxObj: {
                "custId": null,
                "orderBy": "",
                "orgCode": "",
                "orgName": "",
                "orgShortName": "",
                "pageNo": 1,
                "pageSize": 1,
                "pageable": false,
                "start": 0,
                "userId": 1
            },
            defaultProps: {
                children: 'children',
                label: 'orgName'
            },
            blocPermission: [{permissionId: 'PC',childFuncs: [], ref: 'PCref', resourceName: 'PC'}, {permissionId: 'APP', childFuncs: [], ref: 'APPref', resourceName: 'APP'}]
        }
    },
    created() {
        this._getGroupList(this.initAjaxObj)
    },
    watch: {
        filterText(val) {
            console.log(val)
            this.$refs.slideTree.filter(val)
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.orgName.indexOf(value) !== -1
        },
        blocChange(nodeMsg, nodeObj) {
            console.log(nodeMsg, nodeObj, 77777777777)
            if (nodeMsg.id === 1.1) return // 点击父节点不触发事件
            this.$alert('目前这几个集团下均无权限，暂时写死groupid为1的数据')
            // 因为这些集团目前没有权限数据，先暂时写死
            // this.getGroupFuncTree({groupId: nodeMsg.id})
            this.getGroupFuncTree({groupId: GROUPID})
        },
        alter() {
            this.showCheck = true
        },
        save() {
            this.showCheck = false
            console.log(this.$refs)
            console.log(this.$refs.PCref.getAllNodes())
            let ajaxChooseArr = []
            this.$refs.PCref.getAllNodes().forEach(value => {
                ajaxChooseArr.push({id: value.id, status: value.state === true ? 1 : 0})
            })
            this.$refs.APPref.getAllNodes().forEach(value => {
                ajaxChooseArr.push({id: value.id, status: value.state === true ? 1 : 0})
            })
            console.log(ajaxChooseArr, 'ajaxChooseArr2222222222')
            this.updateGroupFunc(ajaxChooseArr)
        },
        _expandTable(row,expanded) {
            console.log(row, expanded,1111111111112221)
            if (!expanded) return
            this.getGroupFuncTree({groupId: GROUPID})
        },
        async updateGroupFunc(data) {
            let res = await updateGroupFunc(data)
            console.log(res, 1111111)
            if (res.data.status.statusCode === 0) {
                this.getGroupFuncTree({groupId: GROUPID})
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: `${res.data.status.statusReason}`
                })
            }
        },
        async _getGroupList(data) {
            let res = await getGroupList(data)
            this.treeDate[0].children = res.data.result.result
        },
        async getGroupFuncTree(data) {
            let res = await getGroupFuncTree(data)
            console.log(res, 1234)
            this.blocPermission.forEach((value,index) => {
                if (value.permissionId === 'PC' && res.data.result.PC) {
                    this.$refs.PCref.refreshTreeTable(res.data.result.PC)
                    this.$refs.PCref.expandAllNodes()
                } else if (value.permissionId === 'APP' && res.data.result.APP){
                    this.$refs.APPref.refreshTreeTable(res.data.result.PC)
                    this.$refs.APPref.expandAllNodes()
                }
            })
        }
    }
}
</script>

<style lang="scss">
.BlocAdminEffectManage {
    .BlocAdminEffectManage-content {
        margin: 16px;
        .slideTree-wrapper {
            float: left;
            padding: 10px;
            .el-tree {
                margin-top: 16px;
                border: 0;
            }
            width: 220px;
            min-height: 707px;
            border: 1px solid #e4e4e4;
        }
        .main-table-tree {
            margin-left: 251px;
        }
    }
    
}
</style>