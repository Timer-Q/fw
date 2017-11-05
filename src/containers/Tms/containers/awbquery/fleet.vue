<template>
	<div>
	<div class="user" v-for="(item,index) in items2" @click="add_bg2(index)" :class="{'us_bg':item.ind}">
					<div class="car_l">
						<img src="./img/car.jpg" alt="">
					</div>
					<div class="car_r">
						<p>{{item.fleetName}}</p>

						<b>{{item.vehicleNum}}辆</b>
					</div>

					<div class="zero">
						<span></span>
					</div>

				</div>
				<div class="rig_add">
					<el-checkbox v-model="checked">全选</el-checkbox>
					<p>共选中司机：<span>2</span></p>
				</div>
	</div>
</template>
<script>
import Vue from 'vue'
import service from '@Tms/services/awbquery/awbqueryService.js'
export default{
	data(){
		return {
			 items2:[],
			 checked:false,
              status:1,
               paramet:[]
		}
	},
	methods:{

		 /*右侧点击添加类*/
	    add_bg2(index){
	   		this.items2[index].ind=!this.items2[index].ind
	   		// set页面刷新
	   		Vue.set(this.items2,index,this.items2[index])

            this.paramet=[]
            this.items2.forEach((ite)=>{
                if(ite.ind==true){
                    this.paramet.push(ite)
                    console.log(this.paramet)
                }
            })
            //向父组件传递数据
            this.$emit('childData',this.paramet)
	    },

        async loadfleet(data){

            try {
                const data = await service.fleet()
                if (data.status == 200) {
                    console.log(data)
                    this.items2=data.data.result

                    // 每个数据插入ind
                    this.items2.forEach(function(item){
                        item.ind=false
                    })
                } else {
                    console.log(1)
                }
            }
            catch (e) {
                console.log(e)
            }
        },
	},
	mounted(){

        this.loadfleet()
        //向父组件传递状态
        this.$emit('childStatus',this.status)

	}
}
</script>

<style lang="less" scoped>
	.user{
		width: 225px;
		height: 50px;
		border:1px solid #d7d7d7;
		border-radius: 3px;
		padding: 5px 0 5px 0;
		margin:10px 0 0 10px;
		float: left;
		cursor: pointer;
		position: relative;

		.zero{
			width: 10px;
			height: 10px;
			border-radius: 50%;
			border:2px solid #ccc;
			position: absolute;
			right:5px;
			top:5px;

			span{
				display: block;
				width: 6px;
				height: 5px;
				border-left:2px solid #ccc;
				border-bottom:2px solid #ccc;
				border-radius: 3px;
				transform: rotate(-60deg);
				margin:1px 0 0 1px;
			}
		}

		.car_l{

			float: left;

		img{
			width: 55px;
			height: auto;
		}

	}

	.car_r{
		float: left;
		font-size: 12px;
		color: #666;
		line-height: 20px;
		padding-left: 8px;

		b{
			font-weight: normal;
			color: #999;
			display: block;
			margin-top:12px;
			cursor: pointer;
		}



	}
}

.us_bg{
	background: #f0f9ff;
	border:1px solid #0099ff;

	.zero{
		border-color: #0099ff;

		span{
			border-color: #0099ff;
		}
	}
}


		.rig_add{
		    height: 35px;
			line-height: 35px;
			border-top: 1px solid #ccc;
			position: absolute;
			bottom: 0;
			width: calc(100% / 1.333);

			.el-checkbox{
				float: left;
				margin-left: 5px;
			}

			p{
				float: right;
				font-size: 12px;
				margin-right: 5px;
			}
		}


</style>
