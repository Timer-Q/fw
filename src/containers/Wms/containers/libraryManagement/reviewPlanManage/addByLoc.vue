<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">货位编码</span>
                    <el-input type="text" v-model="locationCode" class="license-number"
                              placeholder="货位编码" ></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">货位条码</span>
                    <el-input type="text" v-model="locationBarcode" class="license-number"
                              placeholder="货位条码" v-bind:readonly="isReadOnly"></el-input>
                </div>
            </div>
            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="cancel()">取消</el-button>
                    <el-button @click="saveAndAdd()">保存并新增</el-button>
                    <el-button @click="save()">保存</el-button>
                </div>
            </div>
        </div>
        <!--主体内容  end-->
    </div>
</template>
<script type="es6">
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    let _this
    let api = {
        saveUrl: '/wms-inside-server/reviewPlanDetail/save',
        deleteUrl: '/wms-inside-server/reviewPlanDetail/delete',
        getLoc: '/wms-inside-server/reviewPlanDetail/getLoc',

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
                locationCode: null,
                locationBarcode: null,
                isReadOnly:true,
            }
        },
        watch:{
            locationCode(){
                if (typeof _this.locationCode === 'string' && _this.locationCode.length > 0){
                    var saveData={
                        "locationCodeCondition": '%'+_this.locationCode+'%',
                        "reviewPlanId":_this.value
                    }
                    _this.$request({
                        url: api.getLoc,
                        context: _this, //this
                        sendData: saveData,
                        successCallback: (_this, response) => {
                            console.log('save:', response)
                            _this.locationBarcode=_this.locationCode
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
            }
        },
        methods: {
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            save(){
                if(typeof _this.locationBarcode != 'string' || _this.locationBarcode.length == 0){
                    _this.$alert('请录入正确的库位！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                var saveData ={
                    "locationCode":_this.locationCode,
                    "reviewPlanId": _this.value
                }
                _this.$request({
                    url: api.saveUrl,
                    context: _this, //this
                    sendData: saveData,
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
                _this.getList()
            },
            saveAndAdd(){
                if(typeof _this.locationBarcode != 'string' || _this.locationBarcode.length == 0){
                    _this.$alert('请录入正确的库位！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                var saveData ={
                    "locationCode":_this.locationCode,
                    "reviewPlanId": _this.value
                }
                _this.$request({
                    url: api.saveUrl,
                    context: _this, //this
                    sendData: saveData,
                    successCallback: (_this, response) => {
                        console.log('save:', response)
                        _this.$alert('操作成功', '操作成功！！！', {
                            type: 'success',
                        })
                        _this.locationCode=''
                        _this.locationBarcode=''
                    },
                    failCallback: (_this, e) => {
                        console.error('save:', e)
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
                _this.getList()
            },
        },
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
