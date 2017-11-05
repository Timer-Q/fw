<template>
        <div>
            <!--<fw-vm-data-viewer :vm="_self" :keys="'lastRemoteQuery'.split(' ')"></fw-vm-data-viewer>-->

            <fw-smarter-input-select
                ref="tabAddressSelect"
                v-if="facade.toUpperCase()=='TAB'"
                style="display:inline-block;"

                :size="size"
                @inputChange="handleInputChange"
                @selectChange="handleSelectChange"
                title=""
                :enable-create="false"
                placeholder="请选择"
                :data="[]"
                :loading="false"
                :value="defaultValue"
                labelKey="label"
                isShowKey="isShow"
            >
                <template slot-scope="scope">
                    <el-tabs v-model="activeName" style="width:450px;" type="border-card">
                        <el-tab-pane name="province" :disabled="util.isNull(d.provinceList)" label="省">







                            <div class="city-select-content">
                                <div class="city-select province">

                                    <dl v-for="(initialItems,initialIndex) in d.provinceGroupList" class="clearfix">
                                        <dt>{{d.initialGroupLabelArr[initialIndex]}}</dt>
                                        <dd>
                                            <a @click="handleProvinceChange(item,$event)"
                                               v-bind:class="{active:value[keyPrefix+'ProvId']==item.provinceId}"
                                               v-for="item in initialItems"
                                               :title="item.provinceName">{{item.provinceName}}</a>
                                        </dd>
                                    </dl>

                                </div>

                            </div>




                        </el-tab-pane>
                        <el-tab-pane name="city" :disabled="util.isNull(value[keyPrefix+'ProvId'])" label="市">
                            <div class="city-select-content">
                                <div class="city-select">
                                    <a @click="handleCityChange(item,$event)"
                                       v-bind:class="{active:value[keyPrefix+'CityId']==item.cityId}"
                                       v-for="item in d.cityList"
                                       :title="item.cityName">{{item.cityName}}</a>
                                </div>
                            </div>


                        </el-tab-pane>
                        <el-tab-pane name="district" :disabled="util.isNull(value[keyPrefix+'CityId'])" label="区县">
                            <div class="city-select-content">
                                <div class="city-select">
                                    <a @click="handleCountyChange(item,$event)"

                                       v-bind:class="{active:value[keyPrefix+'DistrictId']==item.countyId}"
                                       v-for="item in d.countyList"
                                       :title="item.countyName">{{item.countyName}}</a>
                                </div>
                            </div>

                        </el-tab-pane>
                        <el-tab-pane name="street" :disabled="util.isNull(value[keyPrefix+'DistrictId'])" label="街道">
                            <div class="city-select-content">
                                <div class="city-select">
                                    <a @click="handleStreetChange(item,$event)"

                                       v-bind:class="{active:value[keyPrefix+'StreetId']==item.streeId}"
                                       v-for="item in d.streetList"
                                       :title="item.streeName">{{item.streeName}}</a>
                                </div>
                            </div>



                        </el-tab-pane>
                    </el-tabs>
                </template>

            </fw-smarter-input-select>

            <div v-if="facade=='SELECT'">
                <el-select :size="size" :disabled="d.provinceList===null"
                           @change="
                       handleProvinceChange()
                   "
                           v-model="value[keyPrefix+'ProvId']" placeholder="省份">
                    <el-option
                        v-for="item in d.provinceList"
                        :key="item.provinceId"
                        :label="item.provinceName"
                        :value="item.provinceId">
                    </el-option>
                </el-select>
                <el-select :size="size" @change="
        handleCityChange()"
                           :disabled="value[keyPrefix+'ProvId']===null" v-model="value[keyPrefix+'CityId']"
                           placeholder="城市">
                    <el-option
                        v-for="item in d.cityList"
                        :key="item.cityId"
                        :label="item.cityName"
                        :value="item.cityId">
                    </el-option>
                </el-select>
                <el-select :size="size" @change="
            handleCountyChange()
        "
                           :disabled="value[keyPrefix+'CityId']===null" v-model="value[keyPrefix+'DistrictId']"
                           placeholder="区县">
                    <el-option
                        v-for="item in d.countyList"
                        :key="item.countyId"
                        :label="item.countyName"
                        :value="item.countyId">
                    </el-option>
                </el-select>
                <el-select @change="
            handleStreetChange()
        " :size="size"
                           :disabled="value[keyPrefix+'DistrictId']===null" v-model="value[keyPrefix+'StreetId']"
                           placeholder="街道">
                    <el-option
                        v-for="item in d.streetList"
                        :key="item.streeId"
                        :label="item.streeName"
                        :value="item.streeId">
                    </el-option>
                </el-select>


                <!--:disabled="value.streetId===null"-->



            </div>


            <!--detailList len:{{d.detailList.length}}-->
            <el-select
                v-if="showDetail"
                ref="detailAddress"
                :disabled="d.provinceList===null"
                @visible-change="handleVisibleChange"

                :size="size"
                remote
                @change="handleDetailAddressChange"
                :remote-method="fetchDetailAddressList"
                default-first-option
                :multiple="false"

                v-model="value[keyPrefix+'Address']"
                filterable

                placeholder="详细地址"

                :loading="loading">
                <el-option
                    v-for="item in d.detailList"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <!--这一行可以再省市区发生变化的时候清空详细地址input-->
            <!--$nextTick(function(){ allowFetchAll&&(value[keyPrefix+'Address']=''); });-->


        </div>
</template>
<style>
    .city-select-content {
        width: 100%;
        min-height: 10px;
        background-color: #fff;
        padding: 10px 15px;
    }
    .city-select dl {
        line-height: 2;
        clear: both;
        padding: 3px 0;
        margin: 0;
    }

    .clearfix:before{
        display: table;
        content: " ";
    }
    .city-select dt {
        position: absolute;
        width: 2.5em;
        font-weight: 500;
        text-align: right;
        line-height: 2;
    }
    .city-select.province dd {
        margin-left: 3em;
    }


    .city-select dd {
        margin-left: 0;

    }
    .clearfix:after{
        clear: both;
    }
    .city-select a {
        line-height: 2;
        display: inline-block;
        padding: 0 10px;
        outline: 0;
        text-decoration: none;
        white-space: nowrap;
        margin-right: 2px;
        text-decoration: none;
        color: #333;
        cursor: pointer;
    }
    .city-select a:hover, .city-select a:focus {
        background-color: #f1f8ff;
        border-radius: 2px;
        color: #46A4FF;
    }
    .city-select a.active {
        background-color: #46A4FF;
        color: #fff;
        border-radius: 2px;
    }
</style>
<script>

    import util from './addressSelectUtil.js'
    import xhrWrapper from '../../xhrWrapper'
    // import smarterInputSelect from './smarterInputSelect'

    function handleDetailAddressChange(argu) {

        util.clog('detail address change',this)
        var arg




        if (typeof(argu) === 'number') {

            util.clog('list len:',this.d.detailList.length)
            arg = this.d.detailList[argu]
        } else {
            arg = argu
        }
        util.clog('handleDetailAddressChange arg:', arguments)
//                return false
        this.allowFetchDetailAddress = false
//                this.value[this.addressKey]='aaaaaaaa'+arg.value


        var lastRemoteQuery = this.lastRemoteQuery

        util.clog('last remote query:', lastRemoteQuery)
        this.allowFetchAll = false

        this.value[this.keyPrefix + 'Address'] = lastRemoteQuery
        this.$emit('detailChange')

        this.$nextTick(() => {

//            setTimeout(()=>{

//                this.value[this.addressKey]=lastRemoteQuery
//            })


//            this.$refs.detailAddress.$el.querySelector('input').value=arg.value

            this.allowFetchDetailAddress = true


        })


        util.clog('111111111')

        util.clog('typeof(arg)---:', typeof(arg))

        if (typeof(arg) === 'object' && (!arg.provinceId)) {
            this.$nextTick(() => {
                this.allowFetchAll = true
            })

            return false
        }


        if (typeof(argu) === 'number') {
            util.clog('222222', arg)


            this.value[this.keyPrefix + 'ProvId'] = arg.provinceId
            this.value[this.keyPrefix + 'CityId'] = arg.cityId
            this.value[this.keyPrefix + 'DistrictId'] = arg.countyId
            this.value[this.keyPrefix + 'StreetId'] = arg.streeId


        } else {
            this.value[this.keyPrefix + 'Address'] = argu
            this.allowFetchAll = true
        }

        util.clog('33333333')


    }


    export default {
        computed: {
            defaultValue() {
                let res=''

                if(!util.isNull(this.value[this.keyPrefix+'ProvName'])){
                    res+=this.value[this.keyPrefix+'ProvName']
                }
                if(!util.isNull(this.value[this.keyPrefix+'CityName'])){
                    res+=(this.value[this.keyPrefix+'CityName']!=this.value[this.keyPrefix+'ProvName']?
                        ('/'+this.value[this.keyPrefix+'CityName']):'')
                }
                if(!util.isNull(this.value[this.keyPrefix+'DistrictName'])){

                    res+='/'+this.value[this.keyPrefix+'DistrictName']
                }
                if(!util.isNull(this.value[this.keyPrefix+'StreetName'])){
                    res+='/'+this.value[this.keyPrefix+'StreetName']
                }




                return res


            }
        },
        // components: {smarterInputSelect},
        name: 'fw-address-select',
        methods: {
            resetActiveNameAfterListFetchPromiseAllChange:util.debounce(function(){
                if(this.listFetchPromiseAll.length>0){
                    Promise.all(this.listFetchPromiseAll)
                        .then(()=>{
                            this.activeName='province'
                        })
                }
            }),
            reset(){

                for(var i in this.defaultFormValue){
                    this.value[i]=this.defaultFormValue[i]
                }
                this.activeName='province'

                this.d.streetList= null
                this.d.cityList= null
                this.d.countyList= null
                this.d.detailList= []





                // if(!util.isNull(this.value[this.keyPrefix+'ProvName'])){
                //     res+=this.value[this.keyPrefix+'ProvName']
                // }
                // if(!util.isNull(this.value[this.keyPrefix+'CityName'])){
                //     res+=(this.value[this.keyPrefix+'CityName']!=this.value[this.keyPrefix+'ProvName']?
                //         ('/'+this.value[this.keyPrefix+'CityName']):'')
                // }
                // if(!util.isNull(this.value[this.keyPrefix+'DistrictName'])){
                //
                //     res+='/'+this.value[this.keyPrefix+'DistrictName']
                // }
                // if(!util.isNull(this.value[this.keyPrefix+'StreetName'])){
                //     res+='/'+this.value[this.keyPrefix+'StreetName']
                // }


            },
            handleStreetChange(street,e){
                if(e&&e.target.classList.contains('active')){return false}
                if(e){this.value[this.keyPrefix+'StreetId']=street.streeId}
                this.$nextTick(function(){ this.allowFetchAll&&(this.lastRemoteQuery='') })

                try{
                    this.$refs.tabAddressSelect.$el.querySelector('input').click()
                }catch(e){}


                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'Address']='') })
            },
            handleCountyChange(county,e){
                if(e&&e.target.classList.contains('active')){return false}
                if(e){this.value[this.keyPrefix+'DistrictId']=county.countyId}
                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'StreetId']='') })
                this.activeName='street'



                this.$nextTick(function(){ this.allowFetchAll&&this.getStreetByCountyId(this.value[this.keyPrefix+'DistrictId']) })

            },
            handleCityChange(city,e){
                if(e&&e.target.classList.contains('active')){return false}
                if(e){this.value[this.keyPrefix+'CityId']=city.cityId}
                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'DistrictId']='') })
                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'StreetId']='') })
                this.$nextTick(function(){ this.allowFetchAll&&this.getCountyByCityId(this.value[this.keyPrefix+'CityId']) })
                this.activeName='district'
            },
            handleProvinceChange(province,e){

                if(e&&e.target.classList.contains('active')){return false}
                if(e){this.value[this.keyPrefix+'ProvId']=province.provinceId}
                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'CityId']='') })
                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'DistrictId']='') })
                this.$nextTick(function(){ this.allowFetchAll&&(this.value[this.keyPrefix+'StreetId']='') })

                this.$nextTick(function(){ this.allowFetchAll&&(this.getCityByProvinceId(this.value[this.keyPrefix+'ProvId'])) })
                this.activeName='city'
            },
            handleInputChange(val) {
                // console.log('handleInputChange---:', arguments)
                // this.destName = val
                // this.destinationRemoteMethod(val)
            },
            handleSelectChange(obj, index) {
                // this.destName = obj.value
                // console.log(" handle select change obj and index:", obj, index)
            },
            destinationRemoteMethod(query) {
                // console.log('remote method query:', query)
                // query = query.trim()
                // if (!query) {
                //     return false
                // }
                //
                // // if(this.isLoadingDestination==false){
                // //
                // // }
                //
                // this.isLoadingDestination = true
                //
                // // this.BX.s.requestTMS('api/testTimeout')
                //
                //
                // setTimeout(() => {
                //
                //     this.destinationData = [
                //         {
                //             label: 'label1',
                //             value: 'value1',
                //             isShow: false
                //         }, {
                //             label: 'label2',
                //             value: 'value2'
                //         }, {
                //             label: 'label3',
                //             value: 'value3'
                //         }
                //     ]
                //
                //     this.isLoadingDestination = false
                // }, 1000)
            },

            getValueFromModelObj(key) {
                return this.value[this.keyPrefix + key]
            },
            clearSelectMenuValueAfterCurrentSelect(type) {
                var arr = 'Prov City District Street'.split(' '),
                    index = arr.indexOf(type)
                for (var i = index + 1; i < arr.length; i++) {
                    this.value[this.keyPrefix + arr[i] + 'Id'] = ''
                    this.value[this.keyPrefix + arr[i] + 'Name'] = ''
                }


            },
            getStreetByCountyId(id) {
                if (typeof(id) === 'string') {
                    return false
                }
                this.isFetchingStreet = true
                return xhrWrapper.callInterfaceAndSetData(`/address/getStreeByCountyId?countyId=${id}`, this.d, 'streetList')
                    .then((res) => {
                        this.isFetchingStreet = false
                        return res
                    })
            },
            getCountyByCityId(id) {
                if (typeof(id) === 'string') {
                    return false
                }
                this.isFetchingDistrict = true
                return xhrWrapper.callInterfaceAndSetData(`/address/getCountyByCityId?cityId=${id}`, this.d, 'countyList')
                    .then((res) => {
                        this.isFetchingDistrict = false
                        return res
                    })
            },
            getCityByProvinceId(id) {
                // util.clog('')
                if (typeof(id) === 'string') {
                    return false
                }
                this.isFetchingCity = true
                return xhrWrapper.callInterfaceAndSetData(`/address/getCityByProvinceId?provinceId=${id}`, this.d, 'cityList')
                    .then((res) => {
                        util.clog('city res--:',res)
                        if(res.length==1){
                            this.getCountyByCityId(res[0].cityId)
                            this.value[this.keyPrefix + 'CityId']=res[0].cityId
                            this.activeName='district'
                        }
                        this.isFetchingCity = false
                        return res
                    })
            },
            // handleDetailAddressChange: util.debounce(handleDetailAddressChange, 300, true),
            handleDetailAddressChange:handleDetailAddressChange,
            handleVisibleChange(bool) {


                this.value[this.keyPrefix + 'Address'] = this.lastRemoteQuery
            },

            fetchDetailAddressList(query) {

                if (!this.allowFetchDetailAddress) {
                    return false
                }
                util.clog('query--:', query)
                this.lastDetailAddressInputValue = query
                var self = this

                function handleIsLoading() {
                    if (self.loading) {
//                        setTimeout(()=>{
                        self.loading = false
//                        },50)
                    }
                }

                function createNotExistOption() {
                    self.d.detailList = [{
                        key: Math.random(),
                        label: query + '(当前选中城市)',
                        notExistItem: true,
                        value: query
                    }]
                }

                query = query.trim()
                if (query !== '') {
                    this.loading = true

                    var url = '/address/getFullAreaByDetailAddress?addressName=' + query
                    util.clog('url is:', url)
                    xhrWrapper.request(url, true, false)
                        .then(([arr]) => {
                            util.clog("see arr:", arr)
                            handleIsLoading()
//                            if(arr&&arr.length){
                            arr.forEach((item, index) => {
                                item.value = index
                                item.key = '' + item.provinceId + item.cityId + item.countyId + item.streeId
                                item.label = item.provinceName + item.cityName + item.countyName + item.streeName
                            })
                            util.clog("handled arr:", arr)
                            this.d.detailList = arr

//                            }else{
////                                createNotExistOption()
//                            }

                            this.d.detailList = arr

                        }).catch((e) => {
                        console.error('fetchDetailAddressList err:', e)
                        handleIsLoading()
//                        createNotExistOption()
                    })
                }

            }
        },
        props: {
            showDetail:{
                type:Boolean,
                default:true
            },
            facade:{
                type:String,
                default:'TAB'
            },
            size:{
                type:String,
                default:'normal'
            },
            keyPrefix: {
                type: [String]
            },
            // label: {
            //     type: [String],
            //     default: '地址'
            // },

            value: {

                type: [Object],
                default: {}
            }
        },
        beforeCreate() {

        },
        data() {

            return {
                listFetchPromiseAll:[],
                defaultFormValue:{},
                activeName:'province',
                util:util,
                isFetchingCity: false,
                isFetchingDistrict: false,
                isFetchingStreet: false,
                lastRemoteQuery: this.value[this.keyPrefix + 'Address'],
                remoteFetchCount: 0,
                allowFetchDetailAddress: true,
                allowFetchAll: true,//是否允许获取除了详细地址之外的select
                loading: false,
                detailAddressModel: {
                    key: '-1',
                    label: '',
                    value: ''
                },
//              lastDetailAddressInputValue:'',
                d: {
                    initialGroupLabelArr : 'A-G,H-K,L-S,T-Z'.split(','),
                    provinceGroupList:[[],[],[],[]],
                    streetList: null,
                    cityList: null,
                    provinceList: null,
                    countyList: null,
                    detailList: []
                }
            }
        },

        mounted() {

            // "invoiceProvId": "",
            //     "invoiceProvName": "",
            //     "invoiceCityId": "",
            //     "invoiceCityName": "",
            //     "invoiceDistrictId": "",
            //     "invoiceDistrictName": "",
            //     "invoiceStreetId": "",
            //     "invoiceStreetName": "",
            //     "invoiceAddress": "",
            //     "invoiceAddressId": "",


            //watch

            let defaultFormValue={}


            'ProvId ProvName CityId CityName DistrictId DistrictName StreetId StreetName Address AddressId'.split(' ').forEach((key)=>{
                if(this.value.hasOwnProperty(this.keyPrefix+key)){
                    defaultFormValue[this.keyPrefix+key]=this.value[this.keyPrefix+key]
                }
            })
            this.defaultFormValue=defaultFormValue


            //处理省市区等id变化时候对应的名字的变化
            let map = {
                [this.keyPrefix + 'ProvId']: `${this.keyPrefix}ProvName-province`,
                [this.keyPrefix + 'CityId']: `${this.keyPrefix}CityName-city`,
                [this.keyPrefix + 'DistrictId']: `${this.keyPrefix}DistrictName-county`,
                [this.keyPrefix + 'StreetId']: `${this.keyPrefix}StreetName-street`

            }


            function handleIdChange(val,i){
                this.allowFetchAll = false
                var nameKey = map[i].split("-")[0], objKey = map[i].split("-")[1]

                util.clog('fucku value:', this.value)
                // util.clog('value.' + i + ' has been changed', nameKey, val, oldVal)
                if (!val) {
                    return false
                }
                var arr = this.d[objKey + 'List'] || []
//
                var obj = arr.find((item) => {
                    return util.getValueByMultiKeyFromMap(item, 'provinceId cityId countyId streeId') == val
                })

                // if(i.endsWith('ProvId')){
                //     this.allowFetchAll=true
                // }

                if (obj) {
                    util.clog('obj::', obj)
//
                    this.value[nameKey] = util.getValueByMultiKeyFromMap(obj, 'provinceName cityName countyName streeName')


                    this.allowFetchAll = true


                } else {
                    // this.$nextTick(()=>{




                    if (i.endsWith('CityId')) {
                        let id = val
                        util.clog('id:', id)


                        let p=this.getCityByProvinceId(this.value[this.keyPrefix + 'ProvId'] || '')
                        this.listFetchPromiseAll.push(p)
                        p.then((res) => {
                            this.value[this.keyPrefix + 'CityId'] = id
                            this.value[this.keyPrefix + 'CityName'] = res.find((item) => {
                                return item.cityId == id
                            }).cityName

                            this.allowFetchAll = true
                        })
                    }
                    else if (i.endsWith('DistrictId')) {
                        let id = val
                        util.clog('id:', id)

                        let p=this.getCountyByCityId(this.value[this.keyPrefix + 'CityId'] || '')
                        this.listFetchPromiseAll.push(p)
                        p.then((res) => {
                            this.value[this.keyPrefix + 'DistrictId'] = id
                            this.value[this.keyPrefix + 'DistrictName'] = res.find((item) => {
                                return item.countyId == id
                            }).countyName
                            this.allowFetchAll = true
                        })
                    }
                    else if (i.endsWith('StreetId')) {
                        var id = val
                        util.clog('id:', id)

                        let p=this.getStreetByCountyId(this.value[this.keyPrefix + 'DistrictId'] || '')
                        this.listFetchPromiseAll.push(p)
                        p.then((res) => {
                            this.value[this.keyPrefix + 'StreetId'] = id
                            this.value[this.keyPrefix + 'StreetName'] = res.find((item) => {
                                return item.streeId == id
                            }).streeName
                            this.allowFetchAll = true
                        })
                    }

                    setTimeout(()=>{
                        this.resetActiveNameAfterListFetchPromiseAllChange()
                    })



                }
            }



            for (let i in map) {
                // let v=this.value[i]
                // if(typeof(v)=='number'){
                //
                //     handleIdChange.call(this,v,i)
                // }
                // util.clog('vvv:',v,typeof(v))

                this.$watch('value.' + i, function (val, oldVal) {



                    handleIdChange.call(this,val,i)



                })


            }


            //处理详细地址改变行为
            this.$watch('value.' + (this.keyPrefix + 'Address'), function (val) {
                this.lastRemoteQuery = val

            })


            xhrWrapper.callInterfaceAndSetData('/address/province', this.d, 'provinceList')
                .then((res) => {
                    let
                        // provincesMap = {
                        //     provincePart1: [],
                        //     provincePart2: [],
                        //     provincePart3: [],
                        //     provincePart4: [],
                        // },
                        initialJudgeArr = [
                            'abcdefg'.split(''),
                            'hijk'.split(''),
                            'lmnopqrs'.split(''),
                            'tuvwxyz'.split(''),
                        ]
                    res.forEach((provinceItem) => {
                        let initial = provinceItem.initial.toLowerCase()
                        initialJudgeArr.forEach((initials, index) => {
                            if (initials.includes(initial)) {
                                this.d.provinceGroupList[index].push(provinceItem)
                                // provincesMap['provincePart' + (index + 1)].push(provinceItem)
                            }
                        })

                    })
                    // for(var i in provincesMap){
                    //     this.d.provinceGroupList
                    // }
                    util.clog('province res:', res)



                    if (!util.isNull(this.getValueFromModelObj('ProvId'))){
                        this.value[this.keyPrefix+'ProvName']=res.find((item)=>{
                            return item.provinceId==this.value[this.keyPrefix+'ProvId']
                        }).provinceName
                    }

                })

            if (!util.isNull(this.getValueFromModelObj('CityId'))) {
                this.getCityByProvinceId(this.getValueFromModelObj('ProvId'))
            }
            if (!util.isNull(this.getValueFromModelObj('DistrictId'))) {
                this.getCountyByCityId(this.getValueFromModelObj('CityId'))
            }
            if (!util.isNull(this.getValueFromModelObj('StreetId'))) {
                this.getStreetByCountyId(this.getValueFromModelObj('DistrictId'))
            }


            var self = this

//            this.$nextTick(()=>{

            // this.$nextTick(()=>{
            util.clog('this.$refs.detailAddress--:', this.$refs.detailAddress)
            // if(this.facade=='SELECT'){
            if(this.showDetail){
                this.$refs.detailAddress.$el.querySelector('input').addEventListener('input', function () {
                    self.lastRemoteQuery = this.value
                })
            }

                // })
            // }



            util.clog('this is:', this)


        }
    }
</script>
