const systemNamePrefix = "coderule_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@CodeRule/WelcomeContainer.vue'
import LoginContainer from '@CodeRule/LoginContainer.vue'
// 收款单
const ReceivableBill = r => require.ensure([], () => r(require('@CodeRule/containers/receivableBill/ReceivableBill.vue')), 'ReceivableBill')

export default [{
        path: '/coderule',
        component: MainContainer,
        children: [{
                path: '',
                component: WelcomeContainer
            },
            /**
             * 收款单
             */
            {
                path: 'receivableBill',
                component: ReceivableBill,
                name: `${systemNamePrefix}receivableBill`,
                meta: {
                    requiresAuth: true,
                    keepAlive: true
                }
            },
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/CodeRuleLogin',
        component: LoginContainer,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    {
        path: '/codeRuleLogin',
        component: LoginContainer,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
]
