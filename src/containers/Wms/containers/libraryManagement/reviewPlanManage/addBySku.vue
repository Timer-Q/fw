<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">商品条码</span>
                    <el-input type="text" v-model="barcode" class="license-number"
                              placeholder="商品条码"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">商品名称</span>
                    <el-input type="text" v-model="goodsName" class="license-number"
                              placeholder="商品名称"></el-input>
                </div>
            </div>
            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="cancel">取消</el-button>
                    <el-button @click="saveAndAdd()">保存并新增</el-button>
                    <el-button @click="save">保存</el-button>
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
                barcode: null,
                goodsName:null,
                reviewPlanId: _this.value ,
            }
        },
        methods: {
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
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
