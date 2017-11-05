<template>
    <div v-if='isCache' class="b2b">
        <Tabs class="temporary-tabs" type="card" v-model="selectTab.tag">
            <TabPane label="品牌管理-列表" :key="tag" :name="tag">
                <list-temp></list-temp>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import listTemp from '@B2B/containers/brand/BrandListContainer.vue'

    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data(){
            return {
                tag:'b2b_commodity',
                system:'/b2b',
                titleName:'商品管理',
                tabsList:[],
                selectTab:{
                    tag:'',
                    index:0
                }
            }
        },
        components: {
            listTemp
        },
        mounted(){
            const _this = this
            this.setSelectTab(this.tag,0)
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
