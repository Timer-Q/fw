const systemNamePrefix = "crm_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@Crm/WelcomeContainer.vue'
import LoginContainer from '@Crm/LoginContainer.vue'

const ItemLibraryOverallMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/itemLibrary/itemLibraryOverall/ItemLibraryOverallMain.vue')), 'itemLibraryOverallMain')
const ItemLibraryGroupMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/itemLibrary/itemLibraryGroup/ItemLibraryGroupMain.vue')), 'itemLibraryGroupMain')
/*** 业务单元 ***/
// const ItemLibraryBusinessUnitMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/itemLibrary/itemLibraryBusinessUnit/ItemLibraryBusinessUnitMain.vue')), 'itemLibraryBusinessUnitMain')
const DropdownListMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/itemLibrary/dropdownList/DropdownListMain.vue')), 'dropdownListMain')
const TermGlobalMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/termLibrary/termGlobal/TermGlobalMain.vue')), 'termGlobalMain')
const TermGroupMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/termLibrary/termGroup/TermGroupMain.vue')), 'termGroupMain')
const TermClassifyGlobalMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/termLibrary/termClassifyGlobal/TermClassifyGlobalMain.vue')), 'termClassifyGlobalMain')
const TermClassifyGroupMain = r => require.ensure([], () => r(require('@Crm/containers/contractManagement/termLibrary/termClassifyGroup/TermClassifyGroupMain.vue')), 'termClassifyGroupMain')

// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
// const ItemView = () => import('../views/ItemView.vue')
// const UserView = () => import('../views/UserView.vue')
// createListView('top')


// const CrmVuea = () =>import(/* webpackChunkName: "Crma" */ '@Crm/containers/aa/Btoba.vue').then(m => m.default())
// const CrmVueb = () =>import(/* webpackChunkName: "Crmb" */ '@Crm/containers/aa/Btobb.vue').then(m => m.default())
// import CrmVue1 from '@Crm/containers/aa/Btoba.vue'
// import CrmVue2 from '@Crm/containers/aa/Btobb.vue'

export default [
    {
        path: '/crm',
        component: MainContainer,
        children: [
            {path: '', component: WelcomeContainer},
            {
                path: 'itemLibraryOverallMain',
                name: `${systemNamePrefix}itemLibraryOverallMain`,
                component: ItemLibraryOverallMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'itemLibraryGroupMain',
                name: `${systemNamePrefix}itemLibraryGroupMain`,
                component: ItemLibraryGroupMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
            /*** 业务单元 ***/
            // {
            //     path: 'itemLibraryBusinessUnitMain',
            //     name: `${systemNamePrefix}itemLibraryBusinessUnitMain`,
            //     component: ItemLibraryBusinessUnitMain,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
            {
                path: 'dropdownListMain',
                name: `${systemNamePrefix}dropdownListMain`,
                component: DropdownListMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'termGlobalMain',
                name: `${systemNamePrefix}termGlobalMain`,
                component: TermGlobalMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'termGroupMain',
                name: `${systemNamePrefix}termGroupMain`,
                component: TermGroupMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'termClassifyGlobalMain',
                name: `${systemNamePrefix}termClassifyGlobalMain`,
                component: TermClassifyGlobalMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'termClassifyGroupMain',
                name: `${systemNamePrefix}termClassifyGroupMain`,
                component: TermClassifyGroupMain,
                meta: {requiresAuth: true, keepAlive: true}
            },
        ],
        meta: {requiresAuth: true}
    },
    {path: '/crmLogin', component: LoginContainer, meta: {requiresAuth: true, keepAlive: true}},
]
