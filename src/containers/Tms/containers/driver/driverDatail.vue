<template>
    <div ref="OutBox">
        <Form :inline="true" ref="driverInfo" :model="driverDetail" label-width="100px">

            <div class="projection">
                <Button class="public-function-btn" @click="jumpToUpdate()">修改</Button>
                <Button class="public-function-btn" @click="cancel">取消</Button>
            </div>


            <div>
                <div class="mainTable">
                    <div>
                        <div class="table-row-select">
                            <FormItem label="司机编号" prop="driverCode" required>
                                <Input v-model="driverDetail.driverCode" placeholder="自动编码"
                                       disabled></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="司机姓名" prop="driverName" required>
                                <Input v-model="driverDetail.driverName"></Input>
                                <Checkbox v-model="driverDetail.employee" @change="setEmployee">公司名称
                                </Checkbox>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="承运商名称" prop="belongCarry">
                                <Select placeholder="请选择" v-model="driverDetail.belongCarry"
                                        @change="setCarryName"
                                        :disabled="aviable">
                                    <Option
                                        v-for="item in carryList"
                                        :key="item.logisticsId"
                                        :label="item.custName"
                                        :value="item.logisticsId">
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <Upload
                                class="avatar-uploader"
                                action="http://localhost:8989/vehicle/uploadPic"
                                :show-file-list="false"
                                :on-success="setHeadUrl"
                                :disabled="true"
                            >
                                <img v-if="imageUrlHead" :src="imageUrlHead" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </Upload>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="身份证号" prop="identityCard">
                                <Input v-model="driverDetail.identityCard" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="手机号码" prop="phoneNo">
                                <Input v-model="driverDetail.phoneNo" @change=""
                                       placeholder="电话号码/手机号码必须填一项"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="电话号码">
                                <Input v-model="qu" @change="" placeholder="区号" style="width: 50px"></Input>-
                                <Input v-model="contact" @change="" placeholder="联系电话" style="width: 80px"></Input>-
                                <Input v-model="fen" @change="" placeholder="分机" style="width: 50px"></Input>

                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="初次领证日期" prop="firstLicenseDatetime">
                                <el-date-picker type="date" @change=""
                                                v-model="driverDetail.firstLicenseDatetime"></el-date-picker>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="年检、换证日期" prop="yearCheckDatetime">
                                <el-date-picker type="date" @change=""
                                                v-model="driverDetail.yearCheckDatetime"></el-date-picker>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="准驾车型">
                                <Select placeholder="请选择" v-model="driverDetail.driveType">
                                    <Option
                                        v-for="item in zjcx"
                                        :key="item.itemCode"
                                        :label="item.itemName"
                                        :value="item.itemCode">
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="驾驶证号" prop="driverNo" required>
                                <Input v-model="driverDetail.driverNo" @change=""></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="常住地址">
                                <Select placeholder="请选择" v-model="cuntry">
                                    <Option value="中国大陆" label="中国大陆">

                                    </Option>
                                </Select>

                                <fw-address-select keyPrefix="invoice"
                                                   class="address"
                                                   label=""
                                                   v-model="coverArea">

                                </fw-address-select>
                                <Input v-model="driverDetail.address " @change="" placeholder="详细地址"></Input>
                            </FormItem>
                        </div>

                    </div>
                    <div class="table-row-select">
                        <FormItem label="上传">
                            <Upload
                                action="http://localhost:8989/vehicle/uploadPic"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-success="setAtamentUrl"
                                :before-upload="beforeUpload"
                                :file-list="imgList"
                                :disabled="true"
                            >

                                <i class="el-icon-plus"></i>
                            </Upload>
                            <el-dialog v-model="messageVisible" size="tiny">
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
                            <el-input v-model="driverDetail.remarks" @change=""></el-input>
                        </FormItem>
                    </div>
                </div>

            </div>

            <div class="">
                <Tabs type="card" @tab-click="">
                    <div>银行账户信息</div>

                    <Table
                        :data="driverDetail.baseDriverBankDTOs"
                        border
                        :highlight-current-row="true"
                        @selection-change="setIds"
                    >
                        <TableColumn
                            type="index"
                            fixed
                            width="70"
                            label="序号">
                        </TableColumn>
                        <TableColumn type="selection" width="55" prop="id"></TableColumn>
                        <TableColumn
                            prop="accountName"
                            label="账户名称">
                        </TableColumn>
                        <TableColumn
                            prop="openBank"
                            label="开户银行">
                        </TableColumn>
                        <TableColumn
                            prop="bankAccount"
                            label="银行账号">
                        </TableColumn>
                        <TableColumn
                            prop="idafault"
                            label="是否默认">
                            <template slot-scope="scope">
                                    <span v-if="scope.row.idafault=='true'">
                                        是
                                    </span>
                                <span v-else>
                                        否
                                    </span>
                            </template>
                        </TableColumn>
                        <TableColumn
                            prop="remarks"
                            label="备注">
                        </TableColumn>
                    </Table>


                </Tabs>
            </div>
            <div>

                <div>
                    操作人


                </div>
                <div class="table-row-select">
                    <FormItem label="制单人">
                        <Input v-model="driverDetail.createUser" @change=""></Input>
                    </FormItem>
                </div>
                <div class="table-row-select">
                    <FormItem label="制单时间">
                        <el-date-picker type="date" @change=""
                                        v-model="driverDetail.createTime"></el-date-picker>
                    </FormItem>
                </div>
            </div>
        </Form>


    </div>
</template>

<script>
    import driverService from '@Tms/services/driver/driverService.js'
    import commonService from '@Tms/services/common/common.js'
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'


    export default {
        mixins: [screenScrollMixins],
//        props: ["driverItem"],
        props:
           ["tabMessage"],

        data() {

            return {
                ruleCard: {
                    identityCard:
                        [
                            {required: true, message: '请填写证件号码', trigger: 'blur'},
                            {
                                pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                                message: '证件号码格式有误！',
                                trigger: 'blur'
                            }
                        ],
                    driverName: [
                        {required: true, message: '请输入司机姓名', trigger: 'blur'}
                    ],
                    driverNo: [
                        {required: true, message: '请输入驾驶证号', trigger: 'blur'}
                    ],
                },
                rules: {
                    accountName: [
                        {required: true, message: '请输入账户名称', trigger: 'blur'}

                    ],
                    openBank: [
                        {required: true, message: '请输入开户银行', trigger: 'blur'}
                    ],
                    bankAccount: [
                        {required: true, message: '请输入银行账号', trigger: 'blur'}
                    ]
                },
                dialogImageUrl: '',
                dialogVisible: false,//银行账户弹框
                messageVisible: false,//操作信息弹框
                saveFrame: false,
                haveVehicle: false,
                faield: false,
                zjcx: [],//准驾车型
                lists: [],
                carryList: [],//承运商
                custName: '',//承运商名称
                file: [],
                paths: [],
                headpaths: [],
                imgList: [],
                imageUrlHead: '',
                attmentUrl: [],
                imageUrl: '',
                cuntry: '中国大陆',
                aviable: false,//承运商是否可选择
                contact: '',
                qu: '',
                fen: '',
                driverInfo: {
                    address: '',
                    attachmentUrl: '',
                    headUrl: '',
                    belongCarry: '',
                    carrierName: '',
                    city: '',
                    country: '',//国家
                    province: '',//省
                    county: '',//区
                    createUser: 2,
                    street: '',
                    driveType: '',
                    driverCode: '',
                    driverName: '',
                    driverNo: '',
                    employee: false,
                    firstLicenseDatetime: '',
                    identityCard: '',
                    phoneNo: '',
                    companyId: 2,
                    remarks: '',
                    telNo: '',
                    vehicleNo: '',
                    yearCheckDatetime: '',
                    baseDriverBankDTOs: []//银行账号信息
                },

                // 银行账号添加
                bankForm: {
                    accountName: '',
                    bankAccount: '',
                    driverId: '',
                    idafault: false,
                    openBank: '',
                    remarks: ''
                },
                coverArea: {
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
                selectIds: [],
                telNos: [],
                driverDetail:{}
            }
        },
//        created() {
//            let _this = this
//            _this.getDictoryByCode()
//            if (_this.driverDetail.attachmentUrl) {
//                _this.attmentUrl = _this.driverDetail.attachmentUrl.split(',')
//                console.log('-attmentUrl--', _this.attmentUrl)
//                _this.attmentUrl.forEach((item, index) => {
//                    let url = {
//                        url: 'http://tms-1254060329.cosbj.myqcloud.com' + item
//                    }
//                    console.log('-url--', url)
//                    _this.imgList.push(url)
//                })
//                console.log('---', _this.imgList)
//            }
//            if (_this.driverDetail.headUrl) {
//
//                let urls = 'http://tms-1254060329.cosbj.myqcloud.com' + _this.driverDetail.headUrl
//
//                _this.imageUrlHead = urls
//                console.log('-imageUrlHead--', _this.imageUrlHead)
//            }
//            let strs = _this.driverDetail.telNo
//            if (strs != '') {
//                _this.telNos = strs.split('-')
//                _this.qu = _this.telNos[0]
//                _this.contact = _this.telNos[1]
//                _this.fen = _this.telNos[2]
//
//            }
//
//            _this.coverArea.invoiceProvId = _this.driverDetail.province
//            _this.coverArea.invoiceCityId = _this.driverDetail.city
//            _this.coverArea.invoiceDistrictId = _this.driverDetail.county
//            _this.coverArea.invoiceStreetId = _this.driverDetail.street
//            console.log('--_this.coverArea.invoiceProvId-', _this.coverArea.invoiceProvId)
////            var myDate = new Date()
////            var mytime=myDate.toLocaleTimeString()     //获取当前时间
////            newDate.format('yyyy-MM-dd h:m:s')
////            console.log('当前时间---',(new Date()).getTime())
//        },
        methods: {

            async getData(driverId) {
                const _this = this
                try {
                    const data = await driverService.detail(_this.tabMessage.driverId)
                    _this.driverDetail = data.data.result
                    if (_this.driverDetail.attachmentUrl != '') {
                        _this.attmentUrl = _this.driverDetail.attachmentUrl.split(',')
                        console.log('-attmentUrl--', _this.attmentUrl)
                        _this.attmentUrl.forEach((item, index) => {
                            let url = {
                                url: 'http://tms-1254060329.cosbj.myqcloud.com' + item
                            }
                            console.log('-url--', url)
                            _this.imgList.push(url)
                        })
                        console.log('---', _this.imgList)
                    }
                    if (_this.driverDetail.headUrl != '') {
                        let urls = 'http://tms-1254060329.cosbj.myqcloud.com' + _this.driverDetail.headUrl
                        _this.imageUrlHead = urls
                        console.log('-imageUrlHead--', _this.imageUrlHead)
                    }
                    let strs = _this.driverDetail.telNo
                    if (strs != '') {
                        _this.telNos = strs.split('-')
                        _this.qu = _this.telNos[0]
                        _this.contact = _this.telNos[1]
                        _this.fen = _this.telNos[2]
                    }
                    _this.coverArea.invoiceProvId = _this.driverDetail.province
                    _this.coverArea.invoiceCityId = _this.driverDetail.city
                    _this.coverArea.invoiceDistrictId = _this.driverDetail.county
                    _this.coverArea.invoiceStreetId = _this.driverDetail.street
                    console.log('--_this.coverArea.invoiceProvId-', _this.driverDetail)
                    if (_this.driverDetail.employee) {
                        _this.aviable = true
                        _this.driverDetail.belongCarry = ''
                        _this.driverDetail.carrierName = ''
                    } else {
                        _this.aviable = false
                    }
                } catch (e) {

                }


            },
            addArea(flag) {

                let _this = this, count = 0

                _this.$refs['bankForm'].validate((valid) => {
                    if (valid) {
                        const params = {
                            'accountName': _this.bankForm.accountName,
                            'bankAccount': _this.bankForm.bankAccount,
                            'idafault': _this.bankForm.idafault,
                            'openBank': _this.bankForm.openBank,
                            'remarks': _this.bankForm.remarks
                        }
                        console.log('----', params)
                        //校验银行账号是否存在列表中
                        _this.driverDetail.baseDriverBankDTOs.forEach((item, index) => {
                            if (params.bankAccount == item.bankAccount) {

                                count = 1
                            }
                        })
                        if (count == 1) {
                            _this.$customMessage("已存在银行账号，请核对！！", 'warning')
                            return false
                        }
                        _this.driverDetail.baseDriverBankDTOs.push(params)
                        _this.$customMessage("添加成功！", 'success')
                        _this.clearInput()
                        if (flag == 'new') {

                            _this.dialogVisible = true
                        }
                        else {
                            _this.dialogVisible = false


                        }


                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })

            },
            setIds(selection) {

                let _this = this
                _this.selectIds = []
                for (let i in selection) {
                    _this.selectIds.push(selection[i])

                }


            },
            setEmployee(value) {
                if (this.driverDetail.employee) {
                    this.aviable = true
                    this.driverDetail.belongCarry = ''
                    this.driverDetail.carrierName = ''

                } else {

                    this.aviable = false
                }
                console.log(this.driverDetail.employee)

            },
            // 移除表格中选中的区域
            removeArea(index) {
                let _this = this
                let selectRecordsTable = []
                // 移除区域添加的表格中数据
                if (_this.selectIds.length) {
                    _this.driverDetail.baseDriverBankDTOs.forEach((item, index) => {

                        if (_this.selectIds.indexOf(item) == -1) {
                            selectRecordsTable.push(item)
                        }
                    })
                    _this.driverDetail.baseDriverBankDTOs = selectRecordsTable
                    _this.$customMessage("移除成功！", 'success')
                    this.selectIds = []
                }
                else {
                    _this.$customMessage("请至少选择一条数据", 'warning')
                }


            },
            //清空表单
            clearInput() {
                let _this = this
                _this.bankForm.accountName = ''
                _this.bankForm.openBank = ''
                _this.bankForm.bankAccount = ''
                _this.bankForm.idafault = false
                _this.bankForm.remarks = ''

            },

            jumpToUpdate() {

                let addTabObj = {
                    name: `司机档案-修改`,
                    tag: `${this.tag}_update`,
                    state: "update",
                    parentTag: '',
                    driverId: this.tabMessage.driverId
                }


                this.$root.bus.$emit('driverTabAdd', addTabObj)


//                console.log(this.channelItem)
//                let id = this.driverDetail.id
////                this.$emit("editChannel","update"+index,this.channelItem.tag,this.tabDetail)
////                let updateTag=this.channelItem.tag.replace("detail","")
////                let canalName=this.detailData
//                this.$emit("editChannel", "update" + id, this.driverDetail)


            },
            cancel() {
                this.$root.bus.$emit("driverTabClose",this.tabMessage)
            }
            ,
            async getDictoryByCode() {
                let _this = this
                const message = {code: 'zjcx'}
                const data = await
                    commonService.fetchDictionary(message)
                if (data.status == 200) {
                    const result = data.data.result
                    _this.zjcx = result
                }

                const message3 = {
                    orgId: '1002',
                    carrierType: 2,
                    custName: _this.custName
                }
                const data3 = await
                    commonService.getCarryList(message3)
                if (data3.status == 200) {
                    const result3 = data3.data.result
                    _this.carryList = result3

                }
            }
            ,
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
                        this.driverDetail.carrierName = _this.carryList[i].custName
                        // return _this.carryList[i].custName
                    }

                }
//                obj = _this.carryList[index];
//                console.log('---',obj);

            }
            ,
            setAtamentUrl(response, file, fileList) {
                // this.saveForm.attachmentUrl.push(response.getFileData())
//                this.saveForm.attachmentUrl.push(response.result)
//                console.log('====',file)
//                console.log('====',this.lists)
                this.paths.push(file.url.substring(file.url.length - 36))

//                this.dialogImageUrl = file.url
//                this.dialogVisible = true
            }
            ,
            setHeadUrl(res, file) {
                this.headpaths.push(file.url.substring(file.url.length - 36))
                this.imageUrl = URL.createObjectURL(file.raw)
            },
            closeTab() {

                this.$root.bus.$emit('childTabClose', this.parentObj)
            }
            ,
            beforeUpload(file) {

//                if (this.file.length > 1) {
//                    this.$message({
//                        type: 'error',
//                        message: '最多上传1张图片',
//                        duration: 1000
//                    })
//                    return false
//                }
            }
            ,
            removeChangeTab() {
                this.$emit("removeChangeTab", "tms_vehicleManage_add")


            }
            ,
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1)
                        break
                    }
                }
            }
            ,
            handleRemove(file, fileList) {
                let _this = this
                console.log(file, fileList)
                _this.paths.forEach((item, index) => {
                    if (item == file.url.substring(file.url.length - 36)) {
                        _this.paths.splice(index, 1)
                    }
                })
                console.log('-------删除啦----', this.paths)
            }
            ,
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                let _this = this
                this.messageVisible = true
            }
            ,

        },
        mounted() {
            let _this = this
            console.log("----1--------------------", this.driverId)
            _this.getData(_this.tabMessage.driverId)
            _this.getDictoryByCode()

        }
        ,
        computed: {}
        ,
        watch: {}
        ,
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
        width: 22%;
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
</style>

