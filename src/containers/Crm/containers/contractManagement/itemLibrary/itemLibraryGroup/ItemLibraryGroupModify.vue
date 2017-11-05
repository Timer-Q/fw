<template>
    <div>
        <!--标签功能操作栏  start-->
        <div class="modal-div clearfix">
            <div>
                <!--<p class="return">-->
                <!--<i class="iconfont icon-fanhui"></i>-->
                <!--<a href="javascript:void(0);" class="add-btn" @click="returnLastPage">返回</a>-->
                <!--</p>-->
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="save">保存</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="operationTip=true">取消</a>
                </div>

            </div>
        </div>
        <!--返回提示开始-->
        <Dialog title="操作提示" class="operationTip" :modal="false" :visible.sync="operationTip">
            <div>您的数据未保存，是否返回上一层？</div>
            <span slot="footer" class="dialog-footer">
                <Button class="cancelButton" @click="cancel">取消</Button>
                <Button class="cancelButton" @click="confirm">确定</Button>
            </span>
        </Dialog>
        <!--返回提示结束-->
        <!--标签功能操作栏  end-->

        <!--主体内容  start-->
        <div id="main">
            <div class="mainContainer clearfix">
                <!--右侧新增  start-->
                <div class="newContent">
                    <div class="newContentBox ">
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">款项编码</span>
                                <i class="star-icon">*</i>
                                <Input placeholder="系统自动编码" v-model="itemCode" :disabled="true"></Input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">输入方式</span>
                                <i class="star-icon">*</i>
                                <Select @change="inputModeChange" v-model="inputMode" placeholder="请选择">
                                    <Option
                                        v-for="item in inputModeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </Option>
                                </Select>
                                <i class="newArrow-country"></i>
                                <Checkbox style="display: none" v-show="isShow" v-model="dropdownlistMultiple"
                                          class="l-checkbox">下拉列表值可多选
                                </Checkbox>
                            </div>
                            <Tooltip placement="top">
                                <div slot="content">如：手动输入、选择下拉列表值、选择基础档案。<br>
                                    修改时，已被引用的款项，不允许修改输入类型
                                </div>
                                <Button class="downInputTooltip">?</Button>
                            </Tooltip>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">款项名称</span>
                                <i class="star-icon">*</i>
                                <Input placeholder="请输入内容" v-model="itemName"></Input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">基础档案</span>
                                <!--<Input placeholder="请选择" v-model="refData" :disabled="basicArchives"></Input>-->
                                <el-select v-model="refData" placeholder="请选择" :disabled="basicArchives">
                                    <el-option
                                        v-for="item in refDataOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                                <Checkbox v-model="basicArchivesMultiple" class="l-checkbox" :disabled="basicArchives">
                                    可多选
                                </Checkbox>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">数据类型</span>
                                <i class="star-icon">*</i>
                                <Select @change="dataTypeChange" v-model="dataType" placeholder="请选择内容">
                                    <Option
                                        v-for="item in dataTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </Option>
                                </Select>
                                <i class="newArrow-country"></i>
                            </div>
                            <Tooltip placement="top">
                                <div slot="content">如：文本、数值、金额、日期等。<br>
                                    数据类型为数值时，需设置小数位数。<br>
                                    修改时，已被引用的款项，不允许修改数据类型
                                </div>
                                <Button class="upInputTooltip">?</Button>
                            </Tooltip>
                            <div class="groupL-p">
                                <span class="f_l">必输性</span>
                                <Select v-model="mustInputValue" placeholder="请选择">
                                    <Option
                                        v-for="item in mustInputOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </Option>
                                </Select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">小数位数</span>
                                <Input placeholder="" v-model="decimalPlace" type="number"
                                       min="0" max="9" @change="valChange" :disabled='decimalDigit'></Input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">所属组织</span>
                                <i class="star-icon">*</i>
                                <Input placeholder="" v-model="SubordinateOrganizeValue" :disabled="true"></Input>
                            </div>
                        </div>

                    </div>
                    <div class="l-note">
                        <span class="l-notetext">备注</span>
                        <div class="l-textarea">
                            <Input
                                type="textarea"
                                :rows="5"
                                placeholder=""
                                v-model="comment">
                            </Input>
                        </div>
                    </div>
                    <div class="dropdownListValue" v-show="isShow">
                        <div class="newContentHead">下拉列表值</div>
                        <div>
                            <Button class="newButton" @click="upOrDown(true)">上移</Button>
                            <Button class="newButton" @click="upOrDown(false)">下移</Button>
                        </div>
                        <div class="details-list">
                            <div class="information-list informationR-list">
                                <Table :data="tableData" border style="width: 100%" ref="dropdownList"
                                       :default-sort="{prop: 'date', order: 'descending'}"
                                       highlight-current-row @current-change="handleCurrentChange">
                                    <TableColumn prop="num" label="序号" width="55"></TableColumn>
                                    <TableColumn label="值名称" class-name="noPaddingCol">
                                        <template slot-scope="scope">
                                            <Input placeholder="请输入" v-model="scope.row.dropdownName"></Input>
                                        </template>
                                    </TableColumn>
                                    <TableColumn label="状态">
                                        <template slot-scope="scope">
                                            <Checkbox v-model="scope.row.status">启用</Checkbox>
                                        </template>
                                    </TableColumn>
                                    <TableColumn label="操作">
                                        <template slot-scope="scope">
                                            <Button v-show="scope.row.isShow"
                                                    @click="addOrDelete(scope.row.num, scope.row)" class="addOrDelete"
                                                    :class="{'el-icon-plus': scope.row.iconPlus,
                                                       'el-icon-minus': !scope.row.iconPlus}"></Button>
                                        </template>
                                    </TableColumn>
                                </Table>
                            </div>
                            <!--表单  end-->
                        </div>
                    </div>
                </div>
                <!--右侧新增  end-->
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
        props: {
            currentRowP: {
                type: Object,
                require: true
            },
            removeTab: {
                type: Function,
                require: true
            }
        },
        data() {
            return {
                dropdownlistMultiple: false,
                basicArchivesMultiple: false,
                itemName: '',
                orgId: '',
                itemId: '',
                currentRow: null,
                isShow: false,
                checked: false,
                valueName: '',
                tableData: [
                    {
                        num: 1,
                        dropdownName: '',
                        status: true,
                        iconPlus: true,
                        isShow: true
                    },
                ],
                itemCode: '系统自动编码',//款项编码的值
                inputMode: '',//输入方式的值
                itemName: '',//款项名称的值
                refData: '',//基础档案的值
                basicArchives: true,//基础档案输入框是否禁止输入
                dataType: '',//数据类型的值
                mustInputValue: '',//必输性的值
                decimalPlace: '',//小数位数的值
                decimalDigit: true,//小数位数输入框是否禁止输入
                SubordinateOrganizeValue: '',//所属组织的值
                comment: '',
                operationTip: false,//返回提示
                refDataOptions: [],//基础档案的选项
                dataTypeOptions: [],//数据类型的选项
                mustInputOptions: [],//必输性的选项
                inputModeOptions: [],//输入方式的选项
                value: ''
            }
        },
        methods: {
            valChange(){//小数位值改变
                if(this.decimalPlace > 9 || this.decimalPlace < 0 || this.decimalPlace.length > 1){
                    this.decimalPlace = ''
                    this.$message('小数位数值必须在0-9之间')
                }
            },
            save() {//点击保存修改一条合同款项信息
                if (this.itemName === '') {
                    this.$message('请输入款项名称')
                } else if (this.inputMode === 3 && this.refData === '') {
                    this.$message('请选择基础档案')
                } else {
                    this.request()
                }
            },
            request() {//整理数据发送请求
                console.log(this.itemId, 'itemId')
                if (this.inputMode === 2) {
                    var updateDTOList = []
                    var insertDTOList = []
                    this.tableData.forEach((tableDataItem, index) => {
                        if (tableDataItem.isShow) {//新增
                            let newList = {}
                            newList.dropdownName = tableDataItem.dropdownName
                            newList.orgId = this.SubordinateOrganizeValue === '全局级' ? 1 : 2
                            newList.itemId = this.itemId
                            newList.status = tableDataItem.status ? 1 : 2
                            newList.createUser = 10001
                            insertDTOList.push(newList)
                        } else {//修改
                            this.saveDataArr.forEach((saveDataItem) => {
                                if (tableDataItem.flag === saveDataItem.flag) {
                                    if (tableDataItem.dropdownName !== saveDataItem.dropdownName || tableDataItem.status !== saveDataItem.status || tableDataItem.orderId !== saveDataItem.orderId) {
                                        let updateList = {}
                                        updateList.dropdownName = tableDataItem.dropdownName
                                        updateList.status = tableDataItem.status ? 1 : 2
                                        updateList.orderId = tableDataItem.orderId
                                        updateList.id = tableDataItem.id
                                        updateList.updateUser = 10001
                                        updateDTOList.push(updateList)
                                    }
                                }
                            })

                        }
                    })
                }
                let multiple = null
                if (this.inputMode === 2) {
                    multiple = this.dropdownlistMultiple ? 1 : 0
                } else if (this.inputMode === 3) {
                    multiple = this.basicArchivesMultiple ? 1 : 0
                }
                console.log(updateDTOList, insertDTOList)
                let modifyItemMessage = {
//              1.ItemName，2.ItemCode，3.DataType，4.InputMode，5.RefData，6.OrgId
                    itemName: this.itemName,
                    itemCode: this.itemCode,
                    dataType: this.dataType === '文本' ? 2 : this.dataType,
                    inputMode: this.inputMode === '手工输入' ? 1 : this.inputMode,
                    refData: this.refData,
                    orgId: this.SubordinateOrganizeValue === '全局级' ? 1 : 2,
                    comment: this.comment,
                    decimalPlace: this.decimalPlace,
                    multiple: multiple,
                    id: this.itemId,
                    insertDTOList,
                    updateDTOList
                }
                console.log(modifyItemMessage)
                let url = `${this.urlForward}items/updateContractItemLibrary`
                axios.post(url, modifyItemMessage, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then( (response) => {
                        console.log(response)
                        let data = response.data
                        if (data.result === 1) {
                            this.$message('修改成功！')
                            setTimeout(() => {
                                this.removeTab('crm_itemLibraryGroupMain_itemLibraryGroupModify')
                            }, 3000)
                        }else {
                            this.$message(data.status.statusReason)
                        }
                    })
                    .catch( (error) => {
                        console.log(error)
                    })
            },
            upOrDown(isup) {
                if(!this.currentRow){
                    this.$message('请选择操作的下拉列表')
                    return
                }
                if (this.currentRow && (this.currentRow.orderId === 0 || this.currentRow.orderId)) {
                    let idx = this.currentRow.num - 1
                    if(this.currentRow.num === 1 && isup){
                        this.$message('当前下拉列表已在第一位')
                    }
                    if(this.currentRow.num === this.currentRow.maxNum && !isup){
                        this.$message('当前下拉列表已在最后一位')
                    }
                    if (isup && this.currentRow.num !== 1) {//上移
                        let connect = this.tableData.slice(idx - 1, idx + 1)
                        let flag1 = connect[1].num
                        connect[1].num = connect[0].num
                        connect[0].num = flag1
                        let flag2 = connect[1].orderId
                        connect[1].orderId = connect[0].orderId
                        connect[0].orderId = flag2
                        this.tableData.splice(idx - 1, 2, connect[1], connect[0])
                        this.$refs.dropdownList.setCurrentRow(this.tableData[idx - 1])
                        console.log(this.currentRow)
                    }
                    if (!isup && this.currentRow.num !== this.currentRow.maxNum) {//下移
                        let connect = this.tableData.slice(idx, idx + 2)
                        let flag1 = connect[1].num
                        connect[1].num = connect[0].num
                        connect[0].num = flag1
                        let flag2 = connect[1].orderId
                        connect[1].orderId = connect[0].orderId
                        connect[0].orderId = flag2
                        this.tableData.splice(idx, 2, connect[1], connect[0])
                        this.$refs.dropdownList.setCurrentRow(this.tableData[idx + 1])
                        console.log(this.currentRow)
                    }
                }else{

                }

            },
            handleCurrentChange(val) {
                this.currentRow = val
                console.log(this.currentRow)
            },
            addOrDelete(num, row) {
                if (num === this.tableData.length) {//新增一行
                    this.tableData.push({
                        num: num + 1,
                        dropdownName: '',
                        status: true,
                        iconPlus: true,
                        isShow: true
                    })
                    this.tableData[num - 1].iconPlus = false
                } else {//删除当前行
                    this.tableData.splice(num - 1, 1)
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i].num = i + 1
                    }
                }
                this.$refs.dropdownList.setCurrentRow()
            },
            inputModeChange(newValue) {
                if (newValue === 3) {
                    this.basicArchives = false
                } else {
                    this.basicArchives = true
                }
                if (newValue === 2) {
                    let url = `${this.urlForward}dropdownList/getListDropdownListByItemName?itemName=${this.currentRowP.itemName}&orgId=${this.currentRowP.orgId}`
                    console.log(url, 'url')
                    axios.get(url, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then((response) => {
                            console.log(response)
                            let data = response.data
                            if (data.result.dropdownLists.length > 0) {
                                this.dataArr = []
                                this.saveDataArr = []
                                data.result.dropdownLists.forEach((item, index) => {
                                    let dataObj = {}
                                    let saveDataObj = {}
                                    saveDataObj.num = dataObj.num = index + 1
                                    saveDataObj.flag = dataObj.flag = index + 1
                                    saveDataObj.id = dataObj.id = item.id
                                    saveDataObj.orderId = dataObj.orderId = item.orderId
                                    saveDataObj.maxNum = dataObj.maxNum = data.result.dropdownLists.length
                                    saveDataObj.dropdownName = dataObj.dropdownName = item.dropdownName
                                    saveDataObj.status = dataObj.status = item.status === 1 ? true : false
                                    saveDataObj.iconPlus = dataObj.iconPlus = false
                                    this.dataArr.push(dataObj)
                                    this.saveDataArr.push(saveDataObj)
                                })
                                this.tableData[0].num = data.result.dropdownLists.length + 1
                                this.tableData = this.dataArr.concat(this.tableData)
                                console.log(this.tableData)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            dataTypeChange(newValue) {
                if (newValue === 1) {
                    this.decimalDigit = false
                } else {
                    this.decimalDigit = true
                }
            },
            cancel() {
                this.operationTip = false
            },
            confirm() {
                this.operationTip = false
                setTimeout(() => {
                    this.removeTab('crm_itemLibraryGroupMain_itemLibraryGroupModify')
                }, 300)
            },
//            returnLastPage(){
//                this.operationTip=true
//            },
            initializeReq(portName){//input枚举值初始化请求
                axios.get(`${this.urlForward}enum/${portName}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then(response => {
//                        console.log(response)
                        if(response.data.status.statusCode === 0){
                            switch (portName) {
                                case 'getBaseDataEnum':
                                    this.refDataOptions = this.dataHandle(response.data.result)
                                    break
                                case 'getDataTypeList':
                                    this.dataTypeOptions = this.dataHandle(response.data.result)
                                    break
                                case 'getInputItemDataEnum':
                                    this.inputModeOptions = this.dataHandle(response.data.result)
                                    break
                                case 'getNecessaryDataEnum':
                                    this.mustInputOptions = this.dataHandle(response.data.result)
                                    break
                                case `getCurrentOrg/${this.currentRowP.orgId}`:
                                    console.log(response, 'getCurrentOrg')
                                    this.SubordinateOrganizeValue = response.data.result.orgName
                                    this.itemModifyInitial(this.currentRowP.id)
                            }
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
                        label: item.name
                    }
                    dataArr.push(obj)
                })
                return dataArr
            },
            itemModifyInitial(portName){//款项修改初始化请求
                axios.get(`${this.urlForward}items/getContractItemLibraryByID/${portName}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then(response => {
                        console.log(response, 11111111111)
                        if(response.data.status.statusCode === 0){
                            this.itemCode = response.data.result.itemCode
                            this.itemName = response.data.result.itemName
                            this.decimalPlace = response.data.result.decimalPlace
                            this.comment = response.data.result.comment
                            this.dataType = response.data.result.dataType
                            this.inputMode = response.data.result.inputMode
                            this.mustInputValue = response.data.result.necessaryMode
                            if (response.data.result.inputMode === 2) {
                                this.dropdownlistMultiple = response.data.result.multiple === 1
                            } else if (response.data.result.inputMode === 3) {
                                this.basicArchivesMultiple = response.data.result.multiple === 1
                            }
                            this.refData = response.data.result.refData

                        }else{
                            this.$message(response.data.status.statusReason)
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
//            console.log(this.currentRowP, '11111')
//            this.itemName = this.currentRowP.itemName
//            this.orgId = this.currentRowP.orgId
            this.itemId = this.currentRowP.id
            this.initializeReq('getBaseDataEnum')
            this.initializeReq('getDataTypeList')
            this.initializeReq('getInputItemDataEnum')
            this.initializeReq('getNecessaryDataEnum')
            this.initializeReq(`getCurrentOrg/${this.currentRowP.orgId}`)
        }
    }
</script>

<style lang="scss">
    .el-message{z-index: 10000 !important;}
    .newContent {
        margin: 0;
        padding: 0 16px;
        .l-note {
            margin: 20px 0 20px 26px;
            .l-textarea {
                margin-left: 42px;
                margin-top: -16px;
                width: 89%;
            }
        }
        .newContentBox {
            .Select {
                left: 0;
            }
            .groupL .void {
                padding-bottom: 0;
                padding-top: 44px;
            }
            .newArrow-country {
                position: absolute;
                right: 20px;
                top: 12px;
            }
            .groupL {
                width: 306px;
                margin-right: 20px;
                /*第二行输入框右边的提示文本*/
                .downInputTooltip {
                    width: 18px;
                    padding: 0;
                    height: 18px;
                    border-radius: 100%;
                    line-height: 18px;
                    position: absolute;
                    right: -22px;
                    top: 44px;
                }
                /*第一行输入框右边的提示文本*/
                .upInputTooltip {
                    width: 18px;
                    padding: 0;
                    height: 18px;
                    border-radius: 100%;
                    line-height: 18px;
                    position: absolute;
                    right: -22px;
                    top: 5px;
                }
                input {
                    padding-left: 16px;
                }
            }
            .groupL-p > span {
                width: 48px;
            }
            .groupL-p {
                position: relative;
                .l-checkbox {
                    position: absolute;
                    left: 67px;
                    top: 28px;
                }
            }
            .star-icon {
                position: absolute;
                z-index: 1;
                margin-top: 3px;
                margin-left: 5px;
            }
        }
        .dropdownListValue {
            border-top: 2px solid #eee;
            margin-top: 5px;
            padding-top: 16px;
            .newContentHead {
                text-align: left;
                color: #28a7e1;
                margin-bottom: 16px;
            }
            .el-button.newButton {
                height: 22px;
                line-height: 22px;
                padding: 0 10px;
                margin: 0 10px 0 0;
                border: 1px solid #8998a9;
            }
            .details-list {
                .addOrDelete {
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    padding: 0;
                    line-height: 20px;
                }
                margin-top: 10px;
                width: 60%;
            }
        }
    }

</style>

