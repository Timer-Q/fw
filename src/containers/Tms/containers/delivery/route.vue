<template>
    <div v-if='isCache' class="tms_channelMag">
        <Tabs
            class="temporary-tabs"
            type="card"
            v-model="selectTabCode"
            @tab-remove="removeTab"
        >
            <TabPane label="派送线路" :key="tag" :name="tag">
                <div class="projection">
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
                         <Button class="public-function-btn" @click="deleteChannel">删除</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="updataRouteState">启用</Button>
                        <Button class="public-function-btn" @click="updataRouteState">停用</Button>
                    </ButtonGroup>
                        <Button class="public-function-btn" >导出</Button>
                        <Button class="public-function-btn">日志</Button>
                </div>

                <ChannelMagList
                    ref="magList"
                    @addChannel="clickByEdit"
                    @buttonState="buttonState"
                    @getVal='getVal'
                    @deleteChannel="deleteChannel"
                    @updataRouteState="updataRouteState"
                ></ChannelMagList>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag"
            >
                <!--修改-->
                <Channelrevise
                    :key="item.tag"
                    v-if="/update/.test(item.tag)"
                    :update="item.detail"
                    @refresh="refresh"
                >
                </Channelrevise>

                <!--添加-->
                <ChannelAdd
                    :key="item.tag"
                    v-if="/add/.test(item.tag)"
                    @removeChangeTab="removeTab"
                    @refresh="refresh"
                ></ChannelAdd>

                <!--詳情-->
                <Channeldetail
                    :key="item.tag"
                    v-if="/detail/.test(item.tag)"
                    :detail="item.detail"
                    @refresh="refresh"
                    @jumper="jumper"
                >
                </Channeldetail>

            </TabPane>
        </Tabs>
        <div class="delState">{{delState}}</div>
    </div>
</template>
<script>
    import service from "@Tms/services/channelService.js"
    import "@/asserts/styles/Tms/newly.scss"
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import tms_twoLevelTabMixins from '@Tms/mixins/twoLevelTabMixins.js'
    import ChannelMagList from "@Tms/containers/delivery/channement/ChannelMagList.vue"//列表
    import ChannelAdd from "@Tms/containers/delivery/channement/ChannelAdd.vue"//添加
    import Channelrevise from "@Tms/containers/delivery/channement/Channelrevise.vue"//修改
    import Channeldetail from "@Tms/containers/delivery/channement/Channeldetails.vue"//詳情
    export default{
        mixins: [oneLevelTabMixins,tms_twoLevelTabMixins],
        data(){
            return {
                // 打开的二级tab集合
                tabsList: [],
                tag:'tms_channement',
                system:'/tms',
                titleName:'派送线路',
                state:true,
                val:'',
                removeChannelVisible:false,
                delState:'',
                tipTime:3000
            }
        },
        components:{
            ChannelMagList,//表格
            ChannelAdd,//添加
            Channelrevise,//修改
            Channeldetail
        },
        methods:{

            // 删除二级tab
            /*detailTag详情页标签 detailData详情页数据*/
            removeTab(targetName,detailTag,detailData){
                let tabs = this.tabsList
                let activeName = this.selectTabCode
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.tag === targetName) {

                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            /*如果detailTag存在,说明是要关掉修改页面并跳转回到之前的详情页面detailData*/
                            activeName = detailTag?detailTag:nextTab ? nextTab.tag : this.tag
                        }
                    })
                }
                this.selectTabCode = activeName
                this.tabsList = tabs.filter(tab => tab.tag !== targetName)

                if(detailData){

                    this.tabsList.forEach(function (item) {

                        if(item.tag==detailTag){
                            /*更新渠道信息*/
                            item.channelDetail={...item.channelDetail,...detailData.channelDetail}

                        }
                    })


                }
            },
            clickByEdit(state,row,data){
                let flag = false
                let obj = {
                    name: `${row&&row.routeCode||this.titleName}-` + (state == "add" ? "新增" : /update/.test(state)? "修改" : "详情"),
                    tag: `${this.tag}_` + state,
                    detail:data
                }
                this.selectTabCode = obj.tag
                for (let i = 0; i < this.tabsList.length; i++) {
                    if (this.tabsList[i].tag == obj.tag) {
                        flag = true
                        return
                    }
                }
                if (!flag) {
                    this.tabsList.push(obj)
                }
            },

            buttonState(state){
                this.state=state
            },
            /*点击删除按钮*/
            async deleteChannel(){
                try {
                    if(this.val!=''){
                        let state = true
                        for(let i=0;i<this.val.length;i++){
                            if(this.val[i].routeState=="启用"){
                                state = false
                                break
                            }
                        }
                        if(state){
                            this.$confirm('是否删除选中线路', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                const list=[]
                                this.val.forEach(function(item,index){
                                    list.push({
                                        "id":item["id"],
                                        "companyId":1 ,
                                        "routeName": item["routeName"],
                                        "updateUser":1
                                    })
                                })
                                const data = {
                                    "companyId":1,
                                    "list": list
                                }
                                service.delRoterList(data).then((data)=>{
                                    if(data.data.result){
                                        this.$refs.magList.showData()
                                        this.triggerTip("删除成功",this.tipTime)
                                    }else{
                                        this.triggerTip("删除失败",this.tipTime)
                                    }
                                },function(){
                                    this.triggerTip("删除失败",this.tipTime)
                                })
                            }).catch(() => {
                                console.log("取消")
                            })
                        }else{
                            this.triggerTip("选中的数据包含有启用线路，不能删除！",this.tipTime)
                            this.val.splice(0,this.val.length)
                        }
                    }else{
                        this.triggerTip("请选择要删除的记录！",this.tipTime)
                        return false
                    }
                }
                catch (e){
                    console.log(e)
                }
            },
            //更改线路状态
            async updataRouteState(e){
                const state = e.target.innerText
                const judgeState =state == "启用" ? "停用" : "启用"
                try{
                    if(this.val.length>0){
                        let flag = true

                        this.val.forEach(function(item,index){
                            if(state==item.routeState){
                                flag = false
                            }
                        })
                        if(flag){
                            this.$confirm("确定"+state+"选中线路？", '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let list=[]
                                const routeState = state == "启用"? true : false
                                this.val.forEach(function(item,index){
                                    console.log(item.id)
                                    list.push(item.id)
                                })
                                service.updataRouteState({
                                    "companyId": 1,
                                    "routeIds": list,
                                    "routeState": routeState,
                                    "updateUser": 1
                                }).then((data)=>{
                                    if(data){
                                        this.$refs.magList.showData()
                                        this.triggerTip("已"+state,this.tipTime)
                                    }else{
                                        this.triggerTip("请求失败",this.tipTime)
                                    }
                                },()=>{
                                    this.triggerTip("请求失败",this.tipTime)
                                })
                            }).catch(() =>{
                                console.log("取消")
                            })
                            }else{
                                this.triggerTip("所选线路中线路包含"+state+"线路，不能重复操作",this.tipTime)
                            }
                        }else{
                        this.triggerTip("至少选中一条数据",this.tipTime)
                    }
                }
                catch(e){
                    console.log(e)
                }
            },
            //删除tag刷新列表
            refresh(targetName){
                this.removeTab(targetName)
                this.$refs.magList.showData()
            },
            jumper(targetName){
                this.clickByEdit(targetName)
            },
            getVal(val){
                this.val = val
            },
            triggerTip(text,time){
                let del=document.querySelector(".delState")
                del.style="display:block"
                this.delState=text
                setTimeout(()=>{
                    del.style="display:none"
                },time)
            }
        },
        mounted(){
            // 默认为list页
            this.selectTabCode = this.tag
        }
    }
</script>
<style lang="scss">
    .tms_channelMag{
        .el-dialog__wrapper {
            position: absolute;
            left:50%;
            top:50%;
            transform: translate3d(-50%,-50%,0);
        }
        .el-dialog__header{
            background: #ccc;
        }
        .el-dialog__headerbtn .el-dialog__close{
            color:#000;
            font-size:12px;
        }
        .el-dialog__title{
            color: #000;
        }
        .el-dialog__footer {
            background:#fff;
            margin-top: 55px;

            button{
                background: none;
                border:1px solid #000;
                color: #000;
            }
        }
        .el-dialog--tiny{
            width:50%;
            height: 50%;
        }
    }

    .el-dialog__wrapper{
        z-index:1;
    }

</style>
<style lang="scss" scoped>

    .delState{

        width: 265px;
        height: 74px;
        background-color: rgba(0, 0, 0, 0.588235294117647);
        box-sizing: border-box;
        border:1px solid  rgba(215, 215, 215, 1);
        border-radius: 8px;
        color:#fff;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate3d(-50%,-50%,0);
        display: none;
        line-height: 74px;
        font-size: 14px;
        text-align: center;
        transition:all .5s
    }

    .projection {
        background: #c9c9c9;
    }
</style>
