<template>
    <el-row>
        <el-col :span="4">
            <div v-if="!isSchemaReady">
                <fw-smarter-input-select

                    :disabled="true"
                    placeholder="选择或输入查找查询方案"
                >
                </fw-smarter-input-select>
            </div>


            <fw-smarter-input-select
                :enable-create="true"
                @selectChange="handleSchemaChange"
                v-if="isSchemaReady"
                :data="list"
                placeholder="请选择查询方案"
            >
                <template slot-scope="scope">
                    <div style="min-width:400px;max-width:800px;">
                    <span :title="scope.row.name"
                          style="float:left;max-width:700px;text-overflow:ellipsis;overflow:hidden;">{{scope.row.name}}</span>

                        <el-button style="float:right;" type="danger" size="mini" icon="delete"></el-button>
                        <el-button style="float:right;margin-right:10px;" type="primary" size="mini" icon="edit"></el-button>
                    </div>
                </template>
            </fw-smarter-input-select>
        </el-col>
        <el-col :span="currentSchema!=null?16:0" style="padding:0 10px;">
            <div style="display:inline-block;" v-if="!isSchemaReady">
                加载查询方案中，请稍后...
            </div>
            <div style="display:inline-block;" v-if="isSchemaReady&&currentSchema">
                <el-form :inline="true" :model="queryMap">
                    <el-form-item v-if="'input datepicker'.split(' ').includes(item.dataType)" v-for="(item,index) in currentSchema.fields" :label="item.display">
                        <el-input v-model="queryMap[item.name]" :placeholder="'请输入'+item.display"></el-input>
                    </el-form-item>
                </el-form>
                <!--<div style="display:inline-block;" v-for="(item,index) in currentSchema.fields">-->
                <!---->
                <!--</div>-->
            </div>
        </el-col>
        <el-col :span="currentSchema!=null?4:20">
            <el-button style="float:right;" :disabled="!isSchemaReady" type="primary" icon="plus">查询方案</el-button>
        </el-col>






        <fw-vm-data-viewer :vm="_self" :keys="'list currentSchema queryMap'.split(' ')"></fw-vm-data-viewer>
    </el-row>
</template>
<style>

</style>
<script>
    import xhrManager from '../../xhrWrapper'
    import xhrSetting from '../../xhrSetting'
    import FwSmarterInputSelect from "../../smarterInputSelect/src/smarterInputSelect"

    let util={
        copy(obj) {
            if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
                return obj

            if (obj instanceof Date)
                var temp = new obj.constructor() //or new Date(obj)
            else
                var temp = obj.constructor()

            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    obj['isActiveClone'] = null
                    temp[key] = util.copy(obj[key])
                    delete obj['isActiveClone']
                }
            }

            return temp
        },
    }
    let getUrl=(url)=>{
        return xhrSetting.HOST.SMQRTER_QUERY+url
    }

    export default {
        components: {FwSmarterInputSelect},
        name:'fw-smarter-query',
        methods:{
            getQueryConditions(){
              return util.copy(this.queryMap)
            },
            handleSchemaChange(item,index){
                let queryMap={}
                item.fields.forEach((field)=>{
                    queryMap[field.name]=''
                })
                this.queryMap=queryMap
                this.currentSchema=item
            }
        },
        props:{
            businessKey:String,
            userId:Number
        },
        data(){
          return {
              isSchemaReady:false,
              currentSchema:null,
              queryMap:{

              },

              list:[]
          }
        },
        created(){
            xhrManager.callInterfaceAndSetData({
                type:'post',
                url:getUrl('/search/list')
            },this,'list')
                .then(()=>{
                    this.isSchemaReady=true
                })

        }
    }
</script>
