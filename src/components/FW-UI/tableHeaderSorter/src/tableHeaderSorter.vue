<style>

</style>
<template>
    <div>
        <el-button type="text" @click="dialogTableVisible = true">打开表格排序</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-row style="width:50%;min-width:776px;">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-input
                            placeholder="输入名称进行搜索"
                            icon="search"
                            style="margin-bottom:10px"
                            v-model="searchModel"
                            :on-icon-click="searchSorterFn">
                        </el-input>
                        <div class="mySourceData" :style="{height:searchTableH+'px'}">
                            <div class="myTr" v-for="(v,k) in searchData">
                                <el-checkbox v-model="v[myChecked]" style="margin:0 10px" @change="checkOneFn(v,k)"></el-checkbox>
                                {{v[myTxt]}}
                            </div>
                        </div>
                        <el-checkbox 
                            style="margin-top:10px;margin-left:10px"
                            v-model="isCk"
                            :indeterminate="isIndeterminate"
                            :label="'全选（'+checkedData.length+'/'+searchData.length+'）'"
                            @change="checkedAll"
                        ></el-checkbox>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <div class="myTable">
                            <div class="myTitle">拖拽可以排序，双击可以编辑</div>
                            <div class="myTableWrap" :style="{height:searchTableH+'px'}">
                                <div class="myTxt" @mousedown="operateMouseDown(v,i,$event)" @mouseup="operateMouseUp(v,i)" v-for="(v,i) in checkedData" @mouseover="operatMouseOver(v,i)" @mouseout="operatMouseOut(v,i)">
                                    <em>{{(i+1)}}</em>
                                    <el-input :value="v[myTxt]" :readonly="!v.edit" :ref="'edit'+i"></el-input>
                                    <div class="operate" v-if="v.show">
                                        <span class="text-icon" v-if="!v.edit">
                                            <i class="el-icon-arrow-down" @click="sorterDown(v, i)"></i>
                                            <i class="el-icon-arrow-up" @click="sorterUp(v, i)"></i>
                                            <i class="el-icon-edit" @click="editText(v, i)"></i>
                                            <i class="el-icon-close" @click="closeNow(v, i)"></i>
                                        </span>
                                        <span class="confirmBtn" v-if="v.edit">
                                            <el-button size="mini" @click="tableTitleUpdateCancle(v,i)">取消</el-button>
                                            <el-button size="mini" @click="tableTitleUpdateOk(v,i)">确定</el-button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetTableData">reset</el-button>
                <el-button type="primary" @click="getTableData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" type="text/less">
.mySourceData{
    overflow-y: auto;
    border:1px solid #ccc;
    .myTr{
        border-bottom:1px solid #ccc;
        padding:10px 0;
    }
}
.myTable{
    padding:0 15px;
    overflow: hidden;
    .myTitle{
        color:#ccc;
    }
    .myTableWrap{
        width:100%;
        border:1px solid #333;
        border-radius:10px;
        margin-top:23px;
        overflow-y:auto;
    }
    .myTxt{
        display:-webkit-box;
        -webkit-box-pack:start;
        border-bottom:1px solid #333;
        position: relative;
        .el-input{
            -webkit-box-flex:1;
            // width:100%;
            display:block;
        }
    }
    em{
        font-style: normal;
        line-height: 40px;
        padding:0 5px;
        display:block;
        margin-left:10px;
    }
    input{
        border:none;
    }
    .operate{
        height:40px;
        padding-left:5px;
        display:-webkit-box;
        -webkit-box-align:center;
        position: absolute;
        top:0;
        right:0;
        .confirmBtn{
            display:block;
        }
        .text-icon{
            height:40px;
            line-height: 40px;
            padding-left:5px;
            border-left:1px solid grey;
            display:block;
            i{
                padding:0 5px;
            }
        }
    }
}
</style>
<script>
    export default {
        name:'fw-table-header-sorter',
        props:{
            vm:Object,
            data:Array,
            dataIndex: String,
            checked: String,
            txt: String,
            getData: Function
        },
        mounted(){
            this.cloneSourceData()
        },
        methods:{
            dataInit(){
                const that = this
                this.checkedData = []
                this.searchData.forEach(function(v){
                    if(v[that.myChecked]){
                        that.checkedData.push(v)
                    }
                })
                if( this.checkedData.length==this.searchData.length ){
                    this.isCk = true
                    this.isIndeterminate = false
                }else if(this.checkedData.length == 0){
                    this.isCk = false
                    this.isIndeterminate = false
                }else{
                    this.isCk = false
                    this.isIndeterminate = true
                }
            },

            cloneSourceData(){
                const data = this.sourceData
                var arr = []
                this.searchData = []
                if(this.myDataIndex!==undefined && this.myDataIndex!=='' && this.myDataIndex!==null){
                    for(var i=0; i<data.length; i++){
                        var o = new Object()
                        if(typeof data[i][this.myDataIndex] === 'string' || typeof data[i][this.myDataIndex] === 'number'){
                            arr.push(data[i][this.myDataIndex])
                            for(var j in data[i]){
                                o[j] = data[i][j]
                                o.edit = false
                                o.show = false
                            }
                        }else{
                            throw(this.myDataIndex+' must be a string or value that is not empty')
                        }
                        this.searchData.push(o)
                    }
                }else{
                    for(var i=0; i<data.length; i++){
                        var o = new Object()
                        for(var j in data[i]){
                            o[j] = data[i][j]
                            o.edit = false
                            o.show = false
                            o.myDataIndex = i
                            this.myDataIndex = 'myDataIndex'
                        }
                        this.searchData.push(o)
                    }
                }
                for(var i=0; i<arr.length; i++){
                    if( arr.indexOf(arr[i]) != i ){
                        throw('The keys must be the unique value')
                    }
                }
                this.dataInit()
            },

            searchSorterFn(){
                const that = this
                this.searchData = []
                if( this.searchModel == '' ){
                    this.searchData = this.sourceData
                }else{
                    this.sourceData.forEach(function(v){
                        if( v.title.indexOf(that.searchModel) > -1 ){
                            that.searchData.push(v)
                        }
                    })
                }
                // console.log(this.searchModel)
            },

            isCheckedAll(){
                if( this.checkedData.length==this.searchData.length ){
                    this.isCk = true
                    this.isIndeterminate = false
                }else if(this.checkedData.length == 0){
                    this.isCk = false
                    this.isIndeterminate = false
                }else{
                    this.isCk = false
                    this.isIndeterminate = true
                }
            },

            checkOneFn(v){
                if(v[this.myChecked]){
                    this.checkedData.push(v)
                }else{
                    for(var i in this.checkedData){
                        if(this.checkedData[i][this.myDataIndex] == v[this.myDataIndex]){
                            this.checkedData.splice(i,1)
                        }
                    }
                }
                this.isCheckedAll()
                
            },

            checkedAll(){
                const that = this
                var arr = []
                this.isIndeterminate = false
                this.searchData.forEach(function(v){
                    v[that.myChecked] = that.isCk
                    arr.push(v)
                })
                if(this.isCk){
                    this.checkedData = arr
                }else{
                    this.checkedData = []
                }
                
            },

            sorterDown(v, i){
                this.checkedData.splice(i,1)
                if(i==this.checkedData.length){
                    this.checkedData.unshift(v)
                }else{
                    this.checkedData.splice(i+1,0,v)
                }

            },
            sorterUp(v, i){
                this.checkedData.splice(i,1)
                if(i==0){
                    this.checkedData.push(v)
                }else{
                    this.checkedData.splice(i-1,0,v)
                }
            },
            editText(v, i){
                this.checkedData.splice(i,1)
                v.edit = true
                this.checkedData.splice(i,0,v)
                this.$refs['edit'+i][0].$el.firstElementChild.focus()
                this.$refs['edit'+i][0].$el.firstElementChild.select()
            },
            closeNow(v, i){
                v[this.myChecked] = false
                this.checkedData.splice(i,1)
                this.isCheckedAll()
            },

            operatMouseOver(v,i){
                this.checkedData.splice(i,1)
                v.show = true
                this.checkedData.splice(i,0,v)
            },
            operatMouseOut(v,i){
                this.checkedData.splice(i,1)
                v.show = false
                this.checkedData.splice(i,0,v)
            },
            operateMouseDown(v,i,eve){
                const that = this
                var dTop = eve.clientY
                document.onmousemove = function(e){
                    var e = e || window.eventvar
                    var mTop = e.clientY
                    if(mTop-dTop>20){
                        that.checkedData.splice(i,1)
                        if(i==that.checkedData.length){
                            that.checkedData.unshift(v)
                        }else{
                            that.checkedData.splice(i+1,0,v)
                        }
                    }else if(mTop-dTop<-20){
                        that.checkedData.splice(i,1)
                        if(i==0){
                            that.checkedData.push(v)
                        }else{
                            that.checkedData.splice(i-1,0,v)
                        }
                    }
                }
            },
            operateMouseUp(v,i){
                document.onmousemove = null
            },

            tableTitleUpdateCancle(v,i){
                const that = this
                v.edit = false
                this.$refs['edit'+i][0].$el.firstElementChild.value = v[this.myTxt]
            },
            tableTitleUpdateOk(v,i){
                this.checkedData.splice(i,1)
                v.edit = false
                v[this.myTxt] = this.$refs['edit'+i][0].$el.firstElementChild.value
                this.checkedData.splice(i,0,v)
            },

            resetTableData(){
                this.cloneSourceData()
            },

            getTableData(){
                var data = new Array()
                this.checkedData.forEach(function(v){
                    data.push(v)
                })
                this.getData(data)
            }
        },
        data(){
            return {
                usageString:'<fw-table-header-sorter :vm="_self" :keys="\'test testObj.foo\'.split(\' \')"></fw-table-header-sorter>',
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
                model:'你是我的小呀小苹果',
                dialogTableVisible: false,
                myDataIndex: this.dataIndex,
                myChecked: this.checked,
                myTxt: this.txt,
                isIndeterminate: false,
                isCk: false,
                searchModel: '',
                searchTableH: 300,
                checkedData: [],
                searchData: [],
                sourceData: this.data
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
