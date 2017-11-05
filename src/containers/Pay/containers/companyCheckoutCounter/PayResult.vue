<style lang='scss' scoped>
    @import './common.scss';

    .pay-result {
        @include outBox;
    }

    .title {
        @include titleBox;
    }

    .pay-result-content {
        position: relative;
        height: 204px;
    }

    .result-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 42px;
        .icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 42px;
            height: 42px;
        }
        .result-name {
            margin-left: 58px;
            font-size: 20px;
            color: #666;
        }
        .other-control {
            margin-left: 58px;
            font-size: 12px;
            color: #666;
            span {
                color: #28a7e1;
                cursor: pointer;
            }
            .right-arrow {
                margin-left: 0;
            }
        }
    }
</style>
<template>
    <div class="pay-result">
        <div class="title">
            <span>支付结果</span>
        </div>
        <div class="pay-result-content">
            <div class="result-box">
                <img :src="success" alt="支付成功！" class="icon" v-if="isSuccess">
                <img :src="failure" alt="支付失败！" class="icon" v-else>
                <p class="result-name" v-if="isSuccess">支付成功！</p>
                <p class="result-name" v-else>很抱歉，无法完成付款</p>
                <p class="other-control">
                    <span>{{ reasonContent }}</span>
                    <span @click="nextStep">{{ nextStepContent }}</span>
                    <span class="right-arrow">></span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import success from '@/asserts/images/Pay/checkoutCounter/chenggong.png'
    import failure from '@/asserts/images/Pay/checkoutCounter/shanchuxx.png'

    export default {
        name: 'PayResult',
        data() {
            return {
                success,
                failure,
                isSuccess: true,
//                支付失败原因/支付成功倒计时
                reasonContent: '',
//                下一步操作文字
                nextStepContent: '',
//                倒计时
                countdown: ''
            }
        },
        methods: {
            nextStep() {
                const {statusCode, statusReason} = this.$route.params
                if (statusCode !== 0) {
//                    状态码不为0说明支付失败
                    this.$router.replace({
                        name: 'pay_checkoutCounter_normal'
                    })
                } else {
                    clearInterval(this.countdown)
//                        跳转到进入收银台之前的链接，目前不清楚
                }
            }
        },
        mounted() {
            const {statusCode, statusReason} = this.$route.params
            if (statusCode !== 0) {
//                状态码不为0说明支付失败，显示支付失败图片与文字
                this.isSuccess = false
                this.reasonContent = statusReason
                this.nextStepContent = '请返回'
            } else {
//                状态码为0说明支付成功，显示支付成功图片与文字
                this.isSuccess = true
                let time = 5
                this.countdown = setInterval(() => {
//                    倒计时时间到
                    if (time === 1) {
                        clearInterval(this.countdown)
//                        跳转到进入收银台之前的链接，目前不清楚
                    }
                    this.reasonContent = `${time}秒后自动返回`
                    time--
                }, 1000)
                this.nextStepContent = '立即返回'
            }
        }
    }
</script>
