<template>
    <div class="wms-items">
        <div v-loading.body="loading">
            <!--标签功能操作栏  start-->
            <div class="wms-modal-div clearfix">
                <div>
                    <p class="btnGroup">
                        <a href="javascript:;" @click="register">&nbsp;&nbsp;保存&nbsp;&nbsp;</a>
                    </p>
                </div>
            </div>
            <!--标签功能操作栏  end-->
            <div class="wms-main" ref="main">
                <div class="mainContainer clearfix">
                    <div class="mainContent mainContent-storeInfo">
                        <!--表单头部    start-->
                        <div class="vehicle-find">
                            <div class="vehicle-data">
                                <div class="inblock">
                                    <span class="hspace">拣选单号</span>
                                    <el-input ref="pickingNo" type="text" v-model="pickingNo" class="license-number"
                                              placeholder="请扫描/录入拣选单号" @keyup.enter.native="register"></el-input>
                                    <br>
                                    <span class="hspace">提示：手动输入信息保存键-Enter（回车）</span>
                                </div>
                            </div>
                        </div>
                        <!--表单头部    end-->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">

    import service from '@Wms/services/orderManagement/wave/managerService'
    let _this
    export default {
        created() {
            _this = this
        },
        data() {
            return {
                loading: false,
                pickingNo: "",
                model: {
                    source: '0',
                    printStatus: "1"
                },
                api: {},
                tableData: [],
                multipleSelection: [],
                pagination: {
                    total: 0
                },
                timeRange: [],
            }
        },
        mounted() {
            _this.$nextTick(function () {
                _this.$refs["pickingNo"].focus()
            })
        },
        methods: {
            register() {
                if (_this.pickingNo.length < 1) {
                    _this.$notify({
                        title: '警告',
                        message: '请扫描/输入拣选单号',
                        type: 'warning',
                        duration: 3000
                    })
                    return
                }
                _this.$request({
                    url: '/wms-outbound-server/picking/register',
                    context: _this,
                    sendData: {
                        pickingNo: _this.pickingNo,
                        updateUser: '666',
                        updateUserName: '东'
                    },
                    successCallback: (_this, response) => {
                        if (response === undefined || response === null) {
                            _this.$notify.error({
                                title: '错误',
                                message: '服务未返回拣选单信息'
                            })
                        }
                        else {
                            if (response.status === 300) {
                                _this.$notify({
                                    title: '成功',
                                    message: '拣选单开始登记成功！',
                                    type: 'success'
                                })
                            } else {
                                _this.$notify({
                                    title: '成功',
                                    message: '拣选单结束登记成功！',
                                    type: 'success'
                                })
                            }
                            _this.pickingNo = ""
                        }
                    },
                    failCallback: (_this, response) => {
                        _this.$notify.error({
                            title: '错误',
                            message: response
                        })
                    }
                })
            }
        }
    }

</script>
