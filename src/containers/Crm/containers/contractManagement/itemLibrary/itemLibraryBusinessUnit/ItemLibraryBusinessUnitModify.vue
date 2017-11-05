<template>
    <div>
        <!--标签功能操作栏  start-->
        <div class="modal-div clearfix">
            <div>
                <p class="return">
                    <i class="iconfont icon-fanhui"></i>
                    <a href="javascript:void(0);" class="add-btn" @click="returnLastPage">返回</a>
                </p>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn" @click="save">保存</a>
                </div>
                <div class="btnGroup btnGroup1">
                    <a href="javascript:;" class="add-btn">取消</a>
                </div>

            </div>
        </div>
        <!--返回提示开始-->
        <el-dialog title="操作提示" class="operationTip" :modal="false" :visible.sync="operationTip" >
            <div>您的数据未保存，是否返回上一层？</div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancelButton" @click="cancel">取消</el-button>
                <el-button class="cancelButton" @click="confirm">确定</el-button>
            </span>
        </el-dialog>
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
                                <el-input placeholder="系统自动编码" v-model="paymentCodeValue" :disabled="true"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">输入方式</span>
                                <i class="star-icon">*</i>
                                <el-select @change="inputModeChange" v-model="inputModeValue" placeholder="请选择">
                                    <el-option
                                        v-for="item in inputModeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                                <el-checkbox style="display: none" v-show="isShow" v-model="dropdownlistMultiple" class="l-checkbox">下拉列表值可多选</el-checkbox>
                            </div>
                            <el-tooltip placement="top">
                                <div slot="content">如：手动输入、选择下拉列表值、选择基础档案。<br>
                                    修改时，已被引用的款项，不允许修改输入类型</div>
                                <el-button class="downInputTooltip">?</el-button>
                            </el-tooltip>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">款项名称</span>
                                <i class="star-icon">*</i>
                                <el-input placeholder="请输入内容" v-model="fundNameValue"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">基础档案</span>
                                <el-input placeholder="请选择" v-model="basicArchivesValue" :disabled="basicArchives"></el-input>
                                <el-checkbox v-model="basicArchivesMultiple" class="l-checkbox" :disabled="basicArchives">可多选</el-checkbox>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">数据类型</span>
                                <i class="star-icon">*</i>
                                <el-select @change="dataTypeValueChange" v-model="dataTypeValue" placeholder="请选择内容">
                                    <el-option
                                        v-for="item in dataTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <el-tooltip placement="top">
                                <div slot="content">如：文本、数值、金额、日期等。<br>
                                    数据类型为数值时，需设置小数位数。<br>
                                    修改时，已被引用的款项，不允许修改数据类型</div>
                                <el-button class="upInputTooltip">?</el-button>
                            </el-tooltip>
                            <div class="groupL-p">
                                <span class="f_l">必输性</span>
                                <el-select v-model="mustInputValue" placeholder="非必输">
                                    <el-option
                                        v-for="item in mustInputOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">小数位数</span>
                                <el-input placeholder="" v-model="decimalDigitValue" :disabled='decimalDigit'></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">所属组织</span>
                                <i class="star-icon">*</i>
                                <el-input placeholder="" v-model="SubordinateOrganizeValue" :disabled="true"></el-input>
                            </div>
                        </div>

                    </div>
                    <div class="l-note">
                        <span class="l-notetext">备注</span>
                        <div class="l-textarea">
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder=""
                                v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="dropdownListValue" v-show="isShow">
                        <div class="newContentHead">下拉列表值</div>
                        <div>
                            <el-button class="newButton" @click="upOrDown(true, currentRow.num - 1)">上移</el-button>
                            <el-button class="newButton" @click="upOrDown(false, currentRow.num - 1)">下移</el-button>
                        </div>
                        <div class="details-list">
                            <div class="information-list informationR-list">
                                <el-table :data="tableData" border style="width: 100%" ref="dropdownList"
                                          :default-sort = "{prop: 'date', order: 'descending'}"
                                          highlight-current-row @current-change="handleCurrentChange">
                                    <el-table-column prop="num" label="序号" width="55"></el-table-column>
                                    <el-table-column label="值名称">
                                        <template scope="scope">
                                            <input placeholder="请输入" v-model="scope.row.dropdownName">
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态">
                                        <template scope="scope">
                                            <el-checkbox v-model="scope.row.status">启用</el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button v-show="scope.row.isShow" @click="addOrDelete(scope.row.num, scope.row)" class="addOrDelete"
                                                       :class="{'el-icon-plus': scope.row.iconPlus,
                                                       'el-icon-minus': !scope.row.iconPlus}"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
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
    export default {
        props: {
            currentRowP: {
                type: Object,
                require: true
            }
        },
        data () {
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
                tableData:[
                    {
                        num: 1,
                        dropdownName: '',
                        status: true,
                        iconPlus: true,
                        isShow: true
                    },
                ],
                paymentCodeValue:'系统自动编码',//款项编码的值
                inputModeValue: '手工输入',//输入方式的值
                fundNameValue:'',//款项名称的值
                basicArchivesValue: '',//基础档案的值
                basicArchives: true,//基础档案输入框是否禁止输入
                dataTypeValue: '',//数据类型的值
                mustInputValue: '',//必输性的值
                decimalDigitValue: 0,//小数位数的值
                decimalDigit: true,//小数位数输入框是否禁止输入
                SubordinateOrganizeValue: 11000001,//所属组织的值
                textarea:'',
                operationTip:false,//返回提示
                dataTypeOptions:[{//数据类型的选项
                    value:1,
                    label:'数值'
                },{
                    value:2,
                    label:'文本'
                },{
                    value:3,
                    label:'货币金额'
                },{
                    value:4,
                    label:'百分比'
                },{
                    value:5,
                    label:'日期'
                },{
                    value:6,
                    label:'日期时间'
                },{
                    value:7,
                    label:'布尔'
                }],
                mustInputOptions:[{//必输性的选项
                    value: 0,
                    label: '非必输'
                },{
                    value: 1,
                    label: '保存时必输'
                }],
                inputModeOptions:[{//输入方式的选项
                    value: 1,
                    label: '手工输入'
                },{
                    value:2,
                    label:'选择下拉列表值'
                },{
                    value:3,
                    label:'选择基础档案'
                }],
                value:''
            }

        },
        methods: {
            save(){//点击保存修改一条合同款项信息
                if(this.fundNameValue === ''){
                    alert('请输入款项名称')
                }else if(this.inputModeValue === 3 && this.basicArchivesValue === ''){
                    alert('请输入基础档案')
                }else {
                    this.request()
                }
            },
            request(){//整理数据发送请求
                console.log(this.itemId, 'itemId')
                if(this.inputModeValue === 2){
                    let updateDTOList = []
                    let insertDTOList = []
                    this.tableData.forEach( (tableDataItem, index) => {
                        if(tableDataItem.isShow){//新增
                            let newList = {}
                            newList.dropdownName = tableDataItem.dropdownName
                            newList.orgId = this.SubordinateOrganizeValue
                            newList.itemId = this.itemId
                            newList.status = tableDataItem.status?1:2
                            newList.createUser = 10001
                            insertDTOList.push(newList)
                        }else {//修改
                            this.saveDataArr.forEach( (saveDataItem) => {
                                if(tableDataItem.flag === saveDataItem.flag){
                                    if(tableDataItem.dropdownName !== saveDataItem.dropdownName || tableDataItem.status !== saveDataItem.status || tableDataItem.orderId !== saveDataItem.orderId){
                                        let updateList = {}
                                        updateList.dropdownName = tableDataItem.dropdownName
                                        updateList.status = tableDataItem.status?1:2
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
                if(this.inputModeValue === 2){
                    multiple = this.dropdownlistMultiple?1:0
                }else if(this.inputModeValue === 3){
                    multiple = this.basicArchivesMultiple?1:0
                }
                let modifyItemMessage = {
//              1.ItemName，2.ItemCode，3.DataType，4.InputMode，5.RefData，6.OrgId
                    itemName: this.fundNameValue,
                    itemCode: this.paymentCodeValue,
                    dataType: this.dataTypeValue === '文本'?2:this.dataTypeValue,
                    inputMode: this.inputModeValue === '手工输入'?1:this.inputModeValue,
                    refData: this.basicArchivesValue,
                    orgId: this.SubordinateOrganizeValue,
                    comment: this.textarea,
                    decimalPlace: this.decimalDigitValue,
                    multiple: multiple,
                    id: this.itemId,
                    insertDTOList,
                    updateDTOList
                }
                console.log(modifyItemMessage)
                let url = `http://10.12.31.54:8412/crm-web/items/updateContractItemLibrary`
                this.$http.post(url, modifyItemMessage, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then(function (response) {
                        console.log(response)
                        let data = response.data
                        if(data.result === 1){
                            alert('修改成功！')
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            upOrDown(isup, idx){
                if(this.currentRow && (this.currentRow.orderId === 0 || this.currentRow.orderId)){
                    if(isup && this.currentRow.num !== 1){//上移
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
                    if(!isup && this.currentRow.num !== this.currentRow.maxNum){//下移
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
                }

            },
            handleCurrentChange(val){
                this.currentRow = val
                console.log(this.currentRow)
            },
            addOrDelete(num, row){
                if(num === this.tableData.length){//新增一行
                    this.tableData.push({
                        num: num+1,
                        dropdownName: '',
                        status: true,
                        iconPlus: true,
                        isShow: true
                    })
                    this.tableData[num-1].iconPlus = false
                }else {//删除当前行
                    this.tableData.splice(num-1, 1)
                    for(let i = 0; i < this.tableData.length; i++){
                        this.tableData[i].num = i + 1
                    }
                }
                this.$refs.singleTable.setCurrentRow()
            },
            inputModeChange(newValue, itemName, orgId){
                if(newValue === 3){
                    this.basicArchives = false
                }else{
                    this.basicArchives = true
                }
                if(newValue === 2){
                    console.log(this)
                    console.log(itemName, orgId)
                    let url = `http://10.12.31.54:8412/crm-web/dropdownList/getListDropdownListByItemName?itemName=${this.itemName}&orgId=${this.orgId}`
                    this.$http.get(url, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then( (response) => {
                            console.log(response)
                            let data = response.data
                            if(data.result.dropdownLists.length > 0){
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
                        .catch( (error) => {
                            console.log(error)
                        })
                    this.isShow = true
                }else{
                    this.isShow = false
                }
            },
            dataTypeValueChange(newValue){
                if(newValue === 1){
                    this.decimalDigit = false
                }else {
                    this.decimalDigit = true
                }
            },
            cancel(){
                this.operationTip=false
            },
            confirm(){
                this.$router.push({path: '/moneyPoolOverall/moneyPoolOverall'})
            },
            returnLastPage(){
                this.operationTip=true
            },
        },
        mounted(){
            console.log(this.currentRowP, '11111')
            this.itemName = this.currentRowP.itemName
            this.orgId = this.currentRowP.orgId
            this.itemId = this.currentRowP.id
        }
    }
</script>

<style scoped lang="scss">

    .newContent{
        margin:0;
        padding:0 16px;
        .l-note {
            margin: 20px 0 20px 26px;
            .l-textarea{
                margin-left: 42px;
                margin-top: -16px;
                width: 89%;
            }
        }
        .newContentBox{
            .el-select{
                left:0;
            }
            .groupL .void{
                padding-bottom:0;
                padding-top:44px;
            }
            .newArrow-country{
                position:absolute;
                right:20px;
                top:12px;
            }
            .groupL{
                width:306px;
                margin-right: 20px;
                /*第二行输入框右边的提示文本*/
                .downInputTooltip{
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
                .upInputTooltip{
                    width: 18px;
                    padding: 0;
                    height: 18px;
                    border-radius: 100%;
                    line-height: 18px;
                    position: absolute;
                    right: -22px;
                    top: 5px;
                }
                input{
                    padding-left:16px;
                }
            }
            .groupL-p > span{
                width:48px;
            }
            .groupL-p{
                position: relative;
                .l-checkbox{
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
        .dropdownListValue{
            border-top:2px solid #eee;
            margin-top:5px;
            padding-top:16px;
            .newContentHead{
                text-align: left;
                color: #28a7e1;
                margin-bottom: 16px;
            }
            .el-button.newButton {
                height: 22px;
                line-height: 22px;
                padding: 0 10px;
                margin:0 10px 0 0;
                border: 1px solid #8998a9;
            }
            .details-list{
                .addOrDelete{
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    padding: 0;
                    line-height: 20px;
                }
                margin-top:10px;
                width:60%;
            }
        }
    }

</style>

