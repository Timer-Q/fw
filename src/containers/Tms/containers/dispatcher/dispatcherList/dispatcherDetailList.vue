
<style lang="less" rel="stylesheet/less" scoped>
    .clearfix{
        overflow: hidden;
        clear: both;
    }
    @ydh:rgb(76,98,254);
    .ydh{
        color: @ydh;
        text-decoration: underline;
        &:hover{
            color: lighten(@ydh,20%);
        }
    }
    @groupColor:rgb(137,153,169);
    .el-button-group{
        .el-button{
            float: none;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            border-radius: 4px;
            min-width: auto;
            margin-right: 8px;
            padding: 0 16px;
            color: @groupColor;
            border:1px solid @groupColor;
            background: #ffffff;
            &:hover{
                background: #ffffff;
                color: lighten(@groupColor,20%);
            }
        }
        .el-button:not(:first-child){
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        .group-right{
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -5px;
        }
    }
    .dataList{
        margin-top:10px;
    }
    .dispatcherPage a{
        color:#29a7e1;
    }
    .el-form{
        padding:16px;
    }
     .projection{
        background:#c9c9c9;
        padding: 10px 0 10px 20px;
    }
</style>
<template>
    <div class="dispatcherPage">
        <div class="projection">
            <el-button-group>
                <el-button>导出</el-button>
            </el-button-group>
        </div>
        <el-form :inline="true" ref="form" :model="form" label-width="60px" >
            <div>
                <!--查询条件-->
                <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                    <!--查询方案弹出层开始-->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided>黄金糕
                            <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided>狮子头
                            <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided>螺蛳粉
                            <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided>双皮奶
                            <span>
                                <i class="iconfont icon-xiugai"></i>
                                <i class="iconfont icon-guanbi"></i>
                                </span>
                        </el-dropdown-item>
                        <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                    </el-dropdown-menu>
                    <!--查询方案弹出层结束-->
                </el-dropdown>

                <el-form-item>
                    <el-select v-model="selectTime" placeholder="" @change="ch">
                        <el-option
                            v-for="item in selectTimeItems"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="whichDate===0">
                    <el-form-item style="margin-right:0">
                        <el-date-picker type="date" placeholder="制单日期" @change="ch" v-model="dispatcherBeginCreateTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <span>-</span>
                    <!--<el-form-item class="line" :span="2">-</el-form-item>-->
                    <el-form-item>
                        <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="dispatcherEndCreateTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item v-else-if="whichDate===1">
                    <el-form-item style="margin-right:0">
                        <el-date-picker type="date" placeholder="发车日期" @change="ch" v-model="dispatcherBeginTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <span>-</span>
                    <el-form-item>
                        <el-date-picker type="date" placeholder="" @change="ch" v-model="dispatcherEndTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item v-else>
                    <el-form-item style="margin-right:0">
                        <el-date-picker type="date" placeholder="录单日期" @change="ch" v-model="acceptBeginDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <span>-</span>
                    <el-form-item>
                        <el-date-picker type="date" placeholder="" @change="ch" v-model="acceptEndDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="派车网点">
                    <el-select v-model="branchId" placeholder="">
                        <el-option label="广州营业部" value="0"></el-option>
                        <el-option label="上海营业部" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="派车批次">
                    <el-input v-model="batchCode" ></el-input>
                </el-form-item>

                <el-form-item label="运单号">
                    <el-input v-model="waybillCode" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="selectByCondition">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <a href="javascript:;" >高级查询</a>
                </el-form-item>

            </div>
            <div class="dataList">
                <el-table :data="tableDataAll"  :highlight-current-row="true"  border show-summary :summary-method="hj" style="width: 100%"   >
                    <el-table-column type="index" width="80" label="序号" header-align="center">1</el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.waybillCode" sortable  width="180" label="运单号" header-align="center">
                        <i class="iconfont icon-sousuo"></i>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.customerOrderCode" sortable label="客户单号" width="110" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.batchCode" label="派车批次" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.lineSort" label="线路顺序" width="110" sortable header-align="center" align="right">1
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.taskName" label="执行任务" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.remark" label="派车备注" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.packageNum" label="装车件数" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.packageWeight" label="装车重量" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.packageVolume" label="装车体积" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.cost" label="分摊成本" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column  label="预约提货时间" sortable width="135" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.deliveryPickTime | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="预约送货时间" sortable width="135" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.deliverySendTime | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.shippingCode" label="装货批次" sortable width="110" header-align="center">ZH028273333
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.shippingCost" label="装货成本" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.dischargedCode" label="卸货批次" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.dischargedCost" label="卸货成本" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.invoiceCompany" label="发货公司" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.invoiceUser" label="发货人" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.invoiceTelNo" label="发货人电话" sortable width="120" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.invoiceMobleNo" label="发货人手机" sortable width="120" header-align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发货地址" sortable width="110" header-align="center" >
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.invoiceProvName }}
                                {{scope.row.dispatcherDetailEsDTO.invoiceCityName}}
                                {{scope.row.dispatcherDetailEsDTO.invoiceDistrictName }}
                                {{scope.row.dispatcherDetailEsDTO.invoiceStreetName  }}
                                {{scope.row.dispatcherDetailEsDTO.invoiceAddress}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.receiptCompany" label="收货公司" sortable width="125" header-align="center" >
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.receiptUser" label="收货人" sortable width="110" header-align="center" >
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.receiptConsignorTelNo" label="收货人电话" sortable width="120" header-align="center" >
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.receiptConsignorMobleNo" label="收货人手机" sortable width="120" header-align="center" >
                    </el-table-column>
                    <el-table-column prop="" label="收货地址" sortable width="110" header-align="center" >
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.receiptProvName }}
                                {{scope.row.dispatcherDetailEsDTO.receiptCityName}}
                                {{scope.row.dispatcherDetailEsDTO.receiptDistrictName }}
                                {{scope.row.dispatcherDetailEsDTO.receiptStreetName  }}
                                {{scope.row.dispatcherDetailEsDTO.receiptAddress }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="下单时间" sortable width="115" header-align="center" >
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.orderTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="接单时间" width="115" sortable header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.acceptDate | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="装货时间" sortable width="110" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.shippingTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="卸货时间" sortable width="110" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.dischargedTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="签收时间" sortable width="110" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.signTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.freight" label="实际运费" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.outputValue" label="产值" sortable  header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.busFee" label="业务费" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column   label="类型" sortable  header-align="center" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.dispatcherDetailEsDTO.iemergency">
                                <i class="iconfont icon-ji"></i>
                            </span>
                            <span v-if="scope.row.dispatcherDetailEsDTO.iwaitNotice">
                                <i class="iconfont icon-deng"></i>
                            </span>
                            <span v-if="scope.row.dispatcherDetailEsDTO.vip">
                                <i class="iconfont icon-vip"></i>
                            </span>
                            <span v-if="scope.row.dispatcherDetailEsDTO.waybillSplit">
                                <i class="iconfont icon-cai"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <!--dispatcherDetailEsDTO.waybillStatus-->
                    <el-table-column prop="" label="运单状态" sortable width="110" header-align="center">
                        <template slot-scope="scope">
                            <span v-for="item in interfaceData.ydzt">
                                <span v-if="scope.row.dispatcherDetailEsDTO.waybillStatus===item.itemCode">
                                   {{item.itemName}}
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""  label="货物名称" sortable width="150" header-align="center" >
                        <template slot-scope="scope">
                            <el-popover placement="bottom"  trigger="click" >
                                <el-table :data="scope.row.dispatcherGoodsEsDTOList" border>
                                    <el-table-column  property="goodsName" label="货物名称" width="110" header-align="center"></el-table-column>
                                    <el-table-column  property="packages" label="包装" header-align="center"></el-table-column>
                                    <el-table-column  property="packageNum" label="件数" header-align="center" align="right"></el-table-column>
                                    <el-table-column  property="weight" label="重量" header-align="center" align="right"></el-table-column>
                                    <el-table-column  property="volume" label="体积" header-align="center" align="right"></el-table-column>
                                </el-table>
                                <div slot="reference" class="name-wrapper">
                                    {{getJoinedStrByKeyFromList(scope.row.dispatcherGoodsEsDTOList,'goodsName','/')}}
                                    <i class="iconfont icon-xiayi"></i>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.packages" label="包装" sortable  header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.packageNum"  label="件数" sortable  header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.weight" label="重量（kg）" sortable width="120" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.volume" label="体积（m³）" sortable width="120" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.destName" label="目的地" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.lineName" label="运输线路" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.invoiceOrgName" label="发货网点" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.destOrgName" label="目的网点" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.branchName" label="派车网点" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="" label="付款方式" sortable width="110" header-align="center">
                        <template slot-scope="scope">
                            <span v-for="item in interfaceData.fkfs">
                                <span v-if="scope.row.dispatcherDetailEsDTO.payWay===item.itemCode">
                                   {{item.itemName}}
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.backType" label="回单要求" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.backOrderNum" label="回单份数" sortable width="110" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.backCode" label="回单编号" sortable width="110" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.signCode" label="签收验证码" sortable width="125" header-align="center" align="right">
                    </el-table-column>
                    <el-table-column prop="" label="录单时间" sortable width="115" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dispatcherDetailEsDTO.waybillCreateTime | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispatcherDetailEsDTO.userName" label="录单员" sortable width="115" header-align="center">
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
        <pre v-if="BX.DEBUG_MODE" class="bx-debug">
            <div>tableDataAll----:{{tableDataAll}}</div>
        </pre>
        <tooltip name="costorder">
            <el-button size="mini">修改</el-button>
            <el-button size="mini" @click="">删除</el-button>
        </tooltip>
    </div>

</template>
<script>
    // import s from '../../../appService/appService'
    export default {
        data(){
            return {
                //
                BX:{},
                //
                interfaceData:{

                },
                ydzt:[],
                fkfs:[],
                formData:{

                },
                viewStatus:{
                    currentPanel:'all'
                },
                queryParams:{
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableDataAll:[],
                isCheckBox:false,
                selectTime:null,
                branchId:null,
                waybillCode:'',
                dispatcherBeginCreateTime:'',
                dispatcherEndCreateTime:'',
                dispatcherBeginTime:'',
                dispatcherEndTime:'',
                acceptBeginDate:'',
                acceptEndDate:'',
                selectTimeItems:[{
                    value:0,
                    label:'制单日期'
                },{
                    value:1,
                    label:'发车日期'
                },{
                    value:2,
                    label:'录单日期'
                }],
                whichDate:0,
                batchCode:'',
                currentPage:1,
                pageSize:10
            }
        },
        methods:{
            getJoinedStrByKeyFromList(list,key,joinStr){
                if(!list){
                    return ''
                }
              var arr=[]
              list.forEach((item)=>{
                  arr.push(item[key])
              })
                return arr.join(joinStr)
            },
            ch(){
              console.log("ch",this.selectTime)
              console.log("dispatcherBeginCreateTime",this.dispatcherBeginCreateTime)
              console.log("dispatcherEndCreateTime",this.dispatcherEndCreateTime)
              console.log("dispatcherBeginTime",this.dispatcherBeginTime)
              console.log("dispatcherEndTime",this.dispatcherEndTime)
              console.log("acceptBeginDate",this.acceptBeginDate)
              console.log("acceptEndDate",this.acceptEndDate)
              console.log("batchCode",this.batchCode)
              if(this.selectTime===0||(this.selectTime===null)){
                  this.whichDate=0
                  this.dispatcherBeginTime=''
                  this.dispatcherEndTime=''
                  this.acceptBeginDate=''
                  this.acceptEndDate=''
              }
              else if(this.selectTime===1){
                  this.whichDate=1
                  this.dispatcherBeginCreateTime=''
                  this.dispatcherEndCreateTime=''
                  this.acceptBeginDate=''
                  this.acceptEndDate=''
              }
              else{
                  this.whichDate=2
                  this.dispatcherBeginCreateTime=''
                  this.dispatcherEndCreateTime=''
                  this.dispatcherBeginTime=''
                  this.dispatcherEndTime=''
              }
            },
            //表格底部合计
            hj(param){
                const { columns, data } = param
                const sums = [],current=this
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价'
                        return
                    }
                    let sum=0
                    const values = data.map(item => {
                        sum++
//                        console.log("column.property",column.property)
//                        val = item[column.property]
//                        console.log("val470",val)
                        if(column.property && column.property.slice(column.property.indexOf('.') + 1) === "packageNum"){
                            return item.dispatcherDetailEsDTO.packageNum
                        }else{
//                            val=NaN
                            return ''
                        }
//                        console.log("val",Number(val))
//                        return Number(val)
                    })
                    sums[current.isCheckBox?2:1]=sum+"笔"
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)
                    }
                })

                return sums
            },
            handleClick(tab, event) {
                let current = this
                current.batchCode=this.$route.query.batchCode||''
                console.log("410",current.batchCode)
                // 注释
                /*
                this.BX.s.tmsPromiseAll([
                    this.BX.s.callInterfaceAndSetData({
                            url:'/dispatcher/getDispatcherDetailList',
                            type:'post',
                            data:{
                                "batchCode": current.batchCode,
                                "currentPage":current.currentPage,
                                "pageSize":current.pageSize
                            }
                        },
                        this,'tableDataAll',false),
                        // 注释
                    // ...this.BX.s.fetchMultiDictionary('ydzt fkfs', this.interfaceData),//3 interfaces

//                    this.BX.s.callInterfaceAndSetData('/dictionary/searchBatch?dicCode=tms-ydzt',this,'ydzt',false),
//                    this.BX.s.callInterfaceAndSetData('/dictionary/searchBatch?dicCode=tms-cllx',this,'cllx',false),
//                    this.BX.s.callInterfaceAndSetData('/dictionary/searchBatch?dicCode=tms-fkfs',this,'fkfs',false),
                ]).then(([tableDataAll])=>{
//                    let {cllx,fkfs,ydzt}=interfaceData
//                    console.log("interfaceData",ydzt,cllx,fkfs)
                })
                */
//                this.BX.s.requestTMS([
//                    '/dictionary/search?dicCode=tms-ydzt',
////                    '/dictionary/searchBatch?dicCode=tms-cllx&dicCode=tms-fkfs',
//                    '/dictionary/search?dicCode=tms-fkfs',
//                    '/dictionary/search?dicCode=tms-cllx',
//                ]).then(([ydzt,fkfs,cllx])=>{
//                    this.ydzt=ydzt
//                    this.fkfs=fkfs
//                    this.cllx=cllx
//                    console.log("123333333333",ydzt,fkfs,cllx)
//                })
            },
            //点击表单行触发
            rowClick(row,event,column){
                let _this=this
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
                _this.dispatcherData=row
                console.log("row.id",row.id)
                return _this.dispatcherData

            },
            //查询
            selectByCondition(){
                console.log("selectTime",this.selectTime)
                let current=this
                let dispatcherBeginCreateTime=null,dispatcherEndCreateTime=null,dispatcherBeginTime=null,
                    dispatcherEndTime=null,acceptBeginDate=null,acceptEndDate=null
                if(current.dispatcherBeginCreateTime!==''){
                    dispatcherBeginCreateTime=current.dispatcherBeginCreateTime.getTime()
                    console.log("123",dispatcherBeginCreateTime)
                }
                if(current.dispatcherEndCreateTime!==''){
                    dispatcherEndCreateTime=current.dispatcherEndCreateTime.getTime()
                }
                if(current.dispatcherBeginTime!==''){
                    dispatcherBeginTime=current.dispatcherBeginTime.getTime()
                }
                if(current.dispatcherEndTime!==''){
                    dispatcherEndTime=current.dispatcherEndTime.getTime()
                }
                if(current.acceptBeginDate!==''){
                    acceptBeginDate=current.acceptBeginDate.getTime()
                }
                if(current.acceptEndDate!==''){
                    acceptEndDate=current.acceptEndDate.getTime()
                }
                // 注释
                /*
                this.BX.s.tmsPromiseAll([
                    this.BX.s.callInterfaceAndSetData({
                            url:'/dispatcher/getDispatcherDetailList',
                            type:'post',
                            data:{
                                "acceptBeginDate": acceptBeginDate,
                                "acceptEndDate": acceptEndDate,
                                "batchCode": current.batchCode,
                                "branchId": current.branchId,
//                                "currentPage": 0,
                                "dispatcherBeginCreateTime": dispatcherBeginCreateTime,
                                "dispatcherBeginTime": dispatcherBeginTime,
                                "dispatcherEndCreateTime": dispatcherEndCreateTime,
                                "dispatcherEndTime": dispatcherEndTime,
//                                "pageSize": 0,
                                "waybillCode": current.waybillCode
                            }
                        },
                        this,'tableDataAll',false),
                ]).then(([tableDataAll])=>{
                    current.tableDataAll= tableDataAll
                    console.log("----------------",current.tableDataAll)
                })
                */
            },
            //消息提示
            messages(obj){
                let type = obj.type||'success'
                this.$message({
                    message: obj.message||(type=='success'?'操作成功':'操作失败'),
                    type: type,
                    iconClass:obj.iconClass||(type=='success'?'iconfont icon-chenggong':'iconfont icon-shanchuxx'),
                    duration:2000
                })
            }
        },
        mounted(){
            // 注释
            // this.BX.DEBUG_DATA.DISPATCHER_DATAIL_LIST=this
            this.handleClick()
            console.log("this.$route.query.waybillCode",this.$route.query.waybillCode)
        },
        computed:{

        },
        watch:{

        },
        filters:{
            formatDate(time){
                let date = new Date(time)
                return date.getFullYear()+"-"+getFormat(date.getMonth()+1)+"-"+getFormat(date.getDate())+" "+getFormat(date.getHours())+":"+getFormat(date.getMinutes())
            },
        }
    }
    function getFormat(val){
        return val.toString().length>1?val:"0"+val
    }
</script>
