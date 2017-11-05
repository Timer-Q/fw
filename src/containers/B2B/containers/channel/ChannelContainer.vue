<template>
    <div v-if='isCache'>
        <Tabs class="temporary-tabs" type="card" v-model="selectTabCode">
            <TabPane label="频道管理-列表">
                <Button>新增</Button>
                <Button>修改</Button>
                <Button>删除</Button>
                <ButtonGroup>
                    <Button>启用</Button>
                    <Button>停用</Button>
                </ButtonGroup>
                <Button>刷新</Button>
                <Button>日志</Button>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import * as mainConst from '@/store/mainConst.js'
    export default{
        data(){
            return {
                isCache:true,
                defaultTab: {},
                selectTabCode: ""
            }
        },
        computed: {
            ...mapState([
                'navTabData'
            ])
        },
        mounted(){
            const _this = this
            this.$root.bus.$on('deleteViewChannel', function (index) {
                _this.isCache=false
                for(let i=0;i<_this.navTabData.length;i++){
                    if(_this.navTabData[i].active){
                        return
                    }
                }
                const con = _this.navTabData[index-1]||_this.navTabData[index]
                const path = con?con.path:"/main"
                con.active=true
                _this.$router.push(path)
            })
        },
        activated: function () {
            this.isCache=true
        },
        deactivated: function () {
        },
        destroyed(){
        }
    }
</script>
