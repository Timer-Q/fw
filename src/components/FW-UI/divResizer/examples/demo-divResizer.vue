<template>
    <div>


        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="!警告" label="!警告">
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="所有组件，指令秉承功能优先，样式随后的政策" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane name="demo" label="demo">

                可以向右或者向上拉伸，可以自定义样式；未来可能支持向左甚至组合方向拉伸；当前代码中右侧半透明拉伸条样式写在本文件style中,请知晓

                <div style="width:400px;height:400px;background:chocolate;" v-resize="resizeConfig">

                </div>


                <!--<el-input v-model="model" v-textarea-limiter type="textarea" :maxlength="100"></el-input>-->






                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>









            </el-tab-pane>
            <el-tab-pane label="docs">
                <pre>
                    {{usageString}}
                </pre>
                <pre>
                    resizeConfig:{
                    direction:'east',
                    className:'east-resize',
                    alwaysShow:true,
                    // minHeight:35,
                    // minTop:100,
                    minWidth:200,
                    maxWidth:800,

                    onChange:function(options){

                        console.log('size has been changed:',options)
                    }
                },
                </pre>
                <iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/934129"></iframe>
            </el-tab-pane>


            <el-tab-pane label="软件依赖">



                <el-alert :closable="false" style="margin-bottom:10px;" title="VUE" type="success"></el-alert>
                <el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/input" type="success"></el-alert>
            </el-tab-pane>
        </el-tabs>







    </div>



</template>
<style lang="less" type="text/less">
    @import '../src/divResizer.css';
/*.east-resize{*/
    /*width: 5px;*/
    /*height: 100%;*/
    /*background: rgba(1,1,1,0.5);*/
    /*border-radius: 4px;*/
    /*right: 0;*/
/*}*/
</style>
<script>
    export default {
        props:{

        },
        mounted(){
            let parseUrl= function (href) {
                var url = href || location.href
                var a = document.createElement('a')
                a.href = url
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            }
            let urlQueryMap=parseUrl()
            this.activeName=urlQueryMap.tab||'!警告'
            console.log('urlQueryMap-:',urlQueryMap)
            console.log("$refs.treeGrid",this.$refs.treeGrid)
            this.constructor.prototype.BX&&this.BX.call(this,'setCurrentVM')
        },
        methods:{

        },
        data(){
            return {
                usageString:`<div style="width:400px;height:400px;background:chocolate;" v-resize="resizeConfig">

                </div>`,
                resizeConfig:{
                    direction:'east',
                    className:'east-resize',
                    alwaysShow:true,
                    // minHeight:35,
                    // minTop:100,
                    minWidth:200,
                    maxWidth:800,
                    onClick(){
                      console.log('click args:',arguments)
                    },
                    onChange:function(options){

                        console.log('size has been changed:',options)
                    }
                },
                activeName:'!警告',
                model:'你是我的小呀小苹果'
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
