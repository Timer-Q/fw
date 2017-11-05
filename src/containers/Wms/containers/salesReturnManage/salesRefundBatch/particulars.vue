<template>
  <div class="wms-itmes">
    <div class="details">
        <div class="content-up">
            <div class="content-detail">
                <div>
                    <span>退货仓库:</span>
                    <p>{{notifyDetail.warehouseName}}</p>
                </div>
                <div>
                    <span>出库单号:</span>
                    <p>{{notifyDetail.outBoundOrderNo}}</p>
                </div>
                <div>
                    <span>客户名称:</span>
                    <p>{{notifyDetail.customerName}}</p>
                </div>
                <div>
                    <span>司机:</span>
                    <p>{{notifyDetail.driver}}</p>
                </div>
                <div>
                    <span>承运商名称:</span>
                    <p>{{notifyDetail.deliveryCompanyName}}</p>
                </div>
            </div>
            <div class="content-detail">
                <div>
                    <span>货主:</span>
                    <p>{{notifyDetail.ownerName}}</p>
                </div>
                <div>
                    <span>销退单来源:</span>
                    <p>{{notifyDetail.orderSource}}</p>
                </div>
                <div>
                    <span>客户联系方式:</span>
                    <p>{{notifyDetail.customerContactInfo}}</p>
                </div>
                <div>
                    <span>司机联系方式:</span>
                    <p>{{notifyDetail.driverContactInfo}}</p>
                </div>
                <div>
                    <span>运单号:</span>
                    <p>{{notifyDetail.waybillNo}}</p>
                </div>
            </div>
            <div class="content-detail">
                <div>
                    <span>销退单号:</span>
                    <p>{{notifyDetail.saleReturnNo}}</p>
                </div>
                <div>
                    <span>销退单类型:</span>
                    <p>{{notifyDetail.saleReturnNo}}</p>
                </div>
                <div>
                    <span>客户地址:</span>
                    <p>{{notifyDetail.customerAddrId}}</p>
                </div>
                <div>
                    <span>仓库联系人:</span>
                    <p>{{notifyDetail.customerContacter}}</p>
                </div>
                <div>
                    <span></span>
                    <p></p>
                </div>
            </div>
            <div class="content-detail">
                <div>
                    <span>原订单号:</span>
                    <p>{{notifyDetail.saleOrderNo}}</p>
                </div>
                <div>
                    <span>销售平台:</span>
                    <p>{{notifyDetail.salesPlatform}}</p>
                </div>
                <div>
                    <span></span>
                    <p></p>
                </div>
                <div>
                    <span>仓库联系方式:</span>
                    <p>{{notifyDetail.customerContactInfo}}</p>
                </div>
            </div>
        </div>
        <div class="content-down">
            <div class="information-list">
                <p>销退单号：{{notifyDetail.saleReturnNo}}</p>
                <Table :data="selectionDetailList" border style="width: 100%"
                          :default-sort="{prop: 'date', order: 'descending'}">
                    <TableColumn type='index' label="序号" width=""></TableColumn>
                    <TableColumn prop="goodsBarCode" label="商品条码" width=""></TableColumn>
                    <TableColumn prop="goodsName" label="商品名称" width=""></TableColumn>
                    <TableColumn prop="unitConvertText" label="整零转换" width=""></TableColumn>
                    <TableColumn prop="planQty" label="应收数量" width=""></TableColumn>
                    <TableColumn prop="actualQty" label="实收数量" width=""></TableColumn>
                    <TableColumn prop="unitId" label="单位" width=""></TableColumn>
                    <TableColumn prop="reason" label="退货原因" width=""></TableColumn>
                </Table>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="es6">
    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'
    import service from '@Wms/services/salesReturnManage/salesRefundBatch/salesRefundBatchService'

    let _this = null
    let api = {
        getlabelDetailList: '/wms-inbound-server/salereturnorder/get',//详情
    }
  export default {
      created(){
          _this = this
          _this.api = api
      },
    data () {
      return {
          selectionDetailLabelNo: '-',//表单表头数据单号

          notifyDetail: {}, // 表单字段存储
          selectionDetailList: []// 列表字段存储
      }
    },
    methods: {

    },
      mounted() {
//          this.getDetailList()
          let supData = JSON.parse(window.localStorage.wms_sales_refund_list)
          console.log(supData)
          this.notifyDetail = supData.rowData
          this.selectionDetailList = supData.detailList
      }
  }
</script>

<style scoped lang="scss" type="text/scss">
        .details {
            padding: 10px 16px;
            .content-up {
                margin-bottom: 10px;
                border: 1px solid #ccc;
                padding: 16px;
                display: inline-block;
                width: 98%;
                .content-title {
                    margin: 10px 0 16px 16px;
                    color: #28a7e1;
                    font-size: 14px;
                    text-align: left;
                }
                .content-detail {
                    width: 23%;
                    /*display: inline-block;*/
                    float: left;
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
                .information-list {
                    margin-top: 16px;
                    width: 60%;
                    p {
                        border: 1px solid #ccc;
                        border-bottom: none;
                        height: 30px;
                        line-height: 30px;
                        color: #28a7e1;
                        padding-left: 10px;
                        background: #F5F5F5;
                    }
                }
            }
        }
</style>

