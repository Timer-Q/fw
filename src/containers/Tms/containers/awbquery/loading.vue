<template>
		<div>

				<div class="nav">

					<el-select class="select" v-model="value" placeholder="查询方案">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>


					   <div class="data">
					   		<p>接货日期</p>
		                    <div >
		                        <el-date-picker type="date" placeholder="" v-model="dispatcherBeginCreateTime"></el-date-picker>
		                    </div>

		                   <span>至</span>
		                    <div>
		                        <el-date-picker type="date" placeholder="" v-model="dispatcherEndCreateTime"></el-date-picker>
		                    </div>
	                </div>

						<!-- 单据网点 -->
					  <network></network>

						<!-- 收货地址 -->
					  <saddress></saddress>

	                <div class="el-form-item">
	                <label>运单号</label>
                    <el-input style="width:110px;" v-model="waybillCode"></el-input>
	                </div>
	                <div class="el-form-item">
	                    <el-button @click="showDetail">查询</el-button>
	                </div>
	                <div class="el-form-item">
	                    <a href="javascript:;" >高级查询</a>
	                </div>

			   </div>




				<el-table :data="data"  ref="allTable"   border show-summary  style="width: 100%; margin-top: 16px;">
                    <el-table-column  type="index" width="80" label="序号"></el-table-column>
                    <el-table-column  prop="waybill.waybillCode" label="运单号" width="100"></el-table-column>
                    <el-table-column  prop="waybill.customerOrderCode" label="客户单号" width="85"></el-table-column>
                    <el-table-column  prop="taskName" label="执行任务" width="85"></el-table-column>
                    <el-table-column  prop="vehicleName" label="车牌号 码" width="85"></el-table-column>
                    <el-table-column  prop="vehicleModelName" label="车型"></el-table-column>
                    <el-table-column  prop="driverName" label="司机姓名" width="85"></el-table-column>
                    <el-table-column  prop="phoneNo" label="手机号码" width="85"></el-table-column>
                    <el-table-column  prop="batchCode" label="派车批次" width="100"></el-table-column>
                    <el-table-column  prop="cost" label="配送成本" width="85"></el-table-column>
                    <el-table-column  prop="waybill.invoiceCompany" label="发货公司" width="85"></el-table-column>
                    <el-table-column  prop="waybill.invoiceUser" label="发货人"></el-table-column>
                    <el-table-column  prop="waybill.invoiceTelNo" label="发货人电话" width="100"></el-table-column>
                    <el-table-column  prop="waybill.invoiceMobleNo" label="发货人手机" width="95"></el-table-column>
                    <el-table-column  prop="waybill.invoiceAddress" label="发货地址" width="85"></el-table-column>
                    <el-table-column  prop="waybill.receiptCompany" label="收货公司" width="85"></el-table-column>
                    <el-table-column  prop="waybill.receiptUser" label="收货人"></el-table-column>
                    <el-table-column  prop="waybill.receiptConsignorTelN" label="收货人电话" width="100"></el-table-column>
                    <el-table-column  prop="waybill.receiptConsignorMobleNo" label="收货人手机" width="100"></el-table-column>
                    <el-table-column  prop="waybill.receiptAddress" label="收货地址" width="85"></el-table-column>
                    <el-table-column  prop="waybill.status" label="运单状态" width="100"></el-table-column>
                    <el-table-column  prop="waybill.goodsName" label="货物名称" width="100"></el-table-column>
                    <el-table-column  prop="waybill.packages" label="包装"></el-table-column>
                    <el-table-column  prop="waybill.totalNum" label="件数"></el-table-column>
                    <el-table-column  prop="waybill.weight" label="重量（kg）" width="100"></el-table-column>
                    <el-table-column  prop="waybill.volume" label="体积（m³）" width="100"></el-table-column>
                    <el-table-column  prop="waybill.destName" label="目的地"></el-table-column>
                    <el-table-column  prop="waybill.backType" label="回单要求" width="90"></el-table-column>
                    <el-table-column  prop="waybill.backNum" label="回单份数" width="90"></el-table-column>
                    <el-table-column  prop="waybill.backCode " label="回单编号" width="90"></el-table-column>
                    <el-table-column  prop="waybill.payWay" label="付款方式" width="90"></el-table-column>
                    <el-table-column  prop="waybill.totalFee" label="总运费"></el-table-column>
                    <el-table-column  prop="waybill.deliveryCharges" label="送货费"></el-table-column>
                    <el-table-column  prop="collectPayment" label="代收货款" width="90"></el-table-column>
                    <el-table-column  prop="declaredValue" label="声明价值" width="90"></el-table-column>
                    <el-table-column  prop="waybill.distributionType " label="配送方式" width="90"></el-table-column>
                    <el-table-column  prop="waybill.remark" label="备注"></el-table-column>
                    <el-table-column  prop="waybill.arrivalTime" label="预计到达日期" width="120"></el-table-column>
                    <el-table-column  prop="waybill.orderDate" label="录单时间" width="90"></el-table-column>
                    <el-table-column  prop="waybill.billTime" label="指派时间" width="90"></el-table-column>
                    <el-table-column  prop="waybill.acceptDate" label="接单时间" width="90"></el-table-column>
                    <el-table-column  prop="waybill.shippingTime" label="装货时间" width="90"></el-table-column>
                    <el-table-column  label="发货时间" width="90"></el-table-column>
                    <el-table-column  prop="waybill.assignRemarks" label="指派备注" width="90"></el-table-column>
                    <el-table-column  prop="waybill.dotId" label="指派网点" width="90"></el-table-column>
                    <el-table-column  label="指派类型" width="90"></el-table-column>
                </el-table>
		</div>
</template>

<script>
	import network from './components/network'
    import saddress from './components/address'
    import service from '@Tms/services/awbquery/awbqueryService.js'
	export default {
	data(){
		return{
			data:[],
				 options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }] ,
		        value: '',
		        region:"",
		        address:"",
		        dispatcherBeginCreateTime:"",
		        dispatcherEndCreateTime:"",
		        waybillCode:'',

		}
	},
	methods:{
//		clickdata(){
//				this.$http.post('http://192.168.177.152:8989/tms-web/distributionWaybillQuery/getDistributionwaybill',{
//				  "currentDotId": 0,
//				   "currentPage": 0,
//				   "driverName": "",
//				   "endAcceptDate": 0,
//				   "endDepartDate": 0,
//				   "endLoadingDate": 0,
//				   "pageSize": 0,
//				   "startAcceptDate": 0,
//				   "startDepartDate": 0,
//				   "startLoadingDate": 0,
//				   "status": "LOADED",
//				   "waybillCode": ""
//				}).then((response) => {
//
//			  		this.data=response.data.result
//			       console.log(this.data)
//		        })
//
//
//    	}
        async clickdata(){
            this.loading = true

            try {
                const data = await service.loading({
                    "currentDotId": 0,
				   "currentPage": 0,
				   "driverName": "",
				   "endAcceptDate": 0,
				   "endDepartDate": 0,
				   "endLoadingDate": 0,
				   "pageSize": 0,
				   "startAcceptDate": 0,
				   "startDepartDate": 0,
				   "startLoadingDate": 0,
				   "status": "LOADED",
				   "waybillCode": ""
                })
                if (data.status == 200) {
//                        console.log(data)
                    this.data=data.data.result
//                        console.log(this.data)
                } else {
                    console.log(1)
                }
                this.loading = false
            }
            catch (e) {
                console.log(e)
            }
        },
    	showDetail(){

    	}
	},
	mounted(){
		this.clickdata()
	},
	components:{
		 network,
		 saddress
	}
}

</script>

<style  lang="less" type="text/less" scoped>
		.el-select{
			width: 95px;
			margin-left: 10px;
		}
		.select{
			float: left;
		}

		label{
			font-size: 12px;
			color: #333;
		}

		.form-select{
			width: 170px;
			float: left;
			margin-left: 8px;
		}

     .el-date-editor.el-input{

				width: 110px;
		}
	.data{
		width: 325px;
		height: 30px;
		float: left;
		font-size: 12px;
		margin-left: 8px;
		p{
			float: left;
		}
		span{
			float: left;
			margin-left: 8px;
		}

		div{
			float: left;
			margin-left: 5px;
		}
	}

	.el-form-item{
		float:left;
		margin-left: 5px;

		a{
			font-size: 12px;
			color: #000;
		}
	}
	.nav{
			background: #e4e4e4;
			height: 50px;
			line-height: 50px;
			border:1px solid #ccc;
		}

		.el-button{
			margin: 16px 10px 16px 0;
			background: #999;
			color: #fff;
			height: 25px;
			line-height: 25px;
			font-size: 12px;
		}




</style>
