<style lang="less" rel="stylesheet/less">
    .tmsCarDetail{
        input.el-input__inner,body .el-input__inner{
            height:20px;
            line-height:20px;
        }
        .el-form-item__label{
            padding:4px 7px 4px 0;
        }
        .el-form-item__content{
            line-height:20px;
        }
    }
    .tmsDispatcherAdd{
        .el-input__inner{
            width:230px;
            border-radius: 0;
        }
        /*//设置装载率重量和体积input的宽度*/
        .loadingPercent {
            .el-input__inner{
                width:80px;
            }
            .el-form-item__label{
                padding-right:5px;
            }
        }
        .remark{
            margin-top:10px;
            .el-input__inner{
                width:240px;
            }
        }
        .el-form-item.is-required .el-form-item__label:before{
            position:absolute;
            left:110px;
            z-index:2000;
        }
        .vehicleNo{
            .el-form-item.is-required .el-form-item__label:before{
                left:65px;
            }
        }
        .dispatcherRemark{
            .el-input__inner{
                padding:0;
                width:200px;
            }
        }
        .tableStyle{
            .el-input__inner{
                width:76px;
                border-radius:3px;
            }
            .el-date-editor .el-input__inner{
                width:108px;
            }
        }
        .el-dialog__body{
            padding:0 16px 16px;
            .el-row{
                margin-top:5px;
            }
        }
    }
</style>
<style lang="less" rel="stylesheet/less" scoped>
    .tmsDispatcherAdd{
        .clearfix{
            overflow: hidden;
            clear: both;
        }
        @ydh:rgb(76,98,254);
        .ydh{
            color: @ydh;
            text-decoration: underline;
            &:hover{
                color: lighten(@ydh,20%);
            }
        }
        @groupColor:rgb(137,153,169);
        .el-button-group{
            .el-button{
                float: none;
                font-size: 12px;
                height: 24px;
                line-height: 24px;
                border-radius: 4px;
                min-width: auto;
                margin-right: 8px;
                padding: 0 16px;
                color: @groupColor;
                border:1px solid @groupColor;
                background: #ffffff;
                &:hover{
                    background: #ffffff;
                    color: lighten(@groupColor,20%);
                }
            }
            .el-button:not(:first-child){
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
            .group-right{
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                margin-right: -5px;
            }
        }
        .table-row-select{
            float:left;
            width:33%;
            margin-top:10px;
            position:relative;
        }
        .icon-aaa-1{
            cursor:pointer;
        }
        .dispatcherAddContent{
            padding:0 16px 16px;
            .mainTable{
                border-bottom:2px solid #eee;
                .unit{
                    position:absolute;
                    top:0;
                    right:10px;
                    color:#999;
                }
            }
            .waybillDeatil{
                padding-top:16px;
                .stock {
                    margin:3px 0;
                    span{
                        position:relative;
                        top:-1px;
                    }
                }
                >div:nth-child(2){
                    margin-top:10px;
                }
                .icon-erweima{
                    position:absolute;
                    top:0;
                    right:-20px;
                    color:#ccc;
                    cursor:pointer;
                }
                .waybillDetailContentSpread{
                    >div:first-child{
                        margin-bottom:10px;
                    }
                }
                .waybillDetailContentCollapsed{
                    >div{
                        float:left;
                        width:44%;
                    }
                    .tableStyle{
                        >div:first-child{
                            border:1px solid #ccc;
                            border-bottom:none;
                            padding:10px;
                        }
                        .el-input__inner{
                            width:76px;
                        }
                    }
                    .addAndRemoveButton{
                        width:8%;
                        text-align: center;
                    }
                }
            }
        }


    }
    .tmsCarDetail{
        border:1px solid #ccc;
        background:#fff;
        height:213px;
        border-radius:3px;
        box-shadow: 0 3px 5px #ccc;
        .el-form-item{
            margin-top:10px;
        }
        .carDetailHeader{
            border-bottom:1px solid #ccc;
            height:30px;
            line-height:30px;
            padding:0 16px;
            color:#28a7e1;
        }
        .carDetailContent{
            padding:16px;
            padding-top:6px;
            width:100%;
            &>div{
                float:left;
            }
            &>div:nth-child(1){
                width:60%;
                .el-input{
                    width:200px;
                }
            }
            &>div:nth-child(2){
                width:40%;
                .el-input{
                    width:80px;
                }
            }
        }
    }
    /*.dispatcherPage a{*/
        /*color:#29a7e1;*/
    /*}*/
    .projection{
        background:#c9c9c9;
        padding: 10px 0 10px 20px;
    }
</style>
<template>
    <div class="dispatcherPage tmsDispatcherAdd">
        <el-form :inline="true" ref="form" :model="form" label-width="100px" :rules="rules" >
            <div class="projection">
                <el-button-group>
                    <el-button>保存</el-button>
                </el-button-group>
                <el-button-group>
                    <el-button>取消</el-button>
                </el-button-group>
                <el-button-group>
                    <el-button @click="">提取车辆计划</el-button>
                </el-button-group>
                <el-button-group>
                    <el-button>提取装货单</el-button>
                </el-button-group>
            </div>
            <div class="dispatcherAddContent">
                <div class="mainTable">
                    <div>
                        <div class="table-row-select">
                            <el-form-item label="派车批次" label-width="75px">
                                <el-input v-model="form.batchCode" @change="" placeholder="自动编号" :disabled="true" style="width:130px"></el-input>
                            </el-form-item>
                        </div>
                        <div class="table-row-select">
                            <el-form-item label="发车时间" prop="dispatcherTime" label-width="75px">
                                <el-date-picker type="datetime" @change="" v-model="form.dispatcherTime" style="width: 50%;"></el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="table-row-select" >
                            <el-form-item label="业务员">
                                <el-select v-model="form.opUserName" placeholder="">
                                    <el-option
                                        v-for="item in salesMan"
                                        :key="item.userId"
                                        :label="item.userName"
                                        :value="item.userName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select vehicleNo">
                            <el-form-item label="车牌号码" label-width="75px" prop="vehicleNo">
                                <el-select v-model="form.vehicleNo" filterable="" clearable  remote :remote-method="remoteMethodAboutVehicle"
                                           　@clear="clearSelectVehicle" :loading="loading">
                                    <el-option v-for="item in carNumList"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-popover ref="popover4" placement="bottom-start" width="510" trigger="click">
                                <div class="tmsCarDetail">
                                    <div class="carDetailHeader">车辆详情</div>
                                    <div class="carDetailContent" v-for="item in carDetailList">
                                        <div>
                                            <el-form-item label="承运商名称" label-width="80px">
                                                <el-input v-model="item.vehicleNo"></el-input>
                                            </el-form-item>
                                            <el-form-item label="核载重量(kg)" label-width="80px">
                                                <el-input v-model="item.checkQuality"></el-input>
                                            </el-form-item>
                                            <el-form-item label="车型" label-width="80px">
                                                <el-input v-model="item.vehicleNo"></el-input>
                                            </el-form-item>
                                            <el-form-item label="车辆宽度(m)" label-width="80px">
                                                <el-input v-model="item.vehicleWidth"></el-input>
                                            </el-form-item>
                                            <el-form-item label="车辆类型" label-width="80px">
                                                <template slot-scope="scope">
                                                    <span v-for="item2 in interfaceData.cllx">
                                                        <span v-if="item.vehicleType===item2.itemCode">
                                                           <el-input v-model="item2.itemName"></el-input>
                                                        </span>
                                                    </span>
                                                </template>
                                            </el-form-item>
                                        </div>
                                        <div>
                                            <el-form-item label="车辆皮重(kg)" label-width="80px">
                                                <el-input v-model="item.vehicleWeight"></el-input>
                                            </el-form-item>
                                            <el-form-item label="核载体积(m³)" label-width="80px">
                                                <el-input v-model="item.checkVolume"></el-input>
                                            </el-form-item>
                                            <el-form-item label="车辆长度(m)" label-width="80px">
                                                <el-input v-model="item.vehicleLength"></el-input>
                                            </el-form-item>
                                            <el-form-item label="车辆高度(m)" label-width="80px">
                                                <el-input v-model="item.vehicleHeight"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>


                            </el-popover>
                            <i  class="iconfont icon-aaa-1" v-popover:popover4></i>
                        </div>

                        <div class="table-row-select">
                            <el-form-item label="司机名称" prop="driverName">
                                <el-select v-model="form.driverName" filterable="" clearable  remote :remote-method="remoteMethodAboutDriver"
                                           @change="checkedDriver"　@clear="clearSelectDriver" :loading="loading" >
                                    <el-option v-for="item in driverList"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="table-row-select">
                            <el-form-item label="手机号码" prop="phoneNo">
                                <el-input v-model="form.phoneNo" @change=""></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <el-form-item label="发车时间" prop="dispatcherTime" label-width="75px">
                                <el-date-picker type="datetime" @change="" v-model="form.dispatcherTime" style="width: 50%;"></el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="table-row-select">
                            <el-form-item label="成本分摊方式">
                                <el-select v-model="form.costTypeId" placeholder="">
                                    <el-option v-for="item in interfaceData.pcdftfs"
                                               :key="item.itemCode"
                                               :label="item.itemName"
                                               :value="item.itemCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="table-row-select">

                        </div>
                    </div>
                    <div>
                        <el-form-item label="备注" class="remark" label-width="75px">
                            <el-input v-model="form.remark" @change=""></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="费用明细" label-width="75px">
                            <!--可动态添加显示-->
                            <span style="margin-right:10px">
                                <i class="iconfont icon-feiyong"></i>
                                <span>派车单120</span>
                                <i class="iconfont icon-xiayi"></i>
                            </span>

                            <i class="iconfont icon-zengjia"></i>
                        </el-form-item>
                        <el-form-item label="派车成本" label-width="75px">
                                <el-input v-model="form.cost" @change="" :disabled="true"></el-input>
                                <span class="unit">元</span>
                        </el-form-item>
                        <el-form-item label="装载率">
                                <el-form-item label="重量" class="loadingPercent" label-width="50px" >
                                    <el-input  v-model="form.weightLoading" @change="" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="体积" class="loadingPercent" label-width="50px" >
                                    <el-input  v-model="form.volumeLoading" @change="" :disabled="true"></el-input>
                                </el-form-item>
                            </el-form-item>
                    </div>
                </div>
                <div class="waybillDeatil">
                    <!--只显示运单明细列表-->
                    <div class="waybillDetailContentSpread">
                        <div>
                            <el-button-group>
                                <el-button class="stock"  @click="openStock">
                                    <i class="iconfont icon-shouqi"></i>
                                    <span>
                                        库存
                                    </span>
                                </el-button>
                            </el-button-group>
                            <el-form-item label="快速添加" label-width="70px" style="margin-right:20px;">
                                <el-select v-model="waybillCode" filterable="" clearable  remote :remote-method="remoteMethodAboutWaybillcode"
                                           @change="checkedVehicle"　@clear="clearSelectWaybillcode" :loading="loading">
                                    <el-option v-for="item in waybillcodeList"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                                <!--<el-input v-model="waybillCode" @change="" placeholder="请输入运单号"></el-input>-->
                                <i class="iconfont icon-erweima"></i>
                            </el-form-item>
                            <el-button-group>
                                <el-button @click="addWaybillByWaybillcode">加入列表</el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button>移除</el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button @click="showLoadingNumDialog">调整装车件数</el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button>地图派车线路</el-button>
                            </el-button-group>
                        </div>
                        <el-table v-if="waybillTableData.length"  :data="waybillTableData" border
                                  style="width:100%" height="200" @selection-change="selectIdsFromWaybillFunc"
                                    @current-change="handleCurrentChange"
                                  >
                            <el-table-column type="index" label="序号" width="80" header-align="center"></el-table-column>
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="waybill.waybillCode" width="180" label="运单号" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.customerOrderCode" label="客户单号" header-align="center"></el-table-column>
                            <!--<el-table-column prop="" label="线路顺序" header-align="center">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="waybill.deliverySendTime" label="执行任务" header-align="center">-->
                                <!---->
                            <!--</el-table-column>-->
                            <el-table-column label="派车备注" header-align="center" prop="" width="230">
                                <template slot-scope="scope">
                                    <el-input class="dispatcherRemark" v-model="dispatcherDataInWaybillTable.remark"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  label="装车件数" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybillGoodsInfo.loadingNum}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="装车重量（kg）" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybillGoodsInfo.loadingWeight}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="装车体积（m³）" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybillGoodsInfo.loadingVolumn}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="分摊成本" header-align="center">

                            </el-table-column>
                            <el-table-column label="预约提货时间" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.deliveryPickTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="预约送货时间" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.deliverySendTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <!--<el-table-column prop="waybill.invoiceMobleNo" label="装货批次" header-align="center"></el-table-column>-->
                            <el-table-column prop="waybill.invoiceCompany" label="发货公司" header-align="center">
                            </el-table-column>
                            <el-table-column prop="waybill.invoiceUser" label="发货人" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.invoiceTelNo" label="发货人电话" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.invoiceMobleNo" label="发货人手机" header-align="center"></el-table-column>
                            <el-table-column  label="发货地址" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.invoiceProvName}}</span>
                                    <span>{{scope.row.waybill.invoiceCityName}}</span>
                                    <span>{{scope.row.waybill.invoiceDistrictName}}</span>
                                    <span>{{scope.row.waybill.invoiceStreetName}}</span>
                                    <span>{{scope.row.waybill.invoiceAddress}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="waybill.receiptCompany" label="收货公司" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.receiptUser" label="收货人" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.receiptConsignorTelNo" label="收货人电话" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.receiptConsignorMobleNo" label="收货人手机" header-align="center"></el-table-column>
                            <el-table-column  label="收货地址" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.receiptProvName}}</span>
                                    <span>{{scope.row.waybill.receiptCityName}}</span>
                                    <span>{{scope.row.waybill.receiptDistrictName}}</span>
                                    <span>{{scope.row.waybill.receiptStreetName}}</span>
                                    <span>{{scope.row.waybill.receiptAddress}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="下单时间" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="接单时间" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <!--<el-table-column prop="waybill." label="装货时间" header-align="center"></el-table-column>-->
                            <!--<el-table-column prop="waybill." label="卸货时间" header-align="center"></el-table-column>-->
                            <el-table-column label="签收时间" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.signTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <!--<el-table-column prop="waybill." label="实际运费" header-align="center"></el-table-column>-->
                            <!--<el-table-column prop="waybill." label="产值" header-align="center"></el-table-column>-->
                            <!--<el-table-column prop="waybill." label="业务费" header-align="center"></el-table-column>-->
                            <el-table-column label="类型" header-align="center">
                                <template slot-scope="scope">
                                        <span v-if="scope.row.waybill.iemergency">
                                            <i class="iconfont icon-ji"></i>
                                        </span>
                                    <span v-if="scope.row.waybill.iwaitNotice">
                                            <i class="iconfont icon-deng"></i>
                                        </span>
                                    <span v-if="scope.row.waybill.vip">
                                            <i class="iconfont icon-vip"></i>
                                        </span>
                                    <span v-if="scope.row.waybill.exception">
                                            <i class="iconfont icon-yichang"></i>
                                        </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="运单状态" header-align="center">
                                <template slot-scope="scope">
                                        <span v-for="item in interfaceData.ydzt">
                                            <span v-if="scope.row.waybill.status===item.itemCode">
                                               {{item.itemName}}
                                            </span>
                                        </span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="货物名称" header-align="center">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom"  trigger="click" >
                                        <el-table :data="scope.row.waybillGoodsEsDTOList" border>
                                            <el-table-column  property="goodsName" label="货物名称" width="110" header-align="center"></el-table-column>
                                            <el-table-column  property="packingName" label="包装" header-align="center"></el-table-column>
                                            <el-table-column  property="packingNum" label="件数" header-align="center" align="right"></el-table-column>
                                            <el-table-column  property="weight" label="重量" header-align="center" align="right"></el-table-column>
                                            <el-table-column  property="volume" label="体积" header-align="center" align="right"></el-table-column>
                                        </el-table>
                                        <div slot="reference" class="name-wrapper">
                                            {{getJoinedStrByKeyFromList(scope.row.waybillGoodsEsDTOList,'goodsName','/')}}
                                            <i class="iconfont icon-xiayi"></i>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column  label="包装" header-align="center">
                                <template slot-scope="scope">
                                        <span v-for="item in scope.row.waybillGoodsEsDTOList">
                                            {{item.packingName}}
                                        </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="waybill.totalNum" label="件数" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.weight" label="重量（kg）" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.volume" label="体积（m³）" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.destName" label="目的地" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.lineName" label="运输线路" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.invoiceOrgName" label="发货网点" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.destOrgName" label="目的网点" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.payWay" label="付款方式" header-align="center">
                                <template slot-scope="scope">
                                        <span v-for="item in interfaceData.fkfs">
                                            <span v-if="scope.row.waybill.payWay===item.itemCode">
                                               {{item.itemName}}
                                            </span>
                                        </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="waybill.backType" label="回单要求" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.backNum" label="回单份数" header-align="center"></el-table-column>
                            <el-table-column prop="waybill.backCode" label="回单编号" header-align="center"></el-table-column>
                            <!--<el-table-column prop="waybill.backCode" label="签收验证码" header-align="center"></el-table-column>-->
                            <el-table-column label="录单时间" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.waybill.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="waybill.userName" label="录单员" header-align="center"></el-table-column>

                        </el-table>
                    </div>
                    <!--库存和运单明细列表同时显示-->
                    <div class="waybillDetailContentCollapsed" v-if="bsyn">
                        <!--提取库存-->
                        <div class="tableStyle">
                            <div>
                                <el-button-group>
                                    <el-button class="stock"  @click="openStock" style="width:100px">
                                        <i class="iconfont icon-shouqi"></i>
                                        <span>
                                    收起库存
                                </span>
                                    </el-button>
                                </el-button-group>
                                <el-form-item label="操作网点" label-width="70px">
                                    <el-input v-model="waybillCode" @change="" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="客户单号" label-width="70px">
                                    <el-input v-model="stockQueryCondition.customerOrderCode" @change="" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="所在仓库" label-width="70px">
                                    <el-input v-model="waybillCode" @change="" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label-width="60px">
                                    <el-select v-model="selectTime" placeholder="" >
                                        <el-option
                                            v-for="item in selectTimeItems"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-form-item style="margin-right:0">
                                        <el-date-picker type="date" placeholder="选择日期"  v-model="selectTime" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                    <span>-</span>
                                    <el-form-item>
                                        <el-date-picker type="date" placeholder="选择日期"  v-model="selectTime" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item label="运单号" label-width="60px">
                                    <el-input v-model="stockQueryCondition.stockWaybillCode" @change="" placeholder=""></el-input>
                                </el-form-item>
                                <el-button-group>
                                    <el-button @click="selectStockWaybill">查询</el-button>
                                </el-button-group>
                            </div>
                            <el-table v-if="copyInventoryData.length"
                                :data="copyInventoryData"
                                border
                                style="width:100%" height="200" @selection-change="setWayBillIds" >
                                <el-table-column type="index" label="序号" header-align="center"></el-table-column>
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="waybill.waybillCode" min-width="230" label="运单号" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.customerOrderCode" min-width="230" label="客户单号" header-align="center"></el-table-column>
                                <el-table-column  label="预约提货时间" header-align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.waybill.deliveryPickTime | formatDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="预约送货时间" header-align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.waybill.deliverySendTime | formatDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="可装车件数" header-align="center">
                                    <template slot-scope="scope">
                                        <span>
                                            {{scope.row.goodsInfo&&scope.row.goodsInfo.loadingNumSum}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="已装车件数" header-align="center">
                                    <template slot-scope="scope">
                                        <span>
                                            {{scope.row.goodsInfo&&scope.row.goodsInfo.loadedNumSum}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="可装车重量(kg)" header-align="center">
                                    <template slot-scope="scope">
                                        <span>
                                            {{scope.row.goodsInfo&&scope.row.goodsInfo.loadingWeightSum}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="已装车重量(kg)" header-align="center">
                                    <template slot-scope="scope">
                                        <span>
                                            {{scope.row.goodsInfo&&scope.row.goodsInfo.loadedWeightSum}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="可装车体积(m³)" header-align="center">
                                    <template slot-scope="scope">
                                        <span>
                                            {{scope.row.goodsInfo&&scope.row.goodsInfo.loadingVolumnSum}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="已装车体积(m³)" header-align="center">
                                    <template slot-scope="scope">
                                        <span>
                                            {{scope.row.goodsInfo&&scope.row.goodsInfo.loadedVolumnSum}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="waybill.invoiceCompany" label="发货公司" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.invoiceUser" label="发货人" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.invoiceTelNo" label="发货人电话" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.invoiceMobleNo" label="发货人手机" header-align="center"></el-table-column>
                                <el-table-column label="发货地址" header-align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.waybill.invoiceProvName}}</span>
                                        <span>{{scope.row.waybill.invoiceCityName}}</span>
                                        <span>{{scope.row.waybill.invoiceDistrictName}}</span>
                                        <span>{{scope.row.waybill.invoiceStreetName}}</span>
                                        <span>{{scope.row.waybill.invoiceAddress}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="waybill.receiptCompany" label="收货公司" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.receiptUser" label="收货人" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.receiptConsignorTelNo" label="收货人电话" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.receiptConsignorMobleNo" label="收货人手机" header-align="center"></el-table-column>
                                <el-table-column  label="收货地址" header-align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.waybill.receiptProvName}}</span>
                                        <span>{{scope.row.waybill.receiptCityName}}</span>
                                        <span>{{scope.row.waybill.receiptDistrictName}}</span>
                                        <span>{{scope.row.waybill.receiptStreetName}}</span>
                                        <span>{{scope.row.waybill.receiptAddress}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="waybill.createTime" label="下单时间" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.createTime" label="接单时间" header-align="center"></el-table-column>
                                <!--<el-table-column prop="waybill." label="实际运费" header-align="center"></el-table-column>-->
                                <!--<el-table-column prop="waybill." label="产值" header-align="center"></el-table-column>-->
                                <!--<el-table-column prop="waybill." label="业务费" header-align="center"></el-table-column>-->
                                <el-table-column prop="waybill." label="类型" header-align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.waybill.iemergency">
                                            <i class="iconfont icon-ji"></i>
                                        </span>
                                        <span v-if="scope.row.waybill.iwaitNotice">
                                            <i class="iconfont icon-deng"></i>
                                        </span>
                                        <span v-if="scope.row.waybill.vip">
                                            <i class="iconfont icon-vip"></i>
                                        </span>
                                        <span v-if="scope.row.waybill.exception">
                                            <i class="iconfont icon-yichang"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="运单状态" header-align="center">
                                    <template slot-scope="scope">
                                        <span v-for="item in interfaceData.ydzt">
                                            <span v-if="scope.row.waybill.status===item.itemCode">
                                               {{item.itemName}}
                                            </span>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="货物名称" header-align="center">
                                    <template slot-scope="scope">
                                        <el-popover placement="bottom"  trigger="click" >
                                            <el-table :data="scope.row.waybillGoodsEsDTOList" border>
                                                <el-table-column  property="goodsName" label="货物名称" width="110" header-align="center"></el-table-column>
                                                <el-table-column  property="packingName" label="包装" header-align="center"></el-table-column>
                                                <el-table-column  property="packingNum" label="件数" header-align="center" align="right"></el-table-column>
                                                <el-table-column  property="weight" label="重量" header-align="center" align="right"></el-table-column>
                                                <el-table-column  property="volume" label="体积" header-align="center" align="right"></el-table-column>
                                            </el-table>
                                            <div slot="reference" class="name-wrapper">
                                                {{getJoinedStrByKeyFromList(scope.row.waybillGoodsEsDTOList,'goodsName','/')}}
                                                <i class="iconfont icon-xiayi"></i>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="包装" header-align="center">
                                    <template slot-scope="scope">
                                        <span v-for="item in scope.row.waybillGoodsEsDTOList">
                                            {{item.packingName}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="waybill.totalNum" label="件数" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.weight" label="重量（kg）" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.volume" label="体积（m³）" header-align="center"></el-table-column>
                                <!--<el-table-column prop="waybill." label="在库时间" header-align="center"></el-table-column>-->
                                <!--<el-table-column prop="waybill.backOrderOrgName" label="库存网点" header-align="center"></el-table-column>-->
                                <!--<el-table-column prop="waybill." label="仓库名称" header-align="center"></el-table-column>-->
                                <el-table-column prop="waybill.destName" label="目的地" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.lineName" label="运输线路" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.invoiceOrgName" label="发货网点" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.destOrgName" label="目的网点" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.payWay" label="付款方式" header-align="center">
                                    <template slot-scope="scope">
                                        <span v-for="item in interfaceData.fkfs">
                                            <span v-if="scope.row.waybill.payWay===item.itemCode">
                                               {{item.itemName}}
                                            </span>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="waybill.backType" label="回单要求" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.backNum" label="回单份数" header-align="center"></el-table-column>
                                <el-table-column prop="waybill.backCode" label="回单编号" header-align="center"></el-table-column>
                                <!--<el-table-column prop="waybill." label="录单时间" header-align="center"></el-table-column>-->
                                <el-table-column prop="waybill.userName" label="录单员" header-align="center"></el-table-column>
                            </el-table>
                        </div>
                        <!--添加移除按钮-->
                        <div class="addAndRemoveButton" >
                            <el-button-group >
                                <el-button class="stock" @click="addWaybillToWaybillTable">
                                    <i class="iconfont icon-youjiantou"></i>
                                    <span>
                                    添加
                                </span>
                                </el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button class="stock" @click="removeWaybillFromWaybillTable">
                                    <i class="iconfont icon-fanhui"></i>
                                    <span>
                                    移除
                                </span>
                                </el-button>
                            </el-button-group>
                        </div>
                        <!--运单明细列表-->
                        <div class="tableStyle">
                            <div>
                                <el-form-item label="快速添加" label-width="55px;">
                                    <el-input v-model="waybillCode" @change="" placeholder="请输入运单号"></el-input>
                                    <i class="iconfont icon-erweima"></i>
                                </el-form-item>
                                <el-button-group>
                                    <el-button>加入列表</el-button>
                                </el-button-group>
                                <el-button-group>
                                    <el-button>移除</el-button>
                                </el-button-group>
                                <el-button-group>
                                    <el-button>调整装车件数</el-button>
                                </el-button-group>
                                <el-button-group>
                                    <el-button>地图派车线路</el-button>
                                </el-button-group>
                            </div>
                            <!--库存选择表-->
                            <el-table
                                :data="tableData"
                                border
                                style="width:100%"
                                 @current-change="handleCurrentChange"
                                >
                                <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="地址">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!--调整装车件数弹出层-->
                    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"
                               :visible.sync="dialogVisible"  title="调整装车件数" class="paymentPopup">
                        <el-row style="">
                            <el-form-item label="运单号:" label-width="50px">
                                <span>123344444</span>
                            </el-form-item>
                        </el-row>
                        <el-table :data="adjustLoadingNumData">
                            <el-table-column property="" label="货物名称" width="150">
                                <template slot-scope="scope">
                                    <el-popover placement="bottom"  trigger="click" >
                                        <el-table :data="scope.row.waybillGoodsEsDTOList" border>
                                            <el-table-column  property="goodsName" label="货物名称" width="110" header-align="center"></el-table-column>
                                            <el-table-column  property="packingName" label="包装" header-align="center"></el-table-column>
                                            <el-table-column  property="packingNum" label="件数" header-align="center" align="right"></el-table-column>
                                            <el-table-column  property="weight" label="重量" header-align="center" align="right"></el-table-column>
                                            <el-table-column  property="volume" label="体积" header-align="center" align="right"></el-table-column>
                                        </el-table>
                                        <div slot="reference" class="name-wrapper">
                                            {{getJoinedStrByKeyFromList(scope.row.waybillGoodsEsDTOList,'goodsName','/')}}
                                            <i class="iconfont icon-xiayi"></i>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column property="waybillGoodsEsDTOList.packageNum" label="件数" width="200"></el-table-column>
                            <el-table-column property="" label="可装车件数"></el-table-column>
                            <el-table-column property="waybillGoodsInfo.loadingNum" label="装车件数"></el-table-column>
                            <el-table-column property="" label="剩余件数"></el-table-column>
                            <el-table-column property="waybillGoodsInfo.weight" label="重量（kg）"></el-table-column>
                            <el-table-column property="" label="可装车重量（kg）"></el-table-column>
                            <el-table-column property="waybillGoodsInfo.loadingWeight" label="装车重量（kg）"></el-table-column>
                            <el-table-column property="" label="剩余重量（kg）"></el-table-column>
                            <el-table-column property="waybillGoodsInfo.volume" label="体积"></el-table-column>
                            <el-table-column property="" label="可装车体积"></el-table-column>
                            <el-table-column property="waybillGoodsInfo.loadingVolumn" label="装车体积"></el-table-column>
                            <el-table-column property="" label="剩余体积"></el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="">取 消</el-button>
                            <el-button class="el-button--warning" @click="">确 定</el-button>
                        </span>

                    </el-dialog>
                </div>
            </div>
        </el-form>
        <!-- 注释 -->
        <!-- <pre v-if="BX.DEBUG_MODE" class="bx-debug">
            <div>form:{{form}}</div>
            <div>库存数据：{{inventoryData}}</div>
            运单明细：{{waybillTableData}}
        </pre> -->
        <tooltip name="costorder">
            <el-button size="mini">修改</el-button>
            <el-button size="mini" @click="">删除</el-button>
            <el-button size="mini" @click="">派车单明细</el-button>
            <el-button size="mini">详情</el-button>
        </tooltip>
    </div>

</template>
<script>
    // import s from '../../../appService/appService'
    // import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item"
    // import math from "mathjs"
//    var math = require('mathjs')
    import service from "@Tms/services/channelService.js"

    export default {
        // components: {ElFormItem},
        data(){
            return {
                rules: {
                    dispatcherTime: [
                        { type: 'date',required: true, message: '请选择发车时间', trigger: 'change' },
//                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
//                    vehicleNo: [
//                        { required: true, message: '请填写车牌号码', trigger: 'change' }
//                    ],
//                    driverName: [
//                        {  required: true, message: '请填写司机名称', trigger: 'change' }
//                    ],
                    phoneNo: [
                        {  required: true, message: '请填写手机号码', trigger: 'blur' }
                    ],
//                    type: [
//                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
//                    ],
//                    resource: [
//                        { required: true, message: '请选择活动资源', trigger: 'change' }
//                    ],
//                    desc: [
//                        { required: true, message: '请填写活动形式', trigger: 'blur' }
//                    ]
                },
                adjustLoadingNumFormRules:{},//调整装车件数表单验证规则
                interfaceData:{

                },
                formData:{

                },
                dialogVisible: false,
                form: {
                    batchCode:'',
                    dispatcherTime:'',
                    vehicleNo:'',
                    driverName:'',
                    phoneNo:'',
                    weightLoading:null,
                    volumeLoading:null,
                    costTypeId:null,
                    remark:'',
                    opUserName:'',
                    cost:null,
                },//主表数据（保存时传给后台）

                stockQueryCondition:{//库存查询条件
                    customerOrderCode:'',
                    stockWaybillCode:''
                },
                 // 是否打开库存
                bsyn:false,
                dispatcherDataInWaybillTable:{
                    remark:'这是啥呀',
                },//运单明细列表中包含的派车单数据（保存时传给后台）
                wayBillTable:[],//用来存储运单明细表中每条数据的装车件数、装车重量、装车体积（保存时传给后台）

                waybillTableData:[],//运单明细列表数据
                inventoryData:[],//存储库存列表数据
                copyInventoryData:[],//复制库存列表数据存起来
//                copyInventoryData2:[],
                isCheckBox:false,
                dispatcherData:null,
                waybillCode:'',
                salesMan:[],//业务员
                driverList:[],//存储司机名称下拉列表
                list2:[],
                list:[],
                carNumList:[],//存储车牌号码下拉列表
                carDetailList:[],//根据选中的车牌号码浮层显示车辆详细信息
                currentPage:1,
                pageSize:25,
                loading: false,
                isAutoCompletion:false,
                verifyIds: [],//存储从库存中选择的运单的运单号
                selectIdsFromWaybill:[],//存储从运单明细中选择的运单号
                waybillcodeList:[],//根据输入的运单号模糊检索匹配完整的运单号
                stockQueryResult:[],//存储库存中根据查询条件返回的数据
                adjustLoadingNumData:[],//存储调整装车件数
                selectTime:'',
                selectTimeItems:[{
                    value:0,
                    label:'入库日期'
                },{
                    value:1,
                    label:'接单日期'
                },{
                    value:2,
                    label:'预约提货日期'
                },{
                    value:3,
                    label:'预约送货日期'
                }],
                saveWaybillcode:[],//存储运单明细列表中所有的运单号
                saveStockWaybillcode:[],//存储库存列表中所有的运单号
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods:{
            // 点击单元格保存ID
            handleCurrentChange(val) {
                this.tableData.push(val)
                return this.tableData
            },
            // 打开库存
            openStock(){
                this.bsyn= !this.bsyn
            },
            //货物名称用“/”分隔显示
            getJoinedStrByKeyFromList(list,key,joinStr){
                if(!list){
                    return ''
                }
                var arr=[]
                list.forEach((item)=>{
                    arr.push(item[key])
                })
                return arr.join(joinStr)
            },
            //计算可装车重量、体积
            computeAvailableNum(stockNum,lockNum,stockWeight,sendNum ){
                //可装车件数=库存件数-锁定件数：this.accSub(stockNum,lockNum)
                //单件重量（件数）=库存重量（体积）/库存件数:this.accDiv(stockWeight,stockNum)
                //可装车重量（体积）=单件重量（件数）*可装车件数
                //可装车重量（体积）可为空
                if(stockWeight===null){
                    return null
                }else if(sendNum){
                    //已装车件数=已发件数+装货件数：this.dispatcherDataInWaybillTable.loadingNum)
                    //已装车重量（体积）=已装车件数*单件重量（体积）
                    return this.accMul(this.accAdd(sendNum,this.dispatcherDataInWaybillTable.loadingNum),this.accDiv(stockWeight,stockNum))
                }
                else{
                    return this.accMul(this.accSub(stockNum,lockNum),this.accDiv(stockWeight,stockNum))
                }
            },

            //在库存中选中运单添加到运单明细列表中
            setWayBillIds(selection){
                this.verifyIds = []
                for(let i in selection){
                    this.verifyIds.push(selection[i].waybill.waybillCode)
                }
                console.log(this.verifyIds,"this.verifyIds-------------------------")
            },
            // 注释
            //从运单明细中选择运单添加到库存列表中
             selectIdsFromWaybillFunc(selection){
            //     this.selectIdsFromWaybill = []
            //     for(let i in selection){
            //         this.selectIdsFromWaybill.push(selection[i].waybill.waybillCode)
            //     }
            //     console.log(this.selectIdsFromWaybill,"this.selectIdsFromWaybill-------------------------")
             },
            //将运单明细中的运单移除
            removeWaybillFromWaybillTable(){
                let current=this
                console.log(current.selectIdsFromWaybill)
                if(current.selectIdsFromWaybill.length>0){
                    current.selectIdsFromWaybill.forEach((item)=>{

                        // 注释
                        /*
                        this.BX.s.requestTMS({
                            url:'/dispatcher/queryWaybill',
                            type:'post',
                            data:{
                                "waybillCode": item
                            }
                        })
                        .then(([result])=>{
                            console.log(current.inventoryData,"添加前")
                            current.inventoryData.push(result)
                            console.log(current.inventoryData,"添加后")
                        })
                        */
                    })
                }else{
                    alert("请至少选择一条数据")
                }
            },
            //将库存中选中的运单添加到运单明细列表中去
            async addWaybillToWaybillTable(){
                let current=this
                if(current.verifyIds.length>0){
                    current.verifyIds.forEach((item)=>{
                        // 注释
                           // const data = await dispatcher.queryWaybillList()
                            console.log(data)
                            // this.BX.s.requestTMS([
                            //     '/dispatcher/waybill/'+item,
                            // ]).then(([res])=>{
                            //     current.waybillTableData.push(res)
                            //     console.log(current.waybillTableData,"waybillTableData---------------------------------")
                            //     current.waybillTableData.forEach(waybillItem=>{
                            //         console.log(waybillItem,'item1070------------')
                            //         waybillItem.waybillGoodsInfo={
                            //             loadingNum:null,//装车件数
                            //             loadingWeight:null,//装车重量
                            //             loadingVolumn:null,//装车体积
                            //         }
                            //         current.inventoryData.map((stockItem,index)=>{
                            //             console.log(stockItem,'stickItem1078')
                            //             if(item==stockItem.waybill.waybillCode){
                            //                 let obj={
                            //                     waybillCode:'',
                            //                     loadingNum:null,//装车件数
                            //                     loadingWeight:null,//装车重量
                            //                     loadingVolumn:null,//装车体积
                            //                 }
                            //                 obj.waybillCode=stockItem.waybill.waybillCode
                            //                 obj.loadingNum=stockItem.goodsInfo.loadingNumSum
                            //                 obj.loadingWeight=stockItem.goodsInfo.loadingWeightSum
                            //                 obj.loadingVolumn=stockItem.goodsInfo.loadingVolumnSum
                            //                 waybillItem.waybillGoodsInfo.loadingNum=stockItem.goodsInfo.loadingNumSum
                            //                 waybillItem.waybillGoodsInfo.loadingWeight=stockItem.goodsInfo.loadingWeightSum
                            //                 waybillItem.waybillGoodsInfo.loadingVolumn=stockItem.goodsInfo.loadingVolumnSum
                            //                 console.log(obj,'1102')
                            //                 current.wayBillTable.push(obj)
                            //             }
                            //             console.log(current.wayBillTable,'wayBillTable')
                            //         })
                            //     })
                            // })
                        //将从库存中添加到运单明细中的运单从复制的库存列表中删掉
                        current.copyInventoryData.map((stockItem,index)=>{

                            if(item===stockItem.waybill.waybillCode){
                                console.log(stockItem,"stockItem-------------")
                                current.dispatcherDataInWaybillTable.loadingNum=stockItem.goodsInfo.loadingNumSum
                                current.dispatcherDataInWaybillTable.loadingWeight=stockItem.goodsInfo.loadingWeightSum
                                current.dispatcherDataInWaybillTable.loadingVolumn=stockItem.goodsInfo.loadingVolumnSum
                                console.log(current.dispatcherDataInWaybillTable.loadingNum,"loadingNum")
                                current.copyInventoryData.splice(index,1)
                                console.log(current.copyInventoryData,"烦躁")
                            }
                        })
                    })

                }
                else{
                    alert("请至少选择一条数据")
                }
            },
            //根据运单号添加运单
            addWaybillByWaybillcode(){
                let current=this
                if(current.waybillCode!==''){
                    if(current.waybillTableData.length>0){
                        current.waybillTableData.map(item=>{
                            current.saveWaybillcode.push(item.waybill.waybillCode)
                        })

                        if(current.isInArray(current.waybillCode,current.saveWaybillcode)){
                            alert("该运单已被添加，不能重复操作！")
                        }
                        else if(!current.isInArray(current.waybillCode,current.saveStockWaybillcode)){
                            alert("该运单号不在库存中，无法进行添加！")
                        }
                        else{
                            // 注释
                            // this.BX.s.requestTMS([
                            //     '/dispatcher/waybill/'+current.waybillCode,
                            // ]).then(([res])=>{
                            //     console.log(res,"res---------------------------------")
                            //     current.waybillTableData.push(res)
                            // })
                        }
                    }
                    else{
                        // 注释
                        /*
                        this.BX.s.requestTMS([
                            '/dispatcher/waybill/'+current.waybillCode,
                        ]).then(([res])=>{
                            console.log(res,"res---------------------------------")
                            current.waybillTableData.push(res)
                        })
                        */
                    }
                }
            },
            //根据查询条件查询库存运单
            selectStockWaybill(){
                // 注释
                /*
                let current=this
                this.BX.s.tmsPromiseAll([
                    this.BX.s.callInterfaceAndSetData({
                            url:'/dispatcher/queryWaybill',
                            type:'post',
                            data:{
//                                "bespeakBeginTime": 0,
//                                "bespeakEndTime": 0,
//                                "branchId": 0,
                                "customerOrderCode": this.stockQueryCondition.customerOrderCode,
//                                "receiveBeginTime": 0,
//                                "receiveEndTime": 0,
//                                "storageBeginTime": 0,
//                                "storageEndTime": 0,
//                                "warehouseId": 0,
                                "waybillCode": this.stockQueryCondition.stockWaybillCode
                            }
                        },
                        this,'stockQueryResult',false),
                ]).then(([stockQueryResult])=>{
                    let arr=[]
                    //将goodInfo对象赋值给查询出来的数据
                    current.inventoryData.forEach(originalItem=>{
                        current.stockQueryResult.forEach(queryItem=>{
                            if(originalItem.waybill.waybillCode===queryItem.waybill.waybillCode){
                                queryItem.goodsInfo=originalItem.goodsInfo
                            }
                        })
                    })
                    console.log(current.stockQueryResult,'stockQueryResult')
                    if(current.wayBillTable.length>0){
                        console.log('22222222222222222222222222222222222222222222222222222')
                        current.waybillTableData.forEach(waybillItem=>{
                            current.stockQueryResult.forEach(queryItem=>{
                                let arr=[]
                                //如果查询出来的数据在运单明细表中
                                if(queryItem.waybill.waybillCode===waybillItem.waybill.waybillCode){
                                    console.log(queryItem,waybillItem,'queryItem')
                                    /*
                                    * 查看查询数据中的数据是否在右侧运单明细中，如果在，判断装车件数是否小于该条运单的已装车件数，
                                    * 如果小于，显示该条数据，将其赋给库存列表
                                    * 如果等于，则提示“找不到符合条件的数据”
                                    *
                                    console.log(queryItem.goodsInfo.loadingNumSum===waybillItem.waybillGoodsInfo.loadingNum,'-----------------------------')
                                    if(queryItem.goodsInfo.loadingNumSum===waybillItem.waybillGoodsInfo.loadingNum){
                                        alert('找不到符合条件的数据！')
                                    }
                                    else if(queryItem.goodsInfo.loadingNumSum>waybillItem.waybillGoodsInfo.loadingNum){
                                        let oneGoodsNum=0,oneGoodsLoadingWeight=0,oneGoodsLoadingVolumn=0,
                                            oneGoodsLoadedNum=0,oneGoodsLoadedWeight=0,oneGoodsLoadedVolumn=0
                                        if(queryItem.waybillGoodsEsDTOList.length>1){
                                            queryItem.waybillGoodsEsDTOList.map(data=>{
                                                //已装车件数=已发件数+装货件数：this.dispatcherDataInWaybillTable.loadingNum)
                                                //已装车重量（体积）=已装车件数*单件重量（体积）
                                                //可装车件数=库存件数-锁定件数-装货件数
                                                oneGoodsNum=math.eval(queryItem.goodsInfo.loadingNumSum+'-'+waybillItem.waybillGoodsInfo.loadingNum)//一件商品的可装车件数
                                                oneGoodsLoadingWeight=math.eval(math.eval(data.stockWeight+'/'+data.stockNum)+'*'+oneGoodsNum)
                                                oneGoodsLoadingVolumn=math.eval(math.eval(data.stockVolume+'/'+data.stockNum)+'*'+oneGoodsNum)
                                                oneGoodsLoadedNum=math.eval(data.sendNum+'+'+waybillItem.waybillGoodsInfo.loadingNum)//一件商品的已装车件数
                                                oneGoodsLoadedWeight=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingWeight)//一件商品的已装车重量
                                                oneGoodsLoadedVolumn=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingVolumn)//一件商品的已装车体积
                                                queryItem.goodsInfo.loadingNumSum+=oneGoodsNum
                                                queryItem.goodsInfo.loadingWeightSum+=oneGoodsLoadingWeight
                                                queryItem.goodsInfo.loadingVolumnSum+=oneGoodsLoadingVolumn
                                                queryItem.goodsInfo.loadedNumSum+=oneGoodsLoadedNum
                                                queryItem.goodsInfo.loadedWeightSum+=oneGoodsLoadedWeight
                                                queryItem.goodsInfo.loadedVolumnSum+=oneGoodsLoadedVolumn
                                            })
                                        }
                                        else{
                                            queryItem.waybillGoodsEsDTOList.map(data=>{
                                                oneGoodsNum=math.eval(queryItem.goodsInfo.loadingNumSum+'-'+waybillItem.waybillGoodsInfo.loadingNum)//一件商品的可装车件数
                                                oneGoodsLoadingWeight=math.eval(math.eval(data.stockWeight+'/'+data.stockNum)+'*'+oneGoodsNum)
                                                oneGoodsLoadingVolumn=math.eval(math.eval(data.stockVolume+'/'+data.stockNum)+'*'+oneGoodsNum)
                                                oneGoodsLoadedNum=math.eval(data.sendNum+'+'+waybillItem.waybillGoodsInfo.loadingNum)//一件商品的已装车件数
                                                oneGoodsLoadedWeight=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingWeight)//一件商品的已装车重量
                                                oneGoodsLoadedVolumn=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingVolumn)//一件商品的已装车体积
                                                queryItem.goodsInfo.loadingNumSum+=oneGoodsNum
                                                queryItem.goodsInfo.loadingWeightSum+=oneGoodsLoadingWeight
                                                queryItem.goodsInfo.loadingVolumnSum+=oneGoodsLoadingVolumn
                                                queryItem.goodsInfo.loadedNumSum+=oneGoodsLoadedNum
                                                queryItem.goodsInfo.loadedWeightSum+=oneGoodsLoadedWeight
                                                queryItem.goodsInfo.loadedVolumnSum+=oneGoodsLoadedVolumn
                                            })
                                        }
                                        arr.push(queryItem)
                                        current.copyInventoryData=arr
                                    }
                                }
                                else{
                                    arr.push(queryItem)
                                    current.copyInventoryData=arr
                                }
                            })
                        })
                    }
                    else{
                        console.log('11111111111111111111111111111111111111111111')
                        current.copyInventoryData=current.stockQueryResult
                    }

//                    current.copyInventoryData.map(item=>{
//                        current.stockQueryResult.forEach(queryItem=>{
//                            console.log(queryItem,'queryItem---------')
//                            console.log(queryItem.waybill.waybillCode==item.waybill.waybillCode,'queryItem')
//                            if(queryItem.waybill.waybillCode===item.waybill.waybillCode){
//                                queryItem.goodsInfo={
//                                    loadingNumSum:null,//可装车件数
//                                    loadingWeightSum:null,//可装车重量
//                                    loadingVolumnSum:null,//可装车体积
//                                    loadedNumSum:null,//已装车件数
//                                    loadedWeightSum:null,//已装车重量
//                                    loadedVolumnSum:null//已装车体积
//                                }
//
//                                let oneGoodsNum=0,oneGoodsLoadingWeight=0,oneGoodsLoadingVolumn=0,
//                                    oneGoodsLoadedNum=0,oneGoodsLoadedWeight=0,oneGoodsLoadedVolumn=0
//                                if(queryItem.waybillGoodsEsDTOList.length>1){
//                                    queryItem.waybillGoodsEsDTOList.map(data=>{
//                                        //已装车件数=已发件数+装货件数：this.dispatcherDataInWaybillTable.loadingNum)
//                                        //已装车重量（体积）=已装车件数*单件重量（体积）
//                                        oneGoodsNum=math.eval(data.stockNum+'-'+data.lockNum)//一件商品的可装车件数
//                                        oneGoodsLoadingWeight=math.eval(math.eval(data.stockWeight+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                        oneGoodsLoadingVolumn=math.eval(math.eval(data.stockVolume+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                        oneGoodsLoadedNum=data.sendNum//一件商品的已装车件数
//                                        oneGoodsLoadedWeight=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingWeight)//一件商品的已装车重量
//                                        oneGoodsLoadedVolumn=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingVolumn)//一件商品的已装车体积
//                                        queryItem.goodsInfo.loadingNumSum+=oneGoodsNum
//                                        queryItem.goodsInfo.loadingWeightSum+=oneGoodsLoadingWeight
//                                        queryItem.goodsInfo.loadingVolumnSum+=oneGoodsLoadingVolumn
//                                        queryItem.goodsInfo.loadedNumSum+=oneGoodsLoadedNum
//                                        queryItem.goodsInfo.loadedWeightSum+=oneGoodsLoadedWeight
//                                        queryItem.goodsInfo.loadedVolumnSum+=oneGoodsLoadedVolumn
//                                    })
//                                }
//                                else{
//                                    queryItem.waybillGoodsEsDTOList.map(data=>{
//                                        oneGoodsNum=math.eval(data.stockNum+'-'+data.lockNum)//一件商品的可装车件数
//                                        oneGoodsLoadingWeight=math.eval(math.eval(data.stockWeight+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                        oneGoodsLoadingVolumn=math.eval(math.eval(data.stockVolume+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                        oneGoodsLoadedNum=data.sendNum//一件商品的已装车件数
//                                        oneGoodsLoadedWeight=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingWeight)//一件商品的已装车重量
//                                        oneGoodsLoadedVolumn=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingVolumn)//一件商品的已装车体积
//                                        queryItem.goodsInfo.loadingNumSum=oneGoodsNum
//                                        queryItem.goodsInfo.loadingWeightSum=oneGoodsLoadingWeight
//                                        queryItem.goodsInfo.loadingVolumnSum=oneGoodsLoadingVolumn
//                                        queryItem.goodsInfo.loadedNumSum=oneGoodsLoadedNum
//                                        queryItem.goodsInfo.loadedWeightSum=oneGoodsLoadedWeight
//                                        queryItem.goodsInfo.loadedVolumnSum=oneGoodsLoadedVolumn
//                                    })
//                                }
//
////                                current.copyInventoryData=arr
//                            }
////                            else{
////                            }
//                        })
//                    })
                 })
                 */
            },
            //当选中车牌号码时，用来显示车辆详情
            checkedVehicle(value){
                console.log("车牌号码选项发生变化了",value)
                let current=this
                current.remoteMethodAboutDriver()
                current.list.map(item=>{
                    if(item.vehicleNo===value){
                        if(current.carDetailList.length>0){
                            if(current.carDetailList.vehicleNo===value){
                                return
                            }
                            else{
                                current.carDetailList=[]
                                current.carDetailList.push(item)
                            }
                        }
                        else{
                            current.carDetailList.push(item)
                        }

                        console.log("carDetailList",current.carDetailList)
                    }
                })
            },
            //当选中司机名称时，对应显示该司机手机号码
            checkedDriver(value){
                console.log("司机名称选项发生变化了",value)
                let current=this
                console.log("list2",current.list2)
                current.remoteMethodAboutVehicle()
                current.list2.map(item=>{
                    if(item.driverName===value){
                        current.form.phoneNo=item.phoneNo
                        console.log("carDetailList",current.carDetailList)
                    }
                })
            },

            //清除车牌号码输入值
            clearSelectVehicle(){
              console.log("车牌号码值被清除了")
              console.log("driverList",this.driverList)

              let current=this
              if(current.driverName===''){

              }
              else{
                  current.isAutoCompletion=true
                  this.remoteMethodAboutVehicle()
              }
            },
            //清除司机名称输入值
            clearSelectDriver(){
                console.log("司机名称值被清除了")
                let current=this
                if(current.vehicleNo===''){

                }
                else{
                    current.isAutoCompletion=true
                    this.remoteMethodAboutDriver()
                }
                current.form.phoneNo=''
            },
            //清除运单号输入值
            clearSelectWaybillcode(){
                console.log("运单号被清除了")
                let current=this
                current.waybillCode=''
            },
            //查询车牌号码
            remoteMethodAboutVehicle(query) {
                console.log("query车牌号码值改变了",query)
                var current=this
                let temporaryList=[]
                if (query !== '') {
                    console.log("vehicleNo",current.form.vehicleNo)
                    console.log("driverName",current.form.driverName)
                    current.loading = true

                    //如果司机名称为空，则根据输入的值模糊查询车牌号码
                    if(current.form.driverName===''){
                        // 注释
                        /*
                        this.BX.s.requestTMS([
                            '/baseData/getVehicleListByVehicleNo?vehicleNo='+query,
                        ]).then(([res])=>{
                            current.list=res
                            if(current.list.length>0){
                                temporaryList=current.list.map(item=>{
                                    return {value:item.vehicleNo,label:item.vehicleNo}
                                })
                            }
                        })
                        */
                        setTimeout(() => {
                            current.loading = false
                            current.carNumList = temporaryList.filter(item => {
                                return item.label.toLowerCase()
                                        .indexOf(query.toLowerCase()) > -1
                            })
                        }, 200)
                        console.log("carNumList",current.carNumList)
                    }
                    //如果司机名称不为空，则根据司机ID查询车牌号码
                    else{
                        current.list2.map(item=>{
                            if(item.driverName===current.form.driverName){
                                console.log("id",item.id)
                                // 注释
                                /*
                                this.BX.s.requestTMS([
                                    '/baseData/getVehicleListByDriverId?driverId='+item.id,
                                ]).then(([res])=>{
                                    console.log("reslist426",res)
                                    current.list=res
                                    console.log("list428",current.list)
                                    if(current.list.length>0){
                                        temporaryList=current.list.map((item,index)=>{
                                            if(index===0&&!current.isAutoCompletion){
                                                console.log("index-------------",index)
                                                current.form.vehicleNo=item.vehicleNo
                                            }
                                            return {value:item.vehicleNo,label:item.vehicleNo}
                                        })
                                    }
                                    current.carNumList=temporaryList
                                    console.log("根据司机id查询车牌号码列表",current.carNumList)
                                })
                                */
                            }
                        })

                    }
                } else {
                    current.carNumList = []
                }
            },
            //查询司机名称
            remoteMethodAboutDriver(query){
                console.log("query司机姓名值改变了",query)
                var current=this
                let temporaryList=[]
                if (query !== '') {
                    console.log("vehicleNo",current.form.vehicleNo)
                    console.log("driverName",current.form.driverName)
                    current.loading = true

                    //如果车牌号码为空，则根据输入的值模糊查询司机名称
                    if(current.form.vehicleNo===''){
                        // 注释
                        /*
                        this.BX.s.requestTMS([
                            '/baseData/getDriverListByName?driverName='+query,
                        ]).then(([res])=>{
                            current.list2=res
                            console.log("driverlist",current.list2)
                            if(current.list2.length>0){
                                temporaryList=current.list2.map(item=>{
                                    return {value:item.driverName,label:item.driverName}
                                })
                            }
                        })
                        */
                        setTimeout(() => {
                            current.loading = false
                            current.driverList = temporaryList.filter(item => {
                                return item.label.toLowerCase()
                                        .indexOf(query.toLowerCase()) > -1
                            })
                        }, 200)
                        console.log("driverList",current.driverList)
                    }
                    //如果车牌号码不为空，则根据输入的车牌号码id查询司机名称
                    else{
                        console.log("445",current.form.vehicleNo)
                        current.list.map(item=>{
                            if(item.vehicleNo===current.form.vehicleNo){
                                console.log("id",item.id)
                                // 注释
                                /*
                                this.BX.s.requestTMS([
                                    '/baseData/getDriverListByVehicleId?vehicleId='+item.id,
                                ]).then(([res])=>{
                                    console.log("reslist",res)
                                    current.list2=res
                                    console.log("driverlist",current.list2)
                                    if(current.list.length>0){
                                        temporaryList=current.list2.map((item,index)=>{
                                            if(index===0&&!current.isAutoCompletion){
                                                current.form.driverName=item.driverName
                                                current.form.phoneNo=item.phoneNo
                                            }
                                            return {value:item.driverName,label:item.driverName}
                                        })
                                    }
                                    current.driverList=temporaryList
                                    console.log("根据车辆id查询司机列表",current.driverList)
                                })
                                */
                            }
                        })
                    }


                } else {
                    current.driverList = []
                }
            },
            //模糊查询运单号
            remoteMethodAboutWaybillcode(query){
                var current=this
                let temporaryList=[],list3=[]
                if (query !== '') {
                    current.loading = true
                    // 注释
                    /*
                    this.BX.s.requestTMS([
                        '/dispatcher/searchWaybillCodes/' + query,
                    ]).then(([res]) => {
                        list3 = res
                        if (list3.length > 0) {
                            temporaryList = list3.map(item => {
                                return {value: item, label: item}
                            })
                        }
                    })
                    */
                    setTimeout(() => {
                        current.loading = false
                        current.waybillcodeList = temporaryList.filter(item => {
                            return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1
                        })
                    }, 200)
                }
            },
            //让调整装车件数弹出层显示
            showLoadingNumDialog(){
                let current=this
                if(current.selectIdsFromWaybill.length){
                    console.log('1222222222222222222222')
                    this.dialogVisible=true
                    current.waybillTableData.map(data=>{
                        current.selectIdsFromWaybill.forEach(selectedData=>{
                            if(selectedData===data.waybill.waybillCode){
                                adjustLoadingNumData.push(data)
                            }
                        })
                    })
                    console.log(adjustLoadingNumData,'调整装车件数')
                }
                else{
                    return
                }

            },
            //表格底部合计
            hj(param){
//                console.log("-----------------",param)
                const current= this
                const sums = [],len=0
                const { columns, data } = param

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计'
                        return
                    let sum = 0

                    const values = data.map(item => {
                        sum++
                        let val = item[column.property]
                        if(column.property=="phoneNo"){
//                            val = item.batchCode
                            val=NaN
                        }
//                        else{
//
//                        }
                        return Number(val)
                    })
                    sums[current.isCheckBox?2:1]=sum+"笔"
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            }
                        }, 0)
                    }


                    }
                })

                return sums
            },
            handleClick(tab, event) {
//                 let current = this
//                 this.BX.s.tmsPromiseAll([
// //                    ...this.BX.s.fetchMultiDictionary('cllx pcdftfs ydzt fkfs', this.interfaceData),//2 interfaces
// //                    this.BX.s.callInterfaceAndSetData('/dependency/customer/getCustomerSalesman/{orgId}', this.interfaceD, 'customerSalesman',false),
//                     this.BX.s.callInterfaceAndSetData({
//                             url:'/dispatcher/queryWaybill',
//                             type:'post',
//                             data:{
// //                                "bespeakBeginTime": 0,
// //                                "bespeakEndTime": 0,
// //                                "branchId": 0,
// //                                "customerOrderCode": "string",
// //                                "receiveBeginTime": 0,
// //                                "receiveEndTime": 0,
// //                                "storageBeginTime": 0,
// //                                "storageEndTime": 0,
// //                                "warehouseId": 0,
// //                                "waybillCode": "string"
//                             }
//                         },
//                         this,'inventoryData',false),
//                 ]).then(([inventoryData])=>{
//                     current.copyInventoryData=current.inventoryData.slice(0)
//                     current.copyInventoryData.map(item=>{
//                         current.saveStockWaybillcode.push(item.waybill.waybillCode)
//                         item.goodsInfo={
//                             loadingNumSum:null,//可装车件数
//                             loadingWeightSum:null,//可装车重量
//                             loadingVolumnSum:null,//可装车体积
//                             loadedNumSum:null,//已装车件数
//                             loadedWeightSum:null,//已装车重量
//                             loadedVolumnSum:null//已装车体积
//                         }

//                         let oneGoodsNum=0,oneGoodsLoadingWeight=0,oneGoodsLoadingVolumn=0,
//                             oneGoodsLoadedNum=0,oneGoodsLoadedWeight=0,oneGoodsLoadedVolumn=0
//                         if(item.waybillGoodsEsDTOList.length>1){
//                             item.waybillGoodsEsDTOList.map(data=>{
//                                 //已装车件数=已发件数+装货件数：this.dispatcherDataInWaybillTable.loadingNum)
//                                 //已装车重量（体积）=已装车件数*单件重量（体积）
// //                                wayBillTable是一个数组
//                                 console.log(item,111)
//                                 oneGoodsNum=math.eval(data.stockNum+'-'+data.lockNum)//一件商品的可装车件数
//                                 oneGoodsLoadingWeight=math.eval(math.eval(data.stockWeight+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                 oneGoodsLoadingVolumn=math.eval(math.eval(data.stockVolume+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                 oneGoodsLoadedNum=data.sendNum//一件商品的已装车件数
//                                 oneGoodsLoadedWeight=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingWeight)//一件商品的已装车重量
//                                 oneGoodsLoadedVolumn=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingVolumn)//一件商品的已装车体积
//                                 item.goodsInfo.loadingNumSum+=oneGoodsNum
//                                 item.goodsInfo.loadingWeightSum+=oneGoodsLoadingWeight
//                                 item.goodsInfo.loadingVolumnSum+=oneGoodsLoadingVolumn
//                                 item.goodsInfo.loadedNumSum+=oneGoodsLoadedNum
//                                 item.goodsInfo.loadedWeightSum+=oneGoodsLoadedWeight
//                                 item.goodsInfo.loadedVolumnSum+=oneGoodsLoadedVolumn
//                                 console.log(item,"222")
//                             })
//                         }
//                         else{
//                             item.waybillGoodsEsDTOList.map(data=>{
//                                 oneGoodsNum=math.eval(data.stockNum+'-'+data.lockNum)//一件商品的可装车件数
//                                 oneGoodsLoadingWeight=math.eval(math.eval(data.stockWeight+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                 oneGoodsLoadingVolumn=math.eval(math.eval(data.stockVolume+'/'+data.stockNum)+'*'+oneGoodsNum)
//                                 oneGoodsLoadedNum=data.sendNum//一件商品的已装车件数
//                                 oneGoodsLoadedWeight=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingWeight)//一件商品的已装车重量
//                                 oneGoodsLoadedVolumn=math.eval(oneGoodsLoadedNum+'*'+oneGoodsLoadingVolumn)//一件商品的已装车体积
//                                 item.goodsInfo.loadingNumSum=oneGoodsNum
//                                 item.goodsInfo.loadingWeightSum=oneGoodsLoadingWeight
//                                 item.goodsInfo.loadingVolumnSum=oneGoodsLoadingVolumn
//                                 item.goodsInfo.loadedNumSum=oneGoodsLoadedNum
//                                 item.goodsInfo.loadedWeightSum=oneGoodsLoadedWeight
//                                 item.goodsInfo.loadedVolumnSum=oneGoodsLoadedVolumn
//                             })
//                         }
//                     })
//                     current.inventoryData=current.copyInventoryData.slice(0)
//                 })
//                 this.BX.s.requestTMS([
//                     '/dependency/customer/getCustomerSalesman/1',
//                 ]).then(([res])=>{
//                     current.salesMan=res
//                     console.log("add res",current.salesMan)
//                 })
            },
            //判断某个值是否在数组中
            isInArray(needle, haystack){
                let type = typeof needle
                if(type == 'string' || type =='number') {
                    for(var i in haystack) {
                        if(haystack[i] == needle) {
                            return true
                        }
                    }
                }
                return false
            },

            //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
            //调用：accAdd(arg1,arg2)
            //返回值：arg1加上arg2的精确结果
            accAdd(arg1,arg2){
                var r1,r2,m
                try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
                try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
                m=Math.pow(10,Math.max(r1,r2))
                return (arg1*m+arg2*m)/m
            },
            //说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
            //调用：accSub(arg1,arg2)
            //返回值：arg1减上arg2的精确结果
            accSub(arg1,arg2){
                return this.accAdd(arg1,-arg2)
            },
            //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
            //调用：accMul(arg1,arg2)
            //返回值：arg1乘以arg2的精确结果
            accMul(arg1,arg2){
                var m=0,s1=arg1.toString(),s2=arg2.toString()
                try{m+=s1.split(".")[1].length}catch(e){}
                try{m+=s2.split(".")[1].length}catch(e){}
                return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
            },
            //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
            //调用：accDiv(arg1,arg2)
            //返回值：arg1除以arg2的精确结果
            accDiv(arg1,arg2){
                var t1=0,t2=0,r1,r2
                try{t1=arg1.toString().split(".")[1].length}catch(e){}
                try{t2=arg2.toString().split(".")[1].length}catch(e){}
                r1=Number(arg1.toString().replace(".",""))
                r2=Number(arg2.toString().replace(".",""))
                return Math.abs(r1/r2)*Math.pow(10,t2-t1)
            },
            //消息提示
            messages(obj){
                let type = obj.type||'success'
                this.$message({
                    message: obj.message||(type=='success'?'操作成功':'操作失败'),
                    type: type,
                    iconClass:obj.iconClass||(type=='success'?'iconfont icon-chenggong':'iconfont icon-shanchuxx'),
                    duration:2000
                })
            },
//            copyInventoryData(stockQueryResult) {
//                if(stockQueryResult.length>0){
//                    return stockQueryResult.filter(function(eachData){
//                        console.log(eachData,"eachData")
////                        current.copyInventoryData.forEach(item=>{
////                            if(current.copyInventoryData.waybill.waybillCode==eachData.waybill.waybillCode){
////                                  return eachData
////                            }
////                        })
//
//                    })
//                    return stockQueryResult.filter(function(eachData){
//
//                    })
//                }else{
//                    return
//                }
////                return numbers.filter(function (number) {
////                    return number % 2 === 0
////                })
//            }
        },
        mounted(){
            //注释
            // this.BX.DEBUG_DATA.DISPATCHER_DATAIL_LIST=this
            this.handleClick()

        },
        computed:{
//            copyInventoryData:function(){
////                stockQueryResult
//                if(stockQueryResult.length>0){
//                    return this.stockQueryResult.filter(function(eachData){
//                        console.log(eachData,"eachData")
////                        current.copyInventoryData.forEach(item=>{
////                            if(current.copyInventoryData.waybill.waybillCode==eachData.waybill.waybillCode){
////                                  return eachData
////                            }
////                        })
//
//                    })
//                }else{
//                    return
//                }
//
//            }
        },
        watch:{

        },
        filters:{
            formatDate(time){
                let date = new Date(time)
                return date.getFullYear()+"-"+getFormat(date.getMonth()+1)+"-"+getFormat(date.getDate())+" "+getFormat(date.getHours())+":"+getFormat(date.getMinutes())
            }
        }
    }
    function getFormat(val){
        return val.toString().length>1?val:"0"+val
    }
</script>
