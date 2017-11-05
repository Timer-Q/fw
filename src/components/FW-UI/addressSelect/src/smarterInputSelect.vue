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

        <el-select v-if="enableCreate"
                   ref="select"
                   :disabled="disabled"
                   @visible-change="handleVisibleChange"
                   remote
                   @change="handleChange"
                   :remote-method="invokeRemoteMethod"
                   :multiple="false"

                   v-model="model"
                   filterable

                   :placeholder="placeholder"

                   :loading="loading">
            <el-option
                v-for="(item,index) in data"
                v-if="(item[isShowKey]!==false) || (!(isShowKey in item))"
                :key="item[uuid]||Math.random()"
                :label="item[labelKey]"
                :value="index">
                <slot :row="item" :$index="index"></slot>


            </el-option>
        </el-select>


    </div>
</template>
<style>
    .fw-smarter-input-select-wrapper{
        display:inline-block;
    }
</style>
<script>

    let u = {
        // 函数节流
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

    export default {

        name: 'fw-smarter-input-select',
        props: {
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
            labelKey: String,
            isShowKey: String,
            value: [String, Number]
        },
        mounted() {

            if (this.enableCreate) {
                var self = this,
                    input = this.$refs.select.$el.querySelector('input')

                input.addEventListener('input', function () {

                    console.log('input change')
                    if ((!this.value) || (this.value.trim() === '')) {
                        // return false
                    } else {
                        self.$emit('inputChange', this.value)
                        self.lastQuery = this.value
                    }


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
            hidePopOver(){
                if(this.popoverVisible){

                    this.popoverVisible=false
                    // console.log('this.$refs.popOverTrigger.$el',this.$refs)
                    this.$refs.popOverTrigger.click()
                }
            },
            handleVisibleChange(bool) {
                this.model = this.lastQuery

                if (this.lastVisible == false && bool == true) {
                    this.$emit('inputChange', this.model)
                }

                this.lastVisible = bool

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
                return true


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

                popoverVisible:false,
                lastVisible: false,
                model: this.value,
                lastQuery: this.value,
            }
        },
        computed: {},
        watch: {
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
