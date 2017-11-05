<template>
    <div>


        <el-tabs type="border-card">
            <el-tab-pane label="!警告">
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="所有组件，指令秉承功能优先，样式随后的政策" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="请记得加上maxlength" type="error" :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane label="demo">


                <el-input v-model="model" v-textarea-limiter type="textarea" :maxlength="100"></el-input>






                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>









            </el-tab-pane>
            <el-tab-pane label="docs">
                <pre>
                    {{usageString}}
                </pre>
                <pre>
                    注意路径
                    import fwTextareaLimiter from './directives/fwTextareaLimiter'
                    Vue.use(fwTextareaLimiter)
                </pre>

                <pre>
                    提供两个类名，使用者可自行定制样式：
                    let curLenClass='fw-textarea-limiter-cur-len',
                        wrapperClass='fw-textarea-limiter-wrapper'
                </pre>
                <iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/934129"></iframe>
            </el-tab-pane>

            <!--<el-tab-pane label="下载demo代码">-->
                <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwTextareaLimiter.directive">下载源码(若点击无效请在请窗口打开)</a><br>-->
                <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwTextareaLimiter.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="软件依赖">



                <el-alert :closable="false" style="margin-bottom:10px;" title="VUE" type="success"></el-alert>
                <el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/input" type="success"></el-alert>
            </el-tab-pane>
        </el-tabs>







    </div>



</template>
<style lang="less" type="text/less">

</style>
<script>
    export default {
        props:{

        },
        mounted(){

        },
        methods:{

        },
        data(){
            return {
                usageString:'<el-input v-model="model" v-textarea-limiter type="textarea" :maxlength="100"></el-input>',
                model:'你是我的小呀小苹果'
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
