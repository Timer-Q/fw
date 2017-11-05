<template>
	<div class="form-select">
	  	<label>单据网点</label>
			<tree-select
	          :treeData="treeData"
	          :treeProps="treeProps"
	          v-model="treeSelectArr"
	          :multiple="true"
	          placeholder=""
	          @errorCallback="showTreeError"
	          @setSelectedId="setSelectedId">
	      </tree-select>
  </div>

</template>
<script>
	import treeSelect from '../tree/tree.vue'
    import department from '../tree/department.js'

    export default{
    	data(){
    		return{
    			treeSelected:'',
		        treeSelectArr:[],
		        treeData:department,
		        treeProps:{
		            label: "name",
		            children: "childDepts",
		            level:"deptLevel"
		        },
		        i:'',
    		}
    	},
    	components:{
		    treeSelect
		},
		methods:{

			/*单据网点*/
    	   setSelectedId(val){
		      if(val instanceof Array){
		        this.treeSelectArr = val
		      }else{
		        this.treeSelected = val
		      }
		    },
		    showTreeError(error){
		      Message.info(error.message)
		    },

		    addhi(){
		    	this.hide=!this.hide
		    },
		    taggle(index){
		    	this.active=index
		    },
		    sum(e){
		    	this.keep+=e.target.innerText
		    	console.log(this.keep)
		    },
		},

		mounted(){
			// 单据网点
		  	this.i = 75170
		      setInterval(function () {
		          this.i+=1
		      }.bind(this),2000)
			}
		}


</script>

<style lang="less" scoped>
	label{
			font-size: 12px;
			color: #333;
		}

		.form-select{
			width: 170px;
			float: left;
			margin-left: 8px;
			position: relative;

		}
</style>
