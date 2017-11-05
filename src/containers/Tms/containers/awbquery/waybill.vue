<template>
	<div class="main">
		<div class="el-tabs el-tabs--card">
			<div class="el-tabs__header">
				<div class="el-tabs__nav-wrap">
					<div class="el-nav-scroll">
						<div class="el-tabs__nav">
							<div class="el-tabs__item">全部</div>
							<div class="el-tabs__item" v-bind:class="{active:isactive}">派车单</div>
							<div class="el-tabs__item">已开单</div>
							<div class="el-tabs__item">在途中</div>
							<div class="el-tabs__item">已到达</div>
							<div class="el-tabs__item">已外发</div>
							<div class="el-tabs__item">已签收</div>
							<div class="el-tabs__item">异常件</div>
							<div class="el-tabs__item">已作废</div>
					    </div>

			         </div>
			    </div>
			</div>
			<div class="el-container">
				<div v-if="showList">
					<el-button>运单跟踪</el-button>
					<router-link to="/tms/all/driver" tag="el-button" @click.native="transfer">指派司机</router-link>
					<el-button>指派车队</el-button>
					<el-button>地图指派</el-button>
					<el-button>智能调度</el-button>
					<el-button>导出</el-button>
				</div>
				<div v-if="showList2">
					<el-button>运单跟踪</el-button>
					<el-button>导出</el-button>
				</div>


				<ul class="lis">
					<router-link to="/tms/all/waybill/manage" tag="li">待处理<span>{{codid.arrivedCount}}</span></router-link>
					<router-link to="/tms/all/waybill/assign" tag="li">已指派<span>{{codid.assignedCount}}</span></router-link>
					<router-link to="/tms/all/waybill/taking" tag="li">已接单<span>{{codid.acceptedCount}}</span></router-link>
					<router-link to="/tms/all/waybill/loading" tag="li">已装货<span>{{codid.loadedCount}}</span></router-link>
					<router-link to="/tms/all/waybill/depart" tag="li">已发车<span>{{codid.departedCount}}</span></router-link>
					<router-link to="/tms/all/waybill/withdraw" tag="li">撤回单<span>{{codid.cancelCount}}</span></router-link>
				</ul>

				<router-view @getVal='getVal'></router-view>

			</div>
		</div>
	</div>
</template>
<script>
import service from '@Tms/services/awbquery/awbqueryService.js'
export default{
	data(){
		return {
			isactive:true,
			ac_move:true,
			codid:[],
			val:''
		}
	},
	computed: {

		showList () {
			return (this.$route.name === 'tms_manage' || this.$route.name === 'tms_withdraw')
		},
		showList2 () {
			return (this.$route.name === 'tms_assign' || this.$route.name === 'tms_taking' || this.$route.name === 'tms_loading' || this.$route.name === 'tms_depart')
		}
	},
	methods:{

        /* 每列数据*/
        async DotId(){

            this.loading = true
            // 页面
            try {
                const data = await service.dotd({
                    "currentDotId":3
                })
                if (data.status == 200) {
                    this.codid=data.data.result
                } else {
                    console.log(1)
                }
                this.loading = false
            }
            catch (e) {
                console.log(e)
            }
        },
		    	transfer(){
		    	   // 点击指派按钮，将数据存储在localstory中保存，为了之后的项目集成考虑，不用动态路由的方式传递参数，用这个黑科技传递参数
	    		   localStorage.driver=JSON.stringify(this.val)
		    	},
		    	getVal(val){
		    		this.val = val
		    	}

	},
	mounted(){
			this.DotId()
	}
}
</script>
<style  lang="less" type="text/less" scoped>
		.main{
			margin-top: 20px;
		}
		.active{

			    border-bottom-color: #fff;
			    position: relative;
			    top: 1px;
			    background: #fff;
		}

		.el-tabs__item{
			color:#000;
			border-radius: 0;
		}
		.el-button{
			margin: 16px 10px 16px 0;
			background: #999;
			color: #fff;
			height: 25px;
			line-height: 5px;
			font-size: 12px;
		}


		.lis{
			list-style: none;
			height: 50px;
			border-top: 1px solid #ccc;
			font-size: 14px;
			color: #666;
			li{
				float: left;
				line-height: 40px;
				margin-right: 28px;
				cursor: pointer;
			}
		}

		.router-link-active{
			border-bottom: 1px solid #666;
		}





</style>
