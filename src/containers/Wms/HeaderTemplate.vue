<template>
    <div class="header clearfix">
        <div class="logo clearfix f_l">
            <i class="iconfont f_l">&#xe63a;</i>
            <h1 class="f14 f_l">WMS后台管理系统</h1>
        </div>
        <div class="right-content f_r clearfix">
            <div class="seach f_l">
                <input type="text" class="f_l" />
                <i class="iconfont f20">&#xe63d;</i>
            </div>
            <span class="f_l right-content">
                <Badge :value="3" class="item">
                  <i class="iconfont f20">&#xe63c;</i>
                </Badge>
					<!--<i class="iconfont f20">&#xe63c;</i>-->
					<!--<span class="num f12">0</span>-->
				</span>
            <i class="iconfont f_l f20 my">&#xe63b;</i>
        </div>
    </div>
</template>
<script>
    import '@asserts/styles/Wms/common.scss'
    import '@asserts/fonts/iconfont.css'
    import '@asserts/styles/Wms/coverElement.scss'
</script>
<style  scoped lang="scss" type="text/scss">
    .header {
        background: #303e51;
        color: #fff;
        width: 100%;
        height: 42px;
        line-height: 42px;
        position: relative;
        .iconfont:hover {
            color: white;
        }
        .logo i {
            display: inline-block;
            font-size: 26px;
            padding: 0 16px;
            color: white;
            border-right: 1px solid #3e506a;
        }
        h1 {
            margin-left: 16px;
            display: inline-block;
            color: white;
        }
        .seach {
            width: 184px;
            height: 24px;
            line-height: 24px;
            margin-top: 8px;
            margin-right: 36px;
            padding-right: 4px;
            border: 1px solid #a1aab6;
            position: relative;
            border-radius: 12px;
            input {
                width: 150px;
                height: 24px;
                color: white;
                padding-left: 10px;
                border: none;
                outline: none;
                background: transparent;
            }
        }
        .num {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ff6565;
            line-height: 14px;
            text-align: center;
            display: inline-block;
            vertical-align: 13px;
            margin-left: -7px;
            position: absolute;
            top: 5px;
            right: -10px;
        }
        .right-content {
            position: relative;
        }
        .my{
            margin:0 25px;
        }
        .iconfont{
            font-size: 18px;
        }
    }
</style>

