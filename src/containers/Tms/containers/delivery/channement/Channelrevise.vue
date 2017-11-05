<template>
    <div class="tms_channelAdd">
        <div class="projection">
            <Button class="public-function-btn" @click="insertRoute">保存</Button>
            <Button class="public-function-btn" @click="removeChangeTab">取消</Button>
        </div>
        <div ref="OutBox">
            <div class="channelMsg " ref="channelMsg">
                <p>
                    <label>线路名称</label>
                    <input type="text" placeholder="请输入线路名称" v-model="val" @blur="canalName">
                    <span v-show="judgeChannel" style="color:red">线路名称重复，请重新输入</span>
                </p>
                <p>
                    <span><i>{{textNum}}</i>/100</span>
                    <label>　　备注</label>
                    <textarea rows="10" cols="30" ref="textarea" v-model="canalDescribe"></textarea>
                </p>
            </div>

            <div class="eltabs">
                <p>覆盖区域</p>
            </div>

            <div class="btabs">
                <Button class="public-function-btn" @click="dialogVisible=true">添加</Button>
                <Button class="public-function-btn" @click="delRoadList">移除</Button>

                <Table
                    border
                    slot="empty"
                    :data="tableData"
                    @select="selectRow"
                    @select-all="selectAll"
                    ref="multipleTable"
                    style="width: 720px; margin-left:10px;" :highlight-current-row="true">
                    <TableColumn  align="center" type="index" label="序号"></TableColumn>
                    <TableColumn type="selection" align="center"></TableColumn>
                    <TableColumn  align="center" prop="coverArea" label="覆盖区域" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="coverType" label="覆盖类型" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="roadName" label="道路名称" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="numberType" label="号码类型" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="startNum" label="起始号码" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="endNum" label="结束号码" width="90"   sortable></TableColumn>
                    <TableColumn  align="center" prop="siteNum" label="站点号"  sortable></TableColumn>
                </Table>
            </div>


        </div>

        <!--对话框-->
        <Dialog  title="区域添加" :visible.sync="dialogVisible" style="width: 100%" >

            <Form :model="area"  :inline="true">
                <el-form-item facade="TAB" label="覆盖区域" prop="invoiceAddress">
                    <fw-address-select  keyPrefix="invoice" class="address" label="发货地址" v-model="fd"></fw-address-select>
                </el-form-item>
                <FormItem label="道路名称">
                    <el-input v-model="coverArea.roadName" style="width: 131px;"></el-input>
                </FormItem>
                <FormItem label="覆盖类型">
                    <Select v-model="coverArea.coverType" style="width: 131px;">
                        <Option label="全部覆盖" value="1"></Option>
                        <Option label="部分覆盖" value="2"></Option>
                    </Select>
                </FormItem>
                <FormItem label="号码类型">
                    <Select :disabled="coverArea.coverType==1?true:false" v-model="coverArea.numberTypeId" style="width: 131px;">
                        <Option label="单号覆盖" value="1"></Option>
                        <Option label="双号覆盖" value="2"></Option>
                        <Option label="全号覆盖" value="3"></Option>
                        <Option label="全路覆盖" value="4"></Option>
                    </Select>
                </FormItem>
                <FormItem label="起始号码">
                    <el-input :disabled="coverArea.coverType==1?true:false" v-model="coverArea.startNum" style="width: 131px;"></el-input>
                </FormItem>
                <FormItem label="结束号码">
                    <el-input :disabled="coverArea.coverType==1?true:false" v-model="coverArea.endNum" style="width: 131px;"></el-input>
                </FormItem>
                <FormItem label="站点号">
                    <el-input v-model="coverArea.siteNum" style="width: 131px;"></el-input>
                </FormItem>
            </Form>
            <span slot="footer" class="dialog-footer">
                <Button size="small" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="primary" @click="addRoadList">添加</Button>
            </span>
        </Dialog>

        <!--保存成功提示框-->
        <div class="success" v-show="saveFrame">保存成功</div>
        <!--删除提醒框-->


        <div class="removeMessage">
            <div></div>
        </div>
    </div>


</template>
<script>
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    import service from "@Tms/services/channelService.js"


    export default {
        mixins: [screenScrollMixins],
        props:["update"],
        data() {
            return {
                canalDescribe: this.update.data.result.remarks,
                status: 1,
                data: [],
                judgeChannel: false,
                saveFrame: false,
                val:this.update.data.result.routeName,
                tableData:this.update.data.result.roads,
                dialogVisible:false,
                index:1,
                splice:"?",
                selectRowList:"",
                coverArea:{
                    roadName:"",
                    coverType:"",
                    numberTypeId:"",
                    startNum:"",
                    endNum:"",
                    siteNum:""
                },
                roadList:this.update.data.result.roads,
                fd:{
                    "invoiceProvId": "",
                    "invoiceProvName": "",
                    "invoiceCityId": "",
                    "invoiceCityName": "",
                    "invoiceDistrictId": "",
                    "invoiceDistrictName": "",
                    "invoiceStreetId": "",
                    "invoiceStreetName": "",
                    "invoiceAddress": "",
                    "invoiceAddressId": "",
                },
                area:{
                    coveArea:[
                        {shanghai:"上海"},
                        {beijing:"北京"}
                    ]
                }
            }
        },
        components: {


        },
        computed: {
            /*控制文本域输入的字数*/
            textNum() {
                if (this.canalDescribe.length > 100) {
                    this.$refs.textarea.style.borderColor = "red"
                    this.canalDescribe = this.canalDescribe.slice(0, 100)
                } else if (this.$refs.textarea) {
                    this.$refs.textarea.style.borderColor = "#cdcdcd"
                }
                return this.canalDescribe.length
            }
        },
        methods: {
            //判断线路是否已存在
            async judgeinput(val){
                this.loading = true
                try {
                    let flag = val==this.update.data.result.routeName
                    if(!flag){
                        const data = await service.judge(val)
                        if (data.status == 200) {
                            if(data.data.result){
                                this.judgeChannel=true
                                return false
                            }else{
                                this.judgeChannel=false
                            }
                        } else {
                            console.log(1)
                        }
                    }
                    this.loading = false
                }
                catch (e) {
                    console.log(e)
                }
            },
            //添加覆盖区域
            addRoadList() {
                let data={}
                let coverArea = this.fd.invoiceProvName==this.fd.invoiceCityName?this.fd.invoiceProvName:this.fd.invoiceProvName+this.fd.invoiceCityName
                coverArea+=this.fd.invoiceDistrictName+this.fd.invoiceStreetName
                let coverType
                if(this.coverArea.coverType==1){
                    coverType = "全部覆盖"
                }else if(this.coverArea.coverType==2){
                    coverType = "全部覆盖"
                }
                let numberType
                if(this.coverArea.coverType!=1){
                    if(this.coverArea.numberTypeId==1){numberType="单号覆盖"}
                    else if(this.coverArea.numberTypeId==2){numberType="双号覆盖"}
                    else if(this.coverArea.numberTypeId==3){numberType="全号覆盖"}
                    else if(this.coverArea.numberTypeId==4){numberType="全路覆盖"}
                    data.numberType=numberType
                    data.startNum=this.coverArea.startNum
                    data.endNum=this.coverArea.endNum
                }
                data.siteNum=this.coverArea.siteNum
                data.coverArea=coverArea
                data.coverType=coverType
                data.roadName=this.coverArea.roadName
                data.index=this.index
                this.index++
                for(let key in data){
                    if(!data[key]){
                        this.$message("请完善覆盖区域信息")
                        return
                    }
                }
                this.tableData.push(data)
                this.roadList.push({
                    roadName:this.coverArea.roadName,
                    companyId:1,
                    createUser:1,
                    coverArea:coverArea,
                    coverAreaId:this.fd.invoiceProvId+","+this.fd.invoiceCityId+","+this.fd.invoiceDistrictId+","+this.fd.invoiceStreetId,
                    coverTypeId:this.coverArea.coverType,
                    coverType:data.coverType,
                    numberTypeId:this.coverArea.numberTypeId,
                    numberType:numberType,
                    startNum:this.coverArea.startNum,
                    endNum:this.coverArea.endNum,
                    siteNum:this.coverArea.siteNum,
                    provinceId:this.fd.invoiceProvId,
                    provinceName:this.fd.invoiceProvName,
                    cityId:this.fd.invoiceCityId,
                    cityName:this.fd.invoiceCityName,
                    countyId:this.fd.invoiceDistrictId,
                    countyName:this.fd.invoiceDistrictName,
                    townId:this.fd.invoiceStreetId,
                    townName:this.fd.invoiceStreetName
                })
                for(let key in this.coverArea){
                    this.coverArea[key]=""
                }
                for(let key in this.fd){
                    this.fd[key]=""
                }
                this.dialogVisible=false
            },
            //保存线路
            insertRoute() {
                if(this.val && this.judgeChannel==false &&this.canalDescribe){
                    if(this.tableData.length<=0){
                        this.$message("请添加覆盖区域")
                        return false
                    }

                    const data={
                        "companyId": 1,
                        "createUser": 1,
                        "remarks": this.canalDescribe,
                        "routeState":true,
                        "routeName":this.val,
                        "roads":this.roadList,
                        "updateUser": 1,
                        "routeCode": this.update.data.result.routeCode,
                        "routeId": this.update.data.result.routeId
                    }
                    console.log(data)
                    service.revise(data).then((data) => {
                        if(data.data.result){
                            this.$message("保存线路信息成功")
                            this.$emit("refresh","tms_channement_update"+this.update.data.result.routeId)
                        }
                    },(error) => {
                        this.$message("保存线路失败")
                        console.log(error)
                    })
                }else{
                    this.$message("请填入线路名称和备注")
                    return
                }
            },
            //删除覆盖区域
            delRoadList(){
                for(let i=0;i<this.selectRowList.length;i++){
                    this.tableData.forEach((item,index) => {
                        if(item.index==this.selectRowList[i]){
                            this.tableData.splice(index,1)
                            this.roadList.splice(index,1)
                        }
                    })
                }
            },
            selectRow(val){
                this.selectRowList=[]
                val.forEach((item)=>{
                    this.selectRowList.push(item.index)
                })
            },
            selectAll(val){
                this.selectRowList=val
            },
            removeChangeTab() {
                this.$emit("removeChangeTab", "tms_channelManagement_add")
            },
            canalName(){
                let val=this.val
                this.judgeinput(val)
            }
        },
        mounted() {
            this.tableData.forEach((item) =>{
                item.index=this.index
                this.index++
            })
            let parseUrl= function (href) {
                var url = href || location.href
                var a = document.createElement('a')
                a.href = url
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            }
            let urlQueryMap=parseUrl()
            this.activeName=urlQueryMap.tab||'!警告'
            this.constructor.prototype.BX&&this.BX.call(this,'setCurrentVM')
        }
    }
</script>
<style lang="scss" scoped>

    .el-dialog__wrapper{
        height:900px !important;
    }


    .btabs{
        margin-top: 8px;
    }
    .b2b_channelAdd {
        width: 100%;
        height: 100%;
    }

    .channelMsg {
        padding: 20px 15px 15px;
        font-size: 12px;
        position: relative;
        transition: all 0.3s linear;
    >span:nth-of-type(1) {
        user-select: none;
        margin-right: 10px;
        color: #40afe7;
    i:nth-of-type(1) {
        transform: rotate(90deg) scaleY(0.8);
        font-size: 10px;
        margin-right: 10px;
        transition: all 0.3s linear;

    }
    display: inline-block;
    position: absolute;
    left: 30px;
    top: -15px;
    padding: 0 10px;
    background-color: #fff;

    }
    label {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
        vertical-align: middle;
    }
    input, textarea {
        display: inline-block;
        height: 25px;
        width: 145px;
        line-height: 38px;
        padding-left: 30px;
        border: 1px solid #cdcdcd;
        vertical-align: center;

    }
    textarea {
        vertical-align: top;
        height: 55px;
        line-height: 14px;
        padding: 10px;
        min-width: 409px;
        max-width: 409px;
    }
    p:nth-of-type(1) {
        position: relative;
        margin-bottom: 15px;
    i {
        position: absolute;
        top: 10px;
        left: 75px;
        color: red;
        font-size: 20px;
    }
    }
    p:nth-of-type(2) {
        margin-bottom: 5px;
        position: relative;
    span:nth-of-type(1) {
        display: inline-block;
        width: 61px;
        height: 27px;
        position: absolute;
        margin: 0;
        top: auto;
        bottom: 2px;
        left: 431px;
        background: #fff;
        color: #cdcdcd;
    & i:nth-of-type(1) {
          color: #40afe7;
          margin: 0;
      }
    }
    }

    }

    .channelCum {
        padding-bottom: 60px;
    }

    .success {
        position: absolute;
        transform: translate3d(-50%, -50%, 0);
        top: 50%;
        left: 50%;
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 6px;

    }

    .close {
        padding: 0 15px;
        height: 0;
    span:nth-of-type(1) {

    i:nth-of-type(1) {
        transform: rotate(270deg) scaleY(0.8);
        transition: all 0.3s linear;
    }

    }
    transition: all 0.3s linear;
    }

    .dialog-footer {
        position: static !important;
    }

    .projection{
        background:#c9c9c9;
    }


    .channelMsg{
        background:#e4e4e4;
    }

    .eltabs{
        width: 100%;
        height:40px;
        background: #f2f2f2;
        padding-top: 8px;

    p{
        font-size:14px;
        line-height: 50px;
        width: 100px;
        height:40px;
        border:1px solid #ccc;
        border-bottom:none;
        text-align: center;
        background: #fff;
        margin-left: 8px;
        border-radius: 5px 5px 0 0;
    }
    }



</style>
