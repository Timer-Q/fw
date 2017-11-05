const systemNamePrefix = "billing_"

import MainContainer from '@/containers/MainContainer.vue'
import WelcomeContainer from '@Billing/WelcomeContainer.vue'
import LoginContainer from '@Billing/LoginContainer.vue'
// 销售发票
const SaleInvoiceHome = r => require.ensure([], () => r(require('@Billing/containers/accounting/saleInvoice/SaleInvoice.vue')), 'SaleInvoiceHome')
const SaleInvoice = r => require.ensure([], () => r(require('@Billing/containers/accounting/saleInvoice/invoiceList/InvoiceList.vue')), 'SaleInvoice')
// 采购发票
const PurchaseInvoiceHome = r => require.ensure([], () => r(require('@Billing/containers/accounting/purchaseInvoice/PurchaseInvoice.vue')), 'PurchaseInvoiceHome')
const PurchaseInvoice = r => require.ensure([], () => r(require('@Billing/containers/accounting/purchaseInvoice/invoiceList/InvoiceList.vue')), 'PurchaseInvoice')
// 付款单
const PaymentBillHome = r => require.ensure([], () => r(require('@Billing/containers/accounting/paymentBill/PaymentBill.vue')), 'PaymentBillHome')
// const PaymentBill= r => require.ensure([], () => r(require('@Billing/containers/accounting/paymentBill/paymentBillList/PaymentBillList.vue')), 'PaymentBillList')
// 付款单类型
const PaymentBillTypeHome = r => require.ensure([], () => r(require('@Billing/containers/accounting/paymentBillType/PaymentBillType.vue')), 'PaymentBillTypeHome')
// 应付单
const PayableBill = r => require.ensure([], () => r(require('@Billing/containers/accounting/payableBill/PayableBill.vue')), 'PayableBillHome')
// 应付单
const PayableBillType = r => require.ensure([], () => r(require('@Billing/containers/accounting/payableBillType/PayableBillType.vue')), 'PayableBillType')
// 应付冲应收
const POR = r => require.ensure([], () => r(require('@Billing/containers/accounting/POR/POR.vue')), 'POR')
// 蓝字应付冲红字应付
const BPORP = r => require.ensure([], () => r(require('@Billing/containers/accounting/BPORP/BPORP.vue')), 'BPORP')
// 未确认应付单
const UnconfirmedPayableBill = r => require.ensure([], () => r(require('@Billing/containers/accounting/unconfirmedPayableBill/UnconfirmedPayableBill.vue')), 'UnconfirmedPayableBill')
// 收款单
const ReceiveBill = r => require.ensure([], () => r(require('@Billing/containers/accounting/receiveBill/ReceiveBill.vue')), 'ReceiveBill')
// 收款单类型
const ReceiveBillType = r => require.ensure([], () => r(require('@Billing/containers/accounting/receiveBillType/ReceiveBillType.vue')), 'ReceiveBillType')
// 应收单
const ReceivableBill = r => require.ensure([], () => r(require('@Billing/containers/accounting/receivableBill/ReceivableBill.vue')), 'ReceivableBill')
// 应收核销
const ReceivableWriteOff = r => require.ensure([], () => r(require('@Billing/containers/accounting/receivableWriteOff/ReceivableWriteOff.vue')), 'ReceivableWriteOff')
// 应付核销
const PayableWriteOff = r => require.ensure([], () => r(require('@Billing/containers/accounting/payableWriteOff/PayableWriteOff.vue')), 'PayableWriteOff')

export default [ {
    path: '/billing',
    component: MainContainer,
    children: [ {
        path: '',
        component: WelcomeContainer
    },
    /**
     * 销售发票
     */
    {
        path: 'saleInvoice',
        // name: `${systemNamePrefix}SaleInvoice`,
        component: SaleInvoiceHome,
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
        children: [ {
            path: '',
            name: `${systemNamePrefix}saleInvoice`,
            component: SaleInvoice,
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        }]
    },
    /**
     * 采购发票
     */
    {
        path: 'purchaseInvoice',
        // name: `${systemNamePrefix}purchaseInvoice`,
        component: PurchaseInvoiceHome,
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
        children: [ {
            path: '',
            name: `${systemNamePrefix}purchaseInvoice`,
            component: PurchaseInvoice,
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        }]
    },
    /**
     * 付款单
     */
    {
        path: 'paymentBill',
        name: `${systemNamePrefix}paymentBill`,
        component: PaymentBillHome,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 付款单类型
     */
    {
        path: 'paymentBillType',
        component: PaymentBillTypeHome,
        name: `${systemNamePrefix}paymentBillType`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 应付单
     */
    {
        path: 'payableBill',
        component: PayableBill,
        name: `${systemNamePrefix}payableBill`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 应付单类型
     */
    {
        path: 'payableBillType',
        component: PayableBillType,
        name: `${systemNamePrefix}payableBillType`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 应付冲应收
     */
    {
        path: 'por',
        component: POR,
        name: `${systemNamePrefix}por`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 蓝字应付冲红字应付
     */
    {
        path: 'bporp',
        component: BPORP,
        name: `${systemNamePrefix}bporp`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 未确认应付单管理
     */
    {
        path: 'unconfirmedPayableBill',
        component: UnconfirmedPayableBill,
        name: `${systemNamePrefix}unconfirmedPayableBill`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 收款单
     */
    {
        path: 'receiveBill',
        component: ReceiveBill,
        name: `${systemNamePrefix}receiveBill`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 收款单类型
     */
    {
        path: 'receiveBillType',
        component: ReceiveBillType,
        name: `${systemNamePrefix}receiveBillType`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 应收单
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
    /**
     * 应收核销
     */
    {
        path: 'receivableWriteOff',
        component: ReceivableWriteOff,
        name: `${systemNamePrefix}receivableWriteOff`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    },
    /**
     * 应付核销
     */
    {
        path: 'payableWriteOff',
        component: PayableWriteOff,
        name: `${systemNamePrefix}payableWriteOff`,
        meta: {
            requiresAuth: true,
            keepAlive: true
        }
    }
    ],
    meta: {
        requiresAuth: true
    }
},
{
    path: '/billingLogin',
    component: LoginContainer,
    meta: {
        requiresAuth: true,
        keepAlive: true
    }
},
{ path: '/billingLogin', component: LoginContainer, meta: { requiresAuth: true, keepAlive: true } },
]
