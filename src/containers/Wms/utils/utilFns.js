export default {
    /**
     * @method getFieldArrFormObjectArr
     * @description 获取对象数组中对象的某个字段，并返回由该字段数据组成的数组
     * @param arr {Array} 源对象数组 eg.[{id:1,name:'pet'}]
     * @param field {string} 要获取的字段名称 eg.  id
     * eg.   获取对象数组的所有对象的id属性值。
     *    Vue.getFieldArrFormObjectArr(objectArr, 'id')
     *        return [id1,id2,......]
     */
    getFieldArrFormObjectArr(arr, field) {
        if (!field || !(arr instanceof Array) || arr.length == 0) {
            console.error('获取对象数组方法（getFieldArrFormObjectArr）传入参数不对，请重新调整')
        }

        let fieldArr = []

        for (var i of arr) {
            // undefined == null => true
            if (i[field] == undefined) {
                continue
            }

            fieldArr.push(i[field])
        }

        return fieldArr
    },
    /**
     * @method stealDataFormOrigin
     * @description 保存接口参数格式化，剔除无用字段。
     *  该方法为定制方法。使用场景是有两个对象，target对象内所有字段originObj对象里全部都有。
     *    而我们想要的数据都在originObj里，该方法就是按照target的字段要求，把originObj内字段数据都放到target对象上。
     *  目前使用场景，提交数据时，存储的数据比接口需求的数据字段多很多，但是结构和需要的字段一致。
     * @param {Object} target  参照对象，需要哪些数据做一个对象模板喽，然后按照模板去偷数据
     * @param {Object} originObj  数据对象，跟target对象数据结构完全一致，但是比target多一些数据字段，其中一些字段是有用的。
     */
    stealDataFormOrigin(target, originObj) {
        return (function stealData(target, originObj) {
            for (var i in target) {

                if (Object.prototype.toString.call(target[i]) == "[object Object]") {
                    target[i] = stealData(target[i], originObj[i])
                    continue
                }

                if (Object.prototype.toString.call(target[i]) == "[object Array]") {
                    if (originObj[i] == undefined) {
                        throw new Error(`源对象不包括属性[${i}]`)
                    }
                    originObj[i].forEach((item, index) => {  // 当目标数据中数组内有多条数据时，需要按照源数据条数复制添加，因为模板数据可能就只有一条
                        if (!target[i][index]) {
                            target[i].push(Object.assign({}, target[i][0]))
                        }
                        if (Object.prototype.toString.call(item) == "[object Object]") {
                            target[i][index] = stealData(target[i][index], item)
                        } else {
                            target[i][index] = item
                        }
                    })
                    continue
                }
                target[i] = originObj[i]
            }

            return target
        })(target, originObj)
    },

    /**
     * @method setFocusTo
     * @description 指定获取焦点
     *
     * @param {Object} el 要操作的对象
     * @param {string} tagName 标签名，默认为input
     * @param {Function} callback 回调方法
     * */
    setFocusTo(el, tagName = 'input', callback = () => {
    }) {
        let element = el.$el.tagName.toLowerCase() == tagName ? el : el.$el.querySelector(tagName)
        if (!!element) {
            setTimeout(() => {
                element.focus()
                !!callback && callback(element)
            }, 100)
        }
    },

    /**
     * @method setFocusAndSelectAll
     * @description 指定获取焦点并全选文本
     *
     * @param {Object} el 要操作的对象
     * @param {string} tagName 标签名，默认为input
     * @param {Function} callback 回调方法
     * */
    setFocusAndSelectAll(el, tagName = 'input', callback = () => {
    }) {
        let selectCallback = (element) => {
            element.select()
            !!callback && callback(element)
        }
        this.setFocusTo(el, tagName, selectCallback)
    }
}
