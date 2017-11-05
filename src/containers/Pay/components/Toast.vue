<style lang="scss" scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 44px;
        padding: 0 16px;
        box-sizing: border-box;
        line-height: 44px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, .6);
        z-index: 9999;
        .title {
            padding-left: 30px;
            font-size: 12px;
            color: #fff;
        }
        .icon {
            position: absolute;
            top: 13px;
            left: 16px;
            width: 20px;
            height: 20px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>

<template>
    <transition name="fade">
        <div class="toast" v-show="isShowToast">
            <img :src="chenggong" alt="成功" class="icon" v-if="type === 'success'">
            <img :src="jingshi" alt="警示" class="icon" v-if="type === 'error'">
            <p class="title">{{ message }}</p>
        </div>
    </transition>
</template>

<script>
    import chenggong from '@/asserts/images/Pay/chenggong.png'
    import jingshi from '@/asserts/images/Pay/jingshi.png'

    export default {
        name: 'Toast',
        data() {
            return {
                message: '',
                type: '',
                isShowToast: false,
                chenggong,
                jingshi
            }
        },
        created() {
            this.$root.bus.$on('pay_showToast', ([config]) => {
                this.isShowToast = true
                const {message, type, duration} = config
                this.message = message
                this.type = type
                setTimeout(() => {
                    this.isShowToast = false
                }, duration ? duration : 2000)
            })
        }
    }
</script>
