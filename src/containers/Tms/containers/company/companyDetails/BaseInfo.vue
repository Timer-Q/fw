<style lang='scss' scoped>

</style>
<template>
    <div class="base-info details-box">
        <div class="details-title">
            <p>基本信息</p>
        </div>
        <div class="details-content base-info-details">
            <div class="details-line">
                <label class="details-line-label">渠道名称</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">商户编号</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">企业名称</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">企业简称</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">所属分公司</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">合同编号</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">所属行业</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">所属合作机构</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">性质</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">企业类型</label>
                <Radio :disabled="true">企业</Radio>
            </div>
            <div class="details-line">
                <label class="details-line-label">邮箱</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">联系人</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">联系电话</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">详细地址</label>
                <Input></Input> - <Input></Input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BaseInfo',
}
</script>