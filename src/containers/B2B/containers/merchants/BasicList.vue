<template>
    <div class="basic" ref="scroll">
        <div>
            <p>
                <span>商户名称 ：</span>
                <span>{{basicData.merchantName}}</span>
            </p>
            <p>
                <span>来源 ：</span>
                <span>{{basicData.registerSourceDesc}}</span>
            </p>
        </div>
        <div>
            <p>
                <span>账号 ：</span>
                <span>{{basicData.account}}</span>
            </p>
            <p>
                <span>登录手机 ：</span>
                <span>{{basicData.account}}</span>
            </p>
            <p>
                <span>账号权限 ：</span>
                <span>{{basicData.stationName}}</span>
            </p>
        </div>
        <div>
            <p>
                <span>地址 ：</span>
                <span>{{basicData.primaryAddress}}</span>
            </p>
        </div>
        <div>
            <p>
                <span>商户类型 ：</span>
                <span>{{basicData.merchantTypeDesc}}</span>
            </p>
            <p>
                <span>经营类型 ：</span>
                <span>{{basicData.manageTypeDesc}}</span>
            </p>
        </div>
        <div>
            <p>
                <span>主要联系人 ：</span>
                <span>{{basicData.primaryName}}</span>
            </p>
            <p>
                <span>主要联系人电话 ：</span>
                <span>{{basicData.primaryPhone}}</span>
            </p>
        </div>
        <div>
            <p>
                <span>次要联系人 ：</span>
                <span>{{basicData.secondName}}</span>
            </p>
            <p>
                <span>次要联系人电话 ：</span>
                <span>{{basicData.secondPhone}}</span>
            </p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .basic{
        margin: 16px 0;
        *{
            color: #3e3e3e;
            font-size: 12px;
        }
        div{
            overflow: hidden;
            clear: both;
            p{
                line-height: 28px;
                float: left;
                span{
                    display: block;
                    float: left;
                    &:first-child{
                        width: 100px;
                        text-align: right;
                    }
                    &:last-child{
                        width: 400px;
                    }
                }
            }
        }

    }
</style>
<script>
    import merchantsService from '@B2B/services/substatAdmin/merchantsService.js'
    import scrollMixins from '@/mixins/scrollMixins.js'
    export default{
        mixins: [scrollMixins],
        data(){
            return {
                basicData:{}
            }
        },
        methods:{
            async getBasicList(){
                try {
                    const data = await merchantsService.getByMerchantId(this.merchantId)
                    if (data.status == 200&&data.data.result) {
                            this.basicData = data.data.result
                    }else{
                        console.log(data.status.statusReason)
                        this.$customMessage("查询失败","error")
                    }
                    this.loading = false
                }
                catch (e) {
                    this.$customMessage("查询失败","error")
                    console.log(e)
                }
            }
        },
        mounted () {
            const _this = this
            this.getBasicList()
            this.$root.bus.$on('getBasicList',()=>{
                _this.getBasicList()
            })
        },
        props:{
            merchantId: Number
        }
    }
</script>
