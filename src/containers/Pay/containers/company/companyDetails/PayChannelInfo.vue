<style lang='scss' scoped>
    .m-title-box {
        margin-bottom: 16px;
        p {
            float: left;
            text-align: center;
            font-size: 14px;
            color: #666;
            &:nth-child(1) {
                width: 142px;
                text-align: left;
            }
            &:nth-child(2) {
                width: 200px;
                margin-right: 50px;
            }
            &:nth-child(3) {
                width: 150px;
                margin-right: 50px;
            }
        }
    }

    .m-logo {
        width: 142px;
        height: 30px;
        line-height: 30px;
        img {
            display: inline-block;
            width: 22px;
            height: 22px;
            vertical-align: middle;
        }
        span {
            font-size: 12px;
            color: #333;
        }
    }

    .m-business-number {
        margin-right: 50px;
        .el-input {
            width: 200px;
        }
    }

    .m-rate {
        .el-input {
            width: 50px;
        }
        .u-input-rate-type {
            width: 80px;
        }
        .u-symbol {
            font-size: 12px;
            color: #333;
        }
    }
</style>
<template>
    <div class="pay-channel-info m-modules-box">
        <p class="u-modules-title">支付渠道信息</p>
        <div class="m-modules-content f-clearfix">
            <div class="m-title-box f-clearfix">
                <p>支付渠道</p>
                <p>渠道商户号</p>
                <p>渠道费率</p>
            </div>
            <div class="m-modules-line f-clearfix" v-for="(item, index) in payMethodList" :key="item.id">
                <div class="m-logo f-l">
                    <img :src="item.channelLogo"/>
                    <span>{{ item.channelName }}</span>
                </div>
                <div class="m-business-number f-l">
                    <Input
                        class="z-input-readonly u-modules-input"
                        readonly
                        :value="item.merchantSn"
                    />
                </div>
                <div class="m-rate f-l">
                    <!--详情-->
                    <template v-if="!change">
                        <Input
                            class="z-input-readonly u-input-rate-type u-modules-input"
                            :value="item.rateType === '0' ? '百分比' : '固定值'"
                            readonly
                        />
                        <Input
                            class="z-input-readonly u-modules-input"
                            :value="item.rateValue"
                            readonly
                        />
                        <span class="u-symbol">{{ item.rateType === '0' ? '%' : '元' }}</span>
                    </template>
                    <!--修改-->
                    <template v-else>
                        <Select
                            class="u-modules-select"
                            v-model="form[index].rateType"
                            @change="check[index].isShow = false"
                        >
                            <Option value="0" label="百分比"></Option>
                            <Option value="1" label="固定值"></Option>
                        </Select>
                        <Input
                            class="u-modules-input"
                            @focus="check[index].isShow=false"
                            v-model="form[index].rateValue"
                        />
                        <span class="u-symbol">{{ form[index].rateType === '0' ? '%' : '元' }}</span>
                        <span class="u-must-tips" v-show="check[index].isShow">{{ check[index].title }}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/company.js'

    export default {
        name: 'PayChannelInfo',
        props: ['currentRowInfo', 'change'],
        data() {
            return {
//                详情渲染的数据
                payMethodList: [],
//                修改后要提交的数据
                form: [],
//                表单验证
                check: []
            }
        },
        methods: {
            checkBlank() {
                let isPass = true
                this.form.forEach((item, index) => {
                    if (!item.rateValue) {
                        isPass = false
                        this.check[index].isShow = true
                        this.check[index].title = '请输入渠道费率'
                    }
                })
                return isPass
            },
            checkRule() {
                let isPass = true
                this.form.forEach((item, index) => {
//                    1为固定值
                    if (item.rateType === '1') {
                        if (!this.check[index].numRule.test(item.rateValue)) {
                            this.check[index].isShow = true
                            this.check[index].title = '金额的最小单位为分'
                            isPass = false
                        }
                    }
//                    0位百分比
                    if (item.rateType === '0') {
                        if (!this.check[index].floatRule.test(item.rateValue)) {
                            this.check[index].isShow = true
                            this.check[index].title = '最高不超过5%(如果有小数点，小数点后不超过两位)'
                            isPass = false
                        }
                    }
                })
                return isPass
            },
            async renderPayMethodList() {
                try {
                    const {data} = await $http.queryCompanyChannel({
                        accountSn: this.currentRowInfo.accountSn
                    })
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.payMethodList = [...result]
                        this.form = this.payMethodList.concat()
                        for (let item of this.form) {
                            this.check.push({
                                isShow: false,
                                title: '',
                                floatRule: /^\d(\.[0-9]{1,2})?$/,
                                numRule: /^\d+(\.[0-9]{1,2})?$/
                            })
                        }
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
            async updateCompanyChannel() {
                try {
                    const { data } = await $http.updateCompanyChannel([...this.form])
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.$root.bus.$emit('pay_company_update_payChannelInfo_success', [this.currentRowInfo.id])
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
            this.renderPayMethodList()
//            监听保存按钮的点击
            this.$root.bus.$on('pay_companyDetails_save', () => {
//                检查非空
                const isPassCheckBlank = this.checkBlank()
                if (!isPassCheckBlank) return
//                检查合法性
                const isPassCheckRule = this.checkRule()
                if (!isPassCheckRule) return
//                更新支付渠道信息
                this.updateCompanyChannel()
            })
        }
    }
</script>
