
<style lang="less" rel="stylesheet/scss" scoped>
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
    .clearfix {
        overflow: hidden;
        clear: both;
    }

    @ydh: rgb(76, 98, 254);
    .ydh {
        color: @ydh;
        text-decoration: underline;
        &:hover {
            color: lighten(@ydh, 20%);
        }
    }
    @groupColor: rgb(137, 153, 169);
    .el-button-group {
        .el-button {
            float: none;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            border-radius: 4px;
            min-width: auto;
            margin-right: 8px;
            padding: 0 16px;
            color: @groupColor;
            border: 1px solid @groupColor;
            background: #ffffff;
            &:hover {
                background: #ffffff;
                color: lighten(@groupColor, 20%);
            }
        }
        .el-button:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        .group-right {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -5px;
        }
    }

    .dataList {
        margin-top: 10px;
    }

    .dispatcherPage a {
        color: #29a7e1;
    }
    .projection{
        background:#c9c9c9;
        padding: 10px 0 10px 20px;
    }
</style>
<template>
    <div v-if='isCache'>
        <el-tabs class="temporary-tabs" type="card" v-model="selectTab.tag" @tab-click="tabClick" @tab-remove="removeTab">
            <el-tab-pane label="派车单列表" :key="tag" :name="tag">
                <mag-list></mag-list>
            </el-tab-pane>
            <el-tab-pane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <add-magList v-if="item.state=='add'" :tabMessage="item"></add-magList>
                <modify-mag-list v-if="item.state=='update'" :tabMessage="item"></modify-mag-list>
                <details-list v-if="item.state=='detail'" :tabMessage="item"></details-list>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 
    <div v-if='isCache'>
        <el-form :inline="true" ref="form" :model="form" label-width="60px">
            <el-tabs
            class="temporary-tabs"
            type="card"
            v-model="selectTabCode"
            @tab-remove="removeTab"
        >
            <el-tab-pane label="派车单列表" 
             :key="tag" :name="tag"
             >
                <div class="projection">
                    <el-button-group>
                        <el-button @click="clickByEdit('add')">新增派车单</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button @click="clickByEdit('update')">修改</el-button>
                    </el-button-group>
                    <!--配置城配模块，则显示发布按钮，不配置城配模块，则不显示发布按钮  
                    <el-button-group>
                        <el-button @click="dispatchStatusRelease">发布</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button>作废</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button :plain="true" @click="deleteDispatcher()" >删除</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button @click="clickByEdit('toVoidList')">派车单明细</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button>生成卸货单</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button>导出</el-button>
                    </el-button-group>
                </div>

                <MagList
                    ref="msglist"
                    @addChannel="clickByEdit"
                    @buttonState="buttonState"
                    @getVal='getVal'
                    v-on:deleDispatcher="deleteDispatcher"
                    v-on:Charevise="clickByEdit"
                    v-on:Chadetail="clickByEdit"
                    v-on:toVoidList="clickByEdit"
                ></MagList>
            </el-tab-pane>
            <el-tab-pane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag"

            >
                <!--修改 
                <ModifyMagList
                    :key="item.tag"
                    v-if="/update/.test(item.tag)"
                    :update="item.detail"
                    @removeChangeTab="removeTab"
                >
                </ModifyMagList>
                <!--添加 
                <AddMagList
                    :key="item.tag"
                    v-if="/add/.test(item.tag)"
                    @removeChangeTab="removeTab"
                ></AddMagList>

                <!--明细列表 
                <ToVoidList
                    :key="item.tag"
                    v-if="/toVoidList/.test(item.tag)"
                    :detail="item.detail"
                     @removeChangeTab="removeTab"
                >
                </ToVoidList>

                 <!--详情单 
                <DetailsList
                    :key="item.tag"
                    v-if="/detail/.test(item.tag)"
                    :detail="item.detail"
                     @removeChangeTab="removeTab"
                >
                </DetailsList>

            </el-tab-pane>
        </el-tabs>
         </el-form>
        <!--删除确认框 
        <Dialog
            :title="promptTiele"
            :visible.sync="removeChannelVisible"
            size="tiny"
        >
            <span>{{promptContent}}</span>
            <span slot="footer" class="dialog-footer">
                <Button @click="removeChannelVisible=false">取 消</Button>
                <Button type="primary" @click="delsure">确 定</Button>
            </span>
        </Dialog> 

        <div class="delState">{{delState}}</div>
         
    </div>
     -->
</template>
<script>

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import tms_twoLevelTabMixins from '@Tms/mixins/twoLevelTabMixins.js'
    import dispatcher from '@Tms/services/dispatcher/dispatcher.js'

    import ToVoidList from "@Tms/containers/dispatcher/dispatcherList/dispatcherDetailList.vue"//明细列表
    import MagList from "@Tms/containers/dispatcher/dispatcherList/dispatcherMagList.vue"//默认列表
    import AddMagList from "@Tms/containers/dispatcher/dispatcherAdd/dispatcherAdd.vue"//添加列表
    import ModifyMagList from "@Tms/containers/dispatcher/dispatcherAdd/dispatcherModify.vue"//修改
    import DetailsList from "@Tms/containers/dispatcher/dispatcherAdd/dispatcherDetails.vue"//详情

    import '@/asserts/styles/Tms/index.scss'
    
    export default{
        mixins: [oneLevelTabMixins,tms_twoLevelTabMixins],
        data(){
            return {
                tag:'tms_driverManage',
                system:'/tms',
                titleName:'派车单',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                }
            }
        },
        components: {
            // 默认
            MagList,
            // 新增
            AddMagList,
            // 修改
            ModifyMagList,
            // 详情
            DetailsList,
            // 明细
            ToVoidList
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)

            // 添加tab
            this.$root.bus.$on('driverTabAdd', function(addTabObj) {
                if( _this.isExist(addTabObj.tag))return
                addTabObj.parentTag = _this.tag
                addTabObj.index = _this.tabsList.length
                _this.tabsList.push(addTabObj)
                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
            })

            // 关闭tab
            this.$root.bus.$on('driverTabClose', function(removeTabObj) {
                _this.$root.bus.$emit("driverListRefresh")
                _this.tabsList.splice(removeTabObj.index,1)
                _this.setSelectTab(removeTabObj.parentTag,0)

            })
        },
        methods:{

            // 判断tab是否已存在
            isExist(tag){
                return this.tabsList.some((element, index, array)=>{
                    return element.tag==tag
                })
            },

            // tab点击
            tabClick(selTab){
                this.selectTab.index = selTab.index
            },

            // tab关闭按钮
            removeTab(){
                this.tabsList.splice(this.selectTab.index-1,1)
                this.setSelectTab(this.tag,0)
            },

            // 赋值tab选中
            setSelectTab(tag,index){
                this.selectTab.tag = tag
                this.selectTab.index = index
            }
        }
    }

//     export default {
//         mixins: [oneLevelTabMixins,tms_twoLevelTabMixins],
//         data(){
//             return {
//                 // 提示
//                 promptTiele:"",
//                 promptContent:"",
//                  // 打开的二级tab集合
//                 tabsList: [],
//                 tag:'tms_channement',
//                 interfaceData: {},
//                 formData: {},
//                 viewStatus: {
//                     currentPanel: 'all'
//                 },
//                 queryParams: {
//                     selectTime: null
//                 },
//                 form: {
//                     name: '',
//                     region: '',
//                     date1: '',
//                     date2: '',
//                     delivery: false,
//                     type: [],
//                     resource: '',
//                     desc: ''
//                 },
//                 tableDataAll: {
//                     all: [],
//                     notDispatch: [],
//                     dispatched: []
//                 },
//                 isCheckBox: false,
//                 dispatcherData: null,
//                 selectTime: null,
//                 branchId: null,
//                 driverName: '',
//                 batchCode: '',
//                 startCreateTime: '',
//                 endCreateTime: '',
//                 startDispatcherTime: '',
//                 endDispatcherTime: '',
//                 selectTimeItems: [{
//                     value: 0,
//                     label: '制单日期'
//                 }, {
//                     value: 1,
//                     label: '发车日期'
//                 }],
//                 whichDate: true,
//                 status: null,
//                 currentPage: 1,
//                 pageSize: 25,
//                 cllx: [],
//                 // 确认删除
//                  removeChannelVisible:false,
//                  confirmDeletion:false,
//                  delState:'',
//                 //  卸货单
//                 unloadingOrder:false,
//             }
//         },
//         components:{
//             ToVoidList,//明细列表
//             AddMagList,//添加
//             MagList,//默认列表
//             ModifyMagList,//修改
//             DetailsList,//详情
//         },
//         methods: {
//             // 点击发布按钮
//             dispatchStatusRelease(){
//                 //状态等于“未发车”  and  发布状态等于空值或未发布(配置城配模块时添加该判断条件)
//                 if(this.$refs.msglist.dispatcherData){
//                     // 判断发布状态
//                     console.log(this.$refs.msglist.dispatcherData.status)
//                     if(this.$refs.msglist.dispatcherData.status!==5){
//                         this.removeChannelVisible=true
//                         this.promptTiele="发布提示"
//                         this.promptContent="确定发布？"
//                     }else{
//                         this.deleteChannel('发布失败')
//                     }
//                 }else{
//                     this.deleteChannel('至少选中一条')
//                 }
//             },
//              // 删除二级tab
//             /*detailTag详情页标签 detailData详情页数据*/
//             removeTab(targetName,detailTag,detailData){
//                 console.log(targetName, detailTag, detailData)
//                 let tabs = this.tabsList
//                 let activeName = this.selectTabCode
//                 if (activeName === targetName) {
//                     tabs.forEach((tab, index) => {
//                         if (tab.tag === targetName) {

//                             let nextTab = tabs[index + 1] || tabs[index - 1]
//                             /*如果detailTag存在,说明是要关掉修改页面并跳转回到之前的详情页面detailData*/
//                             activeName = detailTag?detailTag:nextTab ? nextTab.tag : this.tag
//                         }
//                     })
//                 }
//                 this.selectTabCode = activeName
//                 this.tabsList = tabs.filter(tab => tab.tag !== targetName)
//                 if(detailData){
//                      this.tabsList.forEach(function (item) {
//                         if(item.tag==detailTag){
//                             /*更新渠道信息*/
//                             item.channelDetail={...item.channelDetail,...detailData.channelDetail}
// //                            console.log(item)

//                         }
//                     })
//                 }
//             },
//             // 添加二级tab
//             clickByEdit(state,row,data){
//                 // 选中项
//                 let dispatcherData=this.$refs.msglist.dispatcherData
//                 let _this=this
//                 let obj = {
//                     name: (state == "add" ? "新增派车单" : /update/.test(state)? "修改" : /toVoidList/.test(state)? "派车单明细":"详情":"发布"),
//                     tag: `${this.tag}_` + state,
//                     detail:data
//                 }
//                  // 保存当前tag
//                 this.selectTabCode = obj.tag
//                 // 判断新增页
//                 if(obj.name=="新增派车单"){
//                     // 判断新增页是否打开
//                     for (let i = 0; i < this.tabsList.length; i++) {
//                         if (this.tabsList[i].tag == obj.tag) {
//                             return
//                         }
//                    }
//                     this.tabsList.push(obj)
//                 }else{
//                     // 判断是否有选中项
//                     if(!dispatcherData){
//                         this.selectTabCode = this.tag
//                         this.deleteChannel('至少选中一条')
//                         return
//                     }
//                     // 显示当前选中单
//                     obj.name=dispatcherData.batchCode+"  "+obj.name
//                     obj.tag=dispatcherData.batchCode+"  "+obj.tag
//                     // 判断当前选中单是否存在
//                     for (let i = 0; i < this.tabsList.length; i++) {
//                         if (this.tabsList[i].name == obj.name) {
//                             return
//                         }
//                     }
//                     // 判断派车单状态是否可以修改
//                     if(dispatcherData.status!==5){
//                         // 重新保存当前tag
//                         this.selectTabCode = obj.tag
//                         this.tabsList.push(obj)
//                     }else{
//                         // 可以生成卸货单
//                         this.unloadingOrder=true
//                         this.selectTabCode = this.tag
//                         this.deleteChannel('已发车，不允许修改！')
//                     }
//                }
//            },
//             buttonState(state){
//                 this.state=state
//             },
//             /*
//              /*点击删除按钮
//             deleteChannel(){
//                 let del=document.querySelector(".delState")
//                 let deldlog=document.querySelector(".el-dialog__wrapper")
//                 console.log(this.val)
//                 if(this.val!=''){
//                     this.val.forEach((item)=>{
//                         if(item.routeState==true){
//                                 setTimeout(function(){//定时器
//                                     del.style="display:none"
//                                 },3000)//设置三千毫秒即3秒

//                             del.style="display:block"
//                            this.delState=`选中的数据包含有启用数据，不能删除！`
//                             this.val.splice(0,this.val.length)
//                             return false
//                         }else{
//                             console.log("keshanchu")
//                             deldlog.style="display:block"
//                         }
//                     })
//                 }else{
//                     setTimeout(function(){//定时器
//                         del.style="display:none"
//                     },3000)//设置三千毫秒即3秒

//                     del.style="display:block"
//                     this.delState=`请选择要删除的记录！`
//                     return false
//                 }
//             },
//             */
//             getVal(val){
//                 this.val = val
//             },
//             // 弹框确认
//             delsure(){
//                 let deldlog=document.querySelector(".el-dialog__wrapper")
//                 deldlog.style="display:none"
//                 this.removeChannelVisible=false
//                 this.confirmDeletion=true
//                 if(this.promptTiele==="删除提示"){
//                      // 删除
//                      this.selectedDispatcher()
//                 }else if(this.promptTiele==="发布提示"){
//                     // 发布
//                     this.releaseDispatcher()
//                 }
               
//             },
//             //删除派车单
//             async selectedDispatcher(){
//                 let _this = this
//                 if(this.confirmDeletion){
//                     const data = await dispatcher.delDispatcher(_this.$refs.msglist.dispatcherData.id)
//                     console.log(data.status)
//                     if (data.status == 200) {
//                         this.deleteChannel("删除成功")
//                     } else {
//                         this.deleteChannel("删除失败")
//                     }
//                 }
//             },
//             //发布派车单
//             async releaseDispatcher(){
//                 let _this = this
//                 if(this.confirmDeletion){

//                     const data = await dispatcher.delDispatcher(_this.$refs.msglist.dispatcherData.id)
//                     console.log(data.status)
//                     if (data.status == 200) {
//                         this.deleteChannel("发布成功")
//                     } else {
//                         this.deleteChannel("发布失败")
//                     }
//                 }
//             },
//             // 判断是否选择派车单
//             deleteDispatcher(){
//                 let _this = this
//                 //如果没有选中
//                 if (!_this.$refs.msglist.dispatcherData) {
//                     this.deleteChannel('请选择要删除的记录！')
//                     return
//                 }
//                 else {
//                     //状态等于“未发车”  and  发布状态等于空值或未发布(配置城配模块时添加该判断条件)
//                    if(_this.$refs.msglist.dispatcherData.status!==5){
//                        this.removeChannelVisible=true
//                        this.promptTiele="删除提示"
//                         this.promptContent="确定删除派车单？"
//                     }
//                    else{ 
//                        // 可以生成卸货单
//                         this.unloadingOrder=true
//                         this.deleteChannel('已发车，不允许删除！')
//                    }
//                 }
//             },
//             // 提示框
//             deleteChannel(str) {
//                 let del=document.querySelector(".delState")
//                 let deldlog=document.querySelector(".el-dialog__wrapper")
//                 setTimeout(function(){//定时器
//                     del.style="display:none"
//                 },3000)//设置三千毫秒即3秒

//                 del.style="display:block"
//                 this.delState=str
//                 return false
//             }
//         },
//         mounted(){
//             // 默认为list页
//             this.selectTabCode = this.tag
//         }
        
//     }



</script>
