<template>
  <section class="right-slider" :class="sizeClass" ref="rightSlider">
    <div class="toogle-btn" @click="toogleSlider">
      {{btnText}}
    </div>
    <header class="slider-header">
      {{headerName}}
    </header>
    <slot></slot>
    <!-- <slot name="footer"></slot> -->
  </section>
</template>

<script>
export default {
  props: {
    // 滑出区域大小
    size: {
      type: String,
      default: 'small'
    },
    // 头部名字
    headerName: {
      type: String,
      default: '发票列表'
    },
    // 按钮名字
    btnName: {
      type: String,
      default: '列表'
    }
  },
  data () {
    return {
      isOpened: false
    }
  },
  created () {
  },
  computed: {
    // 计算滑出区域大小的样式
    sizeClass () {
      return `right-slider-${this.size}`
    },
    btnText () {
      return this.isOpened ? `收起${this.btnName}` : `展开${this.btnName}`
    }
  },
  methods: {
    // 滑入滑出事件
    toogleSlider () {
      if (this.isOpened) {
        this.$refs.rightSlider.style.transform = `translateX(100%)`
        this.isOpened = false
      } else {
        this.$refs.rightSlider.style.transform = `translateX(0)`
        this.isOpened = true
      }
    }
  }
}
</script>


<style lang="less" scoped>
  .right-slider {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
    transform: translateX(100%);
    transition: all .3s ease-in-out;
    width: 100px;
    background-color: #fff;
  }
  .right-slider-tiny {
    width: 300%;
  }
  .right-slider-small {
    width: 50%;
  }
  .right-slider-large {
    width: 70%;
  }
  .toogle-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #49b1df;
    color: #fff;
    transform: translateX(-100%);
    cursor: pointer;
    font-size: 12px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 14px;
    padding: 5px;
  }
  .slider-header {
    padding: 10px;
    font-size: 12px;
    color: #fff;
    background-color: #49b1df;
  }
</style>

