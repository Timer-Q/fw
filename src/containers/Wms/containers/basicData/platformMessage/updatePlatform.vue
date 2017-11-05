<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">月台名称</span>
                    <el-input type="text" v-model="platformName" class="license-number"
                              placeholder="请输入月台名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">月台吞吐量</span>
                    <el-input type="text" v-model="throughput" class="license-number"
                              placeholder="月台吞吐量"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">是否提供升降平台</span>
                    <el-select v-model="isLiftPlatform" placeholder="是否提供升降平台">
                        <el-option
                            v-for="item in confirmStatusList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value" class="selectFontSize">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">停靠上线</span>
                    <el-input type="text" v-model="maxParkingSpace" class="license-number"
                              placeholder="停靠上线"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">使用顺序</span>
                    <el-input type="text" v-model="usingOrder" class="license-number"
                              placeholder="使用顺序"></el-input>
                </div>
                <br/>
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="text" v-model="remark" class="textarea-prompt"
                              placeholder="备注"></el-input>
                </div>
            </div>
            <div class="inblock">
                <span class="hspace">月台类型</span>
                <el-select v-model="businessType" placeholder="月台类型">
                    <el-option
                        v-for="item in bussinessTypeList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value" class="selectFontSize">
                    </el-option>
                </el-select>
            </div>
            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="update">修改</el-button>
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
        updateUrl: '/wms-base-server/platform/update'
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        // props为固定写法，用来从父组件获取一个参数
        // 如果需要获取的参数不只一个，来咨询一下
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                platformName: null,
                throughput: null,
                isLiftPlatform: null,
                maxParkingSpace: null,
                usingOrder: null,
                businessType: null,
                remark: "",
                bussinessTypeList: [],//业务类型枚举
                confirmStatusList: [],//是否枚举
            }
        },
        methods: {
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            update() {
                if (!_this.check()) {
                    return
                }
                var updatePlatform = {
                    "id": _this.value,
                    "platformName": _this.platformName,
                    "throughput": _this.throughput,
                    "isLiftPlatform": _this.isLiftPlatform,
                    "maxParkingSpace": _this.maxParkingSpace,
                    "usingOrder": _this.usingOrder,
                    "businessType": _this.businessType,
                    "remark": _this.remark,
                }
                _this.$request({
                    url: _this.api.updateUrl,
                    context: _this,
                    sendData: updatePlatform,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        // 保存成功，触发事件saved
                        _this.$emit('saved')
                    }
                })
            },
            loadPlatform() {
                if (typeof _this.value === 'string' && _this.value.length > 0) {
                    // 调用接口，获取指定id的用户，假设服务返回了user对象
                    var requestData = {
                        "id": _this.value,
                        "warehouseId": this.warehouseId
                    }
                    _this.$request({
                        url: '/wms-base-server/platform/get',
                        context: _this,
                        sendData: requestData,
                        successCallback: (_this, response) => {
                            // 绑定到界面
                            _this.platformName = response.platformName
                            _this.platformCode = response.platformCode
                            _this.throughput = response.throughput
                            _this.isLiftPlatform = response.isLiftPlatform
                            _this.maxParkingSpace = response.maxParkingSpace
                            _this.usingOrder = response.usingOrder
                            _this.businessType = response.businessType
                            _this.remark = response.remark
                        }
                    })
                } else {
                    _this.platformName = ''
                    _this.platformCode = ''
                    _this.throughput = ''
                    _this.isLiftPlatform = ''
                    _this.maxParkingSpace = ''
                    _this.usingOrder = ''
                    _this.businessType = ''
                    _this.remark = ''
                }
            },
            getEnums() {
                var requestData = [{
                    "key": "bussinessType"
                }, {
                    "key": "confirmStatus"
                }]
                _this.$request({
                    url: '/wms-pub-server/public/getEnums',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.bussinessTypeList = response[0].enumList
                        _this.confirmStatusList = response[1].enumList
                    }
                })
            },
            check() {
                // 先校验数据是否有效
                if (_this.platformName.length < 1) {
                    _this.$alert('请录入platform台名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.throughput.length < 1) {
                    _this.$alert('请录入月台吞吐量 ！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.isLiftPlatform.length < 1) {
                    _this.$alert('请选择是否提供升降平台！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.maxParkingSpace.length < 1) {
                    _this.$alert('请录入停靠上线！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.usingOrder.length < 1) {
                    _this.$alert('请录入使用顺序！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.businessType.length < 1) {
                    _this.$alert('请选择业务类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                return true
            }
        },
        watch: {
            // 监听value值变化，从而去加载需要编辑的数据
            value() {
                _this.loadPlatform()
            }
        },
        mounted() {
            _this.loadPlatform()
            _this.getEnums()
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
            platformition: absolute;
            bottom: 10px;
            right: 20px;
        }
    }
</style>
