<template>
    <div v-if='isCache' class="b2b_channelMag">
        <Tabs
            class="temporary-tabs"
            type="card"
            v-model="selectTabCode"
            @tab-remove="removeTab"
            @tab-click="changeTab"
        >
            <TabPane label="渠道类型管理-全部" :key="tag" :name="tag">
            <div class="projection">
                <Button class="public-function-btn" @click="clickByEdit('add')">新增渠道</Button>

                <!--此处的修改按钮应该调用详情页中的修改渠道的方法-->
                <Button class="public-function-btn" @click="changeChannelMsg" :disabled="state">修改</Button>
                <Button class="public-function-btn" :disabled="state" @click="deleteChannel">删除</Button>
                <Button class="public-function-btn" :disabled="state" @click="reflush">刷新</Button>
                <Button class="public-function-btn" :disabled="state">日志</Button>
            </div>
            <!--buttonState用来控制修改删除刷新和日志按钮的状态-->
            <ChannelMagList
                @buttonState="buttonState"
                ref="channelMagList"
            ></ChannelMagList>
        </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag"

            >
                <ChannelAdd
                    :key="item.tag"
                    v-if="/add/.test(item.tag)"

                ></ChannelAdd>
                <ChannelDetail

                    :key="item.tag"
                    v-if="/detail/.test(item.tag)"
                    :channelItem="item"
                ></ChannelDetail>
                <EditChannelDetail
                    v-if="/update/.test(item.tag)"
                    :channelItem="item"
                    ref="listOutBox"
                ></EditChannelDetail>


            </TabPane>
        </Tabs>
    </div>
</template>
<script>

    import "@/asserts/styles/B2B/index.scss"
    import channelService from "@B2B/services/channelService.js"
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
//    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import b2b_twoLevelTabMixins from '@B2B/mixins/twoLevelTabMixins.js'
    import ChannelMagList from "@B2B/containers/channelManagement/ChannelMagList.vue"
    import ChannelAdd from "@B2B/containers/channelManagement/ChannelAdd.vue"
    import ChannelDetail from "@B2B/containers/channelManagement/ChannelDetail.vue"
    import EditChannelDetail from "@B2B/containers/channelManagement/EditChannelDetail.vue"
    export default{
        mixins: [oneLevelTabMixins,b2b_twoLevelTabMixins],
        data(){
            return {
                // 选中的二级tab
                selectTabCode: "",
                // 打开的二级tab集合
                tabsList: [],
                tag:'b2b_channelManagement',
                system:'/b2b',
                titleName:'渠道类型管理',
                state:false,
                removeChannel:false,
            }
        },
        components:{
            ChannelMagList,
            ChannelAdd,
            ChannelDetail,
            EditChannelDetail,
        },
        methods:{

            // 删除二级tab
            /*detailTag详情页标签 detailData详情页数据*/
            removeTab(targetName,detailTag,detailData){
                console.log(targetName, detailTag, detailData)
                let tabs = this.tabsList
                let activeName = this.selectTabCode
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.tag === targetName) {

                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            /*如果detailTag存在,说明是要关掉修改页面并跳转回到之前的详情页面detailData*/
                            activeName = detailTag&&tabs[index-2]?detailTag:nextTab ? nextTab.tag : this.tag
                        }
                    })
                }
                this.selectTabCode = activeName
                this.tabsList = tabs.filter(tab => tab.tag !== targetName)

                if(detailData){

                this.tabsList.forEach(function (item) {

                        if(item.tag==detailTag){
                            console.log(item.tag,555555555555)


                            /*更新渠道信息*/
                            item.channelDetail={...item.channelDetail,...detailData.channelDetail}
//                            console.log(item)

                        }
                    })


                }


                /*关闭标签时重新请求列表数据*/
                if(activeName=="b2b_channelManagement"){
                    console.log(activeName)

                    this.$root.bus.$emit("getDetail")
                }

            },
            // 新增/修改/详情下的跳转
            clickByEdit(state,row,tabDetail){/*row是渠道列表当前行的字段信息*/
                console.log(state,/update/.test(state))
                let flag = false
                let obj = {
                    name: `${row&&row.canalName||this.titleName}-`+  (state == "add" ? "新增" : /update/.test(state)? "修改" : "详情"),
                    tag: `${this.tag}_` + state,
                    channelDetail: row&&row||"",/*渠道详情信息*/
//                    DetailTag:tabDetail&&tabDetail.tag||""
                }
                console.log(obj.tag,obj.name)

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
            deleteChannel(){
                this.$refs.channelMagList.removeChannelVisible=true
            },
            /*点击刷新按钮*/
            reflush(){
                this.$root.bus.$emit("getDetail")
            },
            /*手动切换标签时触发,重新请求渠道信息*/
            changeTab(tab){
                console.log(tab)
                this.$root.bus.$emit("getDetail")

            },
            /*点击修改按钮*/
            changeChannelMsg(){
                console.log(222222222)
                this.$root.bus.$emit("jumpToEditChannel")
            },
        },
        mounted(){
            // 默认为list页
            this.selectTabCode = this.tag
            this.$root.bus.$on("clickByEdit",(state,row,tabDetail,remain)=>{
                this.clickByEdit(state,row,tabDetail,remain)
            })
            this.$root.bus.$on("removeTab",(targetName,detailTag,detailData)=>{
                console.log(targetName, detailTag, detailData)
                this.removeTab(targetName,detailTag,detailData)
            })

        },
        activated: function () {
            this.isCache=true
            console.log('ChannelManagement的activated')
        },
        deactivated: function () {
            console.log('ChannelManagement的deactivated')
        },
        destroyed(){
            console.log('ChannelManagement组件销毁')
        },

    }
</script>
<style lang="scss" scoped>
</style>
