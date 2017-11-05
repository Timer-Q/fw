<template>
    <div v-if='isCache' class="b2b">
        <Tabs class="temporary-tabs" type="card" v-model="selectTab.tag" @tab-click="tabClick" @tab-remove="removeTab">
            <TabPane label="经销商管理-列表" :key="tag" :name="tag">
                <list-temp></list-temp>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <distribution-dealer :distributionDealerObj="item"></distribution-dealer>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import dealerService from '@B2B/services/substatAdmin/dealerService.js'
    import listTemp from '@B2B/containers/dealer/DealerListContainer.vue'
    import distributionDealer from '@B2B/containers/dealer/DistributionDealerContainer.vue'

    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data(){
            return {
                tag:'b2b_dealer',
                system:'/b2b',
                titleName:'经销商管理',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                }
            }
        },
        components: {
            listTemp,distributionDealer
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
            this.$root.bus.$on('dealerChildTabClose', function(removeTabObj) {
                _this.tabsList.splice(removeTabObj.index,1)
                _this.setSelectTab(removeTabObj.parentTag,0)
                this.$root.bus.$emit('dealerListRefresh')
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
</script>
