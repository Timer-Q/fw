<template>
    <div v-if='isCache' class="b2b">
        <Tabs class="temporary-tabs" type="card" v-model="selectTab.tag" @tab-click="tabClick" @tab-remove="removeTab">
            <TabPane label="商品发布-列表" :key="tag" :name="tag">
                <tabs-temp></tabs-temp>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <update-tab-temp :id="id" :state="state"></update-tab-temp>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import tabsTemp from '@B2B/containers/goodsRelease/GoodsReleaseTabsContainer.vue'
    import updateTabTemp from '@B2B/containers/goodsRelease/GoodsUpdateTabContainer.vue'

    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data(){
            return {
                tag:'b2b_goodsRelease',
                system:'/b2b',
                titleName:'商品发布',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                },
                id:'',
                state:''
            }
        },
        components: {
            tabsTemp,
            updateTabTemp
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)

            // 添加tab
            this.$root.bus.$on('goodsReleaseTabAdd', function(addTabObj) {
                if( _this.isExist(addTabObj.tag))return
                addTabObj.parentTag = addTabObj.parentTag||_this.tag
                addTabObj.index = _this.tabsList.length
                _this.tabsList.push(addTabObj)
                _this.setSelectTab(addTabObj.tag,_this.tabsList.length)
                _this.id = addTabObj.id
                _this.state = addTabObj.state
            })

            // 关闭tab
            this.$root.bus.$on('goodsReleaseTabClose', function(removeTabObj) {
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
</script>
