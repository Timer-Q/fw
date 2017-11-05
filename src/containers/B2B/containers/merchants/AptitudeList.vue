<template>
    <div class="aptitude" ref="scroll">
        <div>
            <p>
                <span>资质证件类型 ：</span>
                <span>{{aptitudeData.idType}}</span>
            </p>
        </div>
        <div v-if="aptitudeData.idType==1">
            <p>
                <span>身份证姓名 ：</span>
                <span>{{aptitudeData.idCardName}}</span>
            </p>
            <p>
                <span>身份证件号 ：</span>
                <span>{{aptitudeData.idCardNo}}</span>
            </p>
            <div>
                <p>
                    <span>资质照片 ：</span>
                    <span class="pic">
                        <img :src="aptitudeData.idCardUrl" alt="">
                        <span>营业执照</span>
                    </span>
                </p>
            </div>
        </div>
        <div v-if="aptitudeData.idType==2">
            <div>
                <p>
                    <span>法人姓名 ：</span>
                    <span>{{aptitudeData.idCardUrl}}</span>
                </p>
            </div>
            <div>
                <p>
                    <span>营业执照号 ：</span>
                    <span>{{aptitudeData.businessLicenseNo}}</span>
                </p>
                <div>
                    <p>
                        <span>资质照片 ：</span>
                        <span class="pic">
                        <img :src="aptitudeData.businessLicenseUrl" alt="">
                        <span>营业执照</span>
                    </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .aptitude{
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
                        &.pic{
                            display: block;
                            img{
                                width: 68px;
                                height: 68px;
                                border:1px solid #cacaca;
                                margin-top: 5px;
                            }
                            span{
                                margin-left: 10px;
                                color: #6b6b6b;
                            }
                        }
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
                aptitudeData:{}
            }
        },
        methods:{
            async getAptitudeList(){
                try {
                    const data = await merchantsService.getByMerchantId(this.merchantId)
                    if (data.status == 200&&data.data.result) {
                        this.aptitudeData = data.data.result
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
            this.getAptitudeList()
            this.$root.bus.$on('getAptitudeList',()=>{
                _this.getAptitudeList()
            })
        },
        props:{
            merchantId: Number
        }
    }
</script>
