<template>
  <div ref="OutBox">
      <div class="projection">
        <el-button-group>
            <el-button @click="clickByEdit('add')">新增派车单</el-button>
        </el-button-group>
        <el-button-group>
            <el-button @click="clickByEdit('update')">修改</el-button>
        </el-button-group>
        <!--配置城配模块，则显示发布按钮，不配置城配模块，则不显示发布按钮  -->
        <el-button-group>
            <el-button @click="dispatchStatusRelease">发布</el-button>
        </el-button-group>
        <el-button-group>
            <el-button>作废</el-button>
        </el-button-group>
        <el-button-group>
            <el-button :plain="true" @click="deleteDispatcher()" >删除</el-button>
        </el-button-group>
        <el-button-group>
            <el-button @click="clickByEdit('toVoidList')">派车单明细</el-button>
        </el-button-group>
        <el-button-group>
            <el-button>生成卸货单</el-button>
        </el-button-group>
        <el-button-group>
            <el-button>导出</el-button>
        </el-button-group>
    </div>
      <el-tabs v-model="viewStatus.currentPanel" type="card" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all" >
                    <div>
                        <!--查询条件-->
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                            <!--查询方案弹出层开始-->
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided>黄金糕
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>狮子头
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>螺蛳粉
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>双皮奶
                                    <span>
                                <i class="iconfont icon-xiugai"></i>
                                <i class="iconfont icon-guanbi"></i>
                                </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                            </el-dropdown-menu>
                            <!--查询方案弹出层结束-->
                        </el-dropdown>
                        <!-- 制单日期 -->
                        <el-form-item>
                            <el-select v-model="selectTime" placeholder="制单日期" @change="ch" style="width:130px">
                                <el-option
                                    v-for="item in selectTimeItems"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 选择日期一 -->
                        <el-form-item v-if="whichDate">
                            <el-form-item style="margin-right:0;width:130px;">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="startCreateTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <!--<el-form-item class="line" :span="2">-</el-form-item>-->
                            <el-form-item style="width:130px">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="endCreateTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                         <!-- 选择日期二 -->
                        <el-form-item v-else>
                            <el-form-item style="margin-right:0">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch"
                                                v-model="startDispatcherTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <el-form-item>
                                <el-date-picker type="date" placeholder="" @change="ch" v-model="endDispatcherTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <!-- 派车网点 -->
                        <el-form-item label="派车网点" label-width="70px">
                            <el-select v-model="branchId" placeholder="" style="width:130px">
                                <el-option label="广州营业部" value="0"></el-option>
                                <el-option label="上海营业部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 司机姓名 -->
                        <el-form-item label="司机姓名" label-width="70px">
                            <el-input v-model="driverName" @change="ch" style="width:130px"></el-input>
                        </el-form-item>
                        <!-- 派车批次 -->
                        <el-form-item label="派车批次" label-width="70px">
                            <el-input v-model="batchCode" @change="ch" style="width:130px"></el-input>
                        </el-form-item>
                        <!-- 查询 -->
                        <el-form-item>
                            <el-button @click="selectByCondition">查询</el-button>
                        </el-form-item>
                        <!-- 高级查询 -->
                        <el-form-item>
                            <a href="javascript:;">高级查询</a>
                        </el-form-item>

                    </div>

                    <div class="dataList">
                        <el-table :data="tableDataAll.all"
                                  :highlight-current-row="true"
                                  border show-summary
                                  :summary-method="hj"
                                  @row-click="rowClick"
                                  @current-change="handleCurrentChange"
                        >
                            <el-table-column type="index" width="80" label="序号" header-align="center"></el-table-column>
                            <el-table-column prop="batchCode" sortable width="180" label="派车批次" header-align="center">
                                <template slot-scope="scope">
                                    <a href="javascript:;" class="ydh">{{scope.row.batchCode}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column sortable label="派车类型" width="105" header-align="center" sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.dispatcherType===1">
                                        提货
                                    </span>
                                    <span v-if="scope.row.dispatcherType===2">
                                        送货
                                    </span>
                                    <span v-if="scope.row.dispatcherType===3">
                                        提送
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="branchName" label="派车网点" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column label="状态" sortable header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.status === 5 ? "已发车" : "未发车"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="发布状态" sortable width="105" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.releaseStatus ? "已发布" : "未发布"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="车辆类型" width="105" header-align="center">
                                <template slot-scope="scope">
                                    <span v-for="item in cllx">
                                        <span v-if="scope.row.vehicleType===item.itemCode">
                                           {{item.itemName}}
                                        </span>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="carrierName" label="承运商名称" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column prop="vehicleNo" label="车牌号码" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column prop="driverName" label="司机姓名" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column prop="phoneNo" label="手机号码" sortable width="130" header-align="center">
                            </el-table-column>
                            <el-table-column prop="cost" label="派车成本" sortable width="105" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalWaybillNum" label="总票数" sortable width="100"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="totalGoodsNum" label="总件数" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalWeight" label="总重量" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalVolume" label="总体积" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalFreight" label="实际运费">
                            </el-table-column>
                            <el-table-column prop="totalOutputValue" label="产值" sortable width="100"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="totalBusFee" label="业务费" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="weightLoading" label="装载率(kg)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="volumeLoading" label="装载率(m³)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleWeight" label="车辆皮重(kg)" sortable width="130"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleModels" label="车型" sortable header-align="center">
                            </el-table-column>
                            <el-table-column prop="vehicleLength" label="车辆长度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleWidth" label="车辆宽度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleHeight" label="车辆高度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column label="发车时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.dispatcherTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="loadWaybillNum" label="已装票数" sortable width="105"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="unloadWaybillNum" label="卸货票数">
                            </el-table-column>
                            <el-table-column prop="signNum" label="签收票数" sortable width="105" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="unSignNum" label="未签收票数" sortable width="115" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" sortable header-align="center">
                            </el-table-column>
                            <el-table-column prop="totalMileage" label="里程数(km)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="createUserName" label="制单人" sortable width="100"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="制单时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="releaseUser" label="发布人" sortable width="100" header-align="center">
                            </el-table-column>
                            <el-table-column label="发布时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.releaseTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="updateUserName" label="修改人" sortable width="100"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="修改时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.updateTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="confirmUserName" label="发车确认人" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="发车确认时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.confirmTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cancelConfirmUserName" label="取消发车人" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="取消发车时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.cancelConfirmTime | formatDate}}</span>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    <Pagination v-show="tableDataAll.all.length!=0"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChangepage"
                                :current-page="currentPage"

                                :page-size="2"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tableDataAll.all.length"
                                class="f_r"
                    >
                    </Pagination>
                </el-tab-pane>
                <el-tab-pane label="未发车" name="notDispatch">
                    <div>
                        <!--查询条件-->
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                            <!--查询方案弹出层开始-->
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided>黄金糕
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>狮子头
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>螺蛳粉
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>双皮奶
                                    <span>
                                <i class="iconfont icon-xiugai"></i>
                                <i class="iconfont icon-guanbi"></i>
                                </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                            </el-dropdown-menu>
                            <!--查询方案弹出层结束-->
                        </el-dropdown>
                        <!-- 制单日期 -->
                        <el-form-item>
                            <el-select v-model="selectTime" placeholder="制单日期" @change="ch" style="width:130px">
                                <el-option
                                    v-for="item in selectTimeItems"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 选择日期一 -->
                        <el-form-item v-if="whichDate">
                            <el-form-item style="margin-right:0;width:130px;">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="startCreateTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <!--<el-form-item class="line" :span="2">-</el-form-item>-->
                            <el-form-item style="width:130px">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="endCreateTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                         <!-- 选择日期二 -->
                        <el-form-item v-else>
                            <el-form-item style="margin-right:0">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch"
                                                v-model="startDispatcherTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <el-form-item>
                                <el-date-picker type="date" placeholder="" @change="ch" v-model="endDispatcherTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <!-- 派车网点 -->
                        <el-form-item label="派车网点" label-width="70px">
                            <el-select v-model="branchId" placeholder="" style="width:130px">
                                <el-option label="广州营业部" value="0"></el-option>
                                <el-option label="上海营业部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 司机姓名 -->
                        <el-form-item label="司机姓名" label-width="70px">
                            <el-input v-model="driverName" @change="ch" style="width:130px"></el-input>
                        </el-form-item>
                        <!-- 派车批次 -->
                        <el-form-item label="派车批次" label-width="70px">
                            <el-input v-model="batchCode" @change="ch" style="width:130px"></el-input>
                        </el-form-item>
                        <!-- 查询 -->
                        <el-form-item>
                            <el-button @click="selectByCondition">查询</el-button>
                        </el-form-item>
                        <!-- 高级查询 -->
                        <el-form-item>
                            <a href="javascript:;">高级查询</a>
                        </el-form-item>

                    </div>
                    <div class="dataList">
                        <el-table :data="tableDataAll.notDispatch" :highlight-current-row="true" border show-summary
                                  :summary-method="hj" style="width: 100%" @row-click="rowClick">
                            <el-table-column type="index" width="80" label="序号" header-align="center"></el-table-column>
                            <el-table-column prop="batchCode" sortable width="180" label="派车批次" header-align="center">
                                <template slot-scope="scope">
                                    <a href="javascript:;" class="ydh">{{scope.row.batchCode}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column sortable label="派车类型" width="105" header-align="center" sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.dispatcherType===1">
                                        提货
                                    </span>
                                    <span v-if="scope.row.dispatcherType===2">
                                        送货
                                    </span>
                                    <span v-if="scope.row.dispatcherType===3">
                                        提送
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="branchName" label="派车网点" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column label="状态" sortable header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.status === 5 ? "已发车" : "未发车"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="发布状态" sortable width="105" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.releaseStatus ? "已发布" : "未发布"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="车辆类型" width="105" header-align="center">
                                <template slot-scope="scope">
                                    <span v-for="item in cllx">
                                        <span v-if="scope.row.vehicleType===item.itemCode">
                                           {{item.itemName}}
                                        </span>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="carrierName" label="承运商名称" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column prop="vehicleNo" label="车牌号码" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column prop="driverName" label="司机姓名" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column prop="phoneNo" label="手机号码" sortable width="130" header-align="center">
                            </el-table-column>
                            <el-table-column prop="cost" label="派车成本" sortable width="105" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalWaybillNum" label="总票数" sortable width="100"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="totalGoodsNum" label="总件数" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalWeight" label="总重量" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalVolume" label="总体积" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalFreight" label="实际运费">
                            </el-table-column>
                            <el-table-column prop="totalOutputValue" label="产值" sortable width="100"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="totalBusFee" label="业务费" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="weightLoading" label="装载率(kg)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="volumeLoading" label="装载率(m³)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleWeight" label="车辆皮重(kg)" sortable width="130"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleModels" label="车型" sortable header-align="center">
                            </el-table-column>
                            <el-table-column prop="vehicleLength" label="车辆长度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleWidth" label="车辆宽度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleHeight" label="车辆高度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column label="发车时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.dispatcherTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="loadWaybillNum" label="已装票数" sortable width="105"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="unloadWaybillNum" label="卸货票数">
                            </el-table-column>
                            <el-table-column prop="signNum" label="签收票数" sortable width="105" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="unSignNum" label="未签收票数" sortable width="115" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" sortable header-align="center">
                            </el-table-column>
                            <el-table-column prop="totalMileage" label="里程数(km)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="createUserName" label="制单人" sortable width="100"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="制单时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="releaseUser" label="发布人" sortable width="100" header-align="center">
                            </el-table-column>
                            <el-table-column label="发布时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.releaseTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="updateUserName" label="修改人" sortable width="100"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="修改时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.updateTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="confirmUserName" label="发车确认人" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="发车确认时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.confirmTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cancelConfirmUserName" label="取消发车人" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="取消发车时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.cancelConfirmTime | formatDate}}</span>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    <Pagination v-show="tableDataAll.all.length!=0"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChangepage"
                                :current-page="currentPage"

                                :page-size="2"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tableDataAll.all.length"
                                class="f_r"
                    >
                    </Pagination>
                </el-tab-pane>
                <el-tab-pane label="已发车" name="dispatched">
                    <div>
                        <!--查询条件-->
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            查询方案<i class="iconfont icon-fangan"></i>
                            </span>
                            <!--查询方案弹出层开始-->
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided>黄金糕
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>狮子头
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>螺蛳粉
                                    <span>
                            <i class="iconfont icon-xiugai"></i>
                            <i class="iconfont icon-guanbi"></i>
                            </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>双皮奶
                                    <span>
                                <i class="iconfont icon-xiugai"></i>
                                <i class="iconfont icon-guanbi"></i>
                                </span>
                                </el-dropdown-item>
                                <el-dropdown-item divided class="newPlan">新增方案</el-dropdown-item>
                            </el-dropdown-menu>
                            <!--查询方案弹出层结束-->
                        </el-dropdown>
                        <!-- 制单日期 -->
                        <el-form-item>
                            <el-select v-model="selectTime" placeholder="制单日期" @change="ch" style="width:130px">
                                <el-option
                                    v-for="item in selectTimeItems"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 选择日期一 -->
                        <el-form-item v-if="whichDate">
                            <el-form-item style="margin-right:0;width:130px;">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="startCreateTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <!--<el-form-item class="line" :span="2">-</el-form-item>-->
                            <el-form-item style="width:130px">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch" v-model="endCreateTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                         <!-- 选择日期二 -->
                        <el-form-item v-else>
                            <el-form-item style="margin-right:0">
                                <el-date-picker type="date" placeholder="选择日期" @change="ch"
                                                v-model="startDispatcherTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <el-form-item>
                                <el-date-picker type="date" placeholder="" @change="ch" v-model="endDispatcherTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <!-- 派车网点 -->
                        <el-form-item label="派车网点" label-width="70px">
                            <el-select v-model="branchId" placeholder="" style="width:130px">
                                <el-option label="广州营业部" value="0"></el-option>
                                <el-option label="上海营业部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 司机姓名 -->
                        <el-form-item label="司机姓名" label-width="70px">
                            <el-input v-model="driverName" @change="ch" style="width:130px"></el-input>
                        </el-form-item>
                        <!-- 派车批次 -->
                        <el-form-item label="派车批次" label-width="70px">
                            <el-input v-model="batchCode" @change="ch" style="width:130px"></el-input>
                        </el-form-item>
                        <!-- 查询 -->
                        <el-form-item>
                            <el-button @click="selectByCondition">查询</el-button>
                        </el-form-item>
                        <!-- 高级查询 -->
                        <el-form-item>
                            <a href="javascript:;">高级查询</a>
                        </el-form-item>

                    </div>
                    <div class="dataList">
                        <el-table :data="tableDataAll.dispatched" :highlight-current-row="true" border show-summary
                                  :summary-method="hj" style="width: 100%" @row-click="rowClick">
                            <el-table-column type="index" width="80" label="序号" header-align="center"></el-table-column>
                            <el-table-column prop="batchCode" sortable width="180" label="派车批次" header-align="center">
                                <template slot-scope="scope">
                                    <a href="javascript:;" class="ydh">{{scope.row.batchCode}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column sortable label="派车类型" width="105" header-align="center" sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.dispatcherType===1">
                                        提货
                                    </span>
                                    <span v-if="scope.row.dispatcherType===2">
                                        送货
                                    </span>
                                    <span v-if="scope.row.dispatcherType===3">
                                        提送
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="branchName" label="派车网点" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column label="状态" sortable header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.status === 5 ? "已发车" : "未发车"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="发布状态" sortable width="105" header-align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.releaseStatus ? "已发布" : "未发布"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="车辆类型" width="105" header-align="center">
                                <template slot-scope="scope">
                                    <span v-for="item in cllx">
                                        <span v-if="scope.row.vehicleType===item.itemCode">
                                           {{item.itemName}}
                                        </span>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="carrierName" label="承运商名称" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column prop="vehicleNo" label="车牌号码" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column prop="driverName" label="司机姓名" sortable width="105" header-align="center">
                            </el-table-column>
                            <el-table-column prop="phoneNo" label="手机号码" sortable width="130" header-align="center">
                            </el-table-column>
                            <el-table-column prop="cost" label="派车成本" sortable width="105" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalWaybillNum" label="总票数" sortable width="100"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="totalGoodsNum" label="总件数" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalWeight" label="总重量" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalVolume" label="总体积" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="totalFreight" label="实际运费">
                            </el-table-column>
                            <el-table-column prop="totalOutputValue" label="产值" sortable width="100"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="totalBusFee" label="业务费" sortable width="100" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="weightLoading" label="装载率(kg)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="volumeLoading" label="装载率(m³)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleWeight" label="车辆皮重(kg)" sortable width="130"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleModels" label="车型" sortable header-align="center">
                            </el-table-column>
                            <el-table-column prop="vehicleLength" label="车辆长度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleWidth" label="车辆宽度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="vehicleHeight" label="车辆高度(m)" sortable width="125"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="dispatcherTime" label="发车时间" sortable width="140"
                                             header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.dispatcherTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="loadWaybillNum" label="已装票数" sortable width="105"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="unloadWaybillNum" label="卸货票数">
                            </el-table-column>
                            <el-table-column prop="signNum" label="签收票数" sortable width="105" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="unSignNum" label="未签收票数" sortable width="115" header-align="center"
                                             align="right">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" sortable header-align="center">
                            </el-table-column>
                            <el-table-column prop="totalMileage" label="里程数(km)" sortable width="120"
                                             header-align="center" align="right">
                            </el-table-column>
                            <el-table-column prop="createUserName" label="制单人" sortable width="100"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="制单时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="releaseUser" label="发布人" sortable width="100" header-align="center">
                            </el-table-column>
                            <el-table-column label="发布时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.releaseTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="updateUserName" label="修改人" sortable width="100"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="修改时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.updateTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="confirmUserName" label="发车确认人" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="发车确认时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.confirmTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cancelConfirmUserName" label="取消发车人" sortable width="115"
                                             header-align="center">
                            </el-table-column>
                            <el-table-column label="取消发车时间" sortable width="140" header-align="center" align="right">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.cancelConfirmTime | formatDate}}</span>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    <Pagination v-show="tableDataAll.all.length!=0"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChangepage"
                                :current-page="currentPage"

                                :page-size="2"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tableDataAll.all.length"
                                class="f_r"
                    >
                    </Pagination>
                </el-tab-pane>
            </el-tabs>
        <tooltip name="costorder">
          <el-button size="mini" @click="Charevise">修改</el-button>
          <el-button size="mini" @click="deleDispatcher">删除</el-button>
          <el-button size="mini" @click="toVoidList">派车单明细</el-button>
          <el-button size="mini"  @click="Chadetail">详情</el-button>
      </tooltip>
      <!--删除确认框 -->
        <Dialog
            :title="promptTiele"
            :visible.sync="removeChannelVisible"
            size="tiny"
        >
            <span>{{promptContent}}</span>
            <span slot="footer" class="dialog-footer">
                <Button @click="removeChannelVisible=false">取 消</Button>
                <Button type="primary" @click="delsure">确 定</Button>
            </span>
        </Dialog>

        <div class="delState">{{delState}}</div>
  </div>
</template>
<script>
    import screenScrollMixins from '@Tms/mixins/screenScrollMixins.js'
    import dispatcher from '@Tms/services/dispatcher/dispatcher.js'


    export default {
        mixins: [screenScrollMixins],
        data(){
            return {
                //  卸货单
                unloadingOrder:false,
                 // 提示
                promptTiele:"",
                promptContent:"",
                 // 打开的二级tab集合
                tabsList: [],
                tag:'tms_channement',
                // 分页
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                //总共多少条数据
                listTotal:0,
                // 默认当前第一页
                currentPage:1,
                interfaceData: {},
                formData: {},
                viewStatus: {
                    currentPanel: 'all'
                },
                queryParams: {
                    selectTime: null
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableDataAll: {
                    all: [],
                    notDispatch: [],
                    dispatched: []
                },
                isCheckBox: false,
                dispatcherData: null,
                selectTime: null,
                branchId: null,
                driverName: '',
                batchCode: '',
                startCreateTime: '',
                endCreateTime: '',
                startDispatcherTime: '',
                endDispatcherTime: '',
                selectTimeItems: [{
                    value: 0,
                    label: '制单日期'
                }, {
                    value: 1,
                    label: '发车日期'
                }],
                whichDate: true,
                status: null,
                currentPage: 1,
                pageSize: 25,
                cllx: [],
                 // 确认删除
                 removeChannelVisible:false,
                 confirmDeletion:false,
                 delState:'',
            }
        },
        methods: {
             // 删除二级tab
            /*detailTag详情页标签 detailData详情页数据*/
            removeTab(targetName,detailTag,detailData){
                console.log(targetName, detailTag, detailData)
                let tabs = this.tabsList
                let activeName = this.selectTabCode
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.tag === targetName) {

                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            /*如果detailTag存在,说明是要关掉修改页面并跳转回到之前的详情页面detailData*/
                            activeName = detailTag?detailTag:nextTab ? nextTab.tag : this.tag
                        }
                    })
                }
                this.selectTabCode = activeName
                this.tabsList = tabs.filter(tab => tab.tag !== targetName)
                if(detailData){
                     this.tabsList.forEach(function (item) {
                        if(item.tag==detailTag){
                            /*更新渠道信息*/
                            item.channelDetail={...item.channelDetail,...detailData.channelDetail}
//                            console.log(item)

                        }
                    })
                }
            },
            // 添加二级tab
            clickByEdit(state,row,data){
                // 选中项
                let dispatcherData=this.$refs.msglist.dispatcherData
                let _this=this
                let obj = {
                    name: (state == "add" ? "新增派车单" : /update/.test(state)? "修改" : /toVoidList/.test(state)? "派车单明细":"详情":"发布"),
                    tag: `${this.tag}_` + state,
                    detail:data
                }
                 // 保存当前tag
                this.selectTabCode = obj.tag
                // 判断新增页
                if(obj.name=="新增派车单"){
                    // 判断新增页是否打开
                    for (let i = 0; i < this.tabsList.length; i++) {
                        if (this.tabsList[i].tag == obj.tag) {
                            return
                        }
                   }
                    this.tabsList.push(obj)
                }else{
                    // 判断是否有选中项
                    if(!dispatcherData){
                        this.selectTabCode = this.tag
                        this.deleteChannel('至少选中一条')
                        return
                    }
                    // 显示当前选中单
                    obj.name=dispatcherData.batchCode+"  "+obj.name
                    obj.tag=dispatcherData.batchCode+"  "+obj.tag
                    // 判断当前选中单是否存在
                    for (let i = 0; i < this.tabsList.length; i++) {
                        if (this.tabsList[i].name == obj.name) {
                            return
                        }
                    }
                    // 判断派车单状态是否可以修改
                    if(dispatcherData.status!==5){
                        // 重新保存当前tag
                        this.selectTabCode = obj.tag
                        this.tabsList.push(obj)
                    }else{
                        // 可以生成卸货单
                        this.unloadingOrder=true
                        this.selectTabCode = this.tag
                        this.deleteChannel('已发车，不允许修改！')
                    }
               }
           },
            buttonState(state){
                this.state=state
            },
            /*
             /*点击删除按钮
            deleteChannel(){
                let del=document.querySelector(".delState")
                let deldlog=document.querySelector(".el-dialog__wrapper")
                console.log(this.val)
                if(this.val!=''){
                    this.val.forEach((item)=>{
                        if(item.routeState==true){
                                setTimeout(function(){//定时器
                                    del.style="display:none"
                                },3000)//设置三千毫秒即3秒

                            del.style="display:block"
                           this.delState=`选中的数据包含有启用数据，不能删除！`
                            this.val.splice(0,this.val.length)
                            return false
                        }else{
                            console.log("keshanchu")
                            deldlog.style="display:block"
                        }
                    })
                }else{
                    setTimeout(function(){//定时器
                        del.style="display:none"
                    },3000)//设置三千毫秒即3秒

                    del.style="display:block"
                    this.delState=`请选择要删除的记录！`
                    return false
                }
            },
            */
            getVal(val){
                this.val = val
            },
            // 弹框确认
            delsure(){
                let deldlog=document.querySelector(".el-dialog__wrapper")
                deldlog.style="display:none"
                this.removeChannelVisible=false
                this.confirmDeletion=true
                if(this.promptTiele==="删除提示"){
                     // 删除
                     this.selectedDispatcher()
                }else if(this.promptTiele==="发布提示"){
                    // 发布
                    this.releaseDispatcher()
                }

            },
            //删除派车单
            async selectedDispatcher(){
                let _this = this
                if(this.confirmDeletion){
                    const data = await dispatcher.delDispatcher(_this.$refs.msglist.dispatcherData.id)
                    console.log(data.status)
                    if (data.status == 200) {
                        this.deleteChannel("删除成功")
                    } else {
                        this.deleteChannel("删除失败")
                    }
                }
            },
            //发布派车单
            async releaseDispatcher(){
                let _this = this
                if(this.confirmDeletion){

                    const data = await dispatcher.delDispatcher(_this.$refs.msglist.dispatcherData.id)
                    console.log(data.status)
                    if (data.status == 200) {
                        this.deleteChannel("发布成功")
                    } else {
                        this.deleteChannel("发布失败")
                    }
                }
            },
            // 判断是否选择派车单
            deleteDispatcher(){
                let _this = this
                //如果没有选中
                if (!_this.$refs.msglist.dispatcherData) {
                    this.deleteChannel('请选择要删除的记录！')
                    return
                }
                else {
                    //状态等于“未发车”  and  发布状态等于空值或未发布(配置城配模块时添加该判断条件)
                   if(_this.$refs.msglist.dispatcherData.status!==5){
                       this.removeChannelVisible=true
                       this.promptTiele="删除提示"
                        this.promptContent="确定删除派车单？"
                    }
                   else{
                       // 可以生成卸货单
                        this.unloadingOrder=true
                        this.deleteChannel('已发车，不允许删除！')
                   }
                }
            },
            // 提示框
            deleteChannel(str) {
                let del=document.querySelector(".delState")
                let deldlog=document.querySelector(".el-dialog__wrapper")
                setTimeout(function(){//定时器
                    del.style="display:none"
                },3000)//设置三千毫秒即3秒

                del.style="display:block"
                this.delState=str
                return false
            },
            //  点击发布按钮
            dispatchStatusRelease(){
                //状态等于“未发车”  and  发布状态等于空值或未发布(配置城配模块时添加该判断条件)
                if(this.$refs.msglist.dispatcherData){
                    // 判断发布状态
                    console.log(this.$refs.msglist.dispatcherData.status)
                    if(this.$refs.msglist.dispatcherData.status!==5){
                        this.removeChannelVisible=true
                        this.promptTiele="发布提示"
                        this.promptContent="确定发布？"
                    }else{
                        this.deleteChannel('发布失败')
                    }
                }else{
                    this.deleteChannel('至少选中一条')
                }
            },
            // 分页   一页显示多少条
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            // 当前页
            handleCurrentChangepage(val) {
                console.log(`当前页: ${val}`)
            },
            Charevise(){
                this.$emit('Charevise','update')
            },
            // 跳转详情页面
            Chadetail(){
                this.$emit('Chadetail','detail')
            },
            deleDispatcher(){
                 this.$emit('deleDispatcher')
            },
            // 跳转派车单明细
            toVoidList(){
                this.$emit('toVoidList','toVoidList')
            },
            ch(){
                console.log("ch", this.selectTime)
                console.log("startCreateTime", this.startCreateTime)
                console.log("endCreateTime", this.endCreateTime)
                console.log("startDispatcherTime", this.startDispatcherTime)
                console.log("endDispatcherTime", this.endDispatcherTime)
                console.log("driverName", this.driverName)
                console.log("batchCode", this.batchCode)
                if (this.selectTime === 1) {
                    this.whichDate = false
                    this.startCreateTime = ''
                    this.endCreateTime = ''
                }
                else {
                    this.whichDate = true
                    this.startDispatcherTime = ''
                    this.endDispatcherTime = ''
                }
            },
            //表格底部合计
            hj(param){
//                console.log("-----------------",param)
                const current = this
                const sums = [], len = 0
                const {columns, data} = param

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计'
                        return
                    }
                    let sum = 0

                    const values = data.map(item => {
                        sum++
                        let val = item[column.property]
                        if (column.property == "phoneNo") {
//                            val = item.batchCode
                            val = NaN
                        }
//                        else{
//
//                        }
                        return Number(val)
                    })
                    sums[current.isCheckBox ? 2 : 1] = sum + "笔"
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                                return prev + curr
                            }
                        }, 0)
                    }


                })

                return sums
            },
            async handleClick(tab, event) {
                let _this = this
//                let status = ""
//                this.isCheckBox = false
                this.tabName = tab ? tab.name : "all"
                switch (this.tabName) {
                    case "all":
                        this.status = 0
                        break
                    case "notDispatch":
                        this.status = 4
                        break
                    case "dispatched":
                        this.status = 5
                        break
                }
                const params = {
                    status: _this.status
                }
                console.log(this.status, 'status------------')
                try {
                    const data = await dispatcher.dispatcherList(params)
                    console.log(data, 'data------------------------')
                    if (data.status == 200) {
                        const result = data.data.result
                        console.log(result, '列表结果')
                        // 赋值tableData
                        _this.tableDataAll.all = result
                        console.log(_this.tableDataAll.all, '全部')
//                        this.tableContent = []
//                        result.list.forEach((item)=>{
//                            this.tableContent.push(item)
//                        })
//                        // 赋值总条数
//                        this.page.total = result.total
//                        // 总页数
//                        this.page.pages = result.pages
                    } else {
                        console.log(1)
                    }
//                    this.loading = false
                }
                catch (e) {
                    console.log(e)
                }
               if(this.tabName=='all'){
                   this.isCheckBox = true
               }
//                this.BX.s.tmsPromiseAll([
//                    this.BX.s.callInterfaceAndSetData({
//                            url:'/dispatcher/getList',
//                            type:'post',
//                            data:{
// //                                "currentPage": 0,
// //                                "dynamicKey": [
// //                                    "string"
// //                                ],
// //                                "dynamicValue": [
// //                                    "string"
// //                                ],
// //                                "endCreateTime": 0,
// //                                "limit": 0,
// //                                "publishStatus": 0,
// //                                "start": 0,
// //                                "startCreateTime": 0,
//                                "status": this.status,
//                                "currentPage":this.currentPage,
//                                "pageSize":this.pageSize
//                            }
//                        },
//                        this.interfaceD,'tableDataAll',false),
// //                    ...this.BX.s.fetchMultiDictionary('ysfs hwlx dj',this.interfaceD.dicts)
//                ]).then(([tableDataAll])=>{
//                    console.log("res:",current.tableDataAll)
//                    current.tableDataAll[current.tabName] = tableDataAll
//                    console.log("------------",current.tableDataAll[current.tabName])
//                })
            //    this.BX.s.requestTMS([
            //        '/dictionary/search?dicCode=tms-cllx',
            //    ]).then(([cllx])=>{
            //        this.cllx=cllx
            //        console.log("123333333333",cllx)
            //    })
            },
            //点击表单行触发
            rowClick(row,event, column){
                this.$tooltip({
                    top: event.clientY+5,
                    left: event.clientX+5
                }, 'costorder')
                this.dispatcherData = row
                return this.dispatcherData

            },
            //查询
            selectByCondition(){
                console.log("selectTime", this.selectTime)
                let current = this
                let startCreateTime = null, startDispatcherTime = null, endCreateTime = null, endDispatcherTime = null
                if (current.startCreateTime !== '') {
                    startCreateTime = current.startCreateTime.getTime()
                }
                if (current.endCreateTime !== '') {
                    endCreateTime = current.endCreateTime.getTime()
                }
                if (current.startDispatcherTime !== '') {
                    startDispatcherTime = current.startDispatcherTime.getTime()
                }

                if (current.endDispatcherTime !== '') {
                    endDispatcherTime = current.endDispatcherTime.getTime()
                }
//                this.BX.s.tmsPromiseAll([
//                    this.BX.s.callInterfaceAndSetData({
//                            url:'/dispatcher/getList',
//                            type:'post',
//                            data:{
//                                "batchCode": current.batchCode,
//                                "branchId": current.branchId,
//                                "driverName":current.driverName,
////                                "companyId": 0,
//                                "endCreateTime": endCreateTime,
//                                "endDispatcherTime": endDispatcherTime,
////                                "releaseStatus": false,
//                                "startCreateTime": startCreateTime,
//                                "startDispatcherTime": startDispatcherTime,
//                                "status": current.status
//                            }
//                        },
//                        this.interfaceD,'tableDataAll',false),
//                ]).then(([tableDataAll])=>{
//                    console.log("res----------------:",current.tableDataAll)
//                    current.tableDataAll[current.tabName] = tableDataAll
//                    console.log("----------------",current.tableDataAll[current.tabName])
//                })
//                let current=this
//                console.log(current.tableDataAll[current.tabName].createTime===current.selectTime)
            },
            //跳转到派车单明细页
            toDispatcherDeatail(){
                let _this = this
//                if(_this.dispatcherData===null){
//                    BX.router.push('/dispatcher/dispatcherList/dispatcherDetailList')
//                }
//                else{
//                    console.log("toDispatcherDeatail:",_this.dispatcherData.batchCode)
//                    BX.router.push('/dispatcher/dispatcherList/dispatcherDetailList/?batchCode='+_this.dispatcherData.batchCode)
//                }
            },


            //获取滚动条当前的位置
//            getScrollTop() {
//                var scrollTop = 0
//                if (document.documentElement && document.documentElement.scrollTop) {
//                    scrollTop = document.documentElement.scrollTop
//                }
//                else if (document.body) {
//                    scrollTop = document.body.scrollTop
//                }
//                return scrollTop
//            },
//
//            //获取当前可视范围的高度
//            getClientHeight() {
//                var clientHeight = 0
//                if (document.body.clientHeight && document.documentElement.clientHeight) {
//                    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
//                }
//                else {
//                    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
//                }
//                return clientHeight
//            },
//
//            //获取文档完整的高度
//            getScrollHeight() {
//                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
//            },

            //消息提示
            messages(obj){
                let type = obj.type || 'success'
                this.$message({
                    message: obj.message || (type == 'success' ? '操作成功' : '操作失败'),
                    type: type,
                    iconClass: obj.iconClass || (type == 'success' ? 'iconfont icon-chenggong' : 'iconfont icon-shanchuxx'),
                    duration: 2000
                })
            },
            // 点击单元格保存ID
            handleCurrentChange(val) {
                this.dispatcherData = val
                return this.dispatcherData.id
            },

        },
        mounted(){
            this.handleClick()
            // this.BX.DEBUG_DATA.DISPATCHER_DATAIL_LIST=this
//            window.addEventListener('scroll', function(){
//                if (getScrollTop() + getClientHeight() == getScrollHeight()) {
//                    //ajax从这里开始
//                    alert("到底啦")
//                }
//            })
        },
        computed: {},
        watch: {},
        filters: {
            formatDate(time){
                let date = new Date(time)
                return date.getFullYear() + "-" + getFormat(date.getMonth() + 1) + "-" + getFormat(date.getDate()) + " " + getFormat(date.getHours()) + ":" + getFormat(date.getMinutes())
            }
        }

    }
    function getFormat(val) {
        return val.toString().length > 1 ? val : "0" + val
    }
</script>

<style lang="less" rel="stylesheet/scss" scoped>
    .clearfix {
        overflow: hidden;
        clear: both;
    }

    @ydh: rgb(76, 98, 254);
    .ydh {
        color: @ydh;
        text-decoration: underline;
        &:hover {
            color: lighten(@ydh, 20%);
        }
    }
    @groupColor: rgb(137, 153, 169);
    .el-button-group {
        .el-button {
            float: none;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            border-radius: 4px;
            min-width: auto;
            margin-right: 8px;
            padding: 0 16px;
            color: @groupColor;
            border: 1px solid @groupColor;
            background: #ffffff;
            &:hover {
                background: #ffffff;
                color: lighten(@groupColor, 20%);
            }
        }
        .el-button:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        .group-right {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -5px;
        }
    }

    .dataList {
        margin-top: 10px;
    }

    .dispatcherPage a {
        color: #29a7e1;
    }
    .projection{
        background:#c9c9c9;
        padding: 10px 0 10px 20px;
    }
</style>
