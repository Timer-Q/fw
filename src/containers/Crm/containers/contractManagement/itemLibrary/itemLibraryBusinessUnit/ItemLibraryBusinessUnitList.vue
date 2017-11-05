<template>
    <div>
        <!--标签功能操作栏  start-->
        <div class="modal-div clearfix">
            <div>
                <div class="btnGroup btnGroup1">
                    <router-link to="/moneyPoolOverall/newOverallFunds">新增</router-link>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="modifyItem(currentRow)">修改</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="operationTip=true">删除</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="changeUseStatus(true)">启用</a>
                    <i>|</i>
                    <a href="javascript:;" class="add-btn" @click="changeUseStatus(false)">停用</a>
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
                    <el-button class="cancelButton" @click="deleteRow(oldId)">确定</el-button>
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
                            <div class="inblock">
                                <span class="hspace">所属组织</span>
                                <el-select v-model="organisation" filterable placeholder="请选择">
                                    <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value" class="selectFontSize">-->
                                    <!--</el-option>-->
                                    <el-option-group
                                        v-for="group in options"
                                        :key="group.label"
                                        :label="group.label">
                                        <el-option
                                            v-for="item in group.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value" class="selectFontSize">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <div class="inblock">
                                <span class="hspace">款项编码</span>
                                <el-input placeholder="请输入" v-model="itemCode"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">款项名称</span>
                                <el-input placeholder="请输入" v-model="itemName"></el-input>
                            </div>
                            <div class="inblock">
                                <span class="hspace">创建人</span>
                                <el-input placeholder="请输入" v-model="createUser"></el-input>
                            </div>
                            <div class="inblock">
                                <div class="block">
                                    <span class="hspace">创建时间</span>
                                    <el-date-picker
                                        class="l-timeSelect"
                                        v-model="startTime"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions0">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="inblock">
                                <div class="block">
                                    <span>-</span>
                                    <el-date-picker
                                        class="l-timeSelect"
                                        v-model="endTime"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions1">
                                    </el-date-picker>
                                </div>
                            </div>

                        </div>

                        <div class="vehicle-btn">
                            <el-button @click="search">查询</el-button>
                            <a href="javascript:;" @click="dialogTableVisible = true">高级查询</a>
                            <a href="javascript:;" class="l-clear" @click="clearSearch">清空</a>

                        </div>
                    </div>
                    <!--表单  start-->
                    <div class="information-list">
                        <el-table :data="tableData" @row-click="rowClick" @current-change="currentRowChange" highlight-current-row border style="width: 100%" highlight-current-row :default-sort = "{prop: 'date', order: 'descending'}" >
                            <el-table-column prop="num" label="序号" width="50"></el-table-column>
                            <el-table-column prop="itemCode" label="款项编码"></el-table-column>
                            <el-table-column prop="itemName" label="款项名称"></el-table-column>
                            <el-table-column prop="dataType" label="数据类型"  width=""></el-table-column>
                            <el-table-column prop="decimalPlace" label="小数位数"  width=""></el-table-column>
                            <el-table-column prop="inputMode" label="输入方式"  width=""></el-table-column>
                            <el-table-column prop="multiple" label="可多选"  width="60"></el-table-column>
                            <el-table-column prop="status" label="状态"  width="60"></el-table-column>
                            <el-table-column prop="org" label="所属组织" width=""></el-table-column>
                            <el-table-column prop="globalPreset" label="平台预置" width=""></el-table-column>
                            <el-table-column prop="comment" label="备注" width=""></el-table-column>
                            <el-table-column prop="createUser" label="创建人" width=""></el-table-column>
                            <el-table-column prop="createTime" label="创建时间" width="130"></el-table-column>
                            <el-table-column prop="updateUser" label="最后修改人" width=""></el-table-column>
                            <el-table-column prop="updateTime" label="最后修改时间" width="130"></el-table-column>
                        </el-table>
                        <transition name="el-fade-in-linear">
                            <div class="quickSelectBar" ref="quickSelectBar" v-show="quickSelectBarShow">
                                <span @click="modifyItem(currentRow)">修改</span>|
                                <span @click="operationTip=true">删除</span>|
                                <span @click="changeUseStatus(quickSelectBarStartUseStatus === '启用')">{{quickSelectBarStartUseStatus}}</span>
                            </div>
                        </transition>
                    </div>
                    <!--表单  end-->
                    <!--分页    start-->
                    <div class="paging">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[30, 50, 100, 150]"
                            :page-size="30"
                            layout="total, sizes, prev, pager, next, jumper, slot"
                            :total="400">
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
                    <el-input v-model="input" placeholder="综合方案" :disabled="false"></el-input>
                    <el-button :disabled="false">保存查询方案</el-button>
                    <a href="javascript:;" class="clear">清空</a>
                </div>
                <div>
                    <el-table :data="gridData" border>
                        <el-table-column property="index" label="序号" width="60"></el-table-column>
                        <el-table-column property="conditionName" label="条件名称" width="100"></el-table-column>
                        <el-table-column property="relationCharacter" class-name="noPaddingCol"  label="关系符" width="100">
                            <template scope="scope">
                                <el-select v-model="value" placeholder="请选择">
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
    export default {
        data () {
            return {
                advancedQueryOptions: [{
                    value: 0,
                    label: '等于'
                }, {
                    value: 1,
                    label: '介于'
                }],
                currentRow: '',
                options: [{
                    label: '所属组织A',
                    options: [{
                        value: 11000001,
                        label: 'a1'
                    }, {
                        value: 11000002,
                        label: 'a2'
                    }]
                }, {
                    label: '所属组织B',
                    options: [{
                        value: 12000001,
                        label: 'b1'
                    }, {
                        value: 12000002,
                        label: 'b2'
                    }, {
                        value: 12000003,
                        label: 'b3'
                    }, {
                        value: 12000004,
                        label: 'b4'
                    }]
                }],
                quickSelectBarShow: false,
                quickSelectBarLockStatus: '',
                quickSelectBarStartUseStatus: '',
                oldId: '',
                value: '',
                rowClickNum: 0,
                pickerOptions0: {
                    disabledDate(time) {
//                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions1: {
                    disabledDate(time) {
//                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                organisation: '',//所属组织
                itemCode: '',//款项编码
                itemName: '',//款项名称
                createUser: '',//创建人
                startTime: '',//创建时间开始
                endTime: '',//创建时间结束
                input1:'',
                input:'',
                tableData:[],
                /*分页*/
                currentPage4: 4,
                dialogTableVisible:false,//高级查询弹出
                operationTip:false,//删除提示
                gridData: [{
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue:'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue:'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue:'FEDSDFHDSKJ14uo4ui'
                }, {
                    index: '1',
                    conditionName: '单据编码',
                    relationCharacter: '等于',
                    conditionValue:'FEDSDFHDSKJ14uo4ui'
                }],
            }
        },
        methods: {
            search(){//点击查询发送ajax请求
                let queryCondition = {
                    orgId : this.organisation,
                    itemCode: this.itemCode,
                    itemName: this.itemName,
                    createUser: this.createUser,
                    startTime: new Date(this.startTime).getTime(),
                    endTime: new Date(this.endTime).getTime()
                }
                let url = `http://10.12.31.54:8412/crm-web/items/getContractItemLibraryByCondition`
                this.$http.post(url, queryCondition, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then( response => {
                        console.log(response)
                        let data = response.data
                        if(data.status.statusCode === 0){
                            let dataArr = []
                            data.result.forEach((item, index) => {
                                let dataObj = {}
                                dataObj.itemCode = item.itemCode
                                dataObj.itemName = item.itemName
                                dataObj.decimalPlace = item.decimalPlace
                                switch (item.inputMode){
                                    case 1:
                                        dataObj.inputMode = '输入'
                                        break
                                    case 2:
                                        dataObj.inputMode = '下拉列表值'
                                        break
                                    case 3:
                                        dataObj.inputMode = '基础档案'
                                }
                                switch (item.multiple){
                                    case 0:
                                        dataObj.multiple = ''
                                        break
                                    case 1:
                                        dataObj.multiple = '√'
                                        break
                                    case null:
                                        dataObj.multiple = ''
                                }
                                switch (item.status){
                                    case 0:
                                        dataObj.status = '未启用'
                                        break
                                    case 1:
                                        dataObj.status = '启用'
                                        break
                                    case 2:
                                        dataObj.status = '停用'
                                }
                                dataObj.org = (item.orgId === 11000001) ? '全局' : '集团'
                                dataObj.orgId = item.orgId
                                switch (item.globalPreset){
                                    case 0:
                                        dataObj.globalPreset = ''
                                        break
                                    case 1:
                                        dataObj.globalPreset = '√'
                                        break
                                    case 2:
                                        dataObj.globalPreset = ''
                                }
                                dataObj.comment = item.comment
                                dataObj.createUser = item.createUser
                                dataObj.updateUser = item.updateUser
                                dataObj.createTime = this.getLocalTime(item.createTime)
                                dataObj.updateTime = this.getLocalTime(item.updateTime)
                                dataObj.num = index + 1
                                dataObj.id = item.id
                                switch (item.dataType){
                                    case 1:
                                        dataObj.dataType = '数值'
                                        break
                                    case 2:
                                        dataObj.dataType = '文本'
                                        break
                                    case 3:
                                        dataObj.dataType = '货币金额'
                                        break
                                    case 4:
                                        dataObj.dataType = '百分比'
                                        break
                                    case 5:
                                        dataObj.dataType = '日期'
                                        break
                                    case 6:
                                        dataObj.dataType = '日期时间'
                                        break
                                    case 7:
                                        dataObj.dataType = '布尔'
                                }
                                dataArr.push(dataObj)

                            })
                            if(dataArr.length === 0){
                                alert('未找到相关款项！')
                            }else {
                                this.tableData = dataArr
                            }
                        }else {
                            alert(data.status.statusReason)
                        }

                    })
                    .catch( error => {
                        console.log(error)
                    })

            },
            clearSearch(){
                this.organisation = ''
                this.itemCode = ''
                this.itemName = ''
                this.createUser = ''
                this.startTime = ''
                this.endTime = ''
            },
            modifyItem(currentRow){//修改
                if(currentRow){
                    this.$emit('getTarget', currentRow)
                    this.$router.push({path: '/moneyPoolOverall/modifyOverallFunds'})
                }else {
                    alert('请选择要修改的款项')
                }
            },
            changeUseStatus(isUse){//启停用
                if(!this.currentRow){
                    alert('请选择要操作的款项')
                    return
                }
                let status = isUse ? 1 : 2
                let url = `http://10.12.31.54:8412/crm-web/items/setItemLibraryStatus/${this.currentRow.id}?status=${status}&updateUser=${10001}`
                this.$http.get(url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then( response => {
                        console.log(response)
                        let data = response.data
                        if(data.result === 1){
                            isUse ? alert('启用成功') : alert('停用成功')
                            this.search()
                        }else {
                            alert(data.status.statusReason)
                        }
                    })
                    .catch( error => {
                        console.log(error)
                    })

            },
            deleteRow(currentRowId){
                this.operationTip = false
                console.log(currentRowId)
                let url = `http://10.12.31.54:8412/crm-web/items/delContractItemLibraryByID/${currentRowId}`
                this.$http.get(url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then( response => {
                        console.log(response)
                        if(response.data.status.statusCode === 0){
                            alert('删除成功！')
                            this.search()
                        }else {
                            alert('删除失败！')
                        }
                    })
                    .catch( error => {
                        console.log(error)
                    })

            },
            rowClick(row, event, column) {
                // 判断是否是第一次点击, 判断两次点击是否是同一个row
                if (this.oldId && row.id !== this.oldId) {
                    this.rowClickNum = 0
                    this.rowClickNum++
                } else {
                    this.rowClickNum++
                }
                // 判断两次是否点击的是同一个row，是否是第二次点击
                if (row.id === this.oldId && this.rowClickNum % 2 === 0) {
                    this.quickSelectBarShow = false
                    return
                }

                this.oldId = row.id
                this._mutualStatus(row)
                this.$refs.quickSelectBar.style.top = `${event.clientY - 196}px`
                this.$refs.quickSelectBar.style.left = `${event.clientX - 16}px`
                this.quickSelectBarShow = true
            },
            _mutualStatus(row) { // 切换状态
                if (row.startUseStatus === '启用') {
                    this.quickSelectBarStartUseStatus = '停用'
                } else {
                    this.quickSelectBarStartUseStatus = '启用'
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            currentRowChange(val) {
                this.currentRow = val
            },
            cancel(){
                this.operationTip=false
            },
            getLocalTime(da) {
                da = new Date(da)
                let year = da.getFullYear()
                let month = da.getMonth()+1
                let date = da.getDate()
                let hour = da.getHours()
                let minute = da.getMinutes()
                let second = da.getSeconds()
                month = (month < 10 ? ('0' + month) : month)
                date = (date < 10 ? ('0' + date) : date)
                hour = (hour < 10 ? ('0' + hour) : hour)
                minute = (minute < 10 ? ('0' + minute) : minute)
                second = (second < 10 ? ('0' + second) : second)
                return [[year,month,date].join('-'), [hour,minute,second].join(':')].join(' ')
            }
        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">

    body{
        .information-list{
            position: relative;
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
        .newArrow-country{
            position: absolute;
            top: 12px;
        }
        .l-clear{
            color: black;
            margin-left: 10px;
        }
        .l-timeSelect{
            width: 100px;
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

</style>

