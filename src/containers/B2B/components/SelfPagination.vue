<template>
  <div>
      <Pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="100"
                  layout="sizes,jumper,total,prev, pager, next, "
                  :total="400"
                  class="f_r"
      >
      </Pagination>
  </div>
</template>
<script>
	export default {
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            }
        },
        data() {
            return {
                currentPage4: 4
            }
        }
	}
</script>
<style scoped lang="scss">
    .el-input__inner {
        margin-left: 10px;
    }

    li.number {
        margin: 0 3px;
        border: 1px solid #ccc;
    }

    .el-pager li.active + li {
        border-left: 1px solid #ccc;
    }
    .el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
        border: 1px solid #ccc;
        margin: 0 3px;

    }
    .el-pagination button.btn-prev,.el-pagination button.btn-next{
        border: 1px solid #ccc;
        margin: 0 3px;

    }
    .el-pager li.active{
        margin: 0 3px;
    }
    /*分页方格圆角*/
    ul.el-pager li{
        border-radius: 3px;
    }
    .el-pagination .btn-prev,.el-pagination .btn-next,.el-pagination__editor,.el-pagination__sizes{
        border-radius: 3px;
    }

</style>
