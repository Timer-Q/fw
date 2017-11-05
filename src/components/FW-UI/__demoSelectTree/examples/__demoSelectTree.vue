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



                <fw-smarter-input-select
                    ref="smarterInputSelect1"
                    @inputChange="handleInputChange"
                    @selectChange="handleSelectChange"
                    title="点击节点label试试"
                    :enable-create="false"
                    placeholder="请选择一个节点"
                    :data="destinationData"
                    :loading="isLoadingDestination"
                    :value="destName"
                    labelKey="label"
                    isShowKey="isShow"
                >
                    <template slot-scope="scope">
                        <!--:data="model"-->
                        <fw-smarter-tree

                            enable-filter
                            @mounted="$refs.treeGrid.refreshTreeTable(model)"
                            @labelClick="handleLabelClick"
                            ref="treeGrid"
                            tree-key="treeId"
                            checked-key="selected"
                            :enable-checked-folder="enableCheckedFolder"
                            :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                            :enable-checked-multiple="enableCheckedMultiple"
                            :auto-expand-checked-nodes="autoExpandCheckedNodes"
                            :enable-check="enableCheck"
                            prop="label" label="labelname">

                        </fw-smarter-tree>

                        <el-button @click="$refs.smarterInputSelect1.hidePopOver()">hidePopOver</el-button>
                    </template>

                </fw-smarter-input-select>










            </el-tab-pane>



            <el-tab-pane label="软件依赖">


                依赖于smarter-input-select和smarter-tree所依赖的所有东西
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
                this.destName=obj.value
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
                            value:'value1',
                            isShow:false
                        },{
                            label:'label2',
                            value:'value2'
                        },{
                            label:'label3',
                            value:'value3'
                        }
                    ]

                    this.isLoadingDestination=false
                },1000)
            },
            handleLabelClick(){
                this.destName=arguments[0].label
                console.log('handle label click args:',arguments)
            },
        },
        data(){
            return {
                destinationData:[],
                isLoadingDestination:false,
                destName:'',
                checkedAllChildsWhenParentChecked:true,
                enableCheckedMultiple:true,
                enableCheckedFolder:true,
                autoExpandCheckedNodes:true,
                enableCheck:true,
                model: [{

                    "treeId": 1,
                    "label": "System",
                    "selected":false,"url":null,testBool:true,
                    "description": "System Manager",
                    "children": [{
                        "treeId": 2,
                        "label": "base",
                        "selected":false,"url":null,testBool:true,
                        "description": "Base Manager",
                        "children": [{
                            "treeId": 3,

                            "label": "Menus",
                            "selected":false,"url":"/menus",
                            "description": "menu manager",
                            "children":[{
                                "treeId": 17,
                                "label": "Menus17-test",
                                "selected":false,"url":"/menus17",
                                "description": "menu manager17",
                            }]
                        }, {
                            "treeId": 4,
                            "label": "Rolessssssss",
                            "selected":false,"url":"/roles",
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
                    "selected":false,"url":null,testBool:true,
                    "description": "Custom Manager",
                    "children": [{
                        "treeId": 7,
                        "label": "CustomList-test",
                        "selected":false,"url":"/customs",
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
                activeName:'!警告'
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
