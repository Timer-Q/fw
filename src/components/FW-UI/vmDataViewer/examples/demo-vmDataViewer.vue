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


                <pre>请查看屏幕右下角</pre>
                <fw-vm-data-viewer :vm="_self" :keys="'test testObj.foo test1'.split(' ')"></fw-vm-data-viewer>




                <el-alert title="demo到此结束，只保证此处以上代码能跑" :closable="false" type="warning"></el-alert>









            </el-tab-pane>
            <el-tab-pane label="docs">
                <pre>
                    {{usageString}}
                </pre>
                <pre>表管self是什么鬼  你也不用定义 直接酱紫写就ok ；keys接受array类型</pre>
                <!--<iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/919668"></iframe>-->
            </el-tab-pane>

            <!--<el-tab-pane label="下载demo代码">-->
                <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwVMDataViewer.vue">下载源码(若点击无效请在请窗口打开)</a><br>-->
                <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwVMDataViewer.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="软件依赖">



                <el-alert :closable="false" style="margin-bottom:10px;" title="VUE" type="success"></el-alert>
                <el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/tabs" type="success"></el-alert>
                <el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/tab-pane" type="success"></el-alert>
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
                usageString:'<fw-vm-data-viewer :vm="_self" :keys="\'test testObj.foo\'.split(\' \')"></fw-vm-data-viewer>',
                test:1,
                testObj:{
                    foo:'bar'
                },
                test1:[
                    {
                        id:1,
                        label:'公司的components',

                        children:[{
                            label:'tree table组件',
                            url:'/treeGrid',
                            id:11
                        },
                            {
                                label:'更聪明的tree-尽量满足你所有幻想',
                                url:'/smarterTree',
                                id:12
                            }
                        ]
                    },
                    {
                        id:2,
                        label:'公司的directive',

                        children:[{
                            label:'光标路径',
                            url:'/keyboardControl',
                            id:21
                        },
                            {
                                label:'文本域字数限制',
                                url:'/textareaLimiter',
                                id:22
                            }
                        ]
                    },
                    {
                        id:3,
                        label:'其他技术杂项',

                        children:[{
                            label:'蜂网基础util',
                            url:'/util',
                            id:31
                        }]
                    },
                    {
                        id:4,
                        label:'估期+进度+各种给领导看的',

                        children:[{
                            label:'紧急组件估期',
                            url:'/componentsOfferDate',
                            id:41
                        }]
                    },
                    {
                        id:5,
                        label:'开发者效率提升工具/插件',

                        children:[{
                            label:'view model数据查看器',
                            url:'/vmDataViewer',
                            id:51
                        }]
                    }
                ],
                model:'你是我的小呀小苹果'
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
