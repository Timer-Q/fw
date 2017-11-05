<style lang="scss" scoped>
    $box-width: 14px;
    $box-height: 14px;
    $border-font-color: #d23737;

    .sigh {
        position:absolute;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
        width: $box-width;
        height: $box-height;
        border: 1px solid $border-font-color;
        border-radius: 50%;
        line-height: $box-height;
        text-align:center;
        z-index: 2;
        cursor:pointer;
        .symbol {
            font-size: 12px;
            color: $border-font-color;
    }
        .sigh-content {
            visibility:hidden;
            position:absolute;
            width:max-content;
            padding: 10px;
            border: 1px solid #d23737;
            border-radius: 4px;
            line-height: 1;
            background-color: #fff2f2;
            p {
                font-size: 12px;
                color: #d23737;
        }
            .triangle {
                position:absolute;
                top: 100%;
                right: 10px;
                width: 0;
                height: 0;
                border: 7px solid transparent;
                border-top-color: #d23737;
        }
            .triangle-cover {
                position:absolute;
                top: -8px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 0;
                height: 0;
                border: 6.5px solid transparent;
                border-top-color: #fff2f2;
        }
    }
        .visible {
            visibility:visible;
    }

    }
</style>

<template>
    <div
        class="sigh"
        @mouseenter="showHideTipsContent"
        @mouseleave="showHideTipsContent"
    >
        <p class="symbol">!</p>
        <div
            class="sigh-content"
            :class="{ visible: isVisible }"
            ref="sighContent"
        >
            <div class="triangle">
                <div class="triangle-cover"></div>
            </div>
            <p>{{ content }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sigh',
        data() {
            return {
                isVisible: false
            }
        },
        props: ['content'],
        methods: {
            showHideTipsContent() {
                this.isVisible = !this.isVisible
            }
        },
        mounted() {
            const {clientHeight, clientWidth} = this.$refs.sighContent
            this.$refs.sighContent.style.top = `-${clientHeight + 10}px`
            this.$refs.sighContent.style.left = `-${clientWidth - 23}px`
        }
    }
</script>

