<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">所属仓库</span>
                    <el-input type="text" v-model="warehouseId" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">所属库区</span>
                    <el-input type="text" v-model="warehouseAreaId" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货位编码</span>
                    <el-input type="text" v-model="goodspositionCode" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货位条码</span>
                    <el-input type="text" v-model="goodspositionBarCode" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">货位顺序号</span>
                    <el-input type="text" v-model="goodspositionOrder" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货位状态</span>
                    <el-input type="text" v-model="goodspositionStatus" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货架类型</span>
                    <el-input type="text" v-model="goodsShelvesType" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库区类型</span>
                    <el-input type="text" v-model="warehouseAreaType" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">用途属性</span>
                    <el-input type="text" v-model="useAttrbute" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货物属性</span>
                    <el-input type="text" v-model="goodsAttrbute" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">退货属性</span>
                    <el-input type="text" v-model="refund" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">补货属性</span>
                    <el-input type="text" v-model="replenishment" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">商品品类</span>
                    <el-input type="text" v-model="goodsClass" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">存储属性</span>
                    <el-input type="text" v-model="circulation" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">存储规格</span>
                    <el-input type="text" v-model="storeSpec" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">一位一品属性</span>
                    <el-input type="text" v-model="onepositionOneclass" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">一位一货主</span>
                    <el-input type="text" v-model="onepositionOneowner" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">商品ABC分类</span>
                    <el-input type="text" v-model="goodsAbc" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">隶属楼层</span>
                    <el-input type="text" v-model="floor" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <!--<span class="hspace">其他项</span>-->
                    <!--<el-input type="text" class="license-number" placeholder="请选择"></el-input>-->
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">长度(cm)</span>
                    <el-input type="text" v-model="goodspositionLength" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">宽度(cm)</span>
                    <el-input type="text" v-model="goodspositionWidth" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">高度(cm)</span>
                    <el-input type="text" v-model="goodspositionHeight" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">贵重物品</span>
                    <el-input type="text" v-model="isValuable" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">可用最大数量</span>
                    <el-input type="text" v-model="usableMaxNumber" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">可用最大体积(m³)</span>
                    <el-input type="text" v-model="usableMaxCubage" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">可用最大重量(kg)</span>
                    <el-input type="text" v-model="usableMaxWeight" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">容积(m³)</span>
                    <el-input type="text" v-model="goodspositionCubage" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">可用数量比例</span>
                    <el-input type="text" v-model="usableNumberProportion" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">可用容积比例</span>
                    <el-input type="text" v-model="usableCubageProportion" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">可用重量比例</span>
                    <el-input type="text" v-model="usableWeightProportion" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">停止移入</span>
                    <el-input type="text" v-model="stopIn" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">剩余最大数量</span>
                    <el-input type="text" v-model="remainderMaxNumber" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">剩余最大体积(m³)</span>
                    <el-input type="text" v-model="remainderMaxCubage" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">剩余最大重量(kg)</span>
                    <el-input type="text" v-model="remainderMaxWeight" class="license-number" placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">停止移出</span>
                    <el-input type="text" v-model="stopOut" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="text" v-model="remark" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
        <!--主体内容  end-->
    </div>
</template>
<script type="es6">
    let _this
    let api = {
        test: ''
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        props: ['transData'],
//        props: ['transData','createUser','warehouseId','updateUser','locationId'],
        data() {
            return {
                submitUrl:'/wms-base-server/location/save',
                warehouseId: "",
                warehouseAreaId: "",
                goodspositionCode: "",
                goodspositionBarCode: "",

                goodspositionOrder: "",
                goodspositionStatus: "",
                goodsShelvesType: "",
                warehouseAreaType: "",

                useAttrbute: "",
                goodsAttrbute: "",
                refund: "",
                replenishment: "",

                goodsClass: "",
                circulation: "",
                storeSpec: "",
                onepositionOneclass: "",

                onepositionOneowner: "",
                goodsAbc: "",
                floor: "",

                goodspositionLength: "",
                goodspositionWidth: "",
                goodspositionHeight: "",
                isValuable: "",

                usableMaxNumber: "",
                usableMaxCubage: "",
                usableMaxWeight: "",
                goodspositionCubage: "",

                usableNumberProportion: "",
                usableCubageProportion: "",
                usableWeightProportion: "",
                stopIn: "",

                remainderMaxNumber: "",
                remainderMaxCubage: "",
                remainderMaxWeight: "",
                stopOut: "",

                remark: "",

                createUser: '',
                id: '',
                updateUser: ''
//                createUser: _this.transData.createUser,
//                id:_this.transData.locationId,
//                updateUser: _this.transData.updateUser
            }
        },
        mounted() {
            _this.loadDataInfo()
        },
        watch: {
            'transData.locationId' : function(){
                _this.loadDataInfo()
            }
        },
        methods: {
            loadDataInfo() {
                // 如果传入了用户id，则标识需要编辑指定的用户
                //alert("transData.locationId:  "+_this.transData.locationId)
                if (typeof _this.transData.locationId === 'string' && _this.transData.locationId.length > 0) {
                    // 调用接口，获取指定id的用户，假设服务返回了user对象
                    var requestData = {
                        "id": _this.transData.locationId,
                        "warehouseId": _this.transData.warehouseId
                    }
                    // 绑定到界面
                    _this.$request({
                        url: '/wms-base-server/location/get',
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            // 绑定到界面
                            _this.warehouseId = response.warehouseId
                            _this.warehouseAreaId = response.warehouseAreaId
                            _this.goodspositionCode = response.goodspositionCode
                            _this.goodspositionBarCode = response.goodspositionBarCode

                            _this.goodspositionOrder = response.goodspositionOrder
                            _this.goodspositionStatus = response.goodspositionStatus
                            _this.goodsShelvesType = response.goodsShelvesType
                            _this.warehouseAreaType = response.warehouseAreaType

                            _this.useAttrbute = response.useAttrbute
                            _this.goodsAttrbute = response.goodsAttrbute
                            _this.refund = response.refund
                            _this.replenishment = response.replenishment

                            _this.goodsClass = response.goodsClass
                            _this.circulation = response.circulation
                            _this.storeSpec = response.storeSpec
                            _this.onepositionOneclass = response.onepositionOneclass

                            _this.onepositionOneowner = response.onepositionOneowner
                            _this.goodsAbc = response.goodsAbc
                            _this.floor = response.floor

                            _this.goodspositionLength = response.goodspositionLength
                            _this.goodspositionWidth = response.goodspositionWidth
                            _this.goodspositionHeight = response.goodspositionHeight
                            _this.isValuable = response.isValuable

                            _this.usableMaxNumber = response.usableMaxNumber
                            _this.usableMaxCubage = response.usableMaxCubage
                            _this.usableMaxWeight = response.usableMaxWeight
                            _this.goodspositionCubage = response.goodspositionCubage

                            _this.usableNumberProportion = response.usableNumberProportion
                            _this.usableCubageProportion = response.usableCubageProportion
                            _this.usableWeightProportion = response.usableWeightProportion
                            _this.stopIn = response.stopIn

                            _this.remainderMaxNumber = response.remainderMaxNumber
                            _this.remainderMaxCubage = response.remainderMaxCubage
                            _this.remainderMaxWeight = response.remainderMaxWeight
                            _this.stopOut = response.stopOut

                            _this.remark = response.remark
                        }
                    })
                    _this.submitUrl = '/wms-base-server/location/update'
                } else {
                    _this.warehouseId = ''
                    _this.warehouseAreaId = ''
                    _this.goodspositionCode = ''
                    _this.goodspositionBarCode = ''

                    _this.goodspositionOrder = ''
                    _this.goodspositionStatus = ''
                    _this.goodsShelvesType = ''
                    _this.warehouseAreaType = ''

                    _this.useAttrbute = ''
                    _this.goodsAttrbute = ''
                    _this.refund = ''
                    _this.replenishment = ''

                    _this.goodsClass = ''
                    _this.circulation = ''
                    _this.storeSpec = ''
                    _this.onepositionOneclass = ''

                    _this.onepositionOneowner = ''
                    _this.goodsAbc = ''
                    _this.floor = ''

                    _this.goodspositionLength = ''
                    _this.goodspositionWidth = ''
                    _this.goodspositionHeight = ''
                    _this.isValuable = ''

                    _this.usableMaxNumber = ''
                    _this.usableMaxCubage = ''
                    _this.usableMaxWeight = ''
                    _this.goodspositionCubage = ''

                    _this.usableNumberProportion = ''
                    _this.usableCubageProportion = ''
                    _this.usableWeightProportion = ''
                    _this.stopIn = ''

                    _this.remainderMaxNumber = ''
                    _this.remainderMaxCubage = ''
                    _this.remainderMaxWeight = ''
                    _this.stopOut = ''

                    _this.remark = ''
                    _this.submitUrl = '/wms-base-server/location/save'
                }
            },
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            save() {
                // 先校验数据是否有效
                //debugger
                //alert("url:  "+_this.submitUrl)
                if (_this.goodspositionLength.length < 1) {
                    _this.$alert('请录入长度！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.goodspositionWidth.length < 1) {
                    _this.$alert('请录入宽度！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.goodspositionHeight.length < 1) {
                    _this.$alert('请录入高度！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }

                var locationData = {
                    "warehouseId": _this.warehouseId,
                    "warehouseAreaId": _this.warehouseAreaId,
                    "goodspositionCode": _this.goodspositionCode,
                    "goodspositionBarCode": _this.goodspositionBarCode,

                    "goodspositionOrder": _this.goodspositionOrder,
                    "goodspositionStatus": _this.goodspositionStatus,
                    "goodsShelvesType": _this.goodsShelvesType,
                    "warehouseAreaType": _this.warehouseAreaType,

                    "useAttrbute": _this.useAttrbute,
                    "goodsAttrbute": _this.goodsAttrbute,
                    "refund": _this.refund,
                    "replenishment": _this.replenishment,

                    "goodsClass": _this.goodsClass,
                    "circulation": _this.circulation,
                    "storeSpec": _this.storeSpec,
                    "onepositionOneclass": _this.onepositionOneclass,

                    "onepositionOneowner": _this.onepositionOneowner,
                    "goodsAbc": _this.goodsAbc,
                    "floor": _this.floor,

                    "goodspositionLength": _this.goodspositionLength,
                    "goodspositionWidth": _this.goodspositionWidth,
                    "goodspositionHeight": _this.goodspositionHeight,
                    "isValuable": _this.isValuable,

                    "usableMaxNumber": _this.usableMaxNumber,
                    "usableMaxCubage": _this.usableMaxCubage,
                    "usableMaxWeight": _this.usableMaxWeight,
                    "goodspositionCubage": _this.goodspositionCubage,

                    "usableNumberProportion": _this.usableNumberProportion,
                    "usableCubageProportion": _this.usableCubageProportion,
                    "usableWeightProportion": _this.usableWeightProportion,
                    "stopIn": _this.stopIn,

                    "remainderMaxNumber": _this.remainderMaxNumber,
                    "remainderMaxCubage": _this.remainderMaxCubage,
                    "remainderMaxWeight": _this.remainderMaxWeight,
                    "stopOut": _this.stopOut,

                    "remark": _this.remark,
                    "createUser": _this.transData.createUser,
                    "id":_this.transData.locationId,
                    "updateUser":_this.transData.updateUser,
                    "warehouseId":_this.transData.warehouseId

                }

                /*
                *
                * 此处写调用api，保存user对象
                * 如果保存失败，则给出相应提示
                * */
                _this.$request({
                    url: _this.submitUrl,
                    context: _this,
                    sendData: locationData,
                    successCallback: (_this, response) => {
                        //alert(response)
                        _this.$emit('saved', response)
//                        if(response.status.statusCode === 0){
//                            _this.$alert('操作成功', '', {
//                                type: 'success',
//                                closeOnClickModal: true,
//                                showConfirmButton: false,
//                                showCancelButton: false
//                            })
//                            // 保存成功，触发事件saved
//                            _this.$emit('saved')
//                        }else{
//                            _this.$alert('操作错误', response.status.statusReason, {
//                                type: 'error',
//                                closeOnClickModal: true,
//                                showConfirmButton: false,
//                                showCancelButton: false
//                            })
//                        }

                    }
                })

                // 保存成功，触发事件saved
                //_this.$emit('saved')

                // 也可以触发事件时返回一些参数
                // _this.$emit('saved', user)
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .wms-popup {
        padding: 16px;
        .vehicle-find {
            margin-bottom: 10px;
            .inblock {
                margin-right: 10px;
            }
        }
        .vehicle-foot {
            position: absolute;
            bottom: 10px;
            right: 20px;
        }
    }
</style>
