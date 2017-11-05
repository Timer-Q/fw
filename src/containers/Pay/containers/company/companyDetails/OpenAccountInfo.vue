<style lang='scss' scoped>
    .u-modules-label {
        width: 74px;
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

    .m-modules-line {
        img {
            vertical-align: text-top;
        }
    }
</style>
<template>
    <div class="open-account-info m-modules-box">
        <p class="u-modules-title">开户信息<span class="u-remarks">（结算信息）</span></p>
        <div class="m-modules-content open-account-info-details">
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">收款方名称</label>
                    <Input
                        class="u-modules-input z-input-readonly"
                        readonly
                        :value="currentRowInfo.payeeName"
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label"><span class="u-must-enter">*</span>收款方名称</label>
                    <Input
                        class="u-modules-input"
                        @focus="check.payeeName.isShow = false"
                        v-model="form.payeeName"
                    />
                    <span class="u-must-tips" v-show="check.payeeName.isShow">请填写收款方名称</span>
                </template>
            </div>
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">账户类型</label>
                    <Radio readonly class="u-modules-radio">{{ currentRowInfo.accountType === '03' ? '公户' : '私户' }}</Radio>
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label">账户类型</label>
                    <Radio disabled class="u-modules-radio">{{ currentRowInfo.accountType === '03' ? '公户' : '私户' }}</Radio>
                </template>
            </div>
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">收款方账号</label>
                    <Input
                        class="u-modules-input z-input-readonly"
                        readonly
                        :value="currentRowInfo.payeeAccount"
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label"><span class="u-must-enter">*</span>收款方账号</label>
                    <Input
                        class="u-modules-input"
                        @focus="check.payeeAccount.isShow = false"
                        v-model="form.payeeAccount"
                    />
                    <span class="u-must-tips" v-show="check.payeeAccount.isShow">{{ check.payeeAccount.title }}</span>
                </template>
            </div>
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">开户行全称</label>
                    <Input
                        class="u-modules-input z-input-readonly"
                        readonly
                        :value="currentRowInfo.bankName"
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label"><span class="u-must-enter">*</span>开户行全称</label>
                    <Input
                        class="u-modules-input"
                        @focus="check.bankName.isShow = false"
                        v-model="form.bankName"
                    />
                    <span class="u-must-tips" v-show="check.bankName.isShow">请填写开户行全称</span>
                </template>
            </div>
            <div class="m-modules-line">
                <!--账户类型为公户-->
                <template v-if="currentRowInfo.accountType === '03'">
                    <!--详情-->
                    <template v-if="!change">
                        <label class="u-modules-label">开户许可证</label>
                        <Input
                            class="u-modules-input z-input-readonly"
                            readonly
                            :value="currentRowInfo.license"
                        />
                    </template>
                    <!--修改-->
                    <template v-else>
                        <label class="u-modules-label"><span class="u-must-enter">*</span>开户许可证</label>
                        <Input
                            class="u-modules-input"
                            @focus="check.license.isShow = false"
                            v-model="form.license"
                        />
                    </template>
                    <span class="u-must-tips" v-show="check.license.isShow">请填写开户许可证</span>
                </template>
                <template v-else>
                    <!--详情-->
                    <template v-if="!change">
                        <label class="u-modules-label">身份证号</label>
                        <Input
                            class="u-modules-input z-input-readonly"
                            readonly
                            :value="currentRowInfo.idCard"
                        />
                    </template>
                    <!--修改-->
                    <template v-else>
                        <label class="u-modules-label"><span class="u-must-enter">*</span>身份证号</label>
                        <Input
                            class="u-modules-input"
                            @focus="check.idCard.isShow = false"
                            v-model="form.idCard"
                        />
                        <span class="u-must-tips" v-show="check.idCard.isShow">{{ check.idCard.title }}</span>
                    </template>
                </template>
            </div>
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">详细地址</label>
                    <Input
                        class="u-modules-input z-input-readonly"
                        :value="currentRowInfo.oaAddressDesc"
                        readonly
                    />
                    -
                    <Input
                        class="u-modules-input z-input-readonly"
                        :value="currentRowInfo.oaAddressDetail"
                        readonly
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label"><span class="u-must-enter">*</span>详细地址</label>
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
                        @focus="check.address.isShow = false"
                        v-model="form.oaAddressDetail"
                    />
                    <span class="u-must-tips" v-show="check.address.isShow">请完整填写详细地址</span>
                </template>
            </div>
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">结算周期</label>
                    <Input
                        class="u-modules-input z-input-readonly z-settlement"
                        readonly
                        :value="currentRowInfo.settleCycle === '1' ? 'T+1' : ''"
                    />
                    <label class="u-modules-label" style="width: 114px;">提现手续费(笔/元)</label>
                    <Input
                        class="u-modules-input z-input-readonly z-fee"
                        readonly
                        :value="currentRowInfo.cashFee"
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label">结算周期</label>
                    <Input
                        class="u-modules-input z-settlement"
                        disabled
                        :value="currentRowInfo.settleCycle === '1' ? 'T+1' : ''"
                    />
                    <label class="u-modules-label" style="width: 114px;"><span
                        class="u-must-enter">*</span>提现手续费(笔/元)</label>
                    <Input
                        class="u-modules-input z-fee"
                        @focus="check.cashFee.isShow = false"
                        v-model="form.cashFee"
                    />
                    <span class="u-must-tips" v-show="check.cashFee.isShow">{{check.cashFee.title}}</span>
                </template>
            </div>
            <div class="m-modules-line clearfix">
                <label class="u-modules-label">证件</label>
                <!--账户类型为公户-->
                <template v-if="currentRowInfo.accountType === '03'">
                    <img :src="currentRowInfo.licenseFile" alt="开户许可证" class="info-photo">
                    <img :src="currentRowInfo.frontCard" alt="法人身份证正面" class="info-photo">
                    <img :src="currentRowInfo.backCard" alt="法人身份证反面" class="info-photo">
                    <img :src="currentRowInfo.businessLicense" alt="营业执照" class="info-photo">
                    <img :src="currentRowInfo.nizationCode" alt="组织机构代码证" class="info-photo">
                    <img :src="currentRowInfo.merchantAgreement" alt="商户协议" class="info-photo">
                </template>
                <template v-else>
                    <img :src="currentRowInfo.frontCard" alt="身份证正面" class="info-photo">
                    <img :src="currentRowInfo.backCard" alt="身份证反面" class="info-photo">
                    <img :src="currentRowInfo.bankCardPic" alt="银行卡正面" class="info-photo">
                    <img :src="currentRowInfo.merchantAgreement" alt="商户协议" class="info-photo">
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import $http from '@Pay/services/company.js'

    export default {
        name: 'OpenAccountInfo',
        props: ['currentRowInfo', 'change'],
        data() {
            return {
                form: {
//                收款方名称
                    payeeName: '',
//                收款方账号
                    payeeAccount: '',
//                开户行全称
                    bankName: '',
//                身份证号
                    idCard: '',
//                开户许可证
                    license: '',
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
//                提现手续费
                    cashFee: ''
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
//                    开户许可证
                    license: {
                        isShow: false
                    },
//                    身份证号
                    idCard: {
                        name: '身份证号',
                        isShow: false,
                        title: "请填写身份证号",
                        rule: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
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
                    }
                }
            }
        },
        methods: {
            setfwAddressSelectModel() {
                const addressIdList = this.currentRowInfo.oaAddress.split('-')
                this.form.oaAddress.invoiceProvId = addressIdList[0]
                this.form.oaAddress.invoiceCityId = addressIdList[1]
                this.form.oaAddress.invoiceDistrictId = addressIdList[2]
                this.form.oaAddress.invoiceStreetId = addressIdList[3]
                const addressDescList = this.currentRowInfo.oaAddressDesc.split('-')
                this.form.oaAddress.invoiceProvName = addressDescList[0]
                this.form.oaAddress.invoiceCityName = addressDescList[1]
                this.form.oaAddress.invoiceDistrictName = addressDescList[2]
                this.form.oaAddress.invoiceStreetName = addressDescList[3]
            },
            checkBlank() {
                let isPass = true
                for (let key in this.form) {
//                        如果是公户
                    if (this.currentRowInfo.accountType === '03') {
//                            忽略身份证号验证
                        if (key === 'idCard') continue
                    }
//                        如果是私户
                    if (this.currentRowInfo.accountType === '02') {
//                            忽略开户许可证验证
                        if (key === 'license') continue
                    }
//                        如果是省市区街道
                    if (key === 'oaAddress') {
//                        如果街道这级没有选，就判定为空
                        if (!this.form[key].invoiceStreetId) {
//                      找到公用的address字段
                            this.check.address.isShow = true
                            continue
                        }
                    }
                    if (!this.form[key]) {
                        isPass = false
//                        如果是详细地址
                        if (key === 'oaAddressDetail') {
//                            找到公用的address字段
                            this.check.address.isShow = true
                            continue
                        }
//                        如果有title属性，说明有两种提示文字，非空验证时要改成非空提示文字
                        if (this.check[key].title) this.check[key].title = `请输入${this.check[key].name}`
                        this.check[key].isShow = true
                    }
                }
                return isPass
            },
            checkRule() {
                let isPass = true
                for (let key in this.check) {
//                        如果是公户
                    if (this.currentRowInfo.accountType === '03') {
//                            忽略身份证号验证
                        if (key === 'idCard') continue
                    }
//                        如果是私户
                    if (this.currentRowInfo.accountType === '02') {
//                            忽略开户许可证验证
                        if (key === 'license') continue
                    }
//                    如果有规则字段，则验证合法性
                    if (this.check[key].rule) {
                        if (!this.check[key].rule.test(this.form[key])) {
                            isPass = false
//                            将title改为合法性提示文字
                            this.check[key].title = `${this.check[key].name}输入有误，请重新输入`
                            this.check[key].isShow = true
                        }
                    }
                }
                return isPass
            },
            async updateCompanyOpenAccountInfo() {
                try {
//                    复制一份currentRowInfo
                    const copy_currentRowInfo = JSON.parse(JSON.stringify(this.currentRowInfo))
//                    将用户输入的新数据传入，更新currentRowInfo中的数据
                    Object.assign(copy_currentRowInfo, this.form)
                    copy_currentRowInfo.oaAddress = `${this.form.oaAddress.invoiceProvId}-${this.form.oaAddress - invoiceCityId}-${this.form.oaAddress.invoiceDistrictId}-${this.form.oaAddress.invoiceStreetId}`
                    const {data} = await $http.updateCompanyOpenAccountInfo({...copy_currentRowInfo})
                    const {result, status} = data
                    if (status.statusCode === 0) {
                        this.$root.bus.$emit('pay_company_update_openAccountInfo_success', [this.currentRowInfo.id])
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
        },
        created() {
            for (let key in this.form) {
                if (key === 'oaAddress') {
                    this.setfwAddressSelectModel()
                    continue
                }
                this.form[key] = this.currentRowInfo[key]
            }

//            监听保存按钮的点击
            this.$root.bus.$on('pay_companyDetails_save', () => {
//                检查非空
                const isPassCheckBlank = this.checkBlank()
                if (!isPassCheckBlank) return
//                检查合法性
                const isPassCheckRule = this.checkRule()
                if (!isPassCheckRule) return
//                更新开户信息
                this.updateCompanyOpenAccountInfo()
            })
        }
    }
</script>
