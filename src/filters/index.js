import Vue from 'vue'
/***引入主系统操作***/
import mainFilter from './mainFilter.js'
/***引入各业务系统操作***/
import B2B from '@B2B/filters/index.js'
import Billing from '@Billing/filters/index.js'
import Permission from '@Permission/filters/index.js'

let filters={
    mainFilter,
    ...B2B,
    ...Billing,
    ...Permission
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
