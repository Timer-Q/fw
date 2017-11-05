<template>
  <div class="v-tooltip" :name="name" @click="handleClick" ref="tooltip">
    <slot></slot>
  </div>
</template>

<script>
var isFirstRender = false
export default {
  name: 'tooltip',
  data () {
    return {}
  },
  props: {
    name: {
      type: String,
      default: 'tooltip'
    }
  },
  methods: {
    handleClick (event) {
      // console.log(this.$slots.default)
      // if (this.$refs[name].style.display === 'flex') {
      //   this.$refs.tooltip.style.display = 'none'
      // }
    },
    handleKeyUp (event) {
      // console.log(event)
      if (event.code === 'Escape') {
        this.handleClick()
      }
    }
  },
  mounted () {
    if (!isFirstRender) {
      document.addEventListener('click', (event) => {
        let tooltipEl = document.getElementsByClassName('v-tooltip')
        if (event.target.className !== 'v-tooltip' && event.target.className !== 'el-table') {
          if (tooltipEl.length > 0) {
            Array.prototype.forEach.call(tooltipEl, (item, index) => {
              if (item.style.display === 'flex') {
                item.style.display = 'none'
              }
            })
          }
        }
      }, true)
      isFirstRender = true
    }
    this.$nextTick(() => {
      document.addEventListener('keyup', this.handleKeyUp, true)
    })
  },
  beforeDestroy () {
    this.$nextTick(() => {
      document.removeEventListener('keyup', this.handleKeyUp, true)
    })
  }
}
</script>


<style lang="less" scoped>
  .v-tooltip {
    display: none;
    position: fixed;
    z-index: 100;
    font-size: 24px;
    border: 1px solid #959c9f;
    border-radius: 3px;
    background: #fff;
    padding: 5px 0;
    box-shadow: 0 0 15px #959c9f;
    transition: all .3s;
    .el-button {
      border: none;
      border-left: 1px solid #959c9f;
      padding-top: 3px;
      padding-right: 10px;
      padding-bottom: 3px;
      padding-left: 10px;
      margin-left: 0;
      border-radius: 0;
      &:first-child {
        border-left: none;
      }
    }
    .el-button.is-disabled {
      background-color: #fff;
    }
  }

</style>

