<template>
    <div class="wms-items"  v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <div class="btnGroup">
                    <a href="javascript:;">下载模版</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">导入</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;">日志</a>
                </div>
                <div class="btnGroup">
                    <a href="javascript:;" @click="onSubmit">完成维护</a>
                </div>
            </div>
        </div>
        <!--标签功能操作栏  end-->

        <!--主体内容  start-->
        <div class="wms-main">
            <div class="mainContainer clearfix">
                <!--右侧新增  start-->
                <div class="newContent">
                    <el-form class="newContentBox" :model="newProForm">
                        <div class="newContentBox-t productBasicInfo">
                            <div class="basicInfoHead">商品基本信息</div>
                            <div class="groupL">
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">商品条码</span>
                                    <el-input placeholder="" id='goodsBarCodeInput' v-model="newProForm.wmsGoodsBaseDto.goodsBarCode"></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">商品名称</span>
                                    <el-input placeholder="" v-model="newProForm.wmsGoodsBaseDto.goodsName" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">温控属性</span>
                                    <el-select v-model="newProForm.wmsGoodsBaseDto.temperatureControl" placeholder="请选择" disabled>
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <i class="iconfont icon-xiajiantou"></i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">保质期管理</span>
                                    <el-select v-model="newProForm.wmsGoodsBaseDto.isShelflife" placeholder="请选择" disabled>
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <i class="iconfont icon-xiajiantou"></i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">禁收时效</span>
                                    <el-input placeholder="" class="hasUnit" v-model="newProForm.wmsGoodsBaseDto.noChargeDays" disabled></el-input>
                                    <i class="inputLine">瓶</i>
                                </div>
                            </div>
                            <div class="groupL">
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">货主</span>
                                    <el-select v-model="newProForm.wmsGoodsBaseDto.ownerId" placeholder="请选择">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <i class="iconfont icon-xiajiantou"></i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">包装规格</span>
                                    <el-input placeholder="" v-model="newProForm.wmsGoodsBaseDto.packSpec" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">整零转换</span>
                                    <el-input placeholder="" v-model="newProForm.wmsGoodsBaseDto.unitConvertText" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">保质期天数</span>
                                    <el-input placeholder="" v-model="newProForm.wmsGoodsBaseDto.shelflifeDays" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">禁售时效</span>
                                    <el-input placeholder="" v-model="newProForm.wmsGoodsBaseDto.noSaleDays" disabled></el-input>
                                </div>
                            </div>
                            <div class="groupL">
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">预警时效</span>
                                    <el-input placeholder="" v-model="newProForm.wmsGoodsBaseDto.warningDays" disabled></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="newContentBox-t warehouseManageInfo">
                            <div class="basicInfoHead">仓库管理信息</div>
                            <div class="f_l warehouseInput">
                                <span class="f_l ">存储规格</span>
                                <i class="star-icon">*</i>
                                <el-select v-model="newProForm.wmsWarehouseGoodsDto.storeSpec" placeholder="请选择">
                                    <el-option
                                        v-for="item in storeSpec"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="f_l warehouseInput">
                                <span class="f_l">仓储分类</span>
                                <i class="star-icon">*</i>
                                <el-select v-model="newProForm.wmsWarehouseGoodsDto.storageClass" placeholder="请选择" >
                                    <el-option
                                        v-for="item in storageClass"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="f_l warehouseInput">
                                <span class="f_l">商品ABC分类</span>
                                <i class="star-icon" style="left:76px;position:absolute">*</i>
                                <el-select v-model="newProForm.wmsWarehouseGoodsDto.goodsAbc" placeholder="请选择">
                                    <el-option
                                        v-for="item in goodsAbc"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="f_l warehouseInput">
                                <span class="f_l">是否贵品</span>
                                <i class="star-icon">*</i>
                                <el-select v-model="newProForm.wmsWarehouseGoodsDto.isPrecious" placeholder="请选择">
                                    <el-option
                                        v-for="item in isPrecious"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                        </div>
                        <div class="newContentBox-t assistanceManageInfo">
                            <div class="basicInfoHead">辅助管理信息</div>
                            <!--
                            	描述：该部分信息不再使用newProFrom内的信息，获取商品信息后会对该部分信息进行格式化为对象数据供此处使用，
                            	提交数据时会由对象数据转换为数组格式数据放到需要提交的数据中提交
                            -->
                            <div class="groupL">
                            	<!--一级 -->
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">一级计量单位</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].unit" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">长</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].length"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">体积</span>
                                    <el-input placeholder="" v-model="cubage1" disabled></el-input>
                                    <i class="units">m³</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">补货上限</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].replenishmentMax"></el-input>
                                </div>
                                <!--二级 -->
                                <div class="groupL-p ml-24 f_l marginTop">
                                    <span class="f_l">二级计量单位</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].unit" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">长</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].length"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">体积</span>
                                    <el-input placeholder="" v-model="cubage2" disabled></el-input>
                                    <i class="units">m³</i>
                                </div>
                                <!--三级 -->
                                <div class="groupL-p ml-24 f_l marginTop">
                                    <span class="f_l">三级计量单位</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].unit" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">长</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].length"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">体积</span>
                                    <el-input placeholder="" v-model="cubage3" disabled></el-input>
                                    <i class="units">m³</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">补货上限</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].replenishmentMax" ></el-input>
                                </div>
                            </div>
                            <div class="groupL">
                            	<!--一级 -->
                                <div class="groupL-p ml-24 f_l marginTop2">
                                    <span class="f_l">宽</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].width"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">重量</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].weight"></el-input>
                                    <i class="units">kg</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">补货下限</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].replenishmentLow"></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l marginTop">
                                    <span class="f_l">二级条码11</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].isPrecious" disabled></el-input>
                                </div>
                                <!--二级 -->
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">宽</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].width"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">重量</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].weight"></el-input>
                                    <i class="units">kg</i>
                                </div>
                                <div class="groupL-p ml-24 f_l marginTop">
                                    <span class="f_l">三级条码11</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].isPrecious" disabled></el-input>
                                </div>
                                <!--三级 -->
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">宽</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].width"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">重量</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].weight"></el-input>
                                    <i class="units">kg</i>
                                </div>
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">补货下限</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].replenishmentLow"></el-input>
                                </div>
                            </div>
                            <div class="groupL">
                            	<!--一级 -->
                                <div class="groupL-p ml-24 f_l marginTop2">
                                    <span class="f_l">高</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].high"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l marginTop2">
                                    <span class="f_l">补货基数</span>
                                    <el-input placeholder="" v-model="replenishmentUnit1" disabled></el-input>
                                </div>
                                <div class="groupL-p ml-24 f_l marginTop">
                                    <span class="f_l">二级条码11</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[1].isPrecious"></el-input>
                                </div>
                                <!--二级 -->
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">高</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].high"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l marginTop3">
                                    <span class="f_l">三级条码11</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[2].isPrecious"></el-input>
                                </div>
                                <!--三级 -->
                                <div class="groupL-p ml-24 f_l">
                                    <span class="f_l">高</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].high"></el-input>
                                    <i class="units">cm</i>
                                </div>
                                <div class="groupL-p ml-24 f_l marginTop2">
                                    <span class="f_l">补货基数</span>
                                    <el-input placeholder="" v-model="wmsGoodsAuxiliaryDtos[3].replenishmentUnit" disabled></el-input>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
                <!--右侧新增  end-->
            </div>
        </div>
    </div>
    <!--主体内容  end-->

    </div>
</template>
<script>
	import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
    let vm = null
    let api = {
        getInfoById: '/wms-base-server/wmsgoods/get', // 获取数据
        preparedList:'/wms-base-server/wmsgoods/prepared', // 新品维护
        getByBarCode:'/wms-base-server/wmsgoods/getByBarCode', // 根据条码和仓库id查询商品详情
    }
    export default {
    	mixins: [oneLevelTabMixins,twoLevelTabMixins],
        created(){
            vm = this
        },
        data () {
            return {
            	/*页签*/
				tag:'wms_arrivalWarehousing_newProductProtection',
                system:'/wms',
                titleName:'新品维护',
                // 存储表单数据
                newProForm:{
                    aaa:'a',
                    wmsGoodsBaseDto:{},
                    wmsWarehouseGoodsDto:{
                        storageClass:'1',
                        storeSpec:'1',
                        goodsAbc:' ',
                        isPrecious:'1',
                    },
                    wmsGoodsAuxiliaryDtos:{}
                },
                wmsGoodsAuxiliaryDtos:{
                	1:{
                		width:0,
                		high:0,
                		length:0,
                		replenishmentUnit:0
                	},
                	2:{
                		width:0,
                		high:0,
                		length:0
                	},
                	3:{
                		width:0,
                		high:0,
                		length:0,
                		replenishmentUnit:1
                	}
                }, // 三级商品数据以对象的形式存储 {1:{},2:{},3:{}}
                input1:'',
                options:[{
                    value:'0',
                    label:'仓库'
                },{
                    value:'1',
                    label:'仓库'
                },{
                    value:'2',
                    label:'仓库'
                }],
                value:'',
                storeSpec: [{
                    value:0,
                    label:'整箱'
                },{
                    value:1,
                    label:'异性'
                },{
                    value:2,
                    label:'拆零'
                }],
                storageClass: [{
                    value:0,
                    label:'服装'
                },{
                    value:1,
                    label:'生鲜'
                },{
                    value:2,
                    label:'数码'
                }],
                goodsAbc: [{
                    value:0,
                    label:'A'
                },{
                    value:1,
                    label:'B'
                },{
                    value:2,
                    label:'C'
                }],
                isPrecious: [{
                    value:0,
                    label:'否'
                }, {
                    value: 1,
                    label: '是'
                }],
                warehouseBack:{
                    storageClass:'',
                    storeSpec:'',
                    goodsAbc:' ',
                    isPrecious:'',
                    warehouseId:'2000', // 需要获取
                },
                updateUser:'11111'
            }
        },
		computed:{
			cubage1(){
				console.log(2222323)
				return vm.wmsGoodsAuxiliaryDtos[1].cubage = (vm.wmsGoodsAuxiliaryDtos[1].width*vm.wmsGoodsAuxiliaryDtos[1].length*vm.wmsGoodsAuxiliaryDtos[1].high)/(100*100*100)
			},
			cubage2(){
				return vm.wmsGoodsAuxiliaryDtos[2].cubage = (vm.wmsGoodsAuxiliaryDtos[2].width*vm.wmsGoodsAuxiliaryDtos[2].length*vm.wmsGoodsAuxiliaryDtos[2].high)/(100*100*100)
			},
			cubage3(){
				return vm.wmsGoodsAuxiliaryDtos[3].cubage = (vm.wmsGoodsAuxiliaryDtos[3].width*vm.wmsGoodsAuxiliaryDtos[3].length*vm.wmsGoodsAuxiliaryDtos[3].high)/(100*100*100)
			},
			replenishmentUnit1(){
				return vm.wmsGoodsAuxiliaryDtos[1].replenishmentUnit = vm.wmsGoodsAuxiliaryDtos[3].replenishmentUnit*vm.wmsGoodsAuxiliaryDtos[1].unitConvert
			}
		},
        methods: {
            // 初始化
            init(){

                // 页面数据初始化
                console.log(this.$router.history.current.params.id)
                let id = vm.$router.history.current.params.id

                if(id){
                    this.getInfoById({
                        id:id,
                    })
                }else{
                    vm.newProForm = {
                        wmsGoodsBaseDto:{},
                        wmsWarehouseGoodsDto:vm.warehouseBack,
                        wmsGoodsAuxiliaryDtos:{},
                    }
                }

                // 页面事件，获取商品条码后回车请求商品数据
                let barInput = document.getElementById("goodsBarCodeInput")
                barInput.addEventListener("keydown", (e)=>{
                    if(e.keyCode == '13'){
                        vm.getByBarCode()
                    }
                })
            },

            // 通过商品id来获取商品信息
            getInfoById(org){
                vm.$request({
                    url:api.getInfoById,
                    context:vm,
                    sendData:{goodsId:org.id}, // {goodsId:org.id}
                    successCallback:(vm,response)=>{
                        vm.newProForm= Object.assign(vm.newProForm,response)
                        console.log(response)
                        vm.wmsGoodsAuxiliaryDtos = vm.arrToObject(vm.newProForm.wmsGoodsAuxiliaryDtos)
                        // 目前情况是接口返回这货有时候是null，所以设定一下值。
                        vm.wmsGoodsAuxiliaryDtos[3].replenishmentUnit = 1
                    }
                })
            },

            // 通过商品条码获取商品信息
            getByBarCode(){
                let barInput = document.getElementById("goodsBarCodeInput").getElementsByTagName('input')[0]
                let barCode = barInput.value

                vm.$request({
                    url:api.getByBarCode,
                    context:vm,
                    sendData:{goodsBarCode:barCode},
                    successCallback:(vm,response)=>{
                        let ginfo = response[0]
                        if(!ginfo.wmsWarehouseGoodsDto){
                            ginfo.wmsWarehouseGoodsDto = vm.warehouseBack
                        }

                        vm.newProForm= Object.assign(vm.newProForm,response[0])

                        // 把商品数据转换为对象
                        vm.wmsGoodsAuxiliaryDtos = Object.assign(vm.wmsGoodsAuxiliaryDtos,vm.arrToObject(vm.newProForm.wmsGoodsAuxiliaryDtos))
                        console.log(response)
                        // 目前情况是接口返回这货有时候是null，所以设定一下值。
                        vm.wmsGoodsAuxiliaryDtos[3].replenishmentUnit = 1
                    }
                })
            },

            // 格式化数据，主要做的就是把一级二级三级商品数据由数组转换成对象，
			arrToObject(arr){
				let len = arr.length -1
				let temObj = {}

				for(let i = len; i >= 0; i--){
					temObj[arr[i].unitLevel] = arr[i]
				}
				return temObj
			},

			// 在完成维护时再由对象转换为数组
			objToArr(obj){
				let temArr = []
				for(let i in obj){
					temArr.push(obj[i])
				}
				return temArr
			},

            // 提交保存
            onSubmit() {
                vm.newProForm.wmsGoodsBaseDto.warehouseId = '2000' // 公用数据获取。
				vm.newProForm.wmsGoodsAuxiliaryDtos = vm.objToArr(vm.wmsGoodsAuxiliaryDtos)
				// 当前后端接口去商品信息中获取更新用户信息，所以每个加一个（接口设计就这样，我也不清楚为啥，经沟通后续要调整到最外层）
				let len = vm.newProForm.wmsGoodsAuxiliaryDtos.length-1
				for(let i = len; i>=0; i--){
					vm.newProForm.wmsGoodsAuxiliaryDtos[i].updateUser = vm.updateUser
				}

				vm.newProForm.updateUser = vm.updateUser // 更新用户信息，添加到最外层
                vm.$request({
                    url:api.preparedList,
                    context:vm,
                    sendData:vm.newProForm,
                    successCallback:(vm,response)=>{
                        if(response.retCode == 1){
                            vm.$alert('新品维护完成！', "操作成功", {
                                confirmButtonText: '确定'
                            })
                        }else{
                            vm.$alert('', "操作失败", {
                                confirmButtonText: '确定'
                            })
                        }
                    }
                })
            }
        },

        mounted() {
            vm.init()
        }
    }
</script>

<style scoped lang="less" type="text/less">

    body{
        .newContent{
            margin:0;
            .units{
                top:0;
                right:7px;
            }
            .newContentBox{
                padding:10px 16px;
                box-sizing: border-box;
                .groupL .groupL-p{
                    margin-left:0;
                }
                .el-select{
                    left:0;
                }
                .newContentBox-t{
                    margin-bottom: 10px;
                    border-bottom: 2px solid #eee;
                    .basicInfoHead{
                        margin-bottom:16px;
                        color:#28a7e1;
                        text-align:left;
                    }
                }
                /*商品基本信息  start*/
                .newContentBox-t.productBasicInfo {
                    height:235px;
                    border-bottom: 2px solid #eee;
                    .basicInfoHead{
                        margin-bottom:16px;
                        color:#28a7e1;
                        text-align:left;
                    }
                    .groupL{
                        width:330px;
                        .groupL-p{
                            span{
                                width:60px;
                            }
                        }
                    }
                    .inputLine{
                        position:absolute;
                        top:0;
                        right:0;
                        border-left:1px solid #eee;
                        height:28px;
                        width:30px;
                        font-size:12px;
                        color:#333;
                    }

                }
                /*商品基本信息end*/

                /*仓库管理信息 start*/
                .warehouseManageInfo{
                    height:96px;
                    padding-bottom:20px;
                    .basicInfoHead{
                        margin-bottom:0;
                    }
                    .warehouseInput{
                        line-height:28px;
                        position:relative;
                        margin-top:16px;
                        .el-select{
                            margin:0 50px 0 10px;
                        }
                        .newArrow-country{
                            right:57px;
                            top:14px;
                        }
                        .star-icon{
                            left:52px;
                            z-index:2000;
                        }
                    }
                }
                /*仓库管理信息 end*/
                /*辅助管理信息  start*/
                .assistanceManageInfo{
                    height:500px;
                    border-bottom:0;
                    .groupL{
                        width:330px;
                        .groupL-p{
                            span{
                                width:72px;
                            }
                        }
                    }
                    .marginTop{
                        margin-top:28px;
                    }
                    .marginTop2{
                        margin-top:38px;
                    }
                    .marginTop3{
                        margin-top:66px;
                    }
                }
                /*辅助管理信息  end*/
            }
        }
    }
</style>
