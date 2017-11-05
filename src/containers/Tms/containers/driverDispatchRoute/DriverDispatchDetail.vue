<template>
    <div class="tms_driverDispathchTransfer">
        <div class="content">
            <Form :inline="true" class="recordMsg">
                <FormItem label="来源司机">
                    <Input v-model="dateInfo.driverName" value="" disabled/>
                </FormItem>
                <FormItem label="来源手机号">
                    <Input v-model="dateInfo.phoneNo" value="" disabled/>
                </FormItem>
                <FormItem label="承运商名称">
                    <Input v-model="dateInfo.carryName" value="" disabled/>
                </FormItem>
                <p>
                    <FormItem label="备注" >
                        <span  style="left: 347px;top: 64px"><i style="top: 0px;left:-10px;color: royalblue">{{textNum}}</i>/100</span>
                        <textarea rows="10" cols="30" ref="textarea" v-model="dateInfo.remarks" disabled />
                    </FormItem>
                </p>
            </Form>
            <Tabs v-model="activeName" type="card" @tab-click="">
                <TabPane label="关键词" name="first">
                    <!--操作区域-->
                    <Form :model="keywordForm" :inline="true" ref="keywordForm">
                        <FormItem label="覆盖区域"
                                  prop="coverAreaId"
                        >
                            <Select v-model="keywordForm.coverAreaId" placeholder="请选择">
                                <Option
                                    v-for="item in this.coverAreas"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="keyWord">
                            <Input v-model="keywordForm.keyWord" placeholder="搜索关键词"></Input>
                        </FormItem>
                        <Button @click="keyWordSubmit">查询</Button>
                        <FormItem>
                            <Button type="text">下载模版</Button>
                            <Button type="text">导出</Button>
                        </FormItem>
                    </Form>
                    <Table
                        :data="dateInfo.keyWordList"
                        :loading="loading"
                        border
                        :highlight-current-row="true"
                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn
                            prop="coverArea"
                            label="覆盖区域">
                        </TableColumn>
                        <TableColumn
                            prop="keyWord"
                            label="关键词名称">
                        </TableColumn>
                    </Table>
                </TabPane>
                <TabPane label="区域" name="second">
                    <Table
                        :data="dateInfo.regionList"
                        :loading="loading"
                        border
                        :highlight-current-row="true"

                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn
                            prop="coverArea"
                            label="覆盖区域">
                        </TableColumn>
                        <TableColumn
                            prop="coverType"
                            label="覆盖类型" >
                        </TableColumn>
                        <TableColumn
                            prop="routeNames"
                            label="覆盖线路">
                        </TableColumn>
                        <TableColumn
                            prop="roadName"
                            label="道路名称">
                        </TableColumn>
                        <TableColumn
                            prop="numberType"
                            label="号码类型">
                        </TableColumn>
                        <TableColumn
                            prop="startNum"
                            label="起始号码">
                        </TableColumn>
                        <TableColumn
                            prop="endNum"
                            label="结束号码">
                        </TableColumn>
                        <TableColumn
                            prop="siteNum"
                            label="站点号">
                        </TableColumn>
                    </Table>
                </TabPane>
                <TabPane label="电子围栏" name="three">
                    <Form :model="blockForm" :inline="true" ref="blockForm">
                        <FormItem label="覆盖区域"
                                  prop="coverAreaId"
                        >
                            <Select v-model="blockForm.coverAreaId" placeholder="请选择">
                                <Option
                                    v-for="item in this.coverAreas"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </Option>
                            </Select>
                        </FormItem>
                        <Button @click="blockSubmit">查询</Button>
                    </Form>
                    <Table
                        :data="dateInfo.blockList"
                        :loading="loading"
                        border
                        :highlight-current-row="true"
                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn
                            prop="coverArea"
                            label="覆盖区域">
                        </TableColumn>
                        <TableColumn
                            prop="blockName"
                            label="区块名称">
                        </TableColumn>
                        <TableColumn
                            prop="lngs"
                            label="经度">
                        </TableColumn>
                        <TableColumn
                            prop="lats"
                            label="维度">
                        </TableColumn>
                    </Table>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    import route from '@Tms/services/driverDispatchRoute/route.js'
    export default{
        data(){
            return {
                activeName:'first',
                dateInfo: null,
                loading: true,
                coverAreas: [{
                    value: '1',
                    label: '北京市北京市昌平区龙泽'
                }, {
                    value: '2',
                    label: '北京市北京市海淀区西二旗'
                }, {
                    value: '3',
                    label: '北京市北京市朝阳区望京'
                }, {
                    value: '4',
                    label: '北京市北京市顺义区天竺镇'
                }],
                //关键词添加
                keywordForm:{
                    coverAreaId:'',//需要去掉
                    keyWord:'',
                    kProvinceId:0, //关键词省Id
                    kCityId:0,  //关键词市Id
                    kCountyId:0, //关键词县Id
                    kTownId:0,  //关键词镇Id
                },
                blockForm:{
                    coverAreaId:'',//需要去掉
                    bProvinceId:0, //电子围栏省id
                    bCityId:0, //电子围栏市Id
                    bCountyId:0,  //电子围栏县Id
                    bTownId:0, //电子围栏镇Idd
                },
                companyId:1,
                deliveryCode: "PTMR000111"
            }
        },
        watch:{

        },
        computed: {
            /*控制文本域输入的字数*/
            textNum() {
                if (this.dateInfo.remarks.length > 100) {
                    this.$refs.textarea.style.borderColor = "red"
                    this.dateInfo.remarks = this.dateInfo.remarks.slice(0, 100)
                } else if (this.$refs.textarea) {
                    this.$refs.textarea.style.borderColor = "#cdcdcd"
                }
                return this.dateInfo.remarks.length


            }
        },
        methods: {
            //表格数据
            async getDeliveryDetail(){
                this.loading = true
                const message = {
                    "companyId":this.companyId,
                    "deliveryCode":this.deliveryCode,
                    "keyWord":this.keywordForm.keyWord,
                    "kProvinceId":this.keywordForm.kProvinceId,
                    "kCityId":this.keywordForm.kCityId,
                    "kCountyId":this.keywordForm.kCountyId,
                    "kTownId":this.keywordForm.kTownId,
                    "bProvinceId":this.blockForm.bProvinceId,
                    "bCityId":this.blockForm.bCityId,
                    "bCountyId":this.blockForm.bCountyId,
                    "bTownId":this.blockForm.bTownId,
                }
                try {
                    const data = await route.getDeliveryDetail(message)
                    if (data.status == 200) {
                        if(data.data.result!=null){
                            this.dateInfo=data.data.result
                        }else{
                            this.dateInfo=null
                        }
                    } else {
                        console.log(data.status.statusReason)
                        this.$customMessage("查询失败","error")
                    }
                    this.loading = false
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            /*获取列表信息*/
            blockSubmit(){
                this.companyId=1
                this.deliveryCode="PTMR000110"
                this.blockForm.bProvinceId=1,
                    this.blockForm.bCityId=1,
                    this.blockForm.bCountyId=1,
                    this.blockForm.bTownId=1,
                    this.getDeliveryDetail()
            },
            /*获取列表信息*/
            keyWordSubmit(){
                this.companyId=1
                this.deliveryCode="PTMR000104"
                this.keywordForm.kProvinceId=1,
                    this.keywordForm.kCityId=1,
                    this.keywordForm.kCountyId=2,
                    this.keywordForm.kTownId=2,
                    this.getDeliveryDetail()
            },
        },

        mounted () {
            this.getDeliveryDetail()
        }
    }
</script>
<style lang="scss" scoped>
    .tms_driverDispathchTransfer {
        width: 100%;
        height: 100%;
    }
    .recordMsg{
        margin: 20px 15px;
        padding:20px 15px 15px;
        width:calc(100% - 60px);
        border: 1px solid #cdcdcd;
        border-top:6px solid #cdcdcd;
        font-size: 12px;
        position: relative;
        & span:nth-of-type(1){
            margin-right:10px;
            color: #40afe7;
            & i:nth-of-type(1){
                font-size: 10px;
                margin-right:10px;

            }
            display: inline-block;
            position: absolute;
            left: 30px;
            top:-15px;
            padding:0 10px;
            background-color: #fff;

        }
        label{
            display: inline-block;
            height:40px;
            line-height:40px;
            margin-right:10px;
            vertical-align: middle;
        }
        input,textarea{
            display: inline-block;
            height: 38px;
            width:400px;
            line-height: 38px;
            padding-left:10px;
            border:1px solid #cdcdcd;
            background-color: #fff;
            vertical-align:center;

        }
        textarea{
            vertical-align:top;
            height:80px;
            min-width: 400px;
            max-width: 400px;
        }
        & p:nth-of-type(1){
            position: relative;
            margin-bottom:15px;
            i{
                position: absolute;
                top:10px;
                left:90px;
                color: red;
                font-size: 20px;
            }
        }
        & p:nth-of-type(2){
            margin-bottom:5px;
        }


    }
    .recordCum{
        padding-bottom: 60px;
    }
    .demo-form-inline{
        margin: 20px 15px;
        width: calc(100% - 60px);
        font-size: 12px;
        position: relative;
        textarea {
            padding:10px;
            min-width: 609px;
            max-width: 609px;
            display: inline-block;
            height: 38px;
            width: 600px;
            line-height: 14px;
            border: 1px solid #cdcdcd;
            resize:none;
        }
        p{
            margin-bottom: 5px;
            position: relative;
            span:nth-of-type(1) {
                display: inline-block;
                width: 49px;
                height: 27px;
                position: absolute;
                margin: 0;
                top: auto;
                bottom: 22px;
                left: 582px;
                background: #fff;
                color: #cdcdcd;
                & i:nth-of-type(1) {
                    color: #40afe7;
                    margin: 0;
                }
            }
        }

    }
    //消息提示框
    .success {
        position: absolute;
        transform: translate3d(-50%, -50%, 0);
        top: 50%;
        left: 50%;
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 6px;

    }
</style>
<style lang="scss">
    .tms-driver-route-add{
        /*-----------------tabs-------------------*/
        .el-tabs {
            margin: 0 16px 20px;
            position: relative;
        }
        .el-tabs__header {
            margin: 0;
        }
        .el-tabs__content {
            border: 1px solid #ccc;
            border-top: 0;
            position: static;
        }
        .el-tabs__item {
            height: 36px;
            line-height: 36px;
            padding: 0 25px;
            background: #eee;
            color: #999;
            border-radius: 4px 4px 0 0;
        }
        .el-collapse-item__content {
            font-size: 12px;
            color: #333;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item {
            border: 1px solid #ccc;
        }
        .el-tabs__item.is-active {
            color: #29a7e1;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
            border-top: 2px solid #29a7e1;
            border-bottom-color: #fff;
            position: relative;
            top: 1px;
            background: #f7fcff;
        }
        .temporary-tabs .el-tabs__item:not(.is-active){
            margin-right:0;
        }
    }
</style>
