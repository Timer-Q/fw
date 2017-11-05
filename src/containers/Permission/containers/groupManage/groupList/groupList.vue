<template>
    <div class="org areaScroll" ref="listOutBox">
        <div class="projection">
            <Button class="public-function-btn" @click="addTab('管理员名称-新增', 'groupAdd', 'add', 'GroupAdd')">新增</Button>
            <Button class="public-function-btn" @click="addTab('管理员名称', 'groupUpdate'+orgId, 'update', 'GroupUpdate',orgId)">修改
            </Button>
            <Button class="public-function-btn" @click="groupDel1(orgId)">删除</Button>
            <Button class="public-function-btn" @click="resetForm('groupData')">刷新</Button>
            <Button class="public-function-btn" @click="groupUporDown1(orgId,2)">启用
            </Button>
            <Button class="public-function-btn" @click="groupUporDown1(orgId,3)">停用
            </Button>
        </div>

        <div class="form-wrapper">
            <el-form :inline="true" :model="groupData" class="demo-form-inline" ref="groupData">


                <el-form-item label="编码">
                    <el-input placeholder="请输入" v-model="groupData.orgCode" size="small"
                              style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input placeholder="请输入" v-model="groupData.orgName" size="small"
                              style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item label="简称">
                    <el-input placeholder="请输入" v-model="groupData.orgShortName" size="small"
                              style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item label="对应客户">
                    <el-input placeholder="请输入" v-model="groupData.custId" size="small" style="width: 128px"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="bee-search" @click="searchList">查询</span>
                </el-form-item>
                <el-form-item>
                    <span class="bee-clear" @click="resetForm('groupData')">清空</span>
                </el-form-item>
            </el-form>
        </div>

        <div class="table-wrapper">
            <el-table :data="tableData" row-key="id" @row-click="rowClick" border highlight-current-row
                      style="margin: 0 16px;">
                <el-table-column prop="id" label="序号" type="index" width="100">
                </el-table-column>
                <!--        <el-table-column prop="orgCode" label="编码" width="140">
                        </el-table-column>-->
                <el-table-column prop="orgName" label="名称" width="140">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="addTab('管理员名称', 'groupDetail'+scope.row.id, 'detail', 'GroupDetail',scope.row.id)">{{scope.row.orgName}}</a>
                    </template>
                </el-table-column>

                <el-table-column prop="orgShortName" label="简称" width="100">
                </el-table-column>
                <el-table-column prop="industryType" label="所属行业" width="130">
                </el-table-column>
                <el-table-column prop="regionName" label="国家" width="170">
                </el-table-column>
                <el-table-column prop="administrativeId" label="行政区划" width="140">
                </el-table-column>
                <el-table-column prop="address" label="总部地址" width="200">
                </el-table-column>

                <el-table-column prop="phone" label="电话" width="170">
                </el-table-column>
                <el-table-column prop="email" label="邮编" width="140">
                </el-table-column>
                <el-table-column prop="netAddress" label="网址" width="200">
                </el-table-column>

                <el-table-column prop="establishTime" label="成立时间" width="170">
                </el-table-column>
                <el-table-column prop="creditCode" label="统一社会信用代码" width="140">
                </el-table-column>
                <el-table-column prop="currency" label="本位币" width="200">
                </el-table-column>

                <el-table-column prop="custId" label="对应客户" width="170">
                </el-table-column>
                <!--        <el-table-column prop="businessType" label="业务类型" width="140">
                        </el-table-column>-->
                <el-table-column prop="status" label="启用状态" width="200">
                </el-table-column>

                <!--        <el-table-column prop="isInit" label="是否初始化完成" width="170">
                        </el-table-column>-->
                <el-table-column prop="note" label="简介" width="140">
                </el-table-column>
                <el-table-column prop="mainBusiness" label="主营业务" width="200">
                </el-table-column>

                <el-table-column prop="createUser" label="创建人" width="170">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="140">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | formatDate('yyyy-MM-dd')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateUser" label="最后修改人" width="200">
                </el-table-column>
                <el-table-column prop="updateTime" label="最后修改时间" width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.updateTime | formatDate('yyyy-MM-dd')}}</span>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="pagination-wrapper clearfix">
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="pagination.pageNum" :page-sizes="[10, 20, 40, 50]"
                               :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="pagination.total">
                </el-pagination>
            </div>
        </div>

        <tooltip name="costorder">
            <el-button size="mini"
                       @click="addTab('管理员名称', 'groupDetail'+orgId, 'detail', 'GroupDetail')">
                查看
            </el-button>
            <el-button size="mini"
                       @click="addTab('管理员名称', 'groupUpdate'+orgId, 'update', 'GroupUpdate',orgId)">
                修改
            </el-button>
            <el-button size="mini" @click="groupDel1(orgId)">删除</el-button>
            <el-button size="mini" @click="groupUporDown1(orgId,2)">
                启用
            </el-button>
            <el-button size="mini" @click="groupUporDown1(orgId,3)">
                停用
            </el-button>
        </tooltip>

    </div>
</template>

<script>
    const USERID = 11
    import {queryGroupInfoList, groupDel, groupUporDown } from '@Permission/services/groupService.js'
    import {mapMutations} from 'vuex'
     export default {
        props: {
            busSign: {
                type: String,
                default: ''
            },
            selectTabCode: { // 当前页的tag
                type: String,
                default: ''
            }
        },

        data() {
            return {
                tableRef: 'adminTable', // 给mixin提供的tableRef区分
                groupData: {
                    "orgCode": "",
                    "orgName": "",
                    "orgShortName": "",
                    "pageNo": 1,
                    "pageSize": 10,
                    "userId": USERID
                },
                orgId: 0,
                delData: {
                    "id": 0,
                    "userId": USERID
                },
                enableData: {
                    "enableState": 0,
                    "id": 0,
                    "userId": USERID
                },
                tableData: [],
                quickBar: {
                    enable: "",
                    lock: "",
                    currentRowIndex: 0
                },
                pagination: {
                    pageSize: 20,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        created() {
            let data = this.groupData
            this._initAllDatas(data)
        },
        methods: {
            addTab(name, tag, tabType, content,id) {
                if (tabType === 'update') {
                    this.$root.bus.$emit(this.busSign, `${name}-修改`, `update${tag}`, tabType, content)
                } else if (tabType === 'detail') {
                    console.log(tag,44444)
                    this.$root.bus.$emit(this.busSign, `${name}-详情`, `detail${tag}`, tabType, content)
                    // this.saveAdminMsg({ roleId: this.tableData[this.quickBar.currentRowIndex].id, name, tag, tabType, content })
                } else if (tabType === 'add') {
                    this.$root.bus.$emit(this.busSign, name, tag, tabType, content)
                }
                this.saveGroupMsg({ groupId: id||this.orgId, name, tag, tabType, content })
            },
            userTabAdd(tabType) {
                this.$root.bus.$emit('userTabAdd', tabType)
            },


            async _initialAdminTableList(data){
                console.log(data,3434)
                var res = await queryGroupInfoList(data)
                this.tableData = res.data.result.items
                this.pagination.total = res.data.result.totalNum
            },
            async searchList() {

                this._initialAdminTableList(this.groupData)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.groupData = {
                    "orgCode": "",
                    "orgName": "",
                    "orgShortName": "",
                    "pageNo": 1,
                    "pageSize": 10,
                    "userId": USERID
                }


                this._initialAdminTableList(this.groupData)
            },


            async groupDel1(id) { // 删除用户
                this.$confirm('此操作将删除该集团, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    console.log(id)
                    this.delData.id = id
                    groupDel(this.delData).then(r => {
                        console.log(r, 'delete11111')
                        if (r.data.status.statusCode === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this._initAllDatas(this.groupData)
                        } else {
                            this.$message({
                                type: 'warning',
                                message: `${r.data.status.statusReason}`
                            })
                        }
                    })

                })
            },


            async  groupUporDown1(id, status) { // 启用
                this.$confirm('此操作将启用该集团, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 在这里发送删除用户的ajax
                    this.enableData.enableState = status
                    this.enableData.id = id
                    groupUporDown(this.enableData).then(r => {
                        console.log(r, 'delete11111')
                        if (r.data.status.statusCode === 0) {
                            this.$message({
                                type: 'success',
                                message: '成功!'
                            })
                            this._initAllDatas(this.groupData)
                        } else {
                            this.$message({
                                type: 'warning',
                                message: `${r.data.status.statusReason}`
                            })
                        }
                    })

                })
            },
            rowClick(row, event, column) {
                this.orgId = row.id
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
            },

            handleSizeChange(pageSize) {
                this.groupData.pageSize = pageSize
                this._initialAdminTableList(this.groupData)
            },
            handleCurrentChange(pageNum) {
                this.groupData.pageNum = pageNum
                this._initialAdminTableList(this.groupData)
            },

            _initAllDatas(data) {
                this._initialAdminTableList(data)
            },
            ...mapMutations({
                saveGroupMsg: 'ORG_M_SAVE_GROUPMSG'
            })
        },
        watch: {},
        components: {}
    }
</script>

<style lang="scss">
    .adminMangeList {
        .form-wrapper {
            color: #333;
        }
        .table-wrapper {
            width: min-content;
            .el-table {
                width: min-content;
            }
            .block {
                float: right;
                margin-top: 16px;
            }
        }
    }

    .v-tooltip {
        button:hover {
            span {
                color: #28a7e1;
            }
        }
    }
</style>
