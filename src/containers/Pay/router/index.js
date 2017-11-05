const systemNamePrefix = "pay_"

import MainContainer from '@/containers/MainContainer'
import WelcomeContainer from '@Pay/WelcomeContainer'
import LoginContainer from '@Pay/LoginContainer'
const businessPlatform = r => require.ensure([], () => r(require('@Pay/containers/base/businessPlatform/BusinessPlatform')), 'businessPlatform')
const payChannel = r => require.ensure([], () => r(require('@Pay/containers/base/payChannel/PayChannel')), 'payChannel')
const companyUserManage = r => require.ensure([], () => r(require('@Pay/containers/company/CompanyUserManage')), 'companyUserManage')
const billProcessing = r => require.ensure([], () => r(require('@Pay/containers/billProcessing/BillProcessing')), 'billProcessing')
//个人收银台
const checkoutCounter = r => require.ensure([], () => r(require('@Pay/containers/checkoutCounter/CheckoutCounter')), 'checkoutCounter')
const checkoutCounterPayResult = r => require.ensure([], () => r(require('@Pay/containers/checkoutCounter/PayResult')), 'checkoutCounterPayResult')
const checkoutCounterFastPay = r => require.ensure([], () => r(require('@Pay/containers/checkoutCounter/FastPay')), 'checkoutCounterFastPay')
const checkoutCounterNormal = r => require.ensure([], () => r(require('@Pay/containers/checkoutCounter/Normal')), 'checkoutCounterNormal')
const checkoutCounterWxPay = r => require.ensure([], () => r(require('@Pay/containers/checkoutCounter/WxPay')), 'checkoutCounterWxPay')
//企业收银台
const companyCheckoutCounter = r => require.ensure([], () => r(require('@Pay/containers/companyCheckoutCounter/CompanyCheckoutCounter')), 'companyCheckoutCounter')
const companyCheckoutCounterPayMethods = r => require.ensure([], () => r(require('@Pay/containers/companyCheckoutCounter/PayMethods')), 'companyCheckoutCounterPayMethods')
const companyCheckoutCounterPayResult = r => require.ensure([], () => r(require('@Pay/containers/companyCheckoutCounter/PayResult')), 'companyCheckoutCounterPayResult')

export default [
    {
        path: '/pay',
        component: MainContainer,
        children: [{
                path: '',
                component: WelcomeContainer
            },
            //企业信息管理
            {
                path: 'businessPlatform',
                name: `${systemNamePrefix}businessPlatform`,
                component: businessPlatform,
                meta: { requiresAuth: true, keepAlive: true }
            },
            //支付渠道管理
            {
                path: 'payChannel',
                name: `${systemNamePrefix}payChannel`,
                component: payChannel,
                meta: { requiresAuth: true, keepAlive: true }
            },
            //企业用户管理
            {
                path: 'companyUserManage',
                name: `${systemNamePrefix}companyUserManage`,
                component: companyUserManage,
                meta: { requiresAuth: true, keepAlive: true }
            },
            //差错帐管理
            {
                path: 'billProcessing',
                name: `${systemNamePrefix}billProcessing`,
                component: billProcessing,
                meta: { requiresAuth: true, keepAlive: true }
            },
            //个人收银台
            {
                path: 'checkoutCounter',
                name: `${systemNamePrefix}checkoutCounter`,
                component: checkoutCounter,
                meta: { requiresAuth: true, keepAlive: true },
                children: [{
                    path: 'normal',
                    name: `${systemNamePrefix}checkoutCounter_normal`,
                    component: checkoutCounterNormal,
                    meta: { requiresAuth: true }
                }, {
                    path: 'payResult',
                    name: `${systemNamePrefix}checkoutCounter_payResult`,
                    component: checkoutCounterPayResult,
                    meta: { requiresAuth: true }
                }, {
                    path: 'fastPay',
                    name: `${systemNamePrefix}checkoutCounter_fastPay`,
                    component: checkoutCounterFastPay,
                    meta: { requiresAuth: true }
                }, {
                    path: 'wxPay',
                    name: `${systemNamePrefix}checkoutCounter_wxPay`,
                    component: checkoutCounterWxPay,
                    meta: { requiresAuth: true }
                }]
            },
            //企业收银台
            {
                path: 'companyCheckoutCounter',
                name: `${systemNamePrefix}companyCheckoutCounter`,
                component: companyCheckoutCounter,
                meta: { requiresAuth: true, keepAlive: true },
                children: [{
                    path: 'index',
                    name: `${systemNamePrefix}companyCheckoutCounter_payMethods`,
                    component: companyCheckoutCounterPayMethods,
                    meta: { requiresAuth: true }
                },{
                    path: 'payResult',
                    name: `${systemNamePrefix}companyCheckoutCounter_payResult`,
                    component: companyCheckoutCounterPayResult,
                    meta: { requiresAuth: true }
                }]
            }
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/paylogin',
        component: LoginContainer,
        meta: { requiresAuth: true, keepAlive: true }
    },
]
