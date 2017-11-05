<template>
    <div v-if='isCache'>
        <Tabs class="temporary-tabs" type="card" v-model="selectTabCode">
            <TabPane label="站内信-列表">
                <div class="projection">
                    <ButtonGroup>
                        <Button class="public-function-btn" @click="clickByEdit('add')">新增</Button>
                        <Button class="public-function-btn" @click="clickByEdit('update')">修改</Button>
                        <Button class="public-function-btn">删除</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button class="public-function-btn">启用</Button>
                        <Button class="public-function-btn">停用</Button>
                    </ButtonGroup>
                    <Button class="public-function-btn">刷新</Button>
                    <Button class="public-function-btn">日志</Button>
                </div>
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
            window.BX=this.$store
            this.$root.bus.$on('deleteViewMail', function (index) {
                _this.isCache=false
                for(let i=0;i<_this.navTabData.length;i++){
                    if(_this.navTabData[i].active){
                        return
                    }
                }
                const con = _this.navTabData[index-1]||_this.navTabData[index]
                const path = con?con.path:"/b2b"
                if(con)con.active=true
                _this.$router.push(path)
            })
        },
        activated: function () {
            this.isCache=true
            console.log('mail的activated')
        },
        deactivated: function () {
            console.log('mail的deactivated')
        },
        destroyed(){
            console.log('mail组件销毁')
        }
    }
</script>
