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
        <el-dialog title="操作提示" class="operationTip" :modal="false" :visible.sync="operationTip">
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
                                <el-checkbox style="display: none" v-show="isShow" v-model="dropdownlistMultiple"
                                             class="l-checkbox">下拉列表值可多选
                                </el-checkbox>
                            </div>
                            <!--<el-tooltip placement="top">-->
                            <!--<div slot="content">如：手动输入、选择下拉列表值、选择基础档案。<br>-->
                            <!--修改时，已被引用的款项，不允许修改输入类型</div>-->
                            <!--<el-button class="downInputTooltip">?</el-button>-->
                            <!--</el-tooltip>-->
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">款项名称</span>
                                <i class="star-icon">*</i>
                                <el-input placeholder="请输入" v-model="fundNameValue"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">基础档案</span>
                                <!--<el-input placeholder="请选择" v-model="refData" :disabled="basicArchives"></el-input>-->
                                <el-select v-model="refData" placeholder="请选择" :disabled="basicArchives">
                                    <el-option
                                        v-for="item in refDataOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                                <el-checkbox v-model="basicArchivesMultiple" class="l-checkbox"
                                             :disabled="basicArchives">可多选
                                </el-checkbox>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">数据类型</span>
                                <i class="star-icon">*</i>
                                <el-select @change="dataTypeValueChange" v-model="dataTypeValue" placeholder="请选择">
                                    <el-option
                                        v-for="item in dataTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="newArrow-country"></i>
                            </div>
                            <!--<el-tooltip placement="top">-->
                            <!--<div slot="content">如：文本、数值、金额、日期等。<br>-->
                            <!--数据类型为数值时，需设置小数位数。<br>-->
                            <!--修改时，已被引用的款项，不允许修改数据类型</div>-->
                            <!--<el-button class="upInputTooltip">?</el-button>-->
                            <!--</el-tooltip>-->
                            <div class="groupL-p">
                                <span class="f_l">必输性</span>
                                <el-select v-model="mustInputValue" placeholder="请选择">
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
                                <el-input placeholder="请输入" v-model="decimalPlace"
                                          :disabled='decimalDigit' type="number" min="0" max="9" @change="valChange"></el-input>
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
                        <div class="newContenHead">下拉列表值</div>
                        <div>
                            <el-button class="newButton" @click="order(true, currentRow.id-1)">上移</el-button>
                            <el-button class="newButton" @click="order(false, currentRow.id-1)">下移</el-button>
                        </div>
                        <div class="details-list">
                            <div class="information-list informationR-list">
                                <el-table :data="tableData" border style="width: 100%" ref="singleTable"
                                          :default-sort="{prop: 'date', order: 'descending'}"
                                          highlight-current-row @current-change="handleCurrentChange">
                                    <el-table-column prop="id" label="序号"
                                                     width="55"></el-table-column>
                                    <el-table-column label="值名称" class-name="noPaddingCol">
                                        <template slot-scope="scope">
                                            <el-input placeholder="请输入" v-model="scope.row.dropdownName"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态">
                                        <template slot-scope="scope">
                                            <el-checkbox v-model="scope.row.use">启用</el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button @click="addOrDelete(scope.row.id)" class="addOrDelete"
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
    import axios from 'axios'
    import serverMixin from '@Crm/mixin/server.js'
    export default {
        props: {
            removeTab: {
                type: Function,
                require: true
            }
        },
        mixins: [serverMixin],
        data() {
            return {
                orgId: 2,
                isShow: false,
                dropdownlistMultiple: false,
                basicArchivesMultiple: false,
                valueName: '',
                paymentCodeValue: '系统自动编码',//款项编码的值
                inputModeValue: '手工输入',//输入方式的值
                fundNameValue: '',//款项名称的值
                refData: '',//基础档案的值
                basicArchives: true,//基础档案输入框是否禁止输入
                dataTypeValue: '文本',//数据类型的值
                mustInputValue: 1,//必输性的值
                decimalPlace: 0,//小数位数的值
                decimalDigit: true,//小数位数输入框是否禁止输入
                SubordinateOrganizeValue: '',//所属组织的值
                textarea: '',
                operationTip: false,//返回提示
                refDataOptions: [],//基础档案的选项
                dataTypeOptions: [],//数据类型的选项
                mustInputOptions: [],//必输性的选项
                inputModeOptions: [],//输入方式的选项
                value: '',
                tableData: [
                    {
                        id: 1,
                        dropdownName: '',
                        use: true,
                        iconPlus: true,
                    },
                ],
            }

        },
        methods: {
            valChange(){//小数位值改变
                if(this.decimalPlace > 9 || this.decimalPlace < 0 || this.decimalPlace.length > 1){
                    this.decimalPlace = ''
                    this.$message('小数位数值必须在0-9之间')
                }
            },
            order(isUp, idx){//排序
//                console.log(this.tableData.length, this.currentRow.id, idx)
                if(!this.currentRow){
                    this.$message('请选择要操作的下拉列表值')
                }else {
                    if (this.currentRow.id === 1 && isUp) {
                        this.$message('下拉列表值已经在第一位')
                    } else if (this.currentRow.id === this.tableData.length && !isUp) {
                        this.$message('下拉列表值已经在最后一位')
                    }else {
                        if (isUp) {//上移
                            let connect = this.tableData.slice(idx - 1, idx + 1)
                            let flag1 = connect[1].id
                            connect[1].id = connect[0].id
                            connect[0].id = flag1
                            let flag2 = connect[1].iconPlus
                            connect[1].iconPlus = connect[0].iconPlus
                            connect[0].iconPlus = flag2
                            this.tableData.splice(idx - 1, 2, connect[1], connect[0])
                            this.$refs.singleTable.setCurrentRow(this.tableData[idx - 1])
                        }else {//下移
                            let connect = this.tableData.slice(idx, idx + 2)
                            let flag1 = connect[1].id
                            connect[1].id = connect[0].id
                            connect[0].id = flag1
                            let flag2 = connect[1].iconPlus
                            connect[1].iconPlus = connect[0].iconPlus
                            connect[0].iconPlus = flag2
                            this.tableData.splice(idx, 2, connect[1], connect[0])
                            this.$refs.singleTable.setCurrentRow(this.tableData[idx + 1])
                            console.log(this.currentRow)
                        }

                    }
                }
            },
            save() {//点击保存新增一条合同款项信息
                if (this.fundNameValue === '') {
                    this.$message('请输入款项名称')
                } else if (this.inputModeValue === 3 && this.refData === '') {
                    this.$message('请输入基础档案')
                } else {
                    this.request()
                }
            },
            request() {//整理数据发送请求
                let newTableDate = []
                if (this.inputModeValue === 2) {
                    this.tableData.forEach(item => {
                        let newItem = {}
                        newItem.itemId = item.id
                        newItem.dropdownName = item.dropdownName
                        newItem.status = item.use ? 1 : 2
                        newItem.orgId = this.orgId
                        newItem.createUser = 1
                        newTableDate.push(newItem)
                    })
                }
                let multiple = null
                if (this.inputModeValue === 2) {
                    multiple = this.dropdownlistMultiple ? 1 : 0
                } else if (this.inputModeValue === 3) {
                    multiple = this.basicArchivesMultiple ? 1 : 0
                }
                let newItemMessage = {
                    itemName: this.fundNameValue,
                    itemCode: this.paymentCodeValue,
                    dataType: this.dataTypeValue === '文本' ? 2 : this.dataTypeValue,
                    inputMode: this.inputModeValue === '手工输入' ? 1 : this.inputModeValue,
                    refData: this.refData,
                    orgId: this.orgId,
                    necessaryMode: this.mustInputValue,
                    comment: this.textarea,
                    decimalPlace: this.decimalPlace,
                    multiple: multiple,
                    insertDTOList: newTableDate
                }
                console.log(newItemMessage)
                let url = `${this.urlForward}items/saveContractItemLibrary`
                axios.post(url, newItemMessage, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then( (response) => {
                        console.log(response)
                        if (response.data.status.statusCode === 0) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            })
                            setTimeout(() => {
                                this.removeTab('crm_itemLibraryGroupMain_itemLibraryGroupAdd')
                            }, 3000)
                        } else {
                            this.$message({
                                message: '保存失败！请重试'+response.data.status.statusReason,
                                type: 'error'
                            })
                        }
                    })
                    .catch( (error) => {
                        console.log(error)
                        this.$message({
                            message: '保存失败！请重试',
                            type: 'error'
                        })
                    })
            },
            addOrDelete(id) {
                if (id === this.tableData.length) {//新增一行
                    this.tableData.push({
                        id: id + 1,
                        valueName: '',
                        use: true,
                        iconPlus: true,
                    })
                    this.tableData[id - 1].iconPlus = false
                } else {//删除当前行
                    this.tableData.splice(id - 1, 1)
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i].id = i + 1
                    }
                }
                this.$refs.singleTable.setCurrentRow()
            },
            inputModeChange(newValue) {
                if (newValue === 3) {
                    this.basicArchives = false
                } else {
                    this.basicArchives = true
                    this.refData = ''
                    this.basicArchivesMultiple = false
                }
                if (newValue === 2) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            dataTypeValueChange(newValue) {
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
                    this.removeTab('crm_itemLibraryGroupMain_itemLibraryGroupAdd')
                }, 300)
            },
//        returnLastPage(){
//            this.operationTip=true
//        },
            handleCurrentChange(val) {
                console.log(val)
                this.currentRow = val
            },
            initializeReq(portName){//input枚举值初始化请求
                axios.get(`${this.urlForward}enum/${portName}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                    .then(response => {
                        console.log(response)
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
                                case `getCurrentOrg/${this.orgId}`:
                                    this.SubordinateOrganizeValue = response.data.result.orgName

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
            }
        },
        mounted(){
            this.initializeReq('getBaseDataEnum')
            this.initializeReq('getDataTypeList')
            this.initializeReq('getInputItemDataEnum')
            this.initializeReq('getNecessaryDataEnum')
            this.initializeReq(`getCurrentOrg/${this.orgId}`)
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
            .el-select {
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
            .newContenHead {
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

