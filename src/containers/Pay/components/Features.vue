<style lang='scss' scoped>
    .features {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        width: 34px;
        height: 102px;
        cursor: pointer;
        &:hover {
            .drop {
                top: 34px;
            }
        }
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
        border: 1px solid #ccc;
        background-color: #eee;
        z-index: 2;
        &:hover {
            width: 34px;
            height: 34px;
            border: 0 none;
            background-color: #28a7e1;
        }
    }

    .drop {
        position: absolute;
        top: -34px;
        left: 0;
        transition: top .5s;
        > div {
            position: absolute;
            top: 0;
            left: 0;
            width: 34px;
            height: 34px;
            background-color: rgba(0, 0, 0, .6);
            z-index: 1;
            &:hover {
                background-color: #28a7e1;
            }
        }
        .sort {
            border-top: 0 none;
            border-bottom: 0 none;
        }
        .fullscreen {
            top: 34px;
        }
    }

</style>
<template>
    <div class="features">
        <div class="cover"></div>
        <div class="drop">
            <div class="sort" @click="clickSort"></div>
            <div class="fullscreen" @click="clickFullScreen"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Features',
        methods: {
            clickFullScreen() {
                this.$emit('fullScreen')
            },
            clickSort() {
                this.$emit('sort')
            }
        }
    }
</script>
