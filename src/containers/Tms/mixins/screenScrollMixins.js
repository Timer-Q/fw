export default{

    mounted(){
        const { clientHeight } = document.querySelector('body')
        this.$refs.OutBox.style.height = `${clientHeight - 178}px`
        this.$refs.OutBox.style.overflow="auto"
        let _this=this
        window.onresize=function () {
            const { clientHeight } = document.querySelector('body')
            _this.$refs.OutBox.style.height = `${clientHeight - 178}px`
            _this.$refs.OutBox.style.overflow="auto"
        }
    },

}
