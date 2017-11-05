<template>
    <div class="tms_driverDispathchTransfer">
        <div class="projection">
            <ButtonGroup>
                <Button :class="{'public-function-btn':true,'disabled':isTransfer}"  @click="clickTopBtn('transfer')">转移</Button>

                <Button :class="{'public-function-btn':true,'disabled':isTransferAll}"  @click="clickTopBtn('transferAll')">全部转移</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button :class="{'public-function-btn':true,'disabled':isCopy}" @click="clickTopBtn('copy')">复制</Button>
                <Button :class="{'public-function-btn':true,'disabled':isCopyAll}" @click="clickTopBtn('copyAll')">全部复制</Button>
            </ButtonGroup>
            <Button class="public-function-btn"  @click="">司机线路转移</Button>
            <Button class="public-function-btn" @click="">导出</Button>
            <Button class="public-function-btn">日志</Button>
        </div>
        <div ref="OutBox">
            <div>
                <Form :inline="true" class="recordMsg">
                    <FormItem label="来源司机">
                        <Input v-model="dateInfo.driverName" value="" />
                    </FormItem>
                    <FormItem label="来源手机号">
                        <Input v-model="dateInfo.phoneNo" value="" />
                    </FormItem>
                    <FormItem label="承运商名称">
                        <Input v-model="dateInfo.carryName" value="" />
                    </FormItem>
                    <div>
                        <FormItem label="目标司机ID">
                            <Input v-model="targetDriver.driverId" value="" />
                        </FormItem>
                        <FormItem label="目标司机">
                            <Input v-model="targetDriver.driverName" value="" />
                        </FormItem>
                        <FormItem label="目标手机号">
                            <Input v-model="targetDriver.phoneNo" value="" />
                        </FormItem>
                        <FormItem label="承运商名称">
                            <Input v-model="targetDriver.carryName" value="" />
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
                        @selection-change="selectionKeyWordChange"
                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn type="selection" align="center" width="80"></TableColumn>
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
                        @selection-change="selectionRegionChange"
                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn type="selection" align="center" width="80"></TableColumn>
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
                        @selection-change="selectionBlockChange"
                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn type="selection" align="center" width="80"></TableColumn>
                        <TableColumn
                            prop="coverArea"
                            label="覆盖区域">
                        </TableColumn>
                        <TableColumn
                            prop="blockName"
                            label="区块名称">
                        </TableColumn>
                    </Table>

                </TabPane>
            </Tabs>
            <!--对话框-->
            <Dialog class="cj" :title="resultInfo.title" :visible.sync="dialogVisible">
                <div :class="{'dialog-content':resultInfo.msg.split('\n').length>1,'dialog-cont-one':resultInfo.msg.split('\n').length==1}">
                    <p v-for="item in resultInfo.msg.split('\n')">{{item}}</p>
                </div>
                <span slot="footer" class="dialog-footer">
                      <Button size="small" @click="dialogVisible = false">取 消</Button>
                      <Button size="small" type="primary" @click="confirmBtnClick">确 定</Button>
                    </span>
            </Dialog>
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
                isTransfer:false,
                isTransferAll:false,
                isCopy:false,
                isCopyAll:false,
                blockIds:[],
                keyWordIds:[],
                regionIds:[],
                // 对话框参数
                resultInfo: {
                    type: '',
                    title: '',
                    msg: ''
                },
                // 对话框是否显示
                dialogVisible: false,
                targetDriver:{
                    companyId:1,
                    driverId:1,
                    driverName:'',
                    phoneNo:'',
                    belongCarry: 1,
                    carryName:'',
                },
                regionList: [],
                keyWordList: [],
                blockList: [],
                targetDriverList:[]
            }
        },
        watch:{

        },
        methods: {
            //表格数据
            async getDeliveryDetail(){
                this.loading = true
                const message = {
                    "companyId":1,
                    "deliveryCode":"PTMR000107"
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
                    this.defaultBtnState()
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            // 默认启用/停用/删除按钮状态
            defaultBtnState(){
                this.isTransfer = false
                this.isTransferAll = false
                this.isCopy = false
                this.isCopyAll = false
            },
            // 对话框确定按钮
            async confirmBtnClick(){
                const type = this.resultInfo.type
                this.targetDriverList.push(this.targetDriver)
                try{

                    switch (type) {
                        case "transfer": {
                            const message = {
                                companyId: this.dateInfo.companyId,
                                driverId: this.dateInfo.driverId,
                                driverName: this.dateInfo.driverName,
                                phoneNo: this.dateInfo.phoneNo,
                                belongCarry: this.dateInfo.belongCarry,
                                carryName: this.dateInfo.carryName,
                                createUser: 1,
                                regionList: this.regionList,
                                keyWordList: this.keyWordList,
                                blockList: this.blockList,
                                targetDriverList: this.targetDriverList,
                                type: 1
                            }
                            const data = await route.transfer(message)
                            if(data.status==200){
                                this.getDeliveryDetail()
                                this.$customMessage("转移成功!","success")
                            }else{
                                console.log(data.status.statusReason)
                                this.$customMessage("转移失败","error")
                            }

                        }
                            break
                        case "transferAll": {
                            const message = {
                                companyId: this.dateInfo.companyId,
                                driverId: this.dateInfo.driverId,
                                driverName: this.dateInfo.driverName,
                                phoneNo: this.dateInfo.phoneNo,
                                belongCarry: this.dateInfo.belongCarry,
                                carryName: this.dateInfo.carryName,
                                createUser: 1,
                                regionList: this.regionList,
                                keyWordList: this.keyWordList,
                                blockList: this.blockList,
                                targetDriverList: this.targetDriverList,
                                type: 2
                            }
                            const data = await route.transfer(message)
                            if(data.status==200){
                                this.getDeliveryDetail()
                                this.$customMessage("全部转移成功!","success")
                            }else{
                                console.log(data.status.statusReason)
                                this.$customMessage("全部转移失败","error")
                            }
                        }
                            break
                        case "copy": {
                            const message = {
                                companyId: this.dateInfo.companyId,
                                driverId: this.dateInfo.driverId,
                                driverName: this.dateInfo.driverName,
                                phoneNo: this.dateInfo.phoneNo,
                                belongCarry: this.dateInfo.belongCarry,
                                carryName: this.dateInfo.carryName,
                                createUser: 1,
                                regionList: this.regionList,
                                keyWordList: this.keyWordList,
                                blockList: this.blockList,
                                targetDriverList: this.targetDriverList,
                                type: 3
                            }
                            const data = await route.copy(message)
                            if(data.status==200){
                                this.getDeliveryDetail()
                                this.$customMessage("复制成功!","success")
                            }else{
                                console.log(data.status.statusReason)
                                this.$customMessage("复制失败","error")
                            }

                        }
                            break
                        case "copyAll": {
                            const message = {
                                companyId: this.dateInfo.companyId,
                                driverId: this.dateInfo.driverId,
                                driverName: this.dateInfo.driverName,
                                phoneNo: this.dateInfo.phoneNo,
                                belongCarry: this.dateInfo.belongCarry,
                                carryName: this.dateInfo.carryName,
                                createUser: 1,
                                regionList: this.regionList,
                                keyWordList: this.keyWordList,
                                blockList: this.blockList,
                                targetDriverList: this.targetDriverList,
                                type: 4
                            }
                            const data = await route.copy(message)
                            if(data.status==200){
                                this.getDeliveryDetail()
                                this.$customMessage("全部复制成功!","success")
                            }else{
                                console.log(data.status.statusReason)
                                this.$customMessage("全部复制失败","error")
                            }
                        }
                            break
                    }
                    this.dialogVisible = false
                }catch(e){
                    console.log(e)
                    this.$customMessage("操作失败-c","error")
                }
            },
            // 列表上部按钮
            clickTopBtn(state){
                if (!this.blockIds.length&&!this.keyWordIds.length&&!this.regionIds.length) {
                    this.$customMessage("请勾选至少一条记录","warning")
                    return
                }
                this.resultInfo.type = state
                switch (state) {
                    case "transfer": {
                        this.resultInfo.title = '转移确认'
                        this.resultInfo.msg = '确定要转移所选数据吗？'
                    }
                        break
                    case "transferAll": {
                        this.resultInfo.title = '全部转移确认'
                        this.resultInfo.msg = '确定要转移全部数据吗？'
                    }
                        break
                    case "copy": {
                        this.resultInfo.title = '复制确认'
                        this.resultInfo.msg = '确定复制所选数据吗？'
                    }
                        break
                    case "copyAll": {
                        this.resultInfo.title = '全部复制确认'
                        this.resultInfo.msg = '确定复制全部数据吗？'
                    }
                        break
                }
                this.dialogVisible = true
            },
            // 列表复选框发生改变
            selectionBlockChange(selection){
                this.blockIds = []
                this.blockList=[]
                selection.forEach((item) => {
                    this.blockList.pust(item)
                    this.blockIds.push(item.blockId)
                })
            },
            // 列表复选框发生改变
            selectionRegionChange(selection){
                this.regionIds = []
                this.regionList=[]
                selection.forEach((item) => {
                    this.regionList.push(item)
                    this.regionIds.push(item.coverAreaId)
                })
            },
            // 列表复选框发生改变
            selectionKeyWordChange(selection){
                this.keyWordList=[]
                this.keyWordIds = []
                selection.forEach((item) => {
                    this.keyWordList.push(item)
                    this.keyWordIds.push(item.keyWordId)
                })
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
