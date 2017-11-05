<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">POS台编码</span>
                    <el-input v-model="savePos.posCode"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">POS台名称</span>
                    <el-input v-model="savePos.posName"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">POS台类型</span>
                    <el-select v-model="savePos.posType" placeholder="POS台类型">
                        <el-option
                            v-for="item in posTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" class="selectFontSize">
                        </el-option>
                    </el-select>
                </div>

            </div>

            <div class="vehicle-find">
                <p class="groupL-p groupL-pTextarea">
                    <span>备注</span>
                    <textarea name="" rows="" cols="" class="catagory-discribe"></textarea>
                    <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
                </p>
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
        saveUrl: '/wms-base-server/pos/save'
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
                savePos: {
                    warehouseId: "2000",
                    posCode: null,
                    posName: null,
                    posType: null,
                    remark:"",
                    createUser:111
                },
                posTypes: [
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
                ]
            }
        },
        methods: {
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            save() {
                // 先校验数据是否有效
                if (_this.savePos.posCode.length < 1) {
                    _this.$alert('请录入pos编码！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePos.posName.length < 1) {
                    _this.$alert('请录入pos台名称！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.savePos.posType.length < 1) {
                    _this.$alert('请录入类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }

                _this.$request({
                    url:api.saveUrl,
                    context:_this, //this
                    sendData:_this.savePos,
                    successCallback:(_this,response)=>{
                        console.log('save:',response)
                        _this.$alert('操作成功', '操作成功！！！', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                            showCancelButton: true
                        })
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
