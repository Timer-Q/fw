<template>
	  <div class="form-select">
		  	<label>收货区域</label>
		     <div class="inp" @click="addhi">
				<input type="text" v-model="keep">
				<i class="el-icon-caret-bottom"></i>
		  	</div>
		  	<div class="wrap" v-show="hide">
				<ul class="w-item">
					<li v-for="(value,index) in items" :class="{lis:index == active}" @click="taggle(index)">{{value.name}}</li>

				</ul>
				<div  class="w-p"><span v-for="value in items">{{value.m}}</span></div>
				<div class="w-foot">
					<span v-for="(value,index) in items" v-show="index == active" @click="sum($event)">{{value.chose}}</span>
				</div>
		  	</div>
	  </div>
</template>
<script>
	export default{
		data(){
			return{

		         keep:'',
		        active:0,
		        hide:false,
		        items:[{

		        	name:"省份",
		        	chose:"北京",
		        	m:"A-G"
		        },{
		        	name:"城市",
		        	chose:"北京",
		        	m:"H-K"
		        },{
		        	name:"县区",
		        	chose:"朝阳",
		        	m:"L-S"
		        },{
		        	name:"街道",
		        	chose:"街道",
		        	m:"T-Z"
		        }
		        ]
			}
		},

		methods:{
			 // 收货区域
		     addhi(){
		    	this.hide=!this.hide
		    },
		    taggle(index){
		    	this.active=index
		    },
		    sum(e){
		    	this.keep+=e.target.innerText+'/'
		    	console.log(this.keep)
		    }
		}
	}
</script>

<style lang="less" scoped>
label{
			font-size: 12px;
			color: #333;
		}

		.form-select{
			width: 170px;
			float: left;
			margin-left: 8px;
			position: relative;

		}
			.inp{
				float: right;
				width: 95px;
			   height: 30px;
			   margin-top:12px;
			   line-height: 30px;
			   background: #fff;
			   input{
			   	width: 70px;
			   	border:none;
			   }
			    input:focus { outline: none; }

			   i{
			   	color: #999;
			   	font-size: 12px;
			   }

			}

	.wrap{
		width: 343px;
		height: 232px;
		border:1px solid #ccc;
	    position: absolute;
	    left: 43.6%;
	    top: 85.1%;
	    z-index: 1;
	    background: #fff;

	    ul{
	    	height: 27px;
	    	line-height: 27px;
	    	font-size: 12px;
	    	background: #f2f2f2;
	    	list-style: none;
	    	li{
	    		float: left;
	    		width: 24.7%;
	    		border-right:1px solid #ccc;
	    		text-align: center;
	    		cursor: pointer;
	    	}
	    }
	    ul li:nth-child(4){
	    	border-right: none;
	    }

	}

	.lis{
		background: #fff;
	}

	.w-p{
		width: 60px;
		float: left;
		margin-top:8px;

		span{
			display: block;
			border:1px solid #ccc;
			border-radius: 4px;
			width: 40px;
			height: 20px;
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			margin:20px 0 0 5px;
		}
	}
	.w-foot{
		width: 200px;
		float: left;
		margin-top:8px;

		span{
			display: block;
			border:1px solid #ccc;
			border-radius: 4px;
			float: left;
			width: 40px;
			height: 20px;
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			margin:20px 0 0 5px;
			cursor: pointer;
		}
	}

</style>
