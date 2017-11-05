<template>
    <div class="router-out-content">
        <!--缓存部分页面的写法-->
        <keep-alive>
            <router-view v-show="!showIframe" class="position router-content" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-show="!showIframe" class="position router-content" v-if="!$route.meta.keepAlive"></router-view>
        <!--兼容系统外部页面-->
        <iframe-temp v-show="showIframe"></iframe-temp>
    </div>
</template>
<style scoped lang="scss">
    .position {
        position: relative
    }

    .router-out-content {
        position: static;
    }
</style>
<script>
import { mapState } from 'vuex'
import iframeTemp from '@/containers/main/IframeTemplate.vue'
export default {
    data() {
        return {}
    },
    components: {
        iframeTemp
    },
    computed: {
        ...mapState([
            'showIframe'
        ])
    }
}
</script>
