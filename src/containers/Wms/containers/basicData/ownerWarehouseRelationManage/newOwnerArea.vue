<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">货主</span>
                    <el-select v-model="containerType.warehouseId" placeholder="请选择">
                        <el-option
                            v-for="item in ownerOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">货物属性</span>
                    <el-select v-model="containerType.containerCategory" placeholder="">
                        <el-option
                            v-for="item in attributeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">货物属性</span>
                    <el-select v-model="containerType.containerCategory" placeholder="">
                        <el-option
                            v-for="item in attributeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">是否自用</span>
                    <el-checkbox v-model="containerType.isContainerCheck" true-label="2" false-label="1"></el-checkbox>
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
        saveUrl: '/wms-base-server/ownerWarehousereRation/save'
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
                ownerWarehouseRelationManage:{
                    warehouseId:'2000',
                    ownerId:'',
                    goodsAttribute:'',
                    warehouseAreaId:''
                },
                attributeOptions:[
                    {
                        value:1,
                        label:"正品"
                    },
                    {
                        value:2,
                        label:"残品"
                    }
                ]
            }
        },
        methods: {
            getArea(){
                _this.$request({
                    url: api.saveUrl,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('保存成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        // 保存成功，触发事件saved
                        _this.$emit('saved')
                    },
                    failCallback:(_this,e)=>{
                        console.error('保存失败:',e)
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            },
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
                if (_this.containerType.warehouseId === undefined || _this.containerType.warehouseId ==='') {
                    _this.$alert('请填写仓库信息！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.containerCategory === undefined || _this.containerType.containerCategory==='') {
                    _this.$alert('请输入容器类别！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.containerType === undefined||_this.containerType.containerType==='') {
                    _this.$alert('请输入容器类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.containerLength=== undefined||_this.containerType.containerLength==='') {
                    _this.$alert('请类输入长度！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.containerWidth=== undefined||_this.containerType.containerWidth==='') {
                    _this.$alert('请类输入宽度！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.containerHeight=== undefined||_this.containerType.containerHeight==='') {
                    _this.$alert('请类输入高度！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.containerCubage=== undefined||_this.containerType.containerCubage==='') {
                    _this.$alert('请类输入体积！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.maxBearing=== undefined||_this.containerType.maxBearing==='') {
                    _this.$alert('请类输入最大承重量！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.containerType.isContainerCheck===undefined||_this.containerType.isContainerCheck===''){
                    _this.$alert('请类输入最大承重量！', '', {
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
                    "warehouseId": _this.containerType.warehouseId,
                    "warehouseCompanyId":_this.containerType.warehouseCompanyId,
                    "containerType": _this.containerType.containerType,
                    "containerCategory": _this.containerType.containerCategory,
                    "containerLength":_this.containerType.containerLength,
                    "containerWidth":_this.containerType.containerWidth,
                    "containerHeight":_this.containerType.containerHeight,
                    "containerCubage":_this.containerType.containerCubage,
                    "maxBearing":_this.containerType.maxBearing,
                    "isContainerCheck":_this.containerType.isContainerCheck,
                    "containerRow":_this.containerType.containerRow,
                    "containerColumn":_this.containerType.containerColumn,
                    "checkOrder":_this.containerType.checkOrder,
                    "remark": _this.containerType.remark
                }
                _this.$request({
                    url: api.saveUrl,
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert('保存成功', '', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        })
                        // 保存成功，触发事件saved
                        _this.$emit('saved')
                    },
                    failCallback:(_this,e)=>{
                        console.error('保存失败:',e)
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
