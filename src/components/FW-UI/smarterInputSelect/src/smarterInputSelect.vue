<template>
    <div class="fw-smarter-input-select-wrapper">


        <el-popover @show="popoverVisible=true" @hide="popoverVisible=false" v-if="!enableCreate&&!disabled"
                    ref="selectPopover"
                    placement="bottom"
                    :title="title"
                    trigger="click">
            <slot></slot>
        </el-popover>

        <div ref="popOverTrigger" v-popover:selectPopover v-if="!enableCreate&&!disabled" class="el-select"><!---->
            <div :class="'el-input el-input--'+size"><!----><i
                class="el-input__icon el-icon-caret-bottom is-reverse"></i>
                <input :value="value"
                       autocomplete="off" :placeholder="placeholder" readonly="readonly" icon="caret-top" type="text"
                       rows="2"
                       class="el-input__inner"></div>
            <div class="resize-triggers">
                <div class="expand-trigger">
                    <div style="width: 241px; height: 37px;"></div>
                </div>
                <div class="contract-trigger"></div>
            </div>
        </div>


        <div v-if="!enableCreate&&disabled" :class="'el-input is-disabled el-input--'+size"><!----><i
            class="el-input__icon el-icon-caret-bottom is-reverse"></i>
            <input disabled :value="value"
                   autocomplete="off" :placeholder="placeholder" readonly="readonly" icon="caret-top" type="text"
                   rows="2"
                   class="el-input__inner">
        </div>


        <!--fucku model:{{model}}<br>-->
        <!--lastQuery:{{lastQuery}}<br>-->

        <el-select :popper-class="optionFacade=='TABLE'?'smarter-select-table-wrapper':''" v-if="enableCreate"
                   ref="select"
                   :disabled="disabled"
                   @visible-change="handleVisibleChange"
                   remote
                   :trigger-on-focus="false"
                   @change="handleChange"
                   :remote-method="invokeRemoteMethod"
                   :multiple="false"

                   v-model="model"
                   filterable

                   :placeholder="placeholder"

                   :loading="loading">



            <div v-if="optionFacade=='TABLE'">
                <el-option-group
                    :data-widths="tableRowWidths"

                    :label="tableRowLabels">
                    <!--optionFacade-->
                    <!--<div v-if="optionFacade!='TABLE'">-->
                        <el-option
                            v-for="(item,index) in data"
                            v-if="(item[isShowKey]!==false) || (!(isShowKey in item))"
                            :key="item[uuid]||Math.random()"
                            :label="item[labelKey]"
                            :value="index">

                            <span v-for="(prop,index) in tableRowPropsArr"
                                  v-bind:style="{width:(tableRowWidthsArr[index]||defaultRowWidth)+'px'}"
                                  style="display:inline-block;text-align:center;">{{ getDataByModel(item,prop) }}</span>


                        </el-option>
                    <!--</div>-->

                </el-option-group>
            </div>




            <div v-if="optionFacade!='TABLE'">
                <el-option
                    v-for="(item,index) in data"
                    v-if="(item[isShowKey]!==false) || (!(isShowKey in item))"
                    :key="item[uuid]||Math.random()"
                    :label="getDataByModel(item,labelKey)"
                    :value="index">
                    <slot :row="item" :$index="index"></slot>


                </el-option>
            </div>
        </el-select>


    </div>
</template>
<style>
    .smarter-select-table-wrapper .el-select-group .el-select-dropdown__item{
        padding-left:10px;
    }
    .fw-smarter-input-select-wrapper{
        display:inline-block;
    }
</style>
<script>




    let u = {
        getDataByModel: function ($scope, modelStr, otherWiseVal) {
            otherWiseVal = otherWiseVal || null

            if(!$scope){
                return otherWiseVal
            }

            var arr = modelStr.split('.'), len = arr.length, result = $scope
            // console.log('len:',len)
            if (len === 1) {
                // if($scope.hasOwnProperty(arr[0])) {
                //     return $scope[arr[0]]
                // }
                // else if($scope.result && $scope.result[arr[0]]) {
                //     return $scope.result[arr[0]]
                // }
                return $scope.hasOwnProperty(arr[0])?$scope[arr[0]]:otherWiseVal
            } else if (len > 1) {
                var isError = false
                for (var i in arr) {
                    if (typeof(result[arr[i]]) === 'undefined') {
                        isError = true
                        break
                    } else {
                        result = result[arr[i]]
                    }
                }
                if (isError) {
                    return otherWiseVal
                } else {
                    return result
                }
            } else if (len === 0) {
                return otherWiseVal
            }
        },
        // // 函数节流
        debounce: function (func, wait = 100, immediate = true) {
            // console.log('')
            let timeout
            return function () {
                let context = this, args = arguments
                let later = function () {
                    timeout = null
                    if (!immediate) func.apply(context, args)
                }
                let callNow = immediate && !timeout
                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
                if (callNow) func.apply(context, args)
            }
        },
    }

    let string2Arr=str => str.split(' ')

    export default {

        name: 'fw-smarter-input-select',
        computed:{
            tableRowLabelsArr(){
                return string2Arr(this.tableRowLabels)
            },
            tableRowPropsArr(){
                return string2Arr(this.tableRowProps)
            },
            tableRowWidthsArr(){
                return string2Arr(this.tableRowWidths)
            }
        },
        props: {
            tableRowLabels:{
              type:String,
              default:''
            },
            tableRowProps:{
                type:String,
                default:''
            },
            tableRowWidths:{
                type:String,
                default:''
            },
            optionFacade:{
                type:String,
                default:''
            },
            size: {
                type: String,
                default: 'normal'
            },
            title: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            enableCreate: {
                type: Boolean,
                default: false
            },
            // value: String,
//            change:Function,
//            remoteMethod:Function,
            placeholder: String,
            data: Array,
            loading: Boolean,
            uuid: {
                type: [String, Number]
            },
            labelKey: {
                type:String,
                default:''
            },
            isShowKey: String,
            value: [String, Number]
        },

        mounted() {





            if (this.enableCreate) {
                var self = this,
                    input = this.$refs.select.$el.querySelector('input')

                input.addEventListener('focus',()=>{
                    this.isInputFocused=true
                })
                input.addEventListener('blur',()=>{
                    this.isInputFocused=false
                })

                window.addEventListener('keyup',(e)=>{
                    if(e.keyCode==13&&this.isInputFocused){
                        // input.blur()
                        this.$emit('enterKeyUp',input.value)
                    }
                    // console.log('key code and is focus:',e.keyCode,this.isInputFocused)
                })

                input.addEventListener('input', function () {

                    // console.log('input change')
                    // if ((!this.value) || (this.value.trim() === '')) {
                    //     // return false
                    // } else {
                    //     self.$emit('inputChange', this.value)
                    //     self.lastQuery = this.value
                    // }

                    // console.log('this.vau and last query:',this.value,self.lastQuery)
                    // if(this.value==''&&self.lastQuery==''){
                    //     alert('hello')
                    // }


                    // self.changeTableOptionTitle()
                    self.$emit('inputChange', this.value)
                    self.lastQuery = this.value


                    // this.$emit('remoteMethod',query)

                })
                input.addEventListener('blur', function () {
//                self.$emit('blur',this.value)
                    self.model = self.lastQuery
                })
//            input.addEventListener('focus',function(){
////                self.$emit('blur',this.value)
//                console.log('fucku self model:',self.model)
//                var val=self.model
//
//                input.value=val
//                self.$nextTick(()=>{
//                    self.model=val
//                    input.value=val
//                })
//            })
//            })
            }

        },
        methods: {

            ...u,
            changeTableOptionTitle(){
                console.log('fucku this:',this)
                if(this.optionFacade=='TABLE'&&this.data.length>0){
                    console.log('aaa')
                    // hasChanged=true
                    let tableOptionWrapper=[].filter.call(document.body.children,(item)=>{1
                        return item.classList.contains('smarter-select-table-wrapper')
                    })
                    Array.prototype.forEach.call(tableOptionWrapper,(item)=>{
                        let groupWrapper=item.querySelector('.el-select-group__wrap'),
                            groupTitle=groupWrapper.querySelector('.el-select-group__title'),
                            titleText=groupTitle.innerText.trim()

                        if(titleText.includes(',')){
                            let titles=titleText.split(','),
                                widths=groupWrapper.dataset.widths.split(',')
                            console.log(groupWrapper,groupTitle)

                            let spanHTML=''
                            titles.forEach((title,i)=>{
                                spanHTML+='<span style="text-align:center;display:inline-block;width:'+(widths[i]||this.defaultRowWidth)+'px">'+title+'</span>'
                            })

                            groupTitle.innerHTML=spanHTML
                        }


                    })
                    console.log('refs:',this.$refs.select)
                }
            },
            hidePopOver(){
                if(this.popoverVisible){

                    this.popoverVisible=false
                    // console.log('this.$refs.popOverTrigger.$el',this.$refs)
                    this.$refs.popOverTrigger.click()
                }
            },
            handleVisibleChange(bool) {
                this.model = this.lastQuery

                // if (this.lastVisible == false && bool == true) {
                //     this.$emit('inputChange', this.model)
                // }

                this.lastVisible = bool


                if(bool&&this.optionFacade=='TABLE'&&this.data.length>0){
                    this.changeTableOptionTitle()
                }

                console.log('visible has been changed', bool)

            },
            handleChange: function (val) {
                // console.log('handle change was invoked',val,typeof(val))
                //
                // if(Number.isInteger(val)){
                //     console.log('int')
                //     var index=val-0,
                //         obj=this.data[index]
                //     this.$emit('selectChange',obj,index)
                // }else{
                //     this.$emit('inputChange',val)
                // }

                console.log('val--:', val, this.data, typeof(val))
                if (Number.isInteger(val)) {
                    var index = val - 0,
                        obj = this.data[index]
                    this.$emit('selectChange', obj, index)
                }
                // return true


            },
            invokeRemoteMethod() {

            }
//            handleChange:u.debounce(function(val){
//                console.log('handle changeeeeeeeeeeeeee')
//                var index=val-0,
//                    obj=this.data[index]
////                console.log('handle change has been invoked')
//                if(!obj){
//                    return false
//                }
//                this.$emit('change',obj)
//
//            },100,true),
//             invokeRemoteMethod:u.debounce(function(query){
//
//                 console.log('query and last query:',query,this.lastQuery)
//
//                 console.log('invokeRemoteMethod has been invoked')
//                 this.$emit('remoteMethod',query)
//
//             })
        },
        data() {
            return {
                isInputFocused:false,
                defaultRowWidth:60,
                popoverVisible:false,
                lastVisible: false,
                model: this.value,
                lastQuery: this.value,
            }
        },
        watch: {
            'data':function(v){
                if(v.length>0){
                    console.log('data len gt 0')
                    u.debounce(this.changeTableOptionTitle.call(this))

                }
                // alert(v.length)
            },
            'popoverVisible':function(v){
                console.log('popoverVisible---:',v)
            },
            'value': function (val) {
//                var input=this.$refs.select.$el.querySelector('input')
                console.log('default val:', val)
                this.model = val
                this.lastQuery = val

            }
        }
    }
</script>
