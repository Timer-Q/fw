<style lang='scss' scoped>
    .u-modules-label {
        width: 72px;
    }
</style>
<template>
    <div class="base-info m-modules-box">
        <p class="u-modules-title">基本信息</p>
        <div class="m-modules-content base-info-details">
            <div class="m-modules-line">
                <!--详情-->
                <template v-if="!change">
                    <label class="u-modules-label">企业名称</label>
                    <Input
                        class="u-modules-input z-input-readonly"
                        readonly
                        :value="currentRowInfo.companyName"
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <label class="u-modules-label">企业名称</label>
                    <Input
                        class="u-modules-input"
                        disabled
                        :value="currentRowInfo.companyName"
                    />
                </template>
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">企业简称</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">所属分公司</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">所属合作机构</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">所属行业</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    :value="currentRowInfo.industry"
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    :value="currentRowInfo.industry"
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">性质</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    :value="currentRowInfo.companyNature"
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    :value="currentRowInfo.companyNature"
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">企业类型</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    :value="currentRowInfo.companyTypeDesc"
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    :value="currentRowInfo.companyTypeDesc"
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">邮箱</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    :value="currentRowInfo.email"
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    :value="currentRowInfo.email"
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">联系人</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    :value="currentRowInfo.contactsName"
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    :value="currentRowInfo.contactsName"
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">联系电话</label>
                <!--详情-->
                <Input
                    class="u-modules-input z-input-readonly"
                    readonly
                    :value="currentRowInfo.contactsPhone"
                    v-if="!change"
                />
                <!--修改-->
                <Input
                    class="u-modules-input"
                    disabled
                    :value="currentRowInfo.contactsPhone"
                    v-else
                />
            </div>
            <div class="m-modules-line">
                <label class="u-modules-label">详细地址</label>
                <!--详情-->
                <template v-if="!change">
                    <Input
                        class="u-modules-input z-input-readonly"
                        readonly
                        :value="currentRowInfo.companyAddressDetail"
                    />
                </template>
                <!--修改-->
                <template v-else>
                    <Input
                        class="u-modules-input"
                        disabled
                        :value="currentRowInfo.companyAddressDetail"
                    />
                </template>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'BaseInfo',
        props: ['currentRowInfo', 'change']
    }
</script>
