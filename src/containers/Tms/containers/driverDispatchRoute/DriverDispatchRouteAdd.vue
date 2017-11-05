<template>
    <div class="tms-driver-route-add" ref="OutBox">
        <div class="projection">
            <Button class="public-function-btn" @click="saveData">保存</Button>
            <Button class="public-function-btn" @click="cancel">取消</Button>
        </div>
        <div class="content">
            <Form :model="driverInfo" :inline="true" :rules="rules" ref="driverInfo">
                <div class="search">
                    <div class="demo-form-inline">
                        <Popover
                            ref="popover1"
                            placement="bottom"
                            width="400"
                            trigger="click"
                            @hide="hidePopover"
                        >
                            <Table :data="driverInfoTable"
                                   border
                                   :highlight-current-row="true"
                                   @row-click="selectedRow"
                            >
                                <TableColumn width="100" property="driverName" label="司机姓名"></TableColumn>
                                <TableColumn width="150" property="phoneNo" label="手机号码"></TableColumn>
                                <TableColumn width="200" property="belongCarry" label="承运商名称"></TableColumn>
                            </Table>
                        </Popover>
                        <Popover
                            ref="popover2"
                            placement="bottom"
                            width="400"
                            trigger="click"
                            @hide="hidePopover"
                        >
                            <Table :data="driverInfoTableByPhoneNo"
                                   border
                                   :highlight-current-row="true"
                                   @row-click="selectedRow"
                            >
                                <TableColumn width="100" property="driverName" label="司机姓名"></TableColumn>
                                <TableColumn width="150" property="phoneNo" label="手机号码"></TableColumn>
                                <TableColumn width="200" property="belongCarry" label="承运商名称"></TableColumn>
                            </Table>
                        </Popover>
                        <Popover
                            ref="popover3"
                            placement="bottom"
                            width="400"
                            trigger="click"
                            @hide="hidePopover"
                        >
                            <Table :data="driverInfoTableByCarrier"
                                   border
                                   :highlight-current-row="true"
                                   @row-click="selectedRow"
                            >
                                <TableColumn width="100" property="driverName" label="司机姓名"></TableColumn>
                                <TableColumn width="150" property="phoneNo" label="手机号码"></TableColumn>
                                <TableColumn width="200" property="belongCarry" label="承运商名称"></TableColumn>
                            </Table>
                        </Popover>
                        <FormItem label="司机姓名" prop="driverName">
                            <Input placeholder="请输入司机姓名"
                                   v-popover:popover1
                                   v-model="driverInfo.driverName"
                                   @change="queryDriverInfoByName"
                                   @focus="getFocused(0)"
                            ></Input>
                        </FormItem>
                        <FormItem label="手机号码" prop="phoneNo" >
                            <Input placeholder="请输入手机号码"
                                   v-popover:popover2
                                   v-model="driverInfo.phoneNo"
                                   @change="queryDriverInfoByPhone"
                                   @focus="getFocused(1)"
                            ></Input>
                        </FormItem>
                        <FormItem label="承运商名称" prop="belongCarry" >
                            <Input placeholder="请输入承运商名称"
                                   v-popover:popover3
                                   v-model="driverInfo.belongCarry"
                                   @change="queryDriverInfoByCarrier"
                                   @focus="getFocused(2)"
                            ></Input>
                        </FormItem>
                        <p>
                            <FormItem label="备注">
                                <span><i>{{textNum}}</i>/100</span>
                                <textarea rows="10" cols="30" ref="textarea" v-model="driverInfo.canalDescribe"></textarea>
                            </FormItem>
                        </p>
                    </div>
                </div>
                <div class="">
                    <Tabs v-model="activeName" type="card" @tab-click="">
                        <TabPane label="关键词" name="first" disabled>
                            <!--操作区域-->
                            <Form :model="keywordForm" :inline="true" :rules="rules2" ref="keywordForm">
                                <!--<FormItem label="覆盖区域"-->
                                          <!--prop="coverArea"-->
                                <!--&gt;-->
                                    <!--<Select v-model="keywordForm.coverArea" placeholder="请选择">-->
                                        <!--<Option-->
                                            <!--v-for="item in options"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                        <!--</Option>-->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                                <FormItem facade="TAB" label="覆盖区域" prop="coverArea">
                                    <fw-address-select  keyPrefix="invoice"
                                                        class="address"
                                                        label=""
                                                        v-model="keywordForm.coverArea">

                                    </fw-address-select>
                                </FormItem>
                                <FormItem prop="keyword">
                                    <Input v-model="keywordForm.keyword"
                                           placeholder="添加关键字，如有路名以~隔开"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button class="public-function-btn" @click="addByKeyword">添加</Button>
                                    <Button :class="{'public-function-btn':true,'disabled':isDelete}" @click="removeArea(0)">移除</Button>
                                    <Upload
                                        class="upload-demo"
                                        action="http://192.168.177.152:8989/tms-web/keyWord/importKeyWord"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-success="setAtamentUrl"
                                        multiple>
                                        <el-button type="text">导入</el-button>
                                    </Upload>
                                    <Button type="text">下载模版</Button>
                                </FormItem>
                            </Form>
                            <Table
                                :data="driverInfo.addRouteByKeyword"
                                :loading="loading"
                                border
                                :highlight-current-row="true"
                                @row-click="rowClickInKeywordTable"
                            >
                                <TableColumn
                                    type="index"
                                    fixed
                                    width="70"
                                    label="序号">
                                </TableColumn>
                                <TableColumn
                                    label="覆盖区域">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.coverArea.invoiceProvName}}
                                            {{scope.row.coverArea.invoiceCityName}}
                                            {{scope.row.coverArea.invoiceDistrictName}}
                                            {{scope.row.coverArea.invoiceStreetName}}
                                            {{scope.row.coverArea.invoiceAddress}}
                                        </span>
                                    </template>
                                </TableColumn>
                                <TableColumn
                                    prop="keyword"
                                    label="关键词名称">
                                </TableColumn>
                            </Table>
                        </TabPane>
                        <TabPane label="区域" name="second">
                            <div class="projection">
                                <Button class="public-function-btn" @click="showAreaAddDialog">添加</Button>
                                <Button :class="{'public-function-btn':true,'disabled':isDelete}" @click="removeArea(1)">移除</Button>
                            </div>
                            <Table
                                :data="driverInfo.addAreatableData"
                                :loading="loading"
                                border
                                :highlight-current-row="true"
                                @row-click="handleRowClick"
                            >
                                <TableColumn
                                    type="index"
                                    fixed
                                    width="70"
                                    label="序号">
                                </TableColumn>
                                <TableColumn
                                    label="覆盖区域">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.provinceName}}
                                            {{scope.row.cityName}}
                                            {{scope.row.countyName}}
                                            {{scope.row.townName}}
                                        </span>
                                    </template>
                                </TableColumn>
                                <TableColumn label="覆盖类型"
                                             prop="coverType"
                                >
                                    <!--<template slot-scope="scope">-->
                                    <!--<span v-for="item in coverTypesOption">-->
                                        <!--<span v-if="item.itemCode==scope.row.coverType">-->
                                            <!--{{item.itemName}}-->
                                        <!--</span>-->
                                    <!--</span>-->
                                    <!--</template>-->
                                </TableColumn>
                                <TableColumn
                                    prop="routeNames"
                                    label="覆盖线路">
                                </TableColumn>
                                <TableColumn
                                    prop="roadName"
                                    label="道路名称">
                                </TableColumn>
                                <TableColumn
                                    prop="numberType"
                                    label="号码类型">
                                    <!--<template slot-scope="scope">-->
                                    <!--<span v-for="item in roadNumTypeOption">-->
                                        <!--<span v-if="item.itemCode==scope.row.numberType">-->
                                            <!--{{item.itemName}}-->
                                        <!--</span>-->
                                    <!--</span>-->
                                    <!--</template>-->
                                </TableColumn>
                                <TableColumn
                                    prop="startNum"
                                    label="起始号码">
                                </TableColumn>
                                <TableColumn
                                    prop="endNum"
                                    label="结束号码">
                                </TableColumn>
                                <TableColumn
                                    prop="siteNum"
                                    label="站点号">
                                </TableColumn>
                            </Table>
                        </TabPane>
                        <TabPane label="电子围栏" name="third" disabled>电子围栏</TabPane>
                    </Tabs>
                </div>
            </Form>
        </div>
        <tooltip name="keywordTooltip">
            <el-button size="mini">修改</el-button>
            <el-button size="mini" @click="removeArea(0)">移除</el-button>
        </tooltip>
        <tooltip name="costorder">
            <el-button size="mini">修改</el-button>
            <el-button size="mini" @click="removeArea(1)">移除</el-button>
        </tooltip>

        <Dialog title="区域添加" :visible.sync="dialogVisible" >
            <Form :model="areaForm" :inline="true" ref="areaForm" :rules="rules3">
                <FormItem facade="TAB"
                          label="覆盖区域"
                          prop="coverArea"

                >
                    <fw-address-select  keyPrefix="invoice"
                                        class="address"
                                        label=""
                                        v-model="areaForm.coverArea"
                                        :show-detail="false"
                    >

                    </fw-address-select>
                </FormItem>
                <FormItem label="覆盖类型"
                          prop="coverType"
                >
                    <Select v-model="areaForm.coverType"
                            placeholder=""
                            @change="changeSelectedValue"
                            @visible-change="handleVisibleChange"
                    >
                        <Option
                            v-for="item in coverTypesOption"
                            :key="item.itemCode"
                            :label="item.itemName"
                            :value="item.itemCode"
                        ></Option>
                    </Select>
                </FormItem>
                <Popover
                    ref="popover4"
                    placement="bottom"
                    width="400"
                    trigger="click"
                    @hide="hidePopover"
                >
                    <Form :model="{}">
                        <FormItem>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="route in routesList" :label="route.label" :key="route.value">{{route.label}}</el-checkbox>
                            </el-checkbox-group>
                        </FormItem>
                    </Form>
                </Popover>
                <FormItem label="线路"
                          prop="line"
                          ref="line"
                >
                    <Input v-model="areaForm.line"
                           v-popover:popover4
                           :disabled="isEditable"
                    >
                    </Input>
                </FormItem>
                <FormItem label="道路名称"
                          prop="roadName"
                          ref="roadName"
                >
                    <Input v-model="areaForm.roadName"
                           :disabled="isEditable"
                           @blur="handleRoadName"
                           :required="isRequired2"
                    ></Input>
                </FormItem>
                <FormItem label="号码类型"
                          prop="roadNumType"
                          ref="roadNumType"
                >

                    <Select v-model="areaForm.roadNumType"
                            :disabled="isEditable"
                            @change="changeRoadNumType"
                            @visible-change="roadNumIsRequired"
                            :required="isRequired2">
                        <Option
                            v-for="item in roadNumTypeOption"
                            :key="item.itemCode"
                            :label="item.itemName"
                            :value="item.itemCode"
                        ></Option>
                    </Select>
                    <!--<Input v-model="areaForm.roadNumType" :disabled="isEditable"></Input>-->
                </FormItem>
                <FormItem label="起始号码"
                          prop="startNum"
                          ref="startNum"
                >
                    <Input :required="isRequired" v-model="areaForm.startNum" :disabled="isEditable"></Input>
                </FormItem>
                <FormItem label="结束号码"
                          prop="endNum"
                          ref="endNum"
                >
                    <Input :required="isRequired"
                           v-model="areaForm.endNum"
                           :disabled="isEditable"
                    ></Input>
                </FormItem>
                {{areaForm.endNum}}
                <FormItem label="站点号" ref="siteNum">
                    <Input v-model="areaForm.siteNum"></Input>
                </FormItem>
            </Form>
            <span slot="footer" class="dialog-footer">
                <Button size="small" @click="dialogVisible = false">取 消</Button>
                <Button size="small" type="primary" @click="addArea">添加</Button>
            </span>
        </Dialog>
        <!--提示消息-->
        <Dialog :title="resultInfo.title" :visible.sync="messageVisible">
            <div class="dialog-cont-one">
                <p>{{resultInfo.msg}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <Button size="small" type="cancel" @click="messageVisible = false">取 消</Button>
                <Button size="small" type="confirm" @click="addArea">添加</Button>
            </span>
        </Dialog>
        {{driverInfo}}
    </div>
</template>

<script>
     import route from '@Tms/services/driverDispatchRoute/route.js'
     import commonService from '@Tms/services/common/common.js'
     import commonUtils from '@Tms/utils/commonUtils.js'
    export default{
        props:{
            tabMessage:Object
        },
        data(){
            return {
                checkAll: false,// 下拉框选项是否全选
                checkedCities: [],// 下拉框选项多选选中项
                checkedRoutesId:[],
                isIndeterminate: false,//

                // 保存时表单验证
                rules:{
                    driverName:[
                        { required: true, message: '请输入司机姓名', trigger: 'blur' }
                    ]
                },
                // 关键词添加时表单验证
                rules2:{
                    coverArea:[
                        { type:'object',required:true , message: '请选择覆盖区域', trigger: 'change' }
                    ],
                    keyword:[
                        { required: true, message: '请输入区域关键字', trigger: 'blur' }
                    ]
                },
                //区域添加时表单验证
                rules3:{
                    coverArea:[
                        { type:'object',required: true,  message: '请选择覆盖区域', trigger: 'change' }
                    ],
                    coverType:[
                        { type: 'number', required: true , message: '请选择覆盖类型', trigger: 'change' }
                    ],

                },
                activeName:'second',
                driverInfo:{
                    driverId:'',
                    driverName:'',
                    phoneNo:'',
                    belongCarry:'',
                    canalDescribe:'',
                    addAreatableData:[],// 区域添加表格数据
                    addRouteByKeyword:[],// 关键词添加表格数据
                    addRouteByMap:[]// 电子围栏添加表格数据
                },
                driverInfoTable:[],// 根据司机姓名司机档案中的司机信息
                driverInfoTableByPhoneNo:[],// 根据司机姓名司机档案中的司机信息
                driverInfoTableByCarrier:[],// 根据承运商名称司机档案中的司机信息
                options:[1,2,3,4,5],
                // 区域添加
                areaForm:{
                    coverArea:{
                        "invoiceProvId": "",
                        "invoiceProvName": "",
                        "invoiceCityId": "",
                        "invoiceCityName": "",
                        "invoiceDistrictId": "",
                        "invoiceDistrictName": "",
                        "invoiceStreetId": "",
                        "invoiceStreetName": "",
                        "invoiceAddress": "",
                        "invoiceAddressId": "",
                    },
                    coverType:null,
                    coverTypeName:'',
                    line:'',
                    lineId:'',
                    roadName:'',
                    roadNumType: 4,
                    roadNumTypeName:'全路覆盖',
                    startNum:'',
                    endNum:'',
                    siteNum:''
                },
                //关键词添加
                keywordForm:{
                    coverArea:{
                        "invoiceProvId": "",
                        "invoiceProvName": "",
                        "invoiceCityId": "",
                        "invoiceCityName": "",
                        "invoiceDistrictId": "",
                        "invoiceDistrictName": "",
                        "invoiceStreetId": "",
                        "invoiceStreetName": "",
                        "invoiceAddress": "",
                        "invoiceAddressId": "",
                    },
                    keyword:''
                },
                coverTypesOption:[],
                roadNumTypeOption:[],
                routesList:[],// 区域添加线路下拉列表
                isEditable:false,
                isRequired:false,// 起始号码和结束号码是否必填
                isRequired2:false,// 线路、道路名称、号码类型是否必填
                areaIds:[],//选中的区域id集合
                // 对话框是否显示
                dialogVisible: false,
                messageVisible: false,
                // 对话框参数
                resultInfo: {
                    title: '',
                    msg: '',
                    type:''
                },
                isDelete:true,
                isAdd:true,// 判断是否允许根据关键字添加路线

                loading:true
            }
        },
        watch:{

        },
        computed: {
            /*控制文本域输入的字数*/
            textNum() {
                if (this.driverInfo.canalDescribe.length > 100) {
                    this.$refs.textarea.style.borderColor = "red"
                    this.driverInfo.canalDescribe = this.driverInfo.canalDescribe.slice(0, 100)
                } else if (this.$refs.textarea) {
                    this.$refs.textarea.style.borderColor = "#cdcdcd"
                }
                return this.driverInfo.canalDescribe.length


            },
//            coverArea:function () {
//                var obj={};
//                obj=JSON.parse(JSON.stringify(this.templateData)); //this.templateData是父组件传递的对象
//                return obj
//            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
            },
            setAtamentUrl(response, file) {
                if (response.status.statusCode == 0) {
                    this.$customMessage("上传成功！", "success")
                }
                else {
                    this.$customMessage("导入失败！", "error")
                }
            },

            // 线路点击全选时触发
            handleCheckAllChange(val) {
               let routesIdArr=[]
                if(this.checkAll){
                    this.routesList.map((item)=>{
                        this.checkedCities.push(item.label)
                        routesIdArr.push(item.value)
                    })
                    this.areaForm.lineId=routesIdArr.join(",")
                }
                else{
                    this.checkedCities=[]
                }
               // this.checkedCities = this.checkAll ? this.routesList : []
                this.isIndeterminate = false
                this.areaForm.line=this.checkedCities.join(',')
            },
            // 线路多选时触发
            handleCheckedCitiesChange(value,label) {
                let routesIdArr=[]
                let checkedCount = value.length
                this.areaForm.line=value.join(',')
                this.routesList.map((item)=>{
                    value.forEach((checkedItem)=>{
                        if(item.label==checkedItem){
                            routesIdArr.push(item.value)
                        }
                    })
                })
                this.areaForm.lineId=routesIdArr.join(",")
                this.checkAll = checkedCount === this.routesList.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.routesList.length
            },

            // 当输入司机姓名、手机号码、承运商名称时查询司机档案列表
            async queryDriverInfoByName(value){
                let _this=this
                const params = {
                    "driverName": _this.driverInfo.driverName,
                    "carrierName":_this.driverInfo.belongCarry,
                    "phoneNo":_this.driverInfo.phoneNo,
                    "pageNumber": 1,
                    "pageSize": 100,
                }
                try{
                    const data = await route.getDriverInfoList(params)
                    console.log(data,'司机档案列表')
                    if(data.status==200){
                        _this.driverInfoTable=data.data.result.baseDriverDTOs
                        console.log(_this.driverInfoTable,'driverInfoTable-----------------------------')
                    }
                    else{
                        console.log(data.status.statusReason)
                        _this.$customMessage("查询失败","error")
                    }
                }
                catch(e){
                    _this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            async queryDriverInfoByPhone(value){
                let _this=this
                const params = {
                    "driverName": _this.driverInfo.driverName,
                    "carrierName":_this.driverInfo.belongCarry,
                    "phoneNo":_this.driverInfo.phoneNo,
                    "pageNumber": 1,
                    "pageSize": 100,
                }
                try{
                    const data = await route.getDriverInfoList(params)
                    console.log(data,'司机档案列表')
                    if(data.status==200){
                        _this.driverInfoTableByPhoneNo=data.data.result.baseDriverDTOs
                        console.log(_this.driverInfoTableByPhoneNo,'driverInfoTableByPhoneNo-----------------------------')
                    }
                    else{
                        console.log(data.status.statusReason)
                        _this.$customMessage("查询失败","error")
                    }
                }
                catch(e){
                    _this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            async queryDriverInfoByCarrier(value){
                let _this=this
                const params = {
                    "driverName": _this.driverInfo.driverName,
                    "carrierName":_this.driverInfo.belongCarry,
                    "phoneNo":_this.driverInfo.phoneNo,
                    "pageNumber": 1,
                    "pageSize": 100,
                }
                try{
                    const data = await route.getDriverInfoList(params)
                    console.log(data,'司机档案列表')
                    if(data.status==200){
                        _this.driverInfoTableByCarrier=data.data.result.baseDriverDTOs
                        console.log(_this.driverInfoTableByCarrier,'driverInfoTableByCarrier-----------------------------')
                    }
                    else{
                        console.log(data.status.statusReason)
                        _this.$customMessage("查询失败","error")
                    }
                }
                catch(e){
                    _this.$customMessage("查询失败","error")
                    console.log(e)
                }
            },
            getFocused(index){
               let _this=this
                if(index==0&&_this.driverInfo.driverName!==''){

                    _this.queryDriverInfoByName(_this.driverInfo.driverName)
                }else if(index==1&&_this.driverInfo.phoneNo!==''){
                    _this.queryDriverInfoByPhone(_this.driverInfo.phoneNo)
                }else if(index==2&&_this.driverInfo.belongCarry!==''){
                    _this. queryDriverInfoByCarrier(_this.driverInfo.belongCarry)
                }
            },
            // 根据关键词添加司机派送线路
            addByKeyword(){
                let _this=this,count=0
//                keywordForm:{
//                    coverArea:'',
//                        keyword:''
//                }
                _this.$refs['keywordForm'].validate((valid) => {
                    if (valid) {
                        let obj=_this.deepCopyObj(_this.keywordForm.coverArea)
                        const params={
                            'coverArea':obj,
                            'keyword':_this.keywordForm.keyword,
                        }
                        if(_this.driverInfo.addRouteByKeyword.length){
                            _this.isAdd=true
                            _this.allowAdd(_this.driverInfo.addRouteByKeyword,params,0)
                            if(_this.isAdd){
                                _this.driverInfo.addRouteByKeyword.push(params)
                                _this.$customMessage("添加成功！",'success')
                                _this.resetForm('keywordForm')
                                _this.areaIds=[]
                            }
                            else{
                                _this.$customMessage("重复添加关键字，请重新添加",'warning')
                            }
                        }else{
                            _this.driverInfo.addRouteByKeyword.push(params)
                            _this.$customMessage("添加成功！",'success')
                            _this.resetForm('keywordForm')
                            _this.areaIds=[]
                        }
                        console.log(_this.driverInfo.addRouteByKeyword,'addRouteByKeyword--------')
                        _this.driverInfo.addRouteByKeyword.forEach((item)=>{
                            item.id=count++
                        })

                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
//
                console.log(_this.driverInfo.addRouteByKeyword,'关键词列表')
            },
            // 添加路线时，判断覆盖区域，覆盖类型和关键词是否相同
            allowAdd(tableData,params,index){
                let _this=this
                tableData.forEach((item)=>{
                    if(index==0){
                        // 根据关键字
                        if(commonUtils.cmp(item.coverArea, params.coverArea)&&item.keyword==params.keyword){
                            _this.isAdd=false
                            return false
                        }
                    }
                    else if(index==1){
                        // 根据覆盖区域+覆盖类型
                        if(item.coverTypeId==1&&
                            commonUtils.cmp(item.coverArea, params.coverArea)){
                            _this.isAdd=false
                            return false
                        }
                    }
                    else if(index==2){
                        // 根据覆盖区域+覆盖类型+线路
                        if(item.coverTypeId==params.coverTypeId&&commonUtils.cmp(item.coverArea, params.coverArea)){
                            item.routeNames.split('')
                            item.routeNames.split('').forEach((eachRoute)=>{
                                if(params.routeNames.indexOf(eachRoute)>-1){
                                    _this.isAdd=false
                                    console.log(_this.isAdd,'找到相同区域、相同类型、相同路线的路线了！')
                                    return false
                                }
                            })
                        }
                    }
                    else{
                        //根据覆盖区域+覆盖类型+线路+道路名称
                        if(item.coverTypeId==params.coverTypeId&&commonUtils.cmp(item.coverArea, params.coverArea)){
                            item.routeNames.split('').forEach((eachRoute)=>{
                                if(params.routeNames.indexOf(eachRoute)>-1){
                                    if(item.roadName==params.roadName){
                                        _this.isAdd=false
                                        console.log(_this.isAdd,'找到相同区域、相同类型、相同路线、相同道路名称的路线了！')
                                        return false
                                    }
                                }
                            })
                        }
                    }
                })
            },
            // 让区域添加的dialog显示
            showAreaAddDialog(){
                let _this=this
                _this.dialogVisible=true
                _this.dynamicAddRequired()
            },
            //动态添加必填项
            dynamicAddRequired(){
                let _this=this
                this.rules3.startNum=[
                    { required: _this.isRequired,  message: '请输入起始号码', trigger: 'blur' },
                    { min: 0, max: 8, message: '最多填写8位数字', trigger: 'blur' }
                ]
                this.rules3.endNum=[
                    { required: _this.isRequired,  message: '请输入结束号码', trigger: 'blur' },
                    { min: 0, max: 8, message: '最多填写8位数字', trigger: 'blur' }
                ]
                this.rules3.line=[
                    { type:'string', required: _this.isRequired2,  message: '请选择线路', trigger: 'blur' }
                ]
                this.rules3.roadName=[
                    { required: _this.isRequired2,  message: '请输入道路名称', trigger: 'blur' }
                ]
                this.rules3.roadNumType=[
                    { type:'number',required: _this.isRequired2,  message: '请选择号码类型', trigger: 'change' }
                ]
            },
            // 根据区域添加司机派送线路
            addArea(){
                let _this=this,count=0
                _this.$refs['areaForm'].validate((valid) => {
                    if (valid) {
                        // 深拷贝对象，改变对象的引用关系
                        let obj=_this.deepCopyObj(_this.areaForm.coverArea)
                        const params={
                            'coverArea': obj,

                            "cityId": obj.invoiceCityId,
                            "cityName": obj.invoiceCityName,
                            "companyId": 1,
                            "countyId": obj.invoiceDistrictId,
                            "countyName": obj.invoiceDistrictName,
                           // "coverArea": "北京市北京市昌平区城南口地区办事处",
                           // "coverAreaId": "1,2,13,3725",
                            "coverType": _this.areaForm.coverTypeName,
                            "coverTypeId": _this.areaForm.coverType,
                            "routeIds":_this.areaForm.lineId,
                            "routeNames":_this.areaForm.line,
                            "driverId": _this.driverInfo.driverId,
                            "endNum": _this.areaForm.endNum,
                            "numberType": _this.areaForm.roadNumTypeName,
                            "numberTypeId": _this.areaForm.roadNumType,
                            "provinceId": obj.invoiceProvId,
                            "provinceName": obj.invoiceProvName,
                            "roadName": _this.areaForm.roadName,
                            "siteNum": _this.areaForm.siteNum,
                            "startNum": _this.areaForm.startNum,
                            "townId": obj.invoiceStreetId,
                            "townName": obj.invoiceStreetName,

//                            'coverType': _this.areaForm.coverType,
//                            'routeNames': _this.areaForm.line,
//                            'roadName': _this.areaForm.roadName,
//                            'numberType': _this.areaForm.roadNumType,
//                            'startNum': _this.areaForm.startNum,
//                            'endNum': _this.areaForm.endNum,
//                            'siteNum': _this.areaForm.siteNum,
                        }
                        _this.isAdd=true
                        if(_this.areaForm.coverType==1){
                            _this.allowAdd(_this.driverInfo.addAreatableData,params,1)
                        }
                        else{
                            _this.allowAdd(_this.driverInfo.addAreatableData,params,3)
                            if(!_this.isAdd){
                                _this.isRequired2=false
                                _this.dynamicAddRequired()
                            }
                        }
                        if(_this.isAdd){
                            if(_this.areaForm.coverType==2){
                                _this.isRequired2=true
                                _this.dynamicAddRequired()
                            }
                            _this.$refs['areaForm'].validate((valid) => {
                                if (valid) {
                                    if(_this.areaForm.endNum!==''){
                                        if(_this.areaForm.startNum<_this.areaForm.endNum){
                                            _this.driverInfo.addAreatableData.push(params)
                                            _this.driverInfo.addAreatableData.forEach((item)=>{
                                                item.id=count++
                                            })
                                            _this.dialogVisible=false
                                            _this.$customMessage("添加成功！",'success')
                                            _this.resetForm('areaForm')
                                            _this.checkedCities=[]
                                            _this.isIndeterminate=false
                                            _this.areaIds=[]
                                            if(_this.isEditable){
                                                _this.isEditable=false
                                            }
                                        }
                                        else{
                                            _this.$customMessage("添加失败，起始号码必须小于结束号码！",'error')
                                        }
                                    }
                                    else{
                                        _this.driverInfo.addAreatableData.push(params)
                                        _this.driverInfo.addAreatableData.forEach((item)=>{
                                            item.id=count++
                                        })
                                        _this.dialogVisible=false
                                        _this.$customMessage("添加成功！",'success')
                                        _this.resetForm('areaForm')
                                        this.checkedCities=[]
                                        _this.isIndeterminate=false
                                        _this.areaIds=[]
                                        if(_this.isEditable){
                                            _this.isEditable=false
                                        }
                                    }
                                }
                            })
                        }
                        else{
                            if(_this.areaForm.coverType==2){
                                _this.isRequired2=false
                                _this.dynamicAddRequired()
                            }
                            _this.$customMessage("添加失败！",'error')
                        }
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
                console.log(_this.driverInfo.addAreatableData,'addAreatableData')
            },

            // Popover隐藏
            hidePopover(){
                console.log('藏起来了')
                let _this=this
                // _this.driverInfoTable=[]
                // _this.queryDriverInfo()
            },
            // 选中一条司机信息并赋值
            selectedRow(row){
                let _this=this
                console.log(row,'选中此行-----------')
                _this.driverInfo.driverId=row.id
                _this.driverInfo.driverName=row.driverName
                _this.driverInfo.phoneNo=row.phoneNo
                _this.driverInfo.belongCarry=row.belongCarry
            },
            // 根据选中的覆盖类型值，作出不同处理
            changeSelectedValue(value){
                console.log(value,'选中的覆盖类型')
                let _this=this
                _this.coverTypesOption.forEach((item)=>{
                    if(item.itemCode==value){
                        _this.areaForm.coverTypeName=item.itemName
                    }
                })
                // coverTypeName
                if(_this.areaForm.coverType==1){
                    _this.clearInput(0)
                    //覆盖类型为整区覆盖，则下面输入框不可编辑
                    _this.isEditable=true
                    _this.isRequired2=false
                    _this.isRequired=false
                    _this.dynamicAddRequired()
                    _this.$refs.roadNumType.resetField()
                    _this.$refs.roadName.resetField()
                    _this.areaForm.roadNumType=null
                    _this.areaForm.roadNumTypeName=''
                   // _this.$refs.line.resetField()
                }
                else if(_this.areaForm.coverType==2){
                    _this.isEditable=false
                    _this.areaForm.roadNumType=4
                    _this.areaForm.roadNumTypeName='全路覆盖'
//                    _this.isRequired2=true
//                    _this.dynamicAddRequired()
                }
            },
            // 覆盖类型下拉框隐藏时，判断添加区域的覆盖区域和覆盖类型是否和列表数据冲突
            handleVisibleChange(cb){
                let _this=this

                if(!cb){
                    console.log('隐藏下拉')
                    if(_this.areaForm.coverType!==null){
                        let obj=_this.deepCopyObj(_this.areaForm.coverArea)
                        let params2={
                            'coverArea':obj,
                            'coverTypeId':_this.areaForm.coverTypeId
                        }
                        if(_this.driverInfo.addAreatableData.length){
                            _this.isAdd=true
                            _this.allowAdd(_this.driverInfo.addAreatableData,params2,1)
                            if(!_this.isAdd){
                                _this.$customMessage("添加的区域已包含在列表中",'warning')
                            }
                            else{
                                if(_this.areaForm.coverType==2){
                                    _this.isRequired2=true
                                    _this.dynamicAddRequired()
                                }
                                _this.getRoutesList()
                            }
                        }
                        else{
                            if(_this.areaForm.coverType==2){
                                _this.isRequired2=true
                                _this.dynamicAddRequired()
                            }
                            _this.getRoutesList()
                        }
                    }
                }
            },
            // 获取线路
            async getRoutesList(){
                let _this=this
                let obj=_this.deepCopyObj(_this.areaForm.coverArea)
                let params={
                    "cityId": obj.invoiceCityId,
                    "countyId": obj.invoiceDistrictId,
                    "provinceId": obj.invoiceProvId,
                    "townId": obj.invoiceStreetId
                }
                if(_this.areaForm.coverType==2){
                    try{
                        const data = await route.getRoutesList(params)
                        console.log(data,'线路--------------------')
                        if(data.status==200){
                            console.log(data,'线路')
                            let options=data.data.result
                            _this.routesList = options.map(item => {
                                return { value:item.id, label: item.routeName }
                            })
                            console.log(_this.routesList,'routesList-----------------------------')
                        }
                        else{
                            console.log(data.status.statusReason)
                            _this.$customMessage("线路查询失败","error")
                        }
                    }
                    catch(e){
                        _this.$customMessage("查询失败","error")
                        console.log(e)
                    }
                }
            },
            // 判断选中的路线是否和已存在的相同区域和相同覆盖类型的路线重复
            changeSelectedLines(cb){
                let _this=this
                let obj=_this.deepCopyObj(_this.areaForm.coverArea)
                if(!cb){
                    let params={
                        'coverArea':obj,
                        'coverTypeId':_this.areaForm.coverTypeId,
                        'routeNames':_this.areaForm.line,
                    }
                    // _this.routesList 线路列表
                    _this.isAdd=true
                    _this.allowAdd(_this.driverInfo.addAreatableData,params,2)
                    if(_this.isAdd){

                    }else{
                        _this.$customMessage("该区域范围已添加，请检查！",'warning')
                    }
                }
            },
            // 填写道路名称后，判断是否和已有的冲突
            handleRoadName(){
                let _this=this
                let obj=_this.deepCopyObj(_this.areaForm.coverArea)
                let params={
                    'coverArea':obj,
                    'coverTypeId':_this.areaForm.coverTypeId,
                    'routeNames':_this.areaForm.line,
                    'roadName':_this.areaForm.roadName,
                }
                _this.isAdd=true
                _this.allowAdd(_this.driverInfo.addAreatableData,params,3)
                if(!_this.isAdd){
                    _this.$customMessage("已存在道路名：xxx",'warning')
                }
            },
            // 选择号码类型
            changeRoadNumType(value){
               let _this=this
                _this.roadNumTypeOption.forEach((item)=>{
                   if(item.itemCode==value){
                       _this.areaForm.roadNumTypeName=item.itemName
                   }
                })
            },
            // 当号码类型是单号覆盖或双号覆盖时，起始号码和结束号码必填
            roadNumIsRequired(cb){
                let _this=this
                if(!cb){
                    if(_this.areaForm.roadNumType==1||_this.areaForm.roadNumType==2){
                        _this.isRequired=true
                        _this.dynamicAddRequired()
                    }
                    else{
                        _this.isRequired=false
                        _this.dynamicAddRequired()
                        _this.$refs.startNum.resetField()
                        _this.$refs.endNum.resetField()
                    }
                }
            },
            // 获取数据字典
            async getDictoryByCode(){
                console.log('数据字典的方法调用了吗')
                let _this=this
                const message = {code:'fglx'}
                const data = await commonService.fetchDictionary(message)
                _this.coverTypesOption = data.data.result
//                    .map(item => {
//                    return { value:item.itemCode, label: item.itemName }
//                })

                const message1 = {code:'srnt'}
                const data1 = await commonService.fetchDictionary(message1)
                _this.roadNumTypeOption = data1.data.result
//                    .map(item => {
//                    return { value:item.itemCode, label: item.itemName }
//                })
                console.log(_this.coverTypesOption,_this.roadNumTypeOption,'处理完的数据字典塑聚')
            },
            // 清除区域添加的各输入区域
            clearInput(index){
                let _this=this
                // 若先选择部分覆盖，再选择整区覆盖，则清空其他项值
                if(index==0){
//                    _this.$refs.line.resetField()
//                    _this.$refs.line.roadName()
//                    _this.$refs.line.roadNumType()
//                    _this.$refs.line.startNum()
//                    _this.$refs.line.endNum()
//                    _this.$refs.line.siteNum()
                    _this.areaForm.line=''
                    _this.areaForm.roadName=''
                    _this.areaForm.roadNumType=''
                    _this.areaForm.startNum=''
                    _this.areaForm.endNum=''
                    _this.areaForm.siteNum=''
                }
                // 点击区域添加添加按钮后，清空其他项值
//                else if(index==1){
//                    _this.$refs[areaForm].resetFields()
//                }
//                else{
//                    // _this.keywordForm.coverArea=''
//                    _this.keywordForm.keyword=''
//                }
            },
            // 深拷贝对象，改变对象的引用关系
            deepCopyObj(originalObj){
                let _this=this
                let copyObj=JSON.parse(JSON.stringify(originalObj))
                return copyObj
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            // 移除表格中选中的区域
            removeArea(index){
                let _this=this
                console.log(_this.areaIds,'areaIds')
                console.log(_this.driverInfo.addAreatableData,'删除前')
                console.log(_this.driverInfo.addRouteByKeyword,'删除前')
                if(index==0){
                    // 移除关键词添加的表格中数据
                    if(_this.areaIds.length){
                        _this.isDelete=false
                        _this.driverInfo.addRouteByKeyword.forEach((item,index)=>{
                            console.log(item,index,'数组下标')
                            _this.areaIds.forEach((areaItem)=>{
                                if(item.id===areaItem.id){
                                    _this.driverInfo.addRouteByKeyword.splice(index,1)
                                }
                            })
                        })
                        _this.$customMessage("移除成功",'success')
                    }
                    else{
                        _this.$customMessage("请至少选择一条数据",'warning')
                    }
                }
                else{
                    // 移除区域添加的表格中数据
                    if(_this.areaIds.length){
                        _this.isDelete=false
                        _this.driverInfo.addAreatableData.forEach((item,index)=>{
                            console.log(item,index,'数组下标')
                            _this.areaIds.forEach((areaItem)=>{
                                if(item.id===areaItem.id){
                                    _this.driverInfo.addAreatableData.splice(index,1)
                                }
                            })
                        })
                        _this.$customMessage("移除成功！",'success')
                    }
                    else{
                        _this.$customMessage("请至少选择一条数据",'warning')
                    }
                }
                this.areaIds=[]
            },
            // 点击table每行
            handleRowClick(row, event, column) {
                this.areaIds.length=1
                this.areaIds=[]
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'costorder')
                this.areaIds.push(row)
                console.log("row", row)
                return this.areaIds
            },
            rowClickInKeywordTable(row, event, column) {
                this.areaIds.length=1
                this.areaIds=[]
                this.$tooltip({
                    top: event.clientY,
                    left: event.clientX
                }, 'keywordTooltip')
                this.areaIds.push(row)
                console.log("row", row)
                return this.areaIds
            },
            cancel() {
                this.$root.bus.$emit("childTabClose",this.tabMessage)
            },

            // 保存
            async saveData(){
                let _this=this,isOk=true
                _this.$refs['driverInfo'].validate((valid) => {
                    if (valid) {
                    } else {
                        isOk=false
                        console.log('error submit!!')
                        return false
                    }
                })
                if(isOk){
                    let params={
                        "belongCarry": 2,// 承运商ID
                        "carryName":_this.driverInfo.belongCarry,// 承运商名称
                        "companyId": 1,
                        "createUser": 2,
                        "driverId": _this.driverInfo.driverId,
                        "driverName": _this.driverInfo.driverName,
                        "phoneNo": _this.driverInfo.phoneNo,
                        "remarks": _this.driverInfo.canalDescribe,
                        "regionList": _this.driverInfo.addAreatableData
                    }
                    try{
                        const data = await route.addSave(params)
                        if(data.status==200){
                            if(data.data.result){
                                _this.$customMessage("保存成功","success")
                            }
                            else{
                                _this.$customMessage("保存失败","error")
                            }
                            console.log(data,'成功了吗')
                        }
                        else{
                            _this.$customMessage("请求失败","error")
                        }
                    }
                    catch(e){
                        _this.$customMessage("查询失败","error")
                        console.log(e)
                    }
                }
            },




            // 列表上部按钮
            clickTopBtn(state){
                if (!this.dealerIds.length) {
                    this.$myMessage("请勾选至少一条记录","warning")
                    return
                }
                this.resultInfo.type = state
                switch (state) {
                    case "startUp": {
                        this.resultInfo.title = '启动确认'
                        this.resultInfo.msg = '确定启动该经销商？'
                    }
                        break
                    case "blockUp": {
                        this.resultInfo.title = '停用确认'
                        this.resultInfo.msg = '确定停用该经销商？\n 停用后该经销商将不能再本站发布商品'
                    }
                        break
                    case "delete": {
                        this.resultInfo.title = '删除提示'
                        this.resultInfo.msg = '确定彻底删除与该经销商合作关系？'
                    }
                        break
                }
                this.dialogVisible = true
            },


            // 对话框确定按钮
            async confirmBtnClick(){
                const type = this.resultInfo.type
                let status = type == 'startUp' ? 1 : type == 'blockUp' ? 2 : 3
                const message = {
                    stationId: this.searchObj.stationId,
                    dealerIds: this.dealerIds,
                    status: status
                }
                try{
                    const data = await dealerService.updateByStationId(message)
                    if(data.status==200){
//                        const successCount = data.result
                        this.getDealerList()
                        this.$myMessage("操作成功","success")
                    }else{
                        console.log(data.status.statusReason)
                        this.$myMessage("操作失败","error")
                    }
                    this.dialogVisible = false
                }catch(e){
                    console.log(e)
                    this.$myMessage("操作失败-c","error")
                }
            },

            // 分配经销商按钮
            clickDistributionDealerBtn(){
                let addTabObj = {
                    name: '分配经销商',
                    tag: 'b2b_dealer_distributionDealer',
                    parentTag: ''
                }
                this.$root.bus.$emit('distributionDealerTabAdd', addTabObj)
            },

//            refreshList(){
//                this.page.pageNum = 1
//                this.getDealerList()
//            },

            getSummaries(param) {
                const {columns, data} = param
                const sums = []
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价'
                        return
                    }
                    const values = data.map(item => Number(item[column.property]))
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)
                        sums[index] += ' 元'
                    } else {
                        sums[index] = 'N/A'
                    }
                })
                return sums
            }
        },

        mounted () {
            this.getDictoryByCode()
        }
    }
</script>
<style lang="scss" scoped>
    .demo-form-inline{
        margin: 20px 15px;
        width: calc(100% - 60px);
        font-size: 12px;
        position: relative;
        textarea {
            padding:10px;
            min-width: 609px;
            max-width: 609px;
            display: inline-block;
            height: 38px;
            width: 600px;
            line-height: 14px;
            border: 1px solid #cdcdcd;
            resize:none;
        }
        p{
            margin-bottom: 5px;
            position: relative;
            span:nth-of-type(1) {
                display: inline-block;
                width: 49px;
                height: 27px;
                position: absolute;
                margin: 0;
                top: auto;
                bottom: 22px;
                left: 582px;
                background: #fff;
                color: #cdcdcd;
                & i:nth-of-type(1) {
                    color: #40afe7;
                    margin: 0;
                }
            }
        }

    }
    //消息提示框
    .success {
        position: absolute;
        transform: translate3d(-50%, -50%, 0);
        top: 50%;
        left: 50%;
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 6px;

    }
</style>
<style lang="scss">
    .tms-driver-route-add{
        /*-----------------tabs-------------------*/
        .el-tabs {
            margin: 0 16px 20px;
            position: relative;
        }
        .el-tabs__header {
            margin: 0;
        }
        .el-tabs__content {
            border: 1px solid #ccc;
            border-top: 0;
            position: static;
        }
        .el-tabs__item {
            height: 36px;
            line-height: 36px;
            padding: 0 25px;
            background: #eee;
            color: #999;
            border-radius: 4px 4px 0 0;
        }
        .el-collapse-item__content {
            font-size: 12px;
            color: #333;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item {
            border: 1px solid #ccc;
        }
        .el-tabs__item.is-active {
            color: #29a7e1;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
            border-top: 2px solid #29a7e1;
            border-bottom-color: #fff;
            position: relative;
            top: 1px;
            background: #f7fcff;
        }
        .temporary-tabs .el-tabs__item:not(.is-active){
            margin-right:0;
        }
        .upload-demo{
            display:inline-block;
        }
        .el-upload-list{
            display:none;
        }
    }
</style>
