/**
 * 发票状态转换过滤器
 * @param {Number} val 发票状态码
 */
exports.invoiceStatusFormat = (val) => {
  if (val) {
    switch (val) {
      case 1:
        return '已保存'
      case 2:
        return '已提交'
      case 3:
        return '已审核'
      case 4:
        return '已驳回'
      case 5:
        return '已收回'
      case 6:
        return '已作废'
      case 7:
        return '已红冲'
      default:
        return '不知道呢'
    }
  }
}

exports.invoiceTypeFormat = val => {
  if (val) {
    switch (val) {
      case 1:
        return '增值税专用发票（篮字）'
      case 2:
        return '增值税专用发票（红字）'
      case 3:
        return '增值税普通发票（篮字）'
      case 4:
        return '增值税普通发票（红字）'
      case 5:
        return '通用普通发票，其他票据'
      case 6:
        return '其他票据'
    }
  }
}

exports.dateFormat = val => {
  if (val) {
    let dateObj = new Date(val)
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
  }
}
// import aFilter from './aFilter.js'
// import bFilter from './bFilter.js'
// export default {
//     aFilter,
//     bFilter

// }
