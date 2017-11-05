<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="return">
                    <i class="iconfont icon-fanhui"></i>
                    <a href="javascript:void(0);" @click="returnLastPage">返回</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:void(0)" @click="saveSuccess">保存</a>
                    <i>|</i>
                    <a href="javascript:void(0);" @click="returnLastPage">取消</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:void(0);" @click="saveSuccess('new')">保存并新增</a>
                </p>
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
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <!--右侧新增  start-->
                <div class="newContent">
                    <div class="newContentBox ">
                        <div class="newContenHead">基础信息</div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">任务单号</span>
                                <el-input placeholder="" v-model="labelOrder.businessNo" :disabled="true"></el-input>
                            </div>
                            <div class="groupL-p">
                                <!--
                                  作者：zhangzesheng
                                  时间：2017-09-05
                                  描述：跟产品沟通新建和修改页面仓库信息均不能改动，原型上体现有问题。
                                -->
                                <span class="f_l">仓库</span>
                                <i class="star-icon">*</i>
                                <el-input placeholder="" v-model="labelOrder.warehouseName" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">货主</span>
                                <i class="star-icon">*</i>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">品种</span>
                                <el-input placeholder="" v-model="labelOrder.varietyQty " :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p void">
                                <span class="f_l">数量</span>
                                <el-input placeholder="" v-model="labelOrder.goodsQty" :disabled="true"></el-input>
                            </div>
                        </div>

                    </div>
                    <div class="pasteCodeDetail">
                        <div class="newContenHead">贴码明细</div>
                        <div>
                            <el-button class="newButton" @click="addNew">新增</el-button>
                            <el-button class="newButton" @click="deleteBarCodeDetail">删除</el-button>
                        </div>
                        <div class="details-list">
                            <p>任务表单：{{labelOrder.barCodeNo}}</p>
                            <div class="information-list informationR-list">
                                <Table :data="detaillist" @selection-change="handleSelectionChange"
                                          @row-dblclick='modifyGoodsItem' border style="width: 100%"
                                          :default-sort="{prop: 'date', order: 'descending'}" highlight-current-row>
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" width="" @click.stop=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称" width=""></TableColumn>
                                    <TableColumn prop="goodsBarCode" label="SKU商品" width=""></TableColumn>
                                    <TableColumn prop="goodsLabel" label="商品条码" width=""></TableColumn>
                                    <TableColumn prop="unitConvert" label="整零转换" width=""></TableColumn>
                                    <TableColumn prop="unit" label="单位" width=""></TableColumn>
                                    <TableColumn prop="qty" label="打印数量" width=""></TableColumn>
                                </Table>
                            </div>
                            <!--表单  end-->
                        </div>
                        <!--新增贴码明细开始-->
                        <el-dialog title="修改贴码明细" class="newPasteDetail" :visible.sync="newPasteDetail">
                            <div class="pastePrintSelection">贴码打印选择</div>
                            <el-form ref="modifyForm" :rules="rules" :model="modifyForm" label-width="74px">
                                <el-form-item label="商品名称" prop="goodsName">
                                    <el-input class="goodsName" v-model="modifyForm.goodsName"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <!--这个地方可以搞成循环产生，不用这么吭哧吭哧写死，时间不够啊，先这么着吧，我也没办法，时间太短了。     -->
                                    <el-col :span="11">
                                        <div class="labelGroup">
                                            <el-checkbox v-model="barCodeDetailList[0].checked"></el-checkbox>
                                            <span class="label">商品条码</span>
                                        </div>
                                        <el-input v-model="barCodeDetailList[0].goodsFinalBarCode"
                                                  class="hasUnit"></el-input>
                                        <span class="inputLine">
                              		{{barCodeDetailList[0].unit}}
                              </span>
                                    </el-col>
                                    <el-col :span="13">
                                        <span style="float:left" class="label">待贴数量</span>
                                        <el-input v-model="barCodeDetailList[0].qty"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-col :span="11">
                                        <div class="labelGroup">
                                            <el-checkbox v-model='barCodeDetailList[1].checked'></el-checkbox>
                                            <span class="label">二级条码</span>
                                        </div>
                                        <el-input v-model="barCodeDetailList[1].goodsFinalBarCode" class="hasUnit"
                                                  disabled></el-input>
                                        <span class="inputLine">{{barCodeDetailList[1].unit}}</span>
                                    </el-col>
                                    <el-col :span="13">
                                        <span style="float:left" class="label">待贴数量</span>
                                        <el-input v-model="barCodeDetailList[1].qty"
                                                  v-if='barCodeDetailList[1].checked'></el-input>
                                        <el-input v-model="barCodeDetailList[1].qty" v-else disabled></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-col :span="11">
                                        <div class="labelGroup">
                                            <el-checkbox v-model='barCodeDetailList[2].checked'></el-checkbox>
                                            <span class="label">三级条码</span>
                                        </div>
                                        <el-input v-model="barCodeDetailList[2].goodsFinalBarCode" class="hasUnit"
                                                  disabled></el-input>
                                        <span class="inputLine" disabled>{{barCodeDetailList[2].unit}}</span>
                                    </el-col>
                                    <el-col :span="13">
                                        <span style="float:left" class="label">待贴数量</span>
                                        <el-input v-model="barCodeDetailList[2].qty"
                                                  v-if='barCodeDetailList[2].checked'></el-input>
                                        <el-input v-model="barCodeDetailList[2].qty" v-else disabled></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="整零转换">
                                    <el-input v-model="input1" disabled></el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                    <el-button class="cancelButton" @click="newPasteDetail=false">取消</el-button>
                    <el-button class="cancelButton" @click="modifySaveAdd">保存并新增</el-button>
                    <el-button class="confirmButton" @click="modifySave">保存</el-button>
                </span>
                        </el-dialog>
                        <!--新增贴码明细结束-->
                    </div>
                </div>
                <!--右侧新增  end-->
            </div>
        </div>
        <!--主体内容  end-->

    </div>
</template>
<script>

	import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import utilFn from '@Wms/utils/utilFns'
    import service from '@Wms/services/arrivalWarehousing'

    let api = {
        save: '/wms-pub-server/barcodeorder/save',
        getByBarCode: '/wms-base-server/wmsgoods/getByBarCode'
    }

    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data () {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_newReceipts',
		        system:'/wms',
		        titleName:'新建贴码',
                checked: true,
                tableData: '',
                input: '',
                input1: '',
                textarea: '',
                newPasteDetail: false,//新增贴码明细
                operationTip: false,//返回提示

                options: [{
                    value: '0',
                    label: '货主1'
                }, {
                    value: '1',
                    label: '小明'
                }, {
                    value: '2',
                    label: '阿东'
                }],
                value: '',
                labelOrder: {
                    "barCodeOrderDetailDtos": [],
                    "businessNo": null,
                    "businessType": 0,
                    "businessTypeDesc": "不知道填啥",
                    "createTime": 0,
                    "createUser": 0,
                    "goodsQty": null,
                    "id": 123,
                    "ownerId": 0,
                    "ownerName": 0,
                    "printStatus": 0,
                    "printStatusDesc": "string",
                    "sourceType": 0,
                    "sourceTypeDesc": "string",
                    "status": 0,
                    "statusDesc": "string",
                    "supplierId": 0,
                    "supplierName": 0,
                    "updateTime": 0,
                    "updateUser": 0,
                    "varietyQty": null,
                    "warehouseCompanyId": 0,
                    "warehouseId": 0,
                    warehouseName: "宇宙仓库。。。"
                },
                // 保存的贴码明细数据
                modifyForm: {
                    goodsName: "",
                    printNum: '',
                    "createUser": 'eeeeeeee',
                    "barCodeOrderDetailDtos": [
                        /*{
                         "goodsId'": '',
                         "qty": 10,
                         "unitId": ''
                         }*/
                    ],
                    "ownerId": '',
                    "warehouseId": '400000022'
                },
                // 还原备用
                modifyFormBack: {
                    goodsName: "",
                    printNum: '',
                    "createUser": 'eeeeeeee',
                    "barCodeOrderDetailDtos": [
                        /*{
                         "goodsId'": '',
                         "qty": 10,
                         "unitId": ''
                         }*/
                    ],
                    "ownerId": '',
                    "warehouseId": '400000022'
                },
                // 存储新建，修改弹窗的三级数据,提交保存时重新拼装数据。
                barCodeDetailList: [
                    {
                        checked: true
                    },
                    {
                        checked: false
                    },
                    {
                        checked: false
                    }
                ],
                // 新添加明细列表存在
                detaillist: [],
                // 校验规则
                rules: {
                    goodsName: [
                        {
                            required: true,
                            message: '商品名称不能为空！',
                            trigger: 'blur'
                        }
                    ],
                    printNum: [
                        {
                            required: true,
                            message: '贴码数量不能为空！',
                            trigger: 'blur',
                        },
                        {
                            type: 'number',
                            message: '数量必须是数字',
                            trigger: 'blur'
                        }
                    ]
                },
                // 当前选择项
                multipleSelection: [],
                // 为区分新建数据项，在每项数据内添加_index属性，该属性依次递增
                maxIndex: 0,
                // 保存数据模板
                saveDataEg: {
                    "id": 13,
                    "updateUser": 0,
                    "ownerId": 1,
                    "warehouseId": 400000022,
                    "barCodeOrderDetailDtos": [
                        {
                            "goodsId": 1,
                            "qty": 1,
                            "unitId": 1
                        }
                    ]
                }
            }

        },
        methods: {
            cancel(){
                this.newPasteDetail = false
                this.operationTip = false
            },
            confirm(){
                this.$router.push({path: '/wms/arrivalWarehousing/pasteCodeManage'})
            },
            returnLastPage(){
                this.operationTip = true
            },
            // 保存成功，保存成功并保存 flag = 'new' 表示需要新增
            saveSuccess(flag) {
                let _this = this
                _this.modifyForm.barCodeOrderDetailDtos = _this.detaillist

                let sendData = _this.utilFn.stealDataFormOrigin(_this.saveDataEg, _this.modifyForm)
                //更新当前用户信息
                sendData.updateUser = 112123

                this.$request({
                    url: api.getlabelDetail,
                    context: _this,
                    sendData: sendData,
                    successCallback: function (_this, response) {
                        console.log('response:', response)
                        if (response.status.statusCode == "0") {
                            _this.labelOrder = response
                        }

                        this.$message({
                            message: '保存成功！',
                            //type: 'success',
                            duration: 1500,
                            iconClass: 'iconfont icon-chenggong'
                        })

                        if (flag == 'new') {
                            setTimeout(() => {
                                location.pathname = "arrivalWarehousing/pasteCodeManage/newReceipts"
                            }, 1500)
                        }
                    }
                })

                // test code 接口正常后应该使用接口返回后调用
                /*this.$message({
                 message: '保存成功！',
                 //type: 'success',
                 duration: 1500,
                 iconClass: 'iconfont icon-chenggong'
                 })

                 if(flag == 'new'){
                 setTimeout(()=>{
                 location.pathname = "pasteCodeManage/newReceipts"
                 },1500)
                 }*/


            },

            //双击某一行时修改改行数据
            modifyGoodsItem(row, event){
                console.log("row: %o, event: %o", row, event)

                this.newPasteDetail = true
                this.modifyForm = row

            },

            // 修改表单提交,callback 数据处理完后的回调。
            modifySave(callback){
                let cb = typeof callback == "function" ? callback : function () {
                }
                let _this = this
                this.$refs.modifyForm.validate((valid) => {
                    if (valid) {
                        formatData()
                    } else {
                        return false
                    }
                })

                // 格式化数据
                function formatData() {
                    let modifyData = Object.assign({}, _this.modifyForm)
                    let detailDtos = []
                    let len = _this.barCodeDetailList.length
                    let _tem = {}

                    _this.barCodeDetailList.filter((item) => {
                        if (item.checked) {
                            console.log("item:..", Object.assign({}, modifyData, item))
                            _tem = Object.assign({}, modifyData, item)
                            _tem._index = ++_this.maxIndex
                            detailDtos.push(_tem)
                        }
                    })

                    _this.modifyForm.barCodeOrderDetailDtos = _this.modifyForm.barCodeOrderDetailDtos.concat(detailDtos)
                    _this.detaillist = _this.modifyForm.barCodeOrderDetailDtos.concat(_this.detaillist)
                    _this.newPasteDetail = false
                    console.log('_this.modifyForm:', _this.modifyForm)
                    console.log('_this.detaillist:', _this.detaillist)
                    cb()
                }
            },

            // 保存修改并新增
            modifySaveAdd(){
                console.log("modifySaveAdd!!!!")
                let _this = this
                this.modifySave(function () {
                    setTimeout(function () {
                        _this.newPasteDetail = true
                        _this.modifyForm = Object.assign({}, _this.modifyFormBack)
                        _this.getDataByBarCode()
                    }, 50)

                })
            },

            /*
             * ，点击新增按钮操作，新增的弹窗处理后数据是根据扫码得来的数据然后接口获取的。
             * 当前先写死请求参数{"warehouseId":400000022,"goodsBarCode":"code1"}来获取该部分数据。
             * 获取后回填。
             */
            addNew(){
                this.newPasteDetail = true
                this.getDataByBarCode()
            },
            //根据扫码获取数据  ，该方法应该可以获取id
            getDataByBarCode(){
                let _this = this

                _this.$request({
                    url: api.getByBarCode,
                    context: _this,
                    sendData: {"warehouseId": 400000022, "goodsBarCode": "code1"},
                    successCallback: function (_this, response) {
                        console.log('response:', response)
                        _this.modifyForm.goodsName = response[0].wmsGoodsBaseDto.goodsName
                        _this.modifyForm.ownerId = response[0].wmsGoodsBaseDto.ownerId

                        formatDetailList(response[0].wmsGoodsAuxiliaryDtos)

                        console.log("xxxxxxx", response[0].wmsGoodsAuxiliaryDtos)

                    }

                })

            },
            // 拼装明细需要的数据
            formatDetailList(wmsGoodsAuxiliaryDtos){
                let _this = this
                let list = []

                wmsGoodsAuxiliaryDtos.sort((a, b) => {
                    if (a.unitLevel > b.unitLevel) {
                        return true
                    } else {
                        return false
                    }
                })

                wmsGoodsAuxiliaryDtos.forEach((item, index) => {
                    item.unitId = item.id
                    _this.barCodeDetailList[index] = Object.assign(_this.barCodeDetailList[index], item)
                })

                //_this.barCodeDetailList = list
            },
            // 选择项处理
            handleSelectionChange(val){
                this.multipleSelection = val
            },

            // 删除列表操作。
            deleteBarCodeDetail(){
                let _this = this

                if (_this.multipleSelection.length == 0) {
                    _this.$alert('当前没有选择项，请选择后再进行操作', '删除贴码明细', {
                        confirmButtonText: '确定',
                        callback: action => {

                        }
                    })

                    return
                }

                this.$alert('确定要删除已选择的明细吗？', '删除贴码明细', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // 从数组中删除掉数据
                        _this.deleteArrayItem(_this.detaillist, _this.multipleSelection)
                    }
                })
            },

            // 删除数组中的指定内容的元素,baseArr,原数组，filterArr，需要在baseArr中删除的数组内容
            deleteArrayItem(baseArr, filterArr){
                let len = filterArr.length - 1
                console.log("len:", len)
                for (var i = len; i >= 0; i--) {
                    console.log("删除明细项：", i)

                    let blen = baseArr.length - 1
                    for (var j = blen; j >= 0; j--) {
                        console.log("baseArr id:", baseArr[j].barCodeOrderId)
                        // 删除原本存在的数据，这部分数据有id
                        /*if(baseArr[j] && baseArr[j].id && baseArr[j].id == filterArr[i].id ){
                         console.log("index....:",j)
                         baseArr.splice(j,1)
                         continue
                         }else */
                        if (baseArr[j]._index == filterArr[i]._index) {
                            // 新添加数据，需要添加标记判断区分数据。
                            console.log("删除新增项：", i)
                            baseArr.splice(j, 1)
                        }
                    }
                }
            }
        },
        created(){
        	this.utilFn = utilFn
        },
        mounted() {
            console.log("asdfadfas")
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
    .newContent {
        margin: 0;
        padding: 0 16px;
        .newContenHead {
            text-align: left;
            color: #28a7e1;
            margin-bottom: 16px;
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
            }
            .groupL {
                width: 306px;
                input {
                    padding-left: 16px;
                }
            }
            .groupL-p > span {
                width: 48px;
            }
            .star-icon {
                position: absolute;
                z-index: 2000;
                margin-top: 3px;
                margin-left: 5px;
            }
        }
        .pasteCodeDetail {
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
                margin-top: 10px;
                width: 60%;
            }
        }
    }

    /*新增贴码明细 start*/
    .newPasteDetail {
        .label {
            font-size: 12px;
        }
        .el-form-item {
            padding-left: 16px;
            .labelGroup {
                position: absolute;
                left: -73px;
            }
        }
        .inputLine {
            position: absolute;
            left: 174px;
            border-left: 1px solid #eee;
            height: 28px;
            font-size: 12px;
            color: #333;
            padding-left: 5px;
        }
        .label {
            margin-right: 6px;
        }
        .pastePrintSelection {
            margin: 10px 16px 0;
            color: #ccc;
        }
    }

    /*新增贴码明细 end*/

</style>

