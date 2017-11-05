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
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <!--内容  start-->
                <div class="newContent">
                    <div class="newContentBox newContent-service ">
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">货主</span>
                                <el-input placeholder="" v-model="IncreaseServiceDto.ownerId"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">服务项</span>
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
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">来源单据类型</span>
                                <el-select v-model="IncreaseServiceDto.sourceOrderType" placeholder="请选择">
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
                                <span class="f_l">费项名称</span>
                                <el-select v-model="IncreaseServiceDto.feeItemName" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">来源单号</span>
                                <el-input placeholder="" v-model="IncreaseServiceDto.sourceOrderNo"></el-input>
                            </div>
                            <div class="groupL-p">
                                <span class="f_l">结算单位</span>
                                <el-input placeholder="" v-model="IncreaseServiceDto.settlementCompany"></el-input>
                            </div>
                        </div>
                        <div class="groupL">
                            <div class="groupL-p">
                                <span class="f_l">增值服务编号</span>
                                <el-input placeholder="" v-model="IncreaseServiceDto.increaseServiceNo" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="serve-remark">
                            <div class="groupL-p groupL-pTextarea">
                                <span>备注</span>
                                <textarea class="catagory-discribe"></textarea>
                                <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
                            </div>
                        </div>
                    </div>
                    <div class="pasteCodeDetail">
                        <div class="newContenHead">来源单据</div>
                        <div>
                            <el-button class="newButton" @click="addNew">关联消费明细</el-button>
                            <el-button class="newButton" @click = "deleteBarCodeDetail">移除</el-button>
                        </div>
                        <div class="details-list">
                            <div class="information-list informationR-list">
                                <Table :data="detaillist" @selection-change="handleSelectionChange" @row-dblclick = 'modifyGoodsItem' border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" highlight-current-row>
                                    <TableColumn type="index" label="序号" width="70"></TableColumn>
                                    <TableColumn type="selection" width="" @click.stop = ""></TableColumn>
                                    <TableColumn prop="goodsId" label="SKUID"  width=""></TableColumn>
                                    <TableColumn prop="barcode" label="商品条码"  width=""></TableColumn>
                                    <TableColumn prop="goodsName" label="商品名称"  width=""></TableColumn>
                                    <TableColumn prop="" label="规格型号"  width=""></TableColumn>
                                    <TableColumn prop="spec" label="整箱转换"  width=""></TableColumn>
                                    <TableColumn prop="qty" label="数量" width=""></TableColumn>
                                    <TableColumn prop="unitId" label="单位" width=""></TableColumn>
                                    <TableColumn prop="cubage" label="体积(m³)"  width=""></TableColumn>
                                    <TableColumn prop="weight" label="重量(kg)"  width=""></TableColumn>
                                    <TableColumn prop="" label="金额1"  width=""></TableColumn>
                                </Table>
                            </div>
                            <!--表单  end-->
                        </div>
                        <!--关联明细消费明细开始-->
                        <el-dialog title="关联消费明细" class="newRelevanceDetails" :visible.sync="newPasteDetail">
                            <el-form ref="modifyForm" inline="true" :rules="rules" :model="modifyForm" label-width="">
                                <el-form-item label="货主">
                                    <el-input placeholder="" v-model="IncreaseServiceDto.ownerId" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="来源单据类型">
                                    <el-input placeholder="" v-model="IncreaseServiceDto.sourceOrderType" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="来源单号">
                                    <el-input placeholder="" v-model="IncreaseServiceDto.sourceOrderNo" :disabled="true"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="details-list">
                                <div class="information-list informationR-list">
                                    <Table :data="detaillist" @selection-change="handleSelectionChange" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" highlight-current-row>
                                        <TableColumn type="index" label="序号" width="50"></TableColumn>
                                        <TableColumn type="selection" width="35" @click.stop = ""></TableColumn>
                                        <TableColumn prop="" label="SKUID"  width=""></TableColumn>
                                        <TableColumn prop="" label="商品条码"  width=""></TableColumn>
                                        <TableColumn prop="" label="商品名称"  width=""></TableColumn>
                                        <TableColumn prop="" label="规格型号"  width=""></TableColumn>
                                        <TableColumn prop="" label="数量" width="50"></TableColumn>
                                        <TableColumn prop="" label="单位" width="50"></TableColumn>
                                        <TableColumn prop="" label="体积(m³)"  width="70"></TableColumn>
                                        <TableColumn prop="" label="重量(kg)"  width="70"></TableColumn>
                                        <TableColumn prop="" label="金额"  width="50"></TableColumn>
                                    </Table>
                                </div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button class="cancelButton" @click="newPasteDetail=false">取消</el-button>
                                <!--<el-button class="cancelButton" @click = "modifySaveAdd" >保存并新增</el-button>-->
                                <el-button class="confirmButton" @click="modifySave" >关联</el-button>
                            </span>
                        </el-dialog>
                        <!--关联明细消费明细开始-->
                    </div>
               <!-- 内容  end-->
            </div>
        </div>
        <!--主体内容  end-->
        </div>
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
        save:'/wms-pub-server/increaseService/save',//新增增值服务
    }
    let _this = null
    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],

        data () {
            return {
				/*页签*/
				tag:'wms_arrivalWarehousing_newValueAddedServiceManage',
                system:'/wms',
                titleName:'新增增值服务',
                formInline: {
                    user: '',
                    region: ''
                },

                checked:true,
                input:'',
                textarea:'',
                newPasteDetail:false,//新增明细
                operationTip:false,//返回提示

                options:[{
                    value:'0',
                    label:'货主1'
                },{
                    value:'1',
                    label:'小明'
                },{
                    value:'2',
                    label:'阿东'
                }],
                value:'',
                IncreaseServiceDto:{
                    "detailList": [

                    ],
                    "feeItemName": "string",
                    "id": 123,
                    "increaseServiceNo": "string",
                    "increaseType": 0,
                    "increaseTypeDesc": "string",
                    "ownerId": 0,
                    "ownerName": "string",
                    "qty": 0,
                    "settlementCompany": 0,
                    "settlementCompanyName": "string",
                    "sourceOrderId": 0,
                    "sourceOrderNo": "string",
                    "sourceOrderType": 0,
                    "sourceOrderTypeDesc": "string",
                    "sourceWay": 0,
                    "sourceWayDesc": "string",
                    "status": 0,
                    "statusDesc": "string",
                    "updateTime": 0,
                    "updateUser": 0,
                    "updateUserName": "string",
                    "warehouseCode": "string",
                    "warehouseCompanyId": 0,
                    "warehouseCompanyName": "string",
                    "warehouseId": 0,
                    "warehouseName": "string",
                    "weight": 0
                },
                // 保存的贴码明细数据
                modifyForm:{
                    goodsName:"",
                    printNum:'',
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
                modifyFormBack:{
                    goodsName:"",
                    printNum:'',
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
                barCodeDetailList:[
                    {
                        checked:true
                    },
                    {
                        checked:false
                    },
                    {
                        checked:false
                    }
                ],
                // 新添加明细列表存在
                detaillist:[],
                // 校验规则
                rules:{
                    goodsName:[
                        {
                            required:true,
                            message:'商品名称不能为空！',
                            trigger: 'blur'
                        }
                    ],
                    printNum:[
                        {
                            required:true,
                            message:'贴码数量不能为空！',
                            trigger:'blur',
                        },
                        {
                            type:'number',
                            message:'数量必须是数字',
                            trigger:'blur'
                        }
                    ]
                },
                // 当前选择项
                multipleSelection:[],
                // 为区分新建数据项，在每项数据内添加_index属性，该属性依次递增
                maxIndex:0,
                // 保存数据模板
                saveDataEg:{
                    "id":13,
                    "updateUser": 0,
                    "ownerId": 1,
                    "warehouseId": 400000022,
                    "barCodeOrderDetailDtos":[
                        {
                            "goodsId":1,
                            "qty":1,
                            "unitId":1
                        }
                    ]
                }
            }

        },
        methods: {
            cancel(){
                this.newPasteDetail=false
                this.operationTip=false
            },
            confirm(){
                this.$router.push({path: '/arrivalWarehousing/valueAddedServiceManage/valueAddedServiceManage'})
            },
            returnLastPage(){
                this.operationTip=true
            },
            // 保存成功，保存成功并保存 flag = 'new' 表示需要新增
            saveSuccess(flag) {
                let _this = this
                _this.modifyForm.barCodeOrderDetailDtos = _this.detaillist

                let sendData = _this.utilFn.stealDataFormOrigin(_this.saveDataEg, _this.modifyForm)
                //更新当前用户信息
                sendData.updateUser = 112123

                this.$request({
                    url:api.getlabelDetail,
                    context:_this,
                    sendData:sendData,
                    successCallback:function(_this, response){
                        console.log('response:',response)
                        if(response.status.statusCode == "0"){
                            _this.IncreaseServiceDto = response
                        }

                        this.$message({
                            message: '保存成功！',
                            //type: 'success',
                            duration: 1500,
                            iconClass: 'iconfont icon-chenggong'
                        })

                        if(flag == 'new'){
                            setTimeout(()=>{
                                location.pathname = "valueAddedServiceManage/newValueAddedService"
                            },1500)
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
            modifyGoodsItem(row,event){
                console.log("row: %o, event: %o",row,event)

                this.newPasteDetail = true
                this.modifyForm = row

            },

            // 修改表单提交,callback 数据处理完后的回调。
            modifySave(callback){
                let cb = typeof callback == "function" ? callback : function(){}
                let _this = this
                this.$refs.modifyForm.validate((valid) => {
                    if (valid) {
                        formatData()
                    } else {
                        return false
                    }
                })

                // 格式化数据
                function formatData(){
                    let modifyData = Object.assign({},_this.modifyForm)
                    let detailDtos = []
                    let len = _this.barCodeDetailList.length
                    let _tem = {}

                    _this.barCodeDetailList.filter((item)=>{
                        if(item.checked){
                            console.log("item:..", Object.assign({},modifyData,item))
                            _tem = Object.assign({},modifyData,item)
                            _tem._index = ++_this.maxIndex
                            detailDtos.push(_tem)
                        }
                    })

                    _this.modifyForm.barCodeOrderDetailDtos = _this.modifyForm.barCodeOrderDetailDtos.concat(detailDtos)
                    _this.detaillist = _this.modifyForm.barCodeOrderDetailDtos.concat(_this.detaillist)
                    _this.newPasteDetail = false
                    console.log('_this.modifyForm:',_this.modifyForm)
                    console.log('_this.detaillist:',_this.detaillist)
                    cb()
                }
            },

            // 保存修改并新增
            modifySaveAdd(){
                console.log("modifySaveAdd!!!!")
                let _this = this
                this.modifySave(function(){
                    setTimeout(function(){
                        _this.newPasteDetail = true
                        _this.modifyForm = Object.assign({},_this.modifyFormBack)
                        _this.getDataByBarCode()
                    },50)

                })
            },

            /*
             * ，点击新增按钮操作，新增的弹窗处理后数据是根据扫码得来的数据然后接口获取的。
             * 当前先写死请求参数{"warehouseId":400000022,"goodsBarCode":"code1"}来获取该部分数据。
             * 获取后回填。
             */
            addNew(){
                this.newPasteDetail=true
                this.getDataByBarCode()
            },
            //根据扫码获取数据  ，该方法应该可以获取id
            getDataByBarCode(){
                let _this = this

                _this.$request({
                    url:api.getByBarCode,
                    context:_this,
                    sendData:{"warehouseId":400000022,"goodsBarCode":"code1"},
                    successCallback:function(_this, response){
                        console.log('response:',response)
                        _this.modifyForm.goodsName = response[0].wmsGoodsBaseDto.goodsName
                        _this.modifyForm.ownerId = response[0].wmsGoodsBaseDto.ownerId

                        formatDetailList(response[0].wmsGoodsAuxiliaryDtos)

                        console.log("xxxxxxx",response[0].wmsGoodsAuxiliaryDtos)

                    }

                })

            },
            // 拼装明细需要的数据
            formatDetailList(wmsGoodsAuxiliaryDtos){
                let _this = this
                let list = []

                wmsGoodsAuxiliaryDtos.sort((a,b)=>{
                    if(a.unitLevel > b.unitLevel){
                        return true
                    }else{
                        return false
                    }
                })

                wmsGoodsAuxiliaryDtos.forEach((item,index)=>{
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

                if(_this.multipleSelection.length == 0){
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
                        _this.deleteArrayItem(_this.detaillist,_this.multipleSelection)
                    }
                })
            },

            // 删除数组中的指定内容的元素,baseArr,原数组，filterArr，需要在baseArr中删除的数组内容
            deleteArrayItem(baseArr, filterArr){
                let len = filterArr.length-1
                console.log("len:",len)
                for(var i = len; i>=0 ; i--){
                    console.log("删除明细项：",i)

                    let blen = baseArr.length-1
                    for(var j=blen; j>=0; j--){
                        console.log("baseArr id:",baseArr[j].barCodeOrderId)
                        // 删除原本存在的数据，这部分数据有id
                        /*if(baseArr[j] && baseArr[j].id && baseArr[j].id == filterArr[i].id ){
                         console.log("index....:",j)
                         baseArr.splice(j,1)
                         continue
                         }else */
                        if(baseArr[j]._index == filterArr[i]._index){
                            // 新添加数据，需要添加标记判断区分数据。
                            console.log("删除新增项：",i)
                            baseArr.splice(j,1)
                        }
                    }
                }
            }
        },
        created(){
            _this = this
            _this.utilFn = utilFn
        },
        mounted() {
            console.log("asdfadfas")
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
    .wms-modal-div {
        .return {
            display: inline-block;
            float: left;
            margin-right: 10px;
            margin-top: 2px;
            i {
                vertical-align: middle;
            }
        }
    }
    .newContent{
        margin:0;
        padding:16px;
        .newContenHead{
            text-align: left;
            color: #28a7e1;
            margin-bottom: 16px;
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
            }
            .groupL{
                width: 300px;
                margin-left: -64px;
                margin-right: 40px;
                .groupL-p {
                    display: inline-block;
                }
                input{
                    padding-left:16px;
                }
            }
            .groupL-p > span{
                width: 74px;
            }
            .serve-remark {
                display: inline-block;
                width: 100%;
                .groupL-pTextarea {
                    margin-left:0;
                    span {
                        width: 38px;
                    }
                    .catagory-discribe {
                        width: 720px;
                        height: 90px;
                    }
                }
            }
            .star-icon {
                position: absolute;
                z-index: 2000;
                margin-top: 3px;
                margin-left: 5px;
            }
        }
        .pasteCodeDetail{
            border-top:2px solid #eee;
            margin-top:5px;
            padding-top:16px;
            .el-button.newButton {
                height: 22px;
                line-height: 22px;
                padding: 0 10px;
                margin:0 10px 0 0;
                border: 1px solid #8998a9;
            }
            .details-list{
                margin-top:10px;
                /*width:60%;*/
            }
        }
    }
    /*新增明细 start*/
    .newRelevanceDetails{
        .label{
            font-size:12px;
        }
        .el-form-item{
            /*padding-left:16px;*/
            .labelGroup{
                position:absolute;
                left:-73px;
            }
        }
        .inputLine{
            position:absolute;
            left:174px;
            border-left:1px solid #eee;
            height:28px;
            font-size:12px;
            color:#333;
            padding-left:5px;
        }
        .label{
            margin-right:6px;
        }
        .pastePrintSelection{
            margin:10px 16px 0;
            color:#ccc;
        }
        .details-list {

        }
    }
    /* .newPasteDetail .el-input, .newPasteDetail .el-input__inner {
         width: 110px;
     }*/
    /*新增明细 end*/

</style>

