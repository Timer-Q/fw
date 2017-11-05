<template>
    <div>


        <el-tabs type="border-card">
            <el-tab-pane label="!警告">
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="所有组件，指令秉承功能优先，样式随后的政策" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane label="demo">


                <div>

                    <!--<input @mouseup="viewChange()" v-model="foo">-->
                    <!--<button @click="foo='aaaaaaaaaaaaaaaa';">change foo's value</button>-->
                    <el-input v-keyboard="item.seq" placeholder="请输入..." :key="item.seq" data-keyboard-group="group1" v-model="item.v" v-for="item in seqConfig"></el-input>

                    <!--<Input :key="item.seq" data-keyboard-group="group1" :value="item.v" v-for="item in seqConfig" v-keyboard="item.seq" placeholder="请输入..." style="width: 300px"></Input>-->
                    <!--<Input v-keyboard="4" placeholder="请输入..." style="width: 300px"></Input>-->
                    <!--<Input v-keyboard="bar" placeholder="请输入..." style="width: 300px"></Input>-->
                    <button @click="changeStep()">切換1和2的位置</button>
                    <br><br><br><br><br>
                </div>




                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>









            </el-tab-pane>
            <el-tab-pane label="docs">

                <pre>
                    {{usageString}}
                </pre>
                <pre>
                    注意路径
                    import fwKeyboardControl from './directives/fwKeyboardControl'
Vue.use(fwKeyboardControl)
                </pre>

                <pre>
                    提供一个类名，使用者可自行定制样式：
                    const CLASS_NAME='fw-keyboard-focus-active'
                </pre>
                <pre>
                    目前对以下几种元素生效:
                    return node.querySelector('input:not(*[readonly])')
        ||node.querySelector('button')
        ||node.querySelector('.el-select')
        ||('input button'.split(' ').indexOf(nodeName)!==-1?node:null)
                </pre>
                <iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/934129"></iframe>
            </el-tab-pane>

            <!--<el-tab-pane label="下载demo代码">-->
                <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwKeyboardControl.directive">下载源码(若点击无效请在请窗口打开)</a><br>-->
                <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwKeyboardControl.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="软件依赖">



                <el-alert :closable="false" style="margin-bottom:10px;" title="VUE" type="success"></el-alert>
                <el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/input" type="success"></el-alert>
            </el-tab-pane>
        </el-tabs>







    </div>



</template>
<script>
    export default{
        mounted(){

        },
        methods:{
            viewChange(){
                console.log('foo_;:',this.foo)
            },
            changeStep(){
                this.seqConfig[0].seq=2
                this.seqConfig[1].seq=1
            }
        },
        data(){
            return {
                usageString:'<el-input v-keyboard="item.seq" placeholder="请输入..." :key="item.seq" data-keyboard-group="group1" v-model="item.v" v-for="item in seqConfig"></el-input>',
                foo:'bar',
                seqConfig:
                    [
                        {
                            seq:1,
                            v:'1的value'
                        },
                       {
                           seq:2,
                           v:'2的value'
                       },
                    {
                        seq:3,
                        v:'3的value'
                    }
                ]


//                }

            }
        }
    }
</script>
