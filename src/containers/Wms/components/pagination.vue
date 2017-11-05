<template>
	<div class="paging">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handlePageCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="listQueryParam.pageSize"
            layout="total, sizes, prev, pager, next, jumper, slot"
            :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
	/**
	 *@method 分页组件
	 * @param {Function} handleSizeChange 分页 调整单页显示列表数量
	 * @param {Function} handlePageCurrentChange 切换当前页码时回调
	 * 
	 * 在两个方法中调用获取列表方法获取列表
	 * */
	export default {
		data(){
			return {
				
			}
		},
		props:{
        	// 获取列表查询条件分页部分
        	listQueryParam:{
        			type: Object,
        			default:function(){
        				return {
        					pageNumber:1, // 起始页面（从1开始）一个神奇的名字
			            	pageSize:10,
			            	pageStart:0 //起始条数（从0开始）
        				}
        			}
        			
            },
            // 分页
            pagination:{
            	type: Object,
        			default:function(){
        				return {
        					pageSizes:[10, 20, 50, 100,150,200], // 起始页面（从1开始）一个神奇的名字
			            	total:30,
			            	currentPage:1 //起始条数（从0开始）
			            }
        			}
            }
        },
		methods:{
			/*分页 调整单页显示列表数量*/
            handleSizeChange(val) {
                console.log(`size每页 ${val} 条`)
                this.listQueryParam.pageSize = val
                
                // 默认调整页面size后从第一页开始显示
                this.listQueryParam.currentPage = 1
                this.listQueryParam.pageStart = 0

                this.$emit('pagechange', this.listQueryParam)
            },
            /*切换当前页码时回调*/
            handlePageCurrentChange(val) {
                console.log(`cur当前页: ${val}`)
                this.listQueryParam.currentPage = val
                this.pagination.currentPage = val
				this.listQueryParam.pageNumber = val
				this.listQueryParam.pageStart = (val-1) * this.listQueryParam.pageSize // 分页接口设计不合理，还得前端传送总体第几条，或者是bug，不能这么搞啊。。。。

                this.$emit('pagechange', this.listQueryParam)
            },
		},
		mounted(){

		}
	}
</script>

<style>
</style>