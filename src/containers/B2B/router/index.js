const systemNamePrefix = "b2b_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@B2B/WelcomeContainer.vue'
import LoginContainer from '@B2B/LoginContainer.vue'

const Brand = r => require.ensure([], () => r(require('@B2B/containers/brand/BrandContainer.vue')), 'brand')
const Commodity = r => require.ensure([], () => r(require('@B2B/containers/commodity/CommodityContainer.vue')), 'commodity')
const CommodityExamine = r => require.ensure([], () => r(require('@B2B/containers/commodity/CommodityExamineContainer.vue')), 'commodityExamine')
const Dealer = r => require.ensure([], () => r(require('@B2B/containers/dealer/DealerContainer.vue')), 'dealer')
const RegisterUser = r => require.ensure([], () => r(require('@B2B/containers/registerUser/RegisterUserContainer.vue')), 'registerUser')
const Merchants = r => require.ensure([], () => r(require('@B2B/containers/merchants/MerchantsContainer.vue')), 'merchants')
const Order = r => require.ensure([], () => r(require('@B2B/containers/order/OrderContainer.vue')), 'order')
const GoodsRelease = r => require.ensure([], () => r(require('@B2B/containers/goodsRelease/GoodsReleaseContainer.vue')), 'goodsRelease')


const ChannelMagContainer = r => require.ensure([], () => r(require('@B2B/containers/channelManagement/ChannelMagContainer.vue')), 'channelManagement')
const BlackListContainer = r => require.ensure([], () => r(require('@B2B/containers/blackList/blackListContainer.vue')), 'blackList')
const brandSellContainer = r => require.ensure([], () => r(require('@B2B/containers/brandSell/brandSellContainer.vue')), 'brandSell')

// const SiteAdmin = r => require.ensure([], () => r(require('@B2B/containers/siteAdmin/SiteAdminContainer.vue')), 'siteAdmin')
// const Mail = r => require.ensure([], () => r(require('@B2B/containers/mail/MailContainer.vue')), 'mail')
// const Advertisement = r => require.ensure([], () => r(require('@B2B/containers/advertisement/AdvertisementContainer.vue')), 'advertisement')
// const Channel = r => require.ensure([], () => r(require('@B2B/containers/channel/ChannelContainer.vue')), 'channel')
// const ConsultAndHelp = r => require.ensure([], () => r(require('@B2B/containers/consultAndHelp/ConsultAndHelpContainer.vue')), 'consultAndHelp')
// const Notice = r => require.ensure([], () => r(require('@B2B/containers/notice/NoticeContainer.vue')), 'notice')
export default [
    {
        path: '/b2b',
        component: MainContainer,
        children: [
            {path: '', component: WelcomeContainer},
            {
                path: 'commodity',
                name: `${systemNamePrefix}commodity`,
                component: Commodity,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'commodityExamine',
                name: `${systemNamePrefix}commodityExamine`,
                component: CommodityExamine,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'dealer',
                name: `${systemNamePrefix}dealer`,
                component: Dealer,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'brand',
                name: `${systemNamePrefix}brand`,
                component: Brand,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'registerUser',
                name: `${systemNamePrefix}registerUser`,
                component: RegisterUser,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'merchants',
                name: `${systemNamePrefix}merchants`,
                component: Merchants,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'order',
                name: `${systemNamePrefix}order`,
                component: Order,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'goodsRelease',
                name: `${systemNamePrefix}goodsRelease`,
                component: GoodsRelease,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'channelManagement',
                name: `${systemNamePrefix}channelManagement`,
                component: ChannelMagContainer,
                meta: {requiresAuth: true, keepAlive: true}
            },
            // {
            //     path: 'siteAdmin',
            //     name: `${systemNamePrefix}siteAdmin`,
            //     component: SiteAdmin,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
            // {
            //     path: 'mail',
            //     name: `${systemNamePrefix}mail`,
            //     component: Mail,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
            // {
            //     path: 'advertisement',
            //     name: `${systemNamePrefix}advertisement`,
            //     component: Advertisement,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
            // {
            //     path: 'channel',
            //     name: `${systemNamePrefix}channel`,
            //     component: Channel,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
            // {
            //     path: 'consultAndHelp',
            //     name: `${systemNamePrefix}consultAndHelp`,
            //     component: ConsultAndHelp,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
            // {
            //     path: 'notice',
            //     name: `${systemNamePrefix}notice`,
            //     component: Notice,
            //     meta: {requiresAuth: true, keepAlive: true}
            // },
 			   {
                path: 'blackList',
                name: `${systemNamePrefix}blackList`,
                component: BlackListContainer,
                meta: {requiresAuth: true, keepAlive: true}
            },
            {
                path: 'brandSell',
                name: `${systemNamePrefix}brandSell`,
                component: brandSellContainer,
                meta: {requiresAuth: true, keepAlive: true}
            },
        ],
        meta: {requiresAuth: true}
    },
    {path: '/b2bLogin', component: LoginContainer, meta: {requiresAuth: true, keepAlive: true}},
]
