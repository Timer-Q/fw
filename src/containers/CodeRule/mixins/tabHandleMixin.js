export default {
    data() {
        return {
            tabState: {}
        }
    },
    methods: {
        clickByEdit(name, tag = 'paymentBill_detail', content = 'payment-bill-detail') {
            console.log(name, tag)
            let flag = false
            let obj = {
                name,
                tag,
                content
            }
            this.selectTabCode = obj.tag
            for (let i = 0; i < this.tabsList.length; i++) {
                if (this.tabsList[i].tag == obj.tag) {
                    flag = true
                    return
                }
            }
            if (!flag) {
                this.tabsList.push(obj)
            }
        },
        handleTabClick(tab, event) {
            let tabState = {
                active: tab.active,
                closable: tab.closable,
                disabled: tab.disabled,
                index: tab.index,
                isClosable: tab.isClosable,
                label: tab.label,
                name: tab.name
            }
            this.tabState = Object.assign({}, tabState)
        }
    },
    mounted() {
        this.$root.bus.$on(this.tabTriggerType, (name, tag, tabType, content) => {
            this.clickByEdit(name, tag, content)
            this.tabState.name = tag
            this.tabType = tabType
        })
        this.$root.bus.$on('removeTwoLevelTab', (targetName) => {
            this.removeTab(targetName)
        })
    }
}
