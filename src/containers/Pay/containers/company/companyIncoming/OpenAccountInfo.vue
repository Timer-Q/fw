<style lang='scss' scoped>
    .u-modules-label {
        width: 74px;
    }

    .u-secondary-title {
        padding-bottom: 10px;
        font-size: 14px;
        color: #28a7e1;
    }

    .u-remarks {
        color: #666;
    }

    .u-modules-input {
        &.z-settlement {
            width: 80px;
            margin-right: 50px;
        }
        &.z-fee {
            width: 80px;
        }
    }

    .u-img-rule {
        margin-left: 88px;
        font-size: 12px;
        color: #333;
    }

    .m-upLoad-img-box {
        display: inline-block;
        vertical-align: text-top;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        .u-must-tips {
            display: block;
            visibility: hidden;
            margin-left: 5px;
        }
    }

    .u-thumbnails {
        width: 68px;
        height: 68px;
    }

    .u-img-info {
        width: 68px;
        height: 68px;
        border: 1px solid #ccc;
        font-size: 12px;
        color: #ccc;
        text-align: center;
    }
</style>
<template>
    <div class="open-account-info m-modules-box">
        <p class="u-modules-title">开户信息<span class="u-remarks">（结算信息）</span></p>
        <div class="m-modules-content open-account-info-details">
            <div class="m-modules-line">
                <label class="u-modules-label">
                    <span class="u-must-enter">*</span>
                    收款方名称
                </label>
                <Input
                    class="u-modules-input"
                    @focus="check.payeeName.isShow = false"
                    v-model="form.payeeName"
                />
                <span class="u-must-tips" v-show="check.payeeName.isShow">请填写收款方名称</span>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">账户类型</label>
                <Radio v-model="form.accountType" label="03" class="u-modules-radio">公户</Radio>
                <Radio v-model="form.accountType" label="02" class="u-modules-radio">私户</Radio>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label"><span class="u-must-enter">*</span>收款方账号</label>
                <Input
                    class="u-modules-input"
                    @focus="check.payeeAccount.isShow = false"
                    v-model="form.payeeAccount"
                />
                <span class="u-must-tips" v-show="check.payeeAccount.isShow">{{check.payeeAccount.title}}</span>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label"><span class="u-must-enter">*</span>开户行全称</label>
                <Input
                    class="u-modules-input"
                    @focus="check.bankName.isShow = false"
                    v-model="form.bankName"
                />
                <span class="u-must-tips" v-show="check.bankName.isShow">请填写开户行全称</span>
            </div>
            <div class="m-modules-line">
                <!--账户类型为公户-->
                <template v-if="form.accountType === '03'">
                    <label class="u-modules-label"><span class="u-must-enter">*</span>开户许可证</label>
                    <Input
                        class="u-modules-input"
                        @focus="check.public.license.isShow = false"
                        v-model="form.public.license"
                    />
                    <span class="u-must-tips" v-show="check.public.license.isShow">请填写开户许可证</span>
                </template>
                <template v-else>
                    <label class="u-modules-label"><span class="u-must-enter">*</span>身份证号</label>
                    <Input
                        class="u-modules-input"
                        @focus="check.private.idCard.isShow = false"
                        v-model="form.private.idCard"
                    />
                    <span class="u-must-tips" v-show="check.private.idCard.isShow">{{check.private.idCard.title}}</span>
                </template>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label"><span class="u-must-enter">*</span>开户所在地</label>
                <div class="u-fw-address-select">
                    <fw-address-select
                        keyPrefix="invoice"
                        v-model="form.oaAddress"
                        :showDetail="false"
                    ></fw-address-select>
                </div>
                -
                <Input
                    class="u-modules-input"
                    placeholder="请填写详细地址"
                    @focus="check.address.isShow = false"
                    v-model="form.oaAddressDetail"
                />
                <span class="u-must-tips" v-show="check.address.isShow">请完整填写详细地址</span>
            </div>
            <p class="u-secondary-title">结算配置</p>
            <div class="m-modules-line">
                <label class="u-modules-label">结算周期</label>
                <Input
                    class="u-modules-input z-settlement"
                    disabled
                    value="T+0"
                />
                <label class="u-modules-label" style="width: 114px;"><span
                    class="u-must-enter">*</span>提现手续费(笔/元)</label>
                <Input
                    class="u-modules-input z-fee"
                    @focus="check.cashFee.isShow = false"
                    v-model="form.cashFee"
                />
                <span class="u-must-tips" v-show="check.cashFee.isShow">{{check.cashFee.title}}</span>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label"><span class="u-must-enter">*</span>证件</label>
                <!--账户类型为公户-->
                <template v-if="form.accountType === '03'">
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.public.licenseFile"
                            v-if="form.public.licenseFile"
                            @click="clickUploadBtn('publicLicenseFile')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('publicLicenseFile')">开户许可证</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="publicLicenseFile"
                            @change="uploadFile('publicLicenseFile', 'licenseFile', 'public')"
                        />
                        <span class="u-must-tips"
                        :class="{'err-visibility-visible': this.check.public.licenseFile.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.public.frontCard"
                            v-if="form.public.frontCard"
                            @click="clickUploadBtn('publicFrontCard')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('publicFrontCard')">法人身份证正面</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="publicFrontCard"
                            @change="uploadFile('publicFrontCard', 'frontCard', 'public')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.public.frontCard.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.public.backCard"
                            v-if="form.public.backCard"
                            @click="clickUploadBtn('publicBackCard')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('publicBackCard')">法人身份证反面</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="publicBackCard"
                            @change="uploadFile('publicBackCard', 'backCard', 'public')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.public.backCard.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.public.businessLicense"
                            v-if="form.public.businessLicense"
                            @click="clickUploadBtn('publicBusinessLicense')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('publicBusinessLicense')">营业执照</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="publicBusinessLicense"
                            @change="uploadFile('publicBusinessLicense', 'businessLicense', 'public')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.public.businessLicense.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.public.nizationCode"
                            v-if="form.public.nizationCode"
                            @click="clickUploadBtn('publicNizationCode')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('publicNizationCode')">组织机构代码证</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="publicNizationCode"
                            @change="uploadFile('publicNizationCode', 'nizationCode', 'public')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.public.nizationCode.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.public.merchantAgreement"
                            v-if="form.public.merchantAgreement"
                            @click="clickUploadBtn('publicMerchantAgreement')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('publicMerchantAgreement')">商户协议</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="publicMerchantAgreement"
                            @change="uploadFile('publicMerchantAgreement', 'merchantAgreement', 'public')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.public.merchantAgreement.isShow}">请上传图片</span>
                    </div>
                </template>
                <template v-else>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.private.frontCard"
                            v-if="form.private.frontCard"
                            @click="clickUploadBtn('privateFrontCard')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('privateFrontCard')">身份证正面</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="privateFrontCard"
                            @change="uploadFile('privateFrontCard', 'frontCard', 'private')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.private.frontCard.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.private.backCard"
                            v-if="form.private.backCard"
                            @click="clickUploadBtn('privateBackCard')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('privateBackCard')">身份证反面</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="privateBackCard"
                            @change="uploadFile('privateBackCard', 'backCard', 'private')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.private.backCard.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.private.bankCardPic"
                            v-if="form.private.bankCardPic"
                            @click="clickUploadBtn('privateBankCardPic')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('privateBankCardPic')">银行卡正面</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="privateBankCardPic"
                            @change="uploadFile('privateBankCardPic', 'bankCardPic', 'private')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.private.bankCardPic.isShow}">请上传图片</span>
                    </div>
                    <div class="m-upLoad-img-box">
                        <img
                            class="u-thumbnails"
                            :src="form.private.merchantAgreement"
                            v-if="form.private.merchantAgreement"
                            @click="clickUploadBtn('privateMerchantAgreement')"
                        />
                        <p class="u-img-info" v-else @click="clickUploadBtn('privateMerchantAgreement')">商户协议</p>
                        <input
                            type="file"
                            style="display: none;"
                            ref="privateMerchantAgreement"
                            @change="uploadFile('privateMerchantAgreement', 'merchantAgreement', 'private')"
                        />
                        <span class="u-must-tips"
                              :class="{'err-visibility-visible': this.check.private.merchantAgreement.isShow}">请上传图片</span>
                    </div>
                </template>
                <p class="u-img-rule">要求：只能上传jpg/png格式的图片，最大宽度不超过670像素，且大小不超过500kb。</p>
            </div>
            <Button class="u-modules-step-btn" @click="prevStep">上一步</Button>
            <Button class="u-modules-step-btn" @click="nextStep">完成</Button>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/company.js'
    import {mapState} from 'vuex'

    export default {
        name: 'OpenAccountInfo',
        data() {
            return {
                publicImgList: [{
                    name: '开户许可证',
                    formKey: 'licenseFile',
                    refName: 'publiclicenseFile',
                    isMust: true
                }, {
                    name: '法人身份证正面',
                    formKey: 'frontCard',
                    refName: 'publicFrontCard',
                    isMust: true
                }, {
                    name: '法人身份证背面',
                    formKey: 'backCard',
                    refName: 'publicBackCard',
                    isMust: true
                }, {
                    name: '营业执照',
                    formKey: 'businessLicense',
                    refName: 'publicBusinessLicense',
                    isMust: true
                }, {
                    name: '组织机构代码证',
                    formKey: 'nizationCode',
                    refName: 'publicNizationCode',
                    isMust: false
                }, {
                    name: '商户协议',
                    formKey: 'merchantAgreement',
                    refName: 'publicMerchantAgreement',
                    isMust: false
                }],
                privateImgList: [{
                    name: '身份证正面',
                    formKey: 'frontCard',
                    refName: 'privateFrontCard',
                    isMust: true
                }, {
                    name: '身份证背面',
                    formKey: 'backCard',
                    refName: 'privateBackCard',
                    isMust: true
                }, {
                    name: '银行卡正面照片',
                    formKey: 'bankCardPic',
                    refName: 'privateBankCardPic',
                    isMust: true
                }, {
                    name: '商户协议',
                    formKey: 'merchantAgreement',
                    refName: 'privateMerchantAgreement',
                    isMust: false
                }],
                form: {
//                收款方名称
                    payeeName: '',
//                账户类型
                    accountType: '03',
//                收款方账号
                    payeeAccount: '',
//                开户行全称
                    bankName: '',
//                省市区
                    oaAddress: {
                        "invoiceProvId": "",
                        "invoiceProvName": "",
                        "invoiceCityId": "",
                        "invoiceCityName": "",
                        "invoiceDistrictId": "",
                        "invoiceDistrictName": "",
                        "invoiceStreetId": "",
                        "invoiceStreetName": "",
                        "invoiceAddress": "",
                        "invoiceAddressId": "",
                    },
//                详细地址
                    oaAddressDetail: '',
//                结算周期
                    settleCycle: '1',
//                提现手续费
                    cashFee: '',
//                    公户
                    public: {
//                      开户许可证
                        license: '',
//                    身份证正面
                        frontCard: '',
//                    身份证反面
                        backCard: '',
//                    商户协议
                        merchantAgreement: '',
//                    开户许可证图片
                        licenseFile: '',
//                    营业执照照片
                        businessLicense: '',
//                    组织机构代码证
                        nizationCode: ''
                    },
//                    私户
                    private: {
//                      身份证号
                        idCard: '',
//                    身份证正面
                        frontCard: '',
//                    身份证反面
                        backCard: '',
//                    商户协议
                        merchantAgreement: '',
//                    银行卡
                        bankCardPic: ''
                    }
                },
                check: {
//                    收款方名称
                    payeeName: {
                        isShow: false
                    },
//                    收款方账号
                    payeeAccount: {
                        name: '银行卡号',
                        isShow: false,
                        title: '请填写收款方账号',
                        rule: /^(\d{16}|\d{19})$/
                    },
//                    开户行全称
                    bankName: {
                        isShow: false
                    },
//                    地址共用
                    address: {
                        isShow: false
                    },
//                    提现
                    cashFee: {
                        name: '提现手续费',
                        isShow: false,
                        rule: /^\d+$/,
                        title: '请填写提现手续费'
                    },
//                    公户
                    public: {
//                    开户许可证
                        license: {
                            isShow: false
                        },
//                    身份证正面
                        frontCard: {
                            isShow: false
                        },
//                    身份证反面
                        backCard: {
                            isShow: false
                        },
//                    开户许可证图片
                        licenseFile: {
                            isShow: false
                        },
//                    营业执照照片
                        businessLicense: {
                            isShow: false
                        },
//                    组织机构代码证
                        nizationCode: {
                            isShow: false
                        },
//                    商户协议
                        merchantAgreement: {
                            isShow: false
                        }
                    },
//                    私户
                    private: {
//                    身份证号
                        idCard: {
                            name: '身份证号',
                            isShow: false,
                            title: "请填写身份证号",
                            rule: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
                        },
//                    身份证正面
                        frontCard: {
                            isShow: false
                        },
//                    身份证反面
                        backCard: {
                            isShow: false
                        },
//                    银行卡
                        bankCardPic: {
                            isShow: false
                        },
//                    商户协议
                        merchantAgreement: {
                            isShow: false
                        }
                    }
                }
            }
        },
        computed: {
            ...mapState({
                payChannelInfo: state => state.Pay.payChannelInfo,
                organizationInfo: state => state.Pay.organizationInfo
            })
        },
        methods: {
            clickUploadBtn(refName) {
//                模拟隐藏input被点击
                this.$refs[refName].click()
            },
            controlErrorInfo(formObj, checkObj) {
                let isPass = true
                for (let key in formObj) {
//                    省市区街道比较特殊，需要验证对象中的字段
                    if (key === 'oaAddress') {
//                        街道没有选择
                        if (!formObj.oaAddress.invoiceAddressId) {
                            isPass = false
//                          找到公用的address字段
                            checkObj.address.isShow = true
                            continue
                        }
                    }
//                    如果值为空
                    if (!formObj[key]) {
                        isPass = false
//                        如果是详细地址
                        if (key === 'oaAddressDetail') {
//                            找到公用的address字段
                            checkObj.address.isShow = true
                            continue
                        }
//                        如果该字段不需要验证，则跳过
                        if (!checkObj.hasOwnProperty(key)) continue
//                        如果有title属性，说明有两种提示文字，非空验证时要改成非空提示文字
                        if (checkObj[key].title) checkObj[key].title = `请输入${checkObj[key].name}`
//                        显示错误提示信息
                        checkObj[key].isShow = true
                    } else {
//                        如果该字段不需要验证，则跳过
                        if (!checkObj.hasOwnProperty(key)) continue
//                        如果字段需要验证合法性
                        if (checkObj[key].rule) {
                            if (!checkObj[key].rule.test(formObj[key])) {
                                isPass = false
                                checkObj[key].title = `${checkObj[key].name}输入有误，请重新输入`
                                checkObj[key].isShow = true
                            }
                        }
                    }
                }

                return isPass
            },
            verificationForm() {
//                复制一份form
                const copyForm = JSON.parse(JSON.stringify(this.form))
                delete copyForm.public
                delete copyForm.private
                let isPassBase, isPassSpecial = true
//                验证基础的字段
                isPassBase = this.controlErrorInfo(copyForm, this.check)
//                如果是公户
                if (this.form.accountType === '03') {
                    isPassSpecial = this.controlErrorInfo(this.form.public, this.check.public)
                }
//                如果是私户
                if (this.form.accountType === '02') {
                    isPassSpecial = this.controlErrorInfo(this.form.private, this.check.private)
                }

                let isPass = false
                if (isPassSpecial && isPassBase) isPass = true
                return isPass
            },
            prevStep() {
                this.$emit('clickStep', ['payChannelInfo', 2])
            },
            nextStep() {
//                表单验证
                const isPass = this.verificationForm()
                if (!isPass) return
//                更新开户信息
                this.addCompanyOpenAccountInfo()
            },
            getAddCompanyOpenAccountInfoParameter() {
//                    开户信息字段
                const companyOpenAccountInfo = {
//                        企业编号
                    companySn: this.organizationInfo.id,
//                        企业简称
                    companyShortName: this.organizationInfo.orgShortName,
//                      收款方名称
                    payeeName: this.form.payeeName,
//                      账户类型
                    accountType: this.form.accountType,
//                      收款方账号
                    payeeAccount: this.form.payeeAccount,
//                      开户行全称
                    bankName: this.form.bankName,
//                      省市区
                    oaAddress: `${this.form.oaAddress.invoiceProvId}-${this.form.oaAddress - invoiceCityId}-${this.form.oaAddress.invoiceDistrictId}-${this.form.oaAddress.invoiceStreetId}`,
//                      详细地址
                    oaAddressDetail: this.form.oaAddressDetail,
//                      结算周期
                    settleCycle: this.form.settleCycle,
//                      提现手续费
                    cashFee: this.form.cashFee
                }
//                    账户类型为公户
                if (this.form.accountType === '03') {
                    Object.assign(companyOpenAccountInfo, {...this.form.public})
                }
//                    账户类型为私户
                if (this.form.accountType === '02') {
                    Object.assign(companyOpenAccountInfo, {...this.form.private})
                }
//                    支付渠道信息字段
                const companyChannelList = [...this.payChannelInfo]

                return {
                    companyOpenAccountInfo,
                    companyChannelList
                }
            },
            getFormData(refName) {
//                创建formData对象
                const formData = new FormData()
//                传入参数
                formData.append('file', this.$refs[refName].files[0])
                formData.append('bucket', 'pay')

                return formData
            },
            async uploadFile(refName, formKey, accountType) {
//                判断该图片是否是需要非空校验的，如果是则关闭图片报错提示
                if (this.check[accountType][formKey]) this.check[accountType][formKey].isShow = false
                const formData = this.getFormData(refName)
                try {
                    const {data} = await $http.uploadFile(formData)
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                        将上传成功的图片地址赋值到form中
                        this.form[accountType][formKey] = result
                    } else {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: status.statusReason,
                            type: 'error'
                        }])
                    }
                } catch (err) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '数据请求失败，请重试',
                        type: 'error'
                    }])
                }
            },
            async addCompanyOpenAccountInfo() {
                try {
//                    获取参数
                    const parameter = this.getAddCompanyOpenAccountInfoParameter()
                    const {data} = await $http.addCompanyOpenAccountInfo(parameter)
                    const {result, status} = data
                    if (status.statusCode === 0) {
//                                新增成功后关闭企业进件页面
                        this.$root.bus.$emit('pay_company_add_openAccountInfo_success')
                    } else {
                        this.$root.bus.$emit('pay_showToast', [{
                            message: status.statusReason,
                            type: 'error'
                        }])
                    }
                } catch (err) {
                    this.$root.bus.$emit('pay_showToast', [{
                        message: '数据请求失败，请重试',
                        type: 'error'
                    }])
                }
            }
        }
    }
</script>
