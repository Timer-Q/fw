<template>
    <div class="b2b_channelAdd">
        <div class="projection">
            <Button class="public-function-btn" @click="jumpToOldTab">关闭</Button>
        </div>
        <div ref="OutBox">
            <div class="channelMsg" :class="{close:!closeStyle1}">
                <span @click="closeStyle1=!closeStyle1"><i class="el-icon-d-arrow-left"></i>渠道信息</span>
                <div v-show="closeStyle1">
                    <Button class="public-function-btn" @click="saveChannelMsg">保存</Button>
                    <p>
                        <!--<i>*</i>-->
                        <label>渠道名称</label>
                        <input type="text" :value="canalName">
                    </p>
                    <p>
                        <span><i>{{textNum}}</i>/300</span>
                        <label>渠道描述</label>
                        <textarea cols="30" rows="10"
                                  ref="textarea" v-model="canalDescribe"></textarea>
                    </p>
                </div>

            </div>

            <EditChannelCustom :channelItem="channelItem"></EditChannelCustom>
            <EditBlackGoods :channelItem="channelItem"></EditBlackGoods>

        </div>
    </div>
</template>
<script>
    import screenScrollMixins from '@B2B/mixins/screenScrollMixins.js'
    import EditChannelCustom from "@B2B/containers/channelManagement/EditChannelCustom.vue"
    import EditBlackGoods from "@B2B/containers/channelManagement/EditBlackGoods.vue"
    import channelService from "@B2B/services/channel/channelService"

    export default {
        mixins: [screenScrollMixins],
        props: ["channelItem"],
        components: {
            EditChannelCustom,
            EditBlackGoods,
        },
        data() {
            return {
                test: '',
                formInline: {
                    region: "",
                    user: "",
                },
                data: [],
                trueTableData: [],
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                multipleSelection: [],
                currentPage4: 4,
                dialogVisible: false,
                closeStyle1: true,
                closeStyle2: true,
                closeStyle3: true,

                canalName: "",
                canalDescribe: "",
                canalId:"",

            }
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
        },
        created() {
//            this.copyChannelDetail = JSON.parse(JSON.stringify(this.channelItem))
            console.log(this.channelItem)
            this.getChannelDetail()



        },
        updated() {

        },
        methods: {
            async getChannelDetail(){
                /*此方法是通过渠道的id获取渠道的所有信息*/
                console.log(this.channelItem)
                this.canalId=this.channelItem.channelDetail.id
//                let url="http://192.168.170.102:7778/b2b-seller-admin/getB2bCanalById"+"/"+this.canalId
                try{
                    let res=await channelService.getB2bCanalById(this.channelItem.channelDetail)
                    console.log(res,this.canalId)
                    if(res.data.status.statusCode==0){
                        this.canalName=res.data.result.canalName
                        this.canalDescribe=res.data.result.canalDescribe
                    }else{
                        console.log(res.data.status.statusReason)
                    }
                }catch(e){
                    console.log(e)
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            onSubmit() {

            },
            addCustomer() {

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done()
                    })
                    .catch(_ => {
                    })
            },
            /*保存渠道名称和渠道描述*/
            async saveChannelMsg() {
//                let url = "http://192.168.170.102:7778/b2b-seller-admin/updateB2bCanal"
                let data = {
                    "canalDescribe": this.copyChannelDetail.channelDetail.canalName,
                    "canalName": this.copyChannelDetail.channelDetail.canalDescribe,
                    "id": this.channelItem.channelDetail.id,
                }
                try {
                    let res = await channelService.updateB2bCanal(data)
                    console.log(res)
                    if (res.data.status.statusCode == 0) {
                        console.log("保存成功")
                    } else {
                        console.log(res.data.status.statusReason)
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            /*点击关闭跳转到详情tab页*/
            jumpToOldTab() {
                console.log(this.channelItem)

                let currentTag = this.channelItem.tag
                let OldTag = this.channelItem.tag.replace("update", "detail")

                /*把修改页tag信息,详情页tag信息,渠道信息汇总到父组件container中*/
                this.$root.bus.$emit("removeTab", currentTag, OldTag, 1)
//                this.$root.bus.$emit("test",this.copyChannelDetail)
            },
        }

    }
</script>
<style lang="scss" scoped>
    /*.b2b_channelAdd {
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
        & span:nth-of-type(1) {
            margin-right: 10px;
            color: #40afe7;
            & i:nth-of-type(1) {
                transform: rotate(90deg) scaleY(0.8);
                font-size: 10px;
                margin-right: 10px;

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
            height: 80px;
            min-width: 400px;
            max-width: 400px;
        }
        & p:nth-of-type(1) {
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
        & p:nth-of-type(2) {
            margin-bottom: 5px;
        }

    }

    .channelCum {
        padding-bottom: 60px;
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
    }*/
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

