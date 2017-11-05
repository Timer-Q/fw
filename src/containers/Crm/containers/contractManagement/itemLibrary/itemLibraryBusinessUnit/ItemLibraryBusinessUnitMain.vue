<template>
    <div v-if="isCache">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="款项库-全局">
                <itemLibraryBusinessUnitList :clickByEdit="clickByEdit"></itemLibraryBusinessUnitList>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.code"
                     :label="item.name"
                     :name="item.code">
                <Button>保存</Button>
                <Button>修改</Button>
                <Button>取消</Button>
            </TabPane>
        </Tabs>
    </div>
</template>
<style>

</style>
<script>

    import {mapState} from 'vuex'
    import itemLibraryBusinessUnitList from '@Crm/containers/contractManagement/itemLibrary/itemLibraryBusinessUnit/ItemLibraryBusinessUnitList.vue'
    export default{

        components: {
            itemLibraryBusinessUnitList
        },
        data(){
            return {
                isCache:true,
                defaultTab: {},
                selectTabCode: "",
                tabsList: []

            }
        },
        computed: {
            ...mapState([
                'navTabData'
            ])
        },
        methods: {
            removeTab(targetName){
                let tabs = this.tabsList
                let activeName = this.selectTabCode
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.code === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            activeName = nextTab ? nextTab.code : this.defaultTab.code
                        }
                    })
                }
                this.selectTabCode = activeName
                this.tabsList = tabs.filter(tab => tab.code !== targetName)
            },
            clickByEdit(state){
                let flag = false
                let obj = {
                    name: "款项库-" + (state == "add" ? "新增" : state == "update" ? "修改" : "详情"),
                    code: "siteAdmin-" + state
                }
                this.selectTabCode = obj.code
                for (let i = 0; i < this.tabsList.length; i++) {
                    if (this.tabsList[i].code == obj.code) {
                        flag = true
                        return
                    }
                }
                if (!flag) {
                    this.tabsList.push(obj)
                }
            }
        },
        mounted(){
            const _this = this
//            console.log('创建了mail组件')
            this.$root.bus.$on('deleteViewSiteAdmin', function (index) {
//                console.log('监听到了删除mail的页签')
                _this.isCache=false
                for(let i=0;i<_this.navTabData.length;i++){
                    if(_this.navTabData[i].active){
                        return
                    }
                }
                const con = _this.navTabData[index-1]||_this.navTabData[index]
                let path = "/Crm"
                if(con){
                    path = con.path
                    con.active=true
                }
                _this.$router.push(path)
//                不能轻易的调用这个方法
//                _this.$destroy()
            })
        },
        activated: function () {
            this.isCache=true
            console.log('siteAdmin的activated')
        },
        deactivated: function () {
            console.log('siteAdmin的deactivated')
        },
        destroyed(){
            console.log('SiteAdmin组件销毁')
        }
    }
</script>
