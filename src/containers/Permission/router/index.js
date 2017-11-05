const systemNamePrefix = "permission_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@Permission/WelcomeContainer.vue'
import LoginContainer from '@Permission/LoginContainer.vue'
// 用户管理
const UserManage = r => require.ensure([], () => r(require('@Permission/containers/userManage/UserManage.vue')), 'UserManage')
// 角色管理
const RoleManage = r => require.ensure([], () => r(require('@Permission/containers/roleManage/RoleManage.vue')), 'RoleManage')
// 系统配置-集团级别
const BlocAdminEffectManage = r => require.ensure([], () => r(require('@Permission/containers/blocAdminEffectManage/BlocAdminEffectManage.vue')), 'BlocAdminEffectManage')
// 授权管理
const AdminManage = r => require.ensure([], () => r(require('@Permission/containers/adminManage/AdminManage.vue')), 'AdminManage')
const SystemConfig = r => require.ensure([], () => r(require('@Permission/containers/systemConfig/SystemConfig.vue')), 'SystemConfig')
const AreaManage = r => require.ensure([], () => r(require('@Permission/containers/areaManage/AreaManage.vue')), 'AreaManage')
const BlocParamsSetting = r => require.ensure([], () => r(require('@Permission/containers/blocParamsSetting/BlocParamsSetting.vue')), 'BlocParamsSetting')
const DataPermissionAllot = r => require.ensure([], () => r(require('@Permission/containers/dataPermissionAllot/DataPermissionAllot.vue')), 'DataPermissionAllot')
// 权限查询
const EffectPermission = r => require.ensure([], () => r(require('@Permission/containers/effectPermission/EffectPermission.vue')), 'EffectPermission')
const DataPermission = r => require.ensure([], () => r(require('@Permission/containers/dataPermission/DataPermission.vue')), 'DataPermission')
const OrgPermission = r => require.ensure([], () => r(require('@Permission/containers/orgPermission/OrgPermission.vue')), 'OrgPermission')


// 组织管理 ---》 集团管理 （暂时放在这）
const GroupManage = r => require.ensure([], () => r(require('@Permission/containers/groupManage/GroupManage.vue')), 'GroupManage')

export default [
    {
        path: '/permission',
        component: MainContainer,
        children: [
            {path: '', component: WelcomeContainer},
            {
                path: 'userManage',
                name: `${systemNamePrefix}userManage`,
                component: UserManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'roleManage',
                name: `${systemNamePrefix}roleManage`,
                component: RoleManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'blocAdminEffectManage',
                name: `${systemNamePrefix}blocAdminEffectManage`,
                component: BlocAdminEffectManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'adminManage',
                name: `${systemNamePrefix}adminManage`,
                component: AdminManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'systemConfig',
                name: `${systemNamePrefix}systemConfig`,
                component: SystemConfig,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'areaManage',
                name: `${systemNamePrefix}areaManage`,
                component: AreaManage,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'blocParamsSetting',
                name: `${systemNamePrefix}blocParamsSetting`,
                component: BlocParamsSetting,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'dataPermissionAllot',
                name: `${systemNamePrefix}dataPermissionAllot`,
                component: DataPermissionAllot,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'effectPermission',
                name: `${systemNamePrefix}effectPermission`,
                component: EffectPermission,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'dataPermission',
                name: `${systemNamePrefix}dataPermission`,
                component: DataPermission,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'orgPermission',
                name: `${systemNamePrefix}orgPermission`,
                component: OrgPermission,
                meta: {requiresAuth: true, keepAlive: true}
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/org',
        component: MainContainer,
        children: [
            {path: '', component: WelcomeContainer},
            {
                path: 'groupManage',
                name: `${systemNamePrefix}groupManage`,
                component: GroupManage,
                meta: {requiresAuth: true, keepAlive: true}
            }
        ],
        meta: {requiresAuth: true}
    },
    {path: '/permissionLogin', component: LoginContainer, meta: {requiresAuth: true, keepAlive: true}},
]
