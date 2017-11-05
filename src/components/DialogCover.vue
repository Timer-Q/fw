<style lang='scss' scoped>
.dialog-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .5;
    background-color: #000;
    z-index: 1000;
}
</style>
<template>
    <div class="dialog-cover"></div>
</template>
<script>
export default {
    name: 'DialogCover'
}
</script>
