<template>
    <div class="wms-items">

        <!--标签功能操作栏  start-->
        <div class="wms-modal-div">
            <div class="nav-div">
                <span>工作台</span>
                <el-select v-model="model.pos" placeholder="请选择" class="nav-select">
                    <el-option :key="100" label="质检打包台01" :value="100">
                    </el-option>
                </el-select>
                <el-button>挂起(F1)</el-button>
                <el-button>质检报缺(F2)</el-button>
                <el-button>拣选单</el-button>
            </div>
        </div>
        <!--标签功能操作栏  end-->


        <!--主体内容  start-->
        <div class="wms-main">

            <div class="mainContent">
                <div class="content">

                    <div class="contentBox">


                        <!--第一部 start-->
                        <div class="group">
                            <div class="group-p group-l">
                                <span>拣选单号/容器号/子订单号</span>
                                <el-input ref="inputOrderNo" placeholder="请输入内容" v-model="model.inputOrderNo"
                                          @keyup.enter.native="startQc"
                                          class="odd"></el-input>
                            </div>
                            <div class="group-p group-l">
                                <span>系统订单号</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                            <div class="group-p group-l">
                                <span>货主</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                            <div class="group-p group-l">
                                <span>格子号</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                        </div>
                        <!--第一部 end-->

                        <!--第二部 start-->
                        <div class="group">
                            <div class="group-p group-l">
                                <span>商品条码</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                            <div class="group-p group-l">
                                <el-checkbox>逐件扫描(F3)</el-checkbox>
                            </div>
                            <div class="group-p group-l">
                                <span style="font-size: large;">拆零</span>
                            </div>
                        </div>
                        <!--第二部 end-->

                        <!--第三部 start-->
                        <div class="group">
                            <div class="group-p group-l">
                                <span>商品名称</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                            <div class="group-p group-l">
                                <span>数量</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                                <span>瓶</span>
                            </div>
                            <div class="group-p group-l">
                                <span>整零转换</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                        </div>
                        <!--第三部 end-->

                        <!--第四部 start-->
                        <div class="group">
                            <div class="group-p group-l">
                                <span>包材条码</span>
                                <el-input placeholder="请输入内容" class="odd"></el-input>
                            </div>
                            <div class="group-p group-l">
                                <el-button type="text">查看包裹信息(F4)</el-button>
                            </div>
                        </div>
                        <!--第四部 end-->

                    </div>

                </div>
            </div>
            <!--主体内容  end-->

        </div>

    </div>
</template>
<script type="es6">
    import service from '@Wms/services/orderManagement/qc/multipleService.js'

    import utils from '@Wms/utils/utilFns.js'

    let _this = null
    let api = {
        getlist: '/wms-inbound-server/inboundnotify/getListWithPage',//主列表信息
        getlabelDetailList: '/wms-inbound-server/inboundnotify/getDetailList',  // 根据id获取明细列表
    }
    export default {
        created() {
            _this = this
        },
        data() {
            return {
                model: {
                    pos: '',
                    inputOrderNo: ''
                }
            }
        },
        methods: {
            startQc() {
                if (_this.model.inputOrderNo.length > 0) {
                    _this.$request({
                        url: '/wms-outbound-server/orderQc/startQc',
                        context: _this,
                        sendData: {
                            inputOrderNo: _this.model.inputOrderNo
                        },
                        successCallback: (_this, response) => {
                            debugger
                        },
                        failCallback: (_this, error) => {
                            _this.$alert(error, '', {
                                type: 'warning',
                                closeOnClickModal: true,
                                closeOnPressEscape: true,
                                callback: (action, instance) => {
                                    utils.setFocusAndSelectAll(_this.$refs.inputOrderNo)
                                }
                            })
                        }
                    })
                }
            }
        }
    }
</script>


<style scoped lang="less" type="text/less">
    /*工作台导航 start*/
    .nav-div {
        position: relative;
        span {
            margin-right: 2px;
        }
        i {
            position: absolute;
            top: 7px;
            left: 145px;
            font-size: 12px;
            width: 0;
        }
        button {
            border: 1px solid #ccc;
            height: 23px;
            line-height: 21px;
            background: #fff;
            color: #5f5f5f;
            margin-left: 7px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .nav-select .el-input, .nav-select .el-input__inner {
            width: 120px;
            height: 22px;
            line-height: 22px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .el-select .el-input .el-input__icon {
            display: none;
        }
    }

    /*工作台导航 end*/
    .mainContent {
        overflow-x: hidden;
    }

    /*内容  start*/
    .content {
        margin-top: 10px;
        overflow-x: hidden;
        /*第一部   start*/
        .group {
            border-bottom: 1px dashed #ccc;
            padding-bottom: 16px;
        }
        .group-p {
            position: relative;
            display: inline-block;
            .odd {
                width: 200px;
            }
            .icon-xiajiantou {
                position: absolute;
                top: 10px;
                right: 90px;
                font-size: 12px;
            }
            .link {
                display: inline-block;
                margin-top: 3px;
                margin-left: 16px;
                div {
                    display: inline-block;
                    margin-right: 30px;
                    p {
                        display: inline-block;
                        font-size: 20px;
                        color: #05c728;
                    }
                }
                a {
                    color: #4ab0e0;
                    text-decoration: underline;
                    margin-right: 16px;
                }
            }
            .el-button--default {
                width: 68px;
                padding: 0;
                margin: 0 0 0 7px;
                &:hover {
                    border-color: #20a0ff;
                }
                &:focus {
                    border-color: #20a0ff;
                }
                /*&:active {
                    border-color: #20a0ff;
                }*/
            }
            .active {
                border-color: #20a0ff;
            }
        }
        .group-l {
            width: 340px;
        }
        .group-c {
            width: 260px;
        }
        .group-r {
            width: 370px;
        }
        /*第一部   end*/
        /*第二部   start*/
        .breed-box {
            margin-top: 16px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 20px;
            .breed-number, .total {
                width: 300px;
                display: inline-block;
                p {
                    font-size: 14px;
                    color: #28a7e1;
                    margin-bottom: 10px;
                }
                .plan, .quality-testing {
                    width: 120px;
                    height: 80px;
                    border: 1px solid #ccc;
                    display: inline-block;
                    margin-right: 16px;
                    float: left;
                    span {
                        width: 120px;
                        display: inline-block;
                        text-align: center;
                        margin-top: 10px;
                    }
                    p {
                        text-align: center;
                        margin-top: 6px;
                        font-size: 30px;
                    }
                }
                .plan {
                    p {
                        text-align: center;
                        margin-top: 6px;
                        font-size: 30px;
                        color: #666;
                    }
                }
            }
        }
        /*第二部   end*/
        /*第三部   start*/
        .commodity {
            margin: 16px 0;
            .commodity-b {
                margin-top: 12px;
                .group-p {
                    .quantity {
                        width: 80px;
                        margin-right: 16px;
                    }
                    .commodity-total {
                        display: inline-block;
                        position: relative;
                        em {
                            position: absolute;
                            top: 7px;
                            z-index: 1;
                            left: 85px;
                            border-left: 1px solid #ccc;
                            padding-left: 7px;
                        }
                    }
                    .commodity-back {
                        margin-left: 10px;
                    }

                    .conversion {
                        width: 130px;
                    }
                }
            }
            .group-p {
                margin-right: 16px;
                .el-input {
                    width: 200px;
                }
            }
        }
        /*第三部   end*/
        .product-date {
            /*border-top: 1px dashed #ccc;*/
            padding-top: 16px;
            .group {
                border: none;
                .group-p {
                    margin-right: 50px;
                    .el-input {
                        width: 160px;
                    }
                    .el-input__inner {
                        width: 160px;
                    }
                }
            }
        }

        .header-btn {
            .el-button {
                margin: 0;
                padding: 0;
                width: 74px;
                height: 22px;
                line-height: 22px;
                margin-right: 6px;
            }
        }

        .details-list {
            margin-top: 10px;
            p {
                span {
                    color: #000;
                }
            }
        }
    }

    /*内容  end*/
    /*右侧成功失败提示框	start*/
    .promptbox-succeed {
        width: 220px;
        height: 150px;
        border: 1px solid #ccc;
        position: absolute;
        top: 190px;
        right: -1px;
        background: #fff;
        opacity: .6;
        color: #05c728;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
        h2 {
            font-size: 40px;
            text-align: center;
            line-height: 100px;
        }
        p {
            font-size: 16px;
            text-align: center;
        }
    }

    .promptbox-fail {
        color: #f00;
    }

    /*右侧成功失败提示框	end*/
    /*右侧划出  start*/
    .right-slide {
        position: relative;
        position: absolute;
        top: 135px;
        right: 0;
        width: 85%;
        height: 85.5%;
        background: #fff;
        padding: 0 16px;
        z-index: 1000;
        .content-up {
            margin-bottom: 10px;
            .content-title {
                margin: 10px 0 16px 16px;
                color: #28a7e1;
                font-size: 14px;
                text-align: left;
            }
            .content-detail {
                width: 23%;
                display: inline-block;
                div {
                    margin-bottom: 16px;
                    span {
                        width: 90px;
                        text-align: right;
                        float: left;
                    }
                    p {
                        display: inline-block;
                        margin-left: 6px;
                    }
                }
            }
        }
        .content-down {
            border-top: 2px solid #ccc;
            .information-list {
                margin-top: 16px;
            }
        }
        .close-btn {
            i {
                position: absolute;
                top: 5px;
                right: 16px;
            }
        }
    }

    /*右侧划出  end*/

    /*暂存货位弹出层   start*/
    .temporary-location {
        .el-form-item {
            margin: 50px 0 0 16px;
        }
    }

    /*暂存货位弹出层   end*/
</style>
