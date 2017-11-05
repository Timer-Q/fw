<style>
    .fw-tree-table .el-checkbox__inner::after,.fw-tree-table .el-checkbox__inner{
        transition:none
    }
</style>
<template>
    <div>
        <Component is="el-table-column" ref="tableColumn" :prop="vm.prop" :label="vm.label" :width="vm.width">
            <template slot-scope="scope">

            <span v-if="vm.isInitialDataTransformEnd" :style="{paddingLeft : vm.paddingLeft(scope.row)}">
                    <i @click.prevent="vm.toggleExpandChildsByIndex(scope.$index,true)" v-if="vm.hasChild(scope.row)" :class="vm.icon(scope.row)"></i>

                    <span v-bind:style="{marginLeft:vm.hasChild(scope.row)?'0':'18px'}" v-if="vm.enableCheck">
                        <el-checkbox :disabled="!vm.enableCheckedFolder&&vm.hasChild(scope.row)" @change="vm.handleTreeCheckboxClick(scope.row,scope.$index)" :indeterminate="scope.row.$extra.indeterminate" v-if="vm.enableCheckedMultiple" v-model="scope.row[vm.checkedKey]"></el-checkbox>
                        <el-radio :disabled="!vm.enableCheckedFolder&&vm.hasChild(scope.row)" v-if="!vm.enableCheckedMultiple" v-model="vm.radioTreeKeyModel" :label="scope.row[vm.treeKey]">
                            <span @click="vm.handleLabelClick(scope.row)">{{scope.row[vm.prop]}}</span>
                        </el-radio>
                        <span v-if="vm.enableCheckedMultiple" @click="vm.handleLabelClick(scope.row)">{{scope.row[vm.prop]}}</span>
                    </span>
                    <span v-bind:style="{marginLeft:vm.hasChild(scope.row)?'0':'18px'}" v-if="!vm.enableCheck">
                        <span @click="vm.handleLabelClick(scope.row)">{{scope.row[vm.prop]}}</span>
                    </span>

                </span>



            </template>
        </Component>
    </div>

</template>
<script>
    export default {
        props:{
            vm:Object
        },
        mounted(){

        }
    }
</script>
