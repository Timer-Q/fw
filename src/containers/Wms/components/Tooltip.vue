<template>
  <div class="v-tooltip" :name="name" @click="handleClick" ref="tooltip">
    <slot></slot>
  </div>
</template>

<script>
    var ifListenerBody=false
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
      if (this.$refs.tooltip.style.display === 'flex') {
        this.$refs.tooltip.style.display = 'none'
      }
    },
    handleKeyUp (event) {
      // console.log(event)
      if (event.code === 'Escape') {
        this.handleClick()
      }
    }
  },
  mounted () {
    if(!ifListenerBody){
        console.log('test body listen')
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
        ifListenerBody=true
    }

    this.$nextTick(function(){
      document.addEventListener('keyup', this.handleKeyUp, true)
    })
  },
  beforeDestroy () {
    this.$nextTick(function(){
      document.removeEventListener('keyup', this.handleKeyUp, true)
    })
  }
}
</script>


<style lang="scss" scoped>
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
      border-right: 1px solid #959c9f;
      padding-top: 3px;
      padding-right: 10px;
      padding-bottom: 3px;
      padding-left: 10px;
      margin-left: 0;
      border-radius: 0;
      &:last-child {
        border-right: none;
      }
    }
  }

</style>

