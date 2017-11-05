export default {
    data() {
        return {
            lessNum: ''
        }
    },
    methods: {
        setOutBoxHeight() {
            const {clientHeight} = document.querySelector('body')
            this.$refs.outBox.style.height = `${clientHeight - (this.lessNum ? this.lessNum : 162)}px`
        }
    },
    mounted() {
        this.setOutBoxHeight()
        window.addEventListener('resize', this.setOutBoxHeight)
    },
    beforeDestory() {
        window.removeEventListener('resize', this.setOutBoxHeight)
    }
}
