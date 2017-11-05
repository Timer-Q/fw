const systemNamePrefix = "wms_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@Wms/WelcomeContainer.vue'
import LoginContainer from '@Wms/LoginContainer.vue'


import generate from '@Wms/containers/viewContainer'

const wms_demo1 = r => require.ensure([], () => r(require('@Wms/containers/demo/demo1.vue')), 'demo1')
const wms_demo2 = r => require.ensure([], () => r(require('@Wms/containers/demo/demo2.vue')), 'demo2')


/*基础数据*/
//货主库区管理
const wms_ownerWarehouseRelationManage = r => require.ensure([], () => r(require('@Wms/containers/basicData/ownerWarehouseRelationManage/ownerWarehouseRelationManage.vue')), 'ownerWarehouseRelationManage')
//库区线路管理
const wms_warehouseAreaRouteManage = r => require.ensure([], () => r(require('@Wms/containers/basicData/warehouseAreaRouteManage/warehouseAreaRouteManage.vue')), 'warehouseAreaRouteManage')
//容器类型
const wms_containerTypeManage = r => require.ensure([], () => r(require('@Wms/containers/basicData/containerTypeManage/containerTypeManage.vue')), 'containerTypeManage')
//容器管理
const wms_containerManage = r => require.ensure([], () => r(require('@Wms/containers/basicData/containerManage/containerManage.vue')), 'containerManage')
const wms_locationManager = r => require.ensure([], () => r(require('@Wms/containers/basicData/locationManage/locationManage.vue')), 'locationManage')
const wms_loaderTeamManager = r => require.ensure([], () => r(require('@Wms/containers/basicData/loaderTeamManager/loaderTeamManager.vue')), 'loaderTeamManager')
const wms_platformMessage = r => require.ensure([], () => r(require('@Wms/containers/basicData/platformMessage/platformMessage.vue')), 'platformMessage')
// 仓库管理
const wms_warehouseManager = r => require.ensure([], () => r(require('@Wms/containers/basicData/warehouseManage/warehouseManaged.vue')), 'warehouseManaged')
// 库区管理
const wms_warehouseAreaManager = r => require.ensure([], () => r(require('@Wms/containers/basicData/warehouseAreaManage/warehouseAreaManaged.vue')), 'warehouseAreaManaged')
const wms_posManage = r => require.ensure([], () => r(require('@Wms/containers/basicData/posManage/posManage.vue')), 'posManage')

// 到货登记
const wms_arrivalRegistration = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/arrivalRegistration/arrivalRegistration.vue')), 'arrivalRegistration')
// 贴码
const wms_pastCodeManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/pasteCodeManage/pasteCodeManage.vue')), 'pasteCodeManage')
const wms_pastCodeNew = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/pasteCodeManage/newReceipts.vue')), 'pastCodeNew')
const wms_pastCodeModify = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/pasteCodeManage/modifyReceipts.vue')), 'pasteCodeModify')
// 入库通知单
const wms_warehouseWarrantManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/warehouseWarrantManage/warehouseWarrantManage.vue')), 'warehouseWarrantManage')
// 收货差异管理
const wms_receivingDifferenceManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/receivingDifferenceManage/receivingDifferenceManage.vue')), 'receivingDifferenceManage')
// 收货入库作业管理
const wms_receivingPutManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/receivingPutManage/receivingPutManage.vue')), 'receivingPutManage')
// 收货作业管理
const wms_goodsReceivingManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/goodsReceivingManage/goodsReceivingManage.vue')), 'goodsReceivingManage')
// 新品维护
const wms_newProductProtection = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/newProductProtection/newProductProtection.vue')), 'newProductProtection')
// pc收货
const wms_PCreceiving = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/PCreceiving/PCreceiving.vue')), 'PCreceiving')
// 卸货单管理
const wms_handlingorderManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/handlingorderManage/handlingorderManage.vue')), 'handlingorderManage')
// 增值服务管理
const wms_valueAddedServiceManage = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/valueAddedServiceManage/valueAddedServiceManage.vue')), 'valueAddedServiceManage')
const wms_valueAddedServiceNew = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/valueAddedServiceManage/newValueAddedService.vue')), 'newValueAddedService')
// 策略配置
const wms_policyConfiguration = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/policyConfiguration/policyConfiguration.vue')), 'policyConfiguration')
//条码异常管理
//const wms_barcodeException = r => require.ensure([], () => r(require('@Wms/containers/arrivalWarehousing/barcodeExceptionManage/barcodeExceptionManage.vue')), 'barcodeExceptionManage')


// 销售出库
// 波次汇总
const wms_waveCollect = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/wave/collect.vue')), 'waveCollect')
// 波次管理
const wms_waveManager = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/wave/manager.vue')), 'waveManager')
// 拣选单分配
const wms_pickingAllocate = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/picking/allocate.vue')), 'pickingAllocate')
// 拣选确认
const wms_pickingConfirm = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/picking/confirm.vue')), 'pickingConfirm')
// 拣选单打印
const wms_pickingPrint = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/picking/print.vue')), 'pickingPrint')
// 拣选登记
const wms_pickingRegister = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/picking/register.vue')), 'pickingRegister')
// 拣选登记管理
const wms_pickingRegisterManager = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/picking/registerManager.vue')), 'pickingRegisterManager')
// 发货清单打印
const wms_pickingSendListPrint = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/picking/sendListPrint.vue')), 'pickingSendListPrint')
// 多品质检
const wms_multipleQC = r => require.ensure([], () => r(require('@Wms/containers/orderManagement/qc/multiple.vue')), 'multipleQC')


/*库内管理*/
//下架单登记
const wms_singleShelfRegistration = r => require.ensure([], () => r(require('@Wms/containers/libraryManagement/singleShelfRegistration/singleShelfRegistration.vue')), 'singleShelfRegistration')
//上架单登记
const wms_putawayListRegister = r => require.ensure([], () => r(require('@Wms/containers/libraryManagement/putawayListRegister/putawayListRegister.vue')), 'putawayListRegister')
//盘点管理
const wms_reviewManager = r => require.ensure([], () => r(require('@Wms/containers/libraryManagement/reviewManager/reviewManager.vue')), 'reviewManager')
//盘点计划管理
const wms_reviewPlanManage = r => require.ensure([], () => r(require('@Wms/containers/libraryManagement/reviewPlanManage/reviewPlanManage.vue')), 'reviewPlanManage')
//盘点计新增
const wms_addReviewPlan = r => require.ensure([], () => r(require('@Wms/containers/libraryManagement/reviewPlanManage/addReviewPlan.vue')), 'addReviewPlan')


/*退供出库*/
//包件管理
// 石国庆注销
// const wms_balseManage = r => require.ensure([], () => r(require('@Wms/containers/returnDelivery/balseManage/balseManage.vue')), 'balseManage')
//出库差异管理
// const wms_outstockDifferenceManage = r => require.ensure([], () => r(require('@Wms/containers/returnDelivery/outstockDifferenceManage/outstockDifferenceManage.vue')), 'outstockDifferenceManage')
//出库通知管理
const wms_outstockNoticeManage = r => require.ensure([], () => r(require('@Wms/containers/returnDelivery/outstockNoticeManage/outstockNoticeManage.vue')), 'outstockNoticeManage')
//质检差异管理
const wms_qualityInspectionDifferenceManage = r => require.ensure([], () => r(require('@Wms/containers/returnDelivery/qualityInspectionDifferenceManage/qualityInspectionDifferenceManage.vue')), 'qualityInspectionDifferenceManage')
//质检组包
const wms_qualityInspectionBurstification = r => require.ensure([], () => r(require('@Wms/containers/returnDelivery/qualityInspectionBurstification/qualityInspectionBurstification.vue')), 'qualityInspectionBurstification')

/*销退入库*/
// 销退单管理
const wms_salesRefundSheet = r => require.ensure([], () => r(require('@Wms/containers/salesReturnManage/salesRefundSheet/salesRefund.vue')), 'salesRefund')
// 到货登记确认
const wms_cargoRegister = r => require.ensure([], () => r(require('@Wms/containers/salesReturnManage/cargoRegister/cargoRegister.vue')), 'cargoRegister')
// 销退批次管理
const wms_salesRefundBatch = r => require.ensure([], () => r(require('@Wms/containers/salesReturnManage/salesRefundBatch/salesRefundBatch.vue')), 'salesRefundBatch')
// 销退质检
const wms_salesQualityTesting = r => require.ensure([], () => r(require('@Wms/containers/salesReturnManage/salesQualityTesting/salesQualityTesting.vue')), 'salesQualityTesting')
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
// const ItemView = () => import('../views/ItemView.vue')
// const UserView = () => import('../views/UserView.vue')
// createListView('top')
// const B2BVuea = () =>import(/* webpackChunkName: "B2Ba" */ '@B2B/containers/aa/Btoba.vue').then(m => m.default())
// const B2BVueb = () =>import(/* webpackChunkName: "B2Bb" */ '@B2B/containers/aa/Btobb.vue').then(m => m.default())
// import B2BVue1 from '@B2B/containers/aa/Btoba.vue'
// import B2BVue2 from '@B2B/containers/aa/Btobb.vue'

const routers = [
    {
        path: '/wms',
        component: MainContainer,
        children: [
            {path: '', component: WelcomeContainer},
            {   //收货入库
                path: 'arrivalWarehousing/arrivalRegistration', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_arrivalRegistration`, //  命名规则:模块路径_页面路径
                component: generate(wms_arrivalRegistration, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_arrivalRegistration`,
                    titleName: '到货登记'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/pasteCodeManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_pasteCodeManage`, //  命名规则:模块路径_页面路径
                component: generate(wms_pastCodeManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_pasteCodeManage`,
                    titleName: '贴码管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/pasteCodeNew', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_pastCodeNew`, //  命名规则:模块路径_页面路径
                component: generate(wms_pastCodeNew, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_pastCodeNew`,
                    titleName: '新建贴码'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/pastCodeModify', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_pastCodeModify`,
                component: generate(wms_pastCodeModify, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_pastCodeModify`,
                    titleName: '修改贴码'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/warehouseWarrantManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_warehouseWarrantManage`,
                component: generate(wms_warehouseWarrantManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_warehouseWarrantManage`,
                    titleName: '入库通知单管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/receivingDifferenceManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_receivingDifferenceManage`,
                component: generate(wms_receivingDifferenceManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_receivingDifferenceManage`,
                    titleName: '收货差异管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/receivingPutManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_receivingPutManage`,
                component: generate(wms_receivingPutManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_receivingPutManage`,
                    titleName: '收货入库管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/goodsReceivingManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_goodsReceivingManage`,
                component: generate(wms_goodsReceivingManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_goodsReceivingManage`,
                    titleName: '收货作业管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/newProductProtection', // 命名规则:模块路径/页面路径
                // 石国庆注释：重复的name
                // name: `${systemNamePrefix}arrivalWarehousing_newProductProtection`,
                component: generate(wms_newProductProtection, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_newProductProtection`,
                    titleName: '新品维护'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/newProductProtection/:id', // 命名规则:模块路径/页面路径
                // 石国庆注释：重复的name
                // name: `${systemNamePrefix}arrivalWarehousing_newProductProtection`,
                component: generate(wms_newProductProtection, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_newProductProtection`,
                    titleName: '新品维护'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/PCreceiving', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_PCreceiving`,
                component: generate(wms_PCreceiving, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_PCreceiving`,
                    titleName: 'PC收货'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/handlingorderManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_handlingorderManage`,
                component: generate(wms_handlingorderManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_handlingorderManage`,
                    titleName: '卸货单管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/valueAddedServiceManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_valueAddedServiceManage`,
                component: generate(wms_valueAddedServiceManage, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_valueAddedServiceManage`,
                    titleName: '增值服务管理'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/newValueAddedService', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_newValueAddedService`,
                component: generate(wms_valueAddedServiceNew, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_newValueAddedService`,
                    titleName: '新增增值服务'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'arrivalWarehousing/policyConfiguration', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}arrivalWarehousing_policyConfiguration`,
                component: generate(wms_policyConfiguration, {
                    keepAlive: true,
                    tag: `${systemNamePrefix}arrivalWarehousing_policyConfiguration`,
                    titleName: '策略配置'
                }),
                meta: {requiresAuth: true, keepAlive: true}
            },
            {  //波次汇总
                path: 'orderManagement/waveCollect', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_wave_collect`,
                component: wms_waveCollect,
                meta: {requiresAuth: true, keepAlive: true, titleName: '波次汇总'}
            },
            {
                path: 'orderManagement/waveManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_wave_manager`,
                component: wms_waveManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: '波次管理'}
            },
            {
                path: 'orderManagement/pickingAllocate', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_picking_allocate`,
                component: wms_pickingAllocate,
                meta: {requiresAuth: true, keepAlive: true, titleName: '拣选单分配'}
            },
            {
                path: 'orderManagement/pickingConfirm', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_picking_confirm`,
                component: wms_pickingConfirm,
                meta: {requiresAuth: true, keepAlive: true, titleName: '拣选确认'}
            },
            {
                path: 'orderManagement/pickingPrint', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_picking_print`,
                component: wms_pickingPrint,
                meta: {requiresAuth: true, keepAlive: true, titleName: '拣选单打印'}
            },
            {
                path: 'orderManagement/pickingRegister', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_picking_register`,
                component: wms_pickingRegister,
                meta: {requiresAuth: true, keepAlive: true, titleName: '拣选登记'}
            },
            {
                path: 'orderManagement/pickingRegisterManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_picking_registerManager`,
                component: wms_pickingRegisterManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: '拣选登记管理'}
            },
            {
                path: 'orderManagement/pickingSendListPrint', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_picking_sendListPrint`,
                component: wms_pickingSendListPrint,
                meta: {requiresAuth: true, keepAlive: true, titleName: '发货清单打印'}
            },
            {
                path: 'orderManagement/multipleQC', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}orderManagement_qc_multipleQC`,
                component: wms_multipleQC,
                meta: {requiresAuth: true, keepAlive: true, titleName: '多品质检'}
            },
            /*库内管理*/
            {   //下架单登记
                path: 'libraryManagement/singleShelfRegistration', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}libraryManagement_singleShelfRegistration`,
                component: wms_singleShelfRegistration,
                meta: {requiresAuth: true, keepAlive: true, titleName: '下架单登记'}
            },
            {   //上架单登记
                path: 'libraryManagement/putawayListRegister', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}libraryManagement_putawayListRegister`,
                component: wms_putawayListRegister,
                meta: {requiresAuth: true, keepAlive: true, titleName: '上架单登记'}
            },
            {   //盘点管理
                path: 'libraryManagement/reviewManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}libraryManagement_reviewManager`,
                component: wms_reviewManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: '盘点管理'}
            },
            {   //盘点计划管理
                path: 'libraryManagement/reviewPlanManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}libraryManagement_reviewPlanManage`,
                component: wms_reviewPlanManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: '盘点计划管理'}
            },
            {   //盘点计划新增
                path: 'libraryManagement/addReviewPlan', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}libraryManagement_addReviewPlan`,
                component: wms_addReviewPlan,
                meta: {requiresAuth: true, keepAlive: true, titleName: '盘点计划新增'}
            },
            // 石国庆注释
            /*退供出库*/
            // {   //包件管理
            //     path: 'returnDelivery/balseManage', // 命名规则:模块路径/页面路径
            //     name: `${systemNamePrefix}returnDelivery_balseManage`,
            //     component: wms_balseManage,
            //     meta: {requiresAuth: true, keepAlive: true, titleName: '包件管理'}
            // },
            // {   //出库差异管理
            //     path: 'returnDelivery/outstockDifferenceManage', // 命名规则:模块路径/页面路径
            //     name: `${systemNamePrefix}returnDelivery_outstockDifferenceManage`,
            //     component: wms_outstockDifferenceManage,
            //     meta: {requiresAuth: true, keepAlive: true, titleName: '出库差异管理'}
            // },
            {   //出库通知管理
                path: 'returnDelivery/outstockNoticeManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}returnDelivery_outstockNoticeManage`,
                component: wms_outstockNoticeManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: '出库通知管理'}
            },
            {   //质检差异管理
                path: 'returnDelivery/qualityInspectionDifferenceManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}returnDelivery_qualityInspectionDifferenceManage`,
                component: wms_qualityInspectionDifferenceManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: '质检差异管理'}
            },
            {   //质检组包
                path: 'returnDelivery/qualityInspectionBurstification', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}returnDelivery_qualityInspectionBurstification`,
                component: wms_qualityInspectionBurstification,
                meta: {requiresAuth: true, keepAlive: true, titleName: '质检组包'}
            },
            /*销退管理*/
            {   //销退单管理
                path: 'salesReturnManage/salesRefundSheet', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}salesReturnManage_salesRefundSheet`,
                component: wms_salesRefundSheet,
                meta: {requiresAuth: true, keepAlive: true, titleName: "销退单管理"}
            },
            {   //到货登记管理
                path: 'salesReturnManage/cargoRegister', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}salesReturnManage_cargoRegister`,
                component: wms_cargoRegister,
                meta: {requiresAuth: true, keepAlive: true, titleName: "到货登记管理"}
            },
            {   //销退质检
                path: 'salesReturnManage/salesQualityTesting', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}salesReturnManage_salesQualityTesting`,
                component: wms_salesQualityTesting,
                meta: {requiresAuth: true, keepAlive: true, titleName: "销退质检"}
            },
            {   //销退批次管理
                path: 'salesReturnManage/salesRefundBatch', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}salesReturnManage_salesRefundBatch`,
                component: wms_salesRefundBatch,
                meta: {requiresAuth: true, keepAlive: true, titleName: "销退批次管理"}

            },
            /*基础数据*/
            /*货主库区管理*/
            {//货主库区管理
                path: 'basicData/warehouseAreaRouteManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_warehouseAreaRouteManage`,
                component: wms_warehouseAreaRouteManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: "库区线路管理"}
            },
            /*库区线路管理*/
            {   //库区线路管理
                path: 'basicData/ownerWarehouseRelationManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_ownerWarehouseRelationManage`,
                component: wms_ownerWarehouseRelationManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: "库区线路管理"}
            },
            {   //容器类型管理
                path: 'basicData/containerTypeManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_containerTypeManage`,
                component: wms_containerTypeManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: "容器类型管理"}
            },
            {   //容器管理
                path: 'basicData/containerManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_containerManage`,
                component: wms_containerManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: "容器管理"}
            },
            {   //POS台管理
                path: 'basicData/posManage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_posManage`,
                component: wms_posManage,
                meta: {requiresAuth: true, keepAlive: true, titleName: "POS管理"}
            },
            {   //货位管理
                path: 'basicData/locationManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_locationManager`,
                component: wms_locationManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: "货位管理"}
            },
            {   //裝卸队管理
                path: 'basicData/loaderTeamManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_loaderTeamManager`,
                component: wms_loaderTeamManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: "装卸队管理"}
            },
            {   //仓库管理
                path: 'basicData/warehouseManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_warehouseManager`,
                component: wms_warehouseManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: "仓库管理"}
            },
            {   //月台管理
                path: 'basicData/platformMessage', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_platformMessage`,
                component: wms_platformMessage,
                meta: {requiresAuth: true, keepAlive: true, titleName: "月台管理"}
            },
            {   //库区管理
                path: 'basicData/warehouseAreaManager', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}basicData_warehouseAreaManager`,
                component: wms_warehouseAreaManager,
                meta: {requiresAuth: true, keepAlive: true, titleName: "库区管理"}
            },
            /*示例*/
            {   //示例1
                path: 'demo/demo1', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}demo_demo1`,
                component: wms_demo1,
                meta: {requiresAuth: true, keepAlive: true, titleName: "示例1"}
            },
            {   //示例2
                path: 'demo/demo2', // 命名规则:模块路径/页面路径
                name: `${systemNamePrefix}demo_demo2`,
                component: wms_demo2,
                meta: {requiresAuth: true, keepAlive: true, titleName: "示例2"}
            }



            /*{path: 'a', name: `${systemNamePrefix}a`, component: B2BVuea, meta: {requiresAuth: true, keepAlive: true}},
             {path: 'b', name: `${systemNamePrefix}b`, component: B2BVueb, meta: {requiresAuth: true, keepAlive: true}},*/
        ],
        meta: {requiresAuth: true}
    },
    {path: '/wmsLogin', component: LoginContainer, meta: {requiresAuth: true, keepAlive: true}}
]

// debugger

for (var i in routers[0].children) {
    // viewContainerFor
    let route = routers[0].children[i]
    if (typeof route.meta !== "object" || route.meta.autoGenerate === false) {
        continue
    }
    else {
        if (typeof route.component.name === "string" && route.component.name.indexOf('viewContainerFor') > -1) {
            continue
        }
    }
    let genOptions = {}
    genOptions = Object.assign(route.meta, genOptions)
    genOptions.system = '/wms'
    genOptions.tag = route.name
    if (typeof genOptions.titleName === 'undefined') {
        continue
    }
    route.component = generate(route.component, genOptions)
}

export default routers
