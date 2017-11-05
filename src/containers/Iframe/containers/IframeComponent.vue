<template>
    <div v-if="isCache">
        <span>{{src}}</span>
    </div>
</template>
<style scoped lang="scss">
</style>
<script>
    //    import {mapState} from 'vuex'
    //    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    export default{
//        mixins: [oneLevelTabMixins],
        data(){
            return {
                isCache: true,
                src: ''
            }
        },
        created(){
//            this.iframeSrc=this.$route.query.src
        },
        mounted(){
            console.log(this.$route.params.tag)
            this.src=this.$route.params.tag
//            this.src = this.$route.query.src
            console.log('进入iframe')
        }
    }
</script>
