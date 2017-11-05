
<template>
    <tree-tpl :vm="_self"></tree-tpl>


</template>
<script>

    import u from './util'
    import treeTpl from './treeCommonTemplate'
    // import Vue from 'vue'


    const indexOf = (val, arr) => {
        let has = -1
        for (let i = 0 ;i < arr.length; i++) {
            if (arr[i] == val) {
                has = i
                break
            }
        }
        return has
    }


    const getDescendantChilds = (id, data, treeKey,GET_TYPE='ID',conFun) => {
        conFun=conFun||function(){
            return true
        }
        // const getDescendantChilds = (id, data, parentKey, treeKey) => {
        let result = [],
            compare = [id],
            length = -1
        while (length != compare.length) {
            length = compare.length
            data.forEach(function(item,index) {
                if (indexOf(item.$extra.parentId, compare) > -1 && indexOf(item[treeKey], compare) == -1) {
                    if(conFun(item)){
                        if(GET_TYPE=='ID'){
                            result.push(item[treeKey])
                        }else if(GET_TYPE=='INDEX'){
                            result.push(index)
                        }else{
                            result.push(item)
                        }
                        // result.push(GET_TYPE=='ID'?item[treeKey]:item)
                    }

                    compare.push(item[treeKey])
                }
            })
        }
        return result
    }
    const hash = ()=> Math.floor(Math.random()*Math.random()*Math.random()*Math.random()*1000)
    const index = (hash,data) =>{
        let i = 0
        while(data[i] ) {
            if( data[i].$extra && data[i].$extra.hash == hash ){
                break
            }
            i++
        }
        return i
    }

    let util={
        indexOf,
        getDescendantChilds,
        hash,
        index,
        ...u
    }





    export default {
        name:'FwTreeGrid',
        components:{treeTpl},

        props:{
            expandAll:{
                type:Boolean,
                default:false
            },
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
        },
        // computed: {
        //     owner() {
        //         return this.getOwner()
        //     }
        // },
        data(){

            // return {loading:false}

            return {
                allExistTreeKeys:[],
                isInitialDataTransformEnd:false,
                searchConditionFunction:function(){return true},
                influencedRowsInRealTree:[],
                // 初始数全部展开之后的副本
                initialTreeCopier:[],
                radioTreeKeyModel:null,
                dCheckedAllChildsWhenParentChecked:this.getDCheckedAllChildsWhenParentChecked()
            }
        },
        watch:{
            // 'owner.data':function(){
            //   util.clog('master data changed:',arguments)
            // },
            'checkedAllChildsWhenParentChecked':function(){
                this.setDCheckedAllChildsWhenParentChecked()
                // this.dCheckedAllChildsWhenParentChecked=this.enableCheckedMultiple==false?false:this.checkedAllChildsWhenParentChecked
            },
            'enableCheckedMultiple':function(){
                this.updateTreeTable(false)
            },
            'radioTreeKeyModel':function(nv,ov){
                util.clog('nv and ov:',nv,ov)
                let {_data}=this.getOwner().store.states
                if(ov!=null){
                    try{
                        _data.find((item)=>{
                            return item[this.treeKey]==ov
                        })[this.checkedKey]=false
                    }catch(e){}



                }
                _data.find((item)=>{
                    return item[this.treeKey]==nv
                })[this.checkedKey]=true
            }
        },


        mounted(){

            this.updateTreeTable(true)
            this.isInitialDataTransformEnd=true
            this.tryUpdateVirtualTreeMethod()

            // util.poll(()=>{
            //     return this.getOwner().$ready==true
            // },()=>{
            //
            //
            //
            //     setTimeout(()=>{
            //         console.log('owner el:',this.getOwner().$el)
            //         this.getOwner().$el.classList.add('fw-tree-table')
            //     })
            //
            //
            //
            //
            //
            //
            //
            // })


        },

        methods:{
            handleExpandAfterDataRendered(allCheckedIds,allIds,commit=true,checkedChildsIfParentChecked=true){
                let t=Date.now(),res
                if(!this.isVirtualTree){
                    if(this.expandAll){
                        res=this.commitTableStoreData(util.copy(this.initialTreeCopier))



                    }else if(this.autoExpandCheckedNodes){
                        res=this.expandAllCheckedNodes(allCheckedIds,commit,checkedChildsIfParentChecked)
                    }
                }
                util.clog('真实tree首次展开用时：',Date.now()-t)
                return res


            },
            commitTableStoreData(data){
                this.getOwner().store.commit('setData',data)
            },
            getRealData(){
                return this.getOwner().store.states._data
            },
            getAllIdsInVirtualTree(){
                let res=[]
                this.initialTreeCopier.forEach((item)=>{
                    res.push(item[this.treeKey])
                })
                return res
            },
            updateParentExtraAfterInsertRows(parentRow,insertRowsLen){
                let parentRowId=parentRow[this.treeKey],
                    shadowParentRow=this.getSameTreeKeyNodeInVirtualTree(parentRowId).row,
                    updateData={
                        hasChildren:(!parentRow.$extra.hasChildren&&insertRowsLen==0)?false:true,
                        childsNum:parentRow.$extra.childsNum+insertRowsLen
                    }
                parentRow.$extra=util.deepExtend(parentRow.$extra,updateData)

                shadowParentRow.$extra=util.deepExtend(shadowParentRow.$extra,updateData)

                // this.insertSiblingRows(index,rows,false)

                // this.updateRows([row],['hasChildren','childsNum'])


                this.tryUpdateVirtualTreeMethod()
            },
            insertRows(index,rows,isSibling){
                let realData=this.getRealData(),
                    row=realData[index]
                try{
                    row.$extra
                }catch(e){
                    util.warningMsg('不存在第'+index+'条数据!')
                    return false
                }

                let id=row[this.treeKey],
                    shadowRow=this.getSameTreeKeyNodeInVirtualTree(id),
                    firstAddedChildDeepth=row.$extra.deepth+(isSibling?0:1),

                    shadowRowIndex=shadowRow.ind

                let expandedTree=this.updateTreeTable(true,rows,firstAddedChildDeepth)
                if(!expandedTree){
                    return false
                }

                this.initialTreeCopier.splice(shadowRowIndex+1,0,...util.copy(expandedTree))
                realData.splice(index+1,0,...util.copy(expandedTree.filter((item)=>{
                    let bool=item.$extra.deepth==firstAddedChildDeepth
                    if(bool){
                        item.$extra.expanded=false
                    }
                    return bool
                })))

                return expandedTree

            },
            // 注意插入孩子节点始终会插入到孩子的最前面；如果想插入某个孩子的后面请使用insertSiblingRows
            insertChildRows(index,rows){
                this.insertRows.apply(this,Array.from(arguments).concat([false]))
                &&
                this.updateParentExtraAfterInsertRows(this.getRealData()[index],rows.length)

            },

            insertSiblingRows(index,rows){
                let res=this.insertRows.apply(this,Array.from(arguments).concat([true]))
                if(res){
                    let realData=this.getRealData(),
                        row=realData[index]
                    let parentNode=this.getParentNode(realData,row)
                    this.updateParentExtraAfterInsertRows(parentNode,rows.length)
                }

            },
            filterRows(conFun,GET_TYPE='INDEX'){
                this.searchConditionFunction=conFun
                conFun=conFun||function(){ return true}

                let allMatchedNodesIndex=[],i=0,allMathedIds=[],allCheckedIds=[]


                while(i<this.initialTreeCopier.length){

                    let item=this.initialTreeCopier[i]

                    if(conFun(item)){
                        let allParentsIndex=this.getAllParentNodes(item,i,'INDEX')
                        allMatchedNodesIndex=allMatchedNodesIndex.concat(allParentsIndex).concat([i])
                        let descendantChilds=
                                util.getDescendantChilds(item[this.treeKey],this.initialTreeCopier,this.treeKey,'INDEX'),
                            childLen=descendantChilds.length

                        allMatchedNodesIndex=allMatchedNodesIndex.concat(descendantChilds)
                        console.log('descendantChilds---:',descendantChilds)

                        i+=(childLen+1)




                    }else{
                        i++
                    }
                }
                // util.clog('allMatchedNodesIndex before---:',allMatchedNodesIndex)
                // allMatchedNodesIndex=Array.from(new Set(allMatchedNodesIndex))

                // allMatchedNodesIndex.forEach((index)=>{
                //     let item=this.initialTreeCopier[index]
                //     allMathedIds.push(item[this.treeKey])
                //     // if(item[this.checkedKey]){
                //     //     allCheckedIds.push(item[this.treeKey])
                //     // }
                // })
                //
                // let list=this.handleExpandAfterDataRendered(allMathedIds,null,false,false)
                // list=list.filter((item,index)=>{
                //         if(item.$extra.deepth==1&&((list[index+1]&&list[index+1].$extra.deepth==1)||(!list[index+1]))){
                //             return conFun(item)
                //         }else{
                //             return true
                //         }
                //     })
                // this.commitTableStoreData(list)
                // util.clog('fucku list--:',list)





                //
                // util.clog('updateResult--:',updateResult)
                //
                // this.tryUpdateVirtualTreeMethod()

                // const getDescendantChilds = (id, data, treeKey,GET_TYPE='ID',conFun) => {

                this.initialTreeCopier.forEach((item,i)=>{
                    if(conFun(item)){
                        util.clog('match con fun:',i)
                        let allParentsIndex=this.getAllParentNodes(item,i,'INDEX')
                        util.clog('allParentsIndex---:',allParentsIndex)
                        // allMatchedNodesIndex.push(i)
                        allMatchedNodesIndex=allMatchedNodesIndex.concat(allParentsIndex).concat([i])

                    }
                })

                // getAllParentNodes
                //
                // util.clog('allMatchedNodesIndex---:',allMatchedNodesIndex)

                util.clog('allMatchedNodesIndex before---:',allMatchedNodesIndex)
                allMatchedNodesIndex=Array.from(new Set(allMatchedNodesIndex))

                let newData=[]
                allMatchedNodesIndex.forEach((index)=>{
                    newData.push(util.copy(this.initialTreeCopier[index]))
                })
                console.log('fucku new data:',newData)
                this.commitTableStoreData(newData)
                // return newData
            },
            getOwner(){
                if('smarterTree' in this.$refs){
                    return this.$refs.smarterTree
                }

                let parent = this.$parent
                while (parent && !parent.tableId) {
                    parent = parent.$parent
                }
                return parent
            },
            updateInfluencedRowsInShadowTree(){
                util.clog('this.influencedRowsInRealTree',this.influencedRowsInRealTree)
                this.influencedRowsInRealTree.forEach((row)=>{
                    let id=row[this.treeKey]
                    let shadowRow=this.getSameTreeKeyNodeInVirtualTree(id).row
                    shadowRow[this.checkedKey]=row[this.checkedKey]
                    if(typeof(row.$extra['indeterminate'])!='undefined'){
                        shadowRow.$extra.indeterminate=row.$extra.indeterminate
                    }


                    // shadowRow[this.checkedKey]=
                })
                this.tryUpdateVirtualTreeMethod()
                this.influencedRowsInRealTree=[]
            },
            updateRows(rows,props){
                rows.map((row)=>{
                    util.clog('update row and props',row,props)
                    let id=row[this.treeKey],
                        shadowRow=this.getSameTreeKeyNodeInVirtualTree(id).row
                    util.clog('shadowRow:',shadowRow)
                    props.forEach((prop)=>{
                        shadowRow[prop]=util.copy(row[prop])
                    })
                })

                this.tryUpdateVirtualTreeMethod()
            },
            getDCheckedAllChildsWhenParentChecked(){
                return (this.enableCheckedMultiple==false?false:this.checkedAllChildsWhenParentChecked)&&this.enableCheckedFolder
            },
            setDCheckedAllChildsWhenParentChecked(){
                this.dCheckedAllChildsWhenParentChecked=this.getDCheckedAllChildsWhenParentChecked()
            },
            tryUpdateVirtualTreeMethod(){
                try{
                    this.updateVirtualTreeMethod()
                }catch(e){
                    util.warningMsg('亲爱的请不要惊慌出现这个错误原因在于你配置的updateVirtualTreeMethod方法（此方法用于调试虚拟树，与你无关）调用报错，删除它即可。错误信息为:'+e.message)
                }
            },
            // 获取id相同的虚拟树的index和data
            getSameTreeKeyNodeInVirtualTree(id){
                let index,row
                this.initialTreeCopier.forEach((r,i)=>{
                    if(r[this.treeKey]==id){
                        index=i
                        row=r
                    }
                })
                return {
                    index,
                    row
                }
            },
            // 获取memory tree nodes
            getVirtualTreeNodes(){
                return this.initialTreeCopier
            },
            // 展开所有选中节点
            expandAllCheckedNodes(allCheckedIds,commit=true,checkedChildsIfParentChecked=true){
                let isDescendantsIdInAllCheckedIds=(id)=>{
                    let ids=util.getDescendantChilds(id,this.initialTreeCopier,this.treeKey),
                        res=false
                    ids.forEach((item)=>{
                        if(allCheckedIds.includes(item)){
                            res=true
                        }
                    })
                    return res
                }

                // 应该显示的所有兄弟节点集合
                let shouldShowOtherSiblingsParentId=[],
                    newList=util.copy(this.initialTreeCopier),
                    allRootNodeIndexs=[],
                    shouldExpandIds={}
                var list=newList.filter((item,index)=>{
                    if(item.$extra.deepth==1){
                        allRootNodeIndexs.push(index)
                    }

                    let isItemChecked
                    if(allCheckedIds.includes(item[this.treeKey])){
                        // util.clog('trueeeeeeeeeeeee')
                        isItemChecked=true
                        if(checkedChildsIfParentChecked){
                            item[this.checkedKey]=true
                        }

                        // isItemChecked=(item[this.checkedKey]=true)
                    }
                    // util.clog('isItemChecked---',isItemChecked)
                    let parentNode=this.getParentNode(newList,item)
                    // util.clog('fucku parent node:',parentNode,isItemChecked,parentNode!=null&&isItemChecked)
                    // parentNode!=null&&isItemChecked&&(parentNode.$extra.expanded=false)
                    // 有父节点且当前节点选中就禁止关闭该节点
                    if((parentNode!=null&&isItemChecked)){
                        shouldExpandIds[parentNode[this.treeKey]]=true
                    }



                    // if(item.$extra.deepth==1&&newList[index+1]&&newList[index+1].$extra.deepth!=1){
                    //
                    //     shouldExpandIds[item[this.treeKey]]=true
                    // }

                    // shouldShowSiblingIds=shouldShowSiblingIds.concat(this.getChildsByParentId(item.$extra.parentId,list,'ID'))
                    // shouldShowSiblingIds.forEach((id,i)=>{
                    //     if(id==item[this.treeKey]){
                    //         shouldShowSiblingIds[i]=-1
                    //     }
                    // })

                    let hasItemIdInShouldShowOtherSiblingsParentId=shouldShowOtherSiblingsParentId.includes(item.$extra.parentId)

                    isItemChecked&&shouldShowOtherSiblingsParentId.push(item.$extra.parentId)
                    return hasItemIdInShouldShowOtherSiblingsParentId||
                        allCheckedIds.includes(item[this.treeKey])||
                        item.$extra.deepth==1||
                        isDescendantsIdInAllCheckedIds(item[this.treeKey])

                })
                // util.clog('fucku list:',list,util.copy(this.initialTreeCopier))

                // 当前为顶级节点&&下一个节点存在且为非顶级节点就禁止关闭该节点
                allRootNodeIndexs.forEach((index)=>{
                    if(list[index+1]&&list[index+1].$extra.deepth!=1){
                        shouldExpandIds[list[index][this.treeKey]]=true
                    }
                })

                // util.clog('shouldExpandIds---:',shouldExpandIds)
                // shouldExpandIds.forEach((parent)=>{
                //     parent.$extra.expanded=true
                // })

                // 收缩一些应该收缩的节点
                list.forEach((listItem,index)=>{
                    let expanded=listItem.$extra.expanded
                    if(listItem.$extra.hasChildren&&expanded&&(!shouldExpandIds[listItem[this.treeKey]])){
                        // if(!list[index]){
                        //     // listItem.$extra.expanded=false
                        //     list=this.toggleExpandChildsByIndex(index,false,list)
                        //     // this.toggleExpandChildsByIndex(index,true)
                        // }else{
                        //     if(listItem.$extra.deepth==list[index].$extra.deepth){
                        //         list=this.toggleExpandChildsByIndex(index,false,list)
                        //         // listItem.$extra.expanded=false
                        //         // this.toggleExpandChildsByIndex(index,true)
                        //     }
                        // }
                        listItem.$extra.expanded=false
                    }

                })
                commit&&this.commitTableStoreData(list)

                return list




                // let innerestDeepth=maxDeepth-1
                // while(innerestDeepth>0){
                //     list.forEach((listItem,index)=>{
                //         let expanded=listItem.$extra.expanded
                //         if(expanded&&(!shouldExpandIds[listItem[this.treeKey]])){
                //             if(!list[index]){
                //                 // listItem.$extra.expanded=false
                //                 list=this.toggleExpandChildsByIndex(index,false,list)
                //                 // this.toggleExpandChildsByIndex(index,true)
                //             }else{
                //                 if(listItem.$extra.deepth==list[index].$extra.deepth){
                //                     list=this.toggleExpandChildsByIndex(index,false,list)
                //                     // listItem.$extra.expanded=false
                //                     // this.toggleExpandChildsByIndex(index,true)
                //                 }
                //             }
                //         }
                //
                //     })
                //     innerestDeepth--
                // }
                // let closeSomeExpandedNode=()=>{
                //     list=this.toggleExpandChildsByIndex(index,false,list)
                //     // resData=this.toggleExpandChildsByIndex(loopedChildsNum+i,false,resData)
                // }



                // REAL表示真实树，VIRTUAL表示data中虚拟树


            },
            // 获取父节点对象
            getParentNode(list,item){
                if(item.$extra.deepth==1){
                    return null
                }
                return list.find((obj)=>{
                    return obj[this.treeKey]==item.$extra.parentId
                })
            },

            refreshTreeTable(data){




                let copiedAllExistTreeKeys=util.copy(this.allExistTreeKeys),
                    updateResult

                this.allExistTreeKeys=[]
                util.clog('helloooooooooo')
                let expandedTree=this.updateTreeTable(true,data,1,function(options){
                    updateResult=options
                })
                util.clog('expandedTree--:',expandedTree)
                // 重渲染数据失败回退历史id
                if(!expandedTree){
                    this.allExistTreeKeys=copiedAllExistTreeKeys
                    return false
                }

                this.initialTreeCopier=util.copy(expandedTree)
                // this.commitTableStoreData(util.copy(expandedTree))

                this.handleExpandAfterDataRendered(updateResult.allCheckedIds,updateResult.allIds)

                util.clog('updateResult--:',updateResult)

                this.tryUpdateVirtualTreeMethod()
            },

            // 参数指定是否从源数据更新
            updateTreeTable(fromSourceData=true,insertRows=null,beginDeepth=1,cb){
                cb=cb||function(){}
                let self=this,
                    eachedData,
                    maxDeepth=1,
                    firstCheckedNode=null,
                    allCheckedIds=[],
                    allIds=[],
                    otherCheckedNodes=[],
                    checkedNum=0
                function handleAboveVars(item,deepth){
                    maxDeepth=Math.max(maxDeepth,deepth)
                    allIds.push(item[self.treeKey])

                    if(item[self.checkedKey]){
                        checkedNum++
                        if(firstCheckedNode==null){
                            allCheckedIds.push(item[self.treeKey])
                            firstCheckedNode=item
                        }else{
                            if(self.enableCheckedMultiple){
                                allCheckedIds.push(item[self.treeKey])
                            }
                            otherCheckedNodes.push(item)
                        }
                    }
                }

                // 为每个节点添加额外数据
                function addInitialExtraData4List(item,deepth,parentId=null,path){

                    if(typeof(item[self.checkedKey])==='undefined'){
                        // Vue.set(item,self.checkedKey,false)
                        item[self.checkedKey]=false
                    }

                    let hasChildren=Array.isArray(item[self.childKey])&&item[self.childKey].length>0
                    item.$extra={
                        deepth:deepth,
                        hasChildren:hasChildren,
                        childsNum:hasChildren?item[self.childKey].length:0,
                        parentId:parentId,
                        indeterminate:false,
                        path:path
                        // expanded:item[self.expandKey]
                    }
                    handleAboveVars(item,deepth)


                    var childTreeKeys=[]

                    if(hasChildren){

                        item[self.childKey].forEach((subItem)=>{
                            childTreeKeys.push(subItem[self.treeKey])
                            util.clog('subItem::::::::::::',subItem[self.prop],subItem[self.checkedKey])
                            if(item[self.checkedKey]==true&&self.dCheckedAllChildsWhenParentChecked){
                                subItem[self.checkedKey]=true
                            }
                            addInitialExtraData4List(subItem,deepth+1,item[self.treeKey],path+'->'+subItem[self.prop])
                        })
                    }
                    item.$extra.childTreeKeys=childTreeKeys
                }



                // util.clog('this.getRealData()---:',JSON.stringify(this.getRealData()))
                //
                //
                // util.clog('is from source:',fromSourceData)
                // util.clog('this.getOwner().data--:',this.getOwner().data)
                // util.clog('this.getRealData()--:',this.getRealData())





                if(fromSourceData){
                    eachedData=insertRows||(this.getOwner().data)
                    util.clog('eachedData--:',eachedData)
                    eachedData.forEach((item)=>{
                        addInitialExtraData4List(item,beginDeepth,null,item[this.prop])
                    })
                }else{

                    this.getRealData().forEach((item,index)=>{
                        handleAboveVars(item,item.$extra.deepth)
                    })
                }


                let allExistIdsFromBeginest=[].concat(allIds).concat(this.allExistTreeKeys),
                    set=Array.from(new Set(allExistIdsFromBeginest))

                if(allExistIdsFromBeginest.length!=set.length){

                    util.warningMsg('您的数据中某些数据主键是相同的，这必将会造成数据紊乱，请修改数据再调用我')
                    return false
                }else{
                    this.allExistTreeKeys=allExistIdsFromBeginest
                }



                if(!this.enableCheckedMultiple){
                    if(checkedNum>0){
                        this.radioTreeKeyModel=firstCheckedNode[this.treeKey]
                    }
                    if(checkedNum>1){
                        util.warningMsg('您设定的为单选模式，但是有超过一条数据为选中状态，将仅设定第一个选中的为选中节点，其他都变为非选中状态')
                        otherCheckedNodes.forEach((obj)=>{
                            obj[this.checkedKey]=false
                        })
                    }
                }




                if(!fromSourceData){

                    return this.getRealData()
                }





                util.clog('allCheckedIds---:',allCheckedIds)



                //




                util.clog('eached data before expand:',eachedData)

                let expandedTree=this.expandTree(maxDeepth,insertRows,insertRows==null?false:true)




                if(insertRows==null){
                    this.initialTreeCopier=expandedTree


                    // if(!this.isVirtualTree){
                    //
                    // }
                    // expandAll

                    this.handleExpandAfterDataRendered(allCheckedIds,allIds)



                    // 自动展开选中节点

                }
                // else{


                cb({
                    eachedData,
                    maxDeepth,
                    firstCheckedNode,
                    allCheckedIds,
                    allIds,
                    otherCheckedNodes,
                    checkedNum
                })


                return expandedTree
                // }





                // util.clog('memory check status and view tree checked status:',
                //     util.getValueArrByKeyFromArray(this.getRealData(),this.prop,this.isItemChecked.bind(this)),
                //     util.getValueArrByKeyFromArray(this.initialTreeCopier,this.prop,this.isItemChecked.bind(this))
                // )







                // // setTimeout(()=>{
                //
                // util.poll(()=>{
                //     return this.getOwner().$ready==true
                // },()=>{
                //
                //
                //     this.getOwner().$el.classList.add('fw-tree-table')
                //
                //
                //
                //
                //
                // })
                //
                // util.clog('this.getOwner().$el.classList--:',this.getOwner().$el.classList)
                //
                // // },500)
                //
                // util.clog('before create:',this.owner)


            },
            // 展开树木所有节点,影子树和真实树区别对待
            expandTree(maxDeepth,resData,isInsertRowMutation=false){


                resData=resData||this.getRealData()

                util.clog('fucku  res  data----：')






                let currentHandledDeepth=1
                let startTime=Date.now()
                let loop=()=>{

                    util.clog('this--:',this)
                    let loopedChildsNum=0
                    // util.clog('data len:',data.length)
                    for(let i=0,len=resData.length;i<len;i++){
                        // let data=this.getRealData()
                        let item=resData[loopedChildsNum+i]
                        if(currentHandledDeepth==item.$extra.deepth){
                            let childs=item[this.childKey],
                                hasChilds=childs&&childs.length>0,
                                childsNum=hasChilds?childs.length:0
                            // this.toggleExpandChildsByIndex(loopedChildsNum+i,true)
                            resData=this.toggleExpandChildsByIndex(loopedChildsNum+i,false,resData,isInsertRowMutation)




                            // console.table(item)
                            //
                            // let childs=item[this.childKey],
                            //     hasChilds=childs&&childs.length>0,
                            //     childsNum=hasChilds?childs.length:0,
                            //     shouldExpandItem=hasChilds&&childs.every((childItem)=>{
                            //         return childItem[this.checkedKey]==true
                            //     })
                            //

                            // item.$extra.expanded=shouldExpandItem
                            // let prefix = data.slice(0,loopedChildsNum+1+i)
                            // let j = 0
                            // while (j<loopedChildsNum+1+i){
                            //     data.shift()
                            //     j++
                            // }
                            //
                            //
                            // data = prefix.concat(hasChilds?childs:[]).concat(data)
                            loopedChildsNum=loopedChildsNum+childsNum
                        }


                    }

                    currentHandledDeepth++
                    // this.commitTableStoreData(data)
                    if(currentHandledDeepth<maxDeepth){
                        loop()
                    }

                }


                loop()
                util.clog('展开所有checked节点耗费时间:',Date.now()-startTime)
                util.clog('res data------:',resData)
                return resData




            },
            // 展开所有节点
            expandAllNodes(conFun){
                conFun=conFun||function(){return true}
                this.commitTableStoreData(util.copy(this.initialTreeCopier))
            },
            // 获取所有节点
            getAllNodes(conFun,GET_TYPE='ROW'){
                conFun=conFun||function(){return true}
                let
                    checkedIndexArr=[],
                    checkedIdArr=[],
                    // updateChilds=()=>{
                    //
                    // },
                    checkedNodes=this.initialTreeCopier.filter((item,i)=>{
                        if(conFun(item)&&this.searchConditionFunction(item)){
                            checkedIndexArr.push(i)
                            checkedIdArr.push(item[this.treeKey])
                            return true
                        }else{
                            return false
                        }

                    })


                if(GET_TYPE=='ROW'){
                    checkedNodes=checkedNodes.map((item)=>{

                        return util.copyDataAndDeleteSomeProps(item,[this.childKey])
                    })




                    return checkedNodes
                }else if(GET_TYPE=='INDEX'){
                    return checkedIndexArr
                }else if(GET_TYPE=='ID'){
                    return checkedIdArr
                }





                //     ,
                //     // 全量拷贝所有表格数据，将来倒序并调用getDataByModel获取所有子节点，然后放到表格每个节点childs中
                //     BFSData=util.BFS(util.copy(this.getRealData()),this.treeKey,'$extra.parentId')
                //
                // util.clog('BFSData--:',BFSData)
                //
                // let getModelExpressionInBFSData=(item)=>{
                //     var str=''
                //     str+=item[this.treeKey]
                //     while(item.$extra.parentId!==null){
                //
                //         item=this.getRealData().find((obj)=>{
                //             return obj[this.treeKey]==item.$extra.parentId
                //         })
                //         str+=item[this.treeKey]
                //     }
                //
                //
                //     return str.split('').reverse().map((key)=>{
                //         return 'children.'+key
                //     }).join('.')
                // }
                //
                // checkedNodes.forEach((item)=>{
                //
                //     let getDescendantChilds=util.getDescendantChilds(item[this.treeKey],this.getRealData(),this.treeKey)
                //     // let modelExpressionInBFSData=getModelExpressionInBFSData(item)
                //     //
                //     // util.clog("fucku modelExpressionInBFSData---:",modelExpressionInBFSData)
                // })


                // checkedNodes.forE


            },
            // 获取所有选中nodes
            getCheckedNodes(COPY=true){
                let res=[]

                this.initialTreeCopier.forEach((item)=>{
                    if(item[this.checkedKey]==true){
                        res.push(util.copyDataAndDeleteSomeProps(item,[this.childKey]))
                    }
                })

                return res

                // return this.getAllNodes((item)=>{
                //     return item[this.checkedKey]==true
                // },COPY)
            },
            isItemChecked(item){
                return   item[this.checkedKey]==true
            },
            handleLabelClick(row){
                util.clog('handle label click:',row)
                this.$emit('labelClick',row)
            },
            getFirstSiblingNode(index,isVirtualTree=false){
                let resIndex=null,
                    d=isVirtualTree?this.initialTreeCopier:this.getRealData(),
                    row=d[index],
                    parentId=row.$extra.parentId,
                    deepth=row.$extra.deepth
                // while(this.getRealData()[resIndex-1].$extra.deepth>=deepth){
                //     resIndex--
                // }
                d.forEach((item,index)=>{
                    if(resIndex==null&&item.$extra.parentId==parentId&&item.$extra.deepth==deepth){
                        resIndex=index
                    }
                })

                return {
                    index:resIndex,
                    row:d[resIndex]
                }
            },
            // 获取所有兄弟节点
            getChildsByParentId(pid,fromData,resType='DATA'){
                fromData=fromData||this.getRealData()
                util.clog('pid-----:',pid)
                let arr=[]
                fromData.forEach((item)=>{
                    if(item.$extra.parentId==pid){
                        arr.push(resType=='DATA'?item:item[this.treeKey])
                    }
                })
                return arr
            },
            // 获取所有父亲爷爷节点
            getAllParentNodes(row,index,GET_TYPE='ROW'){
                if(row.$extra.deepth==1){
                    return []
                }
                let d=this.initialTreeCopier,
                    // let d=(isVirtualTree?this.initialTreeCopier:this.getRealData()),
                    res=[],
                    hasLoopedUntilRootNode=false,
                    i=index-1
                util.clog('fucku d---:',d)
                while(!hasLoopedUntilRootNode){
                    let parent=d[i],
                        parentDeepth=parent.$extra.deepth

                    if(parentDeepth<row.$extra.deepth){
                        res.unshift(GET_TYPE=='INDEX'?i:parent)
                    }

                    hasLoopedUntilRootNode=parentDeepth==1
                    i--
                }
                return res

            },
            // 同步当前点击节点所有父节点
            syncParentNodesCheckedStatus(row,index,isVirtualTree=false){
                let targetCheckedStatus=row[this.checkedKey]
                util.clog('syncParentNodesCheckedStatus',targetCheckedStatus)
                // alert(targetCheckedStatus)
                let deepth=row.$extra.deepth
                util.clog('deepth:',deepth)
                if(deepth==1){
                    return false
                }
                let firstSibling=this.getFirstSiblingNode(index,isVirtualTree)
                util.clog('first sibling:',firstSibling)
                row=firstSibling.row
                index=firstSibling.index

                let parentIndex=index-1,
                    parent=(isVirtualTree?this.initialTreeCopier:this.getRealData())[parentIndex],
                    // parentCheckedStatus=parent[this.checkedKey],
                    parentId=parent[this.treeKey],
                    // childIds=util.getDescendantChilds(parentId,this.getRealData(),this.treeKey,(obj)=>{
                    //     return obj.$extra.deepth==deepth
                    // }),
                    allSiblings=this.getChildsByParentId(parentId,isVirtualTree?this.initialTreeCopier:null)
                util.clog('allSiblings--:',allSiblings)

                this.influencedRowsInRealTree.push(parent)

                if(allSiblings.every((sibling)=>{
                        return sibling[this.checkedKey]==targetCheckedStatus&&sibling.$extra.indeterminate==false
                    })){
                    parent[this.checkedKey]=targetCheckedStatus
                    parent.$extra.indeterminate=false

                }else{
                    parent[this.checkedKey]=false
                    parent.$extra.indeterminate=true
                }
                if(parent.$extra.deepth!=1){
                    this.syncParentNodesCheckedStatus(parent,parentIndex)
                }





            },
            // 同步当前选中节点所有子孙节点
            syncChildNodesCheckedStatus(row){






                // let data = JSON.parse(JSON.stringify(this.getRealData()))

                let data=util.copy(this.getRealData())

                let id = row[this.treeKey]

                // 万一真实节点折叠了，当前node所有子孙无法被push到待同步队列；于是用了此凑巧办法

                // let realTreeDescendantChildIds = util.getDescendantChilds(id,data,this.treeKey),
                let virtualTreeDescendantChilds=util.getDescendantChilds(id,data,this.treeKey,'DATA'),
                    virtualTreeDescendantChildIds=util.getDescendantChilds(id,this.initialTreeCopier,this.treeKey),
                    realTreeDescendantChildIds=util.getValueArrByKeyFromArray(virtualTreeDescendantChilds,this.treeKey)

                virtualTreeDescendantChildIds.forEach((vid)=>{
                    if(!realTreeDescendantChildIds.includes(vid)){
                        virtualTreeDescendantChilds.push({
                            [this.treeKey]:vid,
                            [this.checkedKey]:row[this.checkedKey],

                            $extra:{

                            }
                        })
                    }
                })

                util.clog('fucku realTreeDescendantChildIds---:',realTreeDescendantChildIds)

                util.clog('fucku virtualTreeDescendantChilds---:',virtualTreeDescendantChilds)
                this.influencedRowsInRealTree=this.influencedRowsInRealTree.concat(virtualTreeDescendantChilds)

                data.forEach((item)=>{
                    if(realTreeDescendantChildIds.includes(item[this.treeKey])&&this.dCheckedAllChildsWhenParentChecked){
                        item[this.checkedKey]=row[this.checkedKey]
                        item.$extra.indeterminate=false

                    }

                })


                util.clog('store data:',data)


                this.commitTableStoreData(data)



            },
            //fuck不知道为毛两次，懒得研究了，用了debounce
            handleTreeCheckboxClick:
            // util.debounce(
                function(row,index){
                    // debounce

                    util.clog('handle tree checkbox click')



                    // util.clog('row--aaaaaaaa:',row)


                    if(!this.enableCheckedMultiple){

                        return false
                    }




                    // row[this.checkedKey]=row[this.checkedKey]?false:true
                    if(this.dCheckedAllChildsWhenParentChecked){
                        // this.$nextTick(()=>{
                        row.$extra.indeterminate=false
                        util.clog('handle tree click:',index)
                        this.influencedRowsInRealTree.push(row)
                        this.syncChildNodesCheckedStatus(row)
                        this.syncParentNodesCheckedStatus(row,index)


                        this.updateInfluencedRowsInShadowTree()

                        // this.$nextTick(()=>{
                        //
                        // })
                        // alert(row[this.prop])


                        //     let virtualNode=this.getSameTreeKeyNodeInVirtualTree(row[this.treeKey])
                        //
                        //     virtualNode.row[this.checkedKey]=row[this.checkedKey]
                        // virtualNode.row.$extra.indeterminate=false
                        //     util.clog('virtualNode--: ',virtualNode)
                        //     this.$nextTick(()=>{
                        //         this.syncParentNodesCheckedStatus(virtualNode.row,virtualNode.index,true)
                        //         this.tryUpdateVirtualTreeMethod()
                        //     })


                        // })
                    }


                    // return false










                    // e.cancelBubble=true
                    // e.preventDefault()
                    // e.stopImmediatePropagation()
                }
            // )
            ,
            floderIcon(row){
                util.clog('fucku row--:',row)
                let expanded = row.$extra && row.$extra.expanded
                let  floder = this.folderIcon,
                    floder_open = this.folderIcon+'-open'
                return expanded ? floder_open : floder
            },
            hasChild(row){

                return row.$extra.childsNum>0

                // // if(row[this.childNumKey] != undefined){
                // //     return row[this.childNumKey] > 0 ? true : false
                // // }else
                // if(row[this.childKey] != undefined){
                //     return row[this.childKey].length > 0 ? true : false
                // }else{
                //     return false
                // }
            },
            paddingLeft(row){
                return  (parseInt(row.$extra.deepth) * 14)+'px'
            },
            icon(row){
                if(row.$extra && row.$extra.loading == true) return 'el-icon-loading'
                return row.$extra && row.$extra.expanded ?'el-icon-caret-bottom':'el-icon-caret-right'
            },
            getNodesByTreeKeys(arr){
                let res=[]
                arr.forEach((item)=>{
                    res.push(this.initialTreeCopier.find((obj)=>{
                        return obj[this.treeKey]==item
                    }))
                })
                return res
            },
            toggleExpandChildsByIndex(index,ifSetData,fromListData,isInsertRowMutation=false){
                let d=fromListData||this.getRealData()
                // util.clog('d----:',d);return false
                // let ifSetData=fromListData?false:true
                let row=d[index]
                if(!this.hasChild(row)){
                    return d
                }


                // // 在展开节点之前同步所有子节点checked状态
                // let syncChildNodesCheckedStatus=(row)=>{
                //     if(row.$extra.hasChildren){
                //         row[this.childKey].forEach((childItem)=>{
                //             if(this.dCheckedAllChildsWhenParentChecked){
                //                 childItem[this.checkedKey]=row[this.checkedKey]
                //             }
                //             syncChildNodesCheckedStatus(childItem)
                //         })
                //
                //     }
                // }
                //
                // syncChildNodesCheckedStatus(row)


                util.clog('index----:',index,row)
                let vm = this
                let data=util.copy(d)
                util.clog('data---:',data)


                if(data[index].$extra == undefined){
                    data[index].$extra = {expanded:true}
                }else{
                    data[index].$extra.expanded = !data[index].$extra.expanded
                }

                if(data[index].$extra.expanded){
                    // if(this.remote != null){
                    //     let hash = util.hash()
                    //     data[index].$extra.expanded = false
                    //     data[index].$extra.hash = hash
                    //     data[index].$extra.loading = true
                    //     ifSetData&&vm.getOwner().store.commit('setData',data)
                    //     this.remote(row,function(result) {
                    //         let list = vm.getOwner().store.states._data
                    //         let _index = util.index(hash,list)
                    //         list[_index].$extra = {
                    //             loading : false,
                    //             expanded : result && result.length > 0 ? true : false
                    //         }
                    //         if( result && result.length > 0){
                    //             let prefix = list.slice(0,_index+1)
                    //             let i = 0
                    //             while (i < _index + 1 ){
                    //                 list.shift()
                    //                 i++
                    //             }
                    //             list = prefix.concat(result).concat(list)
                    //         }
                    //         // else{
                    //         //     list[_index][vm.childNumKey] = 0
                    //         // }
                    //         ifSetData&&vm.getOwner().store.commit('setData',list)
                    //     })
                    // }else{
                    let id = row[vm.treeKey]
                    let expandedIds = util.getDescendantChilds(id,data,this.treeKey)
                    let prefix = data.slice(0,index+1)
                    let i = 0
                    while (i<index+1){
                        data.shift()
                        i++
                    }
                    // util.clog('initial copier in expanded fun:',this.initialTreeCopier)

                    if(this.initialTreeCopier.length==0){
                        data = prefix.concat(row[vm.childKey]).concat(data)
                    }else{
                        let allChildNodes

                        if(isInsertRowMutation){
                            allChildNodes=row[vm.childKey]
                        }else{
                            allChildNodes=this.getNodesByTreeKeys(util.getValueArrByKeyFromArray(row[vm.childKey],this.treeKey))
                        }
                        allChildNodes.forEach((child)=>{
                            if(child.$extra.childsNum>0){
                                child.$extra.expanded=false
                            }
                        })
                        data = prefix.concat(allChildNodes).concat(data)
                    }
                    //

                    ifSetData&&this.commitTableStoreData(data)

                    return data


                    // }
                }else{
                    let id = row[vm.treeKey],result = []
                    let removeIds = util.getDescendantChilds(id,data,this.treeKey)
                    data.forEach(function(item){
                        if(util.indexOf(item[vm.treeKey],removeIds) == -1){
                            result.push(item)
                        }
                    })
                    data = result
                    ifSetData&&this.commitTableStoreData(data)

                    return data

                }

            }
        }
    }
</script>
<style>
</style>
