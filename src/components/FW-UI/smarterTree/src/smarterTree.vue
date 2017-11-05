<style>
    .fw-smarter-tree .el-table__body,.fw-smarter-tree .el-table__header{
        width:100%!important;
    }
    .fw-smarter-tree td{
        border-bottom:none;
    }
    .smarter-tree-search-wrapper .el-select{
        display:block;
    }
    .smarter-tree-path-option{
        color:chocolate;
    }

</style>
<template>

    <div class="fw-smarter-tree" v-bind:class="{'tree-table-parent-with-data':$refs.smarterTree&&($refs.smarterTree.store.states.data.length!=0)}">

        <fw-smarter-input-select
            class="smarter-tree-search-wrapper"
            style="width:100%"


            @inputChange="handleSearchChange"
            title="test title"
            :enable-create="true"
            placeholder="输入文字搜索"
            :data="destinationData"
            :loading="isLoadingDestination"
            :value="searchStr"
            labelKey="path"
            isShowKey="isShow"
        >
            <template slot-scope="scope">
                <span v-html="scope.row.path"></span>
            </template>

        </fw-smarter-input-select>


        <!--<el-input v-if="enableFilter" placeholder="输入文字搜索" v-model="searchStr" type="search" @change="handleSearchChange()"></el-input>-->


        <el-table ref="smarterTree" :data="data">

            <tree-tpl :vm="_self"></tree-tpl>







        </el-table>
        <!--<div>-->
        <!--aa-->
        <!--</div>-->
    </div>


</template>






<script>

    import treeGrid from '../../treeGrid/src/treeGrid'




    import treeTpl from '../../treeGrid/src/treeCommonTemplate'


export default{
        name:'fw-smarter-tree',
        components:{treeGrid,treeTpl},

    mixins:[treeGrid],
    props:{
            data:Array,
        enableFilter:{
                type:Boolean,
            default:false
        },
        filterMethod:{
            type:Function,
            default:function(item,string){
                return item[this.prop].toLowerCase().trim().includes(string.toLowerCase().trim())
            }
        },
    },
    data(){
            return {
                destinationData:[],
                isLoadingDestination:false,
                searchStr:'',
                searchStr:'',
                foo:'bar'
            }
    },
    methods:{

        // destinationRemoteMethod(query){
        //     console.log('remote method query:',query)
        //     query=query.trim()
        //     if(!query){
        //         return false
        //     }
        //
        //     // if(this.isLoadingDestination==false){
        //     //
        //     // }
        //
        //     this.isLoadingDestination=true
        //
        //     // this.BX.s.requestTMS('api/testTimeout')
        //
        //
        //
        //     setTimeout(()=>{
        //
        //         this.destinationData=[
        //             {
        //                 label:'label1',
        //                 value:'value1',
        //                 isShow:false
        //             },{
        //                 label:'label2',
        //                 value:'value2'
        //             },{
        //                 label:'label3',
        //                 value:'value3'
        //             }
        //         ]
        //
        //         this.isLoadingDestination=false
        //     },1000)
        // },
        handleSearchChange(val){
            console.log("handle search change")

            this.searchStr=val

            // if(this.searchStr.trim()==''){
            //     this.destinationData=[]
            // }else{
            //     this.destinationData=this.initialTreeCopier.filter((item)=>{
            //         return this.filterMethod(item,this.searchStr)
            //     })
            // }
            let destinationData=[]
            this.destinationData=this.initialTreeCopier.filter((item)=>{
                if(this.filterMethod(item,this.searchStr)){
                    destinationData.push({
                        path:item.$extra.path.toLowerCase().trim()
                            .replace(new RegExp(this.searchStr.toLowerCase().trim(),'g'),(str)=>{
                                return '<span class="smarter-tree-path-option">'+str+'</span>'
                            })
                    })
                }
            })
            this.destinationData=destinationData


            this.filterRows((row)=>{
                return this.filterMethod(row,this.searchStr)
            })
        }
    },

    // props:{
    //     ...treeGrid.props,
    //     data:Array
    // },
    // methods:{
    //     ...treeGrid.methods
    // },
    // data(){
    //   let baseData=treeGrid.data.call(this)
    //         return {
    //             ...baseData
    //         }
    // },
    // mounted(){
    //     treeGrid.mounted.apply(this)
    //     console.log('smarter tree mounted:',this)
    // }
}

</script>
