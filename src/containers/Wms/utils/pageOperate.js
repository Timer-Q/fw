import moment from 'moment'

/**
 * @description 列表页面常用的方法，减少每个页面的代码量，所以单提出来，这个东东只有wms自己用来玩的。
 */
export default {
    // 刷新
    /*refresh() {
        location.reload()
    },*/
    /**
     * @method getList
     * @param {Object} 参数对象
     * @param.uri {String} 获取列表的接口地址  必填
     * @param.xxxxx {String || number} 其它非必填参数，嗯，是的，是非必填。基本都是分页什么的这些，具体字段看各个接口吧。
     * eg:{
     * 	context:_this,
     *  uri:getListUrl,
     * 	...:...//其他参数
     * }
     */
    getList(param) {
        let _this = this
        let _param = param || {}
        let org = Object.assign({}, _this.listQueryParam, _param)

        let getListUrl = _this.api.getList
        if (typeof getListUrl !== 'string') {
            getListUrl = _this.api.getlist
        }

        _this.$request({
            url: getListUrl, // 获取列表接口
            sendData: org, // 参数
            context: _this,
            successCallback: function (context, response) {
                console.log('response:::',response)
                // 结果赋值给实际的明细表格绑定的数据项。
                if (!response) {
                    _this.alert("noData")
                    return
                }
                console.log(response, 'getList response')
                context.tableData = response.dtoList || response

                if (typeof response.count == 'number') {
                    _this.pagination.total = response.count
                }
                // 没有数据不往下执行
                if (context.tableData.length == 0) {
                    return
                }
                // 需 默认选中第一行，并请求相应的详情。要等到表格渲染完毕之后再执行选择和激活样式添加。
                //延迟20毫秒是为了等渲染完再操作dom元素，没想到啥别的方法，有的话可以改。。。。对，谁都可以改，只要有好的想法，但是记得加备注
                _this.$nextTick(() => {
                    //默认选择第一行 带复选框选中状态，如果需求是默认要选择第一条那就放开下面这条注释
                    //_this.$refs.mainTable.toggleRowSelection(_this.tableData[0])
                    console.log("::::", document.getElementById('pastCodeTable'))
                    console.log("pastCodeTable::", _this.$refs.pastCodeTable)
                    let $trs = _this.$refs.pastCodeTable.$el.getElementsByTagName('tr')

                    let $tr = $trs[1] // 第一行数据，表头也是使用的tr标签。
                    $tr.className = 'current-row ' + $tr.className
                    //默认获取第一行数据对应的子表单单号
                    _this.selectionDetailLabelNo = _this.$refs.pastCodeTable.data[0].notifyNo
                    if (_this.api.getlabelDetailList !== undefined && _this.api.getlabelDetailList !== null) {
                        _this.curRow = _this.$refs.pastCodeTable.data[0]
                        // 默认获取第一行数据的详情列表
                        _this.getDetailList(_this.$refs.pastCodeTable.data[0].id, _this.api.getlabelDetailList)

                    }
                })
            }
        })
    },
    // 刷新
    refresh() {
        this.getList()
    },

    // 行点击事件 ,主要功能展示贴单详情列表，这个点击完就获取下边详情列表了，如果是其他操作的话。。。重新在页面定义一个方法就可以了。
    // 需要在主表table上绑定 @row-click事件
    rowClick(row, event, column) {
        let _this = this
        console.log("row %o, event %o, column %o", row, event, column)
        _this.curRow = row
        //获取子表单任务单号
        //_this.selectionDetailLabelNo = row.notifyNo
        //获取明细列表
        _this.getDetailList(row.id, _this.api.getlabelDetailList)
    },
    /**
     * @method 获取明细列表，
     * @param {number} id 主表项数据的id，
     * @param {string} uri 获取明细的接口地址，
     * @param {vue}  就是vue实例
     */
    getDetailList(id, uri) {
        let _this = this
        _this.$request({
            url: uri, //子表单的api地址
            context: _this, //this
            sendData: {
                id: id,
                ownerId: '111111111'
            }, //主表单的id
            successCallback: (_this, response) => {
                // 结果赋值给实际的明细表格绑定的数据项。
                if (Object.prototype.toString.call(response) == "[object Array]") {
                    _this.selectionDetailList = response
                } else {
                    _this.selectionDetailList = response.detailList
                }
            }
        })
    },
    // 选择数据项后的处理,批量处理操作，复选框选择后获得的数据。
    handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(222222)
    },
    /**
     * @method 单独纯提示弹窗
     * @param {Object || String} org 当为对象类型时是使用者配置的提示信息，为string时显示默认配置的信息
     * eg：alert('empty') 默认提示
     * eg:alert({title:'title',tip:'tip'})
     */
    alert(org) {
        if (!org) {
            alert('alert提示，加参数，加参数')
            return
        }
        let config = {
            empty: {
                title: '操作提示',
                tip: '当前没有选择数据项，请选择数据后再进行操作'
            },
            onlyOne: {
                title: '操作提示',
                tip: '当前操作只能选择一条数据！'
            },
            noData: {
                title: '数据提示',
                tip: '当前列表接口获取数据失败！'
            },
            fail: {
                title: '操作失败提示',
                tip: '当前操作失败，请稍后再试！'
            },
            success: {
                title: '操作成功提示',
                tip: '操作成功！'
            }
        }
        let title = ''
        let tip = ''

        if (typeof org == 'string') {
            title = config[org].title
            tip = config[org].tip
        }
        if (Object.prototype.toString.call(org) == "[object Object]") {
            title = org.title
            tip = org.tip
        }

        this.$alert(tip, title, {
            confirmButtonText: '确定',
            callback: action => {
                if (action == 'confirm') {
                    !!org.callback && org.callback()
                }
            }
        })
    },

    dateFormat: function (row, column) {
        var date = row[column.property]
        if (date == undefined) {
            return ""
        }
        return moment(date).format("YYYY-MM-DD")
    },

    datetimeFormat: function (row, column) {
        var date = row[column.property]
        if (date == undefined) {
            return ""
        }
        return moment(date).format("YYYY-MM-DD hh:mm:ss")
    }
}
