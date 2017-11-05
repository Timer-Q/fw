<style lang="scss" scoped>
    @import './common.scss';

    .loading-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 120px;
            height: 120px;
        }
        p {
            margin-top: -20px;
            text-align: center;
            font-size: 12px;
            color: #333;
        }
    }
</style>
<template>
    <div class="loading-box">
        <img :src="loadingImg" alt="loading">
        <p>loading...</p>
    </div>
</template>
<script>
    import loadingImg from '@/asserts/images/Pay/checkoutCounter/loading.gif'

    export default {
        name: 'Loading',
        data() {
            return {
                loadingImg
            }
        },
    }
</script>
