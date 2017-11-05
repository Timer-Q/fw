<template>
    <div>
        <div id="allmap">

        </div>
        <div class="mask">
            <div class="map_content">
                <div class="content-left">
                    <div class="user_l">
                        <span><i class="el-icon-setting"></i></span>
                        <p>wede</p>
                        <p>dedwe</p>
                        <p>dedwe</p>
                        <p class="user_bg">edwed</p>

                    </div>
                </div>
                <span class="close" @click="close">×</span>
                <el-tabs v-model="editableTabsValue" type="card" class="content_right">
                    <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in editableTabs"
                        :label="item.title"
                        :name="item.name"
                    >
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>

            </div>
        </div>
        <div class="rig_add">
            <p>共选中司机：<span>2</span></p>
        </div>

    </div>
</template>

<script>
    import BMap from 'BMap'
    import service from '@Tms/services/awbquery/awbqueryService.js'

    export default{
        data(){
            return {
                setData: [],
                ak:'mEBI4fumOXV3HW5xUjNnl903rPwI6wtX',
                status:2,

                //tab
                editableTabsValue: '1',
                editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content'
                }, {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content'
                },
                    {
                        title: 'Tab 1',
                        name: '3',
                        content: 'Tab 1 content'
                    }, {
                        title: 'Tab 2',
                        name: '4',
                        content: 'Tab 2 content'
                    },
                    {
                        title: 'Tab 1',
                        name: '5',
                        content: 'Tab 1 content'
                    }, {
                        title: 'Tab 2',
                        name: '6',
                        content: 'Tab 2 content'
                    },
                    {
                        title: 'Tab 1',
                        name: '7',
                        content: 'Tab 1 content'
                    }, {
                        title: 'Tab 2',
                        name: '8',
                        content: 'Tab 2 content'
                    }],
                tabIndex: 2
            }
        },
        mounted(){


            //向父组件传递状态
            this.$emit('childStatus',this.status)

           let _this=this
//           MP(_this.ak).then(BMap => {

                    _this.loadmap()
//            })


        },

        methods: {

            async loadmap(){
                let _this=this
                try {
                    const data = await service.map({
                        "cityId": 2,
                        "companyId": 1,
                        "orgId": 1,
                        paramet:[]
                    })

                    if (data.status == 200) {

                        _this.setData = data.data.result

                        // 百度地图API功能
                        var map = new BMap.Map("allmap")
                        _this.setData.forEach((item) => {
                            //添加ind
                            item.ind=false
                            console.log(item.ind)

                            let s=0,
                                d=0

                            // 计算体积 重量
                            s=Number(item.availableVolume/item.checkVolume*100)
                            d=Number(item.availableWeight/item.checkQuality*100)
                            item.s=s
                            item.d=d

                            var point = new BMap.Point(item.lon, item.lat)
                            var marker = new BMap.Marker(point)

                            //特定点
                            map.addOverlay(marker)
                            let label=new BMap.Label(item.vehicleNum,{offset:new BMap.Size(-10,-25)})
                            marker.setLabel(label)

                            //判断 满载 半载 空载
                            let flag=''
                            if(item.status=="NO_LOAD"){
                                flag='空载'
                            }else if(item.status=="HALF_LOAD"){
                                flag='半载'
                            }else{
                                flag='满载'
                            }
                            //气泡
                            let sContent=`
                                <div ref="infoWindow">
                                    <div class="user" id="user" >
                                        <div class="user_l">
                                            <span><i class="el-icon-setting"></i></span>
                                            <p>${item.driverName}</p>
                                            <p>${item.phoneNo}</p>
                                            <p>${item.vehicleTypeName}</p>
                                        </div>
                                        <div class="user_r" :class="{full: ${item.status} == 'FULL_LOAD', half: ${item.status} == 'HALF_LOAD', no: ${item.status} == 'NO_LOAD',}">

                                                <p>${flag}</p>
                                            <div class="cuf"><span>剩余${item.checkVolume - item.availableVolume}方</span><p class="line"><el-progress  :text-inside="true" :stroke-width="18" :show-text="false" :percentage=${item.s}></el-progress></p></div>
                                            <div><span>剩余${item.checkQuality - item.availableWeight}吨</span><p class="line"><el-progress  :text-inside="true" :stroke-width="13" :show-text="false" :percentage=${item.d}></el-progress></p></div>
                                            <b></b>
                                            <el-button class="appoint">指派</el-button>
                                            <span id="details">详情</span>

                                        </div>
                                    </div>
                                </div>
                            `

                            var infoWindow = new BMap.InfoWindow(sContent)//创建窗口信息
                            map.addOverlay(marker)
                            marker.addEventListener("click", function () {

                                //点击打点改变值
                                item.ind=!item.ind
                                console.log(item.ind)
                                this.paramet=[]
                                _this.setData.forEach((item)=>{
                                    if(item.ind==true){
                                        this.paramet.push(item)
                                    }
                                })
                                //向父组件传递数据
                                _this.$emit('childData',this.paramet)

                                this.openInfoWindow(infoWindow)
                                document.getElementById("user").onload = function () {
                                    infoWindow.redraw() //重绘
                                }

                                //获取详情
                                let details=document.querySelector("#details")
                                console.log(details)
                                //点击详情
                                details.addEventListener("click",function(){
                                    console.log(1)
                                    document.querySelector(".mask").style="display:block"
                                })

                            })

                        })
                        map.centerAndZoom(new BMap.Point(116.404, 39.915), 10)

                    } else {
                        console.log(1)
                    }
                }
                catch (e) {
                    console.log(e)
                }
            },
            //点击×号
            close(){
                document.querySelector(".mask").style="display:none"
            },




        }
    }


</script>

<style lang="scss">


    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border:none
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item{
        border:none
    }

    .el-tabs__nav-prev {
        left: 260px;
    }
    .el-tabs__nav-next{
        right:10px;
    }

    .content_right{
        width: 298px;
        float: right;
    }

    .content-left{
        float: left;
        border-right: 1px solid #ccc;
        width: 155px;
        height: 93%;
        margin-top: 10px;

        .user_l{

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
    }
    .el-tabs__item{
        padding: 0px 8px 0 0;
    }
    .el-tabs__nav-wrap.is-scrollable {
        padding: 0 26px;
    }

    .el-tabs__nav-scroll{
        margin-right:10px;
    }

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
    #allmap {
        width: 100%;
        height: 530px;
    }

    .rig_add {
        height: 35px;
        line-height: 35px;
        border-top: 1px solid #ccc;
        position: absolute;
        bottom: 0;
        width: calc(100% / 1.333);

        p {
            float: right;
            font-size: 12px;
            margin-right: 5px;
        }
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

    .appoint{
        background: #0086df;
        color: #fff;
        border-radius: 4px;
        display: block;
        width: 50px;
        height: 18px;
        text-align: center;
        float: left;
    }

    #details{
        margin-left:8px;
        color: #3366ff;
        text-decoration: underline;
    }

    .mask{
        height:530px;
        background:rgba(73, 68, 68, 0.5);
        position: absolute;
        right:0;
        top: 47px;
        width: 75%;
        display: none;
        .map_content{
            width:462px;
            height:218px;
            background:#fff;
            margin:12% auto;
            position: relative;
            .close{
                position: absolute;
                right:3px;
                top:1px;
                z-index: 99999;
            }
        }

    }
</style>
