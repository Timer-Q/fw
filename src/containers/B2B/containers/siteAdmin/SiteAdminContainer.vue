<template>
    <div v-if="isCache">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="站点管理-列表" :key="tag" :name="tag">
                <div class="projection">
                <ButtonGroup>
                    <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
                    <Button class="public-function-btn" @click="clickByEdit('update')">修改</Button>
                    <Button class="public-function-btn">删除</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button class="public-function-btn">启用</Button>
                    <Button class="public-function-btn">停用</Button>
                </ButtonGroup>
                <Button class="public-function-btn">刷新</Button>
                <Button class="public-function-btn">日志</Button>
            </div>
                <list-temp></list-temp>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
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

    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    import listTemp from '@B2B/containers/siteAdmin/SiteAdminListContainer.vue'
    export default{
        mixins: [oneLevelTabMixins,twoLevelTabMixins],
        data(){
            return {
                tag:'b2b_siteAdmin',
                system:'/b2b',
                titleName:'站点管理'
            }
        },
        components: {
            listTemp
        },
        mounted(){
        }
    }
</script>
