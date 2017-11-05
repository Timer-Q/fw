<template>
    <div class="b2b_channelAdd">
        <div class="projection">
            <Button class="public-function-btn" @click="saveChannel">保存</Button>
            <Button class="public-function-btn" @click="removeChangeTab">取消</Button>

        </div>
        <div ref="OutBox">
            <div class="channelMsg " :class="{close:!closeStyle1}" ref="channelMsg">
                <span @click="closeStyle1=!closeStyle1"><i class="el-icon-d-arrow-left"></i>渠道信息</span>
                <div v-show="closeStyle1">
                    <p>
                        <i>*</i>
                        <label>渠道名称</label>
                        <input type="text" placeholder="请输入渠道类型名称" v-model="canalName">
                        <span v-show="judgeChannel" style="color:red">渠道名称不能为空</span>
                    </p>
                    <p>
                        <span><i>{{textNum}}</i>/300</span>
                        <label>渠道描述</label>
                        <textarea rows="10" cols="30" ref="textarea" v-model="canalDescribe"></textarea>
                    </p>
                </div>

            </div>
            <AddChannelCustom :name="canalName"></AddChannelCustom>
            <AddBlackGoods></AddBlackGoods>


            <!--保存成功提示框-->
            <div class="success" v-show="saveFrame">保存成功</div>
            <!--删除提醒框-->


            <div class="removeMessage">
                <div></div>
            </div>
        </div>


    </div>
</template>
<script>
    import {mapState, mapMutations} from "vuex"
    import goodsService from "@B2B/services/channel/goodsService.js"
    import channelService from "@B2B/services/channel/channelService.js"
    import screenScrollMixins from '@B2B/mixins/screenScrollMixins.js'
    /*引入子组件*/
    import AddChannelCustom from "@B2B/containers/channelManagement/AddChannelCustom.vue"
    import AddBlackGoods from "@B2B/containers/channelManagement/AddBlackGoods.vue"

    export default {
        mixins: [screenScrollMixins],
        data() {
            return {
                canalName: "",
                canalDescribe: "",
                status: 1,
                data: [],
                judgeChannel: false,
                closeStyle1: true,
                saveFrame: false,
                customData: "",
                blackGoodsData: "",
            }
        },
        components: {
            AddChannelCustom,
            AddBlackGoods,
        },
        computed: {
            /*控制文本域输入的字数*/
            textNum() {
                if (this.canalDescribe.length > 300) {
                    this.$refs.textarea.style.borderColor = "red"
                    this.canalDescribe = this.canalDescribe.slice(0, 300)
                } else if (this.$refs.textarea) {
                    this.$refs.textarea.style.borderColor = "#cdcdcd"
                }
                return this.canalDescribe.length


            },
            ...mapState(["B2B_S_CUSTOM", "B2B_S_BLACKGOODS"]),

        },
        methods: {

            removeChangeTab() {
                this.$root.bus.$emit("removeTab", "b2b_channelManagement_add")
            },


            /*增加保存渠道*/
            async saveChannel() {
                console.log(this.B2B_S_CUSTOM)
                if (!this.canalName.replace(/ +/, "")) {
                    this.judgeChannel = true
//                    alert("渠道名称不能为空")
                    return
                }
                let _this = this
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/addB2bCanalAll"
                let merchantId = []
//                console.log(this.B2B_S_CUSTOM)
                merchantId&&this.B2B_S_CUSTOM.map((item) => {
                    merchantId.push(item.merchantId+"")
                })

                let goodsId = []
                goodsId&&this.B2B_S_BLACKGOODS.map((item) => {
                    goodsId.push(Number(item.goodsId))
                })
                let data = {
                    "b2bCanalMerchantAddVo": {
                        "merchantId": merchantId,
                        "status": 1,
                        "siteId": 0,
                        "supplierId": 1
                    },
                    "b2bCanalStoreAddVo": {
                        "goodId": goodsId,
                        "status": 1,
                        "siteId": 0,
                        "supplierId": 1
                    },
                    "canalDescribe": this.canalDescribe,
                    "canalName": this.canalName,
                    "createUser": 0,
                    "status": 1,
                    "siteId": 0,
                    "supplierId": 1,
                }
                console.log(data)

                try{
                    let res=await channelService.addB2bCanalAll(JSON.stringify(data))
                        /*弹出保存成功的提示框*/
                        if (res.data.status.statusCode == 0) {
                            /*_this.saveFrame = true
//                            setTimeout(function () {
//                                _this.saveFrame = false
//                            }, 3000)*/
                            this.$customMessage(" 保存成功","success")
                        } else {
                            console.log(res.data.status.statusReason)
                        }
                        console.log(res)

                }catch(e){
                    console.log(e)
                }

            },


/*            saveChannel(){
                console.log(Boolean(this.canalName))
                if (!this.canalName.replace(/ +/, "")) {
                    this.judgeChannel = true
//                    alert("渠道名称不能为空")
                    return
                }
                let _this = this
                let url = "http://192.168.170.102:7778/b2b-seller-admin/addB2bCanalAll"
                let merchantId = []
                this.B2B_S_CUSTOM.map((item) => {
                    merchantId.push(item.merchantId+"")
                })
                let goodsId = []
                this.B2B_S_BLACKGOODS.map((item) => {
                    goodsId.push(Number(item.goodsId))
                })
                let data = {
                    "b2bCanalMerchantAddVo": {
                        "merchantId": merchantId,
                        "status": 1,
                        "siteId": 0,
                        "supplierId": 1
                    },
                    "b2bCanalStoreAddVo": {
                        "goodId": goodsId,
                        "status": 1,
                        "siteId": 0,
                        "supplierId": 1
                    },
                    "canalDescribe": this.canalDescribe,
                    "canalName": this.canalName,
                    "createUser": 0,
                    "status": 1,
                    "siteId": 0,
                    "supplierId": 1,
                }
                console.log(data)

                try{
                    channelService.add(url, JSON.stringify(data)).then(function (res) {
                        /!*弹出保存成功的提示框*!/
                        if (res.data.status.statusCode == 0) {
                            _this.saveFrame = true
                            setTimeout(function () {
                                _this.saveFrame = false
                            }, 3000)
                        } else {
                            console.log(res.data.status.statusReason)
                        }
                        console.log(res)
                    }).catch(function (err) {
                        console.log(err)
                    })
                }catch (e){
                    console.log(e)
                }
            }*/




        },
        mounted() {

        }
    }
</script>
<style lang="scss" scoped>
    .b2b_channelAdd {
        width: 100%;
        height: 100%;
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
        > span:nth-of-type(1) {
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

</style>

