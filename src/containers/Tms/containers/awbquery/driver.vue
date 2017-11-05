<template>
	<div>
		<div class="title">
			<p>您选中<span>{{dan}}</span>单待处理运单，将推送给<span>5</span>位司机。</p>
			<el-checkbox disabled checked><span style="color:#666;">给司机发送指派提醒</span></el-checkbox>
			<el-checkbox disabled checked><span style="color:#666;">需要司机确认</span></el-checkbox>
			<el-button @click="suerbtn">确认发布</el-button>
		</div>

		<el-row>


			<el-col :span="6" class="lf_unloading">
					<p class="t_title"><span></span>卸货地信息</p>
					<ul>
						<li v-for="(item,index) in ldata" @click="add_bg1(index)" :class="{'u_bg': item.ind}">
						   <div class="u_left">
								<p><b class="l_blue"></b><span>{{item.dotName}}</span></p>
						         <p><b class="l_orange"></b><span>{{item.receiptAddress}}</span></p>
						   </div>

						   <p class="u_right"><span>{{item.totalBill}}</span>单 ￥<span>{{item.totalFee}}</span></p>
						    <div class="zero">
									<span></span>
							</div>
						</li>

					</ul>

					<div class="bot_add">
						<el-checkbox v-model="checked" @change="change">全选</el-checkbox>
						<p>待处理运单：<span>{{dcl}}</span></p>
					</div>

			</el-col>
			<el-col :span="18" class="rg_active">

					<ul>

						<router-link to="/tms/all/driver/chauffeur" tag="li"><span>指派司机</span>|</router-link>
						<router-link to="/tms/all/driver/fleet" tag="li"><span>指派车队</span>|</router-link>
						<router-link to="/tms/all/driver/map" tag="li"><span>地图指派</span></router-link>
						<li class="lis">快速查询<el-input
									  placeholder=""
									  icon="search"
									  v-model="input2"
									  :on-icon-click="handleIconClick">
									</el-input>
						</li>
					</ul>

					<div class="main">
						<router-view  @childStatus="childStatus" @childData="childData"></router-view>
					</div>

			</el-col>
		</el-row>
	</div>
</template>

<script>

import Vue from 'vue'
import service from '@Tms/services/awbquery/awbqueryService.js'
import config from '@/config/index.js'
export default{
	props: {
		val: {type: Array, require: true}
	},
	data(){
		return {
			checked:false,
			 input2: '',
			 ldata:[],
			 jdata:[],
			 dan:0,
			 dcl:0,
			 testVal : 0,
            childstatus:'',
            childata:''
		}
	},
	methods: {

	    //指派司机
        async loadList(message){

            try {
                const data = await service.suerchauffeur(message)
                if (data.status == 200) {
                    console.log(data)

                } else {
                    console.log(1)
                }
            }
            catch (e) {
                console.log(e)
            }
        },
        //指派车队
        async loadfleet(message){
            try {
                const data = await service.suerfleet(message)
                if (data.status == 200) {
                    console.log(data)

                } else {
                    console.log(1)
                }
            }
            catch (e) {
                console.log(e)
            }
        },
        //指派地图
        async loadmap(message){

            try {
                const data = await service.suermap(message)
                if (data.status == 200) {
                    console.log(data)

                } else {
                    console.log(1)
                }
            }
            catch (e) {
                console.log(e)
            }
        },

        childStatus(val){
            this.childstatus=val
        },
        childData(val){
            console.log(val)
           this.childata=val
        },
	    suerbtn(){//点击确认发布
            let yid=''
            if(this.childstatus==0){//如果状态为0就调指派司机接口

                    this.ldata.forEach((item)=>{//选中列表获取运单号
                        if(item.ind==true){
                            this.jdata.forEach((item)=>{
//                                yid+=item.id+','
//                                yid=substr(yid.length-1)
//                                console.log(yid)
                                yid=item.id
                                console.log(yid)

                            })

                        }
                    })
                let items=''
                this.childata.forEach((item)=>{
                        items=item
                        console.log(items)
                })
                let message={
                    companyId : 2,
                    companyName:items.companyName,
                    distributionDriverGroupRequestDTO:[
                        {
                            companyId : 2,
                            companyName:items.companyName,
                        }
                    ],
                    distributionDriverRequestDTO:[
                        {
                            companyId : 2,
                            companyName:items.companyName,
                            driverId:items.driverId,
                            driverName:items.driverName,
                            driverTelNumber:items.driverTelNumber,
                            vehicleId:items.vehicleId,
                            vehicleName:items.vehicleName

                        }
                    ],
                    waybillId:[
                        yid
                    ]
                }
                this.loadList(message)

            }
            else if(this.childstatus==1){//如果为1就调指派车队
                this.ldata.forEach((item)=>{
                    if(item.ind==true){
                        this.jdata.forEach((item)=>{
//                            yid+=item.id+','
//                            yid.substr(0,url.length-1)
                            yid=item.id
                        })
                        console.log(yid,'运单id')

                    }
                })
                let items=''
                this.childata.forEach((item)=>{
                    console.log(item)
                    items=item
                    console.log(items)
                })
                let message={
                    companyId:2,
                    distributionDriverGroupRequestDTO:[
                        {
                            companyId:2,
                            fleetId:items.fleetId,
                            fleetName:items.fleetName
                        }
                    ],
                    distributionDriverRequestDTO:[
                        {
                            vehicleName:items.vehicleName
                        }
                    ],
                    waybillId:[
                        yid
                    ]
                }
                this.loadfleet(message)
            }else{
                this.ldata.forEach((item)=>{
                    if(item.ind==true){
                        this.jdata.forEach((item)=>{
                            yid=item.id
                        })
                        console.log(yid,'运单id')

                    }
                })
                let items=''
                this.childata.forEach((item)=>{
                    items=item
                    console.log(items)
                })
                let message={
                    companyId : 2,
                    companyName:items.companyName,
                    distributionDriverGroupRequestDTO:[
                        {
                            companyId : 2,
                            companyName:items.companyName,
                        }
                    ],
                    distributionDriverRequestDTO:[
                        {
                            companyId : 2,
                            companyName:items.companyName,
                            driverId:items.driverId,
                            driverName:items.driverName,
                            driverTelNumber:items.driverTelNumber,
                            vehicleId:items.vehicleId,
                            vehicleName:items.vehicleName

                        }
                    ],
                    waybillId:[
                        yid
                    ]
                }
                this.loadmap(message)
            }
        },

		danhao(){
			this.ldata.forEach((item)=>{
				if(item.ind==true){
					this.dan++
				}else{
					this.dan--
				}
			})
			// console.log(this.dan)

		},
	    handleIconClick(ev) {
	      // console.log(ev)
	    },
	     /*左侧点击添加类*/
	    add_bg1(index){
	   		this.ldata[index].ind=!this.ldata[index].ind
	   		// set页面刷新
	   		Vue.set(this.ldata,index,this.ldata[index])

	   		this.danhao()

	    },




    	// 全选
	    change(){
	    	this.ldata.forEach((item) => {
	    		// console.log(item.ind, this.checked)
		  	 	item.ind=!this.checked
		  	 	// console.log(item.ind, this.checked)
		  	 })
	    	this.danhao()

	    },

        //左侧
        async drive(url){
            this.loading = true

            try {
                const data = await service.driver(url)
                if (data.status == 200) {
                  // 取出result数组里的每一项
                    data.data.result.forEach((item)=>{
                        this.ldata.push(item)

                    })
                    // 每个数据插入ind
                     this.ldata.forEach(function(item){
                        item.ind=false
                     })
                    this.dcl=_this.jdata.length
                } else {
                    console.log(1)
                }
                this.loading = false
            }
            catch (e) {
                console.log(e)
            }
        },

  },
  mounted(){

      let url = `${config.server.http}${config.server.host}/tms-web/distributionWaybillQuery/getCountPendBill/`
      // 格式化从localstory中取回来的数据
      let val=JSON.parse(localStorage.driver)
      this.drive(val)
      // 请求地址处理
      this.jdata=val
      this.jdata.forEach((item)=>{
          url=url+item.id+','
      })
      url=url.substr(0,url.length-1)

      this.drive(url)

  }

}

</script>
<style lang="less" type="text/less" scoped>
	.router-link-active{
			border-bottom: 2px solid #777;
			color: #000;
	}

	.title{
		height:45px;
		background: #d7d7d7;
		border-bottom: #ccc;
		line-height: 45px;

		p{
			font-size: 14px;
			float: left;

		}

		.el-checkout{
			float: left;
			margin-left:10px;
		}
		.el-button{
			width: 95px;
			height: 25px;
			background: #333;
			color: #fff;
			font-size: 12px;
			margin-left: 15px;
		}
		.el-checkbox__inner{
			border-radius: 5px;
		}
	}


	.lf_unloading{
		background: #f2f2f2;
		height: 613px;
		border:1px solid #ccc;
		float: left;

		.t_title{
		height: 45px;
		border-bottom: 1px solid #ccc;
		line-height: 45px;

		span{
			display: block;
			width: 3px;
			height:17px;
			background: #0099ff;
			float: left;
			margin:14px 5px 0 4px;
		}
	}

	ul{
		list-style: none;
		height: auto;

		li{
			height: 40px;
			border-bottom: 1px solid #ccc;
			position: relative;
			font-size: 12px;
			cursor: pointer;

			.u_left{
				position: absolute;
				left: 5px;
				top: 2px;

				.l_blue{
					width: 3px;
					height: 3px;
					display: block;
					border-radius: 50%;
					background: #0099ff;
					position: absolute;
					left: 4px;
					top: 6px;
				}
				.l_orange{
					width: 3px;
					height: 3px;
					display: block;
					border-radius: 50%;
					background: #f60;
					position: absolute;
					left: 4px;
					top: 23px;
				}

				span{
					margin-left: 13px;
					margin-top:5px;
				}

				p{

			     line-height: 17px;
				}

			}

			.u_right{
				position: absolute;
				right: 20px;
				bottom: 2px;
			}

			.zero{
					width: 10px;
					height: 10px;
					border-radius: 50%;
					border:2px solid #ccc;
					position: absolute;
					right:2px;
					top:2px;

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


		}

		.u_bg{
				background: #f0f9ff;

				.zero{
					border-color: #0099ff;

					span{
						border-color: #0099ff;
					}
				}

			}

	}

	.bot_add{
		height: 35px;
		line-height: 35px;
		border-top: 1px solid #ccc;
		position: absolute;
		bottom: 0;
		width: calc(100% / 4);

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

	}




	.rg_active{
		height: 613px;
		border-right:1px solid #ccc;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		float: right;

		ul{
			list-style: none;
			font-size: 16px;
			padding-left: 8px;
			color: #666;
			height: 45px;
			line-height: 45px;
			border-bottom: 1px solid #ccc;

			li{
				height: 35px;
				float: left;
				padding-left: 5px;
				cursor: pointer;
				span{
					margin-right:5px;
				}
			}

			.lis{
				position: absolute;
				right: 35px;
				font-size: 14px;

				.el-input{
					margin-left: 5px;
				}
			}

			.el-input{
				width: 150px;
			}


		}
	}



</style>
