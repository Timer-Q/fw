# tree table



##demo：请到右侧下载tab中下载完整demo(因开发时间无比紧张不可能像element-ui一样成熟，所以不提供element-ui那样的在线demo代码)


- ##属性含义描述（模板中属性要以中划线隔开你们懂的）

    | name          | description              | 
    | ------------- |:------------------------|:---------------:|
    | prop          | 树中显示的文字  | 
    | checked-key          | 表示当前节点是否被选中  | 
    | enable-checked-folder          | 是否允许勾选文件夹  | 
        | width          | tree列的宽度  |  
    | label         | 表头显示文字(如果tree和table结合着用可配置此项)  |     
    | tree-key       | 树节点唯一标识|  
    | child-key      | 嵌套结构中标识子节点的key  |  
    | checked-all-childs-when-parent-checked     | 勾选某一个节点是否同步父节点，子节点勾选状态 
    | auto-expand-checked-nodes      | 加载时是否自动展开选中节点  |
    | enable-check     | 是否允许使用checkbox或者radio控制节点选中与否  |
|enable-checked-multiple|是否允许选中多条，false则展示单选框，true多选框|
    
    
- ##属性默认值和类型
    ```javascript
    {
            enableCheckedFolder:{
              type:Boolean,
              default:true
            },
            updateVirtualTreeMethod:{
              type:Function,
              default:function(){

              }
            },
            isVirtualTree:{
                type:Boolean,
                default:false
            },

            autoExpandCheckedNodes:{
              type:Boolean,
              default:true
            },
            enableCheckedMultiple:{
                type:Boolean,
                default:true
            },
            enableCheck:{
              type:Boolean,
              default:false
            },

            checkedAllChildsWhenParentChecked:{
              type:Boolean,
              default:true
            },
            checkedKey:{
              type:String,
              default:'checked'
            },
            prop:{
                type:String
            },
            label:{
                type:String,
                default:'label'
            },
            width:{
                type:String,
                default:'200'
            },
            treeKey:{
                type:String,
                default:'id'
            },

            childKey:{
                type:String,
                default:'children'
            },
            fileIcon:{
                type:String,
                default:'el-icon-file'
            },
            folderIcon:{
                type:String,
                default:'el-icon-folder'
            },
            // remote:{
            //     type:Function,
            //     default:null
            // }
        }
    ```
    
    

- ##事件(就一个事件可能不够用，以后发现不够用了再加)

    | name          | description              | 参数          |
    | ------------- |:------------------------|:---------------:|
    | labelClick          | 点击标签时触发（仅标签）  |      type:`String`, <br>value:`表格中scope.row`           |
    
- ##有用的方法（因时间有限无法对每个方法做严格测试且你们不一定用得到；如果发现有bug可随时告知，我会第一时间解决）

    | name          | description              | values          |
    | ------------- |:------------------------|:---------------:|
    | getCheckedNodes          | 获取所有选中的节点  |    每个节点内拥有$extra对象         |
    | expandAllNodes          | 展开所有节点  |    no        |
    | getAllNodes          | 获取所有节点(包括未选中)  |            |
    |updateRows|更新行数据|参数1：数组：所有需要更新行数据；参数2：数组，每条待更新数据要更新的属性|
    |getParentNode|根据子节点获取父节点|参数：子节点数据|
    |updateTreeTable|如果你的源数据发生了变化,调用这个玩意儿可更新你的tree（未来可能做成自动检测变化并自动更新;目前因实现难度和工期紧张暂不考虑）;比如tree table只专注于数据的展示，如果你开发一个网络实时投票系统，当socket监听到某个投票选项删除事件，那么你可以更新源数据之后手动调用该方法;直接改表格中数据请调用updateRows方法|no|
    |getFirstSiblingNode|根据当前节点索引获取它的第一个兄弟节点|当前节点索引|
    |getChildsByParentId|根据节点id获取下属所有亲儿子（注意不包括孙子）|pid|
    |getNodesByTreeKeys|获取唯一id在参数中指定的节点|参数1：数组：id集合|
    |toggleExpandChildsByIndex|根据行索引展开/合拢当前节点|参数1：当前行索引|
        |filterRows|传入一个function(参数为row)返回true则该row会出现在table中|参数1：function类型|
    
    
    
- ##$extra对象属性列表

    | name          | description              | 类型（n=Number,b=Boolean,s=String）          |
    | ------------- |:------------------------|:---------------:|
    | childsNum          | 有几个孩子  |   n   |
        | parentId          | 它爸的id(treeKey)  |      |
            | hasChildren          | 有木有小孩儿  |  b    |
                | expanded          | 是否展开  |    b  |
                    | deepth          | 节点深度  |  n(1是顶级节点，越是孩子n越大)    |
                    | indeterminate          | 如果一个爹下面所有亲儿子既不是都选中也不是一个都没选中那么就是true;否则是false  |  b    |
