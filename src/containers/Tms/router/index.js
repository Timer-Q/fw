const systemNamePrefix = "tms_"

import MainContainer from '@/containers/MainContainer'
import WelcomeContainer from '@Tms/WelcomeContainer'
import LoginContainer from '@Tms/LoginContainer'
const BusinessPlatform = r => require.ensure([], () => r(require('@Tms/containers/base/businessPlatform/BusinessPlatform.vue')), 'businessPlatform')
const PayChannel = r => require.ensure([], () => r(require('@Tms/containers/base/payChannel/PayChannel.vue')), 'payChannel')
const CompanyUserManage = r => require.ensure([], () => r(require('@Tms/containers/company/CompanyUserManage.vue')), 'companyUserManage')
// 派车单
const DispatcherList = r => require.ensure([], () => r(require('@Tms/containers/dispatcher/dispatcherList/dispatcherList.vue')), 'dispatcherList')
// const DispatcherList = r => require.ensure([], () => r(require('@Tms/containers/dispatcher/dispatcherList')), 'dispatcherList')

const VehicleManage = r => require.ensure([], () => r(require('@Tms/containers/vehicle/VehicleMagContainer.vue')), 'vehicleManage')
const DriverManage = r => require.ensure([], () => r(require('@Tms/containers/driver/DriverMagContainer.vue')), 'driverManage')
// 运力分配
// 石国庆注释：缺少这个文件
// const CapacityManage = r => require.ensure([], () => r(require('@Tms/containers/capacity/capacityMagContainer.vue')), 'capacityManage')

//城配
const All = r => require.ensure([], () => r(require('@Tms/containers/awbquery/all.vue')), 'all')
const Waybill = r => require.ensure([], () => r(require('@Tms/containers/awbquery/waybill.vue')), 'waybill')
const Manage = r => require.ensure([], () => r(require('@Tms/containers/awbquery/manage.vue')), 'manage')
const Assign = r => require.ensure([], () => r(require('@Tms/containers/awbquery/assign.vue')), 'assign')
const Taking = r => require.ensure([], () => r(require('@Tms/containers/awbquery/taking.vue')), 'taking')
const Loading = r => require.ensure([], () => r(require('@Tms/containers/awbquery/loading.vue')), 'loading')
const Depart = r => require.ensure([], () => r(require('@Tms/containers/awbquery/depart.vue')), 'depart')
const Withdraw = r => require.ensure([], () => r(require('@Tms/containers/awbquery/withdraw.vue')), 'withdraw')

//点击指派司机按钮
const Driver = r => require.ensure([], () => r(require('@Tms/containers/awbquery/driver.vue')), 'driver')

//指派司机 指派车队 指派地图
const Chauffeur = r => require.ensure([], () => r(require('@Tms/containers/awbquery/chauffeur.vue')), 'chauffeur')
const Fleet = r => require.ensure([], () => r(require('@Tms/containers/awbquery/fleet.vue')), 'fleet')
const Map = r => require.ensure([], () => r(require('@Tms/containers/awbquery/map.vue')), 'map')

//区块管理
const Blockmanage = r => require.ensure([], () => r(require('@Tms/containers/blockmanage/blockmanage.vue')), 'blockmanage')


//经销商规则
const Dealer = r => require.ensure([], () => r(require('@Tms/containers/dealer/Dealer.vue')), 'Dealer')

//派车线路
const Route = r => require.ensure([], () => r(require('@Tms/containers/delivery/route.vue')), 'route')
//司机派车线路
const DriverDispatchRouteAdd = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/DriverDispatchRouteAdd.vue')), 'driverDispatchRouteAdd')
const DriverDispatchRouteUpdate = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/DriverDispatchRouteUpdate.vue')), 'driverDispatchRouteUpdate')
const DriverDispatchRouteQuery = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/DriverDispatchRouteQuery.vue')), 'driverDispatchRouteQuery')
const DriverDispatchRoute = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/DriverDispatchRoute.vue')), 'driverDispatchRoute')
const TransferRecordList = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/TransferRecordList.vue')), 'transferRecordList')
const TransferRecordDetail = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/TransferRecordDetail.vue')), 'transferRecordDetail')
const DriverDispatchTransfer = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/DriverDispatchTransfer.vue')), 'driverDispatchTransfer')
const DriverDispatchDetail = r => require.ensure([], () => r(require('@Tms/containers/driverDispatchRoute/DriverDispatchDetail.vue')), 'driverDispatchDetail')


export default [
    {
        path: '/tms',
        component: MainContainer,
        children: [{
            path: '',
            component: WelcomeContainer
        },
            {
                path: 'businessPlatform',
                name: `${systemNamePrefix}businessPlatform`,
                component: BusinessPlatform,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'payChannel',
                name: `${systemNamePrefix}payChannel`,
                component: PayChannel,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'companyUserManage',
                name: `${systemNamePrefix}companyUserManage`,
                component: CompanyUserManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'dispatcherList',
                name: `${systemNamePrefix}dispatcherList`,
                component: DispatcherList,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'vehicleManage',
                name: `${systemNamePrefix}vehicleManage`,
                component: VehicleManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'driverManage',
                name: `${systemNamePrefix}driverManage`,
                component: DriverManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            // 运力分配
            // 石国庆注释，缺少文件
            // {
            //     path: 'capacityManage',
            //     name: `${systemNamePrefix}capacityManage`,
            //     component: CapacityManage,
            //     meta: {requiresAuth: true, keepAlive: true},
            // },
            // 城配
            {
                path: 'all',
                // name: `${systemNamePrefix}all`,
                component: All,
                meta: {requiresAuth: true, keepAlive: true},
                children: [
                    {path: '', redirect: "/tms/all/waybill", component: Waybill},
                    {
                        path: 'waybill',
                        // name: `${systemNamePrefix}waybill`,
                        component: Waybill,
                        children: [
                            {path: '', redirect: "/tms/all/waybill/manage", component: Manage},
                            {path: 'manage', name: `${systemNamePrefix}manage`, component: Manage},
                            {path: 'assign', name: `${systemNamePrefix}assign`, component: Assign},
                            {path: 'taking', name: `${systemNamePrefix}taking`, component: Taking},
                            {path: 'loading', name: `${systemNamePrefix}loading`, component: Loading},
                            {path: 'depart', name: `${systemNamePrefix}depart`, component: Depart},
                            {path: 'withdraw', name: `${systemNamePrefix}withdraw`, component: Withdraw}

                        ]
                    },
                    {
                        path: 'driver',
                        // name: `${systemNamePrefix}driver`,
                        component: Driver,
                        children: [
                            {path: '', redirect: "/tms/all/driver/chauffeur", component: Chauffeur},
                            {path: 'chauffeur', name: `${systemNamePrefix}chauffeur`, component: Chauffeur},
                            {path: 'fleet', name: `${systemNamePrefix}fleet`, component: Fleet},
                            {path: 'map', name: `${systemNamePrefix}map`, component: Map},

                        ]
                    },

                ]
            },
            {//区块管理
                path: 'blockmanage',
                name: `${systemNamePrefix}blockmanage`,
                component: Blockmanage,
            },
            {//经销商规则
                path: 'Dealer',
                name: `${systemNamePrefix}Dealer`,
                component: Dealer,
            },
            {//派送线路
                path: 'route',
                name: `${systemNamePrefix}route`,
                component: Route,
                meta: {requiresAuth: true, keepAlive: true}
            },
            //司机派送线路
            {
                path: 'driverDispatchRouteAdd',
                name: `${systemNamePrefix}driverDispatchRouteAdd`,
                component: DriverDispatchRouteAdd,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'driverDispatchRouteQuery',
                name: `${systemNamePrefix}driverDispatchRouteQuery`,
                component: DriverDispatchRouteQuery,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'driverDispatchRoute',
                name: `${systemNamePrefix}driverDispatchRoute`,
                component: DriverDispatchRoute,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'transferRecordList',
                name: `${systemNamePrefix}transferRecordList`,
                component: TransferRecordList,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'transferRecordDetail',
                name: `${systemNamePrefix}transferRecordDetail`,
                component: TransferRecordDetail,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'driverDispatchTransfer',
                name: `${systemNamePrefix}driverDispatchTransfer`,
                component: DriverDispatchTransfer,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'driverDispatchDetail',
                name: `${systemNamePrefix}driverDispatchDetail`,
                component: DriverDispatchDetail,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'driverDispatchRouteUpdate',
                name: `${systemNamePrefix}driverDispatchRouteUpdate`,
                component: DriverDispatchRouteUpdate,
                meta: {requiresAuth: true, keepAlive: true}
            }
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tmslogin',
        component: LoginContainer,
        meta: {requiresAuth: true, keepAlive: true}
    },
]
