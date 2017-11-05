<template>
  <div class="wms-items">
      <div class="wms-main">
          <div class="mainContainer clearfix">
              <div class="mainContent mainContent-storeInfo">
                  <img src="../../../../../asserts/images/Wms/bg-ssr.png">
              </div>
              <div class="content-c">
                  <div class="content-t">
                      <div>
                          <span>下架单号</span>
                          <i>*</i>
                          <input type="text" placeholder="请扫描/录入上架单号">
                      </div>
                      <div>
                          <span>库工工号</span>
                          <i>*</i>
                          <input type="text" placeholder="请扫描/录入工号/姓名">
                      </div>
                      <div>
                          <span>暂存货位</span>
                          <i>*</i>
                          <input type="text" placeholder="选择暂存货位">
                      </div>
                  </div>
                  <div class="content-b">
                      <button>保存</button>
                      <p>提示：手动输入信息保存键-Eenter(回车)</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script type="es6">
    import oneLevelTabMixins from '@/mixins/oneLevelTabMixins.js'
    import twoLevelTabMixins from '@/mixins/twoLevelTabMixins.js'
  export default {
      mixins: [oneLevelTabMixins,twoLevelTabMixins],
    data () {
      return {
          tag:'wms_singleShelfRegistration',
          system:'/wms',
          titleName:'下架单管理',
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss" type="text/scss">
    .wms-items {
        .wms-main {
            height: calc(100vh - 76px);
            .mainContent {
                width: 100%;
                width: 100%;
                top: 84px;
                bottom: 0px;
            }
            .mainContent-storeInfo {
                img {
                    width: 98%;
                    position: fixed;
                    bottom: 10px;
                    opacity: .1;
                }
            }
            .content-c {
                width: 400px;
                height: 300px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -150px 0 0 -200px;
                .content-t,.content-b {
                    text-align: center;
                }
                .content-t {
                    div {
                        width: 320px;
                        height: 40px;
                        line-height: 40px;
                        display: block;
                        border: 1px solid #ccc;
                        margin: 20px auto;
                        text-align: center;
                        font-size: 16px;
                        position: relative;
                        span {
                            border-right: 1px solid #ccc;
                            padding-right: 10px;
                        }
                        i {
                            position: absolute;
                            top: 3px;
                            left: 85px;
                            color: #ff0000;
                        }
                        input {
                            width: 220px;
                            height: 38px;
                            font-size: 16px;
                        }
                        input::placeholder {
                            color: #ccc;
                            font-size: 16px;
                        }
                    }
                }
                .content-b {
                    button {
                        border:none;
                        width: 320px;
                        height: 40px;
                        color: #fff;
                        font-size: 18px;
                        background: #f39801;
                        -webkit-border-radius: 4px;
                        -moz-border-radius: 4px;
                        border-radius: 4px;
                    }
                    p {
                        font-size: 16px;
                        color: #ccc;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>

