<template>
    <div>
        <!--标签功能操作栏  start-->
        <div class="modal-div clearfix">
            <div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="addJudge">新增</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="modifyJudge">修改</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="deleteJudge">删除</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="openOrClose(true)">启用</a>
                    <i>|</i>
                    <a href="javascript:;" class="add-btn" @click="openOrClose(false)">停用</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="searchDropdownList">刷新</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn">日志</a>
                </div>
            </div>
            <!--删除提示开始-->
            <Dialog title="删除" class="operationTip" :modal="false" :visible.sync="operationTip">
                <div>您确定要删除这些资料吗？删除后将不再恢复。</div>
                <span slot="footer" class="dialog-footer">
                    <Button class="cancelButton" @click="cancel">取消</Button>
                    <Button class="cancelButton" @click="deleteDropdownList">确定</Button>
                </span>
            </Dialog>
            <!--删除提示结束-->
            <!--删除失败提示开始-->
            <Dialog title="删除" class="operationTip" :modal="false" :visible.sync="deleteFalseTip">
                <div>
                    <div class="operationIcon">
                        <i class="iconfont icon-baocuo"></i>
                    </div>
                    <div class="operationMsg">删除失败！当前数据被引用，不允许删除。</div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <Button class="cancelButton" @click="deleteFalseTip = false">确定</Button>
                </span>
            </Dialog>
            <!--删除失败提示结束-->
            <!--新增下拉列表值开始-->
            <Dialog title="新增下拉列表值" class="newDropdownListValue" :visible.sync="newDropdownListValue">
                <Form ref="form" labwidth="98px">
                    <FormItem label="下拉列表值名称">
                        <Input class="adviceNumber" v-model="newDropdownName"></Input>
                    </FormItem>
                    <FormItem label="所属组织">
                        <Select v-model="addOrgId" filterable placeholder="请选择">
                            <el-option
                                v-for="item in addOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" class="selectFontSize">
                            </el-option>
                            <!--<option-group-->
                                <!--v-for="group in addOptions"-->
                                <!--:key="group.label"-->
                                <!--:label="group.label">-->
                                <!--<option-->
                                    <!--v-for="item in group.options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value" class="selectFontSize">-->
                                <!--</option>-->
                            <!--</option-group>-->
                        </Select>
                        <i class="newArrow-country select-icon"></i>
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button class="cancelButton" @click="newDropdownListValue=false">取消</Button>
                    <Button class="cancelButton" @click="addDropdownList">确认</Button>
                </span>
            </Dialog>
            <!--新增下拉列表值结束-->
            <!--修改下拉列表值开始-->
            <Dialog title="修改下拉列表值" class="modifyDropdownListValue" :visible.sync="modifyDropdownListValue">
                <Form ref="form" labwidth="98px">
                    <FormItem label="下拉列表值名称">
                        <Input class="adviceNumber" v-model="modifyDropdownName"></Input>
                    </FormItem>
                    <FormItem label="所属组织">
                        <Select v-model="modifyOrgId" filterable placeholder="请选择">
                            <el-option
                                v-for="item in modifyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" class="selectFontSize">
                            </el-option>
                            <!--<OptionGroup-->
                                <!--v-for="group in modifyOptions"-->
                                <!--:key="group.label"-->
                                <!--:label="group.label">-->
                                <!--<Option-->
                                    <!--v-for="item in group.options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value" class="selectFontSize">-->
                                <!--</Option>-->
                            <!--</OptionGroup>-->
                        </Select>
                        <i class="newArrow-country select-icon"></i>
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button class="cancelButton" @click="modifyDropdownListValue=false">取消</Button>
                    <Button class="cancelButton" @click="modifyDropdownList">确认</Button>
                </span>
            </Dialog>
            <!--修改下拉列表值结束-->
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div id="main">
            <div class="mainContainer clearfix">
                <div class="mainContent mainContent-storeInfo">
                    <div class="vehicle-find">
                        <div class="vehicle-data">
                            <div class="inblock">
                                <span class="hspace">所属组织</span>
                                <i class="star-icon">*</i>
                                <Select v-model="searchOrgId" @change="searchOrgIdChange"  filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in searchOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" class="selectFontSize">
                                    </el-option>
                                    <!--<OptionGroup-->
                                        <!--v-for="group in searchOptions"-->
                                        <!--:key="group.label"-->
                                        <!--:label="group.label">-->
                                        <!--<Option-->
                                            <!--v-for="item in group.options"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value" class="selectFontSize">-->
                                        <!--</Option>-->
                                    <!--</OptionGroup>-->
                                </Select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">款项名称</span>
                                <i class="star-icon">*</i>
                                <Input placeholder="请输入" v-model="itemName"></Input>
                            </div>
                        </div>
                        <div class="vehicle-btn">
                            <Button @click='searchDropdownList'>查询</Button>
                        </div>
                    </div>

                    <div class="dropdownListDetail">
                        <div>
                            <Button class="newButton" @click="order('up')">上移</Button>
                            <Button class="newButton" @click="order('down')">下移</Button>
                        </div>
                        <div class="details-list">
                            <div class="information-list informationR-list">
                                <Table :data="tableData" ref="singleTable" @row-click="rowClick"
                                       @current-change="currentRowChange" border style="width: 100%"
                                       :default-sort="{prop: 'date', order: 'descending'}" highlight-current-row>
                                    <TableColumn prop="num" label="序号" width="70"></TableColumn>
                                    <TableColumn prop="dropdownName" label="值名称" width=""></TableColumn>
                                    <TableColumn prop="orgId" label="所属组织" width=""></TableColumn>
                                    <TableColumn prop="status" label="状态" width=""></TableColumn>
                                </Table>
                                <!--<transition name="fade-in-linear">-->
                                    <!--<div class="quickSelectBar" ref="quickSelectBar" v-show="quickSelectBarShow">-->
                                        <!--<span @click="modifyDropdownListValue=true">修改</span>|-->
                                        <!--<span @click="operationTip=true">删除</span>|-->
                                        <!--<span-->
                                            <!--@click="openOrClose(quickSelectBarStartUseStatus === '启用', currentRow.num - 1)">{{quickSelectBarStartUseStatus}}</span>-->
                                    <!--</div>-->
                                <!--</transition>-->
                                <tooltip name="costorder">
                                    <span @click="modifyJudge">修改</span>|
                                    <span @click="deleteJudge">删除</span>|
                                    <span @click="openOrClose(quickSelectBarStartUseStatus === '启用')">{{quickSelectBarStartUseStatus}}</span>
                                </tooltip>
                            </div>
                            <!--表单  end-->
                        </div>
                    </div>
                    <!--分页    start-->
                    <!--<div class="dropdownPaging">-->
                        <!--<Pagination-->
                            <!--@size-change="handleSizeChange"-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page="currentPage"-->
                            <!--:page-sizes="[30, 50, 100, 150]"-->
                            <!--:page-size="30"-->
                            <!--layout="total, sizes, prev, pager, next, jumper, slot"-->
                            <!--:total="tableData.length">-->
                        <!--</Pagination>-->
                    <!--</div>-->
                    <!--分页    end-->
                </div>
            </div>
        </div>
        <!--主体内容  end-->

    </div>
</template>
<script type="es6">
    import axios from 'axios'
    import serverMixin from '@Crm/mixin/server.js'

    export default {
        mixins: [serverMixin],
        data() {
            return {
                currentRow: null,
                currentItemId: '',
                newDropdownName: '',
                modifyDropdownName: '',
                quickSelectBarShow: false,
                quickSelectBarLockStatus: '',
                quickSelectBarStartUseStatus: '',
                rowClickNum: 0,
                oldId: '',
                addOrgId: 2,
                modifyOrgId: 2,
                searchOrgId: 1,
                reqSearchOrgId: 1,
                itemName: '',
                tableData: [],
                currentPage: 1,//分页
                dialogTableVisible: false,//高级查询弹出
                newDropdownListValue: false,//新增下拉列表值
                modifyDropdownListValue: false,//修改下拉列表值
                operationTip: false,//删除提示
                deleteFalseTip: false,//删除失败提示
                value: '',
                searchOptions: [],
                addOptions: [],
                modifyOptions: []
            }
        },
        methods: {
            addJudge(){//新增验证
                if(!this.currentItemId){
                    this.$message('请选择要添加下拉列表的款项')
                }else {
                    this.newDropdownListValue=true
                }
            },
            deleteJudge(){//删除验证
                if(this.currentRow){
                    console.log(this.currentRow)
                    this.operationTip=true
                }else {
                    this.$message('请选择操作的下拉列表')
                }
            },
            modifyJudge(){//修改验证
                if(this.currentRow){
                    console.log(this.currentRow)
                    if(this.currentRow.orgId === '全局' && this.userOrgId === 2){
                        this.$message('全局下拉列表只能由全局修改')
                        return
                    }
                    this.modifyDropdownListValue = true
                    this.modifyDropdownName = this.currentRow.dropdownName
                }else {
                    this.$message('请选择操作的下拉列表')
                }
            },
            order(upOrDown) {//排序
                if (!this.currentRow) {
                    this.$message('请选择要操作的下拉列表值')
                } else {
                    if (this.currentRow.num === 1 && upOrDown === 'up') {
                        this.$message('下拉列表值已经在第一位')
                    } else if (this.currentRow.num === this.currentRow.maxNum && upOrDown === 'down') {
                        this.$message('下拉列表值已经在最后一位')
                    } else {
                        let idx = this.currentRow.num - 1
                        let url = `${this.urlForward}dropdownList/moveDropdown?orderId=${this.currentRow.orderId}&itemId=${this.currentRow.itemId}&updateUser=10001&moveType=${upOrDown}`
//                        ${this.urlForward}dropdownList/moveDropdown?orderId=28&itemId=41&updateUser=10002&moveType=up
                        axios.post(url, {
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            }
                        })
                            .then((response) => {
                                console.log(response)
                                let data = response.data
                                if (data.result === 1) {
                                    upOrDown === 'up' ? idx-- : idx++
                                    this.searchDropdownList(idx)
                                } else {
                                    this.$message('操作失败！请重试')
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                }
            },
            openOrClose(isOpen) {//启用或停用
                if (isOpen) {//启用
                    if (!this.currentRow) {
                        this.$message('请选择要操作的下拉列表值')
                    } else {
                        let idx = this.currentRow.num - 1
                        let url = `${this.urlForward}dropdownList/setDropdownListStatus/${this.currentRow.id}?status=1&updateUser=10001`
                        axios.get(url, {
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            }
                        })
                            .then((response) => {
                                console.log(response)
                                let data = response.data
                                if (data.result === 1) {
                                    this.$message('启用成功')
                                    this.searchDropdownList(idx)
                                } else {
                                    this.$message('启用失败！请重试')
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })

                    }
                } else {//停用
                    if (!this.currentRow) {
                        this.$message('请选择要操作的下拉列表值')
                    } else {
                        let idx = this.currentRow.num - 1
                        let url = `${this.urlForward}dropdownList/setDropdownListStatus/${this.currentRow.id}?status=2&updateUser=10001`
                        axios.get(url, {
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            }
                        })
                            .then((response) => {
                                console.log(response)
                                let data = response.data
                                if (data.result === 1) {
                                    this.$message('停用成功')
                                    this.searchDropdownList(idx)
                                } else {
                                    this.$message('停用失败！请重试')
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }

                }
            },
            deleteDropdownList() {//删除
                if(this.currentRow.orgId === '全局' && this.userOrgId === 2){
                    this.$message('全局下拉列表只能由全局删除')
                    this.operationTip = false
                    return
                }
                if(this.currentRow.status === '启用'){
                    this.operationTip = false
                    this.deleteFalseTip = true
                }else {
                    let url = `${this.urlForward}dropdownList/delListDropdownListByID/${this.currentRow.id}?updateUser=${10001}`
                    axios.get(url, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then((response) => {
                            console.log(response)
                            let data = response.data
                            if (data.result === 1) {
                                this.operationTip = false
                                this.$message('删除成功')
                                this.searchDropdownList()
                            } else {
                                this.$message('删除失败！请重试')
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            this.$message('删除失败！请重试')
                        })
                }
            },
            modifyDropdownList() {//修改
                if (!this.modifyDropdownName) {
                    this.$message('下拉列表值名称不能为空')
                } else if (!this.modifyOrgId) {
                    this.$message('所属组织不能为空')
                } else {
                    let updateDropdownList = {
                        dropdownName: this.modifyDropdownName,
                        id: this.currentRow.id,
                        orgId: this.modifyOrgId,

                    }
                    let url = `${this.urlForward}dropdownList/updateListDropdownList`
                    axios.post(url, updateDropdownList, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then((response) => {
                            console.log(response)
                            let data = response.data
                            if (data.result === 1) {
                                this.modifyDropdownName = ''
                                this.modifyOrgId = ''
                                this.modifyDropdownListValue = false
                                this.$message('修改成功！')
                                this.searchDropdownList()
                            } else {
                                this.$message('修改失败！请重试')
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            this.$message('网络错误！请重试')
                        })
                }

            },
            addDropdownList() {//添加
                if (!this.newDropdownName) {
                    this.$message('下拉列表值名称不能为空')
                } else if (!this.addOrgId) {
                    this.$message('所属组织不能为空')
                } else {
                    let newDropdownList = {
                        dropdownName: this.newDropdownName,
                        itemId: this.currentItemId,
                        orgId: this.addOrgId,
                    }
                    let url = `${this.urlForward}dropdownList/saveListDropdownList`
                    axios.post(url, newDropdownList, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then((response) => {
                            console.log(response)
                            let data = response.data
                            if (data.result === 1) {
                                this.newDropdownName = ''
                                this.addOrgId = ''
                                this.newDropdownListValue = false
                                this.$message('新增成功！')
                                this.searchDropdownList()
                            } else {
                                this.$message('新增失败！请重试')
                            }

                        })
                        .catch((error) => {
                            console.log(error)
                            this.$message('网络错误！请重试')
                        })
                }

            },
            searchDropdownList(idx) {//查询
//                this.tableData = []
                if (!this.itemName) {
                    this.$message('款项名称不能为空！')
                } else if (!this.searchOrgId) {
                    this.$message('所属组织不能为空！')
                } else {
                    let url = `${this.urlForward}dropdownList/getListDropdownListByItemName?itemName=${this.itemName}&orgId=${this.reqSearchOrgId}`
                    axios.get(url, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then(response => {
                            console.log(response)
                            let data = response.data
                            if (data.status.statusCode === 0) {
                                if (data.result) {
                                    this.currentItemId = data.result.id
                                    if (data.result.dropdownLists.length > 0) {
                                        let dataArr = []
                                        data.result.dropdownLists.forEach((item, index) => {
                                            let dataObj = {}
                                            dataObj.itemId = item.itemId
                                            dataObj.num = index + 1
                                            dataObj.id = item.id
                                            dataObj.orderId = item.orderId
                                            dataObj.maxNum = data.result.dropdownLists.length
                                            dataObj.dropdownName = item.dropdownName
                                            switch (item.orgId) {
                                                case 1:
                                                    dataObj.orgId = '全局'
                                                    break
                                                case 2:
                                                    dataObj.orgId = '集团'
                                            }
                                            switch (item.status) {
                                                case 0:
                                                    dataObj.status = '未启用'
                                                    break
                                                case 1:
                                                    dataObj.status = '启用'
                                                    break
                                                case 2:
                                                    dataObj.status = '停用'
                                            }
                                            dataArr.push(dataObj)
                                        })
                                        this.tableData = dataArr
                                        if (idx === 0 || idx) {
                                            this.$refs.singleTable.setCurrentRow(this.tableData[idx])
                                        }
                                    } else if (data.result.dropdownLists.length === 0) {
                                        this.tableData = []
                                        this.$message('未找到相关下拉列表值')
                                    }
                                } else {
                                    this.tableData = []
                                    this.$message('所属组织下没有当前款项名称！')
                                }
                            } else {
                                this.tableData = []
                                this.$message('未找到！')
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            this.$message({
                                message: '网络错误！请重试',
                                type: 'error'
                            })
                        })
                }
            },
            initialOrg(){//初始化所属组织
                let url = `${this.urlForward}enum/getAllOrg?orgId=${this.userOrgId}`
                //http://192.168.170.201:9015/crm-contract-server/enum/getAllOrg?orgId=2
                axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then(response => {
                        console.log(response)
                        if(response.data.status.statusCode === 0){
                            this.searchOptions = this.dataHandle(response.data.result)
                            this.addOptions = [this.dataHandle(response.data.result)[0]]
                            this.modifyOptions = [this.dataHandle(response.data.result)[0]]
                            console.log(this.addOptions)
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            dataHandle(arr){//数据处理
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
            rowClick(row) {
                this._mutualStatus(row)
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
            },
            _mutualStatus(row) { // 切换状态
                console.log(row)
                if (row.status === '启用') {
                    this.quickSelectBarStartUseStatus = '停用'
                } else {
                    this.quickSelectBarStartUseStatus = '启用'
                }
            },
            searchOrgIdChange(){
                console.log(this.searchOrgId)
                if(this.searchOrgId === 2){
                    this.reqSearchOrgId = '1,2'
                }else if(this.searchOrgId === 1){
                    this.reqSearchOrgId = 1
                }

            },
            currentRowChange(val) {
                console.log(val)
                this.currentRow = val
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            cancel() {
                this.operationTip = false
            },

        },
        mounted() {
            this.initialOrg()
        },
    }
</script>
<style lang="scss">
    .el-message{z-index: 10000 !important;}
    body {
        .dropdownPaging{
            width: 60%;
        }
        .el-form-item{
            .el-form-item__label{
                width: 100px;
            }
        }
        .information-list{
            .v-tooltip {
                display: none;
                position: fixed;
                z-index: 100;
                font-size: 12px;
                height: 16px;
                line-height: 16px;
                border: 1px solid #909c9b;
                border-radius: 5px;
                background: #fff;
                box-shadow: 0 0 15px #959c9f;
                transition: all .3s;
                span {
                    width: 28px;
                    padding: 0 10px;
                    cursor: pointer;
                }
            }
        }
        .dropdownListDetail {
            border-top: 2px solid #eee;
            margin-top: 5px;
            padding-top: 16px;
            .el-button.newButton {
                height: 22px;
                line-height: 22px;
                padding: 0 10px;
                margin: 0 10px 0 0;
                border: 1px solid #8998a9;
            }
            .details-list {
                position: relative;
                margin-top: 10px;
                width: 60%;
                .quickSelectBar {
                    position: absolute;
                    border: 1px solid #909c9b;
                    border-radius: 5px;
                    height: 25px;
                    line-height: 25px;
                    font-size: 12px;
                    width: 160px;
                    background-color: #fff;
                    z-index: 1;
                    span {
                        padding: 0 10px;
                        cursor: pointer;
                    }
                }
            }
        }
        .inblock {
            .star-icon {
                z-index: 1;
                margin-left: 4px;
                margin-top: 8px;
            }
        }
        .select-icon {
            right: 80px;
        }
        .details-list {
            margin-top: 0;
        }
    }

    .newDropdownListValue, .modifyDropdownListValue {
        .newArrow-country {
            right: 80px;
        }
        a {
            font-size: 12px;
            text-decoration: underline;
            color: #4ab0e0;
            margin-left: 10px;
        }
    }

    /*删除提示  start*/
    .operationTip {
        .operationIcon, .operationMsg {
            display: inline-block;
            float: left;
        }
        .iconfont.icon-baocuo {
            color: #ff0000;
            font-size: 30px;
        }
        .operationMsg {
            margin-left: 20px;
            a {
                text-decoration: underline;
                color: #211dbe;
            }
        }
    }

    /*删除提示  end*/
</style>

