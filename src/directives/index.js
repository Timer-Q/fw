import Vue from 'vue'
/***引入主系统操作***/
import authDirective from './authDirective.js'

/***引入各业务系统操作***/
import B2B from '@B2B/directives/index.js'
import Billing from '@Billing/directives/index.js'
import Permission from '@Permission/directives/index.js'
import Pay from '@Pay/directives/index.js'

let directives={
    authDirective,
    ...B2B,
    ...Billing,
    ...Permission,
    ...Pay
}

Object.keys(directives).forEach(key => {
    Vue.directive(directives[key].name, directives[key].func)
})
