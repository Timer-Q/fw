<template>
    <div class="dispatcherPage">
        <Form :inline="true" ref="form" :model="saveForm" label-width="100px">

            <div class="projection">
                <Button class="public-function-btn" @click="saveUpdate()">保存</Button>
                <Button class="public-function-btn" @click="removeChangeTab">取消</Button>
            </div>


            <div ref="OutBox">
                <div class="mainTable">
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车牌号码">
                                <Input v-model="vehicleDetail.vehicleNo" disabled></Input>
                                <Input v-model="vehicleDetail.id" v-show="false"></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆类型">
                                <Select placeholder="全部" v-model="vehicleDetail.vehicleType" @change="setCarry">
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
                            <FormItem label="承运商名称">
                                <Select placeholder="全部" v-model="vehicleDetail.carrierId" :disabled="aviable">
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
                            <FormItem label="车型">
                                <Select placeholder="全部" v-model="vehicleDetail.vehicleModels">
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
                            <FormItem label="荷载质量(KG)">
                                <Input v-model="vehicleDetail.checkQuality" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车架号码">
                                <Input v-model="vehicleDetail.vin" @change=""></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车辆皮重(KG)">
                                <Input v-model="vehicleDetail.vehicleWeight" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="荷载体积(KG)">
                                <Input v-model="vehicleDetail.checkVolume" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="挂车号码">
                                <Input v-model="vehicleDetail.trailerNo" @change=""></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车辆长度(M)">
                                <Input v-model="vehicleDetail.vehicleLength" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆宽度(M)">
                                <Input v-model="vehicleDetail.vehicleWidth" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆高度(M)">
                                <Input v-model="vehicleDetail.vehicleHeight" @change=""></Input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="档案编号">
                                <Input v-model="vehicleDetail.archivesCode" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="附加费证号">
                                <Input v-model="vehicleDetail.surchargeNo" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="百公里油耗">
                                <Input v-model="vehicleDetail.oilCost" @change=""></Input>
                            </FormItem>
                        </div>

                    </div>

                    <div>
                        <div class="table-row-select">
                            <FormItem label="行驶证号">
                                <Input v-model="vehicleDetail.drivingNo" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="运营证号">
                                <Input v-model="vehicleDetail.operateNo" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="发动机号">
                                <Input v-model="vehicleDetail.engineNo" @change=""></Input>
                            </FormItem>
                        </div>

                    </div>

                    <div>
                        <div class="table-row-select">
                            <FormItem label="自车编号">
                                <Input v-model="vehicleDetail.selfCarCode" @change=""></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="购买日期">
                                <el-date-picker type="date" @change="" v-model="vehicleDetail.buyTime"></el-date-picker>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆用途">
                                <Select placeholder="全部" v-model="vehicleDetail.vehicleUse">
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

                                    :file-list="imgList"
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
                                <el-input v-model="vehicleDetail.remark" @change=""></el-input>
                            </FormItem>
                        </div>
                    </div>
                    <div>
                        操作人

                        <div>
                            <div class="table-row-select">
                                <FormItem label="制单人">
                                    <Input v-model="vehicleDetail.createUser" @change="" disabled></Input>
                                </FormItem>
                            </div>
                            <div class="table-row-select">
                                <FormItem label="制单时间">
                                    <el-date-picker type="date" @change="" disabled
                                                    v-model="vehicleDetail.createTime"></el-date-picker>
                                </FormItem>
                            </div>
                            <div class="table-row-select">
                                <FormItem label="修改人">
                                    <Input v-model="vehicleDetail.updateUser" @change="" disabled></Input>
                                </FormItem>
                            </div>
                            <div class="table-row-select">
                                <FormItem label="修改时间">
                                    <el-date-picker type="date" @change=""
                                                    v-model="vehicleDetail.updateTime" disabled></el-date-picker>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="table-row-select">
                            <FormItem label="审核人">
                                <Input v-model="vehicleDetail.checkUser" @change="" disabled></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="审核时间">
                                <el-date-picker type="date" @change=""
                                                v-model="vehicleDetail.checkTime" disabled></el-date-picker>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="取消审核人">
                                <Input v-model="vehicleDetail.cancelCheckUser" @change="" disabled></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="取消审核时间">
                                <el-date-picker type="date" @change=""
                                                v-model="vehicleDetail.cancelCheckTime"
                                                disabled></el-date-picker>
                            </FormItem>
                        </div>
                    </div>
                </div>

            </div>
        </Form>


    </div>
</template>

<script>
    import vehicleService from '@Tms/services/vehicle/vehicleService.js'
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    import commonService from '@Tms/services/common/common.js'

    export default {
        mixins: [screenScrollMixins],
        props: ["tabMessage"],
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                faield: false,
                imgList: [],
                attmentUrl: [],
                copyVehicleDetail: '',
                cllx: [],//车辆类型
                cx: [],//车型
                lists: [],
                carryList: [],//承运商
                custName: '',//承运商名称
                clyt: [],//车辆用途
                file: [],
                paths: [],
                img_list: [],
                vehicleDetail: '',
                aviable:false

            }
        },
        created() {


        },
        methods: {
            async getData(driverId) {
                const _this = this
                try {
                    const data = await vehicleService.detail(_this.tabMessage.vehicleId)
                    _this.vehicleDetail = data.data.result
                    if (_this.vehicleDetail.attachmentUrl) {
                        _this.paths = _this.vehicleDetail.attachmentUrl.split(',')
                        _this.attmentUrl = _this.vehicleDetail.attachmentUrl.split(',')
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
                } catch (e) {

                }


            },
            setCarry(value){
                let _this=this
                if(value==3){
                    _this.aviable=true
                    _this.vehicleDetail.carrierId=''
                    _this.vehicleDetail.carrierName=''
                }else{
                    _this.aviable=false
                }

            },

            async saveUpdate() {
                console.log(111111111111111111111)
                try {
                    let _this = this

                    let strs = this.paths.join(",")
                    _this.vehicleDetail.attachmentUrl = strs
                    const message = _this.vehicleDetail
                    const data = await vehicleService.update(message)

                    if (data.data.result == 1) {

                        this.$customMessage("修改成功！", "success")

                        _this.$root.bus.$emit("vehicleTabClose",this.tabMessage)

                    } else {
                        this.$customMessage("修改失败！", "error")

                    }
                } catch (e) {
                    // this.$myMessage("新增失败-c", "error")
                    console.log(e)
                }

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
                if (response.status.statusCode == 0) {

                    this.paths.push(response.result)

                    this.$customMessage("上传成功！", "success")
                    this.dialogImageUrl = 'http://tms-1254060329.cosbj.myqcloud.com' + response.result
                    // this.dialogVisible = true
                }
                else {

                    this.$customMessage("上传失败,请检查图片大小重新上传！", "error")
                    if (fileList.length == 1) {
                        fileList.splice(0, 1)
                    } else {
                        fileList.forEach((item, index) => {

                            if (fileList[index] == file) {
                                fileList.splice(index, 1)
                            }
                        })
                    }
                }

            },
            jumpToOldTab() {
                console.log(this.channelItem)
                let currentTag = this.channelItem.tag
                let OldTag = this.channelItem.tag.replace("update", "detail")

                /*把修改页tag信息,详情页tag信息,渠道信息汇总到父组件container中*/
                this.$emit("removeChangeTab", currentTag, OldTag, this.copyChannelDetail)
//                this.$root.bus.$emit("test",this.copyChannelDetail)
            },
            removeChangeTab() {
                this.$root.bus.$emit("vehicleTabClose",this.tabMessage)
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
            _this.getData()
            _this.getDictoryByCode()


        },
        computed: {},
        watch: {},
        filters: {}


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
</style>

