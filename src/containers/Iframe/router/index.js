const systemNamePrefix = "iframe_"
import MainContainer from '@/containers/MainContainer.vue'
import IframeComponent from '@Iframe/containers/IframeComponent.vue'

export default [
    {
        path: '/iframe',
        component: MainContainer,
        children: [
            {path: ':tag', component: IframeComponent, meta: {requiresAuth: true, keepAlive: true}},
        ],
        meta: {requiresAuth: true}
    }
]
