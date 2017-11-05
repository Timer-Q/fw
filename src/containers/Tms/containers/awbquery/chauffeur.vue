<template>
	<div>
	<div class="user" v-for="(item,index) in items2" @click="add_bg2(index)" :class="{'us_bg':item.ind}">
					<div class="user_l">
						<span><i class="el-icon-setting"></i></span>
						<p>{{item.driverName}}</p>
						<p class="user_bg">{{item.vehicleNum}}</p>
						<p>{{item.vehicleTypeName}}</p>
					</div>
					<div class="user_r" :class="{full: item.status == 'FULL_LOAD', half: item.status == 'HALF_LOAD', no: item.status == 'NO_LOAD',}">

							<p v-if="item.status == 'NO_LOAD' ">空载</p>
							<p v-else-if="item.status == 'HALF_LOAD'">半载</p>
							<p v-else>满载</p>
							<div class="cuf"><span>剩余 {{item.checkVolume - item.availableVolume}} 方</span><p class="line"><el-progress  :text-inside="true" :stroke-width="13" :show-text="false" :percentage=item.s></el-progress></p></div>
							<div><span>剩余{{item.checkQuality - item.availableWeight}} 吨</span><p class="line"><el-progress  :text-inside="true" :stroke-width="13" :show-text="false" :percentage=item.d></el-progress></p></div>


						<b>{{item.locationAddress}}</b>
					</div>

					<div class="zero">
						<span></span>
					</div>

				</div>
				<div class="rig_add">
					<el-checkbox v-model="checked" @change="change">全选</el-checkbox>
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
             status:0,
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
            this.items2.forEach((item)=>{

                if(item.ind==true){
                    this.paramet.push(item)
                    console.log(this.paramet)
                }
            })
            //向父组件传递数据
            this.$emit('childData',this.paramet)
	    },
	    change(){
	    	this.items2.forEach(function(item){
		  	 	item.ind=!item.ind
		  	})
	    },

        async loadList(){
            try {
                const data = await service.chauffeur({
                    "cityId": 2,
                    "companyId": 1,
                    "orgId": 1
                })
                if (data.status == 200) {
                    console.log(data)
                    this.setData(data.data.result)

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

	   setData (data) {
	   		this.items2 = data

	   		let s=0,
	   			d=0
	   		this.items2.forEach(function(item){
	   			// 计算体积 重量
	   			s=Number(item.availableVolume/item.checkVolume*100)
	   			d=Number(item.availableWeight/item.checkQuality*100)
	   			item.s=s
	   			item.d=d


	   		})
	   		console.log(this.items2)
	   },



	},
	mounted () {
		this.loadList()
        //向父组件传递状态
        this.$emit('childStatus',this.status)


	}
}
</script>

<style lang="less">
    body{
        .user{
            /*** 满载 ***/
            .full{
                color: #FF0033;
                .el-progress-bar__outer{
                    border: 2px solid #FF0033;
                    background-color: #fff;
                    .el-progress-bar__inner{
                        background-color: #FF0033;
                    }
                }
            }
            /*** 半载 ***/
            .half{
                color: #F79646;
                .el-progress-bar__outer{
                    border: 2px solid #F79646;
                    background-color: #fff;
                    .el-progress-bar__inner{
                        background-color: #F79646;
                    }
                }
            }
            /*** 空载 ***/
            .no{
                color: #009933;
                .el-progress-bar__outer{
                    border: 2px solid #009933;
                    background-color: #fff;
                    .el-progress-bar__inner{
                        background-color: #009933;
                    }
                }
            }
        }
    }
    .el-icon-setting{
        position:static;
    }

    .cuf{
        width:200px;
    }
        .user{
            width: 315px;
            height: 100px;
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

            .user_l{
                width: 100px;
                height: 100px;
                border-right: 1px solid #ccc;
                float: left;

                span{
                    display: block;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: #ccc;
                    margin:0 auto;
                    overflow: hidden;
                    line-height: 30px;
                    text-align: center;
            }

            p{
                color: #ccc;
                font-size: 12px;
                text-align: center;
            }

            .user_bg{
                background: #ccc;
                border-radius: 8px;
                color: #666;
                width: 80px;
                height: 18px;
                line-height: 18px;
                margin:5px auto;

            }
        }

        .user_r{
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

            div{
                position:relative;

                .line{
                    width:100px;
                    height: 10px;
                    margin-bottom: 5px;
                }
                p{
                    position: absolute;
                    right: 5px;
                    bottom: 2px;
                }
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
