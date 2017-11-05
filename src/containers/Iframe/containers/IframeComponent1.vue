<template>
    <div v-show="isCache">
        <div v-once>
            <iframe :src="iframeSrc" frameborder="0"></iframe>
        </div>
    </div>
</template>
<style>
    iframe {
        width: 100%;
        /*height: 600px;*/
    }
</style>
<script>
    //    import {mapState} from 'vuex'
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    export default{
        mixins: [oneLevelTabMixins],
        data(){
            return {
                tag: 'oss_iframe1',
                system: '/b2b',
                titleName: '百度',
                iframeSrc: 'http://www.baidu.com'
            }
        },
        created(){
//            this.iframeSrc=this.$route.query.src
        }
    }
</script>
