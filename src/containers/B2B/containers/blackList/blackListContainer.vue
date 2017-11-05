<template>
    <div v-if='isCache' class="b2b_channelMag">
    <Tabs
        class="temporary-tabs"
        type="card"
        v-model="selectTabCode"
        @tab-remove="removeTab"
    >
        <TabPane label="门店-商品黑名单-列表" :key="tag" :name="tag">

            <!--list列表 -->
            <StoreList v-if="/blackList/.test(tag)"></StoreList>


        </TabPane>
        <TabPane closable v-for="(item,index) in tabsList"
                 :key="item.tag"
                 :label="item.name"
                 :name="item.tag"

        >


        </TabPane>
    </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    import bus from "@B2B/containers/blackList/bus.js"
    import StoreList from "@B2B/containers/blackList/StoreList.vue"
    import "@/asserts/styles/B2B/index.scss"
    export default {
        mixins: [oneLevelTabMixins,twoLevelTabMixins,scrollMixins],
		data: function () {
			return {
                tag:'b2b_blackList',
                system: '/b2b',
                titleName: '商品黑名单'



            }
		},
        components:{
            StoreList,
        },
        created(){


        },
        mounted(){

        },
        methods:{

            removeTab(targetName){
                let tabs = this.tabsList
                let activeName = this.selectTabCode
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.tag === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            activeName = nextTab ? nextTab.tag : this.tag
                        }
                    })
                }
                this.selectTabCode = activeName
                this.tabsList = tabs.filter(tab => tab.tag !== targetName)
            },
            clickByEdit(state){
                let flag = false
                let obj = {
                    name: `${this.titleName}-` + (state == "add" ? "新增" : state == "update" ? "修改" : "详情"),
                    tag: `${this.tag}_` + state
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



        }
	}
</script>
<style scoped lang="scss">

</style>
