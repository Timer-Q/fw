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


					  	<!-- 单据网点 -->
						<network></network>

					  <!-- 收货区域 -->
					  <saddress></saddress>

					   <div class="data">
					   		<p>配送时间段</p>
		                    <div >
		                        <el-date-picker type="date" placeholder="" v-model="dispatcherBeginCreateTime"></el-date-picker>
		                    </div>

		                   <span>至</span>
		                    <div>
		                        <el-date-picker type="date" placeholder="" v-model="dispatcherEndCreateTime"></el-date-picker>
		                    </div>
	                </div>

	                <div class="el-form-item">
	                <label>运单号</label>
                    <el-input style="width:110px;" v-model="waybillCode"></el-input>
	                </div>
	                <div class="el-form-item">
	                    <el-button @click="showDeta">查询</el-button>
	                </div>
	                <div class="el-form-item">
	                    <a href="javascript:;" >高级查询</a>
	                </div>

			   </div>



				<el-table :data="data"  tooltip-effect="dark" ref="multipleTable" show-summary height=400   border style="width: 100%; margin-top: 16px; " @select="handleSelectionChange" @select-all="selectAll">
                    <el-table-column type="index" width="80" label="序号"></el-table-column>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="waybill.waybillCode" label="运单号" width="120"></el-table-column>
                    <el-table-column  prop="waybill.customerOrderCode" label="客户单号" width="85"></el-table-column>
                    <el-table-column  prop="wyabill.taskName" label="执行任务" width="85"></el-table-column>
                    <el-table-column prop="releaseTypeName" label="撤回类型" width="85"></el-table-column>
                    <el-table-column prop="waybill.destName" label="配送成本" width="85"></el-table-column>
                    <el-table-column prop="waybill.invoiceCompany" label="发货公司" width="85"></el-table-column>
                    <el-table-column prop="waybill.invoiceUser" label="发货人" width="85"></el-table-column>
                    <el-table-column prop="waybill.invoiceTelNo" label="发货人电话" width="100"></el-table-column>
                    <el-table-column prop="waybill.invoiceMobleNo" label="发货人手机" width="100"></el-table-column>
                    <el-table-column prop="waybill.invoiceAddress" label="发货地址" width="85"></el-table-column>
                    <el-table-column prop="waybill.receiptCompany" label="收货公司" width="85"></el-table-column>
                    <el-table-column  prop="waybill.receiptUser" label="收货人"></el-table-column>
                    <el-table-column  prop="waybill.receiptConsignorTelNo" label="收货人电话" width="100"></el-table-column>
                    <el-table-column  prop="waybill.receiptConsignorMobleNo" label="收货人手机" width="95"></el-table-column>
                    <el-table-column  prop="waybill.receiptAddress" label="收货地址" width="85"></el-table-column>
                    <el-table-column  prop="waybill.deliveryPickTime" label="预约提货时间" width="120"></el-table-column>
                    <el-table-column  prop="waybill.deliverySendTime" label="预约送货时间" width="120"></el-table-column>
                    <el-table-column  prop="waybill.status" label="运单状态" width="85"></el-table-column>
                    <el-table-column  prop="waybil.goodsName" label="货物名称" width="85"></el-table-column>
                    <el-table-column  prop="waybill.packages" label="包装"></el-table-column>
                    <el-table-column  prop="waybill.totalNum" label="件数"></el-table-column>
                    <el-table-column  prop="waybill.weight" label="重量（kg）" width="100"></el-table-column>
                    <el-table-column  prop="waybill.volume" label="体积（m³）" width="100"></el-table-column>
                    <el-table-column  prop="waybill.destName" label="目的地"></el-table-column>
                    <el-table-column  prop="waybill.backType" label="回单要求" width="90"></el-table-column>
                    <el-table-column  prop="waybill.backNum" label="回单份数" width="90"></el-table-column>
                    <el-table-column  prop="waybill.backCode" label="回单编号" width="90"></el-table-column>
                    <el-table-column  prop="waybill.payWay" label="付款方式" width="90"></el-table-column>
                    <el-table-column  prop="waybill.totalFee" label="总运费"></el-table-column>
                    <el-table-column  prop="waybill.deliveryCharges" label="送货费"></el-table-column>
                    <el-table-column  prop="waybill.collectPayment" label="代收货费" width="90"></el-table-column>
                    <el-table-column  prop="waybill.declaredValue" label="声明价值" width="90"></el-table-column>
                    <el-table-column  prop="waybill.distributionType" label="配送方式" width="90"></el-table-column>
                    <el-table-column  prop="waybill.remark" label="备注"></el-table-column>
                    <el-table-column  prop="waybill.arrivalTime" label="预计到达日期" width="120"></el-table-column>
                    <el-table-column  prop="waybill.orderDate" label="录单日期" width="90"></el-table-column>
                    <el-table-column  prop="acceptDate" label="接单日期" width="90"></el-table-column>
                    <el-table-column  prop="billTime" label="指派时间" width="90"></el-table-column>
                    <el-table-column  prop="cancelReleaseTime" label="撤回时间" width="90"></el-table-column>
                     <el-table-column prop="cancelReleaseUser" label="撤回人" width="90"></el-table-column>
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
		        }],
		        value: '',
		        region:"",
		        address:"",
		        dispatcherBeginCreateTime:"",
		        dispatcherEndCreateTime:"",
		        data:[],
		        waybillCode:''
		}
	},
	methods:{

        async clickdata(){
            this.loading = true
            // 页面
            try {
                const data = await service.withdraw({
                    "currentDotId": 0,
                    "currentPage": 1,
                    "endAcceptDate": 0,
                    "pageSize": 15,
                    "receivingArea": "",
                    "startAcceptDate": 0,
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
        async showDeta(){
            this.loading = true
            // 查询
            try {
                const data = await service.showdetail({
                    "waybillCode": this.waybillCode,
                    "currentDotId": 0,
                    "currentPage": 1,
                    "endAcceptDate": 0,
                    "pageSize": 15,
                    "receivingArea": "",
                    "startAcceptDate": 0,
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
//		clickdata(){
//				this.$http.post('http://192.168.177.152:8989/tms-web/distributionWaybillQuery/getCancelBill',{
//				  "currentDotId": 0,
//				  "currentPage": 1,
//				  "endAcceptDate": 0,
//				  "pageSize": 15,
//				  "receivingArea": "",
//				  "startAcceptDate": 0,
//				  "waybillCode": ""
//				}).then((response) => {
//
//			  		this.data=response.data.result
//			       // console.log(response)
//		        })
//
//
//    	},
//    	showDetail(){
//    			this.$http.post('http://192.168.177.152:8989/tms-web/distributionWaybillQuery/getCancelBill',{
//				  "currentDotId": 0,
//				  "currentPage": 1,
//				  "endAcceptDate": 0,
//				  "pageSize": 15,
//				  "receivingArea": "",
//				  "startAcceptDate": 0,
//				  "waybillCode": this.waybillCode
//				}).then((response) => {
//			  		this.data=response.data.result
//		        })
//    	},
    	handleSelectionChange(val){
      	let data=[]
      	val.forEach((item)=>{
      		data.push(item.waybill)

      	})

      	this.$emit("getVal",data)
      },
      selectAll(val){
      	val.forEach((item)=>{
      		this.$emit("getVal", item.waybill)
      	})
      }
	},
	components:{
      network,
      saddress
  },
	mounted(){
		this.clickdata()
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
			line-height: 7px;
			font-size: 12px;
		}




</style>
