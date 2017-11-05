/**
 * 发票状态转换过滤器
 * DELETED(-1, "已删除")
 * SAVED(0, "已保存")
 * SUBMITTED(1, "已提交")
 * APPROVED(2, "已审批")
 * VERIFIED(3, "已核销")
 * TAKEBACKED(4, "已收回")
 * REJECTED(5, "已驳回")
 * INVALID(6, "已作废")
 * REDRUSHED(7, "已红冲")
 * CLOSED(8, "已关闭");
 * @param {Number} val 发票状态码
 */
exports.statusFormat = (val) => {
    if (val) {
        switch (val) {
            case -1:
                return '已删除'
            case 0:
                return '已保存'
            case 1:
                return '已提交'
            case 2:
                return '已审批'
            case 3:
                return '已核销'
            case 4:
                return '已收回'
            case 5:
                return '已驳回'
            case 6:
                return '已作废'
            case 7:
                return '已红冲'
            case 8:
                return '已关闭'
            default:
                return '不知道呢'
        }
    }
}
/**
 * 发票类型格式化
 * @param  {[type]} val 传入的发票类型
 * @return {[type]}     发票类型对应的汉字
 */
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

/**
 * 格式化日期
 * @param  {[type]} val 传入时间戳
 * @return {[type]}     格式化后的日期 yyyy-mm-dd
 */
exports.dateFormat = val => {
    if (val) {
        let dateObj = new Date(parseInt(val))
        return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    }
}
// import aFilter from './aFilter.js'
// import bFilter from './bFilter.js'
// export default {
//     aFilter,
//     bFilter

// }
