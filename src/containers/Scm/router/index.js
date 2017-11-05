const systemNamePrefix = "scm_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@Permission/WelcomeContainer.vue'
import LoginContainer from '@Permission/LoginContainer.vue'
// 用户管理

export default [
    {
        path: '/scm',
        component: MainContainer,
        children: [
            {path: '', component: WelcomeContainer}
        ]
    },
    {path: '/scmLogin', component: LoginContainer, meta: {requiresAuth: true, keepAlive: true}},
]
