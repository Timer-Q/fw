## 代码合并进度&&问题

### 进度
1. router入口已经成功，具体界面没有配置
> 具体细节界面不知道是配置路由还是写成组件加载到主界面

2. service文件只写了一个例子尝试了一下，按这么写法应该会成功。

3. vuex 付款单的弄好了部分

4. 如果配置了路由不成功，不要着急，重启一下服务就好了

5.
``` javascript
// name: tab名字 tag: tab唯一标识（判断tab是否重复） tabtype：新建tab的类型，区分tab初始化行为 content: 需要渲染的组件
this.addTab(name, tag, tabType, content)
```

### 细节点
**2017年10月11日**
>1. 付款单接口联调完，基本功能完成
>2. 付款单类型接口联调完，基本功能完成  

**2017年10月12日**
> 1. 应付单界面开始
> 2. 查询框中的数据已改为从父组件传入

**2017年10月16日**
> 1. 完善应付冲应收代码

**2017年10月17日**
> 1. 完善应付冲应收代码
>2. 增加蓝字应付冲红字应付界面（直接copy应付冲应收代码 细节未修改）
>3. 增加未确定应付单管理界面（直接copy 未作细节修改）
>4. 收款单界面

**2017年10月18日**
> TODO:  1. 应收单-新增 点击确认后 在新界面接收store中的数据

**2017年10月26日**
> 1.联调遇到问题
.应付单-修改-单据日期修改不成功
> 2.table里面表单校验 没思路 滞后

**2017年10月27日**
> 1. 应付单-列表 tab激活的时候 请求数据（未实现）

**2017年10月28日**
> 1. payable bill select 拨错
### 重要问题
1. *付款单* 列表页处理数据上传id格式，现在付款单传递id格式改变了，变成了 xxxlist: [{id: '123', 'id': '456'}, **不知道其他界面要不要改**

2. 切换tab的时候重新拉取数据功能，由于使用elementui tabs组件原因，activated生命周期钩子无法触发，现在改成了将tab属性和当前激活tab的属性通过prop传入子组件，子组件判断两者是否匹配(激活组件是否为当前组件)，然后再组件激活的时候拉去数据等  
*
目前只有应付单做了这个改变，改的时候需要动几个文件：  
mixin(公共文件，已改，以后不需要改)；  
每个模块的入口文件（v-for tab 的时候需要将两个tab属性通过props传入）；  
tab的子组件（首先接收props，然后通过watch激活的tab属性，判断是否和tab原属性匹配）
*
> 注：子组件部分可以考虑写成mixin
``` html
<component :is="item.content" :tabType="tabType" :tabState="tabState" :tabAttr="item"></component>
```
``` javascript
// mixin
// tab-click会传入当前tab，将tab属性放到tabState中传入子组件，然后判断是否与taAttr(tab原属性)匹配
handleTabClick(tab, event) {
    let tabState = {
        active: tab.active,
        closable: tab.closable,
        disabled: tab.disabled,
        index: tab.index,
        isClosable: tab.isClosable,
        label: tab.label,
        name: tab.name
    }
    this.tabState = Object.assign({}, tabState)
}
// children components
props: {
    tabState: {
        type: Object,
        default: {}
    },
    tabAttr: {
        type: Object,
        default: {}
    }
}
watch: {
    tabState: function() {
        if (this.tabState.name === this.tabAttr.tag) {
            this.searchPayableBillList()
            console.log(Object.assign({}, this.tabState), this.tabAttr, `llllwatch watch-${new Date().getTime()}`)
        }
    }
}
3. searchDialog 由于不同界面搜索条件不同，顾将条件改成slot形式，现在只有应付单修正
4. 内容区域删除tab页签已完成 详见应付冲应收-选单 （chooseBill.vue）取消按钮功能
```

### 核算目录
<pre>
├─BPORP                             # 蓝字应付冲红字应付
│  ├─chooseBill
│  ├─newBillList
│  ├─PORDetail
│  └─PORList
├─payableBill                       # 应付单
│  ├─newBillList
│  ├─payableBillDetail
│  └─payableBillList
├─payableWriteOff                   # 应付核销
│  ├─chooseBill
│  ├─newBillList
│  ├─payableWriteOffDetail
│  └─payableWriteOffList
├─paymentBill                       # 付款单
│  ├─payableBill
│  ├─paymentBillDetail
│  └─paymentBillList
├─paymentBillType                   # 付款单类型
│  └─paymentBillTypeList
├─POR                               # 应付冲应收
│  ├─chooseBill
│  ├─newBillList
│  ├─PORDetail
│  └─PORList
├─purchaseInvoice                   # 采购发票
│  ├─costOrder
│  ├─invoiceList
│  └─invoicing
├─receivableBill                    # 应收单
│  ├─newBillList
│  ├─receivableBillDetail
│  └─receivableBillList
├─receivableWriteOff                # 应收核销
│  ├─chooseBill
│  │  └─chooseBill
│  ├─newBillList
│  ├─receivableWriteOffDetail
│  └─receivableWriteOffList
├─receiveBill                       # 收款单
│  ├─chooseBill
│  ├─newBillList
│  ├─receiveBillDetail
│  └─receiveBillList
├─receiveBillType                   # 收款单类型
│  └─receiveBillTypeList
├─saleInvoice                       # 销售发票
│  ├─costOrder
│  ├─invoiceList
│  └─invoicing
└─unconfirmedPayableBill             # 未确定类型应付单
    ├─chooseBill
    ├─newBillList
    ├─PORDetail
    └─PORList
</pre>
