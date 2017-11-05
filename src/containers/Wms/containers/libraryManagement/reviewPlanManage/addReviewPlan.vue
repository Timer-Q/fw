<template>
    <div class="wms-items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="save()"  v-bind:disabled="isDisabled">保存</el-button>
                    <i>|</i>
                    <el-button @click="cancel()">取消</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--主体内容  start-->
        <div ref="main">
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">盘点类型</span>

                    <el-select v-model="saveReviewPlan.reviewType" placeholder="盘点类型" v-bind:disabled="isDisabled">
                        <el-option
                            v-for="item in reviewTypeList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value" class="selectFontSize">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">货主</span>
                    <el-input type="text" v-model="saveReviewPlan.ownerId" class="license-number"
                              placeholder="货主" v-bind:readonly="isReadOnly"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库区用途</span>
                    <el-select v-model="saveReviewPlan.warehouseAreaUsage" placeholder="库区用途" v-bind:disabled="isDisabled">
                        <el-option
                            v-for="item in warahouseAreaUseAttrbuteList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value" class="selectFontSize">
                        </el-option>
                    </el-select>
                </div>
                <div class="inblock">
                    <span class="hspace">库区名称</span>
                    <el-input type="text" v-model="saveReviewPlan.warehouseAreaId" class="license-number"
                              placeholder="库区名称" v-bind:readonly="isReadOnly"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">库存范围值</span>
                    <el-input type="text" v-model="saveReviewPlan.minStock" class="license-number" placeholder="请输入"
                              v-bind:readonly="isReadOnly"></el-input>
                    -
                    <el-input type="text" v-model="saveReviewPlan.maxStock" class="license-number" placeholder="请输入"
                              v-bind:readonly="isReadOnly"></el-input>
                </div>
                <br/>
                <div class="inblock">
                    <input type="radio" v-model="saveReviewPlan.includeZero" v-bind:disabled="isDisabled"></input>
                    <span class="hspace">零库存是否参与盘点</span>
                </div>
            </div>
            <div class="inblock">
                <span class="hspace">备注</span>
                <el-input type="data" v-model="saveReviewPlan.remark" placeholder="备注" v-bind:readonly="isReadOnly"></el-input>
            </div>
        </div>
        <!--主体内容  end-->
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <el-button @click="addDetail()">新增明细</el-button>
                    <i>|</i>
                    <el-button @click="removeDatail()">删除</el-button>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->
        <!--表单  start-->
        <div class="information-list">
            <Table id="pastCodeTable"
                   :data="tableData"
                   ref="pastCodeTable"
                   @row-click='rowClick'
                   @selection-change="handleSelectionChange"
                   highlight-current-row border
                   style="width: 100%"
                   :default-sort="{prop: 'date', order: 'descending'}">
                <TableColumn type="index" label="序号" width="80"></TableColumn>
                <TableColumn type="selection" width="80"></TableColumn>
                <TableColumn prop="locationCode" label="货位编码" width="100"></TableColumn>
                <TableColumn prop="warehouseAreaName" label="库区名称" width=""></TableColumn>
            </Table>
        </div>
        <!--表单  end-->
        <!--分页    start-->
        <pagination :pagination='pagination' @pagechange='getList'></pagination>
        <!--分页    end-->
        <!--货位盘点 弹窗  start-->
        <el-dialog title="货位盘点" class="advancedQuery" :visible.sync="reviewByLocVisible">
            <!--传递platformId，注册cancel和saved事件-->
            <add-loc v-model="reviewPlanId" @cancel="reviewByLocVisible=false" @saved="reviewByLocVisible=false"></add-loc>
        </el-dialog>
        <!--货位盘点 弹窗  end-->
        <!--商品盘点 弹窗  start-->
        <el-dialog title="商品盘点" class="advancedQuery" :visible.sync="reviewBySkuVisible">
            <!--传递platformId，注册cancel和saved事件-->
            <add-sku v-model="reviewPlanId" @cancel="reviewBySkuVisible=false" @saved="reviewBySkuVisible=false"></add-sku>
        </el-dialog>
        <!--商品盘点 弹窗  end-->
    </div>
</template>
<script>
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
    import Vue from 'vue'
    import moment from 'moment'

    import pagination from '@Wms/components/pagination'
    import pageOperate from '@Wms/utils/pageOperate'

    import addSku from '@Wms/containers/libraryManagement/reviewPlanManage/addBySku.vue'
    import addLoc from '@Wms/containers/libraryManagement/reviewPlanManage/addByLoc.vue'

    import service from '@Wms/services/libraryManagement/reviewPlanManage/addReviewPlan.js'

    let _this = null
    let api = {
        getlist: '/wms-inside-server/reviewPlanDetail/getListWithPage',//主列表信息
        saveUrl: '/wms-inside-server/reviewPlan/save',//添加盘点计划
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        data() {
            return {
                listQueryParam: {
                    pageNumber: 0,
                    pageSize: 10,
                   reviewPlanId:''
                },
                saveReviewPlan: {
                    reviewType: '',
                    ownerId: '',
                    warehouseAreaUsage: '',
                    warehouseAreaId: '',
                    minStock: '',
                    maxStock: '',
                    includeZero: '',
                    remark: '',
                },
                reviewPlanId:'',
                isReadOnly: false,
                isDisabled: false,
                reviewByLocVisible: false,
                reviewBySkuVisible: false,
                // 分页
                pagination: {
                    total: 0,
                    //pageSizes:[10, 20, 50, 100,150,200], // 分页每页有多少
                    //currentPage:1, // 当前页码
                },

                reviewTypeList: [],//盘点计划类型枚举
                warahouseAreaUseAttrbuteList: [],//库区用途枚举
                ownerList: [],//货主集合
                warehouseAreaList: [],//库区集合
                tableData: [], //表单数据 数组
                multipleSelection: [],// 当前选择的数据项目
                curRow: {}, // 当前选中行数据
                value: '',
            }
        },
        components: {
            pagination,
            'add-sku': addSku,
            'add-loc': addLoc
        },
        methods: {
            //包括：refresh 、getList、rowClick、getDetailList、handleSelectionChange
            ...pageOperate,
            save() {
                // 先校验数据是否有效
                if (_this.saveReviewPlan.reviewType.length < 1) {
                    _this.$alert('请选择盘点类型！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.saveReviewPlan.ownerId.length < 1) {
                    _this.$alert('请选择货主 ！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })
                    return
                }
                if (_this.saveReviewPlan.includeZero == true) {
                    _this.saveReviewPlan.includeZero = 2
                }
                if (_this.saveReviewPlan.includeZero == false) {
                    _this.saveReviewPlan.includeZero = 1
                }
                _this.$request({
                    url: api.saveUrl,
                    context: _this, //this
                    sendData: _this.saveReviewPlan,
                    successCallback: (_this, response) => {
                        console.log('save:', response)
                        _this.$alert('操作成功', '操作成功！！！', {
                            type: 'success',
                            closeOnClickModal: true,
                            showConfirmButton: true,
                            showCancelButton: true
                        })
                        _this.$emit('saved')
                        _this.isReadOnly = true
                        _this.isDisabled = true
                        _this.reviewPlanId=response.id
                        _this.listQueryParam.reviewPlanId=response.id
                    },
                    failCallback: (_this, e) => {
                        console.error('save:', e)
                        _this.$alert(e, e, {
                            type: 'warning',
                            closeOnClickModal: true
                        })
                    }
                })
            },
            addDetail() {
                if( _this.saveReviewPlan.reviewType ==1){
                    _this.reviewByLocVisible=true
                }
                if ( _this.saveReviewPlan.reviewType ==2){
                    _this.reviewBySkuVisible=true
                }
                _this.getList()
            },
            removeDetail() {
                if (!_this.checkOne()) {
                    return
                }
                var requestData = {
                    "id": _this.multipleSelection[0].id,
                    "warehouseId": 2000
                }
                _this.$request({
                    url: '/wms-inside-server/reviewPlanDetail/delete',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.$alert(response)
                        _this.getList()
                    }
                })
                _this.getList()
            },
            getEnum() {
                var requestData = [{
                    "key": "reviewType"
                }, {
                    "key": "warahouseAreaUseAttrbuteEnum"
                }]
                _this.$request({
                    url: '/wms-pub-server/public/getEnums',
                    context: _this,
                    sendData: requestData,
                    successCallback: (_this, response) => {
                        _this.reviewTypeList = response[0].enumList
                        _this.warahouseAreaUseAttrbuteList = response[1].enumList
                    }
                })
            }
        },
        mounted() {
            this.getEnum()
        }
    }
</script>
