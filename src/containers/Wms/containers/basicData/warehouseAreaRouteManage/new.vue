<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">仓库名称</span>
                    <el-input type="text" v-model="warehouseAreaRoute.warehouseId" class="license-number"
                              placeholder="仓库名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">线路编码</span>
                    <el-input type="text" v-model="warehouseAreaRoute.routeCode" class="license-number"
                              placeholder="线路编码"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">线路名称</span>
                    <el-input type="text" v-model="warehouseAreaRoute.routeName" class="license-number"
                              placeholder="线路名称"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">发货集货暂存区</span>
                    <el-select v-model="warehouseAreaRoute.collectAreaId" placeholder="请选择">
                        <el-option
                            v-for="collectArea in collectOptions"
                            :key="collectArea.id"
                            :label="collectArea.warehouseAreaCode"
                            :value="collectArea.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">发货暂存区</span>
                    <el-select v-model="warehouseAreaRoute.sendoutAreaId" placeholder="请选择">
                        <el-option
                            v-for="sendoutArea in sendoutOptions"
                            :key="sendoutArea.id"
                            :label="sendoutArea.warehouseAreaCode"
                            :value="sendoutArea.id">
                        </el-option>
                    </el-select>
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
        saveUrl: '/wms-base-server/warehouseAreaRoute/save'
    }

    export default {
        created() {
            _this = this
            _this.api = api
        },
        props: {
            collectList: {
                type: Object,
                default: null
            },
            sendoutList:{
                type: Object,
                default: null
            }
        },
        watch: {
            // 监听value值变化，从而去加载需要编辑的数据
            collectList() {
                _this.loadCollectList()
            },
            sendoutList(){
                _this.loadSendoutList()
            }
        },
        data() {
            return {
                warehouseAreaRoute: {
                    warehouseId:'2000',
                    routeCode:'',
                    routeName: '',
                    collectAreaId:'',
                    sendoutAreaId:''
                },
                collectArea:{
                    id:"",
                    warehouseAreaCode:''
                },
                sendoutArea:{
                    id:"",
                    warehouseAreaCode:''
                },
                collectOptions:[],
                sendoutOptions:[]
            }
        },
        methods: {
            loadCollectList() {
                // 如果传入了用户id，则标识需要编辑指定的用户
                if (_this.collectList.length > 0) {
                    _this.collectOptions=_this.collectList
                }
            },
            loadSendoutList() {
                // 如果传入了用户id，则标识需要编辑指定的用户
                if (_this.sendoutList.length > 0) {
                    debugger
                    _this.sendoutOptions=_this.sendoutList
                }
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
                if (_this.warehouseAreaRoute.warehouseId===undefined||_this.warehouseAreaRoute.warehouseId==='') {
                    _this.$alert('请填写仓库信息！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.warehouseAreaRoute.routeCode===undefined||_this.warehouseAreaRoute.routeCode==='') {
                    _this.$alert('请输入线路编码！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.warehouseAreaRoute.routeName===undefined||_this.warehouseAreaRoute.routeName==='') {
                    _this.$alert('请输入线路名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.warehouseAreaRoute.collectAreaId===undefined||_this.warehouseAreaRoute.collectAreaId==='') {
                    _this.$alert('请输入发货集货暂存区！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    // 验证失败，则return，否则下面的代码就要放在else里
                    return
                }
                if (_this.warehouseAreaRoute.sendoutAreaId===undefined||_this.warehouseAreaRoute.sendoutAreaId==='') {
                    _this.$alert('请输入集货暂存区！', '', {
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
                    "warehouseId": _this.warehouseAreaRoute.warehouseId,
                    "routeCode":_this.warehouseAreaRoute.routeCode,
                    "routeName":_this.warehouseAreaRoute.routeName,
                    "collectAreaId":_this.warehouseAreaRoute.collectAreaId,
                    "sendoutAreaId":this.warehouseAreaRoute.sendoutAreaId
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
