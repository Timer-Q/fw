<template>
    <div ref="OutBox">
        <Form :inline="true" ref="saveForm" :rules="rules" :model="saveForm" label-width="100px">

            <div class="projection">
                <Button class="public-function-btn" @click="saveChannel()">保存</Button>
                <Button class="public-function-btn" @click="saveChannel('new')">保存并新增</Button>
                <Button class="public-function-btn" @click="cancel">取消</Button>
            </div>


            <div>
                <div class="mainTable">
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车牌号码" prop="vehicleNo">
                                <Input v-model="saveForm.vehicleNo" placeholder="请输入车牌号码"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆类型" prop="vehicleType">
                                <Select placeholder="请选择" v-model="saveForm.vehicleType" @change="setCarry">
                                    <Option
                                        v-for="item in cllx"
                                        :key="item.itemCode"
                                        :label="item.itemName"
                                        :value="item.itemCode">
                                    </Option>
                                </Select>

                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="承运商名称" prop="carrierId">
                                <Select placeholder="请选择" v-model="saveForm.carrierId" @change="setCarryName" :disabled="aviable">
                                    <Option
                                        v-for="item in carryList"
                                        :key="item.logisticsId"
                                        :label="item.custName"
                                        :value="item.logisticsId">
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车型" prop="vehicleModels">
                                <Select placeholder="请选择" v-model="saveForm.vehicleModels">
                                    <Option
                                        v-for="item in cx"
                                        :key="item.itemCode"
                                        :label="item.itemName"
                                        :value="item.itemCode">
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="核载质量(KG)" prop="checkQuality" >
                                <Input v-model.number="saveForm.checkQuality" @change="" placeholder="请输入核载质量" ></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车架号码">
                                <Input v-model="saveForm.vin" @change="" placeholder="请输入车架号码"></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车辆皮重(KG)" prop="vehicleWeight">
                                <Input v-model.number="saveForm.vehicleWeight" @change="" placeholder="请输入车辆皮重"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="核载体积(KG)" prop="checkVolume">
                                <Input v-model.number="saveForm.checkVolume" @change="" placeholder="请输入核载体积"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="挂车号码">
                                <Input v-model.number="saveForm.trailerNo" @change="" placeholder="请输入挂车号码"></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车辆长度(M)" prop="vehicleLength">
                                <Input v-model.number="saveForm.vehicleLength" @change="" placeholder="请输入车辆长度"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆宽度(M)" prop="vehicleWidth">
                                <Input v-model.number="saveForm.vehicleWidth" @change="" placeholder="请输入车辆宽度"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆高度(M)" prop="vehicleHeight">
                                <Input v-model.number="saveForm.vehicleHeight" @change="" placeholder="请输入车辆高度"></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="档案编号">
                                <Input v-model="saveForm.archivesCode" @change="" placeholder="请输入档案编号"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="附加费证号">
                                <Input v-model="saveForm.surchargeNo" @change="" placeholder="请输入附加费证号"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="百公里油耗">
                                <Input v-model="saveForm.oilCost" @change="" placeholder="请输入百公里油耗"></Input>
                            </FormItem>
                        </div>

                    </div>

                    <div>
                        <div class="table-row-select">
                            <FormItem label="行驶证号">
                                <Input v-model="saveForm.drivingNo" @change="" placeholder="请输入行驶证号"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="运营证号">
                                <Input v-model="saveForm.operateNo" @change="" placeholder="请输入运营证号"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="发动机号">
                                <Input v-model="saveForm.engineNo" @change="" placeholder="请输入发动机号"></Input>
                            </FormItem>
                        </div>

                    </div>

                    <div>
                        <div class="table-row-select">
                            <FormItem label="自车编号">
                                <Input v-model="saveForm.selfCarCode" @change="" placeholder="自车编号"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="购买日期">
                                <el-date-picker type="date" @change="" placeholder="请选择"
                                                v-model="saveForm.buyTime"></el-date-picker>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆用途">
                                <Select placeholder="请选择" v-model="saveForm.vehicleUse">
                                    <Option
                                        v-for="item in clyt"
                                        :key="item.itemCode"
                                        :label="item.itemName"
                                        :value="item.itemCode">
                                    </Option>


                                </Select>

                            </FormItem>
                        </div>

                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="上传">
                                <el-upload
                                    action="http://localhost:8989/vehicle/uploadPic"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    :on-success="setAtamentUrl"
                                    :before-upload="beforeUpload"
                                    :file-list="img_list"
                                >

                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog v-model="dialogVisible" size="tiny">
                                    <img width="100%" :src="dialogImageUrl" alt="">

                                </el-dialog>

                                <div>请上传车头、车身、车尾、行驶证正副照片，最多不超过10张； </div>
                                <div>要求：只能上传jpg/png文件，最大宽度不超过670px,且不超过500kb </div>
                            </FormItem>
                        </div>

                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="备注">
                                <el-input v-model="saveForm.remark" @change=""></el-input>
                            </FormItem>
                        </div>
                    </div>

                    <div>
                        操作人

                        <div>
                            <div class="table-row-select">
                                <FormItem label="制单人">
                                    <Input v-model="saveForm.createUser" @change="" disabled="true"></Input>
                                </FormItem>
                            </div>
                            <div class="table-row-select">
                                <FormItem label="制单时间">
                                    <el-date-picker type="date" @change=""
                                                    v-model="saveForm.createTime" disabled="true"></el-date-picker>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Form>

        <!--保存成功提示框-->
        <div class="success" v-show="saveFrame">保存成功</div>
        <div class="success" v-show="faield">保存失败</div>
        <div class="success" v-show="haveVehicle">已存在的车牌号码，请重新核对！</div>
    </div>
</template>

<script>
    import vehicleService from '@Tms/services/vehicle/vehicleService.js'
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    import commonService from '@Tms/services/common/common.js'

    export default {
        mixins: [screenScrollMixins],
        props:{
            tabMessage:Object
        },
        data() {
            return {
                saveForm: {
                    archivesCode: '',
                    attachmentUrl: '',
                    buyTime: '',
                    cancelCheckTime: '',
                    cancelCheckUser: '',
                    carrierId: '',
                    carrierName: '',
                    checkQuality: '',
                    checkStatus: '',
                    checkStatusDesc: '',
                    checkTime: '',
                    checkUser: '',
                    checkVolume: '',
                    companyId: 2,
                    createTime: '',
                    createUser: '',
                    drivingNo: '',
                    engineNo: '',
                    oilCost: '',
                    operateNo: '',
                    remarks: '',
                    selfCarCode: '',
                    status: '',
                    statusDesc: '',
                    surchargeNo: '',
                    trailerNo: '',
                    buyTime: '',
                    updateTime: '',
                    updateUser: '',
                    vehicleHeight: '',
                    vehicleLength: '',
                    vehicleModels: '',
                    vehicleModelsDesc: '',
                    vehicleNo: '',
                    vehicleType: '',
                    vehicleTypeDesc: '',
                    vehicleUse: '',
                    vehicleWeight: '',
                    vehicleWidth: '',
                    vin: ''
                },
                clearForm: {
                    archivesCode: '',
                    buyTime: '',
                    cancelCheckTime: '',
                    cancelCheckUser: '',
                    carrierId: '',
                    carrierName: '',
                    checkQuality: '',
                    checkStatus: '',
                    checkStatusDesc: '',
                    checkTime: '',
                    checkUser: '',
                    checkVolume: '',
                    companyId: 2,
                    createTime: '',
                    createUser: '',
                    drivingNo: '',
                    buyTime: '',
                    engineNo: '',
                    oilCost: '',
                    operateNo: '',
                    remarks: '',
                    selfCarCode: '',
                    status: '',
                    statusDesc: '',
                    surchargeNo: '',
                    trailerNo: '',
                    updateTime: '',
                    updateUser: '',
                    vehicleHeight: '',
                    vehicleLength: '',
                    vehicleModels: '',
                    vehicleModelsDesc: '',
                    vehicleNo: '',
                    vehicleType: '',
                    vehicleTypeDesc: '',
                    vehicleUse: '',
                    vehicleWeight: '',
                    vehicleWidth: '',
                    vin: ''
                },
                rules: {
                    vehicleNo: [
                        {required: true, message: '请输入车牌号码', trigger: 'blur'}

                    ],
                    vehicleType: [
                        {type: 'number',required: true, message: '请选择车辆类型', trigger: 'change'}
                    ],
//                    carrierId: [
//                        {type: 'number',required: true, message: '请选择承运商', trigger: 'change'}
//                    ],
                    vehicleModels: [
                        {type: 'number',required: true, message: '请选择车型', trigger: 'change'}
                    ],
                    checkQuality: [
                        {required: true, message: '请输入核载质量'},
                        { type: 'number', message: '核载质量必须为数字值'}
                    ],
                    vehicleWeight: [
                        {required: true, message: '请输入车辆皮重'},
                        { type: 'number', message: '车辆皮重必须为数字值'}
                    ],
                    checkVolume: [
                        {required: true, message: '请输入核载体积'},
                        { type: 'number', message: '核载质量必须为数字值'}
                    ],
                    vehicleLength: [
                        {required: true, message: '请输入车辆长度'},
                        { type: 'number', message: '车辆长度必须为数字值'}
                    ],
                    vehicleWidth: [
                        {required: true, message: '请输入车辆宽度'},
                        { type: 'number', message: '车辆宽度必须为数字值'}
                    ],
                    vehicleHeight: [
                        {required: true, message: '请输入车辆高度'},
                        { type: 'number', message: '车辆高度必须为数字值'}
                    ],
                },
                dialogImageUrl: '',
                dialogVisible: false,
                saveFrame: false,
                haveVehicle: false,
                faield: false,
                checkStatusOptions: [{
                    value: '1',
                    label: '已审核'
                }, {
                    value: '2',
                    label: '未审核'
                }, {
                    value: '3',
                    label: '已取消'
                }],
                statusOptions: [{
                    value: '1',
                    label: '启用'
                }, {
                    value: '2',
                    label: '停用'
                }],
                cllx: [],//车辆类型
                cx: [],//车型
                lists: [],
                carryList: [],//承运商
                custName: '',//承运商名称
                clyt: [],//车辆用途
                file: [],
                paths: [],
                img_list: [],
                aviable:false
            }
        },
        created() {

        },
        methods: {


            async saveChannel(flag) {
                console.log(this)
                let _this = this
                let ifSave = true
                _this.$refs['saveForm'].validate((valid) => {
                    if (valid) {

                    } else {
                        console.log('error submit!!')
                        ifSave = false
                        return false
                    }
                })
                if (ifSave) {
                    try {
                        let _this = this
                        let strs = this.paths.join(",")
                        _this.saveForm.attachmentUrl = strs

                        const message = _this.saveForm
                        const data = await vehicleService.add(message)

                        if (data.data.result == 1) {
                            this.$customMessage("保存成功！", "success")

                            if (flag == 'new') {
                                this.saveForm = _this.clearForm
                            } else {
                                _this.$root.bus.$emit("vehicleTabClose",this.tabMessage)


                            }
                        } else if (data.data.result == -1) {
                            this.$customMessage("已存在的车牌号码，请重新核对！", "warning")

                        } else {
                            this.$customMessage("保存失败！", "error")

                        }

                    } catch (e) {
                        // this.$myMessage("新增失败-c", "error")
                        console.log(e)
                    }
                }
            },
            cancel(){
                this.$root.bus.$emit("vehicleTabClose",this.tabMessage)
            },
            async getDictoryByCode() {
                let _this = this
                const message = {code: 'cllx'}
                const data = await commonService.fetchDictionary(message)
                if (data.status == 200) {
                    const result = data.data.result
                    _this.cllx = result
                }
                const message1 = {code: 'cx'}
                const data1 = await commonService.fetchDictionary(message1)
                if (data1.status == 200) {
                    const result1 = data1.data.result
                    _this.cx = result1
                }

                const message2 = {code: 'clyt'}
                const data2 = await commonService.fetchDictionary(message2)
                if (data2.status == 200) {
                    const result2 = data2.data.result
                    _this.clyt = result2
                }
                const message3 = {
                    orgId: '1002',
                    carrierType: 2,
                    custName: _this.custName
                }
                const data3 = await commonService.getCarryList(message3)
                if (data3.status == 200) {
                    const result3 = data3.data.result
                    _this.carryList = result3

                }
            },
            setCarry(value){
                let _this=this
                if(value==3){
                    _this.aviable=true
                    _this.saveForm.carrierId=''
                    _this.saveForm.carrierName=''
                }else{
                    _this.aviable=false
                }

            },
            setCarryName(value) {
                let _this = this
                //  console.log(value);
                let obj = {}
//                var eValue=eval('carryList.'+value);
//                alert(eValue);
                //2、遍历Json串获取其属性
                for (var i = 0, vlen = _this.carryList.length; i < vlen; i++) {
                    if (_this.carryList[i].logisticsId == value) {

                        console.log('---', _this.carryList[i].custName)
                        this.saveForm.carrierName = _this.carryList[i].custName
                        // return _this.carryList[i].custName
                    }

                }
//                obj = _this.carryList[index];
//                console.log('---',obj);

            },
            setAtamentUrl(response, file, fileList) {
                if(response.status.statusCode==0){

                    this.paths.push(response.result)
                    this.$customMessage("上传成功！", "success")
                    this.dialogImageUrl = 'http://tms-1254060329.cosbj.myqcloud.com'+response.result
              // this.dialogVisible = true
                }
               else{




                    this.$customMessage("上传失败,请检查图片大小重新上传！", "error")
                    if(fileList.length==1){
                        fileList.splice(0,1)
                    }else{
                    fileList.forEach((item, index) => {

                        if (fileList.indexOf(file) == 1) {
                            fileList.splice(index,1)
                        }
                    })
                    }
                }
            },


            removeChangeTab() {
                this.$emit("removeChangeTab", "tms_vehicleManage_add")


            },
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1)
                        break
                    }
                }
            },
            handleRemove(file, fileList) {
                let _this = this
                console.log(file, fileList)
                _this.paths.forEach((item, index) => {
                    if (item == file.url.substring(file.url.length - 37)) {
                        _this.paths.splice(index, 1)
                    }
                })
                console.log('-------删除啦----', this.paths)
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                let _this = this
                this.dialogVisible = true
            },

        },
        mounted() {
            let _this = this
            _this.getDictoryByCode()
        },
        computed: {},
        watch: {},
        filters: {

            formatDate(time) {
                let date = new Date(time)
                return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes())
            }


        }


    }

    function formatDate(time) {
        let date = new Date(time)
        return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes() + ":" + getFormat(date.getSeconds()))
    }

    function getFormat(val) {
        return val.toString().length > 1 ? val : "0" + val
    }


</script>

<style lang="scss" scoped>
    .table-row-select {
        display: inline-block;
        width: 33%;
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
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 6px;

    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .channelMsg {
        margin: 20px 15px;
        padding: 20px 15px 15px;
        width: calc(100% - 60px);
        border: 1px solid #cdcdcd;
        border-top: 6px solid #cdcdcd;
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
            height: 38px;
            width: 400px;
            line-height: 38px;
            padding-left: 30px;
            border: 1px solid #cdcdcd;
            vertical-align: center;

        }
        textarea {
            vertical-align: top;
            height: 210px;
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
                left: 90px;
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
                left: 445px;
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
</style>

