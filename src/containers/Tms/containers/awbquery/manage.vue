<template>
    <div class="tms">

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
                <div>
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
                <el-button @click="showDetail">查询</el-button>
            </div>
            <div class="el-form-item">
                <a href="javascript:;">高级查询</a>
            </div>

        </div>


        <!-- 表单 -->
        <Table :data="data" tooltip-effect="dark" ref="multipleTable" height=400  border
                  :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 16px;"
                  @select="handleSelectionChange" @select-all="selectAll">
            <TableColumn type="index" width="60" label="序号"></TableColumn>
            <TableColumn type="selection" width="55"></TableColumn>
            <TableColumn prop="waybillCode" name="invoiceCompany" label="运单号" width="180"></TableColumn>
            <TableColumn prop="customerOrderCode" label="客户单号" width="85"></TableColumn>
            <TableColumn prop="taskName" label="执行任务" width="85"></TableColumn>
            <TableColumn prop="destName" label="配送成本" width="85"></TableColumn>
            <TableColumn prop="invoiceCompany" label="发货公司" width="85"></TableColumn>
            <TableColumn prop="invoiceUser" label="发货人" width="85"></TableColumn>
            <TableColumn prop="invoiceTelNo" label="发货人电话" width="100"></TableColumn>
            <TableColumn prop="invoiceMobleNo" label="发货人手机" width="100"></TableColumn>
            <TableColumn prop="invoiceAddress" label="发货地址" width="100"></TableColumn>
            <TableColumn prop="receiptCompany" label="收货公司" width="85"></TableColumn>
            <TableColumn prop="receiptUser" label="收货人"></TableColumn>
            <TableColumn prop="receiptConsignorTelNo" label="收货人电话" width="100"></TableColumn>
            <TableColumn prop="receiptConsignorMobleNo" label="收货人手机" width="95"></TableColumn>
            <TableColumn prop="receiptAddress" label="收货地址" width="100"></TableColumn>
            <TableColumn prop="deliveryPickTime" label="预约提货时间" width="120"></TableColumn>
            <TableColumn prop="status" label="运单状态" width="85"></TableColumn>
            <TableColumn prop="goodsName" label="货物名称" width="85"></TableColumn>
            <TableColumn prop="packages" label="包装"></TableColumn>
            <TableColumn prop="totalNum" label="件数"></TableColumn>
            <TableColumn prop="weight" label="重量（kg）" width="100"></TableColumn>
            <TableColumn prop="volume" label="体积（m³）" width="100"></TableColumn>
            <TableColumn prop="destName" label="目的地"></TableColumn>
            <TableColumn prop="backType" label="回单要求" width="90"></TableColumn>
            <TableColumn prop="backNum" label="回单份数" width="90"></TableColumn>
            <TableColumn prop="backCode" label="回单编号" width="90"></TableColumn>
            <TableColumn prop="payWay" label="付款方式" width="90"></TableColumn>
            <TableColumn prop="totalFee" label="总运费"></TableColumn>
            <TableColumn prop="deliveryCharges" label="送货费"></TableColumn>
            <TableColumn prop="collectPayment" label="代收货费" width="90"></TableColumn>
            <TableColumn prop="declaredValue" label="声明价值" width="90"></TableColumn>
            <TableColumn prop="distributionType" label="配送方式" width="90"></TableColumn>
            <TableColumn prop="remark" label="备注"></TableColumn>
            <TableColumn prop="arrivalTime" label="预计到达日期" width="120"></TableColumn>
            <el-table-column prop="orderDate" label="录单日期" width="90"></el-table-column>
            <el-table-column label="接单日期" width="90"></el-table-column>
            <el-table-column label="入库时间" width="90"></el-table-column>
            <el-table-column label="在库时长(小时)" width="120"></el-table-column>

        </Table>


    </div>
</template>


<script>

    import network from './components/network'
    import saddress from './components/address'
    import service from '@Tms/services/awbquery/awbqueryService.js'
    export default {
        data(){
            return {
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
                address: '',
                dispatcherBeginCreateTime: "",
                dispatcherEndCreateTime: "",
                data: [],
                waybillCode: ''

            }
        },
        components: {
            network,
            saddress
        },
        methods: {
            /*渲染页面*/
            async manageData(){
                this.loading = true
                // 页面
                try {
                    const data = await service.manage({
                        "currentDotId": 3,
                        "currentPage": 1,
                        "pageSize": 10,
                        "startOrderDate": 0,
                        "endOrderDate": 1506394461114
                    })
                    if (data.status == 200) {
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
            async showDetail(){
                // 查询
                try {
                    const data = await service.showdetail({
                        "waybillCode": this.waybillCode,
                        "currentDotId": 3,
                        "currentPage": 1,
                        "pageSize": 10,
                        "startOrderDate": 0,
                        "endOrderDate": 1506394461114
                    })
                    if (data.status == 200) {
                        this.data=data.data.result
                    } else {
                        console.log(1)
                    }
                }
                catch (e) {
                    console.log(e)
                }
            },

            getSummaries(param) {
                const {columns, data} = param
                const sums = []
                columns.forEach((column, index) => {
                    if (index === 2) {
                        sums[index] = '合计：' + this.data.length + '笔'
                        return
                    }
                    if (index === 5) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.destName
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 20) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.totalNum
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 21) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.weight
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 22) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.volume
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 25) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.backNum
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 30) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.collectPayment
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 31) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.declaredValue
                        })
                        sums[index] = sum
                        return
                    }
                    if (index === 38) {
                        let sum = 0
                        this.data.forEach(function (item) {
                            sum = sum + item.baNum
                        })
                        sums[index] = sum
                        return
                    }

                })

                return sums
            },
            handleSelectionChange(val){
                this.$emit("getVal", val)
            },
            selectAll(val){
                this.$emit("getVal", val)
            }

        },
        mounted(){
            this.manageData()
        }

    }
</script>

<style lang="scss">
    .tms {
        .el-table__footer-wrapper {
            height: 30px;
        }
    }
</style>
<style lang="scss" scoped>


    .el-select {
        width: 95px;
        margin-left: 10px;
    }

    .select {
        float: left;
    }

    label {
        font-size: 12px;
        color: #333;
    }

    .form-select {
        width: 170px;
        float: left;
        margin-left: 8px;
        position: relative;

    }

    .el-tree {
        position: absolute;
        left: 64px;
        top: 44px;
        z-index: 1;
        width: 157px;

    }

    .inp {
        float: right;
        width: 95px;
        height: 30px;
        margin-top: 12px;
        line-height: 30px;
        background: #fff;
        input {
            width: 70px;
            border: none;
        }
        input:focus {
            outline: none;
        }

        i {
            color: #999;
            font-size: 12px;
        }

    }

    .el-date-editor.el-input {

        width: 110px;
    }

    .data {
        width: 325px;
        height: 30px;
        float: left;
        font-size: 12px;
        margin-left: 8px;
        p {
            float: left;
        }
        span {
            float: left;
            margin-left: 8px;
        }

        div {
            float: left;
            margin-left: 5px;
        }
    }

    .el-button {
        margin: 16px 10px 16px 0;
        background: #999;
        color: #fff;
        height: 25px;
        line-height: 7px;
        font-size: 12px;
    }

    .nav {
        background: #e4e4e4;
        height: 50px;
        line-height: 50px;
        border: 1px solid #ccc;
    }

    .el-form-item {
        float: left;
        margin-left: 5px;

        a {
            font-size: 12px;
            color: #000;
        }
    }

</style>
