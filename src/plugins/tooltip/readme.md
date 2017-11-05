## tooltip 使用方法
>做的比较简陋 Orz
1.在入口文件引入 并 使用
```javascript
import tooltip from './plugins/tooltip'
Vue.use(tooltip)
```
2.在组件内使用
```javascript
<tooltip name="costorder">
  <el-button size="mini" @click="toInvoicing">确认开票</el-button>
  <el-button size="mini">删除</el-button>
  <el-button size="mini">提交</el-button>
  <el-button size="mini">审核</el-button>
</tooltip>
```
>注：  
name为唯一值 不可重复；不写name的时候默认为 tooltip；  
el-button中的事件写在 父组件 中；  

3.调用
```javascript
this.$tooltip({
  top: event.clientY,
  left: event.clientX
}, 'costorder')
```
>通过 .$tooltip(position，name[, cb]) 调用，  
position：传入当前鼠标坐标  
name：需要操作 tooltip 的 name  
如果需要其他操作 可传入回调函数

