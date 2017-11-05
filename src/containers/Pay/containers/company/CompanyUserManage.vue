<template>
    <div v-if="isCache" class="pay company">
        <Toast/>
        <Tabs class="temporary-tabs" v-model="selectTabCode" type="card" @tab-remove="removeTab">
            <TabPane label="企业用户管理-列表" :key="tag" :name="tag">
                <div class="projection">
                    <Button class="public-function-btn" @click="clickByEdit(['incoming'])">企业进件</Button>
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="$root.bus.$emit('pay_company_start')">启用
                        </Button>
                        <Button class="public-function-btn" @click="$root.bus.$emit('pay_company_stop')">停用
                        </Button>
                    </ButtonGroup>
                    <Button class="public-function-btn" @click="$root.bus.$emit('pay_company_exportData')">
                        导出
                    </Button>
                    <Button class="public-function-btn" @click="$root.bus.$emit('pay_company_exportAllData')">
                        全部导出
                    </Button>
                    <Button class="public-function-btn" @click="$root.bus.$emit('pay_company_refresh')">刷新</Button>
                </div>
                <CompanyUserManageList @pay_company_trrigerEdit="clickByEdit"></CompanyUserManageList>
            </TabPane>
            <TabPane closable v-for="(item,index) in tabsList"
                     :key="item.tag"
                     :label="item.name"
                     :name="item.tag">
                <!--控制企业进件与详情的显示隐藏-->
                <CompanyIncoming v-if=/incoming/.test(item.tag)></CompanyIncoming>
                <CompanyDetails v-else :currentRowInfo="item.currentRowInfo"></CompanyDetails>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins'
    import {mapState} from 'vuex'
    import CompanyUserManageList from './CompanyUserManageList'
    import CompanyDetails from './companyDetails/CompanyDetails'
    import CompanyIncoming from './companyIncoming/CompanyIncoming'
    import Toast from '@Pay/components/Toast'
    import $http from '@Pay/services/company'

    export default {
        name: 'CompanyUserManage',
        mixins: [oneLevelTabMixins, twoLevelTabMixins],
        components: {
            CompanyUserManageList,
            CompanyDetails,
            CompanyIncoming,
            Toast
        },
        data() {
            return {
                tag: 'pay_companyUserManage',
                system: '/pay',
                titleName: '企业用户管理',
                newCurrentRowInfo: {},
                isUpdatePayChannelInfoSuccess: false,
                isUpdateOpenAccountInfoSuccess: false
            }
        },
        methods: {
//        修改默认mixin方法
            async clickByEdit([state, currentRowInfo]) {
                let flag = false
                let obj = {}
                let id = ''
//                根据currentRowInfo的id获取被查看行的最近数据
                if (currentRowInfo) {
                    try {
                        const {data} = await $http.queryCompanyOpenAccountInfoById({
                            id: currentRowInfo.id
                        })
                        const {result, status} = data
                        if (status.statusCode === 0) {
                            this.newCurrentRowInfo = {...result}
                        } else {
                            this.$message({
                                message: '数据请求失败，请重试',
                                duration: 2000,
                                type: 'error',
                                customClass: 'pay-company-error-message'
                            })
                        }
                    } catch (err) {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: '数据请求失败，请重试',
                            type: 'error'
                        }])
                    }
                    if (this.newCurrentRowInfo) {
                        obj.currentRowInfo = {...this.newCurrentRowInfo}
                        id = this.newCurrentRowInfo.id
                    }
                }
                obj.name = state === 'incoming' ? '企业进件' : `${this.titleName}-${state}`
                obj.tag = id ? `${this.tag}_${state}_${id}` : `${this.tag}_${state}`
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
            }
        },
        created() {
//            监听支付渠道信息修改成功
            this.$root.bus.$on('pay_company_update_payChannelInfo_success', ([id]) => {
                this.isUpdatePayChannelInfoSuccess = true
//                判断开户信息是否也修改成功
                if (this.isUpdateOpenAccountInfoSuccess) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '用户信息修改成功',
                        type: 'success'
                    }])
                    this.removeTab(`${this.tag}_详情_${id}`)
                }
            })
//            监听开户信息修改成功
            this.$root.bus.$on('pay_company_update_openAccountInfo_success', ([id]) => {
                this.isUpdateOpenAccountInfoSuccess = true
//                判断支付渠道信息是否也修改成功
                if (this.isUpdatePayChannelInfoSuccess) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '用户信息修改成功',
                        type: 'success'
                    }])
                    this.removeTab(`${this.tag}_详情_${id}`)
                }
            })
//            监听企业进件成功
            this.$root.bus.$on('pay_company_add_openAccountInfo_success', () => {
                this.$root.bus.$emit('pay_showToast', [{
                    message: '企业进件申请成功',
                    type: 'success'
                }])
                this.removeTab(`${this.tag}_incoming`)
            })
        }
    }

</script>
