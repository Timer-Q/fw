<template>
    <div>




        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane name="!警告" label="!警告">
                <el-alert style="margin-bottom:10px;" title="demo文件请查看源码文件夹下的examples" type="warning" :closable="false"></el-alert>

                <el-alert style="margin-bottom:10px;" title="在集此插件和相关demo之前，请认真阅读软件依赖并正确配置" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="插件依赖于el-table，请务必保证el-table中data是嵌套结构的数据" type="error" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="暂不支持异步远程加载数信息（基于需求要求的灵活度，实现此功能将会非常复杂）；后续有需求再考虑" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="若想支持勾选，请务必确保渲染tree table挂载前checked属性已存在且开启enable-check" type="warning" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="父节点数据和子组件表格数据未建立起双向绑定关系，若建立，则开发难度非常大，
                甚至不一定能实现;初始数据仅作为tree table入口数据，后续所有需要访问的数据（例如源数据中可能变化的数据）
                请务必以getCheckedNodes getAllNodes方法获取的为准" type="error" :closable="false"></el-alert>
                <el-alert style="margin-bottom:10px;" title="由于性能 技术 实现难度等各种考量，源数据 视图树 虚拟树三者无法建立起相互
双向绑定关系，若您的业务数据中存在非只读的值，请确保值变化后手动调用updateRows方法更新相关状态;
例如：" type="error" :closable="false">
                    <pre>
                        @change = "$refs.treeGrid.updateRows([scope.row],['testBool'])"

                    </pre>
                </el-alert>
                <el-alert style="margin-bottom:10px;" title="根据需求做组件最小化功能，若不够强大后期有需求了可升级" type="warning" :closable="false"></el-alert>

            </el-tab-pane>
            <el-tab-pane name="demo" label="demo">


                <fw-smarter-query
                    ref="mySmarterQuery"
                    props="test1 test2 test3"
                    display-names="测试1 测试2 测试3"
                    business-key="0" :user-id="0">

                </fw-smarter-query>

                <pre v-if="$refs.mySmarterQuery">
                    搜索条件为：
                    {{$refs.mySmarterQuery.getQueryConditions()}}
                </pre>






            </el-tab-pane>
            <el-tab-pane label="docs">
                <iframe class="no-border-iframe" src="https://www.zybuluo.com/dbx142857/note/933951"></iframe>
            </el-tab-pane>

            <!--<el-tab-pane label="下载demo代码">-->
            <!--<a target="_blank" download="fwTreeGrid.vue" href="/downloadSource/fwSmarterTree.vue">下载源码(若点击无效请在请窗口打开)</a><br>-->
            <!--<a target="_blank" download="demo.vue" href="/downloadDemo/demo-fwSmarterTree.vue">下载demo(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="软件依赖">
                <el-alert :closable="false" style="margin-bottom:10px;" title="fwTreeGrid.js以及这个依赖的东西所依赖的所有东西" type="success"></el-alert>
            </el-tab-pane>
        </el-tabs>







    </div>

</template>
<style lang="less" type="text/less" scoped>

</style>
<script>


    export default {
        data(){
            return {
                docs:{
                    attrs:[
                        {
                            name:'enableCreate',
                            desc:'是否允许手动输入select框里的内容',
                            type:'b',
                            default:false
                        },{
                        name:'size',
                            desc:'尺寸，同element-ui的size'
                        }

                    ],
                    methods:[

                    ],
                    events:[

                    ]
                },



                destinationData:[],
                isLoadingDestination:false,
                destName:'',

                activeName:'!警告',
                searchStr:'',
                checkedAllChildsWhenParentChecked:true,
                enableCheckedMultiple:true,
                enableCheckedFolder:true,
                autoExpandCheckedNodes:true,
                enableCheck:true,

                // :enable-checked-folder="checkedAllChildsWhenParentChecked"
                // :enable-checked-multiple="enableCheckedMultiple"
                // :auto-expand-checked-nodes="autoExpandCheckedNodes"
                // :enable-check="enableCheck"

                cities: [{
                    value: 'Beijing',
                    label: '北京'
                }, {
                    value: 'Shanghai',
                    label: '上海'
                }, {
                    value: 'Nanjing',
                    label: '南京'
                }, {
                    value: 'Chengdu',
                    label: '成都'
                }, {
                    value: 'Shenzhen',
                    label: '深圳'
                }, {
                    value: 'Guangzhou',
                    label: '广州'
                }],
                value6: '',
                options3: [{
                    label: '热门城市',
                    options: [{
                        options: [{
                            value: 'Shanghai',
                            label: '上海'
                        }, {
                            value: 'Beijing',
                            label: '北京'
                        }],
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                    label: '城市名',
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
                value7: '',

                virutalModel:[],
                model: [{
                    "treeId": 1,
                    "label": "System",
                    "selected":true,"url":null,testBool:true,
                    "description": "System Manager",
                    "children": [{
                        "treeId": 2,
                        "label": "base",
                        "selected":true,"url":null,testBool:true,
                        "description": "Base Manager",
                        "children": [{
                            "treeId": 3,

                            "label": "Menus",
                            "selected":true,"url":"/menus",
                            "description": "menu manager",
                            "children":[{
                                "treeId": 17,
                                "label": "Menus17-test",
                                "selected":true,"url":"/menus17",
                                "description": "menu manager17",
                            }]
                        }, {
                            "treeId": 4,
                            "label": "Rolessssssss",
                            "selected":true,"url":"/roles",
                            "description": "Role Manager",
                        }, {
                            "treeId": 5,
                            "label": "Userssssss",
                            "selected":true,"url":"/users",
                            "description": "User Manager",
                        }]
                    }]
                }, {
                    "treeId": 6,
                    "label": "Customs",
                    "selected":true,"url":null,testBool:true,
                    "description": "Custom Manager",
                    "children": [{
                        "treeId": 7,
                        "label": "CustomList-test",
                        "selected":true,"url":"/customs",
                        "description": "CustomList",
                    }]
                }, {
                    "treeId": 8,
                    "label": "Templates",
                    "selected":true,"url":null,testBool:true,
                    "description": "Template Manager",
                    "children": [{
                        "treeId": 9,
                        "label": "TemplateList",
                        "selected":true,"url":"/doc_templates",
                        "description": "Template Manager",
                    }]
                }, {
                    "treeId": 10,
                    "label": "Bussiness",
                    "selected":true,"url":null,testBool:true,
                    "description": "Bussiness Manager",
                    "children": [{
                        "treeId": 11,
                        "label": "BussinessList",
                        "selected":true,"url":null,testBool:true,
                        "description": "BussinessList",
                        "children": [{
                            "treeId": 12,
                            "label": "Currenciesssssssss",
                            "selected":true,"url":"/currencies",
                            "description": "Currencies",
                        }, {
                            "treeId": 13,
                            "label": "Dealtypesaaaaaaa",
                            "selected":true,"url":"/dealtypes",
                            "description": "Dealtypes",
                        }]
                    }, {
                        "treeId": 14,
                        "label": "Products",
                        "selected":true,"url":null,testBool:true,
                        "description": "Products",
                        "children": [{
                            "treeId": 15,
                            "label": "ProductTypes",
                            "selected":true,"url":"/productTypes",
                            "description": "ProductTypes",
                        }, {
                            "treeId": 16,
                            "label": "ProductList",
                            "selected":true,"url":"/products",
                            "description": "ProductList",
                        }]
                    }]
                }],
                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
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
            handleInputChange(val){
                console.log('handleInputChange---:',arguments)
                this.destName=val
                this.destinationRemoteMethod(val)
            },
            handleSelectChange(obj,index){
                this.destName=obj.nestedValue.value
              console.log(" handle select change obj and index:",obj,index)
            },
            destinationRemoteMethod(query){
                console.log('remote method query:',query)
                query=query.trim()
                if(!query){
                    return false
                }

                // if(this.isLoadingDestination==false){
                //
                // }

                this.isLoadingDestination=true

                // this.BX.s.requestTMS('api/testTimeout')



                setTimeout(()=>{

                    this.destinationData=[
                        {
                            label:'label1',
                            a:'a',
                            b:'b',
                            nestedValue:{
                                value:'value1',
                            },
                            isShow:false
                        },{
                            label:'label2',
                            a:'a',
                            b:'b',
                            nestedValue:{
                                value:'value2'
                            },

                        }
                        ,{
                            label:'label3',
                            a:'a',
                            b:'b',
                            nestedValue:{
                                value:'value3'
                            },

                        }
                    ]

                    this.isLoadingDestination=false
                },1000)
            },

            handleSearchChange(item,s){
                return item.label.includes(s)
            },
            log(){
                for(var i=0;i<arguments.length;i++){
                    console.log('第'+(i+1)+'个参数:',arguments[i])
                }
            },
            updateVirtualTreeMethod(){
                this.virutalModel=BX.u.copy(this.$refs.treeGrid.getVirtualTreeNodes())
            },
            handleLabelClick(){
                console.log('handle label click args:',arguments)
            },
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes())
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys())
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }])
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3])
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([])
            },

            remote(row,callback){
                setTimeout(function() {
                    callback(row.children)
                },500)
            }
        }
    }
</script>
