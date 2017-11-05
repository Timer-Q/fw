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
                    <span class="hspace">货位状态</span>
                    <el-input type="text" v-model="goodspositionStatus" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">初始牌号</span>
                    <el-input type="text" v-model="goodsPositionInitRow" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">排数</span>
                    <el-input type="text" v-model="goodsPositionRowNumber" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">初始组号</span>
                    <el-input type="text" v-model="goodsPositionInitGroup" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">初始层号</span>
                    <el-input type="text" v-model="goodsPositionInitLayer" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">初始位号</span>
                    <el-input type="text" v-model="goodsPositionInitDigit" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">组数</span>
                    <el-input type="text" v-model="goodsPositionGroupNumber" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">层数</span>
                    <el-input type="text" v-model="goodsPositionLayerNumber" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">位数</span>
                    <el-input type="text" v-model="goodsPositionDigitNumber" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">货架类型</span>
                    <el-input type="text" v-model="goodsShelvesType" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货区类别</span>
                    <el-input type="text" v-model="warehouseAreaType" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">用途属性</span>
                    <el-input type="text" v-model="useAttrbute" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">货物属性</span>
                    <el-input type="text" v-model="goodsAttrbute" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">退货属性</span>
                    <el-input type="text" v-model="refund" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">补货属性</span>
                    <el-input type="text" v-model="replenishment" class="license-number"
                              placeholder="请输入"></el-input>
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
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">一位一品属性</span>
                    <el-input type="text" v-model="onepositionOneclass" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">一位一货属性</span>
                    <el-input type="text" v-model="onepositionOneowner" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">存储规格</span>
                    <el-input type="text" v-model="storeSpec" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">商品ABC分类</span>
                    <el-input type="text" v-model="goodsAbc" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">隶属楼层</span>
                    <el-input type="text" v-model="floor" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">贵重物品</span>
                    <el-input type="text" v-model="isValuable" class="license-number"
                              placeholder="请输入"></el-input>
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
                    <el-input type="text" v-model="goodspositionHeight" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">容积(m³)</span>
                    <el-input type="text" v-model="goodspositionCubage" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">可用最大重量(kg)</span>
                    <el-input type="text" v-model="usableMaxWeight" class="license-number"
                              placeholder="请输入"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">可用重量比例</span>
                    <el-input type="text" v-model="usableWeightProportion" class="license-number"
                              placeholder="请输入"></el-input>
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
                    <span class="hspace">剩余最大重量(kg)</span>
                    <el-input type="text" v-model="remainderMaxWeight" class="license-number"
                              placeholder="请输入"></el-input>
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
                    <span class="hspace">停止移入</span>
                    <el-input type="text" v-model="stopIn" class="license-number"
                              placeholder="请输入"></el-input>
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
                    <span class="hspace">停止移出</span>
                    <el-input type="text" v-model="stopOut" class="license-number"
                              placeholder="请输入"></el-input>
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
        props: ['transData','createUser','warehouseId','updateUser'],
        data() {
            return {
                submitUrl:'/wms-base-server/location/batchAdd',
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

                createUser: _this.transData.createUser,
                id:_this.transData.locationId,
                updateUser: _this.transData.updateUser
            }
        },
//        watch: {
//            // 监听value值变化，从而去加载需要编辑的数据
//            value() {
//                _this.loadDataInfo()
//            }
//        },
        methods: {
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

                    'goodsPositionInitRow' : _this.goodsPositionInitRow,
                    'goodsPositionRowNumber' : _this.goodsPositionRowNumber,
                    'goodsPositionInitGroup' : _this.goodsPositionInitGroup,
                    'goodsPositionGroupNumber' : _this.goodsPositionGroupNumber,
                    'goodsPositionInitLayer' : _this.goodsPositionInitLayer,
                    'goodsPositionLayerNumber' : _this.goodsPositionLayerNumber,
                    'goodsPositionInitDigit' : _this.goodsPositionInitDigit,
                    'goodsPositionDigitNumber' : _this.goodsPositionDigitNumber,

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
                        alert(response)
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
