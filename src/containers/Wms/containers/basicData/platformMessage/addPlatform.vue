<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">月台名称</span>
                    <el-input type="text" v-model="savePlatform.platformName" class="license-number"
                              placeholder="请输入月台名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">月台吞吐量</span>
                    <el-input type="text" v-model="savePlatform.throughput" class="license-number"
                              placeholder="月台吞吐量"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">是否提供升降平台</span>
                    <el-select v-model="savePlatform.isLiftPlatform" placeholder="是否提供升降平台">
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
                    <el-input type="text" v-model="savePlatform.maxParkingSpace" class="license-number"
                              placeholder="停靠上线"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">使用顺序</span>
                    <el-input type="text" v-model="savePlatform.usingOrder" class="license-number"
                              placeholder="使用顺序"></el-input>
                </div>
                <br/>
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="text" v-model="savePlatform.remark" class="textarea-prompt"
                              placeholder="备注"></el-input>
                </div>
            </div>
            <div class="inblock">
                <span class="hspace">月台类型</span>
                <el-select v-model="savePlatform.businessType" placeholder="月台类型">
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
        saveUrl: '/wms-base-server/platform/save'
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
                // 空用户，备用
                savePlatform: {
                    warehouseId: "2000",
                    platformName: null,
                    throughput: null,
                    isLiftPlatform: null,
                    maxParkingSpace: null,
                    usingOrder: null,
                    businessType: null,
                    remark: "",
                },
                bussinessTypeList: [],//业务类型枚举
                confirmStatusList: [],//是否枚举
               /* businessTypes: [
                    {
                        value: 1,
                        label: "销售出库"
                    },
                    {
                        value: 2,
                        label: "收货入库"
                    },
                    {
                        value: 3,
                        label: "销退入库"
                    },
                    {
                        value: 4,
                        label: "退供出库"
                    }
                ]*/
            }
        },
        methods: {
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
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            save() {
                // 先校验数据是否有效
                if (_this.savePlatform.platformName.length < 1) {
                    _this.$alert('请录入platform台名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePlatform.throughput.length < 1) {
                    _this.$alert('请录入月台吞吐量 ！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePlatform.isLiftPlatform.length < 1) {
                    _this.$alert('请选择是否提供升降平台！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePlatform.maxParkingSpace.length < 1) {
                    _this.$alert('请录入停靠上线！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePlatform.usingOrder.length < 1) {
                    _this.$alert('请录入使用顺序！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePlatform.businessType.length < 1) {
                    _this.$alert('请选择业务类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }

                _this.$request({
                    url: api.saveUrl,
                    context: _this, //this
                    sendData: _this.savePlatform,
                    successCallback: (_this, response) => {
                        console.log('save:', response)
                        _this.$alert('操作成功', '操作成功！！！', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                            showCancelButton: true
                        })
                        _this.$emit('saved')
                    },
                    failCallback: (_this, e) => {
                        console.error('save:', e)
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            }
        },
        mounted() {
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
