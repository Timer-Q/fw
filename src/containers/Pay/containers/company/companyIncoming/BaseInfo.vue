<style lang='scss' scoped>
    .m-modules-line:first-child {
        position: relative;
    }
    .u-modules-label {
        width: 72px;
    }
    .u-modules-step-btn {
        margin-left: 87px;
    }
</style>
<template>
    <div class="base-info m-modules-box">
        <p class="u-modules-title">基本信息</p>
        <div class="m-modules-content base-info-details">
            <div class="m-modules-line">
                <label class="u-modules-label">
                    <span class="u-must-enter">*</span>
                    企业名称
                </label>
                <Input
                    class="u-modules-input"
                    icon="search"
                    v-model="form.companyName"
                    @focus="isShowSmarterTree = true"
                />
                <span class="u-must-tips" v-show="check.companyName.isShow">请选择企业名称</span>
                <div class="u-tree" v-show="isShowSmarterTree">
                    <fw-smarter-tree
                        :enable-filter="true"
                        @labelClick="handleLabelClick"
                        ref="treeGrid"
                        tree-key="id"
                        child-key="childeBUs"
                        :enable-checked-folder="true"
                        :auto-expand-checked-nodes="false"
                        :enable-check="false"
                        prop="orgName"
                    />
                </div>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">企业简称</label>
                <Input
                    class="u-modules-input"
                    :value="organizationInfoValue.orgShortName"
                />
            </div>
            <div class="m-modules-line" v-for="item in organizationInfoList" :key="item.label">
                <label class="u-modules-label">{{item.label}}</label>
                <Input
                    class="u-modules-input"
                    :disabled="item.isDisabled"
                    :value="item.valueKey ? organizationInfoValue[item.valueKey] : ''"
                />
            </div>
            <Button class="u-modules-step-btn" @click="nextStep">下一步</Button>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/company.js'

    export default {
        name: 'BaseInfo',
        data() {
            return {
                isShowLoading: true,
//                控制树组件的显示隐藏
                isShowSmarterTree: false,
//                input列表
                organizationInfoList: [{
                    label: '拓展分公司',
                    isDisabled: true
                }, {
                    label: '所属合作机构',
                    isDisabled: true
                }, {
                    label: '所属行业',
                    isDisabled: true,
                    valueKey: 'industryType'
                }, {
                    label: '企业类型',
                    isDisabled: true,
                    valueKey: 'businessType'
                }, {
                    label: '性质',
                    isDisabled: true,
                    valueKey: 'companyName'
                }, {
                    label: '邮箱',
                    isDisabled: true,
                    valueKey: 'email'
                }, {
                    label: '联系人',
                    isDisabled: true
                }, {
                    label: '联系电话',
                    isDisabled: true,
                    valueKey: 'phone'
                }, {
                    label: '详细地址',
                    isDisabled: true,
                    valueKey: 'addressDetail'
                },],
                form: {
                    companyName: ''
                },
//                用户选择的企业的id
                companySn: '',
                check: {
                    companyName: {
                        isShow: false
                    }
                },
//                获取到的企业信息
                organizationInfoValue: {}
            }
        },
        methods: {
            handleLabelClick(checkedTreeInfo) {
//                如果不是最后一级，不去请求数据
                if (checkedTreeInfo.$extra.childsNum !== 0) return
                this.form.companyName = checkedTreeInfo.orgName
//                获取用户选择的企业的详细信息
                this.queryOrganizationById({id: checkedTreeInfo.id})
//                隐藏树组件
                this.isShowSmarterTree = false
            },
            nextStep() {
//                检查非空
//                for (let key in this.form) {
//                    if (!this.form[key]) {
//                        this.check[key].isShow = true
//                        return
//                    }
//                }
//                通过非空检查，跳到下一步
                this.$emit('clickStep', ['payChannelInfo', 2])
            },
            async likeQueryOrgTree() {
                try {
                    const {data} = await $http.multipleOrgTreeQuery({
                        orgName: '单元'
                    })
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.$refs.treeGrid.refreshTreeTable(result)
                    } else {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: status.statusReason,
                            type: 'error'
                        }])
                    }
                } catch (err) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '数据请求失败，请重试',
                        type: 'error'
                    }])
                }
            },
            async queryOrganizationById(paramater) {
                try {
                    const {data} = await $http.queryOrganizationById(paramater)
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.$store.commit('Pay_COMPANY_M_ORGANIZATIONINFO', result)
//                        渲染信息列表
                        this.organizationInfoValue = {...result}
                    } else {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: status.statusReason,
                            type: 'error'
                        }])
                    }
                } catch (err) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '数据请求失败，请重试',
                        type: 'error'
                    }])
                }
            }
        },
        created() {
//            获取所有的树状图数据
            this.likeQueryOrgTree()
        }
    }
</script>
