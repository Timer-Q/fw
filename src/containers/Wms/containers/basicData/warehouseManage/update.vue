<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">仓库名称</span>
                    <el-input type="text" v-model="warehouse.warehouseName" class="license-number"
                              placeholder="请输入仓库名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">仓库编码</span>
                    <el-input type="text" v-model="warehouse.warehouseCode" class="license-number"
                              placeholder="系统自动生成" readonly="readonly"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">物流园区</span>
                    <el-input type="text" v-model="warehouse.wmsZone" class="license-number"
                              placeholder="请输入物流园区"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">所属单位</span>
                    <el-input type="text" v-model="warehouse.warehouseCompanyId" class="license-number"
                              placeholder="请输入所属单位"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库房数量</span>
                    <el-input type="text" v-model="warehouse.storehouseCount" class="license-number"
                              placeholder="请输入库房数量"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">仓库属性</span>
                    <el-select v-model="warehouse.warehouseProperty" placeholder="请选择">
                        <el-option
                            v-for="item in warehousePropertyOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">仓库性质</span>
                    <el-select v-model="warehouse.warehouseNature" placeholder="请选择">
                        <el-option
                            v-for="item in warehouseNatureOptions"
                            :key="item.label + item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">仓库面积</span>
                    <el-input type="text" v-model="warehouse.warehouseCubage" class="license-number"
                              placeholder="请输入仓库面积">
                        <template slot="append">㎡</template>
                    </el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">联系人</span>
                    <el-input type="text" v-model="warehouse.contactName" class="license-number"
                              placeholder="请输入联系人"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">联系人电话</span>
                    <el-input type="text" v-model="warehouse.contactPhoneNo" class="license-number"
                              placeholder="请输入联系人电话"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">联系人邮箱</span>
                    <el-input type="text" v-model="warehouse.contactEmail" class="license-number"
                              placeholder="请输入联系人邮箱"></el-input>
                </div>
                <br/>
                <div class="inblock">
                    <span class="hspace">仓库所在地</span>
                    <el-input type="text" v-model="warehouse.warehouseCompanyId" class="license-number"
                              placeholder="请输入仓库所在地"></el-input>
                </div>
                <br/>
                <div class="inblock">
                    <span class="hspace">详细地址</span>
                    <el-input type="text" v-model="warehouse.address" class="license-number"
                              placeholder="请输入详细地址"></el-input>
                </div>
                <br/>
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="textarea" v-model="warehouse.remark" class="license-number"
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
        update: "/wms-base-server/warehouse/update",
        getOne: "/wms-base-server/warehouse/get"
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
                warehouse: {
                    warehouseName: "",
                    warehouseCode: "",
                    wmsZone: "",
                    warehouseCompanyId: "1",
                    storehouseCount: "1",
                    warehouseProperty: 0,
                    warehouseNature: 0,
                    warehouseCubage: "",
                    contactName: "",
                    contactPhoneNo: "",
                    contactEmail: "",
                    country: "1",
                    province: "1",
                    city: "1",
                    district: "1",
                    street: "1",
                    address: "",
                    remark: ""
                },
                warehousePropertyOptions: [{
                    value: 1,
                    label: '自有'
                }, {
                    value: 2,
                    label: '加盟'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                warehouseNatureOptions: [{
                    value: 1,
                    label: '自有'
                }, {
                    value: 2,
                    label: '租赁'
                }, {
                    value: 0,
                    label: '请选择'
                }],
                warehouseBack: {},
            }
        },
        mounted() {
            _this.warehouseBack = JSON.stringify(_this.warehouse)
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
                        "id": _this.value
                    }
                    _this.$request({
                        url: _this.api.getOne,
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            // 绑定到界面
                            _this.warehouse = response
                        }
                    })
                }
            },
            save() {
                // 先校验数据是否有效
                if (_this.warehouse.length < 1) {
                    _this.$alert('请录入信息！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })

                    // 验证失败，则return，否则下面的代码就要放在else里

                    return
                }
                if (_this.warehouse.warehouseName.trim().length < 1) {
                    _this.$alert('请录入仓库名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouse.storehouseCount.length < 1) {
                    _this.$alert('请录入库房数量！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouse.warehouseProperty.length < 1) {
                    _this.$alert('请选择仓库属性！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouse.warehouseNature.length < 1) {
                    _this.$alert('请选择仓库性质！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouse.contactName.trim().length < 1) {
                    _this.$alert('请录入联系人！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.warehouse.contactPhoneNo.trim().length < 1) {
                    _this.$alert('请录入联系人电话！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                let warehouse = _this.warehouse
                _this.$request({
                    url: _this.api.update,
                    context: _this,
                    sendData: this.warehouse,
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
