<template>
    <div class="tms_dealer">
        <Tabs
            class="temporary-tabs"
            type="card"
            v-model="selectTab.tag"
            @tab-click="tabClick"
            @tab-remove="removeTab"
        >

            <TabPane label="经销商规则设置" :key="tag" :name="tag">

                <!--按钮-->
                <div class="projection">
                    <Button class="public-function-btn" >设置</Button>
                    <Button class="public-function-btn">日志</Button>
                </div>

                <!--下拉框-->
                <div class="dealer_select">
                    <label><b>*</b>经销商名称</label>
                        <Select v-model="value" placeholder="">
                            <Option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></Option>
                        </Select>

                    <label style="margin-left: 8px;">城市</label>
                    <Select v-model="value" placeholder="">
                        <Option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></Option>
                    </Select>

                </div>

                <!--内容-->
                <div class="content">
                    <p class="cont_title">承运商选取规则</p>

                    <div class="cont_s">
                        <p>
                            <Radio label="1" v-model="radio">经销商不指定物流组织</Radio>
                            <span><b>？</b>经销商不指定特定的物流组织，由仓储服务商决定配送服务商</span>
                        </p>
                        <p>
                            <Radio label="2" v-model="radio">经销商指定特定的物流组织</Radio>
                            <span><b>？</b>经销商下单后，由特定的配送服务商执行订单的配送服务</span>
                        </p>
                        <div class="cont_check">
                            <p>
                                <Checkbox v-model="checked">经销商自己配送</Checkbox>
                            </p>
                            <p><i style="color: red">*</i>指定承运商:</p>
                            <Button class="btn_add">添加承运商</Button>
                            <p>承运商选择策略：</p>
                            <div class="btm">
                                <p style="width:400px;">
                                    <Radio label="3" v-model="radio">按优先级分配</Radio>
                                    <span><b>？</b>根据各项指标值得优先级进行自动的分配</span>
                                </p>
                                <p class="compare"><i>优先级设置</i> <span>价格优先</span><strong> > </strong><span>时效优先</span><strong> > </strong><span>信用有优先</span><strong> > </strong><span>距离优先</span></p>
                                <p style=" width:290px;">
                                    <Radio label="4" v-model="radio">按比例分配</Radio>
                                    <span><b>？</b>分配比例进行订单分配</span>
                                </p>
                                <Button class="btn_add">设置分配比例</Button>
                                <p style=" width:312px;">
                                    <Radio label="4" v-model="radio">按顺序分配</Radio>
                                    <span><b>？</b>按照承运商顺序进行订单分配</span>
                                </p>
                                <Button class="btn_add">设置承运商顺序</Button>
                            </div>
                            <p>
                                <Checkbox v-model="checked">当没有指定承运商承运时，允许将订单分配给非指定承运商</Checkbox>
                            </p>

                        </div>

                    </div>
                </div>


            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import tms_twoLevelTabMixins from '@Tms/mixins/twoLevelTabMixins.js'

    export default{
        mixins: [oneLevelTabMixins,tms_twoLevelTabMixins],
        data(){
            return{
                tag:'tms_Dealer',
                system:'/tms',
                selectTab:{
                    tag:'',
                    index:0
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                value: '',
                radio:1,
                checked:false
            }
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)

            // 添加tab
            this.$root.bus.$on('distributionDealerTabAdd', function(addTabObj) {
                if( _this.isExist(addTabObj.tag))return
                addTabObj.parentTag = _this.tag
                addTabObj.index = _this.tabsList.length
                _this.tabsList.push(addTabObj)
                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
            })

            // 关闭tab
            this.$root.bus.$on('childTabClose', function(removeTabObj) {
                _this.tabsList.splice(removeTabObj.index,1)
                _this.setSelectTab(removeTabObj.parentTag,0)
            })
        },
        methods:{
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
</script>

<style>


.tms_dealer .el-input__inner {
        height: 22px !important;
        border-radius: 0;

    }


</style>

<style lang="scss" scoped>
    .projection{
        width:100%;
        height:40px;
        line-height: 40px;
        background: #c9c9c9;

    }

    .dealer_select{
        font-size:14px;
        margin:10px 0 0 10px;
        b{
            color:red;
        }
    }

    .content{
        width:98%;
        height:485px;
        border:1px solid #ccc;
        margin:10px auto;

        .cont_title{
            font-size: 14px;
            background: #ccc;
            width:99.4%;
            height:30px;
            line-height: 30px;
            padding-left: 8px;

        }

    }

    .cont_s{

        p{
            width:605px;
            font-size: 14px;
            padding: 8px 0 0 20px;
        }

        .cont_check{
            padding-left: 85px;
        }

        span{
            float: right;
            font-size: 14px;
        }
        b{
            float: left;
            width:20px;
            height:20px;
            border-radius: 50%;
            display: block;
            background: #000000;
            color:#fff;
            text-align: center;
            line-height: 20px;
            margin-right: 5px;
        }
    }


    .el-select{
        width:100px;
    }

    .btn_add{
        margin:10px 0 0 15px;
    }
    .compare{
        width: 530px;

        i{
            float: left;
            font-size: 14px;
            font-weight: bold;
            margin:10px 8px 0 10px;
        }
        span{
            float: left;
            display: block;
            border:1px solid #ccc;
            width:90px;
            height:35px;
            text-align: center;
            line-height: 35px;
            margin-bottom:5px;
        }

        strong{
            float: left;
            margin: 6px 5px 0 5px;
        }
    }

    .btm{
        margin-left: 38px;
    }
</style>


