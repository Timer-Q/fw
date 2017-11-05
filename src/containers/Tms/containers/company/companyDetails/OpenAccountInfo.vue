<style lang='scss' scoped>
.remarks {
    color: #666;
}
</style>
<template>
    <div class="open-account-info details-box">
        <div class="details-title">
            <p>开户信息<span class="remarks">（结算信息）</span></p>
        </div>
        <div class="details-content open-account-info-details">
            <div class="details-line">
                <label class="details-line-label">收款方名称</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">账户类型</label>
                <Radio :disabled="true">公户</Radio>
            </div>
            <div class="details-line">
                <label class="details-line-label">收款方账号</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">开户行全称</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">开户许可证</label>
                <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">详细地址</label>
                <Input></Input> - <Input></Input>
            </div>
            <div class="details-line">
                <label class="details-line-label">结算周期</label>
                <Input style="width: 80px; margin-right: 50px;"></Input>
                <label class="details-line-label" style="width: 114px;">提现手续费(笔/元)</label>
                <Input style="width: 80px;"></Input> 
            </div>
            <div class="details-line">
                <label class="details-line-label">证件</label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OpenAccountInfo',
}
</script>