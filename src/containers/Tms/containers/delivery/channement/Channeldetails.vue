<template>
    <div class="tms_channelAdd">
        <div class="projection">

            <ButtonGroup>
                <Button class="public-function-btn" @click="jumpRevise">修改</Button>
                <Button class="public-function-btn" @click="delRoute">删除</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button class="public-function-btn" @click="updataRouteState">停用</Button>
                <Button class="public-function-btn" @click="updataRouteState">启用</Button>
            </ButtonGroup>

        </div>
        <div ref="OutBox">
            <div class="channelMsg " ref="channelMsg">
                <p>
                    <label>线路名称</label>
                    <input type="text" style="background: #fff;" placeholder="请输入线路名称" v-model="detail.data.result.routeName" disabled="">
                    <span v-show="judgeChannel" style="color:red">线路名称不能为空</span>
                </p>
                <p>
                    <span><i>{{textNum}}</i>/100</span>
                    <label>　　备注</label>
                    <textarea rows="10" cols="30" ref="textarea" v-model="canalDescribe" disabled style="background: #fff;"></textarea>
                </p>
            </div>

            <div class="eltabs">
                <p>覆盖区域</p>
            </div>

            <div class="btabs">


                <Table
                    border
                    slot="empty"
                    style="width: 720px; margin-left:10px;" :highlight-current-row="true"
                    :data="detail.data.result.roads"
                    >
                    <TableColumn  align="center" type="index" label="序号" ></TableColumn>
                    <TableColumn  align="center" prop="coverArea" label="覆盖区域" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="coverType" label="覆盖类型" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="numberType" label="号码类型" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="roadName" label="道路名称" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="startNum" label="起始号码" width="90"  sortable></TableColumn>
                    <TableColumn  align="center" prop="endNum" label="结束号码" width="90"   sortable></TableColumn>
                    <TableColumn  align="center" prop="siteNum" label="站点号"  sortable></TableColumn>

                </Table>
            </div>


        </div>



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
        props:["detail"],
        data() {
            return {
                canalDescribe: "",
                status: 1,
                data: [],
                judgeChannel: false,
                saveFrame: false,
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

            //删除线路
            delRoute(){
                try {
                    this.$confirm('确认删除该线路？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(this.detail.data.result.routeState){
                            this.$message("线路已启用,不可删除")
                        }else{
                            const data = {
                                "companyId":1,
                                "list": [{
                                    "id":this.detail.data.result.routeId,
                                    "companyId":1 ,
                                    "routeName": this.detail.data.result.routeName,
                                    "updateUser":1
                                }]
                            }
                            service.delRoterList(data).then((data) =>{
                                if(data.data.result){
                                    this.$emit("refresh","tms_channement_detail"+this.update.data.result.routeId)
                                    this.$message("删除成功")
                                }else{
                                    this.$message("删除失败")
                                }
                            },function (e) {
                                console.log(e)
                            })

                        }
                    },() =>{
                        //console.log("取消")
                    })
                }
                catch (e) {
                    console.log(e)
                }
            },//更改线路状态
            updataRouteState(e) {
                const state = e.target.innerText
                const judgeState = this.detail.data.result.routeState ? "启用" : "停用"
                if (state != judgeState) {
                    this.$confirm("确定" + state + "该线路？", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let list = []
                        const routeState = state == "启用" ? true : false
                        service.updataRouteState({
                            "companyId": 1,
                            "routeIds": [this.detail.data.result.routeId],
                            "routeState": routeState,
                            "updateUser": 1
                        }).then((data) => {
                            if (data) {
                                this.detail.data.result.routeState=!this.detail.data.result.routeState
                                this.$message("已" + state)
                            } else {
                                this.$message("请求失败")
                            }
                        }, () => {
                            this.$message("请求失败")
                        })
                    }).catch(() => {
                        console.log("取消")
                    })
                }else {
                    this.$message("该线路已" + state + "，不能重复操作")
                }
            },
            jumpRevise (){
                this.$emit("refresh","tms_channement_detail"+this.detail.data.result.routeId)
                this.$emit("jumper","update"+this.detail.data.result.routeId)
            }
        },
        mounted() {

            //文本框内容
            this.canalDescribe=this.detail.data.result.remarks

        }
    }
</script>
<style lang="scss" scoped>


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

