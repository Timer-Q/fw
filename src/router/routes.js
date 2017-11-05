import Billing from '@Billing/router'
import B2B from '@B2B/router'
import Pay from '@Pay/router'
import Crm from '@Crm/router'
import Iframe from '@Iframe/router/index.js'
import Permission from '@Permission/router/index.js'
import Tms from '@Tms/router/index.js'
import Wms from '@Wms/router/index.js'
import CodeRule from '@CodeRule/router/index.js'
import Scm from '@Scm/router/index.js'
const NotFoundContainer = r => require.ensure([], () => r(require('@/containers/NotFoundContainer.vue')), '404')

export default [
    ...B2B,
    ...Crm,
    ...Billing,
    ...Pay,
    ...Iframe,
    ...Permission,
    ...Tms,
    ...Wms,
    ...CodeRule,
    ...Scm,
    // {path: '/', redirect: '/pay'},
    {path: '404', component: NotFoundContainer},
    {path: '*', component: NotFoundContainer},
]
