/*
 * 内容区高度超出增加滚动条
 * */
export default{
    data() {
        return {
        }
    },
    mounted(){
    },
    methods: {
        editScroll(){
            const _this = this
            const {clientHeight} = document.querySelector('body')
            const dom = this.$refs.scroll
            const domTop = dom.getBoundingClientRect().top
            this.$refs.scroll.style.height = `${clientHeight-165}px`
            this.$refs.scroll.style.overflow = "auto"
        }

    }
}
