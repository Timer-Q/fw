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


                <div v-bind:style="{width:expanded?'400px':'100px'}" style="height:400px;background:chocolate;" v-expander="expanderConfig">
                    当前状态:{{expanded?'展开':'合拢'}}
                </div>


                <!--<el-input v-model="model" v-textarea-limiter type="textarea" :maxlength="100"></el-input>-->






                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>









            </el-tab-pane>
            <el-tab-pane label="docs">
                <pre>请不要给v-expander绑定的元素设置overflow:hidden,不然expander都出不来了</pre>
                <pre>
                    {{usageString}}
                </pre>
                <pre>
                    {
                expanded:false,
                expanderConfig:{
                    // 此时expander将会拥有east-expander类名
                    direction:'east',
                    textWhenShow:'戳我合拢',
                    textWhenHide:'戳我展开',
                    defaultExpanded:false,
                    onOpen(){
                      alert('老衲我要展开咯')
                        this.expanded=true
                    },
                    onClose(){
                      alert('老衲我要关闭咯；通过onOpen和onClose使用者自己控制宿主div的样式和状态')
                        this.expanded=false
                    },
                    onReady:function(options){

                        console.log('div expander is ready')
                    }
                },
                activeName:'!警告',
                model:'你是我的小呀小苹果'
            }
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
    @import '../src/divExpander.css';
/*.east-expander{*/
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
                usageString:`<div v-bind:style="{width:expanded?'400px':'100px'}" style="height:400px;background:chocolate;" v-expander="expanderConfig">
                        当前状态:{{expanded?'展开':'合拢'}}
                    </div>`,
                expanded:false,
                expanderConfig:{
                    // 此时expander将会拥有east-expander类名
                    // direction:'east',
                    textWhenShow:'戳我合拢',
                    textWhenHide:'戳我展开',
                    defaultExpanded:false,
                    onOpen(){
                      alert('老衲我要展开咯')
                        this.expanded=true
                    },
                    onClose(){
                      alert('老衲我要关闭咯；通过onOpen和onClose使用者自己控制宿主div的样式和状态')
                        this.expanded=false
                    },
                    onReady:function(options){

                        console.log('div expander is ready')
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
