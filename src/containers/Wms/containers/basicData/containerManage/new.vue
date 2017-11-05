<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">仓库信息</span>
                    <el-select v-model="container.warehouseId" placeholder="河北廊坊仓">
                        <el-option
                            v-for="item in warehouseOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">容器编码</span>
                    <el-input type="text" v-model="container.containerCode" class="license-number"
                              placeholder="容器编码"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">容器类型</span>
                    <el-select v-model="container.containerTypeId" @change="queryContainerType" placeholder="木质托盘">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">容器类别</span>
                    <el-select v-model="container.containerCategory" placeholder="播种墙">
                        <el-option
                            v-for="item in categoryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">长度</span>
                    <el-input type="text" v-model="containerType.containerLength" class="license-number" :readonly="true"
                    ></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">宽度</span>
                    <el-input type="text" v-model="containerType.containerWidth" class="license-number" :readonly="true"
                    ></el-input>cm
                </div>
                <div class="inblock">
                    <span class="hspace">高度</span>
                    <el-input type="text" v-model="containerType.containerHeight" class="license-number" :readonly="true"
                    ></el-input>cm
                </div>
                <div class="inblock">
                    <span class="hspace">体积</span>
                    <el-input type="text" v-model="containerType.containerCubage" class="license-number" :readonly="true"
                    ></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">最大承重</span>
                    <el-input type="text" class="license-number" :readonly="true"
                    ></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">备注</span>
                    <el-input type="text" v-model="container.remark" class="license-number"
                    ></el-input>
                </div>

            </div>

            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script type="es6">
    let _this
    let api = {
        saveUrl: '/wms-base-server/container/save'
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
                container: {
                    warehouseId:'2000',
                    warehouseCompanyId:'1',
                    containerCode: '',
                    containerTypeId:'',
                    containerCategory:'',
                    remark: '',
                    createUser:111
                },
                containerType:{
                    warehouseId:'2000',
                    id:'',
                    containerLength:'',
                    containerWidth:'',
                    containerHeight:'',
                    containerCubage:'',
                    maxBearing:'',
                },
                warehouseOptions:[
                    {
                        value:1,
                        label:"河北廊坊仓"
                    },
                    {
                        value:2,
                        label:"天津武清仓"
                    }
                ],
                typeOptions:[
                    {
                        value:1,
                        label:"木质托盘"
                    },
                    {
                        value:2,
                        label:"A类周转箱"
                    },
                    {
                        value:3,
                        label:"超市购物车"
                    },
                    {
                        value:4,
                        label:"15格播种墙"
                    },
                    {
                        value:5,
                        label:"20格集货车"
                    }
                ],
                categoryOptions:[
                    {
                        value:1,
                        label:"托盘"
                    },
                    {
                        value:2,
                        label:"周转箱"
                    },
                    {
                        value:3,
                        label:"拣货车"
                    },
                    {
                        value:4,
                        label:"播种墙"
                    },
                    {
                        value:5,
                        label:"集货车"
                    }
                ]
            }
        },
        methods: {
            cancel() {
                this.$confirm('是否确认要取消？', '取消确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 触发事件cancel
                    _this.$emit('cancel')
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                })
            },
            save() {
                // 先校验数据是否有效
                if (_this.container.warehouseId.length < 1) {
                    _this.$alert('请填写仓库信息！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.container.containerCode.length < 1) {
                    _this.$alert('请输入容器编码！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.container.containerTypeId.length < 1) {
                    _this.$alert('请选择容器类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.container.containerCategory.length < 1) {
                    _this.$alert('请选择容器类别！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }

                /*
                *
                * 此处写调用api，保存user对象
                * 如果保存失败，则给出相应提示
                *
                * 假设保存成功了
                *
                * */
                var requestData = {
                    "warehouseId": _this.container.warehouseId,
                    "containerCode": _this.container.containerCode,
                    "containerTypeId": _this.container.containerTypeId,
                    "containerCategory": _this.container.containerCategory,
                    "warehouseCompanyId":_this.container.warehouseCompanyId,
                    "remark": _this.container.remark
                }
                _this.$request({
                    url: api.saveUrl,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('操作成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        // 保存成功，触发事件saved
                        _this.$emit('saved')
                    },
                    failCallback:(_this,e)=>{
                        console.error('save:',e)
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            },
            queryContainerType: function () {
                var requestData={
                    "warehouseId":_this.container.warehouseId,
                    "id":_this.container.containerTypeId
                }
                _this.$request({
                    // /wms-base-server/containerType/get
                    url: '/wms-base-server/containerType/get',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.containerType=response

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
