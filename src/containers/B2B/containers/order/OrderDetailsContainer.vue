<template>
    <div class="test" ref="scroll">
        <Collapse v-model="activeNames" class="my">
            <CollapseItem title="订单状态" ref="order" name="order">
                <div class="order">
                    <div class="order-each" v-for="(item,index) in orderState">
                        <span :class="['circular','complete']">{{item}}</span>
                        <span :class="['line','complete']" v-if="orderState.length-1!=index"></span>
                    </div>
                </div>
            </CollapseItem>
            <CollapseItem title="基本信息" ref="basic" name="basic">
                <div class="basic">
                    <div class="">
                        <p>
                            <span>订单编号：</span>
                            <span>{{orderLogData.orderNo}}</span>
                        </p>
                        <p>
                            <span>销售平台：</span>
                            <span></span>
                        </p>
                        <p>
                            <span>实收金额：</span>
                            <span>{{orderLogData.payableAmount}}</span>
                        </p>
                        <p>
                            <span>获取时间：</span>
                            <span>{{orderLogData.createTime}}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>经销商：</span>
                            <span>{{orderLogData.dealerName}}</span>
                        </p>
                        <p>
                            <span>店铺：</span>
                            <span>{{orderLogData.shopName}}</span>
                        </p>
                        <p>
                            <span>优惠金额：</span>
                            <span>{{orderLogData.savedAmount}}</span>
                        </p>
                        <p>
                            <span>录单员：</span>
                            <span></span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>订单状态：</span>
                            <span>{{orderLogData.stateDesc}}</span>
                        </p>
                        <p>
                            <span>支付方式：</span>
                            <span>{{orderLogData.paymentMethodDesc}}</span>
                        </p>
                        <p>
                            <span>支付渠道：</span>
                            <span>{{orderLogData.paymentTypeDesc}}</span>
                        </p>
                        <p>
                            <span>业务员：</span>
                            <span></span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>订单类型：</span>
                            <span></span>
                        </p>
                        <p>
                            <span>支付状态：</span>
                            <span>{{orderLogData.payOrNotDesc}}</span>
                        </p>
                        <p>
                            <span>外部单号：</span>
                            <span></span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>订单来源：</span>
                            <span></span>
                        </p>
                        <p>
                            <span>订单金额：</span>
                            <span>{{orderLogData.totalAmount}}</span>
                        </p>
                        <p>
                            <span>下单时间：</span>
                            <span>{{orderLogData.orderTime}}</span>
                        </p>
                    </div>
                </div>
            </CollapseItem>
            <CollapseItem title="收发货信息" ref="goods" name="goods">
                <div class="goods">
                    <div class="customer">
                        <p>
                            <span>客户编号：</span>
                            <span>{{orderLogData.merchantId}}</span>
                        </p>
                        <p>
                            <span>客户名称：</span>
                            <span>{{orderLogData.merchantName}}</span>
                        </p>
                        <p>
                            <span>客户联系人：</span>
                            <span>{{orderLogData.primaryName}}</span>
                        </p>
                        <p>
                            <span>联系方式：</span>
                            <span>{{orderLogData.primaryPhone}}</span>
                        </p>
                    </div>
                    <div class="waybill">
                        <div>
                            <p>
                                <span>门店名称：</span>
                                <span>{{orderLogData.shopName}}</span>
                            </p>
                            <p>
                                <span>发货仓库：</span>
                                <span>{{orderLogData.storeHouse}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>收货人：</span>
                                <span>{{orderLogData.receiverName}}</span>
                            </p>
                            <p>
                                <span>发货人：</span>
                                <span>{{orderLogData.sender}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>联系方式：</span>
                                <span>{{orderLogData.receiverPhone}}</span>
                            </p>
                            <p>
                                <span>联系方式：</span>
                                <span>{{orderLogData.senderPhone}}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>收货地址：</span>
                                <span>{{orderLogData.receiverAddress}}</span>
                            </p>
                            <p>
                                <span>发货地址：</span>
                                <span>{{orderLogData.senderAddress}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </CollapseItem>
            <CollapseItem title="商品" ref="commodity" name="commodity">
                <Table
                    :data="goodsList"
                    border
                    :highlight-current-row="true"
                >
                    <TableColumn
                        type="index"
                        width="50"
                        fixed
                        label="序号">
                    </TableColumn>
                    <TableColumn
                        prop="goodsBarcode"
                        label="商品条码">
                    </TableColumn>
                    <TableColumn
                        prop="goodsName"
                        label="商品名称">
                        <template slot-scope="scope">
                            <i class="iconfont"></i>
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </TableColumn>
                    <TableColumn
                        prop=""
                        label="规格">
                    </TableColumn>
                    <TableColumn
                        prop=""
                        label="购买数量">
                    </TableColumn>
                    <TableColumn
                        prop=""
                        label="缺货数量">
                    </TableColumn>
                    <TableColumn
                        prop="integerZeroConvert"
                        label="整零转换">
                    </TableColumn>
                    <TableColumn
                        prop=""
                        label="商品原价(元)">
                    </TableColumn>
                    <TableColumn
                        prop="orderPrice"
                        label="商品售价(元)">
                    </TableColumn>
                    <TableColumn
                        prop=""
                        label="售价商品金额(元)"
                    >
                    </TableColumn>
                    <TableColumn
                        prop=""
                        label="客服优惠金额(元)"
                    >
                    </TableColumn>
                </Table>
            </CollapseItem>
            <CollapseItem title="支付信息" ref="pay" name="pay">
                <Table
                    :data="payList"
                    border
                    :highlight-current-row="true"
                >
                    <TableColumn
                        type="index"
                        width="50"
                        fixed
                        label="序号">
                    </TableColumn>
                    <TableColumn
                        prop="paymentAmount"
                        label="支付金额">
                    </TableColumn>
                    <TableColumn
                        prop="payTime"
                        label="支付时间">
                    </TableColumn>
                    <TableColumn
                        prop="paymentNo"
                        label="支付凭证号">
                    </TableColumn>
                    <TableColumn
                        prop="memo"
                        label="备注">
                    </TableColumn>
                </Table>
            </CollapseItem>
            <CollapseItem title="备注" ref="remark" name="remark">
                <div class="remark">
                    <div>
                        <h4>买方备注</h4>
                        <span>{{orderLogData.memo}}</span>
                    </div>
                    <div>
                        <h4>卖方备注</h4>
                        <span></span>
                    </div>
                    <div>
                        <h4>客服备注</h4>
                        <span></span>
                    </div>
                    <div>
                        <h4>财审备注</h4>
                        <span></span>
                    </div>
                    <div>`
                        <h4>系统备注</h4>
                        <span></span>
                    </div>
                </div>
            </CollapseItem>
        </Collapse>
    </div>
</template>
<style lang="scss" scoped>
    .order{
        overflow: hidden;
        clear: both;
        margin: 25px auto;
        .order-each{
            float: left;
            span{
                display: block;
                background: #dddddd;
                color: #8d8d8d;
                text-align: center;
                font-size: 12px;
                line-height: 100px;
                float: left;
                &.circular{
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                }
                &.line{
                    width: 100px;
                    height: 10px;
                    margin-top: 45px;
                }
                &.complete{
                    background: #29a7e1;
                    color: #ffffff;
                }
            }
        }
    }
    .basic,.goods .waybill{
        margin-top: 5px;
        clear: both;
        overflow: hidden;
        div{
            float: left;
            p{
                clear: both;
                overflow: hidden;
                span{
                    float: left;
                    display: block;
                    line-height: 30px;
                    &:first-child{
                        width: 100px;
                        text-align: right;
                    }
                }
            }
        }
    }
    .goods{
        .customer{
            margin:0 16px;
            line-height: 30px;
            border-bottom: 1px dashed #f4f4f4;
            clear: both;
            overflow: hidden;
            padding-bottom: 5px;
            p{
                float: left;
                span{
                    float: left;
                    display: block;
                    line-height: 30px;
                    &:first-child{
                        width: 100px;
                        text-align: right;
                    }
                }
            }
        }
    }
    .remark{
        overflow: hidden;
        clear: both;
        div{
            padding-left:10px;
            padding-right: 25px;
            box-sizing: border-box;
            float: left;
            width: 19%;
            border-right:1px dashed #f4f4f4;
            &:last-of-type{
                border:0;
            }
            h4{
                color: #4d4d4d;
            }
            span{
                word-break:break-all;
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
                overflow:hidden;
                color: #dddddd;
            }
        }
    }
</style>
<script>
    import scrollMixins from '@/mixins/scrollMixins.js'
    export default{
        mixins: [scrollMixins],
        data(){
            return{
                orderState:['订单确认','审单中','发货中','配送中','已送达','完成'],
                activeNames:["order","basic","goods","commodity","pay","remark"],
                orderLogData:{},
                goodsList:[],
                payList:[]
            }
        },
        methods:{

            async getOrderDetail(orderNo){
                const _this = this
                this.loading = true
                try {
                    const data = await orderService.getOrderDetailByOrderNo(orderNo)
                    if (data.status == 200&&data.data.result!=undefined) {
                        _this.orderLogData = data.data.result
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("查询失败","error")
                    }
                    this.loading = false
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
                this.editScroll()
            },
            // 点击tab更改scrollTop
            changeScrollTop(activeName){
                const selTop = this.$refs[activeName].$el.offsetTop
                this.$el.scrollTop = selTop-70
            }
        },
        mounted(){
            const _this = this
            this.getOrderDetail(this.parentObj.orderNo)
            this.$root.bus.$on("tabsChangeByactiveName",(activeName)=>{
                _this.changeScrollTop(activeName)
            })

        }
    }
</script>
