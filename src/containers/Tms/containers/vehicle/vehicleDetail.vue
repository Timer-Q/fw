<template>
    <div class="dispatcherPage" ref="OutBox">
        <Form :inline="true" ref="form" :model="vehicleDetail" label-width="100px">

            <div class="projection">

                <Button class="public-function-btn" @click="jumpToEditChannel" v-if="vehicleDetail.checkStatus==2||vehicleDetail.checkStatus==3" >修改</Button>
                <Button class="public-function-btn" @click="checkRecord" v-if="vehicleDetail.checkStatus==2||vehicleDetail.checkStatus==3">审核</Button>

                <Button class="public-function-btn" @click="jumpToEditChannel" v-if="vehicleDetail.checkStatus==1" disabled>修改</Button>
                <Button class="public-function-btn" @click="unCheckRecord" v-if="vehicleDetail.checkStatus==1" >取消审核</Button>
            </div>


            <div>
                <div class="mainTable">
                    <div>
                        <div class="table-row-select">
                            <FormItem label="车牌号码">
                                <Input v-model="vehicleDetail.vehicleNo" disabled></Input>
                            </FormItem>
                        </div>
                        <div class="table-row-select">
                            <FormItem label="车辆类型">
                                <Select placeholder="全部" v-model="vehicleDetail.vehicleType">
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
                                    :disabled="true"
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
                                                v-model="vehicleDetail.cancelCheckTime" disabled></el-date-picker>
                            </FormItem>
                        </div>
                    </div>
                </div>

            </div>
        </Form>

        <!--保存成功提示框-->
        <div class="success" v-show="deleteFa">{{messages}}</div>
    </div>
</template>

<script>
    import vehicleService from '@Tms/services/vehicle/vehicleService.js'
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    import commonService from '@Tms/services/common/common.js'
    export default {

        mixins:[screenScrollMixins],
        /*channelItem*/
        props: ["tabMessage"],
        data() {
            return {

                saveFrame: false,
                dialogImageUrl: '',
                dialogVisible: false,
                haveVehicle:false,
                faield:false,
                imgList: [],
                attmentUrl:[],
                cllx: [],//车辆类型
                cx: [],//车型
                lists: [],
                carryList: [],//承运商
                custName: '',//承运商名称
                clyt: [],//车辆用途
                file: [],
                paths: [],
                ids: [],
                deleteFa:false,
                messages:'',//操作提示消息
                vehicleDetail:{},
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
                    if(data.status==200&&data.data.result!=undefined){
                      _this.vehicleDetail = data.data.result
                        if(_this.vehicleDetail.attachmentUrl){
                            _this.attmentUrl=_this.vehicleDetail.attachmentUrl.split(',')

                            console.log('-attmentUrl--',_this.attmentUrl)
                            _this.attmentUrl.forEach((item, index) => {
                                let url={
                                    url : 'http://tms-1254060329.cosbj.myqcloud.com'+item
                                }
                                console.log('-url--',url)
                                _this.imgList.push(url)
                            })
                            console.log('---',_this.imgList)
                        }
                        if(_this.vehicleDetail.vehicleType==3){

                            _this.aviable=true
                        }
//                        this.$customMessage("操作成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("操作失败","error")
                    }
                } catch (e) {
                    this.$customMessage("操作失败","error")
                }


            },



            jumpToEditChannel(){
                console.log(this.channelItem)
                let id=this.vehicleDetail.id

                    let addTabObj = {
                        name: `车辆档案-修改`,
                        tag: `${this.tag}_update`,
                        state: "update",
                        parentTag: '',
                        vehicleId: this.tabMessage.vehicleId
                    }


                    this.$root.bus.$emit('vehicleTabAdd', addTabObj)



            },
            removeChangeTab() {
                this.$emit("removeChangeTab", "tms_vehicleManage_add")
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
            handleRemove(file, fileList) {
                let _this = this
                console.log(file, fileList)
                _this.paths.forEach((item, index) => {
                    if (item == file.url.substring(file.url.length - 36)) {
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
            setAtamentUrl(response, file, fileList) {

                let _this = this
                _this.paths.push(file.url.substring(file.url.length - 36))

            },


            async checkRecord() {
                let _this = this
                const message = {
                    ids: _this.vehicleDetail.id
                }

                const data = await vehicleService.checkByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.$customMessage("审核成功！", "success")
                        _this.$root.bus.$emit("vehicleTabClose",this.tabMessage)
                    } else {
                        this.$customMessage("审核失败！", "success")
                    }
                }
            },
            async unCheckRecord() {
                let _this = this
                const message = {
                    ids: _this.vehicleDetail.id
                }

                const data = await vehicleService.uncheckByIds(message)
                if (data.status == 200) {
                    const result = data.data.status.statusCode
                    if (result == 0) {
                        this.$customMessage("取消审核成功！", "success")
                        _this.$root.bus.$emit("vehicleTabClose",this.tabMessage)
                    } else {
                        this.$customMessage("取消审核失败！", "success")
                    }
                }
            },
            formatDate(time) {

                if (time !=null) {
                    let date = new Date(time)
                    return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate())
                }
                else {
                    return ''
                }
            }
        },

        mounted() {
            let _this = this
            _this.getDictoryByCode()
            _this.getData()

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

