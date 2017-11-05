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
                width: 240px;
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
        .el-select {
            margin-right: 6px;
        }
        .el-input {
            width: 50px;
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
            <div class="m-modules-line f-clearfix" v-for="(item, index) in form" :key="item.id">
                <div class="m-logo f-l">
                    <img :src="form[index].channelLogo"/>
                    <span>{{form[index].channelName}}</span>
                </div>
                <div class="m-business-number f-l">
                    <Input
                        class="u-modules-input"
                        :maxlength="32"
                        v-model="form[index].channelSn"
                    />
                </div>
                <div class="m-rate f-l">
                    <Select
                        class="u-modules-select"
                        v-model="form[index].channelFeeType"
                        @change="check[index].isShow = false"
                    >
                        <Option value="0" label="百分比"></Option>
                        <Option value="1" label="固定值"></Option>
                    </Select>
                    <Input
                        class="u-modules-input"
                        v-model="form[index].channelFeeValue"
                        placeholder="请输入大于等于0的数字"
                        style="width: 160px;"
                        @focus="check[index].isShow = false"
                    />
                    <!--0为百分比，显示%-->
                    <span class="u-symbol">{{ form[index].channelFeeType === '0' ? '%' : '元' }}</span>
                </div>
                <span class="u-must-tips" v-show="check[index].isShow">{{ check[index].title }}</span>
            </div>
            <Button class="u-modules-step-btn" @click="prevStep">上一步</Button>
            <Button class="u-modules-step-btn" @click="nextStep">下一步</Button>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/company.js'

    export default {
        name: 'PayChannelInfo',
        data() {
            return {
//                修改后要提交的数据
                form: [],
//                表单验证
                check: []
            }
        },
        methods: {
            prevStep() {
                this.$emit('clickStep', ['baseInfo', 1])
            },
            nextStep() {
//                检查非空
                const isPassCheckBlank = this.checkBlank()
//                if (!isPassCheckBlank) return
//                检查合法性
                const isPassCheckRule = this.checkRule()
//                if (!isPassCheckRule) return
                this.$store.commit('Pay_COMPANY_M_PAYCHANNELINFO', this.form)
                this.$emit('clickStep', ['openAccountInfo', 3])
            },
            checkBlank() {
                let isPass = true
                this.form.forEach((item, index) => {
                    if (!item.channelFeeValue) {
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
                    if (item.channelFeeType === '1') {
                        if (!this.check[index].numRule.test(item.channelFeeValue)) {
                            this.check[index].isShow = true
                            this.check[index].title = '金额的最小单位为分'
                            isPass = false
                        }
                    }
//                    0位百分比
                    if (item.channelFeeType === '0') {
                        if (!this.check[index].floatRule.test(item.channelFeeValue)) {
                            this.check[index].isShow = true
                            this.check[index].title = '最高不超过5%(如果有小数点，小数点后不超过两位)'
                            isPass = false
                        }
                    }
                })
                return isPass
            },
            async listTwoLevelChannelInfo() {
                try {
                    const {data} = await $http.listTwoLevelChannelInfo()
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                        复制一份数据
                        this.form = result.concat()
                        for (let item of this.form) {
//                            将所有的渠道费率默认选成百分比
                            item.channelFeeType = '0'
                        }
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
            }
        },
        created() {
//            获取所有可配置的二级渠道
            this.listTwoLevelChannelInfo()
        }
    }
</script>
