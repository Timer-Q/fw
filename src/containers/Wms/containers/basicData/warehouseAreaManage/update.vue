<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">库区名称</span>
                    <el-input type="text" v-model="warehouseArea.warehouseAreaName" class="license-number"
                              placeholder="请输入库区名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库区编码</span>
                    <el-input type="text" v-model="warehouseArea.warehouseAreaCode" class="license-number"
                              placeholder="系统自动生成" readonly="readonly"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库区类型</span>
                    <el-select v-model="warehouseArea.warehouseAreaType" placeholder="请选择">
                        <el-option
                            v-for="item in warehouseAreaTypeOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">用途属性</span>
                    <el-select v-model="warehouseArea.useAttrbute" placeholder="请选择">
                        <el-option
                            v-for="item in useAttrbuteOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">货物属性</span>
                    <el-select v-model="warehouseArea.goodsAttrbute" placeholder="请选择">
                        <el-option
                            v-for="item in goodsAttrbuteOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">退货属性</span>
                    <el-select v-model="warehouseArea.refund" placeholder="请选择">
                        <el-option
                            v-for="item in refundOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">补货属性</span>
                    <el-select v-model="warehouseArea.replenishment" placeholder="请选择">
                        <el-option
                            v-for="item in replenishmentOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">存储属性</span>
                    <el-select v-model="warehouseArea.circulation" placeholder="请选择">
                        <el-option
                            v-for="item in circulationOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">商品品类</span>
                    <el-select v-model="warehouseArea.goodsClass" placeholder="请选择">
                        <el-option
                            v-for="item in goodsClassOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">一位一品属性</span>
                    <el-select v-model="warehouseArea.onepositionOneclass" placeholder="请选择">
                        <el-option
                            v-for="item in onepositionOneclassOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">一位一货主</span>
                    <el-select v-model="warehouseArea.onepositionOneowner" placeholder="请选择">
                        <el-option
                            v-for="item in onepositionOneownerOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">温控属性</span>
                    <el-select v-model="warehouseArea.temperatureControl" placeholder="请选择">
                        <el-option
                            v-for="item in temperatureControlOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">存储规格</span>
                    <el-select v-model="warehouseArea.storeSpec" placeholder="请选择">
                        <el-option
                            v-for="item in storeSpecOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">商品ABC分类</span>
                    <el-select v-model="warehouseArea.goodsAbc" placeholder="请选择">
                        <el-option
                            v-for="item in goodsAbcOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">隶属楼层</span>
                    <el-input type="text" v-model="warehouseArea.floor" class="license-number"
                              placeholder="请输入隶属楼层"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库区序号</span>
                    <el-input type="text" v-model="warehouseArea.warehouseAreaNo" class="license-number"
                              placeholder="系统自动生成" readonly="readonly"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">停止移入</span>
                    <el-select v-model="warehouseArea.stopIn" placeholder="请选择">
                        <el-option
                            v-for="item in stopInOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">停止移出</span>
                    <el-select v-model="warehouseArea.stopOut" placeholder="请选择">
                        <el-option
                            v-for="item in stopInOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <br/>
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="textarea" v-model="warehouseArea.remark" class="license-number"
                              placeholder="请输入备注"></el-input>
                </div>
            </div>

            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="save">保存</el-button>
                    <el-button @click="save">保存新增</el-button>
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
        save: "/wms-base-server/warehousearea/update",
        getOne: "/wms-base-server/warehousearea/get"
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        mounted() {
            _this.loadPlatform()
        },
        data() {
            return {
                // 新增或者编辑用户，绑定到页面
                warehouseArea: {
                    warehouseId: "2000",
                    warehouseAreaCode: "",
                    warehouseAreaName: "",
                    warehouseAreaType: 0,
                    useAttrbute: 0,
                    goodsAttrbute: 0,
                    refund: 0,
                    replenishment: 0,
                    goodsClass: 0,
                    circulation: 0,
                    onepositionOneclass: 0,
                    onepositionOneowner: 0,
                    temperatureControl: 0,
                    storeSpec: 0,
                    goodsAbc: 0,
                    floor: "",
                    warehouseAreaNo: "",
                    stopIn: 0,
                    stopOut: 0,
                    remark: "",
                    createUser: "1",
                    updateUser: "1"
                },
                warehouseAreaTypeOptions: [{
                    value: 1,
                    label: '备货区'
                }, {
                    value: 2,
                    label: '暂存区'
                }, {
                    value: 3,
                    label: '残品区'
                }, {
                    value: 4,
                    label: '托盘区'
                }, {
                    value: 5,
                    label: '工具区'
                }, {
                    value: 6,
                    label: '耗材区'
                }, {
                    value: 7,
                    label: '拣选区'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                useAttrbuteOptions: [{
                    value: 1,
                    label: '质检'
                }, {
                    value: 2,
                    label: '拣选'
                }, {
                    value: 3,
                    label: '备货'
                }, {
                    value: 4,
                    label: '移仓'
                }, {
                    value: 5,
                    label: '退货'
                }, {
                    value: 6,
                    label: '销退'
                }, {
                    value: 7,
                    label: '包装'
                }, {
                    value: 8,
                    label: '分拨'
                }, {
                    value: 9,
                    label: '发运'
                }, {
                    value: 10,
                    label: '取消'
                }, {
                    value: 11,
                    label: '缺货'
                }, {
                    value: 12,
                    label: '预退'
                }, {
                    value: 13,
                    label: '收货'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                goodsAttrbuteOptions: [{
                    value: 1,
                    label: '正品'
                }, {
                    value: 2,
                    label: '残品'
                }, {
                    value: 3,
                    label: '不限'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                refundOptions: [{
                    value: 1,
                    label: '可退'
                }, {
                    value: 2,
                    label: '不可退'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                replenishmentOptions: [{
                    value: 1,
                    label: '可补'
                }, {
                    value: 2,
                    label: '不可补'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                circulationOptions: [{
                    value: 1,
                    label: '存货'
                }, {
                    value: 2,
                    label: '暂存'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                goodsClassOptions: [{
                    value: 1,
                    label: '日用品'
                }, {
                    value: 2,
                    label: '化妆品'
                }, {
                    value: 3,
                    label: '办公用品'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                onepositionOneclassOptions: [{
                    value: 1,
                    label: '一位一品'
                }, {
                    value: 2,
                    label: '一位多品'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                onepositionOneownerOptions: [{
                    value: 1,
                    label: '一位一货主'
                }, {
                    value: 2,
                    label: '一位多货主'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                temperatureControlOptions: [{
                    value: 1,
                    label: '恒温'
                }, {
                    value: 2,
                    label: '常温'
                }, {
                    value: 3,
                    label: '冷冻'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                storeSpecOptions: [{
                    value: 1,
                    label: '整箱'
                }, {
                    value: 2,
                    label: '异型'
                }, {
                    value: 3,
                    label: '拆零'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                goodsAbcOptions: [{
                    value: 1,
                    label: 'A'
                }, {
                    value: 2,
                    label: 'B'
                }, {
                    value: 3,
                    label: 'C'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                stopInOptions: [{
                    value: 1,
                    label: '否'
                }, {
                    value: 2,
                    label: '是'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                warehouseAreaBack: {},
            }
        },
        mounted() {
            _this.warehouseAreaBack = JSON.stringify(_this.warehouseArea)
        },
        methods: {
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            loadPlatform() {
                if (_this.value.length > 0) {
                    // 调用接口，获取指定id的用户，假设服务返回了user对象
                    var requestData = {
                        "id": _this.value,
                        "warehouseId": "2000"
                    }
                    _this.$request({
                        url: _this.api.getOne,
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            // 绑定到界面
                            _this.warehouseArea = response
                        }
                    })
                }
            },
            save() {
                // 先校验数据是否有效
                if (_this.warehouseArea.length < 1) {
                    _this.$alert('请录入信息！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })

                    // 验证失败，则return，否则下面的代码就要放在else里

                    return
                }
                if (_this.warehouseArea.warehouseAreaName.trim().length < 1) {
                    _this.$alert('请录入库区名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.warehouseAreaType.length < 1) {
                    _this.$alert('请录入库区类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.useAttrbute.length < 1) {
                    _this.$alert('请选择用途属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.goodsAttrbute.length < 1) {
                    _this.$alert('请选择货物属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.refund.length < 1) {
                    _this.$alert('请选择退货属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.replenishment.length < 1) {
                    _this.$alert('请选择补货属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.goodsClass.length < 1) {
                    _this.$alert('请选择商品品类！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.circulation.length < 1) {
                    _this.$alert('请选择存储属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.onepositionOneclass.length < 1) {
                    _this.$alert('请选择一位一品属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.onepositionOneowner.length < 1) {
                    _this.$alert('请选择一位一货主！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouseArea.goodsAbc.length < 1) {
                    _this.$alert('请选择商品ABC分类！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                let warehouseArea = _this.warehouseArea
                _this.$request({
                    url: _this.api.save,
                    context: _this,
                    sendData: this.warehouseArea,
                    successCallback: (_this, response) => {
                        _this.warehouse = JSON.parse(_this.warehouseBack)
                        _this.$alert('操作成功', '操作成功！！！', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                            showCancelButton: true
                        })
                        _this.$emit('saved')
                    },
                    failCallback: (_this, e) => {
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
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
