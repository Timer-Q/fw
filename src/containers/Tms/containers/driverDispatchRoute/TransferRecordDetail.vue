<template>
    <div class="recordDetail">
        <div ref="OutBox">
            <div>
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
                    <div v-for="driver in dateInfo.targetDriverList">
                        <FormItem label="目标司机">
                            <Input v-model="driver.driverName" value="" disabled/>
                        </FormItem>
                        <FormItem label="目标手机号">
                            <Input v-model="driver.phoneNo" value="" disabled/>
                        </FormItem>
                        <FormItem label="承运商名称">
                            <Input v-model="driver.carryName" value="" disabled/>
                        </FormItem>
                    </div>
                </Form>
            </div>
            <Tabs v-model="activeName" type="card" @tab-click="">
                <TabPane label="关键词" name="first">
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
<<<<<<< HEAD
                            prop="keyword"
=======
                            prop="keyWord"
>>>>>>> 499c66ba07a9eb253ed89793e87a83b580408b1a
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
<<<<<<< HEAD
                            prop="blockName"
                            label="覆盖区域">
                        </TableColumn>
=======
                            prop="coverArea"
                            label="覆盖区域">
                        </TableColumn>
                        <TableColumn
                            prop="blockName"
                            label="区块名称">
                        </TableColumn>
>>>>>>> 499c66ba07a9eb253ed89793e87a83b580408b1a
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
            }
        },
        watch:{

        },
        methods: {
            //表格数据
            async getTransferRecordDetail(){
                this.loading = true
                const message = {
                    companyId:1,
                    recordCode:'FWGYL-AAWB2017102400007'
                }
                try {
                    const data = await route.getTransferRecordDetail(message)
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
        },

        mounted () {
            this.getTransferRecordDetail()
        }
    }
</script>
<style lang="scss" scoped>
    .recordDetail {
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
                transform: rotate(90deg) scaleY(0.8);
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
