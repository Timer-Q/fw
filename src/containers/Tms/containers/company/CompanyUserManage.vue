<template>
    <div v-if="isCache" class="pay company-user-manage">
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="企业用户管理-列表" :key="tag" :name="tag">
                <div class="projection">
                    <Button class="public-function-btn" @click="clickByEdit('add')">企业进件</Button>
                    <ButtonGroup>
                        <Button class="public-function-btn">启用</Button>
                        <Button class="public-function-btn">停用</Button>
                    </ButtonGroup>
                    <Button class="public-function-btn">刷新</Button>
                </div>
                <CompanyUserManageList />
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <CompanyDetails />
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
import { mapState } from 'vuex'
import CompanyUserManageList from './CompanyUserManageList'
import CompanyDetails from './companyDetails/CompanyDetails'

export default {
    name: 'CompanyUserManage',
    mixins: [oneLevelTabMixins, twoLevelTabMixins],
    components: {
        CompanyUserManageList,
        CompanyDetails
    },
    data() {
        return {
            tag: 'pay_companyUserManage',
            system: '/pay',
            titleName: '企业用户管理'
        }
    }
}

</script>
